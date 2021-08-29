(function () {
	// JS construct
})();

function initPage(){
	LobiAdmin.highlightCode();
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			no_spbu: {
				required: true,
				nowhitespace: true,
			},	
			password: {
				required: true,
			},
		},
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
			// "data": function ( d ) {
			// 	d.no_spbu_filter = $('#no_spbu_filter').val();
			// },
		},
		"columns": [
			{"data": "periode_id"},
			{"data": "month"},
			{"data": "quarter_id"},
			{"data": "buyer_name"},
			{"data": "subclass_name"},
			{"data": "dept_name"},
			{"data": "counter_upp"},
			{"data": "qty_digit"},
			{"data": "val_rp"},
      ],
		"columnDefs": [
			{
				"targets": -2,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					actions = '<span style="float:right;">'+row.qty_digit+'</span>';
					return actions;
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					actions = '<span style="float:right;">'+row.val_rp+'</span>';
					return actions;
				},
			},
		],
	});
	// DataTable = $("#table_list_data").DataTable();
	DataTable_produk = $('#table_list_data_produk').DataTable({ 
		"pageLength": 10,
		"numbers_length": 4,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getListProdukBbm',
			"type": "POST",
			"data": function ( d ) {
				d.produk_bbm = $('#produk_bbm_filter').val();
			},
		},
		"columns": [
			{"data": "produk_bbm"},
			{"data": "harga"},
			{"data": "created_at"},
			{"data": null, "width": 70, "className": "text-center"},
      ],
		"columnDefs": [

			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
						actions = '<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit_produk(' + row.id + ');"><i class="fas fa-pencil-alt"></i></button> ';
						actions = actions + '<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete_produk(0, ' + row.id + ', \'' + row.produk_bbm + '\');"><i class="fas fa-trash"></i></button>';
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
	if (!$('#form_input').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		id: idData,
		no_spbu: $('#no_spbu').val(),
		password: $('#password').val()
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
				idData = null;
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

function Simpan_Produk() {
	if (!$('#form_input').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		id: idData,
		produk_bbm: $('#produk_bbm').val(),
		harga: $('#harga').val()
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save_produk/' : base_url + Modules + '/' + Controller + '/update_produk/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				ResetForm();
				app_refresh_produk();
				data2Send = null;
				idData = null;
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
			idData = row.id
			$('#no_spbu').val(row.no_spbu);
			$('#password').val(row.password);
		} else {
			MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
		}
	})
	.catch((err) => {
		MsgBox.Notification(err.toString(), 'bottom right', 'warning');
	});
}

function app_edit_produk(id = null) {
	FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2EditProduk/json/' + id, null, 'GET', 5000)
	.then((data) => {
		if (data.result) {
			ResetForm();
			action = 'edit';
			let row = data.data;
			idData = row.id
			$('#produk_bbm').val(row.produk_bbm);
			$('#harga').val(row.harga);
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
					app_refresh_produk();
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

function app_delete_produk(multi = 0, id = null, menu_id = '') {
	
	data2Send = JSON.stringify({
		id: id
	});
	MsgBox.Confirm('Hapus menu ' + menu_id + ' ?').then(result => {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/delete_produk/', data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				app_refresh_produk();
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

function upload_data() {
	var formData = new FormData();
	formData.append('import', $('input[name=import]')[0].files[0]);
	MsgBox.Confirm('Yakin akan Upload data ini?').then(result => {
		let url =  base_url + Modules + '/' + Controller + '/upload_data/';
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: formData,
			timeout: 5000,
			cache: false,
		    processData: false,
	    	contentType: false,
	    	beforeSend: function() {
	           $(".loader").show();
	        },
	        success: successUpload,
	    	error: function(xhr, textStatus, errorThrown) {
	            console.log('error');
	        }
		})
		// app_refresh();
		// SendAjaxWithUpload(url, formData, 'POST', 'JSON', 5000, successUpload);

	}).catch(err => {
		console.log(err);
	});
}
function successUpload(data) {
	if (data.result == true) {
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		$(".loader").hide();
		app_refresh();
	}else{
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'info');
		app_refresh();
	}
}
function app_pdf() {
	window.open(base_url + Modules + '/' + Controller + '/pdf/', '_blank');
}
function download_data() {
    window.location.href = base_url + 'assets/data_upload_buyingplan/TEMPLATE_BYP_BUSDEV.xlsx';
    //window.location.href = 'http://localhost/ios-lexa/assets/data_upload_sku/format_upload_sku.xlsx';
}
function app_xls() {
	let no_spbu_xls = '?no_spbu='+$("#no_spbu_filter").val();

	window.open(base_url + Modules + '/' + Controller + '/xls/'+no_spbu_xls, '_blank');
}

function app_xls_produk() {
	let produk_bbm_xls = '?produk_bbm='+$("#produk_bbm_filter").val();

	window.open(base_url + Modules + '/' + Controller + '/xls_produk/'+produk_bbm_xls, '_blank');
}
function app_refresh() {
	data2Send = null;
	DataTable.ajax.reload(null,true);
}
function app_refresh_produk() {
	data2Send = null;
	DataTable_produk.ajax.reload(null,true);
}

function app_refresh_import() {
	window.location = '#inventory/item/index';
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
function Filter_Produk() {
	DataTable_produk.ajax.reload(null,true);	
}

// END function default

function ResetForm() {
	action = 'create';
	$('#divisi_code').prop('readonly', false);
	$('#active').prop('checked', true);
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}