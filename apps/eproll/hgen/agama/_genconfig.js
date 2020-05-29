'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Agama",
  autoid: false,

  persistent: {
    'mst_agama': {
      comment: 'daftar Agama',
      primarykeys: ['agama_id'],
      data: {
        agama_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        agama_name: { text: 'Agama', type: dbtype.varchar(50), uppercase: true }
      }
    }
  },

  schema: {
    header: 'mst_agama',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}