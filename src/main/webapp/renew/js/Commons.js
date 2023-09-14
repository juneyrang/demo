var CommonObj = {
	utils : {
		loadDiv: function(id, url, js, callback, parentId) {
			var _this = this;
			$(id).load(url, null, function(data, status, xhr) {
				if(status == "success") {
					if(js) _this.loadJavascript(js, parentId, callback);
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
		},
		gridTable: {
			make: function(options) {
				return new Tabulator('#' + options.id, {
					layout:"fitColumns",
					placeholder:"데이터가 존재하지 않습니다.",
				    columns:options.columns,
				    responsiveLayout:"collapse"
				});
			}
		}
	},
	ui : {
		button: {
			get: function(id, cls, icon, txt) {
				return '<button id="' + id + '" class="btn ' + cls + ' align-items-center"><i class="' + icon + '"></i> ' + txt + '</button>';
			}
		}
	},
	form: {
	    chkValid: function(id) {
	        var isValid = true;
            return isValid;
	    }
	},
	string : {
		
	},
	number : {
		comma: function(str) {
			var parts = str.toString().split('.');
			if(str.substring(str.length - 1, str.length) == '.'){
				str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") + ".";
			} else {
				str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",") + (parts[1] ? "." + parts[1] : "");
			}
		},
		float: function(str, size) {
			var idx = str.indexOf('.');  
			if(idx < 0) {  
				return str;
			} else if(idx == 0) {
				return '0' + str;
			} else {
				var tmpStr = str.substr(idx + 1);
				if(tmpStr.length > 1) {             
					if(tmpStr.indexOf('.') >= 0) {        
						tmpStr = tmpStr.replace(/[^\d]+/g, '');
					}
					if(size && tmpStr.length > size) {
						tmpStr = tmpStr.substr(0, size);
					}
					str = str.substr(0, idx + 1) + tmpStr;
				}
				return str;  
			}
		},
		minus: function(str) {
			var idx = str.indexOf('-');
			if(idx == 0){
				var tmpStr = str.substr(idx + 1);
				//뒤에 마이너스가 또 있는지 확인
				if(tmpStr.indexOf('-') >= 0){
					tmpStr = tmpStr.replace('-', '');
					str = str.substr(0,idx + 1) + tmpStr;  
				}
			} else if(idx > 0){
				str = str.replace('-', '');
			} else if(idx < 0){
				return str;
			}
			return str;
		}
	},
	date : {
		
	}
}

var ajaxCall = CommonObj.utils.ajax;
var CommonUtil = CommonObj.utils;
var CommonUI = CommonObj.ui;
var CommonString = CommonObj.string;
var CommonNumber = CommonObj.number;
var CommonDate = CommonObj.date;

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};