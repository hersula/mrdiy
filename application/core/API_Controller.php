<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class API_Controller extends MY_Controller {
	var $UserBasicAuth = "";
	var $PassBasicAuth = "";
	var $AllowedMethod = array('POST', 'GET');
	var $token = "";
	var $user = "";
	var $ExcludeController = array('LoginMobile', 'Testing');
	
	function __construct(){
		parent::__construct();
		date_default_timezone_set("Asia/Jakarta");
		ini_set('max_execution_time', 0); 
		#ini_set('memory_limit','4096M');
		
		$this->config->load('config_app', TRUE);
		$this->UserBasicAuth = $this->config->item('UserBasicAuth', 'config_app');
		$this->PassBasicAuth = $this->config->item('PassBasicAuth', 'config_app');
		
		$this->load->library('Format');
		
		# Cek method
		$this->CheckAllowedMethod($this->input->server('REQUEST_METHOD'));
		
		#Cek basic Authorization
		$this->CheckBasicAuth();
		
		$this->token = $this->input->get_request_header('x-api-token', true);
		$this->user = base64_decode($this->input->get_request_header('x-api-user', true));
		
		/*echo "<pre>"; print_r($this->input->request_headers(true)); echo "</pre><br/>";
		echo "<pre>"; print_r($this->input->get_request_header('x-api-token', true)); echo "</pre><br/>";
		echo "<pre>"; print_r($this->input->get_request_header('x-api-user', true)); echo "</pre><br/>"; exit;*/

	}
	
	function input($format, $data){
		if ($data === "" || $data === NULL || empty($data)) {
			$data = array('result' => false, 'msg' => 'Terdapat kesalahan pada input.', 'data' => '');
			echo $this->format->factory($data,'to_json'); exit;
		} else {
			return $this->format->factory($data,'_from_'.$format);
		}
	}
	
	function output($format, $data) {
		if (!in_array($this->uri->segment(1), $this->ExcludeController)) {
			# Mendapatkan token baru
			#$this->output->set_header('x-api-token-new: '.$this->Login_Model->getToken($this->user, $this->token));
		}
		$this->output->set_content_type('application/'.$format);
		
		$hasil = $this->format->factory($data,'to_'.$format);
		return $hasil;
	}
	
	function CheckBasicAuth(){
		if (empty($this->input->server('PHP_AUTH_USER'))){
		   header('HTTP/1.0 401 Unauthorized');
		   header('HTTP/1.1 401 Unauthorized');
		   header('WWW-Authenticate: Basic realm="My Realm"');
		   $data = array('result' => false, 'msg' => 'You must login to use this service.', 'data' => '');
		   echo $this->format->factory($data,'to_json');
		   die();
		}
		
		$username = $this->input->server('PHP_AUTH_USER');
		$password = $this->input->server('PHP_AUTH_PW');
		
		if ($this->UserBasicAuth != $username && $this->PassBasicAuth != $password){
			$data = array('result' => false, 'msg' => 'Terdapat kesalahan pada saat otorisasi.', 'data' => '');
			echo $this->format->factory($data,'to_json');
			exit;
		}
	}
	
	function CheckAllowedMethod($method){
		if (!in_array($method, $this->AllowedMethod)) {
			$data = array('result' => false, 'msg' => $method.' method tidak diizinkan.', 'data' => '');
			echo $this->output('json', $data);
			die();	
		}
	}
	
	/*function encrypt_output($input = ""){
		$enc_aes = $this->encaes->encryptRJ256($this->KeyEncApp,$this->KeyIV,$input);
		return $this->encdes->Encrypt($enc_aes,$this->KeyEncApp);
	}
	
	function decrypt_input($input = ""){
		$dec_des = $this->encdes->Decrypt($input,$this->KeyEncApp);
		$dec_aes = $this->encaes->decryptRJ256($this->KeyEncApp,$this->KeyIV,$dec_des);
		return base64_decode($dec_aes);
	}
	
	function input($format, $data){
		$data = $this->decrypt_input($data);
		if ($data === "" || $data === NULL || empty($data)) {
			$data = array('result' => false, 'msg' => 'Terdapat kesalahan pada input.', 'data' => '');
			echo $this->output($format, $data); exit;
		} else {
			#return $this->format->factory($data)->{'_from_' . $format}();
			return $this->format->factory($data,'_from_'.$format);
		}
	}
	
	function output($format, $data){
		#$hasil = $this->format->factory($data)->{'to_' . $format}();
		$hasil = $this->format->factory($data,'to_'.$format);
		return $this->encrypt_output($hasil);
		return $hasil;
	}*/
	
	function base642REST($input, $key){
		$base64 = base64_decode($input);
		return $this->pc1->decrypt($base64,$key);;
	}
	
}