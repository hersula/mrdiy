(function () {
	// JS construct

	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/' + id, null, 'GET')
		.then((data) => {
			if (data.result) {
                ResetForm();
                action = 'edit';
                let row = data.data;
                $('#store_id').val(row.store_id); $('#store_name').val(row.store_name);
                $('#bank_id').val(row.bank_id); $('#bank_name').val(row.bank_name);
                $('#tid').val(row.tid); 
                $('#mid').val(row.mid);
                $('#jaringan').val(row.jaringan); $('#qty').val(row.qty);
                $('#status').prop('checked', row.status == 1 ? true : false);
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
	
	$("#form_input").validate({
		rules: {
			store_id: {
				required: true,
			},	
			bank_id: {
				required: true,
			},
			mid: {
				required: true
			},
		},
		messages: {
			store_id: {
            required: "Field ini wajib terisi",
        },
		  bank_id: {
            required: "Field ini wajib terisi",
        },
		  mid: {
            required: "Field ini wajib terisi",
		  },
		}
	});
	
}

// START function default

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller;
}

function Simpan() {
	let list_input = ['module_code', 'module_name'];
	if (!$('#form_input').parsley().validate() || !ValidasiInput(list_input)) {
      MsgBox.Notification('Periksa kembali inputan anda', 'Input tidak lengkap', 'warning');
     return;
   }
	
	data2Send = JSON.stringify({
		module_code: $('#module_code').val(),
		parent_menu_code: $('#parent_menu_code').val().trim() != '' ? $('#parent_menu_code').val() : $('#menu_code').val(),
		menu_code: $('#menu_code').val(),
		menu_name: $('#menu_name').val(),
		menu_desc: $('#menu_desc').val(),
		menu_icon: $('#menu_icon').val(),
		menu_ctl: $('#menu_ctl').val(),
		menu_ctl_def: $('#menu_ctl_def').val(),
		sort_id: $('#sort_id').val(),
		active: $('#active').is(':checked') ? 1 : 0
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST')
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'Data tersimpan', 'success');
				ResetForm();
				data2Send = null;
				Kembali();
			} else {
				MsgBox.Notification(data.msg.toString());
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString());
		});
	}).catch(err => {
		console.log(err);
	});
}

// END function default

function ResetForm() {
	$('#module_code').prop('readonly', false);
	$('#module_active').prop('checked', true); // kembalikan checklist
	$('#form_input')[0].reset(); // Kosongkan input
	$('#form_input').parsley().reset();
}

function LOVModule() {
	$('#PopUpModal').load(base_url + 'setting/appmodules/getModuleList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");
		$('#list_cols').val(['module_code', 'module_name']);
		$('#list_controls').val(['#module_code', '#module_name']);
	});
}

function LOVModuleClear() {
	$('#module_code').val('');
	$('#module_name').val('');
}

function LOVParentMenu() {
	$('#PopUpModal').load(base_url + 'setting/appmenulist/getMenuList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").addClass("modal-lg modal-dialog-centered");
		$('#list_cols').val(['menu_code', 'menu_name']);
		$('#list_controls').val(['#parent_menu_code', '#parent_menu_name']);
	});
}

function LOVParentMenuClear() {
	$('#parent_menu_code').val('');
	$('#parent_menu_name').val('');
}