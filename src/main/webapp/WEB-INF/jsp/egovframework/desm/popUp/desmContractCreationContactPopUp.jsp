
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>
<!-- desmContractCreationContactPopUp -->

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmContractCreationContactPopUpJs = "/resources/scripts/popUp/desmContractCreationContactPopUp.js?rv=" + rV;
%>

<jsp:include page="../language.jsp"></jsp:include>
<!-- Page level scripts -->
<script src="/resources/ext/jquery.sumoselect.js"></script>

<%--<script src="/resources/scripts/popUp/desmContractCreationContactPopUp.js"	></script> --%>
<script src="<%= desmContractCreationContactPopUpJs %>"></script>

<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
<link href="/resources/ext/sumoselect.css" rel="stylesheet" />

<style>
	/* 첨부파일 스타일 변경 start */
	.file-caption{
		height			: unset;
		padding-top		: unset;
		padding-bottom	: unset;
	}
 	.file-preview-frame{
	    width	: unset;
	    height	: unset
	}
 	.krajee-default .file-caption-info, .krajee-default .file-size-info{
 	    width: unset;
	}
	.krajee-default .file-footer-caption {
		margin-bottom: unset;
	}
	.krajee-default.file-preview-frame{
		margin-top		: unset;
		margin-bottom	: unset;
		margin-left		: unset;
		margin-right	: unset;
	}
	.file-preview{
		padding: unset;
	}
	.file-drop-zone{
		margin: unset;
	}
	/* 첨부파일 스타일 변경 end */
</style>
<div class="modal hide fade" id="dlgDesmContractContact" tabindex="-1" role="dialog" aria-labelledby="dlgDesmContractContactTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 60%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmContractContactTitle">Contract Contact List</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			
			<div class="modal-body">
				<div class="card-body-grid" style="vertical-align: middle; ">
					<div id="dlgDesmContractContactGrid" style="padding-top: 4px; height:250px;" ></div>
				</div>
			</div>
			
			<div class="modal-footer">
				<button id="btnDlgDesmContractContactAdd" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text"><spring:message code="button.desm.add" /></span>
				</button>
				<button id="btnDlgDesmContractContactDelete" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text"><spring:message code="button.desm.del" /></span>
				</button>
				<button id="btnDlgDesmContractContactSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.desm.apply" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmContractContactPopUp"></div>