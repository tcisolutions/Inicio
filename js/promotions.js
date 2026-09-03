
const promos=[
 {title:"Cambio de Cristal iPhone 16 Pro Max",price:"Desde $1,999 MXN"},
 {title:"Cambio de batería Samsung",price:"Desde $699 MXN"},
 {title:"Pantallas OLED iPhone",price:"Promoción vigente"}
];
const c=document.getElementById('promoContainer');
if(c){
 c.innerHTML=promos.map(p=>`<div class="promo"><h3>${p.title}</h3><p>${p.price}</p></div>`).join('');
}
