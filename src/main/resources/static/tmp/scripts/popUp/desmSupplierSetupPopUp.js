var v_desm_supplier_setup_callback = null;
var v_desm_supplier_setup_param;


function initDesmSupplierSetupPopUp(param , callback) {
	v_desm_supplier_setup_callback = callback;
    v_desm_supplier_setup_param = param;    
    
    if(v_desm_supplier_setup_param.SUPPLIER_NO != null && v_desm_supplier_setup_param.SUPPLIER_NO != "") {
    	$('#txtDlgDesmSupplierSetupSupplierNo').val(v_desm_supplier_setup_param.SUPPLIER_NO);
    	$('#txtDlgDesmSupplierSetupSupplierName').val(v_desm_supplier_setup_param.SUPPLIER_NAME);
    	$('#txtDlgDesmSupplierSetupMail').val(v_desm_supplier_setup_param.MAIL);
    	
    	
    	
    	$('#iconDlgDesmSupplierSetupSupplierSearch').remove();
		$("#txtDlgDesmSupplierSetupSupplierNo").attr("readonly",true);
		
		if(v_desm_supplier_setup_param.FEDERATED_YN  == "Y")
		
		if(federated_yn == "Y"){
			$("#txtDlgDesmSupplierSetupMail").attr("readonly",true);
		}		
    }
    else {
    	$('#btnDlgDesmSupplierSetupResetPassword').remove();
    	
    }
    
    initDesmSupplierSetupPopUpCode();    
}

function initDesmSupplierSetupPopUpCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			var updateBy = results.USER[0].DEPT_NAMEM + "&nbsp;&nbsp;" + results.USER[0].USER_NAME + "&nbsp;&nbsp;" + results.USER[0].CUR_DAY;
			
			//$('#spanDlgDesmSupplierSetupCheckedBy').html(updateBy);
    	
    			
		 
		 	initDesmSupplierSetupPopUpControls();
			
        }
    });
	
}

function initDesmSupplierSetupPopUpControls() {	
	
	$('#dlgDesmSupplierSetup').on('shown.bs.modal', function () {
		$('#dlgDesmSupplierSetup').click();
	});	
	
	$('#dlgDesmSupplierSetup').on('hidden.bs.modal', function () {
	  	closeDesmSupplierSetupPopUp();
	});	
	
	$('#dlgDesmSupplierSetup').modal('show');
	
	makeAutocomplete(
		"txtDlgDesmSupplierSetupSupplierNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmSupplierSetupSupplierName",		//clear필드 id
		"/getSupplier.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmSupplierSetupSupplierNo").val(ui.item.value.split("|")[0]);
			$("#txtDlgDesmSupplierSetupSupplierName").val(ui.item.value.split("|")[1]);
			return false;
		}
	);
	
	$('#btnDlgDesmSupplierSetupPoSearch').click(function () { btnDlgDesmSupplierSetupPoSearchClick(); return false; });
	$('#iconDlgDesmSupplierSetupSupplierSearch').click(function () { iconDlgDesmSupplierSetupSupplierSearchClick(); return false; });
	$('#btnDlgDesmSupplierSetupSave').click(function () { btnDlgDesmSupplierSetupSaveClick(); return false; });
	$('#btnDlgDesmSupplierSetupResetPassword').click(function () { btnDlgDesmSupplierSetupResetPasswordClick(); return false; });
	
	
	var list = v_desm_supplier_setup_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}	
	
}



function closeDesmSupplierSetupPopUp() {
	
}

function btnDlgDesmSupplierSetupPoSearchClick() {

	if($('#txtDlgDesmSupplierSetupSupplierNo').val().length < 2 || $('#txtDlgDesmSupplierSetupSupplierName').val() == ""){
		$('#txtDlgDesmSupplierSetupSupplierNo').val("");
		$('#txtDlgDesmSupplierSetupSupplierName').val("");
		$("#txtDlgDesmSupplierSetupSupplierNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmSupplierSetupPoCheck");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	var param = { SUPPLIER_NO : $('#txtDlgDesmSupplierSetupSupplierNo').val()};
    
	$('#dlgDesmSupplierSetupPopUp').load("/desmSupplierSetupPoSearchPopUp.do",null,function(data, status, xhr) {
	
		if(status == "success"){
			
			initDesmSupplierSetupPoSearchPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					
				}
			});	
			
		}
	});		
}

function iconDlgDesmSupplierSetupSupplierSearchClick() {

	var param = {keyword : $('#txtDlgDesmSupplierSetupSupplierNo').val()};

	$('#dlgDesmSupplierSetupPopUp').load("/desmSupplierListPopUp.do",null,function(data, status, xhr) {
	
		if(status == "success"){
			initDesmSupplierListPopUp(param, function (key, returnParam) {
				if(key == "select-item"){
					$("#txtDlgDesmSupplierSetupSupplierNo").val(returnParam.SEGMENT1);
					$("#txtDlgDesmSupplierSetupSupplierName").val(returnParam.VENDOR_NAME);
					$("#txtDlgDesmSupplierSetupSupplierName").attr('readonly', true);
				} else if(key == "add-item"){
					$("#txtDlgDesmSupplierSetupSupplierNo").val('');
					$("#txtDlgDesmSupplierSetupSupplierName").val('');
					$("#txtDlgDesmSupplierSetupSupplierName").attr('readonly', false);
					$('#iconDlgDesmSupplierSetupSupplierSearch').hide();
					$("#txtDlgDesmSupplierSetupSupplierNo").autocomplete('disable');
					$('#btnDlgDesmSupplierSetupPoSearch').hide();
				}
			});	
		}
	});
}

function btnDlgDesmSupplierSetupSaveClick() {
	if($('#txtDlgDesmSupplierSetupSupplierNo').val().length < 2 || $('#txtDlgDesmSupplierSetupSupplierName').val() == ""){
		$('#txtDlgDesmSupplierSetupSupplierNo').val("");
		$('#txtDlgDesmSupplierSetupSupplierName').val("");
		$("#txtDlgDesmSupplierSetupSupplierNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmSupplierSetupBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	/*
	if($('#chkDlgDesmSupplierSetupCheck').is(':checked')) {
		$('#chkDlgDesmSupplierSetupCheck').removeClass("validation-error");
	}
	else {
		$('#chkDlgDesmSupplierSetupCheck').addClass("validation-error");
		alert_modal("", $('#alertValidate').val());
		return;		
	}
	*/
	
	/*
	var msg = $('#alertSupplierSave').val();
	if(v_desm_supplier_setup_param.FEDERATED_YN == "N" && (v_desm_supplier_setup_param.MAIL != $('#txtDlgDesmSupplierSetupMail').val() || v_desm_supplier_setup_param.USER_NAME != $('#txtDlgDesmSupplierSetupSupplierName').val())){
		msg =$("#alertIDCSSave").val();
	}
	*/
	var msg = $('#alertSaveMprSupplier1').val();
	msg += "<br/>&nbsp&nbsp-&nbsp&nbsp" + $('#alertSaveMprSupplier2').val();
	msg += "<br/>&nbsp&nbsp-&nbsp&nbsp" + $('#alertSaveMprSupplier3').val();
	msg += "<br/><br/>" + $('#alertSaveMprSupplier4').val();	
	
	confirm_modal("", msg, null, function (callobj, result) {
		if(result) {
		
			var list = [];
			list.push({ROLE_SEQ : "269"});
			var paramList = JSON.stringify(list);
							
		    var param = objNullCheck({SUPPLIER_NO : $('#txtDlgDesmSupplierSetupSupplierNo').val(), SUPPLIER_NAME : $('#txtDlgDesmSupplierSetupSupplierName').val(),
		                              P_USER_AD : v_desm_supplier_setup_param.P_USER_AD, MAIL : $('#txtDlgDesmSupplierSetupMail').val(), OLD_MAIL : v_desm_supplier_setup_param.MAIL,
		                 			  FEDERATED_YN : v_desm_supplier_setup_param.FEDERATED_YN, IDCS_ID : v_desm_supplier_setup_param.IDCS_ID, updateList : paramList});
			
			$.ajax({			
				url: "/saveDesmSupplierSetupData.do",
				data: param,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-2") {
							alert_fail($('#alertMailFail').val());
						}	
						else if(result.error == "-3") {
							alert_fail($('#alertSaveAlreadyData').val());
						}							
						else if(result.error == "-10") {
							alert_fail($('#alertSaveSubconUserErr').val());
						}	
						else if(result.error == "-11") {
							alert_fail($('#alertIDCSCreateUserCheckErrorNoParam').val());
						}							
						else {
							alert_fail(result.error);
						}				
						
					} else {
						alert_success($('#alertSaveSuccess').val());
						
						if(v_desm_supplier_setup_callback) {
							v_desm_supplier_setup_callback("save-item", null);
						}
						
						$('#dlgDesmSupplierSetup').modal('hide');		
					}
				}
			});				
					
		}
	});		
}

function btnDlgDesmSupplierSetupResetPasswordClick() {
	

	if(v_desm_supplier_setup_param.FEDERATED_YN != null && v_desm_supplier_setup_param.FEDERATED_YN == "Y") {
		alert_fail($("#alertIDCSResetPasswordError").val());
		return;
	}

	confirm_modal("", $('#alertReset').val(), null, function (callobj, result) {
		if(result) {
			IDCS.resetPassword({"idcs_id": v_desm_supplier_setup_param.IDCS_ID},function(){
				alert_success($('#alertSuccess').val());
				$('#dlgDesmSupplierSetup').modal('hide');
			});
		}
	});
}

