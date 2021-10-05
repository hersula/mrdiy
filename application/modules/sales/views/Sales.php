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
                    <h2 class="mb-4"><?php echo number_format($trx);?></h2>
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
                    <h2 class="mb-4"><?php echo number_format($qty);?></h2>
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
                    <h2 class="mb-4">IDR <?=number_format($amt);?></h2>
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
                <h4 class="card-title mb-4">Total Sales per Store</h4>

                <div class="row text-center mt-4">
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
                </div>

                <div id="morris-area-example" class="morris-charts morris-charts-height" dir="ltr"></div>
            </div>
        </div>
    </div>
</div>


<script src="<?=base_url()?>assets/libs/morris.js/morris.min.js"></script>
<script src="<?=base_url()?>assets/libs/raphael/raphael.min.js"></script>
<script src="<?=base_url()?>assets/js/pages/dashboard.init.js"></script>
