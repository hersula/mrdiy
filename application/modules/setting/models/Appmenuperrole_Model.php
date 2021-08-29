<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Appmenuperrole_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
	/*******************************************************************************
   *                            START DEFAULT FUNCTION                            *
   *******************************************************************************/
	
	/* function save($input) {
		$cek = $this->db->query("SELECT * FROM app_modules WHERE module_id=?", array($input['module_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'Module ID sudah ada.');
		}
		
		$data = array(
			'module_id' => $input['module_id'],
			'module_name' => $input['module_name'],
			'active' => $input['active'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);
		
		$NonQry = $this->db->insert('app_modules', $data);
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil disimpan.');
		}
	} */
	
	function update($input) {

		# Mulai begin trans
		$this->db->trans_begin();
		foreach($input['menu_arr'] as $key => $val) {
			# Siapkan inputan
			$data = $val;
			$data['modified_by'] = $this->session->userdata('user_id');
			$data['modification_date'] = date('Y-m-d H:i:s');
			# Insert
			$where = array(
				'role_id' => $input['role_id'],
				'menu_id' => $key,
			);
			$this->db->where($where);
			$msg = $this->db->update('app_menu_per_role', $data);
			# Jika terdapat masalah pada proses insert
			if ($this->db->trans_status() === FALSE) {
				# Tangkap errornya
				$err_db = $this->db->error();
				# Membatalkan semua perubahan
				$this->db->trans_rollback();
				break;
			}
		}
		# Jika tidak ada masalah dengan proses insert
		if ($this->db->trans_status() === TRUE) { 
			# Commit/Simpan semua perubahan
			$this->db->trans_commit(); 
		}
		
		if (!empty($err_db)) {
			$FilterErrDb = str_replace(str_split('\"'), '', $err_db['message']);
			$msg = explode(PHP_EOL,$FilterErrDb);
			return array('result' => false, 'data' => '', 'msg' => "Gagal simpan data \n\n".$msg[0]."\n\n".$msg[1]);
		} else {
			return array('result' => true, 'data' => '', 'msg' => 'Data berhasil disimpan.');
		}
	}
	
	function delete($input) {
		$this->db->where_in('id', $input['id']);
		$NonQry = $this->db->delete("app_menu_per_role");
		
		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':',$msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. '.$msg[0].': '.$msg[1].', nilai : '.str_replace('LINE 1','',$msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}
	
	/* function getData2Edit($id) {
		$Qry = $this->db->query("SELECT a.id, a.module_id, a.module_name, a.active
										FROM app_modules a 
										WHERE a.id=?", array($id));
													
		if ($Qry->result() != NULL){
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	} */
	
	function getList($filter) {
		$this->datatables->select('a.id, a.menu_id, b.menu_name, 
											a.read_flag, a.create_flag, a.edit_flag, a.delete_flag, a.print_flag, a.pdf_flag, a.xls_flag, a.confirm_flag, a.cancel_flag');
		$this->datatables->from('app_menu_per_role a');
		$this->datatables->join('app_menu_lists b', 'b.menu_id=a.menu_id', 'left');
		foreach($filter as $key => $val) {
			$this->datatables->where($key, $val);
		}
		return $this->datatables->generate();
	}
	
	function getDataList($filter) {
		$this->db->select("a.menu_id, b.menu_name, 
								 a.read_flag, a.create_flag, a.edit_flag, a.delete_flag, a.print_flag, a.pdf_flag, a.xls_flag, a.confirm_flag, a.cancel_flag");
		$this->db->from('app_menu_per_role a');
		$this->db->join('app_menu_lists b', 'b.menu_id=a.menu_id', 'left');
		foreach($filter as $key => $val) {
			$this->db->where($key, $val);
		}
		return $this->db->get();
	}
	
	/*******************************************************************************
   *                              END DEFAULT FUNCTION                            *
   *******************************************************************************/
	function getMenuList() {
		$this->db->select('a.module_id, a.parent_menu_id, a.menu_id, a.menu_name');
		$this->db->from('app_menu_lists a');
		$this->db->where('a.active=1');
		return $this->db->get();
	}
  	function AddMenuToRole($input) {
		# Deklarasi return menu
		$menuExist = 0;
		$menuBaru = 0;
		$menuTidakAda = 0;
		# Mulai begin trans
		$this->db->trans_begin();
		foreach($input['menu_list'] as $val) {
			# Cek jika menu ada
			$cek = $this->db->query("SELECT * FROM app_menu_lists WHERE menu_id=?", array($val));
			if ($cek->row() == NULL) {
				$menuTidakAda++;
				continue;
			}
			# Cek jika menu berdasarkan role sudah ada
			$cek = $this->db->query("SELECT * FROM app_menu_per_role WHERE role_id=? AND menu_id=?", array($input['role_id'], $val));
			if ($cek->row() != NULL) {
				$menuExist++;
				continue;
			}
			# Siapkan inputan
			$data = array(
				'role_id' => $input['role_id'],
				'menu_id' => $val,
				'read_flag' => 1,
				'created_by' => $this->session->userdata('user_id'),
				'creation_date' => date('Y-m-d H:i:s')
			);
			# Insert
			$msg = $this->db->insert('app_menu_per_role', $data);
			$menuBaru++;
			# Jika terdapat masalah pada proses insert
			if ($this->db->trans_status() === FALSE) {
				# Tangkap errornya
				$err_db = $this->db->error();
				# Membatalkan semua perubahan
				$this->db->trans_rollback();
				break;
			}
		}
		# Jika tidak ada masalah dengan proses insert
		if ($this->db->trans_status() === TRUE) { 
			# Commit/Simpan semua perubahan
			$this->db->trans_commit(); 
		}
		
		if (!empty($err_db)) {
			$FilterErrDb = str_replace(str_split('\"'), '', $err_db['message']);
			$msg = explode(PHP_EOL,$FilterErrDb);
			return array('result' => false, 'data' => '', 'msg' => "Gagal simpan data \n\n".$msg[0]."\n\n".$msg[1]);
		} else {
			return array('result' => true, 'data' => '', 'msg' => 'Menu sudah ada : '.$menuExist.', menu ditambahkan : '.$menuBaru.', menu tidak ada : '.$menuTidakAda.'.');
		}
		
	}

}