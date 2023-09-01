
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmDetailItemCreationPopUpJs = "/resources/scripts/popUp/desmDetailItemCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmDetailItemCreationPopUp.js"></script> --%>
<script src="<%= desmDetailItemCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmDetailItemCreation" tabindex="-1" role="dialog" aria-labelledby="dlgDesmDetailItemCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmDetailItemCreationTitle">Detail Item Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Description</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationDescription" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Drawing No.</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationDrawingNo" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Item Tag No.</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationItemTagNo" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="required" style="line-height : 2">Unit</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationUnit" type="text" class="form-control form-control-user required" autocomplete="off">
						</div>																		
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="required" style="line-height : 2">IN Q’ty</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationInQty"  type="text" class="form-control form-control-user required" autocomplete="off">
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Material</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationMaterial" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Gross(kg)</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationGross" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																		
					</div>																												
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Net-Weight(Kg)</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgDesmDetailItemCreationNet" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																		
					</div>																																
				</div>
				
			
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmDetailItemCreation" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Creation</span>
				</button>	
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>