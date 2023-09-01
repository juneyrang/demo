
var mainGrid;
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

	makeAutocomplete(
		"txtSearchProject", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtSearchProjectName",		//clear필드 id
		"/getTransProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtSearchProject").val(ui.item.value.split("|")[1]);
			$("#txtSearchProjectName").val(ui.item.value.split("|")[2]);
	
			return false;
		}
	); 	

	$('#iconSearch').click(function () { iconSearchClick(); return false; });
	$('#btnResete').click(function () { resetSearchControls(); return false; });
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnEdit').click(function () { btnEditClick(); return false; });		
	
	$("#txtSearchProject").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$("#txtSearchShippingReqNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtSearchInvoiceNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtSearchVendorName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	initDatePicker();
	initCode();
}

function initCode() {
	var codeList = [{"CODE" : "C202"}, {"CODE" : "C103"}, {"CODE" : "C101"}, {"CODE" : "C123"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;			
		
			var	result = setCombo(results.C202, "txtSearchStatus", "sel");
			result = setCombo(results.C103, "txtSearchDeliveryTerms", "sel");
		
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
			"id"				: "transShippingRequestMainGrid"
			, "CfgId"			: "transShippingRequestMainGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "8"
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
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
	   "Cols" : [
	   			 { "Name": "STATUS", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" }, 
			     { "Name": "SHIPPING_REQ_NO", "Width": "120", "Type": "Text", "CanEdit": "0" , "Class" : "gridLinkText gridCenterText" , "OnClickCell"	: "openEditModal(Grid,Row,Col);"}, 
			     { "Name": "PROJECT_ID", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "PROJECT_DESC", "Width": "300", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "INVOICE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "DESCRIPTION", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "DELIVERY_TERMS_V", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "ITEM", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "VENDOR_NAME", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "SHOP_OUT_DATE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "CBM", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
			     { "Name": "FINAL_REQUEST", "Width": "120", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "DANGER_FLAG", "Width": "120", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "ATTRIBUTE1", "Width": "120", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "VOYAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "REVISION_NUM", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "CREATED_BY", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "CREATION_DATE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "LAST_UPDATED_BY", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "LAST_UPDATE_DATE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"    }],
			   "Header" : {"STATUS": "요청상태", "Class" : "gridCenterText",  
						   "SHIPPING_REQ_NO": "요청번호",  
						   "PROJECT_ID": "PROJECT",
						   "PROJECT_DESC": "PROJECT DESC",
						   "INVOICE_NO": "INVOICE NO",
						   "DESCRIPTION": "DESCRIPTION",
						   "DELIVERY_TERMS_V": "Delivery Terms",
						   "ITEM": "ITEM",
						   "VENDOR_NAME": "Vendor 명/사내출하부서",
						   "SHOP_OUT_DATE": "출하예정일",
						   "CBM": "Shipping Volumn(CBM)",
						   "FINAL_REQUEST": "FINAL P/L",
						   "DANGER_FLAG": "위험물 P/L",
						   "ATTRIBUTE1": "전략물자 포함여부",
						   "VOYAGE_NO": "항차번호",
						   "REVISION_NUM": "Revision Num",
						   "CREATED_BY": "최초 작성자",
						   "CREATION_DATE": "최초 작성일",
						   "LAST_UPDATED_BY": "최종 수정자",
						   "LAST_UPDATE_DATE": "최종 수정일"} 	
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
	$('#txtSearchProject').val("");
	$('#txtSearchProjectName').val("");
	$('#txtSearchShippingReqNo').val("");
	$('#txtSearchInvoiceNo').val("");
	$('#txtSearchFromSoDate').val(prev1month);
	$('#txtSearchToSoDate').val(next1month);
	$('#txtSearchStatus').val("");
	$('#txtSearchVendorName').val("");
	$('#txtSearchDeliveryTerms').val("");
}

function iconSearchClick() {

	var param = {"PROJECT_CODE" : $('#txtSearchProject').val()};

	$('#divtransShippingRequestPopUp').load("/transProjectListPopup.do",null,function(data, status, xhr) {
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
	
    $("#txtSearchProject").val(param.PROJECT_CODE);
	$("#txtSearchProjectName").val(param.PROJECT_DESC);
	
	$('#dlgProjectList').modal('hide');	
}

function btnSearchClick() {
	if($('#txtSearchProject').val().length < 2 || $('#txtSearchProjectName').val() == ""){
		$('#txtSearchProject').val("");
		$('#txtSearchProjectName').val("");
	}
	
	$.ajax({
		url: "/getTransShippingRequest.do",		
		data: {"PROJECT_CODE" : $('#txtSearchProject').val(), "SHIPPING_REQ_NO" : $('#txtSearchShippingReqNo').val(),  
			   "INVOICE_NO" : $('#txtSearchInvoiceNo').val(), "FROM_SO_DATE" : $('#txtSearchFromSoDate').val(), "TO_SO_DATE" : $('#txtSearchToSoDate').val(),
			   "STATUS" : $('#txtSearchStatus').val(), "VENDOR_NAME" : $('#txtSearchVendorName').val(), "DELIVERY_TERMS": $('#txtSearchDeliveryTerms').val() 
			   },
		success: function (data, textStatus, jqXHR) {
			
			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.ReloadBody();
        }
    });	
}

function btnEditClick() {

	var param = {};
		param.modalTtile = "출하요청 [임시저장]";
		param.modalType = "create";
		param.menuAuthList = menuAuthList;
	
	$('#divtransShippingRequestPopUp').load("/transRequestEditPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){		
				
			initRequestEditPopUp(param, function (key, returnParam) {
				if(key == "save-item") {
					btnSearchClick(); 	
					$('#dlgEdit').modal('hide');									
				}
				else if(key == "complete-item") {
					btnSearchClick(); 
					$('#dlgEdit').modal('hide');					
				}							
				else if(key == "delete-item") {
					btnSearchClick(); 
					$('#dlgEdit').modal('hide');					
				}			
			});
			
			$('#dlgEdit').modal('show');
		}
	});
}

function openEditModal(G,row,col) {

	var param = Object.assign({}, row);
		param.modalTtile = "출하요청" + " [" + row.SHIPPING_REQ_NO + "] [" + row.STATUS + "]";
		param.modalType = "edit";
		param.menuAuthList = menuAuthList;
	
	$('#divtransShippingRequestPopUp').load("/transRequestEditPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initRequestEditPopUp(param, function (key, returnParam) {
				if(key == "save-item") {
					btnSearchClick();	
					$('#dlgEdit').modal('hide');				
				}
				else if(key == "delete-item") {
					btnSearchClick(); 
					$('#dlgEdit').modal('hide');					
				}	
				else if(key == "complete-item") {
					btnSearchClick(); 
					$('#dlgEdit').modal('hide');					
				}					
						
			});
			
			$('#dlgEdit').modal('show');
		}
	});
	
}











