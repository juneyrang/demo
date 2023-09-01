var dlgExcelUploadGrid;
var sheetCol;

var v_desm_mpr_design_excel_upload_callback = null;
var v_desm_mpr_design_excel_upload_param;

function initMprDesignExcelUploadPopUp(param , callback) {
	v_desm_mpr_design_excel_upload_callback = callback;
    v_desm_mpr_design_excel_upload_param = param;
    
    $('#dlgDesmMprDesignExcelUploadPopUp').modal('show');
    
    initDesmMprDesignExcelUploadPopUpCode();    
}

function initDesmMprDesignExcelUploadPopUpCode() {	
	
	initDesmMprDesignExcelUploadPopUpControls();
}


function initDesmMprDesignExcelUploadPopUpControls() {
	var gridCode = getGridCode();
	var dlgExcelUploadGridCol = {
		"Cfg": {
			"id"				: "dlgExcelUploadGrid"
			, "CfgId"			: "dlgExcelUploadGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "550"
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
			,"ColsPosLap":"1"
			//,"ColsLap":"1"
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
	   "Cols" : [{	"Name"	: "NO", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
				 {	"Name"	: "DOCUMENT_NO", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "ITEM1", "Width": "270", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "ITEM2", "Width": "270", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
				 {	"Name"	: "SCHEDULE_PLAN", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "SCHEDULE_ACTUAL", "Width": "100", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1","OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "MFG_YN", "Width": "120", "Type": "Radio", "Enum" : "|YES|NO", "EnumKeys" : "|Y|N", "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnClickEditRadio": "onChangeMFG( Grid, Row, Col )" },
				 {	"Name"	: "APPROVAL_EXPECTED", "Width": "150", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "APPROVAL_ACTUAL", "Width": "150", "Type": "Date" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )", "Format": "yy/MM/dd", "Button": "" },
				 {	"Name"	: "REMARKS", "Width": "230", "Type": "Text" , "Class" : "gridBorderText gridTextColor ", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }
	   			],
		"Head" : [{ "Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "3",
					"Class" : "gridCenterText",
					"NO"	: "No.", "NORowSpan" : "3",
					"DOCUMENT_NO"	: "Document No.", "DOCUMENT_NORowSpan" : "3",
					"ITEM1"	: "Item1", "ITEM1RowSpan" : "3",
					"ITEM2"	: "Item2", "ITEM2RowSpan" : "3",
					"SCHEDULE_PLAN"	: "Schedule", "SCHEDULE_PLANSpan" : "5",
					"SCHEDULE_ACTUAL"	: "Schedule",
					"MFG_YN"	: "Schedule",
					"APPROVAL_EXPECTED"	: "Schedule",
					"APPROVAL_ACTUAL"	: "Schedule",
					"REMARKS"	: "Remarks", "REMARKSRowSpan" : "3"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"DOCUMENT_NO"	: "Document No.",
					"ITEM1"	: "Item1",
					"ITEM2"	: "Item2",
					"SCHEDULE_PLAN"	: "1st Submit", "SCHEDULE_PLANSpan" : "2",
					"SCHEDULE_ACTUAL"	: "1st Submit",
					"MFG_YN"	: "MFG", "MFG_YNRowSpan" : "2",
					"APPROVAL_EXPECTED"	: "Approval Due Date", "APPROVAL_EXPECTEDRowSpan" : "2",
					"APPROVAL_ACTUAL"	: "Approval Date", "APPROVAL_ACTUALRowSpan" : "2",
					"REMARKS"	: "Remarks"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"NO"	: "No.",
					"DOCUMENT_NO"	: "Document No.",
					"ITEM1"	: "Item1",
					"ITEM2"	: "Item2",
					"SCHEDULE_PLAN"	: "Plan",
					"SCHEDULE_ACTUAL"	: "Actual",
					"MFG_YN"	: "MFG",
					"APPROVAL_EXPECTED"	: "Approval Due Date",
					"APPROVAL_ACTUAL"	: "Approval Date",
					"REMARKS"	: "Remarks"}]
	};
							
	dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmMprDesignExcelUploadPopUpGrid" );

	
	$('#dlgDesmMprDesignExcelUploadPopUp').on('shown.bs.modal', function () {
		$('#dlgDesmMprDesignExcelUploadPopUp').click();
	});	
	
	$('#dlgDesmMprDesignExcelUploadPopUp').on('hidden.bs.modal', function () {
	  	closeDesmMprDesignExcelUploadPopUp();
	})	
	
	$('#btnDlgDesmMprDesignExcelUploadPopUpDownload').click(function () { btnDlgDesmMprDesignExcelUploadPopUpDownloadClick(); return false; });
	$('#btnDlgDesmMprDesignExcelUploadPopUpUpload').click(function () { btnDlgDesmMprDesignExcelUploadPopUpUploadClick(); return false; });
	$('#dlgDesmMprDesignExcelUploadPopUpFile').change(function () { dlgDesmMprDesignExcelUploadPopUpFileChange(event); return false; });	
	$('#btnDlgDesmMprDesignExcelUploadPopUpSave').click(function () { btnDlgDesmMprDesignExcelUploadPopUpSaveClick(); return false; });
	
}

function closeDesmMprDesignExcelUploadPopUp() {
	dlgExcelUploadGrid.Dispose();
}

function btnDlgDesmMprDesignExcelUploadPopUpDownloadClick() {
	dlgExcelUploadGrid.ActionExport();
}

function btnDlgDesmMprDesignExcelUploadPopUpUploadClick() {
	$('#dlgDesmMprDesignExcelUploadPopUpFile').click();
}

function dlgDesmMprDesignExcelUploadPopUpFileChange(event) {
	var input = event.target; 
	var reader = new FileReader(); 
	var list = [];
	var	sheetCol = [
		"NO",
		"DOCUMENT_NO",
		"ITEM1",
		"ITEM2",
		"SCHEDULE_PLAN",
		"SCHEDULE_ACTUAL",
		"MFG_YN",
		"APPROVAL_EXPECTED",
		"APPROVAL_ACTUAL",
		"REMARKS"
    ];
	var	sheetHead = [
 		"No.",
 		"Document No.",
 		"Item1",
 		"Item2"
    ];
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'}); 
		read_buffer.SheetNames.forEach(function(sheetName){ 
			var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName], { header: sheetCol });
			
			
			for(var i = 1; i < rowdata.length; i++){
				var row = rowdata[i];
				if(sheetHead[0] != row.NO && sheetHead[1] != row.DOCUMENT_NO && sheetHead[2] != row.ITEM1 && sheetHead[3] != row.ITEM2) {
					var gridRow = {
						"NO"				: row.NO,
						"DOCUMENT_NO"		: row.DOCUMENT_NO,
						"ITEM1"				: row.ITEM1,
						"ITEM2"				: row.ITEM2,
						"SCHEDULE_PLAN"		: ExcelDateToJSDate(row.SCHEDULE_PLAN),
						"SCHEDULE_ACTUAL"	: ExcelDateToJSDate(row.SCHEDULE_ACTUAL),
						"MFG_YN"			: row.MFG_YN,
						"APPROVAL_EXPECTED"	: ExcelDateToJSDate(row.APPROVAL_EXPECTED),
						"APPROVAL_ACTUAL"	: ExcelDateToJSDate(row.APPROVAL_ACTUAL),
						"REMARKS"			: row.REMARKS
					};
					
					list.push(gridRow);
				}
			} 	
			
			dlgExcelUploadGrid.Source.Data.Data.Body = [list];
			dlgExcelUploadGrid.ReloadBody();	
		})
			
			
			 
	}; 
	reader.readAsBinaryString(input.files[0]); 	
	input.value = null;
}

function btnDlgDesmMprDesignExcelUploadPopUpSaveClick(){

	var excelList = dlgExcelUploadGrid.GetSelRows();
//	var excelList = dlgExcelUploadGrid.Rows;
//	var rowCnt = dlgExcelUploadGrid.RowCount;


	if(excelList.length == 0){
//	if(rowCnt < 1){
		alert_modal("", $('#alertGridDataNull').val());
		return;	
	}
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {	
			var tmpList = [];
			
			for (var key in excelList) {
				var gridRow = excelList[key];
				if(gridRow.Kind == 'Data') {
					tmpList.push(gridRow);		
				}
			}
			if(v_desm_mpr_design_excel_upload_callback) {	
				v_desm_mpr_design_excel_upload_callback("excel-item", tmpList);
			}
			$('#dlgDesmMprDesignExcelUploadPopUp').modal('hide');
		}
	});
	

}

function ExcelDateToJSDate(date) {
	if (date == null || date == "")
		return "";
	else if (typeof(date) == "string")
		return date;
	else
	{
		var jsDate = new Date(Math.round((date - 25569)*86400*1000));
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '-' + month + '-' + day;
	}
}
