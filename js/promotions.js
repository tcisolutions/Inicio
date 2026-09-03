const promoGrid=document.getElementById("promoGrid");

let direction=1;

setInterval(()=>{

if(window.innerWidth>768) return;

if(!promoGrid) return;

promoGrid.scrollBy({
left:320*direction,
behavior:"smooth"
});

if(
promoGrid.scrollLeft+promoGrid.clientWidth>=promoGrid.scrollWidth-5
){
direction=-1;
}

if(promoGrid.scrollLeft<=0){
direction=1;
}

},3000);