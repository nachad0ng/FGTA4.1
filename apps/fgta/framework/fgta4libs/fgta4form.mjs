/*

* minified by https://obfuscator.io/
*/

export function fgta4form(frm, opt) {

	var _ITEMS = {}

	let self = this

	self.options = opt
	self.ITEMS = _ITEMS
	self.MAPPING = {}
	self.form = frm
	self.buttons = {
		edit: opt.btn_edit!=null && opt.btn_edit!=undefined ? opt.btn_edit : $('<a></a>').linkbutton({}),
		save: opt.btn_save!=null && opt.btn_save!=undefined ? opt.btn_save : $('<a></a>').linkbutton({}),
		delete: opt.btn_delete!=null && opt.btn_delete!=undefined ? opt.btn_delete : $('<a></a>').linkbutton({})
	}
	self.viewonly = false
	self.datachanged = false
	self.isnewdata = false
	self.primary = opt.primary
	self.errordiv = frm[0].id + '-' + 'fgta4errordiv'


	self.OnNewDataCanceled = () => {}
	self.OnDataSaving = typeof self.options.OnDataSaving === 'function' ? self.options.OnDataSaving : async ()=>{}
	self.OnDataSaveError = typeof self.options.OnDataSaveError === 'function' ? self.options.OnDataSaveError : async ()=>{}
	self.OnDataSaved = typeof self.options.OnDataSaved === 'function' ? self.options.OnDataSaved : async ()=>{}
	self.OnDataDeleting = typeof self.options.OnDataDeleting === 'function' ? self.options.OnDataDeleting : async ()=>{}
	self.OnDataDeleted = typeof self.options.OnDataDeleted === 'function' ? self.options.OnDataDeleted : async ()=>{}
	self.OnIdSetup = typeof self.options.OnIdSetup === 'function' ? self.options.OnIdSetup : async ()=>{}
	self.OnViewModeChanged = typeof self.options.OnViewModeChanged === 'function' ? self.options.OnViewModeChanged : async ()=>{}
	
	
	self.recordstatus = {
		_createby: '',
		_createby_username: '',
		_createdate: null,
		_modifyby: '',
		_modifyby_username: '',
		_modifydate: null
	}

	self.form.form({
		onChange: () => { form_changed(self) }
	})


	self.buttons.edit.linkbutton({
		toggle: true,
		onClick: () => { btn_edit_click(self) }
	})

	self.buttons.save.linkbutton({
		onClick: () => { btn_save_click(self) }
	})

	self.buttons.delete.linkbutton({
		onClick: () => { btn_delete_click(self) }
	})




	// DEFINISI PUBLIC OBJECT //
	self.fgta4form = {
		get ITEMS() {
			return self.ITEMS
		},

		get primary() {
			return self.primary
		},

		get autoid() {
			return self.options.autoid
		},

		setValue: (obj, value, display) => { return setValue(self, obj, value, display) },
		getValue: (obj) => { return getValue(self, obj) },
		lock: (locked) => { return lock(self, locked) },
		setViewMode: (viewonly) => { return setViewMode(self, viewonly) },
		isInViewMode: () => { return isInViewMode(self) },
		fill: (data) => { return fill(self, data) },
		commit: () => { return commit(self) },
		reset: () => { return reset(self) },
		isDataChanged: () => { return isDataChanged(self) },
		getData: () => { return getData(self) },
		save: (options, fn_callback) => { return save(self, options, fn_callback) },
		createnew: (fn_callback) => { return createnew(self, fn_callback) },
		canceledit: (fn_callback) => { return canceledit(self, fn_callback) },
		isNewData: () => { return isNewData(self) },
		markNewData: (isnewdata) => { return markNewData(self, isnewdata) },
		dataload: (fn_dataopening, fn_dataopened, fn_dataopenerror) => { dataload(self, fn_dataopening, fn_dataopened, fn_dataopenerror) },
		CreateRecordStatusPage: (panelname) => {CreateRecordStatusPage(self, panelname) },
		CreateLogPage: (panelname) => {CreateLogPage(self, panelname) },
		btn_save_click: () => { btn_save_click(self) }
	}

	init(self)


	return self.fgta4form
}


function init(self) {

	// self.OnIdSetup({
	// 	action: 'createnew'
	// }) 	

	var objects = self.options.objects
	for (var obid in objects) {
		var obj = objects[obid]

		obj.name = obid
		obj.mapping = obj.attr('mapping')
		obj.objecttypeclass = getEasyuiClass(self, obj)
		if (obj.objecttypeclass=='easyui-checkbox') {
			var opt = obj.checkbox('options')
			obj.object_isdisabled = opt.disabled
			obj.originalbackground =  obj.parent().find('span.checkbox').css('background-color')
			obj.parent().find('svg').find('path').attr('stroke', 'black')
			obj.parent().find('span.checkbox-inner.checkbox-checked').removeClass('checkbox-checked')

		} else {
			var opt = obj.textbox('options')
			obj.object_isdisabled = opt.disabled
			obj.originalbackground = obj.textbox('textbox').css('background')

			// if (obj.attr('maxlength')!==undefined) {
			// 	var textbox = obj.textbox('textbox')
			// 	$(textbox).attr('maxlength', obj.attr('maxlength'))
			// }

			if (obj.objecttypeclass=='easyui-combobox') {
				// valueField:'id', textField:'text'"
				// console.log(opt.valueField, opt.textField)
				obj.display = obj.attr('display')
				obj.valueField = opt.valueField
				obj.textField = opt.textField
			} else 	if (obj.hasClass('easyui-combo')) {
				obj.display = obj.attr('display')
				obj.colorbase = obj.css('color')
			}
		}

		obj.currentValue = ''
		obj.currentDisplay = ''
		obj.chekpointData = {
			value: obj.currentValue,
			display: obj.currentDisplay
		}

	
		if (self.MAPPING[obj.mapping]===undefined) {
			self.MAPPING[obj.mapping] = [obj]
		} else {
			self.MAPPING[obj.mapping].push(obj)
		}

		self.ITEMS[obid] = obj

		
		obj.form = self.fgta4form
	}

	// tambahkan halaman terakhir untuk record

	CreateRecordStatusPage(self, 'pnl_edit')
	CreateLogPage(self, 'pnl_edit')


	// re parse
	setTimeout(()=>{
		$.parser.parse('#' + self.form.attr('id'));
		var objects = self.options.objects
		for (var obid in objects) {
			var obj = objects[obid]
			if (obj.objecttypeclass!=='easyui-checkbox') {

				var textbox = obj.textbox('textbox')
				if (obj.attr('maxlength')!==undefined) {
					$(textbox).attr('maxlength', obj.attr('maxlength'))
				}

				if (obj.attr('uppercase')!==undefined) {
					if  (obj.attr('uppercase').toLowerCase() === "true") {
						$(textbox).css('text-transform', 'uppercase')
					}
				}
			}
		}
	}, 500)

}


function CreateLogPage(self, panelname) {
	var pnl_edit = document.getElementById(panelname)
	if (pnl_edit!=null) {

		if (self.options.logview === undefined) {
			console.log('log view belum didefinisi pada form, record log tidak ditampilkan.')
			return;
		}


		setTimeout(()=>{
			var page_log = panelname + "_log"

			// console.log(page_log)
			if ($ui.getPages().ITEMS[page_log]===undefined) {
				var grd_list = {}

				// console.log('test')
				

				$ui[`loaddata_${page_log}`] = () => {
					
					var modules =  global.modulefullname.split('/')
					var modulegroup = modules[0]
					var loglist_api = `${modulegroup}/framework/general/loglist`

					var idval = self.primary.textbox('getValue')
					// console.log(`tampilkan log data ${idval}`)

					grd_list.clear()
					var fn_listloading = async (options) => {
						options.api = loglist_api
						options.criteria['tablename'] = self.options.logview
						options.criteria['id'] = idval
					}
					var fn_listloaded = async (result, options) => {
					}

					grd_list.listload(fn_listloading, fn_listloaded)
				}

				$ui[`show_${page_log}`] = () => {
					$ui.getPages().show(page_log, ()=>{
						$ui[`loaddata_${page_log}`]()
					})
				}

				self.LoaddataLog = $ui[`loaddata_${page_log}`];
				self.ShowLog = $ui[`show_${page_log}`] 				

				$(`#${panelname}`).append(`<div style="margin-top: 5px; margin-right: 0px; margin-left: 0px; padding-left: 5px; padding-right: 5px; border-left: 1px solid #666; border-right: 0px solid #333; display: inline-block">
						<a href="javascript:void(0)" onclick="$ui['show_${page_log}']()">Log</a>
					</div>`);

				$(`<div id="${page_log}">
						<div class="fgta-page-title" style="display: flex; align-items: center ">
							<div>Record Log</div>
						</div>

						<div style="margin-top: 10px">
							<table id="${page_log}-tbl_list" paging="true" cellspacing="0" width="100%">
								<thead>
									<tr>
										<th mapping="timestamp">timestamp</th>
										<th mapping="user_name">user_name</th>
										<th mapping="action">action</th>
										<th mapping="remoteip">remoteip</th>
										<th mapping="module">module</th>
										<th mapping="note">note</th>
									</tr>
									<tr style="background-color: #cccccc; height: 30px">
										<td class="fgtable-head" style="width: 100px; border-bottom: 1px solid #000000">Time</td>
										<td class="fgtable-head" style="width: 100px; border-bottom: 1px solid #000000">User</td>
										<td class="fgtable-head" style="width: 100px; border-bottom: 1px solid #000000">Action</td>
										<td class="fgtable-head" style="width: 100px; border-bottom: 1px solid #000000">IP</td>
										<td class="fgtable-head" style="width: 100px; border-bottom: 1px solid #000000">Module</td>
										<td class="fgtable-head" style="width: 100px; border-bottom: 1px solid #000000">Note</td>
									</tr>
								</thead>
							</table>
						</div>						

					</div>
				`).insertAfter(`#${panelname}`)

				var tbl_list = $(`#${page_log}-tbl_list`)
				var pnl_log = $(`#${page_log}`)
				var pLog = {
					init: async (opt) => {}
				}

				pnl_log.hide()

				var page = {panel: pnl_log, handler: pLog}
				page.panel.id = page_log
				page.panel.pagenum = Object.keys($ui.getPages().ITEMS).length + 1
				page.panel.handler = page.handler
				$ui.getPages().ITEMS[page_log] = page.panel

				grd_list = new global.fgta4grid(tbl_list, {})

				document.addEventListener('OnButtonBack', (ev) => {
					if ($ui.getPages().getCurrentPage()==page_log) {
						ev.detail.cancel = true;
						$ui.getPages().show(panelname)
					}
				})

			}
		}, 1000)

	}
}

function CreateRecordStatusPage(self, panelname) {
	var pnl_edit = document.getElementById(panelname)
	if (pnl_edit!=null) {

		setTimeout(()=>{
			var page_rec = panelname + "_record"
			
			if ($ui.getPages().ITEMS[page_rec]===undefined) {



				$ui[`set_${page_rec}`] = (recordstatus) => {
					if (recordstatus!=null) {
						Object.assign(self.recordstatus, {
							_createby : recordstatus._createby,
							_createby_username : recordstatus._createby_username,
							_createdate : recordstatus._createdate,
							_modifyby : recordstatus._modifyby,
							_modifyby_username : recordstatus._modifyby_username,
							_modifydate : recordstatus._modifydate
						})	
					}
					$(`#${page_rec}-createby`).html(self.recordstatus._createby_username != null ?  self.recordstatus._createby_username : self.recordstatus._createby)
					$(`#${page_rec}-createdate`).html(self.recordstatus._createdate)
					$(`#${page_rec}-modifyby`).html(self.recordstatus._modifyby_username != null ? self.recordstatus._modifyby_username : self.recordstatus._modifyby)
					$(`#${page_rec}-modifydate`).html(self.recordstatus._modifydate)
				}


				
				
				$ui[`show_${page_rec}`] = () => {
					$ui[`set_${page_rec}`]()
					$ui.getPages().show(page_rec)
					// $('#pnl_record-createby').html(self.recordstatus._createby_username != null ?  self.recordstatus._createby_username : self.recordstatus._createby)
					// $('#pnl_record-createdate').html(self.recordstatus._createdate)
					// $('#pnl_record-modifyby').html(self.recordstatus._modifyby_username != null ? self.recordstatus._modifyby_username : self.recordstatus._modifyby)
					// $('#pnl_record-modifydate').html(self.recordstatus._modifydate)
				}


				self.SetRecord = $ui[`set_${page_rec}`];
				self.ShowRecord = $ui[`show_${page_rec}`] 

				$(`#${panelname}`).append(`<div style="margin-top: 5px; margin-right: 0px; margin-left: 0px; padding-left: 5px; padding-right: 5px; border-left: 0px solid #999; border-right: 0px solid #333;  display: inline-block">
						<a href="javascript:void(0)" onclick="$ui['show_${page_rec}']()">Record Status</a>
					</div>`);
	
		
				$(`<div id="${page_rec}">
					<div class="fgta-page-title" style="display: flex; align-items: center ">
						<div>Record Status</div>
					</div>
					<div>
						<div class="form_row">
							<div class="form_label_col">Create By</div>
							<div class="form_input_col" style="border: 0px solid black">
								<span id="${page_rec}-createby"></span>
							</div>
						</div>
		
						<div class="form_row">
							<div class="form_label_col">Create Date</div>
							<div class="form_input_col" style="border: 0px solid black">
								<span id="${page_rec}-createdate"></span>
							</div>
						</div>
		
						<div class="form_row" style="margin-top: 30px">
							<div class="form_label_col">Modify By</div>
							<div class="form_input_col" style="border: 0px solid black">
								<span id="${page_rec}-modifyby"></span>
							</div>
						</div>
		
						<div class="form_row">
							<div class="form_label_col">Modify Date</div>
							<div class="form_input_col" style="border: 0px solid black">
								<span id="${page_rec}-modifydate"></span>
							</div>
						</div>
		
					</div>
				
				</div>`).insertAfter(`#${panelname}`)
		

				var pnl_record = $(`#${page_rec}`)
				var pRecord = {
					init: async (opt) => {}
				}

				pnl_record.hide()

				var page = {panel: pnl_record, handler: pRecord}
				page.panel.id = page_rec
				page.panel.pagenum = Object.keys($ui.getPages().ITEMS).length + 1
				page.panel.handler = page.handler
				$ui.getPages().ITEMS[page_rec] = page.panel
	
				document.addEventListener('OnButtonBack', (ev) => {
					if ($ui.getPages().getCurrentPage()==page_rec) {
						ev.detail.cancel = true;
						$ui.getPages().show(panelname)
					}
				})
			}

		}, 1000)


	}	
}



function setValue(self, obj, value, display) {
	if (obj.objecttypeclass=='easyui-checkbox') {
		if (value===true || value===1 || value==="1") {
			obj.checkbox('check')
		} else {
			obj.checkbox('uncheck')
		}
	} else if (obj.objecttypeclass=='easyui-combobox') {
		var data = obj.combobox('getData')
		var cboitem = data.find(o => o[obj.valueField] === value);
		if (cboitem===undefined) {
			cboitem = {}
			cboitem[obj.valueField] = value
			cboitem[obj.textField] = display
			data.push(cboitem)
			obj.combobox('loadData', data)
		}
		obj.combobox('setValue', value)
	} else if (obj.objecttypeclass=='easyui-numberbox') {
		obj.textbox('setValue', value)
	} else {
		obj.textbox('setValue', value)
		if (display!==undefined) {
			obj.textbox('setText', display)
		}
	}

	obj.currentValue = value
	obj.currentDisplay = display

	return self.fgta4form
}

function getValue(self, obj) {
	if (obj.objecttypeclass=='easyui-checkbox') {
		var options = obj.checkbox('options')
		return options.checked
	} else {
		return obj.textbox('getValue')
	}
}

function getEasyuiClass(self, obj) {
	if (obj.hasClass('easyui-textbox')) {
		return 'easyui-textbox'
	} else if (obj.hasClass('easyui-checkbox')) {
		return 'easyui-checkbox'
	} else if (obj.hasClass('easyui-datebox')) {
		return 'easyui-datebox'
	} else if (obj.hasClass('easyui-numberbox')) {
		return 'easyui-numberbox'
	} else if (obj.hasClass('easyui-combobox')) {
		return 'easyui-combobox'
	}
}


function isDataChanged(self) {
	return self.datachanged
}

function lock(self, locked) {
	if (locked===false) {
		self.buttons.edit.linkbutton('enable')
	} else {
		self.buttons.edit.linkbutton('disable')
	}

	return self.fgta4form
}


function isInViewMode(self) {
	return self.inviewmode
}

function setViewMode(self, viewonly) {
	viewonly = (viewonly===false) ? false : true
	if (viewonly) {
		self.buttons.edit.linkbutton('unselect')
		self.buttons.save.linkbutton('disable')
		self.buttons.delete.linkbutton('disable')
	} else {
		self.buttons.edit.linkbutton('select')
		self.buttons.save.linkbutton('enable')
		self.buttons.delete.linkbutton('enable')
	}

	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		if (obj.objecttypeclass=='easyui-checkbox') {
			set_state_checkbox(self, obj, viewonly)
		} else {
			set_state_textbox(self, obj, viewonly)
		}		
	}

	self.OnViewModeChanged(viewonly)
	self.inviewmode = viewonly

	return self.fgta4form
}

function form_changed(self) {
	if (!self.datachanged) {
		self.datachanged = true
	}
}


function btn_delete_click(self) {


	var scroll = $(window).scrollTop();
	var errordiv = self.errordiv

	if (isNewData(self)) {
		return
	} 

	
	$(`#${errordiv}`).remove()	
	var options = {}
	remove(self, options, async (err, result)=>{

		if (result!=null) {
			if (result.success===false) {
				err = {
					errormessage: result.errormessage
				}
			}
		}

		if (err) {

			var errormessage =  err.errormessage.replace(/\[ERROR\]|\[WARNING\]|\[QUESTION\]|\[INFO\]/, '');
			$(`<div id="${errordiv}" class="fgform-errorbox" style="visibility: hidden; padding: 5px 5px 5px 5px;"><div style="font-weight:bold; color:red; margin-bottom: 5px;">Error on Delete !</div>${errormessage}</div>`).insertAfter(self.buttons.save)
				
			$(window).scrollTop(scroll);
			setTimeout(()=>{
				$(`#${errordiv}`).css('visibility', 'visible')					
				$ui.unmask();
			}, 500)

			console.log(err)
		} else {
			
			$ui.unmask(null, async ()=>{
				options.savedmessage = 'Data berhasil dihapus'
				await self.OnDataDeleted(result, options)
				if (options.suppressdialog!==true) {
					$ui.ShowMessage(options.savedmessage)
				}
			});
		}
	})
}



function btn_save_click(self) {
	var scroll = $(window).scrollTop();
	var errordiv = self.errordiv


	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		if (obj.objecttypeclass=='easyui-checkbox')	{
		} else {
			if (obj.textbox('textbox')[0]===document.activeElement) {
				self.focustextbox = obj
				obj.textbox('textbox').blur()
			}
		}
	}

	if (self.fgta4form.isDataChanged()) {

		// cek apakah datanya valid
		try {
			for (var c in self.ITEMS) {
				var obj = self.ITEMS[c]
				if (obj.objecttypeclass=='easyui-checkbox')	{
				} else {
					if (!obj.textbox('isValid')) {
						var opt = obj.textbox('options')
						$ui.ShowMessage(opt.invalidMessage, {
							"OK" : () => {
								var textbox =  obj.textbox('textbox')
								textbox.focus()
							}
						})
						throw opt.invalidMessage
					}			
				}	
			}
		} catch (err) {
			return
		}


		$ui.mask('saving data ...')
		$(`#${errordiv}`).remove()
		var options = {}
		save(self, options, async (err, result) => {
			if (err) {

				var errormessage =  err.errormessage.replace(/\[ERROR\]|\[WARNING\]|\[QUESTION\]|\[INFO\]/, '');
				$(`<div id="${errordiv}" class="fgform-errorbox" style="visibility: hidden; padding: 5px 5px 5px 5px;"><div style="font-weight:bold; color:red; margin-bottom: 5px;">Error !</div>${errormessage}</div>`).insertAfter(self.buttons.save)
				
				$(window).scrollTop(scroll);
				setTimeout(()=>{
					$(`#${errordiv}`).css('visibility', 'visible')					
					$ui.unmask();
				}, 500)
	
				//console.log(err)
				await self.OnDataSaveError(err, options)


			} else {
				$ui.unmask(null, async ()=>{
					options.savedmessage = 'Data berhasil disimpan'
					
					self.OnIdSetup({
						action: 'save'
					}) 

					await self.OnDataSaved(result, options)

					commit(self)

					markNewData(self, false)
					if (options.suppressdialog!==true) {
						$ui.ShowMessage(options.savedmessage, {
							'Ok' : ()=> {
								if (self.focustextbox!=null) {
									self.focustextbox.textbox('textbox').focus()
								}
							}
						})
					}
				});
			}
		})
	} else {
		// console.log('no changes to save')
		if (self.focustextbox!=null) {
			self.focustextbox.textbox('textbox').focus()
		}
	}
}

function canceledit(self, fn_callback) {
	$ui.ShowMessage('<div>Data Berubah, Apakah anda akan <b>membatalkan</b> perubahan ?</div>', {
		"Ya" : () => {
			reset(self)
			setViewMode(self, true)
			self.OnNewDataCanceled()

			if (typeof fn_callback === 'function') {
				fn_callback()
			}
		},
		"Tidak" : () => {
			self.buttons.edit.linkbutton('select')
		}
	})	

}


function btn_edit_click(self) {
	var opt = self.buttons.edit.linkbutton('options')
	var viewonly = !opt.selected

	if (viewonly==true) {
		if (self.fgta4form.isDataChanged()) {
			canceledit(self)
		} else {
			setViewMode(self, viewonly)
		}
	} else {
		setViewMode(self, viewonly)
	}
}


function set_state_checkbox(self, obj, viewonly) {
	if (obj.object_isdisabled) {
		obj.checkbox('disable')
	} else {
		if (viewonly) {
			obj.checkbox('disable')
			obj.parent().find('span.checkbox.inputbox.checkbox-checked').removeClass('checkbox-checked')
			obj.parent().find('span.checkbox.inputbox').css('background', obj.originalbackground);
		} else {
			obj.checkbox('enable')
			obj.parent().find('span.checkbox.inputbox').css('background', 'rgb(255, 224, 149)');
		}
	}
}

function set_state_textbox(self, obj, viewonly) {
	var value = obj.textbox('getValue')
	var text = obj.textbox('getText')

	// console.log(obj.textbox('getText'))

	var opt = obj.textbox('options')
	if (obj.object_isdisabled || opt.disabled) {
		obj.textbox('textbox').css('background-color', '');
	} else {
		if (viewonly) {
			obj.textbox('readonly', true)
			obj.textbox('textbox').css('background', obj.originalbackground);
			if (obj.hasClass('easyui-numberbox')) {
				obj.numberbox('fix')
			}
		} else {
			obj.textbox('readonly', false)
			if (obj.hasClass('easyui-combo')) {
				var textbox = obj.combo('textbox')
				$(textbox).attr('disabled', true)
				textbox.css('color', obj.colorbase)
			}
			obj.textbox('textbox').css('background', 'rgb(255, 224, 149)');
		}
	}

	if (text!=value) {
		obj.textbox('setValue', value)
		obj.textbox('setText', text)
	}
}


function fill(self, data) {
	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		if (data.hasOwnProperty(obj.mapping)) {
			var display = data.hasOwnProperty(obj.display) ? data[obj.display] : data[obj.mapping]
			setValue(self, obj, data[obj.mapping], display)
		}
	}

	self.OnIdSetup({
		action: 'fill'
	}) 	


	markNewData(self, false)
	return self.fgta4form
}



function commit(self) {
	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		obj.chekpointData = {
			value: obj.currentValue,
			display: obj.currentDisplay
		}
	}
	self.datachanged = false

	return self.fgta4form
}


function reset(self) {
	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		var chekpointData = obj.chekpointData
		setValue(self, obj, chekpointData.value, chekpointData.display)
	}

	self.datachanged = false

	return self.fgta4form
} 


function getData(self) {
	var data = {}
	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		data[obj.mapping] = getValue(self, obj)
	}
	return data
}

async function save(self, opt, fn_callback) {
	
	var options = Object.assign({
		api: `${global.modulefullname}/save`,
		cancel: false,
		autoid: self.fgta4form.autoid
	}, opt)

	var data = self.fgta4form.getData()
	await self.OnDataSaving(data, options)
	if (options.cancel==true) {
		console.log('save canceled')
		$ui.unmask()
		return
	}

	if (options.skipmappingresponse==null) {
		options.skipmappingresponse=[];
	}

	
	data['_state'] = isNewData(self) ? 'NEW' : 'MODIFY';

	var args = {
		data: data,
		options: options
	}


	var apiurl = options.api
	try {
		let result = await $ui.apicall(apiurl, args)
		
		/* isi feedback dari server */
		if (result.dataresponse!==undefined) {
			for (var mapping in result.dataresponse) {
				if (self.MAPPING[mapping]!==undefined) {
					for (var obj of self.MAPPING[mapping]) {
						if (options.skipmappingresponse.includes(obj.mapping)) {
							continue;
						} 
						if (obj.display!=null) {
							if (result.dataresponse[obj.display]!=null) {
								setValue(self, obj, result.dataresponse[obj.display])
							} else {
								setValue(self, obj, result.dataresponse[mapping])
							}
						} else {
							setValue(self, obj, result.dataresponse[mapping])
						}
					}
				}
			}


			Object.assign(self.recordstatus, {
				_createby : result.dataresponse._createby,
				_createby_username : result.dataresponse._createby_username,
				_createdate : result.dataresponse._createdate,
				_modifyby : result.dataresponse._modifyby,
				_modifyby_username : result.dataresponse._modifyby_username,
				_modifydate : result.dataresponse._modifydate
			})

		}

		if (typeof fn_callback === 'function') {
			await fn_callback(null, result, options)
			//commit(self)
		} else {
			//commit(self)
			return result
		}

		
	} catch (err) {
		if (typeof fn_callback === 'function') {
			fn_callback(err, null, options)
		} else {
			throw new Error(err)
		}
	}
}


async function remove(self, opt, fn_callback) {

	var data = self.fgta4form.getData()

	var idmapping = self.fgta4form.primary.mapping
	var idvalue = data[idmapping]

	var options = Object.assign({
		api: `${global.modulefullname}/delete`,
		cancel: false,
		confirmationmessage: `<div>Apakah anda yakin akan <b>menghapus</b> data '${idvalue}' ?</div>`,
		noconfirm: false
	}, opt)


	await self.OnDataDeleting(data, options)


	var canceldelete = async (message) => {
		return new Promise((resolve, reject) => {
			$ui.ShowMessage(message, {
				'Yes' : () => {
					resolve(false)
				},

				'Cancel' : () => {
					resolve(true)
				}
			})
		})
	}


	if (!options.noconfirm) {
		var cancel = await canceldelete(options.confirmationmessage)
		if (cancel){
			return
		}
	}

	$ui.mask('removing data ...')
	if (options.cancel==true) {
		console.log('delete canceled')
		$ui.unmask()
		return
	}

	var args = {
		data: data,
		options: options
	}

	var apiurl = options.api

	try {
		let result = await $ui.apicall(apiurl, args)
		if (typeof fn_callback === 'function') {
			await fn_callback(null, result, options)
		} else {
			return result
		}
	} catch (err) {
		if (typeof fn_callback === 'function') {
			fn_callback(err, null, options)
		} else {
			throw new Error(err)
		}
	}


}


async function createnew(self, fn_callback) {

	var data = {};
	var options = {
		autoid: true
	};

	for (var c in self.ITEMS) {
		var obj = self.ITEMS[c]
		data[obj.mapping] = null
	}

	if (typeof fn_callback) {
		fn_callback(data, options)
	}

	if (typeof options.OnCanceled === 'function') {
		if (self.OnNewDataCanceled!=options.OnCanceled) {
			self.OnNewDataCanceled=options.OnCanceled
		}
 	}

	// console.log(data)
	for (var f in self.ITEMS) {
		var obj = self.ITEMS[f]
		if (obj.hasClass('easyui-combobox') || obj.hasClass('easyui-combo')) {
			if (obj.display!==undefined) {
				setValue(self, obj, data[obj.mapping], data[obj.display])
			} else {
				setValue(self, obj, data[obj.mapping])
			}
		} else {
			setValue(self, obj, data[obj.mapping])
		}
		
	}

	self.OnIdSetup({
		action: 'createnew'
	}) 
	
	// $ui.SetRecord({
	self.SetRecord({	
		_createby : '',
		_createby_username : '',
		_createdate : new Date(),
		_modifyby : '',
		_modifyby_username : '',
		_modifydate : ''		
	})


	if (typeof options.OnCreated === 'function') {
		options.OnCreated()
	}

	var errordiv = self.errordiv
	$(`#${errordiv}`).remove();


	setViewMode(self, false)
	commit(self)
	markNewData(self, true)
	self.datachanged = true

	return self.fgta4form
}


function isNewData(self) {
	return self.isnewdata
}

function markNewData(self, isnewdata) {
	self.isnewdata = isnewdata
	if (isnewdata) {
		self.buttons.delete.linkbutton('disable')
	} else {
		self.buttons.delete.linkbutton('enable')
	}
}


async function dataload(self, fn_dataopening, fn_dataopened, fn_dataopenerror) {
	var options = {
		api: `${global.modulefullname}/open`,
		criteria: {}
	}

	if (typeof fn_dataopening === 'function') {
		fn_dataopening(options)
	}

	var args = {
		options: options
	}
	
	var apiurl = options.api
	
	try {
		var errordiv = self.errordiv
		$(`#${errordiv}`).remove();


		let result = await $ui.apicall(apiurl, args)

		if (result.record===undefined) {
			throw 'Record tidak ditemukan'
		}

		Object.assign(self.recordstatus, {
			_createby : result.record._createby,
			_createby_username : result.record._createby_username,
			_createdate : result.record._createdate,
			_modifyby : result.record._modifyby,
			_modifyby_username : result.record._modifyby_username,
			_modifydate : result.record._modifydate
		})


		if (typeof fn_dataopened === 'function') {
			fn_dataopened(result, options)
		}
		

	} catch (err) {
		//console.error(err)
		if (typeof fn_dataopenerror === 'function') {
			fn_dataopenerror(err)
		} else {
			// console.error(err)
		}
	}

}