

var v_trans_att_list_callback = null;
var v_trans_att_list_param;
var fileUse = true;


function initTransAttListPopUp(param , callback) {
	v_trans_att_list_callback = callback;
    v_trans_att_list_param = param;

    if(param.width){
    	$(".modal-dialog-centered").css("min-width",param.width);
    }

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
	});

	$('#dlgAttList').modal('show');

	$('#btnDlgAttListSave').click(function () { btnDlgAttListSaveClick(); return false; });

	setTransAttListPopUpData();

}

function closeTransAttListPopUp() {

}


function setTransAttListPopUpData() {

	fileUse = v_trans_att_list_param.fileUse;
	if(fileUse != null && !fileUse) {
		var eId = $('#btnDlgAttListSave');
		$(eId).remove();
	}

	$.ajax({
		//url: "/getTransShippingRequestDlgAttList.do", // AttachController 분리
		url: "/attach/getAttachList.do",
		data: {"FILE_GRP_CD" : v_trans_att_list_param.ATTACH_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			$('#txtDlgAttListFile').fileinput("destroy");
			$('#txtDlgAttListFile').val("");
			if(list.length == 0){
				$('#txtDlgAttListFile').fileinput({
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


			$('#txtDlgAttListFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				//deleteUrl: "/deleteTransShippingRequestDlgAttList.do", // AttachController 분리
				deleteUrl: "/attach/deleteAttachList.do",
				theme: "fas",
				language: fileLang,
				showUpload: false,
				hideThumbnailContent: ( v_trans_att_list_param.hideThumbnailContent != null ? v_trans_att_list_param.hideThumbnailContent : true ),
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				//var aborted = !window.confirm($('#alertDelete').val());
				//return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success($('#alertDeleteSuccess').val());
				setTransAttListPopUpData();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});

			if(!fileUse) {
				$('#dlgAttList .input-group-btn').css("display", "none");
				$('#dlgAttList .kv-file-remove').css("display", "none");
			}

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
				alert_modal("", $('#alertFileNameErr').val());
				return false
			}


			formData.append($(file_obj[i]).attr("id") + "_" + i.toString() + j.toString(), file_obj[i].files[j]);
		}
	}

	formData.append("FILE_GRP_CD", v_trans_att_list_param.ATTACH_GRP_CD);

	if(v_trans_att_list_param.RSI_HEADER_ID != null && v_trans_att_list_param.RSI_HEADER_ID != ""){
		formData.append("RSI_HEADER_ID", v_trans_att_list_param.RSI_HEADER_ID);
	}

	if(v_trans_att_list_param.MRF_HEADER_ID != null && v_trans_att_list_param.MRF_HEADER_ID != ""){
		formData.append("MRF_HEADER_ID", v_trans_att_list_param.MRF_HEADER_ID);
	}

	if(v_trans_att_list_param.CONTRACT_HEADER_ID != null && v_trans_att_list_param.CONTRACT_HEADER_ID != ""){
		formData.append("CONTRACT_HEADER_ID", v_trans_att_list_param.CONTRACT_HEADER_ID);
	}

	if(v_trans_att_list_param.USER_AD != null && v_trans_att_list_param.USER_AD != "" && v_trans_att_list_param.MPR_SUPPLIER_YN != null && v_trans_att_list_param.MPR_SUPPLIER_YN == "Y"){
		formData.append("P_USER_AD", v_trans_att_list_param.USER_AD);
		formData.append("MPR_SUPPLIER_YN", v_trans_att_list_param.MPR_SUPPLIER_YN);
	}

	if(v_trans_att_list_param.MATERIAL_MANAGEMENT_YN == "Y"){
		formData.append("PROJECT_NO", v_trans_att_list_param.PROJECT_NO);
		formData.append("MATERIAL_CODE", v_trans_att_list_param.MATERIAL_CODE);
		formData.append("MATERIAL_MANAGEMENT_YN", "Y");
	}

	formData.append("TO_DAY", toDay);

	$.ajax({
		// url: "/saveTransShippingRequestDlgAttList.do", // AttachController 분리
		url: "/attach/saveAttachList.do",
		data: formData,
		processData: false,
		contentType: false,
		success: function (result, textStatus, jqXHR) {
			if (result.error != null) {
				if(result.error == "-4") {
					alert_fail($('#alertFileExtensionErr').val());
				}
				else {
					alert_fail(result.error);
				}

			} else {
				alert_success($('#alertSaveSuccess').val());
				v_trans_att_list_param.ATTACH_GRP_CD = result.FILE_GRP_CD;

				if(v_trans_att_list_callback)
				{
					v_trans_att_list_callback("save-item", v_trans_att_list_param);
				}

				$('#dlgAttList').modal('hide');
			}
		}
	});
}




