-- Provinsi

CREATE TABLE `mst_prov` (
	`prov_id` varchar(14) NOT NULL , 
	`prov_name` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`prov_id`),
	UNIQUE KEY(prov_name) 
) 
ENGINE=InnoDB
COMMENT='daftar propinsi';




-- City

CREATE TABLE `mst_city` (
	`city_id` varchar(14) NOT NULL , 
	`city_name` varchar(90)  , 
	`prov_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`city_id`),
	UNIQUE KEY(prov_id, city_name) 
) 
ENGINE=InnoDB
COMMENT='Daftar Kota';

ALTER TABLE `mst_city` ADD KEY `prov_id` (`prov_id`);
ALTER TABLE `mst_city` ADD CONSTRAINT `fk_mst_city_mst_prov` FOREIGN KEY (`prov_id`) REFERENCES `mst_prov` (`prov_id`);



CREATE TABLE `mst_district` (
	`district_id` varchar(14) NOT NULL , 
	`district_name` varchar(90)  , 
	`city_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`district_id`),
	UNIQUE KEY(city_id, district_name) 
) 
ENGINE=InnoDB
COMMENT='Daftar District (Kecamatan)';

ALTER TABLE `mst_district` ADD KEY `city_id` (`city_id`);
ALTER TABLE `mst_district` ADD CONSTRAINT `fk_mst_district_mst_city` FOREIGN KEY (`city_id`) REFERENCES `mst_city` (`city_id`);





-- Tipe Lokasi
CREATE TABLE `mst_loctype` (
	`loctype_id` varchar(6) NOT NULL , 
	`loctype_name` varchar(90)  , 
	`loctype_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`loctype_id`),
	UNIQUE KEY(loctype_name) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Type Lokasi, misalnya Mall, Kawasan Pertokoan, Perumahan, dll'



-- Lokasi
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
ALTER TABLE `mst_loc` ADD CONSTRAINT `fk_mst_loc_mst_loctype` FOREIGN KEY (`loctype_id`) REFERENCES `mst_loctype` (`loctype_id`);
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





-- Bussiness Type
CREATE TABLE `mst_bussinesstype` (
	`bussinesstype_id` varchar(6) NOT NULL , 
	`bussinesstype_name` varchar(90)  , 
	`bussinesstype_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`bussinesstype_id`),
	UNIQUE KEY(bussinesstype_name) 
) 
ENGINE=InnoDB
COMMENT='Tipe bisnis, misal: FNB, Parking, Fashion Retail, Kelontong, dll';


-- Brand
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




-- Company

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



-- Tax Type
CREATE TABLE `con_taxmod` (
	`taxmod_id` tinyint NOT NULL , 
	`taxmod_name` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 	
	PRIMARY KEY (`taxmod_id`),
	UNIQUE KEY(`taxmod_id` ) 
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Tax Model (Include/Exclude)';


-- Store
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
	`taxmod_id` tinyint NOT NULL , 
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
ALTER TABLE `mst_store` ADD KEY `taxmod_id` (`taxmod_id`);
ALTER TABLE `mst_store` ADD CONSTRAINT `fk_mst_store_con_taxmod` FOREIGN KEY (`taxmod_id`) REFERENCES `con_taxmod` (`taxmod_id`);



CREATE TABLE `mst_storepic` (
	`storepic_id` varchar(14) NOT NULL , 
	`storepic_name` varchar(90)  , 
	`storepic_resp` varchar(90)  COMMENT 'Jabatan dari yang bersangkutan', 
	`storepic_email` varchar(90)  , 
	`storepic_phone` varchar(90)  , 
	`storepic_isdisabled` tinyint(1)  NOT NULL DEFAULT 0 , 
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






--- TRANSAKSI
CREATE TABLE `trn_rawsale` (
	`rawsale_id` varchar(14) NOT NULL , 
	`rawsale_key` varchar(255) NOT NULL COMMENT 'yang menjadikan bon ini unique sepanjang masa per toko', 
	`rawsale_date` date NOT NULL, 
	`rawsale_time` time NOT NULL,
	`store_id` varchar(14) NOT NULL, 
	`machine_id` varchar(14) NOT NULL, 
	`_server_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), 
	PRIMARY KEY (`rawsale_id`),
	CONSTRAINT `store_sale_key` UNIQUE (`store_id`, `rawsale_key`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar Raw Sales Header yang terikirim';

ALTER TABLE `trn_rawsale` ADD KEY `store_id` (`store_id`);
ALTER TABLE `trn_rawsale` ADD CONSTRAINT `fk_trn_rawsale_mst_store` FOREIGN KEY (`store_id`) REFERENCES `mst_store` (`store_id`);




CREATE TABLE `trn_rawsaleitem` (
	`rawsale_id` varchar(14) NOT NULL , 
	`rawsaleitem_linekey` varchar(255) NOT NULL COMMENT 'yang menjadikan baris bon ini unique sepanjang masa per toko', 
	`item_name` varchar(255) NOT NULL,
	`item_priceperitem` decimal(15,2) NOT NULL DEFAULT 0,
	`item_pricediscperitem` decimal(15,2) NOT NULL DEFAULT 0,
	`item_qty` decimal(6,2) NOT NULL DEFAULT 0,
	`item_subtotal` decimal(15,2) NOT NULL DEFAULT 0,
	`item_subtotaldisc` decimal(15,2) NOT NULL DEFAULT 0,
	`item_total` decimal(15,2) NOT NULL DEFAULT 0,
	`item_tax` decimal(15,2) NOT NULL DEFAULT 0,
	`item_nett` decimal(15,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (`rawsale_id`, `rawsaleitem_linekey`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar Raw Sales Item yang terikirim';

ALTER TABLE `trn_rawsaleitem` ADD KEY `rawsale_id` (`rawsale_id`);
ALTER TABLE `trn_rawsaleitem` ADD CONSTRAINT `fk_trn_rawsaleitem_trn_rawsale` FOREIGN KEY (`rawsale_id`) REFERENCES `trn_rawsale` (`rawsale_id`);


CREATE TABLE `trn_rawsalepaym` (
	`rawsale_id` varchar(14) NOT NULL , 
	`rawsalepayment_linekey` varchar(255) NOT NULL COMMENT 'yang menjadikan baris bon ini unique sepanjang masa per toko', 
	`paym_name` varchar(255) NOT NULL,
	`paym_value` decimal(15,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (`rawsale_id`, `rawsalepayment_linekey`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Daftar Raw Sales Payment yang terikirim';

ALTER TABLE `trn_rawsalepaym` ADD KEY `rawsale_id` (`rawsale_id`);
ALTER TABLE `trn_rawsalepaym` ADD CONSTRAINT `fk_trn_rawsalepaym_trn_rawsale` FOREIGN KEY (`rawsale_id`) REFERENCES `trn_rawsale` (`rawsale_id`);



CREATE TABLE `que_rawsale` (
	`rawsale_id` varchar(14) NOT NULL , 
	`server_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), 
	`server_isprocessing` tinyint(1)  NOT NULL DEFAULT 0, 
	PRIMARY KEY (`rawsale_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Antrian Pemrosesan data sales';

ALTER TABLE `que_rawsale` ADD CONSTRAINT `fk_que_rawsale_trn_rawsale` FOREIGN KEY (`rawsale_id`) REFERENCES `trn_rawsale` (`rawsale_id`);



CREATE TABLE `trn_sale` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`loctype_id` varchar(6) NOT NULL , 
	`bussinesstype_id` varchar(6) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`company_id` varchar(14) NOT NULL , 
	`store_id` varchar(14) NOT NULL , 
	`machine_id` varchar(14) NOT NULL, 
	`rawsale_id` varchar(14) NOT NULL , 
	`rawsale_key` varchar(255) NOT NULL COMMENT 'yang menjadikan bon ini unique sepanjang masa per toko', 
	`sale_date` date NOT NULL, 
	`sale_time` time NOT NULL,	
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',
	`sale_qty` decimal(6,2) NOT NULL DEFAULT 0,
	`sale_subtotal` decimal(15,2) NOT NULL DEFAULT 0,
	`sale_subtotaldisc` decimal(15,2) NOT NULL DEFAULT 0,
	`sale_total` decimal(15,2) NOT NULL DEFAULT 0,
	`sale_tax` decimal(15,2) NOT NULL DEFAULT 0,
	`sale_nett` decimal(15,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (`rawsale_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Transaksi Sales yang sudah di-denormalisasi';


ALTER TABLE `trn_sale` ADD KEY `prov_id` (`prov_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_prov` FOREIGN KEY (`prov_id`) REFERENCES `mst_prov` (`prov_id`);
ALTER TABLE `trn_sale` ADD KEY `city_id` (`city_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_city` FOREIGN KEY (`city_id`) REFERENCES `mst_city` (`city_id`);
ALTER TABLE `trn_sale` ADD KEY `district_id` (`district_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_district` FOREIGN KEY (`district_id`) REFERENCES `mst_district` (`district_id`);
ALTER TABLE `trn_sale` ADD KEY `loc_id` (`loc_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_loc` FOREIGN KEY (`loc_id`) REFERENCES `mst_loc` (`loc_id`);
ALTER TABLE `trn_sale` ADD KEY `loctype_id` (`loctype_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_loctype` FOREIGN KEY (`loctype_id`) REFERENCES `mst_loctype` (`loctype_id`);
ALTER TABLE `trn_sale` ADD KEY `bussinesstype_id` (`bussinesstype_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_bussinesstype` FOREIGN KEY (`bussinesstype_id`) REFERENCES `mst_bussinesstype` (`bussinesstype_id`);
ALTER TABLE `trn_sale` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_sale` ADD KEY `company_id` (`company_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_company` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`);
ALTER TABLE `trn_sale` ADD KEY `store_id` (`store_id`);
ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_mst_store` FOREIGN KEY (`store_id`) REFERENCES `mst_store` (`store_id`);

ALTER TABLE `trn_sale` ADD CONSTRAINT `fk_trn_sale_trn_rawsale` FOREIGN KEY (`rawsale_id`) REFERENCES `trn_rawsale` (`rawsale_id`);

ALTER TABLE `trn_sale` ADD KEY `rawsale_key` (`rawsale_key`);
ALTER TABLE `trn_sale` ADD KEY `sale_date` (`sale_date`);
ALTER TABLE `trn_sale` ADD KEY `sale_year` (`sale_year`);
ALTER TABLE `trn_sale` ADD KEY `sale_month` (`sale_year`, `sale_month`);
ALTER TABLE `trn_sale` ADD KEY `sale_day` (`sale_year`, `sale_month`, `sale_day`);






CREATE TABLE `trn_saleitem` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`loctype_id` varchar(6) NOT NULL , 
	`bussinesstype_id` varchar(6) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`company_id` varchar(14) NOT NULL , 
	`store_id` varchar(14) NOT NULL , 
	`machine_id` varchar(14) NOT NULL, 
	`rawsale_id` varchar(14) NOT NULL , 
	`rawsale_key` varchar(255) NOT NULL COMMENT 'yang menjadikan bon ini unique sepanjang masa per toko', 
	`rawsaleitem_linekey` varchar(255) NOT NULL COMMENT 'yang menjadikan baris bon ini unique sepanjang masa per toko', 
	`sale_date` date NOT NULL, 
	`sale_time` time NOT NULL,	
	`sale_year` int NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',
	`item_name` varchar(255) NOT NULL,
	`item_priceperitem` decimal(15,2) NOT NULL DEFAULT 0,
	`item_pricediscperitem` decimal(15,2) NOT NULL DEFAULT 0,
	`item_qty` decimal(6,2) NOT NULL DEFAULT 0,
	`item_subtotal` decimal(15,2) NOT NULL DEFAULT 0,
	`item_subtotaldisc` decimal(15,2) NOT NULL DEFAULT 0,
	`item_total` decimal(15,2) NOT NULL DEFAULT 0,
	`item_tax` decimal(15,2) NOT NULL DEFAULT 0,
	`item_nett` decimal(15,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (`rawsale_id`, `rawsaleitem_linekey`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Transaksi Sales Item yang sudah di-denormalisasi';



ALTER TABLE `trn_saleitem` ADD KEY `prov_id` (`prov_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_prov` FOREIGN KEY (`prov_id`) REFERENCES `mst_prov` (`prov_id`);
ALTER TABLE `trn_saleitem` ADD KEY `city_id` (`city_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_city` FOREIGN KEY (`city_id`) REFERENCES `mst_city` (`city_id`);
ALTER TABLE `trn_saleitem` ADD KEY `district_id` (`district_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_district` FOREIGN KEY (`district_id`) REFERENCES `mst_district` (`district_id`);
ALTER TABLE `trn_saleitem` ADD KEY `loc_id` (`loc_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_loc` FOREIGN KEY (`loc_id`) REFERENCES `mst_loc` (`loc_id`);
ALTER TABLE `trn_saleitem` ADD KEY `loctype_id` (`loctype_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_loctype` FOREIGN KEY (`loctype_id`) REFERENCES `mst_loctype` (`loctype_id`);
ALTER TABLE `trn_saleitem` ADD KEY `bussinesstype_id` (`bussinesstype_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_bussinesstype` FOREIGN KEY (`bussinesstype_id`) REFERENCES `mst_bussinesstype` (`bussinesstype_id`);
ALTER TABLE `trn_saleitem` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_saleitem` ADD KEY `company_id` (`company_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_company` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`);
ALTER TABLE `trn_saleitem` ADD KEY `store_id` (`store_id`);
ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_mst_store` FOREIGN KEY (`store_id`) REFERENCES `mst_store` (`store_id`);

ALTER TABLE `trn_saleitem` ADD CONSTRAINT `fk_trn_saleitem_trn_sale` FOREIGN KEY (`rawsale_id`) REFERENCES `trn_sale` (`rawsale_id`);

ALTER TABLE `trn_saleitem` ADD KEY `rawsale_key` (`rawsale_key`);
ALTER TABLE `trn_saleitem` ADD KEY `sale_date` (`sale_date`);
ALTER TABLE `trn_saleitem` ADD KEY `sale_year` (`sale_year`);
ALTER TABLE `trn_saleitem` ADD KEY `sale_month` (`sale_year`, `sale_month`);
ALTER TABLE `trn_saleitem` ADD KEY `sale_day` (`sale_year`, `sale_month`, `sale_day`);




CREATE TABLE `trn_salepaym` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`loctype_id` varchar(6) NOT NULL , 
	`bussinesstype_id` varchar(6) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`company_id` varchar(14) NOT NULL , 
	`store_id` varchar(14) NOT NULL , 
	`machine_id` varchar(14) NOT NULL, 
	`rawsale_id` varchar(14) NOT NULL , 
	`rawsale_key` varchar(255) NOT NULL COMMENT 'yang menjadikan bon ini unique sepanjang masa per toko', 
	`rawsalepaym_linekey` varchar(255) NOT NULL COMMENT 'yang menjadikan baris bon ini unique sepanjang masa per toko', 
	`sale_date` date NOT NULL, 
	`sale_time` time NOT NULL,	
	`sale_year` int NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',
	`paym_name` varchar(255) NOT NULL,
	`paym_value` decimal(15,2) NOT NULL DEFAULT 0,
	PRIMARY KEY (`rawsale_id`, `rawsalepaym_linekey`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Transaksi Sales Paymn yang sudah di-denormalisasi';



ALTER TABLE `trn_salepaym` ADD KEY `prov_id` (`prov_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_prov` FOREIGN KEY (`prov_id`) REFERENCES `mst_prov` (`prov_id`);
ALTER TABLE `trn_salepaym` ADD KEY `city_id` (`city_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_city` FOREIGN KEY (`city_id`) REFERENCES `mst_city` (`city_id`);
ALTER TABLE `trn_salepaym` ADD KEY `district_id` (`district_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_district` FOREIGN KEY (`district_id`) REFERENCES `mst_district` (`district_id`);
ALTER TABLE `trn_salepaym` ADD KEY `loc_id` (`loc_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_loc` FOREIGN KEY (`loc_id`) REFERENCES `mst_loc` (`loc_id`);
ALTER TABLE `trn_salepaym` ADD KEY `loctype_id` (`loctype_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_loctype` FOREIGN KEY (`loctype_id`) REFERENCES `mst_loctype` (`loctype_id`);
ALTER TABLE `trn_salepaym` ADD KEY `bussinesstype_id` (`bussinesstype_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_bussinesstype` FOREIGN KEY (`bussinesstype_id`) REFERENCES `mst_bussinesstype` (`bussinesstype_id`);
ALTER TABLE `trn_salepaym` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_salepaym` ADD KEY `company_id` (`company_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_company` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`);
ALTER TABLE `trn_salepaym` ADD KEY `store_id` (`store_id`);
ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_mst_store` FOREIGN KEY (`store_id`) REFERENCES `mst_store` (`store_id`);

ALTER TABLE `trn_salepaym` ADD CONSTRAINT `fk_trn_salepaym_trn_sale` FOREIGN KEY (`rawsale_id`) REFERENCES `trn_sale` (`rawsale_id`);

ALTER TABLE `trn_salepaym` ADD KEY `rawsale_key` (`rawsale_key`);
ALTER TABLE `trn_salepaym` ADD KEY `sale_date` (`sale_date`);
ALTER TABLE `trn_salepaym` ADD KEY `sale_year` (`sale_year`);
ALTER TABLE `trn_salepaym` ADD KEY `sale_month` (`sale_year`, `sale_month`);
ALTER TABLE `trn_salepaym` ADD KEY `sale_day` (`sale_year`, `sale_month`, `sale_day`);






CREATE TABLE `que_sale_store` (
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 

	`company_id` varchar(14) NOT NULL , 
	`store_id` varchar(14) NOT NULL , 

	`server_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), 
	`server_isprocessing` tinyint(1)  NOT NULL DEFAULT 0, 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`, `district_id`, `loc_id`, `brand_id`,  `company_id`,  `store_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Antrian Pemrosesan data sales per store, diinsert dari trigger insert update table trn_sale';





CREATE TABLE `sum_sale_store` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`loctype_id` varchar(6) NOT NULL , 
	`bussinesstype_id` varchar(6) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`company_id` varchar(14) NOT NULL , 
	`store_id` varchar(14) NOT NULL , 
	`sale_date` date NOT NULL, 
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',
	`tx_count` int NOT NULL DEFAULT 0,
	`sale_subtotal` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_subtotaldisc` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_total` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_tax` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_nett` decimal(18,2) NOT NULL DEFAULT 0,

	`_lastupdate` timestamp NOT NULL DEFAULT current_timestamp(), 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `store_id`),
	CONSTRAINT `unq_sum_sale_store` UNIQUE  (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`, `district_id`, `loc_id`, `brand_id`,  `company_id`,  `store_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Summary Sales by store daily, diinput oleh scheduler berdasar table que_sale_store';





CREATE TABLE `que_sale_loc` (
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 

	`server_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), 
	`server_isprocessing` tinyint(1)  NOT NULL DEFAULT 0, 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`, `district_id`, `loc_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Antrian Pemrosesan data sales per location, diinsert dari trigger insert update table sum_sale_store';



CREATE TABLE `sum_sale_loc` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 
	`loc_id` varchar(14) NOT NULL , 
	`loctype_id` varchar(6) NOT NULL , 
	
	`sale_date` date NOT NULL, 
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`sale_subtotal` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_subtotaldisc` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_total` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_tax` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_nett` decimal(18,2) NOT NULL DEFAULT 0,

	`_lastupdate` timestamp NOT NULL DEFAULT current_timestamp(), 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `loc_id`),
	CONSTRAINT `unq_sum_sale_loc` UNIQUE  (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`, `district_id`, `loc_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Summary Sales by location daily, diinput oleh scheduler berdasar table que_sale_loc';






CREATE TABLE `que_sale_district` (
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 

	`server_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), 
	`server_isprocessing` tinyint(1)  NOT NULL DEFAULT 0, 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`, `district_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Antrian Pemrosesan data sales per district, diinsert dari trigger insert update table sum_sale_loc';


CREATE TABLE `sum_sale_district` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 
	`district_id` varchar(14) NOT NULL , 

	`sale_date` date NOT NULL, 
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`sale_subtotal` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_subtotaldisc` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_total` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_tax` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_nett` decimal(18,2) NOT NULL DEFAULT 0,

	`_lastupdate` timestamp NOT NULL DEFAULT current_timestamp(), 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `district_id`),
	CONSTRAINT `unq_sum_sale_district` UNIQUE  (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`, `district_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Summary Sales by district daily, diinput oleh scheduler berdasar table que_sale_district';







CREATE TABLE `que_sale_city` (
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 

	`server_timestamp` timestamp NOT NULL DEFAULT current_timestamp(), 
	`server_isprocessing` tinyint(1)  NOT NULL DEFAULT 0, 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Antrian Pemrosesan data sales per city, diinsert dari trigger insert update table sum_sale_district';



CREATE TABLE `sum_sale_city` (
	`prov_id` varchar(14) NOT NULL , 
	`city_id` varchar(14) NOT NULL , 

	`sale_date` date NOT NULL, 
	`sale_year` int  NOT NULL,
	`sale_month` int  NOT NULL,
	`sale_day` int  NOT NULL COMMENT 'tanggalnya saja (1 s/d 31)',

	`sale_subtotal` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_subtotaldisc` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_total` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_tax` decimal(18,2) NOT NULL DEFAULT 0,
	`sale_nett` decimal(18,2) NOT NULL DEFAULT 0,

	`_lastupdate` timestamp NOT NULL DEFAULT current_timestamp(), 
	PRIMARY KEY (`sale_year`, `sale_month`, `sale_day`, `city_id`),
	CONSTRAINT `unq_sum_sale_district` UNIQUE  (`sale_year`, `sale_month`, `sale_day`, `prov_id`, `city_id`)
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Summary Sales by city daily, diinput oleh scheduler berdasar table que_sale_city';




---


