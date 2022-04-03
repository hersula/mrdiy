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

    public function get_data4xls($filter)
    {
        $this->db->select("a.sales_closedate, b.m_shortdesc, b.m_odesc, a.trx, a.qty, a.amt
                            ");
        $this->db->from("sales_daily_detail a");
        $this->db->join("m_customer b", "b.m_code=a.sales_store", "left");
        foreach ($filter as $key => $val) {
            if (trim($val) != "" || !empty($val) || $val != null) {
                $this->db->where($key, $val);
            }
        }
        $rs = $this->db->get();

        return $rs;
    }

}