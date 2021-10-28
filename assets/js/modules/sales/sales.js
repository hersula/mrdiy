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
			"url": base_url + Modules + '/' + Controller + '/getSameStore',
			"type": "POST",
			"data": function ( i ) {
				i.kd_progres = $('#kd_progres').val();
				// d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{"data": "today", "width" : 50},
			{"data": "lw", "width": 50},
			{"data": "plw", "width": 50},
			{"data": "mtd", "width": 50},			
			{"data": "lm", "width": 50},
			{"data": "plm", "width": 50},
			{"data": "ly", "width": 50},
			{"data": "ply", "width": 50}
      ],
	});

	DataAll = $('#table_all_data').DataTable({ 
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getAllStore',
			"type": "POST",
			"data": function ( i ) {
				i.kd_progres = $('#kd_progres').val();
				// d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{"data": "today", "width" : 50},
			{"data": "lw", "width": 50},
			{"data": "plw", "width": 50},
			{"data": "mtd", "width": 50},			
			{"data": "lm", "width": 50},
			{"data": "plm", "width": 50},
			{"data": "ly", "width": 50},
			{"data": "ply", "width": 50}
      ],
	});

	DataFs = $('#table_fs_data').DataTable({ 
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getFsStore',
			"type": "POST",
			"data": function ( i ) {
				i.kd_progres = $('#kd_progres').val();
				// d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{"data": "today", "width" : 50},
			{"data": "lw", "width": 50},
			{"data": "plw", "width": 50},
			{"data": "mtd", "width": 50},			
			{"data": "lm", "width": 50},
			{"data": "plm", "width": 50},
			{"data": "ly", "width": 50},
			{"data": "ply", "width": 50}
      ],
	});

	DataMall = $('#table_mall_data').DataTable({ 
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getMallStore',
			"type": "POST",
			"data": function ( i ) {
				i.kd_progres = $('#kd_progres').val();
				// d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{"data": "today", "width" : 50},
			{"data": "lw", "width": 50},
			{"data": "plw", "width": 50},
			{"data": "mtd", "width": 50},			
			{"data": "lm", "width": 50},
			{"data": "plm", "width": 50},
			{"data": "ly", "width": 50},
			{"data": "ply", "width": 50}
      ],
	});

	DataJava = $('#table_java_data').DataTable({ 
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getJavaStore',
			"type": "POST",
			"data": function ( i ) {
				i.kd_progres = $('#kd_progres').val();
				// d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{"data": "today", "width" : 50},
			{"data": "lw", "width": 50},
			{"data": "plw", "width": 50},
			{"data": "mtd", "width": 50},			
			{"data": "lm", "width": 50},
			{"data": "plm", "width": 50},
			{"data": "ly", "width": 50},
			{"data": "ply", "width": 50}
      ],
	});

	DataNon = $('#table_non_data').DataTable({ 
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getNonStore',
			"type": "POST",
			"data": function ( i ) {
				i.kd_progres = $('#kd_progres').val();
				// d.employee_status = $('#filter_status_karyawan').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{"data": "today", "width" : 50},
			{"data": "lw", "width": 50},
			{"data": "plw", "width": 50},
			{"data": "mtd", "width": 50},			
			{"data": "lm", "width": 50},
			{"data": "plm", "width": 50},
			{"data": "ly", "width": 50},
			{"data": "ply", "width": 50}
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


