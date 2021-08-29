(function () {
	// JS construct

	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/' + id, null, 'GET')
		.then((data) => {
			if (data.result) {
                ResetForm();
                action = 'edit';
                let row = data.data;
                $('#store_id').val(row.store_id); $('#store_name').val(row.store_name);
                $('#bank_id').val(row.bank_id); $('#bank_name').val(row.bank_name);
                $('#mid').val(row.mid);
                $('#jaringan').val(row.jaringan);
				$('#status').prop('checked', row.status == 1 ? true : false);
				// TID
				let list_tid = JSON.parse(row.tid);
				DataTableTIDRows = list_tid.tid;
            } else {
                MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
            }
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
		});
	}

})();

function initPageForm(){
	setTimeout(() => {
		LoadDataTable();
	}, 500);
	$("#form_input").validate({
		rules: {
			store_id: {
				required: true,
			},	
			bank_id: {
				required: true,
			},
			mid: {
				required: true
			},
		},
		messages: {
			store_id: {
            required: "Field ini wajib terisi",
        },
		  bank_id: {
            required: "Field ini wajib terisi",
        },
		  mid: {
            required: "Field ini wajib terisi",
		  },
		}
	});
	
}

function LoadDataTable() {
	// DataTable untuk daya listrik
	DataTableTID = $('#table_list_tid').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableTIDRows,
		"columns": [
			{"data": "list_tid"},
			{"data": null, "width": 70, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="EditInfoTid(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="HapusInfoTid(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});
}

// START function default

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller;
}

function Simpan() {
	// windows.location.href ='#' + Modules + '/' + Controller;

	let list_input = ['store_id', 'bank_id', 'mid', 'jaringan'];
	if (!$('#form_input').validate() || !ValidasiInput(list_input)) {
      MsgBox.Notification('Periksa kembali inputan anda', 'Input tidak lengkap', 'warning');
     return;
   }

   let info_tid = {
	list_tid: DataTableTID.rows().data().toArray(),
   }
	
	data2Send = JSON.stringify({
		store_id: $('#store_id').val(),
		bank_id: $('#bank_id').val(),
		mid: $('#mid').val(),
		jaringan: $('#jaringan').val(),
		tid: DataTableTID.rows().data().toArray(),
		status: $('#active').is(':checked') ? 1 : 0
	});
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST')
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				data2Send = null;
				window.location.href = '#' + Modules + '/' + Controller;
			} else {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
		});
	}).catch(err => {
		console.log(err);
	});
}

// END function default

// START Datatable

function SimpanRowDataTable(DataTableElement, data2save, RowIdx = null) {
	if (DataTableAction == 'edit') {
		DataTableElement.row(RowIdx).data(data2save).draw();
		// MsgBox.Notification('Data berhasil diperbaharui.', 'bottom right', 'success', 'mini', 1000);
	} else {
		DataTableElement.row.add(data2save).draw();
		// MsgBox.Notification('Data berhasil ditambahkan.', 'bottom right', 'success', 'mini', 1000);
	}
}

function HapusRowDataTable(DataTableElement, RowIdx = null) {
	// DataTableElement.row("#" + RowIdx).remove().draw();
	DataTableElement.row(RowIdx).remove().draw();
	// MsgBox.Notification('Data berhasil dihapus.', 'bottom right', 'success', 'mini', 1000);
}

function SimpanInfoTID() {
	// if (!$('#form_info_tid').valid()) {
	// 	MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
	// 	return;
	// }

	// Persiapkan inputan
	let data2save = { 
		list_tid: $('#list_tid').val()
	};
	// Simpan data
	SimpanRowDataTable(DataTableTID, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$("#list_tid").val("");
	$('#list_tid').focus();
	clearValidation('#form_info_tid');
}

function EditInfoTid(RowIdx) {
	// Ambil data
	let data2edit = DataTableTID.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#list_tid').val(data2edit.list_tid);
	$('#list_tid').focus();
}

function HapusInfoTid(RowIdx) {
	let getData = DataTableTID.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data TID ' + getData.list_tid  + ' ini?').then(result => {
		HapusRowDataTable(DataTableTID, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

function ResetForm() {
	$('#module_code').prop('readonly', false);
	$('#module_active').prop('checked', true); // kembalikan checklist
	$('#form_input')[0].reset(); // Kosongkan input
	$('#form_input').reset();
}

function LOVToko() {
	$('#PopUpModal').load(base_url + 'administrasi/store/getStoreList/', () => {
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "600px"});
		$('#list_cols').val(['store_id','store_name']);
		$('#list_controls').val(['#store_id','#store_name']);
	});
}

function LOVTokoClear() {
	$('#store_id').val(''); $('#store_name').val('');
}

function LOVBank() {
    $('#PopUpModal').load(base_url + 'finance/bank/getBankList/', () => {
        $('#ModalLOV').modal('show');
        $(".modal-dialog").css({width: "600px"});
        $('#list_cols').val(['bank_id','bank_name']);
        $('#list_controls').val(['#bank_id','#bank_name']);
    });
}

function LOVBankClear() {
    $('#bank_id').val(''); $('#bank_name').val('');
}