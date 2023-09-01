
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMaterialManageCreationPopUpJs = "/resources/scripts/popUp/desmMaterialManageCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMaterialManageCreationPopUp.js"	></script> --%>
<script src="<%= desmMaterialManageCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMaterialManageCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMaterialManageCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMaterialManageCreationTitle">Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="card-body-grid" style="vertical-align: middle; ">
					<div class="table-responsive" style="vertical-align: middle; ">
						<table border="0"width="100%" style="border: 1px solid #d1d3e2;">
							<tr>
								<td width="100%" style="padding-top:3px; padding-bottom:3px">
									<table border="0" style="" id="tblDlgDesmMaterialManageCreationSearchBox">
									  <colgroup>
									      <col style="width: 5%;" />
										    <col style="width: 7%;" />
										    <col style="width: 12%;" />
										    <col style="width: 10%;" />
										    <col style="width: 10%;" />
										    <col style="width: 8%;" />
										    <col style="width: 10%;" />
										    <col style="width: 8%;" />
										    <col style="width: 10%;" />
										    <col style="width: 10%;" />
										    <col style="width: 10%;" />

									  </colgroup>
									    <tr>
									<td style="text-align: right;padding-right:10px">
										<label class="required" style="">Project</label>
									</td>
									<td >
										<input id="txtDlgDesmMaterialManageCreationProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly/>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationProjectName" type="text" class="form-control form-control-user required"  readonly/>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Packing List No.</label>
									</td>
									<td >
										<input id="txtDlgDesmMaterialManageCreationPackingListNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Package No.</label>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationPackageNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Drawing No.</label>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationDrawingNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Item Tag No.</label>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationTagNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
								</tr>
								<tr>
									<td style="text-align: right;padding-left:10px" colspan="2">
										<!-- <label class="" style="">Description</label> -->
										<select id="selDlgDesmMaterialManageCreationDescription" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value='DESCRIPTION'>Description</option>
											<option value='REMARKS'>Remark</option>
										</select>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationDescription" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Vendor</label>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationVendor" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Material Code​</label>
									</td>
									<td>
										<input id="txtDlgDesmMaterialManageCreationMaterialCode​" type="text" class="form-control form-control-user " autocomplete="off" >
									</td>
									<td style="text-align: right;padding-right:10px">
										<spring:message code="grid.col.shipping.order" />
									</td>
									<td>
										<select id="selDlgDesmMaterialManageCreationAttribute10" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value=''>All</option>
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Sequence</label>
									</td>
									<td >
										<input id="txtDlgDesmMaterialManageCreationSequence" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
								</tr>
									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table border="0" style="width: 100%; height: 72px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; padding-top:1px" width="100%">
												<button id="btnDlgDesmMaterialManageCreationSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 44px;">
													<span class="icon" style="padding:0.8rem 0.3rem 0.375rem 0.75rem; background:0">
														<i class="fas fa-search"></i>
													</span>
													<span class="text" style="padding:0.8rem 0.75rem 0.375rem 0rem;">Search</span>
												</button>
											</td>
										</tr>
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-top:1px;" width="100%">
												<button id="btnDlgDesmMaterialManageCreationReset" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;height: 22px;">
													<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
														<i class="fa fa-sync"></i>
													</span>
													<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Reset</span>
												</button>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<div  style="margin-bottom: 1px; padding-right: 1px;"></div>
						<div id="dlgDesmMaterialManageGrid" style="padding-top: 4px; height:550px;" ></div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnMaterialManageCreationBatchType" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">Type Update</span>
				</button>
				<button id="btnMaterialManageCreationBatchCategory" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">Category Update</span>
				</button>
				<button id="btnDlgDesmMaterialManageCreationCompletion" authType="S" class="btn btn-success btn-icon-split btn-sm">
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

<div id="dlgDesmMaterialManageCreationPopUp"></div>