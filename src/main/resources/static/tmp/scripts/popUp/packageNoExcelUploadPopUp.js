/*
	운송관리 > 전략물자관리 > 전략물자관리상세 팝업 > 전략물자 판정 List 엑셀업로드
	packageNoExcelUploadPopUp.js
*/
var dlgExcelUploadGrid;
var dlgExcelUploadSheetGrid;

var sheetCol;

var v_trans_excel_upload_callback = null;
var v_trans_excel_upload_param;

function initPackageNoExcelUploadPopUp(param , callback) {
	v_trans_excel_upload_callback = callback;
	v_trans_excel_upload_param = param;

	initTransExcelUploadPopUpCode();
}

function initTransExcelUploadPopUpCode() {
	initTransExcelUploadPopUpControls();
}

function initTransExcelUploadPopUpControls() {
	setExcelUploadGrid("공통양식");
	var gridCode = getGridCode();
	var dlgExcelUploadSheetGridCol = {
		"Cfg": {
			"SuppressCfg": "1"
			,"StyleLap": "0"
			,"Version": "1"
			, "CacheTimeout" : "100"
			,"Style": "Material"
			,"Size": "Small"
			,"Scale": "90%"
			,"ConstWidth": "100%"
			,"MinTagHeight": "200"
			,"MaxHeight": "1"
			,"Paging": "2"
			,"PageLength": "20"
			,"ChildParts": "2"
			,"NoPager": "1"
			,"Dragging": "0"
			,"SelectingSingle": "1"
			,"Adding": "0"
			,"Export": "1"
			,"Deleting": "0"
			,"SafeCSS": "1"
			,"Sorting": "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		},
		"Panel": { "Visible" : "0" },
		"Toolbar": { "Visible" : "0" },
		"Cols": [
			{
				"Name": "NAME",
				"Width": "400",
				"Type": "Text",
				"CanEdit": "0",
				"Class" : "gridLinkText",
				"OnClickCell": "sheetClick( Grid, Row,Col )"
			}
		],
		"Header": {"NAME": "Sheet"}
	};

	dlgExcelUploadSheetGrid = TreeGrid(
			{
				Layout: {Data: dlgExcelUploadSheetGridCol},
				Data: {Data: {Body: [[]]}},
				Text: {Url: gridLangUrl}
			},
			"dlgTransShippingRequetsExcelUploadSheetGrid");

	// Excel 선택 버튼 클릭
	$('#btnDlgExcelUploadUpload').click(function () {
		btnDlgExcelUploadUploadClick();
		return false;
	});
	
	// 적용 버튼 클릭
	$('#btnDlgExcelUploadSave').click(function () {
		btnDlgExcelUploadSaveClick();
		return false;
	});

	$('#btnDlgTransShippingRequetsExcelUploadFile').change(function () {
		btnDlgTransShippingRequetsExcelUploadFileChange(event);
		return false;
	});
}

function closeTransExcelUploadPopUp() {
	dlgExcelUploadSheetGrid.Dispose();
}

function setExcelUploadGrid(type) {
	if(dlgExcelUploadGrid != null) {
		dlgExcelUploadGrid.Dispose();
	}
	var gridCode = getGridCode();
	var dlgExcelUploadGridCol = {
		"Cfg" : {
			"SuppressCfg": "1"
			,"StyleLap": "0"
			,"Version": "1"
			, "CacheTimeout" : "100"
			,"Style": "Material"
			,"Size": "Small"
			,"Scale": "90%"
			,"ConstWidth": "100%"
			,"MinTagHeight": "300"
			,"MaxHeight": "1"
			,"Paging": "2"
			,"PageLength": "20"
			,"ChildParts": "2"
			,"NoPager": "1"
			,"Dragging": "0"
			,"SelectingSingle": "1"
			,"Adding": "0"
			,"Export": "1"
			,"Deleting": "0"
			,"SafeCSS": "1"
			,"Sorting": "0"
			, "Code" : gridCode
			,"CopyCols" : "0"
		},
		"Panel": { "Visible" : "0" },
		"Toolbar": { "Visible" : "0" },
		"Cols": [
			{
				"Name": "ROWNUM",
				"Width": "80",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove": "1",
				"CanEdit": "0",
				"Align": "center"
			},
			{//전략물자포함여부(전략물자대상) Y/N
				"Name": "STRATEGIC_ITEM_YN",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove": "1",
				"CanEdit": "0",
				"Align": "center"
			},
			{//전략물자포함N일 때 catch_all 여부 Y/N
				"Name": "CATCH_ALL_YN",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove": "1",
				"CanEdit": "0",
				"Align": "center"
			},
			{//	/* 판정종류( ab: 공급업체 전문판정, ba: 두산중공업 자가판정, bb: 두산중공업 전문판정 )	*/
				"Name": "JUDGMENT_TYPE",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove" : "1",
				"CanEdit": "0",
				"Align": "center"
			},
			{
				"Name": "CERTIFICATE_ORGANIZATION",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove" : "1",
				"CanEdit": "0",
				"Align": "center"
			},
			{
				"Name": "CERTIFICATE_NUMBER",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove" : "1",
				"CanEdit": "0",
				"Align": "center"
			},
			{
				"Name": "EXPORT_PERMISSION_ORGANIZATION",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove": "1",
				"CanEdit": "0",
				"Align": "center"
			},	/* 수출허가기관						*/
			{
				"Name": "EXPORT_PERMISSION_NUMBER",
				"Width": "150",
				"Type": "Text",
				"Spanned": "1",
				"Class": "gridBorderText",
				"CanMove" : "1",
				"CanEdit": "0",
				"Align": "center"
			}
		],
		"Header": {
			"Class": "gridCenterText"
			,"ROWNUM": "No."
			,"STRATEGIC_ITEM_YN": "전략물자 포함"
			,"CATCH_ALL_YN": "Catch All"
			,"JUDGMENT_TYPE": "판정종류"
			,"CERTIFICATE_ORGANIZATION": "판정기관"
			,"CERTIFICATE_NUMBER": "판정서 번호"
			,"EXPORT_PERMISSION_ORGANIZATION": "수출허가기관"
			,"EXPORT_PERMISSION_NUMBER": "수출허가증 번호"
		}
	};

	dlgExcelUploadGrid = TreeGrid(
			{
				Layout: { Data: dlgExcelUploadGridCol },
				Data: { Data: { Body: [[]] } },
				Text: { Url: gridLangUrl }
			},
			"gridPackageNoExcelUpload");

	sheetCol = [
		"ROWNUM"							// No.
		,"STRATEGIC_ITEM_YN"				// 전략물자 포함
		,"CATCH_ALL_YN"						// Catch All
		,"JUDGMENT_TYPE"					// 판정종류
		,"CERTIFICATE_ORGANIZATION"			// 판정기관
		,"CERTIFICATE_NUMBER"				// 판정서 번호
		,"EXPORT_PERMISSION_ORGANIZATION"	// 수출허가기관
		,"EXPORT_PERMISSION_NUMBER"			// 수출허가증 번호
	];
}

function btnDlgExcelUploadUploadClick() {
	$('#btnDlgTransShippingRequetsExcelUploadFile').click();
}

function btnDlgExcelUploadSaveClick() {
	var list	= dlgExcelUploadGrid.Rows;
	var rowCnt	= dlgExcelUploadGrid.RowCount;

	if(rowCnt < 1){
		alert_modal("알람", $('#alertGridDataNull').val());
		return;
	}

	var tmpList = [];

	for (var key in list) {
		var gridRow = list[key];

		if( gridRow.Fixed == null){
			var row = {
				"ROWNUM": gridRow.ROWNUM
				,"STRATEGIC_ITEM_YN": gridRow.STRATEGIC_ITEM_YN
				,"CATCH_ALL_YN": gridRow.CATCH_ALL_YN
				,"JUDGMENT_TYPE": gridRow.JUDGMENT_TYPE
				,"CERTIFICATE_ORGANIZATION": gridRow.CERTIFICATE_ORGANIZATION
				,"CERTIFICATE_NUMBER": gridRow.CERTIFICATE_NUMBER
				,"EXPORT_PERMISSION_ORGANIZATION": gridRow.EXPORT_PERMISSION_ORGANIZATION
				,"EXPORT_PERMISSION_NUMBER": gridRow.EXPORT_PERMISSION_NUMBER
				,"ROW_TYPE": "i"
			};
			tmpList.push(row);
		}
	}

	if(v_trans_excel_upload_callback) {
		v_trans_excel_upload_callback("select-item", tmpList);
	}
}

var v_event;

function btnDlgTransShippingRequetsExcelUploadFileChange(event) {
	v_event			= event;
	var sheetList	= [];
	var input		= event.target;
	var reader		= new FileReader();
	var list;

	reader.onload = function(){
		var fdata = reader.result;
		var read_buffer	= XLSX.read(fdata, {type : 'binary'});

		read_buffer.SheetNames.forEach(function(sheetName) {
			sheetList.push({"NAME" : sheetName});
		})

		$('#dlgTransShippingRequetsExcelUploadSheet').modal('show');
		dlgExcelUploadSheetGrid.Source.Data.Data.Body = [sheetList];
		dlgExcelUploadSheetGrid.ReloadBody();
	};
	reader.readAsBinaryString(input.files[0]);
}

function sheetClick(Grid, Row, Col) {
	var sheetList = [];
	var input = v_event.target;
	var reader = new FileReader();
	var list;

	reader.onload = function(){
		var fdata = reader.result;
		var read_buffer	= XLSX.read(fdata, {type : 'binary'});
		var worksheet = read_buffer.Sheets[Row.NAME];
		var rowdata = XLSX.utils.sheet_to_json(worksheet, {header: sheetCol });

		list = setExcelUploadGridData(rowdata);

		dlgExcelUploadGrid.Source.Data.Data.Body = [list];
		dlgExcelUploadGrid.ReloadBody();
	};

	reader.readAsBinaryString(input.files[0]);
	input.value = null;
	$('#dlgTransShippingRequetsExcelUploadSheet').modal('hide');
}

function setExcelUploadGridData(rowdata) {
	var list = [];
	var cnt	= 1;
	var row;
	var validationMessage = '';

	var catchAllYn = "";	// Catch All
	var certificateNumber = "";	// 판정서 번호
	var exportPermissionNumber = "";	// 수출허가증 번호
	var exportPermissionOrganization = "";	// 수출허가 기관
	
	for( var i=1; i<rowdata.length; i++ ) {
		row = rowdata[i];
		certificateNumber = row["CERTIFICATE_NUMBER"];
		
		console.log( "setExcelUploadGridData > STRATEGIC_ITEM_YN:::::::::::::: [" + row["STRATEGIC_ITEM_YN"]			+ "]" );
		console.log( "setExcelUploadGridData > CATCH_ALL_YN::::::::::::::::::: [" + row["CATCH_ALL_YN"]					+ "]" );
		console.log( "setExcelUploadGridData > JUDGMENT_TYPE:::::::::::::::::: [" + row["JUDGMENT_TYPE"]				+ "]" );
		console.log( "setExcelUploadGridData > CERTIFICATE_ORGANIZATION::::::: [" + row["CERTIFICATE_ORGANIZATION"]		+ "]" );
		console.log( "setExcelUploadGridData > CERTIFICATE_NUMBER::::::::::::: [" + row["CERTIFICATE_NUMBER"]			+ "]" );
		console.log( "setExcelUploadGridData > EXPORT_PERMISSION_ORGANIZATION: [" + row["EXPORT_PERMISSION_ORGANIZATION"]+"]" );
		console.log( "setExcelUploadGridData > EXPORT_PERMISSION_NUMBER::::::: [" + row["EXPORT_PERMISSION_NUMBER"]		+ "]" );
		
		// 20211208, Excel Data 받아와서 Validation 처리 및 적용 코드 변경.. 전부 수정..
		// validation
		validationMessage = validateExcelRow(row);
		
		if(validationMessage !== 'S') {
			alert(validationMessage);
			return false;
		}
		
		// data insert
		if(row["STRATEGIC_ITEM_YN"] == 'N') {
			catchAllYn = row["CATCH_ALL_YN"];
			exportPermissionNumber = '';
			exportPermissionOrganization = '';
		}
		else if(row["STRATEGIC_ITEM_YN"] == 'Y') {
			catchAllYn = '';
			exportPermissionNumber = row["EXPORT_PERMISSION_NUMBER"];
			if(row["CERTIFICATE_ORGANIZATION"] == '전략물자관리원') exportPermissionOrganization = "산업통상자원부";
			else if(row["CERTIFICATE_ORGANIZATION"] == '한국원자력통제기술원') exportPermissionOrganization = "원자력안전위원회";
			else if(row["CERTIFICATE_ORGANIZATION"] == '방위사업청') exportPermissionOrganization = "방위사업청";
		}

		var gridRow = {
			"ROWNUM": cnt
			,"STRATEGIC_ITEM_YN": row["STRATEGIC_ITEM_YN"]
			,"CATCH_ALL_YN": catchAllYn
			,"JUDGMENT_TYPE": row["JUDGMENT_TYPE"]
			,"CERTIFICATE_ORGANIZATION": row["CERTIFICATE_ORGANIZATION"]
			,"CERTIFICATE_NUMBER": certificateNumber
			,"EXPORT_PERMISSION_ORGANIZATION": exportPermissionOrganization
			,"EXPORT_PERMISSION_NUMBER": exportPermissionNumber
		};

		list.push(gridRow);
		cnt += 1;
	}
	return list;
}

function validateExcelRow(row) {
	// required field check
	// 전략물자 포함
	if(row["STRATEGIC_ITEM_YN"] == null || row["STRATEGIC_ITEM_YN"] == undefined || row["STRATEGIC_ITEM_YN"] === '') {
		return '전략물자 포함은 필수 입력 항목 입니다.';
	}
	
	// 전략물자 포함 N일 경우 Catch All 여부 확인
	if(row["STRATEGIC_ITEM_YN"] === 'N'
		&& (row["CATCH_ALL_YN"] == null || row["CATCH_ALL_YN"] == undefined || row["CATCH_ALL_YN"] === '')) {
		return "전략물자포함이 'N'일 때에는 Catch All 필드를 입력 해야 합니다(Y/N).";
	}
	
	// 판정종류
	if(row["JUDGMENT_TYPE"] == null || row["JUDGMENT_TYPE"] == undefined || row["JUDGMENT_TYPE"] === '') {
		return '판정종류는 필수 입력 항목입니다.';
	}
	
	// 판정기관
	if(row["CERTIFICATE_ORGANIZATION"] == null || row["CERTIFICATE_ORGANIZATION"] == undefined || row["CERTIFICATE_ORGANIZATION"] === '') {
		return '판정기관은 필수 입력 항목입니다.';
	}
	else if(row["CERTIFICATE_ORGANIZATION"] != '전략물자관리원' && row["CERTIFICATE_ORGANIZATION"] != '한국원자력통제기술원' && row["CERTIFICATE_ORGANIZATION"] != '방위사업청') {
		return '판정기관명은\n[전략물자관리원 / 한국원자력통제기술원 / 방위사업청]\n중 하나만 입력 가능 합니다.';
	}
	
	// 판정서 번호
	var certificateNumber = row["CERTIFICATE_NUMBER"];
	if(certificateNumber == null || certificateNumber == undefined) {
		return '판정서 번호는 필수 입력 항목입니다';
	}
	else {
		if(!isNumeric(certificateNumber)) {
			return '판정서 번호는 숫자만 입력가능합니다.';
		}
		else if(row["CERTIFICATE_ORGANIZATION"] == '전략물자관리원' || row["CERTIFICATE_ORGANIZATION"] == '방위사업청') {
			if(String(certificateNumber).length != 10) {
				return '전략물자관리원, 방위사업청은 판정서 번호가 10자리로 입력해야합니다.';
			}
		}
		else if(row["CERTIFICATE_ORGANIZATION"] == '한국원자력통제기술원') {
			if(String(certificateNumber).length != 11) {
				return '전략물자관리원, 방위사업청은 판정서 번호가 11자리로 입력해야합니다.';
			}
		}
	}
	
	// 수출허가서
	var exportPermissionNumber = row["EXPORT_PERMISSION_NUMBER"];
	if(row["STRATEGIC_ITEM_YN"] === 'Y'
		&& (exportPermissionNumber == null || exportPermissionNumber == undefined)) {
		return "전략물자포함이 'Y'일 때는 수출허가서 번호를 입력해야합니다.";
	}
	else if(row["STRATEGIC_ITEM_YN"] === 'Y') {
		if(!isNumeric(exportPermissionNumber)) {
			return '수출허가서 번호는 숫자만 입력가능합니다.';
		}
		else if(String(exportPermissionNumber).length != 16) {
			return '수출허가서 번호는 16자리로 입력해야합니다.';
		}
	}
	
	return 'S';
}

// 숫자 여부 체크
function isNumeric(num, opt) {
	// 좌우 trim(공백제거)을 해준다.
	num = String(num).replace(/^\s+|\s+$/g, "");

	if(typeof opt == "undefined" || opt == "1") {
		// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
		var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}
	else if(opt == "2") {
		// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
		var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	}
	else if(opt == "3") {
		// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
		var regex = /^[0-9]+(\.[0-9]+)?$/g;
	}
	else {
		// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
		var regex = /^[0-9]$/g;
	}

	if(regex.test(num)) {
		num = num.replace(/,/g, "");
		return isNaN(num) ? false : true;
	}
	else {
		return false;
	}
}
