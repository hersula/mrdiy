<?php

require_once APPPATH . '/third_party/tcpdf/tcpdf.php';

class PDFReport extends TCPDF {

    var $RepFuncHeader;
    var $dataHeader;
    var $RepFuncFooter;
    var $dataFooter;

    function __construct() {
        // parent::__construct();
    }

    function _construct($orientation = 'P', $unit = 'mm', $format = 'A4', $unicode = true, $encoding = 'UTF-8', $diskcache = false, $pdfa = false) {
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

    function LapDaftarModules($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Modules', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(60, 5, " Module ID", 1, 0, 'L');
        $this->Cell(100, 5, " Module Name", 1, 0, 'L');
        $this->Cell(25, 5, " Status", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapDaftarRoles($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Roles', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(30, 5, " Role ID", 1, 0, 'L');
        $this->Cell(40, 5, " Role Name", 1, 0, 'L');
        $this->Cell(50, 5, " Deskripsi", 1, 0, 'L');
        $this->Cell(30, 5, " Def. Menu ID", 1, 0, 'L');
        $this->Cell(30, 5, " Def. Menu Name", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapDaftarUser($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar User', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(30, 5, " User ID", 1, 0, 'L');
        $this->Cell(60, 5, " Name", 1, 0, 'L');
        $this->Cell(30, 5, " Role ID", 1, 0, 'L');
        $this->Cell(50, 5, " Role Name", 1, 0, 'L');
        $this->Cell(20, 5, " Status", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapMenuPerRoles($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Laporan Menu Per Roles', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(30, 5, " Menu ID", 1, 0, 'L');
        $this->Cell(50, 5, " Menu Name", 1, 0, 'L');
        $this->Cell(15, 5, "Access", 1, 0, 'C');
        $this->Cell(15, 5, "Create", 1, 0, 'C');
        $this->Cell(15, 5, "Edit", 1, 0, 'C');
        $this->Cell(15, 5, "Delete", 1, 0, 'C');
        $this->Cell(15, 5, "Print", 1, 0, 'C');
        $this->Cell(15, 5, "PDF", 1, 0, 'C');
        $this->Cell(15, 5, "XLS", 1, 0, 'C');
        $this->Cell(15, 5, "Confirm", 1, 0, 'C');
        $this->Cell(15, 5, "Cancel", 1, 0, 'C');
        $this->Ln(5);
    }

    function LapDaftarRegional($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Regional', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(30, 5, " Regional ID", 1, 0, 'L');
        $this->Cell(60, 5, " Regional Name", 1, 0, 'L');
        $this->Cell(50, 5, " PIC", 1, 0, 'L');
        $this->Cell(25, 5, " Status", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapDaftarArea($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Area', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(20, 5, " Regional ID", 1, 0, 'L');
        $this->Cell(30, 5, " Regional Name", 1, 0, 'L');
        $this->Cell(20, 5, " Area ID", 1, 0, 'L');
        $this->Cell(30, 5, " Area Name", 1, 0, 'L');
        $this->Cell(40, 5, " PIC", 1, 0, 'L');
        $this->Cell(25, 5, " Status", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapDaftarWilayah($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Wilayah', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(20, 5, " Regional ID", 1, 0, 'L');
        $this->Cell(30, 5, " Regional Name", 1, 0, 'L');
        $this->Cell(20, 5, " Area ID", 1, 0, 'L');
        $this->Cell(30, 5, " Area Name", 1, 0, 'L');
        $this->Cell(20, 5, " Wilayah ID", 1, 0, 'L');
        $this->Cell(50, 5, " Wilayah Name", 1, 0, 'L');
        $this->Cell(40, 5, " PIC", 1, 0, 'L');
        $this->Cell(25, 5, " Status", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapDaftarStore($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Store', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(15, 5, " Store ID", 1, 0, 'L');
        $this->Cell(20, 5, " Store Name", 1, 0, 'L');
        $this->Cell(30, 5, " Provinsi", 1, 0, 'L');
        $this->Cell(40, 5, " Kota", 1, 0, 'L');
        $this->Cell(10, 5, " Grade", 1, 0, 'C');
        $this->Cell(20, 5, " Tanggal GO", 1, 0, 'C');
        $this->Cell(50, 5, " SM", 1, 0, 'L');
        $this->Cell(15, 5, " Status", 1, 0, 'L');
        $this->Ln(5);
    }

    function LapDaftarDept($data) {
        $this->SetFont('helvetica', 'B', 14);
        $this->Cell(0, 5, 'Daftar Dept', 0, 0, 'L');
        $this->Ln(20);

        $this->SetFont('helvetica', 'B', 8);
        $this->Cell(50, 5, " Dept ID", 1, 0, 'L');
        $this->Cell(100, 5, " Dept Code", 1, 0, 'L');
        $this->Cell(100, 5, " Dept Name", 1, 0, 'L');
        $this->Cell(25, 5, " Status", 1, 0, 'L');
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
        $this->SetFont('helvetica', 'I', 8);
        // Page number
        $width = $this->w / 3;
        #$this->Cell($width,10,'Waktu Cetak : '.date("d M Y H:i:s"),0,0,'L');
        $this->Cell($width, 10, 'Waktu Cetak : ' . date("d M Y H:i:s") . ', Cetak Oleh : ' . $data['printed_by'], 0, 0, 'L');
        $this->Cell(0, 10, 'Halaman ' . $this->getAliasNumPage() . '/' . $this->getAliasNbPages(), 0, 0, 'R');
    }

    /*******************************************************************************
 *                               END FOOTER                                     *
 *******************************************************************************/
}

?>