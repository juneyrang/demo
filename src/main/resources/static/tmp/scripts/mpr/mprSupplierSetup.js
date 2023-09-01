var gridLang = {};
var fileLang = "en";
var menuAuthList;
var desmMprSupplierSetupGrid;
var fileUse = true;
var toDay = "";

function gridResize() {
	$("#gridDesmMprSupplierSetup").width($(".table-responsive").width());
	$("#gridDesmMprSupplierSetup").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	initCode();
});

function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
		 	toDay = results.DAY[0].CUR_DAY;
			initControls();		
        }
    });

	
}

function initControls() {	
	
	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnResete').click(function () { btnReseteClick(); return false; });
	$('#btnSetup').click(function () { btnSetupClick(); return false; });
	$('#btnDelelte').click(function () { btnDelelteClick(); return false; });
	$('#btnSave').click(function () { btnSaveClick(); return false; });
	
	
	$("#txtSupplierName").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
	
	$("#txtSupplierNo").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});	
		
	initTable();
}

function initTable(){
	
	
	var gridCode = getGridCode();
	
	var desmMprSupplierSetupGridCol = {"Cfg": {"id"				: "desmMprSupplierSetupGrid"
									, "CfgId"			: "desmMprSupplierSetupGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "0"
									, "CacheTimeout" : "100"
									, "Style"			: "Material"
									, "Size"			: "Small"
									, "Scale"			: "90%"
									, "ConstWidth"		: "100%"
									, "MinTagHeight"	: "200"
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
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "STATUS", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "USER_NAME", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridLinkText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell"	: "openModal(Grid,Row,Col);" },
								{	"Name"	: "USER_AD", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MAIL", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "LAST_UPDATED_BY", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//								{ "Name": "ATT" , "Width": "180"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )"	, "IconSize" : "2"	},
								{	"Name"	: "IDCS_LAST_UPDATE_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "IDCS_CREATION_DATE", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "MEMO", "Width": "350", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"	: "Header",
								"id" : "Header",
								"Spanned" : "1",
								"PanelRowSpan" : "2",
								"Class" : "gridCenterText",
								"STATUS"	: "Status", "STATUSRowSpan" : "2",
								"USER_NAME"	: "Supplier Name", "USER_NAMERowSpan" : "2",
								"USER_AD"	: "Account ID​", "USER_ADRowSpan" : "2",
								"MAIL"	: "E-mail​", "MAILRowSpan" : "2",
								"LAST_UPDATED_BY"	: "Updated by​", "LAST_UPDATED_BYRowSpan" : "2",
//								"ATT"	: "Attachment files​", "ATTRowSpan" : "2",
								"IDCS_LAST_UPDATE_DATE"	: "Update Date​", "IDCS_LAST_UPDATE_DATERowSpan" : "2",
								"IDCS_CREATION_DATE"	: "Registration Date​", "IDCS_CREATION_DATERowSpan" : "2",
								"MEMO"	: "Memo", "MEMORowSpan" : "2"
								},
							   {"Kind"	: "Header",
								"Spanned" : "1",
								"Class" : "gridCenterText",
								"STATUS"	: "Status",
								"USER_NAME"	: "Supplier Name",
								"USER_AD"	: "Account ID​",
								"MAIL"	: "E-mail​",
								"LAST_UPDATED_BY"	: "Updated by​",
//								"ATT"	: "Attachment files​",
								"IDCS_LAST_UPDATE_DATE"	: "Update Date​",
								"IDCS_CREATION_DATE"	: "Registration Date​",
								"MEMO"	: "Memo"
								}
							]
							};
							
	desmMprSupplierSetupGrid = TreeGrid( {Layout:{Data : desmMprSupplierSetupGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDesmMprSupplierSetup" );
	
	TGSetEvent("OnRenderFinish","desmMprSupplierSetupGrid",function(grid){
		gridResize();
		gridReloadFn(grid);
	});	
	
	initMenuAuth(function (list) {
		menuAuthList = list; 
		for(var i = 0; i < list.length; i++){
			var row = list[i];
			
			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
				
				if(row.AUTH_CODE == "S") {
					fileUse = false;
				}				
			}
		}
	});
}


function openAttModal (grid,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}
		
	var param = Object.assign({}, row);
	
	if(param.ATTACH_GRP_CD == null) {
		param.ATTACH_GRP_CD = "";
	}
	
	param.fileUse = fileUse;
	param.MPR_SUPPLIER_YN = "Y";
	
	$('#desmMprSupplierSetuppPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
		
		if(status == "success"){
				
			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}			
			});
		}
	});		
			
	
}

function gridReloadFn(grid) {
	var list = grid.Rows;
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(gridRow.Fixed == null){
			gridRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg';
			grid.RefreshRow(gridRow);
		}
	} 
}


function btnSearchClick() {
	
	var paramData = {USER_NAME : $('#txtSupplierName').val(), USER_AD : $('#txtSupplierNo').val()};
	
	$.ajax({
		url: "/getDesmSupplierSetupList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			desmMprSupplierSetupGrid.Source.Data.Data.Body = [data.results];
			desmMprSupplierSetupGrid.Reload();
			
        }
    });		            
}

function openModal(grid,row,col) {
	var param = {SUPPLIER_NAME : row.USER_NAME, SUPPLIER_NO : row.SUPPLIER_NO, P_USER_AD : row.USER_AD, MAIL : row.MAIL, MEMO : row.MEMO,
			     FEDERATED_YN : row.FEDERATED_YN, IDCS_ID : row.IDCS_ID, "menuAuthList" : menuAuthList};
	
	$('#desmMprSupplierSetuppPopUp').load("/desmSupplierSetupPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmSupplierSetupPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});	
			
		}
	});
}

function btnReseteClick() {
	$('#txtSupplierName').val("");
	$('#txtSupplierNo').val("");
}

function btnSetupClick() {
	var param = {"menuAuthList" : menuAuthList};

	$('#desmMprSupplierSetuppPopUp').load("/desmSupplierSetupPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmSupplierSetupPopUp(param, function (key, returnParam) {
				
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});	
			
		}
	});
}

function btnDelelteClick(){
	desmMprSupplierSetupGrid.ActionAcceptEdit();
	
	var selectList = desmMprSupplierSetupGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				var deleteRow = objNullCheck({"P_USER_AD" : row.USER_AD});
				deleteList.push(deleteRow);		
			}
			
			var list = JSON.stringify(deleteList);	
			var paramData = {"deleteList" : list};
			
			$.ajax({			
				url: "/deleteDesmSupplierSetupData.do",
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

function btnSaveClick() {
	desmMprSupplierSetupGrid.ActionAcceptEdit();
	
	var changeObject = desmMprSupplierSetupGrid.GetChanges();
	var changelList = JSON.parse(changeObject).Changes;	
	
    var updateList = [];
	for(var i = 0; i < changelList.length; i++){
		var rowId = changelList[i].id;
		var row = desmMprSupplierSetupGrid.GetRowById(rowId);
		
		var updateRow = objNullCheck({P_USER_AD : row.USER_AD, MEMO : row.MEMO});
							 
		updateList.push(updateRow);			
	}
	var list = JSON.stringify(updateList);	
	
	$.ajax({			
		url: "/saveDesmSupplierSetupMemo.do",
		data: {updateList : list},
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				alert_success($('#alertSuccess').val());
				$('#btnSearch').click();
			}
		}
	});			
}


