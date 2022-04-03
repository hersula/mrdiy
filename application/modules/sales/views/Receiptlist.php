<div class="row">
    <div class="col-md-6">
        <div class="page-title-box">
            <h5>Receipt List Sales</h5>
            <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                <li class="breadcrumb-item"><a href="javascript: void(0);">Receiplist</a></li>
            </ol>
        </div>
    </div>
    <div class="col-md-6">
      <div class="page-title-box text-right">
         <div class="button-items">
            <?php if ($priv_arr['xls_flag']) { ?>
               <button type="button" class="btn btn-outline-success btn-sm waves-effect waves-light" id="app_xls" name="app_xls" onclick="app_xls();"><i class="fas fa-file-excel"></i> Excel/CSV </button>
            <?php } ?>
         </div>
      </div>
   </div>
</div>
<div class="row">
<div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <div id="accordion">
               <div class="card mb-1 shadow-none">
                  <div class="card-header p-3" id="headingOne">
                     <h6 class="m-0 font-size-14">
                        <a href="#collapseOne" class="text-dark collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">Filter</a>
                     </h6>
                  </div>
                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                     <div class="card-body">
                        <form id="form_filter" name="form_filter">
                           <div class="row">
                              <div class="col-md-3">
                                 <div class="form-group">
                                    <label>Tanggal</label>
                                    <div class="input-daterange input-group" data-date-format="dd M, yyyy"  data-date-autoclose="true"  data-provide="datepicker">
                                       <input type="text" class="form-control" id="filter_start_date" name="filter_start_date" readonly />
                                       <input type="text" class="form-control" id="filter_end_date" name="filter_end_date" readonly />
                                    </div>
                                 </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Store Name</label>
                                        <div class="form-group">
                                            <input type="text" class="form-control" id="store" name="store"/>
                                        </div>
                                    </div>
                                </div>
                              <div class="col-md-6">
                                 <div class="form-group">
                                    <label>&nbsp;</label>
                                    <div class="button-items">
                                       <button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" id="search" name="search" onclick="app_refresh();"><i class="fas fa-filter"></i> Terapkan filter</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Receipt List Sales</h4>
                <table id="table_same_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Close Date</th>
                            <th>Store Code</th>
                            <th>Store Name</th>
                            <th>Transaction</th>
                            <th>Quantity</th>
                            <th>AMT</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

                <!-- <div id="morris-area-example" class="morris-charts morris-charts-height" dir="ltr"></div> -->
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
	// START VARIABEL WAJIB
	var Modules = '<?=$modules?>';
	var Controller = '<?=$controller?>';
	var Priv = JSON.parse('<?=json_encode($priv_arr)?>');
	var data2Send = null;
	var dataArr = [];
    var DataTable = null;
	// END VARIABEL WAJIB
   
   $.getScript(['<?=base_url()?>assets/js/modules/sales/receiptlist.js?v=<?=date('YmdHis').rand()?>'], function() {
      initPage();
   });
</script>
<!-- <script type="text/javascript">
   // START VARIABEL WAJIB
   var Modules = '<?=$modules?>';
   var Controller = '<?=$controller?>';
   var Priv = JSON.parse('<?=json_encode($priv_arr)?>');
   var data2Send = null;
   var dataArr = [];
   var DataTable = null;
   var DataAll = null;
   var DataFs = null;
   var DataMall = null;
   var DataJava = null;
   var DataNon = null;
   // END VARIABEL WAJIB
   var action = '<?=$action?>';
   var idData = null;

   LobiAdmin.loadScript([
      '<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis') . rand()?>'
   ], function() {
      initPage();
   });
</script> -->
