var mainArr = [];
var on = false;
var run = false;
var counter = 0;
var delayInput = 500;
var delayEndStep = 3000;
var delayShow = 250;
var delayBtwShow = 1000;
var centerX = 250;
var centerY = 250;
var sizeX = 500;
var sizeY = 500;
var radius = 150;

$(document).ready(function(){
	init();

	$(".switch").click(function(){
		console.log("switch");
		toggleOnOff();
	});
	
	$("#on-button").click(function(){
		if (on) {
			//console.log("clicked");
			main();
		}
	});
});

function init(){
	$("svg").css({"height":sizeY+"px","width":sizeX+"px"});

	//document.getElementById("arc").setAttribute("d", describeArc(centerX, centerY, radius*0.65, 0, 359.9999));
	document.getElementById("arc0").setAttribute("d", describeArc(centerX, centerY, radius, 0, 90));
	document.getElementById("arc1").setAttribute("d", describeArc(centerX, centerY, radius, 90, 180));
	document.getElementById("arc2").setAttribute("d", describeArc(centerX, centerY, radius, 180, 270));
	document.getElementById("arc3").setAttribute("d", describeArc(centerX, centerY, radius, 270, 360));
	
	//$("#arc").css({"stroke-width":radius*1.3});
	$("#main-circle").attr({"cx":centerX,"cy":centerY,"r":radius*1.3});
	$("#switch-box").attr({"x":centerX-radius/5,"y":centerY-15+radius/2, "width":radius*2/5, "height":radius/5});
	$("#switch").attr({"x":centerX-radius/5+2,"y":centerY-13+radius/2, "width":radius/5-4, "height":radius/5-4});
	$("#display-box").attr({"x":centerX-radius/2-7,"y":centerY-radius/10, "width":radius/4+12, "height":radius/5+10 });
	$("#display-digit").attr({"x":centerX-radius/2-5,"y":centerY+radius/10+4, "font-size":radius/5+5});
	$("#on-button").attr({"cx":centerX+radius/10,"cy":centerY+10, "r":radius/10});
	$("#stricy-button").attr({"cx":centerX+radius/2,"cy":centerY+10, "r":radius/10});
	$("#stricy-led").attr({"cx":centerX+radius/2,"cy":centerY-radius/5+10, "r":radius/20});
}


function toggleOnOff() {
	if (!on) {
		$("#switch").attr("x", centerX+2);
		$("#switch").css({ fill: "rgb(50,250,50)" });
		on = true;
	} else {
		$("#switch").attr("x", centerX-radius/5+2);
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

