var clientId = "";
var currentSessionId = -1;
const gaID = 'G-HWSS0NKVPT';


initAnalytics();

// function startGoogleAnalytics(){
	// window.dataLayer = window.dataLayer || [];
	  // gtag('js', new Date());

	  // gtag('config', gaID);
// }

// function gtag(){dataLayer.push(arguments);}

function getClientId(callback) {
	console.log('getClientId');
	
	gtag('get', gaID, function(result) {
		  var clientId = result['client_id'];
		  console.log('Client ID: ' + clientId);
		  callback(clientId);
	});
}

function getClientIdAsync() {
	console.log('getClientIdAsync');
	
	return new Promise(function(resolve) {
    gtag('config', gaID, {
      'send_page_view': false,
      'custom_map': {'dimension1': 'clientId'}
    });

    gtag('event', 'client_id_callback', {
      'event_callback': function() {
        var clientId = gtag.analytics.getByName('tracker').get('clientId');
        resolve(clientId);
      }
    });
  });
}

function getAndSaveClientId() {
  getClientId((result => 
  {
	  console.log('getAndSaveClientId callback: ' + clientId);
	  clientId = result;
	  sendEvent("Hello_World");
  }));
}

async function getAndSaveClientIdAsync() {
  clientId = await getClientIdAsync();
  console.log('getAndSaveClientIdAsync: ' + clientId);
}

function getSavedClientId(){
	return clientId;
}

function startYandexAnalytics(){
	(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(93348023, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
}

function getSessionId() {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId(); 
    sessionStorage.setItem('sessionId', sessionId); 
  }
  
  console.log('getSessionId: ' + sessionId);
  return sessionId;
}

function getCurrentSessionId() {
  return currentSessionId;
}

function generateSessionId() {
  var currentDate = new Date().getTime();
  var sessionId = currentDate * 1000000 + Math.floor(Math.random() * 1000000);
  return sessionId;
}

function initAnalytics(){
	console.log("initAnalytics");
	
	//startGoogleAnalytics();
	startYandexAnalytics();
	currentSessionId = getSessionId();
	
	// getAndSaveClientId();
	// sendEvent("Hello_World");
	
	waitForAnalytics(function() {
		console.log('Google Analytics initialized!');
		getAndSaveClientId();
		getAndSaveClientIdAsync();
	});
}

function waitForAnalytics(callback) {
  console.log("waitForAnalytics");
  if (typeof gtag !== 'undefined') {
    callback();
  } else {
    setTimeout(function() {
      waitForAnalytics(callback);
    }, 100);
  }
}
