var gridLang = {};
var fileLang = "en";
var gridRole;

function gridResize() {
	$("#gridRole").width($("#divGrid").width());
	$("#gridRole").height($("body").height() - $("#toolbar").height() - 50);
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
	
			return false;
		}
	); 	
	
	$('#btnSend').click(function () { btnSendCilick(); return false; });
		
	initCode();
}

function initCode() {
	initTable();	
}

function initTable(){
	
	
	var gridCode = getGridCode();
	
	var gridRoleCol = {"Cfg": {"id"				: "gridRole"
								, "CfgId"			: "gridRoleCfg"
								, "SuppressCfg"		: "0"
								, "StyleLap"		: "0"
								, "Version"			: "0"
								, "CacheTimeout" : "100"
								, "Style"			: "Material"
								, "Size"			: "Normal"
								, "Scale"			: "90%"
								, "ConstWidth"		: "100%"
								, "MinTagHeight"	: "800"
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
								, "Sorting"			: "0"}
						,"Panel" : {"Visible" : "1"}
						, "Toolbar" : {
							"Cells20Data"		: "Export"
							, "Cells60Cfg"		: "Columns"
							, "Cells70Styles"	: "Styles,Sizes,Scales"
							, "Visible"			: "0"
						}
						, "Cols" : [
							{	"Name"	: "ROLE_NAME", "Width": "300", "Type": "Text" , "Class" : "gridLinkText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
						]
						,"Header" : {
							"ROLE_NAME"	: "Role Name", "Class" : "gridCenterText"
						}
						};
							
	gridRole = TreeGrid( {Layout:{Data : gridRoleCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridRole" );
	
	TGSetEvent("OnRenderFinish","gridRole",function(grid){
		gridResize();
		searchData();
	});	
	
	initMenuAuth(function (list) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];
			
			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();				
			}
		}
	});
}

function searchData() {
	$.ajax({
		async: false,
		type: "POST",
		url: "/getPermission.do",		
		data: {},
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
		
			gridRole.Source.Data.Data.Body = [data.results];
			gridRole.ReloadBody();	
        }
    });
}



function btnSendCilick() {
	gridRole.ActionAcceptEdit();
	
	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
	}
	
	var selectList = gridRole.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}	
	
	var chkValidation = checkRequiredField("sendCardBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	confirm_modal("", $('#alertSend').val(), null, function (callobj, result) {
		if(result) {
			
			var sendList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				var sendRow = objNullCheck({"ROLE_SEQ" : row.ROLE_SEQ});
				sendList.push(sendRow);	
			}
			

			var list = JSON.stringify(sendList);	
			var paramData = {"sendRoleList" : list, PROJECT_NO : $('#txtProjectCode').val(), TITLE : $('#txtTitle').val(), BODY : $('#txtContents').val()};
			
			$.ajax({			
				url: "/sendFcmRole.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSendSuccess').val());						
					}
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

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}
	
	return obj;	
}

