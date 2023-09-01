var dlgTransRequestMailGrid;
var dlgTransRequestInvoiceGrid;

var v_callback = null;
var v_param;



function initPopUpCode() {	
	
	var codeList = [{"CODE" : "C103"},{"CODE" : "C104"},{"CODE" : "C105"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;			
			
			
			var result = setCombo(results.C104, "selDlgTransRequestTransportType", "sel");
				result = setCombo(results.C103, "selDlgTransRequestTransportTerms", "sel");
				result = setCombo(results.C105, "selDlgTransRequestTransportMethod", "sel");
		 	
			initPopUpControls();
        }
    });		
}


function initPopUpControls() {	
	var gridCnt = 0;
	var gridCntTotal = 2;
	var gridCreate = true;
	
	$('#dlgTransRequest').on('shown.bs.modal', function () {
		$('#dlgTransRequest').click();
	});
	
	$('#dlgTransRequest').on('hidden.bs.modal', function () {
	  	closePopUp();
	})		
	
	TGSetEvent("OnRenderFinish","transShippingInvoicedlgTransRequestInvoiceGrid",function(gird){
			gridCnt += 1;
		    if(gridCreate && gridCnt == gridCntTotal){
		    	gridCreate = false;
		    	setData();
		    }
	});	
	
	TGSetEvent("OnRenderFinish","transShippingInvoiceDlgTransRequestMailGrid",function(gird){
			gridCnt += 1;
		    if(gridCreate && gridCnt == gridCntTotal){
		    	gridCreate = false;
		    	setData();
		    }
	});
	
	TGSetEvent("OnCalculateFinish","transShippingInvoicedlgTransRequestInvoiceGrid",function(gird){
		transRequestInvoiceGridCalculate(gird);
	});		

	$.datepicker.setDefaults($.datepicker.regional['ko']);
	$("#txtDlgTransRequestCargoReadyDate").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd"
	});
	var gridCode = getGridCode();
	var dlgTransRequestMailGridCol = {
		"Cfg" : {
			"id"				: "transShippingInvoiceDlgTransRequestMailGrid"
			, "CfgId"			: "transShippingInvoiceDlgTransRequestMailGridCfg"
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
			, "SelectingSingle"	: "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Panel" : {
			"Visible" : "1"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{	"Name": "EMP_NAME"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"	}	
			, {	"Name": "DEPT_NAME"		, "Width": "500", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"	}
			, {	"Name": "EMP_AD"		, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "Hidden" : "1", "Visible" : "0" 	}
		]
		, "Header" : {
			"EMP_NAME"	: "받는사람"
			, "Class"	: "gridCenterText"
			, "DEPT_NAME"	: "담당부서"
		}
	};	
	
	var gridCss = "gridBorderText gridTextColor";
	if(v_param.modalType != null && v_param.modalType == "view"){
		gridCss = "gridLinkText";
	}
	
	var dlgTransRequestInvoiceGridCol = {
		"Cfg": {
			"id"				: "transShippingInvoicedlgTransRequestInvoiceGrid"
			, "CfgId"			: "transShippingInvoicedlgTransRequestInvoiceGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "2"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "592"
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
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
	   "Cols" : [{ "Name": "RNUM", "Width": "50", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
	   			 { "Name": "INVOICE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : gridCss, "OnClickCell"	: "openInvoiceDetailModal(Grid,Row,Col);"   },
	   			 { "Name": "DESCRIPTION", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "SUPPLIERS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "CONTACT_POINTS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "PKG", "Width": "150", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "NET_WEIGHT", "Width": "150", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor "   },
	   		     { "Name": "GROSS_WEIGHT", "Width": "150", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor "   },
	   		     { "Name": "SHIPPING_VOLUME", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor "   },
	   		     { "Name": "SHOP_OUT_DATES", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "DELIVERY_TERMS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   		     { "Name": "DANGER_FLAG", "Width": "120", "Type": "Bool", "CanEdit": "0", "BoolIcon": "4", "Class" : "gridBorderText gridTextColor"   }],
			   "Header" : {"RNUM" : "No",
			   			   "INVOICE_NO" : "INVOICE NO", "Class"	: "gridCenterText",
			   			   "DESCRIPTION" : "Description",
			   			   "SUPPLIERS" : "Supplier",
			   			   "CONTACT_POINTS" : "Contact Point",
			   			   "PKG" : "Pkg",
			   			   "NET_WEIGHT" : "Net Weight(kg)",
			   			   "GROSS_WEIGHT" : "Gross Weight(kg)",
			   			   "SHIPPING_VOLUME" : "CBM",
			   			   "SHOP_OUT_DATES" : "Cargo Ready",
			   			   "DELIVERY_TERMS" : "구매인도조건",
			   			   "DANGER_FLAG" : "위험물 P/L"} 	
        ,"Foot" : [
				      { "Calculated": "1", "CanEdit": "0",  "Class" : "gridLinkText"  }  
				   ] 			   			   
	};		

	dlgTransRequestMailGrid = TreeGrid( {Layout:{Data : dlgTransRequestMailGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransRequestMail" );
	dlgTransRequestInvoiceGrid = TreeGrid( {Layout:{Data : dlgTransRequestInvoiceGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransRequestInvoice" );
	
	$('#btnDlgTransRequestMailAdd').click(function () { btnDlgTransRequestMailAddClick(); return false; });
	$('#btnDlgTransRequestMailDelete').click(function () { btnDlgTransRequestMailDeleteClick(); return false; });
	$('#btnDlgTransRequestCancel').click(function () { btnDlgTransRequestCancelClick(); return false; });
	$('#btnDlgTransRequestComplete').click(function () { btnDlgTransRequestCompleteClick(); return false; });
	$('#iconSearchLoadingPort').click(function () { iconSearchLoadingPortClick(); return false; });
	$('#iconSearchDestinationPort').click(function () { iconSearchDestinationPortClick(); return false; });
	
	
	
	if(v_param.modalType != null && v_param.modalType == "view"){
		
		$("#txtDlgTransRequestTtitle").attr("readonly", true);
		$("#txtDlgTransRequestContent").attr("readonly", true);
		$("#txtDlgTransRequestVoyageNo").attr("readonly", true);
		$("#selDlgTransRequestTransportType").attr("disabled", true);
		$("#selDlgTransRequestTransportTerms").attr("disabled", true);
		$("#selDlgTransRequestTransportMethod").attr("disabled", true);
		$("#txtDlgTransRequestCargoReadyDate").attr("disabled", true);
		$("#txtDlgTransRequestLoadingPort").attr("readonly", true);
		$("#txtDlgTransRequestDestinationPort").attr("readonly", true);
		$("#txtDlgTransRequestFinalDestinationAddr").attr("readonly", true);
		$("#txtDlgTransRequestContactPoint").attr("readonly", true);
		
		$('#iconSearchLoadingPort').hide();
		$('#iconSearchDestinationPort').hide();
		$('#btnDlgTransRequestComplete').hide();
	}
	else{
		$('#btnDlgTransRequestCancel').hide();
	}

	var list = v_param.menuAuthList;
	if(list != null){
		for(var i = 0; i < list.length; i++){
			var row = list[i];
			
			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();				
			}
		}	
	}
}



function closePopUp() {
	dlgTransRequestMailGrid.Dispose();
	dlgTransRequestInvoiceGrid.Dispose();
}

function initPopUp(param , callback) {
	v_callback = callback;
    v_param = param;
    
    initPopUpCode();    
}

function setData() {

	if(v_param.modalTtile != null){
		$('#dlgTransRequestTitle').text(v_param.modalTtile); 
	}
	
	if(v_param.modalType != null && v_param.modalType == "view"){
		searchDlgTransRequestInvoiceGridView();
		searchDlgTransRequestMailGridView();
		
		$("#txtDlgTransRequestTtitle").val(v_param.TITLE);
		$("#txtDlgTransRequestContent").val(v_param.CONTENT);
		$("#txtDlgTransRequestProjectId").val(v_param.PROJECT_ID);
		$("#txtDlgTransRequestProjectDesc").val(v_param.PROJECT_DESC);
		$("#txtDlgTransRequestVoyageNo").val(v_param.VOYAGE_NO);
		$("#selDlgTransRequestTransportType").val(v_param.TRANSPORT_TYPE);
		$("#selDlgTransRequestTransportTerms").val(v_param.TRANSPORT_TERMS);
		$("#selDlgTransRequestTransportMethod").val(v_param.TRANSPORT_METHOD);
		$("#txtDlgTransRequestCargoReadyDate").val(v_param.CARGO_READY_DATE);
		$("#txtDlgTransRequestLoadingPort").val(v_param.LOADING_PORT);
		$("#txtDlgTransRequestLoadingPortName").val(v_param.LOADING_PORT_NAME);
		$("#txtDlgTransRequestDestinationPort").val(v_param.DESTINATION_PORT);
		$("#txtDlgTransRequestDestinationPortName").val(v_param.DESTINATION_PORT_NAME);
		$("#txtDlgTransRequestFinalDestinationAddr").val(v_param.FINAL_DESTINATION_ADDR);
		$("#txtDlgTransRequestContactPoint").val(v_param.CONTACT_POINT);		
	}
	else {
	
		$('#txtDlgTransRequestProjectId').val(v_param.MAIN_PROJECT);
		$('#txtDlgTransRequestFinalDestinationAddr').val(v_param.FINAL_DESTINATION_ADDR);
			
		searchDlgTransRequestMailList();
		searchdlgTransRequestInvoiceList();		
	}	
	
	
}

function searchdlgTransRequestInvoiceList() {

	$.ajax({
		url: "/getTransShippingInvoiceDlgTransRequestInvoiceList.do",		
		data: {"list" : v_param.list},
		success: function (data, textStatus, jqXHR) {
			dlgTransRequestInvoiceGrid.Source.Data.Data.Body = [data.results];
			dlgTransRequestInvoiceGrid.Reload();
        }
    });	
}

function searchDlgTransRequestMailList() {	

	$.ajax({
		url: "/getTransShippingInvoiceDlgTransRequestMailList.do",		
		data: {"PROJECT_ID" : $('#txtDlgTransRequestProjectId').val()},
		success: function (data, textStatus, jqXHR) {
			
			var resultList = data.results;
			
			for(var i = 0; i < resultList.length; i++){
				var resultRow = resultList[i];
				var row = dlgTransRequestMailGrid.AddRow(null,null,1,null,null);
				row.EMP_NAME = resultRow.EMP_NAME;
				row.DEPT_NAME = resultRow.DEPT_NAME;
				row.EMP_AD = resultRow.EMP_AD;
				
				dlgTransRequestMailGrid.RefreshRow(row);			
			}
        }
    });	
}

function searchDlgTransRequestMailGridView() {
	$.ajax({
		url: "/getTransDlgTransRequestMailGridView.do",		
		data: {"ORDER_MASTER_ID" : v_param.ORDER_MASTER_ID},
		success: function (data, textStatus, jqXHR) {

			dlgTransRequestMailGrid.Source.Data.Data.Body = [data.results];
			dlgTransRequestMailGrid.ReloadBody();
        }
    });
}


function searchDlgTransRequestInvoiceGridView() {
	$.ajax({
		url: "/getTransDlgTransRequestInvoiceGridView.do",		
		data: {"ORDER_MASTER_ID" : v_param.ORDER_MASTER_ID},
		success: function (data, textStatus, jqXHR) {

			dlgTransRequestInvoiceGrid.Source.Data.Data.Body = [data.results];
			dlgTransRequestInvoiceGrid.ReloadBody();
        }
    });
}

function transRequestInvoiceGridCalculate(grid) {
	var list = grid.Rows;
	
	var calList = [];
	var calKeyList = [];
	
	var v_ShippingReqNo = "";
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(gridRow.Fixed == "Foot"){
			var calKeyRow = {"RowKey" : key }; 
			calKeyList.push(calKeyRow);		
		}
		else if(gridRow.Fixed == null){
			
			if(calList.length == 0){
				var calRow = {"PKG_SUM" : gridRow.PKG_SUM, "NET_WEIGHT_SUM" : gridRow.NET_WEIGHT_SUM,
							  "GROSS_WEIGHT_SUM" : gridRow.GROSS_WEIGHT_SUM, "SHIPPING_VOLUME_SUM" : gridRow.SHIPPING_VOLUME_SUM};
				calList.push(calRow);
			}			
		}
	}  
	
	for (var i = 0; i < calKeyList.length; i++){
		var calKeyRow = calKeyList[i];
		var gridRow = list[calKeyRow.RowKey];		

		
		if(calList.length > 0) {
			var calRow = calList[0];
			gridRow.NET_WEIGHT = calRow.NET_WEIGHT_SUM;
			gridRow.GROSS_WEIGHT = calRow.GROSS_WEIGHT_SUM;
			gridRow.SHIPPING_VOLUME = calRow.SHIPPING_VOLUME_SUM;
			gridRow.PKG = calRow.PKG_SUM;
			gridRow.CONTACT_POINTS = "합계";
			
			grid.RefreshRow(gridRow);			
		}
	} 	
}

function btnDlgTransRequestMailAddClick() {
	
	var param = {};
	$('#divTransRequestPopUp').load("/transMailAddPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
						
			initMailAddPopUp(param, function (key, returnParam) {
				if(key == "select-item"){
					
					var itemCheck = true;
					var list = dlgTransRequestMailGrid.Rows;
					
					for (var key in list) {
						var gridRow = list[key];
						if(gridRow.EMP_AD != null && gridRow.EMP_AD == returnParam.EMP_AD){
							
							itemCheck = false;
						}
					}
					
					if(itemCheck) {
						var row = dlgTransRequestMailGrid.AddRow(null,null,1,null,null);
						row.EMP_NAME = returnParam.EMP_NAME;
						row.DEPT_NAME = returnParam.DEPT_NAME;
						row.EMP_AD = returnParam.EMP_AD;
						
						dlgTransRequestMailGrid.RefreshRow(row);						
					}

					$('#dlgMailAdd').modal('hide');
				}
			});
			$('#dlgMailAdd').modal('show');
			
		}
	});		
	
}

function btnDlgTransRequestMailDeleteClick() {

	var selectList = dlgTransRequestMailGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert("선택된 항목이 없습니다.");
		alert_modal("알람", "선택된 항목이 없습니다.");
		return;
	}
	
	for(var i = 0; i < selectList.length; i++){
	
		var row = selectList[i];
		dlgTransRequestMailGrid.RemoveRow(row);
		
	}
}

function openInvoiceDetailModal(G,row,col) {

	if(v_param.modalType != null && v_param.modalType == "view"){
	
		var param = Object.assign({}, row);
			param.menuAuthList = v_param.menuAuthList;
		
		$('#divTransRequestPopUp').load("/transInvoiceDetailPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initInvoiceDetailPopUp(param, function (key, returnParam) {
					if(key == "save-item") {
						searchDlgTransRequestMailGridView();
						searchDlgTransRequestInvoiceGridView();
						
						if(v_callback)
						{
							v_callback("save-item", null);
						}						
					}
					else if(key == "delete-item") {
						searchDlgTransRequestMailGridView();
						searchDlgTransRequestInvoiceGridView();
						
						if(v_callback)
						{
							v_callback("delete-item", null);
						}						
					}
					else if(key == "complete-item") {
						searchDlgTransRequestMailGridView();
						searchDlgTransRequestInvoiceGridView();
						
						if(v_callback)
						{
							v_callback("complete-item", null);
						}						
					}					
				});
				$('#dlgInvoiceDetail').modal('show');
				
			}
		});
	}
}

function btnDlgTransRequestCancelClick() {
	
    if(v_param.STATUS !== '운송요청') {
    	//alert("해당 항차는 이미 발주가 진행되고 있기 때문에 취소가 불가능합니다.");
    	alert_modal("알람", "해당 항차는 이미 발주가 진행되고 있기 때문에 취소가 불가능합니다.");
    	return;
    }	
    
	confirm_modal("알람", "해당 운송요청건을 취소하고 삭제하시겠습니까?<br/>수행 후에는 되돌릴 수 없습니다.", null, function (callobj, result) {
		if(result) {
			$.ajax({
				url: "/cancelTransDlgTransRequestInvoice.do",		
				data: {"ORDER_MASTER_ID" : v_param.ORDER_MASTER_ID},
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						if(result.error_code != null && result.error_code == "-2") {
							alert_fail($('#alertDeleteFail2').val());
						}
						else {
							alert_success($('#alertCompleteSuccess').val());
							if(v_callback)
							{
								v_callback("cancel-item", null);
							}				
						}				
							
					}	
	
		        }
		    });		
		}
	});    
    
    /*if (confirm("해당 운송요청건을 취소하고 삭제하시겠습니까?\n수행 후에는 되돌릴 수 없습니다.")) {    
    }*/ 
}

function btnDlgTransRequestCompleteClick() {

	var chkValidation = checkRequiredField("dlgTransRequest");
	
	if (!chkValidation) {
		//alert($('#alertValidate').val());
		alert_modal("알람", $('#alertValidate').val());
		return false;
	}
	
	var rowCnt = dlgTransRequestMailGrid.RowCount;
	if(rowCnt == 0) {
		//alert($('#alertGridDataNullMail').val());
		alert_modal("알람", $('#alertGridDataNullMail').val());
		return false;	
	}
	
	confirm_modal("알람", $('#alertComplete').val(), null, function (callobj, result) {
		if(result) {
			var changeObject = dlgTransRequestMailGrid.GetChanges();
			var changeList = JSON.parse(changeObject).Changes;
			var gridMailList = [];
			for(var i = 0; i < changeList.length; i++){
				var gridRow = changeList[i];
				
				var row = {"EMP_AD" : gridRow.EMP_AD};
			  	gridMailList.push(row);		
			}	
			var updateMailList = JSON.stringify(gridMailList);
			
			var gridInvoiceList = []; 
			for (var key in dlgTransRequestInvoiceGrid.Rows) {
				
				var gridRow = dlgTransRequestInvoiceGrid.Rows[key];
				if(gridRow.Fixed == null){
					gridInvoiceList.push({"INVOICE_NO" : gridRow.INVOICE_NO, "DESCRIPTION" : gridRow.DESCRIPTION , "SUPPLIERS" : gridRow.SUPPLIERS,
										  "CONTACT_POINTS" : gridRow.CONTACT_POINTS, "PKG" : gridRow.PKG, "NET_WEIGHT" : gridRow.NET_WEIGHT,
										  "GROSS_WEIGHT" : gridRow.GROSS_WEIGHT, "SHIPPING_VOLUME" : gridRow.SHIPPING_VOLUME, "SHOP_OUT_DATES" : gridRow.SHOP_OUT_DATES,
										  "DELIVERY_TERMS" : gridRow.DELIVERY_TERMS, "DANGER_FLAG" : gridRow.DANGER_FLAG,
										  "PROJECT_ID" : gridRow.PROJECT_ID, "DOCUMENT_GRP_ID" : gridRow.DOCUMENT_GRP_ID, "INVOICE_NO_ID" : gridRow.INVOICE_NO_ID
										  });	
				}
			}
			var invoiceList = JSON.stringify(gridInvoiceList);		
			
			var paramData = {"TITLE" : $('#txtDlgTransRequestTtitle').val(), "CONTENT" : $('#txtDlgTransRequestContent').val(), "PROJECT_ID" : $('#txtDlgTransRequestProjectId').val(),
							 "VOYAGE_NO" : $('#txtDlgTransRequestVoyageNo').val(), "TRANS_PORT_TYPE" : $('#selDlgTransRequestTransportType').val(), "TRANS_PORT_TERMS" : $('#selDlgTransRequestTransportTerms').val(), 
							 "TRANS_PORT_METHOD" : $('#selDlgTransRequestTransportMethod').val(), "CARGO_READY_DATE" : $('#txtDlgTransRequestCargoReadyDate').val(), "LOADING_PORT" : $('#txtDlgTransRequestLoadingPort').val(),
							 "LOADING_PORT_NAME" : $('#txtDlgTransRequestLoadingPortName').val(), "DESTINATION_PORT" : $('#txtDlgTransRequestDestinationPort').val(), "DESTINATION_PORT_NAME" : $('#txtDlgTransRequestDestinationPortName').val(),
							 "FINAL_DESTINATION_ADDR" : $('#txtDlgTransRequestFinalDestinationAddr').val(), "CONTACT_POINT" : $('#txtDlgTransRequestContactPoint').val(),
							 "ORDER_MASTER_ID" : "", "STATUS" : "운송요청",
							 "updateMailList" : updateMailList, "invoiceList" : invoiceList};
			
			
			$.ajax({			
				url: "/completeTransShippingInvoice.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					var resultMap = result.resultMap;
					
					if(resultMap.result_status == "F") {
						alert_fail(resultMap.result_msg);
					}
					else if(resultMap.result_status == "D") {
						alert_fail($('#alertCompleteFail5').val());
					}
					else if(resultMap.result_status == "E") {
						if(resultMap.result_data != null){
							var msg = $('#alertCompleteFail3').val() + "<br/>첨부가 누락된 Invoice List:<br/>" + resultMap.result_data;
							alert_fail(msg);
						}
						else {
							alert_fail($('#alertCompleteFail3').val());
						}	
					}
					else if(resultMap.result_status == "S") {
						paramData.ORDER_MASTER_ID = resultMap.result_data;
						paramData.SENDER_EMAIL = $('#txtEmail').val();
						sendMailPreShippingOrder(paramData);		
					}								
				}
			});		
		}
	});	
	
	/*if (confirm($('#alertComplete').val())) {
	}*/
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

function sendMailPreShippingOrder(paramData){

		$.ajax({			
			url: "/sendMailTransShippingInvoice.do",
			data: paramData,
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				} else {
					if(result.error_code != null && result.error_code == "-2") {
						alert_fail($('#alertDeleteFail2').val());
					}
					else {
						alert_success($('#alertSaveSuccess').val());
						if(v_callback)
						{
							v_callback("complete-item", null);
						}			
					}				
						
				}
			}
		});	
}

function iconSearchLoadingPortClick() {

	var param = {};
		param.modalTitle = "선적항 검색";
		param.PORT = $('#txtDlgTransRequestLoadingPort').val();
		
	$('#divTransRequestPopUp').load("/transPortPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initTransPortPopUp(param, function (key, returnParam) {
				if(key == "select-item") {
					$('#txtDlgTransRequestLoadingPort').val(returnParam.PORT_CODE);
					$('#txtDlgTransRequestLoadingPortName').val(returnParam.PORT_NAME);				
	
	
					$('#dlgPort').modal('hide');											
				}
			});
			
			$('#dlgPort').modal('show');
			
		}
	});		

}

function iconSearchDestinationPortClick() {

	var param = {};
		param.modalTitle = "도착항 검색";
		param.PORT = $('#txtDlgTransRequestDestinationPort').val();
		
	$('#divTransRequestPopUp').load("/transPortPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){		
				
			initTransPortPopUp(param, function (key, returnParam) {
				if(key == "select-item") {
					$('#txtDlgTransRequestDestinationPort').val(returnParam.PORT_CODE);
					$('#txtDlgTransRequestDestinationPortName').val(returnParam.PORT_NAME);				
	
	
					$('#dlgPort').modal('hide');											
				}
			});
			
			$('#dlgPort').modal('show');
			
		}
	});		

}


