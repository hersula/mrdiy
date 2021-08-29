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
				// Store Form
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
				$('#test_market').prop('checked', row.test_market == 1 ? true : false);

				$('#gambar_toko_view').attr('src', base_url+'assets/data_upload/gambar_toko/'+row.gambar_toko);
				// Informasi Bangunan
				console.log(base_url+'assets/data_upload/gambar_toko/'+row.gambar_toko);

				let info_bangunan = JSON.parse(row.info_bangunan);
				$('#luas_basement').val(accounting.formatNumber(info_bangunan.luas_basement, 2));
				$('#luas_bangunan_lantai_1').val(accounting.formatNumber(info_bangunan.luas_bangunan_lantai_1, 2));
				$('#luas_bangunan_lantai_2').val(accounting.formatNumber(info_bangunan.luas_bangunan_lantai_2, 2));
				$('#luas_bangunan_lantai_3').val(accounting.formatNumber(info_bangunan.luas_bangunan_lantai_3, 2));
				$('#luas_bangunan_lantai_4').val(accounting.formatNumber(info_bangunan.luas_bangunan_lantai_4, 2));
				$('#daya_genset').val(accounting.formatNumber(info_bangunan.daya_genset, 2));
				$('#pdam').prop('checked', info_bangunan.pdam == 1 ? true : false);
				DataTableDayaListrikRows = info_bangunan.daya_listrik;
				DataTableDayaPompaAirRows = info_bangunan.daya_pompa_air;
				// Legalitas
				let legalitas = $.parseJSON(row.info_legalitas);
				DataTableLegalSuratTanahRows = legalitas.legalitas_surat_tanah;
				DataTableLegalIMBRows = legalitas.legalitas_imb;
				DataTableLegalPBBRows = legalitas.legalitas_pbb;
				DataTableLegalLainRows = legalitas.legalitas_lainnya;
				DataTableLegalMasaSewaRows = legalitas.legalitas_masa_sewa;
				// Informasi Toko
				let info_toko = $.parseJSON(row.info_toko);
				$('#nomor_telpon_toko').val(info_toko.nomor_telpon_toko);
				$('#email_toko').val(info_toko.email_toko);
				DataTableInfoTokoJamRamaiRows = info_toko.jam_toko_ramai;
				DataTableInfoTokoJumlahMesinRows = info_toko.jumlah_mesin;
				// Net selling space
				let net_selling_space = $.parseJSON(row.info_net_selling_space);
				DataTableNetSellingSpaceRows = net_selling_space.net_selling_space;
				DataTableNetSellingSpaceKonsinyasiRows = net_selling_space.net_selling_space_konsinyasi;
				// Gross selling space
				let other_space = $.parseJSON(row.info_other_space);
				DataTableOtherSpaceRows = other_space;
				console.log("tesa");
				// Fasilitas dalam gedung
				let fasilitas_dalam_gedung = $.parseJSON(row.info_fasilitas_dalam_gedung);
				DataTableFasilitasDalamGedungRows = fasilitas_dalam_gedung;
				// Fasilitas luar gedung
				let fasilitas_luar_gedung = $.parseJSON(row.info_fasilitas_luar_gedung);
				DataTableFasilitasLuarGedungRows = fasilitas_luar_gedung;
				// Photo
				if (row.photo !== null && row.photo !== '') {
					$("#photo").attr("src", row.photo_thumb_url);
					$('#old_photo_name').val(row.photo);
				}
			} else {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
		});
	}
	$("#gambar_toko").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#gambar_toko_view').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
})();

function initPageForm(){

	// Init tanggal
	$('#go_date').datepicker({
   	format: 'dd/mm/yyyy',
	});

	$('#due_date').datepicker({
   	format: 'dd/mm/yyyy',
	});

	$('#legalitas_lain_masa_berlaku').datepicker({
   	format: 'dd/mm/yyyy',
	});

	$('#legalitas_masa_sewa_jatuh_tempo').datepicker({
   	format: 'dd/mm/yyyy',
	});

	$('#luas_tanah').autoNumeric('init', formatDecimalNumber);
	$('#luas_bangunan').autoNumeric('init', formatDecimalNumber);
	$('#gross_selling_space').autoNumeric('init', formatDecimalNumber);
	$('#net_selling_space').autoNumeric('init', formatDecimalNumber);

	// START init number informasi bangunan
	$('#luas_basement').autoNumeric('init', formatDecimalNumber);
	$('#luas_bangunan_lantai_1').autoNumeric('init', formatDecimalNumber);
	$('#luas_bangunan_lantai_2').autoNumeric('init', formatDecimalNumber);
	$('#luas_bangunan_lantai_3').autoNumeric('init', formatDecimalNumber);
	$('#luas_bangunan_lantai_4').autoNumeric('init', formatDecimalNumber);
	$('#daya_genset').autoNumeric('init', formatNumber);
	$('#daya_listrik_input').autoNumeric('init', formatNumber);
	$('#pompa_air_input').autoNumeric('init', formatNumber);
	// END init number informasi bangunan

	// START init number info toko
	$('#jumlah_kasir').autoNumeric('init', formatNumber);
	$('#info_toko_jumlah_mesin').autoNumeric('init', formatNumber);
	// END init number info toko

	// START Net selling space
	$('#net_selling_space_size').autoNumeric('init', formatDecimalNumber);
	$('#net_selling_space_jumlah_arbi').autoNumeric('init', formatNumber);

	$('#net_selling_space_size_konsinyasi').autoNumeric('init', formatDecimalNumber);
	$('#net_selling_space_jumlah_arbi_konsinyasi').autoNumeric('init', formatNumber);
	// END Net selling space

	// START Other space
	$('#other_space_size').autoNumeric('init', formatDecimalNumber);
	// END Other space

	// START init informasi toko
	$('.clockpicker_dari_jam').clockpicker({
		donetext: 'Done',
		'default': 'now'
	});

	$('.clockpicker_sampai_jam').clockpicker({
		donetext: 'Done',
		'default': 'now'
	});
	// END init informasi toko

	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_store_form").validate({
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
		}
	});

	// Inisial validasi untuk daya listrik
	$("#form_info_bangunan_daya_listrik").validate({
		rules: {
			daya_listrik_input: {
				required: true,
			}
		}
	});

	// Inisial validasi untuk daya listrik
	$("#form_info_bangunan_daya_pompa_air").validate({
		rules: {
			pompa_air_input: {
				required: true,
				number: true,
			}
		}
	});

	// Inisial validasi untuk Legalitas surat tanah
	$("#form_legalitas_surat_tanah").validate();

	// Inisial validasi untuk Legalitas IMB
	$("#form_legalitas_imb").validate();

	// Inisial validasi untuk Legalitas PBB
	$("#form_legalitas_pbb").validate();

	// Inisialisasi untuk info toko umum
	$("#info_toko_umum").validate({
		rules: {
			sewa_nomor_telepon: {
				number: true
			},
			nomor_telpon_toko: {
				number: true
			},
			email_toko: {
				email: true
			},
			jumlah_kasir: {
				number: true
			},
		}
	});

	// Inisial validasi untuk Informasi Toko jam ramai
	$("#form_info_toko_ramai_jam").validate({
		rules: {
			info_toko_ramai_jam_dari: {
				time24hhmm: true
			},
			info_toko_ramai_jam_sampai: {
				time24hhmm: true
			}
		}
	});

	// Inisial validasi untuk Informasi Toko jam ramai
	$("#form_info_toko_jumlah_mesin").validate({
		rules: {
			info_toko_jumlah_mesin: {
				required: true,
				number: true,
			},
		},
	});

	// Inisial validasi untuk Net selling space
	$("#form_net_selling_space").validate({
		rules: {
			net_selling_space_size: {
				number: true,
			},
			net_selling_space_jumlah_arbi: {
				number: true,
			},
		},
	});

	// Inisial validasi untuk Net selling space konsinyasi
	$("#form_net_selling_space_konsinyasi").validate({
		rules: {
			net_selling_space_size_konsinyasi: {
				number: true,
			},
			net_selling_space_jumlah_arbi_konsinyasi: {
				number: true,
			},
		},
	});

	// Inisial validasi untuk Gross selling space
	$("#other_space").validate({
		rules: {
			gross_selling_space_size: {
				number: true,
			}
		},
	});

	// Timeout untuk datatable
	setTimeout(() => {
		LoadDataTable();
	}, 500);

	initFileUpload();

	initSelect2Ajax("#net_selling_space_counter", "Counter", base_url + 'inventory/dept/getListSelect2/', ['dept_id', 'dept_name'], 0);


	initSelect2Ajax("#net_selling_space_counter_konsinyasi", "Counter", base_url + 'inventory/dept/getListSelect2/', ['dept_id', 'dept_name'], 0);
	// initSelect2Ajax("#other_space_ruang", "Other Space", base_url + 'administrasi/info/getListSelect2/', ['id', 'info_name'], 0);
	// initSelect2Ajax("#fasilitas_dalam_gedung", "Fasilitas Dalam Gedung", base_url + 'administrasi/info/getListSelect2/', ['id', 'info_name'], 0);
	// initSelect2Ajax("#fasilitas_luar_gedung_nama", "Fasilitas Dalam Gedung", base_url + 'administrasi/info/getListSelect2/', ['id', 'info_name'], 0);
}

function LoadDataTable() {
	// DataTable untuk daya listrik
	DataTableDayaListrik = $('#table_list_daya_listrik').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableDayaListrikRows,
		"columns": [
			{"data": "daya_listrik_panel"},
			{"data": "daya_listrik_lokasi"},
			{"data": "daya_listrik", "width": 80, "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 2,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.daya_listrik);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditInfoBangunanDayaListrik(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusInfoBangunanDayaListrik(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk daya listrik
	DataTableDayaPompaAir = $('#table_list_daya_pompa_air').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableDayaPompaAirRows,
		"columns": [
			{"data": "daya_pompa_air_keterangan"},
			{"data": "daya_pompa_air", "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.daya_pompa_air);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditInfoBangunanDayaPompaAir(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusInfoBangunanDayaPompaAir(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk surat tanah
	DataTableLegalSuratTanah = $('#table_list_legalitas_surat_tanah').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableLegalSuratTanahRows,
		"columns": [
			{"data": "legalitas_surat_tanah_keterangan"},
			{"data": "legalitas_surat_tanah_nomor"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditLegalSuratTanah(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusLegalSuratTanah(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk IMB
	DataTableLegalIMB = $('#table_list_legalitas_imb').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableLegalIMBRows,
		"columns": [
			{"data": "legalitas_imb_keterangan"},
			{"data": "legalitas_imb_nomor"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditLegalIMB(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusLegalIMB(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk IMB
	DataTableLegalPBB = $('#table_list_legalitas_pbb').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableLegalPBBRows,
		"columns": [
			{"data": "legalitas_pbb_keterangan"},
			{"data": "legalitas_pbb_nomor"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditLegalPBB(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusLegalPBB(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk legalitas lain
	DataTableLegalLain = $('#table_list_legalitas_lain').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableLegalLainRows,
		"columns": [
			{"data": "legalitas_lain_keterangan"},
			{"data": "legalitas_lain_nomor"},
			{"data": "legalitas_lain_masa_berlaku"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 2,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return moment(row.legalitas_lain_masa_berlaku).format('DD/MM/YYYY');
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditLegalLain(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusLegalLain(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk legalitas masa sewa
	DataTableLegalMasaSewa = $('#table_list_legalitas_masa_sewa').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableLegalMasaSewaRows,
		"columns": [
			{"data": "legalitas_masa_sewa_nama_manajemen"},
			{"data": "legalitas_masa_sewa_contact_person"},
			{"data": "legalitas_masa_sewa_nomor_telepon"},
			{"data": "legalitas_masa_sewa_jatuh_tempo"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 3,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return moment(row.legalitas_masa_sewa_jatuh_tempo).format('DD/MM/YYYY');
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditLegalMasaSewa(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusLegalMasaSewa(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk jam ramai toko
	DataTableInfoTokoJamRamai = $('#table_list_info_toko_ramai_jam').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableInfoTokoJamRamaiRows,
		"columns": [
			{"data": "info_toko_ramai_jam_dari"},
			{"data": "info_toko_ramai_jam_sampai"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditInfoTokoJamRamai(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusInfoTokoJamRamai(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk jumlah mesin per kasir
	DataTableInfoTokoJumlahMesin = $('#table_list_info_toko_jumlah_mesin').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableInfoTokoJumlahMesinRows,
		"columns": [
			{"data": "info_toko_jumlah_kasir"},
			{"data": "info_toko_jumlah_mesin"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditInfoTokoJumlahMesinPerKasir(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusInfoTokoJumlahMesinPerKasir(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk Net selling space
	DataTableNetSellingSpace = $('#table_list_net_selling_space').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableNetSellingSpaceRows,
		"columns": [
			{"data": "net_selling_space_counter_name"},
			{"data": "net_selling_space_size", "className": "text-center"},
			{"data": "net_selling_space_jumlah_arbi", "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 0,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return row.net_selling_space_counter_name + " - " + row.net_selling_space_keterangan;
				},
			},
			{
				"targets": 1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.net_selling_space_size, 2);
				},
			},
			{
				"targets": 2,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.net_selling_space_jumlah_arbi);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditNetSellingSpace(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusNetSellingSpace(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk Net selling space konsinyasi
	DataTableNetSellingSpaceKonsinyasi = $('#table_list_net_selling_space_konsinyasi').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableNetSellingSpaceKonsinyasiRows,
		"columns": [
			{"data": "net_selling_space_counter_konsinyasi_name"},
			{"data": "net_selling_space_size_konsinyasi", "className": "text-center"},
			{"data": "net_selling_space_jumlah_spg_konsinyasi", "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 0,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return row.net_selling_space_counter_konsinyasi_name + " - " + row.net_selling_space_counter_konsinyasi_keterangan;
				},
			},
			{
				"targets": 1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.net_selling_space_size_konsinyasi, 2);
				},
			},
			{
				"targets": 2,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.net_selling_space_jumlah_spg_konsinyasi);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditNetSellingSpaceKonsinyasi(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusNetSellingSpaceKonsinyasi(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	// DataTable untuk Net selling space
	DataTableOtherSpace = $('#table_list_other_space').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableOtherSpaceRows,
		"columns": [
			{"data": "other_space_ruang_name"},
			{"data": "other_space_size", "className": "text-center"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					return accounting.formatNumber(row.other_space_size, 2);
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditOtherSpace(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusOtherSpace(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	DataTableFasilitasDalamGedung = $('#table_list_fasilitas_dalam_gedung').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableFasilitasDalamGedungRows,
		"columns": [
			{"data": "fasilitas_dalam_gedung_name"},
			{"data": "fasilitas_dalam_gedung_ket"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditFasilitasDalamGedung(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusFasilitasDalamGedung(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}

					return actions;
				},
			},
		],
	});

	DataTableFasilitasLuarGedung = $('#table_list_fasilitas_luar_gedung').DataTable({ 
		"pageLength": 5,
		"pagingType": "simple",
		"responsive": true,
		"lengthChange": false,
		"searching": false,
		"bInfo" : false,
		"targets": 'no-sort',
		"bSort": false,
		"data": DataTableFasilitasLuarGedungRows,
		"columns": [
			{"data": "fasilitas_luar_gedung_nama"},
			{"data": "fasilitas_luar_gedung_ket"},
			{"data": null, "width": 60, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row, meta ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditFasilitasLuarGedung(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}

					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="HapusFasilitasLuarGedung(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
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
	if (!$('#form_store_form').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}

	// Set info bangunan
	let info_bangunan = {
		luas_basement: accounting.unformat($('#luas_basement').val()),
		luas_bangunan_lantai_1: accounting.unformat($('#luas_bangunan_lantai_1').val()),
		luas_bangunan_lantai_2: accounting.unformat($('#luas_bangunan_lantai_2').val()),
		luas_bangunan_lantai_3: accounting.unformat($('#luas_bangunan_lantai_3').val()),
		luas_bangunan_lantai_4: accounting.unformat($('#luas_bangunan_lantai_4').val()),
		daya_genset: accounting.unformat($('#daya_genset').val()),
		pdam: $('#pdam').is(':checked') ? 1 : 0,
		daya_listrik: DataTableDayaListrik.rows().data().toArray(),
		daya_pompa_air: DataTableDayaPompaAir.rows().data().toArray(),
	};

	// Set legalitas
	let info_legalitas = {
		legalitas_surat_tanah: DataTableLegalSuratTanah.rows().data().toArray(),
		legalitas_imb: DataTableLegalIMB.rows().data().toArray(),
		legalitas_pbb: DataTableLegalPBB.rows().data().toArray(),
		legalitas_lainnya: DataTableLegalLain.rows().data().toArray(),
		legalitas_masa_sewa: DataTableLegalMasaSewa.rows().data().toArray(),
	};

	// Set info toko
	let info_toko = {
		nomor_telpon_toko: $('#nomor_telpon_toko').val(),
		email_toko: $('#email_toko').val(),		
		jumlah_kasir: accounting.unformat($('#jumlah_kasir').val()),
		jam_toko_ramai: DataTableInfoTokoJamRamai.rows().data().toArray(),
		jumlah_mesin: DataTableInfoTokoJumlahMesin.rows().data().toArray()
	};

	// Set net selling space
	let net_selling_space = {
		net_selling_space: DataTableNetSellingSpace.rows().data().toArray(),
		net_selling_space_konsinyasi: DataTableNetSellingSpaceKonsinyasi.rows().data().toArray()
	}

	// Set gross selling space
	let other_space = DataTableOtherSpace.rows().data().toArray();

	// Set fasilitas dalam gedung
	let fasilitas_dalam_gedung = DataTableFasilitasDalamGedung.rows().data().toArray();

	// Set fasilitas luar gedung
	let fasilitas_luar_gedung = DataTableFasilitasLuarGedung.rows().data().toArray();

	// Persiapkan data untuk dikirim
	data2Send = {
		id: id,
		wil_id: $('#wil_id').val(),
		price_grade_code: $('#price_grade_code').val(),
		store_id: $('#store_id').val(),
		store_name: $('#store_name').val(),
		grade: $('#grade').val(),
		go_date: moment($('#go_date').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		alamat: $('#alamat').val(),
		country_id: $('#country_id').val(),
		prov_id: $('#prov_id').val(),
		city_id: $('#city_id').val(),
		kec_id: $('#kec_id').val(),
		kel_id: $('#kel_id').val(),
		kode_pos: $('#kode_pos').val(),
		status_bangunan: $('#status_bangunan').val(),
		luas_tanah: accounting.unformat($('#luas_tanah').val()),
		luas_bangunan: accounting.unformat($('#luas_bangunan').val()),
		gross_selling_space: accounting.unformat($('#gross_selling_space').val()),
		net_selling_space: accounting.unformat($('#net_selling_space').val()),
		sm_id: $('#sm_id').val(),
		mcd_id: $('#mcd_id').val(),
		tech_id: $('#tech_id').val(),
		edp_id: $('#edp_id').val(),
		vm_id: $('#vm_id').val(),		
		status: $('#status').is(':checked') ? 1 : 0,
		test_market: $('#test_market').is(':checked') ? 1 : 0,
		info_bangunan: info_bangunan,
		info_legalitas: info_legalitas,
		info_toko: info_toko,
		info_net_selling_space: net_selling_space,
		info_other_space: other_space,
		info_fasilitas_dalam_gedung: fasilitas_dalam_gedung,
		info_fasilitas_luar_gedung: fasilitas_luar_gedung,
	};
	var formData = new FormData();

	// formData.append('id', data2Send.id);
	// formData.append('wil_id', data2Send.wil_id);
	// formData.append('price_grade_code', data2Send.price_grade_code);
	// formData.append('store_id', data2Send.store_id);
	// formData.append('store_name', data2Send.store_name);
	// formData.append('grade', data2Send.grade);
	// formData.append('go_date', data2Send.go_date);
	// formData.append('alamat', data2Send.alamat);
	// formData.append('country_id', data2Send.country_id);
	// formData.append('prov_id', data2Send.prov_id);
	// formData.append('city_id', data2Send.city_id);
	// formData.append('kec_id', data2Send.kec_id);
	// formData.append('kel_id', data2Send.kel_id);
	// formData.append('kode_pos', data2Send.kode_pos);
	// formData.append('status_bangunan', data2Send.status_bangunan);
	// formData.append('luas_tanah', data2Send.luas_tanah);
	// formData.append('luas_bangunan', data2Send.luas_bangunan);
	// formData.append('gross_selling_space', data2Send.gross_selling_space);
	// formData.append('net_selling_space', data2Send.net_selling_space);
	// formData.append('sm_id', data2Send.sm_id);
	// formData.append('mcd_id', data2Send.mcd_id);
	// formData.append('tech_id', data2Send.tech_id);
	// formData.append('edp_id', data2Send.edp_id);
	// formData.append('vm_id', data2Send.vm_id);
	// formData.append('status', data2Send.status);
	// formData.append('info_bangunan', new Blob([JSON.stringify(data2Send.info_bangunan)], {type: 'application/json'}));
	// formData.append('info_legalitas', JSON.stringify(data2Send.info_legalitas));
	// formData.append('info_toko', JSON.stringify(data2Send.info_toko));
	// formData.append('info_net_selling_space', JSON.stringify(data2Send.info_net_selling_space));
	// formData.append('info_other_space', JSON.stringify(data2Send.info_other_space));
	// formData.append('info_fasilitas_dalam_gedung', JSON.stringify(data2Send.info_fasilitas_dalam_gedung));
	// formData.append('info_fasilitas_luar_gedung', JSON.stringify(data2Send.info_fasilitas_luar_gedung));


	// Fungsi Untuk Upload Data
	if ($('input[name=gambar_toko]')[0].files != 0) {
		formData.append('gambar_toko', $('input[name=gambar_toko]')[0].files[0]); 		
	}
	formData.append('data2Send', JSON.stringify(data2Send));
	formData.append('store_name', data2Send.store_name);
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		SendAjaxWithUpload(url, formData, 'POST', 'JSON', 5000, successStore);
	}).catch(err => {
		console.log(err);
	});
}
function successStore(data) {
	if (data.result == true) {
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		data2Send = null;
		if (action === 'create') {
			window.location.href = '#' + Modules + '/' + Controller + '/edit/' + data.data.id;
		} else {
			Kembali();
		}
	}else{
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'danger');
	}
}
function LOVWilayah() {
	$('#PopUpModal').load(base_url + 'administrasi/wilayah/getWilayahList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['wil_id', 'wil_name']);
		$('#list_controls').val(['#wil_id', '#wil_name']);
	});
}

function LOVWilayahClear() {
	$('#wil_id').val(''); $('#wil_name').val('');
}

function LOVOtherSpace() {
	$('#PopUpModal').load(base_url + 'administrasi/info/getListSelect2/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['id', 'info_name']);
		$('#list_controls').val(['#other_space_ruang', '#other_space_id']);
	});
}

function LOVFasilitasClear() {
	$('#other_space_ruang').val(''); $('#other_space_id').val('');
}

function LOVFasilitas() {
	$('#PopUpModal').load(base_url + 'administrasi/info/getListSelect2/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['id', 'info_name']);
		$('#list_controls').val(['#fasilitas_dalam_gedung', '#fasilitas_id']);
	});
}

function LOVFasilitasClear() {
	$('#fasilitas_dalam_gedung').val(''); $('#fasilitas_id').val('');
}

function LOVFasilitasLuar() {
	$('#PopUpModal').load(base_url + 'administrasi/info/getListSelect2/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['id', 'info_name']);
		$('#list_controls').val(['#fasilitas_luar_gedung_nama', '#fasilitas_luar_id']);
	});
}

function LOVFasilitasLuarClear() {
	$('#fasilitas_luar_gedung_nama').val(''); $('#fasilitas_luar_id').val('');
}


function LOVGradePrice() {
	$('#PopUpModal').load(base_url + 'sales/pricegrade/getPriceGradeList/', () => { // Ambil URL untuk membuka modal LOV
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
	$('#PopUpModal').load(base_url + 'hc/karyawan/getKaryawanAll/?jabatan='+emp_id, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "800px"}); // Lebar modal LOV
		$('#list_cols').val(['employee_id', 'employee_name']);
		$('#list_controls').val(['#' + emp_id, '#' + emp_name]);
	});
}

function LOVClear(emp_id = null, emp_name = null) {
	$('#' + emp_id).val(''); $('#' + emp_name).val('');
}

// START Datatable

function SimpanRowDataTable(DataTableElement, data2save, RowIdx = null) {
	if (DataTableAction == 'edit') {
		DataTableElement.row(RowIdx).data(data2save).draw();
		// MsgBox.Notification('Data berhasil diperbaharui.', 'bottom right', 'success', 'mini', 1000);
	} else {
		DataTableElement.row.add(data2save).draw();
		// MsgBox.Notification('Data berhasil ditambahkan.', 'bottom right', 'success', 'mini', 1000);
	}
}

function HapusRowDataTable(DataTableElement, RowIdx = null) {
	// DataTableElement.row("#" + RowIdx).remove().draw();
	DataTableElement.row(RowIdx).remove().draw();
	// MsgBox.Notification('Data berhasil dihapus.', 'bottom right', 'success', 'mini', 1000);
}

// END Datatable

// START Datatable Daya Listrik

function SimpanInfoBangunanDayaListrik() {
	if (!$('#form_info_bangunan_daya_listrik').valid() || parseFloat($('#daya_listrik_input').val()) <= 0) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini', 1000);
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		daya_listrik_panel: $('#daya_listrik_input_panel').val(),
		daya_listrik_lokasi: $('#daya_listrik_input_lokasi').val(),
		daya_listrik: accounting.unformat($('#daya_listrik_input').val()) 
	};
	// Simpan data
	SimpanRowDataTable(DataTableDayaListrik, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element 0 dan fokus
	$('#daya_listrik_input_panel').val(""); $('#daya_listrik_input_lokasi').val("");  $('#daya_listrik_input').val(0);
	$('#daya_listrik_input_panel').focus();
	clearValidation('#form_info_bangunan_daya_listrik');
}

function EditInfoBangunanDayaListrik(RowIdx) {
	// Ambil data
	let data2edit = DataTableDayaListrik.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#daya_listrik_input_panel').val(data2edit.daya_listrik_panel);
	$('#daya_listrik_input_lokasi').val(data2edit.daya_listrik_lokasi);
	$('#daya_listrik_input').val(accounting.formatNumber(data2edit.daya_listrik));
	$('#daya_listrik_input_panel').focus();
}

function HapusInfoBangunanDayaListrik(RowIdx) {
	let getData = DataTableDayaListrik.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data daya listrik ' + getData.daya_listrik_panel  + ' ini?').then(result => {
		HapusRowDataTable(DataTableDayaListrik, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Daya Listrik

// START Datatable Pompa Air

function SimpanInfoBangunanDayaPompaAir() {
	if (!$('#form_info_bangunan_daya_pompa_air').valid() || parseFloat($('#pompa_air_input').val()) <= 0) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		daya_pompa_air_keterangan: $('#pompa_air_input_keterangan').val(),
		daya_pompa_air: accounting.unformat($('#pompa_air_input').val()) 
	};
	// Simpan data
	SimpanRowDataTable(DataTableDayaPompaAir, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element 0 dan fokus
	$('#pompa_air_input_keterangan').val(""); $('#pompa_air_input').val(0);
	$('#pompa_air_input_keterangan').focus();
	clearValidation('#form_info_bangunan_daya_pompa_air');
}

function EditInfoBangunanDayaPompaAir(RowIdx) {
	// Ambil data
	let data2edit = DataTableDayaPompaAir.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#pompa_air_input_keterangan').val(data2edit.daya_pompa_air_keterangan);
	$('#pompa_air_input').val(accounting.formatNumber(data2edit.daya_listrik));
	$('#pompa_air_input_keterangan').focus();
}

function HapusInfoBangunanDayaPompaAir(RowIdx) {
	let getData = DataTableDayaPompaAir.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data daya pompa air ' + getData.daya_pompa_air_keterangan + ' ini?').then(result => {
		HapusRowDataTable(DataTableDayaPompaAir, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Pompa Air

// START Datatable Legal Surat Tanah

function SimpanLegalSuratTanah() {
	if (!$('#form_legalitas_surat_tanah').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		legalitas_surat_tanah_keterangan: $('#legalitas_surat_tanah_keterangan').val(),
		legalitas_surat_tanah_nomor: $('#legalitas_surat_tanah_nomor').val() 
	};
	// Simpan data
	SimpanRowDataTable(DataTableLegalSuratTanah, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#legalitas_surat_tanah_keterangan').val(""); $('#legalitas_surat_tanah_nomor').val("");
	$('#legalitas_surat_tanah_keterangan').focus();
	clearValidation('#form_legalitas_surat_tanah');
}

function EditLegalSuratTanah(RowIdx) {
	// Ambil data
	let data2edit = DataTableLegalSuratTanah.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#legalitas_surat_tanah_keterangan').val(data2edit.legalitas_surat_tanah_keterangan);
	$('#legalitas_surat_tanah_nomor').val(data2edit.legalitas_surat_tanah_nomor);
	$('#legalitas_surat_tanah_keterangan').focus();
}

function HapusLegalSuratTanah(RowIdx) {
	let getData = DataTableLegalSuratTanah.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data ' + getData.legalitas_surat_tanah_keterangan + ' (' + getData.legalitas_surat_tanah_nomor + ') ini?').then(result => {
		HapusRowDataTable(DataTableLegalSuratTanah, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Legal Surat Tanah

// START Datatable Legal IMB

function SimpanLegalIMB() {
	if (!$('#form_legalitas_imb').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		legalitas_imb_keterangan: $('#legalitas_imb_keterangan').val(),
		legalitas_imb_nomor: $('#legalitas_imb_nomor').val() 
	};
	// Simpan data
	SimpanRowDataTable(DataTableLegalIMB, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#legalitas_imb_keterangan').val(""); $('#legalitas_imb_nomor').val("");
	$('#legalitas_imb_keterangan').focus();
	clearValidation('#form_legalitas_imb');
}

function EditLegalIMB(RowIdx) {
	// Ambil data
	let data2edit = DataTableLegalIMB.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#legalitas_imb_keterangan').val(data2edit.legalitas_imb_keterangan);
	$('#legalitas_imb_nomor').val(data2edit.legalitas_imb_nomor);
	$('#legalitas_imb_keterangan').focus();
}

function HapusLegalIMB(RowIdx) {
	let getData = DataTableLegalIMB.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data ' + getData.legalitas_imb_keterangan + ' (' + getData.legalitas_imb_nomor + ') ini?').then(result => {
		HapusRowDataTable(DataTableLegalIMB, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Legal IMB

// START Datatable Legal PBB

function SimpanLegalPBB() {
	if (!$('#form_legalitas_pbb').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		legalitas_pbb_keterangan: $('#legalitas_pbb_keterangan').val(),
		legalitas_pbb_nomor: $('#legalitas_pbb_nomor').val() 
	};
	// Simpan data
	SimpanRowDataTable(DataTableLegalPBB, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#legalitas_pbb_keterangan').val(""); $('#legalitas_pbb_nomor').val("");
	$('#legalitas_pbb_keterangan').focus();
	clearValidation('#form_legalitas_pbb');
}

function EditLegalPBB(RowIdx) {
	// Ambil data
	let data2edit = DataTableLegalPBB.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#legalitas_pbb_keterangan').val(data2edit.legalitas_pbb_keterangan);
	$('#legalitas_pbb_nomor').val(data2edit.legalitas_pbb_nomor);
	$('#legalitas_pbb_keterangan').focus();
}

function HapusLegalPBB(RowIdx) {
	let getData = DataTableLegalPBB.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data ' + getData.legalitas_pbb_keterangan + ' (' + getData.legalitas_pbb_nomor + ') ini?').then(result => {
		HapusRowDataTable(DataTableLegalPBB, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Legal PBB

// START Datatable Legal Lain

function SimpanLegalLain() {
	if (!$('#form_legalitas_lainnya').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		legalitas_lain_keterangan: $('#legalitas_lain_keterangan').val(),
		legalitas_lain_nomor: $('#legalitas_lain_nomor').val(),
		legalitas_lain_masa_berlaku: moment($('#legalitas_lain_masa_berlaku').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
	};
	// Simpan data
	SimpanRowDataTable(DataTableLegalLain, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#legalitas_lain_keterangan').val(""); $('#legalitas_lain_nomor').val(""); $('#legalitas_lain_masa_berlaku').val("");
	$('#legalitas_lain_keterangan').focus();
	clearValidation('#form_legalitas_lainnya');
}

function EditLegalLain(RowIdx) {
	// Ambil data
	let data2edit = DataTableLegalLain.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#legalitas_lain_keterangan').val(data2edit.legalitas_lain_keterangan);
	$('#legalitas_lain_nomor').val(data2edit.legalitas_lain_nomor);
	$('#legalitas_lain_masa_berlaku').val(moment(data2edit.legalitas_lain_masa_berlaku).format('DD/MM/YYYY'));
	$('#legalitas_lain_keterangan').focus();
}

function HapusLegalLain(RowIdx) {
	let getData = DataTableLegalLain.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data ' + getData.legalitas_lain_keterangan + ' (' + getData.legalitas_lain_nomor + ') ini?').then(result => {
		HapusRowDataTable(DataTableLegalLain, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Legal Lain

// START Datatable Legal Masa Sewa

function SimpanLegalMasaSewa() {
	if (!$('#form_legalitas_masa_sewa').valid() || $('#legalitas_masa_sewa_jatuh_tempo').val().trim() == '') {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		legalitas_masa_sewa_nama_manajemen: $('#legalitas_masa_sewa_nama_manajemen').val(),
		legalitas_masa_sewa_contact_person: $('#legalitas_masa_sewa_contact_person').val(),
		legalitas_masa_sewa_nomor_telepon: $('#legalitas_masa_sewa_nomor_telepon').val(),
		legalitas_masa_sewa_jatuh_tempo: moment($('#legalitas_masa_sewa_jatuh_tempo').val(), 'DD/MM/YYYY').format('YYYY-MM-DD')
	};
	// Simpan data
	SimpanRowDataTable(DataTableLegalMasaSewa, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#legalitas_masa_sewa_nama_manajemen').val(""); 
	$('#legalitas_masa_sewa_contact_person').val("");
	$('#legalitas_masa_sewa_nomor_telepon').val("");
	$('#legalitas_masa_sewa_jatuh_tempo').val(""); 
	$('#legalitas_masa_sewa_nama_manajemen').focus();
	clearValidation('#form_legalitas_masa_sewa');
}

function EditLegalMasaSewa(RowIdx) {
	// Ambil data
	let data2edit = DataTableLegalMasaSewa.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#legalitas_masa_sewa_nama_manajemen').val(data2edit.legalitas_masa_sewa_nama_manajemen);
	$('#legalitas_masa_sewa_contact_person').val(data2edit.legalitas_masa_sewa_contact_person);
	$('#legalitas_masa_sewa_nomor_telepon').val(data2edit.legalitas_masa_sewa_nomor_telepon);
	$('#legalitas_masa_sewa_jatuh_tempo').val(moment(data2edit.legalitas_masa_sewa_jatuh_tempo).format('DD/MM/YYYY'));
	$('#legalitas_masa_sewa_jatuh_tempo').focus();
}

function HapusLegalMasaSewa(RowIdx) {
	let getData = DataTableLegalMasaSewa.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data sewa jatuh tempo ' + moment(getData.legalitas_masa_sewa_jatuh_tempo).format('DD/MM/YYYY') + ' ini?').then(result => {
		HapusRowDataTable(DataTableLegalMasaSewa, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Legal Masa Sewa

// START Datatable Informasi Toko jam ramai

function SimpanInfoTokoJamRamai() {
	if (!$('#form_info_toko_ramai_jam').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		info_toko_ramai_jam_dari: $('#info_toko_ramai_jam_dari').val(),
		info_toko_ramai_jam_sampai: $('#info_toko_ramai_jam_sampai').val(),
	};
	// Simpan data
	SimpanRowDataTable(DataTableInfoTokoJamRamai, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#info_toko_ramai_jam_dari').val(""); $('#info_toko_ramai_jam_sampai').val("");
	$('#info_toko_ramai_jam_dari').focus();
	clearValidation('#form_info_toko_ramai_jam');
}

function EditInfoTokoJamRamai(RowIdx) {
	// Ambil data
	let data2edit = DataTableInfoTokoJamRamai.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#info_toko_ramai_jam_dari').val(data2edit.info_toko_ramai_jam_dari);
	$('#info_toko_ramai_jam_sampai').val(data2edit.info_toko_ramai_jam_sampai);
	$('#info_toko_ramai_jam_dari').focus();
}

function HapusInfoTokoJamRamai(RowIdx) {
	let getData = DataTableInfoTokoJamRamai.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data jam ramai toko dari ' + getData.info_toko_ramai_jam_dari + ' sampai ' + getData.info_toko_ramai_jam_sampai + '?').then(result => {
		HapusRowDataTable(DataTableInfoTokoJamRamai, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Informasi Toko jam ramai

// START Datatable Informasi Toko jumlah mesin per kasir

function SimpanInfoTokoJumlahMesinPerKasir() {
	if (!$('#form_info_toko_jumlah_mesin').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		info_toko_jumlah_kasir: $('#info_toko_jumlah_kasir').val(),
		info_toko_jumlah_mesin: $('#info_toko_jumlah_mesin').val(),
	};
	// Simpan data
	SimpanRowDataTable(DataTableInfoTokoJumlahMesin, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#info_toko_jumlah_kasir').val(""); $('#info_toko_jumlah_mesin').val(0);
	$('#info_toko_jumlah_kasir').focus();
	clearValidation('#form_info_toko_jumlah_mesin');
}

function EditInfoTokoJumlahMesinPerKasir(RowIdx) {
	// Ambil data
	let data2edit = DataTableInfoTokoJumlahMesin.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#info_toko_jumlah_kasir').val(data2edit.info_toko_jumlah_kasir);
	$('#info_toko_jumlah_mesin').val(data2edit.info_toko_jumlah_mesin);
	$('#info_toko_jumlah_kasir').focus();
}

function HapusInfoTokoJumlahMesinPerKasir(RowIdx) {
	let getData = DataTableInfoTokoJumlahMesin.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data jumlah mesin ' + getData.info_toko_jumlah_kasir + ' ?').then(result => {
		HapusRowDataTable(DataTableInfoTokoJumlahMesin, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Informasi Toko jumlah mesin per kasir

// START Datatable Net selling space

function SimpanNetSellingSpace() {
	if (!$('#form_net_selling_space').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}

	// Persiapkan inputan
	let data2save = { 
		net_selling_space_counter_id: $('#net_selling_space_counter').val(),
		net_selling_space_counter_name: $('#net_selling_space_counter').select2('data')[0].text,
		net_selling_space_keterangan: $('#net_selling_space_keterangan').val(),
		net_selling_space_size: accounting.unformat($('#net_selling_space_size').val()),
		net_selling_space_jumlah_arbi: accounting.unformat($('#net_selling_space_jumlah_arbi').val())
	};
	// Simpan data
	SimpanRowDataTable(DataTableNetSellingSpace, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$("#net_selling_space_counter").select2("val", "");
	$("#net_selling_space_keterangan").val("");
	$('#net_selling_space_size').val(0); $('#net_selling_space_jumlah_arbi').val(0); 
	$('#net_selling_space_counter').focus();
	clearValidation('#form_net_selling_space');
}

function EditNetSellingSpace(RowIdx) {
	// Ambil data
	let data2edit = DataTableNetSellingSpace.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#net_selling_space_counter').select2('data', {"id": data2edit.net_selling_space_counter_id, "text": data2edit.net_selling_space_counter_name});
	$('#net_selling_space_keterangan').val(data2edit.net_selling_space_keterangan);
	$('#net_selling_space_size').val(accounting.formatNumber(data2edit.net_selling_space_size, 2));
	$('#net_selling_space_jumlah_arbi').val(accounting.formatNumber(data2edit.net_selling_space_jumlah_arbi));
	$('#net_selling_space_counter').focus();
}

function HapusNetSellingSpace(RowIdx) {
	let getData = DataTableNetSellingSpace.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data net selling space ' + getData.net_selling_space_counter_name + ' ?').then(result => {
		HapusRowDataTable(DataTableNetSellingSpace, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Net selling space

// START Datatable Net selling space konsinyasi

function SimpanNetSellingSpaceKonsinyasi() {
	if (!$('#form_net_selling_space_konsinyasi').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		net_selling_space_counter_konsinyasi_id: $('#net_selling_space_counter_konsinyasi').val(),
		net_selling_space_counter_konsinyasi_name: $('#net_selling_space_counter_konsinyasi').select2('data')[0].text,
		net_selling_space_counter_konsinyasi_keterangan: $('#net_selling_space_counter_konsinyasi_keterangan').val(),
		net_selling_space_size_konsinyasi: accounting.unformat($('#net_selling_space_size_konsinyasi').val()),
		net_selling_space_jumlah_spg_konsinyasi: accounting.unformat($('#net_selling_space_jumlah_spg_konsinyasi').val())
	};
	// Simpan data
	SimpanRowDataTable(DataTableNetSellingSpaceKonsinyasi, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$("#net_selling_space_counter_konsinyasi").select2("val", "");
	$('#net_selling_space_counter_konsinyasi_keterangan').val(""); 
	$('#net_selling_space_size_konsinyasi').val(0); $('#net_selling_space_jumlah_spg_konsinyasi').val(0); 
	$('#net_selling_space_counter_konsinyasi').focus();
	clearValidation('#form_net_selling_space_konsinyasi');
}

function EditNetSellingSpaceKonsinyasi(RowIdx) {
	// Ambil data
	let data2edit = DataTableNetSellingSpaceKonsinyasi.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#net_selling_space_counter_konsinyasi').select2('data', {"id": data2edit.net_selling_space_counter_konsinyasi_id, "text": data2edit.net_selling_space_counter_konsinyasi_name});
	$('#net_selling_space_counter_konsinyasi_keterangan').val(data2edit.net_selling_space_counter_konsinyasi_keterangan);
	$('#net_selling_space_size_konsinyasi').val(accounting.formatNumber(data2edit.net_selling_space_size_konsinyasi, 2));
	$('#net_selling_space_jumlah_spg_konsinyasi').val(accounting.formatNumber(data2edit.net_selling_space_jumlah_spg_konsinyasi));
	$('#net_selling_space_counter_konsinyasi').focus();
}

function HapusNetSellingSpaceKonsinyasi(RowIdx) {
	let getData = DataTableNetSellingSpaceKonsinyasi.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data net selling space ' + getData.net_selling_space_counter_konsinyasi_name + ' ' + data2edit.net_selling_space_counter_konsinyasi_keterangan + ' ?').then(result => {
		HapusRowDataTable(DataTableNetSellingSpaceKonsinyasi, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Net selling space konsinyasi

// START Datatable Other space

function SimpanOtherSpace() {
	if (!$('#other_space').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		other_space_ruang_id: $('#other_space_ruang').val(),
		other_space_ruang_name: $('#other_space_id').val(),
		other_space_size: accounting.unformat($('#other_space_size').val())
	};
	// Simpan data
	SimpanRowDataTable(DataTableOtherSpace, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$("#other_space_ruang").val();
	$("#other_space_id").val();
	$('#other_space_size').val(0);
	$('#other_space_ruang').focus();
	clearValidation('#other_space');
}

function EditOtherSpace(RowIdx) {
	// Ambil data
	let data2edit = DataTableOtherSpace.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#other_space_id').val(data2edit.other_space_ruang_name);
	$('#other_space_size').val(accounting.formatNumber(data2edit.other_space_size, 2));
	$('#other_space_ruang').focus();
}

function HapusOtherSpace(RowIdx) {
	let getData = DataTableOtherSpace.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data ruang ' + getData.other_space_ruang_name + ' ?').then(result => {
		HapusRowDataTable(DataTableOtherSpace, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Other space

// START Datatable Fasilitas dalam gedung

function SimpanFasilitasDalamGedung() {
	if (!$('#form_fasilitas_dalam_gedung').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		fasilitas_dalam_gedung_id: $('#fasilitas_dalam_gedung').val(),
		fasilitas_dalam_gedung_name: $('#fasilitas_id').val(),
		fasilitas_dalam_gedung_ket: $('#fasilitas_dalam_gedung_ket').val()
	};
	// Simpan data
	SimpanRowDataTable(DataTableFasilitasDalamGedung, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$("#fasilitas_dalam_gedung").select2("val", "");
	$('#fasilitas_dalam_gedung_ket').val(""); 
	$('#fasilitas_dalam_gedung').focus();
	clearValidation('#form_fasilitas_dalam_gedung');
}

function EditFasilitasDalamGedung(RowIdx) {
	// Ambil data
	let data2edit = DataTableFasilitasDalamGedung.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#fasilitas_dalam_gedung').val(data2edit.fasilitas_dalam_gedung_id);
	$('#fasilitas_id').val(data2edit.fasilitas_dalam_gedung_name);
	$('#fasilitas_dalam_gedung_ket').val(data2edit.fasilitas_dalam_gedung_ket);
	$('#fasilitas_dalam_gedung_nama').focus();
}

function HapusFasilitasDalamGedung(RowIdx) {
	let getData = DataTableFasilitasDalamGedung.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data fasilitas ' + getData.fasilitas_dalam_gedung_name + ' ?').then(result => {
		HapusRowDataTable(DataTableFasilitasDalamGedung, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Fasilitas dalam gedung

// START Datatable Fasilitas luar gedung

function SimpanFasilitasLuarGedung() {
	if (!$('#form_fasilitas_luar_gedung').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		fasilitas_luar_gedung_nama: $('#fasilitas_luar_id').val(),
		fasilitas_luar_gedung_ket: $('#fasilitas_luar_gedung_ket').val()
	};
	// Simpan data
	SimpanRowDataTable(DataTableFasilitasLuarGedung, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element dan fokus
	$('#fasilitas_luar_id').val(""); 
	$('#fasilitas_luar_gedung_ket').val(""); 
	$('#fasilitas_luar_id').focus();
	clearValidation('#form_fasilitas_luar_gedung');
}

function EditFasilitasLuarGedung(RowIdx) {
	// Ambil data
	let data2edit = DataTableFasilitasLuarGedung.row(RowIdx).data();
	// Set action
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	// Masukkan ke element & fokus
	$('#fasilitas_luar_id').val(data2edit.fasilitas_luar_gedung_nama);
	$('#fasilitas_luar_gedung_ket').val(data2edit.fasilitas_luar_gedung_ket);
	$('#fasilitas_luar_gedung_nama').focus();
}

function HapusFasilitasLuarGedung(RowIdx) {
	let getData = DataTableFasilitasLuarGedung.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data fasilitas ' + getData.fasilitas_luar_gedung_nama + ' ?').then(result => {
		HapusRowDataTable(DataTableFasilitasLuarGedung, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}

// END Datatable Fasilitas luar gedung

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
			$("#photo").attr("src", params.response.data.photo_thumb_url);
			$('#old_photo_name').val(params.response.data.photo);
		} else {
			MsgBox.Notification(params.response.msg, 'bottom right', 'warning');
		}
 	}).on('filepreupload', function(event, data, previewId, index, jqXHR) {
		data.form.append("id", id);
		data.form.append("old_photo_name", $('#old_photo_name').val());
  	});
}