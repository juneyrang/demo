
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transRequestEditPopUpJs = "/resources/scripts/popUp/transRequestEditPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transRequestEditPopUp.js"	></script> --%>
<script src="<%= transRequestEditPopUpJs %>"></script>

<input id="txtRoleCd" type="hidden" value="<%=session.getAttribute("TRANS_ROLE_CD")%>" />
<input id="txtUsrCls" type="hidden" value="<%=session.getAttribute("TRANS_USR_CLS")%>" />
<input id="txtUserName" type="hidden" value="<%=session.getAttribute("TRANS_USER_NAME")%>" />	
<input id="txtEmail" type="hidden" value="<%=session.getAttribute("TRANS_EMAIL")%>" />	

<div class="modal hide fade" id="dlgEdit" tabindex="-1" role="dialog" aria-labelledby="dlgEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header" >
				<h6 class="modal-title" id="dlgEditTitle">출하요청</h6>
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
									<button id="btnDlgEditMailDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-trash" ></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">삭제</span>
									</button>
									<button id="btnDlgEditMailAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">추가</span>
									</button>
								</div>
								<div class="card-body" style="padding: 1px">
									<div id="dlgEditMail" style="padding-top:2px;height:200px"></div>
								</div>							
							</div>	
							<div class="card shadow mb-2" style = "margin-top: 2px;">
								<div class="card-header py-1" style="padding:1px 2px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;">출하요청 내용</label>
									<label style="vertical-align: middle; height: 20px;"></label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">현재 작성자</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgEditSender" type="text" class="form-control form-control-user " autocomplete="off">
										</div>																		
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">E-Mail</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgEditEmail" type="text" class="form-control form-control-user " autocomplete="off">
										</div>																		
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold required">
											<label class="" style="line-height : 2">제목</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgEditTtile" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>																		
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">내용</label>
										</div>
										<div class="col-sm-10" >
											<textarea id="txtDlgEditContent" class="form-control form-control-user " cols="80" rows="8" style = "font-size:11px;line-height:1.5;padding:5px" spellcheck="false"></textarea>
										</div>										
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold required">
											<label class="" style="line-height : 2">Proejct</label>
										</div>
										<div class="col-sm-4" style="padding-right:0">
											<input id="txtDlgEditProjectId" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-6" style="padding-left:0.2rem">
											<input id="txtDlgEditProjectDesc" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
										</div>																																
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Invoice No</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgEditInvoiceNo" type="text" class="form-control form-control-user " autocomplete="off">
										</div>																		
									</div>	
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold required">
											<label class="" style="line-height : 2">Description</label>
										</div>
										<div class="col-sm-10" >
											<input id="txtDlgEditDescription" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>																		
									</div>		
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold required">
											<label class="" style="line-height : 2">구매인도조건</label>
										</div>
										<div class="col-sm-4" >
											<select id="selDlgEditDeliveryTerms" class="form-control form-control-user required">
											</select>
										</div>		
										<div class="col-sm-2 text-right font-weight-bold required">
											<label class="" style="line-height : 2">출하예정일</label>
										</div>
										<div class="col-sm-4" >
											<input id="txtDlgEditShopOutDate" name="inpDatePicker" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>																											
									</div>	
									<div class="form-group row mb-1">
										<div id="lblDlgEditHscode" class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">HS Code</label>
										</div>
										<div class="col-sm-4" >
											<input id="txtDlgEditHscode" type="text" class="form-control form-control-user " autocomplete="off">
										</div>		
										<div class="col-sm-2 text-right font-weight-bold required">
											<label class="" style="line-height : 2">관세환급</label>
										</div>
										<div class="col-sm-4" >
											<select id="selDlgEditDutyRefundOption" class="form-control form-control-user required"></select>
										</div>																											
									</div>		
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<select id = "selDlgEditIndeptFlag" class="form-control form-control-user required" style="padding : 0.375rem 0 0.375rem 0.2rem">
											</select>
										</div>
										<div class="col-sm-4" >
											<input id="txtDlgEditVendorName" type="text" class="form-control form-control-user required" autocomplete="off">											
											<input id="txtDlgEditVendorId" type="hidden" class="form-control form-control-user required" autocomplete="off">
											<input id="txtDlgEditDeptName" type="text" class="form-control form-control-user required" autocomplete="off">
											<input id="txtDlgEditDeptCode" type="hidden" class="form-control form-control-user required" autocomplete="off">
											<i id="iconNameSearch" class="fas fa-search" authType="S" style="float : right;margin:-16px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>		
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">위험물</label>
										</div>
										<div class="col-sm-1" >
											<input id="chkDlgEditDangerFlag" type="checkbox" class="form-control form-control-user " style="width :15px !important;height : 15px !important;margin-top:4px;border-color:red">
										</div>		
										<div class="col-sm-2 text-right font-weight-bold" style="padding-right: 0;">
											<label class="" style="line-height : 2;margin-left: -30px;">전략물자포함여부</label>
										</div>
										<div class="col-sm-1" >
											<input id="chkDlgEditAttribute1" type="checkbox" class="form-control form-control-user " style="width :15px !important;height : 15px !important;margin-top:4px;border-color:red">
										</div>																																				
									</div>	
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">출하담당자<br/>Contact Point</label>
										</div>
										<div class="col-sm-10" >
											<textarea id="txtDlgEditContactPoint" class="form-control form-control-user " cols="80" rows="2" style = "font-size:11px;line-height:1.5;padding:5px" placeholder="(성함/연락처/이메일)"></textarea>
										</div>										
									</div>																																																																																							
								</div>
							</div>	
							<div class="card shadow mb-2"></div>			
						</div>
						<div class="col-sm-6 col-xl-6 col-lg-6" style="max-width: 60%; min-width: 60%; padding-left: 4px">
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding:1px 6px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle; margin-top: 5px">Packing Detail</label>
									<button id="btnDlgEditExcelUpload" authType="E" class="btn btn-success btn-icon-split btn-sm" role="button" style="float: right; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-file-excel" ></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">Upload</span>
									</button>
									<button id="btnDlgEditExcelDownload" authType="R" class="btn btn-success btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-file-excel"></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">Excel DownLoad</span>
									</button>
								</div>
								<div class="card-body" style="padding: 1px">
									<div id="dlgEditPackingDetail" style="padding-top:2px;height:613px"></div>
								</div>							
							</div>							
						</div>						
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnDlgEditSave" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">임시저장</span>
				</button>
				<button id="btnDlgEditEdit" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span id="btnDlgEditEditText" class="text">수정</span>
				</button>						
				<button id="btnDlgEditComplete" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">완료</span>
				</button>	
				<button id="btnDlgEditReject" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file-alt"></i></span>
					<span class="text">반려</span>
				</button>							
				<button id="btnDlgEditFile" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file-alt"></i></span>
					<span class="text">첨부파일</span>
				</button>	
				<button id="btnDlgEditDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" >
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text">삭제</span>
				</button>																										
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>			
		</div>
	</div>
</div>

<div id="dlgEditPopUp"></div>