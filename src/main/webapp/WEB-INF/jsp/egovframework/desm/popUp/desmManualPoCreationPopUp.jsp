
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmManualPoCreationPopUpJs = "/resources/scripts/popUp/desmManualPoCreationPopUp.js?rv=" + rV;
    String idcsRestApiJs = "/resources/scripts/idcsRestApi.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmManualPoCreationPopUp.js"></script>
<script src="/resources/scripts/idcsRestApi.js"></script> --%>
<script src="<%= desmManualPoCreationPopUpJs %>"></script>
<script src="<%= idcsRestApiJs %>"></script>

<div class="modal hide fade" id="dlgDesmManualPoCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmManualPoCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmManualPoCreationTitle">Manaul Po Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmManualPoCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div id="divDlgDesmManualPoCreationSupplierCheck" class="form-group row mb-1" style="margin-bottom:4px !important">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Supplier Name</label>
						</div>
						<div class="col-sm-3" style="padding-right:0">
							<input id="txtDlgDesmManualPoCreationSupplierNo" type="text" class="form-control form-control-user required" autocomplete="off" >
								<i id="iconDlgDesmManualPoCreationSupplierSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>
						<div class="col-sm-6" style="padding-left:4px;padding-right:0">
							<input id="txtDlgDesmManualPoCreationSupplierName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
						<div class="col-sm-1" >
						</div>																																																		
					</div>
					<div id="divDlgDesmManualPoCreationProjectCheck" class="form-group row mb-1" style="margin-bottom:4px !important">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">Project</label>
						</div>
						<div class="col-sm-3" style="padding-right:0">
							<input id="txtDlgDesmManualPoCreationProjectNo" type="text" class="form-control form-control-user required" autocomplete="off" >
								<i id="iconDlgDesmManualPoCreationProjectSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>
						<div class="col-sm-6" style="padding-left:4px;padding-right:0">
							<input id="txtDlgDesmManualPoCreationProjectName" type="text" class="form-control form-control-user required" autocomplete="off" readonly>
						</div>
						<div class="col-sm-1" >
						</div>																																																		
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">PO Number</label>
						</div>
						<div class="col-sm-9" style="padding-right:0">
							<input id="txtDlgDesmManualPoCreationPoNumber" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
						<div class="col-sm-1" >
						</div>																																								
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-2 text-right font-weight-bold " >
							<label class="required" style="line-height : 2">PO Description</label>
						</div>
						<div class="col-sm-9" style="padding-right:0">
							<input id="txtDlgDesmManualPoCreationPoDescription" type="text" class="form-control form-control-user required" autocomplete="off" >
						</div>
						<div class="col-sm-1" >
						</div>																																								
					</div>

				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmManualPoCreationSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmManualPoCreationPopUp"></div>