<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String openStreetJs = "/resources/scripts/shippingStatus/openStreet.js?rv=" + rV;
%>

	<!-- Page level scripts -->
	<jsp:include page="../layoutSupport/layout.jsp"></jsp:include>
	<jsp:include page="../language.jsp"></jsp:include>
	
    <!-- <link rel="stylesheet" href="/Vessel-Tracking/openstreet/leaflet.css" />
    <script type="text/javascript" src="/Vessel-Tracking/openstreet/leaflet.js"></script> -->
   	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    
	<script src="<%= ajaxSetupJs %>"></script>
	<script src="<%= openStreetJs %>"></script>
	<script src="/resources/gridJs/GridE.js"		></script>

	<style type="text/css">
		html, body {
		  height: 100%;
		  padding: 0;
		  margin: 0;
		}
		#map {
		  /* 지도의 크기를 설정 */
		  width: 100%;
		  height: 100%;
		}
     
		input{
			margin:0;
		}
		
		input[type="text"]{
			padding: 5px;
			text-align: left;
			margin: 0px;
			height: 30px;
			font-size:12px;
			padding-left: 5px;
			/* font-style: oblique; */
			outline:none;
			box-sizing: border-box;
			color:black;
		}
		input[type=button]{
			width: 30%;
			height:100%;
			background-color: lightgray;
			border:none;
			background-color: white;
			font-size:1em;
			color:#042AaC;
			outline:none;
			display:inline;
			margin-left: -10px;
			box-sizing: border-box;
		}
		input[type=button]:hover{
			background-color: lightgray;
		}
		
		input{
			font-size:0.6rem;
		}
	
		.btn-sm, .btn-group-sm > .btn {
			font-size: 0.9em;
		}
	
		button {
			font-size: 0.9em;
			/* width:80px; */
			height:26px;
		}
	
		input[type="text"]{
			height: 20px;
		    font-size: 11px;
		}
	</style>

<!-- Begin Page Content -->

<!-- Begin Page Content -->
<div class="container-fluid-grid container-fluid" >
	<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />
	
	<div class="container-fluid">
		<div class="row row-sm">
			<div class="col-sm-2 col-xl-2 col-lg-2" style="padding-right:0; padding-left:0">
					
				<div class="form-group row">
					<div class="col-sm-12">
						<table width="100%" style="margin-bottom: 0.2rem;">
							<tr>
								<td width="100%">
									<table style="height: 43px;">
										<tr>
											<td >
												<input id="txtInvoiceNo" type="text" class="form-control form-control-user" style="width: 100%;" autocomplete="off">
											</td>
										</tr>
									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table style="width: 100%; height: 43px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; " width="100%">														
												<button id="btnInvoiceNoSearch" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-30"><i class="fas fa-search"></i></span>
													<span class="text">Search</span>
												</button>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					
						<div id="gridDesmVesselInvoiceNo" style="padding-top:3px; width:100%; height:800px;"></div>
					</div>
				</div>
			</div>
			<div id="divProjectGird" class="col-sm-10 col-xl-10 col-lg-10" style="padding-right:0; height: 850px;">
				<div id="desmMap" style="width: 100%; height: 100%;"></div>
			</div>						
		</div>
	</div>
		
<%-- <jsp:include page="../foot_right.jsp"></jsp:include> --%>
	
<!-- 미사용 부분 -->
