var v_idsm_rfi_creation_callback = null;
var v_idsm_rfi_creation_param;
var dlgGrid;

function initIdsmRfiCreationPopUp(param , callback) {
	v_idsm_rfi_creation_callback = callback;
    v_idsm_rfi_creation_param = param;
    
    $('#dlgIdsmRfiCreation').modal('show');
    
    initIdsmRfiCreationPopUpCode();    
}

function initIdsmRfiCreationPopUpCode() {
    
    initIdsmRfiCreationPopUpControls();
}


function initIdsmRfiCreationPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	$('#dlgIdsmRfiCreation').on('shown.bs.modal', function () {
		$('#dlgIdsmRfiCreation').click();
	});	
	
	$('#dlgIdsmRfiCreation').on('hidden.bs.modal', function () {
	  	closeIdsmRfiCreationPopUp();
	});		

	makeAutocomplete(
		"txtDlgIdsmRfiCreationRequestedByA", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmRfiCreationRequestedByAAd",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmRfiCreationRequestedByA").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmRfiCreationRequestedByAAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmRfiCreationRequestedByADeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);	
	
	makeAutocomplete(
		"txtDlgIdsmRfiCreationRequestedByB", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmRfiCreationRequestedByBAd",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmRfiCreationRequestedByB").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmRfiCreationRequestedByBAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmRfiCreationRequestedByBDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);	
	
	makeAutocomplete(
		"txtDlgIdsmRfiCreationQc", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmRfiCreationQcAd",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmRfiCreationQc").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmRfiCreationQcAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmRfiCreationQcDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);		
	
	makeAutocomplete(
		"txtDlgIdsmRfiCreationOwner", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgIdsmRfiCreationOwnerAd",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgIdsmRfiCreationOwner").val(ui.item.value.split("|")[0]);
			$("#txtDlgIdsmRfiCreationOwnerAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgIdsmRfiCreationOwnerDeptName").val(ui.item.value.split("|")[3]);							
	
			return false;
		}
	);		
	
	initDatePicker();

	$('#btnDlgIdsmRfiCreation').click(function () { btnDlgIdsmRfiCreationClick(); return false; });
	
	
	
	$('#txtDlgIdsmRfiCreationConstructionPkgNameNo').change(function () { txtDlgIdsmRfiCreationConstructionPkgNameNoChange(); return false; });		
	$('#btnDlgIdsmRfiSetUp').click(function () { btnDlgIdsmRfiSetUpClick(); return false; });				
	
	var gridCode = getGridCode();
	var dlgGridCol = {"Cfg" : { "id" : "idsmDlgRfiCreationGrid", "CfgId" : "idsmDlgRfiCreationGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "4", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Small", "Scale" : "90%"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "150","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0", "Code" : gridCode,"CopyCols" : "0"
						,"SafeCSS" : "1", "Sorting" : "0"}
						,"Panel" : {"Visible" : "1"}
						,"Toolbar" : {"Visible" : "0"}
						, "Cols" : [
							{	"Name"	: "DATE", "Width": "150", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
							{	"Name"	: "TIME", "Width": "150", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
							{	"Name"	: "DELIVERY_ORDER_NO", "Width": "250", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
							{	"Name"	: "PKG_NO", "Width": "170", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
							{	"Name"	: "PKG_NO_A", "Width": "170", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
						]
						,"Header" : {
							"DATE"	: "Date", "Class" : "gridCenterText",
							"TIME"	: "Time",
							"DELIVERY_ORDER_NO"	: "Delivery Order No.",
							"PKG_NO"	: "PKG No.",
							"PKG_NO_A"	: "PKG No."
						}
	};	
	
	dlgGrid = TreeGrid( {Layout:{Data : dlgGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"dlgIdsmRfiCreationGrid" );	
	
	searchCode();
}

function closeIdsmRfiCreationPopUp() {
	dlgGrid.Dispose();
}

function btnDlgIdsmRfiCreationClick() {
	$('#dlgIdsmRfiCreation').modal('hide');
	
	/*confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"RFI_NO" : $('#txtDlgIdsmRfiCreationRfiNo').val(),
							 "D_DATE" : $('#txtDlgIdsmRfiCreationDate').val(),
							 "UNIT_NO" : $('#txtDlgIdsmRfiCreationUnitNo').val(),
							 "DATE_TIME" : $('#txtDlgIdsmRfiCreationDateTime').val(),
							 "D_LOCATION" : $('#txtDlgIdsmRfiCreationLocation').val(),
							 "D_CATEGORY" : $('input[name=txtDlgIdsmRfiCreationCategory]:checked').val(),
							 "PKG_NAME" : $('#txtDlgIdsmRfiCreationConstructionPkgNameNo').val(),
							 "EQUIPMENT" : $('#txtDlgIdsmRfiCreationSystem').val(),
							 "APPLIED_PROCEDURE" : $('#selDlgIdsmRfiCreationAppliedProcedure').val(),
							 "PROCEDURE_NO" : $('#selDlgIdsmRfiCreationProcedure').val(),
							 "INSPECTION" : $('#selDlgIdsmRfiCreationInspection').val(),
							 "PARAGRAPH" : $('#txtDlgIdsmRfiCreationParagraph').val(),
							 "DETAILS_ITEM" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "QUANTITY" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "VOLUME" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "ATTACHMENTS" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "REQUESTED_BY_A" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "REQUESTED_BY_B" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "QC_BY" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
							 "OWNER_BY" : $('#txtDlgIdsmRfiCreationReviewedByIrtOeAd').val(),
			                 "list" : v_idsm_rfi_creation_param.list};
		
			$.ajax({			
				url: "/saveIdsmOsSummaryListRfiCreation.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						$('#dlgIdsmRfiCreation').modal('hide');
						if(v_idsm_rfi_creation_callback)
						{		
							v_idsm_rfi_creation_callback("save-item", result.RFI_NO);
						}						
					}
				}
			});				
		}
	});	*/
}

function btnDlgIdsmRfiSetUpClick(){
	var param = {};
	$('#dlgIdsmRfiCreationPopUp').load("/idsmRfiCreationSetUpPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmRfiCreationSetUpPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					
					//btnSearchClick();
				}
			});	
		}
	});
}

function searchCode(){
	$.ajax({
		url: "/getIdsmRfiCreationCode.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {
			
			setCombo(data.results.AppliedProcedureCodeList, "selDlgIdsmRfiCreationAppliedProcedure", "selEn");
			setCombo(data.results.ProcedureCodeList, "selDlgIdsmRfiCreationProcedure", "selEn");
			setCombo(data.results.InspectionCodeList, "selDlgIdsmRfiCreationInspection", "selEn");
			
			if(data.results.AttachmentsList.length > 0){
				$('#txtDlgIdsmRfiCreationAttachments').val(data.results.AttachmentsList[0].NAME);
			}

			if(data.results.loginList.length > 0){
				$('#txtDlgIdsmRfiCreationPersonInCharge').val(data.results.loginList[0].EMP_NAME);
			}			
			
			if(data.results.dtList.length > 0){
				$('#txtDlgIdsmRfiCreationDate').val(data.results.dtList[0].CUR_DT);
			}	
        }
    });	
}

function txtDlgIdsmRfiCreationConstructionPkgNameNoChange(){
	var txt = $('#txtDlgIdsmRfiCreationConstructionPkgNameNo').val();
	
	$('#txtDlgIdsmRfiCreationDetailsForItems').val(txt);
	$('#txtDlgIdsmRfiCreationVolume').val(txt);
	
	
}

function initDatePicker() {
	
	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
	});
	
	$("input[name=inpDatePickerTime]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd"
	});	
	
	
}

