var mainPageObj = {
	init: function() {
		this.load();
	},
	load: function() {
//		this.ajaxCall({url: "/getLocation.do", success: this.callback.currentLocation});
//		this.ajaxCall({url: "/getInitDefaultCountry.do", success: this.callback.country});
//		this.ajaxCall({url: "/getInitDefailProject.do", success: this.callback.project});
//		this.ajaxCall({url: "/getLeftMenu.do", success: this.callback.leftMenu});
//		$('#areaFooter').load("/test/include/bottom.html", null, function(data, status, xhr) {
//			if(status == "success") {
//			}
//		});
	},
	callback: {
		currentLocation: function (data, textStatus, jqXHR) {
			var location = data.result;

			if(location === 'dev') {
				$('#labelCurrentLocation').text('DEV');
			}
	    },
		country: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(list.length > 0) {
				var txt = "Default Country [" + list[0]["COUNTRY"] + "]";
				$('#spanDefaultCountry').text(txt);
			}
			else{
				var txt = "Default Country";
				$('#spanDefaultCountry').text(txt);
			}
	    },
	    project: function (data, textStatus, jqXHR) {
			var list = data.results;

			if(list.length > 0) {
				var txt = "Default Project [" + list[0]["SEGMENT1"] + " - " + list[0]["NAME"] + "]";
				$('#spanDefaultProject').text(txt);
				defaultProject = true;
			}
			else{
				var txt = "Default Project";
				$('#spanDefaultProject').text(txt);
				defaultProject = false;
			}
	    },
		leftMenu: function (data, textStatus, jqXHR) {
			var dataSet = data.results;
			mainPageObj.setMenu(dataSet);
	    }
	},
	ajaxCall: function(param) {
		$.ajax($.extend({
			async: true,
			type: "POST",
			data: {},
	        dataType: "json"
	    }, param));
	},
	setMenu: function(dataSet) {
		$.each(dataSet, function(index, item) {
			if(item.MENU_UP_SEQ == '0') {
				var txtLiItem = '' +
							  	' <li class="nav-item">' +
							  	'		<a class="nav-link" data-bs-toggle="collapse" href="#' + item.MENU_ID +'" aria-expanded="false" aria-controls="' + item.MENU_ID +'">' +
								  '  		<i class="menu-icon mdi mdi-floor-plan"></i>' +
								  '  		<span class="menu-title">' + item.MENU_NAME +'</span>' +
								  '  		<i class="menu-arrow"></i> ' +
								  '		</a>' +
								  '		<div class="collapse" id="' + item.MENU_ID +'">' +
								  '  		<ul id="ul-{id}" class="nav flex-column sub-menu">';
										$.each(dataSet, function(index, menu) {
											if(item.MENU_SEQ == menu.MENU_UP_SEQ) {
												txtLiItem += '<li id="' + item.MENU_ID + '" class="nav-item"> <a class="nav-link">' + menu.MENU_NAME + '</a></li>';
											}
										});
				txtLiItem +=	'  		</ul>' +
							  	'		</div>' +
							  	'	</li>';
				$('#areaNav').append(txtLiItem);
			}
		});
	}
};

$(document).ready( function() {
	mainPageObj.init();
});