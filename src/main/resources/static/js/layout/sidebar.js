(function($) {
	var sidebarPageObj = {
		init: function() {
			console.log('sidebarPageObj init!!!!!!!!!!!');
			this.load();
		},
		load: function() {
			Common.ajax({url: "/getLeftMenu.do", success: sidebarPageObj.callback});
		},
		callback: function (data, textStatus, jqXHR) {
			sidebarPageObj.setMenu(data.results);
	    },
		setMenu: function(dataSet) {
			var _this = this;
			$.each(dataSet, function(index, item) {
				if(item.MENU_UP_SEQ == '0') {
					$('#sidebar ul:first').append($('#MAIN_SIDEBAR_MAIN_MENU_ROWCOPY').html());
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').attr('href', '#' + item.MENU_ID); 
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').attr('aria-controls', item.MENU_ID); 
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').attr('data-conn-url', item.MENU_URL); 
					$('#sidebar ul:first > .nav-item:last').find('.menu-title').text(item.MENU_NAME);
					$('#sidebar ul:first > .nav-item:last').find('.collapse').attr('id', item.MENU_ID);
					$('#sidebar ul:first > .nav-item:last').find('.sub-menu').attr('id', 'ul-' + item.MENU_ID);
					$.each(dataSet, function(index, menu) {
						if(item.MENU_SEQ == menu.MENU_UP_SEQ) {
							$('#ul-' + item.MENU_ID).append($('#MAIN_SIDEBAR_SUB_MENU_ROWCOPY').html());
							$('#sidebar ul:first .sub-menu > .nav-item:last').attr('id', menu.MENU_ID);
							$('#sidebar ul:first .sub-menu > .nav-item:last').find('.main-nav-link').text(menu.MENU_NAME);
						}
					});
				}
			});
			$('.main-nav-link').off('click').on('click', function() {
				$('.home-tab .nav-tabs li').removeClass('active');
				$(this).addClass('active');
				_this.addMainTab($(this).parent().attr('id'), $(this).text(), $(this).data('conn-url'));
			});
		},
		addMainTab: function(id, name, url) {
			console.log('MENU_ID', id, name, url);
			let isDup = false;
			$('.home-tab .nav-tabs li').each(function() {
				const tab_id = $(this).find('.main_tab_close').data('main-tab-id');
				console.log(tab_id);
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
				$('.home-tab .nav-tabs > .nav-item').find('.tab-nav-link').attr('aria-selected', false); 
				$('.home-tab .nav-tabs').append($('#MAIN_TAB_ITEM_ROWCOPY').html());
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').text(name); 
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('id', 'tab-' + id); 
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('href', '#tab-item-' + id); 
				$('.home-tab .nav-tabs > .nav-item:last').find('i').attr('data-main-tab-id', id); 
				$('.home-tab .nav-tabs li').removeClass('active');
				$('.home-tab .nav-tabs > .nav-item:last').addClass('active');

				$('.home-tab .tab-content').append($('#TAB_ITEM_CONTENT_ROWCOPY').html());
				$('.home-tab .tab-content > .tab-pane:last').attr('id', 'tab-pane-' + id);
				/*
				$('.home-tab .main_tab_close').off('click').on('click', function() {
					const tab_id = $(this).find('.main_tab_close').data('main-tab-id');
					console.log(tab_id);
					var li = $(this).closest('li');
					var tabSize = $('.home-tab .nav-tabs li').length - 1;
					var curIdx = li.index(); 
					$(this).closest('li').remove();
					$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('id', 'tab-' + id).remove(); 
					if(curIdx === tabSize) {
						$('.home-tab .nav-tabs li').removeClass('active');
						$('.home-tab .tab-content .tab-pane').removeClass('show').removeClass('active');
						$('.home-tab .nav-tabs li').eq(curIdx - 1).addClass('active');
						$('.home-tab .tab-content .tab-pane').eq(curIdx - 1).addClass('show').addClass('active');
					} else {
						$('.home-tab .nav-tabs li').eq(curIdx).addClass('active');
						$('.home-tab .tab-content .tab-pane').eq(curIdx).addClass('show').addClass('active');

					}
					return false;
				});
				*/
			}
		}
	};
	
	sidebarPageObj.init();
})(jQuery);