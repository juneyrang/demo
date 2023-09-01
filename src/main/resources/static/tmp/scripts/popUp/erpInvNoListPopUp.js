var dlgInvoiceNoGrid;

var v_callback = null;
var v_param;

function setData() {
	$('#txtDlgInvoiceNo').val(v_param.INVOICE_NO);
	if ($('#txtDlgInvoiceNo').val() != "")
		dlgInvoiceNoListSearchClick();	    
}

function initPopUp(param , callback) {
	v_callback = callback;
    v_param = param;
    
    initPopUpControls();
}

function closePopUp() {
	dlgInvoiceNoGrid.Dispose();
}

function initPopUpControls() {
	var gridCreate = true;
	TGSetEvent("OnRenderFinish","PopUpDlgInvoiceNoGrid",function(gird){ 
		    if(gridCreate){
		    	gridCreate = false;
		    	setData();
		    }	
	});	

	$('#btnDlgInvoiceNoSelect').click(function () { btnDlgInvoiceNoSelectClick(); return false; });
	$('#iconDlgInvoiceNoListSearch').click(function () { dlgInvoiceNoListSearchClick(); return false;});
    $("#txtDlgInvoiceNo").keydown(function(key) {
        if (key.keyCode == 13) {
            dlgInvoiceNoListSearchClick();
        }
    });	
	var gridCode = getGridCode();
	var dlgInvoiceNoGridCol = {
		"Cfg" : {
			"id"				: "PopUpDlgInvoiceNoGrid"
			, "CfgId"			: "PopUpDlgInvoiceNoGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			//, "Version"			: "3"
			, "CacheTimeout" : "100"
			, "AutoVersion"		: "1"
			, "Style"			: "Material"
			, "Size"			: "Low"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
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
			{ "Name": "INVOICE_NO"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridInvoiceNoListDbClick( Grid, Row, Col );"	},
			{ "Name": "EXPORT_NO"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridInvoiceNoListDbClick( Grid, Row, Col );"	},
			{ "Name": "STATUS"				, "Width": "180", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridInvoiceNoListDbClick( Grid, Row, Col );"	}
		]
		, "Header" : {
			"INVOICE_NO"	: "Invoice No" , "Class"	: "gridCenterText"
			, "EXPORT_NO"	: "Export No"
			, "STATUS"	: "Status"
		}
	};	

	dlgInvoiceNoGrid = TreeGrid( {Layout:{Data : dlgInvoiceNoGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridDlgInvoiceNo" );
}

function gridInvoiceNoListDbClick( grid, row, col ) {
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}

function dlgInvoiceNoListSearchClick() {
	$.ajax({
		url: "/getSearchErpInvoiceNoDlg.do",		
		data: {"keyword" : $('#txtDlgInvoiceNo').val(), "keyword2" : $('#txtSearchProjectCode').val()},
		success: function (data, textStatus, jqXHR) {
			dlgInvoiceNoGrid.Source.Data.Data.Body = [data.results];
			dlgInvoiceNoGrid.ReloadBody();
        }
    });
}

function btnDlgInvoiceNoSelectClick() {

	var selectList = dlgInvoiceNoGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert($('#alertDlgInvoiceNoListGridSelectDataNull').val());
		alert_modal("알람", $('#alertDlgInvoiceNoListGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}