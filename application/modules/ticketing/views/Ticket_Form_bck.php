<style type="text/css">
   .disable {
      background: #DDD !Important;
   }

   #po-form-selected {
      display: none;
   }
</style>
<div class="main">
   <div class="row margin-bottom-15 padding-left-10">
      <div class="col-md-12">
         <button type="button" class="btn btn-outline-dark waves-effect waves-light" id="kembali" name="kembali" onclick="Kembali()"> <span class="btn-label"><i class="glyphicon glyphicon-chevron-left"></i></span> Kembali </button>
         <div class="pull-right">
            <button type="button" class="btn btn-success waves-effect waves-light" id="simpan" name="simpan" onclick="Simpan();"> <span class="btn-label"><i class="glyphicon glyphicon-floppy-saved"></i></span> Simpan </button>

         </div>
      </div>
   </div>
   <div class="row padding-horizontal-10">
      <div class="col-md-12 mt-3">
         <div class="card">
            <div class="card-body">
               <form id="form_header" name="form_header" role="form" class="lobi-form">
                  <legend>
                     Form Ticket
                     <div class="pull-right" id="doc_no">
                        <!-- PO-202006000001 -->
                        <!-- <label class="control-label">No Doc</label> -->
                        <input class="form-control disable" type="text" id="doc_no_val" name="doc_no_val" value="" readonly>
                     </div>
                  </legend>
                  <div class="row padding-horizontal-10">
                     <div class="form-group col-md-3" id="doc_date_container">
                        <label class="control-label">Tanggal Ticket <span class="text-danger">*</span></label>
                        <div class="input-group date">
                           <input type="text" class="form-control font-size-sm" placeholder="Tanggal Ticket" id="doc_date" name="doc_date" value="<?=date('Y-m-d h:i:s')?>">
                           <div class="input-group-append">
                              <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                           </div>
                        </div>
                     </div>
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
                            <select class="form-control type" id="kd_store" name="kd_store">
                                <option value="">- Choose Store -</option>
                                <?php foreach ($this->db->get('m_store')->result() as $key => $value): ?>
                                <option value="<?php echo $value->kd_store ?>" data-name="<?php echo $value->nm_store; ?>">
                                    <?php echo $value->nm_store; ?></option>
                                <?php endforeach ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>User Name *</label>
                            <select class="form-control type" id="user_id" name="user_id">
                                <option value="">- Choose Store -</option>
                                <?php foreach ($this->db->get('app_users')->result() as $key => $value): ?>
                                <option value="<?php echo $value->user_id ?>" data-name="<?php echo $value->name; ?>">
                                    <?php echo $value->name; ?></option>
                                <?php endforeach ?>
                            </select>
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
                            <textarea class="form-control" id="pesan" name="pesan" rows="6" cols="50" value=""></textarea>
                        </div>
                    </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>

</div>

<style>
   [contenteditable="true"].single-line {
      white-space: nowrap;
      width: 200px;
      overflow: hidden;
   }

   [contenteditable="true"].single-line br {
      display: none;

   }

   [contenteditable="true"].single-line * {
      display: inline;
      white-space: nowrap;
   }
</style>

<script type="text/javascript">
   // START VARIABEL WAJIB
   var Modules = '<?=$modules?>';
   var Controller = '<?=$controller?>';
   var Priv = JSON.parse('<?=json_encode($priv_arr)?>');
   var data2Send = null;
   var action = '<?=$action?>';
   var _id = "<?=$action == 'edit' ? $id : 'null'?>";
   // END VARIABEL WAJIB

   var _dataTable = null;
   var DataTableAction = 'create';
   var DataTableRowIdx = 0;
   var data4DataTable = [];

   LobiAdmin.loadScript([
      '<?=base_url()?>assets/js/lib/autoNumeric/autoNumeric.js',
      '<?=base_url()?>assets/js/lib/accounting/accounting.min.js',
   ], function() {
      LobiAdmin.loadScript([
         '<?=base_url()?>assets/js/lib/autoNumeric/init.js',
         '<?=base_url()?>assets/js/lib/accounting/init.js',
      ], function() {
         LobiAdmin.loadScript([
            '<?=base_url()?>assets/js/modules/' + Modules + '/' + Controller + '.form.js?v=<?=date('YmdHis') . rand()?>',
         ], function() {
            initPage();
         });
      });
   });
</script>