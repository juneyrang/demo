var dlgVendorGrid;

var v_trans_vendor_callback = null;
var v_trans_vendor_param;

function initTransVendorPopUp(param , callback) {
	v_trans_vendor_callback = callback;
    v_trans_vendor_param = param; 
    
    $('#dlgTransVendor').modal('show');
    
    initTransVendorPopUpCode();    
}

function initTransVendorPopUpCode() {	
	
	initTransVendorPopUpControls();
}


function initTransVendorPopUpControls() {
	
	$('#dlgTransVendor').on('shown.bs.modal', function () {
		$('#dlgTransVendor').click();
	});
	
	$('#dlgTransVendor').on('hidden.bs.modal', function () {
	  	closeTransVendorPopUp();
	})	
	
	var gridCreate = true;
	
	TGSetEvent("OnRenderFinish","transVendorGrid",function(gird){			
		    if(gridCreate){
		    	gridCreate = false;		    	
		    }
	});		
		var gridCode = getGridCode();
		var dlgVendorGridCol = {
		"Cfg": {
			"id"				: "transVendorGrid"
			, "CfgId"			: "transVendorGridCfg"
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
	   "Cols" : [{ "Name": "VENDOR_CODE", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText ", "OnClickCell"	: "gridSelectRow(Grid,Row,Col);"   },
	   			 { "Name": "VENDOR_NAME", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "USR_NM", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "PHONE_NO", "Width": "200", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   }],
			   "Header" : {"VENDOR_CODE" : "회사코드", "Class"	: "gridCenterText",
			   			   "VENDOR_NAME" : "회사명",
			   			   "USR_NM" : "담당자",
			   			   "PHONE_NO" : "전화번호"} 	
	};	
	
	dlgVendorGrid = TreeGrid( {Layout:{Data : dlgVendorGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransVendorGrid" );	

	$("#txtDlgTransVendorCode").val(v_trans_vendor_param.VENDOR_NAME);
	$("#txtDlgTransVendorName").val(v_trans_vendor_param.VENDOR_NAME);	
	
	$('#btnDlgTransVendorSearch').click(function () { btnDlgTransVendorSearchClick(); return false; });
	$('#btnDlgTransVendorResete').click(function () { btnDlgTransVendorReseteClick(); return false; });
	
    $("#txtDlgTransVendorName").keydown(function(key) {
        if (key.keyCode == 13) {
            $('#btnDlgTransVendorSearch').click();
        }
    });
    
    $("#txtDlgTransVendorCode").keydown(function(key) {
        if (key.keyCode == 13) {
            $('#btnDlgTransVendorSearch').click();
        }
    });
    
    $("#txtDlgTransVendorUsrName").keydown(function(key) {
        if (key.keyCode == 13) {
            $('#btnDlgTransVendorSearch').click();
        }
    });
    
    $("#txtDlgTransVendorPhoneNo").keydown(function(key) {
        if (key.keyCode == 13) {
            $('#btnDlgTransVendorSearch').click();
        }
    });
}

function closeTransVendorPopUp() {
	dlgVendorGrid.Dispose();
}

function btnDlgTransVendorSearchClick() {

	$.ajax({
		url: "/getTransShippingRequestVendorPopUp.do",		
		data: {"VENDOR_NAME" : $('#txtDlgTransVendorName').val(), "VENDOR_CODE" : $('#txtDlgTransVendorCode').val(),
		 	   "USR_NM" : $('#txtDlgTransVendorUsrName').val(), "PHONE_NO" : $('#txtDlgTransVendorPhoneNo').val()},
		success: function (data, textStatus, jqXHR) {
			dlgVendorGrid.Source.Data.Data.Body = [data.results];
			dlgVendorGrid.ReloadBody();
        }
    });		
}

function btnDlgTransVendorReseteClick() {
	$('#txtDlgTransVendorName').val("");
	$('#txtDlgTransVendorCode').val("");
	$('#txtDlgTransVendorUsrName').val("");
	$('#txtDlgTransVendorPhoneNo').val("");
}


function gridSelectRow(Grid,Row,Col) {
	
	var param = Object.assign({}, Row);
	
	if(v_trans_vendor_callback)
	{
		v_trans_vendor_callback("select-item", param);
	}
	
	$('#dlgTransVendor').modal('hide');
}
