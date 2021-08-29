<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

function get_active_schoolyear_id() {
   $CI = &get_instance();

   $query = "SELECT id FROM schoolyear WHERE school_year LIKE CASE WHEN MONTH(NOW()) >= 7 THEN CONCAT(YEAR(NOW()),'%') ELSE CONCAT(YEAR(NOW()) - 1,'%') END";
   return $CI->db->query($query)->row()->id;

}
function get_week($week, $year)
{
  $dateTime = new DateTime();
  $dateTime->setISODate($year, $week);
  $result['start_date'] = $dateTime->format('d-m-Y');
  $result['start_date_format'] = $dateTime->format('Y-m-d');
  $dateTime->modify('+6 days');
  $result['end_date'] = $dateTime->format('d-m-Y');
  $result['end_date_format'] = $dateTime->format('Y-m-d');
  return $result;
}
function get_week_date($year, $month, $week)
{
  if ($week == 1) {
    $result['start_date'] = '01-'.$month.'-'.$year;
    $result['start_date_format'] = $year.'-'.$month.'-01';

    $result['end_date'] = '07-'.$month.'-'.$year;
    $result['end_date_format'] = $year.'-'.$month.'-07';
  }elseif ($week == 2) {
    $result['start_date'] = '08-'.$month.'-'.$year;
    $result['start_date_format'] = $year.'-'.$month.'-08';

    $result['end_date'] = '15-'.$month.'-'.$year;
    $result['end_date_format'] = $year.'-'.$month.'-15';
  }
  elseif ($week == 3) {
    $result['start_date'] = '16-'.$month.'-'.$year;
    $result['start_date_format'] = $year.'-'.$month.'-16';

    $result['end_date'] = '22-'.$month.'-'.$year;
    $result['end_date_format'] = $year.'-'.$month.'-22';
  }
  elseif ($week == 4) {
    $result['start_date'] = '23-'.$month.'-'.$year;
    $result['start_date_format'] = $year.'-'.$month.'-23';

    $result['end_date'] = '31-'.$month.'-'.$year;
    $result['end_date_format'] = $year.'-'.$month.'-31';
  }
  return $result;
}
function get_week_3($year, $bulan)
{
    $start_date = date_create(date("Y-m-d"));
    $end_date = date_create($year.'-'.$bulan.'-'.date("d"));
    $diff=date_diff($start_date,$end_date);
    if ($diff->format("%a") < 21) {
      if (date("d") < 7) {
        $result['status'] = 1;
        $result['week'] = array('Minggu Ke - 4');
      }else{
        $result['status'] = 0;
        $result['week_val'] = 0;
        $result['week_text'] = 'Anda Harus Mengganti Bulan Selanjutnya';
      }
    }else{
        if ($bulan < date("m") && $year <= date("Y")) {
          $result['status'] = 0;
          $result['week_val'] = 0;
          $result['week_text'] = 'Anda Harus Mengganti Bulan Selanjutnya';
        }else{
          $result['status'] = 3;
          $result['week'] = array('Minggu Ke - 1', 'Minggu Ke - 2','Minggu Ke - 3', 'Minggu Ke - 4');
        }
    }
    return $result;
}
function check_access($menu_id = '', $action = '') {
   $CI = &get_instance();

   if (!$CI->session->userdata('login')) {
      show_404();
      die();
   }

   $CI->db->select("a.".$action."_flag AS action");
   $CI->db->from("app_menu_per_role a");
   $CI->db->join("app_menu_lists b", "a.menu_id = b.menu_id AND b.active=1");
   $arrWHere = array(
      'a.role_id' => $CI->session->userdata('role_id'),
      'b.menu_id' => $menu_id,
      'a.read_flag' => 1
   );
   $CI->db->where($arrWHere);
   $rs = $CI->db->get();

   if ($rs->row() != NULL) {
      return array('result' => true, 'data' => $rs->row_array());
   } else {
      return array('result' => false, 'data' => NULL);
   }
}
function uploadDataImg($file,$filename,$directory)
{
   $CI = &get_instance();
   
   $config['upload_path']          = $directory;
   $config['file_name']          = $filename;
   $config['allowed_types']        = '*';
   $config['max_size']             = 204800;
   $config['max_width']            = 8000;
   $config['max_height']           = 8000;
 
   $CI->load->library('upload', $config);

   $CI->upload->initialize($config);
   if (!$CI->upload->do_upload($file)){
      $error = array('upload_status'=>false,'error' => $CI->upload->display_errors());
      return $error;
   }else{
      $data = array('upload_status'=>true,'upload_data' => $CI->upload->data());
      return $data;
   }
}
function uploadDataExcel($file,$filename,$directory)
{
   $CI = &get_instance();
   
   $config['upload_path']          = $directory;
   $config['file_name']          = $filename;
   $config['allowed_types']        = '*';
   $config['max_size']             = 204800000000;
 
   $CI->load->library('upload', $config);

   $CI->upload->initialize($config);
   if (!$CI->upload->do_upload($file)){
      $error = array('upload_status'=>false,'error' => $CI->upload->display_errors());
      return $error;
   }else{
      $data = array('upload_status'=>true,'upload_data' => $CI->upload->data());
      return $data;
   }
}