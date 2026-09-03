/* ==========================================
   TECHNICAL CENTER PAY PRO V7
   promotions.js (CORREGIDO DEFINITIVO)
========================================== */

const defaultPromos = [
  {
    titulo: "Cristal iPhone 16 Pro Max",
    descripcion: "Cristal OCA Premium con garantía.",
    precioAnterior: 2699,
    precio: 1999,
    descuento: 25,
    categoria: "iPhone",
    imagen: "https://placehold.co/600x400/081120/38BDF8?text=iPhone+16"
  },
  {
    titulo: "Pantallas OLED iPhone",
    descripcion: "Pantallas OLED y originales instaladas en 40 minutos.",
    precioAnterior: 1799,
    precio: 1399,
    descuento: 20,
    categoria: "iPhone",
    imagen: "https://placehold.co/600x400/081120/38BDF8?text=Pantallas+OLED"
  },
  {
    titulo: "Baterías Samsung",
    descripcion: "20% de descuento durante este mes.",
    precioAnterior: 899,
    precio: 699,
    descuento: 22,
    categoria: "Samsung",
    imagen: "https://placehold.co/600x400/081120/38BDF8?text=Baterias+Samsung"
  },
  {
    titulo: "Centro de carga USB-C",
    descripcion: "Cambio de centro de carga Samsung, Xiaomi y Motorola.",
    precioAnterior: 750,
    precio: 550,
    descuento: 27,
    categoria: "Android",
    imagen: "https://placehold.co/600x400/081120/38BDF8?text=Centro+de+Carga"
  }
];

let promotions = [...defaultPromos];
let promoGrid;

function renderPromotions(list) {
  if (!promoGrid) {
    console.error("❌ promoGrid no encontrado");
    return;
  }

  promoGrid.innerHTML = "";

  list.forEach((p) => {
    promoGrid.innerHTML += `
      <article class="promo-card fade-up visible">
        <div class="promo-image">
          <img src="${p.imagen}" alt="${p.titulo}">
          <span class="promo-discount">-${p.descuento}%</span>
        </div>

        <div class="promo-body">
          <span class="promo-category">${p.categoria}</span>
          <h3>${p.titulo}</h3>
          <p>${p.descripcion}</p>

          <div class="prices">
            <span class="old-price">$${p.precioAnterior.toLocaleString()}</span>
            <span class="new-price">$${p.precio.toLocaleString()}</span>
          </div>

          <button class="btn primary"
onclick="sendPromo('${p.titulo}','${p.precio}')">

<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
<path d="M20.5 3.5A11 11 0 0 0 3.8 17.2L2 22l4.9-1.7A11 11 0 1 0 20.5 3.5ZM12 20a8.7 8.7 0 0 1-4.4-1.2l-.3-.2-2.9 1 1-2.8-.2-.3A8.8 8.8 0 1 1 12 20Zm4.8-6.6c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-3.9-3.6-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2.1-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.5c.1.2 1.8 2.8 4.5 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3Z"/>
</svg>

Solicitar por WhatsApp

</button>
        </div>
      </article>`;
  });

  console.log(`✅ ${list.length} promociones renderizadas`);
}

window.filterPromotions = function (categoria) {
  document.querySelectorAll(".promo-filters button").forEach((b) => b.classList.remove("active"));

  const activo = [...document.querySelectorAll(".promo-filters button")]
    .find((b) => b.textContent.trim() === categoria);

  if (activo) activo.classList.add("active");

  if (categoria === "Todos") {
    renderPromotions(promotions);
    return;
  }

  renderPromotions(promotions.filter((p) => p.categoria === categoria));
};

window.sendPromo=function(nombre,precio){

    const telefono = CONFIG.whatsapp || "4431922958";

    const mensaje=encodeURIComponent(
`Hola Technical Center 👋

Me interesa la promoción:

📱 ${nombre}
💰 $${precio} MXN.`);

    window.open(
        `https://wa.me/52${telefono}?text=${mensaje}`,
        "_blank"
    );
}

// Esperar a que exista el HTML
window.addEventListener("DOMContentLoaded", () => {
  promoGrid = document.getElementById("promoGrid");

  console.log("promoGrid:", promoGrid);

  renderPromotions(promotions);
});

// Carrusel automático solo en celular
window.addEventListener("load", ()=>{

    const grid = document.querySelector(".promo-grid");

    if(!grid) return;

    if(window.innerWidth > 768) return;

    let step = 0;

    setInterval(()=>{

        const card = grid.querySelector(".promo-card");

        if(!card) return;

        step += card.offsetWidth + 18;

        if(step >= grid.scrollWidth-grid.clientWidth){
            step = 0;
        }

        grid.scrollTo({
            left:step,
            behavior:"smooth"
        });

    },3500);

});