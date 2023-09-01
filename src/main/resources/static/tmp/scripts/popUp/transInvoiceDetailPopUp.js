var dlgDetailRequestGrid;
var dlgDetailPackingListGrid;

var gridDutyRefundOptionCodeList;

var v_inoice_detail_callback = null;
var v_inoice_detail_param;

function initInvoiceDetailPopUp(param , callback) {
	v_inoice_detail_callback = callback;
    v_inoice_detail_param = param;
    
    initInvoiceDetailPopUpCode();    
}

function initInvoiceDetailPopUpCode() {	
	
	var codeList = [{"CODE" : "C101"},{"CODE" : "C103"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getTransCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;			
			
			gridDutyRefundOptionCodeList = setGridCombo(results.C101, "na");
			var result = setCombo(results.C101, "seldlgDetailDutyRefundOption", "na");
				result = setCombo(results.C103, "seldlgDetailDeliveryTerms", "na");
				
			initInvoiceDetailPopUpControls();	
        }
    });
}


function initInvoiceDetailPopUpControls() {
	var gridCnt = 0;
	var gridCntTotal = 2;
	var gridCreate = true;

	$('#dlgInvoiceDetail').on('shown.bs.modal', function () {
		$('#dlgInvoiceDetail').click();
	});
	
	$('#dlgInvoiceDetail').on('hidden.bs.modal', function () {
	  	closeInvoiceDetailPopUp();
	})	

	TGSetEvent("OnRenderFinish","transShippingInvoiceDlgDetailRequestGrid",function(grid){
			gridCnt += 1;
		    if(gridCreate && gridCnt == gridCntTotal){
		    	gridCreate = false;
		    	setInvoiceDetailPopUpData();
		    }
	});	
	
	TGSetEvent("OnRenderFinish","transShippingInvoiceDlgDetailPackingListGrid",function(grid){
			gridCnt += 1;
		    if(gridCreate && gridCnt == gridCntTotal){
		    	gridCreate = false;
		    	setInvoiceDetailPopUpData();
		    }
	});
	
	TGSetEvent("OnCalculateFinish","transShippingInvoiceDlgDetailPackingListGrid",function(grid){
		
		transInvoiceDetailPackingListGridCalculate(grid);
		
	});	

		
	var gridCode = getGridCode();
	var dlgDetailRequestGridCol = {
		"Cfg": {
			"id"				: "transShippingInvoiceDlgDetailRequestGrid"
			, "CfgId"			: "transShippingInvoiceDlgDetailRequestGridCfg"
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
			, "Sorting"			: "1"
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
	   "Cols" : [{ "Name": "SHIPPING_REQ_NO", "Width": "120", "Type": "Text", "CanEdit": "0" , "Class" : "gridLinkText gridCenterText" , "OnClickCell"	: "openRequestEditModal(Grid,Row,Col);"}, 
			     { "Name": "PROJECT_ID", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "INVOICE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "DESCRIPTION", "Width": "250", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "ITEM", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "DELIVERY_TERMS", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "STATUS", "Width": "130", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText" },
			     { "Name": "SHOP_OUT_DATE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"   },
			     { "Name": "DUTY_REFUND_OPTION", "Width": "150", "Type": "Enum", "Enum" : gridDutyRefundOptionCodeList.label, "EnumKeys" : gridDutyRefundOptionCodeList.code,  "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
			     { "Name": "UPLOAD_FILE", "Width": "100"	, "Type": "Icon", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openInvoiceDetailAttModal( Grid, Row,Col )"	, "IconSize" : "2"	}],
			   "Header" : {"SHIPPING_REQ_NO": "요청번호", "Class" : "gridCenterText",
			   			   "PROJECT_ID": "PROJECT",
			   			   "INVOICE_NO": "INVOICE NO",
			   			   "DESCRIPTION": "DESCRIPTION",
			   			   "ITEM": "ITEM",
			   			   "DELIVERY_TERMS" : "구매인도조건",
			   			   "STATUS": "Status",
			   			   "SHOP_OUT_DATE" : "출하예정일",  
						   "DUTY_REFUND_OPTION" : "관세환급여부",
						   "UPLOAD_FILE": "파일첨부"} 	
	};		
	
	var dlgDetailPackingListGridCol = {
		"Cfg": {
			"id"				: "transShippingInvoiceDlgDetailPackingListGrid"
			, "CfgId"			: "transShippingInvoiceDlgDetailPackingListGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "2"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
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
			, "GroupSortMain"   : "1"
			, "GroupRestoreSort" : "1"
			, "Group" : "SHIPPING_REQ_NO"
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
		}
	   ,"Def" : [ 
	      { "Name": "Group", "Expanded": "1",
	         "Calculated": "1", "CalcOrder": "SHIPPING_REQ_NO,PACKAGE_NO,NET_WEIGHT,GROSS_WEIGHT,SHIPPING_VOLUME",
	         "NET_WEIGHTFormula": "sum()", "SHIPPING_VOLUMEFormula": "sum()", "GROSS_WEIGHTFormula": "sum()",
	         "Spanned": "1", "SHIPPING_REQ_NOSpan": "8", "HAZARDOUS_MATERIAL_FLAGSpan": "6",
	         "AType": "Text" }] 		
		, "Cols" : [{ "Name": "SHIPPING_REQ_NO", "Width": "180", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
				    { "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1"  }, 
					{ "Name": "DESCRIPTION", "Width": "220", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
					{ "Name": "SUB_DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
					{ "Name": "PACKING_TYPE", "Width": "130", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "SHIPPING_DIMENSION_L", "Width": "100", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "SHIPPING_DIMENSION_W", "Width": "100", "Type": "Float", "Format" : "###,###,###,##0.###","CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "SHIPPING_DIMENSION_H", "Width": "100", "Type": "Float", "Format" : "###,###,###,##0.###","CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },					
	      			{ "Name": "NET_WEIGHT", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###","CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "GROSS_WEIGHT", "Width": "160", "Type": "Float", "Format" : "###,###,###,##0.###","CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "SHIPPING_VOLUME", "Width": "180", "Type": "Float", "Format" : "###,###,###,##0.###","CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "HAZARDOUS_MATERIAL_FLAG", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText", "Spanned" : "1" },
	      			{ "Name": "STRATEGIC_MATERIAL_FLAG", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText", "Spanned" : "1" },
	      			{ "Name": "COUNTRY_OF_ORIGIN", "Width": "160", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "REMARKS", "Width": "160", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "PO_NO", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" },
	      			{ "Name": "PO_LINE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor", "Spanned" : "1" }]
		, "Head" : [
			{
				"Kind"					: "Header"
				, "Class"				: "gridCenterText"
				, "id"					: "Header"
				, "Spanned"				: "1"
				, "SHIPPING_REQ_NO" : "요청번호", "SHIPPING_REQ_NORowSpan" : "2"
				, "PACKAGE_NO" : "Package No.", "PACKAGE_NORowSpan" : "2"
				, "DESCRIPTION" : "Description", "DESCRIPTIONRowSpan" : "2"
				, "SUB_DESCRIPTION" : "Sub-Description", "SUB_DESCRIPTIONRowSpan" : "2"
				, "PACKING_TYPE" : "Packing Style", "PACKING_TYPERowSpan" : "2"
				, "SHIPPING_DIMENSION_L" : "Shipping Dimension", "SHIPPING_DIMENSION_LSpan" : "3"
				, "SHIPPING_DIMENSION_W" : ""
				, "SHIPPING_DIMENSION_H" : ""
				, "NET_WEIGHT" : "Net Weight(kg)", "NET_WEIGHTRowSpan" : "2"
				, "GROSS_WEIGHT" : "Gross Weight(kg)", "GROSS_WEIGHTRowSpan" : "2"
				, "SHIPPING_VOLUME" : "Shipping Volume(M3)", "SHIPPING_VOLUMERowSpan" : "2"
				, "HAZARDOUS_MATERIAL_FLAG" : "Hazardous Material", "HAZARDOUS_MATERIAL_FLAGRowSpan" : "2"
				, "STRATEGIC_MATERIAL_FLAG" : "Strategic Material", "STRATEGIC_MATERIAL_FLAGRowSpan" : "2"
				, "COUNTRY_OF_ORIGIN" : "Country of Origin", "COUNTRY_OF_ORIGINRowSpan" : "2"
				, "REMARKS" : "Remarks", "REMARKSRowSpan" : "2"
				, "PO_NO" : "PO No.", "PO_NORowSpan" : "2"
				, "PO_LINE" : "Line Num.", "PO_LINERowSpan" : "2"
			}
			, {
				"Kind"					: "Header"
				, "Class"				: "gridCenterText"
				, "Spanned"				: "1"
				, "SHIPPING_REQ_NO" : "요청번호"
				, "PACKAGE_NO" : "Package No."
				, "DESCRIPTION" : "Description"
				, "SUB_DESCRIPTION" : "Sub-Description"
				, "PACKING_TYPE" : "Packing Style"
				, "SHIPPING_DIMENSION_L" : "L(mm)"
				, "SHIPPING_DIMENSION_W" : "W(mm)"
				, "SHIPPING_DIMENSION_H" : "H(mm)"
				, "NET_WEIGHT" : "Net Weight(kg)"
				, "GROSS_WEIGHT" : "Gross Weight(kg)"
				, "SHIPPING_VOLUME" : "Shipping Volume(M3)"
				, "HAZARDOUS_MATERIAL_FLAG" : "Hazardous Material"
				, "STRATEGIC_MATERIAL_FLAG" : "Strategic Material"
				, "COUNTRY_OF_ORIGIN" : "Country of Origin"
				, "REMARKS" : "Remarks"
				, "PO_NO" : "PO No."
				, "PO_LINE" : "Line Num."
			}
		]
        ,"Foot" : [
				      { "Calculated": "1", "CanEdit": "0", "Class" : "gridLinkText"   }  
				   ] 		
	};	
	
	dlgDetailRequestGrid = TreeGrid( {Layout:{Data : dlgDetailRequestGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgDetailRequest" );
	dlgDetailPackingListGrid = TreeGrid( {Layout:{Data : dlgDetailPackingListGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgDetailPackingList" );
	
	$('#btnDlgDetailExcelDownload').click(function () { btnDlgDetailExcelDownloadClick(); return false; });
	$('#dlgDetailFile').click(function () { dlgDetailFileClick(); return false; }); 
	

	var list = v_inoice_detail_param.menuAuthList;
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

function closeInvoiceDetailPopUp() {
	dlgDetailRequestGrid.Dispose();
	dlgDetailPackingListGrid.Dispose();
}

function setInvoiceDetailPopUpData() {

	$('#txtdlgDetailInvoiceNo').val(v_inoice_detail_param.INVOICE_NO);
	$('#txtdlgDetailProjectId').val(v_inoice_detail_param.PROJECT_ID);
	$('#seldlgDetailDutyRefundOption').val(v_inoice_detail_param.DUTY_REFUND_OPTION);
	$('#seldlgDetailDeliveryTerms').val(v_inoice_detail_param.DELIVERY_TERMS);
	
	searchDlgDetailRequest();
	searchDlgDetailPackingList(); 
}

function searchDlgDetailRequest(){

	$.ajax({
		url: "/getTransShippingInvoiceDlgDetailRequest.do",		
		data: {"INVOICE_NO_ID" : v_inoice_detail_param.INVOICE_NO_ID},
		success: function (data, textStatus, jqXHR) {

			dlgDetailRequestGrid.Source.Data.Data.Body = [data.results];
			dlgDetailRequestGrid.ReloadBody();
        }
    });
}

function searchDlgDetailPackingList(){

	$.ajax({
		url: "/getTransShippingInvoiceDlgDetailPackingList.do",		
		data: {"INVOICE_NO_ID" : v_inoice_detail_param.INVOICE_NO_ID},
		success: function (data, textStatus, jqXHR) {

			dlgDetailPackingListGrid.Source.Data.Data.Body = [data.results];
			dlgDetailPackingListGrid.Reload();
        }
    });

}

function transInvoiceDetailPackingListGridCalculate(grid) {
	
	var list = grid.Rows;
	
	var calList = [];
	var calKeyList = [];
	
	var v_ShippingReqNo = "";
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(key.indexOf("GR") != -1) {
			var calKeyRow = {"RowKey" : key }; 
			calKeyList.push(calKeyRow);
		}
		else if(gridRow.Fixed == "Foot"){
			var calKeyRow = {"RowKey" : key }; 
			calKeyList.push(calKeyRow);		
		}
		else if(gridRow.Fixed == null && key.indexOf("GR") == -1){
			
			if(v_ShippingReqNo != gridRow.SHIPPING_REQ_NO){
			
				v_ShippingReqNo = gridRow.SHIPPING_REQ_NO;
				
				if(v_ShippingReqNo != ""){
					var calRow = {"SHIPPING_REQ_NO" : gridRow.SHIPPING_REQ_NO, "NET_WEIGHT_GRP_SUM" : gridRow.NET_WEIGHT_GRP_SUM,
								  "GROSS_WEIGHT_GRP_SUM" : gridRow.GROSS_WEIGHT_GRP_SUM, "SHIPPING_VOLUME_GRP_SUM" : gridRow.SHIPPING_VOLUME_GRP_SUM,
								  "NET_WEIGHT_SUM" : gridRow.NET_WEIGHT_SUM, "GROSS_WEIGHT_SUM" : gridRow.GROSS_WEIGHT_SUM, "SHIPPING_VOLUME_SUM" : gridRow.SHIPPING_VOLUME_SUM};
					calList.push(calRow);
				}
			}			
		}
	} 
	
	for (var i = 0; i < calKeyList.length; i++){
		var calKeyRow = calKeyList[i];
		var gridRow = list[calKeyRow.RowKey];
		
		if(calKeyRow.RowKey.indexOf("GR") != -1) {
			for(var j = 0; j < calList.length; j++){
				var calRow = calList[j];
				
				if(gridRow.SHIPPING_REQ_NO == calRow.SHIPPING_REQ_NO){
					
					gridRow.SHIPPING_REQ_NO = gridRow.SHIPPING_REQ_NO + " [합계]"
					gridRow.NET_WEIGHT = calRow.NET_WEIGHT_GRP_SUM;
					gridRow.GROSS_WEIGHT = calRow.GROSS_WEIGHT_GRP_SUM;
					gridRow.SHIPPING_VOLUME = calRow.SHIPPING_VOLUME_GRP_SUM;
					
					gridRow.SHIPPING_REQ_NOBackground = "#FFF9D4";
					gridRow.NET_WEIGHTBackground = "#FFF9D4";
					gridRow.GROSS_WEIGHTBackground = "#FFF9D4";
					gridRow.SHIPPING_VOLUMEBackground = "#FFF9D4";
					gridRow.HAZARDOUS_MATERIAL_FLAGBackground = "#FFF9D4";
					grid.RefreshRow(gridRow);	
					
					
				}	
			}			
		}
		else {
			if(calList.length > 0) {
				var calRow = calList[0];
				gridRow.NET_WEIGHT = calRow.NET_WEIGHT_SUM;
				gridRow.GROSS_WEIGHT = calRow.GROSS_WEIGHT_SUM;
				gridRow.SHIPPING_VOLUME = calRow.SHIPPING_VOLUME_SUM;
				
				gridRow.SHIPPING_DIMENSION_L = "";
				gridRow.SHIPPING_DIMENSION_W = "";
				gridRow.SHIPPING_DIMENSION_H = "";
				
				grid.RefreshRow(gridRow);			
			}		
		}
	} 	
}

function openInvoiceDetailAttModal(G,row,col) {

	var param = Object.assign({}, row);
		param.menuAuthList = v_inoice_detail_param.menuAuthList;
			
	$('#dlgInvoiceDetailPopUp').load("/transAttListPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item") {
					searchDlgDetailRequest();
					searchDlgDetailPackingList();				
				}			
			});
			$('#dlgAttList').modal('show');
		}
	});	
	
}

function btnDlgDetailExcelDownloadClick() {
		dlgDetailPackingListGrid.ExportFormat="xlsx";
		dlgDetailPackingListGrid.ActionExport();
}

function dlgDetailFileClick() {

	var param = Object.assign({}, v_inoice_detail_param);
		param.attSaveType = "invoice";
	
	$('#dlgInvoiceDetailPopUp').load("/transAttListPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item") {
					v_inoice_detail_param.DOCUMENT_GRP_ID = returnParam.DOCUMENT_GRP_ID;
					if(v_inoice_detail_callback)
					{
						v_inoice_detail_callback("save-item", null);
					}										
				}			
			});
			
			$('#dlgAttList').modal('show');
		}
	});	
}

function openRequestEditModal(G,row,col) {

	var param = Object.assign({}, row);
		param.modalTtile = "운송요청" + " [" + row.SHIPPING_REQ_NO + "] [" + row.STATUS + "]";
		param.modalType = "edit";
		param.menuAuthList = v_inoice_detail_param.menuAuthList;
		
	$('#dlgInvoiceDetailPopUp').load("/transRequestEditPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initRequestEditPopUp(param, function (key, returnParam) {
				if(key == "save-item") {
					searchDlgDetailRequest();
					searchDlgDetailPackingList(); 	
					$('#dlgEdit').modal('hide');	
					
					if(v_inoice_detail_callback)
					{
						v_inoice_detail_callback("save-item", null);
					}																		
				}
				else if(key == "delete-item") {
					searchDlgDetailRequest();
					searchDlgDetailPackingList(); 	
					$('#dlgEdit').modal('hide');	
					
					if(v_inoice_detail_callback)
					{
						v_inoice_detail_callback("delete-item", null);
					}																		
				}
				else if(key == "complete-item") {
					searchDlgDetailRequest();
					searchDlgDetailPackingList(); 	
					$('#dlgEdit').modal('hide');	
					
					if(v_inoice_detail_callback)
					{
						v_inoice_detail_callback("complete-item", null);
					}																		
				}				
				
							
			});
			
			$('#dlgEdit').modal('show');
		}
	});
}




