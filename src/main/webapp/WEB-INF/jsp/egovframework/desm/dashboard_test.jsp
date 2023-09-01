<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<jsp:include page="./language.jsp"></jsp:include>

<script src="/resources/ext/bluebird/bluebird.min.js"></script>

<!-- Page level scripts -->
<script src="/resources/scripts/ajaxSetup.js"></script>
<script src="/resources/scripts/dashboard_test.js"></script>

<style type="text/css">
	
</style>

<!-- Begin Page Content -->
<div class="container-fluid">
	
	<div class="row">
		<div class="col-sm-6">
			<div class="card shadow mb-4">
				<div class="card-header py-3">
					<h6 class="m-0 font-weight-bold text-primary">Project PKG Summary</h6>
				</div>
				<div class="card-body">
					<div class="table-responsive">
						<table id="tblList" data-toggle="table" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
							<colgroup>							
								<!-- <col style="width: 20%;" /> -->
							</colgroup>						
							<thead>
								<tr>
									<th data-field="CONDITION" data-align="center">Condition</th>
									<th data-field="PKG_COUNT" data-align="center">PKGS</th>
									<th data-field="CBM_SUM" data-align="center">Total CBM(㎥)</th>
									<th data-field="NET_SUM" data-align="center">Total NET(ton)</th>
									<th data-field="GROSS_SUM" data-align="center">Total GROSS(ton)</th>
									<th data-field="SQM_SUM" data-align="center">Total SQM(㎡)</th>
								</tr>
							</thead>
							<tfoot>
								<tr>							
									<th>Condition</th>
									<th>PKGS</th>
									<th>Total CBM(㎥)</th>
									<th>Total NET(ton)</th>
									<th>Total GROSS(ton)</th>
									<th>Total SQM(㎡)</th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</div>

<div id="dashboard_testPopup"></div>

