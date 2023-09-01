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

<!-- Page level scripts -->
<script src="/resources/scripts/testSong2.js"></script>
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
/* 		font-size:0.8rem !important; */
		line-height: 1;
/*		border-radius: 0rem;*/
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
		font-style: oblique;
		outline:none;
		box-sizing: border-box;
		color:black;
/*		border-radius: 0rem;*/
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
/*		border-radius: 0rem;*/
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

	div[class*=MenuMain] {z-index: 3000 !important;}
	div[class*=Message] {z-index: 3000 !important;}
	div[class*=DisabledHard] {z-index: 2900 !important;}
	.GridDisabled {z-index: 2900 !important;}
	.Green { background-color:#8F8 !important; }

	img.ui-datepicker-trigger {
		float:right;
		margin-top:calc(-2.7em + 5px);
		margin-right:5px;
		margin-bottom:0px;
		cursor:pointer;
	}

	select{
		font-size:0.5rem !important;
		height: 20px !important;
		padding-top: 0px !important;
		padding-bottom: 0px !important;
	}
	input{
		font-size:0.6rem;
	}

	.btn-sm, .btn-group-sm > .btn {
		font-size: 0.9em;
/*		border-radius: 0rem;*/
	}

	button {
		font-size: 0.9em;
		width:80px;
		height:26px;
	}

	input[type="text"]{
		height: 20px;
	    font-size: 11px;
	}

	td{
		padding-bottom: 0px;
		padding-top: 0px;
		font-size: 0.7em;
	}

 	.mb-4{
		margin-bottom: 0rem !important;
	}

	btn, btn-primary, btn-file{
		height:26px
	}
</style>

<!-- Begin Page Content -->
<div class="container-fluid-grid container-fluid" >
	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid">
			<div class="table-responsive">

				<table border="0" width="100%">
					<tr>
						<td width="100%">
							<table id="tblSearchBox" border="0">
								<!-- search 1 row start -->
								<tr>
									<td width="70">
										<label class="" >Project Code</label>
									</td>
									<td width="100" >
										<input id="txtProjectCode" type="text" class="form-control form-control-user required" value=""/>
									</td>
									<td width="100">
										<input id="txtProjectName" type="text" class="form-control form-control-user required" readonly value=""/>
									</td>

									<td width="110">
										<select id="selSearchKey1" class="form-control form-control-user" >
										</select>
									</td>
									<td width="100">
										<input id="txtSearchValue1" type="text" class="form-control form-control-user" style="width: 100px"/>
									</td>

									<!-- 2021.09.28. 추가 -->
									<td width="100">
										<select id="selSearchKey7" class="form-control form-control-user" >
										</select>
									</td>
									<td width="100">
										<input id="txtSearchValue7" type="text" class="form-control form-control-user" style="width: 100px"/>
									</td>

									<td width="106">
										<select id="selSearchKey2" class="form-control form-control-user" >
										</select>
									</td>
									<td width="200">
										<table border="0">
											<tr>
												<td>
													<input id="txtSearchValue2" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em;"/>
												</td>
												<td style="width:10px;text-align: center;">
													~
												</td>
												<td>
													<input id="txtSearchValue3" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em;"/>
												</td>
											</tr>
										</table>
									</td>
									<td width="140">
										<label class="" >On/Offshore</label>
									</td>
									<td width="95">
										<select id="selOnoOfshore" class="form-control form-control-user" >

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
										<select id="selSearchKey4" class="form-control form-control-user" >
										</select>
									</td>
									<td>
										<input id="txtSearchValue4" type="text" class="form-control form-control-user" style="width: 100px"/>
									</td>

									<td>
										<select id="selSearchKey8" class="form-control form-control-user" >
										</select>
									</td>
									<td>
										<input id="txtSearchValue8" type="text" class="form-control form-control-user" style="width: 100px"/>
									</td>

									<td>
										<select id="selSearchKey5" class="form-control form-control-user" >
										</select>
									</td>
									<td >
										<table border="0">
											<tr>
												<td>
													<input id="txtSearchValue5" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em;"/>
												</td>
												<td style="width:10px;text-align: center;">
													~
												</td>
												<td>
													<input id="txtSearchValue6" name="inpDatePicker" type="text" class="form-control form-control-user" placeholder="" title="" style="width:95px;font-size:0.5em;"/>
												</td>
											</tr>
										</table>
									</td>
									<td >
										<label class="" >
											Pending Item (Plan < Expected)
										</label>
									</td>
									<td>
										<input id="ckIssueCheck" type="checkbox" style="width:15px; height:15px;">
									</td>
								</tr>
								<!-- search 2 row end -->
							</table>
						</td>
						<td style="vertical-align:top; text-align:right; width:100%;">
							<table border="0" width="100%">
								<tr>
									<td style="vertical-align:middle; text-align:right" width="100%">
 										<button id="btnSearch" class="btn btn-primary btn-icon-split" role="button" style="line-height:1; width:70px; text-align:center" >
											<span class="text" >Search</span>
										</button>
										</button>
									</td>
								</tr>
								<tr>
									<td style="vertical-align:middle; text-align:right" width="100%">
										<button id="btnResete" class="btn btn-secondary btn-icon-split" role="button" style="line-height:1; width:70px; text-align:center">
											<span class="text">Reset</span>
										</button>
									</td>
								</tr>
								<tr>
									<td></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<table width="100%">
					<tr>
						<td width="30%">
							<div id="toolbarLeft" style="text-align: left; padding-bottom: 2px; padding-top: 2px; padding-right: 3px;">
								<button id="btnL1" class="btn btn-primary btn-icon-split btn-sm" role="button" style="width:40px;">
									<span class="text">L1</span>
								</button>
								<button id="btnL2" class="btn btn-primary btn-icon-split btn-sm" role="button" style="width:40px;" >
									<span class="text">L2​</span>
								</button>
								<button id="btnL3" class="btn btn-primary btn-icon-split btn-sm" role="button" style="width:40px;" >
									<span class="text">L3​​</span>
								</button>
							</div>
						</td>
						<td width="70%">
							<div id="toolbarRight" style="text-align: right; padding-bottom: 2px; padding-top: 2px; padding-right: 3px;">
								<button id="btnSave" class="btn btn-primary btn-icon-split btn-sm" role="button" style="font-size:0.9em;" >
									<span class="text">저장</span>
								</button>
								<button id="btnExcelDown" class="btn btn-primary btn-icon-split btn-sm" role="button" style="font-size:0.9em;">
									<span class="text">Excel Down​</span>
								</button>
								<button id="btnCopyItem" class="btn btn-primary btn-icon-split btn-sm" role="button" style="width:90px;">
									<span class="text">복사Item생성​​</span>
								</button>
								<button id="btnCreateItem" class="btn btn-primary btn-icon-split btn-sm" role="button" style="width:90px;">
									<span class="text">하위Item생성​​</span>
								</button>
								<button id="btnDelItem" class="btn btn-primary btn-icon-split btn-sm" role="button" >
									<span class="text">Item 삭제​​</span>
								</button>
								<button id="btnExcelUpload​" class="btn btn-primary btn-icon-split btn-sm" role="button" style="width:130px;">
									<span class="text">Excel Change Upload​</span>
								</button>
							</div>
						</td>
					</tr>
				</table>
				<div id="gridMain" style="padding-top:1px"></div>
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

<div class="modal hide fade" id="dlgCreateItem" tabindex="-1" role="dialog" aria-labelledby="dlgCreateItemTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1200px;">
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
						<div class="col-sm-6 col-xl-6 col-lg-6">

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<h6 class="m-0 font-weight-bold text-primary" >Item 정보</h6>
								</div>
								<div class="card-body" style="padding: 5px">
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
									<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">담당자 정보</h6>
									<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px">
										<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
										<span class="text" >삭제</span>
									</button>
									<button id="btnCreateItemAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px">
										<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
										<span class="text" >추가</span>
									</button>
								</div>
								<div class="card-body" style="padding: 5px">
									<div id="gridCreateItem" style="padding-top:2px;"></div>
								</div>
							</div>
						</div>

						<div class="col-sm-6 col-xl-6 col-lg-6" style="padding-left:0;">
									<div class="card shadow mb-2">
										<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px"><!-- <div class="card-header py-2"> -->
											<h6 class="m-0 font-weight-bold text-primary">일정정보</h6>
										</div>
										<div class="card-body" style="padding: 5px">
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">MPS(PR)</label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Plan(L3)</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemMpsPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Expected</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemMpsExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Actual</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemMpsActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">

												</div>
												<div style="padding-left:0" class="col-sm-3">

												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-4 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">구매기간 (Day)</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemPurchaseDuration" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">

												</div>
												<div style="padding-left:0" class="col-sm-3">

												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">PO</label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Plan(L3)</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemPoPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Expected</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemPoExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Actual</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemPoActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<label style="line-height : 2"></label>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-4 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">제작기간 (Day)</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemMakeDuration" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">Cargo Ready</label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Plan</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemCargoPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " readonly>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Expected</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemCargoExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Actual</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemCargoActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<label style="line-height : 2"></label>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">배선기간</label>
												</div>
												<div style="padding-left:0" class="col-sm-2">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemShipmentDuration" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">FOB/지정장소</label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Plan(L3)</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemFobPlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Expected</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemFobExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info">상차도</label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Actual</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemFobActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">PO Promised </label>
												</div>
												<div style="padding-left:0"  class="col-sm-3">
													<input id="txtdlgCreateItemCargoPromisedDate" name="inpDatePicker" type="text" class="form-control form-control-user " readonly>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">운송/통관</label>
												</div>
												<div style="padding-left:0" class="col-sm-2">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemTransDuration" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">On Site</label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Plan(L3)</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemOnsitePlanDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Expected</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemOnsiteExpectedDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2">Actual</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemOnsiteActualDate" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div style="padding-left:0" class="col-sm-2 text-right font-weight-bold">
													<label style="line-height : 2"></label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<label style="line-height : 2"></label>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-4 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">progress</label>
												</div>
												<div style="padding-left:0" class="col-sm-3">
													<input id="txtdlgCreateItemProgress" type="text" class="form-control form-control-user " >
												</div>
											</div>
										</div>
									</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer" style="padding: 5px">

				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Item 일정 관리 팝업 -->
<div class="modal hide fade" id="treeModal" tabindex="-1" role="dialog" aria-labelledby="treeModalTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1200px;">
		<div class="modal-content">
			<div class="modal-header" style="padding: 5px">
				<h5 class="modal-title" id="treeModalTitle">Item 일정 관리</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="treeModalHtml" style="padding: 5px">
				<div class="container-fluid" style="padding: 0px;">
					<!-- Page Heading -->

					<div class="row row-sm">
						<div class="col-sm-6 col-xl-6 col-lg-6">

							<!-- DataTales -->
							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<h6 class="m-0 font-weight-bold text-primary"><label style="line-height : 2"></h6>
								</div>
								<div class="card-body" style="padding: 5px">
									<div class="table-responsive">
										<div id="grid11"></div>

									</div>
								</div>
							</div>

							<div class="card shadow mb-2">
								<div class="card-header py-1" style="padding-top:2px; padding-bottom:2px">
									<h6 class="m-0 font-weight-bold text-primary" >Item 정보</h6>
								</div>
								<div class="card-body" style="padding: 5px">
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="transform: translate(0%, 50%)">Item (분납단위)</label>
										</div>
										<div class="col-sm-9 search_in">
											<input type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Shipment No</label>
										</div>
										<div class="col-sm-9">
											<input type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">선적국가</label>
										</div>
										<div class="col-sm-9">
											<input type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">L3 ID</label>
										</div>
										<div class="col-sm-9">
											<input type="text" class="form-control form-control-user " >
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">Payment Milestone</label>
										</div>
										<div class="col-sm-9">
											<select class="form-control form-control-user" >
												<option value=""></option>
												<option value="Y">Yes</option>
												<option value="N">No</option>
											</select>
										</div>
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-3 text-right font-weight-bold">
											<label class="" style="line-height : 2">On/Offshore</label>
										</div>
										<div class="col-sm-9">
											<select class="form-control form-control-user" >
												<option value=""></option>
												<option value="Y">Onshore</option>
												<option value="N">Offshore</option>
											</select>
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
									<h6 class="m-0 font-weight-bold text-primary">Packing List 1</h6>
								</div>
								<div class="card-body" style="padding: 5px">
									<div class="form-group row">
										<div class="col-sm-12">
											<input id="txtEvidenceFile" type="file" name="txtEvidenceFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
										</div>
									</div>
								</div>
							</div>

							<div class="card shadow mb-2">
								<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px"><!-- <div class="card-header py-2"> -->
									<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">담당자 정보</h6><!-- style="padding-top: 4px; float: left;" -->

									<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
										<!-- <span class="icon text-white-50"><i class="fas fa-trash"></i></span> -->
										<span class="text" >삭제</span>
									</button>
									<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px; width: 50px;">
										<!-- <span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span> -->
										<span class="text" >추가</span>
									</button>
								</div>
								<div class="card-body" style="padding: 5px">
									<div class="table-responsive">

										<div id="grid22" style="padding-top:4px"></div>

									</div>
								</div>
							</div>
						</div>

						<div class="col-sm-6 col-xl-6 col-lg-6" style="padding-left:0;">

							<nav class="nav nav-tabs " style="height: 30px">
								<a class="nav-link active"	data-toggle="tab" href="#tabCont1" style="height: 30px"><h6>일정</h6>		</a>
								<a class="nav-link"			data-toggle="tab" href="#tabCont2" style="height: 30px"><h6>Issue</h6>	</a>
								<a class="nav-link"			data-toggle="tab" href="#tabCont3" style="height: 30px"><h6>알림</h6>		</a>
							</nav>

							<div class="card-body tab-content" style="padding:0px 0 0 0;">

								<!-- Item 일정 관리 팝업 > 일정 탭-->
								<div class="tab-pane active show" id="tabCont1">
									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px"><!-- <div class="card-header py-2"> -->
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">일정정보</h6>
											<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right; height: 25px"">
												<span class="text" >일정수정</span>
											</button>

										</div>
										<div class="card-body" style="padding: 5px">
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">MPS(PR)</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3">
													<input id="date1" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3">
													<input id="date2" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3">
													<input id="date3" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<label class=""></label>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">PO</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3">
													<input id="date11" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3">
													<input id="date22" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3">
													<input id="date33" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<label class=""></label>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">제작기간 Day</label>
												</div>
												<div class="col-sm-2">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">Cargo Ready</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan</label>
												</div>
												<div class="col-sm-3">
													<input id="date111" name="inpDatePicker" type="text" class="form-control form-control-user " readonly>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3">
													<input id="date222" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3">
													<input id="date333" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<label class=""></label>
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">배선기간</label>
												</div>
												<div class="col-sm-2">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">FOB/지정장소</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3">
													<input id="date1111" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info">상차도</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3">
													<input id="date2222" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3">
													<input id="date3333" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">운송/통관</label>
												</div>
												<div class="col-sm-2">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user " >
												</div>
											</div>
											<hr class="m-1" />
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class="text-info" style="line-height : 2">On Site</label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Plan(L3)</label>
												</div>
												<div class="col-sm-3">
													<input id="date11111" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Expected</label>
												</div>
												<div class="col-sm-3">
													<input id="date22222" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-left font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">Actual</label>
												</div>
												<div class="col-sm-3">
													<input id="date33333" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-2 text-right font-weight-bold">
													<label class=""></label>
												</div>
												<div class="col-sm-3">
													<label class=""></label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- Item 일정 관리 팝업 > 일정 탭-->

								<!-- Item 일정 관리 팝업 > Issue 탭-->
								<div class="tab-pane" id="tabCont2">

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px">
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">Issue List</h6>
											<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
												<span class="text" >삭제</span>
											</button>
										</div>
										<div class="card-body" style="padding: 5px">
											<div class="table-responsive">
												<div id="grid111"></div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px">
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">Issue 내용</h6>

											<button id="btnSave" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
												<span class="text" >Save</span>
											</button>
											<button id="btnSaveMail" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px; width: 115px;">
												<span class="text" >Save & Send Mail</span>
											</button>
											<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px; width: 50px;">
												<span class="text" >신규</span>
											</button>
										</div>
										<div class="card-body" style="padding: 5px">
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="required" style="line-height : 2">Issue 제목</label>
												</div>
												<div class="col-sm-9">
													<input type="text" class="form-control form-control-user required" >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="" style="line-height : 2">Issue 발생일</label>
												</div>
												<div class="col-sm-3">
													<input id="iDate1" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="" style="line-height : 2">조치완료(예정)일</label>
												</div>
												<div class="col-sm-3">
													<input id="iDate11" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="" style="line-height : 2">조치완료</label>
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
													<label class="" style="line-height : 2">지연(단축)일</label>
												</div>
												<div class="col-sm-3">
													<input type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="" style="line-height : 2">변경 예정일</label>
												</div>
												<div class="col-sm-3">
													<input id="iDate111" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="" style="line-height : 2">Issue 내용</label>
												</div>
												<div class="col-sm-9">
													<textarea class="form-control form-control-user " cols="80" rows="5" style="font-size:11px; font-style: oblique; color:black;"></textarea>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-3 text-right font-weight-bold">
													<label class="" style="line-height : 2">조치/협의 내용</label>
												</div>
												<div class="col-sm-9">
													<textarea class="form-control form-control-user " cols="80" rows="5" style="font-size:11px; font-style: oblique; color:black;"></textarea>
												</div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px">
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">관련 담당자</h6>

											<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
												<span class="text" >삭제</span>
											</button>
											<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px; width: 50px;">
												<span class="text" >추가</span>
											</button>
										</div>
										<div class="card-body" style="padding: 5px">
											<div class="table-responsive">
												<div id="grid1111"></div>
											</div>
										</div>
									</div>
								</div>
								<!-- Item 일정 관리 팝업 > Issue 탭-->

								<!-- Item 일정 관리 팝업 > 알림 탭-->
								<div class="tab-pane" id="tabCont3">

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px">
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">알람 List</h6>

											<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
												<span class="text" >삭제</span>
											</button>
										</div>
										<div class="card-body" style="padding: 5px">
											<div class="table-responsive">
												<div id="grid11111"></div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px">
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">알람 내용</h6>

											<button id="btnSave" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
												<span class="text" >Save</span>
											</button>
											<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px; width: 50px;">
												<span class="text" >신규</span>
											</button>
										</div>

										<div class="card-body" style="padding: 5px">
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">알람 제목</label>
												</div>
												<div class="col-sm-10">
													<input type="text" class="form-control form-control-user " >
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">알람 내용</label>
												</div>
												<div class="col-sm-10">
													<textarea class="form-control form-control-user " cols="80" rows="6"></textarea>
												</div>
											</div>
											<div class="form-group row mb-1">
												<div class="col-sm-2 text-right font-weight-bold">
													<label class="" style="line-height : 2">발송 예정일</label>
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
													<label class="" style="line-height : 2">기준</label>
												</div>
												<div class="col-sm-2">
													<input type="text" class="form-control form-control-user " >
												</div>
												<div class="col-sm-1 text-right font-weight-bold">
													<label class="" style="line-height : 2">일</label>
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
													<label class="" style="line-height : 2">변환 날짜</label>
												</div>
												<div class="col-sm-4">
													<input id="aDate1" name="inpDatePicker" type="text" class="form-control form-control-user " >
												</div>
											</div>
										</div>
									</div>

									<!-- DataTales -->
									<div class="card shadow mb-2">
										<div class="card-header py-0" style="padding-top:2px; padding-bottom:2px">
											<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">관련 담당자</h6>

											<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px; width: 50px;">
												<span class="text" >삭제</span>
											</button>
											<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px; width: 50px;">
												<span class="text" >추가</span>
											</button>
										</div>
										<div class="card-body" style="padding: 5px">
											<div class="table-responsive">
												<div id="grid111111"></div>
											</div>
										</div>
									</div>

								</div>
								<!-- Item 일정 관리 팝업 > 알림 탭-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer" style="padding: 5px">
				<button class="btn btn-primary btn-icon-split btn-sm" style="width: 60px;">
					<span class="text">수정</span>
				</button>

				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal" style="width: 60px;">
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>
<!-- Item 일정 관리 팝업 -->

<input id="alertSelectRow"		type="hidden" value="<spring:message code='alert.select.row'	/>"/>
<input id="alertValidate"		type="hidden" value="<spring:message code='alert.validate'		/>"/>
<input id="alertSave"			type="hidden" value="<spring:message code='alert.save'			/>"/>
<input id="alertSaveSuccess"	type="hidden" value="<spring:message code='alert.save.success'	/>"/>
<input id="alertDelete"			type="hidden" value="<spring:message code='alert.delete'		/>"/>
<input id="alertDeleteSuccess"	type="hidden" value="<spring:message code='alert.delete.success'/>"/>
<input id="alertSaveAlreadyInv"	type="hidden" value="입력하신 Invoice Number가 이미 존재합니다.저장 하시겠습니까?"/>
<input id="alertGridSelectDataNull"	type="hidden" value="선택된 항목이 없습니다."/>
<input id="alertGridDataNull"	type="hidden" value="저장할 데이터가 없습니다."/>
<input id="alertGridEditDataNull"	type="hidden" value="수정한 데이터가 없습니다."/>
<input id="selectNullTextAll"	    type="hidden" value="전체"/>
<input id="selectNullTextSel"	    type="hidden" value="선택"/>