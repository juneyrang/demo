var mainGrid;
var dlgProjectGrid;

var view_type = "SETUP";
var gridCode = getGridCode();

var gridLang = {};
var fileLang = "en";
var gridReload = false;

if($('#txtDesmLang').val() == "ko"){
	fileLang = "kr";
	gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
}

// MainGrid Setup
var mainGridCol = {
	"Cfg": {
		"id"				: "materialGrid"
		, "CfgId"			: "materialGridCfg"
		, "SuppressCfg"		: "0"
		, "StyleLap"		: "0"
		, "Version"			: "15"
		, "CacheTimeout" : "100"
		, "CacheTimeout" : "100"
		, "Style"			: "Material"
		, "Size"			: "Small"
		, "Scale"			: "90%"
		, "ConstWidth"		: "100%"
		, "MinTagHeight"	: "730"
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
		, "MainCol"			: "TRK_ITEM_NAME"
		, "SafeCSS"			: "1"
		, "Sorting"			: "1"
		, "Code" : gridCode
		,"CopyCols" : "0"
	},
	"Toolbar" : {
		"Cells20Data"		: "Export"
		, "Cells60Cfg"		: "Columns"
		, "Cells70Styles"	: "Styles,Sizes,Scales"
		, "Visible"			: "1"
	},
	"Panel" : {
		"Visible"	: "0",
		"Spanned"	: "1"
	},
	/*"LeftCols": [
		 {
			"Name"			: "TRK_ITEM_NAME"
			, "Type"		: "Text"
			, "Width"		: "300"
			, "Spanned"		: "1"
			//, "OnClickCell"	: "openModal(Grid,Row,Col);"
			//, "Class"		: "gridLinkText"
			, "CanEdit"		: "1"
		}
	],*/
	"Def" : [
	     {
	    	 "Name": "Tree",
	    	 "Calculated": "1",
	    	 "CalcOrder": "NET"   ,
	    	 "NETFormula": "sumjoin('TRK_ITEM_NAME')",
	    	 "NETFormat": "0"
	    }
	],
	"Cols" : [
		  {	"Name": "LV1_NAME"			, "Width": "200", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanEdit": "0" }
		, {	"Name": "LV2_NAME"			, "Width": "200", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanEdit": "0" }
		, {	"Name": "LV3_NAME"			, "Width": "200", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanEdit": "0" }
		, {	"Name": "LV4_NAME"			, "Width": "200", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanEdit": "0" }
		, {	"Name": "ATTRIBUTE3"			, "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanEdit": "0" }	/* Vendor				*/
		, { "Name": "ATTRIBUTE10"			, "Width": "90"	, "Type": "Float", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText"	, "CanMove" : "0", "CanEdit": "0", "CanEmpty" : "1" }	/* 항차No					*/
		, { "Name": "SEL_INVOICE_NUM"		, "Width": "150", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }	/* Invoice No			*/
		, { "Name": "PACKAGE_LIST_NO"		, "Width": "150", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }

		, { "Name": "FOB_PLAN_DATE"		, "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }	/* Cargo Date			*/
		, { "Name": "FOB_EXPECTED_DATE"		, "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }	/* Cargo Date			*/
		, { "Name": "FOB_ACTUAL_DATE"		, "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }	/* Cargo Date			*/

		, { "Name": "ONSITE_PLAN_DATE"		, "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }	/* Invoice No			*/
		, { "Name": "ONSITE_EXPECTED_DATE"	, "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }	/* Invoice No			*/
		, { "Name": "ONSITE_ACTUAL_DATE"	, "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }	/* Invoice No			*/
		, { "Name": "PACKAGE_NO", "Width": "200", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "DESCRIPTION", "Width": "200", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "DRAWING_NO", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "TAG_NO", "Width": "140", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "MATERIAL", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "PACKAGE_TYPE", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "GROSS", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "NET", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "RT", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "VOLUME", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "L_CM", "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "W_CM", "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "H_CM", "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "NOS", "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "UNIT", "Width": "90", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" }
		, { "Name": "REMARKS", "Width": "120", "Type": "Text", "Spanned":"1", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
	],
	"Head" : [
		{
			"Kind"					: "Header"
			, "Class"				: "gridCenterText"
			, "id"					: "Header"
			, "Spanned"				: "1"
			, "PanelRowSpan"		: "2"
			, "LV1_NAME"		: "Item"	, "LV1_NAMESpan"		: "4"
			, "LV2_NAME"		: "Item"
			, "LV3_NAME"		: "Item"
			, "LV4_NAME"		: "Item"
			, "ATTRIBUTE3"			: "Vendor"				, "ATTRIBUTE3RowSpan"		: "2"
			, "ATTRIBUTE10"			: $('#gridColShippingOrder').val()				, "ATTRIBUTE10RowSpan"		: "2"
			, "SEL_INVOICE_NUM"		: "Invoice No."			, "SEL_INVOICE_NUMRowSpan"	: "2"
			, "PACKAGE_LIST_NO"		: "Packing list No."			, "PACKAGE_LIST_NORowSpan"	: "2"

			, "FOB_PLAN_DATE"		: $('#gridColFob').val()	, "FOB_PLAN_DATESpan"		: "3"
			, "FOB_EXPECTED_DATE"	: $('#gridColFob').val()
			, "FOB_ACTUAL_DATE"		: $('#gridColFob').val()

			, "ONSITE_PLAN_DATE"		: "On Site"	, "ONSITE_PLAN_DATESpan"		: "3"
			, "ONSITE_EXPECTED_DATE"	: "On Site"
			, "ONSITE_ACTUAL_DATE"		: "On Site"
			, "PACKAGE_NO"		: "Pacakge No."			, "PACKAGE_NORowSpan"	: "2"
			, "DESCRIPTION"		: "Description"			, "DESCRIPTIONRowSpan"	: "2"
			, "DRAWING_NO"		: "Drawing No"			, "DRAWING_NORowSpan"	: "2"
			, "TAG_NO"		: "Item(Tag) No."			, "TAG_NORowSpan"	: "2"
			, "MATERIAL"		: "Material"			, "MATERIALRowSpan"	: "2"
			, "PACKAGE_TYPE"		: "Package\nType"			, "PACKAGE_TYPERowSpan"	: "2"
			, "GROSS"		: "Gross\n(kg)"			, "GROSSRowSpan"	: "2"
			, "NET"		: "Net\n(kg)"			, "NETRowSpan"	: "2"
			, "RT"		: "RT"			, "RTRowSpan"	: "2"
			, "VOLUME"		: "Volume\n㎥"			, "VOLUMERowSpan"	: "2"
			, "L_CM"		: "Shipping Dimension"	, "L_CMSpan"		: "3"
			, "W_CM"		: "Shipping Dimension"
			, "H_CM"		: "Shipping Dimension"
			, "NOS"			: "Q'ty"				, "NOSSpan"		: "2"
			, "UNIT"		: "Q'ty"
			, "REMARKS"		: "Remarks"				, "REMARKSRowSpan"		: "2"
		}
		, {
			"Kind"					: "Header"
			, "Class"				: "gridCenterText"
			, "Spanned"				: "1"
			, "LV1_NAME"		: "L1"
			, "LV2_NAME"		: "L2"
			, "LV3_NAME"		: "L3"
			, "LV4_NAME"		: "L4"
			, "ATTRIBUTE3"			: "Vendor"
			, "ATTRIBUTE10"			: $('#gridColShippingOrder').val()
			, "SEL_INVOICE_NUM"		: "Invoice No"
			, "PACKAGE_LIST_NO"		: "Packing list No."

			, "FOB_PLAN_DATE"		: "Plan"
			, "FOB_EXPECTED_DATE"		: "Expected"
			, "FOB_ACTUAL_DATE"		: "Actual"

			, "ONSITE_PLAN_DATE"		: "Plan(L3)"
			, "ONSITE_EXPECTED_DATE"	: "Expected"
			, "ONSITE_ACTUAL_DATE"		: "Actual"
			, "PACKAGE_NO"		: "Pacakge No."
			, "DESCRIPTION"		: "Description"
			, "DRAWING_NO"		: "Drawing No."
			, "TAG_NO"		: "Item(Tag) No."
			, "MATERIAL"		: "Material"
			, "PACKAGE_TYPE"		: "Package Type"
			, "GROSS"		: "Gross kg"
			, "NET"		: "Net kg"
			, "RT"		: "RT"
			, "VOLUME"		: "Volume"
			, "L_CM"		: "L (cm)"
			, "W_CM"		: "W (cm)"
			, "H_CM"		: "H (cm)"
			, "NOS"		: "Nos"
			, "UNIT"		: "Unit"
			, "REMARKS"		: "Remarks"

		}
	]

	/*"Foot" : [
	     { "Def": "Tree"   }
	],*/
};

//Project 조회 팝업 그리드
dlgProjectGridCol = {
	"Cfg" : {
		"id"				: "idsmDlgProjectGrid"
		, "CfgId"			: "idsmDlgProjectGridCfg"
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
		{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Code
		, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Description
	]
	, "Header" : {
		"SEGMENT1"	: "Project Code"
		, "Class"	: "gridCenterText"
		, "NAME"	: "Project Description"
	}
};

$(window).resize(function() {
	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - 50);
});

$(document).ready(function () {




	mainGrid = TreeGrid( {Layout:{Data : mainGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridMain" );
	dlgProjectGrid = TreeGrid( {Layout:{Data : dlgProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgProject" );

	TGSetEvent("OnRenderFinish","materialGrid",function(grid){
		gridReload = true;
	});

	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height()- 50);

	makeAutocomplete(
		"p_project_code", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"p_project_name",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#p_project_code").val(ui.item.value.split("|")[1]);
			$("#p_project_name").val(ui.item.value.split("|")[2]);
			initVoyageCombo();
			return false;
		}
	);

	$('#btnSearch').click(function () {
		if(gridReload) {
			btnSearchClick();
		}
	 	return false;
	});

	$('#btnReset').click(function () {
		btnResetClick();
	 	return false;
	});

	$('#btnDlgProjectSelect').click(function () {
		btnDlgProjectSelectClick();
		return false;
	});

	$("#txtDlgProjectProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#iconDlgProjectListSearch').click();
		}
	});

	// Project 조회 팝업에 조회 아이콘 클릭
	$('#iconDlgProjectListSearch').click(function () {
		dlgProjectListSearch();
		return false;
	});

	//initVoyageCombo();

	initMenuAuth(function (list) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	});

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#p_project_code').val(list[0]["SEGMENT1"]);
			$('#p_project_name').val(list[0]["NAME"]);
			initVoyageCombo();
		}
	});
});

/*function mainGridSearchReload(grid) {

	var length = grid.RowCount;

	var row = grid.Rows;
	var cnt = 1;
	var addCnt = 0;

	var temp = "";

	var netCnt = 0;

	for (var key in row) {

		var gridRow = row[key];

		if( gridRow.Fixed == null )
		{
			var org = gridRow.TRK_ITEM_NAME;

			if (org != temp ) {

				if(cnt == 3) {
					netCnt += gridRow.NET;
				}
				else
				{
					//alert(org + " <> " + temp);
					alert("여기서 넣어줘야 된다.");

					var copyRow = Object.assign({}, gridRow);
					copyRow.TRK_ITEM_NAME = "";
					copyRow.ATTRIBUTE3 = "";
					copyRow.ATTRIBUTE10 = "";
					copyRow.SEL_INVOICE_NUM = "";
					copyRow.PACKAGE_NO = "";
					copyRow.DESCRIPTION = "";
					copyRow.DRAWING_NO = "";
					copyRow.TAG_NO = "";
					copyRow.MATERIAL = "";
					copyRow.PACKAGE_TYPE = "";
					copyRow.GROSS = "";
					copyRow.RT = "";
					copyRow.VOLUME = "";

					copyRow.NET = netCnt; // 합계

					mainGrid.CopyRow(copyRow, gridRow, gridRow);

					temp = org;
					netCnt = 0;
					addCnt += 1;
				}

				temp = org;
			} else {
				netCnt += gridRow.NET;
			}

			var row1 = mainGrid.AddRow(null,null,1,null,null);
			row1.NET = netCnt;

			mainGrid.RefreshRow(row1);

			if ( cnt == (length + 2) )
			{
				//alert(org + " <> " + temp);
				alert("마지막.");

				var copyRow = Object.assign({}, gridRow);
				copyRow.TRK_ITEM_NAME = "";
				copyRow.ATTRIBUTE3 = "";
				copyRow.ATTRIBUTE10 = "";
				copyRow.SEL_INVOICE_NUM = "";
				copyRow.PACKAGE_NO = "";
				copyRow.DESCRIPTION = "";
				copyRow.DRAWING_NO = "";
				copyRow.TAG_NO = "";
				copyRow.MATERIAL = "";
				copyRow.PACKAGE_TYPE = "";
				copyRow.GROSS = "";
				copyRow.RT = "";
				copyRow.VOLUME = "";

				copyRow.NET = netCnt; // 합계

				mainGrid.AddRow(copyRow, gridRow, 0);

				temp = org;
				netCnt = 0;
			}

		}

		cnt += 1;


	}

	grid.RefreshRow(gridRow);
}*/



function dlgProjectListSearch() {

	$.ajax({
		url: "/getIdsmSetupDlgProject.do",
		data: {"keyword" : $('#txtDlgProjectProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgProjectGrid.Source.Data.Data.Body = [data.results];
			dlgProjectGrid.ReloadBody();

        }
    });

}

function btnDlgProjectSelectClick() {
	var selectList = dlgProjectGrid.GetSelRows();

	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}

	var row = selectList[0];
    $("#p_project_code").val(row.SEGMENT1);
	$("#p_project_name").val(row.NAME);
	$('#dlgProjectList').modal('hide');

	initVoyageCombo();
}

// Project 조회 팝업 그리드 더블 클릭 시 오프너로 값 넘겨 주기
function gridProjectListDbClick( grid, row, col ) {
    $("#p_project_code").val( row.SEGMENT1	);
	$("#p_project_name").val( row.NAME		);

	$('#dlgProjectList').modal('hide');

	initVoyageCombo();
}

function btnSearchClick() {
	if($('#p_item_name').val() == ""
		   && $('#p_attribute10').val() == ""
		   && $('#p_packing_list_no').val() == ""
		   && $('#p_package_no').val() == ""
		   && $('#p_desc').val() == ""
		   && $('#p_vendor').val() == ""
		   && $('#p_drawing_no').val() == ""
		   && $('#p_tag_no').val() == ""
		   ){
		alert_modal("","Please choose at least one more search option.");
		return;
	}
	

	if($('#p_project_code').val().length < 2 || $('#p_project_name').val() == ""){
		$('#p_project_code').val("");
		$('#p_project_name').val("");
		$("#p_project_code").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblSearchBox");

	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}

	var issue_check = "N";
	if($('#ckIssueCheck').is(":checked")){
		issue_check = "Y";
	}

	$.ajax({
		url: "/getPackingList.do",
		data: fn_getFormData('#application_form'),
		dataType:"json",
		type:'POST',
		success: function (data, textStatus, jqXHR) {
			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.ReloadBody();

			chkL1 = true;
			chkL2 = true;
			chkL3 = true;

        }
    });

}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#p_project_code").val() },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#p_attribute10 option").remove();
			$("#p_attribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#p_attribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
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

//폼데이터를 Json Arry로 직렬화
function fn_getFormData(form) {
    var unindexed_array = $(form).serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
};

function btnResetClick(){
	$('#p_item_name').val("");
	$('#p_attribute10').val("");
	$('#p_packing_list_no').val("");
	$('#p_package_no').val("");
	$('#p_desc').val("");
	$('#p_drawing_no').val("");
	$('#p_vendor').val("");
	$('#p_tag_no').val("");
}

