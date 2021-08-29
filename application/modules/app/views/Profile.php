<div class="row">
   <div class="col-lg-12">
      <div class="margin-bottom-10">
         <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="#user_form" data-toggle="tab">Informasi user</a></li>
         </ul>
         <div class="tab-content bg-white padding-10">
            <div id="user_form" class="tab-pane active">
               <form class="lobi-form" id="form_input" name="form_input">
                  <div class="row">
                     <div class="col-xs-4">
                        <div class="form-group form-group-sm">
                           <label class="control-label">User ID </label>
                           <label class="input"> 
                              <span class="input-icon input-icon-prepend fa fa-user"></span>
                              <input type="text" class="form-control font-size-sm" placeholder="User ID" id="user_id" name="user_id" value="<?=$info_user['user_id']?>" maxlength="50" />
                              <span class="tooltip tooltip-top-right">User ID</span> </label>
                        </div>
                     </div>
                     <div class="col-xs-4">
                        <div class="form-group form-group-sm">
                           <label class="control-label">Password</label>
                           <label class="input"> <span class="input-icon input-icon-prepend fa fa-key"></span>
                              <input type="password" class="form-control font-size-sm" placeholder="Password" id="user_pass" name="user_pass" value="" maxlength="255" />
                              <span class="tooltip tooltip-top-right">Password</span> </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-xs-4">
                        <div class="form-group form-group-sm">
                           <label class="control-label">Nama </label>
                           <label class="input">
                              <input type="text" class="form-control font-size-sm" placeholder="Nama" id="name" name="name" value="<?=$info_user['name']?>" maxlength="50" />
                              <span class="tooltip tooltip-top-right">Nama</span> </label>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-xs-4">
                        <div class="form-group form-group-sm">
                           <label class="control-label">Role </label>
                           <label class="input">
                              <input type="hidden" name="role_id" id="role_id" value="<?=$info_user['role_id']?>" readonly="readonly" />
                              <input type="text" class="form-control font-size-sm ignore" placeholder="Role" id="role_name" name="role_name" value="<?=$info_user['role_name']?>" maxlength="50" readonly />
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-xs-12">
                        <button type="button" class="btn btn-labeled btn-pretty btn-success btn-sm font-size-sm pull-right" id="simpan" name="simpan" onclick="Simpan();"><span class="btn-label"><i class="glyphicon glyphicon-floppy-saved"></i></span>Simpan</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</div>

<script type="text/javascript">
	// START VARIABEL WAJIB
	var Modules = '<?=$modules?>';
	var Controller = '<?=$controller?>';
	var data2Send = null;
	var action = '<?=$action?>';
	var id = <?=$action == 'edit' ? $info_user['id'] : 'null'?>;
	// END VARIABEL WAJIB
	
	LobiAdmin.loadScript('<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis').rand()?>', function() {
      initPageForm();
   });
</script>