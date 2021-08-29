<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usersb2b extends Core_Controller {
	
	function __construct(){
		parent::__construct("usersb2b"); # parsing menu_id
		$this->load->model("Usersb2b_Model", "m_app");
	}
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/

	function index() {
		$this->load->view('Usersb2b', $this->data);
	}
	
	function getList() {
		$filter = array(
			'a.status' => $this->input->post("status", TRUE)
		);
		
		$this->output->set_content_type('application/json');
		echo $this->m_app->getList($filter);
	}
	
	function create() {
		$this->load->view('Usersb2b_Form', $this->data);
	}
	
	function save($format = 'json') {
		# START Check input, jika tidak ada input atau kosong maka tidak di lanjutkan
		$raw = $this->security->xss_clean($this->input->raw_input_stream);
		$input = $this->input($format, $raw);
		
		if ($input != NULL || trim($input) == '' || !empty($input)) {
			$hasil = $this->m_app->save($input);
		} else {
			$hasil = array('result' => false, 'msg' => 'Data kosong.', 'data' => NULL);
		}
		
		echo $this->output($format, $hasil);
	}
	
	function edit($id = NULL) {
		if ($id == NULL || trim($id) == '' || empty($id)) {
			show_404();
		} else {
			$this->data['id'] = $id;
			$this->load->view('Usersb2b_Form', $this->data);
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
		$JudulLaporan = "Laporan Daftar User B2B";
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
		$pdf->RepFuncHeader = "LapDaftarUser";
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
		$pdf->SetAuthor('The AdaMz');
		$pdf->SetDisplayMode('fullwidth', 'continuous');
		# Ambil data
		$filter = array(
			'a.status' => $this->input->post("status", TRUE)
		);
		$data = $this->m_app->getDataList($filter);
		$pdf->AddPage();
		
		$pdf->SetFont('helvetica','',8);
		$pdf->SetFont('helvetica','',8);
		if ($data->result() != NULL) {
			foreach($data->result() as $key => $val) {
				$pdf->Cell(30,5,$val->user_id,1,0,'L');
			  	$pdf->Cell(60,5,$val->name,1,0,'L');
			  	$pdf->Cell(30,5,$val->role_id,1,0,'L');
				$pdf->Cell(50,5,$val->role_name,1,0,'L');
			  	$pdf->Cell(20,5,$val->status ? 'Aktif' : 'Tidak Aktif',1,0,'L');
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
		$JudulLaporan = "Laporan Daftar User B2B";
		# Ambil data
		$filter = array(
			'a.status' => $this->input->post("status", TRUE)
		);
		$rs = $this->m_app->getDataList($filter);
		# Deklarasi kolom yang akan ditampilkan
		$Col['header'] = array('User ID', 'Supplier', 'Role ID', 'Role Name', 'Status');
		$Col['type'] = array('string', 'string', 'string', 'string', 'string');
		$Col['align'] = array('left', 'left', 'left', 'left', 'center');
		# Load library
		$this->load->library('XLSReport');
		$xls = new XLSReport();
		# Jika jumlah rows lebih dari 1.000.000 download ke CSV, jika bukan ke XLSX
		if ($rs->num_rows() >= 1000000) {
			$xls->generateCSVByQueryObj($rs, $JudulLaporan, ";");
		} else {
			$xls->generateXlsByQueryObj($rs, $Col, $JudulLaporan);
		}
	}
	
	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	
	function getRole($action = "home") {
		$data['ColHeader'] = array('Role ID', 'Role Name', 'Deskripsi');
		$data['ColShow'] = array(1, 1, 1);
		$data['columns'] = array(
			array('data' => 'role_id'),
			array('data' => 'role_name'),
			array('data' => 'desc'),
		);
		$data['columnDefs'] = array(
			array('targets' => 0, 'orderable' => true, 'searchable' => true),
			array('targets' => 1, 'orderable' => true, 'searchable' => true),
			array('targets' => 3, 'orderable' => true, 'searchable' => true),
		);
		switch ($action) {
			case 'nav':
				$this->output->set_content_type('application/json');
				echo $this->m_app->getRoleList();
				break;
			case 'home':
				$data['Judul'] = 'Role List';
				$data['src_url'] = base_url().'setting/'.$this->data['controller'].'/getRole/';
				$data['end_point'] = '';
				$this->load->view('LOV', $data);
				break;
		}
	}
	
		

}