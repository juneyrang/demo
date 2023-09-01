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
	String pageTitle  = "SWSB";
	

	Calendar cal = Calendar.getInstance();
	cal.setTime(new Date());

	DateFormat df1 = new SimpleDateFormat("yyyy-MM-01");
	DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
	
	cal.add(Calendar.MONTH, -2);
	String mainFromDate = df1.format(cal.getTime());

	cal.setTime(new Date());
	String mainToDate = df2.format(cal.getTime());
%>

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
	<script src="/resources/scripts/home.js"></script>
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
		
		<div class="row">

			<!-- <iframe width="100%" height="1000px" src="https://app.powerbi.com/reportEmbed?reportId=9e48e392-38f2-4ebd-b8aa-f56fa0147de9&autoAuth=true&ctid=9d1b3610-9ab0-42d5-93aa-46150d723d87&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWMtcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe> -->
			<!-- 최신 메일에 변경해준 src를 적용하였지만, 위와 동일함 -->
			<iframe width="100%" height="1000px" src="https://app.powerbi.com/reportEmbed?reportId=9e48e392-38f2-4ebd-b8aa-f56fa0147de9&autoAuth=true&ctid=9d1b3610-9ab0-42d5-93aa-46150d723d87&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWMtcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
						
		</div>		
</div>


	<!-- /.container-fluid -->
