<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String addTabJs = "/resources/scripts/addTab.js?rv=" + rV;
    String topLeftJs = "/resources/scripts/top_left.js?rv=" + rV;
    String SiteJs = "/resources/scripts/Site.js?rv=" + rV;
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>- DESM</title>

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
	<script src="/resources/gridJs/GridE.js"		></script>

	<%--<script src="/resources/scripts/addTab.js"></script> --%>
	<script src="<%= addTabJs %>"></script>

	<!-- 템플릿 style -->
	<link href="/resources/style/sb-admin-2.css" rel="stylesheet" />

	<!-- 사용자 추가 css & js, 상위 모든 내용 override -->
	<link href="/resources/style/Site.css" rel="stylesheet" />
	<%--<script src="/resources/scripts/top_left.js"></script> --%>
	<script src="<%= topLeftJs %>"></script>
	<%--<script src="/resources/scripts/Site.js"></script> --%>
	<script src="<%= SiteJs %>"></script>

	<link rel="stylesheet" href="/jquery-ui/themes/base/all.css">
	<link rel="stylesheet" href="/jquery-ui/demos/demos.css">

	<script type="text/javascript">
	<%

		if(session.getAttribute("LANG").toString().equals("ko")) {
	%>


	$.datepicker.setDefaults($.datepicker.regional['ko']);

	<%
		}
	%>

	function aa() {
		var session = <%=session.getMaxInactiveInterval()%> ;
		//alert(session);
	}





	</script>
<style type="text/css">

	.gridLinkText { color:#0585B9 !important;font-weight:bold !important;cursor:pointer !important; }
	.gridRightText { text-align:right !important; }
	.gridLeftText { text-align:left !important; }
	.gridCenterText { text-align:center !important; }
	.gridBorderText { font-weight:bold !important; }
	.gridTextColor { color: #586980 !important; }
	.gridTextRedColor { color: red !important; }
	.gridBorderColor { border-right: 1px solid #1182DC !important; }
	
	.blinking { animation: blinker 1.3s linear infinite; color: #1c87c9; }
	@keyframes blinker {
		50% {
			opacity: 0;
		}
	}
</style>
</head>

<body id="page-top">

	<input id="txtGridCode" type="hidden" value="${gridCode}" />
	<input type="hidden" id="firstYn"  value="${firstYn}" />
	<input type="hidden" id="menu_id"  value="${menu_id}" />


	<input id="transID" type="hidden" value="<%=session.getAttribute("TRANS_USR_ID")%>"/>
	<input id="roleSeq" type="hidden" value="<%=session.getAttribute("ROLE_SEQ")%>"/>
	<input id="roleName" type="hidden" value="<%=session.getAttribute("ROLE_NAME")%>"/>
	<div id="wrapper">
		<!-- Sidebar - 왼쪽 메뉴 -->
		<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

			<!-- Sidebar - 로고 -->
			<a class="sidebar-brand d-flex align-items-center justify-content-center" href="/home.do">

				<!--
				<div class="sidebar-brand-icon">
					<img src="/resources/images/credit_card_hand.png" />
				</div>
				 -->
				<div class="sidebar-brand-text mx-3" style="margin-left: 0rem !important; margin-right: 0rem !important;">
					<label style="font-family: Nanum Barun Gothic; font-size: 36px; margin-bottom: -0.5rem">
						DESM
					</label>
					<label style="font-family: Nanum Barun Gothic; font-color:#ffffff; font-size: xx-small; margin-top:0px; margin-bottom: -1rem; letter-spacing:0.01rem; line-height:80%">
						<code>Doosan Equipment & Materials Supply Management System </code>
					</label>
				</div>
			</a>
			<br>
			<!-- Divider -->
			<hr class="sidebar-divider my-0">

			<!-- Nav Item - Dashboard -->
			<li class="nav-item">
				<a class="nav-link" href="/home.do">
					<i class="fas fa-fw fa-tachometer-alt"></i>
					<span>Notice</span>
				</a>
			</li>
			<!--
			<li class="nav-item">
				<a class="nav-link" href="/video.do">
					<i class="fas fa-fw fa-tachometer-alt"></i>
					<span>Video</span>
				</a>
			</li>
			 -->
			<!-- Divider -->
			<hr class="sidebar-divider"></hr>


			<input type="hidden" id = "selectMenuId" value="${menu.MENU_UP_ID}"></input>
			<div id="divMenu">
			</div>

			<hr class="sidebar-divider"></hr>
			<!--
			<li class="nav-item">
				<a class="nav-link" href="/operator.do">
					<i class="fas fa-fw fa-users"></i>
					<span>Operator</span>
				</a>
			</li>
			 -->
			<%
				Boolean menuCheck = false;

				if(session.getAttribute("ROLE_SEQ") != null) {
					String roleSeq = session.getAttribute("ROLE_SEQ").toString();
			  	    String[] roleSeqArr = roleSeq.split(",");

					  for(int i = 0; i < roleSeqArr.length; i++)
					  {
						  String tmpRoleSeq = roleSeqArr[i];
						  if(tmpRoleSeq.equals("1")){
							  menuCheck = true;
						  }

					  }
				}

			    if(menuCheck) { %>
			<li class="nav-item">
				<a class="nav-link collapsed" href="/notice.do">
					<i class="fas fa-fw fa-list"></i>
					<span>Notice</span>
				</a>
			</li>
<!-- 			<li class="nav-item"> -->
<!-- 				<a class="nav-link" href="javascript:void(0);" data-target="#modal-license" data-toggle="modal"> -->
<!-- 					<i class="fas fa-fw fa-list"></i> -->
<!-- 					<span>OpenSource License</span> -->
<!-- 				</a> -->
<!-- 			</li> -->
			<%	} %>
			<!-- Sidebar 줄이기/키우기 버튼 -->
			<div class="text-center d-none d-md-inline">
				<button class="rounded-circle border-0" id="sidebarToggle"></button>
			</div>
		</ul>
		<!-- End of Sidebar -->

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<!-- 상단 툴바 영역 -->
				<nav class="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">

					<!-- 사이드바 Toggle (Topbar) -->
					<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
						<i class="fa fa-bars"></i>
					</button>

					<span id="btnRealTimeNotice" class="mr-2 d-none d-lg-inline text-gray-600" style="width:30%; padding-left: 10px; font-size : 0.8rem;line-height:1.8;cursor:pointer">
						<marquee id="noticeMarquee" scrollamount="3" onmouseover="this.stop();" onmouseout="this.start();"><div id="divRealTimeNotice"></div></marquee>
					</span>
							
					<!-- Topbar Navbar -->
					<ul class="navbar-nav ml-auto">
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<label id="labelCurrentLocation" class="mr-2 d-none d-lg-inline" style="font-size : 0.8rem; line-height:1.8; background: red; color: yellow;"></label>
						</li>
						<!-- Nav Item - 사용자 정보 -->
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<span id="btnDefaultCountry" class="mr-2 d-none d-lg-inline text-gray-600"  style = "font-size : 0.8rem;line-height:1.8;cursor:pointer">
								<i class="fas fa-search-plus">
									<span id="spanDefaultCountry" style="padding-left : 0">Default Country</span>
								</i>
							</span>
						</li>
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<span id="btnDefaultProject" class="mr-2 d-none d-lg-inline text-gray-600"  style = "font-size : 0.8rem;line-height:1.8;cursor:pointer">
								<i class="fas fa-search-plus">
									<span id="spanDefaultProject" style="padding-left : 0">Default Project</span>
								</i>
							</span>
						</li>
						<!--
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<span id="btnPassword" class="mr-2 d-none d-lg-inline text-gray-600" style = "font-size : 0.8rem;line-height:1.8;cursor:pointer">
								<i class="fas fa-user-lock">
									<span style="padding-left : 0">Password</span>
								</i>
							</span>
						</li>
						 -->
						<!-- <li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<span id="btnLogout" class="mr-2 d-none d-lg-inline text-gray-600" style = "font-size : 0.8rem;line-height:1.8;cursor:pointer">
								<i class="fas fa-sign-out-alt">
									<span style="padding-left : 0">Logout</span>
								</i>
							</span>
						</li> -->
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<span id="spanEmptyCash" class="mr-2 d-none d-lg-inline text-gray-600" style = "font-size : 0.8rem;line-height:1.8;cursor:pointer">
								<!-- <i class="fa-solid fa-eraser"> -->
								<i class="fas fa-registered">
									<span style="padding-left : 0">Refresh</span>
								</i>
							</span>
							<!-- <label id="spanEmptyCash" class="mr-2 d-none d-lg-inline" data-toggle="tooltip" data-placement="bottom" title="Empty Cash" style="font-size : 0.8rem; line-height:1.8; color: blue;cursor:pointer">EmptyCash</label> -->
						</li>
						<!--
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<button  class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 20px; margin-top:1px">
								<span class="icon text-white-50" style= "padding:0 0.3rem"><i class="fas fa-pencil-alt"></i></span>
								<span class="text" style= "padding:0 0.3rem">Default Project</span>
							</button>
						</li>
	 					-->
						<li class="nav-item dropdown no-arrow" style="padding-right: 20px;">
							<select id="selLang" title="Language" class="form-control form-control-user" style="font-size : 0.8rem; height:20px; padding:0px; margin-top:1px;font-weight:900;font-family:'Font Awesome 5 Free'">

							</select>
						</li>

						<li class="nav-item dropdown no-arrow" >
							<span id="logh" class="mr-2 d-none d-lg-inline text-gray-600" data-toggle="tooltip" data-placement="bottom" title="<%=session.getAttribute("LOG").toString()%>" style = "font-size : 0.8rem;line-height:1.8;font-weight:900;font-family:'Font Awesome 5 Free'"><%=session.getAttribute("NAME_TXT").toString()%></span>
						</li>
					</ul>

				</nav>
				 <!-- End of Topbar -->