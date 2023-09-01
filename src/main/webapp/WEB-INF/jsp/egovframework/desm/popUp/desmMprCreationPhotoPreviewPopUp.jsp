<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%
	//230413, 재 배포시 JS 새로 불러오기 위한 template param 추가
    String rV = (String) application.getAttribute("rv");
    String desmMprCreationPhotoPreviewPopUpJs = "/resources/scripts/popUp/desmMprCreationPhotoPreviewPopUp.js?rv=" + rV;
%>

<%--<script src="/resources/scripts/popUp/desmMprCreationPhotoPreviewPopUp.js"></script> --%>
<script src="<%= desmMprCreationPhotoPreviewPopUpJs %>"></script>

<!-- file-zoom-dialog modal fade show file-zoom-fullscreen -->
<div id="desmMprCreationPhotoPreviewPopUp" class="file-zoom-dialog modal fade show" tabindex="-1" aria-labelledby="desmMprCreationPhotoPreviewPopUpLabel" style="z-index: 1181; display: block; padding-left: 17px;" aria-modal="true">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">View</h5>
				<span class="kv-zoom-title" ></span>
				<div class="kv-zoom-actions">
					<button id="btnsDesmMprCreationPhotoPreviewHeader" type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-toggleheader"  data-toggle="button" aria-pressed="false" autocomplete="off">
						<i class="fas fa-fw fa-arrows-alt-v"></i>
					</button>
					<button id="btnsDesmMprCreationPhotoPreviewFullScreen" type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-fullscreen"  data-toggle="button" aria-pressed="false" autocomplete="off">
						<i class="fas fa-fw fa-arrows-alt"></i>
					</button>
					<button id="btnsDesmMprCreationPhotoPreviewBorderless" type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-borderless"  data-toggle="button" aria-pressed="false" autocomplete="off">
						<i class="fas fa-fw fa-external-link-alt"></i>
					</button>
					<button type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-close" title="세부 정보 닫기" data-dismiss="modal" aria-hidden="true">
						<i class="fas fa-fw fa-times"></i>
					</button>
				</div>
			</div>
			<div class="modal-body">
				<div class="floating-buttons" style="display:none">
					<button id="btnsDesmMprCreationPhotoPreviewBodyHeader" type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-toggleheader " data-toggle="button" aria-pressed="true" autocomplete="off">
						<i class="fas fa-fw fa-arrows-alt-v"></i>
					</button>
					<button id="btnsDesmMprCreationPhotoPreviewBodyFullScreen" type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-fullscreen" data-toggle="button" aria-pressed="false" autocomplete="off">
						<i class="fas fa-fw fa-arrows-alt"></i>
					</button>
					<button id="btnsDesmMprCreationPhotoPreviewBodyBorderless" type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-borderless" data-toggle="button" aria-pressed="false" autocomplete="off">
						<i class="fas fa-fw fa-external-link-alt"></i>
					</button>
					<button type="button" class="btn btn-sm btn-kv btn-default btn-outline-secondary btn-close" title="세부 정보 닫기" data-dismiss="modal" aria-hidden="true">
						<i class="fas fa-fw fa-times"></i>
					</button>
				</div>
				<div class="kv-zoom-body file-zoom-content krajee-default" style="height: 480px;">
					<img id="imgDesmMprCreationPhotoPreview" src="" class="file-preview-image kv-preview-data file-zoom-detail" style="width:auto;height:auto;max-width:100%;max-height:100%;">
				</div>
				<button id="btnsDesmMprCreationPhotoPreviewPrev" type="button" class="btn btn-navigate btn-prev" >
					<i class="fas fa-caret-left fa-lg"></i>
				</button> 
				<button id="btnsDesmMprCreationPhotoPreviewNext" type="button" class="btn btn-navigate btn-next" >
					<i class="fas fa-caret-right fa-lg"></i>
				</button>
			</div>
		</div>
	</div>
</div>

