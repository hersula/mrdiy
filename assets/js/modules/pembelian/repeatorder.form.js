(function () {
	$("#doc_no_val").val("RO-"+makeid(5));
	$("#no_dokumen").val("RO-"+makeid(5));
	$(".estimasi_diterima_week").select2({
		placeholder:'Estimasi Diterima',
		width:'100%'
	});
	$(".estimasi_diterima_week").change(function() {
		var id_estimasi = $(this).val();
		var year = $(".tahun").val();
		var month = $(".bulan").val();
		SendAjax(base_url + Modules + '/' + Controller + '/getEstimasiDiterima/json/' + id_estimasi + '/' + year + '/' + month, null, 'POST', 'JSON', 200000000, estimasiDiterima);
	});
	$(".tahun").select2({
		placeholder:'Pilih Tahun',
		width:'100%'
	});
	$(".bulan").select2({
		placeholder:'Pilih Bulan',
		width:'100%'
	});

	$(".tahun").change(function() {
		console.log("tahun");
		$(".bulan").val('').trigger('change');
		$(".estimasi_diterima_week").val('').trigger('change');
		$("#est_date").text('');
		$(".est_week").val('');
		$(".est_start").val('');
		$(".est_end").val('');
	});
	$(".bulan").change(function() {
		var id_bulan = $(this).val();
		var year = $(".tahun").val();
		SendAjax(base_url + Modules + '/' + Controller + '/getWeek/json/' + id_bulan + '/' + year, null, 'POST', 'JSON', 200000000, estimasiWeek);
	});
	// $(".tahun").change(function() {
	// 	// var id_Tahun = $(this).val();
	// 	// $(".estimasi_diterima_week").empty();
	// 	// $("#est_date").text('');
	// 	// var text = "<option></option>";
	// 	// // // console.log(weeksInYear(id_Tahun));
	// 	// var i;


	// 	// for (i = 0; i < 4; i++) {
	// 	//   text +=  "<option value='"+(i + 1)+"'>Minggu ke - " + (i + 1) + "</option>";
	// 	// }
	// 	// $(".estimasi_diterima_week").html(text);
	// 	// SendAjax(base_url + Modules + '/' + Controller + '/getTahunDiterima/json/' + id_Tahun, null, 'POST', 'JSON', 200000000, TahunDiterima);
	// });
	$('#doc_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
	$('#tanggal_kadaluarsa').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
	$('#terima_dok').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
	$('#estimasi_diterima').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
	DataTablePORows = $.parseJSON(localStorage.getItem("data_ro"));
	$("#total_qty").val(localStorage.getItem("qty_total"));
	$("#discount").val(localStorage.getItem("discount_total"));
	$("#tax").val(localStorage.getItem("tax_total"));
	$('.total_harga_beli').mask("#.###.###.###.###", {reverse: true, watchDataMask: true});
	$('.harga_beli').mask("#.###.###.###.###", {reverse: true});
	$(".total_harga_beli").val(localStorage.getItem("harga_beli_total")).keyup();
	$(".total_harga_beli").trigger('input');
	document.onkeypress = function(key) {
	    console.log(key.which);
	    if (key.which == 113) { //q keyboard event
	    	$("#qty").focus();
	    }else if(key.which == 104){ //h keyboard event
	    	$("#harga_beli").focus();
	    }
	};
	$('#filter').lobiPanel({
			reload: false,
			close: false,
			editTitle: false,
			unpin: false,
			expand: false
	});
	initSelect2Ajax("#sku", "Pilih SKU", base_url + 'administrasi/info/getListSkuSelect2/', ['sku_id', 'sku_desc'], 0 ,false);
	initSelect2Ajax("#supplier_select", "Pilih Supplier", base_url + 'administrasi/info/getListSupplierSelect2/', ['supp_id', 'supp_name'], 0 ,false);
	initSelect2Ajax("#store", "Pilih store", base_url + 'administrasi/info/getListStoreSelect2/', ['store_id', 'store_name'], 0 ,false);
	// initSelect2Ajax(".estimasi_diterima", "Select Weeks", base_url + 'pembelian/repeatorder/estimasiDiterima/', ['estimasi_id', 'estimasi_name'], 0 ,false);
	$('#sku').change(function() {
		SendAjax(base_url + Modules + '/' + Controller + '/getSkuDetail/json/' + $(this).val(), null, 'POST', 'JSON', 200000000, skuDetail);
	});
	$('#sku').on("select2:selecting", function(e){
		$("#po-form-selected").show();
		$("#po-form-selected-2").show();
    }).trigger('change');
	$('#sku').on("select2:unselecting", function(e){
		$("#po-form-selected").hide();
		$("#po-form-selected-2").hide();
    }).trigger('change');
	$("#tax").change(function() {
		let tax = $(this).val();
		localStorage.setItem('tax_total',tax);
		if (localStorage.getItem('discount_total') !== null) {
			var harga_before_tax;
			console.log("sudah ada diskon");
			let tax_harga = parseInt(tax) * localStorage.getItem("harga_beli_total") / 100;
			harga_before_tax = (parseInt(localStorage.getItem("harga_beli_total")) + parseInt(tax) * parseInt(localStorage.getItem("harga_beli_total")) / 100) - (parseInt(localStorage.getItem('discount_total')) * parseInt(localStorage.getItem("harga_beli_total")) / 100);
		}else{
			console.log("belum ada diskon");
			let tax_harga = parseInt(tax) * localStorage.getItem("harga_beli_total") / 100;
			harga_before_tax = parseInt(localStorage.getItem("harga_beli_total")) + parseInt(tax) * parseInt(localStorage.getItem("harga_beli_total")) / 100;
		}
		$(".total_harga_beli").val(harga_before_tax).keyup();
	});
	$("#discount").change(function() {
		// console.log("change tax");
		let harga_before_discount;
		let discount = $(this).val();
		localStorage.setItem('discount_total',discount);

		if (localStorage.getItem('tax_total') !== null) {
			let discount_harga = parseInt(discount) * parseInt(localStorage.getItem("harga_beli_total")) / 100;
			harga_before_discount = (parseInt(localStorage.getItem("tax_total")) * parseInt(localStorage.getItem("harga_beli_total")) / 100) + (parseInt(localStorage.getItem("harga_beli_total")) - parseInt(discount) * parseInt(localStorage.getItem("harga_beli_total")) / 100);
		}else{
			let discount_harga = parseInt(discount) * localStorage.getItem("harga_beli_total") / 100;
			harga_before_discount = parseInt(localStorage.getItem("harga_beli_total")) - parseInt(discount) * parseInt(localStorage.getItem("harga_beli_total")) / 100;
		}
		$(".total_harga_beli").val(harga_before_discount).keyup();
	});
    $("#harga_beli").keyup(function(event) {
    	if (event.keyCode === 13) {
    		console.log($("#satuan option:selected").data("name"));
    		var arr_data_ro = [];
    		let data_ro = {
    			sku_id : $("#sku_id").val(),
    			sku_desc : $("#sku_desc").val(),
    			category_id : $("#mclass_id").val(),
    			category_name : $("#mclass_name").val(),
    			nama_barang : $("#nama_barang").val(),
    			satuan : $("#satuan").val(),
    			satuan_name : $("#satuan option:selected").data("name"),
    			qty : $("#qty").val(),
    			harga_beli : $("#harga_beli").val(),
    			discount : $("#disc").val(),

    		}
    		add_data_ro(data_ro);
    		let data_ro_dtl = {
    			doc_no : $("#doc_no_val").val(),
    			sku_id : $("#sku_id").val(),
    			uom_id : $("#satuan").val(),
    			qty_uom : $("#qty").val(),
    			qty : $("#qty").val(),
    			hbeli : $("#harga_beli").val().replace(/\./g, ''),
    		}
    		add_data_ro_dtl(data_ro_dtl);
    		if (localStorage.getItem('qty_total') !== null) {
    			localStorage.setItem('qty_total', parseInt(localStorage.getItem('qty_total')) + parseInt(data_ro.qty));
    			localStorage.setItem('harga_beli_total', parseInt(localStorage.getItem('harga_beli_total').replace(/\./g, '')) + parseInt(data_ro.harga_beli.replace(/\./g, '')));
    		}else{
    			localStorage.setItem('qty_total', data_ro.qty);
    			localStorage.setItem('harga_beli_total', data_ro.harga_beli.replace(/\./g, ''));
    		}
			DataTable.row.add(data_ro).draw();

			$("#sku").empty().trigger('change');
			$("#mclass_name").val("");
			$("#merk").val("");
			$("#artikel").val("");
			$("#ukuran").val("");
			$("#warna").val("");
			$("#nama_barang").val("");
			$("#qty").val("");
			$("#harga_beli").val("");
			$("#sku").select2('open');

			$("#total_qty").val(localStorage.getItem("qty_total"));
			$("#discount").val(localStorage.getItem("discount_total"));
			$("#tax").val(localStorage.getItem("tax_total"));
			$('.total_harga_beli').mask("#.###.###.###.###", {reverse: true, watchDataMask: true});
			$('.harga_beli').mask("#.###.###.###.###", {reverse: true});
			$(".total_harga_beli").val(localStorage.getItem("harga_beli_total")).keyup();
			$(".total_harga_beli").trigger('input');
    	}
    });
    $(".satuan").change(function() {
    	let satuan = $(this).val();
    	localStorage.setItem("satuan",satuan);
    });
    $("#qty").change(function() {
    	let qty = $(this).val();
    	let convert;
    	if (localStorage.getItem("satuan") == '01') {
    		console.log("01");
    		convert = localStorage.getItem("harga_beli") * parseInt(1) * parseInt(qty) - parseInt($("#disc").val()) * parseInt(localStorage.getItem("harga_beli")) * parseInt(qty) / 100;
    	}
    	else if (localStorage.getItem("satuan") == '02') {
    		console.log("02");
    		convert = localStorage.getItem("harga_beli") * parseInt(12) * parseInt(qty) - parseInt($("#disc").val()) * parseInt(localStorage.getItem("harga_beli")) * parseInt(qty) / 100;
    	}
    	else if (localStorage.getItem("satuan") == '03') {
    		console.log("03");
    		convert = localStorage.getItem("harga_beli") * parseInt(144) * parseInt(qty) - parseInt($("#disc").val()) * parseInt(localStorage.getItem("harga_beli")) * parseInt(qty) / 100;
    	}
    	else if (localStorage.getItem("satuan") == '04') {
    		console.log("04");
    		convert = localStorage.getItem("harga_beli") * parseInt(5) * parseInt(qty) - parseInt($("#disc").val()) * parseInt(localStorage.getItem("harga_beli")) * parseInt(qty) / 100;
    	}
    	else if (localStorage.getItem("satuan") == '05') {
    		convert = localStorage.getItem("harga_beli") * parseInt(1) * parseInt(qty) - parseInt($("#disc").val()) * parseInt(localStorage.getItem("harga_beli")) * parseInt(qty) / 100;
    		console.log("05");
    	}
    	else if (localStorage.getItem("satuan") == '06') {
    		convert = localStorage.getItem("harga_beli") * parseInt(1) * parseInt(qty) - parseInt($("#disc").val()) * parseInt(localStorage.getItem("harga_beli")) * parseInt(qty) / 100;
    		console.log("06");
    	}
    	console.log(convert);
    	localStorage.setItem("harga_beli_qty",convert);
    	$('#harga_beli').mask("#.###.###.###.###", {reverse: true});
    	$("#harga_beli").val(convert).keyup();
    });
    $("#disc").change(function() {
    	let disc = $(this).val();
    	let after_disc = parseInt(localStorage.getItem("harga_beli")) * parseInt($("#qty").val()) - parseInt(disc) * parseInt(localStorage.getItem("harga_beli"))  * parseInt($("#qty").val()) / 100;

    	console.log(after_disc);
    	// localStorage.setItem("harga_beli",after_disc);
    	// console.log($("#harga_beli").val().replace(/\./g, ''));
    	$('#harga_beli').mask("#.###.###.###.###", {reverse: true});
    	$("#harga_beli").val(after_disc).keyup();
    });
})();
// function TahunDiterima(data) {
	
// }

function estimasiDiterima(data) {
	$("#est_date").text(data.start_date + ' s/d '+data.end_date);
	$("#est_start").val(data.start_date_format);
	$("#est_end").val(data.end_date_format);
}
function estimasiWeek(data) {
	console.log(data);
	if (data.status == 0) {
		MsgBox.Notification('Estimasi yang ada ajukan kurang dari 3 minggu', 'bottom right', 'info');
		$(".estimasi_diterima_week").empty().trigger('change');
		$("#est_date").text('');
		$("#est_start").val('');
		$("#est_end").val('');
		return;
	}else{
		let html = '<option></option>';
		$.each(data.week, function(index, val) {
			// console.log(data.week.length);
			if (data.week.length == 1) {
				html += '<option value="'+(index+4)+'">'+val+'</option>';
			}else{
				html += '<option value="'+(index+1)+'">'+val+'</option>';
			}
		});
		$(".estimasi_diterima_week").html(html);
	}
}
function LOVSKU() {
	$('#PopUpModal').load(base_url + 'inventory/item/GetListItem/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('#list_cols').val(['sku_id', 'sku_desc']);
		$('#list_controls').val(['#sku_id', '#sku_desc']);
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");

		$('#ModalLOV').on('hidden.bs.modal', function () {
			if ($('#sku_id').val() !== '') {
				$('#sku_desc').val($('#sku_desc').val());
			}
			$("#po-form-selected").show();
			$("#po-form-selected-2").show();
			SendAjax(base_url + Modules + '/' + Controller + '/getSkuDetail/json/' + $('#sku_id').val(), null, 'POST', 'JSON', 200000000, skuDetail);
		});
	});
}
function LOVClear(sku_id = null, sku_name = null) {
	$('#' + sku_id).val(''); $('#' + sku_name).val('');
}
function LOVSKUSubclass() {
	var type_ro = $("#kategori_ro").val();

	// console.log(type_ro);
	if (type_ro == '') {
		MsgBox.Notification('Silahkan pilih type RO terlebih dahulu.', 'bottom right', 'info');
		return;
		// console.log("kosong");
	}else{
		$('#PopUpModal').load(base_url + 'inventory/item/GetListItemSubclass/', () => { // Ambil URL untuk membuka modal LOV
			$('#ModalLOV').modal('show'); // Tampilkan modal LOV
			$('#list_cols').val(['sku_id', 'sku_desc']);
			$('#list_controls').val(['#sku_id', '#sku_desc']);
			$(".modal-dialog").addClass("modal-lg modal-dialog-centered");

			$('#ModalLOV').on('hidden.bs.modal', function () {
				if ($('#sku_id').val() !== '') {
					$('#sku_desc').val($('#sku_desc').val());
				}
				$("#po-form-selected").show();
				$("#po-form-selected-2").show();
				SendAjax(base_url + Modules + '/' + Controller + '/getSkuDetail/json/' + $('#sku_id').val(), null, 'POST', 'JSON', 200000000, skuDetail);
			});
		});
	}
}
function skuDetail(data) {
	if (data.result == true) {
		// $("#sku_id").val(data.data.supp_id);
		$("#brand_id").val(data.data.brand_id);
		$("#merk").val(data.data.brand_name);
		$("#mclass_id").val(data.data.mclass_id);
		$("#mclass_name").val(data.data.mclass_name);
		$("#artikel").val(data.data.article);
		$("#size_id").val(data.data.size_id);
		$("#ukuran").val(data.data.size_name);
		$("#nama_barang").val(data.data.sku_desc);
		// $(".dk").mask("#.###.###.###.###", {reverse: true});
		$('.dk').mask("#.###.###.###.###", {reverse: true, watchDataMask: true});
		$(".dk").val(data.data.dk.hbeli).keyup();
		$(".dk").trigger('input');

		$('.lk').mask("#.###.###.###.###", {reverse: true, watchDataMask: true});
		$(".lk").val(data.data.lk.hbeli).keyup();
		$(".lk").trigger('input');

		$('.lkp').mask("#.###.###.###.###", {reverse: true, watchDataMask: true});
		$(".lkp").val(data.data.lkp.hbeli).keyup();
		$(".lkp").trigger('input');


		$("#dk_percent").val(data.data.dk.margin_price_grade);
		$("#lk_percent").val(data.data.lk.margin_price_grade);
		$("#lkplus_percent").val(data.data.lkp.margin_price_grade);
		// $("#dk_percent").val(data.data.sku_desc);
		localStorage.setItem("harga_beli",data.data.hbeli.slice(0,-3));
	}
}

function Submit() {
	if ($("#qty").val() == '' || $(".tahun").val() == '' || $(".estimasi_diterima_week").val() == '') {
		MsgBox.Notification('Lengkapi data terlebih dahulu.', 'bottom right', 'info');
	}else if( $("#qty").val() == 0 ){
		MsgBox.Notification('Quantity tidak valid.', 'bottom right', 'error');
	}else{
		console.log($("#satuan option:selected").data("name"));
		var arr_data_ro = [];
		let data_ro = {
			doc_no : $("#doc_no_val").val(),
			sku_id : $("#sku_id").val(),
			sku_desc : $("#sku_desc").val(),
			qty : $("#qty").val(),
			est_start : $("#est_start").val(),
			est_end : $("#est_end").val(),
			est_week : $(".estimasi_diterima_week").val(),
			estimasi_diterima : "<b>Minggu ke - "+$(".estimasi_diterima_week").val()+" </b>, "+$("#est_date").text(),
		}
		DataTable.row.add(data_ro).draw();

		data_ro = {
			// doc_no : $("#doc_no_val").val(),
			sku_id : $("#sku_id").val(),
			// sku_desc : $("#sku_desc").val(),s
			qty : $("#qty").val(),
			// estimasi_diterima : $("#est_date").text(),
			// est_start : $("#est_start").val(),
			// est_end : $("#est_end").val(),
			// est_week : $(".estimasi_diterima_week").val(),
			// estimasi_diterima : "Mingu ke - "+$(".estimasi_diterima_week").val()+" , "+$("#est_date").text(),
		}
		add_data_ro(data_ro);
		// let data_ro_dtl = {
		// 	doc_no : $("#doc_no_val").val(),
		// 	sku_id : $("#sku_id").val(),
		// 	uom_id : $("#satuan").val(),
		// 	qty_uom : $("#qty").val(),
		// 	qty : $("#qty").val(),
		// 	hbeli : $("#harga_beli").val().replace(/\./g, ''),
		// }
		$("#sku").empty().trigger('change');
		// $(".tahun").empty().trigger('change');
		// $(".tahun").html('<option></option> <option value="2020">2020</option> <option value="2021">2021</option> <option value="2022">2022</option> <option value="2023">2023</option> <option value="2024">2024</option> <option value="2025">2025</option>');
		// $(".estimasi_diterima_week").empty().trigger('change');
		// $("#est_date").text('');
		$("#sku").empty().trigger('change');
		$("#qty").val("");
		$('#sku_id').val(''); 
		$('#sku_desc').val('');

		// $("#est_start").val('');
		// $("#est_end").val('');
	}	
}
function makeid(length) {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function add_data_ro(arr) {
	var data_ro = JSON.parse(localStorage.getItem('data_ro')) || [];
    data_ro.push(arr);
    localStorage.setItem('data_ro', JSON.stringify(data_ro));
}
function add_data_ro_dtl(arr) {
	var data_ro = JSON.parse(localStorage.getItem('data_ro_dtl')) || [];
    data_ro.push(arr);
    localStorage.setItem('data_ro_dtl', JSON.stringify(data_ro));
}
function Simpan() {
	MsgBox.Confirm('Yakin akan Input data ini?').then(result => {
		// console.log($('input[name="kategori_po"]:checked').val());
		// console.log($('input[name="jenis_po"]:checked').val());
		let data2Send = {
			doc_no : $("#doc_no_val").val(),
			kategori_ro : $("#kategori_ro").val(),
			est_start : $("#est_start").val(),
			est_end : $("#est_end").val(),
			est_week : $(".estimasi_diterima_week").val(),
			t_ro_dtl : localStorage.getItem("data_ro")
		}
		SendAjax(base_url + Modules + '/' + Controller + '/save', data2Send, 'POST', 'JSON', 5000, successDataRO);
	}).catch(err => {
		console.log(err);
	});
}
function successDataRO(data) {
	// console.log(data);
	if (data.result == true) {
		localStorage.clear();
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		window.location.href = '#' + Modules + '/' + Controller ;
	}
}
function initPage(){
	LobiAdmin.highlightCode();
	
	
	DataTable = $('#table_detail_repeat_order').DataTable({ 
			"pageLength": 5,
			"pagingType": "simple",
			"responsive": true,
			"lengthChange": false,
			"searching": false,
			"bInfo" : false,
			"targets": 'no-sort',
			"bSort": false,
			"data": DataTablePORows,
			"columns": [
				{"data": "sku_id"},
				{"data": "sku_desc"},
				{"data": "qty"},
				{"data": "estimasi_diterima"},
	      ],
		"columnDefs": [
			{	
				"targets":0,
				"className": "text-center",
			},
			{	
				"targets": 1,
				"className": "text-center",
			},
			{	
				"targets": 2,
				"className": "text-center",
			},
			{	
				"targets": 3,
				"className": "text-center",
			},
		]
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
