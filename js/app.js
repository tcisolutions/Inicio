
window.addEventListener('scroll',()=>{
 const nav=document.querySelector('.navbar');
 if(window.scrollY>40){nav.style.background='rgba(2,6,23,.85)';}
 else{nav.style.background='rgba(2,6,23,.55)';}
});
