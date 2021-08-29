(function () {
	// JS construct
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			info_name: {
				required: true,
			},	
		},
		messages: {
			info_name: {
            required: "Field ini wajib terisi",
        },
		}
	});
	DataTable = $('#table_list_data').DataTable({ 
		"pageLength": 10,
		"numbers_length": 5,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
		},
		"columns": [
			{"data": "store_name"},
			{"data": "loc_id"},
			{"data": "loc_name"},
			{"data": "area_name"},
			{"data": "action", "width": 20, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 0,
				"orderable": true,
				"searchable": false,
			},
			{
				"targets": 4,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="app_edit(' + row.location_id + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="app_delete(0, ' + row.location_id + ', \'' + row.loc_name + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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

function Simpan() {
	if (!$('#form_input').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		id: idData,
		store_id: $('#store_id').val(),
		loc_id: $('#loc_id').val(),
		area_id: $('#area_id').val(),
		loc_name: $('#loc_name').val(),
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

function app_edit(id = null) {
	FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
	.then((data) => {
		if (data.result) {
			ResetForm();
			action = 'edit';
			let row = data.data;
			idData = row.location_id;
			$('#store_id').val(row.store_id);
			$('#store_name').val(row.store_name);
			$('#loc_id').val(row.loc_id);
			$('#area_id').val(row.area_id);
			$('#area_name').val(row.area_name);
			$('#loc_name').val(row.loc_name);
			$('#active').prop('checked', row.active == 1 ? true : false);
		} else {
			MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
		}
	})
	.catch((err) => {
		MsgBox.Notification(err.toString(), 'bottom right', 'warning');
	});
}

function app_delete(multi = 0, id = null, menu_id = '') {
	if (multi) {
		if (dataArr.length <= 0) {
			MsgBox.Notification('Checklist terlebih dahulu data yang akan dihapus.', 'bottom right', 'info');
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
		MsgBox.Confirm('Hapus menu ' + menu_id + ' ?').then(result => {
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

function SearchStore() {
	$('#PopUpModal').load(base_url + 'master/location/getStoreList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['store_id', 'store_name']);
		$('#list_controls').val(['#store_id', '#store_name']);
	});
}

function ClearStore() {
	$('#store_id').val('');
	$('#store_name').val('');
}

function SearchArea() {
	$('#PopUpModal').load(base_url + 'master/location/getAreaList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['area_id', 'area_name']);
		$('#list_controls').val(['#area_id', '#area_name']);
	});
}

function ClearArea() {
	$('#area_id').val('');
	$('#area_name').val('');
}
// END function default

function ResetForm() {
	action = 'create';
	$('#active').prop('checked', true);
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}