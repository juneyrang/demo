<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>

<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
	<head>
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">    
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    
		<script src="/resources/ext/jquery/jquery.min.js"></script>
		<script src="/resources/ext/jquery/jquery-migrate-3.0.0.min.js"></script>
		<script src="/resources/ext/bootstrap/js/bootstrap.bundle.min.js"></script>
		<script src="/resources/ext/jquery-easing/jquery.easing.min.js"></script>
		<script src="/resources/ext/jquery-ui/js/jquery-ui-1.9.2.custom.min.js" ></script>
		<link href="/resources/ext/jquery-ui/css/base/jquery-ui-1.9.2.custom.css" rel="stylesheet" type="text/css" />
		
		<script src="/resources/ext/he.js"></script>	<!-- HTML ENCODE -->
		
		<link href="/resources/style/sb-admin-2.css" rel="stylesheet" />
	
		<!-- 사용자 추가 css & js, 상위 모든 내용 override -->
		<link href="/resources/style/Site.css" rel="stylesheet" />
		<script src="/resources/scripts/Site.js"></script>   	
		    
		<script src="/resources/scripts/ajaxSetup.js"	></script>
		<script src="/resources/scripts/material/plMobileMap.js"	></script>    
		
		<style type="text/css">
			/* canvas background-size : cover -> contain으로 조정하여 크기에 이미지 맞출 수 있도록 수정 */
			canvas{
		    	 background-size: contain;
		    	 background-repeat : no-repeat;
			}	
		</style>	
	</head>
	<body>
		<div >		
			<input id="mapMstId" type="hidden" value="${MAP_MST_ID}"/>
			<input id="idcs_service_url" type="hidden" value="${idcs_service_url}"/>
			<div>
				<div class="card-body-grid" style="vertical-align: middle; padding:0">
					<canvas id="canvas" height="700" width="1200" style="background-size: contain; background-repeat : no-repeat;" ></canvas>		
				</div>
			</div>
		</div>
		
		<div id="wrap-loading" class="wrap-loading dp_n"><div style="margin-left:0;"><img src="/resources/images/ajax_loader.gif" style="height:100px; width:100px" /></div></div>			
	</body>
</html>







