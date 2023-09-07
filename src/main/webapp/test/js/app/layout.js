var mainPageObj = {
	init: function() {
		this.layout.init();
		this.action();
	},
	layout: {
		init: function() {
			this.header();
			this.sidebar();
//			this.right();
//			this.theme();
		},
		htmlPath: '/test/views/layout/',
		jsPath: '/test/js/layout/',
		header: function() {
			Common.loadDiv('.navbar-menu-wrapper', this.getPath('html', 'header'), this.getPath('js', 'header'));
		},
		sidebar: function() {
			mainPageObj.sidebar.init();
		},
		right: function() {
			Common.loadDiv('.settings-panel', this.htmlPath + 'right.html');
		},
		theme: function() {
			Common.loadDiv('.theme-setting-wrapper', this.htmlPath + 'theme.html');
		},
		getPath: function(type, page) {
			return '{0}{1}.{2}'.format(
						(type == 'js') ? this.jsPath : this.htmlPath, page, type
					)
		}
	},
	sidebar: {
		init: function() {
			this.load();
		},
		load: function() {
			Common.ajax({url: "/getLeftMenu.do", success: mainPageObj.sidebar.callback});
		},
		callback: function(data, textStatus, jqXHR) {
			mainPageObj.sidebar.setMenu(data.results);
		},
		setMenu: function(dataSet) {
			$.each(dataSet, function(index, item) {
				if(item.MENU_UP_SEQ == '0') {
					$('#sidebar ul:first').append($('#MAIN_SIDEBAR_MAIN_MENU_ROWCOPY').html());
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').attr('href', '#' + item.MENU_ID);
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').attr('aria-controls', item.MENU_ID);
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').attr('data-conn-url', item.MENU_PATH);
					$('#sidebar ul:first > .nav-item:last').find('.nav-link').text(item.MENU_NAME);
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
		},
		addMainTab: function(id, name, url) {
			console.log('MENU_ID', id, name, url);
			let isDup = false;
			$('.home-tab .nav-tabs li').each(function() {
				const tab_id = $(this).find('.main_tab_close').data('main-tab-id');
				console.log(tab_id);
				if (tab_id == id) {
					isDup = true;
					var selTab = $(this).find('.tab-nav-link').attr('href');
					$('[href="' + selTab + '"]').tab('show');
					return false;
				}
			});
			if(isDup) {
				return;
			} else {
				var tabId = '#tab-content-' + id;
				$('.home-tab .nav-tabs').append($('#MAIN_TAB_ITEM_ROWCOPY').html());
				$('.home-tab .nav-tabs > .nav-item').find('.tab-nav-link').attr('aria-selected', false);
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').text(name);
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('id', 'tab-' + id);
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('href', tabId);
				$('.home-tab .nav-tabs > .nav-item:last').find('.main_tab_close').data('main-tab-id', id);
				$('.home-tab .nav-tabs > .nav-item:last').find('.tab-nav-link').attr('aria-selected', false);

				$('.home-tab .tab-content').append($('#TAB_ITEM_CONTENT_ROWCOPY').html());
				$('.home-tab .tab-content > .tab-pane:last').attr('id', 'tab-content-' + id);

				$('[href="' + tabId + '"]').tab('show');
				var src = '/test/views/system/{0}.html';
				if(id == 'MENU1360') src = src.format('user');
				else if(id == 'MENU1361') src = src.format('code');
				else src = src.format('menu');
				console.log(id, src);
				$('.home-tab .tab-content > .tab-pane:last').find('.tab-content-body').load(src, null, function(data, status, xhr) {
					if(status == "success") {
//						Common.loadJavascript('/test/js/app/system/menu.js');
					}
				});
			}
		}
	},
	action: function() {
		$(document).on('click', '.sidebar .main-nav-link', function(e) {
			$('.home-tab .nav-tabs li').removeClass('active');
			$(this).addClass('active');
			mainPageObj.sidebar.addMainTab($(this).parent().attr('id'), $(this).text(), $(this).data('conn-url'));
		});
		$(document).on('click', '.home-tab .main_tab_close', function(e) {
			const tabId = $(this).data('main-tab-id');
			var li = $(this).closest('li');
			var curIdx = li.index();
			$(li).remove();
			$('.home-tab .tab-pane').eq(curIdx).remove();
			if($(li).find('.tab-nav-link').hasClass('active')) {
				var tabSize = $('.home-tab .nav-tabs li').length - 1;
				if(tabSize > -1) {
					var href = $('.home-tab .nav-tabs > .nav-item').eq(0).find('.tab-nav-link').attr('href');
					$('[href="' + href + '"]').tab('show');
				}
			}
		});
	}
};

$(document).ready( function() {
	mainPageObj.init();
});