var IDCS = {};
(function(){

	IDCS.searchUser = function(param){
		var user;
		$.ajax({
			async: false,
			type: "POST",
			url: "/searchIDCSUser.do",
			data:param
		}).done(function (res) {
			console.log(res);
			if(res.results.success != null){
				console.log(res.results.success);
				user = res.results.success;
			}else{
				alert_fail(res.results.error);
			}
		}).fail(function (err) {
			console.log('err',err);
			alert_fail(err.responseText);
		});
		return user;
	}

	IDCS.updateUser = function(param,callbackFunc){
		$.ajax({
			type: "POST",
			url: "/updateIDCSUser.do",
			data:param
		}).done(function (res) {
			if(res.results.success != null){
				if(callbackFunc != null){
					callbackFunc(res);
				}
			}else{
				alert_fail(res.results.error);
			}
		}).fail(function (err) {
			console.log('err',err);
			alert_fail(err.responseText);
		});
	}

	IDCS.updateUserUUID = function(param,callbackFunc){
		$.ajax({
			type: "POST",
			dataType : 'json',
			contentType : 'application/json',
			url: '/updateUserIDCSYn.do',
			data: JSON.stringify(param),
		}).done(function (res) {
			console.log(res);
			if(res.results.success != null){
				if(callbackFunc != null){
					callbackFunc(res);
				}
			}else{
				alert_fail(res.results.error);
			}
		}).fail(function (err) {
			console.log('err',err);
			alert_fail(err.responseText);
		});
	}

	IDCS.createUser = function(param,callbackFunc){
		$.ajax({
			type: "POST",
			url: "/createIDCSUser.do",
			data:param
		}).done(function (res) {
			if(res.results.success != null){
				if(callbackFunc != null){
					callbackFunc(res);
				}
			}else if(res.results.error == "OVERLAP"){
				alert_fail($('#alertSaveSubconUserErr').val());
			}else{
				alert_fail(res.results.error);
			}
		}).fail(function (err) {
			console.log('err',err);
			alert_fail(err.responseText);
		});
	}

	IDCS.resetPassword = function(param,callbackFunc){
		$.ajax({
			type: "POST",
			url: "/resetIDCSPassword.do",
			data:param
		}).done(function (res) {
			if(res.results.success != null){
				if(callbackFunc != null){
					callbackFunc(res);
				}
			}else{
				alert_fail(res.results.error);
			}
		}).fail(function (err) {
			console.log('err',err);
			alert_fail(err.responseText);
		});
	}

})();