var slider = document.getElementById("myRange");
var main_canvas = document.querySelector("#unity-canvas");
var loader_canvas = document.querySelector("#loader_canvas");
var splash_screen = document.querySelector("#SPLASH_SCREEN");
var defaultWidth = main_canvas.style.width;
var defaultHeight = main_canvas.style.height;
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
	main_canvas.style.width = (parseInt(defaultWidth) * (this.value) / 50) + "px";
	main_canvas.style.height = (parseInt(defaultHeight) * (this.value) / 50) + "px";
	loader_canvas.style.width = main_canvas.style.width;
	loader_canvas.style.height = main_canvas.style.height;
	splash_screen.style.width = main_canvas.style.width;
	splash_screen.style.height = main_canvas.style.height;
	console.log('w: ' + main_canvas.style.width);
	console.log('h: ' + main_canvas.style.height);
}