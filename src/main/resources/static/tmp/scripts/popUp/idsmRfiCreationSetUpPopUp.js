var v_idsm_rfi_creation_setup_callback = null;
var v_idsm_rfi_creation_setup_param;
var dlgAppliedProcedureGrid;
var dlgProcedureGrid;
var dlgInspectionGrid;

function initIdsmRfiCreationSetUpPopUp(param , callback) {
	v_idsm_rfi_creation_setup_callback = callback;
    v_idsm_rfi_creation_setup_param = param;
    
    $('#dlgIdsmRfiCreationSetup').modal('show');
    
    initIdsmRfiCreationSetUpPopUpCode();    
}

function initIdsmRfiCreationSetUpPopUpCode() {
    
    initIdsmRfiCreationSetUpPopUpControls();
}


function initIdsmRfiCreationSetUpPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	
	$('#dlgIdsmRfiCreationSetup').on('shown.bs.modal', function () {
		$('#dlgIdsmRfiCreationSetup').click();
	});	
	
	$('#dlgIdsmRfiCreationSetup').on('hidden.bs.modal', function () {
	  	closeIdsmRfiCreationSetUpPopUp();
	})			

	$('#btnDlgIdsmRfiCreationSetupAppliedProcedureAdd').click(function () { btnDlgIdsmRfiCreationSetupAppliedProcedureAddClick(); return false; });
	$('#btnDlgIdsmRfiCreationSetupAppliedProcedureDelete').click(function () { btnDlgIdsmRfiCreationSetupAppliedProcedureDeleteClick(); return false; });
	$('#btnDlgIdsmRfiCreationSetupProcedureAdd').click(function () { btnDlgIdsmRfiCreationSetupProcedureAddClick(); return false; });
	$('#btnDlgIdsmRfiCreationSetupProcedureDelete').click(function () { btnDlgIdsmRfiCreationSetupProcedureDeleteClick(); return false; });
	$('#btnDlgIdsmRfiCreationSetupInspectionAdd').click(function () { btnDlgIdsmRfiCreationSetupInspectionAddClick(); return false; });
	$('#btnDlgIdsmRfiCreationSetupInspectionDelete').click(function () { btnDlgIdsmRfiCreationSetupInspectionDeleteClick(); return false; });
	$('#btnDlgIdsmRfiCreationSetUpSave').click(function () { btnDlgIdsmRfiCreationSetUpSaveClick(); return false; });	
	
			
	var gridCode = getGridCode();
	var dlgAppliedProcedureGridCol = {"Cfg" : { "id" : "idsmDlgAppliedProcedureGrid", "CfgId" : "idsmDlgAppliedProcedureGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "CacheTimeout" : "100", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Small", "Scale" : "90%"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "150","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0", "Code" : gridCode,"CopyCols" : "0"
						,"SafeCSS" : "1", "Sorting" : "0"}
						,"Panel" : {"Visible" : "1"}
						,"Toolbar" : {"Visible" : "0"}
						, "Cols" : [
							{	"Name"	: "NAME", "Width": "900", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" }
						]
						,"Header" : {
							"NAME"	: "Name", "Class" : "gridCenterText"
						}
	};	
	
	var dlgProcedureGridCol = {"Cfg" : { "id" : "idsmDlgProcedureGrid", "CfgId" : "idsmDlgProcedureGridColCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "Style" : "Material", "Size" : "Small", "Scale" : "90%"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "150","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0", "Code" : gridCode,"CopyCols" : "0"
						,"SafeCSS" : "1", "Sorting" : "0"}
						,"Panel" : {"Visible" : "1"}
						,"Toolbar" : {"Visible" : "0"}
						, "Cols" : [
							{	"Name"	: "NAME", "Width": "900", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" }
						]
						,"Header" : {
							"NAME"	: "Name", "Class" : "gridCenterText"
						}
	};	
	
	var dlgInspectionGridCol = {"Cfg" : { "id" : "idsmDlgInspectionGrid", "CfgId" : "idsmDlgInspectionGridCfg", "SuppressCfg" : "0", "StyleLap":"0", "Version" : "1", "CacheTimeout" : "100", "Style" : "Material", "Size" : "Small", "Scale" : "90%"
	                    ,"ConstWidth" : "100%", "MinTagHeight": "150","MaxHeight": "1" ,"Paging": "2", "PageLength": "20", "ChildParts" : "2" , "NoPager" : "1"
						,"Dragging" : "0", "SelectingSingle" : "0", "Adding" : "0", "Export" : "1", "Deleting" : "0", "Code" : gridCode,"CopyCols" : "0"
						,"SafeCSS" : "1", "Sorting" : "0"}
						,"Panel" : {"Visible" : "1"}
						,"Toolbar" : {"Visible" : "0"}
						, "Cols" : [
							{	"Name"	: "NAME", "Width": "900", "Type": "Text" ,"Spanned" : "1" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" }
						]
						,"Header" : {
							"NAME"	: "Name", "Class" : "gridCenterText"
						}
	};		
	
	dlgAppliedProcedureGrid = TreeGrid( {Layout:{Data : dlgAppliedProcedureGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmRfiCreationSetupAppliedProcedure" );
	dlgProcedureGrid = TreeGrid( {Layout:{Data : dlgProcedureGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmRfiCreationSetupProcedure" );
	dlgInspectionGrid = TreeGrid( {Layout:{Data : dlgInspectionGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgIdsmRfiCreationSetupInspection" );	
	
	
	SearchData(1, 1, 1, 1);
}

function closeIdsmRfiCreationSetUpPopUp() {
	dlgAppliedProcedureGrid.Dispose();
	dlgProcedureGrid.Dispose();
	dlgInspectionGrid.Dispose();
}

function btnDlgIdsmRfiCreationSetupAppliedProcedureAddClick() {
		var row = dlgAppliedProcedureGrid.AddRow(null,null,1,null,null);
		dlgAppliedProcedureGrid.RefreshRow(row);		
}

function btnDlgIdsmRfiCreationSetupAppliedProcedureDeleteClick() {
	var deleteList = [];
	var selectList = dlgAppliedProcedureGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());	
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgAppliedProcedureGrid.RemoveRow(row);
				}
				else{
					var deleteRow = {"SEQ" : row.SEQ};
					deleteList.push(deleteRow);			
				}
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteIdsmCreateItemSetupAppliedProcedure.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							
							SearchData(1, 0, 0, 0);
								
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

function btnDlgIdsmRfiCreationSetupProcedureAddClick() {
		var row = dlgProcedureGrid.AddRow(null,null,1,null,null);
		dlgProcedureGrid.RefreshRow(row);		
}

function btnDlgIdsmRfiCreationSetupProcedureDeleteClick() {
	var deleteList = [];
	var selectList = dlgProcedureGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());	
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgProcedureGrid.RemoveRow(row);
				}
				else{
					var deleteRow = {"SEQ" : row.SEQ};
					deleteList.push(deleteRow);			
				}
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteIdsmCreateItemSetupProcedure.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							
							SearchData(0, 1, 0, 0);
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

function btnDlgIdsmRfiCreationSetupInspectionAddClick() {
		var row = dlgInspectionGrid.AddRow(null,null,1,null,null);
		dlgInspectionGrid.RefreshRow(row);		
}

function btnDlgIdsmRfiCreationSetupInspectionDeleteClick() {
	var deleteList = [];
	var selectList = dlgInspectionGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());	
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgInspectionGrid.RemoveRow(row);
				}
				else{
					var deleteRow = {"SEQ" : row.SEQ};
					deleteList.push(deleteRow);			
				}
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteIdsmCreateItemSetupInspection.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							
							SearchData(0, 0, 1, 0);
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

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}	
}

function btnDlgIdsmRfiCreationSetUpSaveClick(){

	dlgAppliedProcedureGrid.ActionAcceptEdit();
	dlgProcedureGrid.ActionAcceptEdit();
	dlgInspectionGrid.ActionAcceptEdit();

	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			
			var AppliedProcedureUpdateList = [];			
			var AppliedProcedureChangeObject = dlgAppliedProcedureGrid.GetChanges();
			var AppliedProcedureChangeList = JSON.parse(AppliedProcedureChangeObject).Changes;	
			
			for(var i = 0; i < AppliedProcedureChangeList.length; i++){
				var rowId = AppliedProcedureChangeList[i].id;
				var row = dlgAppliedProcedureGrid.GetRowById(rowId);	
				
				var updateRow = {"SEQ" : row.SEQ, "NAME" : row.NAME};
				objNullCheck(updateRow);
				AppliedProcedureUpdateList.push(updateRow);		
			}
			
			var AppliedProcedureList = JSON.stringify(AppliedProcedureUpdateList);
			
			var ProcedureUpdateList = [];			
			var ProcedureChangeObject = dlgProcedureGrid.GetChanges();
			var ProcedureChangeList = JSON.parse(ProcedureChangeObject).Changes;	
			
			for(var i = 0; i < ProcedureChangeList.length; i++){
				var rowId = ProcedureChangeList[i].id;
				var row = dlgProcedureGrid.GetRowById(rowId);	
				
				var updateRow = {"SEQ" : row.SEQ, "NAME" : row.NAME};
				objNullCheck(updateRow);
				
				ProcedureUpdateList.push(updateRow);		
			}
			
			var ProcedureList = JSON.stringify(ProcedureUpdateList);	
			
			var InspectionUpdateList = [];			
			var InspectionChangeObject = dlgInspectionGrid.GetChanges();
			var InspectionChangeList = JSON.parse(InspectionChangeObject).Changes;	
			
			for(var i = 0; i < InspectionChangeList.length; i++){
				var rowId = InspectionChangeList[i].id;
				var row = dlgInspectionGrid.GetRowById(rowId);	
				
				var updateRow = {"SEQ" : row.SEQ, "NAME" : row.NAME};
				objNullCheck(updateRow);
				InspectionUpdateList.push(updateRow);		
			}
			
			var InspectionList = JSON.stringify(InspectionUpdateList);						
			
			
			
			var paramData = {"AppliedProcedureUpdateList" : AppliedProcedureList,
						     "ProcedureUpdateList" : ProcedureList,
						     "InspectionUpdateList" : InspectionList,	
						     "NAME" : $('#txtDlgIdsmRfiCreationSetupAttachments').val()};	
			
			$.ajax({			
				url: "/saveIdsmRfiCreationSetUp.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());					
						SearchData(AppliedProcedureChangeList.length, ProcedureChangeList.length, InspectionChangeList.length, 1);
					}
				}		
			});			
		}
	});	
}

function SearchData(AppliedProcedureCnt, ProcedureCnt, InspectionCnt, AttachmentsCnt){
	if(AppliedProcedureCnt > 0){
		SearchAppliedProcedureGrid();
	}
	
	if(ProcedureCnt > 0){
		SearchProcedureGrid();
	}
	
	if(InspectionCnt > 0){
		SearchInspectionGrid();
	}	
	
	if(AttachmentsCnt > 0){
		SearchAttachments();
	}				
}

function SearchAppliedProcedureGrid(){
	$.ajax({
		url: "/getIdsmRfiCreationSetUpAppliedProcedure.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {
			
			dlgAppliedProcedureGrid.Source.Data.Data.Body = [data.results];
			dlgAppliedProcedureGrid.Reload();
        }
    });
}

function SearchProcedureGrid(){
	$.ajax({
		url: "/getIdsmRfiCreationSetUpProcedure.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {
			
			dlgProcedureGrid.Source.Data.Data.Body = [data.results];
			dlgProcedureGrid.Reload();
        }
    });
}

function SearchInspectionGrid(){
	$.ajax({
		url: "/getIdsmRfiCreationSetUpInspection.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {
			
			dlgInspectionGrid.Source.Data.Data.Body = [data.results];
			dlgInspectionGrid.Reload();
        }
    });
}

function SearchAttachments(){
	$.ajax({
		url: "/getIdsmRfiCreationSetUpAttachments.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			if(list.length > 0) {
				$('#txtDlgIdsmRfiCreationSetupAttachments').val(list[0].NAME);
			}
			else
			{
				$('#txtDlgIdsmRfiCreationSetupAttachments').val("");
			}
			
			
        }
    });
}




