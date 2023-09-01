// 예약 확인
function doValidSubmit(){
	var flag = false;
	if(_lang=='kr') {
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
	}
	// 영문
	else{

	}
	flag = true;
	
	if(flag){
		$('#reserveForm').submit();
	}
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

function formClear(){
	document.reserveForm.reset();
	$('#name').focus();
}

function reserveCancle(r, n, p){
	
	if(!confirm('예약을 취소하시겠습니까?'))
		return false;
	
	$.ajax({
		type:'post',
		url: '/kr/customer/reserveCancle.do',
		data: {'reserve':r},
		dataType: 'html',
		success: function(res){
			var rw = parseInt($.trim(res));
			if(rw > 0)
				alert('예약이 취소 되었습니다.');
			else
				alert('예약취소에 실패하였습니다.');
			
			var arr_p = p.split('-');
			$('body').append(
					'<form id="tempForm" method="post" action="cus_visit_reserve_view.do">' +
					'	<input type="hidden" name="name" value="'+ n +'" />' +
					'	<input type="hidden" name="phone_num1" value="'+ arr_p[0] +'" />' +
					'	<input type="hidden" name="phone_num2" value="'+ arr_p[1] +'" />' +
					'	<input type="hidden" name="phone_num3" value="'+ arr_p[2] +'" />' +
					'</form>'
			);
			
			$('#tempForm').submit();
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

window.onload = function(){
	// 엔터치니까 자꾸 서브밋 되네 구찮게... 그거 막는 부분
	$('#reserveForm input[type="text"]').on('keypress', function(e){
		if(event.keyCode == '13')
			return false;
	});
};