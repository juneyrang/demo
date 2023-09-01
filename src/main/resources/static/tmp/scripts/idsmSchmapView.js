var gridLang = {};
var fileLang = "en";
var idsmSchmapViewGrid;


function gridResize() {
	$("#gridIdsmSchmapView").width($("body").width() - 35);
	$("#gridIdsmSchmapView").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
	
	makeAutocomplete(
		"txtProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtProjectName").val(ui.item.value.split("|")[2]);
			
			$('#btnSearch').click();
			return false;
		}
	);
	
	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnExcelDownload').click(function () { btnExcelDownloadClick(); return false; });
	$('#btnSyncData').click(function () { btnSyncDataClick(); return false; });
	
	$("#txtItem1").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});		
	
	$("#txtItem2").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtItem3").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtItem4").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtTaskCode").keydown( function( keyInfo ) {
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
	var idsmSchmapViewGridCol = {"Cfg": {"id"				: "idsmSchmapViewGrid"
									, "CfgId"			: "idsmSchmapViewGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "1"
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
									, "SelectingSingle" : "1"
									, "Adding"			: "0"
									, "Export"			: "1"
									, "Deleting"		: "0"
									, "ConstHeight"		: "1"
									, "SafeCSS"			: "1"
									, "Code" : gridCode
									,"CopyCols" : "0"
									, "Sorting"			: "0"}
							,"Panel" : {"Visible" : "0"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "TRK_ITEM_NAME1", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "TRK_ITEM_NAME2", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "TRK_ITEM_NAME3", "Width": "500", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "TRK_ITEM_NAME4", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "MAP_TASK_NUMBER", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "BLR_INFO", "Width": "500", "Type": "Text" , "Class" : "gridLinkText", "CanMove" : "0", "CanEdit": "0", "OnClickCell"	: "openModal(Grid,Row,Col);" }
							]
							,"Header" : {
								"TRK_ITEM_NAME1"	: "Item1", "Class" : "gridCenterText",
								"TRK_ITEM_NAME2"	: "Item1-Item2",
								"TRK_ITEM_NAME3"	: "Item1-Item2-Item3",
								"TRK_ITEM_NAME4"	: "Item1-Item2-Item3-Item4",
								"MAP_TASK_NUMBER"	: "Task Code",
								"BLR_INFO"	: "VTS Activity/발주품목"
							}
							};
							
	idsmSchmapViewGrid = TreeGrid( {Layout:{Data : idsmSchmapViewGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridIdsmSchmapView" );	
	
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
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);
		}
	});									

}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val()};

	$('#dlgIdsmSchmapViewPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtProjectCode").val(returnParam.SEGMENT1);
					$("#txtProjectName").val(returnParam.NAME);
									
					$('#btnSearch').click();										
				}
			});	
		}
	});	
}


function btnReseteClick() {

	$('#txtProjectCode').val("");
	$('#txtProjectName').val("");
	$('#txtItem1').val("");
	$('#txtItem2').val("");
	$('#txtItem3').val("");
	$('#txtItem4').val("");
	$('#txtTaskCode').val("");
	$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	
}

function btnSearchClick() {
	
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
	

	
	var paramData = {PROJECT_NO : $('#txtProjectCode').val(), 
					 TRK_ITEM_NAME1 : $('#txtItem1').val(),
					 TRK_ITEM_NAME2 : $('#txtItem2').val(),
					 TRK_ITEM_NAME3 : $('#txtItem3').val(),
					 TRK_ITEM_NAME4 : $('#txtItem4').val(),
					 MAP_TASK_NUMBER : $('#txtTaskCode').val()};
	
	$.ajax({
		url: "/getIdsmSchmapViewList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			
			idsmSchmapViewGrid.Source.Data.Data.Body = [data.results];
			idsmSchmapViewGrid.Reload();
			
			
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


function btnSyncDataClick(){

	idsmSchmapViewGrid.ActionAcceptEdit();
	
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
	
	confirm_modal("", $('#alertSyncDate').val(), null, function (callobj, result) {
		if(result) {	
			
			var paramData = {PROJECT_NO : $('#txtProjectCode').val()};
			
			$.ajax({			
				url: "/syncIdsmSchmapView.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
					}
				}
			});				
		}
	});	
}

function btnExcelDownloadClick() {

		idsmSchmapViewGrid.ExportFormat="xlsx";
		 
		idsmSchmapViewGrid.ActionExport();
		
		$(".TMMenuMain").hide();
		$(".TMMenuShadow").hide();
		$(".GridDisabled").hide();
		$("button[id^='TGMenuOk']").click();
}

function openModal (G,row,col) {
	
	
	if(row.BLR_INFO == null || row.BLR_INFO == ""){
		return;
	}
	
	
	$('#dlgIdsmSchmapViewPopUp').load("/idsmSchmapViewDetailPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
			initIdsmSchmapViewDetailPopUp(row, function (key, returnParam) {
				
				
			});	
		}
	});		
	
}


