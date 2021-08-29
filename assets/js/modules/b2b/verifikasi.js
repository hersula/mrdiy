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
		},
		"columns": [
            {"data": "email", "width": 60},
			{"data": "supp_id", "width": 30},
			{"data": "supp_name", "width": 100},
			{"data": "alias", "width": 80},
			{"data": "contact_person", "width": 90},			
			{"data": "no_hp", "width": 70},
			{"data": "status_supp", "width": 40, "className": "text-center"},			
			{"data": "status", "width": 40, "className": "text-center"},
			{"data": "action", "width": 40, "className": "text-center"}
      ],
		"columnDefs": [

			{
				"targets": 7,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.status == 1){
						return '<span class="label label-success text-center">Verified</span>';
					} else {
						return '<span class="label label-danger text-center">Not Verified</span>';
					}	
				},
			},


			{
				"targets": 6,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.status_supp == 1){
						return '<span class="label label-cyan text-center">Aktif</span>';
					} else {
						return '<span class="label label-purple text-center">Tidak Aktif</span>';
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
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="app_delete(0, ' + row.id + ', \'' + row.supp_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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
