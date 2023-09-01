
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>


<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<jsp:include page="./language.jsp"></jsp:include>

<script src="/resources/ext/bluebird/bluebird.min.js"		></script>
<script src="/resources/ext/fileinput/js/fileinput.js"		></script>
<script src="/resources/ext/fileinput/themes/fas/theme.js"	></script>
<script src="/resources/ext/fileinput/js/locales/kr.js"		></script>
<script src="/resources/js/xlsx.full.min.js"				></script>

<!-- Page level scripts -->
<script src="/resources/scripts/ajaxSetup.js"	></script>
<script src="/resources/scripts/sendFcm.js"	></script>
<script src="/resources/gridJs/GridE.js"		></script>

<script type="text/javascript">
	$(document).ready( function() {
		//페이지 Title 설정
		//$(document).attr("title", $("#lblPageTitle").text() + " "  + $(document).attr("title"));
	});
</script>

<!-- Page level style -->
<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />

<style type="text/css">
	.gridLinkText { color:#0585B9 !important;font-weight:bold !important;cursor:pointer !important; }
	.gridRightText { text-align:right; }
	.gridLeftText { text-align:left; }
	.gridCenterText { text-align:center !important; }
	.gridBorderText { font-weight:bold !important; }
	.gridTextColor { color: #586980 !important; }
	.gridBorderColor { border-right: 1px solid #1182DC !important; }
</style>

<!-- Begin Page Content -->
<div>
	<input id="txtDesmLang" type="hidden" value="<%=session.getAttribute("LANG")%>" />
	
	<!-- DataTales -->
	<div class="card shadow mb-4">
		<div class="card-body-grid" style="vertical-align: middle; ">
			<div class="table-responsive" style="vertical-align: middle; ">
				<div class="container-fluid">
					<div class="row row-sm">
						<div id="divGrid" class="col-sm-6 col-xl-6 col-lg-6" style="padding-right:0; padding-left:0">
							<div id="gridRole" style="padding-top:1px; width:100%; height:800px;"></div>
						</div>
						<div class="col-sm-6 col-xl-6 col-lg-6" style="padding-right:0">
							<div class="card shadow mb-1">
								<div class="card-header py-2">
									<label class="font-weight-bold text-primary">Send Fcm</label>
								</div>
								<div class="card-body" id="sendCardBody">
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold" >
											<label class="font-weight-bold ">Project</label>
										</div>
										<div class="col-sm-3" style="padding-right:0">
											<input id="txtProjectCode" class="form-control form-control-user " type="text" autocomplete="off" style="height:22px;font-size:12;" >
												<!-- 
												<i id="iconSearch" class="fas fa-search" style="float : right;margin:-23px 3px 0 0;cursor : pointer; color : #8CACB2;font-size:1rem;"></i>
												 -->
											</input>
										</div>
										<div class="col-sm-7">
											<input id="txtProjectName" class="form-control form-control-user " type="text" autocomplete="off" style="height:22px;font-size:12" readonly/>
										</div>										
									</div>
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold" >
											<label class="font-weight-bold required">Title</label>
										</div>
										<div class="col-sm-10">
											<input id="txtTitle" class="form-control form-control-user required" type="text" autocomplete="off" style="height:22px;font-size:12" />
										</div>
									</div>	
									<div class="form-group row mb-1">
										<div class="col-sm-2 text-right font-weight-bold" >
											<label class="font-weight-bold required">Contents</label>
										</div>
										<div class="col-sm-10">
											<textarea id="txtContents" class="form-control form-control-user required"  style="font-size:12" rows="32"></textarea>
										</div>
									</div>																	
								</div>
								<div class="card-footer">
									<button id="btnSend" authType="S"  class="btn btn-success btn-icon-split btn-sm" role="button" style="float:right; ">
										<span class="icon text-white-50"><i class="fas fa-save"></i></span>
										<span class="text">Send</span>
									</button>								
								</div>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="sendFcmPopUp"></div>

