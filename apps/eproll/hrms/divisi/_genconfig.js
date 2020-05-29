'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Divisi/ Departemen Form",
  autoid: true,

  persistent: {
    'mst_divisi': {
      comment: 'daftar Divisi/ Departemen',
      primarykeys: ['divisi_id'],
      data: {
        divisi_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        divisi_name: { text: 'Divisi/ Dept.', type: dbtype.varchar(50), uppercase: true },
        divisi_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(20) },
        divisi_pic: { text: 'PIC', type: dbtype.varchar(50) },
        divisi_level: { text: 'Level', type: dbtype.varchar(13) },
        divisi_namereport: { text: 'Nama di Laporan', type: dbtype.varchar(50), uppercase: true },
        divisi_parent: { text: 'Parent', type: dbtype.varchar(13) },
        divisi_path: { text: 'Path', type: dbtype.varchar(500) },
        divisi_isgroup: { text: 'isGroup', type: dbtype.boolean, null: false, default: '1' },
        divisi_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_divisi',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}