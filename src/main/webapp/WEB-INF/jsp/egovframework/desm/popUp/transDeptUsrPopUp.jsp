
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transDeptUsrPopUpJs = "/resources/scripts/popUp/transDeptUsrPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transDeptUsrPopUp.js"	></script> --%>
<script src="<%= transDeptUsrPopUpJs %>"></script>

<div class="modal hide fade" id="dlgTransDeptUsr" tabindex="-1" role="dialog" aria-labelledby="dlgTransDeptUsrTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 700px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgTransDeptUsrTitle">담당자 정보 조회</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding-top: 4px;padding-bottom: 2px;border: 1px solid #d1d3e2;" >
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="" style="line-height : 2">담당자</label>
						</div>
						<div class="col-sm-3" style="padding-right:0">
							<input id="txtDlgTransUsr" type="text" class="form-control form-control-user " autocomplete="off" />
						</div>
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="" style="line-height : 2">부서명</label>
						</div>
						<div class="col-sm-3" style="padding-right:0">
							<input id="txtDlgTransDept" type="text" class="form-control form-control-user " autocomplete="off" />
						</div>
						<div class="col-sm-2" style="padding-right:0">
							<button id="btnDlgTransDeptUsrSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; height: 22px;">
								<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
									<i class="fas fa-search"></i>
								</span>
								<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Search</span>
							</button>						
						</div>
					</div>
				</div>
				<div id="dlgTransDeptUsrGrid" style="padding-top: 4px; height:300px;" ></div>
			</div>

			<div class="modal-footer">
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>