'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "shipcostsrc",
	autoid: false,

	persistent: {
		'mst_logshipcostsrc' : {
			primarykeys: ['logshipcostsrc_id'],
			data: {
				logshipcostsrc_id: {type: dbtype.varchar(13), null:false},
				logshipcostsrc_name: {type: dbtype.varchar(30) },
				partner_id: {type: dbtype.varchar(13), null:true, comp: comp.Combobox({table:'mst_partner', id:'partner_id', text:'partner_name'})},
			}
		}
	},

	schema: {
		header: 'mst_logshipcostsrc',
		detils: {}
	}
}



