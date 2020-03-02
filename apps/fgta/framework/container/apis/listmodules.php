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
				return realpath(dirname(__FILE__).'/../../../../../core/database/menus/modules-etap.json');

			default:
				$menu = realpath(dirname(__FILE__).'/../../../../../core/database/menus/modules-public.json');
				$userdata = json_decode($_SESSION['userdata']);
				if (array_key_exists('menu', $userdata)) {
					$usermenu = dirname(__FILE__)."/../../../../../core/database/menus/$userdata->menu";
					if (is_file($usermenu)) {
						$menu = realpath($usermenu);
					}
				}
				return $menu;
		}
		
	}

	public function execute($username) {
		$modulepath = self::getModuleListPath();
		$modulesjsondata = file_get_contents($modulepath);
		$modulesrawdata = json_decode($modulesjsondata, true);
		if (json_last_error()) {
			throw new WebException("format json pada file '$modulepath' salah",  500);
		}

		$USERMODULES = $this->CreateModuleHierarchy($modulesrawdata['modules']);
		return $USERMODULES;
	}


	public function CreateModuleHierarchy($modules) {
		if (!is_array($modules)) 
			return;

		$USERMODULES = array();
		foreach ($modules as $moduleitem) {
			if (is_array($moduleitem)) {
				// module group
				$mdl = new ModuleGroup($moduleitem);
				if (array_key_exists('modules', $moduleitem)) {
					$mdl->MODULES = $this->CreateModuleHierarchy($moduleitem['modules']);
				}
			} else {
				// module
				$modulefullname = $moduleitem;
				$mdl = new ModuleShorcut($moduleitem);
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
	function __construct($modulegroup) {

		$this->title = array_key_exists('title', $modulegroup) ? $modulegroup['title'] : 'modules group';
		$this->icon = array_key_exists('icon', $modulegroup) ? $modulegroup['icon'] : 'icon-folder-white.png';
		$this->forecolor = array_key_exists('forecolor', $modulegroup) ? $modulegroup['forecolor'] : 'white';
		$this->backcolor = array_key_exists('backcolor', $modulegroup) ? $modulegroup['backcolor'] : WebModuleConfig::$DefaultModulegroupBackgroundColor;
		$this->disabled = array_key_exists('disabled', $modulegroup) ? $modulegroup['disabled'] : false;


	}
}

class ModuleShorcut extends ModuleIcon {
	public $type = "module";
	function __construct($modulefullname) {
		$this->modulefullname = $modulefullname;

		$moduleinfo = $this->get_module_info($modulefullname);

	}

	function get_module_info($modulefullname) {
		$modulepath = __ROOT_DIR."/apps/$modulefullname";
		$modulename = basename($modulepath);

		// cek file konfigurasi
		$moduleconfigpath = "$modulepath/$modulename.json";
		if (!is_file($moduleconfigpath)) {
			$modulelistpath = ListModules::getModuleListPath();
			throw new WebException("file konfigurasi untuk '$modulename' tidak ditemukan. ($moduleconfigpath). Cek file konfigurasi, atau mungkin salah penulisan di daftar module pada file '$modulelistpath'",  500);
		}


		$moduleconfig = new WebModuleConfig($moduleconfigpath);
		$this->title = $moduleconfig->title;
		$this->icon = $moduleconfig->icon;
		$this->forecolor = $moduleconfig->forecolor;
		$this->backcolor = $moduleconfig->backcolor;
		$this->disabled = $moduleconfig->disabled;
		$this->allowedgroups = $moduleconfig->allowedgroups;
		
		
	}

}


$API = new ListModules();