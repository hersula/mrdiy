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
            where amt > $filter_amt_l and amt <= $filter_amt_k and sales_closedate >= '$sales_closedate_l' and sales_closedate <= '$sales_closedate_k'
            group by region;";
        
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

    function getDataList($filter) {
        $this->db->distinct();
		$this->db->select("a.region, a.sales_store, b.m_shortdesc, b.m_odesc, count(a.trx) as atrx, sum(a.amt) as samt");
      	$this->db->from('excelcustspending a');
        $this->db->join('m_customer b', 'trim(b.m_code) = trim(a.sales_store)','left');

        foreach ($filter as $key => $val) {
            if (trim($val) != "" || !empty($val) || $val != null) {
                $this->db->where($key, $val);
            }
        }
		// $this->db->order_by('a.sales_closedate', 'asc');
        $this->db->group_by('a.region, a.sales_store, b.m_shortdesc, b.m_odesc');
		return $this->db->get();
	}

    // function getDataList($filter) {
    //     $filter_amt_l = $filter['amt >'] == "" ? 0 : $filter['amt >'];
    //     $filter_amt_k = $filter['amt <='] == "" ? 0 : $filter['amt <='];
    //     $sales_closedate_l = $filter['sales_closedate >='];
    //     $sales_closedate_k = $filter['sales_closedate <='];
    //     $query = "select distinct region, sales_store, count(trx) as atrx, sum(amt) as samt from (
    //         select 'Bali' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('B')
    //         union all
    //         select 'Java' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('J', 'G')
    //         union all
    //         select 'Kalimantan' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('K')
    //         union all
    //         select 'Maluku' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('M')
    //         union all
    //         select  'NTT' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('N')
    //         union all
    //         select  'Papua' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('P')
    //         union all
    //         select 'Sulawesi' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('W')
    //         union all
    //         select  'Sumatera' as region, sales_store, sales_closedate, trx, amt
    //         from sales_daily_detail where left(sales_store,1) in ('S')
    //         ) x
    //         where amt > $filter_amt_l and amt <= $filter_amt_k and sales_closedate > '$sales_closedate_l' and sales_closedate <= '$sales_closedate_k'
    //         group by region, sales_store";

    //         $data = $this->db->query($query)->result_array();
    //         return $this->db->get();

    //         // $data = $this->db->query($query)->result_array();
    //         // // return $data->result_array();
    //         // $output = array(
    //         //     // "draw" => $_POST['draw'],
    //         //     // "recordsTotal" => $data_total[0]['trow'],
    //         //     // "recordsFiltered" => count($data),
    //         //     "data" => $data,
    //         // );
    //         // //output to json format
    //         // // echo json_encode($output);
    //         // return json_encode($output);
	// }

}