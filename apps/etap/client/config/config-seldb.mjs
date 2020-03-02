var this_page_id;


const txt_storename = $("#pnl_seldb-txt_storename")



export async function init(opt) {
	this_page_id = opt.id



	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_selstore')
		}
	})	
}

export function SetDbEnable(dbtype) {
	if (dbtype==null || dbtype=='') {
		$(".dbtype").removeClass("nolink")
		$(".dbtype").attr("enabled", "true")
	} else {
		$(".dbtype").addClass("nolink")
		$(".dbtype").attr("enabled", "false")

		var selected = `#pnl_seldb-type-${dbtype}`
		$(selected).removeClass("nolink")
		$(selected).attr("enabled", "true")
	}
}

export function SetStore(store) {
	txt_storename.html(store.store_name)
}


export function SelectDb(dbtype) {
	$ui.getPages().show('pnl_selscm')
	// $ui.getPages().ITEMS['pnl_selscm'].handler.SetDbEnable(dbtype)
}