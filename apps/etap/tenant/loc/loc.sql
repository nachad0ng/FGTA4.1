CREATE TABLE `mst_loc` (
	`loc_id` varchar(14) NOT NULL , 
	`loc_name` varchar(90)  , 
	`loc_address` varchar(90)  , 
	`loctype_id` varchar(6) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`loc_id`),
	UNIQUE KEY(loc_name) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar Lokasi';

ALTER TABLE `mst_loc` ADD KEY `loctype_id` (`loctype_id`);
ALTER TABLE `mst_loc` ADD CONSTRAINT `fk_mst_loc_mst_loctype` FOREIGN KEY (`loctype_id`) REFERENCES `mst_loc` (`loctype_id`);
ALTER TABLE `mst_loc` ADD KEY `district_id` (`district_id`);
ALTER TABLE `mst_loc` ADD CONSTRAINT `fk_mst_loc_mst_district` FOREIGN KEY (`district_id`) REFERENCES `mst_district` (`district_id`);




CREATE TABLE `mst_locpic` (
	`locpic_id` varchar(14) NOT NULL , 
	`locpic_name` varchar(90)  , 
	`locpic_resp` varchar(90)  COMMENT 'Jabatan dari yang bersangkutan',
	`locpic_email` varchar(90)  , 
	`locpic_phone` varchar(90)  , 
	`locpic_isdisabled` tinyint(1)  , 
	`loc_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`locpic_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='PIC yang dimiliki oleh suatu lokasi';

ALTER TABLE `mst_locpic` ADD KEY `loc_id` (`loc_id`);
ALTER TABLE `mst_locpic` ADD CONSTRAINT `fk_mst_locpic_mst_loc` FOREIGN KEY (`loc_id`) REFERENCES `mst_loc` (`loc_id`);


