<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataOpen extends WebAPI {
	function __construct() {
		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
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
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"logship_id" => " logship_id = :logship_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_logship', [
				'logship_id', 'logship_ref', 'logship_date', 'logship_qty', 'logship_value', 'logship_po', 'logship_dm', 'logship_form_e', 'logship_form_d', 'logship_dtpickup', 'logship_dtetd', 'logship_dteta', 'logshipterm_id', 'logshipmethod_id', 'brand_id', 'sea_id', 'curr_id', 'partner_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'logship_date' => date("d/m/Y", strtotime($record['logship_date'])),				
				'logship_dtpickup' => date("d/m/Y", strtotime($record['logship_dtpickup'])),				
				'logship_dtetd' => date("d/m/Y", strtotime($record['logship_dtetd'])),				
				'logship_dteta' => date("d/m/Y", strtotime($record['logship_dteta'])),				

				'logshipterm_name' => \FGTA4\utils\SqlUtility::Lookup($record['logshipterm_id'], $this->db, 'mst_logshipterm', 'logshipterm_id', 'logshipterm_name'), 
				'logshipmethod_name' => \FGTA4\utils\SqlUtility::Lookup($record['logshipmethod_id'], $this->db, 'mst_logshipmethod', 'logshipmethod_id', 'logshipmethod_name'), 
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'), 
				'sea_name' => \FGTA4\utils\SqlUtility::Lookup($record['sea_id'], $this->db, 'mst_sea', 'sea_id', 'sea_name'), 
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'), 
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),

				'_createby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, 'fgt_user', 'user_id', 'user_fullname'),
				'_modifyby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, 'fgt_user', 'user_id', 'user_fullname'),
			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataOpen();