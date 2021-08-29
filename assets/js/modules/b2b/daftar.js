(function () {
	// function construct
})();

function initPageForm() {

	$('.select2-usaha').select2();

	// Jquery validation
	// initValidationDefaults();
	// Inisial validasi untuk inputan store
	$("#form_input").validate({
		rules: {

			supp_name: {
				required: true,
			},

			alias: {
				required: true,
			},
			email: {
				required: true,
			},


		},
		messages: {
			supp_name: {
				required: "Field ini wajib terisi",
			},
			alias: {
				required: "Field ini wajib terisi",
			},
			email: {
				required: "Field ini wajib terisi",
			},

		}
	});

}

function Simpan() {
	let list_input = ['supp_name', 'alias', 'email'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}

	let data2Send = JSON.stringify({
		type_usaha: $('#type_usaha').val(),
		supp_name: $('#supp_name').val(),
		alias: $('#alias').val(),
		no_hp: $('#no_hp').val(),
		contact_person: $('#contact_person').val(),
		email: $('#email').val(),		
		password: $('#password').val(),
	});

	MsgBox.Confirm('Yakin akan didaftarkan data ini?').then(result => {
		let url = base_url + 'b2b/daftar/save/';
		FetchWithTimeout(url, data2Send, 'POST')
			.then((data) => {
				if (data.result) {
					MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
					data2Send = null;
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



