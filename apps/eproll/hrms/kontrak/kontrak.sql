CREATE TABLE `mst_kontrak` (
	`kontrak_id` varchar(13) NOT NULL , 
	`kontrak_name` varchar(90)  , 
	`kontrak_nameshort` varchar(10)  , 
	`kontrak_code` varchar(10)  , 
	`kontrak_descr` varchar(250) NOT NULL , 
	`kontrak_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`kontrak_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Kontrak';





