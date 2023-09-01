var v_idsm_setup_contract_list_callback = null;
var v_idsm_setup_contract_list_param;

var dlgIdsmSetupContractLineGrid;

function initIdsmContractLineSearchPopUp(param , callback) {
	v_idsm_setup_contract_list_callback = callback;
    v_idsm_setup_contract_list_param = param;
    console.log(v_idsm_setup_contract_list_param);
    
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

	TGSetEvent("OnRenderFinish","dlgIdsmSetupContractLineGrid",function(grid){
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
	dlgIdsmSetupContractLineGridCol = {
		"Cfg" : {
			"id"				: "dlgIdsmSetupContractLineGrid"
			, "CfgId"			: "dlgIdsmSetupContractLineGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" 	: "100"
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
		            {	"Name"	: "CONTRACT_HEADER_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "CONTRACT_LINE_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "REVISION", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "TYPE", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "ITEM1", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "ITEM2", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "ITEM3", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "ITEM4", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "ITEM_NO", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "SEPC", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "UOM", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "QUANTITY", "Width": "0", "Type": "Float" , "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "CalcAmount( Grid, Row,Col )" },
		   			{	"Name"	: "NET", "Width": "0", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "GROSS", "Width": "0", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "CURRENCY", "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Size": "3" },
		   			{	"Name"	: "UNIT_PRICE", "Width": "0", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "CalcAmount( Grid, Row,Col )" },
		   			{	"Name"	: "AMOUNT", "Width": "0", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		   			{	"Name"	: "PROMISED_DATE", "Width": "0", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
		   			{	"Name"	: "PAYMENT_METHOD", "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
		   			{	"Name"	: "FOB", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   			{	"Name"	: "REMARKS", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }
		]
		, "Header" : {
			"Class"		: "gridCenterText"
			, "TYPE"	: "Type"
			, "ITEM1"	: "Item1"
			, "ITEM2" 	: "Item2"
			, "ITEM3"	: "Item3"
			, "ITEM4" 	: "Item4"
			, "ITEM_NO"	: "Item No"
			, "SEPC"	: "Spec"
		}
	};
	
	dlgIdsmSetupContractLineGrid = TreeGrid( {Layout:{Data : dlgIdsmSetupContractLineGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"dlgIdsmSetupContractLineGrid" ); 
}

function closeIdsmSetupContractSearchPopUp() {
	
	dlgIdsmSetupContractLineGrid.Dispose();
}

function setIdsmSetupContractSearchPopUpData() {
	searchIdsmSetupContractSearch(); 
}

function searchIdsmSetupContractSearch(){

	$.ajax({
		url: "/getIdsmSetupDlgContractLineSearch.do",		
		data: {
			"CONTRACT_HEADER_ID" : v_idsm_setup_contract_list_param.CONTRACT_HEADER_ID
			, "keyword" : $('#txtDlgIdsmSetupContractSearchContractSeq').val()
		},
		success: function (data, textStatus, jqXHR) {
			var schLines = [];
			$.each(data.results, function(i, line) {
				schLines.push(line);
			});
			dlgIdsmSetupContractLineGrid.Source.Data.Data.Body = [schLines];
			dlgIdsmSetupContractLineGrid.ReloadBody();
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
	var selectList = dlgIdsmSetupContractLineGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	var param = Object.assign([], selectList);
	if(v_idsm_setup_contract_list_callback)
	{
		v_idsm_setup_contract_list_callback("select-item", param);
	}
	
	$("#dlgIdsmSetupContractSearch").modal('hide');
}



