(function () {
	// JS construct
})();

function Add2ArrMenu(menu_id = '', priv_flag = '') {
	action = 'edit';
	if (typeof dataArrMenu[menu_id] === 'undefined') {
		dataArrMenu[menu_id] = { [priv_flag]: $('#' + menu_id + '_' + priv_flag).is(':checked') ? 1 : 0 };
	} else {
		dataArrMenu[menu_id][priv_flag] = $('#' + menu_id + '_' + priv_flag).is(':checked') ? 1 : 0;
	}
	// console.log('dataArrMenu', dataArrMenu);
}

function initPage(){
	LobiAdmin.highlightCode();

	// DataTable
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
				d.role_id = $('#role_id').val();
			},
		},
		"columns": [
			{"data": "menu_id"},
			{"data": "menu_name"},
			{"data": "read_flag", "width": 25, "className": "text-center"},
			{"data": "create_flag", "width": 25, "className": "text-center"},
			{"data": "edit_flag", "width": 25, "className": "text-center"},
			{"data": "delete_flag", "width": 25, "className": "text-center"},
			{"data": "print_flag", "width": 25, "className": "text-center"},
			{"data": "pdf_flag", "width": 25, "className": "text-center"},
			{"data": "xls_flag", "width": 25, "className": "text-center"},
			{"data": "confirm_flag", "width": 25, "className": "text-center"},
			{"data": "cancel_flag", "width": 25, "className": "text-center"},
			{"data": null, "width": 20, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 2,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.read_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_read_flag" name="${row.menu_id}_read_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'read_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 3,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.create_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_create_flag" name="${row.menu_id}_create_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'create_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 4,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.edit_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_edit_flag" name="${row.menu_id}_edit_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'edit_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 5,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.delete_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_delete_flag" name="${row.menu_id}_delete_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'delete_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 6,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.print_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_print_flag" name="${row.menu_id}_print_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'print_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 7,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.pdf_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_pdf_flag" name="${row.menu_id}_pdf_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'pdf_flag')" ${ceklist}>  
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 8,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.xls_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_xls_flag" name="${row.menu_id}_xls_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'xls_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 9,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.confirm_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_confirm_flag" name="${row.menu_id}_confirm_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'confirm_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": 10,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let ceklist = row.cancel_flag == 1 ? 'checked' : '';
					return `<label class="checkbox lobicheck lobicheck-success lobicheck-inversed lobicheck-sm no-margin no-padding">
									<input type="checkbox" id="${row.menu_id}_cancel_flag" name="${row.menu_id}_cancel_flag" value="1" onclick="Add2ArrMenu('${row.menu_id}', 'cancel_flag')" ${ceklist}> 
									<i></i>
							</label>`;
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs no-margin" onclick="app_delete(0, ' + row.id + ', \'' + row.menu_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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
	if (isObjectEmpty(dataArrMenu)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		role_id: $('#role_id').val(),
		menu_arr: dataArrMenu
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				action = 'create';
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				app_refresh();
				data2Send = null;
				dataArrMenu = {};
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

function app_delete(multi = 0, id = null, param = '') {
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
		MsgBox.Confirm('Hapus menu ' + param + ' ?').then(result => {
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

// END function default

function LOVRole() {
	$('#PopUpModal').load(base_url + 'setting/approles/getRoleList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['role_id', 'role_name']);
		$('#list_controls').val(['#role_id', '#role_name']);
	});
}

function LOVRoleClear() {
	$('#role_id').val(''); $('#role_name').val('');
	app_refresh();
	proses = false;
}

function Proses() {
	proses = true;
	DataTable.ajax.reload(null,true);
}

function AddMenuToRole() {
	//print_r( "test");
	let list_input = ['role_id', 'menu_list'];
	if (!ValidasiInput(list_input) || !proses) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		role_id: $('#role_id').val(),
		menu_list: $('#menu_list').val(),
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Tambah menu').then(result => {
		let url = base_url + Modules + '/' + Controller + '/AddMenuToRole/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				$("#menu_list").select2("val", "");
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