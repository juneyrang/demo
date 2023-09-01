﻿﻿//모든 페이지 화면 로드 완료시 수행
$(document).ready(function () {
	//Bootstrap tooltip 적용
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover({ html:true })
	});

	//bootstrap fix: 다중 모달 사용시 배경 흐리게
	$(document).on('show.bs.modal', '.modal', function () {
		//var zIndex = 1040 + (10 * $('.modal:visible').length);	//하드코딩 z-index
		var zIndex = Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) {	//z-index 최대값 구해서 계산
			return + el.style.zIndex;
		})) + 10;

		$(this).css('z-index', zIndex);
		setTimeout(function() {
			$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
		}, 0);
	});

	//bootstrap fix: 다중 모달 사용시 스크롤 오류
	$(document).on('hidden.bs.modal', '.modal', function () {
		$('.modal:visible').length && $(document.body).addClass('modal-open');
	});

	//jQuery UI Autocomplete 선택항목 강조 Patch
	PatchAutocomplete(); 
	
    $("#selLang").change(function(){
       
       if($(this).val() == ""){
       	 return;
       }
       
       window.location.href = '/main.do?lang=' + $(this).val();
       
    });
	
	
});

//jquery ajax 호출 시 로딩 이미지 표시
$(document).ajaxStart(function( event, request, settings ) {
	$('.wrap-loading').removeClass('dp_n');
});
//jquery ajax 호출 완료시 로딩 이미지 제거
$(document).ajaxComplete(function (event, request, settings) {
	$('.wrap-loading').addClass('dp_n');
	$('#wrap-loading').addClass('dp_n'); //로딩중 화면 제거
});

/* 공통 사용 함수 */
//로딩 이미지 표시 or 숨기기
function loadingImageToggle() {
	if ($('.wrap-loading').hasClass('dp_n'))
		$('.wrap-loading').removeClass('dp_n');
	else {
		$('.wrap-loading').addClass('dp_n');
		$('#wrap-loading').addClass('dp_n'); //로딩중 화면 제거
	}
		
}

//A 테그에 동작 없음 처리
function void_href() { return; }

//기타 테그에 return false 처리
function void_false() { return false; }

//브라우저 종류 확인
function getBrowserType() {
	var agt = navigator.userAgent.toLowerCase();
	
	if (agt.indexOf("chrome") != -1) return "Chrome";
	if (agt.indexOf("opera") != -1) return "Opera";
	if (agt.indexOf("staroffice") != -1) return "StarOffice";
	if (agt.indexOf("webtv") != -1) return "WebTV";
	if (agt.indexOf("beonex") != -1) return "Beonex";
	if (agt.indexOf("chimera") != -1) return "Chimera";
	if (agt.indexOf("netpositive") != -1) return "NetPositive";
	if (agt.indexOf("phoenix") != -1) return "Phoenix";
	if (agt.indexOf("firefox") != -1) return "Firefox";
	if (agt.indexOf("safari") != -1) return "Safari";
	if (agt.indexOf("skipstone") != -1) return "SkipStone";
	if (agt.indexOf("msie") != -1) return "MSIE";
	if (agt.indexOf("rv:11.0") != -1) return "MSIE";
	if (agt.indexOf("netscape") != -1) return "Netscape";
	if (agt.indexOf("mozilla/5.0") != -1) return "Mozilla";
}

//숫자(실수)만 입력되도록 설정
// onKeyDown = "return onlynumber();"
function onlynumber(event) {
	event = event || window.event;
	var key = (event.which) ? event.which : event.keyCode;

	if (key > 47 && key < 58)					// 상단 숫자
		return true;
	else if (key > 95 && key < 106)			// 키패드 숫자
		return true;
	else if (key == 8 || key == 46 || key == 37 || key == 39 || key == 9 || key == 110 || key == 190)		//백스페이스, Delte, 좌, 우 화살표, "."
		return true;
	else if (key > 95 && key < 106)			// 키패드 숫자
		return true;
	else
		event.preventDefault();
		//return false;
}

//숫자(정수)만 입력되도록 설정
// onKeyDown = "return onlyint();"
function onlyint(event) {
	event = event || window.event;
	var key = (event.which) ? event.which : event.keyCode;

	if (key > 47 && key < 58)					// 상단 숫자
		return true;
	else if (key > 95 && key < 106)			// 키패드 숫자
		return true;
	else if (key == 8 || key == 46 || key == 37 || key == 39 || key == 9)		//백스페이스, Delte, 좌, 우 화살표 - 실수에서 . 제외
		return true;
	else if (key > 95 && key < 106)			// 키패드 숫자
		return true;
	else
		event.preventDefault();
		//return false;
}

//숫자에 , 찍기
function addComma(num) {
	if (num == "0") return "0";
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return (num == null || num == "") ? "" : num.toString().replace(regexp, ',');
}

//문자내에서 , 제거 숫자의 단위 표시 , 제거
function removeComma(str) {
	if (str == "0") return "0";
	var regexp = /,/g;
	return (str == null || str == "") ? "" : str.replace(regexp, '');
}

//ajax 파라메터를 전달 가능한 형태로 변경
function replaceForAjaxParam(orgVal) {
	var retVal = "";

	retVal = orgVal;
	retVal = retVal.replace(/\\/gi, "\\\\");	//경로 문자
	retVal = retVal.replace(/'/gi, "\\'");		//single quote

	return retVal;
}

//성공 alert 표시
function alert_success(msg) {
	$("#alert-success").html(msg);
	$("#alert-success").fadeIn(100).delay(1500).fadeOut(200);
//	$("#alert-success").fadeIn(300).delay(3000).fadeOut(400);
	return false;
}

//실패 alert 표시
function alert_fail(msg) {
	$("#alert-failure").html(msg);
	$("#alert-failure").fadeIn(100).delay(3000).fadeOut(200);
//	$("#alert-failure").fadeIn(300).delay(7000).fadeOut(400);
	return false;
}

//경고 alert 표시
function alert_warning(msg) {
	$("#alert-warning").html(msg);
	$("#alert-warning").fadeIn(100).delay(3000).fadeOut(200);
//	$("#alert-warning").fadeIn(300).delay(5000).fadeOut(400);
	return false;
}

//bootstarp alert modal 
function alert_modal(title, msg){
	$("#dialogAlertTitle").html(title);
	$("#dialogAlertMsg").html(msg);
	$("#dialogAlert").modal('show');
};

//bootstarp confirm modal 
function confirm_modal(title, msg, callobj, callback, txtYes, txtNo){
	$("#dialogConfirmTitle").html(title);
	$("#dialogConfirmMsg").html(msg);
	$("#dialogConfirm").modal('show');
	
	$("#modal-btn-yes > .text").text(isEmpty(txtYes) ? $("#ButtonDesmConfirm").val() : txtYes);
	$("#modal-btn-no > .text").text(isEmpty(txtNo) ? $("#ButtonDesmCancel").val() : txtNo);
  
	$("#modal-btn-yes").off("click").on("click", function(){
	  	callback(callobj, true);
		$("#dialogConfirm").modal('hide');
		return;  
	});
	
	$("#modal-btn-no").off("click").on("click", function(){
		callback(callobj, false);
		$("#dialogConfirm").modal('hide');
		return;
	});
  };

function isEmpty(str) {
	return (typeof str == "undefined" || str == null || str == "");
}

//#region jQuery 기본 형식 지정
/*$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    //monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
	yearSuffix: '년&nbsp;'
});*/


$.datepicker.regional['ko'] = {
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    //monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
	yearSuffix: '년&nbsp;'
}
//#endregion

//#region auto complete 관련
//jQuery UI Autocomplete 선택항목 강조 Patch
function PatchAutocomplete() {
	$.ui.autocomplete.prototype._renderItem = function (ul, item) {
		var sNeedle     = item.label;
		var iTermLength = this.term.length; 
		var tStrPos     = new Array();      //Positions of this.term in string
		var iPointer    = 0;
		var sOutput     = '';

		//Change style here
		var sPrefix     = '<span class="ui-autocomplete-key-highlight">';
		var sSuffix     = '</span>';

		//Find all occurences positions
		tTemp = item.label.toLowerCase().split(this.term.toLowerCase());
		var CharCount = 0;
		tTemp[-1] = '';
		for(i=0;i<tTemp.length;i++){
			CharCount += tTemp[i-1].length;
			tStrPos[i] = CharCount + (i * iTermLength) + tTemp[i].length
		}

		//Apply style
		i=0;
		if(tStrPos.length > 0){
			while(iPointer < sNeedle.length){
				if(i<=tStrPos.length){
					//Needle
					if(iPointer === tStrPos[i]){
						sOutput += sPrefix + sNeedle.substring(iPointer, iPointer + iTermLength) + sSuffix;
						iPointer += iTermLength;
						i++;
					}
					else{
						sOutput += sNeedle.substring(iPointer, tStrPos[i]);
						iPointer = tStrPos[i];
					}
				}
			}
		}

		return $("<li></li>")
			.data("item.autocomplete", item)
			.append("<a>" + sOutput + "</a>")
			.appendTo(ul);
	};
}

//조회형 데이터 autocomplete  - 기본형
//	obj_id : 검색어가 입력되는 input id 
//	keyword2_id : 추가 조건 keyword2가 입력되는  input id 
//	clear_id : 검색시작시 내용을 삭제할 item의 id 
//	url : 자료 조회 url
//	min_length : 검색 실행을 위한 keyword 최소 길이, 
//	use_valid_mark : 검색결과에서 선택 했음 아이콘 표시 여부, 
//	select_callback : 선택 후 처리 function
function makeAutocomplete(obj_id, keyword2_id, clear_id, url, min_length, use_valid_mark, select_callback) {
	if (use_valid_mark) {
		$("#" + obj_id).css({"padding-right": "30px"});
		$("#" + obj_id).after($('<img class="autocomplete-valid" src="/resources/images/mark_check.png"></i>'));
		$("#" + obj_id).parent().find(".autocomplete-valid").hide();
	}

	min_length = Number(min_length);
	if (isNaN(min_length)) min_length = 2;

	$("#" + obj_id).autocomplete({
		source: function (request, response) {
			$.ajax({
				type: "POST",
				url: url,
				dataType: 'json',
				//contentType: "application/json; charset=utf-8",
				data: { "keyword": request.term, "keyword2": (keyword2_id == "" ? "" : $("#" + keyword2_id).val()) },
				delay: 500,
				autoFocus: true,
				success: function (data) {
					var names = data.results;
					response(names);
				}
			});
		},
		minLength: min_length,
		//matchContains: false,
		//position: {  collision: "flip"  },
		classes: { "ui-autocomplete": "highlight" },
		change: function( event, ui ) {
			console.log(event);
		},
		search: function (event, ui) {		
			if (clear_id != ""){
				var clear_id_arr = clear_id.split(",");
				
				for(var i = 0; i < clear_id_arr.length; i++){
					var el_id = clear_id_arr[i];
					$("#" + el_id).val("");
				}
			} 
			
			if (use_valid_mark) $(this).parent().find(".autocomplete-valid").hide();
			console.log(event);
		},
        response: function(event, ui) {
            console.log(ui);
            if (!ui.content.length) {
                var noResult = { value:"",label:"검색결과가 없습니다" };
                ui.content.push(noResult);
            }
        },
        select: function(event, ui) {
			if (ui.item.value != "" && use_valid_mark) $(this).parent().find(".autocomplete-valid").show();
        	select_callback(event, ui);
        	return false;
        },
		focus: function (event, ui) {
			return false;
		}
	}).focus(function(){            
		if ($(this).val() == "" && min_length == 0)
			$(this).data("uiAutocomplete").search($(this).val());
	});
}

function makeAutocompletePo(obj_id, keyword2_id, keyword3_id, supplier_yn, clear_id, url, min_length, use_valid_mark, select_callback) {
	makeAutocompletePoList(obj_id, keyword2_id, keyword3_id, supplier_yn, '', clear_id, url, min_length, use_valid_mark, select_callback)
}

function makeAutocompletePoList(obj_id, keyword2_id, keyword3_id, supplier_yn, mpr_yn, clear_id, url, min_length, use_valid_mark, select_callback) {
	if (use_valid_mark) {
		$("#" + obj_id).css({"padding-right": "30px"});
		$("#" + obj_id).after($('<img class="autocomplete-valid" src="/resources/images/mark_check.png"></i>'));
		$("#" + obj_id).parent().find(".autocomplete-valid").hide();
	}

	min_length = Number(min_length);
	if (isNaN(min_length)) min_length = 2;
	
	
	
	var keyword3 = "";
	
	if(supplier_yn == "Y") {
		keyword3 = keyword3_id == "" ? "" : $("#" + keyword3_id).val();
	}

	$("#" + obj_id).autocomplete({
		source: function (request, response) {
			$.ajax({
				type: "POST",
				url: url,
				dataType: 'json',
				//contentType: "application/json; charset=utf-8",
				data: { "keyword": request.term, "keyword2": (keyword2_id == "" ? "" : $("#" + keyword2_id).val()), "keyword3": keyword3, "supplier_yn" : supplier_yn, "mpr_yn" : mpr_yn },
				delay: 500,
				autoFocus: true,
				success: function (data) {
					var names = data.results;
					response(names);
				}
			});
		},
		minLength: min_length,
		//matchContains: false,
		//position: {  collision: "flip"  },
		classes: { "ui-autocomplete": "highlight" },
		change: function( event, ui ) {
			console.log(event);
		},
		search: function (event, ui) {		
			if (clear_id != ""){
				var clear_id_arr = clear_id.split(",");
				
				for(var i = 0; i < clear_id_arr.length; i++){
					var el_id = clear_id_arr[i];
					$("#" + el_id).val("");
				}
			} 
			
			if (use_valid_mark) $(this).parent().find(".autocomplete-valid").hide();
			console.log(event);
		},
        response: function(event, ui) {
            console.log(ui);
            if (!ui.content.length) {
                var noResult = { value:"",label:"검색결과가 없습니다" };
                ui.content.push(noResult);
            }
        },
        select: function(event, ui) {
			if (ui.item.value != "" && use_valid_mark) $(this).parent().find(".autocomplete-valid").show();
        	select_callback(event, ui);
        	return false;
        },
		focus: function (event, ui) {
			return false;
		}
	}).focus(function(){            
		if ($(this).val() == "" && min_length == 0)
			$(this).data("uiAutocomplete").search($(this).val());
	});
}

//코드성 데이터 autocomplete
//초기 생성시 1회 데이터 전체 조회, 이후 object 포커스 일때 검색 리스트 표시 및 autocomlete
function makeAutocompleteCode(obj_id, url, query_data, select_callback) {
	var ret_code;

	$.ajax({
		type: "POST",
		url: url,
		//contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: { "keyword": encodeURIComponent(request.term) },
		success: function (data) {
			ret_code = data.results;

			$("#" + obj_id).autocomplete({
				source: ret_code,
				minLength: 0,
				matchContains: false,
				classes: { "ui-autocomplete": "highlight" },
				search: function (event, ui) {
					console.log(event);
				},
				select: select_callback,
				focus: function (event, ui) {
					return false;
				}
			}).focus(function(){            
				if ($(this).val() == "")
					$(this).data("uiAutocomplete").search($(this).val());
			});

			return ret_code;
		},
		error: function (e) {
			alert(e.responseText);
		}
	});
}

//특정 keyword 강조
function highlightKeyword(searchString, keyword) {
	// 패턴 구하기
	var re = new RegExp(keyword, "g");

	// 문자열 구하기
	var matchArray;
	var resultString = "";
	var first = 0;
	var last = 0;

	// 각각의 일치하는 부분 검색
	while ( (matchArray = re.exec(searchString)) != null ) {
		last = matchArray.index;

		// 일치하는 모든 문자열을 연결
		resultString += searchString.substring(first, last);

		// 일치하는 부분에 강조 스타일이 지정된 class 추가
		resultString += "<span class='highlight-text'>" + matchArray[0] + "</span>";
		first = re.lastIndex; 
		// RegExp객체의 lastIndex속성을 이용해 검색 결과의 마지막인덱스 접근 가능
	}

	// 문자열 종료
	resultString += searchString.substring(first, searchString.length);

	// 화면에 출력
	return resultString;
}
//#endregion

//#region bootstrap-table 셀의 데이터 포맷 지정
//row정보 상세보기 포맷 : /Demo/Teams 참조
// table 속성으로 지정 : data-detail-formatter="detailFormatter"
function detailFormatter(index, row) {
	var html = [];
	$.each(row, function (key, value) {
		html.push('<p><b>' + key + ':</b> ' + value + '</p>');
	});
	return html.join('');
}

//날짜데이터 형식 지정(yyyy-MM-dd HH:mm:ss")
function dateFormatter(value, row, index) {
	if (value === null || value === "")
		return "";

	try {
		var d = new Date(value);

		return [
			d.format("yyyy-MM-dd")
		].join('');
	} catch(e) {
		return "";
	}
}

//날짜데이터 형식 지정(yyyy-MM-dd HH:mm:ss")
function datetimeFormatter(value, row, index) {
	if (value === null || value === "")
		return "";

	try {
		var d = new Date(value);

		return [
			d.format("yyyy-MM-dd HH:mm:ss")
		].join('');
	} catch(e) {
		return "";
	}
}

//숫자 형식의 값에 3자리 마다 , 삽입
function numberFomatter(value, row, index) {
	if (value === null || value === "")
	return "";

	try {
		return [
			addComma(value.toString())
		].join('');
	} catch(e) {
		return "";
	}
}
//#endregion

//#region Krajee fileinput 관련
//미리보기 파일의 type을 점검한다.
function previewFileExtType(ext) {
	ext = ext.replace(".", "").toLowerCase();

	if (ext.match(/(pdf)$/i))
		return "pdf";	
	else if (ext.match(/(jpg|jpeg|gif|png)$/i))
		return "image";
	//else if (ext.match(/(doc|docx)$/i))
	//	return "office";
	//else if (ext.match(/(xls|xlsx)$/i))
	//	return "office";
	//else if (ext.match(/(ppt|pptx)$/i))
	//	return "office";
	else if (ext.match(/(htm|html)$/i))
		return "html";
	else if (ext.match(/(txt|ini|csv|java|php|js|css)$/i))
		return "text";
	else if (ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i))
		return "video";
	else if (ext.match(/(mp3|wav)$/i))
		return "audio";
	else if (ext.match(/(gdocs)$/i))
		return "gdocs";
	else
		return "other";
}
//#endregion

//#region 공용 Ajax
//로그인 상태 체크
function isLoginStatus() {
	return $.ajax({
				async: false,
				cache: false,
				type: "GET",
				url: "/loginStatus.do",
			}).responseText;
}
//#endregion

//#region 기본 자료형 prototype 추가
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

//string.format 함수
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] !== 'undefined'
			? args[number]
			: match
			;
	});
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function (len) { return this.toString().zf(len); };

/* Boolean ::: String-Object.IsNullOrEmpty () */
String.prototype.IsNullOrEmpty = function () {
    var arg = arguments[0] === undefined ? this.toString() : arguments[0];
    if (arg === undefined || arg === null || arg === "") { return true; }
    else { 
        if (typeof (arg) != "string") { throw "Property or Arguments was not 'String' Types"; }
        return false; 
    }
};

/* Boolean ::: String.IsNullOrEmpty (String arg) */
String.IsNullOrEmpty = function (arg) {
    if (arg === undefined || arg === null) { throw "Property or Arguments was Never Null"; } else {
        if (typeof (arg) != "string") { throw "Property or Arguments was not 'String' Types"; }
        else { return arg.IsNullOrEmpty(); }
    }
};

//* Date format 함수
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
//#endregion