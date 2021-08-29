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
				$('#supp_id').val(row.supp_id); $('#supp_id').prop('readonly', true);
				$('#supp_name').val(row.supp_name); $('#supp_name').prop('readonly', true);
				$('#user_id').val(row.user_id); $('#user_id').prop('readonly', true);
				$('#user_pass').val(row.user_pass);								
				$('#role_id').val(row.role_id); $('#role_name').val(row.role_name);				
				$('#status').prop('checked', row.status == 1 ? true : false);
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
	
}

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function Simpan() {
	let list_input = ['role_id', 'role_name', 'supp_id'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		user_id: $('#user_id').val(),
		user_pass: $('#user_pass').val(),
		role_id: $('#role_id').val(),
		supp_id: $('#supp_id').val(),		
		status: $('#status').is(':checked')
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?', 'Simpan data').then(result => {
		let url = action === 'create' ? base_url + Modules + '/' + Controller + '/save/' : base_url + Modules + '/' + Controller + '/update/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');				
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

function LOVSupp() {
	$('#PopUpModal').load(base_url + 'pembelian/supplier/getSupplierList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class', 'modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['supp_id', 'supp_name', 'alias']);
		$('#list_controls').val(['#supp_id', '#supp_name']);
	});
}

function LOVSuppClear() {
	$('#supp_id').val(''); $('#supp_name').val('');
}


