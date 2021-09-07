<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Approles_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	function save($input) {
		$cek = $this->db->query("SELECT * FROM app_roles WHERE role_id=?", array($input['role_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'Role ID sudah ada.');
		}
		
		$data = array(
			'role_id' => $input['role_id'],
			'role_name' => $input['role_name'],
			'desc' => $input['desc'],
			'def_menu_id' => $input['def_menu_id'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);
		
		$NonQry = $this->db->insert('app_roles', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil disimpan.');
		}
	}
	
	function update($input) {
		$data = array(
			'role_id' => $input['role_id'],
			'role_name' => $input['role_name'],
			'desc' => $input['desc'],
			'def_menu_id' => $input['def_menu_id'],
			'modified_by' => $this->session->userdata('user_id'),
			'modification_date' => date('Y-m-d H:i:s')
		);
		
		$this->db->where('role_id', $input['role_id']);
		$NonQry = $this->db->update('app_roles', $data);
		
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
		$NonQry = $this->db->delete("app_roles");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.id, a.role_id, a.role_name, a.desc, a.def_menu_id, b.menu_name
										FROM app_roles a 
											LEFT JOIN app_menu_lists b ON b.menu_id=a.def_menu_id
										WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
	
	function getList() {
		$this->datatables->select('a.id, a.role_id, b.menu_name, a.role_name, a.desc');
      $this->datatables->from('app_roles a');
		$this->datatables->join('app_menu_lists b', 'b.menu_id=a.def_menu_id', 'left');
		return $this->datatables->generate();
	}
	
	function getDataList() {
		$this->db->select("a.role_id, a.role_name, a.desc, a.def_menu_id, b.menu_name");
      $this->db->from('app_roles a');
		$this->db->join('app_menu_lists b', 'b.menu_id=a.def_menu_id', 'left');
		return $this->db->get();
	}
	
	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/
	
  function getRoleList() {
	$this->datatables->select('a.role_id,a.role_name,a.desc');
	$this->datatables->from('app_roles a');
	return $this->datatables->generate();
}

}