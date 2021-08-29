<div class="main">
   <div class="row margin-bottom-15">
      <a class="btn btn-pretty btn-labeled btn-primary btn-sm font-size-sm" id="app_refresh" name="app_refresh" onclick="app_refresh();"> <span class="btn-label"><i class="glyphicon glyphicon-refresh"></i></span>Refresh </a>
		<?php if ($priv_arr['pdf_flag']) { ?>
      <a class="btn btn-pretty btn-labeled btn-danger btn-sm font-size-sm" id="app_pdf" name="app_pdf" onclick="app_pdf();"> <span class="btn-label"><i class="fa fa-file-pdf-o"></i></span>Pdf </a>
      <?php } ?>
      <?php if ($priv_arr['xls_flag']) { ?>
      <a class="btn btn-pretty btn-labeled btn-light btn-sm font-size-sm" id="app_xls" name="app_xls" onclick="app_xls();"> <span class="btn-label"><i class="fa fa-file-excel-o"></i></span>Excel/CSV </a>
      <?php } ?>
      <!--<?=$priv_html?>--> 
   </div>

   <div class="row">
      <div class="col-xs-4">
         <form id="form_input" name="form_input" class="lobi-form">
            <legend>Form Add Location</legend>
            <div class="row">
               <div class="col-xs-12">
                  <div class="form-group form-group-sm">
                     <label class="control-label">Store Name *</label>
                     <label class="input">
                       <div class="input-group">
                         <input type="hidden" name="store_id" id="store_id" value="<?php echo $this->session->userdata("store_id") ?>" readonly="readonly" />
                         <input type="text" class="form-control font-size-sm ignore" placeholder="Store" name="store_id" id="store_name" value="<?php echo $this->db->get_where('m_store',array('store_id'=>$this->session->userdata('store_id')))->row()->store_name; ?>" readonly="readonly" />
                         <span class="input-group-btn">
                           <button class="btn btn-info btn-sm" type="button" onclick="SearchStore();"><i class="glyphicon glyphicon-search"></i></button>
                           <button class="btn btn-warning btn-sm" type="button" onclick="ClearStore();"><i class="glyphicon glyphicon-remove"></i></button>
                         </span>
                       </div>
                     </label>
                  </div>
                  <div class="form-group form-group-sm">
                     <label class="control-label">Location ID *</label>
                     <label class="input">
                     	<input type="number" id="loc_id" maxlength="5" name="loc_id" placeholder="Location ID" class="form-control" minlength="5">
                     </label>
                  </div>
                  <div class="form-group form-group-sm">
                     <label class="control-label">Area Name *</label>
                     <label class="input">
                       <div class="input-group">
                         <input type="hidden" name="area_id" id="area_id" value="" readonly="readonly" />
                         <input type="text" class="form-control font-size-sm ignore" placeholder="Area" name="area_id" id="area_name" value="" readonly="readonly" />
                         <span class="input-group-btn">
                           <button class="btn btn-info btn-sm" type="button" onclick="SearchArea();"><i class="glyphicon glyphicon-search"></i></button>
                           <button class="btn btn-warning btn-sm" type="button" onclick="ClearArea();"><i class="glyphicon glyphicon-remove"></i></button>
                         </span>
                       </div>
                     </label>
                  </div>
                  <div class="form-group form-group-sm">
                     <label class="control-label">Location Name *</label>
                     <label class="input">
                     	<input type="text" id="loc_name" maxlength="5" name="loc_name" placeholder="Location Name" class="form-control">
                     </label>
                  </div>
               </div>
               <div class="col-xs-12 margin-top-10">
                  <div class="form-group">
                  	<button type="button" class="btn btn-labeled btn-pretty btn-default btn-sm font-size-sm" id="reset_form" name="reset_form" onclick="ResetForm();"><span class="btn-label"><i class="glyphicon glyphicon-repeat "></i></span>Reset</button>
                     <?php if ($priv_arr['create_flag'] || $priv_arr['edit_flag']) { ?>
                        <button type="button" class="btn btn-labeled btn-pretty btn-success btn-sm pull-right font-size-sm" id="simpan" name="simpan" onclick="Simpan();"><span class="btn-label"><i class="glyphicon glyphicon-floppy-saved"></i></span>Simpan</button>
                     <?php } ?>
                  </div>
               </div>
            </div>
         </form>
      </div>
      <div class="col-xs-8 pull-right">
      	<div id="accordion" class="panel-group" role="tablist">
            <div class="panel panel-light">
               <div class="panel-heading collapsed" role="tab" id="headingTwo2"  data-toggle="collapse" data-parent="#accordion2" data-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo">
                  <h4 class="panel-title"> Filter <i class="fa fa-chevron-down icon-collapsed pull-right"></i> <i class="fa fa-chevron-up icon-expanded pull-right"></i> </h4>
               </div>
               <div id="collapseTwo2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo2">
                  <div class="panel-body">
                     <form id="form_filter" name="form_filter" role="form" class="lobi-form">
                        <div class="col-xs-2">
                           <div class="form-group form-group-sm">
                              <div>
                                 <label class="control-label">Status</label>
                              </div>
                              <div>
                                 <label class="input">
                                    <select id="filter_status" name="filter_status" class="form-control font-size-sm">
                                       <option value="">SEMUA</option>
                                       <option value="1">AKTIF</option>
                                       <option value="0">TIDAK AKTIF</option>
                                    </select>
                                 </label>
                              </div>
                           </div>
                        </div>
                        <div class="col-xs-10">
                           <div class="form-group form-group-sm pull-right">
                              <div>
                                 <label class="control-label">&nbsp;</label>
                              </div>
                              <div>
                                 <label class="input">
                                    <button type="submit" class="btn btn-labeled btn-info btn-sm font-size-sm" id="search" name="search" onclick="Filter();"> <span class="btn-label"><i class="glyphicon glyphicon-filter"></i></span>Terapkan filter </button>
                                 </label>
                              </div>
                           </div>
                        </div>
							</form>
                  </div>
               </div>
            </div>
         </div>
         
         <div class="main">
            <table id="table_list_data" class="display compact nowrap table table-striped table-bordered table-hover" cellspacing="0" width="100%">
               <thead>
                  <tr>
                    <th>Store Name</th>
                  	<th>Location ID</th>
                  	<th>Location Name</th>
                  	<th>Area</th>
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
   var action = '<?=$action?>';
   var idData = null;
	
	LobiAdmin.loadScript([
		'<?=base_url()?>assets/theme/js/plugin/select2/select2.min.js',
        '<?=base_url()?>assets/theme/js/plugin/fileinput/fileinput.min.js',		
		'<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis').rand()?>'
	], function() {
		initPage();
	});
</script>