/* ==========================================================
   TECHNICAL CENTER PAY V11 ENTERPRISE
   ADMIN.JS - PARTE 1/4
========================================================== */

const LOGIN_USER = "BryantTC";
const LOGIN_PASS = "TC2026Admin!";

/* ==========================================
   VARIABLES GLOBALES
========================================== */

let promociones = JSON.parse(localStorage.getItem("tc_promociones") || "[]");
let imagenBase64 = "";
let bannerBase64 = "";

/* ==========================================
   ELEMENTOS
========================================== */

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

const guardarBtn = document.getElementById("guardarPromo");
const publicarBtn = document.getElementById("publicarGitHubBtn");
const logoutBtn = document.getElementById("logoutBtn");

const titulo = document.getElementById("tituloPromo");
const descripcion = document.getElementById("descripcionPromo");
const precioAnterior = document.getElementById("precioAnterior");
const precioNuevo = document.getElementById("precioNuevo");
const descuento = document.getElementById("descuentoPromo");
const categoria = document.getElementById("categoriaPromo");
const promoColor = document.getElementById("promoColor");
const promoActiva = document.getElementById("promoActiva");

const imagenInput = document.getElementById("imagenInput");
const previewContainer = document.getElementById("previewContainer");
const previewCard = document.getElementById("promoPreviewCard");

const listaPromociones = document.getElementById("listaPromociones");
const statPromos = document.getElementById("statPromos");

const bannerInput = document.getElementById("bannerInput");
const bannerPreview = document.getElementById("bannerPreview");

/* ==========================================
   TOAST
========================================== */

function toast(texto){

    const t = document.createElement("div");

    t.className = "tc-toast show";
    t.innerText = texto;

    document.body.appendChild(t);

    setTimeout(()=>{
        t.classList.remove("show");

        setTimeout(()=>{
            t.remove();
        },300);

    },2200);

}

/* ==========================================
   LOGIN
========================================== */

if(localStorage.getItem("tc_admin_login")==="true"){
    abrirDashboard();
}

loginForm?.addEventListener("submit",(e)=>{

    e.preventDefault();

    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if(user===LOGIN_USER && pass===LOGIN_PASS){

        localStorage.setItem("tc_admin_login","true");

        abrirDashboard();

        toast("Bienvenido Lic Bryant.");

    }else{

        loginError.innerText = "Usuario o contraseña incorrectos.";

    }

});

logoutBtn?.addEventListener("click",()=>{

    localStorage.removeItem("tc_admin_login");

    location.reload();

});

function abrirDashboard(){

    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");

    actualizarEstadisticas();

    renderPromociones();

    actualizarVistaPrevia();

}

/* ==========================================
   IMAGEN PROMOCIÓN
========================================== */

imagenInput?.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = (ev)=>{

        imagenBase64 = ev.target.result;

        previewContainer.innerHTML =
        `<img src="${imagenBase64}" class="preview-img">`;

        actualizarVistaPrevia();

        toast("Imagen cargada.");

    };

    reader.readAsDataURL(file);

});

/* ==========================================
   BANNER
========================================== */

bannerInput?.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload=(ev)=>{

        bannerBase64 = ev.target.result;

        bannerPreview.innerHTML =
        `<img src="${bannerBase64}" class="preview-banner">`;

        toast("Banner listo.");

    };

    reader.readAsDataURL(file);

});

/* ==========================================
   VISTA PREVIA EN TIEMPO REAL
========================================== */

[
 titulo,
 descripcion,
 precioAnterior,
 precioNuevo,
 descuento,
 categoria,
 promoColor
].forEach(input=>{

    input?.addEventListener("input",actualizarVistaPrevia);

    input?.addEventListener("change",actualizarVistaPrevia);

});

function actualizarVistaPrevia(){

    if(!previewCard) return;

    const img = imagenBase64 || "assets/logo/logo.png";

    previewCard.innerHTML = `
    <div class="promo-preview">

        <div class="promo-badge">${descuento.value || "-0%"}</div>

        <img src="${img}" alt="Promoción">

        <div class="promo-content">

            <span class="promo-category">
                ${(categoria.value || "IPHONE").toUpperCase()}
            </span>

            <h3>${titulo.value || "Título de la promoción"}</h3>

            <p>${descripcion.value || "Descripción de la promoción."}</p>

            <div class="promo-price">

                <span class="old-price">
                    $${precioAnterior.value || "0"}
                </span>

                <span class="new-price">
                    $${precioNuevo.value || "0"}
                </span>

            </div>

            <button
                style="background:${promoColor.value};width:100%;padding:14px;border:none;border-radius:14px;color:white;font-weight:700;margin-top:20px;">

                Cotizar por WhatsApp

            </button>

        </div>

    </div>
    `;

}

/* ==========================================
   ESTADÍSTICAS
========================================== */

function actualizarEstadisticas(){

    if(statPromos)
        statPromos.innerText = promociones.length;

}

console.log("✅ ADMIN V11 PARTE 1 CARGADA");

/* ==========================================================
   PARTE 2/4
   CRUD DE PROMOCIONES
========================================================== */

/* ==========================================
   GUARDAR PROMOCIÓN
========================================== */

guardarBtn?.addEventListener("click", guardarPromocion);

function guardarPromocion(){

    const nuevaPromo = {

        id: Date.now(),

        titulo: titulo.value.trim(),

        descripcion: descripcion.value.trim(),

        categoria: categoria.value,

        precioAnterior: precioAnterior.value,

        precio: precioNuevo.value,

        descuento: descuento.value || "-0%",

        color: promoColor.value,

        imagen: imagenBase64 || "assets/logo/logo.png",

        activa: promoActiva.checked,

        fecha: new Date().toLocaleString("es-MX")

    };

    if(!nuevaPromo.titulo){

        toast("Escribe un título para la promoción.");

        titulo.focus();

        return;

    }

    promociones.unshift(nuevaPromo);

    guardarPromocionesLocal();

    renderPromociones();

    actualizarEstadisticas();

    limpiarFormulario();

    toast("✅ Promoción publicada.");

}

/* ==========================================
   GUARDAR LOCAL STORAGE
========================================== */

function guardarPromocionesLocal(){

    localStorage.setItem(
        "tc_promociones",
        JSON.stringify(promociones)
    );

}

/* ==========================================
   RENDER PROMOCIONES
========================================== */

function renderPromociones(){

    if(!listaPromociones) return;

    listaPromociones.innerHTML = "";

    if(promociones.length===0){

        listaPromociones.innerHTML = `

        <div class="empty-card">

            <h3>No hay promociones.</h3>

            <p>Crea tu primera promoción.</p>

        </div>

        `;

        return;

    }

    promociones.forEach((promo,index)=>{

        listaPromociones.innerHTML += `

        <article class="admin-promo-card">

            <img
                class="admin-promo-img"
                src="${promo.imagen}">

            <div class="admin-promo-info">

                <span>${promo.categoria.toUpperCase()}</span>

                <h3>${promo.titulo}</h3>

                <p>${promo.descripcion}</p>

                <div class="prices">

                    <small>$${promo.precioAnterior}</small>

                    <strong>$${promo.precio}</strong>

                </div>

                <text class="promo-date">
                    ${promo.fecha}
                </text>

            </div>

            <div class="admin-actions">

                <button
                    class="edit-btn"
                    onclick="editarPromocion(${index})">

                    ✏ Editar

                </button>

                <button
                    class="delete-btn"
                    onclick="eliminarPromocion(${index})">

                    🗑 Eliminar

                </button>

            </div>

        </article>

        `;

    });

}

/* ==========================================
   EDITAR PROMOCIÓN
========================================== */

window.editarPromocion = function(index){

    const promo = promociones[index];

    titulo.value = promo.titulo;

    descripcion.value = promo.descripcion;

    precioAnterior.value = promo.precioAnterior;

    precioNuevo.value = promo.precio;

    descuento.value = promo.descuento;

    categoria.value = promo.categoria;

    promoColor.value = promo.color || "#009BFF";

    promoActiva.checked = promo.activa;

    imagenBase64 = promo.imagen;

    previewContainer.innerHTML = `
        <img src="${promo.imagen}" class="preview-img">
    `;

    promociones.splice(index,1);

    guardarPromocionesLocal();

    renderPromociones();

    actualizarVistaPrevia();

    toast("Editando promoción...");

}

/* ==========================================
   ELIMINAR PROMOCIÓN
========================================== */

window.eliminarPromocion = function(index){

    const confirmar = confirm(
        "¿Eliminar esta promoción?"
    );

    if(!confirmar) return;

    promociones.splice(index,1);

    guardarPromocionesLocal();

    renderPromociones();

    actualizarEstadisticas();

    toast("Promoción eliminada.");

}

/* ==========================================
   LIMPIAR FORMULARIO
========================================== */

function limpiarFormulario(){

    titulo.value = "";

    descripcion.value = "";

    precioAnterior.value = "";

    precioNuevo.value = "";

    descuento.value = "";

    categoria.value = "iphone";

    promoColor.value = "#009BFF";

    promoActiva.checked = true;

    imagenBase64 = "";

    previewContainer.innerHTML = "";

    actualizarVistaPrevia();

}

/* ==========================================
   CONTADOR DE PROMOCIONES
========================================== */

function actualizarEstadisticas(){

    if(statPromos){

        statPromos.innerText = promociones.length;

    }

    const ultima = document.getElementById("ultimaPublicacion");

    if(ultima){

        if(promociones.length){

            ultima.innerText = promociones[0].fecha;

        }else{

            ultima.innerText = "--";

        }

    }

}

/* ==========================================
   INICIALIZACIÓN
========================================== */

window.addEventListener("DOMContentLoaded",()=>{

    renderPromociones();

    actualizarVistaPrevia();

    actualizarEstadisticas();

});


/* ==========================================================
   PARTE 3/4
   PUBLICAR GITHUB + CLOUDFLARE
========================================================== */

/* ==========================================
   PUBLICAR PROMOCIONES
========================================== */

publicarBtn?.addEventListener("click", publicarGitHub);

async function publicarGitHub(){

    toast("Publicando cambios...");

    const datos = {

        promociones: promociones,

        config: obtenerConfiguracion(),

        banner: bannerBase64 || null

    };

    try{

        const response = await fetch(
            window.GITHUB.workerURL,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(datos)
            }
        );

        const resultado = await response.json();

        console.log(resultado);

        if(resultado.success){

            toast("🚀 Sitio publicado correctamente.");

            actualizarEstadoGitHub(true);

            localStorage.setItem(
                "ultima_publicacion",
                new Date().toLocaleString("es-MX")
            );

        }else{

            toast("Error al publicar.");

            actualizarEstadoGitHub(false);

            console.error(resultado);

        }

    }catch(error){

        console.error(error);

        toast("Cloudflare Worker no responde.");

        actualizarEstadoGitHub(false);

    }

}


/* ==========================================
   CONFIGURACIÓN PAGOS
========================================== */

const guardarConfigBtn =
    document.getElementById("guardarConfigBtn");

guardarConfigBtn?.addEventListener(
    "click",
    guardarConfiguracion
);

function obtenerConfiguracion(){

    return{

        whatsapp:
            document.getElementById("configWhatsapp").value,

        mercadoPago:
            document.getElementById("configMP").value,

        nu:{
            titular:"Bryant Dylan León Durán",
            cuenta:
                document.getElementById("configNu").value
        },

        mifel:{
            titular:"Bryant Dylan León Durán",
            clabe:
                document.getElementById("configMifel").value
        }

    };

}

function guardarConfiguracion(){

    localStorage.setItem(
        "tc_config",
        JSON.stringify(obtenerConfiguracion())
    );

    toast("Configuración guardada.");

}


/* ==========================================
   ESTADO DEL SISTEMA
========================================== */

const statusText =
    document.getElementById("statusText");

const githubStatus =
    document.getElementById("githubStatus");

function actualizarEstadoGitHub(ok){

    if(statusText){

        statusText.innerText = ok
            ? "Conectado con GitHub Pages."
            : "Sin conexión con GitHub.";

    }

    if(githubStatus){

        githubStatus.innerText = ok
            ? "ONLINE"
            : "OFFLINE";

    }

}

actualizarEstadoGitHub(true);


/* ==========================================
   BANNER PRINCIPAL
========================================== */

const actualizarBannerBtn =
    document.getElementById("actualizarBannerBtn");

actualizarBannerBtn?.addEventListener(
    "click",
    async()=>{

        if(!bannerBase64){

            toast("Selecciona un banner.");

            return;

        }

        try{

            const response = await fetch(
                window.GITHUB.workerURL,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body:JSON.stringify({
                        banner:bannerBase64
                    })
                }
            );

            const json = await response.json();

            if(json.success){

                toast("Banner actualizado.");

            }else{

                toast("Error al actualizar banner.");

            }

        }catch(error){

            console.error(error);

            toast("No se pudo conectar.");

        }

    }
);


/* ==========================================
   SINCRONIZAR PROMOCIONES
========================================== */

async function sincronizarPromociones(){

    try{

        const response = await fetch(
            "data/promociones.json?v="+Date.now()
        );

        const data = await response.json();

        if(Array.isArray(data) && data.length){

            promociones = data;

            guardarPromocionesLocal();

            renderPromociones();

            actualizarEstadisticas();

        }

    }catch(error){

        console.warn("Usando promociones locales.");

    }

}

window.addEventListener(
    "load",
    sincronizarPromociones
);


/* ==========================================
   VERIFICAR WORKER
========================================== */

async function verificarWorker(){

    try{

        const response = await fetch(
            window.GITHUB.workerURL
        );

        if(response.ok){

            actualizarEstadoGitHub(true);

        }else{

            actualizarEstadoGitHub(false);

        }

    }catch{

        actualizarEstadoGitHub(false);

    }

}

verificarWorker();

