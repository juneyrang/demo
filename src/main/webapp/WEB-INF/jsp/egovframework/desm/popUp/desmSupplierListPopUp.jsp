
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmSupplierListPopUpJs = "/resources/scripts/popUp/desmSupplierListPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmSupplierListPopUp.js"></script> --%>
<script src="<%= desmSupplierListPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmSupplierList" tabindex="-1" role="dialog" aria-labelledby="dlgDesmSupplierListTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 800px;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmSupplierListTitle">Search</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				
				<div class="form-group row mb-1" style="padding:0 11px 5px 11px">
					<table border="0" style="width: 100%;">
						<tr>
							<td style="width: 20px;">
								<label class="" style="">Search</label>
							</td>
							<td style="width: 300px;">
								<input id="txtDlgdlgDesmSupplierListSupplierNo" type="text" class="form-control form-control-user required" autocomplete="off">
									<i id="iconDlgDesmSupplierListSupplierNoSearch" class="fas fa-search" style="float : right;margin:-18px 2px 0 0;cursor : pointer; color : #8CACB2;font-size:0.9rem;"></i>
								</input>
							</td>
						</tr>
					</table>
				</div>
				<div id="gridDlgDesmSupplierList" style = "height:300px;"></div>
			
			</div>

			<div class="modal-footer">
				<button id="btnDlgDesmSupplierListAdd" class="btn btn-success btn-icon-split btn-sm" style="display:none">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Add</span>
				</button>
				<button id="btnDlgDesmSupplierListSelect" class="btn btn-success btn-icon-split btn-sm">
					<span class="icon text-white-50"><i class="fas fa-save"></i></span>
					<span class="text">Select</span>
				</button>
				<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
					<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
					<span class="text">Close</span>
				</button>
			</div>
		</div>
	</div>
</div>