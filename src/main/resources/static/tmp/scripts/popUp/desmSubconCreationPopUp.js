var v_desm_subcon_creation_callback = null;
var v_desm_subcon_creation_param;
var idcs_id;
var federated_yn;
var cRrow;
function initDesmSubconCreationPopUp(param , callback) {
	v_desm_subcon_creation_callback = callback;
    v_desm_subcon_creation_param = param;


    initDesmSubconCreationPopUpCode();
}

function initDesmSubconCreationPopUpCode() {
	idcs_id = null;
	federated_yn = null;
	cRrow = {};
	var codeList = [{"CODE" : "R003"}];
	var paramList = JSON.stringify(codeList);

	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			var list = results.R003;
			var html = '';
			for(var i = 0; i < list.length; i++) {
				var row = list[i];
				html += '<option value="' + row.CODE + '">' + row.CODE + '</option>';
			}

			$('#selDlgDesmSubconCreationDefaultCountry').append(html);

			searchRole();
        }
    });

}

function searchRole() {

	$.ajax({
		url: "/getDesmSubconRoleList.do",
		data: {},
		success: function (data, textStatus, jqXHR) {

			var list = data.results;
			var html = '';
			for(var i = 0; i < list.length; i++) {
				var row = list[i];
				html += '<option value="' + row.ROLE_SEQ + '">' + row.ROLE_NAME + '</option>';
			}

			$('#selDlgDesmSubconCreationRole').append(html);

			initDesmSubconCreationPopUpControls();
			
			if(v_desm_subcon_creation_param.EDIT_TYPE == "E") {
				searchData();
			}
        }
    });
}


function initDesmSubconCreationPopUpControls() {

	$('#dlgDesmSubconCreation').on('shown.bs.modal', function () {
		$('#dlgDesmSubconCreation').click();
	});

	$('#dlgDesmSubconCreation').on('hidden.bs.modal', function () {
	  	closeDesmSubconCreationPopUp();
	});

	$('#dlgDesmSubconCreation').modal('show');

	$('#btnDlgDesmSubconCreationSave').click(function () { btnDlgDesmSubconCreationSaveClick(); return false; });
	$('#btnDlgDesmSubconCreationResetPassword').click(function () { btnDlgDesmSubconCreationResetPasswordClick(); return false; });


	var list = v_desm_subcon_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}

	if(v_desm_subcon_creation_param.EDIT_TYPE == "E") {
		if(v_desm_subcon_creation_param.GUBUN != "SITE"){
			$('#btnDlgDesmSubconCreationResetPassword').remove();
		}
	}else {
		$('#btnDlgDesmSubconCreationResetPassword').remove();
	}

//22.09.23 reset password 버튼 삭제
//	$('#btnDlgDesmSubconCreationResetPassword').remove();
}

function searchData() {

	$("#txtDlgDesmSubconCreationId").attr("readonly",true);

	var paramData = {E_USER_AD : v_desm_subcon_creation_param.E_USER_AD};

	$.ajax({
		url: "/getDesmSubconList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			var row = data.results[0];
			console.log(row);
			cRrow = row;
			idcs_id = row.IDCS_ID;
			federated_yn = row.FEDERATED_YN;
			$('#txtDlgDesmSubconCreationId').val(row.USER_AD);
			$('#txtDlgDesmSubconCreationName').val(row.USER_NAME);
			$('#txtDlgDesmSubconCreationDeptName').val(row.DEPT_NAME);
			$('#selDlgDesmSubconCreationRole').val(row.ROLE_SEQ);
			$('#txtDlgDesmSubconCreationMail').val(row.MAIL);
			$('#selDlgDesmSubconCreationDefaultCountry').val(row.COUNTRY);

			if(federated_yn == "Y"){
				$("#txtDlgDesmSubconCreationName").attr("readonly",true);
				$("#txtDlgDesmSubconCreationMail").attr("readonly",true);
			}

        }
    });
}

function closeDesmSubconCreationPopUp() {

}

function btnDlgDesmSubconCreationResetPasswordClick() {

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
				alert_success($('#alertSuccess').val());
				$('#dlgDesmSubconCreation').modal('hide');
			});

//			$.ajax({
//				async: false,
//				type: "POST",
//				url: "/initDesmPwd.do",
//				data: {P_USER_AD : $('#txtDlgDesmSubconCreationId').val()},
//				dataType: "json",
//				success: function (result, textStatus, jqXHR) {
//					if (result.error != null) {
//						alert_fail(result.error);
//					} else {
//						alert_success($('#alertSuccess').val());
//						$('#dlgDesmSubconCreation').modal('hide');
//					}
//				}
//			});

		}
	});
}


function btnDlgDesmSubconCreationSaveClick() {

	var chkValidation = checkRequiredField("divDlgDesmSubconCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var msg = $('#alertSave').val();
	if(federated_yn == "N" && (cRrow.MAIL != $('#txtDlgDesmSubconCreationMail').val() || cRrow.USER_NAME != $('#txtDlgDesmSubconCreationName').val())){
		msg =$("#alertIDCSSave").val();
	}

	confirm_modal("", msg, null, function (callobj, result) {

		if(result) {
			var param = {};
			param.userName = $('#txtDlgDesmSubconCreationId').val();
			param.name = $('#txtDlgDesmSubconCreationName').val();
			param.email = $('#txtDlgDesmSubconCreationMail').val();
			param.idcs_id = idcs_id;
			if(idcs_id == null){
				var searchParam = {"userName" : param.userName};
				var user = IDCS.searchUser(searchParam);
				if(Object.keys(user).length > 0){
					if(user.emails[0].value != param.email || user.displayName != param.name){
						alert_modal("", $('#alertIDCSCreateUserCheckError').val().format(user.userName, user.displayName, user.emails[0].value));
						return;
					}else{
						idcs_id = user.id;
						federated_yn = (user["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"].isFederatedUser == true ? "Y" : "N")
						btnDlgDesmSubconCreationSave();
					}
				}else{
					IDCS.createUser(param, function(res){
						idcs_id = res.results.success;
						btnDlgDesmSubconCreationSave();
					});
				}

			}else if(federated_yn == "N" && (cRrow.MAIL != $('#txtDlgDesmSubconCreationMail').val() || cRrow.USER_NAME != $('#txtDlgDesmSubconCreationName').val())){
				IDCS.updateUser(param,btnDlgDesmSubconCreationSave);
			}else{
				btnDlgDesmSubconCreationSave();
			}

		}
	});
}

function btnDlgDesmSubconCreationSave(){
	var list = [];
	list.push({ROLE_SEQ : $('#selDlgDesmSubconCreationRole').val()});
	var paramList = JSON.stringify(list);

	// 20220820: P_PROJECT 추가, Save시에 PROJECT Assign, 및 default project 지정
	var paramData = {"P_USER_AD" : $('#txtDlgDesmSubconCreationId').val(),
					"USER_NAME" : $('#txtDlgDesmSubconCreationName').val(),
					 "DEPT_NAME" : $('#txtDlgDesmSubconCreationDeptName').val(),
					 "MAIL" : $('#txtDlgDesmSubconCreationMail').val(),
					 EDIT_TYPE : v_desm_subcon_creation_param.EDIT_TYPE,
					 "COUNTRY_CODE" : $('#selDlgDesmSubconCreationDefaultCountry').val(),
					 "updateList": paramList,
					 P_PROJECT: parent.document.querySelector("#spanDefaultProject").innerHTML.split("[")[1].split("-")[0].trim(),
					 IDCS_YN : idcs_id,
					 FEDERATED_YN : federated_yn
					 };

	$.ajax({
		url: "/saveDesmSubconSave.do",
		data: paramData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				if(result.error == "OVERLAP") {
					var msg = $('#alertSaveSubconUserErr').val();
					alert_fail(msg);
				}else{
					alert_fail(result.error);
				}
			} else {
				alert_success($('#alertSuccess').val());
				if(v_desm_subcon_creation_callback) {
					v_desm_subcon_creation_callback("save-item", null);
				}
				$('#dlgDesmSubconCreation').modal('hide');
			}
		}
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