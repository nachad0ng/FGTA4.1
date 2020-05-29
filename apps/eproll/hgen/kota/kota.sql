CREATE TABLE `mst_kota` (
	`kota_id` varchar(13) NOT NULL , 
	`kota_name` varchar(50)  , 
	`provinsi_id` varchar(13) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`kota_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Kota';

ALTER TABLE `mst_kota` ADD KEY `provinsi_id` (`provinsi_id`);

ALTER TABLE `mst_kota` ADD CONSTRAINT `fk_mst_kota_mst_provinsi` FOREIGN KEY (`provinsi_id`) REFERENCES `mst_provinsi` (`provinsi_id`);



