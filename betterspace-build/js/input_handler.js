function subscribeOnKeyEvents(){
	document.addEventListener('keydown', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape: " + evt.repeat);
			myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
			
			// Cancel the default action to avoid it being handled twice
			event.preventDefault();
		}
	}
	// ,true
	;
}