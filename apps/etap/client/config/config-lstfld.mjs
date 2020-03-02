var this_page_id;

const pnl_loading = $('#pnl_lstfld-loading')
const pnl_board = $('#pnl_lstfld-board')

const txt_tablename = $('#pnl-lstfld-txt_tablename')

export async function init(opt) {
	this_page_id = opt.id


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_selfld')
		}
	})	
}

export function SelectField(field) {
	$ui.getPages().show('pnl_selfld')
	$ui.getPages().ITEMS['pnl_selfld'].handler.SetActiveTextboxValue(field)	
}


export async function ShowFields(tablename) {
	// console.log(tablename)
	txt_tablename.html(tablename)

	pnl_loading.show()
	pnl_board.hide()

	pnl_board.html('')
	var fields = await getFields();	
	for (var field of fields) {
		pnl_board.append(`
			<div><a href="javascript:void(0)" onclick="$ui.lst_fld_click(this)">${field.FIELD_NAME}</a></div>
		`)
	}

	pnl_loading.hide()
	pnl_board.show()


}


async function getFields(tablename) {
	return [
		{FIELD_NAME: "field1"},
		{FIELD_NAME: "field2"},
		{FIELD_NAME: "field3"},
		{FIELD_NAME: "field4"},
		{FIELD_NAME: "field5"},
		{FIELD_NAME: "field6"},
		{FIELD_NAME: "field7"},
		{FIELD_NAME: "field8"},
		{FIELD_NAME: "field9"}
	]
}