var navPageObj = {
	init: function() {
		this.load();
	},
	load: function() {
		ajaxCall({url: "/getLeftMenu.do", success: this.callback});
	},
	callback: function (data, textStatus, jqXHR) {
		var dataSet = data.results;
		navPageObj.setMenu(dataSet);
    },
	setMenu: function(dataSet) {
		console.log(dataSet);
		$.each(dataSet, function(index, item) {
			if(item.MENU_UP_SEQ == '0') {
				var txtLiItem = $('#liNavItem').html();
				txtLiItem = $(txtLiItem.replace(/\{id\}/g, item.MENU_ID).replace(/\{name\}/g, item.MENU_NAME));
				console.log(txtLiItem);
				$('#areaNav').append(txtLiItem);
			
				$.each(dataSet, function(index, menu) {
					if(item.MENU_SEQ == menu.MENU_UP_SEQ) {
						var txtLi = '<li id="' + item.MENU_ID + '" class="nav-item"> <a class="nav-link">' + menu.MENU_NAME + '</a></li>';
						$('#ul-' + item.MENU_ID).append(txtLi);
					}
				});
			}
		});
	}
};

function ajaxCall(param) {
	$.ajax($.extend({
		async: true,
		type: "POST",
		data: {},
        dataType: "json"
    }, param));
}