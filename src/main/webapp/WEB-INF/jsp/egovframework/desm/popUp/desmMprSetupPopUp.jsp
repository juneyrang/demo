<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMprSetupPopUpJs = "/resources/scripts/popUp/desmMprSetupPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMprSetupPopUp.js"></script> --%>
<script src="<%= desmMprSetupPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMprSetup" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMprSetupTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 80%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMprSetupTitle">MPR Setup & Update</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmMprSetupBody" style="padding: 0.4rem 1rem 1rem 1rem;">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="" style="line-height : 2">Project</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmMprSetupProjectNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
								<!-- 
								<i id="iconDlgDesmMprSetupProjectNoSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
								 -->
							</input>
						</div>	
						<div class="col-sm-2" style="padding-left:0">
							<input id="txtDlgDesmMprSetupProjectName" type="text" class="form-control form-control-user" autocomplete="off" readonly>
						</div>							
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">Supplier</label>
						</div>	
						<div class="col-sm-2" style="padding-right:0.4rem">
							<input id="txtDlgDesmMprSetupSupplier" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>
						<div class="col-sm-2" style="padding-left:0">
							<input id="txtDlgDesmMprSetupSupplierNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">MPR No.</label>
						</div>								
						<div class="col-sm-2 text-right font-weight-bold " >
							<input id="txtDlgDesmMprSetupMprNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																																																																
					</div>	
					<div class="form-group row mb-1" style="margin-top: 2px;">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="required" style="line-height : 2">PO No.</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmMprSetupPoNo" type="text" class="form-control form-control-user required" autocomplete="off" >
								<i id="iconDlgDesmMprSetupPoNoSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>	
						<div class="col-sm-2" style="padding-left:0">
							<input id="txtDlgDesmMprSetupPoName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>		
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">Product Name</label>
						</div>		
						<div class="col-sm-4" >
							<input id="txtDlgDesmMprSetupProductName" type="text" class="form-control form-control-user" autocomplete="off" >
						</div>	
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">Status</label>
						</div>								
						<div class="col-sm-2 text-right font-weight-bold " >
							<input id="txtDlgDesmMprSetupStatus" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																										
					</div>		
					<div class="form-group row mb-1" style="margin-top: 2px;">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="" style="line-height : 2">Submission</label>
						</div>
						<div class="col-sm-3" >
							<div class="form-group row mb-1">
								<input id="txtDlgDesmMprSetupOnceAmonth" name="txtDlgDesmMprSetupMprSubmission" value="1"  type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:10px" checked autocomplete="off">
								<label for="txtDlgDesmMprSetupOnceAmonth" style="line-height : 2;padding-left:4px">Once a month</label>
								<input id="txtDlgDesmMprSetupTwiceAmonth" name="txtDlgDesmMprSetupMprSubmission" value="2" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgDesmMprSetupTwiceAmonth" style="line-height : 2;padding-left:4px">Twice a month</label>											
							</div>	
						</div>																									
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold" style="padding-top:0.15rem; padding-bottom:0.2rem; padding-left:0; padding-right:0;">
							<hr class="m-1"/>
						</div>
					</div>							
					<div class="row sm" style="margin-top: 2px;">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Detail progress</label>
									
									<button id="btnDlgDesmMprSetupDate" authType="S"  class="btn btn-primary btn-icon-split btn-sm" style="float:right;">
										<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
										<span class="text">MPR Period Setup</span>
									</button>
								</div>
								<div class="card-body" style="padding: 6px">
									<div class="form-group row">
										<div class="col-sm-12">
											<!-- <div style="margin-bottom: 1px; padding-right: 2px;" >
												<span ></span>
												<button id="btnDlgDesmMprSetupDate" authType="S"  class="btn btn-primary btn-icon-split btn-sm" style="float:right;">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">MPR Period Setup</span>
												</button>														
											</div>	 -->									
											<div id="gridDlgDesmMprSetupDetailProgress" style="padding-top:3px; width:100%; height:350px;"></div>
										</div>
									</div>
								</div>
							</div>										
						</div>					
					</div>
					<div class="row sm" style="margin-top: 8px;">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div class="card shadow mb-2">
								<div class="card-header py-2" >
									<label class="font-weight-bold text-primary" style="font-size:12px">Add E-mail ( for MPR notice )</label>
									<label class="font-weight-bold text-primary" style="font-size:12px;float: right;">※ You can add/remove below member at anytime.</label>
								</div>
								<div class="card-body" style="padding: 6px">
									<div class="form-group row">
										<div class="col-sm-6" style="padding-right:0">
											<div style="margin-bottom: 1px; padding-right: 1px;">
												<span style="line-height:1.4; padding-left:4px;color:#4e73df">Supplier</span>
												<button id="btnDlgDesmMprSetupSupplierEmailDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
													<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
													<span class="text">Delete</span>
												</button>														
												<button id="btnDlgDesmMprSetupSupplierEmailAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Add</span>
												</button>															
											</div>											
											<div id="gridDlgDesmMprSetupSupplierEmail" style="padding-top:3px; width:100%; height:120px;"></div>	
										</div>
										<div class="col-sm-6">
											<div style="margin-bottom: 1px; padding-right: 1px;" >
												<span style="line-height:1.4; padding-left:4px;color:#4e73df">Doosan</span>
												<button id="btnDlgDesmMprSetupDoosanEmailDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
													<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
													<span class="text">Delete</span>
												</button>														
												<button id="btnDlgDesmMprSetupDoosanEmailAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Add</span>
												</button>															
											</div>										
											<div id="gridDlgDesmMprSetupDoosanEmail" style="padding-top:3px; width:100%; height:120px;"></div>
										</div>										
									</div>
									<!-- 
									<div class="form-group row" style="padding-top:14px">
										<div class="col-sm-12">
											<span style="line-height:1.3"><spring:message code='modal.mpr.personal.information'/></span>
										</div>
									</div>
									<div class="form-group row" style="padding-top:18px">
										<div class="col-sm-12">
											<div class="form-group row mb-1" style="margin-right:2px;float:right">
												<input id="chkDlgDesmMprSetupCheck" type="checkbox" class="form-control form-control-user " style="margin-top:-2px">
												<label for="chkDlgDesmMprSetupCheck" class="" style="font-size:12px;margin-left:4px"><spring:message code='modal.mpr.confirm'/></label>
												<span id="spanDlgDesmMprSetupCheckedBy" style="line-height:1.3;font-size:12px;margin-right:30px;margin-left:30px"></span>	
												<a href="#"><spring:message code='modal.mpr.privacy.policy'/></a>						
											</div>
										</div>										
									</div>
									 -->									
								</div>
							</div>										
						</div>					
					</div>	
					<!-- <div class="row sm" style="margin-top: 8px;">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div class="card shadow mb-2" id="divDlgDesmMprSetupAccordion" role="tablist">
								<div class="card-header py-2" role="tab" >
									<a  role="button" data-toggle="collapse" data-parent="#divDlgDesmMprSetupAccordion" href="#divDlgDesmMprSetupCollapse" aria-expanded="false" style = "float: right;">
										<span class="icon" style="color:#858796"><i id="iDlgDesmMprSetupCollapseIcon" class="fas fa-arrow-alt-circle-down" style="margin-top: 3px;"></i></span>
									</a>									
									<label class="font-weight-bold text-primary" style="font-size:12px;float: right;margin-right: 20px;">
									            ※ This data is managed by Doosan manager. 	
									</label>
								
								</div>
								<div id="divDlgDesmMprSetupCollapse" class="card-body collapse" role="tabpanel" style="padding: 6px">
									<div class="form-group row">
										<div class="col-sm-1 text-right font-weight-bold " >
											<label class="" style="line-height : 2">MPR submission</label>
										</div>	
										<div class="col-sm-11">
											<div class="form-group row mb-1">
												<input id="txtDlgDesmMprSetupOnceAmonth" name="txtDlgDesmMprSetupMprSubmission" value="1"  type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:40px" checked autocomplete="off">
												<label for="txtDlgDesmMprSetupOnceAmonth" style="line-height : 2;padding-left:4px">Once a month</label>
												<input id="txtDlgDesmMprSetupTwiceAmonth" name="txtDlgDesmMprSetupMprSubmission" value="2" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:30px" autocomplete="off">
												<label for="txtDlgDesmMprSetupTwiceAmonth" style="line-height : 2;padding-left:4px">Twice a month</label>											
											</div>
										</div>							
									</div>						
								</div>
							</div>										
						</div>					
					</div> -->																											
				</div>
			</div>

			<div class="modal-footer">				
				<button id="btnDlgDesmMprSetupEdit" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">MPR setup update</span>
				</button>
				<button id="btnDlgDesmMprSetupMailSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>									
				<button id="btnDlgDesmMprSetupSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>
				<button id="btnDlgDesmMprSetupRequest" authType="ReqS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Request</span>
				</button>				
				<button id="btnDlgDesmMprSetupConfirm" authType="ConS" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Confirm</span>
				</button>
				<button id="btnDlgDesmMprSetupReturn" authType="ConS" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Return</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmMprSetupPopUp"></div>