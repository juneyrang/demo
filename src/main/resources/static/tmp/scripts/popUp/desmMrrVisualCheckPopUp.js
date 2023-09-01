var v_desm_default_visualcheck_callback = null;
var v_desm_default_visualcheck_param;


function initDesmVisualCheckPopUp(param , callback) {
	v_desm_default_visualcheck_callback = callback;
	v_desm_default_visualcheck_param = param;
    //console.log("v_desm_default_visualcheck_param::::::", v_desm_default_visualcheck_param.receivedDate);
    
    initDesmDefaultVisualCheckPopUpCode();    
}

function initDesmDefaultVisualCheckPopUpCode() {
    
    initDesmVisualCheckPPopUpControls();
}


function initDesmVisualCheckPPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	//initDatePicker();
	
	$('#dlgDesmVisualCheck').on('shown.bs.modal', function () {
		$('#dlgDesmVisualCheck').click();
	});	
	
	$('#dlgDesmVisualCheck').on('hidden.bs.modal', function () {
	
	  	closeDesmVisualCheckPopUp();
	})	

	$('#dlgDesmVisualCheck').modal('show');

	$('#btnDDlgDesmVisualCheckConfirm').click(function () {
		btnDDlgDesmVisualCheckClick();
		return false;
	});
	
	
}

function closeDesmVisualCheckPopUp() {
	
	//dlgDesmDefaultCountryGrid.Dispose();
}




function btnDDlgDesmVisualCheckClick() {
	
	var visualCheck = $('#selVisualCheck').val();
	//alert(visualCheck);
	if(visualCheck == "") {
		//alert_modal("", $('#alertSelectRow').val());
		return;			
	}
	
	v_desm_default_visualcheck_param.visualCheck = visualCheck;
	//alert(v_desm_default_visualcheck_param.visualCheck);
	if(v_desm_default_visualcheck_callback) {
		v_desm_default_visualcheck_callback("select-edit", v_desm_default_visualcheck_param);
	}						
							
	$('#dlgDesmVisualCheck').modal('hide');	
	
	
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

