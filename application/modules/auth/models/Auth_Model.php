<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Auth_Model extends Core_Model {
	
	function __construct() {
		  parent::__construct();
    }
	
	function getLogin($input) {
		# Dapatkan informasi user
		$getData = $this->db->query("SELECT a.user_id, a.employee_id, a.user_pass, a.name, a.role_id, c.module_id, b.def_menu_id, c.menu_ctl, c.menu_ctl_def, e.level_code, e.divisi_code,
											d.store_id,a.def_store_id
												FROM app_users a
													JOIN app_roles b ON a.role_id=b.role_id
													JOIN app_menu_lists c ON c.menu_id=b.def_menu_id
													JOIN m_employee_data d ON d.employee_id=a.employee_id
													JOIN m_jabatan e ON e.jabatan_code=d.jabatan_code
												WHERE a.user_id=? AND a.active=true", 
												array($input['user']));
		
		#cek jika user non root ditemukan
		if ($getData->row() == NULL) {

			$getUser = $this->db->query("SELECT a.user_id, '' as employee_id, a.user_pass, a.name, a.role_id, c.module_id, b.def_menu_id, c.menu_ctl, c.menu_ctl_def, 0 AS level_code, '' as divisi_code,a.def_store_id
												FROM app_users a
													JOIN app_roles b ON a.role_id=b.role_id
													JOIN app_menu_lists c ON c.menu_id=b.def_menu_id
												WHERE a.user_id=? AND a.active=true", 
												array($input['user']));
			# Cek jika user tidak ditemukan
			if ($getUser->row() == NULL) {
				return array('result' => false, 'msg' => 'User atau password anda salah', 'data' => NULL);
			}

			# Jika password yang diparsing salah, maka kembalikan
			if (!password_verify($input['pass'], $getUser->row()->user_pass)) {
				return array('result' => false, 'msg' => 'User atau password anda salah', 'data' => NULL);
	   		}
	   
	   		if ($getUser->row() != NULL){
		   		$data = array(
			   'user_id' => $input['user'],
			   'ip_address' => $this->input->ip_address()
		   		);
		   		$this->db->insert('app_users_log', $data);
		   		return array('result' => true, 'msg' => 'User ditemukan', 'data' => $getUser->row_array());
	   		} else {
		   		return array('result' => false, 'msg' => 'User atau password anda salah', 'data' => NULL);
	   		}
		} 

		if (!password_verify($input['pass'], $getData->row()->user_pass)) {
			return array('result' => false, 'msg' => 'User atau password anda salah', 'data' => NULL);
		}

		if ($getData->row() != NULL){
			$data = array(
				'user_id' => $input['user'],
				'ip_address' => $this->input->ip_address()
			);
			$this->db->insert('app_users_log', $data);
			return array('result' => true, 'msg' => 'User ditemukan', 'data' => $getData->row_array());
		} else {
			return array('result' => false, 'msg' => 'User atau passord anda salah', 'data' => NULL);
		}


		
	}

	
}
