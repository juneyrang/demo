var desmVesselMap = [];
var desmVesselMarkers = [];
var desmVesselInfoWindows = [];

var DesmVesselMapObj = {
	ProjectCode : null,
	ProjectName : null,
	desmVesselMap : null,
	markers : [],
	gridLang	: {},
	init : function() {
		this.map.init();
		initDefailProject(this.initDefailProject);
	},
	initDefailProject : function (list) {
		if(list.length > 0) {
			DesmVesselMapObj.ProjectCode = list[0]["SEGMENT1"];
			DesmVesselMapObj.ProjectName = list[0]["NAME"];
			DesmVesselMapObj.table.init();
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
				DesmVesselMapObj.map.marker.choice(row);
            });
		},
		data: function(params) {
			$.ajax({
				async: false,
				type: "POST",
				url: "/vessel/getVesselFinderList.do",		
				data: {'PROJECT_NO' : DesmVesselMapObj.ProjectCode},
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
					DesmVesselMapObj.map.marker.addAll(dataSet);
					DesmVesselMapObj.table.rowStyle();
		        }
		    });
		},
		completeDataBind: function(res) {
			return res;
		},
		rowStyle: function() {
			let today = new Date();
			$('#tblVesselList tr').each(function(i, value) {
				var ETD_ATD = $(this).find('td').eq(5).text();
				var ETA_ATA = $(this).find('td').eq(7).text();
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
			this.load('desmVesselMap');
		},
		load : function(mapId) {
			var _this = this;
			desmVesselMap = new google.maps.Map(document.getElementById("desmVesselMap"), {
				center: { lat: 37.57747387321504, lng: 126.98637485504149 },
				zoom: 3,
				minZoom: 2,
				maxZoom: 5
			});
			google.maps.event.addListener(desmVesselMap, 'click', function(event) {
				_this.reset();
			});
		},
		reset: function() {
			this.marker.changeIcons();
		},
		marker : {
			add: function(item) {
				var _this = this;
				const marker = new google.maps.Marker({
					position: { lat: item.LATITUDE, lng: item.LONGITUDE },
				    map: desmVesselMap,
//				    label: item.IMO,
				    invNo: item.INV_NO,
				    icon: svgObj.blueFlag()
//				    icon: {
//						url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//						labelOrigin: new google.maps.Point(20, 47),
//						anchor: new google.maps.Point(50,32)
//				    }
				});
				marker.addListener("click", () => {
					_this.changeIcons(marker, item);
				});
				desmVesselMarkers.push(marker);
			},
			addAll: function(data) {
				var _this = this;
				$.each(data, function(i, item) {
					_this.add(item);
				});
			},
			choice: function(row) {
				var _this = this;
				desmVesselMarkers.forEach(function(marker) {
					if(row.INV_NO == marker.invNo) {
						_this.changeIcons(marker, row);
					    return false;
					}
				});
			},
			changeIcons: function(marking, item) {
				var _this = this;
				_this.removeInfoWindows();
				if(marking != null) {
					_this.infoWindow(marking, item);
				}
				desmVesselMarkers.forEach(function(marker) {
					(marking != null && marking.invNo == marker.invNo) ? marker.setIcon(svgObj.redFlag()): marker.setIcon(svgObj.blueFlag());
				});
			},
			infoWindow: function(marker, item) {
				var keys = Object.keys(item);
				var values = Object.values(item);
				var contentString = '<table class="table table-sm table-bordered">';
				for(var i=0; i < keys.length; i++) {
					contentString += 	'	<tr style="line-height: 9px;min-height: 9px;height: 9px;">' +
										'		<td  class="align-middle" style="text-align: right;font-size:9px">' + keys[i] + '  </td>' +
										'		<td class="align-middle" style="font-size:9px">' + values[i] + '</td>' +
										'	</tr>';
				}
				contentString += 	'</table>';
				var info = new google.maps.InfoWindow({
					content: contentString,
					ariaLabel: "",
				});
				info.open({
					anchor: marker,
					map: desmVesselMap,
				});
				desmVesselInfoWindows.push(info);
			},
			remove: function(marker) {
				marker.setMap(null);
			},
			removeAll: function() {
				var _this = this;
				desmVesselMarkers.forEach(function(marker) {
					_this.remove(marker);
				});
				desmVesselMarkers.lenght = 0;
			},
			removeInfoWindows: function() {
				desmVesselInfoWindows.forEach(function(info) {
					info.close();
				});
				desmVesselInfoWindows.lenght = 0;
			}
		}
	}
}

var svgObj = {
		blueFlag: function() {
		var svgMarker = {
			path: "m20.414 12 5.293-5.293A1 1 0 0 0 25 5H11V3a1 1 0 0 0-2 0v25H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-9h14a1 1 0 0 0 .707-1.707z",
			fillColor: "blue",
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: 1,
			anchor: new google.maps.Point(0, 20),
		};
		return svgMarker;
	},
	redFlag: function() {
		var svgMarker = {
			path: "m20.414 12 5.293-5.293A1 1 0 0 0 25 5H11V3a1 1 0 0 0-2 0v25H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-9h14a1 1 0 0 0 .707-1.707z",
			fillColor: "red",
			fillOpacity: 0.7,
			strokeWeight: 0,
			rotation: 0,
			scale: 1.5,
			anchor: new google.maps.Point(0, 20),
		};
		return svgMarker;
	},
	blue: function() {
		var svgMarker = {
			path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "blue",
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(0, 20),
		};
		return svgMarker;
	},
	red: function() {
		var svgMarker = {
			path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
			fillColor: "red",
			fillOpacity: 0.9,
			strokeWeight: 0,
			rotation: 0,
			scale: 2,
			anchor: new google.maps.Point(0, 20),
		};
		return svgMarker;
	}
}

function initVesselMap() {
	DesmVesselMapObj.init();
}
