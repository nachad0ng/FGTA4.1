CREATE TABLE `mst_divisi` (
	`divisi_id` varchar(13) NOT NULL , 
	`divisi_name` varchar(50)  , 
	`divisi_nameshort` varchar(20)  , 
	`divisi_pic` varchar(50)  , 
	`divisi_level` varchar(13)  , 
	`divisi_namereport` varchar(50)  , 
	`divisi_parent` varchar(13)  , 
	`divisi_path` varchar(500)  , 
	`divisi_isgroup` tinyint(1) NOT NULL DEFAULT 1, 
	`divisi_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`divisi_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Divisi/ Departemen';





