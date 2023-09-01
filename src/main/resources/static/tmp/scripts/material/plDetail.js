var gridLang = {};
var fileLang = "en";
var idsmOsDetailGrid;
var gridReload = false;
var elSelLocation;
var isSubconUser = false;

function gridResize() {
	$("#gridIdsmOsDetail").width($(".table-responsive").width());
	$("#gridIdsmOsDetail").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	initControls();
	gridResize();
});


function initControls() {

	makeAutocomplete(
		"txtProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });
	$('#btnQrCode').click(function () { btnQrCodeClick(); return false; });
	$('#btnLocationSetup').click(function () { btnLocationSetupClick(); return false; });
	$('#btnLocationDelete').click(function () { btnLocationDeleteClick(); return false; });

	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtPackingListNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtVendor").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtDrawingNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtSearchValue1").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtCategory").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtSubCategory").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
 
	$("#txtNote").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	initCode();
}

function initCode() {
	initTypeCode(initTable);


}

function initTable(){


	var gridCode = getGridCode();

	var idsmOsDetailGridCol = {"Cfg": {"id"				: "idsmOsDetailGrid"
									, "CfgId"			: "idsmOsDetailGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "7"
									, "CacheTimeout" : "100"
									, "Style"			: "Material"
									, "Size"			: "Small"
									, "Scale"			: "90%"
									, "ConstWidth"		: "100%"
									, "MinTagHeight"	: "200"
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
									, "Sorting"			: "1"
									,"ColsPosLap":"1"
									//,"ColsLap":"1"
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
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ATTRIBUTE3", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ATTRIBUTE10", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//								{	"Name"	: "ATTRIBUTE9", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ITEM_SIZE", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "TAG_NO", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "UNIT", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "NOS", "Width": "80", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "RSI_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "OUT_QTY", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MRF_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RSI_CANCEL_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RETURN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "BALANCE_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MRF_BALANCE_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REMAIN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MATERIAL_CODE", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openModal(Grid,Row,Col);" },
								{	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COMMENTS", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
								{	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_TYPE", "Visible" :"0", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "GROSS", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "NET", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RT", "Visible" :"0", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ONSITE_ACTUAL_DATE", "Visible" :"0", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LOCATION", "Width": "120", "Type": "Text" , "Class" : "gridLinkText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openLocationModal(Grid,Row,Col);" },
								{	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MIR_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "OSDM_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "INSPECTION_RESULT", "Width": "135", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MIR_REMARK", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REPORT_SHORT", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_SHORT_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "REPORT_OVER", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_OVER_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "REPORT_DMG", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_DMG_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "REPORT_MISSING", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_MISSING_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "2",
								"Class" : "gridCenterText",
								"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",

								"ATTRIBUTE3"	: "Vendor", "ATTRIBUTE3RowSpan" : "2",
								"ATTRIBUTE10"	: $('#gridColShippingOrder').val(), "ATTRIBUTE10RowSpan" : "2",
//								"ATTRIBUTE9"	: "Sequence", "ATTRIBUTE9RowSpan" : "2",

								"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
								"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
								"ITEM_SIZE"	: "Size", "ITEM_SIZERowSpan" : "2",
								"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
								"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
								"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2",
								"TYPE"	: "Type", "TYPERowSpan" : "2",
								"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
								"SUB_CATEGORY"	: "Sub-Category", "SUB_CATEGORYRowSpan" : "2",
								"COMMENTS"	: "Note", "COMMENTSRowSpan" : "2",
								"ATT"	: "Photo", "ATTRowSpan" : "2",
								"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
								"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
								"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
								"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
								"RT"	: "RT", "RTRowSpan" : "2",
								"L_CM"	: "Measurement", "L_CMSpan" : "4",
								"W_CM"	: "Measurement",
								"H_CM"	: "Measurement",
								"VOLUME"	: "Measurement",
								"ONSITE_ACTUAL_DATE"	: "On Site\n(Incoming date)", "ONSITE_ACTUAL_DATERowSpan" : "2",
								"LOCATION"	: "Location", "LOCATIONRowSpan" : "2",
								"UNIT"	: "Unit", "UNITRowSpan" : "2",
								"NOS"	: "Nos", "NOSRowSpan" : "2",
								"IN_QTY"	: "IN\nQ’ty (A)", "IN_QTYRowSpan" : "2",
								"RSI_QTY"	: "RSI\nQ’ty (B)", "RSI_QTYRowSpan" : "2",
								"OUT_QTY"	: "OUT\nQ’ty (C)", "OUT_QTYRowSpan" : "2",
								"MRF_QTY"	: "MRF\nQ’ty (D)", "MRF_QTYRowSpan" : "2",
								"RSI_CANCEL_QTY"	: "RSI Cancel\nQ’ty (E)", "RSI_CANCEL_QTYRowSpan" : "2",
								"RETURN_QTY"	: "Return\nQ’ty (F)", "RETURN_QTYRowSpan" : "2",
								"BALANCE_QTY"	: "RSI Balance\nQ’ty (B-C-E)", "BALANCE_QTYRowSpan" : "2",
								"MRF_BALANCE_QTY"	: "MRF Balance\nQ’ty (D-E-F)", "MRF_BALANCE_QTYRowSpan" : "2",
								"REMAIN_QTY"	: "Remain\nQ’ty (A-C+F)", "REMAIN_QTYRowSpan" : "2",
								"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2",
								"MIR_NAME" : "Material Inspection", "MIR_NAMESpan" : "4",
								"OSDM_NAME" : "",
								"INSPECTION_RESULT": "",
								"MIR_REMARK": "",
								"REPORT_SHORT"	: "Short", "REPORT_SHORTSpan" : "2",
								"REPORT_SHORT_QTY"	: "Short",
								"REPORT_OVER"	: "Over", "REPORT_OVERSpan" : "2",
								"REPORT_OVER_QTY"	: "Over",
								"REPORT_DMG"	: "Dmg", "REPORT_DMGSpan" : "2",
								"REPORT_DMG_QTY"	: "Dmg",
								"REPORT_MISSING"	: "Missing", "REPORT_MISSINGSpan" : "2",
								"REPORT_MISSING_QTY"	: "Missing"
								},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"PACKAGE_LIST_NO"	: "Packing List\nNo.",

								"ATTRIBUTE3"	: "Vendor",
								"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
//								"ATTRIBUTE9"	: "Sequence",
								"PACKAGE_NO"	: "Package No.",
								"DESCRIPTION"	: "Description of Goods\nSpecification",
								"ITEM_SIZE"	: "Size",
								"DRAWING_NO"	: "Drawing No.",
								"TAG_NO"	: "Item Tag No.",
								"MATERIAL_CODE"	: "Material\nCode",
								"TYPE"	: "Type",
								"CATEGORY"	: "Category",
								"SUB_CATEGORY"	: "Sub-Category",
								"COMMENTS"	: "Note",
								"ATT"	: "Photo",
								"MATERIAL"	: "Material",
								"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
								"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
								"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
								"RT"	: "RT",
								"L_CM"	: "L(cm)",
								"W_CM"	: "W(cm)",
								"H_CM"	: "H(cm)",
								"VOLUME"	: "CBM(m3)",
								"ONSITE_ACTUAL_DATE"	: "On Site\n(Incoming date)",
								"LOCATION"	: "Location",
								"UNIT"	: "Unit",
								"NOS"	: "Nos",
								"IN_QTY"	: "IN\nQ’ty (A)",
								"RSI_QTY"	: "RSI\nQ’ty (B)",
								"OUT_QTY"	: "OUT\nQ’ty (C)",
								"MRF_QTY"	: "MRF\nQ’ty (D)",
								"RSI_CANCEL_QTY"	: "RSI Cancel\nQ’ty (E)",
								"RETURN_QTY"	: "Return\nQ’ty (F)",
								"BALANCE_QTY"	: "RSI Balance\nQ’ty (B-C-E)",
								"MRF_BALANCE_QTY"	: "MRF Balance\nQ’ty (D-E-F)",
								"REMAIN_QTY"	: "Remain\nQ’ty (A-C+F)",
								"REMARKS"	: "Remarks",
								"MIR_NAME" : "MIR Name",
								"OSDM_NAME" : "OSDM Name",
								"INSPECTION_RESULT": "Insp. Result",
								"MIR_REMARK": "MIR Remark",
								"REPORT_SHORT"	: "Short",
								"REPORT_SHORT_QTY"	: "Q’ty",
								"REPORT_OVER"	: "Over",
								"REPORT_OVER_QTY"	: "Q’ty",
								"REPORT_DMG"	: "Dmg",
								"REPORT_DMG_QTY"	: "Q’ty",
								"REPORT_MISSING"	: "Missing",
								"REPORT_MISSING_QTY"	: "Q’ty"
								}
							]
							, "Solid" : [ 
											{ 
												"Kind":"Search", 
												"Cells": "Expression,Select,Mark,Find,Clear", 
												"ActionsRange": "1", 
												"Actions": "Filter;Mark;Find"
											}
										]
							};

	idsmOsDetailGrid = TreeGrid( {Layout:{Data : idsmOsDetailGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridIdsmOsDetail" );

	TGSetEvent("OnRenderFinish","idsmOsDetailGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
	});
	TGSetEvent("OnChange","idsmOsDetailGrid",function(grid){
		gridReloadFn(grid);
	});


	initMenuAuth(function (list) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	});

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);
			initVoyageCombo();
			initAreaCombo();
			initCheckSubcon();
		}
	});
}

function initCheckSubcon() {
	$.ajax({
		url: "/getIsSubon.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			if(list.length > 0) {
				isSubconUser = (list[0]["SUBCON_YN"] === 'Y') ? true : false;
			}
        }
    });
}

function initAreaCombo() {
	$.ajax({
		url: "/getLocationCodeList.do",
		data: {"PROJECT_NO" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(setComboTitle(list, "selLocation", "")) {
				elSelLocation = $('#selLocation').SumoSelect({placeholder: 'All', csvSepChar: '!!!', csvDispCount: 1});
				$(".optWrapper").tooltip();
				movePageSearch();
			}
        }
    });
}

function gridReloadFn(grid) {
	var list = grid.Rows;

	for (var key in list) {
		var gridRow = list[key];

		if(gridRow.Fixed == null){

			if(gridRow.IS_CONFIRM_MATERIAL != null && gridRow.IS_CONFIRM_MATERIAL == "Y"){
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
			}

			if(gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0){
				gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
			}
			grid.RefreshRow(gridRow);
		}



	}
}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selAttribute10 option").remove();
			$("#selAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function btnSearchClick() {
	if(isSubconUser) {
		var optionCount = 0;
		if($('#selAttribute10').val() != "") optionCount++;
		if($('#txtPackingListNo').val() != "") optionCount++;
		if($('#txtPackageNo').val() != "") optionCount++;
		if($('#txtDescription').val() != "") optionCount++;
		if($('#txtVendor').val() != "") optionCount++;
		if($('#txtDrawingNo').val() != "") optionCount++;
		if($('#txtTagNo').val() != "") optionCount++;
		if($('#txtSearchValue1').val() != "") optionCount++;
		if(optionCount < 1) {
			alert_modal("", $('#alertSearchDtlOneCriteria').val());
			return;
		}
	}

	elSelLocation.sumo.hideOpts();

	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var paramData = {PROJECT_NO : $('#txtProjectCode').val(),
					 PACKAGE_LIST_NO : $('#txtPackingListNo').val(),
					 PACKAGE_NO : $('#txtPackageNo').val(),
					 DESCRIPTION : $('#txtDescription').val(),
					 DRAWING_NO : $('#txtDrawingNo').val(),
					 TAG_NO : $('#txtTagNo').val(),
					 QTY_TYPE : $('#selQtyType').val(),
					 QTY : $('#selQty').val(),
					 KEY1 : $('#selSearchKey1').val(),
					 VALUE1	: $('#txtSearchValue1').val(),
//					 MATERIAL_CODE : $('#txtMaterialCode​').val(),
//					 SIZE : $('#txtSize').val(),
//					 REMARKS : $('#txtRemarks').val(),
					 LOCATION : elSelLocation.sumo.getSelStr(),
					 SEQUENCE : $('#txtSequence').val(),
					 VENDOR : $('#txtVendor').val(),
					 ATTRIBUTE10 : $('#selAttribute10').val(),
					 TYPE : $('#selType').val(),
					 CATEGORY : $('#txtCategory').val(),
					 SUB_CATEGORY : $('#txtSubCategory').val(),
					 COMMENTS : $('#txtNote').val(),

	};

	$.ajax({
		url: "/getIdsmOsDetailList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {


			idsmOsDetailGrid.Source.Data.Data.Body = [data.results];
			idsmOsDetailGrid.Reload();


        }
    });
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

function btnReseteClick() {
	//$('#txtProjectCode').val("");
	//$('#txtProjectName').val("");
	$('#txtPackingListNo').val("");
	$('#txtPackageNo').val("");
	$('#txtDescription').val("");
	$('#txtVendor').val("");
	$('#txtDrawingNo').val("");
	$('#txtTagNo').val("");
	$('#selQtyType').val("rsi");
	$('#selQty').val("");
	$('#selAttribute10').val("");
//	$('#txtMaterialCode​').val("");
//	$('#txtSize').val("");
//	$('#txtRemarks​').val("");
	$('#selSearchType1').val("remarks");
	$('#txtSearchValue1').val("");
	$('#txtSequence').val("");

	$('#selType').val("");
	$('#txtCategory').val("");
	$('#txtSubCategory').val("");
	$('#txtNote').val("");

	elSelLocation.sumo.unSelectAll();
}

function btnSaveClick(){

	idsmOsDetailGrid.ActionAcceptEdit();

	var changeObject = idsmOsDetailGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	if(changeList.length == 0) {
		alert_modal("", $('#alertGridDataNull').val());
		return;
	}

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var updateList = [];
			for(var i = 0; i < changeList.length; i++){
				var rowId = changeList[i].id;
				var row = idsmOsDetailGrid.GetRowById(rowId);

				var rsiQty = row.RSI_QTY == null ? 0 : Number(row.RSI_QTY);
				var inQty = row.IN_QTY == null ? 0 : Number(row.IN_QTY);
				if(inQty < rsiQty) {
					alert_modal("", $('#alertPlDetailQtyError').val());
					return;
				}

				var reportShortYn = "0";
				var reportOverYn = "0";
				var reportDmgYn = "0";
				var reportMissingYn = "0";

				if(row.REPORT_SHORT_QTY != null &&  row.REPORT_SHORT_QTY != "" && row.REPORT_SHORT_QTY != "0") {
					reportShortYn = "1";
				}

				if(row.REPORT_OVER_QTY != null &&  row.REPORT_OVER_QTY != "" && row.REPORT_OVER_QTY != "0") {
					reportOverYn = "1";
				}

				if(row.REPORT_DMG_QTY != null &&  row.REPORT_DMG_QTY != "" && row.REPORT_DMG_QTY != "0") {
					reportDmgYn = "1";
				}

				if(row.REPORT_MISSING_QTY != null &&  row.REPORT_MISSING_QTY != "" && row.REPORT_MISSING_QTY != "0") {
					reportMissingYn = "1";
				}

				var updateRow = objNullCheck({"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "PACKAGE_NO" : row.PACKAGE_NO,
											  "MATERIAL_CODE" : row.MATERIAL_CODE,"ITEM_SIZE" : row.ITEM_SIZE, "DESCRIPTION" : row.DESCRIPTION, "DRAWING_NO" : row.DRAWING_NO, "LOCATION" : row.LOCATION,
											  "TAG_NO" : row.TAG_NO, "UNIT" : row.UNIT, "IN_QTY" : row.IN_QTY, "MATERIAL" : row.MATERIAL, "REMARKS" : row.REMARKS,
											  "REPORT_SHORT" : reportShortYn, "REPORT_OVER" : reportOverYn, "REPORT_DMG" : reportDmgYn, "REPORT_MISSING" : reportMissingYn,
											  "REPORT_SHORT_QTY" : row.REPORT_SHORT_QTY, "REPORT_OVER_QTY" : row.REPORT_OVER_QTY, "REPORT_DMG_QTY" : row.REPORT_DMG_QTY, "REPORT_MISSING_QTY" : row.REPORT_MISSING_QTY
											  });
				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsDetailList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						$('#btnSearch').click();
					}
				}
			});
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

function openModal(grid,row,col) {
	var param = {"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "MATERIAL_CODE" : row.MATERIAL_CODE};

	$('#dlgIdsmOsDetailPopUp').load("/desmPlDtlEditLogPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmPlDtlEditLogPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
}

function btnQrCodeClick() {
	// subcon user는 qrcode 프린터 출력 안되도록 수정..
	if(isSubconUser) {
		alert_modal("", $('#alertSubconHasNotRole').val());
		return;
	}
	
	idsmOsDetailGrid.ActionAcceptEdit();
	var selectList = idsmOsDetailGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO,
				   "MATERIAL_CODE" : gridRow.MATERIAL_CODE,
				   "CODE_TYPE" : "DETAIL"};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/saveIdsmQrCodeList.do",
		data: paramData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				var popup = window.open('/qrCodeMrd.do?codeType=DETAIL&fileNm=RD_QR_DETAIL', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
			}
		}
	});
}

function btnLocationDeleteClick() {
	idsmOsDetailGrid.ActionAcceptEdit();
	var selectList = idsmOsDetailGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			var selListParam = [];
			for(var i = 0; i < selectList.length; i++){

				var gridRow = selectList[i];
				var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
						   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
						   "MATERIAL_CODE" : gridRow.MATERIAL_CODE,
						   "CODE_TYPE" : "DETAIL"};

				selListParam.push(row);
			}
			var list = JSON.stringify(selListParam);
			var param = {"deleteList" : list};

			$.ajax({
				url: "/deleteDesmLocation.do",
				data: param,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						$('#btnSearch').click();
					}
				}
			});
		}
	});


}

function btnLocationSetupClick() {

	idsmOsDetailGrid.ActionAcceptEdit();
	var selectList = idsmOsDetailGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];

		if(gridRow.REMAIN_QTY == 0){
			alert_modal("", $('#alertLocationSaveQtyZero').val());
			return;
		}

		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "MATERIAL_CODE" : gridRow.MATERIAL_CODE,
				   "CODE_TYPE" : "DETAIL"};

		selListParam.push(row);
	}




	var param = {"selectList" : selListParam};

	$('#dlgIdsmOsDetailPopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});

}

function openLocationModal(grid,row,col) {

	idsmOsDetailGrid.ActionAcceptEdit();
	if(row.LOCATION == null || row.LOCATION == "") {
		return;
	}

	var selListParam = [];
	var selRow = {"PROJECT_NO" : row.PROJECT_NO,
			      "TRK_ITEM_NAME" : row.TRK_ITEM_NAME,
			      "MATERIAL_CODE" : row.MATERIAL_CODE,
			      "CODE_TYPE" : "DETAIL"};
	selListParam.push(selRow);
	var param = {"selectList" : selListParam, "S_TYPE" : "EDIT"};

	$('#dlgIdsmOsDetailPopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});

	/*
	var param = {"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "MATERIAL_CODE" : row.MATERIAL_CODE, CODE_TYPE : "DETAIL"};

	$('#dlgIdsmOsDetailPopUp').load("/desmLocationSearchPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationSearchPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
	*/
}

function movePageSearch(){
	if(gridReload){
		if(parent.DETAIL_PARAM != null && parent.DETAIL_PARAM.PACKAGE_NO != null){
			btnReseteClick();
			$("#txtPackageNo").val(parent.DETAIL_PARAM.PACKAGE_NO);
			btnSearchClick();
			parent.DETAIL_PARAM = {};
		}
	}else{
		setTimeout(function(){
			movePageSearch();
		},200)
	}
}

function openAttModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.ATTH_CNT > 0){
		var param = Object.assign({}, row);
			param.ATTACH_GRP_CD = param.FILE_GRP_CD;
			param.fileUse = false;
			param.hideThumbnailContent = false;
			param.width = "1000px";

		$('#dlgIdsmOsDetailPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

			if(status == "success"){

				initTransAttListPopUp(param, function (key, returnParam) {
					if(key == "save-item"){

					}
				});
			}
		});
	}
}