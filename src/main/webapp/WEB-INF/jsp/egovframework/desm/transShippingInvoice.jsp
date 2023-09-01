
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String transShippingInvoiceJs = "/resources/scripts/transShippingInvoice.js?rv=" + rV;
%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>

<script src="/resources/ext/bluebird/bluebird.min.js"		></script>
<script src="/resources/ext/fileinput/js/fileinput.js"		></script>
<script src="/resources/ext/fileinput/themes/fas/theme.js"	></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"		></script>
<script src="/resources/js/xlsx.full.min.js"				></script>

<!-- Page level scripts -->
<%--<script src="/resources/scripts/ajaxSetup.js"	></script>
<script src="/resources/scripts/transShippingInvoice.js"	></script> --%>
<script src="<%= ajaxSetupJs %>"></script>
<script src="<%= transShippingInvoiceJs %>"></script>
<script src="/resources/gridJs/GridE.js"		></script>


<!-- Page level style -->
<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
<style type="text/css">
	/* 메인 테이블 Row의 마우스 커스 변경 */
	#tblNoticeList tr td { cursor: pointer; }
	#tblNoticeList tr td:last-child { cursor: default !important; }

	/* 팝업 창 크기, 여백 조정 */
	.modal-body, .modal-body .form-control {
/*		font-size:0.8rem !important;*/
		line-height: 1;
	}
	.modal-body .form-group {
		margin-bottom: 0rem;
	}
	label {
 		margin-top		: 0;
 		margin-bottom	: 0;
		font-size		: 11px;
	}

	img.ui-datepicker-trigger { float:right; margin-top:calc(-2.7em + 2px); margin-right:5px; cursor:pointer; }
	.argsDesc { font-style:italic; font-size:0.9em; }

	/* file 란 형식 조정 */
	.file-input .btn { padding-top:5px; padding-bottom:5px; font-size:0.9em; }
	.file-drop-zone-title { padding:25px 10px; }

	/* modal 작은칸의 여백 조정 */
	.modal-body .col-1, .modal-body .col-sm-1, .modal-body .col-md-1, .modal-body .col-lg-1, .modal-body .col-xl-1 {
		padding-right: 0.4rem;
		padding-left: 0.4rem;
	}

	#dlgMenuEdit textarea {
		line-height: 1.2rem;
	}

	.in-line{
		width:350px;
		height:40px;
	}

	input{
		margin:0;
	}

	input[type="text"]{
		padding: 5px;
		text-align: left;
		margin: 0px;
		height: 30px;
		font-size:12px;
		padding-left: 5px;
		/* font-style: oblique; */
		outline:none;
		box-sizing: border-box;
		color:black;
	}
	input[type=button]{
		width: 30%;
		height:100%;
		background-color: lightgray;
		border:none;
		background-color: white;
		font-size:1em;
		color:#042AaC;
		outline:none;
		display:inline;
		margin-left: -10px;
		box-sizing: border-box;
	}
	input[type=button]:hover{
		background-color: lightgray;
	}
	.container-fluid-grid{
		padding-left : 0.5rem !important;
		padding-right : 0.5rem !important;
	}

	.gridLinkText { color:#0585B9 !important;font-weight:bold !important;cursor:pointer !important; }
	.gridRightText { text-align:right; }
	.gridLeftText { text-align:left; }
	.gridCenterText { text-align:center !important; }
	.gridBorderText { font-weight:bold !important; }
	.gridTextColor { color: #586980 !important; }
	.gridBorderColor { border-right: 1px solid #1182DC !important; }

	div[class*=MenuMain] {z-index: 3000 !important;}
	div[class*=Message] {z-index: 3000 !important;}
	div[class*=DisabledHard] {z-index: 2900 !important;}
	.GridDisabled {z-index: 2900 !important;}
	.Green { background-color:#8F8 !important; }

	img.ui-datepicker-trigger {
		float:right;
		margin-top:calc(-4.0em + 18px);
		margin-right:5px;
		margin-bottom:0px;
		cursor:pointer;
		width: 27px;
	}

	select{
		font-size:0.5rem !important;
		height: 20px !important;
		padding-top: 0px !important;
		padding-bottom: 1px !important;
	}
	input{
		font-size:0.6rem;
	}

	.btn-sm, .btn-group-sm > .btn {
		font-size: 0.9em;
	}

	button {
		font-size: 0.9em;
		/* width:80px; */
		height:26px;
	}

	input[type="text"]{
		height: 20px;
	    font-size: 11px;
	}

	td{
		font-size: 0.7em;
		color: #000000;
		padding-bottom: 0px;
		padding-top: 0px;
	}

 	.mb-4{
		margin-bottom: 0rem !important;
	}

	body {
		--font-family-sans-serif : "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
		--font-family-monospace : SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	}

	btn, btn-primary, btn-file{
		height:26px
	}

	.mb-1{
		margin-bottom: 0rem !important;
	}
	.mb-2{
		margin-bottom: 0rem !important;
	}
	.m-1{
		margin-top		: 0.1rem !important;
		margin-bottom	: 0.1rem !important;
	}

	.btn-file{
		padding-top	: 3px;
		height		: 26px;
	}

	/* 첨부파일 스타일 변경 start */
	.file-caption{
		height			: 26px;
		padding-top		: 3px;
		padding-bottom	: 3px;
	}
/* 	.file-preview-frame, .krajee-default, .file-preview-initial, .file-sortable, .kv-preview-thumb{ */
 	.file-preview-frame{
/* 	    width	: 165px; */
	    width	: 135px;
	    height	: 75px
	}
 	.krajee-default .file-caption-info, .krajee-default .file-size-info{
/*  	    width: 155px; */
 	    width: 125px;
	}
	.krajee-default .file-footer-caption {
		margin-bottom: 1px;
	}
	.krajee-default.file-preview-frame{
		margin-top		: 1px;
		margin-bottom	: 1px;
		margin-left		: 3px;
		margin-right	: 3px;
	}
	.file-preview{
		padding: 0px;
	}
	.file-drop-zone{
		margin: 0px;
	}
	/* 첨부파일 스타일 변경 end */

	.label-max-min-width {
		max-width: 40%;
		min-width: 40%;
	}
	.text-max-min-width{
		max-width: 40%;
		min-width: 40%;
	}

	/* Item 신규등록 > Item 정보 > Project Code > 확인 아이콘 위치조정 */
	.autocomplete-valid{
    	margin-top: -19;
	}
	
	
</style>





<div class="container-fluid-grid container-fluid" >
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<input id="txtRoleCd" type="hidden" value="<%=session.getAttribute("TRANS_ROLE_CD")%>" />
			<input id="txtBgName" type="hidden" value="<%=session.getAttribute("TRANS_BG_NAME")%>" />
				
			<div class="table-responsive" style="vertical-align: middle; ">
				<table style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem; width : 100%">				 			
					<tr>
						<td width="100%">
							<table id="tblSearchBox" style="height: 43px;border : 0">		
								  <colgroup>
								    <col style="width: 50px;" />
								    <col style="width: 100px;" />
								    <col style="width: 200px;" />
								    <col style="width: 60px;" />
								    <col style="width: 120px;" />
								    <col style="width: 70px;" />
								    <col style="width: 120px;" />
								    <col style="width: 90px;" />
								    <col style="width: 120px;" />								    								    
								  </colgroup>													
								<tr>
									<td style="text-align: right; padding-right : 4px">
										<label class="" style="">Project</label>
									</td>
									<td >
										<input id="txtSearchProjectCode" type="text" class="form-control form-control-user" autocomplete="off" />
										<i id="iconSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										
									</td>
									<td >
										<input id="txtSearchProjectName" type="text" class="form-control form-control-user required"  readonly/>
									</td>

									<td style="text-align: right; padding-right : 4px">
										<label class="" style="">항차번호</label>
									</td>
									<td >
										<input id="txtSearchVoyageNo" type="text" class="form-control form-control-user"  autocomplete="off" />
									</td>									
									<td style="text-align: right; padding-right : 4px">
										<label class="" style="">Invoice No</label>
									</td>
									<td >
										<input id="txtSearchInvoiceNo" type="text" class="form-control form-control-user"  autocomplete="off" />
									</td>
									<td style="text-align: right; padding-right : 4px">
										<label class="" style="">항차생성건 포함</label>
									</td>
									<td >
										<select id="txtSearchIncludeVoyage" class="form-control form-control-user"  style="background-color: #B4D9FD;">
											
										</select>
									</td>									
								</tr>	 
							</table>
						</td>
						<td style="vertical-align:top; text-align:right; width:100%;">
							<table style="width: 100%; height: 48px;border : 0">
								<tr>
									<td style="vertical-align:middle; text-align:right; padding-bottom:1px; " width="100%">
										<button id="btnSearch" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;height: 22px;">
											<span class="icon" style="padding:0.19rem 0.3rem 0.375rem 0.75rem; background:0">
												<i class="fas fa-search"></i>
											</span>
											<span class="text" style="padding:0.19rem 0.75rem 0.375rem 0rem;">Search</span>
										</button>
									</td>
								</tr>
								<tr>
									<td style="vertical-align:middle; text-align:right; padding-top:1px;" width="100%">
										<button id="btnResete" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;height: 22px;">
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

				<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">
					

					<button id="btnRequest" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">운송요청</span>
					</button>

				</div>

				<div id="gridMain" style="padding-top:1px; width:1000px; height:600px;"></div>

			</div>
		</div>
	</div>
</div>


<div id = "divtransShippingInvoicePopUp"></div>







<input id="alertSelectRow"				type="hidden" value="<spring:message code='alert.select.row'	/>"/>
<input id="alertValidate"				type="hidden" value="<spring:message code='alert.validate'		/>"/>
<input id="alertSave"					type="hidden" value="<spring:message code='alert.save'			/>"/>
<input id="alertSaveSuccess"			type="hidden" value="<spring:message code='alert.save.success'	/>"/>
<input id="alertDelete"					type="hidden" value="<spring:message code='alert.delete'		/>"/>
<input id="alertDeleteSuccess"			type="hidden" value="<spring:message code='alert.delete.success'/>"/>
<input id="alertEdit"					type="hidden" value="수정하시겠습니까?"/>
<input id="alertReject"					type="hidden" value="반려하시겠습니까?"/>
<input id="alertComplete"			type="hidden" value="완료 하시겠습니까?"/>
<input id="alertCompleteSuccess"			type="hidden" value="처리되었습니다."/>
<input id="alertEditCheck"				type="hidden" value="변경된 데이터가 있습니다. 저장 하시겠습니까?"/>
<input id="alertSaveAlreadyInv"			type="hidden" value="입력하신 Invoice Number가 이미 존재합니다.저장 하시겠습니까?"/>
<input id="alertGridSelectDataAll"		type="hidden" value="한 개의 항목만 선택하셔야 합니다."/>
<input id="alertGridSelectDataNull"		type="hidden" value="선택된 항목이 없습니다."/>
<input id="alertGridDataNull"			type="hidden" value="저장할 데이터가 없습니다."/>
<input id="alertGridEditDataNull"		type="hidden" value="수정한 데이터가 없습니다."/>
<input id="alertGridDataNullMail"			type="hidden" value="수신자 항목이 없습니다."/>
<input id="alertGridDataNullPackingDetail"			type="hidden" value="상세 내역이 없습니다."/>
<input id="alertGridCopyRowNull"		type="hidden" value="저장 후 복사 할 수있습니다."/>
<input id="alertGridCopyRowChildNode"	type="hidden" value="선택한 Item이 최하위 Item일 경우에만 복사 가능합니다."/>
<input id="selectNullTextAll"	    	type="hidden" value="전체"/>
<input id="selectNullTextSel"			type="hidden" value="선택"/>
<input id="alertMailSelectFail1" type="hidden" value="수신자를 선택 하세요."/>
<input id="alertDeleteFail1" type="hidden" value="해당 출하요청건은 항차가 생성되어 운송발주가 완료된 상태입니다. 자재/물류담당자에게 문의해주세요."/>
<input id="alertDeleteFail2" type="hidden" value="메일 발송 오류, IT 담당자에게 문의해주세요."/>
<input id="alertCompleteFail1" type="hidden" value="변동사항이 없습니다."/>
<input id="alertCompleteFail2" type="hidden" value="사용중인 Invoice No가 존재하며, PROJECT, 관세환급여부, 배송조건이 생성되어있는 Invoice No와 다릅니다."/>
<input id="alertCompleteFail3" type="hidden" value="필수 첨부파일이 첨부되지 않았습니다. 첨부파일 탭에서 필수 첨부문서를 확인해주세요."/>
<input id="alertCompleteFail4" type="hidden" value="Invoice No 저장 중 오류가 발생하였습니다. 시스템 담당자에게 문의해주세요."/>
<input id="alertCompleteFail5" type="hidden" value="동일한 이름의 항차가 존재합니다. 새로운 항차 번호를 작성해주세요.<br/>항차번호 작성 Guide<br/> 1.단순 숫자는 입력하지 않습니다.<br/> 2.특정 항차 번호가 없을 경우에는, 대표 Invoice No.를 항차 번호로 작성해주세요."/>
<input id="alertCompareProject" type="hidden" value="프로젝트가 일치하지 않습니다."/>









