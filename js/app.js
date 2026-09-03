
function copyText(text){
 navigator.clipboard.writeText(text);
 alert("Copiado: "+text);
}
window.addEventListener("scroll",()=>{
 const nav=document.querySelector(".navbar");
 nav.style.background=window.scrollY>40?"rgba(2,6,23,.9)":"rgba(2,6,23,.55)";
});
