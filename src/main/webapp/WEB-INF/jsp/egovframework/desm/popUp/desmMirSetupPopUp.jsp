
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMirSetupPopUpJs = "/resources/scripts/popUp/desmMirSetupPopUp.js?rv=" + rV;
%>

<jsp:include page="../language.jsp"></jsp:include>

<%--<script src="/resources/scripts/popUp/desmMirSetupPopUp.js"></script> --%>
<script src="<%= desmMirSetupPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMirSetup" tabindex="-1" role="dialog" aria-labelledby="dlgDesmDefaultCountryTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg dlgDesmMirSetupPopup" role="document">
	<!-- <div class="modal-dialog modal-dialog-centered modal-lg dlgDesmMirSetupPopup" role="document" style="max-width: 350px;"> -->
	
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmDefaultCountryTitle"></h6>
				<!-- 
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				 -->
			</div>
			
			
			
			<div class="modal-body" id="divModalBody">
				<div class="container-fluid" style="padding: 0px;">
									
					<div id="InspectionResult" class="form-group row mb-1">
						<div class="col-sm-5 text-right font-weight-bold ">
							<label class="required" style="line-height : 2">Inspection Result</label>
						</div>
						<div class="col-sm-7" >
							<!-- <input id="txtDlgDesmInspectionResultApply" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/> -->
							<select id="desmMirPopupVal" class="form-control form-control-user" style="background-color: #B4D9FD;">
								<!-- <option value="">All</option> -->
								<option value="Good">Good</option>
								<option value="Defect">Defect</option>
								<option value="Hold">Hold</option>
							</select>						
						</div>				
					</div>
					
					<div id="ReqChgQty" class="form-group row mb-1">
						<div class="col-sm-5 text-right font-weight-bold ">
							<label class="required" style="line-height : 2">Required Change Q'ty</label>
						</div>
						<div class="col-sm-7" >
							<!-- <input id="txtDlgDesmQtyFixYNApply" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/> -->
							<select id="desmMirPopupVal" class="form-control form-control-user" style="background-color: #B4D9FD;">
								<!-- <option value="">All</option> -->
								<option value="Y">Y</option>
								<option value="N">N</option>
							</select>						
						</div>				
					</div>
					
					<div id="PoNo" class="form-group row mb-1">
						<div class="col-sm-5 text-right font-weight-bold ">
							<label class="required" style="line-height : 2">PO No.</label>
						</div>
						<div class="col-sm-7" >
							<input id="desmMirPopupVal" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>						
						</div>				
					</div>
					
				</div>											
			</div>
			
			<div class="modal-footer">
				<button id="btnDlgDesmMirSetupConfirm" authType="R" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text"><spring:message code="button.desm.edit" /></span>
				</button>				
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
			

			
		</div>
	</div>
</div>