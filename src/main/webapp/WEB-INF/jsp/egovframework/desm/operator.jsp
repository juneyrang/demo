<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<jsp:include page="top_left.jsp"></jsp:include>
	<!-- Page level plugins -->

	<!-- Page level scripts -->

	<script src="/resources/ext/bluebird/bluebird.min.js"></script>
	<script src="/resources/ext/fileinput/js/fileinput.js"></script>
	<script src="/resources/ext/fileinput/themes/fas/theme.js"></script>
	<script src="/resources/ext/fileinput/js/locales/kr.js"></script>

	<script src="/resources/scripts/operator.js"></script>
	<script type="text/javascript">
		$(document).ready( function() {
			//페이지 Title 설정
			$(document).attr("title", $("#lblPageTitle").text() + $(document).attr("title")); 
		});
	</script>

	<!-- Page level style -->
	<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
	<style type="text/css">
		/* 메인 테이블 Row의 마우스 커스 변경 */
		#tblTeamOPList tr td { cursor: pointer; }
		#tblTeamOPList tr td:last-child { cursor: default !important; }

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

		/* modal 작은칸의 여백 조정 */
		.modal-body .col-1, .modal-body .col-sm-1, .modal-body .col-md-1, .modal-body .col-lg-1, .modal-body .col-xl-1 {
			padding-right: 0.4rem;
			padding-left: 0.4rem;
		}
	</style>

	<!-- Begin Page Content -->
	<div class="container-fluid">
		<!-- Page Heading -->
		<h1 class="h3 mb-2 text-gray-800" id="lblPageTitle">시스템 관리</h1>	

		<!-- DataTales -->
		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">OPERATOR 관리</h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<div id="toolbar">
						<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button">
							<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
							<span class="text">New Team</span>
						</button>
					</div>

					<table id="tblTeamOPList" data-toggle="table" class="table table-striped" data-locale="ko-KR">
						<colgroup>
							<col style="" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
						</colgroup>						
						<thead>
							<tr>
								<th data-field="DEPT_NAME" data-align="left" data-sortable="true" title="부서명">부서명</th>
								<th data-field="DEPT_CODE" data-align="center" data-sortable="true" title="부서코드">부서코드</th>
								<th data-field="OP_NAME" data-align="center" data-sortable="true" title="OP 성명">OP 성명</th>
								<th data-field="OPERATOR_AD" data-align="center" data-sortable="true" title="OP AD">OP AD</th>
								<th data-field="SUB_OP_NAME" data-align="center" data-sortable="true" title="부OP 성명">부OP 성명</th>
								<th data-field="OPERATOR_AD_SUB" data-align="center" data-sortable="true" title="부OP AD">부OP AD</th>
								<th data-align="center" data-formatter="operateFormatter" data-events="teamOPOperateEvents" data-click-to-select="false">관리</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th>부서명</th>
								<th>부서코드</th>
								<th>OP 성명</th>
								<th>OP AD</th>
								<th>부OP 성명</th>
								<th>부OP AD</th>
								<th>관리</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>

		<!-- New/Edit OP Modal -->
		<div class="modal hide fade" id="dialogTeamOP" tabindex="-1" role="dialog" aria-labelledby="dialogTeamOPTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dialogTeamOPTitle">부서/OP 등록/수정</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<input type="hidden" id="hidJobCode" />

					<div class="modal-body">
						<div class="p-1 pl-4 pr-4">
							<div class="form-group row mt-1 mb-1">
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="required">부서</label>
								</div>
								<div class="col-sm-6">
									<input id="txtDeptName" type="text" class="form-control form-control-user required" placeholder="부서명을 입력하세요" title="부서명" />
								</div>
								<div class="col-sm-4">
									<input id="txtDeptCode" type="text" class="form-control form-control-user required" placeholder="부서코드" title="부서코드" />
								</div>
							</div>
							<div class="form-group row mt-1 mb-1">						
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="required">OP</label>
								</div>
								<div class="col-sm-6">
									<input id="txtOPName" type="text" class="form-control form-control-user required" placeholder="이름을 입력하세요" title="OP" />
								</div>
								<div class="col-sm-4">
									<input id="txtOPAD" type="text" class="form-control form-control-user required" placeholder="OP AD" title="OP AD" />
								</div>
							</div>
							<div class="form-group row mt-1 mb-1">
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="">부 OP</label>
								</div>
								<div class="col-sm-6">
									<input id="txtSubOPName" type="text" class="form-control form-control-user" placeholder="이름을 입력하세요" title="부 OP" />
								</div>
								<div class="col-sm-4">
									<input id="txtSubOPAD" type="text" class="form-control form-control-user" placeholder="부 OP AD" title="부 OP AD" />
								</div>
							</div>
						</div>
					</div>

					<div class="modal-footer">
						<button id="btnTeamOPModalSave" class="btn btn-success btn-icon-split btn-sm">
							<span class="icon text-white-50"><i class="fas fa-save"></i></span>
							<span class="text">저장</span>
						</button>
						<button id="btnTeamOPModalDelete" class="btn btn-danger btn-icon-split btn-sm">
							<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
							<span class="text">삭제</span>
						</button>
						<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
							<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
							<span class="text">닫기</span>
						</button>
					</div>
				</div>
			</div>
		</div>

	</div>

<jsp:include page="foot_right.jsp"></jsp:include>
	
<!-- 미사용 부분 -->