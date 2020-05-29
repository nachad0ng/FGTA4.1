'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Provinsi",
  autoid: false,

  persistent: {
    'mst_provinsi': {
      comment: 'daftar Provinsi',
      primarykeys: ['provinsi_id'],
      data: {
        provinsi_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        provinsi_name: { text: 'Provinsi', type: dbtype.varchar(50), uppercase: true }
      }
    }
  },

  schema: {
    header: 'mst_provinsi',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}