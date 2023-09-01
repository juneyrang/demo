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
	<script src="/resources/ext/CKEditor/ckeditor.js"></script>
	<script src="/resources/ext/CKEditor/initCK.js"></script>


	<script src="/resources/scripts/notice.js"></script>
	
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

		#dlgNoticeEdit textarea {
			line-height: 1.2rem;
		}
	</style>
	
	<div id="tabs" style="display: none; margin-top: -10px; border-bottom : 0;">
		<ul>
		</ul>
	</div>

	<!-- Begin Page Content -->
	<div class="container-fluid" id="mainFrame">
		
		<!-- Page Heading -->
		<h1 class="h3 mb-2 text-gray-800" id="lblPageTitle">NOTICE</h1>

		<!-- DataTales -->
		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">NOTICE</h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<div id="toolbar">
						<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button">
							<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
							<span class="text">New Notice</span>
						</button>
					</div>

					<table id="tblNoticeList" data-toggle="table" class="table table-striped" data-locale="ko-KR">
						<colgroup>
							<col style="" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
						</colgroup>						
						<thead>
							<tr>
								<th data-field="TITLE" data-align="left" title="제목">공지사항 제목</th>
								<th data-field="CREATION_DATE" data-align="center" title="작성일자">작성 일자</th>
								<th data-field="CREATED_BY" data-align="center" title="작성자">작성자</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<th>공지사항 제목</th>
								<th>작성 일자</th>
								<th>작성자</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>

		<input type="hidden" id="hidJobCode" />

		<!-- New/Edit Modal -->
		<div class="modal hide fade" id="dlgNoticeEdit" tabindex="-1" role="dialog" aria-labelledby="dlgNoticeEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dlgNoticeEditTitle">공지사항 등록/수정</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<div class="modal-body">
						<div class="p-2 pl-4 pr-4">
							<div class="form-group row mt-1 mb-1">
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="required">제목</label>
								</div>
								<div class="col-sm-10">
									<input id="txtTitle" type="text" class="form-control form-control-user required" placeholder="제목을 입력하세요" title="제목" maxlength="100">
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="required">내용</label>
								</div>
								<div class="col-sm-10">
									<textarea class="form-control form-control-user required" cols="80" id="txtContents" name="txtContents" rows="10"></textarea>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="">첨부파일</label>
								</div>
								<div class="col-sm-10">
									<input id="txtNoticeFile" type="file" name="txtNoticeFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
									<input id="txtNoticeFileGrpCd" type="hidden" value="" />
								</div>
							</div>	
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-center font-weight-bold">
									<label class="">실시간 여부</label>
								</div>
								<div class="col-sm-10">
									<input id="chkRealTime" type="checkbox" class="form-control form-control-user" >
								</div>
							</div>							
						</div>
					</div>

					<div class="modal-footer">
						
						<button id="btnNoticeModalSave" class="btn btn-success btn-icon-split btn-sm">
							<span class="icon text-white-50"><i class="fas fa-save"></i></span>
							<span class="text">저장</span>
						</button>
						<button id="btnNoticeModalDelete" class="btn btn-danger btn-icon-split btn-sm">
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
