
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
var idcs_id;
var federated_yn;
var cRrow;
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () {
		InitForNewMenu('add');
		$('#dlgUserEdit').modal('show');

	});



	$('#btnPerModalSave').click(function () {
		btnPerModalSave_click();
		return false;
	});

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnUserModalSave').click(function () {
		btnUserModalSave_click();
		return false;
	});
	//등록/수정 팝업 - 삭제 버튼 클릭
	$('#btnUserModalDelete').click(function () {
		btnUserModalDelete_click();
		return false;
	});

	//IDCS Sync 버튼 클릭
	$('#btnUserModalIDCSSync').click(function () {
		btnUserModalIDCSSync_click();
		return false;
	});

	//reset password 버튼 클릭
	$('#btnUserModalResetPassword').click(function () {
		btnUserModalResetPassword_click();
		return false;
	});
	//등록/수정 팝업 호출 시 이벤트
	$("#dlgPerSelect").on('show.bs.modal', function(e) { $('#tblPerList').bootstrapTable('refresh'); });

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

	$('#tblPerList').bootstrapTable('destroy').bootstrapTable({
       columns: [
         {
           field: 'ck',
           checkbox: true,
           align: 'center'
         },
         {
           field: 'ROLE_NAME',
           title: 'Name',
         }
        ],
		search: false,
		showRefresh: false,
		showFullscreen: false,
		clickToSelect: false,
		idField: "ROLE_SEQ",
		ajax: "ajaxSelectPerList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});



      $('.modal-body .fixed-table-body').css('height','300px')
}



function ajaxSelectPerList(params) {

	$.ajax({
		async: false,
		type: "POST",
		url: "/getUserPermission.do",
		data: {"P_USER_AD": $("#txtAd").val()},
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
		idField: "USER_AD",
		pageList: "[10, 25, 50, 100, all]",
		ajax: "ajaxSelectUserList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
}


gridEvents = {

	'click .editMenu': function (e, value, row, index) {

		InitForNewMenu('edit');

		idcs_id = row.IDCS_ID;
		federated_yn = row.FEDERATED_YN;
		cRrow = row;
		$('#txtName').val(row.USER_NAME);
		$('#txtAd').val(row.USER_AD);
		$('#txtDeptName').val(row.DEPT_NAME);
		$('#txtMail').val(row.MAIL);
		$('#selExpireFlag').val(row.EXPIRE_FLAG);

		if(idcs_id != null && idcs_id != "N"){
			var searchParam = {"idcs_id" : idcs_id};
			var user = IDCS.searchUser(searchParam);
			if(Object.keys(user).length > 0){
				$('#txtIdcsName').val(user.displayName);
				$('#txtIdcsMail').val(user.emails[0].value);
				$('#txtIdcsFederatedYn').val(federated_yn);
				var userLockKey = "urn:ietf:params:scim:schemas:oracle:idcs:extension:userState:User";
				$('#txtIdcsStatus').val((user[userLockKey] != null && user[userLockKey].locked.on == true) ? "잠김" : "활성");

			}
		}else if(idcs_id == "N"){
			$("#idcsDiv").hide();
		}

		if(federated_yn == "Y"){
			$("#txtName").attr("readonly",true);
			$("#txtMail").attr("readonly",true);
		}


		$('#dlgUserEdit').modal('show');

	},
	'click .deleteMenu': function (e, value, row, index) {
		$('#txtAd').val(row.USER_AD);
		btnUserModalDelete_click();
	},
	'click .setPer': function (e, value, row, index) {
		$('#txtAd').val(row.USER_AD);
		$('#dlgPerSelect').modal('show');
	},
	'click .setInitPwd': function (e, value, row, index) {
		$('#txtAd').val(row.USER_AD);
		setInitPwd();
	},
};

function formatter(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteMenu"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';
	var retStr_menu_on = ' <a tabindex="0" href="javascript:void(0)" class="setPer"><i class="fas fa-bars font-blue" title="권한 설정"></i></a>&nbsp;';
	var retStr_init_pwd = ' <a tabindex="0" href="javascript:void(0)" class="setInitPwd"><i class="fas fa-user-lock font-red" title="비밀번호 초기화"></i></a>&nbsp;';

	var retStr = retStr_edit_on + retStr_del_on + retStr_menu_on + retStr_init_pwd;
	return retStr;
}

function setInitPwd() {
		if (confirm("비밀번호 초기화 하시겠 습니까?")) {

			$.ajax({
				async: false,
				type: "POST",
				url: "/initDesmPwd.do",
				data: {P_USER_AD : $('#txtAd').val()},
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
					}
				}
			});
		}


}


//ajax - 테이블 목록 조회
function ajaxSelectUserList(params) {

	$.ajax({
		async: false,
		type: "POST",
		url: "/getUser.do",
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


function btnPerModalSave_click() {


		if (confirm($('#alertSave').val())) {

			var list = $('#tblPerList').bootstrapTable('getSelections');
			var paramList = JSON.stringify(list);
			$.ajax({
				async: false,
				type: "POST",
				url: "/saveUserPermission.do",
				data: { "P_USER_AD": $("#txtAd").val(), "updateList": paramList },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());

						$('#tblPerList').bootstrapTable('refresh');
					}
				}
			});

		}

}


//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnUserModalSave_click() {

	var chkValidation = checkRequiredField("dlgUserEdit");

	if (!chkValidation) {
		alert($('#alertValidate').val());
		return false;
	}

	var msg = $('#alertSave').val();
	if(federated_yn == "N" && ($('#txtIdcsMail').val() != $('#txtMail').val() || $('#txtIdcsName').val() != $('#txtName').val())){
		msg =$("#alertIDCSSave").val();
	}

	if (confirm(msg)) {
		var param = {};
		param.userName = $("#txtAd").val();
		param.name = $("#txtName").val();
		param.email = $("#txtMail").val();
		param.idcs_id = idcs_id;

		if(idcs_id == null){
			var searchParam = {"userName" : param.userName};
			var user = IDCS.searchUser(searchParam);
			if(Object.keys(user).length > 0){
				if(user.emails[0].value != param.email || user.displayName != param.name){
					// TODO: 안내 문구 상세하게 표시하여 작업자가 기 등록된 IDCS 정보를 확인하여 재 생성할 수 있도록 유도.
					//alert_modal("", $('#alertIDCSCreateUserCheckError').val());
					alert_modal("", $('#alertIDCSCreateUserCheckError').val().format(user.userName, user.displayName, user.emails[0].value));
					return;
				}else{
					idcs_id = user.id;
					federated_yn = (user["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"].isFederatedUser == true ? "Y" : "N")
					btnUserModalSave();
				}
			}else{
				IDCS.createUser(param, function(res){
					idcs_id = res.results.success;
					btnUserModalSave();
				});
			}

		}else if(federated_yn == "N" && ($('#txtIdcsMail').val() != $('#txtMail').val() || $('#txtIdcsName').val() != $('#txtName').val())){
			IDCS.updateUser(param,btnUserModalSave);
		}else{
			btnUserModalSave();
		}

	}
}

function btnUserModalSave(){
	removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

	var data = {
			 "P_USER_AD": $("#txtAd").val(), "USER_NAME": $("#txtName").val(), "DEPT_NAME": $("#txtDeptName").val(), "MAIL": $("#txtMail").val(),
			 "EXPIRE_FLAG": $("#selExpireFlag").val() , IDCS_YN : idcs_id, FEDERATED_YN : federated_yn
	};
	$.ajax({
		async: false,
		type: "POST",
		url: "/saveUser.do",
		data: data,
		dataType: "json",
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				alert_success($('#alertSaveSuccess').val());

				$('#tblList').bootstrapTable('refresh');
				$('#dlgUserEdit').modal('hide');
				InitForNewMenu('add');
			}
		}
	});
}

//팝업 - 삭제 버튼 클릭
function btnUserModalDelete_click() {

	if (confirm($('#alertDelete').val())) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/deleteUser.do",
			data: { "P_USER_AD": $("#txtAd").val()},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					InitForNewMenu('add');
					initTable();
					$('#dlgUserEdit').modal('hide');
					alert_success($('#alertDeleteSuccess').val());
				}
			}
		});
	}
	return;
}
//#endregion

//#region 등록/수정 팝업 관련
//신규 요청을 위한 modal 초기화
function InitForNewMenu(mode) {
	idcs_id = null;
	federated_yn = null;
	cRrow = {};
	$("#txtName").val("");
	$("#txtAd").val("");
	$("#txtDeptName").val("");
	$("#txtMail").val("");
	$("#selExpireFlag").val("N");
	$("#txtIdcsName").val("");
	$("#txtIdcsMail").val("");
	$("#txtIdcsFederatedYn").val("");
	$("#txtIdcsStatus").val("");
	$("#idcsDiv").show();
	$("#txtName").removeAttr("readonly");
	$("#txtMail").removeAttr("readonly");
	if(mode=='add'){
		$("#txtAd").removeAttr("readonly");
		//버튼처리
		$("#btnUserModalSave").show();
		$("#btnUserModalDelete").hide();
		$("#btnUserModalIDCSSync").hide();
		$("#btnUserModalResetPassword").hide();
		$("#idcsDiv").hide();

	}else if(mode == 'edit'){
		$("#txtAd").attr("readonly",true);
		$("#btnUserModalSave").show();
		$("#btnUserModalDelete").show();
		$("#btnUserModalResetPassword").show();
//		$("#btnUserModalIDCSSync").show();
		$("#btnUserModalIDCSSync").hide();//기능 숨김
	}

	//validation 오류 표시 제거
	removeValidationError("dlgUserEdit");
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

function btnUserModalIDCSSync_click(){
	if (confirm($('#alertIDCSSync').val())) {
		var param = {userName : $("#txtAd").val()};
		var user = IDCS.searchUser(param);
		console.log(user);
		if(user != null){
			param.id = user.id;
			param.federated_yn = (user["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"].isFederatedUser == true ? "Y" : "N")
			IDCS.updateUserUUID(param);
		}
	}
}
function btnUserModalResetPassword_click(){
	if(idcs_id == null || idcs_id == "N"){
		alert_fail("The IDCS account is not linked.");
		return;
	}

	if(federated_yn == "Y"){
		alert_fail($("#alertIDCSResetPasswordError").val());
		return;
	}

	confirm_modal("", $('#alertReset').val(), null, function (callobj, result) {
		if(result) {
			IDCS.resetPassword({"idcs_id":idcs_id},function(){
				InitForNewMenu('add');
				initTable();
				$('#dlgUserEdit').modal('hide');
				alert_success($('#alertSuccess').val());
			});
		}
	});
}