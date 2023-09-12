(function($) {
	let dlgUserDetailContentObj = {
		param: null,
		callback: null,
		init: function(param, callback) {
			console.log('dlgUserDetailContentObj', param, callback);
			this.param = param;
			this.callback = callback;
			$('#dlgUserDetail').modal('show');
			this.event();
		},
		event: function() {
			$('#dlgUserDetail').on('show.bs.modal', function (e) {
				console.log("show.bs.modal");
			});
			$('#dlgUserDetail').on('shown.bs.modal', function (e) {
				console.log("shown.bs.modal");
			});
			$('#dlgUserDetail').on('hide.bs.modal', function (e) {
				console.log("hide.bs.modal");
			});
			$('#dlgUserDetail').on('hidden.bs.modal', function (e) {
				console.log("hidden.bs.modal");
			});
			$('#btnDlgUserDetailConfirm').on('click', function () {
				console.log("btnDlgUserDetailConfirm");
				$('#modalBox').modal('hide');
			});
			$('#btnDlgUserDetailCancel').on('click', function () {
				console.log("btnDlgUserDetailCancel");
				$('#modalBox').modal('hide');
			});
		}
	};
	
//	dlgUserDetailContentObj.init();
})(jQuery);