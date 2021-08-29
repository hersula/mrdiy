<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class XLSReport {
	
	function __construct(){
		// __construct
	}
	
	function generateCSVByQueryObj($rs, $judul, $delimiterParam = ";") {
		# Deklarasi untuk mengambil utilitas
		$CI = &get_instance();
		$CI->load->helper('download');
		$CI->load->dbutil();
		# Deklarasi konten CSV
		$delimiter = $delimiterParam;
		$newline = "\r\n";
		$enclosure = '"';
		$konten_csv = $CI->dbutil->csv_from_result($rs, $delimiter, $newline, $enclosure);
		# Download file CSV
		force_download($judul."_".date('YmdHis').".csv", $konten_csv);
	}
	
	function generateXlsByQueryObj($rs, $columns, $judul) {
		# Deklarasi untuk membuat excel dan judul sheet
		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();
		$sheet->setTitle($judul);
		
		# Judul Laporan
		$sheet->setCellValueByColumnAndRow(1, 1, $judul);
		$sheet->getCellByColumnAndRow(1, 1)->getStyle()->getFont()->setSize(12)->setBold(true);
		$sheet->mergeCellsByColumnAndRow(1, 1, 2, 1);
		
		$lastRow = 4;
		$lastCol = 4;
		
		# Looping kolom header
		foreach($rs->list_fields() as $key => $val) {
			$sheet->setCellValueByColumnAndRow($lastCol, $lastRow, trim($columns['header'][$key]) != '' ? $columns['header'][$key] : $val);
			$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->applyFromArray($this->StyleHeader($columns['align'][$key]));
			$lastCol++;
		}
		$colString = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastCol);
      	$sheet->getColumnDimension('A:'.$colString)->setAutoSize(true);
		
		$lastCol = 1;
		$lastRow++;

		# Ambil data
		$col_idx = 0;
		if ($rs->result() != NULL) {
			foreach($rs->result_array() as $key => $row) {
				$col_idx = 0; $lastCol = 1;
				foreach($row as $key_val => $val) {
					if ($columns['type'][$col_idx] == 'string') {
						$colString = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastCol);
						$sheet->setCellValueExplicit($colString.$lastRow, $val, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
						#$sheet->setCellValueByColumnAndRow($lastCol, $lastRow, $val);
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->applyFromArray($this->getStyle(false, false, $columns['align'][$col_idx]));
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
						$sheet->getColumnDimension($colString)->setAutoSize(true);
					} else if ($columns['type'][$col_idx] == 'date') {
						$sheet->setCellValueByColumnAndRow($lastCol, $lastRow, \PhpOffice\PhpSpreadsheet\Shared\Date::PHPToExcel(strtotime($val)));
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->applyFromArray($this->getStyle(false, false, $columns['align'][$col_idx]));
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->getNumberFormat()->setFormatCode("dd/mm/yyyy");
						$colString = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastCol);
						$sheet->getColumnDimension($colString)->setAutoSize(true);
					} else if ($columns['type'][$col_idx] == 'datetime') {
						$sheet->setCellValueByColumnAndRow($lastCol, $lastRow, \PhpOffice\PhpSpreadsheet\Shared\Date::PHPToExcel(strtotime($val)));
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->applyFromArray($this->getStyle(false, false, $columns['align'][$col_idx]));
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->getNumberFormat()->setFormatCode("dd/mm/yyyy hh:mm:ss");
						$colString = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastCol);
						$sheet->getColumnDimension($colString)->setAutoSize(true);
					} else if ($columns['type'][$col_idx] == 'money') {
						$sheet->setCellValueByColumnAndRow($lastCol, $lastRow, $val);
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->applyFromArray($this->getStyle(false, false, $columns['align'][$col_idx]));
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->getNumberFormat()->setFormatCode("#,#0");
						$colString = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastCol);
						$sheet->getColumnDimension($colString)->setAutoSize(true);
					} else {
						$sheet->setCellValueByColumnAndRow($lastCol, $lastRow, $val);
						$sheet->getCellByColumnAndRow($lastCol, $lastRow)->getStyle()->applyFromArray($this->getStyle(false, false, $columns['align'][$col_idx]));
						$colString = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($lastCol);
						$sheet->getColumnDimension($colString)->setAutoSize(true);
					}
					
					# Go to next column
					$col_idx++;
					$lastCol++;
				}
				# Go to next row
				$lastRow++;
			}
		} else {
			$sheet->setCellValue('A'.$lastRow, 'Data tidak ditemukan.');
			$sheet->mergeCells('A'.$lastRow.':'.$colString.$lastRow);
			$sheet->getStyle('A'.$lastRow.':'.$colString.$lastRow)->applyFromArray($this->StyleHeader('center'));
		}

		$filename = $judul.'_'.date('YmdHis');
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename="'. $filename .'.xlsx"'); 
		header('Cache-Control: max-age=0');
		$writer = new Xlsx($spreadsheet);
		ob_end_clean();
		$writer->save('php://output'); // download file 
	}
	
	function StyleHeader($align = 'left') {
		$styleArray = [
			'font' => [
				'bold' => true,
			],
			'alignment' => [
				'horizontal' => $align == 'right' ? \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT : $align == 'center' ? \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER : null,
				'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
			],
			'borders' => [
				'top' => [
					'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
				],
				'bottom' => [
					'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
				],
				'left' => [
					'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
				],
				'right' => [
					'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
				],
			],
		];
	
		return $styleArray;
	}
	
	function getStyle($middle = false, $bold = true, $align = 'left') {
		$styleArray = [];
		if ($middle) {
			$styleArray = [
				'font' => [
					'bold' => $bold,
				],
				'alignment' => [
					'horizontal' => $align === 'right' ? \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT : $align === 'center' ? \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER : null,
					'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
				],
				'borders' => [
					'top' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
					],
					'bottom' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
					],
				],
			];
		} else {
			$styleArray = [
				'font' => [
					'bold' => $bold,
				],
				'alignment' => [
					'horizontal' => $align === 'right' ? \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_RIGHT : $align === 'center' ? \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER : null,
					'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
				],
				'borders' => [
					'top' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
					],
					'bottom' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
					],
					'left' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
					],
					'right' => [
						'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
					],
				],
			];
		}
	
		return $styleArray;
	}
}