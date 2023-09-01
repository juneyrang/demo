
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmSupplierSetupPopUpJs = "/resources/scripts/popUp/desmSupplierSetupPopUp.js?rv=" + rV;
    String idcsRestApiJs = "/resources/scripts/idcsRestApi.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmSupplierSetupPopUp.js"></script>
<script src="/resources/scripts/idcsRestApi.js"></script> --%>
<script src="<%= desmSupplierSetupPopUpJs %>"></script>
<script src="<%= idcsRestApiJs %>"></script>

<div class="modal hide fade" id="dlgDesmSupplierSetup" tabindex="-1" role="dialog" aria-labelledby="dlgDesmSupplierSetupTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmSupplierSetupTitle">Supplier Setup</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmSupplierSetupBody">
				<div class="container-fluid" style="padding: 0px;">
					<div id="divDlgDesmSupplierSetupPoCheck" class="form-group row mb-1" style="margin-bottom:4px !important">
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Supplier</label>
						</div>
						<div class="col-sm-3" style="padding-right:0">
							<input id="txtDlgDesmSupplierSetupSupplierNo" type="text" class="form-control form-control-user required" autocomplete="off" >
								<i id="iconDlgDesmSupplierSetupSupplierSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>
						<div class="col-sm-6" style="padding-left:4px;padding-right:0">
							<input id="txtDlgDesmSupplierSetupSupplierName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
						<div class="col-sm-2" >
							<button id="btnDlgDesmSupplierSetupPoSearch" authType="R" class="btn btn-success btn-icon-split btn-sm" style="height:21px;background-color:#4599EE !important;">
								<span class="icon text-white-50" style = "padding:0.15rem 0.2rem"><i class="fas fa-search" style="color: white;"></i></span>
								<span class="text" style= "font-size:11px">PO Search</span>
							</button>
						</div>																																																		
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">E-Mail</label>
						</div>
						<div class="col-sm-9" style="padding-right:0">
							<input id="txtDlgDesmSupplierSetupMail" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
						<div class="col-sm-2" >
						</div>																																								
					</div>
					<!-- 
					<div class="form-group row mb-1">
						<div class="col-sm-9 text-left font-weight-bold " style="padding-top:20px">
							<span style="line-height:1.3"><spring:message code='modal.mpr.personal.information'/></span>

						</div>
						<div class="col-sm-3 text-left font-weight-bold " style="padding-top:20px">
							<div class="form-group row mb-1">
								<input id="chkDlgDesmSupplierSetupCheck" type="checkbox" class="form-control form-control-user " >
								<label for="chkDlgDesmSupplierSetupCheck" class="required" style="font-size:12px;margin-top:4px;margin-left:4px"><spring:message code='modal.mpr.confirm'/></label>							
							</div>
							<div class="form-group row mb-1">
								<span id="spanDlgDesmSupplierSetupCheckedBy" style="line-height:1.3;font-size:11px;padding-top:4px"></span>
							</div>
						</div>
					</div>
					 -->
																																															
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmSupplierSetupSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>
				<button id="btnDlgDesmSupplierSetupResetPassword" authType="S" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-user-lock"></i></span>
					<span class="text">Reset Password</span>
				</button>			
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmSupplierSetupPopUp"></div>