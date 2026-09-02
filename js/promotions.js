/* ==========================================================
   TECHNICAL CENTER PAY V10 PRO
   Panel de Promociones
========================================================== */

const ADMIN_PASSWORD = "TC2026*";
const STORAGE_KEY = "tc_promotions_v10";

const promoContainer = document.getElementById("promoContainer");
const prevPromo = document.getElementById("prevPromo");
const nextPromo = document.getElementById("nextPromo");

/* =======================
   PROMOCIONES POR DEFECTO
======================= */

const defaultPromotions = [
  {
    id:1,
    title:"Cambio de Cristal iPhone 16 Pro Max",
    description:"Instalación profesional y garantía incluida.",
    price:"Desde $1,999 MXN",
    image:"assets/promos/promo1.webp",
    active:true
  },
  {
    id:2,
    title:"Cambio de batería Samsung",
    description:"Baterías originales y compatibles premium.",
    price:"Desde $699 MXN",
    image:"assets/promos/promo2.webp",
    active:true
  },
  {
    id:3,
    title:"Reparación Nintendo Switch",
    description:"Centro de carga, HDMI y microsoldadura.",
    price:"Diagnóstico GRATIS",
    image:"assets/promos/promo3.webp",
    active:true
  }
];

/* =======================
      BASE LOCAL
======================= */

function getPromotions(){

  const saved = localStorage.getItem(STORAGE_KEY);

  if(saved) return JSON.parse(saved);

  localStorage.setItem(STORAGE_KEY,JSON.stringify(defaultPromotions));

  return defaultPromotions;

}

function savePromotions(promos){

  localStorage.setItem(STORAGE_KEY,JSON.stringify(promos));

}

/* =======================
      RENDER
======================= */

let currentPromo = 0;

function renderPromotions(){

  const promotions = getPromotions().filter(p=>p.active);

  promoContainer.innerHTML = "";

  promotions.forEach((promo,index)=>{

    promoContainer.innerHTML +=
    `
      <article class="promo-card glass">

          <img src="${promo.image}" alt="${promo.title}">

          <div class="promo-info">

              <span>PROMOCIÓN</span>

              <h3>${promo.title}</h3>

              <p>${promo.description}</p>

              <div class="price">${promo.price}</div>

              <button
                class="promo-button"
                onclick="promoWhatsapp(${index})"
              >
                  Solicitar Promoción
              </button>

          </div>

      </article>
    `;

  });

}

renderPromotions();

/* =======================
   WHATSAPP PROMOCIÓN
======================= */

window.promoWhatsapp = function(index){

  const promo = getPromotions().filter(p=>p.active)[index];

  const message =
`Hola Technical Center 👋

Estoy interesado en la promoción:

📱 ${promo.title}

💲 ${promo.price}

Quiero más información.`;

  window.open(
    `https://wa.me/524431922958?text=${encodeURIComponent(message)}`,
    "_blank"
  );

}

/* =======================
   CARRUSEL
======================= */

nextPromo.addEventListener("click",()=>{

  promoContainer.scrollBy({
    left:340,
    behavior:"smooth"
  });

});

prevPromo.addEventListener("click",()=>{

  promoContainer.scrollBy({
    left:-340,
    behavior:"smooth"
  });

});

/* Cambio automático cada 6 segundos */

setInterval(()=>{

  promoContainer.scrollBy({
    left:340,
    behavior:"smooth"
  });

},6000);

/* =======================
   PANEL ADMINISTRADOR
======================= */

const isAdmin = location.hash === "#admin";

if(isAdmin){

  const password = prompt("Contraseña del Administrador");

  if(password !== ADMIN_PASSWORD){

    alert("Acceso denegado.");

  }else{

    createAdminPanel();

  }

}

/* =======================
   CREAR PANEL
======================= */

function createAdminPanel(){

  const section = document.createElement("section");

  section.className="admin-panel glass";

  section.innerHTML=
  `
  <div class="admin-title">

      <h2>Panel de Promociones</h2>

      <p>Publica promociones sin editar código.</p>

  </div>

  <div class="admin-grid">

      <input id="promoTitle" placeholder="Título de la promoción">

      <input id="promoPrice" placeholder="Precio">

      <textarea
          id="promoDescription"
          placeholder="Descripción..."
      ></textarea>

      <input
          id="promoImage"
          type="file"
          accept="image/*"
      >

      <button id="publishPromo">
          Publicar Promoción
      </button>

  </div>

  <div id="promoListAdmin"></div>
  `;

  document.body.appendChild(section);

  loadAdminPromotions();

  document
    .getElementById("publishPromo")
    .onclick = publishPromotion;

}

/* =======================
     PUBLICAR
======================= */

function publishPromotion(){

  const title = promoTitle.value.trim();
  const price = promoPrice.value.trim();
  const description = promoDescription.value.trim();
  const image = promoImage.files[0];

  if(!title || !price || !description || !image){

      showToast("Completa todos los campos","#DC2626");
      return;

  }

  const reader = new FileReader();

  reader.onload = event=>{

      const promotions = getPromotions();

      promotions.unshift({

          id:Date.now(),

          title,

          price,

          description,

          image:event.target.result,

          active:true

      });

      savePromotions(promotions);

      renderPromotions();

      loadAdminPromotions();

      promoTitle.value="";
      promoPrice.value="";
      promoDescription.value="";
      promoImage.value="";

      showToast("Promoción publicada","#16A34A");

  };

  reader.readAsDataURL(image);

}

/* =======================
   LISTA ADMIN
======================= */

function loadAdminPromotions(){

  const promotions = getPromotions();

  promoListAdmin.innerHTML="";

  promotions.forEach(promo=>{

      promoListAdmin.innerHTML +=
      `
      <div class="admin-promo">

          <img src="${promo.image}">

          <div>

              <strong>${promo.title}</strong>

              <p>${promo.price}</p>

          </div>

          <button onclick="togglePromo(${promo.id})">

              ${promo.active ? "Ocultar":"Mostrar"}

          </button>

          <button onclick="deletePromo(${promo.id})">

              Eliminar

          </button>

      </div>
      `;

  });

}

/* =======================
     OCULTAR
======================= */

window.togglePromo = function(id){

  const promotions = getPromotions();

  const promo = promotions.find(p=>p.id===id);

  promo.active = !promo.active;

  savePromotions(promotions);

  renderPromotions();

  loadAdminPromotions();

}

/* =======================
      ELIMINAR
======================= */

window.deletePromo = function(id){

  const answer = confirm("¿Eliminar promoción?");

  if(!answer) return;

  const promotions = getPromotions().filter(p=>p.id!==id);

  savePromotions(promotions);

  renderPromotions();

  loadAdminPromotions();

  showToast("Promoción eliminada","#DC2626");

}