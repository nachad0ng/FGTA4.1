var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'



const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_detilinfo = $('#pnl_detilinfo')
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
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged: (viewmode) => { form_viewmodechanged(viewmode) }
	})

	new fgta4slideselect(obj.txt_logshipterm_id, {
		title: 'Pilih Term of Shipment',
		returnpage: this_page_id,
		api: $ui.apis.loadshipterm,
		fieldValue: 'logshipterm_id',
		fieldDisplay: 'logshipterm_name',
		fields: [
			{mapping: 'logshipterm_id', text: 'ID'},
			{mapping: 'logshipterm_name', text: 'Term'},
		]
	})

	new fgta4slideselect(obj.txt_logshipmethod_id, {
		title: 'Pilih Metode Shipment',
		returnpage: this_page_id,
		api: $ui.apis.loadshipmethod,
		fieldValue: 'logshipmethod_id',
		fieldDisplay: 'logshipmethod_name',
		fields: [
			{mapping: 'logshipmethod_id', text: 'ID'},
			{mapping: 'logshipmethod_name', text: 'Shipment Method'},
		]
	})

	new fgta4slideselect(obj.txt_brand_id, {
		title: 'Pilih Brand',
		returnpage: this_page_id,
		api: $ui.apis.loadbrand,
		fieldValue: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'ID'},
			{mapping: 'brand_name', text: 'Brand'},
		]
	})	

	new fgta4slideselect(obj.txt_sea_id, {
		title: 'Pilih Season',
		returnpage: this_page_id,
		api: $ui.apis.loadsea,
		fieldValue: 'sea_id',
		fieldDisplay: 'sea_name',
		fields: [
			{mapping: 'sea_id', text: 'ID'},
			{mapping: 'sea_name', text: 'Season'},
		]
	})

	new fgta4slideselect(obj.txt_curr_id, {
		title: 'Pilih Currency',
		returnpage: this_page_id,
		api: $ui.apis.loadcurr,
		fieldValue: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'ID'},
			{mapping: 'curr_name', text: 'Currency'},
		]
	})	

	new fgta4slideselect(obj.txt_partner_id, {
		title: 'Pilih Principal',
		returnpage: this_page_id,
		api: $ui.apis.loadpartner,
		fieldValue: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'ID'},
			{mapping: 'partner_name', text: 'Partner'},
		],
		OnDataLoading: (criteria) => { txt_partner_id_loading(criteria) }
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
			.setValue(obj.txt_logshipterm_id, result.record.logshipterm_id, result.record.logshipterm_name)
			.setValue(obj.txt_logshipmethod_id, result.record.logshipmethod_id, result.record.logshipmethod_name)
			.setValue(obj.txt_brand_id, result.record.brand_id, result.record.brand_name)
			.setValue(obj.txt_sea_id, result.record.sea_id, result.record.sea_name)
			.setValue(obj.txt_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.txt_partner_id, result.record.partner_id, result.record.partner_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

	}

	form.dataload(fn_dataopening, fn_dataopened)
	
}


export function createnew() {
	pnl_detilinfo.hide();
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.logship_date = global.now()
		data.logship_dtpickup = global.now()
		data.logship_dtetd = global.now()
		data.logship_dteta = global.now()
		data.logship_qty = 0
		data.logship_value = 0

		data.brand_id = form.default_brand_id
		data.brand_name = form.default_brand_name


		$ui.getPages().ITEMS['pnl_detpllist'].handler.createnew()


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		options.OnCreated = () => {
			console.log('created')
		}
		
	})
}


export function setBrand(brand_id, brand_name) {
	form.default_brand_id = brand_id
	form.default_brand_name = brand_name
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

	// munculkan untuk upload invoice dan packing list
	pnl_detilinfo.show();
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}


function form_viewmodechanged(viewmode) {
	$ui.getPages().ITEMS['pnl_detpllist'].handler.setViewMode(viewmode)
}



function txt_partner_id_loading(criteria) {
	criteria['partnertype_id'] = '103'
	criteria['partner_isdisabled'] = 0
}


export function OpenPackingList() {
	$ui.getPages().show('pnl_detpllist')
}