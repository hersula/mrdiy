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
                $('#tahun').val(row.tahun);
				$('#employee_id').val(row.employee_id); $('#employee_name').val(row.employee_name);
				$('#divisi_code').val(row.divisi_code); $('#penilai').val(row.penilai);
				$('#atasan_penilai').val(row.atasan_penilai); $('#total_nilai').val(row.total_nilai);
				$('#code_nilai').val(row.code_nilai);
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
	});

	$('#tgl_penempatan').datepicker({
   	format: 'dd/mm/yyyy',
	});

	var masks = $('.inputmask');
    masks.each(function(ind, el){
    	var $el = $(el);
        var obj= {};
        if ($el.data('mask')){
        	obj.mask = $el.data('mask');
        }
        if ($el.data('mask-placeholder')){
        	obj.placeholder = $el.data('mask-placeholder');
        }
        $el.inputmask(obj);
    });


	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_input").validate({
		rules: {
			total_nilai: {
				required: true,
				number: true,
				nowhitespace: true
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
		total_nilai: {
            required: "Field ini wajib terisi",
		  },
		}
	});

	$('#demo-wizard1').bootstrapWizard({
		onTabClick: function(li, ul, ind, ind2){
			var $newli = ul.find('li').eq(ind2);
			if ($newli.hasClass('complete')){
				return true;
			}else{
				return false;
			}
		},
		onNext: function(li, ul, index){
			var $wizard = ul.closest('.wizard');
			var $pane = $wizard.find('.tab-pane').eq(index - 1);
			var $fields = $pane.find('[name]');
			var $form = $('#demo-form1');
			var validator = $form.validate();
			validator.form();
			var ISVALID = true;
			$fields.each(function(index, field){
				var fieldSelector = '#demo-form1 [name="'+field.name+'"]';
				validator.element(fieldSelector);
				if ( ! validator.valid(fieldSelector)){
					ISVALID = false;
				}
			});
			if (ISVALID){
				li.addClass('complete');
			}
			return ISVALID;
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
			"url": base_url + Modules + '/' + Controller + '/getListKpiInfo/',
			"type": "POST",
			"data": function ( d ) {
				d.employee_id = $('#employee_id').val();
			},
		},
		"columns": [
			{"data": "tahun"},
			{"data": "employee_id"},
			{"data": "employee_name"},
			{"data": "divisi_code"},
			{"data": "penilai"},
			{"data": "atasan_penilai"},
            {"data": "total_nilai"},
            {"data": "code_nilai"},	
			{"data": "action", "width": 60, "className": "text-right"}
      ],
		"columnDefs": [
			{
				"targets": 5,
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
							return '<span class="label label-danger text-center font-size-sm">RESIGN</span>';
							break;
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
	/* let list_input = ['employee_id', 'tahun'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	} */
	
	/* data2Send = JSON.stringify({
        tahun: $('#tahun').val(),
		employee_id: $('#employee_id').val(),
		divisi_code: $('#divisi_code').val(),
		penilai: $('#penilai').val(),
		atasan_penilai: $('#atasan_penilai').val(),
		total_nilai: $('#total_nilai').val(),
		code_nilai: $('#code_nilai').val(),
		active: $('#active').is(':checked') ? 1 : 0
	});
	
	MsgBox.Confirm('?', 'Simpan data').then(result => {
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
	}); */

	let formData = new FormData($('#demo-form1x')[0]);
	MsgBox.Confirm('Simpan data KPI ?').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeoutNew(url, formData, 'POST')
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

function app_edit(id = null) {
	FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
	.then((data) => {
		if (data.result) {
			ResetForm();
			action = 'edit';
			let row = data.data;
			$('#employee_id').val(row.employee_id); $('#tahun').val(row.tahun);
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
		MsgBox.Confirm('Hapus data checklist ?').then(result => {
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
		MsgBox.Confirm('Hapus data ' + menu_id + ' ?').then(result => {
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

function LOVKaryawan() {
	$('#PopUpModal').load(base_url + 'hc/karyawan/getKaryawanList/', () => {
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "800px"});
		$('#list_cols').val(['employee_id','employee_name','jabatan_name','edu_name','divisi_name','join_date']);
		$('#list_controls').val(['#employee_id','#employee_name','#jabatan_name','#edu_name','#divisi_name','#join_date']);
	})
}

function LOVKaryawanClear() {
	$('#employe_id').val(''); $('#employee_name').val('');
	$('#jabatan_name').val(''); $('#edu_name').val('');
	$('#divisi_name').val(''); $('#join_date').val('');
}

function LOVAtasan() {
	$('#PopUpModal').load(base_url + 'hc/karyawan/getAtasanList/', () => {
		$('#ModalLOV').modal('show');
		$(".modal-dialog").css({width: "600px"});
		$('#list_cols').val(['employee_id','employee_name','jabatan_name','divisi_name']);
		$('#list_controls').val(['#atasan_id','#atasan_name','#jab_name','#div_name']);
	})
}

function LOVAtasanClear() {
	$('#atasan_id').val(''); $('#atasan_name').val('');
	$('#jab_nama').val(''); $('#div_name').val('');
}

function LOVJabatan() {
	$('#PopUpModal').load(base_url + 'hc/jabatan/getJabatanList/', () => { // Ambil URL untuk membuka modal LOV
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

function preview_attach_image(image_url = '') {
	$('#ModalPreviewImage').modal('show');
	$("#PreviewAttachImage").attr("src", image_url);
}