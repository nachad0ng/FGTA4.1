'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Kota",
  autoid: false,

  persistent: {
    'mst_kota': {
      comment: 'daftar Kota',
      primarykeys: ['kota_id'],
      data: {
        kota_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        kota_name: { text: 'Kota', type: dbtype.varchar(50), uppercase: true },
        provinsi_id: { text: 'Provinsi', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_provinsi', field_value: 'provinsi_id', field_display: 'provinsi_name', api: 'eproll/hgen/provinsi/list' }) }
      }
    }
  },

  schema: {
    header: 'mst_kota',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}