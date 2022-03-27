<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Custspending_Model extends Core_Model {

	function __construct(){
        parent::__construct();
   }
	
    function getList($filter) {
        // $today=date('Y-m-d', strtotime("yesterday"));
        //$this->datatables->distinct();
        $this->datatables->select("region, sum(trx) as trx, sum(amt) as amt");
        $this->datatables->from('custspending');
        $this->datatables->group_by('region');
        // $this->datatables->query("select region, sum(trx) as trx, sum(amt) as amt from custspending group by region");
        
        foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->datatables->where($key, $val);
			}
		}
        return $this->datatables->generate();
    }

    function ambiltrx($filter) {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->db->distinct();
        $this->db->select("deskripsi, region, sum(atrx) as trx, sum(samt) as amt");
        $this->db->from('custspending');
        $this->db->group_by('deskripsi, region');
        foreach($filter as $key => $val) {
			if (trim($val) != "" || !empty($val) || $val != NULL) {
				$this->db->where($key, $val);
			}
		}

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->row()->$query;
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