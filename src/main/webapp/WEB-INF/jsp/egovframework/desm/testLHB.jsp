<!--
	운송관리 > 전략물자관리
	strategicMgt.jsp
-->
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core"			%>
<%@ taglib prefix="form"	uri="http://www.springframework.org/tags/form"	%>
<%@ taglib prefix="ui"		uri="http://egovframework.gov/ctl/ui"			%>
<%@ taglib prefix="spring"	uri="http://www.springframework.org/tags"		%>

<!-- Page level plugins -->
<jsp:include page="./layoutSupport/layout.jsp"></jsp:include>
<script src="/resources/scripts/ajaxSetup.js"></script>
<!-- Page level scripts -->
<script src="/resources/scripts/testLHB.js"></script>

<script type="text/javascript">
	$(document).ready( function() {
		console.log('testStar.jsp Start');
		
		function drawPolyLine(areaId) {
			var coodStr = document.getElementById(areaId).getAttribute('coords');
			
			var can = document.getElementById('myCanvas');
			var hdc = can.getContext('2d');
			var img_main_laydown = document.getElementById('img_main_laydown');
			hdc.clearRect(0, 0, img_main_laydown.clientWidth, img_main_laydown.clientHeight);

			console.log(coodStr);

			debugger;
			can.style.zIndex = 1;
			can.width = img_main_laydown.clientWidth;
			can.height = img_main_laydown.clientHeight;
			//ctx.fillStyle = '#ff0000';
			
			hdc.fillStyle = 'red';
			hdc.strokeStyle = 'red';
			hdc.lineWidth = 2;
			hdc.beginPath();
			hdc.moveTo(820, 628);
			hdc.lineTo(869, 551);
			hdc.lineTo(927, 474);
			hdc.lineTo(965, 501);
			hdc.lineTo(914, 581);
			hdc.lineTo(860, 657);
			hdc.closePath();
			//hdc.fill();
			hdc.stroke();
			
			
		}
		
		$('#9b').click(() => {
			alert('You clicked ONSITE-MAIN LAYDOWN-9B');
			drawPolyLine('9b');
		});

	});

	function showSelected(text) {
		document.form1.selected.value = text;
	}
</script>

<style type="text/css">
	.img-container {
		overflow: hidden;
	}
	
	#img_main_laydown {
		position: relative;
		width: 640px;
		height: 480px;
	}
	
	#myCanvas {
		pointer-events: none;
		position: absolute;
		z-index: 2;
	}
</style>


<!-- 전략물자관리 목록 -->
<div class="container-fluid" >
	<div class="row">
		
		<div class="col-10 img-container">
			<canvas id="myCanvas"></canvas>
	    	<img id="img_main_laydown" src="/resources/img/main_laydown.jpg" usemap = '#map_main_laydown' >
	    	<map name='map_main_laydown'>
	    		<area shape="rect"
	    			  coords = "883, 173, 1001, 206"
	    			  target = "_self"
	    			  onMouseOver = "showSelected('7A')"
	    			  onMouseOut = "showSelected('')"
	    			  id="7a"
	    		/>
	    		<area shape="poly"
	    			  coords = "820, 628, 869, 551, 927, 474, 965, 501, 914, 581, 860, 657"
	    			  target = "_self"
	    			  onMouseOver = "showSelected('9B')"
	    			  onMouseOut = "showSelected('')"
	    			  id="9b"
	    		/>
	    		<area shape="rect"
	    			  coords = "441, 278, 555, 347"
	    			  target = "_self"
	    			  onMouseOver = "showSelected('4C')"
	    			  onMouseOut = "showSelected('')"
	    		/>
	    		<area shape="poly"
	    			  coords = "888, 120, 1028, 135, 1093, 169, 887, 152"
	    			  target = "_self"
	    			  onMouseOver = "showSelected('7Z')"
	    			  onMouseOut = "showSelected('')"
	    		/>
	    	</map>
		</div>
		<div class="col-2 input-container">
			
			<p><strong>First Point:</strong></p>
			<p>X: <span id="x1"></span></p>
			<p>Y: <span id="y1"></span></p>
			<p><strong>Second Point:</strong></p>
			<p>X: <span id="x2"></span></p>
			<p>Y: <span id="y2"></span></p>
			<form name="form1">
				<input type="text" size="20" value="rect / poly" />
				<input type="text" name="selected" size="20" />
				<input type="button" name="clearbutton" value="Clear" onclick="Clear();" />
			</form>
		</div>
	</div>
</div>
