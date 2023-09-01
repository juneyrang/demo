
// 견학신청
function checkYm(y, m){
	var ckdate = {'year':'', 'month':''};
	
	if(y != null && typeof(y) != 'undefined')
		ckdate.year = y;
	
	if(m != null && typeof(m) != 'undefined')
		ckdate.month = m;
	
	return ckdate;
}
function getCtrl(y, m){
	var ckdate = checkYm(y, m);
	$.ajax({
		type: "POST",
		url: "/getCalCtrl",
		dataType: "json",
		data:  {},
		success: function(res){
		    //alert(res.results);
			$('#calCtrl').html(res.results);
			//$('#mCalCtrl').html(res.results);
			//alert("getCtrl  y=="+y+"    m== "+m);
			getCal(y, m);
		},
		error: function(r, s){
			
			/*
			if(s == 'parsererror'){
				alert('data parsing failed');
			}else if(s == 'error'){
				alert('callback failed');
			}
			*/
		}
	});
}
function getCal(y, m){
	var ckdate = checkYm(y, m);
	//alert("getCal   y=="+y+"    m== "+m);
	$.ajax({
		type:'post',
		url: '/getCalendar',
		dataType: "json",
		data:  {},
		success: function(res){
			//alert(res.results);
			$('.calendar').html(res.results);
		},
		error: function(r, s){
			/*
			if(s == 'parsererror'){
				alert('data parsing failed');
			}else if(s == 'error'){
				alert('callback failed');
			}
			*/
		}
	});
}


function setCalDate(dt){
	var days = dt.split("-");

	$.post("/kr/customer/checkReservTime.do", {check_date : dt},
		function(data){
			$("#visit_time").html(data);
		}
	);
	
	$("#reservDate").html("<strong>" + days[0] + "년 " + days[1] + "월 " + days[2] + "일</strong>");
	document.visitForm.visit_date.value = dt;
	$(".calendar").hide();
	$("#calCtrl").hide();
	$("#reserveArea").show();
}
function calShow(){
	$("#reserveArea").hide();	
	$("#calCtrl").show();
	$(".calendar").show(function(){
		location.href="#calCtrl";
	});
}
function doValidSubmit(){
	var flag = false;
	if(_lang=='kr') {
		if($.trim($('#visit_date').val()) == ''){
			alert('정상적인 경로를 통해 견학신청을 진행 해주세요.');
			calShow();
			return false;
		}
		if($.trim($('#visit_time').val()) == ''){
			alert('정상적인 경로를 통해 견학신청을 진행 해주세요.');
			calShow();
			return false;
		}
		if($.trim($('#visit_time').val()) == 'DISABLE'){
			alert('예약이 불가능한 시간대입니다.\n다른 시간대를 선택해주세요.');
			return false;
		}
		if($.trim($('#group_name').val()) == ''){
			alert('단체명을 입력해주세요.');
			$('#group_name').focus();
			return false;
		}
		if($.trim($('#address').val()) == ''){
			alert('단체의 주소를 입력해주세요.');
			$('#address').focus();
			return false;
		}
		if($.trim($('#tel_num1').val()) == ''){
			alert('단체의 연락처를 입력해주세요.');
			$('#tel_num1').focus();
			return false;
		}
		if($.trim($('#tel_num2').val()) == ''){
			alert('단체의 연락처를 입력해주세요.');
			$('#tel_num2').focus();
			return false;
		}
		if($.trim($('#tel_num3').val()) == ''){
			alert('단체의 연락처를 입력해주세요.');
			$('#tel_num3').focus();
			return false;
		}
		if($.trim($('#name').val()) == ''){
			alert('신청자 성명을 입력해주세요.');
			$('#name').focus();
			return false;
		}
		if($.trim($('#phone_num1').val()) == ''){
			alert('신청자 연락처를 입력해주세요.');
			$('#phone_num1').focus();
			return false;
		}
		if($.trim($('#phone_num2').val()) == ''){
			alert('신청자 연락처를 입력해주세요.');
			$('#phone_num2').focus();
			return false;
		}
		if($.trim($('#phone_num3').val()) == ''){
			alert('신청자 연락처를 입력해주세요.');
			$('#phone_num3').focus();
			return false;
		}
		if($.trim($('#email').val()) == ''){
			alert('신청자 이메일을 입력해주세요.');
			$('#email').focus();
			return false;
		}
		if(!checkEmail($.trim($('#email').val()))){
			alert('신청자 이메일을 제대로 입력해주세요.');
			$('#email').focus();
			return false;
		}
		if($.trim($('#domestic').val()) == '' && $.trim($('#foreigner').val()) == ''){
			alert('인원수를 입력해주세요.');
			
			if($.trim($('#domestic').val()) == '')
				$('#domestic').focus();
			else if($.trim($('#foreigner').val()) == '')
				$('#foreigner').focus();
				
			return false;
		}
		else{
			var dome = 0;
			var fore = 0;
			
			if($.trim($('#domestic').val()) != '')
				dome = parseInt($.trim($('#domestic').val()));
			if($.trim($('#foreigner').val()) != '')
				fore = parseInt($.trim($('#foreigner').val()));
			
			var people = dome + fore;
			
			if(people < 10){
				alert('작성한 인원수가 10명 미만입니다.\n다시 입력해주세요.');
				$('#domestic').focus();
				return false;
			}
			else if(people > 80){
				alert('작성한 인원수가 80명을 초과하였습니다.\n다시 입력해주세요.');
				$('#domestic').focus();
				return false;
			}
		}
		if($.trim($('#foreigner').val()) != ''){
			var fore = parseInt($.trim($('#foreigner').val()));
			
			/*
			if(fore > 0){
				if($.trim($('#nationality').val()) == ''){
					alert('외국인 국적을 입력해주세요.');
					$('#nationality').focus();
					return false;
				}
				if($.trim($('#interpret').val()) == ''){
					alert('통역동반여부를 입력해주세요.');
					$('#interpret').focus();
					return false;
				}
			}
			*/
		}
	}
	// 영문
	else{

	}
	flag = true;
	
	// 개인정보 동의
	if(_lang=='kr' && flag && !$('#agreement').attr('checked')) {
		alert('개인정보 수집 및 이용에 동의해 주세요.');
		$('#agreement').focus();
		return false;
	}
	if(_lang=='kr' && flag && !$('#agreement2').attr('checked')) {
		alert('개인정보 국외이전 동의에 동의해주세요.');
		$('#agreement2').focus();
		return false;
	}
	
	if(flag){
		$('#visitForm').submit();
	}
}

function checkEmail(s){
	var r = false;
	var filter = /.+@.+\.[a-zA-Z]{2,4}$/;
	
	if (filter.test(s))
		r = true;
		
	return r;
}

function onlyNum(obj){
	var val = obj.value;
	var filter = /[0-9]+/g;
	
	if($.trim(val) == ''){
		return;
	}
	if(!filter.test(val)){
		alert('숫자만 입력할 수 있습니다.');
		obj.value = "";
		obj.focus();
		return;
	}
}

window.onload = function(){
	getCtrl('2015','05');
	
	// 엔터치니까 자꾸 서브밋 되네 구찮게... 그거 막는 부분
	$('#visitForm input[type="text"]').on('keypress', function(e){
		if(event.keyCode == '13')
			return false;
	});
};