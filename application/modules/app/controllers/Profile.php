<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Profile extends Core_Controller {
	
	function __construct(){
		parent::__construct();
		$this->load->model("Profile_Model", "m_app");
	}

	function index() {
		$this->data['action'] = 'edit';
		$this->data['info_user'] = $this->m_app->getInfoUser();
		$this->load->view('Profile', $this->data);
	}
	
	function updateInfoUser($format = 'json') {
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

}