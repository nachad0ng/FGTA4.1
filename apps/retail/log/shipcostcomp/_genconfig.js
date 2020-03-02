'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "shipcostcomp",
	autoid: false,

	persistent: {
		'mst_logshipcostcomp' : {
			primarykeys: ['logshipcostcomp_id'],
			data: {
				logshipcostcomp_id: {type: dbtype.varchar(13), null:false},
				logshipcostcomp_name: {type: dbtype.varchar(30) },
				logshipcostsrc_id: {type: dbtype.varchar(13), null:true, comp: comp.Combobox({table:'mst_logshipcostsrc', id:'logshipcostsrc_id', text:'logshipcostsrc_name'})},
				logshipcostcomp_isdisabled: {type: dbtype.boolean, null:false, default:'0'},
			}
		}
	},

	schema: {
		header: 'mst_logshipcostcomp',
		detils: {}
	}
}



