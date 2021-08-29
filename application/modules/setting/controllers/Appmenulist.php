<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Appmenulist extends Core_Controller {
	
	function __construct(){
		parent::__construct("appmenulist"); # parsing menu_id
		$this->load->model("Appmenulist_Model", "m_app");
	}
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/

	function index() {
		$this->load->view('Appmenulist', $this->data);
	}
	
	function getList() {
		$filter = array(
			'a.active' => $this->input->post("active", TRUE),
			'a.module_id' => $this->input->post("module_id", TRUE),
			'a.parent_menu_id' => $this->input->post("parent_menu_id", TRUE),
		);
		
		$this->output->set_content_type('application/json');
		echo $this->m_app->getList($filter);
	}

	function create() {
		$this->load->view('Appmenulist_Form', $this->data);
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
			$this->load->view('Appmenulist_Form', $this->data);
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
		$JudulLaporan = "Laporan Daftar Menu";
		# Load library
		$this->load->library('PDFReport');
		$pdf = new PDFReport();
		# Ukuran kertas
		$pdf->_construct('L', 'mm', 'A4', true, 'UTF-8', false); # A4
		// $pdf->_construct('L', 'mm', array(210, 350), true, 'UTF-8', false); # Custom
		# START deklarasi header
		unset($dataHeader);
		$dataHeader = array();
		$pdf->dataHeader = $dataHeader;
		$pdf->RepFuncHeader = "LapDaftarMenuList";
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
			'a.active' => $this->input->post("active", TRUE),
			'a.module_id' => $this->input->post("module_id", TRUE),
			'a.parent_menu_id' => $this->input->post("parent_menu_id", TRUE),
		);
		$data = $this->m_app->getDataList($filter);
		$pdf->AddPage();
		
		$pdf->SetFont('helvetica','',8);
		$pdf->SetFont('helvetica','',8);
		if ($data->result() != NULL) {
			foreach($data->result() as $key => $val) {
				$pdf->Cell(20, 5, $val->module_id, 1, 0, 'L');
				$pdf->Cell(30, 5, $val->module_name, 1, 0, 'L');
				$pdf->Cell(20, 5, $val->parent_menu_id, 1, 0, 'L');
				$pdf->Cell(30, 5, $val->parent_menu_name, 1, 0, 'L');
				$pdf->Cell(20, 5, $val->menu_id, 1, 0, 'L');
				$pdf->Cell(30, 5, $val->menu_name, 1, 0, 'L');
				$pdf->Cell(50, 5, $val->menu_desc, 1, 0, 'L');
				$pdf->Cell(30, 5, $val->menu_icon, 1, 0, 'L');
				$pdf->Cell(20, 5, $val->menu_ctl, 1, 0, 'L');
				$pdf->Cell(20, 5, $val->menu_ctl_def, 1, 0, 'L');
				$pdf->Cell(10, 5, $val->sort_id, 1, 0, 'L');
				$pdf->Cell(10, 5, $val->active, 1, 0, 'L');
			  	$pdf->Ln(5);
			}
		} else {
			$pdf->Cell(0,5,"Data tidak ditemukan.",1,0,'C');
		}
		# Keluarkan Output
		$pdf->Output($JudulLaporan.'_'.date('YmdHis').'.pdf', 'I');
	}
	
	function xls() {
		$filter = array(
			'a.active' => $this->input->post("active", TRUE),
			'a.module_id' => $this->input->post("module_id", TRUE),
			'a.parent_menu_id' => $this->input->post("parent_menu_id", TRUE),
		);
		
		# Judul laporan
		$JudulLaporan = "Laporan Daftar Menu";
		# Ambil data
		$rs = $this->m_app->getDataList($filter);
		# Deklarasi kolom yang akan ditampilkan
		$Col['header'] = array('id', 'Module ID', 'Module Name', 'P. Menu ID', 'P. Menu Name', 'Menu ID', 'Menu Name', 'Menu Desc', 'Menu Icon', 'Controller', 'Ctl. Def. Func', 'Sort', 'Status');
		$Col['type'] = array('number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'number', 'string');
		$Col['align'] = array('left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'center', 'center' );
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

  	function getMenuList($action = "home") {
		$data['ColHeader'] = array('Menu ID', 'Menu Name');
		$data['ColShow'] = array(1, 1);
		$data['columns'] = array(
			array('data' => 'menu_id'),
			array('data' => 'menu_name'),
		);
		$data['columnDefs'] = array(
			array('targets' => 0, 'orderable' => true, 'searchable' => true),
			array('targets' => 1, 'orderable' => true, 'searchable' => true),
		);
		switch ($action) {
			case 'nav':
				$this->output->set_content_type('application/json');
				echo $this->m_app->getMenuList();
				break;
			case 'home':
				$data['Judul'] = 'Menu List';
				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/getMenuList';
				$data['end_point'] = '';
				$this->load->view('LOV', $data);
				break;
		}
	}
	
	function getListSelect2($format = 'json') {
		# START Check input, jika tidak ada input atau kosong maka tidak di lanjutkan
		$raw = $this->security->xss_clean($this->input->raw_input_stream);
		$input = $this->input($format, $raw);
		// echo "<pre>"; print_r($input); echo "</pre><br/>";
		
		$hasil = $this->m_app->getListSelect2($input);
		echo $this->output($format, $hasil);
	}

}