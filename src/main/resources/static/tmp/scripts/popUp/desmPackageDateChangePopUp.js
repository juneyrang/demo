

var v_desm_package_date_change_callback = null;
var v_desm_package_date_change_param;



function initDesmPackageDateChangePopUp(param , callback) {
	v_desm_package_date_change_callback = callback;
    v_desm_package_date_change_param = param;

    initDesmPackageDateChangePopUpCode();
}

function initDesmPackageDateChangePopUpCode() {

	initDesmPackageDateChangePopUpControls();
}


function initDesmPackageDateChangePopUpControls() {

	$('#dlgDesmPackageDateChange').on('shown.bs.modal', function () {
		$('#dlgDesmPackageDateChange').click();
	});

	$('#dlgDesmPackageDateChange').on('hidden.bs.modal', function () {
	  	closeDesmPackageDateChangePopUp();
	})

	$('#dlgDesmPackageDateChange').modal('show');

	initDesmPackageDateChangePopUpDatePicker("txtDlgDesmPackageDateChangeDate");

	$('#txtDlgDesmPackageDateChangeDate').val(moment().format("YYYY/MM/DD"));

	$('#btnDlglgDesmPackageDateChangeEdit').click(function () { btnDlglgDesmPackageDateChangeEditClick(); return false; });
	$('#btnDlglgDesmPackageDateChangeReset').click(function () { btnDlglgDesmPackageDateChangeResetClick(); return false; });

}

function closeDesmPackageDateChangePopUp() {

}

function initDesmPackageDateChangePopUpDatePicker(id) {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	var eid = "#" + id;
	$(eid).datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}


function btnDlglgDesmPackageDateChangeEditClick() {

	var chkValidation = checkRequiredField("divModalBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	if(v_desm_package_date_change_callback) {
		var param = {RECEIPT_DATE : $('#txtDlgDesmPackageDateChangeDate').val()};
		v_desm_package_date_change_callback("edit-item", param);
	}

	$('#dlgDesmPackageDateChange').modal('hide');
}

function btnDlglgDesmPackageDateChangeResetClick() {

	var chkValidation = checkRequiredField("divModalBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	if(v_desm_package_date_change_callback) {
		var param = {RECEIPT_DATE : null};
		v_desm_package_date_change_callback("edit-item", param);
	}

	$('#dlgDesmPackageDateChange').modal('hide');
}

function checkRequiredField(areaID) {
	var chkValidation = true;

	$("#" + areaID + " input:visible, #" + areaID + " select:visible, #" + areaID + " textarea:visible").each(function () {
		if ($(this).hasClass("required") && $(this).attr("type") == "file") {
			if (getAttachedFilesCount(($(this).attr("id"))) == 0) {
				$(".file-input").addClass("validation-error");
				chkValidation = false;
			} else {
				$(".file-input").removeClass("validation-error");
				$(this).removeClass("validation-error");
			}
		}
		else if ($(this).hasClass("required") && ($(this).val() == null || $(this).val().IsNullOrEmpty())) {
			$(this).addClass("validation-error");
			chkValidation = false;
		} else {
			$(this).removeClass("validation-error");
		}
	});

	return chkValidation;
}


