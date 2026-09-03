
let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredPrompt=e;

  const btn=document.getElementById("installApp");
  if(btn) btn.style.display="inline-flex";
});

function installApp(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
}
