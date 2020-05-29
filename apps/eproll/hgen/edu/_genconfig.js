'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Pendidikan",
  autoid: true,

  persistent: {
    'mst_edu': {
      comment: 'daftar Pendidikan',
      primarykeys: ['edu_id'],
      data: {
        edu_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        edu_name: { text: 'Pendidikan', type: dbtype.varchar(50), uppercase: true },
        edu_descr: { text: 'Descr', type: dbtype.varchar(250) }
      }
    }
  },

  schema: {
    header: 'mst_edu',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}