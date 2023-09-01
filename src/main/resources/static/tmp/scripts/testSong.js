/*
	기자재 일정관리 > 기자재 일정관리 > 목록( 팝업 창 높이 조정 버전)
*/
var col;
var grid;
var openPop = false;

$(document).ready(function () {

	setCol();

	// 조회영역 달력 셋팅
	initsearchDatePicker();

	setData();
	$('#btnSearch').click(function () {
		setData();
	});
});

function setCol() {
	col = {
		"Cfg" : {
		 	"id"			: "SpanHeader"
		 	, "MainCol"		: "TRK_ITEM_NAME"
		 	, "MinTagHeight": "500"
		 	, "MaxHeight"	: "1"
		 	, "SuppressCfg"	: "1"
		 	, "ColPagingFixed" : "0"
		 	, "ColPaging"	: "2"
		 	, "FastPanel"	: "0"
		 	, "SafeCSS"		: "1"
		}
		, "Panel"	: { "Spanned" : "1"}
		, "LeftCols": [ {
			"Name"		: "TRK_ITEM_NAME"
			, "Type"	: "Text"
			, "Width"	: "300"
			, "Spanned"	: "1"
			, "OnClick"	: "openModal(Grid,Row,Col);"	// Item 일정 및 Issue 관리 팝업 오픈
		}]
		, "Cols" : [
			{	"Name": "ATTRIBUTE3"			, "Width": "120", "Type": "Text"					, "Spanned":"1"	}	/* Vendor					*/
			, { "Name": "ATTRIBUTE7"			, "Width": "100", "Type": "Text"					, "Spanned":"1"	}	/* 선적국가					*/
			, { "Name": "ATTRIBUTE10"			, "Width": "90"	, "Type": "Text"					, "Spanned":"1"	}	/* 항차No						*/
			, { "Name": "SEL_INVOICE_NUM"		, "Width": "150", "Type": "Text"					, "Spanned":"1"	}	/* Invoice No				*/
			, { "Name": "ATTRIBUTE6"			, "Width": "120", "Type": "Text"					, "Spanned":"1"	}	/* 공급 Scope					*/

			, { "Name": "MPS_PLAN_DATE"			, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* MPS(PR) Plan(L3)			*/
			, { "Name": "MPS_EXPECTED_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* MPS(PR) Expected			*/
			, { "Name": "MPS_ACTUAL_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* MPS(PR) Actual			*/

			, { "Name": "PO_PLAN_DATE"			, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* PO Plan(L3)				*/
			, { "Name": "PO_EXPECTED_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* PO Expected				*/
			, { "Name": "PO_ATCUAL_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* PO Actual				*/

			, { "Name": "CARGO_PLAN_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* Cargo Ready Plan			*/
			, { "Name": "CARGO_EXPECTED_DATE"	, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* Cargo Ready Expected		*/
			, { "Name": "CARGO_ACTUAL_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* Cargo Ready Actual		*/

			, { "Name": "FOB_PLAN_DATE"			, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* FOB/지정장소 상차도 Plan(L3) 	*/
			, { "Name": "FOB_EXPECTED_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* FOB/지정장소 상차도 Expected	*/
			, { "Name": "FOB_ACTUAL_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* FOB/지정장소 상차도 Actual		*/

			, { "Name": "ATD_DATE"				, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* ATD(ETD)					*/
			, { "Name": "POD_DATE"				, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* POD						*/
			, { "Name": "ATA_DATE"				, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* ATA(ETA)					*/
			, { "Name": "SKB_PPN_APPLY_DATE"	, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* SKB PPN 신청				*/
			, { "Name": "SKB_PPN_ISSUED_DATE"	, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* SKB PPN 발급				*/
			, { "Name": "EBILLING_DATE"			, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* E-Bill 발급				*/
			, { "Name": "EBILLING_PAYMENT_DATE"	, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* E-Bill Pay.				*/
			, { "Name": "CUSTOMS_PASS_DATE"		, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* 세관판정					*/
			, { "Name": "CHANNEL_DATE"			, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* Channel					*/
			, { "Name": "CUSTOMS_INSPECTION_DATE","Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* Customs Ins				*/
			, { "Name": "SPPB_DATE"				, "Width": "120", "Type": "Date" ,"Format": "d"		, "Spanned":"1"	}	/* SPPB						*/

			, { "Name": "ONSITE_PLAN_DATE"		, "Width": "120"									, "Spanned":"1"	}	/* On Site Plan(L3)			*/
			, { "Name": "ONSITE_EXPECTED_DATE"	, "Width": "120"									, "Spanned":"1"	}	/* On Site Expected			*/
			, { "Name": "ONSITE_ACTUAL_DATE"	, "Width": "120"									, "Spanned":"1"	}	/* On Site Actual			*/

			, { "Name": "aa"					, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* Header No.				*/
			, { "Name": "bb"					, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* Line No.					*/
			, { "Name": "cc"					, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* Supplier					*/

			, { "Name": "dd"					, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* Payment Milestone		*/
			, { "Name": "ee"					, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* Activity					*/
			, { "Name": "PRIMAVERA_ID"			, "Width": "120", "Type": "Text"					, "Spanned":"1"}	/* L3 ID					*/

			, { "Name": "PM_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* PM 담당자					*/
			, { "Name": "EM_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* 설계 담당자					*/
			, { "Name": "BUYER_NAME"			, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* 구매 담당자					*/
			, { "Name": "SM_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* 공정 담당자					*/
			, { "Name": "QC_NAME"				, "Width": "100", "Type": "Text"					, "Spanned":"1"}	/* 품질 담당자					*/
		]
		, "Head" : [
			{
				"Kind"					: "Header"
				, "id"					: "Header"
				, "Spanned"				: "1"
				, "PanelRowSpan"		: "2"
				, "TRK_ITEM_NAME"		: "Item"				, "TRK_ITEM_NAMERowSpan"	: "2"
				, "ATTRIBUTE3"			: "Vendor"				, "ATTRIBUTE3RowSpan"		: "2"
				, "ATTRIBUTE7"			: "선적국가"				, "ATTRIBUTE7RowSpan"		: "2"
				, "ATTRIBUTE10"			: "Shipment No"				, "ATTRIBUTE10RowSpan"		: "2"
				, "SEL_INVOICE_NUM"		: "Invoice No"			, "SEL_INVOICE_NUMRowSpan"	: "2"
				, "ATTRIBUTE6"			: "공급 Scope"			, "ATTRIBUTE6RowSpan"		: "2"
				, "MPS_PLAN_DATE"		: "MPS(PR)"				, "MPS_PLAN_DATESpan"		: "3"
				, "MPS_EXPECTED_DATE"	: ""
				, "MPS_ACTUAL_DATE"		: ""
				, "PO_PLAN_DATE"		: "PO"					, "PO_PLAN_DATESpan"		: "3"
				, "PO_EXPECTED_DATE"	: ""
				, "PO_ATCUAL_DATE"		: ""
				, "CARGO_PLAN_DATE"		: "Cargo Ready"			, "CARGO_PLAN_DATESpan"		: "3"
				, "CARGO_EXPECTED_DATE"	: ""
				, "CARGO_ACTUAL_DATE"	: ""
				, "FOB_PLAN_DATE"		: "FOB/지정장소 상차도"		, "FOB_PLAN_DATESpan"		: "3"
				, "FOB_EXPECTED_DATE"	: ""
				, "FOB_ACTUAL_DATE"		: ""
				, "ATD_DATE"			: "운송 Status"			, "ATD_DATESpan"			: "11"
				, "POD_DATE"			: ""
				, "ATA_DATE"			: ""
				, "SKB_PPN_APPLY_DATE"	: ""
				, "SKB_PPN_ISSUED_DATE"	: ""
				, "EBILLING_DATE"		: ""
				, "EBILLING_PAYMENT_DATE":""
				, "CUSTOMS_PASS_DATE"	: ""
				, "CHANNEL_DATE"		: ""
				, "CUSTOMS_INSPECTION_DATE":""
				, "SPPB_DATE"			: ""
				, "ONSITE_PLAN_DATE"	: "On Site"				, "ONSITE_PLAN_DATESpan"	: "3"
				, "ONSITE_EXPECTED_DATE": ""
				, "ONSITE_ACTUAL_DATE"	: ""
				, "aa"					: "PO"					, "aaSpan"					: "3"
				, "bb"					: ""
				, "cc"					: ""
				, "dd"					: "Payment Milestone"	, "ddRowSpan"				: "2"
				, "ee"					: "Activity"			, "eeRowSpan"				: "2"
				, "PRIMAVERA_ID"		: "L3 ID"				, "PRIMAVERA_IDRowSpan"		: "2"
				, "PM_NAME"				: "담당자"				, "PM_NAMESpan"				: "5"
				, "EM_NAME"				: ""
				, "BUYER_NAME"			: ""
				, "SM_NAME"				: ""
				, "QC_NAME"				: ""
			}
			, {
				"Kind"					: "Header"
				, "Spanned"				: "1"
				, "TRK_ITEM_NAME"		: "Item"
				, "ATTRIBUTE3"			: "Vendor"
				, "ATTRIBUTE7"			: "선적국가"
				, "ATTRIBUTE10"			: "Shipment No"
				, "SEL_INVOICE_NUM"		: "Invoice No"
				, "ATTRIBUTE6"			: "공급 Scope"
				, "MPS_PLAN_DATE"		: "Plan(L3)"
				, "MPS_EXPECTED_DATE"	: "Expected"
				, "MPS_ACTUAL_DATE"		: "Actual"
				, "PO_PLAN_DATE"		: "Plan(L3)"
				, "PO_EXPECTED_DATE"	: "Expected"
				, "PO_ATCUAL_DATE"		: "Actual"
				, "CARGO_PLAN_DATE"		: "Plan"
				, "CARGO_EXPECTED_DATE"	: "Expected"
				, "CARGO_ACTUAL_DATE"	: "Actual"
				, "FOB_PLAN_DATE"		: "Plan(L3)"
				, "FOB_EXPECTED_DATE"	: "Expected"
				, "FOB_ACTUAL_DATE"		: "Actual"
				, "ATD_DATE"			: "ATD(ETD)"
				, "POD_DATE"			: "POD"
				, "ATA_DATE"			: "ATA(ETA)"
				, "SKB_PPN_APPLY_DATE"	: "SKB PPN 신청"
				, "SKB_PPN_ISSUED_DATE"	: "SKB PPN 발급"
				, "EBILLING_DATE"		: "E-Bill 발급"
				, "EBILLING_PAYMENT_DATE": "E-Bill Pay."
				, "CUSTOMS_PASS_DATE"	: "세관판정"
				, "CHANNEL_DATE"		: "Channel"
				, "CUSTOMS_INSPECTION_DATE":"Customs Ins"
				, "SPPB_DATE"			: "SPPB"
				, "ONSITE_PLAN_DATE"	: "Plan(L3)"
				, "ONSITE_EXPECTED_DATE": "Expected"
				, "ONSITE_ACTUAL_DATE"	: "Actual"
				, "aa"					: "Header No."
				, "bb"					: "Line No."
				, "cc"					: "Supplier"
				, "dd"					: "Payment Milestone"
				, "ee"					: "Activity"
				, "PRIMAVERA_ID"		: "L3 ID"
				, "PM_NAME"				: "PM"
				, "EM_NAME"				: "설계"
				, "BUYER_NAME"			: "구매"
				, "SM_NAME"				: "공정"
				, "QC_NAME"				: "품질"
			}
		]
	};

	grid =	TreeGrid( {Layout:{Data:col}, Data:{Data : {Body: [[]]}} },"Main" );

}

function setData() {
	grid.Source.Data.Data.Body = [[]];
	grid.ReloadBody();

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

			grid.Source.Data.Data.Body = [dataSet];

			grid.ReloadBody();
		}
	});
}

// Item 일정 및 Issue 관리 팝업 오픈
function openModal (G,row,col) {
	var TRK_ITEM_SEQ = G.GetValue(row, "TRK_ITEM_SEQ");

	$('#treeModalHtml').children().remove();
	$('#treeModalHtml').load("/treeGridModalTestSong.do", { "TRK_ITEM_SEQ" : TRK_ITEM_SEQ });

	$("#treeModal").modal();
}

// 조회영역 달력 셋팅
function initsearchDatePicker( ) {
	$("input[name=searchDate]").datepicker( {
		changeMonth		: true
		, changeYear	: true
		, showOn		: "both"
		, buttonImage	: "/resources/images/calendar_month.png"
		, buttonImageOnly: true
		, dateFormat	: "yy/mm/dd"
	});
}