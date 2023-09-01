﻿//#region 전역변수

var fileCatCode = "NOTICE";
var toDay;

//테이블에서 선택된 항목 저장
var selections = [];

//에디터
var editorEdit;	//수정 화면
var editorView; //조회화면

//#endregion

//#region 문서 로딩 & 초기화, Select, datepicker, autocomplete
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () { 
		InitForNewNotice();
		$('#dlgNoticeEdit').modal('show');	
	});

	//리스트의 Row 클릭시 (head, 관리 cell 제외)
	$("#tblNoticeList").on('click-cell.bs.table', function(obj, field, data, row) {
		setNoticeModeEdit(row);
		$('#dlgNoticeEdit').modal('show');	
	});

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnNoticeModalSave').click(function () { 
		btnNoticeModalSave_click(); 
		return false; 
	});
	//등록/수정 팝업 - 삭제 버튼 클릭
	$('#btnNoticeModalDelete').click(function () { 
		btnNoticeModalDelete_click(); 
		return false; 
	});
	//등록/수정 팝업 호출 시 이벤트
	$("#dlgNoticeEdit").on('show.bs.modal', function(e) { });
	//등록/수정 팝업 닫히기 전  이벤트
	$('#dlgNoticeEdit').on('hide.bs.modal', function (e) { });	
});

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩

function initControls() {
	/* 공통 - 필수항목 입력란 클릭시 내용 전체 선택 */
	$("input.required").click(function() {
		//$(this).select();
	});	
	
	var codeList = [];
	var paramList = JSON.stringify(codeList);
	$.ajax({
		url: "/getCodeCombo.do",	
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
		 	toDay = results.DAY[0].CUR_DAY;
        }
    });		
}
//#endregion

//#region 코드성 데이터 처리, dropdown 바인딩
//#endregion

//#region 이벤트 - List페이지
//#endregion

//#region LIST 페이지
//Main List table bootstrap-table 데이터 바인딩
function initTable() {
	$('#tblNoticeList').bootstrapTable('destroy').bootstrapTable({
		locale: "ko-KR",
		toolbar: "#toolbar",
		search: "true",
		showRefresh: "true",
		showFullscreen: "true",
		clickToSelect: "true",
		minimumCountColumns: "2",
		pagination: "true",
		idField: "NOTICE_ID",
		pageList: "[10, 25, 50, 100, all]",
		//showFooter: "true",
		//method: "post",
		ajax: "ajaxSelectNoticeList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});

	//체크박스 클릭시
	$('#tblNoticeList').on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table',
		function () {
			selections = getIdSelections();
	});

	//테이블 모든 이벤트 debug 출력
	$('#tblNoticeList').on('all.bs.table', function (e, name, args) {
		console.log(name, args);
	});

	//cell 클릭
	$('#tblNoticeList').on('click-cell.bs.table', function (e, field, value, row) {
		if (field != 9) {		//명령버튼 클릭제외
			//alert(row.NOTICE_ID);
		}
	});
}

//ajax - 테이블 목록 조회
function ajaxSelectNoticeList(params) {
	$('.wrap-loading').removeClass('dp_n');	//로딩 이미지 표시

	$.ajax({
		async: false,
		type: "POST",
		url: "/getNotice.do",		
		data: { 
			"jobCode": $("#hidJobCode").val()
		},
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			var tableData = {
				"total": dataSet.length,
				"rows": dataSet
			};
			params.success(tableData, textStatus, jqXHR);
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover({ html:true })
        },
        error: function (er) {
            params.error(er);
		},
		complete: function (e) {
			$('.wrap-loading').addClass('dp_n'); //로딩중 화면 제거
		}
    });
}

//선택된 체크박스 ID 반환
function getIdSelections() {
	return $.map($('#tblNoticeList').bootstrapTable('getSelections'), function (row) {
		return row.MYACCT_TRIP_ID;
	});
}

//Table Data 조회 후
function completeDataBind(res) {
	$.each(res.rows, function (i, row) {
	});
	return res;
}
//#endregion

//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnNoticeModalSave_click() {
	/*if (isLoginStatus() != "true") {
		alert("세션이 종료 되었습니다\n다시 접속 후 작업을 진행하여 주십시오.");
		return false;
	}*/
	
	var chkValidation = checkRequiredField("dlgNoticeEdit");

	if (!chkValidation) {
		alert("필수값 중 입력하지 않은 항목이 있습니다.");
		return false;
	} else if (!checkNoticeHiddenValidation()) {
		return false;
	} else {
		if (confirm("저장 하시겠습니까?")) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
			
			var formData = new FormData();
			
			var file_obj = $("#dlgNoticeEdit input[type=file]");
			for (var i = 0; i < file_obj.length; i++)
			{
				for (var j = 0; j < file_obj[i].files.length; j++)
				{	
					var pattern_spc = /['",]/;
					if(pattern_spc.test(file_obj[i].files[j].name.toUpperCase())){
						alert("파일명에 특수문자를 포함할 수 없습니다. [ ' , ] 문자를 제거 한 후 등록하세요.");
						return false
					}
						
					
					formData.append($(file_obj[i]).attr("id") + "_" + i.toString() + j.toString(), file_obj[i].files[j]);	
				}
			}		
			
			formData.append("FILE_GRP_CD", $('#txtNoticeFileGrpCd').val());
			formData.append("TO_DAY", toDay);
			formData.append("jobCode", $("#hidJobCode").val());
			formData.append("title", $("#txtTitle").val());
			formData.append("contents", $("#txtContents").val());	
			formData.append("isRealTime", $('#chkRealTime').is(":checked") ? 'Y' : '');			
			
			$.ajax({
				async: false,
				type: "POST",			
				url: "/saveNotice.do",
				data: formData,
				dataType: "json",
				processData: false,
				contentType: false,					
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-4") {
							alert_fail("확장자가 [ .ASP .ASPX .JSP .PHP .INC .CGI .HTML .HTM .JS .JAR. JHTML .PHP3 .PHTML ] 인파일은 업로드 할 수 없습니다.");
						}
						else {
							alert_fail(result.error);
						}					
						
					} else {
						alert_success("저장되었습니다");
	
						$('#tblNoticeList').bootstrapTable('refresh');
						$('#dlgNoticeEdit').modal('hide');
						InitForNewNotice();
					}
				},
				error: function (er) {
					alert_fail(er);
				}
			});
		}
	}
}

//팝업 - 삭제 버튼 클릭
function btnNoticeModalDelete_click() {
	var jobCode = $("#hidJobCode").val();		//Job Code

	if (jobCode == "") {
		alert("삭제 할 항목의 정보를 찾을 수 없습니다.\n새로 고침 후 다시 시도하여 주십시오.");
		return;
	}

	if (confirm("전표를 삭제하시겠습니까?")) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/deleteNotice.do",			
			data: { "jobCode": encodeURIComponent(jobCode)},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					
					alert_fail(data.error);					
					
				} else {
					InitForNewNotice();
					initTable();		//목록 초기 바인딩
					$('#dlgNoticeEdit').modal('hide');
					alert_success("삭제되었습니다.");
				}
			},
			error: function (er) {
				params.error(er);
			}
		});
	}
	return;
}
//#endregion

//#region 등록/수정 팝업 관련 
//신규 요청을 위한 modal 초기화
function InitForNewNotice() {
	//출장정보
	$("#hidJobCode").val("");
	$("#txtTitle").val("");
	$("#txtContents").val("");
	$("#txtNoticeFileGrpCd").val("");
	
	

	//버튼처리
	$("#btnNoticeModalSave").show();
	$("#btnNoticeModalDelete").hide();

	//validation 오류 표시 제거
	removeValidationError("dlgNoticeEdit");
	
	initFileInput("txtNoticeFile");
}

//수정 모드로  상세정보 표시
function setNoticeModeEdit(row) {
	//출장정보
	
	$("#hidJobCode").val(row.NOTICE_ID);
	$("#txtTitle").val(row.TITLE);
	$("#txtNoticeFileGrpCd").val(row.FILE_GRP_CD);
	$("#chkRealTime").prop("checked", (row.IS_REALTIME != null && row.IS_REALTIME == 'Y'));
	
	var jobCode = (typeof $("#hidJobCode").val() !== 'undefined') ? $("#hidJobCode").val() : row.NOTICE_ID;
	
	searchNoticeFileList(row);
	
	$.ajax({
		async: false,
		type: "POST",
		url: "/getNoticeContents.do",
		dataType: "json",
		//data: { "jobCode": encodeURIComponent($("#hidJobCode").val()) },
		data: { "jobCode": encodeURIComponent(jobCode) },
		success: function (data) {
			resultObj = data.results;
			$("#txtContents").val(resultObj[0]["CONTENTS"]);
		},
		error: function (e) {
			alert_fail(e.responseText);
		},						
		complete: function (e) {
			//로딩중 화면 제거
			$('.wrap-loading').addClass('dp_n');
		}
	});

	//validation 오류 표시 제거
	removeValidationError("dlgNoticeEdit");

	//버튼처리
	$("#btnNoticeModalSave").show();
	$("#btnNoticeModalDelete").show();
}

function searchNoticeFileList(row){
	var fileGrpCd = (typeof $("#txtNoticeFileGrpCd").val() !== 'undefined') ? $("#txtNoticeFileGrpCd").val() : row.FILE_GRP_CD;
	
	$.ajax({
		url: "/getIdsmSetupDlgItemScheduleFile.do",		
		//data: {"FILE_GRP_CD" : $("#txtNoticeFileGrpCd").val()},
		data: {"FILE_GRP_CD" : fileGrpCd},
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
				
				/*
				if(!fileUse) {
					
					$('#dlgItemSchedule .input-group-btn').css("display", "none");
					$('#dlgItemSchedule .kv-file-remove').css("display", "none");
				}
				*/					
				
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
			
			/*
			if(!fileUse) {
				
				$('#dlgItemSchedule .input-group-btn').css("display", "none");
				$('#dlgItemSchedule .kv-file-remove').css("display", "none");
			}
			*/				
        }
    });
}

//hidden으로 가진 필드와 기타 입력된 값에 대한 점검
function checkNoticeHiddenValidation() {
	var isValid = true;
	var isValid2 = true;
	var msg = "";

	if ($("#hidWriterID").val() === "") {
		alert("로그인 사용자의 정보를 확인 할 수 없습니다. 페이지를 새로 고친 후 다시 시도하여 주십시오.");
		return false;
	}

	if (isValid && isValid2) {
		return true;
	} else { 
		alert(msg);
		return false;
	}
}
//#endregion

//#region 공용함수 - 초기화, 정보 조회, ETC
//validation 오류 표시 제거
function removeValidationError(areaID) {
	$("#" + areaID + " .validation-error").each(function () {
		$(this).removeClass("validation-error");
	});
}

//required class를 가진 필수 항목 입력 여부 확인
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

//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거
function removeDisabled() {
	$("input:disabled").attr("disabled", false);
	$("select:disabled").attr("disabled", false);
}
//#endregion



function initFileInput(obj_id) {

	
	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme					: "fas"
		, language				: "kr"
		, showUpload			: false
		, hideThumbnailContent	: true
		, overwriteInitial		: false
		, validateInitialCount	: true
	});

	$(".btn-file").css("padding-top", "3px"	);
	$(".btn-file").css("height"		, "26px");

	$(".file-caption").css("height"			, "26px");
	$(".file-caption").css("padding-top"	, "3px"	);
	$(".file-caption").css("padding-bottom"	, "3px"	);
}

function strScriptCheck(str) {
	var value = str; 
	value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
    value = value.replaceAll("'", "&#39;");
    value = value.replaceAll("eval\\((.*)\\)", "");
    value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
    value = value.replaceAll("script", "");		
	
	
	return value;	
}