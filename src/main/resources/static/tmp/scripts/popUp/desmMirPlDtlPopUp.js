var dlgDesmMirPlDtlGrid;

var v_desm_mir_pl_dtl_callback = null;
var v_desm_mir_pl_dtl_param;
var elSelLocation;
// DesmMirPlDtlpopup

function initDesmMirPlDtlPopUp(param , callback) {
	v_desm_mir_pl_dtl_callback = callback;
    v_desm_mir_pl_dtl_param = param;

	$('#dlgDesmMirPlDtl').on('shown.bs.modal', function () {
		$('#dlgDesmMirPlDtl').click();
	});

	$('#dlgDesmMirPlDtl').on('hidden.bs.modal', function () {
	  	closeDesmMirPlDtlPopUp();
	});

	$('#dlgDesmMirPlDtl').modal('show');


    initDesmMirPlDtlPopUpCode();
}

function initDesmMirPlDtlPopUpCode() {
	//initTypeCode(initDesmMirPlDtlPopUpControls,"selDlgDesmMirPlDtlType");
	initDesmMirPlDtlPopUpControls();
}


function initDesmMirPlDtlPopUpControls() {



	makeAutocomplete(
		"txtDlgDesmMirPlDtlProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMirPlDtlProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMirPlDtlProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMirPlDtlProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	//$('#iconDlgDesmMirPlDtlProjectSearch').click(function () { iconDlgDesmMirPlDtlProjectSearchClick(); return false; });
	$('#btnDlgDesmMirPlDtlSearch').click(function () { btnDlgDesmMirPlDtlSearchClick(); return false; });
	$('#btnDlgDesmMirPlDtlResete').click(function () { btnDlgDesmMirPlDtlReseteClick(); return false; });
	$('#btnDlgDesmMirPlDtlCompletion').click(function () { btnDlgDesmMirPlDtlCompletionClick(); return false; });



	/*$("#txtDlgDesmMirPlDtlProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMirPlDtlPackageListNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMirPlDtlPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMirPlDtlDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMirPlDtlDrawingNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMirPlDtlTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

		$("#txtDlgDesmMirPlDtlMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});

	$("#txtDlgDesmMirPlDtlRemarks").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmMirPlDtlSearch').click();
		}
	});
	*/


	TGSetEvent("OnCopy","dlgDesmMirPlDtlGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmMirPlDtlGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMirPlDtlGrid"
			, "CfgId"			: "dlgDesmMirPlDtlGridCfg"
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
		    {   "Name"	: "NO", "Width": "70", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "IS_CONFIRM_MATERIAL", "Width": "90", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "CONFIRM_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "IS_MRR_CREATE", "Width": "90", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "MRR_RECEIVED_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "VISUAL_CHECK", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//		    {	"Name"	: "VISUAL_CHECK", "Width" :"100", "Type": "Enum", "Enum" : "|Good|Defect|Hold", "EnumKeys" : "|Good|Defect|Hold", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
		    {	"Name"	: "ATTRIBUTE3", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "ATTRIBUTE10", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//		    {	"Name"	: "ATTRIBUTE9", "Width": "100", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },

			{	"Name"	: "SEL_INVOICE_NUM", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PACKAGE_LIST_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			//{   "Name"  : "PACKAGE_HISTORY", "Width": "25"	, "Type": "Text", "Spanned":"1", "Icon" : "/resources/ext/fontawesome-free/svgs/solid/history.svg", "IconAlign" : "Center", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openHistory( Grid, Row,Col )"	, "IconSize" : "2"	},
			{	"Name"	: "PACKAGE_STATUS", "Visible" :"0", "Width": "90", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "OUT_STATUS", "Width": "85", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "OUT_STATUS_QTY", "Width": "95", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DESCRIPTION", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PACKAGE_TYPE", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "L_CM", "Width": "80", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "W_CM", "Width": "80", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "H_CM", "Width": "80", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "VOLUME", "Width": "80", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "SQM", "Width": "90", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "NET", "Width": "90", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "GROSS", "Width": "90", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "HAZARDOUS_MATERIAL", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARKS", "Width": "133", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "RECEIPT_DATE", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
			{	"Name"	: "LAST_OUTGOING_DATE", "Visible" :"0", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd" },
			{	"Name"	: "QTY", "Visible" :"0", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARK", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "VENDOR", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "OLD_INF_OF_VENDOR", "Visible" :"0", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "RECEIVED_DATE", "Visible" :"0", "Width": "120", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": ""},
			{	"Name"	: "STORAGE_LOCATION", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "LOC_UPDATE_DATE", "Width": "150", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
			{	"Name"	: "LOC_UPDATED_BY", "Width": "180", "Type": "Text" , "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},

		]
		,"Head" : [{
			"Kind"	: "Header",
			"id" : "Header",
			"Spanned" : "1",
			"PanelRowSpan" : "2",
			"Class" : "gridCenterText",
			
			
			"STATUS"	: "Status", "STATUSRowSpan" : "2",
			"NO"	: "No.", "NORowSpan" : "2",
			"IS_CONFIRM_MATERIAL"	: "Material\nConfirm", "IS_CONFIRM_MATERIALRowSpan" : "2",
			"CONFIRM_DATE"	: "Material\nConfirm Date", "CONFIRM_DATERowSpan" : "2",
			"IS_MRR_CREATE"	: "MRR Create", "IS_MRR_CREATERowSpan" : "2",
			"MRR_RECEIVED_DATE"	: "MRR Received Date", "MRR_RECEIVED_DATERowSpan" : "2",
			"VISUAL_CHECK"	: "Visual Check", "VISUAL_CHECKRowSpan" : "2",
			"ATTRIBUTE3"	: "Vendor", "ATTRIBUTE3RowSpan" : "2",
			"ATTRIBUTE10"	: $('#gridColShippingOrder').val(), "ATTRIBUTE10RowSpan" : "2",
//			"ATTRIBUTE9"	: "Sequence", "ATTRIBUTE9RowSpan" : "2",

			"SEL_INVOICE_NUM"	: "Invoice No.", "SEL_INVOICE_NUMRowSpan" : "2",
			"PACKAGE_LIST_NO"	: "Packing list No.", "PACKAGE_LIST_NORowSpan" : "2",
			"PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
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
			"RECEIPT_DATE"	: "Received Date", "RECEIPT_DATERowSpan" : "2",
			"LAST_OUTGOING_DATE"	: "Last Outgoing Date", "LAST_OUTGOING_DATERowSpan" : "2",
			"QTY" : "QTY", "QTYRowSpan" : "2",
			"REMARK" : "Remark\n(UNIT, spare part..)", "REMARKRowSpan" : "2",
			"VENDOR" : "Vendor", "VENDORRowSpan" : "2",
			"OLD_INF_OF_VENDOR" : "Old inf of Vendor", "OLD_INF_OF_VENDORRowSpan" : "2",
			"RECEIVED_DATE" : "Received Date", "RECEIVED_DATERowSpan" : "2",
			"STORAGE_LOCATION" : "Location", "STORAGE_LOCATIONRowSpan" : "2",
			"LOC_UPDATE_DATE"	: "Location Last Updated Date", "LOC_UPDATE_DATERowSpan" : "2",
			"LOC_UPDATED_BY"	: "Location Last Updated By", "LOC_UPDATED_BYRowSpan" : "2",
		   },
		   {"Kind"	: "Header",
			"Spanned" : "1",
			"Class" : "gridCenterText",
			"STATUS"	: "Status",
			"NO"	: "No.",
			"IS_CONFIRM_MATERIAL"	: "Confirm\nMaterial",
			"CONFIRM_DATE"	: "Material\nConfirm Date",
			"IS_MRR_CREATE"	: "MRR Create",
			"MRR_RECEIVED_DATE"	: "MRR Received Date",
			"VISUAL_CHECK"	: "Visual Check",
			"ATTRIBUTE3"	: "Vendor",
			"ATTRIBUTE10"	: $('#gridColShippingOrder').val(),
//			"ATTRIBUTE9"	: "Sequence",
			"SEL_INVOICE_NUM"	: "Invoice No.",
			"PACKAGE_NO" : "Package No.",
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
			"RECEIPT_DATE"	: "Received Date",
			"LAST_OUTGOING_DATE"	: "Last Outgoing Date",
			"QTY" : "QTY",
			"REMARK" : "Remark\n(UNIT, spare part..)",
			"VENDOR" : "Vendor",
			"OLD_INF_OF_VENDOR" : "Old inf of Vendor",
			"RECEIVED_DATE" : "Received Date",
			"STORAGE_LOCATION" : "Location",
			"LOC_UPDATE_DATE"	: "Location Last Updated Date",
			"LOC_UPDATED_BY"	: "Location Last Updated By",
			}
		]
		};

	dlgDesmMirPlDtlGrid = TreeGrid( {Layout:{Data : dlgDesmMirPlDtlGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMirPlDtlGrid" );
	TGSetEvent("OnRenderFinish","dlgDesmMirPlDtlGrid",function(grid){
		gridReloadFn(grid);
		gridReload = true;
	});
	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmMirPlDtlProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmMirPlDtlProjectName').val(list[0]["NAME"]);
			//initDesmMirPlDtlVoyageCombo();
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



function closeDesmMirPlDtlPopUp() {
	dlgDesmMirPlDtlGrid.Dispose();
}

function iconDlgDesmMirPlDtlProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmMirPlDtlProjectCode').val(), TYPE : "A"};

	$('#dlgDesmMirPlDtlPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmMirPlDtlProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmMirPlDtlProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmMirPlDtlSearchClick() {

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
	
	if($('#txtDlgDesmMirPlDtlProjectCode').val().length < 2 || $('#txtDlgDesmMirPlDtlProjectName').val() == ""){
		$('#txtDlgDesmMirPlDtlProjectCode').val("");
		$('#txtDlgDesmMirPlDtlProjectName').val("");
		$("#txtDlgDesmMirPlDtlProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblDlgDesmMirPlDtlSearchBox");

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
			PROJECT_NO : $('#txtDlgDesmMirPlDtlProjectCode').val(),
	 		 INVOICE_NO : $('#txtDlgDesmMirPlDtlInvoiceNo').val(),
			 PACKAGE_LIST_NO : $('#txtPackingListNo').val(),
			 PACKAGE_NO : $('#txtDlgDesmMirPlDtlPackageNo').val(),
			 DESCRIPTION : $('#txtDescription').val(),
			 ATTRIBUTE10 : $('#selAttribute10').val(),
			 VENDOR : $('#txtVendor').val(),
			 LOCATION : elSelLocation.sumo.getSelStr(),
			 IS_MRR_CREATE : $('#selMrrCreate').val(),
			 VISUAL_CHECK : $('#selVisualCheck').val()
	};
	
	$.ajax({
	url: "/getIdsmOsSummaryMirList.do",
	data: paramData,
	success: function (data, textStatus, jqXHR) {
	
	
		dlgDesmMirPlDtlGrid.Source.Data.Data.Body = [data.results];
		dlgDesmMirPlDtlGrid.Reload();
	
	
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

function btnDlgDesmMirPlDtlReseteClick() {
	//$('#txtDlgDesmMirPlDtlProjectCode').val("");
	//$('#txtDlgDesmMirPlDtlProjectName').val("");
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
	
	$('#selMrrCreate').val("");
 	$('#selVisualCheck').val("");

}

function btnDlgDesmMirPlDtlCompletionClick() {
	var selectList = dlgDesmMirPlDtlGrid.GetSelRows();
    console.log("selectList.length::::", selectList.length);
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var packageNoList = [];
	$.each(selectList, function(index, gridRow) {
		packageNoList.push(gridRow.PACKAGE_NO);
	});
	
	// 임시로.. TRK_ITEM_NAME을 가져올 수 있도록 조치함
	// 추후 변경필요, 불필요하게 TRK_ITEM_NAME을 가져오고 있음.
	// Package 선택시 Shipment 또는 TRK_ITEM_NAME으로 선택한 Package만 리스트업될 수 있게 해야함..seq가 없어서 그럼..
	var trkItemNameList = [];
	$.each(selectList, function(index, gridRow) {
		trkItemNameList.push(gridRow.TRK_ITEM_NAME);
	});
	
	var paramData = {};
	paramData['PROJECT_NO'] = $("#txtProjectCode").val();
	paramData['PACKAGE_NO_LIST'] = JSON.stringify(packageNoList);
	paramData['TRK_ITEM_NAME_LIST'] = JSON.stringify(trkItemNameList);

	$.ajax({
		url: "/getIdsmOsSummaryMirItemList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			if(v_desm_mir_pl_dtl_callback)
			{
				v_desm_mir_pl_dtl_callback("select-item", data.results);
				$('#dlgDesmMirPlDtl').modal('hide');
			}
		}
	});
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