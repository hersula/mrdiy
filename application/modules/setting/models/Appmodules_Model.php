<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Appmodules_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	function save($input) {
		$cek = $this->db->query("SELECT * FROM app_modules WHERE module_id=?", array($input['module_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'Module ID sudah ada.');
		}
		
		$data = array(
			'module_id' => $input['module_id'],
			'module_name' => $input['module_name'],
			'active' => $input['active'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);
		
		$NonQry = $this->db->insert('app_modules', $data);
		
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
			'module_name' => $input['module_name'],
			'active' => $input['active'],
			'modified_by' => $this->session->userdata('user_id'),
			'modification_date' => date('Y-m-d H:i:s')
		);
		
		$this->db->where('module_id', $input['module_id']);
		$NonQry = $this->db->update('app_modules', $data);
		
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
		$NonQry = $this->db->delete("app_modules");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.id, a.module_id, a.module_name, a.active
										FROM app_modules a 
										WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
	
	function getList($filter) {
		$this->datatables->select('a.id, a.module_id, a.module_name, a.active');
      $this->datatables->from('app_modules a');
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	
	function getDataList($filter) {
		$this->db->select("a.module_id, a.module_name, CASE WHEN a.active=1 THEN 'Aktif' ELSE 'Tidak Aktif' END AS active");
      $this->db->from('app_modules a');
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
	
	function getModuleList() {
		$this->datatables->select('a.module_id, a.module_name');
		$this->datatables->from('app_modules a');
		$this->datatables->where('a.active', 1);
		return $this->datatables->generate();
	}
	
	function getEmployeeList($jabatan) {
		$this->datatables->select('a.employee_id, a.employee_name');
      $this->datatables->from('m_employee a');
		$this->datatables->where('a.status', 1);
		$this->datatables->where('a.jabatan', $jabatan);
		return $this->datatables->generate();
	}
	
}