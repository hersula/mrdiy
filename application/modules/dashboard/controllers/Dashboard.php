<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends Core_Controller {

	function __construct(){
		# parsing menu_id
		parent::__construct("dashboard");
	}

	function index() {
		$data['warning'] = '';
		/* echo "dashboard";
		echo "<pre>"; print_r($this->data); echo "</pre>"; exit; */
		$this->load->view('Dashboard', $this->data);
	}
	
	/* 
	function index2() {
		$txt_pass = "root";
		$hashed_password = password_hash($txt_pass, PASSWORD_DEFAULT);
		echo $hashed_password."<br/>";
		if (password_verify("root", $hashed_password)) {
			 echo "valid"."<br/>";
		} else {
			echo "invalid"."<br/>";
		}
	} */
	
}
