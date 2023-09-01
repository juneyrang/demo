var gridLang = {};
var fileLang = "en";
var mirGrid;
var menuAuthList;
var toDay;
var gridReload = false;
var startRequestDate = "";
var endRequestDate = "";

function gridResize() {
	$("#gridMir").width($(".table-responsive").width());
	$("#gridMir").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	
	$('#btnMirCreation').click(function () { btnMirCreationClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
					
	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});		
	
	$("#txtMirNo").keydown( function( keyInfo ) {
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
	var codeList = [{"CODE" : "R002"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			var	result = setCombo(results.R002, "selStatus", "all");
		
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
	var mirGridCol = {"Cfg": {"id"				: "mirGrid"
									, "CfgId"			: "mirGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "3"
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
							    {	"Name"	: "MIR_NO", "Width": "160", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openModal(Grid,Row,Col);" },
							    {	"Name"	: "MIR_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "OSDM_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "C_VENDOR", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "C_INVOICE_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "STATUS", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "CATEGORY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "RECEIVED_DATE_FROM", "Visible" :"0", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "RECEIVED_DATE_TO", "Visible" :"0", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "INSPECTION_DATE", "Visible" :"0", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    
							    {	"Name"	: "RECEIVED_DATE_PERIOD", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "INPECTION_DATE_PERIOD", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    
							    {	"Name"	: "INSPECTION_LOCATION", "Visible" :"0", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "RESULT_OF_INSPECTION", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

							    {   "Name"  : "ATT"        , "Width": "60"	, "Type": "Icon", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal(Grid,Row,Col)"	, "IconSize" : "2", "Spanned":"1"	},
								{	"Name"	: "REMARKS", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CLIENT_COMMENTS", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    
							    {	"Name"	: "PREPARED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "PREPARED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								
							    {	"Name"	: "CHECKED1_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CHECKED1_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CHECKED2_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CHECKED2_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CHECKED3_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CHECKED3_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

//								{	"Name"	: "CLIENT_COMMENTS", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/pencil-alt.svg", "IconAlign" : "Right"	, "IconSize" : "2", "OnClickCell": "openCommetsModal( Grid, Row,Col )" },
								{	"Name"	: "CREATED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CREATION_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATED_BY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATE_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "2",
								"Class" : "gridCenterText",
								"MIR_NO"	: "MIR No.", "Class" : "gridCenterText", "MIR_NORowSpan" : "2",
								"MIR_NAME" : "MIR Name", "MIR_NAMERowSpan" : "2",
								"OSDM_NAME" : "OSDM Name", "OSDM_NAMERowSpan" : "2",
								"C_VENDOR" : "Vendor", "C_VENDORRowSpan" : "2",
								"C_INVOICE_NO" : "Invoice No.", "C_INVOICE_NORowSpan": "2",
								"STATUS"	: "Status", "STATUSRowSpan" : "2",
								"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
								//"RECEIVED_DATE_FROM"	: "Received\nDate From", "RECEIVED_DATE_FROMRowSpan" : "2",
								//"RECEIVED_DATE_TO"	: "Received\nDate To", "RECEIVED_DATE_TORowSpan" : "2",
								//"INSPECTION_DATE"	: "Inspection Date", "INSPECTION_DATERowSpan" : "2",
								"RECEIVED_DATE_PERIOD": "Received\nDate", "RECEIVED_DATE_PERIODRowSpan" : "2",
								"INPECTION_DATE_PERIOD": "Inspection\nDate", "INPECTION_DATE_PERIODRowSpan" : "2",
								//"INSPECTION_LOCATION"	: "Inspection\nLocation", "INSPECTION_LOCATIONRowSpan" : "2",
								"RESULT_OF_INSPECTION"	: "Result of\nInspection", "RESULT_OF_INSPECTIONRowSpan" : "2",
								
								"ATT"	: "File", "ATTRowSpan" : "2",
								"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2",
								"CLIENT_COMMENTS"	: "Client Comments", "CLIENT_COMMENTSRowSpan" : "2",
								
								"PREPARED_BY"	: "Prepared by", "PREPARED_BYRowSpan" : "2",
								"PREPARED_DATE"	: "Prepared Date", "PREPARED_DATERowSpan" : "2",
								"CHECKED1_BY"	: "CHECKED1", "CHECKED1_BYSpan" : "2",
								"CHECKED2_BY"	: "CHECKED2", "CHECKED2_BYSpan" : "2",
								"CHECKED3_BY"	: "CHECKED3", "CHECKED3_BYSpan" : "2",
								"CREATED_BY"	: "Creation By", "CREATED_BYRowSpan" : "2",
								"CREATION_DATE"	: "Creation Date", "CREATION_DATERowSpan" : "2",
								"LAST_UPDATED_BY"	: "Last Updated\nBy", "LAST_UPDATED_BYRowSpan" : "2",
								"LAST_UPDATE_DATE"	: "Last Updated\nDate", "LAST_UPDATE_DATERowSpan" : "2"
							},{
								"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"CHECKED1_BY"	: "by",
								"CHECKED1_DATE"	: "Date",
								"CHECKED2_BY"	: "by",
								"CHECKED2_DATE"	: "Date",
								"CHECKED3_BY"	: "by",
								"CHECKED3_DATE"	: "date"
							}]
							};
							
	mirGrid = TreeGrid( {Layout:{Data : mirGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridMir" );
	
	TGSetEvent("OnRenderFinish","mirGrid",function(grid){
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
		
			gridRow.ATT = (gridRow.ATT_CNT != null && gridRow.ATT_CNT != "" && gridRow.ATT_CNT > 0) ? '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg'
					//: '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
					: '';
			grid.RefreshRow(gridRow);
		}
	} 
	
	gridReload = true;
}


function btnSearchClick() {
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
	}

	var pramData = {STATUS : $('#selStatus').val(), MIR_NO : $('#txtMirNo').val(), MIR_NAME : $('#txtMirName').val(),
					PROJECT_NO : $('#txtProjectCode').val(), INVOICE_NO : $('#txtInvoiceNo').val(), PACKAGE_NO :  $('#txtPackageNo').val(),
					RECEIVED_DATE_FROM : $('#txtStartReceivedDate').val(), RECEIVED_DATE_TO : $('#txtEndReceivedDate').val(), 
					INSPECTION_DATE_FROM : $('#txtStartInspectionDate').val(), INSPECTION_DATE_TO : $('#txtEndInspectionDate').val()
					, SHIPMENT_NO : $('#selShipmentNo').val(), CATEGORY : $('#selCategory').val(), OSDM_YN : $('#selOsdmYn').val()
	                };
	$.ajax({
		url: "/getDesmMirList.do",		
		data: pramData,
		success: function (data, textStatus, jqXHR) {
			
			mirGrid.Source.Data.Data.Body = [data.results];
			mirGrid.Reload();

        }
    });
}

function btnMirCreationClick() {
	
	var param = {"menuAuthList" : menuAuthList, "PROJECT_NO" : $('#txtProjectCode').val()};
	
	if($('#txtProjectCode').val() == null || $('#txtProjectCode').val() == "") {
		alert_modal("", 'Please wait for all option load complete.');
		return;
	}

	$('#dlgMirPopUp').load("/desmMirCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMirCreationPopUp(param, function (key, returnParam) {
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
	var param = {"menuAuthList" : menuAuthList, "MIR_HEADER_ID" : row.MIR_HEADER_ID, "PROJECT_NO" : $('#txtProjectCode').val()};

	$('#dlgMirPopUp').load("/desmMirCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMirCreationPopUp(param, function (key, returnParam) {
				
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
		
		$('#dlgMirPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransAttListPopUp(param, function (key, returnParam) {
					
					
	
				});
			}
		});		
			
	}
}

/*
function openCommetsModal(grid,row,col) {
	var param = {"CLIENT_COMMENTS" : row.CLIENT_COMMENTS, TYPE : "VIEW"};

	$('#dlgMirPopUp').load("/desmMirCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMirCommentsPopUp(param, function (key, returnParam) {
			});

		}
	});
}
*/

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
	$('#txtMirNo').val("");
	$('#txtMirName').val("");

	$('#txtInvoiceNo').val("");
	$('#txtPackageNo').val("");
 	$('#txtStartReceivedDate').val("");
 	$('#txtEndReceivedDate').val("");
 	$('#txtStartInspectionDate').val("");
 	$('#txtEndInspectionDate').val("");
	
	$('#selOsdmYn').val("");
}

