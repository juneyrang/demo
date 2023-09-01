<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>

			</div>
			<!-- End of Main Content -->

			<!-- Footer -->
			<footer class="sticky-footer bg-white">
				<div class="my-auto">
					<div class="copyright text-center my-auto">
						<%
							Date nowTime = new Date();
							SimpleDateFormat sf = new SimpleDateFormat("yyyy");
						%>
						<span>ⓒ <%= sf.format(nowTime) %> Doosan Corporation</span>
						<a href="javascript:licenseOpen()" style="float:right; color: grey;">Opensouce License</a>
						<script>
							function licenseOpen(){
								window.open(window.location.protocol + "//" + window.location.host +"/OpensourceLicense.html");
							}
						</script>
					</div>
				</div>
			</footer>
			<!-- End of Footer -->

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

	<!-- 최상단으로 이동 버튼-->
	<a class="scroll-to-top rounded" href="#page-top" title="Go Top">
		<i class="fas fa-angle-up"></i>
	</a>

	<!-- Logout Modal-->
	<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">로그아웃 하시겠습니까?</h5>
					<button class="close" type="button" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">"Logout"을 클릭하시면 세션이 종료됩니다</div>
				<div class="modal-footer">
					<button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
					<a class="btn btn-primary" href="javascript:alert('로그아웃 구현')">Logout</a>
				</div>
			</div>
		</div>
	</div>

	<iframe id="ifrm_action" name="ifrm_action" width="0" height="0" class="dp_n"></iframe>
	<div id="wrap-loading" class="wrap-loading dp_n"><div style="margin-left:0;"><img src="/resources/images/ajax_loader.gif" style="height:100px; width:100px" /></div></div>
	<div id="alert-success" class="alert-box success"></div>
	<div id="alert-failure" class="alert-box failure"></div>
	<div id="alert-warning" class="alert-box warning"></div>

	<!-- 기본 alert 팝업 -->
	<div class="modal hide fade" id="dialogAlert" tabindex="-1" role="dialog" aria-labelledby="dialogAlertTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 40%;">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="dialogAlertTitle" style = "font-size : 1rem">TITLE</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" style = "margin-top : 2px; padding-right : 10px">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="p-2 pl-4 pr-4">
						<div id="dialogAlertMsg" class="confirm">Message
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
						<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
						<span class="text"><spring:message code="button.close" /></span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 확인/취소 confirm 팝업 -->
	<div class="modal hide fade" id="dialogConfirm" tabindex="-1" role="dialog" aria-labelledby="dialogConfirmTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document" style="max-width: 40%;">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="dialogConfirmTitle" style = "font-size : 1rem">TITLE</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" style = "margin-top : 2px; padding-right : 10px">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="p-2 pl-4 pr-4">
						<div id="dialogConfirmMsg" class="confirm">Message</div>
					</div>
				</div>
				<div class="modal-footer">
					<button id="modal-btn-yes" class="btn btn-primary btn-icon-split btn-sm">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text"></span>
						<!-- <span class="text"><spring:message code="button.desm.confirm" /></span> -->
					</button>
					<button id="modal-btn-no" class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
						<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
						<!-- <span class="text"></span> -->
						<span class="text"><spring:message code="button.desm.cancel" /></span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal hide fade" id="dialogAlertLog" tabindex="-1" role="dialog" aria-labelledby="dialogAlertLogTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-dialog-centered" role="document" style="width: 310px">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="dialogAlertLogTitle" style = "font-size : 1rem">Log</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" style = "margin-top : 2px; padding-right : 10px">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="p-2 pl-4 pr-4">
						<div id="dialogAlertLogMsg" class="confirm">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
						<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
						<span class="text"><spring:message code="button.close" /></span>
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal hide fade" id="dialogAlertPwd" tabindex="-1" role="dialog" aria-labelledby="dialogAlertPwdTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-dialog-centered" role="document" style="width: 480px">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="dialogAlertPwdTitle" style = "font-size : 1rem">Password Change</h5>
				</div>

				<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1" style="height:26px">
						<div class="col-sm-6 text-right font-weight-bold " >
							<label class="required" style="line-height : 2; margin-top:0; margin-bottom:0">Current Password</label>
						</div>
						<div class="col-sm-6" >
							<input id="txtCurrentPassword" type="password" class="form-control form-control-user required" autocomplete="off" style="height:23px" >
						</div>
					</div>
					<div class="form-group row mb-1" style="height:26px">
						<div class="col-sm-6 text-right font-weight-bold " >
							<label class="required" style="line-height : 2; margin-top:0; margin-bottom:0">New Password</label>
						</div>
						<div class="col-sm-6" >
							<input id="txtNewPassword" type="password" class="form-control form-control-user required" autocomplete="off" style="height:23px" >
						</div>
					</div>
					<div class="form-group row mb-1" style="height:26px">
						<div class="col-sm-6 text-right font-weight-bold " >
							<label class="required" style="line-height : 2; margin-top:0; margin-bottom:0">New Password Confirmation</label>
						</div>
						<div class="col-sm-6" >
							<input id="txtNewPasswordConfirmation" type="password" class="form-control form-control-user required" autocomplete="off" style="height:23px">
						</div>
					</div>
				</div>
				</div>
				<div class="modal-footer">
					<button id="dialogAlertPwdSave" class="btn btn-success btn-icon-split btn-sm">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text"><spring:message code="button.save" /></span>
					</button>
					<button id="dialogAlertPwdClose" class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
						<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
						<span class="text"><spring:message code="button.close" /></span>
					</button>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal hide fade" id="dlgNoticeEdit" tabindex="-1" role="dialog" aria-labelledby="dlgNoticeEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="dlgNoticeEditTitle">공지사항 제목</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="padding-top:8px">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="p-2 pl-4 pr-4">
						<div class="form-group row mb-1">
							<div class="col-sm-12">
								<textarea class="form-control form-control-user required" cols="80" id="txtContents" name="txtContents" rows="10" readonly></textarea>
							</div>
						</div>
						<div class="form-group row mb-1">
							<div class="col-sm-12">
								<input id="txtNoticeFile" type="file" name="txtNoticeFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
							</div>
						</div>							
						
					</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
						<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
						<span class="text"><spring:message code="button.close" /></span>
					</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="divfootPopUp"></div>
	<div>
		<input id="alertAlarm"			    	type="hidden" value="<spring:message code='alert.alarm'/>"/>
		<input id="alertValidate"				type="hidden" value="<spring:message code='alert.validate'		/>"/>
		<input id="alertSavePwdErr"			    type="hidden" value="<spring:message code='alert.save.pwd.err'/>"/>
		<input id="alertSave"					type="hidden" value="<spring:message code='alert.save'			/>"/>
		<input id="alertSuccess"				type="hidden" value="<spring:message code='alert.success'/>"/>
		<input id="alertSavePwdNotErr"			type="hidden" value="<spring:message code='alert.save.pwd.not.err'/>"/>
		<input id="alertLogout" type="hidden" value="<spring:message code='alert.logout' />"/>
		<input id="alertTransAuth"			    type="hidden" value="<spring:message code='alert.trans.auth'/>"/>
		<input id="alertDefaultProjectAuth"			    type="hidden" value="<spring:message code='alert.default.project.auth'/>"/>
		<input id="alertSelectRow"				type="hidden" value="<spring:message code='alert.select.row'	/>"/>
		<input type="hidden" id="PWS_EDIT_YN"  value="<%=session.getAttribute("PWS_EDIT_YN")%>" />
		<input id="txtDesmLang" 				type="hidden" value="<%=session.getAttribute("LANG")%>" />
		<input id="alertSavePwdLengthErr" 		type="hidden" value="<spring:message code='alert.save.pwd.length.err'/>"/>
		<input id="alertSavePwdNumberErr" 		type="hidden" value="<spring:message code='alert.save.pwd.number.err'/>"/>
		<input id="alertSavePwdEnglishErr" 		type="hidden" value="<spring:message code='alert.save.pwd.english.err'/>"/>
		
		<input id="ButtonDesmConfirm"			type="hidden" value="<spring:message code='button.desm.confirm'/>"/>
		<input id="ButtonDesmCancel"		    type="hidden" value="<spring:message code='button.desm.cancel'/>"/>
	</div>
</body>
</html>