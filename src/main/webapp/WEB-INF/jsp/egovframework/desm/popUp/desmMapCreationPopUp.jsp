
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMapCreationPopUpJs = "/resources/scripts/popUp/desmMapCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMapCreationPopUp.js"	></script> --%>
<script src="<%= desmMapCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMapCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMapCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 40%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMapCreationTitle">Creation</h6>
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
									<table border="0" style="height: 28px;" id="tblDlgDesmMapCreationSearchBox">
									  <colgroup>
									    <col style="width: 9%;" />
									    <col style="width: 10%;" />
									    <col style="width: 15%;" />
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
												<input id="txtDlgDesmMapCreationProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
													
												</input>
											</td>
											<td >
												<input id="txtDlgDesmMapCreationProjectName" type="text" class="form-control form-control-user required"  readonly/>
											</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											
																									
										</tr>										
									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table border="0" style="width: 100%; height: 28px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; " width="100%">
												<button id="btnDlgDesmMapCreationSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 22px;">
													<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
														<i class="fas fa-search"></i>
													</span>
													<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Search</span>
												</button>
											</td>
										</tr>							
									</table>
								</td>
							</tr>
						</table>
						<div  style="margin-bottom: 1px; padding-right: 1px;"></div>				
						<div id="dlgDesmMapCreationGrid" style="padding-top: 4px; height:350px;" ></div>
					</div>	
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmMapCreationAdd" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">Add</span>
				</button>
				<button id="btnDlgDesmMapCreationDelete" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text">Delete</span>
				</button>										
				<button id="btnDlgDesmMapCreationSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>				
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmRsiPlDtlPopUp"></div>