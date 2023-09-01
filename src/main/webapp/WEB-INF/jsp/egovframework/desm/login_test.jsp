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
    <!-- <meta http-equiv="X-Frame-Options" content="deny"> -->
    <title><spring:message code="title.login" /></title>
    <link rel="shortcut icon" href="/resources/assets/ico/way.ico">
    <script src="/resources/ext/jquery/jquery.min.js"></script>    
    <script type="text/javascript" src="/resources/scripts/oracle_mcs/mcs.js"></script>
    <script type="text/javaScript" language="javascript" defer="defer">
    	// 정직원 AD 연동 로그인용
	    var spinitateEndPoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/fed/v1/sp/initiatesso?partnername=DHI_ADFS&returnurl=";
		//var oauthAuthEndPoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/authorize";
		var oauthAuthEndPoint = "http://localhost:9190/oauthTest.do";
		//var oauthAuthEndPoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/ui/v1/myconsole"; // idcs console로 감
		//var clientIdInternal = "c1adf1bc77e643a589f51142a4bfa6be"; // only idcs web
		var clientIdInternal = "30a7229ae0d5420c9adf5ffcf81c865f"; // mcs mobile backend
		var oauthTokenEndpoint = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/token";
		                        //https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/token
		//var oauthTokenEndpoint = "http://localhost:8090/oauthTest.do";
		var allowedScope = "https://81BBCFEF17F642AB93973D87DA8C3C58.mobile.ocp.oraclecloud.com:443urn:opc:resource:consumer::all";
    	var uuid = mcs._utils.uuid();
    	
    	var param = encodeURI(oauthAuthEndPoint + '?client_id=' + clientIdInternal + '&response_type=code&redirect_uri=' + oauthTokenEndpoint + '&scope=' + allowedScope + '&nonce=' + uuid);
    	//var param = encodeURI(oauthAuthEndPoint + '?client_id=' + clientIdInternal + '&response_type=code&redirect_uri=' + oauthTokenEndpoint + '&nonce=' + uuid);
    	//var param = oauthAuthEndPoint + '?client_id=' + clientIdInternal + '&response_type=code&redirect_uri=' + oauthTokenEndpoint + '&nonce=' + uuid;
    	var reqUrl = spinitateEndPoint + param;
    	
    	$(document).ready(function () {
    		//document.getElementById('testFrame').src = reqUrl;
    		location.replace(reqUrl);
    	});
    </script>
</head>

	<body class="Btype">
		<!-- <iframe id="testFrame" width="1000" height="1000"/> -->
	</body>
</html>
