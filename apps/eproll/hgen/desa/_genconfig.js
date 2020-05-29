'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Desa/ Kelurahan",
  autoid: false,

  persistent: {
    'mst_desa': {
      comment: 'daftar Desa/ Kelurahan',
      primarykeys: ['desa_id'],
      data: {
        desa_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        desa_name: { text: 'Desa', type: dbtype.varchar(50), uppercase: true },
        kecamatan_id: { text: 'Kecamatan', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_kecamatan', field_value: 'kecamatan_id', field_display: 'kecamatan_name', api: 'eproll/hgen/kecamatan/list' }) }
      }
    }
  },

  schema: {
    header: 'mst_desa',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}