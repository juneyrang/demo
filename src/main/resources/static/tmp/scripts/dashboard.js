var dashboardChartObj = {
	init: function() {
		this.load.init();
	},
	labels: {
		mrrChart: ['Incomplete', 'Pre-Confirmed', 'Confirmed', 'Rejected'],
	    mirChart: ['Incomplete', 'Pre-checked1', 'Pre-checked2', 'Pre-checked3', 'Checked', 'Rejected'],
	},
	load: {
		init: function() {
			var param = { 'PROJECT_NO': dashboardChartObj.getDefaultProject() };
			this.data('/dashboard/getMrrChartSummary.do', param, function(data) { dashboardChartObj.callback.mrrChart(data); });
			this.data('/dashboard/getMirChartSummary.do', param, function(data) { dashboardChartObj.callback.mirChart(data); });
		},
		data: function(url, param, callback) {
			$.ajax({
				async: false,
				type: 'POST',
				url: url,		
				data: param,
		        dataType: 'json',
				success: function (data) {
					callback(data);
		        }
		    });
		}
	},
	callback: {
		mrrChart: function(data) {
			if(data.results) {
				var chartData = [0, 0, 0, 0, 0, 0];
				$.each(dashboardChartObj.labels.mrrChart, function(index, label) {
					$.each(data.results, function(i, item) {
						if(item.STATUS === label) {
							chartData[index] = item.CNT;
							return false;
						}
					});
				});
				dashboardChartObj.create.mrrChart(chartData);
			}
		},
		mirChart: function(data) {
			if(data.results) {
				var maxCnt = 0;
				var chartData = [0, 0, 0, 0];
				$.each(dashboardChartObj.labels.mirChart, function(index, label) {
					$.each(data.results, function(i, item) {
						if(item.STATUS === label) {
							chartData[index] = item.CNT;
							if(item.CNT > maxCnt) {
								maxCnt = item.CNT;
							}
							return false;
						}
					});
				});
				dashboardChartObj.create.mirChart(chartData, 1, maxCnt + 1);
			}
		}
	},
	create: {
		mrrChart: function(chartData) {
			new Chart($('#mrrChart'), {
			    type: 'doughnut',
			    data: {
			      labels: dashboardChartObj.labels.mrrChart,
			      datasets: [{
			        data: chartData,
			        backgroundColor: ['#2ecc71', '#3498db', '#f1c40f'],
			        hoverBackgroundColor: ['#A6A6A6', '#D1B2FF', '#B2EBF4'],
			        borderWidth: 1
			      }]
			    },
			    options: {
			    	responsive: true,
			    	legend: {
			    		position: 'top'
			    	},
	    	        title: {
		    	        display: true,
		    	        text: '# Material Receiving'
		    	    },
		    	    animation: {
		    	    	animateScale: true,
		    	    	animateRotate: true
		    	    }
			    }
			});
		},
		mirChart: function(chartData, stepSize, maxSize) {
			new Chart($('#mirChart'), {
			    type: 'bar',
			    data: {
				  labels: dashboardChartObj.labels.mirChart,
			      datasets: [{
			        label: '# Material Inspection(OPI / OSDM)',
			        data: chartData,
			        backgroundColor: ['#9BD0F5', '#2ecc71', '#9BD0F5', '#3498db', '#f1c40f'],
			        borderWidth: 1
			      }]
			    },
			    options: {
			        responsive : false,
			        scales : {
			    		yAxes : [ {
			    			display: true,
			    			ticks : {
			    				beginAtZero: true,
                                steps: 10,
                                stepSize: stepSize,
                                max: maxSize
			    			}
			    		} ]
			    	}
			    }
			});
		}
	},
	getDefaultProject: function() {
		var strProject = $('#spanDefaultProject', parent.document).text();
		if(strProject.indexOf('[') < 0) return null;
		var projectInfo = strProject.substring(strProject.indexOf('[') + 1, strProject.indexOf(']')).split('-');
		return projectInfo[0].trim();
	}
};

$(document).ready(function () {
	dashboardChartObj.init();
});
