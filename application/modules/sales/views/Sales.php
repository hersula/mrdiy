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
    <div class="col-md-4">
        <div class="card mini-stat bg-info">
            <div class="card-body mini-stat-img">
                <div class="mini-stat-icon">
                    <i class="mdi mdi-book-open-page-variant float-right"></i>
                </div>
                <div class="text-white">                    
                    <h6 class="text-uppercase mb-3 font-size-16">Daily Transaction</h6>
                    <?php ?>
                    <h2 class="mb-4"><?=shortnumber($trx);?></h2>
                    <a href="#sales/transaction/index" class="text-light float-right">Detail per tanggal <?=date('d-m-Y', strtotime("yesterday")) ?><i class="mdi mdi-chevron-double-right"></i></a>
                </div>
            </div>
        </div>
    </div>    
    <div class="col-md-4">
        <div class="card mini-stat bg-info">
            <div class="card-body mini-stat-img">
                <div class="mini-stat-icon">
                    <i class="mdi mdi-briefcase-check float-right"></i>
                </div>
                <div class="text-white">
                    <h6 class="text-uppercase mb-3 font-size-16">Item Sold</h6>
                    <h2 class="mb-4"><?=shortnumber($qty);?></h2>
                    <a href="#sales/quantity/index" class="text-light float-right">Detail per tanggal <?=date('d-m-Y', strtotime("yesterday")) ?><i class="mdi mdi-chevron-double-right"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card mini-stat bg-info">
            <div class="card-body mini-stat-img">
                <div class="mini-stat-icon">
                    <i class="mdi mdi-buffer float-right"></i>
                </div>
                <div class="text-white">
                    <h6 class="text-uppercase mb-3 font-size-16">Balance</h6>
                    <h2 class="mb-4">IDR <?=shortnumber($amt);?></h2>
                    <a href="#sales/detsales/index" class="text-light float-right">Detail per tanggal <?=date('d-m-Y', strtotime("yesterday")) ?><i class="mdi mdi-chevron-double-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">Same Store Sales</h4>

                <!-- <div class="row text-center mt-4">
                    <div class="col-4">
                        <h5 class="font-size-20"><?=shortnumber($trx);?></h5>
                        <p class="text-muted">Transaction</p>
                    </div>
                    <div class="col-4">
                        <h5 class="font-size-20"><?=shortnumber($qty);?></h5>
                        <p class="text-muted">Item Sold</p>
                    </div>
                    <div class="col-4">
                        <h5 class="font-size-20">IDR <?=shortnumber($amt);?></h5>
                        <p class="text-muted">Balance</p>
                    </div>
                </div> -->

                <table id="table_list_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                    <thead>
                        <tr>
                            <th>Deskripsi</th>
                            <th>Today</th>
                            <th>lw</th>
                            <th>lw(%)</th>
                            <th>mtd</th>
                            <th>lm</th>
                            <th>lm(%)</th>
                            <th>ly</th>
                            <th>ly(%)</th>
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
   var action = '<?=$action?>';
   var idData = null;

   LobiAdmin.loadScript([
      '<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis') . rand()?>'
   ], function() {
      initPage();
   });
</script>
