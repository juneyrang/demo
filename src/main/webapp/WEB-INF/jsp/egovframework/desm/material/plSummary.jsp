<!--
	기자재 일정관리 > L3 일정Setup
-->
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%--방법1. : context-properties.xml의 entry의 값을 불러오는 방법 
<%@ page import="egovframework.rte.fdl.property.EgovPropertyService" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>

<%
    WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(application);
    EgovPropertyService propertiesService = (EgovPropertyService) wac.getBean("propertiesService");
    String rV = propertiesService != null ? propertiesService.getString("release.version") : "";
    String plSummaryJs = "/resources/scripts/material/plSummary.js?rV=" + rV;
%>
--%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
	String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String plSummaryJs = "/resources/scripts/material/plSummary.js?rv=" + rV;
%>


<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->
<jsp:include page="../layoutSupport/layout.jsp"></jsp:include>
<jsp:include page="../language.jsp"></jsp:include>

<script src="/resources/ext/bluebird/bluebird.min.js"		></script>
<script src="/resources/ext/fileinput/js/fileinput.js"		></script>
<script src="/resources/ext/fileinput/themes/fas/theme.js"	></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"		></script>
<script src="/resources/js/xlsx.full.min.js"				></script>
<script src="/resources/js/moment.min.js"				></script>

<!-- Page level scripts -->
<%--<script src="/resources/scripts/ajaxSetup.js"	></script>
<script src="/resources/scripts/material/plSummary.js" ></script> --%>
<script src="<%= ajaxSetupJs %>"></script>
<script src="<%= plSummaryJs %>"></script>
<script src="/resources/gridJs/GridE.js"		></script>
<script src="/resources/ext/jquery.sumoselect.js"></script>

<script type="text/javascript">
	$(document).ready( function() {
		//페이지 Title 설정
		//$(document).attr("title", $("#lblPageTitle").text() + " "  + $(document).attr("title"));
	});
</script>

<!-- Page level style -->
<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
<link href="/resources/ext/sumoselect.css" rel="stylesheet" />
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
	.gridRightText { text-align:right !important; }
	.gridLeftText { text-align:left !important; }
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
	canvas{
    	 background-size: cover;
    	 background-repeat : no-repeat;
	}
</style>

<!-- Begin Page Content -->
<div >
	<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<div class="table-responsive" style="vertical-align: middle; ">

				<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
					<tr>
						<td width="100%">
							<table border="0" id="tblSearchBox" style="height: 43px;">
							  <colgroup>
							    <col style="width: 5%;" />
							    <col style="width: 4%;" />
							    <col style="width: 10%;" />
							    <col style="width: 10%;" />
							    <col style="width: 10%;" />
							    <col style="width: 8%;" />
							    <col style="width: 10%;" />
							    <col style="width: 8%;" />
							    <col style="width: 10%;" />
							    <col style="width: 10%;" />
							    <col style="width: 10%;" />
							  </colgroup>
								<tr>
									<td style="text-align: right;padding-right:10px">
										<label class="required" style="">Project</label>
									</td>
									<td >
										<input id="txtProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly/>
									</td>
									<td >
										<input id="txtProjectName" type="text" class="form-control form-control-user required"  readonly/>
									</td>
									<td style="text-align: right;padding-right:10px">
										<spring:message code="grid.col.shipping.order" />
									</td>
									<td>
										<select id="selAttribute10" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value=''>All</option>
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Packing List No.</label>
									</td>
									<td>
										<input id="txtPackingListNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Package No.</label>
									</td>
									<td>
										<input id="txtPackageNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Description</label>
									</td>
									<td>
										<input id="txtDescription" type="text" class="form-control form-control-user " autocomplete="off">
									</td>

								</tr>
								<tr>
									<td style="text-align: right;padding-right:10px">Location</td>
									<td colspan="2">
										<select id="selLocation" class="form-control form-control-user" style="background-color: #B4D9FD;" multiple="multiple">
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Vendor</label>
									</td>
									<td>
										<input id="txtVendor" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Remark</label>
									</td>
									<td >
										<input id="txtRemark" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MRR Received</label>
									</td>
									<td>
										<select id="selMrrReceived" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="Y">Yes</option>
											<option value="N">No</option>
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Received</label>
									</td>
									<td>
										<select id="selReceipted" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="Y">Yes</option>
											<option value="N">No</option>
										</select>
									</td>
<!-- 									<td style="text-align: right;padding-right:10px"> -->
<!-- 										<label class="" style="">Sequence</label> -->
<!-- 									</td> -->
<!-- 									<td > -->
<!-- 										<input id="txtSequence" type="text" class="form-control form-control-user " autocomplete="off"> -->
<!-- 									</td> -->
									<!--
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MIR No.</label>
									</td>
									<td>
										<input id="txtMirNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MIR Status</label>
									</td>
									<td>

										<select id="selMirStatus" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="create">MIR Creation</option>
											<option value="accept">MIR Accept</option>
										</select>

									</td>
									 -->
									<!--
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">RFI No.</label>
									</td>
									<td>
										<input id="txtRfiNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">RFI Status</label>
									</td>
									<td>
										<select id="selRfiStatus" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="create">RFI Creation</option>
											<option value="accept">RFI Accept</option>
										</select>
									</td>
									 -->
								</tr>
								<tr>
									<td style="text-align: right;padding-right:10px"></td>
									<td colspan="2">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Material Confirm</label>
									</td>
									<td>
										<select id="selMaterialConfirm" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="Y">Yes</option>
											<option value="N">No</option>
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MRR Result</label>
									</td>
									<td>
										<select id="selMrrResult" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="All">All</option>
											<option value="Good">Good</option>
											<option value="Defect">Defect</option>
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MRR Received Date</label>
									</td>
									<td>
										<input id="txtStartMrrReceivedDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:48%; text-align: center; float:left;" autocomplete="off"/>
										<label class="" style="font-size: 0.5rem; float:left;">~</label>
										<input id="txtEndMrrReceivedDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:48%;text-align: center ;" autocomplete="off"/>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Received Date</label>
									</td>
									<td>
										<input id="txtStartReceiptDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:48%; text-align: center; float:left;" autocomplete="off"/>
										<label class="" style="font-size: 0.5rem; float:left;">~</label>
										<input id="txtEndReceiptDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:48%;text-align: center ;" autocomplete="off"/>
									</td>
									<!-- <td >
										<input id="txtStartReceiptDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:50%; text-align: center; " autocomplete="off"/>										
									</td>
									<td style="text-align: center">
										<label class="" style="">~</label>
									</td>
									<td >										
										<input id="txtEndReceiptDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:50%;text-align: center ;" autocomplete="off"/>
									</td> -->
								</tr>
							</table>
						</td>
						<td style="vertical-align:top; text-align:right; width:100%;">
							<table border="0" style="width: 100%; height: 48px;">
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
					<span id="spanInfo" style="height: 23px;color:#000000"></span>
					<!--
					<button id="btnRfiAccept" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text">RFI Accept</span>
					</button>

					<button id="btnRfiCancel" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-times-circle"></i></i></span>
						<span class="text">RFI Cancel</span>
					</button>

					<button id="btnRfiCreation" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">RFI Creation</span>
					</button>
					 -->
					<button id="btnSave" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text">Save</span>
					</button>
					<!--
					<button id="btnMirAccept" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text">MIR Accept</span>
					</button>

					<button id="btnMirCancel" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-times-circle"></i></span>
						<span class="text">MIR Cancel</span>
					</button>

					<button id="btnMirCreation" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">MIR Creation</span>
					</button>
					 -->
					<button id="btnDetailItemCreation" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text">Detail Item Creation</span>
					</button>

					<button id="btnCancelMaterial" authType="S" class="btn btn-info btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-times-circle"></i></span>
						<span class="text">Material Cancel</span>
					</button>

					<button id="btnConfirmMaterial" authType="S" class="btn btn-info btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">Material Confirm</span>
					</button>
					<button id="btnLocationDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
						<span class="text">Location Delete</span>
					</button>
					<button id="btnLocationSetup" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">Location Update</span>
					</button>
					<button id="btnReceiptDateSetup" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">Received Date Update</span>
					</button>

					<button id="btnQrCode" authType="R" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file"></i></span>
						<span class="text">QR Code</span>
					</button>


				</div>

				<div id="gridIdsmOsSummary" style="padding-top:1px; width:1000px; height:600px;"></div>

			</div>
		</div>
	</div>
</div>

<div id="dlgIdsmOsSummaryPopUp"></div>





