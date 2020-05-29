CREATE TABLE `mst_kompgroup` (
	`kompgroup_id` varchar(13) NOT NULL , 
	`kompgroup_name` varchar(50)  , 
	`kompgroup_code` varchar(20)  , 
	`kompgroup_rule` varchar(5) NOT NULL , 
	`kompgroup_istax` tinyint(1) NOT NULL DEFAULT 1, 
	`kompgroup_period` varchar(5)  , 
	`kompgroup_acc` varchar(20)  , 
	`kompgroup_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`kompgroup_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Komponen Group';





