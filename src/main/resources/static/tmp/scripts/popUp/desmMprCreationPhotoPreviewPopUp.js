var v_desm_mpr_creation_photo_preview_callback = null;
var v_desm_mpr_creation_photo_preview_param;
var idx; 
var fileList;

function initDesmMprCreationPhotoPreviewPopUp(param , callback) {
	v_desm_mpr_creation_photo_preview_callback = callback;
    v_desm_mpr_creation_photo_preview_param = param;    
    
	$('#desmMprCreationPhotoPreviewPopUp').on('shown.bs.modal', function () {
		//$('#desmMprCreationPhotoPreviewPopUp').click();
	});	
	
	$('#desmMprCreationPhotoPreviewPopUp').on('hidden.bs.modal', function () {
	  	closeDesmMprCreationPhotoPreviewPopUp();
	});	
	
	
	fileList = v_desm_mpr_creation_photo_preview_param.fileList;
	
	for (var i = 0; i < fileList.length; i++) {
		var fileRow = fileList[i];
		if(fileRow.IDX == v_desm_mpr_creation_photo_preview_param.idx) {
			idx = i;
		}
	}
    initDesmMprCreationPhotoPreviewScreen();
    initDesmMprCreationPhotoPreviewPopUpCode();    
}

function initDesmMprCreationPhotoPreviewPopUpCode() {  
    
    initDesmMprCreationPhotoPreviewPopUpControls();
}


function initDesmMprCreationPhotoPreviewPopUpControls() {	
	
	$('#desmMprCreationPhotoPreviewPopUp').modal('show');
	
	$('#btnsDesmMprCreationPhotoPreviewHeader').click(function () { btnsDesmMprCreationPhotoPreviewHeaderClick(); return false; });
	$('#btnsDesmMprCreationPhotoPreviewBodyHeader').click(function () { btnsDesmMprCreationPhotoPreviewBodyHeaderClick(); return false; });
	$('#btnsDesmMprCreationPhotoPreviewFullScreen').click(function () { btnsDesmMprCreationPhotoPreviewFullScreenClick(); return false; });
	$('#btnsDesmMprCreationPhotoPreviewBodyFullScreen').click(function () { btnsDesmMprCreationPhotoPreviewFullScreenClick(); return false; });
	
	$('#btnsDesmMprCreationPhotoPreviewBorderless').click(function () { btnsDesmMprCreationPhotoPreviewBorderlessClick(); return false; });
	$('#btnsDesmMprCreationPhotoPreviewBodyBorderless').click(function () { btnsDesmMprCreationPhotoPreviewBorderlessClick(); return false; });
	$('#btnsDesmMprCreationPhotoPreviewPrev').click(function () { btnsDesmMprCreationPhotoPreviewPrevClick(); return false; });
	$('#btnsDesmMprCreationPhotoPreviewNext').click(function () { btnsDesmMprCreationPhotoPreviewNextClick(); return false; });
	
	
	
	setImgData();
}

function closeDesmMprCreationPhotoPreviewPopUp() {

}

function btnsDesmMprCreationPhotoPreviewHeaderClick() {
	$('#desmMprCreationPhotoPreviewPopUp .modal-header').hide();
	$('#desmMprCreationPhotoPreviewPopUp .modal-body .floating-buttons').show();
	$('#btnsDesmMprCreationPhotoPreviewBodyHeader').addClass("active");
	
	if($('#btnsDesmMprCreationPhotoPreviewFullScreen').hasClass('active') || 
	   $('#btnsDesmMprCreationPhotoPreviewBorderless').hasClass('active')) {
	   setTimeout(desmMprCreationPhotoPreviewSize, 300);
		
	}
	else {
		$('#desmMprCreationPhotoPreviewPopUp').find('.kv-zoom-body').height(480);
	}
	
}

function btnsDesmMprCreationPhotoPreviewBodyHeaderClick() {
	$('#desmMprCreationPhotoPreviewPopUp .modal-body .floating-buttons').hide();
	$('#desmMprCreationPhotoPreviewPopUp .modal-header').show();
	$('#btnsDesmMprCreationPhotoPreviewBodyHeader').removeClass("active");
	
	if($('#btnsDesmMprCreationPhotoPreviewFullScreen').hasClass('active') || 
	   $('#btnsDesmMprCreationPhotoPreviewBorderless').hasClass('active')) {
	   setTimeout(desmMprCreationPhotoPreviewSize, 300);
		
	}
	else {
		$('#desmMprCreationPhotoPreviewPopUp').find('.kv-zoom-body').height(480);
	}
}

function btnsDesmMprCreationPhotoPreviewFullScreenClick() {
	
	if($('#btnsDesmMprCreationPhotoPreviewFullScreen').hasClass('active')){	
		
		desmMprCreationPhotoPreviewFullScreen(false);
	}
	else {		
		desmMprCreationPhotoPreviewFullScreen(true);
	}
	setTimeout(desmMprCreationPhotoPreviewSize, 300);

}

function desmMprCreationPhotoPreviewCheckFullScreen() {
            
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}

function initDesmMprCreationPhotoPreviewScreen() {
    var doc = document, de = doc.documentElement;
    
    	
    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    } else {
        if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        } else {
            if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else {
                if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
            }
        }
    }
}

function desmMprCreationPhotoPreviewFullScreen(fullScreenYn) {
    var doc = document, de = doc.documentElement;
    if (de && fullScreenYn && !desmMprCreationPhotoPreviewCheckFullScreen()) {
               
        if (de.requestFullscreen) {
            de.requestFullscreen();
              
        } else {
            if (de.msRequestFullscreen) {
               de.msRequestFullscreen();
            } else {
                if (de.mozRequestFullScreen) {
                   de.mozRequestFullScreen();
                } else {
                    if (de.webkitRequestFullscreen) {
                       de.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                }
            }   
        }
        
        $('#desmMprCreationPhotoPreviewPopUp').addClass('file-zoom-fullscreen');
        $('#btnsDesmMprCreationPhotoPreviewFullScreen').addClass("active");
        $('#btnsDesmMprCreationPhotoPreviewBodyFullScreen').addClass("active");	
        
        $('#btnsDesmMprCreationPhotoPreviewBorderless').removeClass("active");
        $('#btnsDesmMprCreationPhotoPreviewBodyBorderless').removeClass("active");     
             
        
    }
    else { 
    	
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else {
            if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            } else {
                if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else {
                    if (doc.webkitExitFullscreen) {
                        doc.webkitExitFullscreen();
                    }
                }
            }
        }
        
		$('#btnsDesmMprCreationPhotoPreviewFullScreen').removeClass("active");
		$('#btnsDesmMprCreationPhotoPreviewBodyFullScreen').removeClass("active");
		
		$('#btnsDesmMprCreationPhotoPreviewBorderless').addClass("active");
		$('#btnsDesmMprCreationPhotoPreviewBodyBorderless').addClass("active");    
		    
                
    }
    
    return true;
}

function desmMprCreationPhotoPreviewSize() {
       
        var modal = $('#desmMprCreationPhotoPreviewPopUp');  
        var head = modal.find('.modal-header:visible'),
            foot = modal.find('.modal-footer:visible'), body = modal.find('.modal-body'),
            h = $(window).height(), diff = 0;
        
        
        if (head && head.length) {
            h -= head.outerHeight(true);
        }
        if (foot && foot.length) {
            h -= foot.outerHeight(true);
        }
        if (body && body.length) {
            diff = body.outerHeight(true) - body.height();
            h -= diff;
        }
        modal.find('.kv-zoom-body').height(h);
}

function btnsDesmMprCreationPhotoPreviewBorderlessClick() {
	
	if($('#btnsDesmMprCreationPhotoPreviewFullScreen').hasClass('active')){
		desmMprCreationPhotoPreviewFullScreen(false);
		
		$('#desmMprCreationPhotoPreviewPopUp').addClass('file-zoom-fullscreen');
		$('#btnsDesmMprCreationPhotoPreviewBorderless').addClass("active");
		$('#btnsDesmMprCreationPhotoPreviewBodyBorderless').addClass("active");
		
		setTimeout(desmMprCreationPhotoPreviewSize, 300);  
	}
	else {
		if($('#btnsDesmMprCreationPhotoPreviewBorderless').hasClass('active')){	
			$('#desmMprCreationPhotoPreviewPopUp').removeClass('file-zoom-fullscreen');
			$('#btnsDesmMprCreationPhotoPreviewBorderless').removeClass("active");
			$('#btnsDesmMprCreationPhotoPreviewBodyBorderless').removeClass("active"); 
			
			$('#desmMprCreationPhotoPreviewPopUp').find('.kv-zoom-body').height(480);
			
		}
		else {		
			$('#desmMprCreationPhotoPreviewPopUp').addClass('file-zoom-fullscreen');
			$('#btnsDesmMprCreationPhotoPreviewBorderless').addClass("active");
			$('#btnsDesmMprCreationPhotoPreviewBodyBorderless').addClass("active");
			
			setTimeout(desmMprCreationPhotoPreviewSize, 300); 
		}	
	}	
}

function setImgData() {
	var fileRow = fileList[idx];
	
	$("#imgDesmMprCreationPhotoPreview").attr("src", fileRow.SRC);
}

function btnsDesmMprCreationPhotoPreviewPrevClick() {
	if(idx != 0) {
		idx = idx - 1;
	}
	setImgData();
}

function btnsDesmMprCreationPhotoPreviewNextClick() {
	if(idx != fileList.length - 1) {
		idx = idx + 1;
	}
	setImgData();
}


