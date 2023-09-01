<html>
<head>
	<style>
		body { margin-top: 100px; background-color: #2b88dc; color: #fff; text-align:center; }
		h1 {
		  margin-bottom: 40px;
		}
		#loading {
		  display: inline-block;
		  width: 50px;
		  height: 50px;
		  border: 3px solid rgba(255,255,255,.3);
		  border-radius: 50%;
		  border-top-color: #fff;
		  animation: spin 1s ease-in-out infinite;
		  -webkit-animation: spin 1s ease-in-out infinite;
		}
		
		@keyframes spin {
		  to { -webkit-transform: rotate(360deg); }
		}
		@-webkit-keyframes spin {
		  to { -webkit-transform: rotate(360deg); }
		}
	</style>
	<script src="/resources/ext/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="/resources/scripts/oracle_mcs/mcs.js"></script>
	<script type="text/javascript" src="/resources/scripts/oracle_mcs/mcsConfig.js"></script>
    <script type="text/javascript" src="/resources/scripts/oracle_mcs/idcsConfig.js"></script>
	<script>
		$(function () {
			"use strict";
			
			const type = $('#type').val();
			const codeValue = $('#code').val();
			const loc = $('#loc').val();
			const region = $('#region').val();
			
			//Only IDCS Application
			const clientId = (loc == 'dev') ? idcsConfig.clientIdWebIdcsDev : ((region == 'bah') ? idcsConfig.clientIdWebIdcsProdBah : idcsConfig.clientIdWebIdcsProd);
			const clientSecret = (loc == 'dev') ? idcsConfig.clientSecretWebIdcsDev : ((region == 'bah') ? idcsConfig.clientSecretWebIdcsProdBah : idcsConfig.clientSecretWebIdcsProd);
			const basic64Str = mcs._utils.encodeBase64(clientId + ':' + clientSecret);
			const authorization = 'Basic ' + basic64Str;
			
			const redirect = (loc == 'dev') ? 'https://desm.doosanenerbility.com:712/idcs_result.do' : ((region == 'bah') ? 'https://desmb.doosanenerbility.com/idcs_result.do' : 'https://desm.doosanenerbility.com/idcs_result.do');
			
			const data = {
					grant_type: 'authorization_code',
					code: codeValue,
					//redirect_uri: 'https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/token',
					//redirect_uri: 'http://localhost:8090/idcs_result.do',
					redirect_uri: redirect,
			};
			
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
					idcsLogin('success', response);
				},
				error: function (err) {
					console.log('err');
					console.log(err);
					idcsLogin('fail', err);
				}
		    });
			
			function idcsLogin(result, response) {
				$.ajax({
					async: true,
					type: "POST",
					url: '/idcs_login_success.do',
					data: {
						"token" : response.access_token
					},
					success: function (response) {
						if (response.error != null) {
							window.location.href = "/";
						}
						else {
							// TODO: Default Country에 다라 lang=en으로 변경
							var redirectUrl = (response.lang != null) ? "/main.do?lang=" + response.lang : "/main.do?lang=ko"; 
							window.location.href = redirectUrl;
							//movePage();
						}
					},
					error: function (err) {
						window.location.href = "/";
					}
			    });
			}
		});
	</script>
</head>

<body>
	<input type="hidden" id="type" value="${type}" />
	<input type="hidden" id="code" value="${code}" />
	<input type="hidden" id="loc" value="${loc}" />
	<input type="hidden" id="region" value="${region}" />
	<h1>Please wait while login process</h1>
	<div id="loading"></div>
</body>
</html>