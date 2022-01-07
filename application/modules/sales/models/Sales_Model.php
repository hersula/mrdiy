<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Sales_Model extends Core_Model {

	function __construct(){
        parent::__construct();
   }
	
    function getSameStore() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("deskripsi,today, lw, plw, mtd, lm, plm, ly, ply, urut");
        $this->datatables->from('rpt_sales_ss');
        $this->datatables->where('tanggal', $today);
        return $this->datatables->generate();
    }

    function getAllStore() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("deskripsi,today, lw, plw, mtd, lm, plm, ly, ply, urut");
        $this->datatables->from('rpt_sales_all');
        $this->datatables->where('tanggal', $today);
        return $this->datatables->generate();
    }

    function getFsStore() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("deskripsi,today, lw, plw, mtd, lm, plm, ly, ply, urut");
        $this->datatables->from('rpt_sales_fs');
        $this->datatables->where('tanggal', $today);
        return $this->datatables->generate();
    }

    function getMallStore() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("deskripsi,today, lw, plw, mtd, lm, plm, ly, ply, urut");
        $this->datatables->from('rpt_sales_mall');
        $this->datatables->where('tanggal', $today);
        return $this->datatables->generate();
    }

    function getJavaStore() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("deskripsi,today, lw, plw, mtd, lm, plm, ly, ply, urut");
        $this->datatables->from('rpt_sales_java');
        $this->datatables->where('tanggal', $today);
        return $this->datatables->generate();
    }

    function getNonStore() {
        $today=date('Y-m-d', strtotime("yesterday"));
        $this->datatables->select("deskripsi,today, lw, plw, mtd, lm, plm, ly, ply, urut");
        $this->datatables->from('rpt_sales_nonjava');
        $this->datatables->where('tanggal', $today);
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