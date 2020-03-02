CREATE TABLE `mst_store` (
	`store_id` varchar(14) NOT NULL , 
	`store_name` varchar(90)  , 
	`store_address` varchar(255)  ,
	`store_telp` varchar(14)  , 
	`store_email` varchar(60)  , 
	`store_npwp` varchar(30)  ,	
	`company_id` varchar(14) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`store_id`),
	UNIQUE KEY(`store_name` ) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar Toko';

ALTER TABLE `mst_store` ADD KEY `company_id` (`company_id`);
ALTER TABLE `mst_store` ADD CONSTRAINT `fk_mst_store_mst_company` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`);
ALTER TABLE `mst_store` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `mst_store` ADD CONSTRAINT `fk_mst_store_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_store` ADD KEY `loc_id` (`loc_id`);
ALTER TABLE `mst_store` ADD CONSTRAINT `fk_mst_store_mst_loc` FOREIGN KEY (`loc_id`) REFERENCES `mst_loc` (`loc_id`);




CREATE TABLE `mst_storepic` (
	`storepic_id` varchar(14) NOT NULL , 
	`storepic_name` varchar(90)  , 
	`storepic_resp` varchar(90)  COMMENT 'Jabatan dari yang bersangkutan', 
	`storepic_email` varchar(90)  , 
	`storepic_phone` varchar(90)  , 
	`storepic_isdisabled` tinyint(1)  , 
	`store_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`storepic_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar PIC yang dipunyai suatu perusahaan';

ALTER TABLE `mst_storepic` ADD KEY `store_id` (`store_id`);
ALTER TABLE `mst_storepic` ADD CONSTRAINT `fk_mst_storepic_mst_store` FOREIGN KEY (`store_id`) REFERENCES `mst_store` (`store_id`);

