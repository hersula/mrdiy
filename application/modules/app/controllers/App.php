<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends Core_Controller {
	
	function __construct(){
		parent::__construct();
		$this->load->model("App_Model", "m_app");
	}

	function index() {
		$this->Main();
	}

	function Main() {
		$MenuString = '';
		$getMainMenu = $this->m_app->getMenu($this->session->userdata('role_id'));
		if ($getMainMenu->num_rows() > 0) {
			$MenuString = '<ul class="metismenu list-unstyled" id="side-menu">';
			foreach ($getMainMenu->result() as $val) {
				$menu_id = $val->menu_ctl === NULL || trim($val->menu_ctl) === '' || trim($val->menu_id) === '' ? '' : $val->menu_id;
				$menu_link = $val->menu_ctl === NULL || trim($val->menu_ctl) === '' || trim($val->menu_id) === '' ? '' : $val->module_id.'/'.$val->menu_ctl.'/'.$val->menu_ctl_def;
				$menu_icon = $val->menu_icon === NULL || trim($val->menu_icon) === '' ? '' : '<i class="'.$val->menu_icon.'"></i>';
				$MenuString .= '<li>
								<a class="waves-effect" href="#'.$menu_link.'" id="'.$menu_id.'" onclick="setCurrMenuID(\''.$menu_id.'\')">
									'.$menu_icon.'
									<span class="inner-text">'.$val->menu_name.'</span>
								</a>';
				$MenuString .= $this->getSubMenu($this->session->userdata('role_id'), $val->menu_id);
				$MenuString .= '</li>';
			}
		}
		$MenuString .= '</ul>';

		$data['menu_lists'] = $MenuString;
		$data['parameters'] = $this->getParameter('MAX_MONTH', true);
		
		$this->load->view('App', $data);
	}

	function getSubMenu($role_id, $parent_menu_id) {
		$SubMenuString = '';
		$getSubMenu = $this->m_app->getSubMenu($role_id, $parent_menu_id);
		if ($getSubMenu->num_rows() > 0) {
			$SubMenuString = '<ul>';
			foreach ($getSubMenu->result() as $list) {
				$menu_id = $list->menu_ctl === NULL || trim($list->menu_ctl) === '' || trim($list->menu_id) === '' ? '' : $list->menu_id;
				$menu_link = $list->menu_ctl === NULL || trim($list->menu_ctl) === '' || trim($list->menu_id) === '' ? '' : $list->module_id.'/'.$list->menu_ctl.'/'.$list->menu_ctl_def;
				$menu_icon = $list->menu_icon === NULL || trim($list->menu_icon) === '' ? '' : '<i class="'.$list->menu_icon.'"></i>';
				$SubMenuString .= '<li>
								        	<a href="#'.$menu_link.'" id="'.$menu_id.'" onclick="setCurrMenuID(\''.$menu_id.'\')">
								            '.$menu_icon.'
								            <span class="inner-text">'.$list->menu_name.'</span>
													</a>';
				$SubMenuString .= $this->getSubMenu($this->session->userdata('role_id'), $list->menu_id);
				$SubMenuString .= '</li>';

			}
			$SubMenuString .= '</ul>';
		}

		return $SubMenuString;	
	}
}
