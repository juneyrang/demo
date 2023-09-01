var gridLang = {};
var fileLang = "en";
var idsmOsManageGrid;
var gridReload = false;
var elSelLocation;

function gridResize() {
	$("#gridIdsmOsManage").width($(".table-responsive").width());
	$("#gridIdsmOsManage").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#btnMaterialManageBatchType').hide();
	initCode();
	gridResize();
});
function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);

	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
		 	toDay = results.DAY[0].CUR_DAY;

//			startLocationUpdate = results.DAY[0].PREV_7_DAY;
			startLocationUpdate = results.DAY[0].PREV_2_MON_DAY;
			endLocationUpdate = results.DAY[0].CUR_DAY;

//		 	$('#txtStartLocationUpdate').val(startLocationUpdate);
//		 	$('#txtEndLocationUpdate').val(endLocationUpdate);
		 	initControls();
        }
    });

}
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


	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });

	$('#btnMaterialManageCreation').click(function () { btnMaterialManageCreationClick(); return false; });
	$('#btnMaterialManageDelete').click(function () { btnMaterialManageDeleteClick(); return false; });
	$('#btnMaterialManageBatchType').click(function () { btnMaterialManageBatchTypeClick(); return false; });
	$('#btnMaterialManageBatchCategory').click(function () { btnMaterialManageBatchCategoryClick(); return false; });
	$('#btnMaterialManageBatchExpiredDate').click(function () { btnMaterialManageBatchExpiredDateClick(); return false; });
	$('#btnMaterialManageBatchRsiConfirm').click(function () { btnMaterialManageBatchRsiConfirmClick(); return false; });

	initTypeCode(initTable);
}

function initTable(){


	var gridCode = getGridCode();

	var idsmOsManageGridCol = {"Cfg": {"id"				: "idsmOsManageGrid"
									, "CfgId"			: "idsmOsManageGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "8"
									, "CacheTimeout"    : "100"
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
									//,"ColsLap": "1"
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
									//,"ColsPosLap":"1","ColsLap": "1" column변경사항 바로 적용 안될시
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "TYPE", "Width": "220", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "COMMENTS", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )"	},
								{	"Name"	: "ATTH_CNT", "Width": "0"	, "Type": "text", "Spanned":"1", "CanMove" : "0", "CanEdit": "0"	},
//								{	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","Icon" :"/resources/ext/fontawesome-free/svgs/solid/paperclip.svg", "IconAlign" : "Center"	, "IconSize" : "2"	},
								{	"Name"	: "ATTRIBUTE10", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
//								{	"Name"	: "ATTRIBUTE9", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ATTRIBUTE3", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RECEIPT_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MATERIAL_CODE", "Width": "200", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openTransactionHistoryModal(Grid,Row,Col);" },
								{	"Name"	: "IN_QTY", "Width": "100", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REMAIN_QTY", "Width": "100", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "IS_RSI_CONFIRM", "Width": "120", "Type":  "Enum", "Enum" : "|Y|N", "EnumKeys" : "|Y|N" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1",},
								{	"Name"	: "RSI_CONFIRM_QTY", "Width": "100", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText gridBorderColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
								{	"Name"	: "RSI_QTY", "Width": "100", "Type": "Int" , "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "MRF_QTY", "Width": "100", "Type": "Int" , "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "OUT_QTY_NUM", "Width": "100", "Type": "Int" , "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "RSI_CONFIRM_REMAIN_QTY", "Width": "100", "Type": "Int" , "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "LOCATION", "Width": "160", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openLocationModal(Grid,Row,Col);" },
								{	"Name"	: "LOC_UPDATE_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "LOC_UPDATED_BY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "COM_SUBCON", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1",},
								{	"Name"	: "LAST_RSI", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "LAST_RSI_SUBCON", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "LAST_OUTGOING_DATE", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "EXPIRED_DATE", "Width": "170", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
							]
//							TYPE : Special tool / Spare part / Commissiong part / Monitoring
							,"Header" : {
								"Class" : "gridCenterText",
								"TYPE" : "Type",
								"CATEGORY" : "Category",
								"SUB_CATEGORY" : "Sub-Category",
								"COMMENTS" : "Note",
								"ATT" : "Photo",
								"ATTRIBUTE10" : "Shipment No",
//								"ATTRIBUTE9" : "Sequence",
								"PACKAGE_NO"	: "Package No.",
								"DESCRIPTION"	: "Description of Goods\nSpecification",
								"ATTRIBUTE3"	: "Vendor",
								"DRAWING_NO"	: "Drawing No.",
								"TAG_NO"	: "Item Tag No.",
								"RECEIPT_DATE"	: "Received Date",
								"MATERIAL_CODE"	: "Material Code",
								"IN_QTY"	: "IN Q’ty",
								"REMAIN_QTY"	: "Remain Q’ty",
								"IS_RSI_CONFIRM"	: "RSI Confirm",
								"RSI_CONFIRM_QTY"	: "Confirm Q’ty",
								"RSI_QTY"	: "Rsi Qty",
								"MRF_QTY"   : "Mrf Qty",
								"OUT_QTY_NUM"	: "Out Qty",
								"RSI_CONFIRM_REMAIN_QTY"	: "Confirm Remain Q'ty",
								"LOCATION"	: "Location",
								"LOC_UPDATE_DATE"	: "Location Last Updated Date",
								"LOC_UPDATED_BY"	: "Location Last Updated By",
								"COM_SUBCON"	: "Com_Subcon",
								"LAST_RSI"	: "Last Rsi",
								"LAST_RSI_SUBCON"	: "Last Rsi Subcon",
								"LAST_OUTGOING_DATE"	: "Last Outgoing Date",
								"EXPIRED_DATE"	: "Expired Date",

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

	idsmOsManageGrid = TreeGrid( {Layout:{Data : idsmOsManageGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridIdsmOsManage" );

	TGSetEvent("OnRenderFinish","idsmOsManageGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
	});

	TGSetEvent("OnChange","idsmOsManageGrid",function(grid,row){
		gridChangeFn(grid,row);
		grid.RefreshRow(row);
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
function gridReloadFn(grid){
	var list = grid.Rows;
	var due_date = new Date(toDay).getTime();
	for (var key in list) {
		var gridRow = list[key];
		gridChangeFn(grid,gridRow);

		if(gridRow.Kind == 'Data') {
			gridRow.ATT = (gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0) ? '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg'
					: '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
		}

		grid.RefreshRow(gridRow);
	}
}
function gridChangeFn(grid,gridRow) {
	var due_date = new Date(toDay).getTime();
     if(gridRow.TYPE != "SP" && gridRow.TYPE != "MP" && gridRow.TYPE != "CP" && gridRow.TYPE != "RP" && gridRow.TYPE != "TP") {
		gridRow.RSI_CONFIRM_QTYCanEdit = 0;
		gridRow.IS_RSI_CONFIRMCanEdit = 0;

		if(gridRow.TYPE == "MT"){
			if(gridRow.LOC_UPDATE_DATE != null && (due_date - new Date(gridRow.LOC_UPDATE_DATE).getTime()) > 1000*60*60*24*30 && gridRow.REMAIN_QTY != 0){
				gridRow.LOC_UPDATE_DATEBackground = "#f59ea7";
			}else{
				gridRow.LOC_UPDATE_DATEBackground = "";
			}
		}else if(gridRow.TYPE == "ST"){
			if(gridRow.LAST_OUTGOING_DATE != null && (due_date - new Date(gridRow.LAST_OUTGOING_DATE).getTime()) > 1000*60*60*24*30 && gridRow.REMAIN_QTY != 0){
				gridRow.LAST_OUTGOING_DATEBackground = "#f59ea7";
			}else{
				gridRow.LAST_OUTGOING_DATEBackground = "";
			}
		}
	}else{
		gridRow.RSI_CONFIRM_QTYCanEdit = 1;
		gridRow.IS_RSI_CONFIRMCanEdit = 1;

		if(gridRow.IS_RSI_CONFIRM == "N"){
			// TODO: Y에서 N으로 바뀔 때 RSI_CONFIRM_QTY 값 비교가 필요할 것 같은데 당장은 적용하지 않음, 다시 Y로 바뀔 때의 수량을 확인 후 변경 gridRow.IS_RSI_CONFIRMOrig
			idsmOsManageGrid.SetValue(gridRow,"RSI_CONFIRM_QTY",0,1);
		}

		if(gridRow.IS_RSI_CONFIRM == "Y"){
			idsmOsManageGrid.SetValue(gridRow,"RSI_CONFIRM_QTY",gridRow.IN_QTY,1);
		}

		if(gridRow.IS_RSI_CONFIRM == "Y" && gridRow.IN_QTY < gridRow.RSI_CONFIRM_QTY){
			gridRow.RSI_CONFIRM_QTY = gridRow.RSI_CONFIRM_QTYOrig;
			alert($("#alertManageRsiConfirmQty").val()); // 'RSI Confirm Q`ty' 는 'IN Q`ty' 보다 클수없습니다.
		}

		if(gridRow.IS_RSI_CONFIRM == "Y" && gridRow.RSI_CONFIRM_QTY < (gridRow.RSI_QTY - gridRow.MRF_QTY)){
			// ASIS : RSI_CONFIRM_QTY가 RSI_QTY보다 작으면 에러
			// TOBE : RSI_CONFIRM_QTY가 (RSI_QTY - MRF_QTY) 보다 작으면 에러
			// 'RSI Confirm Q`ty' 는 'Rsi Q`ty' 보다 작을수없습니다. --> 'RSI Confirm Q`ty' 는 'RSI - MRF Q`ty' 보다 작을수없습니다.
			gridRow.RSI_CONFIRM_QTY = gridRow.RSI_CONFIRM_QTYOrig;
			alert($("#alertManageRsiConfirmRemainQty").val());
		}

	}

}

function initAreaCombo() {
	$.ajax({
		url: "/getLocationCodeList.do",
		data: {"PROJECT_NO" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

//			if(setCombo(list, "selLocation", "")) {
//				elSelLocation = $('#selLocation').SumoSelect({placeholder: 'All', csvSepChar: '!!!', csvDispCount: 1});
//			}
        }
    });
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

//	elSelLocation.sumo.hideOpts();

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

	var paramData = {
			PROJECT_NO : $('#txtProjectCode').val(),
			PACKAGE_LIST_NO : $('#txtPackingListNo').val(),
			PACKAGE_NO : $('#txtPackageNo').val(),
			DRAWING_NO : $('#txtDrawingNo').val(),
			TAG_NO : $('#txtTagNo').val(),
			DESCRIPTION : $('#txtDescription').val(),
			VENDOR : $('#txtVendor').val(),
			MATERIAL_CODE : $('#txtMaterialCode​').val(),
			SCHEDULE : $('#selAttribute10').val(),
//			SEQUENCE : $('#txtSequence').val(),
			RSI_CONFIRM : $('#selRsiConfirm').val(),
			START_LOCATION_UPDATE : $('#txtStartLocationUpdate').val(),
			END_LOCATION_UPDATE : $('#txtEndLocationUpdate').val(),
			TYPE : $('#selType').val(),
			CATEGORY : $('#txtCategory').val(),
			SUB_CATEGORY : $('#txtSubCategory').val(),
			COMMENTS : $('#txtNote').val(),
	}

	$.ajax({
		url: "/getIdsmOsManageList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			for(i in list){
				//if(list[i].TYPE != "ST" && list[i].TYPE != "CT" ){
				if(list[i].TYPE != "SP" && list[i].TYPE != "MP" && list[i].TYPE != "CP" && list[i].TYPE != "RP" && list[i].TYPE != "TP") {
					list[i].RSI_CONFIRM_QTY = "";
					list[i].IS_RSI_CONFIRM = "";
				}
			}
			idsmOsManageGrid.Source.Data.Data.Body = [list];
			idsmOsManageGrid.Reload();

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
	$('#txtDrawingNo').val("");
	$('#txtTagNo').val("");
	$('#txtDescription').val("");
	$('#txtVendor').val("");
	$('#txtMaterialCode​').val("");
	$('#selAttribute10').val("");
//	$('#txtSequence').val("");
	$('#selRsiConfirm').val("");
//	$('#txtStartLocationUpdate').val(startLocationUpdate);
//	$('#txtEndLocationUpdate').val(endLocationUpdate);
	$('#txtStartLocationUpdate').val("");
	$('#txtEndLocationUpdate').val("");
	$('#selType').val("");
	$('#txtCategory').val("");
	$('#txtSubCategory').val("");
	$('#txtNote').val("");

}

function btnSaveClick(){

	idsmOsManageGrid.ActionAcceptEdit();

	var changeObject = idsmOsManageGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	if(changeList.length == 0) {
		alert_modal("", $('#alertGridDataNull').val());
		return;
	}

	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = idsmOsManageGrid.GetRowById(rowId);
		if(row.TYPE == null || row.TYPE == ""){
			var msg = $('#alertSaveMaterialManageTypeNullErr').val();
			alert_modal("", msg);
			return;
		}

		if(row.IS_RSI_CONFIRM == "N" && row.RSI_CONFIRM_QTY > 0){
			var msg = $('#alertSaveMaterialManageRsiConfirmQtyErr').val();
			alert_modal("", msg);
			return;
		}
	}

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var updateList = [];
			for(var i = 0; i < changeList.length; i++){
				var rowId = changeList[i].id;
				var row = idsmOsManageGrid.GetRowById(rowId);

				var updateRow = {"PROJECT_NO" : row.PROJECT_NO, "TYPE" : row.TYPE, "CATEGORY" : row.CATEGORY
						, "COMMENTS" : row.COMMENTS, "COM_SUBCON" : row.COM_SUBCON, "IS_RSI_CONFIRM" : row.IS_RSI_CONFIRM, "RSI_CONFIRM_QTY" : row.RSI_CONFIRM_QTY
						, "SUB_CATEGORY" : row.SUB_CATEGORY, "MATERIAL_CODE" : row.MATERIAL_CODE,"FILE_GRP_CD": row.FILE_GRP_CD,"EXPIRED_DATE": formatDate(row.EXPIRED_DATE)
				};
				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = {"list" : list};

			$.ajax({
				url: "/saveIdsmOsManageList.do",
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

	$('#dlgIdsmOsManagePopUp').load("/desmPlDtlEditLogPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmPlDtlEditLogPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
}

function btnQrCodeClick() {
	idsmOsManageGrid.ActionAcceptEdit();
	var selectList = idsmOsManageGrid.GetSelRows();

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
	idsmOsManageGrid.ActionAcceptEdit();
	var selectList = idsmOsManageGrid.GetSelRows();

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

	idsmOsManageGrid.ActionAcceptEdit();
	var selectList = idsmOsManageGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "MATERIAL_CODE" : gridRow.MATERIAL_CODE,
				   "CODE_TYPE" : "DETAIL"};

		selListParam.push(row);
	}

	var param = {"selectList" : selListParam};

	$('#dlgIdsmOsManagePopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
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

	idsmOsManageGrid.ActionAcceptEdit();
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

	$('#dlgMaterialManagePopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
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

	$('#dlgIdsmOsManagePopUp').load("/desmLocationSearchPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationSearchPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
	*/
}

function btnMaterialManageCreationClick() {

	var param = {};

	$('#dlgMaterialManagePopUp').load("/desmMaterialManageCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManagePopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});
}

function btnMaterialManageBatchTypeClick() {

	var param = {};
	var selectList = idsmOsManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	param.selectList = selectList;
	param.col="TYPE";

	$('#dlgMaterialManagePopUp').load("/desmMaterialManageBatchType.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageBatchPopUp(param, function (key, returnParam) {
				for(var i = 0 ; i < selectList.length ; i ++){
					idsmOsManageGrid.SetValue(selectList[i],returnParam.col,returnParam.value,1);
				}
			});

		}
	});
}

function btnMaterialManageBatchCategoryClick() {

	var param = {};
	var selectList = idsmOsManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	param.selectList = selectList;
	param.col="CATEGORY";

	$('#dlgMaterialManagePopUp').load("/desmMaterialManageBatchCategory.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageBatchPopUp(param, function (key, returnParam) {
				for(var i = 0 ; i < selectList.length ; i ++){
					idsmOsManageGrid.SetValue(selectList[i],returnParam.col,returnParam.value,1);
				}
			});

		}
	});
}

function btnMaterialManageBatchRsiConfirmClick() {

	var param = {};
	var selectList = idsmOsManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	param.selectList = selectList;
	param.col="IS_RSI_CONFIRM";

	$('#dlgMaterialManagePopUp').load("/desmMaterialManageBatchRsiConfirm.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageBatchPopUp(param, function (key, returnParam) {
				for(var i = 0 ; i < selectList.length ; i ++){
					idsmOsManageGrid.SetValue(selectList[i],returnParam.col,returnParam.value,1);
				}
			});

		}
	});
}

function btnMaterialManageBatchExpiredDateClick() {

	var param = {};
	var selectList = idsmOsManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	param.selectList = selectList;
	param.col="EXPIRED_DATE";

	$('#dlgMaterialManagePopUp').load("/desmMaterialManageBatchExpiredDate.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageBatchPopUp(param, function (key, returnParam) {
				var expiredDate = Date.parse(returnParam.value) + 1000*60*60*9;
				for(var i = 0 ; i < selectList.length ; i ++){
					if(selectList[i].TYPE == "EP"){
						idsmOsManageGrid.SetValue(selectList[i],returnParam.col,expiredDate,1);
					}
				}
			});

		}
	});
}


function btnMaterialManageDeleteClick(){
	var selectList = idsmOsManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				var updateRow = {"PROJECT_NO" : row.PROJECT_NO, "MATERIAL_CODE" : row.MATERIAL_CODE};
				deleteList.push(updateRow);
			}

			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteMaterialManage.do",
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

function openTransactionHistoryModal(grid,row,col) {

	idsmOsManageGrid.ActionAcceptEdit();
	var param = {"PROJECT_NO" : row.PROJECT_NO,
			      "TRK_ITEM_NAME" : row.TRK_ITEM_NAME,
			      "MATERIAL_CODE" : row.MATERIAL_CODE};

	$('#dlgMaterialManagePopUp').load("/desmTransactionHistoryPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmTransactionHistoryPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
}


function openAttModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	var param = Object.assign({}, row);
		param.ATTACH_GRP_CD = param.FILE_GRP_CD;
		param.MATERIAL_MANAGEMENT_YN = "Y";
		param.fileUse = true;
		param.hideThumbnailContent = false;
		param.width = "1000px";

	$('#dlgMaterialManagePopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});
		}
	});
}
function ShowCustomCalendar(G,row,col){
	if(row.TYPE != "EP"){
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