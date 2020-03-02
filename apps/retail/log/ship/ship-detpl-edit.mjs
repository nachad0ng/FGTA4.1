var this_page_id;

const btn_edit = $('#pnl_detpledit-btn_edit')
const btn_save = $('#pnl_detpledit-btn_save')
const btn_delete = $('#pnl_detpledit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_logshippl_id : $('#pnl_detpledit-txt_logshippl_id'),
	txt_logshippl_barcode : $('#pnl_detpledit-txt_logshippl_barcode'),
	txt_logshippl_art : $('#pnl_detpledit-txt_logshippl_art'),
	txt_logshippl_mat : $('#pnl_detpledit-txt_logshippl_mat'),
	txt_logshippl_col : $('#pnl_detpledit-txt_logshippl_col'),
	txt_logshippl_qty : $('#pnl_detpledit-txt_logshippl_qty')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id

	setTimeout(()=>{
		$.parser.parse('#pnl_detpledit');
	}, 500)

	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_logship_id,
		autoid: true,
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		// OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		// OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		// OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		// OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		// OnIdSetup : (options) => { form_idsetup(options) },
		// OnViewModeChanged: (viewmode) => { form_viewmodechanged(viewmode) }
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
		}
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit()
			} else {
				$ui.getPages().show('pnl_detpllist', ()=>{
					form.setViewMode()
				})
			}
		
		}
	})


}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_detpllist')
		}

		options.OnCreated = () => {
			console.log('created')
		}
		
	})
}
