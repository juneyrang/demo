var gridLang = {};
var fileLang = "en";
var subconGrid;
var menuAuthList;
var gridReload = false;

function gridResize() {	
	$("#gridStrategicEws").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	initControls();
	gridResize();
});


function initControls() {

	$('#btnAdd').click(function () { btnAddClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnDelete').click(function () { btnDeleteClick(); return false; });

	$("#txtUserAd").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtUserName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	initCode();
}

function initCode() {

	initTable();
}

function initTable(){
	var gridCode = getGridCode();
	var strategicEwsGridCol = {"Cfg": {"id"				: "strategicEwsGrid"
									, "CfgId"			: "strategicEwsGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "0"
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
									, "SafeCSS"			: "1"
									, "Code" : gridCode
									,"CopyCols" : "0"
									, "Sorting"			: "1"}
							,"Panel" : {"Visible" : "1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "EWS_DESC", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								//{	"Name"	: "RECEIVER_AD", "Width": "200", "Type": "Text" , "Class" : "gridLinkText", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "RECEIVER_AD", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "USER_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "MAIL", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "ZORG_NM", "Width": "400", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
							]
							,"Header" : {
								"Class" : "gridCenterText",
								"EWS_DESC"	: "EWS Name",
								"RECEIVER_AD"	: "User ID",
								"USER_NAME"	: "User Name",
								"MAIL"	: "E-Mail",
								"ZORG_NM": "Dept."
							}
						};

	strategicEwsGrid = TreeGrid( {Layout:{Data : strategicEwsGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridStrategicEws" );

	TGSetEvent("OnRenderFinish","strategicEwsGrid",function(grid){
		gridReload = true;
	});

	initMenuAuth(function (list) {
		menuAuthList = list;
		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	});

}

function btnSearchClick() {
	var paramData = {P_USER_AD : $('#txtUserAd').val(),
					 USER_NAME : $('#txtUserName').val(),
					 EWS_NAME : $('#selStrategicEwsName').val()};

	$.ajax({
		url: "/getStrategicEwsList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			strategicEwsGrid.Source.Data.Data.Body = [data.results];
			strategicEwsGrid.ReloadBody();
        }
    });
}

function btnDeleteClick() {
	strategicEwsGrid.ActionAcceptEdit();

	var deleteList = [];
	var selectList = strategicEwsGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				var deleteRow = {"P_USER_AD" : row.RECEIVER_AD, "EWS_NAME" : row.EWS_NAME};
				deleteList.push(deleteRow);
			}

			var list = JSON.stringify(deleteList);
			var paramData = {"deleteList" : list};

			$.ajax({
				//url: "/deleteDesmSubconList.do",
				url: "/deleteStrategicEwsList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertDeleteSuccess').val());
						$('#btnSearch').click();
					}
				}
			});
		}
	});
}

function btnAddClick() {
	var param = {EDIT_TYPE : "S", "menuAuthList" : menuAuthList};

	//$('#dlgSubconPopUp').load("/desmSubconCreationPopUp.do",null,function(data, status, xhr) {
	$('#dlgStrategicEwsPopUp').load("/desmStrategicEwsCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initStrategicEwsReceiverPopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					$('#btnSearch').click();
				}
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