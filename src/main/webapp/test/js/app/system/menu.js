(function($) {
	let menuContentObj = {
		menuTable: null,
		init: function() {
			console.log('menuContentObj init!!!!!!!!!!!');
			this.table.init();
		},
		table: {
			init: function() {
				this.create();
				this.event.init();
			},
			create: function() {
				var _this = this;
				menuContentObj.menuTable = new Tabulator('#menu-data-grid', {
					layout:"fitColumns",
					placeholder:"데이터가 존재하지 않습니다.",
				    dataTree:true,
				    dataTreeStartExpanded:true,
				    columns:[
				             {formatter:"rownum", hozAlign:"center", width:40, cellClick:_this.event.rownum},
						     {title:"Menu Name", field:"MENU_NAME", width:300, cellClick:_this.event.showDetail},
						     {title:"Menu Path", field:"MENU_PATH", width:450, editor:"input", validator:"required"},
						     {title:"Order", field:"MENU_ORDER", width:150, hozAlign:"right", editor:"input", validator:["min:0", "max:100", "numeric"]},
						     {title:"Mobile사용유무", field:"MOBILE_YN", width:150, hozAlign:"center", editor:"list", editorParams:{values:{"Yes":"Y", "No":"N"}}},
						     {title:"Management", formatter:_this.formatter.management, hozAlign:"center", width:250},
				    ],
				    responsiveLayout:"collapse"
				});
			},
			formatter: {
				management: function(cell, formatterParams) {
					var html = 	'<div>' +
								'<i class="mdi mdi-menu m-auto text-primary" data-menu-no="' + cell.getRow().getData().MENU_SEQ + '"></i>' + 
								'<i class="mdi mdi-airballoon m-auto text-primary" data-menu-no="' + cell.getRow().getData().MENU_SEQ + '"></i>' + 
								'<i class="mdi mdi-trash-can-outline m-auto text-primary" data-menu-no="' + cell.getRow().getData().MENU_SEQ + '"></i>' + 
								'</div>';
					return html;
				}
			},
		    event: {
		    	init: function() {
		    		menuContentObj.menuTable.on('tableBuilt', this.func.tableBuilt);
//		    		menuContentObj.menuTable.on('dataLoaded', this.func.dataLoaded);
//		    		menuContentObj.menuTable.on('rowSelected', this.func.rowSelected);
//		    		menuContentObj.menuTable.on('rowClick', this.func.rowClick);
//		    		menuContentObj.menuTable.on('rowDblClick', this.func.rowDblClick);
//		    		menuContentObj.menuTable.on('cellClick', this.func.cellClick);
//		    		menuContentObj.menuTable.on('cellDblClick', this.func.cellDblClick);
//		    		menuContentObj.menuTable.on('cellEdited', this.func.cellEdited);
		    		this.formatter();
			    },
			    func: {
			    	tableBuilt: function() {
			    		console.log('tableBuilt');
						menuContentObj.load();
			    	},
			    	dataLoaded: function(data) {
			    		console.log('event', data);
			    	},
			    	rowSelected: function(row) {
			    		console.log('rowSelected', row);
			    	},
			    	rowClick: function(e, row) {
			    		console.log('rowClick', e, row);
			    	},
			    	rowDblClick: function(e, row) {
			    		console.log('rowDblClick', e, row);
			    	},
			    	cellClick: function(e, cell) {
			    		console.log('cellClick', e, cell);
			    	},
			    	cellDblClick: function(e, cell) {
			    		console.log('cellDblClick', e, cell);
			    	},
			    	cellEdited: function(e, cell) {
			    		console.log('cellEdited', e, cell);
			    	}
			    },
				formatter: function() {
		    		$(document).on('click', '.mdi-menu', function(i) {
		    			console.log('mdi-menu', this);
		    		});
		    		$(document).on('click', '.mdi-airballoon', function(i) {
		    			console.log('mdi-airballoon', this);
		    		});
		    		$(document).on('click', '.mdi-trash-can-outline', function(i) {
		    			console.log('mdi-trash-can-outline', this);
		    		});
				},
			    showDetail: function(e, cell) {
			    	console.log(e, cell, cell.getRow().getData().MENU_NAME);
					var param = { "data" : cell.getRow().getData() };

					$('#dlgReceivedPopUp').load("/test/views/system/popup/userDetail.html", param, function(data, status, xhr) {
						if(status == "success"){

							dlgUserDetailContentObj.init(param, function (key, returnParam) {

								if(key == "save-item"){
									$('#btnSearch').trigger('click');
								}
							});

						}
					});
			    },
			    rownum: function(e, cell) {
			    	console.log(e, cell);
			    }
		    }
		},
		load: function() {
			var cbGetMenu = this.callback.getMenu;
			Common.ajax({url: "/getMenu.do", success: cbGetMenu});
		},
		callback: {
			getMenu: function (data, textStatus, jqXHR) {
				console.log(data.results);
				menuContentObj.menuTable.setData(menuContentObj.getTreeData(data.results));
			}
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