/*
	기자재 일정관리 > 기자재 일정관리 > 목록 > 팝업( item 정보 세로 두줄 버전 등 )
*/
var col1;
var grid1;

var col2;
var grid2;

var col111;
var grid111;

var col1111;
var grid1111;

var col11111;
var grid11111;

var col111111;
var grid111111;

$(document).ready(function () {

	initControls();
	setPopCol();
	//setData();

});

function initControls() {
	initFileInput("txtEvidenceFile");

	// 달력 셋팅
	initPopDatePicker( );
}

// 
function setPopCol() {
	col1 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MainCol"		: "aa"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
			, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
			, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "Deleting" : "0"
			
		}
		,"Panel" : {"Visible" : "0"}
		,"Toolbar" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name"	: "aa", "Width": "356", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name"	: "bb", "Width": "120", "Type": "Text" ,"Spanned" : "1"	}
		]
		, "Header" : {
			"aa"	: "Item"
			, "bb"	: "일정 Issue"
		}
	};

	col2 = {
		"Cfg" : {
			"ConstWidth"	: "100%"			
			, "MinTagHeight": "150"
			, "MaxHeight"	: "150"
			, "SuppressCfg"	: "1"
			, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
			, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			, "Deleting" : "0"
		}
		,"Toolbar" : {"Visible" : "0"}
		, "Panel" : {"Spanned" : "1"}
		, "Cols" : [
			{	"Name": "aa", "Width": "80"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "70"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "70"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "dd", "Width": "100", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "ee", "Width": "156", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Head" : [
			{
				"Kind"			: "Header"
				, "id"			: "Header"
				, "Spanned"		: "1"
				, "PanelRowSpan": "2"
				, "aa"			: "담당"
				, "aaRowSpan"	: "2"
				, "bb"			: "R&R(일정)"
				, "bbSpan"		: "2"
				, "cc"			: ""
				, "dd"			: "담당자명"
				, "ddRowSpan"	: "2"
				, "ee"			: "담당자부서"
				, "eeRowSpan"	: "2"
			}
			, {
				"Kind"		: "Header"
				,"Spanned"	: "1"
				, "aa"		: "담당"
				, "bb"		: "관리"
				, "cc"		: "조회"
				, "dd"		: "담당자명"
				, "ee"		: "담당자부서"
			}
		]
	};

	col111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
		}
		,"Toolbar" : {"Visible" : "0"}
		,"Panel" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "150", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "90"	, "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "dd", "Width": "110", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "Issue 제목"
			, "bb"	: "Issue 발생일"
			, "cc"	: "조치여부"
			, "dd"	: "등록자"
		}
	};

	col1111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
		}
		,"Toolbar" : {"Visible" : "0"}
		,"Panel" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "356", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "담당자 명"
			, "bb"	: "담당자 부서"
		}
	};

	col11111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg"	: "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
			
		}
		,"Panel" : {"Visible" : "0"}
		,"Toolbar" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "260", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "100", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "110", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "알람 제목"
			, "bb"	: "발송(예정)일"
			, "cc"	: "등록자"
		}
	};

	col111111 = {
		"Cfg" : {
			"ConstWidth"	: "100%"
			, "MinTagHeight": "100"
			, "MaxHeight"	: "100"
			, "SuppressCfg" : "1"
	 		, "Paging"		: "2"
			, "PageLength"	: "20"
			, "ChildParts"	: "2"
			, "NoPager"		: "1"
	 		, "LimitScroll"	: "23"
			, "NoHScroll"	: "1"
		}
		,"Panel" : {"Visible" : "0"}
		,"Toolbar" : {"Visible" : "0"}
		, "Cols" : [
			{	"Name": "aa", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "bb", "Width": "236", "Type": "Text" ,"Spanned" : "1" }
			, {	"Name": "cc", "Width": "120", "Type": "Text" ,"Spanned" : "1" }
		]
		, "Header" : {
			"aa"	: "수신인"
			, "bb"	: "수신자 부서"
			, "cc"	: "발송일자"
		}
	};

	grid1		=	TreeGrid( { Layout:{ Data: col1		}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid11"		);
	grid2		=	TreeGrid( { Layout:{ Data: col2		}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid22"		);
	grid111		=	TreeGrid( { Layout:{ Data: col111	}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid111"	);
	grid1111	=	TreeGrid( { Layout:{ Data: col1111	}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid1111"	);
	grid11111	=	TreeGrid( { Layout:{ Data: col11111	}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid11111"	);
	grid111111	=	TreeGrid( { Layout:{ Data: col111111}, Data:{ Data: { Body: [ [
						{ "id": "a1", "aa": "aa1", "bb": "bb1" }
						, { "id": "b1", "aa": "aa2", "bb": "bb2" }
						, { "id": "c1", "aa": "aa3", "bb": "bb3" }
					] ] } } }, "grid111111" );
}

function setData() {
	grid1.Source.Data.Data.Body = [[]];
	grid1.ReloadBody();

	$.ajax({
		async		: false
		, type		: "POST"
		, url		: "/getTest.do"
		, data		: {}
		, dataType	: "json"
		, success	: function ( data, textStatus, jqXHR ) {
			var dataSet		= data.results;
			var tableData	= {
				"total"	: dataSet.length
				, "rows": dataSet
			};

			grid1.Source.Data.Data.Body = [ dataSet ];

			grid1.ReloadBody();
		}
	});
}

function initFileInput(obj_id) {
	$("#" + obj_id).val("");
	$("#" + obj_id).fileinput("destroy");
	$("#" + obj_id).fileinput({
		theme					: "fas"
		, language				: "kr"
		, showUpload			: false
		, hideThumbnailContent	: true
		, overwriteInitial		: false
		, validateInitialCount	: true
	});
}

// 달력 셋팅
function initPopDatePicker( ) {
	$("input[name=popDate]").datepicker( {
		changeMonth		: true
		, changeYear	: true
		, showOn		: "both"
		, buttonImage	: "/resources/images/calendar_month.png"
		, buttonImageOnly: true
		, dateFormat	: "yy/mm/dd"
	});
}