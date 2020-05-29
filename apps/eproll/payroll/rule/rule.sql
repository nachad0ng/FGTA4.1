CREATE TABLE `mst_rule` (
	`rule_id` varchar(13) NOT NULL , 
	`rule_name` varchar(50)  , 
	`rule_code` varchar(20)  , 
	`rule_operator` varchar(5) NOT NULL , 
	`rule_isdisabled` tinyint(1) NOT NULL DEFAULT 1, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`rule_id`)
) 
ENGINE=InnoDB
COMMENT='daftar Rule';





