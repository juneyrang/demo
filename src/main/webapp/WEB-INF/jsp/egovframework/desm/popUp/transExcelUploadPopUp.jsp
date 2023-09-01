
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String transExcelUploadPopUpJs = "/resources/scripts/popUp/transExcelUploadPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/transExcelUploadPopUp.js"	></script> --%>
<script src="<%= transExcelUploadPopUpJs %>"></script>

<div class="modal hide fade" id="dlgTransShippingRequetsExcelUpload" tabindex="-1" role="dialog" aria-labelledby="dlgTransShippingRequetsExcelUploadTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 70%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgTransShippingRequetsExcelUploadTitle">Excel Upload</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<table border="0" style="width: 100%;">
							<tr>
								<td style="width: 20px;">
									<label class="" style="">Project 선택</label>
								</td>
								<td style="width: 300px;">
									<select id="selDlgTransShippingRequetsExcelUploadSelect" type="text" class="form-control form-control-user" style="width: 100px;">
										<option value="공통양식">공통양식</option>
										<option value="Jawa 9&10">Jawa 9&10</option>
										<option value="주단품">주단품</option>
										<option value="Tuwaiq">Tuwaiq</option>
										<!-- <option value="test">test</option> -->
									</select>
									<input  type="file" id="btnDlgTransShippingRequetsExcelUploadFile" style="display:none"/>
								</td>
							</tr>
						</table>
					</div>
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="dlgTransShippingRequetsExcelUploadGrid" style="height : 400px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button id="btnDlgExcelUploadUpload" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50" ><i class="fas fa-file-excel" ></i></span>
					<span class="text" >Excel Upload</span>
				</button>			
				<button id="btnDlgExcelUploadSave" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-file-excel"></i></span>
					<span class="text">적용</span>
				</button>																							
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal hide fade" id="dlgTransShippingRequetsExcelUploadSheet" tabindex="-1" role="dialog" aria-labelledby="dlgTransShippingRequetsExcelUploadSheetTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 30%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgTransShippingRequetsExcelUploadSheetTitle">Sheet 선택</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="p-2 pl-4 pr-4">
					<div class="form-group row mb-1">
						<div class="table-responsive" style = "padding-top: 5px;">
							<div id="dlgTransShippingRequetsExcelUploadSheetGrid" style="height : 200px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">																	
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">닫기</span>
				</button>
			</div>
		</div>
	</div>
</div>

