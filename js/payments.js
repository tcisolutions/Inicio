/* ==========================================================
   TECHNICAL CENTER PAY
   payments.js
========================================================== */

const MERCADO_PAGO =
"https://link.mercadopago.com.mx/technicalcenter";

const WHATSAPP =
"524431922958";

/* COPIAR CUENTA */

function copyAccount(number,message){

    navigator.clipboard.writeText(number);

    showToast(message,"success");

}

/* MERCADO PAGO */

function openMercadoPago(){

    window.open(
        MERCADO_PAGO,
        "_blank"
    );

}

/* OBTENER MONTO */

function getAmount(){

    const amount =
    document.getElementById("paymentAmount");

    if(!amount.value){

        showToast(
            "Ingresa el monto del pago.",
            "error"
        );

        return null;

    }

    return amount.value;

}

/* WHATSAPP COMPROBANTE */

function sendReceiptWhatsapp(){

    const amount = getAmount();

    if(!amount) return;

    const text =
`Hola Technical Center 👋

Ya realicé mi pago.

💵 Monto: $${amount} MXN

Adjunto mi comprobante de pago para validar la reparación.

Gracias.`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

}

/* TOAST */

function showToast(message,type="success"){

    const toast =
    document.getElementById("toast");

    const text =
    document.getElementById("toastMessage");

    text.textContent = message;

    toast.className="toast show "+type;

    setTimeout(()=>{
        toast.className="toast";
    },2500);

}

/* COMPARTIR LANDING */

function shareLanding(){

    const url =
    "https://tcisolutions.github.io/pagos/";

    if(navigator.share){

        navigator.share({
            title:"Technical Center",
            text:"Realiza tu pago aquí.",
            url:url
        });

    }else{

        navigator.clipboard.writeText(url);

        showToast(
          "Link copiado al portapapeles."
        );

    }

    <div id="toast" class="toast">
    <span id="toastMessage">
        Listo
    </span>
</div>

}