(function($) {
	var menuContentObj = {
		init: function() {
			console.log('menuContentObj init!!!!!!!!!!!');
			this.load();
		},
		load: function() {
//			Common.ajax({url: "/getLeftMenu.do", success: sidebarPageObj.callback});
		},
		callback: function (data, textStatus, jqXHR) {
			sidebarPageObj.setMenu(data.results);
	    }
	};
	
	menuContentObj.init();
})(jQuery);