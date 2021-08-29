(function () {
	$("#doc_no_val").val("PO-"+makeid(5));
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
	$('#tanggal_order').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
	DataTablePORows = $.parseJSON(localStorage.getItem("data_po"));
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
    		var arr_data_po = [];
    		let data_po = {
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
    		add_data_po(data_po);
    		let data_po_dtl = {
    			doc_no : $("#doc_no_val").val(),
    			sku_id : $("#sku_id").val(),
    			uom_id : $("#satuan").val(),
    			qty_uom : $("#qty").val(),
    			qty : $("#qty").val(),
    			hbeli : $("#harga_beli").val().replace(/\./g, ''),
    		}
    		add_data_po_dtl(data_po_dtl);
    		if (localStorage.getItem('qty_total') !== null) {
    			localStorage.setItem('qty_total', parseInt(localStorage.getItem('qty_total')) + parseInt(data_po.qty));
    			localStorage.setItem('harga_beli_total', parseInt(localStorage.getItem('harga_beli_total').replace(/\./g, '')) + parseInt(data_po.harga_beli.replace(/\./g, '')));
    		}else{
    			localStorage.setItem('qty_total', data_po.qty);
    			localStorage.setItem('harga_beli_total', data_po.harga_beli.replace(/\./g, ''));
    		}
			DataTable.row.add(data_po).draw();

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
	console.log($("#satuan option:selected").data("name"));
    		var arr_data_po = [];
    		let data_po = {
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

    			dk : $("#dk").val(),
    			dk_percent : $("#dk_percent").val(),
    			lk : $("#lk").val(),
    			lk_percent : $("#lk_percent").val(),
    			lkplus : $("#lkplus").val(),
    			lkplus_percent : $("#lkplus_percent").val(),
    		}
    		add_data_po(data_po);
    		let data_po_dtl = {
    			doc_no : $("#doc_no_val").val(),
    			sku_id : $("#sku_id").val(),
    			uom_id : $("#satuan").val(),
    			qty_uom : $("#qty").val(),
    			qty : $("#qty").val(),
    			hbeli : $("#harga_beli").val().replace(/\./g, ''),
    		}
    		add_data_po_dtl(data_po_dtl);
    		if (localStorage.getItem('qty_total') !== null) {
    			localStorage.setItem('qty_total', parseInt(localStorage.getItem('qty_total')) + parseInt(data_po.qty));
    			localStorage.setItem('harga_beli_total', parseInt(localStorage.getItem('harga_beli_total').replace(/\./g, '')) + parseInt(data_po.harga_beli.replace(/\./g, '')));
    		}else{
    			localStorage.setItem('qty_total', data_po.qty);
    			localStorage.setItem('harga_beli_total', data_po.harga_beli.replace(/\./g, ''));
    		}
			DataTable.row.add(data_po).draw();

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
function makeid(length) {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function add_data_po(arr) {
	var data_po = JSON.parse(localStorage.getItem('data_po')) || [];
    data_po.push(arr);
    localStorage.setItem('data_po', JSON.stringify(data_po));
}
function add_data_po_dtl(arr) {
	var data_po = JSON.parse(localStorage.getItem('data_po_dtl')) || [];
    data_po.push(arr);
    localStorage.setItem('data_po_dtl', JSON.stringify(data_po));
}
function Simpan() {
	MsgBox.Confirm('Yakin akan Input data ini?').then(result => {
		// console.log($('input[name="kategori_po"]:checked').val());
		// console.log($('input[name="jenis_po"]:checked').val());
		let data2Send = {
			doc_no : $("#doc_no_val").val(),
			no_order : $("#no_order").val(),
			terima_dok : $("#terima_dok").val(),
			tanggal_order : $("#tanggal_order").val(),
			doc_date : $("#doc_date").val(),
			tanggal_kadaluarsa : $("#tanggal_kadaluarsa").val(),
			masa_kredit : $("#masa_kredit").val(),
			kategori_po : $('input[name="kategori_po"]:checked').val(),
			jenis_po : $('input[name="jenis_po"]:checked').val(),
			prioritas : $('#prioritas').is(':checked') ? 1 : 0,
			tanggal_kirim : $("#doc_date").val(),
			supp_id : $("#supplier_select").val(),
			store_id : $("#store").val(),
			kode_md : $("#kode_md").val(),
			total_qty : localStorage.getItem("qty_total"),
			tot_gross : 0,
			proc_disc : localStorage.getItem("discount_total"),
			value_ppn : localStorage.getItem("tax_total"),
			total_net : localStorage.getItem("harga_beli_total"),
			keterangan : $("#note").val(),
			t_po_dtl : localStorage.getItem("data_po_dtl")
		}
		SendAjax(base_url + Modules + '/' + Controller + '/save', data2Send, 'POST', 'JSON', 5000, successDataPO);
	}).catch(err => {
		console.log(err);
	});
}
function successDataPO(data) {
	// console.log(data);
	if (data.result == true) {
		localStorage.clear();
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		window.location.href = '#' + Modules + '/' + Controller ;
	}
}
function initPage(){
	LobiAdmin.highlightCode();
	
	
	DataTable = $('#table_detail_purchase_order').DataTable({ 
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
				{"data": "category_name"},
				{"data": "nama_barang"},
				{"data": "satuan_name"},
				{"data": "qty"},
				{"data": "harga_beli"},
				{"data": "dk"},
				{"data": "dk_percent"},
				{"data": "lk"},
				{"data": "lk_percent"},
				{"data": "lkplus"},
				{"data": "lkplus_percent"},
				{"data": "discount"},
	      ],
			"columnDefs": [
				{
					"targets": -6,
					"orderable": false,
					"searchable": false,
					"render": function ( data, type, row ) {
						return '<b>'+row.dk_percent+'</b>%';
					},
				},
				{
					"targets": -4,
					"orderable": false,
					"searchable": false,
					"render": function ( data, type, row ) {
						return '<b>'+row.lk_percent+'</b>%';
					},
				},
				{
					"targets": -2,
					"orderable": false,
					"searchable": false,
					"render": function ( data, type, row ) {
						return '<b>'+row.lkplus_percent+'</b>%';
					},
				},
				{
					"targets": -1,
					"orderable": false,
					"searchable": false,
					"render": function ( data, type, row ) {
						return '<b>'+row.discount+'</b>%';
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
