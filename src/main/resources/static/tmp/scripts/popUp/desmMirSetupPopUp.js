var popMirSetupObj = {
	param : '',
	init : function(param) {
		this.param = param;
		this.ui();
		this.act();
	},
	ui : function() {
		if(this.param.mode === "INSPECTION_RESULT") {
			$('.dlgDesmMirSetupPopup').css('width', 350);
			$('#dlgDesmDefaultCountryTitle').text("Choose Inspection Result");
			$('#ReqChgQty').remove();
			$('#PoNo').remove();
		} else if(this.param.mode === "REQ_CHG_QTY") {
			$('.dlgDesmMirSetupPopup').css('width', 400);
			$('#dlgDesmDefaultCountryTitle').text("Select Required Change Quantity of Defect Item");
			$('#InspectionResult').remove();
			$('#PoNo').remove();
		} else if(this.param.mode === "PO_NO") {
			$('.dlgDesmMirSetupPopup').css('width', 350);
			$('#dlgDesmDefaultCountryTitle').text("Batch Input PO No.");
			$('#InspectionResult').remove();
			$('#ReqChgQty').remove();
		}

		$('#dlgDesmMirSetup').modal('show');
	},
	act : function() {
		var _this = this;
		$('#btnDlgDesmMirSetupConfirm').on('click', function () {
			var desmMirPopupVal = $('#desmMirPopupVal').val();
//			alert(desmMirPopupVal);
			if(desmMirPopupVal == "") {
				return;			
			}

			_this.param.desmMirPopupVal = desmMirPopupVal;
			if(_this.param.callback) {
				_this.param.callback("select-edit", _this.param);
			}						
									
			$('#dlgDesmMirSetup').modal('hide');
		});
	}
};
