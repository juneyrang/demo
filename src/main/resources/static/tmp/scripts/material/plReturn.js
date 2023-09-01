var gridLang = {};
var fileLang = "en";
var returnGrid;
var menuAuthList;
var toDay;
var gridReload = false;

function gridResize() {
	$("#gridReturn").width($(".table-responsive").width());
	$("#gridReturn").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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

	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtSubcontractor").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtMrfNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtMrfName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtMaterialCode​").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$('#btnReturnCreation').click(function () { btnReturnCreationClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnReturnDelete').click(function () { btnReturnDeleteClick(); return false; });
	$('#btnReturnReport').click(function () { btnReturnReportClick(); return false; });




	initCode();
}

function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);


	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			/*var	result = setCombo(results.R001, "selClosed", "all");
				result = setCombo(results.R002, "selStatus", "all");*/

		 	toDay = results.DAY[0].CUR_DAY;
		 	initTypeCode(initTable);

			$('#txtStartReturnDate').val(toDay);
			$('#txtEndReturnDate').val(toDay);
        }
    });
}

function initTable(){

	var gridCode = getGridCode();
	var returnGridCol = {"Cfg": {"id"				: "returnGrid"
									, "CfgId"			: "returnGridCfg"
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
									, "SelectingSingle" : "0"
									, "Adding"			: "0"
									, "Export"			: "1"
									, "Deleting"		: "0"
									, "ConstHeight"		: "1"
									, "SafeCSS"			: "1"
									, "Code" : gridCode
									,"CopyCols" : "0"
									, "Sorting"			: "1"}
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "RN", "Width": "70", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MRF_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MRF_NAME", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RSI_NAME", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RETURN_REQ_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUBCONTRACTOR", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MATERIAL_CODE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COMMENTS", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
								{	"Name"	: "RETURN_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REQ_RETURN_QTY", "Width": "150", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RETURN_QTY", "Width": "150", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RETURN_TYPE", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_NO", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DRAWING_NO", "Width": "190", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ITEM_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Header" : {"Class" : "gridCenterText",
								"RN"	: "No",
								"MRF_NO"	: "MRF No.",
								"MRF_NAME"	: "MRF Name",
								"RSI_NAME"	: "RSI Name",
								"RETURN_REQ_DATE"	: "MRF Req Date",
								"SUBCONTRACTOR"	: "Subcontractor",
								"MATERIAL_CODE"	: "Material Code",
								"TYPE" : "Type",
								"CATEGORY" : "Category",
								"SUB_CATEGORY" : "Sub-Category",
								"COMMENTS" : "Note",
								"ATT" : "Photo",
								"RETURN_DATE"	: "Return Date",
								"IN_QTY"	: "IN Q’ty",
								"REQ_QTY"	: "RSI Q’ty",
								"RETURN_TYPE" : "Return Type",
								"REQ_RETURN_QTY"	: "MRF Q’ty",
								"RETURN_QTY"	: "Return Q’ty",
								"PACKAGE_NO"	: "Package No",
								"DRAWING_NO"	: "Drawing No.",
								"ITEM_NO"	: "Item(Tag) No."
							}
							};

	returnGrid = TreeGrid( {Layout:{Data : returnGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridReturn" );

	TGSetEvent("OnRenderFinish","returnGrid",function(grid){
		gridReloadFn(grid);
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
}
function gridReloadFn(grid) {
	var list = grid.Rows;

	for (var key in list) {
		var gridRow = list[key];
		if(gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0){
			gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
		}
		grid.RefreshRow(gridRow);
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

function btnReturnCreationClick() {

	var param = {"menuAuthList" : menuAuthList};

	$('#dlgReturnPopUp').load("/desmReturnCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmReturnPopUp(param, function (key, returnParam) {

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

	var pramData = {PROJECT_NO : $('#txtProjectCode').val(), START_HANDOVER_DATE : $('#txtStartReturnDate').val(), END_HANDOVER_DATE : $('#txtEndReturnDate').val(),
					PACKAGE_NO : $('#txtPackageNo').val(), SUBCONTRACTOR : $('#txtSubcontractor').val(), MRF_NO : $('#txtMrfNo').val(), MATERIAL_CODE : $('#txtMaterialCode​').val(),
					ATTRIBUTE10 : $('#selAttribute10').val(), MRF_NAME : $('#txtMrfName').val(),TYPE : $('#selType').val(), CATEGORY : $('#txtCategory').val()};
	$.ajax({
		url: "/getDesmMrfReturnList.do",
		data: pramData,
		success: function (data, textStatus, jqXHR) {

			returnGrid.Source.Data.Data.Body = [data.results];
			returnGrid.Reload();
        }
    });
}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val(), TYPE : "A"};

	$('#dlgReturnPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
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

function btnReturnDeleteClick(){
	var selectList = returnGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				var updateRow = {"MRF_RETURN_ID" : row.MRF_RETURN_ID, "MRF_HEADER_ID" : row.MRF_HEADER_ID, "MRF_LINE_ID" : row.MRF_LINE_ID, "RSI_LINE_ID" : row.RSI_LINE_ID,
				                 "PROJECT_NO" : $('#txtProjectCode').val(), "MATERIAL_CODE" : row.MATERIAL_CODE};
				deleteList.push(updateRow);
			}

			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteDesmMrfReturn.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);

					}
					else {

						alert_success($('#alertDeleteSuccess').val());
						$('#btnSearch').click();
					}
				}
			});
		}
	});
}

function btnReturnReportClick() {
	var param = {START_DATE : $('#txtStartReturnDate').val(), END_DATE : $('#txtEndReturnDate').val()};

	$('#dlgReturnPopUp').load("/desmReturnReportPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmReturnReportPopUp(param, function (key, returnParam) {

				if(key == "report-item"){
					var popup = window.open('/rsiOutMrd.do?startHandoverDate=' + returnParam.START_DATE + '&endHandoverDate=' + returnParam.END_DATE + '&fileNm=RD_DESM_RETURN&project='+parent.document.querySelector("#spanDefaultProject").innerHTML.split("[")[1].split("-")[0].trim(), 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
				}
			});
		}
	});
}

function btnReseteClick() {

	$('#txtPackageNo').val("");
	$('#txtSubcontractor').val("");
	$('#txtMrfNo').val("");
	$('#txtMrfName').val("");
	$('#txtMaterialCode​').val("");
	$('#selAttribute10').val("");
	$('#selType').val("");
	$('#txtCategory').val("");
	$('#txtStartReturnDate').val(toDay);
	$('#txtEndReturnDate').val(toDay);
}


function openAttModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	var param = Object.assign({}, row);
		param.ATTACH_GRP_CD = param.FILE_GRP_CD;
		param.MATERIAL_MANAGEMENT_YN = "Y";
		param.fileUse = false;
		param.hideThumbnailContent = false;
		param.width = "1000px";

	$('#dlgReturnPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});
		}
	});
}