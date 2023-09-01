var v_trans_strategicmgt_att_list_callback = null;
var v_trans_strategicmgt_att_list_param;

var dlgTransStrategicMgtAttCopyGrid;

function initdlgTransStrategicMgtAttCopyListPopUp(param , callback) {
	
	v_trans_strategicmgt_att_list_callback = callback;
    v_trans_strategicmgt_att_list_param = param;  
    
    $('#dlgTransStrategicMgtAttCopyList').modal('show');
    
    initdlgTransStrategicMgtAttCopyListPopUpCode();    
}

function initdlgTransStrategicMgtAttCopyListPopUpCode() {
    
    initdlgTransStrategicMgtAttCopyListPopUpControls();
}


function initdlgTransStrategicMgtAttCopyListPopUpControls() {

	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	$('#dlgTransStrategicMgtAttCopyList').on('shown.bs.modal', function () {
		$('#dlgTransStrategicMgtAttCopyList').click();
	});	
	
	$('#dlgTransStrategicMgtAttCopyList').on('hidden.bs.modal', function () {
	
	  	closeTransStrategicMgtAttCopyListPopUp();
	})	
	
	TGSetEvent("OnRenderFinish","transStrategicMgtAttCopyGrid",function(grid){
		
		setDlgTransStrategicMgtAttCopyListPopUpData();
	});
	
   $("#txtDlgTransStrategicMgtAttCopyListProjectCode").keydown(function(key) {
        if (key.keyCode == 13) {
            setDlgTransStrategicMgtAttCopyListPopUpData();
        }
    });		
    
   $("#txtDlgTransStrategicMgtAttCopyListShippingReqNo").keydown(function(key) {
        if (key.keyCode == 13) {
            setDlgTransStrategicMgtAttCopyListPopUpData();
        }
    });	
    
    $('#btnDlgTransStrategicMgtAttCopySave').click(function () { btnDlgTransStrategicMgtAttCopySaveClick(); return false; });    	
	
	var gridCode = getGridCode();	
	var dlgTransStrategicMgtAttCopyGridCol = {
		"Cfg" : {
			"id"				: "transStrategicMgtAttCopyGrid"
			, "CfgId"			: "transStrategicMgtAttCopyGridCfg"
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
			,{"Name": "STATUS_NM"				, "Width": "150", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0" , "Align": "center"}
			,{"Name": "ORGN_FILE_NM"				, "Width": "350", "Type": "Text"	, "Class": "gridBorderText"	, "CanMove" : "0", "CanEdit": "0"  }
		]
		, "Header" : {
			"PROJECT_ID": "PJT"
			,"DESCRIPTION": "PJT Desc"
			,"SHIPPING_REQ_NO": "출하요청번호"
			,"STATUS_NM": "승인상태"
			,"ORGN_FILE_NM": "파일명"
			, "Class": "gridCenterText"
		}
	};	

	dlgTransStrategicMgtAttCopyGrid = TreeGrid( {Layout:{Data : dlgTransStrategicMgtAttCopyGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridDlgTransStrategicMgtAttCopy" );
}

function closeTransStrategicMgtAttCopyListPopUp() {
	
	dlgTransStrategicMgtAttCopyGrid.Dispose();
}

function setDlgTransStrategicMgtAttCopyListPopUpData() {

	// 양이 많아 바로 서치하면 오래걸림, 주석처리 함.
	//searchDlgTransStrategicMgtAttCopyList();
}

function searchDlgTransStrategicMgtAttCopyList(){

	// TODO: 검색어 최소 하나는 입력할 수 있도록 Alert 필요.
	
	$.ajax({
		url: "/getDlgTransStrategicMgtAttCopyList.do",		
		data: {"PROJECT_ID" : $('#txtDlgTransStrategicMgtAttCopyListProjectCode').val(),
			   "SHIPPING_REQ_NO" : $('#txtDlgTransStrategicMgtAttCopyListShippingReqNo').val()},
		success: function (data, textStatus, jqXHR) {

			dlgTransStrategicMgtAttCopyGrid.Source.Data.Data.Body = [data.results];
			dlgTransStrategicMgtAttCopyGrid.ReloadBody();
        }
    });
}


function btnDlgTransStrategicMgtAttCopySaveClick() {
	var selectList = dlgTransStrategicMgtAttCopyGrid.GetSelRows();
	
	if(selectList.length == 0){
		alert_modal("", $('#alertGridSelectDataNull').val());
		return;
	}
	
	var insertList = [];
	confirm_modal("알람", "저장 하시겠습니까?", null, function (callobj, result) {
		if(result) {
			for(var i = 0; i < selectList.length; i++) {
				var row = selectList[i];
				var insertRow = {"P_ATT_ID": row.ATT_ID};
				insertList.push(insertRow);
			}
			
			var list = JSON.stringify(insertList);
			var paramData = {"insertList": list, "ATTACH_GRP_CD" : v_trans_strategicmgt_att_list_param.ATTACH_GRP_CD, "STRATEGIC_MASTER_ID" : v_trans_strategicmgt_att_list_param.STRATEGIC_MASTER_ID};		
			
			$.ajax({
				url: "/saveDlgTransStrategicMgtAttCopyList.do",
				data: paramData,
				success: function(result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success("저장 되었습니다.");
						
						if(v_trans_strategicmgt_att_list_callback)
						{
							v_trans_strategicmgt_att_list_callback("save-item", {"ATTACH_GRP_CD" : result.ATTACH_GRP_CD});
						}						
						
						$("#dlgTransStrategicMgtAttCopyList").modal('hide');					
						
					}
				}
			});							
		}
	});
	
	
}



