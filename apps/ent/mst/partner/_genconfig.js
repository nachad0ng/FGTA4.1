'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Partner",
	autoid: true,

	persistent: {
		'mst_partner' : {
			primarykeys: ['partner_id'],
			comment: 'Daftar Partner (rekanan)',
			data: {
				partner_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				partner_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true},
				partner_addressline1: {text:'Alamat', type: dbtype.varchar(100), null:false, uppercase: true},
				partner_addressline2: {text:'..', type: dbtype.varchar(100), null:false, uppercase: true},
				partner_postcode: {text:'..', type: dbtype.varchar(10), null:false, uppercase: true},
				partner_city: {text:'..', type: dbtype.varchar(30), null:false, uppercase: true},
				partner_country: {
					text:'Country', type: dbtype.varchar(10), null:false, uppercase: true,
					comp: comp.Combo({
						table: 'mst_country', 
						field_value: 'country_id', field_display: 'country_name', 
						api: 'ent/mst/country/list'})					
				},
				partner_phone: {text:'Phone', type: dbtype.varchar(30), null:false, uppercase: true},	
				partner_mobilephone: {text:'HP', type: dbtype.varchar(30), null:false, uppercase: true},
				partner_email: {text:'Email', type: dbtype.varchar(150), null:false, uppercase: true},				
				partner_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				partnertype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, uppercase: true,
					comp: comp.Combo({
						table: 'mst_partnertype', 
						field_value: 'partnertype_id', field_display: 'partnertype_name', 
						api: 'ent/mst/partnertype/list'})					
				
				},	
				partnerorg_id: {
					text:'Org', type: dbtype.varchar(10), null:false, uppercase: true,
					comp: comp.Combo({
						table: 'mst_partnerorg', 
						field_value: 'partnerorg_id', field_display: 'partnerorg_name', 
						api: 'ent/mst/partnerorg/list'})					
				},
			},
			uniques: {
				'partner_name' : ['partner_name']
			}
		},
	},

	schema: {
		title: 'Partner',
		header: 'mst_partner',
		detils: {}
	}
}

