var gridLang = {};
var fileLang = "en";
var mrrGrid;
var menuAuthList;
var toDay;
var gridReload = false;
var startRequestDate = "";
var endRequestDate = "";

function gridResize() {
	$("#gridMrr").width($(".table-responsive").width());
	$("#gridMrr").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	
	$('#btnMrrCreation').click(function () { btnMrrCreationClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
					
	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});		
	
	$("#txtMrrNo").keydown( function( keyInfo ) {
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
	var codeList = [/*{"CODE" : "R001"},*/{"CODE" : "R006"}/*,{"CODE" : "R004"}*/];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			var	/*result = setCombo(results.R001, "selClosed", "all");*/
				result = setCombo(results.R006, "selStatus", "all");
				/*result = setCombo(results.R004, "selMaterialType", "all");*/
		
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
	var mrrGridCol = {"Cfg": {"id"				: "mrrGrid"
									, "CfgId"			: "mrrGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "5"
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
									, "ColsPosLap":"1"}
							,"Panel" : {"Visible" : "0", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
							    {	"Name"	: "MRR_NO", "Width": "140", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openModal(Grid,Row,Col);" },
							    {	"Name"	: "STATUS", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "MRR_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "INVOICE_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "RECEIVED_DATE_FROM", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "RECEIVED_DATE_TO", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "INSPECTION_DATE_FROM", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "INSPECTION_DATE_TO", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    
							    {	"Name"	: "PREPARED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "PREPARED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								
//							    {	"Name"	: "CHECKED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONFIRMED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONFIRMED_DATE", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//								{	"Name"	: "APPROVED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//								{	"Name"	: "APPROVED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								
								
								{   "Name"  : "ATT"        , "Width": "100"	, "Type": "Icon", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openMrrAttModal(Grid,Row,Col)"	, "IconSize" : "2"	},
								{	"Name"	: "REMARK", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }/*,
								{	"Name"	: "CREATED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CREATION_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATE_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }*/
							]
							,"Header" : {
								"MRR_NO"	: "MRR No.", "Class" : "gridCenterText",
								"STATUS"	: "Status",
								"MRR_NAME" : "MRR Name",
								"INVOICE_NO" : "Invoice No.",
								"RECEIVED_DATE_FROM"	: "Received Date From",
								"RECEIVED_DATE_TO"	: "Received Date To",
								"INSPECTION_DATE_FROM"	: "Inspection Date From",
								"INSPECTION_DATE_TO"	: "Inspection Date To",
								
								"PREPARED_BY"	: "Prepared by",
								"PREPARED_DATE"	: "Prepared Date",
//								"CHECKED_BY"	: "Checked by",
								"CONFIRMED_BY"	: "Confirmed by",
								"CONFIRMED_DATE"	: "Confirmed Date",
//								"APPROVED_BY"	: "Approved by",
//								"APPROVED_DATE"	: "Approved date",
								"ATT"	: "Attach",
								"REMARK"	: "Remarks"/*,
								"CREATED_BY"	: "Creation By",
								"CREATION_DATE"	: "Creation Date",
								"LAST_UPDATED_BY"	: "Last Updated By",
								"LAST_UPDATE_DATE"	: "Last Updated Date"*/
							}
							};
							
	mrrGrid = TreeGrid( {Layout:{Data : mrrGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridMrr" );
	
	TGSetEvent("OnRenderFinish","mrrGrid",function(grid){
		gridReloadFn(grid);
		gridResize();
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
	
	/*if($('#txtSubconYn').val() == "Y") {
		$("#txtSubconstractor").val($("#txtDeptName").val());
		$("#txtSubconstractor").attr("readonly",true);
	}*/	
	
	
}

function gridReloadFn(grid) {
	var list = grid.Rows;
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(gridRow.Fixed == null){
		
			if(gridRow.ATT_CNT != null && gridRow.ATT_CNT != "" && gridRow.ATT_CNT > 0) {
				gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
				grid.RefreshRow(gridRow);
			}
		}
	} 
	
	gridReload = true;
}


function btnSearchClick() {
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
	}

	var pramData = {STATUS : $('#selStatus').val(), MRR_NO : $('#txtMrrNo').val(), MRR_NAME : $('#txtMrrName').val(),
					PROJECT_NO : $('#txtProjectCode').val(), INVOICE_NO : $('#txtInvoiceNo').val(), PACKAGE_NO :  $('#txtPackageNo').val(),
					RECEIVED_DATE_FROM : $('#txtStartReceivedDate').val(), RECEIVED_DATE_TO : $('#txtEndReceivedDate').val(), 
					INSPECTION_DATE_FROM : $('#txtStartInspectionDate').val(), INSPECTION_DATE_TO : $('#txtEndInspectionDate').val(),
					SHIPMENT_NO : $('#selShipmentNo').val()
					
	                };
	$.ajax({
		url: "/getDesmMrrList.do",		
		data: pramData,
		success: function (data, textStatus, jqXHR) {
			
			mrrGrid.Source.Data.Data.Body = [data.results];
			mrrGrid.Reload();
        }
    });
}

function btnMrrCreationClick() {
	
	var param = {"menuAuthList" : menuAuthList, "PROJECT_NO" : $('#txtProjectCode').val()};
	
	if($('#txtProjectCode').val() == null || $('#txtProjectCode').val() == "") {
		alert_modal("", 'Please wait for all option load complete.');
		return;
	}

	$('#dlgMrrPopUp').load("/desmMrrCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMrrCreationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
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
	var param = {"menuAuthList" : menuAuthList, "MRR_HEADER_ID" : row.MRR_HEADER_ID, "PROJECT_NO" : $('#txtProjectCode').val()};

	$('#dlgMrrPopUp').load("/desmMrrCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMrrCreationPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});	
			
		}
	});
}

function openMrrAttModal (grid,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.ATT_CNT != null && row.ATT_CNT != "" && row.ATT_CNT > 0){
		
		var param = Object.assign({}, row);
		
		if(param.ATTACH_GRP_CD == null) {
			param.ATTACH_GRP_CD = "";
		}
	
		if(param.MRR_HEADER_ID == null) {
			param.MRR_HEADER_ID = "";
		}
		
		param.fileUse = false;
		
		$('#dlgMrrPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransAttListPopUp(param, function (key, returnParam) {
					
					
	
				});
			}
		});		
			
	}
}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selShipmentNo option").remove();
			$("#selShipmentNo").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selShipmentNo").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}


function btnReseteClick(){
	$('#selStatus').val("");
	$('#selClosed').val("");
	$('#txtDescription').val("");
	$('#txtMrrNo').val("");
	$('#txtMrrName').val("");
	
	if($('#txtSubconYn').val() != "Y") {
		$('#txtSubconstractor').val("");
	}		
	
 	$('#txtStartRequestDate').val(startRequestDate);
 	$('#txtEndRequestDate').val(endRequestDate);
	
	$('#selMaterialType').val("");
}




