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
		"processing": false,
		"serverSide": true,
		"scrollX": true,
		"scrollY": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
			"data": function ( d ) {
				d.active = $('#filter_status').val();
				
			},
		},
		"columns": [
			{"data": "periode", "width": 8},
			{"data": "employee_id"},
			{"data": "employee_name", "width": 100},
			{"data": "store_name", "width": 50},
			{"data": "jabatan_name", "width": 50},
			{"data": "divisi_name", "width": 100},
			{"data": "join_date", "width": 75},
			{"data": "total_nilai", "width": 75},
			{"data": "code_nilai", "width":50},
            {"data": "atasan", "width": 50},
            {"data": "atasan_penilai", "width":50},
			{"data": "active", "width": 20, "classname": "text-center"},
			{"data": null, "width": 80, "className": "text-center"}
      ],
		"columnDefs": [			
			{ 
				"targets": 6,
				"orderable": true,
				"searchable": false,
			},
			{
				"targets": 7,
				"orderable": true,
				"searchable": false,
			},
			{
				"targets": 11,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.active == 1){
						return '<span class="label label-success text-center">APPROVE</span>';
					} else {
						return '<span class="label label-danger text-center">BELUM APPROVE</span>';
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
						actions = '<a href="#' + Modules + '/' + Controller + '/edit/' + row.id + '" class="btn btn-pretty btn-cyan btn-xs"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					if (Priv.confirm_flag == 0) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-success btn-xs" onclick="app_approve(0, ' + row.id + ', \'' + row.employee_id + '\');"><i class="glyphicon glyphicon-ok"></i> </a> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="app_delete(0, ' + row.id + ', \'' + row.employee_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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

function app_approve(multi = 0, id = null, menu_id = '') {	
	if (multi) {
		if (dataArr.length <= 0) {
			MsgBox.Notification('Checklist terlebih dahulu data yang akan di approve.', 'bottom right', 'info');
			return;
		}
		data2Send = JSON.stringify({
			id: dataArr
		});
		MsgBox.Confirm('Approve Data ?').then(result => {
			FetchWithTimeout(base_url + Modules + '/' + Controller + '/approve/', data2Send, 'POST', 5000)
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
		MsgBox.Confirm('Approve Data ?').then(result => {
			FetchWithTimeout(base_url + Modules + '/' + Controller + '/approve2/', data2Send, 'POST', 5000)
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
		//alert(base_url + Modules + '/' + Controller + '/delete/');
		//alert (data2Send);
		MsgBox.Confirm('Hapus penilaian ' + menu_id + ' ?').then(result => {
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
	//$('#form_filter').prop('action', base_url + Modules + '/' + Controller + '/pdf/');
  	//$('#form_filter').prop('target', '_blank');
  	//$('#form_filter').prop('method', 'POST');
	  //document.getElementById('form_filter').submit();

		window.open(base_url + Modules + '/' + Controller + '/pdf/', '_blank');
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

function LOVAtasan() {
	$('#PopUpModal').load(base_url + 'hc/karyawan/getKaryawanList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['employee_id', 'employee_name','jabatan_name']);
		$('#list_controls').val(['#filter_employee_id', '#filter_employee_name','#filter_jabatan']);
	});
}

function LOVAtasanClear() {
	$('#filter_employee_id').val('');
	$('#filter_employee_name').val('');
	$('#filter_jabatan').val('');
}

function LOVFilterDivisi() {
	$('#PopUpModal').load(base_url + 'hc/divisi/getDivisiList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['divisi_code', 'divisi_name']);
		$('#list_controls').val(['#filter_divisi_code', '#filter_divisi_name']);
	});
}

function LOVFilterDivisiClear() {
	$('#filter_divisi_code').val('');
	$('#filter_divisi_name').val('');
}

function LOVFilterStore() {
	$('#PopUpModal').load(base_url + 'administrasi/store/getStoreList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['store_id', 'store_name']);
		$('#list_controls').val(['#filter_store_id', '#filter_store_name']);
	});
}

function LOVFilterStoreClear() {
	$('#filter_store_id').val('');
	$('#filter_store_name').val('');
}
