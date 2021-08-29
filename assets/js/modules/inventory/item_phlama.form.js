
(function () {
	$('#hbeli').autoNumeric('init', formatNumber);
	$('#min_order').autoNumeric('init', formatNumber);
	$('#harga_jual').autoNumeric('init', formatNumber);
	
	// function construct
	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
		.then((data) => {
			if (data.result) {
				let row = data.data;
				
				$('#sku_id').val(row.sku_id);
				$('#barcode').val(row.barcode);
				$('#sku_desc').val(row.sku_desc);

				$('#dept_id').val(row.dept_id); $('#dept_name').val(row.dept_id + ' - ' + row.dept_name);
				$('#mclass_id').val(row.mclass_id); $('#mclass_name').val(row.mclass_id + ' - ' + row.mclass_name);
				$('#supp_id').val(row.supp_id); $('#supp_name').val(row.supp_name); prev_supp_id = row.supp_id;
			
				$('#brand_id').val(row.brand_id); $('#brand_name').val(row.brand_id + ' - ' + row.brand_name);
				$('#size_id').val(row.size_id); $('#size_id').val(row.size_id);	
				$('#size_name').val(row.size_name); $('#size_name').val(row.size_name);						
			
				$('#article').val(row.article); 
				
				$('#hbeli').val(accounting.formatNumber(row.hbeli));
				$('#min_order').val(accounting.formatNumber(row.min_order));
				$('#status').prop('checked', row.active == 1 ? true : false);

				if (row.pic_depan !== null && row.pic_depan !== '') {
					$("#pic_depan").attr("src", base_url + 'upload/images/items/' + row.pic_depan);
					$('#old_file_name_pic_depan').val(row.pic_depan);
				}

				if (row.pic_belakang !== null && row.pic_belakang !== '') {
					$("#pic_belakang").attr("src", base_url + 'upload/images/items/' + row.pic_belakang);
					$('#old_file_name_pic_belakang').val(row.pic_belakang);
				}

				
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

	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan item
	$("#form_input").validate({
		rules: {
			article: {
				required: true,
			},	
			sku_desc: {
				required: true,
			},
			article_supp: {
				required: true,
				nowhitespace: true
			},
			hbeli: {
				required: true,
				number: true,
			},
			min_order: {
				required: true,
				number: true,
			},
		},
	});
	// Inisial validasi untuk harga jual
	$("#form_hjual").validate({
		rules: {
			pilih_price_code: {
				required: true,
			},	
			margin_supplier: {
				required: true,
				number: true,
				range: [0, 100]
			},
			margin_price_grade: {
				required: true,
				number: true,
				range: [0, 100]
			},
			margin_markup: {
				required: true,
				number: true,
				range: [0, 10000]
			},
			harga_jual: {
				required: true,
				number: true,
			},
		},
	});

	// Select2 untuk pilih price grade
	$('#pilih_price_code').select2({
		width:'100%',
		placeholder: "Pencarian Price Code...",
		// minimumInputLength: 3,
		allowClear: true,
		ajax: { 
			url: base_url + 'sales/pricegrade/getPriceGradeSelect2',
			type: "POST",
			dataType: 'json',
			delay: 500,
			data: function (term, page) {
				return JSON.stringify({
					keyword: term
				});
			},
			processResults: function (data, page) { // parse the results into the format expected by Select2.
				return { 
					results: $.map(data, function (item) {
						return {
							margin: item.margin,
							text: item.price_grade_name,
							id: item.price_grade_code
						}
				  }) 
				};
			},
			cache: true
		},
	});

	$("#pilih_price_code").on("change", function(e) { 
		// console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed})); 
		let data = $(this).select2('data')[0];
		// let data = e.added;
		// let val = e.val;
		$('#margin_price_grade').val(accounting.formatNumber(data.margin, 2));
		HitungHargaJual('margin');
		$('#harga_jual').focus();
	});

	// Timeout untuk datatable
	setTimeout(() => {
		LoadDataTable();
	}, 500);


	initFileUpload();
}

function LoadDataTable() {
	// DataTable untuk harga
	DataTableHarga = $('#table_list_harga').DataTable({ 
		"pageLength": 10,
		"numbers_length": 4,
		"responsive": true,
		"data": data4DataTable,
		"columns": [
			{"data": "price_grade_name"},
			{"data": "margin_supplier", "className": "text-right"},
			{"data": "margin_price_grade", "className": "text-right"},
			{"data": "margin_markup", "className": "text-right"},
			{"data": "harga_jual", "className": "text-right"},	
			{"data": null, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 4,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					return accounting.formatNumber(row.harga_jual);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1 && action === 'create') {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditHargaJual(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					return actions;
				},
			},
		],
	});
}

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function Simpan() {
	let list_input = [];
	
	if (action === 'create') {
		list_input = [
							'mclass_id', 'mclass_name', 'supp_id', 'supp_name', 							
							'brand_id', 'brand_name', 'size_id', 'size_name', 'article'

						];
	} else {
		list_input = [
			'sku_id', 'barcode',
			'mclass_id', 'mclass_name', 'supp_id', 'supp_name', 			
			'brand_id', 'brand_name', 'size_id', 'size_name','article'
		];
	}
	// console.log(DataTableHarga.rows().data().length)
	if (!$('#form_input').valid() || !ValidasiInput(list_input) || DataTableHarga.rows().data().length <= 0) {
		MsgBox.Notification('Periksa inputan dan harga jual anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		id: id,
		sku_id: $('#sku_id').val(),
		barcode: $('#barcode').val(),
		sku_desc: $('#sku_desc').val().trim(),
		dept_id: $('#dept_id').val(),
		mclass_id: $('#mclass_id').val(),
		supp_id: $('#supp_id').val(),			
		brand_id: $('#brand_id').val(),
		size_id: $('#size_id').val(),	
		article: $('#article').val(),		
		hbeli: accounting.unformat($('#hbeli').val()),
		min_order: accounting.unformat($('#min_order').val()),
		active: $('#status').is(':checked') ? 1 : 0,
		price_list: DataTableHarga.rows().data().toArray()
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
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning', 'normal', 20000);
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
		});
	}).catch(err => {
		console.log(err);
	});
}

function LOVDept() {
	$('#PopUpModal').load(base_url + 'inventory/dept_lama/getDeptList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['dept_id', 'dept_name']);
		$('#list_controls').val(['#dept_id', '#dept_name']);
	});
}

function LOVDeptClear() {
	$('#dept_id').val('');
	$('#dept_name').val('');
}



function LOVMMClass() {
	$('#PopUpModal').load(base_url + 'inventory/mclass_lama/getMclassList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('#list_cols').val(['mclass_id', 'mclass_name']);
		$('#list_controls').val(['#mclass_id', '#mclass_name']);
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");

		$('#ModalLOV').on('hidden.bs.modal', function () {
			if ($('#mclass_id').val().trim() !== '') {
				$('#mclass_name').val($('#mclass_id').val() + ' - ' + $('#mclass_name').val());
			}			
		});
	});
}

function LOVMMClassClear() {
	$('#mclass_id').val(''); $('#mclass_name').val('');
	
}

function LOVSupp() {
	$('#PopUpModal').load(base_url + 'pembelian/supplier/getSupplierList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['supp_id', 'supp_name', 'margin']);
		$('#list_controls').val(['#supp_id', '#supp_name', '#margin']);
		
		$('#ModalLOV').on('hidden.bs.modal', function () {
			if (prev_supp_id !== $('#supp_id').val().trim()) {
				SupplierGanti();
			}
			prev_supp_id = $('#supp_id').val();
		});
	});
}

function LOVSuppClear() {
	$('#supp_id').val(''); $('#supp_name').val(''); $('#margin').val(0);
	DataTableHarga.clear().draw();
}


function LOVBrand() {
	$('#PopUpModal').load(base_url + 'inventory/brand/getBrandList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['brand_id', 'brand_name']);
		$('#list_controls').val(['#brand_id', '#brand_name']);

		$('#ModalLOV').on('hidden.bs.modal', function () {
			if ($('#brand_id').val().trim() !== '') {
				$('#brand_name').val($('#brand_id').val() + ' - ' + $('#brand_name').val());
			}			
		});

	});
}

function LOVBrandClear() {
	$('#brand_id').val(''); $('#brand_name').val('');
}

function LOVSize() {
	$('#PopUpModal').load(base_url + 'inventory/size/getSizeList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['size_id', 'size_name']);
		$('#list_controls').val(['#size_id', '#size_name']);
	
	});
}

function LOVSizeClear() {
	$('#size_id').val(''); $('#size_name').val('');	
}

function HargaBeliOnBlur() {
	if (accounting.unformat($('#hbeli').val()) > 0) {
		DataTableHarga.clear().draw();
	}
}

function SupplierGanti() {
	DataTableHarga.clear().draw();
}


function TambahHargaJual() {
	let list_input = ['supp_id', 'supp_name'];
	if (!ValidasiInput(list_input) || parseInt($('#hbeli').val()) <= 0 || $('#hbeli').val().trim() === '') {
		MsgBox.Notification('Periksa supplier dan harga beli.', 'bottom right', 'warning', 'mini');
		return;
	}

	// Image upload
	initFileUpload();
	// Reset form
	ResetFormHJual();
	// Tampilkan modal
	$('#ModalFormHargaJual').modal('show');
	$('#margin_supplier').val(accounting.formatNumber($('#margin').val(), 2));
	$('#harga_beli').val($('#hbeli').val());
	HitungHargaJual('margin');
}

function EditHargaJual(rowIdx) {
	let data2edit = DataTableHarga.row(rowIdx).data();
	ResetFormHJual();
	actionHargaDT = 'edit';
	RowIdxHargaDT = rowIdx;
	$("#hitung_price_grade_lain_container").hide();
	$('#pilih_price_code').select2('data', {"id": data2edit.price_grade_code, "text": data2edit.price_grade_name});
	$('#margin_supplier').val(accounting.formatNumber(data2edit.margin_supplier, 2));
	$('#margin_price_grade').val(accounting.formatNumber(data2edit.margin_price_grade, 2));
	$('#margin_markup').val(accounting.formatNumber(data2edit.margin_markup, 2));
	$('#harga_beli').val(accounting.formatNumber(data2edit.harga_beli));
	$('#harga_jual').val(accounting.formatNumber(data2edit.harga_jual));
	$('#ModalFormHargaJual').modal('show');
	$('#harga_jual').focus();
}

function TambahPriceGrade() {
	let list_input = ['margin_supplier', 'margin_price_grade', 'margin_markup', 'harga_jual'];
	if (!$('#form_hjual').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa input harga jual anda.', 'bottom right', 'warning', 'mini');
		return;
	}

	if (actionHargaDT === 'edit') {
		DataTableHarga.row(RowIdxHargaDT).data({
			price_grade_code: $('#pilih_price_code').val(),
			price_grade_name: $('#pilih_price_code').select2('data').text,
			margin_supplier: accounting.unformat($('#margin_supplier').val()),
			margin_price_grade: accounting.unformat($('#margin_price_grade').val()),
			margin_markup: accounting.unformat($('#margin_markup').val()),
			harga_beli: accounting.unformat($('#harga_beli').val()),
			harga_jual: accounting.unformat($('#harga_jual').val()),
		}).draw();
		MsgBox.Notification('Harga jual ' + $('#pilih_price_code').select2('data').text + ' telah diupdate.', 'bottom right', 'success', 'mini');
		$('#ModalFormHargaJual').modal('hide');
		return;
	}

	if ($('#hitung_price_grade_lain').is(':checked')) {

		DataTableHarga.clear().draw();
		priceGradeList.map((val, idx) => {
			createHargaJual(val.price_grade_code, accounting.unformat(val.margin), function(result) {
				DataTableHarga.row.add({
					price_grade_code: val.price_grade_code,
					price_grade_name: val.price_grade_name,
					margin_supplier: result.marginSupplier,
					margin_price_grade: result.marginPriceGrade,
					margin_markup: parseFloat(result.marginMarkUp).toFixed(2),
					harga_beli: accounting.unformat($('#harga_beli').val()),
					harga_jual: result.hargaJual,
				}).draw();
	
				if (idx === priceGradeList.length - 1) {
					MsgBox.Notification('Harga jual telah ditambahkan beserta price grade yang lainnya.', 'bottom right', 'success', 'normal');
					$('#ModalFormHargaJual').modal('hide');
				}
			});
		});

	} else {

		// Cek jika harga pada price code tersebut sudah ada.
		let ListData = DataTableHarga.rows().data().toArray();
		checkInputHargaJual(ListData, $('#pilih_price_code').val(), function(result) {
			if (!result) {
				MsgBox.Notification('Harga untuk ' + $('#pilih_price_code').select2('data').text + ' sudah ada.', 'bottom right', 'warning');
			} else {
				DataTableHarga.row.add({
					price_grade_code: $('#pilih_price_code').val(),
					price_grade_name: $('#pilih_price_code').select2('data')[0].text,
					margin_supplier: accounting.unformat($('#margin_supplier').val()),
					margin_price_grade: accounting.unformat($('#margin_price_grade').val()),
					margin_markup: accounting.unformat($('#margin_markup').val()),
					harga_beli: accounting.unformat($('#harga_beli').val()),
					harga_jual: accounting.unformat($('#harga_jual').val()),
				}).draw();
				MsgBox.Notification('Harga jual sudah ditambahkan.', 'bottom right', 'success', 'mini');
				$('#ModalFormHargaJual').modal('hide');
			}
		});

	}
}

function createHargaJual(price_code, margin_price_grade = 0, callback) {
	// Ambil nilai yang diperlukan dari input dan parameter
	let hbeli = accounting.unformat($('#harga_beli').val());
	let marginSupplier = accounting.unformat($('#margin_supplier').val());
	let marginPriceGrade = price_code.trim() === $('#pilih_price_code').val().trim() ? accounting.unformat($('#margin_price_grade').val()) : margin_price_grade;
	let marginMarkUp = price_code.trim() === $('#pilih_price_code').val().trim() ? accounting.unformat($('#margin_markup').val()) : 0;
	// Hitung margin value
	let marginSupplierVal = hbeli * (marginSupplier / 100);
	let marginPriceGradeVal = hbeli * (marginPriceGrade / 100);
	let marginMarkUpVal = hbeli * (marginMarkUp / 100);
	// Hitung harga jual dan marginmarkup
	let hjual = price_code.trim() === $('#pilih_price_code').val().trim() ? accounting.unformat($('#harga_jual').val()) : (hbeli + marginSupplierVal + marginPriceGradeVal);
	let selisih = price_code.trim() === $('#pilih_price_code').val().trim() ? (accounting.unformat($('#harga_jual').val()) - hjual) : 0;
	marginMarkUp = price_code.trim() === $('#pilih_price_code').val().trim() ? marginMarkUp : (selisih / hjual) * 100;
	
	// Persiapkan callback
	let result = {
		hargaJual: hjual,
		marginSupplier: marginSupplier,
		marginPriceGrade: marginPriceGrade,
		marginMarkUp: marginMarkUp
	}
	callback(result)
}

function checkInputHargaJual(data, price_code, callback) {
	let result = true;
	if (data.length > 0) {
		data.map((val, idx) => {
			if (val.price_grade_code.trim() === price_code.trim()) {
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

function HitungHargaJual(param = 'hjual') {
	// Ambil nilai yang diperlukan dari input
	let hbeli = accounting.unformat($('#harga_beli').val());
	let marginSupplier = accounting.unformat($('#margin_supplier').val());
	let marginPriceGrade = accounting.unformat($('#margin_price_grade').val());
	let marginMarkUp = accounting.unformat($('#margin_markup').val());
	// Hitung margin value
	let marginSupplierVal = hbeli * (marginSupplier / 100);
	let marginPriceGradeVal = hbeli * (marginPriceGrade / 100);
	let marginMarkUpVal = hbeli * (marginMarkUp / 100);
	// Jika param hjual
	if (param === 'hjual') {
		let hjual = hbeli + marginSupplierVal + marginPriceGradeVal;
		let selisih = accounting.unformat($('#harga_jual').val()) - hjual;
		marginMarkUp = (selisih / hjual) * 100;
		$('#margin_markup').val(accounting.formatNumber(marginMarkUp, 2));
	} else {
		let HjualFinal = hbeli + marginSupplierVal + marginPriceGradeVal + marginMarkUpVal;
		$('#harga_jual').val(accounting.formatNumber(HjualFinal));
	}
}

function initFileUpload() {
	$("#UploadContainer").empty();
	$('#UploadContainer').prepend(`
		<div class="form-group">
			<label class="control-label">Only images</label>
			<input type="hidden" name="img_file_name" id="img_file_name" value="" class="ignore" />
			<input type="file" id="img_file" name="img_file" accept="image/*" class="ignore" />
		</div>
	`)
	$("#img_file").fileinput({
		uploadUrl: base_url + Modules + '/' + Controller + '/UploadGambar/',
		previewFileType: "image",
		allowedFileExtensions: ['png', 'jpg', 'jpeg'],
		msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
		previewFileType: "image",
		browseClass: "btn btn-success btn-sm font-size-sm",
		browseLabel: "Pilih Gambar",
		browseIcon: '<i class="glyphicon glyphicon-picture"></i> ',
		removeClass: "btn btn-danger btn-sm font-size-sm",
		removeLabel: "Batal",
		removeIcon: '<i class="glyphicon glyphicon-trash"></i> ',
		uploadClass: "btn btn-info btn-sm font-size-sm",
		uploadLabel: "Upload",
		uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ',
  	}).on('fileuploaded', function(e, params) {
		// console.log('file uploaded', e, params);
		if (params.response.result) {
			$('#img_file').fileinput('reset');
			MsgBox.Notification(params.response.msg, 'bottom right', 'success');
			if (params.response.data.upload_untuk === 'DEPAN') {
				$("#pic_depan").attr("src", base_url + 'upload/images/items/' + params.response.data.pic_depan);
				$('#old_file_name_pic_depan').val(params.response.data.pic_depan);
			} else {
				$("#pic_belakang").attr("src", base_url + 'upload/images/items/' + params.response.data.pic_belakang);
				$('#old_file_name_pic_belakang').val(params.response.data.pic_belakang);
			}
		} else {
			MsgBox.Notification(params.response.msg, 'bottom right', 'warning');
		}
 	}).on('filepreupload', function(event, data, previewId, index, jqXHR) {
		data.form.append("id", id);
		data.form.append("upload_untuk", $('#upload_untuk').val());
		data.form.append("old_file_name_pic_depan", $('#old_file_name_pic_depan').val());
		data.form.append("old_file_name_pic_belakang", $('#old_file_name_pic_belakang').val());
  	});
}

function Refresh() {
	data2Send = null;
	DataTableHarga.ajax.reload(null,false);
}

function ResetFormHJual() {
	actionHargaDT = 'create';
	RowIdxHargaDT = 0;
	$("#id").val("");
	// $("#pilih_price_code").select2("val", "");
	$("#hitung_price_grade_lain_container").show();
	$('#form_hjual')[0].reset(); // Kosongkan input
	clearValidation('#form_hjual');
}

function preview_attach_image(image_url = '') {
	$('#ModalPreviewImage').modal('show');
	$("#PreviewAttachImage").attr("src", image_url);
}