<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ticket extends Core_Controller {

	function __construct(){
		parent::__construct("ticket"); # parsing menu_id
		$this->load->model("Ticket_Model", "m_app");
	}

	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/

  	function index() {
		//$this->data['action'] = 'create';
		$this->load->view('Ticket', $this->data);
	  }
	  
	function create() {
		$this->load->view('Ticket_Form', $this->data);
	}

	function getList() {
		$filter = array(
			'a.active' => $this->input->post("active", TRUE),
			#'a.employee_status' => $this->input->post("employee_status", TRUE),
		);
	
		$this->output->set_content_type('application/json');
		echo $this->m_app->getList($filter);
	}

	function save($format = 'json') {
		$input = $this->input->post();
        $data2send = json_decode($input['data2Send']);
		$nis = $this->session->userdata('user_id');
		
		$kd_site = $data2send->kd_site;
		$kd_type = $data2send->kd_type;
		$kd_category = $data2send->kd_category;
		$kd_progres = $data2send->kd_progres;
		$kd_priority = $data2send->kd_priority;
		$kd_store = $data2send->kd_store;
		$user_id = $this->session->userdata('user_id');
		$subject = $data2send->subject;
		$pesan = $data2send->pesan;

		$data_upload = uploadDataImg('lampiran', $subject.'_lampiran'.'_'.date('d-m-Y'), './assets/data_upload');

		if (!empty($_FILES)) {
			if ($input != NULL || trim($input) == '' || !empty($input)) {				
				if ($data_upload['upload_status'] == true) {
					$input['lampiran'] = ($data_upload['upload_status'] != false) ? $data_upload['upload_data']['file_name'] : null;
				}
				
				$hasil = $this->m_app->save($input);
				echo $this->output($format, $hasil);
			} else {
				$hasil = array('result' => false, 'msg' => 'Data kosong.', 'data' => NULL);
				echo $this->output($format, $hasil);
			}
			
		} else {
			if ($input != NULL || trim($input) == '' || !empty($input)) {
				$hasil = $this->m_app->save($input);
				echo $this->output($format, $hasil);
			} else {
				$hasil = array('result' => false, 'msg' => 'Data kosong.', 'data' => NULL);
				echo $this->output($format, $hasil);
			}
		}
	}

	function getData2Edit($format = 'json', $id = NULL) {
		if ($id != NULL || trim($id) != '' || !empty($id)) {
			$hasil = $this->m_app->getData2Edit($id);	
		} else {
			$hasil = array('result' => false, 'msg' => 'Data kosong.', 'data' => NULL);
		}
	
		echo $this->output($format, $hasil);
	}

	function update($format = 'json') {
		# START Check input, jika tidak ada input atau kosong maka tidak di lanjutkan
		$raw = $this->security->xss_clean($this->input->raw_input_stream);
		$input = $this->input($format, $raw);
	
		if ($input != NULL || trim($input) == '' || !empty($input)) {
			$hasil = $this->m_app->update($input);
		} else {
			$hasil = array('result' => false, 'msg' => 'Data kosong.', 'data' => NULL);
		}
	
		echo $this->output($format, $hasil);
	}

	function edit($id = NULL) {
		//print "zzzzzzzzz"; exit;
		if ($id == NULL || trim($id) == '' || empty($id)) {
			show_404();
		} else {
			$this->data['id'] = $id;
			$this->load->view('Ticket_Form', $this->data);
		}
	}

	function delete($format = 'json') {
		# START Check input, jika tidak ada input atau kosong maka tidak di lanjutkan
		$raw = $this->security->xss_clean($this->input->raw_input_stream);
		$input = $this->input($format, $raw);
	
		if ($input != NULL || trim($input) == '' || !empty($input)) {
			$hasil = $this->m_app->delete($input);
		} else {
			$hasil = array('result' => false, 'msg' => 'Data kosong.', 'data' => NULL);
		}
	
		echo $this->output($format, $hasil);
	}

	function pdf() {
		# Judul laporan
		$JudulLaporan = "Ticket List";
		# Load library
		$this->load->library('PDFReport');
		$pdf = new PDFReport();
		# Ukuran kertas
		$pdf->_construct('P', 'mm', 'A4', true, 'UTF-8', false); # A4
		// $pdf->_construct('L', 'mm', array(210, 350), true, 'UTF-8', false); # Custom
		# START deklarasi header
		unset($dataHeader);
		$dataHeader = array();
		$pdf->dataHeader = $dataHeader;
		$pdf->RepFuncHeader = "Ticket";
		# END deklarasi header
		# START deklarasi footer
		unset($dataFooter);
		$dataFooter = array('printed_by' => $this->session->userdata('name'));
		$pdf->dataFooter = $dataFooter;
		# END deklarasi footer
		# Set default header data
		$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE, PDF_HEADER_STRING);
		# Set margins
		$pdf->SetMargins(PDF_MARGIN_LEFT, 28, PDF_MARGIN_RIGHT);
		$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
		$pdf->SetTitle($JudulLaporan);
		$pdf->setFooterMargin(30);
		$pdf->SetAutoPageBreak(true, 20);
		$pdf->SetAuthor('Mr Sule');
		$pdf->SetDisplayMode('fullwidth', 'continuous');
		# Ambil data
		$filter = array(
			'a.active' => $this->input->post("active", TRUE),
		);
		$data = $this->m_app->getDataList($filter);
		$pdf->AddPage();
	
		$pdf->SetFont('helvetica','',8);
		if ($data->result() != NULL) {
			foreach($data->result() as $key => $val) {
				$pdf->Cell(50,5,$val->penilaian_code,1,0,'L');
			 	$pdf->Cell(80,5,$val->penilaian_name,1,0,'L');
				$pdf->Cell(25,5,$val->active,1,0,'L');
			  	$pdf->Ln(5);
			}
		} else {
			$pdf->Cell(0,5,"Data tidak ditemukan.",1,0,'C');
		}
		# Keluarkan Output
		$pdf->Output($JudulLaporan.'_'.date('YmdHis').'.pdf', 'I');
	}

	function xls() {
		# Judul laporan
		$JudulLaporan = "Ticket List";
		# Ambil data
		// $filter = array(
		// 	'a.active' => $this->input->post("active", TRUE),
		// );
		//$rs = $this->m_app->getDataList($filter);
		$rs = $this->m_app->getDataList();
		# Deklarasi kolom yang akan ditampilkan
		$Col['header'] = array('No Doc', 'Site', 'Tipe', 'Kategori', 'Prioritas', 'Progres', 'Toko', 'User', 'Subject', 'Created');
		$Col['type'] = array('string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string');
		$Col['align'] = array('left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left');
		# Load library
		$this->load->library('XLSReport');
		$xls = new XLSReport();
		# Jika jumlah rows lebih dari 1.000.000 download ke CSV, jika bukan ke XLSX
		if ($rs->num_rows() >= 1000000) {
			$xls->generateCSVByQueryObj($rs, $JudulLaporan, ";");
		} else {
			// $xls->generateXlsByQueryObj($rs, $Col, $JudulLaporan);
			$xls->generateCSVByQueryObj($rs, $JudulLaporan, ";");
		}
	}

	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/

//   function getKaryawanAll($action = "home") {
// 	$data['ColHeader'] = array('Kode Karyawan', 'Nama Karyawan', 'Jabatan', 'Email', 'Divisi','Tanggal Masuk');
// 	$data['ColShow'] = array(1, 1, 1, 1, 1, 1);
// 	$data['columns'] = array(
// 		array('data' => 'employee_id'),
// 		array('data' => 'employee_name'),
// 		array('data' => 'jabatan_name'),
// 		array('data' => 'email'),
// 		array('data' => 'divisi_name'),
// 		array('data' => 'join_date'),
// 	);
// 	$data['columnDefs'] = array(
// 		array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 		array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		array('targets' => 2, 'orderable' => true, 'searchable' => true),
// 		array('targets' => 3, 'orderable' => true, 'searchable' => true),
// 		array('targets' => 4, 'orderable' => true, 'searchable' => true),
// 		array('targets' => 5, 'orderable' => true, 'searchable' => false),
// 	);
// 	switch ($action) {
// 		case 'nav':
// 			$this->output->set_content_type('application/json');
// 			echo $this->m_app->getKaryawanAll($this->input->get('jabatan'));
// 			break;
// 		case 'home':
// 			$data['Judul'] = 'List Karyawan';
// 			$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
// 			$data['end_point'] = '/?jabatan='.$this->input->get('jabatan');
// 			$this->load->view('LOV', $data);
// 			break;
// 	}
//   }

// 	function getKaryawanList($action = "home") {
// 		$data['ColHeader'] = array('Kode Karyawan', 'Nama Karyawan', 'Jabatan', 'Lokasi', 'Divisi','Tanggal Masuk');
// 		$data['ColShow'] = array(1, 1, 1, 1, 1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'employee_id'),
// 			array('data' => 'employee_name'),
// 			array('data' => 'jabatan_name'),
// 			array('data' => 'store_name'),
// 			array('data' => 'divisi_name'),
// 			array('data' => 'join_date'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 2, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 3, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 4, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 5, 'orderable' => true, 'searchable' => false),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getKaryawanList();
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'List Karyawan';
// 				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
// 				$data['end_point'] = '';
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}

// 	function getBawahanList($action = "home") {
// 		$data['ColHeader'] = array('Kode Karyawan', 'Nama Karyawan', 'Jabatan', 'Lokasi', 'Divisi','Tanggal Masuk');
// 		$data['ColShow'] = array(1, 1, 1, 1, 1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'employee_id'),
// 			array('data' => 'employee_name'),
// 			array('data' => 'jabatan_name'),
// 			array('data' => 'store_name'),
// 			array('data' => 'divisi_name'),
// 			array('data' => 'join_date'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 2, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 3, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 4, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 5, 'orderable' => true, 'searchable' => false),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getBawahanList();
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'List Karyawan';
// 				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
// 				$data['end_point'] = '';
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}

// 	function getAtasanList($action = "home", $divisi="", $level="") {
// 		$data['ColHeader'] = array('Kode Karyawan', 'Nama Karyawan', 'Jabatan', 'Divisi');
// 		$data['ColShow'] = array(1, 1, 1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'employee_id'),
// 			array('data' => 'employee_name'),
// 			array('data' => 'jabatan_name'),
// 			array('data' => 'divisi_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 2, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 3, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getAtasanList($divisi,$level);
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'List Atasan';
// 				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
// 				$data['end_point'] = $divisi.'/'.$level;
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}

// 	function getPendidikanList($action = "home") {
// 		$data['ColHeader'] = array('edu_code', 'edu_name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'edu_code'),
// 			array('data' => 'edu_name'),
// 		);
// 		$data['columnDefs'] == array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getPendidikanList();
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'List Pendidikan';
// 				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
// 				$data['end_point'] = '';
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}

// 	function getCountryList($action = "home") {
// 		$data['ColHeader'] = array('Country ID', 'Country Name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'country_id'),
// 			array('data' => 'country_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getCountryList();
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'Country List';
// 				$data['src_url'] = base_url().'setting/store/getCountryList/';
// 				$data['end_point'] = '';
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}
	
// 	function getProvinceList($action = "home", $idcountry='') {
// 		$data['ColHeader'] = array('Province ID', 'Province Name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'prov_id'),
// 			array('data' => 'prov_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getProvinceList($idcountry);
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'Province List';
// 				$data['src_url'] = base_url().'setting/store/getProvinceList/';
// 				$data['end_point'] = $idcountry;
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}
	
// 	function getCityList($action = "home", $idprov='') {
// 		$data['ColHeader'] = array('City ID', 'City Name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'city_id'),
// 			array('data' => 'city_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getCityList($idprov);
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'City List';
// 				$data['src_url'] = base_url().'setting/store/getCityList/';
// 				$data['end_point'] = $idprov;
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}
	
// 	function getKecList($action = "home", $idcity='') {
// 		$data['ColHeader'] = array('Districts ID', 'Districts Name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'kec_id'),
// 			array('data' => 'kec_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getKecList($idcity);
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'Districts List';
// 				$data['src_url'] = base_url().'setting/store/getKecList/';
// 				$data['end_point'] = $idcity;
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}
	
// 	function getKelList($action = "home", $idkec='') {
// 		$data['ColHeader'] = array('Villages ID', 'Villages Name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'kel_id'),
// 			array('data' => 'kel_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getKelList($idkec);
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'Villages List';
// 				$data['src_url'] = base_url().'setting/store/getKelList/';
// 				$data['end_point'] = $idkec;
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
// 	}

// 	function getStoreList($action = "home") {
// 		$data['ColHeader'] = array('Store ID', 'Store Name');
// 		$data['ColShow'] = array(1, 1);
// 		$data['columns'] = array(
// 			array('data' => 'store_id'),
// 			array('data' => 'store_name'),
// 		);
// 		$data['columnDefs'] = array(
// 			array('targets' => 0, 'orderable' => true, 'searchable' => true),
// 			array('targets' => 1, 'orderable' => true, 'searchable' => true),
// 		);
// 		switch ($action) {
// 			case 'nav':
// 				$this->output->set_content_type('application/json');
// 				echo $this->m_app->getStoreList();
// 				break;
// 			case 'home':
// 				$data['Judul'] = 'Store List';
// 				$data['src_url'] = base_url().'administrasi/store/getStoreList/';
// 				$data['end_point'] = '';
// 				$this->load->view('LOV', $data);
// 				break;
// 		}
	// }

}