var v_idsm_blr_project_list_callback = null;
var v_idsm_blr_project_list_param;

var dlgIdsmBlrProjectGrid;

function initIdsmBlrProjectListPopUp(param , callback) {
	v_idsm_blr_project_list_callback = callback;
    v_idsm_blr_project_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgIdsmBlrProjectListProjectCode').val(param.keyword);
    }
    
    $('#dlgIdsmBlrProjectList').modal('show');
    
    initIdsmBlrProjectListPopUpCode();    
}

function initIdsmBlrProjectListPopUpCode() {
    
    initIdsmBlrProjectListPopUpControls();
}


function initIdsmBlrProjectListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmBlrProjectList').on('shown.bs.modal', function () {
		$('#dlgIdsmBlrProjectList').click();
	});	
	
	$('#dlgIdsmBlrProjectList').on('hidden.bs.modal', function () {
	
	  	closeIdsmBlrProjectListPopUp();
	})	

	TGSetEvent("OnRenderFinish","desmIdsmIdsmBlrProjectGrid",function(grid){
		setIdsmBlrProjectListPopUpData();
	});
	
   $("#txtDlgIdsmBlrProjectListProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            searchIdsmBlrProjectList();
        }
    });	
		
	$('#iconDlgIdsmBlrProjectListSearch').click(function () {
		searchIdsmBlrProjectList();
		return false;
	});		

	$('#btnDlgIdsmBlrProjectListSelect').click(function () { btnDlgIdsmBlrProjectListSelectClick(); return false; });
	
	
	var gridCode = getGridCode();	
	dlgIdsmBlrProjectGridCol = {
		"Cfg" : {
			"id"				: "desmIdsmIdsmBlrProjectGrid"
			, "CfgId"			: "desmIdsmIdsmBlrProjectGridCfg"
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
			{	"Name": "PROJECT_NO"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmBlrProjectDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "PROJECT_DESC"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmBlrProjectDbClick( Grid, Row, Col );"	}	// Project Description
			,{	"Name": "DATA_YN"	, "Width": "120", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmBlrProjectDbClick( Grid, Row, Col );"	}	
		]
		, "Header" : {
			"PROJECT_NO"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "PROJECT_DESC"	: "Project Description"
			, "DATA_YN"	: "Data생성유무"
		}
	};		
	
	dlgIdsmBlrProjectGrid = TreeGrid( {Layout:{Data : dlgIdsmBlrProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmBlrProject" ); 
}

function closeIdsmBlrProjectListPopUp() {
	
	dlgIdsmBlrProjectGrid.Dispose();
}

function setIdsmBlrProjectListPopUpData() {

	searchIdsmBlrProjectList(); 
}

function searchIdsmBlrProjectList(){

	$.ajax({
		url: "/getIdsmBlrDlgProject.do",		
		data: {"keyword" : $('#txtDlgIdsmBlrProjectListProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmBlrProjectGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmBlrProjectGrid.ReloadBody();
        }
    });
}

function gridIdsmBlrProjectDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_idsm_blr_project_list_callback)
	{
		v_idsm_blr_project_list_callback("select-item", param);
	}
	
	$("#dlgIdsmBlrProjectList").modal('hide');
}

function btnDlgIdsmBlrProjectListSelectClick() {
	var selectList = dlgIdsmBlrProjectGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_idsm_blr_project_list_callback)
	{
		v_idsm_blr_project_list_callback("select-item", param);
	}
	
	$("#dlgIdsmBlrProjectList").modal('hide');

}



