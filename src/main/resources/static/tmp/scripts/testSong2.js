/*
	기자재 일정관리 > 기자재 일정관리 > 목록( 조회/팝업 높이조정 버전 )
*/
var mainGrid;
var dlgInvGrid;
var dlgCreateItemGrid;
var view_type = "SETUP";
var toDay;
var selectDlgInvEditRow;
var dlgInvAllList;
var gridUserJobCode;

var col1;
var grid1;

var col2;
var grid2;

var col111;
var grid111;

var col1111;
var grid1111;

var col11111;
var grid11111;

var col111111;
var grid111111;

$(document).ready(function () {

	initControls();

});

function resetSearchControls() {

	$('#txtProjectCode').val("T19020");
	$('#txtProjectName').val("Jawa9&10");

	$('#selSearchKey1').val("item");
	$('#txtSearchValue1').val("");
	$('#selSearchKey7').val("attribute3");
	$('#txtSearchValue7').val("");
	$('#selSearchKey2').val("cargo");
//	$('#selSearchKey3').val("expected");
	$('#txtSearchValue2').val("");
	$('#txtSearchValue3').val("");
	$('#selOnoOfshore').val("");
	$('#selSearchKey4').val("attribute10");
	$('#txtSearchValue4').val("");
	$('#selSearchKey8').val("attribute6");
	$('#txtSearchValue8').val("");
	$('#selSearchKey5').val("po");
//	$('#selSearchKey6').val("plan");
	$('#txtSearchValue5').val("");
	$('#txtSearchValue6').val("");
	$('#ckIssueCheck').prop("checked", false);

	$("#txtProjectCode").parent().find(".autocomplete-valid").hide();

}

function initControls() {

	Grids.OnRenderFinish = function(gird){
		if(gird.id == "idsmSetupMainGrid"){
			mainGridSearchReload(gird);
		}
	}

	/*Grids.OnMouseOver = function(grid, row, col, orow, ocol, event) {
		if(grid.id == "idsmSetupMainGrid"){
			if(row != null && row.Fixed == null){
				if(col == "MPS_PLAN_DATE" || col == "MPS_EXPECTED_DATE" || col == "MPS_ACTUAL_DATE" ||
				   col == "PO_PLAN_DATE" || col == "PO_EXPECTED_DATE" || col == "PO_ATCUAL_DATE" ||
				   col == "CARGO_PLAN_DATE" || col == "CARGO_EXPECTED_DATE" || col == "CARGO_ACTUAL_DATE" ||
				   col == "FOB_PLAN_DATE" || col == "FOB_EXPECTED_DATE" || col == "FOB_ACTUAL_DATE" ||
				   col == "ONSITE_PLAN_DATE" || col == "ONSITE_EXPECTED_DATE" || col == "ONSITE_ACTUAL_DATE"){
					ShowCustomCalendar(grid,row,col);
				}
			}
		}

	}*/

	Grids.OnChange = function(value, oldvalue) {
		if(value.id == "idsmSetupMainGrid"){
			if(editRowId != null && editRowId != ""){
				var row = mainGrid.GetRowById(editRowId);
				setGridDateCheck(mainGrid, row);
			}
			editRowId = "";
		}
	}

	Grids.OnValueChanged = function(grid, row, col, val, oldval, errors) {
		if(grid.id == "idsmDlgCreateItemGrid"){
			if(col == "AUTH_SCHEDULE1"){
				if(val == 1){
					row.AUTH_SCHEDULE2 = 0;
				}
				else{
					row.AUTH_SCHEDULE2 = 1;
				}
			}
			else if(col == "AUTH_SCHEDULE2"){
				if(val == 1){
					row.AUTH_SCHEDULE1 = 0;
				}
				else{
					row.AUTH_SCHEDULE1 = 1;
				}
			}

			grid.RefreshRow(row);
		}
	}



	makeAutocomplete(
		"txtProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtProjectName").val(ui.item.value.split("|")[2]);

			return false;
		}
	);

	makeAutocomplete(
		"txtdlgCreateItemProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtdlgCreateItemProjectName",		//clear필드 id
		"/getIdsmSetupDlgCreateItemProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtdlgCreateItemProjectCode").val(ui.item.value.split("|")[0]);
			$("#txtdlgCreateItemProjectName").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	// 달력 입력 란 셋팅
	initDatePicker();

	initFileInput("txtEvidenceFile");

	$('#btnResete').click(function () { resetSearchControls(); return false; });
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });
	$('#btnCreateItem').click(function () { btnCreateItemClick(); return false; });

	$('#btnDlgInvEditAdd').click(function () { btnDlgInvEditAddClick(); return false; });
	$('#btnDlgInvEditDelete').click(function () { btnDlgInvEditDeleteClick(); return false; });
	$('#btnDlgInvEditSave').click(function () { btnDlgInvEditSaveClick(); return false; });

	$('#btnCreateItemAdd').click(function () { btnCreateItemAddClick(); return false; });

	$('#txtdlgCreateItemTaskNumber').change(function () { $('#txtdlgCreateItemTaskName').val($('#txtdlgCreateItemTaskNumber').val()); return false; });

	$("#btnCreateItem").show();

	/*
	me.set('initParameter.createChild_btn', true);
	me.set('initParameter.delete_btn', true);
	me.set('initParameter.meet_btn', true);
	me.set('initParameter.issue_btn', true);
	me.set('initParameter.alert_btn', true);

	me.set('initParameter.grid_progress',true);
	me.set('initParameter.payment milestone',true);
	me.set('initParameter.task_number',true);
	me.set('initParameter.primavera_id',true);
	me.set('initParameter.po',true);
	me.set('initParameter.cargo_promised_date',true);
	me.set('initParameter.attribute10',true);
	me.set('initParameter.attribute6',true);*/

	if(view_type == "SETUP"){
		/*me.set('initParameter.meet_btn', false);
		me.set('initParameter.issue_btn', false);
		me.set('initParameter.alert_btn', false);*/
	}
	else if(view_type == "VIEW"){
		/*me.set('initParameter.view_type', param.viewType);
		me.set('initParameter.create_btn', false);
		me.set('initParameter.attribute10',false);
		me.$.btnExcelUpload.text="Excel Change Upload";*/
	}
	else if(view_type == "INTER"){
		/*me.set('initParameter.view_type', param.viewType);

		me.set('initParameter.meet_btn', false);
		me.set('initParameter.issue_btn', false);
		me.set('initParameter.alert_btn', false);


		me.set('initParameter.grid_progress',false);
		me.set('initParameter.payment milestone',false);
		me.set('initParameter.task_number',false);
		me.set('initParameter.primavera_id',false);
		me.set('initParameter.po',false);
		me.set('initParameter.cargo_promised_date',false);*/

	}
	else{
		$("#btnCreateItem").hide();
	}

	initCode();
}

function btnCreateItemAddClick(){
	var row = dlgCreateItemGrid.AddRow(null,null,1,null,null);
	row.USER_JOB = "PUB";
	row.AUTH_SCHEDULE1 = "1";

	dlgCreateItemGrid.RefreshRow(row);
}


function btnCreateItemClick(){

	setDlgCreateItemControls();
	$('#dlgCreateItem').modal('show');
}

function removeValidationError(areaID) {
	$("#" + areaID + " .validation-error").each(function () {
		$(this).removeClass("validation-error");
	});
}

function setDlgCreateItemControls(){

	removeValidationError("dlgCreateItem");

	$('#seldlgCreateItemPaymentMilestone').val("");
	$('#seldlgCreateItemOnoOfshore').val("OFF");

	$('#txtdlgCreateItemProjectCode').val("");
	$('#txtdlgCreateItemProjectName').val("");
	$("#txtdlgCreateItemProjectCode").parent().find(".autocomplete-valid").hide();

	$('#txtdlgCreateItemItem').val("");
	$('#txtdlgCreateItemBatchName').val("");
	$('#txtdlgCreateItemTrkDescriptionName').val("");
	$('#txtdlgCreateItemTaskNumber').val("");
	$('#txtdlgCreateItemTaskName').val("");
	$('#txtdlgCreateItemPrimaveraId').val("");

	$('#txtdlgCreateItemMpsPlanDate').val("");
	$('#txtdlgCreateItemMpsExpectedDate').val("");
	$('#txtdlgCreateItemMpsActualDate').val("");
	$('#txtdlgCreateItemPurchaseDuration').val("");

	$('#txtdlgCreateItemPoPlanDate').val("");
	$('#txtdlgCreateItemPoExpectedDate').val("");
	$('#txtdlgCreateItemPoActualDate').val("");
	$('#txtdlgCreateItemMakeDuration').val("");

	$('#txtdlgCreateItemCargoPlanDate').val("");
	$('#txtdlgCreateItemCargoExpectedDate').val("");
	$('#txtdlgCreateItemCargoActualDate').val("");
	$('#txtdlgCreateItemShipmentDuration').val("");

	$('#txtdlgCreateItemFobPlanDate').val("");
	$('#txtdlgCreateItemFobExpectedDate').val("");
	$('#txtdlgCreateItemFobActualDate').val("");
	$('#txtdlgCreateItemCargoPromisedDate').val("");
	$('#txtdlgCreateItemTransDuration').val("");

	$('#txtdlgCreateItemOnsitePlanDate').val("");
	$('#txtdlgCreateItemOnsiteExpectedDate').val("");
	$('#txtdlgCreateItemOnsiteActualDate').val("");
	$('#txtdlgCreateItemProgress').val("");

	dlgCreateItemGrid.Source.Data.Data.Body = [[]];
	dlgCreateItemGrid.ReloadBody();
}

function searchDlgInvEditList(){
	$.ajax({
		url: "/getIdsmSetupDlgInvEdit.do",
		data: {"PROJECT_NO" : selectDlgInvEditRow.PROJECT_NO, "TRK_ITEM_SEQ" : selectDlgInvEditRow.TRK_ITEM_SEQ},
		success: function (data, textStatus, jqXHR) {
			dlgInvAllList = data.results.allList;
			dlgInvGrid.Source.Data.Data.Body = [data.results.list];
			dlgInvGrid.ReloadBody();
        }
    });
}

function btnDlgInvEditSaveClick() {
	dlgInvGrid.ActionAcceptEdit();

	var changeObject = dlgInvGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	if(changeList == 0){
		alert($('#alertGridDataNull').val());
		return;
	}

	var check = false;
	var insertList = [];
	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = dlgInvGrid.GetRowById(rowId);

		for(var j = 0; j < dlgInvAllList.length; j++){
			var allRow = dlgInvAllList[j];

			if(row.INVOICE_NUM == allRow.INVOICE_NUM){
				check = true;
			}
		}

		var gridRowId = row.ROW_ID == null ? "" : row.ROW_ID;
		var insertRow = {"ROW_ID" : gridRowId, "INVOICE_NUM" : row.INVOICE_NUM,
						 "PROJECT_NO" : selectDlgInvEditRow.PROJECT_NO, "TRK_ITEM_SEQ" : selectDlgInvEditRow.TRK_ITEM_SEQ };
		insertList.push(insertRow);
	}

	var msg = $('#alertSave').val();
	if(check){
		msg = $('#alertSaveAlreadyInv').val();
	}

	if (confirm(msg)) {

		var list = JSON.stringify(insertList);
		var paramData = {"insertList" : list};

		$.ajax({
			url: "/saveIdsmSetupDlgInvEdit.do",
			data: paramData,
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				} else {
					alert_success($('#alertSaveSuccess').val());
					btnSearchClick();
					searchDlgInvEditList();
				}
			}
		});
	}
}

function btnDlgInvEditDeleteClick() {
	var deleteList = [];
	var selectList = dlgInvGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++){

		var row = selectList[i];
		if(row.Added != null && row.Added == 1){
			dlgInvGrid.RemoveRow(row);
		}
		else{
			var deleteRow = {"ROW_ID" : row.ROW_ID};
			deleteList.push(deleteRow);
		}
	}

	if(deleteList.length > 0){
		if (confirm($('#alertDelete').val())) {
			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteIdsmSetupDlgInvEdit.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertDeleteSuccess').val());
						btnSearchClick();
						searchDlgInvEditList();
					}
				}
			});
		}
	}
}

function btnDlgInvEditAddClick() {
	var row = dlgInvGrid.AddRow(null,null,1,null,null);

	var INVOICE_NUM = "";
	if(selectDlgInvEditRow.PROJECT_NO == "T19020"){
		INVOICE_NUM = "JW910-DHIC-INV-";
	}

	row.INVOICE_NUM = INVOICE_NUM
	dlgInvGrid.RefreshRow(row);
}

function btnSaveClick() {

	mainGrid.ActionAcceptEdit();

	if(mainGrid.RowCount == 0){
		alert($('#alertGridDataNull').val());
		return;
	}

	var changeObject = mainGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	if(changeList == 0){
		alert($('#alertGridEditDataNull').val());
		return;
	}

	if (confirm($('#alertSave').val())) {
		var updateList = [];

		for(var i = 0; i < changeList.length; i++){
			var rowId = changeList[i].id;
			var row = mainGrid.GetRowById(rowId);

			var updateRow = {"TRK_ITEM_NAME" : row.TRK_ITEM_NAME, "TRK_ITEM_GROUP" : row.TRK_ITEM_GROUP, "ORGANIZATION_ID" : row.ORGANIZATION_ID,
			                 "PROJECT_ID" : row.PROJECT_ID, "PROJECT_NO" : row.PROJECT_NO,
			                 "TASK_NUMBER" : row.TASK_NUMBER, "BATCH" : row.BATCH, "OFFSHORE" : row.OFFSHORE,
			                 "PRIMAVERA_ID" : row.PRIMAVERA_ID, "INVOICE_NUM" : row.INVOICE_NUM, "PURCHASE_DURATION" : row.PURCHASE_DURATION,
							 "ATTRIBUTE1" : row.ATTRIBUTE1, "ATTRIBUTE2" : row.ATTRIBUTE2, "ATTRIBUTE3" : row.ATTRIBUTE3,
							 "ATTRIBUTE4" : row.ATTRIBUTE4, "ATTRIBUTE5" : row.ATTRIBUTE5, "ATTRIBUTE6" : row.ATTRIBUTE6,
							 "ATTRIBUTE7" : row.ATTRIBUTE7, "ATTRIBUTE8" : row.ATTRIBUTE8, "ATTRIBUTE9" : row.ATTRIBUTE9,
							 "ATTRIBUTE10" : row.ATTRIBUTE10, "TRK_ITEM_SEQ" : row.TRK_ITEM_SEQ, "CARGO_PROMISED_DATE" : row.CARGO_PROMISED_DATE,
							 "SEL_INVOICE_NUM" : row.SEL_INVOICE_NUM, "MAKE_DURATION" : row.MAKE_DURATION,
							 "PROGRESS" : row.PROGRESS, "SHIPMENT_DURATION" : row.SHIPMENT_DURATION, "TRANS_DURATION" : row.TRANS_DURATION,
							 "PAYMENT_MILESTONE" : row.PAYMENT_MILESTONE, "TRK_ITEM_DEFAULT" : row.TRK_ITEM_DEFAULT,
							 "PM_AD" : row.PM_AD, "PM_NAME" : row.PM_NAME, "EM_AD" : row.EM_AD, "EM_NAME" : row.EM_NAME,
							 "BUYER_AD" : row.BUYER_AD, "BUYER_NAME" : row.BUYER_NAME, "QC_AD" : row.QC_AD, "QC_NAME" : row.QC_NAME,
							 "SM_AD" : row.SM_AD, "SM_NAME" : row.SM_NAME,
							 "MPS_PLAN_DATE" : row.MPS_PLAN_DATE, "MPS_EXPECTED_DATE" : row.MPS_EXPECTED_DATE, "MPS_ACTUAL_DATE" : row.MPS_ACTUAL_DATE,
							 "PO_PLAN_DATE" : row.PO_PLAN_DATE, "PO_EXPECTED_DATE" : row.PO_EXPECTED_DATE, "PO_ATCUAL_DATE" : row.PO_ATCUAL_DATE,
							 "CARGO_PLAN_DATE" : row.CARGO_PLAN_DATE, "CARGO_EXPECTED_DATE" : row.CARGO_EXPECTED_DATE, "CARGO_ACTUAL_DATE" : row.CARGO_ACTUAL_DATE,
							 "FOB_PLAN_DATE" : row.FOB_PLAN_DATE, "FOB_EXPECTED_DATE" : row.FOB_EXPECTED_DATE, "FOB_ACTUAL_DATE" : row.FOB_ACTUAL_DATE,
							 "ONSITE_PLAN_DATE" : row.ONSITE_PLAN_DATE, "ONSITE_EXPECTED_DATE" : row.ONSITE_EXPECTED_DATE, "ONSITE_ACTUAL_DATE" : row.ONSITE_ACTUAL_DATE};


			objNullCheck(updateRow);

			updateList.push(updateRow);
		}


		var list = JSON.stringify(updateList);
		var paramData = {"updateList" : list};


		$.ajax({
			url: "/saveIdsmSetup.do",
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
}

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}
}

function initFileInput(obj_id) {
	console.log("fn initFileInput > obj_id: [" + obj_id + "]");
	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme					: "fas"
		, language				: "kr"
		, showUpload			: false
		, hideThumbnailContent	: true
		, overwriteInitial		: false
		, validateInitialCount	: true
	});

	$(".btn-file").css("padding-top", "3px"	);
	$(".btn-file").css("height"		, "26px");

	$(".file-caption").css("height"			, "26px");
	$(".file-caption").css("padding-top"	, "3px"	);
	$(".file-caption").css("padding-bottom"	, "3px"	);
}

function btnSearchClick() {

	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblSearchBox");

	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}

	var issue_check = "N";
	if($('#ckIssueCheck').is(":checked")){
		issue_check = "Y";
	}


	$.ajax({
		url: "/getIdsmSetup.do",
		data: {"VIEW_TYPE" : view_type, "KEY1" : $("#selSearchKey1").val(), "VALUE1" : $("#txtSearchValue1").val()
			  ,"KEY4" : $("#selSearchKey4").val(),"VALUE4" : $("#txtSearchValue4").val(), "KEY3" : $("#selSearchKey3").val()
			  ,"VALUE2" : $("#txtSearchValue2").val(), "VALUE3" : $("#txtSearchValue3").val(), "KEY6" : $("#selSearchKey6").val()
			  ,"VALUE5" : $("#txtSearchValue5").val(), "VALUE6" : $("#txtSearchValue6").val(), "KEY2" : $("#selSearchKey2").val()
			  ,"KEY5" : $("#selSearchKey5").val(), "OFFSHORE" : $("#selOnoOfshore").val(), "PROJECT_NO" : $("#txtProjectCode").val()
			  ,"ISSUE_CHECK" : issue_check
		      },
		success: function (data, textStatus, jqXHR) {

			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.Reload();
        }
    });

}

function mainGridSearchReload(grid) {
	var list = grid.Rows;

	for (var key in list) {

		var gridRow = list[key];

		if(gridRow.Fixed == null){
			setGridDateCheck(grid, gridRow);
		}
	}
}


function setGridDateCheck(grid, gridRow) {
	if(((gridRow.MPS_ACTUAL_DATE == null || gridRow.MPS_ACTUAL_DATE == "") && gridRow.MPS_PLAN_DATE < gridRow.MPS_EXPECTED_DATE )
		|| ((gridRow.MPS_ACTUAL_DATE == null || gridRow.MPS_ACTUAL_DATE == "") && (gridRow.MPS_EXPECTED_DATE != null && gridRow.MPS_EXPECTED_DATE != "") && gridRow.MPS_EXPECTED_DATE < toDay)){
		gridRow.MPS_PLAN_DATEBackground = "#f59ea7";
		gridRow.MPS_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.MPS_ACTUAL_DATEBackground = "#f59ea7";
	}
	else{
		gridRow.MPS_PLAN_DATEBackground = "";
		gridRow.MPS_EXPECTED_DATEBackground = "";
		gridRow.MPS_ACTUAL_DATEBackground = "";
	}

	if( (gridRow.PO_ATCUAL_DATE == null || gridRow.PO_ATCUAL_DATE == "") && (gridRow.PO_EXPECTED_DATE != null && gridRow.PO_EXPECTED_DATE != "") && gridRow.PO_EXPECTED_DATE < toDay){
		gridRow.PO_PLAN_DATEBackground = "#f59ea7";
		gridRow.PO_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.PO_ATCUAL_DATEBackground = "#f59ea7";
	}
	else if( ((gridRow.PO_ATCUAL_DATE == null || gridRow.PO_ATCUAL_DATE == "") && gridRow.PO_PLAN_DATE < gridRow.PO_EXPECTED_DATE)){
		gridRow.PO_PLAN_DATEBackground = "#f59ea7";
		gridRow.PO_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.PO_ATCUAL_DATEBackground = "#f59ea7";
    }
    else if((gridRow.PO_ATCUAL_DATE == null || gridRow.PO_ATCUAL_DATE == "") && gridRow.MPS_ACTUAL_DATE >  gridRow.PO_PLAN_DATE ){
		gridRow.PO_PLAN_DATEBackground = "#f59ea7";
		gridRow.PO_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.PO_ATCUAL_DATEBackground = "#f59ea7";
    }
	else{
		gridRow.PO_PLAN_DATEBackground = "";
		gridRow.PO_EXPECTED_DATEBackground = "";
		gridRow.PO_ATCUAL_DATEBackground = "";
	}

	if((gridRow.CARGO_ACTUAL_DATE == null || gridRow.CARGO_ACTUAL_DATE == "") && (gridRow.CARGO_EXPECTED_DATE != null && gridRow.CARGO_EXPECTED_DATE != "") && gridRow.CARGO_EXPECTED_DATE < toDay){
		gridRow.CARGO_PLAN_DATEBackground = "#f59ea7";
		gridRow.CARGO_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.CARGO_ACTUAL_DATEBackground = "#f59ea7";
	}
	else if((gridRow.CARGO_ACTUAL_DATE == null || gridRow.CARGO_ACTUAL_DATE == "") && gridRow.CARGO_PLAN_DATE < gridRow.CARGO_EXPECTED_DATE ){
		gridRow.CARGO_PLAN_DATEBackground = "#f59ea7";
		gridRow.CARGO_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.CARGO_ACTUAL_DATEBackground = "#f59ea7";
    }
    else if((gridRow.CARGO_ACTUAL_DATE == null || gridRow.CARGO_ACTUAL_DATE == "") && gridRow.PO_ATCUAL_DATE >  gridRow.CARGO_PLAN_DATE ){
		gridRow.CARGO_PLAN_DATEBackground = "#f59ea7";
		gridRow.CARGO_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.CARGO_ACTUAL_DATEBackground = "#f59ea7";
    }
	else{
		gridRow.CARGO_PLAN_DATEBackground = "";
		gridRow.CARGO_EXPECTED_DATEBackground = "";
		gridRow.CARGO_ACTUAL_DATEBackground = "";
	}

	if( (gridRow.FOB_ACTUAL_DATE == null || gridRow.FOB_ACTUAL_DATE == "") && (gridRow.FOB_EXPECTED_DATE != null && gridRow.FOB_EXPECTED_DATE != "") && gridRow.FOB_EXPECTED_DATE < toDay){
		gridRow.FOB_PLAN_DATEBackground = "#f59ea7";
		gridRow.FOB_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.FOB_ACTUAL_DATEBackground = "#f59ea7";
	}
	else if((gridRow.FOB_ACTUAL_DATE == null || gridRow.FOB_ACTUAL_DATE == "") && gridRow.FOB_PLAN_DATE < gridRow.FOB_EXPECTED_DATE ){
		gridRow.FOB_PLAN_DATEBackground = "#f59ea7";
		gridRow.FOB_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.FOB_ACTUAL_DATEBackground = "#f59ea7";
    }
    else if((gridRow.FOB_ACTUAL_DATE == null || gridRow.FOB_ACTUAL_DATE == "") && gridRow.CARGO_ACTUAL_DATE >  gridRow.FOB_PLAN_DATE ){
		gridRow.FOB_PLAN_DATEBackground = "#f59ea7";
		gridRow.FOB_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.FOB_ACTUAL_DATEBackground = "#f59ea7";
    }
	else{
		gridRow.FOB_PLAN_DATEBackground = "";
		gridRow.FOB_EXPECTED_DATEBackground = "";
		gridRow.FOB_ACTUAL_DATEBackground = "";
	}

	if((gridRow.ONSITE_ACTUAL_DATE == null || gridRow.ONSITE_ACTUAL_DATE == "") && (gridRow.ONSITE_EXPECTED_DATE != null && gridRow.ONSITE_EXPECTED_DATE != "") && gridRow.ONSITE_EXPECTED_DATE < toDay){
		gridRow.ONSITE_PLAN_DATEBackground = "#f59ea7";
		gridRow.ONSITE_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.ONSITE_ACTUAL_DATEBackground = "#f59ea7";
	}
	else if((gridRow.ONSITE_ACTUAL_DATE == null || gridRow.ONSITE_ACTUAL_DATE == "") && gridRow.ONSITE_PLAN_DATE < gridRow.ONSITE_EXPECTED_DATE ){
		gridRow.ONSITE_PLAN_DATEBackground = "#f59ea7";
		gridRow.ONSITE_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.ONSITE_ACTUAL_DATEBackground = "#f59ea7";
    }
    else if((gridRow.ONSITE_ACTUAL_DATE == null || gridRow.ONSITE_ACTUAL_DATE == "") && gridRow.FOB_ACTUAL_DATE >  gridRow.ONSITE_PLAN_DATE ){
		gridRow.ONSITE_PLAN_DATEBackground = "#f59ea7";
		gridRow.ONSITE_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.ONSITE_ACTUAL_DATEBackground = "#f59ea7";
    }
	else{
		gridRow.ONSITE_PLAN_DATEBackground = "";
		gridRow.ONSITE_EXPECTED_DATEBackground = "";
		gridRow.ONSITE_ACTUAL_DATEBackground = "";
	}

	grid.RefreshRow(gridRow);
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

function initTable(){

	var gridLangUrl = "/resources/gridJs/Languages/TextKR.js";

	var mainGridCol = {"Cfg" : { "id" : "idsmSetupMainGrid", "CfgId" : "idsmSetupMainGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "3", "Style" : "Material"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "700","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "1", "Adding" : "0", "Export" : "1", "Deleting" : "0","ConstHeight": "1"
						,"MainCol" : "TRK_ITEM_NAME", "SafeCSS"		: "1", "Sorting" : "0", "Size" : "Low", "Scale" : "90%"

					   },
					   "Toolbar" : {"Cells20Data" : "Export"
					   			   ,"Cells60Cfg" : "Columns"
					   			   ,"Cells70Styles" : "Styles,Sizes,Scales"
					   			   ,"Visible" : "1"},
				       "Panel" : {"Visible" : "0"},
				       "LeftCols": [ {"Name"		: "TRK_ITEM_NAME"
 									 ,"Type"	: "Text"
									 ,"Width"	: "300"
									 ,"Spanned"	: "1"
									 ,"OnClickCell"	: "openModal(Grid,Row,Col);"
									 ,"Class" : "gridLinkText"
									 , "CanEdit": "0"
						}],
						"Cols" : [{"Name": "ATTRIBUTE3"			, "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText"	}	/* Vendor					*/
								 ,{ "Name": "ATTRIBUTE7"			, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0"	}	/* 선적국가					*/
								 ,{ "Name": "ATTRIBUTE10"			, "Width": "90"	, "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0"	}	/* 항차No						*/
								 ,{ "Name": "SEL_INVOICE_NUM"		, "Width": "150", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "OnClickCell"	: "openInvModal(Grid,Row,Col)"	}	/* Invoice No				*/
								 , { "Name": "ATTRIBUTE6"			, "Width": "120", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0"	}	/* 공급 Scope					*/

								 , { "Name": "MPS_PLAN_DATE"			, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)" 	}	/* MPS(PR) Plan(L3)			*/
								 , { "Name": "MPS_EXPECTED_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* MPS(PR) Expected			*/
								 , { "Name": "MPS_ACTUAL_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* MPS(PR) Actual			*/

								 , { "Name": "PO_PLAN_DATE"			, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* PO Plan(L3)				*/
								 , { "Name": "PO_EXPECTED_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* PO Expected				*/
								 , { "Name": "PO_ATCUAL_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* PO Actual				*/

						 		 , { "Name": "CARGO_PLAN_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* Cargo Ready Plan			*/
								 , { "Name": "CARGO_EXPECTED_DATE"	, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* Cargo Ready Expected		*/
								 , { "Name": "CARGO_ACTUAL_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* Cargo Ready Actual		*/

								 , { "Name": "FOB_PLAN_DATE"			, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* FOB/지정장소 상차도 Plan(L3) 	*/
								 , { "Name": "FOB_EXPECTED_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* FOB/지정장소 상차도 Expected	*/
								 , { "Name": "FOB_ACTUAL_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* FOB/지정장소 상차도 Actual		*/

								 , { "Name": "ONSITE_PLAN_DATE"		, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* On Site Plan(L3)			*/
								 , { "Name": "ONSITE_EXPECTED_DATE"	, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* On Site Expected			*/
								 , { "Name": "ONSITE_ACTUAL_DATE"	, "Width": "120", "Type": "Text" 		, "Spanned":"1", "Class" : "gridBorderText", "CanMove" : "0", "OnClickCell"	: "ShowCustomCalendar(Grid,Row,Col)"	}	/* On Site Actual			*/

								 , { "Name": "CREATE_USER1"			, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* Header No.				*/
								 , { "Name": "CREATE_USER2"			, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* Line No.					*/
								 , { "Name": "CREATE_USER3"			, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* Supplier					*/

								 , { "Name": "PAYMENT_MILESTONE"	, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* Payment Milestone		*/
								 , { "Name": "TASK_NUMBER"			, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* Activity					*/
								 , { "Name": "PRIMAVERA_ID"			, "Width": "120", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* L3 ID					*/

								 , { "Name": "PM_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* PM 담당자					*/
								 , { "Name": "EM_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* 설계 담당자					*/
								 , { "Name": "BUYER_NAME"			, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* 구매 담당자					*/
								 , { "Name": "SM_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* 공정 담당자					*/
								 , { "Name": "QC_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"}	/* 품질 담당자					*/
						],
						  "Head" : [
							{
								"Kind"					: "Header", "Class" : "gridCenterText"
								, "id"					: "Header"
								, "Spanned"				: "1"
								, "PanelRowSpan"		: "2"
								, "TRK_ITEM_NAME"		: "Item"				, "TRK_ITEM_NAMERowSpan"	: "2"
								, "ATTRIBUTE3"			: "Vendor"				, "ATTRIBUTE3RowSpan"		: "2"
								, "ATTRIBUTE7"			: "선적국가"				, "ATTRIBUTE7RowSpan"		: "2"
								, "ATTRIBUTE10"			: "Shipment No"				, "ATTRIBUTE10RowSpan"		: "2"
								, "SEL_INVOICE_NUM"		: "Invoice No"			, "SEL_INVOICE_NUMRowSpan"	: "2"
								, "ATTRIBUTE6"			: "공급 Scope"			, "ATTRIBUTE6RowSpan"		: "2"
								, "MPS_PLAN_DATE"		: "MPS(PR)"				, "MPS_PLAN_DATESpan"		: "3"
								, "MPS_EXPECTED_DATE"	: ""
								, "MPS_ACTUAL_DATE"		: ""
								, "PO_PLAN_DATE"		: "PO"					, "PO_PLAN_DATESpan"		: "3"
								, "PO_EXPECTED_DATE"	: ""
								, "PO_ATCUAL_DATE"		: ""
								, "CARGO_PLAN_DATE"		: "Cargo Ready"			, "CARGO_PLAN_DATESpan"		: "3"
								, "CARGO_EXPECTED_DATE"	: ""
								, "CARGO_ACTUAL_DATE"	: ""
								, "FOB_PLAN_DATE"		: "FOB/지정장소 상차도"		, "FOB_PLAN_DATESpan"		: "3"
								, "FOB_EXPECTED_DATE"	: ""
								, "FOB_ACTUAL_DATE"		: ""
								, "ONSITE_PLAN_DATE"	: "On Site"				, "ONSITE_PLAN_DATESpan"	: "3"
								, "ONSITE_EXPECTED_DATE": ""
								, "ONSITE_ACTUAL_DATE"	: ""
								, "CREATE_USER1"		: "PO"					, "aaSpan"					: "3"
								, "CREATE_USER2"		: ""
								, "CREATE_USER3"		: ""
								, "PAYMENT_MILESTONE"	: "Payment Milestone"	, "ddRowSpan"				: "2"
								, "TASK_NUMBER"			: "Activity"			, "eeRowSpan"				: "2"
								, "PRIMAVERA_ID"		: "L3 ID"				, "PRIMAVERA_IDRowSpan"		: "2"
								, "PM_NAME"				: "담당자"				, "PM_NAMESpan"				: "5"
								, "EM_NAME"				: ""
								, "BUYER_NAME"			: ""
								, "SM_NAME"				: ""
								, "QC_NAME"				: ""
							}
							, {
								"Kind"					: "Header", "Class" : "gridCenterText"
								, "Spanned"				: "1"
								, "TRK_ITEM_NAME"		: "Item"
								, "ATTRIBUTE3"			: "Vendor"
								, "ATTRIBUTE7"			: "선적국가"
								, "ATTRIBUTE10"			: "Shipment No"
								, "SEL_INVOICE_NUM"		: "Invoice No"
								, "ATTRIBUTE6"			: "공급 Scope"
								, "MPS_PLAN_DATE"		: "Plan(L3)"
								, "MPS_EXPECTED_DATE"	: "Expected"
								, "MPS_ACTUAL_DATE"		: "Actual"
								, "PO_PLAN_DATE"		: "Plan(L3)"
								, "PO_EXPECTED_DATE"	: "Expected"
								, "PO_ATCUAL_DATE"		: "Actual"
								, "CARGO_PLAN_DATE"		: "Plan"
								, "CARGO_EXPECTED_DATE"	: "Expected"
								, "CARGO_ACTUAL_DATE"	: "Actual"
								, "FOB_PLAN_DATE"		: "Plan(L3)"
								, "FOB_EXPECTED_DATE"	: "Expected"
								, "FOB_ACTUAL_DATE"		: "Actual"
								, "ATD_DATE"			: "ATD(ETD)"
								, "POD_DATE"			: "POD"
								, "ONSITE_PLAN_DATE"	: "Plan(L3)"
								, "ONSITE_EXPECTED_DATE": "Expected"
								, "ONSITE_ACTUAL_DATE"	: "Actual"
								, "CREATE_USER1"		: "Header No."
								, "CREATE_USER2"		: "Line No."
								, "CREATE_USER3"		: "Supplier"
								, "PAYMENT_MILESTONE"	: "Payment Milestone"
								, "TASK_NUMBER"			: "Activity"
								, "PRIMAVERA_ID"		: "L3 ID"
								, "PM_NAME"				: "PM"
								, "EM_NAME"				: "설계"
								, "BUYER_NAME"			: "구매"
								, "SM_NAME"				: "공정"
								, "QC_NAME"				: "품질"
							}
						]
	};




	var dlgInvGridCol = {"Cfg" : { "id" : "idsmDlgInvGrid", "CfgId" : "idsmDlgInvGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "3", "Style" : "Material"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "200","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
						,"SafeCSS" : "1", "Sorting" : "0"}
						,"Panel" : {"Visible" : "1"}
						,"Toolbar" : {"Visible" : "0"}
						, "Cols" : [
							{	"Name"	: "INVOICE_NUM", "Width": "500", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText", "CanMove" : "0" }
						]
						,"Header" : {
							"INVOICE_NUM"	: "Invoice Number", "Class" : "gridCenterText"
						}
	};

	var dlgCreateItemGridCol = {"Cfg" : { "id" : "idsmDlgCreateItemGrid", "CfgId" : "idsmDlgCreateItemGridCfg", "SuppressCfg" : "1", "StyleLap":"0", "Version" : "2", "Style" : "Material"
	 									,"ConstWidth" : "100%", "MinTagHeight": "300","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
										,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
										,"SafeCSS" : "1", "Sorting" : "0"}
						,"Panel" : {"Visible" : "1", "Spanned" : "1"}
						,"Toolbar" : {"Visible" : "0"}
						,"Cols" : [{	"Name": "USER_JOB", "Width": "100"	, "Type": "Enum", "Enum" : gridUserJobCode.VALUE, "EnumKeys" : gridUserJobCode.KEY ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "1" }
									, {	"Name": "AUTH_SCHEDULE1", "Width": "70"	, "Type": "Bool", "BoolIcon": "4", "Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0" }
									, {	"Name": "AUTH_SCHEDULE2", "Width": "70"	, "Type": "Bool", "BoolIcon": "4", "Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0" }
									, {	"Name": "USER_NAME", "Width": "120", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
									, {	"Name": "USER_DEPT_NAME", "Width": "170", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
						]
						, "Head" : [
							{
								"Kind"			: "Header", "Class" : "gridCenterText"
								, "id"			: "Header"
								, "Spanned"		: "1"
								, "PanelRowSpan": "2"
								, "USER_JOB"			: "담당"
								, "USER_JOBRowSpan"	: "2"
								, "AUTH_SCHEDULE1"			: "R&R(일정)"
								, "AUTH_SCHEDULE1Span"		: "2"
								, "AUTH_SCHEDULE2"			: ""
								, "USER_NAME"			: "담당자명"
								, "USER_NAMERowSpan"	: "2"
								, "USER_DEPT_NAME"			: "담당자부서"
								, "USER_DEPT_NAMERowSpan"	: "2"
							}
							, {
								"Kind"		: "Header", "Class" : "gridCenterText"
								,"Spanned"	: "1"
								, "USER_JOB"		: "담당"
								, "AUTH_SCHEDULE1"		: "관리"
								, "AUTH_SCHEDULE2"		: "조회"
								, "USER_NAME"		: "담당자명"
								, "USER_DEPT_NAME"		: "담당자부서"
							}
						]
	};

	mainGrid =	TreeGrid( {Layout:{Data:mainGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridMain" );
	dlgInvGrid = TreeGrid( {Layout:{Data:dlgInvGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridDlgInv" );
	dlgCreateItemGrid = TreeGrid( {Layout:{Data:dlgCreateItemGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridCreateItem" );








	col1 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MainCol"		: "aa"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
			, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
			, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "Deleting" : "0"
			, "SafeCSS"		: "1"

		}
		,"Panel" : {"Visible" : "0"}
		,"Toolbar" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name"	: "aa", "Width": "390", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name"	: "bb", "Width": "178", "Type": "Text" ,"Spanned" : "1"	}
		]
		, "Header" : {
			"aa"	: "Item"
			, "bb"	: "일정 Issue"
		}
	};

	col2 = {
		"Cfg" : {
			"ConstWidth"	: "1"
			, "MaxHeight"	: "1"
			, "MinTagHeight": "150"
			, "MaxWidth"	: "100%"
			, "SuppressCfg"	: "1"
			, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
			, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "Deleting" : "0"
			, "SafeCSS"		: "1"
		}
		,"Toolbar" : {"Visible" : "0"}
		, "Panel" : {"Spanned" : "1"}
		, "Cols" : [
			{	"Name": "aa", "Width": "80"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "70"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "70"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "dd", "Width": "100", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "ee", "Width": "218", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Head" : [
			{
				"Kind"			: "Header"
				, "id"			: "Header"
				, "Spanned"		: "1"
				, "PanelRowSpan": "2"
				, "aa"			: "담당"
				, "aaRowSpan"	: "2"
				, "bb"			: "R&R(일정)"
				, "bbSpan"		: "2"
				, "cc"			: ""
				, "dd"			: "담당자명"
				, "ddRowSpan"	: "2"
				, "ee"			: "담당자부서"
				, "eeRowSpan"	: "2"
			}
			, {
				"Kind"		: "Header"
				,"Spanned"	: "1"
				, "aa"		: "담당"
				, "bb"		: "관리"
				, "cc"		: "조회"
				, "dd"		: "담당자명"
				, "ee"		: "담당자부서"
			}
		]
	};

	col111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "SafeCSS"		: "1"
		}
		,"Toolbar" : {"Visible" : "0"}
		,"Panel" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "150", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "90"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "dd", "Width": "110", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "Issue 제목"
			, "bb"	: "Issue 발생일"
			, "cc"	: "조치여부"
			, "dd"	: "등록자"
		}
	};

	col1111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "SafeCSS"		: "1"
		}
		,"Toolbar" : {"Visible" : "0"}
		,"Panel" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "356", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "담당자 명"
			, "bb"	: "담당자 부서"
		}
	};

	col11111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "SafeCSS"		: "1"

		}
		,"Panel" : {"Visible" : "0"}
		,"Toolbar" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "260", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "100", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "110", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "알람 제목"
			, "bb"	: "발송(예정)일"
			, "cc"	: "등록자"
		}
	};

	col111111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg" : "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "SafeCSS"		: "1"
		}
		,"Panel" : {"Visible" : "0"}
		,"Toolbar" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "236", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "수신인"
			, "bb"	: "수신자 부서"
			, "cc"	: "발송일자"
		}
	};

	grid1		=	TreeGrid( { Layout:{ Data: col1		}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid11"		);
	grid2		=	TreeGrid( { Layout:{ Data: col2		}, Data:{ Data: { Body: [ [] ] } } }, "grid22"		);
	grid111		=	TreeGrid( { Layout:{ Data: col111	}, Data:{ Data: { Body: [ [] ] } } }, "grid111"	);
	grid1111	=	TreeGrid( { Layout:{ Data: col1111	}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid1111"	);
	grid11111	=	TreeGrid( { Layout:{ Data: col11111	}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid11111"	);
	grid111111	=	TreeGrid( { Layout:{ Data: col111111}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid111111" );
}

// 달력 셋팅
function initDatePicker( ) {
	$("input[name=inpDatePicker]").datepicker( {
		changeMonth		: true
		, changeYear	: true
		, dateFormat	: "yy/mm/dd"
	});
}

function initCode() {
	var codeList = [{"CODE" : "I001"},{"CODE" : "I002"},{"CODE" : "I003"},{"CODE" : "I004"},{"CODE" : "I005"},{"CODE" : "I006"}];
	var paramList = JSON.stringify(codeList);

	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			gridUserJobCode = setGridCombo(results.I006, "");
			var	result = setCombo(results.I001, "selSearchKey1", "");
				result = setCombo(results.I001, "selSearchKey7", "");
				result = setCombo(results.I002, "selSearchKey2", "");
//				result = setCombo(results.I003, "selSearchKey3", "");
				result = setCombo(results.I004, "selOnoOfshore", "all");
				result = setCombo(results.I001, "selSearchKey4", "");
				result = setCombo(results.I001, "selSearchKey8", "");
				result = setCombo(results.I002, "selSearchKey5", "");
//				result = setCombo(results.I003, "selSearchKey6", "");

				result = setCombo(results.I004, "seldlgCreateItemOnoOfshore", "");
				result = setCombo(results.I005, "seldlgCreateItemPaymentMilestone", "na");
				result = setCombo(results.I004, "seldlgCreateItemOnoOfshore", "");


		 	toDay = results.DAY[0].CUR_DAY;
			resetSearchControls();
			initTable();
        }
    });
}

function setGridCombo(data, type){
	var target = {};
	var key = "|";
	var value = "|";

	if(type == "all"){
		key = "|";
		value = "전체|";
	}
	else if(type == "sel"){
		key = "|";
		value = "선택|";
	}
	else if(type == "na"){
		key = "";
		value = "";
	}

	for(var i = 0; i < data.length; i++){
		var item = data[i];

		if(i == 0){
			key += item.CODE;
			value += item.NAME;
		}
		else{
			key += "|" + item.CODE;
			value += "|" + item.NAME;
		}
	}
	target["KEY"] = key;
	target["VALUE"] = value;
	return target;
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
		html += '<option value="' + item.CODE + '">' + item.NAME + '</option>';
	}

	$(elId).append(html);

	return true;
}

var editRowId;
function ShowCustomCalendar(G,row,col){

	var d = Get(row,col); d = d ? StringToDate(d) : (new Date()).setUTCHours(0,0,0)-0;
	var F = function(n){
	   if(n!="") n = DateToString(n,"yyyy/MM/dd");
	   G.SetValue(row,col,n,1);
	   }
	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);
	editRowId = row.id;
	return true;
}

function openModal (G,row,col) {
	$('#treeModal').modal('show');

}

function openInvModal (G,row,col) {
	selectDlgInvEditRow = row;
	$('#dlgInvEdit').modal('show');
	searchDlgInvEditList();

}

function aa(grid, row, col, val, oldval, errors){
	alert("aa");
}