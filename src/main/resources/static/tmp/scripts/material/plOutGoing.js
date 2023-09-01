var gridLang = {};
var fileLang = "en";
var outGoingGrid;
var menuAuthList;
var toDay;
var gridReload = false;

function gridResize() {
	$("#gridOutGoing").width($(".table-responsive").width());
	$("#gridOutGoing").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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

	$("#txtRsiNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtMaterialCode​").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	//$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#btnOutGoingCreation').click(function () { btnOutGoingCreationClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnOutGoingDelete').click(function () { btnOutGoingDeleteClick(); return false; });
	$('#btnOutGoingReport').click(function () { btnOutGoingReportClick(); return false; });




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

			$('#txtStartHandoverDate').val(toDay);
			$('#txtEndHandoverDate').val(toDay);
        }
    });
}

function initTable(){

	var gridCode = getGridCode();
	var outGoingGridCol = {"Cfg": {"id"				: "outGoingGrid"
									, "CfgId"			: "outGoingGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "1"
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
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "RN", "Width": "70", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RSI_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RSI_NAME", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REQUEST_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUBCONTRACTOR", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKING_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PACKAGE_NO", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DESCRIPTION", "Width": "290", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "HANDOVER_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "HANDOVER_QTY", "Width": "150", "Type": "Int", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CREATED_BY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RECEIVER_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MATERIAL_CODE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "COMMENTS", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
								{	"Name"	: "DRAWING_NO", "Width": "190", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ITEM_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Header" : {"Class" : "gridCenterText",
								"RN"	: "No",
								"RSI_NO"	: "RSI No.",
								"RSI_NAME"	: "RSI Name",
								"REQUEST_DATE"	: "RSI Req.date",
								"SUBCONTRACTOR"	: "Subcontractor",
								"PACKING_LIST_NO"	: "Packing List No.",
								"PACKAGE_NO"	: "Package No",
								"DESCRIPTION"	: "Description",
								"HANDOVER_DATE"	: "Handover Date",
								"CREATED_BY" : "Created By",
								"TYPE" : "Type",
								"CATEGORY" : "Category",
								"SUB_CATEGORY" : "Sub-Category",
								"COMMENTS" : "Note",
								"ATT"	: "Photo",
								"IN_QTY"	: "IN Q’ty",
								"REQ_QTY"	: "RSI Q’ty",
								"HANDOVER_QTY"	: "Handover Q’ty",
								"RECEIVER_NAME" : "Receiver",
								"MATERIAL_CODE"	: "Material Code",
								"DRAWING_NO"	: "Drawing No.",
								"ITEM_NO"	: "Item(Tag) No."
							}
							};

	outGoingGrid = TreeGrid( {Layout:{Data : outGoingGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridOutGoing" );

	TGSetEvent("OnRenderFinish","outGoingGrid",function(grid){
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

function btnOutGoingCreationClick() {

	var param = {"menuAuthList" : menuAuthList};

	$('#dlgOutGoingPopUp').load("/desmOutGoingCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmOutGoingPopUp(param, function (key, returnParam) {

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

	var pramData = {PROJECT_NO : $('#txtProjectCode').val(), START_HANDOVER_DATE : $('#txtStartHandoverDate').val(), END_HANDOVER_DATE : $('#txtEndHandoverDate').val(),
					PACKAGE_NO : $('#txtPackageNo').val(), SUBCONTRACTOR : $('#txtSubcontractor').val(), RSI_NO : $('#txtRsiNo').val(), MATERIAL_CODE : $('#txtMaterialCode​').val(),
					ATTRIBUTE10 : $('#selAttribute10').val(), RSI_NAME : $('#txtRsiName').val(),TYPE : $('#selType').val(),	CATEGORY : $('#txtCategory').val(),
					SUB_CATEGORY : $('#txtSubCategory').val(),COMMENTS : $('#txtNote').val(),PACKING_LIST_NO : $('#txtPackingListNo').val()
	};
	$.ajax({
		url: "/getDesmRsiOutGoingList.do",
		data: pramData,
		success: function (data, textStatus, jqXHR) {

			outGoingGrid.Source.Data.Data.Body = [data.results];
			outGoingGrid.Reload();
        }
    });
}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val(), TYPE : "A"};

	$('#dlgOutGoingPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
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

function btnOutGoingDeleteClick(){
	var selectList = outGoingGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				var updateRow = {"RSI_LINE_ID" : row.RSI_LINE_ID, "RSI_OUTGOING_ID" : row.RSI_OUTGOING_ID, "MATERIAL_CODE" : row.MATERIAL_CODE};
				deleteList.push(updateRow);
			}

			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteDesmRsiOut.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						debugger;
						if(result.error == "MRF") {
							alert_fail($('#alertSaveOutgoingDeleteCheckErr').val());
						}
						else {
							alert_fail(result.error);
						}
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

function btnOutGoingReportClick() {
	var param = {START_HANDOVER_DATE : $('#txtStartHandoverDate').val(), END_HANDOVER_DATE : $('#txtEndHandoverDate').val()};

	$('#dlgOutGoingPopUp').load("/desmOutGoingReportPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmOutGoingReportPopUp(param, function (key, returnParam) {

				if(key == "report-item"){
					var popup = window.open('/rsiOutMrd.do?startHandoverDate=' + returnParam.START_HANDOVER_DATE + '&endHandoverDate=' + returnParam.END_HANDOVER_DATE + '&fileNm=RD_DESM_OUT&project='+parent.document.querySelector("#spanDefaultProject").innerHTML.split("[")[1].split("-")[0].trim(), 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
				}
			});
		}
	});
}

function btnReseteClick() {
	//$('#txtProjectCode').val("");
	//$('#txtProjectName').val("");
	$('#txtPackageNo').val("");
	$('#txtSubcontractor').val("");
	$('#txtRsiNo').val("");
	$('#txtRsiName').val("");
	$('#txtMaterialCode​').val("");
	$('#txtStartHandoverDate').val(toDay);
	$('#txtEndHandoverDate').val(toDay);

	$('#selAttribute10').val("");
	$('#selType').val("");
	$('#txtCategory').val("");
	$('#txtSubCategory').val("");
	$('#txtNote').val("");
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

		$('#dlgOutGoingPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

			if(status == "success"){

				initTransAttListPopUp(param, function (key, returnParam) {
					if(key == "save-item"){

					}
				});
			}
		});
	}
}