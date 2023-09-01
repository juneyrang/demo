var dlgDesmTransactionHistoryGrid;

var v_desm_transaction_history_callback = null;
var v_desm_transaction_history_param;



function initDesmTransactionHistoryPopUp(param , callback) {
	v_desm_transaction_history_callback = callback;
    v_desm_transaction_history_param = param;

	$('#dlgDesmTransactionHistory').on('shown.bs.modal', function () {
		$('#dlgDesmTransactionHistory').click();
	});

	$('#dlgDesmTransactionHistory').on('hidden.bs.modal', function () {
	  	closeDesmTransactionHistoryPopUp();
	});

	$('#dlgDesmTransactionHistory').modal('show');


    initDesmTransactionHistoryPopUpCode();
}

function initDesmTransactionHistoryPopUpCode() {

	initDesmTransactionHistoryPopUpControls();
}


function initDesmTransactionHistoryPopUpControls() {


	TGSetEvent("OnCopy","dlgDesmTransactionHistoryGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmTransactionHistoryGridCol = {
		"Cfg": {
			"id"				: "dlgDesmTransactionHistoryGrid"
			, "CfgId"			: "dlgDesmTransactionHistoryGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "3"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "450"
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
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
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
		"Cols" : [
			{	"Name"	: "TYPE_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CATEGORY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "MATERIAL_CODE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "SOURCE", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "TRANSACTION_NO", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "ACTION_DATE", "Width": "200", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "ACTION_USER", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "QTY", "Width": "80", "Type": "Int","Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARKS", "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

		],
		"Header" :
		   {
			"Class" : "gridCenterText",
			"TYPE"	: "Type",
			"CATEGORY"	: "Category",
			"MATERIAL_CODE"	: "Material\nCode",
			"DESCRIPTION"	: "Description of Goods\nSpecification",
			"SOURCE"	: "Source",
			"TRANSACTION_NO"	: "Transaction No",
			"ACTION_DATE"	: "Action Date",
			"ACTION_USER"	: "Action User",
			"QTY"	: "Qty",
			"REMARKS"	: "Reamrks",
				}
		};

	dlgDesmTransactionHistoryGrid = TreeGrid( {Layout:{Data : dlgDesmTransactionHistoryGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmTransactionHistoryGrid" );

	TGSetEvent("OnRenderFinish","dlgDesmTransactionHistoryGrid",function(grid){
		searchData();
	});

}



function closeDesmTransactionHistoryPopUp() {
	dlgDesmTransactionHistoryGrid.Dispose();
}

function searchData() {

	$.ajax({
		url: "/getDesmTransactionHistoryList.do",
		data: v_desm_transaction_history_param,
		success: function (data, textStatus, jqXHR) {
			console.log(data);
			dlgDesmTransactionHistoryGrid.Source.Data.Data.Body = [data.results];
			dlgDesmTransactionHistoryGrid.ReloadBody();


        }
    });
}
