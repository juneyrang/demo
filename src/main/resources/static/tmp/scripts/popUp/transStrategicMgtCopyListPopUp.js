var v_trans_strategicmgt_list_callback = null;
var v_trans_strategicmgt_list_param;

var dlgTransStrategicMgtCopyGrid;

function initdlgTransStrategicMgtCopyListPopUp(param , callback) {
	
	v_trans_strategicmgt_list_callback = callback;
    v_trans_strategicmgt_list_param = param;  
    
    $('#dlgTransStrategicMgtCopyList').modal('show');
    
    initdlgTransStrategicMgtCopyListPopUpCode();    
}

function initdlgTransStrategicMgtCopyListPopUpCode() {
    
    initdlgTransStrategicMgtCopyListPopUpControls();
}


function initdlgTransStrategicMgtCopyListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgTransStrategicMgtCopyList').on('shown.bs.modal', function () {
		$('#dlgTransStrategicMgtCopyList').click();
	});	
	
	$('#dlgTransStrategicMgtCopyList').on('hidden.bs.modal', function () {
	
	  	closeTransStrategicMgtCopyListPopUp();
	})	
	
	TGSetEvent("OnRenderFinish","transStrategicMgtCopyGrid",function(grid){
		
		setDlgTransStrategicMgtCopyListPopUpData();
	});
	
   $("#txtDlgTransStrategicMgtCopyListProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            setDlgTransStrategicMgtCopyListPopUpData();
        }
    });		
    
   $("#txtDlgTransStrategicMgtCopyListShippingReqNo").keydown(function(key) {
        if (key.keyCode == 13) {
            setDlgTransStrategicMgtCopyListPopUpData();
        }
    });	

   $("#txtDlgTransStrategicMgtCopyListInvoiceNo").keydown(function(key) {
        if (key.keyCode == 13) {
            setDlgTransStrategicMgtCopyListPopUpData();
        }
    });	
    
    $('#btnDlgTransStrategicMgtCopySave').click(function () { btnDlgTransStrategicMgtCopySaveClick(); return false; });    	
	
	var gridCode = getGridCode();	
	var dlgTransStrategicMgtCopyGridCol = {
		"Cfg" : {
			"id"				: "transStrategicMgtCopyGrid"
			, "CfgId"			: "transStrategicMgtCopyGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "2"
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
			, "SelectingSingle"	: "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Panel" : {
			"Visible" : "1"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{"Name": "PROJECT_ID"				, "Width": "120", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"}
			,{"Name": "DESCRIPTION"				, "Width": "250", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , }
			,{"Name": "SHIPPING_REQ_NO"				, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"}
			,{"Name": "INVOICE_NO"				, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"}
			,{"Name": "STATUS_NM"				, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"}
			,{"Name": "STRATEGIC_ITEM_YN"				, "Width": "120", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"} 
			,{"Name": "CATCH_ALL_YN"					, "Width": "100", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"} 
			,{"Name": "JUDGMENT_TYPE"					, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , } 
			,{"Name": "CERTIFICATE_ORGANIZATION"		, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , } 
			,{"Name": "CERTIFICATE_NUMBER"				, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , } 
			,{"Name": "EXPORT_PERMISSION_ORGANIZATION"	, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , } 
			,{"Name": "EXPORT_PERMISSION_NUMBER"		, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , }
		]
		, "Header" : {
			"PROJECT_ID": "PJT"
			,"DESCRIPTION": "PJT Desc"
			,"SHIPPING_REQ_NO": "출하요청번호"
			,"INVOICE_NO": "Invoice No."
			,"STATUS_NM": "승인상태"
			,"STRATEGIC_ITEM_YN": "전략물자 포함"
			,"CATCH_ALL_YN": "Catch All"
			,"JUDGMENT_TYPE": "판정종류"
			,"CERTIFICATE_ORGANIZATION": "판정기관"
			,"CERTIFICATE_NUMBER": "판정서 번호"
			,"EXPORT_PERMISSION_ORGANIZATION": "수출허가기관"
			,"EXPORT_PERMISSION_NUMBER": "수출허가증 번호"
			, "Class": "gridCenterText"
		}
	};	

	dlgTransStrategicMgtCopyGrid = TreeGrid( {Layout:{Data : dlgTransStrategicMgtCopyGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgTransStrategicMgtCopy" );
}

function closeTransStrategicMgtCopyListPopUp() {
	
	dlgTransStrategicMgtCopyGrid.Dispose();
}

function setDlgTransStrategicMgtCopyListPopUpData() {

	searchDlgTransStrategicMgtCopyList(); 
}

function searchDlgTransStrategicMgtCopyList(){

	$.ajax({
		url: "/getDlgTransStrategicMgtCopyList.do",		
		data: {"PROJECT_ID" : $('#txtDlgTransStrategicMgtCopyListProjectCode').val(),
			   "SHIPPING_REQ_NO" : $('#txtDlgTransStrategicMgtCopyListShippingReqNo').val(),
			   "INVOICE_NO" : $('#txtDlgTransStrategicMgtCopyListInvoiceNo').val()},
		success: function (data, textStatus, jqXHR) {

			dlgTransStrategicMgtCopyGrid.Source.Data.Data.Body = [data.results];
			dlgTransStrategicMgtCopyGrid.ReloadBody();
        }
    });
}


function btnDlgTransStrategicMgtCopySaveClick() {
	var selectList = dlgTransStrategicMgtCopyGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var insertList = [];
	confirm_modal("알람", "저장 하시겠습니까?", null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++) {
				var row = selectList[i];
				var insertRow = {"STRATEGIC_DETAIL_ID": row.STRATEGIC_DETAIL_ID};
				insertList.push(insertRow);
			}
			
			var list = JSON.stringify(insertList);
			var paramData = {"insertList": list, "STRATEGIC_MASTER_ID" : v_trans_strategicmgt_list_param.STRATEGIC_MASTER_ID};		
			
			$.ajax({
				url: "/saveDlgTransStrategicMgtCopyList.do",
				data: paramData,
				success: function(result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success("저장 되었습니다.");
						
						if(v_trans_strategicmgt_list_callback)
						{
							v_trans_strategicmgt_list_callback("save-item", {});
						}						
						
						$("#dlgTransStrategicMgtCopyList").modal('hide');					
						
					}
				}
			});							
		}
	});
	
	
}



