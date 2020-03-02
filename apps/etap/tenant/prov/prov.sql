CREATE TABLE `mst_prov` (
	`prov_id` varchar(14) NOT NULL , 
	`prov_name` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`prov_id`),
	UNIQUE KEY(prov_name) 
) 
ENGINE=InnoDB
COMMENT='daftar propinsi';









