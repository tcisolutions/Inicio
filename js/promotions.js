
let promociones = [];

async function cargarPromociones(){

    try{

        const response = await fetch(
            `data/promociones.json?v=${Date.now()}`
        );

        promociones = await response.json();

        renderPromociones();

    }catch(error){

        console.error(error);

    }

}

function renderPromociones(){

    const contenedor =
        document.getElementById("contenedorPromociones");

    if(!contenedor) return;

    contenedor.innerHTML="";

    promociones
    .filter(p=>p.activa!==false)
    .forEach(promo=>{

        const imagen =
            promo.imagen || "assets/logo/logo.png";

        contenedor.innerHTML += `

        <article class="promo-card-v11">

            <div class="promo-image">

                <img src="${imagen}"
                     alt="${promo.titulo}">

                <div class="promo-badge-v11">
                    ${promo.descuento}
                </div>

            </div>

            <div class="promo-info-v11">

                <span class="promo-category-v11">
                    ${promo.categoria}
                </span>

                <h3>${promo.titulo}</h3>

                <p>${promo.descripcion}</p>

                <div class="promo-price-v11">

                    <span class="old-price">
                        $${promo.precioAnterior}
                    </span>

                    <span class="new-price">
                        $${promo.precio}
                    </span>

                </div>

                <div class="promo-features-v11">

                    <span>🛡 Garantía</span>

                    <span>⚡ Express</span>

                    <span>✔ Calidad Premium</span>

                </div>

                <a class="promo-btn-v11"
                   target="_blank"
                   href="https://wa.me/524431922958?text=Hola%20Technical%20Center,%20quiero%20cotizar%20${encodeURIComponent(promo.titulo)}">

                   Cotizar por WhatsApp

                </a>

            </div>

        </article>

        `;

    });

}

window.addEventListener(
    "DOMContentLoaded",
    cargarPromociones
);