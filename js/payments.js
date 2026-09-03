
const MERCADO_PAGO_URL = "https://link.mercadopago.com.mx/technicalcenter";

function copyAccount(number){
  navigator.clipboard.writeText(number);
  showToast("Cuenta copiada correctamente.");
}

function openMercadoPago(){
  window.open(MERCADO_PAGO_URL,"_blank");
}

function copyLandingURL(){
  navigator.clipboard.writeText("https://tcisolutions.github.io/pagos/");
  showToast("Enlace copiado.");
}

function shareLanding(){
  if(navigator.share){
    navigator.share({
      title:"Technical Center Pay",
      text:"Página oficial de pagos Technical Center",
      url:"https://tcisolutions.github.io/pagos/"
    });
  }else{
    copyLandingURL();
  }
}
