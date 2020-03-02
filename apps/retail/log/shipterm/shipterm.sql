CREATE TABLE `mst_logshipterm` (
	`logshipterm_id` varchar(13) NOT NULL , 
	`logshipterm_name` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`logshipterm_id`)
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT=''


