<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String vesselFinderJs = "/resources/scripts/shippingStatus/vesselFinder.js?rv=" + rV;
%>

	<!-- Page level scripts -->
	<jsp:include page="../layoutSupport/layout.jsp"></jsp:include>
	<jsp:include page="../language.jsp"></jsp:include>
	
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyrMI17RnqxdRvPV9LnpQaCpANF-nVuLQ&callback=initVesselMap"></script>
    
	<script src="<%= ajaxSetupJs %>"></script>
	<script src="<%= vesselFinderJs %>"></script>

	<style type="text/css">
		html, body {
		  height: 100%;
		  padding: 0;
		  margin: 0;
		}
		table tr {
			height: 7px;
			min-height: 7px;
		}
		#map {
		  /* 지도의 크기를 설정 */
		  width: 100%;
		  height: 100%;
		}
        .gm-style-iw {
            background-color: #000 !important;
            top: 0 !important;
            left: 0 !important;
            overflow: hidden;
		}
		.gm-style-iw > div {
			overflow: hidden !important;   
		}
		/* fix for unwanted scroll bar in InfoWindow */
		.infoWindow {
			line-height: 1.35;
			overflow: hidden;
			white-space: nowrap;
		  	padding: 0;
		  	margin: 0 0 10 10;
		}
	</style>

<!-- Begin Page Content -->
<div class="container-fluid-grid container-fluid">
	<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />
	
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3" style="padding-right:0; padding-left:0">
				<div class="form-group row">
					<table id="tblVesselList" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
						<colgroup>
							<col style="" />
						</colgroup>					
						<thead>
							<tr>								
								<th data-field="INV_NO" data-align="left">Invoice No.</th>
								<th data-field="ETD_ATD" data-align="center" data-formatter="rowFormatter">ETD_ATD</th>
								<th data-field="ETA_ATA" data-align="center" data-formatter="rowFormatter">ETA_ATA</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<div id="divProjectGird" class="col-sm-9" style="padding-right:0; height: 850px;">
				<div id="vesselFinderMap" style="width: 100%; height: 100%;"></div>
			</div>						
		</div>
	</div>
</div>
		
<%-- <jsp:include page="../foot_right.jsp"></jsp:include> --%>
	
<!-- 미사용 부분 -->
