var v_desm_mpr_setup_supplier_callback = null;
var v_desm_mpr_setup_supplier_param;
var dlgDesmMprSetupSupplierGrid;

function initDesmMprSetupSupplierPopUp(param , callback) {
	v_desm_mpr_setup_supplier_callback = callback;
    v_desm_mpr_setup_supplier_param = param;    
    
	$('#dlgDesmMprSetupSupplier').on('shown.bs.modal', function () {
		$('#dlgDesmMprSetupSupplier').click();
	});	
	
	$('#dlgDesmMprSetupSupplier').on('hidden.bs.modal', function () {
	  	closeDesmMprSetupSupplierPopUp();
	});
    
    initDesmMprSetupSupplierPopUpCode();    
}

function initDesmMprSetupSupplierPopUpCode() {  
    
    initDesmMprSetupSupplierPopUpControls();
}


function initDesmMprSetupSupplierPopUpControls() {	
	
	$('#dlgDesmMprSetupSupplier').modal('show');	
	
	$('#btnDlgDesmMprSetupSupplierSearch').click(function () { btnDlgDesmMprSetupSupplierSearchClick(); return false; });
	$('#btnDlgDesmMprSetupSupplierResete').click(function () { btnDlgDesmMprSetupSupplierReseteClick(); return false; });
	$('#btnDlgDesmMprSetupSupplierSelect').click(function () { btnDlgDesmMprSetupSupplierSelectClick(); return false; });
	
	
	$("#txtDlgDesmMprSetupSupplierNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMprSetupSupplierSearch').click();
		}
	});	
	
	$("#txtDlgDesmMprSetupSupplierName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMprSetupSupplierSearch').click();
		}
	});			
	
	TGSetEvent("OnRenderFinish","dlgDesmMprSetupSupplierGrid",function(grid){
		
	});
	
	TGSetEvent("OnCopy","dlgDesmMprSetupSupplierGrid",function(grid, txt){
		copyToClipboard(txt);
	});
	
	var gridCode = getGridCode();	
	

	var dlgDesmMprSetupSupplierGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprSetupSupplierGrid"
			, "CfgId"			: "dlgDesmMprSetupSupplierGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
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
			, "Code" : gridCode			
			,"CopyCols" : "0"
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
		}
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "SUPPLIER_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnDblClick": "gridDesmMprSetupSupplierDbClick( Grid, Row, Col );" },
	   	         {	"Name"	: "SUPPLIER_NAME", "Width": "500", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnDblClick": "gridDesmMprSetupSupplierDbClick( Grid, Row, Col );" },
	   	         {	"Name"	: "MAIL", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnDblClick": "gridDesmMprSetupSupplierDbClick( Grid, Row, Col );" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"SUPPLIER_NO"	: "Supplier No.", "SUPPLIER_NORowSpan" : "2",
					"SUPPLIER_NAME"	: "Supplier Name", "SUPPLIER_NAMERowSpan" : "2",
					"MAIL"	: "E-mail", "MAILRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"SUPPLIER_NO"	: "Supplier No.",
					"SUPPLIER_NAME"	: "Supplier Name",
					"MAIL"	: "E-mail"}]
	};	
	
	
	dlgDesmMprSetupSupplierGrid = TreeGrid( {Layout:{Data : dlgDesmMprSetupSupplierGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprSetupSupplier" );	
}

function closeDesmMprSetupSupplierPopUp() {
	dlgDesmMprSetupSupplierGrid.Dispose();
}

function btnDlgDesmMprSetupSupplierSearchClick() {
	var paramData = {SUPPLIER_NO : $('#txtDlgDesmMprSetupSupplierNo').val(), SUPPLIER_NAME : $('#txtDlgDesmMprSetupSupplierName').val()};
	
	$.ajax({
		url: "/getDesmMprSetupSupplierList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			dlgDesmMprSetupSupplierGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprSetupSupplierGrid.ReloadBody();
			
        }
    });		  
}

function btnDlgDesmMprSetupSupplierReseteClick() {
	$("#txtDlgDesmMprSetupSupplierNo").val("");
	$("#txtDlgDesmMprSetupSupplierName").val("");
}

function btnDlgDesmMprSetupSupplierSelectClick() {
	var selectList = dlgDesmMprSetupSupplierGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	if(v_desm_mpr_setup_supplier_callback)
	{
		v_desm_mpr_setup_supplier_callback("select-item", selectList);
	}
	
	$("#dlgDesmMprSetupSupplier").modal('hide');
}

function gridDesmMprSetupSupplierDbClick( grid, row, col ) {
	var selectList = [];
	var param = Object.assign({}, row);
	selectList.push(param);
	if(v_desm_mpr_setup_supplier_callback)
	{
		v_desm_mpr_setup_supplier_callback("select-item", selectList);
	}
	
	$("#dlgDesmMprSetupSupplier").modal('hide');
}


