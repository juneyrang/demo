<!--
	기자재 일정관리 > L3 일정관리
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
    String idsmSetup3Js = "/resources/scripts/idsmSparePart.js?rv=" + rV;
%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<jsp:include page="./language.jsp"></jsp:include>

<script src="/resources/ext/bluebird/bluebird.min.js"		></script>
<script src="/resources/ext/fileinput/js/fileinput.js"		></script>
<script src="/resources/ext/fileinput/themes/fas/theme.js"	></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"		></script>
<script src="/resources/js/xlsx.full.min.js"				></script>

<!-- Page level scripts -->
<%--<script src="/resources/scripts/ajaxSetup.js"	></script>
<script src="/resources/scripts/idsmSetup3.js"	></script> --%>
<script src="<%= ajaxSetupJs %>"></script>
<script src="<%= idsmSetup3Js %>"></script>
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

<!-- Begin Page Content -->
<div class="container-fluid-grid container-fluid" id="mainPage">
	<input id="txtDesmRoleCd" type="hidden" value="<%=session.getAttribute("ROLE_SEQ")%>" />
	<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<div class="table-responsive" style="vertical-align: middle; ">

				<table border="0" width="100%" style="border: 1px solid #d1d3e2; margin-bottom: 0.2rem;">
					<tr>
						<td width="100%">
							<table border="0" id="tblSearchBox" style="height: 72px;">
								<!-- search 1 row start -->
								<tr>
									<td style="width: 100px;">
										<label class="" style="float:right; padding-right:2px;">Project Code</label>
									</td>
									<td style="width: 100px;">
										<input id="txtProjectCode" type="text" class="form-control form-control-user required">
											<i id="iconSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</input>
									</td>
									<td style="width: 100px;">
										<input id="txtProjectName" type="text" class="form-control form-control-user required" style="font-size:0.5em;" readonly/>
									</td>

									<td style="width: 100px;">
										<label class="" style="float:right; padding-right:2px;">Type</label>
									</td>
									<td style="width: 150px;">
										<select id="selSearchType" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="Spare Part">Spare Part</option>
											<option value="Special Tool">Special Tool</option>
										</select>
									</td>
									
									<td style="width: 100px;">
										<label class="" style="float:right; padding-right:2px;">Category</label>
									</td>
									<td style="width: 150px;">
										<select id="selSearchCategory" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
											<option value="Strategic">Strategic</option>
											<option value="Mandatory">Mandatory</option>
											<option value="Recommended">Recommended</option>
											<option value="Mechanical">Mechanical</option>
											<option value="Electrical">Electrical</option>
											<option value="I&C">I&C</option>
										</select>
									</td>
									
									<td style="width: 100px;">
										<label class="" style="float:right; padding-right:2px;"><spring:message code="grid.col.shipping.order" /></label>
									</td>
									<td style="width: 150px;">
										<select id="selSearchShipmentNo" class="form-control form-control-user" style="background-color: #B4D9FD;">
											<option value="">All</option>
										</select>
									</td>
									
									<td style="width: 100px;">
										<label class="" style="float:right; padding-right:2px;">Desc System</label>
									</td>
									<td style="width: 150px;">
										<input id="txtSearchDescSystem" type="text" class="form-control form-control-user" style="font-size:0.5em;" />
									</td>
									
								</tr>
								<!-- search 1 row end -->
								<!-- search 2 row start -->
								<tr>
									<td style="text-align: right;padding-right:10px">
									</td>
									<td colspan="2">
									</td>	
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Invoice No</label>
									</td>
									<td>
										<input id="txtSearchInvoiceNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>	
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Package No</label>
									</td>
									<td>
										<input id="txtSearchPackageNo" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Desc Equipment</label>
									</td>
									<td>
										<input id="txtSearchDescEquipment" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Manufacturer</label>
									</td>
									<td>
										<input id="txtSearchManufacturer" type="text" class="form-control form-control-user " autocomplete="off">
									</td>
									
								</tr>
								<!-- search 2 row end -->
								<!-- search 3 row start -->
								<tr>
									<td style="text-align: right;padding-right:10px">
									</td>
									<td colspan="2">
									</td>	
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Level1</label>
									</td>
									<td>
										<input id="txtSearchLevel1" type="text" class="form-control form-control-user " autocomplete="off">
									</td>	
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Level2</label>
									</td>
									<td>
										<input id="txtSearchLevel2" type="text" class="form-control form-control-user " autocomplete="off">
									</td>	
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Level3</label>
									</td>
									<td>
										<input id="txtSearchLevel3" type="text" class="form-control form-control-user " autocomplete="off">
									</td>	
									
									<td style="text-align: right;padding-right:10px">
										<label class="" style="">Level4</label>
									</td>
									<td>
										<input id="txtSearchLevel4" type="text" class="form-control form-control-user " autocomplete="off">
									</td>	
									
								</tr>
								<!-- search 3 row end -->
							</table>
						</td>
						<td style="vertical-align: middle; text-align:right; width:100%;">
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

					<button id="btnSave" authType="S"  class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-save"></i></span>
						<span class="text"><spring:message code='button.save'/></span>
					</button>

					<button id="btnExcelUpload" authType="E"  class="btn btn-success btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
						<span class="text">Excel Change Upload</span>
					</button>
					<!-- <button id="btnExcelDownload" authType="R" class="btn btn-success btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
						<span class="text">Excel Download</span>
					</button> -->
					<button id="btnDeleteItem" authType="S"  class="btn btn-danger btn-icon-split btn-sm" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
						<span class="text"><spring:message code='button.desm.del.item'/></span>
					</button>

					<button id="btnCreateItem" authType="S" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; margin-left:2px; height: 23px;">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text"><spring:message code='button.desm.new.item'/></span>
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
				<h6 class="modal-title" id="dlgExcelUploadTitle">Excel Change Upload</h6>
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

<!-- 파일첨부 팝업
<div class="modal hide fade" id="dlgAttList" tabindex="-1" role="dialog" aria-labelledby="dlgAttListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgAttListTitle"><spring:message code='modal.att.list.title'/></h6>
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
</div> -->
<!-- 파일첨부 팝업 -->

<!-- Item 신규등록 팝업 -->
<div class="modal hide fade" id="dlgCreateItem" tabindex="-1" role="dialog" aria-labelledby="dlgCreateItemTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1000px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgCreateItemTitle"><spring:message code='modal.create.item.title'	/></h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			
			
			<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<input id="txtDlgIdsmAttachGrpCd" type="hidden" />
					<div class="card shadow mb-2" style="padding-bottom: 5px;">
						<div style="text-align: right; padding: 5px">									
							<button id="btnDlgCreateItemAtt" class="btn btn-primary btn-icon-split btn-sm">
								<span class="icon text-white-50" style="padding:0.15rem 0.3rem"><i class="fas fa-file-upload"></i></span>
								<span class="text" style="padding:0.15rem 0.3rem"><spring:message code="button.desm.file" /></span>
							</button>
							<button id="btnDlgCreateItemSave" class="btn btn-success btn-icon-split btn-sm">
								<span class="icon text-white-50"><i class="fas fa-save"></i></span>
								<span class="text"><spring:message code='button.save'	/></span>
							</button>
							<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
								<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
								<span class="text"><spring:message code="button.close" /></span>
							</button>
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Number</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmSpstCode" type="text" class="form-control form-control-user" autocomplete="off" readonly>
							</div>
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Project No</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmProjectNo" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
							</div>																
						</div>	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Type</label>
							</div>
							<div class="col-sm-4" >
								<select id="selDlgIdsmType" class="form-control form-control-user" style="background-color: #B4D9FD;">
									<option value="Spare Part">Spare Part</option>
									<option value="Special Tool">Special Tool</option>
								</select>
							</div>		
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Category</label>
							</div>
							<div class="col-sm-4" >
								<select id="selDlgIdsmCategory" class="form-control form-control-user" style="background-color: #B4D9FD;">
								</select>
							</div>																
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Desc. of SYSTEM/PKG</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmDescSystem" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Desc. of Equipment</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmDescEquipment" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>																
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">KKS NO. of Equip.</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmKksNo" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Description of SP/ST</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmDescType" type="text" class="form-control form-control-user" autocomplete="off">
							</div>																
						</div>			
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Key Specification of SP/ST</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmKeySpecification" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Item No / Part No</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmItemPartNo" type="text" class="form-control form-control-user" autocomplete="off">
							</div>																
						</div>	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Storage Classification</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmStorageClassification" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Shelf life (Month)</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmShelfLife" type="text" class="form-control form-control-user" autocomplete="off">
							</div>																
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Installed QTY</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmInstalledQty" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Recommended QTY</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmRecommendedQty" type="text" class="form-control form-control-user currency required" autocomplete="off">
							</div>																
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Special tool QTY</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmStQty" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Unit</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmUnit" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>																
						</div>			
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Currency</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmCurrency" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Unit Price</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmunitPrice" type="text" class="form-control form-control-user currency required" autocomplete="off">
							</div>																
						</div>	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Delivery (Week)</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmDelivery" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	
							<!-- <div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">ATTACH GRP CD</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmAttachGrpCd" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	 -->	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Manufacturer</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmManufacturer" type="text" class="form-control form-control-user" autocomplete="off">
							</div>														
						</div>
						<!-- <div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">L CM</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmLcm" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">W CM</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmWcm" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>																	
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">H CM</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmHcm" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Dimension(m) (WxDxH)</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmDimension" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>																	
						</div>		 -->	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Weight(Kg)</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmWeight" type="text" class="form-control form-control-user currency" autocomplete="off">
							</div>				
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Dimension(m) (WxDxH)</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmDimension" type="text" class="form-control form-control-user" autocomplete="off">
							</div>
							<!-- <div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">TRK ITEM NAME</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmTrkItemSeq" type="hidden" />
								<input id="txtDlgIdsmTrkItemName" type="text" class="form-control form-control-user required">
									<i id="iconSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
								</input>
							</div> -->																	
						</div>	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">		
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Related Drawing</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmRelatedDrawing" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
							</div>
							<div class="col-sm-4" >
							</div>														
						</div>			
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Level1</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmLevel1" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Level2</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmLevel2" type="text" class="form-control form-control-user currency required" autocomplete="off">
							</div>																
						</div>			
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Level3</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmLevel3" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Level4</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmLevel4" type="text" class="form-control form-control-user required" autocomplete="off">
							</div>																
						</div>	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Item Name</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmTrkItemName" type="text" class="form-control form-control-user" autocomplete="off">
							</div>
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Shipment No</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmShipmentNo" type="text" class="form-control form-control-user" autocomplete="off">
							</div>																
						</div>	
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Shipment Seq</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmShipmentSeq" type="text" class="form-control form-control-user" autocomplete="off">
							</div>	
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Invoice No</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmInvoiceNo" type="text" class="form-control form-control-user" autocomplete="off">
							</div>																	
						</div>
						<div class="form-group row mb-1" style="padding: 1px 5px 1px 1px">
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Package No</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmPackageNo" type="text" class="form-control form-control-user" autocomplete="off">
							</div>
							<div class="col-sm-2 text-right font-weight-bold ">
								<label class="" style="line-height : 2">Material Code</label>
							</div>
							<div class="col-sm-4" >
								<input id="txtDlgIdsmMaterialCode" type="text" class="form-control form-control-user" autocomplete="off">
							</div>																	
						</div>											
					</div>
				</div>
			</div> 
		</div>
	</div>
</div>
<!-- Item 신규등록 팝업 -->

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
									<input id="txtDlgProjectProjectCode" type="text" class="form-control form-control-user required">
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
<!-- Project 조회 팝업  -->

<div id="dlgDesmCreateItemPopUp"></div>

<input id="alertInputNumber" type="hidden" value=" 필드는 숫자만 입력이 가능합니다."/>