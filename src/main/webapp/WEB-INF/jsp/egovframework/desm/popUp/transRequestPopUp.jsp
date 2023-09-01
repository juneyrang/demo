
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transRequestPopUpJs = "/resources/scripts/popUp/transRequestPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transRequestPopUp.js"	></script> --%>
<script src="<%= transRequestPopUpJs %>"></script>

<div class="modal hide fade" id="dlgTransRequest" tabindex="-1" role="dialog" aria-labelledby="dlgTransRequestTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header" >
				<h6 class="modal-title" id="dlgTransRequestTitle">운송요청</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="padding: 5px">
				<div class="container-fluid" style="padding: 0px;">
					<div class="row row-sm">
						<div class="col-sm-6 col-xl-6 col-lg-6" style="max-width: 40%; min-width: 40%; padding-right: 0">
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding:1px 6px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle; margin-top: 5px">메일 수신자</label>
									<button id="btnDlgTransRequestMailDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-trash" ></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">삭제</span>
									</button>
									<button id="btnDlgTransRequestMailAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">추가</span>
									</button>
								</div>
								<div class="card-body" style="padding: 1px">
									<div id="dlgTransRequestMail" style="padding-top:2px;"></div>
								</div>
							</div>
							<div class="card shadow mb-2" style = "margin-top: 2px;">
								<div class="card-header py-1" style="padding:1px 2px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;">운송요청 내용</label>
									<label style="vertical-align: middle; height: 20px;"></label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold ">
											<label class="required" style="line-height : 2">제목</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgTransRequestTtitle" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">내용</label>
										</div>
										<div class="col-sm-10" >
											<textarea id="txtDlgTransRequestContent" class="form-control form-control-user " cols="80" rows="5" style = "font-size:11px;line-height:1.5;padding:5px"></textarea>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">Proejct</label>
										</div>
										<div class="col-sm-4" style="padding-right:0">
											<input id="txtDlgTransRequestProjectId" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
										<div class="col-sm-6" style = "padding-left : 0.2rem">
											<input id="txtDlgTransRequestProjectDesc" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">Shipment No</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgTransRequestVoyageNo" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">운송타입</label>
										</div>
										<div class="col-sm-4" >
											<select id="selDlgTransRequestTransportType" class="form-control form-control-user required">
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">운송조건</label>
										</div>
										<div class="col-sm-4" >
											<select id="selDlgTransRequestTransportTerms" class="form-control form-control-user required">
											</select>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">운송방법</label>
										</div>
										<div class="col-sm-4" >
											<select id="selDlgTransRequestTransportMethod" class="form-control form-control-user required">
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">운송요청일</label>
										</div>
										<div class="col-sm-4" >
											<input id="txtDlgTransRequestCargoReadyDate" name="inpDatePicker" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgTransRequestLoadingPort" class="required" style="line-height : 2">선적항</label>
										</div>
										<div class="col-sm-4" style = "padding-right : 0">
											<input id="txtDlgTransRequestLoadingPort" type="text" class="form-control form-control-user required" autocomplete="off">
											<i id="iconSearchLoadingPort" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-6" style = "padding-left : 0.2rem">
											<input id="txtDlgTransRequestLoadingPortName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">도착항</label>
										</div>
										<div class="col-sm-4" style = "padding-right : 0">
											<input id="txtDlgTransRequestDestinationPort" type="text" class="form-control form-control-user required" autocomplete="off">
											<i id="iconSearchDestinationPort" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-6" style = "padding-left : 0.2rem">
											<input id="txtDlgTransRequestDestinationPortName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">도착지주소</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgTransRequestFinalDestinationAddr" type="text" class="form-control form-control-user" autocomplete="off">
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 1">도착지<br/>Contact Point</label>
										</div>
										<div class="col-sm-10" >
											<textarea id="txtDlgTransRequestContactPoint" class="form-control form-control-user " cols="80" rows="5" style = "font-size:11px;line-height:1.5;padding:5px" placeholder="(성함/연락처/이메일)"></textarea>
										</div>
									</div>
								</div>
							</div>
							<div class="card shadow mb-2"></div>
						</div>
						<div class="col-sm-6 col-xl-6 col-lg-6" style="max-width: 60%; min-width: 60%; padding-left: 4px">
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding:1px 6px 4px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle; margin-top: 5px">Invoice List</label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div id="dlgTransRequestInvoice" style="padding-top:2px;"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnDlgTransRequestComplete" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">완료</span>
				</button>
				<button id="btnDlgTransRequestCancel" authType="S" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text">운송요청 취소</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="divTransRequestPopUp"></div>

