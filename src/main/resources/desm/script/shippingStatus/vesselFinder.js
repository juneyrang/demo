var vesselFinderMap = [];
var vesselFinderMarkers = [];

var VesselFinderMapObj = {
	ProjectCode : null,
	ProjectName : null,
	vesselFinderMap : null,
	markers : [],
	gridLang	: {},
	init : function() {
		this.map.init();
		initDefailProject(this.initDefailProject);
	},
	initDefailProject : function (list) {
		if(list.length > 0) {
			VesselFinderMapObj.ProjectCode = list[0]["SEGMENT1"];
			VesselFinderMapObj.ProjectName = list[0]["NAME"];
			VesselFinderMapObj.table.init();
		}
		if($('#txtDesmLang').val() == "ko"){
			fileLang = "kr";
			gridLang = {Url : "/resources/gridJs/Languages/TextKR.js"};
		}
	},
	table: {
		init: function() {
			this.make();
		},
		make: function() {
			var _this = this;
			$('#tblVesselList').bootstrapTable('destroy').bootstrapTable({
				search: true,
				showRefresh: true,
				showFullscreen: true,
				clickToSelect: true,
				idField: 'INV_NO',
				ajax: _this.data,
				responseHandler: _this.completeDataBind	//Data 조회 후
			}).on('click-row.bs.table', function (e, row, $element) {
				VesselFinderMapObj.map.marker.choice(row);
            });
		},
		data: function(params) {
			$.ajax({
				async: false,
				type: "POST",
				url: "/vessel/getVesselFinderList.do",		
				data: {'PROJECT_NO' : VesselFinderMapObj.ProjectCode},
		        dataType: "json",
				success: function (data, textStatus, jqXHR) {
					var dataSet = data.results;
					var tableData = {
						"total": dataSet.length,
						"rows": dataSet
					};
					params.success(tableData, textStatus, jqXHR);
					$('[data-toggle="tooltip"]').tooltip();
					$('[data-toggle="popover"]').popover({ html:true })
					VesselFinderMapObj.map.marker.addAll(dataSet);
					VesselFinderMapObj.table.rowStyle();
		        }
		    });
		},
		completeDataBind: function(res) {
			return res;
		},
		rowStyle: function() {
			let today = new Date();
			$('#tblVesselList tr').each(function(i, value) {
				var ETD_ATD = $(this).find('td').eq(1).text();
				var ETA_ATA = $(this).find('td').eq(2).text();
				if(ETD_ATD != '' && ETA_ATA != '') {
					ETA_ATA = ETA_ATA.replace(/\(/gi, '').replace(/\)/gi, '').replace(/\-/gi, '.').replace(/\//gi, '.');
					ETA_ATA = ETA_ATA.length == 8 ? '20' + ETA_ATA : ETA_ATA;
					var eta = new Date(ETA_ATA);
					var diffEta = (eta.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
					
					if(diffEta >= 0 && diffEta < 7) {
						$(this).addClass('bg-success');
					}
				}
			});
		}
	},
	map : {
		init : function() {
			this.load('vesselFinderMap');
		},
		load : function(mapId) {
			var _this = this;
			vesselFinderMap = new google.maps.Map(document.getElementById("vesselFinderMap"), {
				center: { lat: 37.57747387321504, lng: 126.98637485504149 },
				zoom: 3,
				minZoom: 2,
				maxZoom: 5
			});
			google.maps.event.addListener(vesselFinderMap, 'click', function(event) {
				_this.reset();
			});
		},
		reset: function() {
			this.marker.changeIcons();
		},
		marker : {
			infoWindow : null,
			add: function(item) {
				var _this = this;
				const marker = new google.maps.Marker({
					position: { lat: item.LATITUDE, lng: item.LONGITUDE },
				    map: vesselFinderMap,
				    invNo: item.INV_NO,
				    icon: svgObj.getCircle('blue')
				});
				marker.addListener('mouseover', function() {
					_this.changeIcons(marker, item);
				});
				marker.addListener('mouseout', function() {
					_this.changeIcons(null, null);
				});
				vesselFinderMarkers.push(marker);
			},
			addAll: function(data) {
				var _this = this;
				$.each(data, function(i, item) {
					_this.add(item);
				});
			},
			choice: function(row) {
				var _this = this;
				vesselFinderMarkers.forEach(function(marker) {
					if(row.INV_NO == marker.invNo) {
						_this.changeIcons(marker, row);
					    return false;
					}
				});
			},
			changeIcons: function(marking, item) {
				var _this = this;
				if(marking != null) {
					_this.fnInfoWindow(marking, item);
				} else {
					VesselFinderMapObj.map.marker.infoWindow.close();
					VesselFinderMapObj.map.marker.infoWindow = null;
				}
//				(marking != null) ? _this.fnInfoWindow(marking, item) : VesselFinderMapObj.map.marker.infoWindow.close();
				vesselFinderMarkers.forEach(function(marker) {
					(marking != null && marking.invNo == marker.invNo) ? marker.setIcon(svgObj.getCircle('red')): marker.setIcon(svgObj.getCircle('blue'));
				});
			},
			fnInfoWindow: function(marker, item) {
				var keys = Object.keys(item);
				var values = Object.values(item);
				var contentString 	= '<div class="infoWindow">';
//				contentString += '<table class="table table-sm">';
				contentString += '<table>';
				for(var i=0; i < keys.length; i++) {
					contentString += 	'	<tr>' +
										'		<td style="text-align: right;font-size:xx-small; color:gray">' + keys[i] + '  </td>' +
										'		<td style="font-size:x-small; padding:0px 10px 0px 10px">' + values[i] + '</td>' +
										'	</tr>';
				}
				contentString += 	'</table>';
				contentString += 	'</div>';

				this.infoWindow = new google.maps.InfoWindow({
					content: contentString,
			        disableAutoPan: true,
				    invNo: item.INV_NO
				});
				this.infoWindow.open({
					anchor: marker,
					map: vesselFinderMap,
				});
			},
			remove: function(marker) {
				marker.setMap(null);
			},
			removeAll: function() {
				var _this = this;
				vesselFinderMarkers.forEach(function(marker) {
					_this.remove(marker);
				});
				vesselFinderMarkers.lenght = 0;
			}
		}
	}
}

var svgObj = {
	getCircle: function(color) {
		var svgMarker = {
			path: "M370 125c0 66.3-53.7 120-120 120s-120-53.7-120-120S183.7 5 250 5s120 53.7 120 120Z",
			strokeColor: color,
		    strokeOpacity: 0.8,
		    strokeWeight: 1,
			fillColor: color,
			fillOpacity: 0.4,
			scale: 0.1,
			anchor: new google.maps.Point(0, 20),
		};
		return svgMarker;
	}
}

function rowFormatter(value, row) {
	return value;
}

function initVesselMap() {
	VesselFinderMapObj.init();
}
