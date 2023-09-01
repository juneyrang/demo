var v_desm_default_country_callback = null;
var v_desm_default_country_param;

var dlgDesmDefaultCountryGrid;

function initDesmDefaultCountryPopUp(param , callback) {
	v_desm_default_country_callback = callback;
    v_desm_default_country_param = param;
    
    initDesmDefaultCountryPopUpCode();    
}

function initDesmDefaultCountryPopUpCode() {
    
    initDesmDefaultCountryPopUpControls();
}


function initDesmDefaultCountryPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgDesmDefaultCountry').on('shown.bs.modal', function () {
		$('#dlgDesmDefaultCountry').click();
	});	
	
	$('#dlgDesmDefaultCountry').on('hidden.bs.modal', function () {
	
	  	closeDesmDefaultCountryPopUp();
	})	

	$('#dlgDesmDefaultCountry').modal('show');

	TGSetEvent("OnRenderFinish","desmDefaultCountryGrid",function(grid){
		getDesmDefaultCountryPopUpData();
	});
	
   $("#txtDlgDesmDefaultCountryCode").keydown(function(key) {
        if (key.keyCode == 13) {
           $('#iconDlgDesmDefaultCountrySearch').click();
        }
    });	
		
	$('#iconDlgDesmDefaultCountrySearch').click(function () {
		getDesmDefaultCountryPopUpData();
		return false;
	});		

	$('#btnDDlgDesmDefaultCountrySave').click(function () {
		btnDDlgDesmDefaultCountrySaveClick();
		return false;
	});
	
	
	
	var gridCode = getGridCode();	
	dlgDesmDefaultCountryGridCol = {
		"Cfg" : {
			"id"				: "desmDefaultCountryGrid"
			, "CfgId"			: "desmDefaultCountryGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Low"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "100"
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
			{	"Name": "COUNTRY"	, "Width": "200", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor ", "CanMove": "0", "CanEdit": "0"	}
			, {	"Name": "DEFAULT_YN"		, "Width": "150", "Type": "Bool"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "BoolIcon": "1", "BoolGroup" : "1"	}
		]
		, "Header" : {
			"COUNTRY"	: "Country"
			, "Class"	: "gridCenterText"
			, "DEFAULT_YN"	: "Default Country"
		}
	};
	
	
	dlgDesmDefaultCountryGrid = TreeGrid( {Layout:{Data : dlgDesmDefaultCountryGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgDesmDefaultCountry" ); 
}

function closeDesmDefaultCountryPopUp() {
	
	dlgDesmDefaultCountryGrid.Dispose();
}


function getDesmDefaultCountryPopUpData(){

	$.ajax({
		url: "/getDesmDefaultCountry.do",		
		data: {"COUNTRY_CODE" : $('#txtDlgDesmDefaultCountryCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgDesmDefaultCountryGrid.Source.Data.Data.Body = [data.results];
			dlgDesmDefaultCountryGrid.ReloadBody();
        }
    });
}

function btnDDlgDesmDefaultCountrySaveClick() {
	dlgDesmDefaultCountryGrid.ActionAcceptEdit();
	
	var countryCode = "";
	var gridList = dlgDesmDefaultCountryGrid.Rows;
	for (var key in gridList) {
		var gridRow = gridList[key];
		if(gridRow.Fixed == null){
			if(gridRow.DEFAULT_YN == "1"){
				countryCode = gridRow.COUNTRY;
			}
		}
	}
	
	if(countryCode == "") {
		alert_modal("", $('#alertSelectRow').val());
		return;			
	}
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
		
			$.ajax({			
				url: "/saveDesmDefaultCountrySave.do",
				data: {COUNTRY_CODE : countryCode},
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
						
					} else {
					
						alert_success($('#alertSuccess').val());
						
						if(v_desm_default_country_callback) {
							v_desm_default_country_callback("save-item", null);
						}						
												
						$('#dlgDesmDefaultCountry').modal('hide');	
					}
				}		
			});					
		}
	});			
	
}





