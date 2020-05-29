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
		try {
		
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.regional_id LIKE CONCAT('%', :search, '%')"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_regional A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				regional_id, regional_name, regional_nameshort, regional_code, regional_npwp, regional_alamat, provinsi_id, kota_id, kecamatan_id, desa_id, regional_telp, regional_email, regional_descr, regional_isdisabled, _createby, _createdate, _modifyby, _modifydate 
				from mst_regional A
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
					'provinsi_name' => \FGTA4\utils\SqlUtility::Lookup($record['provinsi_id'], $this->db, 'mst_provinsi', 'provinsi_id', 'provinsi_name'),
					'kota_name' => \FGTA4\utils\SqlUtility::Lookup($record['kota_id'], $this->db, 'mst_kota', 'kota_id', 'kota_name'),
					'kecamatan_name' => \FGTA4\utils\SqlUtility::Lookup($record['kecamatan_id'], $this->db, 'mst_kecamatan', 'kecamatan_id', 'kecamatan_name'),
					'desa_name' => \FGTA4\utils\SqlUtility::Lookup($record['desa_id'], $this->db, 'mst_desa', 'desa_id', 'desa_name'),
					 
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