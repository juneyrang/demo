
var v_desm_material_manage_batch_callback = null;
var v_desm_material_manage_batch_param;
var v_desm_material_manage_batch_id;

function initDesmMaterialManageBatchPopUp(param , callback) {
	v_desm_material_manage_batch_callback = callback;
    v_desm_material_manage_batch_param = param;

    v_desm_material_manage_batch_id = "desmMaterialManageBatch" + param.col;

    $('#'+v_desm_material_manage_batch_id).on('shown.bs.modal', function () {
		$('#'+v_desm_material_manage_batch_id).click();
	});

	$('#'+v_desm_material_manage_batch_id).on('hidden.bs.modal', function () {
		closeDesmMaterialManageBatchPopUp();
	});

	$('#'+v_desm_material_manage_batch_id).modal('show');

    initDesmMaterialManageBatchPopUpCode();
}

function initDesmMaterialManageBatchPopUpCode(){

	if(v_desm_material_manage_batch_param.col == "TYPE"){
		var code = gridTypeCode.code.split("|");
		var label = gridTypeCode.label.split("|");
		var html = "";
		for(var i = 1 ; i < code.length ; i ++){
			html += "<option value='"+code[i]+"'>"+label[i]+"</option>";
		}
		$("#desmMaterialManageBatchValueTYPE").html(html);
	}else if(v_desm_material_manage_batch_param.col == "EXPIRED_DATE"){
		if($('#txtDesmLang').val() == "ko"){
			$.datepicker.setDefaults($.datepicker.regional['ko']);
		}

		$("input[name=inpDatePicker]").datepicker( {
			changeMonth: true,
			changeYear: true,
			dateFormat: "yy/mm/dd",
		});
	}

	$('#desmMaterialManageBatchSave').click(function () { saveDesmMateriaManageBatchPopup(); return false; });
}

function saveDesmMateriaManageBatchPopup(){
	var param = {};
	param.col = v_desm_material_manage_batch_param.col;
	param.value = $("#desmMaterialManageBatchValue"+v_desm_material_manage_batch_param.col).val();
	v_desm_material_manage_batch_callback("",param);

	$('#'+v_desm_material_manage_batch_id).modal('hide');
}

function closeDesmMaterialManageBatchPopUp() {

}