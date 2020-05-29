var this_page_id;

import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editdetailform-title')
const btn_edit = $('#pnl_editdetailform-btn_edit')
const btn_save = $('#pnl_editdetailform-btn_save')
const btn_delete = $('#pnl_editdetailform-btn_delete')
const btn_prev = $('#pnl_editdetailform-btn_prev')
const btn_next = $('#pnl_editdetailform-btn_next')
const btn_addnew = $('#pnl_editdetailform-btn_addnew')
const chk_autoadd = $('#pnl_editdetailform-autoadd')

const pnl_form = $('#pnl_editdetailform-form')
const obj = {
  txt_journald_id: $('#pnl_editdetailform-txt_journald_id'),
  txt_journald_line: $('#pnl_editdetailform-txt_journald_line'),
  txt_journald_descr: $('#pnl_editdetailform-txt_journald_descr'),
  cbo_acc_id: $('#pnl_editdetailform-cbo_acc_id'),
  txt_journal_id: $('#pnl_editdetailform-txt_journal_id'),
  txt_journald_idr: $('#pnl_editdetailform-txt_journald_idr')
}


let form = {}
let header_data = {}



export async function init(opt) {
  this_page_id = opt.id

  form = new global.fgta4form(pnl_form, {
    primary: obj.txt_journald_id,
    autoid: true,
    logview: 'trn_journald',
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

  form.AllowAddRecord = true
  form.AllowRemoveRecord = true
  form.CreateRecordStatusPage(this_page_id)
  form.CreateLogPage(this_page_id)


  obj.cbo_acc_id.name = 'pnl_editdetailform-cbo_acc_id'
  new fgta4slideselect(obj.cbo_acc_id, {
    title: 'Pilih acc_id',
    returnpage: this_page_id,
    api: $ui.apis.load_acc_id_d,
    fieldValue: 'acc_id',
    fieldValueMap: 'acc_id',
    fieldDisplay: 'acc_name',
    fields: [
      { mapping: 'acc_id', text: 'acc_id' },
      { mapping: 'acc_name', text: 'acc_name' },
    ],
    OnDataLoading: (criteria) => { },
    OnDataLoaded: (result, options) => {

    },
    OnSelected: (value, display, record) => { }
  })



  btn_addnew.linkbutton({
    onClick: () => { btn_addnew_click() }
  })

  btn_prev.linkbutton({
    onClick: () => { btn_prev_click() }
  })

  btn_next.linkbutton({
    onClick: () => { btn_next_click() }
  })

  document.addEventListener('keydown', (ev) => {
    if ($ui.getPages().getCurrentPage() == this_page_id) {
      if (ev.code == 'KeyS' && ev.ctrlKey == true) {
        if (!form.isInViewMode()) {
          form.btn_save_click();
        }
        ev.stopPropagation()
        ev.preventDefault()
      }
    }
  }, true)

  document.addEventListener('OnButtonBack', (ev) => {
    if ($ui.getPages().getCurrentPage() == this_page_id) {
      ev.detail.cancel = true;
      if (form.isDataChanged()) {
        form.canceledit(() => {
          $ui.getPages().show('pnl_editdetailgrid', () => {
            form.setViewMode()
            $ui.getPages().ITEMS['pnl_editdetailgrid'].handler.scrolllast()
          })
        })
      } else {
        $ui.getPages().show('pnl_editdetailgrid', () => {
          form.setViewMode()
          $ui.getPages().ITEMS['pnl_editdetailgrid'].handler.scrolllast()
        })
      }

    }
  })

  document.addEventListener('OnButtonHome', (ev) => {
    if ($ui.getPages().getCurrentPage() == this_page_id) {
      ev.detail.cancel = true;
    }
  })

  document.addEventListener('OnSizeRecalculated', (ev) => {
    OnSizeRecalculated(ev.detail.width, ev.detail.height)
  })


  document.addEventListener('OnViewModeChanged', (ev) => {
    if (ev.detail.viewmode === true) {
      form.lock(true)
      btn_addnew.allow = false
      btn_addnew.linkbutton('disable')
      chk_autoadd.attr("disabled", true);
      chk_autoadd.prop("checked", false);
    } else {
      form.lock(false)
      btn_addnew.allow = true
      btn_addnew.linkbutton('enable')
      chk_autoadd.removeAttr("disabled");
      chk_autoadd.prop("checked", false);
    }
  })
}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
  return form
}

export function open(data, rowid, hdata) {
  // console.log(header_data)
  txt_title.html(hdata.employee_name)
  header_data = hdata

  var fn_dataopening = async (options) => {
    options.api = `${global.modulefullname}/detail-open`
    options.criteria[form.primary.mapping] = data[form.primary.mapping]
  }

  var fn_dataopened = async (result, options) => {



    form
      .fill(result.record)
      .setValue(obj.cbo_acc_id, result.record.acc_id, result.record.acc_name)
      .commit()
      .setViewMode()
      .rowid = rowid


    // tambah baris
    if (form.AllowAddRecord) {
      btn_addnew.show()
    } else {
      btn_addnew.hide()
    }

    // hapus baris
    if (form.AllowRemoveRecord) {
      btn_delete.show()
    } else {
      btn_delete.hide()
    }

    var prevnode = $(`#${rowid}`).prev()
    if (prevnode.length > 0) {
      btn_prev.linkbutton('enable')
    } else {
      btn_prev.linkbutton('disable')
    }

    var nextode = $(`#${rowid}`).next()
    if (nextode.length > 0) {
      btn_next.linkbutton('enable')
    } else {
      btn_next.linkbutton('disable')
    }
  }

  form.dataload(fn_dataopening, fn_dataopened)
}

export function createnew(hdata) {
  header_data = hdata

  txt_title.html('Create New Row')
  form.createnew(async (data, options) => {
    data.journal_id = hdata.journal_id
    data.detail_value = 0


    data.acc_id = '0'
    data.acc_name = '-- PILIH --'



    form.rowid = null
    options.OnCanceled = () => {
      $ui.getPages().show('pnl_editdetailgrid')
    }
  })
}


async function form_datasaving(data, options) {
  options.api = `${global.modulefullname}/detail-save`



}

async function form_datasaved(result, options) {
  var data = {}
  Object.assign(data, form.getData(), result.dataresponse)


  form.rowid = $ui.getPages().ITEMS['pnl_editdetailgrid'].handler.updategrid(data, form.rowid)

  var autoadd = chk_autoadd.prop("checked")
  if (autoadd) {
    setTimeout(() => {
      btn_addnew_click()
    }, 1000)
  }
}

async function form_deleting(data, options) {
  options.api = `${global.modulefullname}/detail-delete`
}

async function form_deleted(result, options) {
  options.suppressdialog = true
  $ui.getPages().show('pnl_editdetailgrid', () => {
    $ui.getPages().ITEMS['pnl_editdetailgrid'].handler.removerow(form.rowid)
  })

}

function form_viewmodechanged(viewonly) {
  if (viewonly) {
    btn_prev.linkbutton('enable')
    btn_next.linkbutton('enable')
    if (btn_addnew.allow) {
      btn_addnew.linkbutton('enable')
    } else {
      btn_addnew.linkbutton('disable')
    }
  } else {
    btn_prev.linkbutton('disable')
    btn_next.linkbutton('disable')
    btn_addnew.linkbutton('disable')
  }
}


function form_idsetup(options) {
  var objid = obj.txt_journald_id
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

function btn_addnew_click() {
  createnew(header_data)
}


function btn_prev_click() {
  var prevode = $(`#${form.rowid}`).prev()
  if (prevode.length == 0) {
    return
  }

  var trid = prevode.attr('id')
  var dataid = prevode.attr('dataid')
  var record = $ui.getPages().ITEMS['pnl_editdetailgrid'].handler.getGrid().DATA[dataid]

  open(record, trid, header_data)
}

function btn_next_click() {
  var nextode = $(`#${form.rowid}`).next()
  if (nextode.length == 0) {
    return
  }

  var trid = nextode.attr('id')
  var dataid = nextode.attr('dataid')
  var record = $ui.getPages().ITEMS['pnl_editdetailgrid'].handler.getGrid().DATA[dataid]

  open(record, trid, header_data)
}