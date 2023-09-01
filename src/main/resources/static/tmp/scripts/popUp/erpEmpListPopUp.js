var dlgEmpGrid;

var v_callback = null;
var v_param;

function setData() {
	$('#txtDlgEmp').val(v_param.EMP_KEY);
	if ($('#txtDlgEmp').val() != "")
		dlgEmpListSearchClick();	    
}

function initPopUp(param , callback) {
	v_callback = callback;
    v_param = param;
    
    initPopUpControls();
}

function closePopUp() {
	dlgEmpGrid.Dispose();
}

function initPopUpControls() {
	var gridCreate = true;
	TGSetEvent("OnRenderFinish","PopUpDlgEmpGrid",function(gird){ 
		    if(gridCreate){
		    	gridCreate = false;
		    	setData();
		    }	
	});	

	$('#btnDlgEmpSelect').click(function () { btnDlgEmpSelectClick(); return false; });
	$('#iconDlgEmpListSearch').click(function () { dlgEmpListSearchClick(); return false;});
    $("#txtDlgEmp").keydown(function(key) {
        if (key.keyCode == 13) {
            dlgEmpListSearchClick();
        }
    });	
	var gridCode = getGridCode();
	var dlgEmpGridCol = {
		"Cfg" : {
			"id"				: "PopUpDlgEmpGrid"
			, "CfgId"			: "PopUpDlgEmpGridCfg"
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
			{ "Name": "NAME"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridEmpListDbClick( Grid, Row, Col );"	},
			{ "Name": "EMPLOYEE_NUMBER"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridEmpListDbClick( Grid, Row, Col );"	},
			{ "Name": "DEPT_NAME"				, "Width": "180", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridEmpListDbClick( Grid, Row, Col );"	},
			{ "Name": "EMAIL_ADDRESS"				, "Width": "180", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridEmpListDbClick( Grid, Row, Col );"	},
			{ "Name": "USER_ID"			, "Width": "150", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridEmpListDbClick( Grid, Row, Col );"	},
		]
		, "Header" : {
			"NAME"	: "성명" , "Class"	: "gridCenterText"
			, "EMPLOYEE_NUMBER"	: "AD"
			, "DEPT_NAME"	: "부서"
			, "EMAIL_ADDRESS": "Email"
			, "USER_ID"	: "ERP ID"
			
		}
	};	

	dlgEmpGrid = TreeGrid( {Layout:{Data : dlgEmpGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"gridDlgEmp" );
}

function gridEmpListDbClick( grid, row, col ) {
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}

function dlgEmpListSearchClick() {
	$.ajax({
		url: "/getSearchErpEmployeeDlg.do",		
		data: {"keyword" : $('#txtDlgEmp').val()},
		success: function (data, textStatus, jqXHR) {
			dlgEmpGrid.Source.Data.Data.Body = [data.results];
			dlgEmpGrid.ReloadBody();
        }
    });
}

function btnDlgEmpSelectClick() {

	var selectList = dlgEmpGrid.GetSelRows();
	
	if(selectList.length == 0){
		//alert($('#alertDlgEmpListGridSelectDataNull').val());
		alert_modal("알람", $('#alertDlgEmpListGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	
	if(v_callback)
	{
		v_callback("select-item", row);
	}
}