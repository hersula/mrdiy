<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Login_Model extends Core_Model {
	
	function __construct() {
		  parent::__construct();
   }
	
	function getToken($user_id = '', $OldToken = '', $UseOldToken = false) {
		return $this->getNewToken($user_id, $OldToken, $UseOldToken);
	}
	
	function CheckGrant($UserID, $RoleID, $MenuID, $Action) {
		$qry = $this->db->query("SELECT a.".$Action."_flag AS action
										FROM app_menu_per_role a 
											JOIN app_menu_lists b ON a.menu_id = b.menu_id AND b.active=1
										WHERE a.role_id=? AND b.menu_id=? AND a.read_flag=1", 
										array($RoleID, $MenuID));
		return $qry->row()->action;
	}
	
	function getPriviledges($UserID, $RoleID, $MenuID) {
		$qry = $this->db->query("SELECT a.create_flag, a.edit_flag, a.delete_flag, a.print_flag, a.pdf_flag, a.xls_flag, a.confirm_flag, a.cancel_flag
										FROM app_menu_per_role a 
										WHERE a.role_id=? AND a.menu_id=? AND a.read_flag=1", 
										array($RoleID, $MenuID));
		return $qry->row_array();
	}
	
}
