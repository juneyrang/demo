var v_strategic_ews_receiver_callback = null;
var v_strategic_ews_receiver_param;

var gridLangUrl;

function initStrategicEwsReceiverPopUp(param , callback) {
	v_strategic_ews_receiver_callback = callback;
	v_strategic_ews_receiver_param = param;
    
	initStrategicEwsReceiverPopUpCode();    
}

function initStrategicEwsReceiverPopUpCode() {
	initStrategicEwsReceiverPopUpControls();
}

function initStrategicEwsReceiverPopUpControls() {	
	
	$('#dlgStEwsUser').on('shown.bs.modal', function () {
		$('#dlgStEwsUser').click();
	});	
	
	$('#dlgStEwsUser').on('hidden.bs.modal', function () {
	  	closeStrategicEwsReceiverPopUp();
	});	
	
	$('#dlgStEwsUser').modal('show');
	
	makeAutocomplete(
		"txtDlgStEwsUserReceiver", 		//자동완성 입력 input
		"",								//keyword2 파라메터 id
		//"txtSearchCreatorAD,txtSearchCreatorDept",			//clear필드 id
		"",
		"/getSearchErpEmployee.do",  		//검색 URL
		2,								//검색 실행을 위한 keyword 최소 길이
		false,							//선택완료 마크 표시 여부
		function(event, ui) {
			$("#txtDlgStEwsUserId").val(ui.item.value.split("|")[1]);
			//$("#txtSearchCreatorID").val(param.USER_ID); // 20211222 EMPLOYEE_NUMBER가 AD로 되어있어서 CREATED_BY USER_ID로 변경하기 위해 수정
		    $("#txtDlgStEwsUserName").val(ui.item.value.split("|")[0]);
		    $("#txtDlgStEwsUserDept").val(ui.item.value.split("|")[3]);
		    $("#txtDlgStEwsUserMail").val(ui.item.value.split("|")[4]);
			
			return false;
		}
	);
	
	$('#iconDlgStEwsUserReceiverSearch').click(function () { iconDlgStEwsUserReceiverSearchClick(); return false; });
	$('#btnDlgStEwsUserSave').click(function () { btnDlgStEwsUserSaveClick(); return false; });

	var list = v_strategic_ews_receiver_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
	
	gridLangUrl = "/resources/gridJs/Languages/TextKR.js";
	
}

function closeStrategicEwsReceiverPopUp() {}

function iconDlgStEwsUserReceiverSearchClick() {

	var param = {keyword : $('#txtDlgStEwsUserReceiver').val()};

	var param = {"EMP_KEY" : $('#txtSearchCreator').val()};
	$('#dlgStEwsUserPopUp').load("/erpEmpListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			$('#dlgEmpList').on('shown.bs.modal', function () {
				$('#dlgEmpList').click();
			});

			$('#dlgEmpList').on('hidden.bs.modal', function () {
			  	closePopUp();
			})

			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					setSelectUser(param);
				}
			});

			$('#dlgEmpList').modal('show');
		}
	});
	
}

function setSelectUser(param) {
    $("#txtDlgStEwsUserId").val(param.EMPLOYEE_NUMBER);
    $("#txtDlgStEwsUserName").val(param.NAME);
    $("#txtDlgStEwsUserDept").val(param.DEPT_NAME);
    $("#txtDlgStEwsUserMail").val(param.EMAIL_ADDRESS);
	$('#dlgEmpList').modal('hide');
}

function btnDlgStEwsUserSaveClick() {
	var chkValidation = checkRequiredField("divDlgStEwsUserBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	var msg = "저장하시겠습니까?";
	
	confirm_modal("", msg, null, function (callobj, result) {
		if(result) {
		    var param = objNullCheck({
		    	EWS_NAME: $("#selDlgStEwsUserEwsName").val(),
		    	EWS_DESC: $("#selDlgStEwsUserEwsName option:checked").text(),
		    	RECEIVER_AD: $("#txtDlgStEwsUserId").val(),
		    	EMAIL: $("#txtDlgStEwsUserMail").val()
		    });
			
			$.ajax({
				url: "/saveStrategicEwsReceiver.do",
				data: param,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-3") {
							alert_fail($('#alertSaveAlreadyData').val());
						}				
						else {
							alert_fail(result.error);
						}				
						
					} else {
						alert_success($('#alertSaveSuccess').val());
						
						if(v_strategic_ews_receiver_callback) {
							v_strategic_ews_receiver_callback("save-item", null);
						}
						
						$('#dlgStEwsUser').modal('hide');
					}
				}
			});				
					
		}
	});		
}

