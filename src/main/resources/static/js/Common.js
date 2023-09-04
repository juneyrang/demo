//const Common = (function($) {
//	var util = {
//		net: {
//			ajax : function(param) {
//				$.ajax($.extend({
//					async: true,
//					type: "POST",
//					data: {},
//			        dataType: "json"
//			    }, param));
//			}
//		}
//	}
//	
//	var ajaxCall = Common.util.net.ajax;
//	
//	return Common;
//})(jQuery);
const Common = {
	loadDiv: function(id, url, js, callback) {
		$(id).load(url, null, function(data, status, xhr) {
			if(status == "success") {
				if(js) Common.loadJavascript(js, callback);
			}
		});
	},
	loadJavascript : function(url, callback, charset) {
		var head= document.getElementsByTagName('head')[0];
	    var script= document.createElement('script');
	    script.type= 'text/javascript';
	    if (charset != null) {
	        script.charset = "euc-kr";
	    }
	    var loaded = false;
	    script.onreadystatechange= function () {
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
	    head.appendChild(script);
	},
	ajax : function(param) {
		$.ajax($.extend({
			async: true,
			type: "POST",
			data: {},
	        dataType: "json"
	    }, param));
	}
};