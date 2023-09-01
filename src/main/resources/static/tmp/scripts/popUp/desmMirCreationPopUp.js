var v_desm_mir_creation_callback = null;
var v_desm_mir_creation_param;
var dlgPlGrid;

var isNewDesmMirCreationPopUp = false;
var clientComments;

function initDesmMirCreationPopUp(param , callback) {
	v_desm_mir_creation_callback = callback;
    v_desm_mir_creation_param = param;

	$('#dlgDesmMirCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMirCreation').click();
	});

	$('#dlgDesmMirCreation').on('hidden.bs.modal', function () {
	  	closeDesmMirCreationPopUp();
	});

	if(v_desm_mir_creation_param.MIR_HEADER_ID == null || v_desm_mir_creation_param.MIR_HEADER_ID == "") {
		isNewDesmMirCreationPopUp = true;
	}

    initDesmMirCreationPopUpCode();

}

function initDesmMirCreationPopUpCode() {

	$.ajax({
		url: "/getDesmRsiUserSubconList.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			if(results.length > 0) {
				if(isNewDesmMirCreationPopUp) {
					$("#txtDlgDesmMirCreationPreparedBy").val(results[0]["USER_AD"]);
					$("#txtDlgDesmMirCreationPreparedByAd").val(results[0]["USER_AD"]);
					$("#txtDlgDesmMirCreationSubContractor").val(results[0]["DEPT_NAME"]);
				}

			}
        }
    });

    initTypeCode(initDesmMirCreationPopUpControls);
	//initDesmMirCreationPopUpControls();
}


function gridReloadFn(grid) {
	var list = grid.Rows;

	for (var key in list) {
		var gridRow = list[key];

		if(gridRow.Fixed == null){

			/*if(gridRow.IS_CONFIRM_MATERIAL != null && gridRow.IS_CONFIRM_MATERIAL == "Y"){
				gridRow.DESCRIPTIONCanEdit = 1;
				gridRow.DRAWING_NOCanEdit = 1;
				gridRow.TAG_NOCanEdit = 1;
				gridRow.UNITCanEdit = 1;
				gridRow.IN_QTYCanEdit = 1;
				gridRow.MATERIALCanEdit = 1;
				gridRow.REMARKSCanEdit = 1;

				gridRow.REPORT_SHORT_QTYCanEdit = 1;
				gridRow.REPORT_OVER_QTYCanEdit = 1;
				gridRow.REPORT_DMG_QTYCanEdit = 1;
				gridRow.REPORT_MISSING_QTYCanEdit = 1;

			}
			else{
				gridRow.DESCRIPTIONCanEdit = 0;
				gridRow.DRAWING_NOCanEdit = 0;
				gridRow.TAG_NOCanEdit = 0;
				gridRow.UNITCanEdit = 0;
				gridRow.IN_QTYCanEdit = 0;
				gridRow.MATERIALCanEdit = 0;
				gridRow.REMARKSCanEdit = 0;

				gridRow.REPORT_SHORT_QTYCanEdit = 0;
				gridRow.REPORT_OVER_QTYCanEdit = 0;
				gridRow.REPORT_DMG_QTYCanEdit = 0;
				gridRow.REPORT_MISSING_QTYCanEdit = 0;
			}*/

			if(gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0) {
				gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
			}
			grid.RefreshRow(gridRow);
		}



	}
}


function initDesmMirCreationPopUpControls() {

	$('#dlgDesmMirCreation').modal('show');

	initDatePicker();

	makeAutocomplete(
		"txtDlgDesmMirCreationPreparedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		//"txtDlgDesmMirCreationRPreparedByAd,txtDlgDesmMirCreationSubContractor",		//clear필드 id
		"txtDlgDesmMirCreationPreparedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMirCreationPreparedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMirCreationPreparedByAd").val(ui.item.value.split("|")[1]);
			//$("#txtDlgDesmMirCreationSubContractor").val(ui.item.value.split("|")[2]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMirCreationCheckedBy1", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMirCreationCheckedByAd1",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMirCreationCheckedBy1").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMirCreationCheckedByAd1").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMirCreationCheckedBy2", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMirCreationCheckedByAd2",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMirCreationCheckedBy2").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMirCreationCheckedByAd2").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMirCreationCheckedBy3", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMirCreationCheckedByAd3",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMirCreationCheckedBy3").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMirCreationCheckedByAd3").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	$('#btnDlgDesmMirCreationAtt').click(function () { btnDlgDesmMirCreationAttClick(); return false; });
	$('#btnDlgDesmMirCreationAdd').click(function () { btnDlgDesmMirCreationAddClick(); return false; });
	$('#btnDlgDesmMirCreationSave').click(function () { btnDlgDesmMirCreationSaveClick(); return false; });
	$('#btnDlgDesmMirCreationDelete').click(function () { btnDlgDesmMirCreationDeleteClick(); return false; });

	$('#btnInspectionResult').click(function () { btnMirSetupPopupClick("INSPECTION_RESULT"); return false; });
	$('#btnQtyFixYN').click(function () { btnMirSetupPopupClick("REQ_CHG_QTY"); return false; });
	$('#btnPoNo').click(function () { btnMirSetupPopupClick("PO_NO"); return false; });

	
	$('#btnDlgDesmMirCreationDel').click(function () { btnDlgDesmMirCreationDelClick(); return false; });

	$('#btnDlgDesmMirCreationReject').click(function () { btnDlgDesmMirCreationRejectClick(); return false; });
	
	$('#btnDlgDesmMirCreationRequest').click(function () { btnDlgDesmMirCreationRequestClick(); return false; });
	$('#btnDlgDesmMirCreationCheck').click(function () { btnDlgDesmMirCreationCheckClick(); return false; });
	$('#btnDlgDesmMirCreationConfirm').click(function () { btnDlgDesmMirCreationConfirmClick(); return false; });
	//$('#btnDlgDesmMirCreationApprove').click(function () { btnDlgDesmMirCreationApproveClick(); return false; });
	$('#btnDlgDesmMirCreationReport').click(function () { btnDlgDesmMirCreationReportClick(null); return false; });
	$('#btnDlgDesmMirCreationReportOsdm').click(function () { btnDlgDesmMirCreationReportClick('OSDM'); return false; });

	$('#selMirCategory').on('change', function(ev) {
	  console.log(ev);
	});
	
	$('#selResultOfInspection').on('change', function(ev) {
	  console.log(ev);
	});


	TGSetEvent("OnRenderFinish","dlgDesmMirCreationGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
		setDlgDesmMirCreationBtn();
	});
	
	TGSetEvent("OnChange","dlgDesmMirCreationGrid",function(grid){
		gridReloadFn(grid);
	});


	TGSetEvent("OnCopy","dlgDesmMirCreationGrid",function(grid, txt){
		copyToClipboard(txt);
	});

	var gridCode = getGridCode();

		var dlgPlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMirCreationGrid"
			, "CfgId"			: "dlgDesmMirCreationGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "7"
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
			,"ColsPosLap":"1","ColsLap": "1" // column변경사항 바로 적용 안될시
		}
		, "Cfg_2" : { 
			"SearchExpression": ""
			, "SearchCells": "0"
			, "SearchFocused": "3"
			, "SearchNumbers": "3"
			, "SearchAlertFound": "1000"
			, "SearchWhiteChars": " "   
			, "Filtering": "0"   
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

		"Cols" : [
			 {  "Name"	: "NO", "Width": "70", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "TRK_ITEM_NAME", "Visible" :"0", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "PACKAGE_LIST_NO", "Visible" :"0", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "SEL_INVOICE_NUM", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "PO_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 {	"Name"	: "SUPPLIER", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "ATTRIBUTE10", "Width": "70", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "PACKAGE_NO", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "TAG_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "NOS", "Visible" :"0", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "DRAWING_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "UNIT", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "IN_QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "LOCATION", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "INSPECTION_RESULT", "Width" :"100", "Type": "Enum", "Enum" : "|Good|Defect|Hold", "EnumKeys" : "|Good|Defect|Hold", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "chgInspectionResult(Grid,Row,Col);"},
	   		 //{	"Name"	: "VISUAL_CHECK", "Width" :"100", "Type": "Enum", "Enum" : "|Good|Defect|Hold", "EnumKeys" : "|Good|Defect|Hold", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
	   		 {	"Name"	: "REQ_CHG_QTY", "Width" :"80", "Type": "Enum", "Enum" : "|Y|N", "EnumKeys" : "|Y|N", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnChange": "chgReqChgQty(Grid,Row,Col);"},
	   		 {	"Name"	: "RECEIVED_QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "OSDM_OVER_QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "OSDM_SHORT_QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "OSDM_DAMAGE_QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "OSDM_MISSING_QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 {	"Name"	: "MATERIAL_CODE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 //{	"Name"	: "CLIENT_COMMENTS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 {	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openDlgDesmMirCreationAttModal( Grid, Row,Col )", "IconAlign" : "Center"	, "IconSize" : "1"	},
	   		 {	"Name"	: "ATTACH_GRP_CD", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 
			 ],
			 "Head" : [
			   {
				"Kind"	: "Header",
				"id" : "Header",
				"Spanned" : "1",
				"PanelRowSpan" : "2",
				"Class" : "gridCenterText",
				"NO"	: "No.", "NORowSpan" : "2",
				"SEL_INVOICE_NUM"	: "Invoice No.", "SEL_INVOICE_NUMRowSpan" : "2",
				"PO_NO"	: "PO No.", "PO_NORowSpan" : "2",
				"SUPPLIER"	: "Supplier", "SUPPLIERRowSpan" : "2",
				//"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
				"ATTRIBUTE10"	: "Sh. No.", "ATTRIBUTE10RowSpan" : "2",
				"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
				"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
				"TAG_NO"        : "Tag No.", "TAG_NORowSpan" : "2",
				"DRAWING_NO"    : "Drawing No.", "DRAWING_NORowSpan" : "2",
				"UNIT"	: "Unit", "UNITRowSpan" : "2",
				"IN_QTY"	: "Q'ty", "IN_QTYRowSpan" : "2",
				"LOCATION" : "Location", "LOCATIONRowSpan" : "2",
				"INSPECTION_RESULT"	: "Inspection\nResult", "INSPECTION_RESULTRowSpan" : "2",
				//"VISUAL_CHECK"	: "Visual Check",
				"REQ_CHG_QTY"	: "Inspection Result : Defect", "REQ_CHG_QTYSpan" : "6",
				"RECEIVED_QTY"	: "Inspection Result : Defect",
				"OSDM_OVER_QTY"	: "Inspection Result : Defect",
				"OSDM_SHORT_QTY"	: "Inspection Result : Defect",
				"OSDM_DAMAGE_QTY"	: "Inspection Result : Defect",
				"OSDM_MISSING_QTY"	: "Inspection Result : Defect",
				"REMARKS"	: "Remark", "REMARKSRowSpan" : "2",
				"MATERIAL_CODE"	: "Material Code", "MATERIAL_CODERowSpan" : "2",
				//"CLIENT_COMMENTS"	: "Client Comments",
				"ATT"	: "Pic", "ATTRowSpan" : "2",
			   },
			   {
				"Kind"	: "Header",
				"Spanned" : "1",
				"Class" : "gridCenterText",
				"NO"	: "No.",
				"SEL_INVOICE_NUM"	: "Invoice No.",
				"PO_NO"	: "PO No.",
				"SUPPLIER"	: "Supplier",
				//"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
				"ATTRIBUTE10"	: "Sh. No.",
				"PACKAGE_NO"	: "Package No.",
				"DESCRIPTION"	: "Description of Goods\nSpecification",
				"TAG_NO"        : "Tag No.",
				"DRAWING_NO"    : "Drawing No.",
				"UNIT"	: "Unit",
				"IN_QTY"	: "Q'ty",
				"LOCATION" : "Location",
				"INSPECTION_RESULT"	: "Inspection\nResult",
				//"VISUAL_CHECK"	: "Visual Check",
				"REQ_CHG_QTY"	: "Req Chg\nQ'ty",
				"RECEIVED_QTY"	: "Received\nQ'ty",
				"OSDM_OVER_QTY"	: "Over\nQ'ty",
				"OSDM_SHORT_QTY"	: "Short\nQ'ty",
				"OSDM_DAMAGE_QTY"	: "Damage\nQ'ty",
				"OSDM_MISSING_QTY"	: "Missing\nQ'ty",
				"REMARKS"	: "Remark",
				"MATERIAL_CODE"	: "Material Code",
				//"CLIENT_COMMENTS"	: "Client Comments",
				"ATT"	: "Pic"
			   }]
				, "Solid" : [ 
						{ 
							"Kind":"Search", 
							"Cells": "Expression,Select,Mark,Find,Clear", 
							"ActionsRange": "1", 
							"Actions": "Filter;Mark;Find"
						}
					],
		   
			"Foot" : [
			      { "Calculated": "1", "CanEdit": "0", "UNIT": $('#gridColTotalText').val(),"QTYFormula": "sum()", "Class" : "gridLinkText"   }
			   ]
	};

	dlgPlGrid = TreeGrid( {Layout:{Data : dlgPlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMirCreationPlGrid" );

}

function setDlgDesmMirCreationBtn() {

	// Creation New MIR.
	if(isNewDesmMirCreationPopUp) {
		$('#btnDlgDesmMirCreationCheck').remove();
		$('#btnDlgDesmMirCreationRejectCheck').remove();
		$('#btnDlgDesmMirCreationRejectConfirm').remove();
		$('#btnDlgDesmMirCreationRejectApprove').remove();
		$('#btnDlgDesmMirCreationReport').remove();
		$('#btnDlgDesmMirCreationReportOsdm').remove();
		$('#btnDlgDesmMirCreationDelete').remove();

		$('#txtDlgDesmMirCreationReqDate').val(toDay);
	}
	else {
		searchData();
	}
	//$("#txtDlgDesmMirCreationPreparedBy").attr("readonly",true);

	var list = v_desm_mir_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
}

function addFileIcon(list) {
	var gridList = dlgPlGrid.Rows;
	$.each(list, function(i, row) {
		$.each(gridList, function(i, gridRow) {
			if(gridRow.MATERIAL_CODE == row.MATERIAL_CODE) {
				gridRow.ATT = (row.PIC_YN == 'Y') ? 
						'/resources/ext/fontawesome-free/svgs/solid/paperclip.svg':
						'/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
				dlgPlGrid.RefreshRow(gridRow);
				return false;
			}
		});
	});
}

function searchData(type) {
	$.ajax({
		url: "/getDesmMirInfoList.do",
		data: {"MIR_HEADER_ID" : v_desm_mir_creation_param.MIR_HEADER_ID},
		success: function (data, textStatus, jqXHR) {

			dlgPlGrid.Source.Data.Data.Body = [data.results.lineList];
			dlgPlGrid.ReloadBody();
			addFileIcon(data.results.lineList);

			if(type != "DTL") {
				// Header Info Mapping
				var infoData = data.results.headerList[0];
				v_desm_mir_creation_param.ATTACH_GRP_CD = infoData.ATTACH_GRP_CD;
				v_desm_mir_creation_param.STATUS = infoData.STATUS;
				// Header #1 line
				$('#txtDlgDesmMirCreationMirNo').val(infoData.MIR_NO); // MIR No.
				$('#txtDlgDesmMirCreationMirName').val(infoData.MIR_NAME); // MIR Name
				$('#txtDlgDesmMirCreationOdsmName').val(infoData.OSDM_NAME); // OSDM Name
				$('#selMirCategory').val(infoData.CATEGORY);
				// Header #2 line
				$('#txtDlgDesmMirReceivedFromDate').val(infoData.RECEIVED_DATE_FROM);
				$('#txtDlgDesmMirReceivedToDate').val(infoData.RECEIVED_DATE_TO);
				$('#txtDlgDesmMirInspectionFromDate').val(infoData.INSPECTION_DATE_FROM);
				$('#txtDlgDesmMirInspectionToDate').val(infoData.INSPECTION_DATE_TO);
				$('#txtDlgDesmMirInspectionLocation').val(infoData.INSPECTION_LOCATION);
				$('#selResultOfInspection').val(infoData.RESULT_OF_INSPECTION);
				// Header #3 line
				$('#txtDlgDesmMirCreationRemark').val(infoData.REMARKS);
				$('#txtDlgDesmMirCreationClientComments').val(infoData.CLIENT_COMMENTS);
				clientComments = infoData.CLIENT_COMMENTS;
				// Appr line
				$('#txtDlgDesmMirCreationPreparedBy').val(infoData.PREPARED_BY);
				$('#txtDlgDesmMirCreationPreparedByAd').val(infoData.PREPARED_BY);
				$('#txtDlgDesmMirCreationPreparedDate').val(infoData.PREPARED_DATE);
				$('#txtDlgDesmMirCreationCheckedBy1').val(infoData.CHECKED1_BY);
				$('#txtDlgDesmMirCreationCheckedByAd1').val(infoData.CHECKED1_BY);
				$('#txtDlgDesmMirCreationCheckedDate1').val(infoData.CHECKED1_DATE);
				$('#txtDlgDesmMirCreationCheckedBy2').val(infoData.CHECKED2_BY);
				$('#txtDlgDesmMirCreationCheckedByAd2').val(infoData.CHECKED2_BY);
				$('#txtDlgDesmMirCreationCheckedDate2').val(infoData.CHECKED2_DATE);
				$('#txtDlgDesmMirCreationCheckedBy3').val(infoData.CHECKED3_BY);
				$('#txtDlgDesmMirCreationCheckedByAd3').val(infoData.CHECKED3_BY);
				$('#txtDlgDesmMirCreationCheckedDate3').val(infoData.CHECKED3_DATE);

				// Each status data mapping
				if(infoData.STATUS == "Incomplete" || infoData.STATUS == "Rejected") {
					// Status Button Change
					//$('#btnDlgDesmMirCreationSave').remove();
					//$('#btnDlgDesmMirCreationDelete').remove();
					// Approval Button Change
					$('#btnDlgDesmMirCreationCheck').remove();
					//$('#btnDlgDesmMirCreationRequest').remove();
					$('#btnDlgDesmMirCreationReject').remove();
					// Line Grid Handle Button
					// Header or Line Readonly
					gridEditCheck();
				}
				else if(infoData.STATUS == 'Pre-Checked') {
					$('#btnDlgDesmMirCreationSave').remove();
					$('#btnDlgDesmMirCreationDelete').remove();
					$('#btnDlgDesmMirCreationRequest').remove();

					gridReadOnly();
					headerReadOnly(null);
				}
				else if(infoData.STATUS == 'Pre-Checked1'
					|| infoData.STATUS == 'Pre-Checked2'
					|| infoData.STATUS == 'Pre-Checked3') {
					// Status Button Change
					$('#btnDlgDesmMirCreationSave').remove();
					$('#btnDlgDesmMirCreationDelete').remove();
					// Approval Button Change
					//$('#btnDlgDesmMirCreationCheck').remove();
					$('#btnDlgDesmMirCreationRequest').remove();
					//$('#btnDlgDesmMirCreationReject').remove();
					if($('#txtDlgDesmMirCreationOdsmName').val() === '') {
						$('#btnDlgDesmMirCreationReportOsdm').remove();
					}
					
					// Header or Line Readonly
					gridReadOnly();
					headerReadOnly(null);
				}
				else if(infoData.STATUS == "Checked") {
					// Status Button Change
					//$('#btnDlgDesmMirCreationSave').remove();
					$('#btnDlgDesmMirCreationDelete').remove();
					// Approval Button Change
					$('#btnDlgDesmMirCreationCheck').remove();
					$('#btnDlgDesmMirCreationRequest').remove();
					$('#btnDlgDesmMirCreationReject').remove();
					if($('#txtDlgDesmMirCreationOdsmName').val() === '') {
						$('#btnDlgDesmMirCreationReportOsdm').remove();
					}

					// Header or Line Readonly
					gridReadOnly();
					headerReadOnly('Checked');
				}
				
			}
        }
    });
}

function gridReadOnly() {
	// Line Grid Handle Button
	$('#btnInspectionResult').remove();
	$('#btnQtyFixYN').remove();
	$('#btnPoNo').remove();
	$('#btnDlgDesmMirCreationAdd').remove();
	$('#btnDlgDesmMirCreationDel').remove();
	
	var gridList = dlgPlGrid.Rows;
	for (var key in gridList) {
		var gridRow = gridList[key];

		if(gridRow.Fixed == null){
			gridRow.PO_NOCanEdit = 0;
			gridRow.INSPECTION_RESULTCanEdit = 0;
			gridRow.REQ_CHG_QTYCanEdit = 0;
			gridRow.REMARKSCanEdit = (gridRow.INSPECTION_RESULT == "Hold") ? 1 : 0;
			dlgPlGrid.RefreshRow(gridRow);
		}
	}
}

function headerReadOnly(status) {
	// Header readonly
	$("#txtDlgDesmMirCreationMirName").attr("readonly",true);
	$('#txtDlgDesmMirCreationOdsmName').attr("readonly",true);
	$('#selMirCategory').attr("disabled",true);
	$("#txtDlgDesmMirReceivedFromDate").attr("disabled", true);
	$("#txtDlgDesmMirReceivedToDate").attr("disabled", true);
	$("#txtDlgDesmMirInspectionFromDate").attr("disabled", true);
	$("#txtDlgDesmMirInspectionToDate").attr("disabled", true);
	$('#txtDlgDesmMirInspectionLocation').attr("readonly",true);
	$('#selResultOfInspection').attr("disabled",true);
	
	if(status != null && status == 'Checked') {
		$('#txtDlgDesmMirCreationRemark').attr("readonly",true);
		$('#txtDlgDesmMirCreationClientComments').attr("readonly",false);
	} else {
		$('#txtDlgDesmMirCreationRemark').attr("readonly",false);
		$('#txtDlgDesmMirCreationClientComments').attr("readonly",true);
	}
	
	// Appr readonly
	$("#txtDlgDesmMirCreationPreparedBy").attr("readonly",true);
	$("#txtDlgDesmMirCreationCheckedBy1").attr("readonly",true);
	$("#txtDlgDesmMirCreationCheckedBy2").attr("readonly",true);
	$("#txtDlgDesmMirCreationCheckedBy3").attr("readonly",true);

	$("#txtDlgDesmMrrCreationMrrName").attr("readonly",true);
	$("#txtDlgDesmMrrReceivedFromDate").attr("disabled", true);
	$("#txtDlgDesmMrrReceivedToDate").attr("disabled", true);
	$("#txtDlgDesmMrrInspectionFromDate").attr("disabled", true);
	$("#txtDlgDesmMrrInspectionToDate").attr("disabled", true);
	$("#txtDlgDesmMrrCreationRemark").attr("readonly",true);

}

function gridEditCheck() {
	var gridList = dlgPlGrid.Rows;
	for (var key in gridList) {
		var row = gridList[key];
		//if(row.Fixed == null){}
		if(row.INSPECTION_RESULT != null && row.INSPECTION_RESULT == 'Defect') {
			row.REQ_CHG_QTYCanEdit = 1;
		}
		if(row.REQ_CHG_QTY != null && row.REQ_CHG_QTY == 'Y') {
			row.RECEIVED_QTYCanEdit = 1;
			row.OSDM_OVER_QTYCanEdit = 1;
			row.OSDM_SHORT_QTYCanEdit = 1;
			row.OSDM_DAMAGE_QTYCanEdit = 1;
			row.OSDM_MISSING_QTYCanEdit = 1;
		}
		dlgPlGrid.RefreshRow(row);
	}
}

function closeDesmMirCreationPopUp() {
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

function btnDlgDesmMirCreationAttClick() {
	var param = Object.assign({}, v_desm_mir_creation_param);

	if(param.ATTACH_GRP_CD == null) {
		param.ATTACH_GRP_CD = "";
	}

	if(param.MIR_HEADER_ID == null) {
		param.MIR_HEADER_ID = "";
	}

	param.fileUse = true;
	if(param.STATUS == "Pre-Checked1" || param.STATUS == "Pre-Checked2" || param.STATUS == "Pre-Checked3") {
		param.fileUse = false;
	}

	$('#dlgDesmMirCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initTransAttListPopUp(param, function (key, returnParam) {
				if(returnParam.MIR_HEADER_ID == null || returnParam.MIR_HEADER_ID == "") {
					v_desm_mir_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
				}
				else {
					if(v_desm_mir_creation_callback) {
						v_desm_mir_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
						v_desm_mir_creation_callback("save-item", null);
					}
				}
			});
		}
	});
}

function openDlgDesmMirCreationAttModal (G,row,col) {
	var param = Object.assign({}, v_desm_mir_creation_param, row);

	param.fileUse = true;
	if(param.STATUS == "Pre-Checked1" || param.STATUS == "Pre-Checked2" || param.STATUS == "Pre-Checked3") {
		param.fileUse = false;
	}
	
	param.ATTACH_GRP_CD = row.ATTACH_GRP_CD;
	/*var param = Object.assign({}, row);
		param.ATTACH_GRP_CD = param.ATTACH_GRP_CD;
		param.fileUse = true;
		param.hideThumbnailContent = false;
		param.width = "1000px";*/

	$('#dlgDesmMirCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					row.Added = 1;
					row.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
					dlgPlGrid.RefreshRow(row);
				}
			});
		}
	});
}

function btnDlgDesmMirCreationAddClick() {
	var param = Object.assign({}, v_desm_mir_creation_param);

	$('#dlgDesmMirCreationPopUp').load("/desmMirPlDtlPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmMirPlDtlPopUp(param, function (key, returnParam) {
				if(key == "select-item") {
					addDesmMirCreationGridRow(returnParam);
				}
			});
		}
	});
}

function addDesmMirCreationGridRow(list) {
	for(var i = 0; i < list.length; i++) {
		var row = list[i];
		var addCheck = true;
		var gridList = dlgPlGrid.Rows;
		for (var key in gridList) {
			var gridRow = gridList[key];
			if(gridRow.Fixed == null){
				if(gridRow.PACKAGE_NO == row.PACKAGE_NO && gridRow.MATERIAL_CODE == row.MATERIAL_CODE){
					addCheck = false;
				}
			}
		}

		if(addCheck){
			var gridAddRow = dlgPlGrid.AddRow(null,null,1,null,null);
			gridAddRow.TRK_ITEM_NAME = row.TRK_ITEM_NAME;
			gridAddRow.PACKAGE_LIST_NO = row.PACKAGE_LIST_NO;
			gridAddRow.PO_NO = row.SEL_INVOICE_NUM;
			gridAddRow.SUPPLIER = row.ATTRIBUTE3;
			gridAddRow.SEL_INVOICE_NUM = row.SEL_INVOICE_NUM;
			gridAddRow.ATTRIBUTE10 = row.ATTRIBUTE10;
			gridAddRow.PACKAGE_NO = row.PACKAGE_NO;
			gridAddRow.MATERIAL_CODE = row.MATERIAL_CODE;
			gridAddRow.DESCRIPTION = row.DESCRIPTION;
			gridAddRow.DRAWING_NO = row.DRAWING_NO;
			gridAddRow.UNIT = row.UNIT;
			gridAddRow.TAG_NO = row.TAG_NO;
			gridAddRow.NOS = row.NOS;
			gridAddRow.IN_QTY = row.IN_QTY;
			
			gridAddRow.INSPECTION_RESULT = row.INSPECTION_RESULT;
			gridAddRow.REQ_CHG_QTY = row.REQ_CHG_QTY;
			gridAddRow.RECEIVED_QTY = row.RECEIVED_QTY;
			gridAddRow.OSDM_OVER_QTY = row.REPORT_OVER_QTY;
			gridAddRow.OSDM_SHORT_QTY = row.REPORT_SHORT_QTY;
			gridAddRow.OSDM_DAMAGE_QTY = row.REPORT_DMG_QTY;
			gridAddRow.OSDM_MISSING_QTY = row.REPORT_MISSING_QTY;
			gridAddRow.REQ_CHG_QTY = row.REQ_CHG_QTY;
			
			gridAddRow.REMARKS = row.REMARKS;
			gridAddRow.LOCATION = row.LOCATION;
			//gridAddRow.ATT = row.ATT;

			gridAddRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';

			dlgPlGrid.RefreshRow(gridAddRow);
		}
	}
}

function btnDlgDesmMirCreationSaveClick() {
	if(v_desm_mir_creation_param.STATUS == null || v_desm_mir_creation_param.STATUS == "") {
		save("Incomplete");
	}
	else if(v_desm_mir_creation_param.STATUS == 'Checked') {
		save("CheckedUpdate");
	}
	else {
		save("Incomplete");
	}
}

function btnDlgDesmMirCreationRequestClick() {
	save("Pre-Checked1");
}

function btnDlgDesmMirCreationCheckClick() {
	if(v_desm_mir_creation_param.STATUS == 'Pre-Checked1') save("Pre-Checked2");
	else if(v_desm_mir_creation_param.STATUS == 'Pre-Checked2') save("Pre-Checked3");
	else if(v_desm_mir_creation_param.STATUS == 'Pre-Checked3') save("Checked");
}

function btnDlgDesmMirCreationDelClick() {
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
					var deleteRow = objNullCheck({"MIR_LINE_ID" : row.MIR_LINE_ID, "MATERIAL_CODE" : row.MATERIAL_CODE});
					deleteList.push(deleteRow);
				}
			}

			if(deleteList.length > 0) {
				var list = JSON.stringify(deleteList);
				var paramData = {"deleteList" : list};

				$.ajax({
					url: "/deleteDesmMirDtl.do",
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
			else {
				alert_success($('#alertDeleteSuccess').val());
			}
		}
	});
}

function btnDlgDesmMirCreationRejectClick() {
	dlgPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			// FIXME: Remark 추가해서 Reject할 때 저장될 수 있어야 함.
			var paramData = objNullCheck({
				"MIR_HEADER_ID" : v_desm_mir_creation_param.MIR_HEADER_ID
				, "REMARKS" : $('#txtDlgDesmMirCreationRemark').val()
				, "CLIENT_COMMENTS" : $('#txtDlgDesmMirCreationClientComments').val()
			});
			$.ajax({
				url: "/saveDesmMirReject.do",
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

function btnDlgDesmMirCreationDeleteClick() {
	dlgPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"MIR_HEADER_ID" : v_desm_mir_creation_param.MIR_HEADER_ID};

			console.log(paramData);
			$.ajax({
				url: "/deleteDesmMir.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						if(v_desm_mir_creation_callback) {
							v_desm_mir_creation_callback("save-item", null);
						}
						$('#dlgDesmMirCreation').modal('hide');
					}
				}
			});
		}
	});
}


function save(transType) {
	dlgPlGrid.ActionAcceptEdit();

	if($('#txtDlgDesmMirCreationPreparedBy').val().length < 2 || $('#txtDlgDesmMirCreationPreparedByAd').val() == ""){
		$('#txtDlgDesmMirCreationPreparedBy').val("");
		$('#txtDlgDesmMirCreationPreparedByAd').val("");
	}

	if($('#txtDlgDesmMirCreationCheckedBy1').val().length < 2 || $('#txtDlgDesmMirCreationCheckedByAd1').val() == ""){
		$('#txtDlgDesmMirCreationCheckedBy1').val("");
		$('#txtDlgDesmMirCreationCheckedByAd1').val("");
	}

	if($('#txtDlgDesmMirCreationCheckedBy2').val().length < 2 || $('#txtDlgDesmMirCreationCheckedByAd2').val() == ""){
		$('#txtDlgDesmMirCreationCheckedBy2').val("");
		$('#txtDlgDesmMirCreationCheckedByAd2').val("");
	}
	
	if($('#txtDlgDesmMirCreationCheckedBy3').val().length < 2 || $('#txtDlgDesmMirCreationCheckedByAd3').val() == ""){
		$('#txtDlgDesmMirCreationCheckedBy3').val("");
		$('#txtDlgDesmMirCreationCheckedByAd3').val("");
	}
	
	// 저장만할 때도 담당자 지정해서 저장할 수 있도록 수정..
	/*if(transType == "Incomplete") {
		$('#txtDlgDesmMirCreationCheckedBy1').removeClass("required");
		$('#txtDlgDesmMirCreationCheckedByAd1').removeClass("required");
		$('#txtDlgDesmMirCreationCheckedBy2').removeClass("required");
		$('#txtDlgDesmMirCreationCheckedByAd2').removeClass("required");
		$('#txtDlgDesmMirCreationCheckedBy3').removeClass("required");
		$('#txtDlgDesmMirCreationCheckedByAd3').removeClass("required");
	}
	else if(transType == "Pre-Checked") {
		$('#txtDlgDesmMirCreationCheckedBy1').addClass("required");
		$('#txtDlgDesmMirCreationCheckedByAd1').addClass("required");
		$('#txtDlgDesmMirCreationCheckedBy2').addClass("required");
		$('#txtDlgDesmMirCreationCheckedByAd2').addClass("required");
		$('#txtDlgDesmMirCreationCheckedBy3').addClass("required");
		$('#txtDlgDesmMirCreationCheckedByAd3').addClass("required");
	}*/

	var chkValidation = checkRequiredField("divDlgDesmMirCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var gridLength = dlgPlGrid.RowCount;

	if(gridLength < 1) {
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var txtDlgDesmMirReceivedFromDate = $('#txtDlgDesmMirReceivedFromDate').val();
	var txtDlgDesmMirReceivedToDate = $('#txtDlgDesmMirReceivedToDate').val();
	
	if(txtDlgDesmMirReceivedFromDate > txtDlgDesmMirReceivedToDate){
		alert_modal("", $('#alertManageMirReceivedDateErr').val());
		return;
	}

	var changeObject = dlgPlGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;
    var gridList = dlgPlGrid.Rows;

    if(transType == 'Pre-Checked1') {
    	for(var key in gridList) {
    		var row = gridList[key];
    		
    		if(row.Fixed == null) {
    			var isEmptyObj = function(obj) {
    				return obj == null || obj == "";
    			};

    			// Inspection Result 값이 비어있을 경우 요청불가.
				if(isEmptyObj(row.INSPECTION_RESULT)) {
    				//var msg = $('#alertMirInspResultNullErrAll').val();
    				alert_modal("", $('#alertMirInspResultNullErrAll').val());
    				return;
    			}

    			if(row.INSPECTION_RESULT == 'Defect') {
        			// Inspection Result 값이 Defect인데 Chg Q'ty 값이 비어있을 경우 요청불가.
    				if(isEmptyObj(row.REQ_CHG_QTY)) {
        				alert_modal("", $('#alertMirInspDefectQtyNullErrAll').val());
        				return;
    					
    				}
        			// Inspection Result 값이 Defect인데 OSDM Name이 비어있으면 요청불가.
    				if(isEmptyObj($('#txtDlgDesmMirCreationOdsmName').val())) {
        				alert_modal("", $('#alertMirInspDefectOsdmNullErrAll').val());
        				return;
    					
    				}
        			// Inspection Result 값이 Defect인데 OSDM 수량이 비어있으면 요청불가.
    				if(row.REQ_CHG_QTY == 'Y' &&
    						isEmptyObj(row.OSDM_OVER_QTY) && isEmptyObj(row.OSDM_SHORT_QTY) && isEmptyObj(row.OSDM_DAMAGE_QTY) && isEmptyObj(row.OSDM_MISSING_QTY)) {
        				alert_modal("", $('#alertMirInspDefectOsdmQtyNullErrAll').val());
        				return;
    					
    				}
    			}
    		}
    	}
    }
    else if(transType == "CheckedUpdate") {
    	// 변동사항 없음.
    	if(changeList.length == 0 && clientComments == $('#txtDlgDesmMirCreationClientComments').val()) {
    		alert_modal("", $('#alertGridEditDataNull').val());
    		return;
    	}
    }
    
	var alMsg = "";
	if(transType == "Incomplete" || transType == "CheckedUpdate") {
		alMsg = $('#alertSave').val();
	}
	else if(transType == "Pre-Checked1") {
		alMsg = $('#alertRequest').val();
	}
	else if(transType == "Pre-Checked2" || transType == "Pre-Checked3") {
		alMsg = $('#alertCheck').val();
	}
	else if(transType == "Checked") {
		alMsg = $('#alertCheck').val();
	}

	confirm_modal("", alMsg, null, function (callobj, result) {
		if(result) {
			var callUrl = (transType == "CheckedUpdate") ? "/updateMirAfterChecked.do" : "/saveDesmMirSave.do";
			var updateList = [];
			for(var i = 0; i < changeList.length; i++) {
				var rowId = changeList[i].id;
				var row = dlgPlGrid.GetRowById(rowId);


				var updateRow = objNullCheck({	"MIR_LINE_ID" : row.MIR_LINE_ID, 
												"TRK_ITEM_NAME" : row.TRK_ITEM_NAME, 
												"PACKING_LIST_NO" : row.PACKAGE_LIST_NO, 
												"PO_NO" : row.PO_NO,
												"SUPPLIER" : row.SUPPLIER,
												"PACKAGE_NO" : row.PACKAGE_NO,
												"MATERIAL_CODE" : row.MATERIAL_CODE,
												"DESCRIPTION" : row.DESCRIPTION,
												"SHIPMENT_NO" : row.ATTRIBUTE10, 
												"DRAWING_NO" : row.DRAWING_NO,
												"TAG_NO" : row.TAG_NO, 
												"NOS" : row.NOS, 
												"IN_QTY" : row.IN_QTY, 
												"INSPECTION_RESULT" : row.INSPECTION_RESULT,
												"RECEIVED_QTY" : row.RECEIVED_QTY ? row.RECEIVED_QTY : 0,
												"OSDM_OVER_QTY" : row.OSDM_OVER_QTY ? row.OSDM_OVER_QTY : 0,
												"OSDM_SHORT_QTY" : row.OSDM_SHORT_QTY ? row.OSDM_SHORT_QTY : 0,
												"OSDM_DAMAGE_QTY" : row.OSDM_DAMAGE_QTY ? row.OSDM_DAMAGE_QTY : 0,
												"OSDM_MISSING_QTY" : row.OSDM_MISSING_QTY ? row.OSDM_MISSING_QTY : 0,
												"REQ_CHG_QTY" : row.REQ_CHG_QTY, 
												"REMARKS" : row.REMARKS, 
												"ATTACH_GRP_CD" : row.ATTACH_GRP_CD,
												"FILE_PATH" : row.FILE_PATH
				                                });

				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = objNullCheck({
					"MIR_HEADER_ID" : v_desm_mir_creation_param.MIR_HEADER_ID, 
					"MIR_NO" : $('#txtDlgDesmMirCreationMirNo').val(),
					"MIR_NAME" : $('#txtDlgDesmMirCreationMirName').val(), 
					"PROJECT_NO" : v_desm_mir_creation_param.PROJECT_NO,
					"STATUS" : v_desm_mir_creation_param.STATUS,
					"RECEIVED_DATE_FROM" : $('#txtDlgDesmMirReceivedFromDate').val(), 
					"RECEIVED_DATE_TO" : $('#txtDlgDesmMirReceivedToDate').val(), 
					"INSPECTION_DATE_FROM" : $('#txtDlgDesmMirInspectionFromDate').val(), 
					"INSPECTION_DATE_TO" : $('#txtDlgDesmMirInspectionToDate').val(), 
					"INSPECTION_LOCATION" : $('#txtDlgDesmMirInspectionLocation').val(), 
					"RESULT_OF_INSPECTION" : $('#selResultOfInspection option:selected').val(), 
					"REMARKS" : $('#txtDlgDesmMirCreationRemark').val(),
					"ATTACH_GRP_CD" : v_desm_mir_creation_param.ATTACH_GRP_CD,
					"PREPARED_BY" : $('#txtDlgDesmMirCreationPreparedBy').val(), 
					"CHECKED1_BY" : $('#txtDlgDesmMirCreationCheckedByAd1').val(),
					"CHECKED2_BY" : $('#txtDlgDesmMirCreationCheckedByAd2').val(),
					"CHECKED3_BY" : $('#txtDlgDesmMirCreationCheckedByAd3').val(),
					"TRANS_TYPE" : transType, // transType === approvalStatus..
					"CATEGORY" : $('#selMirCategory option:selected').val(),
					"OSDM_NAME" : $('#txtDlgDesmMirCreationOdsmName').val(),
					"CLIENT_COMMENTS" : $('#txtDlgDesmMirCreationClientComments').val(),
				});

			paramData.updateList = list;
			$.ajax({
				url: callUrl,
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					v_desm_mir_creation_param.MIR_HEADER_ID = result.MIR_HEADER_ID;
					v_desm_mir_creation_param.STATUS = result.STATUS;
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						if(transType == "Incomplete") {
							alert_success($('#alertSuccess').val());
							if(v_desm_mir_creation_callback) {
								v_desm_mir_creation_callback("save-item", null);
							}
							$('#dlgDesmMirCreation').modal('hide');
						}
						else {
							sendMail($('#alertSuccess').val(), transType);
						}
					}
				}
			});

		}
	});
}

function sendMail(msg, transType) {
	if(v_desm_mir_creation_callback) {
		v_desm_mir_creation_callback("save-item", null);
	}
	
	var paramData = {
		"MIR_HEADER_ID" : v_desm_mir_creation_param.MIR_HEADER_ID
		,"STATUS" : v_desm_mir_creation_param.STATUS
		,"TRANS_TYPE": transType
	};
	
	$.ajax({
		url: "/sendMailDesmMir.do",
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
				if(v_desm_mir_creation_callback) {
					v_desm_mir_creation_callback("save-item", null);
				}
			}
		},
		complete: function() {
			$('#dlgDesmMirCreation').modal('hide');
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

function btnDlgDesmMirCreationReportClick(type) {
	var rdName = (type === 'OSDM') ? '/mirOsdmMrd.do?seq=' : '/mirMrd.do?seq=';
	var fileName = (type === 'OSDM') ? '&fileNm=RD_OSDM' : '&fileNm=RD_MIR';
	var popup = window.open(rdName + v_desm_mir_creation_param.MIR_HEADER_ID + fileName, 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
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

function ShowCustomCalendar(G,row,col) {
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n) {
	   G.SetValue(row,col,n,1);
	}

	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function formatDate(d) {
	if(d == null || d == ""){return "";}
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}

function chkDate(m) {
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}
	return month;
}

function btnMirSetupPopupClick(mode) {
	dlgPlGrid.ActionAcceptEdit();
	var selectList = dlgPlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var callbackFn = function (key, returnParam) {
		if(key == "select-edit") {
			if(returnParam.desmMirPopupVal != "") {
				for(var i = 0; i < selectList.length; i++) {
					var row = selectList[i];
					row.Added = 1;
					row[mode] = returnParam.desmMirPopupVal;
					if(mode == 'INSPECTION_RESULT') {
						chgInspectionResult(dlgPlGrid, row);
					} else if(mode == 'REQ_CHG_QTY') {
						if(row.INSPECTION_RESULT == 'Defect') {
							chgReqChgQty(dlgPlGrid, row);
						}
					} else {
						dlgPlGrid.RefreshRow(row);
					}
				}
			}
		}
	};
	var param = {"mode" : mode, "callback" : callbackFn};
	$('#dlgDesmMirCreationPopUp').load("/desmMirSetupPopUp.do",null,function(data, status, xhr) {
		if(status == "success") {
			popMirSetupObj.init(param);
		}
	});
}

// TODO: 나중에 아래 묶기
function chgInspectionResult(grid,row,col) {
	if(row.INSPECTION_RESULT == "Defect") {
		row.REQ_CHG_QTYCanEdit = 1;
		//row.RECEIVED_QTYCanEdit = 1;
		//row.OSDM_OVER_QTYCanEdit = 1;
		//row.OSDM_SHORT_QTYCanEdit = 1;
		//row.OSDM_DAMAGE_QTYCanEdit = 1;
		//row.OSDM_MISSING_QTYCanEdit = 1;
	} else {
		row.REQ_CHG_QTY = null;
		row.RECEIVED_QTY = null;
		row.OSDM_OVER_QTY = null;
		row.OSDM_SHORT_QTY = null;
		row.OSDM_DAMAGE_QTY = null;
		row.OSDM_MISSING_QTY = null;
		
		row.REQ_CHG_QTYCanEdit = 0;
		row.RECEIVED_QTYCanEdit = 0;
		row.OSDM_OVER_QTYCanEdit = 0;
		row.OSDM_SHORT_QTYCanEdit = 0;
		row.OSDM_DAMAGE_QTYCanEdit = 0;
		row.OSDM_MISSING_QTYCanEdit = 0;
		row.REMARKSCanEdit = (isNewDesmMirCreationPopUp || v_desm_mir_creation_param.STATUS == 'Incomplete' || v_desm_mir_creation_param.STATUS == 'Rejected' || row.INSPECTION_RESULT == "Hold") ? 1 : 0;
	}
	dlgPlGrid.RefreshRow(row);
}

function chgReqChgQty(grid,row,col) {
	if(row.REQ_CHG_QTY == 'Y') {
		row.RECEIVED_QTYCanEdit = 1;
		row.OSDM_OVER_QTYCanEdit = 1;
		row.OSDM_SHORT_QTYCanEdit = 1;
		row.OSDM_DAMAGE_QTYCanEdit = 1;
		row.OSDM_MISSING_QTYCanEdit = 1;
	}
	else {
		row.RECEIVED_QTY = null;
		row.OSDM_OVER_QTY = null;
		row.OSDM_SHORT_QTY = null;
		row.OSDM_DAMAGE_QTY = null;
		row.OSDM_MISSING_QTY = null;
		
		row.RECEIVED_QTYCanEdit = 0;
		row.OSDM_OVER_QTYCanEdit = 0;
		row.OSDM_SHORT_QTYCanEdit = 0;
		row.OSDM_DAMAGE_QTYCanEdit = 0;
		row.OSDM_MISSING_QTYCanEdit = 0;
	}
	dlgPlGrid.RefreshRow(row);
}