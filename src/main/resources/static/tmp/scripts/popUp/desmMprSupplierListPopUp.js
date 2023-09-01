var v_desm_mpr_supplier_list_callback = null;
var v_desm_mpr_supplier_list_param;

var dlgDesmMprSupplierListGrid;

function initDesmMprSupplierListPopUp(param , callback) {
	
	v_desm_mpr_supplier_list_callback = callback;
    v_desm_mpr_supplier_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgDesmMprSupplierListSupplierNo').val(param.keyword);
    }
    
    initDesmMprSupplierListPopUpCode();    
}

function initDesmMprSupplierListPopUpCode() {
    
    initDesmMprSupplierListPopUpControls();
}


function initDesmMprSupplierListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	$('#dlgDesmMprSupplierList').modal('show');

	$('#dlgDesmMprSupplierList').on('shown.bs.modal', function () {
		$('#dlgDesmMprSupplierList').click();
	});	
	
	$('#dlgDesmMprSupplierList').on('hidden.bs.modal', function () {
	
	  	closeDesmMprSupplierListPopUp();
	});	
	
   $("#txtDlgDesmMprSupplierListSupplierNo").keydown(function(key) {
        if (key.keyCode == 13) {
            searchDesmMprSupplierList();
        }
    });	
		
	$('#iconDlgDesmPoListPoNoSearch').click(function () {
		searchDesmMprSupplierList();
		return false;
	});		

	$('#btnDlgDesmMprSupplierListSelect').click(function () { btnDlgDesmMprSupplierListSelectClick(); return false; });
	$('#iconDlgDesmMprSupplierListSupplierNoSearch').click(function () { iconDlgDesmMprSupplierListSupplierNoSearchClick(); return false; });
	
	TGSetEvent("OnRenderFinish","dlgDesmMprSupplierListGrid",function(grid){
		if(v_desm_mpr_supplier_list_param.keyword != null && v_desm_mpr_supplier_list_param.keyword != ""){
			searchDesmMprSupplierList();
		}
	});	
	
	var gridCode = getGridCode();	
	dlgDesmMprSupplierListGridCol = {
		"Cfg" : {
			"id"				: "dlgDesmMprSupplierListGrid"
			, "CfgId"			: "dlgDesmMprSupplierListGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "2"
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
			{"Name": "SEGMENT1"	, "Width": "200", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmSupplierDbClick( Grid, Row, Col );"	}
			, {	"Name": "VENDOR_NAME"		, "Width": "600", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmSupplierDbClick( Grid, Row, Col );"	}
		]
		, "Header" : {
			"Class"	: "gridCenterText"
			, "SEGMENT1"	: "Supplier No.​"
			, "VENDOR_NAME"	: "Supplier Name"
		}
	};
		
	
	dlgDesmMprSupplierListGrid = TreeGrid( {Layout:{Data : dlgDesmMprSupplierListGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgDesmMprSupplierList" ); 
}

function closeDesmMprSupplierListPopUp() {
	
	dlgDesmMprSupplierListGrid.Dispose();
}

function searchDesmMprSupplierList(){
	
	var param = {keyword : $('#txtDlgDesmMprSupplierListSupplierNo').val()};

	$.ajax({
		url: "/getDesmDlgMprSupplierList.do",		
		data: param,
		success: function (data, textStatus, jqXHR) {

			dlgDesmMprSupplierListGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprSupplierListGrid.ReloadBody();
			
        }
    });
}

function gridDesmSupplierDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_desm_mpr_supplier_list_callback)
	{
		v_desm_mpr_supplier_list_callback("select-item", param);
	}
	
	$("#dlgDesmMprSupplierList").modal('hide');
}

function btnDlgDesmMprSupplierListSelectClick() {
	var selectList = dlgDesmMprSupplierListGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_desm_mpr_supplier_list_callback)
	{
		v_desm_mpr_supplier_list_callback("select-item", param);
	}
	
	$("#dlgDesmMprSupplierList").modal('hide');
}

function iconDlgDesmMprSupplierListSupplierNoSearchClick() {
	searchDesmMprSupplierList();
}
