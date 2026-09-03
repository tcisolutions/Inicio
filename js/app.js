
function showToast(msg){
 const t=document.createElement('div');
 t.className='toast';
 t.textContent=msg;
 document.body.appendChild(t);
 setTimeout(()=>t.classList.add('show'),50);
 setTimeout(()=>{t.classList.remove('show');t.remove();},2500);
}
window.addEventListener('scroll',()=>{
 const nav=document.querySelector('.navbar');
 nav.style.background=window.scrollY>40?'rgba(2,6,23,.9)':'rgba(2,6,23,.65)';
});
