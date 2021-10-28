<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Document_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	function save($input) {
		// $no_doc = $this->generate_trans_number($input['kd_store']);
		// $no_doc = "00001";
		// $cek = $this->db->query("SELECT * FROM t_ticket WHERE no_doc=?", array($input['no_doc']));
		// if ($cek->row() != NULL) {
		// 	return array('result' => false, 'data' => NULL, 'msg' => 'Karyawan ID sudah ada.');
		// }

		$data_input = (object) $input;
		$data2send = json_decode($data_input->data2Send);
		$data = array(
			// 'no_doc' => $no_doc,
			'judul' => $data2send->judul,
			'description' => $data2send->description,
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);

		if (!empty($_FILES['lampiran'])) {
			$data['lampiran'] = $data_input->lampiran;
		}
		$NonQry = $this->db->insert('libdoc', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil disimpan.');
		}
	}
	
	function update($input) {
		//print "xxxx";exit;
		$data = array(			
			'kd_progres' => $input['kd_progres'],						
			'modified_by' => $this->session->userdata('user_id'),
			'modification_date' => date('Y-m-d H:i:s')
		);
		
		$this->db->where('subject', $input['subject']);
		$NonQry = $this->db->update('t_ticket', $data);
		
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
		$NonQry = $this->db->delete("t_ticket");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.id,a.no_doc,a.kd_site,b.nm_site,a.kd_type,c.nm_type,a.kd_category,d.nm_category,a.kd_priority,e.nm_priority,a.kd_progres,f.nm_progres,
		a.kd_store,g.m_shortdesc,a.user_id,h.name,a.subject,a.pesan
		FROM t_ticket a
		LEFT JOIN m_site b ON b.kd_site = a.kd_site
		LEFT JOIN m_type c ON c.kd_type = a.kd_type
		LEFT JOIN m_category d ON d.kd_category = a.kd_category
		LEFT JOIN m_priority e ON e.kd_priority = a.kd_priority
		LEFT JOIN m_progres f ON f.kd_progres = a.kd_progres
		LEFT JOIN m_customer g ON g.m_code = a.kd_store
		LEFT JOIN app_users h ON h.user_id = a.user_id
		WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
	
	function getList($filter) {
		$this->datatables->select("a.id, a.judul, a.lampiran, a.created_by, a.creation_date");
	 		$this->datatables->from('libdoc a');
		
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	
	function getDataList($filter) {
	  //$this->db->select("c.divisi_code, a.employee_id, a.employee_name, b.jabatan_name, a.join_date, CASE WHEN a.employee_status = 1 THEN 'TETAP'
	//						WHEN a.employee_status = 2 THEN 'KONTRAK'
	//						WHEN a.employee_status = 3 THEN 'RESIGN' END AS employee_status,
	//						CASE WHEN a.kelamin = 1 THEN 'PRIA' ELSE 'WANITA' END AS kelamin");
	//  $this->db->from('m_employee_data a');
	//  $this->db->join('m_jabatan b', 'b.jabatan_code=a.jabatan', 'left');
	//  $this->db->join('m_divisi c'. 'c.divisi_code=b.divisi_code', 'left');
	//	foreach($filter as $key => $val) {
	//		if (trim($val) != "" || !empty($val) || $val != NULL) {
	//			$this->db->where($key, $val);
	//		}
	//	}
	//	return $this->db->get();

		$id_employee = $this->session->userdata('employee_id');
		$divisi = $this->session->userdata('divisi_code');
		$store = $this->session->userdata('store_id');
		$users = $this->session->userdata('user_id');
	
		$query	 = $this->db->query("SELECT store_id FROM m_store_users WHERE user_id = '".$users."'");
		if ($divisi != 'RBHC'){	
			$this->datatables->select("a.id, b.divisi_code, d.store_name, a.employee_id, a.employee_name, a.atasan_id, c.employee_name as atasan_name, b.jabatan_name, a.join_date, a.employee_status,
									 a.kelamin, a.active");
			$this->datatables->from('m_employee_data a');
			$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
			$this->datatables->join('m_employee_data c', 'c.employee_id=a.atasan_id', 'left');
			$this->datatables->join('m_store d', 'd.store_id = a.store_id', 'left');
			$this->datatables->where('a.active', 1);
			$this->datatables->where('a.atasan_id', $id_employee);
		
			$strstoreid = '';	
			foreach ($query->result() as $row){
			
				$this->datatables->or_where('d.store_id', $row->store_id);
			}	

		} elseif ($id_employee = NULL) {
			$this->datatables->select("a.id, b.divisi_code, d.store_name, a.employee_id, a.employee_name, a.atasan_id, c.employee_name as atasan_name, b.jabatan_name, a.join_date, a.employee_status,
							a.kelamin, a.active");
			$this->datatables->from('m_employee_data a');
			$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
			$this->datatables->join('m_employee_data c', 'c.employee_id=a.atasan_id', 'left');
			$this->datatables->join('m_store d', 'd.store_id = a.store_id', 'left');
			$this->datatables->where('a.active', 1);  
		} else {
			$this->datatables->select("a.id, b.divisi_code, d.store_name, a.employee_id, a.employee_name, a.atasan_id, c.employee_name as atasan_name, b.jabatan_name, a.join_date, a.employee_status,
							a.kelamin, a.active");
			$this->datatables->from('m_employee_data a');
			$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
			$this->datatables->join('m_employee_data c', 'c.employee_id=a.atasan_id', 'left');
			$this->datatables->join('m_store d', 'd.store_id = a.store_id', 'left');
			$this->datatables->where('a.active', 1);
		}
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}

	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/
  	// function getKaryawanAll($jabatan) {
	// 	$this->datatables->select("a.employee_id, a.employee_name, b.jabatan_name,a.email,d.divisi_name,a.join_date");
	//   	$this->datatables->from('m_employee_data a');
	//   	$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
	//   	$this->datatables->join('m_divisi d', 'd.divisi_code=b.divisi_code', 'left');
	// 	$this->datatables->where('a.active', 1);
	// 	if ($this->input->get('jabatan') == 'sm_id') {
	// 		//$this->datatables->like('b.jabatan_name', 'STORE MANAGER', 'BOTH');
	// 		$this->datatables->where_in('b.jabatan_code', ['RB224','RB223','RB241']);
	// 	}elseif ($this->input->get('jabatan') == 'mcd_id') {
	// 		//$this->datatables->like('d.divisi_name', 'DIV. MERCHANDISER', 'BOTH');
	// 		$this->datatables->where_in('b.jabatan_code', ['RB246','RB225']);
	// 	}elseif ($this->input->get('jabatan') == 'vm_id') {
	// 		$this->datatables->like('b.jabatan_name', 'STORE VM', 'BOTH');
	// 	}elseif ($this->input->get('jabatan') == 'edp_id') {
	// 		$this->datatables->like('b.jabatan_name', 'STORE EDP', 'BOTH');
	// 	}elseif ($this->input->get('jabatan') == 'tech_id') {
	// 		//$this->datatables->like('b.jabatan_name', 'STORE EDP', 'BOTH');
	// 		$this->datatables->where_in('b.jabatan_code', ['RB203','RB197','RB193','RB181']);
	// 	}
	// 	return $this->datatables->generate();
	// }
	

  	// function getKaryawanList() {
	// 	$id_employee = $this->session->userdata('employee_id');
	// 	$divisi = $this->session->userdata('divisi_code');
	// 	$store = $this->session->userdata('store_id');
	// 	$users = $this->session->userdata('user_id');
	// 	/*
	// 	$this->datatables->select("a.employee_id, a.employee_name, b.jabatan_name,c.edu_name,d.divisi_name,a.join_date");
	//   	$this->datatables->from('m_employee_data a');
	//   	$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
	//   	$this->datatables->join('m_education c', 'c.edu_code=a.pendidkan', 'left');
	//   	$this->datatables->join('m_divisi d', 'd.divisi_code=b.divisi_code', 'left');
	// 	$this->datatables->where('a.active', 1);
	// 	$this->datatables->where('a.atasan_id', $parent);
	// 	return $this->datatables->generate();
	// 	*/
	// 	$query	 = $this->db->query("SELECT store_id FROM m_store_users WHERE user_id = '".$users."'");

	// 	$this->datatables->select("a.employee_id, a.employee_name,  b.jabatan_name, d.store_name, e.divisi_name, a.join_date");
	//  		$this->datatables->from('m_employee_data a');
	//  		$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
	// 		 $this->datatables->join('m_education c', 'c.edu_code=a.pendidkan', 'left');
	// 		 $this->datatables->join('m_store d', 'd.store_id = a.store_id', 'left');
	// 		 $this->datatables->join('m_divisi e', 'e.divisi_code=b.divisi_code', 'left');
	// 		$this->datatables->where('b.divisi_code', $divisi);
	// 		$this->datatables->where('a.active', 1);
	// 		$this->datatables->where('d.store_id', $store);
	// 		foreach ($query->result() as $row){
	// 			$this->datatables->or_where('d.store_id', $row->store_id);			
	// 		}
	// 		return $this->datatables->generate();
	// }

	// function getBawahanList() {
	// 	$id_employee = $this->session->userdata('employee_id');

	// 	$this->datatables->select("a.employee_id, a.employee_name,  b.jabatan_name, d.store_name, e.divisi_name, a.join_date");
	//  		$this->datatables->from('m_employee_data a');
	//  		$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
	// 		 $this->datatables->join('m_education c', 'c.edu_code=a.pendidkan', 'left');
	// 		 $this->datatables->join('m_store d', 'd.store_id = a.store_id', 'left');
	// 		 $this->datatables->join('m_divisi e', 'e.divisi_code=b.divisi_code', 'left');
	// 		$this->datatables->where('a.atasan_id', $id_employee);
	// 		$this->datatables->where('a.active', 1);
	// 		return $this->datatables->generate();
	// }

	// function getAtasanList($divisi,$level) {
	// 	//$level = $this->session->userdata('level_code');
	// 	//$divisi = $this->session->userdata('divisi_code');
	//   	$this->datatables->select("a.employee_id, a.employee_name, b.jabatan_name, c.divisi_name");
	//   	$this->datatables->from('m_employee_data a');
	// 	$this->datatables->join('m_jabatan b', 'b.jabatan_code=a.jabatan_code', 'left');
	// 	$this->datatables->join('m_divisi c', 'c.divisi_code=b.divisi_code', 'left');
	// 	#$this->datatables->where('b.divisi_code', $divisi);
	// 	$this->datatables->where('CAST(b.level_code as INTEGER) > ',$level, FALSE);
	// 	$this->datatables->where('a.active', 1);
		
		
	// 	return $this->datatables->generate();

	// 	#$sql = "SELECT a.employee_id, a.employee_name, b.jabatan_name, c.divisi_name
	// 	#							FROM m_employee_data a
	// 	#							JOIN m_jabatan b ON b.jabatan_code = a.jabatan_code AND b.divisi_code = '".$divisi."' AND CAST(b.level_code AS INTEGER) < '".$level."'
	// 	#							JOIN m_divisi c ON c.divisi_code = b.divisi_code
	// 	#							WHERE a.active=1";
		
	// 	#$result = $this->datatables->query($sql);
	// }
}