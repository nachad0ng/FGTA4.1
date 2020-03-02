CREATE TABLE `mst_bussinesstype` (
	`bussinesstype_id` varchar(6) NOT NULL , 
	`bussinesstype_name` varchar(90)  , 
	`bussinesstype_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`bussinesstype_id`),
	UNIQUE KEY(bussinesstype_name) 
) 
ENGINE=InnoDB
COMMENT='Tipe bisnis, misal: FNB, Parking, Fashion Retail, Kelontong, dll';





