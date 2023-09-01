var dlgDesmPlSummaryEditLogGrid;

var v_desm_pl_summary_edit_log_callback = null;
var v_desm_pl_summary_edit_log_param;



function initDesmPlSummaryEditLogPopUp(param , callback) {
	v_desm_pl_summary_edit_log_callback = callback;
    v_desm_pl_summary_edit_log_param = param;

	$('#dlgDesmPlSummaryEditLog').on('shown.bs.modal', function () {
		$('#dlgDesmPlSummaryEditLog').click();
	});

	$('#dlgDesmPlSummaryEditLog').on('hidden.bs.modal', function () {
	  	closeDesmPlSummaryEditLogPopUp();
	});

	$('#dlgDesmPlSummaryEditLog').modal('show');


    initDesmPlSummaryEditLogPopUpCode();
}

function initDesmPlSummaryEditLogPopUpCode() {

	initDesmPlSummaryEditLogPopUpControls();
}


function initDesmPlSummaryEditLogPopUpControls() {


	TGSetEvent("OnCopy","dlgDesmPlDtlEditLogGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmPlSummaryEditLogGridCol = {
		"Cfg": {
			"id"				: "dlgDesmPlSummaryEditLogGrid"
			, "CfgId"			: "dlgDesmPlSummaryEditLogGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "2"
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
				    {	"Name"	: "IS_CONFIRM_MATERIAL", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "SEL_INVOICE_NUM", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "PACKAGE_TYPE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "NET", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "GROSS", "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "HAZARDOUS_MATERIAL", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "QTY", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REMARK", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "VENDOR", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "OLD_INF_OF_VENDOR", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "RECEIPT_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
					{	"Name"	: "RECEIVED_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
					{	"Name"	: "STORAGE_LOCATION", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "LOC_UPDATE_DATE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "LOC_UPDATED_BY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "SUB_CONTRACTOR", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REPORT_SHORT", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
					{	"Name"	: "REPORT_SHORT_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REPORT_OVER", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
					{	"Name"	: "REPORT_OVER_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REPORT_DMG", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
					{	"Name"	: "REPORT_DMG_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REPORT_MISSING", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
					{	"Name"	: "REPORT_MISSING_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "REPORT_LOST", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Visible" :"0" },
					{	"Name"	: "REPORT_DESCRIPTION", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "CREATION_DATE_TXT", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "CREATED_BY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }

				],
			"Head" : [{
				"Kind"	: "Header",
				"id" : "Header",
				"Spanned" : "1",
				"PanelRowSpan" : "2",
				"Class" : "gridCenterText",
				"IS_CONFIRM_MATERIAL"	: "Material\nConfirm", "IS_CONFIRM_MATERIALRowSpan" : "2",
				"SEL_INVOICE_NUM"	: "Invoice No.", "SEL_INVOICE_NUMRowSpan" : "2",
				"PACKAGE_LIST_NO"	: "Packing list No.", "PACKAGE_LIST_NORowSpan" : "2",
				"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
				"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
				"PACKAGE_TYPE"	: "Packing Style", "PACKAGE_TYPERowSpan" : "2",
				"L_CM"	: "Measurement", "L_CMSpan" : "4",
				"W_CM"	: "Measurement",
				"H_CM"	: "Measurement",
				"VOLUME"	: "Measurement",
				"NET"	: "Net Weight\n(Kg)", "NETRowSpan" : "2",
				"GROSS"	: "Gross Weight\n(Kg)", "GROSSRowSpan" : "2",
				"HAZARDOUS_MATERIAL" : "Hazardous\nMaterial", "HAZARDOUS_MATERIALRowSpan" : "2",
				"REMARKS"	: "Storage\nClassification", "REMARKSRowSpan" : "2",
				"QTY" : "QTY", "QTYRowSpan" : "2",
				"REMARK" : "Remark\n(UNIT, spare part..)", "REMARKRowSpan" : "2",
				"VENDOR" : "Vendor", "VENDORRowSpan" : "2",
				"OLD_INF_OF_VENDOR" : "Old inf of Vendor", "OLD_INF_OF_VENDORRowSpan" : "2",
				"RECEIPT_DATE" : "Receipt Date", "RECEIPT_DATERowSpan" : "2",
				"RECEIVED_DATE" : "Received Date", "RECEIVED_DATERowSpan" : "2",
				"STORAGE_LOCATION" : "Storage Location", "STORAGE_LOCATIONRowSpan" : "2",
				"LOC_UPDATE_DATE" : "Location Last Updated Date", "LOC_UPDATE_DATERowSpan" : "2",
				"LOC_UPDATED_BY" : "Location Last Updated By", "LOC_UPDATED_BYRowSpan" : "2",
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
				"REPORT_DESCRIPTION"	: "MIR Description", "REPORT_DESCRIPTIONRowSpan" : "2",
				"CREATION_DATE_TXT"	: "Edit Date", "CREATION_DATE_TXTRowSpan" : "2",
				"CREATED_BY"	: "Edit By", "CREATED_BYRowSpan" : "2"},
			   {"Kind"	: "Header",
				"Spanned" : "1",
				"Class" : "gridCenterText",
				"IS_CONFIRM_MATERIAL"	: "Confirm\nMaterial",
				"SEL_INVOICE_NUM"	: "Invoice No.",
				"PACKAGE_NO" : "Package No.",
				"DESCRIPTION" : "Description of Goods\nSpecification",
				"PACKAGE_TYPE" : "Packing Style",
				"L_CM"	: "L (cm)",
				"W_CM"	: "W (cm)",
				"H_CM"	: "H (cm)",
				"VOLUME"	: "CBM (m3)",
				"NET"	: "Net Weight\n(Kg)",
				"GROSS"	: "Gross Weight\n(Kg)",
				"HAZARDOUS_MATERIAL" : "Hazardous\nMaterial",
				"REMARKS"	: "Storage\nClassification",
				"QTY" : "QTY",
				"REMARK" : "Remark\n(UNIT, spare part..)",
				"VENDOR" : "Vendor",
				"OLD_INF_OF_VENDOR" : "Old inf of Vendor",
				"RECEIPT_DATE" : "Receipt Date",
				"RECEIVED_DATE" : "Received Date",
				"STORAGE_LOCATION" : "Storage Location",
				"LOC_UPDATE_DATE" : "Location Last Updated Date",
				"LOC_UPDATED_BY" : "Location Last Updated By",
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
				"REPORT_DESCRIPTION"	: "MIR Description",
				"CREATION_DATE_TXT"	: "Edit Date",
				"CREATED_BY"	: "Edit By"
				}
			]
				};

	dlgDesmPlSummaryEditLogGrid = TreeGrid( {Layout:{Data : dlgDesmPlSummaryEditLogGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmPlSummaryEditLogGrid" );

	TGSetEvent("OnRenderFinish","dlgDesmPlSummaryEditLogGrid",function(grid){
		searchData();
	});

}



function closeDesmPlSummaryEditLogPopUp() {
	dlgDesmPlSummaryEditLogGrid.Dispose();
}

function searchData() {

	$.ajax({
		url: "/getDesmPlSummaryEditLogList.do",
		data: v_desm_pl_summary_edit_log_param,
		success: function (data, textStatus, jqXHR) {

			dlgDesmPlSummaryEditLogGrid.Source.Data.Data.Body = [data.results];
			dlgDesmPlSummaryEditLogGrid.ReloadBody();


        }
    });
}
