

var v_desm_out_going_receiver_change_callback = null;
var v_desm_out_going_receiver_change_param;



function initDesmOutGoingReceiverChangePopUp(param , callback) {
	v_desm_out_going_receiver_change_callback = callback;
    v_desm_out_going_receiver_change_param = param; 
    
    initDesmOutGoingReceiverChangePopUpCode();    
}

function initDesmOutGoingReceiverChangePopUpCode() {	
	
	initDesmOutGoingReceiverChangePopUpControls();
}


function initDesmOutGoingReceiverChangePopUpControls() {
	
	$('#dlgDesmOutGoingReceiverChange').on('shown.bs.modal', function () {
		$('#dlgDesmOutGoingReceiverChange').click();
	});
	
	$('#dlgDesmOutGoingReceiverChange').on('hidden.bs.modal', function () {
	  	closeDesmOutGoingReceiverChangePopUp();
	});	
	
	$('#dlgDesmOutGoingReceiverChange').modal('show');
	
	$('#btnDlglgDesmOutGoingReceiverChangeEdit').click(function () { btnDlglgDesmOutGoingReceiverChangeEditClick(); return false; });
}

function closeDesmOutGoingReceiverChangePopUp() {
	
}

function btnDlglgDesmOutGoingReceiverChangeEditClick() {
	
	var chkValidation = checkRequiredField("divModalBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if(v_desm_out_going_receiver_change_callback) {
		var param = {RECEIVER_NAME : $('#txtDlgDesmOutGoingReceiverChange').val()};
		v_desm_out_going_receiver_change_callback("edit-item", param);
	}
	
	$('#dlgDesmOutGoingReceiverChange').modal('hide');		
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


