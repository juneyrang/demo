/*
	운송관리 > 전략물자관리
	strategicMgt.js

롤 코드 한글로 하드코딩
*/
var mainGrid;					// 전략물자관리 목록
var dlgProjectGrid;				// 프로젝트 검색 목록
var gridUserJobCode;			// 공통코드
var dlgEditPackingDetailGrid;	// Packing List
var packageNoDetailGrid;		// 전략물자 판정 List 목록
var commentGrid;				// comment 목록
var strategicMgtStatusPopGrid;	// 전략물자 상태 팝업 목록

var gridLangUrl = "/resources/gridJs/Languages/TextKR.js";

var toDay;
var prev2monDay;		// 현재일 -2달
var btnType = "";		// 클릭 한 버튼
var txtRoleName = "";	// 로그인 사용자 롤 한글
var mailType = "";
var fileUse = true;

var fileUrlCnt	= 0;

//######################################## 전략물자관리 FOB수출 ########################################
var isStrategicCreate = false;
var insertRow = {"REQ_MASTER_ID" : "", "SHIPPING_REQ_NO" : "", "REVISION_NUM" : "", "STATUS" : "", "DOCUMENT_GRP_ID" : "", "ORDER_MASTER_ID" : "", "VOYAGE_YN" : ""};

var currentStrategicMasterInfo; // 현재 전략물자관리 Master Data (Main Grid의 Row)
// ######################################## Setup Function List ########################################
$(document).ready(function() {
	initControls();

	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
});

// 윈도우 창 크기 변경 시 목록 화면 크기 변경
$(window).resize(function() {
	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
});

function initControls() {
	// Search Box 자동완성
	// Site.js
	makeAutocomplete(
		"txtSearchProjectCode"		// 자동완성 입력 input
		,""							// keyword2 파라메터 id
		,"txtSearchProjectName"		// clear필드 id
		,"/getTransProject.do"		// 검색 URL
		,2							// 검색 실행을 위한 keyword 최소 길이
		,false						// 선택완료 마크 표시 여부
		,function(event, ui) {
			$("#txtSearchProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtSearchProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	makeAutocomplete(
		"txtMgtInfoNewProjectId", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		//"txtMgtInfoProjectDesc",		//clear필드 id
		"txtMgtInfoPopProjectDesc",
		"/getTransProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtMgtInfoNewProjectId").val(ui.item.value.split("|")[1]);
			//$("#txtMgtInfoProjectDesc").val(ui.item.value.split("|")[2]);
			$("#txtMgtInfoPopProjectDesc").val(ui.item.value.split("|")[2]);
	
			return false;
		}
	); 	


//	initFileInput("txtStrategicMgtInfoPopFile"); // 전략물자관리 상세 팝업 > 첨부파일 셋팅
	initDatePicker(); // 달력 셋팅

	TGSetEvent("OnRenderFinish","mainGrid",function(grid){
		
		fnSetMainGridRowColor(grid);
	});		 

	// Serach Box Event List
	$("#txtSearchProjectCode").keydown(function(keyInfo) {
		if(13 == keyInfo.keyCode) {
			$('#btnSearch').click();
		}
	});
	$('#iconSearch').click(function() { iconSearchClick(); return false; }); // Search Box의 Project Code 검색 조건 아이콘 클릭
	$('#iconDlgProjectListSearch').click(function() { dlgStrategicMgtProjectListSearch(); return false; }); // Project 조회 팝업 > 조회 아이콘 클릭
	$('#btnDlgProjectSelect').click(function() { // Project 조회 팝업 > Footer의 선택 버튼 클릭
		var selectList = dlgProjectGrid.GetSelRows();
		if(selectList.length == 0){
			alert($('#alertGridSelectDataNull').val()); // 선택된 항목이 없습니다.
			return;
		}
		var row = selectList[0];
		if($('#dlgStrategicMgtProjectListMode').val() == 'POPUP') {
			$("#txtMgtInfoNewProjectId").val(row.PROJECT_CODE);
			//$("#txtMgtInfoProjectDesc").val(row.PROJECT_DESC);
			$("#txtMgtInfoPopProjectDesc").val(row.PROJECT_DESC);
		} else {
			$("#txtSearchProjectCode").val(row.PROJECT_CODE);
			$("#txtSearchProjectName").val(row.PROJECT_DESC);
		}
		$('#dlgStrategicMgtProjectList').modal('hide');
	});
	$("#txtDlgProjectProjectCode").keydown(function(key) {
		if (key.keyCode == 13) {
			dlgStrategicMgtProjectListSearch();
		}
	});
	$('#btnSearch').click(function() { btnSearchClick(); return false; }); // 목록 조회 버튼 클릭
	$('#btnResete').click(function() { resetSearchControls(); return false; }); // 목록 검색 조건 리셋 버튼 클릭, 검색 조건 초기 설정

	$('#iconDlgInfoStatusSearch').click(function() { alert_modal('', $('#alertInfoStatusSearch').val()) });

	// Main 화면 승인관련 Button Event List
	$("#btnMainConApproved").click(function() { fnMainBtnEvent("conApproved"); }); // 본 화면 조건부승인완료 버튼 클릭
	$("#btnMainReturn").click(function() { fnMainBtnEvent("return"); }); // 본 화면 반려 버튼 클릭
	$("#btnMainComApproved").click(function() { fnMainBtnEvent("comApproved"); }); // 본 화면 승인완료 버튼 클릭
	
	//$("#btnMainCreateStrategic").click(function() { openModalDetail(null, null, null, true); }); // 본 화면 전략물자관리 생성 버튼 클릭
	$("#btnMainCreateStrategic").click(function() { openConfirmModalDetail(null, null, null, true); }); // 본 화면 전략물자관리 생성 버튼 클릭
	$('#iconNewProjectSearch').click(function () { iconNewProjectSearchClick(); return false; });
	$('#selDlgEditIndeptFlag').change(function () { selDlgEditIndeptFlagChange(); return false; });
	$('#iconNameSearch').click(function () { iconNameSearchClick(); return false; });

	$('#txtMgtInfoPopIsThirdCountry').change(function () {
		var IsThirdCountry = "N";	
		if($('#txtMgtInfoPopIsThirdCountry').is(":checked")){
			IsThirdCountry = "Y";
		}	
		 setIsThirdCountry(IsThirdCountry); 
		 return false; 
	 });
	 
	$('#btnMgtInfoPopIsThirdCountry').click(function() { $('#strategicMgtInfoPopIsThirdCountry').modal('show'); return false; });	
	//$('#btnMgtInfoPopIsSpecialShipping').click(function() { $('#strategicMgtInfoPopIsSpecialShipping').modal('show'); return false; });
	$('#btnMgtInfoPopIsFOB').click(function() { $('#strategicMgtInfoPopIsFOB').modal('show'); return false; }); 


	// 전략물자관리 상세 팝업(Modal)의 전략물자판정 Event List
	initStrategicEvent();
	$('#strategicMgtInfoPop').on('shown.bs.modal', function() { $('#strategicMgtInfoPop').click(); }); // 전략물자관리 상세 팝업 오픈시 , Focus 변경을 위함
	$('#btnPackageNoInfoPop').click(function() { $('#packageNoInfoPop').modal('show'); return false; }); // 전략물자관리 상세 팝업 > 전략물자 판정 List 안내문 버튼 클릭시
	$('#btnDlgEditExcelDownload').click(function() { fn_sampleDownload(); }); // 전략물자관리 상세 팝업 > 전략물자 판정 List Download
	$('#btnPackageNoExcelUpload').click(function() { fn_packageNoExcelUpload(); }); // 전략물자관리 상세 팝업 > 전략물자 판정 List Excel Upload
	$('#btnStrategicMgtInfoPopFile').click(function() { $('#strategicMgtInfoPopFile').modal('show'); return false; }); // 전략물자관리 상세 팝업 > 첨부파일 안내문 버튼 클릭시
	$('#strategicMgtInfoPop').on('hide.bs.modal', function() {
		dlgYn = "N"; 
		setResetDlgItemScheduleControls(); 

		isStrategicCreate = false;
		$('#mgtInfoPop').find(':input').each(function(i) {
			$(this).removeClass('required');
			$(this).removeClass("validation-error");
		});
	}); // 전략물자관리 상세 팝업 닫기시
	$('#btnPackageNoAdd').click(function() { addStrategicDetail(); }); // 전략물자관리 상세 팝업 > 전략물자 판정 List 에서 추가 버튼 클릭시( row 생성 )
	$('#btnPackageNoAdd2').click(function() { btnPackageNoAdd2Click(); });
	$('#btnCopyFile').click(function() { btnCopyFileClick(); });
	$('#btnPackageNoDelete').click(function() { deleteStrategicDetail(); }); // 전략물자관리 상세 팝업 > 전략물자 판정 List 삭제 버튼 클릭시
	$('#btnStrategicMgtInfoPopSave').click(function() { saveStrategicMaterial(); return false; }); // 전략물자관리 상세 팝업 > 저장 버튼 클릭
	$('.approval-func').click(function(obj) {
		var tagId = obj.currentTarget.id;
		switch(tagId) {
			case 'btnStrategicMgtInfoPopPreJudgment':
				requestJudgeStrategic();
				break;
			case 'btnStrategicMgtInfoPopPreApprove':
				requestApproveStrategic();
				break;
			case 'btnStrategicMgtInfoPopConApprove':
				requestConditionalApproveStrategic();
				break;
			case 'btnStrategicMgtInfoPopComJudgmented':
				judgeStrategic();//
				break;
			case 'btnStrategicMgtInfoPopComApproved':
				approveStrategic();
				break;
			case 'btnStrategicMgtInfoPopConApproved':
				conditionalApproveStrategic();
				break;
			case 'btnStrategicMgtInfoPopReturn':
				rejectStrategic();
				break;
			default:
				break;
		}
		return false;
	});
	$('#btnDeleteManualData').click(function() { deleteManualData(); return false; }); // 전략물자관리 상세 팝업 > 저장 버튼 클릭
	

	// 전략물자관리 상세 팝업(Modal)의 Comment Event List
	$('#btnCommentAdd').click(function() {
		$('#txtCommentAddPopComment').val("");
		$("#txtCommentAddPopComment").parent().find(".autocomplete-valid").hide();
		("Pre-Judgment" == currentStrategicMasterInfo.STR_STATUS || "Pre-Approved" == currentStrategicMasterInfo.STR_STATUS) ? $('#selBaseComment').show() : $('#selBaseComment').hide();
		$('#commentAddPop').modal('show'); // FIXME: 20211209, Comment 입력하는 모달창 뜨고 입력할 때 문자만 입력가능.. 띄어쓰기 지우기 버튼 입력안됨.. 하
		return false;
	});
	$('#selBaseComment').on('change', function() { $('#txtCommentAddPopComment').val($('#selBaseComment option:selected').val()); });
	$('#btnCommentAddPop').click(function() { addCommentRow(); }); // 전략물자관리 상세 팝업 > 코멘트 추가 팝업 > 추가 버튼 클릭시
	$('#btnCommentDelete').click(function () { deleteCommentRow(); }); // 전략물자관리 상세 팝업 > 코멘트 삭제 버튼 클릭시

	initCode();
}
// function initControls() end

function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);

	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList": paramList},
		success: function(data, textStatus, jqXHR) {
			var results = data.results;
			toDay = results.DAY[0].CUR_DAY;
			prev2monDay	= results.DAY[0].PREV_2_MON_DAY;
			// 검색 조건 초기 설정
			resetSearchControls();
			initTable();
		}
	});
	// 로그인 사용자에 따른 버튼 컨트롤
	//fn_btnControl();
}

function initTable(){
	// 본화면 search result grid
	var gridCode = getGridCode();
	var mainGridCol = {
		"Cfg": {
			"id": "mainGrid", "CfgId": "mainGridCfg", "SuppressCfg": "0", "StyleLap": "0", "Version": "2", "CacheTimeout" : "100", "Style": "Material"
			,"Size": "Small", "Scale": "90%", "ConstWidth": "100%", "MinTagHeight": "730", "MaxHeight": "1", "Paging": "2"
			,"PageLength": "20", "ChildParts": "2", "NoPager": "1", "Dragging": "0", "SelectingSingle": "0", "Adding": "0"
			,"Export": "1", "Deleting": "0", "ConstHeight": "1", "SafeCSS": "1", "Sorting": "1", "Code" : gridCode,"CopyCols" : "0"
		},
		"Toolbar": {"Cells20Data": "Export", "Cells60Cfg": "Columns", "Cells70Styles": "Styles, Sizes, Scales", "Visible": "1"},
		"Panel": {"Visible": "1", "Spanned": "0"},
		"LeftCols": [
			{"Name": "ROWNUM", 			"Width": "80", 	"Type": "Int", 	"Spanned": "1", "Class": "gridBorderText", 	"CanEdit": "0", "Align": "center"},	// No.
			{"Name": "SHIPPING_REQ_NO", "Width": "150", "Type": "Text", "Spanned": "1", "Class": "gridLinkText", 	"CanEdit": "0", "Align": "center", "OnClickCell": "openModalDetail(Grid, Row, Col);"} // 출하요청 번호
		],
		"Cols": [
			{"Name": "PROJECT_ID"				 , "Width": "120", "Type": "Text", "Spanned": "1", "Class": "gridBorderText"				 , "CanEdit": "0", "Align": "center"} // PJT
			,{ "Name": "PROJECT_DESC"			 , "Width": "250", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "left"} // PJT_DESC
			,{ "Name": "INVOICE_NO"				 , "Width": "190", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center"} // INVOCE_NO
			,{ "Name": "STRATEGIC_ITEM_YN"		 , "Width": "100", "Type": "Bool", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "BoolIcon": "4"} //전략물자포함여부(전략물자대상) Y/N
			,{ "Name": "FOB_YN"		 			 , "Width": "100", "Type": "Bool", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "BoolIcon": "4"} //FOB 매뉴얼 생성 건
			,{ "Name": "SPECIAL_SHIPPING_YN"	 , "Width": "100", "Type": "Bool", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "BoolIcon": "4"} //특송 여부
			,{ "Name": "STATUS_NM"				 , "Width": "120", "Type": "Text", "Spanned": "1", "Class": "gridLinkText"  , "CanMove" : "0", "CanEdit": "0", "Align": "center", "OnClickCell": "openModalStatus(Grid, Row, Col);"} // 승인상태
			,{ "Name": "JUDGMENT_DATE"			 , "Width": "90",  "Type": "Date", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "Format": "yyyy/MM/dd"} //판0정일
			,{ "Name": "JUDGED_BY_NM"			 , "Width": "120", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center"} //판정자
			,{ "Name": "APPROVED_DATE"			 , "Width": "90",  "Type": "Date", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "Format": "yyyy/MM/dd"} // 승인완료 날짜
			,{ "Name": "APPROVER_NM"			 , "Width": "120", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center"} // 승인자
			,{ "Name": "CREATED_BY_NM"			 , "Width": "120", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center"} // 생성자
			,{ "Name": "CREATION_DATE"			 , "Width": "90",  "Type": "Date", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "Format": "yyyy/MM/dd"} // 생성일
			,{ "Name": "LAST_UPDATED_BY_NM"		 , "Width": "120", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center"} // 수정자
			,{ "Name": "LAST_UPDATE_DATE"		 , "Width": "90",  "Type": "Date", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center", "Format": "yyyy/MM/dd"} // 수정일
			,{ "Name": "EXPORT_PERMISSION_NUMBER", "Width": "0"	,  "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "right"} // 수출허가증 번호
			,{ "Name": "STR_STATUS"				 , "Width": "0"	,  "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // 승인상태
			,{ "Name": "ATTACH_GRP_CD"			 , "Width": "0"	,  "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // 첨부파일 grp_cd
			,{ "Name": "REQ_MASTER_ID"			 , "Width": "0"	,  "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // 운송요청 REQUEST MASTER ID
			,{ "Name": "JUDGMENT_TYPE"			 , "Width": "0"	,  "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "0", "CanEdit": "0", "Align": "center"} // 판정분류
			,{ "Name": "SHI_STATUS"				 , "Width": "0"	,  "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // 출하요청상태
		],
		"Head": [{
				"Kind": "Header"
				,"Class": "gridCenterText"
				,"id": "Header"
				,"Spanned": "1"
				,"ROWNUM": "No."
				,"SHIPPING_REQ_NO": "출하요청번호"
				,"PROJECT_ID": "PJT"
				,"PROJECT_DESC": "PJT DESC"
				,"INVOICE_NO": "Invoice No."
				,"STRATEGIC_ITEM_YN": "전략물자 포함여부"
				,"FOB_YN": "FOB 여부"
				,"SPECIAL_SHIPPING_YN": "특송 여부"
				,"STATUS_NM": "승인상태"
				,"JUDGED_BY_NM": "판정자"
				,"JUDGMENT_DATE": "판정일"
				,"APPROVED_DATE": "승인완료 날짜"
				,"APPROVER_NM": "승인자"
				,"CREATED_BY_NM": "생성자"
				,"CREATION_DATE": "생성일"
				,"LAST_UPDATED_BY_NM": "수정자"
				,"LAST_UPDATE_DATE": "수정일"
				,"EXPORT_PERMISSION_NUMBER": "수출허가신고 번호"
				,"STR_STATUS": "승인상태코드"
				,"ATTACH_GRP_CD": "첨부파일 grp_cd"
				,"REQ_MASTER_ID": "운송요청 REQUEST MASTER ID"
				,"JUDGMENT_TYPE": "판정분류"
				,"SHI_STATUS": "출하요청상태"
		}]
	};

	// 팝업 화면 Packing List grid
	var dlgEditPackingDetailGridCol = {
		"Cfg": {
			"id": "transShippingRequestDlgEditPackingDetailGrid", "CfgId": "transShippingRequestDlgEditPackingDetailGridCfg"
			,"SuppressCfg": "0", "StyleLap": "0", "Version": "1", "CacheTimeout" : "100", "Style": "Material", "Size": "Small", "Scale": "90%"
			,"ConstWidth": "100%", "MinTagHeight": "176", "MaxHeight": "1", "Paging": "2", "PageLength": "20", "ChildParts": "2"
			,"NoPager": "1", "Dragging": "0", "SelectingSingle": "1", "Adding": "0", "Export": "1", "Deleting": "0", "ConstHeight": "1"
			,"SafeCSS": "1", "Sorting": "0", "Code" : gridCode,"CopyCols" : "0"
		},
		"Panel": {"Visible" : "0"},
		"Toolbar": {"Visible" : "0"},
		"Cols": [
			{"Name": "NUM"						, "Width": "70"	, "Type": "Text", "CanEdit": "0", "Class": "gridBorderText gridTextColor gridCenterText"}
			,{"Name": "PACKAGE_NO"				, "Width": "180", "Type": "Text", "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Align": "center"}
			,{"Name": "DESCRIPTION"				, "Width": "180", "Type": "Text", "CanEdit": "0", "Class": "gridBorderText gridTextColor"}
			,{"Name": "PACKING_TYPE"			, "Width": "110", "Type": "Text", "CanEdit": "0", "Class": "gridBorderText gridTextColor"}
			,{"Name": "SHIPPING_DIMENSION_L"	, "Width": "90"	, "Type": "Int"	, "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Format": "###,###,###,##0.####"}
			,{"Name": "SHIPPING_DIMENSION_W"	, "Width": "90"	, "Type": "Int"	, "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Format": "###,###,###,##0.####"}
			,{"Name": "SHIPPING_DIMENSION_H"	, "Width": "90"	, "Type": "Int"	, "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Format": "###,###,###,##0.####"}
			,{"Name": "SHIPPING_VOLUME"			, "Width": "160", "Type": "Int"	, "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Format": "###,###,###,##0.####"}
			,{"Name": "NET_WEIGHT"				, "Width": "120", "Type": "Int"	, "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Format": "###,###,###,##0.####"}
			,{"Name": "GROSS_WEIGHT"			, "Width": "140", "Type": "Int"	, "CanEdit": "0", "Class": "gridBorderText gridTextColor", "Format": "###,###,###,##0.####"}
			,{"Name": "HAZARDOUS_MATERIAL_FLAG"	, "Width": "160", "Type": "Text", "CanEdit": "0", "Class": "gridBorderText gridTextColor"}
		],
		"Header": {
			"NUM": "No."
			,"PACKAGE_NO": "Package No."
			,"Class": "gridCenterText"
			,"DESCRIPTION": "Description"
			,"PACKING_TYPE": "Packing Style"
			,"SHIPPING_DIMENSION_L": "Length"
			,"SHIPPING_DIMENSION_W": "Width"
			,"SHIPPING_DIMENSION_H": "Height"
			,"SHIPPING_VOLUME": "Shipping Volume(M3)"
			,"NET_WEIGHT": "Net Weight(kg)"
			,"GROSS_WEIGHT": "Gross Weight(kg)"
			,"HAZARDOUS_MATERIAL_FLAG": "Hazardous Material"
		},
		"Foot": [
			{
				"Calculated": "1",
				"CanEdit": "0",
				"PACKAGE_NOFormula": "\"합계\"",
				"SHIPPING_VOLUMEFormula": "sum()",
				"NET_WEIGHTFormula": "sum()",
				"GROSS_WEIGHTFormula": "sum()",
				"Class" : "gridLinkText"
			}
		]
	};

	// 팝업 전략물자 판정 대상 List grid
	var packageNoDetailGridCol = {
		"Cfg": {
			"id": "idPackageNoDetailGrid", "CfgId": "idPackageNoDetailGridCfg", "SuppressCfg": "0", "StyleLap": "0", "Version": "2", "CacheTimeout" : "100"
			, "Style": "Material", "Size": "Small", "Scale": "90%", "ConstWidth": "100%", "MinTagHeight": "152", "MaxHeight": "1"
			, "Paging": "2", "PageLength": "20", "ChildParts": "2", "NoPager": "1", "Dragging": "0", "SelectingSingle": "0"
			, "Adding": "0", "Export": "1", "Deleting": "0", "SafeCSS": "1", "Sorting": "1", "Code" : gridCode,"CopyCols" : "0"
		},
		"Toolbar": {"Visible" : "0"},
		"Panel": {"Visible"	: "1"},
		"Cols": [
			{"Name": "ROWNUM"							, "Width": "80"	, "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "0" , "Align": "center"}
			,{"Name": "STRATEGIC_ITEM_YN"				, "Width": "150", "Type": "Select"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center", "Defaults": "||Y|N"} // 전략물자포함여부(전략물자대상) Y/N
			,{"Name": "CATCH_ALL_YN"					, "Width": "150", "Type": "Select"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center", "Defaults": "||Y|N"} // 전략물자포함N일 때 catch_all 여부 Y/N
			,{"Name": "JUDGMENT_TYPE"					, "Width": "150", "Type": "Select"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center", "Defaults": "||공급업체 전문판정|두산에너빌리티(주) 자가판정|두산에너빌리티(주) 전문판정"} // 판정종류( ab: 공급업체 전문판정, ba: 두산중공업 자가판정, bb: 두산중공업 전문판정 )
			,{"Name": "CERTIFICATE_ORGANIZATION"		, "Width": "150", "Type": "Select"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center", "Defaults": "||전략물자관리원|한국원자력통제기술원|방위사업청"} // 판정기관
			,{"Name": "CERTIFICATE_NUMBER"				, "Width": "150", "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center", "EditMask": "^[0-9]*$", "MaskColor": "red"} // 판정서 번호
			,{"Name": "EXPORT_PERMISSION_ORGANIZATION"	, "Width": "150", "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "0" , "Align": "center"} // 수출허가기관, "Defaults": "||산업통상자원부|원자력안전위원회|방위사업청"
			,{"Name": "EXPORT_PERMISSION_NUMBER"		, "Width": "150", "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center", "EditMask": "^[0-9]*$", "Size": "16", "MaskColor": "red", "ResultMask": "[0-9]{16}", "ResultMessage": "수출신고번호의 자리수는 16자리입니다. <br>확인 후 다시 입력해주세요."} // 수출허가증 번호
			,{"Name": "STRATEGIC_MASTER_ID"				, "Width": "0"	, "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center"} // 전략물자SEQ
			,{"Name": "STRATEGIC_DETAIL_ID"				, "Width": "0"	, "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center"} // 전략물자 DEATIL SEQ
			,{"Name": "ROW_TYPE"						, "Width": "0"	, "Type": "Text"	, "Spanned": "1", "Class": "gridBorderText"	, "CanMove" : "1", "CanEdit": "1" , "Align": "center"} // i: 생성. 삭제는 버튼으로. i 아니면 무조건 수정
		],
		"Head" : [{
			"Kind": "Header"
			,"Class": "gridCenterText"
			,"id": "Header"
			,"Spanned": "1"
			,"ROWNUM": "No."
			,"STRATEGIC_ITEM_YN": "전략물자 포함"
			,"CATCH_ALL_YN": "Catch All"
			,"JUDGMENT_TYPE": "판정종류"
			,"CERTIFICATE_ORGANIZATION": "판정기관"
			,"CERTIFICATE_NUMBER": "판정서 번호"
			,"EXPORT_PERMISSION_ORGANIZATION": "수출허가기관"
			,"EXPORT_PERMISSION_NUMBER": "수출허가증 번호"
			,"STRATEGIC_MASTER_ID": "전략물자SEQ"
			,"STRATEGIC_DETAIL_ID": "전략물자 DEATIL SEQ"
			,"ROW_TYPE": "ROW_TYPE"
		}]
	};

	// 팝업 Comment grid
	var commentGridCol = {
		"Cfg": {
			"id": "idCommentGrid", "CfgId": "idCommentGridCfg", "SuppressCfg": "0", "StyleLap": "0", "Version": "2", "CacheTimeout" : "100", "Style": "Material", "Size": "Small",
			"Scale": "90%", "ConstWidth": "100%", "MinTagHeight": "120", "MaxHeight": "1", "Paging": "2", "PageLength": "20", "ChildParts": "2",
			"NoPager": "1", "Dragging": "0", "SelectingSingle": "0", "Adding": "0", "Export": "1", "Deleting": "0", "SafeCSS": "1", "Sorting": "1", "Code" : gridCode,"CopyCols" : "0"
		},
		"Toolbar" : {"Visible" : "0"},
		"Panel" : {"Visible"	: "1"},
		"Cols": [
			{"Name": "ROWNUM"					, "Width": "50"	, "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"}
			,{"Name": "COMMENTS"				, "Width": "580", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "left"}
			,{"Name": "CREATED_BY_NM"			, "Width": "100", "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // 생성자
			,{"Name": "CREATION_DATE"			, "Width": "90"	, "Type": "Date", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center", "Format": "yyyy/MM/dd"} // 생성일
			,{"Name": "STRATEGIC_COMMENT_ID"	, "Width": "0"	, "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // seq
			,{"Name": "CREATED_BY"				, "Width": "0"	, "Type": "Text", "Spanned": "1", "Class": "gridBorderText", "CanMove" : "1", "CanEdit": "0", "Align": "center"} // 생성자
		],
		"Head" : [{
			"Kind": "Header"
			,"Class": "gridCenterText"
			,"id": "Header"
			,"Spanned": "1"
			,"ROWNUM": "No."
			,"COMMENTS": "Comments"
			,"CREATED_BY_NM": "생성자"
			,"CREATION_DATE": "생성일"
			,"STRATEGIC_COMMENT_ID": "seq"
			,"CREATED_BY": "생성자"
		}]
	};

	// 본화면 Project Code 검색 팝업 grid
	var dlgProjectGridCol = {
		"Cfg": {
			"id": "idsmDlgProjectGrid", "CfgId": "idsmDlgProjectGridCfg", "SuppressCfg": "0", "StyleLap": "0", "Version": "1", "CacheTimeout" : "100"
			, "Style": "Material", "Size": "Small", "Scale": "90%", "ConstWidth": "100%", "MinTagHeight": "300", "MaxHeight": "1"
			, "Paging": "2", "PageLength": "20", "ChildParts": "2", "NoPager": "1", "Dragging": "0", "SelectingSingle": "1"
			, "Adding": "0", "Export": "1", "Deleting": "0", "SafeCSS": "1", "Sorting": "0", "Code" : gridCode,"CopyCols" : "0","CopyCols" : "0"
		},
		"Toolbar": {"Visible" : "0"},
		"Panel": {"Visible" : "1"},
		"Cols": [
			{"Name": "PROJECT_CODE"	, "Width": "150", "Type": "Text", "Align": "center" , "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick(Grid, Row, Col);"}	// Project Code
			,{"Name": "PROJECT_DESC", "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick(Grid, Row, Col);"}	// Project Description
		],
		"Header": {
			"PROJECT_CODE": "Project Code"
			,"Class": "gridCenterText"
			,"PROJECT_DESC": "Project Description"
		}
	};

	// 본화면 전략물자 메인 grid에서 승인상태 팝업에서 나오는 grid
	var strategicMgtStatusPopGridCol = {
		"Cfg": {
			"id": "strategicMgtStatusPopGridId", "CfgId": "strategicMgtStatusPopGridCfg", "SuppressCfg": "0", "StyleLap": "0"
			, "Version": "1", "CacheTimeout" : "100", "Style": "Material", "Size": "Small", "Scale": "90%", "ConstWidth": "100%", "MinTagHeight": "44"
			, "MaxHeight": "1", "Paging": "2", "PageLength": "20", "ChildParts": "2", "NoPager": "1", "Dragging": "0"
			, "SelectingSingle": "1", "Adding": "0", "Export": "1", "Deleting": "0", "SafeCSS": "1", "Sorting": "0", "Code" : gridCode,"CopyCols" : "0"
		},
		"Toolbar": {"Visible": "0"},
		"Panel": {"Visible": "1"},
		"Cols" : [
			{"Name": "SHIPPING_REQ_NO"				, "Width": "90"	, "Type": "Text", "Align": "center", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"}	// 요청번호
			,{"Name": "SHI_STATUS"					, "Width": "130", "Type": "Text", "Align": "center", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"}	// 출하요청상태
			,{"Name": "STRATEGIC_ITEM_YN"			, "Width": "100", "Type": "Bool", "Align": "center", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "BoolIcon": "4"}	// 전략물자
			,{"Name": "EXPORT_PERMISSION_NUMBER"	, "Width": "140", "Type": "Text", "Align": "center", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"}	// 수출신고허가서
			,{"Name": "STATUS_NM"					, "Width": "140", "Type": "Text", "Align": "center", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"}	// 전략물자승인상태
		],
		"Header": {
			"SHIPPING_REQ_NO": "요청번호"
			,"SHI_STATUS": "출하요청상태"
			,"STRATEGIC_ITEM_YN": "전략물자"
			,"EXPORT_PERMISSION_NUMBER": "수출신고허가서"
			,"STATUS_NM": "전략물자승인상태"
		}
	};

	mainGrid = TreeGrid({
			Layout: {Data: mainGridCol},
			Data: {Data: {Body: [[]]}},
			Text: {Url : gridLangUrl} 
		}, "gridMain");

	// 전략물자 판정 List 목록
	packageNoDetailGrid = TreeGrid({
			Layout: {Data: packageNoDetailGridCol},
			Data: {Data: {Body: [[]]}}								
		}, "gridPackageNoDetail");

	// Comment 목록
	commentGrid = TreeGrid({
			Layout: {Data: commentGridCol},
			Data: {Data: {Body: [[]]}}								
		}, "gridComment");

	// 프로젝트 조회
	dlgProjectGrid = TreeGrid({
			Layout: {Data: dlgProjectGridCol},
			Data: {Data: {Body: [[]]}}
		}, "gridDlgProject");

	// Packing List
	dlgEditPackingDetailGrid = TreeGrid({
			Layout: {Data: dlgEditPackingDetailGridCol},
			Data: {Data: {Body: [[]]}},
			Text: {Url: gridLangUrl}
		}, "dlgEditPackingDetail");

	// 전략물자 상태
	strategicMgtStatusPopGrid = TreeGrid({
			Layout: {Data: strategicMgtStatusPopGridCol},
			Data: {Data: {Body: [[]]}}
		}, "gridStrategicMgtStatusPop");
		
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
}
// function initTable() end

// 로그인 사용자에 따른 버튼 컨트롤
function fn_btnControl() {
	txtRoleName =  $("#txtRoleName").val();
	// 2021.11.11. 롤 코드가 개발과 운영이 달라 한글로 구분
	if(txtRoleName.indexOf("시스템관리자") >= 0 || txtRoleName.indexOf("전략물자담당자") >= 0) {
		$("#toolbar").show();
	}
	else {
		$("#toolbar").hide();
	}
}

// 전략물자관리 상세 팝업 > 첨부파일 셋팅
function initFileInput(obj_id) {
	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme: "explorer"
		,language: "kr"
		,showUpload: false
		,hideThumbnailContent: true
		,overwriteInitial: false
		,validateInitialCount: true
	});

	$(".btn-file").css("padding-top", "3px");
	$(".btn-file").css("height", "26px");
	$(".file-caption").css("height", "26px");
	$(".file-caption").css("padding-top", "3px");
	$(".file-caption").css("padding-bottom", "3px");
}

// 목록 cell 색상 변경
function fnSetMainGridRowColor(grid) {
	var list = grid.Rows;
	for (var key in list) {
		var gridRow = list[key];
		// 조건부승인완료
		if("Conditional-Approved" == gridRow.STR_STATUS) {
			gridRow.STATUS_NMBackground	= "#ffe696";
			grid.RefreshRow(gridRow);
		}
	}
}

// 달력 셋팅
function initDatePicker() {
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	$("input[name=inpDatePicker]").datepicker({
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
// ######################################## Setup Function List End ########################################
// ######################################## Search Box Function List ########################################
// 검색 조건 초기 설정
function resetSearchControls() {
	$("#txtSearchProjectCode").val("");
	$("#txtSearchProjectName").val("");
	$("#txtSearchCertificateNumber").val( "");		// 판정서번호
	$("#txtSearchshippingReqNo").val("");			// 요청번호
	$("#txtSearchCreationDateSt").val(prev2monDay);	// 생성일 시작
	$("#txtSearchCreationDateEd").val(toDay);		// 생성일 끝
	$("#selSearchStatus").val("");					// 판정상태
	$("#selSearchJudgmentType").val("");			// 판정분류
	$("#txtSearchProjectCode").parent().find(".autocomplete-valid").hide();
}

// 목록 조회
function btnSearchClick() {
	var roleName = $.trim($("#txtRoleName").val());
	var incompleteYn = "Y";

	// 전략물자담당자는 작성중 상태의항목이 보이지 않도록
	if(roleName.indexOf("전략물자담당자") >= 0) {
		incompleteYn= "N";
	}

	$.ajax({
		url: "/selectStrategicMgtList.do",
		data: {
			"projectCode": $.trim($("#txtSearchProjectCode").val())					// Project Code
			,"certificateNumber": $.trim($("#txtSearchCertificateNumber").val())	// 판정서 번호
			,"shippingReqNo": $.trim($("#txtSearchshippingReqNo").val()) 			// 운송요청 번호
			,"invoiceNo": $.trim($("#txtSearchInvoiceNo").val()) 					// Invoice No.
			,"creationDateSt": $.trim($("#txtSearchCreationDateSt").val())			// 생성일 시작
			,"creationDateEd": $.trim($("#txtSearchCreationDateEd").val())			// 생성일 끝
			,"status": $.trim($("#selSearchStatus").val())							// 판정상태
			,"judgmentType": $.trim($("#selSearchJudgmentType").val())				// 판정분류
			,"incompleteYn": incompleteYn
			,"strategicItemYn": $.trim($("#selStrategicItemYn").val())				// 전략물자 포함 여부
			,"fobYn": $.trim($("#selFobYn").val())									// FOB 여부
			,"specialShippingYn": $.trim($("#selSpecialShippingYn").val())			// 특송 여부
		},
		success: function(data, textStatus, jqXHR) {
			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.Reload();
		}
	});
}

function iconSearchClick() {
	$('#dlgStrategicMgtProjectList').click();
	$('#txtDlgProjectProjectCode').val($('#txtSearchProjectCode').val());
	$('#dlgStrategicMgtProjectListMode').val('MAIN');
	$('#dlgStrategicMgtProjectList').modal('show');
	dlgStrategicMgtProjectListSearch();
}

function iconNewProjectSearchClick() {
	$('#dlgStrategicMgtProjectList').click();
	$('#txtDlgProjectProjectCode').val($('#txtMgtInfoNewProjectId').val());
	$('#dlgStrategicMgtProjectListMode').val('POPUP');
	$('#dlgStrategicMgtProjectList').modal('show');
	dlgStrategicMgtProjectListSearch();
}

function dlgStrategicMgtProjectListSearch() {
	$.ajax({
		url: "/getTransDlgProject.do"
		, data: {"keyword": $('#txtDlgProjectProjectCode').val()}
		, success: function(data, textStatus, jqXHR) {
			dlgProjectGrid.Source.Data.Data.Body = [data.results];
			dlgProjectGrid.ReloadBody();
		}
	});
}

// Project 조회 팝업 그리드 더블 클릭 시 오프너로 값 넘겨 주기
function gridProjectListDbClick(grid, row, col) {
	$("#txtSearchProjectCode").val( row.PROJECT_CODE);
	$("#txtSearchProjectName").val( row.PROJECT_DESC);
	$('#dlgStrategicMgtProjectList').modal('hide');
}
// ######################################## Search Box Function List End ########################################
// ######################################## mainGrid(gridMain) Event List ########################################
function fnMainBtnEvent(btnNm) {
	var parmList = [];					// 서버로 넘길 잔자물자seq 목록
	var tmpList = mainGrid.GetSelRows();// 메인 목록에서 선택 한 임시 목록
	var confirmMessage = "";					// 메시지

	for(var i = 0; i < tmpList.length; i++) {
		var row = tmpList[i];
		var strStatus = row.STR_STATUS;

		if("Pre-Judgment" != strStatus && "Pre-Approved" != strStatus && "Pre-Conditional-Approved" != strStatus) {
			alert("판정요청, 승인요청, 조건부승인요청 상태만 가능 합니다.");
			return false;
		}
	} // end for

	if(0 == tmpList.length) {
		// 선택된 항목이 없습니다.
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	switch(btnNm) {
		case 'conApproved' :
			confirmMessage = "조건부승인완료 하시겠습니까?";
			break;
		case 'return':
			confirmMessage = "반려 하시겠습니까?";
			break;
		case 'comApproved':
			confirmMessage = "판정관련 첨부문서가 첨부되었는지 확인해주세요.\n승인완료하시겠습니까?";
			break;
		default:
			alert("관리자에게 문의 바랍니다.[err54703]");
			return false;
	}

	if(confirm(confirmMessage)) {
		for(var i = 0; i < tmpList.length; i++) {
			var row = tmpList[i];
			var updateRow = {"strategicMasterId": row.STRATEGIC_MASTER_ID};
			parmList.push(updateRow);
		} // end for

		var list = JSON.stringify(parmList);
		var paramData = {
			"parmList": list,
			"btnType": btnNm
		};

		$.ajax({
			url: "/updateStrategicMgtListStatus.do",
			data: paramData,
			success: function(result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				}
				else {
					alert_success('완료하였습니다.');
					// 목록 조회
					btnSearchClick();
				}
			}
		});
	}
}

function openModalStatus(grid, row, col) {
	// FIXME: 상태관련 표시 grid 에 수출허가서 관련 정보 빼거나 입력 여부 Y/N으로 퉁치기..
	// FIXME: 상태관련 메세지 고치기..
	currentStrategicMasterInfo = row;
	var currentStrategicMasterStatus = row.STR_STATUS;

	strategicMgtStatusPopGrid.Source.Data.Data.Body = [[]];
	strategicMgtStatusPopGrid.ReloadBody();
	var strategicItemYn = currentStrategicMasterInfo.STRATEGIC_ITEM_YN;		// 전략물자
	var exportPermissionNumber = currentStrategicMasterInfo.EXPORT_PERMISSION_NUMBER;// 수출신고허가서
	var statusNNm = currentStrategicMasterInfo.STATUS_NM;				// 전략물자승인상태

	var statusRow = strategicMgtStatusPopGrid.AddRow(null, null, 1 , null , null);
	statusRow.SHIPPING_REQ_NO = currentStrategicMasterInfo.SHIPPING_REQ_NO;			// 요청번호
	statusRow.SHI_STATUS = currentStrategicMasterInfo.SHI_STATUS;				// 출하요청상태
	statusRow.STRATEGIC_ITEM_YN = strategicItemYn;			// 전략물자
	statusRow.EXPORT_PERMISSION_NUMBER = exportPermissionNumber;	// 수출신고허가서
	statusRow.STATUS_NM = statusNNm;				// 전략물자승인상태

	strategicMgtStatusPopGrid.RefreshRow(statusRow);

	switch(currentStrategicMasterStatus) {
		case 'Incomplete':
			if("0" == strategicItemYn) {
				$("#labStrategicMgtStatusPopInfo").html(text01_01);
			}
			else if("1" == strategicItemYn) {
				if(null == exportPermissionNumber || "" == exportPermissionNumber) {
					$("#labStrategicMgtStatusPopInfo").html(text02_01);
				}
				else {
					$("#labStrategicMgtStatusPopInfo").html(text02_01);
				}
			}
			// 이미지 설명 들어가는 부분
			//$("#imgStrategicMgtStatusPop").attr( "src", "/resources/images/strategicMgt/testImg003.jpg" );
			break;
		case 'Pre-Judgment':
			if("0" == strategicItemYn) {
				$("#labStrategicMgtStatusPopInfo").html(
					text01_02
					+ "<br>&nbsp;&nbsp;- Offline으로 판정한 결과를 반영 한 후 판정완료 또는 승인완료해주세요."
					+ "<br>&nbsp;&nbsp;- 판정완료] 판정결과를 반영하고 PM이 추가 작업이 필요한 경우."
					+ "<br>&nbsp;&nbsp;- 승인완료] 판정결과를 반영하였고 바로 승인이 가능한 상태인 경우."
				);
			}
			else if("1" == strategicItemYn) {
				if(null == exportPermissionNumber || "" == exportPermissionNumber) {
					$("#labStrategicMgtStatusPopInfo").html(text02_02);
				} else {
					$("#labStrategicMgtStatusPopInfo").html(text03_02);
				}
			}
			break;
		case 'Pre-Approved':
			if("0" == strategicItemYn) {
				$("#labStrategicMgtStatusPopInfo").html(text01_03);
			} else if("1" == strategicItemYn) {
				if(null == exportPermissionNumber || "" == exportPermissionNumber) {
					$("#labStrategicMgtStatusPopInfo").html("");
				} else {
					$("#labStrategicMgtStatusPopInfo").html(text01_03);
				}
			}
			break;
		case 'Pre-Conditional-Approved':
			$("#labStrategicMgtStatusPopInfo").html(text01_04);
			// 이미지 설명 들어가는 부분
			//$("#imgStrategicMgtStatusPop").attr( "src", "/resources/images/strategicMgt/testImg004.jpg" );
			break;
		case 'Judged':
			$("#labStrategicMgtStatusPopInfo").html(text01_05);
			break;
		case 'Approved':
			if("0" == strategicItemYn) {
				$("#labStrategicMgtStatusPopInfo").html(text01_06);
			}
			else if("1" == strategicItemYn) {
				if(null == exportPermissionNumber || "" == exportPermissionNumber) {
					$("#labStrategicMgtStatusPopInfo").html("");
				}
				else {
					$("#labStrategicMgtStatusPopInfo").html(text01_06);
				}
			}
			break;
		case 'Conditional-Approved':
			$("#labStrategicMgtStatusPopInfo").html(text01_07);
			break;
		case 'Rejected':
			$("#labStrategicMgtStatusPopInfo").html(text01_08);
			break;
		default:
			alert("관리자에게 문의 바랍니다.[err54702]");
			return false;
	}

	$('#strategicMgtStatusPop').modal('show'); // 전략물자 상태 팝업 오픈
}

function openConfirmModalDetail(grid, row, col, isCreate) {
	if(isCreate != null && isCreate) {
		confirm_modal("", $('#confirmFobCreate').val(), null, function (callobj, result) {
			if(result) openModalDetail(grid, row, col, isCreate);
			else return false;
		});
	}
}

function openModalDetail(grid, row, col, isCreate) {
	isStrategicCreate = isCreate;
	var isManualEdit = (row != null && row.IS_MANUAL_STRATEGIC == 'Y' && (row.STR_STATUS == 'Incomplete' || row.STR_STATUS == 'Rejected'));
	$('#mgtInfoPop').find(':input').each(function(i) {
		if(this.tagName.toLowerCase() != 'button') {
			if(isCreate || isManualEdit) {
				if(this.type.toLowerCase() == 'text' && !$(this).hasClass('readonly')) {
					$(this).removeAttr('readonly');
					$(this).addClass('required');
				} else {
					$(this).removeAttr('disabled');
				}
				$(this).val($(this).attr('id') == 'selMgtInfoPopStrategicItemYn' ? 
					'N' : $(this).attr('id') == 'txtMgtInfoPopShippingReqNo' ? '(자동생성)' : '');
			} else {
				$(this).val('');
				(this.type.toLowerCase() == 'text') ? $(this).attr('readonly', true) : $(this).attr('disabled', true);
				$(this).removeClass('required');
			}
		}
	});
	$("#txtMgtInfoPopIsSpecialShipping").attr("disabled",true); // 위에서 빠지는 부분 다시 넣기..
	$("#txtMgtInfoPopIsFOB").attr("disabled",true);

	initFileInput("txtStrategicMgtInfoPopFile"); // 전략물자관리 상세 팝업 > 첨부파일 셋팅

	var selectRowStatus = ''; // var selectRowStatus = 'Incomplete'; // 헷갈림
	if(isCreate) {
		$('#mgtInfoPopProjectId').hide();
		$('#mgtInfoNewPopProjectId').show();
		$('#txtMgtInfoPopDeliveryTerms').hide();
		$('#selMgtInfoPotDeliveryTerms').show();
		$('#mgtInfoNewPopDeliveryTerms').show();
		$('#txtDlgEditDeptName').hide();
		$('#txtDlgEditVendorName').show();
		$('#txtMgtInfoPopDutyRefundOption').hide();
		$('#selMgtInfoPopDutyRefundOption').show();
		initRequestEditPopUpCode(false);
		$('#txtMgtInfoPopShopOutDate').datepicker({
			changeMonth: true,
			changeYear: true,
			dateFormat: "yy/mm/dd",
		});
		
		currentStrategicMasterInfo = {};
		$('#txtMgtInfoPopIsFOB').prop("checked", true);
		selectRowStatus = 'Incomplete';
	} else if(isManualEdit) {
		$('#mgtInfoPopProjectId').hide();
		$('#mgtInfoNewPopProjectId').show();
		$('#txtMgtInfoPopDeliveryTerms').hide();
		$('#selMgtInfoPotDeliveryTerms').show();
		$('#mgtInfoNewPopDeliveryTerms').show();
		$('#txtDlgEditDeptName').hide();
		$('#txtDlgEditVendorName').show();
		$('#txtMgtInfoPopDutyRefundOption').hide();
		$('#selMgtInfoPopDutyRefundOption').show();
		initRequestEditPopUpCode(false);
		$('#txtMgtInfoPopShopOutDate').datepicker({
			changeMonth: true,
			changeYear: true,
			dateFormat: "yy/mm/dd",
		});
		
		if(row.Added != null && row.Added == 1) {
			return false;
		}

		if(row.Fixed != null) {
			return false;
		}
		
		currentStrategicMasterInfo = row;
		selectRowStatus = row.STR_STATUS;
	} 
	else if(row != null && row.IS_MANUAL_STRATEGIC == 'Y' && !(row.STR_STATUS == 'Incomplete' || row.STR_STATUS == 'Rejected')) {
		// isManualEdit 이지만 기 승인된 항목들에 대해서.. Sel을 가져와야 value 업데이트가 가능하여 추가된 조건임..
		// 여기서 initRequestEditPopUpCode 이 부분 indpetCode를 값에 맞게 바뀔 수 있도록 추후 수정 필요함..
		$('#mgtInfoPopProjectId').show();
		$('#mgtInfoNewPopProjectId').hide();
		$('#txtMgtInfoPopDeliveryTerms').show();
		$('#selMgtInfoPotDeliveryTerms').hide();
		$('#mgtInfoNewPopDeliveryTerms').hide();
		$('#txtMgtInfoPopShopOutDate').datepicker('destroy');
		$('#txtMgtInfoPopDutyRefundOption').show();
		$('#selMgtInfoPopDutyRefundOption').hide();
		initRequestEditPopUpCode(true);
		if(row.Added != null && row.Added == 1) {
			return false;
		}

		if(row.Fixed != null) {
			return false;
		}

		currentStrategicMasterInfo = row;
		selectRowStatus = row.STR_STATUS;
	}
	else {
		$('#mgtInfoPopProjectId').show();
		$('#mgtInfoNewPopProjectId').hide();
		$('#txtMgtInfoPopDeliveryTerms').show();
		$('#selMgtInfoPotDeliveryTerms').hide();
		$('#mgtInfoNewPopDeliveryTerms').hide();
		$('#txtMgtInfoPopShopOutDate').datepicker('destroy');
		$('#txtMgtInfoPopDutyRefundOption').show();
		$('#selMgtInfoPopDutyRefundOption').hide();
		
		if(row.Added != null && row.Added == 1) {
			return false;
		}

		if(row.Fixed != null) {
			return false;
		}

		currentStrategicMasterInfo = row;
		selectRowStatus = row.STR_STATUS;
	}

	//$('#btnPackageNoExcelUpload').hide(); // 전략물자판정 List Excel Upload
	// 작성중
	if("Incomplete" == selectRowStatus) {
	
		$('#btnStrategicMgtInfoPopSave').show();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').show();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').show();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
		$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
		$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').show();
		$('#btnCopyFile').show();			
		$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = true;
		btnConApprove = true;	
		
		$('#btnDeleteManualData').hide(); // 삭제
		if(isManualEdit) {
			$('#btnDeleteManualData').show();
		}
		
		/*
		// 2021.11.11. 롤 코드가 개발과 운영이 달라 한글로 구분
		if("시스템관리자" == txtRoleName || "사업관리담당자" == txtRoleName || "프로젝트담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').show();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').show();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').show();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').show();
			$('#btnCopyFile').show();
			$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = true;
			btnConApprove = true;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').hide();
			$('#btnCopyFile').hide();
			$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').hide();	// Comment 추가
			$('#btnCommentDelete').hide();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	// 판정요청
	else if("Pre-Judgment" == selectRowStatus) {
		$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').hide();
		$('#btnCopyFile').hide();
		$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').hide();	// Comment 추가
		$('#btnCommentDelete').hide();	// Comment 삭제
		
		$('#btnStrategicMgtInfoPopSave').hide();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').show();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').show();	// 승인완료
		//$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopConApproved').show();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').show();	// 반려
		
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = false;
		btnConApprove = false;		
		
		$('#btnDeleteManualData').hide(); // 삭제
		
		
		/*
		if("시스템관리자" == txtRoleName || "전략물자담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').show();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').show();	// 승인완료
			//$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopConApproved').show();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').show();	// 반려
			
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	// 승인요청
	else if("Pre-Approved" == selectRowStatus) {
		$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').hide();
		$('#btnCopyFile').hide();
		$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').hide();	// Comment 추가
		$('#btnCommentDelete').hide();	// Comment 삭제
		
		$('#btnStrategicMgtInfoPopSave').hide();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').show();	// 승인완료
		//$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopConApproved').show();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').show();	// 반려
		
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = false;
		btnConApprove = false;
		
		$('#btnDeleteManualData').hide(); // 삭제
		
		/*
		if("시스템관리자" == txtRoleName || "전략물자담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').show();	// 승인완료
			//$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopConApproved').show();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').show();	// 반려
			
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	// 조건부승인요청
	else if("Pre-Conditional-Approved" == selectRowStatus) {
		$('#btnPackageNoAdd').hide(); // 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').hide();
		$('#btnCopyFile').hide();
		$('#btnPackageNoDelete').hide(); // 전략물자 판정 List 삭제
		$('#btnCommentAdd').hide();	// Comment 추가
		$('#btnCommentDelete').hide();	// Comment 삭제
		
		$('#btnStrategicMgtInfoPopSave').hide();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
		$('#btnStrategicMgtInfoPopConApproved').show();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').show();	// 반려
		
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = false;
		btnConApprove = false;
		
		$('#btnDeleteManualData').hide(); // 삭제
		
		/*
		if("시스템관리자" == txtRoleName || "전략물자담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').show();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').show();	// 반려
			
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	// 판정완료
	else if("Judged"== selectRowStatus) {
	
		$('#btnStrategicMgtInfoPopSave').show();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
		$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
		$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').show();
		$('#btnCopyFile').show();
		$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = false;
		btnConApprove = false;
		
		$('#btnDeleteManualData').hide(); // 삭제
	
		/*
		if("시스템관리자" == txtRoleName || "사업관리담당자" == txtRoleName || "프로젝트담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').show();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').show();
			$('#btnCopyFile').show();
			$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').hide();
			$('#btnCopyFile').hide();
			$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').hide();	// Comment 추가
			$('#btnCommentDelete').hide();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	// 승인완료
	else if("Approved" == selectRowStatus) {
		$('#btnStrategicMgtInfoPopSave').hide();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
		$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
		$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').hide();
		$('#btnCopyFile').hide();
		$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').hide();	// Comment 추가
		$('#btnCommentDelete').hide();	// Comment 삭제
		
		btnPreJudgment = false;
		btnConApprove = false;
		
		$('#btnDeleteManualData').hide(); // 삭제
	}
	// 조건부승인완료
	else if("Conditional-Approved" == selectRowStatus) {
	
		$('#btnStrategicMgtInfoPopSave').show();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').show();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
		$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
		$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').show();
		$('#btnCopyFile').show();
		$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = true;
		btnConApprove = false;
		
		$('#btnDeleteManualData').hide(); // 삭제
	
		/*
		if("시스템관리자" == txtRoleName || "사업관리담당자" == txtRoleName || "프로젝트담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').show();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').show();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').show();
			$('#btnCopyFile').show();
			$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = true;
			btnConApprove = false;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').hide();
			$('#btnCopyFile').hide();
			$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').hide();	// Comment 추가
			$('#btnCommentDelete').hide();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	// 반려
	else if("Rejected" == selectRowStatus) {
	
		$('#btnStrategicMgtInfoPopSave').show();	// 저장
		$('#btnStrategicMgtInfoPopPreJudgment').show();	// 판정요청
		$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
		$('#btnStrategicMgtInfoPopConApprove').show();	// 조건부승인요청
		$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
		$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
		$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
		$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
		$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
		$('#btnPackageNoAdd2').show();
		$('#btnCopyFile').show();
		$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
		$('#btnCommentAdd').show();	// Comment 추가
		$('#btnCommentDelete').show();	// Comment 삭제
		
		btnPreJudgment = true;
		btnConApprove = true;
		
		console.log('mr');
		$('#btnDeleteManualData').hide(); // 삭제
		if(isManualEdit) {
			$('#btnDeleteManualData').show();
		}
		
		/*
		if("시스템관리자" == txtRoleName || "사업관리담당자" == txtRoleName || "프로젝트담당자" == txtRoleName) {
			$('#btnStrategicMgtInfoPopSave').show();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').show();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').show();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').show();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').show();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').show();
			$('#btnCopyFile').show();
			$('#btnPackageNoDelete').show();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').show();	// Comment 추가
			$('#btnCommentDelete').show();	// Comment 삭제
			
			btnPreJudgment = true;
			btnConApprove = true;
		}
		else {
			$('#btnStrategicMgtInfoPopSave').hide();	// 저장
			$('#btnStrategicMgtInfoPopPreJudgment').hide();	// 판정요청
			$('#btnStrategicMgtInfoPopPreApprove').hide();	// 승인요청
			$('#btnStrategicMgtInfoPopConApprove').hide();	// 조건부승인요청
			$('#btnStrategicMgtInfoPopComJudgmented').hide();	// 판정완료
			$('#btnStrategicMgtInfoPopComApproved').hide();	// 승인완료
			$('#btnStrategicMgtInfoPopConApproved').hide();	// 조건부승인완료
			$('#btnStrategicMgtInfoPopReturn').hide();	// 반려
			$('#btnPackageNoAdd').hide();	// 전략물자 판정 List 추가
			$('#btnPackageNoAdd2').hide();
			$('#btnCopyFile').hide();
			$('#btnPackageNoDelete').hide();	// 전략물자 판정 List 삭제
			$('#btnCommentAdd').hide();	// Comment 추가
			$('#btnCommentDelete').hide();	// Comment 삭제
			
			btnPreJudgment = false;
			btnConApprove = false;
		}
		*/
	}
	else {
		alert("관리자에게 문의 바랍니다.[err54701]");
		return false;
	}
	$('#strategicMgtInfoPop').modal('show');
	if(!isCreate) {
		searchStrategicMgtInfoPopItemList(); // 출하요청 및 전략물자관리 정보 조회
		searchStrategicMgtInfoPopFileList(); // 첨부파일 조회
		searchDlgEditPackingDetailList(); // 출하요청의 Packing List 조회
	} else {
		
	}
}
// ######################################## mainGrid(gridMain) Event List End ########################################
// ######################################## 전략물자관리 상세 팝업 Event List ########################################
function searchStrategicMgtInfoPopItemList() {
	packageNoDetailGrid.ActionAcceptEdit();
	packageNoDetailGrid.Source.Data.Data.Body = [[]];

	commentGrid.ActionAcceptEdit();
	commentGrid.Source.Data.Data.Body = [[]];

	$.ajax({
		url: "/selectStrategicMgtDetailPop.do",
		data: {"strategicMasterId": currentStrategicMasterInfo.STRATEGIC_MASTER_ID},	// 전략물자SEQ
		success: function(data, textStatus, jqXHR) {
			packageNoDetailGrid.Source.Data.Data.Body = [data.resultsPackageNoList];
			packageNoDetailGrid.Reload();

			commentGrid.Source.Data.Data.Body = [data.resultsComment];
			commentGrid.Reload();
			$('#txtMgtInfoPopShippingReqNo').val(data.results[0].SHIPPING_REQ_NO);	// 출하요청 번호
			$('#txtMgtInfoPopDescription').val(data.results[0].DESCRIPTION);	// DESCRIPTION
			$('#txtMgtInfoPopProjectId').val(data.results[0].PROJECT_ID);	// PJT
			$('#txtMgtInfoPopProjectDesc').val(data.results[0].PROJECT_DESC);	// 프로젝트 명
			$('#txtMgtInfoPopInvoiceNoId').val(data.results[0].INVOICE_NO);	// Invoice No.
			
			//data.results[0].IS_MANUAL_STRATEGIC 에 따라 분기
			if(data.results[0].IS_MANUAL_STRATEGIC == 'Y') {
				if(data.results[0].STATUS == 'Incomplete' || data.results[0].STATUS == 'Rejected') {
					$('#selMgtInfoPotDeliveryTerms').val(data.results[0].DELIVERY_TERMS).prop('selected', true);	// 구매인도조건
					$('#selMgtInfoPopDutyRefundOption').val(data.results[0].DUTY_REFUND_OPTION_VALUE).prop('selected', true);	// 관세환급
				}
				else {
					$('#txtMgtInfoPopDeliveryTerms').val(data.results[0].DELIVERY_TERMS);	// 구매인도조건
					$('#txtMgtInfoPopDutyRefundOption').val(data.results[0].DUTY_REFUND_OPTION);	// 관세환급
				}
				
				$('#txtMgtInfoNewProjectId').val(data.results[0].PROJECT_ID);	// PJT
				$('#txtDlgEditVendorName').val(data.results[0].DEPT_NM);	// Supplier Name
				
				//INDEPT_FLAG
				$('#txtDlgEditVendorId').val(data.results[0].VENDOR_ID);	// VENDOR_ID
				$('#txtDlgEditDeptCode').val(data.results[0].DEPT_CD);	// VENDOR_ID
			}
			else {
				$('#txtMgtInfoPopDeliveryTerms').val(data.results[0].DELIVERY_TERMS);	// 구매인도조건
				$('#txtMgtInfoPopDutyRefundOption').val(data.results[0].DUTY_REFUND_OPTION);	// 관세환급
			}
			
			
			
			$('#txtMgtInfoPopShopOutDate').val(data.results[0].SHOP_OUT_DATE);	// 출하예정일
			$('#txtMgtInfoPopIndeptFlag').val(data.results[0].INDEPT_FLAG);	// Supplier
			$('#txtMgtInfoPopIndeptName').val(data.results[0].DEPT_NM);	// Supplier Name
			$("#selMgtInfoPopStrategicItemYn").val(data.results[0].STRATEGIC_ITEM_YN).prop("selected", true); // 전략물자대상

			if("N" == data.results[0].STRATEGIC_ITEM_YN) {
				$("#selMgtInfoPopCatchAll").attr('disabled', false);
				$("#selMgtInfoPopCatchAll").val(data.results[0].CATCH_ALL_YN).prop("selected", true); // 전략물자포함N일 때 catch_all 여부 Y/N
			}
			else {
				$("#selMgtInfoPopCatchAll").attr('disabled', true);
				$("#selMgtInfoPopCatchAll").val(data.results[0].CATCH_ALL_YN).prop("", true); // 전략물자포함N일 때 catch_all 여부 Y/N
			}
			$('#selMgtInfoPopJudgmentType').val(data.results[0].JUDGMENT_TYPE).prop( "selected", true ); // 판정종류
			$('#txtMgtInfoPopCertificateNumber').val(data.results[0].CERTIFICATE_NUMBER);	// 판정서 번호
			$('#txtMgtInfoPopCertificateOrganization').val(data.results[0].CERTIFICATE_ORGANIZATION);	// 판정기관
			$('#txtMgtInfoPopExportPermissionNumber').val(data.results[0].EXPORT_PERMISSION_NUMBER);	// 수출허가증 번호
			
			// 특송과 FOB :: 특송은 그냥 계속 disable
			$('#txtMgtInfoPopIsSpecialShipping').prop("checked", (data.results[0].IS_SPECIAL_SHIPPING == 'Y') ? true : false);
			$('#txtMgtInfoPopIsFOB').prop("checked", (data.results[0].IS_FOB == 'Y') ? true : false);
						
			setIsThirdCountry(data.results[0].IS_THIRD_COUNTRY);
		}
	});
}

var btnPreJudgment = true;
var btnConApprove = true;
function setIsThirdCountry(IS_THIRD_COUNTRY){		
	
	if(IS_THIRD_COUNTRY == "Y"){
		$('#txtMgtInfoPopIsThirdCountry').prop("checked", true);
		
		if(btnPreJudgment){
		    $("#btnStrategicMgtInfoPopPreJudgment").hide();
		}
		
		if(btnConApprove){
		    $("#btnStrategicMgtInfoPopConApprove").hide();
		}
		
	}
	else if(IS_THIRD_COUNTRY == "N"){
		$('#txtMgtInfoPopIsThirdCountry').prop("checked", false);
		
		if(btnPreJudgment){
		    $("#btnStrategicMgtInfoPopPreJudgment").show();
		}
		
		if(btnConApprove){
		    $("#btnStrategicMgtInfoPopConApprove").show();
		}					
	}
	
	if($("#btnStrategicMgtInfoPopPreApprove").css("display") == "none"){
	    $("#txtMgtInfoPopIsThirdCountry").attr("disabled",true);
	} else {
	     $("#txtMgtInfoPopIsThirdCountry").removeAttr("disabled");
	}	
}

function searchStrategicMgtInfoPopFileList() {
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleFile.do",
		data: {"FILE_GRP_CD": currentStrategicMasterInfo.ATTACH_GRP_CD},
		success: function(data, textStatus, jqXHR) {
			var list = data.results;
			$('#txtStrategicMgtInfoPopFile').fileinput("destroy");
			$('#txtStrategicMgtInfoPopFile').val("");
			if(list.length == 0) {
				$('#txtStrategicMgtInfoPopFile').fileinput({
					//theme					: "fas"
					theme: "explorer"
					, language: "kr"
					, showUpload: false
					, hideThumbnailContent: true
					, overwriteInitial: false
					, validateInitialCount: true
				});
				
				if(!fileUse) {
					
					$('#strategicMgtInfoPop .input-group-btn').css("display", "none");
					$('#strategicMgtInfoPop .kv-file-remove').css("display", "none");
				}				
				
				return;
			}

			var fileUrl = new Array;
			var fileInfo = new Array;

			$.each(list, function(index, entry) {
				var url = "/getIdsmAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getIdsmAttachPreview.do?code=" + entry.ID;
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({
						type: file_type,
						caption: entry.NAME,
						downloadUrl: url,
						size: entry.FILE_SIZE,
						key: entry.ID,
						extra: {
							jobCode: entry.GROUPID,
							fileCode: entry.ID,
							fileName: entry.NAME
						}
					});
			});

			fileUrlCnt = fileUrl.length;

			$('#txtStrategicMgtInfoPopFile').fileinput({
				initialPreviewAsData: true
				, initialPreviewFileType: 'image'
				, initialPreview: fileUrl
				, initialPreviewConfig: fileInfo
				, deleteUrl: "/deleteIdsmSetupDlgItemScheduleFile.do"
				//, theme					: "fas"
				, theme: "explorer"
				, language: "kr"
				, showUpload: false
				, hideThumbnailContent: true
				, overwriteInitial: false
				, validateInitialCount: true
				, initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function(event, key, jqXHR, data) {
				var aborted = !window.confirm($('#alertDelete').val());
				return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				searchStrategicMgtInfoPopFileList();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				//alert_fail(msg);
			});
			
			if(!fileUse) {
				
				$('#strategicMgtInfoPop .input-group-btn').css("display", "none");
				$('#strategicMgtInfoPop .kv-file-remove').css("display", "none");
			}			
		}
	});
}

function searchDlgEditPackingDetailList() {
	$.ajax({
		url: "/getTransShippingRequestDlgEditPackingDetailList.do",
		data: {"REQ_MASTER_ID": currentStrategicMasterInfo.REQ_MASTER_ID},
		success: function(data, textStatus, jqXHR) {
			dlgEditPackingDetailGrid.Source.Data.Data.Body = [data.results];
			dlgEditPackingDetailGrid.ReloadBody();
		}
	});
}

function initStrategicEvent() {
	// 전략물자 판정 List 목록 그리드 값 변경 이벤트
	TGSetEvent("OnValueChanged", "idPackageNoDetailGrid", function(grid, row, col, val, oldval, errors) {
		/*
		"Kind"							: "Header"
		"Class"							: "gridCenterText"
		"id"							: "Header"
		"Spanned"						: "1"
		"ROWNUM"						: "No."
		"STRATEGIC_ITEM_YN"				: "전략물자 포함"
		"CATCH_ALL_YN"					: "Catch All"
		"JUDGMENT_TYPE"					: "판정종류"
		"CERTIFICATE_NUMBER"			: "판정서 번호"
		"CERTIFICATE_ORGANIZATION"		: "판정기관"
		"EXPORT_PERMISSION_NUMBER"		: "수출허가증 번호"
		"EXPORT_PERMISSION_ORGANIZATION": "수출허가기관"
		"STRATEGIC_MASTER_ID"			: "전략물자SEQ"
		"STRATEGIC_DETAIL_ID"			: "전략물자 DEATIL SEQ"
		"ROW_TYPE"						: "ROW_TYPE"
		 * */
		
		// 20211208, 전체수정..
		// 전략물자포함 Y 아니면
		if(col === 'STRATEGIC_ITEM_YN') {
			if(val === '' || val === 'N') {
				row.CATCH_ALL_YNColor = 'White';
				row.CATCH_ALL_YN = '';
				row.EXPORT_PERMISSION_NUMBER = '';
				row.EXPORT_PERMISSION_NUMBERCanEdit = 0;
				row.EXPORT_PERMISSION_NUMBERColor = '#808080';
				row.EXPORT_PERMISSION_ORGANIZATION = '';
				row.EXPORT_PERMISSION_ORGANIZATIONCanEdit = 0;
				row.EXPORT_PERMISSION_ORGANIZATIONColor = '#808080';
				//row.Changed = 0;
			}
			else if(val === 'Y') {
				row.CATCH_ALL_YN = '';
				row.CATCH_ALL_YNColor = '#808080';
				row.EXPORT_PERMISSION_NUMBER = '';
				row.EXPORT_PERMISSION_NUMBERCanEdit = 1;
				row.EXPORT_PERMISSION_NUMBERColor = 'White';
				row.EXPORT_PERMISSION_ORGANIZATION = '';
				row.EXPORT_PERMISSION_ORGANIZATIONCanEdit = 1;
				row.EXPORT_PERMISSION_ORGANIZATIONColor = 'White';
				//row.Changed = 0;
			}
		}
		grid.RefreshRow(row);
	});
	
	TGSetEvent("OnAfterValueChanged", "idPackageNoDetailGrid", function(grid, row, col, val) {
		// 20211208, 전략물자 대상이 Y는 CATCH_ALL 대상이 아니어서 제외 로직 추가..하
		if(col === 'CATCH_ALL_YN' && row.STRATEGIC_ITEM_YN === 'Y') {
			row.CATCH_ALL_YN = '';
		}
		
		if(col === 'CERTIFICATE_ORGANIZATION') {
			var maskSize = 0;
			
			if(val === '전략물자관리원' || val === '방위사업청') maskSize = 10;
			else if(val === '한국원자력통제기술원') maskSize = 11;
			
			row.CERTIFICATE_NUMBERSize = maskSize;
			row.CERTIFICATE_NUMBERResultMask = `[0-9]{${maskSize}}`;
			row.CERTIFICATE_NUMBERResultMessage = '판정기관에 따른 판정번호 자리수를 확인해주세요.<br>전략물자관리원, 방위사업청 : 10자리<br>한국원자력통제기술원 : 11자리';
		}
		
		// 판정기관
		if(col === 'CERTIFICATE_ORGANIZATION' && row.STRATEGIC_ITEM_YN === 'Y') {
			if(val === '전략물자관리원') row.EXPORT_PERMISSION_ORGANIZATION = "산업통상자원부";
			else if(val === '한국원자력통제기술원') row.EXPORT_PERMISSION_ORGANIZATION = "원자력안전위원회";
			else if(val === '방위사업청') row.EXPORT_PERMISSION_ORGANIZATION = "방위사업청";
			else row.EXPORT_PERMISSION_ORGANIZATION = "";
		}
		
		grid.RefreshRow(row);
	});
}

// 전략물자관리 상세 팝업 > 셈플 다운로드 
function fn_sampleDownload() {
	packageNoDetailGrid.ExportFormat="xlsx";
	packageNoDetailGrid.ActionExport();
	$(".TMMenuMain").hide();
	$(".TMMenuShadow").hide();
	$(".GridDisabled").hide();
	$("button[id^='TGMenuOk']").click();
}

function btnPackageNoAdd2Click() {
	
	var param = {"STRATEGIC_MASTER_ID" : currentStrategicMasterInfo.STRATEGIC_MASTER_ID};
	$('#dlgEditPopUp').load("/transStrategicMgtCopyListPopUp.do", null, function(data, status, xhr) {
		if(status == "success") {
			initdlgTransStrategicMgtCopyListPopUp(param, function(key, returnParam) {
				if(key == "save-item") {
					searchStrategicMgtInfoPopItemList();
				}
			});
		}
	});
}

function btnCopyFileClick() {

	if(currentStrategicMasterInfo == null || currentStrategicMasterInfo.STRATEGIC_MASTER_ID == null) {
		alert_modal("", $('#alertFileCopy').val());
		return;
	}

	var param = {"STRATEGIC_MASTER_ID" : currentStrategicMasterInfo.STRATEGIC_MASTER_ID, "ATTACH_GRP_CD" : currentStrategicMasterInfo.ATTACH_GRP_CD};
	$('#dlgEditPopUp').load("/transStrategicMgtAttCopyListPopUp.do", null, function(data, status, xhr) {
		if(status == "success") {
			initdlgTransStrategicMgtAttCopyListPopUp(param, function(key, returnParam) {
				debugger;
				if(key == "save-item") {
					currentStrategicMasterInfo.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
					searchStrategicMgtInfoPopFileList();
					$("#btnSearch").click();
				}
			});
		}
	});
}


// 전략물자관리 상세 팝업 > 엑셀업로드 팝업 호출
function fn_packageNoExcelUpload() {
	var param = {};
	$('#dlgEditPopUp').load("/packageNoExcelUploadPopUp.do", null, function(data, status, xhr) {
		if(status == "success") {
			$('#dlgTransShippingRequetsExcelUpload').on('shown.bs.modal', function() {
				$('#dlgTransShippingRequetsExcelUpload').click();
			});

			$('#dlgTransShippingRequetsExcelUpload').on('hidden.bs.modal', function() {
			  	closeTransExcelUploadPopUp();
			})

			initPackageNoExcelUploadPopUp(param, function(key, returnParam) {
				if(key == "select-item") {
					packageNoDetailGrid.Source.Data.Data.Body = [returnParam];
					packageNoDetailGrid.ReloadBody();
					$('#dlgTransShippingRequetsExcelUpload').modal('hide');
				}
			});
			$('#dlgTransShippingRequetsExcelUpload').modal('show');
		}
	});
}

function addStrategicDetail() {
	// 20211209, 용어가 잘못되어있음 전략물자 상세에서 전략물자 판정 List의 grid에 대응되는 이름들이 다 packageNo로 되어있음.
	//			 실제로는 strategic관련 네이밍을 짓던지 해야했음..
	//           packageNo 와 strategicRow를 지금은 같이 병행해서 사용해야 함..
	var row = packageNoDetailGrid.AddRow(null, null, 1 , null , null);

	var isSrStrategic = ($('#selMgtInfoPopStrategicItemYn').val() === 'N') ? false : true; // is Shipping Request Include Strategic
	
	// 20211207, 필드 추가될 때 조건들 수정..
	//row.ROWNUM					= "";
	row.ROWNUM = packageNoDetailGrid.RowCount;
	//row.STRATEGIC_ITEM_YN = "";
	row.STRATEGIC_ITEM_YN = isSrStrategic?'':'N';	// 전략물자 포함
	row.CATCH_ALL_YN = "";							// 전략물자포함N일 때 catch_all 여부 Y/N
	row.JUDGMENT_TYPE_NM = "";						// 판정종류
	row.CERTIFICATE_NUMBER = "";					// 판정서 번호
	row.CERTIFICATE_ORGANIZATION = "";				// 기관명
	
	row.STRATEGIC_MASTER_ID = "";	// 전략물자SEQ
	row.STRATEGIC_DETAIL_ID = "";	// 전략물자 DEATIL SEQ
	row.ROW_TYPE = "i";				// i: 생성. 삭제는 버튼으로. i 아니면 무조건 수정 */
	row.JUDGMENT_TYPE = "";			// 판정종류 코드
	
	if(!isSrStrategic) {
		row.EXPORT_PERMISSION_NUMBER = '';
		row.EXPORT_PERMISSION_NUMBERCanEdit = 0;
		row.EXPORT_PERMISSION_NUMBERColor = '#808080';
		row.EXPORT_PERMISSION_ORGANIZATION = '';
		row.EXPORT_PERMISSION_ORGANIZATIONCanEdit = 0;
		row.EXPORT_PERMISSION_ORGANIZATIONColor = '#808080';
	}
	packageNoDetailGrid.RefreshRow(row);
}

function deleteStrategicDetail() {
	var deletePackageNoList	= [];
	var selectList = packageNoDetailGrid.GetSelRows();

	if(0 == selectList.length) {
		// 선택된 항목이 없습니다.
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	// 삭제 하시겠습니까?
	if (confirm($('#alertDelete').val())) {
		for(var i = 0; i < selectList.length; i++) {
			var row = selectList[i];
			if(row.Added != null && row.Added == 1) {
				packageNoDetailGrid.RemoveRow(row);
			} else {
				var deleteRow = {"strategicDetailId": row.STRATEGIC_DETAIL_ID};
				deletePackageNoList.push(deleteRow);
			}
		} // end for

		if(deletePackageNoList.length > 0) {
			var list = JSON.stringify(deletePackageNoList);
			var paramData = {"deletePackageNoList": list};

			$.ajax({
				url: "/deleteStrategicMgtDetailPopPackageNoList.do",
				data: paramData,
				success: function(result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertDeleteSuccess').val());
						// 상세 조회
						searchStrategicMgtInfoPopItemList();
					}
				}
			});
		}
		else {
			alert_success($('#alertDeleteSuccess').val()); // 삭제되었습니다.
		}
	}
}
function saveStrategicMaterial() {
	var formData = new FormData();
	
	if(isStrategicCreate || currentStrategicMasterInfo.IS_MANUAL_STRATEGIC == 'Y') {
		var chkValidation = checkRequiredField("mgtInfoPop");

		if (!chkValidation) {
			alert_modal("", $('#alertValidate').val());
			return;
		}
		
		// Manual 건일 때, 저장 시에 구매인도조건에 특정 값이 아닌 경우에 안내하기, 현재 메뉴얼 건은 FOB건만 취하기 때문에....
		if($('#selMgtInfoPotDeliveryTerms option:selected').val() == 'Free On Board' // FOB
			|| $('#selMgtInfoPotDeliveryTerms option:selected').val() == 'Ex Works'  // EXW
			|| $('#selMgtInfoPotDeliveryTerms option:selected').val() == 'Free Carrier' // FCA
			|| $('#selMgtInfoPotDeliveryTerms option:selected').val() == 'FreeAlongsideShip') {} // FAS
		else if(btnType == 'comApproved' || btnType == 'conApproved' || btnType == 'comJudgmented' || btnType == 'return') {}
		else if(!(currentStrategicMasterInfo.STR_STATUS == 'Incomplete' || currentStrategicMasterInfo.STR_STATUS == 'Rejected')) {}
		else {
			alert_modal("", "FOB운송 전략물자관리의 구매인도조건은, FOB | FCA | FAS | EXW 중 하나만 선택이 가능합니다.");
			return;
		}
		
		
		var isFOB = $('#txtMgtInfoPopIsFOB').is(":checked") ? 'Y' : 'N';
		var isSpecialShipping = $('#txtMgtInfoPopIsSpecialShipping').is(":checked") ? 'Y' : 'N';
		if(isFOB == 'N' && isSpecialShipping == 'N') {
			alert_modal("", $('#alertValidate').val());
			return;
		}
		
		var dutyRefundOption;
		if(typeof($('#selMgtInfoPotDeliveryTerms option:selected').val() == 'undefined')) {
			formData.append('DELIVERY_TERMS', $('#txtMgtInfoPopDeliveryTerms').val());
		}
		else {
			formData.append('DELIVERY_TERMS', $('#selMgtInfoPotDeliveryTerms option:selected').val());
		}
		if(typeof($('#selMgtInfoPopDutyRefundOption option:selected').val() == 'undefined')) {
			// $('#selMgtInfoPopDutyRefundOption option:contains("N/A")').val();
			dutyRefundOption = $('#txtMgtInfoPopDutyRefundOption').val();
			formData.append('DUTY_REFUND_OPTION', $(`#selMgtInfoPopDutyRefundOption option:contains(${dutyRefundOption})`).val());
		}
		else {
			formData.append('DUTY_REFUND_OPTION', $('#selMgtInfoPopDutyRefundOption option:selected').val());
		}
		
		formData.append('SHIPPING_REQ_FLAG', 'M');
		formData.append('SHIPPING_REQ_NO', '');
		//formData.append('CONTENT', $('#txtMgtInfoPopDescription').val());
		formData.append('PROJECT_ID', $('#txtMgtInfoNewProjectId').val());
		//formData.append('DESCRIPTION', $('#txtMgtInfoPopProjectDesc').val());
		formData.append('DESCRIPTION', $('#txtMgtInfoPopDescription').val());
		formData.append('INVOICE_NO', $('#txtMgtInfoPopInvoiceNoId').val());
		//formData.append('DELIVERY_TERMS', $('#selMgtInfoPotDeliveryTerms option:selected').val());
		//formData.append('DUTY_REFUND_OPTION', $('#selMgtInfoPopDutyRefundOption option:selected').val());
		formData.append('SHOP_OUT_DATE', $('#txtMgtInfoPopShopOutDate').val());
		formData.append('INDEPT_FLAG', $('#txtMgtInfoPopIndeptFlag').val());
		formData.append('DEPT_CD', $('#txtDlgEditDeptCode').val());
		formData.append('DEPT_ID', $('#txtDlgEditDeptCode').val());
		formData.append('DEPT_NM', $('#txtDlgEditDeptName').val());
		formData.append('VENDOR_ID', $('#txtDlgEditVendorId').val());
		formData.append('VENDOR_NAME', $('#txtDlgEditVendorName').val());
		formData.append('IS_THIRD_COUNTRY', $('#txtMgtInfoPopIsThirdCountry').is(":checked") ? 'Y' : 'N');
		formData.append('STRATEGIC_ITEM_YN', $('#selMgtInfoPopStrategicItemYn option:selected').val());
		formData.append('REVISION_NUM', '0');
		formData.append('DANGER_FLAG', 'N');
		formData.append('STATUS', '출하승인');
		formData.append('CONTACT_POINT', '');
		formData.append('TITLE', '');
		formData.append('CONTENT', '');
		formData.append('HSCODE', '');
		formData.append('DOCUMENT_GRP_ID', '');
		//formData.append('ATTRIBUTE1', 'N'); // ZSHP_SHIPPING_REQ_M.ATTRIBUTE1과 ZSHP_STRATEGIC_MASTER.STRATEGIC_ITEM_YN 이 같은 값으로 쓰이기 때문에 ZSHP_STRATEGIC_MASTER.ATTRIBUTE1은 절대 사용하지 않아야 할 듯 함..
		formData.append('ATTRIBUTE1', $('#selMgtInfoPopStrategicItemYn option:selected').val()); // 그래서 위의 줄을 대체함.
		formData.append('ATTRIBUTE2', 'Y');	// 매뉴얼 생성건
		formData.append('ATTRIBUTE3', $('#txtMgtInfoPopIsFOB').is(":checked") ? 'Y' : 'N');
		formData.append('ATTRIBUTE4', $('#txtMgtInfoPopIsSpecialShipping').is(":checked") ? 'Y' : 'N');
		formData.append("strategicItemYnTxt", formData.get('STRATEGIC_ITEM_YN')); // 출하 요청 정보의 전략물자 포함 여부
		formData.append("isAuthConfirm", true);
	}
	
	if(currentStrategicMasterInfo.IS_MANUAL_STRATEGIC != null && currentStrategicMasterInfo.IS_MANUAL_STRATEGIC == 'Y') {
		formData.set('SHIPPING_REQ_NO', currentStrategicMasterInfo.SHIPPING_REQ_NO);
		formData.append('REQ_MASTER_ID', currentStrategicMasterInfo.REQ_MASTER_ID);
	}
	
	if(!isStrategicCreate) {
		formData.append("strategicMasterId", currentStrategicMasterInfo.STRATEGIC_MASTER_ID); // 전략물자SEQ
		formData.append("strategicItemYnTxt", currentStrategicMasterInfo.STRATEGIC_ITEM_YN_TXT); // 출하 요청 정보의 전략물자 포함 여부
	}

	var IsThirdCountry = "N";	
	if($('#txtMgtInfoPopIsThirdCountry').is(":checked")){
		IsThirdCountry = "Y";
	}		
	
	formData.append("IS_THIRD_COUNTRY", IsThirdCountry); 

	// 전략물자 판정 List
	//var packageNoChangeObj = packageNoDetailGrid.GetChanges(); // 전략물자 판정 List 목록
	//var packageNoChangeList = JSON.parse(packageNoChangeObj).Changes;
	var cuPackageNoList	= [];
	var row;
	var rowType	= "";

	var catchAllYn = ""; // Catch All
	var certificateNumber = "";	// 판정서 번호
	var exportPermissionNumber = ""; // 수출허가증 번호
	
	// Line의 Validation
	for (var key in packageNoDetailGrid.Rows) {
		var row = packageNoDetailGrid.Rows[key];

		// FIXME: 1. Validation 2. Data 조건에 따른 변경 3. 추가

		if(row.Fixed == null){
			certificateNumber = row.CERTIFICATE_NUMBER;

			if(null == row.ROW_TYPE || "" == row.ROW_TYPE) {
				rowType = "u";
			} else {
				rowType = row.ROW_TYPE;
			}

			if(null ==  row.STRATEGIC_ITEM_YN || "" == row.STRATEGIC_ITEM_YN || undefined == row.STRATEGIC_ITEM_YN || "undefined" == row.STRATEGIC_ITEM_YN) {
				alert("전략물자 포함여부는 필수 선택 항목 입니다.");
				return false;
			}

			// 전략물자포함 Y 아니면
			if("" == row.STRATEGIC_ITEM_YN || "N" == row.STRATEGIC_ITEM_YN) {
				catchAllYn = row.CATCH_ALL_YN;
				exportPermissionNumber = "";

			}
			else {
				catchAllYn = "";
				exportPermissionNumber = row.EXPORT_PERMISSION_NUMBER;
			}

			if(null ==  certificateNumber || "" == certificateNumber || undefined == certificateNumber || "undefined" == certificateNumber) {
				alert("판정서 번호는 필수 입력 항목 입니다.");
				return false;
	
			}
			else if(!isNumeric(certificateNumber)) {
				alert("판정서 번호는 숫자만 입력 가능 합니다");
				return false;
			}
			else {
				if(null ==  row.CERTIFICATE_ORGANIZATION || "" == row.CERTIFICATE_ORGANIZATION || undefined == row.CERTIFICATE_ORGANIZATION || "undefined" == row.CERTIFICATE_ORGANIZATION) {
					alert("판정기관명은 필수 선택 항목 입니다.");
					return false;
				} else {
					// 판정기관 -> 수출허가기관
					if("전략물자관리원" == row.CERTIFICATE_ORGANIZATION) {
						row.EXPORT_PERMISSION_ORGANIZATION = "산업통상자원부";
					}
					else if("한국원자력통제기술원" == row.CERTIFICATE_ORGANIZATION) {
						row.EXPORT_PERMISSION_ORGANIZATION = "원자력안전위원회";
					}
					else if("방위사업청" == row.CERTIFICATE_ORGANIZATION) {
						row.EXPORT_PERMISSION_ORGANIZATION = "방위사업청";
					}
					else {
						row.EXPORT_PERMISSION_ORGANIZATION = "";
					}
				}

				if("전략물자관리원" == row.CERTIFICATE_ORGANIZATION || "방위사업청" == row.CERTIFICATE_ORGANIZATION) {
					if(10 != String(certificateNumber).length) {
						alert("전략물자관리원, 방위사업청은 판정서 번호를 10자리 입력 가능 합니다");
						return false;
					}
				}
				else if("한국원자력통제기술원" == row.CERTIFICATE_ORGANIZATION) {
					if(11 != String(certificateNumber).length) {
						alert("한국원자력통제기술원은 판정서 번호를 11자리 입력 가능 합니다");
						return false;
					}
				}

				if("Y" == row.STRATEGIC_ITEM_YN) {
					if(null ==  exportPermissionNumber || "" == exportPermissionNumber || undefined == exportPermissionNumber || "undefined" == exportPermissionNumber) {
						alert("전략물자 포함 일 경우 수출신고 허가번호는 필수 입력 항목 입니다.");
						return false;
					}
					else if(!isNumeric(exportPermissionNumber)) {
						alert("수출신고 허가번호는 숫자만 입력 가능 합니다");
						return false;
					}
					else if (16 != String(exportPermissionNumber).length) {
						alert("수출신고 허가번호는 16자리 입력 가능 합니다");
						return false;
					}
				}		
			}

			var cuRow = {
				"strategicItemYn": row.STRATEGIC_ITEM_YN							// 전략물자 포함
				,"catchAllYn": catchAllYn											// 전략물자포함N일 때 catch_all 여부 Y/N
				,"judgmentType": row.JUDGMENT_TYPE									// 판정종류( 공급업체 전문판정, 두산중공업 자가판정, 두산중공업 전문판정 )
				,"certificateNumber": row.CERTIFICATE_NUMBER						// 판정서 번호
				,"certificateOrganization": row.CERTIFICATE_ORGANIZATION			// 판정기관( 전략물자관리원, 한국원자력통제기술원, 방위사업청 )
				,"exportPermissionNumber": exportPermissionNumber					// 수출허가증 번호
				,"exportPermissionOrganization": row.EXPORT_PERMISSION_ORGANIZATION	// 수출허가기관( 산업통상자원부, 원자력안전위원회, 방위사업청 )
				,"strategicMasterId": row.STRATEGIC_MASTER_ID						// 전략물자SEQ
				,"strategicDetailId": row.STRATEGIC_DETAIL_ID						// 전략물자 DEATIL SEQ
				,"rowType": rowType													// i: 생성. 삭제는 버튼으로. i 아니면 무조건 수정 */
			};

			cuPackageNoList.push( cuRow );
		}
	} // end for

	formData.append("cuPackageNoList", JSON.stringify(cuPackageNoList));	// 전략물자 판정 List 등록 목록
	formData.append("cuPackageNoList", JSON.stringify(cuPackageNoList));	// 전략물자 판정 List 등록 목록
	// 전략물자 판정 List

	// Comment
	var commentChangeObj = commentGrid.GetChanges();
	var commentChangeList = JSON.parse( commentChangeObj ).Changes;
	var insertCommentList = [];

	for(var i = 0; i < commentChangeList.length; i++) {
		var insertRow = {
			"comments": commentChangeList[i].COMMENTS
		};
		insertCommentList.push( insertRow );
	}

	formData.append("insertCommentList", JSON.stringify(insertCommentList));	// comment 등록 목록
	// Comment end

	// 첨부파일
	var file_obj = $("#strategicMgtInfoPop input[type=file]");

	for(var i=0; i<file_obj.length; i++) {
		for(var j=0; j<file_obj[i].files.length; j++) {
			var pattern_spc = /['",]/;
			if(pattern_spc.test( file_obj[i].files[j].name)) {
				alert("파일명에 특수문자를 포함할 수 없습니다. [ ' \" , ] 문자를 제거 한 후 등록하세요.");
				return false
			}
			formData.append( $(file_obj[i]).attr("id") + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	// 첨부파일
		} // end for
	} // end for

	formData.append("FILE_GRP_CD", isStrategicCreate ? '' : currentStrategicMasterInfo.ATTACH_GRP_CD);	// 첨부파일 grp_cd
	formData.append("TO_DAY", toDay);
	// 첨부파일 end
	
	formData.append("btnType", btnType);	// 버튼 종류
	//formData.append("isStrategicCreate", isStrategicCreate ? 'Y' : 'N');	// 신규생성 여부
	formData.append("isStrategicCreate", isStrategicCreate ? 'Y' : (currentStrategicMasterInfo.IS_MANUAL_STRATEGIC == 'Y') ? 'Y' : 'N');	// 신규생성 여부 + 매뉴얼 데이터를 통한 출하요청 데이터 재저장 여부..
	
	if(btnType == 'comApproved' || btnType == 'conApproved' || btnType == 'comJudgmented' || btnType == 'return') {
		formData.set('isStrategicCreate', 'N');
	}
	
	$.ajax({
		url: "/updateStrategicMgtDetailPop.do",
		data: formData,
		processData: false,
		contentType: false,
		success: function(result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			}
			else {
				if(result.error_code != null) {
					if(result.error_code == "-2") {
						//alert_fail($('#alertCompleteFail2').val());
						alert_fail('사용중인 Invoice No가 존재합니다.');
					} else if(result.error_code == "-3") {
						alert_fail($('#alertCompleteFail3').val());
					} else if(result.error_code == "-4") {
						alert_fail($('#alertCompleteFail4').val());
					}
				} else {
					if(mailType == "") {
						alert_success($('#alertSaveSuccess').val());
						btnSearchClick(); // 목록 조회
					}
					else {
						if(isStrategicCreate) {
							currentStrategicMasterInfo.STRATEGIC_MASTER_ID = result.COMPLETE_STRATEGIC_MASTER_ID;
						}
						sendMail();
					}
					$('#strategicMgtInfoPop').modal('hide');
				}
			}
		}
	});
	btnType = "";
}

function sendMail(){
	
	var paramData = {"STRATEGIC_MASTER_ID" : currentStrategicMasterInfo.STRATEGIC_MASTER_ID};
	$.ajax({			
		url: "/sendMailStrategicMgt.do",
		data: paramData,
		success: function(result, textStatus, jqXHR) {
			if(result.error != null) {
				alert_fail(result.error);
			}
			else {
				if(result.error_code != null && result.error_code == "-2") {
					alert_fail($('#alertDeleteFail2').val());
					btnSearchClick();
				}
				else {
					alert_success($('#alertSaveSuccess').val());
					// 목록 조회
					btnSearchClick();					
				}
			}
		}
	});
	mailType = "";
}

function deleteManualData() {
	// currentStrategicMasterInfo
	// confirm : 삭제여부
	// 삭제 : 전략물자, 전략물자comment, 전략물자line, 출하요청, Invoice(기본적으로 FOB건은 Invoice 한건만 쓰도록 되어있기 때문에, Invoice 하나만 찾아서 삭제하면 됨[초안])
	// 메일 별도 없음
	if (confirm($('#alertDelete').val())) {
		var paramData = {
			'REQ_MASTER_ID' : currentStrategicMasterInfo.REQ_MASTER_ID
			, 'SHIPPING_REQ_NO' : currentStrategicMasterInfo.SHIPPING_REQ_NO
			, 'STRATEGIC_MASTER_ID' : currentStrategicMasterInfo.STRATEGIC_MASTER_ID
			, 'INVOICE_NO' : currentStrategicMasterInfo.INVOICE_NO
			, 'ATTACH_GRP_CD' : currentStrategicMasterInfo.ATTACH_GRP_CD
			, 'IS_MANUAL_STRATEGIC' : currentStrategicMasterInfo.IS_MANUAL_STRATEGIC
		};
		$.ajax({
			url: "/deleteStrategicMgtDetailPop.do",
			data: paramData,
			success: function (data, textStatus, jqXHR) {
				alert_success($('#alertDeleteSuccess').val());
				btnSearchClick(); // 목록 조회
				$('#strategicMgtInfoPop').modal('hide');
	        }
	    });
	}
}

function requestJudgeStrategic() {
	var msg = "";
	var fileCnt	= 0;

	if("Incomplete" == currentStrategicMasterInfo.STR_STATUS) {
		msg = "판정요청을 위해서는 첨부파일에 아래의 문서가 첨부되어있어야 합니다.\n    - ITEM에 대한 물품명/모델명/재질&규격을 확인할 수 있는 카탈로그\n    - 매뉴얼\n    - 도면\n    - 등 추가 필요한 서류\n판정요청 하시겠습니까?"
	}
	else {
		msg = "판정요청 하시겠습니까?"
	}

	if (confirm(msg)) {
		// 첨부파일 체크
		var file_obj = $("#strategicMgtInfoPop input[type=file]");

		for(var i=0; i<file_obj.length; i++) {
			fileCnt = file_obj[i].files.length;
		}

		if(0 == fileCnt) {
			fileCnt = fileUrlCnt;
		}

		if(0 >= fileCnt) {
			alert("판정요청에 필요한 문서를 첨부하신 후 판정요청해주세요.");
			return false;
		}
		// 첨부파일 체크 end
		btnType = "preJudgment";
		mailType = "preJudgment";

		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click();
	}
}

function requestApproveStrategic() {
	var msg = "";
	var fileCnt	= 0;
	debugger;
	
	var IsThirdCountry = "N";	
	if($('#txtMgtInfoPopIsThirdCountry').is(":checked")){
		IsThirdCountry = "Y";
	}		
	
	if(IsThirdCountry == "Y") {
		msg = "승인요청 하시겠습니까?"
	}
	else if(IsThirdCountry == "N") {
		if("Incomplete" == currentStrategicMasterInfo.STR_STATUS) {
			msg = "승인요청을 위해 판정 List등록과 관련 첨부파일이 업로드 되어있어야 합니다.\n승인요청 하시겠습니까?"
		}
		else {
			msg = "승인요청 하시겠습니까?"
		}	
	}
	


	if(confirm(msg)) {
		if(IsThirdCountry == "N"){
			// 전략물자 판정 List 체크
			if(0 >= packageNoDetailGrid.RowCount) {
				var packageNoChangeObj = packageNoDetailGrid.GetChanges(); // 전략물자 판정 List 목록
				var packageNoChangeList	= JSON.parse( packageNoChangeObj ).Changes;
	
				if(0 >= packageNoChangeList.length) {
					alert("승인요청을 위해 전략물자 판정정보를 입력해주세요.");
					$("#btnPackageNoAdd").focus();
					return false;
				}
			}
			// 전략물자 판정 List 체크 end	
			
			// 첨부파일 체크
			var file_obj = $("#strategicMgtInfoPop input[type=file]");
			for(var i=0; i<file_obj.length; i++) {
				fileCnt = file_obj[i].files.length;
			} // end for
	
			if(0 == fileCnt) {
				fileCnt = fileUrlCnt;
			}
	
			if(0 >= fileCnt) {
				alert("승인요청을 위해 전략물자 판정정보 관련 문서를 첨부해주세요.");
				return false;
			}
			// 첨부파일 체크 end				
		}


		btnType = "preApprove";
		mailType = "preApprove";
		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click();
	}
}

function requestConditionalApproveStrategic() {
	var msg		= "";
	var fileCnt	= 0;

	if("Incomplete" == currentStrategicMasterInfo.STR_STATUS) {
		msg = "조건부 승인요청을 하더라도 이후 다시 판정정보를 추가하여 승인요청이 필요합니다.\n조건부 승인요청 하시겠습니까?"
	}
	else {
		msg = "조건부승인요청 하시겠습니까?"
	}

	if(confirm(msg)) {
		btnType = "conApprove";
		mailType = "conApprove";
		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click(	);
	}	
}

function judgeStrategic() {
	if(confirm("판정완료 하시겠습니까?")) {
		btnType = "comJudgmented";
		mailType = "comJudgmented";
		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click(	);
	}
}

function approveStrategic() {
	if("Pre-Judgment" == currentStrategicMasterInfo.STR_STATUS) {
		msg = "판정관련 첨부문서가 첨부되었는지 확인해주세요.\n승인완료하시겠습니까?"
	}
	else {
		msg = "승인완료 하시겠습니까?"
	}
	
	var IsThirdCountry = "N";	
	if($('#txtMgtInfoPopIsThirdCountry').is(":checked")){
		IsThirdCountry = "Y";
	}		

	if(confirm(msg)) {
		// 전략물자 판정 List 체크
		if(0 >= packageNoDetailGrid.RowCount) {
			var packageNoChangeObj = packageNoDetailGrid.GetChanges(); // 전략물자 판정 List 목록
			var packageNoChangeList	= JSON.parse( packageNoChangeObj ).Changes;			
			
			if(0 >= packageNoChangeList.length && IsThirdCountry == "N") {
				alert("승인완료를 위해 전략물자 판정정보를 입력해주세요.");
				$("#btnPackageNoAdd").focus();
				return false;
			}
		}
		// 전략물자 판정 List 체크 end
		btnType = "comApproved";
		mailType = "comApproved";
		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click();
	}
}

function conditionalApproveStrategic() {
	if(confirm( "조건부승인완료 하시겠습니까?")) {
		btnType = "conApproved";
		mailType = "conApproved";
		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click();
	}
}

function rejectStrategic() {
	if(confirm("반려 하시겠습니까?")) {
		btnType = "return";
		mailType = "return";
		// 전략물자관리 상세 팝업 > 수정 버튼 클릭
		$('#btnStrategicMgtInfoPopSave').click(	);
	}
}

function addCommentRow() {
	if(2 > $("#txtCommentAddPopComment").val().length) {
		alert($('#alertCommentFail').val()); // 코멘트를 3자 이상 입력 해주세요.
		return;
	}

	var list = commentGrid.Rows;
	var rowCnt = commentGrid.RowCount;

	for (var key in list) {
		var gridRow = list[key];
		if(null != gridRow.COMMENTS && $("#txtCommentAddPopComment").val() == gridRow.COMMENTS) {
			$('#commentAddPop').modal('hide');
			return;
		}
	}

	var row = commentGrid.AddRow(null, null, 1 , null , null);

	row.ROWNUM = "";
	row.COMMENTS = $("#txtCommentAddPopComment").val();
	row.CREATED_BY_NM = $("#txtSsoname").val(); // 생성자
	//row.CREATION_DATE	= toDay;									// 생성일

	commentGrid.RefreshRow(row);
	$('#commentAddPop').modal('hide');
}

function deleteCommentRow() {
	var deleteCommentList = [];
	var selectList = commentGrid.GetSelRows();
	var loginUserId = ($("#txtSsoid").val()).toUpperCase();

	for(var i = 0; i < selectList.length; i++) {
		var row = selectList[i];
		var rowUserId = ( row.CREATED_BY ).toUpperCase();

		if(null != rowUserId && "" != rowUserId && loginUserId != rowUserId) {
			alert("코멘트 생성자만 삭제 가능 합니다.");
			return false;
		}
	} // end for

	if(0 == selectList.length) {
		alert($('#alertGridSelectDataNull').val()); // 선택된 항목이 없습니다.
		return;
	}

	// 삭제 하시겠습니까?
	if (confirm($('#alertDelete').val())) {
		for(var i = 0; i < selectList.length; i++) {
			var row = selectList[i];
			if(row.Added != null && row.Added == 1) {
				commentGrid.RemoveRow(row);
			}
			else {
				var deleteRow = {"strategicCommentId": row.STRATEGIC_COMMENT_ID};
				deleteCommentList.push(deleteRow);
			}
		} // end for

		if(deleteCommentList.length > 0){
			var list = JSON.stringify(deleteCommentList);
			var paramData = {"deleteCommentList": list};

			$.ajax({
				url: "/deleteStrategicMgtDetailPopComment.do",
				data: paramData,
				success: function(result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertDeleteSuccess').val());
						// 상세 조회
						searchStrategicMgtInfoPopItemList();
					}
				}
			});
		} else {
			alert_success($('#alertDeleteSuccess').val()); // 삭제되었습니다.
		}
	}
}

function setResetDlgItemScheduleControls() {
	commentGrid.Source.Data.Data.Body = [[]];
	commentGrid.ReloadBody();

	dlgEditPackingDetailGrid.Source.Data.Data.Body = [[]];
	dlgEditPackingDetailGrid.ReloadBody();

	packageNoDetailGrid.Source.Data.Data.Body = [[]];
	packageNoDetailGrid.ReloadBody();
}
// ######################################## 전략물자관리 상세 팝업 Event List End ########################################
// ######################################## Etc Event List ########################################
// 숫자 여부 체크
function isNumeric(num, opt) {
	// 좌우 trim(공백제거)을 해준다.
	num = String(num).replace(/^\s+|\s+$/g, "");

	if(typeof opt == "undefined" || opt == "1") {
		// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
		var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}
	else if(opt == "2") {
		// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
		var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}
	else if(opt == "3") {
		// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
		var regex = /^[0-9]+(\.[0-9]+)?$/g;
	}
	else {
		// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
		var regex = /^[0-9]$/g;
	}

	if(regex.test(num)) {
		num = num.replace(/,/g, "");
		return isNaN(num) ? false : true;
	}
	else {
		return false;
	}
}
// ######################################## Etc Event List End ########################################
/// 사용되지 않는 항목으로 보임
function checkRequiredField(areaID) {
	var chkValidation = true;
	$("#" + areaID + " input:visible, #" + areaID + " select:visible, #" + areaID + " textarea:visible").each(function() {
		if ($(this).hasClass("required") && $(this).attr("type") == "file") {
			if (getAttachedFilesCount(($(this).attr("id"))) == 0) {
				$(".file-input").addClass("validation-error");
				chkValidation = false;
			}
			else {
				$(".file-input").removeClass("validation-error");
				$(this).removeClass("validation-error");
			}
		}
		else if ($(this).hasClass("required") && ($(this).val() == null || $(this).val().IsNullOrEmpty())) {
			$(this).addClass("validation-error");
			chkValidation = false;
		}
		else {
			$(this).removeClass("validation-error");
		}
	});
	return chkValidation;
}

function searchStrategicMgtInfoPopAdminList(){
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleAdmin.do",
		data: {"TRK_ITEM_SEQ": currentStrategicMasterInfo.TRK_ITEM_SEQ},
		success: function(data, textStatus, jqXHR) {
			dlgEditPackingDetailGrid.Source.Data.Data.Body = [data.results];
			dlgEditPackingDetailGrid.ReloadBody();
		}
	});
}
/// 사용되지 않는 항목으로 보임 end

function iconProjectSearchClick() {

	var param = {"PROJECT_CODE" : $('#txtMgtInfoNewProjectId').val()};

	$('#dlgEditPopUp').load("/transProjectListPopup.do",null,function(data, status, xhr) {
		if(status == "success"){
		
			initPopUp(param, function (key, param) {
				if(key == "select-item"){
				    $("#txtMgtInfoNewProjectId").val(param.PROJECT_CODE);
					//$("#txtMgtInfoProjectDesc").val(param.PROJECT_DESC);
				    $("#txtMgtInfoPopProjectDesc").val(param.PROJECT_DESC);
					$('#dlgProjectList').modal('hide');	
				}
			});			
			
			$('#dlgProjectList').modal('show');
		}
	});	
}

function initRequestEditPopUpCode(reOpen) {	
	
	var codeList = [{"CODE" : "C101"},{"CODE" : "C103"},{"CODE" : "C123"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			var	result = setCombo(results.C103, "selMgtInfoPotDeliveryTerms", "sel");
				result = setCombo(results.C101, "selMgtInfoPopDutyRefundOption", "sel");
				result = setCombo(results.C123, "selDlgEditIndeptFlag", "");
				
			if(!reOpen) $('#txtMgtInfoPopIndeptFlag').val('N');
        }
    });		
	
}

function selDlgEditIndeptFlagChange() {

	$("#editModalDeptName").removeClass("required");
	$("#txtDlgEditDeptCode").removeClass("required");
	$("#txtDlgEditVendorName").removeClass("required");
	$("#txtDlgEditVendorId").removeClass("required");
	$('#txtMgtInfoPopIndeptFlag').val($('#selDlgEditIndeptFlag').val());

	if($('#selDlgEditIndeptFlag').val() == "N"){
		
		$('#txtDlgEditVendorName').val("");
		$('#txtDlgEditVendorId').val("");	

		$("#txtDlgEditVendorName").addClass("required");
		$("#txtDlgEditVendorId").addClass("required");
	
		$('#txtDlgEditDeptName').hide();
		$('#txtDlgEditVendorName').show();
	}
	else {
	
		$('#txtDlgEditDeptName').val("");
		$('#txtDlgEditDeptCode').val("");	

		$("#txtDlgEditDeptName").addClass("required");
		$("#txtDlgEditDeptCode").addClass("required");
	
		$('#txtDlgEditDeptName').show();
		$('#txtDlgEditVendorName').hide();		
	}
}

function iconNameSearchClick(){
	var selDlgEditIndeptFlag = $("#selDlgEditIndeptFlag").val();
	
	if(selDlgEditIndeptFlag == "N"){
	
		var param = { "VENDOR_NAME" : $("#txtDlgEditVendorName").val()};	
		
		$('#dlgEditPopUp').load("/transVendorPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransVendorPopUp(param, function (key, returnParam) {
					
					if(key == "select-item"){
						$("#txtDlgEditVendorId").val(returnParam.VENDOR_CODE);
						$("#txtDlgEditVendorName").val(returnParam.VENDOR_NAME);			
						$("#txtMgtInfoPopIndeptName").val(returnParam.VENDOR_NAME);		
					}
	
				});
				
			}
		});
	}
	else if(selDlgEditIndeptFlag == "Y"){
		var param = { };	
		
		$('#dlgEditPopUp').load("/transDeptUsrPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransDeptUsrPopUp(param, function (key, returnParam) {
					
					if(key == "select-item"){
						$("#txtDlgEditDeptCode").val(returnParam.DEPT_CODE);
						$("#txtDlgEditDeptName").val(returnParam.DEPT_NAME);			
						$("#txtMgtInfoPopIndeptName").val(returnParam.DEPT_NAME);					
					}
	
				});
				
			}
		});	
	} 
}

function isInvoiceNoExist(invoiceNo) {	
	
	var codeList =[{"CODE" : "C101"},{"CODE" : "C103"},{"CODE" : "C123"}]
	var paramData = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			var	result = setCombo(results.C103, "selMgtInfoPotDeliveryTerms", "sel");
				result = setCombo(results.C101, "selMgtInfoPopDutyRefundOption", "sel");
				result = setCombo(results.C123, "selDlgEditIndeptFlag", "");
        }
    });		
	
}
