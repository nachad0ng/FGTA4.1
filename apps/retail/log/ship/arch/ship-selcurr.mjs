var this_page_id;

const btn_load = $('#pnl_selcurr-btn_load')
const tbl_list = $('#pnl_selcurr-tbl_list')
const txt_search = $('#pnl_selcurr-txt_search')

let grd_list = {}

export async function init(opt) {
	this_page_id = opt.id

	if (navigator.userAgent.indexOf("Firefox") > 0) {
		setTimeout(()=>{
			$.parser.parse('#'+this_page_id);
		}, 500)
	}

	grd_list = new global.fgta4grid(tbl_list, {
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
	})


	btn_load.linkbutton({
		onClick: () => { btn_load_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
			$ui.ResumeScroll()
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})		
}


export function OnSizeRecalculated(width, height) {
}


export function retrieveData() {
	
	grd_list.clearactiverow()
	if (Object.keys(grd_list.DATA).length==0) {
		btn_load_click()
	}
}


function btn_load_click() {
	grd_list.clear()

	var fn_listloading = async (options) => {
		options.api = $ui.apis.loadcurr
		var search = txt_search.textbox('getText')
		if (search!='') {
			options.criteria['search'] = search
		}
	}

	var fn_listloaded = async (result, options) => {
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}

function grd_list_rowclick(tr, ev) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$ui.mask('setdata')
	$ui.getPages().show('pnl_edit')
	$ui.getPages().ITEMS['pnl_edit'].handler.txt_curr_id_select(record.curr_id, record.curr_name)
	
}


