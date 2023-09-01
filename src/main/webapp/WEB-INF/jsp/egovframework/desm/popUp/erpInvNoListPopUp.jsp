
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String erpInvNoListPopUpJs = "/resources/scripts/popUp/erpInvNoListPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/erpInvNoListPopUp.js"	></script> --%>
<script src="<%= erpInvNoListPopUpJs %>"></script>

<div class="modal hide fade" id="dlgInvoiceNoList" tabindex="-1" role="dialog" aria-labelledby="dlgInvoiceNoListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgInvoiceNoListTitle">Invoice No 조회</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<table border="0" style="width: 100%;">
							<tr>
								<td style="width: 20px;">
									<label class="" style="">검색</label>
								</td>
								<td style="width: 300px;">
									<input id="txtDlgInvoiceNo" type="text" class="form-control form-control-user required" autocomplete="off" />
									<i id="iconDlgInvoiceNoListSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
								</td>
							</tr>
						</table>
					</div>
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="gridDlgInvoiceNo"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgInvoiceNoSelect" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.desm.select" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<input id="alertDlgInvoiceNoListGridSelectDataNull"		type="hidden" value="<spring:message code='alert.grid.select.data.null'	/>"/>