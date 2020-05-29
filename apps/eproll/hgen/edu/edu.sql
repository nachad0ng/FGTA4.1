CREATE TABLE `mst_edu` (
	`edu_id` varchar(13) NOT NULL , 
	`edu_name` varchar(50)  , 
	`edu_descr` varchar(250)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`edu_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Pendidikan';





