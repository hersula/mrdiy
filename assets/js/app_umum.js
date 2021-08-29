(function () {
	// JS construct
	var $ul = $("#side-menu");
	var $links = $ul.find('a');
    $links.each(function(ind, a){
        var $a = $(a);
//                If this menu item has nested menu and it does not have toggle icon yet we add toggle icon
        if ($a.next('ul').length > 0 && $a.find('.menu-item-toggle-icon').length === 0){
//                    If this menu item is parent menu item
            if ($a.closest('ul').parent().closest('ul').length === 0){
                $a.append($('<i class="has-arrow waves-effect" style="float:right;"></i>'));
            }else{
                $a.append($('<i class="has-arrow waves-effect" style="float:right;"></i>'));
            }
        }
    });
	// Tambahkan Jquery validator untuk larangan spasi/whitespace
	$.validator.addMethod("nowhitespace", function (value, element) {
		return this.optional(element) || /^\S+$/i.test(value);
	}, "Spasi tidak diperbolehkan");
	// Huruf kecil dan simbol saja
	$.validator.addMethod('lowercasesymbols', function (value) {
		return value.match(/^[a-z\[!@# $%&*\/?=_.,:;\\\]"-]+$/);
	}, "Hanya huruf kecil dan simbol diperbolehkan");
	// Waktu 24 jam hh:mm
	$.validator.addMethod("time24hhmm", function(value, element) { 
		if (!/^\d{2}:\d{2}$/.test(value)) return false;
		var parts = value.split(':');
		if (parts[0] > 23 || parts[1] > 59) return false;
		return true;
	}, "Harap masukkan waktu yang dengan benar.");
	// Waktu 24 jam hh:mm:ss
	$.validator.addMethod("time24hhmmss", function(value, element) { 
		if (!/^\d{2}:\d{2}:\d{2}$/.test(value)) return false;
		var parts = value.split(':');
		if (parts[0] > 23 || parts[1] > 59 || parts[2] > 59) return false;
		return true;
	}, "Harap masukkan waktu yang dengan benar.");
	// Tambahkan Jquery validator untuk tidak mengecek input yang memiliki class ignore
	$.validator.setDefaults({ ignore: ".ignore" });
	// Ganti default message jquery validator
	$.extend($.validator.messages, {
		lowercasesymbols: "Hanya huruf kecil dan simbol diperbolehkan",
		nowhitespace: "Spasi tidak diperbolehkan.",
		required: "Field ini wajib terisi.",
		remote: "Harap perbaiki field ini.",
		email: "Harap masukkan email dengan benar.",
		url: "Harap masukkan alamat dengan benar.",
		date: "Harap masukkan tanggal dengan benar.",
		dateISO: "Harap masukkan tanggal dengan benar (ISO).",
		number: "Harap masukkan angka yang dengan benar.",
		digits: "Harap masukkan hanya digit.",
		creditcard: "Harap masukkan nomor kartu kredit yang dengan benar.",
		equalTo: "Masukkan kembali inputan yang sama.",
		accept: "Masukkan value dengan ekstensi yang benar.",
		maxlength: jQuery.validator.format("Harap masukkan tidak lebih dari {0} karakter."),
		minlength: jQuery.validator.format("Masukkan setidaknya {0} karakter."),
		rangelength: jQuery.validator.format("Masukkan panjang karakter antara {0} dan {1}."),
		range: jQuery.validator.format("Masukkan nilai antara {0} dan {1}."),
		max: jQuery.validator.format("Masukkan nilai kurang atau sama dengan {0}."),
		min: jQuery.validator.format("Masukkan nilai lebih atau sama dengan {0}.")
	});
	// Ajax pace
	$(document).ajaxStart(function () {
		Pace.restart();
	});
})();

var MsgBox = {
	Notification: function(notifMsg = '', notifPosition = 'bottom right', notifType = 'info', notifSize = 'normal', notifDelay = 5000) {
		Swal.fire({
            title: notifMsg,
            text: "",
            type: notifType,
            confirmButtonColor: "#3eb7ba"
        })
		Lobibox.notify(notifType, {
				sound: false,
				size: notifSize, // normal, mini, large
				msg: notifMsg,
				position: notifPosition, // "top left", "top right", "bottom left", "bottom right"
				closable: true,
				delay: notifDelay,
		});
	},
	Confirm: function(MsgConfirm = '', confirmTitle = 'Konfirmasi') {
		return new Promise(function(resolve, reject) {
			Swal.fire({
			  title: confirmTitle,
			  text: MsgConfirm.toString(),
			  type: 'info',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes',
			  cancelButtonText: 'Cancel'
			}).then((result) => {
			  if (result.value) {
			    resolve(true);
			  }
			})
			// Lobibox.confirm({
			// 		baseClass: 'animated-super-fast',
			// 		title: confirmTitle,
			// 		msg: MsgConfirm.toString(),
			// 		callback: function ($this, type, ev) {
			// 				if (type === 'yes'){
			// 					resolve(true);
			// 				}else if (type === 'no'){
			// 					reject(false);
			// 				}
			// 		}
			// });
		});
	},
	Disclaimer: function(MsgConfirm = '', confirmTitle = 'Perhatian') {
		return new Promise(function(resolve, reject) {
			Swal.fire({
			  title: confirmTitle,
			  html: MsgConfirm,
			  type: 'info',
			  showCancelButton: false,
			  confirmButtonColor: '#3085d6',			 
			  confirmButtonText: 'Setuju',			  
			}).then((result) => {
			  if (result.value) {
			    resolve(true);
			  }else{
				resolve(false);
			  }
			})


			// Disclaimer: function(MsgConfirm = '', confirmTitle = 'Disclaimer') {
			// 	return new Promise(function(resolve, reject) {
			// 		Swal.fire({
			// 		  title: confirmTitle,
			// 		  html: MsgConfirm,
			// 		  type: 'info',
			// 		  showCancelButton: true,
			// 		  confirmButtonColor: '#3085d6',
			// 		  cancelButtonColor: '#d33',
			// 		  confirmButtonText: 'Setuju',
			// 		  cancelButtonText: 'Tidak Setuju'
			// 		}).then((result) => {
			// 		  if (result.value) {
			// 			resolve(true);
			// 		  }else{
			// 			resolve(false);
			// 		  }
			// 		})


			// Lobibox.confirm({
			// 		baseClass: 'animated-super-fast',
			// 		title: confirmTitle,
			// 		msg: MsgConfirm.toString(),
			// 		callback: function ($this, type, ev) {
			// 				if (type === 'yes'){
			// 					resolve(true);
			// 				}else if (type === 'no'){
			// 					reject(false);
			// 				}
			// 		}
			// });
		});
	},
};

(function () {
	StartUp();
})();

function StartUp() {
	CurrencyFormat();
}

function setCurrMenuID(MenuID) {
	CurrMenuID = MenuID;
}

function FetchWithTimeout(ReqURL, dataToSend = null, FetchMethod = 'POST', ms = 30000) {
  return new Promise((resolve, reject) => {

    const timeoutId = setTimeout(() => {
      reject(new Error("Waktu permintaan habis, cek koneksi internet anda."));
    }, ms);
		
		fetch(ReqURL, {
      method: FetchMethod,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: dataToSend,
    })
		.then(response => response.json())
		.then((res) => {
        clearTimeout(timeoutId);
        resolve(res);
    }).catch((err) => {
      clearTimeout(timeoutId);
      reject(err);
    });

  });
}
function SendAjax(SendUrl, DataSend, AjaxMethod, DataType, SetTimeout = 30000, successCallback){
	$.ajax({
		url: SendUrl,
		type: AjaxMethod,
		dataType: DataType,
		data: DataSend,
		timeout: SetTimeout,
    	success: successCallback,
    	error: function(req, errorThrown) {
            console.log(errorThrown);
        }
	});
}
function SendAjaxWithUpload(SendUrl, DataSend, AjaxMethod, DataType, SetTimeout = 30000, successCallback){
	$.ajax({
		url: SendUrl,
		type: AjaxMethod,
		dataType: DataType,
		data: DataSend,
		timeout: SetTimeout,
		cache: false,
	    processData: false,
    	contentType: false,
    	success: successCallback,
    	error: function(xhr, textStatus, errorThrown) {
            console.log('error');
        }
	})
}
function FetchWithTimeoutNew(ReqURL, dataToSend = null, FetchMethod = 'POST', ms = 30000) {
	return new Promise((resolve, reject) => {
 
	  const timeoutId = setTimeout(() => {
		 reject(new Error("Waktu permintaan habis, cek koneksi internet anda."));
	  }, ms);
		 
		 fetch(ReqURL, {
		 method: FetchMethod,
		 body: dataToSend,
	  })
		 .then(response => response.json())
		 .then((res) => {
			clearTimeout(timeoutId);
			resolve(res);
	  }).catch((err) => {
		 clearTimeout(timeoutId);
		 reject(err);
	  });
 
	});
 }

function CurrencyFormat() {
  accounting.settings = {
    currency: {
      symbol : "",   // default currency symbol is '$'
      format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
      decimal : ".",  // decimal point separator
      thousand: ",",  // thousands separator
      precision : 0   // decimal places
    },
    number: {
      precision : 0,  // default precision on numbers is 0
      thousand: ",",
      decimal : "."
    }
  }  
}

function CvtForm2JSON(frm) {
  var jsonData = {};
   
  var formData = $(frm).serializeArray();
   
  $.each(formData, function() {
    if (jsonData[this.name]) {
      if (!jsonData[this.name].push) {
           jsonData[this.name] = [jsonData[this.name] || ""];
      }
      jsonData[this.name].push(this.value || "");

    } else {
       jsonData[this.name] = this.value || "";
    }
  });

  return JSON.stringify(jsonData);
}

function ValidasiInput(ListInputByID) {
	// Jika ada input yang kosong maka kembali false
  let hasil;
  for(var i = 0; i < ListInputByID.length; i++) {
    if ($("#"+ListInputByID[i]).val() != "") {
      hasil = true;
    } else {
      hasil = false;
      break;
    }
  }
  return hasil;
}

function ValidasiInput2(ListInputByID) {
	var hasil;
	for(var i = 0; i < ListInputByID.length; i++) {
	  if ($("#"+ListInputByID[i]).val().trim() != "") {
		 hasil = true;
	  } else {
		 hasil = $("#"+ListInputByID[i]).attr("placeholder");
		 break;
	  }
	}
	return hasil;
 }

function ValidasiInputReverse(ListInputByID) {
  // Jika ada input yang tidak kosong maka kembali true
  var hasil;
  for(var i = 0; i < ListInputByID.length; i++) {
    if ($("#"+ListInputByID[i]).val().trim() != "") {
      hasil = true;
      break;
    }
  }
  return hasil;
}

function isObjectEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

function clearValidation(element = '') {
	$(element).validate().resetForm(); // Clear jquery validation
	// Start remove class validation
	$('.form-group').each(function () { $(this).removeClass('has-success'); });
	$('.form-group').each(function () { $(this).removeClass('has-error'); });
	$('.form-group').each(function () { $(this).removeClass('has-feedback'); });
	$('.help-block').each(function () { $(this).remove(); });
	$('.form-control-feedback').each(function () { $(this).remove(); });
	// End remove class validation
}
function confirmBrand(confirm, brand_id, supp_id){
	SendAjax(base_url + 'pembelian/supplier/confirmBrand/json/' + confirm + '/' + brand_id + '/' + supp_id, null, 'GET', 'JSON', 5000, successConfirmBrand);
}
function successConfirmBrand(data) {
	if (data.result == true) {
		MsgBox.Notification(data.msg.toString(), 'bottom right', 'success');
		location.reload();
	}
}
const formatNumber = {
	aSep: ',', 
	aDec: '.',
	lZero: false,
	aPad: false,
	mDec: '0',
	vMin: '0', 
	vMax: '999999999'
};

const formatDecimalNumber = {
	aSep: ',', 
	aDec: '.',
	lZero: false,
	aPad: false,
	mDec: '2',
	vMin: '0', 
	vMax: '999999999'
};

function kFormatter(num) {
	return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

const xah_format_number = ((n, m = 1) => {
	/* [
	format number with metric prefix, example: 1.2 k
	n is integer. The number to be converted
	m is integer. The number of decimal places to show. Default to 1.
	returns a string, with possibly one of k M G T ... suffix.
	
	http://xahlee.info/js/javascript_format_number.html
	version 2019-04-15
	 ] */
	const prefix = ["", " k", " M", " G", " T", " P", " E", " Z", " Y", " * 10^27", " * 10^30", " * 10^33"]; // should be enough. Number.MAX_VALUE is about 10^308
	let ii = 0;
	while ((n = n / 1000) >= 1) { ii++; }
	return (n * 1000).toFixed(m) + prefix[ii];
});
function getWeekNumber(d) {
  d = new Date(+d);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  var yearStart = new Date(d.getFullYear(), 0, 1);
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  return [d.getFullYear(), weekNo];
}

function weeksInYear(year) {
  var month = 11,
    day = 31,
    week;
  do {
    d = new Date(year, month, day--);
    week = getWeekNumber(d)[1];
  } while (week == 1);

  return week;
}
function initSelect2Ajax(element, placeholder = "", url, valueArr = ['id', 'text'], minimumInputLength = 3, multiple = false) {
	$(element).select2({
		width:'100%',
		placeholder: placeholder,
		minimumInputLength: minimumInputLength,
		maximumSelectionLength: 1,
		multiple : multiple,
		allowClear: true,
		ajax: { 
			url: url,
			type: "POST",
			dataType: 'json',
			delay: 500,
			data: function (term, page) {
				return JSON.stringify({
					keyword: term
				});
			},
			processResults: function (data, page) { // parse the results into the format expected by Select2.
				return { 
					results: $.map(data, function (item) {
						console.log(data);
						return {
							id: item[valueArr[0]],
							text: item[valueArr[1]]
						}
				  }) 
				};
			},
			cache: true
		},
	});
}