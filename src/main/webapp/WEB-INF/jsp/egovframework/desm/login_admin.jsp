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
    <meta name="robots" content="NOINDEX, NOFOLLOW">
    <title><spring:message code="title.login" /></title>
    <link rel="shortcut icon" href="/resources/assets/ico/way.ico">
    <link href="/resources/css/loginPage.css" rel="stylesheet">
    
	<script src="/resources/js/html5shiv.js"></script>
	<script src="/resources/js/respond.js"></script>
	
	<script src="/resources/js/jquery-1.11.1.js"></script>
	<script src="/resources/js/moment.min.js"></script>
	<script src="/resources/js/jquery.sessionTimeout.js"></script>

	<%-- 모든 합쳐진 플러그인을 포함하거나 (아래) 필요한 각각의 파일들을 포함하세요 --%>
	<script src="/resources/js/bootstrap.min.js"></script> 
	<script src="/resources/js/bootstrap-table.min.js"></script>
	<script src="/resources/js/bootstrap-datetimepicker.min.js"></script>
    
    <script type="text/javaScript" language="javascript" defer="defer">
    $(document).ready(function() {
    	
		//로그인 엔터키 이벤트 처리
		$('#loginField_id').keypress(function(event){
			if(event.keyCode == 13) {
				fn_loginCheck();
			}
		});
		
		$('#loginField_pw').keypress(function(event){
			if(event.keyCode == 13) {
				fn_loginCheck();
			}
		});
		
	});    
	
    // 로그인 이벤트
	function fn_loginCheck() {
		
		if($('#loginField_id').val() == ""){
			alert('<spring:message code="alert.id" />');
			return;
		}
		if($('#loginField_pw').val() == ""){
			alert('<spring:message code="alert.pw" />');
			return;
		}
		
		$.ajax({
			type: "POST",
			url: "/chkLogin_admin.do",
			dataType: "json",
			data: { 
				"USER_ID" : $('#loginField_id').val(),
				"PASSWORD" : $('#loginField_pw').val()
			},
			success: function(data) {

				var list = data.results;
				
				if(list == null || list.length < 1){
					alert('<spring:message code="alert.auth" />');
				}else{
					
					var lang = "en";
					if (getLanguage() === 'ko-KR' || getLanguage() === 'ko') {
						lang = "ko";
					}
					var url = '/main.do?lang=' + lang;
					/*
					if(navigator.userAgent.indexOf("Trident") > 0){ 
						window.location = 'microsoft-edge:' + url;
					} 
					else if(/MSIE \d |Trident.*rv:/.test(navigator.userAgent)){
						window.location = 'microsoft-edge:' + url; 
					}
					else{
						window.location.href = url;
					}*/	
					
					window.location.href = url;
				}
			},
			error: function (xhr, txtStatus, errorThrown) {
				console.log(xhr);
				console.log(txtStatus);
				console.log(errorThrown);
				alert('<spring:message code="alert.error" />');
				
			}
		});
	}
	function getLanguage() {
		  return navigator.language || navigator.userLanguage;
	}    
    </script>
</head>

	<body class="Btype">
		<div class="wrap">
			<div class="header">
				<ul>
					<li class="tCenter"><img src="/resources/img/Doosan_Logo.jpg" width="250" height="45" alt="DOOSAN" /></li>
					<li class="tCenter mt10"><label style="font-size:15pt;font-weight:bold;"><spring:message code="title.login" /></label></li>
				</ul>
			</div>

			<div class="container">
				<div class="line_gradation"></div>
				<div class="conArea">
					<fieldset class="loginField">
						<dl>
							<dt><label for="loginField_id">ID</label></dt>
							<dd><input type="text" name="loginField_id" id="loginField_id" /></dd>
							<dt><label for="loginField_pw">Password</label></dt>
							<dd><input type="password" name="loginField_pw" id="loginField_pw" /></dd>
						</dl>
						
						<a href="javascript:fn_loginCheck();" class="login_btn" id="login_btn">Log In</a>
						
						
						
						
					</fieldset>
		
					<div class="mt20 f12 tLeft">This site is intended for Doosan employees and authorized personnel only. User access to the site is monitored and logged Any illicit use may be subject to civil/criminal charges in accordance with laws and regulations.</div>
	
				</div>
			</div>
			<!-- 
			<div>
			<h1>파일 되나 보자보ㅗ자조바조바조바조바좌</h1>
				<form method="post" action="upload" enctype="multipart/form-data">
				         <label>email:</label>
				         <input type="text" name="email">
				         <br><br>
				         <label>파일:</label>				
				         <input type="file" name="file1">
				         <br><br>
				         <input type="submit" value="upload">
				
			</form>
			</div>
 -->
 
<%
	Date nowTime = new Date();
	SimpleDateFormat sf = new SimpleDateFormat("yyyy");
%> 
			<address class="footer tCenter">
				<span>ⓒ <%= sf.format(nowTime) %> Doosan Corporation</span>
			</address>
		</div>
	</body>
</html>
