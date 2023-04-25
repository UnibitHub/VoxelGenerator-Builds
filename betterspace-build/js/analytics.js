var clientId = "";
var currentSessionId = -1;

function startGoogleAnalytics(){
	window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'G-SGFC31VKKL');
}

function getClientId() {
  return new Promise((resolve) => {
    gtag('get', 'G-SGFC31VKKL', {'send_page_view': false}).then((result) => {
      resolve(result[0].clientId);
    });
  });
}

async function getAndSaveClientId() {
  clientId = await getClientId();
  console.log('getAndSaveClientId: ' + clientId);
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
  var currentDate = new Date().getTime(); // отримуємо поточну дату в мілісекундах
  var sessionId = currentDate * 1000000 + Math.floor(Math.random() * 1000000); // додаємо випадкове число для унікальності
  return sessionId;
}

async function initAnalytics(){
	console.log("initAnalytics");
	waitForAnalytics(function() {
		console.log('Google Analytics initialized!');
		startGoogleAnalytics();
		startYandexAnalytics();
		getAndSaveClientId();
		currentSessionId = getSessionId();
		sendEvent("Hello_World");
	});
}

function waitForAnalytics(callback) {
  if (typeof gtag !== 'undefined') { // перевіряємо, чи ініціалізована бібліотека аналітики
    callback(); // викликаємо зворотний виклик, якщо бібліотека аналітики вже ініціалізована
  } else {
    setTimeout(function() {
      waitForAnalytics(callback); // чекаємо 100 мілісекунд і спробуємо знову
    }, 100);
  }
}