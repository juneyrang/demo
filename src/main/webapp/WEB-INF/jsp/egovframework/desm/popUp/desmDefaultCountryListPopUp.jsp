
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmDefaultCountryListPopUpJs = "/resources/scripts/popUp/desmDefaultCountryListPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmDefaultCountryListPopUp.js"></script> --%>
<script src="<%= desmDefaultCountryListPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmDefaultCountry" tabindex="-1" role="dialog" aria-labelledby="dlgDesmDefaultCountryTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 350px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmDefaultCountryTitle">Default Country</h6>
				<!-- 
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				 -->
			</div>

			<div class="modal-body">
				
				<div class="form-group row mb-1" style="padding:0 11px 5px 11px">
					<table border="0" style="width: 100%;">
						<tr>
							<td style="width: 70px;">
								<label class="" style=""><spring:message code='modal.project.search.label'/></label>
							</td>
							<td style="width: 300px;">
								<input id="txtDlgDesmDefaultCountryCode" type="text" class="form-control form-control-user required" autocomplete="off" style="height:23px">
									<i id="iconDlgDesmDefaultCountrySearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
								</input>
							</td>
						</tr>
					</table>
				</div>
				<div id="gridDlgDesmDefaultCountry" style = "height:100px;"></div>
			
			</div>

			<div class="modal-footer">
				<button id="btnDDlgDesmDefaultCountrySave" class="btn btn-success btn-icon-split btn-sm">
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