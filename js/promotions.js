/* ==========================================================
   TECHNICAL CENTER PAY 2026
   promotions.js (Versión Cloudflare Worker)
========================================================== */

// URL de tu Cloudflare Worker
const WORKER_URL = "https://technicalcenter-admin.tcmcorreo.workers.dev/";

// Contraseña del panel
const ADMIN_PASSWORD = "TC2026*";

// Archivo JSON publicado en GitHub Pages
const DATA_URL = "data/promociones.json?v=" + Date.now();

let promotions = [];

// Elementos
const promoContainer = document.getElementById("promoContainer");
const adminPanel = document.getElementById("adminPanel");
const adminList = document.getElementById("promoListAdmin");

const promoTitle = document.getElementById("promoTitle");
const promoPrice = document.getElementById("promoPrice");
const promoDescription = document.getElementById("promoDescription");
const promoImage = document.getElementById("promoImage");
const promoActive = document.getElementById("promoActive");

const publishButton = document.getElementById("publishPromo");

/* ==========================================
   CARGAR PROMOCIONES DESDE GITHUB PAGES
========================================== */

async function loadPromotions(){

    try{

        const response = await fetch(DATA_URL);

        promotions = await response.json();

        renderPromotions();

    }catch(error){

        console.error("No se pudieron cargar promociones", error);

        promotions = [];

    }

}

loadPromotions();

/* ==========================================
   RENDER CLIENTES
========================================== */

function renderPromotions(){

    if(!promoContainer) return;

    promoContainer.innerHTML = "";

    promotions
    .filter(item => item.active)
    .forEach((promo,index)=>{

        promoContainer.innerHTML += `

        <article class="promo-card glass fade-up">

            <img src="${promo.image}" alt="${promo.title}">

            <div class="promo-info">

                <span>PROMOCIÓN</span>

                <h3>${promo.title}</h3>

                <p>${promo.description}</p>

                <div class="price">${promo.price}</div>

                <button class="promo-button"
                    onclick="promoWhatsapp(${index})">

                    Solicitar promoción

                </button>

            </div>

        </article>

        `;

    });

}

/* ==========================================
   WHATSAPP PROMOCIÓN
========================================== */

window.promoWhatsapp = function(index){

    const promo = promotions.filter(p=>p.active)[index];

    const text = `Hola Technical Center 👋

Estoy interesado en la promoción:

📱 ${promo.title}

💲 ${promo.price}

¿Me puedes dar más información?`;

    window.open(
        "https://wa.me/524431922958?text=" +
        encodeURIComponent(text),
        "_blank"
    );

}

/* ==========================================
   LOGIN ADMIN
========================================== */

window.openAdmin = function(){

    const password = prompt("Contraseña del administrador");

    if(password !== ADMIN_PASSWORD){

        alert("Contraseña incorrecta.");

        return;

    }

    adminPanel.classList.remove("hidden");

    loadAdminList();

    adminPanel.scrollIntoView({
        behavior:"smooth"
    });

}

/* ==========================================
   LISTA ADMINISTRADOR
========================================== */

function loadAdminList(){

    if(!adminList) return;

    adminList.innerHTML = "";

    promotions.forEach((promo)=>{

        adminList.innerHTML += `

        <div class="admin-promo glass">

            <img src="${promo.image}" class="admin-thumb">

            <div class="admin-info">

                <strong>${promo.title}</strong>

                <small>${promo.price}</small>

            </div>

            <button class="toggle-btn"
                onclick="togglePromo(${promo.id})">

                ${promo.active ? "Ocultar":"Mostrar"}

            </button>

            <button class="delete-btn"
                onclick="deletePromo(${promo.id})">

                Eliminar

            </button>

        </div>

        `;

    });

}

/* ==========================================
   PUBLICAR PROMOCIÓN
========================================== */

if(publishButton){

publishButton.onclick = ()=>{

    if(
        !promoTitle.value ||
        !promoPrice.value ||
        !promoDescription.value
    ){

        alert("Completa todos los campos.");

        return;

    }

    if(!promoImage.files.length){

        alert("Selecciona una imagen.");

        return;

    }

    const reader = new FileReader();

    reader.onload = async function(e){

        promotions.unshift({

            id:Date.now(),

            title:promoTitle.value,

            description:promoDescription.value,

            price:promoPrice.value,

            image:e.target.result,

            active:promoActive.checked,

            date:new Date().toISOString()

        });

        renderPromotions();

        loadAdminList();

        clearForm();

        await savePromotions();

    }

    reader.readAsDataURL(promoImage.files[0]);

}

}

/* ==========================================
   GUARDAR EN CLOUDFLARE WORKER
========================================== */

async function savePromotions(){

    try{

        const response = await fetch(WORKER_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(promotions)

        });

        const result = await response.json();

        if(result.success){

            toast("✅ Promoción publicada correctamente.");

        }else{

            toast("❌ Error al publicar.");

            console.error(result.error);

        }

    }catch(error){

        console.error(error);

        toast("❌ No se pudo conectar con Cloudflare.");

    }

}

/* ==========================================
   ACTIVAR / DESACTIVAR
========================================== */

window.togglePromo = async function(id){

    promotions = promotions.map(item=>{

        if(item.id===id){

            item.active = !item.active;

        }

        return item;

    });

    renderPromotions();

    loadAdminList();

    await savePromotions();

}

/* ==========================================
   ELIMINAR
========================================== */

window.deletePromo = async function(id){

    if(!confirm("¿Eliminar promoción?")) return;

    promotions = promotions.filter(item=>item.id!==id);

    renderPromotions();

    loadAdminList();

    await savePromotions();

}

/* ==========================================
   LIMPIAR FORMULARIO
========================================== */

function clearForm(){

    promoTitle.value = "";
    promoPrice.value = "";
    promoDescription.value = "";
    promoImage.value = "";
    promoActive.checked = true;

}

/* ==========================================
   TOAST
========================================== */

function toast(message){

    const toastBox = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    if(!toastBox || !toastMessage){

        alert(message);

        return;

    }

    toastMessage.textContent = message;

    toastBox.classList.add("show");

    setTimeout(()=>{
        toastBox.classList.remove("show");
    },2500);

}

/* ==========================================
   RESPALDO JSON
========================================== */

window.exportPromotions = function(){

    const blob = new Blob(
        [JSON.stringify(promotions,null,2)],
        {type:"application/json"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "promociones_technical_center.json";

    link.click();

}

window.importPromotions = function(file){

    const reader = new FileReader();

    reader.onload = async function(e){

        promotions = JSON.parse(e.target.result);

        renderPromotions();

        loadAdminList();

        await savePromotions();

    }

    reader.readAsText(file);

};