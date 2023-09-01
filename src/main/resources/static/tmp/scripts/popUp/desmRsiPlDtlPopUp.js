var dlgDesmRsiPlDtlGrid;

var v_desm_rsi_pl_dtl_callback = null;
var v_desm_rsi_pl_dtl_param;



function initDesmRsiPlDtlPopUp(param , callback) {
	v_desm_rsi_pl_dtl_callback = callback;
    v_desm_rsi_pl_dtl_param = param;

	$('#dlgDesmRsiPlDtl').on('shown.bs.modal', function () {
		$('#dlgDesmRsiPlDtl').click();
	});

	$('#dlgDesmRsiPlDtl').on('hidden.bs.modal', function () {
	  	closeDesmRsiPlDtlPopUp();
	});

	$('#dlgDesmRsiPlDtl').modal('show');


    initDesmRsiPlDtlPopUpCode();
}

function initDesmRsiPlDtlPopUpCode() {
	initTypeCode(initDesmRsiPlDtlPopUpControls,"selDlgDesmRsiPlDtlType");
}


function initDesmRsiPlDtlPopUpControls() {



	makeAutocomplete(
		"txtDlgDesmRsiPlDtlProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmRsiPlDtlProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmRsiPlDtlProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmRsiPlDtlProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	//$('#iconDlgDesmRsiPlDtlProjectSearch').click(function () { iconDlgDesmRsiPlDtlProjectSearchClick(); return false; });
	$('#btnDlgDesmRsiPlDtlSearch').click(function () { btnDlgDesmRsiPlDtlSearchClick(); return false; });
	$('#btnDlgDesmRsiPlDtlResete').click(function () { btnDlgDesmRsiPlDtlReseteClick(); return false; });
	$('#btnDlgDesmRsiPlDtlCompletion').click(function () { btnDlgDesmRsiPlDtlCompletionClick(); return false; });



	$("#txtDlgDesmRsiPlDtlProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmRsiPlDtlPackageListNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmRsiPlDtlPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmRsiPlDtlDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmRsiPlDtlDrawingNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmRsiPlDtlTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	/*
	$("#txtDlgDesmRsiPlDtlMaterial").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});
	*/

	$("#txtDlgDesmRsiPlDtlMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmRsiPlDtlRemarks").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmRsiPlDtlSearch').click();
		}
	});



	TGSetEvent("OnCopy","dlgDesmRsiPlDtlGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmRsiPlDtlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmRsiPlDtlGrid"
			, "CfgId"			: "dlgDesmRsiPlDtlGridCfg"
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
		, "Cfg_2" : { 
			"SearchExpression": ""
			, "SearchCells": "0"
			, "SearchFocused": "3"
			, "SearchNumbers": "3"
			, "SearchAlertFound": "1000"
			, "SearchWhiteChars": " "   
			, "Filtering": "0"   
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
	   "Cols" : [{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "VENDOR", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ITEM_SIZE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_AVAILABLE_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MIR_INSPECTION", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "COMMENTS", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
				 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_TYPE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "GROSS", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "NET", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "RT", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "L_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "W_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "H_CM", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 //{	"Name"	: "VOLUME", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
				 ],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",
					"TYPE"	: "Type", "TYPERowSpan" : "2",
					"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
					"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
					"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
					"VENDOR"	: "Vendor", "VENDORRowSpan" : "2",
					"ITEM_SIZE"	: "Size", "ITEM_SIZERowSpan" : "2",
					"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
					"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
					"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
					"MIR_INSPECTION": "MIR Inspection", "MIR_INSPECTIONRowSpan" : "2",
					"TYPE" : "Type", "TYPERowSpan" : "2",
					"CATEGORY" : "Category", "CATEGORYRowSpan" : "2",
					"SUB_CATEGORY" : "Sub-Category", "SUB_CATEGORYRowSpan" : "2",
					"COMMENTS" : "Note", "COMMENTSRowSpan" : "2",
					"ATT"	: "Photo", "ATTRowSpan" : "2",
					"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2",
					"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
					//"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
					//"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
					//"RT"	: "RT", "RTRowSpan" : "2",
					//"L_CM"	: "Measurement", "L_CMSpan" : "4",
					//"W_CM"	: "Measurement",
					//"H_CM"	: "Measurement",
					//"VOLUME"	: "Measurement",
					"IN_QTY"	: "IN\nQ’ty", "IN_QTYRowSpan" : "2",
					"REQ_AVAILABLE_QTY"	: "Req Available\nQ’ty", "REQ_AVAILABLE_QTYRowSpan" : "2",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2"
					},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.",
					"TYPE"	: "Type",
					"CATEGORY"	: "Category",
					"PACKAGE_NO"	: "Package No.",
					"DESCRIPTION"	: "Description of Goods\nSpecification",
					"VENDOR"	: "Vendor",
					"ITEM_SIZE"	: "Size",
					"DRAWING_NO"	: "Drawing No.",
					"TAG_NO"	: "Item Tag No.",
					"MATERIAL"	: "Material",
					"MIR_INSPECTION": "MIR Inspection",
					"TYPE" : "Type",
					"CATEGORY" : "Category",
					"SUB_CATEGORY" : "Sub-Category",
					"COMMENTS" : "Note",
					"ATT"	: "Photo",
					"MATERIAL_CODE"	: "Material\nCode",
					"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
					//"GROSS"	: "Gross\n(kg)", "GROSSRowSpan" : "2",
					//"NET"	: "Net-Weight\n(Kg)", "NETRowSpan" : "2",
					//"RT"	: "RT",
					//"L_CM"	: "L(cm)",
					//"W_CM"	: "W(cm)",
					//"H_CM"	: "H(cm)",
					//"VOLUME"	: "CBM(m3)",
					"IN_QTY"	: "IN\nQ’ty",
					"REQ_AVAILABLE_QTY"	: "Req Available\nQ’ty",
					"REMARKS"	: "Remarks"
					}]
		, "Solid" : [ 
						{ 
							"Kind":"Search", 
							"Cells": "Expression,Select,Mark,Find,Clear", 
							"ActionsRange": "1", 
							"Actions": "Filter;Mark;Find"
						}
					]
	};

	dlgDesmRsiPlDtlGrid = TreeGrid( {Layout:{Data : dlgDesmRsiPlDtlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmRsiPlDtlGrid" );
	TGSetEvent("OnRenderFinish","dlgDesmRsiPlDtlGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
	});
	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmRsiPlDtlProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmRsiPlDtlProjectName').val(list[0]["NAME"]);
			initDesmRsiPlDtlVoyageCombo();
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

function initDesmRsiPlDtlVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtDlgDesmRsiPlDtlProjectCode").val(), "IS_CONFIRM_MATERIAL" : "Y" },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selDlgDesmRsiPlDtlAttribute10 option").remove();
			$("#selDlgDesmRsiPlDtlAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selDlgDesmRsiPlDtlAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function closeDesmRsiPlDtlPopUp() {
	dlgDesmRsiPlDtlGrid.Dispose();
}

function iconDlgDesmRsiPlDtlProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmRsiPlDtlProjectCode').val(), TYPE : "A"};

	$('#dlgDesmRsiPlDtlPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmRsiPlDtlProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmRsiPlDtlProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmRsiPlDtlSearchClick() {

	if($('#txtDlgDesmRsiPlDtlProjectCode').val().length < 2 || $('#txtDlgDesmRsiPlDtlProjectName').val() == ""){
		$('#txtDlgDesmRsiPlDtlProjectCode').val("");
		$('#txtDlgDesmRsiPlDtlProjectName').val("");
		$("#txtDlgDesmRsiPlDtlProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblDlgDesmRsiPlDtlSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	if($('#txtDlgDesmRsiPlDtlPackageListNo').val() == "" && $('#txtDlgDesmRsiPlDtlPackageNo').val() == "" && $('#txtDlgDesmRsiPlDtlDescription').val() == "" &&
       $('#txtDlgDesmRsiPlDtlDrawingNo').val() == "" && $('#txtDlgDesmRsiPlDtlTagNo').val() == "" && $('#selDlgDesmRsiPlDtlAttribute10').val() == "" &&
       $('#txtDlgDesmRsiPlDtlMaterialCode').val() == "" && $('#txtDlgDesmRsiPlDtlRemarks').val() == "" && $('#txtDlgDesmRsiPlDtlSize').val() == "" &&
		$('#selDlgDesmRsiPlDtlType').val() == "" && $('#txtDlgDesmRsiPlDtlCategory').val() == "" && $('#txtDlgDesmRsiPlDtlSubCategory').val() == "" && $('#txtDlgDesmRsiPlDtlNote').val() == "" ) {
		alert_modal("", $('#alertSearchTwo').val());
		return;
    }

	var paramData = {PROJECT_NO : $('#txtDlgDesmRsiPlDtlProjectCode').val(),
					 PACKAGE_LIST_NO : $('#txtDlgDesmRsiPlDtlPackageListNo').val(),
					 PACKAGE_NO : $('#txtDlgDesmRsiPlDtlPackageNo').val(),
					 DESCRIPTION : $('#txtDlgDesmRsiPlDtlDescription').val(),
					 DRAWING_NO : $('#txtDlgDesmRsiPlDtlDrawingNo').val(),
					 TAG_NO : $('#txtDlgDesmRsiPlDtlTagNo').val(),
					 ATTRIBUTE10 : $('#selDlgDesmRsiPlDtlAttribute10').val(),
					 MATERIAL_CODE : $('#txtDlgDesmRsiPlDtlMaterialCode').val(),
					 SIZE : $('#txtDlgDesmRsiPlDtlSize').val(),
					 REMARKS : $('#txtDlgDesmRsiPlDtlRemarks').val(),
					 TYPE : $('#selDlgDesmRsiPlDtlType').val(),
					 CATEGORY : $('#txtDlgDesmRsiPlDtlCategory').val(),
					 SUB_CATEGORY : $('#txtDlgDesmRsiPlDtlSubCategory').val(),
					 COMMENTS : $('#txtDlgDesmRsiPlDtlNote').val(),
					 VENDOR: $('#txtDlgDesmRsiPlDtlVendor').val(),
	};

	$.ajax({
		url: "/getDesmRsiPlDetailList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			dlgDesmRsiPlDtlGrid.Source.Data.Data.Body = [data.results];
			dlgDesmRsiPlDtlGrid.Reload();


        }
    });
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

function btnDlgDesmRsiPlDtlReseteClick() {
	//$('#txtDlgDesmRsiPlDtlProjectCode').val("");
	//$('#txtDlgDesmRsiPlDtlProjectName').val("");
	$('#txtDlgDesmRsiPlDtlPackageListNo').val("");
	$('#txtDlgDesmRsiPlDtlPackageNo').val("");
	$('#txtDlgDesmRsiPlDtlDescription').val("");
	$('#txtDlgDesmRsiPlDtlDrawingNo').val("");
	$('#txtDlgDesmRsiPlDtlTagNo').val("");
	$('#txtDlgDesmRsiPlDtlMaterialCode').val("");
	$('#txtDlgDesmRsiPlDtlSize').val("");
	$('#selDlgDesmRsiPlDtlAttribute10').val("");
	$('#txtDlgDesmRsiPlDtlRemarks').val("");

	$('#selDlgDesmRsiPlDtlType').val("");
	$('#txtDlgDesmRsiPlDtlCategory').val("");
	$('#txtDlgDesmRsiPlDtlSubCategory').val("");
	$('#txtDlgDesmRsiPlDtlNote').val("");
	$('#txtDlgDesmRsiPlDtlVendor').val("");

}

function btnDlgDesmRsiPlDtlCompletionClick() {
	var selectList = dlgDesmRsiPlDtlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	if(v_desm_rsi_pl_dtl_callback)
	{
		v_desm_rsi_pl_dtl_callback("select-item", selectList);
		$('#dlgDesmRsiPlDtl').modal('hide');
	}
}
function openAttModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.ATTH_CNT > 0){
		var param = Object.assign({}, row);
			param.ATTACH_GRP_CD = param.FILE_GRP_CD;
			param.fileUse = false;
			param.hideThumbnailContent = false;
			param.width = "1000px";

		$('#dlgDesmRsiPlDtlPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

			if(status == "success"){

				initTransAttListPopUp(param, function (key, returnParam) {
					if(key == "save-item"){

					}
				});
			}
		});
	}
}