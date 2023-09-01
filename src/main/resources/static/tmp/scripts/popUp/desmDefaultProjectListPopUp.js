var v_desm_default_project_callback = null;
var v_desm_default_project_param;

var dlgDesmDefaultProjectGrid;

function initDesmDefaultProjectPopUp(param , callback) {
	v_desm_default_project_callback = callback;
    v_desm_default_project_param = param;
    
    initDesmDefaultProjectPopUpCode();    
}

function initDesmDefaultProjectPopUpCode() {
    
    initDesmDefaultProjectPopUpControls();
}


function initDesmDefaultProjectPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgDesmDefaultProject').on('shown.bs.modal', function () {
		$('#dlgDesmDefaultProject').click();
	});	
	
	$('#dlgDesmDefaultProject').on('hidden.bs.modal', function () {
	
	  	closeDesmDefaultProjectPopUp();
	})	

	$('#dlgDesmDefaultProject').modal('show');

	TGSetEvent("OnRenderFinish","desmDefaultProjectGrid",function(grid){
		getDesmDefaultProjectPopUpData();
	});
	
   $("#txtDlgDesmDefaultProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
           $('#iconDlgDesmDefaultProjectSearch').click();
        }
    });	
		
	$('#iconDlgDesmDefaultProjectSearch').click(function () {
		getDesmDefaultProjectPopUpData();
		return false;
	});		

	$('#btnDDlgDesmDefaultProjectSave').click(function () {
		btnDDlgDesmDefaultProjectSaveClick();
		return false;
	});
	
	
	
	var gridCode = getGridCode();	
	dlgDesmDefaultProjectGridCol = {
		"Cfg" : {
			"id"				: "desmDefaultProjectGrid"
			, "CfgId"			: "desmDefaultProjectGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
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
			"Visible" : "0"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0"	}	// Project Code
			, {	"Name": "NAME"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1"	}	// Project Description
			, {	"Name": "DEFAULT_YN"		, "Width": "150", "Type": "Bool"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "BoolIcon": "1", "BoolGroup" : "1"	}
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
			, "DEFAULT_YN"	: "Default Project"
		}
	};
	
	
	dlgDesmDefaultProjectGrid = TreeGrid( {Layout:{Data : dlgDesmDefaultProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgDesmDefaultProject" ); 
}

function closeDesmDefaultProjectPopUp() {
	
	dlgDesmDefaultProjectGrid.Dispose();
}


function getDesmDefaultProjectPopUpData(){

	$.ajax({
		url: "/getDesmDefaultProject.do",		
		data: {"PROJECT_CODE" : $('#txtDlgDesmDefaultProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgDesmDefaultProjectGrid.Source.Data.Data.Body = [data.results];
			dlgDesmDefaultProjectGrid.ReloadBody();
        }
    });
}

function btnDDlgDesmDefaultProjectSaveClick() {
	dlgDesmDefaultProjectGrid.ActionAcceptEdit();
	
	var projectCode = "";
	var gridList = dlgDesmDefaultProjectGrid.Rows;
	for (var key in gridList) {
		var gridRow = gridList[key];
		if(gridRow.Fixed == null){
			if(gridRow.DEFAULT_YN == "1"){
				projectCode = gridRow.SEGMENT1;
			}
		}
	}
	
	if(projectCode == "") {
		alert_modal("", $('#alertSelectRow').val());
		return;			
	}
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
		
			$.ajax({			
				url: "/saveDesmDefaultProjectSave.do",
				data: {PROJECT_CODE : projectCode},
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
						
					} else {
					
						alert_success($('#alertSuccess').val());
						
						if(v_desm_default_project_callback) {
							v_desm_default_project_callback("save-item", null);
						}						
												
						$('#dlgDesmDefaultProject').modal('hide');	
					}
				}		
			});					
		}
	});			
	
}





