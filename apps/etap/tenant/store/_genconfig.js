'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Daftar Store",
	autoid: true,

	persistent: {
		'mst_store' : {
			primarykeys: ['store_id'],
			data: {
				store_id: {type: dbtype.varchar(14), null:false},
				store_name: {type: dbtype.varchar(30), uppercase: true },
				company_id: {type: dbtype.varchar(14), null:false, comp: comp.Combo({table: 'mst_company', field_value: 'company_id', field_display: 'company_name'})},
				bussinesstype_id: {type: dbtype.varchar(6), null:false, comp: comp.Combo({table: 'mst_bussinesstype', field_value: 'bussinesstype_id', field_display: 'bussinesstype_name'})},
				loc_id: {type: dbtype.varchar(14), null:false, comp: comp.Combo({table: 'mst_loc', field_value: 'loc_id', field_display: 'loc_name'})},
			}
		}
	},

	schema: {
		header: 'mst_store',
		detils: {
			// 'jurnaldetil' : {table:'fgt_testjurnaldetil', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}

