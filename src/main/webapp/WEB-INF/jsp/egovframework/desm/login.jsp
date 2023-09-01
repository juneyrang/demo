<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>

<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<c:set var="now" value="<%=new java.util.Date().getTime()%>" />
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><spring:message code="title.login" /></title>
    <link rel="shortcut icon" href="/resources/assets/ico/way.ico">
    <link href="/resources/css/bootstrap.min.css?ver=${now}" rel="stylesheet">
    <link href="/resources/css/loginPage.css?ver=${now}" rel="stylesheet">

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

		$(".icon_div").on("click",function(){
	     	switch ($(this).attr("type")){
    		case "engineer":
				console.log("engineer");
				location.href = "/login_idcs_c.do";
    			break;
    		case "manager":
    			console.log("manager");
    			location.href = "/login_idcs.do";
    			break;
	     	}
		})

	});

    </script>
</head>
<style type="text/css">
	.click_here{
	    font-size: 35px;
	    color: #2F5597;
	    margin: 10px;
	    margin-top: 45px;
	}
	.click_line{
	    color: #8FAADC;
	    border: solid 2px;
	    width: 205px;
	    margin-top: 10px;
	}
	.img_txt_style{
		list-style-type : square;
        text-align: left;
		font-size: 25px;
		margin-top: 10px;
	}
	.img_txt_ul_style{
	    width: 75%;
	    margin: auto;
	}
	.img_txt_ul_style2{
	    width: 45%;
	    margin: auto;
	}
	.icon_div{
    	background-color: #F2F2F2;
    	border-radius: 20px;
    	width:49%;
    	margin-right:5px;
    	margin-left:5px;
    	min-height: 500px;
    	cursor: pointer;
	}
</style>


	<body class="Btype">
		<div class="wrap">
			<div class="header">
				<ul>
					<li class="tCenter"><img src="/resources/img/Doosan_Logo.jpg" width="250" height="45" alt="DOOSAN" /></li>
					<li>&nbsp;</li>
					<li><h1 style="font-weight:bold;color:#2F5597;">DESM</h1></li>
					<li class="tCenter mt10"><label style="font-size:25px; font-weight:100;color:#8497B0;line-height: 25px;"><spring:message code="title.login" /></label></li>
				</ul>
			</div>

			<div class="container">
				<div class="line_gradation"></div>
				<div class="row">
					<div class="col-md-6 icon_div" type="engineer">
						<p class="click_here">Click here</p>
						<hr class="click_line"></hr>
						<img src="/resources/img/manager-businessman-svgrepo-com.png" width="150"/>
						<ul class="img_txt_ul_style">
						  <li class="img_txt_style">Doosan Construction Site User</li>
						  <li class="img_txt_style">Site Subcontractor</li>
						  <li class="img_txt_style">Supplier</li>
						</ul>
					</div>
					<div class="col-md-6 icon_div" type="manager">
						<p class="click_here">Click here</p>
						<hr class="click_line"></hr>
						<img src="/resources/img/manager-businessman-svgrepo-com.png" width="150"/>
						<ul class="img_txt_ul_style2">
						  <li class="img_txt_style">Doosan Office User </li>
						</ul>
					</div>
				</div>
				<div class="row" style="margin-top: 1.2rem;">
					<h3>If you want to receive change password email because of expired your password, please click <a href="https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/ui/v1/forgotpwd" target="_blank">here.</a></h3>
				</div>
				<div class="conArea">
					<div class="tLeft">This site is intended for Doosan employees and authorized personnel only. User access to the site is monitored and logged Any illicit use may be subject to civil/criminal charges in accordance with laws and regulations.</div>
				</div>
			</div>

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
