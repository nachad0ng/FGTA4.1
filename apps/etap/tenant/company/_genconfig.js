'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Company",
	autoid: true,

	persistent: {
		'mst_company' : {
			primarykeys: ['company_id'],
			data: {
				company_id: {type: dbtype.varchar(14), null:false},
				company_name: {type: dbtype.varchar(90), uppercase: true },
				company_address: {type: dbtype.varchar(255) },
				company_city: {type: dbtype.varchar(255), uppercase: true },
				company_telp: {type: dbtype.varchar(14) },
				company_email: {type: dbtype.varchar(60) },
				company_npwp: {type: dbtype.varchar(30) },
				company_isdisabled: {type: dbtype.boolean }
			}
		},

		'mst_companybrand' : {
			primarykeys: ['companybrand_id'],
			data: {
				companybrand_id: {type: dbtype.varchar(14), null:false},
				brand_name: {type: dbtype.varchar(90), uppercase: true },
				brand_nameshort: {type: dbtype.varchar(90), uppercase: true },
				brand_isdisabled: {type: dbtype.boolean },
				company_id: {type: dbtype.varchar(14), null:false},
			}
		},

		'mst_companypic' : {
			primarykeys: ['companypic_id'],
			data: {
				companypic_id: {type: dbtype.varchar(14), null:false},
				companypic_name: {type: dbtype.varchar(90) , uppercase: true },
				companypic_resp: {type: dbtype.varchar(90), uppercase: true  },
				companypic_email: {type: dbtype.varchar(90) },
				companypic_phone: {type: dbtype.varchar(90) },
				company_id: {type: dbtype.varchar(14), null:false},
			}
		},		
		
	},

	schema: {
		title: "Company",
		header: 'mst_company',
		detils: {
			'brand' : {title: 'Brand', table:'mst_companybrand', form: true},
			'pic' : {title: 'Person in Charge', table:'mst_companypic', form: true},
			// 'jurnalpaymn' : {table:'fgt_testjurnalpaymn', form: true},
			// 'info' : {},
			// 'log' : {}
		}
	}
}



