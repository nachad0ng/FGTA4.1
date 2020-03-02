var this_page_id;


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_logship_id: $('#pnl_edit-txt_logship_id'),
	txt_logship_ref: $('#pnl_edit-txt_logship_ref'),
	dt_logship_date: $('#pnl_edit-dt_logship_date'),
	txt_logship_qty: $('#pnl_edit-txt_logship_qty'),
	txt_logship_value: $('#pnl_edit-txt_logship_value'),
	txt_logship_po: $('#pnl_edit-txt_logship_po'),
	txt_logship_dm: $('#pnl_edit-txt_logship_dm'),
	txt_logship_form_e: $('#pnl_edit-txt_logship_form_e'),
	txt_logship_form_d: $('#pnl_edit-txt_logship_form_d'),
	dt_logship_dtpickup: $('#pnl_edit-dt_logship_dtpickup'),
	dt_logship_dtetd: $('#pnl_edit-dt_logship_dtetd'),
	dt_logship_dteta: $('#pnl_edit-dt_logship_dteta'),
	txt_logshipterm_id: $('#pnl_edit-txt_logshipterm_id'),
	txt_logshipmethod_id: $('#pnl_edit-txt_logshipmethod_id'),
	txt_brand_id: $('#pnl_edit-txt_brand_id'),
	txt_sea_id: $('#pnl_edit-txt_sea_id'),
	txt_curr_id: $('#pnl_edit-txt_curr_id'),
	txt_partner_id: $('#pnl_edit-txt_partner_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id

	setTimeout(()=>{
		$.parser.parse('#pnl_edit');
	}, 500)

	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_logship_id,
		autoid: true,
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) }
	})

	// SlideSelect(obj.txt_logshipterm_id, {
	// 	page: this_page_id,
	// 	api: $ui.apis.loadshipterm,
	// 	title: 'Pilih Term of Shipment',
	// 	fields: [
	// 		{mapping: 'logshipterm_id', text: 'ID'},
	// 		{mapping: 'logshipterm_name', text: 'Term'},
	// 	],
	// 	criteria: {}
	// })


	obj.txt_logshipterm_id.combo({
		panelHeight: '0px',
		onShowPanel: () => { txt_logshipterm_id_selecting() }
	})

	obj.txt_logshipmethod_id.combo({
		panelHeight: '0px',
		onShowPanel: () => { txt_logshipmethod_id_selecting() }
	})
	
	obj.txt_brand_id.combo({
		panelHeight: '0px',
		onShowPanel: () => { txt_brand_id_selecting() }
	})
	
	obj.txt_sea_id.combo({
		panelHeight: '0px',
		onShowPanel: () => { txt_sea_id_selecting() }
	})
	
	obj.txt_curr_id.combo({
		panelHeight: '0px',
		onShowPanel: () => { txt_curr_id_selecting() }
	})
	
	obj.txt_partner_id.combo({
		panelHeight: '0px',
		onShowPanel: () => { txt_partner_id_selecting() }
	})	

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit()
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		form
			.fill(result.record)
			.commit()
			.setViewMode()
			.lock(false)
			.rowid = rowid

		
		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, data.id)
			// .setValue(obj.txt_nama, data.nama)
			// .setValue(obj.chk_isdisabled, data.disabled)
			// .setValue(obj.txt_alamat, data.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

	}

	form.dataload(fn_dataopening, fn_dataopened)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
			data.logship_date = global.now()
			data.logship_dtpickup = global.now()
			data.logship_dtetd = global.now()
			data.logship_dteta = global.now()


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}
	})
}


function form_idsetup(options) {
	var objid = obj.txt_logship_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
	


}

async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData(), form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}


function txt_logshipterm_id_selecting() {
	var pnlname = 'pnl_selterm'
	$ui.KeepScroll()
	obj.txt_logshipterm_id.combo('hidePanel'); 
	$ui.getPages().show(pnlname)
	$ui.getPages().ITEMS[pnlname].handler.retrieveData()
}

export function txt_logshipterm_id_select(logshipterm_id, logshipterm_name, params) {
	$ui.ResumeScroll(()=>{ $ui.unmask() })
	form.setValue(obj.txt_logshipterm_id, logshipterm_id, logshipterm_name)
}

function txt_logshipmethod_id_selecting() {
	var pnlname = 'pnl_selmethod'
	$ui.KeepScroll()
	obj.txt_logshipmethod_id.combo('hidePanel'); 
	$ui.getPages().show(pnlname)
	$ui.getPages().ITEMS[pnlname].handler.retrieveData()
}

export function txt_logshipmethod_id_select(logshipmethod_id, logshipmethod_name, params) {
	$ui.ResumeScroll(()=>{ $ui.unmask() })
	form.setValue(obj.txt_logshipmethod_id, logshipmethod_id, logshipmethod_name)
}

function txt_brand_id_selecting() {
	var pnlname = 'pnl_selbrand'
	$ui.KeepScroll()
	obj.txt_brand_id.combo('hidePanel'); 
	$ui.getPages().show(pnlname)
	$ui.getPages().ITEMS[pnlname].handler.retrieveData()
}

export function txt_brand_id_select(brand_id, brand_name, params) {
	$ui.ResumeScroll(()=>{ $ui.unmask() })
	form.setValue(obj.txt_brand_id, brand_id, brand_name)
}

function txt_sea_id_selecting() {
	var pnlname = 'pnl_selsea'
	$ui.KeepScroll()
	obj.txt_sea_id.combo('hidePanel'); 
	$ui.getPages().show(pnlname)
	$ui.getPages().ITEMS[pnlname].handler.retrieveData()
}

export function txt_sea_id_select(sea_id, sea_name, params) {
	$ui.ResumeScroll(()=>{ $ui.unmask() })
	form.setValue(obj.txt_sea_id, sea_id, sea_name)
}

function txt_curr_id_selecting() {
	var pnlname = 'pnl_selcurr'
	$ui.KeepScroll()
	obj.txt_curr_id.combo('hidePanel'); 
	$ui.getPages().show(pnlname)
	$ui.getPages().ITEMS[pnlname].handler.retrieveData()
}

export function txt_curr_id_select(curr_id, curr_name, params) {
	$ui.ResumeScroll(()=>{ $ui.unmask() })
	form.setValue(obj.txt_curr_id, curr_id, curr_name)
}

function txt_partner_id_selecting() {
	var pnlname = 'pnl_selpartner'
	$ui.KeepScroll()
	obj.txt_partner_id.combo('hidePanel'); 
	$ui.getPages().show(pnlname)
	$ui.getPages().ITEMS[pnlname].handler.retrieveData()
}

export function txt_partner_id_select(partner_id, partner_name, params) {
	$ui.ResumeScroll(()=>{ $ui.unmask() })
	form.setValue(obj.txt_partner_id, partner_id, partner_name)
}

