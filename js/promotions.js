
const promos=[
["Cambio de Cristal iPhone 16 Pro Max","Desde $1,999 MXN"],
["Cambio de Batería Samsung","Desde $699 MXN"],
["Pantallas OLED iPhone","Desde $1,299 MXN"],
["Centro de Carga Tipo C","Desde $550 MXN"],
["Limpieza por Humedad","$450 MXN"],
["Reemplazo de Cámara iPhone","Cotiza por WhatsApp"]
];
const grid=document.getElementById("promoContainer");
if(grid){
grid.innerHTML=promos.map(p=>`<div class="card"><h3>${p[0]}</h3><p>${p[1]}</p><a class="btn" href="https://wa.me/524431922958" target="_blank">Solicitar</a></div>`).join("");
}
