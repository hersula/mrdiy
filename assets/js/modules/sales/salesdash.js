(function () {
	// $('#filter').lobiPanel({
	// 		reload: false,
	// 		close: false,
	// 		editTitle: false,
	// 		unpin: false,
	// 		expand: false
	// });
	
	
	// $('#list_data').lobiPanel({
	// 		reload: false,
	// 		close: false,
	// 		editTitle: false,
	// 		unpin: false,
	// 		//bodyHeight: 500
	// });
	
})();
function initDatePicker() {
	$('#filter_sales_date').datepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
	}).datepicker("setDate", "-1d");
}
function initPage(){
	initDatePicker();
	LobiAdmin.highlightCode();

	DataTable = $('#table_same_data').DataTable({ 
		"order": [[9, 'asc']],
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getSameStore',
			"type": "POST",
			"data": function ( i ) {
				i.tanggal = $('#filter_sales_date').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{ 
				"data": "today", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.today);
				}
			},
			{ 
				"data": "lw", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lw);
				}
			},
			{"data": "plw", "width": 50, "className": "text-right"},
			{ 
				"data": "mtd", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.mtd);
				}
			},
			{ 
				"data": "lm", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lm);
				}
			},
			{"data": "plm", "width": 50, "className": "text-right"},
			{ 
				"data": "ly", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.ly);
				}
			},
			{"data": "ply", "width": 50, "className": "text-right"},
			{"data": "urut"}
      ],	 
	  "columnDefs": [
		{
			"targets": 0,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 1,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 2,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 3,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 4,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 5,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 6,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 7,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 8,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 9,
			"visible": false,
			"orderable": true,
		},
	],
	});

	DataAll = $('#table_all_data').DataTable({ 
		"order": [[9, 'asc']],
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getAllStore',
			"type": "POST",
			"data": function ( a ) {
				a.tanggal = $('#filter_sales_date').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{ 
				"data": "today", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.today);
				}
			},
			{ 
				"data": "lw", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lw);
				}
			},
			{"data": "plw", "width": 50, "className": "text-right"},
			{ 
				"data": "mtd", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.mtd);
				}
			},
			{ 
				"data": "lm", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lm);
				}
			},
			{"data": "plm", "width": 50, "className": "text-right"},
			{ 
				"data": "ly", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.ly);
				}
			},
			{"data": "ply", "width": 50, "className": "text-right"},
			{"data": "urut"}
      ],	 
	  "columnDefs": [
		{
			"targets": 0,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 1,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 2,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 3,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 4,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 5,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 6,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 7,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 8,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 9,
			"visible": false,
			"orderable": true,
		},
	],
	});

	DataFs = $('#table_fs_data').DataTable({ 
		"order": [[9, 'asc']],
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getFsStore',
			"type": "POST",
			"data": function ( i ) {
				i.tanggal = $('#filter_sales_date').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{ 
				"data": "today", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.today);
				}
			},
			{ 
				"data": "lw", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lw);
				}
			},
			{"data": "plw", "width": 50, "className": "text-right"},
			{ 
				"data": "mtd", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.mtd);
				}
			},
			{ 
				"data": "lm", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lm);
				}
			},
			{"data": "plm", "width": 50, "className": "text-right"},
			{ 
				"data": "ly", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.ly);
				}
			},
			{"data": "ply", "width": 50, "className": "text-right"},
			{"data": "urut"}
      ],	 
	  "columnDefs": [
		{
			"targets": 0,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 1,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 2,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 3,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 4,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 5,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 6,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 7,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 8,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 9,
			"visible": false,
			"orderable": true,
		},
	],
	});

	DataMall = $('#table_mall_data').DataTable({ 
		"order": [[9, 'asc']],
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getMallStore',
			"type": "POST",
			"data": function ( i ) {
				i.tanggal = $('#filter_sales_date').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{ 
				"data": "today", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.today);
				}
			},
			{ 
				"data": "lw", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lw);
				}
			},
			{"data": "plw", "width": 50, "className": "text-right"},
			{ 
				"data": "mtd", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.mtd);
				}
			},
			{ 
				"data": "lm", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lm);
				}
			},
			{"data": "plm", "width": 50, "className": "text-right"},
			{ 
				"data": "ly", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.ly);
				}
			},
			{"data": "ply", "width": 50, "className": "text-right"},
			{"data": "urut"}
      ],	 
	  "columnDefs": [
		{
			"targets": 0,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 1,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 2,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 3,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 4,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 5,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 6,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 7,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 8,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 9,
			"visible": false,
			"orderable": true,
		},
	],
	});

	DataJava = $('#table_java_data').DataTable({ 
		"order": [[9, 'asc']],
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getJavaStore',
			"type": "POST",
			"data": function ( i ) {
				i.tanggal = $('#filter_sales_date').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{ 
				"data": "today", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.today);
				}
			},
			{ 
				"data": "lw", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lw);
				}
			},
			{"data": "plw", "width": 50, "className": "text-right"},
			{ 
				"data": "mtd", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.mtd);
				}
			},
			{ 
				"data": "lm", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lm);
				}
			},
			{"data": "plm", "width": 50, "className": "text-right"},
			{ 
				"data": "ly", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.ly);
				}
			},
			{"data": "ply", "width": 50, "className": "text-right"},
			{"data": "urut"}
      ],	 
	  "columnDefs": [
		{
			"targets": 0,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 1,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 2,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 3,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 4,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 5,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 6,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 7,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 8,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 9,
			"visible": false,
			"orderable": true,
		},
	],
	});

	DataNon = $('#table_non_data').DataTable({ 
		"order": [[9, 'asc']],
		"pageLength" : 10,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getNonStore',
			"type": "POST",
			"data": function ( i ) {
				i.tanggal = $('#filter_sales_date').val();
			},
		},
		"columns": [
			{"data": "deskripsi", "width": 100},
			{ 
				"data": "today", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.today);
				}
			},
			{ 
				"data": "lw", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lw);
				}
			},
			{"data": "plw", "width": 50, "className": "text-right"},
			{ 
				"data": "mtd", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.mtd);
				}
			},
			{ 
				"data": "lm", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.lm);
				}
			},
			{"data": "plm", "width": 50, "className": "text-right"},
			{ 
				"data": "ly", "className": "text-right", 
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.ly);
				}
			},
			{"data": "ply", "width": 50, "className": "text-right"},
			{"data": "urut"}
      ],	 
	  "columnDefs": [
		{
			"targets": 0,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 1,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 2,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 3,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 4,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 5,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 6,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 7,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 8,
			"orderable": false,
			"searchable": true,
		},
		{
			"targets": 9,
			"visible": false,
			"orderable": true,
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
	DataAll.ajax.reload(null, true);
	DataFs.ajax.reload(null, true);
	DataMall.ajax.reload(null, true);
	DataJava.ajax.reload(null, true);
	DataNon.ajax.reload(null, true);
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


