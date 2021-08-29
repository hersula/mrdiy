<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Users_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	function save($input) {
		$cek = $this->db->query("SELECT * FROM app_users WHERE user_id=?", array($input['user_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'User ID sudah ada.');
		}
		
		$data = array(
			'user_id' => $input['user_id'],
			'user_pass' => password_hash($input['user_pass'], PASSWORD_DEFAULT),
			'name' => $input['name'],
			'role_id' => $input['role_id'],
			'def_store_id' => $input['def_store_id'],
			'employee_id' => $input['employee_id'],
			'active' => $input['active'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);
		
		$NonQry = $this->db->insert('app_users', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			$id_kar = $this->db->query("SELECT id FROM app_users WHERE user_id=?", array($input['user_id']))->row();
			return array('result' => true, 'data' => (array('id' => $id_kar->id)), 'msg' => 'Data berhasil disimpan.');
		}
	}
	
	function update($input) {
		if (trim($input['user_pass']) == "" || empty($input['user_pass']) || $input['user_pass'] == NULL) {
			$data = array(
				'name' => $input['name'],
				'role_id' => $input['role_id'],
				'def_store_id' => $input['def_store_id'],
				'active' => $input['active'],
				'modified_by' => $this->session->userdata('user_id'),
				'modification_date' => date('Y-m-d H:i:s')
			);
		} else {
			$data = array(
				'user_pass' => password_hash($input['user_pass'], PASSWORD_DEFAULT),
				'name' => $input['name'],
				'role_id' => $input['role_id'],
				'def_store_id' => $input['def_store_id'],
				'active' => $input['active'],
				'modified_by' => $this->session->userdata('user_id'),
				'modification_date' => date('Y-m-d H:i:s')
			);
		}
		
		$this->db->where('user_id', $input['user_id']);
		$NonQry = $this->db->update('app_users', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil diupdate.');
		}
	}
	
	function delete($input) {
		$this->db->where_in('id', $input['id']);
		$NonQry = $this->db->delete("app_users");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.user_id, a.name, a.role_id, b.role_name, a.employee_id, d.employee_name, a.def_store_id, c.store_name, CASE WHEN a.active='true' THEN 1 ELSE 0 END AS active
										FROM app_users a 
											LEFT JOIN app_roles b ON b.role_id=a.role_id
											LEFT JOIN m_store c ON c.store_id=a.def_store_id
											LEFT JOIN m_employee_data d ON d.employee_id=a.employee_id
										WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
	
	function getList($filter) {
		$this->datatables->select("a.id, a.user_id, a.name, a.role_id, a.employee_id, CASE WHEN a.active='true' THEN 1 ELSE 0 END AS active");
      $this->datatables->from("app_users a");
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	
	function getDataList($filter) {
		$this->db->select("a.user_id, a.name, a.role_id, b.role_name, a.employee_id, CASE WHEN a.active='true' THEN 'Aktif' ELSE 'Tidak Aktif' END AS active");
      $this->db->from('app_users a');
		$this->db->join('app_roles b', 'b.role_id=a.role_id', 'left');
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->db->where($key, $val);
			}
		}
		return $this->db->get();
	}
	
	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	function getListStore($id_user) {
		$this->datatables->select("a.id, a.store_id, c.store_name, c.status");
      $this->datatables->from("m_store_users a");
		$this->datatables->join("app_users b", "b.user_id=a.user_id");
		$this->datatables->join('m_store c', 'c.store_id=a.store_id', 'left');
		$this->datatables->where('b.id', $id_user);
		return $this->datatables->generate();
	}
	
	function getRoleList() {
		$this->datatables->select('a.role_id, a.role_name, a.desc');
      $this->datatables->from('app_roles a');
		return $this->datatables->generate();
	}
	
	function getStoreList() {
		$this->datatables->select('a.store_id, a.store_name');
      $this->datatables->from('m_store a');
		return $this->datatables->generate();
	}
	
	function getStoreListAutoComplete($input) {
		$showTypeAhead = array();
		$Qry = $this->db->query("SELECT a.store_id, a.store_name FROM m_store a WHERE a.store_id ILIKE ? OR a.store_name ILIKE ? LIMIT 5", 
							  			array('%'.$input['keyword'].'%', '%'.$input['keyword'].'%'));
		return $Qry->result();
	}
	
	function getStoreListTypeHead($input) {
		$showTypeAhead = array();
		$Qry = $this->db->query("SELECT a.store_id, a.store_name FROM m_store a WHERE a.store_id ILIKE ? OR a.store_name ILIKE ?", 
							  			array('%'.$input['keyword'].'%', '%'.$input['keyword'].'%'));
		return $Qry->result();
	}
	
	function addStore($input) {
		$cek = $this->db->query("SELECT * FROM m_store_users WHERE store_id=? AND user_id=?", array($input['store_id'], $input['user_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'Toko sudah dapat diakses.');
		}
		
		$data = array(
			'user_id' => $input['user_id'],
			'store_id' => $input['store_id'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);
		
		$NonQry = $this->db->insert('m_store_users', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Toko berhasil ditambahkan.');
		}
	}
	
	function deleteStore($input) {
		$this->db->where_in('id', $input['id']);
		$NonQry = $this->db->delete("m_store_users");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
}