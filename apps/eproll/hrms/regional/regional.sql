CREATE TABLE `mst_regional` (
	`regional_id` varchar(13) NOT NULL , 
	`regional_name` varchar(90)  , 
	`regional_nameshort` varchar(10)  , 
	`regional_code` varchar(10)  , 
	`regional_npwp` varchar(13) NOT NULL , 
	`regional_alamat` varchar(250) NOT NULL , 
	`provinsi_id` varchar(13) NOT NULL , 
	`kota_id` varchar(13) NOT NULL , 
	`kecamatan_id` varchar(13) NOT NULL , 
	`desa_id` varchar(13) NOT NULL , 
	`regional_telp` varchar(50) NOT NULL , 
	`regional_email` varchar(50) NOT NULL , 
	`regional_descr` varchar(50) NOT NULL , 
	`regional_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`regional_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Regional';

ALTER TABLE `mst_regional` ADD KEY `provinsi_id` (`provinsi_id`);
ALTER TABLE `mst_regional` ADD KEY `kota_id` (`kota_id`);
ALTER TABLE `mst_regional` ADD KEY `kecamatan_id` (`kecamatan_id`);
ALTER TABLE `mst_regional` ADD KEY `desa_id` (`desa_id`);

ALTER TABLE `mst_regional` ADD CONSTRAINT `fk_mst_regional_mst_provinsi` FOREIGN KEY (`provinsi_id`) REFERENCES `mst_provinsi` (`provinsi_id`);
ALTER TABLE `mst_regional` ADD CONSTRAINT `fk_mst_regional_mst_kota` FOREIGN KEY (`kota_id`) REFERENCES `mst_kota` (`kota_id`);
ALTER TABLE `mst_regional` ADD CONSTRAINT `fk_mst_regional_mst_kecamatan` FOREIGN KEY (`kecamatan_id`) REFERENCES `mst_kecamatan` (`kecamatan_id`);
ALTER TABLE `mst_regional` ADD CONSTRAINT `fk_mst_regional_mst_desa` FOREIGN KEY (`desa_id`) REFERENCES `mst_desa` (`desa_id`);



