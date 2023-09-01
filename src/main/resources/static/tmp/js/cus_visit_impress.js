// 예약 확인
function doValidSubmit(){
	var flag = false;
	var pattern =/[0-9]{4}-[0-9]{2}-[0-9]{2}/;
	if(_lang=='kr') {
		if(! pattern.test($('#ins_date').val())){
			alert('방문일자를 정확히 입력해주세요.');
			$('#ins_date').focus();
			return false;
		}
		if($.trim($('#name_grp').val()) == ''){
			alert('방문단체명을 입력해주세요.');
			$('#name_grp').focus();
			return false;
		}
		if($.trim($('#name').val()) == ''){
			alert('작성자 성명을 입력해주세요.');
			$('#name').focus();
			return false;
		}
		
		// 문항
		if(!$("input.no1").is(":checked")) {
			alert("1번 문항을 선택해주세요.");
			$('input.no1').focus();
			return false;
		}
		if(!$("input.no2").is(":checked")) {
			alert("2번 문항을 선택해주세요.");
			$('input.no2').focus();
			return false;
		}
		if(!$("input.no3").is(":checked")) {
			alert("3번 문항을 선택해주세요.");
			$('input.no3').focus();
			return false;
		}
		if(!$("input.no4").is(":checked")) {
			alert("4번 문항을 선택해주세요.");
			$('input.no4').focus();
			return false;
		}
		if(!$("input.no5").is(":checked")) {
			alert("5번 문항을 선택해주세요.");
			$('input.no5').focus();
			return false;
		}
		if(!$("input.no6").is(":checked")) {
			alert("6번 문항을 선택해주세요.");
			$('input.no6').focus();
			return false;
		}
		if(!$("input.no7").is(":checked")) {
			alert("7번 문항을 선택해주세요.");
			$('input.no7').focus();
			return false;
		}
		if(!$("input.no8").is(":checked")) {
			alert("8번 문항을 선택해주세요.");
			$('input.no8').focus();
			return false;
		}
		if(!$("input.no9").is(":checked")) {
			alert("9번 문항을 선택해주세요.");
			$('input.no9').focus();
			return false;
		}
		if(!$("input.no10").is(":checked")) {
			alert("10번 문항을 선택해주세요.");
			$('input.no10').focus();
			return false;
		}
	}
	// 영문
	else{

	}
	flag = true;
	
	if(flag){
		$('#impressForm').submit();
	}
}

function inputVal(obj){
	var cls = obj.getAttribute("class");
	var val = obj.value;
	
	$('#'+cls).val(val);
	
	$('.'+cls).attr('checked', false);
	obj.checked = true;
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

function checkDate(obj){
	var val = obj.value;
	var filter = /[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}/;
	
	if($.trim(val) == ''){
		return;
	}
	if(!filter.test(val)){
		alert('방문일자 형식은 xxxx-xx-xx로 입력해주세요.');
		obj.value = "";
		obj.focus();
		return;
	}
}

function formClear(){
	document.impressForm.reset();
	$('#ins_date').focus();
}

window.onload = function(){
	// 엔터치니까 자꾸 서브밋 되네 구찮게... 그거 막는 부분
	$('#impressForm input[type="text"]').on('keypress', function(e){
		if(event.keyCode == '13')
			return false;
	});
};