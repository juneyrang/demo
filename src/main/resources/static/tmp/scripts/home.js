﻿//테이블에서 선택된 항목 저장
var selections = [];


window.onload = function () {

	if($('#firstYn').val() == "Y"){
		 /*
		 if($('#PWS_EDIT_YN').val() == "N") {
		 	$('#dialogAlertPwdClose').hide();
		 	$('#dialogAlertPwd').modal('show');	
		 }
		 else {
			 var log = $('#logh').attr('title'); 
			 $('#dialogAlertLogMsg').html(log);
			 $('#dialogAlertLog').modal('show');		 
		 }
		 */
		 var log = $('#logh').attr('title'); 
		 $('#dialogAlertLogMsg').html(log);
		 $('#dialogAlertLog').modal('show');		 
	}
}

$(document).ready(function () {

	//Notice List 바인딩
	BindNoticeList();

	
	initFileInput("txtEvidenceFile");	
	
	
	
	
});




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



//#region Notice 
function EditNotice(boardIdx) {
	$('#dialogBoardEdit').modal('show');	
}

var noticeDataSet;
function BindNoticeList() {
	var templateNotice = $("#templateNotice").html();
	
	$("#divNoticeList").html(""
		+ "<div class='row w-100'>"
		+ "	<div class='col-sm-6 text-ellipsis'><b>Subject</b></div>"
		+ "	<div class='col-sm-2 text-center'><b>Attachement</b></div>"
		+ "	<div class='col-sm-2 text-center'><b>Last updated</b></div>"
		+ "	<div class='col-sm-2 text-center'><b>Updated by</b></div>"
		+ "</div>");

	$.ajax({
		async: false,
		type: "POST",
		url: "/getNotice.do",		
		data: { "jobCode": "" },
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;

			$.each(dataSet, function (index, entry) {
			    
			    var img = "";
			    if(entry.ATT_CNT > 0) {
			    	img = '<img class="img-fluid" style="height: 0.8rem !important;margin-top:6px;filter:opacity(0.5)" src="/resources/ext/fontawesome-free/svgs/solid/paperclip.svg" alt="">';
			    }
			    
				var ddlItem = templateNotice.format(entry.NOTICE_ID, entry.TITLE, img, entry.LAST_UPDATE_DATE, entry.LAST_UPDATED_BY);
				$("#divNoticeList").html($("#divNoticeList").html() + ddlItem);
				
				//if (index > 9) return;
			});
        },
        error: function (er) {
            params.error(er);
		},
		complete: function (e) {
			$('.wrap-loading').addClass('dp_n'); //로딩중 화면 제거
		}
    });
}

//row의 Edit 버튼 클릭
function ViewNotice(jobCode) {
	var FILE_GRP_CD = "";
	$.ajax({
		async: false,
		type: "POST",
		url: "/getNotice.do",		
		data: { "jobCode": jobCode },
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			$("#dlgNoticeEditTitle").html(dataSet[0].TITLE);
			FILE_GRP_CD = dataSet[0].FILE_GRP_CD;
        },
        error: function (er) {
            params.error(er);
		},
		complete: function (e) {
			$('.wrap-loading').addClass('dp_n'); //로딩중 화면 제거
		}
    });
	
	$.ajax({
		async: false,
		type: "POST",
		url: "/getNoticeContents.do",
		dataType: "json",
		data: { "jobCode": jobCode },
		success: function (data) {
			resultObj = data.results;
			$("#txtContents").val(resultObj[0]["CONTENTS"]);
			$('#dlgNoticeEdit').modal('show');	
		},
		error: function (e) {
			alert_fail(e.responseText);
		},						
		complete: function (e) {
			//로딩중 화면 제거
			$('.wrap-loading').addClass('dp_n');
		}
	});
	
	searchNoticeFileList(FILE_GRP_CD)
}

function searchNoticeFileList(FILE_GRP_CD){
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleFile.do",		
		data: {"FILE_GRP_CD" : FILE_GRP_CD},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			
			$('#txtNoticeFile').fileinput("destroy");
			$('#txtNoticeFile').val("");
			if(list.length == 0){
							
				$('#txtNoticeFile').fileinput({
					theme: "fas",
					language: "kr",
					showUpload: false,
					hideThumbnailContent: true,
			        overwriteInitial: false,
					validateInitialCount: true,
				});
				
				$('#dlgNoticeEdit .input-group-btn').css("display", "none");
				$('#dlgNoticeEdit .kv-file-remove').css("display", "none");				
				
				return;
			} 
			
			var fileUrl = new Array;
			var fileInfo = new Array;
			
			$.each(list, function (index, entry) {
				var url = "/getIdsmAttachDownload.do?code=" + entry.ID;
				var url_pv = "/getIdsmAttachPreview.do?code=" + entry.ID;
				
				var file_type = previewFileExtType(entry.EXT);
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.NAME, downloadUrl: url, size: entry.FILE_SIZE, key: entry.ID, extra: { jobCode: entry.GROUPID, fileCode: entry.ID, fileName: entry.NAME } });
			});
			
			
			
			$('#txtNoticeFile').fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteIdsmSetupDlgItemScheduleFile.do",
				theme: "fas",
				language: "kr",
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				var aborted = !window.confirm("삭제하시겠습니까?");
				return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert_success("삭제되었습니다.");
				searchNoticeFileList();
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				alert_fail(msg);
			});			
			
			$('#dlgNoticeEdit .input-group-btn').css("display", "none");
			$('#dlgNoticeEdit .kv-file-remove').css("display", "none");			
        }
    });
}

//파일필드 초기화
function initFileInput(obj_id) {
	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme: "fas",
		language: "kr",
		showUpload: false,
		hideThumbnailContent: true,
        overwriteInitial: false,
		validateInitialCount: true,
	});
}

//저장된 파일 내역 fileinput에 바인딩, 저장파일 삭제
function setAttachedFiles(objID, jobCode) {
	$.ajax({
		async: false,
		type: "POST",		
		url: "/selectInvoiceAttach.do",
		data: { "category":encodeURIComponent(invoiceTypeCode) , "jobCode": encodeURIComponent(jobCode) },
		dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;

			if (dataSet.length > 0) {
				$("#" + objID).fileinput("destroy");
				$("#" + objID).val("");
			}

			var fileUrl = new Array;
			var fileInfo = new Array;

			$.each(dataSet, function (index, entry) {
				var url = "/InvAttachDownload/?code=" + entry.FILE_CODE;
				var url_pv = "/InvAttachPreview/?code=" + entry.FILE_CODE;
				var file_type = previewFileExtType(entry.FILE_EXT);
				
				fileUrl.push(url_pv);
				fileInfo.push({ type: file_type, caption: entry.FILE_NAME_ORG, downloadUrl: url, size: entry.FILE_SIZE, key: entry.FILE_CODE, extra: { jobCode: entry.JOB_CODE, fileCode: entry.FILE_CODE, fileName: entry.FILE_NAME_ORG } });
			});

			$('#' + objID).fileinput({
				initialPreviewAsData: true,
				initialPreviewFileType: 'image',
				initialPreview: fileUrl,
				initialPreviewConfig: fileInfo,
				deleteUrl: "/deleteInvoiceAttach",
				theme: "fas",
				language: "kr",
				showUpload: false,
				hideThumbnailContent: true,
				overwriteInitial: false,
				validateInitialCount: true,
				initialCaption: fileUrl.length + " 개의 파일이 첨부됨"
			}).off("filepredelete").on('filepredelete', function (event, key, jqXHR, data) {
				var aborted = !window.confirm("등록된 [" + data.fileName + "] 파일을 삭제 하시겠습니까?");
				return aborted;
			}).off("filedeleted").on('filedeleted', function(event, key, jqXHR, data) {
				alert('삭제 되었습니다!');
				if (getAttachedFilesCount(objID) == 0) initFileInput(objID);
			}).off("filedeleteerror").on('filedeleteerror', function(event, data, msg) {
				console.log('파일삭제 오류');
				alert(msg);
			});

			//$("#" + objID).fileinput("clear");
		},
		error: function (er) {
			alert(er.toString());
		}
	});

	return false;
}

//Chart 바인딩
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
	// *     example: number_format(1234.56, 2, ',', ' ');
	// *     return: '1 234,56'
	if (number == 'null') number = '0';
	number = (number + '').replace(',', '').replace(' ', '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
//#endregion
