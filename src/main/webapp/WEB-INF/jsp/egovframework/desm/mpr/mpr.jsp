
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String mprJs = "/resources/scripts/mpr/mpr.js?rv=" + rV;
%>

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
<script src="/resources/scripts/mpr/mpr.js"	></script> --%>
<script src="<%= ajaxSetupJs %>"></script>
<script src="<%= mprJs %>"></script>
<script src="/resources/gridJs/GridE.js"		></script>
<script src="/resources/ext/pdf/html2canvas.js"		></script>
<script src="/resources/ext/pdf/jspdf.min.js"		></script>

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
	
	.btn-file-cus {
	  display: inline-block;
	  font-weight: 400;
	  color: #858796;
	  text-align: center;
	  vertical-align: middle;
	  -webkit-user-select: none;
	  -moz-user-select: none;
	  -ms-user-select: none;
	  user-select: none;
	  background-color: white;
	  border: 1px solid transparent;
	  /* padding: 1.375rem 0.75rem; */
	  padding: 0.25rem 0.5rem;
	/*   font-size: 1rem; */
	  line-height: 1.5;
	  /* border-radius: 0.35rem; cho */
	  border-radius: 0rem;
	  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}	
	
	.select-arrow-non {
	    -webkit-appearance:none; /* 크롬 화살표 없애기 */
	    -moz-appearance:none; /* 파이어폭스 화살표 없애기 */
	    appearance:none /* 화살표 없애기 */
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
							    <col style="width: 8%;" />
							    <col style="width: 20%;" />
							    <col style="width: 10%;" />
							    <col style="width: 16%;" />
							    <col style="width: 6%;" />
							    <col style="width: 6%;" />
							    <col style="width: 1%;" />
							    <col style="width: 6%;" />
							    <col style="width: 10%;" />
							    <col style="width: 16%;" />										    								    
							  </colgroup>	
								<tr>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Project</label>
									</td>
									<td >
										<input id="txtProjectCode" type="text" class="form-control form-control-user " autocomplete="off">
											<i id="iconProjectSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</input>
									</td>
									<td >
										<input id="txtProjectName" type="text" class="form-control form-control-user "  readonly/>
									</td>									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Supplier</label>
									</td>
									<td >
										<input id="txtSupplier" type="text" class="form-control form-control-user" style="width: 100%;" autocomplete="off">
										<input id="txtSupplierNo" type="hidden" class="form-control form-control-user" style="width: 100%;display:none" autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MPR Date</label>
									</td>
									<td >
										<input id="txtStartMPRDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%; text-align: center; " autocomplete="off"/>										
									</td>
									<td style="text-align: center">
										<label class="" style="">~</label>
									</td>
									<td >										
										<input id="txtEndMPRDate" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100%;text-align: center ;" autocomplete="off"/>
									</td>										
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Status</label>
									</td>
									<td >
										<select id="selStatus" class="form-control form-control-user" style="background-color: #B4D9FD;width: 80%;" >
										</select>									
									</td>						
								</tr>
								<tr>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">PO No.</label>
									</td>
									<td >
										<input id="txtPoNo" type="text" class="form-control form-control-user" autocomplete="off">
											<i id="iconPoSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</input>
									</td>
									<td >
										<input id="txtPoName" type="text" class="form-control form-control-user "  readonly/>
									</td>	
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Expediter</label>
									</td>
									<td >
										<input id="txtProgressManager" type="text" class="form-control form-control-user" style="width: 100%;" autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Team search</label>
									</td>
									<td colspan = "3">
										<input id="txtTeamName" type="text" class="form-control form-control-user" style="width: 100%;" autocomplete="off">											
										<input id="txtTeamCode" type="hidden" class="form-control form-control-user" style="width: 100%;" autocomplete="off">
									</td>									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Doosan manager</label>
									</td>
									<td >
										<input id="txtDoosanManager" type="text" class="form-control form-control-user" style="width: 80%;" autocomplete="off">							
									</td>																																																	
								</tr>
								<tr>
									<td style="text-align: right;padding-right:10px">
									</td>
									<td >
									</td>
									<td >
									</td>	
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">MPR No.</label>
									</td>
									<td >
										<input id="txtMprNo" type="text" class="form-control form-control-user" style="width: 100%;" autocomplete="off">
									</td>
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Delivery</label>
									</td>
									<td colspan = "3">
										<select id="selDelivery" class="form-control form-control-user" style="background-color: #B4D9FD;width: 80%;" >
											<option value="">All</option>
											<option value="Y">Yes</option>
											<option value="N">No</option>
										</select>
									</td>									
									<td style="text-align: right;padding-right:10px">
									</td>
									<td >
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

				<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">
					<span id="spanInfo" style="height: 23px;color:#000000"></span>
					
					<button id="btnMPRCreation" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">MPR Creation</span>
					</button>						
					<button id="btnMPRApprove" authType="ConS" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-check"></i></span>
						<span class="text">Confirm</span>
					</button>						
					<button id="btnMPRReject" authType="ConS" class="btn btn-info btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-check"></i></span>
						<span class="text">Return</span>
					</button>	
					<button id="btnMPRDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
						<span class="text">Delete</span>
					</button>		
				</div>

				<div id="gridDesmMpr" style="padding-top:1px; width:1000px; height:600px;"></div>

			</div>
		</div>
	</div>
</div>

<div id="desmMprPopUp"></div>

