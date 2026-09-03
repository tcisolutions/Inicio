
const MP='https://link.mercadopago.com.mx/technicalcenter';
function copyAccount(n){
 navigator.clipboard.writeText(n);
 showToast('Cuenta copiada.');
}
function openMercadoPago(){
 window.open(MP,'_blank');
}
