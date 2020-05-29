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
		$tablename = 'trn_journal';
		$primarykey = 'journal_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

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
				$primarykey, 'journal_id', 'journal_descr', 'journal_bookdate', 'journal_duedate', 'journal_source', 'journal_isdisabled', 'journal_isposted', 'journal_isreversed', 'channel_id', 'region_id', 'branch_id', 'strukturunit_id', 'rekanan_id', 'rekanansub_id', 'periode_id', 'acc_id', 'journaltype_id', 'sub1_id', 'sub2_id', 'curr_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'region_name' => \FGTA4\utils\SqlUtility::Lookup($data->region_id, $this->db, 'mst_region', 'region_id', 'region_name'),
				'branch_name' => \FGTA4\utils\SqlUtility::Lookup($data->branch_id, $this->db, 'mst_branch', 'branch_id', 'branch_name'),
				'strukt_name' => \FGTA4\utils\SqlUtility::Lookup($data->strukturunit_id, $this->db, 'mst_strukt', 'strukt_id', 'strukt_name'),
				'rekanan_name' => \FGTA4\utils\SqlUtility::Lookup($data->rekanan_id, $this->db, 'mst_rekanan', 'rekanan_id', 'rekanan_name'),
				'rekanansub_name' => \FGTA4\utils\SqlUtility::Lookup($data->rekanansub_id, $this->db, 'mst_rekanansub', 'rekanansub_id', 'rekanansub_name'),
				'periode_name' => \FGTA4\utils\SqlUtility::Lookup($data->periode_id, $this->db, 'mst_periode', 'periode_id', 'periode_name'),
				'acc_name' => \FGTA4\utils\SqlUtility::Lookup($data->acc_id, $this->db, 'mst_acc', 'acc_id', 'acc_name'),
				'sub1_name' => \FGTA4\utils\SqlUtility::Lookup($data->sub1_id, $this->db, 'mst_sub1', 'sub1_id', 'sub1_name'),
				'sub2_name' => \FGTA4\utils\SqlUtility::Lookup($data->sub2_id, $this->db, 'mst_sub2', 'sub2_id', 'sub2_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($data->curr_id, $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				
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