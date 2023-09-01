
var v_mail_add_callback = null;
var v_mail_add_param;

function initMailAddPopUp(param , callback) {
	v_mail_add_callback = callback;
    v_mail_add_param = param;
    
    initMailAddPopUpCode();    
}

function initMailAddPopUpCode() {
	initMailAddPopUpControls();
}


function initMailAddPopUpControls() {	

	$('#dlgMailAdd').on('shown.bs.modal', function () {
		$('#dlgMailAdd').click();
	});
	
	$('#dlgMailAdd').on('hidden.bs.modal', function () {
	  	closeMailAddPopUp();
	})

	makeAutocomplete(
		"txtDlgMailAddEmpName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgMailAddDeptName,txtDlgMailAddEmpAD,txtDlgMailAddTransCompanyYn",		//clear필드 id
		"/getTransShippingRequestMailEmp.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgMailAddEmpName").val(ui.item.value.split("|")[0]);
			$("#txtDlgMailAddDeptName").val(ui.item.value.split("|")[1]);
			$("#txtDlgMailAddEmpAD").val(ui.item.value.split("|")[2]);
			$("#txtDlgMailAddTransCompanyYn").val(ui.item.value.split("|")[3]);
			
	
			return false;
		}
	); 	
	
	$('#txtDlgMailAddEmpName').val("");
	$('#txtDlgMailAddDeptName').val("");
	$('#txtDlgMailAddEmpAD').val("");
	$('#txtDlgMailAddTransCompanyYn').val("");
	$("#txtDlgMailAddEmpName").parent().find(".autocomplete-valid").hide();	
	
	$('#btnDlgMailAddSelect').click(function () { btnDlgMailAddSelectClick(); return false; });
	
}

function closeMailAddPopUp() {
	
}

function btnDlgMailAddSelectClick() {

	if($("#txtDlgMailAddEmpName").val().length < 2 || $("#txtDlgMailAddEmpAD").val() == ""){
		//alert($('#alertMailSelectFail1').val());
		alert_modal("알람", $('#alertMailSelectFail1').val());
		return;	
	}
	
	var item = {"EMP_NAME" : $("#txtDlgMailAddEmpName").val(),
				"DEPT_NAME" : $("#txtDlgMailAddDeptName").val(),
				"EMP_AD" : $("#txtDlgMailAddEmpAD").val()};
				
	if(v_mail_add_callback)
	{
		v_mail_add_callback("select-item", item);
	}	
	
	
}




