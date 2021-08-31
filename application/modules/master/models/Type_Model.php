<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Type_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	// 	function buat_kode($input)   {
	
// /*		$this->db->select('max(mclass_id) as kode', FALSE);	
// 			$this->db->where('dept_id=',$input['dept_id']);		
// 			$this->db->order_by('mclass_id','DESC');   			 
// 			$this->db->limit(1);    
// 			$query = $this->db->get('m_mclass_baru'); */     //cek dulu apakah ada sudah ada kode di tabel.   
		  			
// 			$query = $this->db->query("SELECT max(mclass_id) as kode
// 										FROM m_mclass_baru 
// 										WHERE dept_id=?", $input['dept_id']);
					  
			  
// 			if($query->num_rows() <> 0){      
// 				//jika kode ternyata sudah ada.      
// 				$data = $query->row();      
// 				$kode = (int) substr($data->kode, -1, 2) + 1;
// 					}
// 					else {      
// 					//jika kode belum ada      
// 					$kode = 1;
									   
// 					}
					 
// 					   $kodemax = str_pad($kode, 2, "0", STR_PAD_LEFT); // angka 2 menunjukkan jumlah digit angka 0


// 			  $kodejadi = $kodemax;   
// 			  return $kodejadi;  		
			  
// 			  }


	function save($input) {
		
		$data = array(
			'kd_type' => $input['kd_type'],
			'nm_type' => $input['nm_type'],
			'status' => $input['status'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
      );
		
		$NonQry = $this->db->insert('m_type', $data);
		
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
			'kd_type' => $input['kd_type'],
			'nm_type' => $input['nm_type'],
			'status' => $input['status'],
			'modified_by' => $this->session->userdata('user_id'),
			'modification_date' => date('Y-m-d H:i:s')
		);
		
		$this->db->where('id', $input['id']);
		$NonQry = $this->db->update('m_type', $data);
		
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
		$NonQry = $this->db->delete("m_type");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.id, a.kd_type, a.nm_type, a.status 
										FROM m_type a 
										WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditemukan.', 'data' => NULL);
		}
	}
	
	function getList($filter) {
		$this->datatables->select('a.id, a.kd_type, a.nm_type, a.status');
      $this->datatables->from('m_type a');
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	
	function getDataList($filter) {
		$this->db->select("a.kd_type, a.nm_type, CASE WHEN a.status=1 THEN 'Aktif' ELSE 'Tidak Aktif' END AS status");
      $this->db->from('m_type a');
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
	
  	function getTypeList() {
		$this->datatables->select('a.kd_type, a.nm_type');
		$this->datatables->from('m_type a');
		return $this->datatables->generate();
	}

	function getTypeSelect2($input) {
		$Qry = $this->db->query("SELECT kd_type, nm_type FROM m_type WHERE kd_type ILIKE ? OR nm_type ILIKE ?", 
									   array('%'.$input['keyword'].'%', '%'.$input['keyword'].'%'));
		return $Qry->result();
	}

	function getType() {
		$Qry = $this->db->query("SELECT a.id, a.kd_type, a.nm_type, a.status FROM m_type a");
		return $Qry->result();
	}

}