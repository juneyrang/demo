
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transStrategicMgtCopyListPopUpJs = "/resources/scripts/popUp/transStrategicMgtCopyListPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transStrategicMgtCopyListPopUp.js"></script> --%>
<script src="<%= transStrategicMgtCopyListPopUpJs %>"></script>

<div class="modal hide fade" id="dlgTransStrategicMgtCopyList" tabindex="-1" role="dialog" aria-labelledby="dlgTransStrategicMgtCopyListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 900px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgTransStrategicMgtCopyListTitle">전략물자 판정 List</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold" style="padding-top : 3px">
							<label class="">Porject Code</label>
						</div>
						<div class="col-sm-2" >
							<input id="txtDlgTransStrategicMgtCopyListProjectCode" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-2 text-right font-weight-bold" style="padding-top : 3px">
							<label class="">출하요청번호</label>
						</div>
						<div class="col-sm-2" >
							<input id="txtDlgTransStrategicMgtCopyListShippingReqNo" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-2 text-right font-weight-bold" style="padding-top : 3px">
							<label class="">Invoice No.</label>
						</div>
						<div class="col-sm-2" >
							<input id="txtDlgTransStrategicMgtCopyListInvoiceNo" type="text" class="form-control form-control-user " autocomplete="off">
						</div>											
					</div>
				</div>
				<div id="gridDlgTransStrategicMgtCopy" style = "height:400px;padding-top:8px"></div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgTransStrategicMgtCopySave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">저장</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>
		</div>
	</div>
</div>