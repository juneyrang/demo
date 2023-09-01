var testVariable = "";

$(document).ready(function () {
	"use strict";
	console.log('testStar.js Start');
	
	// file input test #1
	$("#input-ke-1").fileinput({
	    theme: "explorer",
	    uploadUrl: "/file-upload-batch/2",
	    allowedFileExtensions: ['jpg', 'png', 'gif'],
	    overwriteInitial: false,
	    initialPreviewAsData: true,
	    maxFileSize: 10000,
	    removeFromPreviewOnError: true,
	    initialPreview: [
	        "https://picsum.photos/id/101/1920/1080",
	        "https://picsum.photos/id/102/1920/1080",
	        "https://picsum.photos/id/103/1920/1080"
	    ],
	    initialPreviewConfig: [
	        {caption: "picture-1.jpg", description: "<h5>Picture One</h5> This is a representative placeholder description for the first image.", size: 329892, width: "120px", url: "/site/file-delete", key: 101},
	        {caption: "picture-2.jpg", description: "<h5>Picture Two</h5> This is a representative placeholder description for the second image.", size: 872378, width: "120px", url: "/site/file-delete", key: 102},
	        {caption: "picture-3.jpg", description: "<h5>Picture Three</h5> This is a representative placeholder description for the third image.", size: 632762, width: "120px", url: "/site/file-delete", key: 103}
	    ],
	    initialPreviewDownloadUrl: 'https://picsum.photos/id/{key}/1920/1080' // the key will be dynamically replaced  
	});
	// file input test #2
	$("#input-ke-2").fileinput({
	    theme: "explorer",
	    uploadUrl: "/file-upload-batch/2",
	    minFileCount: 2,
	    maxFileCount: 5,
	    maxFileSize: 10000,
	    removeFromPreviewOnError: true,
	    overwriteInitial: false,
	    previewFileIcon: '<i class="fas fa-file"></i>',
	    initialPreview: [
	        // IMAGE DATA
	       'https://picsum.photos/id/1071/1920/1080',
	        // IMAGE RAW MARKUP
	        '<img src="https://picsum.photos/id/1075/1920/1080" class="kv-preview-data file-preview-image">',
	        // TEXT DATA
	        'https://kartik-v.github.io/bootstrap-fileinput-samples/samples/SampleTextFile_10kb.txt',
	        // PDF DATA
	        'https://kartik-v.github.io/bootstrap-fileinput-samples/samples/pdf-sample.pdf',
	        // VIDEO DATA
	        "https://kartik-v.github.io/bootstrap-fileinput-samples/samples/small.mp4"
	    ],
	    initialPreviewAsData: true, // defaults markup  
	    initialPreviewConfig: [
	        {caption: "Image 11.jpg", description: "<h5>File One</h5> This is an image file.", size: 762980, url: "/site/file-delete", downloadUrl: 'https://picsum.photos/id/1071/1920/1080', key: 1071},
	        {previewAsData: false, description: "<h5>File Two</h5> This is also an image file.", size: 823782, caption: "Image 13.jpg", url: "/site/file-delete", downloadUrl: 'https://picsum.photos/id/1075/1920/1080', key: 1075}, 
	        {caption: "Lorem Ipsum.txt", type: "text", description: "<h5>File Three</h5> This is a text file.", size: 1430, url: "/site/file-delete", key: 12}, 
	        {type: "pdf", description: "<h5>File Four</h5> This is a PDF document.", size: 8000, caption: "PDF Sample.pdf", url: "/site/file-delete", key: 14}, 
	        {type: "video", description: "<h5>File Five</h5> This is a Video file.", size: 375000, filetype: "video/mp4", caption: "Krajee Sample.mp4", url: "/site/file-delete", key: 15} 
	    ],
	    uploadExtraData: {
	        img_key: "1000",
	        img_keywords: "happy, nature"
	    },
	    preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
	         previewFileIconSettings: { // configure your icon file extensions
	        'doc': '<i class="fas fa-file-word text-primary"></i>',
	        'xls': '<i class="fas fa-file-excel text-success"></i>',
	        'ppt': '<i class="fas fa-file-powerpoint text-danger"></i>',
	        'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
	        'zip': '<i class="fas fa-file-archive text-muted"></i>',
	        'htm': '<i class="fas fa-file-code text-info"></i>',
	        'txt': '<i class="fas fa-file-text text-info"></i>',
	        'mov': '<i class="fas fa-file-video text-warning"></i>',
	        'mp3': '<i class="fas fa-file-audio text-warning"></i>',
	        // note for these file types below no extension determination logic 
	        // has been configured (the keys itself will be used as extensions)
	        'jpg': '<i class="fas fa-file-image text-danger"></i>', 
	        'gif': '<i class="fas fa-file-image text-muted"></i>', 
	        'png': '<i class="fas fa-file-image text-primary"></i>'    
	    },
	    previewFileExtSettings: { // configure the logic for determining icon file extensions
	        'doc': function(ext) {
	            return ext.match(/(doc|docx)$/i);
	        },
	        'xls': function(ext) {
	            return ext.match(/(xls|xlsx)$/i);
	        },
	        'ppt': function(ext) {
	            return ext.match(/(ppt|pptx)$/i);
	        },
	        'zip': function(ext) {
	            return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
	        },
	        'htm': function(ext) {
	            return ext.match(/(htm|html)$/i);
	        },
	        'txt': function(ext) {
	            return ext.match(/(txt|ini|csv|java|php|js|css)$/i);
	        },
	        'mov': function(ext) {
	            return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
	        },
	        'mp3': function(ext) {
	            return ext.match(/(mp3|wav)$/i);
	        }
	    }
	});
	// file input test #3
	$("#input-ke-3").fileinput({
	    hideThumbnailContent: true, // hide image, pdf, text or other content in the thumbnail preview
	    theme: "explorer",
	    uploadUrl: "/file-upload-batch/2",
	    minFileCount: 2,
	    maxFileCount: 5,
	    overwriteInitial: false,
	    initialPreview: [
	        // IMAGE DATA
	       'https://picsum.photos/id/718/1920/1080',
	        // IMAGE RAW MARKUP
	        '<img src="https://picsum.photos/id/719/1920/1080" class="kv-preview-data file-preview-image">',
	        // TEXT DATA
	        'https://kartik-v.github.io/bootstrap-fileinput-samples/samples/SampleTextFile_10kb.txt',
	        // PDF DATA
	        'https://kartik-v.github.io/bootstrap-fileinput-samples/samples/pdf-sample.pdf',
	        // VIDEO DATA
	        "https://kartik-v.github.io/bootstrap-fileinput-samples/samples/small.mp4"
	    ],
	    initialPreviewAsData: true, // defaults markup  
	    initialPreviewConfig: [
	        {caption: "Business 1.jpg", description: "<h5>File One</h5> This is an image file.", size: 762980, url: "/site/file-delete", key: 11},
	        {previewAsData: false, description: "<h5>File Two</h5> This is an image file.", size: 823782, caption: "Business 2.jpg", url: "/site/file-delete", key: 13}, 
	        {caption: "Lorem Ipsum.txt", type: "text", description: "<h5>File Three</h5> This is a Text file.", size: 1430, url: "/site/file-delete", key: 12}, 
	        {type: "pdf", description: "<h5>File Four</h5> This is a PDF document.", size: 8000, caption: "PDF Sample.pdf", url: "/site/file-delete", key: 14}, 
	        {type: "video", description: "<h5>File Five</h5> This is a Video file.", size: 375000, filetype: "video/mp4", caption: "Krajee Sample.mp4", url: "/site/file-delete", key: 15},  
	    ],
	    uploadExtraData: {
	        img_key: "1000",
	        img_keywords: "happy, nature",
	    },
	});
});

$(function() {
	"use strict";

	// Grid Row Selected Test
	var testGrid;
	var testGridCol = {
		"Cfg" : {
			"id"				: "idsmTestGrid"
			, "CfgId"			: "idsmTestGridCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle"	: "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{ "Name": "SEQ_NO" , "Width": "100", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	},
		   ,{ "Name": "COLINTA" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTB" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTC" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTD" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTA" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );" }
		   ,{ "Name": "COLTEXTB" , "Width": "100", "Type": "Text", "Button": "Defaults", "Defaults": "|B|D|F|H|J|Z|AZ|TZ",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTC" , "Width": "100", "Type": "Bool",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTD" , "Width": "100", "Type": "Select", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"
		   	  , "Defaults" : "|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|한글" }
		   ,{ "Name": "COLDATE" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		],
		
	};
	testGrid =	TreeGrid( { Layout:{ Data: testGridCol	}, Data:{ Data: { Body: [ [] ] } } }, "gridTest"		);
	
	$('#btnAddRow').click(function () {
		console.log('btnAddRow');
		var row = testGrid.AddRow(null, null, 1, null, null);
		
	});
	
	$('#btnLoad').click(function () {
		$.ajax({
			url: "/getTestGridView.do",		
			data: {'testKey' : 'testValue'},
			success: function (data, textStatus, jqXHR) {
				console.log("getTestGridView..");
				console.log(data.results);
				testGrid.Source.Data.Data.Body = [data.results];
				testGrid.Reload();
	        }
	    });	
	});
	
	$('#btnSave').click(function () {
		console.log('btnSave');
	});
	
	TGSetEvent("OnValueChanged","idsmTestGrid",function(grid, row, col, val, oldval, errors){
		console.log("==gridValueChanged==");
		console.log(grid);
		console.log(row);
		console.log(col);
		
		//grid.RefreshRow(row);
	});
});

$(function() {
	"use strict";

	// Grid Row Selected Test
	var testGridB;
	var testGridBCol = {
		"Cfg" : {
			"id"				: "TestGridB"
			, "CfgId"			: "TestGridBCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle"	: "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{ "Name": "SEQ_NO" , "Width": "100", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	},
		   ,{ "Name": "COLINTA" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTB" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTC" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTD" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTA" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );" }
		   ,{ "Name": "COLTEXTB" , "Width": "100", "Type": "Text", "Button": "Defaults", "Defaults": "|B|D|F|H|J|Z|AZ|TZ",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTC" , "Width": "100", "Type": "Bool",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTD" , "Width": "100", "Type": "Select", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"
		   	  , "Defaults" : "|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|한글" }
		   ,{ "Name": "COLDATE" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		],
		
	};
	testGridB =	TreeGrid({Layout: {Data: testGridBCol}, Data:{Data: {Body: [[]]}}}, "gridTestB");
	
	$('#btnAddRowB').click(function () {
		console.log('btnAddRow');
		var row = testGridB.AddRow(null, null, 1, null, null);
		
	});
	
	$('#btnLoadB').click(function () {
		$.ajax({
			url: "/getTestGridView.do",		
			data: {'testKey' : 'testValue'},
			success: function (data, textStatus, jqXHR) {
				console.log("getTestGridView..");
				console.log(data.results);
				testGridB.Source.Data.Data.Body = [data.results];
				testGridB.Reload();
	        }
	    });	
	});
	
	$('#btnSaveB').click(function () {
		console.log('btnSave');
	});
	
	TGSetEvent("OnValueChanged","TestGridB",function(grid, row, col, val, oldval, errors){
		console.log("==gridValueChanged==");
		console.log(grid);
		console.log(row);
		console.log(col);
		
		if(col === 'COLTEXTB' && val === 'TZ') {
			console.log('test');
		}
		
	});
});

$(function() {
	"use strict";

	// Grid Row Selected Test
	var testGridC;
	var testGridCCol = {
		"Cfg" : {
			"id"				: "TestGridC"
			, "CfgId"			: "TestGridCCfg"
			, "SuppressCfg"		: "0"
			, "StyleLap"		: "0"
			, "Version"			: "1"
			, "Style"			: "Material"
			, "Size"			: "Small"
			, "Scale"			: "90%"
			, "ConstWidth"		: "100%"
			, "MinTagHeight"	: "300"
			, "MaxHeight"		: "1"
			, "Paging"			: "2"
			, "PageLength"		: "20"
			, "ChildParts"		: "2"
			, "NoPager"			: "1"
			, "Dragging"		: "0"
			, "SelectingSingle"	: "1"
			, "Adding"			: "0"
			, "Export"			: "1"
			, "Deleting"		: "0"
			, "SafeCSS"			: "1"
			, "Sorting"			: "0"
		}
		, "Toolbar" : {
			"Visible" : "0"
		}
		, "Cols" : [
			{ "Name": "SEQ_NO" , "Width": "100", "Type": "Text", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "0", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	},
		   ,{ "Name": "COLINTA" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTB" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTC" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLINTD" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTA" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );" }
		   ,{ "Name": "COLTEXTB" , "Width": "100", "Type": "Text", "Button": "Defaults", "Defaults": "|B|D|F|H|J|Z|AZ|TZ",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTC" , "Width": "100", "Type": "Bool",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		   ,{ "Name": "COLTEXTD" , "Width": "100", "Type": "Select", "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"
		   	  , "Defaults" : "|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|한글" }
		   ,{ "Name": "COLDATE" , "Width": "100", "Type": "Text",   "Spanned": "1", "Class": "gridBorderText gridTextColor", "CanMove": "0", "CanEdit": "1", "OnDblClick": "gridProjectListDbClick( Grid, Row, Col );"	}
		],
		
	};
	testGridC =	TreeGrid({Layout: {Data: testGridCCol}, Data:{Data: {Body: [[]]}}}, "gridTestC");
	
	$('#btnAddRowC').click(function () {
		console.log('btnAddRow');
		var row = testGridC.AddRow(null, null, 1, null, null);
		
	});
	
	$('#btnLoadC').click(function () {
		$.ajax({
			url: "/getTestGridView.do",		
			data: {'testKey' : 'testValue'},
			success: function (data, textStatus, jqXHR) {
				console.log("getTestGridView..");
				console.log(data.results);
				testGridC.Source.Data.Data.Body = [data.results];
				testGridC.Reload();
	        }
	    });	
	});
	
	$('#btnSaveC').click(function () {
		console.log('btnSave');
	});
	
	TGSetEvent("OnValueChanged","TestGridC",function(grid, row, col, val, oldval, errors){
		console.log("==gridValueChanged==");
		console.log(grid);
		console.log(row);
		console.log(col);
		
		if(col === 'COLTEXTB' && val === 'TZ') {
			row.COLTEXTACanEdit = 0;
			row.COLTEXTAColor = '#808080';
		}
	});
	
	testGridC.OnGetInputValue = function(G, row, col, val) {
		console.log('tt');
	}
});

function gridProjectListDbClick( grid, row, col ) {
	console.log("==gridProjectListDbClick==");
	console.log(grid);
	console.log(row);
	console.log(col);
}

// 여기에서도 먹힘
//TGSetEvent("OnValueChanged","idsmTestGrid",function(grid, row, col, val, oldval, errors){
//	console.log("==gridValueChanged==");
//	console.log(grid);
//	console.log(row);
//	console.log(col);
	//grid.RefreshRow(row);
//});