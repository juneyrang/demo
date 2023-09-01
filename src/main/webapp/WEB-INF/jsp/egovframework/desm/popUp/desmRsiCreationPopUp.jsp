
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmRsiCreationPopUpJs = "/resources/scripts/popUp/desmRsiCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmRsiCreationPopUp.js"></script> --%>
<script src="<%= desmRsiCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmRsiCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmRsiCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmRsiCreationTitle">RSI Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmRsiCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:6%">
							<label class="" style="line-height : 2">RSI No.</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmRsiCreationRsiNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>	
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:6%">
							<label class="required" style="line-height : 2">RSI Name</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmRsiCreationRsiName" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:6%">
							<label class="" style="line-height : 2" name="inpDatePicker">Request Date</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmRsiCreationReqDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
						</div>	
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:6%">
							<label class="required" style="line-height : 2">Description</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgDesmRsiCreationDesc" type="text" class="form-control form-control-user required" autocomplete="off">
						</div>
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:6%">
							<label class="" style="line-height : 2">Subcontractor</label>
						</div>
						<div class="" style="max-width:*">
							<div class="container-fluid" style="padding: 0px;">
								<div class="form-group row mb-1" >
									<div class="col-sm-8 text-right font-weight-bold ">
										<input id="txtDlgDesmRsiCreationSubContractor" type="text" class="form-control form-control-user " autocomplete="off" readonly>
									</div>
									<div class="col-sm-4 text-right font-weight-bold " style="padding-right:0.5rem">
										<button id="btnDlgDesmRsiCreationAtt" authType="R" class="btn btn-primary btn-icon-split btn-sm" style="height:21px;width:97px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-file-upload"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.file" /></span>
										</button>										
									</div>									
								</div>
							</div>
						</div>																																										
					</div>		
					<div class="form-group row mb-1" style="margin-top:2px">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:6%">
							<label class="" style="line-height : 2">Remarks</label>
						</div>
						<div class="col-sm-11" style="padding-right:0.4rem;padding-left:0.4rem;flex:0 0 93.2%; max-width: 93.2%">
							<textarea id="txtDlgDesmRsiCreationRemark" class="form-control form-control-user " style="font-size:11px"  cols="80" rows="4"></textarea>
						</div>						
					</div>			
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold" style="padding-top:0.15rem; padding-bottom:0.15rem; padding-left:0; padding-right:0;">
							<hr class="m-1"/>
						</div>
					</div>				
					
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold ">
							<button id="btnDlgDesmRsiCreationAdd" authType="SubS" class="btn btn-primary btn-icon-split btn-sm" style="height:21px">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-pencil-alt"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.add" /></span>
							</button>	
							<button id="btnDlgDesmRsiCreationDel" authType="SubS" class="btn btn btn-danger btn-icon-split btn-sm" style="height:21px">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-trash"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.del" /></span>
							</button>								
						</div>					
						<div class="col-sm-12 text-right font-weight-bold ">
							<div id="dlgDesmRsiCreationPlGrid" style="padding-top:1px; width:100%; height:510px;"></div>
						</div>																			
					</div>
					<div class="form-group row mb-1">
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold" style="padding-top:0.15rem; padding-bottom:0.2rem; padding-left:0; padding-right:0;">
							<hr class="m-1"/>
						</div>
					</div>						
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Requested by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmRsiCreationRequestedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmRsiCreationRequestedByAd" type="hidden" class="form-control form-control-user required" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmRsiCreationRequestDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Checked by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmRsiCreationCheckedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmRsiCreationCheckedByAd" type="hidden" class="form-control form-control-user required" >						
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmRsiCreationCheckedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>	
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Confirmed by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmRsiCreationConfirmedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmRsiCreationConfirmedByAd" type="hidden" class="form-control form-control-user required" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmRsiCreationConfirmedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>							
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Approved by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmRsiCreationApprovedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmRsiCreationApprovedByAd" type="hidden" class="form-control form-control-user required" >							
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmRsiCreationApprovedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																																					
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Sub-Contractor</label>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Construction Manager (Doosan)</label>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Material Controller (Doosan)</label>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Project Controll G.Manager (Doosan)</label>
						</div>																		
					</div>																																	
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmRsiCreationReport" authType="R" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file"></i></span>
					<span class="text">Report</span>
				</button>				
				<button id="btnDlgDesmRsiCreationSave" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.save" /></span>
				</button>	
				<button id="btnDlgDesmRsiCreationDelete" authType="SubS" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text"><spring:message code="button.desm.del" /></span>
				</button>						
				<button id="btnDlgDesmRsiCreationRequest" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.request" /></span>
				</button>				
				<button id="btnDlgDesmRsiCreationCheck" authType="CheckS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Check</span>
				</button>			
				<button id="btnDlgDesmRsiCreationConfirm" authType="ConS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>					
					<span class="text">Confirm</span>
				</button>							
				<button id="btnDlgDesmRsiCreationApprove" authType="AppS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Approve</span>
				</button>
				<button id="btnDlgDesmRsiCreationRejectCheck" authType="CheckS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>
				<button id="btnDlgDesmRsiCreationRejectConfirm" authType="ConS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>			
				<button id="btnDlgDesmRsiCreationRejectApprove" authType="AppS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>												
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmRsiCreationPopUp"></div>