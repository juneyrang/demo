var v_desm_mpr_creation_callback = null;
var v_desm_mpr_creation_param;
var gridReload = false;
var gridCnt = 9;
var fileUse = true;
var dlgDesmMprCreationProgressGrid;
var dlgDesmMprCreationProgressNoteGrid;
var dlgDesmMprCreationRemarksGrid;
var dlgDesmMprCreationDetailProgressGrid;
var dlgDesmMprCreationDetailProgressGridCol;
var dlgDesmMprCreationProcureGrid;
var dlgDesmMprCreationManufactureGrid;
var dlgDesmMprCreationPaymentsGrid;
var dlgDesmMprCreationDesignGrid;
var dlgDesmMprCreationQualityGrid;

var gridDesmMprCreationCatgoryCodeList;

var curMonName = "";
var curDd = "";

function initDesmMprCreationPopUp(param , callback) {
	v_desm_mpr_creation_callback = callback;
    v_desm_mpr_creation_param = param;   
    
	$('#dlgDesmMprCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMprCreation').click();
	});	
	
	$('#dlgDesmMprCreation').on('hidden.bs.modal', function () {
	  	closeDesmMprCreationPopUp();
	});
	
	if($('#txtDesmLang').val() == "ko"){
		$('#divDlgDesmMprCreationResultYnText').attr('class','col-sm-1 text-right font-weight-bold');
	}	
	else {
		$('#divDlgDesmMprCreationResultYnText').attr('class','col-sm-2 text-right font-weight-bold');
	}	
    
    initDesmMprCreationPopUpCode();    
}

function initDesmMprCreationPopUpCode() {  
    
	var codeList = [{"CODE" : "M001"}];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
			gridDesmMprCreationCatgoryCodeList = setGridCombo(results.M001, "");
			
		 	initDesmMprCreationPopUpControls();
		
			curMonName = results.DAY[0].CUR_MON_NAME;		
			curDd = results.DAY[0].CUR_DD_INT;
        }
    });    
    
    
}


function initDesmMprCreationPopUpControls() {	

  	closeDesmMprCreationPopUp();
	
	
	$('#dlgDesmMprCreation').modal('show');
	
	initDlgDesmMprCreationMonthDatePicker("#txtDlgDesmMprCreationMPRDate");
	
	if(v_desm_mpr_creation_param.MPR_SEQ == null) {
		$('#txtDlgDesmMprCreationProjectNo').val(v_desm_mpr_creation_param.PROJECT_NO);
		$('#txtDlgDesmMprCreationProjectName').val(v_desm_mpr_creation_param.PROJECT_NAME);
		$('#txtDlgDesmMprCreationMprStatus').val("Incomplete");	
		
		if(v_desm_mpr_creation_param.supplier_yn == "Y") {
			$('#txtDlgDesmMprCreationSupplier').val(v_desm_mpr_creation_param.SUPPLIER);
			$("#txtDlgDesmMprCreationSupplier").attr("readonly",true);
			$('#txtDlgDesmMprCreationSupplierNo').val(v_desm_mpr_creation_param.SUPPLIER_NO);
			
		}
		
		$('#btnDlgDesmMprCreationDelete').remove();
		$('#btnDlgDesmMprCreationConfirm').remove();
		$('#btnDlgDesmMprCreationReturn').remove();
		$('#btnDlgDesmMprCreationReport').remove();
	}

	makeAutocompletePoList(
		"txtDlgDesmMprCreationPoNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMprCreationSupplierNo",					//keyword3 파라메터 id
		v_desm_mpr_creation_param.supplier_yn,	            //supplier_yn
		'Y',				 //mpr_yn
		"txtDlgDesmMprCreationPoName",		//clear필드 id
		"/getDesmMprNoPo.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {
			var mprNo = ui.item.value.split("|")[8];
			if(mprNo == null || mprNo == "") {
				alert_modal("", $('#alertMprPoSelectErr').val());
				return;				
			}
			
			$("#txtDlgDesmMprCreationPoNo").val(ui.item.value.split("|")[0]);
			$("#txtDlgDesmMprCreationPoName").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMprCreationSupplierNo").val(ui.item.value.split("|")[2]);
			$("#txtDlgDesmMprCreationSupplier").val(ui.item.value.split("|")[3]);
			$("#txtDlgDesmMprCreationPoPromisedDate").val(ui.item.value.split("|")[4]);
			$("#txtDlgDesmMprCreationProjectNo").val(ui.item.value.split("|")[5]);
			$("#txtDlgDesmMprCreationProjectName").val(ui.item.value.split("|")[6]);
			$("#txtDlgDesmMprCreationProductName").val(ui.item.value.split("|")[7]);
			v_desm_mpr_creation_param.MPR_NO = ui.item.value.split("|")[8];			
			
			if($("#txtDlgDesmMprCreationMPRDate").val() == "") {
				$("#txtDlgDesmMprCreationMPRDate").val(ui.item.value.split("|")[9]);
			}

			setRoundSelectbox(ui.item.value.split("|")[10]);

			v_desm_mpr_creation_param.START_MONTH = ui.item.value.split("|")[11];			
			v_desm_mpr_creation_param.END_MONTH = ui.item.value.split("|")[12];			
			
			
			searchDlgDesmMprCreationDetailProgressData();
			searchDlgDesmMprCreationPayments();
			return false;
		}
	);		
	
	
	setDlgDesmMprCreationAttListPopUpData();
	setDlgDesmMprCreationDesignAttListPopUpData();
	setDlgDesmMprCreationQualityAttListPopUpData();
	
	
	$('#btnDlgDesmMprCreationSave').click(function () { btnDlgDesmMprCreationSaveClick(); return false; });
	$('#btnDlgDesmMprCreationSubmit').click(function () { btnDlgDesmMprCreationSubmitClick(); return false; });
	
	$('#iconDlgDesmMprCreationPoNoSearch').click(function () { iconDlgDesmMprCreationPoNoSearchClick(); return false; });
	
	$('#btnDlgDesmMprCreationProgressNoteAdd').click(function () { btnDlgDesmMprCreationProgressNoteAddClick(); return false; });
	$('#btnDlgDesmMprCreationRemarksAdd').click(function () { btnDlgDesmMprCreationRemarksAddClick(); return false; });
	$('#btnDlgDesmMprCreationProcureAdd').click(function () { btnDlgDesmMprCreationProcureAddClick(); return false; });
	$('#btnDlgDesmMprCreationManufactureAdd').click(function () { btnDlgDesmMprCreationManufactureAddClick(); return false; });
	
	$('#btnDlgDesmMprCreationProcurePrevious').click(function () { btnDlgDesmMprCreationProcurePreviousClick(); return false; });
	$('#btnDlgDesmMprCreationDesignPrevious').click(function () { btnDlgDesmMprCreationDesignPreviousClick(); return false; });
	$('#btnDlgDesmMprCreationQualityPrevious').click(function () { btnDlgDesmMprCreationQualityPreviousClick(); return false; });
	$('#btnDlgDesmMprCreationManufacturePrevious').click(function () { btnDlgDesmMprCreationManufacturePreviousClick(); return false; });
	
	
	
	$('#btnDlgDesmMprCreationDesignAdd').click(function () { btnDlgDesmMprCreationDesignAddClick(); return false; });
	$('#btnDlgDesmMprCreationQualityAdd').click(function () { btnDlgDesmMprCreationQualityAddClick(); return false; });
	
	
	
	$('#btnDlgDesmMprCreationProgressNoteDel').click(function () { btnDlgDesmMprCreationProgressNoteDelClick(); return false; });
	$('#btnDlgDesmMprCreationRemarksDel').click(function () { btnDlgDesmMprCreationRemarksDelClick(); return false; });
	$('#btnDlgDesmMprCreationProcureDel').click(function () { btnDlgDesmMprCreationProcureDelClick(); return false; });
	$('#btnDlgDesmMprCreationDesignDel').click(function () { btnDlgDesmMprCreationDesignDelClick(); return false; });
	$('#btnDlgDesmMprCreationQualityDel').click(function () { btnDlgDesmMprCreationQualityDelClick(); return false; });
	

	$('#btnDlgDesmMprDesignCreationExcelUpload').click(function () { btnDlgDesmMprDesignCreationExcelUploadClick(); return false; });
	
	
	$('#btnDlgDesmMprCreationReturn').click(function () { btnDlgDesmMprCreationReturnClick(); return false; });
	$('#btnDlgDesmMprCreationConfirm').click(function () { btnDlgDesmMprCreationConfirmClick(); return false; });
	$('#btnDlgDesmMprCreationDelete').click(function () { btnDlgDesmMprCreationDeleteClick(); return false; });
	
	
	$('#btnDlgDesmMprCreationReport').click(function () { btnDlgDesmMprCreationReportClick(); return false; });
	
	
	

	$('#iconDlgDesmMprCreationDesignMfgYes').click(function() { alert_modal('', $('#alertMprDesignMfgYes').val()) });

	
	
	
	$('#btnDlgDesmMprCreationPhotoAttListDelete').click(function () { btnDlgDesmMprCreationPhotoAttListDeleteClick(); return false; });
	$('#txtDlgDesmMprCreationPhotoAttListFile').change(function () { txtDlgDesmMprCreationPhotoAttListFileChange(); return false; });
	$('#divDlgDesmMprCreationPhotoAttListBox').on('drop', function(e) { divDlgDesmMprCreationPhotoAttListBoxDrop(e); return false; });
	
	
	var gridReloadCnt = 0;
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationProgressGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt) {
			searchDesmMprCreation();
		}
		
		dlgDesmMprCreationProgressGridReload();			
	});	
	
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationProgressNoteGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}					
	});	
	
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationRemarksGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}			
	});	
	
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationDetailProgressGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}	
		
		dlgDesmMprCreationDetailProgressGridReload();
	});	
	
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationProcureGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}			
	});

	TGSetEvent("OnRenderFinish","dlgDesmMprCreationManufactureGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}			
	});

	TGSetEvent("OnRenderFinish","dlgDesmMprCreationPaymentsGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}			
	});	
	
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationDesignGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}			
	});		
		
	TGSetEvent("OnRenderFinish","dlgDesmMprCreationQualityGrid",function(grid){
		gridReloadCnt = gridReloadCnt + 1;	
		if(gridReloadCnt == gridCnt && v_desm_mpr_creation_param.MPR_SEQ != null) {
			searchDesmMprCreation();
		}			
	});	
	
	Grids.OnCopy = function(grid, txt) {
		copyToClipboard(copyText);
	};

	TGSetEvent("OnAfterValueChanged","dlgDesmMprCreationDetailProgressGrid",function(grid, row, col, val){
		if(col != "WEIGHT" && col != "REMARK") {
			dlgDesmMprCreationDetailProgressGridCal(grid, row, col);
		}
	});
		
	
	var gridCode = getGridCode();
	
		var dlgDesmMprCreationProgressGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationProgressGrid"
			, "CfgId"			: "dlgDesmMprCreationProgressGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "150"
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
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "TYPE_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "WEIGHT", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PLAN_VAR_PREV", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ACTUAL_VAR_PREV", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PLAN_VAR_CUR", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ACTUAL_VAR_CUR", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PLAN_VAR_NEXT", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ACTUAL_VAR_NEXT", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMERowSpan" : "2",
					"WEIGHT"	: $('#gridColMprIncrease').val(), "WEIGHTRowSpan" : "2",
					"PLAN_VAR_PREV"	: $('#gridColMprLastMonth').val(), "PLAN_VAR_PREVSpan" : "2",
					"ACTUAL_VAR_PREV"	: $('#gridColMprLastMonth').val(),
					"PLAN_VAR_CUR"	: $('#gridColMprMonth').val(), "PLAN_VAR_CURSpan" : "2",
					"ACTUAL_VAR_CUR"	: $('#gridColMprMonth').val(),
					"PLAN_VAR_NEXT"	: $('#gridColMprNextMonth').val(), "PLAN_VAR_NEXTSpan" : "2",
					"ACTUAL_VAR_NEXT"	: $('#gridColMprNextMonth').val()},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"TYPE_NAME"	: $('#gridColMprType').val(),
					"WEIGHT"	: $('#gridColMprIncrease').val(),
					"PLAN_VAR_PREV"	: $('#gridColMprPlan').val(),
					"ACTUAL_VAR_PREV"	: $('#gridColMprResult').val(),
					"PLAN_VAR_CUR"	: $('#gridColMprPlan').val(),
					"ACTUAL_VAR_CUR"	: $('#gridColMprResult').val(),
					"PLAN_VAR_NEXT"	: $('#gridColMprPlan').val(),
					"ACTUAL_VAR_NEXT"	: $('#gridColMprForecast').val()}]
	};		
	
	var dlgDesmMprCreationProgressNoteGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationProgressNoteGrid"
			, "CfgId"			: "dlgDesmMprCreationProgressNoteGridCfg"
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
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: ""
			, "Cells70Styles"	: ""
//			, "Cells60Cfg"		: "Columns"
//			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "TYPE", "Width": "200", "Type": "Enum","Enum" : gridDesmMprCreationCatgoryCodeList.label, "EnumKeys" : gridDesmMprCreationCatgoryCodeList.code, "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "CONTENTS", "RelWidth" :"100", "Type": "Lines" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "VarHeight": "2", "AcceptEnters": "1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"TYPE"	: $('#gridColMprType').val(), "TYPERowSpan" : "2",
					"CONTENTS"	: $('#gridColMprContent').val(), "CONTENTSRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"TYPE"	: $('#gridColMprType').val(),
					"CONTENTS"	: $('#gridColMprContent').val()}]
	};			
	
	var dlgDesmMprCreationRemarksGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationRemarksGrid"
			, "CfgId"			: "dlgDesmMprCreationRemarksGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
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
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: ""
			, "Cells70Styles"	: ""
//			, "Cells60Cfg"		: "Columns"
//			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "TYPE", "Width": "200", "Type": "Enum","Enum" : gridDesmMprCreationCatgoryCodeList.label, "EnumKeys" : gridDesmMprCreationCatgoryCodeList.code, "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "CONTENTS", "RelWidth" :"100", "Type": "Lines" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "VarHeight": "2", "AcceptEnters": "1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"TYPE"	: $('#gridColMprType').val(), "TYPERowSpan" : "2",
					"CONTENTS"	: $('#gridColMprContent').val(), "CONTENTSRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"TYPE"	: $('#gridColMprType').val(),
					"CONTENTS"	: $('#gridColMprContent').val()}]
	};
	
	var dlgDesmMprCreationProcureGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationProcureGrid"
			, "CfgId"			: "dlgDesmMprCreationProcureGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "250"
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
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: ""
			, "Cells70Styles"	: ""
//			, "Cells60Cfg"		: "Columns"
//			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ITEM", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "VENDOR_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "VENDOR_COUNTRY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "PO_PLAN", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "PO_EXPECTED", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "PO_ACTUAL", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "DELIVERY_PLAN", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "DELIVERY_EXPECTED", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "DELIVERY_ACTUAL", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "REMARKS", "Width": "450", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "2",
					"ITEM"	: "Item", "ITEMRowSpan" : "2",
					"VENDOR_NAME"	: "Vendor", "VENDOR_NAMESpan" : "2",
					"VENDOR_COUNTRY"	: "Vendor",
					"PO_PLAN"	: "PO Issue", "PO_PLANSpan" : "3",
					"PO_EXPECTED"	: "PO Issue",
					"PO_ACTUAL"	: "PO Issue",
					"DELIVERY_PLAN"	: "Delivery", "DELIVERY_PLANSpan" : "3",
					"DELIVERY_EXPECTED"	: "Delivery",
					"DELIVERY_ACTUAL"	: "Delivery",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"ITEM"	: "Item",
					"VENDOR_NAME"	: "Name",
					"VENDOR_COUNTRY"	: "Country",
					"PO_PLAN"	: "Plan",
					"PO_EXPECTED"	: "Expected",
					"PO_ACTUAL"	: "Actual",
					"DELIVERY_PLAN"	: "Plan",
					"DELIVERY_EXPECTED"	: "Expected",
					"DELIVERY_ACTUAL"	: "Actual",
					"REMARKS"	: "Remarks"}]
	};	

	var dlgDesmMprCreationManufactureGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationManufactureGrid"
			, "CfgId"			: "dlgDesmMprCreationManufactureGridCfg"
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
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: ""
			, "Cells70Styles"	: ""
//			, "Cells60Cfg"		: "Columns"
//			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TYPE", "Width": "150", "Type": "Enum", "Enum" : "|MFG/ASSEMBLY|FAT|CARGO READY", "EnumKeys" : "|MFG/ASSEMBLY|FAT|CARGO READY" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "ITEM", "Width": "400", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "SCHEDULE_PLAN", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "SCHEDULE_ACTUAL", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "REMARKS", "Width": "450", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "2",
					"TYPE"	: "Type", "TYPERowSpan" : "2",
					"ITEM"	: "Item", "ITEMRowSpan" : "2",
					"SCHEDULE_PLAN"	: "Schedule", "SCHEDULE_PLANSpan" : "2",
					"SCHEDULE_ACTUAL"	: "Schedule",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"TYPE"	: "Type",
					"ITEM"	: "Item",
					"SCHEDULE_PLAN"	: "Plan",
					"SCHEDULE_ACTUAL"	: "Actual",
					"REMARKS"	: "Remarks"}]
	};			
	
	dlgDesmMprCreationDetailProgressGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationDetailProgressGrid"
			, "CfgId"			: "dlgDesmMprCreationDetailProgressGridCfg"
			, "Version"			: "1"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "400"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle" : "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "SafeCSS"			: "1"
			, "AutoSpan"        : "1" 
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
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
		"LeftCols": [{	"Name"	: "TYPE_NAME", "Width": "30", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned": "1", "Group": "1" },
				 	 {	"Name"	: "TYPE_SUB_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" , "Group": "1"},
				 	 {	"Name"	: "GUBUN_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Group": "1" },
				 	 {	"Name"	: "WEIGHT", "Width": "80", "Type": "Int" , "Class" : "gridBorderText gridTextColor gridCenterText", "Format" : "##0\%", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
		"Header" : {"Class" : "gridCenterText",
			  "Spanned" : "1",
			  "Height" : "35",
			  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMESpan" : "3",
			  "WEIGHT"	: $('#gridColMprIncrease').val()
		}
//		"LeftCols": [{	"Name"	: "TYPE_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned": "1" },
//				 	 {	"Name"	: "GUBUN_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],
//	    "Head" : [{"Kind"	: "Header",
//				  "id" : "Header",
//				  "Spanned" : "1",
//				  "PanelRowSpan" : "2",
//				  "Class" : "gridCenterText",
//				  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMERowSpan" : "2", "TYPE_NAMESpan" : "2",
//				  "GUBUN_NAME"	: $('#gridColMprType').val()},
//				  {"Kind"	: "Header",
//				  "Spanned" : "1",
//				  "Class" : "gridCenterText",
//				  "TYPE_NAME"	: $('#gridColMprType').val(),
//				  "GUBUN_NAME"	: $('#gridColMprType').val()}]
		
	};					
	
	var dlgDesmMprCreationPaymentsGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationPaymentsGrid"
			, "CfgId"			: "dlgDesmMprCreationPaymentsGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "170"
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
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "LINE_NUM", "Width": "70", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ITEM", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ITEM_DESCRIPTION", "Width": "450", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "QUANTITY", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "UOM", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "UNIT_PRICE", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "CURRENCY_CODE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PO_LINE_AMOUNT", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "LOCATION_QUANTITY_RECEIVED", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "BILLED_AMOUNT", "Width": "170", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"LINE_NUM"	: "Line", "LINE_NUMRowSpan" : "2",
					"ITEM"	: "Item", "ITEMRowSpan" : "2",
					"ITEM_DESCRIPTION"	: "Item Description", "ITEM_DESCRIPTIONRowSpan" : "2",
					"QUANTITY"	: "Qty", "QUANTITYRowSpan" : "2",
					"UOM"	: "UOM", "UOMRowSpan" : "2",
					"UNIT_PRICE"	: "Price", "UNIT_PRICERowSpan" : "2",
					"CURRENCY_CODE"	: "Currency", "CURRENCY_CODERowSpan" : "2",
					"PO_LINE_AMOUNT"	: "Amount", "PO_LINE_AMOUNTRowSpan" : "2",
					"LOCATION_QUANTITY_RECEIVED"	: "Qty Received", "LOCATION_QUANTITY_RECEIVEDRowSpan" : "2",
					"BILLED_AMOUNT"	: "Amount Billed", "BILLED_AMOUNTRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"LINE_NUM"	: "Line",
					"ITEM"	: "Item",
					"ITEM_DESCRIPTION"	: "Item Description",
					"QUANTITY"	: "Qty",
					"UOM"	: "UOM",
					"UNIT_PRICE"	: "Price",
					"CURRENCY_CODE"	: "Currency",
					"PO_LINE_AMOUNT"	: "Amount",
					"LOCATION_QUANTITY_RECEIVED"	: "Qty Received",
					"BILLED_AMOUNT"	: "Amount Billed"}]
	};		
	
	
	var dlgDesmMprCreationDesignGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationDesignGrid"
			, "CfgId"			: "dlgDesmMprCreationDesignGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" 	: "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "340"
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
			, "Code" 			: gridCode			
			,"CopyCols" 		: "0"
			, "Sorting"			: "0"
//			, "DynamicEditing" : "2"
			, "Alternate" 		: "2"
		}
		, "Toolbar" : {
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: ""
			, "Cells70Styles"	: ""
//			, "Cells60Cfg"		: "Columns"
//			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DOCUMENT_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "ITEM1", "Width": "270", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "ITEM2", "Width": "270", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "SCHEDULE_PLAN", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "SCHEDULE_ACTUAL", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "MFG_YN", "Width": "120", "Type": "Radio", "Enum" : "|YES|NO", "EnumKeys" : "|Y|N", "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnClickEditRadio": "onChangeMFG( Grid, Row, Col )" },
				 {	"Name"	: "APPROVAL_EXPECTED", "Width": "150", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Button": "" },
				 {	"Name"	: "APPROVAL_ACTUAL", "Width": "150", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Button": "" },
				 {	"Name"	: "REMARKS", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "3",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "3",
					"DOCUMENT_NO"	: "Document No.", "DOCUMENT_NORowSpan" : "3",
					"ITEM1"	: "Item1", "ITEM1RowSpan" : "3",
					"ITEM2"	: "Item2", "ITEM2RowSpan" : "3",
					"SCHEDULE_PLAN"	: "Schedule", "SCHEDULE_PLANSpan" : "5",
					"SCHEDULE_ACTUAL"	: "Schedule",
					"MFG_YN"	: "Schedule",
					"APPROVAL_EXPECTED"	: "Schedule",
					"APPROVAL_ACTUAL"	: "Schedule",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "3"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"DOCUMENT_NO"	: "Document No.",
					"ITEM1"	: "Item1",
					"ITEM2"	: "Item2",
					"SCHEDULE_PLAN"	: "1st Submit", "SCHEDULE_PLANSpan" : "2",
					"SCHEDULE_ACTUAL"	: "1st Submit",
					"MFG_YN"	: "MFG", "MFG_YNRowSpan" : "2",
					"APPROVAL_EXPECTED"	: "Approval Due Date", "APPROVAL_EXPECTEDRowSpan" : "2",
					"APPROVAL_ACTUAL"	: "Approval Date", "APPROVAL_ACTUALRowSpan" : "2",
					"REMARKS"	: "Remarks"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"DOCUMENT_NO"	: "Document No.",
					"ITEM1"	: "Item1",
					"ITEM2"	: "Item2",
					"SCHEDULE_PLAN"	: "Plan",
					"SCHEDULE_ACTUAL"	: "Actual",
					"MFG_YN"	: "MFG",
					"APPROVAL_EXPECTED"	: "Approval Due Date",
					"APPROVAL_ACTUAL"	: "Approval Date",
					"REMARKS"	: "Remarks"}]
	};		
	
	
	var dlgDesmMprCreationQualityGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprCreationQualityGrid"
			, "CfgId"			: "dlgDesmMprCreationQualityGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "340"
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
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: ""
			, "Cells70Styles"	: ""
//			, "Cells60Cfg"		: "Columns"
//			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		},
	   "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ITEM1", "Width": "370", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "ITEM2", "Width": "370", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "SCHEDULE_PLAN", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "SCHEDULE_ACTUAL", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "REMARKS", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "2",
					"ITEM1"	: "Item1", "ITEM1RowSpan" : "2",
					"ITEM2"	: "Item2", "ITEM2RowSpan" : "2",
					"SCHEDULE_PLAN"	: "Schedule", "SCHEDULE_PLANSpan" : "2",
					"SCHEDULE_ACTUAL"	: "Schedule",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"ITEM1"	: "Item1",
					"ITEM2"	: "Item2",
					"SCHEDULE_PLAN"	: "Plan",
					"SCHEDULE_ACTUAL"	: "Actual",
					"REMARKS"	: "Remarks"}]
	};			
	
	dlgDesmMprCreationProgressGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationProgressGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationProgress" );
	dlgDesmMprCreationProgressNoteGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationProgressNoteGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationProgressNote" );
	dlgDesmMprCreationRemarksGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationRemarksGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationRemarks" );
	dlgDesmMprCreationProcureGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationProcureGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationProcure" );	
	dlgDesmMprCreationManufactureGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationManufactureGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationManufacture" );	
	dlgDesmMprCreationDetailProgressGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationDetailProgressGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationDetailnProgress" );
	dlgDesmMprCreationPaymentsGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationPaymentsGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationPayments" );
	dlgDesmMprCreationDesignGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationDesignGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationDesign" );
	dlgDesmMprCreationQualityGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationQualityGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprCreationQuality" );
	
	var list = v_desm_mpr_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
			
			if(row.AUTH_CODE == "S") {
				fileUse = false;
			}
		}
	}		
}

function dlgDesmMprCreationDetailProgressGridCal(grid, row, col) {
	
	var list = grid.Rows;
	var pRow;
	var rRow;
	var cRow;			
	for (var key in list) {		
		var gridRow = list[key];
		if(gridRow.Fixed == null){
			
			if (gridRow.TYPE_CODE == row.TYPE_CODE){
				if(gridRow.GUBUN_CODE == "P") {
					pRow = gridRow;
				}
				else if(gridRow.GUBUN_CODE == "R") {
					rRow = gridRow;
				}
				else if(gridRow.GUBUN_CODE == "C") {
					cRow = gridRow;
				} 
				
			}
		}
	}
	
	pVal = pRow[col] == null || pRow[col] == "" ? 0 : pRow[col] * 100;
	rVal = rRow[col] == null || rRow[col] == "" ? 0 : rRow[col] * 100; 
	
	if(pVal == 0) {
		cVal = Number((rVal / 100).toFixed(2));
	}
	else {
		cVal = pVal == 0 ? 0 : Number((rVal / pVal).toFixed(2));
	}
	
	
	
	cRow[col] = cVal;
	
	grid.RefreshRow(cRow);
	
	
}

function dlgDesmMprCreationProgressGridReload() {
	
	var list = dlgDesmMprCreationProgressGrid.Rows;
	
	for (var key in list) {		
	
		var gridRow = list[key];
		if(gridRow.Fixed == null){
			
			if(gridRow.TYPE_CODE == "T") {
				gridRow.TYPE_NAMEBackground = "#FFFFCC";
				gridRow.PLAN_VAR_PREVBackground = "#FFFFCC";
				gridRow.ACTUAL_VAR_PREVBackground = "#FFFFCC";
				gridRow.PLAN_VAR_CURBackground = "#FFFFCC";
				gridRow.ACTUAL_VAR_CURBackground = "#FFFFCC";
				gridRow.PLAN_VAR_NEXTBackground = "#FFFFCC";
				gridRow.ACTUAL_VAR_NEXTBackground = "#FFFFCC";
				gridRow.WEIGHTBackground = "#FFFFCC";
					
				dlgDesmMprCreationProgressGrid.RefreshRow(gridRow);
			}
			
		}
	}
}

function dlgDesmMprCreationDetailProgressGridReload_230503() {
	
	var list = dlgDesmMprCreationDetailProgressGrid.Rows;
	
	var mprDate = $('#txtDlgDesmMprCreationMPRDate').val() + "";
	var mprDateArr = mprDate.split('/');
	
	if(mprDateArr.length != 2) {
		return;
	}
	
	mprDate = mprDateArr[0] + "_" + mprDateArr[1];
	var date = new Date(mprDateArr[0], Number(mprDateArr[1]) + "", "1");
	
	var nextMprDate = date.getFullYear() + "_" + (date.getMonth() + 1);
	if((date.getMonth() + 1).toString().length == 1) {
		nextMprDate = date.getFullYear() + "_0" + (date.getMonth() + 1);
	}
	
	var curDataArr = curMonName.split('_');
	var strCurDate = curMonName;
	if(Number(curDd) <= 11) {
		var curDate = new Date(curDataArr[0], (Number(curDataArr[1]) - 2) + "", "1");
		
		var strCurDate = curDate.getFullYear() + "_" + (curDate.getMonth() + 1);
		if((curDate.getMonth() + 1).toString().length == 1) {
			strCurDate = curDate.getFullYear() + "_0" + (curDate.getMonth() + 1);
		}		
	}
	
	for (var key in list) {		
	
		var gridRow = list[key];
		if(gridRow.Fixed == null){			
			
			gridRow.WEIGHTCanEdit = 0;
			if(gridRow.GUBUN_CODE == "C") {
				gridRow.GUBUN_NAMEBackground = "#FFFFCC";
				gridRow.TYPE_NAMEBackground = "#FFFFCC";
				gridRow.REMARKBackground = "#FFFFCC";
				gridRow.REMARKCanEdit = 0;
				gridRow.WEIGHTBackground = "#FFFFCC";
				
				
				for (var i = 0; i < colList.length; i++) {
					var colLRow = colList[i];
					var colEdit = colLRow.COL_NAME + "CanEdit";
					var colBackground = colLRow.COL_NAME + "Background";
					gridRow[colEdit] = 0;

					
					gridRow[colBackground] = "#FFFFCC";
				}				
			}
			else {
			
				if(gridRow.TYPE_CODE == "S"){
					gridRow.REMARKCanEdit = 0;				
				}

					
					for (var i = 0; i < colList.length; i++) {
						var colLRow = colList[i];
						var colEdit = colLRow.COL_NAME + "CanEdit";
						

						
						if(colLRow.COL_NAME == mprDate && gridRow.GUBUN_CODE == "R" && gridRow.TYPE_CODE != "S" && colLRow.COL_NAME >= strCurDate) {
							gridRow[colEdit] = 1;
						}
						else if(colLRow.COL_NAME == nextMprDate && gridRow.GUBUN_CODE == "R"  && gridRow.TYPE_CODE != "S" && colLRow.COL_NAME >= strCurDate) {
							gridRow[colEdit] = 1;
						}						
						else {
							gridRow[colEdit] = 0;	
						}
						
					}						
					
	
			}
			
			if(gridRow.GUBUN_CODE != "P") {
				gridRow.TYPE_NAME = "";
				gridRow.WEIGHT = "";
			}	
			else if(gridRow.GUBUN_CODE == "P" && gridRow.TYPE_CODE == "S") {
				gridRow.WEIGHT = "";
			}			
					
			dlgDesmMprCreationDetailProgressGrid.RefreshRow(gridRow);
			
		}
	}
	
	if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
		setGridEdit(dlgDesmMprCreationDetailProgressGrid);
	}	
		
	
}

function dlgDesmMprCreationDetailProgressGridReload() {
	
	var list = dlgDesmMprCreationDetailProgressGrid.Rows;
	
	var mprDate = $('#txtDlgDesmMprCreationMPRDate').val() + "";
	var mprDateArr = mprDate.split('/');
	
	if(mprDateArr.length != 2) {
		return;
	}
	
	mprDate = mprDateArr[0] + "_" + mprDateArr[1];
	var date = new Date(mprDateArr[0], Number(mprDateArr[1]) + "", "1");
	
	var nextMprDate = date.getFullYear() + "_" + (date.getMonth() + 1);
	if((date.getMonth() + 1).toString().length == 1) {
		nextMprDate = date.getFullYear() + "_0" + (date.getMonth() + 1);
	}
	
	var curDataArr = curMonName.split('_');
	var strCurDate = curMonName;
	if(Number(curDd) <= 11) {
		var curDate = new Date(curDataArr[0], (Number(curDataArr[1]) - 2) + "", "1");
		
		var strCurDate = curDate.getFullYear() + "_" + (curDate.getMonth() + 1);
		if((curDate.getMonth() + 1).toString().length == 1) {
			strCurDate = curDate.getFullYear() + "_0" + (curDate.getMonth() + 1);
		}		
	}
	
	var canEdit = function(col, gubunCode, typeCode) {
		if(col == mprDate && gubunCode == "R" && typeCode != "S"/* && col >= strCurDate*/) {
			return true;
		}
		else if(col == nextMprDate && gubunCode == "R"  && typeCode != "S"/* && col >= strCurDate*/) {
			return true;
		}						
		else {
			return false;	
		}
	};
	
	for (var key in list) {		
	
		var gridRow = list[key];
		if(gridRow.Fixed == null){			
			
			gridRow.WEIGHTCanEdit = 0;

			if(gridRow.TYPE_SUB_NAME == null || gridRow.TYPE_SUB_NAME == '') {
				if(gridRow.GUBUN_CODE == "C") {
					gridRow.GUBUN_NAMEBackground = "#FFFFCC";
					gridRow.TYPE_NAMEBackground = "#FFFFCC";
					gridRow.REMARKBackground = "#FFFFCC";
					gridRow.REMARKCanEdit = 0;
					gridRow.WEIGHTBackground = "#FFFFCC";
					
					
					for (var i = 0; i < colList.length; i++) {
						var colLRow = colList[i];
						var colEdit = colLRow.COL_NAME + "CanEdit";
						var colBackground = colLRow.COL_NAME + "Background";
						gridRow[colEdit] = 0;

						
						gridRow[colBackground] = "#FFFFCC";
					}				
				}
				else if(gridRow.GUBUN_CODE == "R") {
					for (var i = 0; i < colList.length; i++) {
						var colLRow = colList[i];
						var colEdit = colLRow.COL_NAME + "CanEdit";
						var colBackground = colLRow.COL_NAME + "Background";
						if(canEdit(colLRow.COL_NAME, gridRow.GUBUN_CODE, gridRow.TYPE_CODE)) {
							gridRow[colEdit] = 1;
							gridRow[colBackground] = "#DDEBF7";
						}
					}	
				}
				else if(gridRow.GUBUN_CODE == "P") {
					gridRow.TYPE_NAMESpanned = 1;
					gridRow.TYPE_NAMERowSpan = 3;
				}
				else if(gridRow.GUBUN_CODE == "NN") {
					for (var i = 0; i < colList.length; i++) {
						var colLRow = colList[i];
						gridRow[colLRow.COL_NAME + 'CanEdit'] = 0;
						gridRow[colLRow.COL_NAME + 'Class'] = 'gridBorderText gridTextColor gridCenterText';
					}
				}
				else {
				
					if(gridRow.TYPE_CODE == "S"){
						gridRow.REMARKCanEdit = 0;				
					}					
						
				}				
				
				if(gridRow.GUBUN_CODE != "P") {
					if(gridRow.TYPE_CODE != "NN") gridRow.TYPE_NAME = '';
					gridRow.WEIGHT = "";
				}	
				else if(gridRow.GUBUN_CODE == "P" && gridRow.TYPE_CODE == "S") {
					gridRow.WEIGHT = "";
				}
			} else {
//				if(gridRow.GUBUN_SUB_CODE == "P") {
//					gridRow.REMARKCanEdit = 0;
//				} else {
//					gridRow.REMARKCanEdit = 1;
//				}
//				for (var i = 0; i < colList.length; i++) {
//					var colName = colList[i].COL_NAME;
//					if(canEdit(colName, gridRow.GUBUN_SUB_CODE, gridRow.TYPE_SUB_CODE)) {
//						gridRow[colName + 'Background'] = "#DDEBF7";
//					} else {
//						gridRow[colName + 'CanEdit'] = 0;
//						gridRow[colName + 'OnClickCell'] = '';
//					}
//				}
			}			
					
			dlgDesmMprCreationDetailProgressGrid.RefreshRow(gridRow);
			
		}
	}
	
	if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
		setGridEdit(dlgDesmMprCreationDetailProgressGrid);
	}	
		
	
}

var colList = new Array();
function searchDlgDesmMprCreationDetailProgressData() {
	
	dlgDesmMprCreationDetailProgressGrid.Dispose();
		
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null  && v_desm_mpr_creation_param.MPR_SEQ != "") {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	var mprNo = "";
	if(v_desm_mpr_creation_param.MPR_NO != null && v_desm_mpr_creation_param.MPR_NO != "") {
		mprNo = v_desm_mpr_creation_param.MPR_NO;
	}	
	
	$.ajax({
		url: "/getDesmMprDetailProgressData.do",	
		data: {MPR_SEQ : mprSeq, MPR_NO : mprNo,
			   PO_NO : $('#txtDlgDesmMprCreationPoNo').val()},
		success: function (data, textStatus, jqXHR) {
			colList = data.results.colList;
			var dataList = data.results.dataList;
			
			setDlgDesmMprCreationDetailProgressData(dataList);			
			
		}
	});	
}

function setDlgDesmMprCreationDetailProgressData(dataList) {
	dlgDesmMprCreationDetailProgressGridCol.Cols = [];
	dlgDesmMprCreationDetailProgressGridCol.Head = [];

	var gridColHeader1 = {"Kind"	: "Header",
						  "id" : "Header",
						  "Spanned" : "1",
						  "PanelRowSpan" : "2",
						  "Class" : "gridCenterText",
						  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMESpanned" : "1", "TYPE_NAMESpan" : "3",
						  "GUBUN_NAME"	: $('#gridColMprType').val()};

	for (var i = 0; i < colList.length; i++) {
		var colLRow = colList[i];
		
		var gridCol = {};
		gridCol.Name = colLRow.COL_NAME;
		gridCol.Width = "100";

		dlgDesmMprCreationDetailProgressGridCol.Cols.push(gridCol);  
		
		gridColHeader1[gridCol.Name] = colLRow.YY + "." + colLRow.MM;
	}

	var gridCol = {};
	gridCol.Name = "REMARK";
	gridCol.Width = "300";
	gridCol.Type = "Text";
	gridCol.Class = "gridBorderText gridTextColor";
	gridCol.CanMove = "0";
	gridCol.CanEdit = "1";
	gridCol.Spanned = "1";
	dlgDesmMprCreationDetailProgressGridCol.Cols.push(gridCol);  
	
	gridColHeader1["REMARK"] = "Remark";
	
	dlgDesmMprCreationDetailProgressGridCol.Head.push(gridColHeader1);
	
	var gridBodyData = new Array();
	$.each(dataList, function(i, item) {
		var bodyData = item;
		if(i == 0) {
			bodyData['Spanned'] = 1;
			bodyData['REMARKCanEdit'] = 0;
			bodyData['TYPE_NAMESpan'] = 3;
			bodyData['TYPE_SUB_NAME'] = '';
			bodyData['GUBUN_NAME'] = '';
		} else {
			if(item.TYPE_SUB_NAME == null || item.TYPE_SUB_NAME == '' || item.TYPE_SUB_NAME == 'NN') {
				if(item.GUBUN_CODE == "P") {
					bodyData['Spanned'] = '1';
					bodyData['TYPE_NAMERowSpan'] = 3;
					bodyData['TYPE_NAMESpan'] = 2;
					bodyData['WEIGHTRowSpan'] = 3;
				}
				for (var i = 0; i < colList.length; i++) {
					var colName = colList[i].COL_NAME;
					bodyData[colName] = Number(item[colName]);
					bodyData[colName + 'Width'] = 100;
					bodyData[colName + 'Type'] = 'Int';
					bodyData[colName + 'Format'] = '##0\%';
					bodyData[colName + 'CanMove'] = 0;
					bodyData[colName + 'CanEdit'] = 0;
					bodyData[colName + 'Spanned'] = 1;
					bodyData[colName + 'Class'] = 'gridBorderText gridTextColor gridCenterText';
				}
			} else {
				bodyData['Spanned'] = 1;
				bodyData['GUBUN_NAME'] = item.GUBUN_SUB_NAME;
				bodyData['GUBUN_NAMESpan'] = 2;
				bodyData['GUBUN_NAMEClass'] = "gridBorderText gridTextColor";
				bodyData['TYPE_NAME'] = '';
				bodyData['WEIGHT'] = '';
				bodyData['REMARKCanEdit'] = 0;
				if(item.GUBUN_SUB_CODE == "P") {
					bodyData['TYPE_NAMERowSpan'] = 2;
					bodyData['TYPE_SUB_NAMERowSpan'] = 2;
//					bodyData["GUBUN_NAMEBackground"] = '#FFFFCC';
				}
				for (var i = 0; i < colList.length; i++) {
					var colName = colList[i].COL_NAME;
//					if(bodyData.GUBUN_SUB_CODE == "P") {
//						bodyData[colName + 'Type'] = 'Text';
//						bodyData[colName + 'CanEdit'] = 0;
//						bodyData[colName + 'OnClickCell'] = '';
//						bodyData[colName + 'Background'] = '';
//						if(bodyData[colName] != null && bodyData[colName].length == 10) {
//							bodyData[colName] = bodyData[colName].substring(2);
//						}
//					} else {
//						bodyData[colName + 'Type'] = 'Date';
//						bodyData[colName + 'CanEdit'] = 1;
//						bodyData[colName + 'OnClickCell'] = 'ShowCustomCalendar( Grid, Row, Col, true )';
//						bodyData[colName + 'Button'] = '';
//						bodyData[colName + 'Format'] = 'yy/MM/dd';
//					}

//					bodyData[colName + 'Type'] = 'Text';
//					bodyData[colName + 'Type'] = 'Date';
//					bodyData[colName + 'CanEdit'] = '0';
//					bodyData[colName + 'OnClickCell'] = '';
//					bodyData[colName + 'Button'] = '';
//					bodyData[colName + 'Format'] = 'yy/MM/dd';
//					bodyData[colName + 'Background'] = '';

					bodyData[colName + 'Format'] = '';
					bodyData[colName + 'Background'] = '';

					bodyData[colName + 'Spanned'] = 1;
					bodyData[colName + 'CanEdit'] = 0;
					bodyData[colName + 'CanMove'] = 0;
					bodyData[colName + 'Class'] = 'gridBorderText gridTextColor gridCenterText';
				}
			}
		}
		gridBodyData.push(bodyData);
	});
	
	dlgDesmMprCreationDetailProgressGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationDetailProgressGridCol}, Data:{Data : {Body: [gridBodyData]}}, Text: gridLang},"gridDlgDesmMprCreationDetailnProgress" );

}

function setDlgDesmMprCreationDetailProgressData_230503(dataList) {
	dlgDesmMprCreationDetailProgressGridCol.Cols = [];
	dlgDesmMprCreationDetailProgressGridCol.Head = [];
	
	var gridColHeader1 = {"Kind"	: "Header",
						  "id" : "Header",
						  "Spanned" : "1",
						  "PanelRowSpan" : "2",
						  "Class" : "gridCenterText",
						  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMERowSpan" : "2", "TYPE_NAMESpan" : "2",
						  "GUBUN_NAME"	: $('#gridColMprType').val()};
	var gridColHeader2 = {"Kind"	: "Header",
						  "Spanned" : "1",
						  "Class" : "gridCenterText",
						  "TYPE_NAME"	: $('#gridColMprType').val(),
						  "GUBUN_NAME"	: $('#gridColMprType').val()};
						  
	var gridCol = {};
	gridCol.Name = "WEIGHT";
	gridCol.Width = "100";
	gridCol.Type = "Int";
	gridCol.Format = "##0\%";
	gridCol.Class = "gridBorderText gridTextColor gridCenterText";
	gridCol.CanMove = "0";
	gridCol.CanEdit = "1";
	gridCol.Spanned = "1";
	dlgDesmMprCreationDetailProgressGridCol.Cols.push(gridCol);  
	
	gridColHeader1["WEIGHT"] = $('#gridColMprIncrease').val();
	gridColHeader1["WEIGHTRowSpan"] = "2";
	gridColHeader2["WEIGHT"] = $('#gridColMprIncrease').val();  						  
	
	for (var i = 0; i < colList.length; i++) {
		var colLRow = colList[i];
		
		var gridCol = {};
		gridCol.Name = colLRow.COL_NAME;
		gridCol.Width = "100";
		gridCol.Type = "Int";
		gridCol.Format = "##0\%";
		gridCol.Class = "gridBorderText gridTextColor gridCenterText";
		gridCol.CanMove = "0";
		gridCol.CanEdit = "1";
		gridCol.Spanned = "1";
		
		dlgDesmMprCreationDetailProgressGridCol.Cols.push(gridCol);  
		
		gridColHeader1[gridCol.Name] = colLRow.YY + "." + colLRow.MM;
		gridColHeader1[gridCol.Name + "RowSpan"] = "2";
		
		gridColHeader2[gridCol.Name] = colLRow.YY + "." + colLRow.MM;     
	}
	
	gridCol = {};
	gridCol.Name = "REMARK";
	gridCol.Width = "300";
	gridCol.Type = "Text";
	gridCol.Class = "gridBorderText gridTextColor";
	gridCol.CanMove = "0";
	gridCol.CanEdit = "1";
	gridCol.Spanned = "1";
	dlgDesmMprCreationDetailProgressGridCol.Cols.push(gridCol);  
	
	gridColHeader1["REMARK"] = "Remark";
	gridColHeader1["REMARKRowSpan"] = "2";
	gridColHeader2["REMARK"] = "Remark";     	
	
	dlgDesmMprCreationDetailProgressGridCol.Head.push(gridColHeader1);
	dlgDesmMprCreationDetailProgressGridCol.Head.push(gridColHeader2);
					 	
	dlgDesmMprCreationDetailProgressGrid = TreeGrid( {Layout:{Data : dlgDesmMprCreationDetailProgressGridCol}, Data:{Data : {Body: [dataList]}}, Text: gridLang},"gridDlgDesmMprCreationDetailnProgress" );		
				 				 								  
}

function setDlgDesmMprCreationAttListPopUpData() {
	
	var attachGrpCd = "";
	
	if(v_desm_mpr_creation_param.ATTACH_GRP_CD != null) {
		attachGrpCd = v_desm_mpr_creation_param.ATTACH_GRP_CD;
	}
	
	$.ajax({
		url: "/getTransShippingRequestDlgAttList.do",		
		data: {"FILE_GRP_CD" : attachGrpCd},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			$('#txtDlgDesmMprCreationAttListFile').fileinput("destroy");
			$('#txtDlgDesmMprCreationAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgDesmMprCreationAttListFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});
				
				if(!fileUse) {					
					$('#divDlgDesmMprCreationAtt .input-group-btn').css("display", "none");
					$('#divDlgDesmMprCreationAtt .kv-file-remove').css("display", "none");
				}				
				
				return;
			} 
			
			var fileUrl = new Array;
			var fileInfo = new Array;
			
			$.each(list, function (index, entry) {
				var url = "/getTransAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getTransAttachPreview.do?code=" + entry.ID;
				
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});
			
			$('#txtDlgDesmMprCreationAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteTransShippingRequestDlgAttList.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " " + $("#alertFileAtt").val()
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				//var aborted = !window.confirm($('#alertDelete').val());
				//return aborted;				
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				//setTransAttListPopUpData();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});			
			
			if(!fileUse) {					
				$('#divDlgDesmMprCreationAtt .input-group-btn').css("display", "none");
				$('#divDlgDesmMprCreationAtt .kv-file-remove').css("display", "none");
			}				
        }
    });
}

function setDlgDesmMprCreationQualityAttListPopUpData() {
	
	var qualityGrpCd = "";
	
	if(v_desm_mpr_creation_param.QUALITY_GRP_CD != null) {
		qualityGrpCd = v_desm_mpr_creation_param.QUALITY_GRP_CD;
	}
	
	$.ajax({
		url: "/getTransShippingRequestDlgAttList.do",		
		data: {"FILE_GRP_CD" : qualityGrpCd},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			$('#txtDlgDesmMprCreationQualityAttListFile').fileinput("destroy");
			$('#txtDlgDesmMprCreationQualityAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgDesmMprCreationQualityAttListFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});
				
				if(!fileUse) {					
					$('#divDlgDesmMprCreationQualityAtt .input-group-btn').css("display", "none");
					$('#divDlgDesmMprCreationQualityAtt .kv-file-remove').css("display", "none");
				}				
				
				return;
			} 
			
			var fileUrl = new Array;
			var fileInfo = new Array;
			
			$.each(list, function (index, entry) {
				var url = "/getTransAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getTransAttachPreview.do?code=" + entry.ID;
				
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});
			
			$('#txtDlgDesmMprCreationQualityAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteTransShippingRequestDlgAttList.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " " + $("#alertFileAtt").val()
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				//var aborted = !window.confirm($('#alertDelete').val());
				//return aborted;				
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				//setTransAttListPopUpData();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});			
			
			if(!fileUse) {					
				$('#divDlgDesmMprCreationQualityAtt .input-group-btn').css("display", "none");
				$('#divDlgDesmMprCreationQualityAtt .kv-file-remove').css("display", "none");
			}				
        }
    });
}

function setDlgDesmMprCreationDesignAttListPopUpData() {
	
	var designGrpCd = "";
	
	if(v_desm_mpr_creation_param.DESIGN_GRP_CD != null) {
		designGrpCd = v_desm_mpr_creation_param.DESIGN_GRP_CD;
	}
	
	$.ajax({
		url: "/getTransShippingRequestDlgAttList.do",		
		data: {"FILE_GRP_CD" : designGrpCd},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			$('#txtDlgDesmMprCreationDesignAttListFile').fileinput("destroy");
			$('#txtDlgDesmMprCreationDesignAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgDesmMprCreationDesignAttListFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});
				
				if(!fileUse) {					
					$('#divDlgDesmMprCreationDesignAtt .input-group-btn').css("display", "none");
					$('#divDlgDesmMprCreationDesignAtt .kv-file-remove').css("display", "none");
				}				
				
				return;
			} 
			
			var fileUrl = new Array;
			var fileInfo = new Array;
			
			$.each(list, function (index, entry) {
				var url = "/getTransAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getTransAttachPreview.do?code=" + entry.ID;
				
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});
			
			$('#txtDlgDesmMprCreationDesignAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteTransShippingRequestDlgAttList.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " " + $("#alertFileAtt").val()
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				//var aborted = !window.confirm($('#alertDelete').val());
				//return aborted;				
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				//setTransAttListPopUpData();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});			
			
			if(!fileUse) {					
				$('#divDlgDesmMprCreationDesignAtt .input-group-btn').css("display", "none");
				$('#divDlgDesmMprCreationDesignAtt .kv-file-remove').css("display", "none");
			}				
        }
    });
}

function closeDesmMprCreationPopUp() {
	if(dlgDesmMprCreationProgressGrid) 			dlgDesmMprCreationProgressGrid.Dispose();
	if(dlgDesmMprCreationDetailProgressGrid)	dlgDesmMprCreationDetailProgressGrid.Dispose();
	if(dlgDesmMprCreationProgressNoteGrid) 		dlgDesmMprCreationProgressNoteGrid.Dispose();
	if(dlgDesmMprCreationRemarksGrid) 			dlgDesmMprCreationRemarksGrid.Dispose();	
	if(dlgDesmMprCreationProcureGrid) 			dlgDesmMprCreationProcureGrid.Dispose();
	if(dlgDesmMprCreationManufactureGrid) 		dlgDesmMprCreationManufactureGrid.Dispose();
	if(dlgDesmMprCreationPaymentsGrid) 			dlgDesmMprCreationPaymentsGrid.Dispose();
	if(dlgDesmMprCreationDesignGrid) 			dlgDesmMprCreationDesignGrid.Dispose();
	if(dlgDesmMprCreationQualityGrid) 			dlgDesmMprCreationQualityGrid.Dispose();
}

var fileList = [];	

function txtDlgDesmMprCreationPhotoAttListFileChange() {
	var files = document.getElementById('txtDlgDesmMprCreationPhotoAttListFile').files;
	
	if(files.length == 0){
		return;
	}
	
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];
		var elId = "#imgFileTxt_" + fileRow.IDX;
		fileRow.REM = $(elId).val();		
	}	
	
	getImg(files, 0);
	
}

function getImg (files, fileIdx){
	
	if(files.length == fileIdx) {
		$('#txtDlgDesmMprCreationPhotoAttListFile').val("");
		setDlgDesmMprCreationPhotoAtt();
	}
	else{
		workFileReader(files, fileIdx);
	}
}

function workFileReader (files, fileIdx){
	var file = files[fileIdx];	
	var reader = new FileReader();
	imgFileIdx = imgFileIdx + 1;
    reader.onload = e => {
         var fileRow = {"IDX" : imgFileIdx, "FILE_NAME" : file.name, "SRC" : e.target.result, "SAVE_YN" : "N", "FILE" : file};
         fileList.push(fileRow);
         
         getImg (files, fileIdx + 1);
    }
    reader.readAsDataURL(file);
}

function getfileSaveCnt(){
	var cnt = 0;
	for(var i = 0; i < fileList.length; i++) {
		var resultRow = fileList[i];
		if(resultRow.SAVE_YN == "Y") {
			cnt = cnt + 1;
		}	
	}
	return cnt;
}

function setDlgDesmMprCreationPhotoAtt(){
	var imgColMaxCnt = 3;
	var cnt = fileList.length;
	var btnDelFlag = true;
	var fileMsg = $('#fileSelectText').val();
	var fileSaveCnt = getfileSaveCnt();
	var readonly = "";
	
	if(fileSaveCnt == cnt) {
		btnDelFlag = false;
		fileMsg = $('#fileAttachedText').val();
	}

	if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
		readonly = "readonly";
	}

	if(!fileUse) {
		$('#divDlgDesmMprCreationPhotoAttListBtn .input-group-btn').css("display", "none");
	}	
		
	if(cnt == 0){
		var html = '<div class="col-sm-12 file-drop-zone-title">' + $('#fileSelectDragText').val() + '</div>';
		$('#divDlgDesmMprCreationPhotoAttListBox').html(html);
		$('#btnDlgDesmMprCreationPhotoAttListDelete').hide();
		$('#divDlgDesmMprCreationPhotoAttListIcon').removeClass("icon-visible");
		$('#txtDlgDesmMprCreationPhotoAttListInfo').val("");
		return;
	}
	else {
		if(btnDelFlag) {
			$('#btnDlgDesmMprCreationPhotoAttListDelete').show();	
		}
		else {
			$('#btnDlgDesmMprCreationPhotoAttListDelete').hide();
		}
		$('#divDlgDesmMprCreationPhotoAttListIcon').addClass("icon-visible");
		$('#txtDlgDesmMprCreationPhotoAttListInfo').val(cnt + " " + fileMsg);
	}
	

	
	var imgRowCnt = parseInt(cnt / imgColMaxCnt);
	var imgRowAddCnt = cnt % imgColMaxCnt;
	
	if(imgRowAddCnt > 0){
		imgRowCnt = imgRowCnt + 1;
	}
	
	var imgColCnt = 1;
	var html = '';
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];	
		var rem = fileRow.REM == null ? "" : fileRow.REM;
		
		
		if(imgColCnt > imgColMaxCnt) {
			imgColCnt = 1;
		}
		
		if(imgColCnt == 1) {
			html += '<div class="file-preview-thumbnails clearfix hide-content" >';
		}
		
		html += '	<div class="file-preview-frame krajee-default  kv-preview-thumb" style="width:32.8%; height:330px" onmouseover="imgBtnShow(\'' + "footerBtn" + fileRow.IDX + '\')" onmouseout="imgBtnHide(\'' + "footerBtn" + fileRow.IDX + '\')">';
		html += '		<div style="width:100%; height:250px">';
		html += '			<img src="' + fileRow.SRC + '" class="file-preview-image kv-preview-data file-zoom-detail" style="width:auto;height:auto;max-width:100%;max-height:100%;" >';
		html += '		</div>';
		html += '	  	<div style="width:100%;padding-top: 4px;">';
		html += '	  		<div ><textarea id="imgFileTxt_' + fileRow.IDX  + '" type="text" class="form-control form-control-user " style="font-size:11px;line-height:1.5;resize:none" rows="3" autocomplete=off ' + readonly + ' >' + rem + '</textarea></div>';
		

		
		html += '	  		<div id="footerBtn' + fileRow.IDX  + '" class="file-footer-buttons" style="width:100%;margin-top:-150px; margin-right: 4px; position: relative;display:none">';
		if(fileRow.SAVE_YN == "Y") {
			
			
			html += '	  			<a class="kv-file-download btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" download="' + fileRow.FILE_NAME + '" href="/getTransAttachDownload.do?code=' + fileRow.ID +'" target="_blank">';
			html += '	  				<i class="fas fa-download"></i>';
			html += '	  			</a>';				
	
		}	
		
		if(fileUse) {
			html += '	  			<button type="button" class="kv-file-remove btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" style="margin-left:3px" onclick="deletePhoto(\'' + fileRow.IDX + '\')">';
			html += '	  				<i class="fas fa-trash-alt"></i>';
			html += '	  			</button>';			
		}			
		
		html += '	  			<button type="button" class="kv-file-zoom btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" style="margin-left:3px" onclick="dlgDesmMprCreationPhotoPreview(\'' + fileRow.IDX + '\')">';
		html += '	  				<i class="fas fa-search-plus"></i>';
		html += '	  			</button>';
		html += '	  		</div>'; 																		
		html += '	  	</div>';
		html += '	</div>';								
		
		if(imgColCnt == imgColMaxCnt || fileList.length == i + 1) {
			html += '</div>';
		}
		
		imgColCnt += 1;	
		
	}
	
	
	$('#divDlgDesmMprCreationPhotoAttListBox').html(html);

		
}

function divDlgDesmMprCreationPhotoAttListBoxDrop(e) {
	var files = e.originalEvent.dataTransfer.files;
	
	if(files.length == 0){
		return;
	}
	
	
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];
		var elId = "#imgFileTxt_" + fileRow.IDX;
		fileRow.REM = $(elId).val();		
	}		
	
	getImg(files, 0);
}

function btnDlgDesmMprCreationPhotoAttListDeleteClick() {
	for(var i = fileList.length - 1; i >= 0; i--) {
		var fileRow = fileList[i];
		if(fileRow.SAVE_YN == "N") {
			fileList.splice(i, 1);
		}
	}
	
	setDlgDesmMprCreationPhotoAtt();
}

function btnDlgDesmMprCreationSubmitClick() {

	if($('#txtDlgDesmMprCreationPoNo').val().length < 2 || $('#txtDlgDesmMprCreationPoName').val() == ""){
		$('#txtDlgDesmMprCreationPoNo').val("");
		$('#txtDlgDesmMprCreationPoName').val("");
		$('#txtDlgDesmMprCreationSupplier').val("");
		$("#txtDlgDesmMprCreationPoNo").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("divDlgDesmMprCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	confirm_modal("", alMsg = $('#alertRequest').val(), null, function (callobj, result) {
		if(result) {
			
			mprSaveHeader("Pre-Confirmed");			
		    
		}
	});		
}

function btnDlgDesmMprCreationSaveClick() {

	if(v_desm_mpr_creation_param.MPR_NO == null || v_desm_mpr_creation_param.MPR_NO == "") {
		alert_modal("", $('#alertMprPoSelectErr').val());
		return;				
	}

	var mprMonth = $('#txtDlgDesmMprCreationMPRDate').val().replace('/', '');
	var startMonth = v_desm_mpr_creation_param.START_MONTH.replace('/', '');
	var endMonth = v_desm_mpr_creation_param.END_MONTH.replace('/', '');
	if(Number(mprMonth) < Number(startMonth) || Number(mprMonth) > Number(endMonth)) {
		alert_modal("", $('#alertMprPoMonthErr').val());
		return;				
	}

	if($('#txtDlgDesmMprCreationPoNo').val().length < 2 || $('#txtDlgDesmMprCreationPoName').val() == ""){
		$('#txtDlgDesmMprCreationPoNo').val("");
		$('#txtDlgDesmMprCreationPoName').val("");
		$('#txtDlgDesmMprCreationSupplier').val("");
		$("#txtDlgDesmMprCreationPoNo").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("divDlgDesmMprCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	confirm_modal("", $('#alertMprSave').val(), null, function (callobj, result) {
		if(result) {
			setTimeout(function() {
				mprSaveHeader($('#txtDlgDesmMprCreationMprStatus').val());			
			}, 500);
		    
		}
	});		
}

function mprSaveHeader(status) {
	dlgDesmMprCreationDetailProgressGrid.ActionAcceptEdit();
	dlgDesmMprCreationProgressNoteGrid.ActionAcceptEdit();
	dlgDesmMprCreationRemarksGrid.ActionAcceptEdit();
	dlgDesmMprCreationProcureGrid.ActionAcceptEdit();
	dlgDesmMprCreationDesignGrid.ActionAcceptEdit();
	dlgDesmMprCreationManufactureGrid.ActionAcceptEdit();
	dlgDesmMprCreationQualityGrid.ActionAcceptEdit();
	
	var mprDate = $('#txtDlgDesmMprCreationMPRDate').val() + "";
	var mprDateArr = mprDate.split('/');	

	mprDate = mprDateArr[0] + "_" + mprDateArr[1];
	var date = new Date(mprDateArr[0], Number(mprDateArr[1]) + "", "1");
	
	var nextMprDate = date.getFullYear() + "_" + (date.getMonth() + 1);
	if((date.getMonth() + 1).toString().length == 1) {
		nextMprDate = date.getFullYear() + "_0" + (date.getMonth() + 1);
	}
	
	var prevMprDate = date.getFullYear() + "_" + (date.getMonth() - 1);
	if((date.getMonth() - 1).toString().length == 1) {
		prevMprDate = date.getFullYear() + "_0" + (date.getMonth() - 1);
	}			
	

	// 2023-06-15 영역별 일정 입력 기준 변경(Validation)
	var alertTabShow = function(msg, tabId) {
		alert_modal("", msg);
		$('.nav-tabs a[href="#' + tabId + '"]').tab('show');
	};
	var dateString = function(d) {
		if(d == null || d == '') return d;
		var arrDate = d.split('/');
		return arrDate.length < 2 ? '' : arrDate[0] + "_" + arrDate[1];
	};
	var designGridList = dlgDesmMprCreationDesignGrid.Rows;
	if(designGridList.NoData.Visible == 1) {
		return alertTabShow($('#alertMprDesignSelectErr').val(), 'tabDlgDesmMprCreationDesign');
	}

	var isCheckMFG = false;
	var isApprovalDate = false;
	for (var key in designGridList) {
		var gridRow = designGridList[key];
		if(gridRow.Kind == 'Data') {
//			첫 번째 MPR 작성 월차일 때에는 Design Tab에 최소한 하나 이상의 MFG가 체크가 되어 있어야 함
			if(gridRow.MFG_YN == 'Y') {
				isCheckMFG = true;
//				MFG 체크가 되어있으면, Approval Due Date가 Required
				if(gridRow.APPROVAL_EXPECTED == '') {
					return alertTabShow($('#alertMprDesignMfgNullErr').val(), 'tabDlgDesmMprCreationDesign');
				};
			};
//			MPR작성 월차가 Approval Due Date를 포함하고 있으면 Approval Date 입력이 필요함
			var isApprovalContain = (mprDate == dateString(ExcelDateToJSDate(gridRow.APPROVAL_EXPECTED))) ? true : false;
			if(isApprovalContain && gridRow.APPROVAL_ACTUAL == '') {
//				return alertTabShow($('#alertMprDesignMfgApprovalDateErr').val(), 'tabDlgDesmMprCreationDesign');
				isApprovalDate = true;
			};
		};
	};
	
	if(!isCheckMFG) {
		return alertTabShow($('#alertMprDesignMfgCheckErr').val(), 'tabDlgDesmMprCreationDesign');
	};

	var saveData = function() {
		var gridList = dlgDesmMprCreationDetailProgressGrid.Rows;
		for (var key in gridList) {		
			var gridRow = gridList[key];
			if(gridRow.Fixed == null){
				
				console.log('GUBUN_CODE', gridRow.GUBUN_CODE);
				if(gridRow.GUBUN_CODE == "R") {
					prevVal = gridRow[prevMprDate] == null || gridRow[prevMprDate] == "" ? 0 : gridRow[prevMprDate];
					curVal = gridRow[mprDate] == null || gridRow[mprDate] == "" ? 0 : gridRow[mprDate];
					nextVal = gridRow[nextMprDate] == null || gridRow[nextMprDate] == "" ? 0 : gridRow[nextMprDate];
					console.log('GUBUN_CODE', prevVal, curVal);
					
					//if(prevVal > curVal || curVal > nextVal) {
					// 문구 당월 실적보다 차월 예상이 작습니다.
					// 조건이 잘못된 것 같음
					// prevVal > curVal :: 전월 실적이 당월 실적보다 클경우 조건이 걸리면 메세지가 바껴야 할 것 같음.
					// curVal > nextVal :: 현재 조건은 실적의 값들로만 비교하고 있음 그래서 차월 실적은 무조건 0이라서 계속 걸림
					// 문구대로라면 차월 예상을 봐야할 것 같은데 그게 GUBUN_CODE로 잡아오는건지는 모르겠음, 조금더 봐야하지만 급한대로 일단 전월 실적 비교만 넣어둠.
					if(prevVal > curVal) {
						alert_modal("", $('#alertSvaeMprDetailProgressErr').val());
						return;				
					}
				}
			}
		}	
		
		
		var formData = new FormData();
		var file_obj = $("#txtDlgDesmMprCreationAttListFile");
		for (var i = 0; i < file_obj.length; i++)
		{
			for (var j = 0; j < file_obj[i].files.length; j++)
			{	
				var pattern_spc = /['",]/;
				if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())){
					alert($('#alertFileCheck').val());
					return false
				}
					
				
				formData.append("ATT" + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	
			}
		}	
		
		var design_file_obj = $("#txtDlgDesmMprCreationDesignAttListFile");
		for (var i = 0; i < design_file_obj.length; i++)
		{
			for (var j = 0; j < design_file_obj[i].files.length; j++)
			{	
				var pattern_spc = /['",]/;
				if(pattern_spc.test(design_file_obj[i].files[j].name.toUpperCase())){
					alert($('#alertFileCheck').val());
					return false
				}
					
				
				formData.append("DESIGN_ATT" + "_" + i.toString() + j.toString(), design_file_obj[i].files[j]);	
			}
		}	
		
		var quality_file_obj = $("#txtDlgDesmMprCreationQualityAttListFile");
		for (var i = 0; i < quality_file_obj.length; i++)
		{
			for (var j = 0; j < quality_file_obj[i].files.length; j++)
			{	
				var pattern_spc = /['",]/;
				if(pattern_spc.test(quality_file_obj[i].files[j].name.toUpperCase())){
					alert($('#alertFileCheck').val());
					return false
				}
					
				
				formData.append("QUALITY_ATT" + "_" + i.toString() + j.toString(), quality_file_obj[i].files[j]);	
			}
		}		
		
		var imgFielTxtList = [];
		for (var i = 0; i < fileList.length; i++){
			var fileRow = fileList[i];
			if(fileRow.SAVE_YN == "N"){
				var pattern_spc = /['",]/;
				if(pattern_spc.test(fileRow.FILE.name.toUpperCase())){
					alert($('#alertFileCheck').val());
					return false
				}		
			
				formData.append("PHOTO" + "_" + fileRow.IDX, fileRow.FILE);
				
				var imgFileTxtId = "#imgFileTxt_" + fileRow.IDX;
				var imgFielTxtRow = {"ID" : "PHOTO_TXT" + "_" + fileRow.IDX, "TXT" : $(imgFileTxtId).val()};
				imgFielTxtList.push(imgFielTxtRow);
			}
			else {
				var imgFileTxtId = "#imgFileTxt_" + fileRow.IDX;
				var imgFielTxtRow = {"ID" : fileRow.ID, "TXT" : $(imgFileTxtId).val()};
				imgFielTxtList.push(imgFielTxtRow);
			}
		}
		
		var imgFielTxtListJson = JSON.stringify(imgFielTxtList);
		formData.append("imgFielTxtList", imgFielTxtListJson);
		
		
		if(v_desm_mpr_creation_param.MPR_SEQ != null) {
			formData.append("MPR_SEQ", v_desm_mpr_creation_param.MPR_SEQ);
			formData.append("ATTACH_GRP_CD", v_desm_mpr_creation_param.ATTACH_GRP_CD);
			formData.append("PHOTO_GRP_CD", v_desm_mpr_creation_param.PHOTO_GRP_CD);
			formData.append("DESIGN_GRP_CD", v_desm_mpr_creation_param.DESIGN_GRP_CD);
			formData.append("QUALITY_GRP_CD", v_desm_mpr_creation_param.QUALITY_GRP_CD);	
		}
		
		formData.append("TO_DAY", toDay);	
		
		formData.append("PROJECT_NO", $('#txtDlgDesmMprCreationProjectNo').val());
		formData.append("PO_NO", $('#txtDlgDesmMprCreationPoNo').val());
		formData.append("PRODUCT_NAME", $('#txtDlgDesmMprCreationProductName').val());
		formData.append("PO_PROMISED_DATE", $('#txtDlgDesmMprCreationPoPromisedDate').val());
		formData.append("MPR_DATE", $('#txtDlgDesmMprCreationMPRDate').val());
		$("#selDlgDesmMprCreationRound").attr('disabled', false);
		formData.append("M", $('#selDlgDesmMprCreationRound').val());
		formData.append("STATUS", status);
		formData.append("RESULT_YN", $('#txtDlgDesmMprCreationResultYn').val());
		formData.append("RESULT_REMARK", $('#txtDlgDesmMprCreationResultRemark').val());
		formData.append("REQUEST_REMARK", $('#txtDlgDesmMprCreationRequestRemark').val());	
		formData.append("MPR_NO", v_desm_mpr_creation_param.MPR_NO);
		formData.append("DESIGN_REMARK", $('#txtDlgDesmMprCreationDesignRemark').val());
		formData.append("DESIGN_NOTE", $('#txtDlgDesmMprCreationDesignNote').val());
		formData.append("QUALITY_REMARK", $('#txtDlgDesmMprCreationQualityRemark').val());
		formData.append("QUALITY_NOTE", $('#txtDlgDesmMprCreationQualityNote').val());	
		
		$.ajax({			
			url: "/saveDesmMprHeader.do",
			data: formData,
			processData: false,
			contentType: false,			
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					if(result.error == "-1") {
						alert_fail($('#alertSaveAlreadyData').val() + " [MPR Date : " + result.MPR_DATE + "]");
					} else if(result.error == "-2") {
						alert_fail($('#alertFileCheckEx').val());
					} else if(result.error == "-3") {
						alert_fail($('#alertPhotoFileCheckEx').val());
					} else if(result.error == "-4") {
						alert_fail($('#alertMailFail').val());
					} else {
						alert_fail(result.error);
					}
					parent.LodingHide();
				} else {
					v_desm_mpr_creation_param.MPR_SEQ = result.resultMap.MPR_SEQ;
					mprSaveDetail(status);
				}
			},
			complete: function (e) {
				
			}			
		});	
	}
	
	/*
	if(isApprovalDate) {
		confirm_modal("", $('#alertMprDesignMfgApprovalDateErr').val(), null, function (callobj, result) {
			if(result) {
				$('.nav-tabs a[href="#alertMprDesignMfgApprovalDateErr"]').tab('show');
			} else {
				saveData();
			}
		}, '', $('#alertButtonDesmNext').val());
	} else {
		saveData();
	}
	*/
	saveData();
}

function mprSaveDetail(status) {
	dlgDesmMprCreationDetailProgressGrid.ActionAcceptEdit();
	dlgDesmMprCreationProgressNoteGrid.ActionAcceptEdit();
	dlgDesmMprCreationRemarksGrid.ActionAcceptEdit();
	dlgDesmMprCreationProcureGrid.ActionAcceptEdit();
	dlgDesmMprCreationDesignGrid.ActionAcceptEdit();
	dlgDesmMprCreationQualityGrid.ActionAcceptEdit();
	

	
	var gridList = dlgDesmMprCreationDetailProgressGrid.Rows;
    var updateList = [];
    var updateRemarkList = [];	
	for (var key in gridList) {		
		var gridRow = gridList[key];
		if(gridRow.Fixed == null){
			
			if(gridRow.TYPE_CODE != "NN" && gridRow.GUBUN_CODE != "P") {
				for (var j = 0; j < colList.length; j++) {
					var colLRow = colList[j];
					var updateRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(),
						  TYPE_CODE : gridRow.TYPE_CODE, GUBUN_CODE : gridRow.GUBUN_CODE, 
						  TYPE_SUB_CODE : gridRow.TYPE_SUB_CODE, GUBUN_SUB_CODE : gridRow.GUBUN_SUB_CODE, 
						  YYYY : colLRow.YYYY, MM : colLRow.MM,
						  VAL : 0, VAL_SUB : ''});
					if(gridRow.TYPE_SUB_CODE != null && gridRow.TYPE_SUB_CODE != '' && gridRow.TYPE_SUB_CODE != 'NN') {
						updateRow.VAL_SUB = gridRow[colLRow.COL_NAME] == null ? '' : formatDate(gridRow[colLRow.COL_NAME]);
//						updateRow.VAL_SUB = gridRow[colLRow.COL_NAME] == null ? '' : gridRow.GUBUN_SUB_CODE != 'P' ? formatDate(gridRow[colLRow.COL_NAME]) : gridRow[colLRow.COL_NAME];
					} else {
						var calVal = gridRow[colLRow.COL_NAME] * 100;
						updateRow.VAL = calVal;
					}
									 
					updateList.push(updateRow);
				}			
			}
			
			if(gridRow.TYPE_CODE != "NN") {
				var updateRemarkRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), TYPE_CODE : gridRow.TYPE_CODE, GUBUN_CODE : gridRow.GUBUN_CODE,
					TYPE_SUB_CODE : gridRow.TYPE_SUB_CODE, GUBUN_SUB_CODE : gridRow.GUBUN_SUB_CODE, REMARK : gridRow.REMARK, WEIGHT : gridRow.WEIGHT});		
				updateRemarkList.push(updateRemarkRow);	
			}									        			
		}
	}
	
	var list = JSON.stringify(updateList);
	var remarkList = JSON.stringify(updateRemarkList);
	
	var changeProgressNoteObject = dlgDesmMprCreationProgressNoteGrid.GetChanges();
	var changeProgressNoteList = JSON.parse(changeProgressNoteObject).Changes;
	var updateProgressNoteList = [];
	for(var i = 0; i < changeProgressNoteList.length; i++){
		var rowId = changeProgressNoteList[i].id;
		var row = dlgDesmMprCreationProgressNoteGrid.GetRowById(rowId);
		
		var updateProgressNoteRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), NOTE_SEQ : row.NOTE_SEQ,
											      TYPE : row.TYPE, CONTENTS : row.CONTENTS});
							 
			updateProgressNoteList.push(updateProgressNoteRow);			
	}
	var progressNoteList = JSON.stringify(updateProgressNoteList);	
	
	var changeMainRemarksObject = dlgDesmMprCreationRemarksGrid.GetChanges();
	var changeMainRemarksList = JSON.parse(changeMainRemarksObject).Changes;
	var updateMainRemarksList = [];
	for(var i = 0; i < changeMainRemarksList.length; i++){
		var rowId = changeMainRemarksList[i].id;
		var row = dlgDesmMprCreationRemarksGrid.GetRowById(rowId);
		
		var updateMainRemarksRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), REMARKS_SEQ : row.REMARKS_SEQ,
											      TYPE : row.TYPE, CONTENTS : row.CONTENTS});
							 
			updateMainRemarksList.push(updateMainRemarksRow);			
	}
	var mainRemarksList = JSON.stringify(updateMainRemarksList);
	
	var changeProcureObject = dlgDesmMprCreationProcureGrid.GetChanges();
	var changeProcureList = JSON.parse(changeProcureObject).Changes;
	var updateProcureList = [];
	for(var i = 0; i < changeProcureList.length; i++){
		var rowId = changeProcureList[i].id;
		var row = dlgDesmMprCreationProcureGrid.GetRowById(rowId);
		
		var updateProcureRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), PROCURE_SEQ : row.PROCURE_SEQ,
										     ITEM : row.ITEM, VENDOR_NAME : row.VENDOR_NAME, VENDOR_COUNTRY : row.VENDOR_COUNTRY,
										     PO_PLAN : ExcelDateToJSDate(row.PO_PLAN), PO_EXPECTED : ExcelDateToJSDate(row.PO_EXPECTED),  PO_ACTUAL : ExcelDateToJSDate(row.PO_ACTUAL), 
										     DELIVERY_PLAN : ExcelDateToJSDate(row.DELIVERY_PLAN),DELIVERY_EXPECTED : ExcelDateToJSDate(row.DELIVERY_EXPECTED), DELIVERY_ACTUAL : ExcelDateToJSDate(row.DELIVERY_ACTUAL),
										     REMARKS : row.REMARKS});
							 
			updateProcureList.push(updateProcureRow);			
	}
	var procureList = JSON.stringify(updateProcureList);
	
	var changeDesignObject = dlgDesmMprCreationDesignGrid.GetChanges();
	var changeDesignList = JSON.parse(changeDesignObject).Changes;
	var updateDesignList = [];
	for(var i = 0; i < changeDesignList.length; i++){
		var rowId = changeDesignList[i].id;
		var row = dlgDesmMprCreationDesignGrid.GetRowById(rowId);
		
		var updateDesignRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), DESIGN_SEQ : row.DESIGN_SEQ,
										     ITEM1 : row.ITEM1, ITEM2 : row.ITEM2,
										     SCHEDULE_PLAN : formatDate(row.SCHEDULE_PLAN), SCHEDULE_ACTUAL : formatDate(row.SCHEDULE_ACTUAL),
										     REMARKS : row.REMARKS, MFG_YN : row.MFG_YN,
										     APPROVAL_EXPECTED : formatDate(row.APPROVAL_EXPECTED), APPROVAL_ACTUAL : formatDate(row.APPROVAL_ACTUAL), DOCUMENT_NO : row.DOCUMENT_NO});							 

			updateDesignList.push(updateDesignRow);			
	}
	var designList = JSON.stringify(updateDesignList);	
	
	var changeQualityObject = dlgDesmMprCreationQualityGrid.GetChanges();
	var changeQualityList = JSON.parse(changeQualityObject).Changes;
	var updateQualityList = [];
	for(var i = 0; i < changeQualityList.length; i++){
		var rowId = changeQualityList[i].id;
		var row = dlgDesmMprCreationQualityGrid.GetRowById(rowId);
		
		var updateQualityRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), QUALITY_SEQ : row.QUALITY_SEQ,
										     ITEM1 : row.ITEM1, ITEM2 : row.ITEM2,
										     SCHEDULE_PLAN : ExcelDateToJSDate(row.SCHEDULE_PLAN), SCHEDULE_ACTUAL : ExcelDateToJSDate(row.SCHEDULE_ACTUAL),
										     REMARKS : row.REMARKS, MFG_YN : row.MFG_YN,
										     APPROVAL_PLAN : ExcelDateToJSDate(row.APPROVAL_PLAN), APPROVAL_ACTUAL : ExcelDateToJSDate(row.APPROVAL_ACTUAL)});							 
							 
			updateQualityList.push(updateQualityRow);			
	}
	var qualityList = JSON.stringify(updateQualityList);		

	var changeManufactureObject = dlgDesmMprCreationManufactureGrid.GetChanges();
	var changeManufactureList = JSON.parse(changeManufactureObject).Changes;
	var updateManufactureList = [];
	for(var i = 0; i < changeManufactureList.length; i++){
		var rowId = changeManufactureList[i].id;
		var row = dlgDesmMprCreationManufactureGrid.GetRowById(rowId);
		
		var updateManufactureRow = objNullCheck({PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), MFG_SEQ : row.MFG_SEQ,
										     TYPE : row.TYPE, ITEM : row.ITEM,
										     SCHEDULE_PLAN : ExcelDateToJSDate(row.SCHEDULE_PLAN), SCHEDULE_ACTUAL : ExcelDateToJSDate(row.SCHEDULE_ACTUAL),
										     REMARKS : row.REMARKS});							 
							 
			updateManufactureList.push(updateManufactureRow);			
	}
	var manufactureList = JSON.stringify(updateManufactureList);		

	var formData = new FormData();
	formData.append("updateList", list);	
	formData.append("updateRemarkList", remarkList);
	formData.append("updateProgressNoteList", progressNoteList);
	formData.append("updateMainRemarksList", mainRemarksList);
	formData.append("updateProcureList", procureList);
	formData.append("updateDesignList", designList);
	formData.append("updateQualityList", qualityList);			
	formData.append("updateManufactureList", manufactureList);		
	
	
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		formData.append("MPR_SEQ", v_desm_mpr_creation_param.MPR_SEQ);
	}
	
	formData.append("PROJECT_NO", $('#txtDlgDesmMprCreationProjectNo').val());
	formData.append("PO_NO", $('#txtDlgDesmMprCreationPoNo').val());
	formData.append("PRODUCT_NAME", $('#txtDlgDesmMprCreationProductName').val());
	formData.append("PO_PROMISED_DATE", $('#txtDlgDesmMprCreationPoPromisedDate').val());
	formData.append("MPR_DATE", $('#txtDlgDesmMprCreationMPRDate').val());
	formData.append("STATUS", status);
	formData.append("MPR_NO", v_desm_mpr_creation_param.MPR_NO);
	
	$.ajax({			
		url: "/saveDesmMprDetail.do",
		data: formData,
		processData: false,
		contentType: false,			
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				if(result.error == "-1") {
					alert_fail($('#alertSaveAlreadyData').val() + " [MPR Date : " + result.MPR_DATE + "]");
				}
				else if(result.error == "-2") {
					alert_fail($('#alertFileCheckEx').val());
				}				
				else if(result.error == "-3") {
					alert_fail($('#alertPhotoFileCheckEx').val());
				}	
				else if(result.error == "-4") {
					alert_fail($('#alertMailFail').val());
				}												
				else {
					alert_fail(result.error);
				}
			} else {
				alert_success($('#alertSuccess').val());
				
				if(v_desm_mpr_creation_callback) {
					v_desm_mpr_creation_callback("save-item", null);
				}
				
				$('#dlgDesmMprCreation').modal('hide');
			}
		}
	});	
}

function searchDesmMprCreation() {
	
	$('#iconDlgDesmMprCreationPoNoSearch').remove();
	$("#txtDlgDesmMprCreationPoNo").attr("readonly",true);
	$("#txtDlgDesmMprCreationMPRDate").attr("disabled",true);

	
	var param = {"MPR_SEQ" : v_desm_mpr_creation_param.MPR_SEQ};
	
	$.ajax({
		url: "/getDesmMprData.do",		
		data: param,
		success: function (data, textStatus, jqXHR) {
			
			var resultRow = data.results[0];
			
			v_desm_mpr_creation_param.ATTACH_GRP_CD = resultRow.ATTACH_GRP_CD;
			v_desm_mpr_creation_param.PHOTO_GRP_CD = resultRow.PHOTO_GRP_CD;
			v_desm_mpr_creation_param.DESIGN_GRP_CD = resultRow.DESIGN_GRP_CD;
			v_desm_mpr_creation_param.QUALITY_GRP_CD = resultRow.QUALITY_GRP_CD;
			v_desm_mpr_creation_param.MPR_NO = resultRow.MPR_NO;
			
			$('#txtDlgDesmMprCreationProjectNo').val(resultRow.PROJECT_NO);
			$('#txtDlgDesmMprCreationProjectName').val(resultRow.PROJECT_NAME);
			$('#txtDlgDesmMprCreationPoNo').val(resultRow.PO_NO);
			$('#txtDlgDesmMprCreationPoName').val(resultRow.PO_DESCRIPTION);
			$('#txtDlgDesmMprCreationProductName').val(resultRow.PRODUCT_NAME);
			$('#txtDlgDesmMprCreationSupplier').val(resultRow.SUPPLIER_NAME);
			$('#txtDlgDesmMprCreationPoPromisedDate').val(resultRow.PO_PROMISED_DATE);
			$('#txtDlgDesmMprCreationMPRDate').val(resultRow.MPR_DATE);
			$('#txtDlgDesmMprCreationMprStatus').val(resultRow.STATUS);
			$('#txtDlgDesmMprCreationResultYn').val(resultRow.RESULT_YN);	
			$('#txtDlgDesmMprCreationResultRemark').val(resultRow.RESULT_REMARK);	
			$('#txtDlgDesmMprCreationRequestRemark').val(resultRow.REQUEST_REMARK);
			$('#txtDlgDesmMprCreationDesignRemark').val(resultRow.DESIGN_REMARK);
			$('#txtDlgDesmMprCreationDesignNote').val(resultRow.DESIGN_NOTE);
			$('#txtDlgDesmMprCreationQualityRemark').val(resultRow.QUALITY_REMARK);
			$('#txtDlgDesmMprCreationQualityNote').val(resultRow.QUALITY_NOTE);			
			$('#txtDlgDesmMprCreationReviewerComments').val(resultRow.REJECT_COMMENTS);	
			$('#selDlgDesmMprCreationRound').val(resultRow.M);
			
			setRoundSelectbox(resultRow.M);
			$("#selDlgDesmMprCreationRound").attr('disabled', true);
			$("#selDlgDesmMprCreationRound").addClass('select-arrow-non');
			
			if(typeof(v_desm_mpr_creation_param.START_MONTH)  == 'undefined') v_desm_mpr_creation_param.START_MONTH = resultRow.START_MONTH; 
			if(typeof(v_desm_mpr_creation_param.END_MONTH)  == 'undefined') v_desm_mpr_creation_param.END_MONTH = resultRow.END_MONTH;
			
			if(resultRow.STATUS == "Incomplete" || resultRow.STATUS == "Returned") {
				//$('#btnDlgDesmMprCreationSave').remove();
				//$('#btnDlgDesmMprCreationDelete').remove();
				//$('#btnDlgDesmMprCreationSubmit').remove();
				$('#btnDlgDesmMprCreationConfirm').remove();
				$('#btnDlgDesmMprCreationReturn').remove();				
			}
			else if(resultRow.STATUS == "Pre-Confirmed") {
				$('#btnDlgDesmMprCreationSave').remove();
				$('#btnDlgDesmMprCreationDelete').remove();
				$('#btnDlgDesmMprCreationSubmit').remove();
				//$('#btnDlgDesmMprCreationConfirm').remove();
				//$('#btnDlgDesmMprCreationReturn').remove();	
				
				$('#divDlgDesmMprCreationProgressNoteBtn').remove();
				$('#divDlgDesmMprCreationRemarksBtn').remove();
				$('#divDlgDesmMprCreationStatusOfProcureBtn').remove();
				$('#divDlgDesmMprCreationDesignBtn').remove();	
				$('#divDlgDesmMprCreationQualityBtn').remove();		
				
				$("#txtDlgDesmMprCreationProductName").attr("readonly",true);
				$("#txtDlgDesmMprCreationResultRemark").attr("readonly",true);
				$("#txtDlgDesmMprCreationRequestRemark").attr("readonly",true);
				
				$("#txtDlgDesmMprCreationResultYn").attr("disabled", true);				
				
				fileUse = false;
			}
			else if(resultRow.STATUS == "Confirmed") {
				$('#btnDlgDesmMprCreationSave').remove();
				$('#btnDlgDesmMprCreationDelete').remove();
				$('#btnDlgDesmMprCreationSubmit').remove();
				$('#btnDlgDesmMprCreationConfirm').remove();
				//$('#btnDlgDesmMprCreationReturn').remove();	
				
				$('#divDlgDesmMprCreationProgressNoteBtn').remove();
				$('#divDlgDesmMprCreationRemarksBtn').remove();
				$('#divDlgDesmMprCreationStatusOfProcureBtn').remove();		
				$('#divDlgDesmMprCreationDesignBtn').remove();	
				$('#divDlgDesmMprCreationQualityBtn').remove();					
				
				$("#txtDlgDesmMprCreationProductName").attr("readonly",true);
				$("#txtDlgDesmMprCreationResultRemark").attr("readonly",true);
				$("#txtDlgDesmMprCreationRequestRemark").attr("readonly",true);
				$("#txtDlgDesmMprCreationDesignRemark").attr("readonly",true);	
				$("#txtDlgDesmMprCreationDesignNote").attr("readonly",true);	
				$("#txtDlgDesmMprCreationQualityRemark").attr("readonly",true);	
				$("#txtDlgDesmMprCreationQualityNote").attr("readonly",true);		
				
				$("#txtDlgDesmMprCreationResultYn").attr("disabled", true);		
				
				fileUse = false;
			}			
			
			setDlgDesmMprCreationAttListPopUpData();	
			setDlgDesmMprCreationDesignAttListPopUpData();
			setDlgDesmMprCreationQualityAttListPopUpData();
			searchDesmMprCreationPhoto();
			searchDlgDesmMprCreationDetailProgressData();
			searchDlgDesmMprCreationProgressNote();
			searchDlgDesmMprCreationRemarks();
			searchDlgDesmMprCreationProcure();
			searchDlgDesmMprCreationPayments();
			searchDlgDesmMprCreationProgress();
			searchDlgDesmMprCreationDesign();
			searchDlgDesmMprCreationQuality();
			searchDlgDesmMprCreationManufacture();
        }
    });
}

var imgFileIdx = 0;
function searchDesmMprCreationPhoto() {
	fileList = [];
	$.ajax({
		url: "/getTransShippingRequestDlgAttList.do",		
		data: {"FILE_GRP_CD" : v_desm_mpr_creation_param.PHOTO_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var resultList = data.results;
			
			for(var i = 0; i < resultList.length; i++){
				imgFileIdx = imgFileIdx + 1;
				var resultRow = resultList[i];
				var fileRow = {"IDX" : imgFileIdx, "FILE_NAME" : resultRow.NAME, "SRC" : "/getTransAttachPreview.do?code=" + resultRow.ID, "SAVE_YN" : "Y", "ID" : resultRow.ID, "REM" : resultRow.REM};
				fileList.push(fileRow);
			}	
			
			setDlgDesmMprCreationPhotoAtt();	
        }
    });
}

function deletePhoto(idx) {
	var selectRow;
	var rowIdx;
	for(var i = 0; i < fileList.length; i++) {
		resultRow = fileList[i];
		if(resultRow.IDX == idx) {
			selectRow = resultRow;
			rowIdx = i;
		}	
	}	
	
	if(selectRow.SAVE_YN == "N") {
		fileList.splice(rowIdx, 1);
		alert_success($('#alertDeleteSuccess').val());
		setDlgDesmMprCreationPhotoAtt();			
		
		return;
	}	
	
	$.ajax({			
		url: "/deleteTransShippingRequestDlgAttList.do",
		data: {"key" : selectRow.ID},	
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				
				for(var i = 0; i < fileList.length; i++) {
					var resultRow = fileList[i];
					if(resultRow.SAVE_YN == "Y" && resultRow.ID == selectRow.ID) {
						fileList.splice(i, 1);
					}	
				}			
			
				alert_success($('#alertDeleteSuccess').val());
				setDlgDesmMprCreationPhotoAtt();	
			}
		}
	});	
}

function iconDlgDesmMprCreationPoNoSearchClick() {	

	var search_type = "N";
	if(v_desm_mpr_creation_param.supplier_yn == "Y") {
		search_type = "R";
	}

	var param = {keyword : $('#txtDlgDesmMprCreationPoNo').val(), keyword2 : "", mpr_yn : "Y", 
				 keyword3 : $('#txtDlgDesmMprCreationSupplierNo').val(), supplier_yn : v_desm_mpr_creation_param.supplier_yn, search_type : search_type};

	$('#dlgDesmMprCreationPopUp').load("/desmPoMprNoListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmPoMprNoListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
				
					var mprNo = returnParam.MPR_NO;
					if(mprNo == null || mprNo == "") {
						alert_modal("", $('#alertMprPoSelectErr').val());
						return;				
					}
				
					$("#txtDlgDesmMprCreationPoNo").val(returnParam.PO_NO);
					$("#txtDlgDesmMprCreationPoName").val(returnParam.PO_DESCRIPTION);
					$("#txtDlgDesmMprCreationSupplier").val(returnParam.SUPPLIER_NAME);
					$("#txtDlgDesmMprCreationSupplierNo").val(returnParam.SUPPLIER_NUMBER);
					$("#txtDlgDesmMprCreationPoPromisedDate").val(returnParam.PROMISED_DATE);

					setRoundSelectbox(returnParam.MPR_SUBMISSION);
					
					$("#txtDlgDesmMprCreationProjectNo").val(returnParam.PROJECT_CODE);
					$("#txtDlgDesmMprCreationProjectName").val(returnParam.PROJECT_NAME);
					v_desm_mpr_creation_param.MPR_NO = returnParam.MPR_NO;				
					
					if($("#txtDlgDesmMprCreationMPRDate").val() == "") {
						$("#txtDlgDesmMprCreationMPRDate").val(returnParam.MPR_DATE);
					}

					v_desm_mpr_creation_param.START_MONTH = returnParam.START_MONTH;			
					v_desm_mpr_creation_param.END_MONTH = returnParam.END_MONTH;			
					
					searchDlgDesmMprCreationDetailProgressData();
					searchDlgDesmMprCreationPayments();	
				}
			});	
		}
	});
}

function btnDlgDesmMprCreationProgressNoteAddClick() {
	var gridAddRow = dlgDesmMprCreationProgressNoteGrid.AddRow(null,null,1,null,null);
	gridAddRow.TYPE = "E";	
	dlgDesmMprCreationProgressNoteGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmMprCreationRemarksAddClick() {
	var gridAddRow = dlgDesmMprCreationRemarksGrid.AddRow(null,null,1,null,null);	
	gridAddRow.TYPE = "E";	
	dlgDesmMprCreationRemarksGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmMprCreationProcureAddClick() {
	var gridAddRow = dlgDesmMprCreationProcureGrid.AddRow(null,null,1,null,null);	
	dlgDesmMprCreationProcureGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmMprCreationManufactureAddClick() {
	var gridAddRow = dlgDesmMprCreationManufactureGrid.AddRow(null,null,1,null,null);	
	dlgDesmMprCreationManufactureGrid.RefreshRow(gridAddRow);
}


function btnDlgDesmMprCreationQualityAddClick() {
	var gridAddRow = dlgDesmMprCreationQualityGrid.AddRow(null,null,1,null,null);	
	dlgDesmMprCreationQualityGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmMprCreationDesignAddClick() {
//	var gridAddRow = dlgDesmMprCreationDesignGrid.AddRow(null,null,1,null,null);	
//	dlgDesmMprCreationDesignGrid.RefreshRow(gridAddRow);
	getDesignNewRow();
}


function searchDlgDesmMprCreationProgressNote() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprProgressNote.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationProgressNoteGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationProgressNoteGrid.ReloadBody();
			
			if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprCreationProgressNoteGrid);
			}					
		}
	});	
}

function searchDlgDesmMprCreationRemarks() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprRemarks.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationRemarksGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationRemarksGrid.ReloadBody();	
			
			if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprCreationRemarksGrid);
			}				
		}
	});	
}

function searchDlgDesmMprCreationQuality() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprQuality.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationQualityGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationQualityGrid.ReloadBody();	
			
			if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprCreationQualityGrid);
			}				
		}
	});	
}

function searchDlgDesmMprCreationDesign() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprDesign.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationDesignGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationDesignGrid.ReloadBody();	
			
			var gridList = dlgDesmMprCreationDesignGrid.Rows;
			for (var key in gridList) {	
				var gridRow = gridList[key];
				onChangeMFG(null, gridRow, '');
			}	
			
			if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprCreationDesignGrid);
			}				
		}
	});	
}

function searchDlgDesmMprCreationProcure() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprProcure.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationProcureGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationProcureGrid.ReloadBody();	
			
			if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprCreationProcureGrid);
			}				
		}
	});	
}

function searchDlgDesmMprCreationManufacture() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprManufacture.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationManufactureGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationManufactureGrid.ReloadBody();	
			
			if($('#txtDlgDesmMprCreationMprStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmMprCreationMprStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprCreationManufactureGrid);
			}				
		}
	});	
}

function searchDlgDesmMprCreationPayments() {
	var poNo = "";
	if($('#txtDlgDesmMprCreationPoNo').val() != "") {
		poNo = $('#txtDlgDesmMprCreationPoNo').val();
	}
	
	$.ajax({
		url: "/getDesmMprPayments.do",	
		data: {PO_NO : poNo},
		success: function (data, textStatus, jqXHR) {
			dlgDesmMprCreationPaymentsGrid.Source.Data.Data.Body = [data.results.payments];
			dlgDesmMprCreationPaymentsGrid.ReloadBody();
			
			if(data.results.remarks)
				$('#txtDlgDesmMprCreationPoRemarks').val(data.results.remarks.LONG_TEXT);
				
		}
	});	
}


function btnDlgDesmMprCreationProgressNoteDelClick() {
	dlgDesmMprCreationProgressNoteGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprCreationProgressNoteGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgDesmMprCreationProgressNoteGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"NOTE_SEQ" : row.NOTE_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmMprProgressNote.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprCreationProgressNote();
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}		
		}
	});	
}

function btnDlgDesmMprCreationRemarksDelClick() {
	dlgDesmMprCreationRemarksGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprCreationRemarksGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgDesmMprCreationRemarksGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"REMARKS_SEQ" : row.REMARKS_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmMprRemarks.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprCreationRemarks();
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}		
		}
	});	
}

function btnDlgDesmMprCreationQualityDelClick() {
	dlgDesmMprCreationQualityGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprCreationQualityGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgDesmMprCreationQualityGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"QUALITY_SEQ" : row.QUALITY_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmQuality.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprCreationQuality();
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}		
		}
	});	
}

function btnDlgDesmMprCreationDesignDelClick() {
	dlgDesmMprCreationDesignGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprCreationDesignGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgDesmMprCreationDesignGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"DESIGN_SEQ" : row.DESIGN_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmDesign.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprCreationDesign();
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}		
		}
	});	
}

function btnDlgDesmMprCreationProcureDelClick() {
	dlgDesmMprCreationProcureGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprCreationProcureGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgDesmMprCreationProcureGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"PROCURE_SEQ" : row.PROCURE_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmProcure.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprCreationProcure();
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}		
		}
	});	
}

function ShowCustomCalendar(G,row,col, isProgress){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
		if(isProgress) {
			var date = new Date(n);
			var cellDate = date.getFullYear() + "_" + chkDate(date.getMonth() + 1);
			G.SetValue(row,col,n,1);
		} else {
			G.SetValue(row,col,n,1);
		}
	}


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function ShowAlertCustomCalendar(G,row,col, isProgress){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
		if(isProgress) {
			var date = new Date(n);
			var cellDate = date.getFullYear() + "_" + chkDate(date.getMonth() + 1);
			(col == cellDate) ? G.SetValue(row,col,n,1) : alert_modal("", $('#alertMprPoMonthErr').val());
		} else {
			G.SetValue(row,col,n,1);
		}
	}


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function ExcelDateToJSDate(date) {
	
	if (date == null || date == "")
		return "";
	else if (typeof(date) == "string")
		return date;
	else
	{
		var jsDate = new Date(date);
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '/' + month + '/' + day;
	}
}

function initDlgDesmMprCreationMonthDatePicker(id) {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}
	
 	$(id).datepicker({ 
			dateFormat: 'yy/mm',
			changeMonth: true,
		    changeYear: true,
		    showButtonPanel: true,
		    onClose: function(dateText, inst) { 
		        console.log("dateText", dateText);
		        console.log("inst", inst); 
	            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val(); 
	            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val(); 
	            $(this).datepicker('setDate', new Date(year, month, 1));
	            $(".ui-datepicker-calendar").css("display","none");
	            
	            searchDlgDesmMprCreationDetailProgressData();
	            //dlgDesmMprCreationDetailProgressGridReload();
	        },
	        beforeShow() {
		        var selectDate = $(id).val().split("/");
		        var year = Number(selectDate[0]);
		        var month = Number(selectDate[1]) - 1;
		        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );	        
	        }
	});
	
	$(id).focus(function () {
		$(".ui-datepicker-calendar").css("display","none");
		$("#ui-datepicker-div").position({
			  my: "center top",
			  at: "center bottom",
			  of: $(this)
		});
	});	
}

function imgBtnShow(id) {
	var eId = "#" + id;
	$(eId).show();
}

function imgBtnHide(id) {
	var eId = "#" + id;
	$(eId).hide();
	
}

function dlgDesmMprCreationPhotoPreview(idx) {
	var param = {"fileList" : fileList, "idx" : idx};
	
	$('#dlgDesmMprCreationPopUp').load("/desmMprCreationPhotoPreviewPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMprCreationPhotoPreviewPopUp(param, function (key, returnParam) {

			});	
			
		}
	});	
}

function btnDlgDesmMprCreationReturnClick() {

	
	var param = {"MPR_SEQ" : v_desm_mpr_creation_param.MPR_SEQ, "MPR_NO" : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()
				, "originComments" : $('#txtDlgDesmMprCreationReviewerComments').val(), "STATUS" : "Returned"};
	
	$('#dlgDesmMprCreationPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "reject-item"){
					alert_success($('#alertSuccess').val());	
					
					if(v_desm_mpr_creation_callback) {
						v_desm_mpr_creation_callback("save-item", null);
					}
					
					$('#dlgDesmMprCreation').modal('hide');
				}
			});	
			
		}
	});		
}

function btnDlgDesmMprCreationConfirmClick() {
	
	var saveFn = function(reviewerComments) {
//		var savedComments = $('#txtDlgDesmMprCreationReviewerComments').val();
//		var newComments = '';
//		var oldComments = '';
//		var idx = savedComments.trim().indexOf('--------------------------------------');
//		var reviewerInfo =  ' (' +
//							' Confirmed' +
//							' ' + new Date().format('yyyy.MM.dd') +
//							' ' + $('#logh', parent.document).text() +
//							($('#roleName', parent.document).val() ? ' / ' + $('#roleName', parent.document).val() : '') +
//							' )';
//		if(idx > -1) {
//			newComments = savedComments.substring(0, idx - 1).substring(0, savedComments.lastIndexOf('\n') - 1);
//			oldComments = savedComments.substring(idx + 1);
//			if(newComments && newComments.length > 0) {
//				newComments = newComments + reviewerInfo + '\n';
//			} else {
//				oldComments = oldComments.substring(oldComments.indexOf('\n') + 1);
//			}
//		} else {
//			newComments = savedComments + ((savedComments.length > 0) ? reviewerInfo : '');
//		}
//		var reviewerComments = newComments + oldComments;

		confirm_modal("", $('#alertMprConfirm').val(), null, function (callobj, result) {
			if(result) {	
				var updateList = [];
				var updateRow = objNullCheck({"MPR_SEQ" : v_desm_mpr_creation_param.MPR_SEQ, "STATUS" : "Confirmed", "REJECT_COMMENTS" : reviewerComments,
				                              "MPR_NO" : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()});
				updateList.push(updateRow);		
				var list = JSON.stringify(updateList);
				
				var paramData = {"updateList" : list};	 				
								 
				$.ajax({			
					url: "/saveDesmMprStatus.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							if(result.error == "-1") {
								alert_fail($('#alertMprConfirmErr').val());
							}							
							else if(result.error == "-4") {
								alert_fail($('#alertMailFail').val());
							}										
							else {
								alert_fail(result.error);
							}
						} else {
							alert_success($('#alertSuccess').val());	
										
							if(v_desm_mpr_creation_callback) {
								v_desm_mpr_creation_callback("save-item", null);
							}
							
							$('#dlgDesmMprCreation').modal('hide');
						}
					}		
				});						
			}
		});					 					
					
	}

	var param = {"MPR_SEQ" : v_desm_mpr_creation_param.MPR_SEQ, "MPR_NO" : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val(), "STATUS" : "Confirmed"};
	
	$('#dlgDesmMprCreationPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "return-item") {
					var reviewerComments = '';
					var originComments = $('#txtDlgDesmMprCreationReviewerComments').val();
					if(returnParam && returnParam.length > 0) {	
						var reviewerInfo =  ' (' +
											' Confirmed' +
											' ' + new Date().format('yyyy.MM.dd') +
											' ' + $('#logh', parent.document).text() +
											($('#roleName', parent.document).val() ? ' / ' + $('#roleName', parent.document).val() : '') +
											' )';
						reviewerComments = returnParam + reviewerInfo;
						if(originComments.trim().length > 0) {
							reviewerComments += "\n-----------------------------------------------------------------------"
												+ "-----------------------------------------------------------------------\n"
												+ originComments;
						}
					}
					saveFn(reviewerComments);
				}
			});	
			
		}
	});
}

function btnDlgDesmMprCreationConfirmClickNoComments() {
	
	var savedComments = $('#txtDlgDesmMprCreationReviewerComments').val();
	var newComments = '';
	var oldComments = '';
	var idx = savedComments.trim().indexOf('--------------------------------------');
	var reviewerInfo =  ' (' +
						' Confirmed' +
						' ' + new Date().format('yyyy.MM.dd') +
						' ' + $('#logh', parent.document).text() +
						($('#roleName', parent.document).val() ? ' / ' + $('#roleName', parent.document).val() : '') +
						' )';
	if(idx > -1) {
		newComments = savedComments.substring(0, idx - 1).substring(0, savedComments.lastIndexOf('\n') - 1);
		oldComments = savedComments.substring(idx + 1);
		if(newComments && newComments.length > 0) {
			newComments = newComments + reviewerInfo + '\n';
		} else {
			oldComments = oldComments.substring(oldComments.indexOf('\n') + 1);
		}
	} else {
		newComments = savedComments + ((savedComments.length > 0) ? reviewerInfo : '');
	}
	var reviewerComments = newComments + oldComments;
	
	confirm_modal("", $('#alertMprConfirm').val(), null, function (callobj, result) {
		if(result) {
			
			var updateList = [];
			var updateRow = objNullCheck({"MPR_SEQ" : v_desm_mpr_creation_param.MPR_SEQ, "STATUS" : "Confirmed", "REJECT_COMMENTS" : reviewerComments,
			                              "MPR_NO" : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()});
			updateList.push(updateRow);		
			var list = JSON.stringify(updateList);
			
			var paramData = {"updateList" : list};	 				
							 
			$.ajax({			
				url: "/saveDesmMprStatus.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-1") {
							alert_fail($('#alertMprConfirmErr').val());
						}							
						else if(result.error == "-4") {
							alert_fail($('#alertMailFail').val());
						}										
						else {
							alert_fail(result.error);
						}
					} else {
						alert_success($('#alertSuccess').val());	
									
						if(v_desm_mpr_creation_callback) {
							v_desm_mpr_creation_callback("save-item", null);
						}
						
						$('#dlgDesmMprCreation').modal('hide');
					}
				}		
			});								 					
						
		}
	});	
}

function btnDlgDesmMprCreationDeleteClick() {
	
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var updateList = [];
			var updateRow = objNullCheck({"MPR_SEQ" : v_desm_mpr_creation_param.MPR_SEQ});
			updateList.push(updateRow);		
			var list = JSON.stringify(updateList);
			
			var paramData = {"updateList" : list}; 				
							 
			$.ajax({			
				url: "/deleteDesmMprList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-1") {
							alert_fail($('#alertSaveMprDeleteCheckErr').val());
							searchDesmMprCreation();
						}
						else {
							alert_fail(result.error);
						}
						
					} else {
						alert_success($('#alertDeleteSuccess').val());	
									
						if(v_desm_mpr_creation_callback) {
							v_desm_mpr_creation_callback("save-item", null);
						}
						
						$('#dlgDesmMprCreation').modal('hide');
					}
				}		
			});								 					
						
		}
	});
}

function setGridEdit(grid) {
	var gridList = grid.Rows;
	var girdColNameList = grid.ColNames[1];
	var gridCols = grid.Cols;
	
	for (var key in gridList) {		
		var gridRow = gridList[key];
		if(gridRow.Fixed == null){
			
			for(var i = 0; i < girdColNameList.length; i++) {
				var colName = girdColNameList[i];
				var editColName = colName + "CanEdit";
				var col = gridCols[colName];
				if(col.Type == "Date") {
					var dateColName = colName + "OnClickCell";
					gridRow[dateColName] = "";
				}
				
				gridRow[editColName] = 0;	
			}
			
			grid.RefreshRow(gridRow);												        			
		}
	}	
}

function searchDlgDesmMprCreationProgress() {
	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprProgressSummary.do",	
		data: {MPR_SEQ : mprSeq},
		success: function (data, textStatus, jqXHR) {
			
			dlgDesmMprCreationProgressGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprCreationProgressGrid.Reload();
				
		}
	});	
}

function btnDlgDesmMprCreationReportClick() {

	var popup = window.open('/mprMrd.do?seq=' + v_desm_mpr_creation_param.MPR_SEQ + '&fileNm=RD_MPR', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
	/*
	var locationCanvas = document.getElementById("tabDlgDesmMprCreationMain");
	locationCanvas.style.height = locationCanvas.scrollHeight + 'px';
	debugger;
    html2canvas(locationCanvas).then(function(canvas) { //저장 영역 div id
	debugger;
    // 캔버스를 이미지로 변환
    var imgData = canvas.toDataURL('image/png');
	     
    var imgWidth = 200; // 이미지 가로 길이(mm) / A4 기준 210mm
    var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    var margin = 5; // 출력 페이지 여백설정
    var doc = new jsPDF('p', 'mm', 'a4');
    var position = 0;
       
    // 첫 페이지 출력
    doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
         
    // 한 페이지 이상일 경우 루프 돌면서 출력
    while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }
 
    // 파일 저장
    doc.save('file-name.pdf');	
    locationCanvas.style.height = '560px';
    
    	  
	});
	*/	
	
}

function btnDlgDesmMprCreationProcurePreviousClick() {

	if($('#txtDlgDesmMprCreationPoNo').val().length < 2 || $('#txtDlgDesmMprCreationPoName').val() == ""){
		$('#txtDlgDesmMprCreationPoNo').val("");
		$('#txtDlgDesmMprCreationPoName').val("");
		$('#txtDlgDesmMprCreationSupplier').val("");
		$("#txtDlgDesmMprCreationPoNo").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("divDlgDesmMprCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var mprSeq = "";
	if(v_desm_mpr_creation_param.MPR_SEQ != null) {
		mprSeq = v_desm_mpr_creation_param.MPR_SEQ;
	}
	
	$.ajax({
		url: "/getDesmMprProcurePrev.do",	
		data: {MPR_DATE : $('#txtDlgDesmMprCreationMPRDate').val(), MPR_NO : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			for(var i = 0; i < list.length; i++) {
				var row = list[i];
				var gridAddRow = dlgDesmMprCreationProcureGrid.AddRow(null,null,1,null,null);
				
				var poPlanDate = "";
				if(row.PO_PLAN != null) {
					var tmpPoPlanDate = row.PO_PLAN + " 00:00:00 GMT";
					poPlanDate = Date.parse(tmpPoPlanDate);
				}
				
				var poActualDate = "";
				if(row.PO_ACTUAL != null) {
					var tmpPoActualDate = row.PO_ACTUAL + " 00:00:00 GMT";
					poActualDate = Date.parse(tmpPoActualDate);
				}

				var poExpectedDate = "";
				if(row.PO_EXPECTED != null) {
					var tmpPoExpectedDate = row.PO_EXPECTED + " 00:00:00 GMT";
					poExpectedDate = Date.parse(tmpPoExpectedDate);
				}
				
				var deliveryPlanDate = "";
				if(row.DELIVERY_PLAN != null) {
					var tmpDeliveryPlanDate = row.DELIVERY_PLAN + " 00:00:00 GMT";
					deliveryPlanDate = Date.parse(tmpDeliveryPlanDate);
				}

				var deliveryExpectedDate = "";
				if(row.DELIVERY_EXPECTED != null) {
					var tmpDeliveryExpectedDate = row.DELIVERY_EXPECTED + " 00:00:00 GMT";
					deliveryExpectedDate = Date.parse(tmpDeliveryExpectedDate);
				}
				
				var deliveryActualDate = "";
				if(row.DELIVERY_ACTUAL != null) {
					var tmpDeliveryActualDate = row.DELIVERY_ACTUAL + " 00:00:00 GMT";
					deliveryActualDate = Date.parse(tmpDeliveryActualDate);
				}	
				
				gridAddRow.ITEM = row.ITEM;
				gridAddRow.VENDOR_NAME = row.VENDOR_NAME;
				gridAddRow.VENDOR_COUNTRY = row.VENDOR_COUNTRY;
				gridAddRow.PO_PLAN = poPlanDate;
				gridAddRow.PO_EXPECTED = poExpectedDate;
				gridAddRow.PO_ACTUAL = poActualDate;
				gridAddRow.DELIVERY_PLAN = deliveryPlanDate;
				gridAddRow.DELIVERY_EXPECTED = deliveryExpectedDate;
				gridAddRow.DELIVERY_ACTUAL = deliveryActualDate;
				gridAddRow.REMARKS = row.REMARKS;
				
				dlgDesmMprCreationProcureGrid.RefreshRow(gridAddRow);			
			}
		}
	});	

}

function btnDlgDesmMprCreationDesignPreviousClick() {
	if($('#txtDlgDesmMprCreationPoNo').val().length < 2 || $('#txtDlgDesmMprCreationPoName').val() == ""){
		$('#txtDlgDesmMprCreationPoNo').val("");
		$('#txtDlgDesmMprCreationPoName').val("");
		$('#txtDlgDesmMprCreationSupplier').val("");
		$("#txtDlgDesmMprCreationPoNo").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("divDlgDesmMprCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	$.ajax({
		url: "/getDesmMprDesignPrev.do",	
		data: {MPR_DATE : $('#txtDlgDesmMprCreationMPRDate').val(), MPR_NO : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()},
		success: function (data, textStatus, jqXHR) {
			if(data.resultRemark.length > 0 && data.resultRemark[0] != null) {
				$('#txtDlgDesmMprCreationDesignRemark').val(data.resultRemark[0].DESIGN_REMARK);
				$('#txtDlgDesmMprCreationDesignNote').val(data.resultRemark[0].DESIGN_NOTE);
			}
			else {
				$('#txtDlgDesmMprCreationDesignRemark').val("");
				$('#txtDlgDesmMprCreationDesignNote').val("");
			}
		
			var list = data.results;
			for(var i = 0; i < list.length; i++) {
				var row = list[i];
				var gridAddRow = dlgDesmMprCreationDesignGrid.AddRow(null,null,1,null,null);
				
				var schedulePlanDate = "";
				if(row.SCHEDULE_PLAN != null) {
					var tmpSchedulePlanDate = row.SCHEDULE_PLAN + " 00:00:00 GMT";
					schedulePlanDate = Date.parse(tmpSchedulePlanDate);
				}
				
				var scheduleActualDate = "";
				if(row.SCHEDULE_ACTUAL != null) {
					var tmpScheduleActualDate = row.SCHEDULE_ACTUAL + " 00:00:00 GMT";
					scheduleActualDate = Date.parse(tmpScheduleActualDate);
				}
				

				var approvalExpectedDate = "";
				if(row.APPROVAL_EXPECTED != null) {
					var tmpApprovalExpectedDate = row.APPROVAL_EXPECTED + " 00:00:00 GMT";
					approvalExpectedDate = Date.parse(tmpApprovalExpectedDate);
				}
				
				var approvalActualDate = "";
				if(row.APPROVAL_ACTUAL != null) {
					var tmpApprovalActualDate = row.APPROVAL_ACTUAL + " 00:00:00 GMT";
					approvalActualDate = Date.parse(tmpApprovalActualDate);
				}
				
			
				
				gridAddRow.ITEM1 = row.ITEM1;
				gridAddRow.ITEM2 = row.ITEM2;
				gridAddRow.SCHEDULE_PLAN = schedulePlanDate;
				gridAddRow.SCHEDULE_ACTUAL = scheduleActualDate;
				gridAddRow.REMARKS = row.REMARKS;

				gridAddRow.MFG_YN = (row.MFG_YN == null || row.MFG_YN == '') ? 'N' : row.MFG_YN;
				gridAddRow.APPROVAL_EXPECTED = approvalExpectedDate;
				gridAddRow.APPROVAL_ACTUAL = approvalActualDate;
				gridAddRow.APPROVAL_EXPECTEDCanEdit = (row.MFG_YN == 'Y') ? '1' : '0';
				gridAddRow.APPROVAL_ACTUALCanEdit = (row.MFG_YN == 'Y') ? '1' : '0';
				
				dlgDesmMprCreationDesignGrid.RefreshRow(gridAddRow);			
				onChangeMFG(null, gridAddRow, null)
			}		
		
		}
	});		
}

function btnDlgDesmMprCreationManufacturePreviousClick() {
	if($('#txtDlgDesmMprCreationPoNo').val().length < 2 || $('#txtDlgDesmMprCreationPoName').val() == ""){
		$('#txtDlgDesmMprCreationPoNo').val("");
		$('#txtDlgDesmMprCreationPoName').val("");
		$('#txtDlgDesmMprCreationSupplier').val("");
		$("#txtDlgDesmMprCreationPoNo").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("divDlgDesmMprCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	$.ajax({
		url: "/getDesmMprManufacturePrev.do",
		data: {MPR_DATE : $('#txtDlgDesmMprCreationMPRDate').val(), MPR_NO : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()},
		success: function (data, textStatus, jqXHR) {
			if(data.resultRemark.length > 0 && data.resultRemark[0] != null) {
				$('#txtDlgDesmMprCreationManufactureRemark').val(data.resultRemark[0].QUALITY_REMARK);
				$('#txtDlgDesmMprCreationManufactureNote').val(data.resultRemark[0].QUALITY_NOTE);
			}
			else {
				$('#txtDlgDesmMprCreationManufactureRemark').val("");
				$('#txtDlgDesmMprCreationManufactureNote').val("");
			}
		
			var list = data.results;
			for(var i = 0; i < list.length; i++) {
				var row = list[i];
				var gridAddRow = dlgDesmMprCreationManufactureGrid.AddRow(null,null,1,null,null);
				
				var schedulePlanDate = "";
				if(row.SCHEDULE_PLAN != null) {
					var tmpSchedulePlanDate = row.SCHEDULE_PLAN + " 00:00:00 GMT";
					schedulePlanDate = Date.parse(tmpSchedulePlanDate);
				}
				
				var scheduleActualDate = "";
				if(row.SCHEDULE_ACTUAL != null) {
					var tmpScheduleActualDate = row.SCHEDULE_ACTUAL + " 00:00:00 GMT";
					scheduleActualDate = Date.parse(tmpScheduleActualDate);
				}
			
				gridAddRow.TYPE = row.TYPE;
				gridAddRow.ITEM = row.ITEM;
				gridAddRow.SCHEDULE_PLAN = schedulePlanDate;
				gridAddRow.SCHEDULE_ACTUAL = scheduleActualDate;
				gridAddRow.REMARKS = row.REMARKS;
				
				dlgDesmMprCreationManufactureGrid.RefreshRow(gridAddRow);			
			}
		}
	});		
}

function btnDlgDesmMprCreationQualityPreviousClick() {
	if($('#txtDlgDesmMprCreationPoNo').val().length < 2 || $('#txtDlgDesmMprCreationPoName').val() == ""){
		$('#txtDlgDesmMprCreationPoNo').val("");
		$('#txtDlgDesmMprCreationPoName').val("");
		$('#txtDlgDesmMprCreationSupplier').val("");
		$("#txtDlgDesmMprCreationPoNo").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("divDlgDesmMprCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	$.ajax({
		url: "/getDesmMprQualityPrev.do",
		data: {MPR_DATE : $('#txtDlgDesmMprCreationMPRDate').val(), MPR_NO : v_desm_mpr_creation_param.MPR_NO, PO_NO : $('#txtDlgDesmMprCreationPoNo').val()},
		success: function (data, textStatus, jqXHR) {
			if(data.resultRemark.length > 0 && data.resultRemark[0] != null) {
				$('#txtDlgDesmMprCreationQualityRemark').val(data.resultRemark[0].QUALITY_REMARK);
				$('#txtDlgDesmMprCreationQualityNote').val(data.resultRemark[0].QUALITY_NOTE);
			}
			else {
				$('#txtDlgDesmMprCreationQualityRemark').val("");
				$('#txtDlgDesmMprCreationQualityNote').val("");
			}
		
			var list = data.results;
			for(var i = 0; i < list.length; i++) {
				var row = list[i];
				var gridAddRow = dlgDesmMprCreationQualityGrid.AddRow(null,null,1,null,null);
				
				var schedulePlanDate = "";
				if(row.SCHEDULE_PLAN != null) {
					var tmpSchedulePlanDate = row.SCHEDULE_PLAN + " 00:00:00 GMT";
					schedulePlanDate = Date.parse(tmpSchedulePlanDate);
				}
				
				var scheduleActualDate = "";
				if(row.SCHEDULE_ACTUAL != null) {
					var tmpScheduleActualDate = row.SCHEDULE_ACTUAL + " 00:00:00 GMT";
					scheduleActualDate = Date.parse(tmpScheduleActualDate);
				}
			
				gridAddRow.ITEM1 = row.ITEM1;
				gridAddRow.ITEM2 = row.ITEM2;
				gridAddRow.SCHEDULE_PLAN = schedulePlanDate;
				gridAddRow.SCHEDULE_ACTUAL = scheduleActualDate;
				gridAddRow.REMARKS = row.REMARKS;
				
				dlgDesmMprCreationQualityGrid.RefreshRow(gridAddRow);			
			}
		}
	});		
}

function getDesignNewRow() {
	var gridAddRow = dlgDesmMprCreationDesignGrid.AddRow(null,null,1,null,null);
	gridAddRow.MFG_YN = 'N';
	onChangeMFG(null, gridAddRow, '');
}

function onChangeMFG(Grid, Row, Col) {
	if(Row.Kind === 'Data') {
		setTimeout(function() {
			if(Row.MFG_YN == 'Y') {
				Row.APPROVAL_EXPECTEDType = 'Date';
				Row.APPROVAL_EXPECTEDFormat = 'yy/MM/dd';
				Row.APPROVAL_EXPECTEDCanEdit = 0;
				Row.APPROVAL_EXPECTEDOnClickCell = 'ShowCustomCalendar( Grid, Row, Col )';
				Row.APPROVAL_ACTUALType = 'Date';
				Row.APPROVAL_ACTUALFormat = 'yy/MM/dd';
				Row.APPROVAL_ACTUALCanEdit = 0;
				Row.APPROVAL_ACTUALOnClickCell = 'ShowCustomCalendar( Grid, Row, Col )';
			} else {
				Row.APPROVAL_EXPECTED = '';
				Row.APPROVAL_EXPECTEDType = 'Text';
				Row.APPROVAL_EXPECTEDFormat = '';
				Row.APPROVAL_EXPECTEDCanEdit = 0;
				Row.APPROVAL_EXPECTEDOnClickCell = '';
				Row.APPROVAL_ACTUAL = '';
				Row.APPROVAL_ACTUALType = 'Text';
				Row.APPROVAL_ACTUALFormat = '';
				Row.APPROVAL_ACTUALCanEdit = 0;
				Row.APPROVAL_ACTUALOnClickCell = '';
			}
			dlgDesmMprCreationDesignGrid.RefreshRow(Row);
		}, 200);
	}
}

function btnDlgDesmMprDesignCreationExcelUploadClick() {
	var param = {};
	$('#dlgDesmMprCreationPopUp').load("/desmMprDesignExcelUploadPopUp.do", null, function(data, status, xhr) {
		if(status == "success") {
			initMprDesignExcelUploadPopUp(param, function(key, returnParam) {
				if(key == "excel-item") {
					var list = returnParam;
					var gridList = dlgDesmMprCreationDesignGrid.Rows;
					for(var i = 0; i < list.length; i++) {
						var row = list[i];
						var itemCheck = true;
						
						for (var key in gridList) {
							var gridRow = gridList[key];
							
							if(gridRow.Fixed == null){
								if(row.DOCUMENT_NO == gridRow.DOCUMENT_NO && row.ITEM1 == gridRow.ITEM1){
									itemCheck = false;
									break;
								}
							}
						}	
						
						if(itemCheck) {
							var tempRow = dlgDesmMprCreationDesignGrid.AddRow(null,null,1,null,null);
							tempRow.NO = row.NO;
							tempRow.DOCUMENT_NO = row.DOCUMENT_NO;
							tempRow.ITEM1 = row.ITEM1;
							tempRow.ITEM2 = row.ITEM2;
							tempRow.SCHEDULE_PLAN = row.SCHEDULE_PLAN;
							tempRow.SCHEDULE_ACTUAL = row.SCHEDULE_ACTUAL;
							tempRow.MFG_YN = row.MFG_YN;
							tempRow.APPROVAL_EXPECTED = row.APPROVAL_EXPECTED;
							tempRow.APPROVAL_ACTUAL = row.SCHEDULAPPROVAL_ACTUALE_PLAN;
							tempRow.REMARKS = row.REMARKS;

							onChangeMFG(null, tempRow, '');
//							dlgDesmMprCreationDesignGrid.RefreshRow(tempRow);													
						}					
					}
					
//					var list = [];
//					$.each(returnParam, function(i, row) {
//						var gridRow = {
//								"NO"				: row.NO,
//								"DOCUMENT_NO"		: row.DOCUMENT_NO,
//								"ITEM1"				: row.ITEM1,
//								"ITEM2"				: row.ITEM2,
//								"SCHEDULE_PLAN"		: formatDate(row.SCHEDULE_PLAN),
//								"SCHEDULE_ACTUAL"	: formatDate(row.SCHEDULE_ACTUAL),
//								"MFG_YN"			: row.MFG_YN,
//								"APPROVAL_EXPECTED"	: formatDate(row.APPROVAL_EXPECTED),
//								"APPROVAL_ACTUAL"	: formatDate(row.APPROVAL_ACTUAL),
//								"REMARKS"			: row.REMARKS
//							};
//						list.push(gridRow);			
//					});
//					
//					dlgDesmMprCreationDesignGrid.Source.Data.Data.Body = [list];
//					dlgDesmMprCreationDesignGrid.ReloadBody();
				}
			});
			$('#dlgDesmContractExcelUploadPopUp').modal('show');
		}
	});
}

function setRoundSelectbox(mprSubmission) {
	if(mprSubmission&& mprSubmission == '2') {
		$("#selDlgDesmMprCreationRound").attr('disabled', false);
		$("#selDlgDesmMprCreationRound").removeClass('select-arrow-non');
	} else {
		$("#selDlgDesmMprCreationRound").val('1');
		$("#selDlgDesmMprCreationRound").attr('disabled', true);
		$("#selDlgDesmMprCreationRound").addClass('select-arrow-non');
	}
}

function formatDate(d){
	if(d == null || d == ""){return "";}
	if(d.length == 8) { return '20' + d; }
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}

function chkDate(m){
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}

	return month;
}


