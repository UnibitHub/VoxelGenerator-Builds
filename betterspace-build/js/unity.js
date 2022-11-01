

var jsonData = "";


function checkBrowser() {
    var browser, uAgent = navigator.userAgent;
    if (uAgent.search("Firefox") > -1) {
        browser = "Mozilla Firefox";
    }
    else if (uAgent.indexOf("OPR") > -1) {
        browser = "Opera";
    }
    else if (uAgent.indexOf("Trident") > -1) {
        browser = "Microsoft Internet Explorer";
    }
    else if (uAgent.indexOf("YaBrowser") > -1) {
        browser = "Yandex";
    }
    else if (uAgent.search("Chrome") > -1) {
        browser = "Google Chrome";
    }
    else if (uAgent.indexOf("Safari") > -1) {
        browser = "Safari";
    }
    myGameInstance.SendMessage("JSManager", "ErrorB", browser.toString());
}

function checkNetworking() {
    if (!navigator.onLine) {
        myGameInstance.SendMessage("JSManager", "ErrorN", "");
    }
}

function newBuild(data) {
    jsonData = data;

    myGameInstance.Quit().then(function () {
        myGameInstance = null;
        var config = createNewConfig("Build2");
        createNewUnityInstance();
    });
}


function createNewUnityInstance() {
    createUnityInstance(canvas, config).then((unityInstance) => {
        myGameInstance = unityInstance;
    });
}

function createNewConfig(NewbuildUrl) {
    return config = {
        dataUrl: NewbuildUrl + "/betterspace-build.data",
        frameworkUrl: NewbuildUrl + "/betterspace-build.framework.js",
        codeUrl: NewbuildUrl + "/betterspace-build.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "VoxelGenerator",
        productVersion: "1.17",
    };
}







function getData() {
    console.log("111111");
    console.log(jsonData);
    myGameInstance.SendMessage("JSManager", "GetDataResponse", jsonData);
}

function onTelegramIconClick(URL) {
      window.open(URL, '_blank');
      
      if(myGameInstance != null)
        myGameInstance.SendMessage("JSManager", "OnTelegramIconClick");
      else
        console.log("myGameInstance is null");
}

function onGameInstanceLoaded() {
      myGameInstance.SendMessage("JSManager", "OnGameInstanceLoaded");
}

