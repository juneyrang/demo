
//JS버전
var today = new Date();
const js_version = itp_fn_date_format(today);

requirejs.config({
	baseUrl: ITP_CONTEXTPATH,
	paths: {
		'jquery': 'js/jquery.min',
		'jquery-ui': 'js/jquery-ui.min',
		'jquery.number': 'js/jquery.number',
		'jquery.sortable': 'js/jquery.ui.sortable',
		'jquery.grid.addons': 'plugins/grid.addons',
		'jquery.bootstrap': 'bootstrap/dist/js/bootstrap.min',
		'jquery.bootstrap.treeview': 'bootstrap/dist/js/bootstrap-treeview',
		'jquery.bootstrap.fileUpload': 'bootstrap-fileUpload/dist/bootstrap-FileUpload.js?version='+js_version,
		'jquery.bootstrap.datepicker': 'bootstrap-datepicker/js/bootstrap-datepicker',
	    'jquery.bootstrap.datepicker.locale': 'bootstrap-datepicker/locales/bootstrap-datepicker.' + ITP_LANGUAGE + '.min',
		'jquery.rwdImageMaps': 'js/jquery.rwdImageMaps', 
		'jquery.maphilight': 'js/jquery.maphilight.min',
		'jquery.jqGrid': 'js/jquery.jqGrid',
		'jquery.jqGrid.grouping': 'js/grid.grouping',
		'jquery.jqGrid.inlinedit': 'js/grid.inlinedit',
		'jquery.jqGrid.formedit': 'js/grid.formedit',
		'jquery.jqGrid.celledit': 'js/grid.celledit',
		'jquery.jqGrid.treegrid': 'js/grid.treegrid',
		'jquery.jqGrid.fmatter': 'js/jquery.fmatter',
		'jquery.jqGrid.locale': 'js/i18n/grid.locale-' + ITP_LANGUAGE,
		'smarteditor2': 'se2/js/service/HuskyEZCreator',
		'message.locale': 'js/app/locales/locale-' + ITP_LANGUAGE + '.js?version='+js_version,
		'kakao.postcode': 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2',		
		// 'kakao.maps': 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=16051f864cde43fd1157f61c0fef7c6e&libraries=services,clusterer&autoload=false',
		'kakao.maps': 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=a2ce7c66185a5413095b6485ac9ad3cd&libraries=services,clusterer&autoload=false',
		'kakao.map.util': 'js/app/kakao.map', 				// Crypto 암호화 js
		'file.saver': 'js/FileSaver.min',					// 엑셀 다운로드 (JSON 데이터를 파일로 전환)
		'xlsx': 'js/xlsx.full.min',							// 엑셀 다운로드 (JSON 데이터를 파일로 전환)
		'html2canvas': 'js/html2canvas.min',				// PDF 다운로드 (html 객체를 canvas로 변환)
		'jspdf': 'js/jspdf.min',							// PDF 다운로드 (html, 이미지, canvas 객체를 pdf로 변환)
		// 'jspdf.autotable': 'js/jspdf.plugin.autotable.min',	// PDF 다운로드 (html, 이미지, canvas 객체를 pdf로 변환)
		'crypto': 'js/crypto', 					//Crypto 암호화 js
		'check': 'js/check.js?version='+js_version // 
	},
	shim: {
		'jquery.bootstrap': {
			deps: [
				'jquery',
				'jquery-ui'
			]
		},
		'jquery.bootstrap.treeview': {
			deps: ['jquery.bootstrap']
		},
		'jquery.bootstrap.fileUpload': {
			deps: ['jquery.bootstrap']
		},
		'jquery.bootstrap.datepicker.locale': {
			deps: [
				'jquery.bootstrap',
				'jquery.bootstrap.datepicker'
			]
		},
		'jquery.jqGrid.locale': {
			deps: [
				'jquery.jqGrid',
				'jquery.jqGrid.grouping',
				'jquery.jqGrid.inlinedit',
				'jquery.jqGrid.formedit',
				'jquery.jqGrid.celledit',
				'jquery.jqGrid.treegrid',
				'jquery.jqGrid.fmatter'
			]
		},
		'xlsx': {
			deps: ['file.saver']
		},
		'kakao.map.util': {
			deps: [
				'kakao.postcode',
				'kakao.maps'
			]
		},
		'jspdf': {
			deps: [
				// 'jspdf.autotable',
				'html2canvas'
			]
		}
	}
});

require([
	'jquery',
	'jquery.bootstrap',
	'jquery.bootstrap.datepicker.locale',
	'jquery.jqGrid.locale',
	'message.locale',
	'xlsx'
], function($) {
	$.jgrid.styleUI.Bootstrap.base.rowTable = 'table table-bordered table-striped';
	$.jgrid.defaults.styleUI = 'Bootstrap';
	$.jgrid.defaults.datatype = 'json';
	$.jgrid.defaults.mtype = 'POST';
	$.jgrid.defaults.width = 782;
	$.jgrid.defaults.height = '100%';
	$.jgrid.defaults.autowidth = true;
	$.jgrid.defaults.shrinkToFit = true;
	$.jgrid.defaults.viewrecords = true;
	$.jgrid.defaults.altRows = true;
	$.jgrid.defaults.loadonce = false;
	$.jgrid.defaults.resizable = true;
	$.jgrid.defaults.multiSort = false;
	$.jgrid.defaults.cellEdit = false;
	$.jgrid.defaults.multiselect = true;
	$.jgrid.defaults.multiboxonly = true;
	$.jgrid.defaults.outoencode = true;
	$.jgrid.defaults.cellsubmit = 'clientArray';
	$.jgrid.defaults.page = 1;
	$.jgrid.defaults.rowNum = 20;
	$.jgrid.defaults.rownumWidth = 50;
	//$.jgrid.defaults.multiselectWidth = 30;
	$.jgrid.defaults.jsonReader = {
		root: 'gridRows',
		page: 'gridPage',
		total: 'gridTotal',
		records: 'gridRecords',
		repeatitems: false,
		cell: 'cell'
	};
	$.jgrid.defaults.ajaxGridOptions = {
		contentType: 'application/json'
	};
	$.jgrid.defaults.treeGridModel = 'adjacency';
	$.jgrid.defaults.ExpandColClick = true;
	$.jgrid.defaults.tree_root_level = 0;
	$.jgrid.defaults.treeReader = {
		level_field: 'level',
		leaf_field: 'leaf'
	};

	history.pushState(null, null, location.href);
    window.onpopstate = function () {
    	itp_fn_modal_alert(ITP_MSG_LOCALE.message.page.noBack);
        history.go(1);
    };

	$('[data-toggle="tooltip"]').tooltip();
	$('.modal.itp_modal .modal-content').draggable();


	itp_fn_set_timeout.init();


	$('#ITP_BTN_HOME').on('click', function() {
		location.replace(ITP_CONTEXTPATH + '/main.html');
	});

	$('#ITP_BTN_USER').on('click', function() {
		itp_fn_call_popup(ITP_CONTEXTPATH + '/COMMONPOP_USER', '#ITP_ASIDE', 'COMMONPOP_USER', null, undefined, null, null);
	});

	$('#ITP_BTN_MENU').on('click', function() {
		//$('#ITP_OVERLAY').toggle();
		$('#ITP_SIDEBAR').toggleClass('itp_open_nav');
		$('#ITP_CONTAINER').toggleClass('itp_open_conts');
		$('#ITP_TAB_BAR').toggleClass('itp_open_tab');
		itp_fn_fire_window_resize();

		/*
		$('#ITP_OVERLAY').off('click');
		$('#ITP_OVERLAY').on('click', function() {
			$('#ITP_OVERLAY').hide();
			$('#ITP_SIDEBAR').removeClass('itp_open_nav');
		});
		*/
	});

	$('#ITP_SIDEBAR .accordion-toggle').off('click');
	$('#ITP_SIDEBAR .accordion-toggle').on('click', function() {
		$(this).find('i.indicator').toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	});

	$('#ITP_HEADER .itp_tab_list').on('click', '.itp_tab_open', function() {
		const tab_id = $(this).find('.itp_tab_close').attr('data-itp-tab-id');
		if( tab_id ) {
			var band=$('#'+tab_id+'_PAGE_NO').closest('.panel-collapse.collapse')
			band.addClass('in');
			band.css('height','auto');
			$('#ITP_SIDEBAR .itp_nav_link.active').removeClass('active');
			$('#'+tab_id+'_PAGE_NO').addClass('active');
			var top=$(band).offset().top;
			$('.panel-group.itp_nav').scrollTop(top);
		} else {
			$('#ITP_SIDEBAR .itp_nav_link.active').removeClass('active');
		}
		console.log("## change tab tabId=="+tab_id);
		// console.log('[ITP_TAB_OPEN] CALL');
		//로그인체크
		itp_fn_logined_check();
		itp_fn_fire_window_resize();
	});

	$('#ITP_HEADER .itp_tab_list').on('click', '.itp_tab_close', function() {
		var tab_id = $(this).attr('data-itp-tab-id');
		var li = $(this).closest('li');
		var tabSize = $('#ITP_HEADER .itp_tab_list li').size() - 1;
		var curIdx = li.index(); 
		$('#ITP_TAB_' + tab_id).remove();
		$(this).closest('li').remove();
		
		if(curIdx === tabSize) {
			$('#ITP_HEADER .itp_tab_list li').removeClass('active');
			$('#ITP_CONTAINER .itp_contents .itp_sec').removeClass('active');
			// $('#ITP_HEADER .itp_tab_list li:first-child').addClass('active');
			// $('#ITP_CONTAINER .itp_contents .itp_sec:first-child').addClass('active');
			$('#ITP_HEADER .itp_tab_list li').eq(curIdx - 1).addClass('active');
			$('#ITP_CONTAINER .itp_contents .itp_sec').eq(curIdx - 1).addClass('active');
			
		} else {
			$('#ITP_HEADER .itp_tab_list li').eq(curIdx).addClass('active');
			$('#ITP_CONTAINER .itp_contents .itp_sec').eq(curIdx).addClass('active');

		}
		itp_fn_fire_window_resize();

		return false;
	});

	$('#ITP_CONTAINER').on('click', '.itp_srh_wrap_toggle .itp_srh_close', function() {
		var wrap = $(this).closest('.itp_srh_wrap_toggle');
		wrap.addClass('itp_srh_list_close');
		wrap.find('.itp_srh_toggle').addClass('itp_hide_away');
		wrap.find('.itp_srh_head').addClass('itp_height_full');
		wrap.find('.itp_srh_tab_toggle').hide();
		$(this).removeClass('show');
		$(this).addClass('hidden');
		$(this).next().removeClass('hidden');
		$(this).next().addClass('show');
		itp_fn_fire_window_resize();
	});

	$('#ITP_CONTAINER').on('click', '.itp_srh_wrap_toggle .itp_srh_open', function() {
		var wrap = $(this).closest('.itp_srh_wrap_toggle');
		wrap.removeClass('itp_srh_list_close');
		wrap.find('.itp_srh_toggle').removeClass('itp_hide_away');
		wrap.find('.itp_srh_head').removeClass('itp_height_full');
		wrap.find('.itp_srh_tab_toggle').show();
		$(this).removeClass('show');
		$(this).addClass('hidden');
		$(this).prev().removeClass('hidden');
		$(this).prev().addClass('show');
		itp_fn_fire_window_resize();
	});
	
	$('#ITP_HEADER #ITP_LOGIN_USER').on('click', function() {
		
		const key = {viewCd: 'R', userId: fn_make_user_info.get('userId')};
		var param = $.param(key);					
		var popFn = function(result) {
																	
		};			
		fn_call_popup('comm', 'USER_INFO_MODIFY_POPUP', '#ITP_ASIDE', popFn, param, 'S');
		$('#ITP_USER_INFO_MODIFY_POPUP > div.modal-dialog').width('500px');
	});

	$('#ITP_CONTAINER').on('keyup', 'input, textarea', function() {
		var $th = $(this);
        $th.val($th.val().replace(/(<([^>]+)>)/ig, function() {return '';}));
	});

	$.fn.clearForm = function() {
		return this.each(function() {
		    var type = this.type, tag = this.tagName.toLowerCase();

		    if (tag == 'form')
		      return $(':input',this).clearForm();
		    if (type == 'text' || type == 'password' || tag == 'textarea'|| type == 'hidden')
		      this.value = '';
		    else if (type == 'checkbox' || type == 'radio')
		      this.checked = false;
		    else if (tag == 'select')
		      this.selectedIndex = -1;
		});
	};

	$.fn.serializeObject = function() {
		var result = {};
		var extend = function(i, element) {
			var node = result[element.name];
			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push($.trim(element.value));
				} else {
					result[element.name] = [node, $.trim(element.value)];
				}
			} else {
				result[element.name] = $.trim(element.value);
			}
		}
		$.each(this.serializeArray(), extend);
		return result;
	};

	$.fn.extend({
		treed: function(o) {
			var openedClass = 'glyphicon-minus text-primary';
			var closedClass = 'glyphicon-plus text-primary';

			if (typeof o != 'undefined') {
				if (typeof o.openedClass != 'undefined') {
					openedClass = o.openedClass;
				}
				if (typeof o.closedClass != 'undefined') {
					closedClass = o.closedClass;
				}
			};

			var tree = $(this);
			tree.addClass('tree');
			tree.find('li').has('ul').each(function() {
				var branch = $(this);
				branch.find('.list-group-item').first().prepend('<i class="indicator glyphicon ' + closedClass + '"></i>');
				branch.addClass('branch');
				branch.on('click', function(e) {
					if (this == e.target) {
						var icon = $(this).find('.list-group-item').first().children('i:first');
						icon.toggleClass(openedClass + ' ' + closedClass);
						$(this).children('ul').children().toggle();
					}
				});
				branch.children('ul').children().toggle();
				//branch.children('ul').children().show();
			});

			tree.find('.branch .indicator').each(function() {
				$(this).on('click', function() {
					$(this).closest('li').click();
					return false;
				});
			});
		}
	});

	const newPostParam = {
		openYn: $('#ITP_CONTAINER').data('openYn'),
		navId: $('#ITP_CONTAINER').data('navId'),
		titId: $('#ITP_CONTAINER').data('titId')
	};
	if (newPostParam.openYn == 'Y') {itp_fn_open_tab(newPostParam);}

	// 로그아웃 버튼
	$('.ITP_BTN_LOGOUT').click(function() {
		fnLogout();
	});

	// 로그인 여부 체크
	var pathname = $(location).attr('pathname');
	if(pathname.indexOf('login.html') < 0) {
		itp_fn_logined_check(true, function() {

			if (VIEW_PAGE != 'LOGIN') { //main.html 이 load 되면 기본 정보 데이터를 불러온다.
				var data = JSON.parse(sessionStorage.getItem('itp_login_info'));
				CONN_KEY = data.connKey; //로그인 했을때 넣었던 키를 가져옴

				var callbackFn = function(result) {
					console.log(result);
					CODE_LIST = result.codeList;
					AUTH_MENU_LIST = result.authMenuList;
					ACT_LIST = result.actList;
					POP_LIST = result.popList;
					LOGIN_USER_INFO = result.userInfo;
					// USER_ID = result.userId;
					// USER_NM = result.userNm;
					// AUTH_TYPE_CD = result.authTpCd;
					// AUTH_TYPE_NM = result.authTpNm;
					// AFFL_SHOP_LIST = result.afflList;
					// AFFL_BRAND_LIST = result.brandList;
					/*
					if(FRCOMP_LIST.length > 0) {
						let itp_manage_cmpy_cd = '';
						let data = JSON.parse(sessionStorage.getItem('itp_manage_cmpy_cd'));
						if(data != null && data != undefined ) {
							itp_manage_cmpy_cd = data.cmpyCd;	
						}
						let check = false;
						$.each(FRCOMP_LIST, function(idx, value) {
							if(value.cmpyCd == itp_manage_cmpy_cd) {
								check = true;
							}
						});
						if(!check) {
							sessionStorage.setItem('itp_manage_cmpy_cd', JSON.stringify(FRCOMP_LIST[0])); // 브랜드그룹정보	
						} 						
					} else {
						// sessionStorage.removeItem('itp_manage_cmpy_cd');
						*/
						sessionStorage.setItem('itp_manage_cmpy_cd', '{}');
					//}
					// 사용자 정보 만들기
					fn_make_user_info.init(result.userInfo);
					// 왼쪽 메뉴 만들기
					fn_make_side_menu();
					// 메뉴 요약
					fn_make_menu_summary();
					// 메인 팝업 띄우기
					fn_proc_popup_view('M');

				};
				fn_ajax_call('/api/session/data', null, callbackFn, 'GET');
			}
		});
	}
});

function fn_make_menu_summary() {
	
	$('#ITP_AJAX_SUMMARY_DETAIL_CONTAINER #ITP_SUMMARY_jqGrid_list tbody tr').css('display','none');
	
}

var fn_make_user_info = {
	init : function(userInfo) {
		this.set(userInfo);
		this.button();
	},
	view: function() {
		// 사용자명
		$('#ITP_LOGIN_USER').text(this.get('userNm'));
		
		let authTypeNm = '오더퀸' ;
		
		if (this.get('authTpCd') == "10" || this.get('authTpCd') == "20") {
			authTypeNm ='오더퀸';
		} else if (this.get('authTpCd') == "30" ) {
			authTypeNm = this.get('afflShopNm');
		} else { 
			authTypeNm = this.get('brandNm');
		}
		
		
		if (this.get('authTpCd') == "10" || this.get('authTpCd') == "20" || this.get('authTpCd') == "30") {
			$('#ITP_TXT_MAIN_SHR_AFFL').text(authTypeNm);
			var brandNm = (this.get('brandNm')) ? '(' + this.get('brandNm') + ')' : '';
			$('#ITP_TXT_MAIN_SHR_BRAND').text(brandNm);
		} else {
			$('#ITP_TXT_MAIN_SHR_AFFL').text(authTypeNm);
			$('.itp_sch_brand').css('display','none');
			$('#ITP_TXT_MAIN_SHR_BRAND').css('display','none');
		}
	},
	button: function() {
		var _this = this;
		$('#ITP_BTN_MAIN_SHR_AFFL').off('click').on('click', function() {
			var popFn = function(rowDataPop) {
				// console.log(rowDataPop);
				$.each(rowDataPop, function(key, value) {
					itp_fn_tab_close_all(''); // 다른탭 닫기
					_this.set(JSON.stringify(value));
				});
			};
			fn_call_popup('biz', 'BIZPOP_AFFL_BRAND', '#ITP_ASIDE', popFn, null, 'S');
		});
	},
	isEmpty: function() {
		return sessionStorage.getItem('itp_manage_user_info') === null;
	},
	set: function(userInfo) {
		if(this.isEmpty()) {
			sessionStorage.setItem('itp_manage_user_info', JSON.stringify(userInfo));
		} else {
			if(typeof(userInfo) == "string") {
				var sessionUserInfo = this.get();
				$.each(JSON.parse(userInfo), function(key, value) {
					sessionUserInfo[key] = value;
				});
				sessionStorage.setItem('itp_manage_user_info', JSON.stringify(sessionUserInfo));
			}
		}
		this.view();
	},
	get: function(key) {
		var sessionUserInfo = JSON.parse(sessionStorage.getItem('itp_manage_user_info'));
		return (key === undefined || key === null) ? sessionUserInfo : sessionUserInfo[key];
	}
};

function fn_make_side_menu() {
	$('#ITP_SIDEBAR .panel-group').empty();
	
	$.each(AUTH_MENU_LIST, function(key, value) { 
		// console.log(JSON.stringify(value));
		if(value.level == 2) { // LEVEL2
			$('#ITP_SIDEBAR .panel-group').append($('#ITP_AJAX_MAIN_SIDE_LEVEL2_ROWCOPY').val());
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.fnMenuNm').text(value.menuNm);
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.accordion-toggle').attr('href', '#ITP_NAV_'+value.menuNo);
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.panel-collapse').attr('id', 'ITP_NAV_'+value.menuNo);
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.fnLevelBottomList').empty();
		} else if(value.level == 3) { // LEVEL3			
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.fnLevelBottomList').append($('#ITP_AJAX_MAIN_SIDE_LEVEL3_ROWCOPY').val());
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.fnMenuNm').text(value.menuNm); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-itp-nav-id', value.menuId); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-conn-url', value.connUrl); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-open-cd', value.openCd); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('id', value.menuId + '_PAGE_NO');
		} else if(value.level == 4) { // LEVEL4			
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.fnLevelBottomList').append($('#ITP_AJAX_MAIN_SIDE_LEVEL4_ROWCOPY').val());
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.fnMenuNm').text(value.menuNm); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-itp-nav-id', value.menuId); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-conn-url', value.connUrl);
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-open-cd', value.openCd); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('id', value.menuId + '_PAGE_NO');
		} else if(value.level == 5) { // LEVEL5			
			$('#ITP_SIDEBAR .panel-group > .panel-default:last').find('.fnLevelBottomList').append($('#ITP_AJAX_MAIN_SIDE_LEVEL5_ROWCOPY').val());
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.fnMenuNm').text(value.menuNm); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-itp-nav-id', value.menuId); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-conn-url', value.connUrl);
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('data-open-cd', value.openCd); 
			$('#ITP_SIDEBAR .panel-group > .panel-default:last .fnLevelBottomList .itp_svg_in:last').find('.itp_nav_link').attr('id', value.menuId + '_PAGE_NO');
		}
	});
	
	$('#ITP_SIDEBAR .itp_nav_link').off('click');
	$('#ITP_SIDEBAR .itp_nav_link').on('click', function() {
		const id = $(this).attr('data-itp-nav-id');
		const connUrl = $(this).attr('data-conn-url');
		const openCd = $(this).attr('data-open-cd');
		// const path = '/app/'+id.substring(0, id.length - 5).toLowerCase();
		const tabSize = $('#ITP_HEADER .itp_tab_list li').size();

		

		if(String(id).indexOf('OPER') === -1 && String(id).indexOf('SYSTEM') === -1) {
			if(fn_make_user_info.get('brandId') === '') {
				itp_fn_modal_alert(ITP_MSG_LOCALE.message.page.noChoiceBrand);
				return false;
			}
		}

		if (tabSize > 15) {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.page.noMoreTab);
			return false;
		}
		$('#ITP_SIDEBAR .itp_nav_link.active').removeClass('active');
		$(this).addClass('active');

		let isDup = false;
		$('#ITP_HEADER .itp_tab_list li').each(function() {
			const tab_id = $(this).find('.itp_tab_close').attr('data-itp-tab-id');
			if (tab_id == id) {
				isDup = true;
				$('#ITP_HEADER .itp_tab_list li').removeClass('active');
	        	$('#ITP_CONTAINER .itp_contents .itp_sec').removeClass('active');
	        	$(this).addClass('active');
	        	$('#ITP_TAB_' + id).addClass('active');
				return false;
			}
		});

		if (!isDup && openCd == 'C') {
			const href = ITP_CONTEXTPATH + connUrl; // $(this).attr('href');
			const text = $(this).children('.itp_tt').text();
			const tab = '<li class="active"><a href="#ITP_TAB_' + id + '" role="tab" data-toggle="tab" class="itp_tab_open">' + text + ' <i class="glyphicon glyphicon-remove itp_tab_close" data-itp-tab-id="' + id + '"></i></a></li>';
			itp_fn_load_page(href, tab, '', id);
//			console.log('[ITP_NAV_LINK] data-itp-nav-id = ' + id + ', data-conn-url = ' + connUrl + ', tabSize = ' + tabSize+' [text='+text+']' );
//			if(text) $('.itp_det_tit>strong').html(text);

		} else {
			itp_fn_fire_window_resize();
		} 
		return false;
	});
	
}

function fn_proc_btn_auth(menu_id) {
	$.each(ACT_LIST, function(key, value) { 
		if(menu_id == value.menuId) {
			if(value.viewYn == 'Y') {
				$('#ITP_TAB_' + menu_id).find('.'+value.actTpCd).addClass('SHOW');
			} else {
				$('#ITP_TAB_' + menu_id).find('.'+value.actTpCd).removeClass('SHOW');
			}
		}
	});
	
	$('#ITP_TAB_' + menu_id + ' button').each(function(index, item) {
		// console.log('id = ' + item.id);
		if(item.id && item.id != '') {
			$('#'+item.id).hide();
			if($('#'+item.id).hasClass('SHOW')) {
				$('#'+item.id).show();
			}
		}
	});

	fn_proc_popup_view('S', menu_id); // 팝업처리
}

function fn_proc_popup_view(view_target_cd, menu_id) {
	var sIdx=0;
	var mIdx=0;
	var lIdx=0;
	$.each(POP_LIST, function(key, value) { 
		if('S' == view_target_cd && 'S' == value.viewTargetCd && value.menuId == menu_id) {
			// 팝업처리
			console.log('[POPUP_VIEW:S]' + value.popNo);
			if(itp_fn_get_cookie(value.popNo) != 'Y') {
				fn_popup_window_center('popup.html?popNo='+value.popNo, value.popNo, value.popWidth, value.popHeight, sIdx);
			}
			sIdx++;
		} else if('M' == view_target_cd && 'M' == value.viewTargetCd) {
			// 팝업처리
			console.log('[POPUP_VIEW:M]' + value.popNo + ', mIdx : ' + mIdx);			
			if(itp_fn_get_cookie(value.popNo) != 'Y') {
				fn_popup_window_center('popup.html?popNo='+value.popNo, value.popNo, value.popWidth, value.popHeight, mIdx);	
			}
			mIdx++;
		} else if('L' == view_target_cd && 'L' == value.viewTargetCd) {
			// 팝업처리
			console.log('[POPUP_VIEW:L]' + value.popNo + ', lIdx : ' + lIdx);			
			if(itp_fn_get_cookie(value.popNo) != 'Y') {
				fn_popup_window_center('popup.html?popNo='+value.popNo, value.popNo, value.popWidth, value.popHeight, lIdx);	
			}
			lIdx++;
		}
	});
}

function fn_show_btn_auth(btn_id) {
	if($(btn_id).hasClass('SHOW')) {
		$(btn_id).show();
	} else {
		$(btn_id).hide();
	}
}

function fn_show_btn_auth_array(btn_ids) {
	$.each(btn_ids, function(i, value) {
		fn_show_btn_auth(value);
	});
}

function fn_make_select(options, code, select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	
	$.each(options, function(key, value) {
		if (value.codeCd == code) {
			if(all_show_yn == undefined || all_show_yn == true) {
				if(all_name == undefined || all_name == '') {
					$('<option/>', {'value': '', 'text': value.codeNm}).prependTo($select_id);
				} else {
					$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
				}
			}
			$.each(value.codeDtlList, function(k, val) {
				$('<option/>', {
		            'value': val.codeDtlCd,
		            'text': val.codeDtlNm
		        }).appendTo($select_id);
			});
			return false;
		}
	});
};

function fn_make_select_upper_menu(options, select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		if (value.level == 3) {
			$('<option/>', {
	            'value': value.menuNo,
	            'text': value.menuNm
	        }).appendTo($select_id);
		}
	});
};

function fn_make_select_brand(options, select_id, all_show_yn, all_name) { //브랜드 셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		$('<option/>', {
            'value': value.brandId,	// 브랜드코드
            'text': value.brandNm	// 브랜드명
        }).appendTo($select_id);
	});
};

function fn_make_select_item_class(options, select_id, all_show_yn, all_name) { //브랜드 셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		$('<option/>', {
			'value': value.itemClass,	// 브랜드코드
			'text': value.itemClassNm	// 브랜드명
		}).appendTo($select_id);
	});
};

function fn_make_select_store(options, select_id, all_show_yn, all_name, all_value) { //매장 셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': !all_value || all_value == undefined ? '' : all_value, 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		$('<option/>', {
            'value': value.storeId,	// 매장번호
            'text': value.storeNm	// 매장명
        }).appendTo($select_id);
	});
};

function fn_make_select_whs(options, select_id, all_show_yn, all_name) { //창고 셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		$('<option/>', {
            'value': value.whsId,	// 창고아이디
            'text': value.whsNm		// 창고명
        }).appendTo($select_id);
	});
};

function fn_make_select_wish(options, select_id, all_show_yn, all_name) { //위시리스트 셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		$('<option/>', {
            'value': value.wishListMgntNo,	// 위시리스트아이디
            'text': value.wishListNm		// 위시리스트명
        }).appendTo($select_id);
	});
};


function fn_make_select_location(options, select_id, all_show_yn, all_name) { //위치 셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	$.each(options, function(key, value) {
		$('<option/>', {
            'value': value.location,	// 로케이션
            'text': value.locationNm	// 로케이션명
        }).appendTo($select_id);
	});
};

function fn_make_year_select(select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	
	var toDate = new Date();
	var current_year = toDate.getFullYear();
	var start_year = current_year;
			
	for(var i = start_year ; i <= current_year ; i++) {
		$('<option/>', {'value': i, 'text': i + '년'}).appendTo($select_id);
	}	

	$select_id.val(current_year);	
};

function fn_make_month_select(select_id, all_show_yn, all_name, start_mon, current_yn, char_yn) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	if (!start_mon || start_mon == undefined) 
		start_mon = 0;
			
	var value; 
	for(var i = start_mon ; i < 13 ; i++) {
		if(i < 10) value = '0' + i;
		else value = i;		
		
		if(char_yn == true) {
			$('<option/>', {'value': value, 'text': value + '월'}).appendTo($select_id);
		} else {
			$('<option/>', {'value': value, 'text': value}).appendTo($select_id);	
		}
	}	
	
	if (current_yn && current_yn == true) {
		var toDate = new Date();
		var mm = toDate.getMonth() + 1;
		mm = (mm < 10) ? '0' + mm : mm;
		$select_id.val(mm);
	} 
};

function fn_make_day_select(select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	var value; 
	for(var i = 0 ; i < 32 ; i++) {
		if(i < 10) value = '0' + i;
		else value = i;		
		$('<option/>', {'value': value, 'text': value}).appendTo($select_id);
	}	
};

function fn_make_hh_select(select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	var value; 
	for(var i = 0 ; i < 24 ; i++) {
		if(i < 10) value = '0' + i;
		else value = i;		
		$('<option/>', {'value': value, 'text': value}).appendTo($select_id);
	}	
};

function fn_make_mi_select(select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	var value; 
	for(var i = 0 ; i < 60 ; i++) {
		if(i < 10) value = '0' + i;
		else value = i;		
		$('<option/>', {'value': value, 'text': value}).appendTo($select_id);
	}	
};

function fn_make_ss_select(select_id, all_show_yn, all_name) { //셀렉트 박스 만들기
	$select_id = $('#' + select_id);
	$select_id.empty();
	if(all_show_yn == true) {
		$('<option/>', {'value': '', 'text': all_name}).prependTo($select_id);
	}
	var value; 
	for(var i = 0 ; i < 60 ; i++) {
		if(i < 10) value = '0' + i;
		else value = i;		
		$('<option/>', {'value': value, 'text': value}).appendTo($select_id);
	}	
};

function fn_make_input_common_cd(options, code, input_id, all_show_yn) { //HIDDEN 공통코드 리스트 만들기
	$input_id = $('#' + input_id);
	$input_id.val('');
	$.each(options, function(key, value) {
		if (value.codeCd == code) {
			//예제) :;BN:읽기버튼;BNW:쓰기버튼;LK:링크;MU:메뉴
			let code_list = '';
			if(all_show_yn == true) {
				code_list = code_list + ':';
			}
			$.each(value.codeDtlList, function(k, val) {
				if(k > 0) {
					code_list = code_list + ';';
				} else if(k == 0 && all_show_yn == true) {
					code_list = code_list + ';';
				}
				code_list = code_list + val.codeDtlCd;
				code_list = code_list + ':';
				code_list = code_list + val.codeDtlNm;
			});
			$input_id.val(code_list);
			return false;
		}
	});
};

function fn_make_common_cd_list(options, code, all_show_yn, all_show_text) { // 공통코드 리스트 만들기
	// $input_id = $('#' + input_id);
	// $input_id.val('');
	var return_val;
	$.each(options, function(key, value) {
		if (value.codeCd == code) {
			//예제) :;BN:읽기버튼;BNW:쓰기버튼;LK:링크;MU:메뉴
			let code_list = '';
			if(all_show_yn == true) {
				code_list = code_list + ':' + all_show_text;
			}
			$.each(value.codeDtlList, function(k, val) {
				if(k > 0) {
					code_list = code_list + ';';
				} else if(k == 0 && all_show_yn == true) {
					code_list = code_list + ';';
				}
				code_list = code_list + val.codeDtlCd;
				code_list = code_list + ':';
				code_list = code_list + val.codeDtlNm;
			});
			// $input_id.val(code_list);
			// return code_list;
			return_val = code_list;
		}
	});
	return return_val;
};

function fn_make_input_store_print(options, input_id, all_show_yn) { //HIDDEN 매장프린터 리스트 만들기
	$input_id = $('#' + input_id);
	$input_id.val('');
	let list = '';
	if(all_show_yn == true) {
		list = list + ':';
	}
	$.each(options, function(key, value) {		
		if(key > 0) {
			list = list + ';';
		} else if(key == 0 && all_show_yn == true) {
			list = list + ';';
		}
		list = list + value.printNo;
		list = list + ':';
		list = list + value.printNo;		
	});
	$input_id.val(list);
};

function fn_make_input_store_kds(options, input_id, all_show_yn) { //HIDDEN 매장KDS 리스트 만들기
	$input_id = $('#' + input_id);
	$input_id.val('');
	let list = '';
	if(all_show_yn == true) {
		list = list + ':';
	}
	$.each(options, function(key, value) {		
		if(key > 0) {
			list = list + ';';
		} else if(key == 0 && all_show_yn == true) {
			list = list + ';';
		}
		list = list + value.kdsNo;
		list = list + ':';
		list = list + value.kdsNo;		
	});
	$input_id.val(list);
};

function fnHashed(code) { //유니코드로 들어오는 해쉬키를 스트링으로 변환
	return decodeURIComponent(JSON.parse('"' + code.replace(/\"/g, '\\"') + '"'));
};

function fnLogout() { //로그아웃
	var callbackFn = function(result) {
		sessionStorage.removeItem('itp_login_info'); //Jwt 키 제거
		sessionStorage.removeItem('itp_manage_user_info'); //로그인 사용자 정보 제거
		$(location).attr('href', ITP_CONTEXTPATH + '/login.html');
	};
	fn_ajax_call('/api/member/sign-out', null, callbackFn, 'PATCH');
};

function fnSessionOut() { //1시간 동안 아무것도 안할때 또는 강제 만료시킬때 사용
	var callbackFn = function(result) {
		sessionStorage.removeItem('itp_login_info'); //Jwt 키 제거
		$(location).attr('href', ITP_CONTEXTPATH + '/login.html');
	};
	fn_ajax_call('/api/session/expire', null, callbackFn, 'PATCH');
};

//AJAX 양식 (이렇게 사용하시면 됩니다.)
function fn_ajax_call(href, param, fn, type) {
	$.ajax({
		contentType: 'application/json',
		url: DOMAIN + href,
		data: param,
		type: type,
		async: false,
		timeout: 10000,
		xhrFields: {
			withCredentials: true //Cross Domain 처리
		},
		beforeSend: function(xhr) {
			$('#ITP_OVERLAY').show();
			xhr.setRequestHeader('X-AUTH-TOKEN', CONN_KEY); //Jwt 토큰을 헤더에 담아서 보낸다.
		},
		complete: function() {
			$('#ITP_OVERLAY').hide();
		},
		success: function(result) {
			if (result.code !== undefined && result.message !="") { //성공시에도 메세지가 있으면 얼럿 예)저장되었습니다.
				itp_fn_modal_alert_ajax(result.message);
			}
			if (fn !== undefined || typeof fn !== 'undefined') fn(result);
		},
		error: function(xhr, status, error) {
			if (xhr.responseJSON !== undefined) { //실패시 서버에서 내려주는 메세지 얼럿
				itp_fn_modal_alert_ajax(xhr.responseJSON.message);
				if (xhr.status == 401) { //401에러가 떨어지면 로그인페이지로 이동
					sessionStorage.removeItem('itp_login_info'); //Jwt 키 제거
					$(location).attr('href', ITP_CONTEXTPATH + '/login.html');
				}
			} else {
				itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
			}
		},
		fail: function() {
			itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
		}
	});
};

function itp_fn_logined_check(user_nm_update, fn) {
	//console.log('[ITP_FN_LOGINED_CHECK] CALL, user_nm_update = ' + user_nm_update);

	var now, expiration, data = false;
	data = sessionStorage.getItem('itp_login_info');
	if(data) {
		data = JSON.parse(data);
		now = new Date();
        expiration = new Date(data.timestamp);
        expiration.setMinutes(expiration.getMinutes() + 60);

        if (now.getTime() > expiration.getTime()) {
            data = false;
			fnSessionOut();
        } else {
			sessionStorage.setItem('itp_login_info', JSON.stringify({
				timestamp: new Date(),
		        connKey: data.connKey		//Jwt키를 가져와서 세션 스토리지에 저장
			}));
        	if(user_nm_update && user_nm_update == true) {
				if (fn !== undefined || typeof fn !== 'undefined') {
					fn();
				}
        	}
        }
	} else {
		// 로그인 페이지로 이동
		if($(location).attr('pathname').indexOf('login.html') < 0)
			$(location).attr('href', ITP_CONTEXTPATH + '/login.html');
	}
}

function itp_fn_get_code_detail_list(code_cd) {
	let map = new Map(JSON.parse(sessionStorage.itp_common_code));
	if(map.has(code_cd)) {
		return JSON.parse(map.get(code_cd));
	} else {
		return null;
	}
}

const ITP_GRID_NAV_DEFAULTS = {
	navGrid: {edit: false, add: false, del: false, refresh: true, view: false, search: false},
	inlineNav: {edit: false, add: false, cancel: false, save: false}
};

const ITP_GRID_NUM_WIDTH = {
	numWidth: 50,
	orderWidth: 70
};

const ITP_GRID_COL_STYLE = {
	link: {'color': '#000', 'text-decoration': 'underline', 'font-weight': 'bold', 'cursor': 'pointer'},
	selected: {'color': '#337ab7', 'text-decoration': 'underline', 'cursor': 'pointer'},
	popup: {'color': '#000', 'text-decoration': 'underline'},
	register: {'color': '#337ab7', 'text-decoration': 'underline'},
	delete: {'color': '#ac2925', 'text-decoration': 'underline'},
	important: {'color': '#ac2925'},
	cancel: {'color': '#ac2925', 'background': '#fff3f3'},
	blue: {'background': '#f3f8ff'},
	pay: {'color': '#337ab7', 'background': '#f3f8ff'},
	settle: {'background': '#f1f1f1'}
};

let ITP_UPLOAD_DEFAULTS = {
	fileTypes: {
		archives: ['zip', '7z', 'gz', 'gzip', 'rar', 'tar']
		,audio: ['mp3', 'wav', 'wma', 'wpl', 'aac', 'flac', 'm4a', 'm4b', 'm4p', 'midi', 'ogg']
		,files: ['doc', 'docx', 'dotx', 'docm', 'ods', 'odt', 'ott', 'ods', 'pdf', 'ppt', 'pptm', 'pptx', 'pub', 'rtf', 'csv', 'log', 'txt', 'xls', 'xlsm', 'xlsx', 'hwp', 'avi', 'mp4']
		,images: ['bmp', 'tif', 'tiff', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'ico', 'raw']
	}
};

const ITP_DATE_LANGUAGE = (function() {
	let lang = ITP_LANGUAGE;
	if (lang == 'en') {lang = ITP_LANGUAGE + '-GB';}
	var agrs = {language: lang};
	return agrs;
}());

function itp_fn_get_date_lang_format(yyyy, mm, dd, split){
	var retVal = '';
	if (ITP_LANGUAGE == 'en') {
		retVal = mm + split + dd + split + yyyy;
	} else {
		retVal = yyyy + split + mm + split + dd;
	}
	return retVal;
};

function itp_fn_get_add_date(sDate, v, split) {
	if (split == null || split == undefined) split = '.';
	sDate = itp_fn_delete_date_format(sDate);
	var yy = parseInt(sDate.substring(0, 4), 10);
	var mm = parseInt(sDate.substring(4, 6), 10);
	var dd = parseInt(sDate.substring(6), 10);
	var d = new Date(yy, mm - 1, dd + v);

	yy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;

	return itp_fn_get_date_lang_format(yy, mm, dd, split);
};

function itp_fn_get_add_date_ko(sDate, v, split) {
	if (split == null || split == undefined) split = '.';
	sDate = itp_fn_delete_date_format(sDate);
	var yy = parseInt(sDate.substring(0, 4), 10);
	var mm = parseInt(sDate.substring(4, 6), 10);
	var dd = parseInt(sDate.substring(6), 10);
	var d = new Date(yy, mm - 1, dd + v);

	yy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	return yy + split + mm + split + dd;
};

function itp_fn_get_today(split) {
	var retVal = '';
	if (split == null || split == undefined) split = '.';
	var toDate = new Date();
	var yyyy = toDate.getFullYear();
	var mm = toDate.getMonth()+1;
	var dd = toDate.getDate();
	mm = (mm < 10) ? '0' + mm : mm;
	dd = (dd < 10) ? '0' + dd : dd;
	return itp_fn_get_date_lang_format(yyyy, mm, dd, split);
};

function itp_fn_get_bom_today(split) {
	var retVal = '';
	if (split == null || split == undefined) split = '.';
	//var toDate = new Date();
	var yyyy = "2099";
	var mm = "12";
	var dd = "31";
	mm = (mm < 10) ? '0' + mm : mm;
	dd = (dd < 10) ? '0' + dd : dd;
	return itp_fn_get_date_lang_format(yyyy, mm, dd, split);
};

function itp_fn_get_today_ko(split) {
	var retVal = '';
	if (split == null || split == undefined) split = '.';
	var toDate = new Date();
	var yyyy = toDate.getFullYear();
	var mm = toDate.getMonth()+1;
	var dd = toDate.getDate();
	mm = (mm < 10) ? '0' + mm : mm;
	dd = (dd < 10) ? '0' + dd : dd;
	return yyyy + split + mm + split + dd;
};

function itp_fn_get_before_month(dateStr, addMonth, split) {
	if (split == null || split == undefined) split = '.';
	dateStr = itp_fn_delete_date_format(dateStr);
	var yyyy = dateStr.substring(0,4),
		mm = parseInt(dateStr.substring(4,6), 10),
		dd = parseInt(dateStr.substring(6), 10),
		date = new Date(yyyy, mm-1, dd);
	date.setMonth(date.getMonth() - addMonth);
	yyyy = date.getFullYear();
	mm = date.getMonth()+1;
	dd = date.getDate();
	if (parseInt(mm) < 10) mm = '0' + mm;
	if (parseInt(dd) < 10) dd = '0' + dd;
	return itp_fn_get_date_lang_format(yyyy, mm, dd, split);
};

function itp_fn_get_after_month(dateStr, addMonth, split) {
	if (split == null || split == undefined) split = '.';
	dateStr = itp_fn_delete_date_format(dateStr);
	var yyyy = dateStr.substring(0,4),
		mm = parseInt(dateStr.substring(4,6), 10),
		dd = parseInt(dateStr.substring(6), 10),
		date = new Date(yyyy, mm-1, dd);
	date.setMonth(date.getMonth() + addMonth);
	yyyy = date.getFullYear();
	mm = date.getMonth()+1;
	dd = date.getDate();
	if (parseInt(mm) < 10) mm = '0' + mm;
	if (parseInt(dd) < 10) dd = '0' + dd;
	return itp_fn_get_date_lang_format(yyyy, mm, dd, split);
};

function itp_fn_get_last_day(dateStr, month, split) {
	if (split == null || split == undefined) split = '.';
	var _tmp = '';
	if (dateStr == null || dateStr == undefined) _tmp = itp_fn_get_today_ko('');
	else _tmp = itp_fn_delete_date_format(dateStr);
	var yyyy = _tmp.substring(0,4),
		mm = _tmp.substring(4,6);
	if (month != null && month != undefined) mm = month;
	var dd = (new Date(yyyy,mm,0)).getDate();
	return itp_fn_get_date_lang_format(yyyy, mm, dd, split);
};

function itp_fn_get_first_day(dateStr, split) {
	if (split == null || split == undefined) split = '.';
	var _tmp = '';
	if (dateStr == null || dateStr == undefined) _tmp = itp_fn_get_today_ko('');
	else _tmp = itp_fn_delete_date_format(dateStr);
	var yyyy = _tmp.substring(0,4)
		,mm = _tmp.substring(4,6)
		,dd = '01';
	return itp_fn_get_date_lang_format(yyyy, mm, dd, split);
};

function itp_fn_delete_date_format(str) {
	var temp = '';
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == '-' || str.charAt(i) == '.' || str.charAt(i) == '/' || str.charAt(i) == ':') {
			continue;
		} else {
			temp += str.charAt(i);
		}
	}
	return	temp;
};

function itp_fn_get_url_param(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
       return null;
    } else {
       return results[1] || 0;
    }
};

var itp_fn_get_param_value = function(params, key){
    var results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(params);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function itp_fn_close_other_tab(tabId) {
	
	$('#ITP_HEADER .itp_tab_list li').each(function() {
		var tmpId = $(this).find('.itp_tab_close').attr('data-itp-tab-id');
		console.log("=================");
		if(tmpId) {
			 //console.log('### MEMU : ' + tmpId + ', ACTIVE : ' + $(this).hasClass('active'), ' , tabId : ' + tabId);
			//if($(this).hasClass('active') == false && tmpId != tabId) {			
			if(tmpId != tabId) {
				$(this).find('.itp_tab_close').trigger('click');
			}
		}
	});
	
	$('#ITP_HEADER .itp_tab_list a[href="#ITP_TAB_'+tabId+'"]').trigger('click');		
}

function itp_fn_open_tab(param) {
	const id = param.navId;
	const tabSize = $('#ITP_HEADER .itp_tab_list li').size();

	if (tabSize > 15) {
		itp_fn_modal_alert(ITP_MSG_LOCALE.message.page.noMoreTab);
		return false;
	}

	let isDup = false;
	$('#ITP_HEADER .itp_tab_list li').each(function() {
		const tab_id = $(this).find('.itp_tab_close').attr('data-itp-tab-id');
		if (tab_id == id) {
			isDup = true;
			$('#ITP_HEADER .itp_tab_list li').removeClass('active');
        	$('#ITP_CONTAINER .itp_contents .itp_sec').removeClass('active');
        	$(this).addClass('active');
        	$('#ITP_TAB_' + id).addClass('active');
			return false;
		}
	});

	if (!isDup) {
		const href = '/' + id;
		let text = $('#' + id + '_PAGE_NO').children('.itp_tt').text();
		if (param.titId !== null && param.titId !== undefined && param.titId != '') {
			text = $('#' + param.titId + '_PAGE_NO').children('.itp_tt').text();
		}
		const tab = '<li class="active"><a href="#ITP_TAB_' + id + '" role="tab" data-toggle="tab" class="itp_tab_open">' + text + ' <i class="glyphicon glyphicon-remove itp_tab_close" data-itp-tab-id="' + id + '"></i></a></li>';
		itp_fn_load_page(href, tab);
	} else {
		itp_fn_fire_window_resize();
	}

	return false;
};

function itp_fn_open_tab_self(param, fn) {
	const id = param.navId;
	const tabSize = $('#ITP_HEADER .itp_tab_list li').size();

	if (tabSize > 15) {
		itp_fn_modal_alert(ITP_MSG_LOCALE.message.page.noMoreTab);
		return false;
	}

	let isDup = false;
	$('#ITP_HEADER .itp_tab_list li').each(function() {
		const tab_id = $(this).find('.itp_tab_close').attr('data-itp-tab-id');
		if (tab_id == id) {
			isDup = true;
			$('#ITP_HEADER .itp_tab_list li').removeClass('active');
        	$('#ITP_CONTAINER .itp_contents .itp_sec').removeClass('active');
        	$(this).addClass('active');
        	$('#ITP_TAB_' + id).addClass('active');
        	fn(param);
			return false;
		}
	});

	if (!isDup) {
		const href = '/' + id;
		const tab = '<li class="active"><a href="#ITP_TAB_' + id + '" role="tab" data-toggle="tab" class="itp_tab_open">' + param.menuTit + ' <i class="glyphicon glyphicon-remove itp_tab_close" data-itp-tab-id="' + id + '"></i></a></li>';
		const key = $.param(param);
		itp_fn_load_page(href, tab, key);
	} else {
		itp_fn_fire_window_resize();
	}

	return false;
};


function itp_fn_set_file_upload(wrap, folder, multi, thumb, screen, arg, fn) {
	if (thumb) {
		multi = false;
		ITP_UPLOAD_DEFAULTS = {
			fileTypes: {
				images: ['bmp', 'tif', 'tiff', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'ico', 'raw']
			}
		};
	}
	$('#' + wrap).bootstrapFileUpload({
		url: DOMAIN + '/api/file/upload',
		inputName: 'uploadFile',
		folderName: folder,
		fileNumber: arg.fileNo,
		fileInput: arg.fileId,
		fileTypes: ITP_UPLOAD_DEFAULTS.fileTypes,
		viewCode: arg.viewCd,
		formMethod: 'post',
		multiFile: multi,
		multiUpload: false,
		maxSize: 100,
		maxFiles: 5,
		showThumb: thumb,
		thumbWidth: 80,
  		thumbHeight: 80,
		debug: true, 
		screen_id: screen,
		showYn: arg.showYn,
		onFileAdded: function() {
			$.bootstrapFileUpload('uploadStart', wrap);
		},
		onInit: function() {
			$('#' + wrap).on('click', 'table.fileupload-download .filedownload-remove', function() {
				var trRow = $(this).closest('tr.fileupload-downloadrow');
				var tdData = trRow.children('td.itp_file_info');
				var pFileNo = tdData.attr('data-file-no');
				var pFileSeq = tdData.attr('data-file-seq');
				const param = {'fileNo': pFileNo, 'fileSeq': pFileSeq};
				$.ajax({
					contentType: 'application/json',
					url: DOMAIN + '/api/file/delete',
					data: JSON.stringify(param),
			        type: 'DELETE',
			        async: false,
			        timeout: 10000,
			        xhrFields: {
						withCredentials: true //Cross Domain 처리
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader('X-AUTH-TOKEN', CONN_KEY); //Jwt 토큰을 헤더에 담아서 보낸다.
					},
			        success: function(result) {
			        	trRow.hide();
		        		trRow.remove();
		        		if(fn && $.isFunction(fn)) {
							fn(param);
						}
			        },
			        error: function(xhr, status, error) {
						if (xhr.responseJSON !== undefined) { //실패시 서버에서 내려주는 메세지 얼럿
							itp_fn_modal_alert_ajax(xhr.responseJSON.message);
							if (xhr.status == 401) { //401에러가 떨어지면 로그인페이지로 이동
								sessionStorage.removeItem('itp_login_info'); //Jwt 키 제거
								$(location).attr('href', ITP_CONTEXTPATH + '/login.html');
							}
						} else {
							itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
						}
					},
					fail: function() {
						itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
					}
				});
			});
		}
	});
};

function itp_fn_check_file_uploading(fileId) {
	let isUploading = false;
	const fileCount = $(fileId).find('table.fileupload-preview tbody.files tr.row').length;
	if (fileCount > 0) {isUploading = true;}
	return isUploading;
};

function itp_fn_check_file_validate(fileId) {
	let isValidate = false;
	const downCount = $(fileId).find('table.fileupload-download tbody tr.row').length;
	const fileCount = $(fileId).find('table.fileupload-preview tbody.files tr.row').length;
	if (downCount < 1) {
		if (fileCount < 1) {isValidate = true;}
	}
	return isValidate;
};

function itp_fn_upload_thumb(input, img, cont, fileNo, folder) {
	if ($(input).val() != '') {
		if ($(img).attr('data-thumb-yn') == 'Y') {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.upload.deleteFile);
			return;
		}

		const ext = $(input).val().split('.').pop().toLowerCase();
		if ($.inArray(ext, ['gif', 'jpg', 'jpeg', 'png']) == -1) {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.upload.fileType);
			$(input).val('');
			return;
		}

		let fileSize = input.files[0].size;
		fileSize = (fileSize / 1024) / 1024;
		const maxSize = 10;
		if (fileSize > maxSize) {
			itp_fn_modal_alert(maxSize + 'MB' + ITP_MSG_LOCALE.message.upload.fileSize);
			$(input).val('');
			return;
		}

		const hh = $(img).height();
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
                $(img).attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
            $(img).css('height', hh);
		}

		var formData = new FormData();
		formData.append('uploadFolder', folder);
		formData.append('fileNo', fileNo);
		formData.append('uploadFile', input.files[0], input.files[0].name);

		$.ajax({
			url: ITP_CONTEXTPATH + '/uploadFile',
			type: 'post',
			data: formData,
			enctype: 'multipart/form-data',
			cache: false,
			contentType: false,
			processData: false,
			success: function(result) {
	        	if (result.resultCd == 'E') {
	        		itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
	        		$(img).attr('src', ITP_CONTEXTPATH + '/images/noImg.png');
	        		$(img).attr('data-thumb-yn', 'N');
	        	} else {
	        		$(img).attr('data-file-nm', result.resultData.FILE[0].fileNm);
	        		$(img).attr('data-thumb-yn', 'Y');
	        	}
	        },
	        error: function(xhr, status, error) {
				if(xhr.status == 401) location.reload();
	        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
	        },
	        fail: function() {
	        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
	        }
		});
	}
};

function itp_fn_delete_thumb(img, input, fileNo) {
	var fileNm = $(img).attr('data-file-nm');
	const param = {'fileNo': fileNo, 'fileNm': fileNm};

	if ($(img).attr('data-thumb-yn') == 'N') {
		itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.upload.fileNeed);
		return;
	}

	$.ajax({
		contentType: 'application/json',
		url: ITP_CONTEXTPATH + '/deleteFileByNm',
		data: JSON.stringify(param),
        type: 'POST',
        dataType: 'json',
        async: false,
        timeout: 10000,
        success: function(result) {
        	if (result.resultCd == 'E') {
        		itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        	} else {
        		$(img).attr('src', ITP_CONTEXTPATH + '/images/noImg.png');
        		$(img).attr('data-thumb-yn', 'N');
        		$(input).val('');
        	}
        },
        error: function(xhr, status, error) {
			if(xhr.status == 401) location.reload();
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        }
	});
};

function itp_fn_thumb_validate(img, inline) {
	var error = function(msg) {
		$ele = $(img).closest('.itp_thumb_area');
		$ele.closest('.form-group').addClass('has-error');
		var error_msg = $('<span class="help-block">' + msg + '</span>');
		if (inline == 'inline') {
			$ele.append(error_msg);
		} else {
			error_msg.insertAfter($ele);
		}
	};

	if ($(img).attr('data-thumb-yn') == 'N') {
		error(ITP_MSG_LOCALE.message.upload.fileNeed);
		return;
	}

	return true;
};

function itp_fn_get_image_thumbnail(id, w, h) {
	let fileInfo = document.getElementById(id).files[0];
	let reader = new FileReader();
	reader.onload = function() {
		document.getElementById(id + '_IMG').src = reader.result;
	};
	if (fileInfo) {
		if(!/\.(jpg|jpeg)$/i.test(fileInfo.name)) {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.form.onlyImage);
			return;
		}
		var _URL = window.URL || window.webkitURL;
		var img = new Image();
        img.src = _URL.createObjectURL(fileInfo);
        img.onload = function() {
        	//console.log(img.width + ' ' + img.height);
            if (img.width != w || img.height != h) {
            	//itp_fn_modal_alert(ITP_MSG_LOCALE.message.form.noImageSize);
    			//return;
            }
        	reader.readAsDataURL(fileInfo);
        }
	}
};

function itp_fn_get_category_thumbnail(id, w, h) {
	let fileInfo = document.getElementById(id).files[0];
	let reader = new FileReader();
	reader.onload = function() {
		document.getElementById(id + '_IMG').src = reader.result;
	};
	if (fileInfo) {
		if(!/\.(jpg|jpeg|png)$/i.test(fileInfo.name)) {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.form.onlyImage2);
			return;
		}
		var _URL = window.URL || window.webkitURL;
		var img = new Image();
        img.src = _URL.createObjectURL(fileInfo);
        img.onload = function() {
        	//console.log(img.width + ' ' + img.height);
            if (img.width != w || img.height != h) {
            	//itp_fn_modal_alert(ITP_MSG_LOCALE.message.form.noImageSize);
    			//return;
            }
        	reader.readAsDataURL(fileInfo);
        }
	}
};

function itp_fn_get_image_intro(obj, w, h) {
	let isLoad = true;
	let fileInfo = obj.files[0];
	let reader = new FileReader();
	reader.onload = function() {
		$(obj).closest('li').find('.itp_img_img').attr('src', reader.result);
	};
	if (fileInfo) {
		if(!/\.(jpg|jpeg)$/i.test(fileInfo.name)) {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.form.onlyImage);
			isLoad = false;
			return;
		}
		var _URL = window.URL || window.webkitURL;
		var img = new Image();
        img.src = _URL.createObjectURL(fileInfo);
        img.onload = function() {
        	//console.log(img.width + ' ' + img.height);
            if (img.width != w || img.height != h) {
            	//itp_fn_modal_alert(ITP_MSG_LOCALE.message.form.noImageSize);
            	//isLoad = false;
    			//return;
            }
        	reader.readAsDataURL(fileInfo);
        }
	}
	return isLoad;
};

function itp_fn_set_upload_file(id) {
	let fileInfo = document.getElementById(id).files[0];
	$('#' + id + '_NM').html(fileInfo.name).show();
};

function itp_fn_set_smart_editor(oEditors, sLang, textarea) {
	if (sLang == 'en') {
		sLang = sLang + '_US';
	} else {
		sLang = sLang + '_KR';
	}
	const aAdditionalFontSet = [['MS UI Gothic', 'MS UI Gothic'], ['Comic Sans MS', 'Comic Sans MS']];
	nhn.husky.EZCreator.createInIFrame({
		oAppRef: oEditors,
		elPlaceHolder: textarea,
		sSkinURI: ITP_CONTEXTPATH + '/se2/SmartEditor2Skin_' + sLang + '.html',
		htParams: {
			bUseToolbar: true,
			bUseVerticalResizer: false,
			bUseModeChanger: true,
			bSkipXssFilter: true,
			aAdditionalFontList: aAdditionalFontSet,
			fOnBeforeUnload: function() {

			},
			I18N_LOCALE: sLang
		},
		fOnAppLoad: function() {
			var sDefaultFont = 'Times New Roman';
			var nFontSize = 10;
			oEditors.getById[textarea].setDefaultFont(sDefaultFont, nFontSize);
		},
		fCreator: 'createSEditor2'
	});
};

function itp_fn_search_tabs_detail(tabs, wrap) {
	$(wrap).on('click', tabs + ' li a', function() {
		const href = $(this).attr('href');
		itp_fn_load_tabs(wrap, href);
		return false;
	});
};

// [수발주 추가]
function itp_fn_grid_make_remote(option) {
	var options = $.extend({
		mtype: 'POST',
		multiselect: false,
		rownumbers: true,
		
		ondblClickRow: null,
		loadBeforeSend: function(jqXHR) {
			jqXHR.setRequestHeader('X-AUTH-TOKEN', CONN_KEY);
		},
		onPaging: function(action) {
			itp_fn_grid_paging(option.gridId, action, option.param);
		},
		loadError: function(jqXHR, textStatus, errorThrown) {
			itp_fn_grid_load_error(jqXHR, textStatus, errorThrown);
		}
	}, option);

	$(options.gridId).jqGrid({
		colModel: options.colModel,
		postData: JSON.stringify(options.param),
		mtype: options.mtype,
		url: options.url,
		pager: options.pager,
		multiselect: options.multiselect,
		rownumbers: options.rownumbers,
		beforeSelectRow: function(rowId, e) { 
			var grid=$(this), iCol = $.jgrid.getCellIndex(e.target), cm=grid.jqGrid('getGridParam', 'colModel');
			var field=cm[iCol].name; 
			return  field=='cb' ? true: false;
		},
		loadBeforeSend: options.loadBeforeSend,
		onCellSelect: options.onCellSelect,
		ondblClickRow: options.ondblClickRow,
		beforeProcessing: options.beforeProcessing,
		loadComplete: options.loadComplete,
		loadError: options.loadError,
		onPaging: options.onPaging
	}).navGrid(options.pager, ITP_GRID_NAV_DEFAULTS.navGrid);
}

function itp_fn_grid_make_not_paging(option) {
	var options = $.extend({
		mtype: 'POST',
		multiselect: false,
		rownumbers: false,
		loadBeforeSend: function(jqXHR) {
			jqXHR.setRequestHeader('X-AUTH-TOKEN', CONN_KEY);
		},
		loadError: function(jqXHR, textStatus, errorThrown) {
			itp_fn_grid_load_error(jqXHR, textStatus, errorThrown);
		}
	}, option);
	$(options.gridId).jqGrid({
		colModel: options.colModel,
		postData: JSON.stringify(options.param),
		mtype: options.mtype,
		url: options.url,
		multiselect: options.multiselect,
		rownumbers: options.rownumbers,
		loadBeforeSend: options.loadBeforeSend,
		onCellSelect: options.onCellSelect,
		loadComplete: options.loadComplete,
		loadError: options.loadError,
		rowNum: options.rowNum
	});
}

function itp_fn_grid_make_local(option) {
	var options = $.extend({
		multiselect: false,
		rownumbers: false,
		cellEdit: false,
		cellsubmit: 'clientArray',
		onCellSelect: null,
		afterSaveCell: null,
		afterEditCell: null
	}, option);
	$(option.gridId).jqGrid({
		colModel: options.colModel,
		data: options.data,
		datatype: 'local',
		multiselect: options.multiselect,
		rownumbers: options.rownumbers,
		cellEdit: options.cellEdit,
		cellsubmit: options.cellsubmit,
		loadComplete: options.loadComplete,
		onCellSelect: options.onCellSelect,
		afterSaveCell: options.afterSaveCell,
		afterEditCell: options.afterEditCell
	});
}

function itp_fn_grid_paging(grid_id, action, args) {
	var gridOption = $(grid_id).jqGrid('getGridParam');
	const suffix = gridOption.pager;
	let currentPage = gridOption.page;
	const lastPage = gridOption.lastpage;
    const userPage = $(suffix).find('.ui-pg-input').val();
	if(!currentPage) currentPage=1;
    if (action == 'next') {
        if (currentPage < lastPage) {
            currentPage += 1;
        }
    } else if (action == 'prev') {
        if (currentPage > 0 && currentPage != 1) {
            currentPage -= 1;
        }
    } else if (action == 'first') {
        currentPage = 1;
    } else if (action == 'last') {
        currentPage = lastPage;
    } else if (action == 'user') {
        if (userPage > lastPage || userPage < 1) {
            return 'stop';
        } else {
            currentPage = userPage;
        }
    }

    var param=$(grid_id).data('grid-param');
	if( typeof param=='object' ) {
		console.log("itp_fn_grid_paging param==",param);
	} else {
		param=args;
	}
    param.gridPage = currentPage;
    $(grid_id).setGridParam( {'postData': JSON.stringify(param)});
};

function itp_fn_grid_sorting(grid_id, index, sortOrder, args) {
	args.sidx = index;
	args.sord = sortOrder;
	$(grid_id).setGridParam({
        postData : JSON.stringify(args)
    });
};

function itp_fn_grid_load_complete(data, gridId, paging, rn, menuId, isSrh, emptyFn, isView, totCnt, totPage, emptyMsg, helpMsg, excelDownloadId, excelUploadId) {

	if (data.resultCd == 'E') {
		itp_fn_modal_alert(ITP_MSG_LOCALE.message.ajax.failData);
	} else {
		const rowCnt = $(gridId).jqGrid('getGridParam', 'records');
		const shrinkToFit = $(gridId).getGridParam('shrinkToFit');
		const gridNm = gridId.slice(1);

		if (emptyMsg === null || emptyMsg === undefined) {
			emptyMsg = ITP_MSG_LOCALE.message.grid.noData;
		}
		if (isSrh) {
			emptyMsg = ITP_MSG_LOCALE.message.grid.noSrh;
			$('#ITP_' + menuId + '_jqGridEmpty').addClass('itp_noSrh');
		} else {
			$('#ITP_' + menuId + '_jqGridEmpty').removeClass('itp_noSrh');
		} 
		if (rowCnt == 0) {
			$(gridId + '_list').find('.ui-jqgrid-bdiv').css('min-height', '100px');
			$('#ITP_' + menuId + '_jqGridEmpty').html(emptyMsg);
			$('#ITP_' + menuId + '_jqGridEmpty').show();
		} else {
			$(gridId + '_list').find('.ui-jqgrid-bdiv').css('min-height', 'auto');
			$('#ITP_' + menuId + '_jqGridEmpty').hide();
			if (isSrh) {emptyFn.push();}
		}

		if (shrinkToFit) {
			$(gridId + '_list').find('.ui-jqgrid .ui-jqgrid-bdiv').css('overflow-x', 'auto');
		} else {
			$(gridId + '_list').find('.ui-jqgrid .ui-jqgrid-bdiv').css('overflow-x', 'auto');
		} 
		if (paging) {
			$(gridId + 'Pager_center').show();
			if (!totPage) {
				$(gridId + 'Pager_right').css('visibility', 'hidden');
			}
		} else {
			$(gridId + 'Pager_center').hide();
			$(gridId + 'Pager_right').hide();
		}

		if (rn == 'number') {$('#jqgh_' + gridNm + '_rn').text(ITP_MSG_LOCALE.label.numbering);}
		if (rn == 'order') {$('#jqgh_' + gridNm + '_rn').text(ITP_MSG_LOCALE.label.ordering);}
		if (rn == 'rank') {$('#jqgh_' + gridNm + '_rn').text(ITP_MSG_LOCALE.label.ranking);}

		if (isView) {
			let viewHtml = '';
			viewHtml += '<span class="itp_shrv fix">';
			viewHtml += '<span class="shrv_txt"><b>' + ITP_MSG_LOCALE.label.srhResult + '</b></span>';
			viewHtml += '<span class="shrv_num">(<em>' + rowCnt + '</em>)</span>';
			viewHtml += '<span class="shrv_bar">|</span>';
			viewHtml += '<span class="shrv_txt">' + ITP_MSG_LOCALE.label.total + '</span>';
			viewHtml += '<span class="shrv_num shrv_tot">(<em>' + totCnt + '</em>)</span>';
			
			if (helpMsg !== null && helpMsg !== undefined && helpMsg != '') {
				viewHtml += '<span class="shrv_help">' + helpMsg + '</span>';
			}
			viewHtml += '</span>';
			
			if (excelDownloadId !== null && excelDownloadId !== undefined && excelDownloadId != '') {
				viewHtml += '<span class="itp_shrx fix">';				
				viewHtml += '<span class="shrx_txt" id="'+excelDownloadId+'"><b>엑셀 다운로드</b></span>';
				if (excelUploadId !== null && excelUploadId !== undefined && excelUploadId != '') {
					viewHtml += '<span class="shrx_bar">|</span>';
					viewHtml += '<span class="shrx_txt" id="'+excelUploadId+'"><b>엑셀 일괄저장</b></span>';
				}
				viewHtml += '</span>';
			} 
			
			$('#ITP_' + menuId + '_jqGridView').html(viewHtml).show();
		}

		$(gridId).on('focus', 'td[role="gridcell"] .editable', function() {
			$(this).closest('tr[editable="1"] td').trigger('click');
		});
	}
};

function itp_fn_grid_file_select(menuId, fileSelectId, helpMsg) {
				
	let viewHtml = '';

	viewHtml += '<span class="itp_shrv fix">';
	if (helpMsg !== null && helpMsg !== undefined && helpMsg != '') {
		viewHtml += '<span class="shrv_help">' + helpMsg + '</span>';
	}
	viewHtml += '</span>';
	
	if (fileSelectId !== null && fileSelectId !== undefined && fileSelectId != '') {
		viewHtml += '<span class="itp_shrx fix">';				
		viewHtml += '<input id="'+fileSelectId+'_FILE" type="file" style="display:none;" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">';				
		viewHtml += '<span class="shrx_txt" id="'+fileSelectId+'"><b>파일 선택</b></span>';
		viewHtml += '</span>';
	}
	
	$('#ITP_' + menuId + '_jqGridView').html(viewHtml).show();
	
};

function itp_fn_grid_load_error(jqXHR, textStatus, errorThrown) {
	// console.log(JSON.stringify(jqXHR));
	
	if (jqXHR.status == 401) location.href = ITP_CONTEXTPATH + '/';

	if(jqXHR.responseJSON.message) {
		itp_fn_modal_alert(jqXHR.responseJSON.message); 
	} else {
		itp_fn_modal_alert(ITP_MSG_LOCALE.message.ajax.failData);	
	}	
};

function itp_fn_grid_validate_row(gridId, msg) {
	const rids = $(gridId).jqGrid('getDataIDs');
	for (var idx in rids) {
		$(gridId).jqGrid('saveRow', rids[idx]);
	}

	var inputs = $(gridId).find('tr[editable="1"]');
	if (inputs.length > 0) return false;
	let isValidate = true;
	$(gridId).find('tr[editable="0"]').children('td[role="gridcell"]').find('.editable').each(function() {
		if ($(this).val() == '') {
			$(this).closest('tr[editable="0"] td').trigger('click');
			isValidate = false;
			return false;
		}
	});
	if (!isValidate) {return false;}
	var rows = $(gridId).find('tr.jqgrow[role="row"]:visible');
	if (rids.length == 0 || rows.length < 1) {
		if (msg == undefined || typeof msg == 'undefined') {
			itp_fn_modal_alert(ITP_MSG_LOCALE.message.ajax.noData);
		} else {
			itp_fn_modal_alert(msg);
		}
		return false;
	}
	return true;
};

function itp_fn_set_data_editable(rowId, cellIdx, lastrowid, gridId, cm, addRow) {
	if (true == true && cellIdx == 0) return;
	if (rowId) {
		const viewCd = $(gridId).jqGrid('getRowData', rowId).viewCd;
		if (viewCd == 'R') {
			$(gridId).jqGrid('setCell', rowId, 'viewCd', 'U');
		}
		if (lastrowid && rowId != lastrowid) {
			$(gridId).jqGrid('saveRow', lastrowid);
		}
		if (cm !== undefined || typeof cm !== 'undefined') {
			if (cm !== null) {
				let edittype = true;
				if (addRow) {
					edittype = false;
				} else {
					if (viewCd == 'C') {edittype = true;} else {edittype = false;}
				}
				const cols = $(gridId).jqGrid('getGridParam', 'colModel');
				for (var i=0; i<cols.length; i++) {
					for (var j=0; j<cm.length; j++) {
						if (cols[i].name == cm[j]) {
							$(gridId).jqGrid('setColProp', cols[i].name, {editable: edittype});
						}
					}
				}
			}
		}

		$(gridId).jqGrid('editRow', rowId, true);
		lastrowid = rowId;
	}
	return lastrowid;
};

function itp_fn_set_all_row_editable(gridId) {
	var ids = $(gridId).getDataIDs();
	$.each(ids, function(idx, rowId) {
		$(gridId).jqGrid('editRow', rowId, true);
	});
	var i, count, $grid = $(gridId);
    var rowArray = $(gridId).jqGrid('getDataIDs');
    for (i = 0, count = rowArray.length; i < count; i += 1) {
        $grid.jqGrid('setSelection', rowArray[i], false);
    }
    $(gridId).find('tr[editable="1"]').children('td[role="gridcell"]').find('.editable').each(function() {
    	$(this).css({
    		'border': '1px solid #ccc',
    		'-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)',
    		'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075)'
    	});
	});
};

function itp_fn_set_row_editable(gridId, rowId) {
	$(gridId).jqGrid('editRow', rowId, true);
};

function itp_fn_grid_save_rows(gridId) {
	var rids = $(gridId).jqGrid('getDataIDs');
	for(var idx in rids) {
		$(gridId).jqGrid('saveRow', rids[idx]);
	}
	$(gridId).find('tr[editable="0"]').children('td[role="gridcell"]').find('.editable').each(function() {
		if ($(this).val() == '') {
			$(this).closest('tr[editable="0"] td').trigger('click');
			return false;
		}
	});
};

function itp_fn_grid_reset_selection(e, lastrowid, gridId, menuId) {
	if (lastrowid != '' && typeof lastrowid != 'undefined') {
		if (e.target.id == 'cb_' + gridId) return;
		if (e.target.id == 'ITP_BTN_' + menuId + '_ADDROW') return;
		if (e.target.id == 'ITP_BTN_' + menuId + '_DELROW') return;
		if ($(e.target).closest('#' + gridId).length == 0) {
			var rids = $('#' + gridId).jqGrid('getDataIDs');
			for(var idx in rids) {
				$('#' + gridId).jqGrid('saveRow', rids[idx]);
			}
			//$('#' + gridId).jqGrid('saveRow', lastrowid);
			$('#' + gridId).find('tr[editable="0"]').children('td[role="gridcell"]').find('.editable').each(function() {
				if ($(this).val() == '') {
					$(this).closest('tr[editable="0"] td').trigger('click');
					return false;
				}
			});
			// $('#' + gridId).resetSelection();
		}
	}
};

function itp_fn_grid_add_row(gridId, fn, cm, menuId) {
	if (cm !== undefined || typeof cm !== 'undefined') {
		if (cm !== null) {
			const cols = $(gridId).jqGrid('getGridParam', 'colModel');
			for (var i=0; i<cols.length; i++) {
				for (var j=0; j<cm.length; j++) {
					if (cols[i].name == cm[j]) {
						$(gridId).jqGrid('setColProp', cols[i].name, {editable: true});
					}
				}
			}
		}
	}
	$(gridId + '_list').find('.ui-jqgrid-bdiv').css('min-height', 'auto');
	$('#ITP_' + menuId + '_jqGridEmpty').hide();
	$(gridId).jqGrid('addRow', {position: 'last'});
	var rids = $(gridId).jqGrid('getDataIDs');
	var last_row_id = rids[rids.length - 1];
	$(gridId).jqGrid('setCell', last_row_id, 'viewCd', 'C');
	if (fn !== undefined || typeof fn !== 'undefined') {
		fn(last_row_id, rids.length);
	}
	return last_row_id;
};

function itp_fn_add_grid_row(gridId, fn, cm, menuId) {
	if (cm !== undefined || typeof cm !== 'undefined') {
		if (cm !== null) {
			const cols = $(gridId).jqGrid('getGridParam', 'colModel');
			for (var i=0; i<cols.length; i++) {
				for (var j=0; j<cm.length; j++) {
					if (cols[i].name == cm[j]) {
						$(gridId).jqGrid('setColProp', cols[i].name, {editable: false});
					}
				}
			}
		}
	}
	$(gridId + '_list').find('.ui-jqgrid-bdiv').css('min-height', 'auto');
	$('#ITP_' + menuId + '_jqGridEmpty').hide();
	$(gridId).jqGrid('addRow', {position: 'last'});
	var rids = $(gridId).jqGrid('getDataIDs');
	var last_row_id = rids[rids.length - 1];
	$(gridId).jqGrid('setCell', last_row_id, 'viewCd', 'C');
	if (fn !== undefined || typeof fn !== 'undefined') {
		fn(last_row_id, rids.length);
	}
	return last_row_id;
};

function itp_fn_grid_del_row(gridId) {
	const rowKey = $(gridId).getGridParam('selrow');
    if (!rowKey) {
    	return;
    }
    var selectedIds = $(gridId).getGridParam('selarrrow');
    for (var i=selectedIds.length-1; i>=0; i--) {
    	if ($(gridId).jqGrid('getRowData', selectedIds[i]).viewCd == 'C') {
    		$(gridId).delRowData(selectedIds[i]);
		} else {
			$(gridId).jqGrid('saveRow', selectedIds[i]);
			$(gridId).jqGrid('setCell', selectedIds[i], 'viewCd', 'D');
			$(gridId).find('tr#' + selectedIds[i]).css('display', 'none');
		}
   	}
};

function itp_fn_grid_tree_select(gridList, gridId) {
	$(gridList).on('click', 'input[name=chk]', function() {
		if ($(this).is(':checked')) {
			$(this).parent('td[role="gridcell"]').trigger('click');
		} else {
			$(gridId).jqGrid('resetSelection');
		}
		$(gridList).find('input[name=chk]').not($(this)).prop('checked', false);
	});
};

function itp_fn_grid_tree_select_row(gridList, rowId) {
	var checkbox = $(gridList).find('tr[role="row"]#' + rowId).find('input[name=chk]');
	checkbox.prop('checked', true);
	$(gridList).find('input[name=chk]').not(checkbox).prop('checked', false);
};

function itp_fn_check_grid_is_writing(gridId) {
	const rowData = $(gridId).getRowData();
	let isWriting = false;
	$.each(rowData, function(key, value) {
		if (value.viewCd != 'R') {
			isWriting = true;
			return;
		}
	});
	return isWriting;
};
function itp_fn_set_resize(grid_id, parent_id, size) { 
	var leftDist=0, prevWidth=0;
	const setGridCellWidth=function(cellIndex, cellWidth) {
		var idx=0;
		$(parent_id+' table').each(function() {
			if(idx++==0)
				$(this).find('th:eq('+cellIndex+')').each(function(){$(this).css('width',cellWidth);});
			else
				$(this).find('td:eq('+cellIndex+')').each(function(){$(this).css('width',cellWidth);});
		}); 
	}
	setTimeout(function() {
        var outerwidth = $(parent_id).width();
        if ($(window).width() < 1301 && size == 'sm') {
            outerwidth = 782;
        }
        if(outerwidth==100) return;
        if(leftDist==0) {
            leftDist= $(window).width() - outerwidth;
        }
        if( leftDist>0 && outerwidth>($(window).width()- leftDist) ) {
            outerwidth=$(window).width() - leftDist;
        }
        if(size && outerwidth < 780 ) outerwidth=782;
        $(grid_id).setGridWidth(outerwidth, true); 
        var cols = $(grid_id).getGridParam('colModel');

        if( Array.isArray(cols) && cols.length>1 ) {
            var idx=0, last=cols.length-1;
            for(var idx=0;idx<cols.length; idx++  ) {
                var c=cols[idx];
                if(c.hidden) continue;
                if(c.minwidth && c.minwidth>c.width ) {
                    setGridCellWidth(idx, c.minwidth);
                } else if(last==idx) {
                    setGridCellWidth(idx, c.width-2);
                }
            }
        }
    }, 250); 
};
function itp_fn_jqgrid_resize(grid_id, parent_id, size) { 
	var leftDist=0, prevWidth=0;
	const setGridCellWidth=function(cellIndex, cellWidth) {
		var idx=0;
		$(parent_id+' table').each(function() {
			if(idx++==0)
				$(this).find('th:eq('+cellIndex+')').each(function(){$(this).css('width',cellWidth);});
			else
				$(this).find('td:eq('+cellIndex+')').each(function(){$(this).css('width',cellWidth);});
		}); 
	}
	
	$(window).on('resize', function(e) {
		/*na 그리드 수평스크롤 체크 */ 
		setTimeout(function() {
			var outerwidth = $(parent_id).width();
			if ($(window).width() < 1301 && size == 'sm') {
				outerwidth = 782;
			}
			if(outerwidth==100) return;
			if(leftDist==0) {
				leftDist= $(window).width() - outerwidth;
			}
			if( leftDist>0 && outerwidth>($(window).width()- leftDist) ) {
				outerwidth=$(window).width() - leftDist;
			}
			if(size && outerwidth < 780 ) outerwidth=782;
			$(grid_id).setGridWidth(outerwidth, true); 
			var cols = $(grid_id).getGridParam('colModel');

			if( Array.isArray(cols) && cols.length>1 ) {
				var idx=0, last=cols.length-1;
				for(var idx=0;idx<cols.length; idx++  ) {
					var c=cols[idx];
					if(c.hidden) continue;
					if(c.minwidth && c.minwidth>c.width ) {
						setGridCellWidth(idx, c.minwidth);
					} else if(last==idx) {
						setGridCellWidth(idx, c.width-2);
					}
				}
			}
		}, 250); 
	}).resize();  
};

function itp_fn_make_set_combine(gridId, label, width, cols, hideCols) {
	$(gridId).jqGrid('setLabel', cols, label, '', {
		style: 'width:' + width + 'px;',
		colspan: '2'
	});
	$(gridId).jqGrid('setLabel', hideCols, '', '', {style: 'display:none;'});
};

function itp_fn_make_set_search(gridId, label, width, cols) {
	$(gridId).jqGrid('setLabel', cols, label, '', {
		style: 'width:' + width + 'px;',
		colspan: '2'
	});
	$(gridId).jqGrid('setLabel', cols + 'Img', '', '', {style: 'display:none;'});
};

function itp_fn_make_btn_search(cellvalue, options, rowObject) {
	var str = '<button class="btn btn-default btn-sm itp_btn" type="button"><i class="glyphicon glyphicon-search"></i></button>';
	return str;
};

function itp_fn_make_checkbox(cellvalue, options, rowObject) {
    var str = '<input type="checkbox" name="chk">';
    return str;
};

function itp_fn_add_excel_btn(gridId, pagerId, fileNm, href, $params) {
	$(gridId).navButtonAdd(pagerId, {
		buttonicon: 'glyphicon glyphicon-download-alt',
		title: ITP_MSG_LOCALE.button.excelDown,
		caption: '',
		position: 'last',
		onClickButton: function() {
			let params = $params.serializeObject();
			let colsNm = [], colsLb = [], colsWd = [], colsAg = [];
			const cols = $(gridId).jqGrid('getGridParam', 'colModel');
			for (var i=0; i<cols.length; i++) {
				if (cols[i].hidden == false && cols[i].name != 'rn') {
					//console.log('colsNm==>>' + colsNm);
					colsNm.push(cols[i].name);
					colsLb.push(cols[i].label);
					colsWd.push(cols[i].width);
					colsAg.push(cols[i].align);
				}
			}
			params.excelNm = fileNm;
			params.pagingYn = false;

			let inputs = '';
			const data = $.param(params);
			$.each(data.split('&'), function() {
	            var pair = this.split('=');
	            inputs += '<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
	        });
			inputs += '<input type="hidden" name="colsNm" value="' + colsNm + '" />';
			inputs += '<input type="hidden" name="colsLb" value="' + colsLb + '" />';
			inputs += '<input type="hidden" name="colsWd" value="' + colsWd + '" />';
			inputs += '<input type="hidden" name="colsAg" value="' + colsAg + '" />';
			//console.log(inputs); return;
			$('<form action="' + href + '" method="post">' + inputs + '</form>')
	        .appendTo('body').submit().remove();
		}
	});
};

function itp_fn_download_excel(fileNm, href, $params) {
	let params = $params.serializeObject();

	params.excelNm = fileNm;
	params.pagingYn = false;

	let inputs = '';
	const data = $.param(params);
	$.each(data.split('&'), function() {
        var pair = this.split('=');
        inputs += '<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
    });
	//console.log(inputs); return;
	$('<form action="' + href + '" method="post">' + inputs + '</form>')
    .appendTo('body').submit().remove();
};

function itp_fn_grid_make_cell_link(gridId, cells, text, css) {
	var ids = $(gridId).jqGrid('getDataIDs');
	var gridData = $(gridId).jqGrid('getRowData');
	for (var i=0; i < gridData.length; i++) {
		for (var j=0; j < cells.length; j++) {
			$(gridId).jqGrid('setCell', ids[i], cells[j], text, css);
		}
	}
};

function itp_fn_grid_save_row(gridId) {
	var rids = $(gridId).jqGrid('getDataIDs');
	for (var idx in rids) {
		$(gridId).jqGrid('saveRow', rids[idx]);
	}
};

function itp_fn_fire_window_resize() {
	var evt = document.createEvent('HTMLEvents');
	evt.initEvent('resize', true, false);
	window.dispatchEvent(evt);
};

function itp_fn_make_select(options, select_id) {
	$(select_id).empty();
	$('<option/>', {'value': '', 'text': ITP_MSG_LOCALE.label.selected}).prependTo(select_id);
	$.each(options, function(key, value) {
		$('<option/>', {
            'value': this.codeCd,
            'text': this.codeNm
        }).appendTo(select_id);
	});
};

String.prototype.rPad = function (n, c) {
	var i; var a = this.split('');
	for (i = 0; i < n - this.length; i++) {a.push (c);};
	return a.join('');
};

var StringBuffer = function(){
	this.buffer = new Array();
}

StringBuffer.prototype.append = function(obj){
	this.buffer.push(obj);
}

StringBuffer.prototype.toString = function(){
	return this.buffer.join("");
}

function itp_fn_number_comma(str, dec) {
	var roundXL = function(n, digits) {
		if (digits >= 0) return parseFloat(n.toFixed(digits));
		digits = Math.pow(10, digits);
		var t = Math.round(n * digits) / digits;
		return parseFloat(t.toFixed(0));
	};

    var nStr = (str == undefined || str == 'null' ? '' : str) + '';
    var nDec = (dec == undefined ? -1 : dec);
    if (nStr == '') return nStr;
    nStr = nStr.replace(/,/g, '');
    var x = (nDec === -1 ? nStr : roundXL(Number(nStr), nDec) + '').split('.'),
        x1 = x[0].replace(/,/g, ''),
        x2 = x.length > 1 ? '.' + x[1] : '',
        rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
    if (nDec > 0) {
       if (x2 =='') x2 = '.' + x2.rPad(nDec, '0');
       else x2 = x2.rPad(nDec + 1, '0');
    } else if (nDec == 0) x2 = '';
    return x1 + x2;
};

function itp_fn_currency_fmatter(cellvalue, options, rowObject) {
	const currCd = rowObject[options.colModel.formatoptions.currCd];
	let dec = 0;
	if (currCd !== undefined && typeof currCd !== 'undefined') {
		if (currCd == 'USD') {
			dec = 2;
		}
	}
	return itp_fn_number_comma(cellvalue, dec);
};

function itp_fn_currency_fmatter_pop(currCd) {
	let dec = 2;
	if (currCd == 'USD') {
		dec = 2;
	}
	return {formatter: 'number', formatoptions: {decimalPlaces: dec}};
};

function itp_fn_currency_unfmatter(cellvalue, options, cell) {
	var value = cellvalue.replace(/,/gi, '');
	return value;
};

function itp_fn_time_fmatter(cellvalue, options, rowObject) {
	let time = '';
	if (cellvalue !== undefined && typeof cellvalue !== 'undefined') {
		if (cellvalue.length == 4) {
			const hh = cellvalue.substring(0, 2);
			const mm = cellvalue.substring(2, 4);
			time = hh + ':' + mm;
		}
	}
	return time;
};

function itp_fn_time_unfmatter(cellvalue, options, cell) {
	var value = cellvalue.replace(/:/gi, '');
	return value;
};

function itp_fn_modal_alert(msg) {
	$('#ITP_MODAL_ALERT_CANCEL').hide();
	$('#ITP_MODAL_ALERT').modal('show');
	$('#ITP_MODAL_ALERT').find('.itp_alert_txt').html(msg);
	$('#ITP_MODAL_ALERT_CONFIRM').off('click');
	$('#ITP_MODAL_ALERT_CONFIRM').on('click', function() {
		$('#ITP_MODAL_ALERT').modal('hide');
	});
};

function itp_fn_modal_alert_ajax(msg) {
	$('#ITP_MODAL_ALERT_AJAX').modal('show');
	$('#ITP_MODAL_ALERT_AJAX').find('.itp_alert_txt').html(msg);
	$('#ITP_MODAL_ALERT_AJAX_CONFIRM').off('click');
	$('#ITP_MODAL_ALERT_AJAX_CONFIRM').on('click', function() {
		$('#ITP_MODAL_ALERT_AJAX').modal('hide');
	});
};

function itp_fn_modal_duplicate(label, input) {
	let msg = ITP_MSG_LOCALE.message.form.duplicate;
	msg = msg.replace('{0}', label);
	$('#ITP_MODAL_ALERT_CANCEL').hide();
	$('#ITP_MODAL_ALERT').modal('show');
	$('#ITP_MODAL_ALERT').find('.itp_alert_txt').html(msg);
	$('#ITP_MODAL_ALERT_CONFIRM').off('click');
	$('#ITP_MODAL_ALERT_CONFIRM').on('click', function() {
		$('#ITP_MODAL_ALERT').modal('hide');
		if (input != null) {
			$(input).focus();
		}
	});
};

function itp_fn_modal_confirm(msg, fn, args) {
	$('#ITP_MODAL_ALERT_CANCEL').show();
	$('#ITP_MODAL_ALERT').modal('show');
	$('#ITP_MODAL_ALERT').find('.itp_alert_txt').html(msg);
	if (fn !== undefined || typeof fn !== 'undefined') {
		$('#ITP_MODAL_ALERT_CONFIRM').off('click');
		$('#ITP_MODAL_ALERT_CONFIRM').on('click', function() {
			fn.callBack(args);
			$('#ITP_MODAL_ALERT').modal('hide');
		});
	}
};
// 구매요청확인
function itp_fn_modal_confirm_req1(param, fn, args) {
	
	
	$('#ITP_MODAL_PR_ALERT_CANCEL').show();
	$('#ITP_MODAL_PR_ALERT').modal('show');
	$('#ITP_MODAL_PR_ALERT').find('.fnDlvReqDt').html(param.dlvReqDt);
	$('#ITP_MODAL_PR_ALERT').find('.fnItemcnt').html(param.itemcnt + " 개");
	$('#ITP_MODAL_PR_ALERT').find('.fnPchReqAmt').html(param.pchReqAtm + " 원");
	$('#ITP_MODAL_PR_ALERT').find('.fnPchPssblAmt').html(param.pchPssblAtm + " 원");
	$('#ITP_MODAL_PR_ALERT').find('.fnPchAmt').html(param.dlvReqAmt + " 원");
	
	if (fn !== undefined || typeof fn !== 'undefined') {
		console.log("config button");
		$('#ITP_MODAL_PR_ALERT_CONFIRM').off('click');
		$('#ITP_MODAL_PR_ALERT_CONFIRM').on('click', function() {
			console.log("config button function");
			fn.callBack(args);
			$('#ITP_MODAL_PR_ALERT').modal('hide');
		});
	}
};
//선불매장결제확인
function itp_fn_modal_confirm_req2(param, fn, args) {
	
	$('#ITP_MODAL_ALERT_ADV_CANCEL').show();
	$('#ITP_MODAL_ADV_ALERT').modal('show');
	$('#ITP_MODAL_ADV_ALERT').find('.fnDlvReqDt').html(param.dlvReqDt);
	$('#ITP_MODAL_ADV_ALERT').find('.fnItemcnt').html(param.itemcnt + " 개");
	$('#ITP_MODAL_ADV_ALERT').find('.fnPchReqAmt').html(param.pchReqAtm + " 원");
	$('#ITP_MODAL_ADV_ALERT').find('.fnPchPssblAmt').html(param.pchPssblAtm + " 원");
	$('#ITP_MODAL_ADV_ALERT').find('.fnPchAmt').html(param.dlvReqAmt + " 원");
	
	if (fn !== undefined || typeof fn !== 'undefined') {
		$('#ITP_MODAL_ALERT_ADV_CONFIRM').off('click');
		$('#ITP_MODAL_ALERT_ADV_CONFIRM').on('click', function() {
			fn.callBack(args);
			$('#ITP_MODAL_ADV_ALERT').modal('hide');
		});
	}
};
//구매한도부족알림
function itp_fn_modal_confirm_req3(param, fn, args) {
	
	$('#ITP_MODAL_ALERT_LM_CANCEL').show();
	$('#ITP_MODAL_LM_ALERT').modal('show');
	$('#ITP_MODAL_LM_ALERT').find('.fnDlvReqDt').html(param.dlvReqDt);
	$('#ITP_MODAL_LM_ALERT').find('.fnItemcnt').html(param.itemcnt + " 개");
	$('#ITP_MODAL_LM_ALERT').find('.fnPchReqAmt').html(param.pchReqAtm + " 원");
	$('#ITP_MODAL_LM_ALERT').find('.fnPchPssblAmt').html(param.pchPssblAtm + " 원");
	$('#ITP_MODAL_LM_ALERT').find('.fnPchAmt').html(param.dlvReqAmt + " 원");
	if (fn !== undefined || typeof fn !== 'undefined') {
		$('#ITP_MODAL_ALERT_LM_CONFIRM').off('click');
		$('#ITP_MODAL_ALERT_LM_CONFIRM').on('click', function() {
			fn.callBack(args);
			$('#ITP_MODAL_LM_ALERT').modal('hide');
		});
	}
};
//선불매장결제확인-임시저장
function itp_fn_modal_confirm_req4(param, fn, args) {
	
	$('#ITP_MODAL_ALERT_SAVE_ADV_CANCEL').show();
	$('#ITP_MODAL_SAVE_ADV_ALERT').modal('show');
	$('#ITP_MODAL_SAVE_ADV_ALERT').find('.fnDlvReqDt').html(param.dlvReqDt);
	$('#ITP_MODAL_SAVE_ADV_ALERT').find('.fnItemcnt').html(param.itemcnt + " 개");
	$('#ITP_MODAL_SAVE_ADV_ALERT').find('.fnPchReqAmt').html(param.pchReqAtm + " 원");
	$('#ITP_MODAL_SAVE_ADV_ALERT').find('.fnPchPssblAmt').html(param.pchPssblAtm + " 원");
	$('#ITP_MODAL_SAVE_ADV_ALERT').find('.fnPchAmt').html(param.dlvReqAmt + " 원");
	if (fn !== undefined || typeof fn !== 'undefined') {
		$('#ITP_MODAL_ALERT_SAVE_ADV_CONFIRM').off('click');
		$('#ITP_MODAL_ALERT_SAVE_ADV_CONFIRM').on('click', function() {
			fn.callBack(args);
			$('#ITP_MODAL_SAVE_ADV_ALERT').modal('hide');
		});
	}
};
//구매한도부족알림-임시저장
function itp_fn_modal_confirm_req5(param, fn, args) {
	
	$('#ITP_MODAL_ALERT_SAVE_LM_CANCEL').show();
	$('#ITP_MODAL_SAVE_LM_ALERT').modal('show');
	$('#ITP_MODAL_SAVE_LM_ALERT').find('.fnDlvReqDt').html(param.dlvReqDt);
	$('#ITP_MODAL_SAVE_LM_ALERT').find('.fnItemcnt').html(param.itemcnt + " 개");
	$('#ITP_MODAL_SAVE_LM_ALERT').find('.fnPchReqAmt').html(param.pchReqAtm + " 원");
	$('#ITP_MODAL_SAVE_LM_ALERT').find('.fnPchPssblAmt').html(param.pchPssblAtm + " 원");
	$('#ITP_MODAL_SAVE_LM_ALERT').find('.fnPchAmt').html(param.dlvReqAmt + " 원");
	if (fn !== undefined || typeof fn !== 'undefined') {
		$('#ITP_MODAL_ALERT_SAVE_LM_CONFIRM').off('click');
		$('#ITP_MODAL_ALERT_SAVE_LM_CONFIRM').on('click', function() {
			fn.callBack(args);
			$('#ITP_MODAL_SAVE_LM_ALERT').modal('hide');
		});
	}
};
function itp_fn_form_clear_validate(modal, form) {
	$(form).find('.itp_ip').removeClass('has-error');
	$(form).find('.help-block').remove();

	if (modal != null) {
		$(modal).on('hidden.bs.modal', function() {
			$(form).find('.itp_ip').removeClass('has-error');
			$(form).find('.help-block').remove();
		});
	}
};

function itp_fn_chnage_number_form(formId) {
	$(formId).find('input.numberOnly').number(true);
	$(formId).find('input.distanceOnly').number(true, 1);
	$(formId).find('input.priceOnly').number(true, 2);
	$(formId).find('input.unitOnly').number(true, 3);
};

function itp_fn_form_validate(form, element, arry, msg, type) {
	var error = function(txt) {
		if (type != 'ONLYCHK') {
			if (msg == undefined || typeof msg == 'undefined') {
				msg = txt;
			}

			$(element).closest('.itp_ip').addClass('has-error');
			var error_msg = $('<span class="help-block">' + msg + '</span>');
			if($(element).parent('.input-group').length) {
				error_msg.insertAfter($(element).parent());
			} else {
				error_msg.insertAfter($(element));
			}
		}
	};

	if ($.inArray('empty', arry) > -1) {
		if ($(element).val() == '' || $(element).val() < 1) {
			error(ITP_MSG_LOCALE.message.form.mandatory);
			return false;
		}
	}

	if ($.inArray('emptyNum', arry) > -1) {
		if ($(element).val() == '' || $(element).val() < 0) {
			error(ITP_MSG_LOCALE.message.form.mandatory);
			return false;
		}
	}
	if ($.inArray('num', arry) > -1) {
		$(element).val($(element).val().replace(/[^0-9]/g, ''));
		const regExp = /^[0-9]+$/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.onlynumber);
			return false;
		}
	}
	
	if ($.inArray('number', arry) > -1) {
		const regExp = /^[0-9]+$/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.onlynumber);
			return false;
		}
	}

	if ($.inArray('float', arry) > -1) {
		if($(element).val() == '') return true;
		const regExp = /^\d+.?\d?\d?\d?$/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.onlynumber);
			return false;
		}
	}

	if ($.inArray('tel', arry) > -1) {
		const regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.wrongtelnumber);
			return false;
		}
	}

	if ($.inArray('email', arry) > -1) {
		const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.wrongemail);
			return false;
		}
	}

	if ($.inArray('id', arry) > -1) {
		const regExp = /^[a-z]+[a-z0-9]{4,11}$/g;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.wronguserid);
			return false;
		}
	}

	if ($.inArray('id2', arry) > -1) {
		const regExp = /^[A-Za-z0-9+]*$/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.wronguserid2);
			return false;
		}
	}

	if ($.inArray('password', arry) > -1) {
		const regExp = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.wrongpassword);
			return false;
		}
	}

	if ($.inArray('url', arry) > -1) {
		const regExp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
		if (!regExp.test($(element).val())) {
			error(ITP_MSG_LOCALE.message.form.wronglink);
			return false;
		}
	}

	return true;
};

function itp_fn_set_only_number_form(input) {
	$(input).val($(input).val().replace(/[^0-9]/g, ''));
};

function itp_fn_set_date_form(input) {
	$(input).val($(input).val().replace(/(\d{4})(\d{2})(\d{2})/g, '$1.$2.$3'));
}

function itp_fn_set_telephone_form(input) {
	$(input).val($(input).val().replace(/[^0-9]/g, '').replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, '$1-$2-$3').replace('--', '-'));
};

function itp_fn_set_business_reg_form(input) {
	let companyNum = $(input).val();
	companyNum = companyNum.replace(/[^0-9]/g, '');
    var tempNum = '';
    if (companyNum.length < 4) {
    	tempNum = companyNum;
	} else if (companyNum.length < 6) {
		tempNum += companyNum.substr(0,3);
		tempNum += '-';
		tempNum += companyNum.substr(3,2);
	} else if (companyNum.length < 11) {
		tempNum += companyNum.substr(0,3);
		tempNum += '-';
		tempNum += companyNum.substr(3,2);
		tempNum += '-';
		tempNum += companyNum.substr(5);
	} else {
		tempNum += companyNum.substr(0,3);
		tempNum += '-';
		tempNum += companyNum.substr(3,2);
		tempNum += '-';
		tempNum += companyNum.substr(5);
	}
    $(input).val(tempNum);
};

function itp_fn_set_comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

function itp_fn_set_uncomma(str) {
	str = String(str);
	return str.replace(/[^\d]+/g, '');
};

function itp_fn_set_plus_minus(num) {
	var str = '';
	if (num > -1) {
		str = '+ ' + itp_fn_set_comma(itp_fn_set_uncomma(num));
	} else {
		str = '- ' + itp_fn_set_comma(itp_fn_set_uncomma(Math.abs(num)));
	}
	return str;
};

function itp_fn_load_page(href, tab, param, id) {
	//console.log('[ITP_FN_LOAD_PAGE] href = ' + href + ', tab = ' + tab);
	//로그인체크
	itp_fn_logined_check();

	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: href,
		data: param,
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	//$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	//$('#ITP_OVERLAY').hide();
        	//$('#ITP_SIDEBAR').removeClass('itp_open_nav');srhResult
        },
        success: function(html) {
        	$('#ITP_HEADER .itp_tab_list li').removeClass('active');
        	$('#ITP_HEADER .itp_tab_list').append(tab);
        	$('#ITP_CONTAINER .itp_contents .itp_sec').removeClass('active');
        	$('#ITP_CONTAINER .itp_contents').append(html);
        	//$('#ITP_SIDEBAR').removeClass('itp_open_nav');
        	//JS파일적용
        	const js = "<script src=\"./js/app/"+id.substring(0, id.length - 5).toLowerCase()+"/ITP_"+id+".js?version="+js_version+"\"></script>";
        	$('#ITP_CONTAINER .itp_contents #ITP_TAB_'+id+' #ITP_TAP_JS').append(js);
        },
        error: function(xhr, status, error) {
        	if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failPage);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failPage);
        }
	});
};

function itp_fn_load_tabs(wrap, href) {
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: href,
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	//$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	//$('#ITP_OVERLAY').hide();
        },
        success: function(html) {
        	$(wrap).remove();
        	$('#ITP_CONTAINER .itp_contents').append(html);
        },
        error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failPage);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failPage);
        }
	});
};

function itp_fn_load_html(href, container, param, fn, args) {
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: href,
		data: param,
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	//$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	//$('#ITP_OVERLAY').hide();
        },
        success: function(html) {
        	var append = function() {
        		var deferred = $.Deferred();
        		try {
        			$(container).empty();
            		$(container).append(html);
            		deferred.resolve();
        		} catch(err) {
        			deferred.reject(err);
        		}
        		return deferred.promise();
        	};
        	append().done(function() {
    			if (fn !== undefined || typeof fn !== 'undefined') {
    				fn.callBack(args);
    			}
		    });
        },
        error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failData);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failData);
        }
	});
};

// itp_fn_call_popup(ITP_CONTEXTPATH + '/BIZPOP_BOSS', '#ITP_ASIDE', 'BIZPOP_BOSS', null, popFn, null, 'S');
function itp_fn_call_popup(href, container, fnm, param, popFn, args, returnType) {
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: href,
		data: param,
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	//$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	//$('#ITP_OVERLAY').hide();
        },
        success: function(html) {
        	var append = function() {
        		var deferred = $.Deferred();
        		try {
        			$(container).empty();
            		$(container).append(html);
            		deferred.resolve();
        		} catch(err) {
        			deferred.reject(err);
        		}
        		return deferred.promise();
        	};
        	append().done(function() {
        		eval('itp_fn_' + fnm)(popFn, args, returnType);
        		$('.modal.itp_modal .modal-content').draggable();
		    });
        },
        error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failData);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failData);
        }
	});
};

// 2021.07.07 송호성 추가
function fn_call_popup(type, popnm, container,  popFn, args, returnType) {
	console.log('[ITP_CALL_POPUP] type = ' + type + ', popnm = ' + popnm);
	$.ajax({
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		url: ITP_CONTEXTPATH + '/app/popup/'+type+'/'+popnm+'.html',
        type: 'POST',
        dataType: 'html',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	//$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	//$('#ITP_OVERLAY').hide();
        },
        success: function(html) {
        	var append = function() {
        		var deferred = $.Deferred();
        		try {
        			$(container).empty();
            		$(container).append(html);
            		deferred.resolve();
        		} catch(err) {
        			deferred.reject(err);
        		}
        		return deferred.promise();
        	};
        	append().done(function() {
				const js = '<script src="'+ITP_CONTEXTPATH+'/js/app/popup/'+type+'/ITP_'+popnm+'.js?version='+js_version+'"></script>';
		        $('#ITP_ASIDE #ITP_'+popnm+' #ITP_POPUP_JS').empty();
				$('#ITP_ASIDE #ITP_'+popnm+' #ITP_POPUP_JS').append(js);

        		eval('itp_fn_' + popnm)(popFn, args, returnType);
        		$('.modal.itp_modal .modal-content').draggable();
		    });
        },
        error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failData);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failData);
        }
	});

};

function fn_popup_window_center(pageURL, popNm, w, h, mIdx) {
	var left = (screen.width/2)-(w/2)+(mIdx*45);
  	var top = (screen.height/2)-(h/2)+(mIdx*90);
  	var targetWin = window.open (pageURL, popNm, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  	if (window.focus) {
  		targetWin.focus();
    }
  	return targetWin;
}

function itp_fn_ajax_call(href, param, fn, type) {
	$.ajax({
		contentType: 'application/json',
		url: href,
		data: JSON.stringify(param),
        type: 'POST',
        dataType: 'json',
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	$('#ITP_OVERLAY').hide();
        },
        success: function(result) {
        	if (result.resultCd == 'S') {
        		if (type == 'SAVE') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.successData);}
        		if (type == 'DELETE') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.deletedData);}
        		if (type == 'RESETPW') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.resetPw);}
        		if (type == 'RESETUSERPW') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.resetUserPw);}
        		if (type == 'CANCELPAY') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.cancelPay);}
        		if (fn !== undefined || typeof fn !== 'undefined') fn(result.resultData);
        	} else {
        		if (result.resultMsg != null && result.resultMsg != '') {
        			itp_fn_modal_alert_ajax(result.resultMsg);
        		} else {
        			itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        		}
        	}
        },
        error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        }
	});
};

function itp_fn_excel_upload(formId, href, fn) {
	const form = $(formId)[0];
	let param = new FormData(form);
	$.ajax({
		enctype: 'multipart/form-data',
        method: 'POST',
        url: ITP_CONTEXTPATH + href,
        data: param,
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        timeout: 10000,
        beforeSend: function() {
        	$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	$('#ITP_OVERLAY').hide();
        },
        success: function(result) {
        	if (result.resultCd == 'S') {
        		itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.upload.successUpload);
        	} else {
        		itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.upload.failUpload);
        	}

        	if(typeof fn === 'function'){
        		fn(result.resultData);
        	}
        },
        error: function(xhr, status, error) {
        	if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.upload.failUpload);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.upload.failUpload);
        }
	});
};

function itp_fn_ajax_form_call(href, param, fn, type) {
	$.ajaxSettings.traditional = true;
	$.ajax({
		url: href,
		type: 'POST',
		data: param,
		enctype: 'multipart/form-data',
		cache: false,
		contentType: false,
		processData: false,
		dataType: 'json',
		async: false,
		timeout: 10000,
		beforeSend: function() {
        	$('#ITP_OVERLAY').show();
        },
        complete: function() {
        	$('#ITP_OVERLAY').hide();
        },
		success: function(result) {
			if (result.resultCd == 'S') {
        		if (type == 'SAVE') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.successData);}
        		if (type == 'DELETE') {itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.deletedData);}
        		if (fn !== undefined || typeof fn !== 'undefined') fn(result.resultData);
        	} else {
        		if (result.resultMsg != null && result.resultMsg != '') {
        			itp_fn_modal_alert_ajax(result.resultMsg);
        		} else {
        			itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        		}
        	}
	    },
	    error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
	    	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
	    },
	    fail: function() {
	    	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
	    }
	});
};

function itp_fn_date_format(date, type) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

	if(type && type == 1) {
		return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	} else if(type && type == 2) {
		return date.getFullYear() + '.' + month + '.' + day;	
	} else if(type && type == 3) {
		return date.getFullYear() + '' + month + '' + day;
	} else if(type && type == 4) {
		return date.getFullYear() + '-' + month + '-' + day;
	} else {
		return date.getFullYear() + month + day + hour + minute + second;
	}
}


function itp_fn_date_add(type, iAdd) {
	var date = new Date();
	if(type === 'Y') { 
		date.setFullYear(date.getFullYear() + iAdd);
		date.setDate(date.getDate() - 1);
	}
	else if(type === 'M') {
		date.setMonth(date.getMonth() + iAdd);
		date.setDate(date.getDate() - 1);
	}
	else if(type === 'D') {
		date.setDate(date.getDate() + iAdd);
	}
	
	return itp_fn_date_format(date, 2);
}

// 쿠키 가져오기
var itp_fn_get_cookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

// 24시간 기준 쿠키 설정하기  
var itp_fn_set_cookie = function (cname, cvalue, exdays) {
    var todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
    var expires = "expires=" + todayDate.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

var itp_fn_contains_chars_only = function(value, chars) {
	for (var inx = 0; inx < value.length; inx++) {
	   if (chars.indexOf(value.charAt(inx)) == -1)
		  return false;
	}
	return true;
}

var itp_fn_check_big_alpha_num = function(value) {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	return itp_fn_contains_chars_only(value,chars);
}

var itp_fn_s2ab = function(s) { 
    var buf = new ArrayBuffer(s.length); 
    var view = new Uint8Array(buf);  
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; 
    return buf;    
};

/*
var itp_fn_remote_to_excel = function(param) {
	param.param['pagingYn'] = false;
	var options = {
		url: param.url,
		param: param.param,
		gridColumns: param.gridColumns,
		fileName: 'data1.xlsx',
		sheetName: 'sheet1'
	};
	$.extend(options, param);
	var callbackFn = function(result) {
		console.log(result);
		itp_fn_export_excel(itp_fn_excel_data(options.gridColumns, result.gridRows), options.fileName, options.sheetName);
		// itp_fn_export_excel(result.gridRows, options.fileName, options.sheetName);
	};
	fn_ajax_call(options.url, JSON.stringify(options.param), callbackFn, 'POST');
};
*/

let itp_fn_excel_data = function(gridColumns, excelData) {
	var rtnData = [];
	var cols = [];
	cols[0] = 'NO';
	var seq = 1;
	$.each(gridColumns, function(index, column) {
		if(!column.hidden && column.label !== undefined) {
			cols[seq++] = column.label;
		}
	});
	rtnData.push(cols);
	$.each(excelData, function(index, item) {
		var row = [];
		row[0] = index + 1;
		var seq = 1;
		$.each(gridColumns, function(index, column) {
			if(!column.hidden && column.label !== undefined) {
				row[seq++] = item[column.name];
			}
		});
		rtnData.push(row);
	});
	return rtnData;
};

var itp_fn_export_excel = function(excelData, fileName, sheetName) { 
    // WORKBOOK 생성
    var wb = XLSX.utils.book_new();
    // 시트 만들기
    // var newWorksheet = XLSX.utils.json_to_sheet(excelData, {skipHeader:true});
	var newWorksheet = XLSX.utils.json_to_sheet(excelData);
    // WORKBOOK에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, sheetName);
    // 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    // 엑셀 파일 내보내기 
    saveAs(new Blob([itp_fn_s2ab(wbout)],{type:"application/octet-stream"}), fileName);
};
var itp_fn_remote_to_excel = function(options) { 
	options.param['pagingYn'] = false; 
	var callbackFn = function(result) { 
		const fileName=options.fileName;
		const data = [], header=[], headerWidths=[], cols=[], mapAlign={};
		// alignment: { vertical: 'center', horizontal: 'center', wrapText: true }
		const BORDER_ALL = { border: { top: { style: 'thin' }, right: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' } } };
		for(var c of options.gridColumns) {
			if(c.hidden || !c.label ) continue;
			const fill = { fgColor: { rgb: '808080' } };
			const font = { bold: true, sz: 10, name:'맑은 고딕', color: { rgb: 'FFFFFF' } };
			const alignment = { vertical: 'center', horizontal: 'center', wrapText: true }
			var width=parseInt(Number(c.width)/5);
			if(!width ) width=10;
			header.push({v:c.label,t:'s',s:{...BORDER_ALL,fill,font,alignment}});
			headerWidths.push({width});
			cols.push(c.name);
			if(c.align ) {
				mapAlign[c.name]=c.align;
			}
		}
		data.push(header);
		for(var c of result.gridRows) {
			const row=[];
			for(var name of cols ) {
				const sty={...BORDER_ALL, font:{ sz: 10, name:'맑은 고딕'}}; 
				const align=mapAlign[name];
				if(align ) sty.alignment = { vertical: 'center', horizontal:align  };
				row.push({v:c[name], t:'s',s:sty});
			}
			data.push(row);
		}
		var wb = XLSX.utils.book_new();
		const ws = XLSX.utils.aoa_to_sheet(data);
		ws['!cols'] = headerWidths;

		XLSX.utils.book_append_sheet(wb, ws, options.sheetName); 
		// var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:false, type: 'binary', showGridLines:true, cellStyles:true });
		// 엑셀 파일 내보내기 
		// console.log("itp_fn_remote_to_excel callback => ",ws );
		XLSX.writeFile(wb, fileName);
		// saveAs(new Blob([itp_fn_s2ab(wbout)],{type:"application/octet-stream"}), fileName); 
	};
	fn_ajax_call(options.url, JSON.stringify(options.param), callbackFn, 'POST');
};

var itp_fn_jqgrid_to_excel = function(gridId, fileName, sheetName){
	
	var colModel = $(gridId).jqGrid('getGridParam', 'colModel');
	
	let dataList = [];
	var ids = $(gridId).getDataIDs();
	$.each(ids, function(ridx, rowId) {
		let data = new Object() ;
		
		$.each(colModel, function(cidx, item) {
			// console.log( item.label + ' : ' + $(gridId).jqGrid('getCell', rowId, item.name) );
			
			if(item.name == 'rn') { // NO
				data["NO"] = $(gridId).jqGrid('getCell', rowId, item.name);
			} else if(item.label !== undefined) {
				data[item.label] = $(gridId).jqGrid('getCell', rowId, item.name);
			}						
		});
		dataList.push(data);
	});
	itp_fn_export_excel(dataList, fileName, sheetName);    
};

var itp_fn_set_timeout = {
	init: function () {
		this.action();
	},
	action: function () {
		$(document).on('click', 'button', function() {
			if(!$(this).hasClass('itp_out')) {
				//로그인체크
				itp_fn_logined_check();
			}
		});
	}
};

// 2022-11-02 수발주 추가
let itp_fn_form_event = {
	onKeyup: function(formId) {
		$(formId).find('input[data-key-up]').on('keyup', function() {
			let value = '';
			let arry = $(this).data('key-up').split(',');
			if ($.inArray('number', arry) > -1) {
				value = $(this).val().replace(/[^0-9]/g, "");
			}
			if ($.inArray('comma', arry) > -1) {
				value = $(this).val().replace(/[^0-9]/g, "")
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			if ($.inArray('regNo', arry) > -1) {
				value = $(this).val().replace(/[^0-9]/g, "")
					.replace(/(^[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{5})$/,"$1-$2-$3");
			}
			if ($.inArray('corpNo', arry) > -1) {
				value = $(this).val().replace(/[^0-9]/g, "")
					.replace(/(^[0-9]{6})?([0-9]{7})$/,"$1-$2");
			}
			if ($.inArray('tel', arry) > -1) {
				value = ($(this).val().startsWith('0')) ? $(this).val().replace(/[^0-9]/g, "")
					.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3") : '';
			}
			$(this).val(value);
		});
	},
	removeChar: function(formId) {
		$(formId).find('input[data-key-up]').each(function() {
			$(this).val($(this).val().replace(/[^0-9]/g, ""));
		});
	},
	isValid: function(formId) {
		var isValid = false;
		$(formId).find('input, select, checkbox, textarea').each(function(k) {
			if($(this).data('check-required')) {
				var arry = $(this).data('check-required').split(',');
				var alertMsg = $(this).data('alert-required');
				isValid = itp_fn_form_validate(formId, '#' + $(this).attr('id'), arry, undefined, alertMsg);
				if(!isValid) {
					if(alertMsg && alertMsg.length > 0) {
						itp_fn_modal_alert($(this).data('alert-msg'));
					}
					return false;
				}
			}
		});
		return isValid;
	}
};

let itp_fn_attach_file = {
	view: (id, fileList, clazz, style) => {
		$.each(fileList, function(i, item) {
			var img = 	'<img ' +
						'src="' + item.filePath + '" ' +
						'alt="' + item.fileNm + '" ' +
						'id="' + (item.fileNo + '_' + i) + '" ' +
						'class="' + clazz + '" ' +
						'style="' + style + '" />';
			$('#' + id).append(img);
		});
	}
};

function itp_fn_set_chg_editable(rowId, lastrowid, gridId) {
	if ($(gridId).jqGrid('getCell', rowId, 'viewCd') === 'R') {
		 $(gridId).jqGrid('setRowData', rowId, { viewCd: "U" });
	}
	
	$(gridId).jqGrid('saveRow', rowId, true);
	lastrowid = rowId;
	
	return lastrowid;
};

var printContainter=null;
var printDiv=null;
function itp_fn_printDiv(div) {
	const html = document.querySelector('html'); 
	if(printContainter) {
		printContainter.style.display = 'block';
	} else {
		//ITP_POPUP_CONTAINER
		printDiv = document.createElement("DIV");
		printContainter = document.createElement("DIV");
		printContainter.id='ITP_POPUP_CONTAINER';
		printDiv.className = "modal-body itp_modal";
		printContainter.appendChild(printDiv);
		html.appendChild(printContainter);
	} 
	if(printDiv) {
		printDiv.innerHTML = div.innerHTML;
	}
	document.body.style.display = 'none';
	window.print();
	document.body.style.display = 'block'; 
	printContainter.style.display = 'none'; 
}

function formReadonly(qid) {
	if(!qid) qid='.form-readonly .form-control';
	setTimeout(function() {
		const formInputs=document.querySelectorAll(qid);
		formInputs.forEach(el=> {
			if( el.tagName=='SELECT') {
				$(el).css('pointer-events','none');
			} else {
				el.readOnly=true;
				el.classList.add("form-readonly");
			}
		});
	},100);
}
function itp_fn_confirm(msg, fn, args) {
	$('#ITP_MODAL_ALERT_CANCEL').show();
	$('#ITP_MODAL_ALERT').modal('show');
	$('#ITP_MODAL_ALERT').find('.itp_alert_txt').html(msg);
	if (typeof fn=='function') {
		$('#ITP_MODAL_ALERT_CONFIRM').off('click');
		$('#ITP_MODAL_ALERT_CONFIRM').on('click', function() {
			fn(args);
			$('#ITP_MODAL_ALERT').modal('hide');
		});
	}
};


function itp_fn_tab_close_all() {
	var idx=0;
	$('#ITP_HEADER .itp_tab_list li').each(function() {
		var tabId = $(this).find('.itp_tab_close').attr('data-itp-tab-id');
		if(tabId) {
			// console.log('### MEMU : ' + tmpId + ', ACTIVE : ' + $(this).hasClass('active'));
			$(this).find('.itp_tab_close').trigger('click'); 
		}
	});
	$('#ITP_HEADER .itp_tab_list a[href="#ITP_TAB_SUMMARY"]').trigger('click');		
}

function closePopup(id) {
	var popup=$('#'+id).data();
	if(popup) popup.hide();
}
function ajaxCall(href, param, func, method) {
	if(!method) method='GET';
	$.ajax({
		contentType: 'application/json',
		url: DOMAIN+href,
		data: method=='GET'? param: JSON.stringify(param),
        type: method,
        dataType: 'json',
        async: false,
        timeout: 10000,
        beforeSend: function(xhr) {
        	$('#ITP_OVERLAY').show();
			xhr.setRequestHeader('X-AUTH-TOKEN', CONN_KEY);
        },
        complete: function() {
        	$('#ITP_OVERLAY').hide();
        },
        success: function(result) {
        	if(typeof func=='function') func(result);
        },
        error: function(xhr, status, error) {
			if (xhr.status == 401) location.href = ITP_CONTEXTPATH + '/';
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        },
        fail: function() {
        	itp_fn_modal_alert_ajax(ITP_MSG_LOCALE.message.ajax.failProcess);
        }
	});
}
function makeGrid(options) { 
	if(options.hasOwnProperty('url') ) {
		options.loadBeforeSend = function(jqXHR) {
			jqXHR.setRequestHeader('X-AUTH-TOKEN', CONN_KEY);
		};
		options.loadError = function(jqXHR, textStatus, errorThrown) {
			console.log("grid load error => ", arguments )
		};
		
		if( options.url.charAt(0)=='/' ) {
			options.url=DOMAIN + options.url;
		}
		if(!options.hasOwnProperty('datatype') ) options.datatype='json';
		if(!options.hasOwnProperty('mtype') ) options.mtype='GET'; 
	}
	var grid=$(options.gridId);
	grid.jqGrid(options).navGrid(options.pager, ITP_GRID_NAV_DEFAULTS.navGrid);
	return grid;
}
function gridStatus( gridId, menuId, emptyMsg, helpMsg ) {
	const rowCnt = $(gridId).jqGrid('getGridParam', 'records');
	const shrinkToFit = $(gridId).getGridParam('shrinkToFit'); 
	if (emptyMsg === null || emptyMsg === undefined) {
		emptyMsg = ITP_MSG_LOCALE.message.grid.noData;
	} 
	$('#ITP_' + menuId + '_jqGridEmpty').removeClass('itp_noSrh');
	if (rowCnt == 0) {
		$(gridId + '_list').find('.ui-jqgrid-bdiv').css('min-height', '100px');
		$('#ITP_' + menuId + '_jqGridEmpty').html(emptyMsg);
		$('#ITP_' + menuId + '_jqGridEmpty').show();
	} else {
		$(gridId + '_list').find('.ui-jqgrid-bdiv').css('min-height', 'auto');
		$('#ITP_' + menuId + '_jqGridEmpty').hide(); 
	}
	if (shrinkToFit) {
		$(gridId + '_list').find('.ui-jqgrid .ui-jqgrid-bdiv').css('overflow-x', 'auto');
	} else {
		$(gridId + '_list').find('.ui-jqgrid .ui-jqgrid-bdiv').css('overflow-x', 'auto');
	}
	$(gridId + 'Pager_center').hide();
	$(gridId + 'Pager_right').hide();
 
	let viewHtml = '';
	viewHtml += '<span class="itp_shrv fix">';
	viewHtml += '<span class="shrv_txt">' + ITP_MSG_LOCALE.label.total + '</span>';
	viewHtml += '<span class="shrv_num shrv_tot">(<em>' + rowCnt + '</em>)</span>';
	
	if (helpMsg !== null && helpMsg !== undefined && helpMsg != '') {
		viewHtml += '<span class="shrv_help">' + helpMsg + '</span>';
	}
	viewHtml += '</span>';
	$('#ITP_' + menuId + '_jqGridView').html(viewHtml).show(); 
	$(gridId).on('focus', 'td[role="gridcell"] .editable', function() {
		$(this).closest('tr[editable="1"] td').trigger('click');
	});
}