const channel = new BroadcastChannel('app-data');
var eventListeners = [];

function signWithDiscord(redirectUri, callback){
	removeEventListener();
	
	const eventListener = event => {
		console.log(event.data);
		channel.removeEventListener('message', eventListener); 
		callback(event.data);
    };
	
	this.eventListeners.push(eventListener); 
	channel.addEventListener ('message', eventListener);

	console.log("redirectUri: " + redirectUri);
	var uri = "https://discord.com/api/oauth2/authorize?client_id=1092513317169414235&redirect_uri=" + redirectUri + "&response_type=code&scope=identify%20guilds%20email";
	console.log(uri);
	var disc_window = window.open(uri);
}

function authWithDiscord(){
	removeEventListener();
	
	const eventListener = event => {
		console.log(event.data);
		channel.removeEventListener('message', eventListener); 
    };
	
	this.eventListeners.push(eventListener); 
	channel.addEventListener ('message', eventListener);
	
	console.log(window.location.port);
	var port = window.location.port;
	var port_string = port ? "%3A" + port : "";
	var redirect_uri = "http%3A%2F%2F" + window.location.hostname + port_string  +"%2Fdiscord_wait.html";
	var uri = "https://discord.com/api/oauth2/authorize?client_id=1092513317169414235&redirect_uri=" + redirect_uri + "&response_type=code&scope=identify%20guilds%20email";
	console.log(redirect_uri);
	console.log(uri);
	var disc_window = window.open(uri);
}

function removeEventListener() {
  // Iterate through all stored event listeners to remove them
  this.eventListeners.forEach((listener) => {
      channel.removeEventListener('message', listener); 
  });
  // Do not forget to clear listeners array
  this.eventListeners = [];
}
