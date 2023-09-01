var dlgProjectGrid;

var v_callback = null;
var v_param;

function setData() {
	$('#txtDlgProjectProjectCode').val(v_param.PROJECT_CODE);
	dlgProjectListSearchClick();	    
}

function initPopUp(param , callback) {
	v_callback = callback;
    v_param = param;
    
    initPopUpControls();

}

function closePopUp() {
	dlgProjectGrid.Dispose();
}

function initPopUpControls() {

	var gridCreate = true;
	TGSetEvent("OnRenderFinish","transPopUpDlgProjectGrid",function(gird){ 
		    if(gridCreate){
		    	gridCreate = false;
		    	setData();
		    }	
	});
	
	$('#dlgProjectList').on('shown.bs.modal', function () {
		$('#dlgProjectList').click();
	});	
	
	$('#dlgProjectList').on('hidden.bs.modal', function () {
	  	closePopUp();
	})			

	$('#btnDlgProjectSelect').click(function () { btnDlgProjectSelectClick(); return false; });
	
	$('#iconDlgProjectListSearch').click(function () { dlgProjectListSearchClick(); return false;});
    $("#txtDlgProjectProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            dlgProjectListSearchClick();
        }
    });	
	var gridCode = getGridCode();
	var dlgProjectGridCol = {
		"Cfg" : {
			"id"				: "transPopUpDlgProjectGrid"
			, "CfgId"			: "transPopUpDlgProjectGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "3"
			, "CacheTimeout" : "100"
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
			{	"Name": "PROJECT_CODE"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "PROJECT_DESC"		, "Width": "500", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Description
		]
		, "Header" : {
			"PROJECT_CODE"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "PROJECT_DESC"	: "Project Description"
		}
	};	

	dlgProjectGrid = TreeGrid( {Layout:{Data : dlgProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridDlgProject" );
}

function gridProjectListDbClick( grid, row, col ) {
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}

function dlgProjectListSearchClick() {
	$.ajax({
		url: "/getTransDlgProject.do",		
		data: {"keyword" : $('#txtDlgProjectProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgProjectGrid.Source.Data.Data.Body = [data.results];
			dlgProjectGrid.ReloadBody();
        }
    });
}

function btnDlgProjectSelectClick() {

	var selectList = dlgProjectGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert($('#alertDlgProjectListGridSelectDataNull').val());
		alert_modal("알람", $('#alertDlgProjectListGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}