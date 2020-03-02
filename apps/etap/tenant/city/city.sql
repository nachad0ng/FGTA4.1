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

ALTER TABLE `mst_city` ADD KEY `city_id` (`city_id`);
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

ALTER TABLE `mst_district` ADD KEY `district_id` (`district_id`);
ALTER TABLE `mst_district` ADD CONSTRAINT `fk_mst_district_mst_city` FOREIGN KEY (`city_id`) REFERENCES `mst_city` (`city_id`);



