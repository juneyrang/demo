<!--
	운송관리 > 전략물자관리
	strategicMgt.jsp
-->

<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetupJs = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String strategicMgtJs = "/resources/scripts/trans/strategicMgt.js?rv=" + rV;
    String strategicMgtStatusPopDescJs = "/resources/scripts/trans/strategicMgtStatusPopDesc.js?rv=" + rV;
%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->
<jsp:include page=".././layoutSupport/layout.jsp"></jsp:include>

<script src="/resources/ext/bluebird/bluebird.min.js"		></script>
<script src="/resources/ext/fileinput/js/fileinput.js"		></script>
<!-- <script src="/resources/ext/fileinput/themes/fas/theme.js"	></script> -->
<script src="/resources/ext/fileinput/themes/explorer/theme.js"	></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"		></script>
<script src="/resources/js/xlsx.full.min.js"				></script>

<!-- Page level scripts -->
<%--<script src="/resources/scripts/ajaxSetup.js"						></script> --%>
<script src="<%= ajaxSetupJs %>"></script>
<script src="/resources/gridJs/GridE.js"							></script>

<%--<script src="/resources/scripts/trans/strategicMgt.js"				></script>
<script src="/resources/scripts/trans/strategicMgtStatusPopDesc.js"	></script> --%>
<script src="<%= strategicMgtJs %>"></script>
<script src="<%= strategicMgtStatusPopDescJs %>"></script>

<!-- Page level style -->
<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
<link href="/resources/ext/fileinput/themes/explorer/theme.css" rel="stylesheet" />
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

<!-- 전략물자관리 목록 -->
<div class="container-fluid-grid container-fluid" >
	<input id="txtSsoname"	type="hidden" value="<%=session.getAttribute("SSONAME"	)%>" />	
	<input id="txtSsoid"	type="hidden" value="<%=session.getAttribute("SSOID"		)%>" />
	<input id="txtRoleSeq"	type="hidden" value="<%=session.getAttribute("ROLE_SEQ"	)%>" />
	<input id="txtRoleName"	type="hidden" value="<%=session.getAttribute("ROLE_NAME"	)%>" />

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<div class="table-responsive" style="vertical-align: middle; ">

				<!-- 검색 조건 -->
				<table border="0" width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
					<tr>
						<td width="100%">
							<table border="0" id="tblSearchBox" style="height: 43px;">
								<!-- search 1 row start -->
								<tr>
									<!-- Project Code -->
									<td style="width: 70px;">
										<label class="" style="">Project Code</label>
									</td>
									<td style="width: 100px;">
										<input id="txtSearchProjectCode" type="text" class="form-control form-control-user required" onKeyup="this.value=this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');">
											<i id="iconSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</input>
									</td>
									<td style="width: 100px;" colspan="2">
										<input id="txtSearchProjectName" type="text" class="form-control form-control-user required" style="font-size:0.5em;" readonly/>
									</td>

									<!-- 판정서 번호 -->
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">판정서 번호</label>
									</td>
									<td style="width: 100px;">
										<input id="txtSearchCertificateNumber" type="text" class="form-control form-control-user" style="width: 120px" autocomplete="off" onKeyup="this.value=this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');"/>
									</td>

									<!-- 판정서 번호 -->
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">요청 번호</label>
									</td>
									<td style="width: 100px;">
										<input id="txtSearchshippingReqNo" type="text" class="form-control form-control-user" style="width: 125px" autocomplete="off" onKeyup="this.value=this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');"/>
									</td>

									<!-- 판정서 번호 -->
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">Invoice No.</label>
									</td>
									<td style="width: 100px;">
										<input id="txtSearchInvoiceNo" type="text" class="form-control form-control-user" style="width: 115px" autocomplete="off" onKeyup="this.value=this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');"/>
									</td>

								</tr>
								<!-- search 1 row end -->
								<!-- search 2 row start -->
								<tr>
									<!-- 생성일 -->
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">생성일</label>
									</td>
									<td >
										<input id="txtSearchCreationDateSt" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:100px;font-size:0.5em; text-align: center" autocomplete="off"/>
									</td>
									<td style="width:15px;text-align: center;">
										~
									</td>
									<td>
										<input id="txtSearchCreationDateEd" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em; text-align: center" autocomplete="off"/>
									</td>

									<!-- 판정상태 -->
									<td style="width: 70px; text-align: right;">
										<a href="#" title="판정상태에 값이 없을 경우에는 다음 상태의 값만 조회됩니다.\n작성중 / 반려 / 승인요청 / 판정요청" style="cursor: default;">
											<i id="iconDlgInfoStatusSearch" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
										</a>
										<label class="" style="text-align: right;">판정상태</label>
									</td>
									<!-- <td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">판정상태</label>
									</td> -->
									<td>
										<select id="selSearchStatus" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value=""></option>
											<option value="All"						>전체 조회		</option>
											<option value="Incomplete"				>작성중		</option>
											<option value="Pre-Judgment"			>판정요청		</option>
											<option value="Pre-Approved"			>승인요청		</option>
											<option value="Pre-Conditional-Approved">조건부승인요청	</option>
											<option value="Judged"					>판정완료		</option>
											<option value="Approved"				>승인완료		</option>
											<option value="Conditional-Approved"	>조건부승인완료	</option>
											<option value="Rejected"				>반려			</option>
										</select>
									</td>

									<!-- 판정종류( ab: 공급업체 전문판정, ba: 두산중공업 자가판정, bb: 두산중공업 전문판정 ) -->
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">판정종류</label>
									</td>
									<td>
										<select id="selSearchJudgmentType" class="form-control form-control-user" style="background-color: #B4D9FD; width: 125px;">
											<option value=""></option>
											<option value="ab">공급업체 전문판정</option>
											<option value="ba">두산에너빌리티(주) 자가판정</option>
											<option value="bb">두산에너빌리티(주) 전문판정</option>
										</select>
									</td>

									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">전략물자 포함 여부</label>
									</td>
									<td>
										<select id="selStrategicItemYn" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">FOB 여부</label>
									</td>
									<td>
										<select id="selFobYn" class="form-control form-control-user" style="background-color: #B4D9FD; width: 125px;">
											<option value="">All</option>
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									
									<td style="width: 70px; text-align: right;">
										<label class="" style="text-align: right;">특송 여부</label>
									</td>
									<td>
										<select id="selSpecialShippingYn" class="form-control form-control-user" style="background-color: #B4D9FD; width: 125px;">
											<option value="">All</option>
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									
								</tr>
								<!-- search 2 row end -->
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
				<!-- 검색 조건 -->

				<!-- 목록 버튼 -->
				<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">
					<button id="btnMainConApproved" authType="SG" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px; background-color: green;">
						<span class="text">조건부승인완료</span>
					</button>

					<button id="btnMainReturn" authType="SG" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="text">반려</span>
					</button>

					<button id="btnMainComApproved" authType="SG" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px; background-color: indigo;">
						<span class="text">승인완료</span>
					</button>

					<button id="btnMainCreateStrategic" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">FOB 전략물자관리 생성</span>
					</button>
				</div>
				<!-- 목록 버튼 -->

				<div id="gridMain" style="padding-top:1px; width:1000px; height:600px;"></div>

			</div>
		</div>
	</div>
</div>
<!-- 전략물자관리 목록 -->

<!-- Project 조회 팝업  -->
<div class="modal hide fade" id="dlgStrategicMgtProjectList" tabindex="-1" role="dialog" aria-labelledby="dlgStrategicMgtProjectListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<input id="dlgStrategicMgtProjectListMode" type="hidden">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgStrategicMgtProjectListTitle">Project 조회</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<table border="0" style="width: 100%;">
							<tr>
								<td style="width: 20px;">
									<label class="" style="">검색</label>
								</td>
								<td style="width: 300px;">
									<input id="txtDlgProjectProjectCode" type="text" class="form-control form-control-user required" onKeyup="this.value=this.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');">
										<i id="iconDlgProjectListSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
									</input>
								</td>
							</tr>
						</table>
					</div>
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="gridDlgProject"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgProjectSelect" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">선택</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Project 조회 팝업  -->

<!-- 전략물자관리 상세 팝업 -->
<div class="modal hide fade" id="strategicMgtInfoPop" tabindex="-1" role="dialog" aria-labelledby="strategicMgtInfoPopTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1350px; max-height: 850px;">
 		<div class="modal-content">
			<div class="modal-header" style="">
				<h6 class="modal-title" id="strategicMgtInfoPopTitle">전략 물자 관리 상세</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="padding: 5px">
				<div class="container-fluid" style="padding: 0px;">
					<div class="row row-sm">

						<!-- 출하 요청 정보 -->
						<div id="mgtInfoPop" class="col-sm-6 col-xl-6 col-lg-6">

							<!-- 출하요청 정보 -->
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<label class="font-weight-bold text-primary">출하 요청 정보</label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">요청번호</label>
										</div>
										<div class="col-sm-8 search_in" style="padding-right : 0">
											<input id="txtMgtInfoPopShippingReqNo" type="text" class="form-control form-control-user readonly" autocomplete="off" readonly>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Description</label>
										</div>
										<div class="col-sm-8 search_in" style="padding-right : 0">
											<input id="txtMgtInfoPopDescription" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">PJT</label>
										</div>
										<div id="mgtInfoPopProjectId" class="col-sm-8" style="padding-right : 0">
											<input id="txtMgtInfoPopProjectId" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div id="mgtInfoNewPopProjectId" class="col-sm-8 form-group row mb-1" style="padding-right : 0">
											<div class="col-sm-4" style="padding-right:0">
												<input id="txtMgtInfoNewProjectId" type="text" class="form-control form-control-user" autocomplete="off" readonly>
												<i id="iconNewProjectSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											</div>
											<!-- <div class="col-sm-8" style="padding-left:0.2rem">
												<input id="txtMgtInfoProjectDesc" type="text" class="form-control form-control-user readonly" autocomplete="off" readonly>
											</div> -->
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">PJT DESC</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtMgtInfoPopProjectDesc" type="text" class="form-control form-control-user readonly" autocomplete="off" readonly>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Invoice No.</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtMgtInfoPopInvoiceNoId" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">구매인도조건</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtMgtInfoPopDeliveryTerms" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
											<select id="selMgtInfoPotDeliveryTerms" class="form-control form-control-user required"></select>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">출하예정일</label>
										</div>
										<div class="col-sm-2" style="padding-right : 0">
											<input id="txtMgtInfoPopShopOutDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">관세환급</label>
										</div>
										<div class="col-sm-3" style="padding-right : 0">
											<input id="txtMgtInfoPopDutyRefundOption" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
											<select id="selMgtInfoPopDutyRefundOption" class="form-control form-control-user required"></select>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<!-- <div id="mgtInfoNewPopDeliveryTerms" class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2"></label>
										</div>
										<div class="col-sm-8 form-group row mb-1" style="padding-right : 0">
											<div class="col-sm-4 text-right font-weight-bold" style="padding-right : 0">
												<select id = "selDlgEditIndeptFlag" class="form-control form-control-user required" style="padding-right : 0">
												</select>
											</div>
											<div class="col-sm-8" style="padding-left:0.2rem">
												<input id="txtDlgEditVendorName" type="text" class="form-control form-control-user required" autocomplete="off">											
												<input id="txtDlgEditVendorId" type="hidden" class="form-control form-control-user required" autocomplete="off">
												<input id="txtDlgEditDeptName" type="text" class="form-control form-control-user required" autocomplete="off">
												<input id="txtDlgEditDeptCode" type="hidden" class="form-control form-control-user required" autocomplete="off">
												<i id="iconNameSearch" class="fas fa-search" authType="S" style="float : right;margin:-16px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											</div>
										</div>
										<div class="col-sm-1" >
										</div>
									</div> -->
									<div id="mgtInfoNewPopDeliveryTerms" class="form-group row mb-1">
										<div class="col-sm-1 text-right font-weight-bold">
											<label class="" style="line-height : 2"></label>
										</div>
										<div class="col-sm-6 form-group row mb-1" style="padding-right : 0">
											<div class="col-sm-4 text-right font-weight-bold" style="padding-right : 0">
												<select id = "selDlgEditIndeptFlag" class="form-control form-control-user required" style="padding-right : 0">
												</select>
											</div>
											<div class="col-sm-6" style="padding-left:1rem">
												<input id="txtDlgEditVendorName" type="text" class="form-control form-control-user required" autocomplete="off">											
												<input id="txtDlgEditVendorId" type="hidden" class="form-control form-control-user required" autocomplete="off">
												<input id="txtDlgEditDeptName" type="text" class="form-control form-control-user required" autocomplete="off">
												<input id="txtDlgEditDeptCode" type="hidden" class="form-control form-control-user required" autocomplete="off">
												<i id="iconNameSearch" class="fas fa-search" authType="S" style="float : right;margin:-16px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											</div>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">사내출하여부</label>
										</div>
										<div class="col-sm-2" style="padding-right : 0">
											<input id="txtMgtInfoPopIndeptFlag" type="text" class="form-control form-control-user readonly" autocomplete="off" readonly>
										</div>
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Supplier Name</label>
										</div>
										<div class="col-sm-3" style="padding-right : 0">
											<input id="txtMgtInfoPopIndeptName" type="text" class="form-control form-control-user readonly" autocomplete="off" readonly>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div id="btnMgtInfoPopIsThirdCountry" class="col-sm-3 text-right font-weight-bold">										
											<label class="" style="line-height : 2">제3국 선적건</label>
											<button class="btn"  style="padding-left:0px; margin-right: -10; color: red;">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
													<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
													<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
												</svg>
											</button>											
										</div>
										<div class="col-sm-2" style="padding-right : 0">
											<input id="txtMgtInfoPopIsThirdCountry" type="checkbox" class="form-control form-control-user " autocomplete="off" >
										</div>
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">전략물자포함 여부</label>
										</div>
										<div class="col-sm-3" style="padding-right : 0">
											<select id="selMgtInfoPopStrategicItemYn" class="form-control form-control-user" disabled><!-- readonly -->
												<option value=""></option>
												<option value="Y">Yes</option>
												<option value="N">No</option>
											</select>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div id="btnMgtInfoPopIsSpecialShipping" class="col-sm-3 text-right font-weight-bold">										
											<label class="" style="line-height : 2">특송</label>
											<!-- <button class="btn"  style="padding-left:0px; margin-right: -10; color: red;">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
													<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
													<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
												</svg>
											</button> -->											
										</div>
										<div class="col-sm-2" style="padding-right : 0">
											<input id="txtMgtInfoPopIsSpecialShipping" type="checkbox" class="form-control form-control-user" autocomplete="off" disabled>
										</div>	
										<div id="btnMgtInfoPopIsFOB" class="col-sm-3 text-right font-weight-bold">										
											<label class="" style="line-height : 2">FOB</label>
											<button class="btn"  style="padding-left:0px; margin-right: -10; color: red;">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
													<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
													<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
												</svg>
											</button>											
										</div>
										<div class="col-sm-2" style="padding-right : 0">
											<input id="txtMgtInfoPopIsFOB" type="checkbox" class="form-control form-control-user non-required" autocomplete="off" disabled>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>									
								</div>
							</div>
							<!-- 출하요청 정보 -->

						</div>
						<!-- 출하 요청 정보 -->

						<!-- Packing List -->
						<div class="col-sm-6 col-xl-6 col-lg-6">
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<label class="font-weight-bold text-primary">Packing List</label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="table-responsive">
										<div id="dlgEditPackingDetail" style="padding-top:4px;height:237px"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- Packing List -->

						<!-- 전략물자 판정 List 등록 -->
						<div class="col-sm-12 col-xl-12 col-lg-12">
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px; padding-bottom: 0rem !important; padding-top: 0rem !important; vertical-align: middle; height: 20px">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;position: absolute; margin-top: 5px">전략물자 판정 List 등록</label>
									<button id="btnPackageNoInfoPop" class="btn"  style="padding-left:120px;padding-top: 0px; color: red;">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
											<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
											<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
										</svg>
										<span>필독</span>
									</button>

									<button id="btnPackageNoDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-trash" ></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">삭제</span>
									</button>
									<button id="btnPackageNoAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right: 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">추가</span>
									</button>

									<button id="btnPackageNoAdd2" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right: 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">복사</span>
									</button>

									<button id="btnPackageNoExcelUpload" authType="E" class="btn btn-success btn-icon-split btn-sm" role="button" style="float: right; margin-right: 4px; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-file-excel" ></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">Upload</span>
									</button>
									<button id="btnDlgEditExcelDownload" authType="R" class="btn btn-success btn-icon-split btn-sm" role="button" style="float: right; margin-right: 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-file-excel"></i></span>
										<span class="text" style="padding: 0.2rem 0.5rem; font-size:0.8em">DownLoad</span>
									</button>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="table-responsive">
										<div id="gridPackageNoDetail" style="padding-top:4px"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- 전략물자 판정 List 등록 -->

						<!-- 첨부파일 -->
						<div class="col-sm-6 col-xl-6 col-lg-6">
							<div class="card shadow mb-2">
								<div  class="card-header py-1" style="padding-bottom: 1.5rem !important; padding-top: 0rem !important; vertical-align: middle; cursor: pointer; height: 19px;">
									<label class="font-weight-bold text-primary" style="cursor: pointer;">첨부 파일</label>
									<button id="btnStrategicMgtInfoPopFile" class="btn"  style="padding-left:0px; margin-right: -30; color: red;">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
											<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
											<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
										</svg>
									</button>
									<button id="btnCopyFile" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right: 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">복사</span>
									</button>									
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row">
										<div class="col-sm-12">
											<input id="txtStrategicMgtInfoPopFile" type="file" name="txtStrategicMgtInfoPopFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 첨부파일 -->

						<!-- Comment -->
						<div class="col-sm-6 col-xl-6 col-lg-6">
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px; padding-bottom: 0rem !important; padding-top: 0rem !important; vertical-align: middle; height: 20px">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;position: absolute; margin-top: 5px">Comment</label>

									<button id="btnCommentDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-trash" ></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">삭제</span>
									</button>
									<button id="btnCommentAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right: 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">추가</span>
									</button>
									
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="table-responsive">
										<div id="gridComment" style="padding-top:4px"></div>
									</div>
								</div>
							</div>
						</div>
						<!-- Comment -->

					</div>
				</div>
			</div>
			<div class="modal-footer" style="text-align: right; padding-bottom: 10px; padding-top: 10px;">
				<button id="btnStrategicMgtInfoPopSave" authType="S" class="btn btn-primary btn-icon-split btn-sm" data-dismiss="modal" style="background-color: orange;">
					<span class="text">저장</span>
				</button>
				<button id="btnStrategicMgtInfoPopPreJudgment" authType="S" class="btn btn-primary btn-icon-split btn-sm approval-func" data-dismiss="modal" style="background-color: purple;">
					<span class="text">판정요청</span>
				</button>
				<button id="btnStrategicMgtInfoPopPreApprove" authType="S" class="btn btn-primary btn-icon-split btn-sm approval-func" data-dismiss="modal" style="background-color: yellow; color: black;">
					<span class="text">승인요청</span>
				</button>
				<button id="btnStrategicMgtInfoPopConApprove" authType="S" class="btn btn-primary btn-icon-split btn-sm approval-func" data-dismiss="modal" style="background-color: black;">
					<span class="text">조건부승인요청</span>
				</button>
				<button id="btnStrategicMgtInfoPopComJudgmented" authType="SG" class="btn btn-primary btn-icon-split btn-sm approval-func" data-dismiss="modal" style="background-color: blue;">
					<span class="text">판정완료</span>
				</button>
				<button id="btnStrategicMgtInfoPopComApproved" authType="SG" class="btn btn-primary btn-icon-split btn-sm approval-func" data-dismiss="modal" style="background-color: indigo;">
					<span class="text">승인완료</span>
				</button>
				<button id="btnStrategicMgtInfoPopConApproved" authType="SG" class="btn btn-primary btn-icon-split btn-sm approval-func" data-dismiss="modal" style="background-color: green;">
					<span class="text">조건부승인완료</span>
				</button>
				<button id="btnStrategicMgtInfoPopReturn" authType="SG" class="btn btn-danger btn-icon-split btn-sm approval-func" data-dismiss="modal">
					<span class="text">반려</span>
				</button>
				<button id="btnDeleteManualData" authType="SG" class="btn btn-danger btn-icon-split btn-sm" data-dismiss="modal">
					<span class="text">삭제</span>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- 전략물자관리 상세 팝업 -->

<!-- 전략물자 판정 List 안내문 팝업 -->
<div class="modal hide fade" id="packageNoInfoPop" tabindex="-1" role="dialog" aria-labelledby="packageNoInfoPopTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 815px;max-height: 500px;">
		<div class="modal-content">
			<div class="modal-header" style="">
				<h6 class="modal-title" id="packageNoInfoPopTitle">전략물자 판정 List 안내문</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10; line-height: 1.5">
					<h8>
						<b>o 상황허가( CATCH-ALL )</b>
						<br>&nbsp;&nbsp;&nbsp;&nbsp;전략물자에는 해당되지 아니하나 그 물품등의 구매자나 최종사용자가 이를 대량파괴무기등의 제조/개발/사용 또는 보관 등의 용도로
						<br>&nbsp;&nbsp;&nbsp;&nbsp;사용 할 우려가 있는 경우 수출 전에 정부의 심사를 거치도록 하는 제도. 정부는 우려도가 높은 거래상대방이나 품목을 지정하여
						<br>&nbsp;&nbsp;&nbsp;&nbsp;상황허가를 의무화 할 수 있습니다.
						<br>
						<b> - 상황허가 대상 우려거래자</b>
						<br>&nbsp;&nbsp;&nbsp;&nbsp;산업통상자원부 장관은 UN 안전보장이사회에서 이란, 알카에다, 탈레반, 북한 등 대량파괴무기 확산 국가 및 단체와 관련하여 제재하고 
						<br>&nbsp;&nbsp;&nbsp;&nbsp;있는 우려거래자에 대해서는 대외무역법제19조3항과 전략물자수출입고시 제50조3항에 따라 전략물자가 아닌 물품과 기술을 수출하는
						<br>&nbsp;&nbsp;&nbsp;&nbsp;경우에도 반드시 정부의 상황허가를 받도록 하고 있습니다.
						<br>&nbsp;&nbsp;&nbsp;&nbsp;(단, 전략물자수출입고시 제50조4항 및 별표2호의3에 따라 농수산물, 예술품 등 일부의 품목에 대해서는 상황허가 의무가 면제됩니다.)
					</h8>
				</div>
			</div>

			<div class="modal-body" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10; line-height: 1.5">
					<h8>
						<b>o 판정분류 안내</b>
						<br>수출자가 두산중공업㈜일 경우 유효한 판정서는 아래와 같습니다.
						<font color="red"><b>
							<br>&nbsp;&nbsp;&nbsp;&nbsp;①구매(공급)업체의 전문판정서
							<br>&nbsp;&nbsp;&nbsp;&nbsp;②두산중 전문판정서
							<br>&nbsp;&nbsp;&nbsp;&nbsp;③두산중 자가판정서
						</b></font>
						<br>구매( 공급 )업체의 자가판정서는 공급업체가 수출자일 경우 유효하며, 당사가 수출자일 경우에는 당사의 전략물자 판정을 위한 참고자료로
						<br>활용 됩니다. ( 공급업체의 전문판정서가 없는 경우 CR팀 전략물자관리파트로 전략물자 판정신청을 하여 주시기 바랍니다. )
					</h8>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 전략물자 판정 List 안내문 팝업 -->

<!-- Comment 추가 팝업 -->
<div class="modal hide fade" id="commentAddPop" tabindex="-1" role="dialog" aria-labelledby="commentAddPopTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgMailAddTitle">Comment 추가</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class=""></label>
						</div>
						<div class="col-sm-10">
							<select id="selBaseComment" class="form-control form-control-user" style="height: 18px; margin-bottom: 4px; background-color: #B4D9FD;">
								<option value="">Comments</option>
								<option value="공급사 전문판정 결과 &quot;비해당 &quot; 으로 전략물자 수출허가 해당사항 없으므로 승인함."	>1. 공급사 전문판정 결과 "비해당" 으로 전략물자 수출허가 해당사항 없으므로 승인함.		</option>
								<option value="당사 자가판정 결과  &quot;비해당 &quot; 으로 전략물자 수출허가 해당사항 없으므로 승인함."	>2. 당사 자가판정 결과 "비해당" 으로 전략물자 수출허가 해당사항 없으므로 승인함.		</option>
								<option value="당사 전문판정 결과  &quot;비해당 &quot; 으로 전략물자 수출허가 해당사항 없으므로 승인함."	>3. 당사 전문판정 결과 "비해당" 으로 전략물자 수출허가 해당사항 없으므로 승인함.		</option>
								<option value="제3국 선적 건으로 전략물자 수출허가 해당사항 없으므로 승인함."						>4. 제3국 선적 건으로 전략물자 수출허가 해당사항 없으므로 승인함.					</option>
								<option value="자가판정 완료. 판정정보 입력 후 승인 요청 하시기 바랍니다."							>5. 자가판정 완료. 판정정보 입력 후 승인 요청 하시기 바랍니다.						</option>
								<option value="전문판정 완료. 판정정보 입력 후 승인 요청 하시기 바랍니다."							>6. 전문판정 완료. 판정정보 입력 후 승인 요청 하시기 바랍니다.						</option>
							</select>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold">
							<label class="required">Comment</label>
						</div>
						<div class="col-sm-10">
							<input id="txtCommentAddPopComment" type="text" autocomplete="off" class="form-control form-control-user required" >
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnCommentAddPop" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">추가</span>
				</button>			
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Comment 추가 팝업 -->

<div class="modal hide fade" id="strategicMgtInfoPopIsThirdCountry" tabindex="-1" role="dialog" aria-labelledby="strategicMgtInfoPopIsThirdCountryTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;max-height: 500px;">
		<div class="modal-content">
			<div class="modal-header" style="">
				<h6 class="modal-title" id="strategicMgtInfoPopIsThirdCountryTitle">제3국 선적건 안내문</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10; line-height: 1.5">
					<h8>
1. 한국이 아닌 제3국에서 제3국으로 <br/>&nbsp;&nbsp;&nbsp;&nbsp;<b>선적(수출)시 수출자명이 두산에너빌리티(주)가 아닌 경우 전략물자 확인 여부 Pass 처리가 가능합니다.</b><br/>
2. 수출자명이 <b>두산에너빌리티(주)일 경우 선적(수출)전 전략물자 여부 확인이 필요하며,<br/>&nbsp;&nbsp;&nbsp;&nbsp;물류운영팀 전략물자관리파트로 전략물자 판정 신청</b>을 하여 주시기 바랍니다.<br/>
3. 해외플랜트현장에 주로 사용되는 <b>Valve류, Pump류, 열교환기류, 현장시약류, 티타늄 튜브류, 라우터 및 서버 등 네트워크 장비류</b> 등<br/>&nbsp;&nbsp;&nbsp;&nbsp;전략물자에 해당될 가능성이 높은 품목의 경우 물류운영팀 전략물자관리파트로 선적(수출)전 문의하여 주시기 바랍니다.
	
					</h8>
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

<div class="modal hide fade" id="strategicMgtInfoPopIsSpecialShipping" tabindex="-1" role="dialog" aria-labelledby="strategicMgtInfoPopIsSpecialShippingTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;max-height: 500px;">
		<div class="modal-content">
			<div class="modal-header" style="">
				<h6 class="modal-title" id="strategicMgtInfoPopIsSpecialShippingTitle">특송 안내문</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10; line-height: 1.5">
					<h8>
1. 특송 건에 대한 전략물자관리 안내 문구..
	
					</h8>
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

<div class="modal hide fade" id="strategicMgtInfoPopIsFOB" tabindex="-1" role="dialog" aria-labelledby="strategicMgtInfoPopIsFOBTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;max-height: 500px;">
		<div class="modal-content">
			<div class="modal-header" style="">
				<h6 class="modal-title" id="strategicMgtInfoPopIsFOBTitle">FOB 안내문</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10; line-height: 1.5">
					<h8>
1. 국내운송 역무만 존재하는 건에 대한 전략물자 관리 입력입니다.<br />
2. FOB건의 전략물자관리는 별도의 출하요청 정보를 입력하지 않기 때문에, 전략물자관리 생성화면에서 주요 정보를 함께 입력해주어야 합니다.
					</h8>
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

<!-- 첨부파일 안내문 팝업 -->
<div class="modal hide fade" id="strategicMgtInfoPopFile" tabindex="-1" role="dialog" aria-labelledby="strategicMgtInfoPopFileTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;max-height: 500px;">
		<div class="modal-content">
			<div class="modal-header" style="">
				<h6 class="modal-title" id="strategicMgtInfoPopFileTitle">첨부파일 안내문</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10; line-height: 1.5">
					<h8>
						첨부 파일명은 판정서 번호 + 확장자
						<font color="red"><b> ( ex. 2120299888.pdf )</b></font> 형식으로 작성하여 주시기 바랍니다.
					</h8>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 첨부파일 안내문 팝업 -->

<!-- 전략물자 상태 팝업 -->
<div class="modal hide fade" id="strategicMgtStatusPop" tabindex="-1" role="dialog" aria-labelledby="strategicMgtStatusPopTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;max-height: 500px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgStrategicMgtProjectListTitle"></h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="gridStrategicMgtStatusPop"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-body" style="margin-top: -40;" >
				<div class="" style="padding-top:2px; padding-bottom:2px; margin-left: 10;">
					<h8 id="labStrategicMgtStatusPopInfo">전략물자 상태 팝업 설명 란</h8>
				</div>
<!-- 				<div style="margin-left: 12; margin-top: 10; margin-right: 12; margin-bottom: 12;">
					<img id="imgStrategicMgtStatusPop" src="" style="width:540px; height:400px;" />
				</div> -->
			</div>
		</div>
	</div>
</div>
<!-- 전략물자 상태 팝업 -->

<!-- 전략물자 판정 List ExcelUpload -->
<div id="dlgEditPopUp"></div>
<!-- 전략물자 판정 List ExcelUpload -->

<input id="alertValidate"				type="hidden" value="<spring:message code='alert.validate'		/>"/>
<input id="alertSave"					type="hidden" value="<spring:message code='alert.save'			/>"/><!-- 저장 하시겠습니까?	-->
<input id="alertSaveSuccess"			type="hidden" value="<spring:message code='alert.save.success'	/>"/>
<input id="alertDelete"					type="hidden" value="<spring:message code='alert.delete'		/>"/><!-- 삭제 하시겠습니까?	-->
<input id="alertDeleteSuccess"			type="hidden" value="<spring:message code='alert.delete.success'/>"/><!-- 삭제되었습니다.	-->
<input id="alertEditCheck"				type="hidden" value="변경된 데이터가 있습니다. 저장 하시겠습니까?"/>
<input id="alertGridSelectDataNull"		type="hidden" value="선택된 항목이 없습니다."/>
<input id="alertGridDataNull"			type="hidden" value="저장할 데이터가 없습니다."/>
<input id="alertGridEditDataNull"		type="hidden" value="수정한 데이터가 없습니다."/>
<input id="selectNullTextAll"	    	type="hidden" value="전체"/>
<input id="selectNullTextSel"			type="hidden" value="선택"/>
<input id="alertCommentFail"			type="hidden" value="코멘트를 3자 이상 입력 해주세요."/>
<input id="alertDeleteFail2" type="hidden" value="메일 발송 오류, IT 담당자에게 문의해주세요."/>

<input id="alertFileCopy" 	   type="hidden" value="전략물자관리 생성 시에는 파일 복사 기능을 사용할 수 없습니다."/>
<input id="alertCompleteFail1" type="hidden" value="변동사항이 없습니다."/>
<input id="alertCompleteFail2" type="hidden" value="사용중인 Invoice No가 존재하며, PROJECT, 관세환급여부, 배송조건이 생성되어있는 Invoice No와 다릅니다."/>
<input id="alertCompleteFail3" type="hidden" value="필수 첨부파일이 첨부되지 않았습니다. 첨부파일 탭에서 필수 첨부문서를 확인해주세요."/>
<input id="alertCompleteFail4" type="hidden" value="Invoice No 저장 중 오류가 발생하였습니다. 시스템 담당자에게 문의해주세요."/>

<input id="alertInfoStatusSearch" type="hidden" value="
			판정상태에 값이 없을 경우에는 다음 상태의 값만 조회됩니다.<br/>
			작성중 / 반려 / 승인요청 / 판정요청" />

<input id="confirmFobCreate" type="hidden" value="
	[FOB 전략물자관리 생성 안내]</br>
	1. 수출운송조건이 FOB*로, 국내운송 역무만 수행하는 건에 대한 전략물자 관리 입력입니다. (*두산에너빌리티와 공급사 간의 구매인도조건이 아니라, 해당 PJT 의 운송조건에 해당합니다.)</br>
	2. FOB건의 전략물자관리는 별도의 출하요청 정보를 입력하지 않기 때문에, 전략물자관리 생성화면에서 주요 정보를 함께 입력해주어야 합니다.</br>
	3. 국내운송은 별도로 운송 요청 진행 바랍니다.</br>
	* 담당자 : (운송)이윤숙 수석, (전략물자관리)김상옥 수석, 강아연 선임, 이재열 수석" />