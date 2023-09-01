
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmPackageDateChangePopUpJs = "/resources/scripts/popUp/desmPackageDateChangePopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmPackageDateChangePopUp.js"	></script> --%>
<script src="<%= desmPackageDateChangePopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmPackageDateChange" tabindex="-1" role="dialog" aria-labelledby="dlgDesmPackageDateChangeTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmPackageDateChangeTitle">Change</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divModalBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-5 text-right font-weight-bold ">
							<label class="required" style="line-height : 2">Received Date</label>
						</div>
						<div class="col-sm-7" >
							<input id="txtDlgDesmPackageDateChangeDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnDlglgDesmPackageDateChangeReset" authType="R" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text"><spring:message code="button.desm.reset" /></span>
				</button>
				<button id="btnDlglgDesmPackageDateChangeEdit" authType="R" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text"><spring:message code="button.desm.edit" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>