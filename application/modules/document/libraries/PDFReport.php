<?php

require_once(APPPATH . '/third_party/tcpdf/tcpdf.php');

class PDFReport extends TCPDF {

    var $RepFuncHeader;
    var $dataHeader;
    var $RepFuncFooter;
    var $dataFooter;
	
    function __construct() {
        // parent::__construct();
    }

    function _construct($orientation='P', $unit='mm', $format='A4', $unicode=true, $encoding='UTF-8', $diskcache=false, $pdfa=false) {
        parent::__construct($orientation, $unit, $format, $unicode, $encoding, $diskcache, $pdfa);
    }

    /*******************************************************************************
    *                               START HEADER                                   *
    *******************************************************************************/

    function Header() {
        $this->SetY(3); // agar header tidak terlalu rapat dengan ujung kertas

        // To be implemented in your own inherited class
        if ($this->RepFuncHeader != "") {
            call_user_func(array($this, $this->RepFuncHeader), $this->dataHeader); # Call function with parameters
        } else {
            call_user_func(array($this, 'DefaultHeader'), $this->dataHeader); # Call function with parameters
        }
    }

    function DefaultHeader($data) {
        // x
    }
	 
	function DaftarInfo($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Info Publik',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Info ID",1,0,'L');
      $this->Cell(100,5," Info Name",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	 
	 function PriceGrade($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Price Grade',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Price Grade Code",1,0,'L');
      $this->Cell(80,5," Price Grade Name",1,0,'L');
		$this->Cell(20,5,"Margin (%) ",1,0,'R');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	function DaftarBuyer($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Buyer',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Kode Buyer",1,0,'L');
      $this->Cell(100,5," Nama Buyer",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	
	function DaftarSize($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Size',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Kode Ukuran",1,0,'L');
      $this->Cell(100,5," Nama Ukuran",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	 function DaftarDept($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Dept',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(25,5," Dept ID",1,0,'L');
      $this->Cell(25,5," Dept Code",1,0,'L');
      $this->Cell(100,5," Dept Name",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	
	function DaftarMerk($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Size',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Kode Merk",1,0,'L');
      $this->Cell(100,5," Nama Merk",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	
	function DaftarColor($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Size',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Kode Warna",1,0,'L');
      $this->Cell(100,5," Nama Warna",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	function DaftarMclass($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Size',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(25,5," Kode MClass",1,0,'L');
      $this->Cell(75,5," Nama MClass",1,0,'L');
	  $this->Cell(75,5," Department",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }
	
	function DaftarSupplierwilayah($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Wilayah Supplier',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(50,5," Kode Wilayah",1,0,'L');
      $this->Cell(100,5," Nama Wilayah",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }

    function LapDaftarKaryawan($data) {
      $this->SetFont('helvetica','B',14);
      $this->Cell(0,5,'Daftar Karyawan',0,0,'L');
      $this->Ln(20);

      $this->SetFont('helvetica','B',8);
      $this->Cell(30,5," Kode Karyawan",1,0,'L');
      $this->Cell(90,5," Nama Karyawan",1,0,'L');
      $this->Cell(50,5," Jabatan",1,0,'L');
      $this->Cell(25,5," Status",1,0,'L');
      $this->Ln(5);
    }

    function KPI($data) {
        $this->SetFont('helvetica','B',14);
        $this->Cell(0,5,'Daftar KPI',0,0,'L');
        $this->Ln(20);

        $this->SetFont('helvetica','B',8);
        $this->Cell(15,5," Periode",1,0,'L');
        $this->Cell(25,5," NIK Karyawan",1,0,'L');
        $this->Cell(40,5," Nama Karyawan",1,0,'L');
        $this->Cell(40,5," Jabatan",1,0,'L');
        $this->Cell(15,5," Divisi",1,0,'L');
        $this->Cell(15,5," Lokasi",1,0,'L');
        $this->Cell(25,5," Total Nilai",1,0,'L');
        $this->Cell(10,5," Nilai",1,0,'L');
        $this->Cell(35,5," Atasan / Penilai",1,0,'L');
        $this->Cell(25,5," Status",1,0,'L');
        $this->Ln(5);

        
    }
	

    /*******************************************************************************
    *                               END HEADER                                     *
    *******************************************************************************/

    /*******************************************************************************
    *                               START FOOTER                                   *
    *******************************************************************************/

    function Footer() {
        // To be implemented in your own inherited class
        if ($this->RepFuncFooter != "") {
            call_user_func(array($this, $this->RepFuncFooter), $this->dataFooter); # Call function with parameters
        } else {
            call_user_func(array($this, 'DefaultFooter'), $this->dataFooter); # Call function with parameters
        }
    }
	 
    function DefaultFooter($data) {
        $this->SetY(-15);
        // helvetica italic 8
        $this->SetFont('helvetica','I',8);
        // Page number
        $width = $this->w/3;
        #$this->Cell($width,10,'Waktu Cetak : '.date("d M Y H:i:s"),0,0,'L');
		  $this->Cell($width,10,'Waktu Cetak : '.date("d M Y H:i:s").', Cetak Oleh : '.$data['printed_by'],0,0,'L');
        $this->Cell(0,10,'Halaman '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(),0,0,'R');
    }


    /*******************************************************************************
    *                               END FOOTER                                     *
    *******************************************************************************/
}

?>