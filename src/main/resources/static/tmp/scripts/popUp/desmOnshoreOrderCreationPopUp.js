var dlgDesmOnshoreOrderGrid;

var v_desm_onshore_order_creation_callback = null;
var v_desm_onshore_order_creation_param;

var isNewDesmOnshoreOrderCreationPopUp = false;

function initDesmOnshoreOrderPopUp(param , callback) {
	v_desm_onshore_order_creation_callback = callback;
	v_desm_onshore_order_creation_param = param;

	$('#dlgDesmOnshoreOrderCreation').on('shown.bs.modal', function () {
		$('#dlgDesmOnshoreOrderCreation').click();
	});

	$('#dlgDesmOnshoreOrderCreation').on('hidden.bs.modal', function () {
	  	closeDesmOnshoreOrderPopUp();
	});

	$('#dlgDesmOnshoreOrderCreation').modal('show');

	if(v_desm_onshore_order_creation_param.ORDER_HEADER_ID == null || v_desm_onshore_order_creation_param.ORDER_HEADER_ID == "") {
		isNewDesmOnshoreOrderCreationPopUp = true;
		$('#txtDlgDesmOnshoreOrderCreationRequestBy').val($('#txtDlgDesmOnshoreOrderCreationTransUserId').val());
		$('#txtDlgDesmOnshoreOrderCreationRequestByAd').val($('#txtDlgDesmOnshoreOrderCreationTransUserId').val());
	}

	$('#dlgDesmOnshoreOrderCreationTitle').text(
		(v_desm_onshore_order_creation_param.ORDER_HEADER_ID == null || v_desm_onshore_order_creation_param.ORDER_HEADER_ID == "") ? 
				'Order Creation' : 
				'Order Detail [' + v_desm_onshore_order_creation_param.ORDER_SEQ + '][' + v_desm_onshore_order_creation_param.ORDER_STATUS + ']'
	);

	initCode();
}

function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
		 	toDay = results.DAY[0].CUR_DAY;	
		 	
		 	initDesmOnshoreOrderPopUpControls();
        }
    });
	    
}

function initDesmOnshoreOrderPopUpControls() {

	initDatePicker();

//	makeAutocomplete(
//		"txtDlgDesmOnshoreOrderCreationProjectNo", 		//자동완성 입력 input
//		"",					//keyword2 파라메터 id
//		"txtDlgDesmOnshoreOrderCreationProjectName",		//clear필드 id
//		"/getIdsmSetupProject.do",  	//검색 URL
//		2,			//검색 실행을 위한 keyword 최소 길이
//		false,				//선택완료 마크 표시 여부
//		function(event, ui) {
//
//			$("#txtDlgDesmOnshoreOrderCreationProjectNo").val(ui.item.value.split("|")[1]);
//			$("#txtDlgDesmOnshoreOrderCreationProjectName").val(ui.item.value.split("|")[2]);
//			return false;
//		}
//	);

	makeAutocomplete(
		"txtDlgDesmOnshoreOrderCreationRequestBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmOnshoreOrderCreationRequestByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmOnshoreOrderCreationRequestBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmOnshoreOrderCreationRequestByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmOnshoreOrderCreationApproveBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmOnshoreOrderCreationApproveByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmOnshoreOrderCreationApproveBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmOnshoreOrderCreationApproveByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	$('button').on('click', function() {
		switch($(this).attr('id')) {
		case 'btnDlgDesmOnshoreOrderCreationFile'				: btnDlgDesmOnshoreOrderCreationFileClick(); 				break;
		case 'btnDlgDesmOnshoreOrderCreationSave'				: btnDlgDesmOnshoreOrderCreationSaveClick(); 				break;
		case 'btnDlgDesmOnshoreOrderCreationRequest'			: btnDlgDesmOnshoreOrderCreationRequestClick(); 			break;
		case 'btnDlgDesmOnshoreOrderCreationApprove'			: btnDlgDesmOnshoreOrderCreationApproveClick();				break;
		case 'btnDlgDesmOnshoreOrderCreationReject'				: btnDlgDesmOnshoreOrderCreationRejectClick(); 				break;
		case 'btnDlgDesmOnshoreOrderCreationConfirm'			: btnDlgDesmOnshoreOrderCreationConfirmClick(); 			break;

		case 'btnDlgDesmOnshoreOrderCreationAdd'				: btnDlgDesmOnshoreOrderCreationAddClick(); 				break;
		case 'btnDlgDesmOnshoreOrderCreationDel'				: btnDlgDesmOnshoreOrderCreationDelClick(); 				break;
		case 'btnDlgDesmOnshoreOrderCreationExcelUpload'		: btnDlgDesmOnshoreOrderCreationExcelUploadClick(); 		break;
		}
	});
	
	$('#iconContractSearch').click(function () { iconContractSearchClick(); return false; });
	
	$('.comma').on('keyup', function () {
		let value = $(this).val();
		value = Number(value.replaceAll(',', ''));
		$(this).val(isNaN(value) ? '' : value.toLocaleString('ko-KR'));
	});
	
	TGSetEvent("OnCopy","dlgDesmOnshoreOrderGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

	TGSetEvent("OnRenderFinish","dlgDesmOnshoreOrderGrid",function(grid){
//		setDlgDesmOnshoreOrderCreationBtn();
		if(!isNewDesmOnshoreOrderCreationPopUp) {
			searchDesmMprCreation();
		}
	});

	var dlgDesmOnshoreOrderGridCol = {
		"Cfg": {
			"id"				: "dlgDesmOnshoreOrderGrid"
			, "CfgId"			: "dlgDesmOnshoreOrderGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" 	: "100"
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
			, "Sorting"			: "0"
			, "Code" 			: getGridCode()
			,"CopyCols" 		: "0"
			,"ColsPosLap"		:"1"
			//,"ColsLap":"1"
		}
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "ORDER_HEADER_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "ORDER_LINE_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "CONTRACT_LINE_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "REQ_QTY", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "PLAN_DATE", "Width": "160", "Type": "Date" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
	   			 {	"Name"	: "REMARKS", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "TYPE", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "ITEM1", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "ITEM2", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "ITEM3", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "ITEM4", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "ITEM_NO", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "QUANTITY", "Width": "130", "Type": "Float" , "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnChange": "CalcAmount( Grid, Row,Col )" },
	   			 {	"Name"	: "SEPC", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
//	   			 {	"Name"	: "UOM", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
//	   			 {	"Name"	: "NET", "Width": "80", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
//	   			 {	"Name"	: "GROSS", "Width": "80", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
//	   			 {	"Name"	: "CURRENCY", "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Size": "3" },
//	   			 {	"Name"	: "UNIT_PRICE", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "CalcAmount( Grid, Row,Col )" },
//	   			 {	"Name"	: "AMOUNT", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//	   			 {	"Name"	: "PROMISED_DATE", "Width": "130", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
//	   			 {	"Name"	: "PAYMENT_METHOD", "Width": "160", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
//	   			 {	"Name"	: "FOB", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }
	   			],
		"Header" : {"Class" : "gridCenterText",
	   		"REQ_QTY"	: "Request Q'ty",
	   		"PLAN_DATE"	: "Plan Date",
	   		"REMARKS"	: "Remarks",
		   	"TYPE"	: "Type",
		   	"ITEM1"	: "Item1",
		   	"ITEM2" : "Item2",
		   	"ITEM3"	: "Item3",
		   	"ITEM4" : "Item4",
		   	"ITEM_NO"	: "Item No",
		   	"QUANTITY"	: "Q’ty",
		   	"SEPC"	: "Spec",
//		   	"UOM"	: "UOM",
//		   	"NET"	: "Net",
//		   	"GROSS"	: "Gross",
//		   	"CURRENCY" : "Currency",
//	   		"UNIT_PRICE"	: "Unit Price",
//	   		"AMOUNT"	: "Amount",
//	   		"PROMISED_DATE" : "Promised Date",
//	   		"PAYMENT_METHOD"	: "Payment Method",
//	   		"FOB"	: "FOB"
		}
	};

	dlgDesmOnshoreOrderGrid = TreeGrid( {Layout:{Data : dlgDesmOnshoreOrderGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmOnshoreOrderGrid" );

	console.log(isNewDesmOnshoreOrderCreationPopUp);
	if(isNewDesmOnshoreOrderCreationPopUp) {
		initDefailProject(function (list) {
			console.log(list);

			if(list.length > 0) {
				$('#txtDlgDesmContractCreationProjectNo').val(list[0]["SEGMENT1"]);
				$('#txtDlgDesmContractCreationProjectName').val(list[0]["NAME"]);
			}
		});
	}
}

function setDlgDesmOnshoreOrderCreationBtn() {
	if(v_desm_onshore_order_creation_param.STATUS == 'Incomplete' || v_desm_onshore_order_creation_param.STATUS == 'Rejected') {
		$('#btnDlgDesmOnshoreOrderCreationApprove').hide();
		$('#btnDlgDesmOnshoreOrderCreationReject').hide();
	} else {
		$('#btnDlgDesmOnshoreOrderCreationAdd').hide();
		$('#btnDlgDesmOnshoreOrderCreationDel').hide();
		$('#btnDlgDesmOnshoreOrderCreationExcelUpload').hide();
		$('#btnDlgDesmOnshoreOrderCreationSave').hide();
		$('#btnDlgDesmOnshoreOrderCreationRequest').hide();
		if(v_desm_onshore_order_creation_param.STATUS == 'Approved') {
			$('#btnDlgDesmOnshoreOrderCreationApprove').hide();
			$('#btnDlgDesmOnshoreOrderCreationReject').hide();
		}
	}
	
	var list = v_desm_onshore_order_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
}

function closeDesmOnshoreOrderPopUp() {
	dlgDesmOnshoreOrderGrid.Dispose();
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

function CalcAmount(G,row,col){
	var qty = row.QUANTITY;
	var unitPrice = row.UNIT_PRICE;
	if(qty == '' || unitPrice == '') {
		return;
	}
	row.AMOUNT = qty * unitPrice;
	dlgDesmOnshoreOrderGrid.RefreshRow(row);
}

function ShowCustomCalendar(G,row,col){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
	   G.SetValue(row,col,n,1);
	}

	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function iconContractSearchClick(){
	var param = {
		'PROJECT_NO' : $('#txtDlgDesmContractCreationProjectNo').val()
		, 'keyword' : $('#txtDlgDesmContractCreationContractSeq').val()
	};

	$('#dlgDesmOnshoreOrderCreationPopUp').load("/desmContractHeaderSearchPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmContractHeaderSearchPopUp(param, function (key, returnParam) {
				if(key == "select-item"){
					v_desm_onshore_order_creation_param.CONTRACT_HEADER_ID = returnParam.CONTRACT_HEADER_ID;
					$('#txtDlgDesmContractCreationProjectNo').val(returnParam.PROJECT_NO);
					$('#txtDlgDesmContractCreationProjectName').val(returnParam.PROJECT_NAME);
		            $('#txtDlgDesmContractCreationContractSeq').val(returnParam.CONTRACT_SEQ);
		            $('#txtDlgDesmContractCreationRevision').val(returnParam.REVISION);
		            $('#txtDlgDesmContractCreationCategory').val(returnParam.CATEGORY);
		            $('#txtDlgDesmContractCreationContractNo').val(returnParam.CONTRACT_NO);
		            $('#txtDlgDesmContractCreationContractName').val(returnParam.CONTRACT_NAME);
		            $('#txtDlgDesmContractCreationDate').val(returnParam.CONTRACT_DATE);
		            $('#txtDlgDesmContractCreationContractor').val(returnParam.CONTRACTOR);
		            $('#txtDlgDesmContractCreationDescription').val(returnParam.DESCRIPTION);
				}
			});	
		}
	});	
}

function searchDesmMprCreation() {
	console.log('searchDesmMprCreation');
	$.ajax({
		url: "/getDesmOnshoreOrderInfo.do",
		data: {
			"CONTRACT_HEADER_ID" : v_desm_onshore_order_creation_param.CONTRACT_HEADER_ID
			, "ORDER_HEADER_ID" : v_desm_onshore_order_creation_param.ORDER_HEADER_ID
		},
		success: function (data, textStatus, jqXHR) {
			console.log(data);
			var infoData = data.results.contractInfo;
			$('#txtDlgDesmContractCreationProjectNo').val(infoData.PROJECT_NO);
			$('#txtDlgDesmContractCreationProjectName').val(infoData.PROJECT_NAME);
            $('#txtDlgDesmContractCreationContractSeq').val(infoData.CONTRACT_SEQ);
            $('#txtDlgDesmContractCreationRevision').val(infoData.REVISION);
            $('#txtDlgDesmContractCreationCategory').val(infoData.CATEGORY);
            $('#txtDlgDesmContractCreationContractNo').val(infoData.CONTRACT_NO);
            $('#txtDlgDesmContractCreationContractName').val(infoData.CONTRACT_NAME);
            $('#txtDlgDesmContractCreationDate').val(infoData.CONTRACT_DATE);
            $('#txtDlgDesmContractCreationContractor').val(infoData.CONTRACTOR);
            $('#txtDlgDesmContractCreationDescription').val(infoData.TERM_FROM);
            
            var header = data.results.headerInfo;
			$('#txtDlgDesmOnshoreOrderCreationOrderSeq').val(header.ORDER_SEQ);
			$('#txtDlgDesmOnshoreOrderCreationOrderName').val(header.ORDER_NAME);
            $('#txtDlgDesmOnshoreOrderCreationOrderDate').val(header.ORDER_DATE);
            $('#txtDlgDesmOnshoreOrderPlanDateFrom').val(header.PLAN_DATE_FROM);
            $('#txtDlgDesmOnshoreOrderPlanDateTo').val(header.PLAN_DATE_TO);
            $('#txtDlgDesmOnshoreOrderCreationDescription').val(header.DESCRIPTION);
            $('#txtDlgDesmOnshoreOrderCreationInvoiceNo').val(header.INVOICE_NO);
            $('#txtDlgDesmOnshoreOrderCreationRemarks').val(header.REMARKS);
            $('#txtDlgDesmOnshoreOrderCreationOrderStatus').val(header.ORDER_STATUS);

			dlgDesmOnshoreOrderGrid.Source.Data.Data.Body = [data.results.lineList];
			dlgDesmOnshoreOrderGrid.ReloadBody();
			
		}
	});
}

function btnDlgDesmOnshoreOrderCreationAddClick() {
	var contractHeaderId = v_desm_onshore_order_creation_param.CONTRACT_HEADER_ID;
	if (contractHeaderId == '') {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var param = {CONTRACT_HEADER_ID : contractHeaderId};

	$('#dlgDesmOnshoreOrderCreationPopUp').load("/desmContractLineSearchPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmContractLineSearchPopUp(param, function (key, returnParam) {
				if(key == "select-item"){
					var list = returnParam;
					var gridList = dlgDesmOnshoreOrderGrid.Rows;
					for(var i = 0; i < list.length; i++) {
						var row = list[i];
						var itemCheck = true;
						
						for (var key in gridList) {
							var gridRow = gridList[key];
							
							if(gridRow.Fixed == null){
								if(row.CONTRACT_HEADER_ID == gridRow.CONTRACT_HEADER_ID && row.CONTRACT_LINE_ID == gridRow.CONTRACT_LINE_ID){
									itemCheck = false;
								}
							}
						}	
						
						if(itemCheck) {
							var tempRow = dlgDesmOnshoreOrderGrid.AddRow(null,null,1,null,null);
							tempRow.ORDER_HEADER_ID = row.ORDER_HEADER_ID;
							tempRow.ORDER_LINE_ID = row.ORDER_LINE_ID;
							tempRow.CONTRACT_LINE_ID = row.CONTRACT_LINE_ID;
							tempRow.TYPE = row.TYPE;
							tempRow.ITEM1 = row.ITEM1;
							tempRow.ITEM2 = row.ITEM2;
							tempRow.ITEM3 = row.ITEM3;
							tempRow.ITEM4 = row.ITEM4;
							tempRow.ITEM_NO = row.ITEM_NO;
							tempRow.SEPC = row.SEPC;
							tempRow.QUANTITY = row.QUANTITY;
							
							dlgDesmOnshoreOrderGrid.RefreshRow(tempRow);													
						}					
					}
				}
			});	
		}
	});	
}

function btnDlgDesmOnshoreOrderCreationDelClick() {
	dlgDesmOnshoreOrderGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmOnshoreOrderGrid.GetSelRows();
	if(selectList.length == 0) {
		return;
	}
	
	for(var i = 0; i < selectList.length; i++) {
		var row = selectList[i];
		dlgDesmOnshoreOrderGrid.RemoveRow(row);
	}
}

function btnDlgDesmOnshoreOrderCreationExcelUploadClick() {
	var param = {};
	$('#dlgDesmOnshoreOrderCreationPopUp').load("/desmContractExcelUploadPopUp.do", null, function(data, status, xhr) {
		if(status == "success") {
			initOnshoreOrderExcelUploadPopUp(param, function(key, returnParam) {
				console.log(returnParam.length);
				if(key == "excel-item") {
					var list = [];
					$.each(returnParam, function(i, row) {
						var gridRow = {
								"ORDER_HEADER_ID"		: row.ORDER_HEADER_ID,
								"ORDER_LINE_ID"			: row.ORDER_LINE_ID,
								"CONTRACT_HEADER_ID"	: row.CONTRACT_HEADER_ID,
								"REQ_QTY"				: row.REQ_QTY,
								"PLAN_DATE"				: row.PLAN_DATE,
								"REMARKS"				: row.REMARKS,
								"TYPE"					: row.TYPE,
								"ITEM1"					: row.ITEM1,
								"ITEM2"					: row.ITEM2,
								"ITEM3"					: row.ITEM3,
								"ITEM4"					: row.ITEM4,
								"ITEM_NO"				: row.ITEM_NO,
								"SEPC"					: row.SEPC,
								"QUANTITY"				: row.QUANTITY/*,
								"REVISION"				: row.REVISION,
								"UOM"					: row.UOM,
								"NET"					: row.NET,
								"GROSS"					: row.GROSS,
								"CURRENCY"				: row.CURRENCY,
								"UNIT_PRICE"			: row.UNIT_PRICE,
								"AMOUNT"				: row.AMOUNT,
								"PROMISED_DATE"			: formatDate(row.PROMISED_DATE),
								"PAYMENT_METHOD"		: row.PAYMENT_METHOD,
								"FOB"					: row.FOB*/
							};
						list.push(gridRow);			
					});
					
					dlgDesmOnshoreOrderGrid.Source.Data.Data.Body = [list];
					dlgDesmOnshoreOrderGrid.ReloadBody();
				}
			});
			$('#dlgDesmContractExcelUploadPopUp').modal('show');
		}
	});
}

function btnDlgDesmOnshoreOrderCreationSaveClick() {
	dlgDesmOnshoreOrderCreationSave('Incomplete');
}

function btnDlgDesmOnshoreOrderCreationRequestClick() {
	dlgDesmOnshoreOrderCreationSave('Request');
}

function btnDlgDesmOnshoreOrderCreationApproveClick() {
	dlgDesmOnshoreOrderCreationSave('Pre-Approved');
}

function btnDlgDesmOnshoreOrderCreationConfirmClick() {
	dlgDesmOnshoreOrderCreationSave('Confirm');
}

function btnDlgDesmOnshoreOrderCreationRejectClick() {
	dlgDesmOnshoreOrderGrid.ActionAcceptEdit();
	dlgDesmOnshoreOrderInfomationGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			// FIXME: Remark 추가해서 Reject할 때 저장될 수 있어야 함.
			var paramData = objNullCheck({
				"ORDER_HEADER_ID" : v_desm_onshore_order_creation_param.ORDER_HEADER_ID
				, "REMARKS" : $('#txtDlgDesmOnshoreOrderCreationRemark').val()
			});
			$.ajax({
				url: "/saveDesmOnshoreOrderReject.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						sendMail($('#alertRejectSuccess').val());
					}
				}
			});
		}
	});
}

function chkValidOnshoreOrderLine() {
	var gridList = dlgDesmOnshoreOrderGrid.Rows;
	for (var key in gridList) {		
		var gridRow = gridList[key];
		if(gridRow.Fixed == null) {
			if(gridRow.REQ_QTY == '' || gridRow.PLAN_DATE == '' || gridRow.Remarks == '') {
				alert_modal("", $('#alertOnshoreOrderLineValidate').val());
				return false;
			}
			var planDateFrom = $('#txtDlgDesmOnshoreOrderPlanDateFrom').val();
			var planDateTo = $('#txtDlgDesmOnshoreOrderPlanDateTo').val();
			if(planDateFrom > gridRow.PLAN_DATE || planDateTo < gridRow.PLAN_DATE) {
				alert_modal("", 'Plan Date 확인');
				return false;
			}
		}
	}
	return true;
}

function dlgDesmOnshoreOrderCreationSave(transType) {
	dlgDesmOnshoreOrderGrid.ActionAcceptEdit();

	var chkValidation = checkRequiredField("divDlgDesmOnshoreOrderCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if (!chkValidOnshoreOrderLine()) {
		return;
	}

    var getStatus = function(isMsg) {
    	var rtnVal = '';
    	switch(transType) {
		case 'Request'		: rtnVal = isMsg ? $('#alertRequest').val() 	: 'Pre-Approved';	break;
		case 'Pre-Approved'	: rtnVal = isMsg ? $('#alertApprove').val() 	: 'Approved'; 		break;
		case 'Confirm'		: rtnVal = isMsg ? $('#alertConfirm').val() 	: 'Confirm'; 		break;
		case 'Reject​ed'		: rtnVal = isMsg ? $('#alertReject').val() 		: 'Reject​ed'; 		break;
		default				: rtnVal = isMsg ? $('#alertSave').val() 		: 'Incomplete'; 	break;
    	}
    	return rtnVal;
    }

	confirm_modal("", getStatus(true), null, function (callobj, result) {
		if(result) {
			
			var formData = new FormData();
			var file_obj = $("#txtDlgDesmOnshoreOrderCreationAttListFile");
			for (var i = 0; i < file_obj.length; i++) {
				for (var j = 0; j < file_obj[i].files.length; j++) {	
					var pattern_spc = /['",]/;
					if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())) {
						alert($('#alertFileCheck').val());
						return false
					}
					
					formData.append("ATT" + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	
				}
			}	
			
			var getUpdateRow = function(row) {
				var updateRow = objNullCheck(
						{	
							"ORDER_HEADER_ID"	: row.ORDER_HEADER_ID,
							"ORDER_LINE_ID"		: row.ORDER_LINE_ID,
							"CONTRACT_LINE_ID"	: row.CONTRACT_LINE_ID,
							"REVISION"			: row.REVISION,
							"REQ_QTY"			: row.REQ_QTY,
							"PLAN_DATE"			: formatDate(row.PLAN_DATE),
							"REMARKS"			: row.REMARKS,
							"TYPE"				: row.TYPE,
							"ITEM1"				: row.ITEM1,
							"ITEM2"				: row.ITEM2,
							"ITEM3"				: row.ITEM3,
							"ITEM4"				: row.ITEM4,
							"ITEM_NO"			: row.ITEM_NO,
							"SEPC"				: row.SEPC/*,
							"UOM"				: row.UOM,
							"QUANTITY"			: row.QUANTITY,
							"NET"				: row.NET,
							"GROSS"				: row.GROSS,
							"CURRENCY"			: row.CURRENCY,
							"UNIT_PRICE"		: row.UNIT_PRICE,
							"AMOUNT"			: row.AMOUNT,
							"PROMISED_DATE"		: formatDate(row.PROMISED_DATE),
							"PAYMENT_METHOD"	: row.PAYMENT_METHOD,
							"FOB"				: row.FOB*/
						}
					);
				return updateRow;
			}

			var updateList = [];
			var changeObject = dlgDesmOnshoreOrderGrid.GetChanges();
			var changeList = JSON.parse(changeObject).Changes;
			for(var i = 0; i < changeList.length; i++) {
				var rowId = changeList[i].id;
				var row = dlgDesmOnshoreOrderGrid.GetRowById(rowId);
				updateList.push(getUpdateRow(row));
			}

			formData.append("TO_DAY", toDay);
			formData.append("ORDER_HEADER_ID"		, v_desm_onshore_order_creation_param.ORDER_HEADER_ID);
			formData.append("CONTRACT_HEADER_ID"	, v_desm_onshore_order_creation_param.CONTRACT_HEADER_ID);
			formData.append("TRANS_TYPE"			, transType);
			formData.append("STATUS"				, getStatus(false));
			formData.append("PROJECT_NO"			, $('#txtDlgDesmContractCreationProjectNo').val());
			formData.append("ORDER_SEQ" 			, $('#txtDlgDesmOnshoreOrderCreationOrderSeq').val());
			formData.append("ORDER_NAME"			, $('#txtDlgDesmOnshoreOrderCreationOrderName').val());
			formData.append("ORDER_DATE" 			, $('#txtDlgDesmOnshoreOrderCreationOrderDate').val());
			formData.append("ORDER_STATUS" 			, $('#txtDlgDesmOnshoreOrderCreationOrderStatus option:selected').val());
			formData.append("PLAN_DATE_FROM" 		, $('#txtDlgDesmOnshoreOrderPlanDateFrom').val());
			formData.append("PLAN_DATE_TO" 			, $('#txtDlgDesmOnshoreOrderPlanDateTo').val());
			formData.append("INVOICE_NO"			, $('#txtDlgDesmOnshoreOrderCreationInvoiceNo').val());
			formData.append("DESCRIPTION" 			, $('#txtDlgDesmOnshoreOrderCreationDescription').val());
			formData.append("REMARKS"				, $('#txtDlgDesmOnshoreOrderCreationRemarks').val());
			formData.append("REQUESTED_BY"			, $('#txtDlgDesmOnshoreOrderCreationRequestByAd').val());
			formData.append("APPROVED_BY"			, (transType == 'Pre-Approved') ? $('#txtDlgDesmOnshoreOrderCreationTransUserId').val() : $('#txtDlgDesmOnshoreOrderCreationApproveByAd').val());

			formData.append("ATTACH_GRP_CD"			, v_desm_onshore_order_creation_param.ATTACH_GRP_CD);

			formData.append("updateList"			, JSON.stringify(updateList));
			
//			for(let key of formData.keys()) {
//				console.log(key, ':', formData.get(key));
//			}
//			return;

			$.ajax({			
				url: "/saveDesmOnshoreOrderCreate.do",
				data: formData,
				processData: false,
				contentType: false,			
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						switch(result.error) {
						case '-1' 	: alert_fail($('#alertSaveAlreadyData').val()); break;
						case '-2' 	: alert_fail($('#alertFileCheckEx').val()); break;
						case '-3' 	: alert_fail($('#alertPhotoFileCheckEx').val()); break;
						case '-4' 	: alert_fail($('#alertMailFail').val()); break;
						default		: alert_fail(result.error);
						}
					} else {
						v_desm_onshore_order_creation_param.ORDER_HEADER_ID = result.ORDER_HEADER_ID;
						v_desm_onshore_order_creation_param.STATUS = result.STATUS;

//						if(transType == "Incomplete") {
//							alert_success($('#alertSuccess').val());
//							if(v_desm_onshore_order_creation_callback) {
//								v_desm_onshore_order_creation_callback("save-item", null);
//							}
//							$('#dlgDesmOnshoreOrderCreation').modal('hide');
//						}
//						else {
//							sendMail($('#alertSuccess').val(), transType);
//						}

						if(v_desm_onshore_order_creation_callback) {
							v_desm_onshore_order_creation_callback("save-item", null);
						}
						$('#dlgDesmOnshoreOrderCreation').modal('hide');
					}
				}
			});	
		}
	});
}

function sendMail(msg, transType) {
	var paramData = {
		"ORDER_HEADER_ID" : v_desm_onshore_order_creation_param.ORDER_HEADER_ID
		,"ORDER_STATUS" : v_desm_onshore_order_creation_param.ORDER_STATUS
		,"TRANS_TYPE": transType
	};
	
	$.ajax({
		url: "/sendMailDesmOnshoreOrder.do",
		data: paramData,
		success: function(result, textStatus, jqXHR) {
			if(result.error != null) {
				alert_fail(result.error);
			}
			else {
				if(result.error_code != null && result.error_code == "-2") {
					alert_fail($('#alertMailFail').val());
				}
				else {
					alert_success(msg);
				}
				if(v_desm_onshore_order_creation_callback) {
					v_desm_onshore_order_creation_callback("save-item", null);
				}
			}
		},
		complete: function() {
			$('#dlgDesmOnshoreOrderCreation').modal('hide');
		}
	});
}

function ExcelDateToJSDate(date) {

	if (date == null || date == "")
		return "";
	else if (typeof(date) == "string")
		return date;
	else
	{
		var jsDate = new Date(date);
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '/' + month + '/' + day;
	}
}

function btnDlgDesmOnshoreOrderCreationResetClick() {

	$('#txtDlgDesmOnshoreOrderCreationPackageNo').val("");
	$('#txtDlgDesmOnshoreOrderCreationRsiNo').val("");
	$('#txtDlgDesmOnshoreOrderCreationMaterialCode').val("");
	$('#txtDlgDesmOnshoreOrderCreationStartRequestDate').val("");
	$('#txtDlgDesmOnshoreOrderCreationEndRequestDate').val("");
	$('#selDlgDesmOnshoreOrderCreationAttribute10').val("");


	$('#txtDlgDesmOnshoreOrderCreationDescription').val("");
	$('#txtDlgDesmOnshoreOrderCreationDrawingNo').val("");
	$('#txtDlgDesmOnshoreOrderCreationTagNo').val("");
	$('#txtDlgDesmOnshoreOrderCreationRsiName').val("");

	$('#selDlgDesmOnshoreOrderCreationType').val("");
	$('#txtDlgDesmOnshoreOrderCreationCategory').val("");

}

var fileUse = true;
var imgFileIdx = 0;
var fileList = [];	

function imgBtnShow(id) {
	var eId = "#" + id;
	$(eId).show();
}

function imgBtnHide(id) {
	var eId = "#" + id;
	$(eId).hide();
	
}

function deletePhoto(idx) {
	var selectRow;
	var rowIdx;
	for(var i = 0; i < fileList.length; i++) {
		resultRow = fileList[i];
		if(resultRow.IDX == idx) {
			selectRow = resultRow;
			rowIdx = i;
		}	
	}	
	
	if(selectRow.SAVE_YN == "N") {
		fileList.splice(rowIdx, 1);
		alert_success($('#alertDeleteSuccess').val());
		setDlgDesmOnshoreOrderCreationPhotoAtt();			
		
		return;
	}	
	
}

function dlgDesmOnshoreOrderCreationPhotoPreview(idx) {
//	var param = {"fileList" : fileList, "idx" : idx};
//	
//	$('#dlgDesmOnshoreOrderCreationPopUp').load("/desmOnshoreOrderCreationPhotoPreviewPopUp.do",null,function(data, status, xhr) {
//		if(status == "success"){
//			
//			initDesmOnshoreOrderCreationPhotoPreviewPopUp(param, function (key, returnParam) {
//
//			});	
//			
//		}
//	});	
}

function txtDlgDesmOnshoreOrderCreationPhotoAttListFileChange() {
	var files = document.getElementById('txtDlgDesmOnshoreOrderCreationPhotoAttListFile').files;
	
	if(files.length == 0){
		return;
	}
	
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];
		var elId = "#imgFileTxt_" + fileRow.IDX;
		fileRow.REM = $(elId).val();		
	}	
	
	getImg(files, 0);
	
}

function getImg (files, fileIdx){
	
	if(files.length == fileIdx) {
		$('#txtDlgDesmOnshoreOrderCreationPhotoAttListFile').val("");
		setDlgDesmOnshoreOrderCreationPhotoAtt();
	}
	else{
		workFileReader(files, fileIdx);
	}
}

function workFileReader (files, fileIdx){
	var file = files[fileIdx];	
	var reader = new FileReader();
	imgFileIdx = imgFileIdx + 1;
    reader.onload = e => {
         var fileRow = {"IDX" : imgFileIdx, "FILE_NAME" : file.name, "SRC" : e.target.result, "SAVE_YN" : "N", "FILE" : file};
         fileList.push(fileRow);
         
         getImg (files, fileIdx + 1);
    }
    reader.readAsDataURL(file);
}

function getfileSaveCnt(){
	var cnt = 0;
	for(var i = 0; i < fileList.length; i++) {
		var resultRow = fileList[i];
		if(resultRow.SAVE_YN == "Y") {
			cnt = cnt + 1;
		}	
	}
	return cnt;
}

function setDlgDesmOnshoreOrderCreationPhotoAtt(){
	var imgColMaxCnt = 3;
	var cnt = fileList.length;
	var btnDelFlag = true;
	var fileMsg = $('#fileSelectText').val();
	var fileSaveCnt = getfileSaveCnt();
	var readonly = "";
	
	if(fileSaveCnt == cnt) {
		btnDelFlag = false;
		fileMsg = $('#fileAttachedText').val();
	}

	if($('#txtDlgDesmOnshoreOrderCreationStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmOnshoreOrderCreationStatus').val() == "Confirmed") {
		readonly = "readonly";
	}

	if(!fileUse) {
		$('#divDlgDesmOnshoreOrderCreationPhotoAttListBtn .input-group-btn').css("display", "none");
	}	
		
	if(cnt == 0){
		var html = '<div class="col-sm-12 file-drop-zone-title">' + $('#fileSelectDragText').val() + '</div>';
		$('#divDlgDesmOnshoreOrderCreationPhotoAttListBox').html(html);
		$('#btnDlgDesmOnshoreOrderCreationPhotoAttListDelete').hide();
		$('#divDlgDesmOnshoreOrderCreationPhotoAttListIcon').removeClass("icon-visible");
		$('#txtDlgDesmOnshoreOrderCreationPhotoAttListInfo').val("");
		return;
	}
	else {
		if(btnDelFlag) {
			$('#btnDlgDesmOnshoreOrderCreationPhotoAttListDelete').show();	
		}
		else {
			$('#btnDlgDesmOnshoreOrderCreationPhotoAttListDelete').hide();
		}
		$('#divDlgDesmOnshoreOrderCreationPhotoAttListIcon').addClass("icon-visible");
		$('#txtDlgDesmOnshoreOrderCreationPhotoAttListInfo').val(cnt + " " + fileMsg);
	}
	

	
	var imgRowCnt = parseInt(cnt / imgColMaxCnt);
	var imgRowAddCnt = cnt % imgColMaxCnt;
	
	if(imgRowAddCnt > 0){
		imgRowCnt = imgRowCnt + 1;
	}
	
	var imgColCnt = 1;
	var html = '';
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];	
		var rem = fileRow.REM == null ? "" : fileRow.REM;
		
		
		if(imgColCnt > imgColMaxCnt) {
			imgColCnt = 1;
		}
		
		if(imgColCnt == 1) {
			html += '<div class="file-preview-thumbnails clearfix hide-content" >';
		}
		
		html += '	<div class="file-preview-frame krajee-default  kv-preview-thumb" style="width:20.8%; height:160px" onmouseover="imgBtnShow(\'' + "footerBtn" + fileRow.IDX + '\')" onmouseout="imgBtnHide(\'' + "footerBtn" + fileRow.IDX + '\')">';
		html += '		<div style="width:100%; height:200px">';
		html += '			<img src="' + fileRow.SRC + '" class="file-preview-image kv-preview-data file-zoom-detail" style="width:auto;height:auto;max-width:100%;max-height:100%;" >';
		html += '		</div>';
		html += '	  	<div style="width:100%;padding-top: 4px;">';
		html += '	  		<div ><textarea id="imgFileTxt_' + fileRow.IDX  + '" type="text" class="form-control form-control-user " style="font-size:11px;line-height:1.5;resize:none" rows="3" autocomplete=off ' + readonly + ' >' + rem + '</textarea></div>';
		
		html += '	  		<div id="footerBtn' + fileRow.IDX  + '" class="file-footer-buttons" style="width:100%;margin-top:-150px; margin-right: 4px; position: relative;display:none">';
		if(fileRow.SAVE_YN == "Y") {
			
			html += '	  			<a class="kv-file-download btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" download="' + fileRow.FILE_NAME + '" href="/getTransAttachDownload.do?code=' + fileRow.ID +'" target="_blank">';
			html += '	  				<i class="fas fa-download"></i>';
			html += '	  			</a>';				
	
		}	
		
		if(fileUse) {
			html += '	  			<button type="button" class="kv-file-remove btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" style="margin-left:3px" onclick="deletePhoto(\'' + fileRow.IDX + '\')">';
			html += '	  				<i class="fas fa-trash-alt"></i>';
			html += '	  			</button>';			
		}			
		
		html += '	  			<button type="button" class="kv-file-zoom btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" style="margin-left:3px" onclick="dlgDesmOnshoreOrderCreationPhotoPreview(\'' + fileRow.IDX + '\')">';
		html += '	  				<i class="fas fa-search-plus"></i>';
		html += '	  			</button>';
		html += '	  		</div>'; 																		
		html += '	  	</div>';
		html += '	</div>';								
		
		if(imgColCnt == imgColMaxCnt || fileList.length == i + 1) {
			html += '</div>';
		}
		
		imgColCnt += 1;	
		
	}
	
	
	$('#divDlgDesmOnshoreOrderCreationPhotoAttListBox').html(html);

		
}

function divDlgDesmOnshoreOrderCreationPhotoAttListBoxDrop(e) {
	var files = e.originalEvent.dataTransfer.files;
	
	if(files.length == 0){
		return;
	}
	
	
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];
		var elId = "#imgFileTxt_" + fileRow.IDX;
		fileRow.REM = $(elId).val();		
	}		
	
	getImg(files, 0);
}

function btnDlgDesmOnshoreOrderCreationPhotoAttListDeleteClick() {
	for(var i = fileList.length - 1; i >= 0; i--) {
		var fileRow = fileList[i];
		if(fileRow.SAVE_YN == "N") {
			fileList.splice(i, 1);
		}
	}
	
	setDlgDesmOnshoreOrderCreationPhotoAtt();
}

function formatDate(d){
	if(d == null || d == ""){return "";}
	if(d.length == 8) { return '20' + d; }
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}

function chkDate(m){
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}

	return month;
}


function btnDlgDesmOnshoreOrderCreationFileClick() {

	var param = Object.assign({}, v_desm_onshore_order_creation_param);


	if(param.ATTACH_GRP_CD == null) {
		param.ATTACH_GRP_CD = "";
	}

	if(param.ORDER_HEADER_ID == null) {
		param.ORDER_HEADER_ID = "";
	}

	param.fileUse = true;
	if(param.STATUS == "Pre-Confirmed" || param.STATUS == "Confirmed") {
		param.fileUse = false;
	}

	$('#dlgDesmOnshoreOrderCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {

				v_desm_onshore_order_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
				if(returnParam.ORDER_HEADER_ID == null || returnParam.ORDER_HEADER_ID == ""){
				}
				else {
					if(v_desm_onshore_order_creation_callback)
					{
						v_desm_onshore_order_creation_callback("save-item", null);
					}
				}

			});
		}
	});
}


function setTransAttListPopUpData(ATTACH_GRP_CD) {

	$.ajax({
		//url: "/getTransShippingRequestDlgAttList.do", // AttachController 분리
		url: "/attach/getAttachList.do",
		data: {"FILE_GRP_CD" : ATTACH_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			$('#txtDlgDesmOnshoreOrderCreationAttListFile').fileinput("destroy");
			$('#txtDlgDesmOnshoreOrderCreationAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgDesmOnshoreOrderCreationAttListFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});

				if(!fileUse) {
					$('#dlgAttList .input-group-btn').css("display", "none");
					$('#dlgAttList .kv-file-remove').css("display", "none");
				}

				return;
			}

			var fileUrl = new Array;
			var fileInfo = new Array;

			$.each(list, function (index, entry) {
				// AttachController 분리
				/*var url = location.protocol+"//"+location.host+"/getTransAttachDownload.do?code=" + entry.ID;
				var url_pv = location.protocol+"//"+location.host+"/getTransAttachPreview.do?code=" + entry.ID;*/
				var url = location.protocol+"//"+location.host+"/attach/getAttachDownload.do?code=" + entry.ID;
				var url_pv = location.protocol+"//"+location.host+"/attach/getAttachPreview.do?code=" + entry.ID;

				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});


			$('#txtDlgDesmOnshoreOrderCreationAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				//deleteUrl: "/deleteTransShippingRequestDlgAttList.do", // AttachController 분리
				deleteUrl: "/attach/deleteAttachList.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				//var aborted = !window.confirm($('#alertDelete').val());
				//return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				setTransAttListPopUpData(ATTACH_GRP_CD);
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});

        }
    });
}
