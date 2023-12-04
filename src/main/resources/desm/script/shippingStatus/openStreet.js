var OpenMapObj = {
	ProjectCode : null,
	ProjectName : null,
	openMap : null,
	markers : [],
	featureGroup : [],
	gridLang	: {},
	init : function() {
		this.showMap('desmMap', {});
		initDefailProject(this.initDefailProject);
		this.grid.init();
		this.event.init();
	},
	initDefailProject : function (list) {
		if(list.length > 0) {
			OpenMapObj.ProjectCode = list[0]["SEGMENT1"];
			OpenMapObj.ProjectName = list[0]["NAME"];
			OpenMapObj.data.load();
		}
		if($('#txtDesmLang').val() == "ko"){
			fileLang = "kr";
			gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
		}
	},
	grid : {
		desmVesselInvoiceNoGrid : null,
		init: function() {
			this.make();
			this.event();
		},
		make: function() {
			var desmVesselInvoiceNoGridCol = {
				"Cfg": {
					"id"				: "desmVesselInvoiceNoGrid"
					, "CfgId"			: "desmVesselInvoiceNoGridCfg"
					, "SuppressCfg"		: "0"
					, "StyleLap"		: "0"
					, "Version"			: "0"
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
					, "Code" 			: getGridCode()
					,"CopyCols" 		: "0"
					, "Sorting"			: "1"
				}
				,"Panel" : {"Visible" : "0", "Spanned":"1"}
				, "Toolbar" : {
					"Cells20Data"		: ""
					, "Cells60Cfg"		: "Columns"
					, "Cells70Styles"	: "Styles,Sizes,Scales"
					, "Visible"			: "0"
				}
				, "Cols" : [
					{	"Name"	: "INV_NO", "Width": "300", "Type": "Text" , "Class" : "gridBorderText gridTextColor gridCenterText", "CanMove" : "0", "CanEdit": "0", "Spanned":"1", "OnClickCell"	: "invoiceNoClick(Grid,Row,Col);" }
				]
				,"Header" : {
					"Kind"			: "Header",
					"id" 			: "Header",
					"Spanned" 		: "1",
					"PanelRowSpan" 	: "1",
					"Class" 		: "gridCenterText",
					"INV_NO"		: "Invoice No."
				}
			};
									
			desmVesselInvoiceNoGrid = TreeGrid( {Layout:{Data : desmVesselInvoiceNoGridCol}, Data:{Data : {Body: [[]]}}, Text: OpenMapObj.gridLang},"gridDesmVesselInvoiceNo" );
			
		},
		resize: function() {
			$("#gridDesmVesselInvoiceNo").width($(".table-responsive").width());
			$("#gridDesmVesselInvoiceNo").height($("body").height() - $("#tblSearchBox").height() - $("#toolbar").height() - 50);
		},
		event: function() {
			var _this = this;
			TGSetEvent("OnRenderFinish", "desmVesselInvoiceNoGrid", function(grid) {
				_this.resize();
			});
		}
	},
	osm : function() {
		var osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // 지도 경로
		osmAttrib = "&copy; <a href='http://openstreetmap.org/copyright'>OpenStreetMap</a> contributors"; // 출처
		return L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}); // 지도 생성시 필요한 기본 옵션
	},
	showMap : function(mapId, opt) {
		var option = $.extend({
		    zoomControl : false, // 지도의 줌 컨트롤을 비활성화 합니다.
			zoomsliderControl: true, // 지도의 줌 슬라이더를 활성화 합니다.
		    minZoom: 2, // 지도의 최소 줌 레벨을 설정합니다
		    maxZoom: 18 // 지도의 최대 줌 레벨을 설정합니다
		}, opt);
		this.openMap = L.map(mapId, option).setView([37.57747387321504,126.98637485504149], 4).addLayer(this.osm());
	},
	data: {
		load: function(keyword) {
			var _this = this;
			var paramData = { 'PROJECT_NO' : OpenMapObj.ProjectCode, 'keyword' : keyword };
			$.ajax({
				url: '/vessel/getVesselFinderList.do',
				data: paramData,
				success: function (data, textStatus, jqXHR) {
					_this.marker(data.results);
					desmVesselInvoiceNoGrid.Source.Data.Data.Body = [data.results];
					desmVesselInvoiceNoGrid.ReloadBody();
		        }
		    });
		},
		reload: function() {
			this.remove();
			this.load();
		},
		popHtml: {
			marker: function(item) {
			    var markerHtml = 	'<p> Marker<br>' +
				'IMO : ' + item.IMO + '<br>' +
				'VESSEL : ' + item.VESSEL_NAME + '<br>' +
				'INV_NO : ' + item.INV_NO + '<br>' +
				'ITEM : ' + item.ITEM_NAME + '<br>' +
				'POL : ' + item.POL + '<br>' +
				'ETD_ATD : ' + item.ETD_ATD + '<br>' +
				'POD : ' + item.POD + '<br>' +
				'ETA_ATA : ' + item.ETA_ATA + '<br>' +
				'MFR : ' + item.MFR + '<br>' +
				'PL_NO : ' + item.PL_NO;
			    return markerHtml;
			}
		},
		marker: function(results) {
			var _this = this;
			$.each(results, function(i, item) {
				var marker = L.marker([item.LATITUDE,item.LONGITUDE]).addTo(OpenMapObj.openMap);
				marker.on('click', function(e) {
//				marker.on('mouseover', function(e) {
				    marker.bindPopup(_this.popHtml.marker(item)).openPopup();  
				});
				OpenMapObj.markers.push(marker);
			});
		},
		remove: {
			marker : function() {
				OpenMapObj.markers.forEach(function(marker) {
					OpenMapObj.openMap.removeLayer(marker);
				});
			}
		}
	},
	event: {
		init: function() {
			this.action();
			//this.mouseMove();
		},
		action: function() {
			$('#btnInvoiceNoSearch').on('click', function() {
				OpenMapObj.data.remove.marker();
				OpenMapObj.data.load($('#txtInvoiceNo').val());
			});
		},
		mouseMove: function() {
			OpenMapObj.openMap.on('mousemove', function(e) {
				var lng = e.latlng.lng,
				lat = e.latlng.lat
				console.log("lat : " + lat + ", lng : " + lng);
				document.getElementById('label_lonlat').innerHTML = "위도 : " + lat + ", 경도 : " + lng;
			});
		}
	},
	action: {
		zoomIn: function() {
 			mymap.zoomIn();
		},
		zoomOut: function() {
 			mymap.zoomOut();
		},
	}        		
}

function invoiceNoClick(Grid,Row,Col) {
	OpenMapObj.markers.forEach(function(marker) {
		if(Row.LATITUDE == marker._latlng.lat && Row.LONGITUDE == marker._latlng.lng) {
		    marker.bindPopup(OpenMapObj.data.popHtml.marker(Row)).openPopup();
		    return false;
		}
	});
}

$(document).ready(function () {
	OpenMapObj.init();
});
