/* ==========================================================
   TECHNICAL CENTER PAY 2026
   payments.js
   Sistema completo de pagos
========================================================== */

// ================= CONFIGURACIÓN =================

const TC_CONFIG = {
    whatsapp: "524431922958",
    negocio: "Technical Center",
    mercadoPago: "https://link.mercadopago.com.mx/technicalcenter",

    cuentas: {
        nu: {
            banco: "Nu México",
            numero: "638180010196712539"
        },
        mifel: {
            banco: "Banca Mifel",
            numero: "042180010088161897"
        }
    }
};

// ================= ELEMENTOS =================

const amountInput = document.getElementById("paymentAmount");
const whatsappButton = document.getElementById("sendWhatsapp");
const mercadoButton = document.querySelector(".btn-blue");
const copyButtons = document.querySelectorAll(".copy-button");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

// ================= TOAST =================

function showToast(message){

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2200);

}

// ================= FORMATO MONEDA =================

amountInput.addEventListener("input", ()=>{

    let value = amountInput.value.replace(/\D/g,'');

    if(value===""){
        amountInput.value="";
        return;
    }

    amountInput.value = Number(value);

});

// ================= COPIAR CUENTAS =================

copyButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        navigator.clipboard.writeText(button.dataset.copy);

        button.innerHTML = "✔ Copiado";

        showToast("Cuenta copiada al portapapeles.");

        setTimeout(()=>{

            if(button.dataset.copy===TC_CONFIG.cuentas.nu.numero){

                button.innerHTML="Copiar Cuenta";

            }else{

                button.innerHTML="Copiar CLABE";

            }

        },1800);

    });

});

// ================= MENSAJE WHATSAPP =================

function generarMensajePago(){

    const monto = amountInput.value || "0";

    return `Hola Technical Center 👋

Ya realicé mi pago.

💵 Monto: $${monto} MXN

Adjunto mi comprobante para confirmar la reparación de mi equipo.

Muchas gracias.`;

}

// ================= ENVIAR WHATSAPP =================

whatsappButton.addEventListener("click",()=>{

    const mensaje = encodeURIComponent(generarMensajePago());

    window.open(
        `https://wa.me/${TC_CONFIG.whatsapp}?text=${mensaje}`,
        "_blank"
    );

    guardarUltimoPago("Transferencia");

    mostrarModal();

});

// ================= MERCADO PAGO =================

mercadoButton.addEventListener("click",()=>{

    guardarUltimoPago("Mercado Pago");

});

// ================= MODAL =================

function mostrarModal(){

    successModal.classList.remove("hidden");

}

closeModal.addEventListener("click",()=>{

    successModal.classList.add("hidden");

});

// ================= HISTORIAL =================

function guardarUltimoPago(metodo){

    const pago = {

        fecha:new Date().toLocaleString("es-MX"),

        monto: amountInput.value,

        metodo

    };

    localStorage.setItem("ultimoPagoTC",JSON.stringify(pago));

}

function cargarUltimoPago(){

    const pago = JSON.parse(localStorage.getItem("ultimoPagoTC"));

    if(!pago) return;

    console.log("Último pago:",pago);

}

cargarUltimoPago();

// ================= COMPARTIR LANDING =================

const shareButton = document.getElementById("shareLanding");

if(shareButton){

    shareButton.addEventListener("click", async ()=>{

        const url = "https://tcisolutions.github.io/pagos/";

        if(navigator.share){

            await navigator.share({

                title:"Technical Center Pay",

                text:"Realiza tu pago aquí.",

                url

            });

        }else{

            navigator.clipboard.writeText(url);

            showToast("Link copiado.");

        }

    });

}

// ================= BOTÓN FLOTANTE =================

const floatingWhatsapp = document.getElementById("floatingWhatsapp");

floatingWhatsapp.addEventListener("click",()=>{

    const mensaje = encodeURIComponent(
        "Hola Technical Center, necesito ayuda con mi reparación."
    );

    window.open(
        `https://wa.me/${TC_CONFIG.whatsapp}?text=${mensaje}`,
        "_blank"
    );

});

// ================= EFECTO SCROLL =================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{threshold:.2});

document.querySelectorAll(".glass,.pay-card,.promo-card,.benefit-card")
.forEach(el=>observer.observe(el));

// ================= RELOJ FOOTER =================

const footerBottom = document.querySelector(".footer-bottom");

if(footerBottom){

    const reloj = document.createElement("span");

    reloj.id="clock";

    footerBottom.appendChild(reloj);

    setInterval(()=>{

        reloj.textContent = new Date().toLocaleTimeString("es-MX");

    },1000);

}

// ================= BOTÓN VOLVER ARRIBA =================

const topButton = document.createElement("button");

topButton.id="backTop";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// ================= SALUDO AUTOMÁTICO =================

window.addEventListener("load",()=>{

    const hora = new Date().getHours();

    let saludo = "Bienvenido a Technical Center";

    if(hora<12){

        saludo="☀ Buenos días, bienvenido a Technical Center";

    }else if(hora<19){

        saludo="👋 Buenas tardes, bienvenido a Technical Center";

    }else{

        saludo="🌙 Buenas noches, bienvenido a Technical Center";

    }

    showToast(saludo);

});

// ================= ATAJOS DE TECLADO =================

window.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && document.activeElement===amountInput){

        whatsappButton.click();

    }

});

// ================= PREPARADO PARA FUTURAS FUNCIONES =================

window.TC = TC_CONFIG;