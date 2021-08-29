(function () {
	// JS Construct
	
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	DataTable = $('#table_list_data').DataTable({ 
		"pageLength" : 8,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
			"data": function ( d ) {
				d.filter_status = $('#filter_status').val();
				d.filter_reg_id = $('#filter_reg_id').val();
				d.filter_area_id = $('#filter_area_id').val();
				d.filter_wil_id = $('#filter_wil_id').val();
			},
		},
		"columns": [
			{"data": "store_id"},
			{"data": "store_name"},
			{"data": "city_name"},
			{"data": "grade", "className": "text-center"},
			{"data": "price_grade_name", "className": "text-center"},
			{"data": "employee_name"},
			{"data": "status", "width": 40, "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			// {
			// 	"targets": 5,
			// 	"orderable": true,
			// 	"searchable": false,
			// 	"render": function ( data, type, row ) {
			// 		return `(${row.price_grade_code}) ${row.price_grade_name}`;
			// 	},
			// },
			{
				"targets": 6,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.status == 1){
						return '<span class="label label-success text-center">Aktif</span>';
					} else {
						return '<span class="label label-danger text-center">Tidak Aktif</span>';
					}
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					// if (Priv.pdf_flag == 1) {
						actions = '<a href="' + base_url + Modules + '/' + Controller + '/pdf_detail_toko/' + row.id + '" target="_blank" class="btn btn-pretty btn-danger btn-xs"><i class="fa fa-file-pdf-o"></i> </a> ';
					// }
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#' + Modules + '/' + Controller + '/edit/' + row.id + '" class="btn btn-pretty btn-cyan btn-xs"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="app_delete(0, ' + row.id + ', \'' + row.reg_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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

function Filter() {
	DataTable.ajax.reload(null,true);
}

function LOVFilterReg() {
	$('#PopUpModal').load(base_url + 'administrasi/regional/getRegionalList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['reg_id', 'reg_name']);
		$('#list_controls').val(['#filter_reg_id', '#filter_reg_name']);
	});
}

function LOVFilterRegClear() {
	$('#filter_reg_id').val('');
	$('#filter_reg_name').val('');
}

function LOVFilterArea() {
	$('#PopUpModal').load(base_url + 'administrasi/area/getAreaList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['area_id', 'area_name']);
		$('#list_controls').val(['#filter_area_id', '#filter_area_name']);
	});
}

function LOVFilterAreaClear() {
	$('#filter_area_id').val('');
	$('#filter_area_name').val('');
}

function LOVFilterWilayah() {
	$('#PopUpModal').load(base_url + 'administrasi/wilayah/getWilayahList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['wil_id', 'wil_name']);
		$('#list_controls').val(['#filter_wil_id', '#filter_wil_name']);
	});
}

function LOVFilterWilayahClear() {
	$('#filter_wil_id').val('');
	$('#filter_wil_name').val('');
}
