var v_desm_supplier_list_callback = null;
var v_desm_supplier_list_param;

var dlgDesmSupplierListGrid;

function initDesmSupplierListPopUp(param , callback) {
	
	v_desm_supplier_list_callback = callback;
    v_desm_supplier_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgdlgDesmSupplierListSupplierNo').val(param.keyword);
    }
    
    initDesmSupplierListPopUpCode();    
}

function initDesmSupplierListPopUpCode() {
    
    initDesmSupplierListPopUpControls();
}


function initDesmSupplierListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	$('#dlgDesmSupplierList').modal('show');

	$('#dlgDesmSupplierList').on('shown.bs.modal', function () {
		$('#dlgDesmSupplierList').click();
	});	
	
	$('#dlgDesmSupplierList').on('hidden.bs.modal', function () {
	
	  	closeDesmSupplierListPopUp();
	});	
	
   $("#txtDlgdlgDesmSupplierListSupplierNo").keydown(function(key) {
        if (key.keyCode == 13) {
            searchDesmSupplierList();
        }
    });	
		
	$('#iconDlgDesmPoListPoNoSearch').click(function () {
		searchDesmSupplierList();
		return false;
	});		

	$('#btnDlgDesmSupplierListSelect').click(function () { btnDlgDesmSupplierListSelectClick(); return false; });
	$('#iconDlgDesmSupplierListSupplierNoSearch').click(function () { iconDlgDesmSupplierListSupplierNoSearchClick(); return false; });
	$('#btnDlgDesmSupplierListAdd').click(function () { btnDlgDesmSupplierListAddClick(); return false; });
	
	TGSetEvent("OnRenderFinish","dlgDesmSupplierListGrid",function(grid){
		if(v_desm_supplier_list_param.keyword != null && v_desm_supplier_list_param.keyword != ""){
			searchDesmSupplierList();
		}
	});	
	
	var gridCode = getGridCode();	
	dlgDesmSupplierListGridCol = {
		"Cfg" : {
			"id"				: "dlgDesmSupplierListGrid"
			, "CfgId"			: "dlgDesmSupplierListGridCfg"
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
		
	
	dlgDesmSupplierListGrid = TreeGrid( {Layout:{Data : dlgDesmSupplierListGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgDesmSupplierList" ); 
}

function closeDesmSupplierListPopUp() {
	
	dlgDesmSupplierListGrid.Dispose();
}

function searchDesmSupplierList(){
	
	var param = {keyword : $('#txtDlgdlgDesmSupplierListSupplierNo').val()};

	$.ajax({
		url: "/getDesmDlgSupplierList.do",		
		data: param,
		success: function (data, textStatus, jqXHR) {

			dlgDesmSupplierListGrid.Source.Data.Data.Body = [data.results];
			dlgDesmSupplierListGrid.ReloadBody();
			
			(data.results && data.results.length > 0) ? $('#btnDlgDesmSupplierListAdd').hide() : $('#btnDlgDesmSupplierListAdd').show();
        }
    });
}

function gridDesmSupplierDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_desm_supplier_list_callback)
	{
		v_desm_supplier_list_callback("select-item", param);
	}
	
	$("#dlgDesmSupplierList").modal('hide');
}

function btnDlgDesmSupplierListSelectClick() {
	var selectList = dlgDesmSupplierListGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_desm_supplier_list_callback)
	{
		v_desm_supplier_list_callback("select-item", param);
	}
	
	$("#dlgDesmSupplierList").modal('hide');
}

function iconDlgDesmSupplierListSupplierNoSearchClick() {
	searchDesmSupplierList();
}

function btnDlgDesmSupplierListAddClick() {
	if(v_desm_supplier_list_callback)
	{
		v_desm_supplier_list_callback("add-item", null);
	}
	
	$("#dlgDesmSupplierList").modal('hide');
}
