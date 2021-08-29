<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/* load the MX_Router class */
require APPPATH . "third_party/MX/Controller.php";

class MY_Controller extends MX_Controller
{	

	function __construct() 
	{
		parent::__construct();
		$this->_hmvc_fixes();
	}
	
	function _hmvc_fixes()
	{		
		//fix callback form_validation		
		//https://bitbucket.org/wiredesignz/codeigniter-modular-extensions-hmvc
		$this->load->library('form_validation');
		$this->form_validation->CI =& $this;
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


}

/* End of file MY_Controller.php */
/* Location: ./application/core/MY_Controller.php */
