'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Kontrak",
  autoid: true,

  persistent: {
    'mst_kontrak': {
      comment: 'daftar Kontrak',
      primarykeys: ['kontrak_id'],
      data: {
        kontrak_id: { text: 'ID', type: dbtype.varchar(13), null: false, suppresslist: true },
        kontrak_name: { text: 'Kontrak', type: dbtype.varchar(90) },
        kontrak_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(10) },
        kontrak_code: { text: 'Code', type: dbtype.varchar(10) },
        kontrak_descr: { text: 'Descr', type: dbtype.varchar(250), null: false },
        kontrak_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_kontrak',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}