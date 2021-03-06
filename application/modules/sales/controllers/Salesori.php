<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sales extends Core_Controller {

	function __construct(){
		# parsing menu_id
		parent::__construct("sales");
        $this->load->model("Sales_Model", "m_app");
	}

	function index() {
        // $data = $this->m_app->ambiltrx();

		$data = array (
            'trx' => $this->m_app->ambiltrx(),
            'qty' => $this->m_app->ambilqty(),
            'amt' => $this->m_app->ambilamt(),
			// 'getlist' => $this->m_app->getlist(),
        );
        
		/* echo "dashboard";
		echo "<pre>"; print_r($this->data); echo "</pre>"; exit; */
		$this->load->view('Sales', $data);
	}
	
	function getList() {
			
		$this->output->set_content_type('application/json');
		echo $this->m_app->getList();
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
