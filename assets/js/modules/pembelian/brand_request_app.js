(function () {
	// JS construct
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			brand_name_request: {
				required: true,
			},	
		},
		messages: {
			brand_name_request: {
            required: "Field ini wajib terisi",
		},
		brand_id: {
            required: "Field ini wajib terisi",
        },
		}
	});
	
	DataTable = $('#table_list_data').DataTable({ 
		"pageLength": 10,
		"numbers_length": 4,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
			"data": function ( d ) {
				d.active = $('#filter_status').val();
			},
		},
		"columns": [
			{"data": "brand_id"},
			{"data": "brand_name"},
			{"data": "brand_name_request"},
			{"data": "status", "width": 40, "className": "text-center"},
			{"data": null, "width": 40, "className": "text-center"},
      ],
		"columnDefs": [
			
			{
				"targets": 3,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.status == 1){
						return '<span class="badge badge-success text-center">Approved</span>';
					} else if  (row.status == 2){
						return '<span class="badge badge-danger text-center">Not pproved</span>';					
					}else {
						return '<span class="badge badge-purple text-center">Waiting for Approval</span>';
					}
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = '<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="glyphicon glyphicon-pencil"></i> </button> ';
					}					
					return actions;
				},
			},
		],
	});
}

// START function default

function app_create() { 
	window.location.href = '#' + Modules + '/' + Controller + '/create';
}

function app_edit(id = null) {
	FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
	.then((data) => {
		if (data.result) {
			ResetForm();
			action = 'edit';
			let row = data.data;
			idData = row.id
			$('#brand_id').val(row.brand_id); $('#brand_id').prop('readonly', true);
			$('#brand_name').val(row.brand_name);
			$('#brand_name_request').val(row.brand_name_request);
			$('#active').prop('checked', row.status == 1 ? true : false);
		} else {
			MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
		}
	})
	.catch((err) => {
		MsgBox.Notification(err.toString(), 'bottom right', 'warning');
	});
}


function Simpan() {
	if (!$('#form_input').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		id: idData,
		brand_id: $('#brand_id').val(),
		brand_name: $('#brand_name').val(),
		brand_name_request: $('#brand_name_request').val(),
		active: $('#active').is(':checked') ? 1 : 2
		
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				ResetForm();
				app_refresh();
				data2Send = null;
				idData = null;
				$('#brand_id').prop('readonly', true);
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


function app_delete(multi = 0, id = null, menu_id = '') {
	if (multi) {
		if (dataArr.length <= 0) {
			MsgBox.Notification('Checklist terlebih dahulu data yang akan dihapus.', 'bottom right', 'brand');
			return;
		}
		data2Send = JSON.stringify({
			id: dataArr
		});
		MsgBox.Confirm('Hapus menu checklist ?').then(result => {
			FetchWithTimeout(base_url + Modules + '/' + Controller + '/delete/', data2Send, 'POST', 5000)
			.then((data) => {
				if (data.result) {
					MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
					app_refresh();
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
	} else {
		data2Send = JSON.stringify({
			id: id
		});
		MsgBox.Confirm('Yakin Data tsb mau di hapus ?').then(result => {
			FetchWithTimeout(base_url + Modules + '/' + Controller + '/delete/', data2Send, 'POST', 5000)
			.then((data) => {
				if (data.result) {
					MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
					app_refresh();
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
}

function app_pdf() {
	window.open(base_url + Modules + '/' + Controller + '/pdf/', '_blank');
}

function app_xls() {
	window.open(base_url + Modules + '/' + Controller + '/xls/', '_blank');
}

function app_refresh() {
	data2Send = null;
	DataTable.ajax.reload(null,true);
}

function Add2Arr(CheckAll = 0, id = null) {
	if (CheckAll) {
		dataArr = []; 
		let chkboxes = $('input[name=\'chk\']');
		for (let i = 0; i < chkboxes.length; i++) {
			if ($('#CheckAll').is(':checked')) {
				$('#chk_' + i).prop('checked', true);
				dataArr.push(parseInt($('#chk_' + i).val()));
			} else {
				$('#chk_' + i).prop('checked', false);
			}
		}
	} else {
		if (dataArr.indexOf(id) > -1) {
			dataArr.splice(dataArr.indexOf(id), 1);
		} else {
			dataArr.push(id);
		}
		$('#CheckAll').prop('checked', false);
	}
}

function Filter() {
	DataTable.ajax.reload(null,true);
}

// END function default

function ResetForm() {
	action = 'create';
	$('#brand_id').prop('readonly', true);
	$('#active').prop('checked', true);
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}


function LOVBrand() {	
	$('#PopUpModal').load(base_url + 'b2b/brand_request/getBrandList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class', 'modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['brand_id', 'brand_name']);
		$('#list_controls').val(['#brand_id', '#brand_name']);
	});
}

function LOVBrandClear() {
	$('#brand_id').val(''); $('#brand_name').val('');
}







