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
					"employee_id" => " employee_id = :employee_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_employee', [
				'employee_id', 'employee_nipp', 'employee_name', 'employee_ktp', 'employee_tplahir', 'employee_tglahir', 'employee_alamat', 'employee_sex', 'agama_id', 'edu_id', 'employee_email', 'employee_status', 'employee_telp', 'employee_tanggungan', 'regional_id', 'divisi_id', 'jabatan_id', 'gol_id', 'kontrak_id', 'employee_datestart', 'employee_dateend', 'employee_isshift', 'employee_npwp', 'ptkp_id', 'employee_isactive', 'bank_id', 'employee_rek', 'employee_isdisabled', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'employee_tglahir' => date("d/m/Y", strtotime($record['employee_tglahir'])),
				'employee_datestart' => date("d/m/Y", strtotime($record['employee_datestart'])),
				'employee_dateend' => date("d/m/Y", strtotime($record['employee_dateend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'agama_name' => \FGTA4\utils\SqlUtility::Lookup($record['agama_id'], $this->db, 'mst_agama', 'agama_id', 'agama_name'),
				'edu_name' => \FGTA4\utils\SqlUtility::Lookup($record['edu_id'], $this->db, 'mst_edu', 'edu_id', 'edu_name'),
				'regional_name' => \FGTA4\utils\SqlUtility::Lookup($record['regional_id'], $this->db, 'mst_regional', 'regional_id', 'regional_name'),
				'divisi_name' => \FGTA4\utils\SqlUtility::Lookup($record['divisi_id'], $this->db, 'mst_divisi', 'divisi_id', 'divisi_name'),
				'jabatan_name' => \FGTA4\utils\SqlUtility::Lookup($record['jabatan_id'], $this->db, 'mst_jabatan', 'jabatan_id', 'jabatan_name'),
				'gol_name' => \FGTA4\utils\SqlUtility::Lookup($record['gol_id'], $this->db, 'mst_gol', 'gol_id', 'gol_name'),
				'kontrak_name' => \FGTA4\utils\SqlUtility::Lookup($record['kontrak_id'], $this->db, 'mst_kontrak', 'kontrak_id', 'kontrak_name'),
				'ptkp_name' => \FGTA4\utils\SqlUtility::Lookup($record['ptkp_id'], $this->db, 'mst_ptkp', 'ptkp_id', 'ptkp_name'),
				'bank_name' => \FGTA4\utils\SqlUtility::Lookup($record['bank_id'], $this->db, 'mst_bank', 'bank_id', 'bank_name'),

				'_createby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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