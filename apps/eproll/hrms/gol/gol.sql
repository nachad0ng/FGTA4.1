CREATE TABLE `mst_gol` (
	`gol_id` varchar(13) NOT NULL , 
	`gol_name` varchar(50)  , 
	`gol_descr` varchar(250)  , 
	`gol_code` varchar(30)  , 
	`gol_level` varchar(30)  , 
	`gol_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`gol_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Golongan';





