<style type="text/css">
   .disable {
      background: #DDD !Important;
   }

   #po-form-selected {
      display: none;
   }
</style>
<div class="main">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="alert alert-primary mb-0" role="alert">
                        <h4 class="alert-heading font-18">INPUT DOCUMENT LIBRARY</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
   <div class="row padding-horizontal-10">
      <div class="col-md-12 mt-3">
         <div class="card">
            <div class="card-body">
            <form id="form_input" name="form_input">
                  <div class="row padding-horizontal-10 mt-3">
                    <div class="col-md-9">
                        <div class="form-group">
                            <label>Judul *</label>
                            <input type="text" class="form-control" id="judul" name="judul" value="" />
                        </div>
                    </div>
                  </div>
                  <div class="row padding-horizontal-10 mt-3">
                    <div class="col-md-9">
                        <div class="form-group">
                            <label>Deskripsi *</label>
                            <!-- <textarea class="form-control" id="pesan" name="pesan" rows="6" cols="50" value=""></textarea> -->
                            <textarea id="description" name="description" class="form-control font-size-sm"></textarea>
                        </div>
                    </div>
                  </div>
                  <div class="row padding-horizontal-10 mt-3">

                      <div class="form-group form-group-sm col-md-8">
                          <label class="control-label">Upload Lampiran</label>
                          <input type="file" class="form-control font-size-sm" placeholder="File Lampiran" id="lampiran"
                              name="lampiran" value=""
                              accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/png, image/jpeg" />
                          *
                          max. 1
                          MB
                          <span class="tooltip tooltip-top-right">Upload Lampiran</span>
                      </div>
                  </div>
                  <div class="row padding-horizontal-10 mt-3">
                  <div class="col-md-6">
                     <div class="button-items">
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
               
               </form>
            </div>
         </div>
      </div>
   </div>

</div>
<script type="text/javascript">
   var Modules = '<?=$modules?>';
   var Controller = '<?=$controller?>';
   var Priv = JSON.parse('<?=json_encode($priv_arr)?>');
   var data2Send = null;
   var dataArr = [];
   var DataTable = null;
   // END VARIABEL WAJIB
   var action = '<?=$action?>';
   var idData = null;
   var id = <?=$action == 'edit' ? $id : 'null'?>;

   
   LobiAdmin.loadScript([
    '<?=base_url()?>assets/libs/tinymce/tinymce.min.js',
        '<?=base_url()?>assets/js/pages/form-editor.init.js',
      '<?= base_url() ?>assets/libs/select2/js/select2.full.min.js',
	   '<?= base_url() ?>assets/js/plugin/fileinput/fileinput.min.js',
      '<?= base_url() ?>assets/js/modules/' + Modules + '/' + Controller + '.form.js?v=<?= date('YmdHis') . rand() ?>',
   ], function() {
      initPage();
   });
</script>

