(function($) {
        $.ajaxSetup({
        	async: true,
        	type: "POST",
        	dataType: "json",
			beforeSend: function(xhr) {
				LodingShow(xhr);
			},
	        error: function (xhr, status, e) {
	        	if (xhr.status == 503) {
	        		logoutUser();
	        	}
	        	else {
	        		alert_fail(xhr.responseText);
	        	}
			},
			complete: function (e) {
				LodingHide();
			}

        });
})(jQuery);

function LodingShow(xhr){
	$('.wrap-loading').removeClass('dp_n');
   	xhr.setRequestHeader("AJAX", "true");
}

function LodingHide(){
	$('.wrap-loading').addClass('dp_n'); //로딩중 화면 제거
	$('#wrap-loading').addClass('dp_n'); //로딩중 화면 제거
}

var tabs;
$(document).ready(function () {

	initMenu();

	initLanguage();

	$('#spanDefaultCountry').click(function () { btnDefaultCountryClick(); return false; });
	$('#btnDefaultProject').click(function () { btnDefaultProjectClick(); return false; });
	$('#btnPassword').click(function () { btnPasswordClick(); return false; });
	$('#dialogAlertPwdSave').click(function () { dialogAlertPwdSaveClick(); return false; });
	$('#btnLogout').click(function () { btnLogoutClick(); return false; });
	$('#spanEmptyCash').click(function () {
		if(document.getElementById('tabs').childNodes.length == 3) {
			window.location.reload(true); return false;
		}
		else {
			var activeTab = $('#tabs').find('.ui-tabs-active');
			var atId = activeTab.attr('aria-controls');
			document.getElementById(`${atId}`).childNodes[0].contentWindow.location.reload(true);
			//document.getElementById(`${atId}`).childNodes[0].contentDocument.location.reload(true);
			return false;
		}
	});

	searchDefailProject();
	searchDefaultCountry();

    // 탭 선언
    tabs = $( "#tabs" ).tabs({
    	activate:movePageSearch
    });

    // 해당 탭 지우기
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        // 해당하는 탭 제거
        $( "#" + panelId ).remove();
        // 탭 refresh
        tabs.tabs( "refresh" );
      });


      //$('#logh').click(function () { 	aa(); return false; });
    searchCurrentLocation();
    searchRealTimeNotice();
});
function movePageSearch(e){
	if($(".ui-state-active").attr("aria-controls") != null){
		var id = $(".ui-state-active").attr("aria-controls").split("-")[1];
		if($("iframe#tabs-"+id)[0].contentWindow.movePageSearch != null){
			$("iframe#tabs-"+id)[0].contentWindow.movePageSearch();
		}
	}
}
function searchDefaultCountry() {

	$.ajax({
		url: "/getInitDefaultCountry.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(list.length > 0) {
				var txt = "Default Country [" + list[0]["COUNTRY"] + "]";
				$('#spanDefaultCountry').text(txt);
			}
			else{
				var txt = "Default Country";
				$('#spanDefaultCountry').text(txt);
			}
        }
    });
}

function searchRealTimeNotice() {
	$.ajax({
		async: false,
		type: "POST",
		url: "/getRealTimeNotice.do",	
		success: function (data, textStatus, jqXHR) {
			var notiHtml = '';
			$('#divRealTimeNotice').empty();
			$.each(data.results, function(i, item) {
				var strClass = (i % 2) == 0 ? 'blinking' : '';
				var strStyle = (i % 2) == 0 ? 'style="color:red;"' : 'style="color:blue;"';
				notiHtml += (i > 0) ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : '';
				notiHtml += '<span class="spanRealTimeNoticeItem ' + strClass + '"' + 
							' data-notice-id="' + item.NOTICE_ID + '"' +
							' data-notice-title="' + item.TITLE + '"' +
							' data-notice-file="' + item.FILE_GRP_CD + '"' +
							' data-notice-realtime="' + item.ATTRIBUTE2 + '"' +
							' ' + strStyle +
							'>' + item.TITLE + '</span>';
			});
			$('#divRealTimeNotice').html(notiHtml);
			$('.spanRealTimeNoticeItem').on('click', function() {
				if(typeof ViewNotice !== 'undefined') {
					ViewNotice($(this).data('notice-id'));
				} else {
					var row = {
						"NOTICE_ID" : $(this).data('notice-id')
						, "TITLE" : $(this).data('notice-title')
						, "FILE_GRP_CD" : $(this).data('notice-file')
						, "IS_REALTIME" : $(this).data('notice-realtime')
					};
					setNoticeModeEdit(row);
					$('#dlgNoticeEdit').modal('show');	
				}
			});
        },
        error: function (er) {
            params.error(er);
		}
    });
}

var defaultProject = false;
function searchDefailProject() {

	$.ajax({
		url: "/getInitDefailProject.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(list.length > 0) {
				var txt = "Default Project [" + list[0]["SEGMENT1"] + " - " + list[0]["NAME"] + "]";
				$('#spanDefaultProject').text(txt);
				defaultProject = true;
			}
			else{
				var txt = "Default Project";
				$('#spanDefaultProject').text(txt);
				defaultProject = false;
			}
        }
    });
}

function searchCurrentLocation() {
	$.ajax({
		url: "/getLocation.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var location = data.result;

			if(location === 'dev') {
				$('#labelCurrentLocation').text('DEV');
			}

        }
    });
}

function logoutUser() {
	alert_modal("Info", $('#alertLogout').val());

	$('#dialogAlert').on('hidden.bs.modal', function () {
	  	window.location.href = "/logout.do";
	});

}

function initLanguage(){

	$('#selLang').html("");
	$.ajax({
		async: true,
		type: "POST",
		url: "/getComCode.do",
		data: {"CODE": "C01"},
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			SetLanguage(dataSet);
        }
    });
}

function SetLanguage(data){

	var html = '<option value="">Language</option>';

	for(var i = 0; i < data.length; i++){
		var item = data[i];

		html += '<option value="' + item.CODE + '">' + item.NAME + '</option>';
	}

	$('#selLang').append(html);

}

function initMenu(){

	$('#divMenu').html("");
	$.ajax({
		async: true,
		type: "POST",
		url: "/getLeftMenu.do",
		data: {},
        dataType: "json",
		success: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			SetMenu(dataSet);
        }
    });
}
var selMenuId = "";
function getMenuId() {
	return selMenuId;
}

function move(el, transYn, defailProjectYn) {

	if(transYn == "Y" && ($('#transID').val() == null || $('#transID').val() == "") ){
		alert_modal("", $('#alertTransAuth').val());
		return;
	}

	if(defailProjectYn == "Y" && !defaultProject ){
		alert_modal("", $('#alertDefaultProjectAuth').val());
		return;
	}

	// 현재 눌린 a 태그 가져오기
    var link = $(el);

    // tabs_id 선언
    var tabs_id = "tabs-" + $(link).attr("id");
    selMenuId = $(link).attr("id");

    // find_id 선언
    var find_id = $("[id= " + tabs_id + "]").attr("id");

    // tab_id 선언
    var tab_id = "#" + tabs_id;

    // a태그에 해당하는 탭이 열려 있을 경우
    if(find_id == tabs_id){
        // 열려있는 탭으로 이동
        tabs.tabs("option","active", id2Index("#tabs",tab_id));
    // 아닐경우
    }else{
        // 탭을 추가
        addTab(link);
    }

	/*var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('action', '/move.do');

	var hiddenField = document.createElement('input');
	hiddenField.setAttribute('type', 'hidden');
	hiddenField.setAttribute('name', 'MENU_SEQ');
	hiddenField.setAttribute('value', menu);

	form.appendChild(hiddenField);
	document.body.appendChild(form);
	form.submit();*/
}

function moveName(name) {
	// 현재 눌린 a 태그 가져오기
    var link = $('a[name="'+name+'"]')[0];

    if(link != null){
	    // tabs_id 선언
	    var tabs_id = "tabs-" + $(link).attr("id");
	    selMenuId = $(link).attr("id");

	    // find_id 선언
	    var find_id = $("[id= " + tabs_id + "]").attr("id");

	    // tab_id 선언
	    var tab_id = "#" + tabs_id;

	    // a태그에 해당하는 탭이 열려 있을 경우
	    if(find_id == tabs_id){
	        // 열려있는 탭으로 이동
	        tabs.tabs("option","active", id2Index("#tabs",tab_id));
	    // 아닐경우
	    }else{
	        // 탭을 추가
	        addTab(link);
	    }
    }
}

function SetMenu(data){

	var firstMenuId = "";

	for(var i = 0; i < data.length; i++){
		var item = data[i];

		if(i == 0){
			firstMenuId = item.MENU_ID;
		}

		if(item.MENU_UP_SEQ == 0 && item.LEAF == 0){
			var html = '<li class="nav-item">' +
				 	   '	<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#' + item.MENU_ID + '" aria-expanded="true" aria-controls="' + item.MENU_ID + '">' +
					   '		<i class="fas fa-fw fa-edit"></i>' +
					   '			<span>' + item.MENU_NAME + '</span>' +
					   '	</a>' +
					   '	<div id="' + item.MENU_ID + '" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">' +
					   '		<div class="bg-white py-2 collapse-inner rounded">' +
					   '		</div>' +
					   '	</div>' +
					   '</li>';

			$('#divMenu').append(html);

		}
		else if(item.MENU_UP_SEQ == 0 && item.LEAF == 1){

			var html = '<li class="nav-item">' +
					   '	<a class="nav-link" href="javascript:aaa(' + item.MENU_SEQ + ');">' +
					   '		<i class="fas fa-fw fa-edit"></i>' +
					   '		<span>' + item.MENU_NAME + '</span>' +
					   '	</a>' +
					   '</li>';

			$('#divMenu').append(html);

		}
		else if(item.MENU_UP_SEQ != 0){
			var html = '<a class="collapse-item" id="' + item.MENU_SEQ + '"rel="' + item.MENU_SEQ + '"  href="javascript:" onclick="move(this , \'' + item.TRANS_YN +'\', \'' + item.DEFAIL_PROJECT_YN +'\');" name="'+ item.MENU_NAME+'" >' + item.MENU_NAME + '</a>';

			var id = "#" + item.MENU_UP_ID + " .collapse-inner";
			$(id).append(html);
		}

	}

	var selectMenuId = $('#selectMenuId').val();
	if(selectMenuId != "")
	{
		var id = '#' + selectMenuId;
		$(id).addClass('show');
		$(id).parent('li').children('.nav-link').removeClass('collapsed');
	}
	else
	{
		/*if(firstMenuId != "")
		{
			var id = '#' + firstMenuId;
			$(id).addClass('show');
			$(id).parent('li').children('.nav-link').removeClass('collapsed');
		}*/
	}


	if($('#menu_id').val() != "" && $('#firstYn').val() == "Y") {
		var id = "#" + $('#menu_id').val();

		if($(id).length > 0){
			$(id).click();
		}
	}

}
function getGridCode(){

	var gridCode = $('#txtGridCode').val();
	return gridCode;
}


function btnDefaultCountryClick(){
	var param = {};

	$('#divfootPopUp').load("/desmDefaultCountryListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmDefaultCountryPopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					searchDefaultCountry();
				}
			});
		}
	});
}

function btnDefaultProjectClick(){
	var param = {};

	$('#divfootPopUp').load("/desmDefaultProjectListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initDesmDefaultProjectPopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					searchDefailProject();
				}
			});
		}
	});
}

function btnPasswordClick(){
 	$('#dialogAlertPwdClose').show();
 	$('#dialogAlertPwd').modal('show');
}

function dialogAlertPwdSaveClick() {

	var chkValidation = checkRequiredField("dialogAlertPwd");

	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}

	if($('#txtNewPassword').val() != $('#txtNewPasswordConfirmation').val()) {
		alert_modal("", $('#alertSavePwdErr').val());
		return;
	}


	if($('#txtNewPassword').val().length < 5) {
		alert_modal("", $('#alertSavePwdLengthErr').val());
		return;
	}


    var noEngRule = /[a-zA-Z]/;
    if(!noEngRule.test($('#txtNewPassword').val())) {
        alert_modal("", $('#alertSavePwdEnglishErr').val());
        return
    }

    var noNumRule = /[0-9]/;
    if(!noNumRule.test($('#txtNewPassword').val())) {
        alert_modal("", $('#alertSavePwdNumberErr').val());
        return
    }

	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {
			var paramData = {"C_PWD" : $('#txtCurrentPassword').val(), "N_PWD" : $('#txtNewPassword').val(), "PWS_EDIT_YN" : $('#PWS_EDIT_YN').val()};

			$.ajax({
				url: "/saveDesmPwdChange.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {

						if(result.error == "NOT") {
							var msg = $('#alertSavePwdNotErr').val();
							alert_fail(msg);
						}
						else
						{
							alert_fail(result.error);
						}

					} else {

						alert_success($('#alertSuccess').val());

						//document.location.href = "/login.do";
						window.location.href = '/main.do?lang=' + $('#txtDesmLang').val();
					}
				}
			});

		}
	});
}

function btnLogoutClick() {
	document.location.href = "/logout.do";
}
