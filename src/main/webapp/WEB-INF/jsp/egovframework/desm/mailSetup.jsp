<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
	<!-- Page level plugins -->

	<!-- Page level scripts -->
	<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
	<script src="/resources/scripts/ajaxSetup.js"></script>
	<script src="/resources/ext/jquery.sumoselect.js"></script>
	<script src="/resources/scripts/mailSetup.js"></script>

	<script type="text/javascript">
		$(document).ready( function() {
			//페이지 Title 설정
			//$(document).attr("title", $("#lblPageTitle").text() + $(document).attr("title"));
		});
	</script>

	<!-- Page level style -->
	<link href="/resources/ext/sumoselect.css" rel="stylesheet" />
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

		.SumoSelect > .CaptionCont {
		    max-height: 30px;
		}
	</style>

	<!-- Begin Page Content -->
	<div class="container-fluid">
		<!-- Page Heading -->
		<!-- <h1 class="h3 mb-2 text-gray-800" id="lblPageTitle"></h1> -->

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
							<span class="text"><spring:message code="button.mail.add" /></span>
						</button>
						<!-- <button id="btnSendTest" class="btn btn-warning btn-icon-split btn-sm" role="button">
							<span class="text">Sample Mail - T19020</span>
						</button> -->
					</div>

					<table id="tblList" data-toggle="table" class="table table-striped" data-locale="<%=session.getAttribute("GRIDLANG").toString()%>">
						<colgroup>
							<col style="width: 5%;" />
							<col style="width: 10%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 5%;" />
							<col style="width: 10%;" />
							<col style="width: 13%;" />
							<col style="width: 10%;" />
						</colgroup>
						<thead>
							<tr>
								<th data-field="PROJECT_NO" data-align="center" >Project No</th>
								<th data-field="PROJECT_NAME" data-align="center" >Project Name</th>
								<th data-field="ON_YN" data-align="center" >Shore ON</th>
								<th data-field="OFF_YN" data-align="center" >Shore OFF</th>
								<th data-field="L2_YN" data-align="center" >L2</th>
								<th data-field="L3_YN" data-align="center" >L3</th>
								<th data-field="L4_YN" data-align="center" >L4</th>
								<th data-field="MPS_YN" data-align="center" >MPS</th>
								<th data-field="TE_YN" data-align="center" >TE</th>
								<th data-field="PO_YN" data-align="center" >PO</th>
								<th data-field="CARGO_YN" data-align="center" >CARGO</th>
								<th data-field="FOB_YN" data-align="center" >FOB</th>
								<th data-field="ONSITE_YN" data-align="center" >ONSITE</th>
								<th data-field="EXCEPT_SCOPE" data-align="center" >EXCEPT SCOPE</th>
								<th data-field="LAST_UPDATE_DATE" data-align="center" >LAST UPDATE</th>
								<th data-align="center" data-formatter="formatter" data-events="gridEvents">Management</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>

		<!-- New/Edit Modal -->
		<div class="modal hide fade" id="dlgMailEdit" tabindex="-1" role="dialog" aria-labelledby="dlgMailEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="min-width: 1000px;">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dlgMailEditTitle"><spring:message code="mail.edit.title" /></h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<div class="modal-body">
						<div class="p-2 pl-4 pr-4">
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">Project No</label>
								</div>
								<div class="col-sm-8" >
									<select id="ddlProjectNo" class="form-control form-control-user " >
									</select>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">Project Name</label>
								</div>
								<div class="col-sm-8">
									<input type="text" id="ddlProjectName" class="form-control form-control-user"  >
								</div>
						   </div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="">EXCEPT SCOPE</label>
								</div>
								<div class="col-sm-8">
									<select id="ddlExceptScope" class="form-control form-control-user"  multiple="multiple">


									</select>
								</div>
						   </div>

							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">Shore ON YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlOnYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">Shore OFF YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlOffYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">L2 YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlL2Yn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">L3 YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlL3Yn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">L4 YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlL4Yn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">MPS YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlMpsYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">TE YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlTeYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">PO YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlPoYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">CARGO YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlCargoYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">FOB YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlFobYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
								<div class="col-sm-2 text-right font-weight-bold">
									<label class="required">ONSITE YN</label>
								</div>
								<div class="col-sm-2">
									<select id="ddlOnsiteYn" class="form-control form-control-user required" >
										<option value="Y">Y</option>
										<option value="N">N</option>
									</select>
								</div>
							</div>

						</div>
					</div>

					<div class="modal-footer">

						<button id="btnMailModalSave" class="btn btn-success btn-icon-split btn-sm">
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


<input id="alertSelectRow" type="hidden" value="<spring:message code='alert.select.row' />"/>
<input id="alertValidate" type="hidden" value="<spring:message code='alert.validate' />"/>
<input id="alertSave" type="hidden" value="<spring:message code='alert.save' />"/>
<input id="alertSaveSuccess" type="hidden" value="<spring:message code='alert.save.success' />"/>
<input id="alertDelete" type="hidden" value="<spring:message code='alert.delete' />"/>
<input id="alertDeleteSuccess" type="hidden" value="<spring:message code='alert.delete.success' />"/>
<input id="alertProjectDuplication" type="hidden" value="<spring:message code='alert.project.duplication' />"/>
<input id="alertMailSend" type="hidden" value="<spring:message code='alert.mail.send' />"/>

<%-- <jsp:include page="foot_right.jsp"></jsp:include> --%>

<!-- 미사용 부분 -->
