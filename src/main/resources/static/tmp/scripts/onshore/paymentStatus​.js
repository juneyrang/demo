var gridLang = {};
var fileLang = "en";
var paymentGrid;
var menuAuthList;
var toDay;
var gridReload = false;

function gridResize() {
	$("#gridPayment").width($(".table-responsive").width());
	$("#gridPayment").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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

	var paymentGridCol = {
		"Cfg": {
			"id"				: "paymentGrid"
			, "CfgId"			: "paymentGridCfg"
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
			{	"Name"	: "RECEIVED_HEADER_ID"	, "Width": "0", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "PROJECT_NO"			, "Width": "160", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "ORDER_HEADER_ID"		, "Width": "160", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" , "OnClickCell":"openModal(Grid,Row,Col);"},
		    {	"Name"	: "CONTRACT_HEADER_ID"	, "Width": "160", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "RECEIVED_SEQ"		, "Width": "100", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "INVOICE_NO"			, "Width": "200", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "DELIVERY_NOTE"		, "Width": "150", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
		    {	"Name"	: "TRUCK_NO"			, "Width": "130", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor gridCenterText", 	"CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
			{	"Name"	: "REMARKS"				, "Width": "290", 	"Type": "Text", 	"Class" : "gridBorderText gridTextColor", 					"CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
		]
		, "Header" : {
			  "Class"				: "gridCenterText"
			, "PROJECT_NO"			: "Project No."
			, "ORDER_HEADER_ID"		: "Order Id"
			, "CONTRACT_HEADER_ID"	: "Contract Id"
			, "RECEIVED_SEQ"		: "Received Seq"
			, "INVOICE_NO"			: "Invoice No."
			, "DELIVERY_NOTE"		: "Delivery Note"
			, "TRUCK_NO"			: "Truck No."
			, "REMARKS"				: "Remarks"
		}
	};

	paymentGrid = TreeGrid( {Layout:{Data : paymentGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridPayment" );

	TGSetEvent("OnRenderFinish","paymentGrid",function(grid){
		pageCommonObj.gridReloadFn(grid);
		gridReload = true;
	});
	
}

function openModal(grid,row,col) {
	pagePopupObj.dlgPaymentCreationPopUp.load(row);
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
	},
	searchParams: function() {
		return {
			  PROJECT_NO 			: $('#txtProjectCode').val()
			, CONTRACT_HEADER_ID 	: $('#txtContractHeaderId').val()
			, REVISION				: $('#txtRevision').val()
			, ORDER_SEQ 			: $('#txtOrderSeq').val()
			, ORDER_NAME 			: $('#txtOrderName').val()
			, DESCRIPTION 			: $('#txtDescription').val()
			, ORDER_DATE 			: $('#txtOrderDate').val()
			, INVOICE_NO 			: $('#txtInvoiceNo').val()
			, PLAN_DATE_FROM		: $('#txtPlanDateFrom').val()
			, PLAN_DATE_TO 			: $('#txtPlanDateTo').val()
			, STATUS 				: $('#selStatus').val()
			, ORDER_STATUS 			: $('#selOrderStatus').val()
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
				case 'btnPaymentCreation'	: pageBtnObj.action.btnPaymentCreationClick(); break;
				case 'btnPaymentDelete'	: pageBtnObj.action.btnPaymentDeleteClick();	break;
				case 'btnPaymentSave'		: pageBtnObj.action.btnPaymentSaveClick(); 	break;
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
				
				paymentGrid.Source.Data.Data.Body = [data.results];
				paymentGrid.Reload();

	        };
			pageCommonObj.ajaxCall('/getDesmOnshoreReceivedList.do', pageCommonObj.searchParams(), callback)
		},
		btnReseteClick: function() {
			$('#txtProjectCode').val('');
			$('#txtContractHeaderId').val('');
			$('#txtRevision').val('');
			$('#txtOrderSeq').val('');
			$('#txtOrderName').val('');
			$('#txtDescription').val('');
			$('#txtOrderDate').val('');
			$('#txtInvoiceNo').val('');
			$('#txtPlanDateFrom').val('');
			$('#txtPlanDateTo').val('');
			$('#selStatus').val('');
			$('#selOrderStatus').val('');
		},
		btnPaymentCreationClick: function() {
			pagePopupObj.dlgPaymentCreationPopUp.init();
		},
		btnPaymentSaveClick: function() {
			paymentGrid.ActionAcceptEdit();

			var changeObject = paymentGrid.GetChanges();
			var changeList = JSON.parse(changeObject).Changes;

			if(changeList.length == 0) {
				alert_modal("", $('#alertGridDataNull').val());
				return;
			}

			confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
				if(result) {
					var updateList = [];
					for(var i = 0; i < changeList.length; i++){
						var rowId = changeList[i].id;
						var row = idsmOsDetailGrid.GetRowById(rowId);

						var updateRow = objNullCheck(
							{
								"ORDER_HEADER_ID"		: row.ORDER_HEADER_ID,
								"CONTRACT_HEADER_ID"	: row.CONTRACT_HEADER_ID,
								"PROJECT_NO"			: row.PROJECT_NO,
								"CATEGORY"				: row.CATEGORY,
								"STATUS"				: row.STATUS,
								"CLOSED"				: row.CLOSED,
								"CONTRACT_SEQ"			: row.CONTRACT_SEQ,
								"REVISION"				: row.REVISION,
								"CONTRACT_NO"			: row.CONTRACT_NO,
								"CONTRACT_NAME"			: row.CONTRACT_NAME,
								"CONTRACTOR"			: row.CONTRACTOR,
								"CONTRACT_DATE"			: row.CONTRACT_DATE,
								"TERM_FROM"				: row.TERM_FROM,
								"TERM_TO"				: row.TERM_TO,
								"CURRENCY"				: row.CURRENCY,
								"CONTRACT_AMOUNT"		: row.CONTRACT_AMOUNT,
								"NOTE"					: row.NOTE
							}
						);
						updateList.push(updateRow);
					}

					var list = JSON.stringify(updateList);
					var paramData = {"list" : list};
					console.log(paramData);

//					$.ajax({
//						url: "/saveIdsmOsDetailList.do",
//						data: paramData,
//						success: function (result, textStatus, jqXHR) {
//							if (result.error != null) {
//								alert_fail(result.error);
//							} else {
//								alert_success($('#alertSaveSuccess').val());
//								$('#btnSearch').click();
//							}
//						}
//					});
				}
			});
		},
		btnPaymentDeleteClick: function() {
			paymentGrid.ActionAcceptEdit();

			var selectList = paymentGrid.GetSelRows();
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
							"CONTRACT_HEADER_ID" : gridRow.CONTRACT_HEADER_ID
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
	dlgPaymentCreationPopUp : {
		init: function() {
			this.load();
		},
		load: function(row) {
			var param = {
					"CONTRACT_HEADER_ID" : (row) ? row.CONTRACT_HEADER_ID : '', 
					"ATTACH_GRP_CD" : (row) ? row.ATTACH_GRP_CD : '', 
					"STATUS" : (row) ? row.STATUS : 'Incomplete', 
					"REVISION" : (row) ? row.REVISION : '0', 
					"menuAuthList" : menuAuthList
			};

			$('#dlgPaymentPopUp').load("/desmOnshoreOrderCreationPopUp.do",null,function(data, status, xhr) {
				if(status == "success"){

					initDesmPaymentPopUp(param, function (key, returnParam) {

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
		$('#dlgPaymentPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			if(status == "success"){
				initTransAttListPopUp(param, function (key, returnParam) {
				});
			}
		});		
			
	}
}

