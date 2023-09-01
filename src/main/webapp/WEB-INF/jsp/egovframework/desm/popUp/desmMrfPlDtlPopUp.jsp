
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMrfPlDtlPopUpJs = "/resources/scripts/popUp/desmMrfPlDtlPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMrfPlDtlPopUp.js"	></script> --%>
<script src="<%= desmMrfPlDtlPopUpJs %>"></script>

<style>
	/* 첨부파일 스타일 변경 start */
	.file-caption{
		height			: unset;
		padding-top		: unset;
		padding-bottom	: unset;
	}
 	.file-preview-frame{
	    width	: unset;
	    height	: unset
	}
 	.krajee-default .file-caption-info, .krajee-default .file-size-info{
 	    width: unset;
	}
	.krajee-default .file-footer-caption {
		margin-bottom: unset;
	}
	.krajee-default.file-preview-frame{
		margin-top		: unset;
		margin-bottom	: unset;
		margin-left		: unset;
		margin-right	: unset;
	}
	.file-preview{
		padding: unset;
	}
	.file-drop-zone{
		margin: unset;
	}
	/* 첨부파일 스타일 변경 end */
</style>

<div>
	<input id="txtSubconYn" type="hidden" value="<%=session.getAttribute("SUBCON_YN")%>" />
	<input id="txtDeptName" type="hidden" value="<%=session.getAttribute("DEPT_NAME")%>" />
</div>

<div class="modal hide fade" id="dlgDesmMrfPlDtl" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMrfPlDtlTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 96%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMrfPlDtlTitle">Detail</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="card-body-grid" style="vertical-align: middle; ">
					<div class="table-responsive" style="vertical-align: middle; ">
						<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
							<tr>
								<td width="100%">
									<table border="0" style="height: 43px;" id="tblDlgDesmMrfPlDtlSearchBox">
									  <colgroup>
									    <col style="width: 9%;" />
									    <col style="width: 5%;" />
									    <col style="width: 10%;" />
									    <col style="width: 9%;" />
									    <col style="width: 13%;" />
									    <col style="width: 9%;" />
									    <col style="width: 13%;" />
									    <col style="width: 9%;" />
									    <col style="width: 13%;" />
									  </colgroup>
										<tr>
											<td style="text-align: right;padding-right:10px">
												<label class="required" style="">Project</label>
											</td>
											<td >
												<input id="txtDlgDesmMrfPlDtlProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly>

												</input>
											</td>
											<td >
												<input id="txtDlgDesmMrfPlDtlProjectName" type="text" class="form-control form-control-user required"  readonly/>
											</td>
											<td style="text-align: right;padding-right:10px">
												<spring:message code="grid.col.shipping.order" />
											</td>
											<td>
												<select id="selDlgDesmMrfPlDtlAttribute10" class="form-control form-control-user" style="background-color: #B4D9FD;">
													<option value=''>All</option>
												</select>
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">RSI No.</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlRsiNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">RSI Name</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlRsiName" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<!--
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Package No</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlPackageNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Drawing No.</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlDrawingNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											 -->
										</tr>
										<tr>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Packing list No.</label>
											</td>
											<td colspan = "2">
												<input id="txtDlgDesmMrfPlDtlPackingListNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Description</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlDescription" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Item Tag No</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlTagNo" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Material Code</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlMaterialCode" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											
										</tr>
										<tr>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Subcontractor</label>
											</td>
											<td colspan="2">
												<input id="txtSubconstractorDetail" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Size</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlSize" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
										</tr>
										<tr>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Type</label>
											</td>
											<td colspan="2">
												<select id="selDlgDesmMrfPlDtlType" class="form-control form-control-user" style="background-color: #B4D9FD;">
													<option value=''>All</option>
												</select>
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Category</label>
											</td>
											<td >
												<input id="txtDlgDesmMrfPlDtlCategory" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Sub-Category</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlSubCategory" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">Note</label>
											</td>
											<td>
												<input id="txtDlgDesmMrfPlDtlNote" type="text" class="form-control form-control-user " autocomplete="off">
											</td>
										</tr>
									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table border="0" style="width: 100%; height: 48px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; " width="100%">
												<button id="btnDlgDesmMrfPlDtlSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 22px;">
													<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
														<i class="fas fa-search"></i>
													</span>
													<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Search</span>
												</button>
											</td>
										</tr>
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-top:1px;" width="100%">
												<button id="btnDlgDesmMrfPlDtlResete" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;height: 22px;">
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
						<div id="dlgDesmMrfPlDtlGrid" style="padding-top: 4px; height:550px;" ></div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmMrfPlDtlCompletion" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.desm.add" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="DlgDesmMrfPlDtlPopUp"></div>