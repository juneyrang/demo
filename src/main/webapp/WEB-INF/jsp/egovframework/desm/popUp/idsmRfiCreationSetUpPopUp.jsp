
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String idsmRfiCreationSetUpPopUpJs = "/resources/scripts/popUp/idsmRfiCreationSetUpPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/idsmRfiCreationSetUpPopUp.js"></script> --%>
<script src="<%= idsmRfiCreationSetUpPopUpJs %>"></script>

<div class="modal hide fade" id="dlgIdsmRfiCreationSetup" tabindex="-1" role="dialog" aria-labelledby="dlgIdsmRfiCreationSetupTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgIdsmRfiCreationSetupTitle">Setup</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="card shadow mb-2" style="width:100%">
							<div class="card-header py-1" style="0.75rem 0.75rem !important">
								<h7 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">Applied Procedure</h7>
								<button id="btnDlgIdsmRfiCreationSetupAppliedProcedureDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px">
									<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
									<span class="text" style="font-size:0.8em">Delete</span>
								</button>
								<button id="btnDlgIdsmRfiCreationSetupAppliedProcedureAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px">
									<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
									<span class="text" style="font-size:0.8em">Add</span>
								</button>
							</div>
							<div class="card-body" style="padding: 1px">
								<div id="gridDlgIdsmRfiCreationSetupAppliedProcedure" style="padding-top:1px; width:100%; height:100px;"></div>
							</div>
						</div>																				
					</div>
					<div class="form-group row mb-1">
						<div class="card shadow mb-2" style="width:100%; margin-top:4px">
							<div class="card-header py-1" style="0.75rem 0.75rem !important">
								<h7 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">Procedure No. /Rev No.</h7>
								<button id="btnDlgIdsmRfiCreationSetupProcedureDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px">
									<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
									<span class="text" style="font-size:0.8em">Delete</span>
								</button>
								<button id="btnDlgIdsmRfiCreationSetupProcedureAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px">
									<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
									<span class="text" style="font-size:0.8em">Add</span>
								</button>
							</div>
							<div class="card-body" style="padding: 1px">
								<div id="gridDlgIdsmRfiCreationSetupProcedure" style="padding-top:1px; width:100%; height:100px;"></div>
							</div>
						</div>																														
					</div>					
					<div class="form-group row mb-1">
						<div class="card shadow mb-2" style="width:100%; margin-top:4px">
							<div class="card-header py-1" style="0.75rem 0.75rem !important">
								<h7 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">Inspection Description on the Procedure</h7>
								<button id="btnDlgIdsmRfiCreationSetupInspectionDelete" class="btn btn-danger btn-icon-split btn-sm" role="button" style="float: right; height: 25px">
									<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
									<span class="text" style="font-size:0.8em">Delete</span>
								</button>
								<button id="btnDlgIdsmRfiCreationSetupInspectionAdd" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float: right; margin-right : 4px; height: 25px">
									<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
									<span class="text" style="font-size:0.8em">Add</span>
								</button>
							</div>
							<div class="card-body" style="padding: 1px">
								<div id="gridDlgIdsmRfiCreationSetupInspection" style="padding-top:1px; width:100%; height:100px;"></div>
							</div>
						</div>																															
					</div>		
					<div class="form-group row mb-1">
						<div class="card shadow mb-2" style="width:100%; margin-top:4px">
							<div class="card-header py-1" style="0.75rem 0.75rem !important">
								<h7 class="m-0 font-weight-bold text-primary" style="padding-top: 4px; float: left;">Attachments</h7>
							</div>
							<div class="card-body" style="padding: 8px">
								<input id="txtDlgIdsmRfiCreationSetupAttachments" type="text" class="form-control form-control-user " autocomplete="off">
							</div>
						</div>																														
					</div>																																						
				</div>
				
			
			</div>

			<div class="modal-footer">								
				<button id="btnDlgIdsmRfiCreationSetUpSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>	
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Colse</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgIdsmRfiCreationSetUpPopUp"></div>
