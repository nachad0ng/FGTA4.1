'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tipe Lokasi",
	autoid: false,

	persistent: {
		'mst_loctype' : {
			primarykeys: ['loctype_id'],
			data: {
				loctype_id: {type: dbtype.varchar(6), null:false, uppercase: true},
				loctype_name: {type: dbtype.varchar(90), uppercase: true },
				loctype_descr: {type: dbtype.varchar(255)},
			}
		}
	},

	schema: {
		header: 'mst_loctype',
		detils: {
			// 'jurnaldetil' : {table:'fgt_testjurnaldetil', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}



