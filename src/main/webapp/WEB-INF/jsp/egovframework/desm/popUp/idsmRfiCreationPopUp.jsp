
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String idsmRfiCreationPopUpJs = "/resources/scripts/popUp/idsmRfiCreationPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/idsmRfiCreationPopUp.js"></script> --%>
<script src="<%= idsmRfiCreationPopUpJs %>"></script>

<div class="modal hide fade" id="dlgIdsmRfiCreation" tabindex="-1" role="dialog" aria-labelledby="dlgIdsmRfiCreationTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 1000px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgIdsmRfiCreationTitle">RFI Report Creation</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="container-fluid" style="padding: 0px;">
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">RFI No.</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationRfiNo" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">DATE</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationDate" name="inpDatePicker" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																								
					</div>
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">UNIT No.</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationUnitNo" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Date/Time</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationDateTime" name= "inpDatePickerTime" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																								
					</div>					
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Location</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationLocation" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Person in Charge</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationPersonInCharge" type="text" class="form-control form-control-user " readonly autocomplete="off">
						</div>																								
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Category</label>
						</div>
						<div class="col-sm-9" >
							<div class="form-group row mb-1">
								<input id="txtDlgIdsmRfiCreationCategoryMech" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:12px" checked autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryMech" style="line-height : 2;padding-left:4px">MECH.</label>
								<input id="txtDlgIdsmRfiCreationCategoryElec" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryElec" style="line-height : 2;padding-left:4px">ELEC.</label>
								<input id="txtDlgIdsmRfiCreationCategoryIc" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryIc" style="line-height : 2;padding-left:4px">I&C</label>
								<input id="txtDlgIdsmRfiCreationCategoryCvil" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryCvil" style="line-height : 2;padding-left:4px">CVIL</label>
								<input id="txtDlgIdsmRfiCreationCategoryArch" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryArch" style="line-height : 2;padding-left:4px">ARCH.</label>
								<input id="txtDlgIdsmRfiCreationCategoryCommon" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryCommon" style="line-height : 2;padding-left:4px">COMMON</label>
								<input id="txtDlgIdsmRfiCreationCategoryOthers" name="txtDlgIdsmRfiCreationCategory" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:20px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationCategoryOthers" style="line-height : 2;padding-left:4px">OTHERS</label>																																																													
							</div>
						</div>																						
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Construction PKG Name/No.</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationConstructionPkgNameNo" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">System/Comp./Equipment/BLDG</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationSystem" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																								
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Applied Procedure</label>
						</div>
						<div class="col-sm-9" >
							<select id="selDlgIdsmRfiCreationAppliedProcedure" class="form-control form-control-user" style="" autocomplete="off">
							</select>
						</div>																						
					</div>										
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Procedure No./Rev No.</label>
						</div>
						<div class="col-sm-9" >
							<select id="selDlgIdsmRfiCreationProcedure" class="form-control form-control-user" style="" autocomplete="off">
							</select>
						</div>																						
					</div>														
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Inspection Description on the Procedure</label>
						</div>
						<div class="col-sm-9" >
							<select id="selDlgIdsmRfiCreationInspection" class="form-control form-control-user" style="" autocomplete="off">
							</select>
						</div>																						
					</div>						
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Paragraph of Procedure</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationParagraph" type="text" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Inspection Point</label>
						</div>
						<div class="col-sm-3" >
							<div class="form-group row mb-1">
								<input id="txtDlgIdsmRfiCreationInspectionH" name="txtDlgIdsmRfiCreationInspection" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:12px" checked autocomplete="off">
								<label for="txtDlgIdsmRfiCreationInspectionH" style="line-height : 2;padding-left:4px">H</label>
								<input id="txtDlgIdsmRfiCreationInspectionW" name="txtDlgIdsmRfiCreationInspection" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:14px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationInspectionW" style="line-height : 2;padding-left:4px">W</label>
								<input id="txtDlgIdsmRfiCreationInspectionSw" name="txtDlgIdsmRfiCreationInspection" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:14px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationInspectionSw" style="line-height : 2;padding-left:4px">SW</label>
								<input id="txtDlgIdsmRfiCreationInspectionR" name="txtDlgIdsmRfiCreationInspection" type="radio" class="form-control form-control-user " style="width:11px;height:11px;margin-top:5px;margin-left:14px" autocomplete="off">
								<label for="txtDlgIdsmRfiCreationInspectionR" style="line-height : 2;padding-left:4px">R</label>																																														
							</div>
						</div>																								
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Details for items</label>
						</div>
						<div class="col-sm-9" >
							<div class="form-group row mb-1">
								<label style="line-height : 2;margin-left:12px">Perform Material Acceptance Inspection of</label>
								<input id="txtDlgIdsmRfiCreationDetailsForItems" style="width:30%;margin-left:7px;margin-right:7px" type="text" class="form-control form-control-user " autocomplete="off">
								<label style="line-height : 2;">by owner for the following materials.</label>
							</div>
							<div id="dlgIdsmRfiCreationGrid" style="padding-top:1px; width:100%; height:100px;"></div>
						</div>																						
					</div>						
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Quantity/Volume</label>
						</div>
						<div class="col-sm-9" >
							<div class="form-group row mb-1">
								<input id="txtDlgIdsmRfiCreationQuantity" style="width:10%;margin-left:12px;margin-right:7px" type="text" class="form-control form-control-user " autocomplete="off">
								<label style="line-height : 2;">Packages for</label>
								<input id="txtDlgIdsmRfiCreationVolume" style="width:30%;margin-left:7px;margin-right:7px" type="text" class="form-control form-control-user " autocomplete="off">
								<label style="line-height : 2;">material</label>
							</div>
						</div>																						
					</div>		
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Attachments</label>
						</div>
						<div class="col-sm-9" >
							<input id="txtDlgIdsmRfiCreationAttachments" type="text" class="form-control form-control-user " autocomplete="off">
						</div>																						
					</div>	
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Requested by A</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationRequestedByA" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationRequestedByAAd" type="hidden" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationRequestedByADeptName" type="hidden" class="form-control form-control-user " autocomplete="off">
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Requested by B</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationRequestedByB" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationRequestedByBAd" type="hidden" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationRequestedByBDeptName" type="hidden" class="form-control form-control-user " autocomplete="off">							
						</div>																										
					</div>			
					<div class="form-group row mb-1">
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">QC Dep’t</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationQc" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationQcAd" type="hidden" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationQcDeptName" type="hidden" class="form-control form-control-user " autocomplete="off">							
						</div>		
						<div class="col-sm-3 text-right font-weight-bold ">
							<label class="" style="line-height : 2">Owner/Consultant</label>
						</div>
						<div class="col-sm-3" >
							<input id="txtDlgIdsmRfiCreationOwner" type="text" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationOwnerAd" type="hidden" class="form-control form-control-user " autocomplete="off">
							<input id="txtDlgIdsmRfiCreationOwnerDeptName" type="hidden" class="form-control form-control-user " autocomplete="off">								
						</div>																										
					</div>																
																																						
				</div>
				
			
			</div>

			<div class="modal-footer">
				<button id="btnDlgIdsmRfiSetUp" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-cog"></i></span>
					<span class="text">Set-up</span>
				</button>
				<button id="btnDlgIdsmRfiReset" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-pencil-alt"></i></span>
					<span class="text">Reset</span>
				</button>								
				<button id="btnDlgIdsmRfiCreation" class="btn btn-success btn-icon-split btn-sm">
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

<div id="dlgIdsmRfiCreationPopUp"></div>