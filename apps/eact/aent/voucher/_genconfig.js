'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Voucher",
  autoid: true,

  persistent: {
    'trn_journal': {
      comment: 'Journal List',
      primarykeys: ['journal_id'],
      data: {
        journal_id: { text: 'ID', type: dbtype.varchar(30), null: false, suppresslist: true },
        journal_descr: { text: 'Descr', type: dbtype.varchar(30) },
        journal_bookdate: { text: 'Bookdate', type: dbtype.varchar(200) },
        journal_duedate: { text: 'Duedate', type: dbtype.varchar(50), suppresslist: true },
        journal_source: { text: 'Source', type: dbtype.varchar(5), suppresslist: true },
        journal_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '1', suppresslist: true },
        journal_isposted: { text: 'Posted', type: dbtype.boolean, null: false, default: '1', suppresslist: true },
        journal_isreversed: { text: 'Reversed', type: dbtype.boolean, null: false, default: '1', suppresslist: true },
        channel_id: { text: 'Channel', type: dbtype.varchar(10), suppresslist: true },
        region_id: { text: 'Region', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_region', field_value: 'region_id', field_display: 'region_name', api: 'eact/acmst/region/list' }), suppresslist: true },
        branch_id: { text: 'Branch', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_branch', field_value: 'branch_id', field_display: 'branch_name', api: 'eact/acmst/branch/list' }), suppresslist: true },
        strukturunit_id: { text: 'Strukturunit', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_strukt', field_value: 'strukt_id', field_display: 'strukt_name', api: 'eact/acmst/strukt/list' }), suppresslist: true },
        rekanan_id: { text: 'Rekanan', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_rekanan', field_value: 'rekanan_id', field_display: 'rekanan_name', api: 'eact/acmst/rek/list' }), suppresslist: true },
        rekanansub_id: { text: 'Rekanan Sub', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_rekanansub', field_value: 'rekanansub_id', field_display: 'rekanansub_name', api: 'eact/acmst/reksub/list' }), suppresslist: true },
        periode_id: { text: 'Periode', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_periode', field_value: 'periode_id', field_display: 'periode_name', api: 'eact/acmst/period/list' }), suppresslist: true },
        acc_id: { text: 'Account', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_acc', field_value: 'acc_id', field_display: 'acc_name', api: 'eact/acmst/acc/list' }), suppresslist: true },
        journaltype_id: { text: 'Alamat', type: dbtype.varchar(255), suppresslist: true },
        sub1_id: { text: 'Sub1', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_sub1', field_value: 'sub1_id', field_display: 'sub1_name', api: 'eact/acmst/sub1/list' }), suppresslist: true },
        sub2_id: { text: 'Sub2', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_sub2', field_value: 'sub2_id', field_display: 'sub2_name', api: 'eact/acmst/sub2/list' }), suppresslist: true },
        curr_id: { text: 'Currency', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_curr', field_value: 'curr_id', field_display: 'curr_name', api: 'eact/acmst/curr/list' }), suppresslist: true }
      }
    },

    'trn_journald': {
      comment: 'Journal Detail',
      primarykeys: ['journald_id'],
      data: {
        journald_id: { text: 'ID(d)', type: dbtype.varchar(14), null: false },
        journald_line: { text: 'Line', type: dbtype.int(8), null: false },
        journald_descr: { text: 'Descr', type: dbtype.varchar(14), null: false },
        acc_id: { text: 'Account', type: dbtype.varchar(13), null: false, comp: comp.Combo({ table: 'mst_acc', field_value: 'acc_id', field_display: 'acc_name', api: 'eact/acmst/acc/list' }) },
        journal_id: { text: 'ID(h)', type: dbtype.varchar(14), null: false },
        journald_idr: { text: 'Amount', type: dbtype.decimal(18, 2) }
      }
    }
  },

  schema: {
    header: 'trn_journal',
    detils: {
      'detail': { table: 'trn_journald', form: true, headerview: 'employee_name' }
      //	'telp' : {table:'fgt_formgentelp', form: true},
      //	'info' : {},
      //	'log' : {}
    }
  }
}