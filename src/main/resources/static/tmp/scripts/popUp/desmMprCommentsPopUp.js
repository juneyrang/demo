var v_desm_mpr_comments_callback = null;
var v_desm_mpr_comments_param;

function initDesmMprCommentsPopUp(param , callback) {
	v_desm_mpr_comments_callback = callback;
    v_desm_mpr_comments_param = param;
    
    initDesmMprCommentsPopUpCode();    
}

function initDesmMprCommentsPopUpCode() {
    
    initDesmMprCommentsPopUpControls();
}


function initDesmMprCommentsPopUpControls() {	
	
	$('#dlgMprComments').modal('show');

	$('#dlgMprComments').on('shown.bs.modal', function () {
		$('#dlgMprComments').click();
	});	
	
	$('#dlgMprComments').on('hidden.bs.modal', function () {
	
	  	closeDesmMprCommentsPopUp();
	});		

	$('#btnDlgMprCommentsReject').click(function () { btnDlgMprCommentsRejectClick(); return false; });
	
	if(v_desm_mpr_comments_param.TYPE != null && v_desm_mpr_comments_param.TYPE == "VIEW") {
		$('#btnDlgMprCommentsReject').remove();
		$('#txtdlgMprComments').val(v_desm_mpr_comments_param.REJECT_COMMENTS);
	}

	$('#btnDlgMprCommentsReject').find('.text').text((v_desm_mpr_comments_param.STATUS == 'Confirmed') ? 'Confirm' : 'Return');
}

function closeDesmMprCommentsPopUp() {
	
}

function btnDlgMprCommentsRejectClick() {
	if(v_desm_mpr_comments_param.RETURN_TYPE != null && v_desm_mpr_comments_param.RETURN_TYPE == "MPR_SETUP") {
		dlgMprSetupCommentsReject();
	}
	else {
		if(v_desm_mpr_comments_param.STATUS == 'Confirmed') {
			if(v_desm_mpr_comments_callback) {
				v_desm_mpr_comments_callback("return-item",$('#txtdlgMprComments').val());
			}
			$('#dlgMprComments').modal('hide');
		} else {
			dlgMprCommentsReject();
		}
	}

	
}

function getReviewerComments() {
	var commDate = new Date();
	var reviewerInfo = ' (' +
		' ' + v_desm_mpr_comments_param.STATUS +
		' ' + commDate.format('yyyy.MM.dd') +
		' ' + $('#logh', parent.document).text() +
//		($('#roleName', parent.document).val() ? ' / ' + $('#roleName', parent.document).val() : '') +
		' )';
	var reviewerComments = $('#txtdlgMprComments').val() + reviewerInfo;
	if(v_desm_mpr_comments_param.originComments && v_desm_mpr_comments_param.originComments.trim().length > 0) {
		reviewerComments += "\n-----------------------------------------------------------------------\n"
						 + v_desm_mpr_comments_param.originComments;
	}
	return reviewerComments;
}

function dlgMprSetupCommentsReject() {
	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			
			var updateList = [];
			var updateRow = objNullCheck({"PO_NO" : v_desm_mpr_comments_param.PO_NO, "MPR_NO" : v_desm_mpr_comments_param.MPR_NO, "STATUS" : "Returned", "REJECT_COMMENTS" : getReviewerComments()});
			updateList.push(updateRow);		
			var list = JSON.stringify(updateList);
			
			var paramData = {"updateList" : list};				
							 
			$.ajax({			
				url: "/saveDesmMprSetupStatus.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-2") {
							alert_fail($('#alertRejectErr').val());
						}
			            else if(result.error == "-4") {
			              alert_fail($('#alertMailFail').val());
			            } 								
						else {
							alert_fail(result.error);
						}
						
					} else {
					
						if(v_desm_mpr_comments_callback) {
							v_desm_mpr_comments_callback("reject-item",null);
						}
						$('#dlgMprComments').modal('hide');
					}
				}		
			});								 					
						
		}
	});
}

function dlgMprCommentsReject() {
	confirm_modal("", $('#alertReject').val(), null, function (callobj, result) {
		if(result) {
			
			var updateList = [];
			var updateRow = objNullCheck({"MPR_SEQ" : v_desm_mpr_comments_param.MPR_SEQ, "STATUS" : v_desm_mpr_comments_param.STATUS, "REJECT_COMMENTS" : getReviewerComments(),
			                              "MPR_NO" : v_desm_mpr_comments_param.MPR_NO, "PO_NO" : v_desm_mpr_comments_param.PO_NO});
			updateList.push(updateRow);		
			var list = JSON.stringify(updateList);
			
			var paramData = {"updateList" : list};				
							 
			$.ajax({			
				url: "/saveDesmMprStatus.do",
				data: paramData,
				success: function (result, textStatus, jqXHR) {
					if (result.error != null) {
						if(result.error == "-2") {
							alert_fail($('#alertRejectErr').val());
						}
			            else if(result.error == "-4") {
			              alert_fail($('#alertMailFail').val());
			            } 						
						else {
							alert_fail(result.error);
						}
					} else {
					
						if(v_desm_mpr_comments_callback) {
							v_desm_mpr_comments_callback("reject-item",null);
						}
						$('#dlgMprComments').modal('hide');
					}
				}		
			});								 					
						
		}
	});
}




