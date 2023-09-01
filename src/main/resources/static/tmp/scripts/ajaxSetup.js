(function($) {
        $.ajaxSetup({
        	async: true,
        	type: "POST",
        	dataType: "json",
			beforeSend: function(xhr) {
				parent.LodingShow(xhr);
			},
	        error: function (xhr, status, e) {
	        	if (xhr.status == 503) {
	        		parent.logoutUser();
	        	}
	        	else {
	        		parent.alert_fail(xhr.responseText);
	        	}
			},
			complete: function (e) {
				parent.LodingHide();
			}

        });
})(jQuery);

function getMenuId() {
	return parent.getMenuId();
}

function alert_fail(msg) {
	parent.alert_fail(msg);
}

function alert_success(msg) {
	parent.alert_success(msg);
}

function alert_modal(title, msg){
	parent.alert_modal(title, msg);
}

function confirm_modal(title, msg, callobj, callback, txtYes, txtNo){
	parent.confirm_modal(title, msg, callobj, callback, txtYes, txtNo);
}

function setCombo(data, id, type){
	var elId = "#" + id;
	$(elId).html("");

	var html = '';

	if(type == "all"){
		html = '<option value="">' + $('#selectNullTextAll').val() + '</option>';
	}
	else if(type == "sel"){
		html = '<option value="">' + $('#selectNullTextSel').val() + '</option>';
	}
	else if(type == "selEn"){
		html = '<option value="">-Select-</option>';
	}
	else if(type == "na"){
		html = '<option value=""></option>';
	}


	for(var i = 0; i < data.length; i++){
		var item = data[i];
		html += '<option value="' + item.CODE + '">' + item.NAME + '</option>';
	}

	$(elId).append(html);

	return true;
}
function setComboTitle(data, id, type){
	var elId = "#" + id;
	$(elId).html("");

	var html = '';

	if(type == "all"){
		html = '<option value="">' + $('#selectNullTextAll').val() + '</option>';
	}
	else if(type == "sel"){
		html = '<option value="">' + $('#selectNullTextSel').val() + '</option>';
	}
	else if(type == "selEn"){
		html = '<option value="">-Select-</option>';
	}
	else if(type == "na"){
		html = '<option value=""></option>';
	}
	else if(type == "exist") {
		html = '<option value="ALL EXISTS" title="ALL EXISTS">ALL EXISTS</option> <option value="ALL NOT EXISTS" title="ALL NOT EXISTS">ALL NOT EXISTS</option>';
	}


	for(var i = 0; i < data.length; i++){
		var item = data[i];
		html += '<option value="' + item.CODE + '" title="'+ item.NAME +'">' + item.NAME + '</option>';
	}

	$(elId).append(html);
	return true;
}
function setGridCombo(data, type){
	var code = "";
	var label = "";

	if(type == "all"){

		code = "|";
		label = "|" + $('#selectNullTextAll').val();
	}
	else if(type == "sel"){

		code = "|";
		label = "|" + $('#selectNullTextSel').val();
	}
	else if(type == "na"){
		code = "|";
		label = "|";
	}

	for(var i = 0; i < data.length; i++){
		var item = data[i];
		code += "|" + item.CODE;
		label += "|" + item.NAME;
	}

	var target = {"code" : code, "label" : label};

	return target;
}

function getGridCode(){
	var gridCode = parent.getGridCode();
	return gridCode;

}

function checkFile(txt){
	if(txt.indexOf(".ASP") != "-1"){
		return true
	}
	if(txt.indexOf(".ASPX") != "-1"){
		return true
	}
	if(txt.indexOf(".JSP") != "-1"){
		return true
	}
	if(txt.indexOf(".PHP") != "-1"){
		return true
	}
	if(txt.indexOf(".INC") != "-1"){
		return true
	}
	if(txt.indexOf(".CGI") != "-1"){
		return true
	}
	if(txt.indexOf(".HTML") != "-1"){
		return true
	}
	if(txt.indexOf(".HTM") != "-1"){
		return true
	}
	if(txt.indexOf(".JS") != "-1"){
		return true
	}
	if(txt.indexOf(".JAR") != "-1"){
		return true
	}
	if(txt.indexOf(".JHTML") != "-1"){
		return true
	}
	if(txt.indexOf(".PHP3") != "-1"){
		return true
	}
	if(txt.indexOf(".PHTML") != "-1"){
		return true
	}

	return false;
}


function initMenuAuth(callback) {

	var menuId = getMenuId();

	$.ajax({
		url: "/getMenuAuthCheckList.do",
		data: {"MENU_SEQ" : menuId},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(callback)
			{
				callback(list);
			}
        }
    });
}

/*function copyToClipboard(txt) {
  var copyText = txt.trim();
  var textArea = document.createElement("textarea");

  textArea.value = copyText;
  document.body.appendChild(textArea);

  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
}

function gridToClipboard(txt) {
	var copyText = txt.replace('\r\n', '').trim();
	const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    textArea.style.display = 'hidden';
    document.body.appendChild(textArea);

    var selection = document.getSelection();
    var range = document.createRange();

    range.selectNode(textArea);
    selection.removeAllRanges();
    selection.addRange(range);

	document.execCommand("Copy");
	document.body.removeChild(textArea);
}*/

function copyToClipboard(txt) {
	var copyText = txt.replace('\r\n', '').trim();
	const textArea = document.createElement('textarea');
    textArea.textContent = copyText;
    textArea.style.display = 'hidden';
    document.body.appendChild(textArea);

    var selection = document.getSelection();
    var range = document.createRange();

    range.selectNode(textArea);
    selection.removeAllRanges();
    selection.addRange(range);

	document.execCommand("Copy");
	document.body.removeChild(textArea);
}

function initDefailProject(callback) {

	$.ajax({
		url: "/getInitDefailProject.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(callback)
			{
				callback(list);
			}
        }
    });
}

function checkRequiredField(areaID) {
	var chkValidation = true;

	$("#" + areaID + " input:visible, #" + areaID + " select:visible, #" + areaID + " textarea:visible").each(function () {
		if ($(this).hasClass("required") && $(this).attr("type") == "file") {
			if (getAttachedFilesCount(($(this).attr("id"))) == 0) {
				$(".file-input").addClass("validation-error");
				chkValidation = false;
			} else {
				$(".file-input").removeClass("validation-error");
				$(this).removeClass("validation-error");
			}
		}
		else if ($(this).hasClass("required") && ($(this).val() == null || $(this).val().IsNullOrEmpty())) {
			$(this).addClass("validation-error");
			chkValidation = false;
		} else {
			$(this).removeClass("validation-error");
		}
	});

	return chkValidation;
}

function objNullCheck(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null){
			obj[key] = "";
		}
	}

	return obj;
}

function objScriptCheck(obj) {

	for (var key in obj) {
		var value = obj[key];

		if(value == null){
			obj[key] = "";
		}
		else {
			value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
	        value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
	        value = value.replaceAll("'", "&#39;");
	        value = value.replaceAll("eval\\((.*)\\)", "");
	        value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
	        value = value.replaceAll("script", "");

			obj[key] = value;
		}
	}

	return obj;
}

function strScriptCheck(str) {
	var value = str;
	value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
    value = value.replaceAll("'", "&#39;");
    value = value.replaceAll("eval\\((.*)\\)", "");
    value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
    value = value.replaceAll("script", "");


	return value;
}

function initTypeCode(callback,id) {
	var paramList = JSON.stringify([{"CODE" : "M004"}]);
	if(id == null)id = "selType";
	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			gridTypeCode = setGridCombo(data.results.M004, "");
			var code = gridTypeCode.code.split("|");
			var label = gridTypeCode.label.split("|");
			var html = "<option value=''>All</option>";
			for(var i = 1 ; i < code.length ; i ++){
				html += "<option value='"+code[i]+"'>"+label[i]+"</option>";
			}
			$("#"+id).html(html);

			if(callback != null){
				callback();
			}
        }
    });

}

/*
 * 빼서 쓰고 싶은데, 캐시 때문에 캐시 비우기 해야 먹히는 경우가 있어서 우선은 다른 곳에서 개별 사용.. 
function initCheckSubcon(callback) {
	$.ajax({
		url: "/getIsSubon.do",
		data: {},
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			if(callback) {
				callback(list);
			}
        }
    });
}
*/