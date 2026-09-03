
const promos=[
 {title:"Cambio de Cristal iPhone 16 Pro Max",price:"$1,999 MXN"},
 {title:"Cambio de batería Samsung",price:"Desde $699 MXN"},
 {title:"Pantallas OLED iPhone",price:"Promoción Septiembre"}
];
const box=document.getElementById('promoContainer');
if(box){
 box.innerHTML=promos.map(p=>`
  <div class="promo">
    <h3>${p.title}</h3>
    <p>${p.price}</p>
    <button onclick="window.open('https://wa.me/524431922958','_blank')">Solicitar promoción</button>
  </div>`).join('');
}
