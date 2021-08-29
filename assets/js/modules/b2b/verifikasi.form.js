(function () {
	// function construct
	if (action == '' || action == null || typeof action == 'undefined') {
		window.history.back();s
	}
	// edit action
	if (action == 'edit') {
		FetchWithTimeout(base_url + Modules + '/' + Controller + '/getData2Edit/json/' + id, null, 'GET', 5000)
		.then((data) => {
			if (data.result) {
				let row = data.data;
				$('#type_usaha').select2('data', {id: row.typeusaha_id, text: row.typeusaha_name});
				$('#supp_id').val(row.supp_id); 
				$('#supp_name').val(row.supp_name);
				$('#wil_id').val(row.wil_id); $('#wil_name').val(row.wil_name);
				$('#alias').val(row.alias);	
				$('#holding_id').val(row.holding_id);
				$('#holding_name').val(row.holding_name);
				$('#contact_person').val(row.contact_person);			
				$('#no_hp').val(row.no_hp);
				$('#no_fax').val(row.no_fax);
				$('#email').val(row.email); $('#email').val(row.email);
				$('#password').val(row.password);					
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
	$('.select2-usaha').select2();

		// Jquery validation
	initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_input").validate({
		rules: {

            wil_name: {
				required: true,
			},
			
			supp_name: {
				required: true,
			},
			
			alias: {
				required: true,
			},
			contact_person: {
				required: true,
            },
            
            no_hp: {
				required: true,
			},
			
			
		},
		messages: {

            wil_name: {
                required: "Field ini wajib terisi",
            },
			
			supp_name: {
            required: "Field ini wajib terisi",
        },
			alias: {
            required: "Field ini wajib terisi",
          },
          
          contact_person: {
            required: "Field ini wajib terisi",
          },
          
          no_hp: {
            required: "Field ini wajib terisi",
		  },
		  
		}
	});
	
}


function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function Simpan() {
	let list_input = ['wil_id', 'supp_name', 'alias', 'no_hp', 'contact_person'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		type_usaha: $('#type_usaha').val(),
		supp_id: $('#supp_id').val(),
		supp_name: $('#supp_name').val(),
		wil_id: $('#wil_id').val(),
		wil_name: $('#wil_name').val(),		
		alias: $('#alias').val(),
		holding_id: $('#holding_id').val(),	
		contact_person: $('#contact_person').val(),		
		no_hp: $('#no_hp').val(),		
		email: $('#email').val(),
		password: $('#password').val()				
	});
	
	MsgBox.Confirm('Yakin akan simpan data ini?').then(result => {
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

function LOVWilayahSupp() {
	$('#PopUpModal').load(base_url + 'pembelian/supplierwilayah/getWilayahsupplierList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['wil_id', 'wil_name']);
		$('#list_controls').val(['#wil_id', '#wil_name']);
	});
}

function LOVWilayahSuppClear() {
	$('#wil_id').val(''); $('#wil_name').val('');
}


function LOVSupp() {
	$('#PopUpModal').load(base_url + 'b2b/verifikasi/getSupplierList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class','modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['supp_id', 'supp_name']);
		$('#list_controls').val(['#supp_id']);
	});
}

function LOVSuppClear() {
	$('#supp_id').val(''); 
}


function LOVHolding() {
	$('#PopUpModal').load(base_url + 'pembelian/supplier/getSupplierList/home/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$('.modal-dialog').attr('class', 'modal-dialog modal-lg'); // Ukuran modal LOV
		$('#list_cols').val(['supp_id', 'supp_name', 'alias']);
		$('#list_controls').val(['#holding_id', '#holding_name']);
	});
}

function LOVHoldingClear() {
	$('#holding_id').val(''); $('#holding_name').val('');
}


function Refresh() {
	data2Send = null;
	DataTableInfo.ajax.reload(null,false);
}


