var dlgCmmonSelectGrid;

var v_callback = null;
var v_param;

function setData() {
	$('#txtDlgCmmonSelect').val(v_param.keyword);
	if ($('#txtDlgCmmonSelect').val() != "")
		dlgCmmonSelectSearchClick();	    
}

function initPopUp(param , callback) {
	v_callback = callback;
    v_param = param;
	    
	if(v_param.modalTtile != null){
		$('#dlgCmmonSelectTitle').text(v_param.modalTtile); 
	}
    
    initPopUpControls();
}

function closePopUp() {
	dlgCmmonSelectGrid.Dispose();
}

function initPopUpControls() {
	var gridCreate = true;
	TGSetEvent("OnRenderFinish","PopUpDlgCmmonSelectGrid",function(gird){ 
		    if(gridCreate){
		    	gridCreate = false;
		    	setData();
		    }	
	});	

	$('#btnDlgCmmonSelect').click(function () { btnDlgCmmonSelectClick(); return false; });
	$('#iconDlgCmmonSelectSearch').click(function () { dlgCmmonSelectSearchClick(); return false;});
    $("#txtDlgCmmonSelect").keydown(function(key) {
        if (key.keyCode == 13) {
            dlgCmmonSelectSearchClick();
        }
    });	
	
	var gridCode = getGridCode();
	var dlgCmmonSelectGridCol = {
		"Cfg" : {
			"id"				: "PopUpDlgCmmonSelectGrid"
			, "CfgId"			: "PopUpDlgCmmonSelectGridCfg"
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
		, "Cols" : v_param.cols
		// [
		//	{ "Name": "INVOICE_NO"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );"	},
		//	{ "Name": "EXPORT_NO"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );"	},
		//	{ "Name": "STATUS"				, "Width": "180", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridCmmonSelectDbClick( Grid, Row, Col );"	}
		//]
		, "Header" : v_param.headers
		//{
		//	"INVOICE_NO"	: "Invoice No" , "Class"	: "gridCenterText"
		//	, "EXPORT_NO"	: "Export No"
		//	, "STATUS"	: "Status"
		//}
	};	

	dlgCmmonSelectGrid = TreeGrid( {Layout:{Data : dlgCmmonSelectGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridDlgCmmonSelect" );
}

function gridCmmonSelectDbClick( grid, row, col ) {
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}

function dlgCmmonSelectSearchClick() {
	$.ajax({
		url: v_param.url, //"/getSearchErpCmmonSelectDlg.do",		
		data: { "keyword" : $('#txtDlgCmmonSelect').val(), "keyword2" : v_param.keyword2 },
		success: function (data, textStatus, jqXHR) {
			dlgCmmonSelectGrid.Source.Data.Data.Body = [data.results];
			dlgCmmonSelectGrid.ReloadBody();
        }
    });
}

function btnDlgCmmonSelectClick() {

	var selectList = dlgCmmonSelectGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert($('#alertDlgCmmonSelectGridSelectDataNull').val());
		alert_modal("알람", $('#alertDlgCmmonSelectGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}
