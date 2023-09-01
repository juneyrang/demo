var v_idsm_project_mgt_callback = null;
var v_idsm_project_mgt_param;

var dlgIdsmProjectMgtGrid;

function initIdsmProjectMgtPopUp(param , callback) {
	v_idsm_project_mgt_callback = callback;
    v_idsm_project_mgt_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgIdsmProjectMgtProjectCode').val(param.keyword);
    }
    
    
    
    initIdsmProjectMgtPopUpCode();    
}

function initIdsmProjectMgtPopUpCode() {
    
    initIdsmProjectMgtPopUpControls();
}


function initIdsmProjectMgtPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmProjectMgt').on('shown.bs.modal', function () {
		$('#dlgIdsmProjectMgt').click();
	});	
	
	$('#dlgIdsmProjectMgt').on('hidden.bs.modal', function () {
	
	  	closeIdsmProjectMgtPopUp();
	});
	
	$('#dlgIdsmProjectMgt').modal('show');	

	TGSetEvent("OnRenderFinish","idsmProjectMgtGrid",function(grid){
		//setIdsmProjectMgtPopUpData(); // 바로 조회 금지
	});
	
	// 메인 jsp에서 동적으로 생성된 popup div에서 만들어진 jsp의 경우 Grid column 복사가 안되는 현상 강제 클립보드 컬럼 추가
	/*TGSetEvent("OnCopy","idsmProjectMgtGrid",function(grid, txt){
		console.log('test');
		console.log(txt);
		//window.navigator.clipboard.writeText(txt); // localhost, https에서만 가능.
		copyToClipboard(txt);
	});*/
	Grids.OnCopy = function(grid, txt) {
        //console.log(grid, txt.replace('\r\n', ''));
		copyToClipboard(txt);
    };
	
   $("#txtDlgIdsmProjectMgtProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            setIdsmProjectMgtPopUpData();
        }
    });	
		
	$('#iconDlgIdsmProjectMgtSearch').click(function () {
		setIdsmProjectMgtPopUpData();
		return false;
	});		

	$('#btnDlgIdsmProjectMgtSelect').click(function () { btnDlgIdsmProjectMgtSelectClick(); return false; });
	
	
	var gridCode = getGridCode();	
	dlgIdsmProjectMgtGridCol = {
		"Cfg" : {
			"id"				: "idsmProjectMgtGrid"
			, "CfgId"			: "idsmProjectMgtGridCfg"
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
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmProjectMgtDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmProjectMgtDbClick( Grid, Row, Col );"	}	// Project Description
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
		}
	};
	
	dlgIdsmProjectMgtGrid = TreeGrid( {Layout:{Data : dlgIdsmProjectMgtGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmProjectMgt" );
}

function closeIdsmProjectMgtPopUp() {
	
	dlgIdsmProjectMgtGrid.Dispose();
}

function setIdsmProjectMgtPopUpData() {
	
	if(v_idsm_project_mgt_param.TYPE != null && v_idsm_project_mgt_param.TYPE == "SITE") {
		searchDesmSiteProject();
	}
	else {
		searchIdsmProjectMgt();
	}
	 
}

function searchDesmSiteProject(){

	$.ajax({
		url: "/getDesmSiteProjectDlgProject.do",		
		data: {"keyword" : $('#txtDlgIdsmProjectMgtProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmProjectMgtGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmProjectMgtGrid.ReloadBody();
        }
    });
}

function searchIdsmProjectMgt(){

	$.ajax({
		url: "/getIdsmProjectMgtDlgProject.do",		
		data: {"keyword" : $('#txtDlgIdsmProjectMgtProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgIdsmProjectMgtGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmProjectMgtGrid.ReloadBody();
        }
    });
}

function gridIdsmProjectMgtDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_idsm_project_mgt_callback)
	{
		v_idsm_project_mgt_callback("select-item", param);
	}
	
	$("#dlgIdsmProjectMgt").modal('hide');
}

function btnDlgIdsmProjectMgtSelectClick() {
	var selectList = dlgIdsmProjectMgtGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_idsm_project_mgt_callback)
	{
		v_idsm_project_mgt_callback("select-item", param);
	}
	
	$("#dlgIdsmProjectMgt").modal('hide');
}



