var v_desm_shipping_mark_creation_callback = null;
var v_desm_shipping_mark_creation_param;

var desmShippingMarkCreationGrid;
var desmShippingMarkCreationGridCol;
var desmShippingMarkCreationSheetCol;
var desmShippingMarkCreationExcelUploadSheetGrid;

function initDesmShippingMarkCreationPopUp(param , callback) {
	v_desm_shipping_mark_creation_callback = callback;
    v_desm_shipping_mark_creation_param = param;    
    
	$('#dlgDesmShippingMarkCreation').on('shown.bs.modal', function () {
		$('#dlgDesmShippingMarkCreation').click();
	});	
	
	$('#dlgDesmShippingMarkCreation').on('hidden.bs.modal', function () {
	  	closeDesmShippingMarkCreationPopUp();
	});
	    
    initDesmShippingMarkCreationPopUpCode();    
}

function initDesmShippingMarkCreationPopUpCode() {  
    
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
		 	initDesmShippingMarkCreationPopUpControls();
			
        }
    });    
    
    
}


function initDesmShippingMarkCreationPopUpControls() {		
	
	$('#dlgDesmShippingMarkCreation').modal('show');
	
    if(v_desm_shipping_mark_creation_param.supplier_yn == "Y") {
    	$('#txtDlgDesmShippingMarkCreationSupplier').val(v_desm_shipping_mark_creation_param.SUPPLIER);
    	$('#txtDlgDesmShippingMarkCreationSupplierNo').val(v_desm_shipping_mark_creation_param.SUPPLIER_NO);
    }
	
	makeAutocompletePo(
		"txtDlgDesmShippingMarkCreationPoNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmShippingMarkCreationSupplierNo",					//keyword3 파라메터 id
		v_desm_shipping_mark_creation_param.supplier_yn,					                        //supplier_yn
		"txtDlgDesmShippingMarkCreationPoName",		//clear필드 id
		"/getDesmMprPo.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {
			
			$("#txtDlgDesmShippingMarkCreationPoNo").val(ui.item.value.split("|")[0]);
			$("#txtDlgDesmShippingMarkCreationPoName").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmShippingMarkCreationSupplierNo").val(ui.item.value.split("|")[2]);
			$("#txtDlgDesmShippingMarkCreationSupplier").val(ui.item.value.split("|")[3]);
			$("#txtDlgDesmShippingMarkCreationProjectNo").val(ui.item.value.split("|")[5]);
			$("#txtDlgDesmShippingMarkCreationProjectName").val(ui.item.value.split("|")[6]);					
			
			setDesmShippingMarkCreationGrid(ui.item.value.split("|")[5]);
			
			return false;
		}
	);		
	
	$('#iconDlgDesmShippingMarkCreationPoNoSearch').click(function () { iconDlgDesmShippingMarkCreationPoNoSearchClick(); return false; });
	
	$('#btnDlgDesmShippingMarkCreationSave').click(function () { btnDlgDesmShippingMarkCreationSaveClick(); return false; });
	$('#btnDlgDesmShippingMarkCreationReport').click(function () { btnDlgDesmShippingMarkCreationReportClick(); return false; });
	$('#btnDlgDesmShippingMarkCreationGridAdd').click(function () { btnDlgDesmShippingMarkCreationGridAddClick(); return false; });
	$('#btnDlgDesmShippingMarkCreationGridDel').click(function () { btnDlgDesmShippingMarkCreationGridDelClick(); return false; });
	$('#btnDlgDesmShippingMarkCreationExcelDownload').click(function () { btnDlgDesmShippingMarkCreationExcelDownloadClick(); return false; });
	$('#btnDlgDesmShippingMarkCreationExcelUpload').click(function () { btnDlgDesmShippingMarkCreationExcelUploadClick(); return false; });
	$('#txtDlgDesmShippingMarkCreationExcelUploadFile').change(function () { txtDlgDesmShippingMarkCreationExcelUploadFileChange(event); return false; });
		
	
		
	TGSetEvent("OnRenderFinish","desmShippingMarkCreationGrid",function(grid){
		if(v_desm_shipping_mark_creation_param.HEADER_SEQ != null && v_desm_shipping_mark_creation_param.HEADER_SEQ != "") {
			searchDlgDesmShippingMarkCreationDetailList();
		}
			
	});	
	
	
    if(v_desm_shipping_mark_creation_param.HEADER_SEQ != null && v_desm_shipping_mark_creation_param.HEADER_SEQ != "") {
    	$('#txtDlgDesmShippingMarkCreationProjectNo').val(v_desm_shipping_mark_creation_param.PROJECT_NO);
    	$('#txtDlgDesmShippingMarkCreationProjectName').val(v_desm_shipping_mark_creation_param.PROJECT_NAME);
    	$('#txtDlgDesmShippingMarkCreationSupplier').val(v_desm_shipping_mark_creation_param.SUPPLIER);
    	$('#txtDlgDesmShippingMarkCreationSupplierNo').val(v_desm_shipping_mark_creation_param.SUPPLIER_NO);
    	$('#txtDlgDesmShippingMarkCreationPoNo').val(v_desm_shipping_mark_creation_param.PO_NO);
    	$('#txtDlgDesmShippingMarkCreationPoName').val(v_desm_shipping_mark_creation_param.PO_DESCRIPTION);
    	
    	$('#iconDlgDesmShippingMarkCreationPoNoSearch').remove();
    	$("#txtDlgDesmShippingMarkCreationPoNo").attr("readonly",true);
    	
    	
    	setDesmShippingMarkCreationGrid(v_desm_shipping_mark_creation_param.PROJECT_NO);
    	
    }	
    else {
   		$('#btnDlgDesmShippingMarkCreationReport').remove();
   		
   		setDesmShippingMarkCreationGrid("");
    }	
    
    var gridCode = getGridCode();
	var desmShippingMarkCreationExcelUploadSheetGridCol = {
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
			, "Cols" :[{ "Name": "NAME", "Width": "400", "Type": "Text", "CanEdit": "0", "Class" : "gridLinkText", "OnClickCell": "desmShippingMarkCreationExcelUploadSheetClick( Grid, Row,Col )" }]
			, "Header" : {"NAME": "Sheet"}
	
		};	
	
	desmShippingMarkCreationExcelUploadSheetGrid = TreeGrid( {Layout:{Data : desmShippingMarkCreationExcelUploadSheetGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmShippingMarkCreationExcelUploadSheetGrid" );    
	
	var list = v_desm_shipping_mark_creation_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
	
			
}

function iconDlgDesmShippingMarkCreationPoNoSearchClick(){	
	var search_type = "N";
	if(v_desm_shipping_mark_creation_param.supplier_yn == "Y") {
		search_type = "R";
	}
	var param = {keyword : $('#txtDlgDesmShippingMarkCreationPoNo').val(), keyword2 : "",
				 keyword3 : $('#txtDlgDesmShippingMarkCreationSupplierNo').val(), supplier_yn : v_desm_shipping_mark_creation_param.supplier_yn, search_type : search_type};

	$('#dlgDesmShippingMarkCreationPopUp').load("/desmPoListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmPoListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtDlgDesmShippingMarkCreationPoNo").val(returnParam.PO_NO);
					$("#txtDlgDesmShippingMarkCreationPoName").val(returnParam.PO_DESCRIPTION);
					$("#txtDlgDesmShippingMarkCreationSupplier").val(returnParam.SUPPLIER_NAME);
					$("#txtDlgDesmShippingMarkCreationSupplierNo").val(returnParam.SUPPLIER_NUMBER);
					$("#txtDlgDesmShippingMarkCreationProjectNo").val(returnParam.PROJECT_CODE);
					$("#txtDlgDesmShippingMarkCreationProjectName").val(returnParam.PROJECT_NAME);				
				}
			});	
		}
	});	
}



function btnDlgDesmShippingMarkCreationSaveClick() {
	desmShippingMarkCreationGrid.ActionAcceptEdit();
	
	if($('#txtDlgDesmShippingMarkCreationPoNo').val().length < 2 || $('#txtDlgDesmShippingMarkCreationPoName').val() == ""){
		$('#txtDlgDesmShippingMarkCreationPoNo').val("");
		$('#txtDlgDesmShippingMarkCreationPoName').val("");
		$("#txtDlgDesmShippingMarkCreationPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmShippingMarkCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	var changeObject = desmShippingMarkCreationGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;	
	
    var updateList = [];
	for(var i = 0; i < changeList.length; i++){
		var rowId = changeList[i].id;
		var row = desmShippingMarkCreationGrid.GetRowById(rowId);
		
		if(row.PACKAGE_NO == null || row.PACKAGE_NO == "") {
			alert_modal("", $('#alertSaveMprShippingMarkPakageNoCheck').val());
			return;		
		}
		
		var updateRow = objNullCheck({DETAIL_SEQ : row.DETAIL_SEQ, INVOICE_NO : row.INVOICE_NO, PACKAGE_LIST_NO : row.PACKAGE_LIST_NO,
									  PACKAGE_NO : row.PACKAGE_NO, DESCRIPTION : row.DESCRIPTION, DIMENSIONS_L : row.DIMENSIONS_L,
									  DIMENSIONS_W : row.DIMENSIONS_W, DIMENSIONS_H : row.DIMENSIONS_H, CBM : row.CBM,
									  GROSS : row.GROSS, NET : row.NET, STORAGE_CLASSIFICATION : row.STORAGE_CLASSIFICATION,
									  DEPARTURE_PORT : row.DEPARTURE_PORT, DESTINATION_PORT : row.DESTINATION_PORT, COUNTRY : row.COUNTRY});
							 
		updateList.push(updateRow);			
	}
		
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
		
			var list = JSON.stringify(updateList);
			var paramMap = objNullCheck({HEADER_SEQ : v_desm_shipping_mark_creation_param.HEADER_SEQ, PO_NO : $('#txtDlgDesmShippingMarkCreationPoNo').val(),
										 PROJECT_NO : $('#txtDlgDesmShippingMarkCreationProjectNo').val(), updateList : list});
									 
										 
			$.ajax({			
				url: "/saveDesmShippingMark.do",
				data: paramMap,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						
						
						if(v_desm_shipping_mark_creation_callback) {
							v_desm_shipping_mark_creation_callback("save-item", null);
						}
						
						$('#dlgDesmShippingMarkCreation').modal('hide');	
					}
				}
			});												 
		   
		}
	});					
}

function btnDlgDesmShippingMarkCreationReportClick() {	

	var selListParam = [];
	var row = {"HEADER_SEQ" : v_desm_shipping_mark_creation_param.HEADER_SEQ};
	selListParam.push(row);
	var list = JSON.stringify(selListParam);

	var paramData = {"list" : list};

	$.ajax({
		url: "/saveDesmShippingMarkReportList.do",
		data: paramData,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				alert_fail(result.error);
			} else {
				var popup = window.open('/shippingMarkMrd.do?fileNm=RD_TEST_SHIPPING_MARK', 'Crownix HTML5 Viewer', 'width=900px,height=800px,scrollbars=yes');
			}
		}
	});
}


function searchDlgDesmShippingMarkCreationDetailList() {

	var paramData = {HEADER_SEQ : v_desm_shipping_mark_creation_param.HEADER_SEQ};	

	$.ajax({
		url: "/getDesmShippingMarkDetailList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			desmShippingMarkCreationGrid.Source.Data.Data.Body = [data.results];
			desmShippingMarkCreationGrid.ReloadBody();
        }
    });	
}

function closeDesmShippingMarkCreationPopUp() {
	desmShippingMarkCreationGrid.Dispose();
	desmShippingMarkCreationExcelUploadSheetGrid.Dispose();
}

function setDesmShippingMarkCreationGrid(pjt) {
	if(desmShippingMarkCreationGrid != null){
		desmShippingMarkCreationGrid.Dispose();
	}	
	
	
	var gridCode = getGridCode();
	desmShippingMarkCreationGridCol = {
		"Cfg": {"id"				: "desmShippingMarkCreationGrid"
				, "CfgId"			: "desmShippingMarkCreationGridCfg"
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
				, "AutoSpan"        : "1" 
				, "Code" : gridCode			
				,"CopyCols" : "0"
				, "Sorting"			: "0"
				, "DynamicEditing" : "2"	
		},
		"Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		},
		"Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		}};
		
	
	if(pjt == "A") {
		
		desmShippingMarkCreationGridCol.Cols = [{ "Name": "INVOICE_NO", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1"  },
												{ "Name": "PACKAGE_LIST_NO", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1"  },
												{ "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1"  },
											 	{ "Name": "DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "DIMENSIONS_L", "Width": "90", "Type": "Int", "Format" : "###,###,###,###", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
									      		{ "Name": "DIMENSIONS_W", "Width": "90", "Type": "Int", "Format" : "###,###,###,###", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
									      		{ "Name": "DIMENSIONS_H", "Width": "90", "Type": "Int", "Format" : "###,###,###,###", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
									      		{ "Name": "CBM", "Width": "160", "Type": "Float", "Format" : "###,###,###,##0.#", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "GROSS", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.#", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "NET", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.#", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "STORAGE_CLASSIFICATION", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "DEPARTURE_PORT", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "DESTINATION_PORT", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "COUNTRY", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" }];
		desmShippingMarkCreationGridCol.Head = [{"Kind"	: "Header",
												 "id" : "Header",
												 "Spanned" : "1",
												 "PanelRowSpan" : "2",
												 "Class" : "gridCenterText",
												 "INVOICE_NO"	: "Invoice No.", "INVOICE_NORowSpan" : "2",
												 "PACKAGE_LIST_NO"	: "Packing list No.", "PACKAGE_LIST_NORowSpan" : "2",
												 "PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
												 "DESCRIPTION"	: "Description of Goods", "DESCRIPTIONRowSpan" : "2",
												 "DIMENSIONS_L"	: "Dimensions (L * W * H Cm)", "DIMENSIONS_LSpan" : "3",
												 "DIMENSIONS_W"	: "Dimensions (L * W * H Cm)",
												 "DIMENSIONS_H"	: "Dimensions (L * W * H Cm)",
												 "CBM"	: "CBM", "CBMRowSpan" : "2",
												 "GROSS"	: "Gross Weight (Kg)", "GROSSRowSpan" : "2",
												 "NET"	: "Net Weight (Kg)", "NETRowSpan" : "2",
												 "STORAGE_CLASSIFICATION"	: "Storage Classification", "STORAGE_CLASSIFICATIONRowSpan" : "2",
												 "DEPARTURE_PORT"	: "Departure Port", "DEPARTURE_PORTRowSpan" : "2",
												 "DESTINATION_PORT"	: "Destination Port", "DESTINATION_PORTRowSpan" : "2",
												 "COUNTRY"	: "Country of Origin", "COUNTRYRowSpan" : "2"},
											    {"Kind"	: "Header",
											 	 "Spanned" : "1",
												 "Class" : "gridCenterText",
												 "INVOICE_NO"	: "Invoice No.",
												 "PACKAGE_LIST_NO"	: "Packing list No.",
												 "PACKAGE_NO"	: "Package No.",
												 "DESCRIPTION"	: "Description of Goods",
												 "DIMENSIONS_L"	: "L",
												 "DIMENSIONS_W"	: "W",
												 "DIMENSIONS_H"	: "H",
												 "CBM"	: "CBM",
												 "GROSS"	: "Gross Weight (Kg)",
												 "NET"	: "Net Weight (Kg)",
												 "STORAGE_CLASSIFICATION"	: "Storage Classification",
												 "DEPARTURE_PORT"	: "Departure Port",
												 "DESTINATION_PORT"	: "Destination Port",
												 "COUNTRY"	: "Country of Origin"}];												 
												 	
		desmShippingMarkCreationSheetCol = ["INVOICE_NO",
						                    "PACKAGE_LIST_NO",
						                    "PACKAGE_NO",
											"DESCRIPTION",  
											"DIMENSIONS_L",
											"DIMENSIONS_W",
											"DIMENSIONS_H",
											"CBM",
											"GROSS",
											"NET",
											"STORAGE_CLASSIFICATION",
											"DEPARTURE_PORT",
											"DESTINATION_PORT",
											"COUNTRY"];			
		
	}
	else {
		desmShippingMarkCreationGridCol.Cols = [{ "Name": "INVOICE_NO", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1"  },
												{ "Name": "PACKAGE_LIST_NO", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1"  },
												{ "Name": "PACKAGE_NO", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1"  },
											 	{ "Name": "DESCRIPTION", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "DIMENSIONS_L", "Width": "90", "Type": "Int", "Format" : "###,###,###,###", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
									      		{ "Name": "DIMENSIONS_W", "Width": "90", "Type": "Int", "Format" : "###,###,###,###", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
									      		{ "Name": "DIMENSIONS_H", "Width": "90", "Type": "Int", "Format" : "###,###,###,###", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
									      		{ "Name": "CBM", "Width": "160", "Type": "Float", "Format" : "###,###,###,##0.#", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "GROSS", "Width": "140", "Type": "Float", "Format" : "###,###,###,##0.#", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "NET", "Width": "120", "Type": "Float", "Format" : "###,###,###,##0.#", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "STORAGE_CLASSIFICATION", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "DEPARTURE_PORT", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "DESTINATION_PORT", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" },
												{ "Name": "COUNTRY", "Width": "180", "Type": "Text", "CanEdit": "1", "Class" : "gridBorderText gridTextColor", "Spanned":"1" }];
		desmShippingMarkCreationGridCol.Head = [{"Kind"	: "Header",
												 "id" : "Header",
												 "Spanned" : "1",
												 "PanelRowSpan" : "2",
												 "Class" : "gridCenterText",
												 "INVOICE_NO"	: "Invoice No.", "INVOICE_NORowSpan" : "2",
												 "PACKAGE_LIST_NO"	: "Packing list No.", "PACKAGE_LIST_NORowSpan" : "2",
												 "PACKAGE_NO"	: "Package No.", "PACKAGE_NORowSpan" : "2",
												 "DESCRIPTION"	: "Description of Goods", "DESCRIPTIONRowSpan" : "2",
												 "DIMENSIONS_L"	: "Dimensions (L * W * H Cm)", "DIMENSIONS_LSpan" : "3",
												 "DIMENSIONS_W"	: "Dimensions (L * W * H Cm)",
												 "DIMENSIONS_H"	: "Dimensions (L * W * H Cm)",
												 "CBM"	: "CBM", "CBMRowSpan" : "2",
												 "GROSS"	: "Gross Weight (Kg)", "GROSSRowSpan" : "2",
												 "NET"	: "Net Weight (Kg)", "NETRowSpan" : "2",
												 "STORAGE_CLASSIFICATION"	: "Storage Classification", "STORAGE_CLASSIFICATIONRowSpan" : "2",
												 "DEPARTURE_PORT"	: "Departure Port", "DEPARTURE_PORTRowSpan" : "2",
												 "DESTINATION_PORT"	: "Destination Port", "DESTINATION_PORTRowSpan" : "2",
												 "COUNTRY"	: "Country of Origin", "COUNTRYRowSpan" : "2"},
											    {"Kind"	: "Header",
											 	 "Spanned" : "1",
												 "Class" : "gridCenterText",
												 "INVOICE_NO"	: "Invoice No.",
												 "PACKAGE_LIST_NO"	: "Packing list No.",
												 "PACKAGE_NO"	: "Package No.",
												 "DESCRIPTION"	: "Description of Goods",
												 "DIMENSIONS_L"	: "L",
												 "DIMENSIONS_W"	: "W",
												 "DIMENSIONS_H"	: "H",
												 "CBM"	: "CBM",
												 "GROSS"	: "Gross Weight (Kg)",
												 "NET"	: "Net Weight (Kg)",
												 "STORAGE_CLASSIFICATION"	: "Storage Classification",
												 "DEPARTURE_PORT"	: "Departure Port",
												 "DESTINATION_PORT"	: "Destination Port",
												 "COUNTRY"	: "Country of Origin"}];												 
												 	
		desmShippingMarkCreationSheetCol = ["INVOICE_NO",
						                    "PACKAGE_LIST_NO",
						                    "PACKAGE_NO",
											"DESCRIPTION",  
											"DIMENSIONS_L",
											"DIMENSIONS_W",
											"DIMENSIONS_H",
											"CBM",
											"GROSS",
											"NET",
											"STORAGE_CLASSIFICATION",
											"DEPARTURE_PORT",
											"DESTINATION_PORT",
											"COUNTRY"];		
	}
	
	
	desmShippingMarkCreationGrid = TreeGrid( {Layout:{Data : desmShippingMarkCreationGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmShippingMarkCreationGrid" );
}

function btnDlgDesmShippingMarkCreationGridAddClick() {
	if($('#txtDlgDesmShippingMarkCreationPoNo').val().length < 2 || $('#txtDlgDesmShippingMarkCreationPoName').val() == ""){
		$('#txtDlgDesmShippingMarkCreationPoNo').val("");
		$('#txtDlgDesmShippingMarkCreationPoName').val("");
		$("#txtDlgDesmShippingMarkCreationPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmShippingMarkCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	var gridAddRow = desmShippingMarkCreationGrid.AddRow(null,null,1,null,null);	
	desmShippingMarkCreationGrid.RefreshRow(gridAddRow);	
}

function btnDlgDesmShippingMarkCreationGridDelClick() {
	desmShippingMarkCreationGrid.ActionAcceptEdit();
	
	var selectList = desmShippingMarkCreationGrid.GetSelRows();
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
					desmShippingMarkCreationGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"DETAIL_SEQ" : row.DETAIL_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmShippingMarkDetail.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmShippingMarkCreationDetailList();
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

function btnDlgDesmShippingMarkCreationExcelDownloadClick() {
	if($('#txtDlgDesmShippingMarkCreationPoNo').val().length < 2 || $('#txtDlgDesmShippingMarkCreationPoName').val() == ""){
		$('#txtDlgDesmShippingMarkCreationPoNo').val("");
		$('#txtDlgDesmShippingMarkCreationPoName').val("");
		$("#txtDlgDesmShippingMarkCreationPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmShippingMarkCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	desmShippingMarkCreationGrid.ExportFormat="xlsx";
	desmShippingMarkCreationGrid.ActionExport();
	
	$(".TMMenuMain").hide();
	$(".TMMenuShadow").hide();
	$(".GridDisabled").hide();
	$("button[id^='TGMenuOk']").click();
}

function btnDlgDesmShippingMarkCreationExcelUploadClick() {
	if($('#txtDlgDesmShippingMarkCreationPoNo').val().length < 2 || $('#txtDlgDesmShippingMarkCreationPoName').val() == ""){
		$('#txtDlgDesmShippingMarkCreationPoNo').val("");
		$('#txtDlgDesmShippingMarkCreationPoName').val("");
		$("#txtDlgDesmShippingMarkCreationPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmShippingMarkCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	$('#txtDlgDesmShippingMarkCreationExcelUploadFile').click();
}

var v_event;
function txtDlgDesmShippingMarkCreationExcelUploadFileChange(event) {
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
		
		$('#dlgDesmShippingMarkCreationExcelUploadSheet').modal('show');	
		desmShippingMarkCreationExcelUploadSheetGrid.Source.Data.Data.Body = [sheetList];
		desmShippingMarkCreationExcelUploadSheetGrid.ReloadBody();			 
	}; 
	reader.readAsBinaryString(input.files[0]);	
}

function desmShippingMarkCreationExcelUploadSheetClick( Grid, Row,Col ) {
	var sheetList = [];    
	var input = v_event.target; 
	var reader = new FileReader(); 
	var list;
	reader.onload = function(){ 
		var fdata = reader.result; 
		var read_buffer = XLSX.read(fdata, {type : 'binary'});	
		var worksheet = read_buffer.Sheets[Row.NAME];
		var rowdata =XLSX.utils.sheet_to_json(worksheet, {header: desmShippingMarkCreationSheetCol });
			
		setDesmShippingMarkCreationExcelUploadGridData(rowdata);
	 
	}; 
	reader.readAsBinaryString(input.files[0]); 
	input.value = null;
	$('#dlgDesmShippingMarkCreationExcelUploadSheet').modal('hide');
}

function setDesmShippingMarkCreationExcelUploadGridData(rowdata) {
	var pjt = $('#txtDlgDesmShippingMarkCreationProjectNo').val();
	
				
	if(pjt == "A") {
		
		for(var i = 0; i < rowdata.length; i++){
			var row = rowdata[i];
			
			if(i > 1) {
				var gridRow = desmShippingMarkCreationGrid.AddRow(null,null,1,null,null);	
				gridRow.INVOICE_NO = row["INVOICE_NO"];
				gridRow.PACKAGE_LIST_NO = row["PACKAGE_LIST_NO"];
				gridRow.PACKAGE_NO = row["PACKAGE_NO"];
				gridRow.DESCRIPTION = row["DESCRIPTION"];
				gridRow.DIMENSIONS_L = row["DIMENSIONS_L"];
				gridRow.DIMENSIONS_W = row["DIMENSIONS_W"];
				gridRow.DIMENSIONS_H = row["DIMENSIONS_H"];
				gridRow.CBM = row["CBM"];
				gridRow.GROSS = row["GROSS"];
				gridRow.NET = row["NET"];
				gridRow.STORAGE_CLASSIFICATION = row["STORAGE_CLASSIFICATION"];
				gridRow.DEPARTURE_PORT = row["DEPARTURE_PORT"];
				gridRow.DESTINATION_PORT = row["DESTINATION_PORT"];
				gridRow.COUNTRY = row["COUNTRY"];
				
				desmShippingMarkCreationGrid.RefreshRow(gridRow);
			}
		} 			
	}
	else {
		for(var i = 0; i < rowdata.length; i++){
			var row = rowdata[i];
			
			if(i > 1) {
				var gridRow = desmShippingMarkCreationGrid.AddRow(null,null,1,null,null);	
				gridRow.INVOICE_NO = row["INVOICE_NO"];
				gridRow.PACKAGE_LIST_NO = row["PACKAGE_LIST_NO"];
				gridRow.PACKAGE_NO = row["PACKAGE_NO"];
				gridRow.DESCRIPTION = row["DESCRIPTION"];
				gridRow.DIMENSIONS_L = row["DIMENSIONS_L"];
				gridRow.DIMENSIONS_W = row["DIMENSIONS_W"];
				gridRow.DIMENSIONS_H = row["DIMENSIONS_H"];
				gridRow.CBM = row["CBM"];
				gridRow.GROSS = row["GROSS"];
				gridRow.NET = row["NET"];
				gridRow.STORAGE_CLASSIFICATION = row["STORAGE_CLASSIFICATION"];
				gridRow.DEPARTURE_PORT = row["DEPARTURE_PORT"];
				gridRow.DESTINATION_PORT = row["DESTINATION_PORT"];
				gridRow.COUNTRY = row["COUNTRY"];
				
				desmShippingMarkCreationGrid.RefreshRow(gridRow);
			}
		} 		
	}
	
	
	return list;
}
