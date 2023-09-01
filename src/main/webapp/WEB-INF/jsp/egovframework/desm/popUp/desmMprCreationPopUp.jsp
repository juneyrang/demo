<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMprCreationPopUpJs = "/resources/scripts/popUp/desmMprCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMprCreationPopUp.js"></script> --%>
<script src="<%= desmMprCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMprCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMprCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 85%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMprCreationTitle">MPR</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmMprCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="" style="line-height : 2">Project</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmMprCreationProjectNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>	
						<div class="col-sm-2" style="padding-left:0">
							<input id="txtDlgDesmMprCreationProjectName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>							
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">Product Name</label>
						</div>	
						<div class="col-sm-4" >
							<input id="txtDlgDesmMprCreationProductName" type="text" class="form-control form-control-user " autocomplete="off">
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">Supplier</label>
						</div>	
						<div class="col-sm-2" >
							<input id="txtDlgDesmMprCreationSupplier" type="text" class="form-control form-control-user " autocomplete="off" readonly>
							<input id="txtDlgDesmMprCreationSupplierNo" type="hidden" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																																																																		
					</div>	
					<div class="form-group row mb-1" style="margin-top: 2px;">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="required" style="line-height : 2">PO No.</label>
						</div>
						<div class="col-sm-1" >
							<input id="txtDlgDesmMprCreationPoNo" type="text" class="form-control form-control-user required" autocomplete="off" >
								<i id="iconDlgDesmMprCreationPoNoSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>	
						<div class="col-sm-2" style="padding-left:0">
							<input id="txtDlgDesmMprCreationPoName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>		
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">PO Promised Date</label>
						</div>	
						<div class="col-sm-1" style="padding-right:0; padding-left:12px">
							<input id="txtDlgDesmMprCreationPoPromisedDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>	
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">MPR Date</label>
						</div>	
						<div class="col-sm-2" style="padding-right:12px; padding-left:0">	
							<div class="form-group row mb-1">
								<input id="txtDlgDesmMprCreationMPRDate" type="text" class="form-control form-control-user required" style="width:131px;height:21px;margin-left:20px" autocomplete="off">
								<select id="selDlgDesmMprCreationRound" class="form-control form-control-user" style="width:70px;height:25px;margin-left:10px;background-color: #B4D9FD;">
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div>
							<!-- <div class="form-group row mb-1">
								<input id="txtDlgDesmMprCreationMPRDate" type="text" class="form-control form-control-user required" autocomplete="off">
								<select id="selDlgDesmMprCreationRound" class="form-control form-control-user" style="background-color: #B4D9FD;">
									<option value="1">1</option>
									<option value="2">2</option>
								</select>
							</div> -->
						</div>	
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">MPR Status</label>
						</div>	
						<div class="col-sm-2" >
							<input id="txtDlgDesmMprCreationMprStatus" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																									
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold" style="padding-top:0.15rem; padding-bottom:0.2rem; padding-left:0; padding-right:0;">
							<hr class="m-1"/>
						</div>
					</div>							
					<div class="row sm" style="margin-top: 2px;">
						<div class="col-sm-12" >
							<ul class="nav nav-tabs">
							  <li class="nav-item">
							    <a class="nav-link active" data-toggle="tab" href="#tabDlgDesmMprCreationMain">Main</a>
							  </li>
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationDetailProgress">Detail Progress</a>
							  </li>
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationStatusOfProcure">Procurement</a>
							  </li>
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationDesign">Design</a>
							  </li>
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationManufacture">Manufacture</a>
							  </li>
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationQuality">Quality</a>
							  </li>							  							  
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationPoStatus">PO Status</a>
							  </li>							  							  
							  <li class="nav-item" style="padding-left:2px">
							    <a class="nav-link" data-toggle="tab" href="#tabDlgDesmMprCreationReviewerComments">Reviewer Comments</a>
							  </li>							  
							</ul>
							<div class="tab-content">
							  <div class="tab-pane fade show active" id="tabDlgDesmMprCreationMain" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Progress Summary</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<div id="gridDlgDesmMprCreationProgress" style="padding-top:1px; height:150px;"></div>
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-6" style="padding-right:5px; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Progress Note</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<div id="divDlgDesmMprCreationProgressNoteBtn" style="margin-bottom: 1px; padding-right: 1px; height:26px">
																<span style="line-height:1.4; padding-left:4px;color:#4e73df"></span>
																<button id="btnDlgDesmMprCreationProgressNoteDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
																	<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
																	<span class="text">Delete</span>
																</button>														
																<button id="btnDlgDesmMprCreationProgressNoteAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
																	<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
																	<span class="text">Add</span>
																</button>															
															</div>															
															<div id="gridDlgDesmMprCreationProgressNote" style="padding-top:1px; height:200px;"></div>
														</div>
													</div>
												</div>
											</div>										
										</div>
										<div class="col-sm-6" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Remarks</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<div id="divDlgDesmMprCreationRemarksBtn" style="margin-bottom: 1px; padding-right: 1px; height:26px">
																<span style="line-height:1.4; padding-left:4px;color:#4e73df"></span>
																<button id="btnDlgDesmMprCreationRemarksDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
																	<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
																	<span class="text">Delete</span>
																</button>														
																<button id="btnDlgDesmMprCreationRemarksAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
																	<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
																	<span class="text">Add</span>
																</button>															
															</div>															
															<div id="gridDlgDesmMprCreationRemarks" style="padding-top:1px; height:200px;"></div>
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
													<label class="font-weight-bold text-primary" style="font-size:12px"><spring:message code="modal.mpr.contract.payment.date" /></label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div id="divDlgDesmMprCreationResultYnText" class="" style = "">
															<label class="" style="line-height : 2"><spring:message code="modal.mpr.resut.yn" /></label>
														</div>	
														<div class="col-sm-1" >
															<select id="txtDlgDesmMprCreationResultYn" class="form-control form-control-user" style="background-color: #B4D9FD; font-size: 0.6rem !important;">
																<option value="Y">YES</option>
																<option value="N">NO</option>
															</select>
														</div>
													</div>
													<div class="form-group row" style="margin-top:4px">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationResultRemark" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="8"></textarea>
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
													<label class="font-weight-bold text-primary" style="font-size:12px"><spring:message code="modal.mpr.supply.request.remark" /></label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationRequestRemark" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="8"></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>	
									<div class="form-group row mb-1" style= "margin-top:10px " id="divDlgDesmMprCreationAtt">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px"><spring:message code="modal.mpr.att.file" /></label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<input id="txtDlgDesmMprCreationAttListFile" type="file" name="txtDlgDesmMprCreationAttListFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />		
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>		
									<div class="form-group row mb-1" style= "margin-top:10px " >
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Photo</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<div id="divDlgDesmMprCreationPhotoAttListBox" class="file-drop-zone clearfix">		
																  
																<div class="col-sm-12 file-drop-zone-title"><spring:message code="file.select.drag.text" /></div>
																	
															</div>
																							
															<div id="divDlgDesmMprCreationPhotoAttListBtn" class="input-group file-caption-main" style="margin-top:4px">
																<div id="divDlgDesmMprCreationPhotoAttListIcon" class="file-caption form-control kv-fileinput-caption">
																	<span class="file-caption-icon">
																		<i class="fas fa-file kv-caption-icon"></i>
																	</span>
																	<input id="txtDlgDesmMprCreationPhotoAttListInfo" class="file-caption-name" placeholder="<spring:message code="file.select.placeholder.text" />" onkeydown="return false;" onpaste="return false;" autocomplete="off"/>

																</div>
																<div class="input-group-btn input-group-append">
																	<button id="btnDlgDesmMprCreationPhotoAttListDelete" class="btn btn-default btn-secondary fileinput-remove fileinput-remove-button" style="display: none;">
																		<i class="fas fa-trash-alt"></i>
																		<span class="hidden-xs"><spring:message code="file.select.delete" /></span>
																	</button>
																	<div class="btn btn-primary btn-file" for="txtDlgDesmMprCreationPhotoAttListFile">
																		<i class="fas fa-folder-open" ></i>
																		<span class="hidden-xs"><spring:message code="file.select.browse" /></span>
																		<input id="txtDlgDesmMprCreationPhotoAttListFile" type="file" class="form-control form-control-user " accept="image/*" multiple />
																	</div>
																</div>
															</div>
														 				
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>																															
								</div>
							  </div>
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationDetailProgress" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div id="gridDlgDesmMprCreationDetailnProgress" style="padding-top:1px; height:400px;"></div>
										</div>
									</div>
								</div>
							  </div>
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationStatusOfProcure" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div id="divDlgDesmMprCreationStatusOfProcureBtn" style="margin-bottom: 1px; padding-right: 1px; height:26px">
												<span style="line-height:1.4; padding-left:4px;color:#4e73df"></span>
												<button id="btnDlgDesmMprCreationProcureDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
													<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
													<span class="text">Delete</span>
												</button>														
												<button id="btnDlgDesmMprCreationProcureAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Add</span>
												</button>
												<button id="btnDlgDesmMprCreationProcurePrevious" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Previous</span>
												</button>	
												<span style="line-height:1.4;padding-right: 8px;color:#4e73df;float:right;margin-top: 7px;">Previous : copy from last month data</span>																											
											</div>											
											<div id="gridDlgDesmMprCreationProcure" style="padding-top:1px; height:400px;"></div>
										</div>
									</div>
								</div>
							  </div>
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationManufacture" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div id="divDlgDesmMprCreationStatusOfManufactureBtn" style="margin-bottom: 1px; padding-right: 1px; height:26px">
												<span style="line-height:1.4; padding-left:4px;color:#4e73df"></span>
												<button id="btnDlgDesmMprCreationManufactureDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
													<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
													<span class="text">Delete</span>
												</button>														
												<button id="btnDlgDesmMprCreationManufactureAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Add</span>
												</button>
												<button id="btnDlgDesmMprCreationManufacturePrevious" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Previous</span>
												</button>	
												<span style="line-height:1.4;padding-right: 8px;color:#4e73df;float:right;margin-top: 7px;">Previous : copy from last month data</span>																											
											</div>											
											<div id="gridDlgDesmMprCreationManufacture" style="padding-top:1px; height:400px;"></div>
										</div>
									</div>
								</div>
							  </div>
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationDesign" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div id="divDlgDesmMprCreationDesignBtn" style="margin-bottom: 1px; padding-right: 1px; height:26px">
												<span style="line-height:1.4; padding-left:4px;color:#4e73df"></span>
												<button id="btnDlgDesmMprDesignCreationExcelUpload" authType="S" class="btn btn-success btn-icon-split btn-sm" style="float:right">
													<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
													<span class="text">Excel Upload</span>
												</button>
												<button id="btnDlgDesmMprCreationDesignDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
													<span class="text">Delete</span>
												</button>														
												<button id="btnDlgDesmMprCreationDesignAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Add</span>
												</button>	
												<button id="btnDlgDesmMprCreationDesignPrevious" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Previous</span>
												</button>	
												<span style="line-height:1.4;padding-right: 8px;color:#4e73df;float:right;margin-top: 7px;">Previous : copy from last month data</span>
												
												<a href="#" title="MFG Yes : Check if manufacturing drawing/Doc. approval are required." style="cursor: default;float:right;margin-top: 11px;padding-right: 8px;">
													<i id="iconDlgDesmMprCreationDesignMfgYes" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
												</a>
											</div>											
											<div id="gridDlgDesmMprCreationDesign" style="padding-top:1px; height:350px;"></div>
										</div>
									</div>
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-6" style="padding-right:5px; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Remark</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationDesignRemark" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="4"></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>
										<div class="col-sm-6" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Note</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationDesignNote" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="4"></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>											
									</div>	
									<div class="form-group row mb-1" style= "margin-top:10px " id="divDlgDesmMprCreationDesignAtt">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px"><spring:message code="modal.mpr.att.file" /></label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<input id="txtDlgDesmMprCreationDesignAttListFile" type="file" name="txtDlgDesmMprCreationDesignAttListFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />		
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>																	
								</div>
							  </div>
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationQuality" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div id="divDlgDesmMprCreationQualityBtn" style="margin-bottom: 1px; padding-right: 1px; height:26px">
												<span style="line-height:1.4; padding-left:4px;color:#4e73df"></span>
												<button id="btnDlgDesmMprCreationQualityDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
													<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
													<span class="text">Delete</span>
												</button>														
												<button id="btnDlgDesmMprCreationQualityAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Add</span>
												</button>		
												<button id="btnDlgDesmMprCreationQualityPrevious" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
													<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
													<span class="text">Previous</span>
												</button>
												<span style="line-height:1.4;padding-right: 8px;color:#4e73df;float:right;margin-top: 7px;">Previous : copy from last month data</span>																										
											</div>											
											<div id="gridDlgDesmMprCreationQuality" style="padding-top:1px; height:200px;"></div>
										</div>
									</div>
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-6" style="padding-right:5px; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Remark</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationQualityRemark" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="4"></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>
										<div class="col-sm-6" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Note</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationQualityNote" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="4"></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>											
									</div>	
									<div class="form-group row mb-1" style= "margin-top:10px " id="divDlgDesmMprCreationQualityAtt">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px"><spring:message code="modal.mpr.att.file" /></label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<input id="txtDlgDesmMprCreationQualityAttListFile" type="file" name="txtDlgDesmMprCreationQualityAttListFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />		
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>																	
								</div>
							  </div>							  							  
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationPoStatus" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Payments</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<div id="gridDlgDesmMprCreationPayments" style="padding-top:1px; height:170px;"></div>
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
													<label class="font-weight-bold text-primary" style="font-size:12px">PO Remarks</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationPoRemarks" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="20" readonly></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>									
								</div>
							  </div>								  							  
							  <div class="tab-pane fade" id="tabDlgDesmMprCreationReviewerComments" style="overflow:auto; height:560px; width:100%">
								<div class="container-fluid" style="padding: 0px; width: 97%">
									<div class="form-group row mb-1" style= "margin-top:10px ">
										<div class="col-sm-12" style="padding-right:0; padding-left:0">
											<div class="card shadow mb-2">
												<div class="card-header py-2" >
													<label class="font-weight-bold text-primary" style="font-size:12px">Return / Confirm</label>
												</div>
												<div class="card-body" style="padding: 6px">
													<div class="form-group row">
														<div class="col-sm-12">
															<textarea id="txtDlgDesmMprCreationReviewerComments" class="form-control form-control-user " style="font-size:11px;line-height:1.5"  rows="29" readonly></textarea>
														</div>
													</div>
												</div>
											</div>										
										</div>
									</div>									
								</div>
							  </div>						  
							</div>			
						</div>
					
					</div>

																																		
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmMprCreationReport" authType="R" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file"></i></span>
					<span class="text">Report</span>
				</button>			
				<button id="btnDlgDesmMprCreationSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>
				<button id="btnDlgDesmMprCreationDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text">Delete</span>
				</button>						
				<button id="btnDlgDesmMprCreationSubmit" authType="ReqS" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Request</span>
				</button>
				<button id="btnDlgDesmMprCreationConfirm" authType="ConS" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-check"></i></span>
					<span class="text">Confirm</span>
				</button>
				<button id="btnDlgDesmMprCreationReturn" authType="ConS" class="btn btn-info btn-icon-split btn-sm">
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

<div id="dlgDesmMprCreationPopUp"></div>

<input id="alertButtonDesmNext"					type="hidden" value="<spring:message code='button.desm.next'						/>"/>
<input id="alertMprDesignSelectErr"				type="hidden" value="<spring:message code='alert.mpr.design.select.err'				/>"/>
<input id="alertMprDesignMfgCheckErr"			type="hidden" value="<spring:message code='alert.mpr.design.mfg.check.err'			/>"/>
<input id="alertMprDesignMfgNullErr"			type="hidden" value="<spring:message code='alert.mpr.design.mfg.null.err'			/>"/>
<input id="alertMprDesignMfgApprovalDateErr"	type="hidden" value="<spring:message code='alert.mpr.design.mfg.approval.date.err'	/>"/>
<input id="alertMprDesignMfgYes" 	   			type="hidden" value="MFG Yes : Check if manufacturing drawing/Doc. approval are required."/>
