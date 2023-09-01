
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String exportClearancePopUpJs = "/resources/scripts/popUp/exportClearancePopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/exportClearancePopUp.js"	></script> --%>
<script src="<%= exportClearancePopUpJs %>"></script>

<div class="modal hide fade" id="dlgExportClearance" tabindex="-1" role="dialog" aria-labelledby="dlgExportClearanceTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-xl modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" >
				<h6 class="modal-title" id="dlgExportClearanceTitle">수출통관의뢰</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="padding: 5px">
				<div class="container-fluid" style="padding: 0px;">
					<div class="row row-sm">
						<div class="col-sm-12 col-xl-12 col-lg-12">
							<div class="card shadow mb-2" style = "margin-top: 2px;">
								<div class="card-header py-1" style="padding:1px 2px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;">공통</label>
									<label style="vertical-align: middle; height: 20px;"></label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Export No</label>
										</div>
										<div class="col-sm-4" >
											<input id="txtDlgExportNo" type="text" class="form-control form-control-user" autocomplete="off" readonly>
											<input id="hidDlgExportHeaderId" type="hidden" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Status</label>
										</div>
										<div class="col-sm-4" >
											<input id="txtDlgStatus" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row row-sm">
						<div class="col-sm-12 col-xl-12 col-lg-12">
							<div class="card shadow mb-2" style = "margin-top: 2px;">
								<div class="card-header py-1" style="padding:1px 2px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;">General</label>
									<label style="vertical-align: middle; height: 20px;"></label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Non Proj.</label>
										</div>
										<div class="col-sm-2" >
											<input id="chkDlgNonProj" type="checkbox" class="form-control form-control-user">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Apply Date</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgApplyDate" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgEpcProj" class="" style="line-height : 2">EPC Proj.</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgEpcProj" type="text" class="form-control form-control-user search-only" autocomplete="off" readonly>
											<i id="iconDlgSearchEpcProj" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgEpcProjId" type="hidden" class="form-control form-control-user" autocomplete="off">
											<input id="hidDlgEpcProjName" type="hidden" class="form-control form-control-user" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgProjectNo" class="required" style="line-height : 2">Project No</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgProjectNo" type="text" class="form-control form-control-user search-only required" autocomplete="off" readonly>
											<i id="iconDlgSearchProject" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgProjectName" type="hidden" class="form-control form-control-user" autocomplete="off">
											<input id="hidDlgProjectId" type="hidden" class="form-control form-control-user" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="통관수수료, 운송비 등 물류비용 정산을 위한 필수값.">
												<i id="iconDlgInfoTaskNo" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label id="lblDlgTaskNo" class="required" style="line-height : 2">Task No</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgTaskNo" type="text" class="form-control form-control-user search-only required" autocomplete="off" readonly>
											<i id="iconDlgSearchTask" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgTaskId" type="hidden" class="form-control form-control-user" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgInvoiceNo" class="required" style="line-height : 2">Invoice No</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgInvoiceNo" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgMainItem" class="required" style="line-height : 2">Main Item</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgMainItem" type="text" class="form-control form-control-user required" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgCurrency" class="required" style="line-height : 2">Currency</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgCurrency" type="text" class="form-control form-control-user search-only required" autocomplete="off" readonly>
											<i id="iconDlgCurrency" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgTotalAmount" class="required" style="line-height : 2">Total Amount</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgTotalAmount" type="text" class="form-control form-control-user required currency" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgChargeAccount" class="required" style="line-height : 2">Charge Account</label>
										</div>
										<div class="col-sm-6" >
											<input id="txtDlgChargeAccount" type="text" class="form-control form-control-user search-only required" autocomplete="off" readonly>
											<i id="iconDlgSearchChargeAccount" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgCodeCombinationId" type="hidden" class="form-control form-control-user search-only required" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgQuantity" class="required" style="line-height : 2">Quantity</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgQuantity" type="text" class="form-control form-control-user required currency" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgQuantityUnit" class="required" style="line-height : 2">Quantity Unit</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgQuantityUnit" type="text" class="form-control form-control-user search-only required" autocomplete="off" readonly>
											<i id="iconDlgSearchQuantityUnit" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgPackingCount" class="required" style="line-height : 2">Packing Count</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgPackingCount" type="text" class="form-control form-control-user required currency" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Exchange Type</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgExchangeType" class="form-control form-control-user">
												<option value="">-</option>
												<option value="Corporate">Corporate</option>
												<option value="User">User</option>
											</select>											</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Exchange Date</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgExchangeDate" type="text" class="form-control form-control-user" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgNetWeight" class="required" style="line-height : 2">Net Weight</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgNetWeight" type="text" class="form-control form-control-user required currency" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Net Weight Unit</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgNetWeightUnit" type="text" class="form-control form-control-user search-only" autocomplete="off" readonly>
											<i id="iconDlgSearchNetWeightUnit" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgGrossWeight" class="required" style="line-height : 2">Gross Weight</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgGrossWeight" type="text" class="form-control form-control-user required currency" autocomplete="off">
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Gross Weight Unit</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgGrossWeightUnit" type="text" class="form-control form-control-user search-only" autocomplete="off" readonly>
											<i id="iconDlgSearchGrossWeightUnit" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row row-sm">
						<div class="col-sm-12 col-xl-12 col-lg-12">
							<div class="card shadow mb-2" style = "margin-top: 2px;">
								<div class="card-header py-1" style="padding:1px 2px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;">More</label>
									<label style="vertical-align: middle; height: 20px;"></label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgCustomsType" class="required" style="line-height : 2">Customs Type</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgCustomsType" class="form-control form-control-user required">
												<option value="당사환급">당사환급</option>
												<option value="업체환급">업체환급</option>
												<option value="해당없음">해당없음</option>
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="물품의 현재 위치에 따라 신고 세관이 결정되며, 신고 세관에서 제품 실물을 확인 할 때 신고된 장소에 제품이 있어야 법적 처벌을 받지 않습니다.">
												<i id="iconDlgInfoStoredPlace" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label id="lblDlgStoredPlace" class="required" style="line-height : 2">Item Stored Place</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgStoredPlace" type="text" class="form-control form-control-user required" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgPortLoading" class="required" style="line-height : 2">Port Of Loading</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgPortLoading" type="text" class="form-control form-control-user required" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgPortDest" class="required" style="line-height : 2">Port Of Destination</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgPortDest" type="text" class="form-control form-control-user required" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required" style="line-height : 2">Manufacturer</label>
										</div>
										<div class="col-sm-2" >
											<!--<input id="txtDlgManufacturer" type="text" class="form-control form-control-user" autocomplete="off" >-->
											<input id="txtDlgManufacturer" type="text" class="form-control form-control-user" autocomplete="off" autocomplete="off" >
											<i id="iconDlgSearchManufacturer" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgManufacturer" type="hidden" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="수출자: 한전 / 삼성물산 / 두산중공업 중 하나가 입력되어야 합니다." style="cursor: default;">
												<i id="iconDlgInfoExporter" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label class="required" style="line-height : 2">Exporter</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgExporter" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgPriceTerms" class="required" style="line-height : 2">Price Terms</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgPriceTerms" type="text" class="form-control form-control-user search-only required" autocomplete="off" >
											<i id="iconDlgSearchPriceTerms" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Ship Name</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgShipName" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Request Ic Date</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgRequestIcDate" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Remarks</label>
										</div>
										<div class="col-sm-10" >
											<textarea id="txtDlgRemarks" class="form-control form-control-user" style="margin-bottom:2px; " autocomplete="off" ></textarea>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgReCarryIn" class="required" style="line-height : 2">재반입여부</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgReCarryIn" class="form-control form-control-user required">
												<option value="N">N</option>
												<option value="Y">Y</option>
											</select>
										</div>
										<!-- 전략물자, License No, 해당/비해당, 해당/비해당 판정서, 수출 허가서 숨김처리, 필요시 dp_n 클래스 제거 -->
										<div class="col-sm-2 text-right font-weight-bold dp_n">
											<label id="lblDlgStrategic" class="" style="line-height : 2">전략물자포함</label>
										</div>
										<div class="col-sm-2 dp_n" >
											<select id="selDlgStrategic" class="form-control form-control-user ">
												<option value="">-</option>
												<option value="N">N</option>
												<option value="Y">Y</option>
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold dp_n">
											<label class="" style="line-height : 2">License No</label>
										</div>
										<div class="col-sm-2 dp_n" >
											<input id="txtDlgLicenseNo" type="text" class="form-control form-control-user search-only" autocomplete="off" readonly>
											<i id="iconDlgSearchLicenseNo" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
										</div>
										<div class="col-sm-2 text-right font-weight-bold dp_n">
											<label class="" style="line-height : 2">해당/비해당</label>
										</div>
										<div class="col-sm-2 dp_n" >
											<select id="selDlgStrategicFlag" class="form-control form-control-user">
												<option value=""></option>
												<option value="Y">전략물자 해당</option>
												<option value="N">전략물자 비해당</option>
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold dp_n">
											<label class="" style="line-height : 2">해당/비해당 판정서</label>
										</div>
										<div class="col-sm-2 dp_n" >
											<input id="txtDlgDecisionUrl" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold dp_n">
											<label class="" style="line-height : 2">수출허가서</label>
										</div>
										<div class="col-sm-2 dp_n" >
											<input id="txtDlgExportAdmission" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<!-- 전략물자, License No, 해당/비해당, 해당/비해당 판정서, 수출 허가서 숨김처리 END-->
										<!-- ERP와 다른 필드 추가 적재예정 보세구역 코드, 원상태 수출 여부, FTA원산지 발급대상 여부, 서류마감시간, 재수출여부 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Decision Maker</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDecisionMaker" type="text" class="form-control form-control-user search-only" autocomplete="off" >
											<i id="iconDlgSearchDecisionMaker" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgDecisionMakerCode" type="hidden" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Decision Reason</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgDecisionReason" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<!-- 재수출여부 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgReExport" class="required" style="line-height : 2">재수출여부</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgReExport" class="form-control form-control-user required">
												<option value="N">N</option>
												<option value="Y">Y</option>
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgProjectManager" class="required" style="line-height : 2">Project Manager</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgProjectManager" type="text" class="form-control form-control-user search-only required" autocomplete="off" >
											<i id="iconDlgSearchProjectManager" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgProjectManagerCode" type="hidden" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Project Manager Team</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgProjectManagerTeam" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<!-- 원상태 수출 여부 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="수입물품을 제조/가공 없이 수출하는 경우 Y" style="cursor: default;">
												<i id="iconDlgInfoOriginalExport" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label id="lblDlgOriginalExport" class="required" style="line-height : 2">원상태 수출여부</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgOriginalExport" class="form-control form-control-user required">
												<option value="N">N</option>
												<option value="Y">Y</option>
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgEngineer" class="required" style="line-height : 2">Engineer</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgEngineer" type="text" class="form-control form-control-user search-only required" autocomplete="off" >
											<i id="iconDlgSearchEngineer" class="fas fa-search" style="float : right;margin:-17px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
											<input id="hidDlgEngineerCode" type="hidden" class="form-control form-control-user" autocomplete="off" >
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Engineer Team</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgEngineerTeam" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<!-- 전략물자해당여부 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="required"  id="lblDlgStrategicMaterial"  style="line-height : 2">전략물자 해당여부</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgStrategicMaterial" class="form-control form-control-user required">
												<option value="N">N</option>
												<option value="Y">Y</option>
											</select>
										</div>
										<!-- 적재예정 보세구역 코드 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="운송사에서 알려준 보세장치장 코드 8자리" style="cursor: default;">
												<i id="iconDlgInfoLoadingBondedArea" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label class="required" style="line-height : 2">적재예정 보세구역 코드</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgLoadingBondedArea" type="text" class="form-control form-control-user required" autocomplete="off" >
										</div>
										<!-- 서류마감시간 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="필증이 나와야 하는 Due Date" style="cursor: default;">
												<i id="iconDlgInfoCertificateDate" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label class="required" style="line-height : 2">서류마감시간</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgCertificateDate" type="text" class="form-control form-control-user required" autocomplete="off" >
										</div>
										<!-- 수출허가번호 코드 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<a href="#" title="전략물자 해당여부가 Y 일경우 필수입력" style="cursor: default;">
												<i id="iconDlgExportLicenseNumber" class="fas fa-info-circle" style="color: red; font-size:0.8rem;"></i>
											</a>
											<label style="line-height : 2">수출허가번호</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgExportLicenseNumber" type="text" class="form-control form-control-user" autocomplete="off" >
										</div>
										<!-- FTA 원산지 발급대상 여부 -->
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgFtaOrigin" class="required" style="line-height : 2">FTA원산지 발급대상</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgFtaOrigin" class="form-control form-control-user required">
												<option value="N">N</option>
												<option value="Y">Y</option>
											</select>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label id="lblDlgFtaName" class="" style="line-height : 2">FTA Name</label>
										</div>
										<div class="col-sm-2" >
											<select id="selDlgFtaName" class="form-control form-control-user">
												<option value="">선택</option>
												<!-- <option value="NONE">미정</option> -->
												<option value="EU">한-EU FTA</option>
												<option value="USA">한-미 FTA</option>
												<option value="ASEAN">한-ASEAN FTA</option>
												<option value="Chile">한-칠레 FTA</option>
												<option value="EFTA">한-EFTA FTA</option>
												<option value="PERU">한-페루 FTA</option>
												<option value="INDIA">한-인도 CEPA</option>
												<option value="AUSTRALIA">한-호주 FTA</option>
												<option value="CANADA">한-캐나다 FTA</option>
												<option value="TURKEY">한-터키 FTA</option>
												<option value="CHINA">한-중 FTA</option>
												<option value="RCEP">한-RCEP FTA</option>
												<option value="GBR">한-영국 FTA</option>
												<option value="VNM">한-베트남 FTA</option>
												<option value="SGP">한-싱가폴 FTA</option>
												<option value="INDONESIA">한-인도네시아 CEPA</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row row-sm">
						<div class="col-sm-12 col-xl-12 col-lg-12">
							<div class="card shadow mb-2" style = "margin-top: 2px;">
								<div class="card-header py-1" style="padding:1px 2px 1px 10px !important; vertical-align: middle;">
									<label class="font-weight-bold text-primary" style="vertical-align: middle;">Status</label>
									<label style="vertical-align: middle; height: 20px;"></label>
								</div>
								<div class="card-body" style="padding: 1px">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Creation Date</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgCreationDate" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Creater</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgCreater" type="text" class="form-control form-control-user" autocomplete="off" readonly>
											<input id="hidDlgCreaterAD" type="hidden" class="form-control form-control-user" autocomplete="off" readonly>
											<input id="hidDlgUpdateAD" type="hidden" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Approved Date</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgApprovedDate" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Approver</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgApprover" type="text" class="form-control form-control-user" autocomplete="off" readonly>
											<input id="hidDlgApproverId" type="hidden" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">CL Doc No</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgCLDocNo" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">CL License Date</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgCLLicenseDate" type="text" class="form-control form-control-user " autocomplete="off" readonly>
										</div>
										<div class="col-sm-2 text-right font-weight-bold">
											<label class="" style="line-height : 2">Refund Status</label>
										</div>
										<div class="col-sm-2" >
											<input id="txtDlgRefundStatus" type="text" class="form-control form-control-user" autocomplete="off" readonly>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnDlgSave" authType="S" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">저장</span>
				</button>
				<button id="btnDlgEditFile" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-paperclip"></i></span>
					<span class="text">첨부파일</span>
				</button>
				<button id="btnDlgApprove" authType="S" class="btn btn-primary btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-stamp"></i></span>
					<span class="text">승인요청</span>
				</button>
				<button id="btnDlgPirvatePo" authType="S" class="btn btn-info btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-bars"></i></span>
					<span class="text">사급PO</span>
				</button>
				<button id="btnDlgDelete" authType="S" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-trash"></i></span>
					<span class="text">삭제</span>
				</button>
				<button id="btnDlgCancel" authType="S" class="btn btn-danger btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-ban"></i></span>
					<span class="text">Cancel</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>
		</div>
	</div>
</div>

<input id="hidFileGrpCd" type="hidden" />

<div id="divExportClearancePopUp"></div>

<!-- ChargeAccount Dialog -->
<div class="modal hide  fade" id="dialogChargeAccount" tabindex="-1" role="dialog" aria-labelledby="dialogCATitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dialogCATitle">Charege Account</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<input type="hidden" id="hidLineNum" />
			<input type="hidden" id="hidPjtName" />
			<input type="hidden" id="hidTaskName" />
			<input type="hidden" id="hidExpenditureType" />
			<input type="hidden" id="hidExpenditureOrg" />
			<input type="hidden" id="hidCardSeqId" />

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<!-- BU : BU, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">BU</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCABU" type="text" segment="SEGMENT1" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCABU" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCABU"></label></div>
					</div>
					<!-- Cost Center(부서) : Cost Center, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Cost Center</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCACCenter" type="text" segment="SEGMENT2" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCACCenter" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCACCenter"></label></div>
					</div>
					<!-- Account(계정코드) : Account, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Account</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCAAccount" type="text" segment="SEGMENT3" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCAAccount" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCAAccount"></label></div>
					</div>
					<!-- Budget Center(부서) : Budget Center, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Budget Center</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCABCenter" type="text" segment="SEGMENT4" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCABCenter" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCABCenter"></label></div>
					</div>
					<!-- Project : Project, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Project</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCAProject" type="text" segment="SEGMENT5" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCAProject" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCAProject"></label></div>
					</div>
					<!-- Sub Key (Task ????) : Sub Key, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Subkey</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCASubKey" type="text" segment="SEGMENT6" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCASubKey" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCASubKey"></label></div>
					</div>
					<!-- Allocation(부서) : Allocation, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Allocation</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCAAlloc" type="text" segment="SEGMENT7" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCAAlloc" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCAAlloc"></label></div>
					</div>
					<!-- Future : Future, Description -->
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-2 text-right font-weight-bold"><label class="required">Future</label></div>
						<div class="col-sm-4">
							<input id="txtDlgCAFuture" type="text" segment="SEGMENT8" class="form-control form-control-user search-only required">
							<i id="iconDlgSearchCAFuture" class="fas fa-search text-search-icon"></i>
						</div>
						<div class="col-sm-6 text-left"><label id="lblDlgCAFuture"></label></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnChargeAccountModalSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">확인</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>

			</div>
		</div>
	</div>
</div>


<!-- 사급PO Dialog -->
<div class="modal hide  fade" id="dialogPrivatePO" tabindex="-1" role="dialog" aria-labelledby="dialogCATitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="dialogCATitle">사급 PO</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">

					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5 text-center font-weight-bold">PO NO</div>
						<div class="col-sm-7 text-center font-weight-bold">PO Status</div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_1" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_1"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_2" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_2"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_3" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_3"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_4" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_4"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_5" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_5"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_6" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_6"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_7" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_7"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_8" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_8"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_9" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_9"></label></div>
					</div>
					<div class="form-group row mt-1 mb-1">
						<div class="col-sm-5"><input id="txtDlgPrivatePO_10" type="text" class="form-control form-control-user"></div>
						<div class="col-sm-7 text-left readonly"><label id="lblDlgPrivatePO_10"></label></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btnPrivatePOModalSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">확인</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>

			</div>
		</div>
	</div>
</div>