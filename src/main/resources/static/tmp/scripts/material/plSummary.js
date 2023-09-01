var gridLang = {};
var fileLang = "en";
var idsmOsSummaryGrid;
var gridReload = false;
var elSelLocation;
var isSubconUser = false;

function gridResize() {

	$("#gridIdsmOsSummary").width($(".table-responsive").width());
	$("#gridIdsmOsSummary").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	initDatePicker();
	
	$('#txtStartReceiptDate').attr('disabled', true);
 	$("#txtEndReceiptDate").attr('disabled', true);
 	
 	$('#txtStartMrrReceivedDate').attr('disabled', true);
 	$("#txtEndMrrReceivedDate").attr('disabled', true);

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
	$('#btnMirCreation').click(function () { btnMirCreationClick(); return false; });
	$('#btnMirCancel').click(function () { btnMirCancelClick(); return false; });
	$('#btnMirAccept').click(function () { btnMirAcceptClick(); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });

	$('#btnRfiCreation').click(function () { btnRfiCreationClick(); return false; });
	$('#btnRfiCancel').click(function () { btnRfiCancelClick(); return false; });
	$('#btnRfiAccept').click(function () { btnRfiAcceptClick(); return false; });

	$('#btnConfirmMaterial').click(function () { btnConfirmMaterialClick(); return false; });
	$('#btnCancelMaterial').click(function () { btnCancelMaterialClick(); return false; });

	$('#btnQrCode').click(function () { btnQrCodeClick(); return false; });
	$('#btnLocationSetup').click(function () { btnLocationSetupClick(); return false; });
	$('#btnLocationDelete').click(function () { btnLocationDeleteClick(); return false; });
	$('#btnReceiptDateSetup').click(function () { btnReceiptDateSetupClick(); return false; });

	$('#btnDetailItemCreation').click(function () { btnDetailItemCreationClick(); return false; });


	// pl list, package, descipriotn, vendor, remark
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

	$("#txtRemark").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$('#selReceipted').change(function(ev) {
		if($('#selReceipted option:selected').val() != "Y") {
			$('#txtStartReceiptDate').val("");
		 	$('#txtEndReceiptDate').val("");
		 	$('#txtStartReceiptDate').attr('disabled', true);
		 	$("#txtEndReceiptDate").attr('disabled', true);
		}
		else {
			$('#txtStartReceiptDate').attr('disabled', false);
		 	$("#txtEndReceiptDate").attr('disabled', false);
		}
	});
	
	$('#selMrrReceived').change(function(ev) {
		if($('#selMrrReceived option:selected').val() != "Y") {
			$('#txtStartMrrReceivedDate').val("");
		 	$('#txtEndMrrReceivedDate').val("");
		 	$('#txtStartMrrReceivedDate').attr('disabled', true);
		 	$("#txtEndMrrReceivedDate").attr('disabled', true);
		}
		else {
			$('#txtStartMrrReceivedDate').attr('disabled', false);
		 	$("#txtEndMrrReceivedDate").attr('disabled', false);
		}
	});

	initCode();
}

function initCode() {
	initTable();


}

function initTable(){
	var gridCode = getGridCode();
	var idsmOsSummaryGridCol = {"Cfg": {"id"				: "idsmOsSummaryGrid"
									, "CfgId"			: "idsmOsSummaryGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "9"
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
									,"ColsPosLap":"1"
									//,"ColsLap":"1"
									, "Code" : gridCode
									,"CopyCols" : "0"
									, "Sorting"			: "1"}
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
							    {	"Name"	: "STATUS", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "IS_CONFIRM_MATERIAL", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "CONFIRM_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "ATTRIBUTE3", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "ATTRIBUTE10", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//							    {	"Name"	: "ATTRIBUTE9", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

								{	"Name"	: "SEL_INVOICE_NUM", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openModal(Grid,Row,Col);" },
								{   "Name"  : "DETAIL_LIST", "Width": "25"	, "Type": "Text", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/list-ul.svg", "IconAlign" : "Center", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openDetail( Grid, Row,Col )"	, "IconSize" : "2"	},
								//{   "Name"  : "PACKAGE_HISTORY", "Width": "25"	, "Type": "Text", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/history.svg", "IconAlign" : "Center", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openHistory( Grid, Row,Col )"	, "IconSize" : "2"	},
								{	"Name"	: "PACKAGE_STATUS", "Width": "90", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "OUT_STATUS", "Width": "85", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "OUT_STATUS_QTY", "Width": "95", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_TYPE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SQM", "Width": "90", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "NET", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "GROSS", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								//{	"Name"	: "HAZARDOUS_MATERIAL", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "REMARKS", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RECEIPT_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
								{	"Name"	: "VISUAL_CHECK", "Width" :"120", "Type": "Enum", "Enum" : "|Good|Defect", "EnumKeys" : "|Good|Defect", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "MRR_RECEIVED_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
								
								{	"Name"	: "LAST_OUTGOING_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd" },
								{	"Name"	: "QTY", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "REMARK", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "VENDOR", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "OLD_INF_OF_VENDOR", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "RECEIVED_DATE", "Visible" :"0", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Format": "yy/MM/dd", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
								{	"Name"	: "STORAGE_LOCATION", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openLocationModal(Grid,Row,Col);" },
								{	"Name"	: "LOC_UPDATE_DATE", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "LOC_UPDATED_BY", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "SUB_CONTRACTOR", "Visible" :"0", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "REPORT_SHORT", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_SHORT_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REPORT_OVER", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_OVER_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REPORT_DMG", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_DMG_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REPORT_MISSING", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
								{	"Name"	: "REPORT_MISSING_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REPORT_LOST", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Visible" :"0" }
								//{	"Name"	: "REPORT_DESCRIPTION", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }

							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "2",
								"Class" : "gridCenterText",
								"STATUS"	: "Status", "STATUSRowSpan" : "2",
								"IS_CONFIRM_MATERIAL"	: "Material\nConfirm", "IS_CONFIRM_MATERIALRowSpan" : "2",
								"CONFIRM_DATE"	: "Material\nConfirm Date", "CONFIRM_DATERowSpan" : "2",
								"ATTRIBUTE3"	: "Vendor", "ATTRIBUTE3RowSpan" : "2",
								"ATTRIBUTE10"	: $('#gridColShippingOrder').val(), "ATTRIBUTE10RowSpan" : "2",
//								"ATTRIBUTE9"	: "Sequence", "ATTRIBUTE9RowSpan" : "2",

								"SEL_INVOICE_NUM"	: "Invoice No.", "SEL_INVOICE_NUMRowSpan" : "2",
								"PACKAGE_LIST_NO"	: "Packing list No.", "PACKAGE_LIST_NORowSpan" : "2",
								"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
								"DETAIL_LIST"	: " ", "DETAIL_LISTRowSpan" : "2",
								//"PACKAGE_HISTORY"	: " ", "DETAIL_LISTRowSpan" : "2",
								"PACKAGE_STATUS": "CLOSED", "PACKAGE_STATUSRowSpan" : "2",
								"OUT_STATUS"	: "A/O", "OUT_STATUSRowSpan" : "2",
								"OUT_STATUS_QTY"	: "A/O(Q'ty)", "OUT_STATUS_QTYRowSpan" : "2",
								"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
								"PACKAGE_TYPE"	: "Packing Style", "PACKAGE_TYPERowSpan" : "2",
								"L_CM"	: "Measurement", "L_CMSpan" : "4",
								"W_CM"	: "Measurement",
								"H_CM"	: "Measurement",
								"VOLUME"	: "Measurement",
								"SQM": "SQM(㎡)", "SQMRowSpan": "2",
								"NET"	: "Net Weight\n(Kg)", "NETRowSpan" : "2",
								"GROSS"	: "Gross Weight\n(Kg)", "GROSSRowSpan" : "2",
								//"HAZARDOUS_MATERIAL" : "Hazardous\nMaterial", "HAZARDOUS_MATERIALRowSpan" : "2",
								"REMARKS"	: "S\C &\nExcel Remark", "REMARKSRowSpan" : "2",
								"RECEIPT_DATE"	: "Received Date", "RECEIPT_DATERowSpan" : "2",
								"VISUAL_CHECK" : "MRR\nVisual Check", "VISUAL_CHECKRowSpan" : "2",
								"MRR_RECEIVED_DATE"	: "MRR\nReceived Date", "MRR_RECEIVED_DATERowSpan" : "2",
								
								"LAST_OUTGOING_DATE"	: "Last Outgoing Date", "LAST_OUTGOING_DATERowSpan" : "2",
								"QTY" : "QTY", "QTYRowSpan" : "2",
								
								"REMARK" : "Remark\n(UNIT, spare part..)", "REMARKRowSpan" : "2",
								"VENDOR" : "Vendor", "VENDORRowSpan" : "2",
								"OLD_INF_OF_VENDOR" : "Old inf of Vendor", "OLD_INF_OF_VENDORRowSpan" : "2",
								"RECEIVED_DATE" : "Received Date", "RECEIVED_DATERowSpan" : "2",
								"STORAGE_LOCATION" : "Location", "STORAGE_LOCATIONRowSpan" : "2",
								"LOC_UPDATE_DATE"	: "Location Last Updated Date", "LOC_UPDATE_DATERowSpan" : "2",
								"LOC_UPDATED_BY"	: "Location Last Updated By", "LOC_UPDATED_BYRowSpan" : "2",
								"SUB_CONTRACTOR" : "Issue",
								"REPORT_SHORT"	: "Short", "REPORT_SHORTSpan" : "2",
								"REPORT_SHORT_QTY"	: "Short",
								"REPORT_OVER"	: "Over", "REPORT_OVERSpan" : "2",
								"REPORT_OVER_QTY"	: "Over",
								"REPORT_DMG"	: "Dmg", "REPORT_DMGSpan" : "2",
								"REPORT_DMG_QTY"	: "Dmg",
								"REPORT_MISSING"	: "Missing", "REPORT_MISSINGSpan" : "2",
								"REPORT_MISSING_QTY"	: "Missing",
								"REPORT_LOST"	: "MIR Lost", "REPORT_LOSTRowSpan" : "2"},
								//"REPORT_DESCRIPTION"	: "MIR Description", "REPORT_DESCRIPTIONRowSpan" : "2"},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"STATUS"	: "Status",
								"IS_CONFIRM_MATERIAL"	: "Confirm\nMaterial",
								"CONFIRM_DATE"	: "Material\nConfirm Date",
								"ATTRIBUTE3"	: "Vendor",
								"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
//								"ATTRIBUTE9"	: "Sequence",
								"SEL_INVOICE_NUM"	: "Invoice No.",
								"PACKAGE_NO" : "Package No.",
								"DETAIL_LIST" : " ",
								//"PACKAGE_HISTORY" : " ",
								"PACKAGE_STATUS": "CLOSED",
								"OUT_STATUS"	: "A/O",
								"OUT_STATUS_QTY": "A/O(Q'ty)",
								"DESCRIPTION" : "Description of Goods\nSpecification",
								"PACKAGE_TYPE" : "Packing Style",
								"L_CM"	: "L (cm)",
								"W_CM"	: "W (cm)",
								"H_CM"	: "H (cm)",
								"VOLUME"	: "CBM (m3)",
								"SQM": "SQM(㎡)",
								"NET"	: "Net Weight\n(Kg)",
								"GROSS"	: "Gross Weight\n(Kg)",
								//"HAZARDOUS_MATERIAL" : "Hazardous\nMaterial",
								"REMARKS"	: "S/C &\nExcel Remark",
								"RECEIPT_DATE"	: "Received Date",
								"VISUAL_CHECK" : "MRR\nVisual Check", 
								"MRR_RECEIVED_DATE"	: "MRR\nReceived Date", 
								"LAST_OUTGOING_DATE"	: "Last Outgoing Date",
								"QTY" : "QTY",
								"REMARK" : "Remark\n(UNIT, spare part..)",
								"VENDOR" : "Vendor",
								"OLD_INF_OF_VENDOR" : "Old inf of Vendor",
								"RECEIVED_DATE" : "Received Date",
								"STORAGE_LOCATION" : "Location",
								"LOC_UPDATE_DATE"	: "Location Last Updated Date",
								"LOC_UPDATED_BY"	: "Location Last Updated By",
								"SUB_CONTRACTOR" : "Sub-contractor",
								"REPORT_SHORT"	: "Short",
								"REPORT_SHORT_QTY"	: "Q’ty",
								"REPORT_OVER"	: "Over",
								"REPORT_OVER_QTY"	: "Q’ty",
								"REPORT_DMG"	: "Dmg",
								"REPORT_DMG_QTY"	: "Q’ty",
								"REPORT_MISSING"	: "Missing",
								"REPORT_MISSING_QTY"	: "Q’ty",
								"REPORT_LOST"	: "MIR Lost"
								//"REPORT_DESCRIPTION"	: "MIR Description"
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

	idsmOsSummaryGrid = TreeGrid( {Layout:{Data : idsmOsSummaryGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridIdsmOsSummary" );

	TGSetEvent("OnRenderFinish","idsmOsSummaryGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
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
	
	/*
	initCheckSubcon(function (list) {
		if(list.length > 0) {
			isSubconUser = (list[0]["SUBCON_YN"] === 'Y') ? true : false;
		}
	});
	*/
	
	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);
			initVoyageCombo();
			initAreaCombo();
			initCheckSubcon();
		}
	});

	TGSetEvent("OnTip","idsmOsSummaryGrid",function(grid, row, col, tip, clientX, clientY, X, Y) {
		if(col=="DETAIL_LIST") {
			return "Show detail item list.";
		}
//		if(col=="PACKAGE_HISTORY") {
//			return "Show package history list.";
//		}
		return tip;
	});
	
	$('#selLocation').on('change', (ev) => {
		if(ev.currentTarget.value == 'ALL EXISTS' || ev.currentTarget.value == 'ALL NOT EXISTS') {
			var target = ev.currentTarget.value;
			$('#selLocation').find('option:selected').prop('selected', false);
			
			if(ev.currentTarget.sumo.placeholder == ' ALL EXISTS, ALL NOT EXISTS') {}
			else {
				$('#selLocation').find('option[value="' + target + '"]').prop('selected', true);
			}
			$('#selLocation')[0].sumo.reload();
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

			if(setComboTitle(list, "selLocation", "exist")) {
				elSelLocation = $('#selLocation').SumoSelect({placeholder: 'All', csvSepChar: '!!!'});
				$(".optWrapper").tooltip();
			}
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

function gridReloadFn(grid) {
	var list = grid.Rows;

	for (var key in list) {
		var gridRow = list[key];

		if(gridRow.Fixed == null){

			if(gridRow.IS_CONFIRM_MATERIAL != null && gridRow.IS_CONFIRM_MATERIAL == "Y"){
				gridRow.DESCRIPTIONCanEdit = 1;
				gridRow.REMARKCanEdit = 1;
				gridRow.VENDORCanEdit = 1;
				gridRow.OLD_INF_OF_VENDORCanEdit = 1;
				gridRow.RECEIVED_DATECanEdit = 1;
				gridRow.SUB_CONTRACTORCanEdit = 1;
				gridRow.REPORT_LOSTCanEdit = 1;
				gridRow.REPORT_DESCRIPTIONCanEdit = 1;
				gridRow.HAZARDOUS_MATERIALCanEdit = 1;
				gridRow.REMARKSCanEdit = 1;
				gridRow.QTYCanEdit = 1;
			}
			else{
				gridRow.DESCRIPTIONCanEdit = 0;
				gridRow.REMARKCanEdit = 0;
				gridRow.VENDORCanEdit = 0;
				gridRow.OLD_INF_OF_VENDORCanEdit = 0;
				gridRow.RECEIVED_DATECanEdit = 0;
				gridRow.SUB_CONTRACTORCanEdit = 0;
				gridRow.REPORT_LOSTCanEdit = 0;
				gridRow.REPORT_DESCRIPTIONCanEdit = 0;
				gridRow.HAZARDOUS_MATERIALCanEdit = 0;
				gridRow.REMARKSCanEdit = 0;
				gridRow.QTYCanEdit = 0;
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
		if($('#txtRemark').val() != "") optionCount++;
		if(optionCount < 1) {
			alert_modal("", $('#alertSearchPkgOneCriteria').val());
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
					 IS_CONFIRM_MATERIAL : $('#selMaterialConfirm').val(),
					 RECEIPTED : $('#selReceipted').val(),
					 ATTRIBUTE10 : $('#selAttribute10').val(),
					 REMARK : $('#txtRemark').val(),
					 SEQUENCE : $('#txtSequence').val(),
					 VENDOR : $('#txtVendor').val(),
					 //MIR_NO : $('#txtMirNo').val(),
					 //MIR_STATUS : $('#selMirStatus').val(),
					 LOCATION : elSelLocation.sumo.getSelStr(),
					 START_RECEIPT_DATE : $('#txtStartReceiptDate').val(),
					 END_RECEIPT_DATE : $('#txtEndReceiptDate').val(),
					 MRR_VISUAL_CHECK : $('#selMrrResult').val(),
					 MRR_RECEIVED : $('#selMrrReceived').val(),
					 START_MRR_RECEIVED_DATE : $('#txtStartMrrReceivedDate').val(),
					 END_MRR_RECEIVED_DATE : $('#txtEndMrrReceivedDate').val(),
	};

	$.ajax({
		url: "/getIdsmOsSummaryList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {


			idsmOsSummaryGrid.Source.Data.Data.Body = [data.results];
			idsmOsSummaryGrid.Reload();


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

function btnMirCreationClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/getIdsmOsSummaryListMirCheck.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			if (data.error != null) {
				alert_fail(data.error);
			} else {
				console.log("data",data);
				if(data.results.checkList.length == 0){
					MirCreationPopUp(list);
				}
				else{
					var msg = $('#alertSaveAlreadyData').val();
					var chkList = data.results.checkList;

					for(var i = 0; i < chkList.length; i++){
						var row = chkList[i];
						msg += "<br/>Package No. : " + row.PACKAGE_NO;
					}

					alert_modal("", msg);
				}
			}

        }
    });
}

function btnRfiCreationClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/getIdsmOsSummaryListRfiCheck.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			if (data.error != null) {
				alert_fail(data.error);
			} else {
				console.log("data",data);
				if(data.results.checkList.length == 0){
					RfiCreationPopUp(list);
				}
				else{
					var msg = $('#alertRfiNotCreate').val();
					var chkList = data.results.checkList;

					for(var i = 0; i < chkList.length; i++){
						var row = chkList[i];
						msg += "<br/>Package No. : " + row.PACKAGE_NO;
					}

					alert_modal("", msg);
				}
			}

        }
    });
}

function RfiCreationPopUp(list){
	var param = {"list" : list};

	$('#dlgIdsmOsSummaryPopUp').load("/idsmRfiCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmRfiCreationPopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					//var popup = window.open('/mrd.do?seq=' + returnParam, 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
					btnSearchClick();
				}
			});
		}
	});
}

function MirCreationPopUp(list){
	var param = {"list" : list};

	$('#dlgIdsmOsSummaryPopUp').load("/idsmMirCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmMirCreationPopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					var popup = window.open('/mrd.do?seq=' + returnParam + '&fileNm=mir', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
					btnSearchClick();
				}
			});
		}
	});
}

function btnRfiCancelClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/getIdsmOsSummaryListRfiCancelCheck.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			if (data.error != null) {
				alert_fail(data.error);
			} else {
				if(data.results.checkList.length == 0){
					rfiCancel(paramData);
				}
				else{
					var msg = $('#alertRfiNotCancel').val();
					var chkList = data.results.checkList;

					for(var i = 0; i < chkList.length; i++){
						var row = chkList[i];
						msg += "<br/>Package No. : " + row.PACKAGE_NO;
					}

					alert_modal("", msg);
				}
			}
		}
	});
}

function rfiCancel(paramData) {
	confirm_modal("", $('#alertCancel').val(), null, function (callobj, result) {
		if(result) {
			$.ajax({
				url: "/saveIdsmOsSummaryListRfiCancel.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
	});
}

function btnMirCancelClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/getIdsmOsSummaryListMirCancelCheck.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			if (data.error != null) {
				alert_fail(data.error);
			} else {
				if(data.results.checkList.length == 0){
					mirCancel(paramData);
				}
				else{
					var msg = $('#alertMirNotCancel').val();
					var chkList = data.results.checkList;

					for(var i = 0; i < chkList.length; i++){
						var row = chkList[i];
						msg += "<br/>Package No. : " + row.PACKAGE_NO;
					}

					alert_modal("", msg);
				}
			}
		}
	});
}

function mirCancel(paramData) {
	confirm_modal("", $('#alertCancel').val(), null, function (callobj, result) {
		if(result) {
			$.ajax({
				url: "/saveIdsmOsSummaryListMirCancel.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
	});
}

function btnRfiAcceptClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
			url: "/getIdsmOsSummaryListRfiAcceptCheck.do",
			data: paramData,
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					console.log("data",data);
					if(data.results.checkList.length == 0){
						RfiAccept(list);
					}
					else{
						var msg = $('#alertRfiNotCreate').val();
						var chkList = data.results.checkList;

						for(var i = 0; i < chkList.length; i++){
							var row = chkList[i];
							msg += "<br/>Package No. : " + row.PACKAGE_NO;
						}

						alert_modal("", msg);
					}
				}

	        }
	    });
}

function RfiAccept(list) {
	confirm_modal("", $('#alertAccept').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsSummaryListRfiAccept.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
	});
}

function btnCancelMaterialClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertCancel').val(), null, function (callobj, result) {
		if(result) {

			var selListParam = [];
			for(var i = 0; i < selectList.length; i++){

				var gridRow = selectList[i];
				var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
						   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
						   "PACKAGE_NO" : gridRow.PACKAGE_NO};

				selListParam.push(row);
			}

			var list = JSON.stringify(selListParam);

			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsSummaryListCancelMaterial.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "RSI") {
							var msg = $('#alertRsiAleadyErr').val() + " [Package No. : " + result.PACKAGE_NO + "]";
							alert_modal("", msg);
						}
						else {
							alert_fail(result.error);
						}

					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
	});
}

function btnLocationDeleteClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

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
						   "PACKAGE_NO" : gridRow.PACKAGE_NO,
						   "CODE_TYPE" : "SUMMARY"};

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
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

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
				   "CODE_TYPE" : "SUMMARY"};

		selListParam.push(row);
	}

	var param = {"selectList" : selListParam};

	$('#dlgIdsmOsSummaryPopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
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
	
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

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
				   "CODE_TYPE" : "SUMMARY"};

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
				var popup = window.open('/qrCodeMrd.do?codeType=SUMMARY&fileNm=RD_QR_SUMMARY', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
			}
		}
	});
}

function btnDetailItemCreationClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();

	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	else if(selectList.length > 1){
		alert_modal("", $('#alertGridSelectDataAll').val());
		return;
	}

	var gridRow = selectList[0];
	if(gridRow.IS_CONFIRM_MATERIAL == null || gridRow.IS_CONFIRM_MATERIAL == "N"){
		alert_modal("", $('#alertCreationDetailItemIsConfirm').val());
		return;
	}

	var param = gridRow;

	$('#dlgIdsmOsSummaryPopUp').load("/desmDetailItemCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmDetailItemCreationPopUp(param, function (key, returnParam) {

				if(key == "save-item"){

					$('#btnSearch').click();
				}
			});
		}
	});


}

function btnConfirmMaterialClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}



	confirm_modal("", $('#alertConfirm').val(), null, function (callobj, result) {
		if(result) {

			var selListParam = [];
			for(var i = 0; i < selectList.length; i++){

				var gridRow = selectList[i];
				var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
						   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
						   "PACKAGE_NO" : gridRow.PACKAGE_NO};

				selListParam.push(row);
			}

			var list = JSON.stringify(selListParam);

			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsSummaryListConfirmMaterial.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
	});
}

function btnMirAcceptClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();
	var selectList = idsmOsSummaryGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
			url: "/getIdsmOsSummaryListMirAcceptCheck.do",
			data: paramData,
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					console.log("data",data);
					if(data.results.checkList.length == 0){
						MirAccept(list);
					}
					else{
						var msg = $('#alertMirNotCreate').val();
						var chkList = data.results.checkList;

						for(var i = 0; i < chkList.length; i++){
							var row = chkList[i];
							msg += "<br/>Package No. : " + row.PACKAGE_NO;
						}

						alert_modal("", msg);
					}
				}

	        }
	    });



}

function MirAccept(list) {
	confirm_modal("", $('#alertAccept').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsSummaryListMirAccept.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
	});
}

function ShowCustomCalendar(G,row,col){
	if(col != "RECEIPT_DATE" && (row.IS_CONFIRM_MATERIAL == null || row.IS_CONFIRM_MATERIAL == "N")){
		return;
	}

	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
	   G.SetValue(row,col,n,1);
	   }


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function btnSaveClick(){

	idsmOsSummaryGrid.ActionAcceptEdit();

	var changeObject = idsmOsSummaryGrid.GetChanges();
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
				var row = idsmOsSummaryGrid.GetRowById(rowId);

				var updateRow = objNullCheck({"PACKAGE_NO" : row.PACKAGE_NO, "PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME,
												 "HAZARDOUS_MATERIAL" : row.HAZARDOUS_MATERIAL, "QTY" : row.QTY, "REMARK" : row.REMARK, "DESCRIPTION" : row.DESCRIPTION,
												 "VENDOR" : row.VENDOR, "OLD_INF_OF_VENDOR" : row.OLD_INF_OF_VENDOR, "RECEIVED_DATE" : formatDate(row.RECEIVED_DATE),
												 "STORAGE_LOCATION" : row.STORAGE_LOCATION, "SUB_CONTRACTOR" : row.SUB_CONTRACTOR, "REMARKS" : row.REMARKS,
												 "REPORT_LOST" : row.REPORT_LOST, "REPORT_DESCRIPTION" : row.REPORT_DESCRIPTION, "RECEIPT_DATE" : formatDate(row.RECEIPT_DATE)});

				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsSummaryList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						btnSearchClick();
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

function formatDate(d){
	if(d == null || d == ""){return "";}
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}

function chkDate(m){
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}

	return month;
}

function btnReseteClick() {
	//$('#txtProjectCode').val("");
	//$('#txtProjectName').val("");
	$('#txtPackingListNo').val("");
	$('#txtPackageNo').val("");
	$('#txtDescription').val("");
	$('#selMaterialConfirm').val("");
	$('#txtRemark').val("");
	$('#txtSequence').val(""),
	$('#txtVendor').val(""),
	$('#selReceipted').val(""),

	//$('#txtMirNo').val("");
	//$('#selMirStatus').val("");
	$('#selAttribute10').val("");
	elSelLocation.sumo.unSelectAll();
	
	$('#txtStartReceiptDate').val("");
 	$('#txtEndReceiptDate').val("");
 	$('#txtStartReceiptDate').attr('disabled', true);
 	$("#txtEndReceiptDate").attr('disabled', true);
 	
 	$('#txtStartMrrReceivedDate').val("");
 	$('#txtEndMrrReceivedDate').val("");
 	$('#txtStartMrrReceivedDate').attr('disabled', true);
 	$("#txtEndMrrReceivedDate").attr('disabled', true);

}
function openDetail(grid,row,col) {
	parent.DETAIL_PARAM = {"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "PACKAGE_NO" : row.PACKAGE_NO};
	parent.moveName("Detail Item");
	parent.$('.wrap-loading').removeClass('dp_n'); //로딩중 화면 제거
	parent.$('#wrap-loading').removeClass('dp_n'); //로딩중 화면 제거
}

function openModal(grid,row,col) {
	var param = {"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "PACKAGE_NO" : row.PACKAGE_NO};

	$('#dlgIdsmOsSummaryPopUp').load("/desmPlSummaryEditLogPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmPlSummaryEditLogPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
}

//function openHistory(grid, row, col) {
//	var param = {"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "PACKAGE_NO" : row.PACKAGE_NO};
//
//	$('#dlgIdsmOsSummaryPopUp').load("/desmPlSummaryHistoryPopUp.do", null, function(data, status, xhr) {
//		if(status == "success") {
//			initDesmPlSummaryHistoryPopUp(param, function (key, returnParam) {
//				if(key == "save-item") {}
//			});
//		}
//	});
//}

function openLocationModal(grid,row,col) {
	idsmOsSummaryGrid.ActionAcceptEdit();

	if(row.STORAGE_LOCATION == null || row.STORAGE_LOCATION == "") {
		return;
	}


	var selListParam = [];
	var selRow = {"PROJECT_NO" : row.PROJECT_NO,
			      "TRK_ITEM_NAME" : row.TRK_ITEM_NAME,
			      "PACKAGE_NO" : row.PACKAGE_NO,
			      "CODE_TYPE" : "SUMMARY"};
	selListParam.push(selRow);
	var param = {"selectList" : selListParam, "S_TYPE" : "EDIT"};

	$('#dlgIdsmOsSummaryPopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});

	/*
	var param = {"PROJECT_NO" : row.PROJECT_NO, "TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "PACKAGE_NO" : row.PACKAGE_NO, CODE_TYPE : "SUMMARY"};

	$('#dlgIdsmOsSummaryPopUp').load("/desmLocationSearchPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationSearchPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
	*/
}


function btnReceiptDateSetupClick() {
	idsmOsSummaryGrid.ActionAcceptEdit();

	var selectList = idsmOsSummaryGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var param = {};

	$('#dlgIdsmOsSummaryPopUp').load("/desmPackageDateChangePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmPackageDateChangePopUp(param, function (key, returnParam) {
				if(key == "edit-item"){
					//var receiptDate = Date.parse(returnParam.RECEIPT_DATE);
					var receiptDate;
					receiptDate = (returnParam.RECEIPT_DATE != null) ? Date.parse(returnParam.RECEIPT_DATE) + 1000*60*60*9 : "";
					for(var i = 0; i < selectList.length; i++){
//						if(selectList[i].IS_CONFIRM_MATERIAL == "Y"){
							idsmOsSummaryGrid.SetValue(selectList[i],"RECEIPT_DATE",receiptDate,1);
//						}
					}
				}
			});

		}
	});
}