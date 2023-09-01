var gridLang = {};
var fileLang = "en";
var desmMprGrid;
var toDay = "";
var toMonth = "";
var supplierYn = "N";
var menuAuthList;

function gridResize() {
	$("#gridDesmMpr").width($(".table-responsive").width());
	$("#gridDesmMpr").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	initCode();
});

function initCode() {
	var codeList = [{"CODE" : "M003"}];
	var paramList = JSON.stringify(codeList);


	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			var	result = setCombo(results.M003, "selStatus", "all");

		 	toDay = results.DAY[0].CUR_DAY;
		 	toMonth = results.DAY[0].CUR_MON;
		 	initSupplier();

        }
    });

}

function initSupplier() {
	var param = {};

	$.ajax({
		url: "/getSupplierAuth.do",
		data: param,
		success: function (data, textStatus, jqXHR) {
			var item = data.results[0];
			supplierYn = item.SUPPLIER_YN;
			$('#txtSupplier').val(item.USER_NAME);
			$('#txtSupplierNo').val(item.USER_AD);
			
			
			initRole();
        }
    });

}

function initRole() {
	var param = {};

	$.ajax({
		url: "/getRole.do",
		data: param,
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			if(list.length > 0) {
				$('#txtProgressManager').val(list[0]["USER_NAME"]);
			}
			
			
			initExpediter();
			initControls();
        }
    });

}

function initExpediter() {
	var arrRoleSeq = $('#roleSeq', parent.document).val().split(',');
	$.each(arrRoleSeq, function(i, roleSeq) {
		if(roleSeq == '289') {
			$('#txtProgressManager').val($('#logh', parent.document).text());
			return false;
		}
	});
}

function initControls() {

	initMonthDatePicker("#txtStartMPRDate");
	initMonthDatePicker("#txtEndMPRDate");

	if(supplierYn == "Y") {
		$("#txtSupplier").attr("readonly",true);
	}

	makeAutocomplete(
		"txtProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	makeAutocompletePoList(
		"txtPoNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtSupplierNo",					//keyword3 파라메터 id
		supplierYn,					                        //supplier_yn
		'Y',				 //mpr_yn
		"txtPoName",		//clear필드 id
		"/getDesmMprPo.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtPoNo").val(ui.item.value.split("|")[0]);
			$("#txtPoName").val(ui.item.value.split("|")[1]);
			return false;
		}
	);
	
	makeAutocomplete(
		"txtTeamName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtTeamCode",		//clear필드 id
		"/getMprTeam.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {
			
			$("#txtTeamCode").val(ui.item.value.split("|")[0]);
			$("#txtTeamName").val(ui.item.value.split("|")[1]);
			return false;
		}
	);



	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#iconPoSearch').click(function () { iconPoSearchClick(); return false; });
	$('#btnMPRCreation').click(function () { btnMPRCreationClick(); return false; });
	$('#btnMPRReject').click(function () { btnMPRRejectClick(); return false; });
	$('#btnMPRApprove').click(function () { btnMPRApproveClick(); return false; });
	$('#btnMPRDelete').click(function () { btnMPRDeleteClick(); return false; });




	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtPoNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtSupplier").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtProgressManager").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtTeamName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	

	$("#txtDoosanManager").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtMprNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	initTable();
}

function initTable(){

	var gridCode = getGridCode();

	var desmMprGridCol = {"Cfg": {"id"				: "desmMprGrid"
									, "CfgId"			: "desmMprGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "1"
									, "CacheTimeout" : "100"
									, "Style"			: "Material"
									, "Size"			: "Small"
									, "Scale"			: "90%"
									, "ConstWidth"		: "100%"
									, "MinTagHeight"	: "200"
									, "MaxHeight"		: "1"
									, "Paging"			: "2"
									, "PageLength"		: "20"
									, "ChildParts"		: "2"
									, "NoPager"			: "1"
									, "Dragging"		: "0"
									, "SelectingSingle" : "0"
									, "Adding"			: "0"
									, "Export"			: "1"
									, "Deleting"		: "0"
									, "ConstHeight"		: "1"
									, "SafeCSS"			: "1"
									, "Code" : gridCode
									,"CopyCols" : "0"
									, "Sorting"			: "1"}
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "STATUS", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MPR_DATE", "Width": "120", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell"	: "openModal(Grid,Row,Col);" },
								{	"Name"	: "M", "Width": "50", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "PROJECT_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PO_NO", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PO_DESCRIPTION", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUPPLIER_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MANAGER", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "E_PLAN_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "E_ACTUAL_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "B_PLAN_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "B_ACTUAL_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "P_PLAN_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "P_ACTUAL_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CAL_PLAN_VAL", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CAL_ACTUAL_VAR", "Width": "66", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "RESULT_YN", "Width": "90", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REJECT_COMMENTS", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/pencil-alt.svg", "IconAlign" : "Right"	, "IconSize" : "2", "OnClickCell": "openCommetsModal( Grid, Row,Col )" },
								{	"Name"	: "MPR_NO", "Width": "190", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PROJECT_NO", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "3",
								"Class" : "gridCenterText",
								"STATUS"	: "Status", "STATUSRowSpan" : "3",
								"MPR_DATE"	: "MPR Date", "MPR_DATERowSpan" : "3",
								"M"	: "M", "MRowSpan" : "3",
								"PROJECT_NAME"	: "Project Name", "PROJECT_NAMERowSpan" : "3",
								"PO_NO"	: "PO No.", "PO_NORowSpan" : "3",
								"PO_DESCRIPTION"	: "PO Name", "PO_DESCRIPTIONRowSpan" : "3",
								"SUPPLIER_NAME"	: "Supplier", "SUPPLIER_NAMERowSpan" : "3",
								"MANAGER"	: "Progress\nmanager", "MANAGERRowSpan" : "3",
								"E_PLAN_VAR"	: "Progress Summary", "E_PLAN_VARSpan" : "8",
								"E_ACTUAL_VAR"	: "Progress Summary",
								"B_PLAN_VAR"	: "Progress Summary",
								"B_ACTUAL_VAR"	: "Progress Summary",
								"P_PLAN_VAR"	: "Progress Summary",
								"P_ACTUAL_VAR"	: "Progress Summary",
								"CAL_PLAN_VAL"	: "Progress Summary",
								"CAL_ACTUAL_VAR"	: "Progress Summary",
								"RESULT_YN"	: "Delivery", "RESULT_YNRowSpan" : "3",
								"REJECT_COMMENTS"	: "Return / Confirm", "REJECT_COMMENTSRowSpan" : "3",
								"MPR_NO"	: "MPR No.", "MPR_NORowSpan" : "3",
								"PROJECT_NO"	: "Project", "PROJECT_NORowSpan" : "3"
								},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"STATUS"	: "Status",
								"MPR_DATE"	: "MPR Date",
								"M"	: "M",
								"PROJECT_NAME"	: "Project Name",
								"PO_NO"	: "PO No.",
								"PO_DESCRIPTION"	: "PO Name",
								"SUPPLIER_NAME"	: "Supplier",
								"MANAGER"	: "Progress\nmanager",
								"E_PLAN_VAR"	: $('#gridColMprEm').val(), "E_PLAN_VARSpan" : "2",
								"E_ACTUAL_VAR"	: $('#gridColMprEm').val(),
								"B_PLAN_VAR"	: $('#gridColMprBuyer').val(), "B_PLAN_VARSpan" : "2",
								"B_ACTUAL_VAR"	: $('#gridColMprBuyer').val(),
								"P_PLAN_VAR"	: $('#gridColMprProduce').val(), "P_PLAN_VARSpan" : "2",
								"P_ACTUAL_VAR"	: $('#gridColMprProduce').val(),
								"CAL_PLAN_VAL"	: $('#gridColMprTotal').val(),  "CAL_PLAN_VALSpan" : "2",
								"CAL_ACTUAL_VAR"	: $('#gridColMprTotal').val(),
								"RESULT_YN"	: "Delivery",
								"REJECT_COMMENTS"	: "Return / Confirm",
								"MPR_NO"	: "MPR No.",
								"PROJECT_NO"	: "Project"
								},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"STATUS"	: "Status",
								"MPR_NO"	: "MPR No.",
								"MPR_DATE"	: "MPR Date",
								"M"	: "M",
								"PROJECT_NO"	: "Project",
								"PROJECT_NAME"	: "Project Name",
								"PO_NO"	: "PO No.",
								"PO_DESCRIPTION"	: "PO Name",
								"SUPPLIER_NAME"	: "Supplier",
								"MANAGER"	: "Progress\nmanager",
								"E_PLAN_VAR"	: $('#gridColMprPlan').val(),
								"E_ACTUAL_VAR"	: $('#gridColMprResult').val(),
								"B_PLAN_VAR"	: $('#gridColMprPlan').val(),
								"B_ACTUAL_VAR"	: $('#gridColMprResult').val(),
								"P_PLAN_VAR"	: $('#gridColMprPlan').val(),
								"P_ACTUAL_VAR"	: $('#gridColMprResult').val(),
								"CAL_PLAN_VAL"	: $('#gridColMprPlan').val(),
								"CAL_ACTUAL_VAR"	: $('#gridColMprResult').val(),
								"RESULT_YN"	: "Delivery",
								"REJECT_COMMENTS"	: "Return / Confirm",
								"MPR_NO"	: "MPR No.",
								"PROJECT_NO"	: "Project"
								}
							]
							};

	desmMprGrid = TreeGrid( {Layout:{Data : desmMprGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDesmMpr" );

	TGSetEvent("OnRenderFinish","desmMprGrid",function(grid){
		desmMprGridSearchReload(grid)
	});

	initMenuAuth(function (list) {
		menuAuthList = list;
		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	});

}

function initMonthDatePicker(id) {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

 	$(id).datepicker({
			dateFormat: 'yy/mm',
			changeMonth: true,
		    changeYear: true,
		    showButtonPanel: true,
		    onClose: function(dateText, inst) {
		        console.log("dateText", dateText);
		        console.log("inst", inst);
	            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	            $(this).datepicker('setDate', new Date(year, month, 1));
	            $(".ui-datepicker-calendar").css("display","none");
	        },
	        beforeShow() {
		        var selectDate = $(id).val().split("/");
		        var year = Number(selectDate[0]);
		        var month = Number(selectDate[1]) - 1;
		        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
	        }
	});

	$(id).focus(function () {
		$(".ui-datepicker-calendar").css("display","none");
		$("#ui-datepicker-div").position({
			  my: "center top",
			  at: "center bottom",
			  of: $(this)
		});
	});
}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val(), TYPE : "A"};

	$('#desmMprPopUp').load("/desmMprProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmMprProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtProjectCode").val(returnParam.SEGMENT1);
					$("#txtProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function iconPoSearchClick(){
	var search_type = "N";
	if(supplierYn == "Y") {
		search_type = "R";
	}

	var param = {keyword : $('#txtPoNo').val(), keyword2 : "", mpr_yn: "Y",
				 keyword3 : $('#txtSupplierNo').val(), supplier_yn : supplierYn, search_type : search_type};

	$('#desmMprPopUp').load("/desmPoListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmPoListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtPoNo").val(returnParam.PO_NO);
					$("#txtPoName").val(returnParam.PO_DESCRIPTION);
				}
			});
		}
	});
}

function btnMPRCreationClick() {

	var param = {SUPPLIER : $('#txtSupplier').val(), SUPPLIER_NO : $('#txtSupplierNo').val(),
				 supplier_yn : supplierYn, "menuAuthList" : menuAuthList};

	$('#desmMprPopUp').load("/desmMprCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprCreationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});
}


function btnSearchClick() {

	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	}

	if($('#txtPoNo').val().length < 2 || $('#txtPoName').val() == ""){
		$('#txtPoNo').val("");
		$('#txtPoName').val("");
		$("#txtPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	if($('#txtTeamName').val().length < 2 || $('#txtTeamCode').val() == ""){
		$('#txtTeamName').val("");
		$('#txtTeamCode').val("");
		$("#txtTeamName").parent().find(".autocomplete-valid").hide();
	}	

	var paramData = {PROJECT_NO : $('#txtProjectCode').val(), PO_NO : $('#txtPoNo').val(), SUPPLIER_NAME : $('#txtSupplier').val(), SUPPLIER_YN : supplierYn, SUPPLIER_NO : $('#txtSupplierNo').val(), TEAM : $('#txtTeamCode').val(),
	 				 START_MPR_DATE : $('#txtStartMPRDate').val(), END_MPR_DATE : $('#txtEndMPRDate').val(), STATUS : $('#selStatus').val(), MANAGER : $('#txtProgressManager').val(), D_MANAGER : $('#txtDoosanManager').val()
	 				 ,MPR_NO : $('#txtMprNo').val(), DELIVERY: $('#selDelivery').val()
	 				 };

	$.ajax({
		url: "/getDesmMprList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			desmMprGrid.Source.Data.Data.Body = [data.results];
			desmMprGrid.Reload();

        }
    });
}



function btnReseteClick() {
	if(supplierYn != "Y") {
		$('#txtSupplier').val("");
	}
	$('#txtProjectCode').val("");
	$('#txtProjectName').val("");
	$('#txtPoNo').val("");
	$('#txtPoName').val("");
	$('#txtStartMPRDate').val("");
	$('#txtEndMPRDate').val("");
	$('#selStatus').val("");
	$('#txtProgressManager').val("");
	$('#txtDoosanManager').val("");
	$('#txtTeamName').val("");
	$('#txtTeamCode').val("");
	$('#txtMprNo').val("");
	$('#selDelivery').val("");

	initExpediter();
}

function openModal(grid,row,col) {
	var param = {"MPR_SEQ" : row.MPR_SEQ, "menuAuthList" : menuAuthList};

	$('#desmMprPopUp').load("/desmMprCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprCreationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});
}

function btnMPRRejectClick() {
	var selectList = desmMprGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	if(selectList.length > 1) {
		alert_modal("", $('#alertMprReturnSelectCheck').val());
		return;
	}

	var selectRow = selectList[0];
	if(selectRow.STATUS != "Pre-Confirmed" && selectRow.STATUS != "Confirmed") {
		alert_modal("", $('#alertRejectErr').val());
		return;
	}

	var param = {"MPR_SEQ" : selectRow.MPR_SEQ, "MPR_NO" : selectRow.MPR_NO, PO_NO : selectRow.PO_NO};

	$('#desmMprPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "reject-item"){
					alert_success($('#alertSuccess').val());
					$('#btnSearch').click();
				}
			});

		}
	});

}

function btnMPRDeleteClick() {
	var selectList = desmMprGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++) {
		var selectRow = selectList[i];

		if(selectRow.STATUS != "Incomplete" && selectRow.STATUS != "Returned") {
			alert_modal("", $('#alertSaveMprDeleteCheckErr').val());
			return;
		}
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var updateList = [];
			for(var i = 0; i < selectList.length; i++) {
				var selectRow = selectList[i];

				var updateRow = objNullCheck({"MPR_SEQ" : selectRow.MPR_SEQ});
				updateList.push(updateRow);
			}
			var list = JSON.stringify(updateList);
			var paramData = {"updateList" : list};

			$.ajax({
				url: "/deleteDesmMprList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-1") {
							alert_fail($('#alertSaveMprDeleteCheckErr').val());
							//$('#btnSearch').click();
						}
						else {
							alert_fail(result.error);
						}

					} else {
						alert_success($('#alertDeleteSuccess').val());
						$('#btnSearch').click();
					}
				}
			});

		}
	});

}


function btnMPRApproveClick() {
	var selectList = desmMprGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++) {
		var selectRow = selectList[i];

		if(selectRow.STATUS != "Pre-Confirmed") {
			alert_modal("", $('#alertMprConfirmErr').val());
			return;
		}
	}



	var saveFn = function() {
		confirm_modal("", $('#alertMprConfirm').val(), null, function (callobj, result) {
			if(result) {

				var updateList = [];
				for(var i = 0; i < selectList.length; i++) {
					var selectRow = selectList[i];

					var updateRow = objNullCheck({"MPR_SEQ" : selectRow.MPR_SEQ, "STATUS" : "Confirmed", "REJECT_COMMENTS" : selectRow.REJECT_COMMENTS,
					                              "MPR_NO" : selectRow.MPR_NO, PO_NO : selectRow.PO_NO});
					updateList.push(updateRow);
				}
				
				var list = JSON.stringify(updateList);

				var paramData = {"updateList" : list};

				$.ajax({
					url: "/saveDesmMprStatus.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							if(result.error == "-1") {
								alert_fail($('#alertMprConfirmErr').val());
							}
							else if(result.error == "-4") {
								alert_fail($('#alertMailFail').val());
							}
							else {
								alert_fail(result.error);
							}

						} else {
							alert_success($('#alertSuccess').val());
							$('#btnSearch').click();
						}
					}
				});

			}
		});
	};

	var param = {'STATUS' : 'Confirmed'};
	
	$('#desmMprPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "return-item") {
					if(returnParam && returnParam.length > 0) {	

						for(var i = 0; i < selectList.length; i++) {
							var selectRow = selectList[i];
							var originComments = selectRow.REJECT_COMMENTS;

							var reviewerInfo =  ' (' +
												' Confirmed' +
												' ' + new Date().format('yyyy.MM.dd') +
												' ' + $('#logh', parent.document).text() +
												($('#roleName', parent.document).val() ? ' / ' + $('#roleName', parent.document).val() : '') +
												' )';
							var reviewerComments = returnParam + reviewerInfo;
							if(originComments && originComments.trim().length > 0) {
								reviewerComments += "\n-----------------------------------------------------------------------"
													+ "-----------------------------------------------------------------------\n"
													+ originComments;
							}
							selectRow.REJECT_COMMENTS = reviewerComments;
						}
					}
					saveFn();
				}
			});	
			
		}
	});
}

function openCommetsModal(grid,row,col) {
	var param = {"REJECT_COMMENTS" : row.REJECT_COMMENTS, TYPE : "VIEW"};

	$('#desmMprPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "reject-item"){

				}
			});

		}
	});
}

function desmMprGridSearchReload(grid) {
	var list = grid.Rows;

	for (var key in list) {

		var gridRow = list[key];

		if(gridRow.Fixed == null){

			if(gridRow.B_PLAN_INT > gridRow.B_ACTUAL_INT) {
				gridRow.B_PLAN_VARBackground = "#f59ea7";
				gridRow.B_ACTUAL_VARBackground = "#f59ea7";
			}

			if(gridRow.E_PLAN_INT > gridRow.E_ACTUAL_INT) {
				gridRow.E_PLAN_VARBackground = "#f59ea7";
				gridRow.E_ACTUAL_VARBackground = "#f59ea7";
			}

			if(gridRow.P_PLAN_INT > gridRow.P_ACTUAL_INT) {
				gridRow.P_PLAN_VARBackground = "#f59ea7";
				gridRow.P_ACTUAL_VARBackground = "#f59ea7";
			}

			if(gridRow.CAL_PLAN_INT > gridRow.CAL_ACTUAL_INT) {
				gridRow.CAL_PLAN_VALBackground = "#f59ea7";
				gridRow.CAL_ACTUAL_VARBackground = "#f59ea7";
			}

			grid.RefreshRow(gridRow);
		}

	}

	gridResize();
}
