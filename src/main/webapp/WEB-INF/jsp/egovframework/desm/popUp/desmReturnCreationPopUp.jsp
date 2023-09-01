
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmReturnCreationPopUpJs = "/resources/scripts/popUp/desmReturnCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmReturnCreationPopUp.js"	></script> --%>
<script src="<%= desmReturnCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmReturnCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmReturnCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmReturnCreationTitle">Creation</h6>
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
									<table border="0" style="" id="tblDlgDesmReturnCreationSearchBox">
									  <colgroup>
									    <col style="width: 8%;" />
									    <col style="width: 8%;" />
									    <col style="width: 15%;" />
									    <col style="width: 8%;" />
									    <col style="width: 15%;" />
									    <col style="width: 8%;" />
									    <col style="width: 7%;" />
									    <col style="width: 1%;" />
									    <col style="width: 7%;" />

									  </colgroup>
										<tr >
											<td style="text-align: right;padding-right:10px">
												<label class="required" style="">Project</label>
											</td>
											<td >
												<input id="txtDlgDesmReturnCreationProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly>

												</input>
											</td>
											<td >
												<input id="txtDlgDesmReturnCreationProjectName" type="text" class="form-control form-control-user required"  readonly/>
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Package No.</label>
											</td>
											<td>
												<input id="txtDlgDesmReturnCreationPackageNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">MRF No.</label>
											</td>
											<td colspan="3">
												<input id="txtDlgDesmReturnCreationMrfNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
										</tr>
										<tr >
											<td style="text-align: right;padding-right:10px;padding-top:3px">
												<label class="" style="">Material Code​</label>
											</td>
											<td style="padding-top:3px" colspan="2">
												<input id="txtDlgDesmReturnCreationMaterialCode" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px;padding-top:3px">
												<label class="" style=""><spring:message code="grid.col.shipping.order" /></label>
											</td>
											<td style="padding-top:3px">
												<select id="selDlgDesmReturnCreationAttribute10" class="form-control form-control-user" style="background-color: #B4D9FD;">
													<option value=''>All</option>
												</select>
											</td>
											<td style="text-align: right;padding-right:10px;padding-top:3px">
												<label class="" style="">MRF Req Date</label>
											</td>
											<td style="padding-top:3px">
												<input id="txtDlgDesmReturnCreationStartRequestDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>
											</td>
											<td style="text-align: center;padding-top:3px">
												<label class="" style="">~</label>
											</td>
											<td style="padding-top:3px">
												<input id="txtDlgDesmReturnCreationEndRequestDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
											</td>
										</tr>
										<tr>
											<td style="text-align: right;padding-right:10px">
												Type
											</td>
											<td colspan="2">
												<select id="selDlgDesmReturnCreationType" class="form-control form-control-user" style="background-color: #B4D9FD;">
													<option value=''>All</option>
												</select>
											</td>
											<td style="text-align: right;padding-right:10px">
												Category
											</td>
											<td>
												<input id="txtDlgDesmReturnCreationCategory" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
										</tr>
									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table border="0" style="width: 100%; height: 48px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; padding-top:1px" width="100%">
												<button id="btnDlgDesmReturnCreationSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 22px;">
													<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
														<i class="fas fa-search"></i>
													</span>
													<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Search</span>
												</button>
											</td>
										</tr>
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-top:1px;" width="100%">
												<button id="btnDlgDesmReturnCreationReset" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;height: 22px;">
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
						<div id="dlgDesmReturnGrid" style="padding-top: 4px; height:550px;" ></div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmReturnCreationCompletion" authType="S" class="btn btn-success btn-icon-split btn-sm">
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

<div id="dlgDesmReturnCreationPopUp"></div>