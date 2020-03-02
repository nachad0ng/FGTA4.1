'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Propinsi",
	autoid: true,

	persistent: {
		'mst_prov' : {
			comment: 'daftar propinsi',
			primarykeys: ['prov_id'],
			data: {
				prov_id: {text:'ID', type: dbtype.varchar(14), null:false},
				prov_name: {text:'Propinsi', type: dbtype.varchar(90), uppercase:true}
			}
		}
	},

	schema: {
		header: 'mst_prov',
		detils: {
			// 'jurnaldetil' : {table:'fgt_testjurnaldetil', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}



