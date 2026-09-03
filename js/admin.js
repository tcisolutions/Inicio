/* ==========================================================
   TECHNICAL CENTER PAY V9
   admin.js
========================================================== */

const LOGIN_USER = "BryantTC";
const LOGIN_PASS = "TC2026@Morelia";

const STORAGE_KEY = "technical_center_promos";

let promociones = JSON.parse(
    localStorage.getItem("tc_promociones")
) || [];
let editIndex = null;

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

const listaPromociones = document.getElementById("listaPromociones");
const statPromos = document.getElementById("statPromos");

const previewContainer = document.getElementById("previewContainer");

const titulo = document.getElementById("tituloPromo");
const descripcion = document.getElementById("descripcionPromo");
const precioAnterior = document.getElementById("precioAnterior");
const precioNuevo = document.getElementById("precioNuevo");
const descuento = document.getElementById("descuentoPromo");
const categoria = document.getElementById("categoriaPromo");
const imagenInput = document.getElementById("imagenPromo");

const guardarBtn = document.getElementById("guardarPromo");

const logoutBtn = document.getElementById("logoutBtn");
const previewCard = document.getElementById("promoPreviewCard");
const promoColor = document.getElementById("promoColor");

let imagenBase64 = "";

/* ==========================================================
   LOGIN
========================================================== */

if(localStorage.getItem("tc_admin_login") === "true"){
    abrirDashboard();
}

loginForm?.addEventListener("submit", e=>{
    e.preventDefault();

    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if(user===LOGIN_USER && pass===LOGIN_PASS){
        localStorage.setItem("tc_admin_login","true");
        abrirDashboard();
    }else{
        loginError.innerText="Usuario o contraseña incorrectos.";
    }
});

logoutBtn?.addEventListener("click",()=>{
    localStorage.removeItem("tc_admin_login");
    location.reload();
});

function abrirDashboard(){
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
    renderPromociones();
}

/* ==========================================================
   PREVIEW IMAGEN
========================================================== */

imagenInput?.addEventListener("change",e=>{

    const file=e.target.files[0];

    if(!file)return;

    const reader=new FileReader();

    reader.onload=function(ev){

        imagenBase64=ev.target.result;

        previewContainer.innerHTML=`
            <img src="${imagenBase64}">
        `;
    }

    reader.readAsDataURL(file);

});


/* ==========================================================
   GUARDAR PROMOCIÓN
========================================================== */

/* ==========================================================
   CREAR / EDITAR PROMOCIÓN
========================================================== */

guardarBtn?.addEventListener("click",()=>{

    if(titulo.value.trim()===""){
        toast("Escribe un título.");
        return;
    }

    const promo={
        titulo:titulo.value,
        descripcion:descripcion.value,
        precioAnterior:Number(precioAnterior.value),
        precio:Number(precioNuevo.value),
        descuento:descuento.value,
        categoria:categoria.value,
        imagen:imagenBase64 || "assets/promos/default.webp",
        activa:true
    }

    if(editIndex===null){
        promociones.unshift(promo);
        toast("Promoción publicada correctamente.");
    }else{
        promociones[editIndex]=promo;
        toast("Promoción actualizada.");
        editIndex=null;
        guardarBtn.innerText="Publicar Promoción";
    }

    guardarLocal();
    limpiarFormulario();
    renderPromociones();



});

const promo={

    titulo:titulo.value,
    descripcion:descripcion.value,

    precioAnterior:Number(precioAnterior.value),
    precio:Number(precioNuevo.value),

    descuento:descuento.value,
    categoria:categoria.value,

    imagen:imagenBase64 || "assets/promos/default.webp",

    activa:document.getElementById("promoActiva").checked,

    color:document.getElementById("promoColor").value

};

/* ==========================================================
   RENDER PROMOCIONES
========================================================== */

function renderPromociones(){

    listaPromociones.innerHTML="";

    const activas=promociones.filter(p=>p.activa!==false).length;

    statPromos.innerText=activas;

    if(promociones.length===0){

        listaPromociones.innerHTML=`
        <div style="padding:40px;text-align:center;color:#94A3B8">
            No hay promociones todavía.
        </div>`;

        return;
    }

    promociones.forEach((promo,index)=>{

        // (el resto de tu código permanece igual)

    });
}

/* ==========================================================
   EDITAR
========================================================== */

window.editarPromo=function(index){

    const p=promociones[index];

    titulo.value=p.titulo;
    descripcion.value=p.descripcion;
    precioAnterior.value=p.precioAnterior;
    precioNuevo.value=p.precio;
    descuento.value=p.descuento;
    categoria.value=p.categoria;

    imagenBase64=p.imagen;

    previewContainer.innerHTML=`<img src="${p.imagen}">`;

    editIndex=index;

    guardarBtn.innerText="Guardar Cambios";

    window.scrollTo({top:0,behavior:"smooth"});

}

/* ==========================================================
   ELIMINAR
========================================================== */

window.eliminarPromo=function(index){

    if(confirm("¿Eliminar esta promoción?")){

        promociones.splice(index,1);

        guardarLocal();
        renderPromociones();

        toast("Promoción eliminada.");

    }

}

/* ==========================================================
   LOCAL STORAGE
========================================================== */

function guardarLocal(){
    localStorage.setItem("tc_promociones",JSON.stringify(promociones));
}

/* ==========================================================
   LIMPIAR
========================================================== */

function limpiarFormulario(){

    titulo.value="";
    descripcion.value="";
    precioAnterior.value="";
    precioNuevo.value="";
    descuento.value="";
    categoria.value="iphone";

    imagenInput.value="";
    imagenBase64="";

    previewContainer.innerHTML="";

}

/* ==========================================================
   TOAST IOS
========================================================== */

function toast(texto){

    const t=document.createElement("div");

    t.className="toast-admin";

    t.innerText=texto;

    document.body.appendChild(t);

    setTimeout(()=>t.classList.add("show"),100);

    setTimeout(()=>{
        t.classList.remove("show");
        setTimeout(()=>t.remove(),400);
    },2200);

}

/* ==========================================================
   ESTILO TOAST (inyectado)
========================================================== */

const style=document.createElement("style");
style.innerHTML=`
.toast-admin{
position:fixed;
top:30px;
left:50%;
transform:translateX(-50%) translateY(-30px);
background:linear-gradient(90deg,#009BFF,#2563EB);
color:white;
padding:15px 26px;
border-radius:16px;
font-weight:600;
opacity:0;
transition:.35s;
z-index:99999;
box-shadow:0 10px 30px rgba(0,155,255,.35);
}
.toast-admin.show{
opacity:1;
transform:translateX(-50%) translateY(0px);
}
`;
document.head.appendChild(style);

/* ==========================================
   EXPORTAR JSON
========================================== */

function exportarPromociones(){

    const blob = new Blob(
        [JSON.stringify(promociones,null,2)],
        {type:"application/json"}
    );

    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download="promociones.json";

    a.click();

    URL.revokeObjectURL(url);

    toast("Archivo promociones.json generado.");

}

/* ==========================================================
   PUBLICAR EN GITHUB (Preparado para Cloudflare)
========================================================== */


async function publicarGitHub() {

    promociones = JSON.parse(localStorage.getItem("tc_promociones")) || [];

    if(promociones.length===0){
        toast("⚠️ No hay promociones para publicar.");
        return;
    }

    toast("☁️ Publicando cambios...");

    try {

        const response = await fetch(window.TC_CONFIG.workerURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(promociones)
        });

        const result = await response.json();

        console.log("Respuesta Worker:", result);

        // GitHub responde con {content:{}, commit:{}}
        if (response.ok && (result.commit || result.content || result.success)) {

            toast("✅ Promociones publicadas correctamente.");

            // Guardar también localmente para que no se pierdan en el panel
            localStorage.setItem(
                "tc_promociones",
                JSON.stringify(promociones)
            );

            return;

        }

        toast("❌ Error al publicar.");

        console.error(result);

    } catch (error) {

        console.error(error);
        toast("❌ No se pudo conectar con GitHub.");

    }

}

/* ==========================================================
   BOTÓN PUBLICAR GITHUB
========================================================== */

window.addEventListener("DOMContentLoaded", () => {

    const publicarGitHubBtn =
        document.getElementById("publicarGitHubBtn");

    if (publicarGitHubBtn) {
        publicarGitHubBtn.addEventListener("click", publicarGitHub);
    }

});
/* ==========================================================
   VISTA PREVIA DEL BANNER
========================================================== */

const bannerInput = document.getElementById("bannerInput");
const bannerPreview = document.getElementById("bannerPreview");

bannerInput?.addEventListener("change", (e)=>{

    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = (ev)=>{

        bannerPreview.innerHTML = `
            <img src="${ev.target.result}" style="width:100%;border-radius:18px;object-fit:cover;">
        `;

        toast("Banner listo para publicar.");

    };

    reader.readAsDataURL(file);

});

/* ==========================================================
   GUARDAR CONFIGURACIÓN LOCAL
========================================================== */

const configWhatsapp = document.getElementById("configWhatsapp");
const configNu = document.getElementById("configNu");
const configMifel = document.getElementById("configMifel");
const configMP = document.getElementById("configMP");

function guardarConfig(){

    const config = {
        whatsapp: configWhatsapp.value,
        mercadoPago: configMP.value,
        nu:{
            titular:"Bryant Dylan León Durán",
            cuenta:configNu.value
        },
        mifel:{
            titular:"Bryant Dylan León Durán",
            clabe:configMifel.value
        }
    };

    localStorage.setItem("tc_config", JSON.stringify(config));

    toast("Configuración guardada correctamente.");
}

/* Botón Guardar Configuración */
document.querySelectorAll(".panel-card .primary-btn").forEach(btn=>{
    if(btn.textContent.includes("Guardar Configuración")){
        btn.addEventListener("click", guardarConfig);
    }
});

/* ======================================================
   ESTADO DEL SISTEMA
====================================================== */

const statusDot=document.querySelector(".status-dot");
const statusText=document.getElementById("statusText");

async function verificarSistema(){

    statusText.innerText="Verificando conexión...";

    try{

        const res=await fetch("data/config.json");

        if(!res.ok) throw new Error();

        statusDot.classList.remove("offline");
        statusDot.classList.add("online");

        statusText.innerText="Sistema listo para publicar promociones.";

    }catch(e){

        statusDot.classList.remove("online");
        statusDot.classList.add("offline");

        statusText.innerText="No se pudo cargar la configuración.";

    }

}

verificarSistema();

function actualizarVistaPrevia(){

    if(!previewCard) return;

    previewCard.innerHTML = `

    ${imagenBase64 ? `<img src="${imagenBase64}">` : ""}

    <div class="preview-category">
        ${categoria.value.toUpperCase()}
    </div>

    <h2 class="preview-title">
        ${titulo.value || "Título de la promoción"}
    </h2>

    <div class="preview-badge">
        ${descuento.value || "-0%"}
    </div>

    <p class="preview-desc">
        ${descripcion.value || "Descripción de la promoción..."}
    </p>

    <div class="preview-old">
        $${precioAnterior.value || 0} MXN
    </div>

    <div class="preview-price" style="color:${promoColor?.value || "#22C55E"}">
        $${precioNuevo.value || 0} MXN
    </div>

    `;

}

[
 titulo,
 descripcion,
 precioAnterior,
 precioNuevo,
 descuento,
 categoria
].forEach(input=>{

    input?.addEventListener("input",actualizarVistaPrevia);

});

promoColor?.addEventListener("input",actualizarVistaPrevia);

actualizarVistaPrevia();