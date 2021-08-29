<!-- Modal -->
<div class="modal fade" id="ModalLOV" tabindex="-1" role="dialog" aria-hidden="true">
  <!-- <div class="modal" id="ModalLOV" role="dialog"> -->
  <div class="modal-dialog ">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
		<h4 class="modal-title"><?=$Judul?></h4>
      </div>
      <div class="modal-body">
        <div class="row font-size-sm">
          <div class="col-md-12">
            <!-- PAGE CONTENT BEGINS -->
            <br />
            <table id="table_data_lov" name="table_data_lov" class="display compact nowrap table table-striped table-bordered table-hover" cellspacing="0" width="100%">
               <thead>
	               <!--<th class="text-center">Pilih</th>-->
               </thead>
               <tbody>
               </tbody>
            </table>
            <!-- PAGE CONTENT ENDS -->
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div>
      <div class="modal-footer">
		  <input type="hidden" id="list_cols" name="list_cols" />
        <input type="hidden" id="list_controls" name="list_controls" />
        <button type="button" class="btn btn-danger" data-dismiss="modal" id="close" onclick="closeModal()">
        	<i class="glyphicon glyphicon-remove"></i> Close 
        </button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
	var DataTableLOV = null;
	var src_url = '<?=$src_url?>';
	var end_point = '<?=$end_point?>';
	var ColHeader = <?=json_encode($ColHeader)?>;
	var ColShow = <?=json_encode($ColShow)?>;
	var DT_columns = <?=json_encode($columns)?>;
	var DT_columnDefs = <?=json_encode($columnDefs)?>;
	var tbody = '';
	
	function closeModal() {
		//console.log('closeModal');
		$("PopUpModalUser").empty();
	}
	
	function CreateHeaderTable(data) {
		var thead = ''; var col_src = '';
		$('#table_data_lov thead').remove();
		thead = '<thead><tr>'; // Pembuka
		$.each(data, function (index, value) {
		  if(ColShow[index] == 1) {
			 thead = thead + '<th>' + value + '</th>';
		  }
		});
		thead = thead + '<th>Pilih</th>';
		thead = thead + '</tr></thead>'; // Penutup
		$('#table_data_lov').append(thead);
	 }
	 
	function initDataTable() {
		// Tambahkan kolom untuk pilih data
		DT_columns.push({"data": null, "width": 40, "className": "text-center"});
		// Tambahkan column defs untuk pilih data
		DT_columnDefs.push({
			"targets": -1,
			"orderable": false,
			"searchable": false,
			"render": function ( data, type, full, meta ) {
				return '<button class="btn btn-outline-success btn-sm waves-effect waves-light" title="Ambil Value" onclick="SendValues(' + meta.row + ')"><i class="fa fa-check"></i> </button>';
			},
		});
		// Inisialisasi datatable
		DataTableLOV = $('#table_data_lov').DataTable({ 
			"pageLength" : 5,
			"pagingType": "simple",
			"lengthMenu": [5, 10, 20],
			"processing": true,
			"serverSide": true,
			"responsive": true,
			"ajax": {
				"url": src_url + '/nav/' + end_point,
				"type": "POST",
			},
			"columns": DT_columns,
			"columnDefs": DT_columnDefs,
		});	
	}
	
	function SendValues(idx) {
		let data2send = DataTableLOV.row( idx ).data()
		list_cols = $('#list_cols').val().split(',');
		list_controls = $('#list_controls').val().split(',');
		$.each(list_controls, function (i, v) {
			$(v).val(data2send[list_cols[i]]);
		});
		
		//$('#close').click();
		$('#ModalLOV').modal('hide');
	}
	
	function initPage() {
		CreateHeaderTable(ColHeader);
		initDataTable();
		
		$('#table_data_lov tbody').on('dblclick', 'tr', function () {
			//console.log(DataTableLOV.data());
			//console.log(DataTableLOV.row( this ).data());
			SendValues(DataTableLOV.row( this ).index());
			//$('#ModalLOV').modal('hide');
			closeModal();
		} );
		
		$('#ModalLOV').on('hidden.bs.modal', function () {
			closeModal();
		});
	}
	
	initPage();
</script>