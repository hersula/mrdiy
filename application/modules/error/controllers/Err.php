<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Err extends Core_Controller {

	function __construct(){
		parent::__construct();
	}

	function index() {
		$this->load->view('error_400');	
	}

	function error_404() {
		$this->load->view('error_400');	
	}

	function error_500() {
		$this->load->view('error_500');	
	}
	
}