
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmStrategicEwsCreationPopUpJs = "/resources/scripts/popUp/desmStrategicEwsCreationPopUp.js?rv=" + rV;
%>

<script src="<%= desmStrategicEwsCreationPopUpJs %>"></script>

<%-- prefix : dlgStEwsUser, DlgStEwsUser --%>
<div class="modal hide fade" id="dlgStEwsUser" tabindex="-1" role="dialog" aria-labelledby="dlgStEwsUserTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgStEwsUserTitle">EWS 수신자 추가</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgStEwsUserBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1" style="">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="" style="line-height : 2">수신자</label>
						</div>
						<div class="col-sm-8" style="">
							<input id="txtDlgStEwsUserReceiver" type="text" class="form-control form-control-user" autocomplete="off" >
								<i id="iconDlgStEwsUserReceiverSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">EWS Name</label>
						</div>
						<div class="col-sm-8" >
							<select id="selDlgStEwsUserEwsName" class="form-control form-control-user" style="background-color: #B4D9FD;">
								<option value="DESM_STRATEGIC_INFO_MAIL">수출허가 이행 안내</option>
								<option value="DESM_STRATEGIC_DENIAL_MAIL">우려거래자 확인 안내</option>
							</select>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">ID</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgStEwsUserId" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Name</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgStEwsUserName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Dept</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgStEwsUserDept" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Email</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgStEwsUserMail" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgStEwsUserSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
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

<div id="dlgStEwsUserPopUp"></div>