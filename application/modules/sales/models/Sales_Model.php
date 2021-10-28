<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Sales_Model extends Core_Model {
	
	function __construct(){
        parent::__construct();
   }
	
    function getSameStore() {
        $this->datatables->select("deskripsi, CAST(today AS decimal(18,2)) AS today, CAST(lw AS decimal(18,2)) as lw, plw, CAST(mtd AS decimal(18,2)) as mtd, CAST(lm AS decimal(18,2)) as lm, plm, CAST(ly AS decimal(18,2)) as ly, ply");
        $this->datatables->from('r_sales');
        
        return $this->datatables->generate();
    }

    function getAllStore() {
        $this->datatables->select("deskripsi, CAST(today AS decimal(18,2)) AS today, CAST(lw AS decimal(18,2)) as lw, plw, CAST(mtd AS decimal(18,2)) as mtd, CAST(lm AS decimal(18,2)) as lm, plm, CAST(ly AS decimal(18,2)) as ly, ply");
        $this->datatables->from('r_sales_all');
        
        return $this->datatables->generate();
    }

    function getFsStore() {
        $this->datatables->select("deskripsi, CAST(today AS decimal(18,2)) AS today, CAST(lw AS decimal(18,2)) as lw, plw, CAST(mtd AS decimal(18,2)) as mtd, CAST(lm AS decimal(18,2)) as lm, plm, CAST(ly AS decimal(18,2)) as ly, ply");
        $this->datatables->from('r_sales_fs');
        
        return $this->datatables->generate();
    }

    function getMallStore() {
        $this->datatables->select("deskripsi, CAST(today AS decimal(18,2)) AS today, CAST(lw AS decimal(18,2)) as lw, plw, CAST(mtd AS decimal(18,2)) as mtd, CAST(lm AS decimal(18,2)) as lm, plm, CAST(ly AS decimal(18,2)) as ly, ply");
        $this->datatables->from('r_sales_mall');
        
        return $this->datatables->generate();
    }

    function getJavaStore() {
        $this->datatables->select("deskripsi, CAST(today AS decimal(18,2)) AS today, CAST(lw AS decimal(18,2)) as lw, plw, CAST(mtd AS decimal(18,2)) as mtd, CAST(lm AS decimal(18,2)) as lm, plm, CAST(ly AS decimal(18,2)) as ly, ply");
        $this->datatables->from('r_sales_java');
        
        return $this->datatables->generate();
    }

    function getNonStore() {
        $this->datatables->select("deskripsi, CAST(today AS decimal(18,2)) AS today, CAST(lw AS decimal(18,2)) as lw, plw, CAST(mtd AS decimal(18,2)) as mtd, CAST(lm AS decimal(18,2)) as lm, plm, CAST(ly AS decimal(18,2)) as ly, ply");
        $this->datatables->from('r_sales_nonjava');
        
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