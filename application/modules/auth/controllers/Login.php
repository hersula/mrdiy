<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends Core_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model("Auth_Model", "m_app");
	}

	function index() {
		$data['warning'] = '';
		$this->load->view('Login', $data);
	}
	
	/*function index2() {
		$txt_pass = "root";
		$hashed_password = password_hash($txt_pass, PASSWORD_DEFAULT);
		echo $hashed_password."<br/>";
		if (password_verify("root", $hashed_password)) {
			 echo "valid"."<br/>";
		} else {
			echo "invalid"."<br/>";
		}
	}*/
	
	function DoLogin() {
		$data = array(
			'user' => $this->input->post("username"),
			'pass' => $this->input->post("password")
		);

		$hasil = $this->m_app->getLogin($data);

		if ($hasil['result']) {
			$arrSession = array('login' 				=> true,
										'user_id'			=> $hasil['data']['user_id'],
										'employee_id'		=> $hasil['data']['employee_id'],
										'name'				=> $hasil['data']['name'],
										'role_id'			=> $hasil['data']['role_id'],
										'def_menu_id' 		=> $hasil['data']['def_menu_id'],
										'def_menu_link' 	=> $hasil['data']['module_id']."/".$hasil['data']['menu_ctl'].'/'.$hasil['data']['menu_ctl_def'],
										'level_code'		=> $hasil['data']['level_code'],
										'divisi_code'		=> $hasil['data']['divisi_code'],
										'store_id'			=> $hasil['data']['store_id'],
										'def_store_id' 		=> $hasil['data']['def_store_id']
										#'curr_menu_id' 	=> $hasil['data']['def_menu_id']
			);
			#echo "<pre>"; print_r($arrSession); echo "</pre>"; exit;
			
			$this->session->set_userdata($arrSession);
			redirect("app");
		} else {
			$data['warning'] = '<div class="alert alert-warning alert-dismissible" role="alert">
													<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        	<strong>Peringatan!</strong> Gagal login, cek username dan password anda.
                    		</div>';
			$this->load->view('Login', $data);
		}
	}
	
	function DoLogout() {
		$user_data = $this->session->all_userdata();
		
    	foreach ($user_data as $key => $value) {
			$this->session->unset_userdata($key);
		}
		redirect("auth/Login");
	}
}
