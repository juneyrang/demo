

$(document).ready(function () {	
	
	
});


function cardBodyShow(id) {

		var el = $("input[name=div-card-body]").length;
		var elArr = new Array(el);
		
		for(var i=0; i<elArr; i++){                          
			$("input[name=card]").eq(i)
		}
	
	$('.list li').each(function (index, item) {
	    // 인덱스는 말 그대로 인덱스
	    // item 은 해당 선택자인 객체를 나타냅니다.
	    $(item).addClass('li_0' + index);
	
	    // item 과 this는 같아서 일반적으로 this를 많이 사용합니다.
	    // $(this).addClass('li_0' + index);
	});
	
	
	var dId = "#" + id;
	if ($(dId).hasClass('dp_n'))
		$(dId).removeClass('dp_n');
	else {
		$(dId).addClass('dp_n');
	}	
	
	
}



