var dlgExcelUploadGrid;
var dlgExcelUploadSheetGrid;

var sheetCol;

var v_trans_excel_upload_callback = null;
var v_trans_excel_upload_param;

function initTransExcelUploadPopUp(param , callback) {
	v_trans_excel_upload_callback = callback;
    v_trans_excel_upload_param = param;
    
    initTransExcelUploadPopUpCode();    
}

function initTransExcelUploadPopUpCode() {	
	
	initTransExcelUploadPopUpControls();
}


function initTransExcelUploadPopUpControls() {

	$('#dlgTransShippingRequetsExcelUpload').on('shown.bs.modal', function () {
		$('#dlgTransShippingRequetsExcelUpload').click();
	});
	
	$('#dlgTransShippingRequetsExcelUpload').on('hidden.bs.modal', function () {
	  	closeTransExcelUploadPopUp();
	})	

	setExcelUploadGrid("공통양식");
	var gridCode = getGridCode();
	var dlgExcelUploadSheetGridCol = {
			"Cfg" : {
				 "SuppressCfg"		: "1"
				, "StyleLap"		: "0"
				, "Version"			: "1"
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
				, "SelectingSingle"	: "1"
				, "Adding"			: "0"
				, "Export"			: "1"
				, "Deleting"		: "0"
				, "SafeCSS"			: "1"
				, "Sorting"			: "0"
				, "Code" : gridCode
				,"CopyCols" : "0"
			}
			, "Panel" : {
				"Visible" : "0"
			}
			, "Toolbar" : {
				"Visible" : "0"
			}
			, "Cols" :[{ "Name": "NAME", "Width": "400", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText", "OnClickCell": "sheetClick( Grid, Row,Col )" }]
			, "Header" : {"NAME": "Sheet"}
	
		};	
	
	dlgExcelUploadSheetGrid = TreeGrid( {Layout:{Data : dlgExcelUploadSheetGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransShippingRequetsExcelUploadSheetGrid" );	
	
	
	
	$('#selDlgTransShippingRequetsExcelUploadSelect').change(function () { selDlgTransShippingRequetsExcelUploadSelectChange(); return false; });
	$('#btnDlgExcelUploadUpload').click(function () { btnDlgExcelUploadUploadClick(); return false; });
	$('#btnDlgExcelUploadSave').click(function () { btnDlgExcelUploadSaveClick(); return false; });   
	$('#btnDlgTransShippingRequetsExcelUploadFile').change(function () { btnDlgTransShippingRequetsExcelUploadFileChange(event); return false; });
}

function closeTransExcelUploadPopUp() {
	dlgExcelUploadSheetGrid.Dispose();
}

function setExcelUploadGrid(type) {
	if(dlgExcelUploadGrid != null){
		dlgExcelUploadGrid.Dispose();
	}
	
	var gridCode = getGridCode();
	var dlgExcelUploadGridCol = {
			"Cfg" : {
				 "SuppressCfg"		: "1"
				, "StyleLap"		: "0"
				, "Version"			: "1"
				, "CacheTimeout" : "100"
				, "Style"			: "Material"
				, "Size"			: "Small"
				, "Scale"			: "90%"
				, "ConstWidth"		: "100%"
				, "MinTagHeight"	: "300"
				, "MaxHeight"		: "1"
				, "Paging"			: "2"
				, "PageLength"		: "20"
				, "ChildParts"		: "2"
				, "NoPager"			: "1"
				, "Dragging"		: "0"
				, "SelectingSingle"	: "1"
				, "Adding"			: "0"
				, "Export"			: "1"
				, "Deleting"		: "0"
				, "SafeCSS"			: "1"
				, "Sorting"			: "0"
				, "Code" : gridCode
				,"CopyCols" : "0"
			}
			, "Panel" : {
				"Visible" : "0"
			}
			, "Toolbar" : {
				"Visible" : "0"
			}
			, "Cols" :[{ "Name": "NUM", "Width": "70", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"  }, 
						{ "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  }, 
		      			{ "Name": "DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "PACKING_TYPE", "Width": "110", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "SHIPPING_DIMENSION_L", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "SHIPPING_DIMENSION_W", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "SHIPPING_DIMENSION_H", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "SHIPPING_VOLUME", "Width": "160", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "NET_WEIGHT", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "GROSS_WEIGHT", "Width": "140", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
		      			{ "Name": "HAZARDOUS_MATERIAL_FLAG", "Width": "160", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" }]
			, "Header" : {"NUM": "No.",
						  "PACKAGE_NO": "Package No.", "Class"	: "gridCenterText",
			   			  "DESCRIPTION": "Description",
			   			  "PACKING_TYPE": "Packing Style",
			   			  "SHIPPING_DIMENSION_L": "Length",
			   			  "SHIPPING_DIMENSION_W": "Width",
			   			  "SHIPPING_DIMENSION_H": "Height",
			   			  "SHIPPING_VOLUME": "Shipping Volume(M3)",
			   			  "NET_WEIGHT": "Net Weight(kg)",
			   			  "GROSS_WEIGHT": "Gross Weight(kg)",
			   			  "HAZARDOUS_MATERIAL_FLAG": "Hazardous Material"}
	
		};
		
	if(type == "공통양식") {
	
		dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransShippingRequetsExcelUploadGrid" );
		sheetCol = ["NUM",
				  "PACKAGE_NO",
	   			  "DESCRIPTION",
	   			  "PACKING_TYPE",
	   			  "SHIPPING_DIMENSION_L",
	   			  "SHIPPING_DIMENSION_W",
	   			  "SHIPPING_DIMENSION_H",
	   			  "SHIPPING_VOLUME",
	   			  "NET_WEIGHT",
	   			  "GROSS_WEIGHT",
	   			  "HAZARDOUS_MATERIAL_FLAG"];	
	}
	else if(type == "Jawa 9&10"){
		dlgExcelUploadGridCol.Cols = [{ "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  },
									  { "Name": "DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "PACKING_TYPE", "Width": "110", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" }, 
									  { "Name": "GROSS_WEIGHT", "Width": "140", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "NET_WEIGHT", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "RT", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "SHIPPING_VOLUME", "Width": "160", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_L", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_W", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_H", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },	
						      		  { "Name": "COUNTRY_OF_ORIGIN", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  },
						      		  { "Name": "REMARKS", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  }
									 ];
		dlgExcelUploadGridCol.Header = {"PACKAGE_NO": "Package No.", "Class"	: "gridCenterText",
		                                "DESCRIPTION": "Description",
		                                "PACKING_TYPE": "Packing Style",
										"GROSS_WEIGHT": "Gross Weight(kg)",  
										"NET_WEIGHT": "Net Weight(kg)",
										"RT": "RT",
										"SHIPPING_VOLUME": "Shipping Volume(M3)",
										"SHIPPING_DIMENSION_L": "Length",
										"SHIPPING_DIMENSION_W": "Width",
										"SHIPPING_DIMENSION_H": "Height",
										"COUNTRY_OF_ORIGIN": "Country of Origin",
										"REMARKS": "Remarks"};
		sheetCol = ["PACKAGE_NO",
                    "DESCRIPTION",
                    "PACKING_TYPE",
					"GROSS_WEIGHT",  
					"NET_WEIGHT",
					"RT",
					"SHIPPING_VOLUME",
					"SHIPPING_DIMENSION_L",
					"SHIPPING_DIMENSION_W",
					"SHIPPING_DIMENSION_H",
					"COUNTRY_OF_ORIGIN",
					"REMARKS"];										
		dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransShippingRequetsExcelUploadGrid" );
	}
	else if(type == "주단품"){
		dlgExcelUploadGridCol.Cols = [{ "Name": "NUM", "Width": "70", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"  },
									  { "Name": "ZUDAN_HEAD", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  },
									  { "Name": "ZUDAN_START_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"  },
									  { "Name": "ZUDAN_END_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"  },
									  { "Name": "ZUDAN_QTY", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "PACKING_TYPE", "Width": "110", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "NET_WEIGHT", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "GROSS_WEIGHT", "Width": "140", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "SHIPPING_DIMENSION_L", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_W", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_H", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_VOLUME", "Width": "160", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" }
									 ];
		dlgExcelUploadGridCol.Header = {"NUM": "No.", "Class"	: "gridCenterText",
		                                "ZUDAN_HEAD": "S/O NO.(Head)",
		                                "ZUDAN_START_NO": "Serial No.(Start)",
										"ZUDAN_END_NO": "Serial No.(End)",
										"ZUDAN_QTY": "Qty",   
										"PACKING_TYPE": "Packing Style",
										"NET_WEIGHT": "Net Weight(kg)",
										"GROSS_WEIGHT": "Gross Weight(kg)",
										"SHIPPING_DIMENSION_L": "Length",
										"SHIPPING_DIMENSION_W": "Width",
										"SHIPPING_DIMENSION_H": "Height",
										"SHIPPING_VOLUME": "Shipping Volume(M3)"};
		sheetCol = ["NUM",
                    "ZUDAN_HEAD",
                    "ZUDAN_START_NO",
					"ZUDAN_END_NO",  
					"ZUDAN_QTY",
					"PACKING_TYPE",
					"NET_WEIGHT",
					"GROSS_WEIGHT",
					"SHIPPING_DIMENSION_L",
					"SHIPPING_DIMENSION_W",
					"SHIPPING_DIMENSION_H",
					"SHIPPING_VOLUME"];										
		dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransShippingRequetsExcelUploadGrid" );
	}
	else if(type == "Tuwaiq"){
		dlgExcelUploadGridCol.Cols = [{ "Name": "NUM", "Width": "70", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor gridCenterText"  },
									  { "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  },
									  { "Name": "PACKING_TYPE", "Width": "110", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "NOS", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "UNIT", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "SHIPPING_DIMENSION_L", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_W", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_DIMENSION_H", "Width": "90", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "SHIPPING_VOLUME", "Width": "160", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "NET_WEIGHT", "Width": "120", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "GROSS_WEIGHT", "Width": "140", "Type": "Int", "Format" : "###,###,###,##0.####", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
									  { "Name": "HAZARDOUS_MATERIAL_FLAG", "Width": "160", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor" },
						      		  { "Name": "REMARKS", "Width": "180", "Type": "Text", "CanEdit": "0", "Class" : "gridBorderText gridTextColor"  }
									 ];
		dlgExcelUploadGridCol.Header = {"NUM": "No.", "Class"	: "gridCenterText",
									    "PACKAGE_NO": "Package No.", "Class"	: "gridCenterText",
									    "PACKING_TYPE": "Packing Type",
		                                "DESCRIPTION": "Description",
		                                "NOS": "Nos",
		                                "UNIT": "Unit",
		                                "SHIPPING_DIMENSION_L": "Length",
										"SHIPPING_DIMENSION_W": "Width",
										"SHIPPING_DIMENSION_H": "Height",
										"SHIPPING_VOLUME": "Shipping Volume(M3)",
										"NET_WEIGHT": "Net Weight(kg)",
										"GROSS_WEIGHT": "Gross Weight(kg)",  
										"HAZARDOUS_MATERIAL_FLAG": "Hazardous Material",
										"REMARKS": "Remarks"};
		sheetCol = ["NUM",
					"PACKAGE_NO",
					"PACKING_TYPE",
                    "DESCRIPTION",
                    "NOS",
                    "UNIT",
                    "SHIPPING_DIMENSION_L",
					"SHIPPING_DIMENSION_W",
					"SHIPPING_DIMENSION_H",
					"SHIPPING_VOLUME",
					"NET_WEIGHT",
					"GROSS_WEIGHT",  
					"HAZARDOUS_MATERIAL_FLAG",
					"REMARKS"];										
		dlgExcelUploadGrid = TreeGrid( {Layout:{Data : dlgExcelUploadGridCol}, Data:{Data : {Body: [[]]}}, Text: {Url : gridLangUrl}},"dlgTransShippingRequetsExcelUploadGrid" );
	}
}

function selDlgTransShippingRequetsExcelUploadSelectChange() {
	setExcelUploadGrid($('#selDlgTransShippingRequetsExcelUploadSelect').val());
}

function btnDlgExcelUploadUploadClick() {
	$('#btnDlgTransShippingRequetsExcelUploadFile').click();
}

function btnDlgExcelUploadSaveClick() {
	var type = $('#selDlgTransShippingRequetsExcelUploadSelect').val();
	
	var list = dlgExcelUploadGrid.Rows;
	var rowCnt = dlgExcelUploadGrid.RowCount;


	if(rowCnt < 1){
		//alert($('#alertGridDataNull').val());
		alert_modal("알람", $('#alertGridDataNull').val());
		return;	
	}
	
	var tmpList = [];
	
	for (var key in list) {
	
		var gridRow = list[key];
		
		if(gridRow.Fixed == null){
		
			if(type == "공통양식") {
				var row = {"NUM": gridRow.NUM,
						  "PACKAGE_NO": gridRow.PACKAGE_NO,
			   			  "DESCRIPTION": gridRow.DESCRIPTION,
			   			  "PACKING_TYPE": gridRow.PACKING_TYPE,
			   			  "SHIPPING_DIMENSION_L": gridRow.SHIPPING_DIMENSION_L,
			   			  "SHIPPING_DIMENSION_W": gridRow.SHIPPING_DIMENSION_W,
			   			  "SHIPPING_DIMENSION_H": gridRow.SHIPPING_DIMENSION_H,
			   			  "SHIPPING_VOLUME": gridRow.SHIPPING_VOLUME,
			   			  "NET_WEIGHT": gridRow.NET_WEIGHT,
			   			  "GROSS_WEIGHT": gridRow.GROSS_WEIGHT,
			   			  "HAZARDOUS_MATERIAL_FLAG": gridRow.HAZARDOUS_MATERIAL_FLAG,
			   			  "Added" : "1"};

				tmpList.push(row);	
			}
			else if(type == "Jawa 9&10") {
				var row = {"NUM" : gridRow.NUM,
						   "PACKAGE_NO" : gridRow.PACKAGE_NO,
		                   "DESCRIPTION" : gridRow.DESCRIPTION,
		                   "PACKING_TYPE" : gridRow.PACKING_TYPE,
							"GROSS_WEIGHT" : gridRow.GROSS_WEIGHT,  
							"NET_WEIGHT" : gridRow.NET_WEIGHT,
							"RT" : gridRow.RT,
							"SHIPPING_VOLUME" : gridRow.SHIPPING_VOLUME,
							"SHIPPING_DIMENSION_L" : gridRow.SHIPPING_DIMENSION_L,
							"SHIPPING_DIMENSION_W" : gridRow.SHIPPING_DIMENSION_W,
							"SHIPPING_DIMENSION_H" : gridRow.SHIPPING_DIMENSION_H,
							"COUNTRY_OF_ORIGIN" : gridRow.COUNTRY_OF_ORIGIN,
							"REMARKS" : gridRow.REMARKS,
							"Added" : "1"};

				tmpList.push(row);	
			}
			else if(type == "주단품") {
		sheetCol = ["NUM",
                    "ZUDAN_HEAD",
                    "ZUDAN_START_NO",
					"ZUDAN_END_NO",  
					"ZUDAN_QTY",
					"PACKING_TYPE",
					"NET_WEIGHT",
					"GROSS_WEIGHT",
					"SHIPPING_DIMENSION_L",
					"SHIPPING_DIMENSION_W",
					"SHIPPING_DIMENSION_H",
					"SHIPPING_VOLUME"];				
			
				var row = {"NUM" : gridRow.NUM,
						   "PACKAGE_NO" : gridRow.ZUDAN_HEAD,
		                   "PACKING_TYPE" : gridRow.PACKING_TYPE,
							"GROSS_WEIGHT" : gridRow.GROSS_WEIGHT,  
							"NET_WEIGHT" : gridRow.NET_WEIGHT,
							"SHIPPING_VOLUME" : gridRow.SHIPPING_VOLUME,
							"SHIPPING_DIMENSION_L" : gridRow.SHIPPING_DIMENSION_L,
							"SHIPPING_DIMENSION_W" : gridRow.SHIPPING_DIMENSION_W,
							"SHIPPING_DIMENSION_H" : gridRow.SHIPPING_DIMENSION_H,
							"Added" : "1"};

				tmpList.push(row);	
			}
			else if(type == "Tuwaiq") {
				var row = {"NUM" : gridRow.NUM,
						   "PACKAGE_NO" : gridRow.PACKAGE_NO,
						   "PACKING_TYPE" : gridRow.PACKING_TYPE,
		                   "DESCRIPTION" : gridRow.DESCRIPTION,
		                   "SHIPPING_DIMENSION_L" : gridRow.SHIPPING_DIMENSION_L,
							"SHIPPING_DIMENSION_W" : gridRow.SHIPPING_DIMENSION_W,
							"SHIPPING_DIMENSION_H" : gridRow.SHIPPING_DIMENSION_H,
							"SHIPPING_VOLUME" : gridRow.SHIPPING_VOLUME,
							"NET_WEIGHT" : gridRow.NET_WEIGHT,
							"GROSS_WEIGHT" : gridRow.GROSS_WEIGHT,
							"HAZARDOUS_MATERIAL_FLAG": gridRow.HAZARDOUS_MATERIAL_FLAG,
							"REMARKS" : gridRow.REMARKS,
							"Added" : "1"};

				tmpList.push(row);	
			}
		}
	}
	
	if(v_trans_excel_upload_callback)
	{	
		v_trans_excel_upload_callback("select-item", tmpList);
	}			

}


var v_event;
function btnDlgTransShippingRequetsExcelUploadFileChange(event) {
	v_event = event;
	var sheetList = [];
	var input = event.target; 
	var reader = new FileReader(); 
	var list;
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'});
		read_buffer.SheetNames.forEach(function(sheetName){
			
			sheetList.push({"NAME" : sheetName});
		})
		
		$('#dlgTransShippingRequetsExcelUploadSheet').modal('show');	
		dlgExcelUploadSheetGrid.Source.Data.Data.Body = [sheetList];
		dlgExcelUploadSheetGrid.ReloadBody();			 
	}; 
	reader.readAsBinaryString(input.files[0]);	
}

function sheetClick( Grid, Row,Col ) {
	var sheetList = [];    
	var input = v_event.target; 
	var reader = new FileReader(); 
	var list;
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'});	
		var worksheet = read_buffer.Sheets[Row.NAME];
		var rowdata =XLSX.utils.sheet_to_json(worksheet, {header: sheetCol });		
		
		console.log("rowdata",rowdata);	
		list = setExcelUploadGridData(rowdata);
		
		dlgExcelUploadGrid.Source.Data.Data.Body = [list];
		dlgExcelUploadGrid.ReloadBody();
	 
	}; 
	reader.readAsBinaryString(input.files[0]); 
	input.value = null;
	$('#dlgTransShippingRequetsExcelUploadSheet').modal('hide');
}

function setExcelUploadGridData(rowdata) {
	var type = $('#selDlgTransShippingRequetsExcelUploadSelect').val();
	var list = [];
				
	if(type == "공통양식") {
		var cnt = 1;
		for(var i = 0; i < rowdata.length; i++){
			var row = rowdata[i];
			
			if(row.SHIPPING_DIMENSION_L != null && row.SHIPPING_DIMENSION_W != null && row.SHIPPING_DIMENSION_H != null && $.isNumeric(row.SHIPPING_DIMENSION_L)) {
			
				var gridRow = {"NUM": cnt,
							  "PACKAGE_NO": row["PACKAGE_NO"],
				   			  "DESCRIPTION": row["DESCRIPTION"],
				   			  "PACKING_TYPE": row["PACKING_TYPE"],
				   			  "SHIPPING_DIMENSION_L": row["SHIPPING_DIMENSION_L"],
				   			  "SHIPPING_DIMENSION_W": row["SHIPPING_DIMENSION_W"],
				   			  "SHIPPING_DIMENSION_H": row["SHIPPING_DIMENSION_H"],
				   			  "SHIPPING_VOLUME": row["SHIPPING_VOLUME"],
				   			  "NET_WEIGHT": row["NET_WEIGHT"],
				   			  "GROSS_WEIGHT": row["GROSS_WEIGHT"],
				   			  "HAZARDOUS_MATERIAL_FLAG": row["HAZARDOUS_MATERIAL_FLAG"]
								};
								
				list.push(gridRow);
				cnt += 1;				
			}
	
		} 			
	}
	else if(type == "Jawa 9&10") {
		var cnt = 1;
		for(var i = 0; i < rowdata.length; i++){
			var row = rowdata[i];
			
			if(row.SHIPPING_DIMENSION_L != null && row.SHIPPING_DIMENSION_W != null && row.SHIPPING_DIMENSION_H != null) {				
			
				if($.isNumeric(row.SHIPPING_DIMENSION_L)){
					var gridRow = {"NUM" : cnt,
								   "PACKAGE_NO" : row.PACKAGE_NO,
				                   "DESCRIPTION" : row.DESCRIPTION,
				                   "PACKING_TYPE" : row.PACKING_TYPE,
									"GROSS_WEIGHT" : row.GROSS_WEIGHT,  
									"NET_WEIGHT" : row.NET_WEIGHT,
									"RT" : row.RT,
									"SHIPPING_VOLUME" : row.SHIPPING_VOLUME,
									"SHIPPING_DIMENSION_L" : row.SHIPPING_DIMENSION_L,
									"SHIPPING_DIMENSION_W" : row.SHIPPING_DIMENSION_W,
									"SHIPPING_DIMENSION_H" : row.SHIPPING_DIMENSION_H,
									"COUNTRY_OF_ORIGIN" : row.COUNTRY_OF_ORIGIN,
									"REMARKS" : row.REMARKS
									};
									
					list.push(gridRow);
					cnt += 1;				
				}	
			}
		}	
	}	
	else if(type == "주단품") {
		var cnt = 1;
		for(var i = 0; i < rowdata.length; i++){
			var row = rowdata[i];
			
			if(row.ZUDAN_START_NO != null && row.ZUDAN_END_NO != null && row.SHIPPING_DIMENSION_L != null) {				
			
				if($.isNumeric(row.SHIPPING_DIMENSION_L)){
					var startNo = parseInt(row.ZUDAN_START_NO);
					var endNo = parseInt(row.ZUDAN_END_NO);
					var forCnt = 1;
					var no = 0;
					if(startNo < endNo) {
						forCnt =  ((endNo - startNo) / 10) +1;
					}
					
					for(var j = 0; j < forCnt; j++){
					    if(j > 0) {
							no = parseInt(no) + 10; 								 
						}	
						
						var gridRow = {"NUM" : cnt,
									   "ZUDAN_HEAD" : row.ZUDAN_HEAD,
					                   "ZUDAN_START_NO" : row.ZUDAN_START_NO,
					                   "ZUDAN_END_NO" : row.ZUDAN_END_NO,
										"ZUDAN_QTY" : row.ZUDAN_QTY,  
										"PACKING_TYPE" : row.PACKING_TYPE,
										"NET_WEIGHT" : row.NET_WEIGHT,
										"GROSS_WEIGHT" : row.GROSS_WEIGHT,
										"SHIPPING_DIMENSION_L" : row.SHIPPING_DIMENSION_L,
										"SHIPPING_DIMENSION_W" : row.SHIPPING_DIMENSION_W,
										"SHIPPING_DIMENSION_H" : row.SHIPPING_DIMENSION_H,
										"SHIPPING_VOLUME" : row.SHIPPING_VOLUME
										};
										
						list.push(gridRow);
						cnt += 1;																							
					}			
				}	
			}
		}	
	}
	else if(type == "Tuwaiq") {
		var cnt = 1;
		for(var i = 0; i < rowdata.length; i++){
			var row = rowdata[i];
			
			if(row.SHIPPING_DIMENSION_L != null && row.SHIPPING_DIMENSION_W != null && row.SHIPPING_DIMENSION_H != null) {				
			
				if($.isNumeric(row.SHIPPING_DIMENSION_L)){
					var gridRow = {"NUM" : row.NUM,
								   "PACKAGE_NO" : row.PACKAGE_NO,
								   "PACKING_TYPE" : row.PACKING_TYPE,
				                   "DESCRIPTION" : row.DESCRIPTION,
				                   "NOS": row.NOS,
				                   "UNIT": row.UNIT,
				                   "SHIPPING_DIMENSION_L" : row.SHIPPING_DIMENSION_L,
									"SHIPPING_DIMENSION_W" : row.SHIPPING_DIMENSION_W,
									"SHIPPING_DIMENSION_H" : row.SHIPPING_DIMENSION_H,
									"SHIPPING_VOLUME" : row.SHIPPING_VOLUME,
									"NET_WEIGHT" : row.NET_WEIGHT,
									"GROSS_WEIGHT" : row.GROSS_WEIGHT,  
									"HAZARDOUS_MATERIAL_FLAG": row.HAZARDOUS_MATERIAL_FLAG,
									"REMARKS" : row.REMARKS
									};
									
					list.push(gridRow);
					cnt += 1;				
				}	
			}
		}	
	}	
	
	return list;
}


