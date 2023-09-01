var v_idsm_setup_project_list_callback = null;
var v_idsm_setup_project_list_param;

var dlgIdsmSetupProjectGrid;

function initIdsmProjectListPopUp(param , callback) {
	v_idsm_setup_project_list_callback = callback;
    v_idsm_setup_project_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgIdsmSetupProjectListProjectCode').val(param.keyword);
    }
    
    $('#dlgIdsmSetupProjectList').modal('show');
    
    initIdsmProjectListPopUpCode();    
}

function initIdsmProjectListPopUpCode() {
    
    initIdsmProjectListPopUpControls();
}


function initIdsmProjectListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmSetupProjectList').on('shown.bs.modal', function () {
		$('#dlgIdsmSetupProjectList').click();
	});	
	
	$('#dlgIdsmSetupProjectList').on('hidden.bs.modal', function () {
	
	  	closeIdsmSetupProjectListPopUp();
	})	

	TGSetEvent("OnRenderFinish","desmIdsmIdsmSetupProjectGrid",function(grid){
		setIdsmSetupProjectListPopUpData();
	});
	
   $("#txtDlgIdsmSetupProjectListProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            searchIdsmSetupProjectList();
        }
    });	
		
	$('#iconDlgIdsmSetupProjectListSearch').click(function () {
		searchIdsmSetupProjectList();
		return false;
	});		

	$('#btnDlgIdsmSetupProjectListSelect').click(function () { btnDlgIdsmSetupProjectListSelectClick(); return false; });
	
	
	var gridCode = getGridCode();	
	dlgIdsmSetupProjectGridCol = {
		"Cfg" : {
			"id"				: "desmIdsmIdsmSetupProjectGrid"
			, "CfgId"			: "desmIdsmIdsmSetupProjectGridCfg"
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
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupProjectDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "NAME"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupProjectDbClick( Grid, Row, Col );"	}	// Project Description
			, {	"Name": "DATA_YN"		, "Width": "120", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupProjectDbClick( Grid, Row, Col );"	}	// Project Description
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
			, "DATA_YN"	: "Data생성유무"
		}
	};
	
	if(v_idsm_setup_project_list_param.TYPE == "A") {
		dlgIdsmSetupProjectGridCol.Cols = [
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupProjectDbClick( Grid, Row, Col );"	}
			, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupProjectDbClick( Grid, Row, Col );"	}];
			
		dlgIdsmSetupProjectGridCol.Header = {	"SEGMENT1"	: "Project Code"
												, "Class"	: "gridCenterText"
												, "NAME"	: "Project Description" };	
	}		
	
	dlgIdsmSetupProjectGrid = TreeGrid( {Layout:{Data : dlgIdsmSetupProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmSetupProject" ); 
}

function closeIdsmSetupProjectListPopUp() {
	
	dlgIdsmSetupProjectGrid.Dispose();
}

function setIdsmSetupProjectListPopUpData() {

	searchIdsmSetupProjectList(); 
}

function searchIdsmSetupProjectList(){

	$.ajax({
		url: "/getIdsmSetupDlgProject.do",		
		data: {"keyword" : $('#txtDlgIdsmSetupProjectListProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmSetupProjectGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmSetupProjectGrid.ReloadBody();
        }
    });
}

function gridIdsmSetupProjectDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_idsm_setup_project_list_callback)
	{
		v_idsm_setup_project_list_callback("select-item", param);
	}
	
	$("#dlgIdsmSetupProjectList").modal('hide');
}

function btnDlgIdsmSetupProjectListSelectClick() {
	var selectList = dlgIdsmSetupProjectGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_idsm_setup_project_list_callback)
	{
		v_idsm_setup_project_list_callback("select-item", param);
	}
	
	$("#dlgIdsmSetupProjectList").modal('hide');
}



