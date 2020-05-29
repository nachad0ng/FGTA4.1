<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
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

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.journal_id LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_journal A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				journal_id, journal_descr, journal_bookdate, journal_duedate, journal_source, journal_isdisabled, journal_isposted, journal_isreversed, channel_id, region_id, branch_id, strukturunit_id, rekanan_id, rekanansub_id, periode_id, acc_id, journaltype_id, sub1_id, sub2_id, curr_id, _createby, _createdate, _modifyby, _modifydate 
				from trn_journal A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'region_name' => \FGTA4\utils\SqlUtility::Lookup($record['region_id'], $this->db, 'mst_region', 'region_id', 'region_name'),
					'branch_name' => \FGTA4\utils\SqlUtility::Lookup($record['branch_id'], $this->db, 'mst_branch', 'branch_id', 'branch_name'),
					'strukt_name' => \FGTA4\utils\SqlUtility::Lookup($record['strukturunit_id'], $this->db, 'mst_strukt', 'strukt_id', 'strukt_name'),
					'rekanan_name' => \FGTA4\utils\SqlUtility::Lookup($record['rekanan_id'], $this->db, 'mst_rekanan', 'rekanan_id', 'rekanan_name'),
					'rekanansub_name' => \FGTA4\utils\SqlUtility::Lookup($record['rekanansub_id'], $this->db, 'mst_rekanansub', 'rekanansub_id', 'rekanansub_name'),
					'periode_name' => \FGTA4\utils\SqlUtility::Lookup($record['periode_id'], $this->db, 'mst_periode', 'periode_id', 'periode_name'),
					'acc_name' => \FGTA4\utils\SqlUtility::Lookup($record['acc_id'], $this->db, 'mst_acc', 'acc_id', 'acc_name'),
					'sub1_name' => \FGTA4\utils\SqlUtility::Lookup($record['sub1_id'], $this->db, 'mst_sub1', 'sub1_id', 'sub1_name'),
					'sub2_name' => \FGTA4\utils\SqlUtility::Lookup($record['sub2_id'], $this->db, 'mst_sub2', 'sub2_id', 'sub2_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					 
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();