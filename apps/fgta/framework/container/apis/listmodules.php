<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


use FGTA4\WebModuleConfig;
use FGTA4\exceptions\WebException;



class ListModules extends WebAPI {

	function __construct() {
		$this->debugoutput = true;
		switch (__APPNAME) {
			case "kalista" :
				WebModuleConfig::$DefaultShortcutBackgroundColor = "#9d6da9";
				WebModuleConfig::$DefaultModulegroupBackgroundColor = "#9d6da9";
				break;

			default:
				WebModuleConfig::$DefaultShortcutBackgroundColor = "#3F4756"; // "#9d6da9";
				WebModuleConfig::$DefaultModulegroupBackgroundColor = "#3F4756"; //"#9d6da9";ssss
		}


	}

	static function getModuleListPath() {
		$appid = array_key_exists('appid', $_COOKIE) ? $_COOKIE['appid'] : '';

		switch ($appid) {
			case 'xasafanrjdnf84rhu4fh04fhos0f4wofw40':
				// etap
				return realpath(__LOCALDB_DIR . '/menus/modules-etap.json');

			default:
				$menu = realpath(__LOCALDB_DIR . '/menus/modules-public.json');
				$userdata = json_decode($_SESSION['userdata']);
				if (array_key_exists('menu', $userdata)) {
					$usermenu = __LOCALDB_DIR . "/menus/$userdata->menu";
					if (is_file($usermenu)) {
						$menu = realpath($usermenu);
					}
				}
				return $menu;
		}
	
	}

	public function execute($username) {

		$userdata = $this->auth->session_get_user();

		$modulepath = self::getModuleListPath();
		$modulesjsondata = file_get_contents($modulepath);
		$modulesrawdata = json_decode($modulesjsondata, true);
		if (json_last_error()) {
			throw new WebException("format json pada file '$modulepath' salah",  500);
		}

		$USERMODULES = $this->CreateModuleHierarchy($modulesrawdata['modules'], $userdata);
		return $USERMODULES;
	}


	public function CreateModuleHierarchy($modules, $userdata) {
		if (!is_array($modules)) 
			return;

		$USERMODULES = array();
		foreach ($modules as $moduleitem) {
			if (is_array($moduleitem)) {
				// module group
				$mdl = new ModuleGroup($moduleitem, $userdata);
				if (array_key_exists('modules', $moduleitem)) {
					$mdl->MODULES = $this->CreateModuleHierarchy($moduleitem['modules'], $userdata);
				}
			} else {
				// module
				$modulefullname = $moduleitem;
				$mdl = new ModuleShorcut($moduleitem, $userdata);
			}
			array_push($USERMODULES, $mdl);
		}

		return $USERMODULES;
		
	}

}


class ModuleIcon {
	public $type;
	public $title;
	public $icon;
	public $forecolor;
	public $backcolor;
	public $disabled = false;
}

class ModuleGroup extends ModuleIcon  {
	public $type = "modulegroup";
	function __construct($modulegroup, $userdata) {

		$this->title = array_key_exists('title', $modulegroup) ? $modulegroup['title'] : 'modules group';
		$this->icon = array_key_exists('icon', $modulegroup) ? $modulegroup['icon'] : 'icon-folder-white.png';
		$this->forecolor = array_key_exists('forecolor', $modulegroup) ? $modulegroup['forecolor'] : 'white';
		$this->backcolor = array_key_exists('backcolor', $modulegroup) ? $modulegroup['backcolor'] : WebModuleConfig::$DefaultModulegroupBackgroundColor;
		$this->disabled = array_key_exists('disabled', $modulegroup) ? $modulegroup['disabled'] : false;


	}
}

class ModuleShorcut extends ModuleIcon {
	public $type = "module";

	private $userdata;

	function __construct($modulefullname, $userdata) {
		$this->userdata = $userdata;
		$this->modulefullname = $modulefullname;

		$moduleinfo = $this->get_module_info($modulefullname);

	}

	function get_module_info($modulefullname) {
		$modulepath = __ROOT_DIR."/apps/$modulefullname";
		$modulename = basename($modulepath);

		// cek file konfigurasi
		$moduleconfigpath = "$modulepath/$modulename.json";
		$moduleconfigpath_original =  $moduleconfigpath;
		$moduleconfigpath_ovveride = __LOCALDB_DIR . '/progaccess/' . str_replace("/", "#", $modulefullname) . ".json";
		if (is_file($moduleconfigpath_ovveride)) {
			$moduleconfigpath = $moduleconfigpath_ovveride;
		}	

		if (!is_file($moduleconfigpath)) {
			$modulelistpath = ListModules::getModuleListPath();
			throw new WebException("file konfigurasi untuk '$modulename' tidak ditemukan. ($moduleconfigpath). Cek file konfigurasi, atau mungkin salah penulisan di daftar module pada file '$modulelistpath'",  500);
		}

		//$mcori = new WebModuleConfig($moduleconfigpath_original);
		//$moduleconfig = $mcori;
		$moduleconfig = new WebModuleConfig($moduleconfigpath_original);
		if ($moduleconfigpath!=$moduleconfigpath_original) {
			$mcovr = new WebModuleConfig($moduleconfigpath, true); 
			$moduleconfig = (object) array_merge((array)$moduleconfig, (array)$mcovr);
		}

		$this->title = $moduleconfig->title;
		$this->icon = $moduleconfig->icon;
		$this->forecolor = $moduleconfig->forecolor;
		$this->backcolor = $moduleconfig->backcolor;
		//$this->disabled = $moduleconfig->disabled;
		$this->allowedgroups = $moduleconfig->allowedgroups;
		
		// cek apakah modulenya diperbolehkan
		$this->disabled = true;
		foreach ($this->allowedgroups as $allowed_group) {
			if (in_array($allowed_group, $this->userdata->groups)) {
				$this->disabled = false;
				break;
			}
		}
		
	}

}


$API = new ListModules();