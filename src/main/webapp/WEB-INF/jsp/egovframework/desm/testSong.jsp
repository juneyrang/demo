<!--
	기자재 일정관리 > 기자재 일정관리 > 목록( 팝업 창 높이 조정 버전)
-->
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level plugins -->

<!-- Page level scripts -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<script src="/resources/scripts/testSong.js"></script>
<script src="/resources/gridJs/GridE.js"></script>
<script type="text/javascript">
	$(document).ready( function() {
		//페이지 Title 설정
		//$(document).attr("title", $("#lblPageTitle").text() + $(document).attr("title"));

		$("#cmbGubun1	option:eq(0)").prop("selected", true);
		$("#cmbGubun2	option:eq(2)").prop("selected", true);
		$("#cmbMpcfo1	option:eq(2)").prop("selected", true);
		$("#cmbMpcfo2	option:eq(1)").prop("selected", true);
		$("#cmbPea1		option:eq(1)").prop("selected", true);
		$("#cmbPea2		option:eq(0)").prop("selected", true);
	});
</script>

<!-- Page level style -->

<style type="text/css">
	/* 메인 테이블 Row의 마우스 커스 변경 */
	#tblNoticeList tr td { cursor: pointer; }
	#tblNoticeList tr td:last-child { cursor: default !important; }

	/* 팝업 창 크기, 여백 조정 */
	.modal-body, .modal-body .form-control {
		font-size:0.8rem !important;
		line-height: 1;
	}
	.modal-body .form-group {
		margin-bottom: 0rem;
	}
	label { margin-top:0.5rem; }

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
</style>

<!-- Begin Page Content -->
<div class="container-fluid">
	<!-- Page Heading -->
	<%-- <h1 class="h3 mb-2 text-gray-800" id="lblPageTitle">${menu.MENU_UP_NAME}</h1> --%>

	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-header py-3">
			<h6 class="m-0 font-weight-bold text-primary">${menu.MENU_NAME}</h6>
		</div>
		<div class="card-body">
			<div class="table-responsive">

				<table border="0" width="100%">
					<tr>
						<td width="100%">
							<table border="0">
								<!-- search 1 row start -->
								<tr>
									<td >
										<label class="" >Project Code</label>
									</td>
									<td width="150">
										<input id="" type="text" class="form-control form-control-user" placeholder="Project Code" title="Project Code" />
<!-- 											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
											<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
										</svg> -->
									</td>
									<td width="150">
										<input id="" type="text" class="form-control form-control-user required" placeholder="Project Code" title="Project Code" />
									</td>
									<td>
										<select id="cmbGubun1" class="form-control form-control-user" style="height:30px;width:180px;font-size:12px">
											<option>Project Code</option>
											<option>Project Name</option>
											<option>Item Name</option>
											<option>Vendor</option>
											<option>선적 국가</option>
											<option>Shipment No</option>
											<option>Invoice No</option>
											<option>공급 Scope</option>
											<option>PM 담당자</option>
											<option>설계 담당자</option>
											<option>구매 담당자</option>
											<option>공정 담당자</option>
											<option>품질 담당자</option>
										</select>
									</td>
									<td width="150">
										<input id="txtName" type="text" class="form-control form-control-user" />
									</td>
									<td>
										<select id="cmbMpcfo1" class="form-control form-control-user" style="height:30px;width:150px;font-size:12px">
											<option>MPS</option>
											<option>PO</option>
											<option>Cargo Ready</option>
											<option>FOB</option>
											<option>On Site</option>
										</select>
									</td>
									<td >
										<select id="cmbPea1" class="form-control form-control-user" style="height:30px;width:150px;font-size:12px">
											<option>Plan</option>
											<option>Expected</option>
											<option>Actual</option>
										</select>
									</td>
									<td >
										<table>
											<tr>
												<td>
													<input id="inpSearchDate1" name="searchDate" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:110px;"/>
												</td>
												<td style="width:20px;text-align: center;">
													~
												</td>
												<td>
													<input id="inpSearchDate2" name="searchDate" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:110px;"/>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<!-- search 1 row end -->
								<!-- search 2 row start -->
								<tr>
									<td>
										<label class="" >On/Offshore</label>
									</td>
									<td>
										<select class="form-control form-control-user" style="height:30px;font-size:12px">
											<option>All</option>
											<option>Offshore</option>
											<option>Onshore</option>
										</select>
									</td>
									<td>
										&nbsp;
									</td>
									<td>
										<select id="cmbGubun2" class="form-control form-control-user" style="height:30px;width:180px;font-size:12px">
											<option>Project Code</option>
											<option>Project Name</option>
											<option>Item Name</option>
											<option>Vendor</option>
											<option>선적 국가</option>
											<option>Shipment No</option>
											<option>Invoice No</option>
											<option>공급 Scope</option>
											<option>PM 담당자</option>
											<option>설계 담당자</option>
											<option>구매 담당자</option>
											<option>공정 담당자</option>
											<option>품질 담당자</option>
										</select>
									</td>
									<td>
										<input id="txtName1" type="text" class="form-control form-control-user" />
									</td>
									<td>
										<select id="cmbMpcfo2" class="form-control form-control-user" style="height:30px;width:150px;font-size:12px">
											<option>MPS</option>
											<option>PO</option>
											<option>Cargo Ready</option>
											<option>FOB</option>
											<option>On Site</option>
										</select>
									</td>
									<td width="150">
										<select id="cmbPea2" class="form-control form-control-user" style="height:30px;font-size:12px">
											<option>Plan</option>
											<option>Expected</option>
											<option>Actual</option>
										</select>
									</td>
									<td >
										<table>
											<tr>
												<td>
													<input id="inpSearchDate3" name="searchDate" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:110px;"/>
												</td>
												<td style="width:20px;text-align: center;">
													~
												</td>
												<td>
													<input id="inpSearchDate4" name="searchDate" type="text" class="form-control form-control-user required" placeholder="" title="" style="width:110px;"/>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<!-- search 2 row end -->
								<!-- search 3 row start -->
								<tr>
									<td width="210">
										<label class="">
											Pending Item (Plan < Expected)
										</label>
									</td>
									<td>
										<input type="checkbox" style="width:25px; height:25px;">
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<!-- search 3 row end -->
							</table>
						</td>
						<td style="vertical-align:top; text-align:right; width:100%;">
							<table border="0" width="100%">
								<tr>
									<td style="vertical-align:middle; text-align:right" width="100%">
										<button name="btnSearch" id="btnSearch" aria-label="RefreshText" title="검색" class="btn btn-primary btn-icon-split" role="button" style="width:80px;">
											<span class="icon" style="padding:0.375rem 0.3rem 0.375rem 0.75rem; background:0">
												<i class="fas fa-search"></i>
											</span>
											<span class="text" style="padding:0.375rem 0.75rem 0.375rem 0rem;">Search</span>
										</button>
									</td>
								</tr>
								<tr>
									<td style="vertical-align:middle; text-align:right" width="100%">
										<button name="fullscreentext" aria-label="FullscreenText" title="초기화" class="btn btn-secondary btn-icon-split" role="button" style="width:80px;font-size:20;">
											<span class="icon" style="padding:0.375rem 0.3rem 0.375rem 0.75rem; background:0">
												<i class="fa fa-arrows-alt"></i>
											</span>
											<span class="text" style="padding:0.375rem 0.75rem 0.375rem 0rem;">Reset</span>
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

				<!-- 메인 목록 -->
				<div id= "Main" style="padding-top:10px"></div>

			</div>
		</div>
	</div>
</div>

<div class="modal hide fade" id="treeModal" tabindex="-1" role="dialog" aria-labelledby="treeModalTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1200px;">
		<div class="modal-content">
			<div class="modal-header" style="padding: 5px"><!-- style="padding: 5px" -->
				<h5 class="modal-title" id="treeModalTitle">Item 일정관리</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="treeModalHtml" style="padding: 5px">
				<div class="p-1 pl-4 pr-4" id="treeModal">
				</div>
			</div>
			<div class="modal-footer" style="padding: 5px"><!-- style="padding: 5px" -->

				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>

<input id="alertSelectRow"		type="hidden" value="<spring:message code='alert.select.row'	/>"/>
<input id="alertValidate"		type="hidden" value="<spring:message code='alert.validate'		/>"/>
<input id="alertSave"			type="hidden" value="<spring:message code='alert.save'			/>"/>
<input id="alertSaveSuccess"	type="hidden" value="<spring:message code='alert.save.success'	/>"/>
<input id="alertDelete"			type="hidden" value="<spring:message code='alert.delete'		/>"/>
<input id="alertDeleteSuccess"	type="hidden" value="<spring:message code='alert.delete.success'/>"/>

<%-- <jsp:include page="foot_right.jsp"></jsp:include> --%>