var dlgDesmPlDtlEditLogGrid;

var v_desm_pl_dtl_edit_log_callback = null;
var v_desm_pl_dtl_edit_log_param;



function initDesmPlDtlEditLogPopUp(param , callback) {
	v_desm_pl_dtl_edit_log_callback = callback;
    v_desm_pl_dtl_edit_log_param = param;

	$('#dlgDesmPlDtlEditLog').on('shown.bs.modal', function () {
		$('#dlgDesmPlDtlEditLog').click();
	});

	$('#dlgDesmPlDtlEditLog').on('hidden.bs.modal', function () {
	  	closeDesmPlDtlEditLogPopUp();
	});

	$('#dlgDesmPlDtlEditLog').modal('show');


    initDesmPlDtlEditLogPopUpCode();
}

function initDesmPlDtlEditLogPopUpCode() {

	initDesmPlDtlEditLogPopUpControls();
}


function initDesmPlDtlEditLogPopUpControls() {


	TGSetEvent("OnCopy","dlgDesmPlDtlEditLogGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmPlDtlEditLogGridCol = {
		"Cfg": {
			"id"				: "dlgDesmPlDtlEditLogGrid"
			, "CfgId"			: "dlgDesmPlDtlEditLogGridCfg"
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
			{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "UNIT", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "NOS", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "LOCATION", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "LOC_UPDATE_DATE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "LOC_UPDATED_BY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_SHORT", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_SHORT_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_OVER", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_OVER_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_DMG", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_DMG_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REPORT_MISSING", "Width": "90", "Type": "Bool" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "BoolIcon": "2" },
			{	"Name"	: "REPORT_MISSING_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CREATION_DATE_TXT", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CREATED_BY", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }

		],
		"Head" : [{
			"Kind"	: "Header",
			"id" : "Header",
			"Spanned" : "1",
			"PanelRowSpan" : "2",
			"Class" : "gridCenterText",
			"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
			"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
			"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
			"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2",
			"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
			"LOCATION"	: "Location", "LOCATIONRowSpan" : "2",
			"LOC_UPDATE_DATE" : "Location Last Updated Date", "LOC_UPDATE_DATERowSpan" : "2",
			"LOC_UPDATED_BY" : "Location Last Updated By", "LOC_UPDATED_BYRowSpan" : "2",
			"UNIT"	: "Unit", "UNITRowSpan" : "2",
			"NOS"	: "Nos", "NOSRowSpan" : "2",
			"IN_QTY"	: "IN\nQ’ty (A)", "IN_QTYRowSpan" : "2",
			"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2",
			"REPORT_SHORT"	: "Short", "REPORT_SHORTSpan" : "2",
			"REPORT_SHORT_QTY"	: "Short",
			"REPORT_OVER"	: "Over", "REPORT_OVERSpan" : "2",
			"REPORT_OVER_QTY"	: "Over",
			"REPORT_DMG"	: "Dmg", "REPORT_DMGSpan" : "2",
			"REPORT_DMG_QTY"	: "Dmg",
			"REPORT_MISSING"	: "Missing",  "REPORT_MISSINGSpan" : "2",
			"REPORT_MISSING_QTY"	: "Missing",
			"CREATION_DATE_TXT"	: "Edit Date", "CREATION_DATE_TXTRowSpan" : "2",
			"CREATED_BY"	: "Edit By", "CREATED_BYRowSpan" : "2"},
		   {"Kind"	: "Header",
			"Spanned" : "1",
			"Class" : "gridCenterText",
			"DESCRIPTION"	: "Description of Goods\nSpecification",
			"DRAWING_NO"	: "Drawing No.",
			"TAG_NO"	: "Item Tag No.",
			"MATERIAL_CODE"	: "Material\nCode",
			"MATERIAL"	: "Material",
			"LOCATION"	: "Location",
			"LOC_UPDATE_DATE" : "Location Last Updated Date",
			"LOC_UPDATED_BY" : "Location Last Updated By",
			"UNIT"	: "Unit",
			"NOS"	: "Nos",
			"IN_QTY"	: "IN\nQ’ty (A)",
			"REMARKS"	: "Remarks",
			"REPORT_SHORT"	: "Short",
			"REPORT_SHORT_QTY"	: "Q’ty",
			"REPORT_OVER"	: "Over",
			"REPORT_OVER_QTY"	: "Q’ty",
			"REPORT_DMG"	: "Dmg",
			"REPORT_DMG_QTY"	: "Q’ty",
			"REPORT_MISSING"	: "Missing",
			"REPORT_MISSING_QTY"	: "Q’ty",
			"CREATION_DATE_TXT"	: "Edit Date",
			"CREATED_BY"	: "Edit By"}
		]
		};

	dlgDesmPlDtlEditLogGrid = TreeGrid( {Layout:{Data : dlgDesmPlDtlEditLogGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmPlDtlEditLogGrid" );

	TGSetEvent("OnRenderFinish","dlgDesmPlDtlEditLogGrid",function(grid){
		searchData();
	});

}



function closeDesmPlDtlEditLogPopUp() {
	dlgDesmPlDtlEditLogGrid.Dispose();
}

function searchData() {

	$.ajax({
		url: "/getDesmPlDetailEditLogList.do",
		data: v_desm_pl_dtl_edit_log_param,
		success: function (data, textStatus, jqXHR) {

			dlgDesmPlDtlEditLogGrid.Source.Data.Data.Body = [data.results];
			dlgDesmPlDtlEditLogGrid.ReloadBody();


        }
    });
}
