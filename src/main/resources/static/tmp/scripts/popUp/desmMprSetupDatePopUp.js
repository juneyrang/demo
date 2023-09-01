

var v_desm_mpr_setup_date_callback = null;
var v_desm_mpr_setup_date_param;



function initDesmMprSetupDataPopUp(param , callback) {
	v_desm_mpr_setup_date_callback = callback;
    v_desm_mpr_setup_date_param = param; 
    
    initDesmMprSetupDataPopUpCode();    
}

function initDesmMprSetupDataPopUpCode() {	
	
	initDesmMprSetupDataPopUpControls();
}


function initDesmMprSetupDataPopUpControls() {
	
	$('#dlgDesmMprSetupDate').on('shown.bs.modal', function () {
		$('#dlgDesmMprSetupDate').click();
	});
	
	$('#dlgDesmMprSetupDate').on('hidden.bs.modal', function () {
	  	closeDesmMprSetupDataPopUp();
	})	
	
	$('#dlgDesmMprSetupDate').modal('show');
	
	initDesmMprSetupDataPicker("#txtDlgDesmMprSetupStartDate");
	initDesmMprSetupDataPicker("#txtDlgDesmMprSetupEndDate");
	
	searchDlgDesmMprSetupDateData();
	
	$('#btnDlgDesmMprSetupDateSave').click(function () { btnDlgDesmMprSetupDateSaveClick(); return false; });
	
	

}

function searchDlgDesmMprSetupDateData() {

	$.ajax({
		url: "/getDesmMprSetupDate.do",	
		data: {PO_NO : v_desm_mpr_setup_date_param.PO_NO, MPR_NO : v_desm_mpr_setup_date_param.MPR_NO},
		success: function (data, textStatus, jqXHR) {
			var row = data.results[0];
			$('#txtDlgDesmMprSetupStartDate').val(row.START_MONTH);
			$('#txtDlgDesmMprSetupEndDate').val(row.END_MONTH);			
			
		}
	});	
	
}

function btnDlgDesmMprSetupDateSaveClick() {
	
	var chkValidation = checkRequiredField("divDlgDesmMprSetupDateBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			
			var submissionPeriod = '';
			var submissionPeriodMonth = '';
			$.each(getDateRangeData($('#txtDlgDesmMprSetupStartDate').val(), $('#txtDlgDesmMprSetupEndDate').val()), function(i, date) {
				submissionPeriod += submissionPeriod.length > 0 ? ',Yes' : 'Yes';
				submissionPeriodMonth += submissionPeriodMonth.length > 0 ? ',' + date : date;
			});
			var paramData = {PO_NO : v_desm_mpr_setup_date_param.PO_NO, MPR_NO : v_desm_mpr_setup_date_param.MPR_NO,
					 	     START_MONTH : $('#txtDlgDesmMprSetupStartDate').val(), END_MONTH : $('#txtDlgDesmMprSetupEndDate').val(),
					 	     SUBMISSION_PERIOD : submissionPeriod, SUBMISSION_PERIOD_MONTH : submissionPeriodMonth};

			$.ajax({			
				url: "/saveDesmMprSetupDate.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						
							if(v_desm_mpr_setup_date_callback) {
								v_desm_mpr_setup_date_callback("save-item", result.MPR_NO);
							}
							
							$('#dlgDesmMprSetupDate').modal('hide');								
										
					}
				}
			});											
		}
	});	
}

function getDateRangeData(startDate, endDate) {
	var rtnDate = [];
 	var sDate = new Date(startDate);
   	var eDate = new Date(endDate);    	
	while(sDate.getTime() <= eDate.getTime()) {
		var mn = (sDate.getMonth() + 1);
		rtnDate.push(sDate.getFullYear() + '/' + (mn < 10 ? '0' + mn : mn));
		sDate.setMonth(sDate.getMonth() + 1);
   	}
   	return rtnDate;
}
   	

function initDesmMprSetupDataPicker(id) {
	
	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}
	
 	$(id).datepicker({ 
			dateFormat: 'yy/mm',
			changeMonth: true,
		    changeYear: true,
		    showButtonPanel: true,
		    onClose: function(dateText, inst) { 
		        console.log("dateText", dateText);
		        console.log("inst", inst); 
	            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
	            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 
	            $(this).datepicker('setDate', new Date(year, month, 1));
	            $(".ui-datepicker-calendar").css("display","none");
	        },
	        beforeShow() {
		        var selectDate = $(id).val().split("/");
		        var year = Number(selectDate[0]);
		        var month = Number(selectDate[1]) - 1;
		        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );	        
	        }
	});
	
	$(id).focus(function () {
		$(".ui-datepicker-calendar").css("display","none");
		$("#ui-datepicker-div").position({
			  my: "center top",
			  at: "center bottom",
			  of: $(this)
		});
	});
	

	
}

function closeDesmMprSetupDataPopUp() {
	
}




