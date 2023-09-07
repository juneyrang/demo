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
				userContentObj.userTable = new Tabulator('#user-data-grid', {
					layout:"fitColumns",
					pagination:"local",
				    paginationSize:20,
				    paginationSizeSelector:[20, 30, 50, 100],
				    movableColumns:true,
				    paginationCounter:"rows",
					ajaxLoaderLoading:"<span>Loading Data</span>",
					placeholder:"데이터가 존재하지 않습니다.",
				    columns:[
				    {title:"User Name", field:"USER_AD", width:200, responsive:0}, //never hide this column
				    {title:"User Name", field:"USER_NAME", width:350},
				    {title:"DEPT Name", field:"DEPT_NAME", width:150, responsive:2}, //hide this column first
				    {title:"E-mail", field:"MAIL", width:150},
				    {formatter:"Management", field:"dob", hozAlign:"center", sorter:"date", width:150},
				    ],
				});
			},
			load: function() {
				var cbGetUser = this.callback.getUser;
				Common.ajax({url: '/getUser.do', success: cbGetUser});
			},
			callback: {
				getUser: function (data, textStatus, jqXHR) {
					console.log(data.results);
					userContentObj.userTable.setData(data.results);
				}
		    },
		    event: {
		    	init: function() {
		    		userContentObj.userTable.on('tableBuilt', this.func.tableBuilt);
		    		userContentObj.userTable.on('dataLoaded', this.func.dataLoaded);
		    		userContentObj.userTable.on('rowSelected', this.func.rowSelected);
		    		userContentObj.userTable.on('rowClick', this.func.rowClick);
		    		userContentObj.userTable.on('rowDblClick', this.func.rowDblClick);
		    		userContentObj.userTable.on('cellClick', this.func.cellClick);
		    		userContentObj.userTable.on('cellDblClick', this.func.cellDblClick);
		    		userContentObj.userTable.on('cellEdited', this.func.cellEdited);
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
	
	userContentObj.init();
})(jQuery);