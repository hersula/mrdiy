(function () {
	// Construct
})();

function initPage(){
	initOtherElements();

	$('#filter_start_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", new Date());

	// $('#filter_end_date').datepicker({
	// 	format: 'dd/mm/yyyy',
	// 	autoclose: true,
	// }).datepicker("setDate", new Date());
}

function initOtherElements() {
	$('#btnCek').on('click', function () {
		app_cek();
	});
	// $('#btnRepPdf').on('click', function () {
	// 	app_pdf();
	// });

	// $('#btnRepXls').on('click', function () {
	// 	app_xls();
	// });
}

// function app_create() { 
// 	window.location.href = '#' + Modules + '/' + Controller + '/create';
// }

function app_cek() {
	$('#form_filter').prop('action', base_url + 'app#' + Modules + '/' + Controller + '/create/');
	$('#form_filter').prop('method', 'POST');
	document.getElementById('form_filter').submit();
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

function LOVCOA() {
	$('#PopUpModal').load(base_url + 'setting/coa/get_coa_detail_lov/', () => { // Ambil URL untuk membuka modal LOV
		// $(".modal-dialog").css("max-width", "70%");
		$(".modal-dialog").addClass("modal-xl modal-dialog-centered");
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('#list_cols').val(['code', 'name']);
		$('#list_controls').val(['#coa_no', '#coa_name']);

		$('#ModalLOV').on('hidden.bs.modal', function () {
			if (!$('#coa_no').val()) return;
			$('#coa_name').val($('#coa_no').val() + ' - ' + $('#coa_name').val());
		});
	});
}

function LOVCOAClear() {
	$('#coa_no').val(null);
	$('#coa_name').val(null);
}