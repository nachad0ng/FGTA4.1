CREATE TABLE `mst_bank` (
	`bank_id` varchar(13) NOT NULL , 
	`bank_name` varchar(90)  , 
	`bank_alamat` varchar(255)  , 
	`bank_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`bank_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Bank';





