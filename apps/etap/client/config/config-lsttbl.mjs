var this_page_id;

const pnl_loading = $('#pnl_lsttbl-loading')
const pnl_board = $('#pnl_lsttbl-board')

export async function init(opt) {
	this_page_id = opt.id


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_selfld')
		}
	})	
}


export function SelectTable(table) {
	$ui.getPages().show('pnl_selfld')
	$ui.getPages().ITEMS['pnl_selfld'].handler.SetActiveTextboxValue(table)	

}

export async function ShowTables() {
	pnl_loading.show()
	pnl_board.hide()

	pnl_board.html('')


	var tables = await getTables();
	for (var table of tables) {
		pnl_board.append(`
			<div><a href="javascript:void(0)" onclick="$ui.lst_tbl_click(this)">${table.TABLE_NAME}</a></div>
		`)
	}

	pnl_loading.hide()
	pnl_board.show()
}


async function getTables() {
	return [
		{TABLE_NAME: "table1"},
		{TABLE_NAME: "table2"},
		{TABLE_NAME: "table3"},
		{TABLE_NAME: "table4"},
		{TABLE_NAME: "table5"},
		{TABLE_NAME: "table6"},
		{TABLE_NAME: "table7"},
		{TABLE_NAME: "table8"},
		{TABLE_NAME: "table9"}
	]
}