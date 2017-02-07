var mainArr = [];
var on = false;
var counter = 0;
var delayInput = 500;
var delayEndStep = 3000;
var delayShow = 250;
var delayBtwShow = 1000;

$(document).ready(function(){
	document.getElementById("arc").setAttribute("d", describeArc(250, 250, 65, 0, 359.9999));
	document.getElementById("arc0").setAttribute("d", describeArc(250, 250, 100, 0, 90));
	document.getElementById("arc1").setAttribute("d", describeArc(250, 250, 100, 90, 180));
	document.getElementById("arc2").setAttribute("d", describeArc(250, 250, 100, 180, 270));
	document.getElementById("arc3").setAttribute("d", describeArc(250, 250, 100, 270, 360));
	
	$(".switch").click(function(){
		console.log("switch");
		toggleOnOff();
	});
	
	$("#on-button").click(function(){
		if (on) {
			console.log("clicked");
			main();
		}
	});
});


function toggleOnOff() {
	if (!on) {
		$("#switch").attr("x", 252);
		$("#switch").css({ fill: "rgb(50,250,50)" });
		on = true;
	} else {
		$("#switch").attr("x", 232);
		$("#switch").css({ fill: "rgb(250,50,50)" });
		on = false;
	}
}


function main(){
	addOne();
	setTimeout(body, 1000);
}


function updateDisplay(txt){
	$("#display-digit").text(txt);
}


function addOne(){
	counter++;
	updateDisplay(pad(counter,2));
	mainArr.push( Math.floor(Math.random() * 4) );
}


function markArc(arc) {
	$("#arc"+arc).fadeTo( delayShow, 0.5, function(){
		$("#arc"+arc).fadeTo( delayShow, 1);
	});
}


function body() {
    var index = mainArr.length;
    var lng = index;
	var fail = null;
    function next() {
        if (!mainArr.length) {
            return;
        }

        // see if we need to wrap the index
        if (index < -lng) {
			return true;
            //index = 0;  //to renew running
        }
		
		if (fail == true) {
			console.log("fail = true");
			return true;
		}

        if (index > 0) {
			if (markArc(mainArr[lng-index]) === false) {
				return;
			}
			--index;
			setTimeout(next, delayBtwShow);
		} else {
			var arc = mainArr[0-index];
			var myVar;
			myVar = setTimeout(function(){
				console.log("false timer");
				$(".arc").off();
				fail = true;
				return false;
			}, 3000);
			$(".arc").click(function(){
				clearTimeout(myVar);
				$(".arc").off();
				$(this).fadeTo( 250 , 0.5, function(){
					$(this).fadeTo( 250 , 1);
				});
				if($(this).attr('id') == "arc"+arc){
					//return true;
					console.log("right arc " + $(this).attr('id'));
					if (index <= -lng+1) {
						console.log("index: " + index + "/-length: " + -lng);
						console.log("start new run!!!");
						setTimeout(main, delayEndStep);
						return true;
				    } else {
						console.log("else option");
						--index;
						setTimeout(next, delayInput);				
					}
				} else {
					fail = true;
					console.log("wrong arc wait/real " + arc + "/" + $(this).attr('id'));
					return false;
				}
				//return true;
			});
					
		}

    }
    next();
}


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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

