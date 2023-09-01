<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
	<script src="/resources/js/jquery-1.11.1.js"></script>
<head>
	<script>
		
	  	if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
	    	window.location = 'microsoft-edge:' + window.location;
	    	setTimeout(function() {
	      		//window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
				document.getElementById("frm1").src =  'https://go.microsoft.com/fwlink/?linkid=2135547';
	    	}, 1);
	  	}
	  	else
	  	{	
	  		
			$.ajax({
				type: "POST",
				url: "/login_click.do",
				dataType: "json",
				data: { 
					"USER_ID" : "${id}"
				},
				success: function(data) {
					debugger;
					var list = data.results;
					
					if(list == null || list.length < 1){
						alert('<spring:message code="alert.auth" />');
					}else{
						
						var lang = "en";
						if (getLanguage() === 'ko-KR' || getLanguage() === 'ko') {
							lang = "ko";
						}
						var url = '/main_click.do?lang=' + lang + "&menu_id=${menu_id}";					
						window.location.href = url;
					}
				},
				error: function (xhr, txtStatus, errorThrown) {
					console.log(xhr);
					console.log(txtStatus);
					console.log(errorThrown);
					alert('<spring:message code="alert.error" />');
					
				}
			});	
	  			
	  	}
	  	
		function getLanguage() {
			  return navigator.language || navigator.userLanguage;
		}  	  	
	</script>
</head>

<body>
	<iframe id="frm1" width="100%" height="100%"  frameborder="0" allowFullScreen="true"></iframe>	
	
</body>
</html>