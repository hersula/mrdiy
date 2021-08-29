<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Location extends Core_Controller {
	
	function __construct(){
		parent::__construct('location');
		$this->load->model("Location_Model", "m_app");
	}

	function index() {
		$this->Main();
	}

	function Main() {
		$this->data['action'] = 'create';
		$this->load->view('Location', $this->data);
	}
	function getList() {
		$filter = array();
		
		$this->output->set_content_type('application/json');
		echo $this->m_app->getList($filter);
	}
	public function getAreaList($action = "home"){
		$data['ColHeader'] = array('Area ID','Area Name');
		$data['ColShow'] = array(1, 1);
		$data['columns'] = array(
			array('data' => 'area_id'),				
			array('data' => 'area_name'),
		);
		$data['columnDefs'] = array(
			array('targets' => 0, 'orderable' => false, 'searchable' => false),
			array('targets' => 1, 'orderable' => true, 'searchable' => true),
			
		);
		switch ($action) {
			case 'nav':
				$this->output->set_content_type('application/json');
				echo $this->m_app->getAreaList();
				break;
			case 'home':
				$data['Judul'] = 'Area List';
				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
				$data['end_point'] = '';
				$this->load->view('LOVArea', $data);
				break;
		}
	}
	public function getStoreList($action = "home"){
		$data['ColHeader'] = array('Store ID','Store Name');
		$data['ColShow'] = array(1, 1);
		$data['columns'] = array(
			array('data' => 'store_id'),				
			array('data' => 'store_name'),
		);
		$data['columnDefs'] = array(
			array('targets' => 0, 'orderable' => false, 'searchable' => false),
			array('targets' => 1, 'orderable' => true, 'searchable' => true),
			
		);
		switch ($action) {
			case 'nav':
				$this->output->set_content_type('application/json');
				echo $this->m_app->getStoreList($this->session->userdata("user_id"));
				break;
			case 'home':
				$data['Judul'] = 'Store List';
				$data['src_url'] = base_url().$this->data['modules'].'/'.$this->data['controller'].'/'.$this->data['action'];
				$data['end_point'] = '';
				$this->load->view('LOV', $data);
				break;
		}
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
		$JudulLaporan = "List Location";
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
		$pdf->RepFuncHeader = "ListLocation";
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
		$pdf->SetAuthor('IOS');
		$pdf->SetDisplayMode('fullwidth', 'continuous');
		# Ambil data
		$filter = array();
		$data = $this->m_app->getDataList($filter);
		$pdf->AddPage();
		
		$pdf->SetFont('helvetica','',8);
		if ($data->result() != NULL) {
			foreach($data->result() as $key => $val) {
				$pdf->Cell(25,5,$val->location_id,1,0,'L');
			  	$pdf->Cell(25,5,$val->store_name,1,0,'L');
				$pdf->Cell(25,5,$val->loc_id,1,0,'L');
				$pdf->Cell(25,5,$val->loc_name,1,0,'L');
				$pdf->Cell(25,5,$val->area_name,1,0,'L');
			  	$pdf->Ln(5);
			}
		} else {
			$pdf->Cell(0,5,"Data tidak ditemukan.",1,0,'C');
		}
		# Keluarkan Output
		$pdf->Output($JudulLaporan.'_'.date('YmdHis').'.pdf', 'I');
	}
	
	function xls() {
		header("Content-type: application/vnd-ms-excel");
		header("Content-Disposition: attachment; filename=List Location.xls");
		$JudulLaporan = "List Location";
		# Ambil data
		$filter = array(
		);
		$rs = $this->m_app->getDataList($filter);
		$html = '<table border="1">
					<tr>
		                <td>Number</td>
		                <td>Store Name</td>
		                <td>Location ID</td>
		                <td>Location Name</td>
		                <td>Area Name</td>
		            </tr>';
		foreach ($rs->result() as $dat) {
			$html .= "
				
					<tr>
		                <td>".$dat->location_id."</td>
		                <td>".$dat->store_name."</td>
		                <td>".$dat->loc_id."</td>
		                <td>".$dat->loc_name."</td>
		                <td>".$dat->area_name."</td>
		            </tr>";
		}
		$html .= "</table>";
		echo $html;
		
		# Deklarasi kolom yang akan ditampilkan
		// $Col['header'] = array('Location ID', 'Store Name', 'Location Name', 'Area Name');
		// $Col['type'] = array('string', 'string', 'string', 'string');
		// $Col['align'] = array('cemter', 'center', 'center', 'center');
		// # Load library
		// $this->load->library('XLSReport');
		// $xls = new XLSReport();
		// # Jika jumlah rows lebih dari 1.000.000 download ke CSV, jika bukan ke XLSX
		// if ($rs->num_rows() >= 1000000) {
		// 	$xls->generateCSVByQueryObj($rs, $JudulLaporan, ";");
		// } else {
		// 	$xls->generateXlsByQueryObj($rs, $Col, $JudulLaporan);
		// }

	}
}
