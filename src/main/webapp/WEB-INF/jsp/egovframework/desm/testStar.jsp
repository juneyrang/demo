<!--
	운송관리 > 전략물자관리
	strategicMgt.jsp
-->
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<%-- <jsp:include page="top_left.jsp"></jsp:include> --%>
<!-- Page level style -->
<link href="/resources/ext/fileinput/css/fileinput.min.css" rel="stylesheet" />
<link href="/resources/ext/fileinput/themes/explorer/theme.css" rel="stylesheet" />

<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<script src="/resources/ext/fileinput/js/fileinput.js"></script>
<script src="/resources/ext/fileinput/themes/explorer/theme.js"></script>
<script src="/resources/scripts/ajaxSetup.js"></script>
<script src="/resources/gridJs/GridE.js"></script>

<!-- Page level scripts -->
<script src="/resources/scripts/testStar.js"></script>

<script type="text/javascript">
	$(document).ready( function() {
		console.log('testStar.jsp Start');
	});
</script>

<!-- 전략물자관리 목록 -->
<div class="container-fluid" >
	<div class="file-loading">
	    <input id="input-ke-1" name="input-ke-1[]" type="file" multiple accept="image">
	</div>
	
	<div class="file-loading">
    	<input id="input-ke-2" name="input-ke-2[]" type="file" multiple>
	</div>
	
	<div class="file-loading">
	    <input id="input-ke-3" name="input-ke-3[]" type="file" multiple>
	</div>
	 
	<div class="card">
		<div class="card-header">
			<h4>Grid test</h4>
		</div>
		<div class="card-body">
			<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">
				<button id="btnAddRow" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Add</span>
				</button>
				<button id="btnLoad" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Load</span>
				</button>
				<button id="btnDeleteRow" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Delete</span>
				</button>
				<button id="btnSave" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Save</span>
				</button>
			</div>
			<div class="table-responsive" style = "padding-top: 5px;">
				<div id="gridTest"></div>
			</div>
		</div>
	</div>
	
	<div class="card">
		<div class="card-header">
			<h4>Grid test 2nd</h4>
		</div>
		<div class="card-body">
			<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">
				<button id="btnAddRowB" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Add</span>
				</button>
				<button id="btnLoadB" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Load</span>
				</button>
				<button id="btnDeleteRowB" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Delete</span>
				</button>
				<button id="btnSaveB" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Save</span>
				</button>
			</div>
			<div class="table-responsive" style = "padding-top: 5px;">
				<div id="gridTestB"></div>
			</div>
		</div>
	</div>
	
	<div class="card">
		<div class="card-header">
			<h4>Grid test 3rd</h4>
		</div>
		<div class="card-body">
			<div id="toolbar" style="margin-bottom: 1px; padding-right: 1px;">
				<button id="btnAddRowC" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Add</span>
				</button>
				<button id="btnLoadC" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Load</span>
				</button>
				<button id="btnDeleteRowC" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Delete</span>
				</button>
				<button id="btnSaveC" class="btn btn-primary btn-icon-split btn-sm" role="button" style="float:right;">
					<span class="text">Save</span>
				</button>
			</div>
			<div class="table-responsive" style = "padding-top: 5px;">
				<div id="gridTestC"></div>
			</div>
		</div>
	</div>
</div>
