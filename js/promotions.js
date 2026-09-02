/* ==========================================================
   TECHNICAL CENTER PAY 2026
   PROMOTIONS.JS
   Panel Administrador + GitHub Pages
========================================================== */

/* ==========================
   CONFIGURACIÓN GITHUB
========================== */

const GITHUB = {
    owner: "tcisolutions",
    repo: "pagos",
    branch: "main",
    file: "data/promociones.json",

    // 👇 AQUÍ PEGAS TU TOKEN DE GITHUB
    token: "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"
};

/* ==========================
   CONFIGURACIÓN
========================== */

const ADMIN_PASSWORD = "TC2026*";

const PROMO_URL =
    "data/promociones.json?v=" + Date.now();

const promoContainer =
    document.getElementById("promoContainer");

const adminPanel =
    document.getElementById("adminPanel");

const adminList =
    document.getElementById("promoListAdmin");

const publishPromo =
    document.getElementById("publishPromo");

const promoTitle =
    document.getElementById("promoTitle");

const promoPrice =
    document.getElementById("promoPrice");

const promoDescription =
    document.getElementById("promoDescription");

const promoImage =
    document.getElementById("promoImage");

const promoActive =
    document.getElementById("promoActive");

let promotions = [];

/* ==========================
   CARGAR PROMOCIONES
========================== */

async function loadPromotions(){

    try{

        const response = await fetch(PROMO_URL);

        promotions = await response.json();

        renderPromotions();

    }catch(error){

        console.error(error);

    }

}

loadPromotions();

/* ==========================
   RENDER PROMOCIONES
========================== */

function renderPromotions(){

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

/* ==========================
   WHATSAPP
========================== */

window.promoWhatsapp = function(index){

    const promo =
        promotions.filter(p=>p.active)[index];

    const text = `Hola Technical Center 👋

Estoy interesado en esta promoción.

📱 ${promo.title}

💲 ${promo.price}

Quisiera más información.`;

    window.open(
        "https://wa.me/524431922958?text="+
        encodeURIComponent(text),
        "_blank"
    );

}

/* ==========================
   ABRIR PANEL ADMIN
========================== */

window.openAdmin = function(){

    const password =
        prompt("Contraseña del Administrador");

    if(password!==ADMIN_PASSWORD){

        alert("Contraseña incorrecta");

        return;

    }

    adminPanel.classList.remove("hidden");

    loadAdminList();

    adminPanel.scrollIntoView({
        behavior:"smooth"
    });

}

/* ==========================
   LISTA ADMIN
========================== */

function loadAdminList(){

    adminList.innerHTML = "";

    promotions.forEach((promo)=>{

        adminList.innerHTML += `

        <div class="admin-promo glass">

            <img src="${promo.image}">

            <div class="admin-info">

                <strong>${promo.title}</strong>

                <small>${promo.price}</small>

            </div>

            <button
                class="toggle-btn"
                onclick="togglePromo(${promo.id})">

                ${promo.active ? "Ocultar":"Mostrar"}

            </button>

            <button
                class="delete-btn"
                onclick="deletePromo(${promo.id})">

                Eliminar

            </button>

        </div>

        `;

    });

}

/* ==========================
   PUBLICAR PROMOCIÓN
========================== */

publishPromo.onclick = function(){

    if(!promoImage.files.length){

        alert("Selecciona una imagen.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function(event){

        promotions.unshift({

            id: Date.now(),

            title: promoTitle.value,

            description: promoDescription.value,

            price: promoPrice.value,

            image: event.target.result,

            active: promoActive.checked,

            date: new Date().toISOString()

        });

        renderPromotions();

        loadAdminList();

        savePromotionsGitHub();

        clearForm();

    }

    reader.readAsDataURL(promoImage.files[0]);

}

/* ==========================
   LIMPIAR
========================== */

function clearForm(){

    promoTitle.value="";
    promoPrice.value="";
    promoDescription.value="";
    promoImage.value="";
    promoActive.checked=true;

}

/* ==========================
   MOSTRAR / OCULTAR
========================== */

window.togglePromo = function(id){

    promotions = promotions.map(item=>{

        if(item.id===id){

            item.active=!item.active;

        }

        return item;

    });

    renderPromotions();

    loadAdminList();

    savePromotionsGitHub();

}

/* ==========================
   ELIMINAR
========================== */

window.deletePromo = function(id){

    if(!confirm("¿Eliminar promoción?")) return;

    promotions =
        promotions.filter(item=>item.id!==id);

    renderPromotions();

    loadAdminList();

    savePromotionsGitHub();

}

/* ==========================
   GUARDAR EN GITHUB
========================== */

async function savePromotionsGitHub(){

    const url =
`https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}/contents/${GITHUB.file}`;

    try{

        const current = await fetch(url,{
            headers:{
                Authorization:"Bearer "+GITHUB.token
            }
        });

        const file = await current.json();

        const body = {

            message:"Actualizar promociones Technical Center",

            branch:GITHUB.branch,

            sha:file.sha,

            content:btoa(
                unescape(
                    encodeURIComponent(
                        JSON.stringify(promotions,null,2)
                    )
                )
            )

        };

        await fetch(url,{

            method:"PUT",

            headers:{
                Authorization:"Bearer "+GITHUB.token,
                "Content-Type":"application/json"
            },

            body:JSON.stringify(body)

        });

        console.log("GitHub actualizado.");

    }catch(error){

        console.error(error);

        alert("Error al actualizar GitHub.");

    }

}

/* ==========================
   RESPALDO JSON
========================== */

window.exportPromotions = function(){

    const blob = new Blob(
        [JSON.stringify(promotions,null,2)],
        {type:"application/json"}
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "promociones_tc.json";

    link.click();

}

window.importPromotions = function(file){

    const reader = new FileReader();

    reader.onload = function(event){

        promotions = JSON.parse(event.target.result);

        renderPromotions();

        loadAdminList();

        savePromotionsGitHub();

    }

    reader.readAsText(file);

}