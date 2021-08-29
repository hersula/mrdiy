<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Profile_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
  	function getInfoUser() {
		$Qry = $this->db->query("SELECT a.id, a.user_id, a.name, a.role_id, b.role_name
										FROM app_users a 
											LEFT JOIN app_roles b ON b.role_id=a.role_id
										WHERE a.active='TRUE' AND a.user_id=?", array($this->session->userdata('user_id')));
													
		return $Qry->row_array();
	}
	
	function update($input) {
		# Cek jika user sudah ada
		$cekuser = $this->db->query("SELECT * FROM app_users WHERE user_id=? AND id!=?", array($input['user_id'], $input['id']));
		if ($cekuser->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'User ID sudah digunakan.');
		}

		if (trim($input['user_pass']) == "" || empty($input['user_pass']) || $input['user_pass'] == NULL) {
			$data = array(
				'user_id' => $input['user_id'],
				'name' => $input['name'],
				'modified_by' => $this->session->userdata('user_id'),
				'modification_date' => date('Y-m-d H:i:s')
			);
		} else {
			$data = array(
				'user_id' => $input['user_id'],
				'user_pass' => password_hash($input['user_pass'], PASSWORD_DEFAULT),
				'name' => $input['name'],
				'modified_by' => $this->session->userdata('user_id'),
				'modification_date' => date('Y-m-d H:i:s')
			);
		}
		
		$this->db->where('id', $input['id']);
		$NonQry = $this->db->update('app_users', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'User gagal update. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'User berhasil diupdate.');
		}
	}
	
}