var selections = [];
var selectRow = null;

var curLocation = 'first';

//#region 문서 로딩 & 초기화, Select, datepicker, autocomplete
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () {
		InitForNewMenu('add');
		$('#dlgMailEdit').modal('show');

	});

	$('#btnSendTest').click(function () {
		$.ajax({
			url: "/sendMailSupplySummaryTest.do",
			data: {},
		}).done(function (data, textStatus, jqXHR) {
			console.log(data);
	    });
	});

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnMailModalSave').click(function () {
		btnMailModalSave_click();
		return false;
	});

	$("#ddlProjectNo").change(function(){
		changeProjectNo();
	});
});

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩
function initControls() {
	changeProjectNo();
}

function changeProjectNo(row){
	var param = {};
	if(row != null){
		param.ddlProjectNo = row.PROJECT_NO;
	}else{
		param.ddlProjectNo = $("#ddlProjectNo").val();
	}

	$.ajax({
		url: "/getProjectSupplyScope.do",
		data: param,
	}).done(function (data, textStatus, jqXHR) {
		var html = "";
		data.results.forEach((e,i) => {
			if(row?.EXCEPT_SCOPE?.split(",").includes(e.ATTRIBUTE6) ){
				html += `<option selected value='${e.ATTRIBUTE6 == null ? '' : e.ATTRIBUTE6}'>${e.ATTRIBUTE6 == null ? ' ' : e.ATTRIBUTE6}</option>`;
			}else{
				html += `<option value='${e.ATTRIBUTE6 == null ? '' : e.ATTRIBUTE6}'>${e.ATTRIBUTE6 == null ? ' ' : e.ATTRIBUTE6}</option>`;
			}
		});
		$("#ddlExceptScope").html(html);
		$('#ddlExceptScope').SumoSelect({placeholder: ' '});
		$("#ddlExceptScope")[0].sumo.reload();
    });

}
//#endregion

//#region 코드성 데이터 처리, dropdown 바인딩
//#endregion

//#region 이벤트 - List페이지
//#endregion

window.onload = function () {

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
		idField: "PROJECT_NO",
		pageList: "[10, 25, 50, 100, all]",
		ajax: "ajaxSelectMailList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
}


gridEvents = {

	'click .editMenu': function (e, value, row, index) {
		InitForNewMenu('edit',row);

		$('#dlgMailEdit').modal('show');

	},
	'click .deleteMenu': function (e, value, row, index) {
		deleteMailSetup(row);

	},
	'click .mailMenu': function (e, value, row, index) {
		mailSend(row);
	},
	'click .mailMenu2': function (e, value, row, index) {
		mailSendUser(row);
	},
	'click .mailMenu3': function (e, value, row, index) {
		mailSendSpecialTool(row);
	},
};
function deleteMailSetup(row){
	if (confirm($('#alertDelete').val())) {
		$.ajax({
			url: "/deleteMail.do",
			data: {PROJECT_NO : row.PROJECT_NO},
		}).done(function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				alert_success($('#alertDeleteSuccess').val());
				$('#tblList').bootstrapTable('refresh');
			}
	    });
	}
}
function mailSend(row){
	if(confirm($("#alertMailSend").val())){
		$.ajax({
			url: "/mailSend.do",
			data: {ddlProjectNo : row.PROJECT_NO},
		}).done(function (result, textStatus, jqXHR) {
			console.log(result);
			if (result.error != null) {
				alert_fail(result.error);
			}
	    });
	}
}
function mailSendUser(row){
	if(confirm($("#alertMailSend").val())){
		$.ajax({
			url: "/mailSendUser.do",
			data: {ddlProjectNo : row.PROJECT_NO},
		}).done(function (result, textStatus, jqXHR) {
			console.log(result);
			if (result.error != null) {
				alert_fail(result.error);
			}
		});
	}
}
function mailSendSpecialTool(row) {
	if(confirm($("#alertMailSend").val())){
		$.ajax({
			url: "/mailSendSpecialTool.do",
			data: {ddlProjectNo : row.PROJECT_NO},
		}).done(function (result, textStatus, jqXHR) {
			console.log(result);
			if (result.error != null) {
				alert_fail(result.error);
			}
		});
	}
}

function formatter(value, row, index) {
	if(curLocation === 'first') {
		getLocation();
	}
	
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteMenu"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';
	
	var retStr_mail_on = ' <a tabindex="0" href="javascript:void(0)" class="mailMenu"><i class="fas fa-solid fa-envelope font-blue" title="기자재Sum_PM"></i></a>&nbsp;';
	var retStr_mail_on2 = ' <a tabindex="0" href="javascript:void(0)" class="mailMenu2"><i class="fas fa-solid fa-envelope font-black" title="Date지연_개인"></i></a>&nbsp;';
	var retStr_mail_on3 = ' <a tabindex="0" href="javascript:void(0)" class="mailMenu3"><i class="fas fa-solid fa-envelope font-yellow" title="ST Send"></i></a>&nbsp;';

	var retStr;
	if(curLocation === 'dev') retStr = retStr_edit_on + retStr_del_on + retStr_mail_on + retStr_mail_on2 + retStr_mail_on3;
	else retStr = retStr_edit_on + retStr_del_on;
	
	return retStr;
}

function getLocation() {
	$.ajax({
		url: "/getLocation.do",
		data: {},
		async: false,
		success: function (data, textStatus, jqXHR) {
			var location = data.result;
			curLocation = location;
	    }
	});
}

//ajax - 테이블 목록 조회
function ajaxSelectMailList(params) {
	$.ajax({
		async: false,
		type: "POST",
		url: "/getMail.do",
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



//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnMailModalSave_click() {
	$("#ddlExceptScope")[0].sumo.hideOpts();
	var chkValidation = checkRequiredField("dlgMailEdit");
	var param = {};
	if (!chkValidation) {

		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			$(".form-control-user").each((i,e) => {
				param[$(e).attr("id")] = $(e).val();
			})

			param.mode = mailMode;
			console.log(param);

			$.ajax({
				type: "POST",
				contentType:"application/json",
				url: "/saveMail.do",
				data: JSON.stringify(param),
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == -1){
							alert_fail($('#alertProjectDuplication').val());
						}else{
							alert_fail(result.error);
						}
					} else {
						alert_success($('#alertSaveSuccess').val());

						$('#tblList').bootstrapTable('refresh');
						$('#dlgMailEdit').modal('hide');
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
var mailMode = "add";
function InitForNewMenu(mode,row) {
	console.log(row);
	mailMode = mode;
	if(mode=='add'){
		$("#ddlProjectNo").attr("disabled",false);
		$(".form-control-user").val('Y');
		$("#ddlProjectName").val("");

		//validation 오류 표시 제거
		removeValidationError("dlgMailEdit");
	} else if(mode == 'edit'){
		$("#ddlProjectNo").attr("disabled",true);

		$("#ddlProjectName").val(row.PROJECT_NAME);
		$("#ddlCargoYn").val(row.CARGO_YN);
		$("#ddlFobYn").val(row.FOB_YN);
		$("#ddlL2Yn").val(row.L2_YN);
		$("#ddlL3Yn").val(row.L3_YN);
		$("#ddlL4Yn").val(row.L4_YN);
		$("#ddlMpsYn").val(row.MPS_YN);
		$("#ddlOffYn").val(row.OFF_YN);
		$("#ddlOnYn").val(row.ON_YN);
		$("#ddlOnsiteYn").val(row.ONSITE_YN);
		$("#ddlPoYn").val(row.PO_YN);
		$("#ddlTeYn").val(row.TE_YN);

		//validation 오류 표시 제거
		removeValidationError("dlgMailEdit");
	}

	$.ajax({
		url: "/getDesmDefaultProject.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var html = "";
			data.results.forEach((e,i) => {
				html += `<option ${e.SEGMENT1 == row?.PROJECT_NO ? 'selected' : ''} value='${e.SEGMENT1}'>[${e.SEGMENT1}] ${e.NAME}</option>`;
			});
			$("#ddlProjectNo").html(html);

			if(mode=='add'){
				changeProjectNo();
			} else if(mode == 'edit'){
				$("#ddlProjectNo").val()
				changeProjectNo(row);
			}
        }
    });


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