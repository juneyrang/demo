<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmShippingMarkCreationPopUpJs = "/resources/scripts/popUp/desmShippingMarkCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmShippingMarkCreationPopUp.js"></script> --%>
<script src="<%= desmShippingMarkCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmShippingMarkCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmShippingMarkCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmShippingMarkCreationTitle">Shipping Mark</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" id="divDlgDesmShippingMarkCreationBody">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="" style="line-height : 2">Project</label>
						</div>
						<div class="col-sm-2" >
							<input id="txtDlgDesmShippingMarkCreationProjectNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>	
						<div class="col-sm-4" style="padding-left:0">
							<input id="txtDlgDesmShippingMarkCreationProjectName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>
						<div class="col-sm-1 text-right font-weight-bold " >
							<label class="" style="line-height : 2">Supplier</label>
						</div>	
						<div class="col-sm-4" >
							<input id="txtDlgDesmShippingMarkCreationSupplier" type="text" class="form-control form-control-user " autocomplete="off" readonly>
							<input id="txtDlgDesmShippingMarkCreationSupplierNo" type="hidden" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																																																																		
					</div>	
					<div class="form-group row mb-1" style="margin-top: 2px;">
						<div class="col-sm-1 text-right font-weight-bold " style="max-width:70px">
							<label class="required" style="line-height : 2">PO No.</label>
						</div>
						<div class="col-sm-2" >
							<input id="txtDlgDesmShippingMarkCreationPoNo" type="text" class="form-control form-control-user required" autocomplete="off" >
								<i id="iconDlgDesmShippingMarkCreationPoNoSearch" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
							</input>
						</div>	
						<div class="col-sm-4" style="padding-left:0">
							<input id="txtDlgDesmShippingMarkCreationPoName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>		
						<div class="col-sm-1 text-right font-weight-bold " >
						</div>	
						<div class="col-sm-4" >
						</div>																											
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-12 text-right font-weight-bold" style="padding-top:0.15rem; padding-bottom:0.2rem; padding-left:0; padding-right:0;">
							<hr class="m-1"/>
						</div>
					</div>	
					<div class="form-group row">
						<div class="col-sm-12">
							<div style="margin-bottom: 1px; padding-right: 2px;" >
								<span ></span>
								<input  type="file" id="txtDlgDesmShippingMarkCreationExcelUploadFile" style="display:none"/>
								<button id="btnDlgDesmShippingMarkCreationGridDel" authType="S" class="btn btn-danger btn-icon-split btn-sm" style="float:right;">
									<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
									<span class="text">Delete</span>
								</button>														
								<button id="btnDlgDesmShippingMarkCreationGridAdd" authType="S" class="btn btn-primary btn-icon-split btn-sm" style="float:right;margin-right:3px">
									<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
									<span class="text">Add</span>
								</button>
								<button id="btnDlgDesmShippingMarkCreationExcelUpload" authType="S" class="btn btn-success btn-icon-split btn-sm" style="float:right;margin-right:3px"">
									<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
									<span class="text">Excel UpLoad</span>
								</button>									
								<button id="btnDlgDesmShippingMarkCreationExcelDownload" authType="R" class="btn btn-success btn-icon-split btn-sm" style="float:right;margin-right:3px"">
									<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
									<span class="text">Excel DownLoad</span>
								</button>																						
							</div>										
							<div id="dlgDesmShippingMarkCreationGrid" style="padding-top:3px; width:100%; height:400px;"></div>
						</div>
					</div>					
											
					

																																		
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnDlgDesmShippingMarkCreationReport" authType="R" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file"></i></span>
					<span class="text">Report</span>
				</button>
				<button id="btnDlgDesmShippingMarkCreationSave" authType="S" class="btn btn-success btn-icon-split btn-sm" style="margin-left : 4px">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Save</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal" style="margin-left : 4px">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>			

				
				
			</div>
		</div>
	</div>
</div>

<div class="modal hide fade" id="dlgDesmShippingMarkCreationExcelUploadSheet" tabindex="-1" role="dialog" aria-labelledby="dlgDesmShippingMarkCreationExcelUploadSheetTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmShippingMarkCreationExcelUploadSheetSheetTitle">Sheet</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="dlgDesmShippingMarkCreationExcelUploadSheetGrid" style="height : 200px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">																	
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div id="dlgDesmShippingMarkCreationPopUp"></div>