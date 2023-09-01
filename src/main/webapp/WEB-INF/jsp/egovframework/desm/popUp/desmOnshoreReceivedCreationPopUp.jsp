
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmContractCreationPopUpJs = "/resources/scripts/popUp/desmContractCreationPopUp.js?rv=" + rV;
%>

<style>
.rotate svg {
    transform: rotate(-180deg);
    transition: .3s;
}
</style>

<jsp:include page="../language.jsp"></jsp:include>

<%--<script src="/resources/scripts/popUp/desmContractCreationPopUp.js"></script> --%>
<script src="<%= desmContractCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmContractCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmContractCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmContractCreationTitle">Contract Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmContractCreationBody" style="overflow-x:hidden; overflow-y:scroll; height:550px; width:100%">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Contract Main</label>
								</div>
								<div class="card-body main-panel-body" style="padding: 6px">
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Project</label>
										</div>
										<div class="col-sm-2" >
											<div style="display: inline-flex;">
												<input id="txtDlgDesmContractCreationProjectNo" type="text" class="form-control form-control-user required" style="width:40%;" autocomplete="off">
													<i id="iconProjectSearch" class="fas fa-search" style="float : right;margin:2px 0px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
												</input>
												<input id="txtDlgDesmContractCreationProjectName" type="text" class="form-control form-control-user" style="width:60%;margin-left: 2px;" autocomplete="off" readonly/>
											</div>
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Contract Seq.</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractSeq" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Revision</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationRevision" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>		
										<div class="col-sm-1 text-right font-weight-bold">
											<label class="" style="line-height : 2">Category</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationCategory" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Contract No.</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractNo" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Contract Name</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractName" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Contract Date</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationDate" name="inpDatePicker" type="text" class="form-control form-control-user required" autocomplete="off"/>
										</div>		
										<div class="col-sm-1 text-right font-weight-bold">
											<label class="" style="line-height : 2">Term</label>
										</div>
										<div class="col-sm-2" >
											<div style="display: inline-flex;">
												<input id="txtDlgDesmContractTermFromDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>
												<label class="" style="margin: 0 3 0 3;">~</label>
												<input id="txtDlgDesmContractTermToDate" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
											</div>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Contract Amount</label>
										</div>
										<div class="col-sm-2" >
											<div style="display: inline-flex;">
												<input id="txtDlgDesmContractCurrency" type="text" class="form-control form-control-user required" placeholder="CUR" style="width:30%;" maxLength="3" autocomplete="off"/>
												<input id="txtDlgDesmContractAmount" type="text" class="form-control form-control-user required comma" style="width:70%;margin-left: 2px;" autocomplete="off"/>
											</div>
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Contractor</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractor" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Contact point</label>
										</div>	
										<div class="col-sm-5" >
											<div style="display: inline-flex;">
												<input id="txtDlgDesmContractCreationContactName" type="text" class="form-control form-control-user contact-point required" autocomplete="off" placeholder="Name" readonly>
												<input id="txtDlgDesmContractCreationContactTitle" type="text" class="form-control form-control-user contact-point " style="margin-left: 2;" autocomplete="off" placeholder="Title" readonly>
												<input id="txtDlgDesmContractCreationContactE-mail" type="text" class="form-control form-control-user contact-point required" style="margin-left: 2;" autocomplete="off" placeholder="E-mail" readonly>
												<input id="txtDlgDesmContractCreationContactMobile" type="text" class="form-control form-control-user contact-point " style="margin-left: 2;" autocomplete="off" placeholder="Mobile" readonly>
											</div>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Description</label>
										</div>
										<div class="col-sm-8" >
											<input id="txtDlgDesmContractCreationDescription" type="text" class="form-control form-control-user " autocomplete="off" >
										</div>
										<div class="col-sm-1 text-right font-weight-bold">
											<label class="" style="line-height : 2">Closed</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationClosed" type="text" value="CLOSED" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
									</div>
								</div>
							</div>										
						</div>
					</div>
					
					<div class="form-group row mb-1" style= "margin-top:10px ">
						<div class="col-sm-12 accordion" id="infomationPanel" style="padding-right:0; padding-left:0">	
      						<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Infomation</label>
									<!-- <a href="#" title="해당 영역은 보증관련 입력화면이며&#10;PO 계약과 별개로 저장이 가능합니다. " style="cursor: default;"> -->
									<a href="#" style="cursor: default;">
										<i id="iconDlgInfoInfomationPanel" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
									</a>
									
      								<div class="click" style="float:right;">
      									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
										</svg>
									</div>
								</div>
						        <div id="infomationBody" style="display:none">
							        <div class="card-body" style="padding-top:10px">
										<div class="col-sm-12 text-right font-weight-bold" style="padding-right:0; padding-left:0">	
											<button id="btnDlgDesmContractInfomationAdd" authType="SubS" class="btn btn-primary btn-icon-split btn-sm" style="height:21px">
												<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-pencil-alt"></i></span>
												<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.add" /></span>
											</button>	
											<button id="btnDlgDesmContractInfomationDel" authType="SubS" class="btn btn-danger btn-icon-split btn-sm" style="height:21px">
												<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-trash"></i></span>
												<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.del" /></span>
											</button>					
											<button id="btnDlgDesmContractInfomationSave" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height:21px">
												<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-save"></i></span>
												<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.save" /></span>
											</button>
										</div>
										
										<div id="dlgDesmContractInfomationGrid" style="padding-top:1px; height:70px;"></div>
							        </div>
						        </div>
							</div>
						</div>
					</div>
					<div class="form-group row mb-1" style= "margin-top:10px ">
						<!-- <div class="col-sm-12 accordion" id="remarkPanel" style="padding-right:0; padding-left:0"> -->
						<div class="col-sm-12 accordion" id="remarkPanel" style="padding:0">
							<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Remark</label>
      								<div class="click" style="float:right;">
      									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
											<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
										</svg>
									</div>
								</div>
						        <div id="remarkBody" style="display:none">
									<div class="card-body main-panel-body" style="padding: 6px">
										<div id="divDlgDesmContractCreationPhotoAttArea" class="form-group row mb-1">
											<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
												<label class="" style="line-height : 2">File</label>
											</div>
											<div class="col-sm-11" >
												<div class="form-group row mb-1">
													<div class="col-sm-12">
														<input id="txtDlgDesmContractCreationAttListFile" type="file" name="txtDlgDesmContractCreationAttListFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />	
													</div>
												</div>
											</div>
										</div>
										<div class="form-group row mb-1" style= "margin-top:10px ">
											<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
												<label class="" style="line-height : 2">Remark</label>
											</div>
											<div class="col-sm-11" >
												<textarea id="txtDlgDesmContractCreationRemark" class="form-control form-control-user " style="font-size:11px" cols="80" rows="3"></textarea>
											</div>
										</div>
									</div>
							    </div>
							</div>										
						</div>
					</div>
					
					<div class="form-group row mb-1" style= "margin-top:10px ">
						<div class="col-sm-12 accordion" style="padding-right:0; padding-left:0">	
      						<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Contract Line</label>
								</div>
						        <div class="card-body main-panel-body" style="padding: 6px">
									<div class="col-sm-12 text-right font-weight-bold" style="padding-right:0; padding-left:0">	
										<button id="btnDlgDesmContractCreationAdd" authType="SubS" class="btn btn-primary btn-icon-split btn-sm" style="height:21px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-pencil-alt"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.add" /></span>
										</button>	
										<button id="btnDlgDesmContractCreationDel" authType="SubS" class="btn btn-danger btn-icon-split btn-sm" style="height:21px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-trash"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.del" /></span>
										</button>	
										<button id="btnDlgDesmContractCreationExcelUpload" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height:21px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-file-excel"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem">Excel Upload</span>
										</button>								
									</div>
								
									<div id="dlgDesmContractGrid" style="padding-top:1px; width:100%; height:200px;"></div>
						        </div>
							</div>
						</div>
					</div>
										
					<div class="form-group row mb-1" style="padding-top:10px;">
						<div class="col-sm-1 text-right font-weight-bold " >
							<label style="line-height : 2">Requested by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmContractCreationRequestBy" type="text" value="<%=session.getAttribute("TRANS_USR_ID")%>" class="form-control form-control-user" autocomplete="off" >
							<input id="txtDlgDesmContractCreationRequestByAd" type="hidden" >
							<input id="txtDlgDesmContractCreationTransUserId" type="hidden" value="<%=session.getAttribute("TRANS_USR_ID")%>" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmContractCreationRequestedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " >
							<label style="line-height : 2">Approved by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmContractCreationApproveBy" type="text" class="form-control form-control-user" autocomplete="off" >
							<input id="txtDlgDesmContractCreationApproveByAd" type="hidden" class="form-control form-control-user" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmContractCreationApprovedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>
						
						<div class="col-sm-6 text-right font-weight-bold ">	
							<button id="btnDlgDesmContractCreationSave" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-save"></i></span>
								<span class="text"><spring:message code="button.save" /></span>
							</button>
							<button id="btnDlgDesmContractCreationRevision" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.revision" /></span>
							</button>	
							<button id="btnDlgDesmContractCreationRequest" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.request" /></span>
							</button>	
							<button id="btnDlgDesmContractCreationApprove" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.approve" /></span>
							</button>	
							<button id="btnDlgDesmContractCreationReject" authType="SubS" class="btn btn-danger btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.reject" /></span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmContractCreationPopUp"></div>

<input id="alertContractLineValidate"				type="hidden" value="<spring:message code='alert.contract.line.validate'		/>"/>