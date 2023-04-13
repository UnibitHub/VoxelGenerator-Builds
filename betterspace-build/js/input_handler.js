document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
		myGameInstance.SendMessage("UiCtrl", "OnEscapeButtonPressed");
    }
});
