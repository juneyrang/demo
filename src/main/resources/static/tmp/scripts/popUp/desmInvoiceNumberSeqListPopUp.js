var v_inoice_seq_callback = null;
var v_inoice_seq_param;

var dlgInvoiceSeqGrid;

function initInvoiceSeqPopUp(param , callback) {
	v_inoice_seq_callback = callback;
    v_inoice_seq_param = param;
    
    $('#dlgInvoiceSeqList').modal('show');
    
    initInvoiceSeqPopUpCode();    
}

function initInvoiceSeqPopUpCode() {
    
    initInvoiceSeqPopUpControls();
}


function initInvoiceSeqPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgInvoiceSeqList').on('shown.bs.modal', function () {
		$('#dlgInvoiceSeqList').click();
	});	
	
	$('#dlgInvoiceSeqList').on('hidden.bs.modal', function () {
	  	closeInvoiceSeqPopUp();
	})	

	TGSetEvent("OnRenderFinish","desmIdsmSetupInvoiceSeqGrid",function(grid){
		setInvoiceSeqPopUpData();
	});
	
	$('#btnDlgInvoiceSeqListAdd').click(function () { btnDlgInvoiceSeqListAddClick(); return false; });
	$('#btnDlgInvoiceSeqListSave').click(function () { btnDlgInvoiceSeqListSaveClick(); return false; });
	$('#btnDlgInvoiceSeqListDelete').click(function () { btnDlgInvoiceSeqListDeleteClick(); return false; });		
	
	
		
	var gridCode = getGridCode();	
	var dlgInvoiceSeqGridCol = {
		"Cfg": {
			"id"				: "desmIdsmSetupInvoiceSeqGrid"
			, "CfgId"			: "desmIdsmSetupInvoiceSeqGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "400"
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
		, "Panel" : {
			"Visible" : "1"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{"Name": "PROJECT_CODE"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"	},
		    {"Name": "PROJECT_DESC"		, "Width": "300", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0"	},
		    {"Name": "EXPRESSION"		, "Width": "250", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1"	},
		    {"Name": "START_SEQ"		, "Width": "150", "Type": "Float", "Format" : "###,###,###,###", "Align": "right"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1"	},
		    {"Name": "END_SEQ"		, "Width": "150", "Type": "Float", "Format" : "###,###,###,###", "Align": "right"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1"	}
		]
		, "Header" : {
			"PROJECT_CODE"	: "Project Code", "Class"	: "gridCenterText",
			"PROJECT_DESC"	: "Project Description",
			"START_SEQ"	: "Start Number",
			"END_SEQ"	: "End  Number",
			"EXPRESSION"	: "Expression"
		}
	};
	
	dlgInvoiceSeqGrid = TreeGrid( {Layout:{Data : dlgInvoiceSeqGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgInvoiceSeq" ); 
}

function closeInvoiceSeqPopUp() {
	dlgInvoiceSeqGrid.Dispose();
}

function setInvoiceSeqPopUpData() {

	searchInvoiceSeqList(); 
}

function searchInvoiceSeqList(){

	$.ajax({
		url: "/getIdsmSetupDlgInoviceSeqList.do",		
		data: {},
		success: function (data, textStatus, jqXHR) {

			dlgInvoiceSeqGrid.Source.Data.Data.Body = [data.results];
			dlgInvoiceSeqGrid.ReloadBody();
        }
    });
}

function btnDlgInvoiceSeqListAddClick(){
	var param = {};

	$('#dlgIdsmInvoiceSeqListPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, param) {
				
				if(key == "select-item"){
					idsmDlgIdsmInvoiceSeqListProjectCheck(param);
				}
			});	
		}
	});	
}

function idsmDlgIdsmInvoiceSeqListProjectCheck(row){
	var itemCheck = true;
	var list = dlgInvoiceSeqGrid.Rows;
	
	for (var key in list) {
		var gridRow = list[key];
		
		if(gridRow.Fixed == null){
			if(gridRow.PROJECT_CODE == row.SEGMENT1){
				itemCheck = false;
			}		
		}
	}
	
	if(itemCheck) {
		var addRow = dlgInvoiceSeqGrid.AddRow(null,null,1,null,null);
		addRow.PROJECT_CODE = row.SEGMENT1;
		addRow.PROJECT_DESC = row.NAME;
		
		dlgInvoiceSeqGrid.RefreshRow(addRow);						
	}
}

function btnDlgInvoiceSeqListSaveClick(){

	dlgInvoiceSeqGrid.ActionAcceptEdit();
	
	if(dlgInvoiceSeqGrid.RowCount == 0){
		alert($('#alertGridDataNull').val());
		return;
	}
	
	var changeObject = dlgInvoiceSeqGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;
	
	if(changeList == 0){
		alert($('#alertGridEditDataNull').val());
		return;	
	}	
	
	if (confirm($('#alertSave').val())) {
		var updateList = [];
		
		for(var i = 0; i < changeList.length; i++){
			var rowId = changeList[i].id;
			var row = dlgInvoiceSeqGrid.GetRowById(rowId);
				
			
			row.START_SEQ == null ? "" : row.START_SEQ;
			row.END_SEQ == null ? "" : row.END_SEQ;
			row.EXPRESSION == null ? "" : row.EXPRESSION;
			
			var updateRow = {"PROJECT_CODE" : row.PROJECT_CODE, "START_SEQ" : row.START_SEQ, "END_SEQ" : row.END_SEQ, "EXPRESSION" : row.EXPRESSION};		
							 
			updateList.push(updateRow);
		}
		
		
		var list = JSON.stringify(updateList);
		var paramData = {"updateList" : list};
		
		
		$.ajax({			
			url: "/saveIdsmSetupDlgInoviceSeqList.do",
			data: paramData,
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				} else {
					alert_success($('#alertSaveSuccess').val());					
					searchInvoiceSeqList();
				}
			}		
		});	
	}
	
		
	
}

function btnDlgInvoiceSeqListDeleteClick() {
	var deleteList = [];
	var selectList = dlgInvoiceSeqGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert($('#alertGridSelectDataNull').val());
		return;
	}
	
	if (confirm($('#alertDelete').val())) {
		for(var i = 0; i < selectList.length; i++){
			var row = selectList[i];
			
			if(row.Added != null && row.Added == 1){
				dlgInvoiceSeqGrid.RemoveRow(row);
			}
			else{
				var deleteRow = {"PROJECT_CODE" : row.PROJECT_CODE};
				deleteList.push(deleteRow);			
			}
		}
		
		if(deleteList.length > 0){
			var list = JSON.stringify(deleteList);	
			var paramData = {"deleteList" : list};
			
			$.ajax({			
				url: "/deleteIdsmSetupDlgInoviceSeqList.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertDeleteSuccess').val());
						searchInvoiceSeqList();	
					}
				}
			});	
		}
		else{
			alert_success($('#alertDeleteSuccess').val());
		}	
	}
	

}

					

					




