CREATE TABLE `trn_journal` (
	`journal_id` varchar(30) NOT NULL , 
	`journal_descr` varchar(30)  , 
	`journal_bookdate` varchar(200)  , 
	`journal_duedate` varchar(50)  , 
	`journal_source` varchar(5)  , 
	`journal_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`journal_isposted` tinyint(1) NOT NULL DEFAULT 1, 
	`journal_isreversed` tinyint(1) NOT NULL DEFAULT 1, 
	`channel_id` varchar(10)  , 
	`region_id` varchar(13) NOT NULL , 
	`branch_id` varchar(13) NOT NULL , 
	`strukturunit_id` varchar(13) NOT NULL , 
	`rekanan_id` varchar(13) NOT NULL , 
	`rekanansub_id` varchar(13) NOT NULL , 
	`periode_id` varchar(13) NOT NULL , 
	`acc_id` varchar(13) NOT NULL , 
	`journaltype_id` varchar(255)  , 
	`sub1_id` varchar(13) NOT NULL , 
	`sub2_id` varchar(13) NOT NULL , 
	`curr_id` varchar(13) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`journal_id`)
) 
ENGINE=InnoDB
COMMENT='Journal List';

ALTER TABLE `trn_journal` ADD KEY `region_id` (`region_id`);
ALTER TABLE `trn_journal` ADD KEY `branch_id` (`branch_id`);
ALTER TABLE `trn_journal` ADD KEY `strukturunit_id` (`strukturunit_id`);
ALTER TABLE `trn_journal` ADD KEY `rekanan_id` (`rekanan_id`);
ALTER TABLE `trn_journal` ADD KEY `rekanansub_id` (`rekanansub_id`);
ALTER TABLE `trn_journal` ADD KEY `periode_id` (`periode_id`);
ALTER TABLE `trn_journal` ADD KEY `acc_id` (`acc_id`);
ALTER TABLE `trn_journal` ADD KEY `sub1_id` (`sub1_id`);
ALTER TABLE `trn_journal` ADD KEY `sub2_id` (`sub2_id`);
ALTER TABLE `trn_journal` ADD KEY `curr_id` (`curr_id`);

ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_region` FOREIGN KEY (`region_id`) REFERENCES `mst_region` (`region_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_branch` FOREIGN KEY (`branch_id`) REFERENCES `mst_branch` (`branch_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_strukt` FOREIGN KEY (`strukturunit_id`) REFERENCES `mst_strukt` (`strukt_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_rekanan` FOREIGN KEY (`rekanan_id`) REFERENCES `mst_rekanan` (`rekanan_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_rekanansub` FOREIGN KEY (`rekanansub_id`) REFERENCES `mst_rekanansub` (`rekanansub_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_periode` FOREIGN KEY (`periode_id`) REFERENCES `mst_periode` (`periode_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_acc` FOREIGN KEY (`acc_id`) REFERENCES `mst_acc` (`acc_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_sub1` FOREIGN KEY (`sub1_id`) REFERENCES `mst_sub1` (`sub1_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_sub2` FOREIGN KEY (`sub2_id`) REFERENCES `mst_sub2` (`sub2_id`);
ALTER TABLE `trn_journal` ADD CONSTRAINT `fk_trn_journal_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);





CREATE TABLE `trn_journald` (
	`journald_id` varchar(14) NOT NULL , 
	`journald_line` int(8) NOT NULL , 
	`journald_descr` varchar(14) NOT NULL , 
	`acc_id` varchar(13) NOT NULL , 
	`journal_id` varchar(14) NOT NULL , 
	`journald_idr` decimal(18, 2)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`journald_id`)
) 
ENGINE=InnoDB
COMMENT='Journal Detail';

ALTER TABLE `trn_journald` ADD KEY `acc_id` (`acc_id`);
ALTER TABLE `trn_journald` ADD KEY `journal_id` (`journal_id`);

ALTER TABLE `trn_journald` ADD CONSTRAINT `fk_trn_journald_mst_acc` FOREIGN KEY (`acc_id`) REFERENCES `mst_acc` (`acc_id`);
ALTER TABLE `trn_journald` ADD CONSTRAINT `fk_trn_journald_trn_journal` FOREIGN KEY (`journal_id`) REFERENCES `trn_journal` (`journal_id`);





