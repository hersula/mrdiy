(function () {
	// $("#biaya_spp").autoNumeric("init", formatNumber);
	// $("#wakaf").autoNumeric("init", formatNumber);
	// function construct
	if (action == "" || action == null || typeof action == "undefined") {
		window.history.back();
		s;
	} 
	// edit action
	if (action == "edit") {
		// MsgBox("masuk sini");
		FetchWithTimeout(
			base_url + Modules + "/" + Controller + "/getData2Edit/json/" + id,
			null,
			"GET",
			5000
		)
			.then((data) => {
				if (data.result) {
					let row = data.data;
					$("#kd_site").val(row.kd_site);
                    $("#kd_type").val(row.kd_type);
                    $("#kd_category").val(row.kd_category);
					$("#kd_priority").val(row.kd_priority);
					$("#kd_progres").val(row.kd_progres);
					$("#kd_store").val(row.m_code);
					$("#nm_store").val(row.m_shortdesc);
					$("#subject").val(row.subject);
					$("#elm1").val(row.pesan);
                    $("#lampiran").val(row.lampiran);
				} else {
					MsgBox.Notification(data.msg.toString(), "bottom right", "warning");
				}
			})
			.catch((err) => {
				MsgBox.Notification(err.toString(), "bottom right", "warning");
			});
	}
})();

function initPageForm() {
    initDatePicker();
	// if (action == 'edit') getData();
	LobiAdmin.highlightCode();

	
	// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_input").validate({
		rules: {
			kd_site: {
				required: true,
			},
			kd_type: {
				required: true,
			},
		},
		messages: {
			kd_site: {
				required: "Field ini wajib terisi",
			},
			kd_type: {
				required: "Field ini wajib terisi",
			},
		},
	});
}

// START function default

function app_create() {
	window.location.href = "#" + Modules + "/" + Controller + "/create";
}

function Simpan() {

	data2Send = {
		// no_doc: $("#no_doc").val(),
        kd_site: $("#kd_site").val(),
        kd_type: $("#kd_type").val(),
		kd_category: $("#kd_category").val(),
		kd_priority: $("#kd_priority").val(),
		kd_progres: $("#kd_progres").val(),
		kd_store: $("#kd_store").val(),
		subject: $("#subject").val(),
		pesan: $("#elm1").val()
	}

	var formData = new FormData();
	// Fungsi Untuk Upload Data
	if ($('input[name=lampiran]')[0].files != 0) {
		formData.append('lampiran', $('input[name=lampiran]')[0].files[0]); 		
    }
    formData.append('data2Send', JSON.stringify(data2Send));
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
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
			// MsgBox.Notification("success");
			// window.location.href = '#' + Modules + '/' + Controller + '/save/' + data.data.id;			
			ResetForm();
		} else {
			MsgBox.Notification(data.msg.toString(), 'bottom right', 'gagal');
			Kembali();
		}
	}else{
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'danger');
	}
}

function successSupplier(data) {
	if (data.result == true) {
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		data2Send = null;
		if (action === 'create') {
			MsgBox.Notification("Successs!!", 'bottom right', 'success');
			// window.location.href = '#' + Modules + '/' + Controller + '/edit/' + data.data.id;
			ResetForm();
		} else {
			ResetForm();
		}
	}else{
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'danger');
	}
}

function app_edit(id = null) {
	FetchWithTimeout(
		base_url + Modules + "/" + Controller + "/getData2Edit/json/" + id,
		null,
		"GET",
		5000
	)
		.then((data) => {
			if (data.result) {
				// ResetForm();
				action = "edit";
				let row = data.data;
				// $('#nis').val(row.nis);
				$("#sales_date").val(row.sales_date);
				$("#pic").val(row.pic);
				$("#store").val(row.store);
                $("#voucher").val(row.voucher);
                $("#total_cash").val(row.total_cash);
                $("#ewallet").val(row.ewallet);
                $("#debit_cimb").val(row.debit_cimb);
                $("#kredit_cimb").val(row.kredit_cimb);
                $("#debit_bca").val(row.debit_bca);
                $("#kredit_bca").val(row.kredit_bca);
                $("#card_bca").val(row.card_bca);
                $("#debit_mandiri").val(row.debit_mandiri);
                $("#kredit_mandiri").val(row.kredit_mandiri);
                $("#total_sales").val(row.total_sales);
			} else {
				MsgBox.Notification(data.msg.toString(), "bottom right", "warning");
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), "bottom right", "warning");
		});
}

function app_delete(multi = 0, id = null, menu_id = "") {
	if (multi) {
		if (dataArr.length <= 0) {
			MsgBox.Notification(
				"Checklist terlebih dahulu data yang akan dihapus.",
				"bottom right",
				"info"
			);
			return;
		}
		data2Send = JSON.stringify({
			id: dataArr,
		});
		MsgBox.Confirm("Hapus menu checklist ?")
			.then((result) => {
				FetchWithTimeout(
					base_url + Modules + "/" + Controller + "/delete/",
					data2Send,
					"POST",
					5000
				)
					.then((data) => {
						if (data.result) {
							MsgBox.Notification(
								data.msg.toString(),
								"bottom right",
								"success"
							);
							app_refresh();
						} else {
							MsgBox.Notification(
								data.msg.toString(),
								"bottom right",
								"warning"
							);
						}
					})
					.catch((err) => {
						MsgBox.Notification(err.toString(), "bottom right", "warning");
					});
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		data2Send = JSON.stringify({
			id: id,
		});
		MsgBox.Confirm("Hapus menu " + menu_id + " ?")
			.then((result) => {
				FetchWithTimeout(
					base_url + Modules + "/" + Controller + "/delete/",
					data2Send,
					"POST",
					5000
				)
					.then((data) => {
						if (data.result) {
							MsgBox.Notification(
								data.msg.toString(),
								"bottom right",
								"success"
							);
							app_refresh();
						} else {
							MsgBox.Notification(
								data.msg.toString(),
								"bottom right",
								"warning"
							);
						}
					})
					.catch((err) => {
						MsgBox.Notification(err.toString(), "bottom right", "warning");
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

function app_pdf() {
	$("#form_filter").prop(
		"action",
		base_url + Modules + "/" + Controller + "/pdf/"
	);
	$("#form_filter").prop("target", "_blank");
	$("#form_filter").prop("method", "POST");
	document.getElementById("form_filter").submit();
}

function app_xls() {
	$("#form_filter").prop(
		"action",
		base_url + Modules + "/" + Controller + "/xls/"
	);
	$("#form_filter").prop("target", "_blank");
	$("#form_filter").prop("method", "POST");
	document.getElementById("form_filter").submit();
}

function app_refresh() {
	data2Send = null;
	DataTable.ajax.reload(null, true);
}
function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller;
}

function Add2Arr(CheckAll = 0, id = null) {
	if (CheckAll) {
		dataArr = [];
		let chkboxes = $("input[name='chk']");
		for (let i = 0; i < chkboxes.length; i++) {
			if ($("#CheckAll").is(":checked")) {
				$("#chk_" + i).prop("checked", true);
				dataArr.push(parseInt($("#chk_" + i).val()));
			} else {
				$("#chk_" + i).prop("checked", false);
			}
		}
	} else {
		if (dataArr.indexOf(id) > -1) {
			dataArr.splice(dataArr.indexOf(id), 1);
		} else {
			dataArr.push(id);
		}
		$("#CheckAll").prop("checked", false);
	}
}

function Filter() {
	DataTable.ajax.reload(null, true);
}

function initDatePicker() {
	$('#sales_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());
}

// END function default

function initFileUpload() {
	$("#UploadContainer").empty();
	$("#UploadContainer").prepend(`
		<div class="form-group">
			<label class="control-label">Only images</label>
			<input type="hidden" name="img_file_name" id="img_file_name" value="" class="ignore" />
			<input type="file" id="img_file" name="img_file" accept="image/*" data-show-upload="false" class="ignore" />
		</div>
	`);
	$("#img_file").fileinput({
		previewFileType: "image",
		allowedFileExtensions: ["png", "jpg", "jpeg"],
		msgInvalidFileExtension:
			'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
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

function LOVDefStore() {
	$('#PopUpModal').load(base_url + 'master/store/getStoreList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");
		$('#list_cols').val(['m_code', 'm_shortdesc']);
		$('#list_controls').val(['#kd_store', '#nm_store']);
	});
}

function Refresh() {
	data2Send = null;
	DataTableInfo.ajax.reload(null, false);
}

function ResetFormInfo() {
	action = "create";
	$("#id").val("");
	$("#pilih_info").select2("val", "");
	$("#remind_me").prop("checked", false);
	$("#form_info")[0].reset(); // Kosongkan input
	clearValidation("#form_input");
}

function ResetForm() {
	window.location.href = "#" + Modules + "/" + Controller;
}

function preview_attach_image(image_url = "") {
	$("#ModalPreviewImage").modal("show");
	$("#PreviewAttachImage").attr("src", image_url);
}
