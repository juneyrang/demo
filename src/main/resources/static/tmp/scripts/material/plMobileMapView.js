var canvas = null;
var ctx = null;
var areaList = [];
var selPath = null;
var selPathId = "";

(function($) {
        $.ajaxSetup({
        	async: true,
        	type: "POST",
        	dataType: "json",
			beforeSend: function(xhr) {
				$('.wrap-loading').removeClass('dp_n');	
			   	xhr.setRequestHeader("AJAX", "true");
			   	xhr.setRequestHeader("idcs_service_url", $("#idcs_service_url").val());
			}, 
	        error: function (xhr, status, e) {
	        	alert(xhr.responseText);
			},
			complete: function (e) {
				$('.wrap-loading').addClass('dp_n'); //로딩중 화면 제거
				$('#wrap-loading').addClass('dp_n'); //로딩중 화면 제거
			}
			               
        });
})(jQuery);

$(window).resize(function() {
	
});

$(document).ready(function () {	

	initControls();
});


function initControls() {
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');			
	initCode();
}

function initCode() {
	initTable();
}

function initTable(){
	
	setViewMode();	
}

function setViewMode() {	
	getMapData();
}

function getMapData() {
	
	var paramData = {"CODE_TYPE" : $("#codeType").val(), "PROJECT_NO" : $("#projectNo").val(),  
	                 "MATERIAL_CODE" : $("#materialCode").val() ,"PACKAGE_NO" : $("#packageNo").val()};	
			
	$.ajax({
		url: "/mobile/getMobileMapViewInfoList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {			
			
			var mstList = data.results.mstInfo;			
			
			if(mstList.length < 1) {
				$("#canvas").css("background-image", "");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			else {
				var img_path = "url('" + mstList[0]["MAP_PATH"] + "')";
				$("#canvas").css("background-image", img_path);
			}
			
			areaList = data.results.dtlInfo;	
			
			setMapArea();
	    }
	});	
}

function setMapArea() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.lineWidth = 3;
	ctx.strokeStyle = "red";
	ctx.globalAlpha = 1;	
	
	ctx.beginPath();
	
	for(var i = 0; i < areaList.length; i++) {
  		var areaRow = areaList[i];
  		
	  	if(areaRow.MAP_TYPE == "RECT") {
	  		var ps = areaRow.MAP_POSITION;
	  		var psArr = ps.split(",");
	  		ctx.rect(psArr[0], psArr[1], psArr[2], psArr[3]);
	  	}
	  	else if(areaRow.MAP_TYPE == "LINE") {
	  		var ps = areaRow.MAP_POSITION;
	  		var psArr = ps.split(";");
	  		
	  		for(var j = 0; j < psArr.length; j++){
	  			var ps1 = psArr[j];
	  			var psArr1 = ps1.split(",");
	  			
	  			if(j == 0) {
	  				ctx.moveTo(psArr1[0], psArr1[1]);
	  			}	
			  	else {
			  		ctx.lineTo(psArr1[0], psArr1[1]);
			  	}	  			
	  		}
	  	}	  	
	}
	ctx.stroke();	
	
	ctx.closePath();
}

