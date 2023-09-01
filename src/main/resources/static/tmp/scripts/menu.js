
//#region 전역변수

var fileCatCode = "NOTICE";

//테이블에서 선택된 항목 저장
var selections = [];
var selectRow = null;


//에디터
var editorEdit;	//수정 화면
var editorView; //조회화면

//#endregion

//#region 문서 로딩 & 초기화, Select, datepicker, autocomplete
$(document).ready(function () {
	//화면 컨트롤 초기화
	initControls();
	

});

window.onload = function () {
	//목록 초기 바인딩
	initTable();
	initAuthTable();
}

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩
function initControls() {

	$('#btnAuthAdd').click(function () { 
		InitForNewAuth('add');
		$('#dlgAuthEdit').modal('show');
		return false;		
	});	
	
	$('#btnAuthModalSave').click(function () { 
		btnAuthModalSave_click(); 
		return false; 
	});	
	
	$('#btnAuthModalDelete').click(function () { 
		btnMenuAuthModalDelete_click(); 
		return false; 
	});	
	
 	$('#tblMenuList').on('click-cell.bs.table', function(obj, field, data, row) {
		selectRow = row;		
	});    	

	//Add 버튼 클릭
	$('#btnCurAdd').click(function () { 
		InitForNewMenu('add');
		
		var gridData = $('#tblMenuList').bootstrapTable('getData');
		
		if(gridData.length > 0 && selectRow == null){
			alert($('#alertSelectRow').val());
			return;
		}
		
		if(selectRow == null){
			$('#txtMenuUpSeq').val("0"); 
		}
		else {
			$('#txtMenuUpSeq').val(selectRow.MENU_UP_SEQ);
		}
		
		
		$('#dlgMenuEdit').modal('show');
			
	});
	
	$('#btnLowAdd').click(function () { 
		InitForNewMenu('add');
		
		var gridData = $('#tblMenuList').bootstrapTable('getData');
		
		if(gridData.length > 0 && selectRow == null){
			alert($('#alertSelectRow').val());
			return;
		}
		
		if(selectRow == null){
			$('#txtMenuUpSeq').val("0"); 
		}
		else {
			$('#txtMenuUpSeq').val(selectRow.MENU_SEQ);
		}
		
		
		$('#dlgMenuEdit').modal('show');
			
	});	

	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnMenuModalSave').click(function () { 
		btnMenuModalSave_click(); 
		return false; 
	});
	//등록/수정 팝업 - 삭제 버튼 클릭
	$('#btnMenuModalDelete').click(function () { 
		btnMenuModalDelete_click(); 
		return false; 
	});
	//등록/수정 팝업 호출 시 이벤트
	$("#dlgNoticeEdit").on('show.bs.modal', function(e) { });
	//등록/수정 팝업 닫히기 전  이벤트
	$('#dlgNoticeEdit').on('hide.bs.modal', function (e) { });		
	
	$("#dlgAuthSelect").on('show.bs.modal', function(e) { $('#tblAuthList').bootstrapTable('refresh'); });

}
//#endregion

//#region 코드성 데이터 처리, dropdown 바인딩
//#endregion

//#region 이벤트 - List페이지
//#endregion




//#region LIST 페이지
//Main List table bootstrap-table 데이터 바인딩
function initTable(gridResultData) {	
	
    $('#tblMenuList').bootstrapTable('destroy').bootstrapTable({
      idField: 'MENU_SEQ',
      showColumns: false,
      columns: [     
        {
          field: 'MENU_NAME',
          title: 'Menu Name'
        },
        {
          field: 'MENU_PATH',
          title: 'Menu Path'
        },        
        {
          field: 'MENU_ORDER',
          title: 'Order',
          align: 'center'
        },
        {
          field: 'TRANS_YN',
          title: '운송계정사용유무',
          align: 'center'
        },  
        {
          field: 'DEFAIL_PROJECT_YN',
          title: 'DefaultProject사용유무',
          align: 'center'
        },    
        {
          field: 'MOBILE_YN',
          title: 'Mobile사용유무',
          align: 'center'
        },                   
        { 
          title: 'Management',
          align: 'center',
          formatter: 'formatter',
          events: 'menuEvents'
        }        
      ],
      treeShowField: 'MENU_NAME',
      parentIdField: 'MENU_UP_SEQ',
	  toolbar: "#toolbar",	
	showRefresh: "true",
	showFullscreen: "true",
		ajax: "ajaxSelectMenuList",
		responseHandler: "completeDataBind",	
      onPostBody: function() {
        var columns = $('#tblMenuList').bootstrapTable('getOptions').columns;

        if (columns && columns[0][0].visible) {
          $('#tblMenuList').treegrid({
            treeColumn: 0,
            onChange: function() {
              $('#tblMenuList').bootstrapTable('resetView')
            }
          });
        }
      }
    });	
    
    


}

function initAuthTable(gridResultData) {	
	$('#tblAuthList').bootstrapTable('destroy').bootstrapTable({
       columns: [ 
         {
           field: 'AUTH_CODE',
           title: 'Code',
           align: 'center'
         },          
         {
           field: 'AUTH_NAME',
           title: 'Name',
         },
        { 
          title: 'Management',
          align: 'center',
          formatter: 'formatterAuth',
          events: 'menuAuthEvents'
        }          
        ],	
		search: false,
		showRefresh: false,
		showFullscreen: false,
		clickToSelect: false,
		idField: "AUTH_SEQ",
		ajax: "ajaxSelectMenuAuthList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
      
     $('.modal-body .fixed-table-body').css('height','300px');
}

function formatterAuth(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenuAuth"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteMenuAuth"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';

	var retStr = retStr_edit_on + retStr_del_on;
	return retStr;
}

menuAuthEvents = {
	
	'click .editMenuAuth': function (e, value, row, index) {
	
		InitForNewAuth('edit');
		
		$('#txtAuthSeq').val(row.AUTH_SEQ);
		$("#txtAuthCode").val(row.AUTH_CODE);
		$("#txtAuthName").val(row.AUTH_NAME);
		
		$('#dlgAuthEdit').modal('show');
			
	},
	'click .deleteMenuAuth': function (e, value, row, index) {
		$('#txtAuthSeq').val(row.AUTH_SEQ);
		btnMenuAuthModalDelete_click();
	}		
};

function btnMenuAuthModalDelete_click() {

	if (confirm($('#alertDelete').val())) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/deleteMenuAuth.do",			
			data: { "AUTH_SEQ": $("#txtAuthSeq").val()},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					InitForNewAuth('add');
					initAuthTable();
					$('#dlgAuthEdit').modal('hide');
					alert_success($('#alertDeleteSuccess').val());
				}
			}
		});
	}
	return;
}

function ajaxSelectMenuAuthList(params) {
	

	$.ajax({
		async: false,
		type: "POST",
		url: "/getMenuAuthList.do",		
		data: {"MENU_SEQ": $('#txtMenuSeq').val()},
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
			
        }
    });
}

menuEvents = {
	
	'click .editMenu': function (e, value, row, index) {
	
		InitForNewMenu('edit');
		
		$('#txtMenuSeq').val(row.MENU_SEQ);
		$('#txtMenuUpSeq').val(row.MENU_UP_SEQ);
		$("#txtMenuNameEn").val(row.MENU_NAME_EN);
		$("#txtMenuNameKo").val(row.MENU_NAME_KO);
		$("#txtMenuPath").val(row.MENU_PATH);
		$("#selTransYn").val(row.TRANS_YN);
		$("#selDefailProjectYn").val(row.DEFAIL_PROJECT_YN);
		$("#selMobileYn").val(row.MOBILE_YN);
		
		
		$("#txtMenuOrder").val(row.MENU_ORDER);		
		
		$('#dlgMenuEdit').modal('show');
			
	},
	'click .deleteMenu': function (e, value, row, index) {
		$('#txtMenuSeq').val(row.MENU_SEQ);
		btnMenuModalDelete_click();
	},
	'click .setAuthMenu': function (e, value, row, index) {
		$('#txtMenuSeq').val(row.MENU_SEQ);	
		$('#dlgAuthSelect').modal('show');
	},		
};

function formatter(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteMenu"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';
	var retStr_auth_on = ' <a tabindex="0" href="javascript:void(0)" class="setAuthMenu"><i class="fas fa-bars font-blue" title="버튼 권한 설정"></i></a>&nbsp;';

	var retStr = retStr_edit_on + retStr_del_on + retStr_auth_on;
	return retStr;
}


//ajax - 테이블 목록 조회
function ajaxSelectMenuList(params) {
	

	$.ajax({
		async: false,
		type: "POST",
		url: "/getMenu.do",		
		data: {},
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
			
			selectRow = null;
        }
    });
}


//Table Data 조회 후
function completeDataBind(res) {
	$.each(res.rows, function (i, row) {
	});
	return res;
}
//#endregion

function btnAuthModalSave_click() {
	
	var chkValidation = checkRequiredField("dlgAuthEdit");

	if (!chkValidation) {
		
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			$.ajax({
				async: false,
				type: "POST",			
				url: "/saveMenuAuth.do",
				data: { "MENU_SEQ": $("#txtMenuSeq").val(), "AUTH_SEQ": $("#txtAuthSeq").val(), "AUTH_CODE": $("#txtAuthCode").val(), "AUTH_NAME": $("#txtAuthName").val() },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblAuthList').bootstrapTable('refresh');
						$('#dlgAuthEdit').modal('hide');
						InitForNewAuth('add');
					}
				}
			});
		}
	}
}

function InitForNewAuth(mode) {

	if(mode=='add'){
		$("#txtAuthSeq").val("");
		$("#txtAuthCode").val("");
		$("#txtAuthName").val("");
		
		//버튼처리
		$("#btnAuthModalSave").show();
		$("#btnAuthModalDelete").hide();
	}
	else if(mode == 'edit'){
		$("#btnAuthModalSave").show();
		$("#btnAuthModalDelete").show();
	}	

	//validation 오류 표시 제거
	removeValidationError("dlgAuthEdit");
}


//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnMenuModalSave_click() {
	
	var chkValidation = checkRequiredField("dlgMenuEdit");

	if (!chkValidation) {
		
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			$.ajax({
				async: false,
				type: "POST",			
				url: "/saveMenu.do",
				data: { "MENU_SEQ": $("#txtMenuSeq").val(), "MENU_NAME_KO": $("#txtMenuNameKo").val(), "MENU_NAME_EN": $("#txtMenuNameEn").val(), "MENU_UP_SEQ": $("#txtMenuUpSeq").val(), "MENU_PATH": $("#txtMenuPath").val(), "TRANS_YN": $("#selTransYn").val(), "DEFAIL_PROJECT_YN": $("#selDefailProjectYn").val(), "MOBILE_YN": $("#selMobileYn").val(), "MENU_ORDER": $("#txtMenuOrder").val() },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblMenuList').bootstrapTable('refresh');
						$('#dlgMenuEdit').modal('hide');
						InitForNewMenu('add');
					}
				}
			});
		}
	}
}

//팝업 - 삭제 버튼 클릭
function btnMenuModalDelete_click() {

	if (confirm($('#alertDelete').val())) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/deleteMenu.do",			
			data: { "MENU_SEQ": $("#txtMenuSeq").val()},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					InitForNewMenu('add');
					initTable();		
					$('#dlgMenuEdit').modal('hide');
					alert_success($('#alertDeleteSuccess').val());
				}
			}
		});
	}
	return;
}
//#endregion

//#region 등록/수정 팝업 관련 
//신규 요청을 위한 modal 초기화
function InitForNewMenu(mode) {

	if(mode=='add'){
		$("#txtMenuSeq").val("");
		$("#txtMenuNameEn").val("");
		$("#txtMenuNameKo").val("");
		$("#txtMenuPath").val("");
		$("#selTransYn").val("N");
		$("#selDefailProjectYn").val("N");
		$("#selMobileYn").val("N");
		$("#txtMenuOrder").val("");
		
		//버튼처리
		$("#btnMenuModalSave").show();
		$("#btnMenuModalDelete").hide();
	}
	else if(mode == 'edit'){
		$("#btnMenuModalSave").show();
		$("#btnMenuModalDelete").show();
	}	

	//validation 오류 표시 제거
	removeValidationError("dlgMenuEdit");
}

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