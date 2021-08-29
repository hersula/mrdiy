(function () {
	// JS construct
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			role_id: {
				required: true,
				nowhitespace: true
			},	
			role_name: {
				required: true
			},
			desc: {
				required: true
			},
		},
		messages: {
			role_id: {
            required: "Field ini wajib terisi",
            nowhitespace: "Spasi tidak diperbolehkan"
        },
		  role_name: {
            required: "Field ini wajib terisi",
        },
		  desc: {
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
		},
		"columns": [
			{"data": "role_id", "width": 100},
			{"data": "role_name", "width": 150},
			{"data": "desc", "width": 150},
			{"data": "menu_name", "width": 100},
			{"data": null, "width": 40, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (Priv.edit_flag == 1) {	
						actions = '<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="fas fa-pencil-alt"></i></button> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.role_id + '\');"><i class="fas fa-trash"></i></button>';
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
	//let list_input = ['def_menu_id', 'def_menu_name'];
	//if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
	//	MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
	//	return;
	//}
	
	data2Send = JSON.stringify({
		role_id: $('#role_id').val(),
		role_name: $('#role_name').val(),
		desc: $('#desc').val(),
		def_menu_id: $('#def_menu_id').val(),
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
			$('#role_id').val(row.role_id); $('#role_id').prop('readonly', true);
			$('#role_name').val(row.role_name);
			$('#desc').val(row.desc);
			$('#def_menu_id').val(row.def_menu_id);
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

// END function default

function ResetForm() {
	action = 'create';
	$('#role_id').prop('readonly', false);
	$('#def_menu_id').val('');
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function LOVDefMenu() {
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getMenuList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['menu_id', 'menu_name']);
		$('#list_controls').val(['#def_menu_id', '#def_menu_name']);
	});
}

function LOVDefMenuClear() {
	$('#def_menu_id').val('');
	$('#def_menu_name').val('');
}