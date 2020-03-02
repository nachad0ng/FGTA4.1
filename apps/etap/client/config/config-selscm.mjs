var this_page_id;


export async function init(opt) {
	this_page_id = opt.id


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_seldb')
		}
	})
	
}


export function SelectSchema(schema)	{
	$ui.getPages().show('pnl_selfld')
	$ui.getPages().ITEMS['pnl_selfld'].handler.SetSchema(schema)
}