var gridLang = {};
var fileLang = "en";
var desmSiteProjectUserGrid;
var desmSiteProjectGrid;
var setlectRow = null;
var gridReload = false;

function gridResize() {
	$("#gridDesmSiteProjectUser").width($("#divUserGird").width());
	$("#gridDesmSiteProjectUser").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);

	$("#gridDesmSiteProject").width($("#divProjectGird").width());
	$("#gridDesmSiteProject").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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
		"/getDesmSiteProjectList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtProjectName").val(ui.item.value.split("|")[2]);

			return false;
		}
	);

	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnSearch').click(function () { if(gridReload){btnSearchClick();} return false; });
	$('#btnAdd').click(function () { btnAddClick(); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });
	$('#btnDelete').click(function () { btnDeleteClick(); return false; });



	$("#txtUser").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtUserId").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});

	$("#txtProjectCode").keydown( function( keyInfo ) {
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
	var desmSiteProjectUserGridCol = {"Cfg": {"id"				: "desmSiteProjectUserGrid"
									, "CfgId"			: "desmSiteProjectUserGridCfg"
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
								{	"Name"	: "USER_NAME", "Width": "180", "Type": "Text" , "Class" : "gridLinkText", "CanMove" : "0", "CanEdit": "0", "OnClickCell"	: "gridClick(Grid,Row,Col);" },
								{	"Name"	: "USER_AD", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "OnClickCell"	: "gridClick(Grid,Row,Col);" },
								{	"Name"	: "DEPT_NAME", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "OnClickCell"	: "gridClick(Grid,Row,Col);" },
								{	"Name"	: "ROLE_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "OnClickCell"	: "gridClick(Grid,Row,Col);" }


							]
							,"Header" : {
								"USER_NAME"	: "Name", "Class" : "gridCenterText",
								"USER_AD"	: "ID",
								"DEPT_NAME"	: "Dept Name",
								"ROLE_NAME"	: "Site Role"
							}
							};

	var desmSiteProjectGridCol = {"Cfg": {"id"				: "desmSiteProjectGrid"
									, "CfgId"			: "desmSiteProjectGridCfg"
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
									, "Sorting"			: "0"}
							,"Panel" : {"Visible" : "1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "SEGMENT1", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "NAME", "Width": "700", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" }
							]
							,"Header" : {
								"SEGMENT1"	: "Project Code", "Class" : "gridCenterText",
								"NAME"	: "Project Description"
							}
							};

	desmSiteProjectUserGrid = TreeGrid( {Layout:{Data : desmSiteProjectUserGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDesmSiteProjectUser" );
	desmSiteProjectGrid = TreeGrid( {Layout:{Data : desmSiteProjectGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDesmSiteProject" );

	TGSetEvent("OnRenderFinish","desmSiteProjectUserGrid",function(grid){
		gridReload = true;
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

function iconProjectSearchClick(){
	var param = {keyword : $('#txtProjectCode').val(), TYPE : "SITE"};

	$('#dlgIdsmProjectMgtPopUp').load("/idsmProjectMgtPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectMgtPopUp(param, function (key, returnParam) {

				if(key == "select-item"){
					$("#txtProjectCode").val(returnParam.SEGMENT1);
					$("#txtProjectName").val(returnParam.NAME);
				}
			});
		}
	});
}


function btnReseteClick() {

	$('#txtProjectCode').val("");
	$('#txtProjectName').val("");
	$('#txtUser').val("");
	$('#txtUserId').val("");
	$("#txtProjectCode").parent().find(".autocomplete-valid").hide();

}

function btnDeleteClick() {
	desmSiteProjectUserGrid.ActionAcceptEdit();
	desmSiteProjectGrid.ActionAcceptEdit();


	var deleteList = [];
	var selectList = desmSiteProjectGrid.GetSelRows();

	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];

				if(row.Added != null && row.Added == 1){
					desmSiteProjectGrid.RemoveRow(row);
				}
				else{
					var deleteRow = {"PROJECT_CODE" : row.SEGMENT1, "P_USER_AD" : row.USER_AD};
					deleteList.push(deleteRow);
				}
			}

			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);
				var paramData = {"deleteList" : list};

				$.ajax({
					url: "/deleteIdsmProjectMgt.do",
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
			else{
				alert_success($('#alertDeleteSuccess').val());
			}
		}
	});
}


function btnSaveClick() {

	desmSiteProjectUserGrid.ActionAcceptEdit();
	desmSiteProjectGrid.ActionAcceptEdit();

	var changeUserObject = desmSiteProjectUserGrid.GetChanges();
	var changeUserList = JSON.parse(changeUserObject).Changes;

	var changeProjectObject = desmSiteProjectGrid.GetChanges();
	var changeProjectList = JSON.parse(changeProjectObject).Changes;

	if(changeUserList.length == 0 && changeProjectList.length == 0){
		alert_modal("", $('#alertGridDataNull').val());
		return;
	}

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {

			var updateUserList = [];
			for(var i = 0; i < changeUserList.length; i++){
				var rowId = changeUserList[i].id;
				var row = desmSiteProjectUserGrid.GetRowById(rowId);

				var updateUserRow = {"P_USER_AD" : row.USER_AD, "ALL_FLAG" : "0"};
				updateUserList.push(updateUserRow);
			}
			var updateUserListJson = JSON.stringify(updateUserList);

			var updateProjectList = [];
			for(var i = 0; i < changeProjectList.length; i++){
				var rowId = changeProjectList[i].id;
				var row = desmSiteProjectGrid.GetRowById(rowId);

				var updateProjectRow = {"PROJECT_ID" : row.PROJECT_ID, "PROJECT_CODE" : row.SEGMENT1, "NAME" : row.NAME, "P_USER_AD" : row.USER_AD};
				updateProjectList.push(updateProjectRow);
			}
			var updateProjectListJson = JSON.stringify(updateProjectList);

			var paramData = {"updateUserList" : updateUserListJson, "updateProjectList" : updateProjectListJson, "P_USER_AD" : setlectRow.USER_AD, "SITE_YN" : "Y"};

			$.ajax({
				url: "/saveIdsmProjectMgt.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						$('#btnSearch').click();
					}
				}
			});


		}
	});
}


function btnAddClick() {
	desmSiteProjectUserGrid.ActionAcceptEdit();
	desmSiteProjectGrid.ActionAcceptEdit();

	if(setlectRow == null){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var param = {TYPE : "SITE"};

	$('#dlgIdsmProjectMgtPopUp').load("/idsmProjectMgtAddPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectMgtAddPopUp(param, function (key, returnParam) {

				if(key == "select-item"){

					var list = returnParam;
					var gridList = desmSiteProjectGrid.Rows;

					for(var i = 0; i < list.length; i++) {
						var row = list[i];
						var itemCheck = true;

						for (var key in gridList) {
							var gridRow = gridList[key];

							if(gridRow.Fixed == null){
								if(row.SEGMENT1 == gridRow.SEGMENT1){
									itemCheck = false;
								}
							}
						}

						if(itemCheck) {
							var tempRow = desmSiteProjectGrid.AddRow(null,null,1,null,null);
							tempRow.SEGMENT1 = row.SEGMENT1;
							tempRow.NAME = row.NAME;
							tempRow.PROJECT_ID = row.PROJECT_ID;
							tempRow.USER_AD = setlectRow.USER_AD;

							desmSiteProjectGrid.RefreshRow(tempRow);
						}
					}
				}
			});
		}
	});
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
					 USER_NAME : $('#txtUser').val(),
					 USER_ID : $('#txtUserId').val()
					 };

	$.ajax({
		url: "/getDesmSiteProjectUserList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {


			desmSiteProjectUserGrid.Source.Data.Data.Body = [data.results];
			desmSiteProjectUserGrid.ReloadBody();

			desmSiteProjectGrid.Source.Data.Data.Body = [[]];
			desmSiteProjectGrid.ReloadBody();

			setlectRow = null

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

function gridClick(Grid,Row,Col) {

	desmSiteProjectUserGrid.ActionAcceptEdit();

	setlectRow = Row;

	searchUserProject();


}

function searchUserProject() {

	var paramData = {USER_AD : setlectRow.USER_AD};

	$.ajax({
		url: "/getIdsmProjectMgtProjectList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			desmSiteProjectGrid.Source.Data.Data.Body = [data.results];
			desmSiteProjectGrid.ReloadBody();
        }
    });
}


