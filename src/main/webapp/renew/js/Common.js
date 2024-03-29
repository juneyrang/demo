const Common = {
	loadDiv: function(id, url, js, callback, parentId) {
		$(id).load(url, null, function(data, status, xhr) {
			if(status == "success") {
				if(js) Common.loadJavascript(js, parentId, callback);
			}
		});
	},
	loadJavascript : function(url, parentId, callback, charset) {
		var attach = (parentId && parentId != 'head') ? document.getElementById(parentId) : document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
        script.charset = (charset) ? charset : "euc-kr";
	    if (charset != null) {
	    }
	    var loaded = false;
	    script.onreadystatechange = function () {
	        if (this.readyState == 'loaded' || this.readyState == 'complete') {
	            if (loaded) {
	                return;
	            }
	            loaded = true;
	            if(callback) callback();
	        }
	    };
	    script.onload = function () {
            if(callback) callback();
	    };
	    script.src = url;
	    attach.appendChild(script);
	},
	ajax : function(param) {
		$.ajax($.extend({
			async: true,
			type: "POST",
			data: {},
	        dataType: "json",
	        beforeSend: function() {
	    		$('.wrap-loading').removeClass('dp_n');
	        },
	        complete : function() {
	    		$('.wrap-loading').addClass('dp_n');
	    		$('#wrap-loading').addClass('dp_n'); //로딩중 화면 제거
			}
	    }, param));
	}
};

const CommonUI = {
	button: {
		get: function(id, cls, icon, txt) {
			return '<button id="' + id + '" class="btn ' + cls + ' align-items-center"><i class="' + icon + '"></i> ' + txt + '</button>';
		}
	}
};

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
