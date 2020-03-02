CREATE TABLE `mst_brand` (
	`brand_id` varchar(14) NOT NULL , 
	`brand_name` varchar(90)  , 
	`brand_nameshort` varchar(30)  , 
	`brand_descr` varchar(255)  , 
	`brand_isdisabled` tinyint(1)  , 
	`bussinesstype_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`brand_id`),
	UNIQUE KEY(brand_name) 
) 
ENGINE=InnoDB
COMMENT='daftar brand';

ALTER TABLE `mst_brand` ADD KEY `bussinesstype_id` (`bussinesstype_id`);
ALTER TABLE `mst_brand` ADD CONSTRAINT `fk_mst_brand_mst_bussinesstype` FOREIGN KEY (`bussinesstype_id`) REFERENCES `mst_bussinesstype` (`bussinesstype_id`);



