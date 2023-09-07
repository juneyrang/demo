(function($) {
	let codeContentObj = {
		codeTable: null,
		init: function() {
			console.log('codeContentObj init!!!!!!!!!!!');
			this.table.init();
		},
		table: {
			init: function() {
				this.create();
				this.event.init();
			},
			create: function() {
				codeContentObj.codeTable = new Tabulator('#code-data-grid', {
					layout:"fitColumns",
					ajaxLoaderLoading:"<span>Loading Data</span>",
					placeholder:"데이터가 존재하지 않습니다.",
				    columns:[
				            {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, cellClick:function(e, cell){
				            	cell.getRow().toggleSelect();
				            }},
					    	{title:"Mst Code", field:"MST_CODE", width:200, responsive:0}, //never hide this column
					    	{title:"Mst Name", field:"MST_NAME", width:350},
					    	{title:"Use YN", field:"USE_YN", width:150, responsive:2}, //hide this column first
					    	{formatter:"Management", field:"dob", hozAlign:"center", sorter:"date", width:150},
				    ],
				});
				this.load();
			},
			load: function() {
				var cbGetCode = this.callback.getCode;
				Common.ajax({url: '/getCode.do', success: cbGetCode});
			},
			callback: {
				getCode: function (data, textStatus, jqXHR) {
					console.log(data.results);
					codeContentObj.codeTable.setData(data.results);
				}
		    },
		    event: {
		    	init: function() {
		    		codeContentObj.codeTable.on('tableBuilt', this.func.tableBuilt);
		    		codeContentObj.codeTable.on('dataLoaded', this.func.dataLoaded);
		    		codeContentObj.codeTable.on('rowSelected', this.func.rowSelected);
		    		codeContentObj.codeTable.on('rowClick', this.func.rowClick);
		    		codeContentObj.codeTable.on('rowDblClick', this.func.rowDblClick);
		    		codeContentObj.codeTable.on('cellClick', this.func.cellClick);
		    		codeContentObj.codeTable.on('cellDblClick', this.func.cellDblClick);
		    		codeContentObj.codeTable.on('cellEdited', this.func.cellEdited);
			    },
			    func: {
			    	tableBuilt: function() {
			    		console.log('tableBuilt');
						codeContentObj.table.load();
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
	
	codeContentObj.init();
})(jQuery);