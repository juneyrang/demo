var v_callback = null;
var v_param;


//팝업 생성시 초기화 작업
function initPopUp(param, callback) {
	v_callback = callback;
	v_param = param;

	if (v_param.modalTtile != null) {
		$('#dlgExportClearanceTitle').text(v_param.modalTtile);
	}

	initPopUpCode();
	initPopUpControls();

	//Charge Account 팝업 초기화
	initChargeAccountControls();

	//사급PO 팝업 초기화
	initPrivatePOControls();
}

//코드정보 조회 & Combo 바인딩
function initPopUpCode() {
	/*
	var codeList = [{"CODE" : "C103"},{"CODE" : "C104"},{"CODE" : "C105"}];
	var paramList = JSON.stringify(codeList);

	$.ajax({
		url: "/getTransCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			var result = setCombo(results.C105, "selDlgExportClearanceTransportMethod", "sel");

		}
	});
	*/
}

function initPopUpControls() {

	$('#dlgExportClearance').on('shown.bs.modal', function () {
		$('#dlgExportClearance').click();
	});

	$('#dlgExportClearance').on('hidden.bs.modal', function () {
		closePopUp();
	})

	$.datepicker.setDefaults($.datepicker.regional['ko']);
	initDatePicker("txtDlgExchangeDate");
	initDatePicker("txtDlgRequestIcDate");
	initDatePicker('txtDlgCertificateDate'); // DESM 신규 필드, 서류마감시간

	$('#btnDlgDelete').click(function () { btnDlgDeleteClick(); return false; });
	$('#btnDlgSave').click(function () { btnDlgSaveClick(); return false; });
	$('#btnDlgEditFile').click(function () { btnDlgEditFileClick(); return false; });
	$('#btnDlgApprove').click(function () { btnDlgApproveClick(); return false; });
	$('#btnDlgPirvatePo').click(function () { btnDlgPirvatePoClick(); return false; });
	$('#btnDlgCancel').click(function () { btnDlgCancelClick(); return false; });

	$('#iconDlgSearchEpcProj').click(function () { iconDlgSearchEpcProjClick(); return false; });
	$('#iconDlgSearchProject').click(function () { iconDlgSearchProjectClick(); return false; });
	$('#iconDlgSearchTask').click(function () { iconDlgSearchTaskClick(); return false; });

	$('#iconDlgCurrency').click(function () { iconDlgCurrencyClick(); return false; });

	$('#iconDlgSearchChargeAccount').click(function () { iconDlgSearchChargeAccountClick(); return false; });
	$('#iconDlgSearchPriceTerms').click(function () { iconDlgSearchPriceTermsClick(); return false; });
	$('#iconDlgSearchLicenseNo').click(function () { iconDlgSearchLicenseNoClick(); return false; });
	$('#iconDlgSearchDecisionMaker').click(function () { iconDlgSearchDecisionMakerClick(); return false; });

	$('#iconDlgSearchProjectManager').click(function () { iconDlgSearchEmployeeClick("DlgProjectManager"); return false; });
	$('#iconDlgSearchEngineer').click(function () { iconDlgSearchEmployeeClick("DlgEngineer"); return false; });
	$('#iconDlgSearchQuantityUnit').click(function () { iconDlgSearchUnit("txtDlgQuantityUnit"); return false; });
	$('#iconDlgSearchNetWeightUnit').click(function () { iconDlgSearchUnit("txtDlgNetWeightUnit"); return false; });
	$('#iconDlgSearchGrossWeightUnit').click(function () { iconDlgSearchUnit("txtDlgGrossWeightUnit"); return false; });

	$("#chkDlgNonProj").click( function() { chkDlgNonProjClick(); });

	// DESM에서만 관리하는 신규 필드
	$('#iconDlgSearchManufacturer').click(function() { iconDlgSearchManufacturer('DlgManufacturer'); return false; });
	$('#iconDlgInfoStoredPlace').click(function() { alertInfoField('물품 소재지', 'alertInfoStoredPlace'); });
	$('#iconDlgInfoExporter').click(function() { alertInfoField('수출자', 'alertInfoExporter'); });
	$('#iconDlgInfoOriginalExport').click(function() { alertInfoField('원상태수출', 'alertInfoOriginalExport'); });
	$('#iconDlgInfoLoadingBondedArea').click(function() { alertInfoField('적재예정 보세구역 코드', 'alertInfoLoadingBondedArea'); });
	$('#iconDlgInfoCertificateDate').click(function() { alertInfoField('서류마감시간', 'alertInfoCertificateDate'); });
	
	//Custom Type 변경시 이벤트
	$("#selDlgCustomsType").change(function() {
		if ($("#selDlgCustomsType").val() != "당사환급") {
			alert_modal("알림", $('#alertCustomTypeChange').val());
		}
	 });

	var modalType = v_param.modalType;	//new, edit, view, copy
	setData(modalType);

	setControlAttr(modalType);

	//공통 - currency class가 있으면 3자리 마다 콤마 추가
	// 20220901, 숫자필드 숫자도 값 복사는 가능하도록 변경, 값 복사 후 숫자인지 체크해서 알려주는 로직으로 수정
	//$('.currency').blur(function () { $(this).val(addComma($(this).val())) });
	//$('.currency').focus(function () { $(this).val(removeComma($(this).val())) });
	//$('.currency').keydown(function() { return onlynumber()}); // 해당 fuction으로 인해 key input ctrl+v 안먹힘 (마우스는 먹힘)
	$('.currency').blur(function () {
		//if(isNaN($(this).val())) {
		if(isNaN(removeComma($(this).val()))) {
			alert_modal("알림", $('#alertInputNumber').val());
			$(this).val('');
		}
		else {
			$(this).val(addComma($(this).val()));
		}
	});
	$('.currency').focus(function () { $(this).val(removeComma($(this).val())) });
}

//날짜필드 초기화
function initDatePicker(obj_id) {
	$("#" + obj_id).datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		//showOn: "both",
		//buttonImage: "/resources/images/calendar_month.png",
		//buttonImageOnly: true,
	});
}

//팝업 닫을 때 후처리
function closePopUp() {
	setData("");
}

//컨트롤의  readonly show/hide 설정
function setControlAttr(modalType) {
	if (modalType != null && modalType == "view") {	//view only
		$("#chkDlgNonProj").attr("disabled", true);
		$("#txtDlgProjectNo").attr("readonly", true);
		$("#txtDlgInvoiceNo").attr("readonly", true);
		$("#txtDlgMainItem").attr("readonly", true);
		$("#txtDlgTotalAmount").attr("readonly", true);
		$("#txtDlgChargeAccount").attr("readonly", true);
		$("#txtDlgQuantity").attr("readonly", true);
		$("#txtDlgPackingCount").attr("readonly", true);
		$("#selDlgExchangeType").attr("disabled", true);
		$("#txtDlgExchangeDate").attr("readonly", true);
		$("#txtDlgNetWeight").attr("readonly", true);
		$("#txtDlgGrossWeight").attr("readonly", true);
		$("#selDlgCustomsType").attr("disabled", true);
		$("#txtDlgStoredPlace").attr("readonly", true);
		$("#txtDlgPortLoading").attr("readonly", true);
		$("#txtDlgPortDest").attr("readonly", true);
		$("#txtDlgManufacturer").attr("readonly", true);
		$("#txtDlgExporter").attr("readonly", true);
		$("#txtDlgPriceTerms").attr("readonly", true);
		$("#txtDlgShipName").attr("readonly", true);
		$("#txtDlgRequestIcDate").attr("readonly", true);
		$("#txtDlgRemarks").attr("readonly", true);
		$("#selDlgReCarryIn").attr("disabled", true);
		$("#selDlgStrategic").attr("disabled", true);
		$("#selDlgStrategicFlag").attr("disabled", true);
		$("#txtDlgDecisionUrl").attr("readonly", true);
		$("#txtDlgExportAdmission").attr("readonly", true);
		$("#txtDlgDecisionMaker").attr("readonly", true);
		$("#txtDlgDecisionReason").attr("readonly", true);
		$("#txtDlgProjectManager").attr("readonly", true);
		$("#txtDlgEngineer").attr("readonly", true);

		$("#txtDlgEpcProj").removeClass("search-only");
		$("#txtDlgProjectNo").removeClass("search-only");
		$("#txtDlgTaskNo").removeClass("search-only");
		$("#txtDlgChargeAccount").removeClass("search-only");
		$("#txtDlgPriceTerms").removeClass("search-only");
		$("#txtDlgLicenseNo").removeClass("search-only");
		$("#txtDlgDecisionMaker").removeClass("search-only");
		$("#txtDlgProjectManager").removeClass("search-only");
		$("#txtDlgEngineer").removeClass("search-only");

		$("#iconDlgSearchEpcProj").hide();
		$("#iconDlgSearchProject").hide();
		$("#iconDlgCurrency").hide();
		$("#iconDlgSearchTask").hide();
		$("#iconDlgSearchChargeAccount").hide();
		$("#iconDlgSearchQuantityUnit").hide();
		$("#iconDlgSearchNetWeightUnit").hide();
		$("#iconDlgSearchGrossWeightUnit").hide();
		$("#iconDlgSearchPriceTerms").hide();
		$("#iconDlgSearchLicenseNo").hide();
		$("#iconDlgSearchDecisionMaker").hide();
		$("#iconDlgSearchProjectManager").hide();
		$("#iconDlgSearchEngineer").hide();

		$("#btnDlgSave").hide();
		$("#btnDlgEditFile").show();
		$("#btnDlgApprove").hide();
		$("#btnDlgPirvatePo").hide();
		$("#btnDlgDelete").hide();

		// DESM에서만 관리하는 신규 필드
		//$("#txtDlgManufacturer").attr("readonly", true);
		$('#iconDlgSearchManufacturer').hide();
		$('#selDlgReExport').attr('disabled', true);
		$('#selDlgOriginalExport').attr('disabled', true);
		$('#selDlgFtaOrigin').attr('disabled', true);
		$('#selDlgFtaName').attr('disabled', true); // 2023.08.23 추가, FTA원산지 발급대상이 Y일 때 FTA Name 선택 select
		$("#txtDlgLoadingBondedArea").attr("readonly", true);
		$("#txtDlgCertificateDate").attr("readonly", true);
		$('#selDlgStrategicMaterial').attr('disabled', true);
		$('#txtDlgExportLicenseNumber').attr('disabled', true);

	} else {		//new(defalut) or edit
		$("#chkDlgNonProj").attr("disabled", false);
//		$("#txtDlgProjectNo").attr("readonly", false);
		$("#txtDlgInvoiceNo").attr("readonly", false);
		$("#txtDlgMainItem").attr("readonly", false);
		$("#txtDlgTotalAmount").attr("readonly", false);
		$("#txtDlgChargeAccount").attr("readonly", false);
		$("#txtDlgQuantity").attr("readonly", false);
		$("#txtDlgPackingCount").attr("readonly", false);
		$("#selDlgExchangeType").attr("disabled", false);
		$("#txtDlgExchangeDate").attr("readonly", false);
		$("#txtDlgNetWeight").attr("readonly", false);
		$("#txtDlgGrossWeight").attr("readonly", false);
		$("#selDlgCustomsType").attr("disabled", false);
		$("#txtDlgStoredPlace").attr("readonly", false);
		$("#txtDlgPortLoading").attr("readonly", false);
		$("#txtDlgPortDest").attr("readonly", false);
		$("#txtDlgManufacturer").attr("readonly", false);
		$("#txtDlgExporter").attr("readonly", false);
		$("#txtDlgPriceTerms").attr("readonly", false);
		$("#txtDlgShipName").attr("readonly", false);
		$("#txtDlgRequestIcDate").attr("readonly", false);
		$("#txtDlgRemarks").attr("readonly", false);
		$("#selDlgReCarryIn").attr("disabled", false);
		$("#selDlgStrategic").attr("disabled", false);
		$("#selDlgStrategicFlag").attr("disabled", false);
		$("#txtDlgDecisionUrl").attr("readonly", false);
		$("#txtDlgExportAdmission").attr("readonly", false);
		$("#txtDlgDecisionMaker").attr("readonly", false);
		$("#txtDlgDecisionReason").attr("readonly", false);
		$("#txtDlgProjectManager").attr("readonly", false);
		$("#txtDlgEngineer").attr("readonly", false);

		$("#txtDlgEpcProj").addClass("search-only");
		$("#txtDlgProjectNo").addClass("search-only");
		$("#txtDlgTaskNo").addClass("search-only");
		$("#txtDlgChargeAccount").addClass("search-only");
		$("#txtDlgPriceTerms").addClass("search-only");
		$("#txtDlgLicenseNo").addClass("search-only");
		$("#txtDlgDecisionMaker").addClass("search-only");
		$("#txtDlgProjectManager").addClass("search-only");
		$("#txtDlgEngineer").addClass("search-only");

		$("#iconDlgSearchEpcProj").show();
		$("#iconDlgSearchProject").show();
		$("#iconDlgCurrency").show();
		$("#iconDlgSearchTask").show();
		$("#iconDlgSearchChargeAccount").show();
		$("#iconDlgSearchQuantityUnit").show();
		$("#iconDlgSearchNetWeightUnit").show();
		$("#iconDlgSearchGrossWeightUnit").show();
		$("#iconDlgSearchPriceTerms").show();
		$("#iconDlgSearchLicenseNo").show();
		$("#iconDlgSearchDecisionMaker").show();
		$("#iconDlgSearchProjectManager").show();
		$("#iconDlgSearchEngineer").show();

		// DESM에서만 관리하는 신규 필드
		//$("#txtDlgManufacturer").attr("readonly", true);
		$('#iconDlgSearchManufacturer').show();
		$('#selDlgReExport').attr('disabled', false);
		$('#selDlgOriginalExport').attr('disabled', false);
		$('#selDlgFtaOrigin').attr('disabled', false);
		$('#selDlgFtaName').attr('disabled', false); // 2023.08.23 추가, FTA원산지 발급대상이 Y일 때 FTA Name 선택 select
		$("#txtDlgLoadingBondedArea").attr("readonly", false);
		$("#txtDlgCertificateDate").attr("readonly", false);
		$('#selDlgStrategicMaterial').attr('disabled', false);
		$('#txtDlgExportLicenseNumber').attr('disabled', false);

		if (modalType == "edit") {
			$("#btnDlgSave").show();
			$("#btnDlgEditFile").show();
			$("#btnDlgApprove").show();
			$("#btnDlgPirvatePo").show();
			$("#btnDlgDelete").show();
			$("#btnDlgCancel").hide();
		} else {
			$("#btnDlgSave").show();
			$("#btnDlgEditFile").show();
			$("#btnDlgApprove").show();
			$("#btnDlgPirvatePo").show();
			$("#btnDlgDelete").hide();
			$("#btnDlgCancel").hide();
		}
	}

	var list = v_param.menuAuthList;
	if(list != null) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	}


}

//입력항목의 값 설정 or Clear
function setData(modalType) {
	if (modalType != null && (modalType == "view" || modalType == "edit" || modalType == "copy")) {
		if(modalType != "copy") {
			$("#hidDlgExportHeaderId").val(v_param.EXPORT_HEADER_ID);
			$("#txtDlgExportNo").val(v_param.EXPORT_NO);
			$("#txtDlgStatus").val(v_param.STATUS);
			$("#txtDlgApplyDate").val(v_param.APPLY_DATE == "" ? "" : (new Date(v_param.APPLY_DATE)).format("yyyy-MM-dd"));
			$("#txtDlgInvoiceNo").val(v_param.INVOICE_NO);
			$("#txtDlgTotalAmount").val(v_param.TOTAL_AMOUNT);
			$("#txtDlgQuantity").val(v_param.QUANTITY);
			$("#txtDlgQuantityUnit").val(v_param.QUANTITY_UNIT);
			$("#txtDlgPackingCount").val(v_param.PACKING_COUNT);
			$("#selDlgExchangeType").val(v_param.EXCHAGE_TYPE);
			$("#txtDlgExchangeDate").val(v_param.EXCHAGE_DATE == "" ? "" : (new Date(v_param.EXCHAGE_DATE)).format("yyyy-MM-dd"));
			$("#txtDlgNetWeight").val(v_param.NET_WEIGHT);
			$("#txtDlgNetWeightUnit").val(v_param.NET_WEIGHT_UNIT);
			$("#txtDlgGrossWeight").val(v_param.GROSS_WEIGHT);
			$("#txtDlgGrossWeightUnit").val(v_param.GROSS_WEIGHT_UNIT);
			
			$("#txtDlgCreationDate").val(v_param.CREATION_DATE == "" ? "" : (new Date(v_param.CREATION_DATE)).format("yyyy-MM-dd"));
			$("#txtDlgCreater").val(v_param.CREATED_BY_NAME);
			$("#hidDlgCreaterAD").val(v_param.CREATED_BY_CODE);
			$("#hidDlgUpdateAD").val(v_param.LAST_UPDATED_BY_CODE);
			$("#txtDlgApprovedDate").val(v_param.APPROVED_DATE == "" ? "" : (new Date(v_param.APPROVED_DATE)).format("yyyy-MM-dd"));
			$("#txtDlgApprover").val(v_param.APPROVER_NAME);
			$("#hidDlgApproverId").val(v_param.APPROVER);
			$("#txtDlgCLDocNo").val(v_param.CL_DOCUMENT_NO);
			$("#txtDlgCLLicenseDate").val(v_param.CI_LICENSE_DATE == "" ? "" : (new Date(v_param.CI_LICENSE_DATE)).format("yyyy-MM-dd"));
			$("#txtDlgRefundStatus").val(v_param.REFUND_STATUS);
			
			$("#hidFileGrpCd").val(v_param.FILE_GRP_CD);

			if ($("#txtDlgStatus").val() != "Approved" || v_param.IS_EDITABLE != "Y")
				$("#btnDlgCancel").hide();
			else
				$("#btnDlgCancel").hide(); //$("#btnDlgCancel").show();		//cancel 처리 미완료로 숨김처리

			$('.currency').each(function () {
				$(this).val(addComma(removeComma($(this).val())))
			});

			// DESM에서만 관리하는 신규 필드
			$('#txtDlgCertificateDate').val(v_param.CERTIFICATE_DUEDATE == '' ? '' : (new Date(v_param.CERTIFICATE_DUEDATE)).format('yyyy-MM-dd')); // attribute12
		}
		if (v_param.NON_PROJECT != null && v_param.NON_PROJECT == "Y") $("#chkDlgNonProj").prop("checked", true);
		$("#txtDlgEpcProj").val(v_param.EPC_PROJECT_NO);
		$("#hidDlgEpcProjId").val(v_param.EPC_PROJECT_ID);
		$("#hidDlgEpcProjName").val(v_param.EPC_PROJECT_NAME);
		$("#txtDlgProjectNo").val(v_param.PROJECT_NO);
		$("#hidDlgProjectName").val(v_param.PROJECT_NAME);
		$("#hidDlgProjectId").val(v_param.PROJECT_ID);
		$("#txtDlgTaskNo").val(v_param.TASK_NUMBER);
		$("#hidDlgTaskId").val(v_param.TASK_ID);
		$("#txtDlgMainItem").val(v_param.MAIN_ITEM);
		$("#txtDlgCurrency").val(v_param.CURRENCY_CODE);

		$("#selDlgCustomsType").val(v_param.CUSTOMS_TYPE);
		$("#txtDlgStoredPlace").val(v_param.ITEM_STORED_PLACE);
		$("#txtDlgPortLoading").val(v_param.PORT_OF_LOADING_DESC);
		$("#txtDlgPortDest").val(v_param.PORT_OF_DESTINATION_DESC);
		$("#txtDlgManufacturer").val(v_param.MANUFACTURER);
		$("#txtDlgExporter").val(v_param.EXPORTER);
		$("#txtDlgPriceTerms").val(v_param.PRICE_TERMS);
		$("#txtDlgShipName").val(v_param.SHIP_NAME);
		$("#txtDlgRequestIcDate").val(v_param.REQUEST_IC_DATE == "" ? "" : (new Date(v_param.REQUEST_IC_DATE)).format("yyyy-MM-dd"));
		$("#txtDlgRemarks").val(v_param.REMARKS);
		$("#selDlgReCarryIn").val(v_param.IS_CARRIED_IN_YN);
		$("#selDlgStrategic").val(v_param.STRATEGIC_ITEM_YN);
		$("#txtDlgLicenseNo").val(v_param.LICENSE_NO);
		$("#selDlgStrategicFlag").val(v_param.ATTRIBUTE2);
		$("#txtDlgDecisionUrl").val(v_param.ATTRIBUTE3);
		$("#txtDlgExportAdmission").val(v_param.ATTRIBUTE4);
		$("#txtDlgDecisionMaker").val(v_param.DECISION_MAKER);
		$("#hidDlgDecisionMakerCode").val(v_param.DECISION_MAKER_ID);
		$("#txtDlgDecisionReason").val(v_param.DECISION_REASON);
		$("#txtDlgProjectManager").val(v_param.PROJECT_MEMBER);
		$("#hidDlgProjectManagerCode").val(v_param.PROJECT_MEMBER_ID);
		$("#txtDlgProjectManagerTeam").val(v_param.PROJECT_MEMBER_TEAM);
		$("#txtDlgEngineer").val(v_param.ENGINEER);
		$("#hidDlgEngineerCode").val(v_param.ENGINEER_ID);
		$("#txtDlgEngineerTeam").val(v_param.ENGINEER_TEAM);

		// DESM에서만 관리하는 신규 필드
		$('#hidDlgManufacturer').val(v_param.MANUFACTURER_ID); // manufacturer_id 추가
		$('#selDlgReExport').val(v_param.IS_RE_EXPORT);  // attribute8
		$('#selDlgOriginalExport').val(v_param.IS_ORIGINAL_EXPORT); // attribute9
		$('#selDlgFtaOrigin').val(v_param.IS_FTA_ORIGIN); // attribute10
		$('#selDlgFtaName').val(v_param.FTA_NAME); // attribute15 // 2023.08.23 추가, FTA원산지 발급대상이 Y일 때 FTA Name 선택 select 
		$('#txtDlgLoadingBondedArea').val(v_param.LOADING_BONDED_AREA); // attribute11
		$('#selDlgStrategicMaterial').val(v_param.IS_STRATEGIC_MATERIAL); // attribute13
		$('#txtDlgExportLicenseNumber').val(v_param.EXPORT_LICENSE_NUMBER); // attribute14
		$("#txtDlgChargeAccount").val(v_param.CODE_COMBINATION_TEXT);
		$("#hidDlgCodeCombinationId").val(v_param.CODE_COMBINATION_ID);
		
		// ITEM 복사 추가
		$('#txtDlgGrossWeightUnit').val(v_param.GROSS_WEIGHT_UNIT);
		$('#txtDlgNetWeightUnit').val(v_param.NET_WEIGHT_UNIT);
		
		if(modalType == "copy") {
			// ITEM 복사에서 첨부파일 값은 지우고 새로 작성될 수 있도록 함
			$("#hidFileGrpCd").val("");
			v_param.FILE_GRP_CD = null;
		}
		
	} else {		// 입력란 초기화
		$("#hidDlgExportHeaderId").val("");
		$("#txtDlgExportNo").val("");
		$("#txtDlgStatus").val("");
		$("#chkDlgNonProj").attr("checked", false);
		$("#txtDlgApplyDate").val("");
		$("#txtDlgEpcProj").val("");
		$("#hidDlgEpcProjName").val("");
		$("#txtDlgProjectNo").val("");
		$("#hidDlgProjectName").val("");
		$("#hidDlgProjectId").val("");
		$("#txtDlgTaskNo").val("");
		$("#hidDlgTaskId").val("");
		$("#txtDlgInvoiceNo").val("");
		$("#txtDlgMainItem").val("");
		$("#txtDlgCurrency").val("");
		$("#txtDlgTotalAmount").val("");
		$("#txtDlgChargeAccount").val("");
		$("#hidDlgCodeCombinationId").val("");
		$("#txtDlgQuantity").val("");
		$("#txtDlgQuantityUnit").val("");
		$("#txtDlgPackingCount").val("");
		$("#selDlgExchangeType").val("");
		$("#txtDlgExchangeDate").val("");
		$("#txtDlgNetWeight").val("");
		$("#txtDlgNetWeightUnit").val("kg");
		$("#txtDlgGrossWeight").val("");
		$("#txtDlgGrossWeightUnit").val("kg");
		$("#selDlgCustomsType").val("");
		$("#txtDlgStoredPlace").val("");
		$("#txtDlgPortLoading").val("");
		$("#txtDlgPortDest").val("");
		//$("#txtDlgManufacturer").val("두산중공업(주)"); // Doosan Heavy Industries & Construction Co., Ltd.
		$("#txtDlgManufacturer").val("두산에너빌리티(주)"); // Doosan Heavy Industries & Construction Co., Ltd.
		$('#hidDlgManufacturer').val('25525'); // manufacturer_id 추가
		//$("#txtDlgExporter").val("두산중공업(주)"); // Doosan Heavy Industries & Construction Co., Ltd.
		$("#txtDlgExporter").val("두산에너빌리티(주)"); // Doosan Heavy Industries & Construction Co., Ltd.
		$("#txtDlgPriceTerms").val("");
		$("#txtDlgShipName").val("");
		$("#txtDlgRequestIcDate").val("");
		$("#txtDlgRemarks").val("");
		$("#selDlgReCarryIn").val("");
		$("#selDlgStrategic").val("");
		$("#txtDlgLicenseNo").val("");
		$("#selDlgStrategicFlag").val("");
		$("#txtDlgDecisionUrl").val("");
		$("#txtDlgExportAdmission").val("");
		$("#txtDlgDecisionMaker").val("");
		$("#hidDlgDecisionMakerCode").val("");
		$("#txtDlgDecisionReason").val("");
		$("#txtDlgProjectManager").val("");
		$("#hidDlgProjectManagerCode").val("");
		$("#txtDlgProjectManagerTeam").val("");
		$("#txtDlgEngineer").val("");
		$("#hidDlgEngineerCode").val("");
		$("#txtDlgEngineerTeam").val("");
		$("#txtDlgCreationDate").val("");
		$("#txtDlgCreater").val("");
		$("#hidDlgCreaterAD").val("");
		$("#hidDlgUpdateAD").val("");
		$("#txtDlgApprovedDate").val("");
		$("#txtDlgApprover").val("");
		$("#hidDlgApproverId").val("");
		$("#txtDlgCLDocNo").val("");
		$("#txtDlgCLLicenseDate").val("");
		$("#txtDlgRefundStatus").val("");
		$("#hidFileGrpCd").val("");

		$('#selDlgReExport').val('');
		$('#selDlgOriginalExport').val('');
		$('#selDlgFtaOrigin').val('');
		$('#selDlgFtaName').val(''); // 2023.08.23 추가, FTA원산지 발급대상이 Y일 때 FTA Name 선택 select
		$('#txtDlgLoadingBondedArea').val('');
		$('#txtDlgCertificateDate').val('');
		$('#selDlgStrategicMaterial').val('');
		$('#txtDlgExportLicenseNumber').val('');
	}
}

//삭제버튼 클릭
function btnDlgDeleteClick() {

	if (v_param.STATUS !== 'Incomplete' && v_param.STATUS !== "Incomplete,Rejected") {
		alert("삭제 가능한 상태가 아닙니다");
		return;
	}

	var formData = getFormData("DELETE");
	var msg = "삭제하시겠습니까?\n수행 후에는 되돌릴 수 없습니다.";
	var alertSuccess = $('#alertCompleteSuccess').val();

	actionExportClearance(formData, msg, alertSuccess);
}

//저장버튼클릭
function btnDlgSaveClick() {
	//필수입력란 점검
	var chkValidation = checkRequiredField("dlgExportClearance");
	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}

	//전략물자 해당여부가 Y 인경우 수출하가번호 필수값
	if ($("#selDlgStrategicMaterial").val() == "Y" && $("#txtDlgExportLicenseNumber").val().trim() == "") {
		alert("전략물자 해당여부가 Y 인경우 수출하가번호는 필수값 입니다.");
		$("#txtDlgExportLicenseNumber").focus();
		return;
	}
	
	// 2023.08.23 FTA 대상일 때, FTA Name 필수값
	if ($("#selDlgFtaOrigin").val() == "Y" && $("#selDlgFtaName").val().trim() == "") {
		alert("FTA원산지 발급대상이 Y 인경우 FTA Name은 필수값 입니다.");
		$("#selDlgFtaName").focus();
		return;
	}

	//Charge Account의 Code Combination ID 입력 여부 점검
	if ($("#hidDlgCodeCombinationId").val() == "" || $("#hidDlgCodeCombinationId").val() == "0") {
		alert($('#alertCharegAccountValue').val());
		return;
	}
	
	if (getTextLength($('#txtDlgStoredPlace').val()) > 100) {
		alert($('#alertStoredPlaceLength').val());
		return;
	}

	var formData = getFormData("SAVE");
	var msg = $('#alertSave').val();
	var alertSuccess = $('#alertSaveSuccess').val();

	actionExportClearance(formData, msg, alertSuccess);
}

function btnDlgEditFileClick() {

	var param = Object.assign({}, v_param);

	if(param.FILE_GRP_CD == null) {
		param.FILE_GRP_CD = $("#hidFileGrpCd").val();
	}

	if(param.EXPORT_NO == null) {
		param.EXPORT_NO = "";
	}

	$('#divExportClearancePopUp').load("/exportAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			$('#dlgAttList').on('shown.bs.modal', function () {
				$('#dlgAttList').click();
			});

			$('#dlgAttList').on('hidden.bs.modal', function () {
			  	closeExportAttListPopUp();
			})

			initExportAttListPopUp(param, function (key, returnParam) {
				$("#hidFileGrpCd").val(returnParam.FILE_GRP_CD);
				$('#dlgAttList').modal('hide');
			});

			$('#dlgAttList').modal('show');
		}
	});
}

//승인요청버튼클릭
function btnDlgApproveClick() {
	//필수입력란 점검
	var chkValidation = checkRequiredField("dlgExportClearance");
	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}

	//Charge Account의 Code Combination ID 입력 여부 점검
	if ($("#hidDlgCodeCombinationId").val() == "" || $("#hidDlgCodeCombinationId").val() == "0") {
		alert($('#alertCharegAccountValue').val());
		return;
	}

	var formData = getFormData("APPROVE");
	var msg = $('#alertApprove').val();
	var alertSuccess = $('#alertSaveSuccess').val();

	actionExportClearance(formData, msg, alertSuccess);
}

//Cancel버튼 클릭
function btnDlgCancelClick() {

	if (v_param.STATUS !== "Approved") {
		alert("Cancel 가능한 상태가 아닙니다");
		return;
	}

	var formData = getFormData("CANCEL");
	var msg = "Cancel 상태로 변경 하시겠습니까?\n수행 후에는 되돌릴 수 없습니다.";

	if (confirm(msg)) {
		$.ajax({
			async: false,
			url: "/cancelExportClearance.do",
			data: {
				"EXPORT_NO" : $('#txtDlgExportNo').val(),
				"EXPORT_HEADER_ID" : $('#hidDlgExportHeaderId').val(),
				"STATUS" : "Cancelled"
			},
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				} else {
					alert_success($('#alertCompleteSuccess').val());
					btnSearchClick();

					$('#dlgExportClearance').modal('hide');
				}
			}
		});
	}
}

//입력데이터 가져오기
function getFormData(action)
{
	var formData = new FormData();
	formData.append("ACTION", 				action);		//SAVE, DELETE, APPROVE

	formData.append("EXPORT_HEADER_ID", 	$("#hidDlgExportHeaderId").val());
	formData.append("EXPORT_NO", 			$("#txtDlgExportNo").val());
	formData.append("STATUS", 				$("#txtDlgStatus").val());

	formData.append("NON_PROJECT", 			($('input:checkbox[id="chkDlgNonProj"]').is(":checked")) ? "Y" : "N");
	formData.append("APPLY_DATE", 			$("#txtDlgApplyDate").val());
	formData.append("EPC_PROJECT_NO", 		$("#txtDlgEpcProj").val());
	formData.append("EPC_PROJECT_ID", 		$("#hidDlgEpcProjId").val());
	formData.append("EPC_PROJECT_NAME", 	$("#hidDlgEpcProjName").val());
	formData.append("PROJECT_NO", 			$("#txtDlgProjectNo").val());
	formData.append("PROJECT_NAME", 		$("#hidDlgProjectName").val());
	formData.append("PROJECT_ID", 			$("#hidDlgProjectId").val());
	formData.append("TASK_NUMBER", 			$("#txtDlgTaskNo").val());
	formData.append("TASK_ID", 				$("#hidDlgTaskId").val());
	formData.append("INVOICE_NO", 			$("#txtDlgInvoiceNo").val());
	formData.append("MAIN_ITEM", 			$("#txtDlgMainItem").val());
	formData.append("CURRENCY_CODE", 		$("#txtDlgCurrency").val());
	formData.append("TOTAL_AMOUNT", 		removeComma($("#txtDlgTotalAmount").val()));
	formData.append("CODE_COMBINATION_ID", 	$("#hidDlgCodeCombinationId").val());
	formData.append("QUANTITY", 			removeComma($("#txtDlgQuantity").val()));
	formData.append("QUANTITY_UNIT", 		$("#txtDlgQuantityUnit").val());
	formData.append("PACKING_COUNT", 		removeComma($("#txtDlgPackingCount").val()));
	formData.append("EXCHAGE_TYPE", 		$("#selDlgExchangeType").val());
	formData.append("EXCHAGE_DATE", 		$("#txtDlgExchangeDate").val());
	formData.append("NET_WEIGHT", 			removeComma($("#txtDlgNetWeight").val()));
	formData.append("NET_WEIGHT_UNIT", 		$("#txtDlgNetWeightUnit").val());
	formData.append("GROSS_WEIGHT", 		removeComma($("#txtDlgGrossWeight").val()));
	formData.append("GROSS_WEIGHT_UNIT", 	$("#txtDlgGrossWeightUnit").val());

	formData.append("CUSTOMS_TYPE", 		$("#selDlgCustomsType").val());
	formData.append("ITEM_STORED_PLACE", 	$("#txtDlgStoredPlace").val());
	formData.append("PORT_OF_LOADING_DESC", $("#txtDlgPortLoading").val());
	formData.append("PORT_OF_DESTINATION_DESC", $("#txtDlgPortDest").val());
	formData.append("MANUFACTURER", 		$("#txtDlgManufacturer").val());
	formData.append("EXPORTER", 			$("#txtDlgExporter").val());
	formData.append("PRICE_TERMS", 			$("#txtDlgPriceTerms").val());
	formData.append("SHIP_NAME", 			$("#txtDlgShipName").val());
	formData.append("REQUEST_IC_DATE", 		$("#txtDlgRequestIcDate").val());
	formData.append("REMARKS", 				$("#txtDlgRemarks").val());
	formData.append("IS_CARRIED_IN_YN", 	$("#selDlgReCarryIn").val());
	formData.append("STRATEGIC_ITEM_YN", 	$("#selDlgStrategic").val());
	formData.append("LICENSE_NO", 			$("#txtDlgLicenseNo").val());
	formData.append("ATTRIBUTE2", 			$("#selDlgStrategicFlag").val());
	formData.append("ATTRIBUTE3", 			$("#txtDlgDecisionUrl").val());
	formData.append("ATTRIBUTE4", 			$("#txtDlgExportAdmission").val());
	formData.append("DECISION_MAKER", 		$("#txtDlgDecisionMaker").val());
	formData.append("DECISION_MAKER_ID", 	$("#hidDlgDecisionMakerCode").val());
	formData.append("DECISION_REASON", 		$("#txtDlgDecisionReason").val());
	formData.append("PROJECT_MEMBER", 		$("#txtDlgProjectManager").val());
	formData.append("PROJECT_MEMBER_ID", 	$("#hidDlgProjectManagerCode").val());
	formData.append("PROJECT_MEMBER_TEAM", 	$("#txtDlgProjectManagerTeam").val());
	formData.append("ENGINEER", 			$("#txtDlgEngineer").val());
	formData.append("ENGINEER_ID", 			$("#hidDlgEngineerCode").val());
	formData.append("ENGINEER_TEAM", 		$("#txtDlgEngineerTeam").val());

	formData.append("APPROVED_DATE", 		$("#txtDlgApprovedDate").val());
	formData.append("APPROVER_NAME", 		$("#txtDlgApprover").val());
	formData.append("APPROVER", 			$("#hidDlgApproverId").val());
	formData.append("CL_DOCUMENT_NO", 		$("#txtDlgCLDocNo").val());
	formData.append("CI_LICENSE_DATE", 		$("#txtDlgCLLicenseDate").val());
	formData.append("REFUND_STATUS", 		$("#txtDlgRefundStatus").val());
	formData.append("FILE_GRP_CD", 			$("#hidFileGrpCd").val());
	formData.append("CREATED_BY_CODE", 		$("#hidDlgCreaterAD").val());
	formData.append("LAST_UPDATED_BY_CODE", $("#hidDlgUpdateAD").val());

	// DESM 신규 필드
	formData.append('MANUFACTURER_ID', $('#hidDlgManufacturer').val());
	formData.append('IS_RE_EXPORT', $('#selDlgReExport').val()); // attribute8
	formData.append('IS_ORIGINAL_EXPORT', $('#selDlgOriginalExport').val()); // attribute9
	formData.append('IS_FTA_ORIGIN', $('#selDlgFtaOrigin').val()); // attribute10
	formData.append('FTA_NAME', $('#selDlgFtaName').val()); // attribute15 // 2023.08.23 추가, FTA원산지 발급대상이 Y일 때 FTA Name 선택 select
	formData.append('LOADING_BONDED_AREA', $('#txtDlgLoadingBondedArea').val()); // attribute11
	formData.append('CERTIFICATE_DUEDATE', $('#txtDlgCertificateDate').val()); // attribute12
	formData.append('IS_STRATEGIC_MATERIAL', $('#selDlgStrategicMaterial').val()); // attribute13
	formData.append('EXPORT_LICENSE_NUMBER', $('#txtDlgExportLicenseNumber').val()); // attribute14

	return formData;
}

//저장, 삭제, 결재요청 처리 호출 전 Validation
function actionExportClearance(formData, msg, alertSuccess) {
	confirm_modal("", msg, null, function (callobj, result) {
		// true, 확인 눌렀을 때
		if(result) {
			if(formData.get('ACTION') == 'SAVE' || formData.get('ACTION') == 'APPROVE') {
				$.ajax({
					//async: false,
					type: "POST",
					url: "/exportValidation.do",
					processData: false,
					contentType: false,
					data: formData,
					success: function (result, textStatus, jqXHR) {
						var results = result.results;
						if(results.Result == 'Fail') {
							alert_fail(results.Message);
						}
						else {
							actionExportClearanceAfterValidation(formData, msg, alertSuccess);
						}
					}
				});
			}
			else {
				actionExportClearanceAfterValidation(formData, msg, alertSuccess);
			}
		}
	});
	/*if(confirm(msg)) {
		if(formData.get('ACTION') == 'SAVE' || formData.get('ACTION') == 'APPROVE') {
			$.ajax({
				//async: false,
				type: "POST",
				url: "/exportValidation.do",
				processData: false,
				contentType: false,
				data: formData,
				success: function (result, textStatus, jqXHR) {
					var results = result.results;
					if(results.Result == 'Fail') {
						alert_fail(results.Message);
					}
					else {
						actionExportClearanceAfterValidation(formData, msg, alertSuccess);
					}
				}
			});
		}
		else {
			actionExportClearanceAfterValidation(formData, msg, alertSuccess);
		}
	}*/
}

//저장, 삭제, 결재요청 처리 호출
function actionExportClearanceAfterValidation(formData, msg, alertSuccess) {
	$.ajax({
		//async: false,
		type: "POST",
		url: "/saveExportClearance.do",
		processData: false,
		contentType: false,
		data: formData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				alert_success(alertSuccess);
				btnSearchClick();

				$('#dlgExportClearance').modal('hide');
			}
		}
	});
}

// 설명문구 필요한 Info Popup
function alertInfoField(title, alertId) {
	alert_modal(title, $(`#${alertId}`).val());
}

//EPC Proj 검색
function iconDlgSearchEpcProjClick() {
	var param = Object.assign({}, v_param);
	param.PROJECT_CODE = $('#txtDlgEpcProj').val();
	param.keyword2 = "";
	param.url = "/getErpEpcProjectDlg.do";

	$('#divExportClearancePopUp').load("/erpProjectListPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {

			$('#dlgProjectList').on('shown.bs.modal', function () {
				$('#dlgProjectList').click();
			});

			$('#dlgProjectList').on('hidden.bs.modal', function () {
				closePopUp();
			})

			initPopUp(param, function (key, param) {
				if (key == "select-item") {
					searchEpcProjectCodeGetParam(param);
				}
			});

			$('#dlgProjectList').modal('show');
		}
	});
}
function searchEpcProjectCodeGetParam(param) {
	$("#txtDlgEpcProj").val(param.PROJECT_NO);
	$("#hidDlgEpcProjName").val(param.PROJECT_NAME);
	$("#hidDlgEpcProjId").val(param.PROJECT_ID);

	$('#dlgProjectList').modal('hide');
}

//Project No 검색
function iconDlgSearchProjectClick() {
	//var param = { "PROJECT_CODE": $('#txtDlgProjectNo').val() };
	var param = Object.assign({}, v_param);
	param.PROJECT_CODE = $('#txtDlgProjectNo').val();
	param.keyword2 = $('#hidDlgEpcProjId').val();
	param.url = "/getErpProjectDlg.do";

	$('#divExportClearancePopUp').load("/erpProjectListPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {

			$('#dlgProjectList').on('shown.bs.modal', function () {
				$('#dlgProjectList').click();
			});

			$('#dlgProjectList').on('hidden.bs.modal', function () {
				closePopUp();
			})

			initPopUp(param, function (key, param) {
				if (key == "select-item") {
					searchProjectCodeGetParam(param);
				}
			});

			$('#dlgProjectList').modal('show');
		}
	});
}
function searchProjectCodeGetParam(param) {
	$("#txtDlgProjectNo").val(param.PROJECT_NO);
	$("#hidDlgProjectName").val(param.PROJECT_NAME);
	$("#hidDlgProjectId").val(param.PROJECT_ID);

	//$("#hidDlgCodeCombinationId").val("");
	$("#txtDlgChargeAccount").val(param.BU + "," + param.COST_CENTER + ",," + param.COST_CENTER + "," + "0,0,0,0" );

	$('#dlgProjectList').modal('hide');
}

//Task No
function iconDlgSearchTaskClick() {
	if($("#txtDlgProjectNo").val() == ""){
		alert_modal("","프로젝트를 먼저 입력하세요");
		return;
	}
	if($('#hidDlgProjectId').val() == "") {
		alert_modal("","올바른 프로젝트를 선택해주세요.");
		return;
	}
	var param = Object.assign({}, v_param);
	param.modalTtile = "Select Task";
	param.url = "/getSearchTaskNo.do";
	param.keyword = $("#txtDlgTaskNo").val();
	param.keyword2 = $("#hidDlgProjectId").val();
	param.cols = [
		{ "Name": "TASK_NUMBER", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "TASK_NAME", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "ACTIVITY_TYPE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"TASK_NUMBER": "Task Number", "Class": "gridCenterText",
		"TASK_NAME": "Task Name",
		"ACTIVITY_TYPE": "Activity Type"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchTaskNoGetParam(param);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}
function searchTaskNoGetParam(param) {
	$("#txtDlgTaskNo").val(param.TASK_NUMBER);
	$("#hidDlgTaskId").val(param.TASK_ID);
	$('#dlgCmmonSelect').modal('hide');
}

//Currency
function iconDlgCurrencyClick() {
	var param = Object.assign({}, v_param);
	param.modalTtile = "Select Currency";
	param.url = "/getSearchCurrency.do";
	param.keyword = $("#txtDlgPriceTerms").val();
	param.keyword2 = "";
	param.cols = [
		{ "Name": "CURRENCY_CODE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"CURRENCY_CODE": "CURRENCY CODE", "Class": "gridCenterText"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchCurrencyGetParam(param);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}
function searchCurrencyGetParam(param) {
	$("#txtDlgCurrency").val(param.CURRENCY_CODE);
	$('#dlgCmmonSelect').modal('hide');
}

function iconDlgSearchChargeAccountClick() {
	var ca_item = $("#txtDlgChargeAccount").val().split(",");
	if (ca_item.length > 0) { $("#txtDlgCABU").val(ca_item[0]); $("#txtDlgCABU").change() }
	if (ca_item.length > 1) { $("#txtDlgCACCenter").val(ca_item[1]); $("#txtDlgCACCenter").change() }
	if (ca_item.length > 2) { $("#txtDlgCAAccount").val(ca_item[2]); $("#txtDlgCAAccount").change() }
	if (ca_item.length > 3) { $("#txtDlgCABCenter").val(ca_item[3]); $("#txtDlgCABCenter").change() }
	if (ca_item.length > 4) { $("#txtDlgCAProject").val(ca_item[4]); $("#txtDlgCAProject").change() }
	if (ca_item.length > 5) { $("#txtDlgCASubKey").val(ca_item[5]); $("#txtDlgCASubKey").change() }
	if (ca_item.length > 6) { $("#txtDlgCAAlloc").val(ca_item[6]); $("#txtDlgCAAlloc").change() }
	if (ca_item.length > 7) { $("#txtDlgCAFuture").val(ca_item[7]); $("#txtDlgCAFuture").change() }

	$('#dialogChargeAccount').modal('show');
}

//Price Term
function iconDlgSearchPriceTermsClick() {
	var param = Object.assign({}, v_param);
	param.modalTtile = "Select Price Terms";
	param.url = "/getSearchPriceTerm.do";
	param.keyword = $("#txtDlgPriceTerms").val();
	param.keyword2 = "";
	param.cols = [
		{ "Name": "MEANING", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "DESCRIPTION", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "LOOKUP_CODE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"MEANING": "Meaning", "Class": "gridCenterText",
		"DESCRIPTION": "Description",
		"LOOKUP_CODE": "Lookup Code"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchPriceTermGetParam(param);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}
function searchPriceTermGetParam(param) {
	$("#txtDlgPriceTerms").val(param.MEANING);
	$('#dlgCmmonSelect').modal('hide');
}

//License No
function iconDlgSearchLicenseNoClick() {
	var obj_id = "txtDlgLicenseNo";
	var param = Object.assign({}, v_param);
	param.modalTtile = "Select License No";
	param.url = "/getSearchLicenseNo.do";
	param.keyword = $("#" + obj_id).val();
	param.keyword2 = "";
	param.cols = [
		{ "Name": "LICENSE_NO", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "LICENSE_DATE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "LICENSE_REPORTER", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"LICENSE_NO": "License No", "Class": "gridCenterText",
		"LICENSE_DATE": "License Date",
		"LICENSE_REPORTER": "License Reporter"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchLicenseNoGetParam(param, obj_id);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}
function searchLicenseNoGetParam(param, obj_id) {
	$("#" + obj_id).val(param.LICENSE_NO);
	$('#dlgCmmonSelect').modal('hide');
}

//Decision Maker 선택
function iconDlgSearchDecisionMakerClick() {
	var param = { "EMP_KEY": $('#txtDlgDecisionMaker').val() };

	$('#divExportClearancePopUp').load("/erpEmpListPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgEmpList').on('shown.bs.modal', function () { $('#dlgEmpList').click(); });
			$('#dlgEmpList').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchDecisionMakerGetParam(param);
			});

			$('#dlgEmpList').modal('show');
		}
	});
}
function searchDecisionMakerGetParam(param) {
	$("#txtDlgDecisionMaker").val(param.NAME);
	$("#hidDlgDecisionMakerCode").val(param.USER_ID);
	$('#dlgEmpList').modal('hide');
}

//Project Manager & Team, Engineer & Team 검색 아이콘 클릭
function iconDlgSearchEmployeeClick(obj_id) {
	var param = { "EMP_KEY": $('#txt' + obj_id).val() };

	var param = Object.assign({}, v_param);
	param.modalTtile = "Select Employee";
	param.url = "/getSearchErpProjectEmp.do";
	param.keyword = $('#txt' + obj_id).val();
	param.keyword2 = "";
	param.cols = [
		{ "Name": "FULL_NAME", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "EMPLOYEE_NUMBER", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "LOCATION_CODE", "Width": "300", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "PERSON_ID", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"FULL_NAME": "Full Name", "Class": "gridCenterText",
		"EMPLOYEE_NUMBER": "Employee Number",
		"LOCATION_CODE": "Location Code",
		"PERSON_ID": "Person ID"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchDlgEmployeeGetParam(param, obj_id);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}

function searchDlgEmployeeGetParam(param, obj_id) {
	$("#txt" + obj_id).val(param.FULL_NAME);
	$("#hid" + obj_id + "Code").val(param.PERSON_ID);
	$("#txt" + obj_id + "Team").val(param.LOCATION_CODE);
	$('#dlgCmmonSelect').modal('hide');
}

function iconDlgSearchManufacturer(obj_id) {
	var param = { "VENDOR_KEY" : $('#txt' + obj_id).val() };

	var param = Object.assign({}, v_param);
	param.modalTtile = "Select Manufacturer";
	param.url = "/getSearchManufacturer.do";
	param.keyword = $('#txt' + obj_id).val();
	param.keyword2 = "";
	param.cols = [
		{ "Name": "VENDOR_ID", "Width": "150", "Type": "Text", "Align": "center", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "VENDOR_CODE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "VENDOR_NAME", "Width": "350", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"VENDOR_ID": "Manufacturer Id", "Class": "gridCenterText",
		"VENDOR_CODE": "Vendor Code",
		"VENDOR_NAME": "Vendor Name",
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchDlgManufacturerGetParam(param, obj_id);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}

function searchDlgManufacturerGetParam(param, obj_id) {
	//$("#txt" + obj_id).val(param.VENDOR_NAME);
	$("#txt" + obj_id).val((param.VENDOR_NAME == '두산중공업(주)') ? '두산에너빌리티(주)' : param.VENDOR_NAME);
	$("#hid" + obj_id).val(param.VENDOR_ID);
	$('#dlgCmmonSelect').modal('hide');
}

//Quantity Unit, Net Weight Unit, Gross Weight Unit Select
function iconDlgSearchUnit(obj_id) {
	var param = Object.assign({}, v_param);
	param.modalTtile = "Select Unit";
	param.url = "/getUnitCodeList.do";
	param.keyword = $("#" + obj_id).val();
	param.keyword2 = "";
	param.cols = [
		{ "Name": "UNIT_OF_MEASURE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"UNIT_OF_MEASURE": "Unit", "Class": "gridCenterText"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchUnitGetParam(param, obj_id);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}
function searchUnitGetParam(param, obj_id) {
	$("#" + obj_id).val(param.UNIT_OF_MEASURE);
	$('#dlgCmmonSelect').modal('hide');
}

//Non Proj. 체크 변경시
function chkDlgNonProjClick() {
	var modalType = v_param.modalType;	//new, edit, view, copy
	if (modalType == null || modalType == "new" || modalType == "edit" || modalType == "copy") {
		if ($('input:checkbox[id="chkDlgNonProj"]').is(":checked"))
		{
			//필수값 제거
			setRequired("txtDlgProjectNo", "lblDlgProjectNo", false);

			//비활성화
			setFieldEnabled("txtDlgEpcProj", "lblDlgEpcProj", "iconDlgSearchEpcProj", false);		//EPC_PROJECT_NO
			setFieldEnabled("txtDlgProjectNo", "lblDlgProjectNo", "iconDlgSearchProject", false);	//PROJECT_NO / 필수값도 해제
			setFieldEnabled("txtDlgTaskNo", "lblDlgTaskNo", "iconDlgSearchTask", false);			//TASK_NUMBER

			//Non Project일 경우 아래 필드 값 제거
			$("#txtDlgEpcProj").val(""); // EPC_PROJECT_NO
			$("#hidDlgEpcProjName").val(""); // EPC_PROJECT_NAME
			$("#hidDlgEpcProjId").val(""); // EPC_PROJECT_ID
			$("#txtDlgProjectNo").val(""); // PROJECT_NO
			$("#hidDlgProjectName").val(""); // PROJECT_NAME
			$("#hidDlgProjectId").val(""); // PROJECT_ID
			$("#txtDlgTaskNo").val(""); // TASK_NUMBER
			$("#hidDlgTaskId").val(""); // TASK_ID
			$("#txtDlgChargeAccount").val(""); // CODE_COMBINATION_CODE
			$("#hidDlgCodeCombinationId").val(""); // CODE_COMBINATION_CODE
		}
		else
		{
			//필수값 설정
			setRequired("txtDlgProjectNo", "lblDlgProjectNo", true);

			//활성화
			setFieldEnabled("txtDlgEpcProj", "lblDlgEpcProj", "iconDlgSearchEpcProj", true);		//EPC_PROJECT_NO
			setFieldEnabled("txtDlgProjectNo", "lblDlgProjectNo", "iconDlgSearchProject", true);	//PROJECT_NO / 필수값도 해제
			setFieldEnabled("txtDlgTaskNo", "lblDlgTaskNo", "iconDlgSearchTask", true);			//TASK_NUMBER
		}
	}
}

//필수입력 항목 체크
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

//필수입력필드 On/Off
function setRequired(obj_id, lbl_id, on_flag) {
	if (on_flag) {
		if (!$("#" + obj_id).hasClass("required")) $("#" + obj_id).addClass("required");
		if (!$("#" + lbl_id).hasClass("required")) $("#" + lbl_id).addClass("required");
	} else {
		$("#" + obj_id).removeClass("required");
		$("#" + lbl_id).removeClass("required");
	}
}

//필드 활성화/비활성화, on_flag == ture 활성화
function setFieldEnabled(obj_id, lbl_id, ico_id, on_flag) {
	if (on_flag) {
		if (ico_id != "") {
			$("#" + ico_id).show();
			if (!$("#" + obj_id).hasClass("search-only")) $("#" + obj_id).addClass("search-only");
		} else {
			$("#" + obj_id).attr("readonly", false);
		}

	} else {
		$("#" + obj_id).attr("readonly", true);
		if (ico_id != "") {
			$("#" + ico_id).hide();
			$("#" + obj_id).removeClass("search-only");
		}
	}
}

//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
function removeDisabled() {
	$("input:disabled").attr("disabled", false);
	$("select:disabled").attr("disabled", false);
}

//#region Charge Account 팝업
//검색버튼 이벤트 연결
function initChargeAccountControls() {
	$('#iconDlgSearchCABU').click(function () { searchCACode("CABU", "SEGMENT1", "BU"); return false; });						//BU : BU, Description
	$('#iconDlgSearchCACCenter').click(function () { searchCACode("CACCenter", "SEGMENT2", "Cost Center"); return false; });	//Cost Center(부서) : Cost Center, Description
	$('#iconDlgSearchCAAccount').click(function () { searchCACode("CAAccount", "SEGMENT3", "Account"); return false; });		//Account(계정코드) : Account, Description
	$('#iconDlgSearchCABCenter').click(function () { searchCACode("CABCenter", "SEGMENT4", "Budget Center"); return false; });	//Budget Center(부서) : Budget Center, Description
	$('#iconDlgSearchCAProject').click(function () { searchCACode("CAProject", "SEGMENT5", "Project"); return false; });	//Project : Project, Description
	$('#iconDlgSearchCASubKey').click(function () { searchCACode("CASubKey", "SEGMENT6", "Sub Key"); return false; });			//Sub Key (Task ????) : Sub Key, Description
	$('#iconDlgSearchCAAlloc').click(function () { searchCACode("CAAlloc", "SEGMENT7", "Allocation"); return false; });			//Allocation(부서) : Allocation, Description
	$('#iconDlgSearchCAFuture').click(function () { searchCACode("CAFuture", "SEGMENT8", "Future"); return false; });			//Future : Future, Description

	$('#btnChargeAccountModalSave').click(function () { btnChargeAccountModalSave_Click(); return false; });	//팝업의 확인 클릭시

	//PO입력시 Status 자동조회 및 표시
	$("#dialogChargeAccount input[type=text]").change(function () {
		if ($(this).val() != "" && $(this).val() != "0") {
			var this_id = $(this).attr("id");
			$.ajax({
				url: "/getChargeAccountItem.do",
				data: { "keyword" : $(this).val(), "keyword2" : $(this).attr("segment") },
				success: function (data, textStatus, jqXHR) {
					var results = data.results;
					if (results.length == 0)
						$("#" + this_id.replace("txt", "lbl")).text("Unknown");
					else
						$("#" + this_id.replace("txt", "lbl")).text(results[0].DESCRIPTION);
				}
			});
		}
	});
}

function searchCACode(obj_id, keyword2, code_title, url) {
	var param = Object.assign({}, v_param);
	param.modalTtile = "Select " + code_title;
	param.url = "/getChargeAccountItem.do";
	param.keyword = $("#txtDlg" + obj_id).val();
	param.keyword2 = keyword2;
	param.cols = [
		{ "Name": "FLEX_VALUE", "Width": "200", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" },
		{ "Name": "DESCRIPTION", "Width": "400", "Type": "Text", "Align": "left", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );" }
	];
	param.headers = {
		"FLEX_VALUE": code_title, "Class": "gridCenterText",
		"DESCRIPTION": "Description"
	};

	$('#divExportClearancePopUp').load("/cmmSelectPopUp.do", null, function (data, status, xhr) {
		if (status == "success") {
			$('#dlgCmmonSelect').on('shown.bs.modal', function () { $('#dlgCmmonSelect').click(); });
			$('#dlgCmmonSelect').on('hidden.bs.modal', function () { closePopUp(); })

			initPopUp(param, function (key, param) {
				if (key == "select-item") searchCACodeGetParam(param, obj_id);
			});

			$('#dlgCmmonSelect').modal('show');
		}
	});
}

function searchCACodeGetParam(param, obj_id) {
	$("#txtDlg" + obj_id).val(param.FLEX_VALUE);
	$("#lblDlg" + obj_id).text(param.DESCRIPTION);
	$('#dlgCmmonSelect').modal('hide');
}

function btnChargeAccountModalSave_Click() {
	if (	$("#txtDlgCABU").val() == ""
		||  $("#txtDlgCACCenter").val() == ""
		||  $("#txtDlgCAAccount").val() == ""
		||  $("#txtDlgCABCenter").val() == ""
		||  $("#txtDlgCAProject").val() == ""
		||  $("#txtDlgCASubKey").val() == ""
		||  $("#txtDlgCAAlloc").val() == ""
		||  $("#txtDlgCAFuture").val() == "") {
		alert("모든항목을 선택하여야 합니다.");
		return;
	}

	$.ajax({
		async: false,
		url: "/getCodeCombinationId.do",
		data: {
			"segment1" : $('#txtDlgCABU').val(),
			"segment2" : $('#txtDlgCACCenter').val(),
			"segment3" : $('#txtDlgCAAccount').val(),
			"segment4" : $('#txtDlgCABCenter').val(),
			"segment5" : $('#txtDlgCAProject').val(),
			"segment6" : $('#txtDlgCASubKey').val(),
			"segment7" : $('#txtDlgCAAlloc').val(),
			"segment8" : $('#txtDlgCAFuture').val()
		},
		success: function (result, textStatus, jqXHR) {
			var results = result.results;

			if (results.length > 0) {
				if (parseInt(results[0].CODE_COMBINATION_ID) <= 0) {
					alert_fail("선택하신 값에 해당하는 정보가 없습니다.<br />관리자에게 문의하십시오.");
				} else {
					$("#hidDlgCodeCombinationId").val(results[0].CODE_COMBINATION_ID);
					$("#txtDlgChargeAccount").val(
						$("#txtDlgCABU").val() + ","
						+ $("#txtDlgCACCenter").val() + ","
						+ $("#txtDlgCAAccount").val() + ","
						+ $("#txtDlgCABCenter").val() + ","
						+ $("#txtDlgCAProject").val()  + ","
						+ $("#txtDlgCASubKey").val() + ","
						+ $("#txtDlgCAAlloc").val() + ","
						+ $("#txtDlgCAFuture").val());

					$('#dialogChargeAccount').modal('hide');
				}
			} 	else {
				alert_fail("선택하신 값에 해당하는 정보가 없습니다.<br />관리자에게 문의하십시오.");
			}
		}
	});
}
//#endregion

//#region 사급PO 팝업
function initPrivatePOControls() {
	$('#btnPrivatePOModalSave').click(function () { btnPrivatePOModalSave_Click(); return false; });	//팝업의 확인 클릭시

	//PO입력시 Status 자동조회 및 표시
	$("#dialogPrivatePO input[type=text]").change(function () {
		var this_id = $(this).attr("id");
		$.ajax({
			url: "/getPOStatus.do",
			data: { "PO_HEADER_ID" : $(this).val() },
			success: function (data, textStatus, jqXHR) {
				var results = data.results;
				if (results.length == 0)
					$("#" + this_id.replace("txt", "lbl")).text("Unknown");
				else
					$("#" + this_id.replace("txt", "lbl")).text(results[0].PO_STATUS);
			}
		});
	});
}

//사급PO버튼클릭
function btnDlgPirvatePoClick() {
	if  ($("#hidDlgExportHeaderId").val() == "") {
		alert_fail("작성된 내역을 저장 후 사급PO 등록이 가능합니다.");
		return;
	} else {
		for (var i = 1; i < 11; i++) {
			$("#txtDlgPrivatePO_" + i.toString()).val("");
			$("#lblDlgPrivatePO_" + i.toString()).val("");
		}

		$.ajax({
			url: "/getPrivatePOList.do",
			data: { "EXPORT_HEADER_ID" : $("#hidDlgExportHeaderId").val() },
			success: function (data, textStatus, jqXHR) {
				var results = data.results;
				$.each(results, function (index, entry) {
					$("#txtDlgPrivatePO_" + (index + 1).toString()).val(entry.PO_HEADER_ID);
					$("#lblDlgPrivatePO_" + (index + 1).toString()).text(entry.PO_STATUS);
				});

				$('#dialogPrivatePO').modal('show');
			}
		});
	}
}

//사급PO팝업 저장 버튼
function btnPrivatePOModalSave_Click() {
	if  ($("#hidDlgExportHeaderId").val() == "") {
		alert_fail("작성된 내역을 저장 후 사급PO 등록이 가능합니다.");
		return;
	}

	var poItemList = [];
	for (var i = 1; i < 11; i++) {
		if ($("#txtDlgPrivatePO_" + i.toString()).val() != "")
			poItemList.push({"PO_HEADER_ID" : $("#txtDlgPrivatePO_" + i.toString()).val()});
	}

	var poList = JSON.stringify(poItemList);
	var paramData = {"EXPORT_HEADER_ID" : $("#hidDlgExportHeaderId").val(), "PO_LIST" : poList};

	$.ajax({
		url: "/savePrivatePO.do",
		data: paramData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				this.alert_success($('#alertSaveSuccess').val());
				$('#dialogPrivatePO').modal('hide');
			}
		}
	});
}

function getTextLength (str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length == 6) {
            len++;
        }
        len++;
    }
    return len;
}
//#endregion