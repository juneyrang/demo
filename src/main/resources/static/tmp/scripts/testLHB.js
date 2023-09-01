var point = 1;
var x1, y1, x2, y2;


$(document).ready(function () {
	"use strict";
	console.log('testStar.js Start');
	
	$('#img_main_laydown').click(() => {
		getCoordinates();
	});
	
});


function findPosition(pos) {
	if( typeof( pos.offsetParent ) != "undefined" ) {
	    for( var posX = 0, posY = 0; pos; pos = pos.offsetParent ) {
	      posX += pos.offsetLeft;
	      posY += pos.offsetTop;
	    }
	    return [ posX, posY ];
	  }
	  else {
	    return [ pos.x, pos.y ];
	  }
}

function getCoordinates(e) {
	var posX = 0;
	 var posY = 0;
	 var imgPos;
	 imgPos = findPosition(document.getElementById('img_main_laydown'));
	 if (!e) var e = window.event;
	 if (e.pageX || e.pageY)
	 {
	  posX = e.pageX;
	  posY = e.pageY;
	 }
	 else if (e.clientX || e.clientY)
	   {
	    posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	    posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	 }
	 posX = posX - imgPos[0];
	 posY = posY - imgPos[1];
	 if (point == 1)
	 {
	   x1 = posX;
	   y1 = posY;
	   point = 2;
	   document.getElementById("x1").innerHTML = posX;
	   document.getElementById("y1").innerHTML = posY;
	 }
	 else
	 {
	   x2 = posX;
	   y2 = posY;
	   point = 3;
	   document.getElementById("x2").innerHTML = posX;
	   document.getElementById("y2").innerHTML = posY;
	 }
}


function Clear()
{
  point = 1;
  document.getElementById("x1").innerHTML = '';
  document.getElementById("y1").innerHTML = '';
  document.getElementById("x2").innerHTML = '';
  document.getElementById("y2").innerHTML = '';
}