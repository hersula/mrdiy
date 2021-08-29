(function () {
	// JS construct
})();

function initPage(){

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
				d.active = $('#active').val();
				d.module_id = $('#module_id').val();
				d.parent_menu_id = $('#parent_menu_id').val();
			},
		},
		"columns": [
			{"data": "module_id"},
			{"data": "module_name"},
			{"data": "parent_menu_id"},
			{"data": "parent_menu_name"},
			{"data": "menu_id"},
			{"data": "menu_name"},
			{"data": "menu_desc"},
			{"data": "menu_icon"},
			{"data": "menu_ctl"},
			{"data": "menu_ctl_def"},
			{"data": "sort_id"},
			{"data": "active", "width": 40, "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 10,
				"orderable": true,
				"searchable": false,
			},
			{
				"targets": 11,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.active == 1){
						return '<span class="badge badge-success text-center">Aktif</span>';
					} else {
						return '<span class="badge badge-danger text-center">Tidak Aktif</span>';
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
						actions = '<a href="#' + Modules + '/' + Controller + '/edit/' + row.id + '" class="btn btn-outline-info btn-sm waves-effect waves-light"><i class="glyphicon glyphicon-pencil"></i> </a> ';
						//actions = '<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="fas fa-pencil-alt"></i></button> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.user_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
						//actions = actions + '<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.menu_id + '\');"><i class="fas fa-trash"></i></button>';
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
	if (toolbar == 1 && dataArr.length <= 0) {
		MsgBox.Notification('Checklist terlebih dahulu data yang akan diedit.', 'bottom right', 'info');
		return;
	}
	
	if (toolbar) {
		window.location.href = '#' + Modules + '/' + Controller + '/edit/' + dataArr[0];
	} else {
		window.location.href = '#' + Modules + '/' + Controller + '/edit/' + id;
	}
}

function app_delete(multi = 0, id = null, menu_code = '') {
	if (multi) {
		if (dataArr.length <= 0) {
			MsgBox.Notification('Checklist terlebih dahulu data yang akan dihapus.', 'Peringatan', 'info');
			return;
		}
		data2Send = JSON.stringify({
			id: dataArr
		});
		MsgBox.Confirm('Hapus menu checklist ?').then(result => {
			FetchWithTimeout(base_url + Modules + '/' + Controller + '/delete/', data2Send, 'POST', 5000)
			.then((data) => {
				if (data.result) {
					MsgBox.Notification(data.msg.toString(), 'Hapus sukses', 'success');
					app_refresh();
				} else {
					MsgBox.Notification(data.msg.toString(), 'Hapus gagal', 'warning');
				}
			})
			.catch((err) => {
				MsgBox.Notification(err.toString(), 'Hapus gagal', 'warning');
			});
		}).catch(err => {
			console.log(err);
		});
	} else {
		data2Send = JSON.stringify({
			id: id
		});
		MsgBox.Confirm('Hapus menu ' + menu_code + ' ?').then(result => {
			FetchWithTimeout(base_url + Modules + '/' + Controller + '/delete/', data2Send, 'POST', 5000)
			.then((data) => {
				if (data.result) {
					MsgBox.Notification(data.msg.toString(), 'Hapus sukses', 'success');
					app_refresh();
				} else {
					MsgBox.Notification(data.msg.toString(), 'Hapus gagal', 'warning');
				}
			})
			.catch((err) => {
				MsgBox.Notification(err.toString(), 'Hapus gagal', 'warning');
			});
		}).catch(err => {
			console.log(err);
		});
		
	}
}

function app_pdf() {
	$('#form_filter').prop('action', base_url + Modules + '/' + Controller + '/pdf/');
  	$('#form_filter').prop('target', '_blank');
  	$('#form_filter').prop('method', 'POST');
  	document.getElementById('form_filter').submit();
}

function app_xls() {
	$('#form_filter').prop('action', base_url + Modules + '/' + Controller + '/xls/');
  	$('#form_filter').prop('target', '_blank');
  	$('#form_filter').prop('method', 'POST');
  	document.getElementById('form_filter').submit();
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
	$('#module_code').prop('readonly', false);
	$('#module_active').prop('checked', true); // kembalikan checklist
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function LOVModule() {
	$('#PopUpModal').load(base_url + 'setting/appmodules/getModuleList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");
		$('#list_cols').val(['module_code', 'module_name']);
		$('#list_controls').val(['#module_code', '#module_name']);
	});
}

function LOVModuleClear() {
	$('#module_code').val('');
	$('#module_name').val('');
}

function LOVParentMenu() {
	$('#PopUpModal').load(base_url + 'setting/appmenulist/getMenuList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");
		$('#list_cols').val(['menu_code', 'menu_name']);
		$('#list_controls').val(['#parent_menu_code', '#parent_menu_name']);
	});
}

function LOVParentMenuClear() {
	$('#parent_menu_code').val('');
	$('#parent_menu_name').val('');
}