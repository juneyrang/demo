var gridLang = {};
var fileLang = "en";
var menuAuthList;
var desmMprSetupGrid;
var supplierYn = "N";

function gridResize() {
	$("#gridDesmMprSetup").width($(".table-responsive").width());
	$("#gridDesmMprSetup").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	initSupplier();
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

			initControls();
        }
    });

}

function initControls() {
	initDatePicker();

	if(supplierYn == "Y") {
		$("#txtSupplier").attr("readonly",true);
		$("#txtSupplierNo").show();
		$("#txtSupplier").css('width', "50%");
	}
	
	var arrRoleSeq = $('#roleSeq', parent.document).val().split(',');
	$.each(arrRoleSeq, function(i, roleSeq) {
		if(roleSeq == '1' || roleSeq == '269' || roleSeq == '289') {
			$("#btnManualPoCreation").show();
			return false;
		}
	});

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

	makeAutocompletePo(
		"txtPoNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtSupplierNo",					//keyword3 파라메터 id
		supplierYn,					                        //supplier_yn
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
	
	/*makeAutocompletePo(
		"txtPoNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtSupplierNo",					//keyword3 파라메터 id
		supplierYn,					                        //supplier_yn
		"txtPoName",		//clear필드 id
		"/getDesmMprPo.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtPoNo").val(ui.item.value.split("|")[0]);
			$("#txtPoName").val(ui.item.value.split("|")[1]);
			return false;
		}
	);*/


	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#iconPoSearch').click(function () { iconPoSearchClick(); return false; });


	$('#btnMPRSetup').click(function () { btnMPRSetupClick(); return false; });
	$('#btnMPRSetupDelete').click(function () { btnMPRSetupDeleteClick(); return false; });
	$('#btnManualPoCreation').click(function () { btnManualPoCreationClick(); return false; });


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

	$("#txtExpediter").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});


	initTable();
}

function initTable(){


	var gridCode = getGridCode();

	var desmMprSetupGridCol = {"Cfg": {"id"				: "desmMprSetupGrid"
									, "CfgId"			: "desmMprSetupGridCfg"
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
								{	"Name"	: "RN", "Width": "80", "Type": "Int" , "Class" : "gridBorderText gridTextColor gridCenterText ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "STATUS", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MPR_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridCenterText gridLinkText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell"	: "openModal(Grid,Row,Col);" },
								{	"Name"	: "MANAGER", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PROJECT_NO", "Width": "145", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PROJECT_NAME", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PO_NO", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PRODUCT_NAME", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUPPLIER_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PO_DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REJECT_COMMENTS", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/pencil-alt.svg", "IconAlign" : "Right"	, "IconSize" : "2", "OnClickCell": "openCommetsModal( Grid, Row,Col )" },
								{	"Name"	: "CREATED_BY", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CREATION_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATED_BY", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATE_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "2",
								"Class" : "gridCenterText",
								"RN"	: "No.", "RNRowSpan" : "2",
								"STATUS"	: "Status", "STATUSRowSpan" : "2",
								"MPR_NO"	: "MPR No.", "MPR_NORowSpan" : "2",
								"MANAGER"	: "Expediter", "MANAGERRowSpan" : "2",
								"PROJECT_NO"	: "Project", "PROJECT_NORowSpan" : "2",
								"PROJECT_NAME"	: "Project Name", "PROJECT_NAMERowSpan" : "2",
								"PO_NO"	: "PO No.", "PO_NORowSpan" : "2",
								"PRODUCT_NAME"	: "Product Name", "PRODUCT_NAMERowSpan" : "2",
								"SUPPLIER_NAME"	: "Supplier", "SUPPLIER_NAMERowSpan" : "2",
								"PO_DESCRIPTION"	: "PO Description", "PO_DESCRIPTIONRowSpan" : "2",
								"REJECT_COMMENTS"	: "Return / Confirm", "REJECT_COMMENTSRowSpan" : "2",
								"CREATED_BY"	: "Creation By", "CREATED_BYRowSpan" : "2",
								"CREATION_DATE"	: "Creation Date", "CREATION_DATERowSpan" : "2",
								"LAST_UPDATED_BY"	: "Updated By", "LAST_UPDATED_BYRowSpan" : "2",
								"LAST_UPDATE_DATE"	: "Updated Date", "LAST_UPDATE_DATERowSpan" : "2"
								},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"RN"	: "No.",
								"STATUS"	: "Status",
								"MPR_NO"	: "MPR No.",
								"MANAGER"	: "Expediter", "MANAGERRowSpan" : "2",
								"PROJECT_NO"	: "Project",
								"PROJECT_NAME"	: "Project Name",
								"PO_NO"	: "PO No.",
								"PRODUCT_NAME"	: "Product Name",
								"SUPPLIER_NAME"	: "Supplier",
								"PO_DESCRIPTION"	: "PO Description",
								"REJECT_COMMENTS"	: "Return / Confirm",
								"CREATED_BY"	: "Creation By",
								"CREATION_DATE"	: "Creation Date",
								"LAST_UPDATED_BY"	: "Updated By",
								"LAST_UPDATE_DATE"	: "Updated Date"
								}
							]
							};

	desmMprSetupGrid = TreeGrid( {Layout:{Data : desmMprSetupGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDesmMprSetup" );

	TGSetEvent("OnRenderFinish","desmMprSetupGrid",function(grid){
		gridResize();
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

function initDatePicker() {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val(), TYPE : "A"};

	$('#desmMprSetupPopUp').load("/desmMprProjectListPopUp.do",null,function(data, status, xhr) {
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

	var param = {keyword : $('#txtPoNo').val(), keyword2 : "",
				 keyword3 : $('#txtSupplierNo').val(), supplier_yn : supplierYn, search_type : search_type};

	$('#desmMprSetupPopUp').load("/desmPoListPopUp.do",null,function(data, status, xhr) {
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



function btnMPRSetupClick() {



	var param = {"SUPPLIER" : $('#txtSupplier').val(), "SUPPLIER_NO" : $('#txtSupplierNo').val(), supplier_yn : supplierYn, "menuAuthList" : menuAuthList};

	$('#desmMprSetupPopUp').load("/desmMprSetupPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprSetupPopUp(param, function (key, returnParam) {
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

	var paramData = {PROJECT_NO : $('#txtProjectCode').val(), PO_NO : $('#txtPoNo').val(), SUPPLIER : $('#txtSupplier').val(), SUPPLIER_YN : supplierYn, MANAGER : $('#txtExpediter').val(),
	                 START_UPDATE_DATE : $('#txtStartUpdateDate').val(), END_UPDATE_DATE : $('#txtEndUpdateDate').val(), SUPPLIER_NO : $('#txtSupplierNo').val()};

	$.ajax({
		url: "/getDesmMprSetupList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			desmMprSetupGrid.Source.Data.Data.Body = [data.results];
			desmMprSetupGrid.ReloadBody();

        }
    });
}

function openModal(grid,row,col) {
	var param = {PROJECT_NO : row.PROJECT_NO, PROJECT_NAME : row.PROJECT_NAME, "SUPPLIER" : row.SUPPLIER_NAME,"SUPPLIER_NO" : row.SUPPLIER_NUMBER, MPR_NO : row.MPR_NO, STATUS : row.STATUS,
			     PO_NO : row.PO_NO, PO_DESCRIPTION : row.PO_DESCRIPTION, PRODUCT_NAME : row.PRODUCT_NAME, MPR_SUBMISSION : row.MPR_SUBMISSION, REJECT_COMMENTS : row.REJECT_COMMENTS
			     , supplier_yn : supplierYn, "menuAuthList" : menuAuthList};

	$('#desmMprSetupPopUp').load("/desmMprSetupPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprSetupPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});

		}
	});
}

function btnReseteClick() {
	if(supplierYn != "Y") {
		$('#txtSupplier').val("");
		$('#txtSupplierNo').val("");
	}
	$('#txtProjectCode').val("");
	$('#txtProjectName').val("");
	$('#txtPoNo').val("");
	$('#txtPoName').val("");
	$('#txtStartUpdateDate').val("");
	$('#txtEndUpdateDate').val("");
	$('#txtExpediter').val("");

}

function btnMPRSetupDeleteClick() {
	var selectList = desmMprSetupGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];
			for(var i = 0; i < selectList.length; i++) {
				var selectRow = selectList[i];
				var deleteRow = {"PO_NO" : selectRow.PO_NO, "MPR_NO" : selectRow.MPR_NO};
				deleteList.push(deleteRow);
			}

			var list = JSON.stringify(deleteList);

			var paramData = {"deleteList" : list};

			$.ajax({
				url: "/deleteDesmMprSetupList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-1") {
							alert_fail($('#alertSaveMprSetupDeleteCheckErr').val() + " [PO No. : " + result.PO_NO + "]");
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


function btnManualPoCreationClick() {

	var param = {"SUPPLIER" : $('#txtSupplier').val(), "SUPPLIER_NO" : $('#txtSupplierNo').val()
			, supplier_yn : supplierYn, "menuAuthList" : menuAuthList};

	$('#desmMprSetupPopUp').load("/desmManualPoCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmManualPoCreationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
				}
			});

		}
	});
}


function openCommetsModal(grid,row,col) {
	var param = {"REJECT_COMMENTS" : row.REJECT_COMMENTS, TYPE : "VIEW"};

	$('#desmMprSetupPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "reject-item"){

				}
			});

		}
	});
}
