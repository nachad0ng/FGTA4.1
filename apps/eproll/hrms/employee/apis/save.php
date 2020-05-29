<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataSave extends WebAPI {
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
	
	public function execute($data, $options) {
		$tablename = 'mst_employee';
		$primarykey = 'employee_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
			
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->employee_tglahir = (\DateTime::createFromFormat('d/m/Y',$obj->employee_tglahir))->format('Y-m-d');			$obj->employee_datestart = (\DateTime::createFromFormat('d/m/Y',$obj->employee_datestart))->format('Y-m-d');			$obj->employee_dateend = (\DateTime::createFromFormat('d/m/Y',$obj->employee_dateend))->format('Y-m-d');




			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey, '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				// misalnya ada data yang perlu dilookup ditaruh disini
				'agama_name' => \FGTA4\utils\SqlUtility::Lookup($data->agama_id, $this->db, 'mst_agama', 'agama_id', 'agama_name'),
				'edu_name' => \FGTA4\utils\SqlUtility::Lookup($data->edu_id, $this->db, 'mst_edu', 'edu_id', 'edu_name'),
				'regional_name' => \FGTA4\utils\SqlUtility::Lookup($data->regional_id, $this->db, 'mst_regional', 'regional_id', 'regional_name'),
				'divisi_name' => \FGTA4\utils\SqlUtility::Lookup($data->divisi_id, $this->db, 'mst_divisi', 'divisi_id', 'divisi_name'),
				'jabatan_name' => \FGTA4\utils\SqlUtility::Lookup($data->jabatan_id, $this->db, 'mst_jabatan', 'jabatan_id', 'jabatan_name'),
				'gol_name' => \FGTA4\utils\SqlUtility::Lookup($data->gol_id, $this->db, 'mst_gol', 'gol_id', 'gol_name'),
				'kontrak_name' => \FGTA4\utils\SqlUtility::Lookup($data->kontrak_id, $this->db, 'mst_kontrak', 'kontrak_id', 'kontrak_name'),
				'ptkp_name' => \FGTA4\utils\SqlUtility::Lookup($data->ptkp_id, $this->db, 'mst_ptkp', 'ptkp_id', 'ptkp_name'),
				'bank_name' => \FGTA4\utils\SqlUtility::Lookup($data->bank_id, $this->db, 'mst_bank', 'bank_id', 'bank_name'),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		return uniqid();
	}

}

$API = new DataSave();