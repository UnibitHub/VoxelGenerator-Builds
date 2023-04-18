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
	
	document.onkeydown = myKeyDownHandler1;
	canvas.onkeydown = myKeyDownHandler2;
}
 
function onMouseDown(event)
{
	console.log('onMouseDown focus');
    canvas.focus();
}

    function myKeyDownHandler1(){
      console.log("A key down event took place within the document1!");
    }
	
	function myKeyDownHandler2(){
      console.log("A key down event took place within the document2!");
    }