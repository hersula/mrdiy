<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<!DOCTYPE html>
<html> 
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7; IE=EDGE" />
  <title>MR DIY System</title>
  <link rel="shortcut icon" href="<?=base_url()?>assets/images/mrdiy_logo.png" />
  
  <link href="<?=base_url()?>assets/css/bootstrap.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/css/glyphicon.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/css/font-awesome.min.css" rel="stylesheet">
  <link href="<?=base_url()?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/libs/datatables/datatables.min.css" rel="stylesheet" type="text/css" /> 
  <!-- <link href="<?=base_url()?>assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" /> -->
  <link href="<?=base_url()?>assets/libs/smartwizard/css/smart_wizard_all.min.css" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="<?=base_url()?>assets/css/lib/pace.min.css?v=<?=date('YmdHis').rand()?>"/>
  <link href="<?=base_url()?>assets/libs/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />
  <link href="<?=base_url()?>assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="<?=base_url()?>assets/css/bootstrap-datepicker.min.css"/>
  <link rel="stylesheet" href="<?=base_url()?>assets/js/plugin/clockpicker/bootstrap4-clockpicker.min.css"/>
  <link rel="stylesheet" href="<?=base_url()?>assets/css/lib/jquery.bootstrap-touchspin.min.css"/>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
</head>
<body data-sidebar="dark">

  <!-- Begin page -->
  <div id="layout-wrapper">

    <header id="page-topbar">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box">
            <a href="index.html" class="logo logo-dark">
              <span class="logo-sm">
                <img src="assets/images/mrdiy-transparent.png" alt="" height="22">
              </span>
              <span class="logo-lg">
                <img src="assets/images/mrdiy_logo.png" alt="" height="17">
              </span>
            </a>
            
            <a href="index.html" class="logo logo-light">
              <span class="logo-sm">
                  <img src="<?=base_url('assets/images/mr-diy-menu.png') ?>">
              </span>
              <span class="logo-lg">
                  <img src="<?=base_url('assets/images/mrdiy-transparent.png') ?>" height="50">
              </span>
            </a>
          </div>
          <button type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
            <i class="mdi mdi-menu"></i>
          </button>

        </div>

        <div class="d-flex">

        
        <div class="dropdown d-inline-block d-lg-none ml-2">
          <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="mdi mdi-magnify"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
        aria-labelledby="page-header-search-dropdown">

        <form class="p-3">
          <div class="form-group m-0">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username">
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="dropdown d-none d-lg-inline-block">
      <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
        <i class="mdi mdi-fullscreen font-size-24"></i>
      </button>
    </div>

    <!-- <div class="dropdown d-inline-block ml-1">
      <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="ti-bell"></i>
      <span class="badge badge-danger badge-pill">3</span>
    </button>
     <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
    aria-labelledby="page-header-notifications-dropdown">
    <div class="p-3">
      <div class="row align-items-center">
        <div class="col">
          <h5 class="m-0"> Notifications (modul under construction) </h5>
        </div>
      </div>
    </div>
    <div data-simplebar style="max-height: 230px;">
    </div>
  </div>
</div> -->


<div class="dropdown d-inline-block">
  <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <img class="rounded-circle header-profile-user" src="assets/images/users/logout.jpg"
  alt="Header Avatar">
</button>
<div class="dropdown-menu dropdown-menu-right">
  <!-- item-->
  <a class="dropdown-item" href="#"><i class="mdi mdi-lock-open-outline font-size-17 text-muted align-middle mr-1"></i> Lock screen</a>
  <div class="dropdown-divider"></div>
  <?php
    if($this->session->userdata()['role_id'] != 'B2B'):
  ?>
    <a class="dropdown-item text-danger" href="<?=base_url().'auth/Login/DoLogout'?>"><i class="mdi mdi-power font-size-17 text-muted align-middle mr-1 text-danger"></i> Logout</a>
  <?php 
    else:
  ?>
    <a class="dropdown-item text-danger" href="<?=base_url().'b2b/Login/DoLogout'?>"><i class="mdi mdi-power font-size-17 text-muted align-middle mr-1 text-danger"></i> Logout</a>
  <?php
  endif
  ?>
</div>
</div>

<div class="dropdown d-inline-block">
  <button type="button" class="btn header-item noti-icon right-bar-toggle waves-effect">
    <i class="mdi mdi-spin mdi-settings"></i>
  </button>
</div>

</div>
</div>
</header>

<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">

  <div data-simplebar class="h-100">

    <!--- Sidemenu -->
    <div id="sidebar-menu">
      <?=$menu_lists?>
    </div>
    <!-- Sidebar -->
  </div>
</div>
<div class="main-content">

    <div class="page-content">
        <div class="container-fluid">
            <div id="content">

            </div>  
        </div>
        <!-- end main content-->

    </div>
</div>
</div>
<!-- END layout-wrapper -->

<!-- Right Sidebar -->
<div class="right-bar">
  <div data-simplebar class="h-100">
    <div class="rightbar-title px-3 py-4">
      <a href="javascript:void(0);" class="right-bar-toggle float-right">
        <i class="mdi mdi-close noti-icon"></i>
      </a>
      <h5 class="m-0">Settings</h5>
    </div>

    <!-- Settings -->
    <hr class="mt-0" />
    <h6 class="text-center mb-0">Choose Layouts</h6>

    <div class="p-4">
      <div class="mb-2">
        <img src="assets/images/layouts/layout-1.jpg" class="img-fluid img-thumbnail" alt="">
      </div>
      <div class="custom-control custom-switch mb-3">
        <input type="checkbox" class="custom-control-input theme-choice" id="light-mode-switch" checked />
        <label class="custom-control-label" for="light-mode-switch">Light Mode</label>
      </div>

      <div class="mb-2">
        <img src="assets/images/layouts/layout-2.jpg" class="img-fluid img-thumbnail" alt="">
      </div>
      <div class="custom-control custom-switch mb-3">
        <input type="checkbox" class="custom-control-input theme-choice" id="dark-mode-switch" data-bsStyle="assets/css/bootstrap-dark.min.css" data-appStyle="assets/css/app-dark.min.css" />
        <label class="custom-control-label" for="dark-mode-switch">Dark Mode</label>
      </div>

      <div class="mb-2">
        <img src="assets/images/layouts/layout-3.jpg" class="img-fluid img-thumbnail" alt="">
      </div>
      <div class="custom-control custom-switch mb-5">
        <input type="checkbox" class="custom-control-input theme-choice" id="rtl-mode-switch" data-appStyle="assets/css/app-rtl.min.css" />
        <label class="custom-control-label" for="rtl-mode-switch">RTL Mode</label>
      </div>


    </div>

  </div> <!-- end slimscroll-menu-->
</div>
<!-- /Right-bar -->
<div id="PopUpModal"></div>
<!-- Right bar overlay-->
<div class="rightbar-overlay"></div>
<script src="<?=base_url()?>assets/libs/jquery/jquery.min.js"></script>
<script src="<?= base_url() ?>assets/js/jquery-ui.js"></script>
<script src="<?= base_url() ?>assets/libs/select2/js/select2.full.min.js"></script>

<script src="<?=base_url()?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?=base_url()?>assets/libs/metismenu/metisMenu.min.js"></script>
<script src="<?=base_url()?>assets/libs/simplebar/simplebar.min.js"></script>
<script src="<?=base_url()?>assets/libs/node-waves/waves.min.js"></script>
<script src="<?=base_url()?>assets/libs/jquery-sparkline/jquery.sparkline.min.js"></script>
<script src="<?=base_url()?>assets/js/app.js"></script>

<script type="text/javascript" src="<?=base_url()?>assets/js/lobi-plugins/lobibox.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/lib/pace/pace.min.js"></script> 
<script type="text/javascript" src="<?=base_url()?>assets/js/popper.min.js"></script>
<!-- <script type="text/javascript" src="<?=base_url()?>assets/js/bootstrap/bootstrap.min.js"></script> -->
<script type="text/javascript" src="<?=base_url()?>assets/js/lobi-plugins/lobipanel.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/jquery-validation/jquery.validate.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/jquery-validation/additional-methods.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/highlight/highlight.pack.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/lib/autoNumeric/autoNumeric.js"></script> 
<!-- Datepicker -->
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/timepicker/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/daterangepicker/daterangepicker.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
<!-- DataTable -->
<!-- <script src="<?=base_url()?>assets/libs/datatables.net/js/jquery.dataTables.min.js"></script> -->
<script src="<?=base_url()?>assets/libs/datatables/datatables.min.js"></script>
<script src="<?=base_url()?>assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/plugin/datatables/dataTables.responsive.min.js"></script>

<!-- Buttons examples -->
<script src="<?=base_url()?>assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script src="<?=base_url()?>assets/libs/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
<!-- Responsive examples -->

<!--Make sure that config.js file is loaded before LobiAdmin.js-->
<script>
	var base_url = "<?=base_url()?>";
	var def_page = "<?=$this->session->userdata('def_menu_link')?>";
	var name = "<?=$this->session->userdata('name')?>";
  var CurrMenuID = "<?=$this->session->userdata('curr_menu_id')?>";
  var Parameters = JSON.parse('<?=json_encode($parameters)?>');
</script>

<script type="text/javascript" src="<?=base_url()?>assets/js/LobiAdmin.js"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/config.js?v=<?=date('YmdHis').rand()?>"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/LobiAdminMod.min.js?v=<?=date('YmdHis').rand()?>"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/app_lobi.js?v=<?=date('YmdHis').rand()?>"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/demo.js?v=<?=date('YmdHis').rand()?>"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/lib/accounting/accounting.min.js?v=<?=date('YmdHis').rand()?>"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/app_umum.js?v=<?=date('YmdHis').rand()?>"></script>
<script type="text/javascript" src="<?=base_url()?>assets/js/lib/moment/moment.min.js?v=<?=date('YmdHis').rand()?>"></script>
<script src="<?=base_url()?>assets/libs/sweetalert2/sweetalert2.min.js"></script>

<!-- Sweet alert init js-->
<script src="<?=base_url()?>assets/js/pages/sweet-alerts.init.js"></script>
</body>
</html>