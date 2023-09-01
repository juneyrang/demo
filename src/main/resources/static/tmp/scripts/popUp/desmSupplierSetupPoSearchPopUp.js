var v_desm_supplier_setup_po_search_callback = null;
var v_desm_supplier_setup_po_search_param;
var dlgDesmSupplierSetupPoSearchGrid;



function initDesmSupplierSetupPoSearchPopUp(param , callback) {
	
	v_desm_supplier_setup_po_search_callback = callback;
    v_desm_supplier_setup_po_search_param = param;   
    
	$('#dlgDesmSupplierSetupPoSearch').on('shown.bs.modal', function () {
		$('#dlgDesmSupplierSetupPoSearch').click();
	});	
	
	$('#dlgDesmSupplierSetupPoSearch').on('hidden.bs.modal', function () {
	  	closeDesmSupplierSetupPoSearchPopUp();
	});	    
    
    initDesmSupplierSetupPoSearchPopUpCode();  
      
}

function initDesmSupplierSetupPoSearchPopUpCode() {  
    
    initDesmSupplierSetupPoSearchPopUpControls();
}


function initDesmSupplierSetupPoSearchPopUpControls() {	
	
	$('#dlgDesmSupplierSetupPoSearch').modal('show');
	

	TGSetEvent("OnRenderFinish","dlgDesmSupplierSetupPoSearchGrid",function(grid){
		searchDlgDesmSupplierSetupPo();	
	});
	
	TGSetEvent("OnCopy","dlgDesmSupplierSetupPoSearchGrid",function(grid, txt){
		copyToClipboard(txt);
	});
	
	var gridCode = getGridCode();
	
	dlgDesmSupplierSetupPoSearchGridCol = {
		"Cfg": {
			"id"				: "dlgDesmSupplierSetupPoSearchGrid"
			, "CfgId"			: "dlgDesmSupplierSetupPoSearchGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "250"
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
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
		"LeftCols": [{	"Name"	: "PO_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned": "1" },
				 	 {	"Name"	: "PO_DESCRIPTION", "Width": "500", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 	 {	"Name"	: "APPROVED_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 	 {	"Name"	: "PROJECT_CODE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 	 {	"Name"	: "PROJECT_NAME", "Width": "400", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],
	    "Head" : [{"Kind"	: "Header",
				  "id" : "Header",
				  "Spanned" : "1",
				  "PanelRowSpan" : "2",
				  "Class" : "gridCenterText",
				  "PO_NO"	: "PO No.", "PO_NORowSpan" : "2",
				  "PO_DESCRIPTION"	: "PO Description", "PO_DESCRIPTIONRowSpan" : "2",
				  "APPROVED_DATE"	: "Approved Date", "APPROVED_DATERowSpan" : "2",
				  "PROJECT_CODE"	: "Project No.", "PROJECT_CODERowSpan" : "2",
				  "PROJECT_NAME"	: "Project Name", "PROJECT_NAMERowSpan" : "2"},
				  {"Kind"	: "Header",
				  "Spanned" : "1",
				  "Class" : "gridCenterText",
				  "PO_NO"	: "PO No.",
				  "PO_DESCRIPTION"	: "PO Description",
				  "APPROVED_DATE"	: "Approved Date",
				  "PROJECT_CODE"	: "Project No.",
				  "PROJECT_NAME"	: "Project Name"}]
	};		
	
	dlgDesmSupplierSetupPoSearchGrid = TreeGrid( {Layout:{Data : dlgDesmSupplierSetupPoSearchGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmSupplierSetupPoSearch" );
}

function closeDesmSupplierSetupPoSearchPopUp() {
	dlgDesmSupplierSetupPoSearchGrid.Dispose();
}

function searchDlgDesmSupplierSetupPo() {
	var paramData = {SUPPLIER_NO : v_desm_supplier_setup_po_search_param.SUPPLIER_NO};	

	$.ajax({
		url: "/getDesmSupplierSetupPoList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			dlgDesmSupplierSetupPoSearchGrid.Source.Data.Data.Body = [data.results];
			dlgDesmSupplierSetupPoSearchGrid.ReloadBody();
			
        }
    });		
}

