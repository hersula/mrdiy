(function () {
	// Construct
})();

function initPage(){
	initDatePicker();

	DataTable = $('#table_list_data').DataTable({ 
		"processing": false,
		"serverSide": true,
		"scrollX": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getList',
			"type": "POST",
		},
		"columns": [
			{"data": "today"},
			{"data": "lw"},
			{"data": "plw"},
            {"data": "mtd"},
            {"data": "lm"},
			{"data": "plm", width: 100},
            {"data": "ly", width: 100},
			{"data": "ply", width: 100}
      ],
		"columnDefs": [		
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (Priv.edit_flag == 1) {
						actions = '<a href="#' + Modules + '/' + Controller + '/edit/' + row.id + '" class="btn btn-outline-info btn-sm waves-effect waves-light"><i class="glyphicon glyphicon-pencil"></i> </a> ';
						// actions = '<a href="#" class="btn btn-outline-primary btn-sm waves-effect waves-light" onclick="app_edit(' + row.id + ');"><i class="glyphicon glyphicon-pencil"></i> </a> ';
					}
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-outline-danger btn-sm waves-effect waves-light" onclick="app_delete(0, ' + row.id + ', \'' + row.sales_date + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
					}
					return actions;
				},
			},
		],
	});
}

function initDatePicker() {
	$('#filter_start_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", _jsDateStart.format('DD/MM/YYYY'));
	
	$('#filter_end_date').datepicker({
		format: 'dd/mm/yyyy',
		autoclose: true,
	}).datepicker("setDate", _jsDateEnd.format('DD/MM/YYYY'));
}

// START function defaul

function app_cancel(no_doc = '') {
	MsgBox.Confirm('Yakin akan batalkan dokumen ' + no_doc + ' ini?', 'Batal').then(result => {
      _data2Send = new URLSearchParams({ no_doc: no_doc });
      ajaxNew(base_url + Modules + '/' + Controller + '/cancel/', _data2Send, 'POST')
      .then((data) => {
         if (data.result) {
            MsgBox.Notification(data.message.toString());
            app_refresh(false);
         } else {
            MsgBox.Notification(data.message.toString());
         }
      })
      .catch((err) => {
         MsgBox.Notification(err.toString());
      });
   }).catch(err => {
      if (err) console.log(err);
   });
}

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

/* function app_delete(id = 0, messageParam = '') {
	MsgBox.Confirm('Yakin akan hapus data ' + messageParam + ' ini?', 'Hapus data').then(result => {
      _data2Send = new URLSearchParams({ id: id });
      ajaxNew(base_url + Modules + '/' + Controller + '/delete/', _data2Send, 'POST')
      .then((data) => {
         if (data.result) {
            MsgBox.Notification(data.message.toString());
            app_refresh();
         } else {
            MsgBox.Notification(data.message.toString());
         }
      })
      .catch((err) => {
         MsgBox.Notification(err.toString());
      });
   }).catch(err => {
      if (err) console.log(err);
   });
} */

function app_refresh(refreshFromStart = true) {
	data2Send = null;
	DataTable.ajax.reload(null, refreshFromStart);
}

// END function default

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

function invoiceCetak(doc_no = '') {
   $('#doc_no').val(doc_no);
   $('#modalFilterTitleSmall').text(doc_no);
   $('#modalFilter').modal('show');
}

function cetakInvoice() {
   let url = base_url + Modules + '/' + Controller + '/' + $('#filter_jenis').val() + '/' + $('#doc_no').val();
   window.open(url, '_blank');
}