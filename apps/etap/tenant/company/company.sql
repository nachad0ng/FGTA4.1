

CREATE TABLE `mst_company` (
	`company_id` varchar(14) NOT NULL , 
	`company_name` varchar(90)  , 
	`company_address` varchar(255)  , 
	`company_city` varchar(255)  , 
	`company_telp` varchar(14)  , 
	`company_email` varchar(60)  , 
	`company_npwp` varchar(30)  , 
	`company_isdisabled` tinyint(1)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`company_id`),
	UNIQUE KEY(company_name) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar Company';





CREATE TABLE `mst_companybrand` (
	`companybrand_id` varchar(14) NOT NULL , 
	`companybrand_isdisabled` tinyint(1)  , 
	`company_id` varchar(14) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`brand_name` varchar(90)  ,	
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`companybrand_id`),
	CONSTRAINT `companybrand` UNIQUE (`company_id`, `brand_id`) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar brand yang dipunyai suatu perusahaan company';

ALTER TABLE `mst_companybrand` ADD KEY `company_id` (`company_id`);
ALTER TABLE `mst_companybrand` ADD CONSTRAINT `fk_mst_companybrand_mst_company` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`);
ALTER TABLE `mst_companybrand` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `mst_companybrand` ADD CONSTRAINT `fk_mst_companybrand_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);






CREATE TABLE `mst_companypic` (
	`companypic_id` varchar(14) NOT NULL , 
	`companypic_name` varchar(90)  , 
	`companypic_resp` varchar(90)  COMMENT 'Jabatan dari yang bersangkutan', 
	`companypic_email` varchar(90)  , 
	`companypic_phone` varchar(90)  , 
	`companypic_isdisabled` tinyint(1)  , 
	`company_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`companypic_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar PIC yang dipunyai suatu perusahaan';

ALTER TABLE `mst_companypic` ADD KEY `company_id` (`company_id`);
ALTER TABLE `mst_companypic` ADD CONSTRAINT `fk_mst_companypic_mst_company` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`);

