(function () {
	$('#filter').lobiPanel({
			reload: false,
			close: false,
			editTitle: false,
			unpin: false,
			expand: false
	});
	
	
	$('#list_data').lobiPanel({
			reload: false,
			close: false,
			editTitle: false,
			unpin: false,
			//bodyHeight: 500
	});
	
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	
	DataTable = $('#table_list_data').DataTable({ 
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
			"data": function ( d ) {
				d.active = $('#filter_status').val();
				d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "divisi_code", "width": 50},
			{"data": "store_name", "width" : 50},
			{"data": "employee_id"},
			{"data": "employee_name", "width": 100},
			{"data": "jabatan_name", "width": 100},
			{"data": "atasan_name", "width": 100},			
			{"data": "join_date", "width": 75},
			{"data": "employee_status", "width": 40, "className": "text-center"},
			{"data": "kelamin", "width": 40, "classname": "text-center"},
			{"data": "active", "width": 40, "classname": "text-center"},
			{"data": null, "width": 70, "className": "text-center"}
      ],
		"columnDefs": [		
			{
				"targets":6,
				"orderable": true,
				"searchable": false,
			},	
			{ 
				"targets": 7,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.employee_status == 1) {
						return '<span class="label label-primary text-center">TETAP</span>';
					}
					if (row.employee_status == 2) {
						return '<span class="label label-primary text-center">KONTRAK</span>';
					}
					if (row.employee_status == 3) {
						return '<span class="label label-primary text-center">TRAINING</span>';
					}
					if (row.employee_status == 4) {
						return '<span class="label label-primary text-center">PROBITION</span>';
					}
					if (row.employee_status == 5) {
						return '<span class="lable label-primary text-center">KHL</span>';
					}					
				},
			},
			{
				"targets": 8,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.kelamin == 1) {
						return '<span class="badge badge-warning text-center">PRIA</span>';
					} else {
						return '<span class="badge badge-default text-center">WANITA</span>';
					}
				},
			},
			{
				"targets": 9,
				"orderable": true,
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
						//actions = actions + '<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.employee_id + '\');"><i class="fas fa-trash"></i></button>';
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

function app_edit(toolbar = 0, id = null) {
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

// END function default

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

function Search() {
	// Jika form tidak bernilai true maka berhenti.
	if (!$('#form_search').valid()) {
		return;
	}
	
	data2Send = JSON.stringify({
		Pencarian: SrcOpt.getObjPencarian(),
		active: $('#active').val()
	});
}


