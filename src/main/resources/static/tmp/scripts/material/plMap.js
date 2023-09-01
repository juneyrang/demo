var menuAuthList;
var gridLang = {};
var canvas = null;
var ctx = null;
var areaList = [];
var MapMode = "VIEW";
var selPath = null;
var selPathId = "";
var selPathOver = null;
var rectAreaArr = [];
var lineAreaArr = [];

$(window).resize(function() {

});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	initControls();
});


function initControls() {

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	var sX,sY,cX,cY;

	var canvasX = $(canvas).offset().left;
	var canvasY = $(canvas).offset().top;
	var draw = false;

	var scrollY = 0;
	var scrollX = 0;

	window.addEventListener('scroll', function() {

	    scrollY = this.scrollY;
	    scrollX = this.scrollX;
	 });

	$("canvas").mousedown(function(e){
		  canvasX = $(canvas).offset().left;
		  canvasY = $(canvas).offset().top;

	  	if(MapMode == "RECT") {
		    sX=parseInt(e.clientX-canvasX+scrollX);
		    sY=parseInt(e.clientY-canvasY+scrollY);
		    draw = true;
	  	}
	});

	$("canvas").mousemove(function(e){
		  canvasX = $(canvas).offset().left;
		  canvasY = $(canvas).offset().top;

	  	if(MapMode == "RECT") {
		    if(draw){
			  ctx.lineWidth = 2;
			  ctx.strokeStyle = "yellow";
		      cX=parseInt(e.clientX-canvasX+scrollX);
		      cY=parseInt(e.clientY-canvasY+scrollY);
		      ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
		      ctx.strokeRect(sX,sY,cX-sX,cY-sY);
		    }
	  	}
	  	else if(MapMode == "VIEW") {
		  var x=parseInt(e.clientX-canvasX+scrollX);
		  var y=parseInt(e.clientY-canvasY+scrollY);

			if(selPathOver != null) {
				selPathOver = null;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				setMapArea();
			}
			isPositionOver(x, y);
	  	}
	});

	$("canvas").mouseup(function(e){
	  	if(MapMode == "RECT") {
	  		rectAreaArr = [];
	  		var w = cX-sX;
	  		var h = cY-sY;
	    	var rectAreaArrRow = {"X" : sX, "Y" : sY, "W" : w, "H" : h};
	    	rectAreaArr.push(rectAreaArrRow);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			setMapArea();
		    draw = false;
	  	}

	});

	$("canvas").click(function(e){
		  canvasX = $(canvas).offset().left;
		  canvasY = $(canvas).offset().top;

		  var x = parseInt(e.clientX-canvasX+scrollX);
		  var y = parseInt(e.clientY-canvasY+scrollY);


		if(MapMode == "VIEW"){
			if(selPath != null) {
				selPath = null;
				selPathId = "";
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				setMapArea();
			}
			isPosition(x, y);
		}
		else if(MapMode == "LINE"){
	    	var lineAreaArrRow = {"X" : x, "Y" : y};
	    	lineAreaArr.push(lineAreaArrRow);
	    	setMapArea();
		}


	});



	$('#btnSearch').click(function () { btnSearchClick(); return false; });
	$('#btnMapCreation').click(function () { btnMapCreationClick(); return false; });
	$('#selMapName').change(function () { selMapNameChange(); return false; });
	$('#btnMapAreaAdd').click(function () { btnMapAreaAddClick(); return false; });
	$('#btnMapLineAdd').click(function () { btnMapLineAddClick(); return false; });
	$('#btnMapCancle').click(function () { btnMapCancleClick(); return false; });
	$('#btnMapSave').click(function () { btnMapSaveClick(); return false; });
	$('#btnMapReset').click(function () { btnMapResetClick(); return false; });
	$('#btnMapDelete').click(function () { btnMapDeleteClick(); return false; });
	$('#btnMapDetailInfo').click(function () { btnMapInfoClick('Detail'); return false; });
	$('#btnMapPackageInfo').click(function () { btnMapInfoClick('Package'); return false; });





	initCode();
}

function initCode() {
	initTable();
}

function initTable(){

	initMenuAuth(function (list) {
		menuAuthList = list;

		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	});

	initDefailProject(function (list) {

		if(list.length > 0) {
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);


			initCombo();
			initProjectPackageInfo();
		}
	});

	setViewMode();
}

function isPositionOver(x, y) {
	var path = getPath(x, y);

	if(selPath != null){
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 3;
		ctx.stroke(selPath);
	}

	if(path == null) {
	  	$("canvas").css("cursor", "");
	  	selPathOver = null;
	}
	else {
  		selPathOver = path;

  		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "#0099FF";
		ctx.fill(path);

		$("canvas").css("cursor", "pointer");
	}



}

function isPosition(x, y) {
	var path = getPath(x, y);

	if(path == null) {
	  	selPath = null;
	  	selPathId = "";
	}
	else {
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 3;
		selPath = path;
		ctx.stroke(path);

		selPathId = getPathId(x, y);
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

function initCombo() {
	$("#canvas").css("background-image", "");
	var paramData = {"PROJECT_NO" : $('#txtProjectCode').val()};

	$.ajax({
		url: "/getDesmMapCreationList.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {

			var results = data.results;
			$("#selMapName option").remove();
			$.each(results, function (index, entry) {
				$("#selMapName").append("<option value='" + entry["MAP_MST_ID"] + "'>" + entry["MAP_NAME"] + "</option>");
			});

			$('#btnSearch').click();
	    }
	});
}

function initProjectPackageInfo() {
	var paramData = {"PROJECT_NO" : $('#txtProjectCode').val()};
	
	$.ajax({
		url: "/getDesmProjectPackageInfo.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			//console.log(data);
			var result = data.result;
			$("#spanPjtTotal").append(`[PJT Total] Package : ${result.PKG_COUNT} PKG / CBM : ${result.SUM_CBM} ㎥ / NET : ${result.SUM_NET} ton / GROSS : ${result.SUM_GROSS} ton / SQM : ${result.SUM_SQM} ㎡`);
			//Totel Pkg(EA) :  Total NET : Total Gross : Total SQM
			
	    }
	});
}

function btnMapLineAddClick(){
	if($('#selMapName').val() == ""){
		alert_modal("", $('#alertMapModeSelectErr').val());
		return;
	}

	setLineMode();
}

function btnMapAreaAddClick(){
	if($('#selMapName').val() == ""){
		alert_modal("", $('#alertMapModeSelectErr').val());
		return;
	}

	setRectMode();
}

function setLineMode(){
	MapMode = "LINE";
	selPath = null;
	selPathId = "";
	selPathOver = null;
	rectAreaArr = [];
	lineAreaArr = [];

	$('#btnMapCreation').hide();
	$('#btnMapAreaAdd').hide();
	$('#btnMapSave').show();
	$('#btnMapCancle').show();
	$('#btnMapReset').show();
	$('#btnMapLineAdd').hide();
	$('#btnMapDelete').hide();
	$('#btnMapInfo').hide();




	getMapData();
}

function setRectMode(){
	MapMode = "RECT";
	selPath = null;
	selPathId = "";
	selPathOver = null;
	rectAreaArr = [];
	lineAreaArr = [];

	$('#btnMapCreation').hide();
	$('#btnMapAreaAdd').hide();
	$('#btnMapSave').show();
	$('#btnMapCancle').show();
	$('#btnMapReset').show();
	$('#btnMapLineAdd').hide();
	$('#btnMapDelete').hide();
	$('#btnMapInfo').hide();


	getMapData();
}

function selMapNameChange() {
	$('#btnSearch').click();
}

function btnMapCancleClick() {
	$('#btnSearch').click();
}

function btnMapCreationClick() {

	var param = {"menuAuthList" : menuAuthList, "PROJECT_NO" : $('#txtProjectCode').val()};

	$('#dlgMapPopUp').load("/desmMapCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMapCreationPopUp(param, function (key, returnParam) {

				if(key == "save-item"){


					initCombo();
				}
			});

		}
	});
}

function btnSearchClick() {
	setViewMode();
}

function setViewMode() {
	MapMode = "VIEW";
	selPath = null;
	selPathId = "";
	selPathOver = null;
	rectAreaArr = [];
	lineAreaArr = [];


	$('#btnMapCreation').show();
	$('#btnMapAreaAdd').show();
	$('#btnMapSave').hide();
	$('#btnMapCancle').hide();
	$('#btnMapReset').hide();
	$('#btnMapLineAdd').show();
	$('#btnMapDelete').show();
	$('#btnMapInfo').show();


	getMapData();
}

function getMapData() {

	var paramData = {"PROJECT_NO" : $('#txtProjectCode').val(), "MAP_MST_ID" : $("#selMapName").val() };

	$.ajax({
		url: "/getDesmMapInfoList.do",
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

	ctx.lineWidth = 2;
	ctx.strokeStyle = "blue";

	if(MapMode == "VIEW") {
		ctx.globalAlpha = 0;
	}
	else if(MapMode == "RECT" || MapMode == "LINE"){
		ctx.globalAlpha = 1;
	}

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


	if(rectAreaArr.length > 0) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = "yellow";
		ctx.globalAlpha = 1;
		var rectArea = null;

		for(var i = 0; i < rectAreaArr.length; i++) {

		  	var rectAreaArrRow = rectAreaArr[i];

			rectArea = new Path2D();
			rectArea.rect(rectAreaArrRow.X, rectAreaArrRow.Y, rectAreaArrRow.W, rectAreaArrRow.H);

		  	if(i == rectAreaArr.length - 1) {
		  		ctx.stroke(rectArea);
		  	}
		}
	}

	if(lineAreaArr.length > 0) {
		ctx.lineWidth = 2;
		ctx.strokeStyle = "yellow";
		ctx.globalAlpha = 1;
		var lineArea = new Path2D();

		for(var i = 0; i < lineAreaArr.length; i++) {
		  	var lineAreaArrRow = lineAreaArr[i];

		  	if(i == 0) {
		  		lineArea.moveTo(lineAreaArrRow.X, lineAreaArrRow.Y);
		  	}
		  	else {
		  		lineArea.lineTo(lineAreaArrRow.X, lineAreaArrRow.Y);
		  	}

		  	if(i == lineAreaArr.length - 1) {
		  		ctx.stroke(lineArea);
		  	}
		}
	}





	ctx.closePath();
}


function btnMapSaveClick(){
	var paramList;

	if(MapMode == "RECT") {
		if(rectAreaArr.length < 1) {
			alert_modal("", $('#alertMapAreaAddErr').val());
			return;
		}

		paramList = rectAreaArr;
	}
	else if(MapMode == "LINE") {
		if(lineAreaArr.length < 3) {
			alert_modal("", $('#alertMapAreaAddErr').val());
			return;
		}

		paramList = lineAreaArr;
	}

	var param = {"list" : paramList, "MAP_TYPE" : MapMode, "MAP_MST_ID" : $('#selMapName').val()};

	$('#dlgMapPopUp').load("/desmMapAreaCreationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMapAreaCreationPopUp(param, function (key, returnParam) {

				if(key == "save-item"){
					if(MapMode == "RECT") {
						setRectMode();
					}
					else if(MapMode == "LINE") {
						setLineMode();
					}

				}
			});

		}
	});
}

function btnMapResetClick() {
	if(MapMode == "RECT") {
		setRectMode();
	}
	else if(MapMode == "LINE") {
		setLineMode();
	}
}

function btnMapDeleteClick() {
	if(selPathId == "") {
		alert_modal("", $('#alertMapAreaAddErr').val());
		return;
	}

	confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
		if(result) {

			var deleteList = [];

			var deleteRow = {"MAP_DTL_ID" : selPathId};

		    deleteList.push(deleteRow);

			var list = JSON.stringify(deleteList);

			$.ajax({
				url: "/deleteDesmMapAreaCreation.do",
				data: {"deleteList" : list},
				success: function (data, textStatus, jqXHR) {
					if (data.error != null) {
						alert_fail(result.error);
					}
					else {
						$('#btnSearch').click();
					}
		        }
		    });
		}
	});

}

function btnMapInfoClick(type) {
	if(selPathId == "") {
		alert_modal("", $('#alertMapAreaAddErr').val());
		return;
	}

	var param = {"MAP_DTL_ID" : selPathId, "type" : type};

	$('#dlgMapPopUp').load("/desmMapLocationPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){

			initDesmMapLocationPopUp(param, function (key, returnParam) {
				if(key == "save-item"){

				}
			});

		}
	});
}

