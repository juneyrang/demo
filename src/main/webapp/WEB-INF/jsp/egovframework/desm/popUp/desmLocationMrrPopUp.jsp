
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmLocationMrrPopUpJs = "/resources/scripts/popUp/desmLocationMrrPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmLocationMrrPopUp.js"	></script> --%>
<script src="<%= desmLocationMrrPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmLocation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmLocationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmLocationTitle">Location Update</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" style = "padding-bottom : 0px; padding-top:2px">
				<div class="card-body-grid" style="vertical-align: middle; ">
					<div class="table-responsive" style="vertical-align: middle; ">
						<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
							<tr>
								<td width="100%">
									<table border="0" style="height: 28px;" id="tblDlgDesmLocationSearchBox">
									  <colgroup>
									    <col style="width: 9%;" />
									    <col style="width: 10%;" />
									    <col style="width: 15%;" />
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
												<input id="txtDlgDesmLocationProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
													
												</input>
											</td>
											<td >
												<input id="txtDlgDesmLocationProjectName" type="text" class="form-control form-control-user required"  readonly/>
											</td>
											<td style="text-align: right;padding-right:10px">
												<label class="required" style="">Area</label>												
											</td>
											<td>
												<select id="selDlgDesmLocationMapName" class="form-control form-control-user" style="background-color: #B4D9FD;">
													<option value=''>Select</option>
												</select>									
											</td>
											<td style="text-align: right;padding-right:10px"></td>
											<td></td>		
											<td style="text-align: right;padding-right:10px"></td>
											<td></td>																						
										</tr>

									</table>
								</td>
								<td style="vertical-align:top; text-align:right; width:100%;">
									<table border="0" style="width: 100%; height: 28px;">
										<tr>
											<td style="vertical-align:middle; text-align:right; padding-bottom:1px; " width="100%">
												<button id="btnDlgDesmLocationSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 22px;">
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
						<canvas id="canvasDlgDesmLocation" height="700" width="1200" style="background-size: contain; background-repeat : no-repeat;" ></canvas>	
					</div>	
				</div>
			</div>

		</div>
	</div>
</div>

<div id="dlgDesmLocationPopUp"></div>