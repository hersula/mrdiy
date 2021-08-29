(function () {
	// JS construct
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			jabatan_code: {
				required: true,
				nowhitespace: true
			},	
			jabatan_name: {
				required: true
			},
		},
		messages: {
			jabatan_code: {
            required: "Field ini wajib terisi",
            nowhitespace: "Spasi tidak diperbolehkan"
        },
		  jabatan_name: {
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
			},
		},
		"columns": [
            {"data": "divisi_code"},
            {"data": "divisi_name"},
			{"data": "jabatan_code"},
            {"data": "jabatan_name"},
            {"data": "level_code"},
            {"data": "level_name"},
            {"data": "lokasi_id"},
			{"data": "active", "width": 40, "className": "text-center"},
			{"data": null, "width": 70, "className": "text-center"}
      ],
		"columnDefs": [
            {
                "targets": 6,
                "orderable": true,
                "searchable": false,
                "render": function ( data, type, row ) {
                    if (row.lokasi_id == 1){
                        return '<span class="badge badge-primary text-center">HO</span>';
                    } else {
                        return '<span class="badge badge-default text-center">Toko</span>';
                    }
                },
            },
			{
				"targets": 7,
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
						actions = '<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="fas fa-pencil-alt"></i></button> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.jabatan_code + '\');"><i class="fas fa-trash"></i></button>';
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
	let list_input = ['divisi_code', 'divisi_name', 'level_code', 'level_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		divisi_code: $('#divisi_code').val(),
		jabatan_code: $('#jabatan_code').val(),
		jabatan_name: $('#jabatan_name').val(),
        level_code: $('#level_code').val(),
        lokasi_id: $('#lokasi_id').val(),
		active: $('#active').is(':checked') ? 1 : 0
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
			$('#divisi_code').val(row.divisi_code); $('#divisi_name').val(row.divisi_name); 
			$('#jabatan_code').val(row.jabatan_code); $('#jabatan_code').prop('readonly', true);
			$('#jabatan_name').val(row.jabatan_name);
            $('#level_code').val(row.level_code); $('#level_name').val(row.level_name);
            $('#lokasi_id').val(row.lokasi_id);
			$('#active').prop('checked', row.active == 1 ? true : false);
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
		MsgBox.Confirm('Hapus Jabatan ' + jabatan_name + ' ?').then(result => {
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
	$('#jabatan_code').prop('readonly', false);
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function LOVDivisi() {
	$('#PopUpModal').load(base_url + 'hc/divisi/getDivisiList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['divisi_code', 'divisi_name']);
		$('#list_controls').val(['#divisi_code', '#divisi_name']);
	});
}

function LOVDivisiClear() {
	$('#divisi_code').val('');
	$('#divisi_name').val('');
}

function LOVLevel() {
	$('#PopUpModal').load(base_url + 'hc/level/getLevelList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['level_code', 'level_name']);
		$('#list_controls').val(['#level_code', '#level_name']);
	});
}

function LOVLevelClear() {
	$('#level_code').val('');
	$('#level_name').val('');
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

function LOVFilterLevel() {
	$('#PopUpModal').load(base_url + 'hc/level/getLevelList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['level_code', 'level_name']);
		$('#list_controls').val(['#filter_level_code', '#filter_level_name']);
	});
}

function LOVFilterLevelClear() {
	$('#filter_level_code').val('');
	$('#filter_level_name').val('');
}