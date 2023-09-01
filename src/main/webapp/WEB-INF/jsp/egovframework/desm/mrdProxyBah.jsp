<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html style="margin:0;height:100%">
	<head>
		<meta charset="utf-8">
		<title>Crownix HTML5 Viewer</title>
			<script src="https://desmb.doosanenerbility.com:711/ReportingServer/html5/js/jquery-1.11.0.min.js"></script>
			<script src="https://desmb.doosanenerbility.com:711/ReportingServer/html5/js/crownix-viewer.min.js"></script>
			<link rel="stylesheet" type="text/css" href="https://desmb.doosanenerbility.com:711/ReportingServer/html5/css/crownix-viewer.min.css">
			<link href="/resources/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
	</head>
	<body style="margin:0;height:100%">
		<div id="crownix-viewer" style="position:absolute;width:100%;height:100%"></div>
		
			<script>
				
				window.onload = function(){
									
					var viewer = new m2soft.crownix.Viewer('https://desmb.doosanenerbility.com:711/ReportingServer/service', 'crownix-viewer');
					viewer.openFile('https://desmb.doosanenerbility.com:711/ReportingServer/mrd/${fileNm}.mrd', '/rfn [https://desmb.doosanenerbility.com:711/DataServer/rdagent.jsp] /rsn [${severNm}] /rmmlreportdone [2] ${rp}');			  
					
				};
			</script>
	</body>
</html>