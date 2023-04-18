function subscribeOnKeyEvents(){
	document.addEventListener('keydown', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape: " + evt.repeat);
			
			// Cancel the default action to avoid it being handled twice
			evt.preventDefault();
			
			if (!evt.repeat)
				myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
		}
	},true);
}