/* ==========================================================
   TECHNICAL CENTER PAY 2026
   PROMOTIONS.JS
   Panel Administrador de Promociones
========================================================== */

const ADMIN_PASSWORD = "TC2026*";
const STORAGE_KEY = "tc_promotions_v2";

const promoContainer = document.getElementById("promoContainer");
const adminPanel = document.getElementById("adminPanel");
const adminList = document.getElementById("promoListAdmin");

const btnPublish = document.getElementById("publishPromo");
const btnPrev = document.getElementById("prevPromo");
const btnNext = document.getElementById("nextPromo");

// ======================
// PROMOCIONES INICIALES
// ======================

const defaultPromotions = [
  {
    id: 1,
    title: "Cambio de Cristal iPhone 16 Pro Max",
    description: "Cristal Premium + Garantía de instalación.",
    price: "Desde $1,999 MXN",
    image: "assets/promos/promo1.webp",
    active: true
  },
  {
    id: 2,
    title: "Cambio de batería Samsung",
    description: "Baterías de alta calidad y garantía.",
    price: "Desde $699 MXN",
    image: "assets/promos/promo2.webp",
    active: true
  },
  {
    id: 3,
    title: "Nintendo Switch HDMI",
    description: "Reemplazo de HDMI y reparación de puerto.",
    price: "Diagnóstico GRATIS",
    image: "assets/promos/promo3.webp",
    active: true
  }
];

// ======================
// BASE LOCAL
// ======================

function getPromotions(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(data) return JSON.parse(data);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultPromotions)
    );

    return defaultPromotions;

}

function savePromotions(list){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(list)
    );

}

// ======================
// RENDER PROMOCIONES
// ======================

function renderPromotions(){

    promoContainer.innerHTML = "";

    const promotions = getPromotions();

    promotions
        .filter(p => p.active)
        .forEach((promo,index)=>{

        promoContainer.innerHTML += `

        <article class="promo-card glass fade-up">

            <img src="${promo.image}" alt="${promo.title}">

            <div class="promo-info">

                <span>PROMOCIÓN</span>

                <h3>${promo.title}</h3>

                <p>${promo.description}</p>

                <div class="price">${promo.price}</div>

                <button
                    class="promo-button"
                    onclick="sendPromoWhatsapp(${index})"
                >
                    Solicitar Promoción
                </button>

            </div>

        </article>

        `;

    });

}

renderPromotions();

// ======================
// WHATSAPP PROMO
// ======================

window.sendPromoWhatsapp = function(index){

    const promo = getPromotions()
        .filter(p=>p.active)[index];

    const message = `Hola Technical Center 👋

Estoy interesado en esta promoción:

📱 ${promo.title}

💲 ${promo.price}

Quisiera más información.`;

    window.open(
      `https://wa.me/524431922958?text=${encodeURIComponent(message)}`,
      "_blank"
    );

};

// ======================
// CARRUSEL
// ======================

btnNext.addEventListener("click",()=>{

    promoContainer.scrollBy({
        left:340,
        behavior:"smooth"
    });

});

btnPrev.addEventListener("click",()=>{

    promoContainer.scrollBy({
        left:-340,
        behavior:"smooth"
    });

});

// Auto Scroll

setInterval(()=>{

    promoContainer.scrollBy({
        left:340,
        behavior:"smooth"
    });

},7000);

// ======================
// ADMINISTRADOR
// ======================

window.openAdmin = function(){

    const password = prompt(
        "Contraseña del Administrador"
    );

    if(password !== ADMIN_PASSWORD){

        showToast("Contraseña incorrecta");

        return;

    }

    adminPanel.classList.remove("hidden");

    adminPanel.scrollIntoView({
        behavior:"smooth"
    });

    loadAdminList();

};

// ======================
// PUBLICAR PROMOCIÓN
// ======================

btnPublish.addEventListener("click",()=>{

    const title =
        document.getElementById("promoTitle").value.trim();

    const price =
        document.getElementById("promoPrice").value.trim();

    const description =
        document.getElementById("promoDescription").value.trim();

    const imageInput =
        document.getElementById("promoImage");

    const active =
        document.getElementById("promoActive").checked;

    if(
        !title ||
        !price ||
        !description ||
        imageInput.files.length===0
    ){

        showToast("Completa todos los campos.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function(e){

        const promotions = getPromotions();

        promotions.unshift({

            id:Date.now(),

            title,

            price,

            description,

            image:e.target.result,

            active

        });

        savePromotions(promotions);

        renderPromotions();

        loadAdminList();

        clearForm();

        showToast("Promoción publicada.");

    }

    reader.readAsDataURL(imageInput.files[0]);

});

// ======================
// LIMPIAR FORMULARIO
// ======================

function clearForm(){

    promoTitle.value="";
    promoPrice.value="";
    promoDescription.value="";
    promoImage.value="";
    promoActive.checked=true;

}

// ======================
// LISTA ADMIN
// ======================

function loadAdminList(){

    adminList.innerHTML="";

    const promotions = getPromotions();

    promotions.forEach(promo=>{

        adminList.innerHTML += `

        <div class="admin-promo glass">

            <img src="${promo.image}">

            <div class="admin-info">

                <strong>${promo.title}</strong>

                <small>${promo.price}</small>

            </div>

            <button
                class="toggle-btn"
                onclick="togglePromotion(${promo.id})"
            >
                ${promo.active ? "Ocultar":"Mostrar"}
            </button>

            <button
                class="delete-btn"
                onclick="deletePromotion(${promo.id})"
            >
                Eliminar
            </button>

        </div>

        `;

    });

}

// ======================
// ACTIVAR / DESACTIVAR
// ======================

window.togglePromotion = function(id){

    const promotions = getPromotions();

    const promo = promotions.find(p=>p.id===id);

    promo.active = !promo.active;

    savePromotions(promotions);

    renderPromotions();

    loadAdminList();

    showToast("Promoción actualizada.");

}

// ======================
// ELIMINAR
// ======================

window.deletePromotion = function(id){

    const answer = confirm(
        "¿Eliminar esta promoción?"
    );

    if(!answer) return;

    const promotions = getPromotions()
        .filter(p=>p.id!==id);

    savePromotions(promotions);

    renderPromotions();

    loadAdminList();

    showToast("Promoción eliminada.");

}

// ======================
// EXPORTAR RESPALDO JSON
// ======================

window.exportPromotions = function(){

    const data = JSON.stringify(
        getPromotions(),
        null,
        2
    );

    const blob = new Blob([data],{
        type:"application/json"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "promociones_tc.json";

    link.click();

}

// ======================
// IMPORTAR RESPALDO JSON
// ======================

window.importPromotions = function(file){

    const reader = new FileReader();

    reader.onload = function(e){

        const promotions = JSON.parse(e.target.result);

        savePromotions(promotions);

        renderPromotions();

        loadAdminList();

        showToast("Promociones restauradas.");

    }

    reader.readAsText(file);

}