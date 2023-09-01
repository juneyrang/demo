var dlgTransPackageGrid;

var v_trans_package_callback = null;
var v_trans_package_param;

function initTransPackagePopUp(param , callback) {
	v_trans_package_callback = callback;
    v_trans_package_param = param;
    
    initTransPackagePopUpCode();    
}

function initTransPackagePopUpCode() {	
	
	initTransPackagePopUpControls();
}


function initTransPackagePopUpControls() {	

	$('#dlgTransPackage').on('shown.bs.modal', function () {
		$('#dlgTransPackage').click();
	});
	
	$('#dlgTransPackage').on('hidden.bs.modal', function () {
	  	closeTransPackagePopUp();
	})	

	var gridCreate = true;
	TGSetEvent("OnRenderFinish","transDlgTransPackageGrid",function(grid){
	    if(gridCreate){
	    	gridCreate = false;
	    	setTransPackagePopUpData();
	    }
	});	
	
	TGSetEvent("OnCalculateFinish","transDlgTransPackageGrid",function(grid){
		
		transDlgTransPackageGridCalculate(grid);
		
	});		
	var gridCode = getGridCode();
	var dlgTransPackageGridCol = {
		"Cfg": {
			"id"				: "transDlgTransPackageGrid"
			, "CfgId"			: "transDlgTransPackageGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
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
			, "Sorting"			: "0"
			, "GroupSortMain"   : "1"
			, "GroupRestoreSort" : "1"
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
		, "Cols" : [{ "Name": "OPER_ORG_CD", "Width": "240", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor gridCenterText", "Spanned" : "1"},
					{ "Name": "INVOICE_NO", "Width": "240", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor gridCenterText", "Spanned" : "1"},
					{ "Name": "PACKAGE_NO", "Width": "240", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor gridCenterText", "Spanned" : "1"},
					{ "Name": "DESCRIPTION", "Width": "140", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "SUB_DESCRIPTION", "Width": "160", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "PACKING_TYPE", "Width": "150", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "SHIPPING_DIMENSION_L", "Width": "110", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "SHIPPING_DIMENSION_W", "Width": "110", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "SHIPPING_DIMENSION_H", "Width": "110", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "NET_WEIGHT", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "GROSS_WEIGHT", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "SHIPPING_VOLUME", "Width": "160", "Type": "Float", "Format" : "###,###,###,##0.###", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "HAZARDOUS_MATERIAL_FLAG", "Width": "180", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "STRATEGIC_MATERIAL_FLAG", "Width": "180", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "COUNTRY_OF_ORIGIN", "Width": "190", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "REMARKS", "Width": "240", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "PO_NO", "Width": "150", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"},
					{ "Name": "PO_LINE", "Width": "150", "Type": "Text", "CanEdit": "0" , "Class" : "gridBorderText gridTextColor", "Spanned" : "1"}]
		, "Head" : [
			{
				"Kind"					: "Header"
				, "Class"				: "gridCenterText"
				, "id"					: "Header"
				, "Spanned"				: "1"
				, "OPER_ORG_CD" : "항차번호", "OPER_ORG_CDRowSpan" : "2"
				, "INVOICE_NO" : "Invoice No.", "INVOICE_NORowSpan" : "2"
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
				, "OPER_ORG_CD" : "항차번호"
				, "INVOICE_NO" : "Invoice No."
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


	dlgTransPackageGrid = TreeGrid( {Layout:{Data : dlgTransPackageGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransPackageTable" );
	
	$('#btnDlgTransPackageExcelDownload').click(function () { btnDlgTransPackageExcelDownloadClick(); return false;});
	
	

}

function closeTransPackagePopUp() {
	dlgTransPackageGrid.Dispose();
}

function setTransPackagePopUpData() {

	$.ajax({
		url: "/getTransShippingOrderViewPackage.do",		
		data: {"ORDER_MASTER_ID" : v_trans_package_param.ORDER_MASTER_ID, "OPER_ORG_CD" : v_trans_package_param.OPER_ORG_CD},
		success: function (data, textStatus, jqXHR) {
			
			
			var list = setTransPackagePopUpDataSpan(data.results);
			

			
			dlgTransPackageGrid.Source.Data.Data.Body = [list];
			dlgTransPackageGrid.Reload();
			
        }
    });	
}

function setTransPackagePopUpDataSpan(list) {
	
	var invoiceNo = "";
	var spanCnt = 0;
	
	for(var i = 0; i < list.length; i++){
		var row  = list[i];
		
		if(invoiceNo != row.INVOICE_NO){
			invoiceNo = row.INVOICE_NO;
			var spanCnt = 0; 
			for(var j = 0; j < list.length; j++){
				var targeRow  = list[j];	
				
				if(row.INVOICE_NO == targeRow.INVOICE_NO){
					spanCnt += 1;
				}
			}
			
			row.INVOICE_NORowSpan = spanCnt;
		}		
			
	}
	
	list[0].OPER_ORG_CDRowSpan = list.length;
	
	return list;
}

function btnDlgTransPackageExcelDownloadClick() {
		dlgTransPackageGrid.ExportFormat="xlsx";
		dlgTransPackageGrid.ActionExport();
}

function transDlgTransPackageGridCalculate(grid) {
	var list = grid.Rows;
	
	var calRow = null;
	var calKeyList = [];
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(gridRow.Fixed == "Foot"){
			var calKeyRow = {"RowKey" : key }; 
			calKeyList.push(calKeyRow);		
		}
		else if(gridRow.Fixed == null && calRow == null) {
			calRow = gridRow;
		}
	} 
	
	for (var i = 0; i < calKeyList.length; i++){
		var calKeyRow = calKeyList[i];
		var gridRow = list[calKeyRow.RowKey];
		
		if(calRow != null) {
			gridRow.NET_WEIGHT = calRow.NET_WEIGHT_SUM;
			gridRow.GROSS_WEIGHT = calRow.GROSS_WEIGHT_SUM;
			gridRow.SHIPPING_VOLUME = calRow.SHIPPING_VOLUME_SUM;
			
			gridRow.SHIPPING_DIMENSION_L = calRow.SHIPPING_DIMENSION_L_SUM;
			gridRow.SHIPPING_DIMENSION_W = calRow.SHIPPING_DIMENSION_W_SUM;
			gridRow.SHIPPING_DIMENSION_H = calRow.SHIPPING_DIMENSION_H_SUM;
			
			grid.RefreshRow(gridRow);			
		}		
		
	} 	
}
