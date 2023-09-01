﻿//#region 전역변수

//테이블에서 선택된 항목 저장
var selections = [];
//#endregion

//#region 문서 로딩 & 초기화, Select, datepicker, autocomplete
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () { btnAdd_click(); return false; });

	//리스트의 Row 클릭시 (head, 관리 cell 제외)
	$("#tblTeamOPList").on('click-cell.bs.table', function(obj, field, data, row) {
		if (data !== null && data != undefined) {
			console.log('data cell click action, row: ' + JSON.stringify(row));
			SetTeamOPValue(row);

			$('#dialogTeamOP').modal('show');	
		}
	});

	//팝업 - 저장 버튼 클릭
	$('#btnTeamOPModalSave').click(function () { btnTeamOPModalSave_click(); return false; });
	//팝업 - 삭제 버튼 클릭
	$('#btnTeamOPModalDelete').click(function () { btnTeamOPModalDelete_click(); return false; });
	//등록/수정 팝업 호출 시 이벤트
	$("#dialogTeamOP").on('show.bs.modal', function(e) {
	});
	//등록/수정 팝업 닫히기 전  이벤트
	$('#dialogTeamOP').on('hide.bs.modal', function (e) {	
	});	
});

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩
function initControls() {
	/* 공통 - 필수항목 입력란 클릭시 내용 전체 선택 */
	$("input.required").click(function() {
		//$(this).select();
	});

	//부서 검색 자동완성
	makeAutocomplete(
		"txtDeptName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDeptCode",		//clear필드 id
		"/getOrgList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {
			console.log("Selected:" + ui.item.value);
			var v_org_id = ui.item.value.split("|")[0];
			var v_org_name = ui.item.value.split("|")[1];
			var v_leader = ui.item.value.split("|")[2];
			var v_leader_ad = ui.item.value.split("|")[3];
			var v_bg_name = ui.item.value.split("|")[4];

			$("#txtDeptCode").val(v_org_id);
			$("#txtDeptName").val(v_org_name);
			return false;
		}
	);

	//OP 자동완성
	makeAutocomplete(
			"txtOPName", 		//자동완성 입력 input
			"",					//keyword2 파라메터 id
			"txtOPAD",		//clear필드 id
			"/getAllUserList.do",  	//검색 URL
			2,			//검색 실행을 위한 keyword 최소 길이
			true,				//선택완료 마크 표시 여부
			function(event, ui) {
				console.log("Selected:" + ui.item.value);
				var v_user_ad = ui.item.value.split("|")[0];
				var v_user_name = ui.item.value.split("|")[1];
				var v_email = ui.item.value.split("|")[2];
				var v_position = ui.item.value.split("|")[3];
				var v_dept_code = ui.item.value.split("|")[4];
				var v_dept_name = ui.item.value.split("|")[5];
				var v_leader_ad = ui.item.value.split("|")[6];
				var v_leader_name = ui.item.value.split("|")[7];

				$("#txtOPAD").val(v_user_ad);
				$("#txtOPName").val(v_user_name);
		
				return false;
			}
		); 	

	//부 OP 자동완성
	makeAutocomplete(
		"txtSubOPName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtSubOPAD",		//clear필드 id
		"/getAllUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {
			console.log("Selected:" + ui.item.value);
			var v_user_ad = ui.item.value.split("|")[0];
			var v_user_name = ui.item.value.split("|")[1];
			var v_email = ui.item.value.split("|")[2];
			var v_position = ui.item.value.split("|")[3];
			var v_dept_code = ui.item.value.split("|")[4];
			var v_dept_name = ui.item.value.split("|")[5];
			var v_leader_ad = ui.item.value.split("|")[6];
			var v_leader_name = ui.item.value.split("|")[7];

			$("#txtSubOPAD").val(v_user_ad);
			$("#txtSubOPName").val(v_user_name);
	
			return false;
		}
	); 

}
//#endregion

//#region 이벤트 - List페이지
//신규출장 추가 버튼 클릭
function btnAdd_click() {
	InitForNewTeamOP();
	$('#dialogTeamOP').modal('show');	
}

//Trip table(List table)의 관리Cell 버튼 이벤트
teamOPOperateEvents = {
	//출장정보 수정
	'click .editTeamOP': function (e, value, row, index) {
		SetTeamOPValue(row);
		$('#dialogTeamOP').modal('show');	
	},
	//출장정보 삭제
	'click .deleteTeamOP': function (e, value, row, index) {
		SetTeamOPValue(row);
		btnTeamOPModalDelete_click();
	},
};
//#endregion

//#region LIST 페이지
//관리 cell 아이콘 설정 지정
//row.State : 공백, 저장, 요청, 일시중지, 진행중, 완료, 취소
function operateFormatter(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editTeamOP"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteTeamOP"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';

	var retStr = retStr_edit_on + retStr_del_on;
	return retStr;
}

//Main List table bootstrap-table 데이터 바인딩
function initTable() {
	$('#tblTeamOPList').bootstrapTable('destroy').bootstrapTable({
		locale: "ko-KR",
		toolbar: "#toolbar",
		search: "true",
		showRefresh: "true",
		showFullscreen: "true",
		clickToSelect: "true",
		minimumCountColumns: "2",
		pagination: "true",
		idField: "MYACCT_AUTH_ID",
		pageList: "[10, 25, 50, 100, all]",
		//showFooter: "true",
		//method: "post",
		ajax: "ajaxSelectTeamOPList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});

	//체크박스 클릭시
	$('#tblTeamOPList').on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',
		function () {
			selections = getIdSelections();
	});

	//테이블 모든 이벤트 debug 출력
	$('#tblTeamOPList').on('all.bs.table', function (e, name, args) {
		console.log(name, args);
	});

	//cell 클릭
	$('#tblTeamOPList').on('click-cell.bs.table', function (e, field, value, row) {
		if (field != 9) {		//명령버튼 클릭제외
			//alert(row.MYACCT_AUTH_ID);
		}
	});
}

//ajax - 테이블 목록 조회
function ajaxSelectTeamOPList(params) {
	$('.wrap-loading').removeClass('dp_n');	//로딩 이미지 표시

	$.ajax({
		async: false,
		type: "POST",
		url: "/selectOperatorList.do",
		data: { },
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			var tableData = {
				"total": dataSet.length,
				"rows": dataSet
			};
			params.success(tableData, textStatus, jqXHR);
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover({ html:true })
        },
        error: function (er) {
            params.error(er);
		},
		complete: function (e) {
			$('.wrap-loading').addClass('dp_n'); //로딩중 화면 제거
		}
    });
}

//선택된 체크박스 ID 반환
function getIdSelections() {
	return $.map($('#tblTeamOPList').bootstrapTable('getSelections'), function (row) {
		return row.MYACCT_AUTH_ID;
	});
}

//Table Data 조회 후
function completeDataBind(res) {
	$.each(res.rows, function (i, row) {
	});
	return res;
}
//#endregion

//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnTeamOPModalSave_click() {

	
	var chkValidation = checkRequiredField("dialogTeamOP");

	if (!chkValidation) {
		alert("필수값 중 입력하지 않은 항목이 있습니다.");
		return false;
	} else if (!checkTeamOPHiddenValidation()) {
		return false;
	} else {
		if (confirm("저장 하시겠습니까?")) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			var jobCode = $("#hidJobCode").val();
			var deptCode = $("#txtDeptCode").val();
			var opAD = $("#txtOPAD").val();
			var opSubAD = $("#txtSubOPAD").val();
		
			//로딩중 화면 표시
			$('.wrap-loading').removeClass('dp_n');
		
			$.ajax({
				async: false,
				type: "POST",
				url: "/saveOperatorInfo.do",				
				data: { "jobCode":encodeURIComponent(jobCode), "deptCode":encodeURIComponent(deptCode), "opAD":encodeURIComponent(opAD), "opSubAD":encodeURIComponent(opSubAD) },
				dataType: "json",
				success: function (data, textStatus, jqXHR) {
					if (data.error != null) {
						alert_fail(data.error);
					} else {
						alert_success("저장되었습니다");

						$('#tblTeamOPList').bootstrapTable('refresh');
						$('#dialogTeamOP').modal('hide');
						InitForNewTeamOP();
					}
				},
				error: function (e) {
					alert(e.responseText);
				},
				complete: function (e) {
					//로딩중 화면 제거
					$('.wrap-loading').addClass('dp_n');
				}
			});

		}
	}
}

//팝업 - 삭제 버튼 클릭
function btnTeamOPModalDelete_click() {
	var jobCode = $("#hidJobCode").val();		//Job Code

	if (jobCode == "") {
		alert("삭제 할 항목의 정보를 찾을 수 없습니다.\n새로 고침 후 다시 시도하여 주십시오.");
		return;
	}

	if (confirm("OP정보를 삭제하시겠습니까?")) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/deleteOperatorInfo.do",			
			data: { "jobCode": encodeURIComponent(jobCode)},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					initTable();		//목록 초기 바인딩
					InitForNewTeamOP();
					$('#dialogTeamOP').modal('hide');
					alert_success("삭제되었습니다.");
				}
			},
			error: function (er) {
				params.error(er);
			}
		});
	}
	return;
}
//#endregion

//#region 등록/수정 팝업 관련 
//신규 요청을 위한 modal 초기화
function InitForNewTeamOP() {
	$("#hidJobCode").val("");

	$("#txtDeptName").val("");
	$("#txtOPName").val("");
	$("#txtSubOPName").val("");

	$("#txtDeptCode").val("");
	$("#txtOPAD").val("");
	$("#txtSubOPAD").val("");

	$("#txtDeptCode").attr("disabled", true);
	$("#txtOPAD").attr("disabled", true);
	$("#txtSubOPAD").attr("disabled", true);

	$("#btnTeamOPModalDelete").hide();

	//validation 오류 표시 제거
	removeValidationError("dialogTeamOP");

	//자동완성 validation 마크 제거
	$("#dialogTeamOP .autocomplete-valid").hide();
}

//수정을 위한 OP정보 modal 초기화
function SetTeamOPValue(row) {
	$("#hidJobCode").val(row.MYACCT_AUTH_ID);

	$("#txtDeptName").val(row.DEPT_NAME);
	$("#txtOPName").val(row.OP_NAME);
	$("#txtSubOPName").val(row.SUB_OP_NAME);

	$("#txtDeptCode").val(row.DEPT_CODE);
	$("#txtOPAD").val(row.OPERATOR_AD);
	$("#txtSubOPAD").val(row.OPERATOR_AD_SUB);

	$("#txtDeptCode").attr("disabled", true);
	$("#txtOPAD").attr("disabled", true);
	$("#txtSubOPAD").attr("disabled", true);

	if ($("#txtDeptName").val() != "" && $("#txtDeptCode").val() != "") $("#txtDeptName").parent().find(".autocomplete-valid").show()
	if ($("#txtOPName").val() != "" && $("#txtDeptxtOPADtCode").val() != "") $("#txtOPName").parent().find(".autocomplete-valid").show()

	$("#btnTeamOPModalDelete").show();
}

//hidden으로 가진 필드와 기타 입력된 값에 대한 점검
function checkTeamOPHiddenValidation() {
	var jobCode = $("#hidJobCode").val();		//Job Code
	var deptCode = $("#txtDeptCode").val();		//Dept Code
	var isValid = true;
	
	$.each($('#tblTeamOPList').bootstrapTable('getData'), function (index, entry) {
		if (jobCode != entry.MYACCT_AUTH_ID && deptCode == entry.DEPT_CODE) {
			alert("동일한 부서가 이미 등록되어 있습니다");
			isValid = false
			return false;
		}
	});

	return isValid;
}
//#endregion

//#region 공용함수 - 초기화, 정보 조회, ETC
//validation 오류 표시 제거
function removeValidationError(areaID) {
	$("#" + areaID + " .validation-error").each(function () {
		$(this).removeClass("validation-error");
	});
}

//required class를 가진 필수 항목 입력 여부 확인
function checkRequiredField(areaID) {
	var chkValidation = true;

	$("#" + areaID + " input:visible, #" + areaID + " select:visible").each(function () {
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

//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
function removeDisabled() {
	$("input:disabled").attr("disabled", false);
	$("select:disabled").attr("disabled", false);
}
//#endregion