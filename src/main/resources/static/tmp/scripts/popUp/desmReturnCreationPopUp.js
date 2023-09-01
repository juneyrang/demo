var dlgDesmReturnGrid;

var v_desm_return_callback = null;
var v_desm_return_param;



function initDesmReturnPopUp(param , callback) {
	v_desm_return_callback = callback;
    v_desm_return_param = param;

	$('#dlgDesmReturnCreation').on('shown.bs.modal', function () {
		$('#dlgDesmReturnCreation').click();
	});

	$('#dlgDesmReturnCreation').on('hidden.bs.modal', function () {
	  	closeDesmReturnPopUp();
	});

	$('#dlgDesmReturnCreation').modal('show');

    initDesmReturnPopUpCode();
}

function initDesmReturnPopUpCode() {

	initTypeCode(initDesmReturnPopUpControls,"selDlgDesmReturnCreationType");
}


function initDesmReturnPopUpControls() {


	initDesmReturnPopUpDatePicker("txtDlgDesmReturnCreationStartRequestDate");
	initDesmReturnPopUpDatePicker("txtDlgDesmReturnCreationEndRequestDate");

	$('#btnDlgDesmReturnCreationSearch').click(function () { btnDlgDesmReturnCreationSearchClick(); return false; });
	$('#btnDlgDesmReturnCreationReset').click(function () { btnDlgDesmReturnCreationResetClick(); return false; });
	$('#btnDlgDesmReturnCreationCompletion').click(function () { btnDlgDesmReturnCreationCompletionClick(); return false; });

	$("#txtDlgDesmReturnCreationProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmReturnCreationSearch').click();
		}
	});

	$("#txtDlgDesmReturnCreationPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmReturnCreationSearch').click();
		}
	});

	$("#txtDlgDesmReturnCreationMrfNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmReturnCreationSearch').click();
		}
	});

	$("#txtDlgDesmReturnCreationMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmReturnCreationSearch').click();
		}
	});

	TGSetEvent("OnCopy","dlgDesmReturnGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmReturnGridCol = {
		"Cfg": {
			"id"				: "dlgDesmReturnGrid"
			, "CfgId"			: "dlgDesmReturnGridCfg"
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
	   "Cols" : [{	"Name"	: "MRF_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "MRF_NAME", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "SUBCONTRACTOR", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "RETURN_REQ_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
				 {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "REQ_RETURN_QTY", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "RETURN_AVAILABLE_QTY", "Width": "200", "Type": "Float", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "RETURN_DATE", "Width": "130", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextRedColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "RETURN_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0" , "Class" : "gridBorderText gridTextRedColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
	   			],
		"Header" : {"Class" : "gridCenterText",
		   	"MRF_NO"	: "MRF No.",
		   	"MRF_NAME"	: "MRF Name",
		   	"SUBCONTRACTOR" : "Subcontractor",
		   	"RETURN_REQ_DATE"	: "MRF Req Date",
		   	"MATERIAL_CODE" : "Material Code",
		   	"TYPE" : "Type",
			"CATEGORY" : "Category",
			"SUB_CATEGORY" : "Sub-Category",
		   	"PACKAGE_NO"	: "Package No",
		   	"DESCRIPTION"	: "Description",
		   	"REQ_RETURN_QTY" : "MRF Q’ty",
		   	"RETURN_AVAILABLE_QTY"	: "Return Available Q’ty",
		   	"RETURN_DATE"	: "Return Date",
		   	"RETURN_QTY"	: "Return Q’ty",
		   	"DRAWING_NO"	: "Drawing No."
		}
	};

	dlgDesmReturnGrid = TreeGrid( {Layout:{Data : dlgDesmReturnGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmReturnGrid" );

	var list = v_desm_return_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmReturnCreationProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmReturnCreationProjectName').val(list[0]["NAME"]);
			initDlgDesmReturnCreationVoyageCombo();
		}
	});
}

function initDlgDesmReturnCreationVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtDlgDesmReturnCreationProjectCode").val(), "IS_CONFIRM_MATERIAL" : "Y" },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selDlgDesmReturnCreationAttribute10 option").remove();
			$("#selDlgDesmReturnCreationAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selDlgDesmReturnCreationAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function closeDesmReturnPopUp() {
	dlgDesmReturnGrid.Dispose();
}

function initDesmReturnPopUpDatePicker(id) {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	var eid = "#" + id;
	$(eid).datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}


function iconDlgDesmReturnCreationProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmReturnCreationProjectCode').val(), TYPE : "A"};

	$('#dlgDesmReturnCreationPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmReturnCreationProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmReturnCreationProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmReturnCreationSearchClick() {

	if($('#txtDlgDesmReturnCreationProjectCode').val().length < 2 || $('#txtDlgDesmReturnCreationProjectName').val() == ""){
		$('#txtDlgDesmReturnCreationProjectCode').val("");
		$('#txtDlgDesmReturnCreationProjectName').val("");
		$("#txtDlgDesmReturnCreationProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblDlgDesmReturnCreationSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}


	var paramData = {PROJECT_NO : $('#txtDlgDesmReturnCreationProjectCode').val(),
					 PACKAGE_NO : $('#txtDlgDesmReturnCreationPackageNo').val(),
					 MRF_NO : $('#txtDlgDesmReturnCreationMrfNo').val(),
					 MATERIAL_CODE : $('#txtDlgDesmReturnCreationMaterialCode').val(),
					 REQUEST_START_DATE : $('#txtDlgDesmReturnCreationStartRequestDate').val(),
					 ATTRIBUTE10 : $('#selDlgDesmReturnCreationAttribute10').val(),
					 REQUEST_END_DATE : $('#txtDlgDesmReturnCreationEndRequestDate').val(),
					 TYPE : $('#selDlgDesmReturnCreationType').val(),
					 CATEGORY : $('#txtDlgDesmReturnCreationCategory').val(),

	};

	$.ajax({
		url: "/getDesmReturnCreationList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			dlgDesmReturnGrid.Source.Data.Data.Body = [data.results];
			dlgDesmReturnGrid.ReloadBody();


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

function ShowCustomCalendar(G,row,col){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
	   G.SetValue(row,col,n,1);
	   }


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}


function btnDlgDesmReturnCreationCompletionClick() {
	dlgDesmReturnGrid.ActionAcceptEdit();

	var selectList = dlgDesmReturnGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++){
		var row = selectList[i];

		if(row.RETURN_DATE == null || row.RETURN_DATE == ""){
			var msg = $('#alertSaveReturnDateNullErr').val();
			alert_modal("", msg);
			return;
		}

		if(row.RETURN_QTY == null || row.RETURN_QTY == ""){
			var msg = $('#alertSaveReturnQtyNullErr').val();
			alert_modal("", msg);
			return;
		}
	}

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {

			var updateList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				var updateRow = {"MRF_HEADER_ID" : row.MRF_HEADER_ID, "MRF_LINE_ID" : row.MRF_LINE_ID, "MATERIAL_CODE" : row.MATERIAL_CODE, "PROJECT_NO" : $('#txtDlgDesmReturnCreationProjectCode').val(),
				                 "RETURN_DATE" : ExcelDateToJSDate(row.RETURN_DATE), "RETURN_QTY" : row.RETURN_QTY, "RSI_LINE_ID" : row.RSI_LINE_ID};
				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = {"updateList" : list};

			$.ajax({
				url: "/saveDesmMrfReturnSave.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {

						if(result.error == "QTY") {

							for(var i = 0; i < selectList.length; i++){
								var row = selectList[i];

								if(row.MRF_LINE_ID == result.MRF_LINE_ID) {
									row.RETURN_AVAILABLE_QTY = result.RETURN_AVAILABLE_QTY;
									dlgDesmReturnGrid.RefreshRow(row);

									var msg = $('#alertSaveMrfReturnQtyErr').val() + "<br>MRF No. : " + row.MRF_NO + "<br>Package No : " + row.PACKAGE_NO + "<br>Description : " + row.DESCRIPTION;
									//alert_fail(msg);
									alert_modal("Error", msg);
								}
							}

						}
						else
						{
							alert_fail(result.error);
						}

					} else {

						alert_success($('#alertSuccess').val());

						if(v_desm_return_callback) {
							v_desm_return_callback("save-item", null);
						}

						$('#dlgDesmReturnCreation').modal('hide');
					}
				}
			});
		}
	});

}

function ExcelDateToJSDate(date) {

	if (date == null || date == "")
		return "";
	else if (typeof(date) == "string")
		return date;
	else
	{
		var jsDate = new Date(date);
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '/' + month + '/' + day;
	}
}

function btnDlgDesmReturnCreationResetClick() {
	$('#txtDlgDesmReturnCreationPackageNo').val("");
	$('#txtDlgDesmReturnCreationMrfNo').val("");
	$('#txtDlgDesmReturnCreationMaterialCode').val("");
	$('#txtDlgDesmReturnCreationStartRequestDate').val("");
	$('#txtDlgDesmReturnCreationEndRequestDate').val("");
	$('#selDlgDesmReturnCreationAttribute10').val("");
	$('#selDlgDesmReturnCreationType').val("");
	$('#txtDlgDesmReturnCreationCategory').val("");

}