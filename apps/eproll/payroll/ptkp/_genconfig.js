'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "PTKP",
  autoid: true,

  persistent: {
    'mst_ptkp': {
      comment: 'daftar PTKP',
      primarykeys: ['ptkp_id'],
      data: {
        ptkp_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        ptkp_name: { text: 'PTKP', type: dbtype.varchar(50), uppercase: true },
        ptkp_descr: { text: 'Descr', type: dbtype.varchar(250) },
        ptkp_limit: { text: 'Limit', type: dbtype.decimal(18, 0) },
        ptkp_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_ptkp',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}