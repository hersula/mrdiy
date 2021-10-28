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
                        <h4 class="alert-heading font-18">INPUT TICKET</h4>
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
                  <div class="row padding-horizontal-20">
                    <div class="col-md-9"><span class="pull-right">
                        <div class="form-group">
                            <label>No. Doc</label>
                            <input type="text" class="form-control nodoc" id="no_doc" name="no_doc" value="" readonly="false" />
                        </div>
                </span></div>
                  </div>
                  <div class="row padding-horizontal-10">
                     <div class="col-md-3">
                        <div class="form-group">
                            <label>Site *</label>
                            <select class="form-control site" id="kd_site" name="kd_site">
                                <option value="">- Choose Site -</option>
                                <?php foreach ($this->db->get('m_site')->result() as $key => $value): ?>
                                <option value="<?php echo $value->kd_site ?>" data-name="<?php echo $value->nm_site; ?>">
                                    <?php echo $value->nm_site; ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Type *</label>
                            <select class="form-control type" id="kd_type" name="kd_type">
                                <option value="">- Choose Type -</option>
                                <?php foreach ($this->db->get('m_type')->result() as $key => $value): ?>
                                <option value="<?php echo $value->kd_type ?>" data-name="<?php echo $value->nm_type; ?>">
                                    <?php echo $value->nm_type; ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Category *</label>
                            <select class="form-control type" id="kd_category" name="kd_category">
                                <option value="">- Choose Category -</option>
                                <?php foreach ($this->db->get('m_category')->result() as $key => $value): ?>
                                <option value="<?php echo $value->kd_category ?>" data-name="<?php echo $value->nm_category; ?>">
                                    <?php echo $value->nm_category; ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                    </div>
                  </div>
                  <div class="row padding-horizontal-10 mt-3">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Priority *</label>
                            <select class="form-control site" id="kd_priority" name="kd_priority">
                                <option value="">- Choose Priority -</option>
                                <?php foreach ($this->db->get('m_priority')->result() as $key => $value): ?>
                                <option value="<?php echo $value->kd_priority ?>" data-name="<?php echo $value->nm_priority; ?>">
                                    <?php echo $value->nm_priority; ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Status *</label>
                            <select class="form-control type" id="kd_progres" name="kd_progres">
                                <option value="">- Choose Status -</option>
                                <?php foreach ($this->db->get('m_progres')->result() as $key => $value): ?>
                                <option value="<?php echo $value->kd_progres ?>" data-name="<?php echo $value->nm_progres; ?>">
                                    <?php echo $value->nm_progres; ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Store *</label>
                            <div class="input-group">
                                <input type="hidden" class="form-control font-size-sm ignore" id="kd_store" name="kd_store"
                                    value="" placeholder="Store Name">
                                <input type="text" class="form-control font-size-sm ignore" id="nm_store"
                                    name="nm_store" value="" placeholder="Store Name" readonly />
                                <div class="input-group-append">
                                    <button class="btn btn-outline-info btn-sm waves-effect waves-light" type="button"
                                        onclick="LOVDefStore();"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="row padding-horizontal-10 mt-3">
                    <div class="col-md-9">
                        <div class="form-group">
                            <label>Subject *</label>
                            <input type="text" class="form-control" id="subject" name="subject" value="" />
                        </div>
                    </div>
                  </div>
                  <div class="row padding-horizontal-10 mt-3">
                    <div class="col-md-9">
                        <div class="form-group">
                            <label>Message *</label>
                            <!-- <textarea class="form-control" id="pesan" name="pesan" rows="6" cols="50" value=""></textarea> -->
                            <textarea id="elm1" name="area"></textarea>
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

