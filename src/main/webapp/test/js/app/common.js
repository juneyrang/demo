const Commons = {
    init: function() {
    },
    form: {
        init: function() {
        },
        checkRequiredField: function(areaID) {
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
        },
        removeDisabled: function() {
            $("input:disabled").attr("disabled", false);
            $("select:disabled").attr("disabled", false);
        }
    },
    search: {
        init: function() {
        }
    },
    grid: {
        init: function() {
        }
    },
    popup: {
        init: function() {
        },
        modal: {
            regist: function(id, showCallback, hideCallback) {
                $(document).on('show.bs.modal', id, showCallback);
                $(document).on('hidden.bs.modal', id, hideCallback);
            }
        }
    },
    ajax: {
        loading: function(id, cls, clsView) {
            $(document).ajaxStart(function( event, request, settings ) {
                $(cls).removeClass(clsView);
            });
            //jquery ajax 호출 완료시 로딩 이미지 제거
            $(document).ajaxComplete(function (event, request, settings) {
                $(cls).addClass(clsView);
                $(id).addClass(clsView); //로딩중 화면 제거
            });
        }
    }
    util: {
        number: {
        },
        date: {
        }
    },
    ajaxCall: function(param) {
        $.ajax($.extend({
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            url: '',
            data: {},
            type: 'POST',
            dataType: 'json',
            async: false,
            timeout: 10000
        }, param));
    }
};

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
