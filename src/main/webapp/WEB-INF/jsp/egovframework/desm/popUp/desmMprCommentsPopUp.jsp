
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMprCommentsPopUpJs = "/resources/scripts/popUp/desmMprCommentsPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMprCommentsPopUp.js"></script> --%>
<script src="<%= desmMprCommentsPopUpJs %>"></script>

<div class="modal hide fade" id="dlgMprComments" tabindex="-1" role="dialog" aria-labelledby="dlgMprCommentsTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgMprCommentsTitle">Comments</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<textarea id="txtdlgMprComments" class="form-control form-control-user " cols="80" rows="15" style = "font-size:11px;line-height:1.5;padding:5px"></textarea>
			
			</div>

			<div class="modal-footer">
				<button id="btnDlgMprCommentsReject" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Return</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>