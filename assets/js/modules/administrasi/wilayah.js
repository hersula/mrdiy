(function () {
	// JS construct
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			wil_id: {
				required: true,
				nowhitespace: true
			},	
			wil_name: {
				required: true
			},
		},
		messages: {
			area_id: {
            required: "Field ini wajib terisi",
            nowhitespace: "Spasi tidak diperbolehkan"
        },
		  area_name: {
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
			"data": function ( d ) {
				d.filter_status = $('#filter_status').val();
				d.filter_reg_id = $('#filter_reg_id').val();
				d.filter_area_id = $('#filter_area_id').val();
			},
		},
		"columns": [
			{"data": "area_name"},
			{"data": "wil_id"},
			{"data": "wil_name"},
			{"data": "employee_name"},
			{"data": "status", "width": 40, "className": "text-center"},
			{"data": null, "width": 20, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 4,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.status == 1){
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
						actions = '<a href="#" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.area_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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
	let list_input = ['area_id', 'area_name', 'pic_id', 'pic_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		area_id: $('#area_id').val(),
		wil_id: $('#wil_id').val(),
		wil_name: $('#wil_name').val(),
		pic_id: $('#pic_id').val(),
		status: $('#active').is(':checked') ? 1 : 0
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
			$('#area_id').val(row.area_id); $('#area_name').val(row.area_name); 
			$('#wil_id').val(row.wil_id); $('#wil_id').prop('readonly', true);
			$('#wil_name').val(row.wil_name);
			$('#pic_id').val(row.pic_id); $('#pic_name').val(row.employee_name);
			$('#active').prop('checked', row.status == 1 ? true : false);
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
	$('#wil_id').prop('readonly', false);
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function LOVArea() {
	$('#PopUpModal').load(base_url + 'administrasi/area/getAreaList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['area_id', 'area_name']);
		$('#list_controls').val(['#area_id', '#area_name']);
	});
}

function LOVAreaClear() {
	$('#area_id').val('');
	$('#area_name').val('');
}

function LOVPIC() {
	$('#PopUpModal').load(base_url + 'hc/karyawan/getKaryawanAll/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['employee_id', 'employee_name']);
		$('#list_controls').val(['#pic_id', '#pic_name']);
	});
}

function LOVPICClear() {
	$('#pic_id').val('');
	$('#pic_name').val('');
}

function LOVFilterReg() {
	$('#PopUpModal').load(base_url + 'master/karyawan/getKaryawanList/', () => { // Ambil URL untuk membuka modal LOV
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
	$('#PopUpModal').load(base_url + 'setting/area/getAreaList/', () => { // Ambil URL untuk membuka modal LOV
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