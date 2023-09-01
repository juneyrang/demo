
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmInvoiceNumberSeqListPopUpJs = "/resources/scripts/popUp/desmInvoiceNumberSeqListPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmInvoiceNumberSeqListPopUp.js"></script> --%>
<script src="<%= desmInvoiceNumberSeqListPopUpJs %>"></script>

<div class="modal hide fade" id="dlgInvoiceSeqList" tabindex="-1" role="dialog" aria-labelledby="dlgInvoiceSeqListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 900px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgInvoiceSeqListTitle"><spring:message code="modal.inv.seq.mng.title" /></h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div id="gridDlgInvoiceSeq" style="padding-top:1px; height:400px"></div>
			</div>

			<div class="modal-footer">

				<button id="btnDlgInvoiceSeqListAdd" class="btn btn-primary btn-icon-split btn-sm" >
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text"><spring:message code="button.desm.add" /></span>
				</button>
				<button id="btnDlgInvoiceSeqListDelete" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text"><spring:message code="button.desm.del" /></span>
				</button>
				<button id="btnDlgInvoiceSeqListSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.save" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgIdsmInvoiceSeqListPopUp"></div>