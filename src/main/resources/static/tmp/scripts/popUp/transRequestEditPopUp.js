var dlgEditMailGrid;
var dlgEditPackingDetailGrid;

var mstDataPrevData = {};
var packingDetailListPrevData = [];
var mailListPrevData = [];
var insertRow = {"REQ_MASTER_ID" : "", "SHIPPING_REQ_NO" : "", "REVISION_NUM" : "", "STATUS" : "", "DOCUMENT_GRP_ID" : "", "ORDER_MASTER_ID" : "", "VOYAGE_YN" : ""};

var v_request_edit_callback = null;
var v_request_edit_param;

function initRequestEditPopUp(param , callback) {
	v_request_edit_callback = callback;
    v_request_edit_param = param;
    
    if(param.modalTtile != null){
    	$('#dlgEditTitle').text(param.modalTtile);
    }
    
    initRequestEditPopUpCode();    
}

function initRequestEditPopUpCode() {	
	
	var codeList = [{"CODE" : "C101"},{"CODE" : "C103"},{"CODE" : "C123"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			var	result = setCombo(results.C103, "selDlgEditDeliveryTerms", "sel");
				result = setCombo(results.C101, "selDlgEditDutyRefundOption", "sel");
				result = setCombo(results.C123, "selDlgEditIndeptFlag", "");
			
		 	
			initRequestEditPopUpControls();
        }
    });		
	
	
}


function initRequestEditPopUpControls() {	
	
	var gridCnt = 0;
	var gridCntTotal = 2;
	var gridCreate = true;
	
	$('#dlgEdit').on('shown.bs.modal', function () {
		$('#dlgEdit').click();
	});
	
	$('#dlgEdit').on('hidden.bs.modal', function () {
	  	closeRequestEditPopUp();
	})		

	TGSetEvent("OnRenderFinish","transShippingInvoiceDlgEditMailGrid",function(grid){
			
			gridCnt += 1;
		    if(gridCreate && gridCnt == gridCntTotal){
		    	gridCreate = false;
		    	setRequestEditPopUpData();
		    }
	});	
	
	TGSetEvent("OnRenderFinish","transShippingInvoiceDlgEditPackingDetailGrid",function(grid){
			
			gridCnt += 1;
		    if(gridCreate && gridCnt == gridCntTotal){
		    	gridCreate = false;
		    	setRequestEditPopUpData();
		    }
	});	
	var gridCode = getGridCode();
	var dlgEditMailGridCol = {
		"Cfg" : {
			"id"				: "transShippingInvoiceDlgEditMailGrid"
			, "CfgId"			: "transShippingInvoiceDlgEditMailGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "5"
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
		]
		, "Header" : {
			"EMP_NAME"	: "받는사람"
			, "Class"	: "gridCenterText"
			, "DEPT_NAME"	: "담당부서"
		}
	};		
	
	var dlgEditPackingDetailGridCol = {
		"Cfg" : {
			"id"				: "transShippingInvoiceDlgEditPackingDetailGrid"
			, "CfgId"			: "transShippingInvoiceDlgEditPackingDetailGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "5"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "613"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle"	: "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
			, "ConstHeight"		: "1"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Panel" : {
			"Visible" : "0"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" :[{ "Name": "NUM", "Width": "70", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"  }, 
					{ "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  }, 
	      			{ "Name": "DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "PACKING_TYPE", "Width": "110", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "SHIPPING_DIMENSION_L", "Width": "90", "Type": "Float", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "SHIPPING_DIMENSION_W", "Width": "90", "Type": "Float", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "SHIPPING_DIMENSION_H", "Width": "90", "Type": "Float", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "SHIPPING_VOLUME", "Width": "160", "Type": "Float", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "NET_WEIGHT", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "GROSS_WEIGHT", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "HAZARDOUS_MATERIAL_FLAG", "Width": "160", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
	      			{ "Name": "RT", "Visible" : "0"},
	      			{ "Name": "COUNTRY_OF_ORIGIN", "Visible" : "0" },
	      			{ "Name": "REMARKS", "Visible" : "0" }]
		, "Header" : {"NUM": "No.",
					  "PACKAGE_NO": "Package No.", "Class"	: "gridCenterText",
		   			  "DESCRIPTION": "Description",
		   			  "PACKING_TYPE": "Packing Style",
		   			  "SHIPPING_DIMENSION_L": "Length",
		   			  "SHIPPING_DIMENSION_W": "Width",
		   			  "SHIPPING_DIMENSION_H": "Height",
		   			  "SHIPPING_VOLUME": "Shipping Volume(M3)",
		   			  "NET_WEIGHT": "Net Weight(kg)",
		   			  "GROSS_WEIGHT": "Gross Weight(kg)",
		   			  "HAZARDOUS_MATERIAL_FLAG": "Hazardous Material"}
        ,"Foot" : [
				      { "Calculated": "1", "CanEdit": "0", "SHIPPING_VOLUMEFormula": "sum()", "NET_WEIGHTFormula": "sum()", "GROSS_WEIGHTFormula": "sum()", "Class" : "gridLinkText"   }  
				   ] 
	};		
	
	makeAutocomplete(
		"txtDlgEditProjectId", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgEditProjectDesc",		//clear필드 id
		"/getTransProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgEditProjectId").val(ui.item.value.split("|")[1]);
			$("#txtDlgEditProjectDesc").val(ui.item.value.split("|")[2]);
	
			return false;
		}
	);	
	
	/*
	makeAutocomplete(
		"txtDlgEditVendorName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgEditVendorId",		//clear필드 id
		"/getTransShippingRequestVendor.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {
		
			$("#txtDlgEditVendorId").val(ui.item.value.split("|")[0]);
			$("#txtDlgEditVendorName").val(ui.item.value.split("|")[1]);
	
			return false;
		}
	);*/
	
	/*
	makeAutocomplete(
		"txtDlgEditDeptName", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgEditDeptCode",		//clear필드 id
		"/getTransShippingRequestDept.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {
		
			$("#txtDlgEditDeptCode").val(ui.item.value.split("|")[0]);
			$("#txtDlgEditDeptName").val(ui.item.value.split("|")[1]);
	
			return false;
		}
	);
	*/		
	
	$("#txtDlgEditShopOutDate").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd"
	});	
	
	dlgEditMailGrid = TreeGrid( {Layout:{Data : dlgEditMailGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgEditMail" );	
	dlgEditPackingDetailGrid = TreeGrid( {Layout:{Data : dlgEditPackingDetailGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgEditPackingDetail" );
	

	
	$('#btnDlgEditExcelDownload').click(function () { btnDlgEditExcelDownloadClick(); return false; });
	$('#btnDlgEditEdit').click(function () { btnDlgEditEditClick(); return false; });
	$('#btnDlgEditFile').click(function () { btnDlgEditFileClick(); return false; });
	$('#btnDlgEditMailAdd').click(function () { btnDlgEditMailAddClick(); return false; });
	$('#btnDlgEditMailDelete').click(function () { btnDlgEditMailDeleteClick(); return false; });
	$('#btnDlgEditComplete').click(function () { btnDlgEditCompleteClick(); return false; });
	$('#btnDlgEditDelete').click(function () { btnDlgEditDeleteClick(); return false; });
	$('#btnDlgEditExcelUpload').click(function () { btnDlgEditExcelUploadClick(); return false; });
	$('#btnDlgEditSave').click(function () { btnDlgEditSaveClick(); return false; });
	$('#selDlgEditIndeptFlag').change(function () { selDlgEditIndeptFlagChange(); return false; });
	$('#selDlgEditDeliveryTerms').change(function () { selDlgEditDeliveryTermsChange(); return false; });
	
	$('#iconNameSearch').click(function () { iconNameSearchClick(); return false; });
	
	
	
	var list = v_request_edit_param.menuAuthList
	if(list != null) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];
			
			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();				
			}
		}	
	}	
	
}

function iconNameSearchClick(){
	var selDlgEditIndeptFlag = $("#selDlgEditIndeptFlag").val();
	
	if(selDlgEditIndeptFlag == "N"){
	
		var param = { "VENDOR_NAME" : $("#txtDlgEditVendorName").val()};	
		
		$('#dlgEditPopUp').load("/transVendorPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransVendorPopUp(param, function (key, returnParam) {
					
					if(key == "select-item"){
						$("#txtDlgEditVendorId").val(returnParam.VENDOR_CODE);
						$("#txtDlgEditVendorName").val(returnParam.VENDOR_NAME);					
					}
	
				});
				
			}
		});
	}
	else if(selDlgEditIndeptFlag == "Y"){
		var param = { };	
		
		$('#dlgEditPopUp').load("/transDeptUsrPopUp.do",null,function(data, status, xhr) {
			
			if(status == "success"){
					
				initTransDeptUsrPopUp(param, function (key, returnParam) {
					
					if(key == "select-item"){
						$("#txtDlgEditDeptCode").val(returnParam.DEPT_CODE);
						$("#txtDlgEditDeptName").val(returnParam.DEPT_NAME);					
					}
	
				});
				
			}
		});	
	} 
}

function closeRequestEditPopUp() {
	dlgEditMailGrid.Dispose();
	dlgEditPackingDetailGrid.Dispose();	
}

function setdlgEditDisableControls(type){
	if(type){
		$("#txtDlgEditSender").removeAttr("readonly");
		$("#txtDlgEditEmail").removeAttr("readonly");
		$("#txtDlgEditTtile").removeAttr("readonly");
		$("#txtDlgEditContent").removeAttr("readonly");
		$("#txtDlgEditProjectId").removeAttr("readonly");
		$("#txtDlgEditInvoiceNo").removeAttr("readonly");
		$("#txtDlgEditDescription").removeAttr("readonly");
		$("#selDlgEditDeliveryTerms").removeAttr("disabled");
		$("#txtDlgEditShopOutDate").removeAttr("readonly");
		$("#txtDlgEditHscode").removeAttr("readonly");
		$("#selDlgEditDutyRefundOption").removeAttr("disabled");
		$("#selDlgEditIndeptFlag").removeAttr("disabled");
		$("#txtDlgEditVendorName").removeAttr("readonly");
		$("#txtDlgEditDeptName").removeAttr("readonly");
		$("#chkDlgEditDangerFlag").removeAttr("disabled");
		$("#chkDlgEditAttribute1").removeAttr("disabled");
		$("#txtDlgEditContactPoint").removeAttr("readonly");	
		
		$('#btnDlgEditExcelUpload').show();
		$('#btnDlgEditMailDelete').show();
		$('#btnDlgEditMailAdd').show();						
	}
	else {
		$("#txtDlgEditSender").attr("readonly", true);
		$("#txtDlgEditEmail").attr("readonly", true);
		$("#txtDlgEditTtile").attr("readonly", true);
		$("#txtDlgEditContent").attr("readonly", true);
		$("#txtDlgEditProjectId").attr("readonly", true);
		$("#txtDlgEditInvoiceNo").attr("readonly", true);
		$("#txtDlgEditDescription").attr("readonly", true);
		$("#selDlgEditDeliveryTerms").attr("disabled", true);
		$("#txtDlgEditShopOutDate").attr("readonly", true);
		$("#txtDlgEditHscode").attr("readonly", true);
		$("#selDlgEditDutyRefundOption").attr("disabled", true);
		$("#selDlgEditIndeptFlag").attr("disabled", true);
		$("#txtDlgEditVendorName").attr("readonly", true);
		$("#txtDlgEditDeptName").attr("readonly", true);
		$("#chkDlgEditDangerFlag").attr("disabled", true);
		$("#chkDlgEditAttribute1").attr("disabled", true);
		$("#txtDlgEditContactPoint").attr("readonly", true);
		
		$('#btnDlgEditExcelUpload').hide();
		$('#btnDlgEditMailDelete').hide();
		$('#btnDlgEditMailAdd').hide();								
	}
}

function setRequestEditPopUpData() {
	
	$('#btnDlgEditEditText').text("수정");
	
	if(v_request_edit_param.modalType == "create") {
		$('#txtDlgEditSender').val("");
		$('#txtDlgEditEmail').val("");
		$('#txtDlgEditTtile').val("");
		$('#txtDlgEditContent').val("");
		$('#txtDlgEditProjectId').val("");
		$('#txtDlgEditProjectDesc').val("");
		$('#txtDlgEditInvoiceNo').val("");
		$('#txtDlgEditDescription').val("");
		$('#selDlgEditDeliveryTerms').val("");
		$('#txtDlgEditShopOutDate').val("");
		$('#txtDlgEditHscode').val("");
		$('#selDlgEditDutyRefundOption').val("");
		$('#selDlgEditIndeptFlag').val("N");
		$('#txtDlgEditDeptName').val("");
		$('#txtDlgEditDeptCode').val("");
		$('#txtDlgEditVendorName').val("");
		$('#txtDlgEditVendorId').val("");
		$('#chkDlgEditDangerFlag').prop("checked",false);
		$('#chkDlgEditAttribute1').prop("checked",false);
		$('#txtDlgEditContactPoint').val("");
		
		$('#txtDlgEditDeptName').hide();
		$('#txtDlgEditVendorName').show();
		
		$("#editModalDeptName").removeClass("required");
		$("#txtDlgEditDeptCode").removeClass("required");
		$("#txtDlgEditVendorName").removeClass("required");
		$("#txtDlgEditVendorId").removeClass("required");
		
		$("#txtDlgEditVendorName").addClass("required");
		$("#txtDlgEditVendorId").addClass("required");	
		
		dlgEditMailGrid.Source.Data.Data.Body = [[]];
		dlgEditMailGrid.ReloadBody();
	
		dlgEditPackingDetailGrid.Source.Data.Data.Body = [[]];
		dlgEditPackingDetailGrid.ReloadBody();				
	}
	else {
		$('#txtDlgEditSender').val("");
		$('#txtDlgEditEmail').val("");
		$('#txtDlgEditTtile').val(v_request_edit_param.TITLE);
		$('#txtDlgEditContent').val(v_request_edit_param.CONTENT);
		$('#txtDlgEditProjectId').val(v_request_edit_param.PROJECT_ID);
		$('#txtDlgEditProjectDesc').val(v_request_edit_param.PROJECT_DESC);
		$('#txtDlgEditInvoiceNo').val(v_request_edit_param.INVOICE_NO);
		$('#txtDlgEditDescription').val(v_request_edit_param.DESCRIPTION);
		$('#selDlgEditDeliveryTerms').val(v_request_edit_param.DELIVERY_TERMS);
		$('#txtDlgEditShopOutDate').val(v_request_edit_param.SHOP_OUT_DATE);
		$('#txtDlgEditHscode').val(v_request_edit_param.HSCODE);
		$('#selDlgEditDutyRefundOption').val(v_request_edit_param.DUTY_REFUND_OPTION);
		$('#selDlgEditIndeptFlag').val(v_request_edit_param.INDEPT_FLAG);
		$('#txtDlgEditContactPoint').val(v_request_edit_param.CONTACT_POINT);
		
		if(v_request_edit_param.DANGER_FLAG == "1"){
			$('#chkDlgEditDangerFlag').prop("checked",true);
		}
		else {
			$('#chkDlgEditDangerFlag').prop("checked",false);
		}
		
		if(v_request_edit_param.ATTRIBUTE1 == "1"){
			$('#chkDlgEditAttribute1').prop("checked",true);
		}
		else {
			$('#chkDlgEditAttribute1').prop("checked",false);
		}		
		
		$("#editModalDeptName").removeClass("required");
		$("#txtDlgEditDeptCode").removeClass("required");
		$("#txtDlgEditVendorName").removeClass("required");
		$("#txtDlgEditVendorId").removeClass("required");		
		
		
		if(v_request_edit_param.INDEPT_FLAG == "N") {
			$('#txtDlgEditVendorName').val(v_request_edit_param.VENDOR_NAME);
			$('#txtDlgEditVendorId').val(v_request_edit_param.VENDOR_ID);
			$('#txtDlgEditVendorName').show();
			$("#txtDlgEditVendorName").addClass("required");
			$("#txtDlgEditVendorId").addClass("required");
			
			$('#txtDlgEditDeptName').val("");
			$('#txtDlgEditDeptCode').val("");
			$('#txtDlgEditDeptName').hide();							
		}
		else {
			$('#txtDlgEditVendorName').val("");
			$('#txtDlgEditVendorId').val("");
			$('#txtDlgEditVendorName').hide();
			
			$('#txtDlgEditDeptName').val(v_request_edit_param.DEPT_NM);
			$('#txtDlgEditDeptCode').val(v_request_edit_param.DEPT_ID);
			$('#txtDlgEditDeptName').show();	
			$("#txtDlgEditDeptName").addClass("required");
			$("#txtDlgEditDeptCode").addClass("required");				
		}	
	}	
	
	var isNew = false;
	var isInComplete = false;
	var isPreApproved = false;
	var isPreApprovedAuth = false;
	var isAuth = false;
	var roleCd = $('#txtRoleCd').val();
	var usrCls = $('#txtUsrCls').val();
	
	
	if(v_request_edit_param.modalType == "create"){
		isNew = true;
	}
	else {
		isInComplete = v_request_edit_param.STATUS == "임시저장" ? true : false;
		isPreApproved = v_request_edit_param.STATUS == "출하검토중" && (roleCd === 'P300' || roleCd === 'V500') ? true : false;
		isPreApprovedAuth = v_request_edit_param.STATUS == "출하검토중" && (roleCd === 'P100' || roleCd === 'S100' || roleCd === 'A100') ? true : false;
		isAuth = roleCd === 'P100' || roleCd === 'S100' || roleCd === 'A100' ? true : false;
	}
	
	setdlgEditDisableControls(true);
	
	var btnEditHidden = false;
	if(isNew) {
		$('#btnDlgEditSave').show();
		$('#btnDlgEditEdit').hide();
		$('#btnDlgEditComplete').show();
		$('#btnDlgEditReject').hide();
		$('#btnDlgEditFile').show();
		$('#btnDlgEditDelete').hide();

		
		btnEditHidden = true;
		insertRow.REQ_MASTER_ID = "";
		insertRow.SHIPPING_REQ_NO = "";		
		insertRow.REVISION_NUM = "0";
		insertRow.STATUS = "임시저장";
		insertRow.DOCUMENT_GRP_ID = "";
		insertRow.ORDER_MASTER_ID = "";
		insertRow.VOYAGE_YN = "";
	}
	else if(isInComplete) {
		$('#btnDlgEditSave').show();
		$('#btnDlgEditEdit').hide();
		$('#btnDlgEditComplete').show();
		$('#btnDlgEditReject').hide();
		$('#btnDlgEditFile').show();
		$('#btnDlgEditDelete').show();

		
		btnEditHidden = true;
		
		insertRow.REQ_MASTER_ID = v_request_edit_param.REQ_MASTER_ID;
		insertRow.SHIPPING_REQ_NO = v_request_edit_param.SHIPPING_REQ_NO;
		insertRow.REVISION_NUM = "0";
		insertRow.STATUS = "임시저장";
		insertRow.DOCUMENT_GRP_ID = v_request_edit_param.DOCUMENT_GRP_ID;
		insertRow.ORDER_MASTER_ID = v_request_edit_param.ORDER_MASTER_ID;
		insertRow.VOYAGE_YN = v_request_edit_param.VOYAGE_YN;
		
		searchDlgEditMailList();
		searchDlgEditPackingDetailList();			
	}
	else if(isPreApproved) {
		$('#btnDlgEditSave').hide();
		$('#btnDlgEditEdit').hide();
		$('#btnDlgEditComplete').hide();
		$('#btnDlgEditReject').hide();
		$('#btnDlgEditFile').show();
		$('#btnDlgEditDelete').hide();
	
		
		btnEditHidden = true;
		insertRow.REQ_MASTER_ID = v_request_edit_param.REQ_MASTER_ID;
		insertRow.SHIPPING_REQ_NO = v_request_edit_param.SHIPPING_REQ_NO;
		insertRow.REVISION_NUM = v_request_edit_param.REVISION_NUM;	
		insertRow.STATUS = v_request_edit_param.STATUS;
		insertRow.DOCUMENT_GRP_ID = v_request_edit_param.DOCUMENT_GRP_ID;
		insertRow.ORDER_MASTER_ID = v_request_edit_param.ORDER_MASTER_ID;
		insertRow.VOYAGE_YN = v_request_edit_param.VOYAGE_YN;
		
		searchDlgEditMailList();
		searchDlgEditPackingDetailList();
		
		setdlgEditDisableControls(false);
		
	
	}
	else if(isPreApprovedAuth) {
		$('#btnDlgEditSave').hide();
		$('#btnDlgEditEdit').hide();
		$('#btnDlgEditComplete').show();
		$('#btnDlgEditReject').show();
		$('#btnDlgEditFile').show();
		$('#btnDlgEditDelete').show();

		btnEditHidden = true;
		insertRow.REQ_MASTER_ID = v_request_edit_param.REQ_MASTER_ID;
		insertRow.SHIPPING_REQ_NO = v_request_edit_param.SHIPPING_REQ_NO;
		insertRow.REVISION_NUM = v_request_edit_param.REVISION_NUM;	
		insertRow.STATUS = v_request_edit_param.STATUS;	
		insertRow.DOCUMENT_GRP_ID = v_request_edit_param.DOCUMENT_GRP_ID;	
		insertRow.ORDER_MASTER_ID = v_request_edit_param.ORDER_MASTER_ID;
		insertRow.VOYAGE_YN = v_request_edit_param.VOYAGE_YN;
		
		searchDlgEditMailList();
		searchDlgEditPackingDetailList();
		
	}
	else {
		$('#btnDlgEditSave').hide();
		$('#btnDlgEditEdit').show();
		$('#btnDlgEditComplete').hide();
		$('#btnDlgEditReject').hide();
		$('#btnDlgEditFile').show();
		$('#btnDlgEditDelete').show();
	
		
		insertRow.REQ_MASTER_ID = v_request_edit_param.REQ_MASTER_ID;
		insertRow.SHIPPING_REQ_NO = v_request_edit_param.SHIPPING_REQ_NO;
		insertRow.REVISION_NUM = v_request_edit_param.REVISION_NUM;		
		insertRow.STATUS = v_request_edit_param.STATUS;	
		insertRow.DOCUMENT_GRP_ID = v_request_edit_param.DOCUMENT_GRP_ID;
		insertRow.ORDER_MASTER_ID = v_request_edit_param.ORDER_MASTER_ID;
		insertRow.VOYAGE_YN = v_request_edit_param.VOYAGE_YN;
		
		searchDlgEditMailList();
		searchDlgEditPackingDetailList();
		
		setdlgEditDisableControls(false);	
	}	
	
	if(usrCls == "S"){
		$('#selDlgEditIndeptFlag').val("N");
		$('#txtDlgEditDeptName').hide();
		$('#txtDlgEditVendorName').show();
		
		$("#editModalDeptName").removeClass("required");
		$("#txtDlgEditDeptCode").removeClass("required");
		$("#txtDlgEditVendorName").removeClass("required");
		$("#txtDlgEditVendorId").removeClass("required");
		
		$("#txtDlgEditVendorName").addClass("required");
		$("#txtDlgEditVendorId").addClass("required");					
	}
	
	if(usrCls == "B" && btnEditHidden) {
		$('#txtDlgEditSender').val($('#txtUserName').val());
		$('#txtDlgEditEmail').val($('#txtEmail').val());
	}	

}


function searchDlgEditMailList() {
	$.ajax({
		url: "/getTransShippingRequestDlgEditMailList.do",		
		data: {"REQ_MASTER_ID" : insertRow.REQ_MASTER_ID},
		success: function (data, textStatus, jqXHR) {
			dlgEditMailGrid.Source.Data.Data.Body = [data.results];
			dlgEditMailGrid.ReloadBody();
        }
    });	
}

function searchDlgEditPackingDetailList() {
	$.ajax({
		url: "/getTransShippingRequestDlgEditPackingDetailList.do",		
		data: {"REQ_MASTER_ID" : insertRow.REQ_MASTER_ID},
		success: function (data, textStatus, jqXHR) {
			dlgEditPackingDetailGrid.Source.Data.Data.Body = [data.results];
			dlgEditPackingDetailGrid.ReloadBody();
        }
    });	
}

function btnDlgEditExcelDownloadClick() {

		dlgEditPackingDetailGrid.ExportFormat="xlsx";
		 
		dlgEditPackingDetailGrid.ActionExport();
		
		$(".TMMenuMain").hide();
		$(".TMMenuShadow").hide();
		$(".GridDisabled").hide();
		$("button[id^='TGMenuOk']").click();
}

function btnDlgEditEditClick(){
	var btnText = $('#btnDlgEditEditText').text();
	var role_cd = $('#txtRoleCd').val();
	var isRevised = (btnText === '수정취소') ? true : false;
	var isAuth = (role_cd === 'P100' || role_cd === 'S100' || role_cd === 'A100') ? true : false;
	
	if(!isRevised) {
		confirm_modal("알람", $('#alertEdit').val(), null, function (callobj, result) {
			if(result) {	
				$('#btnDlgEditEditText').text("수정취소");
				$('#btnDlgEditComplete').show();
				setdlgEditDisableControls(true);
	    		
	    		// 항차가 생성되어 있거나, 운송담당자가 아닐 경우에는 InvoiceNo필드를 수정 시에 변경이 불가하도록 수정
	    		if(insertRow.VOYAGE_YN === 'Y' || role_cd === 'P300' || role_cd === 'V500') {
	    			$("#txtDlgEditInvoiceNo").attr("readonly", true);
	    		}
	    		
				var v_danger_flag = "N";
				if($('#chkDlgEditDangerFlag').is(":checked")) {
					v_danger_flag = "Y";
				}
				
				var v_attribute1 = "N";
				if($('#chkDlgEditAttribute1').is(":checked")) {
					v_attribute1 = "Y";
				}			
							
	    		mstDataPrevData = {"REQ_MASTER_ID" : insertRow.REQ_MASTER_ID, "SHIPPING_REQ_NO" : insertRow.SHIPPING_REQ_NO, "DEPT_ID" : $('#txtDlgEditDeptCode').val(), 
								  "INVOICE_NO" : $('#txtDlgEditInvoiceNo').val(), "DESCRIPTION" : $('#txtDlgEditDescription').val(), "DEPT_NM" : $('#txtDlgEditDeptName').val(),
								  "DELIVERY_TERMS" : $('#selDlgEditDeliveryTerms').val(), "SHOP_OUT_DATE" : $('#txtDlgEditShopOutDate').val(), 
			 					  "VENDOR_ID" : $('#txtDlgEditVendorId').val(), "DUTY_REFUND_OPTION" : $('#selDlgEditDutyRefundOption').val(),
			 					  "PROJECT_ID" : $('#txtDlgEditProjectId').val(), "HSCODE" : $('#txtDlgEditHscode').val(), "PROJECT_DESC" : $('#txtDlgEditProjectDesc').val(),
			 					  "DANGER_FLAG" : v_danger_flag, "ATTRIBUTE1" : v_attribute1, "INDEPT_FLAG" : $('#selDlgEditIndeptFlag').val(), "VENDOR_NAME" : $('#txtDlgEditVendorName').val(),
			 					  "REVISION_NUM" : insertRow.REVISION_NUM, "STATUS" : insertRow.STATUS, "TITLE" : $('#txtDlgEditTtile').val(),
			 					  "CONTENT" : $('#txtDlgEditContent').val(), "CONTACT_POINT" : $('#txtDlgEditContactPoint').val(), "DOCUMENT_GRP_ID" : insertRow.DOCUMENT_GRP_ID,
			 					  "ORDER_MASTER_ID" : insertRow.ORDER_MASTER_ID, "VOYAGE_YN" : insertRow.VOYAGE_YN};
	    		
	    		packingDetailListPrevData = [];	
				for (var key in dlgEditPackingDetailGrid.Rows) {
					
					var gridRow = dlgEditPackingDetailGrid.Rows[key];
					
					if(gridRow.Fixed == null){
						var row = setDlgEditPackingDetailGridRow(gridRow);					   		  	
					  	packingDetailListPrevData.push(row);			
					}
				}
				
				mailListPrevData = []; 	
				for (var key in dlgEditMailGrid.Rows) {
					
					var gridRow = dlgEditMailGrid.Rows[key];
					
					if(gridRow.Fixed == null){
						var row = {"EMP_NAME": gridRow.EMP_NAME,
								  "DEPT_NAME": gridRow.DEPT_NAME};
					   		  	
					  	mailListPrevData.push(row);			
					}
				}
	    		
	    		if($('#txtUsrCls').val() == 'B') {
					$('#txtDlgEditSender').val($('#txtUserName').val());
					$('#txtDlgEditEmail').val($('#txtEmail').val());
				}				
			
			}
		});
	
		/*if (confirm($('#alertEdit').val())) {
	
		}*/		
	} 
	else {
		
		if(mstDataPrevData.DANGER_FLAG == "Y") {
			mstDataPrevData.DANGER_FLAG = "1";
		}
		else {
			mstDataPrevData.DANGER_FLAG = "0";
		}
		
		if(mstDataPrevData.ATTRIBUTE1 == "Y") {
			mstDataPrevData.ATTRIBUTE1 = "1";
		}
		else {
			mstDataPrevData.ATTRIBUTE1 = "0";
		}		
		
		setRequestEditPopUpData();
		
		dlgEditMailGrid.Source.Data.Data.Body = [mailListPrevData];
		dlgEditMailGrid.ReloadBody();		
		
		dlgEditPackingDetailGrid.Source.Data.Data.Body = [packingDetailListPrevData];
		dlgEditPackingDetailGrid.ReloadBody();
	}
}

function btnDlgEditFileClick() {

	var param = Object.assign({}, v_request_edit_param);
	
	if(param.DOCUMENT_GRP_ID == null) {
		param.DOCUMENT_GRP_ID = "";
	}

	if(param.REQ_MASTER_ID == null) {
		param.REQ_MASTER_ID = "";
	}
	
	$('#dlgEditPopUp').load("/transAttListPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initTransAttListPopUp(param, function (key, returnParam) {
				
				if(returnParam.REQ_MASTER_ID == null || returnParam.REQ_MASTER_ID == ""){
					v_request_edit_param.DOCUMENT_GRP_ID = returnParam.DOCUMENT_GRP_ID;
					insertRow.DOCUMENT_GRP_ID = returnParam.DOCUMENT_GRP_ID;				
				}
				else {
					if(v_request_edit_callback)
					{
						v_request_edit_param.DOCUMENT_GRP_ID = returnParam.DOCUMENT_GRP_ID;
						insertRow.DOCUMENT_GRP_ID = returnParam.DOCUMENT_GRP_ID;				
						//v_request_edit_callback("save-item", null); // 메인 메뉴의 callback까지 호출되어 상세 화면의 팝업이 닫히고 있기 때문에, 여기서는 주석처리 함.
					}							
				}

			});
			$('#dlgAttList').modal('show');
		}
	});
}

function btnDlgEditMailAddClick() {

	var param = {};
	$('#dlgEditPopUp').load("/transMailAddPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initMailAddPopUp(param, function (key, returnParam) {
				if(key == "select-item"){
					
					var itemCheck = true;
					var list = dlgEditMailGrid.Rows;
					
					for (var key in list) {
						var gridRow = list[key];
						if(gridRow.EMP_AD != null && gridRow.EMP_AD == returnParam.EMP_AD){
							
							itemCheck = false;
						}
					}
					
					if(itemCheck) {
						var row = dlgEditMailGrid.AddRow(null,null,1,null,null);
						row.EMP_NAME = returnParam.EMP_NAME;
						row.DEPT_NAME = returnParam.DEPT_NAME;
						row.EMP_AD = returnParam.EMP_AD;
						
						dlgEditMailGrid.RefreshRow(row);						
					}

					$('#dlgMailAdd').modal('hide');
				}
			});
			$('#dlgMailAdd').modal('show');
			
		}
	});	
}

var removeMailList = [];
function btnDlgEditMailDeleteClick() {
	
	var selectList = dlgEditMailGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("알람", $('#alertGridSelectDataNull').val());
		//alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	for(var i = 0; i < selectList.length; i++){
	
		var row = selectList[i];
		if(row.Added != null && row.Added == 1){
			dlgEditMailGrid.RemoveRow(row);
		}
		else {
			var delRow = {"EMP_AD" : row.EMP_AD};
			removeMailList.push(delRow);
			dlgEditMailGrid.RemoveRow(row);
		}
		
	}
}

function btnDlgEditCompleteClick(){

	$("#txtDlgEditSender").removeClass("required");
	$("#txtDlgEditEmail").removeClass("required");	
	$("#txtDlgEditInvoiceNo").removeClass("required");
	
	var check = validationComplete();

	if(!check) {
		return;
	}
	
	confirm_modal("알람", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
		
	    	var revNum = parseInt(insertRow.REVISION_NUM);
	    	var status = insertRow.STATUS;
	    	var role_cd = $('#txtRoleCd').val();
	    	var prevStatus = insertRow.STATUS;
	    	var isAuthConfirm = (role_cd === 'P100' || role_cd === 'A100' || role_cd === 'S100') ? true : false;
	    	var isTempSave = (insertRow.STATUS === '임시저장') ? true : false;
	    	var isPreApproved = (insertRow.STATUS === '출하검토중') ? true : false;	
	    	
	    	if(isTempSave) {
	    		if(isAuthConfirm) {
	    			status = '출하승인';
	    			revNum = 0;
	    		} else {
	    			status = '출하검토중';
	    			revNum = 0;
	    		}
	    	}
	    	else if(isPreApproved) {
	    		if(isAuthConfirm) {
	    			status = '출하승인';
	    			revNum = 0;
	    		}
	    	}
	    	else {
	    		if(isAuthConfirm){
	    			status = '출하승인';
	    		}	
	    		revNum += 1;
	    	}    		
	    	
			var gridPackingDetailList = []; 
			for (var key in dlgEditPackingDetailGrid.Rows) {
				
				var gridRow = dlgEditPackingDetailGrid.Rows[key];
				
				if(gridRow.Fixed == null){
					var row = setDlgEditPackingDetailGridRow(gridRow); 
				  	gridPackingDetailList.push(row);			
				}
			}
			var packingDetailList = JSON.stringify(gridPackingDetailList);	
			
			var gridMailList = []; 
			var gridUpdateMailList = []; 
			for (var key in dlgEditMailGrid.Rows) {
				
				var gridRow = dlgEditMailGrid.Rows[key];
				
				if(gridRow.Fixed == null){
				
				
					var row = {"EMP_AD": gridRow.EMP_AD};			   		  	
				  	gridMailList.push(row);
				  	
				  	if(gridRow.Added == "1"){
				  		gridUpdateMailList.push(row);
				  	}			
				}
			}
			var mailList = JSON.stringify(gridMailList);	
			var updateMailList = JSON.stringify(gridUpdateMailList);				
			var deleteMailList = JSON.stringify(removeMailList);
	
	
			var mstDataPrev = JSON.stringify(mstDataPrevData);
			var packingDetailListPrev = JSON.stringify(packingDetailListPrevData);		
	
			
			var v_danger_flag = "N";		
			if($('#chkDlgEditDangerFlag').is(":checked")) {
				v_danger_flag = "Y";
			}
			
			var v_attribute1 = "N"; // 전략물자 포함 여부, ZSHP_SHIPPING_REQ_M.ATTRIBUTE1
			if($('#chkDlgEditAttribute1').is(":checked")) {
				v_attribute1 = "Y";
			}		
			
			var paramData = {"REQ_MASTER_ID" : insertRow.REQ_MASTER_ID, "SHIPPING_REQ_NO" : insertRow.SHIPPING_REQ_NO, "DEPT_CD" : $('#txtDlgEditDeptCode').val(), "DEPT_ID" : $('#txtDlgEditDeptCode').val(),
				  "INVOICE_NO" : $('#txtDlgEditInvoiceNo').val(), "DESCRIPTION" : $('#txtDlgEditDescription').val(),
				  "DELIVERY_TERMS" : $('#selDlgEditDeliveryTerms').val(), "SHOP_OUT_DATE" : $('#txtDlgEditShopOutDate').val(), 
				  "VENDOR_ID" : $('#txtDlgEditVendorId').val(), "DUTY_REFUND_OPTION" : $('#selDlgEditDutyRefundOption').val(),
				  "PROJECT_ID" : $('#txtDlgEditProjectId').val(), "HSCODE" : $('#txtDlgEditHscode').val(),
				  "DANGER_FLAG" : v_danger_flag, "ATTRIBUTE1" : v_attribute1, "INDEPT_FLAG" : $('#selDlgEditIndeptFlag').val(),
				  "REVISION_NUM" : revNum, "STATUS" : status, "TITLE" : $('#txtDlgEditTtile').val(),
				  "CONTENT" : $('#txtDlgEditContent').val(), "CONTACT_POINT" : $('#txtDlgEditContactPoint').val(), "DOCUMENT_GRP_ID" : insertRow.DOCUMENT_GRP_ID,
				  "isAuthConfirm" : isAuthConfirm, "PREV_STATUS" : prevStatus, "VENDOR_NAME" : $('#txtDlgEditVendorName').val(),					  
				  "SENDER" : $('#txtDlgEditSender').val(),"SENDER_EMAIL" : $('#txtDlgEditEmail').val(),
				  "packingDetailList" : packingDetailList, "mailList" : mailList, "updateMailList" : updateMailList, "deleteMailList" : deleteMailList,
				  "mstDataPrev" : mstDataPrev, "packingDetailListPrev" : packingDetailListPrev, "packingList" : packingDetailList
			  };
		 					  
			$.ajax({
				url: "/completeTransShippingRequest.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						if(result.error_code != null && result.error_code == "-1"){
							alert_fail($('#alertCompleteFail1').val());
						}
						else if(result.error_code != null && result.error_code == "-2"){
							alert_fail($('#alertCompleteFail2').val());
						}
						else if(result.error_code != null && result.error_code == "-3"){
							alert_fail($('#alertCompleteFail3').val());
						}	
						else if(result.error_code != null && result.error_code == "-4"){
							alert_fail($('#alertCompleteFail4').val());
						}
						else {
							if((paramData.REQ_MASTER_ID == null || paramData.REQ_MASTER_ID == undefined || paramData.REQ_MASTER_ID == '')
									&& (result.COMPLETE_REQ_MASTER_ID != null)) {
								console.log('here');
								paramData.REQ_MASTER_ID = result.COMPLETE_REQ_MASTER_ID;
								console.log(paramData.REQ_MASTER_ID);
							}
							sendMail(paramData);
						}
						
					}
				}
			});			
		}
	});	

	/*if (confirm($('#alertSave').val())) {				
	}*/	
}

function validationComplete() {
	
	$("#txtDlgEditSender").addClass("required");
	$("#txtDlgEditEmail").addClass("required");	
	
	var role_cd = $('#txtRoleCd').val();
	if(role_cd == "P100" || role_cd == "A100" || role_cd == "S100"){
		$("#txtDlgEditInvoiceNo").addClass("required");
	}

	if($('#txtDlgEditProjectId').val().length < 2 || $('#txtDlgEditProjectDesc').val() == ""){
		$('#txtDlgEditProjectId').val("");
		$('#txtDlgEditProjectDesc').val("");
	}
	
	if($('#selDlgEditIndeptFlag').val() == "N"){
		if($('#txtDlgEditVendorName').val().length < 2 || $('#txtDlgEditVendorId').val() == ""){
			$('#txtDlgEditVendorName').val("");
			$('#txtDlgEditVendorId').val("");
		}	
	}
	else{
		if($('#txtDlgEditDeptName').val().length < 2 || $('#txtDlgEditDeptCode').val() == ""){
			$('#txtDlgEditDeptName').val("");
			$('#txtDlgEditDeptCode').val("");
		}	
	}
	
	var chkValidation = checkRequiredField("dlgEdit");
	
	if (!chkValidation) {
		alert_modal("알람", $('#alertValidate').val());
		//alert($('#alertValidate').val());
		return false;
	}
	
	if(dlgEditMailGrid.RowCount == 0) {
		alert_modal("알람", $('#alertGridDataNullMail').val());
		//alert($('#alertGridDataNullMail').val());
		return false;	
	}		
	
	if(dlgEditPackingDetailGrid.RowCount == 0) {
		alert_modal("알람", $('#alertGridDataNullPackingDetail').val());
		//alert($('#alertGridDataNullPackingDetail').val());
		return false;
	}
	
	//if(($('#selDlgEditDeliveryTerms').val() == 'Air Courier') && $('#txtDlgEditContent').val().length <= 261) {
	if(($('#selDlgEditDeliveryTerms').val() == 'Air Courier') && $('#txtDlgEditContent').val().length <= 280) {
		alert_modal("알람", "'특송' -> '해외항공특송' 진행 시, 내용 부분에 필요한 부가정보를 반드시 입력해야 합니다.");
		return false;
	}
	
	/*
	if($('#selDlgEditDeliveryTerms').val() == 'Ex Works'
		|| $('#selDlgEditDeliveryTerms').val() == 'Free Carrier'
		|| $('#selDlgEditDeliveryTerms').val() == 'FreeAlongsideShip') {
		//|| $('#selDlgEditDeliveryTerms').val() == 'Free On Board') {
		alert_modal("알람", "국내운송 역무만 존재하는 건의 경우에는, 별도 출하요청 없이 전략물자관리 입력을 해야 합니다.");
		return false;
	}
	*/
	
	return true;
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

function sendMail(paramData){
	//TODO paramData의 REQ_MASTER_ID의 값이 null이면 먼저 가져와서 paramData에 넣어주기
	$.ajax({			
		url: "/sendMailTransShippingRequest.do",
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
					removeMailList = [];
					if(v_request_edit_callback)
					{
						v_request_edit_callback("complete-item", null);
					}				
				}		
			}
		}
	});
}

function btnDlgEditDeleteClick() {

	var msg = $('#alertDelete').val();
	
	if(v_request_edit_param.ATTRIBUTE3 != null && v_request_edit_param.ATTRIBUTE3 != ""){
		msg = "전략물자 데이터가 삭제 됩니다.<br/>삭제 하시겠습니까?";
	}

	confirm_modal("알람", msg, null, function (callobj, result) {
		if(result) {
			var tmpList = [];
			for (var key in dlgEditPackingDetailGrid.Rows) {
			
				var gridRow = dlgEditPackingDetailGrid.Rows[key];
				if(gridRow.Fixed == null){
					var row = setDlgEditPackingDetailGridRow(gridRow); 
					tmpList.push(row);				
				}
			}	
			var packingList = JSON.stringify(tmpList);
			
			
			var gridMailList = []; 
			for (var key in dlgEditMailGrid.Rows) {
				
				var gridRow = dlgEditMailGrid.Rows[key];
				if(gridRow.EMP_AD != null){
					gridMailList.push({"EMP_AD" : gridRow.EMP_AD});	
				}
			}
			var mailList = JSON.stringify(gridMailList);			
		
			var v_danger_flag = "N";
			if($('#chkDlgEditDangerFlag').is(":checked")) {
				v_danger_flag = "Y";
			}
			
			var v_attribute1 = "N";
			if($('#chkDlgEditAttribute1').is(":checked")) {
				v_attribute1 = "Y";
			}		
			
			var paramData = {"REQ_MASTER_ID" : insertRow.REQ_MASTER_ID, "SHIPPING_REQ_NO" : insertRow.SHIPPING_REQ_NO, "DEPT_CD" : $('#txtDlgEditDeptCode').val(), 
							  "INVOICE_NO" : $('#txtDlgEditInvoiceNo').val(), "DESCRIPTION" : $('#txtDlgEditDescription').val(),
							  "DELIVERY_TERMS" : $('#selDlgEditDeliveryTerms').val(), "SHOP_OUT_DATE" : $('#txtDlgEditShopOutDate').val(), 
		 					  "VENDOR_ID" : $('#txtDlgEditVendorId').val(), "DUTY_REFUND_OPTION" : $('#selDlgEditDutyRefundOption').val(),
		 					  "PROJECT_ID" : $('#txtDlgEditProjectId').val(), "HSCODE" : $('#txtDlgEditHscode').val(),
		 					  "DANGER_FLAG" : v_danger_flag, "ATTRIBUTE1" : v_attribute1, "INDEPT_FLAG" : $('#selDlgEditIndeptFlag').val(),
		 					  "REVISION_NUM" : insertRow.REVISION_NUM, "STATUS" : insertRow.STATUS, "TITLE" : $('#txtDlgEditTtile').val(),
		 					  "CONTENT" : $('#txtDlgEditContent').val(), "CONTACT_POINT" : $('#txtDlgEditContactPoint').val(), "DOCUMENT_GRP_ID" : insertRow.DOCUMENT_GRP_ID,
		 					  "ORDER_MASTER_ID" : insertRow.ORDER_MASTER_ID,"SENDER" : $('#txtDlgEditSender').val(),"SENDER_EMAIL" : $('#txtDlgEditEmail').val(),
		 					  "packingList" : packingList, "mailList" : mailList
		 					  };		
		
		
			$.ajax({			
				url: "/deleteTransShippingRequest.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						if(result.error_code != null && result.error_code == "-1") {
							alert_fail($('#alertDeleteFail1').val());
						}
						else if(result.error_code != null && result.error_code == "-2") {
							alert_fail($('#alertDeleteFail2').val());
						}
						else {
							alert_success($('#alertDeleteSuccess').val());
							
							removeMailList = [];
							if(v_request_edit_callback)
							{
								v_request_edit_callback("delete-item", null);
							}				
						}
					
						
					}
				}
			});				
		}
	});

	/*if (confirm($('#alertDelete').val())) {	
	}*/
}

function btnDlgEditExcelUploadClick() {
	var param = {};
	$('#dlgEditPopUp').load("/transExcelUploadPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initTransExcelUploadPopUp(param, function (key, returnParam) {
				if(key == "select-item"){
					
					dlgEditPackingDetailGrid.Source.Data.Data.Body = [returnParam];
					dlgEditPackingDetailGrid.ReloadBody();
					
					$('#dlgTransShippingRequetsExcelUpload').modal('hide');
						
				}
			});
			$('#dlgTransShippingRequetsExcelUpload').modal('show');
			
		}
	});	
}

function btnDlgEditSaveClick() {

	$("#txtDlgEditSender").removeClass("required");
	$("#txtDlgEditEmail").removeClass("required");	
	$("#txtDlgEditInvoiceNo").removeClass("required");

	if($('#txtDlgEditProjectId').val().length < 2 || $('#txtDlgEditProjectDesc').val() == ""){
		$('#txtDlgEditProjectId').val("");
		$('#txtDlgEditProjectDesc').val("");
	}
	
	if($('#selDlgEditIndeptFlag').val() == "N"){
		if($('#txtDlgEditVendorName').val().length < 2 || $('#txtDlgEditVendorId').val() == ""){
			$('#txtDlgEditVendorName').val("");
			$('#txtDlgEditVendorId').val("");
		}	
	}
	else{
		if($('#txtDlgEditDeptName').val().length < 2 || $('#txtDlgEditDeptCode').val() == ""){
			$('#txtDlgEditDeptName').val("");
			$('#txtDlgEditDeptCode').val("");
		}	
	}
	
	var chkValidation = checkRequiredField("dlgEdit");
	
	if (!chkValidation) {
		alert_modal("알람", $('#alertValidate').val());
		//alert($('#alertValidate').val());
		return;
	}
	
	confirm_modal("알람", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var changeObject = dlgEditPackingDetailGrid.GetChanges();
			var changeList = JSON.parse(changeObject).Changes;
			var updatePackingDetailList = [];		

			for(var i = 0; i < changeList.length; i++){
				var gridRow = changeList[i];
				
				var row = setDlgEditPackingDetailGridRow(gridRow);	  	
			  	updatePackingDetailList.push(row);		
			}			
			
			var updatePackingList = JSON.stringify(updatePackingDetailList);
			
			
			
			
			var deleteMailList = JSON.stringify(removeMailList);
			
			var girdMailList = []; 
			for (var key in dlgEditMailGrid.Rows) {
				
				var gridRow = dlgEditMailGrid.Rows[key];
				if(gridRow.EMP_AD != null){
					girdMailList.push({"EMP_AD" : gridRow.EMP_AD});	
				}
			}
			var mailList = JSON.stringify(girdMailList);			
			
			
			
			var v_danger_flag = "N";
			if($('#chkDlgEditDangerFlag').is(":checked")) {
				v_danger_flag = "Y";
			}
			
			var v_attribute1 = "N";
			if($('#chkDlgEditAttribute1').is(":checked")) {
				v_attribute1 = "Y";
			}
			
			// completeTransShippingRequest.. 바로 완료버튼 누르면 Delivery Terms에 특송이면 ATTRIBUTE5를 'Y'로 넣는데 임시저장에는 그런게 없이 되어있음.
			// 부득이하게 임시저장(saveTransShippingRequest) 때에는 ATTRIBUTE5를 PARAM으로 던짐.. 추후 관리할 때 참고 필요..
			// SHIPPING_REQ_FLAG도 마찬가지..
			var v_attribute5 = 'N';
			if($('#selDlgEditDeliveryTerms').val() == 'Air Courier') {
				v_attribute5 = 'Y';
			}
			
			
			var paramData = {"REQ_MASTER_ID" : insertRow.REQ_MASTER_ID, "SHIPPING_REQ_NO" : insertRow.SHIPPING_REQ_NO, "DEPT_CD" : $('#txtDlgEditDeptCode').val(), 
							  "INVOICE_NO" : $('#txtDlgEditInvoiceNo').val(), "DESCRIPTION" : $('#txtDlgEditDescription').val(),
							  "DELIVERY_TERMS" : $('#selDlgEditDeliveryTerms').val(), "SHOP_OUT_DATE" : $('#txtDlgEditShopOutDate').val(), 
		 					  "VENDOR_ID" : $('#txtDlgEditVendorId').val(), "DUTY_REFUND_OPTION" : $('#selDlgEditDutyRefundOption').val(),
		 					  "PROJECT_ID" : $('#txtDlgEditProjectId').val(), "HSCODE" : $('#txtDlgEditHscode').val(),
		 					  "DANGER_FLAG" : v_danger_flag,"ATTRIBUTE1" : v_attribute1, "INDEPT_FLAG" : $('#selDlgEditIndeptFlag').val(),
		 					  "REVISION_NUM" : insertRow.REVISION_NUM, "STATUS" : insertRow.STATUS, "TITLE" : $('#txtDlgEditTtile').val(),
		 					  "CONTENT" : $('#txtDlgEditContent').val(), "CONTACT_POINT" : $('#txtDlgEditContactPoint').val(), "DOCUMENT_GRP_ID" : insertRow.DOCUMENT_GRP_ID,	 					  
		 					  "mailList" : mailList, "deleteMailList" : deleteMailList, "updatePackingList" : updatePackingList, "ATTRIBUTE5" : v_attribute5, "SHIPPING_REQ_FLAG": ""
		 					  };
		 					  
			$.ajax({			
				url: "/saveTransShippingRequest.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						removeMailList = [];
						if(v_request_edit_callback)
						{
							v_request_edit_callback("save-item", null);
						}	
					}
				}
			});				
			
		}
	});
		
	/*if (confirm($('#alertSave').val())) {	
		
	 					  		
						
	}*/
}

function selDlgEditIndeptFlagChange() {

	$("#editModalDeptName").removeClass("required");
	$("#txtDlgEditDeptCode").removeClass("required");
	$("#txtDlgEditVendorName").removeClass("required");
	$("#txtDlgEditVendorId").removeClass("required");

	if($('#selDlgEditIndeptFlag').val() == "N"){
		
		$('#txtDlgEditVendorName').val("");
		$('#txtDlgEditVendorId').val("");	

		$("#txtDlgEditVendorName").addClass("required");
		$("#txtDlgEditVendorId").addClass("required");
	
		$('#txtDlgEditDeptName').hide();
		$('#txtDlgEditVendorName').show();			
	}
	else {
	
		$('#txtDlgEditDeptName').val("");
		$('#txtDlgEditDeptCode').val("");	

		$("#txtDlgEditDeptName").addClass("required");
		$("#txtDlgEditDeptCode").addClass("required");
	
		$('#txtDlgEditDeptName').show();
		$('#txtDlgEditVendorName').hide();		
	}
}

function selDlgEditDeliveryTermsChange() {
	if($('#selDlgEditDeliveryTerms').val() == 'Air Courier') {
		/*$('#txtDlgEditContent').val('##특송 건 아래 항목 확인 후 입력 후 출하승인(완료) 부탁드립니다.\n'
		+ '- 유상/무상/재반입/재반출 해당 여부 : \n- 수출 후 재수입 여부 : \n'
		+ '- 픽업지 업체명, 주소, 담당자, 연락처 : \n- 도착지 업체명, 주소, 담당자, 연락처(Consignee와 실제 도착지가 상이한 경우) : \n'
		+ '- 운송조건(Incoterms) : \n- 원산지 : \n- 포장 요청여부 : ');*/
		$('#txtDlgEditContent').val('##특송 건 아래 항목 확인 후 입력 후 출하승인(완료) 부탁드립니다.\n'
				+ '[운송조건 (Incoterms)] : \n'
				+ '[통관관련]\n'
				+ '- 유상(환급 or 비환급) : \n'
				+ '- 무상(샘플(면허X) or 무환면허) : \n'
				+ '- 재수입 or 재수출 여부 : \n'
				+ '[운송구간]\n'
				+ '- 픽업지 업체명,주소,담당자,연락처,e-mail : \n'
				+ '- 도착지 업체명,주소,담당자,연락처,e-mail : \n'
				+ '[물품관련]\n'
				+ '- 원산지 : \n'
				+ '- HS CODE : \n'
				+ '- 포장 요청여부 : \n'
				+ '- Handling 주의사항 : ');
		
		$("#lblDlgEditHscode").addClass("required");
		$("#txtDlgEditHscode").addClass("required");
		
		insertMailListAirCourier(true);
	}
	else if($('#selDlgEditDeliveryTerms').val() == 'Free Carrier'
		|| $('#selDlgEditDeliveryTerms').val() == 'FreeAlongsideShip'
		|| $('#selDlgEditDeliveryTerms').val() == 'Ex Works'
		|| $('#selDlgEditDeliveryTerms').val() == 'Free On Board') {
		//alert_modal("알람", "국내운송 역무만 수행하는 수출 건(EXW, FCA, FAS)의 경우에는, 시스템 출하요청 없이 전략물자관리 입력을 해야 합니다.");
		alert_modal("알람", "구매인도조건이 E/F조건(EXW,FCA,FAS,FOB)인 경우,<br/>3국/국내 수출 여부에 따라 절차가 상이하오니 참조 바랍니다.<br/>" +
				"&nbsp;&nbsp;# 3국 운송 : 출하요청 작성 후 전략물자 관리 작성 (3국 여부 체크) 및 운송요청<br/>" +
				"&nbsp;&nbsp;# 국내 수출운송 : 전략물자관리에서 FOB 전략물자 생성 바로 입력 (출하요청은 입력하지 않음)");

		//$('#selDlgEditDeliveryTerms').val('');
		$("#lblDlgEditHscode").removeClass("required");
		$("#txtDlgEditHscode").removeClass("required");
		
	}
	else {
		//$('#txtDlgEditContent').val('');
		$("#lblDlgEditHscode").removeClass("required");
		$("#txtDlgEditHscode").removeClass("required");
		//insertMailListAirCourier(false);
	}
	
	if(($('#selDlgEditDeliveryTerms').val() != 'Air Courier') && ($('#txtDlgEditContent').val().indexOf('특송 건 아래') != -1)) {
		// content에 특송관련 내용이 있을 경우에만 제거하는걸로
		$('#txtDlgEditContent').val('');
		insertMailListAirCourier(false);
	}
	
	console.log($('#txtDlgEditContent').val().length);
}

function insertMailListAirCourier(isCreate) {
	if(isCreate) {
		var row = dlgEditMailGrid.AddRow(null,null,1,null,null);
		row.EMP_NAME = '이윤숙';
		row.DEPT_NAME = 'EHS/관리)물류운영팀';
		row.EMP_AD = 'YOUNSUK.LEE';
		dlgEditMailGrid.RefreshRow(row);
		var row = dlgEditMailGrid.AddRow(null,null,1,null,null);
		row.EMP_NAME = '신민경(글로넷TLS)';
		row.DEPT_NAME = '';
		row.EMP_AD = 'minkyoung.shin@glonet.net';
		dlgEditMailGrid.RefreshRow(row);
		var row = dlgEditMailGrid.AddRow(null,null,1,null,null);
		row.EMP_NAME = '유은경(글로넷TLS)';
		row.DEPT_NAME = '';
		row.EMP_AD = 'eunkyeong.yoo@glonet.net';
		dlgEditMailGrid.RefreshRow(row);
		var row = dlgEditMailGrid.AddRow(null,null,1,null,null);
		row.EMP_NAME = '홍승아(글로넷TLS)';
		row.DEPT_NAME = '';
		row.EMP_AD = 'seunga.hong@glonet.net';
		dlgEditMailGrid.RefreshRow(row);
	}
	else {
		dlgEditMailGrid.ClearBody();
	}
	
}

function setDlgEditPackingDetailGridRow(gridRow){
		var row = {"NUM": gridRow.NUM,
				  "PACKAGE_NO": gridRow.PACKAGE_NO,
	   			  "DESCRIPTION": gridRow.DESCRIPTION,
	   			  "PACKING_TYPE": gridRow.PACKING_TYPE,
	   			  "SHIPPING_DIMENSION_L": gridRow.SHIPPING_DIMENSION_L,
	   			  "SHIPPING_DIMENSION_W": gridRow.SHIPPING_DIMENSION_W,
	   			  "SHIPPING_DIMENSION_H": gridRow.SHIPPING_DIMENSION_H,
	   			  "SHIPPING_VOLUME": gridRow.SHIPPING_VOLUME,
	   			  "NET_WEIGHT": gridRow.NET_WEIGHT,
	   			  "GROSS_WEIGHT": gridRow.GROSS_WEIGHT,
	   			  "HAZARDOUS_MATERIAL_FLAG": gridRow.HAZARDOUS_MATERIAL_FLAG,
	   			  "RT": gridRow.RT,
	   			  "COUNTRY_OF_ORIGIN": gridRow.COUNTRY_OF_ORIGIN,
	   			  "REMARKS": gridRow.REMARKS						   			  
	   			  };
	return row;	   			
}
