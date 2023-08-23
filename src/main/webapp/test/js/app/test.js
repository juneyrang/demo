var mainPageObj = {
	init: function() {
		this.load();
	},
	load: function() {
		this.ajaxCall({url: "/getLocation.do", success: this.callback.currentLocation});
		this.ajaxCall({url: "/getInitDefaultCountry.do", success: this.callback.country});
		this.ajaxCall({url: "/getInitDefailProject.do", success: this.callback.project});
		this.ajaxCall({url: "/getLeftMenu.do", success: this.callback.leftMenu});
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
		var _this = this;
		$.each(dataSet, function(index, item) {
			if(item.MENU_UP_SEQ == '0') {
				$('#sidebar .panel-group').append($('#MAIN_SIDEBAR_MAIN_MENU_ROWCOPY').html());
				$('#sidebar .panel-group > .nav-item:last').find('.nav-link').attr('href', '#' + item.MENU_ID);
				$('#sidebar .panel-group > .nav-item:last').find('.nav-link').attr('aria-controls', item.MENU_ID);
				$('#sidebar .panel-group > .nav-item:last').find('.menu-title').text(item.MENU_NAME);
				$('#sidebar .panel-group > .nav-item:last').find('.collapse').attr('id', item.MENU_ID);
				$('#sidebar .panel-group > .nav-item:last').find('.sub-menu').attr('id', 'ul-' + item.MENU_ID);
				$.each(dataSet, function(index, menu) {
					if(item.MENU_SEQ == menu.MENU_UP_SEQ) {
						$('#ul-' + item.MENU_ID).append($('#MAIN_SIDEBAR_SUB_MENU_ROWCOPY').html());
						$('#sidebar .panel-group .sub-menu > .nav-item:last').attr('id', menu.MENU_ID);
						$('#sidebar .panel-group .sub-menu > .nav-item:last').find('.main-nav-link').text(menu.MENU_NAME);
					}
				});
			}
		});
		$('.main-nav-link').off('click').on('click', function() {
			_this.addMainTab($(this).parent().attr('id'), $(this).text());
		});
	},
	addMainTab: function(id, name) {
		console.log('MENU_ID', id, name);
		let isDup = false;
		$('.home-tab .nav-tabs li').each(function() {
			const tab_id = $(this).find('.main_tab_close').attr('data-main-tab-id');
			if (tab_id == id) {
				isDup = true;
				$('.home-tab .nav-tabs li').removeClass('active');
	        	$(this).addClass('active');
				return false;
			}
		});
		if(isDup) {
			return;
		} else {
			$('.home-tab .nav-tabs').append($('#MAIN_TAB_ITEM_ROWCOPY').html());
			$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').text(name);
			$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('id', 'tab-' + id);
			$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('href', '#tabItem-' + id);
			$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('aria-controls', name);
			$('.home-tab .nav-tabs > .nav-item:last').find('i').attr('data-main-tab-id', id);
			var tabItem = $('#tabItem-' + id).html();
			$('.home-tab .tab-content').append(tabItem);
			$('.home-tab .main_tab_close').off('click').on('click', function() {
				console.log($(this).data('main-tab-id'));
				var li = $(this).closest('li');
				var tabSize = $('.home-tab .nav-tabs li').length - 1;
				var curIdx = li.index();
				console.log(tabSize, curIdx);
				$(this).closest('li').remove();
				if(curIdx === tabSize) {

				} else {

				}
				return false;
			});
		}
	}
};

$(document).ready( function() {
	mainPageObj.init();
});