
const promociones=[
{titulo:"Cristal iPhone 16 Pro Max",precio:"$1,999 MXN"},
{titulo:"Batería Samsung Serie A",precio:"$699 MXN"},
{titulo:"Pantallas OLED iPhone",precio:"Desde $1,299 MXN"},
{titulo:"Limpieza por humedad",precio:"$450 MXN"}
];
document.getElementById("promoContainer").innerHTML=
promociones.map(p=>`<div class="card"><h3>${p.titulo}</h3><p>${p.precio}</p><button class="btn">Solicitar promoción</button></div>`).join("");
