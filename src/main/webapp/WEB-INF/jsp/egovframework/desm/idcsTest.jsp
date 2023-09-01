<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>

<script src="/resources/scripts/ajaxSetup.js"></script>

<script type="text/javascript" src="/resources/scripts/oracle_mcs/mcs.js"></script>
<script type="text/javascript" src="/resources/scripts/oracle_mcs/mcsConfig.js"></script>
<script type="text/javascript" src="/resources/scripts/oracle_mcs/idcsConfig.js"></script>

<script type="text/javascript">
	$(document).ready( function() {
		console.log('idcsTest.jsp Start');

		var accessToken;
		const clientId = '9a896877261546fe99ada27b5e27a6a2';
		const clientSecret = '7895194b-d817-49ca-ada1-31f9fba0da87';
		const basic64Str = mcs._utils.encodeBase64(clientId + ':' + clientSecret);
		const basicAuthorization = 'Basic ' + basic64Str;
		const bearerAuthorization = 'Bearer ' + basic64Str;
		const baseUrl = "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/";
		const group_id = "43349a03c4d3498ca5042575a68895d9";

		var test_arr = [
 				//{"userName":"","email":"","name":""}
				{"userName":"615-81-20957","email":"jhkim@lhe.co.kr","name":"(주)엘에치이"}
				,{"userName":"F68736","email":"alessio@eurocom-srl.it","name":"Eurocomsrl"}
				,{"userName":"F69218","email":"lide.sagardui@arflu.com","name":"ARFLUS.A."}
				,{"userName":"F69124","email":"m.clocchiatti@danieli.it","name":"Danieli&C.OfficineMeccanicheS.p.A."}
				,{"userName":"F52978","email":"ssabattini@babcock.com","name":"SPIGS.p.a."}
				,{"userName":"214-86-19096","email":"kjs_0605@nada.co.kr","name":"(주)나다"}
			];

		// first, idcs client accesstoken call
		$('#testIdcsJs').click(function () {
			var options = {};
			options.userName = "BYUNGCHUL.CHOI";
			//options.userName = "desmpark2022";
			searchToken(searchUser,options);

			//searchToken(createUser); //test_arr
		});
		
		// testIdcsSearchUser, search user by AD
		$('#testIdcsSearchUser').click(function () {
			var userAdList = $('#txtSearchIdcsUserAd').val().split(',');
			for(var i = 0; i < userAdList.length; i++) {
				console.log(userAdList[i]);
				var options = {};
				options.userName = userAdList[i].toUpperCase();
				setTimeout(() => {
					searchToken(searchUser,options);
				}, 1500);
			}
			
			//var options = {};
			//options.userName = $('#txtSearchIdcsUserAd').val();
			//searchToken(searchUser,options);
		});

		function searchToken(callbackFunc,options){
			var param = {};
			param.type = "POST";
			param.contentType = "application/x-www-form-urlencoded";
			param.url = baseUrl+"oauth2/v1/token";
			param.authorization = basicAuthorization;
			param.data = 'grant_type=client_credentials&scope=urn:opc:idm:__myscopes__';
			param.callback = callbackFunc;
			param.options = options;
			idcsCall(param);
		}

		function idcsCall(param){
			$.ajax({
				async: true,
				type: param.type,
				url: param.url,
				headers: {
					'Content-Type': param.contentType,
					'Authorization': param.authorization,
				},
				data:(typeof param.data == "string" ? param.data : JSON.stringify(param.data))
			}).done(function (response) {
					console.log('success',response);
					if(response.access_token == null)response.access_token = param.access_token;
					response.options = param.options;
					if(param.callback != null){
						param.callback(response);
					}
			}).fail(function (err) {
					console.log('err',err);
		    });
		}
		
		// idcsCall이랑 구분하기 위해서 그냥 둠..
		function idcsSearchUserCall(param){
			$.ajax({
				async: true,
				type: param.type,
				url: param.url,
				headers: {
					'Content-Type': param.contentType,
					'Authorization': param.authorization,
				},
				data:(typeof param.data == "string" ? param.data : JSON.stringify(param.data))
			}).done(function (response) {
					console.log('success');
					console.log(response);
					if(response.totalResults != 0) {
					console.log('idcs AD : ' + response.Resources[0].userName);
						console.log('idcs Name : ' + response.Resources[0].displayName);
						console.log('idcs ID : ' + response.Resources[0].id);
						console.log('idcs Email : ' + response.Resources[0].emails[0].value);
					}
					else {
						console.log('there are no search user');
					}					

					if(response.access_token == null)response.access_token = param.access_token;
					response.options = param.options;
					if(param.callback != null){
						param.callback(response);
					}
			}).fail(function (err) {
					console.log('err',err);
		    });
		}

		function updateUser(res){
			var param = {};
			if(res.Resources[0] != null){
				param.type = "PATCH";
				param.contentType = "application/json";
				param.url = baseUrl+"admin/v1/Users/"+res.Resources[0].id;
				param.access_token = res.access_token;
				param.authorization = 'Bearer ' + res.access_token

				var data = {};
				var schemas = ["urn:ietf:params:scim:api:messages:2.0:PatchOp"];
				var Operations = [];
				var map = {};
				var emails = [
					{secondary: false, verified: true, type: 'work', primary: true, value: 'hojun8.lee@doosan.com'}
					,{secondary: false, verified: true, type: 'recovery', primary: false, value: 'hojun8.lee@doosan.com'}
 					//{secondary: false, verified: true, type: 'work', primary: true, value: 'ghwns888@naver.com'}
 					//,{secondary: false, verified: true, type: 'recovery', primary: false, value: 'ghwns888@naver.com'}
				];
				var nameMap = {};
				var name = {familyName:"IDCS_TEST_001_NAME2"}; //NAME
				nameMap.op = "replace";
				nameMap.path = "name";
				nameMap.value = name;
				Operations.push(nameMap);

				map.op = "replace";
				map.path = "emails";
				map.value = emails;
				Operations.push(map);

				data.schemas = schemas;
				data.Operations = Operations;
				param.data = data;

				console.log(data);
				idcsCall(param);
			}else{
				alert("IDCS 계정정보 없음");
			}
		}

		function resetPassword(res){
			var param = {};
			if(res.Resources[0] != null){
				param.type = "PUT";
				param.contentType = "application/json";
				param.url = baseUrl+"admin/v1/UserPasswordResetter/"+res.Resources[0].id;
				param.access_token = res.access_token;
				param.authorization = 'Bearer ' + res.access_token
				param.data = {"schemas": ["urn:ietf:params:scim:schemas:oracle:idcs:UserPasswordResetter"]};
				idcsCall(param);
			}else{
				alert("IDCS 계정정보 없음");
			}
		}

		function searchUser(res){
			var param = {};
			var filter = "";
			if(res.options != null){
				filter = "?filter="+encodeURIComponent('userName eq "'+res.options.userName+'"');
				param.callback = res.options.callbackFunc;
			}

			console.log(baseUrl+"admin/v1/Users"+filter);
			param.type = "GET";
			param.url = baseUrl+"admin/v1/Users"+filter;
			param.access_token = res.access_token;
			param.authorization = 'Bearer ' + res.access_token
			//idcsCall(param);
			idcsSearchUserCall(param);
		}

		function createUser(res){
			var param = {};
			param.type = "POST";
			param.contentType = "application/json";
			param.url = baseUrl+"admin/v1/Users";
			param.access_token = res.access_token;
			param.authorization = 'Bearer ' + res.access_token
			param.callback = updateUserGroup;

			for(var i = 0 ; i < test_arr.length ; i ++){
				(function(x){
					setTimeout(function(){
						var test = test_arr[x];
						var data = {};
						var schemas = ["urn:ietf:params:scim:schemas:core:2.0:User","urn:ietf:params:scim:schemas:oracle:idcs:extension:userState:User","urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"];
						var name = {familyName:test.name}; //NAME
						var emails = [ //EMAIL
							{secondary: false, verified: true, type: 'work', primary: true, value: test.email}
							,{secondary: false, verified: true, type: 'recovery', primary: false, value: test.email}
							,{secondary: false, verified: true, type: 'home', primary: false, value: test.email}
						]

						data.schemas = schemas;
						data.userName = test.userName; // ID
						data.name = name;
						data.locale = "en";
						data.preferredLanguage = "en";
						data.emails = emails;
						param.data = data;
						idcsCall(param);
					},1000*x);
				})(i);
			}
		}

		function updateUserGroup(res){
			var param = {};
			param.type = "PATCH";
			param.contentType = "application/json";
			param.url = baseUrl+"admin/v1/Groups/"+group_id;
			param.access_token = res.access_token;
			param.authorization = 'Bearer ' + res.access_token

			var data = {};
			var schemas = ["urn:ietf:params:scim:api:messages:2.0:PatchOp"];
			var Operations = [];
			var map = {};
			map.op = "add";
			map.path = "members";
			map.value = [{"value" : res.id,"type" : "User"}];

			Operations.push(map);
			data.schemas = schemas;
			data.Operations = Operations;
			param.data = data;

			idcsCall(param);
		}

		$('#testIdcsServer').click(function () {
			$.ajax({
				async: true,
				type: "POST",
				url: '/getIdcsUserListTest.do',
				data: {},
				success: function (response) {
					console.log('success',response);
					console.log('success, check log of server and browser development mode.');
				},
				error: function (err) {
					console.log('err',err);
					console.log('fail, check log of server and browser development mode.');
				}
		    });
		});



		$('#testIdcsUpdate').click(function () {
			searchToken(searchUserList);
		});

		function idcsYnUpdate(res){
			var paramData = {};
			var updateList = [];
			for(var i = 0 ; i < res.Resources.length ; i ++){
				var map = {};
				map.id = res.Resources[i].id ;
				map.userName = res.Resources[i].userName;
				map.email = res.Resources[i].emails[0].value;
				map.federated_yn = (res.Resources[i]["urn:ietf:params:scim:schemas:oracle:idcs:extension:user:User"].isFederatedUser == true ? "Y" : "N")
				updateList.push(map);
			}
			paramData.updateList = updateList;
			console.log(paramData);
			$.ajax({
				type: "POST",
				dataType : 'json',
				contentType : 'application/json',
				url: '/updateUserIDCSYn.do',
				data: JSON.stringify(paramData),
			}).done(function (response) {
				console.log('success',response);
				if(startIndex < 10000){
					startIndex += 1000;
					searchUserList();
				}
			}).fail(function (err) {
				console.log('err',err);
		    });
		}
		var startIndex = 0;
		var access_token;
		function searchUserList(res){
			if(res != null)access_token = res.access_token;
			var param = {};
			var filter = "";
			param.callback = idcsYnUpdate;
			param.type = "GET";
			param.url = baseUrl+"admin/v1/Users?count=1000&startIndex="+startIndex;
			param.access_token = (access_token != null ? access_token : res.access_token);
			param.authorization = 'Bearer ' + (access_token != null ? access_token : res.access_token)
			idcsCall(param);
		}

	});

</script>

<div class="container-fluid" >
	<div class="row">
		<div class="col-2 input-container">
			<p>IDCS Web JS Test</p>
			<!-- <button id="testIdcsJs">JS Test</button> -->
		</div>

		<div class="col-2 input-container">
			<p>IDCS Server RestTemplate Test</p>
			<!-- <button id="testIdcsServer">Server Test</button> -->
		</div>

		<div class="col-2 input-container">
			<p>Update User</p>
			<!-- <button id="testIdcsUpdate">Update Test</button> -->
		</div>
		
		<div class="col-2 input-container">
			<p>Search User by AD (, 로 여러명)</p>
			<input id="txtSearchIdcsUserAd" type="text" />
			<button id="testIdcsSearchUser">Search Test</button>
		</div>

	</div>
</div>
