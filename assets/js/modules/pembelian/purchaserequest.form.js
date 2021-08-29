(function () {
	// function construct
	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();s
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
		.then((data) => {
			if (data.result) {
				let row = data.data;
				$('#doc_no').val(row.doc_no).prop('readonly', true);
				$('#supp_id').val(row.supp_id);$('#supp_name').val(row.supp_name).prop('readonly', true);
				$('#buyer_id').val(row.buyer_id);$('#buyer_name').val(row.buyer_name).prop('readonly', true);
				$('#ref_doc_no').val(row.ref_doc_no);
				$('#ref_doc_type').val(row.ref_doc_type);
				$("#doc_date").datepicker("update", new Date(row.doc_date));
				$('#notes').val(row.notes);
				$('#status').prop('checked', row.status == 1 ? true : false);
			} else {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
		});
	}

})();

function initPageForm(){
	LobiAdmin.highlightCode();

	// Init tanggal
	$('#doc_date_container .input-group.date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	});

	$('#doc_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());

	// Jquery validation
	initValidationDefaults();
	
	// Select2 untuk pilih_info
	$('#pilih_info').select2({
		placeholder: "Pencarian info...",
		minimumInputLength: 3,
		allowClear: true,
		ajax: { 
			url: base_url + 'master/info/getListSelect2',
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
							 text: item.info_name,
							 id: item.id
						}
				  }) 
				};
			},
			cache: true
		}
	});

	// Timeout untuk datatable
	setTimeout(() => {
		LoadDataTable();
	}, 500);

}

function LoadDataTable() {
	// DataTable untuk detail item
	DataTableDetailItem = $('#table_detail_item').DataTable({ 
		"pageLength": 10,
		"pagingType": "simple",
		"numbers_length": 4,
		"responsive": true,
		"lengthChange": false,
		"data": data4DataTable,
		"columns": [
			{"data": "c"},
			{"data": "item_desc"},
			{"data": "qty", "className": "text-center"},
			{"data": "qty_real", "className": "text-center"},
			{"data": "hbeli", "className": "text-right"},
			{"data": "jumlah", "className": "text-right"},
			{"data": "actions", "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 1,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					// accounting.formatNumber(row.qty)
					return `
						<div class="font-size-sm">
							<ul class="list-unstyled">
								<li>${row.item_desc}</li>
								<li>Size : ${row.size_name}, Color : ${row.color_name}</li>
							</ul>
						</div>
					`;
				},
			},
			{
				"targets": 2,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return accounting.formatNumber(row.qty_order);
				},
			},
			{
				"targets": 3,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return accounting.formatNumber(row.qty_real);
				},
			},
			{
				"targets": 4,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return accounting.formatNumber(row.hbeli);
				},
			},
			{
				"targets": 5,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return accounting.formatNumber(row.jumlah);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1 && action === 'create') {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditItemDetail(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusItemDetail(' + meta.row + ',  \'' + row.item_id + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}
					return actions;
				},
			},
		],
		"initComplete": function(settings, json) {
			setTimeout(() => {
				HitungTotal();
				DataTableDetailItem.page('last').draw(false);
			}, 100);
		},
		"drawCallback": function( settings ) {
			AddInputRow();
	  	},
	});

}

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function Simpan() {
	let list_input = ['supp_id', 'supp_name', 'buyer_id', 'buyer_name'];
	let hasil = ValidasiInput2(list_input);
	if (!$('#form_header').valid() || !hasil) {
		let msg = !$('#form_header').valid() ? 'Periksa inputan anda.' : hasil;
		MsgBox.Notification(msg, 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		wil_id: $('#wil_id').val(),
		price_grade_code: $('#price_grade_code').val(),
		go_date: moment($('#go_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		status: $('#status').is(':checked') ? 1 : 0
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				data2Send = null;
				if (action === 'create') {
					window.location.href = '#' + Modules + '/' + Controller + '/edit/' + data.data.id;
				} else {
					Kembali();
				}
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

function LOVSupplier() {
	/* if (DataTableDetailItem.column(0).data().length > 0) {
		MsgBox.Notification("Supplier tidak dapat diubah karena detail item tidak kosong.", 'bottom right', 'warning');
		return;
	} */

	$('#PopUpModal').load(base_url + 'pembelian/supplier/getSupplierList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['supp_id', 'supp_name']);
		$('#list_controls').val(['#supp_id', '#supp_name']);
	});
}

function LOVSupplierClear() {
	$('#supp_id').val(''); $('#supp_name').val('');
}

function LOVBuyer() {
	$('#PopUpModal').load(base_url + 'inventory/buyer/getBuyerList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['buyer_id', 'buyer_name']);
		$('#list_controls').val(['#buyer_id', '#buyer_name']);
	});
}

function LOVBuyerClear() {
	$('#buyer_id').val(''); $('#buyer_name').val('');
}

function Refresh() {
	data2Send = null;
	DataTableDetailItem.ajax.reload(null, false);
}

function ResetFormInfo() {
	action = 'create';
	$('#form_info')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function AddInputRow() {
	let html = `
		<tr>
			<td>
				<label class="input">
					<div class="input-group">
						<input type="hidden" name="item_id" id="item_id" value="" />
						<input type="text" class="font-size-sm ignore" placeholder="Item" name="item_find" id="item_find" value="" onkeyup="return CariItem(event)" />
						<span class="tooltip tooltip-top-right">Item ID *</span> </label>
						<span class="input-group-btn">
						<button class="btn btn-info btn-sm" type="button" onclick="LOVItem();"><i class="glyphicon glyphicon-search"></i></button>
						</span> 
					</div>
				</label>
			</td>
			<td colspan="2">
				<label class="input">
					<input type="text" class="font-size-sm ignore" placeholder="Deskripsi" id="item_desc" name="item_desc" value="" disabled />
					<input type="hidden" name="size_id" id="size_id" value="" />
					<input type="hidden" name="size_name" id="size_name" value="" />
					<input type="hidden" name="color_id" id="color_id" value="" />
					<input type="hidden" name="color_name" id="color_name" value="" />
				</label>
			</td>
			<td>
				<label class="input">
					<input type="hidden" name="qty_real" id="qty_real" value="" />
					<input type="text" class="font-size-sm text-center" placeholder="Qty (Pcs)" id="qty_order" name="qty_order" value="" maxlength="10" onkeyup="return HitungJumlah(event, 'tambah_item')" onfocus="this.select()" />
					<span class="tooltip tooltip-top-right">Qty *</span> 
				</label>
			</td>
			<td>
				<label class="input">
					<input type="hidden" name="min_order" id="min_order" value="" />
					<input type="text" class="font-size-sm text-right" placeholder="Harga Beli (Rp)" id="hbeli" name="hbeli" value="" maxlength="20" disabled />
					<span class="tooltip tooltip-top-right">Harga Beli (Rp) *</span> 
				</label>
			</td>
			<td>
				<label class="input">
					<input type="text" class="font-size-sm text-right ignore" placeholder="Jumlah (Rp)" id="jumlah" name="jumlah" value="" maxlength="20" disabled />
				</label>
			</td>
			<td class="text-center">
				<a href="#" class="btn btn-pretty btn-success btn-sm" onclick="TambahItem();" id="tambah_item" name="tambah_item"><i class="glyphicon glyphicon-plus-sign"></i> </a>
			</td>
		</tr>
		`;
	$('#table_detail_item tbody > tr:last').after(html);
	$('#qty_order').autoNumeric('init', formatNumber);
	$('#hbeli').autoNumeric('init', formatNumber);
	$('#jumlah').autoNumeric('init', formatNumber);
	
	$("#form_detail").validate({
		rules: {
			item_id: { 
				required: true 
			},
			item_find: { 
				required: true, 
				nowhitespace: true 
			},
			qty_order: { 
				required: true, 
				number: true,
			},
		},
	});

}

function checkDoubleItem(data, item_id, callback) {
	let result = true;
	if (data.length > 0) {
		data.map((val, idx) => {
			if (val.item_id.trim() === item_id.trim()) {
				result = false;
			}
	
			if (idx === data.length - 1) {
				callback(result);
			}
		});
	} else {
		callback(true);
	}
}

function TambahItem() {
	// Cek input
	let list_input = ['item_desc', 'size_id', 'size_name', 'color_id', 'color_name'];
	let hasil = ValidasiInput2(list_input);
	if (!$('#form_detail').valid() || !hasil) {
		let msg = !$('#form_detail').valid() ? 'Periksa inputan anda.' : hasil;
		MsgBox.Notification(msg, 'bottom right', 'warning', 'mini');
		return;
	}

	if (ItemDetailAction === 'edit') {
		DataTableDetailItem.row(ItemDetailActionRowIdx).data({
			"item_id": $('#item_id').val().trim(),
			"item_desc": $('#item_desc').val().trim(),
			"size_id": $('#size_id').val().trim(),
			"size_name": $('#size_name').val().trim(),
			"color_id": $('#color_id').val().trim(),
			"color_name": $('#color_name').val().trim(),
			"qty_order": parseInt(accounting.unformat($('#qty_order').val())),
			"qty_real": parseInt($('#qty_real').val()),
			"hbeli": parseInt(accounting.unformat($('#hbeli').val())).toFixed(2),
			"jumlah": parseInt(accounting.unformat($('#qty_order').val())) * parseInt(accounting.unformat($('#hbeli').val())).toFixed(2),
		}).draw(false);

		HitungTotal();
		setTimeout(() => {
			$('#item_find').focus();
		}, 100);
		return;
	}

	// Cek jika SKU sudah ada
	let ListData = DataTableDetailItem.rows().data().toArray();
	checkDoubleItem(ListData, $('#item_id').val().trim(), (result) => {
		if (!result) {
			MsgBox.Notification('Item ' + $('#item_id').val().trim() + ' sudah ada.', 'bottom right', 'warning');
		} else {
			// Tambahkan to datatable
			DataTableDetailItem.row.add({
				"item_id": $('#item_id').val().trim(),
				"item_desc": $('#item_desc').val().trim(),
				"size_id": $('#size_id').val().trim(),
				"size_name": $('#size_name').val().trim(),
				"color_id": $('#color_id').val().trim(),
				"color_name": $('#color_name').val().trim(),
				"qty_order": parseInt(accounting.unformat($('#qty_order').val())),
				"qty_real": parseInt($('#qty_real').val()),
				"hbeli": parseInt(accounting.unformat($('#hbeli').val())).toFixed(2),
				"jumlah": parseInt(accounting.unformat($('#qty_order').val())) * parseInt(accounting.unformat($('#hbeli').val())).toFixed(2),
			}).draw();
			// Pergi ke page terakhir
			DataTableDetailItem.page('last').draw(false)

			HitungTotal();
			setTimeout(() => {
				$('#item_find').focus();
			}, 100);
		}
	});

	
}

function CariItem(e) {
	let code = e.keyCode || e.which;
	if (code === 13) {
		let item_id = $('#item_find').val();
		let supp_id = $('#supp_id').val();
		if (item_id.trim() == '') {
			MsgBox.Notification('Periksa item yang akan diinput.', 'bottom right', 'warning', 'mini', 1500);
			return;
		}
		FetchWithTimeout(base_url + 'inventory/item/GetItemByCode/' + item_id + '/' + supp_id, null, 'GET')
		.then((data) => {
			if (data.result) {
				let row = data.data;
				$('#item_id').val(row.item_id);
				$('#item_find').val(row.item_id);
				$('#item_desc').val(row.item_desc);
				$('#size_id').val(row.size_id);
				$('#size_name').val(row.size_name);
				$('#color_id').val(row.color_id);
				$('#color_name').val(row.color_name);
				$('#hbeli').val(accounting.formatNumber(row.hbeli));
				$('#min_order').val(accounting.formatNumber(row.min_order));

				$('#qty_order').focus();
			} else {
				MsgBox.Notification(data.msg.toString(), 'top left', 'warning', 'mini', 2000);
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'top left', 'warning');
		});
	}
}

function HitungJumlah(e, next_element) {
	let jumlah = parseInt(accounting.unformat($('#qty_order').val())) * parseInt(accounting.unformat($('#hbeli').val()));
	$('#jumlah').val(accounting.formatNumber(jumlah));
	// Jika user menekan enter
	let code = e.keyCode || e.which;
	if (code === 13) {
		$('#' + next_element).focus();
	}
}

function HitungTotal() {
	let data = DataTableDetailItem.rows().data().toArray();
	let total_qty_order = 0;
	let total_qty_real = 0;
	let total_value = 0;
	data.map((val, idx) => {
		total_qty_order += parseInt(val.qty_order);
		total_qty_real += parseInt(val.qty_real);
		total_value += parseInt(val.qty_order) * parseInt(val.hbeli);
	});
	$('#total_qty_order').text(accounting.formatNumber(total_qty_order));
	$('#total_qty_real').text(accounting.formatNumber(total_qty_real));
	$('#total_value').text(accounting.formatNumber(total_value));
	$("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
}

function LOVItem() {
	let supp_id = $('#supp_id').val();
	$('#PopUpModal').load(base_url + 'inventory/item/GetListItem/home/' + supp_id, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "1000px"}); // Lebar modal LOV
		$('#list_cols').val(['item_id', 'item_id', 'item_desc', 'size_id', 'size_name', 'color_id', 'color_name', 'hbeli', 'min_order']);
		$('#list_controls').val(['#item_id', '#item_find', '#item_desc', '#size_id', '#size_name', '#color_id', '#color_name', '#hbeli', '#min_order']);
	});
}

function EditItemDetail(rowIdx) {
	let data2edit = DataTableDetailItem.row(rowIdx).data();
	ItemDetailAction = 'edit';
	ItemDetailActionRowIdx = rowIdx;
	$('#item_id').val(data2edit.item_id);
	$('#item_find').val(data2edit.item_id);
	$('#item_desc').val(data2edit.item_desc);
	$('#size_id').val(data2edit.size_id);
	$('#size_name').val(data2edit.size_name);
	$('#color_id').val(data2edit.color_id);
	$('#color_name').val(data2edit.color_name);
	$('#qty_order').val(accounting.formatNumber(data2edit.qty_order));
	$('#qty_real').val(data2edit.qty_real);
	$('#hbeli').val(accounting.formatNumber(data2edit.hbeli));
	$('#jumlah').val(accounting.formatNumber(data2edit.jumlah));
}

function HapusItemDetail(rowIdx, item_id = '') {
	MsgBox.Confirm('Hapus item ' + item_id + ' ?').then(result => {
		DataTableDetailItem.row(rowIdx).remove().draw();
		DataTableDetailItem.rows().invalidate().draw(false);
		// Pergi ke page terakhir
		/* setTimeout(() => {
			DataTableDetailItem.page('last').draw();
		}, 100); */
		setTimeout(() => {
			HitungTotal();
			DataTableDetailItem.page('last').draw(false);
		}, 100);
	}).catch(err => {
		console.log(err);
	});
}