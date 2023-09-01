var dlgPortTypeGrid;

var v_trans_port_callback = null;
var v_trans_port_param;

function initTransPortPopUp(param , callback) {
	v_trans_port_callback = callback;
    v_trans_port_param = param;
    
    if(param.modalTitle != null){
    	$('#dlgPortTitle').text(param.modalTitle);
    }
    
    initTransPortPopUpCode();    
}

function initTransPortPopUpCode() {	
	
	initTransPortPopUpControls();
}


function initTransPortPopUpControls() {
	
	$('#dlgPort').on('shown.bs.modal', function () {
		$('#dlgPort').click();
	});
	
	$('#dlgPort').on('hidden.bs.modal', function () {
	  	closeTransPortPopUp();
	})	
	
	var gridCreate = true;
	
	TGSetEvent("OnRenderFinish","transShippingInvoiceDlgPortTypeGridCol",function(gird){			
		    if(gridCreate){
		    	gridCreate = false;
		    	setTransPortPopUpData();
		    }
	});		
		var gridCode = getGridCode();
		var dlgPortTypeGridCol = {
		"Cfg": {
			"id"				: "transShippingInvoiceDlgPortTypeGridCol"
			, "CfgId"			: "transShippingInvoiceDlgPortTypeGridColCfg"
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
	   "Cols" : [{ "Name": "PORT_TYPE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "PORT_CODE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText ", "OnClickCell"	: "gridSelectRow(Grid,Row,Col);"   },
	   			 { "Name": "PORT_NAME", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "COUNTRY", "Width": "150", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   },
	   			 { "Name": "COUNTRY_CODE", "Width": "120", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"   }],
			   "Header" : {"PORT_TYPE" : "PORT_TYPE", "Class"	: "gridCenterText",
			   			   "PORT_CODE" : "PORT_CODE",
			   			   "PORT_NAME" : "PORT_NAME",
			   			   "COUNTRY" : "COUNTRY",
			   			   "COUNTRY_CODE" : "COUNTRY_CODE"} 	
	};	
	
	dlgPortTypeGrid = TreeGrid( {Layout:{Data : dlgPortTypeGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgPortType" );
	
	$('#rdoDlgPortPortType_1').prop("checked",true);
	$('#rdoDlgPortPortType_2').prop("checked",false);
	$('#rdoDlgPortPortType_3').prop("checked",false);
	
	$('#iconDlgPortSearch').click(function () { iconDlgPortSearchClick(); return false; });
    $("#txtDlgPortSearch").keydown(function(key) {
        if (key.keyCode == 13) {
            iconDlgPortSearchClick();
        }
    });	
}

function closeTransPortPopUp() {
	dlgPortTypeGrid.Dispose();
}


function setTransPortPopUpData() {
	
	if(v_trans_port_param.PORT != null && v_trans_port_param.PORT != ""){
		$('#txtDlgPortSearch').val(v_trans_port_param.PORT);
		iconDlgPortSearchClick();
	}
}

function iconDlgPortSearchClick() {
	$.ajax({
		url: "/getTransShippingInvoiceDlgPort.do",		
		data: {"PORT_TYPE" : $('input[name=rdoDlgPortPortType]:checked').val(), "keyword" : $('#txtDlgPortSearch').val() },
		success: function (data, textStatus, jqXHR) {
			dlgPortTypeGrid.Source.Data.Data.Body = [data.results];
			dlgPortTypeGrid.ReloadBody();
        }
    });		
}

function gridSelectRow(Grid,Row,Col) {
	
	var param = Object.assign({}, Row);
	
	if(v_trans_port_callback)
	{
		v_trans_port_callback("select-item", param);
	}
}
