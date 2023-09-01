var v_desm_rsi_creation_callback = null;
var v_desm_rsi_creation_param;
var dlgPlGrid;



function initDesmRsiCreationPopUp(param , callback) {
	v_desm_rsi_creation_callback = callback;
    v_desm_rsi_creation_param = param;

	$('#dlgDesmRsiCreation').on('shown.bs.modal', function () {
		$('#dlgDesmRsiCreation').click();
	});

	$('#dlgDesmRsiCreation').on('hidden.bs.modal', function () {
	  	closeDesmRsiCreationPopUp();
	});



    initDesmRsiCreationPopUpCode();
}

function initDesmRsiCreationPopUpCode() {

	$.ajax({
		url: "/getDesmRsiUserSubconList.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			if(results.length > 0) {
				if(v_desm_rsi_creation_param.RSI_HEADER_ID == null || v_desm_rsi_creation_param.RSI_HEADER_ID == "") {
					$("#txtDlgDesmRsiCreationRequestedBy").val(results[0]["USER_AD"]);
					$("#txtDlgDesmRsiCreationRequestedByAd").val(results[0]["USER_AD"]);
					$("#txtDlgDesmRsiCreationSubContractor").val(results[0]["DEPT_NAME"]);
				}

			}
        }
    });

    initTypeCode(initDesmRsiCreationPopUpControls);
}


function initDesmRsiCreationPopUpControls() {

	$('#dlgDesmRsiCreation').modal('show');

	initDatePicker();

	makeAutocomplete(
		"txtDlgDesmRsiCreationRequestedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmRsiCreationRequestedByAd,txtDlgDesmRsiCreationSubContractor",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmRsiCreationRequestedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmRsiCreationRequestedByAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmRsiCreationSubContractor").val(ui.item.value.split("|")[2]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmRsiCreationCheckedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmRsiCreationCheckedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmRsiCreationCheckedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmRsiCreationCheckedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmRsiCreationConfirmedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmRsiCreationConfirmedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmRsiCreationConfirmedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmRsiCreationConfirmedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmRsiCreationApprovedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmRsiCreationApprovedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmRsiCreationApprovedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmRsiCreationApprovedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	$('#btnDlgDesmRsiCreationAtt').click(function () { btnDlgDesmRsiCreationAttClick(); return false; });
	$('#btnDlgDesmRsiCreationAdd').click(function () { btnDlgDesmRsiCreationAddClick(); return false; });
	$('#btnDlgDesmRsiCreationSave').click(function () { btnDlgDesmRsiCreationSaveClick(); return false; });
	$('#btnDlgDesmRsiCreationDelete').click(function () { btnDlgDesmRsiCreationDeleteClick(); return false; });

	$('#btnDlgDesmRsiCreationDel').click(function () { btnDlgDesmRsiCreationDelClick(); return false; });


	$('#btnDlgDesmRsiCreationRejectCheck').click(function () { btnDlgDesmRsiCreationRejectClick(); return false; });
	$('#btnDlgDesmRsiCreationRejectConfirm').click(function () { btnDlgDesmRsiCreationRejectClick(); return false; });
	$('#btnDlgDesmRsiCreationRejectApprove').click(function () { btnDlgDesmRsiCreationRejectClick(); return false; });

	$('#btnDlgDesmRsiCreationRequest').click(function () { btnDlgDesmRsiCreationRequestClick(); return false; });
	$('#btnDlgDesmRsiCreationCheck').click(function () { btnDlgDesmRsiCreationCheckClick(); return false; });
	$('#btnDlgDesmRsiCreationConfirm').click(function () { btnDlgDesmRsiCreationConfirmClick(); return false; });
	$('#btnDlgDesmRsiCreationApprove').click(function () { btnDlgDesmRsiCreationApproveClick(); return false; });
	$('#btnDlgDesmRsiCreationReport').click(function () { btnDlgDesmRsiCreationReportClick(); return false; });




	TGSetEvent("OnRenderFinish","dlgDesmRsiCreationGrid",function(grid){
		setDlgDesmRsiCreationBtn();
	});


	TGSetEvent("OnCopy","dlgDesmRsiCreationGrid",function(grid, txt){
		copyToClipboard(txt);
	});

	var gridCode = getGridCode();

		var dlgPlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmRsiCreationGrid"
			, "CfgId"			: "dlgDesmRsiCreationGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "6"
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
	  /* "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_NO", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TAG_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "UNIT", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "IN_QTY", "Width": "100", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_AVAILABLE_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextRedColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
	   			 {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_TYPE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }], */
		"Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
  			 {	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "PACKAGE_NO", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "DRAWING_NO", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "TAG_NO", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "UNIT", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "IN_QTY", "Width": "80", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "REQ_AVAILABLE_QTY", "Width": "80", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "REQ_QTY", "Width": "80", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextRedColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
			 {	"Name"	: "MIR_INSPECTION", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "TYPE", "Width": "120", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
  			 {	"Name"	: "CATEGORY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "PACKAGE_TYPE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],	
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "2",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",
					"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
					"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
					"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
					"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
					"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
					"UNIT"	: "Unit", "UNITRowSpan" : "2",
					"IN_QTY"	: "IN\nQ’ty", "IN_QTYRowSpan" : "2",
					"REQ_AVAILABLE_QTY"	: "Req Available\nQ’ty", "REQ_AVAILABLE_QTYRowSpan" : "2",
					"REQ_QTY"	: "Request\nQ’ty", "REQ_QTYRowSpan" : "2",
					"MIR_INSPECTION"	: "MIR Inspection", "MIR_INSPECTIONRowSpan" : "2",
					"TYPE"	: "Type", "TYPERowSpan" : "2",
					"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2",
					"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
					"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.",
					"PACKAGE_NO"	: "Package No.",
					"DESCRIPTION"	: "Description of Goods\nSpecification",
					"DRAWING_NO"	: "Drawing No.",
					"TAG_NO"	: "Item Tag No.",
					"MATERIAL"	: "Material",
					"UNIT"	: "Unit",
					"IN_QTY"	: "IN\nQ’ty",
					"REQ_AVAILABLE_QTY"	: "Req Available\nQ’ty",
					"REQ_QTY"	: "Request\nQ’ty",
					"MIR_INSPECTION" : "MIR Inspection",
					"TYPE"	: "Type",
					"CATEGORY"	: "Category",
					"REMARKS"	: "Remarks",
					"PACKAGE_TYPE"	: "Package\nType",
					"MATERIAL_CODE"	: "Material\nCode"}],
        "Foot" : [
				      { "Calculated": "1", "CanEdit": "0", "UNIT": $('#gridColTotalText').val(),"IN_QTYFormula": "sum()", "REQ_AVAILABLE_QTYFormula": "sum()", "REQ_QTYFormula": "sum()", "Class" : "gridLinkText"   }
				   ]
	};

	dlgPlGrid = TreeGrid( {Layout:{Data : dlgPlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmRsiCreationPlGrid" );

}

function setDlgDesmRsiCreationBtn() {

	if(v_desm_rsi_creation_param.RSI_HEADER_ID == null || v_desm_rsi_creation_param.RSI_HEADER_ID == "") {
		$('#btnDlgDesmRsiCreationCheck').remove();
		$('#btnDlgDesmRsiCreationConfirm').remove();
		$('#btnDlgDesmRsiCreationApprove').remove();
		$('#btnDlgDesmRsiCreationRejectCheck').remove();
		$('#btnDlgDesmRsiCreationRejectConfirm').remove();
		$('#btnDlgDesmRsiCreationRejectApprove').remove();
		$('#btnDlgDesmRsiCreationReport').remove();
		$('#btnDlgDesmRsiCreationDelete').remove();



		//$("#txtDlgDesmRsiCreationRequestedBy").attr("readonly",true);
		//$("#txtDlgDesmRsiCreationCheckedBy").attr("readonly",true);
		//$("#txtDlgDesmRsiCreationConfirmedBy").attr("readonly",true);
		//$("#txtDlgDesmRsiCreationApprovedBy").attr("readonly",true);

		$('#txtDlgDesmRsiCreationReqDate').val(toDay);
	}
	else {
		searchData();
	}

	var list = v_desm_rsi_creation_param.menuAuthList;
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
		url: "/getDesmRsiInfoList.do",
		data: {"RSI_HEADER_ID" : v_desm_rsi_creation_param.RSI_HEADER_ID},
		success: function (data, textStatus, jqXHR) {

			dlgPlGrid.Source.Data.Data.Body = [data.results.lineList];
			dlgPlGrid.ReloadBody();

			if(type != "DTL") {
				var infoData = data.results.headerList[0];
				$('#txtDlgDesmRsiCreationRsiNo').val(infoData.RSI_NO);
				$('#txtDlgDesmRsiCreationRsiName').val(infoData.RSI_NAME);
				$('#txtDlgDesmRsiCreationReqDate').val(infoData.HANDOVER_DATE);
				$('#txtDlgDesmRsiCreationDesc').val(infoData.DESCRIPTION);
				$('#txtDlgDesmRsiCreationRemark').val(infoData.REMARK);
				$('#txtDlgDesmRsiCreationSubContractor').val(infoData.SUBCONTRACTOR);

				$('#txtDlgDesmRsiCreationRequestedBy').val(infoData.REQUESTED_BY);
				$('#txtDlgDesmRsiCreationRequestedByAd').val(infoData.REQUESTED_BY);
				$('#txtDlgDesmRsiCreationRequestDate').val(infoData.REQUEST_DATE);
				$('#txtDlgDesmRsiCreationCheckedBy').val(infoData.CHECKED_BY);
				$('#txtDlgDesmRsiCreationCheckedByAd').val(infoData.CHECKED_BY);
				$('#txtDlgDesmRsiCreationCheckedDate').val(infoData.CHECKED_DATE);
				$('#txtDlgDesmRsiCreationConfirmedBy').val(infoData.CONFIRMED_BY);
				$('#txtDlgDesmRsiCreationConfirmedByAd').val(infoData.CONFIRMED_BY);
				$('#txtDlgDesmRsiCreationConfirmedDate').val(infoData.CONFIRMED_DATE);
				$('#txtDlgDesmRsiCreationApprovedBy').val(infoData.APPROVED_BY);
				$('#txtDlgDesmRsiCreationApprovedByAd').val(infoData.APPROVED_BY);
				$('#txtDlgDesmRsiCreationApprovedDate').val(infoData.APPROVED_DATE);

				v_desm_rsi_creation_param.ATTACH_GRP_CD = infoData.ATTACH_GRP_CD;
				v_desm_rsi_creation_param.STATUS = infoData.STATUS;

				if(infoData.STATUS == "Incomplete" || infoData.STATUS == "Rejected") {
					$('#btnDlgDesmRsiCreationCheck').remove();
					$('#btnDlgDesmRsiCreationConfirm').remove();
					$('#btnDlgDesmRsiCreationApprove').remove();
					$('#btnDlgDesmRsiCreationRejectCheck').remove();
					$('#btnDlgDesmRsiCreationRejectConfirm').remove();
					$('#btnDlgDesmRsiCreationRejectApprove').remove();
					// $('#btnDlgDesmRsiCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					//$('#btnDlgDesmRsiCreationDelete').remove();

					//$("#txtDlgDesmRsiCreationRequestedBy").attr("readonly",true);
					//$("#txtDlgDesmRsiCreationCheckedBy").attr("readonly",true);
					//$("#txtDlgDesmRsiCreationConfirmedBy").attr("readonly",true);
					//$("#txtDlgDesmRsiCreationApprovedBy").attr("readonly",true);
				}
				else if(infoData.STATUS == "Pre-Checked") {
					gridReadOnly();

					$('#btnDlgDesmRsiCreationSave').remove();
					$('#btnDlgDesmRsiCreationRequest').remove();
					$('#btnDlgDesmRsiCreationConfirm').remove();
					$('#btnDlgDesmRsiCreationApprove').remove();
					//$('#btnDlgDesmRsiCreationRejectCheck').remove();
					$('#btnDlgDesmRsiCreationRejectConfirm').remove();
					$('#btnDlgDesmRsiCreationRejectApprove').remove();
					//$('#btnDlgDesmRsiCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmRsiCreationDelete').remove();
					$('#btnDlgDesmRsiCreationAdd').remove();
					$('#btnDlgDesmRsiCreationDel').remove();


					$("#txtDlgDesmRsiCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmRsiCreationRsiName").attr("readonly",true);
					$("#txtDlgDesmRsiCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmRsiCreationDesc").attr("readonly",true);
					//$("#txtDlgDesmRsiCreationRemark").attr("readonly",true);

				}
				else if(infoData.STATUS == "Pre-Confirmed") {
					gridReadOnly();

					$('#btnDlgDesmRsiCreationSave').remove();
					$('#btnDlgDesmRsiCreationRequest').remove();
					$('#btnDlgDesmRsiCreationCheck').remove();
					$('#btnDlgDesmRsiCreationApprove').remove();
					$('#btnDlgDesmRsiCreationRejectCheck').remove();
					//$('#btnDlgDesmRsiCreationRejectConfirm').remove();
					$('#btnDlgDesmRsiCreationRejectApprove').remove();
					// $('#btnDlgDesmRsiCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmRsiCreationDelete').remove();
					$('#btnDlgDesmRsiCreationAdd').remove();
					$('#btnDlgDesmRsiCreationDel').remove();

					$("#txtDlgDesmRsiCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmRsiCreationRsiName").attr("readonly",true);
					$("#txtDlgDesmRsiCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmRsiCreationDesc").attr("readonly",true);
					//$("#txtDlgDesmRsiCreationRemark").attr("readonly",true);
				}
				else if(infoData.STATUS == "Pre-Approved") {
					gridReadOnly();

					$('#btnDlgDesmRsiCreationSave').remove();
					$('#btnDlgDesmRsiCreationRequest').remove();
					$('#btnDlgDesmRsiCreationCheck').remove();
					$('#btnDlgDesmRsiCreationConfirm').remove();
					$('#btnDlgDesmRsiCreationRejectCheck').remove();
					$('#btnDlgDesmRsiCreationRejectConfirm').remove();
					//$('#btnDlgDesmRsiCreationRejectApprove').remove();
					// $('#btnDlgDesmRsiCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmRsiCreationDelete').remove();
					$('#btnDlgDesmRsiCreationAdd').remove();
					$('#btnDlgDesmRsiCreationDel').remove();

					$("#txtDlgDesmRsiCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmRsiCreationRsiName").attr("readonly",true);
					$("#txtDlgDesmRsiCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmRsiCreationDesc").attr("readonly",true);
					//$("#txtDlgDesmRsiCreationRemark").attr("readonly",true);
				}
				else if(infoData.STATUS == "Approved") {
					gridReadOnly();

					$('#btnDlgDesmRsiCreationSave').remove();
					$('#btnDlgDesmRsiCreationRequest').remove();
					$('#btnDlgDesmRsiCreationCheck').remove();
					$('#btnDlgDesmRsiCreationConfirm').remove();
					$('#btnDlgDesmRsiCreationApprove').remove();
					$('#btnDlgDesmRsiCreationRejectCheck').remove();
					$('#btnDlgDesmRsiCreationRejectConfirm').remove();
					$('#btnDlgDesmRsiCreationRejectApprove').remove();
					$('#btnDlgDesmRsiCreationDelete').remove();
					$('#btnDlgDesmRsiCreationAdd').remove();
					$('#btnDlgDesmRsiCreationDel').remove();

					$("#txtDlgDesmRsiCreationRequestedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationConfirmedBy").attr("readonly",true);
					$("#txtDlgDesmRsiCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmRsiCreationRsiName").attr("readonly",true);
					$("#txtDlgDesmRsiCreationReqDate").attr("disabled", true);
					$("#txtDlgDesmRsiCreationDesc").attr("readonly",true);
					$("#txtDlgDesmRsiCreationRemark").attr("readonly",true);
				}

			}


        }
    });
}

function gridReadOnly() {

	var gridList = dlgPlGrid.Rows;
	for (var key in gridList) {
		var gridRow = gridList[key];

		if(gridRow.Fixed == null){
			gridRow.REQ_QTYCanEdit = 0;
			dlgPlGrid.RefreshRow(gridRow);
		}
	}
}

function closeDesmRsiCreationPopUp() {
	dlgPlGrid.Dispose();
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

function btnDlgDesmRsiCreationAttClick() {

	var param = Object.assign({}, v_desm_rsi_creation_param);


	if(param.ATTACH_GRP_CD == null) {
		param.ATTACH_GRP_CD = "";
	}

	if(param.RSI_HEADER_ID == null) {
		param.RSI_HEADER_ID = "";
	}

	param.fileUse = true;
	if(param.STATUS == "Pre-Checked" || param.STATUS == "Pre-Confirmed" || param.STATUS == "Pre-Approved" || param.STATUS == "Approved") {
		param.fileUse = false;
	}

	$('#dlgDesmRsiCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {

				if(returnParam.RSI_HEADER_ID == null || returnParam.RSI_HEADER_ID == ""){
					v_desm_rsi_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
				}
				else {
					if(v_desm_rsi_creation_callback)
					{
						v_desm_rsi_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
						v_desm_rsi_creation_callback("save-item", null);
					}
				}

			});
		}
	});
}

function btnDlgDesmRsiCreationAddClick() {

	var param = Object.assign({}, v_desm_rsi_creation_param);

	$('#dlgDesmRsiCreationPopUp').load("/desmRsiPlDtlPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initDesmRsiPlDtlPopUp(param, function (key, returnParam) {

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
		var gridList = dlgPlGrid.Rows;
		for (var key in gridList) {

			var gridRow = gridList[key];
			if(gridRow.Fixed == null){
				if(gridRow.MATERIAL_CODE == row.MATERIAL_CODE){

					addCheck = false;
				}

				if(gridRow.PROJECT_NO != row.PROJECT_NO) {
					alert_modal("", $('#alertAlreadyProject').val());
					return;
				}
			}
		}

		if(addCheck){
			var gridAddRow = dlgPlGrid.AddRow(null,null,1,null,null);
			gridAddRow.PACKAGE_LIST_NO = row.PACKAGE_LIST_NO;
			gridAddRow.PACKAGE_NO = row.PACKAGE_NO;
			gridAddRow.DESCRIPTION = row.DESCRIPTION;
			gridAddRow.DRAWING_NO = row.DRAWING_NO;
			gridAddRow.TAG_NO = row.TAG_NO;
			gridAddRow.MATERIAL = row.MATERIAL;
			gridAddRow.MATERIAL_CODE = row.MATERIAL_CODE;
			gridAddRow.PACKAGE_TYPE = row.PACKAGE_TYPE;
			gridAddRow.UNIT = row.UNIT;
			gridAddRow.IN_QTY = row.IN_QTY;
			gridAddRow.REQ_AVAILABLE_QTY = row.REQ_AVAILABLE_QTY;
			gridAddRow.REQ_QTY = row.REQ_AVAILABLE_QTY;
			gridAddRow.PROJECT_NO = row.PROJECT_NO;
			gridAddRow.REMARKS = row.REMARKS;
			gridAddRow.MIR_INSPECTION = row.MIR_INSPECTION;
			dlgPlGrid.RefreshRow(gridAddRow);
		}
	}
}

function btnDlgDesmRsiCreationSaveClick() {
	save("Incomplete");
}

function btnDlgDesmRsiCreationRequestClick() {
	save("Pre-Checked");
}

function btnDlgDesmRsiCreationCheckClick() {
	save("Pre-Confirmed");
}

function btnDlgDesmRsiCreationConfirmClick() {
	save("Pre-Approved");
}

function btnDlgDesmRsiCreationApproveClick() {
	save("Approved");
}


function btnDlgDesmRsiCreationDelClick() {
	dlgPlGrid.ActionAcceptEdit();

	var selectList = dlgPlGrid.GetSelRows();
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
					dlgPlGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"RSI_LINE_ID" : row.RSI_LINE_ID, "MATERIAL_CODE" : row.MATERIAL_CODE});
					deleteList.push(deleteRow);
				}
			}

			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);
				var paramData = {"deleteList" : list};

				$.ajax({
					url: "/deleteDesmRsiDtl.do",
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

function btnDlgDesmRsiCreationRejectClick() {
	dlgPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			// FIXME: Remark 추가해서 Reject할 때 저장될 수 있어야 함.
			var paramData = objNullCheck({"RSI_HEADER_ID" : v_desm_rsi_creation_param.RSI_HEADER_ID, "REMARK" : $('#txtDlgDesmRsiCreationRemark').val()});

			$.ajax({
				url: "/saveDesmRsiReject.do",
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

function btnDlgDesmRsiCreationDeleteClick() {
	dlgPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"RSI_HEADER_ID" : v_desm_rsi_creation_param.RSI_HEADER_ID};

			$.ajax({
				url: "/deleteDesmRsi.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {

						alert_success($('#alertSuccess').val());

						if(v_desm_rsi_creation_callback) {
							v_desm_rsi_creation_callback("save-item", null);
						}

						$('#dlgDesmRsiCreation').modal('hide');
					}
				}
			});
		}
	});
}


function save(transType) {
	dlgPlGrid.ActionAcceptEdit();

	if($('#txtDlgDesmRsiCreationRequestedBy').val().length < 2 || $('#txtDlgDesmRsiCreationRequestedByAd').val() == ""){
		$('#txtDlgDesmRsiCreationRequestedBy').val("");
		$('#txtDlgDesmRsiCreationRequestedByAd').val("");
	}

	if($('#txtDlgDesmRsiCreationCheckedBy').val().length < 2 || $('#txtDlgDesmRsiCreationCheckedByAd').val() == ""){
		$('#txtDlgDesmRsiCreationCheckedBy').val("");
		$('#txtDlgDesmRsiCreationCheckedByAd').val("");
	}

	if($('#txtDlgDesmRsiCreationConfirmedBy').val().length < 2 || $('#txtDlgDesmRsiCreationConfirmedByAd').val() == ""){
		$('#txtDlgDesmRsiCreationConfirmedBy').val("");
		$('#txtDlgDesmRsiCreationConfirmedByAd').val("");
	}

	if($('#txtDlgDesmRsiCreationApprovedBy').val().length < 2 || $('#txtDlgDesmRsiCreationApprovedByAd').val() == ""){
		$('#txtDlgDesmRsiCreationApprovedBy').val("");
		$('#txtDlgDesmRsiCreationApprovedByAd').val("");
	}

	var chkValidation = checkRequiredField("divDlgDesmRsiCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var gridLength = dlgPlGrid.RowCount;

	if(gridLength < 1) {
		alert_modal("", $('#alertSaveRsiQtyNullErr').val());
		return;
	}

	var changeObject = dlgPlGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = dlgPlGrid.GetRowById(rowId);

		if(row.REQ_QTY == null || row.REQ_QTY == ""){
			var msg = $('#alertSaveRsiQtyNullErr').val() + " [Material Code : " + row.MATERIAL_CODE + "]";
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
				var row = dlgPlGrid.GetRowById(rowId);


				var updateRow = objNullCheck({"RSI_LINE_ID" : row.RSI_LINE_ID, "PACKING_LIST_NO" : row.PACKAGE_LIST_NO, "PACKAGE_NO" : row.PACKAGE_NO,
											  "MATERIAL_CODE" : row.MATERIAL_CODE, "DESCRIPTION" : row.DESCRIPTION, "DRAWING_NO" : row.DRAWING_NO,
											  "ITEM_NO" : row.TAG_NO, "REQ_QTY" : row.REQ_QTY});

				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);

			var paramData = objNullCheck({"RSI_HEADER_ID" : v_desm_rsi_creation_param.RSI_HEADER_ID, "RSI_NO" : $('#txtDlgDesmRsiCreationRsiNo').val(),
							 "STATUS" : v_desm_rsi_creation_param.STATUS, "SUBCONTRACTOR" : $('#txtDlgDesmRsiCreationSubContractor').val(),
							 "HANDOVER_DATE" : $('#txtDlgDesmRsiCreationReqDate').val(), "REMARK" : $('#txtDlgDesmRsiCreationRemark').val(),
							 "DESCRIPTION" : $('#txtDlgDesmRsiCreationDesc').val(), "ATTACH_GRP_CD" : v_desm_rsi_creation_param.ATTACH_GRP_CD,
							 "REQUESTED_BY" : $('#txtDlgDesmRsiCreationRequestedByAd').val(), "CHECKED_BY" : $('#txtDlgDesmRsiCreationCheckedByAd').val(),
							 "CONFIRMED_BY" : $('#txtDlgDesmRsiCreationConfirmedByAd').val(), "APPROVED_BY" : $('#txtDlgDesmRsiCreationApprovedByAd').val(),
							 "RSI_NAME" : $('#txtDlgDesmRsiCreationRsiName').val(), "TRANS_TYPE" : transType, "PROJECT_NO" : v_desm_rsi_creation_param.PROJECT_NO});

				paramData.updateList = list;

			$.ajax({
				url: "/saveDesmRsiSave.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					v_desm_rsi_creation_param.RSI_HEADER_ID = result.RSI_HEADER_ID;
					v_desm_rsi_creation_param.STATUS = result.STATUS;
					if (result.error != null) {

						if(result.error == "QTY") {

							for(var i = 0; i < changeList.length; i++){
								var rowId = changeList[i].id;
								var row = dlgPlGrid.GetRowById(rowId);

								if(row.MATERIAL_CODE == result.MATERIAL_CODE) {
									row.REQ_AVAILABLE_QTY = result.REQ_AVAILABLE_QTY;
									dlgPlGrid.RefreshRow(row);
								}
							}

							var msg = $('#alertSaveRsiQtyErr').val() + " [Material Code : " + result.MATERIAL_CODE + "]";
							alert_fail(msg);

						}
						else
						{
							alert_fail(result.error);
						}

					} else {

						if(transType == "Incomplete") {

							alert_success($('#alertSuccess').val());

							if(v_desm_rsi_creation_callback) {
								v_desm_rsi_creation_callback("save-item", null);
							}

							$('#dlgDesmRsiCreation').modal('hide');

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
	var paramData = {"RSI_HEADER_ID" : v_desm_rsi_creation_param.RSI_HEADER_ID, "STATUS" : v_desm_rsi_creation_param.STATUS};

	$.ajax({
		url: "/sendMailDesmRsi.do",
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


				if(v_desm_rsi_creation_callback) {
					v_desm_rsi_creation_callback("save-item", null);
				}

				$('#dlgDesmRsiCreation').modal('hide');
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

function btnDlgDesmRsiCreationReportClick() {
	var popup = window.open('/rsiMrd.do?seq=' + v_desm_rsi_creation_param.RSI_HEADER_ID + '&fileNm=RD_'+parent.document.querySelector("#spanDefaultProject").innerHTML.split("[")[1].split("-")[0].trim()+'_RSI', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
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


