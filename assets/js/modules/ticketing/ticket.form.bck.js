(function () {
	// construct
})();

function initPage() {
	initDataTable();
	initDatePicker();
	initValidation();
	initOtherElements();
	if (action == 'edit') getData();
}

function initDataTable() {
	_dataTable = $('#table_detail_purchase_order').DataTable({
		"pagingType": "simple",
		"iDisplayLength": -1,
		"bPaginate": false,
		"ordering": false,
		"info": false,
		"scrollX": true,
		"data": data4DataTable,
		"columns": [
			{ "data": "item_id" },
			{ "data": "item_name" },
			{ "data": "jenis_name" },
			{ "data": "uom_name", "className": "text-center" },
			{ 
				"data": "qty", "className": "text-center",
				"render": function (data, type, row) {
					return accounting.formatNumber(row.qty);
				},
			},
			{
				"data": "harga_beli", "className": "text-right",
				"render": function (data, type, row) {
					return accounting.formatNumber(row.harga_beli);
				},
			},
			{
				"data": "jumlah", "className": "text-right",
				"render": function (data, type, row) {
					return accounting.formatNumber(row.jumlah);
				},
			},
			{
				"data": null, "className": "text-center", "width": 80,
				"render": function (data, type, row, meta) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + `<button type="button" class="btn btn-outline-info btn-sm waves-effect waves-light mr-2" onclick="editDetail('${meta.row}');" data-index="${meta.row}" id="edit_${meta.row}" name="edit_${meta.row}"><i class="glyphicon glyphicon-pencil"></i></button>`;
					}
					if (Priv.delete_flag == 1) {
						actions = actions + `<button type="button" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="deleteDetail('${meta.row}');" data-index="${meta.row}" id="delete_${meta.row}" name="delete_${meta.row}"><i class="glyphicon glyphicon-trash"></i></button>`;
					}
					return actions;
				},
			},
		],
		"footerCallback": function (row, data, start, end, display) {
         let api = this.api();
			let totalQty = api.column(4).data().reduce(function (prevVal, nextVal) {
            return parseInt(prevVal) + parseInt(nextVal);
         }, 0);
			$('#total_qty').val(accounting.formatNumber(totalQty));

         let subTotal = api.column(6).data().reduce(function (prevVal, nextVal) {
            return parseInt(prevVal) + parseInt(nextVal);
         }, 0);
         $('#sub_total').val(accounting.formatNumber(subTotal));
			hitungTotal();
      }
	});
}

function initDatePicker() {
	$('#doc_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());

	$('#tanggal_batal').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());

	$('#tanggal_kirim').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
}

function initValidation() {
	$("#form_header").validate({
		rules: {
			doc_date: {
				DateID: true,
				required: true
			},
			tanggal_kirim: {
				DateID: true,
				required: true
			},
			tanggal_batal: {
				DateID: true,
				required: true
			},
		},
	});

	$("#form_detail").validate({
		rules: {
			pencarian: {
				required: true,
			},	
			harga_beli: {
				number: true,
				required: true,
			},	
			qty_order: {
				number: true,
				required: true
			},
			jumlah: {
				number: true,
				required: true
			},
		},
	});
}

function initOtherElements() {
	$('#harga_beli').autoNumeric('init', formatNumber);
	$('#qty_order').autoNumeric('init', formatNumber);

	$('#total_qty').autoNumeric('init', formatNumber);
	$("#discount").autoNumeric('init', formatDecimalNumber);
	$("#tax").autoNumeric('init', formatDecimalNumber);
	$("#ongkos_kirim").autoNumeric('init', formatDecimalNumber);

	// Handle pencarian
	$('#pencarian').on('keypress', function (e) {
		if (e.charCode == 13) {
			e.preventDefault();
			if ($(this).val().trim() == "") return;
			if (DataTableAction == 'edit') {
				$('#qty').focus();
			}
			ajaxNew(base_url + 'master/item/get_item_hb?keyword=' + $(this).val().trim(), null, 'GET')
				.then((data) => {
					if (data.result) {
						let row = data.data;
						$('#item_id').val(row.item_id);
						$('#pencarian').val(row.item_id);
						$('#uom_id').val(row.uom_id); $('#uom_name').val(row.uom_name);
						$('#harga_beli').val(accounting.formatNumber(row.harga_beli));
						$('#item_name').val(row.item_name);
						$('#jenis_id').val(row.jenis_id); $('#jenis_name').val(row.jenis_name);
						$('#qty_order').focus();
					} else {
						LOVItem($(this).val().trim());
						clearFormDetail();
						// MsgBox.Notification(data.message.toString());
					}
				})
				.catch((err) => {
					MsgBox.Notification(err.toString());
				});
		}
	});

	// Handle harga_beli
	$('#harga_beli').on('keypress', function (e) {
		if (e.charCode == 13) {
			e.preventDefault();
			$('#qty_order').focus();
		}
	});

	// Handle qty order
	$('#qty_order').on('keypress', function (e) {
		if (e.charCode == 13) {
			e.preventDefault();
			$('#saveDetail').focus();
		}
	});

	// Handle harga_beli & qty_order onkeyup
	$('#harga_beli, #qty_order').on('keyup', function (e) {
		hitungJumlahItem();
	});

	// Handle discount & tax onkeyup
	$('#discount, #tax, #ongkos_kirim').on('keyup', function (e) {
		hitungTotal();
	});

	// Handle saveDetail
	$('#saveDetail').on('click', saveDetail);

	// Handle cancelDetail
	$('#cancelDetail').on('click', (e) => {
		clearFormDetail();
	});
}

function hitungJumlahItem() {
	let hargaBeli = accounting.unformat($('#harga_beli').val(), _decimalSeparator);
	let qtyOrder = accounting.unformat($('#qty_order').val(), _decimalSeparator);
	let jumlah = hargaBeli * qtyOrder;
	$('#jumlah').val(accounting.formatNumber(jumlah));
}

function hitungTotal() {
	let subTotal = accounting.unformat($('#sub_total').val(), _decimalSeparator);
	let discountValue = accounting.unformat($('#discount').val(), _decimalSeparator);
	let ongkosKirim = accounting.unformat($('#ongkos_kirim').val(), _decimalSeparator);
	let beforeTotal = (subTotal - discountValue);
	let taxPcn = accounting.unformat($('#tax').val(), _decimalSeparator);
	let taxValue = beforeTotal * (taxPcn / 100);
	let total = beforeTotal + taxValue + ongkosKirim;
	$('#total').val(accounting.formatNumber(total));
}

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller;
}

function Simpan() {
	// Check input
	let list_input = ['supp_id', 'supp_name', 'store_id', 'store_name'];
	if (!$('#form_header').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa kembali inputan anda', 'Input tidak lengkap', 'warning');
   	return;
   }
	// Check detail
	if (_dataTable.data().count() <= 0) {
		MsgBox.Notification('Detail tidak ditemukan');
		return;
	}
	// save
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
		loadingProcess();
		if (!result) return;
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		let detail = JSON.stringify(_dataTable.rows().data().toArray());
		let summary = '&sub_total=' + $('#sub_total').val() + '&discount=' + $('#discount').val() + '&tax=' + $('#tax').val() + '&ongkos_kirim=' + $('#ongkos_kirim').val() + '&total=' + $('#total').val() + '&total_qty=' + $('#total_qty').val();
      _data2Send = action === 'create' ? $('#form_header').serialize() + '&detail=' + detail + summary : $('#form_header').serialize() + '&detail=' + detail + summary + '&id=' + _id;
		ajaxNew(url, _data2Send, 'POST')
			.then((data) => {
				loadingProcess(false);
				if (data.result) {
					$('#doc_no_val').val(data.data.dok_no);
					_id = data.data.dok_no;
					action = 'edit';
					getData();
					MsgBox.Notification(data.message.toString());
				} else {
					MsgBox.Notification(data.message.toString());
				}
			})
			.catch((err) => {
				loadingProcess(false);
				MsgBox.Notification(err.toString());
			});
	}).catch(err => {
		console.log(err);
	});
}

function getData() {
		let url = base_url + Modules + '/' + Controller + '/getData2Edit/json/' + _id;
		loadingProcess();
		ajaxNew(url, null, 'GET')
			.then((data) => {
				loadingProcess(false);
				if (data.result) {
					clearFormDetail();
					let row = data.data;
					$('#doc_no_val').val(row.no_doc);
					$('#doc_date').datepicker("setDate", moment(row.tgl_trans).format('DD/MM/YYYY')); 
					$('#supp_id').val(row.supp_id); $('#supp_name').val(row.supp_name);
					$('#termofpayment').val(row.termofpayment);
					$('#statusDocumentContainer').html(getStatus(row.status));
					$('#tanggal_kirim').datepicker("setDate", moment(row.tgl_kirim).format('DD/MM/YYYY'));
					$('#tanggal_batal').datepicker("setDate", moment(row.tgl_batal).format('DD/MM/YYYY'));
					$('#store_id').val(row.store_id); $('#store_name').val(row.store_name);
					$('#note').val(row.keterangan);
					$('#discount').val(accounting.formatNumber(row.value_disc));
					$('#tax').val(row.value_ppn);
					$('#ongkos_kirim').val(accounting.formatNumber(row.ongkos_kirim));
					data4DataTable = data.detail;
					_dataTable.clear().draw();
					setTimeout(() => {
						_dataTable.rows.add(data.detail).draw();
					}, 500);
				} else {
					loadingProcess(false);
					MsgBox.Notification(data.message.toString());
				}
			})
			.catch((err) => {
				MsgBox.Notification(err.toString());
			});
}

function getStatus(status) {
	if (status == 0){
		return '<span class="badge badge-info text-center">Baru</span>';
	} else if (status == 1) {
		return '<span class="badge badge-primary text-center">Proses</span>';
	} else if (status == 2) {
		return '<span class="badge badge-success text-center">Selesai</span>';
	} else {
		return '<span class="badge badge-danger text-center">Batal</span>';
	}
}

// ======= START DATATABLE

function SimpanRowDataTable(DataTableElement, data2save, RowIdx = null) {
   if (DataTableAction == 'edit') {
      DataTableElement.row(RowIdx).data(data2save).draw();
      DataTableElement.rows().invalidate().draw();
   } else {
      DataTableElement.row.add(data2save).draw();
   }
}

function HapusRowDataTable(DataTableElement, RowIdx = null) {
   DataTableElement.row(RowIdx).remove().draw();
   DataTableElement.rows().invalidate().draw();
}

// ======= END DATATABLE

function saveDetail() {
	let list_input = ['item_id', 'uom_id', 'jenis_id'];
	if (!$('#form_detail').valid() || !ValidasiInput(list_input)) {
	// if (!$('#form_detail').valid()) {
      MsgBox.Notification('Periksa kembali inputan anda', 'Input tidak lengkap', 'warning');
   	return;
   }

	// Check jika qty kosong
	if (accounting.unformat($('#qty_order').val(), _decimalSeparator) <= 0) {
		MsgBox.Notification('Qty kosong', 'Input tidak lengkap', 'warning');
   	return;
	}

	let row = null;
   row = _dataTable.rows().data().toArray().filter(data => {
      return $('#item_id').val() == data.item_id;
   });

   if ((row.length > 0 && DataTableAction == 'create') || (row.length > 0 && DataTableAction == 'edit' && $('#item_id').val() != _dataTable.row(DataTableRowIdx).data().item_id)) {
      MsgBox.Notification('Item sudah ada', 'Peringatan', 'warning', true);
      return;
   }

	// Persiapkan inputan
   let data2save = {
      item_id: $('#item_id').val(),
      item_name: $('#item_name').val(),
		jenis_id: $('#jenis_id').val(),
		jenis_name: $('#jenis_name').val(),
		uom_id: $('#uom_id').val(),
		uom_name: $('#uom_name').val(),
		qty: accounting.unformat($('#qty_order').val(), _decimalSeparator),
      harga_beli: accounting.unformat($('#harga_beli').val(), _decimalSeparator),
		jumlah: accounting.unformat($('#qty_order').val(), _decimalSeparator) * accounting.unformat($('#harga_beli').val(), _decimalSeparator),
   };
   // Simpan data
   SimpanRowDataTable(_dataTable, data2save, DataTableRowIdx);
   // Kembalikan DataTableAction dan DataTableRowIdx
   DataTableAction = 'create';
   DataTableRowIdx = 0;
	// Clear form_detail
	clearFormDetail();
}

function editDetail(RowIdx) {
   // Ambil data
   let data2edit = _dataTable.row(RowIdx).data();
   // Set action
   DataTableAction = 'edit';
   // Set DataTableRowIdx
   DataTableRowIdx = RowIdx;
   // Masukkan ke element & fokus
	$('#item_id').val(data2edit.item_id);
	$('#pencarian').val(data2edit.item_id);
	$('#uom_id').val(data2edit.uom_id); $('#uom_name').val(data2edit.uom_name);
	$('#harga_beli').val(accounting.formatNumber(data2edit.harga_beli));
	$('#qty_order').val(accounting.formatNumber(data2edit.qty));
	$('#jumlah').val(accounting.formatNumber(data2edit.jumlah));
	$('#item_name').val(data2edit.item_name);
	$('#jenis_id').val(data2edit.jenis_id); $('#jenis_name').val(data2edit.jenis_name);
	$('#item_id').focus();
}

function deleteDetail(RowIdx) {
   let getData = _dataTable.row(RowIdx).data();

   MsgBox.Confirm('Yakin akan hapus item ' + getData.item_id + ' ini?', 'Hapus item').then(result => {
      HapusRowDataTable(_dataTable, RowIdx);
   }).catch(err => {
      if (err) console.log(err);
   });
}

function LOVSupplier() {
	$('#PopUpModal').load(base_url + 'inventory/purchaseorder/get_supplier_lov/', () => { // Ambil URL untuk membuka modal LOV
		// $(".modal-dialog").css("max-width", "70%");
		$(".modal-dialog").addClass("modal-xl modal-dialog-centered");
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('#list_cols').val(['supp_id', 'supp_name', 'termofpayment']);
		$('#list_controls').val(['#supp_id', '#supp_name', '#termofpayment']);
	});
}

function LOVStore() {
	$('#PopUpModal').load(base_url + 'inventory/purchaseorder/get_store_lov/', () => { // Ambil URL untuk membuka modal LOV
		// $(".modal-dialog").css("max-width", "70%");
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('#list_cols').val(['store_id', 'store_name']);
		$('#list_controls').val(['#store_id', '#store_name']);
	});
}

function LOVItem(search = '') {
	$('#PopUpModal').load(base_url + 'master/item/get_item_hb_lov/home?search=' + search, () => { // Ambil URL untuk membuka modal LOV
		// $(".modal-dialog").css("max-width", "80%");
		$(".modal-dialog").addClass("modal-xl modal-dialog-centered");
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('#list_cols').val(['item_id', 'item_id', 'uom_id', 'uom_name', 'harga_beli', 'item_name', 'jenis_id', 'jenis_name']);
		$('#list_controls').val(['#item_id', '#pencarian', '#uom_id', '#uom_name', '#harga_beli', '#item_name', '#jenis_id', '#jenis_name']);

		$('#ModalLOV').on('hidden.bs.modal', function () {
			if (!_resultFromLOV) return;
			
			$('#qty_order').focus();

			_resultFromLOV = null;
      });
	});
}

function clearFormDetail() {
	DataTableAction = 'create';
	DataTableRowIdx = 0;

	$('#item_id').val(null);
	$('#pencarian').val(null);
	$('#uom_id').val(null); $('#uom_name').val(null);
	$('#harga_beli').val(0); $('#qty_order').val(0); $('#jumlah').val(0);
	$('#item_name').val(null);
	$('#jenis_id').val(null); $('#jenis_name').val(null);
	$('#pencarian').focus();
}