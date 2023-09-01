var dlgDesmMrrPlDtlGrid;

var v_desm_mrr_pl_dtl_callback = null;
var v_desm_mrr_pl_dtl_param;
var elSelLocation;
// desmMrrPlDtlpopup

function initDesmMrrPlDtlPopUp(param , callback) {
	v_desm_mrr_pl_dtl_callback = callback;
    v_desm_mrr_pl_dtl_param = param;

	$('#dlgDesmMrrPlDtl').on('shown.bs.modal', function () {
		$('#dlgDesmMrrPlDtl').click();
	});

	$('#dlgDesmMrrPlDtl').on('hidden.bs.modal', function () {
	  	closeDesmMrrPlDtlPopUp();
	});

	$('#dlgDesmMrrPlDtl').modal('show');


    initDesmMrrPlDtlPopUpCode();
}

function initDesmMrrPlDtlPopUpCode() {
	//initTypeCode(initDesmMrrPlDtlPopUpControls,"selDlgDesmMrrPlDtlType");
	initDesmMrrPlDtlPopUpControls();
}


function initDesmMrrPlDtlPopUpControls() {



	makeAutocomplete(
		"txtDlgDesmMrrPlDtlProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrrPlDtlProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrrPlDtlProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrrPlDtlProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	//$('#iconDlgDesmMrrPlDtlProjectSearch').click(function () { iconDlgDesmMrrPlDtlProjectSearchClick(); return false; });
	$('#btnDlgDesmMrrPlDtlSearch').click(function () { btnDlgDesmMrrPlDtlSearchClick(); return false; });
	$('#btnDlgDesmMrrPlDtlResete').click(function () { btnDlgDesmMrrPlDtlReseteClick(); return false; });
	$('#btnDlgDesmMrrPlDtlCompletion').click(function () { btnDlgDesmMrrPlDtlCompletionClick(); return false; });



	/*$("#txtDlgDesmMrrPlDtlProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrrPlDtlPackageListNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrrPlDtlPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrrPlDtlDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrrPlDtlDrawingNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrrPlDtlTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

		$("#txtDlgDesmMrrPlDtlMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrrPlDtlRemarks").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrrPlDtlSearch').click();
		}
	});
	*/


	TGSetEvent("OnCopy","dlgDesmMrrPlDtlGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmMrrPlDtlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMrrPlDtlGrid"
			, "CfgId"			: "dlgDesmMrrPlDtlGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "550"
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
			,"ColsPosLap":"1"
			//,"ColsLap":"1"
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
		"Cols" : [
		    {	"Name"	: "STATUS", "Visible" :"0", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "IS_CONFIRM_MATERIAL", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "CONFIRM_DATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "ATTRIBUTE3", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "ATTRIBUTE10", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//		    {	"Name"	: "ATTRIBUTE9", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

			{	"Name"	: "SEL_INVOICE_NUM", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{   "Name"  : "DETAIL_LIST", "Width": "25"	, "Type": "Text", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/list-ul.svg", "IconAlign" : "Center", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" , "IconSize" : "2"	},
			//{   "Name"  : "PACKAGE_HISTORY", "Width": "25"	, "Type": "Text", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/history.svg", "IconAlign" : "Center", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openHistory( Grid, Row,Col )"	, "IconSize" : "2"	},
			{	"Name"	: "PACKAGE_STATUS", "Visible" :"0", "Width": "90", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "OUT_STATUS", "Width": "85", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "OUT_STATUS_QTY", "Width": "95", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PACKAGE_TYPE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "SQM", "Width": "90", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "NET", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "GROSS", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "HAZARDOUS_MATERIAL", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARKS", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "RECEIPT_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
			{	"Name"	: "LAST_OUTGOING_DATE", "Visible" :"0", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd" },
			{	"Name"	: "QTY", "Visible" :"0", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARK", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "VENDOR", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "OLD_INF_OF_VENDOR", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "RECEIVED_DATE", "Visible" :"0", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": ""},
			{	"Name"	: "STORAGE_LOCATION", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "LOC_UPDATE_DATE", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "LOC_UPDATED_BY", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "SUB_CONTRACTOR", "Visible" :"0", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_SHORT", "Visible" :"0", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_SHORT_QTY", "Visible" :"0", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_OVER", "Visible" :"0", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_OVER_QTY", "Visible" :"0", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_DMG", "Visible" :"0", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_DMG_QTY", "Visible" :"0", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_MISSING", "Visible" :"0", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_MISSING_QTY", "Visible" :"0", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_LOST", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Visible" :"0" },
			{	"Name"	: "REPORT_DESCRIPTION", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }

		]
		,"Head" : [{
			"Kind"	: "Header",
			"id" : "Header",
			"Spanned" : "1",
			"PanelRowSpan" : "2",
			"Class" : "gridCenterText",
			
			
			"STATUS"	: "Status", "STATUSRowSpan" : "2",
			"IS_CONFIRM_MATERIAL"	: "Material\nConfirm", "IS_CONFIRM_MATERIALRowSpan" : "2",
			"CONFIRM_DATE"	: "Material\nConfirm Date", "CONFIRM_DATERowSpan" : "2",
			"ATTRIBUTE3"	: "Vendor", "ATTRIBUTE3RowSpan" : "2",
			"ATTRIBUTE10"	: $('#gridColShippingOrder').val(), "ATTRIBUTE10RowSpan" : "2",
//			"ATTRIBUTE9"	: "Sequence", "ATTRIBUTE9RowSpan" : "2",

			"SEL_INVOICE_NUM"	: "Invoice No.", "SEL_INVOICE_NUMRowSpan" : "2",
			"PACKAGE_LIST_NO"	: "Packing list No.", "PACKAGE_LIST_NORowSpan" : "2",
			"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
			"DETAIL_LIST"	: " ", "DETAIL_LISTRowSpan" : "2",
			//"PACKAGE_HISTORY"	: " ", "DETAIL_LISTRowSpan" : "2",
			"PACKAGE_STATUS": "CLOSED", "PACKAGE_STATUSRowSpan" : "2",
			"OUT_STATUS"	: "A/O", "OUT_STATUSRowSpan" : "2",
			"OUT_STATUS_QTY"	: "A/O(Q'ty)", "OUT_STATUS_QTYRowSpan" : "2",
			"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
			"PACKAGE_TYPE"	: "Packing Style", "PACKAGE_TYPERowSpan" : "2",
			"L_CM"	: "Measurement", "L_CMSpan" : "4",
			"W_CM"	: "Measurement",
			"H_CM"	: "Measurement",
			"VOLUME"	: "Measurement",
			"SQM": "SQM(㎡)", "SQMRowSpan": "2",
			"NET"	: "Net Weight\n(Kg)", "NETRowSpan" : "2",
			"GROSS"	: "Gross Weight\n(Kg)", "GROSSRowSpan" : "2",
			"HAZARDOUS_MATERIAL" : "Hazardous\nMaterial", "HAZARDOUS_MATERIALRowSpan" : "2",
			"REMARKS"	: "Storage\nClassification", "REMARKSRowSpan" : "2",
			"RECEIPT_DATE"	: "Receipt Date", "RECEIPT_DATERowSpan" : "2",
			"LAST_OUTGOING_DATE"	: "Last Outgoing Date", "LAST_OUTGOING_DATERowSpan" : "2",
			"QTY" : "QTY", "QTYRowSpan" : "2",
			"REMARK" : "Remark\n(UNIT, spare part..)", "REMARKRowSpan" : "2",
			"VENDOR" : "Vendor", "VENDORRowSpan" : "2",
			"OLD_INF_OF_VENDOR" : "Old inf of Vendor", "OLD_INF_OF_VENDORRowSpan" : "2",
			"RECEIVED_DATE" : "Received Date", "RECEIVED_DATERowSpan" : "2",
			"STORAGE_LOCATION" : "Location", "STORAGE_LOCATIONRowSpan" : "2",
			"LOC_UPDATE_DATE"	: "Location Last Updated Date", "LOC_UPDATE_DATERowSpan" : "2",
			"LOC_UPDATED_BY"	: "Location Last Updated By", "LOC_UPDATED_BYRowSpan" : "2",
			"SUB_CONTRACTOR" : "Issue",
			"REPORT_SHORT"	: "Short", "REPORT_SHORTSpan" : "2",
			"REPORT_SHORT_QTY"	: "Short",
			"REPORT_OVER"	: "Over", "REPORT_OVERSpan" : "2",
			"REPORT_OVER_QTY"	: "Over",
			"REPORT_DMG"	: "Dmg", "REPORT_DMGSpan" : "2",
			"REPORT_DMG_QTY"	: "Dmg",
			"REPORT_MISSING"	: "Missing", "REPORT_MISSINGSpan" : "2",
			"REPORT_MISSING_QTY"	: "Missing",
			"REPORT_LOST"	: "MIR Lost", "REPORT_LOSTRowSpan" : "2",
			"REPORT_DESCRIPTION"	: "MIR Description", "REPORT_DESCRIPTIONRowSpan" : "2"},
		   {"Kind"	: "Header",
			"Spanned" : "1",
			"Class" : "gridCenterText",
			"STATUS"	: "Status",
			"IS_CONFIRM_MATERIAL"	: "Confirm\nMaterial",
			"CONFIRM_DATE"	: "Material\nConfirm Date",
			"ATTRIBUTE3"	: "Vendor",
			"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
//			"ATTRIBUTE9"	: "Sequence",
			"SEL_INVOICE_NUM"	: "Invoice No.",
			"PACKAGE_NO" : "Package No.",
			"DETAIL_LIST" : " ",
			//"PACKAGE_HISTORY" : " ",
			"PACKAGE_STATUS": "CLOSED",
			"OUT_STATUS"	: "A/O",
			"OUT_STATUS_QTY": "A/O(Q'ty)",
			"DESCRIPTION" : "Description of Goods\nSpecification",
			"PACKAGE_TYPE" : "Packing Style",
			"L_CM"	: "L (cm)",
			"W_CM"	: "W (cm)",
			"H_CM"	: "H (cm)",
			"VOLUME"	: "CBM (m3)",
			"SQM": "SQM(㎡)",
			"NET"	: "Net Weight\n(Kg)",
			"GROSS"	: "Gross Weight\n(Kg)",
			"HAZARDOUS_MATERIAL" : "Hazardous\nMaterial",
			"REMARKS"	: "Storage\nClassification",
			"RECEIPT_DATE"	: "Receipt Date",
			"LAST_OUTGOING_DATE"	: "Last Outgoing Date",
			"QTY" : "QTY",
			"REMARK" : "Remark\n(UNIT, spare part..)",
			"VENDOR" : "Vendor",
			"OLD_INF_OF_VENDOR" : "Old inf of Vendor",
			"RECEIVED_DATE" : "Received Date",
			"STORAGE_LOCATION" : "Location",
			"LOC_UPDATE_DATE"	: "Location Last Updated Date",
			"LOC_UPDATED_BY"	: "Location Last Updated By",
			"SUB_CONTRACTOR" : "Sub-contractor",
			"REPORT_SHORT"	: "Short",
			"REPORT_SHORT_QTY"	: "Q’ty",
			"REPORT_OVER"	: "Over",
			"REPORT_OVER_QTY"	: "Q’ty",
			"REPORT_DMG"	: "Dmg",
			"REPORT_DMG_QTY"	: "Q’ty",
			"REPORT_MISSING"	: "Missing",
			"REPORT_MISSING_QTY"	: "Q’ty",
			"REPORT_LOST"	: "MIR Lost",
			"REPORT_DESCRIPTION"	: "MIR Description"
			}
		]
		};

	dlgDesmMrrPlDtlGrid = TreeGrid( {Layout:{Data : dlgDesmMrrPlDtlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMrrPlDtlGrid" );
	TGSetEvent("OnRenderFinish","dlgDesmMrrPlDtlGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
	});
	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmMrrPlDtlProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmMrrPlDtlProjectName').val(list[0]["NAME"]);
			//initDesmMrrPlDtlVoyageCombo();
			initVoyageCombo();
			initAreaCombo();
		}
	});
}

function gridReloadFn(grid) {
	var list = grid.Rows;
	for (var key in list) {
		var gridRow = list[key];
		if(gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0){
			gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
		}
		grid.RefreshRow(gridRow);
	}
}



function closeDesmMrrPlDtlPopUp() {
	dlgDesmMrrPlDtlGrid.Dispose();
}

function iconDlgDesmMrrPlDtlProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmMrrPlDtlProjectCode').val(), TYPE : "A"};

	$('#dlgDesmMrrPlDtlPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmMrrPlDtlProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmMrrPlDtlProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmMrrPlDtlSearchClick() {

	elSelLocation.sumo.hideOpts();
	
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if($('#txtDlgDesmMrrPlDtlProjectCode').val().length < 2 || $('#txtDlgDesmMrrPlDtlProjectName').val() == ""){
		$('#txtDlgDesmMrrPlDtlProjectCode').val("");
		$('#txtDlgDesmMrrPlDtlProjectName').val("");
		$("#txtDlgDesmMrrPlDtlProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblDlgDesmMrrPlDtlSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	if($('#txtPackingListNo').val() == "" && $('#txtPackageNo').val() == "" && $('#txtDescription').val() == "" &&
	   //$('#selMaterialConfirm').val() == "" && 
	   $('#selReceipted').val() == "" && $('#selAttribute10').val() == "" &&
	   $('#txtRemark').val() == "" && $('#txtSequence').val() == "" && $('#txtVendor').val() == "" &&
	   $('#txtStartReceiptDate').val() == "" && $('#txtEndReceiptDate').val() == "" ) {
		alert_modal("", $('#alertSearchTwo').val());
		return;
	}
	
	
	var paramData = {
			PROJECT_NO : $('#txtDlgDesmMrrPlDtlProjectCode').val(),
	 		 INVOICE_NO : $('#txtDlgDesmMrrPlDtlInvoiceNo').val(),
			 PACKAGE_LIST_NO : $('#txtPackingListNo').val(),
			 PACKAGE_NO : $('#txtDlgDesmMrrPlDtlPackageNo').val(),
			 DESCRIPTION : $('#txtDescription').val(),
			 ATTRIBUTE10 : $('#selAttribute10').val(),
			 VENDOR : $('#txtVendor').val(),
			 LOCATION : elSelLocation.sumo.getSelStr()
	};
	
	$.ajax({
	url: "/getIdsmOsSummaryMrrList.do",
	data: paramData,
	success: function (data, textStatus, jqXHR) {
	
	
		dlgDesmMrrPlDtlGrid.Source.Data.Data.Body = [data.results];
		dlgDesmMrrPlDtlGrid.Reload();
	
	
	}
	});

	/*if($('#txtDlgDesmMrrPlDtlPackageListNo').val() == "" && $('#txtDlgDesmMrrPlDtlPackageNo').val() == "" && $('#txtDlgDesmMrrPlDtlDescription').val() == "" &&
       $('#txtDlgDesmMrrPlDtlDrawingNo').val() == "" && $('#txtDlgDesmMrrPlDtlTagNo').val() == "" && $('#selDlgDesmMrrPlDtlAttribute10').val() == "" &&
       $('#txtDlgDesmMrrPlDtlMaterialCode').val() == "" && $('#txtDlgDesmMrrPlDtlRemarks').val() == "" && $('#txtDlgDesmMrrPlDtlSize').val() == "" &&
		$('#selDlgDesmMrrPlDtlType').val() == "" && $('#txtDlgDesmMrrPlDtlCategory').val() == "" && $('#txtDlgDesmMrrPlDtlSubCategory').val() == "" && $('#txtDlgDesmMrrPlDtlNote').val() == "" ) {
		alert_modal("", $('#alertSearchTwo').val());
		return;
    }

	var paramData = {PROJECT_NO : $('#txtDlgDesmMrrPlDtlProjectCode').val(),
					 PACKAGE_LIST_NO : $('#txtDlgDesmMrrPlDtlPackageListNo').val(),
					 PACKAGE_NO : $('#txtDlgDesmMrrPlDtlPackageNo').val(),
					 DESCRIPTION : $('#txtDlgDesmMrrPlDtlDescription').val(),
					 DRAWING_NO : $('#txtDlgDesmMrrPlDtlDrawingNo').val(),
					 TAG_NO : $('#txtDlgDesmMrrPlDtlTagNo').val(),
					 ATTRIBUTE10 : $('#selDlgDesmMrrPlDtlAttribute10').val(),
					 MATERIAL_CODE : $('#txtDlgDesmMrrPlDtlMaterialCode').val(),
					 SIZE : $('#txtDlgDesmMrrPlDtlSize').val(),
					 REMARKS : $('#txtDlgDesmMrrPlDtlRemarks').val(),
					 TYPE : $('#selDlgDesmMrrPlDtlType').val(),
					 CATEGORY : $('#txtDlgDesmMrrPlDtlCategory').val(),
					 SUB_CATEGORY : $('#txtDlgDesmMrrPlDtlSubCategory').val(),
					 COMMENTS : $('#txtDlgDesmMrrPlDtlNote').val(),
	};

	$.ajax({
		url: "/getDesmRsiPlDetailList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			dlgDesmMrrPlDtlGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMrrPlDtlGrid.Reload();


        }
    });*/
}

function checkRequiredField(areaID) {
	var chkValidation = true;

	$("#" + areaID + " input:visible, #" + areaID + " select:visible, #" + areaID + " textarea:visible").each(function () {
		if ($(this).hasClass("required") && $(this).attr("type") == "file") {
			if (getAttachedFilesCount(($(this).attr("id"))) == 0) {
				$(".file-input").addClass("validation-error");
				chkValidation = false;
			} else {
				$(".file-input").removeClass("validation-error");
				$(this).removeClass("validation-error");
			}
		}
		else if ($(this).hasClass("required") && ($(this).val() == null || $(this).val().IsNullOrEmpty())) {
			$(this).addClass("validation-error");
			chkValidation = false;
		} else {
			$(this).removeClass("validation-error");
		}
	});

	return chkValidation;
}

function btnDlgDesmMrrPlDtlReseteClick() {
	//$('#txtDlgDesmMrrPlDtlProjectCode').val("");
	//$('#txtDlgDesmMrrPlDtlProjectName').val("");
	$('#txtPackingListNo').val("");
	$('#txtPackingListNo').val("");
	$('#txtPackageNo').val("");
	$('#txtDescription').val("");
	//$('#selMaterialConfirm').val("");
	$('#txtRemark').val("");
	$('#txtSequence').val(""),
	$('#txtVendor').val(""),
	$('#selReceipted').val(""),

	$('#selAttribute10').val("");
	elSelLocation.sumo.unSelectAll();
	
	$('#txtStartReceiptDate').val("");
 	$('#txtEndReceiptDate').val("");
 	$('#txtStartReceiptDate').attr('disabled', true);
 	$("#txtEndReceiptDate").attr('disabled', true);

}

function btnDlgDesmMrrPlDtlCompletionClick() {
	var selectList = dlgDesmMrrPlDtlGrid.GetSelRows();
    console.log("selectList.length::::", selectList.length);
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	if(v_desm_mrr_pl_dtl_callback)
	{
		v_desm_mrr_pl_dtl_callback("select-item", selectList);
		$('#dlgDesmMrrPlDtl').modal('hide');
	}
}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selAttribute10 option").remove();
			$("#selAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function initAreaCombo() {
	$.ajax({
		url: "/getLocationCodeList.do",
		data: {"PROJECT_NO" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(setComboTitle(list, "selLocation", "")) {
				elSelLocation = $('#selLocation').SumoSelect({placeholder: 'All', csvSepChar: '!!!'});
				$(".optWrapper").tooltip();
			}


        }
    });
}