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
	document.addEventListener('keyup', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape2: " + evt.repeat);
			if (!evt.repeat){
				myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
				// Cancel the default action to avoid it being handled twice
				evt.preventDefault();
			}
		}
	},false);
	document.addEventListener('keyup', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape3: " + evt.repeat);
			evt.preventDefault();
			if (!evt.repeat){
				myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
				// Cancel the default action to avoid it being handled twice
				
			}
		}
	},false);
	document.addEventListener('keyup', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape4: " + evt.repeat);
			if (!evt.repeat){
				myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
				// Cancel the default action to avoid it being handled twice
			}
			evt.preventDefault();
		}
	},false);
}