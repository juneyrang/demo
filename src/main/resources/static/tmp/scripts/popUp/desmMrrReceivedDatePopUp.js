var v_desm_default_receiveddate_callback = null;
//var v_desm_default_receive_param;
//var v_desm_default_return_param;
var v_desm_default_receiveddate_param;


function initDesmReceivedDatePopUp(param , callback) {
	v_desm_default_receiveddate_callback = callback;
    v_desm_default_receiveddate_param = param;
    //console.log("v_desm_default_receiveddate_param::::::", v_desm_default_receiveddate_param.receivedDate);
    
    initDesmDefaultReceivedDatePopUpCode();    
}

function initDesmDefaultReceivedDatePopUpCode() {
    
    initDesmReceivedDatePopUpControls();
}


function initDesmReceivedDatePopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	initDatePicker();
	
	$('#dlgDesmReceivedDate').on('shown.bs.modal', function () {
		$('#dlgDesmReceivedDate').click();
	});	
	
	$('#dlgDesmReceivedDate').on('hidden.bs.modal', function () {
	
	  	closeDesmReceivedDatePopUp();
	})	

	$('#dlgDesmReceivedDate').modal('show');

	$('#btnDDlgDesmReceivedDateConfirm').click(function () {
		btnDDlgDesmReceivedDateClick();
		return false;
	});
	
	
}

function closeDesmReceivedDatePopUp() {
	
	//dlgDesmDefaultCountryGrid.Dispose();
}




function btnDDlgDesmReceivedDateClick() {
	
	var receivedDate = $('#txtDlgDesmMrrReceivedDateApply').val();
	//alert(receivedDate);
	if(receivedDate == "") {
		//alert_modal("", $('#alertSelectRow').val());
		return;			
	}
	
	v_desm_default_receiveddate_param.receivedDate = receivedDate;
	//alert(v_desm_default_receiveddate_param.receivedDate );
	if(v_desm_default_receiveddate_callback) {
		v_desm_default_receiveddate_callback("select-date", v_desm_default_receiveddate_param);
	}						
							
	$('#dlgDesmReceivedDate').modal('hide');	
	
	
	/*confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
		
			$.ajax({			
				url: "/saveDesmDefaultCountrySave.do",
				data: {COUNTRY_CODE : countryCode},
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
						
					} else {
					
						alert_success($('#alertSuccess').val());
						
						if(v_desm_default_country_callback) {
							v_desm_default_country_callback("save-item", null);
						}						
												
						$('#dlgDesmDefaultCountry').modal('hide');	
					}
				}		
			});					
		}
	});*/			
	
}



function initDatePicker() {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});
}

