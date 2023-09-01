var dlgDesmMaterialManageGrid;

var v_desm_material_manage_callback = null;
var v_desm_material_manage_param;
var gridTypeCode;


function initDesmMaterialManagePopUp(param , callback) {
	v_desm_material_manage_callback = callback;
    v_desm_material_manage_param = param;

	$('#dlgDesmMaterialManageCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMaterialManageCreation').click();
	});

	$('#dlgDesmMaterialManageCreation').on('hidden.bs.modal', function () {
	  	closeDesmMaterialManagePopUp();
	});

	$('#dlgDesmMaterialManageCreation').modal('show');

    initDesmMaterialManagePopUpCode();
}

function initDesmMaterialManagePopUpCode() {

	initDesmMaterialManagePopUpControls();
}


function initDesmMaterialManagePopUpControls() {


	initDesmMaterialManagePopUpDatePicker("txtDlgDesmMaterialManageCreationStartRequestDate");
	initDesmMaterialManagePopUpDatePicker("txtDlgDesmMaterialManageCreationEndRequestDate");

	makeAutocomplete(
		"txtDlgDesmMaterialManageCreationProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMaterialManageCreationProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMaterialManageCreationProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMaterialManageCreationProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	$('#btnDlgDesmMaterialManageCreationSearch').click(function () { btnDlgDesmMaterialManageCreationSearchClick(); return false; });
	$('#btnDlgDesmMaterialManageCreationReset').click(function () { btnDlgDesmMaterialManageCreationResetClick(); return false; });
	$('#btnDlgDesmMaterialManageCreationCompletion').click(function () { btnDlgDesmMaterialManageCreationCompletionClick(); return false; });

	$('#btnMaterialManageCreationBatchType').click(function () { btnMaterialManageCreationBatchTypeClick(); return false; });
	$('#btnMaterialManageCreationBatchCategory').click(function () { btnMaterialManageCreationBatchCategoryClick(); return false; });


	$("#txtDlgDesmMaterialManageCreationProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});

	$("#txtDlgDesmMaterialManageCreationPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});

	$("#txtDlgDesmMaterialManageCreationRsiNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});

	$("#txtDlgDesmMaterialManageCreationMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});

	$("#txtDlgDesmMaterialManageCreationDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});

	$("#txtDlgDesmMaterialManageCreationDrawingNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});

	$("#txtDlgDesmMaterialManageCreationTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMaterialManageCreationSearch').click();
		}
	});


	TGSetEvent("OnCopy","dlgDesmMaterialManageGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

	initCode();

}

function initCode() {
	var codeList = [{"CODE" : "M004"}];
	var paramList = JSON.stringify(codeList);


	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			gridTypeCode = setGridCombo(results.M004, "");
			initTable();
			initVoyageCombo();
        }
    });

}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selDlgDesmMaterialManageCreationAttribute10 option").remove();
			$("#selDlgDesmMaterialManageCreationAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selDlgDesmMaterialManageCreationAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}
function initTable(){

		var gridCode = getGridCode();
		var dlgDesmMaterialManageGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMaterialManageGrid"
			, "CfgId"			: "dlgDesmMaterialManageGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "550"
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
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
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
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
		"Cols" : [
			{	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
			{	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
			{	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
			{	"Name"	: "COMMENTS", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
			{	"Name"	: "ATTRIBUTE10", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "ATTRIBUTE9", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "ATTRIBUTE3", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "MATERIAL_CODE", "Width": "150", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", },
			{	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
			{	"Name"	: "REMAIN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "LOCATION", "Width": "120", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell"	: "openLocationModal(Grid,Row,Col);" },
			{	"Name"	: "REMARKS", "Width": "150", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", },
			{	"Name"	: "LOC_UPDATE_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "LOC_UPDATED_BY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
		]
		,"Header" : {
			"TYPE" : "Type",
			"CATEGORY" : "Category",
			"SUB_CATEGORY" : "Sub-Category",
			"COMMENTS" : "Note",
			"ATTRIBUTE10" : "Shipment No",
			"ATTRIBUTE9" : "Sequence",
			"ATTRIBUTE3"	: "Vendor",
			"PACKAGE_NO"	: "Package No.",
			"DESCRIPTION"	: "Description of Goods\nSpecification",
			"DRAWING_NO"	: "Drawing No.",
			"TAG_NO"	: "Item Tag No.",
			"MATERIAL_CODE"	: "Material Code",
			"IN_QTY"	: "IN Q’ty",
			"REMAIN_QTY"	: "Remain Q’ty",
			"LOCATION"	: "Location",
			"REMARKS"	: "Remark",
			"LOC_UPDATE_DATE"	: "Location Last Updated Date",
			"LOC_UPDATED_BY"	: "Location Last Updated By",

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

	dlgDesmMaterialManageGrid = TreeGrid( {Layout:{Data : dlgDesmMaterialManageGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMaterialManageGrid" );

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmMaterialManageCreationProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmMaterialManageCreationProjectName').val(list[0]["NAME"]);
			initDlgDesmMaterialManageCreationVoyageCombo();
		}
	});
}


function initDlgDesmMaterialManageCreationVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtDlgDesmMaterialManageCreationProjectCode").val(), "IS_CONFIRM_MATERIAL" : "Y" },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selDlgDesmMaterialManageCreationAttribute10 option").remove();
			$("#selDlgDesmMaterialManageCreationAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selDlgDesmMaterialManageCreationAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function closeDesmMaterialManagePopUp() {
	dlgDesmMaterialManageGrid.Dispose();
}

function initDesmMaterialManagePopUpDatePicker(id) {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	var eid = "#" + id;
	$(eid).datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}


function iconDlgDesmMaterialManageCreationProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmMaterialManageCreationProjectCode').val(), TYPE : "A"};

	$('#dlgDesmMaterialManageCreationPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmMaterialManageCreationProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmMaterialManageCreationProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmMaterialManageCreationSearchClick() {

	if($('#txtDlgDesmMaterialManageCreationProjectCode').val().length < 2 || $('#txtDlgDesmMaterialManageCreationProjectName').val() == ""){
		$('#txtDlgDesmMaterialManageCreationProjectCode').val("");
		$('#txtDlgDesmMaterialManageCreationProjectName').val("");
		$("#txtDlgDesmMaterialManageCreationProjectCode").parent().find(".autocomplete-valid").hide();
	}


	var cnt = 0;
	$('[id*="DesmMaterialManageCreation"]').each(function(e){
		if($(this).val() != "")cnt++;
	})
	if(cnt < 3){
		alert_modal("",$("#alertSearchOneCriteria").val());
		return;
	}

	var chkValidation = checkRequiredField("tblDlgDesmMaterialManageCreationSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var paramData = {
			PROJECT_NO : $('#txtDlgDesmMaterialManageCreationProjectCode').val(),
			PACKAGE_LIST_NO : $('#txtDlgDesmMaterialManageCreationPackingListNo').val(),
			PACKAGE_NO : $('#txtDlgDesmMaterialManageCreationPackageNo').val(),
			DRAWING_NO : $('#txtDlgDesmMaterialManageCreationDrawingNo').val(),
			TAG_NO : $('#txtDlgDesmMaterialManageCreationTagNo').val(),
			DESCRIPTION_TYPE : $('#selDlgDesmMaterialManageCreationDescription').val(),
			DESCRIPTION : $('#txtDlgDesmMaterialManageCreationDescription').val(),
			VENDOR : $('#txtDlgDesmMaterialManageCreationVendor').val(),
			MATERIAL_CODE : $('#txtDlgDesmMaterialManageCreationMaterialCode​').val(),
			SCHEDULE : $('#selDlgDesmMaterialManageCreationAttribute10').val(),
			SEQUENCE : $('#txtDlgDesmMaterialManageCreationSequence').val(),
	}

	$.ajax({
		url: "/getDesmMaterialManageCreationList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			dlgDesmMaterialManageGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMaterialManageGrid.ReloadBody();


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

function ShowCustomCalendar(G,row,col){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
	   G.SetValue(row,col,n,1);
	   }


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function btnDlgDesmMaterialManageCreationDateChangeClick() {
	dlgDesmMaterialManageGrid.ActionAcceptEdit();

	var selectList = dlgDesmMaterialManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var param = {};

	$('#dlgDesmMaterialManageCreationPopUp').load("/desmMaterialManageDateChangePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageDateChangePopUp(param, function (key, returnParam) {

				if(key == "edit-item"){

					var date = returnParam.HANDOVER_DATE + " 00:00:00 GMT";
					var handoverDate = Date.parse(date);

					for(var i = 0; i < selectList.length; i++){
						var row = selectList[i];
						row.HANDOVER_DATE = handoverDate;
						dlgDesmMaterialManageGrid.RefreshRow(row);
					}
				}
			});

		}
	});
}

function btnDlgDesmMaterialManageCreationCompletionClick() {
	dlgDesmMaterialManageGrid.ActionAcceptEdit();

	var selectList = dlgDesmMaterialManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++){
		var row = selectList[i];

		if(row.TYPE == null || row.TYPE == ""){
			var msg = $('#alertSaveMaterialManageTypeNullErr').val();
			alert_modal("", msg);
			return;
		}

//		if(row.CATEGORY == null || row.CATEGORY == ""){
//			var msg = $('#alertSaveMaterialManageCategroyNullErr').val();
//			alert_modal("", msg);
//			return;
//		}

//		if(row.SUB_CATEGORY == null || row.SUB_CATEGORY == ""){
//			var msg = $('#alertSaveMaterialManageSubCategoryNullErr').val();
//			alert_modal("", msg);
//			return;
//		}
	}

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {

			var updateList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				var updateRow = {"PROJECT_NO" : row.PROJECT_NO, "TYPE" : row.TYPE, "CATEGORY" : row.CATEGORY
						, "COMMENTS" : row.COMMENTS, "COM_SUBCON" : row.COM_SUBCON
						, "SUB_CATEGORY" : row.SUB_CATEGORY, "MATERIAL_CODE" : row.MATERIAL_CODE};
				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = {"updateList" : list};

			$.ajax({
				url: "/saveDesmMaterialManageSave.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {

						alert_fail(result.error);

					} else {

						alert_success($('#alertSuccess').val());

						if(v_desm_material_manage_callback) {
							v_desm_material_manage_callback("save-item", null);
						}

						$('#dlgDesmMaterialManageCreation').modal('hide');
					}
				}
			});
		}
	});

}

function ExcelDateToJSDate(date) {

	if (date == null || date == "")
		return "";
	else if (typeof(date) == "string")
		return date;
	else
	{
		var jsDate = new Date(date);
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '/' + month + '/' + day;
	}
}

function btnDlgDesmMaterialManageCreationResetClick() {

	$('#txtDlgDesmMaterialManageCreationPackageNo').val("");
	$('#txtDlgDesmMaterialManageCreationRsiNo').val("");
	$('#txtDlgDesmMaterialManageCreationMaterialCode').val("");
	$('#txtDlgDesmMaterialManageCreationStartRequestDate').val("");
	$('#txtDlgDesmMaterialManageCreationEndRequestDate').val("");
	$('#selDlgDesmMaterialManageCreationAttribute10').val("");


	$('#txtDlgDesmMaterialManageCreationDescription').val("");
	$('#txtDlgDesmMaterialManageCreationDrawingNo').val("");
	$('#txtDlgDesmMaterialManageCreationTagNo').val("");
	$('#txtDlgDesmMaterialManageCreationRsiName').val("");

}

function btnMaterialManageCreationBatchTypeClick() {

	var param = {};
	var selectList = dlgDesmMaterialManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	param.selectList = selectList;
	param.col="TYPE";

	$('#dlgDesmMaterialManageCreationPopUp').load("/desmMaterialManageBatchType.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageBatchPopUp(param, function (key, returnParam) {
				for(var i = 0 ; i < selectList.length ; i ++){
					dlgDesmMaterialManageGrid.SetValue(selectList[i],returnParam.col,returnParam.value,1);
				}
			});

		}
	});
}

function btnMaterialManageCreationBatchCategoryClick() {

	var param = {};
	var selectList = dlgDesmMaterialManageGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	param.selectList = selectList;
	param.col="CATEGORY";

	$('#dlgDesmMaterialManageCreationPopUp').load("/desmMaterialManageBatchCategory.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMaterialManageBatchPopUp(param, function (key, returnParam) {
				for(var i = 0 ; i < selectList.length ; i ++){
					dlgDesmMaterialManageGrid.SetValue(selectList[i],returnParam.col,returnParam.value,1);
				}
			});

		}
	});
}


function openLocationModal(grid,row,col) {

	dlgDesmMaterialManageGrid.ActionAcceptEdit();
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

	$('#dlgDesmMaterialManageCreationPopUp').load("/desmLocationPopUp.do",null,function(data, status, xhr) {
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