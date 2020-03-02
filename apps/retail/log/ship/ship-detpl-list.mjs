var this_page_id;




const btn_rowadd = $('#pnl_detpllist-btn_rowadd')
const pnl_dettools = $('#pnl_detpllist-dettools') 


const tbl_list = $('#pnl_detpllist-tbl_list')

let grd_list = {}

export async function init(opt) {
	this_page_id = opt.id


	grd_list = new global.fgta4grid(tbl_list, {
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
	})


	btn_rowadd.linkbutton({
		onClick: () => { btn_rowadd_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})		
}

export function OnSizeRecalculated(width, height) {
}


export function createnew() {
	grd_list.clear()
}


export function setViewMode(viewmode) {
	if (viewmode) {
		pnl_dettools.hide()
	} else {
		pnl_dettools.show()
	}
}


function grd_list_rowclick(tr, ev) {
	console.log('row click')
}


function btn_rowadd_click() {
	$ui.getPages().ITEMS['pnl_detpledit'].handler.createnew()
	$ui.getPages().show('pnl_detpledit')	
}

