<?php namespace FGTA4;

define('DB_CONFIG', [
	'FGTACLOUD' => [
		'DSN' => "mysql:host=localhost;dbname=PROLL_DB",
		'user' => "supermane",
		'pass' => "rahasia"
	]

]);



$GLOBALS['MAINDB'] = 'FGTACLOUD';
$GLOBALS['MAINDBTYPE'] = 'mariadb';

$GLOBALS['MAIN_USERTABLE'] = 'proll_db.fgt_user';
