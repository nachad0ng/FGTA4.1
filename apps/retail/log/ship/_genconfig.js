'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Shipment",
	autoid: true,

	persistent: {
		'trn_logship' : {
			primarykeys: ['logship_id'],
			comment: 'Shipment Barang Retail',
			data: {
				logship_id: {type: dbtype.varchar(13), null:false},
				logship_ref: {type: dbtype.varchar(30), null:false},

				logship_date : {type: dbtype.date, null:false},
				logship_qty : {type: dbtype.int(4), null:false},
				logship_value : {type: dbtype.decimal(18,2), null:false},

				logship_po: {type: dbtype.varchar(30), null:false},
				logship_dm: {type: dbtype.varchar(30), null:false},
				logship_form_e: {type: dbtype.varchar(30), null:false},
				logship_form_d: {type: dbtype.varchar(30), null:false},

				logship_dtpickup: {type: dbtype.date, null:false},
				logship_dtetd: {type: dbtype.date, null:false},
				logship_dteta: {type: dbtype.date, null:false},

				logshipterm_id : {type: dbtype.varchar(13), null:false},
				logshipmethod_id : {type: dbtype.varchar(13), null:false},
				
				brand_id: {type: dbtype.varchar(10), null:false},
				sea_id: {type: dbtype.varchar(10), null:false},
				curr_id: {type: dbtype.varchar(10), null:false},

				partner_id: {type: dbtype.varchar(13), null:false}, // principal

			}
		},
	},

	schema: {
		header: 'trn_logship',
		detils: {}
	}
}



// mst_shipcostgro
// shipment cost group



// mst_shipcostcomp
// shipment cost componen



