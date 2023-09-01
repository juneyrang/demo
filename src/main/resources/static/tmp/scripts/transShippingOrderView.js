
var mainGrid;


var gridTransportUTypeCodeList;
var gridTransportBTypeCodeList;

var gridLangUrl;


var toDay;
var prev1month;
var next1month;
var menuAuthList;



$(window).resize(function() {
	$("#gridMain").width($("body").width() - 31);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
});

$(document).ready(function () {
	$("#gridMain").width($("body").width() - 31);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);

	initControls();

});

function initControls() {

	TGSetEvent("OnRenderFinish","transShippingOrderViewMainGrid",function(gird){
			mainGridReload(gird);
	});

	makeAutocomplete(
		"txtSearchProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtSearchProjectName",		//clear필드 id
		"/getTransProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtSearchProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtSearchProjectName").val(ui.item.value.split("|")[2]);
	
			return false;
		}
	);


	
				
	
	

	$('#iconSearchProjectCode').click(function () { iconSearchProjectCodeClick(); return false;});
	$('#btnSearch').click(function () { btnSearchClick(); return false;});
	$('#btnResete').click(function () { btnReseteClick(); return false;});
	$('#btnPackageInfo').click(function () { btnPackageInfoClick(); return false;});
	
	
	
	$("#txtSearchProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	


	initDatePicker();
	initCode();
}

function initCode() {
	var codeList = [{"CODE" : "C203"}, {"CODE" : "C104"}, {"CODE" : "C105"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;			
			
			gridTransportUTypeCodeList = setGridCombo(results.C104, "na");
			gridTransportBTypeCodeList = setGridCombo(results.C105, "na");			
			var	result = setCombo(results.C203, "selSearchStatus", "all");
				result = setCombo(results.C104, "selSearchTransportUType", "all");
				result = setCombo(results.C105, "selSearchTransportBType", "all");
				
			
		
		 	toDay = results.DAY[0].CUR_DAY;
			prev1month = results.DAY[0].PREV_1_MON_DAY;
			next1month = results.DAY[0].NEXT_1_MON_DAY;		 	
		 	
			btnReseteClick();	
			initTable();
        }
    });	
}

function initTable() {
	gridLangUrl = "/resources/gridJs/Languages/TextKR.js";
	var gridCode = getGridCode();
	var mainGridCol = {
		"Cfg": {
			"id"				: "transShippingOrderViewMainGrid"
			, "CfgId"			: "transShippingOrderViewMainGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "2"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "730"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle" : "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "SafeCSS"			: "1"
			, "Sorting"			: "1"
			, "MainCol"			: "OPER_ORG_CD"
			, "Collapsed"		: "1"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Toolbar" : {
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{ "Name": "OPER_ORG_CD", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText", "OnClickCell": "openTransRequestModal(Grid, Row, Col)"   },
	   			 { "Name": "STATUS", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "PROJECT_ID", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "PROJECT_DESC", "Width": "290", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "TRANSPORT_TYPE", "Width": "120", "Type": "Enum", "Enum" : gridTransportUTypeCodeList.label, "EnumKeys" : gridTransportUTypeCodeList.code, "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "TRANSPORT_METHOD", "Width": "140", "Type": "Enum", "Enum" : gridTransportBTypeCodeList.label, "EnumKeys" : gridTransportBTypeCodeList.code, "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "LOADING_PORT", "Width": "140", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "DESTINATION_PORT", "Width": "140", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "CARGO_READY_DATE", "Width": "160", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
	   		     { "Name": "PACKAGE_COUNT", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "TOTAL_GROSS_WEIGHT", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "TOTAL_SHIPPING_VOLUME", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "TOTAL_REVENUE_TON", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "TRANSPORT_TERMS", "Width": "190", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   }],
	   "Header" : {"OPER_ORG_CD" : "항차번호", "Class" : "gridCenterText",
	   			   "STATUS" : "항차상태",
	   			   "PROJECT_ID" : "PROJECT",
	   			   "PROJECT_DESC" : "PROJECT NAME",
	   			   "TRANSPORT_TYPE" : "운송 TYPE",
	   			   "TRANSPORT_METHOD" : "운송방법",
	   			   "LOADING_PORT" : "선적항",
	   			   "DESTINATION_PORT" : "도착항",
	   			   "CARGO_READY_DATE" : "CargoReady Date",
	   			   "PACKAGE_COUNT" : "PACKAGE 수량",
	   			   "TOTAL_GROSS_WEIGHT" : "총 중량(KG)",
	   			   "TOTAL_SHIPPING_VOLUME" : "총 CBM(M3)",
	   			   "TOTAL_REVENUE_TON" : "RT",
	   			   "TRANSPORT_TERMS" : "운송조건"} 	
	};
	
				

	mainGrid =	TreeGrid( {Layout:{Data : mainGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridMain" );
	
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

function initDatePicker( ) {
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd"
	});
}





function iconSearchProjectCodeClick() {

	var param = {"PROJECT_CODE" : $('#txtSearchProjectCode').val()};

	$('#divPopUp').load("/transProjectListPopup.do",null,function(data, status, xhr) {
		if(status == "success"){
		
			initPopUp(param, function (key, param) {
				if(key == "select-item"){
					searchProjectCodeGetParam(param);
				}
			});			
			
			$('#dlgProjectList').modal('show');
		}
	});	
}

function searchProjectCodeGetParam(param) {
	
    $("#txtSearchProjectCode").val(param.PROJECT_CODE);
	$("#txtSearchProjectName").val(param.PROJECT_DESC);
	
	$('#dlgProjectList').modal('hide');	
}

function btnReseteClick() {
	$("#txtSearchProjectCode").val("");
	$("#txtSearchProjectName").val("");
	$("#txtSearchVoyageNo").val("");
	$("#txtSearchFromSoDate").val("");
	$("#txtSearchToSoDate").val("");
	$("#selSearchStatus").val("");
	$("#selSearchTransportUType").val("");
	$("#selSearchTransportBType").val("");	
}

function btnSearchClick() {
	if($('#txtSearchProjectCode').val().length < 2 || $('#txtSearchProjectName').val() == ""){
		$('#txtSearchProjectCode').val("");
		$('#txtSearchProjectName').val("");
	}
	
	$.ajax({
		url: "/getTransShippingOrderView.do",		
		data: {"PROJECT_CODE" : $('#txtSearchProjectCode').val(), "VOYAGE_NO" : $('#txtSearchVoyageNo').val(),  
			   "FROM_SO_DATE" : $('#txtSearchFromSoDate').val(), "TO_SO_DATE" : $('#txtSearchToSoDate').val(),
			   "STATUS" : $('#selSearchStatus').val(), "TRANSPORT_U_TYPE" : $('#selSearchTransportUType').val(), "TRANSPORT_B_TYPE" : $('#selSearchTransportBType').val()},
		success: function (data, textStatus, jqXHR) {
			
			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.Reload();
			
        }
    });			
}

function mainGridReload(gird) {
	mainGrid.CollapseAll();
	
	for (var key in mainGrid.Rows) {
		
		var gridRow = mainGrid.Rows[key];
		
		if(gridRow.Fixed == null){
			if(gridRow.UP_OPER_ORG_CD !== "ROOT"){
				gridRow.CanSelect = "0";
			}
		   		  	
		  	mainGrid.RefreshRow(gridRow);			
		}
	}	
	
}


function openTransRequestModal(grid, row, col) {
	
	if(row.VOYAGE_NO == null) {
		return;
	}
	
	var param = Object.assign({}, row);
		param.modalTtile = "항차 상세 [" + row.OPER_ORG_CD + "] [" + row.STATUS + "]";
		param.modalType = "view";  	
		param.menuAuthList = menuAuthList;	     

	$('#divPopUp').load("/transRequestPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
				
			initPopUp(param, function (key, param) {
				if(key == "save-item") {
					btnSearchClick();
				}			
				else if(key == "delete-item") {
					btnSearchClick();
				}	
				else if(key == "cancel-item") {
					btnSearchClick();
					$('#dlgTransRequest').modal('hide');
				}
				else if(key == "complete-item") {
					btnSearchClick();
				}											
			});
			$('#dlgTransRequest').modal('show');
			
		}
	});
}

function btnPackageInfoClick() {
	
	var selectList = mainGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert($('#alertGridSelectDataNull').val());
		alert_modal("알람", $('#alertGridSelectDataNull').val());
		return;
	}	
	
	var selRow = selectList[0];
	var param = Object.assign({}, selRow);  

	$('#divPopUp').load("/transPackagePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
				
			initTransPackagePopUp(param, function (key, param) {
				/*if(key == "save-item") {
					btnSearchClick();
				}			
				else if(key == "delete-item") {
					btnSearchClick();
				}	
				else if(key == "cancel-item") {
					btnSearchClick();
					$('#dlgTransRequest').modal('hide');
				}*/						
			});
			$('#dlgTransPackage').modal('show');
			
		}
	});
}






