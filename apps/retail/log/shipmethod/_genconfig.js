'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "shipmethod",
	autoid: false,

	persistent: {
		'mst_logshipmethod' : {
			primarykeys: ['logshipmethod_id'],
			data: {
				logshipmethod_id: {type: dbtype.varchar(13), null:false},
				logshipmethod_name: {type: dbtype.varchar(30) }
			}
		}
	},

	schema: {
		header: 'mst_logshipmethod',
		detils: {}
	}
}



