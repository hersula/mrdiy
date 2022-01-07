<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Ticket_Model extends Core_Model {
	public $trans_code = "ST";
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
  public function generate_trans_number($tgl_trans)
  {
	  /**
	   * Format penomoran dokumen
	   * Contoh Penomoran :
	   * POSW00012104001
	   *
	   * Penjelasan :
	   * TC = Kode penerimaan
	   * SW0001 = Pemisah
	   * 21 = 2 digit tahun
	   * 04 = 2 digit bulan
	   * 001 = 3 digit running number
	   *
	   * Status dokumen :
	   * 0 = Baru
	   * 1 = Proses
	   * 2 = Selesai
	   * 9 = Batal
	   */
	  # Definisikan kebutuhan prefix
	  $max_length_pad_string = 3;
	  $prefix = $this->trans_code;
	  $year = date('y', strtotime($tgl_trans));
	  $month = date('m', strtotime($tgl_trans));
	  $prefix_full = $prefix . $month . $year;
	  # Get last number
	  $this->db->select("MAX(no_doc) AS code");
	  $this->db->from("t_ticket");
	//   $this->db->where([
	// 	  "kd_store" => $kd_site,
	//   ]);
	  $get_last_number = $this->db->get()->row_array();
	  # Jika nomor sudah ada tambahkan 1, jika tidak ada kembali ke 1
	  if ($get_last_number != null) {
		  $running_no = (int) substr($get_last_number['code'], strlen($prefix_full), $max_length_pad_string) + 1;
	  } else {
		  $running_no = 1;
	  }
	  $doc_no = $prefix_full . str_pad($running_no, $max_length_pad_string, "0", STR_PAD_LEFT);

	  return $doc_no;
  }

	function save($input) {
		$tgl_trans = date('Y-m-d');
		$no_doc = $this->generate_trans_number($tgl_trans);
		// $no_doc = "00001";
		// $cek = $this->db->query("SELECT * FROM t_ticket WHERE no_doc=?", array($input['no_doc']));
		// if ($cek->row() != NULL) {
		// 	return array('result' => false, 'data' => NULL, 'msg' => 'Karyawan ID sudah ada.');
		// }

		$data_input = (object) $input;
		$data2send = json_decode($data_input->data2Send);
		$data = array(
			'no_doc' => $no_doc,
			'kd_site' => $data2send->kd_site,
			'kd_type' => $data2send->kd_type,
			'kd_category' => $data2send->kd_category,
			'kd_progres' => $data2send->kd_progres,
			'kd_priority' => $data2send->kd_priority,
			'kd_store' => $data2send->kd_store,
			'user_id' => $this->session->userdata('user_id'),
			'subject' => $data2send->subject,
			'pesan' => $data2send->pesan,			
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);

		if (!empty($_FILES['lampiran'])) {
			$data['lampiran'] = $data_input->lampiran;
		}
		$NonQry = $this->db->insert('t_ticket', $data);
		
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
		LEFT JOIN m_customer g ON trim(g.m_code) = trim(a.kd_store)
		LEFT JOIN app_users h ON h.user_id = a.user_id
		WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
	
	function getList($filter) {
		$this->datatables->select("a.id, a.no_doc, a.creation_date, b.nm_site, c.nm_type, d.nm_category, e.nm_priority, f.nm_progres, g.m_odesc, h.name, a.subject");
	 		$this->datatables->from('t_ticket a');
	 		$this->datatables->join('m_site b', 'b.kd_site=a.kd_site', 'left');
			$this->datatables->join('m_type c', 'c.kd_type=a.kd_type', 'left');
			$this->datatables->join('m_category d', 'd.kd_category = a.kd_category', 'left');
			$this->datatables->join('m_priority e', 'e.kd_priority = a.kd_priority', 'left');
			$this->datatables->join('m_progres f', 'f.kd_progres = a.kd_progres', 'left');
			$this->datatables->join('m_customer g', 'trim(g.m_code) = trim(a.kd_store)', 'left');
			$this->datatables->join('app_users h', 'h.user_id = a.user_id', 'left');

		
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	
	function getDataList() {
		// $this->db->select("a.no_doc, b.nm_site, c.nm_type, d.nm_category, e.nm_priority, f.nm_progres, g.m_odesc, h.name, a.subject");
      	// $this->db->from('t_ticket a');
		// $this->db->join('m_store b', 'b.m_code=a.store', 'left');
		// foreach($filter as $key => $val) {
		// 	if (trim($val) != "" || !empty($val) || $val != NULL) {
		// 		$this->db->where($key, $val);
		// 	}
		// }
		// $this->db->order_by('a.sales_date', 'asc');
		// return $this->db->get();

		$this->db->select("a.no_doc, b.nm_site, c.nm_type, d.nm_category, e.nm_priority, f.nm_progres, g.m_odesc, h.name, a.subject");
	 		$this->db->from('t_ticket a');
	 		$this->db->join('m_site b', 'b.kd_site=a.kd_site', 'left');
			$this->db->join('m_type c', 'c.kd_type=a.kd_type', 'left');
			$this->db->join('m_category d', 'd.kd_category = a.kd_category', 'left');
			$this->db->join('m_priority e', 'e.kd_priority = a.kd_priority', 'left');
			$this->db->join('m_progres f', 'f.kd_progres = a.kd_progres', 'left');
			$this->db->join('m_customer g', 'trim(g.m_code) = trim(a.kd_store)', 'left');
			$this->db->join('app_users h', 'h.user_id = a.user_id', 'left');

		
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->db->get();
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