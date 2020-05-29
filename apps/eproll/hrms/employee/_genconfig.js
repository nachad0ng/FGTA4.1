'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Karyawan",
  autoid: true,

  persistent: {
    'mst_employee': {
      comment: 'daftar Karyawan',
      primarykeys: ['employee_id'],
      data: {
        employee_id: { text: 'ID', type: dbtype.varchar(30), null: false, suppresslist: true },
        employee_nipp: { text: 'NIPP', type: dbtype.varchar(30) },
        employee_name: { text: 'Karyawan', type: dbtype.varchar(200) },
        employee_ktp: { text: 'KTP', type: dbtype.varchar(50), suppresslist: true },
        employee_tplahir: { text: 'Tempat Lahir', type: dbtype.varchar(50), suppresslist: true },
        employee_tglahir: { text: 'Tanggal Lahir', type: dbtype.date, null: false, suppresslist: true },
        employee_alamat: { text: 'Alamat', type: dbtype.varchar(255), suppresslist: true },
        employee_sex: { text: 'Jenis Kelamin', type: dbtype.varchar(5), suppresslist: true },
        agama_id: { text: 'Agama', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_agama', field_value: 'agama_id', field_display: 'agama_name', api: 'eproll/hgen/agama/list' }), suppresslist: true },
        edu_id: { text: 'Pendidikan', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_edu', field_value: 'edu_id', field_display: 'edu_name', api: 'eproll/hgen/edu/list' }), suppresslist: true },
        employee_email: { text: 'Email', type: dbtype.varchar(100), suppresslist: true },
        employee_status: { text: 'Status Pernikahan', type: dbtype.varchar(255), suppresslist: true }, /** single/ married */
        employee_telp: { text: 'Telp.', type: dbtype.varchar(20), suppresslist: true },
        employee_tanggungan: { text: 'Tanggungan', type: dbtype.int(8), null: false, suppresslist: true },
        regional_id: { text: 'Regional', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_regional', field_value: 'regional_id', field_display: 'regional_name', api: 'eproll/hrms/regional/list' }) },
        divisi_id: { text: 'Divisi', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_divisi', field_value: 'divisi_id', field_display: 'divisi_name', api: 'eproll/hrms/divisi/list' }) },
        jabatan_id: { text: 'Jabatan', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_jabatan', field_value: 'jabatan_id', field_display: 'jabatan_name', api: 'eproll/hrms/jabatan/list' }) },
        gol_id: { text: 'Golongan', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_gol', field_value: 'gol_id', field_display: 'gol_name', api: 'eproll/hrms/gol/list' }) },
        kontrak_id: { text: 'Kontrak', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_kontrak', field_value: 'kontrak_id', field_display: 'kontrak_name', api: 'eproll/hrms/kontrak/list' }) },
        employee_datestart: { text: 'Aktif Mulai', type: dbtype.date, null: false },
        employee_dateend: { text: 'Aktif Sampai', type: dbtype.date, null: false, suppresslist: true },
        employee_isshift: { text: 'Shifted', type: dbtype.boolean, null: false, default: '1', suppresslist: true },
        employee_npwp: { text: 'NPWP', type: dbtype.varchar(50) },
        ptkp_id: { text: 'PTKP', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_ptkp', field_value: 'ptkp_id', field_display: 'ptkp_name', api: 'eproll/hrms/ptkp/list' }) },
        employee_isactive: { text: 'Active', type: dbtype.boolean, null: false, default: '1', suppresslist: true },
        bank_id: { text: 'Bank', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_bank', field_value: 'bank_id', field_display: 'bank_name', api: 'eproll/hgen/bank/list' }), suppresslist: true },
        employee_rek: { text: 'Rekening', type: dbtype.varchar(100), suppresslist: true },
        employee_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1', suppresslist: true }
      }
    },

    'mst_empkomp': {
      comment: 'Daftar Komponen Employee',
      primarykeys: ['empkomp_id'],
      data: {
        empkomp_id: { text: 'ID', type: dbtype.varchar(14), null: false },
        komp_id: { text: 'Komponen', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_komp', field_value: 'komp_id', field_display: 'komp_name', api: 'eproll/payroll/komp/list' }) },
        employee_id: { text: 'Employee', type: dbtype.varchar(14), null: false },
        empkomp_descr: { text: 'Descr', type: dbtype.varchar(250) },
        empkomp_amount: { text: 'Amount', type: dbtype.decimal(18, 2) }
      }
    }
  },

  schema: {
    header: 'mst_employee',
    detils: {
      'Komponen': { table: 'mst_empkomp', form: true, headerview: 'employee_name' }
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}