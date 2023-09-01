var v_desm_po_list_callback = null;
var v_desm_po_list_param;

var dlgDesmPoListGrid;

function initDesmPoListPopUp(param , callback) {
	v_desm_po_list_callback = callback;
    v_desm_po_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgDesmPoListPoNo').val(param.keyword);
    }
    
    
    
    initDesmPoListPopUpCode();    
}

function initDesmPoListPopUpCode() {
    
    initDesmPoListPopUpControls();
}


function initDesmPoListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	$('#dlgDesmPoList').modal('show');

	$('#dlgDesmPoList').on('shown.bs.modal', function () {
		$('#dlgDesmPoList').click();
	});	
	
	$('#dlgDesmPoList').on('hidden.bs.modal', function () {
	
	  	closeDesmPoListPopUp();
	});	
	
   $("#txtDlgDesmPoListPoNo").keydown(function(key) {
        if (key.keyCode == 13) {
            searchDesmPoList();
        }
    });	
		
	$('#iconDlgDesmPoListPoNoSearch').click(function () {
		searchDesmPoList();
		return false;
	});		

	$('#btnDlgDesmPoListSelect').click(function () { btnDlgDesmPoListSelectClick(); return false; });
	
	TGSetEvent("OnRenderFinish","dlgDesmPoListGrid",function(grid){
		if(v_desm_po_list_param.keyword != null && v_desm_po_list_param.keyword != ""){
			searchDesmPoList();
		}
		
		if(v_desm_po_list_param.search_type != null && v_desm_po_list_param.search_type == "R") {
			searchDesmPoList();
		}
	});	
	
	var gridCode = getGridCode();	
	dlgDesmPoListGridCol = {
		"Cfg" : {
			"id"				: "dlgDesmPoListGrid"
			, "CfgId"			: "dlgDesmPoListGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
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
			{"Name": "PO_NO"	, "Width": "130", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoDbClick( Grid, Row, Col );"	}
			, {	"Name": "PO_DESCRIPTION"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoDbClick( Grid, Row, Col );"	}
			, {"Name": "PROMISED_DATE"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoDbClick( Grid, Row, Col );"	}
			, {"Name": "BUYER"	, "Width": "230", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoDbClick( Grid, Row, Col );"	}
		]
		, "Header" : {
			"Class"	: "gridCenterText"
			,"PO_NO"	: "PO No."
			, "PO_DESCRIPTION"	: "PO Description"
			, "PROMISED_DATE"	: "PO Promised Date​"
			, "BUYER"	: "PO Buyer"
		}
	};
		
	
	dlgDesmPoListGrid = TreeGrid( {Layout:{Data : dlgDesmPoListGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgDesmPoList" ); 
}

function closeDesmPoListPopUp() {
	
	dlgDesmPoListGrid.Dispose();
}

function searchDesmPoList(){
	
	var param = {keyword : $('#txtDlgDesmPoListPoNo').val(), keyword2 : "",
				 keyword3 : v_desm_po_list_param.keyword3, "supplier_yn" : v_desm_po_list_param.supplier_yn
				 , "mpr_yn" : v_desm_po_list_param.mpr_yn};

	$.ajax({
		url: "/getDesmMprPoList.do",		
		data: param,
		success: function (data, textStatus, jqXHR) {

			dlgDesmPoListGrid.Source.Data.Data.Body = [data.results];
			dlgDesmPoListGrid.ReloadBody();
        }
    });
}

function gridDesmPoDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_desm_po_list_callback)
	{
		v_desm_po_list_callback("select-item", param);
	}
	
	$("#dlgDesmPoList").modal('hide');
}

function btnDlgDesmPoListSelectClick() {
	var selectList = dlgDesmPoListGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_desm_po_list_callback)
	{
		v_desm_po_list_callback("select-item", param);
	}
	
	$("#dlgDesmPoList").modal('hide');
}



