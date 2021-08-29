<?php if (!defined('BASEPATH')) {
	exit('No direct script access allowed');
}

class Usersb2b_Model extends Core_Model
{

	function __construct()
	{
		parent::__construct();
	}

	/*******************************************************************************
	 *                            START DEFAULT FUNCTION                            *
	 *******************************************************************************/

	function save($input)
	{
		$cek = $this->db->query("SELECT * FROM app_users_b2b WHERE user_id=?", array($input['user_id']));
		if ($cek->row() != NULL) {
			return array('result' => false, 'data' => NULL, 'msg' => 'User ID sudah ada.');
		}

		$data = array(
			'user_id' => $input['user_id'],
			// 'user_pass' => password_hash($input['user_pass'], PASSWORD_DEFAULT),
			'user_pass' => $input['user_pass'],
			'role_id' => $input['role_id'],
			'supp_id' => $input['supp_id'],
			'status' => $input['status'],
			'created_by' => $this->session->userdata('user_id'),
			'creation_date' => date('Y-m-d H:i:s')
		);

		$NonQry = $this->db->insert('app_users_b2b', $data);

		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':', $msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. ' . $msg[0] . ': ' . $msg[1] . ', nilai : ' . str_replace('LINE 1', '', $msg[2]));
		} else {
			$id_kar = $this->db->query("SELECT id FROM app_users_b2b WHERE user_id=?", array($input['user_id']))->row();
			return array('result' => true, 'data' => (array('id' => $id_kar->id)), 'msg' => 'Data berhasil disimpan.');
		}
	}

	function update($input)
	{
		if (trim($input['user_pass']) == "" || empty($input['user_pass']) || $input['user_pass'] == NULL) {
			$data = array(
				'role_id' => $input['role_id'],
				'supp_id' => $input['supp_id'],
				'status' => $input['status'],
				'modified_by' => $this->session->userdata('user_id'),
				'modification_date' => date('Y-m-d H:i:s')
			);
		} else {
			$data = array(
				'user_pass' => $input['user_pass'], 
				// 'user_pass' => password_hash($input['user_pass'], PASSWORD_DEFAULT),
				'role_id' => $input['role_id'],
				'supp_id' => $input['supp_id'],
				'status' => $input['status'],
				'modified_by' => $this->session->userdata('user_id'),
				'modification_date' => date('Y-m-d H:i:s')
			);
		}

		$this->db->where('user_id', $input['user_id']);
		$NonQry = $this->db->update('app_users_b2b', $data);

		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':', $msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. ' . $msg[0] . ': ' . $msg[1] . ', nilai : ' . str_replace('LINE 1', '', $msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil diupdate.');
		}
	}

	function delete($input)
	{
		$this->db->where_in('id', $input['id']);
		$NonQry = $this->db->delete("app_users_b2b");

		if (!$NonQry && !empty($this->db->error())) {
			$msg_err = $this->db->error();
			$msg = explode(':', $msg_err['message']);
			return array('result' => false, 'data' => NULL, 'msg' => 'Gagal input. ' . $msg[0] . ': ' . $msg[1] . ', nilai : ' . str_replace('LINE 1', '', $msg[2]));
		} else {
			return array('result' => true, 'data' => NULL, 'msg' => 'Data berhasil dihapus.');
		}
	}

	function getData2Edit($id)
	{
		$Qry = $this->db->query("SELECT a.user_id, a.role_id, a.user_pass,b.role_name, a.supp_id, c.supp_name, CASE WHEN a.status='true' THEN 1 ELSE 0 END AS status
										FROM app_users_b2b a 
										LEFT JOIN app_roles b ON b.role_id=a.role_id
										LEFT JOIN m_supplier c ON a.supp_id=c.supp_id										
										WHERE a.id=?", array($id));

		if ($Qry->result() != NULL) {
			return array('result' => true, 'msg' => 'Data ditemukan.', 'data' => $Qry->row_array());
		} else {
			return array('result' => false, 'msg' => 'Data tidak ditmeukan.', 'data' => NULL);
		}
	}

	function getList($filter)
	{
		$this->datatables->select("a.id, a.user_id, a.role_id, a.supp_id || ' - ' || b.supp_name as supp_name, CASE WHEN a.status='true' THEN 1 ELSE 0 END AS status");
		$this->datatables->from("app_users_b2b a");
		$this->datatables->join('m_supplier b', 'a.supp_id=b.supp_id', 'left');
		foreach ($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
		return $this->datatables->generate();
	}

	function getDataList($filter)
	{
		$this->db->select("a.user_id, a.supp_id || ' - ' || c.supp_name as supp_name, a.role_id, b.role_name, CASE WHEN a.status='true' THEN 'Aktif' ELSE 'Tidak Aktif' END AS status");
		$this->db->from('app_users_b2b a');
		$this->db->join('app_roles b', 'b.role_id=a.role_id', 'left');
		$this->db->join('m_supplier c', 'a.supp_id=c.supp_id', 'left');
		foreach ($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->db->where($key, $val);
			}
		}
		return $this->db->get();
	}




	function getRoleList()
	{
		$this->datatables->select('a.role_id, a.role_name, a.desc');
		$this->datatables->from('app_roles a');
		return $this->datatables->generate();
	}

	/*******************************************************************************
	 *                              END DEFAULT FUNCTION                            *
	 *******************************************************************************/
}
