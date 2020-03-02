CREATE TABLE `trn_logship` (
	`logship_id` varchar(13) NOT NULL , 
	`logship_ref` varchar(30) NOT NULL , 
	`logship_date` date NOT NULL , 
	`logship_qty` int(4) NOT NULL , 
	`logship_value` decimal(18, 2) NOT NULL , 
	`logship_po` varchar(30) NOT NULL , 
	`logship_dm` varchar(30) NOT NULL , 
	`logship_form_e` varchar(30) NOT NULL , 
	`logship_form_d` varchar(30) NOT NULL , 
	`logship_dtpickup` date NOT NULL , 
	`logship_dtetd` date NOT NULL , 
	`logship_dteta` date NOT NULL , 
	`logshipterm_id` varchar(13) NOT NULL , 
	`logshipmethod_id` varchar(13) NOT NULL , 
	`brand_id` varchar(10) NOT NULL , 
	`sea_id` varchar(10) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`partner_id` varchar(13) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`logship_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Shipment Barang Retail'


