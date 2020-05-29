CREATE TABLE `mst_kecamatan` (
	`kecamatan_id` varchar(13) NOT NULL , 
	`kecamatan_name` varchar(50)  , 
	`kota_id` varchar(13) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`kecamatan_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Kecamatan';

ALTER TABLE `mst_kecamatan` ADD KEY `kota_id` (`kota_id`);

ALTER TABLE `mst_kecamatan` ADD CONSTRAINT `fk_mst_kecamatan_mst_kota` FOREIGN KEY (`kota_id`) REFERENCES `mst_kota` (`kota_id`);



