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
					"search" => " ( A.employee_id LIKE CONCAT('%', :search, '%') OR A.employee_name LIKE CONCAT('%', :search, '%') ) "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_employee A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
          employee_id, employee_nipp, employee_name, employee_ktp, employee_tplahir, employee_tglahir, employee_alamat, 
          employee_sex, employee_email, employee_status, employee_telp, employee_tanggungan, 
          A.regional_id, A.divisi_id, A.jabatan_id, A.gol_id, A.kontrak_id, A.ptkp_id, A.agama_id, A.edu_id, 
          employee_datestart, employee_dateend, employee_isshift, employee_npwp, employee_isactive, A.bank_id, 
          employee_rek, employee_isdisabled, A._createby, A._createdate, A._modifyby, A._modifydate,
          RE.regional_name, DI.divisi_name, JA.jabatan_name, KO.kontrak_name, GO.gol_name, PK.ptkp_name         
        from mst_employee A
        left join mst_regional RE ON A.regional_id = RE.regional_id
        left join mst_divisi DI ON A.divisi_id = DI.divisi_id
        left join mst_jabatan JA ON A.jabatan_id = JA.jabatan_id
        left join mst_kontrak KO ON A.kontrak_id = KO.kontrak_id
        left join mst_gol GO ON A.gol_id = GO.gol_id
        left join mst_ptkp PK ON A.ptkp_id = PK.ptkp_id
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