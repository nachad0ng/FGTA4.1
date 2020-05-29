CREATE TABLE `mst_agama` (
	`agama_id` varchar(13) NOT NULL , 
	`agama_name` varchar(50)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`agama_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Agama';





