
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMapLocationPopUpJs = "/resources/scripts/popUp/desmMapLocationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMapLocationPopUp.js"	></script> --%>
<script src="<%= desmMapLocationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMapLocation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMapLocationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMapLocationTitle">Material list</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="card-body-grid" style="vertical-align: middle; " id="dlgDesmMapLocationDetailGridDiv">
					<div class="table-responsive" style="vertical-align: middle; ">
						<div id="dlgDesmMapLocationDetailGrid" style="height:600px;" ></div>
					</div>
				</div>
				<div class="card-body-grid" style="vertical-align: middle; display:none;" id="dlgDesmMapLocationPackageGridDiv">
					<div class="table-responsive" style="vertical-align: middle; ">
						<div id="dlgDesmMapLocationPackageGrid" style="height:600px;" ></div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
					<button id="btnDlgDesmMapLocationDetailExcelDownload" authType="R" class="btn btn-success btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
						<span class="text">Excel Download</span>
					</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmMapLocationPopUp"></div>