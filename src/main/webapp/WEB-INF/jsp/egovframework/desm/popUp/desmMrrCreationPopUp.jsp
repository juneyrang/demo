
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMrrCreationPopUpJs = "/resources/scripts/popUp/desmMrrCreationPopUp.js?rv=" + rV;
%>

<jsp:include page="../language.jsp"></jsp:include>

<%--<script src="/resources/scripts/popUp/desmMrrCreationPopUp.js"></script> --%>
<script src="<%= desmMrrCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMrrCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMrrCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMrrCreationTitle">MRR Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmMrrCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="table-responsive" style="vertical-align: middle; ">
							<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
								<tr>
									<td width="100%">
										<table border="0" style="height: 28px;" id="tblDlgDesmLocationSearchBox">
											<col style="width: 5%;">
										    <col style="width: 10%;">
										    <col style="width: 10%;">
										    <col style="width: 10%;">
										    <col style="width: 10%;">
										    <col style="width: 10%;">
										    <col style="width: 2%;">
										    <col style="width: 10%;">
										    <col style="width: 10%;">
										    <col style="width: 10%;">
										    <col style="width: 2%;">
										    <col style="width: 10%;">
										  <%-- <colgroup>
										    <col style="width: 5%;" />
										    <col style="width: 10%;" />
										    
										    <col style="width: 5%;" />
										    <col style="width: 10%;" />
										    
										    <col style="width: 8%;" />
										    
										    <col style="width: 7%;" />
										    <col style="width: 1%;" />
										    <col style="width: 7%;" />
										    
										    <col style="width: 8%;" />
										    
										    <col style="width: 7%;" />
										    <col style="width: 1%;" />
										    <col style="width: 7%;" />
										    
										     <col style="width: 5%;" />
										    
										    <col style="width: 14%;" />								    							  								    								    
										  </colgroup> --%>
											<tr>
												<td style="text-align: right;padding-right:10px">
													<label style="">MRR No.</label>
												</td>
												<td >
													<input id="txtDlgDesmMrrCreationMrrNo" type="text" class="form-control form-control-user" autocomplete="off" readonly/>
												</td>
												
												<td style="text-align: right;padding-right:10px">
													<label class="required" style="">MRR Name</label>												
												</td>
												<td>
													<input id="txtDlgDesmMrrCreationMrrName" type="text" class="form-control form-control-user required" autocomplete="off" >							
												</td>
												
												<td style="text-align: right;padding-right:10px">
													<label class="required" style="">Received Date</label>
												</td>
												<td>
													<input id="txtDlgDesmMrrReceivedFromDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>										
												</td>
												<td style="text-align: center">
													<label class="" style="">~</label>
												</td>
												<td >										
													<input id="txtDlgDesmMrrReceivedToDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
												</td>	
												
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">Inspection Date</label>
												</td>
												<td>
													<input id="txtDlgDesmMrrInspectionFromDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>										
												</td>
												<td style="text-align: center">
													<label class="" style="">~</label>
												</td>
												<td >										
													<input id="txtDlgDesmMrrInspectionToDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
												</td>
												<td style="width: 10px;">										
												</td>	
												
												<td>										
													<button id="btnDlgDesmMrrCreationAtt" authType="R" class="btn btn-primary btn-icon-split btn-sm" style="height:21px;width:97px;float:right">
														<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-file-upload"></i></span>
														<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.file" /></span>
													</button>	
												</td>	
												
																																
											</tr>
											
											<td style="height: 3px;">										
											</td>
											<tr>
												<td style="text-align: right;padding-right:10px">
													<label style="">Remarks</label>
												</td>
												
												<td colspan="11">
													<textarea id="txtDlgDesmMrrCreationRemark" class="form-control form-control-user " style="font-size:11px"  cols="80" rows="4"></textarea>
												</td>
												<!-- <td style="width: 10px;">										
												</td>
												<td style="width: 10px;">										
												</td>
												<td style="width: 10px;">										
												</td>
												<td style="width: 10px;">										
												</td>
												<td style="width: 10px;">										
												</td>
												<td style="width: 10px;">										
												</td> -->
												
												
										</tr>
											
											
											
											
	
										</table>
									</td>
									
								</tr>
								
								
								
								
								
							</table>
								
						</div>	
					</div>	
							
					
					
					
						
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold" style="padding-top:0.15rem; padding-bottom:0.15rem; padding-left:0; padding-right:0;">
							<hr class="m-1"/>
						</div>
					</div>				
					
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold ">
						
							<button id="btnLocationSetup" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">Location Update</span>
							</button>
							
							<button id="btnReceivedDateSetup" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">Received Date Update</span>
							</button>
							
							<button id="btnVisualCheckSetup" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">Visual Check Update</span>
							</button>
							
							
							<!-- <button id="btnLocationDelete" authType="SubS" class="btn btn-danger btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
								<span class="text">Location Delete</span>
							</button>
							 -->
							
							<button id="btnDlgDesmMrrCreationAdd" authType="SubS" class="btn btn-primary btn-icon-split btn-sm" style="height:21px">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-pencil-alt"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.add" /></span>
							</button>	
							<button id="btnDlgDesmMrrCreationDel" authType="SubS" class="btn btn btn-danger btn-icon-split btn-sm" style="height:21px">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-trash"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.del" /></span>
							</button>								
						</div>					
						<div class="col-sm-12 text-right font-weight-bold ">
							<div id="dlgDesmMrrCreationPlGrid" style="padding-top:1px; width:100%; height:510px;"></div>
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
							<label class="required" style="line-height : 2">Prepared by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMrrCreationPreparedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMrrCreationPreparedByAd" type="hidden" class="form-control form-control-user required" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMrrCreationPreparedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<!-- <div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Checked by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMrrCreationCheckedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMrrCreationCheckedByAd" type="hidden" class="form-control form-control-user required" >						
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMrrCreationCheckedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>	 -->
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Confirmed by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMrrCreationConfirmedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMrrCreationConfirmedByAd" type="hidden" class="form-control form-control-user required" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMrrCreationConfirmedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>							
						<!--<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Approved by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMrrCreationApprovedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMrrCreationApprovedByAd" type="hidden" class="form-control form-control-user required" >							
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMrrCreationApprovedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>		 -->																																			
					</div>
					<!-- <div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Prepared Manager</label>
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
					</div> -->																																	
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmMrrCreationReport" authType="R" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file"></i></span>
					<span class="text">Report</span>
				</button>				
				<button id="btnDlgDesmMrrCreationSave" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.save" /></span>
				</button>	
				<button id="btnDlgDesmMrrCreationDelete" authType="SubS" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text"><spring:message code="button.desm.del" /></span>
				</button>						
				<button id="btnDlgDesmMrrCreationRequest" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.request" /></span>
				</button>				
				<button id="btnDlgDesmMrrCreationCheck" authType="CheckS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Check</span>
				</button>
				<button id="btnDlgDesmMrrCreationConfirm" authType="ConS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>					
					<span class="text">Confirm</span>
				</button>							
				<!-- <button id="btnDlgDesmMrrCreationApprove" authType="AppS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Approve</span>
				</button> -->
				<button id="btnDlgDesmMrrCreationRejectCheck" authType="CheckS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>
				
				
				<button id="btnDlgDesmMrrCreationRejectConfirm" authType="ConS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>			
				<!-- <button id="btnDlgDesmMrrCreationRejectApprove" authType="AppS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>	
				 -->											
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmMrrCreationPopUp"></div>