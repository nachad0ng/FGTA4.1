CREATE TABLE `mst_loctype` (
	`loctype_id` varchar(6) NOT NULL , 
	`loctype_name` varchar(90)  , 
	`loctype_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`loctype_id`),
	UNIQUE KEY(loctype_name) 
) 
ENGINE=InnoDB DEFAULT CHARSET=latin1
COMMENT='Type Lokasi, misalnya Mall, Kawasan Pertokoan, Perumahan, dll'


