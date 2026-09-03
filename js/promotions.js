
const promos=[
 {t:'Cristal iPhone 16 Pro Max',p:'$1,999 MXN'},
 {t:'Pantallas OLED iPhone',p:'Desde $1,299 MXN'},
 {t:'Baterías Samsung',p:'Desde $699 MXN'},
 {t:'Centro de Carga Tipo C',p:'Desde $550 MXN'},
 {t:'Limpieza por Humedad',p:'$450 MXN'},
 {t:'Cámaras iPhone',p:'Cotiza por WhatsApp'}
];
const grid=document.getElementById('promoGrid');
if(grid){
 grid.innerHTML=promos.map(x=>`
 <div class="promo-card">
   <h3>${x.t}</h3>
   <p>${x.p}</p>
   <button class="btn primary" onclick="window.open('https://wa.me/524431922958')">WhatsApp</button>
 </div>`).join('');
}
