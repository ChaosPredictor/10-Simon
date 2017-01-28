$(document).ready(function(){
	document.getElementById("arc0").setAttribute("d", describeArc(150, 150, 50, 0, 359.9999));
	document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 75, 0, 90));
	document.getElementById("arc2").setAttribute("d", describeArc(150, 150, 75, 90, 180));
	document.getElementById("arc3").setAttribute("d", describeArc(150, 150, 75, 180, 270));
	document.getElementById("arc4").setAttribute("d", describeArc(150, 150, 75, 270, 360));
	
	$(".arc").click(function(){
		console.log("arc");
	});
});




function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function describeArc(x, y, radius, startAngle, endAngle){
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);

	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	var d = [
		"M", start.x, start.y, 
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
	].join(" ");

	return d;       
}


