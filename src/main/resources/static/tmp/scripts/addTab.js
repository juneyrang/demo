function id2Index(tabsId, srcId) {
	var index = -1;
	var i = 0,
	tbH = $(tabsId).find("li a");
	var lntb = tbH.length;
	if (lntb > 0) {
		for (i = 0; i < lntb; i++) {
			o = tbH[i];

			var srcIdArr = srcId.split("#");
			var srcIdTxt = srcIdArr[1];
			var hrefArr = o.href.split("#");
			var hrefTxt = hrefArr[1];

			if (srcIdTxt == hrefTxt) {
				index = i
			}
		}
	}
	return index
}
function addTab(link) {
	var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
	var label = $(link).text();
	var id = "tabs-" + $(link).attr("id");
	var rel = $(link).attr("rel");
	var li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));
	var tabContentHtml = "";
	$.ajax({
		type: "POST",
		url: "page_crt.do?MENU_SEQ=" + rel,
		async: false,
		dataType: "html",
		success: function (data) {
			tabContentHtml = data
		}
	});
	tabs.find(".ui-tabs-nav").append(li);
	tabs.append("<div id='" + id + "'><iframe id='" + id + "' seq='iframe-"+id+"' style='overflow-x:hidden; overflow-y:hidden; width:100%; height:91vh;' src='page_crt.do?MENU_SEQ=" + rel + "' frameborder='0'></iframe></div>");
	tabs.tabs("refresh");
	tabs.tabs("option", "active", $("#tab_header").index());
	$("#mainFrame").children().remove();
	$("#tabs").show();
	parent.searchRealTimeNotice();
}
function calcHeight(obj) {
	obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";
	obj.style.overflow = "hidden"
}