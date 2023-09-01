
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

	//목록 초기 바인딩
	initTable();

	//Add 버튼 클릭
	$('#btnAdd').click(function () { 
		InitForNewMenu('add');		
		$('#dlgPerEdit').modal('show');
			
	});	
	
	$('#btnMenuAuthModalSave').click(function () { 
		btnMenuAuthModalSave_click(); 
		return false; 
	});

	$('#btnMenuModalSave').click(function () { 
		btnMenuModalSave_click(); 
		return false; 
	});



	//등록/수정 팝업 - 저장 버튼 클릭
	$('#btnPerModalSave').click(function () { 
		btnPerModalSave_click(); 
		return false; 
	});
	//등록/수정 팝업 - 삭제 버튼 클릭
	$('#btnPerModalDelete').click(function () { 
		btnPerModalDelete_click(); 
		return false; 
	});
	//등록/수정 팝업 호출 시 이벤트
	$("#dlgMenuSelect").on('show.bs.modal', function(e) { $('#tblMenuList').bootstrapTable('refresh'); });
	
	$("#dlgMenuAuthSelect").on('show.bs.modal', function(e) { $('#tblMenuAuthList').bootstrapTable('refresh'); });
		
});

//날짜필드 자동완성필드 생성, 기본 이벤트 바인딩
function initControls() {

}
//#endregion

//#region 코드성 데이터 처리, dropdown 바인딩
//#endregion

//#region 이벤트 - List페이지
//#endregion

function ajaxSelectMenuAuthList(params) {

	$.ajax({
		async: false,
		type: "POST",
		url: "/getMenuAuthUseList.do",		
		data: {"MENU_SEQ": $('#txtMenuSeq').val(), "ROLE_SEQ" : $('#txtSeq').val()},
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

window.onload = function () {

	$('#tblMenuAuthList').bootstrapTable('destroy').bootstrapTable({
       columns: [ 
        {
          field: 'ck',
          checkbox: true,
          align: 'center'
        },        
         {
           field: 'AUTH_CODE',
           title: 'Code',
           align: 'center'
         },          
         {
           field: 'AUTH_NAME',
           title: 'Name',
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

    $('#tblMenuList').bootstrapTable('destroy').bootstrapTable({
      idField: 'MENU_SEQ',
 	  
      showColumns: false,
      
      columns: [ 
        {
          field: 'ck',
          checkbox: true,
          align: 'center'
        },          
        {
          field: 'MENU_NAME',
          title: 'Menu Name',
        
        },          
        { 
          title: 'Management',
          align: 'center',
          formatter: 'formatterMenuAuth',
          events: 'menuAuthEvents'
        }           
      ],
      treeShowField: 'MENU_NAME',
      parentIdField: 'MENU_UP_SEQ',
	showRefresh: false,
	showFullscreen: false,
		ajax: "ajaxSelectMenuList",
		responseHandler: "completeDataBind",	
      onPostBody: function() {
        var columns = $('#tblMenuList').bootstrapTable('getOptions').columns;

        if (columns && columns[0][1].visible) {
          $('#tblMenuList').treegrid({
            treeColumn: 1,
            onChange: function() {
              $('#tblMenuList').bootstrapTable('resetView')
            }
          });
        }
      }
    });	
    
    
    
      $('#tblMenuList').on('check.bs.table', function(obj, row) {
      	 LowCheck(row);
      });
      
      $('#tblMenuList').on('uncheck.bs.table', function(obj, row) {
      	LowUnCheck(row);
      
      });
      
      $('.modal-body .fixed-table-body').css('height','500px');
	
	
}

menuAuthEvents = {

	'click .setMenuAuth': function (e, value, row, index) {
		$('#txtMenuSeq').val(row.MENU_SEQ);
		$('#dlgMenuAuthSelect').modal('show');
	},	
};

function formatterMenuAuth(value, row, index) {	
	var retStr_menu_on = ' <a tabindex="0" href="javascript:void(0)" class="setMenuAuth"><i class="fas fa-bars font-blue" title="Menu 권한 설정"></i></a>&nbsp;';

	var retStr = retStr_menu_on;
	return retStr;
}


function LowCheck(row){

	var gridData = $('#tblMenuList').bootstrapTable('getData');
	for(var i = 0; i < gridData.length; i++){
		var gridRow = gridData[i];
		if(gridRow.MENU_UP_SEQ == row.MENU_SEQ){
		      $('#tblMenuList').bootstrapTable('updateRow', {
		          index: i,
		          row: {
		        	  ck: true
		          }
		        })		
		}
	}
	
	UpCheck(row);
}

function UpCheck(row){

	var gridData = $('#tblMenuList').bootstrapTable('getData');
	for(var i = 0; i < gridData.length; i++){
		var gridRow = gridData[i];
		if(gridRow.MENU_SEQ == row.MENU_UP_SEQ){
		      $('#tblMenuList').bootstrapTable('updateRow', {
		          index: i,
		          row: {
		        	  ck: true
		          }
		        })		
		}
	}
}

function LowUnCheck(row){

	var gridData = $('#tblMenuList').bootstrapTable('getData');
	for(var i = 0; i < gridData.length; i++){
		var gridRow = gridData[i];
		if(gridRow.MENU_UP_SEQ == row.MENU_SEQ){
		      $('#tblMenuList').bootstrapTable('updateRow', {
		          index: i,
		          row: {
		        	  ck: false
		          }
		        })		
		}
	}
	
	UpUnCheck(row)
}

function UpUnCheck(row){

	var check = false;
	var gridData = $('#tblMenuList').bootstrapTable('getData');
	for(var i = 0; i < gridData.length; i++){
		var gridRow = gridData[i];
		if(gridRow.MENU_UP_SEQ == row.MENU_UP_SEQ){
			if(gridRow.ck){
				check = true;
			}		
		}
	}
	
	
   if(!check){
	   	for(var i = 0; i < gridData.length; i++){
			var gridRow = gridData[i];
			if(gridRow.MENU_SEQ == row.MENU_UP_SEQ){
			      $('#tblMenuList').bootstrapTable('updateRow', {
			          index: i,
			          row: {
			        	  ck: false
			          }
			        })		
			}
		}
   }	

}


function ajaxSelectMenuList(params) {

	$.ajax({
		async: false,
		type: "POST",
		url: "/getPermissionMenu.do",		
		data: {"ROLE_SEQ": $("#txtSeq").val()},
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

//#region LIST 페이지
//Main List table bootstrap-table 데이터 바인딩
function initTable() {	

	$('#tblList').bootstrapTable('destroy').bootstrapTable({
		toolbar: "#toolbar",
		search: "true",
		showRefresh: "true",
		showFullscreen: "true",
		clickToSelect: "true",
		idField: "ROLE_SEQ",
		ajax: "ajaxSelectPerList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});    


}



gridEvents = {
	
	'click .editMenu': function (e, value, row, index) {
	
		InitForNewMenu('edit');
		
		$('#txtName').val(row.ROLE_NAME);
		$('#txtSeq').val(row.ROLE_SEQ);
		$('#selSiteYn').val(row.SITE_YN);
		
		
		$('#dlgPerEdit').modal('show');
			
	},	
	'click .deleteMenu': function (e, value, row, index) {
		$('#txtSeq').val(row.ROLE_SEQ);
		btnPerModalDelete_click();
	},
	'click .setMenu': function (e, value, row, index) {
		$('#txtSeq').val(row.ROLE_SEQ);
		$('#dlgMenuSelect').modal('show');
	},	
};

function formatter(value, row, index) {
	var retStr_edit_on = ' <a tabindex="0" href="javascript:void(0)" class="editMenu"><i class="fas fa-pencil-alt font-black" title="수정"></i></a>&nbsp;';
	var retStr_del_on = ' <a tabindex="0" href="javascript:void(0)" class="deleteMenu"><i class="fas fa-trash-alt font-red" title="삭제"></i></a>&nbsp;';
	var retStr_menu_on = ' <a tabindex="0" href="javascript:void(0)" class="setMenu"><i class="fas fa-bars font-blue" title="Menu 권한 설정"></i></a>&nbsp;';

	var retStr = retStr_edit_on + retStr_del_on + retStr_menu_on;
	return retStr;
}


//ajax - 테이블 목록 조회
function ajaxSelectPerList(params) {

	$.ajax({
		async: false,
		type: "POST",
		url: "/getPermission.do",		
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

function btnMenuAuthModalSave_click() {

	
		if (confirm($('#alertSave').val())) {
		
			var list = $('#tblMenuAuthList').bootstrapTable('getSelections');
			var paramList = JSON.stringify(list);
			$.ajax({
				async: false,
				type: "POST",			
				url: "/savePermissionMenuAuth.do",
				data: {"MENU_SEQ": $('#txtMenuSeq').val(), "ROLE_SEQ" : $('#txtSeq').val(), "updateList": paramList },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
						$('#dlgMenuAuthSelect').modal('hide');
					}
				}
			});
		}
	
}

function btnMenuModalSave_click() {

	
		if (confirm($('#alertSave').val())) {
		
			var list = $('#tblMenuList').bootstrapTable('getSelections');
			var paramList = JSON.stringify(list);
			$.ajax({
				async: false,
				type: "POST",			
				url: "/savePermissionMenu.do",
				data: { "ROLE_SEQ": $("#txtSeq").val(), "updateList": paramList },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblMenuList').bootstrapTable('refresh');
					}
				}
			});
		}
	
}


//#region 이벤트 - 등록/수정 팝업
//팝업 - 저장 버튼 클릭
function btnPerModalSave_click() {
	
	var chkValidation = checkRequiredField("dlgPerEdit");

	if (!chkValidation) {
		
		alert($('#alertValidate').val());
		return false;
	} else {
		if (confirm($('#alertSave').val())) {
			removeDisabled();	//POST시 값 전송을 위해 disabled 된 항목의 속성을 제거

			$.ajax({
				async: false,
				type: "POST",			
				url: "/savePermission.do",
				data: { "ROLE_SEQ": $("#txtSeq").val(), "ROLE_NAME": $("#txtName").val(), "SITE_YN" : $("#selSiteYn").val() },
				dataType: "json",
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSaveSuccess').val());
	
						$('#tblList').bootstrapTable('refresh');
						$('#dlgPerEdit').modal('hide');
						InitForNewMenu('add');
					}
				}
			});
		}
	}
}

//팝업 - 삭제 버튼 클릭
function btnPerModalDelete_click() {

	if (confirm($('#alertDelete').val())) {
		$.ajax({
			async: false,
			type: "POST",
			url: "/deletePermission.do",			
			data: { "ROLE_SEQ": $("#txtSeq").val()},
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				if (data.error != null) {
					alert_fail(data.error);
				} else {
					InitForNewMenu('add');
					initTable();		
					$('#dlgPerEdit').modal('hide');
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
		$("#txtSeq").val("");		
		$("#txtName").val("");
		$("#selSiteYn").val("N");
		
		//버튼처리
		$("#btnPerModalSave").show();
		$("#btnPerModalDelete").hide();
	}
	else if(mode == 'edit'){
		$("#btnPerModalSave").show();
		$("#btnPerModalDelete").show();
	}	

	//validation 오류 표시 제거
	removeValidationError("dlgPerEdit");
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