CREATE TABLE `mst_employee` (
	`employee_id` varchar(30) NOT NULL , 
	`employee_nipp` varchar(30)  , 
	`employee_name` varchar(200)  , 
	`employee_ktp` varchar(50)  , 
	`employee_tplahir` varchar(50)  , 
	`employee_tglahir` date NOT NULL , 
	`employee_alamat` varchar(255)  , 
	`employee_sex` varchar(5)  , 
	`agama_id` varchar(13) NOT NULL , 
	`edu_id` varchar(13) NOT NULL , 
	`employee_email` varchar(100)  , 
	`employee_status` varchar(255)  , 
	`employee_telp` varchar(20)  , 
	`employee_tanggungan` int(8) NOT NULL , 
	`regional_id` varchar(13) NOT NULL , 
	`divisi_id` varchar(13) NOT NULL , 
	`jabatan_id` varchar(13) NOT NULL , 
	`gol_id` varchar(13) NOT NULL , 
	`kontrak_id` varchar(13) NOT NULL , 
	`employee_datestart` date NOT NULL , 
	`employee_dateend` date NOT NULL , 
	`employee_isshift` tinyint(1) NOT NULL DEFAULT 1, 
	`employee_npwp` varchar(50)  , 
	`ptkp_id` varchar(13) NOT NULL , 
	`employee_isactive` tinyint(1) NOT NULL DEFAULT 1, 
	`bank_id` varchar(13) NOT NULL , 
	`employee_rek` varchar(100)  , 
	`employee_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`employee_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Karyawan';

ALTER TABLE `mst_employee` ADD KEY `agama_id` (`agama_id`);
ALTER TABLE `mst_employee` ADD KEY `edu_id` (`edu_id`);
ALTER TABLE `mst_employee` ADD KEY `regional_id` (`regional_id`);
ALTER TABLE `mst_employee` ADD KEY `divisi_id` (`divisi_id`);
ALTER TABLE `mst_employee` ADD KEY `jabatan_id` (`jabatan_id`);
ALTER TABLE `mst_employee` ADD KEY `gol_id` (`gol_id`);
ALTER TABLE `mst_employee` ADD KEY `kontrak_id` (`kontrak_id`);
ALTER TABLE `mst_employee` ADD KEY `ptkp_id` (`ptkp_id`);
ALTER TABLE `mst_employee` ADD KEY `bank_id` (`bank_id`);

ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_agama` FOREIGN KEY (`agama_id`) REFERENCES `mst_agama` (`agama_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_edu` FOREIGN KEY (`edu_id`) REFERENCES `mst_edu` (`edu_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_regional` FOREIGN KEY (`regional_id`) REFERENCES `mst_regional` (`regional_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_divisi` FOREIGN KEY (`divisi_id`) REFERENCES `mst_divisi` (`divisi_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_jabatan` FOREIGN KEY (`jabatan_id`) REFERENCES `mst_jabatan` (`jabatan_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_gol` FOREIGN KEY (`gol_id`) REFERENCES `mst_gol` (`gol_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_kontrak` FOREIGN KEY (`kontrak_id`) REFERENCES `mst_kontrak` (`kontrak_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_ptkp` FOREIGN KEY (`ptkp_id`) REFERENCES `mst_ptkp` (`ptkp_id`);
ALTER TABLE `mst_employee` ADD CONSTRAINT `fk_mst_employee_mst_bank` FOREIGN KEY (`bank_id`) REFERENCES `mst_bank` (`bank_id`);



CREATE TABLE `mst_empkomp` (
	`empkomp_id` varchar(14) NOT NULL , 
	`komp_id` varchar(13) NOT NULL , 
	`employee_id` varchar(14) NOT NULL , 
	`empkomp_descr` varchar(250)  , 
	`empkomp_amount` decimal(18, 2)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`empkomp_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Komponen Employee';

ALTER TABLE `mst_empkomp` ADD KEY `komp_id` (`komp_id`);
ALTER TABLE `mst_empkomp` ADD KEY `employee_id` (`employee_id`);

ALTER TABLE `mst_empkomp` ADD CONSTRAINT `fk_mst_empkomp_mst_komp` FOREIGN KEY (`komp_id`) REFERENCES `mst_komp` (`komp_id`);
ALTER TABLE `mst_empkomp` ADD CONSTRAINT `fk_mst_empkomp_mst_employee` FOREIGN KEY (`employee_id`) REFERENCES `mst_employee` (`employee_id`);



