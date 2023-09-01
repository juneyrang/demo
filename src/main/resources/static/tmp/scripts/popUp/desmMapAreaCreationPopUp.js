

var v_desm_map_area_creation_callback = null;
var v_desm_map_area_creation_param;



function initDesmMapAreaCreationPopUp(param , callback) {
	v_desm_map_area_creation_callback = callback;
    v_desm_map_area_creation_param = param; 
    
    initDesmMapAreaCreationPopUpCode();    
}

function initDesmMapAreaCreationPopUpCode() {	
	
	initDesmMapAreaCreationPopUpControls();
}


function initDesmMapAreaCreationPopUpControls() {
	
	$('#dlgDesmMapAreaCreation').on('shown.bs.modal', function () {
		$('#dlgDesmMapAreaCreation').click();
	});
	
	$('#dlgDesmMapAreaCreation').on('hidden.bs.modal', function () {
	  	closeDesmMapAreaCreationPopUp();
	})	
	
	$('#dlgDesmMapAreaCreation').modal('show');	
	
	
	$('#btnDlgDesmMapAreaCreationSave').click(function () { btnDlgDesmMapAreaCreationSaveClick(); return false; });	
	
}

function closeDesmMapAreaCreationPopUp() {
	
}


function btnDlgDesmMapAreaCreationSaveClick() {
	
	var chkValidation = checkRequiredField("divDesmMapAreaCreationBody");
	
	if (!chkValidation) {
		alert_modal("", $('#alertValidate').val());
		return;
	}
	
	confirm_modal("", $('#alertSave').val(), null, function (callobj, result) {
		if(result) {				
						 					
			var insertList = [];
			var list = v_desm_map_area_creation_param.list;
			var ps = "";
			
			
			if(v_desm_map_area_creation_param.MAP_TYPE == "RECT") {
				var row = list[0];
				ps = row.X + "," + row.Y + "," + row.W + "," + row.H;			
			}
			else if(v_desm_map_area_creation_param.MAP_TYPE == "LINE") {
				for(var i = 0; i < list.length; i++){
					var row = list[i];
					
					if(i == 0) {
						ps = row.X + "," + row.Y; 
					}
					else {
						ps += ";" + row.X + "," + row.Y;
					}
				}			
			}
			
			var insertRow = {"MAP_TYPE" : v_desm_map_area_creation_param.MAP_TYPE, "MAP_MST_ID" : v_desm_map_area_creation_param.MAP_MST_ID,
							 "MAP_NAME" : $('#txtDlgDesmMapAreaCreationMapName').val(), "MAP_POSITION" : ps};
							 
		    insertList.push(insertRow);
			
			var list = JSON.stringify(insertList);
			
			$.ajax({
				url: "/saveDesmMapAreaCreation.do",		
				data: {"list" : list},
				success: function (data, textStatus, jqXHR) {
					if (data.error != null) {
						alert_fail(result.error);
					}
					else {
						alert_success($('#alertSuccess').val());
						
						if(v_desm_map_area_creation_callback) {
							v_desm_map_area_creation_callback("save-item", null);
						}
						
						$('#dlgDesmMapAreaCreation').modal('hide');		
					}
		        }
		    });								
		}
	});			
	
}

function checkRequiredField(areaID) {
	var chkValidation = true;

	$("#" + areaID + " input:visible, #" + areaID + " select:visible, #" + areaID + " textarea:visible").each(function () {
		if ($(this).hasClass("required") && $(this).attr("type") == "file") {
			if (getAttachedFilesCount(($(this).attr("id"))) == 0) {
				$(".file-input").addClass("validation-error");
				chkValidation = false;
			} else {
				$(".file-input").removeClass("validation-error");
				$(this).removeClass("validation-error");
			}
		}
		else if ($(this).hasClass("required") && ($(this).val() == null || $(this).val().IsNullOrEmpty())) {
			$(this).addClass("validation-error");
			chkValidation = false;
		} else {
			$(this).removeClass("validation-error");
		}
	});

	return chkValidation;
}


