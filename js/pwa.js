
let deferredPrompt;
window.addEventListener('beforeinstallprompt',(e)=>{
 e.preventDefault();
 deferredPrompt=e;
 const b=document.getElementById('installApp');
 if(b) b.style.display='inline-block';
});
function installApp(){
 if(!deferredPrompt)return;
 deferredPrompt.prompt();
}
if('serviceWorker' in navigator){
 navigator.serviceWorker.register('sw.js');
}
