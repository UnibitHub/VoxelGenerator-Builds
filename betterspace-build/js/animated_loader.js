var context;
var canvasWidth;
var canvasHeight;
var image_loaded;
var img = new Image();
var arr;
var framesCount;
let animationReq = null;

function showEnteringPortalsLoader(){
	showLoader("TemplateData/SPLASH_SCREEN2.png");
}

function showLoader(imageSRC) {
	var loader = document.getElementById('loader_canvas_div');
	loader.style.display = "block";
	
	// Setup the canvas element.
	var canvas = $("canvas.dots");
	context = canvas[0].getContext("2d");
	canvasWidth = canvas.width();
	canvasHeight = canvas.height();
	//canvas.attr({ height: canvasHeight, width: canvasWidth });
	image_loaded = false;
	img = new Image();
	img.src = imageSRC;
	img.onload = () => {
	  image_loaded =true;
	  context.drawImage(img, 0, 0)
	};

	// Set the number of frames we want to run.
	framesCount = 160;

	// Set and create our dot.
	var dot1 = { x: 0, y: 0, radius: 5, currentFrame: 0, incr: 0.1 };
	var dot2 = { x: 0, y: 0, radius: 5, currentFrame: 0, incr: 0.1 };
	var dot3 = { x: 0, y: 0, radius: 5, currentFrame: 0, incr: 0.1 };
	arr = [dot1];

	animationReq = requestAnimationFrame(function() {
			moveDot(740, 675)
		})

	var timeout = 150;

	setTimeout(function () {
		arr.push(dot2);
	}, timeout);

	setTimeout(function () {
		arr.push(dot3);
	}, timeout * 2);
}

function closeLoader(){
	var loader = document.getElementById('loader_canvas_div');
	loader.style.display = "none";
	if (animationReq != null){
		//loader.remove();
		cancelAnimationFrame(animationReq);
		animationReq = null;
		context = null;
		image_loaded = false;
		img = null;
		arr = null;
		framesCount = 0;
	}
}

// This function moves the dot down and to the right in each frame.
function moveDot(startX, startY) {
  // Clear the canvas so we can draw on it again.
  context.clearRect(0, 0, canvasWidth, canvasHeight);

	if (image_loaded) {
		context.drawImage(img, 0, 0)
	}
	
	for (var i = 0; i < arr.length; i++){
		calcDot(arr[i]);
	}
	
	drawDot(startX, startY);

animationReq = requestAnimationFrame(function() {
        moveDot(startX, startY)
    })
}

function calcDot(dot)
{
// Adjust the dot's x and y values down and to the right.
  dot.x += dot.incr;
  dot.y += dot.incr;

  // Move the current time forward by one frame.
  dot.currentFrame += 1;
  
  if (dot.currentFrame == framesCount / 2)
  {
	dot.incr *= -1;
	dot.currentFrame = 0;
  }
}

function drawDot(startX, startY) {
  context.beginPath();
  for (var i = 0; i < arr.length; i++){
    var dot = arr[i];
	context.rect(startX + (20 * i) - dot.x / 2, startY   - dot.x / 2, dot.radius + dot.x, dot.radius + dot.x, false);
  }
  context.fillStyle = "#808080";
  context.fill();
}
