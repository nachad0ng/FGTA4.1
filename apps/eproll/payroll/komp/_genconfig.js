'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Komponen",
  autoid: true,

  persistent: {
    'mst_komp': {
      comment: 'daftar Komponen',
      primarykeys: ['komp_id'],
      data: {
        komp_id: { text: 'ID', type: dbtype.varchar(13), null: false },
        komp_name: { text: 'Komponen', type: dbtype.varchar(50), uppercase: true },
        komp_code: { text: 'Code', type: dbtype.varchar(20), uppercase: true },
        rule_id: { text: 'Rule', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_rule', field_value: 'rule_id', field_display: 'rule_name', api: 'eproll/payroll/rule/list' }) },
        kompgroup_id: { text: 'Group', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_kompgroup', field_value: 'kompgroup_id', field_display: 'kompgroup_name', api: 'eproll/payroll/kompgroup/list' }) },
        komp_istax: { text: 'Taxed', type: dbtype.boolean, null: false, default: '1' },
        komp_period: { text: 'Periode', type: dbtype.varchar(5) },
        komp_acc: { text: 'Account', type: dbtype.varchar(20) },
        komp_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1' }
      }
    }
  },

  schema: {
    header: 'mst_komp',
    detils: {
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}