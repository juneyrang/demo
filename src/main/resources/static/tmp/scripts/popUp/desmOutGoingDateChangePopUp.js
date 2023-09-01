

var v_desm_out_going_date_change_callback = null;
var v_desm_out_going_date_change_param;



function initDesmOutGoingDateChangePopUp(param , callback) {
	v_desm_out_going_date_change_callback = callback;
    v_desm_out_going_date_change_param = param; 
    
    initDesmOutGoingDateChangePopUpCode();    
}

function initDesmOutGoingDateChangePopUpCode() {	
	
	initDesmOutGoingDateChangePopUpControls();
}


function initDesmOutGoingDateChangePopUpControls() {
	
	$('#dlgDesmOutGoingDateChange').on('shown.bs.modal', function () {
		$('#dlgDesmOutGoingDateChange').click();
	});
	
	$('#dlgDesmOutGoingDateChange').on('hidden.bs.modal', function () {
	  	closeDesmOutGoingDateChangePopUp();
	})	
	
	$('#dlgDesmOutGoingDateChange').modal('show');
	
	initDesmOutGoingDateChangePopUpDatePicker("txtDlgDesmOutGoingDateChangeDate");	
	
	$('#txtDlgDesmOutGoingDateChangeDate').val(toDay);	
	
	$('#btnDlglgDesmOutGoingDateChangeEdit').click(function () { btnDlglgDesmOutGoingDateChangeEditClick(); return false; });
		
}

function closeDesmOutGoingDateChangePopUp() {
	
}

function initDesmOutGoingDateChangePopUpDatePicker(id) {
	
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


function btnDlglgDesmOutGoingDateChangeEditClick() {
	
	var chkValidation = checkRequiredField("divModalBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if(v_desm_out_going_date_change_callback) {
		var param = {HANDOVER_DATE : $('#txtDlgDesmOutGoingDateChangeDate').val()};
		v_desm_out_going_date_change_callback("edit-item", param);
	}
	
	$('#dlgDesmOutGoingDateChange').modal('hide');		
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


