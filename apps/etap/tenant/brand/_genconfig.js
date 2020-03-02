'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Brand",
	autoid: true,

	persistent: {
		'mst_brand' : {
			comment: 'daftar brand',
			primarykeys: ['brand_id'],
			data: {
				brand_id: {text:'ID', type: dbtype.varchar(14), null:false},
				brand_name: {text:'Name', type: dbtype.varchar(90), uppercase: true },
				brand_nameshort: {text:'Name Short', type: dbtype.varchar(30), uppercase: true, suppresslist:true },
				brand_descr: {text: 'Descr', type: dbtype.varchar(255), suppresslist:true },
				brand_isdisabled: {text: 'Disabled', type: dbtype.boolean},
				bussinesstype_id: {text:'Bussiness Type', type: dbtype.varchar(14), null:false, comp: comp.Combo({table: 'mst_bussinesstype', field_value: 'bussinesstype_id', field_display: 'bussinesstype_name', api: 'etap/tenant/bussinesstype/list'})},
			}
		}
	},

	schema: {
		title: 'Brand',
		header: 'mst_brand',
		detils: {
			// 'jurnaldetil' : {table:'fgt_testjurnaldetil', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}

