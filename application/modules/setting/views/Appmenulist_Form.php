<div class="row">
   <div class="col-md-12">
      <div class="card">
         <div class="card-body">
            <div class="alert alert-primary mb-0" role="alert">
               <h4 class="alert-heading font-18">Info penginputan</h4>
               <p>Jika menu berdiri sendiri maka kosongkan bagian <strong>Parent Menu</strong>.</p>
         <p>Refresh halaman agar menu terlihat.</p>
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
                  <div class="col-md-3">
                     <div class="form-group">
                        <label>Module *</label>
                        <div class="input-group">
                           <input type="hidden" name="module_id" id="module_id" value="" readonly="readonly" />
                           <input type="text" class="form-control font-size-sm" placeholder="Module Name" name="module_name" id="module_name" value="" readonly="readonly" />
                           <div class="input-group-append">
                              <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button" onclick="LOVModule();"><i class="fas fa-search"></i></button>
                              <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button" onclick="LOVModuleClear();"><i class="mdi mdi-close"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-3">
                     <div class="form-group">
                        <label>Parent Menu</label>
                        <div class="input-group">
                           <input type="hidden" name="parent_menu_id" id="parent_menu_id" value="" readonly="readonly" />
                           <input type="text" class="form-control font-size-sm" placeholder="Parent Menu" name="parent_menu_name" id="parent_menu_name" value="" readonly="readonly" />
                           <div class="input-group-append">
                              <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button" onclick="LOVParentMenu();"><i class="fas fa-search"></i></button>
                              <button class="btn btn-outline-warning btn-sm waves-effect waves-light" type="button" onclick="LOVParentMenuClear();"><i class="mdi mdi-close"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-3">
                     <div class="form-group">
                        <label>Menu ID *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Menu ID" id="menu_id" name="menu_id" value="" maxlength="20" /> 
                     </div>
                  </div>
                  <div class="col-md-3">
                     <div class="form-group">
                        <label>Menu Name *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Menu Name" id="menu_name" name="menu_name" value="" maxlength="100" />
                     </div>
                  </div>
                  <div class="col-md-4">
                     <div class="form-group">
                        <label>Menu Desc</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Menu Desc" id="menu_desc" name="menu_desc" value="" maxlength="100" />
                     </div>
                  </div>
                  <div class="col-md-2">
                     <div class="form-group">
                        <label>Menu Icon</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Menu Icon" id="menu_icon" name="menu_icon" value="" maxlength="100" />
                     </div>
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-3">
                     <div class="form-group">
                        <label>Controller</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Controller" id="menu_ctl" name="menu_ctl" value="" maxlength="50" />
                     </div>                     
                  </div>
                  <div class="col-md-2">
                     <div class="form-group">
                        <label>Menu Default Controller</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Menu Default Controller" id="menu_ctl_def" name="menu_ctl_def" value="index" maxlength="50" />
                     </div>
                  </div>
                  <div class="col-md-1">
                     <div class="form-group">
                        <label>Sort *</label>
                        <input type="text" class="form-control font-size-sm" placeholder="Sort" id="sort_id" name="sort_id" value="1" maxlength="50" />
                     </div>
                  </div>
                  <div class="col-md-12 mt-3">
                     <div class="form-group">
                        <label>Menu Aktif</label><br />
                        <input type="checkbox" class="form-control" id="active" name="active" switch="success" value="1" checked />
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