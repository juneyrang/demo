var selections = [];
var selectRow = null;

var curLocation = 'first';
var setupMode = "add";

// 문서 로딩 & 초기화, Select, datepicker, autocomplete
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () {
		initSetupModal('add');
		$('#dlgMaterialSetup').modal('show');
	});

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnMaterialSetupSave').click(function () {
		materialSetupSave();
		return false;
	});
});

gridEvents = {
	'click .editMenu': function (e, value, row, index) {
		initSetupModal('edit',row);
		$('#dlgMaterialSetup').modal('show');
	},
	'click .deleteMenu': function (e, value, row, index) {
		deleteMaterialSetup(row);
	},
};

function formatter(value, row, index) {
	if(curLocation === 'first') {
		getLocation();
	}
	
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteMenu"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';
	
	var retStr = retStr_edit_on + retStr_del_on;
	/*if(curLocation === 'dev') retStr = retStr_edit_on + retStr_del_on;
	else retStr = retStr_edit_on + retStr_del_on;*/
	return retStr;
}

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩
function initControls() {
	changeProjectNo();
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

function changeProjectNo(row){
	var param = {};
	if(row != null){
		param.ddlProjectNo = row.PROJECT_NO;
	}else{
		param.ddlProjectNo = $("#ddlProjectNo").val();
	}

}

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
		ajax: "ajaxSelectMaterialSetupList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
}

function ajaxSelectMaterialSetupList(params) {
	$.ajax({
		async: false,
		type: "POST",
		url: "/getMaterialSetup.do",
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

function completeDataBind(res) {
	$.each(res.rows, function (i, row) {
		
	});
	return res;
}

function initSetupModal(mode, row) {
	console.log(row);
	setupMode = mode;
	if(mode === 'add') {
		$("#ddlProjectNo").attr("disabled",false);
		$(".form-control-user").val('Y');
		$("#ddlProjectName").val("");
	}
	else if (mode === 'edit') {
		$("#ddlProjectNo").attr("disabled",true);
		$("#ddlMrrYn").val(row.MRR_YN);
		$("#ddlMirYn").val(row.MIR_YN);
		$("#ddlOsdmYn").val(row.OSDM_YN);
	}
	
	//validation 오류 표시 제거
	removeValidationError("dlgMaterialSetup");
	
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

// validation 오류 표시 제거
function removeValidationError(areaID) {
	$("#" + areaID + " .validation-error").each(function () {
		$(this).removeClass("validation-error");
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

function materialSetupSave() {
	var chkValidation = checkRequiredField("dlgMailEdit");
	var param = {};
	if (!chkValidation) {
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled(); //POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
			
			$(".form-control-user").each((i,e) => {
				param[$(e).attr("id")] = $(e).val();
			});

			param.mode = setupMode;
			console.log(param);

			$.ajax({
				type: "POST",
				contentType:"application/json",
				url: "/saveMaterialSetup.do",
				data: JSON.stringify(param),
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == -1) {
							alert_fail($('#alertProjectDuplication').val());
						} else{
							alert_fail(result.error);
						}
					} else {
						alert_success($('#alertSaveSuccess').val());

						$('#tblList').bootstrapTable('refresh');
						$('#dlgMaterialSetup').modal('hide');
						initSetupModal('add');
					}
				}
			});
		}
	}
}

//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
function removeDisabled() {
	$("input:disabled").attr("disabled", false);
	$("select:disabled").attr("disabled", false);
}

function deleteMaterialSetup(row){
	if (confirm($('#alertDelete').val())) {
		$.ajax({
			url: "/deleteMaterialSetup.do",
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