	var container = document.querySelector("#unity-container");
   var canvas = document.querySelector("#unity-canvas");
   var loadingBar = document.querySelector("#unity-loading-bar");
   var progressBarFull = document.querySelector("#unity-progress-bar-full");

if (document.location.href.includes('betterspace-prod-animal.herokuapp.com')) {
      document.location.replace('https://pets.bttr.space');
   }
else if (document.location.href.includes('/viewer/') == false){
	loadBuild("Build/betterspace-build.loader.js", "Build");
}
else{
	loadBuild("BuildViewer/betterspace-build.loader.js", "BuildViewer");
}
