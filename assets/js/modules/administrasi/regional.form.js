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
				$('#reg_id').val(row.reg_id); $('#reg_id').prop('readonly', true);
				$('#reg_name').val(row.reg_name);
				$('#pic_id').val(row.pic_id);
				$('#pic_name').val(row.employee_name);
				$('#active').prop('checked', row.status == 1 ? true : false);
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
			reg_id: {
				required: true,
				nowhitespace: true
			},	
			reg_name: {
				required: true
			}
		},
		messages: {
			reg_id: {
            required: "Field ini wajib terisi",
				nowhitespace: "Spasi tidak diperbolehkan"
        },
		  reg_name: {
            required: "Field ini wajib terisi"
        },
		}
	});
}

function Kembali() {
	window.location.href = '#' + Modules + '/' + Controller ;
}

function Simpan() {
	let list_input = ['pic_id', 'pic_name'];
	if (!$('#form_input').valid() || !ValidasiInput(list_input)) {
		MsgBox.Notification('Periksa inputan anda.', 'bottom right', 'warning', 'mini');
		return;
	}
	
	data2Send = JSON.stringify({
		reg_id: $('#reg_id').val(),
		reg_name: $('#reg_name').val(),
		pic_id: $('#pic_id').val(),
		active: $('#active').is(':checked') ? 1 : 0
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

function LOVPIC() {
	$('#PopUpModal').load(base_url + 'hc/karyawan/getKaryawanAll/', () => { // Ambil URL untuk membuka modal LOV
		$('#ModalLOV').modal('show'); // Tampilkan modal LOV
		$(".modal-dialog").css({width: "800px"}); // Lebar modal LOV
		$('#list_cols').val(['employee_id', 'employee_name']);
		$('#list_controls').val(['#pic_id', '#pic_name']);
	});
}

function LOVPICClear() {
	$('#pic_id').val(''); $('#pic_name').val('');
}