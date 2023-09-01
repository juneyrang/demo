
//#region 전역변수

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
		$('#dlgScheduleEdit').modal('show');
			
	});	

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnScheduleModalSave').click(function () { 
		btnScheduleModalSave_click(); 
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
	$('.modal-body .fixed-table-body').css('height','300px');
};

//#region LIST 페이지
//Main List table bootstrap-table 데이터 바인딩
function initTable() {	
	$('#tblList').bootstrapTable('destroy').bootstrapTable({
		toolbar: "#toolbar",
		search: "true",
		showRefresh: "true",
		showFullscreen: "false",
		clickToSelect: "true",
		minimumCountColumns: "2",
		pagination: "true",		
		idField: "SCHE_NO",
		pageList: "[10, 25, 50, 100, all]",
		ajax: "ajaxSelectScheduleList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});

	$('#tblHistoryList').bootstrapTable('destroy').bootstrapTable({
		clickToSelect: "false",
		minimumCountColumns: "2",
		pagination: "true",		
		idField: "HIST_NO",
		pageList: "[10, 25, 50, 100, all]",
//		ajax: "ajaxShowHistory",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
}


gridEvents = {
	'click .stopStatus': function (e, value, row, index) {
		gridEvents.chgStatus(row);
	},
	'click .startStatus': function (e, value, row, index) {
		gridEvents.chgStatus(row);
	},
	'click .editMenu': function (e, value, row, index) {
	
		InitForNewMenu('edit', row);
		
		$('#dlgScheduleEdit').modal('show');
			
	},
	'click .setDetail': function (e, value, row, index) {
		$('#txtScheduleCode').val(row.SCHEDULE_CODE);
		$('#dlgDetailSelect').modal('show');
	},
	'click .chgStatus' : function(e, value, row, index) {
		chgStatus(this, index, row);
	},
	'click .showHistory': function (e, value, row, index) {
		ajaxShowHistoryList(row);
	}
};

function chgStatus(elem, index, row) {
		var paramData = {
			'SCHE_NO' : row.SCHE_NO,
			'SCHE_NAME' : row.SCHE_NAME,
			'SCHE_STATUS' : row.SCHE_STATUS == 1 ? 0 : 1,
			'SCHE_STATUS_NAME' : row.SCHE_STATUS == 1 ? 'Running' : 'Stop'
		};
		
		var callback = function(data) {
			$('#tblList').bootstrapTable('updateRow', {
				index: index,
                row: {
                	'SCHE_NO': row.SCHE_NO, 
					'SCHE_NAME': row.SCHE_NAME, 
					'SCHE_TYPE': row.SCHE_TYPE, 
					'SCHE_VALUE': row.SCHE_VALUE, 
					'SCHE_STATUS': paramData.SCHE_STATUS, 
					'SCHE_STATUS_NAME': paramData.SCHE_STATUS_NAME, 
					'JOB_CLASS': row.JOB_CLASS
                }
            });

			if(row.SCHE_STATUS == 1) {
				$('.chgStatus').eq(index).find('i').removeClass('fa-stop').addClass('fa-play');
			} else {
				$('.chgStatus').eq(index).find('i').removeClass('fa-play').addClass('fa-stop');
			}
			
		};
		
		$.ajax({
			async: false,
			type: "POST",
			url: "/chgStatusSchedule.do",		
			data: paramData,
	        dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					callback(data);
				}
	        }
	    });
}

function ajaxShowHistoryList(row) {
	var ajaxShowHistory = function(params) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/getHistoryList.do",		
			data: {'SCHE_NO' : row.SCHE_NO},
	        dataType: "json",
			success: function (data, textStatus, jqXHR) {
				var dataSet = data.results;
				var tableData = {
					"total": dataSet.length,
					"rows": dataSet
				};
				params.success(tableData, textStatus, jqXHR);
				$('[data-toggle="tooltip"]').tooltip();
				$('[data-toggle="popover"]').popover({ html:true });
	        }
	    });
	};
	$('#tblHistoryList').bootstrapTable('refreshOptions', {
        ajax:ajaxShowHistory
    });
}

function ajaxShowHistory(params) {
	console.log(params);
	$.ajax({
		async: false,
		type: "POST",
		url: "/getHistoryList.do",		
		data: {'SCHE_NO' : params.params.SCHE_NO},
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			var tableData = {
				"total": dataSet.length,
				"rows": dataSet
			};
			params.success(tableData, textStatus, jqXHR);
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover({ html:true });
        }
    });
}

function formatter(value, row, index) {
	var retStr_edit_on = (row.SCHE_STATUS == '0') ? 
							'<a tabindex="0" href="javascript:void(0)" class="chgStatus" style="margin-right:7px"><i class="fas fa-stop font-black" title="중지"></i></a>' :
							'<a tabindex="0" href="javascript:void(0)" class="chgStatus" style="margin-right:7px"><i class="fas fa-play font-black" title="시작"></i></a>';	
	var retStr_menu_on = 	'<a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-blue" title="수정"></i></a>';

	var retStr = retStr_edit_on + retStr_menu_on;
	return retStr;
}

function linker(value, row, index) {
	return '<a tabindex="0" href="javascript:void(0)" class="showHistory" style="margin-right:7px">' + value + '</a>';
}

//ajax - 테이블 목록 조회
function ajaxSelectScheduleList(params) {
	console.log(params);
	$.ajax({
		async: false,
		type: "POST",
		url: "/getScheduleList.do",		
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
			$('[data-toggle="popover"]').popover({ html:true });
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

		var aa = { 
				"MST_CODE": $("#txtMstCode").val()
				, "DTL_CODE": $("#txtDtlCode").val()
				, "DTL_NAME_KO": $("#txtDtlNameKo").val()
				, "DTL_NAME_EN": $("#txtDtlNameEn").val()
				, "DTL_ORDER": $("#txtDtlOrder").val()
				, "USE_YN": $("#ddlDtlUseYn").val() 
		};
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
function btnScheduleModalSave_click() {
	
	var chkValidation = checkRequiredField("dlgScheduleEdit");

	if (!chkValidation) {
		
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			$.ajax({
				async: false,
				type: "POST",			
				url: "/saveSchedule.do",
				data: { 
					'SCHE_NO': $('#txtScheduleCode').val(), 
					'SCHE_NAME': $('#txtScheduleName').val(), 
					'SCHE_TYPE': $('#selScheduleType').val() , 
					'SCHE_VALUE': $('#txtScheduleValue').val(), 
					'SCHE_STATUS': $('#selScheduleStatus').val(), 
					'SCHE_STATUS_NAME': $('#selScheduleStatus').val() == '1' ? 'Stop' : 'Running', 
					'JOB_CLASS': $('#txtJobClass').val()
				},
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblList').bootstrapTable('refresh');
						$('#dlgScheduleEdit').modal('hide');
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
function InitForNewMenu(mode, row) {

	if(mode=='add'){
		$('#txtScheduleCode').val('');
		$('#txtScheduleName').val('');
		$('#selScheduleType').val('cron');
		$('#txtScheduleValue').val('');
		$('#selScheduleStatus').val('0');
		$('#txtJobClass').val('');
		
		//버튼처리
		$("#btnCodeModalSave").show();
		
		//validation 오류 표시 제거
		removeValidationError("dlgScheduleEdit");
		
	}
	else if(mode == 'edit'){
		$('#txtScheduleCode').val(row.SCHE_NO);
		$('#txtScheduleName').val(row.SCHE_NAME);
		$('#selScheduleType').val(row.SCHE_TYPE);
		$('#txtScheduleValue').val(row.SCHE_VALUE);
		$('#selScheduleStatus').val(row.SCHE_STATUS);
		$('#txtJobClass').val(row.JOB_CLASS);
		
		$("#btnCodeModalSave").show();
		
		//validation 오류 표시 제거
		removeValidationError("dlgScheduleEdit");
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