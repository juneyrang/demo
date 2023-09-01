var dlgExcelUploadGrid;
var sheetCol;

var v_desm_blr_schmap_excel_upload_callback = null;
var v_desm_blr_schmap_excel_upload_param;

function initIdsmSchmapExcelUploadPopUp(param , callback) {
	v_desm_blr_schmap_excel_upload_callback = callback;
    v_desm_blr_schmap_excel_upload_param = param;
    
    $('#dlgDesmBlrSchmapExcelUploadPopUp').modal('show');
    
    initDesmBlrSchmapExcelUploadPopUpCode();    
}

function initDesmBlrSchmapExcelUploadPopUpCode() {	
	
	initDesmBlrSchmapExcelUploadPopUpControls();
}


function initDesmBlrSchmapExcelUploadPopUpControls() {
	var gridCode = getGridCode();
	var dlgExcelUploadGridCol = {"Cfg": {"id"				: "desmBlrSchmapExcelUploadGrid"
									, "CfgId"			: "desmBlrSchmapExcelUploadGridCfg"
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
								"Cells20Data"		: ""
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "0"
							}
							, "Cols" : [
								{	"Name"	: "LOCAL_ACTIVITY_DESCRIPTION", "Width": "400", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "DETAIL_ITEM_DESCRIPTION", "Width": "500", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0" },
								{	"Name"	: "MAP_TASK_NUMBER", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0" },
							]
							,"Header" : {
								"LOCAL_ACTIVITY_DESCRIPTION"	: "Activity 명", "Class" : "gridCenterText",
								"DETAIL_ITEM_DESCRIPTION"	: "발주품목",
								"MAP_TASK_NUMBER"	: "Task Code"
							}
							};
							
	dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmBlrSchmapExcelUploadPopUpGrid" );

	
	$('#dlgDesmBlrSchmapExcelUploadPopUp').on('shown.bs.modal', function () {
		$('#dlgDesmBlrSchmapExcelUploadPopUp').click();
	});	
	
	$('#dlgDesmBlrSchmapExcelUploadPopUp').on('hidden.bs.modal', function () {
	  	closeDesmBlrSchmapExcelUploadPopUp();
	})	
	
	$('#btnDlgDesmBlrSchmapExcelUploadPopUpUpload').click(function () { btnDlgDesmBlrSchmapExcelUploadPopUpUploadClick(); return false; });
	$('#dlgDesmBlrSchmapExcelUploadPopUpFile').change(function () { dlgDesmBlrSchmapExcelUploadPopUpFileChange(event); return false; });	
	$('#btnDlgDesmBlrSchmapExcelUploadPopUpSave').click(function () { btnDlgDesmBlrSchmapExcelUploadPopUpSaveClick(); return false; });
	
}

function closeDesmBlrSchmapExcelUploadPopUp() {
	dlgExcelUploadGrid.Dispose();
}

function btnDlgDesmBlrSchmapExcelUploadPopUpUploadClick() {
	$('#dlgDesmBlrSchmapExcelUploadPopUpFile').click();
}

function dlgDesmBlrSchmapExcelUploadPopUpFileChange(event) {
	var input = event.target; 
	var reader = new FileReader(); 
	var list = [];
	var	sheetCol = ["LOCAL_ACTIVITY_DESCRIPTION",
                    "DETAIL_ITEM_DESCRIPTION",
                    "MAP_TASK_NUMBER"];		
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'}); 
		read_buffer.SheetNames.forEach(function(sheetName){ 
			var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName], { header: sheetCol });
			
			
			for(var i = 1; i < rowdata.length; i++){
				var row = rowdata[i];
				
				var gridRow = {"LOCAL_ACTIVITY_DESCRIPTION"			: row.LOCAL_ACTIVITY_DESCRIPTION,
							   "DETAIL_ITEM_DESCRIPTION"			: row.DETAIL_ITEM_DESCRIPTION,
							   "MAP_TASK_NUMBER"		: row.MAP_TASK_NUMBER};
								
				list.push(gridRow);						
			} 	
			
			dlgExcelUploadGrid.Source.Data.Data.Body = [list];
			dlgExcelUploadGrid.ReloadBody();	
		})
			
			
			 
	}; 
	reader.readAsBinaryString(input.files[0]); 	
	input.value = null;
}

function btnDlgDesmBlrSchmapExcelUploadPopUpSaveClick(){
	var excelList = dlgExcelUploadGrid.Rows;
	var rowCnt = dlgExcelUploadGrid.RowCount;


	if(rowCnt < 1){
		alert_modal("", $('#alertGridDataNull').val());
		return;	
	}
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {	
			var tmpList = [];
			
			for (var key in excelList) {
				var gridRow = excelList[key];
				if(gridRow.Fixed == null){
					var TaskNum = gridRow.MAP_TASK_NUMBER == null ? "" : gridRow.MAP_TASK_NUMBER;
					var row = {"LOCAL_ACTIVITY_DESCRIPTION": gridRow.LOCAL_ACTIVITY_DESCRIPTION,
							   "DETAIL_ITEM_DESCRIPTION": gridRow.DETAIL_ITEM_DESCRIPTION,
							   "MAP_TASK_NUMBER": TaskNum,
							   "PROJECT_NO" : v_desm_blr_schmap_excel_upload_param.PROJECT_NO};
		
					tmpList.push(row);		
				}
			}
			
			var list = JSON.stringify(tmpList);	
			var paramData = {"list" : list};			
			
			$.ajax({			
				url: "/saveIdsmBlrSchmapExcelUpload.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						if(v_desm_blr_schmap_excel_upload_callback)
						{	
							v_desm_blr_schmap_excel_upload_callback("save-item", null);
						}	
						
						$("#dlgDesmBlrSchmapExcelUploadPopUp").modal('hide');
					}
				}
			});				
					
		}
	});
	

}

