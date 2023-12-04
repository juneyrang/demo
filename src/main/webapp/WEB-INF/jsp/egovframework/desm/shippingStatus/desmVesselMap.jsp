<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String desmVesselMapJs = "/resources/scripts/shippingStatus/desmVesselMap.js?rv=" + rV;
%>

	<!-- Page level scripts -->
	<jsp:include page="../layoutSupport/layout.jsp"></jsp:include>
	<jsp:include page="../language.jsp"></jsp:include>
	
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyrMI17RnqxdRvPV9LnpQaCpANF-nVuLQ&callback=initVesselMap"></script>
    
	<script src="<%= ajaxSetupJs %>"></script>
	<script src="<%= desmVesselMapJs %>"></script>

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
     
	</style>

<!-- Begin Page Content -->
<div class="container-fluid-grid container-fluid">
	<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />
	
	<div class="container-fluid">
		<div class="row">
			<div id="divProjectGird" class="col-sm-12 col-xl-12 col-lg-12" style="padding-left:0; padding-right:0; height: 450px;">
				<div id="desmVesselMap" style="width: 100%; height: 100%;"></div>
			</div>						
		</div>
		<div class="row">
			<div class="col-sm-12 col-xl-12 col-lg-12" style="padding-right:0; padding-left:0; height: 340px;">
				<table id="tblVesselList" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
					<colgroup>
						<col style="width: 15%;" />
						<col style="width: 5%;" />
						<col style="width: 10%;" />
						<col style="" />
						<col style="width: 7%;" />
						<col style="width: 7%;" />
						<col style="width: 7%;" />
						<col style="width: 7%;" />
						<col style="width: 10%;" />
						<col style="width: 15%;" />
					</colgroup>					
					<thead style="position: sticky;top: 0;background-color:white">
						<tr>								
							<th data-field="INV_NO" data-align="left">Invoice No.</th>
							<th data-field="IMO" data-align="center">IMO</th>
							<th data-field="VESSEL_NAME" data-align="center">VESSEL_NAME</th>
							<th data-field="ITEM_NAME" data-align="center">ITEM_NAME</th>
							<th data-field="POL" data-align="center">POL</th>
							<th data-field="ETD_ATD" data-align="center">ETD_ATD</th>
							<th data-field="POD" data-align="center">POD</th>
							<th data-field="ETA_ATA" data-align="center">ETA_ATA</th>
							<th data-field="MFR" data-align="center">MFR</th>
							<th data-field="PL_NO" data-align="center">PL_NO</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</div>
		
<%-- <jsp:include page="../foot_right.jsp"></jsp:include> --%>
	
<!-- 미사용 부분 -->
