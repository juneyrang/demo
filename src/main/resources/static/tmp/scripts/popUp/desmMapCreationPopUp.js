var dlgDesmMapCreationGrid;

var v_desm_map_creation_callback = null;
var v_desm_map_creation_param;



function initDesmMapCreationPopUp(param , callback) {
	v_desm_map_creation_callback = callback;
    v_desm_map_creation_param = param; 
    
	$('#dlgDesmMapCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMapCreation').click();
	});
	
	$('#dlgDesmMapCreation').on('hidden.bs.modal', function () {
	  	closeDesmMapCreationPopUp();
	});
		
	$('#dlgDesmMapCreation').modal('show');    
	
    
    initDesmMapCreationPopUpCode();    
}

function initDesmMapCreationPopUpCode() {	
	
	initDesmMapCreationPopUpControls();
}


function initDesmMapCreationPopUpControls() {
	
	
	$('#btnDlgDesmMapCreationAdd').click(function () { btnDlgDesmMapCreationAddClick(); return false; });
	$('#btnDlgDesmMapCreationSave').click(function () { btnDlgDesmMapCreationSaveClick(); return false; });
	$('#btnDlgDesmMapCreationSearch').click(function () { btnDlgDesmMapCreationSearchClick(); return false; });
	$('#btnDlgDesmMapCreationDelete').click(function () { btnDlgDesmMapCreationDeleteClick(); return false; });

	
	TGSetEvent("OnCopy","dlgDesmMapCreationGrid",function(grid, txt){
	  copyToClipboard(txt);
	});		
		
		var gridCode = getGridCode();
		var dlgDesmMapCreationGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMapCreationGrid"
			, "CfgId"			: "dlgDesmMapCreationGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "0"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "350"
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
	   "Cols" : [{	"Name"	: "MAP_NAME", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "MAP_PATH", "Width": "450", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
	   "Header" : {
		"MAP_NAME"	: "Map Name", "Class" : "gridCenterText",
		"MAP_PATH"	: "Map Path"
	}
	};	
	
	dlgDesmMapCreationGrid = TreeGrid( {Layout:{Data : dlgDesmMapCreationGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMapCreationGrid" );	
	
	initDefailProject(function (list) {
		
		if(list.length > 0) {
			$('#txtDlgDesmMapCreationProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtDlgDesmMapCreationProjectName').val(list[0]["NAME"]);
		}
	});		
}


function closeDesmMapCreationPopUp() {
	dlgDesmMapCreationGrid.Dispose();
}


function btnDlgDesmMapCreationAddClick() {
	dlgDesmMapCreationGrid.ActionAcceptEdit();
	
	var row = dlgDesmMapCreationGrid.AddRow(null,null,1,null,null);
	
	row.PROJECT_NO = $('#txtDlgDesmMapCreationProjectCode').val();
	dlgDesmMapCreationGrid.RefreshRow(row);		
}


function btnDlgDesmMapCreationSaveClick() {
	dlgDesmMapCreationGrid.ActionAcceptEdit();

	var changeObject = dlgDesmMapCreationGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;
	
	if(changeList.length < 1) {
		alert_modal("", $('#alertGridEditDataNull').val());
		return;	
	}	
	
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {								 					
			var insertList = [];
			for(var i = 0; i < changeList.length; i++){
				var rowId = changeList[i].id;
				var gridRow = dlgDesmMapCreationGrid.GetRowById(rowId);
				
				if(gridRow.Fixed == null){
					var row = objNullCheck({"MAP_NAME" : gridRow.MAP_NAME, "MAP_PATH" : gridRow.MAP_PATH,
							                "MAP_MST_ID" : gridRow.MAP_MST_ID, "PROJECT_NO" : gridRow.PROJECT_NO});
					insertList.push(row);
				}
			}
			
			var list = JSON.stringify(insertList);
			
			$.ajax({
				url: "/saveDesmMapCreation.do",		
				data: {"list" : list},
				success: function (data, textStatus, jqXHR) {
					if (data.error != null) {
						alert_fail(result.error);
					}
					else {
						alert_success($('#alertSuccess').val());
						
						if(v_desm_map_creation_callback) {
							v_desm_map_creation_callback("save-item", null);
						}
						
						$('#btnDlgDesmMapCreationSearch').click();		
					}
		        }
		    });								
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
	
	return obj;	
}

function btnDlgDesmMapCreationSearchClick() {

	
	var paramData = {"PROJECT_NO" : $('#txtDlgDesmMapCreationProjectCode').val()};	
	
	$.ajax({
		url: "/getDesmMapCreationList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {			
			
			dlgDesmMapCreationGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMapCreationGrid.ReloadBody();
			
			
        }
    });	
}

function btnDlgDesmMapCreationDeleteClick() {
	dlgDesmMapCreationGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMapCreationGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {
			
			var deleteList = [];
			for(var i = 0; i < selectList.length; i++){
				var row = selectList[i];
				
				if(row.Added != null && row.Added == 1){
					dlgDesmMapCreationGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"MAP_MST_ID" : row.MAP_MST_ID});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmMapCreation.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							
							$('#btnDlgDesmMapCreationSearch').click();
							
							if(v_desm_map_creation_callback) {
								v_desm_map_creation_callback("save-item", null);
							}							
							
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
