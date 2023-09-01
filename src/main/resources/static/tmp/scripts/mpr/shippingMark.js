var gridLang = {};
var fileLang = "en";
var desmShippingMarkGrid;
var toDay = "";
var toMonth = "";
var supplierYn = "N";
var menuAuthList;

function gridResize() {
	$("#gridDesmShippingMark").width($(".table-responsive").width());
	$("#gridDesmShippingMark").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
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
			
			initControls();
        }
    });
	
}

function initControls() {

	initDatePicker();
	
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
	
	
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#iconPoSearch').click(function () { iconPoSearchClick(); return false; });
	$('#btnCreation').click(function () { btnCreationClick(); return false; });
	$('#btnDelete').click(function () { btnDeleteClick(); return false; });
	$('#btnReport').click(function () { btnReportClick(); return false; });
	
		
	
	
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
				
			
	initTable();
}

function initTable(){
	
	var gridCode = getGridCode();
	
	var desmShippingMarkGridCol = {"Cfg": {"id"				: "desmShippingMarkGrid"
									, "CfgId"			: "desmShippingMarkGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "0"
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
								{	"Name"	: "PROJECT_NO", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PROJECT_NAME", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATE_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PO_NO", "Width": "150", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell"	: "openModal(Grid,Row,Col);" },
								{	"Name"	: "PO_DESCRIPTION", "Width": "500", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "SUPPLIER_NAME", "Width": "400", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "2",
								"Class" : "gridCenterText",
								"PROJECT_NO"	: "Project", "PROJECT_NORowSpan" : "2",
								"PROJECT_NAME"	: "Project​ Name​", "PROJECT_NAMERowSpan" : "2",
								"LAST_UPDATE_DATE"	: "Date​​​", "LAST_UPDATE_DATERowSpan" : "2",
								"PO_NO"	: "PO No.​​​​", "PO_NORowSpan" : "2",
								"PO_DESCRIPTION"	: "PO Description​​​​", "PO_DESCRIPTIONRowSpan" : "2",
								"SUPPLIER_NAME"	: "Supplier", "SUPPLIER_NAMERowSpan" : "2"
								},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"PROJECT_NO"	: "Project",
								"PROJECT_NAME"	: "Project​ Name​",
								"LAST_UPDATE_DATE"	: "Date​​​",
								"PO_NO"	: "PO No.​​​​",
								"PO_DESCRIPTION"	: "PO Description​​​​",
								"SUPPLIER_NAME"	: "Supplier"
								}
							]
							};
							
	desmShippingMarkGrid = TreeGrid( {Layout:{Data : desmShippingMarkGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDesmShippingMark" );
	
	TGSetEvent("OnRenderFinish","desmShippingMarkGrid",function(grid){
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

	$('#desmShippingMarkPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {
				
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

	$('#desmShippingMarkPopUp').load("/desmPoListPopUp.do",null,function(data, status, xhr) {
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

function btnCreationClick() {
    
	var param = {SUPPLIER : $('#txtSupplier').val(), SUPPLIER_NO : $('#txtSupplierNo').val(),
				 supplier_yn : supplierYn, "menuAuthList" : menuAuthList};    
					 
	$('#desmShippingMarkPopUp').load("/desmShippingMarkCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmShippingMarkCreationPopUp(param, function (key, returnParam) {
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
	
	var paramData = {PROJECT_NO : $('#txtProjectCode').val(), PO_NO : $('#txtPoNo').val(), SUPPLIER_NAME : $('#txtSupplier').val(), SUPPLIER_YN : supplierYn, SUPPLIER_NO : $('#txtSupplierNo').val(),
	 				 START_DATE : $('#txtStartDate').val(), END_DATE : $('#txtEndDate').val()};	

	$.ajax({
		url: "/getDesmShippingMarkList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			desmShippingMarkGrid.Source.Data.Data.Body = [data.results];
			desmShippingMarkGrid.ReloadBody();
			
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
	$('#txtStartDate').val("");
	$('#txtEndDate').val("");
		            
}

function openModal(grid,row,col) {
	var param = objNullCheck({"HEADER_SEQ" : row.HEADER_SEQ, SUPPLIER : row.SUPPLIER_NAME, SUPPLIER_NO : row.SUPPLIER_NUMBER,
							  PROJECT_NO : row.PROJECT_NO, PROJECT_NAME : row.PROJECT_NAME,
							  PO_NO : row.PO_NO, PO_DESCRIPTION : row.PO_DESCRIPTION,
				              supplier_yn : supplierYn, "menuAuthList" : menuAuthList});
					 
	$('#desmShippingMarkPopUp').load("/desmShippingMarkCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmShippingMarkCreationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});	
			
		}
	});		
}

function btnDeleteClick() {
	var selectList = desmShippingMarkGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var updateList = [];
			for(var i = 0; i < selectList.length; i++) {
				var selectRow = selectList[i];
				
				var updateRow = objNullCheck({"HEADER_SEQ" : selectRow.HEADER_SEQ});
				updateList.push(updateRow);
			}			
			var list = JSON.stringify(updateList);
			var paramData = {"updateList" : list};		
							 
			$.ajax({			
				url: "/deleteDesmShippingMarkList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
						
					} else {
						alert_success($('#alertDeleteSuccess').val());				
						$('#btnSearch').click();
					}
				}		
			});								 					
						
		}
	});
	
}

function btnReportClick() {
	desmShippingMarkGrid.ActionAcceptEdit();
	var selectList = desmShippingMarkGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"HEADER_SEQ" : gridRow.HEADER_SEQ};

		selListParam.push(row);
	}

	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/saveDesmShippingMarkReportList.do",
		data: paramData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				var popup = window.open('/shippingMarkMrd.do?fileNm=RD_TEST_SHIPPING_MARK', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
			}
		}
	});
}

