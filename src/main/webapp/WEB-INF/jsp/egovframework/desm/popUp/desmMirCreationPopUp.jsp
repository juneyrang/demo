
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMirCreationPopUpJs = "/resources/scripts/popUp/desmMirCreationPopUp.js?rv=" + rV;
%>

<jsp:include page="../language.jsp"></jsp:include>

<%--<script src="/resources/scripts/popUp/desmMirCreationPopUp.js"></script> --%>
<script src="<%= desmMirCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMirCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMirCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMirCreationTitle">MIR Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmMirCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="table-responsive" style="vertical-align: middle; ">
							<table border="0" width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
								<tr>
									<td width="100%">
										<table border="0" style="height: 106px;" id="tblDlgDesmMirCreationSearchBox">
											<colgroup>
											  	<col style="width: 8%;">
											    <col style="width: 16%;">
											    <col style="width: 8%;">
											    <col style="width: 16%;">
											    <col style="width: 8%;">
											    <col style="width: 16%;">
											    <col style="width: 8%;">
											    <col style="width: 16%;">
											    <%-- <col style="width: 5%;" />
											    <col style="width: 10%;" />
											    
											    <col style="width: 8%;" />
											    <col style="width: 10%;" />
											    
											    <col style="width: 8%;" />
											    
											    <col style="width: 7%;" />
											    <col style="width: 1%;" />
											    <col style="width: 7%;" />
											    
											    <col style="width: 8%;" />
											    <col style="width: 7%;" />
											    <col style="width: 1%;" />
											    <col style="width: 7%;" />
											    
											     <col style="width: 2%;" />
											    
											    <col style="width: 14%;" /> --%>								    							  								    								    
											</colgroup>
											<tr>
												<td style="text-align: right;padding-right:10px">
													<label style="">MIR No.</label>
												</td>
												<td >
													<input id="txtDlgDesmMirCreationMirNo" type="text" class="form-control form-control-user" autocomplete="off" readonly/>
												</td>
												
												<td style="text-align: right;padding-right:10px">
													<label class="required" style="">MIR Name</label>												
												</td>
												<td>
													<input id="txtDlgDesmMirCreationMirName" type="text" class="form-control form-control-user required" autocomplete="off" >							
												</td>
												
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">OSDM Name</label>												
												</td>
												<td>
													<input id="txtDlgDesmMirCreationOdsmName" type="text" class="form-control form-control-user" autocomplete="off" >							
												</td>
												
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">Category</label>
												</td>
												<td>
													<select id="selMirCategory" class="form-control form-control-user" style="background-color: #B4D9FD;">
														<option value="Electrical">Electrical</option>
														<option value="Mechanical">Mechanical</option>
														<option value="I&C">I&C</option>
														<option value="Civil">Civil</option>
														<option value="Etc">Etc</option>
													</select>
												</td>
												
												<td style="width: 10px;"></td>
												
												<td>										
													<button id="btnDlgDesmMirCreationAtt" authType="R" class="btn btn-primary btn-icon-split btn-sm" style="height:21px;width:97px;float:right">
														<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-file-upload"></i></span>
														<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.file" /></span>
													</button>	
												</td>																			
											</tr>
											
											<tr>
												<td style="text-align: right;padding-right:10px">
													<label class="required" style="">Received Date</label>
												</td>
												<td>
													<div style="display: inline-flex;">
														<input id="txtDlgDesmMirReceivedFromDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>
														<label class="" style="margin: 0 3 0 3;">~</label>
														<input id="txtDlgDesmMirReceivedToDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
													</div>										
												</td>
												
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">Inspection Date</label>
												</td>
												<td>
													<div style="display: inline-flex;">
														<input id="txtDlgDesmMirInspectionFromDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>
														<label class="" style="margin: 0 3 0 3;">~</label>
														<input id="txtDlgDesmMirInspectionToDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
													</div>										
												</td>
												<!--
												<td style="text-align: right;padding-right:10px">
													<label class="required" style="">Received Date</label>
												</td>
												<td>
													<input id="txtDlgDesmMirReceivedFromDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>										
												</td>
												<td style="text-align: center">
													<label class="" style="">~</label>
												</td>
												<td >										
													<input id="txtDlgDesmMirReceivedToDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
												</td>	
												
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">Inspection Date</label>
												</td>
												<td>
													<input id="txtDlgDesmMirInspectionFromDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>										
												</td>
												<td style="text-align: center">
													<label class="" style="">~</label>
												</td>
												<td >										
													<input id="txtDlgDesmMirInspectionToDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
												</td> 
												 -->
												
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">Inspection Location</label>
												</td>
												<td >										
													<input id="txtDlgDesmMirInspectionLocation" type="text" class="form-control form-control-user" autocomplete="off" >
												</td>
												<td style="text-align: right;padding-right:10px">
													<label class="" style="">Result of Inspection</label>
												</td>
												<td>
													<select id="selResultOfInspection" class="form-control form-control-user" style="background-color: #B4D9FD;">
														<option value="Accepted">Accepted</option>
														<option value="Accepted with Comments">Accepted with Comments</option>
														<option value="Rejected">Rejected</option>
													</select>
												</td>
											</tr>
											
											<tr>
												<td style="text-align: right;padding-right:10px">
													<label style="">Remarks</label>
												</td>
												<td colspan="3">
													<textarea id="txtDlgDesmMirCreationRemark" class="form-control form-control-user " style="font-size:11px" cols="80" rows="3"></textarea>
												</td>
												<td style="text-align: right;padding-right:10px">
													<label style="">Client Comments</label>
												</td>
												<td colspan="3">
													<textarea id="txtDlgDesmMirCreationClientComments" class="form-control form-control-user " style="font-size:11px" cols="80" rows="3"></textarea>
												</td>
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
							<button id="btnInspectionResult" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">Inspection Result</span>
							</button>
							
							<button id="btnQtyFixYN" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">Required Change Q'ty</span>
							</button>
							
							<button id="btnPoNo" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height: 21px;">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">PO No</span>
							</button>
							
							<button id="btnDlgDesmMirCreationAdd" authType="SubS" class="btn btn-primary btn-icon-split btn-sm" style="height:21px">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-pencil-alt"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.add" /></span>
							</button>	
							<button id="btnDlgDesmMirCreationDel" authType="SubS" class="btn btn btn-danger btn-icon-split btn-sm" style="height:21px">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-trash"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.del" /></span>
							</button>								
						</div>					
						<div class="col-sm-12 text-right font-weight-bold ">
							<div id="dlgDesmMirCreationPlGrid" style="padding-top:1px; width:100%; height:510px;"></div>
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
							<input id="txtDlgDesmMirCreationPreparedBy" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMirCreationPreparedByAd" type="hidden" class="form-control form-control-user required" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMirCreationPreparedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Checked by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMirCreationCheckedBy1" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMirCreationCheckedByAd1" type="hidden" class="form-control form-control-user required" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMirCreationCheckedDate1" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Checked by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMirCreationCheckedBy2" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMirCreationCheckedByAd2" type="hidden" class="form-control form-control-user required" >						
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMirCreationCheckedDate2" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Checked by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmMirCreationCheckedBy3" type="text" class="form-control form-control-user required" autocomplete="off" >
							<input id="txtDlgDesmMirCreationCheckedByAd3" type="hidden" class="form-control form-control-user required" >						
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmMirCreationCheckedDate3" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2"></label>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Material Dept.</label>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">Construction Dept.</label>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>
						<div class="col-sm-2 text-left font-weight-bold " >
							<label class="" style="line-height : 2">QA/QC Dept.</label>
						</div>																		
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmMirCreationReport" authType="R" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file"></i></span>
					<span class="text">MIR Report</span>
				</button>
				<button id="btnDlgDesmMirCreationReportOsdm" authType="R" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file"></i></span>
					<span class="text">OSDM Report</span>
				</button>
				<button id="btnDlgDesmMirCreationSave" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.save" /></span>
				</button>	
				<button id="btnDlgDesmMirCreationDelete" authType="SubS" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text"><spring:message code="button.desm.del" /></span>
				</button>						
				<button id="btnDlgDesmMirCreationRequest" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.request" /></span>
				</button>				
				<button id="btnDlgDesmMirCreationCheck" authType="CheckS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Check</span>
				</button>
				<!-- <button id="btnDlgDesmMirCreationConfirm" authType="ConS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>					
					<span class="text">Confirm</span>
				</button>							
				<button id="btnDlgDesmMirCreationApprove" authType="AppS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Approve</span>
				</button> -->
				<button id="btnDlgDesmMirCreationReject" authType="CheckS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>
				<%-- <button id="btnDlgDesmMirCreationRejectCheck" authType="CheckS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>
				<button id="btnDlgDesmMirCreationRejectConfirm" authType="ConS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button>
				<button id="btnDlgDesmMirCreationRejectApprove" authType="AppS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text"><spring:message code="button.desm.reject" /></span>
				</button> --%>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmMirCreationPopUp"></div>