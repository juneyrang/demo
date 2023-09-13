(function($) {
	let userContentObj = {
		userTable: null,
		init: function() {
			console.log('userContentObj init!!!!!!!!!!!');
			this.table.init();
		},
		table: {
			init: function() {
				this.create();
				this.event.init();
			},
			create: function() {
				var _this = this;
				UserDataGrid = new Tabulator('#user-data-grid', {
					layout:"fitColumns",
					pagination:"local",
				    paginationSize:20,
				    paginationSizeSelector:[20, 30, 50, 100],
				    movableColumns:true,
				    paginationCounter:"rows",
					ajaxLoaderLoading:"<span>Loading Data</span>",
					placeholder:"데이터가 존재하지 않습니다.",
				    columns:[
					    {title:"User Name", field:"USER_AD", width:250, responsive:0}, //never hide this column
					    {title:"User Name", field:"USER_NAME", width:350},
					    {title:"DEPT Name", field:"DEPT_NAME", width:200, responsive:2}, //hide this column first
					    {title:"E-mail", field:"MAIL", width:350},
					    {title:"Management", formatter:_this.formatter.management, hozAlign:"center", width:250},
				    ],
				});
			},
			formatter: {
				management: function(cell, formatterParams) {
					var userAD = cell.getRow().getData().USER_AD;
					var html = 	'<div>' +
								'<i class="mdi mdi-menu m-auto text-primary" data-menu-no="' + userAD + '"></i>' + 
								'<i class="mdi mdi-airballoon m-auto text-primary" data-menu-no="' + userAD + '"></i>' + 
								'<i class="mdi mdi-trash-can-outline m-auto text-primary" data-menu-no="' + userAD + '"></i>' + 
								'</div>';
					return html;
				}
			},
			load: function() {
				var cbGetUser = this.callback.getUser;
				ajaxCall({url: '/getUser.do', success: cbGetUser});
			},
			callback: {
				getUser: function (data, textStatus, jqXHR) {
					console.log(data.results);
					UserDataGrid.setData(data.results);
				}
		    },
		    event: {
		    	init: function() {
		    		UserDataGrid.on('tableBuilt', this.func.tableBuilt);
		    		UserDataGrid.on('dataLoaded', this.func.dataLoaded);
		    		UserDataGrid.on('rowSelected', this.func.rowSelected);
		    		UserDataGrid.on('rowClick', this.func.rowClick);
		    		UserDataGrid.on('rowDblClick', this.func.rowDblClick);
		    		UserDataGrid.on('cellClick', this.func.cellClick);
		    		UserDataGrid.on('cellDblClick', this.func.cellDblClick);
		    		UserDataGrid.on('cellEdited', this.func.cellEdited);
			    },
			    func: {
			    	tableBuilt: function() {
			    		console.log('tableBuilt');
						userContentObj.table.load();
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
			    }
		    }
		}
	};

	let UserDataGrid = userContentObj.userTable;
	userContentObj.init();
})(jQuery);