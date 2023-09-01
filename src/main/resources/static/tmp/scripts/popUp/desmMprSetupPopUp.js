var v_desm_mpr_setup_callback = null;
var v_desm_mpr_setup_param;
var dlgDesmMprSetupDetailProgressGrid;
var dlgDesmMprSetupDetailProgressGridCol;
var dlgDesmMprSetupSupplierEmailGrid;
var dlgDesmMprSetupDoosanEmailGrid;



function initDesmMprSetupPopUp(param , callback) {
	v_desm_mpr_setup_callback = callback;
    v_desm_mpr_setup_param = param;    
    
	$('#dlgDesmMprSetup').on('shown.bs.modal', function () {
		$('#dlgDesmMprSetup').click();
	});	
	
	$('#dlgDesmMprSetup').on('hidden.bs.modal', function () {
	  	closeDesmMprSetupPopUp();
	});
    
    initDesmMprSetupPopUpCode();    
}

function initDesmMprSetupPopUpCode() {  
    
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			var updateBy = results.USER[0].USER_NAME + "&nbsp;&nbsp;" + results.USER[0].CUR_DAY;
			
			//$('#spanDlgDesmMprSetupCheckedBy').html(updateBy);		
		 
		 	initDesmMprSetupPopUpControls();
			
        }
    });    
    
}


function initDesmMprSetupPopUpControls() {	
	
	closeDesmMprSetupPopUp();
	
	$('#dlgDesmMprSetup').modal('show');	
    
    if(v_desm_mpr_setup_param.supplier_yn == "Y") {
    	$('#txtDlgDesmMprSetupSupplier').val(v_desm_mpr_setup_param.SUPPLIER);
    	$('#txtDlgDesmMprSetupSupplierNo').val(v_desm_mpr_setup_param.SUPPLIER_NO);
    }
    
    $('#txtDlgDesmMprSetupMprNo').val(v_desm_mpr_setup_param.MPR_NO);
	
	if(v_desm_mpr_setup_param.MPR_NO != null && v_desm_mpr_setup_param.MPR_NO != "") {
		$('#txtDlgDesmMprSetupPoNo').val(v_desm_mpr_setup_param.PO_NO);
		$('#txtDlgDesmMprSetupPoName').val(v_desm_mpr_setup_param.PO_DESCRIPTION);
		$('#txtDlgDesmMprSetupProjectNo').val(v_desm_mpr_setup_param.PROJECT_NO);
		$('#txtDlgDesmMprSetupProjectName').val(v_desm_mpr_setup_param.PROJECT_NAME);
		$('#txtDlgDesmMprSetupSupplier').val(v_desm_mpr_setup_param.SUPPLIER);
		$('#txtDlgDesmMprSetupSupplierNo').val(v_desm_mpr_setup_param.SUPPLIER_NO);
		$('#txtDlgDesmMprSetupProductName').val(v_desm_mpr_setup_param.PRODUCT_NAME);
		$('#txtDlgDesmMprSetupMprNo').val(v_desm_mpr_setup_param.MPR_NO);
		$('#txtDlgDesmMprSetupStatus').val(v_desm_mpr_setup_param.STATUS);
		
		if(v_desm_mpr_setup_param.MPR_SUBMISSION == "2") {
			$('#txtDlgDesmMprSetupTwiceAmonth').prop("checked",true);
			$('#txtDlgDesmMprSetupOnceAmonth').prop("checked",false);
		}
		
		
		$('#iconDlgDesmMprSetupPoNoSearch').remove();	
		$("#txtDlgDesmMprSetupPoNo").attr("readonly",true);
		
		if(v_desm_mpr_setup_param.STATUS == "Incomplete" || v_desm_mpr_setup_param.STATUS == "Returned") {
			$('#btnDlgDesmMprSetupEdit').remove();	
			$('#btnDlgDesmMprSetupConfirm').remove();
			$('#btnDlgDesmMprSetupReturn').remove();
			$('#btnDlgDesmMprSetupMailSave').remove();
			
		}			
		else if(v_desm_mpr_setup_param.STATUS == "Confirmed") {
			$('#btnDlgDesmMprSetupSave').remove();
			$('#btnDlgDesmMprSetupRequest').remove();
			$('#btnDlgDesmMprSetupConfirm').remove();
			$('#btnDlgDesmMprSetupDate').remove();
			//$('#btnDlgDesmMprSetupSupplierEmailDel').remove();
			//$('#btnDlgDesmMprSetupSupplierEmailAdd').remove();
			//$('#btnDlgDesmMprSetupDoosanEmailDel').remove();
			//$('#btnDlgDesmMprSetupDoosanEmailAdd').remove();
			
			
			
			$("#txtDlgDesmMprSetupProductName").attr("readonly",true);
			
		}
		else if(v_desm_mpr_setup_param.STATUS == "Pre-Confirmed") {
			$('#btnDlgDesmMprSetupEdit').remove();
			$('#btnDlgDesmMprSetupSave').remove();
			$('#btnDlgDesmMprSetupRequest').remove();
			$('#btnDlgDesmMprSetupDate').remove();
			//$('#btnDlgDesmMprSetupSupplierEmailDel').remove();
			//$('#btnDlgDesmMprSetupSupplierEmailAdd').remove();
			//$('#btnDlgDesmMprSetupDoosanEmailDel').remove();
			//$('#btnDlgDesmMprSetupDoosanEmailAdd').remove();
			
			
			$("#txtDlgDesmMprSetupProductName").attr("readonly",true);
			
		}				
	}
	else {
		$('#txtDlgDesmMprSetupStatus').val("Incomplete");
		$('#btnDlgDesmMprSetupEdit').remove();	
		$('#btnDlgDesmMprSetupConfirm').remove();
		$('#btnDlgDesmMprSetupReturn').remove();
		$('#btnDlgDesmMprSetupMailSave').remove();
		
	}
	
	makeAutocomplete(
		"txtDlgDesmMprSetupProjectNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMprSetupProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmMprSetupProjectNo").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMprSetupProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	makeAutocompletePo(
		"txtDlgDesmMprSetupPoNo", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmMprSetupSupplierNo",					//keyword3 파라메터 id
		v_desm_mpr_setup_param.supplier_yn,					                        //supplier_yn
		"txtDlgDesmMprSetupPoName",		//clear필드 id
		"/getDesmMprPo.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {
		
		if(ui.item.value.split("|")[7] == "Y") {
			confirm_modal("", $('#alertMprSetupPoSelect').val(), null, function (callobj, result) {
				if(result) {
					$("#txtDlgDesmMprSetupPoNo").val(ui.item.value.split("|")[0]);
					$("#txtDlgDesmMprSetupPoName").val(ui.item.value.split("|")[1]);
					$("#txtDlgDesmMprSetupSupplierNo").val(ui.item.value.split("|")[2]);
					$("#txtDlgDesmMprSetupSupplier").val(ui.item.value.split("|")[3]);
					$("#txtDlgDesmMprSetupProjectNo").val(ui.item.value.split("|")[5]);
					$("#txtDlgDesmMprSetupProjectName").val(ui.item.value.split("|")[6]);			
				}
			});		
		}
		else {
			$("#txtDlgDesmMprSetupPoNo").val(ui.item.value.split("|")[0]);
			$("#txtDlgDesmMprSetupPoName").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmMprSetupSupplierNo").val(ui.item.value.split("|")[2]);
			$("#txtDlgDesmMprSetupSupplier").val(ui.item.value.split("|")[3]);
			$("#txtDlgDesmMprSetupProjectNo").val(ui.item.value.split("|")[5]);
			$("#txtDlgDesmMprSetupProjectName").val(ui.item.value.split("|")[6]);		
		}			

			return false;
		}
	);	
	
	
	
	$('#btnDlgDesmMprSetupDate').click(function () { btnDlgDesmMprSetupDateClick(); return false; });
	$('#btnDlgDesmMprSetupSave').click(function () { btnDlgDesmMprSetupSaveClick(); return false; });
	$('#btnDlgDesmMprSetupMailSave').click(function () { btnDlgDesmMprSetupMailSaveClick(); return false; });
	$('#btnDlgDesmMprSetupConfirm').click(function () { btnDlgDesmMprSetupConfirmClick(); return false; });
	$('#btnDlgDesmMprSetupRequest').click(function () { btnDlgDesmMprSetupRequestClick(); return false; });
	$('#btnDlgDesmMprSetupReturn').click(function () { btnDlgDesmMprSetupReturnClick(); return false; });
	$('#btnDlgDesmMprSetupEdit').click(function () { btnDlgDesmMprSetupEditClick(); return false; });
	
	
	
	$('#iconDlgDesmMprSetupPoNoSearch').click(function () { iconDlgDesmMprSetupPoNoSearchClick(); return false; });
	$('#btnDlgDesmMprSetupSupplierEmailAdd').click(function () { btnDlgDesmMprSetupSupplierEmailAddClick(); return false; });
	$('#btnDlgDesmMprSetupSupplierEmailDel').click(function () { btnDlgDesmMprSetupSupplierEmailDelClick(); return false; });
	$('#btnDlgDesmMprSetupDoosanEmailAdd').click(function () { btnDlgDesmMprSetupDoosanEmailAddClick(); return false; });
	$('#btnDlgDesmMprSetupDoosanEmailDel').click(function () { btnDlgDesmMprSetupDoosanEmailDelClick(); return false; });	
	
	
	$('#divDlgDesmMprSetupAccordion').on('show.bs.collapse', function() {
		  
		  $('#iDlgDesmMprSetupCollapseIcon').removeClass("fa-arrow-alt-circle-down");
		  $('#iDlgDesmMprSetupCollapseIcon').addClass("fa-arrow-alt-circle-up");
		
	});
	
	$('#divDlgDesmMprSetupAccordion').on('hide.bs.collapse', function() {
		  $('#iDlgDesmMprSetupCollapseIcon').removeClass("fa-arrow-alt-circle-up");
		  $('#iDlgDesmMprSetupCollapseIcon').addClass("fa-arrow-alt-circle-down");
	});	
	
	var gridSearch = false;
	TGSetEvent("OnRenderFinish","dlgDesmMprSetupDetailProgressGrid",function(grid){
		if(gridSearch) {
			dlgDesmMprSetupDetailProgressGridReload(grid);
		}
		else {
			gridSearch = true;
			if(v_desm_mpr_setup_param.MPR_NO != null && v_desm_mpr_setup_param.MPR_NO != "") {
				searchDlgDesmMprSetupData();
			    searchDlgDesmMprSetupSupplierMail();
			    searchDlgDesmMprSetupUserMail();	
			}			
		}	
	});
	
	TGSetEvent("OnRenderFinish","dlgDesmMprSetupSupplierEmailGrid",function(grid){
		searchDlgDesmMprSetupSupplierMail();	
	});	
	
	TGSetEvent("OnRenderFinish","dlgDesmMprSetupDoosanEmailGrid",function(grid){
		searchDlgDesmMprSetupUserMail();	
	});		
	
	TGSetEvent("OnCopy","dlgDesmMprSetupDetailProgressGrid",function(grid, txt){
		copyToClipboard(txt);
	});
	
	var gridCode = getGridCode();
	
	dlgDesmMprSetupDetailProgressGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprSetupDetailProgressGrid"
			, "CfgId"			: "dlgDesmMprSetupDetailProgressGridCfg"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "330"
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
			, "AutoSpan"        : "1" 
			, "Code" : gridCode			
			,"CopyCols" : "0"
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
		}
		, "Toolbar" : {
			"Cells20Data"		: ""
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "0"
		}
		, "Panel" : {
			"Visible"	: "0"
			, "Spanned"	: "1"
		},
		"LeftCols": [{	"Name"	: "TYPE_NAME", "Width": "30", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned": "1", "Group": "1" },
				 	 {	"Name"	: "TYPE_SUB_NAME", "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" , "Group": "1"},
				 	 {	"Name"	: "GUBUN_NAME", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Group": "1" },
				 	 {	"Name"	: "WEIGHT", "Width": "80", "Type": "Int" , "Class" : "gridBorderText gridTextColor gridCenterText", "Format" : "##0\%", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" }],
		"Header" : {"Class" : "gridCenterText",
			  "Spanned" : "1",
			  "Height" : "35",
			  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMESpan" : "3",
//			  "TYPE_SUB_NAME"	: $('#gridColMprType').val(),
//			  "GUBUN_NAME"	: $('#gridColMprType').val(),
			  "WEIGHT"	: $('#gridColMprIncrease').val()
		}
//	    "Head" : [{"Kind"	: "Header",
//				  "id" : "Header",
//				  "Spanned" : "1",
//				  "Height" : "40",
//				  "PanelRowSpan" : "2",
//				  "Class" : "gridCenterText",
//				  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMESpan" : "3",
//				  "TYPE_SUB_NAME"	: $('#gridColMprType').val(),
//				  "GUBUN_NAME"	: $('#gridColMprType').val(),
//				  "WEIGHT"	: $('#gridColMprIncrease').val()},
//				  {"Kind"	: "Header",
//				  "Spanned" : "1",
//				  "Class" : "gridCenterText",
//				  "TYPE_NAME"	: $('#gridColMprType').val(),
//				  "TYPE_SUB_NAME"	: $('#gridColMprType').val(),
//				  "GUBUN_NAME"	: $('#gridColMprType').val(),
//				  "WEIGHT"	: $('#gridColMprIncrease').val()}]
	};

	var dlgDesmMprSetupSupplierEmailGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprSetupSupplierEmailGrid"
			, "CfgId"			: "dlgDesmMprSetupSupplierEmailGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "120"
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
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
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
	   "Cols" : [{	"Name"	: "MAIL", "Width": "380", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
	   			 {	"Name"	: "MEMO", "Width" :"434", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"}],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"MAIL"	: "E-mail", "MAILRowSpan" : "2",
					"MEMO"	: "Memo", "MEMORowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"MAIL"	: "E-mail",
					"MEMO"	: "Memo"}]
	};	
	
	var dlgDesmMprSetupDoosanEmailGridCol = {
		"Cfg": {
			"id"				: "dlgDesmMprSetupDoosanEmailGrid"
			, "CfgId"			: "dlgDesmMprSetupDoosanEmailGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "120"
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
			, "Sorting"			: "0"
			, "DynamicEditing" : "2"
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
	   "Cols" : [{	"Name"	: "MAIL", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
	   			 {	"Name"	: "MEMO", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
	   			 {	"Name"	: "EXPEDITER_YN", "Width" :"199", "Type": "Enum", "Enum" : "|NO|YES", "EnumKeys" : "|N|Y", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"}
	   			 ],
	   "Head" : [{ 	"Kind"	: "Header",
					"id" : "Header",
					"Spanned" : "1",
					"PanelRowSpan" : "2",
					"Class" : "gridCenterText",
					"MAIL"	: "E-mail", "MAILRowSpan" : "2",
					"MEMO"	: "Memo", "MEMORowSpan" : "2",
					"EXPEDITER_YN"	: "Expediter", "EXPEDITER_YNRowSpan" : "2"},
				   {"Kind"	: "Header",
					"Spanned" : "1",
					"Class" : "gridCenterText",
					"MAIL"	: "E-mail",
					"MEMO"	: "Memo",
					"EXPEDITER_YN"	: "Expediter"}]
	};			
	
	dlgDesmMprSetupDetailProgressGrid = TreeGrid( {Layout:{Data : dlgDesmMprSetupDetailProgressGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprSetupDetailProgress" );
	dlgDesmMprSetupSupplierEmailGrid = TreeGrid( {Layout:{Data : dlgDesmMprSetupSupplierEmailGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprSetupSupplierEmail" );
	dlgDesmMprSetupDoosanEmailGrid = TreeGrid( {Layout:{Data : dlgDesmMprSetupDoosanEmailGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDlgDesmMprSetupDoosanEmail" );	
	
	var list = v_desm_mpr_setup_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}		
}

function btnDlgDesmMprSetupReturnClick() {		

	var param = {"PO_NO" : v_desm_mpr_setup_param.PO_NO, MPR_NO : v_desm_mpr_setup_param.MPR_NO, RETURN_TYPE : "MPR_SETUP", "originComments" : v_desm_mpr_setup_param.REJECT_COMMENTS, "STATUS" : "Returned"};
	
	$('#dlgDesmMprSetupPopUp').load("/desmMprCommentsPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMprCommentsPopUp(param, function (key, returnParam) {
				if(key == "reject-item"){
					alert_success($('#alertSuccess').val());	
					
					if(v_desm_mpr_setup_callback) {
						v_desm_mpr_setup_callback("save-item", null);
					}
					
					$('#dlgDesmMprSetup').modal('hide');
				}
			});	
			
		}
	});
}

function btnDlgDesmMprSetupRequestClick() {
	dlgDesmMprSetupDataSave("Pre-Confirmed");
}

function dlgDesmMprSetupStatusSave(status) {

	var msg = $('#alertMprConfirm').val();
	if(status == "Incomplete") {
		msg = $('#alertMprSetupEdit').val();
	}
	
	confirm_modal("", msg, null, function (callobj, result) {
		if(result) {
			
			var updateList = [];
			//var updateRow = objNullCheck({STATUS : status, PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val()});
			var updateRow = objNullCheck({STATUS : status, PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val(), "REJECT_COMMENTS" : ""});
			updateList.push(updateRow);		
			var list = JSON.stringify(updateList);
			
			var paramData = {"updateList" : list};
				 				
							 
			$.ajax({			
				url: "/saveDesmMprSetupStatus.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-1") {
							alert_fail($('#alertMprConfirmErr').val());
						}							
						else if(result.error == "-4") {
							alert_fail($('#alertMailFail').val());
						}										
						else {
							alert_fail(result.error);
						}
					} else {
						alert_success($('#alertSuccess').val());	
									
						if(v_desm_mpr_setup_callback) {
							v_desm_mpr_setup_callback("save-item", null);
						}
						
						$('#dlgDesmMprSetup').modal('hide');		
					}
				}		
			});								 					
						
		}
	});		
}

function btnDlgDesmMprSetupEditClick() {
	dlgDesmMprSetupStatusSave("Incomplete");
}

function btnDlgDesmMprSetupConfirmClick() {
	dlgDesmMprSetupStatusSave("Confirmed");
}

function btnDlgDesmMprSetupSaveClick() {
	dlgDesmMprSetupDataSave("Incomplete");
}

function dlgDesmMprSetupDataSave(status) {
	dlgDesmMprSetupDetailProgressGrid.ActionAcceptEdit();
	dlgDesmMprSetupSupplierEmailGrid.ActionAcceptEdit();
	dlgDesmMprSetupDoosanEmailGrid.ActionAcceptEdit();
		
	if($('#txtDlgDesmMprSetupPoNo').val().length < 2 || $('#txtDlgDesmMprSetupPoName').val() == ""){
		$('#txtDlgDesmMprSetupPoNo').val("");
		$('#txtDlgDesmMprSetupPoName').val("");
		$("#txtDlgDesmMprSetupPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmMprSetupBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	var gridList = dlgDesmMprSetupDetailProgressGrid.Rows;
	var gridDoosanEmailList = dlgDesmMprSetupDoosanEmailGrid.Rows;
	var checkCnt = 0;
	for (var key in gridDoosanEmailList) {	
		var row = gridDoosanEmailList[key];
		if(row.Fixed == null){
			if(row.EXPEDITER_YN == "Y") {
				checkCnt = checkCnt + 1;
			}
		}
	}
	
	if(checkCnt > 1 || checkCnt == 0) {
		alert_modal("", $('#alertSaveMprSetupDoosanMailExpediterCheckErr').val());
		return;		
	} 

	checkCnt = 0;
	var submissionPeriod = 'No';
	$.each(gridList, function(i, row) {
		if(row.Fixed == null && row.GUBUN_CODE == 'NN') {
			$.each(colList, function(idx, colLRow) {
				if(idx < colList.length -1) {
					if(submissionPeriod == 'Yes') {
						if(row[colLRow.COL_NAME] == 'No') {
							checkCnt = checkCnt + 1;
							return false;
						}		
					} else {
						if(row[colLRow.COL_NAME] == 'Yes') {
							submissionPeriod = 'Yes';		
						}		
					}
				}
			});
		}
	});	
	
	if(checkCnt > 0) {
		alert_modal("", $('#alertSaveMprSetupSubmissionPeriodCheckErr').val());
		return;		
	} 

	var changeSupplierMailObject = dlgDesmMprSetupSupplierEmailGrid.GetChanges();
	var changeSupplierMailList = JSON.parse(changeSupplierMailObject).Changes;
	
	var changeUserMailObject = dlgDesmMprSetupDoosanEmailGrid.GetChanges();
	var changeUserMailList = JSON.parse(changeUserMailObject).Changes;
	
	var msg = $('#alertSave').val();
	if(status == "Pre-Confirmed") {
		msg = $('#alertRequest').val();
	}
	
	confirm_modal("", msg, null, function (callobj, result) {
		if(result) {
		
		    var updateList = [];
		    var updateRemarkList = [];
		    var weight = 0;

			var submissionPeriod = '';
			var submissionPeriodMonth = '';
			
			for (var key in gridList) {	
				var row = gridList[key];
				if(row.Fixed == null){
					if(row.TYPE_CODE == "NN") {
		    			$.each(colList, function(idx, colLRow) {
		    				submissionPeriod += submissionPeriod.length > 0 ? ',' : '';
		    				submissionPeriod += row[colLRow.COL_NAME];
		    				submissionPeriodMonth += submissionPeriodMonth.length > 0 ? ',' : '';
		    				submissionPeriodMonth += (colLRow.YYYY + '/' + colLRow.MM);
		    			});
					} else {
						if(row.GUBUN_CODE == "P") {
						    
							var checkPer = false;
							var checkPerOver = false;
							var prevVal = "";
							var checkVal = false;
							for (var j = 0; j < colList.length; j++) {
								var colLRow = colList[j];
//								var updateRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), 
//															  TYPE_CODE : row.TYPE_CODE, GUBUN_CODE : row.GUBUN_CODE, YYYY : colLRow.YYYY, MM : colLRow.MM,
//															  VAL : row[colLRow.COL_NAME]});
								var updateRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), 
									  TYPE_CODE : row.TYPE_CODE, GUBUN_CODE : row.GUBUN_CODE, 
									  TYPE_SUB_CODE : 'NN', GUBUN_SUB_CODE : 'NN', 
									  YYYY : colLRow.YYYY, MM : colLRow.MM,
									  VAL : row[colLRow.COL_NAME], VAL_SUB : ''});
														  
								if(row[colLRow.COL_NAME] != null && row[colLRow.COL_NAME] != "" && row[colLRow.COL_NAME] == "1") {
									checkPer = true;
								}	
								
								if(row[colLRow.COL_NAME] != null && row[colLRow.COL_NAME] != "" && row[colLRow.COL_NAME] > "1") {
									checkPerOver = true;
								}	
								
								if(prevVal == "") {
									prevVal = row[colLRow.COL_NAME] == null || row[colLRow.COL_NAME] == "" ? "0" : row[colLRow.COL_NAME];
								}
								else{
									var curVal = row[colLRow.COL_NAME] == null || row[colLRow.COL_NAME] == "" ? "0" : row[colLRow.COL_NAME];
									if(prevVal > curVal) {
										checkVal = true;
									}
								
								}																		  
												 
								updateList.push(updateRow);
							}
							
							
								
							if(!checkPer) {
								alert_modal("", $('#alertSaveMprSetupPerCheckErr').val());
								return;		
							}
							
							if(checkPerOver) {
								alert_modal("", $('#alertSaveMprSetupPerOverCheckErr').val());
								return;		
							}
							
							if(checkVal) {
								alert_modal("", $('#alertSaveMprSetupPrevValCheckErr').val());
								return;		
							}																	    
					    }
					    /*if(row.GUBUN_CODE == "P"
					    	|| (row.TYPE_SUB_CODE != null && row.TYPE_SUB_CODE != '' && row.TYPE_SUB_CODE != 'NN')) {
					    
							var checkPer = false;
							var checkPerOver = false;
							var prevVal = "";
							var checkVal = false;
							for (var j = 0; j < colList.length; j++) {
								var colLRow = colList[j];
								var typeCode 		= row.TYPE_CODE 		== null ? '' : row.TYPE_CODE;
								var gubunCode 		= row.GUBUN_CODE 		== null ? 'NN' : row.GUBUN_CODE;
								var typeSubCode 	= row.TYPE_SUB_CODE		== null ? 'NN' : row.TYPE_SUB_CODE;
								var gubunSubCode	= row.GUBUN_SUB_CODE	== null ? 'NN' : row.GUBUN_SUB_CODE;
								var updateRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), 
															  TYPE_CODE : typeCode, GUBUN_CODE : gubunCode, 
															  TYPE_SUB_CODE : typeSubCode, GUBUN_SUB_CODE : gubunSubCode, 
															  YYYY : colLRow.YYYY, MM : colLRow.MM,
															  VAL : 0, VAL_SUB : ''});
								
								if(row.GUBUN_CODE == "P") {
									if(row[colLRow.COL_NAME] != null && row[colLRow.COL_NAME] != "" && row[colLRow.COL_NAME] == "1") {
										checkPer = true;
									}	
									
									if(row[colLRow.COL_NAME] != null && row[colLRow.COL_NAME] != "" && row[colLRow.COL_NAME] > "1") {
										checkPerOver = true;
									}	
									
									if(prevVal == "") {
										prevVal = row[colLRow.COL_NAME] == null || row[colLRow.COL_NAME] == "" ? "0" : row[colLRow.COL_NAME];
									}
									else{
										var curVal = row[colLRow.COL_NAME] == null || row[colLRow.COL_NAME] == "" ? "0" : row[colLRow.COL_NAME];
										if(prevVal > curVal) {
											checkVal = true;
										}
									
									}
									updateRow.VAL = row[colLRow.COL_NAME];
//									updateRow.VAL_SUB = '';		
								} else {	
									updateRow.VAL_SUB = formatDate(row[colLRow.COL_NAME]);
									checkPer = true;
								}					
								updateList.push(updateRow);
							}

							if(!checkPer) {
								alert_modal("", $('#alertSaveMprSetupPerCheckErr').val());
								return;		
							}

							if(checkPerOver) {
								alert_modal("", $('#alertSaveMprSetupPerOverCheckErr').val());
								return;		
							}

							if(checkVal) {
								alert_modal("", $('#alertSaveMprSetupPrevValCheckErr').val());
								return;		
							}
					    }*/
					}
				    
				    var weightTmp =  row.WEIGHT == null ? 0 : row.WEIGHT * 100; 
				    weight = weight + weightTmp;   
				    
					var updateRemarkRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), TYPE_CODE : row.TYPE_CODE, GUBUN_CODE : row.GUBUN_CODE,
													TYPE_SUB_CODE : 'NN', GUBUN_SUB_CODE : 'NN', REMARK : row.REMARK, WEIGHT : row.WEIGHT});	
//					var updateRemarkRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), TYPE_CODE : row.TYPE_CODE, GUBUN_CODE : row.GUBUN_CODE,
//						TYPE_SUB_CODE : row.TYPE_SUB_CODE, GUBUN_SUB_CODE : row.GUBUN_SUB_CODE, REMARK : row.REMARK, WEIGHT : row.WEIGHT});	
					updateRemarkList.push(updateRemarkRow);				
				
				}
					
			}
			
//			console.log(JSON.stringify(updateList));
			
			if(weight != 100) {
				alert_modal("", $('#alertSaveMprSetupWeightCheckErr').val());
				return;					
			}
			
			var list = JSON.stringify(updateList);
			var remarkList = JSON.stringify(updateRemarkList);
			
		    var updateSupplierMailList = [];
			for(var i = 0; i < changeSupplierMailList.length; i++){
				var rowId = changeSupplierMailList[i].id;
				var row = dlgDesmMprSetupSupplierEmailGrid.GetRowById(rowId);
				
				var updateSupplierMailRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MAIL : row.MAIL, MEMO : row.MEMO, MAIL_SEQ : row.MAIL_SEQ});
									 
					updateSupplierMailList.push(updateSupplierMailRow);			
			}
			var supplierMail = JSON.stringify(updateSupplierMailList);
			
		    var updateUserMailList = [];
			for(var i = 0; i < changeUserMailList.length; i++){
				var rowId = changeUserMailList[i].id;
				var row = dlgDesmMprSetupDoosanEmailGrid.GetRowById(rowId);
				
				var updateUserMailRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MAIL : row.MAIL, MEMO : row.MEMO, MAIL_SEQ : row.MAIL_SEQ, P_USER_AD : row.USER_AD, P_USER_AD : row.USER_AD, EXPEDITER_YN : row.EXPEDITER_YN});
									 
					updateUserMailList.push(updateUserMailRow);			
			}
			var userMail = JSON.stringify(updateUserMailList);			
			
			
			$.ajax({			
				url: "/saveDesmMprSetupData.do",
				data: {updateList : list, updateRemarkList : remarkList, updateSupplierMailList : supplierMail, updateUserMailList : userMail, STATUS : status, 
				       PRODUCT_NAME : $('#txtDlgDesmMprSetupProductName').val(), PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val(),
				       MPR_SUBMISSION : $('input[name=txtDlgDesmMprSetupMprSubmission]:checked').val(), SUBMISSION_PERIOD : submissionPeriod, SUBMISSION_PERIOD_MONTH : submissionPeriodMonth},
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-2") {
							alert_fail($('#alertMailFail').val());
						}	
						else {
							alert_fail(result.error);
						}	
					} else {
						alert_success($('#alertSuccess').val());
						
						
						if(status == "Incomplete") {
							$('#txtDlgDesmMprSetupMprNo').val(result.MPR_NO);
							$('#iconDlgDesmMprSetupPoNoSearch').remove();	
							$("#txtDlgDesmMprSetupPoNo").attr("readonly",true);
													
							searchDlgDesmMprSetupData();	
							searchDlgDesmMprSetupSupplierMail();
							searchDlgDesmMprSetupUserMail();
							
							if(v_desm_mpr_setup_callback) {
								v_desm_mpr_setup_callback("save-item", null);
							}							
						}
						else {
						
							if(v_desm_mpr_setup_callback) {
								v_desm_mpr_setup_callback("save-item", null);
							}
							
							$('#dlgDesmMprSetup').modal('hide');						
						}
					}
				}
			});				
					
		}
	});		
}


function btnDlgDesmMprSetupDateClick() {	
	
	
	if($('#txtDlgDesmMprSetupPoNo').val().length < 2 || $('#txtDlgDesmMprSetupPoName').val() == ""){
		$('#txtDlgDesmMprSetupPoNo').val("");
		$('#txtDlgDesmMprSetupPoName').val("");
		$("#txtDlgDesmMprSetupPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	
	var chkValidation = checkRequiredField("divDlgDesmMprSetupBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
		
	
	var param = {PROJECT_NO : $('#txtDlgDesmMprSetupProjectNo').val(),
					 PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val()};
					 
	$('#dlgDesmMprSetupPopUp').load("/desmMprSetupDatePopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			
			initDesmMprSetupDataPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#txtDlgDesmMprSetupMprNo').val(returnParam);
					$('#iconDlgDesmMprSetupPoNoSearch').remove();	
					$("#txtDlgDesmMprSetupPoNo").attr("readonly",true);					
					searchDlgDesmMprSetupData();
				}
			});	
			
		}
	});					 		
}

var colList = [];
var submissionPeriodData = {};
function searchDlgDesmMprSetupData() {	

	dlgDesmMprSetupDetailProgressGrid.Dispose();
	
	gridLoad = true;
	$.ajax({
		url: "/getDesmMprSetupData.do",	
		data: {PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val()},
		success: function (data, textStatus, jqXHR) {
			colList = data.results.colList;
			var dataList = data.results.dataList;
			
			if(dataList.length > 0) {
				submissionPeriodData = dataList[0];
			}
			setDlgDesmMprSetupData(dataList);			
			
		}
	});	
}

function searchDlgDesmMprSetupSupplierMail() {	

	var paramData = {PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val()};
	
	$.ajax({
		url: "/getDesmMprSetupSupplierMail.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			dlgDesmMprSetupSupplierEmailGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprSetupSupplierEmailGrid.ReloadBody();
			
			/*
			if($('#txtDlgDesmMprSetupStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprSetupSupplierEmailGrid);
			}
			*/			
			
        }
    });
}

function searchDlgDesmMprSetupUserMail() {	

	var paramData = {PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val()};
	
	$.ajax({
		url: "/getDesmMprSetupUserMail.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			
			dlgDesmMprSetupDoosanEmailGrid.Source.Data.Data.Body = [data.results];
			dlgDesmMprSetupDoosanEmailGrid.ReloadBody();
			
			/*
			if($('#txtDlgDesmMprSetupStatus').val() == "Confirmed") {
				setGridEdit(dlgDesmMprSetupDoosanEmailGrid);
			}
			*/				
			
        }
    });		
}

function dlgDesmMprSetupDetailProgressGridReload(grid) {
	var list = grid.Rows;
	
	for (var key in list) {		
	
		var gridRow = list[key];
		if(gridRow.Fixed == null){	
			if(gridRow.TYPE_SUB_NAME == null || gridRow.TYPE_SUB_NAME == '') {
				var bgColor = (gridRow.TYPE_SUB_NAME == null || gridRow.TYPE_SUB_NAME == '') ? (gridRow.GUBUN_CODE == "P") ? '#FFFFCC' : '': '';
				if(gridRow.GUBUN_CODE == "C") {
					gridRow.TYPE_SUB_NAMEBackground = bgColor;
					gridRow.TYPE_NAMEBackground = bgColor;
					gridRow.GUBUN_NAMEBackground = bgColor;
					gridRow.REMARKBackground = bgColor;
					gridRow.WEIGHTBackground = bgColor;
					gridRow.REMARKCanEdit = 0;
					gridRow.WEIGHTCanEdit = 0;
				}
				else if(gridRow.GUBUN_CODE == "R") {
					gridRow.TYPE_SUB_NAMEBackground = bgColor;
					gridRow.TYPE_NAMEBackground = bgColor;
					gridRow.GUBUN_NAMEBackground = bgColor;
					gridRow.REMARKBackground = bgColor;
					gridRow.WEIGHTBackground = bgColor;
					gridRow.REMARKCanEdit = 0;
					gridRow.WEIGHTCanEdit = 0;
				}
				else if(gridRow.GUBUN_CODE == "P") {
					gridRow.TYPE_NAMESpanned = 1;
					gridRow.TYPE_NAMERowSpan = 3;
					gridRow.TYPE_SUB_NAMEBackground = bgColor;
					gridRow.TYPE_NAMEBackground = bgColor;
					gridRow.GUBUN_NAMEBackground = bgColor;
					gridRow.REMARKBackground = bgColor;
					gridRow.WEIGHTBackground = bgColor;
					gridRow.REMARKCanEdit = 1;
					gridRow.WEIGHTCanEdit = 1;
					for (var i = 0; i < colList.length; i++) {
						var colLRow = colList[i];
						gridRow[colLRow.COL_NAME + 'Type'] = 'Int';
						gridRow[colLRow.COL_NAME + 'Format'] = '##0\%';
						gridRow[colLRow.COL_NAME + 'CanEdit'] = '1';
						gridRow[colLRow.COL_NAME + 'Background'] = bgColor;
					}
				}
				else if(gridRow.GUBUN_CODE == "NN") {
					gridRow.TYPE_NAMESpanned = '1';
					gridRow.TYPE_NAMESpan = 3;
					gridRow.WEIGHT = '';
					gridRow.REMARKCanEdit = 0;
					gridRow.WEIGHTCanEdit = 0;
					gridRow.GUBUN_NAME = "";
//					gridRow.GUBUN_NAMESpan = 2;
//					gridRow.GUBUN_NAMESpanned = 1;
					
					for (var i = 0; i < colList.length; i++) {
						var colLRow = colList[i];
						gridRow[colLRow.COL_NAME + 'Type'] = 'Enum';
						gridRow[colLRow.COL_NAME + 'Enum'] = '|Yes|No';
						gridRow[colLRow.COL_NAME + 'EnumKeys'] = '|Yes|No';
						gridRow[colLRow.COL_NAME + 'Format'] = '';
						gridRow[colLRow.COL_NAME + 'CanEdit'] = '1';
						gridRow[colLRow.COL_NAME + 'Class'] = 'gridBorderText gridTextColor gridCenterText';
						gridRow[colLRow.COL_NAME] = submissionPeriodData[colLRow.COL_NAME];
					}
				}
				
				if(gridRow.GUBUN_CODE != "P" && gridRow.GUBUN_CODE != "NN") {
					gridRow.TYPE_NAME = "";
					gridRow.WEIGHT = "";
				}
			} else {
				if(gridRow.GUBUN_SUB_CODE == "P") {
					gridRow.REMARKCanEdit = 1;
					gridRow.REMARKBackground = '#FFFFCC';
				} else {
					gridRow.REMARKCanEdit = 0;
					gridRow.REMARKBackground = '';
				}
			}
			
			grid.RefreshRow(gridRow);
			
		}
	}	
	
	if($('#txtDlgDesmMprSetupStatus').val() == "Confirmed" || $('#txtDlgDesmMprSetupStatus').val() == "Pre-Confirmed") {
		setGridEdit(grid);
	}
	
}

function setDlgDesmMprSetupData(dataList) {
	
	dlgDesmMprSetupDetailProgressGridCol.Cols = [];
				 								  
	dlgDesmMprSetupDetailProgressGridCol.Head = [];
	var gridColHeader1 = {"Kind"	: "Header",
						  "id" : "Header",
						  "Spanned" : "1",
						  "PanelRowSpan" : "2",
						  "Class" : "gridCenterText",
						  "TYPE_NAME"	: $('#gridColMprType').val(), "TYPE_NAMESpanned" : "1", "TYPE_NAMESpan" : "3",
						  "GUBUN_NAME"	: $('#gridColMprType').val()};
	var gridColHeader2 = {"Kind"	: "Header",
						  "Spanned" : "1",
						  "Class" : "gridCenterText",
						  "TYPE_NAME"	: $('#gridColMprType').val(),
						  "GUBUN_NAME"	: $('#gridColMprType').val()};
	
//	var gridCol = {};
//	gridCol.Name = "WEIGHT";
//	gridCol.Width = "100";
//	gridCol.Type = "Int";
//	gridCol.Format = "##0\%";
//	gridCol.Class = "gridBorderText gridTextColor gridCenterText";
//	gridCol.CanMove = "0";
//	gridCol.CanEdit = "1";
//	gridCol.Spanned = "1";
//	dlgDesmMprSetupDetailProgressGridCol.Cols.push(gridCol);  
//	
//	gridColHeader1["WEIGHT"] = $('#gridColMprIncrease').val();
//	gridColHeader1["WEIGHTRowSpan"] = "2";
//	gridColHeader2["WEIGHT"] = $('#gridColMprIncrease').val();     
		
	for (var i = 0; i < colList.length; i++) {
		var colLRow = colList[i];
		
		var gridCol = {};
		gridCol.Name = colLRow.COL_NAME;
		gridCol.Width = "100";
//		gridCol.Type = "Int";
//		gridCol.Format = "##0\%";
//		gridCol.Class = "gridBorderText gridTextColor gridCenterText";
//		gridCol.CanMove = "0";
//		gridCol.CanEdit = "1";
//		gridCol.Spanned = "1";
//		gridCol.Background = "#FFFFCC";
//		
		dlgDesmMprSetupDetailProgressGridCol.Cols.push(gridCol);  
		
		gridColHeader1[gridCol.Name] = colLRow.YY + "." + colLRow.MM;
//		gridColHeader1[gridCol.Name + "RowSpan"] = "2";
		
//		gridColHeader2[gridCol.Name] = colLRow.YY + "." + colLRow.MM;     
	}
	
	var gridCol = {};
	gridCol.Name = "REMARK";
	gridCol.Width = "300";
	gridCol.Type = "Text";
	gridCol.Class = "gridBorderText gridTextColor";
	gridCol.CanMove = "0";
	gridCol.CanEdit = "1";
	gridCol.Spanned = "1";
	dlgDesmMprSetupDetailProgressGridCol.Cols.push(gridCol);  
	
	gridColHeader1["REMARK"] = "Remark";
//	gridColHeader1["REMARKRowSpan"] = "2";
//	gridColHeader2["REMARK"] = "Remark";     	
	
	dlgDesmMprSetupDetailProgressGridCol.Head.push(gridColHeader1);
//	dlgDesmMprSetupDetailProgressGridCol.Head.push(gridColHeader2);
	
	var gridBodyData = [];
	$.each(dataList, function(i, item) {
		var bodyData = item;
		if(i == 0) {
			bodyData['Spanned'] = '1';
			bodyData['TYPE_NAMESpan'] = "3";
			bodyData['TYPE_SUB_NAME'] = '';
			bodyData['GUBUN_NAME'] = '';
			bodyData['REMARKCanEdit'] = 0;
		} else {
			if(item.TYPE_SUB_NAME == null || item.TYPE_SUB_NAME == '' || item.TYPE_SUB_NAME == 'NN') {
				if(item.GUBUN_CODE == "P") {
					bodyData['Spanned'] = '1';
					bodyData['TYPE_NAMERowSpan'] = '3';
					bodyData['TYPE_NAMESpan'] = "2";
					bodyData['WEIGHTRowSpan'] = '3';
				}
				for (var i = 0; i < colList.length; i++) {
					var colName = colList[i].COL_NAME;
					bodyData[colName] = Number(item[colName]);
					bodyData[colName + 'Width'] = '100';
					bodyData[colName + 'Type'] = 'Int';
					bodyData[colName + 'Format'] = '##0\%';
					bodyData[colName + 'CanMove'] = '0';
					bodyData[colName + 'CanEdit'] = '1';
					bodyData[colName + 'Spanned'] = '1';
//					bodyData[colName + 'Background'] = '#FFFFCC';
					bodyData[colName + 'Class'] = 'gridBorderText gridTextColor gridCenterText';
				}
			} else {
				bodyData['Spanned'] = '1';
				bodyData['GUBUN_NAME'] = item.GUBUN_SUB_NAME;
				bodyData['GUBUN_NAMESpan'] = "2";
				bodyData['GUBUN_NAMEClass'] = "gridBorderText gridTextColor";
				bodyData['TYPE_NAME'] = '';
				bodyData['WEIGHT'] = '';
				if(item.GUBUN_SUB_CODE == "P") {
					bodyData['TYPE_NAMERowSpan'] = "2";
					bodyData['TYPE_SUB_NAMERowSpan'] = "2";
					bodyData["GUBUN_NAMEBackground"] = '#FFFFCC';
				}
				for (var i = 0; i < colList.length; i++) {
					var colName = colList[i].COL_NAME;
					if(bodyData.GUBUN_SUB_CODE == "P") {
						bodyData[colName + 'Type'] = 'Date';
						bodyData[colName + 'CanEdit'] = '0';
						bodyData[colName + 'OnClickCell'] = 'ShowCustomCalendar( Grid, Row,Col )';
						bodyData[colName + 'Button'] = '';
						bodyData[colName + 'Format'] = 'yy/MM/dd';
						bodyData[colName + 'Background'] = '#FFFFCC';
					} else {
						bodyData[colName + 'Type'] = 'Text';
						bodyData[colName + 'CanEdit'] = '0';
						bodyData[colName + 'OnClickCell'] = '';
						bodyData[colName + 'Background'] = '';
						if(bodyData[colName] != null && bodyData[colName].length == 10) {
							bodyData[colName] = bodyData[colName].substring(2);
						}
					}
					bodyData[colName + 'Spanned'] = '1';
					bodyData[colName + 'CanMove'] = '0';
					bodyData[colName + 'Class'] = 'gridBorderText gridTextColor gridCenterText';
				}
			}
		}
		gridBodyData.push(bodyData);
	});
	
	dlgDesmMprSetupDetailProgressGrid = TreeGrid( {Layout:{Data : dlgDesmMprSetupDetailProgressGridCol}, Data:{Data : {Body: [gridBodyData]}}, Text: gridLang},"gridDlgDesmMprSetupDetailProgress" );

}

function closeDesmMprSetupPopUp() {
	if(dlgDesmMprSetupDetailProgressGrid)	dlgDesmMprSetupDetailProgressGrid.Dispose();
	if(dlgDesmMprSetupSupplierEmailGrid) 	dlgDesmMprSetupSupplierEmailGrid.Dispose();
	if(dlgDesmMprSetupDoosanEmailGrid) 		dlgDesmMprSetupDoosanEmailGrid.Dispose();
}

function iconDlgDesmMprSetupPoNoSearchClick(){	
	var search_type = "N";
	if(v_desm_mpr_setup_param.supplier_yn == "Y") {
		search_type = "R";
	}
	var param = {keyword : $('#txtDlgDesmMprSetupPoNo').val(), keyword2 : "",
				 keyword3 : $('#txtDlgDesmMprSetupSupplierNo').val(), supplier_yn : v_desm_mpr_setup_param.supplier_yn, search_type : search_type};

	$('#dlgDesmMprSetupPopUp').load("/desmPoListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmPoListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
				
					if(returnParam.MPR_SAVE_YN == "Y") {
						confirm_modal("", $('#alertMprSetupPoSelect').val(), null, function (callobj, result) {
							if(result) {
								$("#txtDlgDesmMprSetupPoNo").val(returnParam.PO_NO);
								$("#txtDlgDesmMprSetupPoName").val(returnParam.PO_DESCRIPTION);
								$("#txtDlgDesmMprSetupSupplier").val(returnParam.SUPPLIER_NAME);
								$("#txtDlgDesmMprSetupSupplierNo").val(returnParam.SUPPLIER_NUMBER);
								$("#txtDlgDesmMprSetupProjectNo").val(returnParam.PROJECT_CODE);
								$("#txtDlgDesmMprSetupProjectName").val(returnParam.PROJECT_NAME);	
								$("#txtDlgDesmMprSetupProductName").val(returnParam.PRODUCT_NAME);
							}
						});		
					}
					else {
						$("#txtDlgDesmMprSetupPoNo").val(returnParam.PO_NO);
						$("#txtDlgDesmMprSetupPoName").val(returnParam.PO_DESCRIPTION);
						$("#txtDlgDesmMprSetupSupplier").val(returnParam.SUPPLIER_NAME);
						$("#txtDlgDesmMprSetupSupplierNo").val(returnParam.SUPPLIER_NUMBER);
						$("#txtDlgDesmMprSetupProjectNo").val(returnParam.PROJECT_CODE);
						$("#txtDlgDesmMprSetupProjectName").val(returnParam.PROJECT_NAME);	
						$("#txtDlgDesmMprSetupProductName").val(returnParam.PRODUCT_NAME);	
					}				
				

				}
			});	
		}
	});	
}

function btnDlgDesmMprSetupSupplierEmailAddClick() {
	var gridAddRow = dlgDesmMprSetupSupplierEmailGrid.AddRow(null,null,1,null,null);	
	dlgDesmMprSetupSupplierEmailGrid.RefreshRow(gridAddRow);

	/*
	var param = {};
	$('#dlgDesmMprSetupPopUp').load("/desmMprSetupSupplierPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmMprSetupSupplierPopUp(param, function (key, returnList) {
				
				if(key == "select-item"){
					setDesmMprSetupSupplier(returnList);
				}
			});	
		}
	});
	*/
	
	
}

function btnDlgDesmMprSetupDoosanEmailAddClick() {
	/*
	var gridAddRow = dlgDesmMprSetupDoosanEmailGrid.AddRow(null,null,1,null,null);	
	dlgDesmMprSetupDoosanEmailGrid.RefreshRow(gridAddRow);
	*/
	
	
	var param = {};

	$('#dlgDesmMprSetupPopUp').load("/desmMprSetupUserPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmMprSetupUserPopUp(param, function (key, returnList) {
				
				if(key == "select-item"){
					setDesmMprSetupUser(returnList);
				}
			});	
		}
	});
	
}

function setDesmMprSetupUser(list) {

	for(var i = 0; i < list.length; i++) {
		var row = list[i];
		
		var addCheck = true;
		var gridList = dlgDesmMprSetupDoosanEmailGrid.Rows;
		for (var key in gridList) {
			
			var gridRow = gridList[key];
			if(gridRow.Fixed == null){
				if(gridRow.USER_AD == row.USER_AD){								
					addCheck = false;				
				}
			}		
		} 				
		
		if(addCheck){
			var gridAddRow = dlgDesmMprSetupDoosanEmailGrid.AddRow(null,null,1,null,null);
			gridAddRow.USER_AD = row.USER_AD;
			gridAddRow.MAIL = row.MAIL;
			gridAddRow.EXPEDITER_YN = "N";		
			
			dlgDesmMprSetupDoosanEmailGrid.RefreshRow(gridAddRow);
		}						
	}
}

function setDesmMprSetupSupplier(list) {

	for(var i = 0; i < list.length; i++) {
		var row = list[i];
		
		var addCheck = true;
		var gridList = dlgDesmMprSetupSupplierEmailGrid.Rows;
		for (var key in gridList) {
			
			var gridRow = gridList[key];
			if(gridRow.Fixed == null){
				if(gridRow.USER_AD == row.SUPPLIER_NO){								
					addCheck = false;				
				}
			}		
		} 				
		
		if(addCheck){
			var gridAddRow = dlgDesmMprSetupSupplierEmailGrid.AddRow(null,null,1,null,null);
			gridAddRow.USER_AD = row.SUPPLIER_NO;
			gridAddRow.USER_NAME = row.SUPPLIER_NAME;
			gridAddRow.MAIL = row.MAIL;		
			
			dlgDesmMprSetupSupplierEmailGrid.RefreshRow(gridAddRow);
		}						
	}
}

function btnDlgDesmMprSetupSupplierEmailDelClick() {
	dlgDesmMprSetupSupplierEmailGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprSetupSupplierEmailGrid.GetSelRows();
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
					dlgDesmMprSetupSupplierEmailGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"MAIL_SEQ" : row.MAIL_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmMprSetupSupplierMail.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprSetupSupplierMail();
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

function btnDlgDesmMprSetupDoosanEmailDelClick() {
	dlgDesmMprSetupDoosanEmailGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmMprSetupDoosanEmailGrid.GetSelRows();
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
					dlgDesmMprSetupDoosanEmailGrid.RemoveRow(row);
				}
				else{
					var deleteRow = objNullCheck({"MAIL_SEQ" : row.MAIL_SEQ});
					deleteList.push(deleteRow);				
				}	
			}
			
			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);	
				var paramData = {"deleteList" : list};
				
				$.ajax({			
					url: "/deleteDesmMprSetupUserMail.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							searchDlgDesmMprSetupUserMail();
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

function setGridEdit(grid) {
	var gridList = grid.Rows;
	var girdColNameList = grid.ColNames[1];
	var gridCols = grid.Cols;
	
	for (var key in gridList) {		
		var gridRow = gridList[key];
		if(gridRow.Fixed == null){
			
			for(var i = 0; i < girdColNameList.length; i++) {
				var colName = girdColNameList[i];
				var editColName = colName + "CanEdit";
				var col = gridCols[colName];
				var dateColName = colName + "OnClickCell";
				//if(col.Type == "Date") {
				if(typeof gridRow[dateColName] != "undefined") {
					gridRow[dateColName] = "";
				}
				
				gridRow[editColName] = 0;	
			}
			
			grid.RefreshRow(gridRow);												        			
		}
	}	
}

function btnDlgDesmMprSetupMailSaveClick() {
	dlgDesmMprSetupDetailProgressGrid.ActionAcceptEdit();
	dlgDesmMprSetupSupplierEmailGrid.ActionAcceptEdit();
	dlgDesmMprSetupDoosanEmailGrid.ActionAcceptEdit();
		
	if($('#txtDlgDesmMprSetupPoNo').val().length < 2 || $('#txtDlgDesmMprSetupPoName').val() == ""){
		$('#txtDlgDesmMprSetupPoNo').val("");
		$('#txtDlgDesmMprSetupPoName').val("");
		$("#txtDlgDesmMprSetupPoNo").parent().find(".autocomplete-valid").hide();
	}
	
	var chkValidation = checkRequiredField("divDlgDesmMprSetupBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}	
	
	
	var gridDoosanEmailList = dlgDesmMprSetupDoosanEmailGrid.Rows;
	var checkCnt = 0;
	for (var key in gridDoosanEmailList) {	
		var row = gridDoosanEmailList[key];
		if(row.Fixed == null){
			if(row.EXPEDITER_YN == "Y") {
				checkCnt = checkCnt + 1;
			}
		}
	}
	
	if(checkCnt > 1 || checkCnt == 0) {
		alert_modal("", $('#alertSaveMprSetupDoosanMailExpediterCheckErr').val());
		return;		
	} 
	
	var changeSupplierMailObject = dlgDesmMprSetupSupplierEmailGrid.GetChanges();
	var changeSupplierMailList = JSON.parse(changeSupplierMailObject).Changes;
	
	var changeUserMailObject = dlgDesmMprSetupDoosanEmailGrid.GetChanges();
	var changeUserMailList = JSON.parse(changeUserMailObject).Changes;
	
	var msg = $('#alertSave').val();
	
	confirm_modal("", msg, null, function (callobj, result) {
		if(result) {
			
			
		    var updateSupplierMailList = [];
			for(var i = 0; i < changeSupplierMailList.length; i++){
				var rowId = changeSupplierMailList[i].id;
				var row = dlgDesmMprSetupSupplierEmailGrid.GetRowById(rowId);
				
				var updateSupplierMailRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MAIL : row.MAIL, MEMO : row.MEMO, MAIL_SEQ : row.MAIL_SEQ});
									 
					updateSupplierMailList.push(updateSupplierMailRow);			
			}
			var supplierMail = JSON.stringify(updateSupplierMailList);
			
		    var updateUserMailList = [];
			for(var i = 0; i < changeUserMailList.length; i++){
				var rowId = changeUserMailList[i].id;
				var row = dlgDesmMprSetupDoosanEmailGrid.GetRowById(rowId);
				
				var updateUserMailRow = objNullCheck({PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MAIL : row.MAIL, MEMO : row.MEMO, MAIL_SEQ : row.MAIL_SEQ, P_USER_AD : row.USER_AD, P_USER_AD : row.USER_AD, EXPEDITER_YN : row.EXPEDITER_YN});
									 
					updateUserMailList.push(updateUserMailRow);			
			}
			var userMail = JSON.stringify(updateUserMailList);			
			
			
			$.ajax({			
				url: "/saveDesmMprSetupMailData.do",
				data: {updateSupplierMailList : supplierMail, updateUserMailList : userMail, STATUS : v_desm_mpr_setup_param.STATUS, 
				       PRODUCT_NAME : $('#txtDlgDesmMprSetupProductName').val(), PO_NO : $('#txtDlgDesmMprSetupPoNo').val(), MPR_NO : $('#txtDlgDesmMprSetupMprNo').val(),
				       MPR_SUBMISSION : $('input[name=txtDlgDesmMprSetupMprSubmission]:checked').val()},
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						
						
							searchDlgDesmMprSetupData();	
							searchDlgDesmMprSetupSupplierMail();
							searchDlgDesmMprSetupUserMail();
							
							if(v_desm_mpr_setup_callback) {
								v_desm_mpr_setup_callback("save-item", null);
							}	
					}
				}
			});				
					
		}
	});		
}

function ShowCustomCalendar(G,row,col){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
		var date = new Date(n);
		var cellDate = date.getFullYear() + "_" + chkDate(date.getMonth() + 1);
		if(col == cellDate) {
			var cntVal = 0;
			for (var i = 0; i < colList.length; i++) {
				var colName = colList[i].COL_NAME;
				var colVal = row[colName];
				if(colVal != null && colVal != '') {
					cntVal++;
					break;
				}
			}
			(cntVal > 0) ? alert_modal("", $('#alertGridSelectDataAll').val()) : G.SetValue(row,col,n,1);
		} else {
			alert_modal("", $('#alertMprPoMonthErr').val());
		}
	}


	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function formatDate(d){
	if(d == null || d == ""){return "";}
	if(d.length == 8) { return '20' + d; }
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}

function chkDate(m){
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}

	return month;
}


