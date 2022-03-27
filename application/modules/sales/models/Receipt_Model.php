<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Receipt_Model extends Core_Model {

	function __construct(){
        parent::__construct();
   }
	
    function getList($filter) {
        // $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("a.sales_closedate, a.sales_store, b.m_shortdesc, a.trx, a.qty, a.amt");
        $this->datatables->from('sales_daily_detail a');
        $this->datatables->join('m_customer b', 'trim(a.sales_store) = trim(b.m_code)', 'left');
        // $this->datatables->where('tanggal', $today);
        foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
        return $this->datatables->generate();
    }

    function ambiltrx() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->db->select("sum(trx) as trx");
        $this->db->from('sales_daily');
        $this->db->where('sales_closedate', $today);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->row()->trx;
        }
        return false;
    }
	
    function ambilqty() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->db->select("sum(qty) as qty");
        $this->db->from('sales_daily');
        $this->db->where('sales_closedate', $today);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->row()->qty;
        }
        return false;
    }

    function ambilamt() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->db->select("sum(amt) as amt");
        $this->db->from('sales_daily');
        $this->db->where('sales_closedate', $today);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->row()->amt;
        }
        return false;
    }

}