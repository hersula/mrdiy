<?php if (! defined('BASEPATH')) {exit('No direct script access allowed');}

class Custspending_Model extends Core_Model {
    var $column_order = array('region', 'trx','amt'); //set column field database for datatable orderable
    var $column_search = array('region', 'trx','amt'); //set column field database for datatable searchable 
    var $order = array('id' => 'asc'); // default order 

	function __construct(){
        parent::__construct();
   }
	
    function getList($filter) {
        // $today=date('Y-m-d', strtotime("yesterday"));
        //$this->datatables->distinct();
        // $this->datatables->select("region, sum(trx) as trx, sum(amt) as amt");
        // $this->datatables->from('custspending');
        // $this->datatables->group_by('region');
        // // $this->datatables->query("select region, sum(trx) as trx, sum(amt) as amt from custspending group by region");
        
        // foreach($filter as $key => $val) {
		// 	if (trim($val) != "" || !empty($val) || $val != NULL) {
		// 		$this->datatables->where($key, $val);
		// 	}
		// }
        // return $this->datatables->generate();

        // DATATABLES
        $filter_amt_l = $filter['amt >'] == "" ? 0 : $filter['amt >'];
        $filter_amt_k = $filter['amt <='] == "" ? 0 : $filter['amt <='];
        $sales_closedate_l = $filter['sales_closedate >='];
        $sales_closedate_k = $filter['sales_closedate <='];
        
        $query = "select distinct region, count(trx) as atrx, sum(amt) as samt from (
            select 'Bali' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('B')
            union all
            select 'Java' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('J', 'G')
            union all
            select 'Kalimantan' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('K')
            union all
            select 'Maluku' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('M')
            union all
            select  'NTT' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('N')
            union all
            select  'Papua' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('P')
            union all
            select 'Sulawesi' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('W')
            union all
            select  'Sumatera' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('S')
            ) x
            where amt > $filter_amt_l and amt <= $filter_amt_k and sales_closedate > '$sales_closedate_l' and sales_closedate <= '$sales_closedate_k'
            group by region, sales_closedate;";
        
        $data = $this->db->query($query)->result_array();

        $query_total = "select count(*) as trow from (
            select distinct region, count(trx) as atrx, sum(amt) as samt from (
            select 'Bali' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('B')
            union all
            select 'Java' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('J', 'G')
            union all
            select 'Kalimantan' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('K')
            union all
            select 'Maluku' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('M')
            union all
            select  'NTT' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('N')
            union all
            select  'Papua' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('P')
            union all
            select 'Sulawesi' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('W')
            union all
            select  'Sumatera' as region, sales_closedate, trx, amt
            from sales_daily_detail where left(sales_store,1) in ('S')
            ) x
            group by region, sales_closedate ) z;";
        
        $data_total = $this->db->query($query_total)->result_array();

        $output = array(
            "draw" => $_POST['draw'],
            "recordsTotal" => $data_total[0]['trow'],
            "recordsFiltered" => count($data),
            "data" => $data,
        );
        //output to json format
        echo json_encode($output);
       
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