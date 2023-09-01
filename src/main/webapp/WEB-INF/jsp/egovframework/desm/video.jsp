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
	<script src="/resources/scripts/video.js"></script>
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
	<div id="templateNotice" class="dp_n">
		<div class="row w-100 hand" onclick="ViewNotice('{0}')">
			<div class="col-sm-6 text-ellipsis">{1}</div>
			<div class="col-sm-2 text-center">{2}</div>
			<div class="col-sm-2 text-center">{3}</div>
			<div class="col-sm-2 text-center">{4}</div>
		</div>
	</div>
	<!-- Begin Page Content -->
	<div class="container-fluid" id="mainFrame">		 
		<div class="row">
			<div class="col-xl-12 col-md-12 mb-12">
				<div class="card shadow mb-4" style="margin-bottom:0.3rem !important">

					<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
						<h6 class="m-0 font-weight-bold text-primary">111111111</h6>
						
						<a class="" href="javascript:cardBodyShow('card-body1');" role="button" title="More..."><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i></a>
						
					</div>
					<div id="card-body1" name="div-card-body" class="card-body dp_n" >
						<div class="notice-custom" style="height:600px">
							<div class="row w-100">
								<div class="col-sm-12 text-center" id="aa">
									<div class="row w-100" style="justify-content:center">
										<video style="height:600px" src="/resources/video/DESM_Video_clip_TEST.mp4" controls muted ></video>
									</div>								
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xl-12 col-md-12 mb-12">
				<div class="card shadow mb-4" style="margin-bottom:0.3rem !important">

					<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
						<h6 class="m-0 font-weight-bold text-primary">22222</h6>
						
						<a class="" href="javascript:cardBodyShow('card-body2');" role="button" title="More..."><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i></a>
						
					</div>
					<div id="card-body2" name="div-card-body" class="card-body dp_n" >
						<div class="notice-custom" style="height:600px">
							<div class="row w-100" >
								<div class="col-sm-12 text-center" id="aa">
									<div class="row w-100" style="justify-content:center">
										<video style="height:600px" src="/resources/video/DESM_Video_clip_TEST.mp4" controls muted ></video>
									</div>								
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</div>

	<!-- /.container-fluid -->

<jsp:include page="foot_right.jsp"></jsp:include>