<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class App_Model extends Core_Model {
	
	function __construct() {
		  parent::__construct();
    }
	
	// function getAllData() {
	// 	$Q = $this->db->query("SELECT * FROM m_buyer");
	// 	return $Q;
	// }
	
	function getMenu($role_id) {
		$qry = $this->db->query("SELECT b.module_id, b.menu_id, b.menu_name, b.menu_desc, b.menu_icon, b.menu_ctl, b.menu_ctl_def,b.parent_menu_id,b.menu_id
										FROM app_menu_per_role a 
											JOIN app_menu_lists b ON b.menu_id=a.menu_id AND b.parent_menu_id=b.menu_id 
											JOIN app_modules c ON c.module_id=b.module_id AND c.active=1 
										WHERE a.role_id=? AND a.read_flag=1 AND b.active=1
										ORDER BY b.sort_id, b.parent_menu_id, b.menu_id", array($role_id));
		return $qry;
	}

	function getSubMenu($role_id, $parent_menu_id) {
		$qry = $this->db->query("SELECT b.module_id, b.menu_id, b.menu_name, b.menu_desc, b.menu_icon, b.menu_ctl, b.menu_ctl_def
										FROM app_menu_per_role a 
											JOIN app_menu_lists b ON a.menu_id = b.menu_id AND b.parent_menu_id=? AND b.menu_id!=b.parent_menu_id AND b.active=1 
											JOIN app_modules c ON c.module_id=b.module_id AND c.active=1 
										WHERE a.role_id=? AND a.read_flag=1 AND b.active=1
										ORDER BY b.sort_id, b.parent_menu_id, b.menu_id", array($parent_menu_id, $role_id));
		return $qry;
	}
	
	
}
