<?php namespace FGTA4;

define('DB_CONFIG', [
	'FGTACLOUD' => [
		'DSN' => "mysql:host=localhost;dbname=fgtadb",
		'user' => "root",
		'pass' => ""
	]

]);



$GLOBALS['MAINDB'] = 'FGTACLOUD';
$GLOBALS['MAINDBTYPE'] = 'mariadb';

$GLOBALS['MAIN_USERTABLE'] = 'fgtadb.fgt_user';
