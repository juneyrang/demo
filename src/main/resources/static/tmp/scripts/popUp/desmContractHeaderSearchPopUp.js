var v_idsm_setup_contract_list_callback = null;
var v_idsm_setup_contract_list_param;

var dlgIdsmSetupContractGrid;

function initIdsmContractHeaderSearchPopUp(param , callback) {
	v_idsm_setup_contract_list_callback = callback;
    v_idsm_setup_contract_list_param = param;
    
    if(param.keyword != null && param.keyword != ""){
    	$('#txtDlgIdsmSetupContractSearchContractSeq').val(param.keyword);
    }
    
    $('#dlgIdsmSetupContractSearch').modal('show');
    
    initIdsmContractSearchPopUpCode();    
}

function initIdsmContractSearchPopUpCode() {
    
    initIdsmContractSearchPopUpControls();
}


function initIdsmContractSearchPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgIdsmSetupContractSearch').on('shown.bs.modal', function () {
		$('#dlgIdsmSetupContractSearch').click();
	});	
	
	$('#dlgIdsmSetupContractSearch').on('hidden.bs.modal', function () {
	
	  	closeIdsmSetupContractSearchPopUp();
	})	

	TGSetEvent("OnRenderFinish","desmIdsmIdsmSetupContractGrid",function(grid){
		$('#txtDlgIdsmSetupContractSearchContractSeq').focus();
		setIdsmSetupContractSearchPopUpData();
	});
	
   $("#txtDlgIdsmSetupContractSearchContractSeq").keydown(function(key) {
        if (key.keyCode == 13) {
            searchIdsmSetupContractSearch();
        }
    });	
		
	$('#iconDlgIdsmSetupContractSearchSearch').click(function () {
		searchIdsmSetupContractSearch();
		return false;
	});		

	$('#btnDlgIdsmSetupContractSearchSelect').click(function () { btnDlgIdsmSetupContractSearchSelectClick(); return false; });
	
	
	var gridCode = getGridCode();	
	dlgIdsmSetupContractGridCol = {
		"Cfg" : {
			"id"				: "dlgIdsmSetupContractGrid"
			, "CfgId"			: "dlgIdsmSetupContractGridCfg"
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
		    {	"Name"	: "CONTRACT_HEADER_ID"	, "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "ATTACH_GRP_CD"		, "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PROJECT_NO"			, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CATEGORY"			, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "STATUS"				, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REVISION"			, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CLOSED"				, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CONTRACT_SEQ"		, "Width": "0",   "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CONTRACT_NO"			, "Width": "200", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText" , "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnDblClick": "gridIdsmSetupContractDbClick( Grid, Row, Col );" },
			{	"Name"	: "CONTRACT_NAME"		, "Width": "400", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CONTRACTOR"			, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "CONTRACT_DATE"		, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "TERM_FROM"			, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "TERM_TO"				, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CONTRACT_CURRENCY"	, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CONTRACT_AMOUNT"		, "Width": "0", "Type": "Float", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARKS"				, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
		]
//		, "Cols" : [
//			{	"Name": "CONTRACT_HEADER_ID"	, "Width": "200", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor gridCenterText", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupContractDbClick( Grid, Row, Col );"	}	// Contract Code
//			, {	"Name": "CONTRACT_NAME"		, "Width": "400", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridIdsmSetupContractDbClick( Grid, Row, Col );"	}	// Contract Description
//		]
		, "Header" : {
			"Class"	: "gridCenterText"
			, "CONTRACT_NO"		: "Contract No"
			, "CONTRACT_NAME"	: "Contract Name"
		}
	};
	
	dlgIdsmSetupContractGrid = TreeGrid( {Layout:{Data : dlgIdsmSetupContractGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"dlgIdsmSetupContractGrid" ); 
}

function closeIdsmSetupContractSearchPopUp() {
	
	dlgIdsmSetupContractGrid.Dispose();
}

function setIdsmSetupContractSearchPopUpData() {
	searchIdsmSetupContractSearch(); 
}

function searchIdsmSetupContractSearch(){
	if($('#txtDlgIdsmSetupContractSearchContractSeq').val() == '') return;

	$.ajax({
		url: "/getIdsmSetupDlgContractHeaderSearch.do",		
		data: {
			'PROJECT_NO' : v_idsm_setup_contract_list_param.PROJECT_NO
			,"CONTRACT_SEQ" : $('#txtDlgIdsmSetupContractSearchContractSeq').val()
		},
		success: function (data, textStatus, jqXHR) {
			console.log(data);
			dlgIdsmSetupContractGrid.Source.Data.Data.Body = [data.results];
			dlgIdsmSetupContractGrid.ReloadBody();
        }
    });
}

function gridIdsmSetupContractDbClick( grid, row, col ) {
	var param = Object.assign({}, row);
	if(v_idsm_setup_contract_list_callback)
	{
		v_idsm_setup_contract_list_callback("select-item", param);
	}
	
	$("#dlgIdsmSetupContractSearch").modal('hide');
}

function btnDlgIdsmSetupContractSearchSelectClick() {
	var selectList = dlgIdsmSetupContractGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var row = selectList[0];
	var param = Object.assign({}, row);
	if(v_idsm_setup_contract_list_callback)
	{
		v_idsm_setup_contract_list_callback("select-item", param);
	}
	
	$("#dlgIdsmSetupContractSearch").modal('hide');
}



