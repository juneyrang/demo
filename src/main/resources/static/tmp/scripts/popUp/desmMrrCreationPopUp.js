var v_desm_mrr_creation_callback = null;
var v_desm_mrr_creation_param;
var dlgPlGrid;

var isNewDesmMrrCreationPopUp = false;

function initDesmMrrCreationPopUp(param , callback) {
	v_desm_mrr_creation_callback = callback;
    v_desm_mrr_creation_param = param;

	$('#dlgDesmMrrCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMrrCreation').click();
	});

	$('#dlgDesmMrrCreation').on('hidden.bs.modal', function () {
	  	closeDesmMrrCreationPopUp();
	});
	
	if(v_desm_mrr_creation_param.MRR_HEADER_ID == null || v_desm_mrr_creation_param.MRR_HEADER_ID == "") {
		isNewDesmMrrCreationPopUp = true;
	}


    initDesmMrrCreationPopUpCode();
}

function initDesmMrrCreationPopUpCode() {

	$.ajax({
		url: "/getDesmRsiUserSubconList.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			if(results.length > 0) {
				if(isNewDesmMrrCreationPopUp) {
					$("#txtDlgDesmMrrCreationPreparedBy").val(results[0]["USER_AD"]);
					$("#txtDlgDesmMrrCreationPreparedByAd").val(results[0]["USER_AD"]);
					$("#txtDlgDesmMrrCreationSubContractor").val(results[0]["DEPT_NAME"]);
				}

			}
        }
    });

    initTypeCode(initDesmMrrCreationPopUpControls);
	//initDesmMrrCreationPopUpControls();
}


function gridReloadFn(grid) {
	var list = grid.Rows;

	for (var key in list) {
		var gridRow = list[key];

		if(gridRow.Fixed == null){

			/*if(gridRow.IS_CONFIRM_MATERIAL != null && gridRow.IS_CONFIRM_MATERIAL == "Y"){
				gridRow.DESCRIPTIONCanEdit = 1;
				gridRow.DRAWING_NOCanEdit = 1;
				gridRow.TAG_NOCanEdit = 1;
				gridRow.UNITCanEdit = 1;
				gridRow.IN_QTYCanEdit = 1;
				gridRow.MATERIALCanEdit = 1;
				gridRow.REMARKSCanEdit = 1;

				gridRow.REPORT_SHORT_QTYCanEdit = 1;
				gridRow.REPORT_OVER_QTYCanEdit = 1;
				gridRow.REPORT_DMG_QTYCanEdit = 1;
				gridRow.REPORT_MISSING_QTYCanEdit = 1;

			}
			else{
				gridRow.DESCRIPTIONCanEdit = 0;
				gridRow.DRAWING_NOCanEdit = 0;
				gridRow.TAG_NOCanEdit = 0;
				gridRow.UNITCanEdit = 0;
				gridRow.IN_QTYCanEdit = 0;
				gridRow.MATERIALCanEdit = 0;
				gridRow.REMARKSCanEdit = 0;

				gridRow.REPORT_SHORT_QTYCanEdit = 0;
				gridRow.REPORT_OVER_QTYCanEdit = 0;
				gridRow.REPORT_DMG_QTYCanEdit = 0;
				gridRow.REPORT_MISSING_QTYCanEdit = 0;
			}*/

			if(gridRow.ATTH_CNT != null && gridRow.ATTH_CNT != "" && gridRow.ATTH_CNT > 0){
				gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
			}
			grid.RefreshRow(gridRow);
		}



	}
}


function initDesmMrrCreationPopUpControls() {

	$('#dlgDesmMrrCreation').modal('show');

	initDatePicker();

	makeAutocomplete(
		"txtDlgDesmMrrCreationPreparedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		//"txtDlgDesmMrrCreationRPreparedByAd,txtDlgDesmMrrCreationSubContractor",		//clear필드 id
		"txtDlgDesmMrrCreationPreparedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrrCreationPreparedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrrCreationPreparedByAd").val(ui.item.value.split("|")[1]);
			//$("#txtDlgDesmMrrCreationSubContractor").val(ui.item.value.split("|")[2]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMrrCreationCheckedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrrCreationCheckedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrrCreationCheckedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrrCreationCheckedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmMrrCreationConfirmedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrrCreationConfirmedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrrCreationConfirmedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrrCreationConfirmedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	/*makeAutocomplete(
		"txtDlgDesmMrrCreationApprovedBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMrrCreationApprovedByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMrrCreationApprovedBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMrrCreationApprovedByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);*/

	$('#btnDlgDesmMrrCreationAtt').click(function () { btnDlgDesmMrrCreationAttClick(); return false; });
	$('#btnDlgDesmMrrCreationAdd').click(function () { btnDlgDesmMrrCreationAddClick(); return false; });
	$('#btnDlgDesmMrrCreationSave').click(function () { btnDlgDesmMrrCreationSaveClick(); return false; });
	$('#btnDlgDesmMrrCreationDelete').click(function () { btnDlgDesmMrrCreationDeleteClick(); return false; });
	
	
	$('#btnLocationSetup').click(function () { btnLocationSetupClick(); return false; });
	$('#btnLocationDelete').click(function () { btnLocationDeleteClick(); return false; });
	$('#btnReceivedDateSetup').click(function () { btnReceivedDateSetupClick(); return false; });
	$('#btnVisualCheckSetup').click(function () { btnVisualCheckSetupClick(); return false; });

	$('#btnDlgDesmMrrCreationDel').click(function () { btnDlgDesmMrrCreationDelClick(); return false; });


	$('#btnDlgDesmMrrCreationRejectCheck').click(function () { btnDlgDesmMrrCreationRejectClick(); return false; });
	$('#btnDlgDesmMrrCreationRejectConfirm').click(function () { btnDlgDesmMrrCreationRejectClick(); return false; });
	//$('#btnDlgDesmMrrCreationRejectApprove').click(function () { btnDlgDesmMrrCreationRejectClick(); return false; });

	$('#btnDlgDesmMrrCreationRequest').click(function () { btnDlgDesmMrrCreationRequestClick(); return false; });
	$('#btnDlgDesmMrrCreationCheck').click(function () { btnDlgDesmMrrCreationCheckClick(); return false; });
	$('#btnDlgDesmMrrCreationConfirm').click(function () { btnDlgDesmMrrCreationConfirmClick(); return false; });
	//$('#btnDlgDesmMrrCreationApprove').click(function () { btnDlgDesmMrrCreationApproveClick(); return false; });
	$('#btnDlgDesmMrrCreationReport').click(function () { btnDlgDesmMrrCreationReportClick(); return false; });




	TGSetEvent("OnRenderFinish","dlgDesmMrrCreationGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
		setDlgDesmMrrCreationBtn();
	});
	
	TGSetEvent("OnChange","dlgDesmMrrCreationGrid",function(grid){
		gridReloadFn(grid);
	});


	TGSetEvent("OnCopy","dlgDesmMrrCreationGrid",function(grid, txt){
		copyToClipboard(txt);
	});

	var gridCode = getGridCode();

		var dlgPlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMrrCreationGrid"
			, "CfgId"			: "dlgDesmMrrCreationGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "6"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "510"
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
			, "Code" : gridCode
			,"CopyCols" : "0"
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
//			,"ColsPosLap": "1"
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
//		,"ColsPosLap":"1","ColsLap": "1" // column변경사항 바로 적용 안될시
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
			 {  "Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "SEL_INVOICE_NUM", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "ATTRIBUTE10", "Width": "145", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "PACKAGE_NO", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "PACKAGE_TYPE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "QTY", "Width": "100", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "PACKAGE_TYPE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		// {	"Name"	: "RECEIVED_DATE", "Visible" :"1", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Format": "yy/MM/dd", "Button": ""},
	   		 { "Name"   : "RECEIVED_DATE", "Width": "120"	, "Type": "Date", "Spanned":"1", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1" , "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },	
			 //{	"Name"	: "VISUAL_CHECK", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 {	"Name"	: "VISUAL_CHECK", "Width" :"100", "Type": "Enum", "Enum" : "|Good|Defect", "EnumKeys" : "|Good|Defect", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
	   		 {	"Name"	: "STORAGE_LOCATION", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   		 {	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 {	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openDesmMrrCreationAttModal( Grid, Row,Col )", "IconAlign" : "Center"	, "IconSize" : "2"	},
//	   		 {	"Name"	: "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openDesmMrrCreationAttModal( Grid, Row,Col )","Icon" :"/resources/ext/fontawesome-free/svgs/solid/paperclip.svg", "IconAlign" : "Center"	, "IconSize" : "2"	},
	   		 {	"Name"	: "ATTACH_GRP_CD", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   		 //{  "Name"  : "ATT", "Width": "80"	, "Type": "Icon", "Spanned":"1"	, "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openDesmMrrCreationAttModal( Grid, Row,Col )"	, "IconSize" : "2"	}	/* Invoice No			*/
	   		 
			 ],
  "Head" : [{ 	"Kind"	: "Header",
				"id" : "Header",
				"Spanned" : "1",
				"PanelRowSpan" : "2",
				"Class" : "gridCenterText",
				"NO"	: "No.", "NORowSpan" : "2",
				"SEL_INVOICE_NUM"	: "Invoice No.", "SEL_INVOICE_NUMRowSpan" : "2",
				"ATTRIBUTE10"	: $('#gridColShippingOrder').val(), "ATTRIBUTE10RowSpan" : "2",
				"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
				"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
				"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
				"QTY"           : "QTY", "QTYRowSpan" : "2",
				"RECEIVED_DATE" : "Received Date", "RECEIVED_DATERowSpan" : "2",
				"VISUAL_CHECK"	: "Visual\nCheck", "VISUAL_CHECKRowSpan" : "2",
				"STORAGE_LOCATION"	: "Storage\nLocation", "STORAGE_LOCATIONRowSpan" : "2",
				"REMARKS"	    : "Remarks", "REMARKSRowSpan" : "2",
				"ATT" : "Pic",  "ATTRowSpan" : "2",
				"ATTACH_GRP_CD" : "ATTACH_GRP_CD",  "ATTACH_GRP_CDRowSpan" : "2"
				
				},
			   {"Kind"	: "Header",
				"Spanned" : "1",
				"Class" : "gridCenterText",
				"NO"	: "No.",
				"SEL_INVOICE_NUM"	: "Invoice No.",
				"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
				"PACKAGE_NO"	: "Package No.",
				"DESCRIPTION"	: "Description of Goods\nSpecification",
				"PACKAGE_TYPE"	: "Package\nType",
				"QTY"	: "QTY",
				"RECEIVED_DATE"	: "Received Date",
				"VISUAL_CHECK"	: "Visual\nCheck",
				"STORAGE_LOCATION"	: "Storage\nLocation",
				"REMARKS"	: "Remarks",
				"ATT"	: "Pic",
				"ATTACH_GRP_CD" : "ATTACH_GRP_CD"
			   }]
			, "Solid" : [ 
						{ 
							"Kind":"Search", 
							"Cells": "Expression,Select,Mark,Find,Clear", 
							"ActionsRange": "1", 
							"Actions": "Filter;Mark;Find"
						}
					],
		   
			"Foot" : [
			      { "Calculated": "1", "CanEdit": "0", "UNIT": $('#gridColTotalText').val(),"QTYFormula": "sum()", "Class" : "gridLinkText"   }
			   ]
		
	   /*"Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
	   			 {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_NO", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "TAG_NO", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "PACKAGE_TYPE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "UNIT", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "IN_QTY", "Width": "100", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_AVAILABLE_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextRedColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "REMARKS", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "2",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.", "PACKAGE_LIST_NORowSpan" : "2",
					"TYPE"	: "Type", "TYPERowSpan" : "2",
					"CATEGORY"	: "Category", "CATEGORYRowSpan" : "2",
					"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
					"DESCRIPTION"	: "Description of Goods\nSpecification", "DESCRIPTIONRowSpan" : "2",
					"DRAWING_NO"	: "Drawing No.", "DRAWING_NORowSpan" : "2",
					"TAG_NO"	: "Item Tag No.", "TAG_NORowSpan" : "2",
					"MATERIAL"	: "Material", "MATERIALRowSpan" : "2",
					"MATERIAL_CODE"	: "Material\nCode", "MATERIAL_CODERowSpan" : "2",
					"PACKAGE_TYPE"	: "Package\nType", "PACKAGE_TYPERowSpan" : "2",
					"UNIT"	: "Unit", "UNITRowSpan" : "2",
					"IN_QTY"	: "IN\nQ’ty", "IN_QTYRowSpan" : "2",
					"REQ_AVAILABLE_QTY"	: "Req Available\nQ’ty", "REQ_AVAILABLE_QTYRowSpan" : "2",
					"REQ_QTY"	: "Request\nQ’ty", "REQ_QTYRowSpan" : "2",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"PACKAGE_LIST_NO"	: "Packing List\nNo.",
					"TYPE"	: "Type",
					"CATEGORY"	: "Category",
					"PACKAGE_NO"	: "Package No.",
					"DESCRIPTION"	: "Description of Goods\nSpecification",
					"DRAWING_NO"	: "Drawing No.",
					"TAG_NO"	: "Item Tag No.",
					"MATERIAL"	: "Material",
					"MATERIAL_CODE"	: "Material\nCode",
					"PACKAGE_TYPE"	: "Package\nType",
					"UNIT"	: "Unit",
					"IN_QTY"	: "IN\nQ’ty",
					"REQ_AVAILABLE_QTY"	: "Req Available\nQ’ty",
					"REQ_QTY"	: "Request\nQ’ty",
					"REMARKS"	: "Remarks"}],
        "Foot" : [
				      { "Calculated": "1", "CanEdit": "0", "UNIT": $('#gridColTotalText').val(),"IN_QTYFormula": "sum()", "REQ_AVAILABLE_QTYFormula": "sum()", "REQ_QTYFormula": "sum()", "Class" : "gridLinkText"   }
				   ]*/
	};

	dlgPlGrid = TreeGrid( {Layout:{Data : dlgPlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMrrCreationPlGrid" );

}

function setDlgDesmMrrCreationBtn() {

	if(isNewDesmMrrCreationPopUp) {
		$('#btnDlgDesmMrrCreationCheck').remove();
		$('#btnDlgDesmMrrCreationConfirm').remove();
		//$('#btnDlgDesmMrrCreationApprove').remove();
		$('#btnDlgDesmMrrCreationRejectCheck').remove();
		$('#btnDlgDesmMrrCreationRejectConfirm').remove();
		//$('#btnDlgDesmMrrCreationRejectApprove').remove();
		$('#btnDlgDesmMrrCreationReport').remove();
		$('#btnDlgDesmMrrCreationDelete').remove();



		//$("#txtDlgDesmMrrCreationPreparedBy").attr("readonly",true);
		//$("#txtDlgDesmMrrCreationCheckedBy").attr("readonly",true);
		//$("#txtDlgDesmMrrCreationConfirmedBy").attr("readonly",true);
		//$("#txtDlgDesmMrrCreationApprovedBy").attr("readonly",true);

		$('#txtDlgDesmMrrCreationReqDate').val(toDay);
	}
	else {
		searchData();
	}

	var list = v_desm_mrr_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
}

function addFileIcon(list) {
	var gridList = dlgPlGrid.Rows;
	$.each(list, function(i, row) {
		$.each(gridList, function(i, gridRow) {
			if(gridRow.PACKAGE_NO == row.PACKAGE_NO) {
				gridRow.ATT = (row.PIC_YN == 'Y') ? 
						'/resources/ext/fontawesome-free/svgs/solid/paperclip.svg':
						'/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
				dlgPlGrid.RefreshRow(gridRow);
				return false;
			}
		});
	});
}

function searchData(type) {
	$.ajax({
		url: "/getDesmMrrInfoList.do",
		data: {"MRR_HEADER_ID" : v_desm_mrr_creation_param.MRR_HEADER_ID},
		success: function (data, textStatus, jqXHR) {

			dlgPlGrid.Source.Data.Data.Body = [data.results.lineList];
			dlgPlGrid.ReloadBody();
			addFileIcon(data.results.lineList);

			if(type != "DTL") {
				var infoData = data.results.headerList[0];
				$('#txtDlgDesmMrrCreationMrrNo').val(infoData.MRR_NO);
				$('#txtDlgDesmMrrCreationMrrName').val(infoData.MRR_NAME);
				
				$('#txtDlgDesmMrrReceivedFromDate').val(infoData.RECEIVED_DATE_FROM);
				$('#txtDlgDesmMrrReceivedToDate').val(infoData.RECEIVED_DATE_TO);
				$('#txtDlgDesmMrrInspectionFromDate').val(infoData.INSPECTION_DATE_FROM);
				$('#txtDlgDesmMrrInspectionToDate').val(infoData.INSPECTION_DATE_TO);
				$('#txtDlgDesmMrrCreationRemark').val(infoData.REMARK);
				
				
				//$('#txtDlgDesmMrrCreationReqDate').val(infoData.HANDOVER_DATE);
				//$('#txtDlgDesmMrrCreationDesc').val(infoData.DESCRIPTION);
				
				//$('#txtDlgDesmMrrCreationSubContractor').val(infoData.SUBCONTRACTOR);

				$('#txtDlgDesmMrrCreationPreparedBy').val(infoData.PREPARED_BY);
				$('#txtDlgDesmMrrCreationPreparedByAd').val(infoData.PREPARED_BY);
				$('#txtDlgDesmMrrCreationPreparedDate').val(infoData.PREPARED_DATE);
				$('#txtDlgDesmMrrCreationCheckedBy').val(infoData.CHECKED_BY);
				$('#txtDlgDesmMrrCreationCheckedByAd').val(infoData.CHECKED_BY);
				$('#txtDlgDesmMrrCreationCheckedDate').val(infoData.CHECKED_DATE);
				$('#txtDlgDesmMrrCreationConfirmedBy').val(infoData.CONFIRMED_BY);
				$('#txtDlgDesmMrrCreationConfirmedByAd').val(infoData.CONFIRMED_BY);
				$('#txtDlgDesmMrrCreationConfirmedDate').val(infoData.CONFIRMED_DATE);
				//$('#txtDlgDesmMrrCreationApprovedBy').val(infoData.APPROVED_BY);
				//$('#txtDlgDesmMrrCreationApprovedByAd').val(infoData.APPROVED_BY);
				//$('#txtDlgDesmMrrCreationApprovedDate').val(infoData.APPROVED_DATE);

				v_desm_mrr_creation_param.ATTACH_GRP_CD = infoData.ATTACH_GRP_CD;
				v_desm_mrr_creation_param.STATUS = infoData.STATUS;

				if(infoData.STATUS == "Incomplete" || infoData.STATUS == "Rejected") {
					$('#btnDlgDesmMrrCreationCheck').remove();
					$('#btnDlgDesmMrrCreationConfirm').remove();
					//$('#btnDlgDesmMrrCreationApprove').remove();
					$('#btnDlgDesmMrrCreationRejectCheck').remove();
					$('#btnDlgDesmMrrCreationRejectConfirm').remove();
					
					//$('#btnDlgDesmMrrCreationRejectApprove').remove();
					// $('#btnDlgDesmMrrCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					//$('#btnDlgDesmMrrCreationDelete').remove();

					//$("#txtDlgDesmMrrCreationPreparedBy").attr("readonly",true);
					//$("#txtDlgDesmMrrCreationCheckedBy").attr("readonly",true);
					//$("#txtDlgDesmMrrCreationConfirmedBy").attr("readonly",true);
					//$("#txtDlgDesmMrrCreationApprovedBy").attr("readonly",true);
				}
				else if(infoData.STATUS == "Pre-Confirmed") {
					gridReadOnly();

					$('#btnDlgDesmMrrCreationSave').remove();
					$('#btnDlgDesmMrrCreationRequest').remove();
					$('#btnDlgDesmMrrCreationCheck').remove();
					$('#btnDlgDesmMrrCreationApprove').remove();
					$('#btnDlgDesmMrrCreationRejectCheck').remove();
					//$('#btnDlgDesmMrrCreationRejectConfirm').remove();
					$('#btnDlgDesmMrrCreationRejectApprove').remove();
					// $('#btnDlgDesmMrrCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmMrrCreationDelete').remove();
					$('#btnDlgDesmMrrCreationAdd').remove();
					$('#btnDlgDesmMrrCreationDel').remove();
					
					$('#btnLocationSetup').remove();
					$('#btnReceivedDateSetup').remove();
					$('#btnVisualCheckSetup').remove();

					$("#txtDlgDesmMrrCreationPreparedBy").attr("readonly",true);
					$("#txtDlgDesmMrrCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmMrrCreationConfirmedBy").attr("readonly",true);
					//$("#txtDlgDesmMrrCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmMrrCreationMrrName").attr("readonly",true);
					$("#txtDlgDesmMrrReceivedFromDate").attr("disabled", true);
					$("#txtDlgDesmMrrReceivedToDate").attr("disabled", true);
					$("#txtDlgDesmMrrInspectionFromDate").attr("disabled", true);
					$("#txtDlgDesmMrrInspectionToDate").attr("disabled", true);
//					$("#txtDlgDesmMrrCreationRemark").attr("readonly",true);
				}
				else if(infoData.STATUS == "Confirmed") {
					gridReadOnly();

					$('#btnDlgDesmMrrCreationSave').remove();
					$('#btnDlgDesmMrrCreationRequest').remove();
					$('#btnDlgDesmMrrCreationCheck').remove();
					$('#btnDlgDesmMrrCreationConfirm').remove();
					$('#btnDlgDesmMrrCreationRejectCheck').remove();
					$('#btnDlgDesmMrrCreationRejectConfirm').remove();
					//$('#btnDlgDesmMrrCreationRejectApprove').remove();
					// $('#btnDlgDesmMrrCreationReport').remove(); // 20220423, 모바일 버전 제공전까진 임시로 오픈
					$('#btnDlgDesmMrrCreationDelete').remove();
					$('#btnDlgDesmMrrCreationAdd').remove();
					$('#btnDlgDesmMrrCreationDel').remove();
					
					$('#btnLocationSetup').remove();
					$('#btnReceivedDateSetup').remove();
					$('#btnVisualCheckSetup').remove();

					$("#txtDlgDesmMrrCreationPreparedBy").attr("readonly",true);
					$("#txtDlgDesmMrrCreationCheckedBy").attr("readonly",true);
					$("#txtDlgDesmMrrCreationConfirmedBy").attr("readonly",true);
					//$("#txtDlgDesmMrrCreationApprovedBy").attr("readonly",true);

					$("#txtDlgDesmMrrCreationMrrName").attr("readonly",true);
					$("#txtDlgDesmMrrReceivedFromDate").attr("disabled", true);
					$("#txtDlgDesmMrrReceivedToDate").attr("disabled", true);
					$("#txtDlgDesmMrrInspectionFromDate").attr("disabled", true);
					$("#txtDlgDesmMrrInspectionToDate").attr("disabled", true);
					$("#txtDlgDesmMrrCreationRemark").attr("readonly",true);
				}
			}


        }
    });
}

function gridReadOnly() {

	var gridList = dlgPlGrid.Rows;
	for (var key in gridList) {
		var gridRow = gridList[key];

		if(gridRow.Fixed == null){
			gridRow.RECEIVED_DATECanEdit = 0;
			gridRow.RECEIVED_DATEOnClickCell = () => {}; // Date Open 제거
			gridRow.VISUAL_CHECKCanEdit = 0;
			gridRow.STORAGE_LOCATIONCanEdit = 0;
			gridRow.REMARKSCanEdit = (v_desm_mrr_creation_param.STATUS == "Pre-Confirmed") ? 1 : 0;
			dlgPlGrid.RefreshRow(gridRow);
		}
	}
}

function closeDesmMrrCreationPopUp() {
	dlgPlGrid.Dispose();
}


function initDatePicker() {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}

function btnDlgDesmMrrCreationAttClick() {

	var param = Object.assign({}, v_desm_mrr_creation_param);


	if(param.ATTACH_GRP_CD == null) {
		param.ATTACH_GRP_CD = "";
	}

	if(param.MRR_HEADER_ID == null) {
		param.MRR_HEADER_ID = "";
	}

	param.fileUse = true;
	if(param.STATUS == "Pre-Confirmed" || param.STATUS == "Confirmed") {
		param.fileUse = false;
	}

	$('#dlgDesmMrrCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {

				if(returnParam.MRR_HEADER_ID == null || returnParam.MRR_HEADER_ID == ""){
					v_desm_mrr_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
				}
				else {
					if(v_desm_mrr_creation_callback)
					{
						v_desm_mrr_creation_param.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
						v_desm_mrr_creation_callback("save-item", null);
					}
				}

			});
		}
	});
}


function openDesmMrrCreationAttModal (G,row,col) {
	var param = Object.assign({}, v_desm_mrr_creation_param, row);


	param.fileUse = true;
	if(param.STATUS == "Pre-Confirmed" || param.STATUS == "Confirmed") {
		param.fileUse = false;
	}
	
	param.ATTACH_GRP_CD = row.ATTACH_GRP_CD;
	/*var param = Object.assign({}, row);
		param.ATTACH_GRP_CD = param.ATTACH_GRP_CD;
		param.fileUse = true;
		param.hideThumbnailContent = false;
		param.width = "1000px";*/

	$('#dlgDesmMrrCreationPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					row.Added = 1;
					row.ATTACH_GRP_CD = returnParam.ATTACH_GRP_CD;
					dlgPlGrid.RefreshRow(row);
				}
			});
		}
	});
}

function btnDlgDesmMrrCreationAddClick() {

	var param = Object.assign({}, v_desm_mrr_creation_param);

	$('#dlgDesmMrrCreationPopUp').load("/desmMrrPlDtlPopUp.do",null,function(data, status, xhr) {

		if(status == "success"){

			initDesmMrrPlDtlPopUp(param, function (key, returnParam) {

				if(key == "select-item") {
					addGridRow(returnParam);
				}
			});
		}
	});
}

function addGridRow(list) {

	for(var i = 0; i < list.length; i++) {
		var row = list[i];

		var addCheck = true;
		var gridList = dlgPlGrid.Rows;
		for (var key in gridList) {

			var gridRow = gridList[key];
			if(gridRow.Fixed == null){
				if(gridRow.PACKAGE_NO == row.PACKAGE_NO){

					addCheck = false;
				}

				/*if(gridRow.PROJECT_NO != row.PROJECT_NO) {
					alert_modal("", $('#alertAlreadyProject').val());
					return;
				}*/
			}
		}

		if(addCheck){
			var gridAddRow = dlgPlGrid.AddRow(null,null,1,null,null);
			gridAddRow.TRK_ITEM_NAME = row.TRK_ITEM_NAME;
			gridAddRow.PACKAGE_LIST_NO = row.PACKAGE_LIST_NO;
			gridAddRow.SEL_INVOICE_NUM = row.SEL_INVOICE_NUM;
			gridAddRow.ATTRIBUTE10 = row.ATTRIBUTE10;
			gridAddRow.PACKAGE_NO = row.PACKAGE_NO;
			gridAddRow.DESCRIPTION = row.DESCRIPTION;
			gridAddRow.PACKAGE_TYPE = row.PACKAGE_TYPE;
			gridAddRow.QTY = row.TOT_QTY;
			//gridAddRow.VISUAL_CHECK = row.VISUAL_CHECK;
			//gridAddRow.STORAGE_LOCATION = row.STORAGE_LOCATION;
			if(gridAddRow.STORAGE_LOCATION != null) gridAddRow.STORAGE_LOCATION = row.STORAGE_LOCATION;
			gridAddRow.RECEIVED_DATE = row.RECEIVED_DATE;
			//gridAddRow.REMARKS = row.REMARKS;
			//gridAddRow.ATT = row.ATT;
			
			gridAddRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
			
			dlgPlGrid.RefreshRow(gridAddRow);
		}
	}
}

function btnDlgDesmMrrCreationSaveClick() {
	save("Incomplete");
}

function btnDlgDesmMrrCreationRequestClick() {
//	save("Pre-Checked");
	save("Pre-Confirmed");
}

function btnDlgDesmMrrCreationCheckClick() {
	save("Pre-Confirmed");
}

function btnDlgDesmMrrCreationConfirmClick() {
	save("Confirmed");
}

function btnDlgDesmMrrCreationApproveClick() {
	save("Approved");
}


function btnDlgDesmMrrCreationDelClick() {
	dlgPlGrid.ActionAcceptEdit();

	var selectList = dlgPlGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				if(row.Added != null && row.Added == 1){
					dlgPlGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"MRR_LINE_ID" : row.MRR_LINE_ID, "MATERIAL_CODE" : row.MATERIAL_CODE});
					deleteList.push(deleteRow);
				}
			}

			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);
				var paramData = {"deleteList" : list};

				$.ajax({
					url: "/deleteDesmMrrDtl.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchData("DTL");

						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}
		}
	});


}

function btnDlgDesmMrrCreationRejectClick() {
	dlgPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			//FIXME: Remark 추가해서 Reject할 때 저장될 수 있어야 함.
			var paramData = objNullCheck({"MRR_HEADER_ID" : v_desm_mrr_creation_param.MRR_HEADER_ID, "REMARK" : $('#txtDlgDesmMrrCreationRemark').val()});

			$.ajax({
				url: "/saveDesmMrrReject.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {

						sendMail($('#alertRejectSuccess').val());

					}
				}
			});

		}
	});
}

function btnDlgDesmMrrCreationDeleteClick() {
	dlgPlGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"MRR_HEADER_ID" : v_desm_mrr_creation_param.MRR_HEADER_ID};

			$.ajax({
				url: "/deleteDesmMrr.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {

						alert_success($('#alertSuccess').val());

						if(v_desm_mrr_creation_callback) {
							v_desm_mrr_creation_callback("save-item", null);
						}

						$('#dlgDesmMrrCreation').modal('hide');
					}
				}
			});
		}
	});
}


function save(transType) {
	dlgPlGrid.ActionAcceptEdit();

	if($('#txtDlgDesmMrrCreationPreparedBy').val().length < 2 || $('#txtDlgDesmMrrCreationPreparedByAd').val() == ""){
		$('#txtDlgDesmMrrCreationPreparedBy').val("");
		$('#txtDlgDesmMrrCreationPreparedByAd').val("");
	}

//	if($('#txtDlgDesmMrrCreationCheckedBy').val().length < 2 || $('#txtDlgDesmMrrCreationCheckedByAd').val() == ""){
//		$('#txtDlgDesmMrrCreationCheckedBy').val("");
//		$('#txtDlgDesmMrrCreationCheckedByAd').val("");
//	}

	if($('#txtDlgDesmMrrCreationConfirmedBy').val().length < 2 || $('#txtDlgDesmMrrCreationConfirmedByAd').val() == ""){
		$('#txtDlgDesmMrrCreationConfirmedBy').val("");
		$('#txtDlgDesmMrrCreationConfirmedByAd').val("");
	}

	/*if($('#txtDlgDesmMrrCreationApprovedBy').val().length < 2 || $('#txtDlgDesmMrrCreationApprovedByAd').val() == ""){
		$('#txtDlgDesmMrrCreationApprovedBy').val("");
		$('#txtDlgDesmMrrCreationApprovedByAd').val("");
	}*/

	var chkValidation = checkRequiredField("divDlgDesmMrrCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var gridLength = dlgPlGrid.RowCount;

	if(gridLength < 1) {
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var txtDlgDesmMrrReceivedFromDate = $('#txtDlgDesmMrrReceivedFromDate').val();
	var txtDlgDesmMrrReceivedToDate = $('#txtDlgDesmMrrReceivedToDate').val();
	
	var txtDlgDesmMrrInspectionFromDate = $('#txtDlgDesmMrrInspectionFromDate').val();
	var txtDlgDesmMrrInspectionToDate = $('#txtDlgDesmMrrInspectionToDate').val();
	
	if(txtDlgDesmMrrReceivedFromDate > txtDlgDesmMrrReceivedToDate){
		alert_modal("", $('#alertManageMrrReceivedDateErr').val());
		return;
	}
	
	if(txtDlgDesmMrrInspectionFromDate > txtDlgDesmMrrInspectionToDate){
		alert_modal("", $('#alertManageMrrInspectionDateErr').val());
		return;
	}

	var changeObject = dlgPlGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;
    var gridList = dlgPlGrid.Rows;
    
//	if(transType == "Pre-Checked"){
	if(transType == "Pre-Confirmed"){
		for (var key in gridList) {
			var row = gridList[key];
			//console.log(row);
			if(row.Fixed == null){
				if(row.RECEIVED_DATE == null || row.RECEIVED_DATE == ""){
					var msg = $('#alertManageMrrDtlReceivedDateNullErr').val() + " [Package No : " + row.PACKAGE_NO + "]";
					alert_modal("", msg);
					return;
				}
				
				if(row.VISUAL_CHECK == null || row.VISUAL_CHECK == ""){
					var msg = $('#alertManageMrrDtlVisualNullErr').val() + " [Package No : " + row.PACKAGE_NO + "]";
					alert_modal("", msg);
					return;
				}
			}
			
		}
		/*for(var i = 0; i < gridList.length; i++){
			var rowId = gridList[i].id;
			var row = dlgPlGrid.GetRowById(rowId);
				
				if(row.RECEIVED_DATE == null || row.RECEIVED_DATE == ""){
					var msg = $('#alertManageMrrDtlReceivedDateNullErr').val() + " [Package No : " + row.PACKAGE_NO + "]";
					alert_modal("", msg);
					return;
				}
				
				if(row.VISUAL_CHECK == null || row.VISUAL_CHECK == ""){
					var msg = $('#alertManageMrrDtlVisualNullErr').val() + " [Package No : " + row.PACKAGE_NO + "]";
					alert_modal("", msg);
					return;
				}
			
		}*/
	}

    var fnChkRange = function() {
    	if(txtDlgDesmMrrReceivedFromDate == '' || txtDlgDesmMrrReceivedToDate == '') {
    		return 'NONE';
    	}
    	var pkgNo = '';
    	var sDate = txtDlgDesmMrrReceivedFromDate.replace(/\//g, '');
    	var eDate = txtDlgDesmMrrReceivedToDate.replace(/\//g, '');
    	$.each(gridList, function(i, row) {
			if(row.Fixed == null) {
				var rDate = formatDate(row.RECEIVED_DATE);
				if(rDate != null && rDate != "") {
					if(Number(rDate.replace(/\//g, '')) < Number(sDate) || Number(rDate.replace(/\//g, '')) > Number(eDate)) {
						pkgNo = row.PACKAGE_NO;
						return false;
					}
				}
			}
    	});
    	return pkgNo;
    };
    
    var packageNo = fnChkRange();
    if(packageNo != '') {
		var msg = $('#alertManageMrrDtlReceivedDatRangeErr').val() + ((packageNo == 'NONE') ? '' : " [Package No : " + packageNo + "]");
		alert_modal("", msg);
		return;
    }
    

	var alMsg = "";
	if(transType == "Incomplete") {
		alMsg = $('#alertSave').val();
	}
	else if(transType == "Pre-Confirmed") {
		alMsg = $('#alertRequest').val();
	}
	else if(transType == "Confirmed") {
		alMsg = $('#alertConfirm').val();
	}

	confirm_modal("", alMsg, null, function (callobj, result) {
		if(result) {

			var updateList = [];
			for(var i = 0; i < changeList.length; i++){
				var rowId = changeList[i].id;
				var row = dlgPlGrid.GetRowById(rowId);


				var updateRow = objNullCheck({	"MRR_LINE_ID" : row.MRR_LINE_ID, 
												"TRK_ITEM_NAME" : row.TRK_ITEM_NAME, 
												"PACKING_LIST_NO" : row.PACKAGE_LIST_NO, 
												"PACKAGE_NO" : row.PACKAGE_NO,
												"DESCRIPTION" : row.DESCRIPTION,
												"SHIPMENT_NO" : row.ATTRIBUTE10, 
												"PACKAGE_TYPE" : row.PACKAGE_TYPE,
												"VISUAL_CHECK" : row.VISUAL_CHECK, 
												"VISUAL_CHECK_DATE" : formatDate(row.VISUAL_CHECK_DATE), 
												//"VISUAL_CHECKED_BY" : row.VISUAL_CHECKED_BY, 
												"STORAGE_LOCATION" : row.STORAGE_LOCATION, 
												"RECEIVED_DATE" : formatDate(row.RECEIVED_DATE), 
												"REMARKS" : row.REMARKS, 
												"ATTACH_GRP_CD" : row.ATTACH_GRP_CD,
												"FILE_PATH" : row.FILE_PATH,
												"QTY" : row.QTY//,
												//"ATT" : row.ATT
												
				                                });

				updateList.push(updateRow);
				
			}

			var list = JSON.stringify(updateList);
			

			var paramData = objNullCheck({"MRR_HEADER_ID" : v_desm_mrr_creation_param.MRR_HEADER_ID, "MRR_NO" : $('#txtDlgDesmMrrCreationMrrNo').val(),
							 "MRR_NAME" : $('#txtDlgDesmMrrCreationMrrName').val(),
							 "STATUS" : v_desm_mrr_creation_param.STATUS, //"SUBCONTRACTOR" : $('#txtDlgDesmMrrCreationSubContractor').val(),
							 "RECEIVED_DATE_FROM" : $('#txtDlgDesmMrrReceivedFromDate').val(), 
							 "RECEIVED_DATE_TO" : $('#txtDlgDesmMrrReceivedToDate').val(), 
							 "INSPECTION_DATE_FROM" : $('#txtDlgDesmMrrInspectionFromDate').val(), 
							 "INSPECTION_DATE_TO" : $('#txtDlgDesmMrrInspectionToDate').val(), 
							 "REMARK" : $('#txtDlgDesmMrrCreationRemark').val(),
							 //"DESCRIPTION" : $('#txtDlgDesmMrrCreationDesc').val(), 
							 "ATTACH_GRP_CD" : v_desm_mrr_creation_param.ATTACH_GRP_CD,
							 "PREPARED_BY" : $('#txtDlgDesmMrrCreationPreparedBy').val(), 
							 "CHECKED_BY" : $('#txtDlgDesmMrrCreationCheckedByAd').val(),
							 "CONFIRMED_BY" : $('#txtDlgDesmMrrCreationConfirmedByAd').val(), 
							 //"APPROVED_BY" : $('#txtDlgDesmMrrCreationApprovedByAd').val(),
							 "APPROVED_BY" : "",
							  "TRANS_TYPE" : transType, 
							  "PROJECT_NO" : v_desm_mrr_creation_param.PROJECT_NO});

				paramData.updateList = list;
				//console.log("sss::", paramData);
			$.ajax({
				url: "/saveDesmMrrSave.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					v_desm_mrr_creation_param.MRR_HEADER_ID = result.MRR_HEADER_ID;
					v_desm_mrr_creation_param.STATUS = result.STATUS;
					if (result.error != null) {
						alert_fail(result.error);	
						/*if(result.error == "QTY") {

							for(var i = 0; i < changeList.length; i++){
								var rowId = changeList[i].id;
								var row = dlgPlGrid.GetRowById(rowId);

								if(row.MATERIAL_CODE == result.MATERIAL_CODE) {
									row.REQ_AVAILABLE_QTY = result.REQ_AVAILABLE_QTY;
									dlgPlGrid.RefreshRow(row);
								}
							}

							var msg = $('#alertSaveMrrQtyErr').val() + " [Material Code : " + result.MATERIAL_CODE + "]";
							alert_fail(msg);

						}
						else
						{
							alert_fail(result.error);
						}*/

					} else {

						if(transType == "Incomplete") {

							alert_success($('#alertSuccess').val());

							if(v_desm_mrr_creation_callback) {
								v_desm_mrr_creation_callback("save-item", null);
							}

							$('#dlgDesmMrrCreation').modal('hide');

						}
						else {
							sendMail($('#alertSuccess').val());
						}


					}
				}
			});

		}
	});
}

function sendMail(msg) {
	var paramData = {"MRR_HEADER_ID" : v_desm_mrr_creation_param.MRR_HEADER_ID, "STATUS" : v_desm_mrr_creation_param.STATUS};

	$.ajax({
		url: "/sendMailDesmMrr.do",
		data: paramData,
		success: function(result, textStatus, jqXHR) {
			if(result.error != null) {
				alert_fail(result.error);
			}
			else {
				if(result.error_code != null && result.error_code == "-2") {
					alert_fail($('#alertMailFail').val());
				}
				else {
					alert_success(msg);
				}


				if(v_desm_mrr_creation_callback) {
					v_desm_mrr_creation_callback("save-item", null);
				}

				$('#dlgDesmMrrCreation').modal('hide');
			}
		}
	});

}

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}

	return obj;
}

function btnDlgDesmMrrCreationReportClick() {
//	var popup = window.open('/mrrMrd.do?seq=' + v_desm_mrr_creation_param.MRR_HEADER_ID + '&fileNm=RD_'+parent.document.querySelector("#spanDefaultProject").innerHTML.split("[")[1].split("-")[0].trim()+'_MRR', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
	var popup = window.open('/mrrMrd.do?seq=' + v_desm_mrr_creation_param.MRR_HEADER_ID + '&fileNm=RD_MRR', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
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

function ShowCustomCalendar(G,row,col) {
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
	   G.SetValue(row,col,n,1);
	}


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function formatDate(d){
	if(d == null || d == ""){return "";}
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}



function chkDate(m){
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}

	return month;
}

function btnLocationSetupClick() {
	dlgPlGrid.ActionAcceptEdit();
	var selectList = dlgPlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	for(var i = 0; i < selectList.length; i++){

		var gridRow = selectList[i];
		var row = {"PROJECT_NO" : v_desm_mrr_creation_param.PROJECT_NO/*gridRow.PROJECT_NO*/,
				   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
				   "PACKAGE_NO" : gridRow.PACKAGE_NO,
				   "CODE_TYPE" : "SUMMARY"};

		selListParam.push(row);
	}
	console.log(selListParam);

	var param = {"selectList" : selListParam};

	$('#dlgDesmMrrCreationPopUp').load("/desmLocationMrrPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmLocationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					if(!isNewDesmMrrCreationPopUp) {
						searchData();
					}
//					$('#btnSearch').click();
					//searchData("DTL");
				}
			});

		}
	});

}

function btnReceivedDateSetupClick() {
	dlgPlGrid.ActionAcceptEdit();
	var selectList = dlgPlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	var v_return_param={};
	v_return_param.receivedDate = null;
	//var param = {"selectList" : selListParam};
	var param = Object.assign({}, v_return_param);

	$('#dlgDesmMrrCreationPopUp').load("/desmMrrReceivedDatePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmReceivedDatePopUp(param, function (key, returnParam) {
				if(key == "select-date"){
					//console.log("returnParam.receivedDate::", returnParam.receivedDate);
					if(returnParam.receivedDate != ""){
						var date = returnParam.receivedDate + " 00:00:00 GMT";
						var receivedDate = Date.parse(date);
						
						for(var i = 0; i < selectList.length; i++){
	
							var row = selectList[i];
							row.Added = 1;
							row.RECEIVED_DATE = receivedDate;
							dlgPlGrid.RefreshRow(row);
							
						}
					}
					//searchData("DTL");
				}
			});

		}
	});

}

function btnVisualCheckSetupClick() {
	dlgPlGrid.ActionAcceptEdit();
	var selectList = dlgPlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var selListParam = [];
	var v_return_param={};
	v_return_param.visualCheck = null;
	
	var param = Object.assign({}, v_return_param);

	$('#dlgDesmMrrCreationPopUp').load("/desmMrrVisualCheckPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmVisualCheckPopUp(param, function (key, returnParam) {
				if(key == "select-edit"){
					console.log("returnParam.visualCheck::", returnParam.visualCheck);
					if(returnParam.visualCheck != ""){
						
						for(var i = 0; i < selectList.length; i++){
	
							var row = selectList[i];
							row.Added = 1;
							row.VISUAL_CHECK = returnParam.visualCheck;
							dlgPlGrid.RefreshRow(row);
							
						}
					}
					//searchData("DTL");
				}
			});

		}
	});

}



/*
function btnLocationDeleteClick() {
	dlgPlGrid.ActionAcceptEdit();
	var selectList = dlgPlGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			var selListParam = [];
			for(var i = 0; i < selectList.length; i++){

				var gridRow = selectList[i];
				var row = {"PROJECT_NO" : gridRow.PROJECT_NO,
						   "TRK_ITEM_NAME" : gridRow.TRK_ITEM_NAME,
						   "PACKAGE_NO" : gridRow.PACKAGE_NO,
						   "CODE_TYPE" : "SUMMARY"};

				selListParam.push(row);
			}
			var list = JSON.stringify(selListParam);
			var param = {"deleteList" : list};

			$.ajax({
				url: "/deleteDesmLocation.do",
				data: param,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						//$('#btnSearch').click();
						//searchData("DTL");
					}
				}
			});
		}
	});


}
*/


