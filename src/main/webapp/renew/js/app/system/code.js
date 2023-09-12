(function($) {
	let codeContentObj = {
		codeLargeTable: null,
		codeSmallTable: null,
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
				var _this = this;
				CodeLargeDataGrid = new Tabulator('#code-large-data-grid', {
					layout:'fitDataTable',
					width:'50%',
//					rowHeight:25,
					placeholder:'데이터가 존재하지 않습니다.',
				    columns:[
				            {formatter:'rowSelection', titleFormatter:'rowSelection', headerHozAlign:"center", hozAlign:'center', width:50, headerSort:false, cellClick:function(e, cell){
				            	cell.getRow().toggleSelect();
				            }},
					    	{title:'Mst Code', field:'MST_CODE', width:110, responsive:0}, //never hide this column
					    	{title:'Mst Name', field:'MST_NAME', width:250, cellClick: _this.event.func.cellClick},
					    	{title:'Use YN', field:'USE_YN', width:90, hozAlign:'center', responsive:2}, //hide this column first
						    {title:'Management', formatter:_this.formatter.management, hozAlign:'center', width:245, cellClick: _this.formatter.action},
				    ],
				});
				CodeSmallDataGrid = new Tabulator('#code-small-data-grid', {
					layout:'fitDataTable',
					placeholder:'데이터가 존재하지 않습니다.',
				    columns:[
				            {formatter:'rowSelection', titleFormatter:'rowSelection', headerHozAlign:"center", hozAlign:'center', width:50, headerSort:false, cellClick:function(e, cell){
				            	cell.getRow().toggleSelect();
				            }},
					    	{title:'Menu Code', field:'DTL_CODE', width:100, responsive:0}, //never hide this column
					    	{title:'Menu Name', field:'DTL_NAME', width:250},
					    	{title:'Order', field:'DTL_ORDER', width:90, hozAlign:'right'},
					    	{title:'Use YN', field:'USE_YN', width:90, hozAlign:'center', responsive:2}, //hide this column first
						    {title:'Management', formatter:_this.formatter.management, hozAlign:'center', width:155, cellClick: _this.formatter.action},
				    ],
				});
				this.load();
			},
			formatter: {
				management: function(cell, formatterParams) {
					var mstCode = cell.getRow().getData().MST_CODE;
					var html = 	'<div class="d-flex align-items-center">' +
								CommonUI.button.get('btnDlgCodeAdd', 'text-primary  btn-sm', 'icon-pencil', '추가') + 
								'<i class="mdi mdi-airballoon m-auto text-primary" data-menu-no="' + mstCode + '"></i> ' + 
								CommonUI.button.get('btnDlgCodeDel', 'text-danger  btn-sm', 'icon-trash', '삭제') + 
								'</div>';
					return html;
				},
				action: function(e, cell){
					e.stopPropagation();
					var keyVal = cell.getRow().getData().MST_CODE;
					var id = $(e.target).attr('id');
					console.log(id, keyVal);
					switch(id) {
					case 'btnDlgCodeAdd': break;
					case 'btnDlgCodeDel': break;
					}
				}
			},
			load: function() {
				var cbGetCode = this.callback.getLargeCode;
				Common.ajax({url: '/getCode.do', success: cbGetCode, beforeSend: null, complete: null});
			},
			callback: {
				getLargeCode: function (data, textStatus, jqXHR) {
					console.log(data.results);
					CodeLargeDataGrid.setData(data.results);
				},
				getSmallCode: function (data, textStatus, jqXHR) {
					console.log(data.results);
					CodeSmallDataGrid.setData(data.results);
				}
		    },
		    event: {
		    	init: function() {
		    		CodeLargeDataGrid.on('tableBuilt', this.func.tableBuilt);
//		    		CodeLargeDataGrid.on('dataLoaded', this.func.dataLoaded);
//		    		CodeLargeDataGrid.on('cellClick', this.func.cellClick);
//		    		CodeLargeDataGrid.on('cellDblClick', this.func.cellDblClick);
//		    		CodeLargeDataGrid.on('cellEdited', this.func.cellEdited);
		    		CodeLargeDataGrid.on('rowSelected', this.func.rowSelected);
//		    		CodeLargeDataGrid.on('rowClick', this.func.rowClick);
//		    		CodeLargeDataGrid.on('rowDblClick', this.func.rowDblClick);
//		    		CodeLargeDataGrid.on('renderComplete', this.func.renderComplete);
			    },
			    func: {
			    	tableBuilt: function() {
			    		console.log('tableBuilt');
						codeContentObj.table.load();
			    	},
			    	dataLoaded: function(data) {
			    		console.log('event', data);
			    	},
			    	cellClick: function(e, cell) {
			    		console.log('cellClick', e, cell);
						var mstCode = cell.getRow().getData().MST_CODE;
						Common.ajax({url: '/getCodeDetail.do', data: {"MST_CODE": mstCode}, success: codeContentObj.table.callback.getSmallCode});
			    	},
			    	cellDblClick: function(e, cell) {
			    		console.log('cellDblClick', e, cell);
			    	},
			    	cellEdited: function(e, cell) {
			    		console.log('cellEdited', e, cell);
			    	},
			    	rowSelected: function(row) {
			    		console.log('rowSelected', row);
			    		row.toggleSelect();
			    	},
			    	rowClick: function(e, row) {
			    		console.log('rowClick', e, row);
			    	},
			    	rowDblClick: function(e, row) {
			    		console.log('rowDblClick', e, row);
			    	},
			    	renderComplete: function() {
			    		console.log('renderComplete');
			    	}
			    }
		    }
		}
	};
	
	let CodeLargeDataGrid = codeContentObj.codeLargeTable;
	let CodeSmallDataGrid = codeContentObj.codeSmallTable;
	codeContentObj.init();
})(jQuery);