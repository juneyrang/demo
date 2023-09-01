var gridLang = {};
var fileLang = "en";
var mrfGrid;
var menuAuthList;
var toDay;
var gridReload = false;
var startRequestDate = "";
var endRequestDate = "";

function gridResize() {
	$("#gridMrf").width($(".table-responsive").width());
	$("#gridMrf").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	
	$('#btnMrfCreation').click(function () { btnMrfCreationClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
					
	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});		

	$("#txtMrfName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});			
	
	
	$("#txtMrfNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtSubconstractor").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});		
	
		
	initCode();
}

function initCode() {
	var codeList = [{"CODE" : "R001"},{"CODE" : "R002"},{"CODE" : "R004"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			var	result = setCombo(results.R001, "selClosed", "all");
				result = setCombo(results.R002, "selStatus", "all");
				result = setCombo(results.R004, "selMaterialType", "all");
		
		 	toDay = results.DAY[0].CUR_DAY;		
		 	
			startRequestDate = results.DAY[0].PREV_7_DAY;
			endRequestDate = results.DAY[0].CUR_DAY;
		 	
		 	$('#txtStartRequestDate').val(startRequestDate);
		 	$('#txtEndRequestDate').val(endRequestDate);
			initTable();
        }
    });
	    
}

function initTable(){

	var gridCode = getGridCode();
	var mrfGridCol = {"Cfg": {"id"				: "mrfGrid"
									, "CfgId"			: "mrfGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "0"
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
									, "Sorting"			: "1"}
							,"Panel" : {"Visible" : "0", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
							    {	"Name"	: "MRF_NO", "Width": "160", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openModal(Grid,Row,Col);" },
							    {	"Name"	: "STATUS", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "MRF_NAME", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DESCRIPTION", "Width": "270", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUBCONTRACTOR", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REQUESTED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CHECKED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONFIRMED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "APPROVED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REQUEST_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "APPROVED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{   "Name"  : "ATT"        , "Width": "60"	, "Type": "Icon", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal(Grid,Row,Col)"	, "IconSize" : "2"	},
								{	"Name"	: "REMARK", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CREATED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CREATION_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATE_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Header" : {
								"MRF_NO"	: "MRF No.", "Class" : "gridCenterText",
								"STATUS"	: "Status",
								"MRF_NAME" : "MRF Name",
								"DESCRIPTION"	: "Description",
								"SUBCONTRACTOR"	: "Subcontractor",
								"REQUESTED_BY"	: "Requester",
								"CHECKED_BY"	: "Checked by",
								"CONFIRMED_BY"	: "Confirmed by",
								"APPROVED_BY"	: "Approved by",
								"REQUEST_DATE"	: "Request Date",
								"APPROVED_DATE"	: "Approved date",
								"ATT"	: "File",
								"REMARK"	: "Remarks",
								"CREATED_BY"	: "Creation By",
								"CREATION_DATE"	: "Creation Date",
								"LAST_UPDATED_BY"	: "Last Updated By",
								"LAST_UPDATE_DATE"	: "Last Updated Date"
							}
							};
							
	mrfGrid = TreeGrid( {Layout:{Data : mrfGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridMrf" );
	
	TGSetEvent("OnRenderFinish","mrfGrid",function(grid){
		gridReloadFn(grid);
		gridResize();
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
		}
	});	
	
	if($('#txtSubconYn').val() == "Y") {
		$("#txtSubconstractor").val($("#txtDeptName").val());
		$("#txtSubconstractor").attr("readonly",true);
	}	
	
	
}

function gridReloadFn(grid) {
	var list = grid.Rows;
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(gridRow.Fixed == null){
		
			if(gridRow.ATT_CNT != null && gridRow.ATT_CNT != "" && gridRow.ATT_CNT > 0){
				gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
				grid.RefreshRow(gridRow);
			}
		}
	} 
	
	
}

function btnMrfCreationClick() {
	
	var param = {"menuAuthList" : menuAuthList, "PROJECT_NO" : $('#txtProjectCode').val()};

	$('#dlgMrfPopUp').load("/desmMrfCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMrfCreationPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});	
			
		}
	});
}

function btnSearchClick() {
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
	}

	var pramData = {STATUS : $('#selStatus').val(), CLOSED_CODE : $('#selClosed').val(), MRF_NO : $('#txtMrfNo').val(), MRF_NAME : $('#txtMrfName').val(),
					DESCRIPTION : $('#txtDescription').val(), SUBCONTRACTOR : $('#txtSubconstractor').val(), PROJECT_NO : $('#txtProjectCode').val(),
					START_REQUEST_DATE : $('#txtStartRequestDate').val(), END_REQUEST_DATE : $('#txtEndRequestDate').val(), MATERIAL_TYPE : $('#selMaterialType').val()};
	$.ajax({
		url: "/getDesmMrfList.do",		
		data: pramData,
		success: function (data, textStatus, jqXHR) {
			
			mrfGrid.Source.Data.Data.Body = [data.results];
			mrfGrid.Reload();
        }
    });
}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val(), TYPE : "A"};

	$('#dlgRsiPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtProjectCode").val(returnParam.SEGMENT1);
					$("#txtProjectName").val(returnParam.NAME);	
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

function openModal(grid,row,col) {
	var param = {"menuAuthList" : menuAuthList, "MRF_HEADER_ID" : row.MRF_HEADER_ID, PROJECT_NO : $('#txtProjectCode').val()};	

	$('#dlgMrfPopUp').load("/desmMrfCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMrfCreationPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});	
			
		}
	});
}

function openAttModal (grid,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.ATT_CNT != null && row.ATT_CNT != "" && row.ATT_CNT > 0){
		
		var param = Object.assign({}, row);
		
		if(param.ATTACH_GRP_CD == null) {
			param.ATTACH_GRP_CD = "";
		}
	
		if(param.RSI_HEADER_ID == null) {
			param.RSI_HEADER_ID = "";
		}
		
		param.fileUse = false;
		
		$('#dlgMrfPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransAttListPopUp(param, function (key, returnParam) {
					
					
	
				});
			}
		});		
			
	}
}

function btnReseteClick(){
	$('#selStatus').val("");
	$('#selClosed').val("");
	$('#txtDescription').val("");
	$('#txtMrfNo').val("");
	$('#txtMrfName').val("");
	
	if($('#txtSubconYn').val() != "Y") {
		$('#txtSubconstractor').val("");
	}		
	
 	$('#txtStartRequestDate').val(startRequestDate);
 	$('#txtEndRequestDate').val(endRequestDate);
	
	$('#selMaterialType').val("");
}