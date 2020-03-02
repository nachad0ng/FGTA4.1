import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './ship.apis.mjs'
import * as pList from './ship-list.mjs'
import * as pEdit from './ship-edit.mjs'
import * as pSelTerm from './ship-selterm.mjs'
import * as pSelMethod from './ship-selmethod.mjs'
import * as pSelBrand from './ship-selbrand.mjs'
import * as pSelSea from './ship-selsea.mjs'
import * as pSelCurr from './ship-selcurr.mjs'
import * as pSelPartner from './ship-selpartner.mjs'


const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_selterm = $('#pnl_selterm')
const pnl_selmethod = $('#pnl_selmethod')
const pnl_selbrand = $('#pnl_selbrand')
const pnl_selsea = $('#pnl_selsea')
const pnl_selcurr = $('#pnl_selcurr')
const pnl_selpartner = $('#pnl_selpartner')


var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init() {
	// $ui.grd_list = new fgta4grid()
	// $ui.grd_edit = new fgta4grid()

	global.fgta4grid = fgta4grid
	global.fgta4form = fgta4form

	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_selterm, handler: pSelTerm},
			{panel: pnl_selmethod, handler: pSelMethod},
			{panel: pnl_selbrand, handler: pSelBrand},
			{panel: pnl_selsea, handler: pSelSea},
			{panel: pnl_selcurr, handler: pSelCurr},
			{panel: pnl_selpartner, handler: pSelPartner},
		])

	$ui.setPages(pages)

	document.addEventListener('OnButtonHome', (ev) => {
		if (ev.detail.cancel) {
			return
		}
		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	



	await PreloadData()

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}



async function PreloadData() {
	
}