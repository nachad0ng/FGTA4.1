
export function SelectStore(store, dbtype) {
	$ui.getPages().show('pnl_seldb')
	$ui.getPages().ITEMS['pnl_seldb'].handler.SetDbEnable(dbtype)
	$ui.getPages().ITEMS['pnl_seldb'].handler.SetStore(store)

}