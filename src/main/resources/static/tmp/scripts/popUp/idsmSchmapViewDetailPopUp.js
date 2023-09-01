var v_idsm_schmap_view_detail_callback = null;
var v_idsm_schmap_view_detail_param;

var dlgIdsmSchmapViewDetailGrid;

function initIdsmSchmapViewDetailPopUp(param , callback) {
	
	v_idsm_schmap_view_detail_callback = callback;
    v_idsm_schmap_view_detail_param = param;
    
    $('#dlgIdsmSchmapViewDetail').modal('show');
    
    initIdsmSchmapViewDetailPopUpCode();    
}

function initIdsmSchmapViewDetailPopUpCode() {
    
    initIdsmSchmapViewDetailControls();
}


function initIdsmSchmapViewDetailControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmSchmapViewDetail').on('shown.bs.modal', function () {
		$('#dlgIdsmSchmapViewDetail').click();
	});	
	
	$('#dlgIdsmSchmapViewDetail').on('hidden.bs.modal', function () {
	
	  	closeIdsmSchmapViewDetailPopUp();
	})	

	TGSetEvent("OnRenderFinish","desmIdsmSchmapViewDetailGrid",function(grid){
		setIdsmSchmapViewDetailPopUpData();
	});		
	
	var gridCode = getGridCode();	
	dlgIdsmSchmapViewDetailGridCol = {
		"Cfg" : {
			"id"				: "desmIdsmSchmapViewDetailGrid"
			, "CfgId"			: "desmIdsmSchmapViewDetailGridCfg"
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
			"Visible" : "0"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{	"Name"	: "PROJECT_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
			{	"Name"	: "LOCAL_ACTIVITY_DESCRIPTION", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
			{	"Name"	: "DETAIL_ITEM_DESCRIPTION", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
		]
		,"Header" : {
			"PROJECT_NO"	: "Project No",
			"LOCAL_ACTIVITY_DESCRIPTION"	: "Activity 명", "Class" : "gridCenterText",
			"DETAIL_ITEM_DESCRIPTION"	: "발주품목"
		}
	};		
	
	dlgIdsmSchmapViewDetailGrid = TreeGrid( {Layout:{Data : dlgIdsmSchmapViewDetailGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmSchmapViewDetail" ); 
}

function closeIdsmSchmapViewDetailPopUp() {
	
	dlgIdsmSchmapViewDetailGrid.Dispose();
}

function setIdsmSchmapViewDetailPopUpData() {

	searchIdsmSchmapViewDetail(); 
}

function searchIdsmSchmapViewDetail(){

	$.ajax({
		url: "/getIdsmSchmapViewDlgDetail.do",		
		data: {"PROJECT_NO" : v_idsm_schmap_view_detail_param.PROJECT_NO,
			   "MAP_TASK_NUMBER" : v_idsm_schmap_view_detail_param.MAP_TASK_NUMBER},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmSchmapViewDetailGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmSchmapViewDetailGrid.ReloadBody();
        }
    });
}





