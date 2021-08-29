(function () {
	// JS Construct
	$('#subclass_id').select2({
		placeholder: "Pencarian subclass...",
		minimumInputLength: 3,
		multiple: true,
		allowClear: true,
		ajax: { 
			url: base_url + 'inventory/subclass/getListSelect2',
			type: "POST",
			dataType: 'json',
			delay: 500,
			data: function (term, page) {
				return JSON.stringify({
					keyword: term
				});
			},
			results: function (data, page) { // parse the results into the format expected by Select2.
				return { 
					results: $.map(data, function (item) {
						return {
							 text: item.subclass_id + ' - ' + item.subclass_name,
							 id: item.subclass_id
						}
				  }) 
				};
			},
			cache: true
		}
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
			"data": function ( d ) {
				d.filter_status = $('#filter_status').val();
				d.filter_supp_id = $('#filter_supp_id').val();
				d.filter_subclass_id = $('#filter_supp_id').val();
			},
		},
		"columns": [
			{"data": "sku_id"},
			{"data": "sku_desc"},
			{"data": "subclass_id"},
			{"data": "supp_name"},
			{"data": "article"},
			{"data": "hbeli", "className": "text-right"},
			{"data": "active", "width": 40, "className": "text-center"},
			{"data": null, "width": 40, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 0,
				"orderable": true,
				"searchable": true,
				"render": function ( data, type, row ) {
					return `
						<div class="font-size-sm">
							<ul class="list-unstyled">
								<li>${row.sku_id}</li>
								<li><strong>Barcode :</strong> ${row.barcode}
							</ul>
						</div>
					`;
				},
			},
			{
				"targets": 1,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return `
						<div class="font-size-sm">
							<ul class="list-unstyled">
								<li>${row.sku_desc}</li>
								<li><strong>Artikel :</strong> ${row.article}</li>
								<li><strong>Season Year :</strong> ${row.season_name}, <strong>Source Of Product :</strong> ${row.source_name}, <strong>Treatment :</strong> ${row.treat_name}</li>
								<li><strong>Type :</strong> ${row.type_name}, <strong>Brand :</strong> ${row.brand_id} - ${row.brand_name}, <strong>Size :</strong> ${row.size_name}</li>
								<li><strong>Color :</strong> ${row.color_name}, <strong>Fabrication :</strong> ${row.fab_name}, <strong>Style :</strong> ${row.style_name}</li>
								<li><strong>Motif :</strong> ${row.motif_name}</li>
							</ul>
						</div>
					`;
				},
			},
			{
				"targets": 2,
				"orderable": true,
				"searchable": true,
				"render": function ( data, type, row ) {
					return row.subclass_id + ' - ' + row.subclass_name;
				},
			},
			{
				"targets": 3,
				"orderable": true,
				"searchable": true,
				"render": function ( data, type, row ) {
					return `
						<div class="font-size-sm">
							<ul class="list-unstyled">
								<li>${row.supp_id} - ${row.supp_name}</li>
								<li><strong>Artikel :</strong> ${row.article_supp}
								<li><strong>Min. Qty Order :</strong> ${accounting.formatNumber(row.min_order)}
							</ul>
						</div>
					`;
				},
			},
			{
				"targets": 4,
				"orderable": true,
				"searchable": true,
				"render": function ( data, type, row ) {
					return row.buyer_id + ' - ' + row.buyer_name;
				},
			},
			{
				"targets": 5,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return accounting.formatNumber(row.hbeli);
				},
			},
			{
				"targets": 6,
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
						// actions = '<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="glyphicon glyphicon-pencil"></i> </button> ';
						actions = '<a href="#' + Modules + '/' + Controller + '/edit/' + row.id + '" class="btn btn-outline-info btn-sm waves-effect waves-light"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					
					}
					if (Priv.delete_flag == 1) {
						// actions = actions + '<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.sku_desc + '\');"><i class="glyphicon glyphicon-trash"></i> </button>';
						actions = actions + '<a href="#" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.item_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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

function app_delete(multi = 0, id = null, sku_id = '') {
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
			id: id,
			sku_id: sku_id
		});
		MsgBox.Confirm('Hapus data ' + sku_id + ' ?').then(result => {
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

function LOVFilterSupp() {
	$('#PopUpModal').load(base_url + 'pembelian/supplier/getSupplierList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['supp_id', 'supp_name']);
		$('#list_controls').val(['#filter_supp_id', '#filter_supp_name']);
	});
}

function LOVFilterSuppClear() {
	$('#filter_supp_id').val('');
	$('#filter_supp_name').val('');
}

function LOVFilterDept() {
	$('#PopUpModal').load(base_url + 'inventory/dept/getDeptList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['dept_id', 'dept_name']);
		$('#list_controls').val(['#filter_dept_id', '#filter_dept_name']);
	});
}

function LOVFilterDeptClear() {
	$('#filter_dept_id').val('');
	$('#filter_dept_name').val('');
}

function LOVFilterMClass() {
	$('#PopUpModal').load(base_url + 'inventory/mclass/getMclassList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['mclass_id', 'mclass_name']);
		$('#list_controls').val(['#filter_mclass_id', '#filter_mclass_name']);
	});
}

function LOVFilterMClassClear() {
	$('#filter_mclass_id').val('');
	$('#filter_mclass_name').val('');
}

function LOVFilterMerk() {
	$('#PopUpModal').load(base_url + 'inventory/merk/getMerkList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['mclass_id', 'mclass_name']);
		$('#list_controls').val(['#filter_merk_id', '#filter_merk_name']);
	});
}

function LOVFilterMerkClear() {
	$('#filter_merk_id').val('');
	$('#filter_merk_name').val('');
}

function LOVFilterSize() {
	$('#PopUpModal').load(base_url + 'inventory/size/getSizeList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['size_id', 'size_name']);
		$('#list_controls').val(['#filter_size_id', '#filter_size_name']);
	});
}

function LOVFilterSizeClear() {
	$('#filter_size_id').val('');
	$('#filter_size_name').val('');
}

function LOVFilterColor() {
	$('#PopUpModal').load(base_url + 'inventory/size/getSizeList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['size_id', 'size_name']);
		$('#list_controls').val(['#filter_color_id', '#filter_color_name']);
	});
}

function LOVFilterColorClear() {
	$('#filter_color_id').val('');
	$('#filter_color_name').val('');
}