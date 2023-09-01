var dlgExcelUploadGrid;
var sheetCol;

var v_desm_contract_excel_upload_callback = null;
var v_desm_contract_excel_upload_param;

function initContractExcelUploadPopUp(param , callback) {
	v_desm_contract_excel_upload_callback = callback;
    v_desm_contract_excel_upload_param = param;
    
    $('#dlgDesmContractExcelUploadPopUp').modal('show');
    
    initDesmContractExcelUploadPopUpCode();    
}

function initDesmContractExcelUploadPopUpCode() {	
	
	initDesmContractExcelUploadPopUpControls();
}


function initDesmContractExcelUploadPopUpControls() {
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
	   "Cols" : [{	"Name"	: "CONTRACT_HEADER_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CONTRACT_LINE_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "REVISION", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "TYPE", "Width": "140", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "ITEM1", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "ITEM2", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "ITEM3", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "ITEM4", "Width": "200", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "ITEM_NO", "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "SEPC", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "UOM", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "QUANTITY", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "NET", "Width": "80", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "GROSS", "Width": "80", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CURRENCY", "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextRedColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "UNIT_PRICE", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "AMOUNT", "Width": "120", "Type": "Float" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "PROMISED_DATE", "Width": "130", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "PAYMENT_METHOD", "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
	   			 {	"Name"	: "FOB", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "REMARKS", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }
	   			],
		"Header" : {"Class" : "gridCenterText",
		   	"TYPE"	: "Type",
		   	"ITEM1"	: "Item1",
		   	"ITEM2" : "Item2",
		   	"ITEM3"	: "Item3",
		   	"ITEM4" : "Item4",
		   	"ITEM_NO"	: "Item No",
		   	"SEPC"	: "Spec",
		   	"UOM"	: "UOM",
		   	"QUANTITY"	: "Q’ty",
		   	"NET"	: "Net",
		   	"GROSS"	: "Gross",
		   	"CURRENCY" : "Currency",
	   		"UNIT_PRICE"	: "Unit Price",
	   		"AMOUNT"	: "Amount",
	   		"PROMISED_DATE" : "Promised Date",
	   		"PAYMENT_METHOD"	: "Payment Method",
	   		"FOB"	: "FOB",
	   		"REMARKS"	: "Remarks.",
		}
	};
							
	dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmContractExcelUploadPopUpGrid" );

	
	$('#dlgDesmContractExcelUploadPopUp').on('shown.bs.modal', function () {
		$('#dlgDesmContractExcelUploadPopUp').click();
	});	
	
	$('#dlgDesmContractExcelUploadPopUp').on('hidden.bs.modal', function () {
	  	closeDesmContractExcelUploadPopUp();
	})	
	
	$('#btnDlgDesmContractExcelUploadPopUpDownload').click(function () { btnDlgDesmContractExcelUploadPopUpDownloadClick(); return false; });
	$('#btnDlgDesmContractExcelUploadPopUpUpload').click(function () { btnDlgDesmContractExcelUploadPopUpUploadClick(); return false; });
	$('#dlgDesmContractExcelUploadPopUpFile').change(function () { dlgDesmContractExcelUploadPopUpFileChange(event); return false; });	
	$('#btnDlgDesmContractExcelUploadPopUpSave').click(function () { btnDlgDesmContractExcelUploadPopUpSaveClick(); return false; });
	
}

function closeDesmContractExcelUploadPopUp() {
	dlgExcelUploadGrid.Dispose();
}

function btnDlgDesmContractExcelUploadPopUpDownloadClick() {
	dlgExcelUploadGrid.ActionExport();
}

function btnDlgDesmContractExcelUploadPopUpUploadClick() {
	$('#dlgDesmContractExcelUploadPopUpFile').click();
}

function dlgDesmContractExcelUploadPopUpFileChange(event) {
	var input = event.target; 
	var reader = new FileReader(); 
	var list = [];
	var	sheetCol = [
		"TYPE",
		"ITEM1",
		"ITEM2",
		"ITEM3",
		"ITEM4",
		"ITEM_NO",
		"SEPC",
		"UOM",
		"QUANTITY",
		"NET",
		"GROSS",
		"CURRENCY",
		"UNIT_PRICE",
		"AMOUNT",
		"PROMISED_DATE",
		"PAYMENT_METHOD",
		"FOB",
		"REMARKS"
    ];		
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'}); 
		read_buffer.SheetNames.forEach(function(sheetName){ 
			var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName], { header: sheetCol });
			
			
			for(var i = 1; i < rowdata.length; i++){
				var row = rowdata[i];
				console.log(row);
				
				var gridRow = {
					"CONTRACT_HEADER_ID"	: row.CONTRACT_HEADER_ID,
					"CONTRACT_LINE_ID"		: row.CONTRACT_LINE_ID,
					"REVISION"				: row.REVISION,
					"TYPE"					: row.TYPE,
					"ITEM1"					: row.ITEM1,
					"ITEM2"					: row.ITEM2,
					"ITEM3"					: row.ITEM3,
					"ITEM4"					: row.ITEM4,
					"ITEM_NO"				: row.ITEM_NO,
					"SEPC"					: row.SEPC,
					"UOM"					: row.UOM,
					"QUANTITY"				: row.QUANTITY,
					"NET"					: row.NET,
					"GROSS"					: row.GROSS,
					"CURRENCY"				: row.CURRENCY,
					"UNIT_PRICE"			: row.UNIT_PRICE,
					"AMOUNT"				: row.AMOUNT,
					"PROMISED_DATE"			: ExcelDateToJSDate(row["PROMISED_DATE"]),
					"PAYMENT_METHOD"		: row.PAYMENT_METHOD,
					"FOB"					: row.FOB,
					"REMARKS"				: row.REMARKS
				};
								
				list.push(gridRow);						
			} 	
			
			dlgExcelUploadGrid.Source.Data.Data.Body = [list];
			dlgExcelUploadGrid.ReloadBody();	
		})
			
			
			 
	}; 
	reader.readAsBinaryString(input.files[0]); 	
	input.value = null;
}

function btnDlgDesmContractExcelUploadPopUpSaveClick(){
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
				if(gridRow.Kind == 'Data') {
					tmpList.push(gridRow);		
				}
			}
			if(v_desm_contract_excel_upload_callback) {	
				v_desm_contract_excel_upload_callback("excel-item", tmpList);
			}
			$('#dlgDesmContractExcelUploadPopUp').modal('hide');
		}
	});
	

}

function ExcelDateToJSDate(date) {
	console.log(typeof(date), date);
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
