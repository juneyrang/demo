var v_idsm_project_mgt_add_callback = null;
var v_idsm_project_mgt_add_param;

var dlgIdsmProjectMgtAddGrid;

function initIdsmProjectMgtAddPopUp(param , callback) {
	v_idsm_project_mgt_add_callback = callback;
    v_idsm_project_mgt_add_param = param;
    
    
    initIdsmProjectMgtAddPopUpCode();    
}

function initIdsmProjectMgtAddPopUpCode() {
    
    initIdsmProjectMgtAddPopUpControls();
}


function initIdsmProjectMgtAddPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmProjectMgtAdd').on('shown.bs.modal', function () {
		$('#dlgIdsmProjectMgtAdd').click();
	});	
	
	$('#dlgIdsmProjectMgtAdd').on('hidden.bs.modal', function () {
	
	  	closeIdsmProjectMgtAddPopUp();
	})	

	$('#dlgIdsmProjectMgtAdd').modal('show');

	TGSetEvent("OnRenderFinish","idsmProjectMgtAddGrid",function(grid){
		//setIdsmProjectMgtAddPopUpData();
	});
	
   $("#txtDlgIdsmProjectMgtAddProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            setIdsmProjectMgtAddPopUpData();
            return false;
        }
    });	
		
	$('#iconDlgIdsmProjectMgtAddSearch').click(function () {
		setIdsmProjectMgtAddPopUpData();
		return false;
	});		

	$('#btnDlgIdsmProjectMgtAddSelect').click(function () { btnDlgIdsmProjectMgtAddSelectClick(); return false; });
	
	
	var gridCode = getGridCode();	
	dlgIdsmProjectMgtAddGridCol = {
		"Cfg" : {
			"id"				: "idsmProjectMgtAddGrid"
			, "CfgId"			: "idsmProjectMgtAddGridCfg"
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
			, "SelectingSingle"	: "0"
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
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmProjectMgtDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmProjectMgtDbClick( Grid, Row, Col );"	}	// Project Description
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
		}
	};
			
	
	dlgIdsmProjectMgtAddGrid = TreeGrid( {Layout:{Data : dlgIdsmProjectMgtAddGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmProjectMgtAdd" ); 
}

function closeIdsmProjectMgtAddPopUp() {
	
	dlgIdsmProjectMgtAddGrid.Dispose();
}

function setIdsmProjectMgtAddPopUpData() {

	if(v_idsm_project_mgt_add_param.TYPE != null && v_idsm_project_mgt_add_param.TYPE == "SITE") {
		searchDesmSiteProjectAdd();
	}
	else {
		searchIdsmProjectMgtAdd();
	}
	 
}

function searchDesmSiteProjectAdd(){

	$.ajax({
		url: "/getDesmSiteProjectDlgProject.do",		
		data: {"keyword" : $('#txtDlgIdsmProjectMgtAddProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmProjectMgtAddGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmProjectMgtAddGrid.ReloadBody();
        }
    });
}

function searchIdsmProjectMgtAdd(){

	$.ajax({
		url: "/getIdsmProjectMgtDlgProject.do",		
		data: {"keyword" : $('#txtDlgIdsmProjectMgtAddProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmProjectMgtAddGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmProjectMgtAddGrid.ReloadBody();
        }
    });
}

function gridIdsmProjectMgtDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	var list = [param];
	if(v_idsm_project_mgt_add_callback)
	{
		v_idsm_project_mgt_add_callback("select-item", list);
	}
	
	$("#dlgIdsmProjectMgtAdd").modal('hide');
}

function btnDlgIdsmProjectMgtAddSelectClick() {
	var selectList = dlgIdsmProjectMgtAddGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var list = selectList[0];
	var param = Object.assign([], selectList);
	if(v_idsm_project_mgt_add_callback)
	{
		v_idsm_project_mgt_add_callback("select-item", param);
	}
	
	$("#dlgIdsmProjectMgtAdd").modal('hide');
}



