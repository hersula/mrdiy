(function () {
	$('#filter').lobiPanel({
			reload: false,
			close: false,
			editTitle: false,
			unpin: false,
			expand: false
	});
		
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	
	DataTable = $('#table_list_data').DataTable({ 
		"pageLength" : 5,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
		},
		"columns": [
			{"data": "doc_no", "width": 50},
			{"data": "create_date", "width": 100},
			{"data": "type_name", "width": 100},
			{"data": "store_name", "width": 100},
			{"data": "created_by", "width": 100},
			{"data": null, "width": 100},
      ],
		"columnDefs": [
			{	
				"targets":0,
				"className": "text-center",
			},
			{	
				"targets": 1,
				"className": "text-center",
			},
			{	
				"targets": 2,
				"className": "text-center",
			},
			{	
				"targets": 3,
				"className": "text-center",
			},
			{	
				"targets": 4,
				"className": "text-center",
			},
			{
				"targets": -1,
				"orderable": false,
				"className": "text-center",
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (data.status_ro == 'OPEN') {
						actions += '<span class="badge badge-warning">Pending</span> &nbsp;';
						actions += '<button class="btn btn-outline-primary btn-sm waves-effect waves-light" onclick="app_detail(\''+data.doc_no+'\')">Detail RO</button>';
					}
					if (data.status_ro == 'CONFIRM') {
						actions += '<span class="badge badge-success">APPROVED</span> &nbsp;';
					}
					if (data.status_ro == 'CLOSED') {
						actions += '<span class="badge badge-danger">NOT APPROVED</span> &nbsp;';
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
function app_detail(doc_no) {
	window.location.href = '#' + Modules + '/' + Controller + '/detail/' + doc_no;	
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
