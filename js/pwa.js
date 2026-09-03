
let promptEvent;
window.addEventListener('beforeinstallprompt',e=>{
 e.preventDefault();
 promptEvent=e;
 const b=document.getElementById('installApp');
 if(b) b.style.display='inline-flex';
});
window.installApp=async()=>{
 if(!promptEvent) return;
 promptEvent.prompt();
 await promptEvent.userChoice;
 promptEvent=null;
}
if('serviceWorker' in navigator){
 navigator.serviceWorker.register('sw.js');
}
