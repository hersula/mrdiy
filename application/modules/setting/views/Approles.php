<div class="row">
   <div class="col-6">
      <div class="page-title-box">
         <div class="button-items">
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
               <h4 class="alert-heading font-18">App Roles</h4>
               <p>Roles (Peran/Bagian) digunakan sebagai pengaturan untuk hak akses setiap user, setiap user wajib memiliki role.</p>
            </div>
         </div>
      </div>
   </div>
</div>

<div class="row">
   <div class="col-4">
      <div class="card">
         <div class="card-body">
            <form id="form_input" name="form_input">
               <div class="row">
                  <div class="col-12">
                     <div class="form-group">
                        <label>Role Code *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Role Code" id="role_id" name="role_id" value="" maxlength="20" required pattern="\S{1,}" />
                     </div>
                  </div>
                  <div class="col-12">
                     <div class="form-group">
                        <label>Role Name *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Role Name" id="role_name" name="role_name" value="" maxlength="100" required />
                     </div>
                  </div>
                  <div class="col-12">
                     <div class="form-group">
                        <label>Deskripsi *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Deskripsi" id="desc" name="desc" value="" maxlength="100" />
                     </div>
                  </div>
                  <div class="col-12">
                     <div class="form-group">
                        <label>Default Menu *</label>
                        <div class="input-group">
                           <input type="text" class="form-control" placeholder="Default Menu" name="def_menu_id" id="def_menu_id" value="" />
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-6">
                     <div class="button-items">
                        <button type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light" id="reset_form" name="reset_form" onclick="ResetForm();"><i class="mdi mdi-repeat"></i> Reset</button> 
                     </div>
                  </div>
                  <div class="col-6 text-right">
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
   <div class="col-8">
      <div class="col-12">
         <div class="card">
            <div class="card-body">
               <table id="table_list_data" class="table table-striped table-bordered dt-responsive" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                        <th>Role Code</th>
                        <th>Role Name</th>
                        <th>Deskripsi</th>
                        <th>Def. Menu</th>
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