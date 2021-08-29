<div class="row">
   <div class="col-md-6">
      <div class="page-title-box">
         <div class="button-items">
            <button type="button" class="btn btn-outline-success btn-sm waves-effect waves-light" role="button" id="app_create" onclick="app_create();"> <i class="fas fa-plus"></i> Tambah </button>
            <button type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light" id="app_refresh" name="app_refresh" onclick="app_refresh();"><i class="fas fa-sync"></i> Refresh </button>
         </div>
      </div>
   </div>
   <div class="col-md-6">
      <div class="page-title-box text-right">
         <div class="button-items">
            <?php if ($priv_arr['pdf_flag']) { ?>
               <button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" id="app_pdf" name="app_pdf" onclick="app_pdf();"><i class="fas fa-file-pdf"></i> Pdf </button>
            <?php } ?>
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
            <div class="alert alert-info mb-0" role="alert">
               <h4 class="alert-heading font-18">App menu lists</h4>
               <p>Digunakan untuk setiap menu yang terlihat di side bar.</p>
            </div>
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
                              <div class="col-md-2">
                                 <div class="form-group">
                                    <label>Status</label>
                                    <select id="active" name="active" class="form-control">
                                       <option value="">SEMUA</option>
                                       <option value="1">AKTIF</option>
                                       <option value="0">TIDAK AKTIF</option>
                                    </select>
                                 </div>
                              </div>
                              <div class="col-md-2">
                                 <div class="form-group">
                                    <label>Module</label>
                                    <div class="input-group">
                                       <input type="hidden" name="module_code" id="module_code" value="" readonly="readonly" />
                                       <input type="text" class="form-control" placeholder="Module Name" name="module_name" id="module_name" value="" readonly="readonly" />
                                       <div class="input-group-append">
                                          <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button" onclick="LOVModule();"><i class="fas fa-search"></i></button>
                                          <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button" onclick="LOVModuleClear();"><i class="mdi mdi-close"></i></button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-md-2">
                                 <div class="form-group">
                                    <label>Parent Menu</label>
                                    <div class="input-group">
                                       <input type="hidden" name="parent_menu_code" id="parent_menu_code" value="" readonly="readonly" />
                                       <input type="text" class="form-control" placeholder="Module Name" name="parent_menu_name" id="parent_menu_name" value="" readonly="readonly" />
                                       <div class="input-group-append">
                                          <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button" onclick="LOVParentMenu();"><i class="fas fa-search"></i></button>
                                          <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button" onclick="LOVParentMenuClear();"><i class="mdi mdi-close"></i></button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-md-6">
                                 <div class="form-group text-right">
                                    <div class="button-items">
                                       <button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" id="search" name="search" onclick="Filter();"><i class="fas fa-filter"></i> Terapkan filter</button>
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
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <table id="table_list_data" class="table table-striped table-bordered dt-responsive wrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
               <thead>
                  <tr>
                     <th>Module Code</th>
                     <th>Module Name</th>
                     <th>P. Menu Code</th>
                     <th>P. Menu Name</th>
                     <th>Menu Code</th>
                     <th>Menu Name</th>
                     <th>Menu Desc</th>
                     <th>Menu Icon</th>
                     <th>Controller</th>
                     <th>Menu Def. Ctl</th>
                     <th>Sort</th>
                     <th class="text-center">Status</th>
                     <th class="text-center">Actions</th>
                  </tr>
               </thead>
               <tbody>
               </tbody>
            </table>
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
	
	$.getScript('<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis').rand()?>', function( data, textStatus, jqxhr ) {
      initPage();
   });
</script>