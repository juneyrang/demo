var dfaultPjt;

$(document).ready(function () {
	console.log('test');
	
	initControl();
});

function initControl() {
	initMenuAuth(function (list) {
		menuAuthList = list;
	});

	initDefailProject(function (list) {
		if(list.length > 0) {
			dfaultPjt = list[0]["SEGMENT1"];
			
			initTable();
		}
	});
}

function initTable() {
	$('#tblList').bootstrapTable('destroy').bootstrapTable({
		toolbar: "#toolbar",
		clickToSelect: "true",
		minimumCountColumns: "2",
		ajax: "ajaxSelectPkgSumList",
		responseHandler: "completeDataBind"	//Data 조회 후
	});
}

function ajaxSelectPkgSumList(params) {
	$.ajax({
		async: false,
		type: "POST",
		url: "/dashboard/getPackageSummary.do",		
		data: {PROJECT_NO : dfaultPjt},
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
        }
    });
}

function completeDataBind(res) {
	$.each(res.rows, function (i, row) {
	});
	return res;
}