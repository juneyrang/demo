<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.DateFormat" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<% 
	String pageTitle  = "Dashboard";
	

	Calendar cal = Calendar.getInstance();
	cal.setTime(new Date());

	DateFormat df1 = new SimpleDateFormat("yyyy-MM-01");
	DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
	
	cal.add(Calendar.MONTH, -2);
	String mainFromDate = df1.format(cal.getTime());

	cal.setTime(new Date());
	String mainToDate = df2.format(cal.getTime());
	
	// 230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
	String homeJs = "/resources/scripts/home.js?rv=" + rV;
%>
<jsp:include page="top_left.jsp"></jsp:include>

	<!-- Page level style -->
	
	<!-- Page level plugins -->
	<script src="/resources/ext/chart.js/Chart.js"></script>
	<script src="/resources/ext/bluebird/bluebird.min.js"></script>
	<script src="/resources/ext/fileinput/js/fileinput.js"></script>
	<script src="/resources/ext/fileinput/themes/fas/theme.js"></script>
	<script src="/resources/ext/fileinput/js/locales/kr.js"></script>

	<!-- Page level style -->
	
	<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
	
	<!-- Page level custom scripts -->
	<%--<script src="/resources/scripts/home.js"></script> --%>
	<script src="<%= homeJs %>"></script>
	
	<script type="text/javascript">
		$(document).ready( function() {
			//페이지 Title 설정
			$(document).attr("title", "<%=pageTitle%> " + $(document).attr("title")); 

			//날짜 저장
			 //$('#fromDate').val('2020-11-01');
			 //$('#toDate').val('2020-12-01');

			
		});
		
	</script>
	
	<!-- Page level style sheet -->
	<style type="text/css">
		/* 모달 팝업 최대 높이 설정*/
		#divMyRequestList, #divNoticeList {
			line-height:200%;
		}
		
		.mr-2 > .text-md { margin-top:-15px !important; margin-bottom:19px !important; }
		
		/* file 란 형식 조정 */
		.file-input .btn { padding-top:5px; padding-bottom:5px; font-size:0.9em; }
		.file-drop-zone-title { padding:25px 10px; }
		
		/* 팝업 창 크기, 여백 조정  */
		.modal-body, .modal-body .form-control {
			font-size:0.8rem !important;
			line-height: 1;
		}
		.modal-body .form-group {
			margin-bottom: 0rem;
		}
		label { margin-top:0.5rem; }
		.card_item {
		 	max-height:300px;
		 	overflow:auto;
		}
		
		.card_ellipsis {
			text-overflow:ellipsis;
			white-space:nowrap;
			word-wrap:normal;
			overflow:hidden;
		}
		
		#dlgNoticeEdit textarea {
			line-height: 1.2rem;
		}
		
	</style>

	<div id="tabs" style="display: none; margin-top: -10px; border-bottom : 0;">
		<ul>
		</ul>
	</div>
	
	<!-- Begin Page Content -->
	<div class="container-fluid" id="mainFrame">
	
	<input type="hidden" id="fromDate" value="<%= mainFromDate %>" />
    <input type="hidden" id="toDate"  value="<%= mainToDate %>" />
    
    
    
    
		<!-- Page Heading 
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
			<h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
		</div>-->
		
		<!--
		<div class="row">
			<div class="col-xl-12 col-md-12 mb-12">
				<div class="card shadow mb-4">

					<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
						<h6 class="m-0 font-weight-bold text-primary">Dashboard</h6>
					</div>
					<div class="card-body">
						<iframe width="100%" height="1000px" src="https://app.powerbi.com/reportEmbed?reportId=be9ca14a-fb10-4532-8ad9-c09d2e6b4a40&autoAuth=true&ctid=9d1b3610-9ab0-42d5-93aa-46150d723d87&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9" frameborder="0" allowFullScreen="true"></iframe>						
					</div>
				</div>
			</div>							
		</div>		
		-->
		
		<!-- 
		<div class="row">
			<div class="col-xl-6 col-md-6 mb-6">
				<div class="card shadow mb-4">

					<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
						<h6 class="m-0 font-weight-bold text-primary">Dashboard</h6>
					</div>
					<div class="card-body" style= "height: 581px;">
						
					</div>
				</div>
			</div>
			<div class="col-xl-6 col-md-6 mb-6">
				<div class="card shadow mb-4">

					<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
						<h6 class="m-0 font-weight-bold text-primary">Vessel Map</h6>
					</div>
					<div class="card-body">
						<iframe width="100%" height="541.25" src=https://app.powerbi.com/reportEmbed?reportId=99fc14ac-2b16-4211-b2c7-b271eaa23300&groupId=cbf91140-6748-4788-a63d-e81505f1381c&autoAuth=true&ctid=9d1b3610-9ab0-42d5-93aa-46150d723d87&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0LyJ9 frameborder="0" allowFullScreen="true"></iframe>						
					</div>
				</div>
			</div>							
		</div>
		 -->
		 
		<div class="row">
			
			<div class="col-xl-12 col-md-12 mb-12">
				<div class="card shadow mb-4">

					<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
						<h6 class="m-0 font-weight-bold text-primary">Notice</h6>
						<%
						  Boolean menuCheck = false;
						
						  if(session.getAttribute("ROLE_SEQ") != null) {
							  String roleSeq = session.getAttribute("ROLE_SEQ").toString();
							  String[] roleSeqArr = roleSeq.split(",");
							  
							  for(int i = 0; i < roleSeqArr.length; i++)
							  {
								  String tmpRoleSeq = roleSeqArr[i];
								  if(tmpRoleSeq.equals("1")){
									  menuCheck = true;
								  }
							  }							  
						  }
						  
						  
						  if(menuCheck) { %>
						<a class="" href="/notice.do" role="button" id="moreNotice" title="More..."><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i></a>
						<%	} %>
					</div>
					<div class="card-body">
						<div class="notice-custom" style="height:25rem">
							<div class="row w-100">
								<div class="col-sm-2"><img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="height: 6rem !important;" src="/resources/images/undraw_taking_notes_tjaf.svg" alt=""></div>
								<div class="col-sm-10 text-left" id="divNoticeList">
									<div class="row w-100">
										<div class="col-sm-6 text-ellipsis">Subject</div>
										<div class="col-sm-2 text-center">Attachement</div>
										<div class="col-sm-2 text-center">Date</div>
										<div class="col-sm-2 text-center">Writer</div>
									</div>								
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="templateNotice" class="dp_n">
				<div class="row w-100 hand" onclick="ViewNotice('{0}')">
					<div class="col-sm-6 text-ellipsis">{1}</div>
					<div class="col-sm-2 text-center">{2}</div>
					<div class="col-sm-2 text-center">{3}</div>
					<div class="col-sm-2 text-center">{4}</div>
				</div>
			</div>


		</div>
	
</div>

	<!-- Notice 공통  -->
	<input id="hidJobCode" type="hidden" />

		<!-- New/Edit Modal -->
		<%-- <div class="modal hide fade" id="dlgNoticeEdit" tabindex="-1" role="dialog" aria-labelledby="dlgNoticeEditTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="dlgNoticeEditTitle">공지사항 제목</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="padding-top:8px">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<div class="modal-body">
						<div class="p-2 pl-4 pr-4">
							<div class="form-group row mb-1">
								<div class="col-sm-12">
									<textarea class="form-control form-control-user required" cols="80" id="txtContents" name="txtContents" rows="10" readonly></textarea>
								</div>
							</div>
							<div class="form-group row mb-1">
								<div class="col-sm-12">
									<input id="txtNoticeFile" type="file" name="txtNoticeFile[]" class="form-control form-control-user " title="Select Files" class="file" multiple />
								</div>
							</div>							
							
						</div>
					</div>

					<div class="modal-footer">
						<button class="btn btn-secondary btn-icon-split btn-sm" data-dismiss="modal">
							<span class="icon text-white-50"><i class="fas fa-window-close"></i></span>
							<span class="text"><spring:message code="button.close" /></span>
						</button>
					</div>
				</div>
			</div>
		</div> --%>
	<!-- /.container-fluid -->

<jsp:include page="foot_right.jsp"></jsp:include>