'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Rule",
  autoid: true,

  persistent: {
    'mst_rule': {
      comment: 'daftar Rule',
      primarykeys: ['rule_id'],
      data: {
        rule_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        rule_name: { text: 'Rule', type: dbtype.varchar(50), uppercase: true },
        rule_code: { text: 'Code', type: dbtype.varchar(20), uppercase: true },
        rule_operator: { text: 'Operator', type: dbtype.varchar(5), null: false },
        rule_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_rule',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}