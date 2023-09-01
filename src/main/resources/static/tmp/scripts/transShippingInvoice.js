
var mainGrid;
var gridLangUrl;

var gridDutyRefundOptionCodeList;

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
	
	$('#iconSearch').click(function () { iconSearchClick(); return false; });
	$('#btnResete').click(function () { resetSearchControls(); return false; });
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnRequest').click(function () { btnRequestClick(); return false; });
	
	
	
	$("#txtSearchProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtSearchVoyageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtSearchInvoiceNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	

	TGSetEvent("OnRenderFinish","transShippingInvoiceMainGrid",function(grid){
		initDefailProject(function (list) {
			
			if(list.length > 0) {
				$('#txtSearchProjectCode').val(list[0]["SEGMENT1"]);
				$('#txtSearchProjectName').val(list[0]["NAME"]);

				$('#btnSearch').trigger('click');
			}
		});	
		
	});


	initDatePicker();
	initCode();

}

function initCode() {
	var codeList = [{"CODE" : "C009"},{"CODE" : "C101"},{"CODE" : "C103"},{"CODE" : "C123"},{"CODE" : "C104"},{"CODE" : "C105"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;			
			
			gridDutyRefundOptionCodeList = setGridCombo(results.C101, "na");
			var	result = setCombo(results.C009, "txtSearchIncludeVoyage", "");			
		
		 	toDay = results.DAY[0].CUR_DAY;
			prev1month = results.DAY[0].PREV_1_MON_DAY;
			next1month = results.DAY[0].NEXT_1_MON_DAY;		 	
		 	
			resetSearchControls();	

			initTable();
        }
    });	
}

function initTable() {
	gridLangUrl = "/resources/gridJs/Languages/TextKR.js";
	var gridCode = getGridCode();
	var mainGridCol = {
		"Cfg": {
			"id"				: "transShippingInvoiceMainGrid"
			, "CfgId"			: "transShippingInvoiceMainGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
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
			, "SelectingSingle" : "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "SafeCSS"			: "1"
			, "Sorting"			: "1"
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
	   "Cols" : [
	   		     { "Name": "PROJECT_ID", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
	   		     { "Name": "VOYAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "INVOICE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText", "OnClickCell"	: "openDetailModal(Grid,Row,Col);"   },
	   		     { "Name": "SUPPLIERS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "CONTACT_POINTS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "PKG", "Width": "150", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "NET_WEIGHT", "Width": "150", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor "   },
	   		     { "Name": "GROSS_WEIGHT", "Width": "150", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor "   },
	   		     { "Name": "SHIPPING_VOLUME", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor "   },
	   		     { "Name": "SHOP_OUT_DATES", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "DELIVERY_TERMS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "DESCRIPTION", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "DUTY_REFUND_OPTION", "Width": "150", "Type": "Enum", "Enum" : gridDutyRefundOptionCodeList.label, "EnumKeys" : gridDutyRefundOptionCodeList.code,  "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "FINAL_FLAG", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "DANGER_FLAG", "Width": "120", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "ATTRIBUTE1", "Width": "180", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "STR_FLAG", "Width": "180", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   }],
			   "Header" : {"PROJECT_ID" : "PROJECT", "Class" : "gridCenterText",
			   			   "VOYAGE_NO" : "항차번호",
			   			   "INVOICE_NO" : "INVOICE NO",
			   			   "SUPPLIERS" : "Supplier",
			   			   "CONTACT_POINTS" : "Contact Point",
			   			   "PKG" : "PACKAGE 수량",
			   			   "NET_WEIGHT" : "Net Weight(kg)",
			   			   "GROSS_WEIGHT" : "Gross Weight(kg)",
			   			   "SHIPPING_VOLUME" : "CBM",
			   			   "SHOP_OUT_DATES" : "Cargo Ready",
			   			   "DELIVERY_TERMS" : "구매인도조건",
			   			   "DESCRIPTION" : "DESCRIPTION",
			   			   "DUTY_REFUND_OPTION" : "관세환급여부",
			   			   "FINAL_FLAG" : "Final Flag",
			   			   "DANGER_FLAG" : "위험물 P/L",
			   			   "ATTRIBUTE1" : "전략물자 포함여부",
			   			   "STR_FLAG" : "전략물자 승인여부"} 	
	};			

	mainGrid =	TreeGrid( {Layout:{Data:mainGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridMain" );
	
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

function resetSearchControls(){
	
	$('#txtSearchProjectCode').val("");
	$('#txtSearchProjectName').val("");
	$('#txtSearchVoyageNo').val("");
	$('#txtSearchInvoiceNo').val("");
	$('#txtSearchIncludeVoyage').val("N");			 	
}

function iconSearchClick() {

	var param = {"PROJECT_CODE" : $('#txtSearchProjectCode').val()};

	$('#divtransShippingInvoicePopUp').load("/transProjectListPopup.do",null,function(data, status, xhr) {
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

function btnSearchClick() {

	if($('#txtSearchProjectCode').val().length < 2 || $('#txtSearchProjectName').val() == ""){
		$('#txtSearchProjectCode').val("");
		$('#txtSearchProjectName').val("");
	}
	
	$.ajax({
		url: "/getTransShippingInvoice.do",		
		data: {"PROJECT_CODE" : $('#txtSearchProjectCode').val(), "VOYAGE_NO" : $('#txtSearchVoyageNo').val(),  
			   "INVOICE_NO" : $('#txtSearchInvoiceNo').val(), "INCLUDE_VOYAGE" : $('#txtSearchIncludeVoyage').val()},
		success: function (data, textStatus, jqXHR) {
			
			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.ReloadBody();
        }
    });	
}


function openDetailModal(G,row,col) {	
	
	var param = Object.assign({}, row);
		param.menuAuthList = menuAuthList;
	
	$('#divtransShippingInvoicePopUp').load("/transInvoiceDetailPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){		
				
			initInvoiceDetailPopUp(param, function (key, returnParam) {
				if(key == "save-item") {
					btnSearchClick();	
				}
				else if(key == "delete-item") {
					btnSearchClick();
				}
				else if(key == "complete-item") {
					btnSearchClick();
				}				
				
			});
			$('#dlgInvoiceDetail').modal('show');
			
		}
	});
}

function btnRequestClick() {
	var selectList = mainGrid.GetSelRows();
	var curBgName = $('#txtBgName').val();
	var role_cd = $('#txtRoleCd').val();
	
	if(selectList.length == 0){
		//alert($('#alertGridSelectDataNull').val());
		alert_modal("알람", $('#alertGridSelectDataNull').val());
		return;
	}	
	
	if((curBgName != null && curBgName != "" && curBgName === 'Plant EPC BG') || role_cd === "A100") {
		searchMainProject(selectList);
	}
	else {
		var comparePjt = selectList[0].PROJECT_ID;
		if(selectList.length >= 2) {
			for (var i = 0; i < selectList.length; i++){
    			if(comparePjt != selectList[i].PROJECT_ID) {
    				//alert($('#alertCompareProject').val());
    				alert_modal("알람", $('#alertCompareProject').val());
            		return;
    			}			
			}
		}
		searchProject(selectList);
		
	}
}

function searchMainProject(selectList) {
	
	var checkList = [];
	for (var i = 0; i < selectList.length; i++){
		var gridRow = selectList[i];  
		var row = {"PROJECT_ID" : gridRow.PROJECT_ID, "INVOICE_NO_ID" : gridRow.INVOICE_NO_ID};
		checkList.push(row);
	}
	var list = JSON.stringify(checkList);
	
	$.ajax({
		url: "/getTransShippingInvoiceMainProject.do",		
		data: {"list" : list},
		success: function (data, textStatus, jqXHR) {
			
			completeSearchMainProject(selectList, data);
			
        }
    });
}

function completeSearchMainProject(selectList, data) {                
                
	var isPjtEqual = false;
	var mainProject = data.results.MAIN_PROJECT_ID;
	var subProjectList = data.results.subProjectList;
	var chkInvoice = data.results.chkInvoice; 
	
	var compareValue = selectList[0].PROJECT_ID;
	
	var voyageParam = {};
	
	 
	for(var i = 0; i < selectList.length; i++) {
		isPjtEqual = false;
		if(subProjectList.length != 0){
			for(var k = 0; k < subProjectList.length; k++){
	    		if(selectList[i].PROJECT_ID == mainProject){
	    			isPjtEqual = true;
	    		}
	    		else if(selectList[i].PROJECT_ID == subProjectList[k].SUB_PROJECT){
	    			isPjtEqual = true;
	    		}
	    	}
	    	if(!isPjtEqual){
	    		break;
	    	}
		}else{
			if(compareValue == selectList[i].PROJECT_ID){
				isPjtEqual = true;
			}else{
				break;
			}
		}
	}
	
	if(!isPjtEqual) {
		//alert($('#alertCompareProject').val());
		alert_modal("알람", $('#alertCompareProject').val());
		return;
	}
	else if(chkInvoice != "") {
		//alert("해당 Invoice는 전략물자 승인전입니다.\n승인완료 후 다시 운송요청해주세요.");
		alert_modal("알람", "해당 Invoice는 전략물자 승인전입니다.<br/>승인완료 후 다시 운송요청해주세요.");
		return;		
	}
	else {

		if(data.results.FINAL_DESTINATION_ADDR == null || data.results.FINAL_DESTINATION_ADDR == "") {
			voyageParam.FINAL_DESTINATION_ADDR = "Final Destination Addr";
		}	
		else {
			voyageParam.FINAL_DESTINATION_ADDR = data.results.FINAL_DESTINATION_ADDR;
		}
			
		voyageParam.MAIN_PROJECT = mainProject;   
			
		confirm_modal("알람", "선택하신 INVOICE No는 항차생성시 다음 프로젝트로 관리됩니다."
				    		+ "<br/>관리 프로젝트 : " + mainProject
							+ "<br/>계속하시겠습니까?", null, function (callobj, result) {
			if(result) {
				openTransRequestModal(voyageParam);
			}
		});			
			
		/*if (confirm("선택하신 INVOICE No는 항차생성시 다음 프로젝트로 관리됩니다."
		    		+ "\n관리 프로젝트 : " + mainProject
					+ "\n계속하시겠습니까?")) {
		}*/

	}
}

function openTransRequestModal(voyageParam) {

	var selectList = mainGrid.GetSelRows();
	var checkList = [];
	for(var i = 0; i < selectList.length; i++){
	
		var gridRow = selectList[i];
		if(gridRow.Fixed == null){
			var row = {"INVOICE_NO_ID" : gridRow.INVOICE_NO_ID};
			checkList.push(row);
		}		
	}
	var list = JSON.stringify(checkList);

	var param = Object.assign({}, voyageParam);
		param.modalTtile = "운송요청";
		param.modalType = "create";
		param.list = list;    		     

	$('#divtransShippingInvoicePopUp').load("/transRequestPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
				
			initPopUp(param, function (key, param) {
				if(key == "save-item") {
					btnSearchClick();
					$('#dlgTransRequest').modal('hide');
				}			
				else if(key == "delete-item") {
					btnSearchClick();
					$('#dlgTransRequest').modal('hide');
				}	
				else if(key == "cancel-item") {
					btnSearchClick();
					$('#dlgTransRequest').modal('hide');
				}	
				else if(key == "complete-item") {
					btnSearchClick();
					$('#dlgTransRequest').modal('hide');
				}					
									
			});
			$('#dlgTransRequest').modal('show');
			
		}
	});
}

function searchProject(selectList) {

	var checkList = [];
	for (var i = 0; i < selectList.length; i++){
		var gridRow = selectList[i];  
		var row = {"PROJECT_ID" : gridRow.PROJECT_ID, "INVOICE_NO_ID" : gridRow.INVOICE_NO_ID};
		checkList.push(row);
	}
	var list = JSON.stringify(checkList);

	$.ajax({
		url: "/getTransShippingInvoiceProjectInfo.do",		
		data: {"PROJECT_ID" : selectList[0].PROJECT_ID, "list" : list},
		success: function (data, textStatus, jqXHR) {
			
			completeSearchProjectInfo(selectList, data);
			
        }
    });
}

function completeSearchProjectInfo(selectList, data) {
    
    var result = data.results.resultList[0];
    var project = result.PROJECT_ID;
	var voyageParam = {};
	
	var chkInvoice = data.results.chkInvoice;
	if(chkInvoice != "") {
		//alert("해당 Invoice는 전략물자 승인전입니다.\n승인완료 후 다시 운송요청해주세요.");
		alert_modal("알람", "해당 Invoice는 전략물자 승인전입니다.<br/>승인완료 후 다시 운송요청해주세요.");
		return;		
	}	
	
	confirm_modal("알람", "선택하신 INVOICE No는 항차생성시 다음 프로젝트로 관리됩니다."
			    		+ "<br/>관리 프로젝트 : " + project
						+ "<br/>계속하시겠습니까?", null, function (callobj, result) {
		if(result) {
			voyageParam.FINAL_DESTINATION_ADDR = result.FINAL_DESTINATION_ADDR;	
			voyageParam.MAIN_PROJECT = project;  		
					
			openTransRequestModal(voyageParam);			
		}
	});	
	
	/*if (confirm("선택하신 INVOICE No는 항차생성시 다음 프로젝트로 관리됩니다."
	    		+ "\n관리 프로젝트 : " + project
				+ "\n계속하시겠습니까?")) {	
	}*/
}	

