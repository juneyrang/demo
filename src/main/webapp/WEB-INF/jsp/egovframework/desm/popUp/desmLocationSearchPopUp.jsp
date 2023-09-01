
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmLocationSearchPopUpJs = "/resources/scripts/popUp/desmLocationSearchPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmLocationSearchPopUp.js"	></script> --%>
<script src="<%= desmLocationSearchPopUpJs %>"></script>

<div class="modal hide fade" id="dlgDesmLocationSearch" tabindex="-1" role="dialog" aria-labelledby="dlgDesmLocationSearchTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false" style="z-index:1100">
	<div class="modal-dialog modal-dialog-centered modal-lg" role="document" style="max-width: 90%;">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="dlgDesmLocationSearchTitle">Location</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body" style = "padding-bottom : 0px; padding-top:2px">
				<div class="card-body-grid" style="vertical-align: middle; ">
					<div class="table-responsive" style="vertical-align: middle; ">						
						<canvas id="canvasDlgDesmLocationSearch" height="700" width="1200" style="background-size: contain; background-repeat : no-repeat;" ></canvas>	
					</div>	
				</div>
			</div>

		</div>
	</div>
</div>

<div id="dlgDesmLocationSearchPopUp"></div>