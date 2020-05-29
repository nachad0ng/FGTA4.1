CREATE TABLE `mst_komp` (
	`komp_id` varchar(13) NOT NULL , 
	`komp_name` varchar(50)  , 
	`komp_code` varchar(20)  , 
	`rule_id` varchar(13) NOT NULL , 
	`kompgroup_id` varchar(13) NOT NULL , 
	`komp_istax` tinyint(1) NOT NULL DEFAULT 1, 
	`komp_period` varchar(5)  , 
	`komp_acc` varchar(20)  , 
	`komp_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`komp_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Komponen';

ALTER TABLE `mst_komp` ADD KEY `rule_id` (`rule_id`);
ALTER TABLE `mst_komp` ADD KEY `kompgroup_id` (`kompgroup_id`);

ALTER TABLE `mst_komp` ADD CONSTRAINT `fk_mst_komp_mst_rule` FOREIGN KEY (`rule_id`) REFERENCES `mst_rule` (`rule_id`);
ALTER TABLE `mst_komp` ADD CONSTRAINT `fk_mst_komp_mst_kompgroup` FOREIGN KEY (`kompgroup_id`) REFERENCES `mst_kompgroup` (`kompgroup_id`);



