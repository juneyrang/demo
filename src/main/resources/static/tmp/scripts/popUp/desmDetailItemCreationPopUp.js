var v_desm_detail_item_creation_callback = null;
var v_desm_detail_item_creation_param;

function initDesmDetailItemCreationPopUp(param , callback) {
	v_desm_detail_item_creation_callback = callback;
    v_desm_detail_item_creation_param = param;
    
    initDesmDetailItemCreationPopUpCode();    
}

function initDesmDetailItemCreationPopUpCode() {
    
    initDesmDetailItemCreationPopUpControls();
}


function initDesmDetailItemCreationPopUpControls() {
	
	$('#dlgDesmDetailItemCreation').on('shown.bs.modal', function () {
		$('#dlgDesmDetailItemCreation').click();
	});	
	
	$('#dlgDesmDetailItemCreation').on('hidden.bs.modal', function () {
	  	closeDesmDetailItemCreationPopUp();
	});
	
	$('#dlgDesmDetailItemCreation').modal('show');
			
	$("#txtDlgDesmDetailItemCreationInQty").keypress(function(e) {
		if(event.key >= 0 && event.key <= 9) {
		    return true;
		 }
		  
		 return false;
    });	
    
	$("#txtDlgDesmDetailItemCreationGross").keypress(function(e) {
		if(e.key === '.' || event.key >= 0 && event.key <= 9) {
		    return true;
		 }
		  
		 return false;
    });	
    
	$("#txtDlgDesmDetailItemCreationNet").keypress(function(e) {
		if(e.key === '.' || event.key >= 0 && event.key <= 9) {
		    return true;
		 }
		  
		 return false;
    });	        

	$('#btnDlgDesmDetailItemCreation').click(function () { btnDlgDesmDetailItemCreationClick(); return false; });
	

	
	searchLastData();		
}

function closeDesmDetailItemCreationPopUp() {
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

function removeValidationError(areaID) {
	$("#" + areaID + " .validation-error").each(function () {
		$(this).removeClass("validation-error");
	});
}

function btnDlgDesmDetailItemCreationClick() {
	
	removeValidationError("dlgDesmDetailItemCreation");
	
	var chkValidation = checkRequiredField("dlgDesmDetailItemCreation");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"DESCRIPTION" : $('#txtDlgDesmDetailItemCreationDescription').val(),
							 "DRAWING_NO" : $('#txtDlgDesmDetailItemCreationDrawingNo').val(),
							 "TAG_NO" : $('#txtDlgDesmDetailItemCreationItemTagNo').val(),
							 "UNIT" : $('#txtDlgDesmDetailItemCreationUnit').val(),
							 "IN_QTY" : $('#txtDlgDesmDetailItemCreationInQty').val(),
							 "MATERIAL" : $('#txtDlgDesmDetailItemCreationMaterial').val(),
							 "GROSS" : $('#txtDlgDesmDetailItemCreationGross').val(),
							 "NET" : $('#txtDlgDesmDetailItemCreationNet').val(),
							 "NOS" : 0,
							 "REPORT_OVER" : "Y",
							 "LOCATION" : v_desm_detail_item_creation_param.STORAGE_LOCATION,
							 "PACKAGE_LIST_NO" : v_desm_detail_item_creation_param.PACKAGE_LIST_NO,
							 "PACKAGE_NO" : v_desm_detail_item_creation_param.PACKAGE_NO,
							 "TRK_ITEM_NAME" : v_desm_detail_item_creation_param.TRK_ITEM_NAME,
							 "PROJECT_NO" : v_desm_detail_item_creation_param.PROJECT_NO};
	
			$.ajax({			
				url: "/saveDesmDetailItemCreation.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						if(v_desm_detail_item_creation_callback)
						{		
							v_desm_detail_item_creation_callback("save-item", null);
						}						
						$('#dlgDesmDetailItemCreation').modal('hide');
					}
				}
			});				
		}
	});	
}

