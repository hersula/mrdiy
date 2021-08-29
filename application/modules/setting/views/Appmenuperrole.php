<div class="row">
   <div class="col-md-6">
      <div class="page-title-box">
         <div class="button-items">
            <button type="button" class="btn btn-outline-success btn-sm waves-effect waves-light" role="button" id="app_create" onclick="Simpan();"> <i class="fas fa-save"></i> Simpan </button>
            <button type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light" id="app_refresh" name="app_refresh" onclick="app_refresh();"><i class="fas fa-sync"></i> Refresh </button>
         </div>
      </div>
   </div>
   <div class="col-6">
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
               <h4 class="alert-heading font-18">App roles menu</h4>
               <p>Digunakan untuk mengatur roles modules.</p>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="row">
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <form id="form_filter" name="form_filter">
               <div class="row">
                  <div class="col-md-3">
                     <div class="form-group">
                        <label>Role *</label>
                        <div class="input-group">
                           <input type="hidden" name="role_id" id="role_id" value="" readonly="readonly" />
                           <input type="text" class="form-control" placeholder="Pilih Role" name="role_name"
                              id="role_name" value="" readonly="readonly" />
                           <div class="input-group-append">
                              <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVRole();"><i class="fas fa-search"></i></button>
                              <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVRoleClear();"><i class="mdi mdi-close"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-2">
                     <div class="form-group">
                        <label>&nbsp;</label>
                        <div class="input-group">
                           <button type="submit" role="button" class="btn btn-primary waves-effect waves-light"
                              id="search" name="search" onclick="Proses();"><i class="fas fa-check"> </i> Proses
                           </button>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-5">
                     <div class="col-xs-5">
                        <div class="form-group">
                           <label>Pilih menu kemudian klik tambah</label>
                           <div class="input-group">
                              <select class="select2 form-control select2-multiple" id="menu_list" name="menu_list" multiple="multiple" multiple data-placeholder="Choose ...">                                 
                              <?php foreach ($menu_id->result() as $value) { ?>
                                    <option value="<?= $value->menu_id ?>"><?= $value->menu_name ?></option>
                                 <?php } ?>                             
                              </select>
                           </div>
                        </div>
                     </div>                     
                  </div>
                  <div class="col-md-2">
                     <div class="form-group">
                        <label>&nbsp;</label>
                        <div class="input-group">
                           <button type="submit" role="button" class="btn btn-warning waves-effect waves-light"
                              id="search" name="search" onclick="AddMenuToRole();"><i class="fas fa-plus-square"> </i> Tambah
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <table id="table_list_data" class="table table-striped table-bordered dt-responsive wrap"
               style="border-collapse: collapse; border-spacing: 0; width: 100%;">
               <thead>
                  <tr>
                  <th>Menu ID</th>
                     <th>Menu</th>
                     <th>Access</th>
                     <th>Create</th>
                     <th>Edit</th>
                     <th>Delete</th>
                     <th>Print</th>
                     <th>PDF</th>
                     <th>Xls/Csv</th>
                     <th>Confirm</th>
                     <th>Cancel</th>
                     <th class="text-center">Hapus</th>
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
   var action = '<?=$action?>';
   var proses = false;
   var dataArrMenu = {};
   
   LobiAdmin.loadScript([
      '<?=base_url()?>assets/libs/select2/js/select2.full.min.js',
      '<?=base_url()?>assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js',
      '<?=base_url()?>assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js',
      '<?=base_url()?>assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
      '<?=base_url()?>assets/libs/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js',
      '<?=base_url()?>assets/libs/admin-resources/bootstrap-filestyle/bootstrap-filestyle.min.js',
      '<?=base_url()?>assets/js/pages/form-advanced.init.js',    
      '<?= base_url() ?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?= date('YmdHis') . rand() ?>',
   ], function() {
      initPage();
   });
</script>