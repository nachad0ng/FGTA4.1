CREATE TABLE `mst_logshipcostcomp` (
	`logshipcostcomp_id` varchar(13) NOT NULL , 
	`logshipcostcomp_name` varchar(30)  , 
	`logshipcostsrc_id` varchar(13)  , 
	`logshipcostcomp_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`logshipcostcomp_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='SHIPMENT COST COMPONEN'


