

var v_desm_return_report_callback = null;
var v_desm_return_report_param;



function initDesmReturnReportPopUp(param , callback) {
	v_desm_return_report_callback = callback;
    v_desm_return_report_param = param; 
    
    initDesmReturnReportPopUpCode();    
}

function initDesmReturnReportPopUpCode() {	
	
	initDesmReturnReportPopUpControls();
}


function initDesmReturnReportPopUpControls() {
	
	$('#dlgDesmReturnReport').on('shown.bs.modal', function () {
		$('#dlgDesmReturnReport').click();
	});
	
	$('#dlgDesmReturnReport').on('hidden.bs.modal', function () {
	  	closeDesmReturnReportPopUp();
	})	
	
	$('#dlgDesmReturnReport').modal('show');
	
	initDesmReturnPopUpDatePicker("txtDlgDesmReturnReportStartDate");
	initDesmReturnPopUpDatePicker("txtDlgDesmReturnReportEndDate");
	
	$('#txtDlgDesmReturnReportStartDate').val(v_desm_return_report_param.START_DATE);
	$('#txtDlgDesmReturnReportEndDate').val(v_desm_return_report_param.END_DATE);
	
	if(v_desm_return_report_param.START_DATE == null || v_desm_return_report_param.START_DATE == "") {
		$('#txtDlgDesmReturnReportStartDate').val(toDay);
	}

	if(v_desm_return_report_param.END_DATE == null || v_desm_return_report_param.END_DATE == "") {
		$('#txtDlgDesmReturnReportEndDate').val(toDay);
	}	
	
	
	$('#btnDlgDesmReturnReport').click(function () { btnDlgDesmReturnReportClick(); return false; });

	
	var list = v_desm_return_report_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();				
		}
	}	
}

function closeDesmReturnReportPopUp() {
	
}

function initDesmReturnPopUpDatePicker(id) {
	
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


function btnDlgDesmReturnReportClick() {
	
	var chkValidation = checkRequiredField("divReturnModalBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if(v_desm_return_report_callback) {
		var param = {START_DATE : $('#txtDlgDesmReturnReportStartDate').val(), END_DATE : $('#txtDlgDesmReturnReportEndDate').val()};
		v_desm_return_report_callback("report-item", param);
	}
	
	$('#dlgDesmReturnReport').modal('hide');		
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


