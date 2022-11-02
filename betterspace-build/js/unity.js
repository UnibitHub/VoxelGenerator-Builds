

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
    if (jsonData == "") {
        jsonData = data;
        myGameInstance.SendMessage("JSManager", "LoadMPScenne", "");
    } else {
        myGameInstance.Quit().then(function () {
            var loaderUrl = "Build2/betterspace-build.loader.js";
            var script = document.createElement("script");
            script.src = loaderUrl;
            var myGameInstance = null;

            script.onload = () => {
                var config = createNewConfig("Build2");
                createNewUnityInstance();
            };
            document.body.appendChild(script);
        });
    }
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
    console.log(jsonData);
    myGameInstance.SendMessage("JSManager", "GetDataResponse", jsonData);
}

function onTelegramIconClick(URL) {
    window.open(URL, '_blank');

    if (myGameInstance != null)
        myGameInstance.SendMessage("JSManager", "OnTelegramIconClick");
    else
        console.log("myGameInstance is null");
}

function getSystemInfo() {
	var gl;
	var renderer;
	var canvas = document.querySelector("#unity-canvas");
	
	try {
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2');
		
		if (gl) {
			var unmaskedInfo = getUnmaskedInfo(gl);
			renderer = unmaskedInfo.renderer;
		}
		
	} catch (e) 
	{
			console.log(e);
	}
	
	var systemInfo = 
	{
		"minRam": navigator.deviceMemory,
		"hardwareConcurrency": navigator.hardwareConcurrency,
		"renderer": renderer
	}
	
	myGameInstance.SendMessage("JSManager", "SetSystemInfo", JSON.stringify(systemInfo));
}

function getUnmaskedInfo(gl) {
      var unMaskedInfo = {
        renderer: '',
        vendor: ''
      };

      var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbgRenderInfo != null) {
        unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
        unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
      }

      return unMaskedInfo;
    }
