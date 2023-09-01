var gridLang = {};
var fileLang = "en";
var idsmSchmapGrid;
var dataYn = "N";

function gridResize() {
	$("#gridIdsmSchmap").width($("body").width() - 35);
	$("#gridIdsmSchmap").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
			dataYn = ui.item.value.split("|")[3];
			
			setDataBtn();
	
			return false;
		}
	); 	

	$('#btnSyncData').hide();
	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnNewData').click(function () { btnNewDataClick("C"); return false; });
	$('#btnSyncData').click(function () { btnNewDataClick("S"); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });
	$('#btnExcelDownload').click(function () { btnExcelDownloadClick(); return false; });
	$('#btnExcelUpload').click(function () { btnExcelUploadClick(); return false; });
	
	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
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
	var idsmSchmapGridCol = {"Cfg": {"id"				: "idsmSchmapGrid"
									, "CfgId"			: "idsmSchmapGridCfg"
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
								{	"Name"	: "TRK_ITEM_NAME1", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "TRK_ITEM_NAME2", "Width": "400", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "TRK_ITEM_NAME3", "Width": "500", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "TRK_ITEM_NAME4", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "MAP_TASK_NUMBER", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
							]
							,"Header" : {
								"TRK_ITEM_NAME1"	: "Item1", "Class" : "gridCenterText",
								"TRK_ITEM_NAME2"	: "Item1-Item2",
								"TRK_ITEM_NAME3"	: "Item1-Item2-Item3",
								"TRK_ITEM_NAME4"	: "Item1-Item2-Item3-Item4",
								"MAP_TASK_NUMBER"	: "Task Code"
							}
							};
							
	idsmSchmapGrid = TreeGrid( {Layout:{Data : idsmSchmapGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridIdsmSchmap" );	
	
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

	$('#dlgIdsmSchmapPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtProjectCode").val(returnParam.SEGMENT1);
					$("#txtProjectName").val(returnParam.NAME);
					dataYn = returnParam.DATA_YN;					
				}
			});	
		}
	});	
}

function setDataBtn(){

	if(dataYn == "Y"){
		$('#btnNewData').hide();
		$('#btnSyncData').show();
	}
	else {
		$('#btnNewData').show();
		$('#btnSyncData').hide();	
	}
}

function btnReseteClick() {

	$('#txtProjectCode').val("");
	$('#txtProjectName').val("");
	$('#txtItem1').val("");
	$('#txtItem2').val("");
	$('#txtItem3').val("");
	$('#txtItem4').val("");
	$('#txtTaskCode').val("");
	$('#chkItem').prop("checked", false);
	$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	
	dataYn = "N";	
	setDataBtn();
}

function btnSearchClick() {
	
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
		
		dataYn = "N";	
		setDataBtn();
	}
	
	var chkValidation = checkRequiredField("tblSearchBox");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	var check = "N";	
	if($('#chkItem').is(":checked")){
		check = "Y";
	}
	
	var paramData = {PROJECT_NO : $('#txtProjectCode').val(), 
					 TRK_ITEM_NAME1 : $('#txtItem1').val(),
					 TRK_ITEM_NAME2 : $('#txtItem2').val(),
					 TRK_ITEM_NAME3 : $('#txtItem3').val(),
					 TRK_ITEM_NAME4 : $('#txtItem4').val(),
					 MAP_TASK_NUMBER : $('#txtTaskCode').val(),
					 NOT_MAP_FLAG : check};
	
	$.ajax({
		url: "/getIdsmSchmapList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			console.log("data", data);
			
			dataYn = data.results.resultInfo.DATA_YN;	
			setDataBtn();
			
			$('#spanInfo').text("▶신규생성 대상 건수 : " + data.results.resultInfo.INS_CNT + "건 , ▶삭제 대상 건수 : " + data.results.resultInfo.DEL_CNT + "건")
			
			idsmSchmapGrid.Source.Data.Data.Body = [data.results.resultList];
			idsmSchmapGrid.Reload();
			
			
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

function btnNewDataClick(type) {
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
		
		dataYn = "N";	
		setDataBtn();
	}
	
	var chkValidation = checkRequiredField("tblSearchBox");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	var paramData = {PROJECT_NO : $('#txtProjectCode').val(),
					 TYPE : type};
	
	$.ajax({			
		url: "/saveIdsmSchmapList.do",
		data: paramData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				alert_success($('#alertSaveSuccess').val());					
				btnSearchClick();
			}
		}		
	});		
}

function btnSaveClick(){

	idsmSchmapGrid.ActionAcceptEdit();
	
	var changeObject = idsmSchmapGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;
	
	if(changeList.length == 0){
		alert_modal("", $('#alertGridDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {	
			var insertList = [];
			
			for(var i = 0; i < changeList.length; i++){
				var rowId = changeList[i].id;
				var row = idsmSchmapGrid.GetRowById(rowId);		
				
				var taskNumber = row.MAP_TASK_NUMBER == null ? "" : row.MAP_TASK_NUMBER;
				
				var insertRow = {"TRK_PATH" : row.TRK_PATH, "PROJECT_NO" : row.PROJECT_NO, 
								 "MAP_TASK_NUMBER" : taskNumber};
								 
				insertList.push(insertRow);		
			}
			
			var list = JSON.stringify(insertList);	
			var paramData = {"list" : list};	
			
			$.ajax({			
				url: "/saveIdsmSchmap.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						btnSearchClick();
					}
				}
			});				
		}
	});	
}

function btnExcelDownloadClick() {

		idsmSchmapGrid.ExportFormat="xlsx";
		 
		idsmSchmapGrid.ActionExport();
		
		$(".TMMenuMain").hide();
		$(".TMMenuShadow").hide();
		$(".GridDisabled").hide();
		$("button[id^='TGMenuOk']").click();
}

function btnExcelUploadClick() {

	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
		
		dataYn = "N";	
		setDataBtn();
	}
	
	var chkValidation = checkRequiredField("tblSearchBox");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}


	var param = {"PROJECT_NO" : $('#txtProjectCode').val()};

	$('#dlgIdsmSchmapPopUp').load("/idsmSchmapExcelUploadPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
			initIdsmSchmapExcelUploadPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					btnSearchClick();			
				}
			});	
		}
	});	
}


