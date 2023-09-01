var dlgDesmContractGrid;
var dlgDesmContractInfomationGrid;

var v_desm_contract_callback = null;
var v_desm_contract_param;
var contractContactList = [];

var isNewDesmContractCreationPopUp = false;
var isRevision = false;

function initDesmContractPopUp(param , callback) {
	v_desm_contract_callback = callback;
    v_desm_contract_param = param;

	$('#dlgDesmContractCreation').on('shown.bs.modal', function () {
		$('#dlgDesmContractCreation').click();
	});

	$('#dlgDesmContractCreation').on('hidden.bs.modal', function () {
	  	closeDesmContractPopUp();
	});

	$('#dlgDesmContractCreation').modal('show');

	if(v_desm_contract_param.CONTRACT_HEADER_ID == null || v_desm_contract_param.CONTRACT_HEADER_ID == "") {
		isNewDesmContractCreationPopUp = true;
		$('#txtDlgDesmContractCreationRevision').val(v_desm_contract_param.REVISION);
		$('#txtDlgDesmContractCreationRequestBy').val($('#txtDlgDesmContractCreationTransUserId').val());
		$('#txtDlgDesmContractCreationRequestByAd').val($('#txtDlgDesmContractCreationTransUserId').val());
	}
	
	$('#dlgDesmContractCreationTitle').text(
		(v_desm_contract_param.CONTRACT_HEADER_ID == null || v_desm_contract_param.CONTRACT_HEADER_ID == "") ? 
				'Contract Creation' : 
				'Contract Detail [' + v_desm_contract_param.CONTRACT_SEQ + '][' + v_desm_contract_param.STATUS + ']'
	);
	$('#iconDlgInfoInfomationPanel').parent().attr('title', '해당 영역은 보증관련 입력화면이며\nPO 계약과 별개로 저장이 가능합니다.');

	initCode();
}

function initCode() {
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			
		 	toDay = results.DAY[0].CUR_DAY;	
		 	
		 	initDesmContractPopUpControls();
        }
    });
	    
}

function initDesmContractPopUpControls() {

	initDatePicker();

//	makeAutocomplete(
//		"txtDlgDesmContractCreationProjectNo", 		//자동완성 입력 input
//		"",					//keyword2 파라메터 id
//		"txtDlgDesmContractCreationProjectName",		//clear필드 id
//		"/getIdsmSetupProject.do",  	//검색 URL
//		2,			//검색 실행을 위한 keyword 최소 길이
//		false,				//선택완료 마크 표시 여부
//		function(event, ui) {
//
//			$("#txtDlgDesmContractCreationProjectNo").val(ui.item.value.split("|")[1]);
//			$("#txtDlgDesmContractCreationProjectName").val(ui.item.value.split("|")[2]);
//			return false;
//		}
//	);

	makeAutocomplete(
		"txtDlgDesmContractCreationRequestBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmContractCreationRequestByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmContractCreationRequestBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmContractCreationRequestByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	makeAutocomplete(
		"txtDlgDesmContractCreationApproveBy", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtDlgDesmContractCreationApproveByAd",		//clear필드 id
		"/getDesmRsiUserList.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		true,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtDlgDesmContractCreationApproveBy").val(ui.item.value.split("|")[1]);
			$("#txtDlgDesmContractCreationApproveByAd").val(ui.item.value.split("|")[1]);

			return false;
		}
	);

	$('button').on('click', function() {
		switch($(this).attr('id')) {
		case 'btnDlgDesmContractCreationSave'				: btnDlgDesmContractCreationSaveClick(); 				break;
		case 'btnDlgDesmContractCreationRequest'			: btnDlgDesmContractCreationRequestClick(); 			break;
		case 'btnDlgDesmContractCreationApprove'			: btnDlgDesmContractCreationApproveClick();				break;
		case 'btnDlgDesmContractCreationReject'				: btnDlgDesmContractCreationRejectClick(); 				break;
		case 'btnDlgDesmContractCreationRevision'			: btnDlgDesmContractCreationRevisionClick(); 			break;

		case 'btnDlgDesmContractInfomationAdd'				: btnDlgDesmContractInfomationAddClick(); 				break;
		case 'btnDlgDesmContractInfomationDel'				: btnDlgDesmContractInfomationDelClick(); 				break;
		case 'btnDlgDesmContractInfomationSave'				: btnDlgDesmContractInfomationSaveClick(); 				break;

		case 'btnDlgDesmContractCreationAdd'				: btnDlgDesmContractCreationAddClick(); 				break;
		case 'btnDlgDesmContractCreationDel'				: btnDlgDesmContractCreationDelClick(); 				break;
		case 'btnDlgDesmContractCreationExcelUpload'		: btnDlgDesmContractCreationExcelUploadClick(); 		break;
		case 'btnDlgDesmContractCreationPhotoAttListDelete'	: btnDlgDesmContractCreationPhotoAttListDeleteClick(); 	break;
		}
	});
	
	$('#iconProjectSearch').click(function () { iconProjectSearchClick(); return false; });
	$('#txtDlgDesmContractCreationPhotoAttListFile').change(function () { txtDlgDesmContractCreationPhotoAttListFileChange(); return false; });
	$('#divDlgDesmContractCreationPhotoAttListBox').on('drop', function(e) { divDlgDesmContractCreationPhotoAttListBoxDrop(e); return false; });
	
	$('.contact-point').on('click', function(e) { dlgDesmContractCreationContactPopup(); return false; });
	$('.comma').on('keyup', function () {
		let value = $(this).val();
		value = Number(value.replaceAll(',', ''));
		$(this).val(isNaN(value) ? '' : value.toLocaleString('ko-KR'));
	});
	
	var actCollaplse = function(e) {
		$(this).toggleClass('rotate');
		var content = this.parentElement.nextElementSibling;
		content.style.display = (content.style.display === 'block') ? 'none' : 'block';
	}
	document.querySelectorAll('.click').forEach(arrow => {
		arrow.addEventListener('click', actCollaplse);
	});
	
	TGSetEvent("OnCopy","dlgDesmContractGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

	TGSetEvent("OnRenderFinish","dlgDesmContractGrid",function(grid){
		setDlgDesmContractCreationBtn();
		setInputChange(v_desm_contract_param.STATUS);
		setTransAttListPopUpData(v_desm_contract_param.ATTACH_GRP_CD);
	});

	var gridCode = getGridCode();
	var dlgDesmContractGridCol = {
		"Cfg": {
			"id"				: "dlgDesmContractGrid"
			, "CfgId"			: "dlgDesmContractGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" 	: "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "150"
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
	   			 {	"Name"	: "UOM", "Width": "80", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "QUANTITY", "Width": "80", "Type": "Float" , "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "CalcAmount( Grid, Row,Col )" },
	   			 {	"Name"	: "NET", "Width": "80", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "GROSS", "Width": "80", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CURRENCY", "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Size": "3" },
	   			 {	"Name"	: "UNIT_PRICE", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "CalcAmount( Grid, Row,Col )" },
	   			 {	"Name"	: "AMOUNT", "Width": "120", "Type": "Float", "Format" : "###,###,###,###" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "PROMISED_DATE", "Width": "130", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "PAYMENT_METHOD", "Width": "160", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
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

	var dlgDesmContractInfomationGridCol = {
		"Cfg": {
			"id"				: "dlgDesmContractInfomationGrid"
			, "CfgId"			: "dlgDesmContractInfomationGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" 	: "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "150"
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
	   "Cols" : [{	"Name"	: "CONTRACT_HEADER_ID"	, "Width": "0"	, "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CONTRACT_PAYMENT_ID"	, "Width": "0"	, "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "TYPE"				, "Width": "150", "Type": "Enum" , "Enum" : "|Advanced|Performance|Warranty|Etc", "EnumKeys" : "|Advanced|Performance|Warranty|Etc", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CURRENCY"			, "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "Size": "3" },
	   			 {	"Name"	: "AMOUNT"				, "Width": "150", "Type": "Float" , "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
		   		 {	"Name"	: "IS_BOND_RECEIVED"	, "Width" :"120", "Type": "Enum" , "Enum" : "|Y|N", "EnumKeys" : "|Y|N", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1", "OnChange": "chgBondReceived(Grid,Row,Col);"},
	   			 {	"Name"	: "BOND_NO"				, "Width": "180", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "BOND_CURRENCY"		, "Width": "130", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Size": "3" },
	   			 {	"Name"	: "BOND_AMOUNT"			, "Width": "150", "Type": "Float" , "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "ISSUE_DATE"			, "Width": "130", "Type": "Date" , "Format" : "yyyy/MM/dd", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "EXPIRE_DATE"			, "Width": "130", "Type": "Date" , "Format" : "yyyy/MM/dd", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"0", "Button": "", "OnClickCell": "ShowCustomCalendar( Grid, Row,Col )" },
	   			 {	"Name"	: "FIRM"				, "Width": "139", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "REMARKS"				, "Width": "400", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }/*,
	   			 {	"Name"	: "CREATED_BY"			, "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "CREATION_DATE"		, "Width": "120", "Type": "Date", "Format" : "yyyy/MM/dd" , "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Button": "" },
	   			 {	"Name"	: "LAST_UPDATE_BY"		, "Width": "120", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "LAST_UPDATE_DATE"	, "Width": "130", "Type": "Date", "Format": "yyyy/MM/dd" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Button": "" }*/
	   			],
		"Header" : {
			"Class" 			: "gridCenterText",
		   	"TYPE"				: "Type",
		   	"CURRENCY" 			: "Currency",
	   		"AMOUNT"			: "Amount",
		   	"IS_BOND_RECEIVED"	: "Bond Received",
		   	"BOND_NO" 			: "Bond No.",
		   	"BOND_CURRENCY"		: "Bond Currency",
		   	"BOND_AMOUNT" 		: "Bond Amount",
		   	"ISSUE_DATE"		: "Issue Date",
		   	"EXPIRE_DATE"		: "Expire Date",
		   	"FIRM"				: "Firm",
		   	"REMARKS"			: "Remarks"/*,
		   	"CREATED_BY"		: "Created By",
		   	"CREATION_DATE"		: "Creation Date",
	   		"LAST_UPDATE_BY"	: "Update By",
	   		"LAST_UPDATE_DATE" 	: "Update Date"*/
		}
	};

	dlgDesmContractGrid = TreeGrid( {Layout:{Data : dlgDesmContractGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmContractGrid" );
	dlgDesmContractInfomationGrid = TreeGrid( {Layout:{Data : dlgDesmContractInfomationGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmContractInfomationGrid" );

	if(isNewDesmContractCreationPopUp) {
		initDefailProject(function (list) {

			if(list.length > 0) {
				$('#txtDlgDesmContractCreationProjectNo').val(list[0]["CONTRACT_HEADER_ID"]);
				$('#txtDlgDesmContractCreationProjectName').val(list[0]["CONTRACT_NAME"]);
			}
		});
	}
}

function setDlgDesmContractCreationBtn() {
	if(v_desm_contract_param.STATUS == 'Incomplete' || v_desm_contract_param.STATUS == 'Rejected') {
		$('#btnDlgDesmContractCreationRevision').hide();
//		$('#btnDlgDesmContractCreationRequest').hide();
		$('#btnDlgDesmContractCreationApprove').hide();
		$('#btnDlgDesmContractCreationReject').hide();
	} else {
		$('#btnDlgDesmContractCreationAdd').hide();
		$('#btnDlgDesmContractCreationDel').hide();
		$('#btnDlgDesmContractCreationExcelUpload').hide();
		$('#btnDlgDesmContractCreationSave').hide();
		$('#btnDlgDesmContractCreationRequest').hide();
		if(v_desm_contract_param.STATUS == 'Pre-Approved') {
			$('#btnDlgDesmContractCreationRevision').hide();
		} else if(v_desm_contract_param.STATUS == 'Approved') {
			$('#btnDlgDesmContractCreationApprove').hide();
			$('#btnDlgDesmContractCreationReject').hide();
		}
	}
	
	if(!isNewDesmContractCreationPopUp) {
		searchData();
	}

	var list = v_desm_contract_param.menuAuthList;
	for(var i = 0; i < list.length; i++){
		var row = list[i];
		if(row.USE_YN == "N"){
			var eId = "button[authType=" + row.AUTH_CODE + "]";
			$(eId).remove();
		}
	}
}

function closeDesmContractPopUp() {
	dlgDesmContractGrid.Dispose();
	dlgDesmContractInfomationGrid.Dispose();
	contractContactList.length = 0;
}

function initDatePicker() {
	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}
	
	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}

function checkRequiredField(areaID) {
	var chkValidation = true;

	$("#" + areaID + " input:visible, #" + areaID + " select:visible, #" + areaID + " textarea:visible").each(function () {
		if ($(this).hasClass("required") && $(this).attr("type") == "file") {
			if (getAttachedFilesCount(($(this).attr("id"))) == 0) {
				$(".file-input").addClass("validation-error");
				chkValidation = false;
			} else {
				$(".file-input").removeClass("validation-error");
				$(this).removeClass("validation-error");
			}
		}
		else if ($(this).hasClass("required") && ($(this).val() == null || $(this).val().IsNullOrEmpty())) {
			$(this).addClass("validation-error");
			chkValidation = false;
		} else {
			$(this).removeClass("validation-error");
		}
	});

	return chkValidation;
}

function CalcAmount(G,row,col){
	var qty = row.QUANTITY;
	var unitPrice = row.UNIT_PRICE;
	if(qty == '' || unitPrice == '') {
		return;
	}
	row.AMOUNT = qty * unitPrice;
	dlgDesmContractGrid.RefreshRow(row);
}

function ShowCustomCalendar(G,row,col){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n){
	   G.SetValue(row,col,n,1);
	}

	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

function iconProjectSearchClick(){
	var param = {keyword : $('#txtDlgDesmContractCreationProjectNo').val(), TYPE : "A"};

	$('#dlgDesmContractCreationPopUp').load("/desmProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initIdsmProjectListPopUp(param, function (key, returnParam) {
				
				if(key == "select-item"){
					$("#txtDlgDesmContractCreationProjectNo").val(returnParam.SEGMENT1);
					$("#txtDlgDesmContractCreationProjectName").val(returnParam.NAME);	
				}
			});	
		}
	});	
}

function searchData() {
	$.ajax({
		url: "/getDesmContractInfo.do",
		data: {"CONTRACT_HEADER_ID" : v_desm_contract_param.CONTRACT_HEADER_ID},
		success: function (data, textStatus, jqXHR) {
			dlgDesmContractGrid.Source.Data.Data.Body = [data.results.lineList];
			dlgDesmContractGrid.ReloadBody();
			dlgDesmContractInfomationGrid.Source.Data.Data.Body = [data.results.paymentList];
			dlgDesmContractInfomationGrid.ReloadBody();
			contractContactList = data.results.contactList;
			$.each(contractContactList, function(index, item) {
				if(item.IS_MAIN_CONTACT == "Y") {
					$('#txtDlgDesmContractCreationContactName').val(item.CONTACT_NAME);
					$('#txtDlgDesmContractCreationContactTitle').val(item.CONTACT_TITLE);
					$('#txtDlgDesmContractCreationContactE-mail').val(item.CONTACT_EMAIL);
					$('#txtDlgDesmContractCreationContactMobile').val(item.CONTACT_MOBILE);
				}
			});

			var infoData = data.results.headerInfo;
			v_desm_contract_param.ATTACH_GRP_CD = infoData.ATTACH_GRP_CD;
			$('#txtDlgDesmContractCreationProjectNo').val(infoData.PROJECT_NO);
			$('#txtDlgDesmContractCreationProjectName').val(infoData.PROJECT_NAME);
            $('#txtDlgDesmContractCreationContractSeq').val(infoData.CONTRACT_SEQ);
            $('#txtDlgDesmContractCreationRevision').val(infoData.REVISION);
            $('#txtDlgDesmContractCreationCategory').val(infoData.CATEGORY);
            $('#txtDlgDesmContractCreationContractNo').val(infoData.CONTRACT_NO);
            $('#txtDlgDesmContractCreationContractName').val(infoData.CONTRACT_NAME);
            $('#txtDlgDesmContractCreationContractor').val(infoData.CONTRACTOR);
            $('#txtDlgDesmContractTermFromDate').val(infoData.TERM_FROM);
            $('#txtDlgDesmContractTermToDate').val(infoData.TERM_TO);
            $('#txtDlgDesmContractCreationDate').val(infoData.CONTRACT_DATE);
            $('#txtDlgDesmContractCurrency').val(infoData.CONTRACT_CURRENCY);
            $('#txtDlgDesmContractAmount').val(infoData.CONTRACT_AMOUNT);
            $('#txtDlgDesmContractCreationDescription').val(infoData.DESCRIPTION);
            $('#txtDlgDesmContractCreationClosed').val(infoData.CLOSED);
            $('#txtDlgDesmContractCreationRemark').val(infoData.REMARKS);
            $('#txtDlgDesmContractCreationRequestBy').val(infoData.REQUESTED_BY);
            $('#txtDlgDesmContractCreationRequestByAd').val(infoData.REQUESTED_BY);
			$('#txtDlgDesmContractCreationRequestedDate').val(infoData.REQUEST_DATE);
            $('#txtDlgDesmContractCreationApproveBy').val(infoData.APPROVED_BY);
            $('#txtDlgDesmContractCreationApproveByAd').val(infoData.APPROVED_BY);
			$('#txtDlgDesmContractCreationApprovedDate').val(infoData.APPROVE_DATE);
		}
	});
}

function gridInfomationList() {
	var infoList = [];
	var changeObject = dlgDesmContractInfomationGrid.GetChanges();
	var changeList = JSON.parse(changeObject).Changes;
    var gridList = dlgDesmContractInfomationGrid.Rows;

	for(var i = 0; i < changeList.length; i++) {
		var rowId = changeList[i].id;
		var row = dlgDesmContractInfomationGrid.GetRowById(rowId);
		
		var updateRow = objNullCheck({	
			"CONTRACT_HEADER_ID" 	: v_desm_contract_param.CONTRACT_HEADER_ID, 
			"CONTRACT_PAYMENT_ID" 	: row.CONTRACT_PAYMENT_ID, 
			"TYPE" 					: row.TYPE, 
			"CURRENCY" 				: row.CURRENCY, 
			"AMOUNT" 				: row.AMOUNT ? row.AMOUNT : 0,
			"IS_BOND_RECEIVED" 		: row.IS_BOND_RECEIVED,
			"BOND_NO" 				: row.BOND_NO,
			"BOND_CURRENCY" 		: row.BOND_CURRENCY,
			"BOND_AMOUNT" 			: row.BOND_AMOUNT ? row.BOND_AMOUNT : 0,
			"ISSUE_DATE" 			: formatDate(row.ISSUE_DATE),
			"EXPIRE_DATE" 			: formatDate(row.EXPIRE_DATE), 
			"FIRM" 					: row.FIRM,
			"REMARKS" 				: row.REMARKS
        });

		infoList.push(updateRow);
	}
	return infoList;
}

function btnDlgDesmContractInfomationAddClick() {
	var gridAddRow = dlgDesmContractInfomationGrid.AddRow(null,null,1,null,null);
	gridAddRow.TYPE = 'Advanced';
	gridAddRow.IS_BOND_RECEIVED = 'N';
	dlgDesmContractInfomationGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmContractInfomationDelClick() {
	dlgDesmContractInfomationGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmContractInfomationGrid.GetSelRows();
	if(selectList.length == 0) {
		return;
	}
	
	for(var i = 0; i < selectList.length; i++) {
		var row = selectList[i];
		dlgDesmContractInfomationGrid.RemoveRow(row);
	}
}

function btnDlgDesmContractInfomationSaveClick() {
	if(isNewDesmContractCreationPopUp) {
		return;
	}

	var gridLength = dlgDesmContractInfomationGrid.RowCount;

	if(gridLength < 1) {
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	var infoList = gridInfomationList();
	console.log(infoList);
	if(infoList.length > 0) {
		$.ajax({			
			url: "/saveDesmContractInfomation.do",
			data: {"updateList" : JSON.stringify(infoList)},
			success: function (result, textStatus, jqXHR) {
				if (result.error != null) {
					alert_fail(result.error);
				} else {
					alert_success($('#alertSuccess').val());
				}
			}
		});	
	}
}

function chgBondReceived(grid, row, col) {
	var canEdit = row.IS_BOND_RECEIVED == 'Y' ? 1 : 0;
	row.BOND_NOCanEdit = canEdit;
	row.BOND_CURRENCYCanEdit = canEdit;
	row.BOND_AMOUNTCanEdit = canEdit;
	row.ISSUE_DATECanEdit = canEdit;
	row.EXPIRE_DATECanEdit = canEdit;
	row.FIRMCanEdit = canEdit;
	row.REMARKSCanEdit = canEdit;

	if(isNewDesmContractCreationPopUp) {
		if(row.IS_BOND_RECEIVED == 'N') {
			row.BOND_NO = '';
			row.BOND_CURRENCY = '';
			row.BOND_AMOUNT = '';
			row.ISSUE_DATE = '';
			row.EXPIRE_DATE = '';
			row.FIRM = '';
			row.REMARKS = '';
		}
	}
	dlgDesmContractInfomationGrid.RefreshRow(row);
}

function setInputChange(transType) {
	var setEdit = function() {
//		$("#txtDlgDesmContractCreationProjectNo").attr("readonly", false);
		$("#txtDlgDesmContractCreationCategory").attr("readonly", false);
		$("#txtDlgDesmContractTermFromDate").attr("readonly", false);
		$("#txtDlgDesmContractTermToDate").attr("readonly", false);
		$("#txtDlgDesmContractCurrency").attr("readonly", false);
		$("#txtDlgDesmContractAmount").attr("readonly", false);
		$("#txtDlgDesmContractCreationPhotoAttListInfo").attr("disabled", false);
		$("#txtDlgDesmContractCreationRequestBy").attr("readonly", false);
		$("#txtDlgDesmContractCreationApproveBy").attr("readonly", false);
		$('.contact-point').off('click').on('click', function(e) { dlgDesmContractCreationContactPopup(); return false; });
		$('#btnDlgDesmContractCreationAdd').show();
		$('#btnDlgDesmContractCreationDel').show();
		$('#btnDlgDesmContractCreationExcelUpload').show();
	}
	if(transType == 'Pre-Approved' || transType == 'Approved'/* || transType == 'Rejected'*/) {
		$('input[type=text]').prop('readonly', true);
//		$("#divDlgDesmContractCreationPhotoAttArea").hide();
		$('.contact-point').off('click');
		$('#divDlgDesmContractCreationPhotoAttListBox').off('drop');
	} else if(transType == 'Rejected') {
		if(v_desm_contract_param.REVISION > 0) {
			$('input[type=text]').prop('readonly', true);
			setEdit();
		}
	} else if(transType == 'Revision') {
		if(isRevision) {
			setEdit();
		}
	}
}

function btnDlgDesmContractCreationAddClick() {
	var gridAddRow = dlgDesmContractGrid.AddRow(null,null,1,null,null);
	gridAddRow.ATT = '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
	dlgDesmContractGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmContractCreationDelClick() {
	dlgDesmContractGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmContractGrid.GetSelRows();
	if(selectList.length == 0) {
		return;
	}
	
	for(var i = 0; i < selectList.length; i++) {
		var row = selectList[i];
		dlgDesmContractGrid.RemoveRow(row);
	}
}

function btnDlgDesmContractCreationExcelUploadClick() {
	var param = {};
	$('#dlgDesmContractCreationPopUp').load("/desmContractExcelUploadPopUp.do", null, function(data, status, xhr) {
		if(status == "success") {
			initContractExcelUploadPopUp(param, function(key, returnParam) {
				console.log(returnParam.length);
				if(key == "excel-item") {
					var list = [];
					$.each(returnParam, function(i, row) {
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
								"PROMISED_DATE"			: formatDate(row.PROMISED_DATE),
								"PAYMENT_METHOD"		: row.PAYMENT_METHOD,
								"FOB"					: row.FOB,
								"REMARKS"				: row.REMARKS
							};
						list.push(gridRow);			
					});
					
					dlgDesmContractGrid.Source.Data.Data.Body = [list];
					dlgDesmContractGrid.ReloadBody();
				}
			});
			$('#dlgDesmContractExcelUploadPopUp').modal('show');
		}
	});
}

function btnDlgDesmContractCreationSaveClick() {
	dlgDesmContractCreationSave('Incomplete');
}

function btnDlgDesmContractCreationRequestClick() {
	dlgDesmContractCreationSave('Request');
}

function btnDlgDesmContractCreationApproveClick() {
	dlgDesmContractCreationSave('Pre-Approved');
}

function btnDlgDesmContractCreationRevisionClick() {
	isRevision = true;
	$("#iconProjectSearch").show();
	$("#txtDlgDesmContractCreationRevision").val(Number($("#txtDlgDesmContractCreationRevision").val()) + 1);
	$('#btnDlgDesmContractCreationSave').show();
	$('#btnDlgDesmContractCreationRequest').show();
	$('#btnDlgDesmContractCreationRevision').hide();
	$('.contact-point').on('click');
	$("#divDlgDesmContractCreationPhotoAttArea").show();
	setInputChange('Revision');
}

function btnDlgDesmContractCreationRejectClick() {
	dlgDesmContractGrid.ActionAcceptEdit();
	dlgDesmContractInfomationGrid.ActionAcceptEdit();

	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			// FIXME: Remark 추가해서 Reject할 때 저장될 수 있어야 함.
			var paramData = objNullCheck({
				"CONTRACT_HEADER_ID" : v_desm_contract_param.CONTRACT_HEADER_ID
				, "REMARKS" : $('#txtDlgDesmContractCreationRemark').val()
			});
			$.ajax({
				url: "/saveDesmContractReject.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						sendMail($('#alertRejectSuccess').val());
					}
				}
			});
		}
	});
}

function chkValidContractLine() {
	var isValid = true;
	var gridList = dlgDesmContractGrid.Rows;
	for (var key in gridList) {		
		var gridRow = gridList[key];
		if(gridRow.Fixed == null) {
			if(gridRow.TYPE == '' || gridRow.ITEM1 == '' || gridRow.UOM == ''
				 || gridRow.QUANTITY == '' || gridRow.CURRENCY == '' || gridRow.UNIT_PRICE == '') {
				return false;
			}
		}
	}
	return true;
}

function dlgDesmContractCreationSave(transType) {
	dlgDesmContractGrid.ActionAcceptEdit();
	dlgDesmContractInfomationGrid.ActionAcceptEdit();

	var chkValidation = checkRequiredField("divDlgDesmContractCreationBody");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	var chkValidLine = chkValidContractLine();
	if (!chkValidLine) {
		alert_modal("", $('#alertContractLineValidate').val());
		return;
	}

    var getStatus = function(isMsg) {
    	var rtnVal = '';
    	switch(transType) {
		case 'Request'		: rtnVal = isMsg ? $('#alertRequest').val() 	: 'Pre-Approved';	break;
		case 'Pre-Approved'	: rtnVal = isMsg ? $('#alertApprove').val() 	: 'Approved'; 		break;
		case 'Revision'		: rtnVal = isMsg ? $('#alertRevision').val() 	: 'Revision'; 		break;
		case 'Reject​ed'		: rtnVal = isMsg ? $('#alertReject').val() 		: 'Reject​ed'; 		break;
		default				: rtnVal = isMsg ? $('#alertSave').val() 		: 'Incomplete'; 	break;
    	}
    	return rtnVal;
    }

	confirm_modal("", getStatus(true), null, function (callobj, result) {
		if(result) {
			var infoList = gridInfomationList();

			var formData = new FormData();
			var file_obj = $("#txtDlgDesmContractCreationAttListFile");
			for (var i = 0; i < file_obj.length; i++) {
				for (var j = 0; j < file_obj[i].files.length; j++) {	
					var pattern_spc = /['",]/;
					if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())) {
						alert($('#alertFileCheck').val());
						return false
					}
					
					formData.append("ATT" + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	
				}
			}	
			
			var getUpdateRow = function(row) {
				var updateRow = objNullCheck(
						{	
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
							"PROMISED_DATE"			: formatDate(row.PROMISED_DATE),
							"PAYMENT_METHOD"		: row.PAYMENT_METHOD,
							"FOB"					: row.FOB,
							"REMARKS"				: row.REMARKS
						}
					);
				return updateRow;
			}

			var updateList = [];
			if(isRevision) {
				var gridList = dlgDesmContractGrid.Rows;
				for (var key in gridList) {		
					var gridRow = gridList[key];
					if(gridRow.Fixed == null) {
						updateList.push(getUpdateRow(gridRow));
					}
				}
			} else {
				var changeObject = dlgDesmContractGrid.GetChanges();
				var changeList = JSON.parse(changeObject).Changes;
				for(var i = 0; i < changeList.length; i++) {
					var rowId = changeList[i].id;
					var row = dlgDesmContractGrid.GetRowById(rowId);
					updateList.push(getUpdateRow(row));
				}
			}

			formData.append("TO_DAY", toDay);
			formData.append("CONTRACT_HEADER_ID", v_desm_contract_param.CONTRACT_HEADER_ID);
			formData.append("TRANS_TYPE"		, transType);
			formData.append("IS_REVISION"		, isRevision);
			formData.append("STATUS"			, getStatus(false));
			formData.append("PROJECT_NO"		, $('#txtDlgDesmContractCreationProjectNo').val());
			formData.append("CONTRACT_SEQ" 		, $('#txtDlgDesmContractCreationContractSeq').val());
			formData.append("REVISION" 			, $('#txtDlgDesmContractCreationRevision').val());
			formData.append("CATEGORY" 			, $('#txtDlgDesmContractCreationCategory').val());
			formData.append("CONTRACT_NO" 		, $('#txtDlgDesmContractCreationContractNo').val());
			formData.append("CONTRACT_NAME"		, $('#txtDlgDesmContractCreationContractName').val());
			formData.append("CONTRACTOR" 		, $('#txtDlgDesmContractCreationContractor').val());
			formData.append("TERM_FROM" 		, $('#txtDlgDesmContractTermFromDate').val());
			formData.append("TERM_TO" 			, $('#txtDlgDesmContractTermToDate').val());
			formData.append("CONTRACT_DATE" 	, $('#txtDlgDesmContractCreationDate').val());
			formData.append("CONTRACT_CURRENCY"	, $('#txtDlgDesmContractCurrency').val());
			formData.append("CONTRACT_AMOUNT"	, $('#txtDlgDesmContractAmount').val().replace(/,/g, ''));
			formData.append("DESCRIPTION" 		, $('#txtDlgDesmContractCreationDescription').val());
			formData.append("REMARKS"			, $('#txtDlgDesmContractCreationRemark').val());
			formData.append("REQUESTED_BY"		, $('#txtDlgDesmContractCreationRequestByAd').val());
			formData.append("APPROVED_BY"		, (transType == 'Pre-Approved') ? $('#txtDlgDesmContractCreationTransUserId').val() : $('#txtDlgDesmContractCreationApproveByAd').val());

			formData.append("ATTACH_GRP_CD"		, isNewDesmContractCreationPopUp ? '' : v_desm_contract_param.ATTACH_GRP_CD);

			formData.append("contactList"		, JSON.stringify(contractContactList));
			formData.append("infoList"			, JSON.stringify(infoList));
			formData.append("updateList"		, JSON.stringify(updateList));
			
//			for(let key of formData.keys()) {
//				console.log(key, ':', formData.get(key));
//			}
//			return;

			$.ajax({			
				url: "/saveDesmContractCreate.do",
				data: formData,
				processData: false,
				contentType: false,			
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						switch(result.error) {
						case '-1' 	: alert_fail($('#alertSaveAlreadyData').val()); break;
						case '-2' 	: alert_fail($('#alertFileCheckEx').val()); break;
						case '-3' 	: alert_fail($('#alertPhotoFileCheckEx').val()); break;
						case '-4' 	: alert_fail($('#alertMailFail').val()); break;
						default		: alert_fail(result.error);
						}
					} else {
						v_desm_contract_param.CONTRACT_HEADER_ID = result.CONTRACT_HEADER_ID;
						v_desm_contract_param.STATUS = result.STATUS;

//						if(transType == "Incomplete") {
//							alert_success($('#alertSuccess').val());
//							if(v_desm_contract_callback) {
//								v_desm_contract_callback("save-item", null);
//							}
//							$('#dlgDesmContractCreation').modal('hide');
//						}
//						else {
//							sendMail($('#alertSuccess').val(), transType);
//						}

						alert_success($('#alertSuccess').val());
						if(v_desm_contract_callback) {
							v_desm_contract_callback("save-item", null);
						}
						$('#dlgDesmContractCreation').modal('hide');
					}
				}
			});	
		}
	});
}

function sendMail(msg, transType) {
	var paramData = {
		"CONTRACT_HEADER_ID" : v_desm_contract_param.CONTRACT_HEADER_ID
		,"STATUS" : v_desm_contract_param.STATUS
		,"TRANS_TYPE": transType
	};
	
	$.ajax({
		url: "/sendMailDesmOnshoreContract.do",
		data: paramData,
		success: function(result, textStatus, jqXHR) {
			if(result.error != null) {
				alert_fail(result.error);
			}
			else {
				if(result.error_code != null && result.error_code == "-2") {
					alert_fail($('#alertMailFail').val());
				}
				else {
					alert_success(msg);
				}
				if(v_desm_contract_callback) {
					v_desm_contract_callback("save-item", null);
				}
			}
		},
		complete: function() {
			$('#dlgDesmContractCreation').modal('hide');
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
		var jsDate = new Date(date);
        var month = jsDate.getMonth() + 1;
        var day = jsDate.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

		return jsDate.getFullYear() + '/' + month + '/' + day;
	}
}

function btnDlgDesmContractCreationResetClick() {

	$('#txtDlgDesmContractCreationPackageNo').val("");
	$('#txtDlgDesmContractCreationRsiNo').val("");
	$('#txtDlgDesmContractCreationMaterialCode').val("");
	$('#txtDlgDesmContractCreationStartRequestDate').val("");
	$('#txtDlgDesmContractCreationEndRequestDate').val("");
	$('#selDlgDesmContractCreationAttribute10').val("");


	$('#txtDlgDesmContractCreationDescription').val("");
	$('#txtDlgDesmContractCreationDrawingNo').val("");
	$('#txtDlgDesmContractCreationTagNo').val("");
	$('#txtDlgDesmContractCreationRsiName').val("");

	$('#selDlgDesmContractCreationType').val("");
	$('#txtDlgDesmContractCreationCategory').val("");

}

function dlgDesmContractCreationContactPopup() {
	var param = {"contactList" : contractContactList};

	$('#dlgDesmContractCreationPopUp').load("/desmContractCreationContactPopUp.do",param,function(data, status, xhr) {
		if(status == "success"){

			initDesmContractContactPopUp(param, function (key, returnParam) {

				if(key == "contact-item") {
					contractContactList.length = 0;
					$.each(returnParam, function(index, item) {
						var contact = {
							"CONTRACT_HEADER_ID" : v_desm_contract_param.CONTRACT_HEADER_ID,
							"CONTACT_ID" : item.CONTACT_ID,
							"CONTACT_TITLE" : item.CONTACT_TITLE,
							"CONTACT_NAME" : item.CONTACT_NAME,
							"CONTACT_EMAIL" : item.CONTACT_EMAIL,
							"CONTACT_MOBILE" : item.CONTACT_MOBILE,
							"IS_MAIN_CONTACT" : item.IS_MAIN_CONTACT
						};
						contractContactList.push(contact);
						if(item.IS_MAIN_CONTACT == "Y") {
							$('#txtDlgDesmContractCreationContactName').val(item.CONTACT_NAME);
							$('#txtDlgDesmContractCreationContactTitle').val(item.CONTACT_TITLE);
							$('#txtDlgDesmContractCreationContactE-mail').val(item.CONTACT_EMAIL);
							$('#txtDlgDesmContractCreationContactMobile').val(item.CONTACT_MOBILE);
						}
					});
				}
			});

		}
	});
}


var fileUse = true;
var imgFileIdx = 0;
var fileList = [];	

function imgBtnShow(id) {
	var eId = "#" + id;
	$(eId).show();
}

function imgBtnHide(id) {
	var eId = "#" + id;
	$(eId).hide();
	
}

function deletePhoto(idx) {
	var selectRow;
	var rowIdx;
	for(var i = 0; i < fileList.length; i++) {
		resultRow = fileList[i];
		if(resultRow.IDX == idx) {
			selectRow = resultRow;
			rowIdx = i;
		}	
	}	
	
	if(selectRow.SAVE_YN == "N") {
		fileList.splice(rowIdx, 1);
		alert_success($('#alertDeleteSuccess').val());
		setDlgDesmContractCreationPhotoAtt();			
		
		return;
	}	
	
}

function dlgDesmContractCreationPhotoPreview(idx) {
//	var param = {"fileList" : fileList, "idx" : idx};
//	
//	$('#dlgDesmContractCreationPopUp').load("/desmContractCreationPhotoPreviewPopUp.do",null,function(data, status, xhr) {
//		if(status == "success"){
//			
//			initDesmContractCreationPhotoPreviewPopUp(param, function (key, returnParam) {
//
//			});	
//			
//		}
//	});	
}

function txtDlgDesmContractCreationPhotoAttListFileChange() {
	var files = document.getElementById('txtDlgDesmContractCreationPhotoAttListFile').files;
	
	if(files.length == 0){
		return;
	}
	
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];
		var elId = "#imgFileTxt_" + fileRow.IDX;
		fileRow.REM = $(elId).val();		
	}	
	
	getImg(files, 0);
	
}

function getImg (files, fileIdx){
	
	if(files.length == fileIdx) {
		$('#txtDlgDesmContractCreationPhotoAttListFile').val("");
		setDlgDesmContractCreationPhotoAtt();
	}
	else{
		workFileReader(files, fileIdx);
	}
}

function workFileReader (files, fileIdx){
	var file = files[fileIdx];	
	var reader = new FileReader();
	imgFileIdx = imgFileIdx + 1;
    reader.onload = e => {
         var fileRow = {"IDX" : imgFileIdx, "FILE_NAME" : file.name, "SRC" : e.target.result, "SAVE_YN" : "N", "FILE" : file};
         fileList.push(fileRow);
         
         getImg (files, fileIdx + 1);
    }
    reader.readAsDataURL(file);
}

function getfileSaveCnt(){
	var cnt = 0;
	for(var i = 0; i < fileList.length; i++) {
		var resultRow = fileList[i];
		if(resultRow.SAVE_YN == "Y") {
			cnt = cnt + 1;
		}	
	}
	return cnt;
}

function setDlgDesmContractCreationPhotoAtt(){
	var imgColMaxCnt = 3;
	var cnt = fileList.length;
	var btnDelFlag = true;
	var fileMsg = $('#fileSelectText').val();
	var fileSaveCnt = getfileSaveCnt();
	var readonly = "";
	
	if(fileSaveCnt == cnt) {
		btnDelFlag = false;
		fileMsg = $('#fileAttachedText').val();
	}

	if($('#txtDlgDesmContractCreationStatus').val() == "Pre-Confirmed" || $('#txtDlgDesmContractCreationStatus').val() == "Confirmed") {
		readonly = "readonly";
	}

	if(!fileUse) {
		$('#divDlgDesmContractCreationPhotoAttListBtn .input-group-btn').css("display", "none");
	}	
		
	if(cnt == 0){
		var html = '<div class="col-sm-12 file-drop-zone-title">' + $('#fileSelectDragText').val() + '</div>';
		$('#divDlgDesmContractCreationPhotoAttListBox').html(html);
		$('#btnDlgDesmContractCreationPhotoAttListDelete').hide();
		$('#divDlgDesmContractCreationPhotoAttListIcon').removeClass("icon-visible");
		$('#txtDlgDesmContractCreationPhotoAttListInfo').val("");
		return;
	}
	else {
		if(btnDelFlag) {
			$('#btnDlgDesmContractCreationPhotoAttListDelete').show();	
		}
		else {
			$('#btnDlgDesmContractCreationPhotoAttListDelete').hide();
		}
		$('#divDlgDesmContractCreationPhotoAttListIcon').addClass("icon-visible");
		$('#txtDlgDesmContractCreationPhotoAttListInfo').val(cnt + " " + fileMsg);
	}
	

	
	var imgRowCnt = parseInt(cnt / imgColMaxCnt);
	var imgRowAddCnt = cnt % imgColMaxCnt;
	
	if(imgRowAddCnt > 0){
		imgRowCnt = imgRowCnt + 1;
	}
	
	var imgColCnt = 1;
	var html = '';
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];	
		var rem = fileRow.REM == null ? "" : fileRow.REM;
		
		
		if(imgColCnt > imgColMaxCnt) {
			imgColCnt = 1;
		}
		
		if(imgColCnt == 1) {
			html += '<div class="file-preview-thumbnails clearfix hide-content" >';
		}
		
		html += '	<div class="file-preview-frame krajee-default  kv-preview-thumb" style="width:20.8%; height:160px" onmouseover="imgBtnShow(\'' + "footerBtn" + fileRow.IDX + '\')" onmouseout="imgBtnHide(\'' + "footerBtn" + fileRow.IDX + '\')">';
		html += '		<div style="width:100%; height:200px">';
		html += '			<img src="' + fileRow.SRC + '" class="file-preview-image kv-preview-data file-zoom-detail" style="width:auto;height:auto;max-width:100%;max-height:100%;" >';
		html += '		</div>';
		html += '	  	<div style="width:100%;padding-top: 4px;">';
		html += '	  		<div ><textarea id="imgFileTxt_' + fileRow.IDX  + '" type="text" class="form-control form-control-user " style="font-size:11px;line-height:1.5;resize:none" rows="3" autocomplete=off ' + readonly + ' >' + rem + '</textarea></div>';
		
		html += '	  		<div id="footerBtn' + fileRow.IDX  + '" class="file-footer-buttons" style="width:100%;margin-top:-150px; margin-right: 4px; position: relative;display:none">';
		if(fileRow.SAVE_YN == "Y") {
			
			html += '	  			<a class="kv-file-download btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" download="' + fileRow.FILE_NAME + '" href="/getTransAttachDownload.do?code=' + fileRow.ID +'" target="_blank">';
			html += '	  				<i class="fas fa-download"></i>';
			html += '	  			</a>';				
	
		}	
		
		if(fileUse) {
			html += '	  			<button type="button" class="kv-file-remove btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" style="margin-left:3px" onclick="deletePhoto(\'' + fileRow.IDX + '\')">';
			html += '	  				<i class="fas fa-trash-alt"></i>';
			html += '	  			</button>';			
		}			
		
		html += '	  			<button type="button" class="kv-file-zoom btn-file-cus btn-sm btn-kv btn-default btn-outline-secondary" style="margin-left:3px" onclick="dlgDesmContractCreationPhotoPreview(\'' + fileRow.IDX + '\')">';
		html += '	  				<i class="fas fa-search-plus"></i>';
		html += '	  			</button>';
		html += '	  		</div>'; 																		
		html += '	  	</div>';
		html += '	</div>';								
		
		if(imgColCnt == imgColMaxCnt || fileList.length == i + 1) {
			html += '</div>';
		}
		
		imgColCnt += 1;	
		
	}
	
	
	$('#divDlgDesmContractCreationPhotoAttListBox').html(html);

		
}

function divDlgDesmContractCreationPhotoAttListBoxDrop(e) {
	var files = e.originalEvent.dataTransfer.files;
	
	if(files.length == 0){
		return;
	}
	
	
	for(var i = 0; i < fileList.length; i++) {	
		var fileRow = fileList[i];
		var elId = "#imgFileTxt_" + fileRow.IDX;
		fileRow.REM = $(elId).val();		
	}		
	
	getImg(files, 0);
}

function btnDlgDesmContractCreationPhotoAttListDeleteClick() {
	for(var i = fileList.length - 1; i >= 0; i--) {
		var fileRow = fileList[i];
		if(fileRow.SAVE_YN == "N") {
			fileList.splice(i, 1);
		}
	}
	
	setDlgDesmContractCreationPhotoAtt();
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


function setTransAttListPopUpData(ATTACH_GRP_CD) {

	$.ajax({
		//url: "/getTransShippingRequestDlgAttList.do", // AttachController 분리
		url: "/attach/getAttachList.do",
		data: {"FILE_GRP_CD" : ATTACH_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			$('#txtDlgDesmContractCreationAttListFile').fileinput("destroy");
			$('#txtDlgDesmContractCreationAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgDesmContractCreationAttListFile').fileinput({
					theme: "fas",
					language: fileLang,
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});

				if(!fileUse) {
					$('#dlgAttList .input-group-btn').css("display", "none");
					$('#dlgAttList .kv-file-remove').css("display", "none");
				}

				return;
			}

			var fileUrl = new Array;
			var fileInfo = new Array;

			$.each(list, function (index, entry) {
				// AttachController 분리
				/*var url = location.protocol+"//"+location.host+"/getTransAttachDownload.do?code=" + entry.ID;
				var url_pv = location.protocol+"//"+location.host+"/getTransAttachPreview.do?code=" + entry.ID;*/
				var url = location.protocol+"//"+location.host+"/attach/getAttachDownload.do?code=" + entry.ID;
				var url_pv = location.protocol+"//"+location.host+"/attach/getAttachPreview.do?code=" + entry.ID;

				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});


			$('#txtDlgDesmContractCreationAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				//deleteUrl: "/deleteTransShippingRequestDlgAttList.do", // AttachController 분리
				deleteUrl: "/attach/deleteAttachList.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				//var aborted = !window.confirm($('#alertDelete').val());
				//return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				setTransAttListPopUpData(ATTACH_GRP_CD);
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});

        }
    });
}
