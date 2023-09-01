var locationSearchCanvas = null;
var locationSearchCtx = null;
var locationSearchAreaList = [];

var v_desm_location_search_callback = null;
var v_desm_location_search_param;

function initDesmLocationSearchPopUp(param , callback) {
	
	v_desm_location_search_callback = callback;
    v_desm_location_search_param = param; 
    
	$('#dlgDesmLocationSearch').on('shown.bs.modal', function () {
		$('#dlgDesmLocationSearch').click();
	});
	
	$('#dlgDesmLocationSearch').on('hidden.bs.modal', function () {
	  	closeDesmLocationSearchPopUp();
	});
		
	$('#dlgDesmLocationSearch').modal('show');    
	
    
    initDesmLocationSearchPopUpCode();    
}

function initDesmLocationSearchPopUpCode() {	
	
	initDesmLocationSearchPopUpControls();
}


function initDesmLocationSearchPopUpControls() {
	
	locationSearchCanvas = document.getElementById("canvasDlgDesmLocationSearch");
	locationSearchCtx = locationSearchCanvas.getContext('2d');	
	
	var sX,sY,cX,cY;
	
	var canvasX = $(locationSearchCanvas).offset().left;
	var canvasY = $(locationSearchCanvas).offset().top;
	
	dlgDesmLocationSearchData();
}

function dlgDesmLocationSearchData() {
				
	$.ajax({
		url: "/getDesmMapSearchInfoList.do",		
		data: v_desm_location_search_param,
		success: function (data, textStatus, jqXHR) {			
			
			var mstList = data.results.mstInfo;			
			
			if(mstList.length < 1) {
				$("#canvasDlgDesmLocationSearch").css("background-image", "");
				locationSearchCtx.clearRect(0, 0, locationSearchCanvas.width, locationSearchCanvas.height);
			}
			else {
				var img_path = "url('" + mstList[0]["MAP_PATH"] + "')";
				$("#canvasDlgDesmLocationSearch").css("background-image", img_path);
			}
			
			locationSearchAreaList = data.results.dtlInfo;	
			
			setLocationSearchMapArea();
	    }
	});	
}

function setLocationSearchMapArea() {
	locationSearchCtx.clearRect(0, 0, locationSearchCanvas.width, locationSearchCanvas.height);
	
	locationSearchCtx.lineWidth = 3;
	locationSearchCtx.strokeStyle = "red";	
	locationSearchCtx.globalAlpha = 1;
	
	locationSearchCtx.beginPath();
	
	for(var i = 0; i < locationSearchAreaList.length; i++) {
  		var locationSearchAreaRow = locationSearchAreaList[i];
  		
	  	if(locationSearchAreaRow.MAP_TYPE == "RECT") {
	  		var ps = locationSearchAreaRow.MAP_POSITION;
	  		var psArr = ps.split(",");
	  		locationSearchCtx.rect(psArr[0], psArr[1], psArr[2], psArr[3]);
	  	}
	  	else if(locationSearchAreaRow.MAP_TYPE == "LINE") {
	  		var ps = locationSearchAreaRow.MAP_POSITION;
	  		var psArr = ps.split(";");
	  		
	  		for(var j = 0; j < psArr.length; j++){
	  			var ps1 = psArr[j];
	  			var psArr1 = ps1.split(",");
	  			
	  			if(j == 0) {
	  				locationSearchCtx.moveTo(psArr1[0], psArr1[1]);
	  			}	
			  	else {
			  		locationSearchCtx.lineTo(psArr1[0], psArr1[1]);
			  	}	  			
	  		}
	  	}	  	
	}
	locationSearchCtx.stroke();
	
	locationSearchCtx.closePath();	
}



function closeDesmLocationSearchPopUp() {
	
}

