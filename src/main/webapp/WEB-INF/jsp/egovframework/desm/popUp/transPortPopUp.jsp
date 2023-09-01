
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transPortPopUpJs = "/resources/scripts/popUp/transPortPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transPortPopUp.js"	></script> --%>
<script src="<%= transPortPopUpJs %>"></script>

<div class="modal hide fade" id="dlgPort" tabindex="-1" role="dialog" aria-labelledby="dlgPortTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgPortTitle">선적항</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding-right: 4px;padding-left: 4px;">
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="" style="line-height : 2">Port Type</label>
						</div>
						<div class="col-sm-10" style="padding-right:0">
							<input type="radio" name="rdoDlgPortPortType" id="rdoDlgPortPortType_1" style="vertical-align : middle;width: 10;" value = ""><label class="" style="margin-left:4px">All</label>
							<input type="radio" name="rdoDlgPortPortType" id="rdoDlgPortPortType_2" style="vertical-align : middle;width: 10;margin-left:8px" value = "PORT"><label class="" style="margin-left:4px">Port</label>
							<input type="radio" name="rdoDlgPortPortType" id="rdoDlgPortPortType_3" style="vertical-align : middle;width: 10;margin-left:8px" value = "AIR_PORT"><label class="" style="margin-left:4px">Air-Port</label>
						</div>
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="" style="line-height : 2">검색</label>
						</div>
						<div class="col-sm-10" style="padding-right:0">
							<input id="txtDlgPortSearch" type="text" class="form-control form-control-user ">
								<i id="iconDlgPortSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="dlgPortType"></div>
						</div>
					</div>
				</div>
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