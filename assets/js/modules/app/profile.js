(function () {
	// function construct
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
				minlength: 6,
				nowhitespace: true
			},
			name: {
				required: true
			}
		},
	});
	
}

function Simpan() {
	if (!$('#form_input').valid()) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		id: id,
		user_id: $('#user_id').val(),
		user_pass: $('#user_pass').val(),
		name: $('#name').val()
	});
	
	MsgBox.Confirm('Yakin akan update data ini?<br/>Anda akan logout otomatis setelah update.', 'Simpan data').then(result => {
		let url = base_url + Modules + '/' + Controller + '/updateInfoUser/';
		FetchWithTimeout(url, data2Send, 'POST', 5000)
		.then((data) => {
			if (data.result) {
				MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
				data2Send = null;
				window.location.href = base_url + 'auth/Login/DoLogout';
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