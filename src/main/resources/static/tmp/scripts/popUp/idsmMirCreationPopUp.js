var v_idsm_mir_creation_callback = null;
var v_idsm_mir_creation_param;

function initIdsmMirCreationPopUp(param , callback) {
	v_idsm_mir_creation_callback = callback;
    v_idsm_mir_creation_param = param;
    
    $('#dlgIdsmMirCreation').modal('show');
    
    initIdsmMirCreationPopUpCode();    
}

function initIdsmMirCreationPopUpCode() {
    
    initIdsmMirCreationPopUpControls();
}


function initIdsmMirCreationPopUpControls() {
	
	$('#dlgIdsmMirCreation').on('shown.bs.modal', function () {
		$('#dlgIdsmMirCreation').click();
	});	
	
	$('#dlgIdsmMirCreation').on('hidden.bs.modal', function () {
	  	closeIdsmMirCreationPopUp();
	})
	
	initDatePicker();	
	
	makeAutocomplete(
		"txtDlgIdsmMirCreationPreparedByName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmMirCreationPreparedByDeptName",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmMirCreationPreparedByName").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmMirCreationPreparedByAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmMirCreationPreparedByDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);	
	
	makeAutocomplete(
		"txtDlgIdsmMirCreationCheckedByName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmMirCreationCheckedByDeptName",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmMirCreationCheckedByName").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmMirCreationCheckedByAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmMirCreationCheckedByDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);		
	
	makeAutocomplete(
		"txtDlgIdsmMirCreationConfirmedByName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmMirCreationConfirmedByDeptName",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmMirCreationConfirmedByName").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmMirCreationConfirmedByAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmMirCreationConfirmedByDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);	
	
	makeAutocomplete(
		"txtDlgIdsmMirCreationReviewedByEpcQaQcName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmMirCreationReviewedByEpcQaQcDeptName",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmMirCreationReviewedByEpcQaQcName").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmMirCreationReviewedByEpcQaQcAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmMirCreationReviewedByEpcQaQcDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);		
	
	makeAutocomplete(
		"txtDlgIdsmMirCreationReviewedByIrtOeName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmMirCreationReviewedByIrtOeDeptName",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmMirCreationReviewedByIrtOeName").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmMirCreationReviewedByIrtOeAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmMirCreationReviewedByIrtOeDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);			

	$('#btnDlgIdsmMirCreation').click(function () { btnDlgIdsmMirCreationClick(); return false; });	
	
	searchLastData();		
}

function closeIdsmMirCreationPopUp() {
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

function btnDlgIdsmMirCreationClick() {
	
	removeValidationError("dlgIdsmMirCreation");
	
	var chkValidation = checkRequiredField("dlgIdsmMirCreation");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"REMARKS" : $('#txtDlgIdsmMirCreationRemarks').val(),
							 "PREPARED_BY" : $('#txtDlgIdsmMirCreationPreparedByAd').val(),
							 "CHECKED_BY" : $('#txtDlgIdsmMirCreationCheckedByAd').val(),
							 "CONFIRMED_BY" : $('#txtDlgIdsmMirCreationConfirmedByAd').val(),
							 "REVIEWED_BY_EPC_QA_QC" : $('#txtDlgIdsmMirCreationReviewedByEpcQaQcAd').val(),
							 "REVIEWED_BY_IRT_OE" : $('#txtDlgIdsmMirCreationReviewedByIrtOeAd').val(),
							 "MIR_NO" : $('#txtDlgIdsmMirCreationMirNo').val(),
							 "INVOICE_NO" : $('#txtDlgIdsmMirCreationInvoiceNo').val(),
							 "M_PACKAGE_NO" : $('#txtDlgIdsmMirCreationPackageNo').val(),
							 "RECEIVED_DATE" : $('#txtDlgIdsmMirCreationReceivedDate').val(),
							 "INSPECTION_DATE" : $('#txtDlgIdsmMirCreationInspectionDate').val(),
							 "CONSTRUCTION_ACTIVITY_NAME" : $('#txtDlgIdsmMirCreationConstructionActivityName').val(),
							 "PL_NO" : $('#txtDlgIdsmMirCreationPlNo').val(),
			                 "list" : v_idsm_mir_creation_param.list};
		
			$.ajax({			
				url: "/saveIdsmOsSummaryListMirCreation.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						$('#dlgIdsmMirCreation').modal('hide');
						if(v_idsm_mir_creation_callback)
						{		
							v_idsm_mir_creation_callback("save-item", result.MIR_NO);
						}						
					}
				}
			});				
		}
	});	
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

function searchLastData(){
	$.ajax({
		url: "/getIdsmMirCreationLastData.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {
			
			if(data.results.length > 0){
				var row = data.results[0];
				
				/*$('#txtDlgIdsmMirCreationMirNo').val(row.MIR_NO);
				$('#txtDlgIdsmMirCreationInvoiceNo').val(row.INVOICE_NO);
				$('#txtDlgIdsmMirCreationPackageNo').val(row.M_PACKAGE_NO);
				$('#txtDlgIdsmMirCreationReceivedDate').val(row.RECEIVED_DATE);
				$('#txtDlgIdsmMirCreationInspectionDate').val(row.INSPECTION_DATE);
				$('#txtDlgIdsmMirCreationConstructionActivityName').val(row.CONSTRUCTION_ACTIVITY_NAME);
				$('#txtDlgIdsmMirCreationPlNo').val(row.PL_NO);
				$('#txtDlgIdsmMirCreationRemarks').val(row.REMARKS);*/
				
				$('#txtDlgIdsmMirCreationPreparedByName').val(row.PREPARED_BY_NM);
				$('#txtDlgIdsmMirCreationPreparedByAd').val(row.PREPARED_BY);
				$('#txtDlgIdsmMirCreationPreparedByDeptName').val(row.PREPARED_BY_DN);
				$('#txtDlgIdsmMirCreationCheckedByName').val(row.CHECKED_BY_NM);
				$('#txtDlgIdsmMirCreationCheckedByAd').val(row.CHECKED_BY);
				$('#txtDlgIdsmMirCreationCheckedByDeptName').val(row.CHECKED_BY_DN);		
				$('#txtDlgIdsmMirCreationConfirmedByName').val(row.CONFIRMED_BY_NM);
				$('#txtDlgIdsmMirCreationConfirmedByAd').val(row.CONFIRMED_BY);
				$('#txtDlgIdsmMirCreationConfirmedByDeptName').val(row.CONFIRMED_BY_DN);
				$('#txtDlgIdsmMirCreationReviewedByEpcQaQcName').val(row.REVIEWED_BY_EPC_QA_QC_NM);
				$('#txtDlgIdsmMirCreationReviewedByEpcQaQcAd').val(row.REVIEWED_BY_EPC_QA_QC);
				$('#txtDlgIdsmMirCreationReviewedByEpcQaQcDeptName').val(row.REVIEWED_BY_EPC_QA_QC_DN);		
				$('#txtDlgIdsmMirCreationReviewedByIrtOeName').val(row.REVIEWED_BY_IRT_OE_NM);
				$('#txtDlgIdsmMirCreationReviewedByIrtOeAd').val(row.REVIEWED_BY_IRT_OE);
				$('#txtDlgIdsmMirCreationReviewedByIrtOeDeptName').val(row.REVIEWED_BY_IRT_OE_DN);																
			}

	
        }
    });	
}

