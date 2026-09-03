console.log("✅ payments.js cargado correctamente");
/* ==============================
   TECHNICAL CENTER PAY PRO
   payments.js (VERSIÓN CORREGIDA)
============================== */


// ⚠️ PON AQUÍ TU LINK REAL DE MERCADO PAGO
const MERCADO_PAGO =
  "https://link.mercadopago.com.mx/technicalcenter";

function toast(msg, color="#22C55E"){

    if(typeof showToast === "function"){
        showToast(msg,color);
        return;
    }

    alert(msg);
}

window.copyAccount = async function(account){

    try{

        await navigator.clipboard.writeText(account);

        showToast("Cuenta copiada correctamente.","#22C55E");

    }catch(err){

        const input=document.createElement("textarea");
        input.value=account;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        showToast("Cuenta copiada correctamente.","#22C55E");

    }

}

window.openMercadoPago = function(){

    window.open(MERCADO_PAGO,"_blank");

}

window.copyLandingURL = async function(){

    await navigator.clipboard.writeText(window.location.href);

    toast("🔗 Enlace copiado.");

}

window.sendReceipt = function(amount=""){

    const mensaje = encodeURIComponent(
`Hola Technical Center 👋

Ya realicé mi pago por $${amount} MXN.

Adjunto mi comprobante.`
    );

    window.open(
`https://wa.me/${WHATSAPP}?text=${mensaje}`,
"_blank"
    );

}