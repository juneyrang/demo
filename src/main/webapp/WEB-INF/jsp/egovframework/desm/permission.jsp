<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
	<!-- Page level plugins -->

	<!-- Page level scripts -->
	<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
	<script src="/resources/ext/bluebird/bluebird.min.js"></script>
	<script src="/resources/ext/fileinput/js/fileinput.js"></script>
	<script src="/resources/ext/fileinput/themes/fas/theme.js"></script>
	<script src="/resources/ext/fileinput/js/locales/kr.js"></script>
	<script src="/resources/ext/CKEditor/ckeditor.js"></script>
	<script src="/resources/ext/CKEditor/initCK.js"></script>

	<script src="/resources/scripts/ajaxSetup.js"></script>
	<script src="/resources/scripts/permission.js"></script>
	<script type="text/javascript">
		$(document).ready( function() {
			//페이지 Title 설정
			//$(document).attr("title", $("#lblPageTitle").text() + $(document).attr("title")); 
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

		#dlgPerEdit textarea {
			line-height: 1.2rem;
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
					<div id="toolbar">
						<button id="btnAdd" class="btn btn-primary btn-icon-split btn-sm" role="button">
							<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
							<span class="text"><spring:message code="button.permission.add" /></span>
						</button>
					</div>

					<table id="tblList" data-toggle="table" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
						<colgroup>							
							<col style="" />
							<col style="width: 10%;" />
							<col style="width: 10%;" />
						</colgroup>						
						<thead>
							<tr>								
								<th data-field="ROLE_NAME" data-align="left" >Name</th>
								<th data-field="SITE_YN" data-align="center" >Site Role</th>
								<th data-align="center" data-formatter="formatter" data-events="gridEvents">Management</th>
							</tr>
						</thead>
						<tfoot>
							<tr>								
								<th>Name</th>
								<th>Management</th>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>		

		<!-- New/Edit Modal -->
		<div class="modal hide fade" id="dlgPerEdit" tabindex="-1" role="dialog" aria-labelledby="dlgPerEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dlgPerEditTitle"><spring:message code="permission.edit.title" /></h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<div class="modal-body">
						<div class="p-2 pl-4 pr-4">
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">Name</label>
								</div>
								<div class="col-sm-10">
									<input id="txtName" type="text" class="form-control form-control-user required" maxlength="100">
									<input id="txtSeq" type="hidden" class="form-control form-control-user" maxlength="100">
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">Site Role</label>
								</div>
								<div class="col-sm-10">
									<select id="selSiteYn" class="form-control form-control-user required">
										<option value="N">N</option>
										<option value="Y">Y</option>
									</select>
								</div>
							</div>																					
						</div>
					</div>

					<div class="modal-footer">
					
						<button id="btnPerModalSave" class="btn btn-success btn-icon-split btn-sm">
							<span class="icon text-white-50"><i class="fas fa-save"></i></span>
							<span class="text"><spring:message code="button.save" /></span>
						</button>
						<button id="btnPerModalDelete" class="btn btn-danger btn-icon-split btn-sm">
							<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
							<span class="text"><spring:message code="button.delete" /></span>
						</button>

						<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
							<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
							<span class="text"><spring:message code="button.close" /></span>
						</button>
					</div>
				</div>
			</div>
		</div>
		
		<div class="modal hide fade" id="dlgMenuSelect" tabindex="-1" role="dialog" aria-labelledby="dlgMenuSelectTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dlgMenuSelectTitle"><spring:message code="permission.menu.select.title" /></h5>
						
					</div>

					<div class="modal-body" >
						<table id="tblMenuList" data-toggle="table" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
							<colgroup>
								<col style="width: 4%;" />								
								<col style="" />
								<col style="width: 10%;" />	
							</colgroup>
						</table>				
					</div>

					<div class="modal-footer">
					
						<button id="btnMenuModalSave" class="btn btn-success btn-icon-split btn-sm">
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
	</div>

		<div class="modal hide fade" id="dlgMenuAuthSelect" tabindex="-1" role="dialog" aria-labelledby="dlgMenuAuthSelectTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dlgMenuAuthSelectTitle">설정</h5>
						<input id="txtMenuSeq" type="hidden" class="form-control form-control-user" maxlength="100">
					</div>

					<div class="modal-body" >
																
						<table id="tblMenuAuthList" data-toggle="table" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
							<colgroup>
								<col style="width: 4%;" />									
								<col style="width: 10%;" />
								<col style="" />
							</colgroup>
						</table>									
					</div>

					<div class="modal-footer">

						<button id="btnMenuAuthModalSave" class="btn btn-success btn-icon-split btn-sm">
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
	</div>
<input id="alertSelectRow" type="hidden" value="<spring:message code='alert.select.row' />"/>
<input id="alertValidate" type="hidden" value="<spring:message code='alert.validate' />"/>
<input id="alertSave" type="hidden" value="<spring:message code='alert.save' />"/>
<input id="alertSaveSuccess" type="hidden" value="<spring:message code='alert.save.success' />"/>
<input id="alertDelete" type="hidden" value="<spring:message code='alert.delete' />"/>
<input id="alertDeleteSuccess" type="hidden" value="<spring:message code='alert.delete.success' />"/>

<%-- <jsp:include page="foot_right.jsp"></jsp:include> --%>
	
<!-- 미사용 부분 -->
