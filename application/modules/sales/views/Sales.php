<style type="text/css">
   .disable {
      background: #DDD !Important;
   }

   #po-form-selected {
      display: none;
   }
</style>

<div class="main">
   <div class="row mt-3">
      <div class="col-md-12">
         <div class="card">
            <div class="card-body">
               <form id="form_filter" name="form_filter">
                  <div class="row">
                     <div class="col-lg-12">
                        <div class="card" style="border:solid 1px #3EB7BA;">
                           <div class="card-header bg-primary text-white">
                              <div class="row">
                                 <div class="col-lg-12">
                                    Filter Dashboard Sales
                                 </div>
                              </div>
                           </div>
                           <div class="card-body">
                            <div class="row mb-2">
                                <label class="col-2 col-form-label">Tanggal</label>
                                <div class="col-3">
                                    <div class="input-group date">
                                       <div class="input-daterange input-group" data-date-format="dd M, yyyy"  data-date-autoclose="true"  data-provide="datepicker">
                                          <input type="text" class="form-control" id="filter_start_date" name="filter_start_date" readonly />
                                       </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-10 offset-2">
                                    <!--<button type="button" class="btn btn-outline-danger waves-effect waves-light mr-2" id="btnRepPdf" name="btnRepPdf"><span class="btn-label"><i class="fas fa-file-pdf"></i></span> PDF</button>
                                    <button type="button" class="btn btn-outline-success waves-effect waves-light" id="btnRepXls" name="btnRepXls"><span class="btn-label"><i class="fas fa-file-excel"></i></span> XLS/CSV</button> -->
                                    <button type="button" class="btn btn-outline-success waves-effect waves-light" id="btnCek" name="btnCek"><span class="btn-label"><i class="fas fa-angle-right"></i> SUBMIT <i class="fas fa-angle-left"></i></span></button>
                                    <!-- <button type="button" class="btn btn-outline-success btn-sm waves-effect waves-light" role="button" id="app_create" onclick="app_create();"> <i class="fas fa-angle-right"></i> Submit </button> -->
                                </div>
                            </div>
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

<script type="text/javascript">
   // START VARIABEL WAJIB
   var Modules = '<?=$modules?>';
   var Controller = '<?=$controller?>';
   var Priv = JSON.parse('<?=json_encode($priv_arr)?>');
   var data2Send = null;
   var action = '<?=$action?>';
   var _id = "<?=$action == 'edit' ? $id : 'null'?>";
   // END VARIABEL WAJIB

   $.getScript('<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.js?v=<?=date('YmdHis') . rand()?>', function( data, textStatus, jqxhr ) {
      initPage();
   });
</script>