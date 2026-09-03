/* =====================================
   TECHNICAL CENTER PAY PRO
   payments.js
===================================== */

const WHATSAPP = "524431922958";

const MERCADO_PAGO =
"https://link.mercadopago.com.mx/technicalcenter";

function formatNumber(number){
    return Number(number).toLocaleString("es-MX");
}

window.copyAccount = function(account){

    navigator.clipboard.writeText(account);

    showToast("Cuenta copiada correctamente.","#22C55E");

}

window.copyLandingURL = function(){

    navigator.clipboard.writeText(window.location.href);

    showToast("Enlace copiado al portapapeles.");

}

window.openMercadoPago = function(){

    window.open(MERCADO_PAGO,"_blank");

}

window.sendReceipt = function(amount=""){

    const message = encodeURIComponent(
`Hola Technical Center 👋

Ya realicé mi pago por $${amount} MXN.
Adjunto mi comprobante para confirmar mi reparación.`);

    window.open(
        `https://wa.me/${WHATSAPP}?text=${message}`,
        "_blank"
    );

}

// Compartir landing
window.shareLanding = async function(){

    if(navigator.share){

        navigator.share({
            title:"Technical Center Pay",
            text:"Realiza tu pago de forma segura.",
            url:window.location.href
        });

    }else{
        copyLandingURL();
    }

}

// Animación copiar botones
document.addEventListener("click",e=>{

    if(e.target.classList.contains("copy-btn")){

        e.target.classList.add("copied");

        e.target.innerHTML="✓ Copiado";

        setTimeout(()=>{

            e.target.classList.remove("copied");
            e.target.innerHTML="Copiar";

        },1800)

    }

});