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
				$('#employee_id').val(row.employee_id); $('#employee_name').val(row.employee_name);
				$('#jabatan_code').val(row.jabatan_code); $('#jabatan_name').val(row.jabatan_name);
				$('#divisi_code').val(row.divisi_code); $('#divisi_name').val(row.divisi_name);
				$('#level_name').val(row.level_name); $('#level_code').val(row.level_code);
				$('#lokasi').val(row.lokasi_id);
				$('#join_date').datepicker("update", new Date(row.join_date));	
				$('#atasan_id').val(row.atasan_id); $('#atasan_name').val(row.atasan_name);			
				$('#store_id').val(row.store_id); $('#store_id').prop('readonly', true);
				$('#store_name').val(row.store_name);
				$('#tgl_penempatan').datepicker("update", new Date(row.tgl_penempatan));
				$('#no_ktp').val(row.no_ktp); $('#email').val(row.email); $('#no_telp').val(row.no_telp);
				$('#address').val(row.address);
				$('#country_id').val(row.country_id); $('#country_name').val(row.country_name);
				$('#prov_id').val(row.prov_id); $('#prov_name').val(row.prov_name);
				$('#city_id').val(row.city_id); $('#city_name').val(row.city_name);
				$('#kec_id').val(row.kec_id); $('#kec_name').val(row.kec_name);
				$('#kel_id').val(row.kel_id); $('#kel_name').val(row.kel_name);
				$('#kode_pos').val(row.kode_pos);
				$('#kota_id').val(row.kota_lahir); $('#kota_name').val(row.kota_name);
				$('#edu_code').val(row.pendidkan); $('#edu_name').val(row.edu_name);
				$('#kelamin').val(row.kelamin);
				$('#bank').val(row.bank); $('#no_rek').val(row.no_rek);
				$('#employee_status').val(row.employee_status);
				$('#active').prop('checked', row.active == 1 ? true : false);
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
	$('#join_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	});
	$('#tgl_penempatan').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	});

	//$('#luas_tanah').autoNumeric('init', formatNumber);

	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_input").validate({
		rules: {
			employee_id: {
				required: true,
				number: true,
				nowhitespace: true
			},	
			employee_name: {
				required: true,
			},
			jabatan: {
				required: true
			},
		},
		messages: {
			employee_id: {
            required: "Field ini wajib terisi",
            number: "Hanya angka yang diperbolehkan",
				nowhitespace: "Spasi tidak diperbolehkan"
        },
		  employee_name: {
            required: "Field ini wajib terisi",
        },
		  jabatan: {
            required: "Field ini wajib terisi",
		  },
		}
	});
	// Inisial validasi untuk store info
	//$("#form_info").validate({
	//	rules: {
	//		pilih_info: {
	//			required: true,
	//		},	
	//		desc: {
	//			required: true,
	//		},
	//		remind_me_before_days: {
	//			number: true,
	//		},
	//	},
	//	messages: {
	//		pilih_info: {
      //      required: "Field ini wajib terisi",
    //    },
	//	  desc: {
    //        required: "Field ini wajib terisi",
	//	  },
	//	  remind_me_before_days: {
    //        number: "Hanya angka yang diperbolehkan",
     //   },
	//	}
	//});

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
			"url": base_url + Modules + '/' + Controller + '/getListKaryawanInfo/',
			"type": "POST",
			"data": function ( d ) {
				d.employee_id = $('#employee_id').val();
			},
		},
		"columns": [
			{"data": "divisi_code"},
			{"data": "employee_id"},
			{"data": "employee_name"},
			{"data": "jabatan_name"},
			{"data": "atasan_name"},
			{"data": "join_date"},
			{"data": "employee_status"},
			{"data": "kelamin"},
			{"data": "active"},	
			{"data": null, "width": 60, "className": "text-right"}
      ],
		"columnDefs": [
			{
				"targets": 6,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					switch (row.employee_status) {
						case "1":
							return '<span class="label label-success text-center font-size-sm">TETAP</span>';
							break;
						case "2":
							return '<span class="label label-primary text-center font-size-sm">KONTRAK</span>';
							break;
						case "3":
							return '<span class="label label-danger text-center font-size-sm">TRAINING</span>';
							break;
						case "4":
							return '<span class="label label-warning text-center font-size-sm">PROBITION</span>';
							break;
						case "5":
							return '<span class="label label-default text-center font-size-sm">KHL</span>';
							break;
					}
				},
			},
			{
				"targets": 5,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.join_date != null) {
						return moment(row.join_date).format('DD/MM/YYYY');
					} else {
						return '';
					}
				},
			},
			{
				"targets": 7,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.kelamin == 1) {
						return '<span class="badge badge-warning text-center">PRIA</span>';
					} else {
						return '<span class="badge badge-default text-center">WANITA</span>';
					}
				}
			},
			{
				"targets": 8,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.active == 1) {
						return '<span class="label label-success text-center font-size-sm">Aktif</span>';
					} else {
						return '<span class="label label-danger text-center font-size-sm">Resign</span>';
					}
				}
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
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

// START function default

function app_create() { 
	window.location.href = '#' + Modules + '/' + Controller + '/create';
}

function Simpan() {
	let list_input = ['employee_id', 'employee_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		employee_id: $('#employee_id').val(),
		employee_name: $('#employee_name').val(),
		jabatan_code: $('#jabatan_code').val(),
		join_date: moment($('#join_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		store_id: $('#store_id').val(),
		tgl_penempatan: moment($('#tgl_penempatan').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		no_ktp: $('#no_ktp').val(),
		email: $('#email').val(),
		no_telp: $('#no_telp').val(),
		country_id: $('#country_id').val(),
		prov_id: $('#prov_id').val(),
		city_id: $('#city_id').val(),
		kec_id: $('#kec_id').val(),
		kel_id: $('#kel_id').val(),
		kode_pos: $('#kode_pos').val(),
		address: $('#address').val(),
		//kota_lahir: $('#kota_id').val(), 
		pendidkan: $('#edu_code').val(),
		atasan_id: $('#atasan_id').val(),
		kelamin: $('#kelamin').val(),
		bank: $('#bank').val(),
		no_rek: $('#no_rek').val(),
		employee_status: $('#employee_status').val(),
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
			$('#employee_id').val(row.employee_id); $('#employee_name').val(row.employee_name);
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

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function LOVBank() {
    $('#PopUpModal').load(base_url + 'finance/bank/getBankList/', () => {
        $('#ModalLOV').modal('show');
        $(".modal-dialog").css({width: "600px"});
        $('#list_cols').val(['bank_id','bank_name']);
        $('#list_controls').val(['#bank_id','#bank_name']);
    });
}

function LOVBankClear() {
    $('#bank_id').val(''); $('#bank_name').val('');
}

function LOVAtasan() {
	let divisi = $('#divisi_code').val().trim(); 
	let level = $('#level_code').val().trim();
	$('#PopUpModal').load(base_url + 'hc/karyawan/getAtasanList/home/'+ divisi +'/'+ level, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "800px"}); // Lebar modal LOV
		$('#list_cols').val(['employee_id', 'employee_name','jabatan_name']);
		$('#list_controls').val(['#atasan_id', '#atasan_name','#atasan_jabatan']);
	});
}

function LOVAtasanClear() {
	$('#atasan_id').val('');
	$('#atasan_name').val('');
	$('#atasan_jabatan').val('');
}
function LOVJabatan() {
	$('#PopUpModal').load(base_url + 'hc/jabatan/getJabatanList/home', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "600px"});
		$('#list_cols').val(['jabatan_code','jabatan_name','divisi_name','level_name','lokasi']);
		$('#list_controls').val(['#jabatan_code', '#jabatan_name', '#divisi_name', '#level_name', '#lokasi']);
	});
}

function LOVJabatanClear() {
	$('#jabatan_code').val(''); $('#jabatan_name').val('');
	$('#divisi_name').val(''); $('#level_name').val('');
	$('#lokasi').val('');
}

function LOVPendidikan() {
	$('#PopUpModal').load(base_url + 'hc/pendidikan/getPendidikanList/', () => {
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "600px"});
		$('#list_cols').val(['edu_code','edu_name']);
		$('#list_controls').val(['#edu_code','#edu_name']);
	});
}

function LOVPendidikanClear() {
	$('#edu_code').val(''); $('#edu_name').val('');
}

function LOVToko() {
	$('#PopUpModal').load(base_url + 'administrasi/store/getStoreList/', () => {
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "600px"});
		$('#list_cols').val(['store_id','store_name']);
		$('#list_controls').val(['#store_id','#store_name']);
	});
}

function LOVTokoClear() {
	$('#store_id').val(''); $('#store_name').val('');
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

function LOVKota(){
	$('#PopUpModal').load(base_url + 'administrasi/store/getKotaList/home/', () => {
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "600px"});
		$('#list_cols').val(['city_id', 'city_name']);
		$('#list_controls').val(['#kota_id', '#kota_name']);
	});
}

function LOVKotaClear() {
	$('#kota_id').val(''); $('#kota_name').val('');
}

function LOVCountry(country_id = null, country_name = null) {
	$('#PopUpModal').load(base_url + 'administrasi/store/getCountryList/home/', () => { // Ambil URL untuk membuka modal LOV
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
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getProvinceList/home/'+ idcountry, () => { // Ambil URL untuk membuka modal LOV
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
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getCityList/home/'+ idprov, () => { // Ambil URL untuk membuka modal LOV
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
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getKecList/home/'+ idcity, () => { // Ambil URL untuk membuka modal LOV
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
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getKelList/home/'+ idkec, () => { // Ambil URL untuk membuka modal LOV
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
	$('#PopUpModal').load(base_url + 'setting/regional/getEmployeeList/', () => { // Ambil URL untuk membuka modal LOV
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

function ResetForm() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function preview_attach_image(image_url = '') {
	$('#ModalPreviewImage').modal('show');
	$("#PreviewAttachImage").attr("src", image_url);
}