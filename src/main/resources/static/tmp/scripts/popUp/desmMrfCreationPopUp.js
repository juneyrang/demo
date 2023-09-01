var v_desm_mrf_creation_callback = null;
var v_desm_mrf_creation_param;
var dlgMrfPlGrid;



function initDesmMrfCreationPopUp(param , callback) {
	v_desm_mrf_creation_callback = callback;
    v_desm_mrf_creation_param = param;

	$('#dlgDesmMrfCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMrfCreation').click();
	});

	$('#dlgDesmMrfCreation').on('hidden.bs.modal', function () {
	  	closeDesmMrfCreationPopUp();
	});



    initDesmMrfCreationPopUpCode();
}

function initDesmMrfCreationPopUpCode() {

	$.ajax({
		url: "/getDesmRsiUserSubconList.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			if(results.length > 0) {
				if(v_desm_mrf_creation_param.MRF_HEADER_ID == null || v_desm_mrf_creation_param.MRF_HEADER_ID == "") {
					$("#txtDlgDesmMrfCreationRequestedBy").val(results[0]["USER_AD"]);
					$("#txtDlgDesmMrfCreationRequestedByAd").val(results[0]["USER_AD"]);
					$("#txtDlgDesmMrfCreationSubContractor").val(results[0]["DEPT_NAME"]);
				}

			}

			initTypeCode(initDesmMrfCreationPopUpControls);
        }
    });


}


function initDesmMrfCreationPopUpControls() {

	$('#dlgDesmMrfCreation').modal('show');

	initDatePicker();

	makeAutocomplete(
		"txtDlgDesmMrfCreationRequestedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrfCreationRequestedByAd,txtDlgDesmMrfCreationSubContractor",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrfCreationRequestedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrfCreationRequestedByAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrfCreationSubContractor").val(ui.item.value.split("|")[2]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMrfCreationCheckedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrfCreationCheckedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrfCreationCheckedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrfCreationCheckedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMrfCreationConfirmedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrfCreationConfirmedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrfCreationConfirmedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrfCreationConfirmedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMrfCreationApprovedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrfCreationApprovedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrfCreationApprovedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrfCreationApprovedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	$('#btnDlgDesmMrfCreationAtt').click(function () { btnDlgDesmMrfCreationAttClick(); return false; });
	$('#btnDlgDesmMrfCreationAdd').click(function () { btnDlgDesmMrfCreationAddClick(); return false; });
	$('#btnDlgDesmMrfCreationSave').click(function () { btnDlgDesmMrfCreationSaveClick(); return false; });
	$('#btnDlgDesmMrfCreationDelete').click(function () { btnDlgDesmMrfCreationDeleteClick(); return false; });

	$('#btnDlgDesmMrfCreationDel').click(function () { btnDlgDesmMrfCreationDelClick(); return false; });


	$('#btnDlgDesmMrfCreationRejectCheck').click(function () { btnDlgDesmMrfCreationRejectClick(); return false; });
	$('#btnDlgDesmMrfCreationRejectConfirm').click(function () { btnDlgDesmMrfCreationRejectClick(); return false; });
	$('#btnDlgDesmMrfCreationRejectApprove').click(function () { btnDlgDesmMrfCreationRejectClick(); return false; });

	$('#btnDlgDesmMrfCreationRequest').click(function () { btnDlgDesmMrfCreationRequestClick(); return false; });
	$('#btnDlgDesmMrfCreationCheck').click(function () { btnDlgDesmMrfCreationCheckClick(); return false; });
	$('#btnDlgDesmMrfCreationConfirm').click(function () { btnDlgDesmMrfCreationConfirmClick(); return false; });
	$('#btnDlgDesmMrfCreationApprove').click(function () { btnDlgDesmMrfCreationApproveClick(); return false; });
	$('#btnDlgDesmMrfCreationReport').click(function () { btnDlgDesmMrfCreationReportClick(); return false; });




	TGSetEvent("OnRenderFinish","DlgDesmMrfCreationGrid",function(grid){
		setDlgDesmMrfCreationBtn();
	});


	TGSetEvent("OnCopy","DlgDesmMrfCreationGrid",function(grid, txt){
		copyToClipboard(txt);
	});

	var gridCode = getGridCode();

		var dlgMrfPlGridCol = {
		"Cfg": {
			"id"				: "DlgDesmMrfCreationGrid"
			, "CfgId"			: "DlgDesmMrfCreationGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "510"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle" : "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "SafeCSS"			: "1"
			, "Code" : gridCode
			,"CopyCols" : "0"
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
		}
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		     {	"Name"	: "RSI_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		     {	"Name"	: "RSI_NAME", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		     {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
	   		     {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		     {	"Name"	: "SUBCONTRACTOR", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		     {	"Name"	: "APPROVED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_NO", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TAG_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "UNIT", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "IN_QTY", "Width": "100", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "HANDOVER_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MRF_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "RETURN_AVAILABLE_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "RETURN_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextRedColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "2",
					"RSI_NO"	: "RSI No.", "RSI_NORowSpan" : "2",
					"RSI_NAME"	: "RSI Name", "RSI_NAMERowSpan" : "2",
					"TYPE"	: "Type", "TYPERowSpan" : "2",
					"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
					"SUBCONTRACTOR"	: "Subcontractor", "SUBCONTRACTORRowSpan" : "2",
					"APPROVED_DATE"	: "RSI\nApproved Date", "APPROVED_DATERowSpan" : "2",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",
					"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
					"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
					"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
					"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
					"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
					"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2",
					"UNIT"	: "Unit", "UNITRowSpan" : "2",
					"IN_QTY"	: "IN\nQ’ty", "IN_QTYRowSpan" : "2",
					"REQ_QTY"	: "RSI\nQ’ty", "REQ_QTYRowSpan" : "2",
					"HANDOVER_QTY"	: "Handover\nQ’ty", "HANDOVER_QTYRowSpan" : "2",
					"MRF_QTY"	: "MRF\nQ’ty", "MRF_QTYRowSpan" : "2",
					"RETURN_AVAILABLE_QTY"	: "Return Available\nQ’ty", "RETURN_AVAILABLE_QTYRowSpan" : "2",
					"RETURN_QTY"	: "Return Request\nQ’ty", "RETURN_QTYRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"RSI_NO"	: "RSI No.",
					"RSI_NAME"	: "RSI Name",
					"TYPE"	: "Type",
					"CATEGORY"	: "Category",
					"SUBCONTRACTOR"	: "Subcontractor",
					"APPROVED_DATE"	: "RSI\nApproved Date",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.",
					"PACKAGE_NO"	: "Package No.",
					"DESCRIPTION"	: "Description of Goods\nSpecification",
					"DRAWING_NO"	: "Drawing No.",
					"TAG_NO"	: "Item Tag No.",
					"MATERIAL"	: "Material",
					"MATERIAL_CODE"	: "Material\nCode",
					"UNIT"	: "Unit",
					"IN_QTY"	: "IN\nQ’ty",
					"REQ_QTY"	: "RSI\nQ’ty",
					"HANDOVER_QTY"	: "Handover\nQ’ty",
					"MRF_QTY"	: "MRF\nQ’ty", "MRF_QTYRowSpan" : "2",
					"RETURN_AVAILABLE_QTY"	: "Return Available\nQ’ty",
					"RETURN_QTY"	: "Return Request\nQ’ty"}],
        "Foot" : [
				      { "Calculated": "1", "CanEdit": "0", "UNIT": $('#gridColTotalText').val(),"IN_QTYFormula": "sum()", "REQ_QTYFormula": "sum()", "HANDOVER_QTYFormula": "sum()",
				        "MRF_QTYFormula": "sum()", "RETURN_AVAILABLE_QTYFormula": "sum()", "RETURN_QTYFormula": "sum()", "Class" : "gridLinkText"   }
				   ]
	};

	dlgMrfPlGrid = TreeGrid( {Layout:{Data : dlgMrfPlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMrfCreationPlGrid" );

}

function setDlgDesmMrfCreationBtn() {

	if(v_desm_mrf_creation_param.MRF_HEADER_ID == null || v_desm_mrf_creation_param.MRF_HEADER_ID == "") {
		$('#btnDlgDesmMrfCreationCheck').remove();
		$('#btnDlgDesmMrfCreationConfirm').remove();
		$('#btnDlgDesmMrfCreationApprove').remove();
		$('#btnDlgDesmMrfCreationRejectCheck').remove();
		$('#btnDlgDesmMrfCreationRejectConfirm').remove();
		$('#btnDlgDesmMrfCreationRejectApprove').remove();
		$('#btnDlgDesmMrfCreationReport').remove();
		$('#btnDlgDesmMrfCreationDelete').remove();

		$('#txtDlgDesmMrfCreationReqDate').val(toDay);
	}
	else {
		searchData();
	}

	var list = v_desm_mrf_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
}

function searchData(type) {
	$.ajax({
		url: "/getDesmMrfInfoList.do",
		data: {"MRF_HEADER_ID" : v_desm_mrf_creation_param.MRF_HEADER_ID, "PROJECT_NO" : v_desm_mrf_creation_param.PROJECT_NO},
		success: function (data, textStatus, jqXHR) {

			dlgMrfPlGrid.Source.Data.Data.Body = [data.results.lineList];
			dlgMrfPlGrid.ReloadBody();

			if(type != "DTL") {
				var infoData = data.results.headerList[0];
				$('#txtDlgDesmMrfCreationMrfNo').val(infoData.MRF_NO);
				$('#txtDlgDesmMrfCreationMrfName').val(infoData.MRF_NAME);
				$('#txtDlgDesmMrfCreationReqDate').val(infoData.RETURN_REQ_DATE);
				$('#txtDlgDesmMrfCreationDesc').val(infoData.DESCRIPTION);
				$('#txtDlgDesmMrfCreationRemark').val(infoData.REMARK);
				$('#txtDlgDesmMrfCreationSubContractor').val(infoData.SUBCONTRACTOR);

				$('#txtDlgDesmMrfCreationRequestedBy').val(infoData.REQUESTED_BY);
				$('#txtDlgDesmMrfCreationRequestedByAd').val(infoData.REQUESTED_BY);
				$('#txtDlgDesmMrfCreationRequestDate').val(infoData.REQUEST_DATE);
				$('#txtDlgDesmMrfCreationCheckedBy').val(infoData.CHECKED_BY);
				$('#txtDlgDesmMrfCreationCheckedByAd').val(infoData.CHECKED_BY);
				$('#txtDlgDesmMrfCreationCheckedDate').val(infoData.CHECKED_DATE);
				$('#txtDlgDesmMrfCreationConfirmedBy').val(infoData.CONFIRMED_BY);
				$('#txtDlgDesmMrfCreationConfirmedByAd').val(infoData.CONFIRMED_BY);
				$('#txtDlgDesmMrfCreationConfirmedDate').val(infoData.CONFIRMED_DATE);
				$('#txtDlgDesmMrfCreationApprovedBy').val(infoData.APPROVED_BY);
				$('#txtDlgDesmMrfCreationApprovedByAd').val(infoData.APPROVED_BY);
				$('#txtDlgDesmMrfCreationApprovedDate').val(infoData.APPROVED_DATE);

				v_desm_mrf_creation_param.ATTACH_GRP_CD = infoData.ATTACH_GRP_CD;
				v_desm_mrf_creation_param.STATUS = infoData.STATUS;

				if(infoData.STATUS == "Incomplete" || infoData.STATUS == "Rejected") {
					$('#btnDlgDesmMrfCreationCheck').remove();
					$('#btnDlgDesmMrfCreationConfirm').remove();
					$('#btnDlgDesmMrfCreationApprove').remove();
					$('#btnDlgDesmMrfCreationRejectCheck').remove();
					$('#btnDlgDesmMrfCreationRejectConfirm').remove();
					$('#btnDlgDesmMrfCreationRejectApprove').remove();
					//$('#btnDlgDesmMrfCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					//$('#btnDlgDesmMrfCreationDelete').remove();

					//$("#txtDlgDesmMrfCreationRequestedBy").attr("readonly",true);
					//$("#txtDlgDesmMrfCreationCheckedBy").attr("readonly",true);
					//$("#txtDlgDesmMrfCreationConfirmedBy").attr("readonly",true);
					//$("#txtDlgDesmMrfCreationApprovedBy").attr("readonly",true);
				}
				else if(infoData.STATUS == "Pre-Checked") {
					gridReadOnly();

					$('#btnDlgDesmMrfCreationSave').remove();
					$('#btnDlgDesmMrfCreationRequest').remove();
					$('#btnDlgDesmMrfCreationConfirm').remove();
					$('#btnDlgDesmMrfCreationApprove').remove();
					//$('#btnDlgDesmMrfCreationRejectCheck').remove();
					$('#btnDlgDesmMrfCreationRejectConfirm').remove();
					$('#btnDlgDesmMrfCreationRejectApprove').remove();
					//$('#btnDlgDesmMrfCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmMrfCreationDelete').remove();
					$('#btnDlgDesmMrfCreationAdd').remove();
					$('#btnDlgDesmMrfCreationDel').remove();


					$("#txtDlgDesmMrfCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmMrfCreationMrfName").attr("readonly",true);
					$("#txtDlgDesmMrfCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmMrfCreationDesc").attr("readonly",true);
					//$("#txtDlgDesmMrfCreationRemark").attr("readonly",true);

				}
				else if(infoData.STATUS == "Pre-Confirmed") {
					gridReadOnly();

					$('#btnDlgDesmMrfCreationSave').remove();
					$('#btnDlgDesmMrfCreationRequest').remove();
					$('#btnDlgDesmMrfCreationCheck').remove();
					$('#btnDlgDesmMrfCreationApprove').remove();
					$('#btnDlgDesmMrfCreationRejectCheck').remove();
					//$('#btnDlgDesmMrfCreationRejectConfirm').remove();
					$('#btnDlgDesmMrfCreationRejectApprove').remove();
					//$('#btnDlgDesmMrfCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmMrfCreationDelete').remove();
					$('#btnDlgDesmMrfCreationAdd').remove();
					$('#btnDlgDesmMrfCreationDel').remove();

					$("#txtDlgDesmMrfCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmMrfCreationMrfName").attr("readonly",true);
					$("#txtDlgDesmMrfCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmMrfCreationDesc").attr("readonly",true);
					//$("#txtDlgDesmMrfCreationRemark").attr("readonly",true);
				}
				else if(infoData.STATUS == "Pre-Approved") {
					gridReadOnly();

					$('#btnDlgDesmMrfCreationSave').remove();
					$('#btnDlgDesmMrfCreationRequest').remove();
					$('#btnDlgDesmMrfCreationCheck').remove();
					$('#btnDlgDesmMrfCreationConfirm').remove();
					$('#btnDlgDesmMrfCreationRejectCheck').remove();
					$('#btnDlgDesmMrfCreationRejectConfirm').remove();
					//$('#btnDlgDesmMrfCreationRejectApprove').remove();
					//$('#btnDlgDesmMrfCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmMrfCreationDelete').remove();
					$('#btnDlgDesmMrfCreationAdd').remove();
					$('#btnDlgDesmMrfCreationDel').remove();

					$("#txtDlgDesmMrfCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmMrfCreationMrfName").attr("readonly",true);
					$("#txtDlgDesmMrfCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmMrfCreationDesc").attr("readonly",true);
					//$("#txtDlgDesmMrfCreationRemark").attr("readonly",true);
				}
				else if(infoData.STATUS == "Approved") {
					gridReadOnly();

					$('#btnDlgDesmMrfCreationSave').remove();
					$('#btnDlgDesmMrfCreationRequest').remove();
					$('#btnDlgDesmMrfCreationCheck').remove();
					$('#btnDlgDesmMrfCreationConfirm').remove();
					$('#btnDlgDesmMrfCreationApprove').remove();
					$('#btnDlgDesmMrfCreationRejectCheck').remove();
					$('#btnDlgDesmMrfCreationRejectConfirm').remove();
					$('#btnDlgDesmMrfCreationRejectApprove').remove();
					$('#btnDlgDesmMrfCreationDelete').remove();
					$('#btnDlgDesmMrfCreationAdd').remove();
					$('#btnDlgDesmMrfCreationDel').remove();
					//$('#btnDlgDesmMrfCreationReport').remove();

					$("#txtDlgDesmMrfCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmMrfCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmMrfCreationMrfName").attr("readonly",true);
					$("#txtDlgDesmMrfCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmMrfCreationDesc").attr("readonly",true);
					$("#txtDlgDesmMrfCreationRemark").attr("readonly",true);
				}

			}


        }
    });
}

function gridReadOnly() {

	var gridList = dlgMrfPlGrid.Rows;
	for (var key in gridList) {
		var gridRow = gridList[key];

		if(gridRow.Fixed == null){
			gridRow.RETURN_QTYCanEdit = 0;
			dlgMrfPlGrid.RefreshRow(gridRow);
		}
	}
}

function closeDesmMrfCreationPopUp() {
	dlgMrfPlGrid.Dispose();
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

function btnDlgDesmMrfCreationAttClick() {

	var param = Object.assign({}, v_desm_mrf_creation_param);


	if(param.ATTACH_GRP_CD == null) {
		param.ATTACH_GRP_CD = "";
	}

	if(param.MRF_HEADER_ID == null) {
		param.MRF_HEADER_ID = "";
	}

	param.fileUse = true;
	if(param.STATUS == "Pre-Checked" || param.STATUS == "Pre-Confirmed" || param.STATUS == "Pre-Approved" || param.STATUS == "Approved") {
		param.fileUse = false;
	}

	$('#dlgDesmMrfCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {

				if(returnParam.MRF_HEADER_ID == null || returnParam.MRF_HEADER_ID == ""){
					v_desm_mrf_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
				}
				else {
					if(v_desm_mrf_creation_callback)
					{
						v_desm_mrf_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
						v_desm_mrf_creation_callback("save-item", null);
					}
				}

			});
		}
	});
}

function btnDlgDesmMrfCreationAddClick() {

	var param = Object.assign({}, v_desm_mrf_creation_param);

	$('#dlgDesmMrfCreationPopUp').load("/desmMrfPlDtlPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initDesmMrfPlDtlPopUp(param, function (key, returnParam) {

				if(key == "select-item") {
					addGridRow(returnParam);
				}
			});
		}
	});
}

function addGridRow(list) {

	for(var i = 0; i < list.length; i++) {
		var row = list[i];

		var addCheck = true;
		var gridList = dlgMrfPlGrid.Rows;

		for (var key in gridList) {

			var gridRow = gridList[key];
			if(gridRow.Fixed == null){

				if((row.RSI_OUTGOING_ID == null || row.RSI_OUTGOING_ID == "") && (gridRow.RSI_OUTGOING_ID == null || gridRow.RSI_OUTGOING_ID == "")) {

					if(gridRow.RSI_LINE_ID == row.RSI_LINE_ID && gridRow.MATERIAL_CODE == row.MATERIAL_CODE){

						addCheck = false;
					}
				}
				else if((row.RSI_OUTGOING_ID != null && row.RSI_OUTGOING_ID != "") && (gridRow.RSI_OUTGOING_ID != null && gridRow.RSI_OUTGOING_ID != "")){
					if(gridRow.RSI_LINE_ID == row.RSI_LINE_ID && gridRow.RSI_OUTGOING_ID == row.RSI_OUTGOING_ID && gridRow.MATERIAL_CODE == row.MATERIAL_CODE){
						addCheck = false;
					}
				}
			}
		}


		if(addCheck){
			var gridAddRow = dlgMrfPlGrid.AddRow(null,null,1,null,null);
			gridAddRow.RSI_NO = row.RSI_NO;
			gridAddRow.RSI_NAME = row.RSI_NAME;
			gridAddRow.SUBCONTRACTOR = row.SUBCONTRACTOR;
			gridAddRow.APPROVED_DATE = row.APPROVED_DATE;
			gridAddRow.PACKAGE_LIST_NO = row.PACKAGE_LIST_NO;
			gridAddRow.PACKAGE_NO = row.PACKAGE_NO;
			gridAddRow.DESCRIPTION = row.DESCRIPTION;
			gridAddRow.DRAWING_NO = row.DRAWING_NO;
			gridAddRow.TAG_NO = row.TAG_NO;
			gridAddRow.MATERIAL = row.MATERIAL;
			gridAddRow.MATERIAL_CODE = row.MATERIAL_CODE;
			gridAddRow.UNIT = row.UNIT;
			gridAddRow.IN_QTY = row.IN_QTY;
			gridAddRow.REQ_QTY = row.REQ_QTY;
			gridAddRow.HANDOVER_QTY = row.HANDOVER_QTY;
			gridAddRow.MRF_QTY = row.MRF_QTY;
			gridAddRow.RETURN_AVAILABLE_QTY = row.RETURN_AVAILABLE_QTY;
			gridAddRow.RETURN_QTY = row.RETURN_AVAILABLE_QTY;
			gridAddRow.RSI_LINE_ID = row.RSI_LINE_ID;
			gridAddRow.RSI_OUTGOING_ID = row.RSI_OUTGOING_ID;

			dlgMrfPlGrid.RefreshRow(gridAddRow);
		}
	}
}

function btnDlgDesmMrfCreationSaveClick() {
	save("Incomplete");
}

function btnDlgDesmMrfCreationRequestClick() {
	save("Pre-Checked");
}

function btnDlgDesmMrfCreationCheckClick() {
	save("Pre-Confirmed");
}

function btnDlgDesmMrfCreationConfirmClick() {
	save("Pre-Approved");
}

function btnDlgDesmMrfCreationApproveClick() {
	save("Approved");
}


function btnDlgDesmMrfCreationDelClick() {
	dlgMrfPlGrid.ActionAcceptEdit();

	var selectList = dlgMrfPlGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				if(row.Added != null && row.Added == 1){
					dlgMrfPlGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"MRF_LINE_ID" : row.MRF_LINE_ID, "MATERIAL_CODE" : row.MATERIAL_CODE, "PROJECT_NO" : v_desm_mrf_creation_param.PROJECT_NO, "RSI_LINE_ID" : row.RSI_LINE_ID});
					deleteList.push(deleteRow);
				}
			}

			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);
				var paramData = {"deleteList" : list};

				$.ajax({
					url: "/deleteDesmMrfDtl.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchData("DTL");
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}
		}
	});


}

function btnDlgDesmMrfCreationRejectClick() {
	dlgMrfPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {

			var paramData = objNullCheck({"MRF_HEADER_ID" : v_desm_mrf_creation_param.MRF_HEADER_ID, "REMARK" : $('#txtDlgDesmMrfCreationRemark').val()});

			$.ajax({
				url: "/saveDesmMrfReject.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {

						sendMail($('#alertRejectSuccess').val());

					}
				}
			});

		}
	});
}

function btnDlgDesmMrfCreationDeleteClick() {
	dlgMrfPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"MRF_HEADER_ID" : v_desm_mrf_creation_param.MRF_HEADER_ID, "PROJECT_NO" : v_desm_mrf_creation_param.PROJECT_NO};

			$.ajax({
				url: "/deleteDesmMrf.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {

						alert_success($('#alertSuccess').val());

						if(v_desm_mrf_creation_callback) {
							v_desm_mrf_creation_callback("save-item", null);
						}

						$('#dlgDesmMrfCreation').modal('hide');
					}
				}
			});
		}
	});
}


function save(transType) {
	dlgMrfPlGrid.ActionAcceptEdit();

	if($('#txtDlgDesmMrfCreationRequestedBy').val().length < 2 || $('#txtDlgDesmMrfCreationRequestedByAd').val() == ""){
		$('#txtDlgDesmMrfCreationRequestedBy').val("");
		$('#txtDlgDesmMrfCreationRequestedByAd').val("");
	}

	if($('#txtDlgDesmMrfCreationCheckedBy').val().length < 2 || $('#txtDlgDesmMrfCreationCheckedByAd').val() == ""){
		$('#txtDlgDesmMrfCreationCheckedBy').val("");
		$('#txtDlgDesmMrfCreationCheckedByAd').val("");
	}

	if($('#txtDlgDesmMrfCreationConfirmedBy').val().length < 2 || $('#txtDlgDesmMrfCreationConfirmedByAd').val() == ""){
		$('#txtDlgDesmMrfCreationConfirmedBy').val("");
		$('#txtDlgDesmMrfCreationConfirmedByAd').val("");
	}

	if($('#txtDlgDesmMrfCreationApprovedBy').val().length < 2 || $('#txtDlgDesmMrfCreationApprovedByAd').val() == ""){
		$('#txtDlgDesmMrfCreationApprovedBy').val("");
		$('#txtDlgDesmMrfCreationApprovedByAd').val("");
	}

	var chkValidation = checkRequiredField("divDesmMrfCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var gridLength = dlgMrfPlGrid.RowCount;

	if(gridLength < 1) {
		alert_modal("", $('#alertSaveMrfQtyNullErr').val());
		return;
	}

	var changeObject = dlgMrfPlGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = dlgMrfPlGrid.GetRowById(rowId);

		if(row.RETURN_QTY == null || row.RETURN_QTY == ""){
			var msg = $('#alertSaveMrfQtyNullErr').val();
			alert_modal("", msg);
			return;
		}
	}

	var alMsg = "";
	if(transType == "Incomplete") {
		alMsg = $('#alertSave').val();
	}
	else if(transType == "Pre-Checked") {
		alMsg = $('#alertRequest').val();
	}
	else if(transType == "Pre-Confirmed") {
		alMsg = $('#alertCheck').val();
	}
	else if(transType == "Pre-Approved") {
		alMsg = $('#alertConfirm').val();
	}
	else if(transType == "Approved") {
		alMsg = $('#alertApprove').val();
	}

	confirm_modal("", alMsg, null, function (callobj, result) {
		if(result) {

			var updateList = [];
			for(var i = 0; i < changeList.length; i++){
				var rowId = changeList[i].id;
				var row = dlgMrfPlGrid.GetRowById(rowId);


				var updateRow = objNullCheck({"MRF_LINE_ID" : row.MRF_LINE_ID, "RSI_LINE_ID" : row.RSI_LINE_ID, "RSI_OUTGOING_ID" : row.RSI_OUTGOING_ID, "REQ_RETURN_QTY" : row.RETURN_QTY, "MATERIAL_CODE" : row.MATERIAL_CODE});

				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);

			var paramData = objNullCheck({"MRF_HEADER_ID" : v_desm_mrf_creation_param.MRF_HEADER_ID, "MRF_NAME" : $('#txtDlgDesmMrfCreationMrfName').val(),
							 "STATUS" : v_desm_mrf_creation_param.STATUS, "RETURN_REQ_DATE" : $('#txtDlgDesmMrfCreationReqDate').val(),
							 "DESCRIPTION" : $('#txtDlgDesmMrfCreationDesc').val(), "SUBCONTRACTOR" : $('#txtDlgDesmMrfCreationSubContractor').val(),
							 "REMARK" : $('#txtDlgDesmMrfCreationRemark').val(), "MRF_NO" : $('#txtDlgDesmMrfCreationMrfNo').val(),
							 "REQUESTED_BY" : $('#txtDlgDesmMrfCreationRequestedByAd').val(), "CHECKED_BY" : $('#txtDlgDesmMrfCreationCheckedByAd').val(),
							 "CONFIRMED_BY" : $('#txtDlgDesmMrfCreationConfirmedByAd').val(), "APPROVED_BY" : $('#txtDlgDesmMrfCreationApprovedByAd').val(),
							 "ATTACH_GRP_CD" : v_desm_mrf_creation_param.ATTACH_GRP_CD, "TRANS_TYPE" : transType, "PROJECT_NO" : v_desm_mrf_creation_param.PROJECT_NO});

			paramData.updateList = list;

			$.ajax({
				url: "/saveDesmMrfSave.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					v_desm_mrf_creation_param.MRF_HEADER_ID = result.MRF_HEADER_ID;
					v_desm_mrf_creation_param.STATUS = result.STATUS;
					if (result.error != null) {

						if(result.error == "QTY") {

							for(var i = 0; i < changeList.length; i++){
								var rowId = changeList[i].id;
								var row = dlgMrfPlGrid.GetRowById(rowId);


								if(result.RETURN_TYPE == "RSI Cancel" && (row.RSI_OUTGOING_ID == null || row.RSI_OUTGOING_ID == "")){
									if(result.RSI_LINE_ID == row.RSI_LINE_ID && result.MATERIAL_CODE == row.MATERIAL_CODE){
										row.RETURN_AVAILABLE_QTY = result.RETURN_AVAILABLE_QTY;
										dlgMrfPlGrid.RefreshRow(row);
									}
								}
								else if(result.RETURN_TYPE == "Outgoing Return" && (row.RSI_OUTGOING_ID != null && row.RSI_OUTGOING_ID != "")){
									if(result.RSI_LINE_ID == row.RSI_LINE_ID && result.RSI_OUTGOING_ID == row.RSI_OUTGOING_ID && result.MATERIAL_CODE == row.MATERIAL_CODE){
										row.RETURN_AVAILABLE_QTY = result.RETURN_AVAILABLE_QTY;
										dlgMrfPlGrid.RefreshRow(row);
									}
								}
							}

							var msg = $('#alertSaveMrfQtyErr').val();
							alert_fail(msg);

						}
						else
						{
							alert_fail(result.error);
						}

					} else {



						if(transType == "Incomplete") {

							alert_success($('#alertSuccess').val());

							if(v_desm_mrf_creation_callback) {
								v_desm_mrf_creation_callback("save-item", null);
							}

							$('#dlgDesmMrfCreation').modal('hide');

						}
						else {
							sendMail($('#alertSuccess').val());
						}


					}
				}
			});

		}
	});
}

function sendMail(msg) {
	var paramData = {"MRF_HEADER_ID" : v_desm_mrf_creation_param.MRF_HEADER_ID, "STATUS" : v_desm_mrf_creation_param.STATUS};

	$.ajax({
		url: "/sendMailDesmMrf.do",
		data: paramData,
		success: function(result, textStatus, jqXHR) {
			if(result.error != null) {
				alert_fail(result.error);
			}
			else {
				if(result.error_code != null && result.error_code == "-2") {
					alert_fail($('#alertMailFail').val());
				}
				else {
					alert_success(msg);
				}


				if(v_desm_mrf_creation_callback) {
					v_desm_mrf_creation_callback("save-item", null);
				}

				$('#dlgDesmMrfCreation').modal('hide');
			}
		}
	});

}

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}

	return obj;
}

function btnDlgDesmMrfCreationReportClick() {
	var popup = window.open('/rsiMrd.do?seq=' + v_desm_mrf_creation_param.MRF_HEADER_ID + '&fileNm=RD_'+parent.document.querySelector("#spanDefaultProject").innerHTML.split("[")[1].split("-")[0].trim()+'_MRF', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
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


