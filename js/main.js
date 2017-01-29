var mainArr = [];

$(document).ready(function(){
	document.getElementById("arc").setAttribute("d", describeArc(150, 150, 50, 0, 359.9999));
	document.getElementById("arc0").setAttribute("d", describeArc(150, 150, 75, 0, 90));
	document.getElementById("arc1").setAttribute("d", describeArc(150, 150, 75, 90, 180));
	document.getElementById("arc2").setAttribute("d", describeArc(150, 150, 75, 180, 270));
	document.getElementById("arc3").setAttribute("d", describeArc(150, 150, 75, 270, 360));
	
	$(".arc").click(function(){
		main();
	});
});

function main(){
	addOne();
	printMarks();
	checkUser();
}

function addOne(){
	mainArr.push("#arc" +  Math.floor(Math.random() * 4) );
}

function printMarks(){
	iterateArrayWithDelay(mainArr, 1000, markArc);
}

function checkUser(){
	for(var i = 0; i < mainArr.length; i++){
		console.log(i);
	}
	//setTimeout(function(){}, 5000);
}

function markArc(arc, array, i) {
	$(arc).fadeTo( 250 , 0.5, function(){
		$(arc).fadeTo( 250 , 1);
	});
}

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

function iterateArrayWithDelay(arr, delay, fn) {
    var index = 0;
	//console.log(index);
    function next() {
        // protect against empty array
        if (!arr.length) {
            return;
        }

        // see if we need to wrap the index
        if (index >= arr.length) {
			return;
            //index = 0;
        }

        // call the callback
        if (fn(arr[index], arr, index) === false) {
            // stop iterating
            return;
        }

        ++index;

        // schedule next iteration
        setTimeout(next, delay);
    }
    // start the iteration
    next();
}
