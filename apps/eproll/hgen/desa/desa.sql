CREATE TABLE `mst_desa` (
	`desa_id` varchar(13) NOT NULL , 
	`desa_name` varchar(50)  , 
	`kecamatan_id` varchar(13) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`desa_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Desa/ Kelurahan';

ALTER TABLE `mst_desa` ADD KEY `kecamatan_id` (`kecamatan_id`);

ALTER TABLE `mst_desa` ADD CONSTRAINT `fk_mst_desa_mst_kecamatan` FOREIGN KEY (`kecamatan_id`) REFERENCES `mst_kecamatan` (`kecamatan_id`);



