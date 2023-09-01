
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String plDetailJs = "/resources/scripts/material/plDetail.js?rv=" + rV;
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

<!-- Page level scripts -->
<%--<script src="/resources/scripts/ajaxSetup.js"	></script>
<script src="/resources/scripts/material/plDetail.js"	></script> --%>
<script src="<%= ajaxSetupJs %>"></script>
<script src="<%= plDetailJs %>"></script>
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
<div id="idsmOsDetailDiv">
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
							    <col style="width: 7%;" />
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
										<input id="txtProjectCode" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
									</td>
									<td>
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
									<td >
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
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Vendor</label>
									</td>
									<td colspan="2">
										<input id="txtVendor" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">Location</td>
									<td>
										<select id="selLocation" class="form-control form-control-user" style="background-color: #B4D9FD;" multiple="multiple">
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Drawing No.</label>
									</td>
									<td>
										<input id="txtDrawingNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Item Tag No.</label>
									</td>
									<td>
										<input id="txtTagNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<select id="selQtyType" class="form-control form-control-user" style="background-color: #B4D9FD;" >
											<option value="rsi">RSI Q'ty</option>
											<option value="out">OUT Q'ty</option>
											<option value="balance">RSI Balance Q'ty</option>
											<option value="remain">Remain Q'ty</option>
										</select>
									</td>
									<td>
										<select id="selQty" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="0">0</option>
											<option value="1">&gt; 0</option>
										</select>
									</td>
									<!--
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Sequence</label>
									</td>
									<td >
										<input id="txtSequence" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Remarks</label>
									</td>
									<td colspan="2">
										<input id="txtRemarks" type="text" class="form-control form-control-user " autocomplete="off">
									</td>

									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Material Code​</label>
									</td>
									<td>
										<input id="txtMaterialCode​" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Size​</label>
									</td>
									<td>
										<input id="txtSize" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									 -->
								</tr>
								<tr>
									<td style="text-align: right;padding-right:10px">
										<select id="selSearchKey1" class="form-control form-control-user" style="background-color: #B4D9FD;" >
											<option value="reamrks">Remarks</option>
											<option value="size">Size</option>
											<option value="material">Material Code​</option>
										</select>
									</td>
									<td colspan="2">
										<input id="txtSearchValue1" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										Type
									</td>
									<td >
										<select id="selType" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value=''>All</option>
										</select>
									</td>
									<td style="text-align: right;padding-right:10px">
										Category
									</td>
									<td>
										<input id="txtCategory" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										Sub-Category
									</td>
									<td>
										<input id="txtSubCategory" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										Note
									</td>
									<td>
										<input id="txtNote" type="text" class="form-control form-control-user " autocomplete="off">
									</td>

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

				<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;height:0px">
					<button id="btnSave" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text">Save</span>
					</button>
					<button id="btnLocationDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
						<span class="text">Location Delete</span>
					</button>
					<button id="btnLocationSetup" authType="S" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">Location Update</span>
					</button>
					<button id="btnQrCode" authType="R" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file"></i></span>
						<span class="text">QR Code</span>
					</button>
				</div>

				<div id="gridIdsmOsDetail" style="padding-top:1px; width:1000px; height:600px;"></div>

			</div>
		</div>
	</div>
</div>

<div id="dlgIdsmOsDetailPopUp"></div>

