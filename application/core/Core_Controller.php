<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Core_Controller extends MY_Controller {

	var $ActionList = array('create', 'edit', 'delete', 'print', 'pdf', 'xls', 'confirm', 'cancel');
	var $data = NULL;
	var $CurrMenuID = NULL;
	
	function __construct($menu_id = NULL){
		parent::__construct();
		date_default_timezone_set("Asia/Jakarta");
		ini_set('max_execution_time', 0); 
		#ini_set('memory_limit','4096M');
		$this->load->library('Format');
		$this->CurrMenuID = $menu_id;
		$this->StartUp();
	}
	
	function StartUp() {
		# Cek login
		$this->CheckLogin();
		# Cek hak akses
		$this->CheckHakAkses($this->session->userdata('user_id'), $this->session->userdata('role_id'));
		# Ambil priviledge
		$this->getPriviledge($this->session->userdata('user_id'), $this->session->userdata('role_id'), $this->CurrMenuID);
		# modules
		$this->data['modules'] = $this->uri->segment(1);
		# controller
		$this->data['controller'] = $this->uri->segment(2);
		# action
		$this->data['action'] = $this->uri->segment(3);
	}

	function CheckLogin() {
		if (!$this->session->userdata('login') && $this->uri->segment(1) != "auth" && $this->uri->segment(2) != "login") { 
			redirect("auth/Login");
		} else if ($this->session->userdata('login') && $this->uri->segment(1) == "auth" && $this->uri->segment(2) == "login" ) {
			$this->CurrMenuID = $this->session->userdata('def_menu_id');
			redirect("app#".$this->session->userdata('def_menu_link'));
		}
	}
	
	function CheckHakAkses($UserID, $RoleID) {
		$list = array('index', 'save', 'duplicate', 'update', 'approve', 'reject'); $rep_list = array('read', 'create', 'create', 'edit', 'confirm', 'cancel');
		if (in_array($this->uri->segment(3), $this->ActionList) || in_array($this->uri->segment(3), $list)) {
			$action = in_array($this->uri->segment(3), $list) ? $rep_list[array_search($this->uri->segment(3), $list)] : $this->uri->segment(3);
			if (!$this->Login_Model->CheckGrant($UserID, $RoleID, $this->CurrMenuID, $action)) {
				show_404();
			} else {
				$this->data['action'] = $this->uri->segment(3);
			}
		}
	}
	
	function getPriviledge($UserID, $RoleID, $MenuID) {
		$privs = $this->Login_Model->getPriviledges($UserID, $RoleID, $MenuID);
		$this->data['priv_arr'] = $privs;
		$this->data['priv_html'] = $this->getHtmlButton($privs);
	}
	
	function getHtmlButton($privs) {
		# $html = Desktop, $html_m = Mobile
		$html = '<div class="hidden-xs">'; $html_m = '<div class="visible-xxs visible-xs">'; $html_full = '';
		# create & duplicate
		if ($privs['create_flag']) {
			# create
			$html .= '<a class="btn btn-pretty btn-labeled btn-info btn-sm font-size-sm" id="app_create" onclick="app_create();"> <span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Tambah </a> ';
			$html_m .= '<a class="btn btn-pretty btn-info text-light-light font-size-sm" id="app_create" onclick="app_create();"><i class="glyphicon glyphicon-plus"></i></a> ';
			# duplicate
			$html .= '<a class="btn btn-pretty btn-labeled btn-info btn-sm font-size-sm" id="app_duplicate" name="app_duplicate" onclick="app_duplicate(1,null);"> <span class="btn-label"><i class="glyphicon glyphicon-duplicate"></i></span>Duplicate </a> ';
			$html_m .= '<a class="btn btn-pretty btn-pretty btn-info text-light-light font-size-sm" id="app_duplicate" name="app_duplicate" onclick="app_duplicate(1,null);"><i class="glyphicon glyphicon-duplicate"></i></a> ';
		}
		# edit
		if ($privs['edit_flag']) {
			$html .= '<a class="btn btn-pretty btn-labeled btn-cyan btn-sm font-size-sm" id="app_edit" name="app_edit" onclick="app_edit(1,null);"> <span class="btn-label"><i class="glyphicon glyphicon-pencil"></i></span>Edit </a> ';
			$html_m .= '<a class="btn btn-pretty btn-cyan text-light-light font-size-sm" id="app_edit" name="app_edit" onclick="app_edit(1,null);"><i class="glyphicon glyphicon-pencil"></i></a> ';
		}
		# delete
		if ($privs['delete_flag']) {
			$html .= '<a class="btn btn-pretty btn-labeled btn-warning btn-sm font-size-sm" id="app_delete" name="app_delete" onclick="app_delete(1,null);"> <span class="btn-label"><i class="glyphicon glyphicon-remove"></i></span>Hapus </a> ';
			$html_m .= '<a class="btn btn-pretty btn-pretty btn-warning text-light-light font-size-sm" id="app_delete" name="app_delete" onclick="app_delete(1,null);"><i class="glyphicon glyphicon-remove"></i></a> ';
		}
		# refresh data
		$html .= '<a class="btn btn-pretty btn-labeled btn-primary btn-sm font-size-sm" id="app_refresh" name="app_refresh" onclick="app_refresh();"> <span class="btn-label"><i class="glyphicon glyphicon-refresh"></i></span>Refresh </a> ';
		$html_m .= '<a class="btn btn-pretty btn-primary font-size-sm" id="refresh" name="app_refresh" onclick="app_refresh();"><i class="glyphicon glyphicon-refresh"></i></a> ';
		# Pull right / pemisahan crud
		$html .= '<div class="pull-right">';
		$html_m .= '<div class="pull-right">';
		# print
		if ($privs['print_flag']) {			
			$html .= '<a class="btn btn-pretty btn-labeled btn-cyan btn-sm font-size-sm" id="app_print" name="app_print" onclick="app_print();"> <span class="btn-label"><i class="glyphicon glyphicon-print"></i></span>Print </a> ';
			$html_m .= '<a class="btn btn-pretty btn-cyan text-light-light font-size-sm" id="app_print" name="app_print" onclick="app_print();"><i class="glyphicon glyphicon-print"></i></a> ';
		}
		# pdf
		if ($privs['pdf_flag']) {			
			$html .= '<a class="btn btn-pretty btn-labeled btn-danger btn-sm font-size-sm" id="app_pdf" name="app_pdf" onclick="app_pdf();"> <span class="btn-label"><i class="fa fa-file-pdf-o"></i></span>Pdf </a> ';
			$html_m .= '<a class="btn btn-pretty btn-danger text-light-light font-size-sm" id="app_pdf" name="app_pdf" onclick="app_pdf();"><i class="fa fa-file-pdf-o"></i></a> ';
		}
		# excel
		if ($privs['xls_flag']) {			
			$html .= '<a class="btn btn-pretty btn-labeled btn-light btn-sm font-size-sm" id="app_xls" name="app_xls" onclick="app_xls();"> <span class="btn-label"><i class="fa fa-file-excel-o"></i></span>Excel/CSV </a> ';
			$html_m .= '<a class="btn btn-pretty btn-light text-light-light font-size-sm" id="app_xls" name="app_xls" onclick="app_xls();"><i class="fa fa-file-excel-o"></i></a> ';
		}
		# confirm
		if ($privs['confirm_flag']) {			
			$html .= '<a class="btn btn-pretty btn-labeled btn-success btn-sm font-size-sm" id="app_approve" name="app_approve" onclick="app_approve();"> <span class="btn-label"><i class="glyphicon glyphicon-ok"></i></span>Approve </a> ';
			$html_m .= '<a class="btn btn-pretty btn-success text-light-light font-size-sm" id="app_approve" name="app_approve" onclick="app_approve();"><i class="glyphicon glyphicon-ok"></i></a> ';
		}
		# cancel
		if ($privs['cancel_flag']) {			
			$html .= '<a class="btn btn-pretty btn-labeled btn-inverse btn-sm font-size-sm" id="app_reject" name="app_reject" onclick="app_reject();"> <span class="btn-label"><i class="glyphicon glyphicon-ban-circle"></i></span>Reject </a> ';
			$html_m .= '<a class="btn btn-pretty btn-inverse text-light-light font-size-sm" id="app_reject" name="app_reject" onclick="app_reject();"><i class="glyphicon glyphicon-ban-circle"></i></a> ';
		}
		# ./ Pull right / pemisahan crud
		$html .= '</div>';
		$html_m .= '</div>';
				
		$html_m .= '</div>'; $html .= '</div>';
		return $html_full = $html_m.$html;
	}
	
	function input($format, $data){
		if ($data === "" || $data === NULL || empty($data)) {
			#$data = array('result' => false, 'msg' => 'Input kosong.', 'data' => '');
			#echo $this->format->factory($data,'to_'.$format); exit;
			return NULL;
		} else {
			return $this->format->factory($data,'_from_'.$format);
		}
	}
	
	function output($format, $data, $status_code = 200) {
		$this->output->set_status_header($status_code);
		$this->output->set_content_type('application/'.$format);
		$hasil = $this->format->factory($data,'to_'.$format);
		return $hasil;
		#return str_replace(array('[', ']'), '', $hasil);
	}

	function getParameter($param_id = '', $GetAllParames = false) {
		$this->load->model("Core_Model");
		return $this->Core_Model->getParameter($param_id, $GetAllParames);
	}
	
	function UploadFile($inputName = '', $pathToStoreFile = '', $allowedTypes = 'gif|jpg|png|jpeg|bmp', $oldFileName = '', $maxFileSize = '2048', $encyptFileName = TRUE) {
		# Inisialisasi konfigurasi upload file
		$config['upload_path'] = $pathToStoreFile;
		$config['allowed_types'] = $allowedTypes;
		$config['max_size'] = $maxFileSize; // Satuan dalam KB
		// $config['max_size'] = '50';
		$config['encrypt_name'] = $encyptFileName;
		# Load library
		$this->load->library('upload', $config);
		# Lakukan upload
		if ($this->upload->do_upload($inputName)) {
			# Jika upload sukses maka ambil informasinya
			$info_image = array('upload_data' => $this->upload->data());
			/*
				# Informasi setelah upload
				$info_image = Array
								(
									[upload_data] => Array
										(
												[file_name] => 7694110579cfe2ce4fac6ff12c7af1eb.png
												[file_type] => image/png
												[file_path] => D:/xampp/htdocs/ios/upload/setting/store/
												[full_path] => D:/xampp/htdocs/ios/upload/setting/store/7694110579cfe2ce4fac6ff12c7af1eb.png
												[raw_name] => 7694110579cfe2ce4fac6ff12c7af1eb
												[orig_name] => syncRed.png
												[client_name] => syncRed.png
												[file_ext] => .png
												[file_size] => 112.73
												[is_image] => 1
												[image_width] => 512
												[image_height] => 512
												[image_type] => png
												[image_size_str] => width="512" height="512"
										)
								)
			*/
			# Jika $oldFileName tidak kosong, maka hapus file lama
			if (trim($oldFileName) != '') {
				if (file_exists($pathToStoreFile."/".$oldFileName)) {
					unlink($pathToStoreFile."/".$oldFileName);
				}
			}

			return array('result' => true, 'data' => $info_image, 'msg' => 'File gambar berhasil disimpan.');
		} else {
			if ($this->upload->display_errors() != '<p>You did not select a file to upload.</p>' ) {
				return array('result' => false, 'data' => 'err_upload', 'msg' => $this->upload->display_errors());
			} else {
				return array('result' => false, 'data' => NULL, 'msg' => 'File gambar tidak ada.');
			}
		}

		return array('result' => false, 'data' => NULL, 'msg' => $this->upload->display_errors());
	}

	function CreateThumbnail($pathToStoreFile, $source_image = '', $new_image = '', $oldFileName = '', $create_thumb = FALSE, $maintain_ratio = TRUE, $width = 200, $height = 0, $quality = '100%') {
		$config['image_library'] = 'gd2';
		$config['source_image'] = $source_image;
		$config['create_thumb'] = $create_thumb;
		$config['maintain_ratio'] = $maintain_ratio;
		$config['quality'] = $quality;
		$config['width'] = $width;
		if ($height <> 0) {
			$config['height'] = $height;
		}
		$config['new_image'] = $new_image;
		$this->load->library('image_lib', $config);
		$this->image_lib->resize();

		# Jika $oldFileName tidak kosong, maka hapus file lama
		if (trim($oldFileName) != '') {
			if (file_exists($pathToStoreFile."/".$oldFileName)) {
				unlink($pathToStoreFile."/".$oldFileName);
			}
		}

		if (!$this->image_lib->resize()) {
			return array('result' => false, 'data' => NULL, 'msg' => $this->image_lib->display_errors());
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Thumbnail berhasil dibuat.');
		}
		
	}

}