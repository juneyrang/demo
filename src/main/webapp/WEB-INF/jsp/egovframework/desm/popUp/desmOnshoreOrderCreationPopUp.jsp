
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmOnshoreOrderCreationPopUpJs = "/resources/scripts/popUp/desmOnshoreOrderCreationPopUp.js?rv=" + rV;
%>

<style>
.rotate svg {
    transform: rotate(-180deg);
    transition: .3s;
}
</style>

<jsp:include page="../language.jsp"></jsp:include>

<%--<script src="/resources/scripts/popUp/desmOnshoreOrderCreationPopUp.js"></script> --%>
<script src="<%= desmOnshoreOrderCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmOnshoreOrderCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmOnshoreOrderCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmOnshoreOrderCreationTitle">Order Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmOnshoreOrderCreationBody" style="overflow-x:hidden; overflow-y:scroll; height:590px; width:100%">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Contract Detail</label>
								</div>
								<div class="card-body main-panel-body" style="padding: 6px">
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Project</label>
										</div>
										<div class="col-sm-2" >
											<div style="display: inline-flex;">
												<input id="txtDlgDesmContractCreationProjectNo" type="text" class="form-control form-control-user required" style="width:40%;" autocomplete="off" readonly>
												<input id="txtDlgDesmContractCreationProjectName" type="text" class="form-control form-control-user" style="width:60%;margin-left: 2px;" autocomplete="off" readonly/>
											</div>
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Contract Seq.</label>
										</div>	
										<div class="col-sm-2" >
											<div style="width:100%;display: inline-flex;">
												<input id="txtDlgDesmContractCreationContractSeq" type="text" class="form-control form-control-user " autocomplete="off" readonly>
													<i id="iconContractSearch" class="fas fa-search" style="float : right;margin:2px 0px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
												</input>
											</div>
											<!-- 
											<div style="display: inline-flex;">
												<input id="txtDlgDesmContractCreationContractSeq" type="text" class="form-control form-control-user required" style="width:100%;" autocomplete="off">
													<i id="iconContractSearch" class="fas fa-search" style="float : right;margin:2px 0px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
												</input>
											</div>
											 -->
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
											<input id="txtDlgDesmContractCreationCategory" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Contract No.</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractNo" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Contract Name</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Contract Date</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationDate" type="text" class="form-control form-control-user required" autocomplete="off" readonly/>
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Contractor</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmContractCreationContractor" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Description</label>
										</div>
										<div class="col-sm-11" >
											<input id="txtDlgDesmContractCreationDescription" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
									</div>
								</div>
							</div>										
						</div>
					</div>
					
					<div class="form-group row mb-1" style= "margin-top:10px ">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Order Header</label>
								</div>
								<div class="card-body main-panel-body" style="padding: 6px">
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Order Seq.</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDesmOnshoreOrderCreationOrderSeq" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">Order Name</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmOnshoreOrderCreationOrderName" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Order Date</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmOnshoreOrderCreationOrderDate" name="inpDatePicker" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>	
										<div class="col-sm-1 text-right font-weight-bold">
											<label class="" style="line-height : 2">Plan Date</label>
										</div>
										<div class="col-sm-2" >
											<div style="display: inline-flex;">
												<input id="txtDlgDesmOnshoreOrderPlanDateFrom" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>
												<label class="" style="margin: 0 3 0 3;">~</label>
												<input id="txtDlgDesmOnshoreOrderPlanDateTo" name="inpDatePicker" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
											</div>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Description</label>
										</div>
										<div class="col-sm-8" >
											<input id="txtDlgDesmOnshoreOrderCreationDescription" type="text" class="form-control form-control-user " autocomplete="off" >
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Invoice No</label>
										</div>	
										<div class="col-sm-2" >
											<input id="txtDlgDesmOnshoreOrderCreationInvoiceNo" type="text" class="form-control form-control-user " autocomplete="off"/>
										</div>	
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold " style="max-width:110px">
											<label class="" style="line-height : 2">Remarks</label>
										</div>
										<div class="col-sm-8" >
											<input id="txtDlgDesmOnshoreOrderCreationRemarks" type="text" class="form-control form-control-user " autocomplete="off" >
										</div>
										<div class="col-sm-1 text-right font-weight-bold" >
											<label class="" style="line-height : 2">Order Status</label>
										</div>	
										<div class="col-sm-2" >
											<select id="txtDlgDesmOnshoreOrderCreationOrderStatus" class="form-control form-control-user" style="background-color: #B4D9FD;">
												<option value="Ordered">Ordered</option>
												<option value="Partially Delivered">Partially Delivered</option>
												<option value="Delivered">Delivered</option>
											</select>
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
									<label class="font-weight-bold text-primary" style="font-size:12px">Order List​</label>
								</div>
						        <div class="card-body main-panel-body" style="padding: 6px">
									<div class="col-sm-12 text-right font-weight-bold" style="padding-right:0; padding-left:0">	
										<button id="btnDlgDesmOnshoreOrderCreationAdd" authType="SubS" class="btn btn-primary btn-icon-split btn-sm" style="height:21px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-pencil-alt"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.add" /></span>
										</button>	
										<button id="btnDlgDesmOnshoreOrderCreationDel" authType="SubS" class="btn btn-danger btn-icon-split btn-sm" style="height:21px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-trash"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.del" /></span>
										</button>	
										<button id="btnDlgDesmOnshoreOrderCreationExcelUpload" authType="SubS" class="btn btn-success btn-icon-split btn-sm" style="height:21px">
											<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-file-excel"></i></span>
											<span class="text" style="padding:0.15rem 0.3rem">Excel Upload</span>
										</button>								
									</div>
								
									<div id="dlgDesmOnshoreOrderGrid" style="padding-top:1px; width:100%; height:200px;"></div>
						        </div>
							</div>
						</div>
					</div>
										
					<div class="form-group row mb-1" style="padding-top:10px;">
						<%-- <div class="col-sm-1 text-right font-weight-bold " >
							<label style="line-height : 2">Requested by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmOnshoreOrderCreationRequestBy" type="text" value="<%=session.getAttribute("TRANS_USR_ID")%>" class="form-control form-control-user" autocomplete="off" >
							<input id="txtDlgDesmOnshoreOrderCreationRequestByAd" type="hidden" >
							<input id="txtDlgDesmOnshoreOrderCreationTransUserId" type="hidden" value="<%=session.getAttribute("TRANS_USR_ID")%>" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmOnshoreOrderCreationRequestedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>								
						<div class="col-sm-1 text-right font-weight-bold " >
							<label style="line-height : 2">Approved by</label>
						</div>
						<div class="col-sm-1" style="padding-right:0">
							<input id="txtDlgDesmOnshoreOrderCreationApproveBy" type="text" class="form-control form-control-user" autocomplete="off" >
							<input id="txtDlgDesmOnshoreOrderCreationApproveByAd" type="hidden" class="form-control form-control-user" >
						</div>	
						<div class="col-sm-1" style="padding-left:0.2rem">
							<input id="txtDlgDesmOnshoreOrderCreationApprovedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div> --%>
						
						<div class="col-sm-12 text-right font-weight-bold ">	
							<button id="btnDlgDesmOnshoreOrderCreationFile" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.file" /></span>
							</button>
							<button id="btnDlgDesmOnshoreOrderCreationSave" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-save"></i></span>
								<span class="text"><spring:message code="button.save" /></span>
							</button>	
							<button id="btnDlgDesmOnshoreOrderCreationDel" authType="SubS" class="btn btn-danger btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
								<span class="text"><spring:message code="button.desm.del" /></span>
							</button>
							<%-- <button id="btnDlgDesmOnshoreOrderCreationRequest" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.request" /></span>
							</button>	
							<button id="btnDlgDesmOnshoreOrderCreationApprove" authType="SubS" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.approve" /></span>
							</button>	
							<button id="btnDlgDesmOnshoreOrderCreationReject" authType="SubS" class="btn btn-danger btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.reject" /></span>
							</button>	
							<button id="btnDlgDesmOnshoreOrderCreationConfirm" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-check"></i></span>
								<span class="text"><spring:message code="button.desm.confirm" /></span>
							</button> --%>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmOnshoreOrderCreationPopUp"></div>

<input id="alertOnshoreOrderLineValidate"				type="hidden" value="<spring:message code='alert.contract.line.validate'		/>"/>