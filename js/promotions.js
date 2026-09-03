
const promociones=[
  {titulo:"Cristal iPhone 16 Pro Max",precio:"$1,999 MXN",imagen:"assets/promos/iphone16.webp"},
  {titulo:"Pantallas OLED iPhone",precio:"Desde $1,299 MXN",imagen:"assets/promos/oled.webp"},
  {titulo:"Baterías Samsung",precio:"Desde $699 MXN",imagen:"assets/promos/samsung.webp"},
  {titulo:"Centro de carga Tipo C",precio:"Desde $550 MXN",imagen:"assets/promos/tipoc.webp"},
  {titulo:"Limpieza por humedad",precio:"$450 MXN",imagen:"assets/promos/humedad.webp"},
  {titulo:"Cámaras iPhone",precio:"Cotiza por WhatsApp",imagen:"assets/promos/camara.webp"}
];

function cargarPromociones(){
  const grid=document.getElementById("promoGrid");
  if(!grid) return;

  grid.innerHTML=promociones.map(p=>`
    <article class="promo-card">
      <img src="${p.imagen}" alt="${p.titulo}">
      <div class="promo-body">
        <h3>${p.titulo}</h3>
        <div class="price">${p.precio}</div>
        <button class="btn btn-primary"
          onclick="window.open('https://wa.me/524431922958')">
          Solicitar
        </button>
      </div>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", cargarPromociones);
