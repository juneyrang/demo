var v_desm_po_mpr_no_list_callback = null;
var v_desm_po_mpr_no_list_param;

var dlgDesmPoMprNoListGrid;

function initDesmPoMprNoListPopUp(param , callback) {
	v_desm_po_mpr_no_list_callback = callback;
    v_desm_po_mpr_no_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgDesmPoMprNoListPoNo').val(param.keyword);
    }
    
    
    
    initDesmPoMprNoListPopUpCode();    
}

function initDesmPoMprNoListPopUpCode() {
    
    initDesmPoMprNoListPopUpControls();
}


function initDesmPoMprNoListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	$('#dlgDesmPoMprNoList').modal('show');

	$('#dlgDesmPoMprNoList').on('shown.bs.modal', function () {
		$('#dlgDesmPoMprNoList').click();
	});	
	
	$('#dlgDesmPoMprNoList').on('hidden.bs.modal', function () {
	
	  	closeDesmPoMprNoListPopUp();
	});	
	
   $("#txtDlgDesmPoMprNoListPoNo").keydown(function(key) {
        if (key.keyCode == 13) {
            searchDesmPoMprNoList();
        }
    });	
		
	$('#iconDlgDesmPoMprNoListPoNoSearch').click(function () {
		searchDesmPoMprNoList();
		return false;
	});		

	$('#btnDlgDesmPoMprNoListSelect').click(function () { btnDlgDesmPoMprNoListSelectClick(); return false; });
	
	TGSetEvent("OnRenderFinish","dlgDesmPoMprNoListGrid",function(grid){
		if(v_desm_po_mpr_no_list_param.keyword != null && v_desm_po_mpr_no_list_param.keyword != ""){
			searchDesmPoMprNoList();
		}
		
		if(v_desm_po_mpr_no_list_param.search_type != null && v_desm_po_mpr_no_list_param.search_type == "R") {
			searchDesmPoMprNoList();
		}
	});	
	
	var gridCode = getGridCode();	
	dlgDesmPoMprNoListGridCol = {
		"Cfg" : {
			"id"				: "dlgDesmPoMprNoListGrid"
			, "CfgId"			: "dlgDesmPoMprNoListGridCfg"
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
			{"Name": "PO_NO"	, "Width": "130", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoMprNoDbClick( Grid, Row, Col );"	}
			, {	"Name": "PO_DESCRIPTION"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoMprNoDbClick( Grid, Row, Col );"	}
			, {"Name": "PROMISED_DATE"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoMprNoDbClick( Grid, Row, Col );"	}
			, {"Name": "BUYER"	, "Width": "230", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoMprNoDbClick( Grid, Row, Col );"	}
			, {"Name": "MPR_NO"	, "Width": "190", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridDesmPoMprNoDbClick( Grid, Row, Col );"	}
			, {"Name": "START_MONTH"	, "Width": "0", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"	}
			, {"Name": "END_MONTH"	, "Width": "0", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"	}
		]
		, "Header" : {
			"Class"	: "gridCenterText"
			,"PO_NO"	: "PO No."
			, "PO_DESCRIPTION"	: "PO Description"
			, "PROMISED_DATE"	: "PO Promised Date​"
			, "BUYER"	: "PO Buyer"
			, "MPR_NO"	: "MPR No."
		}
	};
		
	
	dlgDesmPoMprNoListGrid = TreeGrid( {Layout:{Data : dlgDesmPoMprNoListGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgDesmPoMprNoList" ); 
}

function closeDesmPoMprNoListPopUp() {
	
	dlgDesmPoMprNoListGrid.Dispose();
}

function searchDesmPoMprNoList(){
	
	var param = {keyword : $('#txtDlgDesmPoMprNoListPoNo').val(), keyword2 : "", mpr_yn: v_desm_po_mpr_no_list_param.mpr_yn,
				 keyword3 : v_desm_po_mpr_no_list_param.keyword3, "supplier_yn" : v_desm_po_mpr_no_list_param.supplier_yn};

	$.ajax({
		url: "/getDesmMprNoPoList.do",		
		data: param,
		success: function (data, textStatus, jqXHR) {

			dlgDesmPoMprNoListGrid.Source.Data.Data.Body = [data.results];
			dlgDesmPoMprNoListGrid.ReloadBody();
        }
    });
}

function gridDesmPoMprNoDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_desm_po_mpr_no_list_callback)
	{
		v_desm_po_mpr_no_list_callback("select-item", param);
	}
	
	$("#dlgDesmPoMprNoList").modal('hide');
}

function btnDlgDesmPoMprNoListSelectClick() {
	var selectList = dlgDesmPoMprNoListGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_desm_po_mpr_no_list_callback)
	{
		v_desm_po_mpr_no_list_callback("select-item", param);
	}
	
	$("#dlgDesmPoMprNoList").modal('hide');
}



