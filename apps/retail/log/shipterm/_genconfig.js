'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "shipterm",
	autoid: false,

	persistent: {
		'mst_logshipterm' : {
			primarykeys: ['logshipterm_id'],
			data: {
				logshipterm_id: {type: dbtype.varchar(13), null:false},
				logshipterm_name: {type: dbtype.varchar(30) }
			}
		}
	},

	schema: {
		header: 'mst_logshipterm',
		detils: {}
	}
}



