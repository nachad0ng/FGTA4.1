'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "City",
	autoid: true,

	persistent: {
		'mst_city' : {
			comment: 'Daftar Kota',
			primarykeys: ['city_id'],
			data: {
				city_id: {text:'ID', type: dbtype.varchar(14), null:false},
				city_name: {text: 'City Name', type: dbtype.varchar(90), uppercase: true },
				prov_id: {
					text: 'Province', type: dbtype.varchar(14), null:false, 
					comp: comp.Combo({
						table: 'mst_prov', 
						field_value: 'prov_id', field_display: 'prov_name', 
						api: 'etap/tenant/prov/list'})},
			}
		},

		'mst_district' : {
			comment: 'Daftar District (Kecamatan)',
			primarykeys: ['district_id'],
			data: {
				district_id: {text:'ID', type: dbtype.varchar(14), null:false},
				district_name: {text:'District', type: dbtype.varchar(90), uppercase: true },
				city_id: {text:'City', type: dbtype.varchar(14), null:false}
			}
		}		
	},

	schema: {
		title: 'City',
		header: 'mst_city',
		detils: {
			'district' : {title: 'District', table:'mst_district', form: true, headerview:'city_name'},  //headerview:'city_name'
		}
	}
}



