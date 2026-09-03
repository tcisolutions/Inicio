let deferredPrompt;

const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt",(e)=>{

  e.preventDefault();

  deferredPrompt = e;

  if(installButton){
    installButton.classList.remove("hidden");
  }

});

if(installButton){

  installButton.addEventListener("click",async()=>{

    installButton.classList.add("hidden");

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

  });

}

if("serviceWorker" in navigator){

  navigator.serviceWorker.register("./sw.js");

}