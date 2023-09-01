
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transMailAddPopUpJs = "/resources/scripts/popUp/transMailAddPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transMailAddPopUp.js"	></script> --%>
<script src="<%= transMailAddPopUpJs %>"></script>

<div class="modal hide fade" id="dlgMailAdd" tabindex="-1" role="dialog" aria-labelledby="dlgMailAddTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgMailAddTitle">수신자 정보 조회</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="required">수신자 명</label>
						</div>
						<div class="col-sm-10">
							<input id="txtDlgMailAddEmpName" type="text" class="form-control form-control-user required" >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="">부서명</label>
						</div>
						<div class="col-sm-10">
							<input id="txtDlgMailAddDeptName" type="text" class="form-control form-control-user" readonly>
						</div>
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="">담당자 AD</label>
						</div>
						<div class="col-sm-10">
							<input id="txtDlgMailAddEmpAD" type="text" class="form-control form-control-user" readonly>
						</div>
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="">운송사 직원</label>
						</div>
						<div class="col-sm-10">
							<input id="txtDlgMailAddTransCompanyYn" type="text" class="form-control form-control-user" readonly>
						</div>
					</div>	
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgMailAddSelect" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">선택</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>