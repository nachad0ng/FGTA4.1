CREATE TABLE `mst_jabatan` (
	`jabatan_id` varchar(13) NOT NULL , 
	`jabatan_name` varchar(50)  , 
	`jabatan_nameshort` varchar(20)  , 
	`jabatan_descr` varchar(250)  , 
	`jabatan_code` varchar(30)  , 
	`jabatan_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jabatan_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Jabatan';





