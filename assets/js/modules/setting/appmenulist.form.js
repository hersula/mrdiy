(function () {
	// JS construct

	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
		.then((data) => {
			if (data.result) {
				let row = data.data;
				$('#module_id').val(row.module_id); $('#module_name').val(row.module_name);
				$('#parent_menu_id').val(row.parent_menu_id); $('#parent_menu_name').val(row.parent_menu_name);
				$('#menu_id').val(row.menu_id); $('#menu_id').prop('readonly', true);
				$('#menu_name').val(row.menu_name);
				$('#menu_desc').val(row.menu_desc);
				$('#menu_icon').val(row.menu_icon);
				$('#menu_ctl').val(row.menu_ctl);
				$('#menu_ctl_def').val(row.menu_ctl_def);
				$('#sort_id').val(row.sort_id);
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
	
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			menu_id: {
				required: true,
				nowhitespace: true
			},	
			menu_name: {
				required: true,
			},	
			sort_id: {
				required: true,
				nowhitespace: true,
				number: true
			},	
		},
		messages: {
			menu_id: {
            required: "Field ini wajib terisi",
            nowhitespace: "Spasi tidak diperbolehkan"
        	},
		  	menu_name: {
            required: "Field ini wajib terisi",
		  	},
		  	menu_ctl: {
				required: "Field ini wajib terisi",
				nowhitespace: "Spasi tidak diperbolehkan"
			},
			menu_ctl_def: {
				required: "Field ini wajib terisi",
				nowhitespace: "Spasi tidak diperbolehkan"
			},
			sort_id: {
				required: "Field ini wajib terisi",
				nowhitespace: "Spasi tidak diperbolehkan",
				number: "Hanya angka yang diperbolehkan"
	  	  	},	 
		}
	});
	
}

// START function default

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function Simpan() {
	let list_input = ['module_id', 'module_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		module_id: $('#module_id').val(),
		parent_menu_id: $('#parent_menu_id').val().trim() != '' ? $('#parent_menu_id').val() : $('#menu_id').val(),
		menu_id: $('#menu_id').val(),
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
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				ResetForm();
				data2Send = null;
				Kembali();
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

// END function default

function ResetForm() {
	$('#module_id').prop('readonly', false);
	$('#module_active').prop('checked', true); // kembalikan checklist
	$('#form_input')[0].reset(); // Kosongkan input
	clearValidation('#form_input');
}

function LOVModule() {
	$('#PopUpModal').load(base_url + 'setting/appmodules/getModuleList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['module_id', 'module_name']);
		$('#list_controls').val(['#module_id', '#module_name']);
	});
}

function LOVModuleClear() {
	$('#module_id').val('');
	$('#module_name').val('');
}

function LOVParentMenu() {
	$('#PopUpModal').load(base_url + 'setting/appmenulist/getMenuList/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['menu_id', 'menu_name']);
		$('#list_controls').val(['#parent_menu_id', '#parent_menu_name']);
	});
}

function LOVParentMenuClear() {
	$('#parent_menu_id').val('');
	$('#parent_menu_name').val('');
}