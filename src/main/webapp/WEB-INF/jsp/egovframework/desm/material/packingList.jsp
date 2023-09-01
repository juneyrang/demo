<!--
	운송관리 - 현장자재관리
-->
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String ajaxSetup = "/resources/scripts/ajaxSetup.js?rv=" + rV;
    String packingList = "/resources/scripts/material/packingList.js?rv=" + rV;
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
<%--<script src="/resources/scripts/ajaxSetup.js"	></script> --%>
<script src="/resources/gridJs/GridE.js"		></script>
<%--<script src="/resources/scripts/material/packingList.js"	></script> --%>
<script src="<%= ajaxSetup %>"></script>
<script src="<%= packingList %>"></script>

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

	/* 검색조건 라벨 */
	.search_td {
		width: 120px; padding:1px;
	}
    .search_label {
		width: 100%; height:100%; background-color: #B4D9FD; text-align: center; display:table; vertical-align: middle;
	}
</style>

<!-- Begin Page Content -->
<form id="application_form" name="application_form">
<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />
<div class="container-fluid-grid container-fluid" >
	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<div class="table-responsive" style="vertical-align: middle; ">

				<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
					<tr>
						<td width="100%">
							<table border="0" id="tblSearchBox" style="height: 48px; border-collapse : separate; border-spacing : 0.095rem;">
								<!-- search 1 row start -->
								<tr>
									<!-- Project Code -->
									<td style="width: 70px;">
										<label class="" style="">Project Code</label>
									</td>
									<td style="width: 100px;">
										<input id="p_project_code" name="p_project_code" type="text" class="form-control form-control-user required" readonly>
										</input>
									</td>
									<td style="width: 110px; padding-right: 10px;">
										<input id="p_project_name" name="p_project_name" type="text" class="form-control form-control-user required" style="font-size:0.5em;" readonly/>
									</td>

									<!-- item Name -->
									<td class="search_td">
										<label class="search_label" style="">Item Name</label>
									</td>
									<td style="width: 110px; padding-right: 10px;">
										<input id="p_item_name" name="p_item_name" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<!-- 항차 No -->
									<td class="search_td">
										<label class="search_label" style=""><spring:message code="grid.col.shipping.order" /></label>
									</td>
									<td style="width: 160px;  padding-right: 10px;">
										<select id="p_attribute10" name="p_attribute10" class="form-control form-control-user">
											<option value=''>All</option>
										</select>
									</td>

									<!-- invoice No -->
									<td class="search_td">
										<label class="search_label" style="">Packing list No.</label>
									</td>
									<td style="width: 160px;  padding-right: 10px;">
										<input id="p_packing_list_no" name="p_packing_list_no" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<!-- Package No. -->
									<td class="search_td">
										<label class="search_label" style="">Package No</label>
									</td>
									<td>
										<input id="p_package_no" name="p_package_no" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

								</tr>
								<!-- search 1 row end -->
								<!-- search 2 row start -->
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>

									<!-- Package No. -->
									<td class="search_td">
										<label class="search_label" style="">Description</label>
									</td>
									<td>
										<input id="p_desc" name="p_desc" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<!-- Vendor -->
									<td class="search_td">
										<label class="search_label" style="">Vendor</label>
									</td>
									<td>
										<input id="p_vendor" name="p_vendor" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<!-- Package No. -->
									<td class="search_td">
										<label class="search_label" style="">Drawing No.</label>
									</td>
									<td>
										<input id="p_drawing_no" name="p_drawing_no" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<!-- Tag No. -->
									<td class="search_td">
										<label class="search_label" style="">Item(Tag) No.</label>
									</td>
									<td>
										<input id="p_tag_no" name="p_tag_no" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
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
										<button id="btnReset" authType="R" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;height: 22px;">
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

				<div id="gridMain" style="padding-top:1px; width:1000px; height:800px;"></div>

			</div>
		</div>
	</div>
</div>

<!-- Project 조회 팝업  -->
<div class="modal hide fade" id="dlgProjectList" tabindex="-1" role="dialog" aria-labelledby="dlgProjectListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgProjectListTitle"><spring:message code='modal.project.search.title'/></h6>
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
									<label class="" style=""><spring:message code='modal.project.search.label'/></label>
								</td>
								<td style="width: 300px;">
									<input id="txtDlgProjectProjectCode" type="text" class="form-control form-control-user required" autocomplete="off">
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
					<span class="text"><spring:message code="button.desm.select" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>
</form>

