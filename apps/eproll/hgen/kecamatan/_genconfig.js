'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Kecamatan",
  autoid: false,

  persistent: {
    'mst_kecamatan': {
      comment: 'daftar Kecamatan',
      primarykeys: ['kecamatan_id'],
      data: {
        kecamatan_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        kecamatan_name: { text: 'Kecamatan', type: dbtype.varchar(50), uppercase: true },
        kota_id: { text: 'Kota', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_kota', field_value: 'kota_id', field_display: 'kota_name', api: 'eproll/hgen/kota/list' }) }
      }
    }
  },

  schema: {
    header: 'mst_kecamatan',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}