<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Appmenulist_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	function save($input) {
		$cek = $this->db->query("SELECT * FROM app_menu_lists WHERE menu_id=?", array($input['menu_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'Menu ID sudah ada.');
		}
		
		$data = array(
			'module_id' => $input['module_id'],
			'parent_menu_id' => $input['parent_menu_id'],
			'menu_id' => $input['menu_id'],
			'menu_name' => $input['menu_name'],
			'menu_desc' => $input['menu_desc'],
			'menu_icon' => $input['menu_icon'],
			'menu_ctl' => $input['menu_ctl'],
			'menu_ctl_def' => $input['menu_ctl_def'],
			'sort_id' => $input['sort_id'],
			'active' => $input['active'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);
		
		$NonQry = $this->db->insert('app_menu_lists', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil disimpan.');
		}
	}
	
	function update($input) {
		$data = array(
			'module_id' => $input['module_id'],
			'parent_menu_id' => $input['parent_menu_id'],
			'menu_id' => $input['menu_id'],
			'menu_name' => $input['menu_name'],
			'menu_desc' => $input['menu_desc'],
			'menu_icon' => $input['menu_icon'],
			'menu_ctl' => $input['menu_ctl'],
			'menu_ctl_def' => $input['menu_ctl_def'],
			'sort_id' => $input['sort_id'],
			'active' => $input['active'],
		);

		$this->db->where('menu_id', $input['menu_id']);
		$NonQry = $this->db->update('app_menu_lists', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil diupdate.');
		}
	}
	
	function delete($input) {
		$this->db->where_in('id', $input['id']);
		$NonQry = $this->db->delete("app_menu_lists");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.id, a.module_id, b.module_name, a.parent_menu_id, c.menu_name AS parent_menu_name, 
											a.menu_id, a.menu_name, a.menu_desc, a.menu_icon, a.menu_ctl, a.menu_ctl_def, a.sort_id, a.active
										FROM app_menu_lists a 
											LEFT JOIN app_modules b ON b.module_id=a.module_id
											LEFT JOIN app_menu_lists c ON c.menu_id=a.parent_menu_id
										WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}
	
	function getList($filter) {
		$this->datatables->select('a.id, a.module_id, b.module_name, a.parent_menu_id, c.menu_name AS parent_menu_name, 
											a.menu_id, a.menu_name, a.menu_desc, a.menu_icon, a.menu_ctl, a.menu_ctl_def, a.sort_id, a.active');
		$this->datatables->from('app_menu_lists a');
		$this->datatables->join('app_modules b', 'b.module_id=a.module_id', 'left');
		$this->datatables->join('app_menu_lists c', 'c.menu_id=a.parent_menu_id', 'left');
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}
	
	function getDataList($filter) {
		$this->db->select("a.id, a.module_id, b.module_name, a.parent_menu_id, c.menu_name AS parent_menu_name, 
								a.menu_id, a.menu_name, a.menu_desc, a.menu_icon, a.menu_ctl, a.menu_ctl_def, a.sort_id, 
								CASE WHEN a.active=1 THEN 'Aktif' ELSE 'Tidak Aktif' END AS active");
		$this->db->from('app_menu_lists a');
		$this->db->join('app_modules b', 'b.module_id=a.module_id', 'left');
		$this->db->join('app_menu_lists c', 'c.menu_id=a.parent_menu_id', 'left');
		foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->db->where($key, $val);
			}
		}
		return $this->db->get();
	}
	
	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	function getMenuList() {
		$this->datatables->select('a.menu_id, a.menu_name');
		$this->datatables->from('app_menu_lists a');
		$this->datatables->where('a.active', 1);
		return $this->datatables->generate();
	}
	
	function getListSelect2($input) {
		$Qry = $this->db->query("SELECT a.menu_id, a.menu_name FROM app_menu_lists a WHERE menu_id ILIKE ? OR menu_name ILIKE ?", 
									   array('%'.$input['keyword'].'%', '%'.$input['keyword'].'%'));
		return $Qry->result();
	}

}