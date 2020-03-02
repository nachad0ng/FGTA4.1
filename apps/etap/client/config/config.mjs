import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './config.apis.mjs'
import * as pSelStore from './config-selstore.mjs'
import * as pSelDb from './config-seldb.mjs'
import * as pSelScm from './config-selscm.mjs'
import * as pSelFld from './config-selfld.mjs'
import * as pLstFld from './config-lstfld.mjs'
import * as pLstTbl from './config-lsttbl.mjs'
import * as pPreview from './config-preview.mjs'


const pnl_selstore = $('#pnl_selstore')
const pnl_seldb = $('#pnl_seldb')
const pnl_selscm = $('#pnl_selscm')
const pnl_selfld = $('#pnl_selfld')
const pnl_lstfld = $('#pnl_lstfld')
const pnl_lsttbl = $('#pnl_lsttbl')
const pnl_preview = $('#pnl_preview')


var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}

export async function init() {
	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_selstore, handler: pSelStore},
			{panel: pnl_seldb, handler: pSelDb},
			{panel: pnl_selscm, handler: pSelScm},
			{panel: pnl_selfld, handler: pSelFld},
			{panel: pnl_lstfld, handler: pLstFld},
			{panel: pnl_lsttbl, handler: pLstTbl},
			{panel: pnl_preview, handler: pPreview}
		])

	$ui.setPages(pages)


	document.addEventListener('OnButtonHome', (ev) => {
		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})
	
	
}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}

export function lst_store_click(el) {

	var dbtype = $(el).attr('dbtype')
	var store = {
		store_id: $(el).attr('store_id'),
		store_name: $(el).html()
	}

	$ui.getPages().ITEMS['pnl_selstore'].handler.SelectStore(store, dbtype)	
}


export function lst_db_click(el) {
	var enabled = $(el).attr('enabled')
	if (enabled!="true") {
		return
	}

	var dbtype = {
		id: $(el).attr('dbtype'),
		name: $(el).html()
	} 
	
	$ui.getPages().ITEMS['pnl_seldb'].handler.SelectDb(dbtype)	

}


export function lst_scm_click(el) {
	var enabled = $(el).attr('enabled')
	if (enabled!="true") {
		return
	}

	var schema = $(el).attr('schema')
	$ui.getPages().ITEMS['pnl_selscm'].handler.SelectSchema(schema)	

}


export function lst_tbl_click(el) {
	var table = $(el).html()
	$ui.getPages().ITEMS['pnl_lsttbl'].handler.SelectTable(table)	
}

export function lst_fld_click(el) {
	var field = $(el).html()
	$ui.getPages().ITEMS['pnl_lstfld'].handler.SelectField(field)		
}



export function datapreview(el) {
	var args = {}
	$ui.getPages().ITEMS['pnl_selfld'].handler.Preview(args)	
}