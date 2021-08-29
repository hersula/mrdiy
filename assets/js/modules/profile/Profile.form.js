(function () {

	// function construct
	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();
	}
	// edit action
		var type_usaha = '';
		var DataTableContactAvailableRows;

		SendAjax(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + supp_id, null, 'GET', 'JSON', 5000, successEdit);
	$('#ket_brand').keypress(function (e) {
	 var key = e.which;
	 var val_brand = $(this).val();
	 if(key == 13)
	  {
	  	let data2save = {
			ket_brand: $('#ket_brand').val()
		};
		SimpanRowDataTable(DatatableBrand, data2save, DataTableRowIdx);
		DataTableAction = 'create';
		DataTableRowIdx = 0;
		$(this).val("");
	  }
	});
	$("input[name=status_tax]").on('change', function(event) {
		var id_pkp = $(this).val();
		// console.log(id_pkp);
		if (id_pkp == 1) {
			$("#no_npwp").attr('disabled', false).removeClass('disable');
			$("#nama_npwp").attr('disabled', false).removeClass('disable');
			$("#no_pkp").attr('disabled', false).removeClass('disable');

			$("#skt").attr('disabled', false).removeClass('disable');
			$("#npwp").attr('disabled', false).removeClass('disable');
			$("#sppkp").attr('disabled', false).removeClass('disable');
			// $("#skb").attr('disabled', false).removeClass('disable');
		}else{
			$("#no_npwp").attr('disabled', true).addClass('disable');
			$("#nama_npwp").attr('disabled', true).addClass('disable');
			$("#no_pkp").attr('disabled', true).addClass('disable');

			$("#skt").attr('disabled', true).addClass('disable');
			$("#npwp").attr('disabled', true).addClass('disable');
			$("#sppkp").attr('disabled', true).addClass('disable');
			// $("#skb").attr('disabled', true).addClass('disable');
		}
	});

	
	$("#file_ktp").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_show').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("#file_siup").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_siup').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
	});
	$("#file_nib").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_nib').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
	});
	$("#file_tdp").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_show_tdp').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("#skt").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_show_skt').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("#npwp").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_show_npwp').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    $("#sppkp").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#img_show_sppkp').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
    // $("#skb").change(function () {
    //     if (this.files && this.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             $('#img_show_skb').attr('src', e.target.result);
    //         }
    //         reader.readAsDataURL(this.files[0]);
    //     }
    // });

    $("#type_usaha").on('change', function() {
    	if ($(this).val() == "04" || $(this).val() == "03") {
    		$("#file_siup").attr('disabled', true).addClass('disable');
			$("#file_tdp").attr('disabled', true).addClass('disable');
			$("#no_siup").attr('disabled', true).addClass('disable');			
			$("#siup_expired").attr('disabled', true).addClass('disable');	
			$("#no_tdp").attr('disabled', true).addClass('disable');	
			$("#tdp_expired").attr('disabled', true).addClass('disable');		
    	}else{
    		$("#file_siup").attr('disabled', false).removeClass('disable');
			$("#file_tdp").attr('disabled', false).removeClass('disable');
			$("#no_siup").attr('disabled', false).removeClass('disable');
			$("#siup_expired").attr('disabled', false).removeClass('disable');
			$("#no_tdp").attr('disabled', false).removeClass('disable');
			$("#tdp_expired").attr('disabled', false).removeClass('disable');
    	}
    });
    if ($("#type_usaha").val() == "04" || $("#type_usaha").val() == "03") {
		$("#file_siup").attr('disabled', true).addClass('disable');
		$("#file_tdp").attr('disabled', true).addClass('disable');
		$("#no_siup").attr('disabled', true).addClass('disable');		
		$("#siup_expired").attr('disabled', true).addClass('disable');	
		$("#no_tdp").attr('disabled', true).addClass('disable');	
		$("#tdp_expired").attr('disabled', true).addClass('disable');	
	}else{
		$("#file_siup").attr('disabled', false).removeClass('disable');
		$("#file_tdp").attr('disabled', false).removeClass('disable');
		$("#no_siup").attr('disabled', false).removeClass('disable');
		$("#siup_expired").attr('disabled', false).removeClass('disable');
		$("#no_tdp").attr('disabled', false).removeClass('disable');
		$("#tdp_expired").attr('disabled', false).removeClass('disable');
	}
})();
function notActiveBrand(id, brand, active) {
	MsgBox.Confirm('Are You Sure Not Active Brand ' + brand  + ' ?').then(result => {
		SendAjax(base_url + Modules + '/' + Controller + '/notActiveBrand/json/' + id + '/' + supp_id + '/' + active, null, 'GET', 'JSON', 5000, successNotActiveBrand);
	}).catch(err => {
		console.log(err);
	});
}
function successNotActiveBrand(data) {
	if (data.result == true) {
		$('#table_list_data').DataTable().ajax.reload(null, false);
	}
}
function successEdit(data) {
	$('.select2-usaha').select2();
	if (data.result) {
		var row = data.data;
		// console.log();
		// type_usaha += row.typeusaha_id;

		$('.select2-usaha').select2().val(row.typeusaha_id).trigger("change");
		// $('#type_usaha').select2('data', {id: row.typeusaha_id, text: row.typeusaha_name});
		$('#supp_id').val(row.supp_id); 
		$('#supp_name').val(row.supp_name);				
		$('#alias').val(row.alias);				
		$('#pic').val(row.pic);
		$('#jabatan').val(row.jabatan);
		$('#no_ktp').val(row.no_ktp);				
		$('#alamat_perusahaan').val(row.alamat_perusahaan);
		$('#country_id').val(row.country_id_perusahaan); $('#country_name').val(row.country_name); 
		$('#prov_id').val(row.prov_id_perusahaan); $('#prov_name').val(row.prov_name); 
		$('#city_id').val(row.city_id_perusahaan); $('#city_name').val(row.city_name); 
		$('#kec_id').val(row.kec_id_perusahaan); $('#kec_name').val(row.kec_name); 
		$('#kel_id').val(row.kel_id_perusahaan); $('#kel_name').val(row.kel_name); 
		$('#kode_pos_perusahaan').val(row.kode_pos_perusahaan);
		$('#alamat_toko').val(row.alamat_toko);
		$('#country_id_toko').val(row.country_id_toko); $('#country_name_toko').val(row.country_name_toko); 
		$('#prov_id_toko').val(row.prov_id_toko); $('#prov_name_toko').val(row.prov_name_toko); 
		$('#city_id_toko').val(row.city_id_toko); $('#city_name_toko').val(row.city_name_toko); 
		$('#kec_id_toko').val(row.kec_id_toko); $('#kec_name_toko').val(row.kec_name_toko); 
		$('#kel_id_toko').val(row.kel_id_toko); $('#kel_name_toko').val(row.kel_name_toko); 
		$('#kode_pos_toko').val(row.kode_pos_toko);
		$('#contact_person').val(row.contact_person);
		$('#no_telp').val(row.no_telp);
		$('#no_hp').val(row.no_hp);
		$('#no_fax').val(row.no_fax);
		$('#email1').val(row.email1);
		// $('#termofpayment').val(row.termofpayment);
		// console.log(row.typeusaha_id);
			

		// DataTableContactAvailableRows  = row.contact_person;
		// console.log();
		DataTableContactRows = $.parseJSON(row.person_contact);
		DataTableBrandRows = $.parseJSON(row.brand_ket);
		DatatableBrand = $('#table_list_data_add_brand').DataTable({
			"pagingType": "simple",
			"responsive": true,
			"lengthChange": false,
			"searching": false,
			"bInfo" : false,
			"targets": 'no-sort',
			"bSort": false,
			"data": DataTableBrandRows,
			"columns": [
				{"data": "ket_brand"},
				{"data": null, "width": 60, "className": "text-center"},
				{"data": null, "width": 60, "className": "text-center"}
	      ],
			"columnDefs": [
			
				{
					"targets": 1,
					"orderable": true,
					"searchable": false,
					"render": function ( data, type, row ) {
						let actions = '';
						actions += '<span class="btn btn-outline-primary waves-effect waves-light btn-sm">Processing</span> ';
						return actions;
					},
				},


				{
					"targets": -1,
					"orderable": false,
					"searchable": false,
					"render": function ( data, type, row, meta ) {
						let actions = '';
						// if (Priv.edit_flag == 1) {
						// 	actions = actions + '<a href="#" class="btn btn-pretty btn-cyan btn-xs" onclick="EditContact(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
						// }
						
						actions += '<a href="#" class="btn btn-outline-danger waves-effect waves-light btn-sm" onclick="DeleteBrand(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
						return actions;
					},
				},
			],
		});

		DataTableContact = $('#table_list_contact').DataTable({ 
			"pageLength": 5,
			"pagingType": "simple",
			"responsive": true,
			"lengthChange": false,
			"searching": false,
			"bInfo" : false,
			"targets": 'no-sort',
			"bSort": false,
			"data": DataTableContactRows,
			"columns": [
				{"data": "nama_contact"},
				{"data": "no_hp"},
				{"data": "email"},
				{"data": "keterangan"},
				{"data": null, "width": 70, "className": "text-center"}
	      ],
			"columnDefs": [
				{
					"targets": -1,
					"orderable": false,
					"searchable": false,
					"render": function ( data, type, row, meta ) {
						let actions = '';
						if (Priv.edit_flag == 1) {
							actions = actions + '<a href="#" class="btn btn-outline-info btn-sm waves-effect waves-light" onclick="EditContact(' + meta.row + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
						}
						if (Priv.delete_flag == 1) {
							actions = actions + '<a href="#" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="DeleteContact(' + meta.row + ');"><i class="glyphicon glyphicon-trash"></i> </a>';
						}

						return actions;
					},
				},
			],
		});
		if (row.status_retur == 1) {
			$('#status_retur_ya').prop('checked', true);
		} else {
			$('#status_retur_tidak').prop('checked', true);
		}


		if (row.status_disc == 1) {
			$('#status_disc_ya').prop('checked', true);
		} else {
			$('#status_disctidak').prop('checked', true);
		}


		$('#val_disc').val(row.val_disc);

		$('#no_siup').val(row.no_siup);
		// $('#siup_expired').val(row.siup_expired);
		if (row.siup_expired != null) {
			$("#siup_expired").datepicker("update", new Date(row.siup_expired));
		}else{
			$("#siup_expired").datepicker("update", new Date());
		}
		$('#no_tdp').val(row.no_tdp);
		// $('#tdp_expired').val(row.tdp_expired);

		if (row.tdp_expired != null) {
			$("#tdp_expired").datepicker("update", new Date(row.tdp_expired));
		}else{
			$("#tdp_expired").datepicker("update", new Date());
		}
		// $("#tdp_expired").datepicker("update", new Date(row.tdp_expired));

		$('#status').prop('checked', row.status == 1 ? true : false);	
		// $('#ket_brand').val(row.ket_brand);		
		$('#keterangan').val(row.keterangan);	
		$('#bank_id_1').val(row.bank_id_1); $('#bank_name_1').val(row.bank_name_1);	
		$('#kantor_cabang1').val(row.kantor_cabang1);	
		$('#city_id1').val(row.kota1);	
		$('#city_name1').val(row.city_name1);
		$('#no_rek1').val(row.no_rek1);	
		$('#nama_rek1').val(row.nama_rek1);	
		$('#cur_id_1').val(row.cur_id_1); $('#cur_name_1').val(row.cur_name_1);					
		$('#bank_id_2').val(row.bank_id_2); $('#bank_name_2').val(row.bank_name_2);	
		$('#kantor_cabang2').val(row.kantor_cabang2);	
		$('#city_id2').val(row.kota2);	
		$('#city_name2').val(row.city_name2);	
		$('#no_rek2').val(row.no_rek2);	
		$('#nama_rek2').val(row.nama_rek2);	
		$('#cur_id_2').val(row.cur_id_2); $('#cur_name_2').val(row.cur_name_2);	
		
		if (row.status_tax == 1) {
			$('#status_tax_pkp').prop('checked', true);
		} else {
			$('#status_tax_nonpkp').prop('checked', true);				
		}
		$('#no_npwp').val(row.no_npwp);	
		$('#nama_npwp').val(row.nama_npwp);	
		$('#no_pkp').val(row.no_pkp);	

		$('#img_show').attr('src', base_url+'assets/data_upload/ktp/'+row.file_ktp);	
		$('#img_siup').attr('src', base_url+'assets/data_upload/siup/'+row.file_siup);	
		$('#img_nib').attr('src', base_url+'assets/data_upload/nib/'+row.file_nib);	
		$('#img_show_tdp').attr('src', base_url+'assets/data_upload/tdp/'+row.file_tdp);
			
		if (row.file_skt != null) {
			$('#img_show_skt').attr('src', base_url+'assets/data_upload/skt/'+row.file_skt);	
		}
		if (row.file_npwp != null) {
			$('#img_show_npwp').attr('src', base_url+'assets/data_upload/npwp/'+row.file_npwp);	
		}
		if (row.file_sppkp != null) {
			$('#img_show_sppkp').attr('src', base_url+'assets/data_upload/sppkp/'+row.file_sppkp);	
		}
		// if (row.file_skb != null) {
		// 	$('#img_show_skb').attr('src', base_url+'assets/data_upload/skb/'+row.file_skb);	
		// }

		if (row.status_disc== 1) {
			$("#val_disc").attr('disabled', false).removeClass('disable');
		}else{
			$("#val_disc").attr('disabled', true).addClass('disable');
		}



		if (row.status_tax == 1) {
			$("#no_npwp").attr('disabled', false).removeClass('disable');
			$("#nama_npwp").attr('disabled', false).removeClass('disable');					
			$("#no_pkp").attr('disabled', false).removeClass('disable');
			$("#skt").attr('disabled', false).removeClass('disable');
			$("#npwp").attr('disabled', false).removeClass('disable');
			$("#sppkp").attr('disabled', false).removeClass('disable');
			// $("#skb").attr('disabled', false).removeClass('disable');
			$("#no_pkp").attr('disabled', false).removeClass('disable');

			$("#form_input").validate({
				rules: {
					
					supp_name: {
						required: true,
					},
					
					alias: {
						required: true,
					},
					npwp:{
						required: true,
					},
					skt:{
						required: true,
					},
					sppkp:{
						required: true,
					}
					// skb:{
					// 	required: true,
					// }
				},
				messages: {
					supp_id: {
		            required: "Field ini wajib terisi",
		            number: "Hanya angka yang diperbolehkan",
					nowhitespace: "Spasi tidak diperbolehkan"
		        },
					supp_name: {
		            required: "Field ini wajib terisi",
		        },
					alias: {
				        required: "Field ini wajib terisi",
					},
					npwp: {
				        required: "Field ini wajib terisi",
					},
					skt: {
				        required: "Field ini wajib terisi",
					},
					sppkp: {
				        required: "Field ini wajib terisi",
					}
					// skb: {
				 //        required: "Field ini wajib terisi",
					// },
				}
			});
		}else{
			$("#no_npwp").attr('disabled', true).addClass('disable');
			$("#nama_npwp").attr('disabled', true).addClass('disable');
			$("#no_skt").attr('disabled', true).addClass('disable');
			$("#nama_skt").attr('disabled', true).addClass('disable');
			$("#no_pkp").attr('disabled', true).addClass('disable');
			$("#skt").attr('disabled', true).addClass('disable');
			$("#npwp").attr('disabled', true).addClass('disable');
			$("#sppkp").attr('disabled', true).addClass('disable');
			// $("#skb").attr('disabled', true).addClass('disable');
		}	



	} else {
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
	}
}
function initPageForm(){
	LobiAdmin.highlightCode();
	
	// $('#type_usaha').select2();

	// Init tanggal
	$('#doc_date_container_ktp .input-group.date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	});


	$('#siup_expired').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());


	$('#tdp_expired').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());


	// $('#termofpayment').autoNumeric('init', formatNumber);
	// if ($("input[name=val_disc]").val() == 0){
	// 	$("#val_disc").attr('disabled', true).addClass('disable');
	// }else{
	// 	$("#val_disc").attr('disabled', false).removeClass('disable');
	// }
	// $("input[name=status_disc]").change(function(e) {
	// 	console.log($(this).val());
	// 	if ($(this).val() == 0) {
	// 		$("#val_disc").attr('disabled', true).addClass('disable');
	// 	}else{
	// 		$("#val_disc").attr('disabled', false).removeClass('disable');
	// 	}
	// });
	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#formcontact").validate({
		rules: {
			nama_contact: {
				required: true,
			},
			no_hp: {
				required: true,
			}
		}
	});

	$("#form_input").validate({
		rules: {
			
			supp_name: {
				required: true,
			},
			
			alias: {
				required: true,
			},

			val_disc: {
				number: true,
			},
			
			
		},
		messages: {
			supp_id: {
            required: "Field ini wajib terisi",
            number: "Hanya angka yang diperbolehkan",
			nowhitespace: "Spasi tidak diperbolehkan"
        },
			supp_name: {
            required: "Field ini wajib terisi",
        },
			alias: {
		        required: "Field ini wajib terisi",
			},
		}
	});

	LoadDataTable();
	// setTimeout(() => {
	// 	LoadDataTable();		
	// }, 500);
	
}

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}
function CopyValue() {
	$("#alamat_toko").val($("#alamat_perusahaan").val());
	$("#country_name_toko").val($("#country_name").val());
	$("#country_name_toko").val($("#country_name").val());
	$("#city_name_toko").val($("#city_name").val());
	$("#country_id_toko").val($("#country_id").val());
	$("#kel_name_toko").val($("#kel_name").val());
	$("#kel_id_toko").val($("#kel_id").val());
	$("#prov_name_toko").val($("#prov_name").val());
	$("#prov_id_toko").val($("#prov_id").val());
	$("#kec_name_toko").val($("#kec_name").val());
	$("#kec_id_toko").val($("#kec_id").val());
	$("#kode_pos_toko").val($("#kode_pos_perusahaan").val());
}
function Simpan() {
	let list_input = ['supp_name', 'alias','pic','jabatan','no_hp','bank_id_1','kantor_cabang1','city_name1','no_rek1','nama_rek1','cur_id_1'];
	var attr_tdp = $("#img_show_tdp").attr('src');
	// var img_show_skb = $("#img_show_skb").attr('src');	
	var img_show_skt = $("#img_show_skt").attr('src');
	var img_show_npwp = $("#img_show_npwp").attr('src');
	var img_show_sppkp = $("#img_show_sppkp").attr('src');
	
	if ($("input[name=status_tax]:checked").val() == 1) {
		if (img_show_skt == "#" || img_show_skt == null || img_show_npwp == "#" || img_show_npwp == null || img_show_sppkp == "#" || img_show_sppkp == null) {
			list_input.push('npwp','sppkp','skt');
		}
	}
	console.log(parseInt($("#type_usaha").val()));
	if (parseInt($("#type_usaha").val()) == "4" || parseInt($("#type_usaha").val()) == "3") {
		console.log("tidak wajib siup");
		
	}else{
		list_input.push('no_siup','siup_expired','no_tdp','tdp_expired');
		let list_cek = ['no_siup', 'siup_expired','no_tdp','tdp_expired'];

		if (!ValidasiInput(list_cek)) {
			MsgBox.Notification('Data SIUP dan TDP wajib di isi Semua.', 'bottom right', 'warning', 'mini');
			return;
		}
	}
	
	console.log(list_input);
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = {
		type_usaha: $('#type_usaha').val(),
		supp_id: $('#supp_id').val(),
		supp_name: $('#supp_name').val(),	
		alias: $('#alias').val(),		
		pic: $('#pic').val(),
		jabatan: $('#jabatan').val(),
		no_ktp: $('#no_ktp').val(),		
		alamat_perusahaan: $('#alamat_perusahaan').val(),
		country_id: $('#country_id').val(),
		prov_id: $('#prov_id').val(),
		city_id: $('#city_id').val(),
		kec_id: $('#kec_id').val(),
		kel_id: $('#kel_id').val(),
		kode_pos_perusahaan: $('#kode_pos_perusahaan').val(),
		alamat_toko: $('#alamat_toko').val(),
		country_id_toko: $('#country_id_toko').val(),
		prov_id_toko: $('#prov_id_toko').val(),
		city_id_toko: $('#city_id_toko').val(),
		kec_id_toko: $('#kec_id_toko').val(),
		kel_id_toko: $('#kel_id_toko').val(),
		kode_pos_toko: $('#kode_pos_toko').val(),
		// contact_person: $('#contact_person').val(),
		no_telp: $('#no_telp').val(),
		no_hp: $('#no_hp').val(),
		no_fax: $('#no_fax').val(),
		email1: $('#email1').val(),
		email2: $('#email2').val(),
		// termofpayment: $('#termofpayment').val(),
		// status_retur: $('input[name="status_retur"]:checked').val(),
		// status_disc: $('input[name="status_disc"]:checked').val(),
		// val_disc: $('#val_disc').val(),
		no_siup: $('#no_siup').val(),
		siup_expired: moment($('#siup_expired').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		no_tdp: $('#no_tdp').val(),
		tdp_expired: moment($('#tdp_expired').val(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
		status: $('#status').is(':checked') ? 1 : 0,
		keterangan: $('#keterangan').val(),
		bank_id_1: $('#bank_id_1').val(),
		kantor_cabang1: $('#kantor_cabang1').val(),
		kota1: $('#city_id1').val(),
		no_rek1: $('#no_rek1').val(),
		nama_rek1: $('#nama_rek1').val(),
		cur_id_1: $('#cur_id_1').val(),
		bank_id_2: $('#bank_id_2').val(),
		kantor_cabang2: $('#kantor_cabang2').val(),
		kota2: $('#city_id2').val(),
		no_rek2: $('#no_rek2').val(),
		nama_rek2: $('#nama_rek2').val(),
		cur_id_2: $('#cur_id_2').val(),
		status_tax: $('input[name="status_tax"]:checked').val(),
		no_npwp: $('#no_npwp').val(),
		nama_npwp: $('#nama_npwp').val(),
		no_pkp: $('#no_pkp').val(),
		contact_person: DataTableContact.rows().data().toArray(),
		keterangan_brand: DatatableBrand.rows().data().toArray()
	};
	var formData = new FormData();

	formData.append('type_usaha', data2Send.type_usaha);
	formData.append('supp_id', supp_id);
	formData.append('supp_name', data2Send.supp_name);	
	formData.append('alias', data2Send.alias);
	formData.append('pic', data2Send.pic);
	formData.append('jabatan', data2Send.jabatan);
	formData.append('no_ktp', data2Send.no_ktp);
	formData.append('alamat_perusahaan', data2Send.alamat_perusahaan);
	formData.append('country_id', data2Send.country_id);
	formData.append('prov_id', data2Send.prov_id);
	formData.append('city_id', data2Send.city_id);
	formData.append('kec_id', data2Send.kec_id);
	formData.append('kel_id', data2Send.kel_id);
	formData.append('kode_pos_perusahaan', data2Send.kode_pos_perusahaan);
	formData.append('alamat_toko', data2Send.alamat_toko);
	formData.append('country_id_toko', data2Send.country_id_toko);
	formData.append('prov_id_toko', data2Send.prov_id_toko);
	formData.append('city_id_toko', data2Send.city_id_toko);
	formData.append('kec_id_toko', data2Send.kec_id_toko);
	formData.append('kel_id_toko', data2Send.kel_id_toko);
	formData.append('kode_pos_toko', data2Send.kode_pos_toko);
	formData.append('contact_person', data2Send.contact_person);
	formData.append('no_telp', data2Send.no_telp);
	formData.append('no_hp', data2Send.no_hp);
	formData.append('no_fax', data2Send.no_fax);
	formData.append('email1', data2Send.email1);
	formData.append('email2', data2Send.email2);
	// formData.append('termofpayment', data2Send.termofpayment);
	// formData.append('status_retur', data2Send.status_retur);
	// formData.append('status_disc', data2Send.status_disc);
	// formData.append('val_disc', data2Send.val_disc);
	formData.append('no_siup', data2Send.no_siup);
	formData.append('siup_expired', data2Send.siup_expired);
	formData.append('no_tdp', data2Send.no_tdp);
	formData.append('tdp_expired', data2Send.tdp_expired);
	formData.append('status', data2Send.status);
	formData.append('keterangan', data2Send.keterangan);
	formData.append('bank_id_1', data2Send.bank_id_1);
	formData.append('kantor_cabang1', data2Send.kantor_cabang1);
	formData.append('city_id1', data2Send.kota1);
	formData.append('no_rek1', data2Send.no_rek1);
	formData.append('nama_rek1', data2Send.nama_rek1);
	formData.append('cur_id_1', data2Send.cur_id_1);
	formData.append('bank_id_2', data2Send.bank_id_2);
	formData.append('kantor_cabang2', data2Send.kantor_cabang2);
	formData.append('city_id2', data2Send.kota2);
	formData.append('no_rek2', data2Send.no_rek2);
	formData.append('nama_rek2', data2Send.nama_rek2);
	formData.append('cur_id_2', data2Send.cur_id_2);
	formData.append('status_tax', data2Send.status_tax);
	formData.append('no_npwp', data2Send.no_npwp);
	formData.append('nama_npwp', data2Send.nama_npwp);
	formData.append('no_pkp', data2Send.no_pkp);
	formData.append('contact_person', JSON.stringify(data2Send.contact_person));
	formData.append('keterangan_brand', JSON.stringify(data2Send.keterangan_brand));

	// Fungsi Untuk Upload Data
	if ($('input[name=file_ktp]')[0].files != 0) {
		formData.append('imgktp', $('input[name=file_ktp]')[0].files[0]); 		
	}
	if ($('input[name=file_siup]')[0].files != 0) {
		formData.append('imgsiup', $('input[name=file_siup]')[0].files[0]);
	}

	if ($('input[name=file_nib]')[0].files != 0) {
		formData.append('imgnib', $('input[name=file_nib]')[0].files[0]);
	}
	if ($('input[name=file_tdp]')[0].files != 0) {
		formData.append('imgtdp', $('input[name=file_tdp]')[0].files[0]);
	}
	if ($('input[name=skt]')[0].files != 0) {
		formData.append('imgskt', $('input[name=skt]')[0].files[0]); 
	}
	if ($('input[name=npwp]')[0].files != 0) {
		formData.append('npwp', $('input[name=npwp]')[0].files[0]); 
	}
	if ($('input[name=sppkp]')[0].files != 0) {
		formData.append('sppkp', $('input[name=sppkp]')[0].files[0]); 
	}
	// if ($('input[name=skb]')[0].files != 0) {
	// 	formData.append('skb', $('input[name=skb]')[0].files[0]);
	// }
	
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
		MsgBox.Disclaimer('1. Menyatakan data dan dokumen yang disampaikan dalam sistem B2B ini adalah benar dan kami setuju dengan segala aturan yang di tetapkan oleh RIA BUSANA GROUP tentang kerjasama ini.<br>2. Pihak RIA BUSANA GROUP tidak bertanggung jawab terhadap ketidaksesuaian data ataupun informasi yang disampaikan oleh pihak Supplier.<br>3. Pihak RIA BUSANA GROUP akan menjaga kerahasiaan data Supplier.').then(result2 => {
			if(result2 == true){
				formData.append('disclaimer', 1);
			    let url =  base_url + Modules + '/' + Controller + '/update/';
			    SendAjaxWithUpload(url, formData, 'POST', 'JSON', 5000, successSupplier);
			// }else{
			// 	formData.append('disclaimer', 0);
			//     let url =  base_url + Modules + '/' + Controller + '/update/';
			//     SendAjaxWithUpload(url, formData, 'POST', 'JSON', 5000, successSupplier);
			}
			// console.log(result2);
	
		}).catch(err => {
			formData.append('disclaimer', 0);
			let url =  base_url + Modules + '/' + Controller + '/update/';
			SendAjaxWithUpload(url, formData, 'POST', 'JSON', 5000, successSupplier);
			//
		});
	}).catch(err => {
		console.log(err);
		//
	});
	
}
function successSupplier(data) {
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
function LOVWilayahSupp() {
	$('#PopUpModal').load(base_url + 'pembelian/supplierwilayah/getWilayahsupplierList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['wil_id', 'wil_name']);
		$('#list_controls').val(['#wil_id', '#wil_name']);
	});
}

function LOVWilayahSuppClear() {
	$('#wil_id').val(''); $('#wil_name').val('');
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



function LOVCountry2(country_id = null, country_name = null) {
	$('#PopUpModal').load(base_url + 'administrasi/store/getCountryList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "900px"}); // Lebar modal LOV
		$('#list_cols').val(['country_id', 'country_name']);
		$('#list_controls').val(['#country_id_toko', '#country_name_toko']);
		$('#prov_id_toko').val('');
		$('#prov_name_toko').val('');
	});
}

function LOVCountryClear2(emp_id = null, emp_name = null) {
	$('#country_id_toko').val(''); $('#country_name_toko').val('');
}

function LOVPro2() {
	let idcountry = $('#country_id_toko').val().trim();
	if(idcountry == '') {
		MsgBox.Notification('Negara kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getProvinceList/home/'+ idcountry, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['prov_id', 'prov_name']);
		$('#list_controls').val(['#prov_id_toko', '#prov_name_toko']);
		$('#city_id_toko').val('');
		$('#city_name_toko').val('');
	});
}

function LOVProClear2() {
	$('#prov_id_toko').val(''); $('#prov_name_toko').val('');
}


function LOVCity2() {
	let idprov = $('#prov_id_toko').val().trim();
	if(idprov == '') {
		MsgBox.Notification('Provinsi kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getCityList/home/'+ idprov, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['city_id', 'city_name']);
		$('#list_controls').val(['#city_id_toko', '#city_name_toko']);
		$('#kec_id_toko').val('');
		$('#kec_name_toko').val('');
	});
}

function LOVCityClear2() {
	$('#city_id_toko').val(''); $('#city_name_toko').val('');
}

function LOVKec2() {
	let idcity = $('#city_id_toko').val().trim();
	if(idcity == '') {
		MsgBox.Notification('Kota / Kabupaten kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getKecList/home/'+ idcity, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['kec_id', 'kec_name']);
		$('#list_controls').val(['#kec_id_toko', '#kec_name_toko']);
		$('#kel_id_toko').val('');
		$('#kel_name_toko').val('');
	});
}

function LOVKecClear2() {
	$('#kec_id_toko').val(''); $('#kec_name_toko').val('');
}


function LOVKel2() {
	let idkec = $('#kec_id_toko').val().trim();
	if(idkec == '') {
		MsgBox.Notification('Kecamatan kosong.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	$('#PopUpModal').load(base_url + 'administrasi/store/getKelList/home/'+ idkec, () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['kel_id', 'kel_name']);
		$('#list_controls').val(['#kel_id_toko', '#kel_name_toko']);
	});
}

function LOVKelClear2() {
	$('#kel_id_toko').val(''); $('#kel_name_toko').val('');
}


function LOVBank(emp_id = null, emp_name = null) {
	$('#PopUpModal').load(base_url + 'pembelian/supplier/getBankList/home', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['bank_id', 'bank_name']);
		$('#list_controls').val(['#' + emp_id, '#' + emp_name]);
	});
}

function LOVBankClear(emp_id = null, emp_name = null) {
	$('#' + emp_id).val(''); $('#' + emp_name).val('');
}


function LOVCurrency(emp_id = null, emp_name = null) {
	$('#PopUpModal').load(base_url + 'pembelian/supplier/getCurrencyList/home', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['cur_id', 'cur_name','cur_symbol','negara']);
		$('#list_controls').val(['#' + emp_id, '#' + emp_name]);
	});
}

function LOVCurrencyClear(emp_id = null, emp_name = null) {
	$('#' + emp_id).val(''); $('#' + emp_name).val('');
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


function LOVKota1() {
	// Ambil URL untuk membuka modal LOV
		
	$('#PopUpModal').load(base_url + 'profile/profile/getKotaList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['city_id', 'city_name','prov_name']);
		$('#list_controls').val(['#city_id1', '#city_name1']);
		
	});
}
//
function LOVKota1Clear() {
	$('#city_id1').val(''); $('#city_name1').val('');
}



function LOVKota2() {
		
	$('#PopUpModal').load(base_url + 'profile/profile/getKotaList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['city_id', 'city_name','prov_name']);
		$('#list_controls').val(['#city_id2', '#city_name2']);
		
	});
}

function LOVKota2Clear() {
	$('#city_id2').val(''); $('#city_name2').val('');
}



function SimpanRowDataTable(DataTableElement, data2save, RowIdx = null) {
	if (DataTableAction == 'edit') {
		DataTableElement.row(RowIdx).data(data2save).draw();
		// MsgBox.Notification('Data berhasil diperbaharui.', 'bottom right', 'success', 'mini', 1000);
	} else {
		DataTableElement.row.add(data2save).draw();
		// console.log(data2save);
		// MsgBox.Notification('Data berhasil ditambahkan.', 'bottom right', 'success', 'mini', 1000);
	}
}
function EditContact(RowIdx) {
	let data2edit = DataTableContact.row(RowIdx).data();
	DataTableAction = 'edit';
	// Set DataTableRowIdx
	DataTableRowIdx = RowIdx;
	$('#nama_contact').val(data2edit.nama_contact);
	$('#no_hp_person').val(data2edit.no_hp_person);
	$('#email').val(data2edit.email);
	$('#keterangan').val(data2edit.keterangan);
	$('#nama_contact').focus();
}
function DeleteContact(RowIdx) {
	let getData = DataTableContact.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data contact ' + getData.daya_listrik_panel  + ' ini?').then(result => {
		DeleteRowDataTable(DataTableContact, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}
function DeleteBrand(RowIdx) {
	let getData = DatatableBrand.row(RowIdx).data();
	MsgBox.Confirm('Yakin akan hapus data brand ini?').then(result => {
		DeleteRowDataTable(DatatableBrand, RowIdx)
	}).catch(err => {
		console.log(err);
	});
}
function DeleteRowDataTable(DataTableElement, RowIdx = null) {
	// DataTableElement.row("#" + RowIdx).remove().draw();
	DataTableElement.row(RowIdx).remove().draw();
	// MsgBox.Notification('Data berhasil dihapus.', 'bottom right', 'success', 'mini', 1000);
}
function Refresh() {
	data2Send = null;
	DataTableInfo.ajax.reload(null,false);
}

function SaveContact() {
	if ($("#nama_contact").val() == "" || $("#no_hp_person").val() == "") {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini', 1000);
		return;
	}
	// Persiapkan inputan
	let data2save = { 
		nama_contact: $('#nama_contact').val(),
		no_hp: $('#no_hp_person').val(),
		email: $('#email').val(),
		keterangan: $('#keterangan').val()
	};
	// Simpan data
	SimpanRowDataTable(DataTableContact, data2save, DataTableRowIdx);
	// Kembalikan DataTableAction dan DataTableRowIdx
	DataTableAction = 'create';
	DataTableRowIdx = 0;
	// Set element 0 dan fokus
	$('#nama_contact').val(""); $('#no_hp').val(""); $('#email').val(""); $('#keterangan').val("");
	$('#nama_contact').focus();
	clearValidation('#formcontact');
}
function LoadDataTable() {	
	
	
	DataTable = $('#table_list_data').DataTable({
		"pageLength": 50,
		"numbers_length": 4,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList/',
			// "url": base_url + Modules + '/' + Controller + '/getList/' + id,
			"type": "POST",
			"data": function (a) {
				a.status = $('#filter_status').val();
			},
		},
		"columns": [
			{ "data": "brand_id" },
			{ "data": "brand_name" },
			{ "data": "status", "width": 40, "className": "text-center"},
		
		],
		"columnDefs": [
			{
				"targets": 2,
				"orderable": true,
				"searchable": false,
				"render": function (data, type, row) {
					if (row.status == 1) {
						return '<span class="badge badge-success text-center">Aktif</span>  <button class="btn btn-outline-danger waves-effect waves-light btn-sm text-center" onclick="notActiveBrand(\'' + row.brand_id + '\',\'' + row.brand_name + '\',\'' + '0' + '\')">Not Active</button>';
					}else if(row.status == 3){
						return '<span class="badge badge-warning text-center">Waiting Confirmation</span>';
					} else {
						return  '<span class="badge badge-danger text-center">Tidak Aktif</span>';
					}
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function (data, type, row) {
					let actions = '';
					return actions;
				},
			},
		],
	});
}


