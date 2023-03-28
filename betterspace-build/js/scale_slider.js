var slider = document.getElementById("myRange");
var main_canvas = document.querySelector("#unity-canvas");
var loader_canvas = document.querySelector("#loader_canvas");
var splash_screen = document.querySelector("#SPLASH_SCREEN");
var defaultWidth = main_canvas.style.width;
var defaultHeight = main_canvas.style.height;
var defaultCanvasWidth = main_canvas.width;
var defaultCanvasHeight = main_canvas.height;
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	var width = (parseInt(defaultWidth) * (this.value) / 50);
	var height = (parseInt(defaultHeight) * (this.value) / 50);
	var canvasWidth = (parseInt(defaultCanvasWidth) * (this.value) / 50);
	var canvasHeight = (parseInt(defaultCanvasHeight) * (this.value) / 50);
	main_canvas.style.width = width + "px";
	main_canvas.style.height = height + "px";
	main_canvas.width = canvasWidth;
	main_canvas.height = canvasHeight;
	loader_canvas.style.width = main_canvas.style.width;
	loader_canvas.style.height = main_canvas.style.height;
	splash_screen.style.width = main_canvas.style.width;
	splash_screen.style.height = main_canvas.style.height;
}