
<div class="row">
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <div class="alert alert-primary mb-0" role="alert">
               <h4 class="alert-heading font-18">Akses User</h4>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="row">
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <form id="form_input" name="form_input">
               <div class="row">
                  <div class="col-md-4">
                     <div class="form-group">
                        <label>Employee *</label>
                        <div class="input-group">
                           <input type="hidden" name="employee_id" id="employee_id" value="" readonly="readonly" />
                           <input type="text" class="form-control font-size-sm" placeholder="Employee" name="employee_name" id="employee_name" value="" readonly="readonly" />
                           <div class="input-group-append">
                              <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVKaryawan();"><i class="fas fa-search"></i></button>
                              <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVKaryawanClear();"><i class="mdi mdi-close"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-4">
                     <div class="form-group">
                        <label>User ID *</label>
                        <span class="input-icon input-icon-prepend fa fa-user"></span>
                        <input type="text" class="form-control font-size-sm" placeholder="User ID" id="user_id" name="user_id" value="" maxlength="50" />
                     </div>
                  </div>
                  <div class="col-md-4">
                     <div class="form-group">
                        <label>Password *</label>
                        <span class="input-icon input-icon-prepend fa fa-key"></span>
                        <input type="password" class="form-control font-size-sm" placeholder="Password" id="user_pass" name="user_pass" value="" maxlength="255" />
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-4">
                     <div class="form-group">
                        <label>Role *</label>
                        <div class="input-group">
                           <input type="hidden" name="role_id" id="role_id" value="" readonly="readonly" />
                           <input type="text" class="form-control font-size-sm" placeholder="Role" name="role_name" id="role_name" value="" readonly="readonly" />
                           <div class="input-group-append">
                              <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVRole();"><i class="fas fa-search"></i></button>
                              <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVRoleClear();"><i class="mdi mdi-close"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-4">
                     <div class="form-group">
                        <label>Default Store *</label>
                        <div class="input-group">
                           <input type="hidden" name="def_store_id" id="def_store_id" value="" readonly />
                           <input type="text" class="form-control font-size-sm" placeholder="Default Store" name="def_store_name" id="def_store_name" value="" readonly />
                           <div class="input-group-append">
                              <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVDefStore();"><i class="fas fa-search"></i></button>
                              <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button"
                                 onclick="LOVDefStoreClear();"><i class="mdi mdi-close"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-12 mt-3">
                     <div class="form-group">
                        <label>Aktif</label><br />
                        <input type="checkbox" class="form-control" id="active" name="active" switch="success" value="1"
                           checked />
                        <label for="active" data-on-label="Yes" data-off-label="No"></label>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-6">
                     <div class="button-items">
                        <button type="button" class="btn btn-outline-secondary btn-sm waves-effect waves-light"
                           id="kembali" onclick="Kembali()">
                           <span class="btn-label"><i class="fas fa-chevron-left"></i></span> Kembali </button>
                        <button type="button" class="btn btn-outline-primary btn-sm waves-effect waves-light"
                           id="reset_form" name="reset_form" onclick="ResetForm();"><i class="mdi mdi-repeat"></i>
                           Reset</button>
                     </div>
                  </div>
                  <div class="col-md-6 text-right">
                     <?php if ($priv_arr['create_flag'] || $priv_arr['edit_flag']) { ?>
                     <div class="button-items">
                        <button type="button" class="btn btn-outline-success btn-sm waves-effect waves-light"
                           id="simpan" name="simpan" onclick="Simpan();"><i class="fas fa-save"></i>
                           Simpan</button>
                     </div>
                     <?php } ?>
                  </div>
               </div>
            </form>
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
	var action = '<?=$action?>';
	var id = <?=$action == 'edit' ? $id : 'null'?>;
    // END VARIABEL WAJIB
    // START Informasi TID
   var DataTableTID = null;
   var DataTableTIDRows = <?= $action == 'edit' ? '[]' : '[]' ?>;
	
   $.getScript('<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.form.js?v=<?=date('YmdHis').rand()?>', function( data, textStatus, jqxhr ) {
      initPageForm();
   });
</script>