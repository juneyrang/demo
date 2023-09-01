
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transPackagePopUpJs = "/resources/scripts/popUp/transPackagePopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transPackagePopUp.js"	></script> --%>
<script src="<%= transPackagePopUpJs %>"></script>

<div class="modal hide fade" id="dlgTransPackage" tabindex="-1" role="dialog" aria-labelledby="dlgTransPackageTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgTransPackageTitle">Shipment No Package 정보</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" style = "padding-top : 0; padding-bottom:4px;">

					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="dlgTransPackageTable" style="height : 600px"></div>
						</div>
					</div>

			</div>

			<div class="modal-footer">
				<button id="btnDlgTransPackageExcelDownload" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50" ><i class="fas fa-file-excel" ></i></span>
					<span class="text" >Excel Download</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>
		</div>
	</div>
</div>