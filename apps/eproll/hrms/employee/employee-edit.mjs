var this_page_id;

import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
  txt_employee_id: $('#pnl_edit-txt_employee_id'),
  txt_employee_nipp: $('#pnl_edit-txt_employee_nipp'),
  txt_employee_name: $('#pnl_edit-txt_employee_name'),
  txt_employee_ktp: $('#pnl_edit-txt_employee_ktp'),
  txt_employee_tplahir: $('#pnl_edit-txt_employee_tplahir'),
  dt_employee_tglahir: $('#pnl_edit-dt_employee_tglahir'),
  txt_employee_alamat: $('#pnl_edit-txt_employee_alamat'),
  txt_employee_sex: $('#pnl_edit-txt_employee_sex'),
  cbo_agama_id: $('#pnl_edit-cbo_agama_id'),
  cbo_edu_id: $('#pnl_edit-cbo_edu_id'),
  txt_employee_email: $('#pnl_edit-txt_employee_email'),
  txt_employee_status: $('#pnl_edit-txt_employee_status'),
  txt_employee_telp: $('#pnl_edit-txt_employee_telp'),
  txt_employee_tanggungan: $('#pnl_edit-txt_employee_tanggungan'),
  cbo_regional_id: $('#pnl_edit-cbo_regional_id'),
  cbo_divisi_id: $('#pnl_edit-cbo_divisi_id'),
  cbo_jabatan_id: $('#pnl_edit-cbo_jabatan_id'),
  cbo_gol_id: $('#pnl_edit-cbo_gol_id'),
  cbo_kontrak_id: $('#pnl_edit-cbo_kontrak_id'),
  dt_employee_datestart: $('#pnl_edit-dt_employee_datestart'),
  dt_employee_dateend: $('#pnl_edit-dt_employee_dateend'),
  cbo_employee_isshift: $('#pnl_edit-cbo_employee_isshift'),
  txt_employee_npwp: $('#pnl_edit-txt_employee_npwp'),
  cbo_ptkp_id: $('#pnl_edit-cbo_ptkp_id'),
  chk_employee_isactive: $('#pnl_edit-chk_employee_isactive'),
  cbo_bank_id: $('#pnl_edit-cbo_bank_id'),
  txt_employee_rek: $('#pnl_edit-txt_employee_rek'),
  chk_employee_isdisabled: $('#pnl_edit-chk_employee_isdisabled')
}


let form = {}

export async function init(opt) {
  this_page_id = opt.id


  form = new global.fgta4form(pnl_form, {
    primary: obj.txt_employee_id,
    autoid: true,
    logview: 'mst_employee',
    btn_edit: btn_edit,
    btn_save: btn_save,
    btn_delete: btn_delete,
    objects: obj,
    OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
    OnDataSaved: async (result, options) => { await form_datasaved(result, options) },
    OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
    OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
    OnIdSetup: (options) => { form_idsetup(options) },
    OnViewModeChanged: (viewonly) => { form_viewmodechanged(viewonly) }
  })



  new fgta4slideselect(obj.cbo_agama_id, {
    title: 'Pilih agama_id',
    returnpage: this_page_id,
    api: $ui.apis.load_agama_id,
    fieldValue: 'agama_id',
    fieldDisplay: 'agama_name',
    fields: [
      { mapping: 'agama_id', text: 'agama_id' },
      { mapping: 'agama_name', text: 'agama_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_edu_id, {
    title: 'Pilih edu_id',
    returnpage: this_page_id,
    api: $ui.apis.load_edu_id,
    fieldValue: 'edu_id',
    fieldDisplay: 'edu_name',
    fields: [
      { mapping: 'edu_id', text: 'edu_id' },
      { mapping: 'edu_name', text: 'edu_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_regional_id, {
    title: 'Pilih regional_id',
    returnpage: this_page_id,
    api: $ui.apis.load_regional_id,
    fieldValue: 'regional_id',
    fieldDisplay: 'regional_name',
    fields: [
      { mapping: 'regional_id', text: 'regional_id' },
      { mapping: 'regional_name', text: 'regional_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_divisi_id, {
    title: 'Pilih divisi_id',
    returnpage: this_page_id,
    api: $ui.apis.load_divisi_id,
    fieldValue: 'divisi_id',
    fieldDisplay: 'divisi_name',
    fields: [
      { mapping: 'divisi_id', text: 'divisi_id' },
      { mapping: 'divisi_name', text: 'divisi_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_jabatan_id, {
    title: 'Pilih jabatan_id',
    returnpage: this_page_id,
    api: $ui.apis.load_jabatan_id,
    fieldValue: 'jabatan_id',
    fieldDisplay: 'jabatan_name',
    fields: [
      { mapping: 'jabatan_id', text: 'jabatan_id' },
      { mapping: 'jabatan_name', text: 'jabatan_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_gol_id, {
    title: 'Pilih gol_id',
    returnpage: this_page_id,
    api: $ui.apis.load_gol_id,
    fieldValue: 'gol_id',
    fieldDisplay: 'gol_name',
    fields: [
      { mapping: 'gol_id', text: 'gol_id' },
      { mapping: 'gol_name', text: 'gol_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_kontrak_id, {
    title: 'Pilih kontrak_id',
    returnpage: this_page_id,
    api: $ui.apis.load_kontrak_id,
    fieldValue: 'kontrak_id',
    fieldDisplay: 'kontrak_name',
    fields: [
      { mapping: 'kontrak_id', text: 'kontrak_id' },
      { mapping: 'kontrak_name', text: 'kontrak_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_ptkp_id, {
    title: 'Pilih ptkp_id',
    returnpage: this_page_id,
    api: $ui.apis.load_ptkp_id,
    fieldValue: 'ptkp_id',
    fieldDisplay: 'ptkp_name',
    fields: [
      { mapping: 'ptkp_id', text: 'ptkp_id' },
      { mapping: 'ptkp_name', text: 'ptkp_name' },
    ]
  })

  new fgta4slideselect(obj.cbo_bank_id, {
    title: 'Pilih bank_id',
    returnpage: this_page_id,
    api: $ui.apis.load_bank_id,
    fieldValue: 'bank_id',
    fieldDisplay: 'bank_name',
    fields: [
      { mapping: 'bank_id', text: 'bank_id' },
      { mapping: 'bank_name', text: 'bank_name' },
    ]
  })

  document.addEventListener('OnSizeRecalculated', (ev) => {
    OnSizeRecalculated(ev.detail.width, ev.detail.height)
  })

  document.addEventListener('OnButtonBack', (ev) => {
    if ($ui.getPages().getCurrentPage() == this_page_id) {
      ev.detail.cancel = true;
      if (form.isDataChanged()) {
        form.canceledit()
      } else {
        $ui.getPages().show('pnl_list', () => {
          form.setViewMode()
          $ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
        })
      }

    }
  })

  document.addEventListener('OnButtonHome', (ev) => {
    if ($ui.getPages().getCurrentPage() == this_page_id) {
      if (form.isDataChanged()) {
        ev.detail.cancel = true;
        $ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
      }
    }
  })

  await PreLoadShift()
  await PreLoadGender()

}

async function PreLoadShift() {
  var args = {
    options: {}
  }

  var apiurl = `${global.modulefullname}/load-shift`

  try {

    let result = await $ui.apicall(apiurl, args)
    obj.cbo_employee_isshift.combobox('loadData', result.records)
  } catch (err) {
    console.log(err)
  }
}

async function PreLoadGender() {
  var args = {
    options: {}
  }

  var apiurl = `${global.modulefullname}/load-gender`

  try {

    let result = await $ui.apicall(apiurl, args)
    obj.txt_employee_sex.combobox('loadData', result.records)
  } catch (err) {
    console.log(err)
  }
}

export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode = true) {


  var fn_dataopening = async (options) => {
    options.criteria[form.primary.mapping] = data[form.primary.mapping]
  }

  var fn_dataopened = async (result, options) => {

    form
      .fill(result.record)
      .setValue(obj.cbo_agama_id, result.record.agama_id, result.record.agama_name)
      .setValue(obj.cbo_edu_id, result.record.edu_id, result.record.edu_name)
      .setValue(obj.cbo_regional_id, result.record.regional_id, result.record.regional_name)
      .setValue(obj.cbo_divisi_id, result.record.divisi_id, result.record.divisi_name)
      .setValue(obj.cbo_jabatan_id, result.record.jabatan_id, result.record.jabatan_name)
      .setValue(obj.cbo_gol_id, result.record.gol_id, result.record.gol_name)
      .setValue(obj.cbo_kontrak_id, result.record.kontrak_id, result.record.kontrak_name)
      .setValue(obj.cbo_ptkp_id, result.record.ptkp_id, result.record.ptkp_name)
      .setValue(obj.cbo_bank_id, result.record.bank_id, result.record.bank_name)
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
  form.createnew(async (data, options) => {
    // console.log(data)
    // console.log(options)
    form.rowid = null

    // set nilai-nilai default untuk form
    data.employee_tanggungan = 0
    data.employee_tglahir = global.now()
    data.employee_datestart = global.now()
    data.employee_dateend = global.now()
    data.employee_isshift = 0
    data.employee_sex = 'P'

    options.OnCanceled = () => {
      $ui.getPages().show('pnl_list')
    }

    $ui.getPages().ITEMS['pnl_editKomponengrid'].handler.createnew(data, options)


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
  var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', { detail: {} })
  $ui.triggerevent(OnViewModeChangedEvent, {
    viewmode: viewmode
  })
}

function form_idsetup(options) {
  var objid = obj.txt_employee_id
  switch (options.action) {
    case 'fill':
      objid.textbox('disable')
      break;

    case 'createnew':
      // console.log('new')
      if (form.autoid) {
        objid.textbox('disable')
        objid.textbox('setText', '[AUTO]')
      } else {
        objid.textbox('enable')
      }
      break;

    case 'save':
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

