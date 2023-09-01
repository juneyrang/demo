var gridLang = {};
var fileLang = "en";
var contractGrid;
var menuAuthList;
var toDay;
var gridReload = false;

function gridResize() {
	$("#gridContract").width($(".table-responsive").width());
	$("#gridContract").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
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

	var contractGridCol = {"Cfg": {"id"					: "contractGrid"
									, "CfgId"			: "contractGridCfg"
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
							    {	"Name"	: "CONTRACT_HEADER_ID"	, "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "ATTACH_GRP_CD"		, "Width": "0", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
//								{	"Name"	: "RN"				, "Width": "70" , "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "PROJECT_NO"			, "Width": "160", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CATEGORY"			, "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "STATUS"				, "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "REVISION"			, "Width": "100", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CLOSED"				, "Width": "130", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONTRACT_SEQ"		, "Width": "0",   "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONTRACT_NO"			, "Width": "200", "Type": "Text", "Class" : "gridLinkText gridCenterText"				 , "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell":"openModal(Grid,Row,Col);" },
								{	"Name"	: "CONTRACT_NAME"		, "Width": "200", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONTRACTOR"			, "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "CONTRACT_DATE"		, "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
							    {	"Name"	: "TERM_FROM"			, "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "TERM_TO"				, "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONTRACT_CURRENCY"	, "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "CONTRACT_AMOUNT"		, "Width": "150", "Type": "Float", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "ATT"					, "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","IconAlign" : "Center"	, "IconSize" : "2"	},
								{	"Name"	: "CONTACT_NAME"		, "Width": "180", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CONTACT_TITLE"		, "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CONTACT_EMAIL"		, "Width": "150", "Type": "Text", "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "CONTACT_MOBILE"		, "Width": "120", "Type": "Text", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "REMARKS"				, "Width": "290", "Type": "Text", "Class" : "gridBorderText gridTextColor", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" }
							]
							,"Head" : [{
								"Kind"				: "Header",
								"id" 				: "Header",
								"Spanned" 			: "1",
								"PanelRowSpan" 		: "2",
								"Class" 			: "gridCenterText",
//								"RN"				: "No", "RNRowSpan" : "2",
								"PROJECT_NO"		: "Project", "PROJECT_NORowSpan" : "2",
								"CATEGORY"			: "Category", "CATEGORYRowSpan" : "2",
								"STATUS"			: "Status", "STATUSRowSpan" : "2",
								"REVISION"			: "Revision", "REVISIONRowSpan" : "2",
								"CLOSED"			: "Closed", "CLOSEDRowSpan" : "2",
								"CONTRACT_NO"		: "Contract No.", "CONTRACT_NORowSpan" : "2",
								"CONTRACT_NAME"		: "Contract Name", "CONTRACT_NAMERowSpan" : "2",
								"CONTRACTOR"		: "Contractor", "CONTRACTORRowSpan" : "2",
								"CONTRACT_DATE"		: "Contract Date", "CONTRACT_DATERowSpan" : "2",
								"TERM_FROM" 		: "Term", "TERM_FROMSpan" : "2",
								"CONTRACT_CURRENCY"	: "Contract Amount", "CONTRACT_CURRENCYSpan" : "2",
								"ATT"				: "File", "ATTRowSpan" : "2",
								"CONTACT_NAME"		: "Contact Point", "CONTACT_NAMESpan" : "4",
								"REMARKS"			: "Description", "REMARKSRowSpan" : "2",
							},{
								"Kind"				: "Header",
								"Spanned" 			: "1",
								"Class" 			: "gridCenterText",
								"TERM_FROM" 		: "From",
								"TERM_TO" 			: "To",
								"CONTRACT_CURRENCY"	: "CUR",
								"CONTRACT_AMOUNT"	: "Amount",
								"CONTACT_NAME"		: "Name",
								"CONTACT_TITLE"		: "Title",
								"CONTACT_EMAIL"		: "E-mail",
								"CONTACT_MOBILE"	: "Mobile"
							}]
							};

	contractGrid = TreeGrid( {Layout:{Data : contractGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridContract" );

	TGSetEvent("OnRenderFinish","contractGrid",function(grid){
		pageCommonObj.gridReloadFn(grid);
		gridReload = true;
	});
	
}

function openModal(grid,row,col) {
	pagePopupObj.dlgContractCreationPopUp.load(row);
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
			  PROJECT_NO 	: $('#txtProjectCode').val()
			, CONTRACT_NO 	: $('#txtContractNo').val()
			, CONTRACT_NAME	: $('#txtContractName').val()
			, CONTRACTOR 	: $('#txtContractor').val()
			, TERM_FROM 	: $('#txtFromTermDate').val()
			, TERM_TO 		: $('#txtToTermDate').val()
			, CONTRACT_DATE : $('#txtContractDate').val()
			, STATUS 		: $('#selStatus').val()
			, CLOSED 		: $('#selClosed').val()
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
				case 'btnContractCreation'	: pageBtnObj.action.btnContractCreationClick(); break;
				case 'btnContractDelete'	: pageBtnObj.action.btnContractDeleteClick();	break;
				case 'btnContractSave'		: pageBtnObj.action.btnContractSaveClick(); 	break;
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

				contractGrid.Source.Data.Data.Body = [data.results];
				contractGrid.Reload();

	        };
			pageCommonObj.ajaxCall('/getDesmContractList.do', pageCommonObj.searchParams(), callback)
		},
		btnReseteClick: function() {
			$('#txtProjectCode').val("");
			$('#txtProjectName').val("");
			$('#txtContractNo').val("");
			$('#txtContractName').val("");
			$('#txtContractor').val("");
		 	$('#txtFromTermDate').val("");
		 	$('#txtToTermDate').val("");
		 	$('#txtContractDate').val("");
		 	$('#selStatus').val("");
			$('#selClosed').val("");
		},
		btnContractCreationClick: function() {
			pagePopupObj.dlgContractCreationPopUp.init();
		},
		btnContractSaveClick: function() {
			contractGrid.ActionAcceptEdit();

			var changeObject = contractGrid.GetChanges();
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
		btnContractDeleteClick: function() {
			contractGrid.ActionAcceptEdit();

			var selectList = contractGrid.GetSelRows();
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
	dlgContractCreationPopUp : {
		init: function() {
			this.load();
		},
		load: function(row) {
			var param = {
					"CONTRACT_HEADER_ID" : (row) ? row.CONTRACT_HEADER_ID : '', 
					"ATTACH_GRP_CD" : (row) ? row.ATTACH_GRP_CD : '', 
					"CONTRACT_SEQ" : (row) ? row.CONTRACT_SEQ : '', 
					"STATUS" : (row) ? row.STATUS : 'Incomplete', 
					"REVISION" : (row) ? row.REVISION : '0', 
					"menuAuthList" : menuAuthList
			};

			$('#dlgContractPopUp').load("/desmContractCreationPopUp.do",null,function(data, status, xhr) {
				if(status == "success"){

					initDesmContractPopUp(param, function (key, returnParam) {

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
		$('#dlgContractPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			if(status == "success"){
				initTransAttListPopUp(param, function (key, returnParam) {
				});
			}
		});		
			
	}
}

