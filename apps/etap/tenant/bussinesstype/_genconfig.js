'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Bussiness Type",
	autoid: false,

	persistent: {
		'mst_bussinesstype' : {
			comment: 'Tipe bisnis, misal: FNB, Parking, Fashion Retail, Kelontong, dll',
			primarykeys: ['bussinesstype_id'],
			data: {
				bussinesstype_id: {text:'ID', type: dbtype.varchar(6), null:false, uppercase: true},
				bussinesstype_name: {text:'Bussiness Type', type: dbtype.varchar(90), uppercase: true },
				bussinesstype_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			}
		}
	},

	schema: {
		title: 'Bussiness Type',
		header: 'mst_bussinesstype',
		detils: {
			// 'jurnaldetil' : {table:'fgt_testjurnaldetil', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}



