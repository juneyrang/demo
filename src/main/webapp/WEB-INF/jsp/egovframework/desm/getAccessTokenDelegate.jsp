<html>
<head>
	<script src="/resources/ext/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="/resources/scripts/oracle_mcs/mcs.js"></script>
	<script type="text/javascript" src="/resources/scripts/oracle_mcs/mcsConfig.js"></script>
    <script type="text/javascript" src="/resources/scripts/oracle_mcs/idcsConfig.js"></script>
	<script>
		$(function () {
			"use strict";
			
			const type = $('#type').val();
			const codeValue = $('#code').val();
			
			
			const clientId = (type == 'in') ? idcsConfig.clientIdIn : idcsConfig.clientIdEx;
			const clientSecret = (type == 'in') ? idcsConfig.clientSecretIn : idcsConfig.clientSecretEx;
			//const basic64Str = mcs._utils.encodeBase64(mcsConfig.mobileBackend.authentication.oauth.clientId
			//		+ ':' + mcsConfig.mobileBackend.authentication.oauth.clientSecret);
			const basic64Str = mcs._utils.encodeBase64(clientId + ':' + clientSecret);
			
			const authorization = 'Basic ' + basic64Str;
			const data = {
					grant_type: 'authorization_code',
					code: codeValue,
					redirect_uri: idcsConfig.oauthTokenCallbackPoint,
					
			};
			//redirect_uri: (type == 'in') ? idcsConfig.oauthTokenCallbackPoint : idcsConfig.oauthTokenEndpoint,
			$.ajax({
				async: true,
				type: "POST",
				url: idcsConfig.oauthTokenEndpoint,
				headers: {
					Authorization: authorization,
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
				},
				data: data,
				success: function (response) {
					console.log('success');
					console.log(response);
					saveAccessToken('success', response);
				},
				error: function (err) {
					console.log('err');
					console.log(err);
					saveAccessToken('fail', err);
				}
		    });
			
			function saveAccessToken(result, response) {
				console.log(result);
				//window.ReactNativeWebView.postMessage({type: 'close'});true;
				//window.postMessage({type: 'close'});true;
	        	//debugger;
	        	
	        	if(result == 'success') {
	        		$.ajax({
						async: false,
						type: "POST",
						url: '/mobile/saveAccessTokenDelegate.do',
						data: { "result": result, "response": response, "return_code": codeValue },
				        dataType: "json",
						headers: {
							'idcs_service_url' : $('#idcs_service_url').val()
						},				        
						success: function (data, textStatus, jqXHR) { },
				        error: function (er) { },
				        complete: function (e) {
				        	//window.open('','_self').close();
				        	//parent.window.open('about:blank', '_self').close();
				        	//window.ReactNativeWebView.postMessage({type: 'close'});true;
				        	window.ReactNativeWebView.postMessage(JSON.stringify({
				        		type: 'close',
				        		result: result,
				        		response: response
				        		}));
						}
				    });
	        	}
	        	else {
	        		window.ReactNativeWebView.postMessage(JSON.stringify({
		        		type: 'error',
		        		result: result,
		        		response: response,
		        		clientId: clientId,
		        		redirect_uri: redirect_uri
		        		}));
	        	}
			}
		});
	</script>
</head>

<body>
	<input type="hidden" id="type" value="${type}" />
	<input type="hidden" id="code" value="${code}" />
	<input type="hidden" id="idcs_service_url" value="${idcs_service_url}" />
	<h1>Get Access Check..</h1>
</body>
</html>