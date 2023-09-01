var gridLang = {};
var fileLang = "en";
var testTableGrid;
var elSelLocation;

function gridResize() {
	$("#gridTestTable").width($(".table-responsive").width());
	$("#gridTestTable").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
}

$(window).resize(function() {
	gridResize();
});

$(document).ready(function () {
	console.log('test');
	if($('#txtDesmLang').val() == "ko"){
		fileLang = "kr";
		gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
	}

	initControls();
	gridResize();
});

function initControls() {
	$('#btnSearch').click(function () {{btnSearchClick();} return false; });
	initTypeCode(initTable);
}

function initTable(){
	var gridCode = getGridCode();
	var testTableGridCol = {"Cfg": {"id"				: "testTableGrid"
									, "CfgId"			: "testTableGridCfg"
									, "SuppressCfg"		: "0"
									, "StyleLap"		: "0"
									, "Version"			: "7"
									, "CacheTimeout"    : "100"
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
									//,"ColsLap": "1"
							}
									//,"ColsPosLap":"1","ColsLap": "1" column변경사항 바로 적용 안될시
							,"Panel" : {"Visible" : "1", "Spanned":"1"}
							, "Toolbar" : {
								"Cells20Data"		: "Export"
								, "Cells60Cfg"		: "Columns"
								, "Cells70Styles"	: "Styles,Sizes,Scales"
								, "Visible"			: "1"
							}
							, "Cols" : [
								{	"Name"	: "SEQ_NO", "Width": "100", "Type": "Int", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COLINTA", "Width": "100", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COLINTB", "Width": "100", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COLINTC", "Width": "100", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COLINTD", "Width": "100", "Type": "Int", "Format" : "###,###,###,###", "Class" : "gridBorderText gridTextColor gridRightText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1" },
								{	"Name"	: "COLTEXTA", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "COLTEXTB", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "COLTEXTC", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "COLTEXTD", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "1", "Spanned":"1"},
								{	"Name"	: "COLDATE", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "FILE_GRP_CD", "Width": "80"	, "Type": "Icon", "Spanned":"1", "CanMove" : "0", "CanEdit": "0" , "OnClickCell": "openAttModal( Grid, Row,Col )","Icon" :"/resources/ext/fontawesome-free/svgs/solid/paperclip.svg", "IconAlign" : "Center"	, "IconSize" : "2"	},
								{	"Name"	: "FILE_CLOB", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
								{	"Name"	: "FILE_BLOB", "Width": "150", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1"},
							]
//							TYPE : Special tool / Spare part / Commissiong part / Monitoring
							,"Header" : {
								"SEQ_NO" : "Seq No",
								"COLINTA" : "Int A",
								"COLINTB" : "Int B",
								"COLINTC" : "Int C",
								"COLINTD" : "Int D",
								"COLTEXTA" : "Text A",
								"COLTEXTB" : "Text B",
								"COLTEXTC" : "Text C",
								"COLTEXTD" : "Text D",
								"COLDATE" : "Date",
								"FILE_GRP_CD" : "File Grp Cd",
								"FILE_CLOB" : "Clob",
								"FILE_BLOB" : "Bloc",
								}
							};

	testTableGrid = TreeGrid( {Layout:{Data : testTableGridCol}, Data:{Data : {Body: [[]]}}, Text: gridLang},"gridTestTable" );

	TGSetEvent("OnChange","testTableGrid",function(grid,row){
		grid.RefreshRow(row);
	});

	initMenuAuth(function (list) {
		for(var i = 0; i < list.length; i++){
			var row = list[i];

			if(row.USE_YN == "N"){
				var eId = "button[authType=" + row.AUTH_CODE + "]";
				$(eId).remove();
			}
		}
	});
}
function initDatePicker() {

	if($('#txtDesmLang').val() == "ko"){
		$.datepicker.setDefaults($.datepicker.regional['ko']);
	}

	$("input[name=inpDatePicker]").datepicker( {
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy/mm/dd",
	});

}

function btnSearchClick() {
	var paramData = {
		test_key: 'test_value',
	}

	$.ajax({
		url: "/getTestTable.do",
		data: paramData,
		success: function (data, textStatus, jqXHR) {
			var list = data.results;
			testTableGrid.Source.Data.Data.Body = [list];
			testTableGrid.Reload();

        }
    });
}

function openAttModal (G,row,col) {
	if(row.Added != null && row.Added == 1){
		return false;
	}

	var param = Object.assign({}, row);
		param.ATTACH_GRP_CD = param.FILE_GRP_CD;
		param.TEST_TABLE_YN = 'Y';
		param.fileUse = true;
		param.hideThumbnailContent = false;
		param.width = "1000px";

	$('#dlgTestPopUp').load("/testAttListPopUp.do",null,function(data, status, xhr) {
		if(status == "success"){
			initTransAttListPopUp(param, function (key, returnParam) {
				if(key == "save-item"){
					$('#btnSearch').click();
				}
			});
		}
	});
}


function formatDate(d){
	if(d == null || d == ""){return "";}
	var date = new Date(d);
	return date.getFullYear() + "/" + chkDate(date.getMonth() + 1) + "/" + chkDate(date.getDate());
}

function chkDate(m){
	var month = m + "";
	if(month.length == 1){
		month = "0" + month;
	}

	return month;
}