(function($) {
	var sidebarPageObj = {
		init: function() {
			console.log('sidebarPageObj init!!!!!!!!!!!');
			this.load();
		},
		load: function() {
			Common.ajax({url: "/getLeftMenu.do", success: this.callback});
		},
		callback: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			navPageObj.setMenu(dataSet);
	    },
		setMenu: function(dataSet) {
			$.each(dataSet, function(index, item) {
				if(item.MENU_UP_SEQ == '0') {
					var txtLiItem = $('#liNavItem').html();
					txtLiItem = $(txtLiItem.replace(/\{id\}/g, item.MENU_ID).replace(/\{name\}/g, item.MENU_NAME));
					$('#areaNav').append(txtLiItem);
				
					$.each(dataSet, function(index, menu) {
						if(item.MENU_SEQ == menu.MENU_UP_SEQ) {
							var txtLi = '<li id="' + menu.MENU_ID + '" class="nav-item"> <a class="nav-link">' + menu.MENU_NAME + '</a></li>';
							$('#ul-' + item.MENU_ID).append(txtLi);
						}
					});
				}
			});
		}
	};
	
	sidebarPageObj.init();
})(jQuery);