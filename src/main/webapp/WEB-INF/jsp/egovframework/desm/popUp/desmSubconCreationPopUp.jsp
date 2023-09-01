
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmSubconCreationPopUpJs = "/resources/scripts/popUp/desmSubconCreationPopUp.js?rv=" + rV;
    String idcsRestApiJs = "/resources/scripts/idcsRestApi.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmSubconCreationPopUp.js"></script>
<script src="/resources/scripts/idcsRestApi.js"></script> --%>
<script src="<%= desmSubconCreationPopUpJs %>"></script>
<script src="<%= idcsRestApiJs %>"></script>

<div class="modal hide fade" id="dlgDesmSubconCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmSubconCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 40%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmSubconCreationTitle">Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmSubconCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">ID</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmSubconCreationId" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Name</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmSubconCreationName" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Dept Name</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmSubconCreationDeptName" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">E-Mail</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmSubconCreationMail" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Role</label>
						</div>
						<div class="col-sm-9" >
							<select id="selDlgDesmSubconCreationRole" class="form-control form-control-user required">
							</select>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Default Country</label>
						</div>
						<div class="col-sm-9" >
							<select id="selDlgDesmSubconCreationDefaultCountry" class="form-control form-control-user required">
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmSubconCreationSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.save" /></span>
				</button>
				<button id="btnDlgDesmSubconCreationResetPassword" authType="S" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-user-lock"></i></span>
					<span class="text">Reset Password</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmRsiCreationPopUp"></div>