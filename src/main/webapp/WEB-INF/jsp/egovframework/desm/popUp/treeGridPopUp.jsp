<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String treeGridPopUpJs = "/resources/scripts/popUp/treeGridPopUp.js?rv=" + rV;
%>

<!-- Begin Page Content -->
<script src="/resources/ext/bluebird/bluebird.min.js"></script>
<script src="/resources/ext/fileinput/js/fileinput.js"></script>
<script src="/resources/ext/fileinput/themes/fas/theme.js"></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"></script>

<%--<script src="/resources/scripts/popUp/treeGridPopUp.js"></script> --%>
<script src="<%= treeGridPopUpJs %>"></script>

<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
	<style type="text/css">
		/* 메인 테이블 Row의 마우스 커스 변경 */
		#tblNoticeList tr td { cursor: pointer; }
		#tblNoticeList tr td:last-child { cursor: default !important; }

		/* 팝업 창 크기, 여백 조정  */
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
	</style>

<div class="container-fluid" style="padding: 0px;">
	<!-- Page Heading -->

	<div class="row row-sm">
		<div class="col-sm-6 col-xl-6 col-lg-6">

			<!-- DataTales -->
			<div class="card shadow mb-2">
				<div class="card-header py-3">
					<h6 class="m-0 font-weight-bold text-primary">Item 일정 및 Issue 관리</h6>
				</div>
				<div class="card-body">
					<div class="table-responsive">
						<div id="grid11"></div>

					</div>
				</div>
			</div>

			<div class="card shadow mb-2">
				<div class="card-header py-3">
					<h6 class="m-0 font-weight-bold text-primary">Item 정보</h6>
				</div>
				<div class="card-body">
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">Item(분납단위)</label>
						</div>
						<div class="col-sm-8">
							<input type="text" class="form-control form-control-user " >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">Shipment No</label>
						</div>
						<div class="col-sm-8">
							<input type="text" class="form-control form-control-user " >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">선적국가</label>
						</div>
						<div class="col-sm-8">
							<input type="text" class="form-control form-control-user " >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">L3 ID</label>
						</div>
						<div class="col-sm-8">
							<input type="text" class="form-control form-control-user " >
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">Payment Milestone</label>
						</div>
						<div class="col-sm-8">
							<select class="form-control form-control-user" >
								<option value=""></option>
								<option value="Y">Yes</option>
								<option value="N">No</option>
							</select>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">On/Offshore</label>
						</div>
						<div class="col-sm-8">
							<select class="form-control form-control-user" >
								<option value=""></option>
								<option value="Y">Onshore</option>
								<option value="N">Offshore</option>
							</select>
						</div>
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold">
							<label class="">Invoice No</label>
						</div>
						<div class="col-sm-8">
							<input type="text" class="form-control form-control-user " >
						</div>
					</div>
				</div>
			</div>

			<div class="card shadow mb-2">
				<div class="card-header py-3">
					<h6 class="m-0 font-weight-bold text-primary">Packing List</h6>

				</div>
				<div class="card-body">
					<div class="form-group row">
						<div class="col-sm-12">
							<input id="txtEvidenceFile" type="file" name="txtEvidenceFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
						</div>
					</div>
				</div>
			</div>

			<div class="card shadow mb-2">
				<div class="card-header py-2">
					<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">담당자 정보</h6>

					<button id="btnMenuModalDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right;">
						<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
						<span class="text">삭제</span>
					</button>
					<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px">
						<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
						<span class="text">추가</span>
					</button>


				</div>
				<div class="card-body">
					<div class="table-responsive">

						<div id="grid22" style="padding-top:4px"></div>

					</div>
				</div>
			</div>

		</div>


		<div class="col-sm-6 col-xl-6 col-lg-6" style="padding-left:0">

			<nav class="nav nav-tabs ">
				<a class="nav-link active" data-toggle="tab" href="#tabCont1"><h6>일정</h6></a>
				<a class="nav-link" data-toggle="tab" href="#tabCont2"><h6>Issue</h6></a>
				<a class="nav-link" data-toggle="tab" href="#tabCont3"><h6>알림</h6></a>
			</nav>

			<div class="card-body tab-content" style="padding:10px 0 0 0;">
				<div class="tab-pane active show" id="tabCont1">
					<!-- DataTales -->
					<div class="card shadow mb-2">
						<div class="card-header py-2">
							<h6 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">일정정보</h6>


							<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right">
								<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
								<span class="text">일정수정</span>
							</button>

						</div>
						<div class="card-body">
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class="text-info">MPS(PR)</label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Plan(L3)</label>
								</div>
								<div class="col-sm-6">
									<input id="date1" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Expected</label>
								</div>
								<div class="col-sm-6">
									<input id="date2" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Actual</label>
								</div>
								<div class="col-sm-6">
									<input id="date3" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class="text-info">PO</label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Plan(L3)</label>
								</div>
								<div class="col-sm-6">
									<input id="date11" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Expected</label>
								</div>
								<div class="col-sm-6">
									<input id="date22" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Actual</label>
								</div>
								<div class="col-sm-6">
									<input id="date33" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-6 text-left font-weight-bold">
									<label class="text-info">제작기간 (Day)</label>
								</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class="text-info">Cargo Ready</label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Plan</label>
								</div>
								<div class="col-sm-6">
									<input id="date111" type="text" class="form-control form-control-user " readonly>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Expected</label>
								</div>
								<div class="col-sm-6">
									<input id="date222" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Actual</label>
								</div>
								<div class="col-sm-6">
									<input id="date333" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-6 text-left font-weight-bold">
									<label class="text-info">배선기간</label>
								</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class="text-info">FOB/지정장소 상차도</label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Plan(L3)</label>
								</div>
								<div class="col-sm-6">
									<input id="date1111" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Expected</label>
								</div>
								<div class="col-sm-6">
									<input id="date2222" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Actual</label>
								</div>
								<div class="col-sm-6">
									<input id="date3333" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-6 text-left font-weight-bold">
									<label class="text-info">운송/통관</label>
								</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form-control-user " >
								</div>
							</div>
							<hr class="m-1" />
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class="text-info">On Site</label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Plan(L3)</label>
								</div>
								<div class="col-sm-6">
									<input id="date11111" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Expected</label>
								</div>
								<div class="col-sm-6">
									<input id="date22222" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-4 text-left font-weight-bold">
									<label class=""></label>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Actual</label>
								</div>
								<div class="col-sm-6">
									<input id="date33333" type="text" class="form-control form-control-user " >
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="tab-pane" id="tabCont2">

					<!-- DataTales -->
					<div class="card shadow mb-2">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">Issue List</h6>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<div id="grid111"></div>

							</div>
						</div>
					</div>

					<!-- DataTales -->
					<div class="card shadow mb-2">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">Issue 내용</h6>
						</div>
						<div class="card-body">
							<div class="form-group row mb-1">
								<div class="col-sm-3 text-right font-weight-bold">
									<label class="required">Issue 제목</label>
								</div>
								<div class="col-sm-9">
									<input type="text" class="form-control form-control-user required" >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-3 text-right font-weight-bold">
									<label class="">Issue 발생일</label>
								</div>
								<div class="col-sm-9">
									<input id="iDate1" type="text" class="form-control form-control-user " >
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-3 text-right font-weight-bold">
									<label class="">조치완료(예정)일</label>
								</div>
								<div class="col-sm-3">
									<input id="iDate11" type="text" class="form-control form-control-user " >
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">조치완료</label>
								</div>
								<div class="col-sm-4">
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
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">변경 예정일</label>
								</div>
								<div class="col-sm-4">
									<input id="iDate111" type="text" class="form-control form-control-user " >
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
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">관련 담당자</h6>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<div id="grid1111"></div>

							</div>
						</div>
					</div>

				</div>


				<div class="tab-pane" id="tabCont3">

					<!-- DataTales -->
					<div class="card shadow mb-2">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">알람 List</h6>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<div id="grid11111"></div>

							</div>
						</div>
					</div>

					<!-- DataTales -->
					<div class="card shadow mb-2">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">알람 내용</h6>
						</div>
						<div class="card-body">
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
									<input id="aDate1" type="text" class="form-control form-control-user " >
								</div>

							</div>
						</div>
					</div>

					<!-- DataTales -->
					<div class="card shadow mb-2">
						<div class="card-header py-3">
							<h6 class="m-0 font-weight-bold text-primary">관련 담당자</h6>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<div id="grid111111"></div>

							</div>
						</div>
					</div>

				</div>
			</div>


		</div>

	</div>

</div>

