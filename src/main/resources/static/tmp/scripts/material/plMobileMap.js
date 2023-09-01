var canvas = null;
var ctx = null;
var areaList = [];
var selPath = null;
var selPathId = "";
var mstMapName="";
var dtlMapName="";

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

var timeoutId;
function clickProcess(e) {
		var canvasX = $(canvas).offset().left;
		var canvasY = $(canvas).offset().top;

		
		if(e.touches.length == 1) {
			var x = parseInt(e.touches[0].clientX-canvasX);
			var y = parseInt(e.touches[0].clientY-canvasY);		
			if(selPath != null) {
				selPath = null;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				setMapArea();				
			}		  
			isPosition(x, y);		
		}  
}


function initControls() {
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');	
	
	var sX,sY,cX,cY;
	

	var draw = false;
	
		
	var scrollY = 0;
	var scrollX = 0;
	
	window.addEventListener('scroll', function() {
		 
	    scrollY = this.scrollY;
	    scrollX = this.scrollX;	
	 });
	 
	
	canvas.addEventListener("click",function(e){
	  	
	  	/*  		    
	  	if(getBrowserInfos()["User-agent"].indexOf("Safari") > 0) {
	  		
	  	}
	  	*/
	  	  		    
		var canvasX = $(canvas).offset().left;
		var canvasY = $(canvas).offset().top;		  	  		    
		    
		var x = parseInt(e.clientX-canvasX + scrollX);
		var y = parseInt(e.clientY-canvasY + scrollY);    			  
		
		/*
		console.log("canvasX", canvasX);
		console.log("canvasY", canvasY);
		console.log("scrollX", scrollX);
		console.log("scrollY", scrollY);
		console.log("x", x);
		console.log("y", y);
		*/
		
		if(selPath != null) {
			selPath = null;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			setMapArea();				
		}		  
		isPosition(x, y);		
	    		  
	});
		
		
	initCode();
}

function initCode() {
	initTable();
}

function initTable(){
	
	setViewMode();	
}

function isPosition(x, y) {
	var path = getPath(x, y);
	  
	if(path == null) {
	  	selPath = null;
	  	dtlMapName= "";
	}
	else {
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 3;				  
		selPath = path;
		ctx.stroke(path);
		
		selPathId = getPathId(x, y);
		
		var mapArea = mstMapName + " - " + dtlMapName;
		window.ReactNativeWebView.postMessage(JSON.stringify({type: 'map_select', key: selPathId, mapName: mapArea}));
	}
}

function getPathId(x, y) {
	var path;
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = "blue";
	ctx.globalAlpha = 0;
	
	for(var i = 0; i < areaList.length; i++) {
  		var areaRow = areaList[i];
  		path = new Path2D();
  		
	  	if(areaRow.MAP_TYPE == "RECT") {
	  		var ps = areaRow.MAP_POSITION;
	  		var psArr = ps.split(",");
	  		path.rect(psArr[0], psArr[1], psArr[2], psArr[3]);
	  	}
	  	else if(areaRow.MAP_TYPE == "LINE") {
	  		var ps = areaRow.MAP_POSITION;
	  		var psArr = ps.split(";");
	  		
	  		for(var j = 0; j < psArr.length; j++){
	  			var ps1 = psArr[j];
	  			var psArr1 = ps1.split(",");
	  			
	  			if(j == 0) {
	  				path.moveTo(psArr1[0], psArr1[1]);
	  			}	
			  	else {
			  		path.lineTo(psArr1[0], psArr1[1]);
			  	}	  			
	  		}
	  	}	
		
		ctx.stroke(path);  
			
		if(ctx.isPointInPath(path, x, y)) {	
			dtlMapName=areaRow.MAP_NAME;	
			return areaRow.MAP_DTL_ID;
		}		  	  	
	}
	
	return "";
}

function getPath(x, y) {
	var path;
	
	ctx.lineWidth = 2;
	ctx.strokeStyle = "blue";
	ctx.globalAlpha = 0;
	
	for(var i = 0; i < areaList.length; i++) {
  		var areaRow = areaList[i];
  		path = new Path2D();
  		
	  	if(areaRow.MAP_TYPE == "RECT") {
	  		var ps = areaRow.MAP_POSITION;
	  		var psArr = ps.split(",");
	  		path.rect(psArr[0], psArr[1], psArr[2], psArr[3]);
	  	}
	  	else if(areaRow.MAP_TYPE == "LINE") {
	  		var ps = areaRow.MAP_POSITION;
	  		var psArr = ps.split(";");
	  		
	  		for(var j = 0; j < psArr.length; j++){
	  			var ps1 = psArr[j];
	  			var psArr1 = ps1.split(",");
	  			
	  			if(j == 0) {
	  				path.moveTo(psArr1[0], psArr1[1]);
	  			}	
			  	else {
			  		path.lineTo(psArr1[0], psArr1[1]);
			  	}	  			
	  		}
	  	}	
		
		ctx.stroke(path);  
			
		if(ctx.isPointInPath(path, x, y)) {	
			return path;
		}		  	  	
	}
	
	return null;
}

function setViewMode() {	
	selPath = null;
	selPathId = "";	
	
	getMapData();
}

function getMapData() {

	var paramData = {"MAP_MST_ID" : $("#mapMstId").val() };	
				
	$.ajax({
		url: "/mobile/getDesmMapInfoList.do",		
		data: paramData,
		success: function (data, textStatus, jqXHR) {			
			
			var mstList = data.results.mstInfo;			
			
			if(mstList.length < 1) {
				$("#canvas").css("background-image", "");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				mstMapName="";
				dtlMapName="";
			}
			else {
				var img_path = "url('" + mstList[0]["MAP_PATH"] + "')";
				$("#canvas").css("background-image", img_path);
				mstMapName=mstList[0]["MAP_NAME"];
				dtlMapName="";				
			}
			
			areaList = data.results.dtlInfo;	
			
			setMapArea();
	    }
	});	
}

function setMapArea() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.lineWidth = 2;
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "#0099FF";	
	
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
	ctx.fill();	
	
	ctx.closePath();	
}

