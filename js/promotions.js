
const promociones=[
{titulo:"Cambio de Cristal iPhone 16 Pro Max",precio:"Desde $1,999 MXN"},
{titulo:"Cambio de Batería Samsung Serie A",precio:"Desde $699 MXN"},
{titulo:"Pantallas OLED iPhone",precio:"Desde $1,299 MXN"},
{titulo:"Limpieza por Humedad",precio:"$450 MXN"},
{titulo:"Centro de Carga Tipo C",precio:"Desde $550 MXN"},
{titulo:"Cámaras iPhone",precio:"Cotiza por WhatsApp"}
];

const grid=document.getElementById("promoGrid");
if(grid){
 grid.innerHTML=promociones.map(p=>`
 <div class="promo">
   <h3>${p.titulo}</h3>
   <p>${p.precio}</p>
   <button onclick="window.open('https://wa.me/524431922958','_blank')">
     Solicitar promoción
   </button>
 </div>`).join("");
}
