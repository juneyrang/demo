var gridLang = {};
var fileLang = "en";
var deliveryGrid;
var menuAuthList;
var toDay;
var gridReload = false;

function gridResize() {
	$("#gridDelivery").width($(".table-responsive").width());
	$("#gridDelivery").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {

	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	initControls();
	gridResize();
});


function initControls() {

	makeAutocomplete(
		"txtProjectCode", 		//자동완성 입력 input
		"",					//keyword2 파라메터 id
		"txtProjectName",		//clear필드 id
		"/getIdsmSetupProject.do",  	//검색 URL
		2,			//검색 실행을 위한 keyword 최소 길이
		false,				//선택완료 마크 표시 여부
		function(event, ui) {

			$("#txtProjectCode").val(ui.item.value.split("|")[1]);
			$("#txtProjectName").val(ui.item.value.split("|")[2]);
			return false;
		}
	);

	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	pageCommonObj.init();

}

function initTable(){
	var gridCode = getGridCode();

	var deliveryGridCol = {
		"Cfg": {
			"id"				: "deliveryGrid"
			, "CfgId"			: "deliveryGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "3"
			, "CacheTimeout" 	: "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "200"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle" : "0"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "ConstHeight"		: "1"
			, "SafeCSS"			: "1"
			, "Code" : gridCode
			,"CopyCols" : "0"
			, "Sorting"			: "1"
			,"ColsPosLap":"1"
			//,"ColsLap":"1"
		}
		,"Panel" : {"Visible" : "1", "Spanned":"1"}
		, "Toolbar" : {
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Cols" : [
			{	"Name"	: "ORDER_HEADER_ID"		, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CONTRACT_HEADER_ID"	, "Width": "0", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "CONTRACT_NO"			, "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" , "OnClickCell":"openModal(Grid,Row,Col);"},
		    {	"Name"	: "CONTRACTOR"			, "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "STATUS"				, "Width": "160", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText" , "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//			{	"Name"	: "RN"					, "Width": "70" , "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "ORDER_SEQ"			, "Width": "180", "Type": "Text", "Class" : "gridLinkText gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" , "OnClickCell":"openModal(Grid,Row,Col);" },
			{	"Name"	: "ORDER_NAME"			, "Width": "250", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "ORDER_STATUS"		, "Width": "160", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText" , "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PLAN_DATE_FROM"		, "Width": "160", "Type": "Date", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
		    {	"Name"	: "PLAN_DATE_TO"		, "Width": "160", "Type": "Date", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
			{	"Name"	: "ATT"					, "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
			{	"Name"	: "DESCRIPTION"			, "Width": "400", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "CREATION_DATE"		, "Width": "160", "Type": "Date", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "Format": "yy/MM/dd", "Button": "" },
			{	"Name"	: "CREATED_BY"			, "Width": "160", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "ATTACH_GRP_CD"		, "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
		]
		,"Head" : [{
			"Kind"				: "Header",
			"id" 				: "Header",
			"Spanned" 			: "1",
			"PanelRowSpan" 		: "2",
			"Class" 			: "gridCenterText",
			"CONTRACT_NO"		: "Contract No", "CONTRACT_NORowSpan" : "2",
			"CONTRACTOR"		: "Contractor​", "CONTRACTORRowSpan" : "2",
			"STATUS"			: "Status", "STATUSRowSpan" : "2",
			"ORDER_SEQ"			: "Order No.", "ORDER_SEQRowSpan" : "2",
			"ORDER_NAME"		: "Order Name", "ORDER_NAMERowSpan" : "2",
			"ORDER_STATUS"		: "Delivery​ Status", "ORDER_STATUSRowSpan" : "2",
			"PLAN_DATE_FROM"	: "Plan Date", "PLAN_DATE_FROMSpan" : "2",
			"ATT"				: "File", "ATTRowSpan" : "2",
			"DESCRIPTION"		: "Description", "DESCRIPTIONRowSpan" : "2",
			"CREATION_DATE"		: "Creation Date​", "CREATION_DATERowSpan" : "2",
			"CREATED_BY"		: "Created By", "CREATED_BYRowSpan" : "2",
		},{
			"Kind"				: "Header",
			"Spanned" 			: "1",
			"Class" 			: "gridCenterText",
			"PLAN_DATE_FROM" 	: "From",
			"PLAN_DATE_TO" 		: "To"
		}]
	};

	deliveryGrid = TreeGrid( {Layout:{Data : deliveryGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridDelivery" );

	TGSetEvent("OnRenderFinish","deliveryGrid",function(grid){
		pageCommonObj.gridReloadFn(grid);
		gridReload = true;
	});
	
}

function openModal(grid,row,col) {
	pagePopupObj.dlgDeliveryCreationPopUp.load(row);
}

var pageCommonObj = {
	init: function() {
		this.initDatePicker();
		initMenuAuth(this.initMenuAuth);
		this.initCode();
		initDefailProject(this.initDefailProject);
		pageBtnObj.init();
	},
	initDatePicker: function() {
		
		if($('#txtDesmLang').val() == "ko"){
			$.datepicker.setDefaults($.datepicker.regional['ko']);
		}

		$("input[name=inpDatePicker]").datepicker( {
			changeMonth: true,
			changeYear: true,
			dateFormat: "yy/mm/dd",
		});
		
	},
	initMenuAuth : function (list) {
		menuAuthList = list;

		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	},
	initCode: function() {
		var codeList = [];
		pageCommonObj.ajaxCall('/getCodeCombo.do', {"paramList" : JSON.stringify(codeList)}, function(data) {
		 	toDay = data.results.DAY[0].CUR_DAY;
			$('#txtStartHandoverDate').val(toDay);
			$('#txtEndHandoverDate').val(toDay);
			
			initTypeCode(initTable);
		}) ;
	},
	initDefailProject : function (list) {
		if(list.length > 0) {
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);
		}
	},
	gridReloadFn : function(grid) {
		var list = grid.Rows;
		for (var key in list) {
			var gridRow = list[key];
			if(gridRow.Fixed == null){
			
				gridRow.ATT = (gridRow.ATT_CNT != null && gridRow.ATT_CNT != "" && gridRow.ATT_CNT > 0) ? '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg'
						//: '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
						: '';
				grid.RefreshRow(gridRow);
			}
			grid.RefreshRow(gridRow);
		}
	},
	searchParams: function() {
		return {
			  PROJECT_NO 		: $('#txtProjectCode').val()
			, CONTRACT_NO 		: $('#txtContractNo').val()
			, CONTRACT_NAME		: $('#txtContractName').val()
			, CONTRACTOR 		: $('#txtContractor').val()
			, PLAN_DATE_FROM	: $('#txtFromPlanDate').val()
			, PLAN_DATE_TO 		: $('#txtToPlanDate').val()
			, ORDER_NO	 		: $('#txtOrderNo').val()
			, ORDER_NAME 		: $('#txtOrderName').val()
        };
	},
	ajaxCall : function(url, data, callback) {
		$.ajax({
			url: url,
			data: data,
			success: function (data, textStatus, jqXHR) {
				callback(data);
	        }
	    });
	}
};

var pageBtnObj = {
	init: function() {
		this.event.init();
	},
	event: {
		init: function() {
			$('button').on('click', function() {
				switch($(this).attr('id')) {
				case 'btnSearch'			: pageBtnObj.action.btnSearchClick(); 			break;
				case 'btnResete'			: pageBtnObj.action.btnReseteClick(); 			break;
				case 'btnDeliveryCreation'	: pageBtnObj.action.btnDeliveryCreationClick(); break;
				case 'btnDeliveryDelete'	: pageBtnObj.action.btnDeliveryDeleteClick();	break;
				}
			});
		}
	},
	action: {
		btnSearchClick: function() {
			if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
				$('#txtProjectCode').val("");
				$('#txtProjectName').val("");
			}
			
			var callback = function (data, textStatus, jqXHR) {
				console.log(data.results);
				deliveryGrid.Source.Data.Data.Body = [data.results];
				deliveryGrid.ReloadBody();

	        };
			pageCommonObj.ajaxCall('/getDesmOnshoreOrderList.do', pageCommonObj.searchParams(), callback)
		},
		btnReseteClick: function() {
			$('#txtProjectCode').val('');
			$('#txtContractNo').val('');
			$('#txtContractName').val('');
			$('#txtContractor').val('');
			$('#txtFromPlanDate').val('');
			$('#txtToPlanDate').val('');
			$('#txtOrderNo').val('');
			$('#txtOrderName').val('');
		},
		btnDeliveryCreationClick: function() {
			pagePopupObj.dlgDeliveryCreationPopUp.init();
		},
		btnDeliveryDeleteClick: function() {
			deliveryGrid.ActionAcceptEdit();

			var selectList = deliveryGrid.GetSelRows();
			if(selectList.length == 0){
				alert_modal("", $('#alertGridSelectDataNull').val());
				return;
			}

			confirm_modal("", $('#alertDelete').val(), null, function (callobj, result) {
				if(result) {
					var selListParam = [];
					for(var i = 0; i < selectList.length; i++){

						var gridRow = selectList[i];
						var row = {
							"ORDER_HEADER_ID" : gridRow.ORDER_HEADER_ID
						};

						selListParam.push(row);
					}
					var list = JSON.stringify(selListParam);
					var param = {"deleteList" : list};
					console.log(param);

//					$.ajax({
//						url: "/deleteDesmLocation.do",
//						data: param,
//						success: function (result, textStatus, jqXHR) {
//							if (result.error != null) {
//								alert_fail(result.error);
//							} else {
//								$('#btnSearch').click();
//							}
//						}
//					});
				}
			});
		}
	}
};

var pagePopupObj = {
	dlgDeliveryCreationPopUp : {
		init: function() {
			this.load();
		},
		load: function(row) {
			var param = {
					"ORDER_HEADER_ID" : (row) ? row.ORDER_HEADER_ID : '', 
					"CONTRACT_HEADER_ID" : (row) ? row.CONTRACT_HEADER_ID : '', 
					"ATTACH_GRP_CD" : (row) ? row.ATTACH_GRP_CD : '', 
					"STATUS" : (row) ? row.STATUS : 'Incomplete', 
					"ORDER_SEQ" : (row) ? row.ORDER_SEQ : '', 
					"ORDER_STATUS" : (row) ? row.ORDER_STATUS : 'Ordered', 
					"menuAuthList" : menuAuthList
			};

			$('#dlgDeliveryPopUp').load("/desmOnshoreOrderCreationPopUp.do",null,function(data, status, xhr) {

				if(status == "success"){

					initDesmOnshoreOrderPopUp(param, function (key, returnParam) {

						if(key == "save-item"){
							$('#btnSearch').trigger('click');
						}
					});

				}
			});
		}
	}
}

function openAttModal (grid,row,col) {
	console.log(row);
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.ATT_CNT != null && row.ATT_CNT != "" && row.ATT_CNT > 0){
		var param = Object.assign({}, row);
		if(param.ATTACH_GRP_CD == null) {
			param.ATTACH_GRP_CD = "";
		}
		if(param.CONTRACT_HEADER_ID == null) {
			param.CONTRACT_HEADER_ID = "";
		}
		param.fileUse = false;
		$('#dlgDeliveryPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			if(status == "success"){
				initTransAttListPopUp(param, function (key, returnParam) {
				});
			}
		});		
			
	}
}

