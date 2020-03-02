var this_page_id;


import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'


const tbl_list = $('#pnl_list-tbl_list')

const txt_search = $('#pnl_list-txt_search')
const txt_searchbrand = $('#pnl_list-txt_search_brand')
const btn_load = $('#pnl_list-btn_load')
const btn_new = $('#pnl_list-btn_new')


let grd_list = {}

let last_scrolltop = 0

export async function init(opt) {
	this_page_id = opt.id
	
	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})




	new fgta4slideselect(txt_searchbrand, {
		title: 'Pilih Brand',
		returnpage: this_page_id,
		api: $ui.apis.loadbrand,
		fieldValue: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'ID'},
			{mapping: 'brand_name', text: 'Brand'},
		],
		OnSelected: (value, display) => {  
			$ui.getPages().ITEMS['pnl_edit'].handler.setBrand(value, display)
		}
	})


	txt_search.textbox('textbox').bind('keypress', (evt)=>{
		if (evt.key==='Enter') {
			btn_load_click(self)
		}
	})


	btn_load.linkbutton({
		onClick: () => { btn_load_click() }
	})

	btn_new.linkbutton({
		onClick: () => { btn_new_click() }
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	





	
	// Untuk keperluan testing
	setTimeout(()=>{
		txt_searchbrand.combo('setValue', "CAN")
		txt_searchbrand.combo('setText', "CANALI")
		$ui.getPages().ITEMS['pnl_edit'].handler.setBrand('CAN', 'CANALI')
		btn_load_click((result, options) => {
			setTimeout(()=>{
				var id = "5dedd5191bf7a"
				var data = grd_list.DATA
				for (var dataid in data) {
					var record = grd_list.DATA[dataid]
					if (record.logship_id==id) {
						var trid = record.trid
						last_scrolltop = $(window).scrollTop()
						$ui.getPages().ITEMS['pnl_edit'].handler.open(record, trid, false)
						$ui.getPages().show('pnl_edit')	
					}
					
				}
			}, 500)
		})
	}, 500)



}


export function OnSizeRecalculated(width, height) {
}


export function updategrid(data, trid) {
	if (trid==null) {
		grd_list.fill([data])
		trid = grd_list.getLastId()
		
	} else {
		grd_list.update(trid, data)
	}

	return trid
}


export function removerow(trid) {
	grd_list.removerow(trid)
}

export function scrolllast() {
	$(window).scrollTop(last_scrolltop)

}

function btn_load_click(fn_loaded) {
	var brand_id = txt_searchbrand.combo('getValue')
	if (brand_id=='') {
		$ui.ShowMessage('[WARNING] Brand Belum dipilih')
		return;
	}

	grd_list.clear()

	var fn_listloading = async (options) => {
		var search = txt_search.textbox('getText')
		if (search!='') {
			options.criteria['search'] = search
		}

		options.criteria['brand_id'] = brand_id
	}

	var fn_listloaded = async (result, options) => {
		// console.log(result)

		if (typeof fn_loaded === 'function' ) {
			fn_loaded(result, options)
		}
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}

function btn_new_click() {
	var brand_id = txt_searchbrand.combo('getValue')
	if (brand_id=='') {
		$ui.ShowMessage('[WARNING] Brand Belum dipilih')
		return;
	}

	$ui.getPages().ITEMS['pnl_edit'].handler.createnew()
	$ui.getPages().show('pnl_edit')	
}


function grd_list_rowformatting(tr) {

}

function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	last_scrolltop = $(window).scrollTop()
	$ui.getPages().ITEMS['pnl_edit'].handler.open(record, trid)
	$ui.getPages().show('pnl_edit')	
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	// var text = td.innerHTML
	// if (td.mapping == 'id') {
	// 	// $(td).css('background-color', 'red')
	// 	td.innerHTML = `<a href="javascript:void(0)">${text}</a>`
	// }
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		// var mapping = td.getAttribute('mapping')
		// if (mapping=='id') {
		// 	if (!record.disabled) {
		// 		td.classList.add('fgtable-rowred')
		// 	}
		// }
		if (record.disabled=="1" || record.disabled==true) {
			td.classList.add('fgtable-row-disabled')
		} else {
			td.classList.remove('fgtable-row-disabled')
		}
	})
}

