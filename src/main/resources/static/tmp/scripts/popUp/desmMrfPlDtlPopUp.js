var dlgDesmMrfPlDtlGrid;

var v_desm_mrf_pl_dtl_callback = null;
var v_desm_mrf_pl_dtl_param;



function initDesmMrfPlDtlPopUp(param , callback) {
	v_desm_mrf_pl_dtl_callback = callback;
    v_desm_mrf_pl_dtl_param = param;

	$('#dlgDesmMrfPlDtl').on('shown.bs.modal', function () {
		$('#dlgDesmMrfPlDtl').click();
	});

	$('#dlgDesmMrfPlDtl').on('hidden.bs.modal', function () {
	  	closeDesmMrfPlDtlPopUp();
	});


    initDesmMrfPlDtlPopUpCode();
}

function initDesmMrfPlDtlPopUpCode() {
	initTypeCode(initDesmMrfPlDtlPopUpControls,"selDlgDesmMrfPlDtlType");
}


function initDesmMrfPlDtlPopUpControls() {

	$('#dlgDesmMrfPlDtl').modal('show');

	$('#btnDlgDesmMrfPlDtlSearch').click(function () { btnDlgDesmMrfPlDtlSearchClick(); return false; });
	$('#btnDlgDesmMrfPlDtlResete').click(function () { btnDlgDesmMrfPlDtlReseteClick(); return false; });
	$('#btnDlgDesmMrfPlDtlCompletion').click(function () { btnDlgDesmMrfPlDtlCompletionClick(); return false; });



	$("#txtDlgDesmMrfPlDtlProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});


	$("#txtDlgDesmMrfPlDtlRsiName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});


	$("#txtDlgDesmMrfPlDtlRsiNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrfPlDtlDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrfPlDtlPackingListNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMrfPlDtlTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});


	$("#txtDlgDesmMrfPlDtlMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMrfPlDtlSearch').click();
		}
	});

	TGSetEvent("OnCopy","dlgDesmMrfPlDtlGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmMrfPlDtlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMrfPlDtlGrid"
			, "CfgId"			: "dlgDesmMrfPlDtlGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
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
	   "Cols" : [{	"Name"	: "RSI_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "RSI_NAME", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "SUBCONTRACTOR", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "APPROVED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "ITEM_SIZE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "IN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "RETURN_TYPE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "HANDOVER_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MRF_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "RETURN_AVAILABLE_QTY", "Width": "130", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "COMMENTS", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
				 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"RSI_NO"	: "RSI No.", "RSI_NORowSpan" : "2",
					"RSI_NAME"	: "RSI Name", "RSI_NAMERowSpan" : "2",
					"SUBCONTRACTOR"	: "Subcontractor", "SUBCONTRACTORRowSpan" : "2",
					"APPROVED_DATE"	: "RSI\nApproved Date", "APPROVED_DATERowSpan" : "2",
					"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
					"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
					"ITEM_SIZE"	: "Size", "ITEM_SIZERowSpan" : "2",
					"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
					"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
					"IN_QTY"	: "IN\nQ’ty", "IN_QTYRowSpan" : "2",
					"REQ_QTY"	: "RSI\nQ’ty", "REQ_QTYRowSpan" : "2",
					"RETURN_TYPE"	: "Return Type", "RETURN_TYPERowSpan" : "2",
					"HANDOVER_QTY"	: "Handover\nQ’ty", "HANDOVER_QTYRowSpan" : "2",
					"MRF_QTY"	: "MRF\nQ’ty", "MRF_QTYRowSpan" : "2",
					"RETURN_AVAILABLE_QTY"	: "Return Available\nQ’ty", "RETURN_AVAILABLE_QTYRowSpan" : "2",
					"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
					"TYPE" : "Type", "TYPERowSpan" : "2",
					"CATEGORY" : "Category", "CATEGORYRowSpan" : "2",
					"SUB_CATEGORY" : "Sub-Category", "SUB_CATEGORYRowSpan" : "2",
					"COMMENTS" : "Note", "COMMENTSRowSpan" : "2",
					"ATT"	: "Photo", "ATTRowSpan" : "2",
					"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"RSI_NO"	: "RSI No.",
					"RSI_NAME"	: "RSI Name",
					"SUBCONTRACTOR"	: "Subcontractor",
					"APPROVED_DATE"	: "RSI\nApproved Date",
					"PACKAGE_NO"	: "Package No.",
					"DESCRIPTION"	: "Description of Goods\nSpecification",
					"ITEM_SIZE"	: "Size",
					"DRAWING_NO"	: "Drawing No.",
					"TAG_NO"	: "Item Tag No.",
					"IN_QTY"	: "IN\nQ’ty",
					"REQ_QTY"	: "RSI\nQ’ty",
					"RETURN_TYPE"	: "Return Type",
					"HANDOVER_QTY"	: "Handover\nQ’ty",
					"MRF_QTY"	: "MRF\nQ’ty",
					"RETURN_AVAILABLE_QTY"	: "Return Available\nQ’ty",
					"MATERIAL"	: "Material",
					"TYPE" : "Type",
					"CATEGORY" : "Category",
					"SUB_CATEGORY" : "Sub-Category",
					"COMMENTS" : "Note",
					"ATT"	: "Photo",
					"MATERIAL_CODE"	: "Material\nCode"}]
	};

	dlgDesmMrfPlDtlGrid = TreeGrid( {Layout:{Data : dlgDesmMrfPlDtlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMrfPlDtlGrid" );
	TGSetEvent("OnRenderFinish","dlgDesmMrfPlDtlGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
	});

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmMrfPlDtlProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmMrfPlDtlProjectName').val(list[0]["NAME"]);
			initDesmMrfPlDtlVoyageCombo();
		}
	});
	
	if($('#txtSubconYn').val() == "Y") {
		$("#txtSubconstractorDetail").val($("#txtDeptName").val());
		$("#txtSubconstractorDetail").attr("readonly",true);
	}
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
function initDesmMrfPlDtlVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtDlgDesmMrfPlDtlProjectCode").val(), "IS_CONFIRM_MATERIAL" : "Y" },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selDlgDesmMrfPlDtlAttribute10 option").remove();
			$("#selDlgDesmMrfPlDtlAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selDlgDesmMrfPlDtlAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function closeDesmMrfPlDtlPopUp() {
	dlgDesmMrfPlDtlGrid.Dispose();
}

function iconDlgDesmMrfPlDtlProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmMrfPlDtlProjectCode').val(), TYPE : "A"};

	$('#dlgDesmMrfPlDtlPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmMrfPlDtlProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmMrfPlDtlProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmMrfPlDtlSearchClick() {

	if($('#txtDlgDesmMrfPlDtlProjectCode').val().length < 2 || $('#txtDlgDesmMrfPlDtlProjectName').val() == ""){
		$('#txtDlgDesmMrfPlDtlProjectCode').val("");
		$('#txtDlgDesmMrfPlDtlProjectName').val("");
		$("#txtDlgDesmMrfPlDtlProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblDlgDesmMrfPlDtlSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	if($('#txtDlgDesmMrfPlDtlRsiName').val() == "" && $('#txtDlgDesmMrfPlDtlRsiNo').val() == "" && $('#txtDlgDesmMrfPlDtlDescription').val() == "" &&
       $('#txtDlgDesmMrfPlDtlPackingListNo').val() == "" && $('#txtDlgDesmMrfPlDtlTagNo').val() == "" && $('#selDlgDesmMrfPlDtlAttribute10').val() == "" &&
       $('#txtDlgDesmMrfPlDtlMaterialCode').val() == "" && $('#txtDlgDesmMrfPlDtlSize').val() == "" &&
		$('#selDlgDesmMrfPlDtlType').val() == "" && $('#txtDlgDesmMrfPlDtlCategory').val() == ""&& $('#txtDlgDesmMrfPlDtlSubCategory').val() == "" && $('#txtDlgDesmMrfPlDtlNote').val() == "" ) {
		alert_modal("", $('#alertSearchTwo').val());
		return;
    }

	var paramData = {PROJECT_NO : $('#txtDlgDesmMrfPlDtlProjectCode').val(),
					 RSI_NAME : $('#txtDlgDesmMrfPlDtlRsiName').val(),
					 RSI_NO : $('#txtDlgDesmMrfPlDtlRsiNo').val(),
					 DESCRIPTION : $('#txtDlgDesmMrfPlDtlDescription').val(),
					 PACKAGE_LIST_NO : $('#txtDlgDesmMrfPlDtlPackingListNo').val(),
					 TAG_NO : $('#txtDlgDesmMrfPlDtlTagNo').val(),
					 ATTRIBUTE10 : $('#selDlgDesmMrfPlDtlAttribute10').val(),
					 MATERIAL_CODE : $('#txtDlgDesmMrfPlDtlMaterialCode').val(),
					 SIZE : $('#txtDlgDesmMrfPlDtlSize').val(),
					 TYPE : $('#selDlgDesmMrfPlDtlType').val(),
					 CATEGORY : $('#txtDlgDesmMrfPlDtlCategory').val(),
					 SUB_CATEGORY : $('#txtDlgDesmMrfPlDtlSubCategory').val(),
					 COMMENTS : $('#txtDlgDesmMrfPlDtlNote').val(),
					 SUBCONTRACTOR : $('#txtSubconstractorDetail').val(),
					 };

	$.ajax({
		url: "/getDesmMrfPlDetailList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			dlgDesmMrfPlDtlGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMrfPlDtlGrid.Reload();
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

function btnDlgDesmMrfPlDtlReseteClick() {
	$('#txtDlgDesmMrfPlDtlRsiName').val("");
	$('#txtDlgDesmMrfPlDtlRsiNo').val("");
	$('#txtDlgDesmMrfPlDtlDescription').val("");
	$('#txtDlgDesmMrfPlDtlPackingListNo').val("");
	$('#txtDlgDesmMrfPlDtlTagNo').val("");
	$('#txtDlgDesmMrfPlDtlMaterialCode').val("");
	$('#txtDlgDesmMrfPlDtlSize').val("");
	$('#selDlgDesmMrfPlDtlAttribute10').val("");

	$('#selDlgDesmMrfPlDtlType').val("");
	$('#txtDlgDesmMrfPlDtlCategory').val("");
	$('#txtDlgDesmMrfPlDtlSubCategory').val("");
	$('#txtDlgDesmMrfPlDtlNote').val("");
}

function btnDlgDesmMrfPlDtlCompletionClick() {
	var selectList = dlgDesmMrfPlDtlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	if(v_desm_mrf_pl_dtl_callback)
	{
		v_desm_mrf_pl_dtl_callback("select-item", selectList);
		$('#dlgDesmMrfPlDtl').modal('hide');
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

		$('#DlgDesmMrfPlDtlPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

			if(status == "success"){

				initTransAttListPopUp(param, function (key, returnParam) {
					if(key == "save-item"){

					}
				});
			}
		});
	}
}