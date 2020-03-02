<?php namespace FGTA4;

if (!defined('FGTA4')) {
	die('Forbiden');
}

use FGTA4\exceptions\WebException;



class WebModuleConfig {

	public static $DefaultShortcutBackgroundColor = "";
	public static $DefaultModulegroupBackgroundColor = "";


	function __construct($moduleconfigpath) {
		if (!is_file($moduleconfigpath)) {
			throw new WebException("File config '$moduleconfigpath' tidak ditemukan", 500);		
		}


		try {
			$jsonconfigstr = file_get_contents($moduleconfigpath);
			$moduleconfig = json_decode($jsonconfigstr);
			if (json_last_error()>0) {
				throw new \Exception("format json di '$moduleconfigpath' salah.");
			}

			if (!property_exists($moduleconfig, 'title')) {
				$moduleconfig->title = $modulefullname;
			}
			$this->title = $moduleconfig->title;


			if (!property_exists($moduleconfig, 'allowanonymous')) {
				$moduleconfig->allowanonymous = false;
			}
			$this->allowanonymous = $moduleconfig->allowanonymous;



			if (!property_exists($moduleconfig, 'allowedgroups')) {
				$moduleconfig->allowedgroups = ['public'];
			}
			$this->allowedgroups = $moduleconfig->allowedgroups;



			if (!property_exists($moduleconfig, 'disabled')) {
				$moduleconfig->disabled = false;
			}	
			$this->disabled = $moduleconfig->disabled;
			

			
			if (!property_exists($moduleconfig, 'icon')) {
				$moduleconfig->icon = 'icon-application-white.png';
			}	
			$this->icon = $moduleconfig->icon;

			if (!property_exists($moduleconfig, 'forecolor')) {
				$moduleconfig->forecolor = 'white';
			}	
			$this->forecolor = $moduleconfig->forecolor;
					
			if (!property_exists($moduleconfig, 'backcolor')) {
				$moduleconfig->backcolor = self::$DefaultShortcutBackgroundColor;
			}	
			$this->backcolor = $moduleconfig->backcolor;
		
			if (!property_exists($moduleconfig, 'data')) {
				$moduleconfig->data = new \stdClass;
			}	
			$this->data = $moduleconfig->data;
	

			if (!property_exists($moduleconfig, 'apis')) {
				$moduleconfig->apis = new \stdClass;
			}

			if (!is_object($moduleconfig->apis)) {
				throw new \Exception("variable apis di '$moduleconfigpath' harus dalam bentuk object.");
			}

			foreach ($moduleconfig->apis as $apiname => $apiinfo) {
				if (!is_object($apiinfo)) {
					throw new \Exception("variable apis->$apiname di '$moduleconfigpath' harus dalam bentuk object.");
				}

				if (!property_exists($apiinfo, 'allowanonymous')) {
					$moduleconfig->apis[$apiname]->allowanonymous = false;
				}
			}
			$this->apis = $moduleconfig->apis;
		

		} catch (\Exception $ex) {
			throw new WebException($ex->getMessage(), 500);	
		}		

	}	
}
