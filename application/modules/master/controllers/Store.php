<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Store extends Core_Controller {
	
	function __construct(){
		parent::__construct("store"); # parsing menu_id
		$this->load->model("Store_Model", "m_app");
	}
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/

	function index() {
		$this->data['action'] = 'create';
		$this->load->view('Store', $this->data);
	}
	
	function getList() {
		$filter = array(
			'a.status' => $this->input->post("status", TRUE),
		);
		
		$this->output->set_content_type('application/json');
		echo $this->m_app->getList($filter);
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
		$JudulLaporan = "Master Store";
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
		$pdf->RepFuncHeader = "Store";
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
			'a.status' => $this->input->post("status", TRUE),
		);
		$data = $this->m_app->getDataList($filter);
		$pdf->AddPage();
		
		$pdf->SetFont('helvetica','',8);
		if ($data->result() != NULL) {
			foreach($data->result() as $key => $val) {
				$pdf->Cell(50,5,$val->kd_store,1,0,'L');
			  	$pdf->Cell(80,5,$val->nm_store,1,0,'L');
				$pdf->Cell(25,5,$val->status,1,0,'L');
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
		$JudulLaporan = "Master Store";
		# Ambil data
		$filter = array(
			'a.status' => $this->input->post("status", TRUE),
		);
		$rs = $this->m_app->getDataList($filter);
		# Deklarasi kolom yang akan ditampilkan
		$Col['header'] = array('Store Code', 'Store Name',  'Status');
		$Col['type'] = array('string', 'string', 'string');
		$Col['align'] = array('left', 'left', 'center');
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
	
	function getStoreList($action = "home") {
		$data['ColHeader'] = array('Store Code', 'Store Name');
		$data['ColShow'] = array(1, 1);
		$data['columns'] = array(
			array('data' => 'm_code'),
			array('data' => 'm_shortdesc'),
		);
		$data['columnDefs'] = array(
			array('targets' => 0, 'orderable' => false, 'searchable' => true),
			array('targets' => 1, 'orderable' => true, 'searchable' => true),
		);
		switch ($action) {
			case 'nav':
				$this->output->set_content_type('application/json');
				echo $this->m_app->getStoreList();
				break;
			case 'home':
				$data['Judul'] = 'Store List';
				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
				$data['end_point'] = '';
				$this->load->view('LOV', $data);
				break;
		}
	}

	// function getDivisiSelect2($format = 'json') {
	// 	# START Check input, jika tidak ada input atau kosong maka tidak di lanjutkan
	// 	$raw = $this->security->xss_clean($this->input->raw_input_stream);
	// 	$input = $this->input($format, $raw);
		
	// 	$hasil = $this->m_app->getDivisiSelect2($input);
	// 	echo $this->output($format, $hasil);
	// }

}