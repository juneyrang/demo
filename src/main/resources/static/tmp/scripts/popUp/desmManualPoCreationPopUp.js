var v_desm_manual_po_creation_callback = null;
var v_desm_manual_po_creation_param;


function initDesmManualPoCreationPopUp(param , callback) {
	v_desm_manual_po_creation_callback = callback;
	v_desm_manual_po_creation_param = param;    
    
	if(supplierYn == "Y") {
    	$('#txtDlgDesmManualPoCreationSupplierNo').val(v_desm_manual_po_creation_param.SUPPLIER_NO);
    	$('#txtDlgDesmManualPoCreationSupplierName').val(v_desm_manual_po_creation_param.SUPPLIER);
    	
    	$('#iconDlgDesmManualPoCreationSupplierSearch').remove();
		$("#txtDlgDesmManualPoCreationSupplierNo").attr("readonly",true);    	
    }
    
    initDesmManualPoCreationPopUpCode();    
}

function initDesmManualPoCreationPopUpCode() {
 	initDesmManualPoCreationPopUpControls();
}

function initDesmManualPoCreationPopUpControls() {	
	
	$('#dlgDesmManualPoCreation').on('shown.bs.modal', function () {
		$('#dlgDesmManualPoCreation').click();
	});	
	
	$('#dlgDesmManualPoCreation').on('hidden.bs.modal', function () {
	  	closeDesmManualPoCreationPopUp();
	});	
	
	$('#dlgDesmManualPoCreation').modal('show');
	
	makeAutocomplete(
		"txtDlgDesmManualPoCreationSupplierNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmManualPoCreationSupplierName",		//clear필드 id
		"/getSupplier.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmManualPoCreationSupplierNo").val(ui.item.value.split("|")[0]);
			$("#txtDlgDesmManualPoCreationSupplierName").val(ui.item.value.split("|")[1]);
			return false;
		}
	);
	
	$('#iconDlgDesmManualPoCreationSupplierSearch').click(function () { iconDlgDesmManualPoCreationSupplierSearchClick(); return false; });
	$('#iconDlgDesmManualPoCreationProjectSearch').click(function () { iconDlgDesmManualPoCreationProjectSearchClick(); return false; });
	$('#btnDlgDesmManualPoCreationSave').click(function () { btnDlgDesmManualPoCreationSaveClick(); return false; });
	
	
	var list = v_desm_manual_po_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}	
	
}



function closeDesmManualPoCreationPopUp() {
	
}

function btnDlgDesmManualPoCreationPoSearchClick() {

	if($('#txtDlgDesmManualPoCreationSupplierNo').val().length < 2 || $('#txtDlgDesmManualPoCreationSupplierName').val() == ""){
		$('#txtDlgDesmManualPoCreationSupplierNo').val("");
		$('#txtDlgDesmManualPoCreationSupplierName').val("");
		$("#txtDlgDesmManualPoCreationSupplierNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmManualPoCreationPoCheck");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	var param = { SUPPLIER_NO : $('#txtDlgDesmManualPoCreationSupplierNo').val()};
    
	$('#dlgDesmManualPoCreationPopUp').load("/desmManualPoCreationPoSearchPopUp.do",null,function(data, status, xhr) {
	
		if(status == "success"){
			
			initDesmManualPoCreationPoSearchPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					
				}
			});	
			
		}
	});		
}

function iconDlgDesmManualPoCreationSupplierSearchClick() {

	var param = {keyword : $('#txtDlgDesmManualPoCreationSupplierNo').val()};

	$('#dlgDesmManualPoCreationPopUp').load("/desmMprSupplierListPopUp.do",null,function(data, status, xhr) {
	
		if(status == "success"){
			initDesmMprSupplierListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtDlgDesmManualPoCreationSupplierNo").val(returnParam.SEGMENT1);
					$("#txtDlgDesmManualPoCreationSupplierName").val(returnParam.VENDOR_NAME);	
				}
			});	
		}
	});
}

function btnDlgDesmManualPoCreationSaveClick() {
	if($('#txtDlgDesmManualPoCreationSupplierNo').val().length < 2 || $('#txtDlgDesmManualPoCreationSupplierName').val() == ""){
		$('#txtDlgDesmManualPoCreationSupplierNo').val("");
		$('#txtDlgDesmManualPoCreationSupplierName').val("");
		$("#txtDlgDesmManualPoCreationSupplierNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmManualPoCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	var msg = $('#alertSave').val();
	
	confirm_modal("", msg, null, function (callobj, result) {
		if(result) {
		
		    var param = objNullCheck({SUPPLIER_NO : $('#txtDlgDesmManualPoCreationSupplierNo').val(), SUPPLIER_NAME : $('#txtDlgDesmManualPoCreationSupplierName').val(),
		    						  PROJECT_NO : $('#txtDlgDesmManualPoCreationProjectNo').val(), PROJECT_NAME : $('#txtDlgDesmManualPoCreationProjectName').val(),
		    						  PO_NO : $('#txtDlgDesmManualPoCreationPoNumber').val(), PO_DESCRIPTION : $('#txtDlgDesmManualPoCreationPoDescription').val(),
		    						  AUTHORIZATION_STATUS:'APPROVED'});
			console.log(param);
			$.ajax({			
				url: "/saveDesmManualPoCreationData.do",
				data: param,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-3") {
							alert_fail($('#alertSaveAlreadyPoData').val());
						}			
						else {
							alert_fail(result.error);
						}				
						
					} else {
						alert_success($('#alertSaveSuccess').val());
						
						if(v_desm_manual_po_creation_callback) {
							v_desm_manual_po_creation_callback("save-item", null);
						}
						
						$('#dlgDesmManualPoCreation').modal('hide');		
					}
				}
			});				
					
		}
	});		
}

function iconDlgDesmSupplierSetupSupplierSearchClick() {

	var param = {keyword : $('#txtDlgDesmManualPoCreationSupplierNo').val()};

	$('#dlgDesmManualPoCreationPopUp').load("/desmSupplierListPopUp.do",null,function(data, status, xhr) {
	
		if(status == "success"){
			initDesmSupplierListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtDlgDesmManualPoCreationSupplierNo").val(returnParam.SEGMENT1);
					$("#txtDlgDesmManualPoCreationSupplierName").val(returnParam.VENDOR_NAME);	
				}
			});	
		}
	});
}

function iconDlgDesmManualPoCreationProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmManualPoCreationProjectNo').val(), TYPE : "A"};

	$('#dlgDesmManualPoCreationPopUp').load("/desmMprProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmMprProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmManualPoCreationProjectNo").val(returnParam.SEGMENT1);
					$("#txtDlgDesmManualPoCreationProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}
