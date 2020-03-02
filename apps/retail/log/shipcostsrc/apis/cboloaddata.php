<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataSave extends WebAPI {
	function __construct() {
		$this->debugoutput = true;

		$DB_CONFIG = DB_CONFIG[MAINDB];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[MAINDBTYPE];

		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	
	}
	
	public function execute($options) {
        try {
            $result = new \stdClass; 

            $sql = "select logshipcostsrc_id,logshipcostsrc_name from mst_logshipcostsrc";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $rows = $stmt->fetchall(\PDO::FETCH_ASSOC);

            $records = [];

            foreach($rows as $row){
                array_push($records, [
                    "id" => $row['logshipcostsrc_id'],
                    "text" => $row['logshipcostsrc_name']
                ]);
            }
            $result->records = $records;
            return $result;
        } catch (\Exception $ex) {
			throw $ex;
		}			       


    }
}

$API = new DataSave();