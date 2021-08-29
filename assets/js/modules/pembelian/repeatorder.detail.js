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
			"url": base_url + Modules + '/' + Controller + '/getListDetail/'+doc_no,
			"type": "POST",
		},
		"columns": [
			{"data": "sku_ids", "width": 50},
			{"data": "sku_desc", "width": 100},
			{"data": "qty", "width": 100},
      ]
	});
}

// START function default

function app_create() { 
	window.location.href = '#' + Modules + '/' + Controller + '/create';
}
function app_detail(doc_no) {
	window.location.href = '#' + Modules + '/' + Controller + '/detail/' + doc_no;	
}
function app_approve(flag) {
	MsgBox.Confirm('Yakin akan Update data ini?').then(result => {
		let data2Send = {
			doc_no : doc_no,
			status : flag
		}
		SendAjax(base_url + Modules + '/' + Controller + '/approve', data2Send, 'POST', 'JSON', 5000, successApprove);
	}).catch(err => {
		console.log(err);
	});
}
function successApprove(data) {
	if (data.result == true) {
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		window.location.href = '#' + Modules + '/' + Controller;
	}
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
