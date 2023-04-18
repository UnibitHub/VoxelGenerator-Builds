function subscribeOnKeyEvents(){
	document.addEventListener('keyup', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape1: " + evt.repeat);
			if (!evt.repeat){
				myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
				// Cancel the default action to avoid it being handled twice
				evt.preventDefault();
			}
		}
	},true);
	
	var canvas = document.querySelector("#unity-canvas");
	canvas.addEventListener("mousedown", onMouseDown, false);
}
 
function onMouseDown(event)
{
    window.focus();
}