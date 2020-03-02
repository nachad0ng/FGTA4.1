<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

class WebAPI {
	
	public function ActionIsAllowedFor($api_info, $user_owned_groups) {
	
		try {
			if ($user_owned_groups==null) {
				$user_owned_groups = ['public'];
			}

			$api_allowed_groups = property_exists($api_info, 'allowedgroups') ? $api_info->allowedgroups : ['public'];
			foreach ($api_allowed_groups as $allowed_group) {
				if (in_array($allowed_group, $user_owned_groups)) {
					return true;
				}
			}
			return false;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}	

	

}

