/*
	기자재 일정관리 > L3 일정Setup
*/
var mainGrid;
var dlgInvGrid;
var dlgCreateItemGrid;
var dlgItemScheduleItemGrid;
var dlgItemScheduleAdminGrid;
var dlgExcelDownLoadGrid;
var dlgExcelUpLoadGrid;
var dlgProjectGrid;



var view_type = "SETUP";
var toDay;
var selectDlgInvEditRow;
var dlgInvAllList;
var gridUserJobCode;
var adminGridType = "Create";
var fileUse = true;



var col111;
var grid111;

var col1111;
var grid1111;

var col11111;
var grid11111;

var col111111;
var grid111111;



$(window).resize(function() {
	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
});

$(document).ready(function () {

	initControls();

	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);

});

function resetSearchControls() {

	$('#txtProjectCode').val("");
	$('#txtProjectName').val("");

	$('#selSearchKey1'	).val("item"		);
	$('#txtSearchValue1').val(""			);

	$('#selSearchKey2'	).val("cargo"		);
	$('#selSearchKey3'	).val("expected"	);
	$('#txtSearchValue2').val(""			);
	$('#txtSearchValue3').val(""			);
	$('#selOnoOfshore'	).val(""			);
	$('#selSearchKey4'	).val("attribute10"	);
	$('#txtSearchValue4').val(""			);

	$('#selSearchKey5'	).val("po"			);
	$('#selSearchKey6'	).val("plan"		);
	$('#txtSearchValue5').val(""			);
	$('#txtSearchValue6').val(""			);
	$('#ckIssueCheck'	).prop("checked", false);

	$("#txtProjectCode").parent().find(".autocomplete-valid").hide();

}

var fileLang = "en";
function initControls() {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
	}

	var createGrid = true;
	TGSetEvent("OnRenderFinish","idsmSetupMainGrid",function(grid){
		currentRow = null;
		parentNode = null;
		childNode = null;
		setFocus(mainGridSearchReload(grid));

		if(createGrid){
			grid.ChangeSort("NO");
			createGrid = false;
		}
	});

	TGSetEvent("OnRenderFinish","idsmDlgItemScheduleItemGrid",function(grid){
		dlgItemScheduleItemGridSearchReload(grid);
	});

	TGSetEvent("OnRenderFinish","idsmDlgExcelDownLoadGrid",function(grid){
		if(excelDown){
			grid.ExportFormat="xlsx";

			//dlgExcelDownLoadGrid.ExportOptions="{TableBorder:'2,gray'}";
			grid.ActionExport();

			//KTH 엑셀 다운로드시 옵션 선택 창 숨기기
			$(".TMMenuMain").hide();
			$(".TMMenuShadow").hide();
			$(".GridDisabled").hide();
			$("#TGMenuOk-5").click();
			//KTH 엑셀 다운로드시 옵션 선택 창 숨기기 END

			excelDown = false;

		}
	});

	TGSetEvent("OnChange","idsmSetupMainGrid",function(value, oldvalue){
		var row = mainGrid.GetRowById(oldvalue.id);
		setGridDateCheck(mainGrid, row);
	});

	TGSetEvent("OnValueChanged","idsmDlgCreateItemGrid",function(grid, row, col, val, oldval, errors){
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
	});

	TGSetEvent("OnValueChanged","idsmDlgItemScheduleAdminGrid",function(grid, row, col, val, oldval, errors){
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
	});

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

	makeAutocomplete(
		"txtDlgAdminAddListEmpName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgAdminAddListDeptName",		//clear필드 id
		"/getIdsmSetupDlgAdminAddList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgAdminAddListEmpName").val(ui.item.value.split("|")[0]);
			$("#txtDlgAdminAddListEmpAd").val(ui.item.value.split("|")[1]);
			$("#txtDlgAdminAddListDeptCode").val(ui.item.value.split("|")[2]);
			$("#txtDlgAdminAddListDeptName").val(ui.item.value.split("|")[3]);

			return false;
		}
	);

	// 조회형 데이터 autocomplete  - 기본형
	// obj_id			: 검색어가 입력되는 input id
	// keyword2_id		: 추가 조건 keyword2가 입력되는  input id
	// clear_id			: 검색시작시 내용을 삭제할 item의 id
	// url				: 자료 조회 url
	// min_length		: 검색 실행을 위한 keyword 최소 길이
	// use_valid_mark	: 검색결과에서 선택 했음 아이콘 표시 여부
	// select_callback	: 선택 후 처리 function
	makeAutocomplete(
		"txtDlgProjectProjectCode" 	// 검색어가 입력되는 input id
		, ""						// 추가 조건 keyword2가 입력되는  input id
		, ""						// 검색시작시 내용을 삭제할 item의 id
		, "/getIdsmSetupProject.do"	// 자료 조회 url
		, 2							// 검색 실행을 위한 keyword 최소 길이
		, false						// 검색결과에서 선택 했음 아이콘 표시 여부
		, function( event, ui ) {
			$("#txtDlgProjectProjectCode").val(ui.item.value.split("|")[1]);
			return false;
		}
	);

	// Project 조회 팝업에 조회 아이콘 클릭
	$('#iconDlgProjectListSearch').click(function () {
		dlgProjectListSearch();
		return false;
	});

	// 달력 셋팅
	initDatePicker();

	initFileInput("txtDlgItemScheduleFile");


	$('#iconSearch').click(function () { iconSearchClick(); return false; });

    $("#txtDlgProjectProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            dlgProjectListSearch();
        }
    });

    $('#btnDlgProjectSelect').click(function () { btnDlgProjectSelectClick(); return false; });

	$('#btnResete').click(function () { resetSearchControls(); return false; });

	$('#btnSearch').click(function () {

		mainGrid.ActionAcceptEdit();

		var changeObject = mainGrid.GetChanges();
		var changeList = JSON.parse(changeObject).Changes;

		if(changeList.length > 0){
			if (confirm($('#alertEditCheck').val())) {
				btnSaveClick("editCheck");
			}
			else {
				btnSearchClick();
			}
		}
		else {
			btnSearchClick();
		}

	 	return false;

	});

	// Project Code	앤터키 이벤트 시 목록 조회
	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$('#btnSave').click(function () { btnSaveClick(); return false; });
	$('#btnCreateItem').click(function () { btnCreateItemClick(); return false; });
	$('#btnDeleteItem').click(function () { btnDeleteItemClick(); return false; });
	$('#btnLowItemCopy').click(function () { btnLowItemCopyClick(); return false; });
	$('#btnItemCopy').click(function () { btnItemCopyClick(); return false; });
	$('#btnExcelUpload').click(function () { btnExcelUploadClick(); return false; });
	$('#btnExcelDownload').click(function () { btnExcelDownloadClick(); return false; });



	$('#btnL1').click(function () { btnL1Click(); return false; });
	$('#btnL2').click(function () { btnL2Click(); return false; });
	$('#btnL3').click(function () { btnL3Click(); return false; });


	$('#btnDlgCreateItemSave').click(function () { btnDlgCreateItemSaveClick(); return false; });



	$('#btnDlgInvEditAdd').click(function () { btnDlgInvEditAddClick(); return false; });
	$('#btnDlgInvEditDelete').click(function () { btnDlgInvEditDeleteClick(); return false; });
	$('#btnDlgInvEditSave').click(function () { btnDlgInvEditSaveClick(); return false; });

	$('#btnCreateItemAdd').click(function () { btnCreateItemAddClick(); return false; });
	$('#btnCreateItemDelete').click(function () { btnCreateItemDeleteClick(); return false; });


	$('#btnDlgItemScheduleSelInvoiceNumEdit').click(function () { openInvModal(); return false; });
	$('#btnDlgItemScheduleEdit').click(function () { btnDlgItemScheduleEditClick(); return false; });

	$('#dlgItemSchedule').on('shown.bs.modal', function () {
		$('#dlgItemSchedule').click();
	});

	$('#dlgItemSchedule').on('hide.bs.modal', function () {
		dlgYn = "N";
		setResetDlgItemScheduleControls();
	});


	$('#btnDlgItemScheduleAdminAdd').click(function () { btnDlgItemScheduleAdminAddClick(); return false; });
	$('#btnDlgItemScheduleAdminDelete').click(function () { btnDlgItemScheduleAdminDeleteClick(); return false; });

	$('#btnDlgAdminAddListSelect').click(function () { btnDlgAdminAddListSelectClick(); return false; });



	$('#txtdlgCreateItemTaskNumber').change(function () { $('#txtdlgCreateItemTaskName').val($('#txtdlgCreateItemTaskNumber').val()); return false; });


	$('#txtdlgCreateItemMpsExpectedDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemMpsExpectedDate"); return false; });
	$('#txtdlgCreateItemMpsActualDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemMpsActualDate"); return false; });
	$('#txtdlgCreateItemPurchaseDuration').change(function () { dlgCreateItemDateChange("txtdlgCreateItemPurchaseDuration"); return false; });

	$('#txtdlgCreateItemPoExpectedDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemPoExpectedDate"); return false; });
	$('#txtdlgCreateItemPoActualDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemPoActualDate"); return false; });
	$('#txtdlgCreateItemMakeDuration').change(function () { dlgCreateItemDateChange("txtdlgCreateItemMakeDuration"); return false; });

	$('#txtdlgCreateItemCargoExpectedDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemCargoExpectedDate"); return false; });
	$('#txtdlgCreateItemCargoActualDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemCargoActualDate"); return false; });
	$('#txtdlgCreateItemShipmentDuration').change(function () { dlgCreateItemDateChange("txtdlgCreateItemShipmentDuration"); return false; });


	$('#txtdlgCreateItemFobPlanDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemFobPlanDate"); return false; });
	$('#txtdlgCreateItemTransDuration').change(function () { dlgCreateItemDateChange("txtdlgCreateItemTransDuration"); return false; });

	$('#txtdlgCreateItemOnsitePlanDate').change(function () { dlgCreateItemDateChange("txtdlgCreateItemOnsitePlanDate"); return false; });





	$('#txtDlgItemScheduleMpsExpectedDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleMpsExpectedDate"); return false; });
	$('#txtDlgItemSchedulePurchaseDuration').change(function () { dlgItemScheduleDateChange("txtDlgItemSchedulePurchaseDuration"); return false; });

	$('#txtDlgItemSchedulePoExpectedDate').change(function () { dlgItemScheduleDateChange("txtDlgItemSchedulePoExpectedDate"); return false; });
	$('#txtDlgItemSchedulePoAtcualDate').change(function () { dlgItemScheduleDateChange("txtDlgItemSchedulePoAtcualDate"); return false; });
	$('#txtDlgItemScheduleMakeDuration').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleMakeDuration"); return false; });

	$('#txtDlgItemScheduleCargoExpectedDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleCargoExpectedDate"); return false; });
	$('#txtDlgItemScheduleCargoActualDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleCargoActualDate"); return false; });
	$('#txtDlgItemScheduleShipmentDuration').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleShipmentDuration"); return false; });

	$('#txtDlgItemScheduleFobPlanDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleFobPlanDate"); return false; });
	$('#txtDlgItemScheduleFobExpectedDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleFobExpectedDate"); return false; });
	$('#txtDlgItemScheduleFobActualDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleFobActualDate"); return false; });
	$('#txtDlgItemScheduleTransDuration').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleTransDuration"); return false; });

	$('#txtDlgItemScheduleOnsitePlanDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleOnsitePlanDate"); return false; });
	$('#txtDlgItemScheduleOnsiteExpectedDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleOnsiteExpectedDate"); return false; });
	$('#txtDlgItemScheduleOnsiteActualDate').change(function () { dlgItemScheduleDateChange("txtDlgItemScheduleOnsiteActualDate"); return false; });

	$('#btnDlgExcelUploadDownload').click(function () { btnDlgExcelUploadDownloadClick(); return false; });
	$('#btnDlgExcelUploadUpload').click(function () { btnDlgExcelUploadUploadClick(); return false; });
	$('#btnDlgExcelUploadFile').change(function () { btnDlgExcelUploadFileChange(event); return false; });
	$('#btnDlgExcelUploadSave').click(function () { btnDlgExcelUploadSaveClick(); return false; });

	$('#btnDlgMemoSave').click(function () { btnDlgMemoSaveClick(); return false; });

	$('#dlgItemSchedule').on('hidden.bs.modal', function () {
		if(fRow != null){
			mainGrid.Focus(fRow, "TRK_ITEM_NAME", null, null, 1);
			selectDlgItemScheduleRow = null;
			fRow = null;
		}
	})

	$('#btnInvoiceMng').click(function () { btnInvoiceMngClick(); return false; });


	initCode();
}



function btnDlgItemScheduleEditClick(){
	dlgItemScheduleAdminGrid.ActionAcceptEdit();

	var formData = new FormData();

	var file_obj = $("#dlgItemSchedule input[type=file]");
	for (var i = 0; i < file_obj.length; i++)
	{
		for (var j = 0; j < file_obj[i].files.length; j++)
		{
			var pattern_spc = /['",]/;
			if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())){
				alert($('#alertFileCheck').val());
				return false
			}


			formData.append($(file_obj[i]).attr("id") + "_" + i.toString() + j.toString(), file_obj[i].files[j]);
		}
	}



	formData.append("FILE_GRP_CD", selectDlgItemScheduleRow.FILE_GRP_CD);
	formData.append("TO_DAY", toDay);


	formData.append("TRK_ITEM_NAME", $('#txtDlgItemScheduleTrkItemName').val());
	formData.append("ATTRIBUTE10", $('#txtDlgItemScheduleAttribute10').val());

	formData.append("SEQUENCE_YN", selectDlgItemScheduleRow.SEQUENCE_YN);
	formData.append("ATTRIBUTE7", $('#txtDlgItemScheduleAttribute7').val());
	formData.append("ATTRIBUTE3", $('#txtDlgItemScheduleAttribute3').val());
	formData.append("PRIMAVERA_ID", $('#txtDlgItemSchedulePrimaveraId').val());
	formData.append("PAYMENT_MILESTONE", $('#selDlgItemSchedulePaymentMilestone').val());
	formData.append("OFFSHORE", $('#selDlgItemScheduleOnOfshore').val());
	formData.append("TRK_ITEM_SEQ", selectDlgItemScheduleRow.TRK_ITEM_SEQ);
	formData.append("PROJECT_NO", selectDlgItemScheduleRow.PROJECT_NO);

	formData.append("MPS_PLAN_DATE", $('#txtDlgItemScheduleMpsPlanDate').val());
	formData.append("MPS_EXPECTED_DATE", $('#txtDlgItemScheduleMpsExpectedDate').val());
	formData.append("MPS_ACTUAL_DATE", $('#txtDlgItemScheduleMpsActualDate').val());

	formData.append("TE_PLAN_DATE", $('#txtDlgItemScheduleTePlanDate').val());
	formData.append("TE_EXPECTED_DATE", $('#txtDlgItemScheduleTeExpectedDate').val());
	formData.append("TE_ACTUAL_DATE", $('#txtDlgItemScheduleTeActualDate').val());

	formData.append("PURCHASE_DURATION", $('#txtDlgItemSchedulePurchaseDuration').val());
	formData.append("PO_PLAN_DATE", $('#txtDlgItemSchedulePoPlanDate').val());
	formData.append("PO_EXPECTED_DATE", $('#txtDlgItemSchedulePoExpectedDate').val());
	formData.append("PO_ATCUAL_DATE", $('#txtDlgItemSchedulePoAtcualDate').val());
	formData.append("MAKE_DURATION", $('#txtDlgItemScheduleMakeDuration').val());
	formData.append("CARGO_PLAN_DATE", $('#txtDlgItemScheduleCargoPlanDate').val());
	formData.append("CARGO_EXPECTED_DATE", $('#txtDlgItemScheduleCargoExpectedDate').val());
	formData.append("CARGO_ACTUAL_DATE", $('#txtDlgItemScheduleCargoActualDate').val());
	formData.append("SHIPMENT_DURATION", $('#txtDlgItemScheduleShipmentDuration').val());
	formData.append("FOB_PLAN_DATE", $('#txtDlgItemScheduleFobPlanDate').val());
	formData.append("FOB_EXPECTED_DATE", $('#txtDlgItemScheduleFobExpectedDate').val());
	formData.append("FOB_ACTUAL_DATE", $('#txtDlgItemScheduleFobActualDate').val());
	formData.append("TRANS_DURATION", $('#txtDlgItemScheduleTransDuration').val());
	formData.append("ONSITE_PLAN_DATE", $('#txtDlgItemScheduleOnsitePlanDate').val());
	formData.append("ONSITE_EXPECTED_DATE", $('#txtDlgItemScheduleOnsiteExpectedDate').val());
	formData.append("ONSITE_ACTUAL_DATE", $('#txtDlgItemScheduleOnsiteActualDate').val());


	var changeObject = dlgItemScheduleAdminGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	var updateList = [];
	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = dlgItemScheduleAdminGrid.GetRowById(rowId);
		var authSchedule = row.AUTH_SCHEDULE1 == 1 ? "관리" : "조회";


		var oldUserJob = row.OLD_USER_JOB == null ? "" : row.OLD_USER_JOB;

		var updateRow = {"TRK_ITEM_SEQ" : row.TRK_ITEM_SEQ, "T_USER_AD" : row.USER_AD, "USER_NAME" : row.USER_NAME,
						 "USER_JOB" : row.USER_JOB, "AUTH_SCHEDULE" : authSchedule, "USER_DEPT_NAME" : row.USER_DEPT_NAME,
						 "USER_DEPT_CODE" : row.USER_DEPT_CODE, "OLD_USER_JOB" : oldUserJob};
		updateList.push(updateRow);
	}

	formData.append("updateAdminList", JSON.stringify(updateList));

	$.ajax({
		url: "/saveIdsmSetupDlgItemScheduleItemEdit.do",
		data: formData,
		processData: false,
		contentType: false,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				if(result.error == "-1") {
					alert_fail($('#alertSaveAlreadyItem').val());
				}
				else if(result.error == "-2") {
					alert_fail($('#alertSaveAlreadySequence').val());
				}
				else if(result.error == "-4") {
					alert_fail($('#alertFileCheckEx').val());
				}
				else if(result.error == "-5") {
					alert_fail($('#alertSaveFileInvErr').val());
				}
				else {
					alert_fail(result.error);
				}
			} else {
				if(result.FILE_GRP_CD != null && result.FILE_GRP_CD != "" && selectDlgItemScheduleRow.FILE_GRP_CD == null){
					selectDlgItemScheduleRow.FILE_GRP_CD = result.FILE_GRP_CD;
				}
				alert_success($('#alertSaveSuccess').val());
				btnSearchClick();
				searchDlgItemScheduleItemList();
				searchDlgItemScheduleFileList();
				searchDlgItemScheduleAdminList();
			}
		}
	});
}


function btnCreateItemAddClick(){
	adminGridType = "Create";
	setResetDlgItemScheduleAdminAddControls();
	openAdminAddModal();
}

function btnCreateItemDeleteClick() {

	var selectList = dlgCreateItemGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++){

		var row = selectList[i];
		if(row.Added != null && row.Added == 1){
			dlgCreateItemGrid.RemoveRow(row);
		}

	}
}


function btnCreateItemClick(){
	$('#dlgCreateItem').click();
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

	if(changeList.length == 0){
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
		//alert($('#alertSaveAlreadyInvErr').val());
		//return;
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

					if(dlgYn == "Y"){
						searchDlgItemScheduleItemList();
					}
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

	if (confirm($('#alertDelete').val())) {
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

						if(dlgYn == "Y"){
							searchDlgItemScheduleItemList();
						}

					}
				}
			});
		}
		else{
			alert_success($('#alertDeleteSuccess').val());
		}
	}


}

function btnDlgInvEditAddClick() {
	dlgInvGrid.ActionAcceptEdit();

	var changeObject = dlgInvGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;


	var insertList = [];
	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var gridRow = dlgInvGrid.GetRowById(rowId);

		if(gridRow.Fixed == null){
			var row = {"INVOICE_NUM" : gridRow.INVOICE_NUM};
			insertList.push(row);
		}
	}

	var list = JSON.stringify(insertList);

	$.ajax({
		url: "/getIdsmSetupDlgInvEditInvSeq.do",
		data: {"PROJECT_CODE" : selectDlgInvEditRow.PROJECT_NO, "list" : list},
		success: function (data, textStatus, jqXHR) {

			var INVOICE_NUM = data.results.INVOICE_NUM;
			var row = dlgInvGrid.AddRow(null,null,1,null,null);

			row.INVOICE_NUM = INVOICE_NUM
			dlgInvGrid.RefreshRow(row);
        }
    });


}

function gridSave(changeList){
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
							 "ATTRIBUTE7" : row.ATTRIBUTE7, "ATTRIBUTE8" : row.ATTRIBUTE8,
							 "ATTRIBUTE10" : row.ATTRIBUTE10, "TRK_ITEM_SEQ" : row.TRK_ITEM_SEQ, "CARGO_PROMISED_DATE" : formatDate(row.CARGO_PROMISED_DATE),
							 "SEL_INVOICE_NUM" : row.SEL_INVOICE_NUM, "MAKE_DURATION" : row.MAKE_DURATION,
							 "PROGRESS" : row.PROGRESS, "SHIPMENT_DURATION" : row.SHIPMENT_DURATION, "TRANS_DURATION" : row.TRANS_DURATION,
							 "PAYMENT_MILESTONE" : row.PAYMENT_MILESTONE, "TRK_ITEM_DEFAULT" : row.TRK_ITEM_DEFAULT,
							 "PM_AD" : row.PM_AD, "PM_NAME" : row.PM_NAME, "EM_AD" : row.EM_AD, "EM_NAME" : row.EM_NAME,
							 "BUYER_AD" : row.BUYER_AD, "BUYER_NAME" : row.BUYER_NAME, "QC_AD" : row.QC_AD, "QC_NAME" : row.QC_NAME,
							 "SM_AD" : row.SM_AD, "SM_NAME" : row.SM_NAME,
							 "MPS_PLAN_DATE" : formatDate(row.MPS_PLAN_DATE), "MPS_EXPECTED_DATE" : formatDate(row.MPS_EXPECTED_DATE), "MPS_ACTUAL_DATE" : formatDate(row.MPS_ACTUAL_DATE),

							 "TE_PLAN_DATE" : formatDate(row.TE_PLAN_DATE), "TE_EXPECTED_DATE" : formatDate(row.TE_EXPECTED_DATE), "TE_ACTUAL_DATE" : formatDate(row.TE_ACTUAL_DATE),

							 "PO_PLAN_DATE" : formatDate(row.PO_PLAN_DATE), "PO_EXPECTED_DATE" : formatDate(row.PO_EXPECTED_DATE), "PO_ATCUAL_DATE" : formatDate(row.PO_ATCUAL_DATE),
							 "CARGO_PLAN_DATE" : formatDate(row.CARGO_PLAN_DATE), "CARGO_EXPECTED_DATE" : formatDate(row.CARGO_EXPECTED_DATE), "CARGO_ACTUAL_DATE" : formatDate(row.CARGO_ACTUAL_DATE),
							 "FOB_PLAN_DATE" : formatDate(row.FOB_PLAN_DATE), "FOB_EXPECTED_DATE" : formatDate(row.FOB_EXPECTED_DATE), "FOB_ACTUAL_DATE" : formatDate(row.FOB_ACTUAL_DATE),
							 "ONSITE_PLAN_DATE" : formatDate(row.ONSITE_PLAN_DATE), "ONSITE_EXPECTED_DATE" : formatDate(row.ONSITE_EXPECTED_DATE), "ONSITE_ACTUAL_DATE" : formatDate(row.ONSITE_ACTUAL_DATE)};


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
					if(result.error == "-1") {
			          alert_fail($('#alertSaveAlreadyItem').val());
			        }
			        else if(result.error == "-2") {
			          alert_fail($('#alertSaveAlreadySequence').val());
			        }
			        else {
			        	alert_fail(result.error);
			        }
				} else {
					alert_success($('#alertSaveSuccess').val());
					btnSearchClick();
				}
			}
		});
}

function btnSaveClick(type) {

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
	if(type == "editCheck") {
		gridSave(changeList);
	}
	else {
		if (confirm($('#alertSave').val())) {
			gridSave(changeList);
		}
	}

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

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}
}

function initFileInput(obj_id) {


	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme					: "fas"
		, language				: fileLang
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
			  ,"KEY4" : $("#selSearchKey4").val(),"VALUE4" : $("#txtSearchValue4").val()
			  , "KEY3" : $("#selSearchKey3").val()
			  ,"VALUE2" : $("#txtSearchValue2").val(), "VALUE3" : $("#txtSearchValue3").val()
			  , "KEY6" : $("#selSearchKey6").val()
			  ,"VALUE5" : $("#txtSearchValue5").val(), "VALUE6" : $("#txtSearchValue6").val(), "KEY2" : $("#selSearchKey2").val()
			  ,"KEY5" : $("#selSearchKey5").val(), "OFFSHORE" : $("#selOnoOfshore").val(), "PROJECT_NO" : $("#txtProjectCode").val()
			  ,"ISSUE_CHECK" : issue_check
		      },
		success: function (data, textStatus, jqXHR) {

			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.Reload();

			chkL1 = true;
			chkL2 = true;
			chkL3 = true;
        }
    });

}

function dlgItemScheduleItemGridSearchReload(grid) {
	var list = grid.Rows;

	for (var key in list) {

		var gridRow = list[key];

		if(gridRow.Fixed == null){
			if(gridRow.TRK_ITEM_SEQ == selectDlgItemScheduleRow.TRK_ITEM_SEQ){
				gridRow.TRK_ITEM_NAMEBackground = "#ffe696";
				grid.RefreshRow(gridRow);

				setDlgItemScheduleControls(gridRow);
			}
		}
	}

	$('#btnDlgItemScheduleEdit').show();
}

function setFocus(e){

	if(e){
		if(fRow != null){
			mainGrid.Focus(fRow, "TRK_ITEM_NAME", null, null, 1);
			if($("#dlgItemSchedule").is(":visible")){
				$('#dlgItemSchedule').click();
			}

		}

	}

}

var fRow = null;
function mainGridSearchReload(grid) {
	var list = grid.Rows;
	var cnt = 1;
	for (var key in list) {


		var gridRow = list[key];

		if(selectDlgItemScheduleRow != null){
			if(gridRow.TRK_ITEM_SEQ == selectDlgItemScheduleRow.TRK_ITEM_SEQ){
				fRow = gridRow;
			}
		}

		if(gridRow.Fixed == null){

			if(gridRow.PL_CNT > 0) {
				gridRow.ATTRIBUTE10CanEdit = 0;
			}
			else {
				gridRow.ATTRIBUTE10CanEdit = 1;
			}

			gridRow.NO = cnt;
			setGridDateCheck(grid, gridRow);
			cnt += 1;
		}
	}

	return true;
}


function setGridDateCheck(grid, gridRow) {
	var due_date = new Date(toDay).getTime();
	if(((gridRow.MPS_ACTUAL_DATE == null || gridRow.MPS_ACTUAL_DATE == "") && gridRow.MPS_PLAN_DATE < gridRow.MPS_EXPECTED_DATE )
		|| ((gridRow.MPS_ACTUAL_DATE == null || gridRow.MPS_ACTUAL_DATE == "") && (gridRow.MPS_EXPECTED_DATE != null && gridRow.MPS_EXPECTED_DATE != "") && gridRow.MPS_EXPECTED_DATE < due_date)){
		gridRow.MPS_PLAN_DATEBackground = "#f59ea7";
		gridRow.MPS_EXPECTED_DATEBackground = "#f59ea7";
		gridRow.MPS_ACTUAL_DATEBackground = "#f59ea7";
	}
	else{
		gridRow.MPS_PLAN_DATEBackground = "";
		gridRow.MPS_EXPECTED_DATEBackground = "";
		gridRow.MPS_ACTUAL_DATEBackground = "";
	}

	if( (gridRow.PO_ATCUAL_DATE == null || gridRow.PO_ATCUAL_DATE == "") && (gridRow.PO_EXPECTED_DATE != null && gridRow.PO_EXPECTED_DATE != "") && gridRow.PO_EXPECTED_DATE < due_date){
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

	if((gridRow.CARGO_ACTUAL_DATE == null || gridRow.CARGO_ACTUAL_DATE == "") && (gridRow.CARGO_EXPECTED_DATE != null && gridRow.CARGO_EXPECTED_DATE != "") && gridRow.CARGO_EXPECTED_DATE < due_date){
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

	if( (gridRow.FOB_ACTUAL_DATE == null || gridRow.FOB_ACTUAL_DATE == "") && (gridRow.FOB_EXPECTED_DATE != null && gridRow.FOB_EXPECTED_DATE != "") && gridRow.FOB_EXPECTED_DATE < due_date){
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

	if((gridRow.ONSITE_ACTUAL_DATE == null || gridRow.ONSITE_ACTUAL_DATE == "") && (gridRow.ONSITE_EXPECTED_DATE != null && gridRow.ONSITE_EXPECTED_DATE != "") && gridRow.ONSITE_EXPECTED_DATE < due_date){
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

	if(gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0){
		gridRow.P_LIST = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
	}

	//gridRow.REMARK = '/resources/ext/fontawesome-free/svgs/solid/pencil-alt.svg';

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

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	var gridCode = getGridCode();

	var mainGridCol = {
		"Cfg": {
			"id"				: "idsmSetupMainGrid"
			, "CfgId"			: "idsmSetupMainGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "13"
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
			, "SelectingSingle" : "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "MainCol"			: "TRK_ITEM_NAME"
			, "SafeCSS"			: "1"
			, "Sorting"			: "1"
			, "Code"			: gridCode
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
		}
		, "LeftCols": [
			{
				"Name"		: "NO"
				, "Width"	: "60"
				, "Type"	: "Int"
				, "Spanned"	: "1"
				, "Class"	: "gridBorderText gridTextColor gridCenterText"
				, "CanMove"	: "0"
				, "CanEdit"	: "0"
			}
			, {
				"Name"			: "TRK_ITEM_NAME"
				, "Type"		: "Text"
				, "Width"		: "300"
				, "Spanned"		: "1"
				, "OnClickCell"	: "openModal(Grid,Row,Col);"
				, "Class"		: "gridLinkText"
				, "CanEdit"		: "0"
			}
		]
		, "Cols" : [
			{	"Name": "ATTRIBUTE3"			, "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText"																																							}	/* Vendor				*/
			, { "Name": "ATTRIBUTE7"			, "Width": "100", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText"													, "CanMove" : "0"																						}	/* 선적국가				*/
			, { "Name": "ATTRIBUTE10"			, "Width": "90"	, "Type": "Float", "Spanned":"1", "Class" : "gridBorderText", "CanEmpty" : "1"													, "CanMove" : "0"																						}	/* 항차No					*/
			, { "Name": "ATTRIBUTE9"			, "Width": "100"	, "Type": "Float", "Spanned":"1", "Class" : "gridBorderText" , "CanEmpty" : "1"							,"CanEdit": "0"						, "CanMove" : "0"																						}	/* 항차No					*/
			, { "Name": "SEL_INVOICE_NUM"		, "Width": "150", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openInvModal( Grid, Row,Col )"						}	/* Invoice No			*/
			, { "Name": "P_LIST"		        , "Width": "80"	, "Type": "Icon", "Spanned":"1"																				, "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )"	, "IconSize" : "2"	}	/* Invoice No			*/
			, { "Name": "ATTRIBUTE6"			, "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText "									, "CanMove" : "0"																						}	/* 공급 Scope				*/
			, { "Name": "OFFSHORE"				, "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridBorderColor gridCenterText"									, "CanMove" : "0"																						}	/* on/offshore				*/
			, { "Name": "MPS_PLAN_DATE"			, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": ""	}	/* MPS(PR) Plan(L3)			*/
			, { "Name": "MPS_EXPECTED_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* MPS(PR) Expected			*/
			, { "Name": "MPS_ACTUAL_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor"	, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* MPS(PR) Actual			*/

			, { "Name": "TE_PLAN_DATE"			, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": ""	}	/* MPS(PR) Plan(L3)			*/
			, { "Name": "TE_EXPECTED_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* MPS(PR) Expected			*/
			, { "Name": "TE_ACTUAL_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor"	, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* MPS(PR) Actual			*/

			, { "Name": "PO_PLAN_DATE"			, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* PO Plan(L3)				*/
			, { "Name": "PO_EXPECTED_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* PO Expected				*/
			, { "Name": "PO_ATCUAL_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor"	, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* PO Actual				*/

			, { "Name": "CARGO_PLAN_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": ""	}	/* Cargo Ready Plan			*/
			, { "Name": "CARGO_EXPECTED_DATE"	, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* Cargo Ready Expected		*/
			, { "Name": "CARGO_ACTUAL_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor"	, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* Cargo Ready Actual		*/

			, { "Name": "FOB_PLAN_DATE"			, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* FOB/지정장소 상차도 Plan(L3)	*/
			, { "Name": "FOB_EXPECTED_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* FOB/지정장소 상차도 Expected	*/
			, { "Name": "FOB_ACTUAL_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor"	, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* FOB/지정장소 상차도 Actual	*/

			, { "Name": "ONSITE_PLAN_DATE"		, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* On Site Plan(L3)			*/
			, { "Name": "ONSITE_EXPECTED_DATE"	, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* On Site Expected			*/
			, { "Name": "ONSITE_ACTUAL_DATE"	, "Width": "90"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText gridBorderColor"	, "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" 	}	/* On Site Actual			*/

			//, { "Name": "CREATE_USER1"			, "Width": "100", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											}	/* Header No.		*/
			//, { "Name": "CREATE_USER2"			, "Width": "100", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											}	/* Line No.			*/
			//, { "Name": "CREATE_USER3"			, "Width": "100", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											}	/* Supplier			*/

			, { "Name": "PAYMENT_MILESTONE"		, "Width": "100", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											}	/* Payment Milestone*/
			, { "Name": "TASK_NUMBER"			, "Width": "100", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"	, "Visible" :"0"								, "CanMove" : "0", "CanEdit": "0"											}	/* Activity			*/
			, { "Name": "PRIMAVERA_ID"			, "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											}	/* L3 ID			*/
			, { "Name": "REMARK"		        , "Width": "80"	, "Type": "Text", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/pencil-alt.svg", "IconAlign" : "Right", "Class" : "gridBorderText gridTextColor"																				, "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openMemoModal( Grid, Row,Col )"	, "IconSize" : "2"	}
			, { "Name": "PM_AD"				, "Width": "150"	, "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											, "Align": "center"}	/* PM 담당자		*/
			, { "Name": "EM_AD"				, "Width": "150"	, "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											, "Align": "center"}	/* 설계 담당자		*/
			, { "Name": "BUYER_AD"			, "Width": "150"	, "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											, "Align": "center"}	/* 구매 담당자		*/
			, { "Name": "SM_AD"				, "Width": "150"	, "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											, "Align": "center"}	/* 공정 담당자		*/
			, { "Name": "QC_AD"				, "Width": "150"	, "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0", "CanEdit": "0"											, "Align": "center"}	/* 품질 담당자		*/
		], "Head" : [
			{
				"Kind"					: "Header"
				, "Class"				: "gridCenterText"
				, "id"					: "Header"
				, "Spanned"				: "1"
				, "PanelRowSpan"		: "2"
				, "NO"		            : "No."					, "NORowSpan"				: "2"
				, "TRK_ITEM_NAME"		: $('#gridColItem').val()			, "TRK_ITEM_NAMERowSpan"	: "2"
				, "ATTRIBUTE3"			: $('#gridColVendor').val()				, "ATTRIBUTE3RowSpan"		: "2"
				, "ATTRIBUTE7"			: $('#gridColShippingCountry').val()			, "ATTRIBUTE7RowSpan"		: "2"
				, "ATTRIBUTE10"			: $('#gridColShippingOrder').val()			, "ATTRIBUTE10RowSpan"		: "2"
				, "ATTRIBUTE9"			: "Sequence"			, "ATTRIBUTE9RowSpan"		: "2"
				, "SEL_INVOICE_NUM"		: $('#gridColInvoiceNo').val()		, "SEL_INVOICE_NUMRowSpan"	: "2"
				, "P_LIST"		        : $('#gridColPl').val()			    , "P_LISTRowSpan"			: "2"
				, "ATTRIBUTE6"			: $('#gridColSupplyScope').val()			, "ATTRIBUTE6RowSpan"		: "2"
				, "OFFSHORE"			: "on/offshore"			, "OFFSHORERowSpan"		: "2"
				, "MPS_PLAN_DATE"		: $('#gridColMps').val()				, "MPS_PLAN_DATESpan"		: "3"
				, "MPS_EXPECTED_DATE"	: ""
				, "MPS_ACTUAL_DATE"		: ""

				, "TE_PLAN_DATE"		: $('#gridColTe').val()				, "TE_PLAN_DATESpan"		: "3"
				, "TE_EXPECTED_DATE"	: ""
				, "TE_ACTUAL_DATE"		: ""

				, "PO_PLAN_DATE"		: $('#gridColPo').val()				, "PO_PLAN_DATESpan"		: "3"
				, "PO_EXPECTED_DATE"	: ""
				, "PO_ATCUAL_DATE"		: ""
				, "CARGO_PLAN_DATE"		: $('#gridColCargoReady').val()			, "CARGO_PLAN_DATESpan"		: "3"
				, "CARGO_EXPECTED_DATE"	: ""
				, "CARGO_ACTUAL_DATE"	: ""
				, "FOB_PLAN_DATE"		: $('#gridColFob').val()		, "FOB_PLAN_DATESpan"		: "3"
				, "FOB_EXPECTED_DATE"	: ""
				, "FOB_ACTUAL_DATE"		: ""
				, "ONSITE_PLAN_DATE"	: $('#gridColOnSite').val()				, "ONSITE_PLAN_DATESpan"	: "3"
				, "ONSITE_EXPECTED_DATE": ""
				, "ONSITE_ACTUAL_DATE"	: ""
				//, "CREATE_USER1"		: $('#gridColPo').val()					, "CREATE_USER1Span"		: "3"
				//, "CREATE_USER2"		: ""
				//, "CREATE_USER3"		: ""
				, "PAYMENT_MILESTONE"	: "PO No."	, "PAYMENT_MILESTONERowSpan": "2"
				, "TASK_NUMBER"			: $('#gridColActivity').val()			, "TASK_NUMBERRowSpan"		: "2"
				, "PRIMAVERA_ID"		: $('#gridColL3Id').val()				, "PRIMAVERA_IDRowSpan"		: "2"
				, "REMARK"		: "Memo"				, "REMARKRowSpan"		: "2"
				, "PM_AD"				: $('#gridColPerson').val()				, "PM_ADSpan"				: "5"
				, "EM_AD"				: ""
				, "BUYER_AD"			: ""
				, "SM_AD"				: ""
				, "QC_AD"				: ""
			}
			, {
				"Kind"					: "Header"
				, "Class"				: "gridCenterText"
				, "Spanned"				: "1"
				, "NO			"		: "No."
				, "TRK_ITEM_NAME"		: $('#gridColItem').val()
				, "ATTRIBUTE3"			: $('#gridColVendor').val()
				, "ATTRIBUTE7"			: $('#gridColShippingCountry').val()
				, "ATTRIBUTE10"			: $('#gridColShippingOrder').val()
				, "ATTRIBUTE9"			: "Sequence"
				, "SEL_INVOICE_NUM"		: $('#gridColInvoiceNo').val()
				, "P_LIST"		        : $('#gridColPl').val()
				, "ATTRIBUTE6"			: $('#gridColSupplyScope').val()
				, "OFFSHORE"			: "on/offshore"
				, "MPS_PLAN_DATE"		: $('#gridColPlanL3').val()
				, "MPS_EXPECTED_DATE"	: $('#gridColExpected').val()
				, "MPS_ACTUAL_DATE"		: $('#gridColActual').val()

				, "TE_PLAN_DATE"		: $('#gridColPlan').val()
				, "TE_EXPECTED_DATE"	: $('#gridColExpected').val()
				, "TE_ACTUAL_DATE"		: $('#gridColActual').val()

				, "PO_PLAN_DATE"		: $('#gridColPlanL3').val()
				, "PO_EXPECTED_DATE"	: $('#gridColExpected').val()
				, "PO_ATCUAL_DATE"		: $('#gridColActual').val()
				, "CARGO_PLAN_DATE"		: $('#gridColPlan').val()
				, "CARGO_EXPECTED_DATE"	: $('#gridColExpected').val()
				, "CARGO_ACTUAL_DATE"	: $('#gridColActual').val()
				, "FOB_PLAN_DATE"		: $('#gridColPlanL3').val()
				, "FOB_EXPECTED_DATE"	: $('#gridColExpected').val()
				, "FOB_ACTUAL_DATE"		: $('#gridColActual').val()
				, "ATD_DATE"			: $('#gridColAtdEtd').val()
				, "POD_DATE"			: $('#gridColPod').val()
				, "ONSITE_PLAN_DATE"	: $('#gridColPlanL3').val()
				, "ONSITE_EXPECTED_DATE": $('#gridColExpected').val()
				, "ONSITE_ACTUAL_DATE"	: $('#gridColActual').val()
				//, "CREATE_USER1"		: $('#gridColHeaderNo').val()
				//, "CREATE_USER2"		: $('#gridColLineNo').val()
				//, "CREATE_USER3"		: $('#gridColSupplier').val()
				, "PAYMENT_MILESTONE"	: "PO No."
				, "TASK_NUMBER"			: $('#gridColActivity').val()
				, "PRIMAVERA_ID"		: $('#gridColL3Id').val()
				, "REMARK"		: "Memo"
				, "PM_AD"				: $('#gridColPm').val()
				, "EM_AD"				: $('#gridColEm').val()
				, "BUYER_AD"			: $('#gridColBuyer').val()
				, "SM_AD"				: $('#gridColSm').val()
				, "QC_AD"				: $('#gridColQc').val()
			}
		]
	};

	var dlgInvGridCol = {"Cfg" : { "id" : "idsmDlgInvGrid", "CfgId" : "idsmDlgInvGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "4", "CacheTimeout" : "100", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Low", "Scale" : "90%"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "200","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
						, "Code" : gridCode
						,"CopyCols" : "0"
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

	dlgCreateItemGridCol = {"Cfg" : { "id" : "idsmDlgCreateItemGrid", "CfgId" : "idsmDlgCreateItemGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "Style" : "Material", "Size" : "Low", "Scale" : "90%"
		 									,"ConstWidth" : "100%", "MinTagHeight": "180","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
											,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
											, "Code" : gridCode
											,"SafeCSS" : "1", "Sorting" : "0"}
									,"Panel" : {"Visible" : "1", "Spanned" : "1"}
									,"Toolbar" : {"Visible" : "0"}
									,"Cols" : [{	"Name": "USER_JOB", "Width": "150"	, "Type": "Enum", "Enum" : gridUserJobCode.label, "EnumKeys" : gridUserJobCode.code ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "1" }
												, {	"Name": "AUTH_SCHEDULE1", "Width": "70"	, "Type": "Bool", "BoolIcon": "4", "Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0" }
												, {	"Name": "AUTH_SCHEDULE2", "Width": "70"	, "Type": "Bool", "BoolIcon": "4", "Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0" }
												, {	"Name": "USER_NAME", "Width": "150", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
												, {	"Name": "USER_DEPT_NAME", "Width": "200", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
									]
									, "Head" : [
										{
											"Kind"						: "Header"
											, "Class"					: "gridCenterText"
											, "id"						: "Header"
											, "Spanned"					: "1"
											, "PanelRowSpan"			: "2"
											, "USER_JOB"				: $('#gridColUserJob').val()
											, "USER_JOBRowSpan"			: "2"
											, "AUTH_SCHEDULE1"			: $('#gridColRrSchedule').val()
											, "AUTH_SCHEDULE1Span"		: "2"
											, "AUTH_SCHEDULE2"			: ""
											, "USER_NAME"				: $('#gridColUserName').val()
											, "USER_NAMERowSpan"		: "2"
											, "USER_DEPT_NAME"			: $('#gridColUserDeptName').val()
											, "USER_DEPT_NAMERowSpan"	: "2"
										}
										, {
											"Kind"				: "Header"
											, "Class" 			: "gridCenterText"
											,"Spanned"			: "1"
											, "USER_JOB"		: $('#gridColUserJob').val()
											, "AUTH_SCHEDULE1"	: $('#gridColMng').val()
											, "AUTH_SCHEDULE2"	: $('#gridColSearch').val()
											, "USER_NAME"		: $('#gridColUserName').val()
											, "USER_DEPT_NAME"	: $('#gridColUserDeptName').val()
										}
									]
								};



	dlgItemScheduleItemGridCol = {"Cfg" : { "id" : "idsmDlgItemScheduleItemGrid", "CfgId" : "idsmDlgItemScheduleItemGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Low", "Scale" : "90%"
		 									,"ConstWidth" : "100%", "MinTagHeight": "116","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
											,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
											, "Code" : gridCode
											,"CopyCols" : "0"
											,"SafeCSS" : "1", "Sorting" : "0", "MainCol" : "TRK_ITEM_NAME"}
									,"Panel" : {"Visible" : "0"}
									,"Toolbar" : {"Visible" : "0"}
									, "Cols" : [
										{	"Name"	: "TRK_ITEM_NAME", "Width": "356", "Type": "Text" ,"Spanned" : "1" ,"Class" : "gridLinkText", "CanMove" : "0", "CanEdit": "0" ,"OnClickCell"	: "openModal(Grid,Row,Col);"}
										, {	"Name"	: "ISSUE_FLAG", "Width": "120", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0"	}
									]
									, "Header" : {
										"TRK_ITEM_NAME"	: "Item" , "Class" : "gridCenterText"
										, "ISSUE_FLAG"	: $('#gridColScheduleIssue').val()
									}
								};

	dlgItemScheduleAdminGridCol = {"Cfg" : { "id" : "idsmDlgItemScheduleAdminGrid", "CfgId" : "idsmDlgItemScheduleAdminGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Low", "Scale" : "90%"
		 									,"ConstWidth" : "100%", "MinTagHeight": "143","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
											,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
											, "Code" : gridCode
											,"CopyCols" : "0"
											,"SafeCSS" : "1", "Sorting" : "0"}
									,"Panel" : {"Visible" : "1", "Spanned" : "1"}
									,"Toolbar" : {"Visible" : "0"}
									,"Cols" : [{	"Name": "USER_JOB", "Width": "150"	, "Type": "Enum", "Enum" : gridUserJobCode.label, "EnumKeys" : gridUserJobCode.code ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "1" }
												, {	"Name": "AUTH_SCHEDULE1", "Width": "70"	, "Type": "Bool", "BoolIcon": "4", "Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0" }
												, {	"Name": "AUTH_SCHEDULE2", "Width": "70"	, "Type": "Bool", "BoolIcon": "4", "Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0" }
												, {	"Name": "USER_NAME", "Width": "150", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
												, {	"Name": "USER_DEPT_NAME", "Width": "200", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
									]
									, "Head" : [
										{
											"Kind"			: "Header", "Class" : "gridCenterText"
											, "id"			: "Header"
											, "Spanned"		: "1"
											, "PanelRowSpan": "2"
											, "USER_JOB"			: $('#gridColUserJob').val()
											, "USER_JOBRowSpan"	: "2"
											, "AUTH_SCHEDULE1"			: $('#gridColRrSchedule').val()
											, "AUTH_SCHEDULE1Span"		: "2"
											, "AUTH_SCHEDULE2"			: ""
											, "USER_NAME"			: $('#gridColUserName').val()
											, "USER_NAMERowSpan"	: "2"
											, "USER_DEPT_NAME"			: $('#gridColUserDeptName').val()
											, "USER_DEPT_NAMERowSpan"	: "2"
										}
										, {
											"Kind"		: "Header", "Class" : "gridCenterText"
											,"Spanned"	: "1"
											, "USER_JOB"		: $('#gridColUserJob').val()
											, "AUTH_SCHEDULE1"		: $('#gridColMng').val()
											, "AUTH_SCHEDULE2"		: $('#gridColSearch').val()
											, "USER_NAME"		: $('#gridColUserName').val()
											, "USER_DEPT_NAME"		: $('#gridColUserDeptName').val()
										}
									]
								};

	dlgExcelDownLoadGridCol = {"Cfg" : { "id" : "idsmDlgExcelDownLoadGrid", "CfgId" : "idsmDlgExcelDownLoadGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "2", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Low", "Scale" : "90%"
		 									,"ConstWidth" : "100%", "MinTagHeight": "500","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
											,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
											, "Code" : gridCode
											,"CopyCols" : "0"
											,"SafeCSS" : "1", "Sorting" : "0"}
									,"Panel" : {"Visible" : "0", "Spanned" : "1"}
									,"Toolbar" : {"Visible" : "0"}
									,"Cols" : [{"Name": "ATTRIBUTE8", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PROJECT_NO", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TASK_NUMBER", "Width": "150", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PRIMAVERA_ID", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME1", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME2", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME3", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME4", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "ATTRIBUTE3", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE7", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE10", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE9", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "INVOICE_NUM1", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "INVOICE_NUM2", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "INVOICE_NUM3", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE6", "Width": "150", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "OFFSHORE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "MPS_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "MPS_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "MPS_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "TE_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TE_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TE_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "PURCHASE_DURATION", "Width": "60", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PO_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PO_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PO_ATCUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "MAKE_DURATION", "Width": "60", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "CARGO_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "CARGO_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "CARGO_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "SHIPMENT_DURATION", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "FOB_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "FOB_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "FOB_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "TRANS_DURATION", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ONSITE_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ONSITE_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ONSITE_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "PAYMENT_MILESTONE", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "REMARK", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PM_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "EM_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "BUYER_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "SM_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "QC_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

									]
									, "Head" : [
										{
											"Kind"			: "Header", "Class" : "gridCenterText"
											, "id"			: "Header"
											, "Spanned"		: "1"
											, "PanelRowSpan": "2"
											, "ATTRIBUTE8"			: $('#gridColStdPjt').val()
											, "ATTRIBUTE8RowSpan"	: "2"
											, "PROJECT_NO"			: $('#gridColPjt').val()
											, "PROJECT_NORowSpan"	: "2"
											, "TASK_NUMBER"			: $('#gridColTaskNo').val()
											, "TASK_NUMBERRowSpan"	: "2"
											, "PRIMAVERA_ID"		: $('#gridColL3Id').val()
											, "PRIMAVERA_IDRowSpan"	: "2"
											, "TRK_ITEM_NAME1"		: $('#gridColItem1').val()
											, "TRK_ITEM_NAME1RowSpan"	: "2"
											, "TRK_ITEM_NAME2"		: $('#gridColItem2').val()
											, "TRK_ITEM_NAME2RowSpan"	: "2"
											, "TRK_ITEM_NAME3"		: $('#gridColItem3').val()
											, "TRK_ITEM_NAME3RowSpan"	: "2"
											, "TRK_ITEM_NAME4"		: $('#gridColItem4').val()
											, "TRK_ITEM_NAME4RowSpan"	: "2"
											, "ATTRIBUTE3"		   : $('#gridColVendor').val()
											, "ATTRIBUTE3RowSpan"	: "2"
											, "ATTRIBUTE7"		   : $('#gridColCountry').val()
											, "ATTRIBUTE7RowSpan"	: "2"
											, "ATTRIBUTE10"		   : $('#gridColPackingListNo').val()
											, "ATTRIBUTE10RowSpan"	: "2"
											, "ATTRIBUTE9"		   : "Sequence"
											, "ATTRIBUTE9RowSpan"	: "2"

											, "INVOICE_NUM1"		   : $('#gridColInvoiceNo1').val()
											, "INVOICE_NUM1RowSpan"	: "2"
											, "INVOICE_NUM2"		   : $('#gridColInvoiceNo2').val()
											, "INVOICE_NUM2RowSpan"	: "2"
											, "INVOICE_NUM3"		   : $('#gridColInvoiceNo3').val()
											, "INVOICE_NUM3RowSpan"	: "2"
											, "ATTRIBUTE6"		   : $('#gridColSupplyScope').val()
											, "ATTRIBUTE6RowSpan"	: "2"
											, "OFFSHORE"		   : $('#gridColOnOffShore').val()
											, "OFFSHORERowSpan"	: "2"
											, "MPS_PLAN_DATE"			: $('#gridColMps').val()
											, "MPS_PLAN_DATESpan"		: "3"
											, "MPS_EXPECTED_DATE"		: ""
											, "MPS_ACTUAL_DATE"			: ""

											, "TE_PLAN_DATE"			: $('#gridColTe').val()
											, "TE_PLAN_DATESpan"		: "3"
											, "TE_EXPECTED_DATE"		: ""
											, "TE_ACTUAL_DATE"			: ""

											, "PURCHASE_DURATION"		   : $('#gridColPurchaseDuration').val()
											, "PURCHASE_DURATIONRowSpan"	: "2"
											, "PO_PLAN_DATE"			: $('#gridColPo').val()
											, "PO_PLAN_DATESpan"		: "3"
											, "PO_EXPECTED_DATE"		: ""
											, "PO_ATCUAL_DATE"			: ""
											, "MAKE_DURATION"		   : $('#gridColMakeDuration').val()
											, "MAKE_DURATIONRowSpan"	: "2"
											, "CARGO_PLAN_DATE"			: $('#gridColCargoReady').val()
											, "CARGO_PLAN_DATESpan"		: "3"
											, "CARGO_EXPECTED_DATE"		: ""
											, "CARGO_ACTUAL_DATE"		: ""
											, "SHIPMENT_DURATION"		   : $('#gridColShipmentDuration').val()
											, "SHIPMENT_DURATIONRowSpan"  : "2"
											, "FOB_PLAN_DATE"			: $('#gridColFob').val()
											, "FOB_PLAN_DATESpan"		: "3"
											, "FOB_EXPECTED_DATE"		: ""
											, "FOB_ACTUAL_DATE"		    : ""
											, "TRANS_DURATION"		   : $('#gridColTransDuration').val()
											, "TRANS_DURATIONRowSpan"  : "2"
											, "ONSITE_PLAN_DATE"		: $('#gridColOnSite').val()
											, "ONSITE_PLAN_DATESpan"		: "3"
											, "ONSITE_EXPECTED_DATE"		: ""
											, "ONSITE_ACTUAL_DATE"		    : ""
											, "PAYMENT_MILESTONE"		   : $('#gridColPaymentMilestone').val()
											, "PAYMENT_MILESTONERowSpan"  : "2"
											, "REMARK"		   : "Memo", "REMARKRowSpan"  : "2"

											, "PM_AD"		: $('#gridColPerson').val()
											, "PM_ADSpan"		: "5"
											, "EM_AD"		: ""
											, "BUYER_AD"		    : ""
											, "SM_AD"		    : ""
											, "QC_AD"		    : ""
										}
										, {
											"Kind"		: "Header", "Class" : "gridCenterText"
											,"Spanned"	: "1"
											, "ATTRIBUTE8"			: $('#gridColStdPjt').val()
											, "PROJECT_NO"			: $('#gridColPjt').val()
											, "TASK_NUMBER"			: $('#gridColTaskNo').val()
											, "PRIMAVERA_ID"		: $('#gridColL3Id').val()
											, "TRK_ITEM_NAME1"		: $('#gridColItem1').val()
											, "TRK_ITEM_NAME2"		: $('#gridColItem2').val()
											, "TRK_ITEM_NAME3"		: $('#gridColItem3').val()
											, "TRK_ITEM_NAME4"		: $('#gridColItem4').val()
											, "ATTRIBUTE3"		   : $('#gridColVendor').val()
											, "ATTRIBUTE7"		   : $('#gridColCountry').val()
											, "ATTRIBUTE10"		   : $('#gridColPackingListNo').val()
											, "ATTRIBUTE9"		   : "Sequence"

											, "INVOICE_NUM1"		   : $('#gridColInvoiceNo1').val()
											, "INVOICE_NUM2"		   : $('#gridColInvoiceNo2').val()
											, "INVOICE_NUM3"		   : $('#gridColInvoiceNo3').val()
											, "ATTRIBUTE6"		   : $('#gridColSupplyScope').val()
											, "OFFSHORE"		   : $('#gridColOnOffShore').val()
											, "MPS_PLAN_DATE"			: $('#gridColPlanL3').val()
											, "MPS_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "MPS_ACTUAL_DATE"			: $('#gridColActual').val()

											, "TE_PLAN_DATE"			: $('#gridColPlan').val()
											, "TE_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "TE_ACTUAL_DATE"			: $('#gridColActual').val()

											, "PURCHASE_DURATION"		   : $('#gridColPurchaseDuration').val()
											, "PO_PLAN_DATE"			: $('#gridColPlanL3').val()
											, "PO_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "PO_ATCUAL_DATE"			: $('#gridColActual').val()
											, "MAKE_DURATION"		   : $('#gridColMakeDuration').val()
											, "CARGO_PLAN_DATE"			: $('#gridColPlan').val()
											, "CARGO_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "CARGO_ACTUAL_DATE"		: $('#gridColActual').val()
											, "SHIPMENT_DURATION"		   : $('#gridColShipmentDuration').val()
											, "FOB_PLAN_DATE"			: $('#gridColPlanL3').val()
											, "FOB_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "FOB_ACTUAL_DATE"		    : $('#gridColActual').val()
											, "TRANS_DURATION"		   : $('#gridColTransDuration').val()
											, "ONSITE_PLAN_DATE"		: $('#gridColPlanL3').val()
											, "ONSITE_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "ONSITE_ACTUAL_DATE"		    : $('#gridColActual').val()
											, "PAYMENT_MILESTONE"		   : $('#gridColPaymentMilestone').val()
											, "REMARK"		   : "Memo"
											, "PM_AD"		: $('#gridColPmAd').val()
											, "EM_AD"		: $('#gridColEmAd').val()
											, "BUYER_AD"		    : $('#gridColBuyerAd').val()
											, "SM_AD"		    : $('#gridColSmAd').val()
											, "QC_AD"		    : $('#gridColQcAd').val()
										}
									]
								};


	dlgExcelUpLoadGridCol = {"Cfg" : { "id" : "idsmDlgExcelUpLoadGrid", "CfgId" : "idsmDlgExcelUpLoadGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Low", "Scale" : "90%"
		 									,"ConstWidth" : "100%", "MinTagHeight": "500","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
											,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0"
											, "Code" : gridCode
											,"CopyCols" : "0"
											,"SafeCSS" : "1", "Sorting" : "0", "ImportRows" : "1" , "ImportAdd" : "2"}
									,"Panel" : {"Visible" : "0", "Spanned" : "1"}
									,"Toolbar" : {"Visible" : "0"}
									,"Cols" : [{"Name": "ATTRIBUTE8", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PROJECT_NO", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TASK_NUMBER", "Width": "150", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PRIMAVERA_ID", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME1", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME2", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME3", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TRK_ITEM_NAME4", "Width": "300", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "ATTRIBUTE3", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE7", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE10", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE9", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "INVOICE_NUM1", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "INVOICE_NUM2", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "INVOICE_NUM3", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ATTRIBUTE6", "Width": "150", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "OFFSHORE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "MPS_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "MPS_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "MPS_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "TE_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TE_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "TE_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "PURCHASE_DURATION", "Width": "60", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PO_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PO_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PO_ATCUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "MAKE_DURATION", "Width": "60", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "CARGO_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "1" },
											   {"Name": "CARGO_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "1" },
											   {"Name": "CARGO_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "1" },

											   {"Name": "SHIPMENT_DURATION", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "FOB_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "FOB_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "FOB_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "TRANS_DURATION", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ONSITE_PLAN_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ONSITE_EXPECTED_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "ONSITE_ACTUAL_DATE", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

											   {"Name": "PAYMENT_MILESTONE", "Width": "80", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "REMARK", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "PM_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "EM_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "BUYER_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "SM_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },
											   {"Name": "QC_AD", "Width": "100", "Type": "Text" ,"Spanned" : "1", "Class" : "gridBorderText", "CanMove" : "0", "CanEdit": "0" },

									]
									, "Head" : [
										{
											"Kind"			: "Header", "Class" : "gridCenterText"
											, "id"			: "Header"
											, "Spanned"		: "1"
											, "PanelRowSpan": "2"
											, "ATTRIBUTE8"			: $('#gridColStdPjt').val()
											, "ATTRIBUTE8RowSpan"	: "2"
											, "PROJECT_NO"			: $('#gridColPjt').val()
											, "PROJECT_NORowSpan"	: "2"
											, "TASK_NUMBER"			: $('#gridColTaskNo').val()
											, "TASK_NUMBERRowSpan"	: "2"
											, "PRIMAVERA_ID"		: $('#gridColL3Id').val()
											, "PRIMAVERA_IDRowSpan"	: "2"
											, "TRK_ITEM_NAME1"		: $('#gridColItem1').val()
											, "TRK_ITEM_NAME1RowSpan"	: "2"
											, "TRK_ITEM_NAME2"		: $('#gridColItem2').val()
											, "TRK_ITEM_NAME2RowSpan"	: "2"
											, "TRK_ITEM_NAME3"		: $('#gridColItem3').val()
											, "TRK_ITEM_NAME3RowSpan"	: "2"
											, "TRK_ITEM_NAME4"		: $('#gridColItem4').val()
											, "TRK_ITEM_NAME4RowSpan"	: "2"
											, "ATTRIBUTE3"		   : $('#gridColVendor').val()
											, "ATTRIBUTE3RowSpan"	: "2"
											, "ATTRIBUTE7"		   : $('#gridColCountry').val()
											, "ATTRIBUTE7RowSpan"	: "2"
											, "ATTRIBUTE10"		   : $('#gridColPackingListNo').val()
											, "ATTRIBUTE10RowSpan"	: "2"
											, "ATTRIBUTE9"		   : "Sequence"
											, "ATTRIBUTE9RowSpan"	: "2"

											, "INVOICE_NUM1"		   : $('#gridColInvoiceNo1').val()
											, "INVOICE_NUM1RowSpan"	: "2"
											, "INVOICE_NUM2"		   : $('#gridColInvoiceNo2').val()
											, "INVOICE_NUM2RowSpan"	: "2"
											, "INVOICE_NUM3"		   : $('#gridColInvoiceNo3').val()
											, "INVOICE_NUM3RowSpan"	: "2"
											, "ATTRIBUTE6"		   : $('#gridColSupplyScope').val()
											, "ATTRIBUTE6RowSpan"	: "2"
											, "OFFSHORE"		   : $('#gridColOnOffShore').val()
											, "OFFSHORERowSpan"	: "2"
											, "MPS_PLAN_DATE"			: $('#gridColMps').val()
											, "MPS_PLAN_DATESpan"		: "3"
											, "MPS_EXPECTED_DATE"		: ""
											, "MPS_ACTUAL_DATE"			: ""

											, "TE_PLAN_DATE"			: $('#gridColTe').val()
											, "TE_PLAN_DATESpan"		: "3"
											, "TE_EXPECTED_DATE"		: ""
											, "TE_ACTUAL_DATE"			: ""

											, "PURCHASE_DURATION"		   : $('#gridColPurchaseDuration').val()
											, "PURCHASE_DURATIONRowSpan"	: "2"
																						, "PO_PLAN_DATE"			: $('#gridColPo').val()
											, "PO_PLAN_DATESpan"		: "3"
											, "PO_EXPECTED_DATE"		: ""
											, "PO_ATCUAL_DATE"			: ""
											, "MAKE_DURATION"		   : $('#gridColMakeDuration').val()
											, "MAKE_DURATIONRowSpan"	: "2"
											, "CARGO_PLAN_DATE"			: $('#gridColCargoReady').val()
											, "CARGO_PLAN_DATESpan"		: "3"
											, "CARGO_EXPECTED_DATE"		: ""
											, "CARGO_ACTUAL_DATE"		: ""
											, "SHIPMENT_DURATION"		   : $('#gridColShipmentDuration').val()
											, "SHIPMENT_DURATIONRowSpan"  : "2"
											, "FOB_PLAN_DATE"			: $('#gridColFob').val()
											, "FOB_PLAN_DATESpan"		: "3"
											, "FOB_EXPECTED_DATE"		: ""
											, "FOB_ACTUAL_DATE"		    : ""
											, "TRANS_DURATION"		   : $('#gridColTransDuration').val()
											, "TRANS_DURATIONRowSpan"  : "2"
											, "ONSITE_PLAN_DATE"		: $('#gridColOnSite').val()
											, "ONSITE_PLAN_DATESpan"		: "3"
											, "ONSITE_EXPECTED_DATE"		: ""
											, "ONSITE_ACTUAL_DATE"		    : ""
											, "PAYMENT_MILESTONE"		   : $('#gridColPaymentMilestone').val()
											, "PAYMENT_MILESTONERowSpan"  : "2"
											, "REMARK"		   : "Memo", "REMARKRowSpan"  : "2"
											, "PM_AD"		: $('#gridColPerson').val()
											, "PM_ADSpan"		: "5"
											, "EM_AD"		: ""
											, "BUYER_AD"		    : ""
											, "SM_AD"		    : ""
											, "QC_AD"		    : ""
										}
										, {
											"Kind"		: "Header", "Class" : "gridCenterText"
											,"Spanned"	: "1"
											, "ATTRIBUTE8"			: $('#gridColStdPjt').val()
											, "PROJECT_NO"			: $('#gridColPjt').val()
											, "TASK_NUMBER"			: $('#gridColTaskNo').val()
											, "PRIMAVERA_ID"		: $('#gridColL3Id').val()
											, "TRK_ITEM_NAME1"		: $('#gridColItem1').val()
											, "TRK_ITEM_NAME2"		: $('#gridColItem2').val()
											, "TRK_ITEM_NAME3"		: $('#gridColItem3').val()
											, "TRK_ITEM_NAME4"		: $('#gridColItem4').val()
											, "ATTRIBUTE3"		   : $('#gridColVendor').val()
											, "ATTRIBUTE7"		   : $('#gridColCountry').val()
											, "ATTRIBUTE10"		   : $('#gridColPackingListNo').val()
											, "ATTRIBUTE9"		   : "Sequence"

											, "INVOICE_NUM1"		   : $('#gridColInvoiceNo1').val()
											, "INVOICE_NUM2"		   : $('#gridColInvoiceNo2').val()
											, "INVOICE_NUM3"		   : $('#gridColInvoiceNo3').val()
											, "ATTRIBUTE6"		   : $('#gridColSupplyScope').val()
											, "OFFSHORE"		   : $('#gridColOnOffShore').val()
											, "MPS_PLAN_DATE"			: $('#gridColPlanL3').val()
											, "MPS_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "MPS_ACTUAL_DATE"			: $('#gridColActual').val()

											, "TE_PLAN_DATE"			: $('#gridColPlan').val()
											, "TE_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "TE_ACTUAL_DATE"			: $('#gridColActual').val()

											, "PURCHASE_DURATION"		   : $('#gridColPurchaseDuration').val()
											, "PO_PLAN_DATE"			: $('#gridColPlanL3').val()
											, "PO_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "PO_ATCUAL_DATE"			: $('#gridColActual').val()
											, "MAKE_DURATION"		   : $('#gridColMakeDuration').val()
											, "CARGO_PLAN_DATE"			: $('#gridColPlan').val()
											, "CARGO_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "CARGO_ACTUAL_DATE"		: $('#gridColActual').val()
											, "SHIPMENT_DURATION"		   : $('#gridColShipmentDuration').val()
											, "FOB_PLAN_DATE"			: $('#gridColPlanL3').val()
											, "FOB_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "FOB_ACTUAL_DATE"		    : $('#gridColActual').val()
											, "TRANS_DURATION"		   : $('#gridColTransDuration').val()
											, "ONSITE_PLAN_DATE"		: $('#gridColPlanL3').val()
											, "ONSITE_EXPECTED_DATE"		: $('#gridColExpected').val()
											, "ONSITE_ACTUAL_DATE"		    : $('#gridColActual').val()
											, "PAYMENT_MILESTONE"		   : $('#gridColPaymentMilestone').val()
											, "REMARK"		   : "Memo"
											, "PM_AD"		: $('#gridColPmAd').val()
											, "EM_AD"		: $('#gridColEmAd').val()
											, "BUYER_AD"		    : $('#gridColBuyerAd').val()
											, "SM_AD"		    : $('#gridColSmAd').val()
											, "QC_AD"		    : $('#gridColQcAd').val()
										}
									]
								};

	// Project 조회 팝업 그리드
	dlgProjectGridCol = {
		"Cfg" : {
			"id"				: "idsmDlgProjectGrid"
			, "CfgId"			: "idsmDlgProjectGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Low"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle"	: "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Panel" : {
			"Visible" : "1"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Description
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
		}
	};

	mainGrid =	TreeGrid( {Layout:{Data:mainGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridMain" );
	dlgInvGrid = TreeGrid( {Layout:{Data:dlgInvGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgInv" );
	dlgCreateItemGrid = TreeGrid( {Layout:{Data:dlgCreateItemGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridCreateItem" );
	dlgItemScheduleItemGrid = TreeGrid( {Layout:{Data:dlgItemScheduleItemGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridItemScheduleItem" );
	dlgItemScheduleAdminGrid =	TreeGrid( { Layout:{ Data: dlgItemScheduleAdminGridCol		}, Data:{ Data: { Body: [ [] ] } }, Text: text}, "gridItemScheduleAdmin"		);

	dlgExcelDownLoadGrid =	TreeGrid( { Layout:{ Data: dlgExcelDownLoadGridCol	}, Data:{ Data: { Body: [ [] ] } } , Text: text}, "gridDlgExcelDownLoad"		);
	dlgExcelUpLoadGrid =	TreeGrid( { Layout:{ Data: dlgExcelUpLoadGridCol	}, Data:{ Data: { Body: [ [] ] } } , Text: text}, "gridDlgExcelUpLoad"		);

	dlgProjectGrid =	TreeGrid( { Layout:{ Data: dlgProjectGridCol	}, Data:{ Data: { Body: [ [] ] } } , Text: text}, "gridDlgProject"		);

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



	/*grid111		=	TreeGrid( { Layout:{ Data: col111	}, Data:{ Data: { Body: [ [] ] } } }, "grid111"	);
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
					] ] } } }, "grid111111" );*/

	initMenuAuth(function (list) {

		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();

				if(row.AUTH_CODE == "S") {
					fileUse = false;
				}

			}
		}
	});

	initDefailProject(function (list) {
		if(list.length > 0) {
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);
		}
	});
}


// 달력 셋팅
function initDatePicker( ) {
	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}


	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,

/* 2021.09.28.달력 아이콘 삭제
		showOn: "both",
		buttonImage: "/resources/images/calendar_month.png",
		buttonImageOnly: true,
*/
		dateFormat: "yy/mm/dd",
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

				result = setCombo(results.I002, "selSearchKey2", "");
				result = setCombo(results.I003, "selSearchKey3", "");
				result = setCombo(results.I004, "selOnoOfshore", "all");
				result = setCombo(results.I001, "selSearchKey4", "");

				result = setCombo(results.I002, "selSearchKey5", "");
				result = setCombo(results.I003, "selSearchKey6", "");

				result = setCombo(results.I004, "seldlgCreateItemOnoOfshore", "");
				result = setCombo(results.I005, "seldlgCreateItemPaymentMilestone", "na");
				result = setCombo(results.I004, "seldlgCreateItemOnoOfshore", "");

				result = setCombo(results.I005, "selDlgItemSchedulePaymentMilestone", "na");
				result = setCombo(results.I004, "selDlgItemScheduleOnOfshore", "na");

		 	toDay = results.DAY[0].CUR_DAY;
			resetSearchControls();
			initTable();
        }
    });
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

var selectDlgItemScheduleRow = null;
function openModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.Fixed != null){
		return false;
	}

	selectDlgItemScheduleRow = row;
	$('#dlgItemSchedule').modal('show');
	searchDlgItemScheduleItemList();
	searchDlgItemScheduleFileList();
	searchDlgItemScheduleAdminList();


}

function setResetDlgItemScheduleControls(){

	dlgItemScheduleItemGrid.Source.Data.Data.Body = [[]];
	dlgItemScheduleItemGrid.ReloadBody();

	dlgItemScheduleAdminGrid.Source.Data.Data.Body = [[]];
	dlgItemScheduleAdminGrid.ReloadBody();

	$('#txtDlgItemScheduleTrkItemName').val("");
	$('#txtDlgItemScheduleAttribute10').val("");
	$('#txtDlgItemScheduleAttribute9').val("");
	$('#txtDlgItemScheduleAttribute7').val("");
	$('#txtDlgItemScheduleAttribute3').val("");
	$('#txtDlgItemSchedulePrimaveraId').val("");
	$('#selDlgItemSchedulePaymentMilestone').val("");
	$('#selDlgItemScheduleOnOfshore').val("");
	$('#txtDlgItemScheduleSelInvoiceNum').val("");

	$('#txtDlgItemScheduleMpsPlanDate').val("");
	$('#txtDlgItemScheduleMpsExpectedDate').val("");
	$('#txtDlgItemScheduleMpsActualDate').val("");

	$('#txtDlgItemScheduleTePlanDate').val("");
	$('#txtDlgItemScheduleTeExpectedDate').val("");
	$('#txtDlgItemScheduleTeActualDate').val("");

	$('#txtDlgItemSchedulePurchaseDuration').val("");

	$('#txtDlgItemSchedulePoPlanDate').val("");
	$('#txtDlgItemSchedulePoExpectedDate').val("");
	$('#txtDlgItemSchedulePoAtcualDate').val("");
	$('#txtDlgItemScheduleMakeDuration').val("");
	$('#txtDlgItemScheduleCargoPlanDate').val("");
	$('#txtDlgItemScheduleCargoExpectedDate').val("");
	$('#txtDlgItemScheduleCargoActualDate').val("");
	$('#txtDlgItemScheduleShipmentDuration').val("");
	$('#txtDlgItemScheduleFobPlanDate').val("");
	$('#txtDlgItemScheduleFobExpectedDate').val("");
	$('#txtDlgItemScheduleFobActualDate').val("");
	$('#txtDlgItemScheduleTransDuration').val("");
	$('#txtDlgItemScheduleOnsitePlanDate').val("");
	$('#txtDlgItemScheduleOnsiteExpectedDate').val("");
	$('#txtDlgItemScheduleOnsiteActualDate').val("");

}

function setDlgItemScheduleControls(row){

	if(dlgYn == "Y"){
		$('#txtDlgItemScheduleSelInvoiceNum').val(row.SEL_INVOICE_NUM);
		return;
	}

	$('#txtDlgItemScheduleTrkItemName').val(row.TRK_ITEM_NAME);
	$('#txtDlgItemScheduleAttribute10').val(row.ATTRIBUTE10);
	$('#txtDlgItemScheduleAttribute9').val(row.ATTRIBUTE9);
	$('#txtDlgItemScheduleAttribute7').val(row.ATTRIBUTE7);
	$('#txtDlgItemScheduleAttribute3').val(row.ATTRIBUTE3);
	$('#txtDlgItemSchedulePrimaveraId').val(row.PRIMAVERA_ID);
	$('#selDlgItemSchedulePaymentMilestone').val(row.PAYMENT_MILESTONE);
	$('#selDlgItemScheduleOnOfshore').val(row.OFFSHORE);
	$('#txtDlgItemScheduleSelInvoiceNum').val(row.SEL_INVOICE_NUM);

	$('#txtDlgItemScheduleMpsPlanDate').val(row.MPS_PLAN_DATE);
	$('#txtDlgItemScheduleMpsExpectedDate').val(row.MPS_EXPECTED_DATE);
	$('#txtDlgItemScheduleMpsActualDate').val(row.MPS_ACTUAL_DATE);

	$('#txtDlgItemScheduleTePlanDate').val(row.TE_PLAN_DATE);
	$('#txtDlgItemScheduleTeExpectedDate').val(row.TE_EXPECTED_DATE);
	$('#txtDlgItemScheduleTeActualDate').val(row.TE_ACTUAL_DATE);

	$('#txtDlgItemSchedulePurchaseDuration').val(row.PURCHASE_DURATION);

	$('#txtDlgItemSchedulePoPlanDate').val(row.PO_PLAN_DATE);
	$('#txtDlgItemSchedulePoExpectedDate').val(row.PO_EXPECTED_DATE);
	$('#txtDlgItemSchedulePoAtcualDate').val(row.PO_ATCUAL_DATE);
	$('#txtDlgItemScheduleMakeDuration').val(row.MAKE_DURATION);
	$('#txtDlgItemScheduleCargoPlanDate').val(row.CARGO_PLAN_DATE);
	$('#txtDlgItemScheduleCargoExpectedDate').val(row.CARGO_EXPECTED_DATE);
	$('#txtDlgItemScheduleCargoActualDate').val(row.CARGO_ACTUAL_DATE);
	$('#txtDlgItemScheduleShipmentDuration').val(row.SHIPMENT_DURATION);
	$('#txtDlgItemScheduleFobPlanDate').val(row.FOB_PLAN_DATE);
	$('#txtDlgItemScheduleFobExpectedDate').val(row.FOB_EXPECTED_DATE);
	$('#txtDlgItemScheduleFobActualDate').val(row.FOB_ACTUAL_DATE);
	$('#txtDlgItemScheduleTransDuration').val(row.TRANS_DURATION);
	$('#txtDlgItemScheduleOnsitePlanDate').val(row.ONSITE_PLAN_DATE);
	$('#txtDlgItemScheduleOnsiteExpectedDate').val(row.ONSITE_EXPECTED_DATE);
	$('#txtDlgItemScheduleOnsiteActualDate').val(row.ONSITE_ACTUAL_DATE);

	selectDlgItemScheduleRow.FILE_GRP_CD = row.FILE_GRP_CD;
	searchDlgItemScheduleFileList();
}


function searchDlgItemScheduleFileList(){
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleFile.do",
		data: {"FILE_GRP_CD" : selectDlgItemScheduleRow.FILE_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			$('#txtDlgItemScheduleFile').fileinput("destroy");
			$('#txtDlgItemScheduleFile').val("");
			if(list.length == 0){

				$('#txtDlgItemScheduleFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});

				if(!fileUse) {

					$('#dlgItemSchedule .input-group-btn').css("display", "none");
					$('#dlgItemSchedule .kv-file-remove').css("display", "none");
				}

				return;
			}

			var fileUrl = new Array;
			var fileInfo = new Array;

			$.each(list, function (index, entry) {
				var url = "/getIdsmAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getIdsmAttachPreview.do?code=" + entry.ID;

				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});



			$('#txtDlgItemScheduleFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteIdsmSetupDlgItemScheduleFile.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " " + $("#alertFileAtt").val()
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				var aborted = !window.confirm($('#alertDelete').val());
				return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				searchDlgItemScheduleFileList();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				//alert_fail(msg);
			});

			if(!fileUse) {

				$('#dlgItemSchedule .input-group-btn').css("display", "none");
				$('#dlgItemSchedule .kv-file-remove').css("display", "none");
			}
        }
    });
}

function searchPlList(){
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleItemPL.do",
		data: {"TRK_ITEM_SEQ" : selectDlgItemScheduleRow.TRK_ITEM_SEQ},
		success: function (data, textStatus, jqXHR) {

			var row = data.results[0];
			if(row.CNT > 0) {
				$('#txtDlgItemScheduleTrkItemName').attr("readonly",true);
				$('#txtDlgItemScheduleAttribute10').attr("readonly",true);

			}
			else {
				$('#txtDlgItemScheduleTrkItemName').attr("readonly",false);
				$('#txtDlgItemScheduleAttribute10').attr("readonly",false);


			}
        }
    });
}

function searchDlgItemScheduleItemList(){
	$('#btnDlgItemScheduleEdit').hide();
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleItem.do",
		data: {"TRK_ITEM_SEQ" : selectDlgItemScheduleRow.TRK_ITEM_SEQ},
		success: function (data, textStatus, jqXHR) {

			dlgItemScheduleItemGrid.Source.Data.Data.Body = [data.results];
			dlgItemScheduleItemGrid.Reload();

			searchPlList();
        }
    });
}

function searchDlgItemScheduleAdminList(){
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleAdmin.do",
		data: {"TRK_ITEM_SEQ" : selectDlgItemScheduleRow.TRK_ITEM_SEQ},
		success: function (data, textStatus, jqXHR) {

			dlgItemScheduleAdminGrid.Source.Data.Data.Body = [data.results];
			dlgItemScheduleAdminGrid.ReloadBody();


        }
    });
}


var dlgYn = "N";
function openInvModal (G,row,col) {
	if(row != null && row.Added != null && row.Added == 1){
		return false;
	}

	$('#dlgInvEdit').click();
	selectDlgInvEditRow = row;
	if(row == null){
		dlgYn = "Y";
		selectDlgInvEditRow = selectDlgItemScheduleRow
	}
	$('#dlgInvEdit').modal('show');
	searchDlgInvEditList();

}

var selectDlgAttRow;
function openAttModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.ATTH_CNT != null && row.ATTH_CNT != "" && row.ATTH_CNT > 0){
		initFileInput("txtDlgAttListFile");
		$('#dlgAttList').click();
		selectDlgAttRow = row;
		$('#dlgAttList').modal('show');
		searchDlgAttListFile();
	}
}

var selectDlgMemoRow;
function openMemoModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	$('#dlgMemo').on('shown.bs.modal', function () {
		$('#dlgMemo').click();
	});

	selectDlgMemoRow = row;
	searchDlgMemo();
	$('#dlgMemo').modal('show');


}

function searchDlgMemo () {
	$.ajax({
		url: "/getIdsmSetupDlgMemo.do",
		data: {"TRK_ITEM_SEQ" : selectDlgMemoRow.TRK_ITEM_SEQ},
		success: function (data, textStatus, jqXHR) {

			var remark = "";

			if(data.results[0] != null)
			{
				remark = data.results[0].REMARK;
			}

			$("#txtdlgMemoRemark").val(remark);
        }
    });
}

function btnDlgMemoSaveClick(){

	var msg = $('#alertSave').val();
	if (confirm(msg)) {

		var paramData = {"TRK_ITEM_SEQ" : selectDlgMemoRow.TRK_ITEM_SEQ, "REMARK" : $("#txtdlgMemoRemark").val()};

		$.ajax({
			url: "/saveIdsmSetupDlgMemo.do",
			data: paramData,
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				} else {
					alert_success($('#alertSaveSuccess').val());
					btnSearchClick();
					$('#dlgMemo').modal('hide');
				}
			}
		});
	}
}

function setResetDlgItemScheduleAdminAddControls() {
	$("#txtDlgAdminAddListEmpName").parent().find(".autocomplete-valid").hide();
	removeValidationError("dlgAdminAddList");

	$('#txtDlgAdminAddListEmpName').val("");
	$('#txtDlgAdminAddListDeptName').val("");
	$('#txtDlgAdminAddListEmpAd').val("");
	$('#txtDlgAdminAddListDeptCode').val("");
}

function btnDlgItemScheduleAdminAddClick() {
	adminGridType = "Update";
	setResetDlgItemScheduleAdminAddControls();
	openAdminAddModal();
}

function openAdminAddModal() {
	$('#dlgAdminAddList').modal('show');
}

function btnDlgAdminAddListSelectClick() {

	if($('#txtDlgAdminAddListEmpName').val().length < 2 || $('#txtDlgAdminAddListDeptName').val() == ""){

		$('#txtDlgAdminAddListEmpName').val("");
		$('#txtDlgAdminAddListDeptName').val("");
		$('#txtDlgAdminAddListEmpAd').val("");
		$('#txtDlgAdminAddListDeptCode').val("");
		$("#txtDlgAdminAddListEmpName").parent().find(".autocomplete-valid").hide();

	}

	var chkValidation = checkRequiredField("dlgAdminAddList");

	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}

	if(adminGridType == "Update"){
		var row = dlgItemScheduleAdminGrid.AddRow(null,null,1,null,null);

		row.TRK_ITEM_SEQ = selectDlgItemScheduleRow.TRK_ITEM_SEQ
		row.USER_JOB = "PUB";
		row.AUTH_SCHEDULE1 = 0;
		row.AUTH_SCHEDULE2 = 1;
		row.USER_NAME = $('#txtDlgAdminAddListEmpName').val();
		row.USER_AD = $('#txtDlgAdminAddListEmpAd').val();
		row.USER_DEPT_NAME = $('#txtDlgAdminAddListDeptName').val();
		row.USER_DEPT_CODE = $('#txtDlgAdminAddListDeptCode').val();

		dlgItemScheduleAdminGrid.RefreshRow(row);
	}
	else if(adminGridType == "Create"){
		var row = dlgCreateItemGrid.AddRow(null,null,1,null,null);

		row.USER_JOB = "PUB";
		row.AUTH_SCHEDULE1 = 0;
		row.AUTH_SCHEDULE2 = 1;
		row.USER_NAME = $('#txtDlgAdminAddListEmpName').val();
		row.USER_AD = $('#txtDlgAdminAddListEmpAd').val();
		row.USER_DEPT_NAME = $('#txtDlgAdminAddListDeptName').val();
		row.USER_DEPT_CODE = $('#txtDlgAdminAddListDeptCode').val();

		dlgCreateItemGrid.RefreshRow(row);
	}



	$('#dlgAdminAddList').modal('hide');

}

function btnDlgItemScheduleAdminDeleteClick() {
	var deleteList = [];
	var selectList = dlgItemScheduleAdminGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	if (confirm($('#alertDelete').val())) {
		for(var i = 0; i < selectList.length; i++){

			var row = selectList[i];
			if(row.Added != null && row.Added == 1){
				dlgItemScheduleAdminGrid.RemoveRow(row);
			}
			else{
				var deleteRow = {"T_USER_AD" : row.USER_AD, "OLD_USER_JOB" : row.OLD_USER_JOB, "TRK_ITEM_SEQ" : row.TRK_ITEM_SEQ};
				deleteList.push(deleteRow);
			}
		}

		if(deleteList.length > 0){
			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteIdsmSetupDlgItemScheduleAdmin.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertDeleteSuccess').val());
						btnSearchClick();
						searchDlgItemScheduleAdminList();
					}
				}
			});
		}
		else{
			alert_success($('#alertDeleteSuccess').val());
		}
	}


}

function btnDlgCreateItemSaveClick() {
	dlgCreateItemGrid.ActionAcceptEdit();

	if($('#txtdlgCreateItemProjectCode').val().length < 2 || $('#txtdlgCreateItemProjectName').val() == ""){
		$('#txtdlgCreateItemProjectCode').val("");
		$('#txtdlgCreateItemProjectName').val("");
		$("#txtdlgCreateItemProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("dlgCreateItem");

	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}



	var insertMstList = [];
	var mstData = {"TRK_ITEM_NAME" : $('#txtdlgCreateItemItem').val(), "PROJECT_NO" : $('#txtdlgCreateItemProjectCode').val(),
				   "TASK_NUMBER" : $('#txtdlgCreateItemTaskNumber').val(), "BATCH" : "",
				   "OFFSHORE" : $('#seldlgCreateItemOnoOfshore').val(),
				   "PRIMAVERA_ID" : $('#txtdlgCreateItemPrimaveraId').val(), "MPS_PLAN_DATE" : $('#txtdlgCreateItemMpsPlanDate').val(),
				   "MPS_EXPECTED_DATE" : $('#txtdlgCreateItemMpsExpectedDate').val(), "MPS_ACTUAL_DATE" : $('#txtdlgCreateItemMpsActualDate').val(),

				   "TE_PLAN_DATE" : $('#txtdlgCreateItemTePlanDate').val(),
				   "TE_EXPECTED_DATE" : $('#txtdlgCreateItemTeExpectedDate').val(), "TE_ACTUAL_DATE" : $('#txtdlgCreateItemTeActualDate').val(),

				   "PURCHASE_DURATION" : $('#txtdlgCreateItemPurchaseDuration').val(), "PO_PLAN_DATE" : $('#txtdlgCreateItemPoPlanDate').val(),
				   "PO_EXPECTED_DATE" : $('#txtdlgCreateItemPoExpectedDate').val(), "PO_ATCUAL_DATE" : $('#txtdlgCreateItemPoActualDate').val(),
				   "MAKE_DURATION" : $('#txtdlgCreateItemMakeDuration').val(), "CARGO_PLAN_DATE" : $('#txtdlgCreateItemCargoPlanDate').val(),
				   "CARGO_EXPECTED_DATE" : $('#txtdlgCreateItemCargoExpectedDate').val(), "CARGO_ACTUAL_DATE" : $('#txtdlgCreateItemCargoActualDate').val(),
				   "SHIPMENT_DURATION" : $('#txtdlgCreateItemShipmentDuration').val(), "FOB_PLAN_DATE" : $('#txtdlgCreateItemFobPlanDate').val(),
				   "FOB_EXPECTED_DATE" : $('#txtdlgCreateItemFobExpectedDate').val(), "FOB_ACTUAL_DATE" : $('#txtdlgCreateItemFobActualDate').val(),
				   "TRANS_DURATION" : $('#txtdlgCreateItemTransDuration').val(), "ONSITE_PLAN_DATE" : $('#txtdlgCreateItemOnsitePlanDate').val(),
				   "ONSITE_EXPECTED_DATE" : $('#txtdlgCreateItemOnsiteExpectedDate').val(), "ONSITE_ACTUAL_DATE" : $('#txtdlgCreateItemOnsiteActualDate').val(),
				   "PAYMENT_MILESTONE" : $('#seldlgCreateItemPaymentMilestone').val(), "ATTRIBUTE10" : $('#txtdlgCreateItemTrkDescriptionName').val()};
	insertMstList.push(mstData);

	if($('#txtdlgCreateItemBatchName').val() != ""){
		mstData = {"TRK_ITEM_NAME" : $('#txtdlgCreateItemBatchName').val(), "PROJECT_NO" : $('#txtdlgCreateItemProjectCode').val(),
				   "TASK_NUMBER" : $('#txtdlgCreateItemTaskNumber').val(), "BATCH" : $('#txtdlgCreateItemTaskNumber').val(),
				   "OFFSHORE" : $('#seldlgCreateItemOnoOfshore').val(),
				   "PRIMAVERA_ID" : $('#txtdlgCreateItemPrimaveraId').val(), "MPS_PLAN_DATE" : $('#txtdlgCreateItemMpsPlanDate').val(),
				   "MPS_EXPECTED_DATE" : $('#txtdlgCreateItemMpsExpectedDate').val(), "MPS_ACTUAL_DATE" : $('#txtdlgCreateItemMpsActualDate').val(),

				   "TE_PLAN_DATE" : $('#txtdlgCreateItemTePlanDate').val(),
				   "TE_EXPECTED_DATE" : $('#txtdlgCreateItemTeExpectedDate').val(), "TE_ACTUAL_DATE" : $('#txtdlgCreateItemTeActualDate').val(),

				   "PURCHASE_DURATION" : $('#txtdlgCreateItemPurchaseDuration').val(), "PO_PLAN_DATE" : $('#txtdlgCreateItemPoPlanDate').val(),
				   "PO_EXPECTED_DATE" : $('#txtdlgCreateItemPoExpectedDate').val(), "PO_ATCUAL_DATE" : $('#txtdlgCreateItemPoActualDate').val(),
				   "MAKE_DURATION" : $('#txtdlgCreateItemMakeDuration').val(), "CARGO_PLAN_DATE" : $('#txtdlgCreateItemCargoPlanDate').val(),
				   "CARGO_EXPECTED_DATE" : $('#txtdlgCreateItemCargoExpectedDate').val(), "CARGO_ACTUAL_DATE" : $('#txtdlgCreateItemCargoActualDate').val(),
				   "SHIPMENT_DURATION" : $('#txtdlgCreateItemShipmentDuration').val(), "FOB_PLAN_DATE" : $('#txtdlgCreateItemFobPlanDate').val(),
				   "FOB_EXPECTED_DATE" : $('#txtdlgCreateItemFobExpectedDate').val(), "FOB_ACTUAL_DATE" : $('#txtdlgCreateItemFobActualDate').val(),
				   "TRANS_DURATION" : $('#txtdlgCreateItemTransDuration').val(), "ONSITE_PLAN_DATE" : $('#txtdlgCreateItemOnsitePlanDate').val(),
				   "ONSITE_EXPECTED_DATE" : $('#txtdlgCreateItemOnsiteExpectedDate').val(), "ONSITE_ACTUAL_DATE" : $('#txtdlgCreateItemOnsiteActualDate').val(),
				   "PAYMENT_MILESTONE" : $('#seldlgCreateItemPaymentMilestone').val(), "ATTRIBUTE10" : $('#txtdlgCreateItemTrkDescriptionName').val()};

		insertMstList.push(mstData);
	}

	var changeObject = dlgCreateItemGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;

	var insertAdminList = [];
	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = dlgCreateItemGrid.GetRowById(rowId);
		var authSchedule = row.AUTH_SCHEDULE1 == 1 ? "관리" : "조회";


		var gridRowId = row.ROW_ID == null ? "" : row.ROW_ID;
		var insertRow = {"T_USER_AD" : row.USER_AD, "USER_NAME" : row.USER_NAME,
						 "USER_JOB" : row.USER_JOB, "AUTH_SCHEDULE" : authSchedule, "USER_DEPT_NAME" : row.USER_DEPT_NAME,
						 "USER_DEPT_CODE" : row.USER_DEPT_CODE};
		insertAdminList.push(insertRow);
	}



	var msg = $('#alertSave').val();
	if (confirm(msg)) {

		var mstList = JSON.stringify(insertMstList);
		var adminList = JSON.stringify(insertAdminList);
		var paramData = {"insertMstList" : mstList, "insertAdminList" : adminList};

		$.ajax({
			url: "/saveIdsmSetupDlgCreateItem.do",
			data: paramData,
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					if(result.error == "-1") {
			          alert_fail($('#alertSaveAlreadyItem').val());
			        }
			        else {
			        	alert_fail(result.error);
			        }
				} else {
					alert_success($('#alertSaveSuccess').val());
					btnSearchClick();

					$('#dlgCreateItem').modal('hide');

				}
			}
		});
	}

}

function diffDays(date1,date2){
	var parseDate1 = new Date(date1.substr(0,4), date1.substr(5,2)-1, date1.substr(8,2));
	var parseDate2 = new Date(date2.substr(0,4), date2.substr(5,2)-1, date2.substr(8,2));
	var day = 1000 * 60 * 60 *24;
	return Math.abs((parseDate2 - parseDate1)/day) ;
}

function addDays(date,day){
   	var parseDate = new Date(date.substr(0,4), date.substr(5,2)-1, date.substr(8,2));


   	parseDate.setDate(parseDate.getDate()+parseInt(day));

   	var afterYear = parseDate.getFullYear();
   	var afterMonth = parseDate.getMonth()+1;
   	var afterDay = parseDate.getDate();

    return afterYear+"/"+pad(afterMonth,2)+"/"+pad(afterDay,2);
}

function pad(n, width){
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


function dlgCreateItemDateChange(txtInupt){


	if(txtInupt =='txtdlgCreateItemMpsActualDate' && $('#txtdlgCreateItemMpsActualDate').val() != ""){
		$('#txtdlgCreateItemMpsExpectedDate').val($('#txtdlgCreateItemMpsActualDate').val());
	}else if(txtInupt =='txtdlgCreateItemPoExpectedDate' && $('#txtdlgCreateItemMpsExpectedDate').val() != "" && $('#txtdlgCreateItemPoExpectedDate').val() != ""){
		$('#txtdlgCreateItemPurchaseDuration').val(diffDays($('#txtdlgCreateItemMpsExpectedDate').val(), $('#txtdlgCreateItemPoExpectedDate').val()));
	}else if(txtInupt =='txtdlgCreateItemCargoExpectedDate' && $('#txtdlgCreateItemPoExpectedDate').val() != "" && $('#txtdlgCreateItemCargoExpectedDate').val() != ""){
		$('#txtdlgCreateItemMakeDuration').val(diffDays($('#txtdlgCreateItemPoExpectedDate').val(), $('#txtdlgCreateItemCargoExpectedDate').val()));
	}else if(txtInupt =='txtdlgCreateItemFobExpectedDate' && $('#txtdlgCreateItemCargoExpectedDate').val() != ""  && $('#txtdlgCreateItemFobExpectedDate').val() != "" ){
		$('#txtdlgCreateItemShipmentDuration').val(diffDays($('#txtdlgCreateItemCargoExpectedDate').val(), $('#txtdlgCreateItemFobExpectedDate').val()));
	}

	if($('#txtdlgCreateItemMpsExpectedDate').val() != "" && $('#txtdlgCreateItemPurchaseDuration').val() != ""){
    	var newPOExpectedDate = addDays($('#txtdlgCreateItemMpsExpectedDate').val() ,$('#txtdlgCreateItemPurchaseDuration').val());
    	$('#txtdlgCreateItemPoExpectedDate').val(newPOExpectedDate);
    }

    if($('#txtdlgCreateItemPoExpectedDate').val() != "" && $('#txtdlgCreateItemMakeDuration').val() != ""){
       	var newCargoExpectedDate = addDays($('#txtdlgCreateItemPoExpectedDate').val(), $('#txtdlgCreateItemMakeDuration').val());
       	$('#txtdlgCreateItemCargoExpectedDate').val(newCargoExpectedDate);
    }

    if($('#txtdlgCreateItemCargoExpectedDate').val() != "" && $('#txtdlgCreateItemShipmentDuration').val() != ""){
       	var newFOBExpectedDate = addDays($('#txtdlgCreateItemCargoExpectedDate').val() , $('#txtdlgCreateItemShipmentDuration').val());
       	$('#txtdlgCreateItemFobExpectedDate').val(newFOBExpectedDate);
    }

    if($('#txtdlgCreateItemCargoExpectedDate').val() != "" && $('#txtdlgCreateItemShipmentDuration').val() != "" && $('#txtdlgCreateItemTransDuration').val() != ""){

    	var duration = parseInt($('#txtdlgCreateItemShipmentDuration').val())+parseInt($('#txtdlgCreateItemTransDuration').val());
       	var newOnsiteExpectedDate = addDays($('#txtdlgCreateItemCargoExpectedDate').val(), duration);

       	$('#txtdlgCreateItemOnsiteExpectedDate').val(newOnsiteExpectedDate);
    }

    if($('#txtdlgCreateItemOnsitePlanDate').val() != "" && $('#txtdlgCreateItemShipmentDuration').val() != "" && $('#txtdlgCreateItemTransDuration').val() != ""){

    	var duration = parseInt($('#txtdlgCreateItemShipmentDuration').val())+parseInt($('#txtdlgCreateItemTransDuration').val())*-1;
       	var newCargoPlanDate = addDays($('#txtdlgCreateItemOnsitePlanDate').val(), duration);

       	$('#txtdlgCreateItemCargoPlanDate').val(newCargoPlanDate);

    }

}

function dlgItemScheduleDateChange(txtInupt){


	if(txtInupt =='txtDlgItemScheduleMpsActualDate' && $('#txtDlgItemScheduleMpsActualDate').val() != ""){
		$('#txtDlgItemScheduleMpsExpectedDate').val($('#txtDlgItemScheduleMpsActualDate').val());
	}else if(txtInupt =='txtDlgItemSchedulePoExpectedDate' && $('#txtDlgItemScheduleMpsExpectedDate').val() != "" && $('#txtDlgItemSchedulePoExpectedDate').val() != ""){
		$('#txtDlgItemSchedulePurchaseDuration').val(diffDays($('#txtDlgItemScheduleMpsExpectedDate').val(), $('#txtDlgItemSchedulePoExpectedDate').val()));
	}else if(txtInupt =='txtDlgItemScheduleCargoExpectedDate' && $('#txtDlgItemSchedulePoExpectedDate').val() != "" && $('#txtDlgItemScheduleCargoExpectedDate').val() != ""){
		$('#txtDlgItemScheduleMakeDuration').val(diffDays($('#txtDlgItemSchedulePoExpectedDate').val(), $('#txtDlgItemScheduleCargoExpectedDate').val()));
	}else if(txtInupt =='txtDlgItemScheduleFobExpectedDate' && $('#txtDlgItemScheduleCargoExpectedDate').val() != ""  && $('#txtDlgItemScheduleFobExpectedDate').val() != "" ){
		$('#txtDlgItemScheduleShipmentDuration').val(diffDays($('#txtDlgItemScheduleCargoExpectedDate').val(), $('#txtDlgItemScheduleFobExpectedDate').val()));
	}

	if($('#txtDlgItemScheduleMpsExpectedDate').val() != "" && $('#txtDlgItemSchedulePurchaseDuration').val() != ""){
    	var newPOExpectedDate = addDays($('#txtDlgItemScheduleMpsExpectedDate').val() ,$('#txtDlgItemSchedulePurchaseDuration').val());
    	$('#txtDlgItemSchedulePoExpectedDate').val(newPOExpectedDate);
    }

    if($('#txtDlgItemSchedulePoExpectedDate').val() != "" && $('#txtDlgItemScheduleMakeDuration').val() != ""){
       	var newCargoExpectedDate = addDays($('#txtDlgItemSchedulePoExpectedDate').val(), $('#txtDlgItemScheduleMakeDuration').val());
       	$('#txtDlgItemScheduleCargoExpectedDate').val(newCargoExpectedDate);
    }

    if($('#txtDlgItemScheduleCargoExpectedDate').val() != "" && $('#txtDlgItemScheduleShipmentDuration').val() != ""){
       	var newFOBExpectedDate = addDays($('#txtDlgItemScheduleCargoExpectedDate').val() , $('#txtDlgItemScheduleShipmentDuration').val());
       	$('#txtDlgItemScheduleFobExpectedDate').val(newFOBExpectedDate);
    }

    if($('#txtDlgItemScheduleCargoExpectedDate').val() != "" && $('#txtDlgItemScheduleShipmentDuration').val() != "" && $('#txtDlgItemScheduleTransDuration').val() != ""){

    	var duration = parseInt($('#txtDlgItemScheduleShipmentDuration').val())+parseInt($('#txtDlgItemScheduleTransDuration').val());
       	var newOnsiteExpectedDate = addDays($('#txtDlgItemScheduleCargoExpectedDate').val(), duration);

       	$('#txtDlgItemScheduleOnsiteExpectedDate').val(newOnsiteExpectedDate);
    }

    if($('#txtDlgItemScheduleOnsitePlanDate').val() != "" && $('#txtDlgItemScheduleShipmentDuration').val() != "" && $('#txtDlgItemScheduleTransDuration').val() != ""){

    	var duration = parseInt($('#txtDlgItemScheduleShipmentDuration').val())+parseInt($('#txtDlgItemScheduleTransDuration').val())*-1;
       	var newCargoPlanDate = addDays($('#txtDlgItemScheduleOnsitePlanDate').val(), duration);

       	$('#txtDlgItemScheduleCargoPlanDate').val(newCargoPlanDate);

    }

}

function searchDlgAttListFile(){
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleFile.do",
		data: {"FILE_GRP_CD" : selectDlgAttRow.FILE_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			$('#txtDlgAttListFile').fileinput("destroy");
			$('#txtDlgAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgAttListFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});

				return;
			}

			var fileUrl = new Array;
			var fileInfo = new Array;

			$.each(list, function (index, entry) {
				var url = "/getIdsmAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getIdsmAttachPreview.do?code=" + entry.ID;

				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});


			$('#txtDlgAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteIdsmSetupDlgItemScheduleFile.do",
				removeIcon : null,
				removeClass: null,
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " " + $("#alertFileAtt").val()
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				var aborted = !window.confirm($('#alertDelete').val());
				return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				searchDlgItemScheduleFileList();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				//alert_fail(msg);
			});

			$('#dlgAttList .input-group-btn').css("display", "none");
			$('#dlgAttList .kv-file-remove').css("display", "none");


        }
    });
}

function btnDeleteItemClick() {
	var deleteList = [];
	var selectList = mainGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	if (confirm($('#alertDelete').val())) {
		for(var i = 0; i < selectList.length; i++){
			var row = selectList[i];

			if(row.Added != null && row.Added == 1){
				mainGrid.RemoveRow(row);
			}
			else{
				var deleteRow = {"TRK_ITEM_SEQ" : row.TRK_ITEM_SEQ};
				deleteList.push(deleteRow);
			}
		}

		if(deleteList.length > 0){
			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteIdsmSetup.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-1"){
							alert_fail($('#alertSaveIdsmDeleteCheckErr').val());
						}
						else {
							alert_fail(result.error);
						}
					} else {
						alert_success($('#alertDeleteSuccess').val());
						btnSearchClick();
					}
				}
			});
		}
		else{
			alert_success($('#alertDeleteSuccess').val());
		}
	}


}

function btnLowItemCopyClick(){

	var selectList = mainGrid.GetSelRows();


	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	if(selectList.length > 1){
		alert($('#alertGridSelectDataAll').val());
		return;
	}

	var selectRow = selectList[0];
	var childNode = selectRow.firstChild;


	if(selectRow.TRK_ITEM_SEQ == null || selectRow.TRK_ITEM_SEQ == ""){
		alert($('#alertGridCopyRowNull').val());
		return;
	}

	var copyRow = Object.assign({}, selectRow);
	copyRow.TRK_ITEM_NAME = "copy" + copyCnt + "_" + copyRow.TRK_ITEM_NAME;
	copyRow.TRK_ITEM_SEQ = "";
	copyRow.TRK_ITEM_GROUP = selectRow.TRK_ITEM_SEQ;
	copyRow.P_LIST = "";
	copyRow.ATTH_CNT = "";
	copyRow.SEL_INVOICE_NUM = "";
	copyRow.TRK_ITEM_NAMECanEdit = 1;

	copyRow.ATTRIBUTE10 = "";
	copyRow.ATTRIBUTE9 = "";
	copyRow.PL_CNT = 0;
	copyRow.ATTRIBUTE10CanEdit = 1;


	/*
	copyRow.PM_NAME = "";
	copyRow.EM_NAME = "";
	copyRow.BUYER_NAME = "";
	copyRow.SM_NAME = "";
	copyRow.QC_NAME = "";*/

	mainGrid.CopyRow(copyRow, selectRow, childNode);

	copyCnt += 1;
}

var copyCnt = 1;
function btnItemCopyClick(){

	var selectList = mainGrid.GetSelRows();


	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	if(selectList.length > 1){
		alert($('#alertGridSelectDataAll').val());
		return;
	}

	var selectRow = selectList[0];


	if (selectRow.childNodes.length > 0){
		alert($('#alertGridCopyRowChildNode').val());
		return;
	}

	var copyRow = Object.assign({}, selectRow);
	copyRow.TRK_ITEM_NAME = "copy" + copyCnt + "_" + copyRow.TRK_ITEM_NAME;
	copyRow.TRK_ITEM_SEQ = "";
	copyRow.P_LIST = "";
	copyRow.ATTH_CNT = "";
	copyRow.SEL_INVOICE_NUM = "";
	copyRow.TRK_ITEM_NAMECanEdit = 1;

	copyRow.ATTRIBUTE10 = "";
	copyRow.ATTRIBUTE9 = "";
	copyRow.PL_CNT = 0;
	copyRow.ATTRIBUTE10CanEdit = 1;

	/*
	copyRow.PM_NAME = "";
	copyRow.EM_NAME = "";
	copyRow.BUYER_NAME = "";
	copyRow.SM_NAME = "";
	copyRow.QC_NAME = "";*/

	var nextRow = mainGrid.GetNext(selectRow);

	if(nextRow != null){
		mainGrid.CopyRow(copyRow, null, nextRow);
	}
	else{
		mainGrid.CopyRow(copyRow, null, selectRow);
	}

	copyCnt += 1;



}

function btnExcelUploadClick(){
	dlgExcelDownLoadGrid.Source.Data.Data.Body = [[]];
	dlgExcelDownLoadGrid.Reload();

	dlgExcelUpLoadGrid.Source.Data.Data.Body = [[]];
	dlgExcelUpLoadGrid.ReloadBody();

	$('#dlgExcelUpload').modal('show');
}

var excelDown = false;
function btnDlgExcelUploadDownloadClick(){

	excelDown = true;

	/*const workSheetData = [['hello', 'test'],['aa', 'bb']];
	const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
	workSheet['!autofilter'] = {ref : "A1:R11"};
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, workSheet, 'sheet title');
	XLSX.writeFile(workBook, '엑셀_파일_명.xlsx');

	console.log("dlgExcelDownLoadGrid.Rows", dlgExcelDownLoadGrid.Rows);
	for (var key in dlgExcelDownLoadGrid.Rows) {

		var gridRow = dlgExcelDownLoadGrid.Rows[key];

	}


	return;*/

	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){

		dlgExcelDownLoadGrid.Source.Data.Data.Body = [[]];
		dlgExcelDownLoadGrid.Reload();
	}
	else{

		var issue_check = "N";
		if($('#ckIssueCheck').is(":checked")){
			issue_check = "Y";
		}

		$.ajax({
			url: "/getIdsmSetupDlgExcelUploadDownload.do",
			data: {"VIEW_TYPE" : view_type, "KEY1" : $("#selSearchKey1").val(), "VALUE1" : $("#txtSearchValue1").val()
				  ,"KEY4" : $("#selSearchKey4").val(),"VALUE4" : $("#txtSearchValue4").val()
				  , "KEY3" : $("#selSearchKey3").val()
				  ,"VALUE2" : $("#txtSearchValue2").val(), "VALUE3" : $("#txtSearchValue3").val()
				  , "KEY6" : $("#selSearchKey6").val()
				  ,"VALUE5" : $("#txtSearchValue5").val(), "VALUE6" : $("#txtSearchValue6").val(), "KEY2" : $("#selSearchKey2").val()
				  ,"KEY5" : $("#selSearchKey5").val(), "OFFSHORE" : $("#selOnoOfshore").val(), "PROJECT_NO" : $("#txtProjectCode").val()
				  ,"ISSUE_CHECK" : issue_check
			      },
			success: function (data, textStatus, jqXHR) {
				dlgExcelDownLoadGrid.Source.Data.Data.Body = [data.results];
				dlgExcelDownLoadGrid.Reload();
	        }
	    });
	}
}

function btnDlgExcelUploadUploadClick(){
	//dlgExcelUpLoadGrid.ActionImport();
	$('#btnDlgExcelUploadFile').click();

}

function btnDlgExcelUploadFileChange(event) {
	var input = event.target;
	var reader = new FileReader();
	var list = [];
	var	sheetCol = ["ATTRIBUTE8", "PROJECT_NO", "TASK_NUMBER", "PRIMAVERA_ID", "TRK_ITEM_NAME1", "TRK_ITEM_NAME2", "TRK_ITEM_NAME3", "TRK_ITEM_NAME4",
					"ATTRIBUTE3", "ATTRIBUTE7", "ATTRIBUTE10","ATTRIBUTE9", "INVOICE_NUM1", "INVOICE_NUM2", "INVOICE_NUM3", "ATTRIBUTE6", "OFFSHORE",
					"MPS_PLAN_DATE", "MPS_EXPECTED_DATE", "MPS_ACTUAL_DATE",
					"TE_PLAN_DATE", "TE_EXPECTED_DATE", "TE_ACTUAL_DATE", "PURCHASE_DURATION",
					"PO_PLAN_DATE", "PO_EXPECTED_DATE", "PO_ATCUAL_DATE", "MAKE_DURATION",
					"CARGO_PLAN_DATE", "CARGO_EXPECTED_DATE", "CARGO_ACTUAL_DATE", "SHIPMENT_DURATION",
					"FOB_PLAN_DATE", "FOB_EXPECTED_DATE", "FOB_ACTUAL_DATE", "TRANS_DURATION",
					"ONSITE_PLAN_DATE", "ONSITE_EXPECTED_DATE", "ONSITE_ACTUAL_DATE", "PAYMENT_MILESTONE", "REMARK",
					"PM_AD", "EM_AD", "BUYER_AD", "SM_AD", "QC_AD"];

	reader.onload = function(){
		var fdata = reader.result;
		var read_buffer = XLSX.read(fdata, {type : 'binary'});
		read_buffer.SheetNames.forEach(function(sheetName){
			var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName], { header: sheetCol });


			for(var i = 2; i < rowdata.length; i++){
				var row = rowdata[i];

				var gridRow = {"ATTRIBUTE8"			: row["ATTRIBUTE8"]
								, "PROJECT_NO"			: row["PROJECT_NO"]
								, "TASK_NUMBER"			: row["TASK_NUMBER"]
								, "PRIMAVERA_ID"		: row["PRIMAVERA_ID"]
								, "TRK_ITEM_NAME1"		: row["TRK_ITEM_NAME1"]
								, "TRK_ITEM_NAME2"		: row["TRK_ITEM_NAME2"]
								, "TRK_ITEM_NAME3"		: row["TRK_ITEM_NAME3"]
								, "TRK_ITEM_NAME4"		: row["TRK_ITEM_NAME4"]
								, "ATTRIBUTE3"		   : row["ATTRIBUTE3"]
								, "ATTRIBUTE7"		   : row["ATTRIBUTE7"]
								, "ATTRIBUTE10"		   : row["ATTRIBUTE10"]
								, "ATTRIBUTE9"		   : row["ATTRIBUTE9"]

								, "SEQUENCE_YN"       : row["SEQUENCE_YN"]
								, "INVOICE_NUM1"		   : row["INVOICE_NUM1"]
								, "INVOICE_NUM2"		   : row["INVOICE_NUM2"]
								, "INVOICE_NUM3"		   : row["INVOICE_NUM3"]
								, "ATTRIBUTE6"		   : row["ATTRIBUTE6"]
								, "OFFSHORE"		   : row["OFFSHORE"]

								, "MPS_PLAN_DATE"			: ExcelDateToJSDate(row["MPS_PLAN_DATE"])
								, "MPS_EXPECTED_DATE"		: ExcelDateToJSDate(row["MPS_EXPECTED_DATE"])
								, "MPS_ACTUAL_DATE"			: ExcelDateToJSDate(row["MPS_ACTUAL_DATE"])
								, "TE_PLAN_DATE"			: ExcelDateToJSDate(row["TE_PLAN_DATE"])
								, "TE_EXPECTED_DATE"		: ExcelDateToJSDate(row["TE_EXPECTED_DATE"])
								, "TE_ACTUAL_DATE"			: ExcelDateToJSDate(row["TE_ACTUAL_DATE"])
								, "PURCHASE_DURATION"		   : row["PURCHASE_DURATION"]
								, "PO_PLAN_DATE"			: ExcelDateToJSDate(row["PO_PLAN_DATE"])
								, "PO_EXPECTED_DATE"		: ExcelDateToJSDate(row["PO_EXPECTED_DATE"])
								, "PO_ATCUAL_DATE"			: ExcelDateToJSDate(row["PO_ATCUAL_DATE"])
								, "MAKE_DURATION"		   : row["MAKE_DURATION"]
								, "CARGO_PLAN_DATE"			: ExcelDateToJSDate(row["CARGO_PLAN_DATE"])
								, "CARGO_EXPECTED_DATE"		: ExcelDateToJSDate(row["CARGO_EXPECTED_DATE"])
								, "CARGO_ACTUAL_DATE"		: ExcelDateToJSDate(row["CARGO_ACTUAL_DATE"])
								, "SHIPMENT_DURATION"		   : row["SHIPMENT_DURATION"]
								, "FOB_PLAN_DATE"			: ExcelDateToJSDate(row["FOB_PLAN_DATE"])
								, "FOB_EXPECTED_DATE"		: ExcelDateToJSDate(row["FOB_EXPECTED_DATE"])
								, "FOB_ACTUAL_DATE"		    : ExcelDateToJSDate(row["FOB_ACTUAL_DATE"])
								, "TRANS_DURATION"		   : row["TRANS_DURATION"]
								, "ONSITE_PLAN_DATE"		: ExcelDateToJSDate(row["ONSITE_PLAN_DATE"])
								, "ONSITE_EXPECTED_DATE"		: ExcelDateToJSDate(row["ONSITE_EXPECTED_DATE"])
								, "ONSITE_ACTUAL_DATE"		    : ExcelDateToJSDate(row["ONSITE_ACTUAL_DATE"])

								, "PAYMENT_MILESTONE"		   : row["PAYMENT_MILESTONE"]
								, "REMARK"		   : row["REMARK"]
								, "PM_AD"		: row["PM_AD"]
								, "EM_AD"		: row["EM_AD"]
								, "BUYER_AD"		    : row["BUYER_AD"]
								, "SM_AD"		    : row["SM_AD"]
								, "QC_AD"		    : row["QC_AD"]
								};

				list.push(gridRow);
			}

			dlgExcelUpLoadGrid.Source.Data.Data.Body = [list];
			dlgExcelUpLoadGrid.ReloadBody();
		})



	};
	reader.readAsBinaryString(input.files[0]);
	input.value = null;
}

function btnDlgExcelUploadSaveClick(){

	if(dlgExcelUpLoadGrid.RowCount == 0){
		alert($('#alertGridDataNull').val());
		return;
	}


	if (confirm($('#alertSave').val())) {
		var updateList = [];

		for (var key in dlgExcelUpLoadGrid.Rows) {

			var gridRow = dlgExcelUpLoadGrid.Rows[key];
			if(gridRow.Fixed == null){

				var updateRow = {"ATTRIBUTE8"			: gridRow.ATTRIBUTE8
								, "PROJECT_NO"			: gridRow.PROJECT_NO
								, "TASK_NUMBER"			: gridRow.TASK_NUMBER
								, "PRIMAVERA_ID"		: gridRow.PRIMAVERA_ID
								, "TRK_ITEM_NAME1"		: gridRow.TRK_ITEM_NAME1
								, "TRK_ITEM_NAME2"		: gridRow.TRK_ITEM_NAME2
								, "TRK_ITEM_NAME3"		: gridRow.TRK_ITEM_NAME3
								, "TRK_ITEM_NAME4"		: gridRow.TRK_ITEM_NAME4
								, "ATTRIBUTE3"		   : gridRow.ATTRIBUTE3
								, "ATTRIBUTE7"		   : gridRow.ATTRIBUTE7
								, "ATTRIBUTE10"		   : gridRow.ATTRIBUTE10
								, "ATTRIBUTE9"		   : gridRow.ATTRIBUTE9
								, "SEQUENCE_YN"		   : gridRow.SEQUENCE_YN
								, "INVOICE_NUM1"		   : gridRow.INVOICE_NUM1
								, "INVOICE_NUM2"		   : gridRow.INVOICE_NUM2
								, "INVOICE_NUM3"		   : gridRow.INVOICE_NUM3
								, "ATTRIBUTE6"		   : gridRow.ATTRIBUTE6
								, "OFFSHORE"		   : gridRow.OFFSHORE
								, "MPS_PLAN_DATE"			: gridRow.MPS_PLAN_DATE
								, "MPS_EXPECTED_DATE"		: gridRow.MPS_EXPECTED_DATE
								, "MPS_ACTUAL_DATE"			: gridRow.MPS_ACTUAL_DATE

								, "TE_PLAN_DATE"			: gridRow.TE_PLAN_DATE
								, "TE_EXPECTED_DATE"		: gridRow.TE_EXPECTED_DATE
								, "TE_ACTUAL_DATE"			: gridRow.TE_ACTUAL_DATE

								, "PURCHASE_DURATION"		   : gridRow.PURCHASE_DURATION
								, "PO_PLAN_DATE"			: gridRow.PO_PLAN_DATE
								, "PO_EXPECTED_DATE"		: gridRow.PO_EXPECTED_DATE
								, "PO_ATCUAL_DATE"			: gridRow.PO_ATCUAL_DATE
								, "MAKE_DURATION"		   : gridRow.MAKE_DURATION
								, "CARGO_PLAN_DATE"			: gridRow.CARGO_PLAN_DATE
								, "CARGO_EXPECTED_DATE"		: gridRow.CARGO_EXPECTED_DATE
								, "CARGO_ACTUAL_DATE"		: gridRow.CARGO_ACTUAL_DATE
								, "SHIPMENT_DURATION"		   : gridRow.SHIPMENT_DURATION
								, "FOB_PLAN_DATE"			: gridRow.FOB_PLAN_DATE
								, "FOB_EXPECTED_DATE"		: gridRow.FOB_EXPECTED_DATE
								, "FOB_ACTUAL_DATE"		    : gridRow.FOB_ACTUAL_DATE
								, "TRANS_DURATION"		   : gridRow.TRANS_DURATION
								, "ONSITE_PLAN_DATE"		: gridRow.ONSITE_PLAN_DATE
								, "ONSITE_EXPECTED_DATE"		: gridRow.ONSITE_EXPECTED_DATE
								, "ONSITE_ACTUAL_DATE"		    : gridRow.ONSITE_ACTUAL_DATE
								, "PAYMENT_MILESTONE"		   : gridRow.PAYMENT_MILESTONE
								, "REMARK"		: gridRow.REMARK
								, "PM_AD"		: gridRow.PM_AD
								, "EM_AD"		: gridRow.EM_AD
								, "BUYER_AD"		    : gridRow.BUYER_AD
								, "SM_AD"		    : gridRow.SM_AD
								, "QC_AD"		    : gridRow.QC_AD
								};

				objNullCheck(updateRow);
				updateList.push(updateRow);
			}
		}


		var list = JSON.stringify(updateList);
		var paramData = {"updateList" : list};


		$.ajax({
			url: "/saveIdsmSetupExceluploadSave.do",
			data: paramData,
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					if(result.error == "-2") {
			          alert_fail($('#alertSaveAlreadySequence').val());
			        }
			        else {
			        	alert_fail(result.error);
			        }
				} else {
					alert_success($('#alertSaveSuccess').val());
					btnSearchClick();
					$('#dlgExcelUpload').modal('hide');
				}
			}
		});

	}
}

var chkL1 = true;
var chkL2 = true;
var chkL3 = true;
var chkLAll = false;

function btnL1Click(){
	if(chkL1) {
		treeHide("L1");
		chkL1 = false;
		chkL2 = true;
		chkL3 = true;
	}
	else {
		treeShow("L1");
		chkL1 = true;
		chkL2 = true;
		chkL3 = true;
	}
}

function btnL2Click(){

	if(chkL2) {
		treeHide("L2");
		chkL2 = false;
		chkL1 = true;
		chkL3 = true;
	}
	else {
		treeShow("L2");
		chkL2 = true;
		chkL1 = true;
		chkL3 = true;
	}
}

function btnL3Click(){

	if(chkL3) {
		treeHide("L3");
		chkL2 = true;
		chkL1 = true;
		chkL3 = false;

	}
	else {
		treeShow("L3");
		chkL2 = true;
		chkL1 = true;
		chkL3 = true;
	}
}

var al
function treeHideAll(){
	mainGrid.CollapseAll();
	return true;
}

function treeHide(type){
	chkLAll = treeHideAll();
	for (var key in mainGrid.Rows) {

		var gridRow = mainGrid.Rows[key];
		if(gridRow.Fixed == null){
			if(type == "L2" && gridRow.Level == 0){
				mainGrid.Expand(gridRow);
			}
			else if(type == "L3" && (gridRow.Level == 0 || gridRow.Level == 1)){
				mainGrid.Expand(gridRow);
			}
		}
	}

	chkLAll = false;
}

function treeShow(type){
	mainGrid.ExpandAll();
	/*for (var key in mainGrid.Rows) {

		var gridRow = mainGrid.Rows[key];
		if(gridRow.Fixed == null){
			if(type == "L1" && gridRow.Level == 0){
				mainGrid.Expand(gridRow);
			}
			else if(type == "L2" && (gridRow.Level == 0 || gridRow.Level == 1)){
				mainGrid.Expand(gridRow);
			}
			else if(type == "L3" && (gridRow.Level == 0 || gridRow.Level == 1 || gridRow.Level == 2)){
				mainGrid.Expand(gridRow);
			}

		}
	}*/
}

function btnExcelDownloadClick(){
	mainGrid.ActionExport();
}

function iconSearchClick() {
	$('#dlgProjectList').click();
	$('#txtDlgProjectProjectCode').val($('#txtProjectCode').val());
	$('#dlgProjectList').modal('show');
	dlgProjectListSearch();
}

function dlgProjectListSearch() {
	$.ajax({
		url: "/getIdsmSetupDlgProject.do",
		data: {"keyword" : $('#txtDlgProjectProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgProjectGrid.Source.Data.Data.Body = [data.results];
			dlgProjectGrid.ReloadBody();
        }
    });
}

function btnDlgProjectSelectClick() {
	var selectList = dlgProjectGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	var row = selectList[0];
    $("#txtProjectCode").val(row.SEGMENT1);
	$("#txtProjectName").val(row.NAME);
	$('#dlgProjectList').modal('hide');
}

// Project 조회 팝업 그리드 더블 클릭 시 오프너로 값 넘겨 주기
function gridProjectListDbClick( grid, row, col ) {
    $("#txtProjectCode").val( row.SEGMENT1	);
	$("#txtProjectName").val( row.NAME		);

	$('#dlgProjectList').modal('hide');
}

function ExcelDateToJSDate(date) {
	if (date == null || date == "")
		return "";
	else if (typeof(date) == "string")
		return date;
	else
	{
		var jsDate = new Date(Math.round((date - 25569)*86400*1000));
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '-' + month + '-' + day;
	}
}

function btnInvoiceMngClick(){
	var param = {};

	$('#dlgIdsmSetupPopUp').load("/desmInvoiceNumberSeqListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initInvoiceSeqPopUp(param, function (key, param) {

				if(key == "select-item"){
					//searchProjectCodeGetParam(param);
				}
			});


		}
	});
}