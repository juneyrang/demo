var dlgDesmMapLocationDetailGrid;

var v_desm_map_location_callback = null;
var v_desm_map_location_param;



function initDesmMapLocationPopUp(param , callback) {
	v_desm_map_location_callback = callback;
    v_desm_map_location_param = param;

	$('#dlgDesmMapLocation').on('shown.bs.modal', function () {
		$('#dlgDesmMapLocation').click();
	});

	$('#dlgDesmMapLocation').on('hidden.bs.modal', function () {
	  	closeDesmMapLocationPopUp();
	});

	$('#dlgDesmMapLocation').modal('show');


    initDesmMapLocationPopUpCode();
}

function initDesmMapLocationPopUpCode() {
	initTypeCode(initDesmMapLocationPopUpControls);
}


function initDesmMapLocationPopUpControls() {

	if(v_desm_map_location_param.type == "Package"){
		$("#dlgDesmMapLocationDetailGridDiv").hide();
		$("#dlgDesmMapLocationPackageGridDiv").show();
	}else{
		$("#dlgDesmMapLocationDetailGridDiv").show();
		$("#dlgDesmMapLocationPackageGridDiv").hide();
	}

    $("#dlgDesmMapLocationTitle").html("Material "+ v_desm_map_location_param.type +" list");

	$('#btnDlgDesmMapLocationDetailExcelDownload').click(function () { btnDlgDesmMapLocationDetailExcelDownloadClick(); return false; });

	TGSetEvent("OnCopy","dlgDesmMapLocationDetailGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();

		var dlgDesmMapLocationDetailGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMapLocationDetailGrid"
			, "CfgId"			: "dlgDesmMapLocationDetailGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "600"
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
					{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
					{	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "UNIT", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "NOS", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "PACKAGE_TYPE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "GROSS", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "NET", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "RT", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
					{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
		],
		"Head" : [{
					"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",
					"TYPE"	: "Type", "TYPERowSpan" : "2",
					"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
					"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
					"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
					"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
					"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
					"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2",
					"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
					"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
					"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
					"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
					"RT"	: "RT", "RTRowSpan" : "2",
					"L_CM"	: "Measurement", "L_CMSpan" : "4",
					"W_CM"	: "Measurement",
					"H_CM"	: "Measurement",
					"VOLUME"	: "Measurement",
					"UNIT"	: "Unit", "UNITRowSpan" : "2",
					"NOS"	: "Nos", "NOSRowSpan" : "2"},
		   {"Kind"	: "Header",
			"Spanned" : "1",
			"Class" : "gridCenterText",
			"PACKAGE_LIST_NO"	: "Packing List\nNo.",
			"TYPE"	: "Type",
			"CATEGORY"	: "Category",
			"PACKAGE_NO"	: "Package No.",
			"DESCRIPTION"	: "Description of Goods\nSpecification",
			"DRAWING_NO"	: "Drawing No.",
			"TAG_NO"	: "Item Tag No.",
			"MATERIAL_CODE"	: "Material\nCode",
			"MATERIAL"	: "Material",
			"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
			"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
			"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
			"RT"	: "RT",
			"L_CM"	: "L(cm)",
			"W_CM"	: "W(cm)",
			"H_CM"	: "H(cm)",
			"VOLUME"	: "CBM(m3)",
			"UNIT"	: "Unit",
			"NOS"	: "Nos"}
		]
		};

	dlgDesmMapLocationDetailGrid = TreeGrid( {Layout:{Data : dlgDesmMapLocationDetailGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMapLocationDetailGrid" );

	TGSetEvent("OnRenderFinish","dlgDesmMapLocationDetailGrid",function(grid){
		searchData();
	});



	var dlgDesmMapLocationPackageGridCol = {
			"Cfg": {
				"id"				: "dlgDesmMapLocationPackageGrid"
				, "CfgId"			: "dlgDesmMapLocationPackageGridCfg"
				, "SuppressCfg"		: "0"
				, "StyleLap"		: "0"
				, "Version"			: "0"
				, "CacheTimeout" : "100"
				, "Style"			: "Material"
				, "Size"			: "Small"
				, "Scale"			: "90%"
				, "ConstWidth"		: "100%"
				, "MinTagHeight"	: "600"
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
						{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "PACKAGE_TYPE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "TRK_ITEM_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "GROSS", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "NET", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "RT", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
						{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
			],
			"Head" : [{
						"Kind"	: "Header",
						"id" : "Header",
						"Spanned" : "1",
						"PanelRowSpan" : "2",
						"Class" : "gridCenterText",
						"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",
						"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
						"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
						"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
						"TRK_ITEM_NAME"	: "Trk Item Name", "TRK_ITEM_NAMERowSpan" : "2",
						"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
						"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
						"RT"	: "RT", "RTRowSpan" : "2",
						"L_CM"	: "Measurement", "L_CMSpan" : "4",
						"W_CM"	: "Measurement",
						"H_CM"	: "Measurement",
						"VOLUME"	: "Measurement"},
			   {"Kind"	: "Header",
				"Spanned" : "1",
				"Class" : "gridCenterText",
				"PACKAGE_LIST_NO"	: "Packing List\nNo.",
				"PACKAGE_NO"	: "Package No.",
				"DESCRIPTION"	: "Description of Goods\nSpecification",
				"DRAWING_NO"	: "Drawing No.",
				"TAG_NO"	: "Item Tag No.",
				"MATERIAL_CODE"	: "Material\nCode",
				"MATERIAL"	: "Material",
				"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
				"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
				"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
				"RT"	: "RT",
				"L_CM"	: "L(cm)",
				"W_CM"	: "W(cm)",
				"H_CM"	: "H(cm)",
				"VOLUME"	: "CBM(m3)"}
			]
			};

		dlgDesmMapLocationPackageGrid = TreeGrid( {Layout:{Data : dlgDesmMapLocationPackageGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMapLocationPackageGrid" );

		TGSetEvent("OnRenderFinish","dlgDesmMapLocationPackageGrid",function(grid){
			searchData();
		});

}



function closeDesmMapLocationPopUp() {
	dlgDesmMapLocationDetailGrid.Dispose();
	dlgDesmMapLocationPackageGrid.Dispose();
}

function searchData() {
	$.ajax({
		url: "/getDesmDesmMapLocationList.do",
		data: v_desm_map_location_param,
		success: function (data, textStatus, jqXHR) {
			var result = data.results;

			dlgDesmMapLocationPackageGrid.Source.Data.Data.Body = [result.packageInfo];
			dlgDesmMapLocationPackageGrid.ReloadBody();

			dlgDesmMapLocationDetailGrid.Source.Data.Data.Body = [result.detailInfo];
			dlgDesmMapLocationDetailGrid.ReloadBody();
        }
    });
}

function btnDlgDesmMapLocationDetailExcelDownloadClick() {
	if(v_desm_map_location_param.type == "Package"){
		dlgDesmMapLocationPackageGrid.ExportFormat="xlsx";
		dlgDesmMapLocationPackageGrid.ActionExport();
	}else{
		dlgDesmMapLocationDetailGrid.ExportFormat="xlsx";
		dlgDesmMapLocationDetailGrid.ActionExport();
	}

		$(".TMMenuMain").hide();
		$(".TMMenuShadow").hide();
		$(".GridDisabled").hide();
		$("button[id^='TGMenuOk']").click();
}
