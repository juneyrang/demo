
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String idsmSchmapExcelUploadPopUpJs = "/resources/scripts/popUp/idsmSchmapExcelUploadPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/idsmSchmapExcelUploadPopUp.js"	></script> --%>
<script src="<%= idsmSchmapExcelUploadPopUpJs %>"></script>

<div class="modal hide fade" id="dlgIdsmSchmapExcelUploadPopUp" tabindex="-1" role="dialog" aria-labelledby="dlgIdsmSchmapExcelUploadPopUpTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgIdsmSchmapExcelUploadPopUpTitle">Excel Upload</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<input  type="file" id="dlgIdsmSchmapExcelUploadPopUpFile" style="display:none"/>
				<div id="dlgIdsmSchmapExcelUploadPopUpGrid" style="height : 400px"></div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgIdsmSchmapExcelUploadPopUpUpload" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50" ><i class="fas fa-file-excel" ></i></span>
					<span class="text" >Excel Upload</span>
				</button>			
				<button id="btnDlgIdsmSchmapExcelUploadPopUpSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
					<span class="text"><spring:message code='button.save'/></span>
				</button>																							
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code='button.close'/></span>
				</button>
			</div>
		</div>
	</div>
</div>



