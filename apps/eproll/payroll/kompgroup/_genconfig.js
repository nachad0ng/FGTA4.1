'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Komponen Group",
  autoid: true,

  persistent: {
    'mst_kompgroup': {
      comment: 'daftar Komponen Group',
      primarykeys: ['kompgroup_id'],
      data: {
        kompgroup_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        kompgroup_name: { text: 'Group Komponen', type: dbtype.varchar(50), uppercase: true },
        kompgroup_code: { text: 'Descr', type: dbtype.varchar(20), uppercase: true },
        kompgroup_rule: { text: 'Rule', type: dbtype.varchar(5), null: false },
        kompgroup_istax: { text: 'Taxed', type: dbtype.boolean, null: false, default: '1' },
        kompgroup_period: { text: 'Periode', type: dbtype.varchar(5) },
        kompgroup_acc: { text: 'Account', type: dbtype.varchar(20) },
        kompgroup_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_kompgroup',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}