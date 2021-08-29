<div class="row">
   <div class="col-md-6">
      <div class="page-title-box">
         <div class="button-items">
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
   <!-- <?=$priv_html?>  -->
</div>

<div class="row">
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <div class="alert alert-info mb-0" role="alert">
               <h4 class="alert-heading font-18">App modules</h4>
               <p>Module ini akan digunakan sebagai <i>root</i> dari setiap menu yang ada, jika module tidak aktif maka semua <i>menu dan child-nya</i> tidak akan terbuka/terlihat.</p>
            </div>
         </div>
      </div>
   </div>
</div>

<div class="row">
   <div class="col-md-4">
      <div class="card">
         <div class="card-body">
            <form id="form_input" name="form_input">
               <div class="row">
                  <div class="col-md-12">
                     <div class="form-group">
                        <label>Module Code *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Module Code" id="module_id" name="module_id" value="" maxlength="50" required pattern="\S{1,}" />
                     </div>
                  </div>
                  <div class="col-md-12">
                     <div class="form-group">
                        <label>Module Name *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Module Name" id="module_name" name="module_name" value="" maxlength="100" required />
                     </div>
                  </div>
                  <div class="col-md-12">
                     <div class="form-group">
                        <label>Module Aktif</label><br />
                        <input type="checkbox" class="form-control" id="module_active" name="module_active" switch="success" value="1" checked />
                        <label for="module_active" data-on-label="Yes" data-off-label="No"></label>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6">
                     <div class="button-items">
                        <button type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light" id="reset_form" name="reset_form" onclick="ResetForm();"><i class="mdi mdi-repeat"></i> Reset</button> 
                     </div>
                  </div>
                  <div class="col-md-6 text-right">
                     <?php if ($priv_arr['create_flag'] || $priv_arr['edit_flag']) { ?>
                        <div class="button-items">
                           <button type="button" class="btn btn-outline-success btn-sm waves-effect waves-light" id="simpan" name="simpan" onclick="Simpan();"><i class="fas fa-save"></i> Simpan</button>
                        </div>
                     <?php } ?>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="col-md-8 pull-right">
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
                                       <select id="active" name="active" class="form-control font-size-sm">
                                          <option value="">SEMUA</option>
                                          <option value="1">AKTIF</option>
                                          <option value="0">TIDAK AKTIF</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div class="col-md-10 text-right">
                                    <label>&nbsp;</label>
                                    <div class="button-items">
                                       <a href="#" class="btn btn-outline-info btn-sm waves-effect waves-light" id="search" name="search" onclick="Filter();"><i class="fas fa-filter"></i> Terapkan filter</a>
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
               <table id="table_list_data" class="table table-striped table-bordered dt-responsive" cellspacing="0" width="100%">
                  <thead>
                     <tr>
                        <th>Module Code</th>
                        <th>Module Name</th>
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

   $.getScript('<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis').rand()?>', function( data, textStatus, jqxhr ) {
      initPage();
   });
</script>