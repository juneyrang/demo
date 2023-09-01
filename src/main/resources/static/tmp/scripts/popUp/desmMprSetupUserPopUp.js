var v_desm_mpr_setup_user_callback = null;
var v_desm_mpr_setup_user_param;
var dlgDesmMprSetupUserGrid;

function initDesmMprSetupUserPopUp(param , callback) {
	v_desm_mpr_setup_user_callback = callback;
    v_desm_mpr_setup_user_param = param;    
    
	$('#dlgDesmMprSetupUser').on('shown.bs.modal', function () {
		$('#dlgDesmMprSetupUser').click();
	});	
	
	$('#dlgDesmMprSetupUser').on('hidden.bs.modal', function () {
	  	closeDesmMprSetupUserPopUp();
	});
    
    initDesmMprSetupUserPopUpCode();    
}

function initDesmMprSetupUserPopUpCode() {  
    
    initDesmMprSetupUserPopUpControls();
}


function initDesmMprSetupUserPopUpControls() {	
	
	$('#dlgDesmMprSetupUser').modal('show');	
	
	$('#btnDlgDesmMprSetupUserSearch').click(function () { btnDlgDesmMprSetupUserSearchClick(); return false; });
	$('#btnDlgDesmMprSetupUserResete').click(function () { btnDlgDesmMprSetupUserReseteClick(); return false; });
	$('#btnDlgDesmMprSetupUserSelect').click(function () { btnDlgDesmMprSetupUserSelectClick(); return false; });
	
	
	$("#txtDlgDesmMprSetupUserAd").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMprSetupUserSearch').click();
		}
	});	
	
	$("#txtDlgDesmMprSetupUserName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMprSetupUserSearch').click();
		}
	});			
	
	TGSetEvent("OnRenderFinish","dlgDesmMprSetupUserGrid",function(grid){
		
	});
	
	TGSetEvent("OnCopy","dlgDesmMprSetupUserGrid",function(grid, txt){
		copyToClipboard(txt);
	});
	
	var gridCode = getGridCode();	
	

	var dlgDesmMprSetupUserGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprSetupUserGrid"
			, "CfgId"			: "dlgDesmMprSetupUserGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "200"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle" : "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "SafeCSS"			: "1"
			, "Code" : gridCode			
			,"CopyCols" : "0"
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
		}
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "USER_AD", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnDblClick": "gridDesmMprSetupUserDbClick( Grid, Row, Col );" },
	   	         {	"Name"	: "MAIL", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnDblClick": "gridDesmMprSetupUserDbClick( Grid, Row, Col );" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"USER_AD"	: "User Ad", "USER_ADRowSpan" : "2",
					"MAIL"	: "E-mail", "MAILRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"USER_AD"	: "User Ad",
					"MAIL"	: "E-mail"}]
	};	
	
	
	dlgDesmMprSetupUserGrid = TreeGrid( {Layout:{Data : dlgDesmMprSetupUserGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprSetupUser" );	
}

function closeDesmMprSetupUserPopUp() {
	dlgDesmMprSetupUserGrid.Dispose();
}

function btnDlgDesmMprSetupUserSearchClick() {
	var paramData = {USER_AD : $('#txtDlgDesmMprSetupUserAd').val(), USER_NAME : $('#txtDlgDesmMprSetupUserName').val()};
	
	$.ajax({
		url: "/getDesmMprSetupUserList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			dlgDesmMprSetupUserGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprSetupUserGrid.ReloadBody();
			
        }
    });		  
}

function btnDlgDesmMprSetupUserReseteClick() {
	$("#txtDlgDesmMprSetupUserAd").val("");
	$("#txtDlgDesmMprSetupUserName").val("");
}

function btnDlgDesmMprSetupUserSelectClick() {
	var selectList = dlgDesmMprSetupUserGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	if(v_desm_mpr_setup_user_callback)
	{
		v_desm_mpr_setup_user_callback("select-item", selectList);
	}
	
	$("#dlgDesmMprSetupUser").modal('hide');
}

function gridDesmMprSetupUserDbClick( grid, row, col ) {
	var selectList = [];
	var param = Object.assign({}, row);
	selectList.push(param);
	if(v_desm_mpr_setup_user_callback)
	{
		v_desm_mpr_setup_user_callback("select-item", selectList);
	}
	
	$("#dlgDesmMprSetupUser").modal('hide');
}


