
var mainGrid;
var gridExportStatusCodeList;
var gridLangUrl;
var menuAuthList;

$(window).resize(function() {
	$("#gridMain").width($("body").width() - 31);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
});

$(document).ready(function () {
	$("#gridMain").width($("body").width() - 31);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);

	initControls();
});

//Control 초기화, 자동완성, 이벤트 바인딩 등
function initControls() {

	TGSetEvent("OnRenderFinish","exportClearanceMainGrid",function(gird){
		mainGridReload(gird);
	});

	//Project Code
	makeAutocomplete(
		"txtSearchProjectCode", 		//자동완성 입력 input
		"",								//keyword2 파라메터 id
		"txtSearchProjectName",			//clear필드 id
		//"/getTransProject.do",  		//검색 URL
		"/getErpProject.do",  			//검색 URL
		2,								//검색 실행을 위한 keyword 최소 길이
		false,							//선택완료 마크 표시 여부
		function(event, ui) {
			$("#txtSearchProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtSearchProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	//Creator
	makeAutocomplete(
		"txtSearchCreator", 		//자동완성 입력 input
		"",								//keyword2 파라메터 id
		"txtSearchCreatorAD,txtSearchCreatorDept",			//clear필드 id
		"/getSearchErpEmployee.do",  		//검색 URL
		2,								//검색 실행을 위한 keyword 최소 길이
		false,							//선택완료 마크 표시 여부
		function(event, ui) {
			$("#txtSearchCreator").val(ui.item.value.split("|")[0]);
			$("#txtSearchCreatorID").val(ui.item.value.split("|")[2]);
			$("#txtSearchCreatorDept").val(ui.item.value.split("|")[3]);

			return false;
		}
	);

	//Approver
	makeAutocomplete(
		"txtSearchApprover", 		//자동완성 입력 input
		"",								//keyword2 파라메터 id
		"txtSearchApproverAD,txtSearchApproverDept",			//clear필드 id
		"/getSearchErpEmployee.do",  		//검색 URL
		2,								//검색 실행을 위한 keyword 최소 길이
		false,							//선택완료 마크 표시 여부
		function(event, ui) {
			$("#txtSearchApprover").val(ui.item.value.split("|")[0]);
			$("#txtSearchApproverID").val(ui.item.value.split("|")[2]);
			$("#txtSearchApproverDept").val(ui.item.value.split("|")[3]);

			return false;
		}
	);

	//Export No
	makeAutocomplete(
		"txtSearchExportNo", 		//자동완성 입력 input
		"txtSearchProjectCode",								//keyword2 파라메터 id
		"",			//clear필드 id
		"/getSearchExportNo.do",  		//검색 URL
		4,								//검색 실행을 위한 keyword 최소 길이
		false,							//선택완료 마크 표시 여부
		function(event, ui) {
			$("#txtSearchExportNo").val(ui.item.value.split("|")[0]);
			return false;
		}
	);

	//Invoice No
	makeAutocomplete(
		"txtSearchInvoiceNo", 			//자동완성 입력 input
		"txtSearchProjectCode",			//keyword2 파라메터 id
		"",			//clear필드 id
		"/getSearchErpInvoiceNo.do",  		//검색 URL
		4,								//검색 실행을 위한 keyword 최소 길이
		false,							//선택완료 마크 표시 여부
		function(event, ui) {
			$("#txtSearchInvoiceNo").val(ui.item.value.split("|")[0]);
			return false;
		}
	);

	$('#iconSearchProjectCode').click(function () { iconSearchProjectCodeClick(); return false;});
	$('#iconSearchCreator').click(function () { iconSearchCreatorClick(); return false;});
	$('#iconSearchApprover').click(function () { iconSearchApproverClick(); return false;});
	$('#iconSearchExportNo').click(function () { iconSearchExportNoClick(); return false;});
	$('#iconSearchInvoiceNo').click(function () { iconSearchInvoiceNoClick(); return false;});
	$('#btnCreateItem').click(function () { btnCreateItemClick(); return false; });
	$('#btnCopyItem').click(function () { btnCopyItemClick(); return false; });
	$('#btnSearch').click(function () { btnSearchClick(); return false;});
	$('#btnReset').click(function () { btnResetClick(); return false;});

	$("#txtSearchProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			btnSearchClick();
		}
	});

	initDatePicker();
	initCode();
}

//콤보 코드 등록
function initCode() {
	var codeList = [{"LOOKUP_TYPE" : "ZMFG_PO_EXPORT_PR_STATUS_LOV"}];
	var paramList = JSON.stringify(codeList);

	$.ajax({
		url: "/getErpCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			gridExportStatusCodeList = setGridCombo(results.ZMFG_PO_EXPORT_PR_STATUS_LOV, "na");
			var	result = setCombo(results.ZMFG_PO_EXPORT_PR_STATUS_LOV, "selSearchStatus", "all");

			btnResetClick();
			initTable();
        }
    });
}

//Grid 설정 및 초기화
function initTable() {
	gridLangUrl = "/resources/gridJs/Languages/TextKR.js";
	var gridCode = getGridCode();
	var mainGridCol = {
		"Cfg": {
			"id"				: "exportClearanceMainNewGrid"
			, "CfgId"			: "exportClearanceMainNewGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "730"
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
			, "Sorting"			: "1"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Toolbar" : {
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [
	 			{ "Name": "EXPORT_NO", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText gridCenterText", "OnClickCell": "openExportClearanceModal(Grid, Row, Col)"   },
	 			{ "Name": "STATUS", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  },
	 			//{ "Name": "NON_PROJECT", "Width": "100", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			//{ "Name": "APPLY_DATE", "Width": "120", "Type": "Date", "Format": "yy/MM/dd", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			//{ "Name": "EPC_PROJECT_NAME", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "PROJECT_NO", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			//{ "Name": "TASK_NUMBER", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "INVOICE_NO", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "MAIN_ITEM", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "CURRENCY_CODE", "Width": "100", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText gridCenterText" },
	 			{ "Name": "TOTAL_AMOUNT", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "CODE_COMBINATION_TEXT", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "QUANTITY", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "QUANTITY_UNIT", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			{ "Name": "PACKING_COUNT", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "EXCHAGE_TYPE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			//{ "Name": "EXCHAGE_DATE", "Width": "120", "Type": "Date", "Format": "yy/MM/dd", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "NET_WEIGHT", "Width": "100", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "NET_WEIGHT_UNIT", "Width": "100", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			{ "Name": "GROSS_WEIGHT", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "GROSS_WEIGHT_UNIT", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			{ "Name": "CUSTOMS_TYPE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "ITEM_STORED_PLACE", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "PORT_OF_LOADING_DESC", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "PORT_OF_DESTINATION_DESC", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "MANUFACTURER", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "EXPORTER", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "PRICE_TERMS", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "SHIP_NAME", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "REQUEST_IC_DATE", "Width": "120", "Type": "Date", "Format": "yy/MM/dd", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			//{ "Name": "REMARKS", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "IS_CARRIED_IN_YN", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },	//재반입여부
	 			{ "Name": "STRATEGIC_ITEM_YN", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },	//전략물자포함
	 			//{ "Name": "LICENSE_NO", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "ATTRIBUTE2", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },		//전략물자 대상/비대상 여부
	 			//{ "Name": "ATTRIBUTE3", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },		//전략물자 해당/비해당 판정서 URL
	 			//{ "Name": "ATTRIBUTE4", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "DECISION_MAKER", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "DECISION_REASON", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "PROJECT_MEMBER", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "PROJECT_MEMBER_TEAM", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "ENGINEER", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "ENGINEER_TEAM", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "CREATION_DATE", "Width": "120", "Type": "Date", "Format": "yy/MM/dd", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			{ "Name": "CREATED_BY_NAME", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "LAST_UPDATE_DATE", "Width": "120", "Type": "Date", "Format": "yy/MM/dd", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			{ "Name": "LAST_UPDATED_BY_NAME", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			{ "Name": "APPROVED_DATE", "Width": "120", "Type": "Date", "Format": "yy/MM/dd", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
	 			{ "Name": "APPROVER_NAME", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "CL_DOCUMENT_NO", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "CI_LICENSE_DATE", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	 			//{ "Name": "REFUND_STATUS", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" }
	 		],
	 	   	"Header" : {
	 			"EXPORT_NO" : "Export No", "Class" : "gridCenterText",
	 			"STATUS" : "Status",
	 			//"NON_PROJECT" : "Non Proj.",
	 			//"APPLY_DATE" : "Apply Date",
	 			//"EPC_PROJECT_NAME" : "EPC Proj.",
	 			"PROJECT_NO" : "Project No",
	 			//"TASK_NUMBER" : "Task No",
	 			"INVOICE_NO" : "Invoice No",
	 			"MAIN_ITEM" : "Main Item",
	 			"CURRENCY_CODE" : "Currency",
	 			"TOTAL_AMOUNT" : "Total Amount",
	 			"CODE_COMBINATION_TEXT" : "Charge Account",
	 			"QUANTITY" : "Quantity",
	 			"QUANTITY_UNIT" : "Quantity Unit",
	 			"PACKING_COUNT" : "Packing Count",
	 			//"EXCHAGE_TYPE" : "Exchange Type",
	 			//"EXCHAGE_DATE" : "Exchange Date",
	 			"NET_WEIGHT" : "Net Weight",
	 			//"NET_WEIGHT_UNIT" : "Net Weight Unit",
	 			"GROSS_WEIGHT" : "Gross Weight",
	 			//"GROSS_WEIGHT_UNIT" : "Gross Weight Unit",
	 			"CUSTOMS_TYPE" : "Customs Type",
	 			"ITEM_STORED_PLACE" : "Item Stored Place",
	 			"PORT_OF_LOADING_DESC" : "Port Of Loading",
	 			"PORT_OF_DESTINATION_DESC" : "Port Of Destination",
	 			//"MANUFACTURER" : "Manufacturer",
	 			//"EXPORTER" : "Exporter",
	 			"PRICE_TERMS" : "Price Terms",
	 			//"SHIP_NAME" : "Ship Name",
	 			//"REQUEST_IC_DATE" : "Request Ic Date",
	 			//"REMARKS" : "Remarks",
	 			"IS_CARRIED_IN_YN" : "재반입여부",
	 			"STRATEGIC_ITEM_YN" : "전략물자포함",
	 			//"LICENSE_NO" : "License No",
	 			//"ATTRIBUTE2" : "해당/비해당",		//전략물자 대상/비대상 여부
	 			//"ATTRIBUTE3" : "해당/비해당 판정서",	//전략물자 해당/비해당 판정서 URL
	 			//"ATTRIBUTE4" : "수출허가서",
	 			//"DECISION_MAKER" : "Decision Maker",
	 			//"DECISION_REASON" : "Decision Reason",
	 			"PROJECT_MEMBER" : "Project Manager",
	 			//"PROJECT_MEMBER_TEAM" : "Project Manager Team",
	 			"ENGINEER" : "Engineer",
	 			//"ENGINEER_TEAM" : "Engineer Team",
	 			"CREATION_DATE" : "Creation Date",
	 			"CREATED_BY_NAME" : "Creater",
	 			"LAST_UPDATE_DATE" : "Update Date",
	 			"LAST_UPDATED_BY_NAME" : "Updater",
	 			"APPROVED_DATE" : "Approved Date",
	 			"APPROVER_NAME" : "Approver",
	 			//"CL_DOCUMENT_NO" : "CL Doc No",
	 			//"CI_LICENSE_DATE" : "CL License Date",
	 			//"REFUND_STATUS" : "Refund Status"
	 		}
	};			

	mainGrid =	TreeGrid( {Layout:{Data:mainGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridMain" );
	
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
}

function initDatePicker( ) {
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd"
	});
}

function setCombo(data, id, type){
	var elId = "#" + id;
	$(elId).html("");

	var html = '';

	if(type == "all"){
		html = '<option value="">' + $('#selectNullTextAll').val() + '</option>';
	}
	else if(type == "sel"){
		html = '<option value="">' + $('#selectNullTextSel').val() + '</option>';
	}
	else if(type == "na"){
		html = '<option value=""></option>';
	}


	for(var i = 0; i < data.length; i++){
		var item = data[i];
		html += '<option value="' + item.DESCRIPTION + '">' + item.DISPLAYED_FIELD + '</option>';
	}

	$(elId).append(html);

	return true;
}

function setGridCombo(data, type){
	var code = "";
	var label = "";

	if(type == "all"){

		code = "|";
		label = "|전체";
	}
	else if(type == "sel"){

		code = "|";
		label = "|선택";
	}
	else if(type == "na"){
		code = "|";
		label = "|";
	}

	for(var i = 0; i < data.length; i++){
		var item = data[i];
		code += "|" + item.DESCRIPTION;
		label += "|" + item.DISPLAYED_FIELD;
	}

	var target = {"code" : code, "label" : label};

	return target;
}

//Project 검색 아이콘 클릭
function iconSearchProjectCodeClick() {
	//var param = { "PROJECT_CODE": $('#txtDlgProjectNo').val() };
	var param = Object.assign({});
	param.PROJECT_CODE =$('#txtSearchProjectCode').val();
	param.keyword2 = "";
	param.url = "/getErpProjectDlg.do";


	$('#divPopUp').load("/erpProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			$('#dlgProjectList').on('shown.bs.modal', function () {
				$('#dlgProjectList').click();
			});

			$('#dlgProjectList').on('hidden.bs.modal', function () {
			  	closePopUp();
			})

			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					searchProjectCodeGetParam(param);
				}
			});

			$('#dlgProjectList').modal('show');
		}
	});
}
function searchProjectCodeGetParam(param) {
    $("#txtSearchProjectCode").val(param.PROJECT_NO);
	$("#txtSearchProjectName").val(param.PROJECT_NAME);

	$('#dlgProjectList').modal('hide');
}

//Creator 검색 아이콘 클릭
function iconSearchCreatorClick() {
	var param = {"EMP_KEY" : $('#txtSearchCreator').val()};

	$('#divPopUp').load("/erpEmpListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			$('#dlgEmpList').on('shown.bs.modal', function () {
				$('#dlgEmpList').click();
			});

			$('#dlgEmpList').on('hidden.bs.modal', function () {
			  	closePopUp();
			})

			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					searchCreatorGetParam(param);
				}
			});

			$('#dlgEmpList').modal('show');
		}
	});
}
function searchCreatorGetParam(param) {
    //$("#txtSearchCreatorID").val(param.EMPLOYEE_NUMBER);
	$("#txtSearchCreatorID").val(param.USER_ID); // 20211222 EMPLOYEE_NUMBER가 AD로 되어있어서 CREATED_BY USER_ID로 변경하기 위해 수정
    $("#txtSearchCreator").val(param.NAME);
    $("#txtSearchCreatorDept").val(param.DEPT_NAME);
	$('#dlgEmpList').modal('hide');
}

//Approver No 검색 아이콘 클릭
function iconSearchApproverClick() {
	var param = {"EMP_KEY" : $('#txtSearchApprover').val()};

	$('#divPopUp').load("/erpEmpListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			$('#dlgEmpList').on('shown.bs.modal', function () {
				$('#dlgEmpList').click();
			});

			$('#dlgEmpList').on('hidden.bs.modal', function () {
			  	closePopUp();
			})

			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					searchApproverGetParam(param);
				}
			});

			$('#dlgEmpList').modal('show');
		}
	});
}
function searchApproverGetParam(param) {
    //$("#txtSearchApproverID").val(param.EMPLOYEE_NUMBER);
	$("#txtSearchApproverID").val(param.USER_ID); // 20211222 EMPLOYEE_NUMBER가 AD로 되어있어서 CREATED_BY USER_ID로 변경하기 위해 수정
    $("#txtSearchApprover").val(param.NAME);
    $("#txtSearchApproverDept").val(param.DEPT_NAME);
	$('#dlgEmpList').modal('hide');
}

//Export No 검색 아이콘 클릭
function iconSearchExportNoClick() {

	var param = {"EXPORT_NO" : $('#txtSearchExportNo').val()};

	$('#divPopUp').load("/exportNoPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			$('#dlgExportNoList').on('shown.bs.modal', function () {
				$('#dlgExportNoList').click();
			});

			$('#dlgExportNoList').on('hidden.bs.modal', function () {
			  	closePopUp();
			})

			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					searchExportNoGetParam(param);
				}
			});

			$('#dlgExportNoList').modal('show');
		}
	});
}
function searchExportNoGetParam(param) {
    $("#txtSearchExportNo").val(param.EXPORT_NO);
	$('#dlgExportNoList').modal('hide');
}

//Invoice No 검색 아이콘 클릭
function iconSearchInvoiceNoClick() {
	var param = {"INVOICE_NO" : $('#txtSearchInvoiceNo').val()};

	$('#divPopUp').load("/erpInvNoListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			$('#dlgInvoiceNoList').on('shown.bs.modal', function () {
				$('#dlgInvoiceNoList').click();
			});

			$('#dlgInvoiceNoList').on('hidden.bs.modal', function () {
			  	closePopUp();
			})

			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					searchInvoiceNoGetParam(param);
				}
			});

			$('#dlgInvoiceNoList').modal('show');
		}
	});
}
function searchInvoiceNoGetParam(param) {
    $("#txtSearchInvoiceNo").val(param.INVOICE_NO);
	$('#dlgInvoiceNoList').modal('hide');
}

//Item 생성 버튼 클릭
function btnCreateItemClick(){
	openExportClearanceModal(null, null, null);
}

//Item 복사 버튼 클릭
function btnCopyItemClick(){
	var selectList = mainGrid.GetSelRows();
	if(selectList.length < 1) {
		alert_modal("","Item을 선택하세요.");
		return;
	}
	var row = selectList[0];
	row.EXPORT_NO = null;
	row['modalType'] = 'copy';
	openExportClearanceModal(null, row, null);
}

function btnResetClick() {
	$("#txtSearchProjectCode").val("");
	$("#txtSearchProjectName").val("");
	$("#txtSearchCreator").val("");
	$("#txtSearchCreatorID").val("");
	$("#txtSearchCreatorDept").val("");
	$("#txtSearchApprover").val("");
	$("#txtSearchApproverID").val("");
	$("#txtSearchApproverDept").val("");
	$("#txtSearchExportNo").val("");
	$("#selSearchStatus").val("");
	$("#txtSearchCLLicenseNo").val("");
	$("#selSearchCustomsType").val("");
	$("#txtSearchInvoiceNo").val("");
	$("#selSearchSortingType").val("");
}

//Search 버튼 클릭
function btnSearchClick() {
	if($('#txtSearchProjectCode').val() == ""
	   && $('#txtSearchCreatorID').val() == ""
	   && $('#txtSearchApproverID').val() == ""
	   && $('#txtSearchExportNo').val() == ""
//	   && $('#selSearchStatus').val() == ""
	   && $('#txtSearchCLLicenseNo').val() == ""
	   && $('#selSearchCustomsType').val() == ""
	   && $('#txtSearchInvoiceNo').val() == ""
//	   && $('#selSearchSortingType').val() == ""
		   ){
		alert_modal("","검색조건을 하나 이상 입력하세요.");
		return;
	}

	if($('#txtSearchProjectCode').val().length < 2 || $('#txtSearchProjectName').val() == ""){
		$('#txtSearchProjectCode').val("");
	}

	$.ajax({
		url: "/getExportClearance.do",
		data: {
			"PROJECT_CODE" : $('#txtSearchProjectCode').val(),
			"CREATED_BY" : $('#txtSearchCreatorID').val(),
			"APPROVER" : $('#txtSearchApproverID').val(),
			"EXPORT_NO" : $('#txtSearchExportNo').val(),
			"STATUS" : $('#selSearchStatus').val(),
			"CL_LICENSE_NO" : $('#txtSearchCLLicenseNo').val(),
			"CUSTOMS_TYPE" : $('#selSearchCustomsType').val(),
			"INVOICE_NO" : $('#txtSearchInvoiceNo').val(),
			"SORTING_TYPE" : $('#selSearchSortingType').val()
		},
		success: function (data, textStatus, jqXHR) {
			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.Reload();
        }
    });
}

function mainGridReload(gird) {
	mainGrid.CollapseAll();

	for (var key in mainGrid.Rows) {

		var gridRow = mainGrid.Rows[key];

		if(gridRow.Fixed == null){
			if(gridRow.UP_OPER_ORG_CD !== "ROOT"){
				gridRow.CanSelect = "0";
			}

		  	mainGrid.RefreshRow(gridRow);
		}
	}
}

//등록/수정 Modal OPEN
function openExportClearanceModal(grid, row, col) {

	if(row == null || row.EXPORT_NO == null) {
		//TODO: 현재 기준으로 selectRow로 Item Copy호출 후 닫고 다시 selectRow(ExportNo)를 클릭하면 Export No가 사라짐 (556번줄)
		var param = Object.assign({}, row);
		param.modalTtile = "수출통관의뢰 - 신규등록";
		if(!param.modalType) param.modalType = "new";
		param.menuAuthList = menuAuthList;

		$('#divPopUp').load("/exportClearancePopUp.do",null,function(data, status, xhr) {
			if(status == "success"){

				initPopUp(param, function (key, param) {
					if(key == "save-item") {
						btnSearchClick();
					}
					else if(key == "delete-item") {
						btnSearchClick();
					}
					else if(key == "cancel-item") {
						btnSearchClick();
						$('#dlgExportClearance').modal('hide');
					}
				});

				$('#dlgExportClearance').modal('show');
			}
		});
	}
	else
	{
		var param = Object.assign({}, row);
			param.modalTtile = "수출통관의뢰 상세 [" + row.EXPORT_NO + "] [" + row.STATUS + "]";
			param.menuAuthList = menuAuthList;

			if (row. IS_EDITABLE == "Y" && (row.STATUS == "Incomplete" || row.STATUS == "Incomplete,Rejected"))
				param.modalType = "edit";
			else
				param.modalType = "view";

		$('#divPopUp').load("/exportClearancePopUp.do",null,function(data, status, xhr) {
			if(status == "success"){

				initPopUp(param, function (key, param) {
					if(key == "save-item") {
						btnSearchClick();
					}
					else if(key == "delete-item") {
						btnSearchClick();
					}
					else if(key == "cancel-item") {
						btnSearchClick();
						$('#dlgExportClearance').modal('hide');
					}
				});

				$('#dlgExportClearance').modal('show');
			}
		});
	}
}
