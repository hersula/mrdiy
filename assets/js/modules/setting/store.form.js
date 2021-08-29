(function () {
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
				$('#wil_id').val(row.wil_id); $('#wil_name').val(row.wil_name);
				$('#price_grade_code').val(row.price_grade_code); $('#price_grade_name').val(row.price_grade_name);
				$('#store_id').val(row.store_id); $('#store_id').prop('readonly', true);
				$('#store_name').val(row.store_name);
				$('#alamat').val(row.alamat);
				$('#country_id').val(row.country_id); $('#country_name').val(row.country_name);
				$('#prov_id').val(row.prov_id); $('#prov_name').val(row.prov_name);
				$('#city_id').val(row.city_id); $('#city_name').val(row.city_name);
				$('#kec_id').val(row.kec_id); $('#kec_name').val(row.kec_name);
				$('#kel_id').val(row.kel_id); $('#kel_name').val(row.kel_name);
				$('#kode_pos').val(row.kode_pos);
				$('#status_bangunan').val(row.status_bangunan);
				$('#grade').val(row.grade);
				// $('#go_date').val(moment(row.go_date).format('DD/MM/YYYY'));
				$("#go_date").datepicker("update", new Date(row.go_date));

				$('#status_bangunan').val(row.status_bangunan);
				$('#luas_tanah').val(accounting.formatNumber(row.luas_tanah, 2));
				$('#luas_bangunan').val(accounting.formatNumber(row.luas_bangunan, 2));
				$('#gross_selling_space').val(accounting.formatNumber(row.gross_selling_space, 2));
				$('#net_selling_space').val(accounting.formatNumber(row.net_selling_space, 2));

				$('#sm_id').val(row.sm_id); $('#sm_name').val(row.sm_name);
				$('#mcd_id').val(row.mcd_id); $('#mcd_name').val(row.mcd_name);
				$('#tech_id').val(row.tech_id); $('#tech_name').val(row.tech_name);
				$('#edp_id').val(row.edp_id); $('#edp_name').val(row.edp_name);
				$('#vm_id').val(row.vm_id); $('#vm_name').val(row.vm_name);

				$('#status').prop('checked', row.status == 1 ? true : false);

				$('#store_id_info').val(row.store_id);
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
	$('#go_date').datepicker({
   	format: 'dd/mm/yyyy',
	});

	$('#due_date').datepicker({
   	format: 'dd/mm/yyyy',
	});

	$('#luas_tanah').autoNumeric('init', formatDecimalNumber);
	$('#luas_bangunan').autoNumeric('init', formatDecimalNumber);
	$('#gross_selling_space').autoNumeric('init', formatDecimalNumber);
	$('#net_selling_space').autoNumeric('init', formatDecimalNumber);

	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_input").validate({
		rules: {
			store_id: {
				required: true,
				number: true,
				nowhitespace: true
			},	
			store_name: {
				required: true,
			},
			grade: {
				required: true
			},
			alamat: {
				required: true
			},
			luas_tanah: {
				number: true,
			},
			luas_bangunan: {
				number: true,
			},
			gross_selling_space: {
				number: true,
			},
			net_selling_space: {
				number: true,
			},
		},
		messages: {
			store_id: {
            required: "Field ini wajib terisi",
            number: "Hanya angka yang diperbolehkan",
				nowhitespace: "Spasi tidak diperbolehkan"
        },
		  store_name: {
            required: "Field ini wajib terisi",
        },
		  grade: {
            required: "Field ini wajib terisi",
		  },
		  alamat: {
            required: "Field ini wajib terisi",
		  },
		  luas_tanah: {
				number: "Hanya angka yang diperbolehkan",
		  },
		  luas_bangunan: {
				number: "Hanya angka yang diperbolehkan",
		  },
		  gross_selling_space: {
				number: "Hanya angka yang diperbolehkan",
		  },
		  net_selling_space: {
				number: "Hanya angka yang diperbolehkan",
        },
		}
	});
	// Inisial validasi untuk store info
	$("#form_info").validate({
		rules: {
			pilih_info: {
				required: true,
			},	
			desc: {
				required: true,
			},
			remind_me_before_days: {
				number: true,
			},
		},
		messages: {
			pilih_info: {
            required: "Field ini wajib terisi",
        },
		  desc: {
            required: "Field ini wajib terisi",
		  },
		  remind_me_before_days: {
            number: "Hanya angka yang diperbolehkan",
        },
		}
	});

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
	// DataTable untuk info
	DataTableInfo = $('#table_list_data').DataTable({ 
		"pageLength": 10,
		"numbers_length": 4,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getListStoreInfo/',
			"type": "POST",
			"data": function ( d ) {
				d.store_id = $('#store_id').val();
			},
		},
		"columns": [
			{"data": "info_name"},
			{"data": "desc"},
			{"data": "remind_me"},
			{"data": "due_date"},	
			{"data": "action", "width": 60, "className": "text-right"}
      ],
		"columnDefs": [
			{
				"targets": 2,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					let remind = '';
					if (row.remind_me == 1){
						remind = '<span class="label label-success text-center font-size-sm">YA</span> - ' + row.remind_me_before_days + ' hari sebelum due date';
					} else {
						remind = '<span class="label label-danger text-center font-size-sm">TIDAK</span>';
					}

					return remind;
				},
			},
			{
				"targets": 3,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.due_date != null) {
						return moment(row.due_date).format('DD/MM/YYYY');
					} else {
						return '';
					}
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (row.img_file != '') {
						actions = '<a href="#" class="btn btn-pretty btn-info btn-xs" onclick="preview_attach_image(\'' + row.image_url + '\');"><i class="glyphicon glyphicon-eye-open"></i> </a> ';
					}
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="editInfo2Store(' + row.id + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="deleteInfo2Store(' + row.id + ', \'' + row.info_name + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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
	let list_input = ['wil_id', 'wil_name', 'go_date', 'country_id', 'country_name', 'prov_id', 'prov_name', 'city_id', 'city_name', 'kec_id', 'kec_name', 'kel_id', 'kel_name',
							'sm_id', 'sm_name', 'price_grade_code', 'price_grade_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		wil_id: $('#wil_id').val(),
		price_grade_code: $('#price_grade_code').val(),
		store_id: $('#store_id').val(),
		store_name: $('#store_name').val(),
		alamat: $('#alamat').val(),
		country_id: $('#country_id').val(),
		prov_id: $('#prov_id').val(),
		city_id: $('#city_id').val(),
		kec_id: $('#kec_id').val(),
		kel_id: $('#kel_id').val(),
		kode_pos: $('#kode_pos').val(),
		grade: $('#grade').val(),
		status_bangunan: $('#status_bangunan').val(),
		luas_tanah: accounting.unformat($('#luas_tanah').val()),
		luas_bangunan: accounting.unformat($('#luas_bangunan').val()),
		gross_selling_space: accounting.unformat($('#gross_selling_space').val()),
		net_selling_space: accounting.unformat($('#net_selling_space').val()),
		go_date: moment($('#go_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		sm_id: $('#sm_id').val(),
		mcd_id: $('#mcd_id').val(),
		tech_id: $('#tech_id').val(),
		edp_id: $('#edp_id').val(),
		vm_id: $('#vm_id').val(),		
		status: $('#status').is(':checked') ? 1 : 0
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST')
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

function LOVWilayah() {
	$('#PopUpModal').load(base_url + 'setting/wilayah/getWilayahList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['wil_id', 'wil_name']);
		$('#list_controls').val(['#wil_id', '#wil_name']);
	});
}

function LOVWilayahClear() {
	$('#wil_id').val(''); $('#wil_name').val('');
}

function LOVGradePrice() {
	$('#PopUpModal').load(base_url + 'master/pricegrade/getPriceGradeList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['price_grade_code', 'price_grade_name']);
		$('#list_controls').val(['#price_grade_code', '#price_grade_name']);
	});
}

function LOVGradePriceClear() {
	$('#price_grade_code').val(''); $('#price_grade_name').val('');
}

function LOVCountry(country_id = null, country_name = null) {
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getCountryList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "900px"}); // Lebar modal LOV
		$('#list_cols').val(['country_id', 'country_name']);
		$('#list_controls').val(['#country_id', '#country_name']);
		$('#prov_id').val('');
		$('#prov_name').val('');
	});
}

function LOVCountryClear(emp_id = null, emp_name = null) {
	$('#country_id').val(''); $('#country_name').val('');
}

function LOVPro() {
	let idcountry = $('#country_id').val().trim();
	if(idcountry == '') {
		MsgBox.Notification('Negara kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getProvinceList/home/'+ idcountry, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['prov_id', 'prov_name']);
		$('#list_controls').val(['#prov_id', '#prov_name']);
		$('#city_id').val('');
		$('#city_name').val('');
	});
}

function LOVProClear() {
	$('#prov_id').val(''); $('#prov_name').val('');
}

function LOVCity() {
	let idprov = $('#prov_id').val().trim();
	if(idprov == '') {
		MsgBox.Notification('Provinsi kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getCityList/home/'+ idprov, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['city_id', 'city_name']);
		$('#list_controls').val(['#city_id', '#city_name']);
		$('#kec_id').val('');
		$('#kec_name').val('');
	});
}

function LOVCityClear() {
	$('#city_id').val(''); $('#city_name').val('');
}

function LOVKec() {
	let idcity = $('#city_id').val().trim();
	if(idcity == '') {
		MsgBox.Notification('Kota / Kabupaten kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getKecList/home/'+ idcity, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['kec_id', 'kec_name']);
		$('#list_controls').val(['#kec_id', '#kec_name']);
		$('#kel_id').val('');
		$('#kel_name').val('');
	});
}

function LOVKecClear() {
	$('#kec_id').val(''); $('#kec_name').val('');
}

function LOVKel() {
	let idkec = $('#kec_id').val().trim();
	if(idkec == '') {
		MsgBox.Notification('Kecamatan kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getKelList/home/'+ idkec, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['kel_id', 'kel_name']);
		$('#list_controls').val(['#kel_id', '#kel_name']);
	});
}

function LOVKelClear() {
	$('#kel_id').val(''); $('#kel_name').val('');
}

function LOV(emp_id = null, emp_name = null) {
	$('#PopUpModal').load(base_url + 'master/karyawan/getKaryawanList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['employee_id', 'employee_name']);
		$('#list_controls').val(['#' + emp_id, '#' + emp_name]);
	});
}

function LOVClear(emp_id = null, emp_name = null) {
	$('#' + emp_id).val(''); $('#' + emp_name).val('');
}



function addInfo() {
	// Image upload
	initFileUpload();
	// Reset form
	ResetFormInfo();
	// Tampilkan modal
	$('#ModalFormInfo').modal('show');
}

function addInfo2Store() {
	let list_input = ['due_date'];
	if (!$('#form_info').valid() || (!ValidasiInput(list_input) && $('#remind_me').is(':checked'))) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}

	let formData = new FormData($('#form_info')[0]);
	MsgBox.Confirm('Yakin akan simpan info ini?').then(result => {
		let url = base_url + Modules + '/' + Controller + '/addInfo2Store/';
		FetchWithTimeoutNew(url, formData, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				ResetFormInfo();
				$('#ModalFormInfo').modal('hide');
				Refresh();
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

function deleteInfo2Store(id = null, param = '') {
	data2Send = JSON.stringify({
		id: id
	});
	MsgBox.Confirm('Hapus info toko ' + param + ' ?').then(result => {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/deleteInfo2Store/', data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				data2Send = null;
				ResetFormInfo();
				Refresh();
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

function editInfo2Store(id = null) {
	FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2EditInfo2Store/json/' + id, null, 'GET', 5000)
	.then((data) => {
		if (data.result) {
			let row = data.data;
			ResetFormInfo();
			$('#id').val(row.id);
			$('#store_id_info').val(row.store_id);
			$('#pilih_info').select2('data', {"id": row.info_id, "text": row.info_name});
			$('#desc').val(row.desc);
			$('#remind_me').prop('checked', row.remind_me == 1 ? true : false);
			if (row.due_date != null) {
				// $('#due_date').val(row.due_date != null ? moment(row.due_date).format('DD/MM/YYYY') : '');
				$("#due_date").datepicker("update", new Date(row.due_date));
			}
			$('#remind_me_before_days').val(row.remind_me_before_days);

			// Tanpa plugin fileinput
			/* if (row.img_file != '' || row.img_file.trim() != '') {
				$("#PreviewImage").empty();
				$('#PreviewImage').prepend('<img class="img-responsive" src="' + row.image_url + '" style="width:auto;height:160px;" />')
			} else {
				$("#PreviewImage").empty();
			} */

			// Load image menggunakan fileinput
			initFileUpload();
			$('#img_file_name').val(row.img_file);

			$('#ModalFormInfo').modal('show');
		} else {
			MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
		}
	})
	.catch((err) => {
		MsgBox.Notification(err.toString(), 'bottom right', 'warning');
	});
}

function initFileUpload() {
	$("#UploadContainer").empty();
	$('#UploadContainer').prepend(`
		<div class="form-group">
			<label class="control-label">Only images</label>
			<input type="hidden" name="img_file_name" id="img_file_name" value="" class="ignore" />
			<input type="file" id="img_file" name="img_file" accept="image/*" data-show-upload="false" class="ignore" />
		</div>
	`)
	$("#img_file").fileinput({
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
  });
}

function Refresh() {
	data2Send = null;
	DataTableInfo.ajax.reload(null,false);
}

function ResetFormInfo() {
	action = 'create';
	$("#id").val("");
	$("#pilih_info").select2("val", "");
	$('#remind_me').prop('checked', false);
	$('#form_info')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function preview_attach_image(image_url = '') {
	$('#ModalPreviewImage').modal('show');
	$("#PreviewAttachImage").attr("src", image_url);
}