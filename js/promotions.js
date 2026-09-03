
const promociones=[
 {titulo:"Cambio de Cristal iPhone 16 Pro Max",precio:"Desde $1,999 MXN"},
 {titulo:"Pantalla OLED iPhone",precio:"Desde $1,299 MXN"},
 {titulo:"Cambio de Batería Samsung",precio:"Desde $699 MXN"},
 {titulo:"Limpieza por Humedad",precio:"$450 MXN"},
 {titulo:"Centro de Carga Tipo C",precio:"Desde $550 MXN"},
 {titulo:"Reemplazo de Cámara iPhone",precio:"Cotiza por WhatsApp"}
];
const box=document.getElementById("promoContainer");
if(box){
 box.innerHTML=promociones.map(p=>`<div class="promo-card"><h3>${p.titulo}</h3><p>${p.precio}</p><button class="btn">Solicitar por WhatsApp</button></div>`).join("");
}
