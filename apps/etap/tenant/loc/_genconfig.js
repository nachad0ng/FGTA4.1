'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Location",
	autoid: true,

	persistent: {
		'mst_loc' : {
			primarykeys: ['loc_id'],
			data: {
				loc_id: {type: dbtype.varchar(14), null:false},
				loc_name: {type: dbtype.varchar(90), uppercase: true },
				loc_address: {type: dbtype.varchar(90) },
				loctype_id: {type: dbtype.varchar(6), null:false},
				district_id: {type: dbtype.varchar(14), null:false},
			}
		},

		'mst_locpic' : {
			primarykeys: ['locpic_id'],
			data: {
				locpic_id: {type: dbtype.varchar(14), null:false},
				locpic_name: {type: dbtype.varchar(90) , uppercase: true },
				locpic_resp: {type: dbtype.varchar(90), uppercase: true  },
				locpic_email: {type: dbtype.varchar(90) },
				locpic_phone: {type: dbtype.varchar(90) },
				loc_id: {type: dbtype.varchar(14), null:false},
			}
		},		


	},

	schema: {
		header: 'mst_loc',
		detils: {
			'pic' : {table:'mst_locpic', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}



