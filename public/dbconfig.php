<?php namespace FGTA4;

// define('DB_CONFIG', [
// 	'FGTA' => [
// 	],

// 	'DSR' => [
// 		'DSN' => "firebird:dbname=172.18.10.11:DSR.FDB",
// 		'user' => "SYSDBA",
// 		'pass' => "Modul@Oblongata"
// 	],

// 	'KALISTA' => [
// 		'DSN' => "mysql:host=kalistadb-dev;dbname=kalista",
// 		'user' => "root",
// 		'pass' => "rahasia"
// 	],

// 	'ETAP' => [
// 		'DSN' => "mysql:host=kalistadb-dev;dbname=etapdb",
// 		'user' => "root",
// 		'pass' => "rahasia"
// 	]	
// ]);


define('DB_CONFIG', [
	'KALISTA' => [
		'DSN' => "mysql:host=kalistadb-dev;dbname=kalistadb",
		'user' => "root",
		'pass' => "rahasia"
	]
]);


$GLOBALS['MAINDB'] = 'KALISTA';
$GLOBALS['MAINDBTYPE'] = 'mariadb';

$GLOBALS['MAIN_USERTABLE'] = 'kalistadb.fgt_user';
