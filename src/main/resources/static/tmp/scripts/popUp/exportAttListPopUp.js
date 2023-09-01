

var v_export_att_list_callback = null;
var v_export_att_list_param;

function initExportAttListPopUp(param , callback) {
	v_export_att_list_callback = callback;
    v_export_att_list_param = param;
    
    initExportAttListPopUpControls();    
}

function initExportAttListPopUpControls() {	
	$('#btnDlgAttListSave').click(function () { btnDlgAttListSaveClick(); return false; });
	setExportAttListPopUpData();
}

function closeExportAttListPopUp() {
}

function setExportAttListPopUpData() {
	if(v_export_att_list_param == null || v_export_att_list_param.EXPORT_NO == null || v_export_att_list_param.EXPORT_NO == "") {
		$('#txtDlgAttListFile').attr("readonly", false);
		$('#txtDlgAttListFile').show();
		$('#btnDlgAttListSave').show();
	} else if (v_export_att_list_param. IS_EDITABLE == "Y" && (v_export_att_list_param.STATUS == "Incomplete" || v_export_att_list_param.STATUS == "Incomplete,Rejected")) {
		$('#txtDlgAttListFile').attr("readonly", false);
		$('#txtDlgAttListFile').show();
		$('#btnDlgAttListSave').show();
	} else {
		$('#txtDlgAttListFile').attr("readonly", true);
		$('#txtDlgAttListFile').hide();
		$('#btnDlgAttListSave').hide();
	}

	$.ajax({
		// url: "/getTransShippingRequestDlgAttList.do",		//첨부파일 조회  - 공통
		url: "/attach/getAttachList.do", // AttachController 분리
		data: {"FILE_GRP_CD" : v_export_att_list_param.FILE_GRP_CD},
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
				
				return;
			} 
			
			var fileUrl = new Array;
			var fileInfo = new Array;
			
			$.each(list, function (index, entry) {
				// AttachController 분리
				/*var url = "/getTransAttachDownload.do?code=" + entry.ID;	//첨부파일 다운 - 공통
				var url_pv = "/getTransAttachPreview.do?code=" + entry.ID;	//첨부파일 미리보기 - 공통*/
				var url = "/attach/getAttachDownload.do?code=" + entry.ID;	//첨부파일 다운 - 공통
				var url_pv = "/attach/getAttachPreview.do?code=" + entry.ID;	//첨부파일 미리보기 - 공통
				
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});
			
			$('#txtDlgAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				//deleteUrl: "/deleteTransShippingRequestDlgAttList.do",	//첨부파일 삭제 - 공통
				deleteUrl: "/attach/deleteAttachList.do", // AttachController 분리
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
			
        }
    });
}

function btnDlgAttListSaveClick() {
	dlgAttListSave();
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
	
	formData.append("FILE_GRP_CD", v_export_att_list_param.FILE_GRP_CD);
	formData.append("EXPORT_NO", v_export_att_list_param.EXPORT_NO);
	formData.append("TO_DAY", (new Date()).format("yyyy/MM/dd"));
	
	$.ajax({			
		url: "/saveExportClearanceDlgAttList.do",	//첨부파일 저장 - 결과 update를 위해 분리
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
				v_export_att_list_param.FILE_GRP_CD = result.FILE_GRP_CD;
				setExportAttListPopUpData();
				
				if(v_export_att_list_callback)
				{
					v_export_att_list_callback("save-item", v_export_att_list_param);
				}					
			}
		}
	});
}
