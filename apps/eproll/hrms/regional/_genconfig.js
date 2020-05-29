'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Regional",
  autoid: true,

  persistent: {
    'mst_regional': {
      comment: 'daftar Regional',
      primarykeys: ['regional_id'],
      data: {
        regional_id: { text: 'ID', type: dbtype.varchar(13), null: false, suppresslist: true },
        regional_name: { text: 'Regional', type: dbtype.varchar(90), uppercase: true },
        regional_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(10), uppercase: true },
        regional_code: { text: 'Code', type: dbtype.varchar(10) },
        regional_npwp: { text: 'NPWP', type: dbtype.varchar(13), null: false, suppresslist: true },
        regional_alamat: { text: 'Alamat', type: dbtype.varchar(250), null: false, suppresslist: true },
        provinsi_id: { text: 'Provinsi', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_provinsi', field_value: 'provinsi_id', field_display: 'provinsi_name', api: 'eproll/hgen/provinsi/list' }) },
        kota_id: { text: 'Kota', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_kota', field_value: 'kota_id', field_display: 'kota_name', api: 'eproll/hgen/kota/list' }) },
        kecamatan_id: { text: 'Kecamatan', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_kecamatan', field_value: 'kecamatan_id', field_display: 'kecamatan_name', api: 'eproll/hgen/kecamatan/list' }) },
        desa_id: { text: 'Desa', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_desa', field_value: 'desa_id', field_display: 'desa_name', api: 'eproll/hgen/desa/list' }) },
        regional_telp: { text: 'Telp.', type: dbtype.varchar(50), null: false },
        regional_email: { text: 'Email', type: dbtype.varchar(50), null: false, suppresslist: true },
        regional_descr: { text: 'Descr', type: dbtype.varchar(50), null: false, suppresslist: true },
        regional_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1', suppresslist: true }
      }
    }
  },

  schema: {
    header: 'mst_regional',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}