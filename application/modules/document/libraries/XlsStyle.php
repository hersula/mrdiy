<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

#use PhpOffice\PhpSpreadsheet\Spreadsheet;
#use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class XlsStyle {
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