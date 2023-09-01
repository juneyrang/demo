var v_idsm_setup_mpr_project_list_callback = null;
var v_idsm_setup_mpr_project_list_param;

var dlgIdsmSetupMprProjectGrid;

function initIdsmMprProjectListPopUp(param , callback) {
	v_idsm_setup_mpr_project_list_callback = callback;
    v_idsm_setup_mpr_project_list_param = param;

    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgIdsmSetupMprProjectListMprProjectCode').val(param.keyword);
    }

    $('#dlgIdsmSetupMprProjectList').modal('show');

    initIdsmMprProjectListPopUpCode();
}

function initIdsmMprProjectListPopUpCode() {

    initIdsmMprProjectListPopUpControls();
}


function initIdsmMprProjectListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmSetupMprProjectList').on('shown.bs.modal', function () {
		$('#dlgIdsmSetupMprProjectList').click();
	});

	$('#dlgIdsmSetupMprProjectList').on('hidden.bs.modal', function () {

	  	closeIdsmSetupMprProjectListPopUp();
	})

	TGSetEvent("OnRenderFinish","desmIdsmIdsmSetupMprProjectGrid",function(grid){
		setIdsmSetupMprProjectListPopUpData();
	});

   $("#txtDlgIdsmSetupMprProjectListMprProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            searchIdsmSetupMprProjectList();
        }
    });

	$('#iconDlgIdsmSetupMprProjectListSearch').click(function () {
		searchIdsmSetupMprProjectList();
		return false;
	});

	$('#btnDlgIdsmSetupMprProjectListSelect').click(function () { btnDlgIdsmSetupMprProjectListSelectClick(); return false; });


	var gridCode = getGridCode();
	dlgIdsmSetupMprProjectGridCol = {
		"Cfg" : {
			"id"				: "desmIdsmIdsmSetupMprProjectGrid"
			, "CfgId"			: "desmIdsmIdsmSetupMprProjectGridCfg"
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
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupMprProjectDbClick( Grid, Row, Col );"	}	// MprProject Code
			, {	"Name": "NAME"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupMprProjectDbClick( Grid, Row, Col );"	}	// MprProject Description
			, {	"Name": "DATA_YN"		, "Width": "120", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupMprProjectDbClick( Grid, Row, Col );"	}	// MprProject Description
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
			, "DATA_YN"	: "Data생성유무"
		}
	};

	if(v_idsm_setup_mpr_project_list_param.TYPE == "A") {
		dlgIdsmSetupMprProjectGridCol.Cols = [
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupMprProjectDbClick( Grid, Row, Col );"	}
			, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupMprProjectDbClick( Grid, Row, Col );"	}];

		dlgIdsmSetupMprProjectGridCol.Header = {	"SEGMENT1"	: "Project Code"
												, "Class"	: "gridCenterText"
												, "NAME"	: "Project Description" };
	}

	dlgIdsmSetupMprProjectGrid = TreeGrid( {Layout:{Data : dlgIdsmSetupMprProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmSetupMprProject" );
}

function closeIdsmSetupMprProjectListPopUp() {

	dlgIdsmSetupMprProjectGrid.Dispose();
}

function setIdsmSetupMprProjectListPopUpData() {

	searchIdsmSetupMprProjectList();
}

function searchIdsmSetupMprProjectList(){

	$.ajax({
		url: "/getIdsmSetupDlgMprProject.do",
		data: {"keyword" : $('#txtDlgIdsmSetupMprProjectListMprProjectCode').val()},
		success: function (data, textStatus, jqXHR) {
			dlgIdsmSetupMprProjectGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmSetupMprProjectGrid.ReloadBody();
        }
    });
}

function gridIdsmSetupMprProjectDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_idsm_setup_mpr_project_list_callback)
	{
		v_idsm_setup_mpr_project_list_callback("select-item", param);
	}

	$("#dlgIdsmSetupMprProjectList").modal('hide');
}

function btnDlgIdsmSetupMprProjectListSelectClick() {
	var selectList = dlgIdsmSetupMprProjectGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_idsm_setup_mpr_project_list_callback)
	{
		v_idsm_setup_mpr_project_list_callback("select-item", param);
	}

	$("#dlgIdsmSetupMprProjectList").modal('hide');
}



