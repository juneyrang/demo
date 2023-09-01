var dlgTransDeptUsrGrid;

var v_trans_dept_usr_callback = null;
var v_trans_dept_usr_param;

function initTransDeptUsrPopUp(param , callback) {
	v_trans_dept_usr_callback = callback;
    v_trans_dept_usr_param = param; 
    
    $('#dlgTransDeptUsr').modal('show');
    
    initTransDeptUsrPopUpCode();    
}

function initTransDeptUsrPopUpCode() {	
	
	initTransDeptUsrPopUpControls();
}


function initTransDeptUsrPopUpControls() {
	
	$('#dlgTransVendor').on('shown.bs.modal', function () {
		$('#dlgTransDeptUsr').click();
	});
	
	$('#dlgTransVendor').on('hidden.bs.modal', function () {
	  	closeTransDeptUsrPopUp();
	})	
	
	var gridCreate = true;	
	
		var gridCode = getGridCode();
		var dlgTransDeptUsrGridCol = {
		"Cfg": {
			"id"				: "transDeptUsrGrid"
			, "CfgId"			: "transDeptUsrGridCfg"
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
	   "Cols" : [{ "Name": "DEPT_CODE", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "DEPT_NAME", "Width": "300", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "EMP_NAME", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText ", "OnClickCell"	: "gridSelectRow(Grid,Row,Col);"   },
	   			 { "Name": "PHONE_NO", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   }],
			   "Header" : {"DEPT_CODE" : "부서코드", "Class"	: "gridCenterText",
			   			   "DEPT_NAME" : "부서명",
			   			   "EMP_NAME" : "담당자",
			   			   "PHONE_NO" : "전화번호"} 	
	};	
	
	dlgTransDeptUsrGrid = TreeGrid( {Layout:{Data : dlgTransDeptUsrGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransDeptUsrGrid" );	

	$('#btnDlgTransDeptUsrSearch').click(function () { btnDlgTransDeptUsrSearchClick(); return false; });
	
    $("#txtDlgTransUsr").keydown(function(key) {
        if (key.keyCode == 13) {
            $('#btnDlgTransDeptUsrSearch').click();
        }
    });
    
    $("#txtDlgTransDept").keydown(function(key) {
        if (key.keyCode == 13) {
            $('#btnDlgTransDeptUsrSearch').click();
        }
    });	
}

function closeTransDeptUsrPopUp() {
	dlgTransDeptUsrGrid.Dispose();
}

function btnDlgTransDeptUsrSearchClick() {

	$.ajax({
		url: "/getTransShippingRequestDeptPopUp.do",		
		data: {"EMP_NAME" : $('#txtDlgTransUsr').val(), "DEPT_NAME" : $('#txtDlgTransDept').val()},
		success: function (data, textStatus, jqXHR) {
			dlgTransDeptUsrGrid.Source.Data.Data.Body = [data.results];
			dlgTransDeptUsrGrid.ReloadBody();
        }
    });		
}


function gridSelectRow(Grid,Row,Col) {
	
	var param = Object.assign({}, Row);
	
	if(v_trans_dept_usr_callback)
	{
		v_trans_dept_usr_callback("select-item", param);
	}
	
	$('#dlgTransDeptUsr').modal('hide');
}
