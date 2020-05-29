var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_regional_id: $('#pnl_edit-txt_regional_id'),
	txt_regional_name: $('#pnl_edit-txt_regional_name'),
	txt_regional_nameshort: $('#pnl_edit-txt_regional_nameshort'),
	txt_regional_code: $('#pnl_edit-txt_regional_code'),
	txt_regional_npwp: $('#pnl_edit-txt_regional_npwp'),
	txt_regional_alamat: $('#pnl_edit-txt_regional_alamat'),
	cbo_provinsi_id: $('#pnl_edit-cbo_provinsi_id'),
	cbo_kota_id: $('#pnl_edit-cbo_kota_id'),
	cbo_kecamatan_id: $('#pnl_edit-cbo_kecamatan_id'),
	cbo_desa_id: $('#pnl_edit-cbo_desa_id'),
	txt_regional_telp: $('#pnl_edit-txt_regional_telp'),
	txt_regional_email: $('#pnl_edit-txt_regional_email'),
	txt_regional_descr: $('#pnl_edit-txt_regional_descr'),
	chk_regional_isdisabled: $('#pnl_edit-chk_regional_isdisabled')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_regional_id,
		autoid: true,
		logview: 'mst_regional',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_provinsi_id, {
		title: 'Pilih provinsi_id',
		returnpage: this_page_id,
		api: $ui.apis.load_provinsi_id,
		fieldValue: 'provinsi_id',
		fieldDisplay: 'provinsi_name',
		fields: [
			{mapping: 'provinsi_id', text: 'provinsi_id'},
			{mapping: 'provinsi_name', text: 'provinsi_name'},
		]
	})				
				
	new fgta4slideselect(obj.cbo_kota_id, {
		title: 'Pilih kota_id',
		returnpage: this_page_id,
		api: $ui.apis.load_kota_id,
		fieldValue: 'kota_id',
		fieldDisplay: 'kota_name',
		fields: [
			{mapping: 'kota_id', text: 'kota_id'},
			{mapping: 'kota_name', text: 'kota_name'},
		]
	})				
				
	new fgta4slideselect(obj.cbo_kecamatan_id, {
		title: 'Pilih kecamatan_id',
		returnpage: this_page_id,
		api: $ui.apis.load_kecamatan_id,
		fieldValue: 'kecamatan_id',
		fieldDisplay: 'kecamatan_name',
		fields: [
			{mapping: 'kecamatan_id', text: 'kecamatan_id'},
			{mapping: 'kecamatan_name', text: 'kecamatan_name'},
		]
	})				
				
	new fgta4slideselect(obj.cbo_desa_id, {
		title: 'Pilih desa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_desa_id,
		fieldValue: 'desa_id',
		fieldDisplay: 'desa_name',
		fields: [
			{mapping: 'desa_id', text: 'desa_id'},
			{mapping: 'desa_name', text: 'desa_name'},
		]
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




export function open(data, rowid, viewmode=true) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		form
			.fill(result.record)
			.setValue(obj.cbo_provinsi_id, result.record.provinsi_id, result.record.provinsi_name)
			.setValue(obj.cbo_kota_id, result.record.kota_id, result.record.kota_name)
			.setValue(obj.cbo_kecamatan_id, result.record.kecamatan_id, result.record.kecamatan_name)
			.setValue(obj.cbo_desa_id, result.record.desa_id, result.record.desa_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		
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

	form.dataload(fn_dataopening, fn_dataopened)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



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
	var objid = obj.txt_regional_id
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

