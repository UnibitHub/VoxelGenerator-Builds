function subscribeOnKeyEvents(){
	document.addEventListener('keydown', evt => {
		if (evt.key === 'Escape') {
			console.log("Escape");
			myGameInstance.SendMessage("JSInputHandler", "OnEscapeButtonPressed");
		}
	});
}
