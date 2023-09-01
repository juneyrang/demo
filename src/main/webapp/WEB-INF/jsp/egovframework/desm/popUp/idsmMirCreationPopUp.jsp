
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String idsmMirCreationPopUpJs = "/resources/scripts/popUp/idsmMirCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/idsmMirCreationPopUp.js"></script> --%>
<script src="<%= idsmMirCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgIdsmMirCreation" tabindex="-1" role="dialog" aria-labelledby="dlgIdsmMirCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 600px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgIdsmMirCreationTitle">MIR Report Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">MIR No.</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationMirNo" type="text" class="form-control form-control-user required" value="MIR-JW910-DHIC-PL-" autocomplete="off">
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Invoice No.</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationInvoiceNo" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Package No.</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationPackageNo" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Received Date</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationReceivedDate" name="inpDatePicker" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Inspection Date</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationInspectionDate" name="inpDatePicker" type="text" class="form-control form-control-user" autocomplete="off">
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Construction Activity Name</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationConstructionActivityName" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">P/L No.</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationPlNo" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																		
					</div>																												
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Remarks</label>
						</div>
						<div class="col-sm-8" >
							<input id="txtDlgIdsmMirCreationRemarks" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																		
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Prepared By</label>
						</div>
						<div class="col-sm-3" style="padding-right:0.2rem">
							<input id="txtDlgIdsmMirCreationPreparedByName" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmMirCreationPreparedByAd" type="hidden" class="form-control form-control-user " autocomplete="off">
						</div>
						<div class="col-sm-5" style="padding-left:0.2rem">
							<input id="txtDlgIdsmMirCreationPreparedByDeptName" type="text" class="form-control form-control-user" readonly>
						</div>																		
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Checked By</label>
						</div>
						<div class="col-sm-3" style="padding-right:0.2rem">
							<input id="txtDlgIdsmMirCreationCheckedByName" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmMirCreationCheckedByAd" type="hidden" class="form-control form-control-user " autocomplete="off" >
						</div>		
						<div class="col-sm-5" style="padding-left:0.2rem">
							<input id="txtDlgIdsmMirCreationCheckedByDeptName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																							
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Confirmed By</label>
						</div>
						<div class="col-sm-3" style="padding-right:0.2rem">
							<input id="txtDlgIdsmMirCreationConfirmedByName" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmMirCreationConfirmedByAd" type="hidden" class="form-control form-control-user " autocomplete="off">
						</div>
						<div class="col-sm-5" style="padding-left:0.2rem">
							<input id="txtDlgIdsmMirCreationConfirmedByDeptName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																										
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Reviewed By (EPC QA/QC)</label>
						</div>
						<div class="col-sm-3" style="padding-right:0.2rem">
							<input id="txtDlgIdsmMirCreationReviewedByEpcQaQcName" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmMirCreationReviewedByEpcQaQcAd" type="hidden" class="form-control form-control-user " autocomplete="off">
						</div>
						<div class="col-sm-5" style="padding-left:0.2rem">
							<input id="txtDlgIdsmMirCreationReviewedByEpcQaQcDeptName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																										
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-4 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Reviewed By (IRT/OE)</label>
						</div>
						<div class="col-sm-3" style="padding-right:0.2rem">
							<input id="txtDlgIdsmMirCreationReviewedByIrtOeName" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmMirCreationReviewedByIrtOeAd" type="hidden" class="form-control form-control-user " autocomplete="off">
						</div>
						<div class="col-sm-5" style="padding-left:0.2rem">
							<input id="txtDlgIdsmMirCreationReviewedByIrtOeDeptName" type="text" class="form-control form-control-user " autocomplete="off" readonly>
						</div>																									
					</div>																												
				</div>
				
			
			</div>

			<div class="modal-footer">
				<button id="btnDlgIdsmMirCreation" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Create</span>
				</button>	
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text"><spring:message code="button.close" /></span>
				</button>
			</div>
		</div>
	</div>
</div>