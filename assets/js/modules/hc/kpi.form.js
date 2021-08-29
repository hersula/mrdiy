
(function () {
	var btnFinish = $('<button id="finish" class="btn btn-labeled btn-pretty btn-success"></button>').text('Simpan')
                                     .addClass('btn btn-labeled btn-pretty btn-success')
                                     .on('click', function(){ Simpan(); });
    $("#smartwizard").on("showStep", function(e, anchorObject, stepIndex, stepDirection) {
	   // alert("You are on step "+stepIndex+" now");
	   if (stepIndex == e.isTrigger) {
		   	$("#finish").removeAttr('style');
	   }else{
	   		$("#finish").css('display', 'none');
	   }
	});
	$('#smartwizard').smartWizard({
		  selected: 0, // Initial selected step, 0 = first step
		  theme: 'dots', // theme for the wizard, related css need to include for other than default theme
		  justified: true, // Nav menu justification. true/false
		  darkMode:false, // Enable/disable Dark Mode if the theme supports. true/false
		  autoAdjustHeight: true, // Automatically adjust content height
		  cycleSteps: false, // Allows to cycle the navigation of steps
		  backButtonSupport: true, // Enable the back button support
		  enableURLhash: false, // Enable selection of the step based on url hash
		  transition: {
		      animation: 'none', // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing
		      speed: '400', // Transion animation speed
		      easing:'' // Transition animation easing. Not supported without a jQuery easing plugin
		  },
		  toolbarSettings: {
		      toolbarPosition: 'bottom', // none, top, bottom, both
		      toolbarButtonPosition: 'right', // left, right, center
		      showNextButton: true, // show/hide a Next button
		      showPreviousButton: true, // show/hide a Previous button
		      toolbarExtraButtons: [btnFinish] // Extra buttons to show on toolbar, Arrayay of jQuery input/buttons elements
		  },
		  anchorSettings: {
		      anchorClickable: true, // Enable/Disable anchor navigation
		      enableAllAnchors: false, // Activates all anchors clickable all times
		      markDoneStep: true, // Add done state on navigation
		      markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
		      removeDoneStepOnNavigateBack: false, // While navigate back done step after active step will be cleared
		      enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
		  },
		  keyboardSettings: {
		      keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
		      keyLeft: [37], // Left key code
		      keyRight: [39] // Right key code
		  },
		  lang: { // Language variables for button
		      next: 'Next',
		      previous: 'Previous'
		  },
		  disabledSteps: [], // Array Steps disabled
		  errorSteps: [], // Highlight step with errors
		  hiddenSteps: [] // Hidden steps
	});
	// function construct
	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
		.then((data) => {
			if (data.result) {
				let formData = new FormData($('#demo-form1')[0]);
				formData.append('periode', $('#periode').val());
				formData.append('employee_id', $('#employee_id').val());
				formData.append('employee_name', $('#employee_name').val());
				formData.append('jabatan_name', $('#jabatan_name').val());
				formData.append('edu_name', $('#edu_name').val());
				formData.append('divisi_name', $('#divisi_name').val());
				formData.append('join_date', $('#join_date').val());
				formData.append('tanggapan_penilai', $('#tanggapan_penilai').val());
				formData.append('tanggapan_atasan_penilai', $('#tanggapan_atasan_penilai').val());
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
	$('#periode').datepicker({
	   format: 'mm-yyyy',
	   viewMode: "months", 
	minViewMode: "months",
		autoclose: true,
	});

	// Jquery validation
	initValidationDefaults();

	// Inisial validasi untuk inputan store
	$("#demo-form1").each(function (index, form) {
		$(this).validate({
			rules: {
				periode: {
					required: true,
				},
				employee_id: {
					required: true,
				},
				employee_name: {
					required: true,
				},
				tanggapan_penilai: {
					required: true,
				},
			},
		});
  });
	// $('#demo-wizard1').smartWizard({
	// 	// onTabClick: function(li, ul, ind, ind2){
	// 	// 	var $newli = ul.find('li').eq(ind2);
	// 	// 	if ($newli.hasClass('complete')){
	// 	// 		return true;
	// 	// 	}else{
	// 	// 		return false;
	// 	// 	}
	// 	// },
	// 	// onNext: function(li, ul, index){
	// 	// 	var $wizard = ul.closest('.wizard');
	// 	// 	var $pane = $wizard.find('.tab-pane').eq(index - 1);
	// 	// 	var $fields = $pane.find('[name]');
	// 	// 	var $form = $('#demo-form1');
	// 	// 	var validator = $form.validate();
	// 	// 	validator.form();
	// 	// 	var ISVALID = true;
	// 	// 	$fields.each(function(index, field){
	// 	// 		var fieldSelector = '#demo-form1 [name="'+field.name+'"]';
	// 	// 		validator.element(fieldSelector);
	// 	// 		if ( ! validator.valid(fieldSelector)){
	// 	// 			ISVALID = false;
	// 	// 		}
	// 	// 	});
	// 	// 	if (ISVALID){
	// 	// 		li.addClass('complete');
	// 	// 	}
	// 	// 	return ISVALID;
	// 	// },
	// 	selected: 0,
 //        theme: 'default',
 //        transitionEffect:'fade',
 //        showStepURLhash: true,
 //        toolbarSettings: {toolbarPosition: 'both',
 //                          toolbarButtonPosition: 'end',
 //                          toolbarExtraButtons: [btnFinish, btnCancel]
 //                        }

	// });

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
		//"ajax": {
		//	"url": base_url + Modules + '/' + Controller + '/getListKpiInfo/',
		//	"type": "POST",
		//	"data": function ( d ) {
		//		d.employee_id = $('#employee_id').val();
		//	},
		//},
		"columns": [
			{"data": "periode"},
			{"data": "employee_id"},
			{"data": "employee_name"},
			{"data": "divisi_code"},
			{"data": "join_date"},
			{"data": "total_nilai"},
            {"data": "code_nilai"},
			{"data": "penilai"},
			{"data": "atasan_penilai"},	 
			{"data": "action", "width": 60, "className": "text-right"}
      ],
		"columnDefs": [
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
	if (!$('#demo-form1').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}

	let formData = new FormData($('#demo-form1')[0]);
	formData.append('periode', $('#periode').val());
	formData.append('employee_id', $('#employee_id').val());
	formData.append('employee_name', $('#employee_name').val());
	formData.append('jabatan_name', $('#jabatan_name').val());
	formData.append('edu_name', $('#edu_name').val());
	formData.append('divisi_name', $('#divisi_name').val());
	formData.append('join_date', $('#join_date').val());
	formData.append('tanggapan_penilai', $('#tanggapan_penilai').val());
	formData.append('tanggapan_atasan_penilai', $('#tanggapan_atasan_penilai').val());
	
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
			action = 'edit';
			let formData = new FormData($('#demo-form1')[0]);
			formData.append('periode', $('#periode').val());
			formData.append('employee_id', $('#employee_id').val());
			formData.append('employee_name', $('#employee_name').val());
			formData.append('jabatan_name', $('#jabatan_name').val());
			formData.append('edu_name', $('#edu_name').val());
			formData.append('divisi_name', $('#divisi_name').val());
			formData.append('join_date', $('#join_date').val());
			formData.append('tanggapan_penilai', $('#tanggapan_penilai').val());
			formData.append('tanggapan_atasan_penilai', $('#tanggapan_atasan_penilai').val());
			ResetFormInfo();
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
	//action = 'create';
	//$("#id").val("");
	//$("#pilih_info").select2("val", "");
	//$('#remind_me').prop('checked', false);
	//$('#form_info')[0].reset(); // Kosongkan input
	//clearValidation('#form_input');
	window.location.href = '#' + Modules + '/' + Controller ;
}

function preview_attach_image(image_url = '') {
	$('#ModalPreviewImage').modal('show');
	$("#PreviewAttachImage").attr("src", image_url);
}

function LOVKaryawan() {
	$('#PopUpModal').load(base_url + 'hc/karyawan/getBawahanList/', () => {
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