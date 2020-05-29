CREATE TABLE `mst_ptkp` (
	`ptkp_id` varchar(13) NOT NULL , 
	`ptkp_name` varchar(50)  , 
	`ptkp_descr` varchar(250)  , 
	`ptkp_limit` decimal(18, 0)  , 
	`ptkp_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`ptkp_id`)
) 
ENGINE=InnoDB
COMMENT='daftar PTKP';





