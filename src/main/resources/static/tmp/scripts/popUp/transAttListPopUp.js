

var v_trans_att_list_callback = null;
var v_trans_att_list_param;
var fileUse = true;

function initTransAttListPopUp(param , callback) {
	v_trans_att_list_callback = callback;
    v_trans_att_list_param = param;
    
    initTransAttListPopUpCode();    
}

function initTransAttListPopUpCode() {	
	
	initTransAttListPopUpControls();
}


function initTransAttListPopUpControls() {	
	
	$('#dlgAttList').on('shown.bs.modal', function () {
		$('#dlgAttList').click();
	});
	
	$('#dlgAttList').on('hidden.bs.modal', function () {
	  	closeTransAttListPopUp();
	})		
	
	$('#btnDlgAttListSave').click(function () { btnDlgAttListSaveClick(); return false; });
	
	setTransAttListPopUpData();
	
	var list = v_trans_att_list_param.menuAuthList;
	if(list != null) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];
			
			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();

				if(row.AUTH_CODE == "S") {
					fileUse = false;
				}				
			}
			
			
		}	
	}
	
}

function closeTransAttListPopUp() {

}


function setTransAttListPopUpData() {
	
	$.ajax({
		url: "/getTransShippingRequestDlgAttList.do",		
		data: {"FILE_GRP_CD" : v_trans_att_list_param.DOCUMENT_GRP_ID},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			$('#txtDlgAttListFile').fileinput("destroy");
			$('#txtDlgAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgAttListFile').fileinput({
					theme: "fas",
					language: "kr",
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
				var url = "/getTransAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getTransAttachPreview.do?code=" + entry.ID;
				
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});
			
			$('#txtDlgAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteTransShippingRequestDlgAttList.do",
				theme: "fas",
				language: "kr",
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				var aborted = !window.confirm($('#alertDelete').val());
				return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				//searchDlgItemScheduleFileList();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				//alert_fail(msg);
			});			
			
			if(!fileUse) {					
				$('#dlgAttList .input-group-btn').css("display", "none");
				$('#dlgAttList .kv-file-remove').css("display", "none");
			}				
        }
    });
}

function btnDlgAttListSaveClick() {
	
	if(v_trans_att_list_param.attSaveType != null && v_trans_att_list_param.attSaveType == "invoice") {
		dlgAttListSaveInvoice();
	}
	else {
		dlgAttListSave();
	}
		
		
}

function dlgAttListSave() {
	var formData = new FormData();
	
	var file_obj = $("#dlgAttList input[type=file]");
	for (var i = 0; i < file_obj.length; i++)
	{
		for (var j = 0; j < file_obj[i].files.length; j++)
		{	
			var pattern_spc = /['",]/; 
			if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())){
				alert_modal("알람", "파일명에 특수문자를 포함할 수 없습니다. [ ' \" , ] 문자를 제거 한 후 등록하세요.");
				//alert("파일명에 특수문자를 포함할 수 없습니다. [ ' \" , ] 문자를 제거 한 후 등록하세요.")
				return false
			}
		
			
			formData.append($(file_obj[i]).attr("id") + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	
		}
	}
	
	formData.append("FILE_GRP_CD", v_trans_att_list_param.DOCUMENT_GRP_ID);
	formData.append("REQ_MASTER_ID", v_trans_att_list_param.REQ_MASTER_ID);
	formData.append("TO_DAY", toDay);
	
	$.ajax({			
		url: "/saveTransShippingRequestDlgAttList.do",
		data: formData,
		processData: false,
		contentType: false,			
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				if(result.error == "-4") {
					alert_fail("확장자가 [ .ASP .ASPX .JSP .PHP .INC .CGI .HTML .HTM .JS .JAR. JHTML .PHP3 .PHTML , ] 인파일은 업로드 할 수 없습니다.");
				}
				else {
					alert_fail(result.error);
				}
				
			} else {
				alert_success($('#alertSaveSuccess').val());
				v_trans_att_list_param.DOCUMENT_GRP_ID = result.FILE_GRP_CD;
				setTransAttListPopUpData();
				
				if(v_trans_att_list_callback)
				{
					v_trans_att_list_callback("save-item", v_trans_att_list_param);
				}					
			}
		}
	});
}

function dlgAttListSaveInvoice() {
	var formData = new FormData();
	
	var file_obj = $("#dlgAttList input[type=file]");
	for (var i = 0; i < file_obj.length; i++)
	{
		for (var j = 0; j < file_obj[i].files.length; j++)
		{	
			var pattern_spc = /['",]/;
			if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())){
				alert_modal("알람", "파일명에 특수문자를 포함할 수 없습니다. [ ' \" , ] 문자를 제거 한 후 등록하세요.");
				//alert("파일명에 특수문자를 포함할 수 없습니다. [ ' \" , ] 문자를 제거 한 후 등록하세요.")
				return false
			}
			
			
			formData.append($(file_obj[i]).attr("id") + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	
		}
	}
	
	formData.append("FILE_GRP_CD", v_trans_att_list_param.DOCUMENT_GRP_ID);
	formData.append("INVOICE_NO_ID", v_trans_att_list_param.INVOICE_NO_ID);
	formData.append("TO_DAY", toDay);
	
	$.ajax({			
		url: "/saveTransShippingInvoiceDlgAttList.do",
		data: formData,
		processData: false,
		contentType: false,			
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				if(result.error == "-4") {
					alert_fail("확장자가 [ .ASP .ASPX .JSP .PHP .INC .CGI .HTML .HTM .JS .JAR. JHTML .PHP3 .PHTML , ] 인파일은 업로드 할 수 없습니다.");
				}
				else {
					alert_fail(result.error);
				}
			} else {
				alert_success($('#alertSaveSuccess').val());
				v_trans_att_list_param.DOCUMENT_GRP_ID = result.FILE_GRP_CD;
				setTransAttListPopUpData();
				
				if(v_trans_att_list_callback)
				{
					v_trans_att_list_callback("save-item", v_trans_att_list_param);
				}	
			}
		}
	});		
}


