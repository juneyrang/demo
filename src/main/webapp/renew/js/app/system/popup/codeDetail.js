let dlgCodeDetailContentObj = {
	init: function(param, callback) {
		console.log('dlgCodeDetailContentObj', param, callback);
		this.param = param;
		this.callback = callback;
		$('#dlgUserDetail').modal('show');
		this.event();
	},
	event: function() {
		$('#dlgUserDetail').on('shown.bs.modal', function (e) {
			console.log("shown.bs.modal");
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
