CREATE TABLE `mst_provinsi` (
	`provinsi_id` varchar(13) NOT NULL , 
	`provinsi_name` varchar(50)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`provinsi_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Provinsi';





