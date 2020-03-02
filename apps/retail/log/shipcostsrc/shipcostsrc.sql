CREATE TABLE `mst_logshipcostsrc` (
	`logshipcostsrc_id` varchar(13) NOT NULL , 
	`logshipcostsrc_name` varchar(30)  , 
	`partner_id` varchar(13)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`logshipcostsrc_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='SHIPMENT COST SOURCE'


