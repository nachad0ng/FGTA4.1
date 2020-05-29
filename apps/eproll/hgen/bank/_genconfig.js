'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Bank(s)",
  autoid: true,

  persistent: {
    'mst_bank': {
      comment: 'daftar Bank',
      primarykeys: ['bank_id'],
      data: {
        bank_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        bank_name: { text: 'Bank', type: dbtype.varchar(90), uppercase: true },
        bank_alamat: { text: 'Alamat', type: dbtype.varchar(255) },
        bank_isdisabled: { type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_bank',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}