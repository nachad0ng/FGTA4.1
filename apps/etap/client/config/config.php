<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class Config extends WebModule {
	
	function __construct() {
		$this->debugoutput = true;
	}


	public function LoadPage() {
		try {
			$this->preloadscripts = [
				// './jslibs/pouchdb.min.js',
				// './jslibs/pouchdb.find.min.js'
			];
	
			$today = date("Y-m-d");
	
			$this->userdata = json_decode($_SESSION['userdata']);
			$this->supporteddatabase = $this->getSupportedDatabase();
			$this->stores = $this->getScheduledStore($this->userdata->username, $today);
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function getSupportedDatabase() {
		return array(
			(object)['id'=>'mssql', 'text'=>'Microsoft SQL Server'],
			(object)['id'=>'mysql', 'text'=>'Mysql / MariaDb'],
			(object)['id'=>'pgsql', 'text'=>'Postgresql']
		);
	}

	function getScheduledStore($user_id, $date) {
		// akses REST api ke master
		return array(
			(object)['store_id'=>'001', 'store_name'=>'Toko Satu', 'dbtype'=>''],
			(object)['store_id'=>'002', 'store_name'=>'Toko Dua', 'dbtype'=>'mssql'],
			(object)['store_id'=>'003', 'store_name'=>'Toko Tiga', 'dbtype'=>'mssql'],
			(object)['store_id'=>'004', 'store_name'=>'Toko Empat', 'dbtype'=>'mysql'],
			(object)['store_id'=>'005', 'store_name'=>'Toko Lima', 'dbtype'=>'pgsql']
		);
	}

	
}

$MODULE = new Config();