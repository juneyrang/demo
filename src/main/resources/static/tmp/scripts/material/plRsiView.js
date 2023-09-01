var gridLang = {};
var fileLang = "en";
var rsiViewGrid;
var menuAuthList;
var toDay;
var gridReload = false;


function gridResize() {
	$("#gridRsiView").width($(".table-responsive").width());
	$("#gridRsiView").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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

	$("#txtRsiNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtRsiName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtSubconstractor").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtPackingListNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { if(gridReload){btnReseteClick();} return false; });


	initCode();
}
function btnReseteClick(){
	$('#txtSubconstractor').val("");
	$('#txtRsiNo').val("");
	$('#txtRsiName').val("");
	$('#txtMaterialCode').val("");
	$('#txtStartRequestDate').val(toDay);
	$('#txtEndRequestDate').val(toDay);

	$('#selAttribute10').val("");
	$('#selQty').val("");
	$('#selType').val("");
	$('#txtCategory').val("");
	$('#txtSubCategory').val("");
	$('#txtNote').val("");
	$('#txtPackingListNo').val("");
}
function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);


	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

		 	toDay = results.DAY[0].CUR_DAY;

		 	$('#txtStartRequestDate').val(toDay);
		 	$('#txtEndRequestDate').val(toDay);

			initTypeCode(initTable);
        }
    });


}

function initTable(){

	var gridCode = getGridCode();
	var rsiViewGridCol = {"Cfg": {"id"				: "rsiViewGrid"
									, "CfgId"			: "rsiViewGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "2"
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
									, "SelectingSingle" : "1"
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
							,"Panel" : {"Visible" : "0", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
							    {	"Name"	: "RSI_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "RSI_NAME", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "STATUS", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "SUBCONTRACTOR", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "INVOICE_NUM", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "ATTRIBUTE3", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "UNIT", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "REQ_QTY", "Width": "140", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

							    {	"Name"	: "HANDOVER_QTY", "Width": "140", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "BALANCE_QTY", "Width": "140", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "LOCATION", "Width": "140", "Type": "Text", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

							    {	"Name"	: "REQUEST_DATE", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "MATERIAL_CODE", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
							    {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
							    {	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Header" : {
								"RSI_NO"	: "RSI No.", "Class" : "gridCenterText",
								"RSI_NAME" : "RSI Name",

								"STATUS"	: "Status",
								"SUBCONTRACTOR"	: "Subcontractor",
								"INVOICE_NUM" : "Invoice No.",
								"PACKAGE_NO" : "Package No.",
								"DESCRIPTION"	: "Description of Goods Specification",
								"ATTRIBUTE3"	: "Vendor",
								"UNIT"	: "Unit",
								"REQ_QTY"	: "Request Q’ty",

								"HANDOVER_QTY"	: "Handover Q’ty",
								"BALANCE_QTY"	: "Balance Q’ty",

								"REQUEST_DATE"	: "Request Date",
								"LOCATION"	: "Location",
								"HANDOVER_DATE"	: "Handover Date",

								"MATERIAL_CODE"	: "Material Code",
								"TYPE"	: "Type",
								"CATEGORY"	: "Category",
								"SUB_CATEGORY"	: "Sub-Category"
							}
							, "Solid" : [ 
											{ 
												"Kind":"Search", 
												"Cells": "Expression,Select,Mark,Find,Clear", 
												"ActionsRange": "1", 
												"Actions": "Filter;Mark;Find"
											}
										]
							};

	rsiViewGrid = TreeGrid( {Layout:{Data : rsiViewGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridRsiView" );

	TGSetEvent("OnRenderFinish","rsiViewGrid",function(grid){
		gridReload = true;
	});

	initMenuAuth(function (list) {
		menuAuthList = list;

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
		}
	});

	if($('#txtSubconYn').val() == "Y") {
		$("#txtSubconstractor").val($("#txtDeptName").val());
		$("#txtSubconstractor").attr("readonly",true);
	}

}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtProjectCode").val(), "IS_CONFIRM_MATERIAL" : "Y" },
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

	var pramData = {PROJECT_NO : $('#txtProjectCode').val(),
					RSI_NO : $('#txtRsiNo').val(), RSI_NAME : $('#txtRsiName').val(), SUBCONTRACTOR : $('#txtSubconstractor').val(), ATTRIBUTE10 : $('#selAttribute10').val(),
					MATERIAL_CODE : $('#txtMaterialCode').val(), START_REQUEST_DATE : $('#txtStartRequestDate').val(), END_REQUEST_DATE : $('#txtEndRequestDate').val(),
					BALANCE_QTY:$("#selQty").val(),TYPE : $('#selType').val(),CATEGORY : $('#txtCategory').val(),SUB_CATEGORY : $('#txtSubCategory').val(),
					PACKING_LIST_NO : $('#txtPackingListNo').val()
					};
	$.ajax({
		data: pramData,
		url: "/getDesmRsiViewList.do",
		success: function (data, textStatus, jqXHR) {

			rsiViewGrid.Source.Data.Data.Body = [data.results];
			rsiViewGrid.ReloadBody();
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

