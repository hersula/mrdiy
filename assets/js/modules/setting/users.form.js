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
				$('#user_id').val(row.user_id); $('#user_id').prop('readonly', true);
				$('#user_pass').val('');
				$('#name').val(row.name);
				$('#role_id').val(row.role_id); $('#role_name').val(row.role_name);
				$('#active').prop('checked', row.active == 1 ? true : false);
			} else {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
			}
		})
		.catch((err) => {
			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
		});
	}
	
	/*// Autocomplete untuk store
	$('#store_name').autoComplete({
		minChars: 2,
		delay: 100,
		source: function (query, response) {
			$.ajax({
				url: base_url + Modules + '/' + Controller + '/getStoreListAutoComplete/',
				dataType: "json",
				data: JSON.stringify({keyword: query}), 
				type: "POST",
				success: function (data) {
					response(data);
				}
			});
		},
		renderItem: function (item, search){
			//console.log('renderitem', item);
			search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); //unused
			var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi"); //unused
			return '<div class="autocomplete-suggestion" data-store-id="' + item.store_id + '" data-store-name="' + item.store_name + '">' + item.store_id + ' - ' + item.store_name + '</div>';
		},
		onSelect: function(e, term, item){
			//console.log('onselect', item);
			$('#store_id').val(item.data('store-id'));
			$('#store_name').val(item.data('store-name'));
		}
	});*/
	

	
})();

function initPageForm(){
	LobiAdmin.highlightCode();
	// Jquery validation
	initValidationDefaults();
	$("#form_input").validate({
		rules: {
			user_id: {
				required: true,
				minlength: 4,
				nowhitespace: true
			},	
			user_pass: {
				required: action === 'create' ? true : false,
				minlength: 6,
				nowhitespace: true
			},
			name: {
				required: true
			}
		},
		messages: {
			user_id: {
            required: "Field ini wajib terisi",
            minlength: "User ID minimum 4 karakter",
				nowhitespace: "Spasi tidak diperbolehkan"
        },
		  user_pass: {
            required: "Field ini wajib terisi",
            minlength: "Password minimum 6 karakter"
        },
		  name: {
            required: "Field ini wajib terisi",
        },
		}
	});
	
	// DataTable untuk akses cabang
	DataTableStore = $('#table_list_data').DataTable({ 
		"pageLength": 10,
		"numbers_length": 4,
		"processing": true,
		"serverSide": true,
		"responsive": true,
		"ajax": {
			"url": base_url + Modules + '/' + Controller + '/getListStore/' + id,
			"type": "POST",
		},
		"columns": [
			{"data": "store_id", "width": 100},
			{"data": "store_name", "width": 150},
			{"data": "status", "width": 40, "className": "text-center"},
			{"data": "action", "width": 40, "className": "text-center"}
      ],
		"columnDefs": [
			{
				"targets": 2,
				"orderable": true,
				"searchable": false,
				"render": function ( data, type, row ) {
					if (row.status == 1){
						return '<span class="label label-success text-center">Aktif</span>';
					} else {
						return '<span class="label label-danger text-center">Tidak Aktif</span>';
					}
				},
			},
			{
				"targets": -1,
				"orderable": false,
				"searchable": false,
				"render": function ( data, type, row ) {
					let actions = '';
					if (Priv.delete_flag == 1) {
						actions = actions + '<a href="#" class="btn btn-pretty btn-warning btn-xs" onclick="delete_store(' + row.id + ', \'' + row.store_name + '\');"><i class="glyphicon glyphicon-trash"></i> </a>';
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
	let list_input = ['role_id', 'role_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		user_id: $('#user_id').val(),
		user_pass: $('#user_pass').val(),
		name: $('#name').val(),
		// name: $('#employee_name').val(),
		role_id: $('#role_id').val(),
		// def_store_id: $('#def_store_id').val(),
		// employee_id: $('#employee_id').val(),
		active: $('#active').is(':checked')
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				$('#active').prop('checked', false);
				$('#form_input')[0].reset();
				data2Send = null;
				if (action === 'create') {
					window.location.href = '#' + Modules + '/' + Controller + '/edit/' + data.data.id;
				} else {
					Kembali();
				}
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

// function LOVKaryawan() {
// 	$('#PopUpModal').load(base_url + 'hc/karyawan/getKaryawanAll/', () => {
// 		$('#ModalLOV').modal('show');
// 		$(".modal-dialog").css({width: "800px"});
// 		$('#list_cols').val(['employee_id','employee_name','jabatan_name','email','divisi_name','join_date']);
// 		$('#list_controls').val(['#employee_id','#employee_name','#jabatan_name','#user_id','#divisi_name','#join_date']);
// 	})
// }

// function LOVKaryawanClear() {
// 	$('#employe_id').val(''); $('#employee_name').val('');
// 	$('#jabatan_name').val(''); $('#user_id').val('');
// 	$('#divisi_name').val(''); $('#join_date').val('');
// }

function LOVRole() {
	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getRole/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
		$('#list_cols').val(['role_id', 'role_name']);
		$('#list_controls').val(['#role_id', '#role_name']);
	});
}

function LOVRoleClear() {
	$('#role_id').val(''); $('#role_name').val('');
}

// function LOVDefStore() {
// 	$('#PopUpModal').load(base_url + Modules + '/' + Controller + '/getStore/', () => { // Ambil URL untuk membuka modal LOV
// 		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
// 		$(".modal-dialog").css({width: "600px"}); // Lebar modal LOV
// 		$('#list_cols').val(['store_id', 'store_name']);
// 		$('#list_controls').val(['#def_store_id', '#def_store_name']);
// 	});
// }

// function LOVDefStoreClear() {
// 	$('#def_store_id').val(''); $('#def_store_name').val('');
// }

// function refresh_store() {
// 	DataTableStore.ajax.reload(null,true);
// }

// function add_store() {
// 	let list_input = ['store_id', 'store_name'];
// 	if (!ValidasiInput(list_input)) {
// 		MsgBox.Notification('Pilih toko terlebih dahulu.', 'bottom right', 'warning', 'mini');
// 		return;
// 	}
	
// 	data2Send = JSON.stringify({
// 		store_id: $('#store_id').val(),
// 		user_id: $('#user_id').val()
// 	});
	
// 	MsgBox.Confirm('Tambahkan toko ini?', 'Tambah akses toko').then(result => {
// 		let url = base_url + Modules + '/' + Controller + '/addstore/';
// 		FetchWithTimeout(url, data2Send, 'POST', 5000)
// 		.then((data) => {
// 			if (data.result) {
// 				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
// 				$('#store_id').val(''); $('#store_name').val('');
// 				data2Send = null;
// 				refresh_store();
// 			} else {
// 				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
// 			}
// 		})
// 		.catch((err) => {
// 			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
// 		});
// 	}).catch(err => {
// 		console.log(err);
// 	});
// }

// function delete_store(id = null, param = '') {
// 	data2Send = JSON.stringify({
// 		id: id
// 	});
// 	MsgBox.Confirm('Hapus akses toko ' + param + ' ?').then(result => {
// 		FetchWithTimeout(base_url + Modules + '/' + Controller + '/deletestore/', data2Send, 'POST', 5000)
// 		.then((data) => {
// 			if (data.result) {
// 				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
// 				data2Send = null;
// 				refresh_store();
// 			} else {
// 				MsgBox.Notification(data.msg.toString(), 'bottom right', 'warning');
// 			}
// 		})
// 		.catch((err) => {
// 			MsgBox.Notification(err.toString(), 'bottom right', 'warning');
// 		});
// 	}).catch(err => {
// 		console.log(err);
// 	});
// }