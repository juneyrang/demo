var dlgDesmContractContactGrid;

var v_desm_contact_callback = null;
var v_desm_contact_param;


function initDesmContractContactPopUp(param , callback) {
	v_desm_contact_callback = callback;
    v_desm_contact_param = param;

	$('#dlgDesmContractContact').on('shown.bs.modal', function () {
		$('#dlgDesmContractContact').click();
	});

	$('#dlgDesmContractContact').on('hidden.bs.modal', function () {
	  	closeDesmContracContacttPopUp();
	});

	$('#dlgDesmContractContact').modal('show');

	initDesmContractPopUpControls();
}

function initDesmContractPopUpControls() {

	$('#btnDlgDesmContractContactAdd').click(function () { btnDlgDesmContractContactAddClick(); return false; });
	$('#btnDlgDesmContractContactDelete').click(function () { btnDlgDesmContractContactDeleteClick(); return false; });
	$('#btnDlgDesmContractContactSave').click(function () { btnDlgDesmContractContactSaveClick(); return false; });
	
	TGSetEvent("OnCopy","dlgDesmContractContactGrid",function(grid, txt){
	  copyToClipboard(txt);
	});

	TGSetEvent("OnRenderFinish","dlgDesmContractContactGrid",function(grid){
		dlgDesmContractContactGrid.Source.Data.Data.Body = [v_desm_contact_param.contactList];
		dlgDesmContractContactGrid.ReloadBody();
	});

	var gridCode = getGridCode();
	var dlgDesmContractContactGridCol = {
		"Cfg": {
			"id"				: "dlgDesmContractContactGrid"
			, "CfgId"			: "dlgDesmContractContactGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" 	: "100"
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
	   "Cols" : [{	"Name"	: "CONTRACT_HEADER_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "CONTACT_ID", "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
	   			 {	"Name"	: "CONTACT_TITLE", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CONTACT_NAME", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CONTACT_EMAIL", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "CONTACT_MOBILE", "Width": "220", "Type": "Text" , "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "1", "Spanned":"1" },
	   			 {	"Name"	: "IS_MAIN_CONTACT", "Width": "160", "Type": "Enum", "Enum" : "|NO|YES", "EnumKeys" : "|N|Y", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"}
	   			],
		"Header" : {"Class" : "gridCenterText",
		   	"CONTACT_TITLE"	: "Title",
		   	"CONTACT_NAME" : "Name",
		   	"CONTACT_EMAIL"	: "Email",
		   	"CONTACT_MOBILE" : "Mobile",
		   	"IS_MAIN_CONTACT"	: "Main Contact"
		}
	};

	dlgDesmContractContactGrid = TreeGrid( {Layout:{Data : dlgDesmContractContactGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"dlgDesmContractContactGrid" );

}

function btnDlgDesmContractContactAddClick() {
	var gridAddRow = dlgDesmContractContactGrid.AddRow(null,null,1,null,null);
	dlgDesmContractContactGrid.RefreshRow(gridAddRow);
}

function btnDlgDesmContractContactDeleteClick() {
	dlgDesmContractContactGrid.ActionAcceptEdit();
	
	var selectList = dlgDesmContractContactGrid.GetSelRows();
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {			
			for(var i = 0; i < selectList.length; i++) {
				var row = selectList[i];
				dlgDesmContractContactGrid.RemoveRow(row);
			}
			alert_success($('#alertDeleteSuccess').val());
		}
	});	
}

function btnDlgDesmContractContactSaveClick() {
	var contactList = [];
	var gridList = dlgDesmContractContactGrid.Rows;
	var checkCnt = 0;
	for (var key in gridList) {	
		var row = gridList[key];
		if(row.Fixed == null){
			if(row.IS_MAIN_CONTACT == "Y") {
				checkCnt = checkCnt + 1;
			}
			contactList.push(row);
		}
	}
	
	if(checkCnt > 1 || checkCnt == 0) {
		alert_modal("", $('#alertSaveContractContactCheckErr').val());
		return;		
	} 

	if(v_desm_contact_callback) {
		console.log(contactList);
		v_desm_contact_callback("contact-item", contactList);
	}
	$('#dlgDesmContractContact').modal('hide');
}

function closeDesmContracContacttPopUp() {
	dlgDesmContractContactGrid.Dispose();
}
