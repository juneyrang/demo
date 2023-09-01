

var v_desm_out_going_report_callback = null;
var v_desm_out_going_report_param;



function initDesmOutGoingReportPopUp(param , callback) {
	v_desm_out_going_report_callback = callback;
    v_desm_out_going_report_param = param; 
    
    initDesmOutGoingReportPopUpCode();    
}

function initDesmOutGoingReportPopUpCode() {	
	
	initDesmOutGoingReportPopUpControls();
}


function initDesmOutGoingReportPopUpControls() {
	
	$('#dlgDesmOutGoingReport').on('shown.bs.modal', function () {
		$('#dlgDesmOutGoingReport').click();
	});
	
	$('#dlgDesmOutGoingReport').on('hidden.bs.modal', function () {
	  	closeDesmOutGoingReportPopUp();
	})	
	
	$('#dlgDesmOutGoingReport').modal('show');
	
	initDesmOutGoingPopUpDatePicker("txtDlgDesmOutGoingReportStartHandoverDate");
	initDesmOutGoingPopUpDatePicker("txtDlgDesmOutGoingReportEndHandoverDate");
	
	$('#txtDlgDesmOutGoingReportStartHandoverDate').val(v_desm_out_going_report_param.START_HANDOVER_DATE);
	$('#txtDlgDesmOutGoingReportEndHandoverDate').val(v_desm_out_going_report_param.END_HANDOVER_DATE);
	
	if(v_desm_out_going_report_param.START_HANDOVER_DATE == null || v_desm_out_going_report_param.START_HANDOVER_DATE == "") {
		$('#txtDlgDesmOutGoingReportStartHandoverDate').val(toDay);
	}

	if(v_desm_out_going_report_param.END_HANDOVER_DATE == null || v_desm_out_going_report_param.END_HANDOVER_DATE == "") {
		$('#txtDlgDesmOutGoingReportEndHandoverDate').val(toDay);
	}	
	
	
	$('#btnDlglgDesmOutGoingReport').click(function () { btnDlglgDesmOutGoingReportClick(); return false; });
	
	/*
	
	$('#iconDlgDesmOutGoingCreationProjectSearch').click(function () { iconDlgDesmOutGoingCreationProjectSearchClick(); return false; });		
	$('#btnDlgDesmOutGoingCreationSearch').click(function () { btnDlgDesmOutGoingCreationSearchClick(); return false; });
	$('#btnDlgDesmOutGoingCreationCompletion').click(function () { btnDlgDesmOutGoingCreationCompletionClick(); return false; });	
	
	$("#txtDlgDesmOutGoingCreationProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});		
	
	$("#txtDlgDesmOutGoingCreationRsiNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});
	
	*/	
	
	var list = v_desm_out_going_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();				
		}
	}	
}

function closeDesmOutGoingReportPopUp() {
	
}

function initDesmOutGoingPopUpDatePicker(id) {
	
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


function btnDlglgDesmOutGoingReportClick() {
	
	var chkValidation = checkRequiredField("divModalBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if(v_desm_out_going_report_callback) {
		var param = {START_HANDOVER_DATE : $('#txtDlgDesmOutGoingReportStartHandoverDate').val(), END_HANDOVER_DATE : $('#txtDlgDesmOutGoingReportEndHandoverDate').val()};
		v_desm_out_going_report_callback("report-item", param);
	}
	
	$('#dlgDesmOutGoingReport').modal('hide');		
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


