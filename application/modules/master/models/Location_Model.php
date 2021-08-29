<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Location_Model extends Core_Model {
	function __construct(){
		parent::__construct();
	}
	function getList($filter) {
		$this->datatables->select('a.location_id, b.store_name, a.loc_id, c.area_name, a.loc_name');
		$this->datatables->from('m_location a');
		$this->datatables->join('m_store b', 'a.store_id=b.store_id');
		$this->datatables->join('m_area c', 'a.area_id=c.area_id');
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	public function getStoreList($user_id)
	{
		$this->datatables->select('a.store_id, a.store_name');
		$this->datatables->from('m_store a');
		$this->datatables->join('m_store_users b', 'a.store_id=b.store_id');
		$this->datatables->where('user_id', $user_id);
		return $this->datatables->generate();
	}
	public function getAreaList()
	{
		$this->datatables->select('a.area_id, a.area_name');
		$this->datatables->from('m_area a');
		return $this->datatables->generate();
	}
	function save($input) {
		
		$data = array(
			'store_id' => $input['store_id'],
			'loc_id' => $input['loc_id'],
			'area_id' => $input['area_id'],
			'area_id' => $input['area_id'],
			'loc_name' => $input['loc_name'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
      	);
		
		$NonQry = $this->db->insert('m_location', $data);
		
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
			'store_id' => $input['store_id'],
			'loc_id' => $input['loc_id'],
			'area_id' => $input['area_id'],
			'area_id' => $input['area_id'],
			'loc_name' => $input['loc_name'],
			'modified_by' => $this->session->userdata('user_id'),
			'modification_date' => date('Y-m-d H:i:s')
      	);
		
		$this->db->where('location_id', $input['id']);
		$NonQry = $this->db->update('m_location', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil diupdate.');
		}
	}
	
	function delete($input) {
		$this->db->where_in('location_id', $input['id']);
		$NonQry = $this->db->delete("m_location");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	function getDataList($filter) {
		$Qry = $this->db->query("SELECT a.location_id, b.store_id, b.store_name, a.loc_id, c.area_id, c.area_name, a.loc_name FROM m_location a
										JOIN m_store b ON a.store_id = b.store_id 
										JOIN m_area c ON a.area_id = c.area_id");
		return $Qry;
	}
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.location_id, b.store_id, b.store_name, a.loc_id, c.area_id, c.area_name, a.loc_name 
										FROM m_location a
										JOIN m_store b ON a.store_id = b.store_id 
										JOIN m_area c ON a.area_id = c.area_id 
										WHERE a.location_id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
}