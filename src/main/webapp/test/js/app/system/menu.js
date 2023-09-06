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
	    },
        getTreeData: function(data) {
            var arrData = [];
            $.each(data, function(i, row) {
                if(row.MENU_UP_SEQ == '0') {
                    var item = {
                          'MENU_SEQ' 	: row['MENU_SEQ']
                        , 'MENU_NAME' 	: row['MENU_NAME']
                        , 'MENU_UP_SEQ' : row['MENU_UP_SEQ']
                        , 'MENU_PATH' 	: row['MENU_PATH']
                        , 'MENU_ORDER' 	: row['MENU_ORDER']
                        , 'TRANS_YN' 	: row['TRANS_YN']
                        , 'MOBILE_YN' 	: row['MOBILE_YN']
                    };
                    item._children = [];
                    $.each(data, function(i, child) {
                        if(child.MENU_UP_SEQ != '0' && row.MENU_SEQ == child.MENU_UP_SEQ) {
                            item._children.push(child);
                        }
                    });
                    arrData.push(item);
                }
            });
            return arrData;
        }
	};
	
	menuContentObj.init();
})(jQuery);