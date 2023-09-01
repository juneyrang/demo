<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<%
	// 230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
	String addTabJs = "/resources/scripts/addTab.js?rv=" + rV;
	String siteJs = "/resources/scripts/Site.js?rv=" + rV;
%>


<link href="/resources/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    
	<!-- Custom fonts for this template-->
	<link href="/resources/ext/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
	<!--link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"--> <!-- online 폰트 사용 -->
	<link href="/resources/style/fonts.css" rel="stylesheet" type="text/css" /> <!-- 로컬 폰트 사용 -->
	
	<!-- Bootstrap core JavaScript-->
	<script src="/resources/ext/jquery/jquery.min.js"></script>
	<script src="/resources/ext/jquery/jquery-migrate-3.0.0.min.js"></script>
	<script src="/resources/ext/bootstrap/js/bootstrap.bundle.min.js"></script>
	<!-- Core plugin JavaScript-->
	<script src="/resources/ext/jquery-easing/jquery.easing.min.js"></script>
	<script src="/resources/ext/jquery-ui/js/jquery-ui-1.9.2.custom.min.js" ></script>
	<link href="/resources/ext/jquery-ui/css/base/jquery-ui-1.9.2.custom.css" rel="stylesheet" type="text/css" />

	<!-- Custom scripts for all pages-->
	<script src="/resources/scripts/sb-admin-2.js"></script>

	<link href="/resources/ext/jquery/jquery.treegrid.css" rel="stylesheet" type="text/css" />
	<script src="/resources/ext/jquery/jquery.treegrid.min.js"></script> 
	<script src="/resources/ext/bootstrap-table/extensions/treegridtmp/bootstrap-table.min.js"></script>
	<script src="/resources/ext/bootstrap-table/extensions/treegridtmp/bootstrap-table-treegrid.min.js"></script>

	<!--plug-in -->
	<link href="/resources/ext/bootstrap-table/bootstrap-table.min.css" rel="stylesheet" type="text/css"/>
	<script src="/resources/ext/jquery/tableExport.min.js"></script>
	<!-- <script src="/resources/ext/bootstrap-table/bootstrap-table.js"></script> -->
	<script src="/resources/ext/bootstrap-table/bootstrap-table-locale-all.min.js"></script>
	<script src="/resources/ext/bootstrap-table/extensions/export/bootstrap-table-export.min.js"></script>
	<script src="/resources/ext/he.js"></script>	<!-- HTML ENCODE -->
	<script src="/resources/ext/ajaxfileupload.js"></script>
	
	<%-- <script src="/resources/scripts/addTab.js"></script>  --%>
	<script src="<%= addTabJs %>"></script>

	<!-- 템플릿 style -->
	<link href="/resources/style/sb-admin-2.css" rel="stylesheet" />

	<!-- 사용자 추가 css & js, 상위 모든 내용 override -->
	<link href="/resources/style/Site.css" rel="stylesheet" />
	<!-- <script src="/resources/scripts/top_left.js"></script> --> <!-- hanbyul1.lee : 230410 / Main Element 에서만 가져감, 우선 뺌. -->
	<%-- <script src="/resources/scripts/Site.js"></script> --%>
	<script src="<%= siteJs %>"></script>
	
    