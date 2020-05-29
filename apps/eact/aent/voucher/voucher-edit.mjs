var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_journal_id: $('#pnl_edit-txt_journal_id'),
	txt_journal_descr: $('#pnl_edit-txt_journal_descr'),
	txt_journal_bookdate: $('#pnl_edit-txt_journal_bookdate'),
	txt_journal_duedate: $('#pnl_edit-txt_journal_duedate'),
	txt_journal_source: $('#pnl_edit-txt_journal_source'),
	chk_journal_isdisabled: $('#pnl_edit-chk_journal_isdisabled'),
	chk_journal_isposted: $('#pnl_edit-chk_journal_isposted'),
	chk_journal_isreversed: $('#pnl_edit-chk_journal_isreversed'),
	txt_channel_id: $('#pnl_edit-txt_channel_id'),
	cbo_region_id: $('#pnl_edit-cbo_region_id'),
	cbo_branch_id: $('#pnl_edit-cbo_branch_id'),
	cbo_strukturunit_id: $('#pnl_edit-cbo_strukturunit_id'),
	cbo_rekanan_id: $('#pnl_edit-cbo_rekanan_id'),
	cbo_rekanansub_id: $('#pnl_edit-cbo_rekanansub_id'),
	cbo_periode_id: $('#pnl_edit-cbo_periode_id'),
	cbo_acc_id: $('#pnl_edit-cbo_acc_id'),
	txt_journaltype_id: $('#pnl_edit-txt_journaltype_id'),
	cbo_sub1_id: $('#pnl_edit-cbo_sub1_id'),
	cbo_sub2_id: $('#pnl_edit-cbo_sub2_id'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_journal_id,
		autoid: true,
		logview: 'trn_journal',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_region_id, {
		title: 'Pilih region_id',
		returnpage: this_page_id,
		api: $ui.apis.load_region_id,
		fieldValue: 'region_id',
		fieldValueMap: 'region_id',
		fieldDisplay: 'region_name',
		fields: [
			{mapping: 'region_id', text: 'region_id'},
			{mapping: 'region_name', text: 'region_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_branch_id, {
		title: 'Pilih branch_id',
		returnpage: this_page_id,
		api: $ui.apis.load_branch_id,
		fieldValue: 'branch_id',
		fieldValueMap: 'branch_id',
		fieldDisplay: 'branch_name',
		fields: [
			{mapping: 'branch_id', text: 'branch_id'},
			{mapping: 'branch_name', text: 'branch_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_strukturunit_id, {
		title: 'Pilih strukturunit_id',
		returnpage: this_page_id,
		api: $ui.apis.load_strukturunit_id,
		fieldValue: 'strukturunit_id',
		fieldValueMap: 'strukt_id',
		fieldDisplay: 'strukt_name',
		fields: [
			{mapping: 'strukt_id', text: 'strukt_id'},
			{mapping: 'strukt_name', text: 'strukt_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_rekanan_id, {
		title: 'Pilih rekanan_id',
		returnpage: this_page_id,
		api: $ui.apis.load_rekanan_id,
		fieldValue: 'rekanan_id',
		fieldValueMap: 'rekanan_id',
		fieldDisplay: 'rekanan_name',
		fields: [
			{mapping: 'rekanan_id', text: 'rekanan_id'},
			{mapping: 'rekanan_name', text: 'rekanan_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_rekanansub_id, {
		title: 'Pilih rekanansub_id',
		returnpage: this_page_id,
		api: $ui.apis.load_rekanansub_id,
		fieldValue: 'rekanansub_id',
		fieldValueMap: 'rekanansub_id',
		fieldDisplay: 'rekanansub_name',
		fields: [
			{mapping: 'rekanansub_id', text: 'rekanansub_id'},
			{mapping: 'rekanansub_name', text: 'rekanansub_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_periode_id, {
		title: 'Pilih periode_id',
		returnpage: this_page_id,
		api: $ui.apis.load_periode_id,
		fieldValue: 'periode_id',
		fieldValueMap: 'periode_id',
		fieldDisplay: 'periode_name',
		fields: [
			{mapping: 'periode_id', text: 'periode_id'},
			{mapping: 'periode_name', text: 'periode_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_acc_id, {
		title: 'Pilih acc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_acc_id,
		fieldValue: 'acc_id',
		fieldValueMap: 'acc_id',
		fieldDisplay: 'acc_name',
		fields: [
			{mapping: 'acc_id', text: 'acc_id'},
			{mapping: 'acc_name', text: 'acc_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_sub1_id, {
		title: 'Pilih sub1_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sub1_id,
		fieldValue: 'sub1_id',
		fieldValueMap: 'sub1_id',
		fieldDisplay: 'sub1_name',
		fields: [
			{mapping: 'sub1_id', text: 'sub1_id'},
			{mapping: 'sub1_name', text: 'sub1_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_sub2_id, {
		title: 'Pilih sub2_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sub2_id,
		fieldValue: 'sub2_id',
		fieldValueMap: 'sub2_id',
		fieldDisplay: 'sub2_name',
		fields: [
			{mapping: 'sub2_id', text: 'sub2_id'},
			{mapping: 'sub2_name', text: 'sub2_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih curr_id',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldValueMap: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'curr_id'},
			{mapping: 'curr_name', text: 'curr_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				



	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
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




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {



		form
			.fill(result.record)
			.setValue(obj.cbo_region_id, result.record.region_id, result.record.region_name)
			.setValue(obj.cbo_branch_id, result.record.branch_id, result.record.branch_name)
			.setValue(obj.cbo_strukturunit_id, result.record.strukturunit_id, result.record.strukt_name)
			.setValue(obj.cbo_rekanan_id, result.record.rekanan_id, result.record.rekanan_name)
			.setValue(obj.cbo_rekanansub_id, result.record.rekanansub_id, result.record.rekanansub_name)
			.setValue(obj.cbo_periode_id, result.record.periode_id, result.record.periode_name)
			.setValue(obj.cbo_acc_id, result.record.acc_id, result.record.acc_name)
			.setValue(obj.cbo_sub1_id, result.record.sub1_id, result.record.sub1_name)
			.setValue(obj.cbo_sub2_id, result.record.sub2_id, result.record.sub2_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()


		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, result.record.id)
			// .setValue(obj.txt_nama, result.record.nama)
			// .setValue(obj.cbo_prov, result.record.prov_id, result.record.prov_nama)
			// .setValue(obj.chk_isdisabled, result.record.disabled)
			// .setValue(obj.txt_alamat, result.record.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage(err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form

			data.region_id = '0'
			data.region_name = '-- PILIH --'
			data.branch_id = '0'
			data.branch_name = '-- PILIH --'
			data.strukturunit_id = '0'
			data.strukt_name = '-- PILIH --'
			data.rekanan_id = '0'
			data.rekanan_name = '-- PILIH --'
			data.rekanansub_id = '0'
			data.rekanansub_name = '-- PILIH --'
			data.periode_id = '0'
			data.periode_name = '-- PILIH --'
			data.acc_id = '0'
			data.acc_name = '-- PILIH --'
			data.sub1_id = '0'
			data.sub1_name = '-- PILIH --'
			data.sub2_id = '0'
			data.sub2_name = '-- PILIH --'
			data.curr_id = '0'
			data.curr_name = '-- PILIH --'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editdetailgrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_journal_id
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

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
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


	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

