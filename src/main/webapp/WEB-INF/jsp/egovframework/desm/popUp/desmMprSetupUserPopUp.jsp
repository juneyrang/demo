<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMprSetupUserPopUpJs = "/resources/scripts/popUp/desmMprSetupUserPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMprSetupUserPopUp.js"></script> --%>
<script src="<%= desmMprSetupUserPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmMprSetupUser" tabindex="-1" role="dialog" aria-labelledby="dlgDesmMprSetupUserTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmMprSetupUserTitle">Search</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" >
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
							<tr>
								<td width="100%">
									<table border="0" style="height: 43px;">
									  <colgroup>
									    <col style="width: 20%;" />
									    <col style="width: 30%;" />
									    <col style="width: 20%;" />
									    <col style="width: 30%;" />								    								    
									  </colgroup>	
										<tr>
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">User E-mail ID</label>
											</td>
											<td >
												<input id="txtDlgDesmMprSetupUserAd" type="text" class="form-control form-control-user " autocomplete="off">
											</td>								
											<td style="text-align: right;padding-right:10px">
												<label class="" style="">User Name</label>
											</td>
											<td >
												<input id="txtDlgDesmMprSetupUserName" type="text" class="form-control form-control-user " style="width: 100%;" autocomplete="off">
											</td>																
										</tr>
										<tr>
											<td style="text-align: right;padding-right:10px"></td>
											<td ></td>								
											<td style="text-align: right;padding-right:10px"></td>
											<td ></td>																
										</tr>										
									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table border="0" style="width: 100%; height: 48px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; " width="100%">
												<button id="btnDlgDesmMprSetupUserSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 22px;">
													<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
														<i class="fas fa-search"></i>
													</span>
													<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Search</span>
												</button>
											</td>
										</tr>
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-top:1px;" width="100%">
												<button id="btnDlgDesmMprSetupUserResete" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;height: 22px;">
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
					</div>				
					<div class="row sm" style="margin-top: 2px;">
						<div class="col-sm-12" style="padding-right:0; padding-left:0">
							<div id="gridDlgDesmMprSetupUser" style="padding-top:3px; width:100%; height:500px;"></div>									
						</div>					
					</div>																								
				</div>
			</div>

			<div class="modal-footer">
		
				<button id="btnDlgDesmMprSetupUserSelect" authType="SubS" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Select</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmMprSetupUserPopUp"></div>