var dlgDesmOutGoingGrid;

var v_desm_out_going_callback = null;
var v_desm_out_going_param;



function initDesmOutGoingPopUp(param , callback) {
	v_desm_out_going_callback = callback;
    v_desm_out_going_param = param;

	$('#dlgDesmOutGoingCreation').on('shown.bs.modal', function () {
		$('#dlgDesmOutGoingCreation').click();
	});

	$('#dlgDesmOutGoingCreation').on('hidden.bs.modal', function () {
	  	closeDesmOutGoingPopUp();
	});

	$('#dlgDesmOutGoingCreation').modal('show');

    initDesmOutGoingPopUpCode();
}

function initDesmOutGoingPopUpCode() {

	initTypeCode(initDesmOutGoingPopUpControls,"selDlgDesmOutGoingCreationType");
}


function initDesmOutGoingPopUpControls() {


	initDesmOutGoingPopUpDatePicker("txtDlgDesmOutGoingCreationStartRequestDate");
	initDesmOutGoingPopUpDatePicker("txtDlgDesmOutGoingCreationEndRequestDate");

	makeAutocomplete(
		"txtDlgDesmOutGoingCreationProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmOutGoingCreationProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmOutGoingCreationProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmOutGoingCreationProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	//$('#iconDlgDesmOutGoingCreationProjectSearch').click(function () { iconDlgDesmOutGoingCreationProjectSearchClick(); return false; });
	$('#btnDlgDesmOutGoingCreationSearch').click(function () { btnDlgDesmOutGoingCreationSearchClick(); return false; });
	$('#btnDlgDesmOutGoingCreationReset').click(function () { btnDlgDesmOutGoingCreationResetClick(); return false; });
	$('#btnDlgDesmOutGoingCreationCompletion').click(function () { btnDlgDesmOutGoingCreationCompletionClick(); return false; });
	$('#btnDlgDesmOutGoingCreationDateChange').click(function () { btnDlgDesmOutGoingCreationDateChangeClick(); return false; });
	$('#btnDlgDesmOutGoingReceiverNameChange').click(function () { btnDlgDesmOutGoingReceiverNameChangeClick(); return false; });
	


	$("#txtDlgDesmOutGoingCreationProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});

	$("#txtDlgDesmOutGoingCreationPackageNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});

	$("#txtDlgDesmOutGoingCreationRsiNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});

	$("#txtDlgDesmOutGoingCreationMaterialCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});

	$("#txtDlgDesmOutGoingCreationDescription").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});

	$("#txtDlgDesmOutGoingCreationDrawingNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});

	$("#txtDlgDesmOutGoingCreationTagNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnDlgDesmOutGoingCreationSearch').click();
		}
	});


	TGSetEvent("OnCopy","dlgDesmOutGoingGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

		var gridCode = getGridCode();
		var dlgDesmOutGoingGridCol = {
		"Cfg": {
			"id"				: "dlgDesmOutGoingGrid"
			, "CfgId"			: "dlgDesmOutGoingGridCfg"
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
	   "Cols" : [{	"Name"	: "RSI_NO", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "RSI_NAME", "Width": "160", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "SUBCONTRACTOR", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "REQUEST_DATE", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PACKING_LIST_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PACKAGE_NO", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "DESCRIPTION", "Width": "250", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "REQ_QTY", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "HANDOVER_AVAILABLE_QTY", "Width": "200", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "HANDOVER_DATE", "Width": "130", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextRedColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "HANDOVER_QTY", "Width": "120", "Type": "Int", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextRedColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "RECEIVER_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "MATERIAL_CODE", "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "TYPE", "Width": "180", "Type": "Enum", "Enum" : gridTypeCode.label, "EnumKeys" : gridTypeCode.code , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
	   			 {	"Name"	: "CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "SUB_CATEGORY", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "DRAWING_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "TAG_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
	   			],
		"Header" : {"Class" : "gridCenterText",
		   	"RSI_NO"	: "RSI No.",
		   	"RSI_NAME"	: "RSI Name",
		   	"SUBCONTRACTOR" : "Subcontractor",
		   	"REQUEST_DATE"	: "RSI Req.date",
		   	"MATERIAL_CODE" : "Material Code",
		   	"PACKING_LIST_NO"	: "Packing List No",
		   	"PACKAGE_NO"	: "Package No",
		   	"DESCRIPTION"	: "Description",
		   	"REQ_QTY"	: "RSI Q’ty",
		   	"HANDOVER_AVAILABLE_QTY"	: "Handover Available Q’ty",
		   	"HANDOVER_DATE"	: "Handover Date",
		   	"HANDOVER_QTY"	: "Handover Q’ty",
		   	"RECEIVER_NAME" : "Receiver",
	   		"TYPE"	: "Type",
	   		"CATEGORY"	: "Category",
	   		"SUB_CATEGORY" : "Sub-Category",
	   		"DRAWING_NO"	: "Drawing No.",
	   		"TAG_NO"	: "Item(Tag) No.",
		}
	};

	dlgDesmOutGoingGrid = TreeGrid( {Layout:{Data : dlgDesmOutGoingGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmOutGoingGrid" );

	var list = v_desm_out_going_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtDlgDesmOutGoingCreationProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmOutGoingCreationProjectName').val(list[0]["NAME"]);
			initDlgDesmOutGoingCreationVoyageCombo();
		}
	});
}

function initDlgDesmOutGoingCreationVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtDlgDesmOutGoingCreationProjectCode").val(), "IS_CONFIRM_MATERIAL" : "Y" },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selDlgDesmOutGoingCreationAttribute10 option").remove();
			$("#selDlgDesmOutGoingCreationAttribute10").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selDlgDesmOutGoingCreationAttribute10").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}

function closeDesmOutGoingPopUp() {
	dlgDesmOutGoingGrid.Dispose();
}

function initDesmOutGoingPopUpDatePicker(id) {

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


function iconDlgDesmOutGoingCreationProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmOutGoingCreationProjectCode').val(), TYPE : "A"};

	$('#dlgDesmOutGoingCreationPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtDlgDesmOutGoingCreationProjectCode").val(returnParam.SEGMENT1);
					$("#txtDlgDesmOutGoingCreationProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}

function btnDlgDesmOutGoingCreationSearchClick() {

	if($('#txtDlgDesmOutGoingCreationProjectCode').val().length < 2 || $('#txtDlgDesmOutGoingCreationProjectName').val() == ""){
		$('#txtDlgDesmOutGoingCreationProjectCode').val("");
		$('#txtDlgDesmOutGoingCreationProjectName').val("");
		$("#txtDlgDesmOutGoingCreationProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblDlgDesmOutGoingCreationSearchBox");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	var paramData = {PROJECT_NO : $('#txtDlgDesmOutGoingCreationProjectCode').val(),
					 PACKING_LIST_NO : $('#txtDlgDesmOutGoingCreationPackingListNo').val(),
					 PACKAGE_NO : $('#txtDlgDesmOutGoingCreationPackageNo').val(),
					 RSI_NO : $('#txtDlgDesmOutGoingCreationRsiNo').val(),
					 MATERIAL_CODE : $('#txtDlgDesmOutGoingCreationMaterialCode').val(),
					 REQUEST_START_DATE : $('#txtDlgDesmOutGoingCreationStartRequestDate').val(),
					 ATTRIBUTE10 : $('#selDlgDesmOutGoingCreationAttribute10').val(),
					 REQUEST_END_DATE : $('#txtDlgDesmOutGoingCreationEndRequestDate').val(),
					 DESCRIPTION : $('#txtDlgDesmOutGoingCreationDescription').val(),
					 DRAWING_NO : $('#txtDlgDesmOutGoingCreationDrawingNo').val(),
					 TAG_NO : $('#txtDlgDesmOutGoingCreationTagNo').val(),
					 RSI_NAME : $('#txtDlgDesmOutGoingCreationRsiName').val(),
					 TYPE : $('#selDlgDesmOutGoingCreationType').val(),
					 CATEGORY : $('#txtDlgDesmOutGoingCreationCategory').val(),
					 SUBCON: $('#txtDlgDesmOutGoingCreationSubcon').val(),
	};

	$.ajax({
		url: "/getDesmOutGoingCreationList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			dlgDesmOutGoingGrid.Source.Data.Data.Body = [data.results];
			dlgDesmOutGoingGrid.ReloadBody();


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

function btnDlgDesmOutGoingCreationDateChangeClick() {
	dlgDesmOutGoingGrid.ActionAcceptEdit();

	var selectList = dlgDesmOutGoingGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var param = {};

	$('#dlgDesmOutGoingCreationPopUp').load("/desmOutGoingDateChangePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmOutGoingDateChangePopUp(param, function (key, returnParam) {

				if(key == "edit-item"){

					var date = returnParam.HANDOVER_DATE + " 00:00:00 GMT";
					var handoverDate = Date.parse(date);

					for(var i = 0; i < selectList.length; i++){
						var row = selectList[i];
						row.HANDOVER_DATE = handoverDate;
						dlgDesmOutGoingGrid.RefreshRow(row);
					}
				}
			});

		}
	});
}

function btnDlgDesmOutGoingReceiverNameChangeClick() {
	dlgDesmOutGoingGrid.ActionAcceptEdit();

	var selectList = dlgDesmOutGoingGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var param = {};

	$('#dlgDesmOutGoingCreationPopUp').load("/desmOutGoingReceiverChangePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmOutGoingReceiverChangePopUp(param, function (key, returnParam) {
				if(key == "edit-item"){
					var receiverName = returnParam.RECEIVER_NAME;
					for(var i = 0; i < selectList.length; i++){
						var row = selectList[i];
						row.RECEIVER_NAME = returnParam.RECEIVER_NAME;
						dlgDesmOutGoingGrid.RefreshRow(row);
					}
				}
			});
		}
	});
}

function btnDlgDesmOutGoingCreationCompletionClick() {
	dlgDesmOutGoingGrid.ActionAcceptEdit();

	var selectList = dlgDesmOutGoingGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	for(var i = 0; i < selectList.length; i++){
		var row = selectList[i];

		if(row.HANDOVER_DATE == null || row.HANDOVER_DATE == ""){
			var msg = $('#alertSaveRsiOutDateNullErr').val();
			alert_modal("", msg);
			return;
		}

		if(row.HANDOVER_QTY == null || row.HANDOVER_QTY == ""){
			var msg = $('#alertSaveRsiUutQtyNullErr').val();
			alert_modal("", msg);
			return;
		}
	}

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {

			var updateList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				row.RECEIVER_NAME = (row.RECEIVER_NAME == "" || row.RECEIVER_NAME == null) ? "" : row.RECEIVER_NAME;
				var updateRow = {"RSI_HEADER_ID" : row.RSI_HEADER_ID, "RSI_LINE_ID" : row.RSI_LINE_ID, "HANDOVER_DATE" : ExcelDateToJSDate(row.HANDOVER_DATE)
						, "HANDOVER_QTY" : row.HANDOVER_QTY, "MATERIAL_CODE" : row.MATERIAL_CODE, "PROJECT_NO" : row.PROJECT_NO, "RECEIVER_NAME" : row.RECEIVER_NAME};
				updateList.push(updateRow);
			}

			var list = JSON.stringify(updateList);
			var paramData = {"updateList" : list};

			$.ajax({
				url: "/saveDesmRsiOutSave.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {

						if(result.error == "QTY") {

							for(var i = 0; i < selectList.length; i++){
								var row = selectList[i];

								if(row.RSI_LINE_ID == result.RSI_LINE_ID) {
									row.HANDOVER_AVAILABLE_QTY = result.HANDOVER_AVAILABLE_QTY;
									dlgDesmOutGoingGrid.RefreshRow(row);

									var msg = $('#alertSaveRsiOutQtyErr').val() + "<br>RSI No. : " + row.RSI_NO + "<br>Package No : " + row.PACKAGE_NO + "<br>Description : " + row.DESCRIPTION;
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

						if(v_desm_out_going_callback) {
							v_desm_out_going_callback("save-item", null);
						}

						$('#dlgDesmOutGoingCreation').modal('hide');
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

function btnDlgDesmOutGoingCreationResetClick() {

	$('#txtDlgDesmOutGoingCreationPackageNo').val("");
	$('#txtDlgDesmOutGoingCreationRsiNo').val("");
	$('#txtDlgDesmOutGoingCreationMaterialCode').val("");
	$('#txtDlgDesmOutGoingCreationStartRequestDate').val("");
	$('#txtDlgDesmOutGoingCreationEndRequestDate').val("");
	$('#selDlgDesmOutGoingCreationAttribute10').val("");


	$('#txtDlgDesmOutGoingCreationDescription').val("");
	$('#txtDlgDesmOutGoingCreationDrawingNo').val("");
	$('#txtDlgDesmOutGoingCreationTagNo').val("");
	$('#txtDlgDesmOutGoingCreationRsiName').val("");

	$('#selDlgDesmOutGoingCreationType').val("");
	$('#txtDlgDesmOutGoingCreationCategory').val("");
	
	$('#txtDlgDesmOutGoingCreationSubcon').val("");

}