var dlgExcelUploadGrid;
var sheetCol;

var v_idsm_schmap_excel_upload_callback = null;
var v_idsm_schmap_excel_upload_param;

function initIdsmSchmapExcelUploadPopUp(param , callback) {
	v_idsm_schmap_excel_upload_callback = callback;
    v_idsm_schmap_excel_upload_param = param;
    
    $('#dlgIdsmSchmapExcelUploadPopUp').modal('show');
    
    initIdsmSchmapExcelUploadPopUpCode();    
}

function initIdsmSchmapExcelUploadPopUpCode() {	
	
	initIdsmSchmapExcelUploadPopUpControls();
}


function initIdsmSchmapExcelUploadPopUpControls() {
	var gridCode = getGridCode();
	var dlgExcelUploadGridCol = {"Cfg": {"id"				: "idsmSchmapExcelUploadGrid"
									, "CfgId"			: "idsmSchmapExcelUploadGridCfg"
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
							
	dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgIdsmSchmapExcelUploadPopUpGrid" );

	
	$('#dlgIdsmSchmapExcelUploadPopUp').on('shown.bs.modal', function () {
		$('#dlgIdsmSchmapExcelUploadPopUp').click();
	});	
	
	$('#dlgIdsmSchmapExcelUploadPopUp').on('hidden.bs.modal', function () {
	  	closeIdsmSchmapExcelUploadPopUp();
	})		
	
	$('#btnDlgIdsmSchmapExcelUploadPopUpUpload').click(function () { btnDlgIdsmSchmapExcelUploadPopUpUploadClick(); return false; });
	$('#dlgIdsmSchmapExcelUploadPopUpFile').change(function () { dlgIdsmSchmapExcelUploadPopUpFileChange(event); return false; });
	$('#btnDlgIdsmSchmapExcelUploadPopUpSave').click(function () { btnDlgIdsmSchmapExcelUploadPopUpSaveClick(); return false; });
	
}

function closeIdsmSchmapExcelUploadPopUp() {
	dlgExcelUploadGrid.Dispose();
}

function btnDlgIdsmSchmapExcelUploadPopUpUploadClick() {
	$('#dlgIdsmSchmapExcelUploadPopUpFile').click();
}

function dlgIdsmSchmapExcelUploadPopUpFileChange(event) {
	var input = event.target; 
	var reader = new FileReader(); 
	var list = [];
	var	sheetCol = ["TRK_ITEM_NAME1",
                    "TRK_ITEM_NAME2",
                    "TRK_ITEM_NAME3",
					"TRK_ITEM_NAME4",  
					"MAP_TASK_NUMBER"];		
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'}); 
		read_buffer.SheetNames.forEach(function(sheetName){ 
			var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName], { header: sheetCol });
			
			
			for(var i = 1; i < rowdata.length; i++){
				var row = rowdata[i];
				
				var gridRow = {"TRK_ITEM_NAME1"			: row.TRK_ITEM_NAME1,
							   "TRK_ITEM_NAME2"			: row.TRK_ITEM_NAME2,
							   "TRK_ITEM_NAME3"			: row.TRK_ITEM_NAME3,
							   "TRK_ITEM_NAME4"			: row.TRK_ITEM_NAME4,
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

function btnDlgIdsmSchmapExcelUploadPopUpSaveClick(){
	var excelList = dlgExcelUploadGrid.Rows;
	var rowCnt = dlgExcelUploadGrid.RowCount;


	if(rowCnt < 1){
		alert_modal("알람", $('#alertGridDataNull').val());
		return;	
	}
	
	confirm_modal("알람", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {	
			var tmpList = [];
			
			for (var key in excelList) {
				var gridRow = excelList[key];
				if(gridRow.Fixed == null){
					var TaskNum = gridRow.MAP_TASK_NUMBER == null ? "" : gridRow.MAP_TASK_NUMBER;
					var row = {"TRK_ITEM_NAME1": gridRow.TRK_ITEM_NAME1,
							   "TRK_ITEM_NAME2": gridRow.TRK_ITEM_NAME2,
							   "TRK_ITEM_NAME3": gridRow.TRK_ITEM_NAME3,
							   "TRK_ITEM_NAME4": gridRow.TRK_ITEM_NAME4,
							   "MAP_TASK_NUMBER": TaskNum,
							   "PROJECT_NO" : v_idsm_schmap_excel_upload_param.PROJECT_NO};
		
					tmpList.push(row);		
				}
			}
			
			var list = JSON.stringify(tmpList);	
			var paramData = {"list" : list};			
			
			$.ajax({			
				url: "/saveIdsmSchmapExcelUpload.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						if(v_idsm_schmap_excel_upload_callback)
						{	
							v_idsm_schmap_excel_upload_callback("save-item", null);
						}	
						
						$("#dlgIdsmSchmapExcelUploadPopUp").modal('hide');
					}
				}
			});				
					
		}
	});
	

}

