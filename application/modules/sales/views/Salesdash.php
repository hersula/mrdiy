<div class="row">
    <div class="col-md-6">
        <div class="page-title-box">
            <h5>Dashboard Sales</h5>
            <ol class="breadcrumb m-0">
                <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                <li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                <li class="breadcrumb-item active">Selamat Datang</li>&nbsp;<b><?php echo $this->session->userdata('user_id'); ?></b>
            </ol>
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
                              <!-- <div class="col-md-1">
                                 <div class="form-group">
                                    <label>PIC</label>
                                    <input type="text" class="form-control font-size-sm ignore" name="filter_pic" id="filter_pic" value="" >
                                 </div>
                              </div> -->
                              <!-- <div class="col-md-3">
                                 <div class="form-group">
                                    <label>Store *</label>
                                    <div class="input-group">
                                       <input type="text" class="form-control font-size-sm ignore" id="filter_store" name="filter_store" value="" placeholder="Store Name" readonly />
                                       <div class="input-group-append">
                                          <button class="btn btn-outline-info btn-sm waves-effect waves-light"
                                             type="button" onclick="LOVDefStore();"><i class="fas fa-search"></i></button>
                                       </div>
                                    </div>
                                 </div>
                              </div> -->
                              <div class="col-md-2">
                                 <div class="form-group">
                                    <label class="control-label">Sales Date</label>
                                    <div class="input-group date">
                                       <input type="text" class="form-control font-size-sm ignore"
                                             id="filter_sales_date" name="filter_sales_date" value="<?=date('Y-m-d', strtotime("yesterday"));?>">
                                       <div class="input-group-append">
                                             <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                       </div>
                                    </div>
                                    <br>
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
                <h4 class="card-title mb-4">Same Store Sales</h4>
                <table id="table_same_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>LW</th>
                            <th>LW(%)</th>
                            <th>MTD</th>
                            <th>LM</th>
                            <th>LM(%)</th>
                            <th>LY</th>
                            <th>LY(%)</th>
                            <th>urut</th>
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
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">All Stores</h4>
                <table id="table_all_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>LW</th>
                            <th>LW(%)</th>
                            <th>MTD</th>
                            <th>LM</th>
                            <th>LM(%)</th>
                            <th>LY</th>
                            <th>LY(%)</th>
                            <th>urut</th>
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
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Freestanding</h4>
                <table id="table_fs_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>LW</th>
                            <th>LW(%)</th>
                            <th>MTD</th>
                            <th>LM</th>
                            <th>LM(%)</th>
                            <th>LY</th>
                            <th>LY(%)</th>
                            <th>urut</th>
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
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">MALL</h4>
                <table id="table_mall_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>LW</th>
                            <th>LW(%)</th>
                            <th>MTD</th>
                            <th>LM</th>
                            <th>LM(%)</th>
                            <th>LY</th>
                            <th>LY(%)</th>
                            <th>urut</th>
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
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">JAVA</h4>
                <table id="table_java_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>LW</th>
                            <th>LW(%)</th>
                            <th>MTD</th>
                            <th>LM</th>
                            <th>LM(%)</th>
                            <th>LY</th>
                            <th>LY(%)</th>
                            <th>urut</th>
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
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">NON JAVA</h4>
                <table id="table_non_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>LW</th>
                            <th>LW(%)</th>
                            <th>MTD</th>
                            <th>LM</th>
                            <th>LM(%)</th>
                            <th>LY</th>
                            <th>LY(%)</th>
                            <th>urut</th>
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
   var DataAll = null;
   var DataFs = null;
   var DataMall = null;
   var DataJava = null;
   var DataNon = null;
	// var DataTable = null;
	// END VARIABEL WAJIB
   
   $.getScript(['<?=base_url()?>assets/js/modules/' + Modules + '/salesdash.js?v=<?=date('YmdHis').rand()?>'], function() {
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
