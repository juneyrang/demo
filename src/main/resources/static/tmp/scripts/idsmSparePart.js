/*
	기자재 일정관리 > Spare part & Special Tool
*/
var mainGrid;
var dlgExcelDownLoadGrid;
var dlgExcelUpLoadGrid;
var dlgProjectGrid;

var view_type = "SETUP";
var toDay;
var selectDlgInvEditRow;
var dlgInvAllList;
var gridUserJobCode;
var adminGridType = "Create";
var fileUse = true;
var excelDown = false;

$(window).resize(function() {
	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
});


$(document).ready(function () {

	initControls();

	$("#gridMain").width($("body").width() - 35);
	$("#gridMain").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);

});

function resetSearchControls() {

	$('#txtProjectName').val('');
	$('#selSearchType').val('');
	$('#selSearchCategory').val('');
	
	$('#selSearchType').trigger('change');

	$("#txtProjectCode").parent().find(".autocomplete-valid").hide();

}

var fileLang = "en";
function initControls() {

	if($('#txtDesmLang').val() == "ko") {
		fileLang = "kr";
	}

	var createGrid = true;
	Grids.OnRenderFinish = function(grid) {
		if(grid.id == "idsmSetupMainGrid") {
			currentRow = null;
			parentNode = null;
			childNode = null;
			setFocus(mainGridSearchReload(grid));

			if(createGrid){
				createGrid = false;
			}
		}
		else if(grid.id == "idsmDlgExcelDownLoadGrid") {
			if(excelDown) {
				grid.ExportFormat="xlsx";

				grid.ActionExport();

				//KTH 엑셀 다운로드시 옵션 선택 창 숨기기
				$(".TMMenuMain").hide();
				$(".TMMenuShadow").hide();
				$(".GridDisabled").hide();
				TGDialogs[0].ButtonClick("Ok");
				//KTH 엑셀 다운로드시 옵션 선택 창 숨기기 END

				excelDown = false;
			}
		}
	};

	Grids.OnChange = function(value, oldvalue) {
		
	};

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

			initVoyageCombo();

			return false;
		}
	);

	// 조회형 데이터 autocomplete  - 기본형
	// obj_id			: 검색어가 입력되는 input id
	// keyword2_id		: 추가 조건 keyword2가 입력되는  input id
	// clear_id			: 검색시작시 내용을 삭제할 item의 id
	// url				: 자료 조회 url
	// min_length		: 검색 실행을 위한 keyword 최소 길이
	// use_valid_mark	: 검색결과에서 선택 했음 아이콘 표시 여부
	// select_callback	: 선택 후 처리 function
	makeAutocomplete(
		"txtDlgProjectProjectCode" 	// 검색어가 입력되는 input id
		, ""						// 추가 조건 keyword2가 입력되는  input id
		, ""						// 검색시작시 내용을 삭제할 item의 id
		, "/getIdsmSetupProject.do"	// 자료 조회 url
		, 2							// 검색 실행을 위한 keyword 최소 길이
		, false						// 검색결과에서 선택 했음 아이콘 표시 여부
		, function( event, ui ) {
			$("#txtDlgProjectProjectCode").val(ui.item.value.split("|")[1]);
			return false;
		}
	);

//	makeAutocomplete(
//		"txtDlgIdsmTrkItemName", 		//자동완성 입력 input
//		"txtDlgIdsmProjectNo",					//keyword2 파라메터 id
//		"txtDlgIdsmTrkItemSeq",		//clear필드 id
//		"/getIdsmTrkItemSeq.do",  	//검색 URL
//		2,			//검색 실행을 위한 keyword 최소 길이
//		false,				//선택완료 마크 표시 여부
//		function(event, ui) {
//
//			$("#txtDlgIdsmTrkItemSeq").val(ui.item.value.split("|")[0]);
//			$("#txtDlgIdsmTrkItemName").val(ui.item.value.split("|")[1]);
//
//			return false;
//		}
//	);

	// Project 조회 팝업에 조회 아이콘 클릭
	$('#iconDlgProjectListSearch').click(function () {
		dlgProjectListSearch();
		return false;
	});

	// 달력 셋팅
	initDatePicker();

//	initFileInput("txtDlgItemScheduleFile");
//
//	$('#iconSearch').click(function () { iconSearchClick(); return false; });
//    $("#txtDlgProjectProjectCode").keydown(function(key) {
//        if (key.keyCode == 13) {
//            dlgProjectListSearch();
//        }
//    });
//    $('#btnDlgProjectSelect').click(function () { btnDlgProjectSelectClick(); return false; });

	// Project Code	앤터키 이벤트 시 목록 조회
	$("#txtProjectCode").keydown( function( keyInfo ) {
		if( 13 == keyInfo.keyCode ) {
			$('#btnSearch').click();
		}
	});
	
	$('#dlgCreateItem').on('shown.bs.modal', function () {
		$('#dlgCreateItem').click();
	});

	$('#dlgCreateItem').on('hide.bs.modal', function () {
		$("#dlgCreateItem input:visible, #dlgCreateItem select:visible, #dlgCreateItem textarea:visible").each(function () {
			$(this).removeClass("validation-error");
		});
	});

	$('#selSearchType').on('change', function() {
		$('#selSearchCategory').children('option:not(:first)').remove();
		if($(this).val() == 'Spare Part') {
			$("#selSearchCategory").append('<option value="Strategic">Strategic</option>');
			$("#selSearchCategory").append('<option value="Mandatory">Mandatory</option>');
			$("#selSearchCategory").append('<option value="Recommended">Recommended</option>');
		} else if($(this).val() == 'Special Tool') {
			$("#selSearchCategory").append('<option value="Mechanical">Mechanical</option>');
			$("#selSearchCategory").append('<option value="Electrical">Electrical</option>');
			$("#selSearchCategory").append('<option value="I&C">I&C</option>');
		} else {
			$("#selSearchCategory").append('<option value="Strategic">Strategic</option>');
			$("#selSearchCategory").append('<option value="Mandatory">Mandatory</option>');
			$("#selSearchCategory").append('<option value="Recommended">Recommended</option>');
			$("#selSearchCategory").append('<option value="Mechanical">Mechanical</option>');
			$("#selSearchCategory").append('<option value="Electrical">Electrical</option>');
			$("#selSearchCategory").append('<option value="I&C">I&C</option>');
		}
	});
	
	$('#selDlgIdsmType').on('change', function() {
		$("#dlgCreateItem input:visible, #dlgCreateItem select:visible, #dlgCreateItem textarea:visible").each(function () {
			$(this).removeClass("validation-error");
		});
		$('#selDlgIdsmCategory option').remove();
		if($(this).val() == 'Special Tool') {
			$('#txtDlgIdsmStorageClassification').prop('disabled', true);
			$('#txtDlgIdsmShelfLife').prop('disabled', true);
			$('#txtDlgIdsmInstalledQty').prop('disabled', true);
			$('#txtDlgIdsmRecommendedQty').removeClass('required').prop('disabled', true);
			$('#txtDlgIdsmStQty').addClass('required').prop('disabled', false);

			$("#selDlgIdsmCategory").append('<option value="Mechanical">Mechanical</option>');
			$("#selDlgIdsmCategory").append('<option value="Electrical">Electrical</option>');
			$("#selDlgIdsmCategory").append('<option value="I&C">I&C</option>');
		} else {
			$('#txtDlgIdsmStorageClassification').prop('disabled', false);
			$('#txtDlgIdsmShelfLife').prop('disabled', false);
			$('#txtDlgIdsmInstalledQty').prop('disabled', false);
			$('#txtDlgIdsmRecommendedQty').addClass('required').prop('disabled', false);
			$('#txtDlgIdsmStQty').removeClass('required').prop('disabled', true);

			$("#selDlgIdsmCategory").append('<option value="Strategic">Strategic</option>');
			$("#selDlgIdsmCategory").append('<option value="Mandatory">Mandatory</option>');
			$("#selDlgIdsmCategory").append('<option value="Recommended">Recommended</option>');
		}
	});

	$('#btnDlgExcelUploadFile').on('change', function(event) {
		btnDlgExcelUploadFileChange(event); 
		return false;
	});
	
	chkNumberObj.init();

	$('#iconSearch').click					( function ()	{ btnClickObj.IconSearch();				return false; } );
	$('#iconDlgProjectListSearch').click	( function ()	{ btnClickObj.IconDlgProjectSearch();	return false; } );
	$('#btnDlgProjectSelect').click			( function ()	{ btnClickObj.DlgProjectSelect();		return false; } );
	
	$('#btnResete').click					( function ()	{ btnClickObj.Resete();					return false; } );
	$('#btnSearch').click					( function ()	{ btnClickObj.Search();					return false; } );

	$('#btnSave').click						( function ()	{ btnClickObj.Save(); 					return false; } );
	$('#btnCreateItem').click				( function () 	{ btnClickObj.CreateItem(); 			return false; } );
	$('#btnExcelDownload').click			( function ()	{ btnClickObj.ExcelDownload();			return false; } );
	$('#btnExcelUpload').click				( function ()	{ btnClickObj.ExcelUpload(); 			return false; } );
	$('#btnDeleteItem').click				( function ()	{ btnClickObj.DeleteItem(); 			return false; } );

	$('#btnDlgExcelUploadDownload').click	( function ()	{ btnClickObj.DlgExcelUploadDownload();	return false; } );
	$('#btnDlgExcelUploadUpload').click		( function ()	{ btnClickObj.DlgExcelUpload(); 		return false; } );
	$('#btnDlgExcelUploadSave').click		( function ()	{ btnClickObj.DlgExcelUploadSave(); 	return false; } );

	$('#btnLowItemCopy').click				( function () 	{ btnLowItemCopyClick(); 				return false; });
	$('#btnItemCopy').click					( function () 	{ btnItemCopyClick(); 					return false; });

	$('#btnDlgCreateItemAtt').click			 (function () 	{ btnClickObj.CreateItemAtt(); 			return false; });
	$('#btnDlgCreateItemSave').click		( function () 	{ btnClickObj.SaveItem();				return false; });

//	initCode();
	initTable();
}

function initTable(){
	var text = {};
	if($('#txtDesmLang').val() == "ko"){
		text = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}
	var gridCode = getGridCode();
	var mainGridCol = {
		"Cfg": {
			"id"				: "idsmSetupMainGrid"
			, "CfgId"			: "idsmSetupMainGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" 	: "100"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "730"
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
//			, "MainCol"			: "TRK_ITEM_NAME"
			, "SafeCSS"			: "1"
			, "Sorting"			: "1"
			, "Code" : gridCode
			,"CopyCols" : "0"
			,"ColsPosLap":"1"
			//,"ColsLap":"1"

		}
		, "Toolbar" : {
			"Cells20Data"		: "Export"
			, "Cells60Cfg"		: "Columns"
			, "Cells70Styles"	: "Styles,Sizes,Scales"
			, "Visible"			: "1"
		}
		, "Panel" : {
			"Visible"	: "1"
			, "Spanned"	: "1"
		}
		, "Cols" : [
			  { "Name": "PROJECT_NO"				, "Width": "0"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText", "Visible" :"0"								, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "TYPE"						, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "CATEGORY"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL1"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL2"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL3"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL4"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_SYSTEM"		        , "Width": "200"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridLinkText"									, "CanMove" : "0"	, "CanEdit" : "0" , "OnClickCell": "openItemModal( Grid, Row,Col )"	, "IconSize" : "2"	}
			, { "Name": "DESC_EQUIPMENT"			, "Width": "180"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "KKS_NO"					, "Width": "180"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_TYPE"					, "Width": "200"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "KEY_SPECIFICATION"			, "Width": "220"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "ITEM_PART_NO"				, "Width": "180"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "STORAGE_CLASSIFICATION"	, "Width": "200"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "SHELF_LIFE"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "INSTALLED_QTY"				, "Width": "150"	, "Type": "Float"	, "Format" : "###,###,###,##0.###"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridRightText"	, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "RECOMMENDED_QTY"			, "Width": "180"	, "Type": "Float"	, "Format" : "###,###,###,##0.###"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridRightText"	, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "ST_QTY"					, "Width": "180"	, "Type": "Float"	, "Format" : "###,###,###,##0.###"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridRightText"	, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "UNIT"						, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "CURRENCY"					, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			
			, { "Name": "UNIT_PRICE"				, "Width": "150"	, "Type": "Float"	, "Format" : "###,###,###,##0.###"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridRightText"	, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "DELIVERY"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "MANUFACTURER"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "ATTACH_GRP_CD"				, "Width": "60"		, "Type": "Icon"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "WEIGHT"					, "Width": "150"	, "Type": "Float"	, "Format" : "###,###,###,##0.###"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridRightText"	, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "DIMENSION"					, "Width": "200"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "RELATED_DRAWING"			, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "TRK_ITEM_NAME"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor" 									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "SHIPMENT_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			
			, { "Name": "SHIPMENT_SEQ"		        , "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "INVOICE_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			
			, { "Name": "PACKAGE_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "MATERIAL_CODE"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "CREATED_BY"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "CREATION_DATE"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "SPST_CODE"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
		], "Head" : [
			{
				"Kind"						: "Header"
				, "Class"					: "gridCenterText"
				, "id"						: "Header"
				, "Spanned"					: "1"
				, "PROJECT_NO"				: "PROJECT_NO"
				, "TYPE"					: 'TYPE'
				, "CATEGORY"				: 'Category'
				, "LEVEL1"					: 'Level1'
				, "LEVEL2"					: 'Level2'
				, "LEVEL3"					: 'Level3'
				, "LEVEL4"					: 'Level4'
				, "DESC_SYSTEM"				: 'Desc. of SYSTEM/PKG'
				, "DESC_EQUIPMENT"			: 'Desc. of Equipment'
				, "KKS_NO"					: 'KKS NO. of Equip.'
				, "DESC_TYPE"				: 'Description of SP/ST'
				, "KEY_SPECIFICATION"		: 'Key Specification of SP/ST'
				, "ITEM_PART_NO"			: 'Item No / Part No'
				, "STORAGE_CLASSIFICATION"	: 'Storage Classification'
				, "SHELF_LIFE"				: 'Shelf life'
				, "INSTALLED_QTY"			: 'Installed QTY'
				, "RECOMMENDED_QTY"			: 'Recommended QTY'
				, "ST_QTY"					: 'Special tool QTY'
				, "UNIT"					: 'Unit'
				, "CURRENCY"				: 'Currency'
				, "UNIT_PRICE"				: 'Unit Price'
				, "DELIVERY"				: 'Delivery (Week)'
				, "MANUFACTURER"			: 'Manufacturer'
				, "ATTACH_GRP_CD"			: 'File'
				, "WEIGHT"					: 'Weight(Kg)'
				, "DIMENSION"				: 'Dimension(m) (WxDxH)'
				, "RELATED_DRAWING"			: 'Related Drawing'
				, "TRK_ITEM_NAME"			: 'Item Name'
				, "SHIPMENT_NO"				: 'Shipment No'
				, "SHIPMENT_SEQ"			: 'Shipment Seq'
				, "INVOICE_NO"				: 'Invoice No'
				, "PACKAGE_NO"				: 'Package No'
				, "MATERIAL_CODE"			: 'Material Code'
				, "CREATED_BY"				: 'Created By'
				, "CREATION_DATE"			: 'Creation Date'
				, "SPST_CODE"				: "Number"
			}
		]
	};

	dlgExcelDownLoadGridCol = {
		"Cfg" : { 
			  "id" : "idsmDlgExcelDownLoadGrid"
			, "CfgId" : "idsmDlgExcelDownLoadGridCfg"
			, "SuppressCfg" : "0"
			, "StyleLap":"0"
			, "Version" : "4"
			, "CacheTimeout" : "100"
			, "Style" : "Material"
			, "Size" : "Low"
			, "Scale" : "90%"
			, "ConstWidth" : "100%"
			, "MinTagHeight": "500"
			, "MaxHeight": "1" 
			, "Paging": "2"
			, "PageLength": "20"
			, "ChildParts" : "2" 
			, "NoPager" : "1"
			, "Dragging" : "0"
			, "SelectingSingle" : "0"
			, "Adding" : "0"
			, "Export" : "1"
			, "Deleting" : "0"
			, "Code" : gridCode
			, "CopyCols" : "0"
			, "SafeCSS" : "1"
			, "Sorting" : "0"
		}
		,"Panel" : {
			"Visible" : "0"
			, "Spanned" : "1"
		}
		,"Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			  {	"Name": "PROJECT_NO"				, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "TYPE"						, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "CATEGORY"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL2"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL3"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL4"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_SYSTEM"		        , "Width": "80"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_EQUIPMENT"			, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "KKS_NO"					, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_TYPE"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "KEY_SPECIFICATION"			, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "ITEM_PART_NO"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "STORAGE_CLASSIFICATION"	, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "SHELF_LIFE"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "INSTALLED_QTY"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "RECOMMENDED_QTY"			, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "ST_QTY"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "UNIT"						, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "CURRENCY"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			
			, { "Name": "UNIT_PRICE"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "DELIVERY"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "MANUFACTURER"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "ATTACH_GRP_CD"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "WEIGHT"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "DIMENSION"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "RELATED_DRAWING"			, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "TRK_ITEM_NAME"				, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor" 									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "SHIPMENT_NO"				, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			
			, { "Name": "SHIPMENT_SEQ"		        , "Width": "80"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "INVOICE_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			
			, { "Name": "PACKAGE_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "MATERIAL_CODE"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "SPST_CODE"					, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
		], "Head" : [
			{
				"Kind"						: "Header"
				, "Class"					: "gridCenterText"
				, "id"						: "Header"
				, "Spanned"					: "1"
				, "PROJECT_NO"				: "PROJECT_NO"
				, "TYPE"					: 'TYPE'
				, "CATEGORY"				: 'CATEGORY'
				, "LEVEL1"					: 'Level1'
				, "LEVEL2"					: 'Level2'
				, "LEVEL3"					: 'Level3'
				, "LEVEL4"					: 'Level4'
				, "DESC_SYSTEM"				: 'DESC_SYSTEM'
				, "DESC_EQUIPMENT"			: 'DESC_EQUIPMENT'
				, "KKS_NO"					: 'KKS_NO'
				, "DESC_TYPE"				: 'DESC_TYPE'
				, "KEY_SPECIFICATION"		: 'KEY_SPECIFICATION'
				, "ITEM_PART_NO"			: 'ITEM_PART_NO'
				, "STORAGE_CLASSIFICATION"	: 'STORAGE_CLASSIFICATION'
				, "SHELF_LIFE"				: 'SHELF_LIFE'
				, "INSTALLED_QTY"			: 'INSTALLED_QTY'
				, "RECOMMENDED_QTY"			: 'RECOMMENDED_QTY'
				, "ST_QTY"					: 'ST_QTY'
				, "UNIT"					: 'UNIT'
				, "CURRENCY"				: 'CURRENCY'
				, "UNIT_PRICE"				: 'UNIT_PRICE'
				, "DELIVERY"				: 'DELIVERY'
				, "MANUFACTURER"			: 'MANUFACTURER'
				, "ATTACH_GRP_CD"			: 'ATTACH_GRP_CD'
				, "WEIGHT"					: 'WEIGHT'
				, "DIMENSION"				: 'DIMENSION'
				, "RELATED_DRAWING"			: 'RELATED_DRAWING'
				, "TRK_ITEM_NAME"			: 'TRK_ITEM_NAME'
				, "SHIPMENT_NO"				: 'SHIPMENT_NO'
				, "SHIPMENT_SEQ"			: 'SHIPMENT_SEQ'
				, "INVOICE_NO"				: 'Invoice No'
				, "PACKAGE_NO"				: 'PACKAGE_NO'
				, "MATERIAL_CODE"			: 'MATERIAL_CODE'
				, "CREATED_BY"				: 'CREATED_BY'
				, "CREATION_DATE"			: 'CREATION_DATE'
				, "SPST_CODE"				: "Number"
			}
		]
	};

	dlgExcelUpLoadGridCol = {
		"Cfg" : { 
			"id" : "idsmDlgExcelUploadGrid"
			, "CfgId" : "idsmDlgExcelUploadGridCfg"
			, "SuppressCfg" : "0"
			, "StyleLap":"0"
			, "Version" : "1"
			, "CacheTimeout" : "100"
			, "Style" : "Material"
			, "Size" : "Low"
			, "Scale" : "90%"
		 	, "ConstWidth" : "100%"
		 	, "MinTagHeight": "500"
		 	, "MaxHeight": "1" 
		 	, "Paging": "2"
		 	, "PageLength": "20"
		 	, "ChildParts" : "2"
		 	, "NoPager" : "1"
			, "Dragging" : "0"
			, "SelectingSingle" : "0"
			, "Adding" : "0"
			, "Export" : "1"
			, "Deleting" : "0"
			, "Code" : gridCode
			, "CopyCols" : "0"
			, "SafeCSS" : "1"
			, "Sorting" : "0"
			, "ImportRows" : "1"
			, "ImportAdd" : "2"
		}
		,"Panel" : {
			"Visible" : "0"
			, "Spanned" : "1"
		}
		,"Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			  { "Name": "PROJECT_NO"				, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "TYPE"						, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "CATEGORY"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0" , "OnClickCell": "openItemModal( Grid, Row,Col )"	, "IconSize" : "2"	}
			, { "Name": "LEVEL2"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL3"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "LEVEL4"					, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_SYSTEM"		        , "Width": "80"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_EQUIPMENT"			, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "KKS_NO"					, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "DESC_TYPE"					, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "KEY_SPECIFICATION"			, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "ITEM_PART_NO"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "STORAGE_CLASSIFICATION"	, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "SHELF_LIFE"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "INSTALLED_QTY"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "RECOMMENDED_QTY"			, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "ST_QTY"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "UNIT"						, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "CURRENCY"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			
			, { "Name": "UNIT_PRICE"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1"	}
			, { "Name": "DELIVERY"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "MANUFACTURER"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "ATTACH_GRP_CD"				, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "WEIGHT"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			, { "Name": "DIMENSION"					, "Width": "90"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor gridCenterText"					, "CanMove" : "0"	, "CanEdit" : "1" 	}
			
			, { "Name": "RELATED_DRAWING"			, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "TRK_ITEM_NAME"				, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor" 									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "SHIPMENT_NO"				, "Width": "120"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			
			, { "Name": "SHIPMENT_SEQ"		        , "Width": "80"		, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
			, { "Name": "INVOICE_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			
			, { "Name": "PACKAGE_NO"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "MATERIAL_CODE"				, "Width": "150"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	, "Align": "center"}
			, { "Name": "SPST_CODE"					, "Width": "100"	, "Type": "Text"	, "Spanned":"1"	, "Class" : "gridBorderText gridTextColor"									, "CanMove" : "0"	, "CanEdit" : "0"	}
		], "Head" : [
			{
				"Kind"						: "Header"
				, "Class"					: "gridCenterText"
				, "id"						: "Header"
				, "Spanned"					: "1"
				, "PROJECT_NO"				: "PROJECT_NO"
				, "TYPE"					: 'TYPE'
				, "CATEGORY"				: 'CATEGORY'
				, "LEVEL1"					: 'Level1'
				, "LEVEL2"					: 'Level2'
				, "LEVEL3"					: 'Level3'
				, "LEVEL4"					: 'Level4'
				, "DESC_SYSTEM"				: 'DESC_SYSTEM'
				, "DESC_EQUIPMENT"			: 'DESC_EQUIPMENT'
				, "KKS_NO"					: 'KKS_NO'
				, "DESC_TYPE"				: 'DESC_TYPE'
				, "KEY_SPECIFICATION"		: 'KEY_SPECIFICATION'
				, "ITEM_PART_NO"			: 'ITEM_PART_NO'
				, "STORAGE_CLASSIFICATION"	: 'STORAGE_CLASSIFICATION'
				, "SHELF_LIFE"				: 'SHELF_LIFE'
				, "INSTALLED_QTY"			: 'INSTALLED_QTY'
				, "RECOMMENDED_QTY"			: 'RECOMMENDED_QTY'
				, "ST_QTY"					: 'ST_QTY'
				, "UNIT"					: 'UNIT'
				, "CURRENCY"				: 'CURRENCY'
				, "UNIT_PRICE"				: 'UNIT_PRICE'
				, "DELIVERY"				: 'DELIVERY'
				, "MANUFACTURER"			: 'MANUFACTURER'
				, "ATTACH_GRP_CD"			: 'ATTACH_GRP_CD'
				, "WEIGHT"					: 'WEIGHT'
				, "DIMENSION"				: 'DIMENSION'
				, "RELATED_DRAWING"			: 'RELATED_DRAWING'
				, "TRK_ITEM_NAME"			: 'TRK_ITEM_NAME'
				, "SHIPMENT_NO"				: 'SHIPMENT_NO'
				, "SHIPMENT_SEQ"			: 'SHIPMENT_SEQ'
				, "INVOICE_NO"				: 'Invoice No'
				, "PACKAGE_NO"				: 'PACKAGE_NO'
				, "MATERIAL_CODE"			: 'MATERIAL_CODE'
				, "SPST_CODE"				: "Number"
			}
		]
	};

	// Project 조회 팝업 그리드
	dlgProjectGridCol = {
		"Cfg" : {
			"id"				: "idsmDlgProjectGrid"
			, "CfgId"			: "idsmDlgProjectGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "CacheTimeout" : "100"
			, "Style"			: "Material"
			, "Size"			: "Low"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle"	: "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		}
		, "Panel" : {
			"Visible" : "1"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{	"Name": "SEGMENT1"	, "Width": "150", "Type": "Text", "Align": "center"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Code
			, {	"Name": "NAME"		, "Width": "520", "Type": "Text", "Align": "left"	, "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}	// Project Description
		]
		, "Header" : {
			"SEGMENT1"	: "Project Code"
			, "Class"	: "gridCenterText"
			, "NAME"	: "Project Description"
		}
	};

	mainGrid =	TreeGrid( {Layout:{Data:mainGridCol}, Data:{Data : {Body: [[]]}}, Text: text},"gridMain" );

	dlgExcelDownLoadGrid	=	TreeGrid( { Layout:{ Data: dlgExcelDownLoadGridCol	}, Data:{ Data: { Body: [ [] ] } }, Text: text }, "gridDlgExcelDownLoad"	);
	dlgExcelUpLoadGrid		=	TreeGrid( { Layout:{ Data: dlgExcelUpLoadGridCol	}, Data:{ Data: { Body: [ [] ] } }, Text: text }, "gridDlgExcelUpLoad"		);
	dlgProjectGrid			=	TreeGrid( { Layout:{ Data: dlgProjectGridCol		}, Data:{ Data: { Body: [ [] ] } }, Text: text }, "gridDlgProject"			);

	initMenuAuth(function (list) {

		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();

				if(row.AUTH_CODE == "S") {
					fileUse = false;
				}

			}
		}
	});

	initDefailProject(function (list) {
		if(list.length > 0) {
			$('#txtProjectCode').val(list[0]["SEGMENT1"]);
			$('#txtProjectName').val(list[0]["NAME"]);

			initVoyageCombo();
		}
	});
}

var fRow = null;
function mainGridSearchReload(grid) {
	var list = grid.Rows;
//	var cnt = 1;

	for (var key in list) {
		var gridRow = list[key];

		if(gridRow.Fixed == null){

			gridRow.ATTACH_GRP_CD = (gridRow.ATTACH_GRP_CD != null && gridRow.ATTACH_GRP_CD.length > 0) ? '/resources/ext/fontawesome-free/svgs/solid/paperclip.svg'
					//: '/resources/ext/fontawesome-free/svgs/solid/file-upload.svg';
					: '';
			grid.RefreshRow(gridRow);

//			gridRow.NO = cnt;
//			cnt += 1;

		}
	}
	return true;
}

function setDlgCreateItemControls(){

	removeValidationError("dlgCreateItem");
}

function setFocus(e){

	if(e){
		if(fRow != null){
			mainGrid.Focus(fRow, "TRK_ITEM_NAME", null, null, 1);
			if($("#dlgItemSchedule").is(":visible")){
				$('#dlgItemSchedule').click();
			}

		}

	}

}

//달력 셋팅
function initDatePicker( ) {
	//$.datepicker.setDefaults($.datepicker.regional['ko']);
	var picLocale = (fileLang == "en") ? "en" : "ko";
	$.datepicker.setDefaults($.datepicker.regional[picLocale]);

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,

/* 2021.09.28.달력 아이콘 삭제
		showOn: "both",
		buttonImage: "/resources/images/calendar_month.png",
		buttonImageOnly: true,
*/
		dateFormat: "yy/mm/dd",
	});
}

function initCode() {
	var codeList = [{"CODE" : "I001"},{"CODE" : "I002"},{"CODE" : "I003"},{"CODE" : "I004"},{"CODE" : "I005"},{"CODE" : "I006"}];
	var paramList = JSON.stringify(codeList);


	$.ajax({
		url: "/getCodeCombo.do",
		data: {"paramList" : paramList},
		success: function (data, textStatus, jqXHR) {
			var results = data.results;

			gridUserJobCode = setGridCombo(results.I006, "");
			setCombo(results.I001, "selSearchKey1", "");

			setCombo(results.I002, "selSearchKey2", "");
			setCombo(results.I003, "selSearchKey3", "");
			setCombo(results.I004, "selOnoOfshore", "all");
			setCombo(results.I001, "selSearchKey4", "");

			setCombo(results.I002, "selSearchKey5", "");
			setCombo(results.I003, "selSearchKey6", "");

			setCombo(results.I004, "seldlgCreateItemOnoOfshore", "");
			setCombo(results.I005, "seldlgCreateItemPaymentMilestone", "na");
			setCombo(results.I004, "seldlgCreateItemOnoOfshore", "");

			setCombo(results.I005, "selDlgItemSchedulePaymentMilestone", "na");
			setCombo(results.I004, "selDlgItemScheduleOnOfshore", "na");

		 	toDay = results.DAY[0].CUR_DAY;
			resetSearchControls();
			initTable();
		}
	});
}

function ShowCustomCalendar(G,row,col){
	var day = Get(row,col) == "" ? (new Date()).setUTCHours(0,0,0)-0 : Get(row,col);
	var d = new Date(day);
	var F = function(n) {
	   G.SetValue(row,col,n,1);
	};

	var P = {Align:"left above"};
	M = G.ShowCalendar(row,col,null,P,F,d);

	return true;
}

var selectDlgItemScheduleRow = null;
function openModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	if(row.Fixed != null){
		return false;
	}

	selectDlgItemScheduleRow = row;
	$('#dlgItemSchedule').modal('show');
}

function initFileInput(obj_id) {

	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme					: "fas"
		, language				: fileLang
		, showUpload			: false
		, hideThumbnailContent	: true
		, overwriteInitial		: false
		, validateInitialCount	: true
	});

	$(".btn-file").css("padding-top", "3px"	);
	$(".btn-file").css("height"		, "26px");

	$(".file-caption").css("height"			, "26px");
	$(".file-caption").css("padding-top"	, "3px"	);
	$(".file-caption").css("padding-bottom"	, "3px"	);
}

function initVoyageCombo() {
	$.ajax({
		url: "/getVoyageList.do",
		data: {"p_project_code" : $("#txtProjectCode").val() },
		success: function (data, textStatus, jqXHR) {
			var results = data.results;
			$("#selSearchShipmentNo option").remove();
			$("#selSearchShipmentNo").append("<option value=''>All</option>");
			$.each(results, function (index, entry) {
				$("#selSearchShipmentNo").append("<option value='" + entry["ATTRIBUTE10"] + "'>" + entry["ATTRIBUTE10"] + "</option>");
			});
		}
	});
}


function btnSearchClick() {

	if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
		$('#txtProjectCode').val("");
		$('#txtProjectName').val("");
		$("#txtProjectCode").parent().find(".autocomplete-valid").hide();
	}

	var chkValidation = checkRequiredField("tblSearchBox");

	if (!chkValidation) {
		alert($('#alertValidate').val());
		return;
	}

	$.ajax({
		url: "/getIdsmSupplySpSt.do",
		data: {"PROJECT_NO" : $("#txtProjectCode").val(), "TYPE" : $("#selSearchType option:selected").val(), "CATEGORY" : $("#selSearchCategory option:selected").val()
			, "DESC_SYSTEM" : $("#txtSearchDescSystem").val(), "MANUFACTURER" : $("#txtSearchManufacturer").val(), "SHIPMENT_NO" : $("#selSearchShipmentNo option:selected").val()/*, "TRK_ITEM_NAME" : $("#txtSearchTrkItemName").val()*/
			, "INVOICE_NO" : $("#txtSearchInvoiceNo").val(), "PACKAGE_NO" : $("#txtSearchPackageNo").val(), "DESC_EQUIPMENT" : $("#txtSearchDescEquipment").val()
			, "LEVEL1" : $("#txtSearchLevel1").val(), "LEVEL2" : $("#txtSearchLevel2").val(), "LEVEL3" : $("#txtSearchLevel3").val(), "LEVEL4" : $("#txtSearchLevel4").val()
		},
		success: function (data, textStatus, jqXHR) {

			mainGrid.Source.Data.Data.Body = [data.results];
			mainGrid.Reload();

        }
    });

}

function openItemModal (G,row,col) {
	if(row != null && row.Added != null && row.Added == 1) {
		return false;
	}

	$('#txtDlgIdsmSpstCode').val(row.SPST_CODE);
	$('#txtDlgIdsmProjectNo').val(row.PROJECT_NO);
	$('#selDlgIdsmType').val(row.TYPE);
	$('#selDlgIdsmCategory').val(row.CATEGORY);
	$('#txtDlgIdsmDescSystem').val(row.DESC_SYSTEM);
	$('#txtDlgIdsmDescEquipment').val(row.DESC_EQUIPMENT);
	$('#txtDlgIdsmKksNo').val(row.KKS_NO);
	$('#txtDlgIdsmDescType').val(row.DESC_TYPE);
	$('#txtDlgIdsmKeySpecification').val(row.KEY_SPECIFICATION);
	$('#txtDlgIdsmItemPartNo').val(row.ITEM_PART_NO);
	$('#txtDlgIdsmStorageClassification').val(row.STORAGE_CLASSIFICATION);
	$('#txtDlgIdsmShelfLife').val(row.SHELF_LIFE);
	$('#txtDlgIdsmInstalledQty').val(chkNumberObj.addComma(row.INSTALLED_QTY));
	$('#txtDlgIdsmRecommendedQty').val(chkNumberObj.addComma(row.RECOMMENDED_QTY));
	$('#txtDlgIdsmStQty').val(chkNumberObj.addComma(row.ST_QTY));
	$('#txtDlgIdsmUnit').val(row.UNIT);
	$('#txtDlgIdsmCurrency').val(row.CURRENCY);
	$('#txtDlgIdsmunitPrice').val(chkNumberObj.addComma(row.UNIT_PRICE));
	$('#txtDlgIdsmDelivery').val(row.DELIVERY);
	$('#txtDlgIdsmManufacturer').val(row.MANUFACTURER);
	$('#txtDlgIdsmAttachGrpCd').val(row.ATTACH_GRP_CD);
	$('#txtDlgIdsmWeight').val(chkNumberObj.addComma(row.WEIGHT));
	$('#txtDlgIdsmDimension').val(row.DIMENSION);
	$('#txtDlgIdsmRelatedDrawing').val(row.RELATED_DRAWING);
	$('#txtDlgIdsmTrkItemName').val(row.TRK_ITEM_NAME);
	$('#txtDlgIdsmShipmentNo').val(row.SHIPMENT_NO);
	$('#txtDlgIdsmShipmentSeq').val(row.SHIPMENT_SEQ);
	$('#txtDlgIdsmPackageNo').val(row.PACKAGE_NO);
	$('#txtDlgIdsmMaterialCode').val(row.MATERIAL_CODE);

	$('#txtDlgIdsmInvoiceNo').val(row.INVOICE_NO);
	$('#txtDlgIdsmLevel1').val(row.LEVEL1);
	$('#txtDlgIdsmLevel2').val(row.LEVEL2);
	$('#txtDlgIdsmLevel3').val(row.LEVEL3);
	$('#txtDlgIdsmLevel4').val(row.LEVEL4);

	$('#txtDlgIdsmSpstCode').addClass('required');
	$('#selDlgIdsmType').trigger('change');
			
	$('#dlgCreateItem').modal('show');
}

function dlgProjectListSearch() {
	$.ajax({
		url: "/getIdsmSetupDlgProject.do",
		data: {"keyword" : $('#txtDlgProjectProjectCode').val()},
		success: function (data, textStatus, jqXHR) {

			dlgProjectGrid.Source.Data.Data.Body = [data.results];
			dlgProjectGrid.ReloadBody();
        }
    });
}

function btnDlgExcelUploadFileChange(event) {
	var input = event.target;
	var list = [];
	var reader = new FileReader();
	var	sheetCol = [
		  'SPST_CODE'
		, 'PROJECT_NO'
		, 'TYPE'
		, 'CATEGORY'
		, 'DESC_SYSTEM'
		, 'DESC_EQUIPMENT'
		, 'KKS_NO'
		, 'DESC_TYPE'
		, 'KEY_SPECIFICATION'
		, 'ITEM_PART_NO'
		, 'STORAGE_CLASSIFICATION'
		, 'SHELF_LIFE'
		, 'INSTALLED_QTY'
		, 'RECOMMENDED_QTY'
		, 'ST_QTY'
		, 'UNIT'
		, 'CURRENCY'
		, 'UNIT_PRICE'
		, 'DELIVERY'
		, 'MANUFACTURER'
		, 'ATTACH_GRP_CD'
		, 'WEIGHT'
		, 'DIMENSION'
		, 'RELATED_DRAWING'
		, 'TRK_ITEM_NAME'
		, 'SHIPMENT_NO'
		, 'SHIPMENT_SEQ'
		, 'PACKAGE_NO'
		, 'MATERIAL_CODE'
		, 'INVOICE_NO'
		, 'LEVEL1'
		, 'LEVEL2'
		, 'LEVEL3'
		, 'LEVEL4'
	];

	reader.onload = function() {
		var fdata = reader.result;
		var read_buffer = XLSX.read(fdata, {type : 'binary'});
		read_buffer.SheetNames.forEach(function(sheetName) {
			var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName], { header: sheetCol });
			for(var i = 1; i < rowdata.length; i++) {
				var row = rowdata[i];
				var gridRow = {
					  "SPST_CODE"				: row['SPST_CODE']
					, "PROJECT_NO"				: row['PROJECT_NO']
					, "TYPE"					: row['TYPE']
					, "CATEGORY"				: row['CATEGORY']
					, "DESC_SYSTEM"				: row['DESC_SYSTEM']
					, "DESC_EQUIPMENT"			: row['DESC_EQUIPMENT']
					, "KKS_NO"					: row['KKS_NO']
					, "DESC_TYPE"				: row['DESC_TYPE']
					, "KEY_SPECIFICATION"		: row['KEY_SPECIFICATION']
					, "ITEM_PART_NO"			: row['ITEM_PART_NO']
					, "STORAGE_CLASSIFICATION"	: row['STORAGE_CLASSIFICATION']
					, "SHELF_LIFE"				: row['SHELF_LIFE']
					, "INSTALLED_QTY"			: row['INSTALLED_QTY']
					, "RECOMMENDED_QTY"			: row['RECOMMENDED_QTY']
					, "ST_QTY"					: row['ST_QTY']
					, "UNIT"					: row['UNIT']
					, "CURRENCY"				: row['CURRENCY']
					, "UNIT_PRICE"				: row['UNIT_PRICE']
					, "DELIVERY"				: row['DELIVERY']
					, "MANUFACTURER"			: row['MANUFACTURER']
					, "ATTACH_GRP_CD"			: row['ATTACH_GRP_CD']
					, "WEIGHT"					: row['WEIGHT']
					, "DIMENSION"				: row['DIMENSION']
					, "RELATED_DRAWING"			: row['RELATED_DRAWING']
					, "TRK_ITEM_NAME"			: row['TRK_ITEM_NAME']
					, "SHIPMENT_NO"				: row['SHIPMENT_NO']
					, "SHIPMENT_SEQ"			: row['SHIPMENT_SEQ']
					, "PACKAGE_NO"				: row['PACKAGE_NO']
					, "MATERIAL_CODE"			: row['MATERIAL_CODE']
					, "INVOICE_NO"				: row['INVOICE_NO']
					, "LEVEL1"					: row['LEVEL1']
					, "LEVEL2"					: row['LEVEL2']
					, "LEVEL3"					: row['LEVEL3']
					, "LEVEL4"					: row['LEVEL4']
				};
				list.push(gridRow);
			}
			console.log('dlgExcelUpLoadGrid', list);
			dlgExcelUpLoadGrid.Source.Data.Data.Body = [list];
			dlgExcelUpLoadGrid.ReloadBody();
		});
	};
	reader.readAsBinaryString(input.files[0]);
	input.value = null;
}

var btnClickObj = {
	excelDown : false,
	IconSearch : function() {
		$('#dlgProjectList').click();
		$('#txtDlgProjectProjectCode').val($('#txtProjectCode').val());
		$('#dlgProjectList').modal('show');
		
		dlgProjectListSearch();
	},
	IconDlgProjectSearch : function() {
		dlgProjectListSearch();
		return false;
	},
	DlgProjectSelect : function() {
		var selectList = dlgProjectGrid.GetSelRows();

		if(selectList.length == 0){
			alert($('#alertGridSelectDataNull').val());
			return;
		}

		var row = selectList[0];
	    $("#txtProjectCode").val(row.SEGMENT1);
		$("#txtProjectName").val(row.NAME);
		initVoyageCombo();
		$('#dlgProjectList').modal('hide');
	},
	Search : function() {
		mainGrid.ActionAcceptEdit();

		var changeObject = mainGrid.GetChanges();
		var changeList = JSON.parse(changeObject).Changes;

		if(changeList.length > 0){
			if (confirm($('#alertEditCheck').val())) {
				btnSaveClick("editCheck");
			}
			else {
				btnSearchClick();
			}
		}
		else {
			btnSearchClick();
		}
	},
	Resete : function() {
		resetSearchControls();
	},
	Save : function(type) {
		mainGrid.ActionAcceptEdit();

		if(mainGrid.RowCount == 0){
			alert($('#alertGridDataNull').val());
			return;
		}

		var changeObject = mainGrid.GetChanges();
		var changeList = JSON.parse(changeObject).Changes;

		if(changeList == 0){
			alert($('#alertGridEditDataNull').val());
			return;
		}
		if(type == "editCheck") {
			gridSave(changeList);
		}
		else {
			if (confirm($('#alertSave').val())) {
				gridSave(changeList);
			}
		}
	},
	CreateItem : function() {
		$('#txtDlgIdsmSpstCode').val('');
		$('#txtDlgIdsmProjectNo').val($('#txtProjectCode').val());
		$('#selDlgIdsmType').val('Spare Part');
		$('#selDlgIdsmCategory').val('');
		$('#txtDlgIdsmDescSystem').val('');
		$('#txtDlgIdsmDescEquipment').val('');
		$('#txtDlgIdsmKksNo').val('');
		$('#txtDlgIdsmDescType').val('');
		$('#txtDlgIdsmKeySpecification').val('');
		$('#txtDlgIdsmItemPartNo').val('');
		$('#txtDlgIdsmStorageClassification').val('');
		$('#txtDlgIdsmShelfLife').val('');
		$('#txtDlgIdsmInstalledQty').val('');
		$('#txtDlgIdsmRecommendedQty').val('');
		$('#txtDlgIdsmStQty').val('');
		$('#txtDlgIdsmUnit').val('');
		$('#txtDlgIdsmCurrency').val('');
		$('#txtDlgIdsmunitPrice').val('');
		$('#txtDlgIdsmDelivery').val('');
		$('#txtDlgIdsmManufacturer').val('');
		$('#txtDlgIdsmAttachGrpCd').val('');
		$('#txtDlgIdsmWeight').val('');
		$('#txtDlgIdsmDimension').val('');
		$('#txtDlgIdsmRelatedDrawing').val('');
		$('#txtDlgIdsmTrkItemName').val('');
		$('#txtDlgIdsmShipmentNo').val('');
		$('#txtDlgIdsmShipmentSeq').val('');
		$('#txtDlgIdsmPackageNo').val('');
		$('#txtDlgIdsmMaterialCode').val('');
		$('#txtDlgIdsmInvoiceNo').val('');
		$('#txtDlgIdsmLevel1').val('');
		$('#txtDlgIdsmLevel2').val('');
		$('#txtDlgIdsmLevel3').val('');
		$('#txtDlgIdsmLevel4').val('');

		$('#txtDlgIdsmSpstCode').removeClass('required');
		$('#selDlgIdsmType').trigger('change');
		$('#dlgCreateItem').modal('show');
	},
	CreateItemAtt : function() {
		var param = {'ATTACH_GRP_CD' : $('#txtDlgIdsmAttachGrpCd').val(), 'fileUse' : true};

		if(param.ATTACH_GRP_CD == null) {
			param.ATTACH_GRP_CD = "";
		}
		
		toDay = new Date().format('yyyy/mm/dd');

		$('#dlgDesmCreateItemPopUp').load("/desmAttListPopUp.do",null,function(data, status, xhr) {
			if(status == "success"){
				initTransAttListPopUp(param, function (key, returnParam) {
					console.log(key, returnParam);
					$('#txtDlgIdsmAttachGrpCd').val(returnParam.ATTACH_GRP_CD);
				});
			}
		});
	},
	SaveItem : function() {
		if($('#txtDlgIdsmProjectNo').val().length < 2 || $('#txtDlgIdsmProjectNo').val() == "") {
			
		}

		var chkValidation = checkRequiredField("dlgCreateItem");

		if (!chkValidation) {
			alert($('#alertValidate').val());
			$('#txtDlgIdsmProjectNo').val($('#txtProjectCode').val());
			return;
		}

		var paramData = {
			  'SPST_CODE' 				: $('#txtDlgIdsmSpstCode').val()
			, 'PROJECT_NO' 				: $('#txtDlgIdsmProjectNo').val()
			, 'TYPE' 					: $('#selDlgIdsmType option:selected').val()
			, 'CATEGORY' 				: $('#selDlgIdsmCategory option:selected').val()
			, 'DESC_SYSTEM' 			: $('#txtDlgIdsmDescSystem').val()
			, 'DESC_EQUIPMENT' 			: $('#txtDlgIdsmDescEquipment').val()
			, 'KKS_NO' 					: $('#txtDlgIdsmKksNo').val()
			, 'DESC_TYPE' 				: $('#txtDlgIdsmDescType').val()
			, 'KEY_SPECIFICATION'		: $('#txtDlgIdsmKeySpecification').val()
			, 'ITEM_PART_NO' 			: $('#txtDlgIdsmItemPartNo').val()
			, 'STORAGE_CLASSIFICATION'	: $('#txtDlgIdsmStorageClassification').val()
			, 'SHELF_LIFE' 				: $('#txtDlgIdsmShelfLife').val()
			, 'INSTALLED_QTY' 			: chkNumberObj.removeComma($('#txtDlgIdsmInstalledQty').val())
			, 'RECOMMENDED_QTY' 		: chkNumberObj.removeComma($('#txtDlgIdsmRecommendedQty').val())
			, 'ST_QTY' 					: chkNumberObj.removeComma($('#txtDlgIdsmStQty').val())
			, 'UNIT' 					: $('#txtDlgIdsmUnit').val()
			, 'CURRENCY' 				: $('#txtDlgIdsmCurrency').val()
			, 'UNIT_PRICE' 				: chkNumberObj.removeComma($('#txtDlgIdsmunitPrice').val())
			, 'DELIVERY' 				: $('#txtDlgIdsmDelivery').val()
			, 'MANUFACTURER' 			: $('#txtDlgIdsmManufacturer').val()
			, 'ATTACH_GRP_CD' 			: $('#txtDlgIdsmAttachGrpCd').val()
			, 'WEIGHT' 					: chkNumberObj.removeComma($('#txtDlgIdsmWeight').val())
			, 'DIMENSION' 				: $('#txtDlgIdsmDimension').val()
			, 'RELATED_DRAWING' 		: $('#txtDlgIdsmRelatedDrawing').val()
			, 'TRK_ITEM_NAME' 			: $('#txtDlgIdsmTrkItemName').val()
			, 'SHIPMENT_NO' 			: $('#txtDlgIdsmShipmentNo').val()
			, 'SHIPMENT_SEQ' 			: $('#txtDlgIdsmShipmentSeq').val()
			, 'PACKAGE_NO' 				: $('#txtDlgIdsmPackageNo').val()
			, 'MATERIAL_CODE' 			: $('#txtDlgIdsmMaterialCode').val()
			, 'INVOICE_NO' 				: $('#txtDlgIdsmInvoiceNo').val()
			, 'LEVEL1' 					: $('#txtDlgIdsmLevel1').val()
			, 'LEVEL2' 					: $('#txtDlgIdsmLevel2').val()
			, 'LEVEL3' 					: $('#txtDlgIdsmLevel3').val()
			, 'LEVEL4' 					: $('#txtDlgIdsmLevel4').val()
		};

		if (confirm($('#alertSave').val())) {
			$.ajax({
				url: "/saveIdsmItemSupplySpSt.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						alert_fail(result.error);
					} else {
						alert_success($('#alertSuccess').val());
						btnSearchClick();
						$('#dlgCreateItem').modal('hide');
					}
				}
			});
		}
	},
	DeleteItem : function() {

		var deleteList = [];
		var selectList = mainGrid.GetSelRows();

		if(selectList.length == 0){
			alert($('#alertGridSelectDataNull').val());
			return;
		}

		if (confirm($('#alertDelete').val())) {
			for(var i = 0; i < selectList.length; i++){

				var row = selectList[i];
				if(row.Added != null && row.Added == 1){
					dlgItemScheduleAdminGrid.RemoveRow(row);
				}
				else{
					var deleteRow = {
							"PROJECT_NO" 	: row.PROJECT_NO 	+ ''
							, "TYPE" 		: row.TYPE 			+ ''
							, "CATEGORY" 	: row.CATEGORY 		+ ''
							, "DESC_SYSTEM" : row.DESC_SYSTEM 	+ ''
					};
					deleteList.push(deleteRow);
				}
			}

			if(deleteList.length > 0){
				var list = JSON.stringify(deleteList);
				var paramData = {"deleteList" : list};

				$.ajax({
					url: "/deleteIdsmItemSupplySpSt.do",
					data: paramData,
					success: function (result, textStatus, jqXHR) {
						if (result.error != null) {
							alert_fail(result.error);
						} else {
							alert_success($('#alertDeleteSuccess').val());
							btnSearchClick();
						}
					}
				});
			}
			else{
				alert_success($('#alertDeleteSuccess').val());
			}
		}
	},
	ExcelDownload : function() {
		mainGrid.ActionExport();
	},
	ExcelUpload : function(type) {
		dlgExcelDownLoadGrid.Source.Data.Data.Body = [[]];
		dlgExcelDownLoadGrid.Reload();

		dlgExcelUpLoadGrid.Source.Data.Data.Body = [[]];
		dlgExcelUpLoadGrid.ReloadBody();

		$('#dlgExcelUpload').modal('show');
	},
	DlgExcelUpload : function() {
		$('#btnDlgExcelUploadFile').click();
	},
	DlgExcelUploadDownload : function() {
		excelDown = true;

		if($('#txtProjectCode').val().length < 2 || $('#txtProjectName').val() == ""){
			dlgExcelDownLoadGrid.Source.Data.Data.Body = [[]];
			dlgExcelDownLoadGrid.Reload();
		}
		else{
			$.ajax({
				url: "/getIdsmSupplySpSt.do",
				data: { "PROJECT_NO" : $("#txtProjectCode").val() },
				success: function (data, textStatus, jqXHR) {
					dlgExcelDownLoadGrid.Source.Data.Data.Body = [data.results];
					dlgExcelDownLoadGrid.Reload();
		        }
		    });
		}
	},
	DlgExcelUploadSave : function() {
		if(dlgExcelUpLoadGrid.RowCount == 0){
			alert($('#alertGridDataNull').val());
			return;
		}

		if (confirm($('#alertSave').val())) {
			var updateList = [];

			for (var key in dlgExcelUpLoadGrid.Rows) {

				var gridRow = dlgExcelUpLoadGrid.Rows[key];
				if(gridRow.Fixed == null) {
					var updateRow = {
						  "SPST_CODE"				: gridRow['SPST_CODE'] 				+ ''
						, "PROJECT_NO"				: gridRow['PROJECT_NO'] 			+ ''
						, "TYPE"					: gridRow['TYPE'] 					+ ''
						, "CATEGORY"				: gridRow['CATEGORY'] 				+ ''
						, "DESC_SYSTEM"				: gridRow['DESC_SYSTEM'] 			+ ''
						, "DESC_EQUIPMENT"			: gridRow['DESC_EQUIPMENT'] 		+ ''
						, "KKS_NO"					: gridRow['KKS_NO'] 				+ ''
						, "DESC_TYPE"				: gridRow['DESC_TYPE'] 				+ ''
						, "KEY_SPECIFICATION"		: gridRow['KEY_SPECIFICATION'] 		+ ''
						, "ITEM_PART_NO"			: gridRow['ITEM_PART_NO'] 			+ ''
						, "STORAGE_CLASSIFICATION"	: gridRow['STORAGE_CLASSIFICATION'] + ''
						, "SHELF_LIFE"				: gridRow['SHELF_LIFE'] 			+ ''
						, "INSTALLED_QTY"			: chkNumberObj.removeComma(gridRow['INSTALLED_QTY']		+ '')
						, "RECOMMENDED_QTY"			: chkNumberObj.removeComma(gridRow['RECOMMENDED_QTY']	+ '')
						, "ST_QTY"					: chkNumberObj.removeComma(gridRow['ST_QTY'] 			+ '')
						, "UNIT"					: gridRow['UNIT'] 					+ ''
						, "CURRENCY"				: gridRow['CURRENCY'] 				+ ''
						, "UNIT_PRICE"				: chkNumberObj.removeComma(gridRow['UNIT_PRICE'] 		+ '')
						, "DELIVERY"				: gridRow['DELIVERY'] 				+ ''
						, "MANUFACTURER"			: gridRow['MANUFACTURER'] 			+ ''
						, "ATTACH_GRP_CD"			: gridRow['ATTACH_GRP_CD'] 			+ ''
						, "WEIGHT"					: chkNumberObj.removeComma(gridRow['WEIGHT'] 			+ '')
						, "DIMENSION"				: gridRow['DIMENSION'] 				+ ''
						, "RELATED_DRAWING"			: gridRow['RELATED_DRAWING'] 		+ ''
						, "TRK_ITEM_NAME"			: gridRow['TRK_ITEM_NAME'] 			+ ''
						, "SHIPMENT_NO"				: gridRow['SHIPMENT_NO'] 			+ ''
						, "SHIPMENT_SEQ"			: gridRow['SHIPMENT_SEQ'] 			+ ''
						, "PACKAGE_NO"				: gridRow['PACKAGE_NO'] 			+ ''
						, "MATERIAL_CODE"			: gridRow['MATERIAL_CODE'] 			+ ''
						, "INVOICE_NO"				: gridRow['INVOICE_NO'] 			+ ''
						, "LEVEL1"					: gridRow['LEVEL1'] 				+ ''
						, "LEVEL2"					: gridRow['LEVEL2'] 				+ ''
						, "LEVEL3"					: gridRow['LEVEL3'] 				+ ''
						, "LEVEL4"					: gridRow['LEVEL4'] 				+ ''
					};
//					objNullCheck(updateRow);

					chkNull(updateRow);
					updateList.push(updateRow);
				}
			}
			var paramData = {"updateList" : JSON.stringify(updateList)};
			$.ajax({
				url: "/saveIdsmSupplySpStExceluploadUpdate.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {

					if (result.error != null) {
						if(result.error == "-2") {
				          alert_fail($('#alertSaveAlreadySequence').val());
				        }
				        else {
				        	alert_fail(result.error);
				        }
					}
					else {
						alert_success($('#alertSaveSuccess').val());
						btnSearchClick();
						$('#dlgExcelUpload').modal('hide');
					}
				}
			});
		}
	}
};

function chkNull(obj) {

	for (var key in obj) {
		var val = obj[key];
		if(val == null || typeof(val) == undefined || val == 'undefined'){
			obj[key] = "";
		}
	}
	
	return obj;	
}

var chkNumberObj = {
	init: function() {
		var _this = this;
		$('.currency').focus(function () { $(this).val(_this.removeComma($(this).val())); });
		$('.currency').blur(function () {
			if(isNaN(_this.removeComma($(this).val()))) {
				var field = $(this).closest('div').prev().find('label').text();
				alert_modal('', field + $('#alertInputNumber').val());
				$(this).val('');
			}
			else {
				$(this).val(_this.addComma($(this).val()));
			}
		});
	},
	addComma : function(val) {
		if (val == "0") return "0";
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		return (val == null || val == "") ? "" : val.toString().replace(regexp, ',');
	},
	removeComma : function(val) {
		if (val == "0") return "0";
		var regexp = /,/g;
		return (val == null || val == "") ? "" : val.replace(regexp, '');
	}
}; 
