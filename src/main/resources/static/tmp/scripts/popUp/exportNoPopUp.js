var dlgExportNoGrid;

var v_callback = null;
var v_param;

function setData() {
	$('#txtDlgExportNo').val(v_param.EXPORT_NO);
	if ($('#txtDlgExportNo').val() != "")
		dlgExportNoListSearchClick();	    
}

function initPopUp(param , callback) {
	v_callback = callback;
    v_param = param;
    
    initPopUpControls();
}

function closePopUp() {
	dlgExportNoGrid.Dispose();
}

function initPopUpControls() {
	var gridCreate = true;
	TGSetEvent("OnRenderFinish","PopUpDlgExportNoGrid",function(gird){ 
		    if(gridCreate){
		    	gridCreate = false;
		    	setData();
		    }	
	});	

	$('#btnDlgExportNoSelect').click(function () { btnDlgExportNoSelectClick(); return false; });
	$('#iconDlgExportNoListSearch').click(function () { dlgExportNoListSearchClick(); return false;});
    $("#txtDlgExportNo").keydown(function(key) {
        if (key.keyCode == 13) {
            dlgExportNoListSearchClick();
        }
    });	
	var gridCode = getGridCode();
	var dlgExportNoGridCol = {
		"Cfg" : {
			"id"				: "PopUpDlgExportNoGrid"
			, "CfgId"			: "PopUpDlgExportNoGridCfg"
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
			{ "Name": "EXPORT_NO"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridExportNoListDbClick( Grid, Row, Col );"	},
			{ "Name": "STATUS"				, "Width": "180", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridExportNoListDbClick( Grid, Row, Col );"	},
			{ "Name": "EXPORT_HEADER_ID"	, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridExportNoListDbClick( Grid, Row, Col );"	}
		]
		, "Header" : {
			"EXPORT_NO"	: "Export No" , "Class"	: "gridCenterText"
			, "STATUS"	: "Status"
			, "EXPORT_HEADER_ID"	: "Export Header Id"
		}
	};	

	dlgExportNoGrid = TreeGrid( {Layout:{Data : dlgExportNoGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridDlgExportNo" );
}

function gridExportNoListDbClick( grid, row, col ) {
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}

function dlgExportNoListSearchClick() {
	$.ajax({
		url: "/getSearchExportNoDlg.do",		
		data: {"keyword" : $('#txtDlgExportNo').val(), "keyword2" : $('#txtSearchProjectCode').val()},
		success: function (data, textStatus, jqXHR) {
			dlgExportNoGrid.Source.Data.Data.Body = [data.results];
			dlgExportNoGrid.ReloadBody();
        }
    });
}

function btnDlgExportNoSelectClick() {

	var selectList = dlgExportNoGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert($('#alertDlgExportNoListGridSelectDataNull').val());
		alert_modal("알람", $('#alertDlgExportNoListGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}