

var jsonData = "";

function getBrowserName() {
	var browserName = (function (agent) {        
		switch (true) {
            case agent.indexOf("edge") > -1: return "MS Edge";
            case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
            case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "Google Chrome";
            case agent.indexOf("trident") > -1: return "MS IE";
            case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
            case agent.indexOf("safari") > -1: return "Safari";
            default: return "other";
        }
    })(window.navigator.userAgent.toLowerCase());
	
	return browserName;
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


var progressBarIntervalId = null;
var checkFullProgressBar = false;
var lastProgressBarValue = 0;

function moveProgressBar(width, step, goal) {
	if (checkFullProgressBar == false) {
		progressBarIntervalId = setInterval(frame, 1);
		function frame() {
		  if (width >= goal) {
			if (goal >= 100) 
				checkFullProgressBar = true;
			
			stopProgressBar();
		  } else {
			width = width + step;
			progressBarFull.style.width = width + "%";
		  }
		}
	}
}

function stopProgressBar() {
	if (progressBarIntervalId != null) {
		clearInterval(progressBarIntervalId);
		progressBarIntervalId = null;
	}
}

function loadBuild(loaderUrl, configName) {

    if (((window.innerWidth * 0.8) * (720 / 1280)) > (window.innerHeight * 0.8)) {
      canvas.style.height = (window.innerHeight * 0.6) + "px";
      canvas.style.width = ((window.innerHeight * 0.6) * (1280 / 720)) + "px";
    } else {
      canvas.style.height = ((window.innerWidth * 0.8) * (720 / 1280)) + "px";
      canvas.style.width = (window.innerWidth * 0.8) + "px";
    }
	
	loadingBar.style.display = "block";
	
    var script = document.createElement("script");
    script.src = loaderUrl;
    var myGameInstance = null;

    script.onload = () => {
      var config = createNewConfig(configName);
      createNewUnityInstance();
    };
    document.body.appendChild(script);
}

function createNewUnityInstance() {
	var progressIntermediateGoal = 70;
    createUnityInstance(canvas, config, (progress) => {
		if (progressBarIntervalId == null && checkFullProgressBar == false) {
			if (progress > 0.80) {
				//var progressIntermediateGoal = 100 * progress;
				if (lastProgressBarValue == 0){
					moveProgressBar(0, 0.065, progressIntermediateGoal);
				} else {
					moveProgressBar(progressIntermediateGoal, 0.01, 100);
				}
			} else {
				progressBarFull.style.width = 100 * progress + "%";
				progressIntermediateGoal = 100 * progress;
			}
		}
		
		lastProgressBarValue = progress;
      }).then((unityInstance) => {
        myGameInstance = unityInstance;
		stopProgressBar();
		progressBarFull.style.width = 100 + "%";
		loadingBar.style.display = "none";
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
