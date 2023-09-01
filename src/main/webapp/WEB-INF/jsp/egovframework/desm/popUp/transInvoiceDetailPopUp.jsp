
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transInvoiceDetailPopUpJs = "/resources/scripts/popUp/transInvoiceDetailPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transInvoiceDetailPopUp.js"	></script> --%>
<script src="<%= transInvoiceDetailPopUpJs %>"></script>

<div class="modal hide fade" id="dlgInvoiceDetail" tabindex="-1" role="dialog" aria-labelledby="dlgInvoiceDetailTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header" >
				<h6 class="modal-title" id="dlgInvoiceDetailTitle">Invoice 상세</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>			
			</div>
			<div class="modal-body" style="padding: 5px">
				<div class="form-group row mb-1">
					<div class="col-sm-1 text-right font-weight-bold">
						<label class="" style="line-height : 2">Invoice No</label>
					</div>
					<div class="col-sm-2" >
						<input id="txtdlgDetailInvoiceNo" type="text" class="form-control form-control-user " readonly>
					</div>	
					<div class="col-sm-1 text-right font-weight-bold">
						<label class="" style="line-height : 2">Project</label>
					</div>
					<div class="col-sm-2" >
						<input id="txtdlgDetailProjectId" type="text" class="form-control form-control-user " readonly>
					</div>	
					<div class="col-sm-1 text-right font-weight-bold">
						<label class="" style="line-height : 2">관세환급여부</label>
					</div>
					<div class="col-sm-2" >
						<select id="seldlgDetailDutyRefundOption" class="form-control form-control-user " disabled>
						</select>
					</div>	
					<div class="col-sm-1 text-right font-weight-bold">
						<label class="" style="line-height : 2">구매인도조건</label>
					</div>
					<div class="col-sm-2" >
						<select id="seldlgDetailDeliveryTerms" class="form-control form-control-user " disabled>
						</select>
					</div>																																	
				</div>			
				<div class="card shadow mb-2" style = "margin-top : 2px">
					<div class="card-header py-2" style="padding:1px 6px 1px 10px !important; vertical-align: middle;">
						<label class="font-weight-bold text-primary" style="vertical-align: middle; margin-top: 5px">출하요청 리스트</label>
					</div>
					<div class="card-body" style="padding: 1px">
						<div id="dlgDetailRequest" style="padding-top:2px;height:200px"></div>
					</div>							
				</div>	
				<div class="card shadow mb-2" style = "margin-top : 2px">
					<div class="card-header py-2" style="padding:1px 6px 1px 10px !important; vertical-align: middle;">
						<label class="font-weight-bold text-primary" style="vertical-align: middle; margin-top: 5px">Packing List Information</label>
						<button id="btnDlgDetailExcelDownload" authType="R" class="btn btn-success btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 20px">
							<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-file-excel"></i></span>
							<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">Excel DownLoad</span>
						</button>						
					</div>
					<div class="card-body" style="padding: 1px">
						<div id="dlgDetailPackingList" style="padding-top:2px;height:300px"></div>
					</div>							
				</div>					
			</div>
			<div class="modal-footer">
				<button id="dlgDetailFile" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file-alt"></i></span>
					<span class="text">첨부파일</span>
				</button>																
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>			
		</div>
	</div>
</div>

<div id="dlgInvoiceDetailPopUp"></div>