function subscribeOnKeyEvents(){
	document.addEventListener('keyup', evt => {
		console.log("keyup: " + evt.key);
		if (evt.key === 'Escape') {
			console.log("Escape: " + evt.repeat);
			if (!evt.repeat){
				myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
				// Cancel the default action to avoid it being handled twice
				evt.preventDefault();
			}
		}
	},true);
}