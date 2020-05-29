'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Jabatan",
  autoid: true,

  persistent: {
    'mst_jabatan': {
      comment: 'daftar Jabatan',
      primarykeys: ['jabatan_id'],
      data: {
        jabatan_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        jabatan_name: { text: 'Jabatan', type: dbtype.varchar(50), uppercase: true },
        jabatan_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(20) },
        jabatan_descr: { text: 'Descr', type: dbtype.varchar(250) },
        jabatan_code: { text: 'Code', type: dbtype.varchar(30) },
        jabatan_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_jabatan',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}