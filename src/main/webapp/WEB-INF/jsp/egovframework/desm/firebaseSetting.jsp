<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<script src="/resources/scripts/ajaxSetup.js"></script>

<script type="text/javascript">
	$(document).ready( function() {
		console.log('firebaseSetting.jsp Start');
		
		$('#sendFcmToken').click(() => {
			var paramData = {
					"USER_AD" : $('#userad').val(),
					"TITLE" : $('#title').val(),
					"BODY" : $('#body').val(),
					};
			
			$.ajax({
				async: true,
				type: "POST",
				url: "/firebase/sendFcmByWebTest.do",
				data: paramData,
				success: function (response) {
					console.log('success');
					alert(response.result.status);
				},
				error: function (err) {
					console.log('err');
					console.log(err);
					alert(err);
				}
		    });
			
		});
		
	});

</script>

<div class="container-fluid" >
	<div class="row">
		<div class="col-2 input-container">
			<p>Title</p>
			<input id="title" type="text" name="title" value="test Title" />
			<p>Body</p>
			<input id="body" type="text" name="body" value="test Body" />
			<p>USER AD</p>
			<input id="userad" type="text" name="userad" value="user ad" />
			<button id="sendFcmToken">Send</button>
		</div>
	</div>
</div>
