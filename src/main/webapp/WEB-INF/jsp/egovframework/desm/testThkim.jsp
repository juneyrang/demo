<!--
	기자재 일정관리 > 기자재 일정관리 > 목록( 조회/팝업 높이조정 버전 )
-->
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<script src="/resources/ext/bluebird/bluebird.min.js"		></script>
<script src="/resources/ext/fileinput/js/fileinput.js"		></script>
<script src="/resources/ext/fileinput/themes/fas/theme.js"	></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"		></script>
<script src="/resources/js/xlsx.full.min.js"></script>

<!-- Page level scripts -->
<script src="/resources/scripts/ajaxSetup.js"></script>
<script src="/resources/scripts/testThkim.js"></script>
<script src="/resources/gridJs/GridE.js"></script>
<script type="text/javascript">
	$(document).ready( function() {
		//페이지 Title 설정
		//$(document).attr("title", $("#lblPageTitle").text() + " "  + $(document).attr("title"));
	});
</script>

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

<!-- Begin Page Content -->
<div class="container-fluid-grid container-fluid" >
	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<div class="table-responsive" style="vertical-align: middle; ">

				<table border="0"width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
					<tr>
						<td width="100%">
							<table border="0" id="tblSearchBox" style="height: 43px;">
								<!-- search 1 row start -->
								<tr>
									<td style="width: 70px;">
										<label class="" style="">Project Code</label>
									</td>
									<td style="width: 100px;">
										<input id="txtProjectCode" type="text" class="form-control form-control-user required">
											<i id="iconSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</input>
									</td>
									<td style="width: 100px;">
										<input id="txtProjectName" type="text" class="form-control form-control-user required" style="font-size:0.5em;" readonly/>
									</td>

									<td style="width: 120px;">
										<select id="selSearchKey1" class="form-control form-control-user" style="background-color: #B4D9FD;">
										</select>
									</td>
									<td style="width: 100px;">
										<input id="txtSearchValue1" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<td style="width: 100px;">
										<select id="selSearchKey2" class="form-control form-control-user" style="background-color: #B4D9FD;">
										</select>
									</td>
									<td >
										<select id="selSearchKey3" class="form-control form-control-user" style="background-color: #B4D9FD; width: 91px;">
										</select>
									</td>
									<td style="width: 100px;">
										<input id="txtSearchValue2" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em; text-align: center" autocomplete="off"/>
									</td>
									<td style="width:15px;text-align: center;">
										~
									</td>
									<td style="width: 100px;">
										<input id="txtSearchValue3" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em; text-align: center" autocomplete="off"/>
									</td>

									<td style="width: 80px;">
										<label class="" style="letter-spacing :0.7px;">On/Offshore</label>
									</td>
									<td style="width: 140px;">
										<select id="selOnoOfshore" class="form-control form-control-user" style="font-size: 12px; background-color: #B4D9FD; width: 91px;">
										</select>
									</td>
								</tr>
								<!-- search 1 row end -->
								<!-- search 2 row start -->
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>
										<select id="selSearchKey4" class="form-control form-control-user" style="background-color: #B4D9FD;">
										</select>
									</td>
									<td>
										<input id="txtSearchValue4" type="text" class="form-control form-control-user" style="width: 150px" autocomplete="off"/>
									</td>

									<td>
										<select id="selSearchKey5" class="form-control form-control-user" style="background-color: #B4D9FD;">
										</select>
									</td>
									<td>
										<select id="selSearchKey6" class="form-control form-control-user" style="background-color: #B4D9FD;">
										</select>
									</td>
									<td >
										<input id="txtSearchValue5" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em; text-align: center" autocomplete="off"/>
									</td>
									<td style="width:15px;text-align: center;">
										~
									</td>
									<td>
										<input id="txtSearchValue6" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em; text-align: center" autocomplete="off"/>
									</td>

									<td colspan="2" style="letter-spacing :0.6px;">
										<span style="">Pending Item (Plan < Expected)</span> <input id="ckIssueCheck" type="checkbox" style="width:15px; height:15px;vertical-align: middle; margin:3px">
									</td>
								</tr>
								<!-- search 2 row end -->
							</table>
						</td>
						<td style="vertical-align:top; text-align:right; width:100%;">
							<table border="0" style="width: 100%; height: 48px;">
								<tr>
									<td style="vertical-align:middle; text-align:right" width="100%">
										<button id="btnSearch" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#4599EE !important; margin-top: 0.5px;">
											<span class="icon" style="padding:0.375rem 0.3rem 0.375rem 0.75rem; background:0">
												<i class="fas fa-search"></i>
											</span>
											<span class="text" style="padding:0.375rem 0.75rem 0.375rem 0rem;">Search</span>
										</button>
									</td>
								</tr>
								<tr>
									<td style="vertical-align:middle; text-align:right" width="100%">
										<button id="btnResete" class="btn btn-primary btn-icon-split" role="button" style="width:80px; background-color:#BEC2C6 !important; color: #000000;">
											<span class="icon" style="padding:0.375rem 0.3rem 0.375rem 0.75rem; background:0">
												<i class="fa fa-sync"></i>
											</span>
											<span class="text" style="padding:0.375rem 0.75rem 0.375rem 0rem;">Reset</span>
										</button>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>

				<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">

					<button id="btnL1" class="btn btn-info btn-icon-split btn-sm" role="button" style="height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-stream"></i></span>
						<span class="text" id="btnL1Text">L1</span>
					</button>

					<button id="btnL2" class="btn btn-info btn-icon-split btn-sm" role="button" style="height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-stream"></i></span>
						<span class="text" id="btnL2Text">L2</span>
					</button>

					<button id="btnL3" class="btn btn-info btn-icon-split btn-sm" role="button" style="height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-stream"></i></span>
						<span class="text" id="btnL3Text">L3</span>
					</button>

					<button id="btnSave" class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text">저장</span>
					</button>

					<button id="btnExcelUpload" class="btn btn-success btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
						<span class="text">Excel Change Upload</span>
					</button>

					<button id="btnExcelDownload" class="btn btn-success btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
						<span class="text">Excel Download</span>
					</button>

					<button id="btnDeleteItem" class="btn btn-danger btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
						<span class="text">Item 삭제</span>
					</button>

					<button id="btnItemCopy" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-clone"></i></span>
						<span class="text">복사 Item 생성</span>
					</button>

					<button id="btnLowItemCopy" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-clone"></i></span>
						<span class="text">하위 Item 생성</span>
					</button>

					<button id="btnCreateItem" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">Item 생성</span>
					</button>

				</div>

				<div id="gridMain" style="padding-top:1px; width:1000px; height:600px;"></div>

			</div>
		</div>
	</div>
</div>

<div class="modal hide fade" id="dlgExcelUpload" tabindex="-1" role="dialog" aria-labelledby="dlgExcelUploadTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1200px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dlgExcelUploadTitle">Excel Change Upload</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div  id="gridDlgExcelUpLoad" style="padding-top:1px"></div>
				<div class="dp_n" id="gridDlgExcelDownLoad" style="padding-top:1px"></div>
			</div>

			<div class="modal-footer">
				<input  type="file" id="btnDlgExcelUploadFile" style="display:none"/>

				<button id="btnDlgExcelUploadDownload" class="btn btn-success btn-icon-split btn-sm" >
					<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
					<span class="text">Excel Download</span>
				</button>

				<button id="btnDlgExcelUploadUpload" class="btn btn-success btn-icon-split btn-sm" >
					<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
					<span class="text">Excel Change Upload</span>
				</button>

				<button id="btnDlgExcelUploadSave" class="btn btn-success btn-icon-split btn-sm" role="button">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">저장</span>
				</button>

				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal hide fade" id="dlgInvEdit" tabindex="-1" role="dialog" aria-labelledby="dlgInvEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dlgInvEditTitle">Invoice 관리</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div id="gridDlgInv" style="padding-top:1px"></div>
			</div>

			<div class="modal-footer">

				<button id="btnDlgInvEditAdd" class="btn btn-primary btn-icon-split btn-sm" >
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">추가</span>
				</button>
				<button id="btnDlgInvEditDelete" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text">삭제</span>
				</button>
				<button id="btnDlgInvEditSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text"><spring:message code="button.save" /></span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal hide fade" id="dlgAdminAddList" tabindex="-1" role="dialog" aria-labelledby="dlgAdminAddListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dlgAdminAddListTitle">담당자 정보 조회</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold" >
							<label class="required" style="line-height: 2;">담당자</label>
						</div>
						<div class="col-sm-3">
							<input id="txtDlgAdminAddListEmpName" type="text" class="form-control form-control-user required" >
							<input id="txtDlgAdminAddListEmpAd" type="hidden" class="form-control form-control-user" >
							<input id="txtDlgAdminAddListDeptCode" type="hidden" class="form-control form-control-user" >
						</div>
						<div class="col-sm-7">
							<input id="txtDlgAdminAddListDeptName" type="text" class="form-control form-control-user required" readonly>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgAdminAddListSelect" class="btn btn-success btn-icon-split btn-sm">
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

<!-- 파일첨부 팝업 -->
<div class="modal hide fade" id="dlgAttList" tabindex="-1" role="dialog" aria-labelledby="dlgAttListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dlgAttListTitle">파일첨부</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="col-sm-12">
							<input id="txtDlgAttListFile" type="file" name="txtDlgAttListFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
						</div>
					</div>
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
<!-- 파일첨부 팝업 -->

<!-- Item 신규등록 팝업 -->
<div class="modal hide fade" id="dlgCreateItem" tabindex="-1" role="dialog" aria-labelledby="dlgCreateItemTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 900px;">
		<div class="modal-content">
			<div class="modal-header" style="padding: 5px">
				<h5 class="modal-title" id="dlgCreateItemTitle">Item 신규등록</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" style="padding: 5px">
				<div class="container-fluid" style="padding: 0px;">
					<div class="row row-sm">
 						<div class="col-sm-6 col-xl-6 col-lg-6" style="max-width: 65%; min-width: 65%">
<!-- 						<div class="col-sm-7 col-xl-7 col-lg-7" > -->

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<h7 class="m-0 font-weight-bold text-primary" >Item 정보</h7>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold required">
											<label style="line-height : 2">Project Code</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 search_in">
											<input id="txtdlgCreateItemProjectCode" type="text" class="form-control form-control-user required" >
										</div>
										<div style="padding-left:0" class="col-sm-6">
											<input id="txtdlgCreateItemProjectName" type="text" class="form-control form-control-user required" readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2">Item</label>
										</div>
										<div style="padding-left:0" class="col-sm-9 search_in">
											<input id="txtdlgCreateItemItem" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2">Item (분납단위)</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 search_in">
											<input id="txtdlgCreateItemBatchName" type="text" class="form-control form-control-user " >
										</div>
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2">Shipment No</label>
										</div>
										<div style="padding-left:0" class="col-sm-3">
											<input id="txtdlgCreateItemTrkDescriptionName" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2"> Activity Code</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 search_in">
											<input id="txtdlgCreateItemTaskNumber" type="text" class="form-control form-control-user " >
										</div>
										<div style="padding-left:0" class="col-sm-6">
											<input id="txtdlgCreateItemTaskName" type="text" class="form-control form-control-user " readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2">L3 ID</label>
										</div>
										<div style="padding-left:0" class="col-sm-3">
											<input id="txtdlgCreateItemPrimaveraId" type="text" class="form-control form-control-user " >
										</div>
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">

										</div>
										<div style="padding-left:0" class="col-sm-3">
										</div>
									</div>
									<div class="form-group row mb-1">
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2">Payment Milestone</label>
										</div>
										<div style="padding-left:0" class="col-sm-3">
											<select id="seldlgCreateItemPaymentMilestone" class="form-control form-control-user" >
											</select>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-right font-weight-bold">
											<label style="line-height : 2">On/Offshore</label>
										</div>
										<div style="padding-left:0" class="col-sm-3">
											<select id="seldlgCreateItemOnoOfshore" class="form-control form-control-user" >
											</select>
										</div>
									</div>
								</div>
							</div>

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<h7 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">담당자 정보</h7>
									<button id="btnCreateItemDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px">
										<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
										<span class="text" style="font-size:0.8em">삭제</span>
									</button>
									<button id="btnCreateItemAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px">
										<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="font-size:0.8em">추가</span>
									</button>
								</div>
								<div class="card-body" style="padding: 1px">
									<div id="gridCreateItem" style="padding-top:2px;"></div>
								</div>
							</div>
						</div>

 						<div class="col-sm-6 col-xl-6 col-lg-6" style="padding-left:0; max-width: 35%; min-width: 35%"">
<!-- 						<div class="col-sm-5 col-xl-5 col-lg-5" style="padding-left:0;"> -->
							<div style="text-align: right; padding: 5px">
								<button id="btnDlgCreateItemSave" class="btn btn-success btn-icon-split btn-sm">
									<span class="icon text-white-50"><i class="fas fa-save"></i></span>
									<span class="text">저장</span>
								</button>
								<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
									<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
									<span class="text"><spring:message code="button.close" /></span>
								</button>
							</div>
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<h7 class="m-0 font-weight-bold text-primary">일정정보</h7>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">MPS(PR)</label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Plan(L3)</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemMpsPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Expected</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemMpsExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Actual</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemMpsActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem; width: 85">구매기간(Day)</label>
										</div>
										<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
											<label class=""></label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemPurchaseDuration" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">PO</label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Plan(L3)</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemPoPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Expected</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemPoExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Actual</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemPoActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">제작기간(Day)</label>
										</div>
										<div style="padding-left:0" class="col-sm-2">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemMakeDuration" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">Cargo Ready</label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Plan</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemCargoPlanDate" type="text" class="form-control form-control-user " readonly>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Expected</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemCargoExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Actual</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemCargoActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">배선기간</label>
										</div>
										<div style="padding-left:0" class="col-sm-2">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemShipmentDuration" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem; width: 79">FOB/지정장소</label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Plan(L3)</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemFobPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">상차도</label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Expected</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemFobExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Actual</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemFobActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold ">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0; min-width: 40%; max-width: 40%" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">PO Promised </label>
										</div>
										<div style="padding-left:0"  class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemCargoPromisedDate" type="text" class="form-control form-control-user " readonly>
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">운송/통관</label>
										</div>
										<div style="padding-left:0" class="col-sm-2">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemTransDuration" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">On Site</label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Plan(L3)</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemOnsitePlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>

									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Expected</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemOnsiteExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
											<label style="line-height : 2">Actual</label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemOnsiteActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
										</div>
									</div>
									<hr class="m-1" />
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
											<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">progress</label>
										</div>
										<div style="padding-left:0" class="col-sm-2">
											<label style="line-height : 2"></label>
										</div>
										<div style="padding-left:0" class="col-sm-3 text-max-min-width">
											<input id="txtdlgCreateItemProgress" type="text" class="form-control form-control-user " >
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Item 신규등록 팝업 -->

<!-- Item 일정 관리 팝업 -->
<div class="modal hide fade" id="dlgItemSchedule" tabindex="-1" role="dialog" aria-labelledby="dlgItemScheduleTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 900px;">
		<div class="modal-content">
			<div class="modal-header" style="padding: 5px">
				<h5 class="modal-title" id="dlgItemScheduleTitle">Item 일정관리</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="padding-left: 0px;padding-bottom: 0px;padding-right: 0px;margin-right: 0px;margin-top: 0px;margin-bottom: 0px;padding-top: 0px;" >
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" style="padding: 5px">
				<div class="container-fluid" style="padding: 0px;">
					<div class="row row-sm">
						<div class="col-sm-7 col-xl-7 col-lg-7" >
							<div class="card shadow mb-2">
								<div class="card-body" style="padding: 1px">
									<div class="table-responsive">
										<div id="gridItemScheduleItem"></div>
									</div>
								</div>
							</div>

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<label class="font-weight-bold text-primary">Item 정보</label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Item (분납단위)</label>
										</div>
										<div class="col-sm-8 search_in" style="padding-right : 0">
											<input id="txtDlgItemScheduleTrkItemName" type="text" class="form-control form-control-user " autocomplete="off">
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Shipment No</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtDlgItemScheduleAttribute10" type="text" class="form-control form-control-user " autocomplete="off">
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">선적국가</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtDlgItemScheduleAttribute7" type="text" class="form-control form-control-user " autocomplete="off">
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">L3 ID</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtDlgItemSchedulePrimaveraId" type="text" class="form-control form-control-user " autocomplete="off">
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Payment Milestone</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<select id="selDlgItemSchedulePaymentMilestone"  class="form-control form-control-user" >
											</select>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">On/Offshore</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<select id="selDlgItemScheduleOnOfshore" class="form-control form-control-user" >
											</select>
										</div>
										<div class="col-sm-1" >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Invoice No</label>
										</div>
										<div class="col-sm-8" style="padding-right : 0">
											<input id="txtDlgItemScheduleSelInvoiceNum" type="text" class="form-control form-control-user " readonly>
										</div>
										<div class="col-sm-1" >
											<button id="btnDlgItemScheduleSelInvoiceNumEdit" class="btn btn-primary btn-icon-split" role="button" style="width:21px;height:21px">
												<span class="icon" background:0" style="padding-top: 1px; padding-bottom: 1px;">
													<i class="fas fa-search"></i>
												</span>
											</button>
										</div>
									</div>
								</div>
							</div>

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<label class="font-weight-bold text-primary">Packing List</label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row">
										<div class="col-sm-12">
											<input id="txtDlgItemScheduleFile" type="file" name="txtDlgItemScheduleFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
										</div>
									</div>
								</div>
							</div>

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px; padding-bottom: 0rem !important; padding-top: 0rem !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;position: absolute; margin-top: 5px">담당자 정보</label>

									<button id="btnDlgItemScheduleAdminDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 20px;">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-trash" ></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">삭제</span>
									</button>
									<button id="btnDlgItemScheduleAdminAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 20px">
										<span class="icon text-white-50" style="padding: 0.1rem 0.5rem;"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" style="padding: 0.1rem 0.5rem; font-size:0.8em">추가</span>
									</button>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="table-responsive">
										<div id="gridItemScheduleAdmin" style="padding-top:4px"></div>
									</div>
								</div>
							</div>
						</div>

						<div class="col-sm-5 col-xl-5 col-lg-5" style="padding-left:0;">

							<div style="text-align: right;">
								<button id="btnDlgItemScheduleEdit" class="btn btn-primary btn-icon-split btn-sm" data-dismiss="modal">
									<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
									<span class="text">수정</span>
								</button>
								<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
									<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
									<span class="text"><spring:message code="button.close" /></span>
								</button>
							</div>

							<div class="card-body tab-content" style="padding:2px 0 0 0;">
								<!-- 탭 1( 일정 ) start -->
								<div class="tab-pane active show" id="tabCont1">
									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<label class="font-weight-bold text-primary">일정 정보</label>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">MPS(PR)</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleMpsPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleMpsExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleMpsActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">구매기간</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemSchedulePurchaseDuration" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">PO</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemSchedulePoPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemSchedulePoExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class="" style="line-height : 2"></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemSchedulePoAtcualDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">제작기간 Day</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleMakeDuration" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">Cargo Ready</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan&nbsp;</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleCargoPlanDate" type="text" class="form-control form-control-user " readonly>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleCargoExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleCargoActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">배선기간</label>
												</div>
												<div class="col-sm-2" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleShipmentDuration" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem; width: 79">FOB/지정장소</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleFobPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class="text-info" style="padding-left: 0.8rem;">상차도</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleFobExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class="text-info"></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleFobActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">운송/통관</label>
												</div>
												<div class="col-sm-2" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleTransDuration" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class="text-info" style="line-height: 2; padding-left: 0.8rem;">On Site</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleOnsitePlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3 text-max-min-width">
													<input id="txtDlgItemScheduleOnsiteExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold label-max-min-width" style="height: 20px;">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold" style="height: 20px;">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3 text-max-min-width" style="height: 20px;">
													<input id="txtDlgItemScheduleOnsiteActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 탭 1( 일정) end -->
								<!-- 탭 2( Issue ) start -->
								<div class="tab-pane" id="tabCont2">

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<h7 class="m-0 font-weight-bold text-primary">Issue List</h7>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="table-responsive">
												<div id="grid111"></div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<h7 class="m-0 font-weight-bold text-primary">Issue 내용</h7>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="required">Issue 제목</label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user required" >
												</div>
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">Issue 발생일</label>
												</div>
												<div class="col-sm-3">
													<input id="iDate1" name="popDate" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">조치완료(예정)일</label>
												</div>
												<div class="col-sm-3">
													<input id="iDate11" name="popDate" type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">조치완료</label>
												</div>
												<div class="col-sm-3">
													<select class="form-control form-control-user" >
															<option value=""></option>
															<option value="Y">Yes</option>
															<option value="N">No</option>
													</select>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">지연(단축)일</label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">변경 예정일</label>
												</div>
												<div class="col-sm-3">
													<input id="iDate111" name="popDate" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">Issue 내용</label>
												</div>
												<div class="col-sm-9">
													<textarea class="form-control form-control-user " cols="80" rows="6"></textarea>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="">조치/협의 내용</label>
												</div>
												<div class="col-sm-9">
													<textarea class="form-control form-control-user " cols="80" rows="6"></textarea>
												</div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<h7 class="m-0 font-weight-bold text-primary">관련 담당자</h7>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="table-responsive">
												<div id="grid1111"></div>
											</div>
										</div>
									</div>
								</div>
								<!-- 탭 2( Issue ) end -->
								<!-- 탭 3( 알림 ) start -->
								<div class="tab-pane" id="tabCont3">

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<h7 class="m-0 font-weight-bold text-primary">알람 List</h7>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="table-responsive">
												<div id="grid11111"></div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<h7 class="m-0 font-weight-bold text-primary">알람 내용</h7>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="">알람 제목</label>
												</div>
												<div class="col-sm-10">
													<input type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="">알람 내용</label>
												</div>
												<div class="col-sm-10">
													<textarea class="form-control form-control-user " cols="80" rows="6"></textarea>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="">발송 예정일</label>
												</div>
												<div class="col-sm-4">
													<select class="form-control form-control-user" >
															<option value=""></option>
															<option value="Y">MPS Expectd Date</option>
															<option value="N">PO Expectd Date</option>
															<option value="N">Cargo Ready Expectd Date</option>
															<option value="N">FOB Expectd Date</option>
															<option value="N">on Site Expectd Date</option>
													</select>
												</div>
												<div class="col-sm-1 text-right font-weight-bold">
													<label class="">기준</label>
												</div>
												<div class="col-sm-2">
													<input type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-1 text-right font-weight-bold">
													<label class="">일</label>
												</div>
												<div class="col-sm-2">
													<select class="form-control form-control-user" >
															<option value=""></option>
															<option value="Y">전</option>
															<option value="N">후</option>
													</select>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="">변환 날짜</label>
												</div>
												<div class="col-sm-4">
													<input id="aDate1" name="popDate" type="text" class="form-control form-control-user " >
												</div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
											<h7 class="m-0 font-weight-bold text-primary">관련 담당자</h7>
										</div>
										<div class="card-body" style="padding: 1px">
											<div class="table-responsive">
												<div id="grid111111"></div>
											</div>
										</div>
									</div>
								</div>
								<!-- 탭 3( 알림 ) end -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Item 일정 관리 팝업 -->

<div class="modal hide fade" id="dlgProjectList" tabindex="-1" role="dialog" aria-labelledby="dlgProjectListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dlgProjectListTitle">Project 조회</h5>
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
									<input id="txtDlgProjectProjectCode" type="text" class="form-control form-control-user required"/>
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

<input id="alertSelectRow"				type="hidden" value="<spring:message code='alert.select.row'	/>"/>
<input id="alertValidate"				type="hidden" value="<spring:message code='alert.validate'		/>"/>
<input id="alertSave"					type="hidden" value="<spring:message code='alert.save'			/>"/>
<input id="alertSaveSuccess"			type="hidden" value="<spring:message code='alert.save.success'	/>"/>
<input id="alertDelete"					type="hidden" value="<spring:message code='alert.delete'		/>"/>
<input id="alertDeleteSuccess"			type="hidden" value="<spring:message code='alert.delete.success'/>"/>
<input id="alertEditCheck"				type="hidden" value="변경된 데이터가 있습니다. 저장 하시겠습니까?"/>
<input id="alertSaveAlreadyInv"			type="hidden" value="입력하신 Invoice Number가 이미 존재합니다.저장 하시겠습니까?"/>
<input id="alertGridSelectDataAll"		type="hidden" value="한 개의 항목만 선택하셔야 합니다."/>
<input id="alertGridSelectDataNull"		type="hidden" value="선택된 항목이 없습니다."/>
<input id="alertGridDataNull"			type="hidden" value="저장할 데이터가 없습니다."/>
<input id="alertGridEditDataNull"		type="hidden" value="수정한 데이터가 없습니다."/>
<input id="alertGridCopyRowNull"		type="hidden" value="저장 후 복사 할 수있습니다."/>
<input id="alertGridCopyRowChildNode"	type="hidden" value="선택한 Item이 최하위 Item일 경우에만 복사 가능합니다."/>
<input id="selectNullTextAll"	    	type="hidden" value="전체"/>
<input id="selectNullTextSel"			type="hidden" value="선택"/>