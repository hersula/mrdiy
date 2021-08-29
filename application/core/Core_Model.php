<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Core_Model extends CI_Model {
	
	function __construct(){
		parent::__construct();
		#Load database
	}
	
	function getNewToken($user_id, $OldToken = '', $UseOldToken = false) {
		$NewToken = '';
		if ($UseOldToken) {
			$NewToken = md5(uniqid($user_id.rand().date('YmdHms'), true));
			if ($this->getTokenByUser($user_id) == '') {
				$data = array(
					'token' => $NewToken,
					'user_id' => $user_id,
					'valid' => date('Y-m-d', strtotime('+1 years'))
				);
				$exe = $this->db->insert('api_token', $data);
			} else {
				$exe = true;
				$NewToken = $this->getTokenByUser($user_id);
			}
		} else {
			$NewToken = md5(uniqid($user_id.rand().date('YmdHms'), true));
			if ($this->checkTokenExist($user_id, $OldToken)) {
				$arrWhere = array(
					'user_id' => $user_id
				);
				$this->db->where($arrWhere);
				$exe = $this->db->update('api_token', array('token' => $NewToken));	
			}
		}
		
		if ($exe) {
			return $NewToken;
		} else {
			return $NewToken;
		}
	}
	
	function checkTokenExist($user_id, $token) {
		$arrWhere = array('token' => $token, 'user_id' => $user_id);
		$this->db->where($arrWhere);
		$check = $this->db->get('api_token');

		if ($check->result() != NULL) {
			return true;
		} else {
			return false;
		}
		
	}
	
	function getTokenByUser($user_id) {
		$arrWhere = array('user_id' => $user_id);
		$this->db->select('token');
		$this->db->where($arrWhere);
		$check = $this->db->get('api_token')->row();

		if ($check->token != NULL) {
			return $check->token;
		} else {
			return '';
		}
	}

	function getParameter($param_id = '', $GetAllParames = false) {
		$result_arr = [];
		if ($GetAllParames) {
			$rec = $this->db->query('SELECT param_id, value_date, value_varchar, value_numeric, value_smallint, CASE WHEN value_boolean=true THEN 1 ELSE 0 END AS value_boolean FROM app_parameters');
			foreach ($rec->result() as $key => $value) {
				$result_arr[$value->param_id] = array(
					'value_date' => $value->value_date,
					'value_varchar' => (string) $value->value_varchar,
					'value_numeric' => (float) $value->value_numeric,
					'value_smallint' => (int) $value->value_smallint,
					'value_boolean' => (bool) $value->value_boolean == 1 ? true : false,
				);
			}
			return $result_arr;
		} else {
			$rec = $this->db->query('SELECT param_id, value_date, value_varchar, value_numeric, value_smallint, CASE WHEN value_boolean=true THEN 1 ELSE 0 END AS value_boolean FROM app_parameters WHERE param_id=?', array($param_id))->row();
			$result_arr[$rec->param_id] = array(
				'value_date' => $rec->value_date,
				'value_varchar' => (string) $rec->value_varchar,
				'value_numeric' => (float) $rec->value_numeric,
				'value_smallint' => (int) $rec->value_smallint,
				'value_boolean' => (bool) $rec->value_boolean == 1 ? true : false,
			);

			return $result_arr;
		}
	}
	
}