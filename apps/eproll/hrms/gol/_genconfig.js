'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Golongan",
  autoid: true,

  persistent: {
    'mst_gol': {
      comment: 'daftar Golongan',
      primarykeys: ['gol_id'],
      data: {
        gol_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        gol_name: { text: 'Golongan', type: dbtype.varchar(50), uppercase: true },
        gol_descr: { text: 'Descr', type: dbtype.varchar(250) },
        gol_code: { text: 'Code', type: dbtype.varchar(30), uppercase: true },
        gol_level: { text: 'Level', type: dbtype.varchar(30) },
        gol_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_gol',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}