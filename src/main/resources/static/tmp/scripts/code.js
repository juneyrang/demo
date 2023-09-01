
//#region 전역변수

var fileCatCode = "NOTICE";

//테이블에서 선택된 항목 저장
var selections = [];
var selectRow = null;


//에디터
var editorEdit;	//수정 화면
var editorView; //조회화면

//#endregion

//#region 문서 로딩 & 초기화, Select, datepicker, autocomplete
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();   	

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () { 
		InitForNewMenu('add');		
		$('#dlgCodeEdit').modal('show');
			
	});	

	$('#btnDetailAdd').click(function () { 
		InitForNewMenu('addDetail');		
		$('#dlgCodeDetailEdit').modal('show');
			
	});		


	$('#btnCodeDetailModalSave').click(function () { 
		btnCodeDetailModalSave_click(); 
		return false; 
	});

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnCodeModalSave').click(function () { 
		btnCodeModalSave_click(); 
		return false; 
	});

	//등록/수정 팝업 호출 시 이벤트
	$("#dlgDetailSelect").on('show.bs.modal', function(e) { $('#tblDetailList').bootstrapTable('refresh'); });
		
});

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩
function initControls() {

}
//#endregion

//#region 코드성 데이터 처리, dropdown 바인딩
//#endregion

//#region 이벤트 - List페이지
//#endregion

window.onload = function () {

	$('#tblDetailList').bootstrapTable('destroy').bootstrapTable({
		toolbar: "#detailToolbar",
		search: "true",
		showRefresh: "true",
		clickToSelect: "true",
		minimumCountColumns: "2",
		idField: "DTL_CODE",
		ajax: "ajaxSelectCodeDetailList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
      
      $('.modal-body .fixed-table-body').css('height','300px')
}



function ajaxSelectCodeDetailList(params) {
	

	$.ajax({
		async: false,
		type: "POST",
		url: "/getCodeDetail.do",		
		data: {"MST_CODE": $('#txtMstCode').val()},
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
			
        }
    });
}

//#region LIST 페이지
//Main List table bootstrap-table 데이터 바인딩
function initTable() {	

	$('#tblList').bootstrapTable('destroy').bootstrapTable({
		toolbar: "#toolbar",
		search: "true",
		showRefresh: "true",
		showFullscreen: "true",
		clickToSelect: "true",
		minimumCountColumns: "2",
		pagination: "true",		
		idField: "MST_CODE",
		pageList: "[10, 25, 50, 100, all]",
		ajax: "ajaxSelectCodeList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
}


gridEvents = {
	
	'click .editMenu': function (e, value, row, index) {
	
		InitForNewMenu('edit');
		
		$('#txtMstName').val(row.MST_NAME);
		$('#txtMstCode').val(row.MST_CODE);
		$('#ddlMstUseYn').val(row.USE_YN);
		
		$('#dlgCodeEdit').modal('show');
			
	},
	'click .setDetail': function (e, value, row, index) {
		$('#txtMstCode').val(row.MST_CODE);
		$('#dlgDetailSelect').modal('show');
	},	
};

gridDetailEvents = {
	
	'click .detailEditMenu': function (e, value, row, index) {
	
		InitForNewMenu('editDetail');
		
		$('#txtMstCode').val(row.MST_CODE);
		$('#txtDtlCode').val(row.DTL_CODE);
		$('#txtDtlNameKo').val(row.DTL_NAME_KO);
		$('#txtDtlNameEn').val(row.DTL_NAME_EN);
		$('#txtDtlOrder').val(row.DTL_ORDER);
		$('#ddlDtlUseYn').val(row.USE_YN);
		
		$('#dlgCodeDetailEdit').modal('show');
			
	}
};

function formatter(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';	
	var retStr_menu_on = ' <a tabindex="0" href="javascript:void(0)" class="setDetail"><i class="fas fa-bars font-blue" title="권한 설정"></i></a>&nbsp;';

	var retStr = retStr_edit_on + retStr_menu_on;
	return retStr;
}

function detailFormatter(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="detailEditMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';

	var retStr = retStr_edit_on;
	return retStr;
}


//ajax - 테이블 목록 조회
function ajaxSelectCodeList(params) {
	$.ajax({
		async: false,
		type: "POST",
		url: "/getCode.do",		
		data: {},
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
        }
    });
}


//Table Data 조회 후
function completeDataBind(res) {
	$.each(res.rows, function (i, row) {
	});
	return res;
}
//#endregion


function btnCodeDetailModalSave_click() {
		
	var chkValidation = checkRequiredField("dlgCodeDetailEdit");

	if (!chkValidation) {
		
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

		var aa = { "MST_CODE": $("#txtMstCode").val(), "DTL_CODE": $("#txtDtlCode").val(), "DTL_NAME_KO": $("#txtDtlNameKo").val(), "DTL_NAME_EN": $("#txtDtlNameEn").val(), "DTL_ORDER": $("#txtDtlOrder").val(), "USE_YN": $("#ddlDtlUseYn").val() };
		console.log("aa", aa);

			$.ajax({
				async: false,
				type: "POST",			
				url: "/saveCodeDetail.do",
				data: { "MST_CODE": $("#txtMstCode").val(), "DTL_CODE": $("#txtDtlCode").val(), "DTL_NAME_KO": $("#txtDtlNameKo").val(), "DTL_NAME_EN": $("#txtDtlNameEn").val(), "DTL_ORDER": $("#txtDtlOrder").val(), "USE_YN": $("#ddlDtlUseYn").val() },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblDetailList').bootstrapTable('refresh');
						$('#dlgCodeDetailEdit').modal('hide');
						InitForNewMenu('addDetail');
					}
				}
			});
		}
	}		
	
}


//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnCodeModalSave_click() {
	
	var chkValidation = checkRequiredField("dlgCodeEdit");

	if (!chkValidation) {
		
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			$.ajax({
				async: false,
				type: "POST",			
				url: "/saveCode.do",
				data: { "MST_CODE": $("#txtMstCode").val(), "MST_NAME": $("#txtMstName").val(), "USE_YN": $("#ddlMstUseYn").val() },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblList').bootstrapTable('refresh');
						$('#dlgCodeEdit').modal('hide');
						InitForNewMenu('add');
					}
				}
			});
		}
	}
}


//#endregion

//#region 등록/수정 팝업 관련 
//신규 요청을 위한 modal 초기화
function InitForNewMenu(mode) {

	if(mode=='add'){
		$("#txtMstName").val("");		
		$("#txtMstCode").val("");
		$("#ddlMstUseYn").val("Y");
		
		$("#txtMstCode").removeAttr("readonly");
		
		//버튼처리
		$("#btnCodeModalSave").show();
		
		//validation 오류 표시 제거
		removeValidationError("dlgCodeEdit");
		
	}
	else if(mode == 'edit'){
		$("#txtMstCode").attr("readonly",true);
	
		$("#btnCodeModalSave").show();
		
		//validation 오류 표시 제거
		removeValidationError("dlgCodeEdit");
	}
	else if(mode == 'addDetail'){
		$("#txtDtlNameKo").val("");
		$("#txtDtlNameEn").val("");		
		$("#txtDtlCode").val("");
		$("#txtDtlOrder").val("");
		$("#ddlDtlUseYn").val("Y");
		
		$("#txtDtlCode").removeAttr("readonly");
		
		//버튼처리
		$("#btnCodeDetailModalSave").show();
		
		//validation 오류 표시 제거
		removeValidationError("dlgCodeDetailEdit");
	}	
	else if(mode == 'editDetail'){
		$("#txtDtlCode").attr("readonly",true);
	
		$("#btnCodeDetailModalSave").show();
		
		//validation 오류 표시 제거
		removeValidationError("dlgCodeDetailEdit");
	}	
		

	
}

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

//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
function removeDisabled() {
	$("input:disabled").attr("disabled", false);
	$("select:disabled").attr("disabled", false);
}
//#endregion