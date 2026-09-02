const PROMO_URL = "data/promociones.json";

const promoContainer = document.getElementById("promoContainer");

let promotions = [];

async function loadPromotions(){

    try{

        const response = await fetch(PROMO_URL + "?v=" + Date.now());

        promotions = await response.json();

        renderPromotions();

    }catch(error){

        console.error(error);

    }

}

loadPromotions();

function renderPromotions(){

    promoContainer.innerHTML = "";

    promotions.filter(p=>p.active).forEach((promo,index)=>{

        promoContainer.innerHTML += `

        <article class="promo-card glass fade-up">

            <img src="${promo.image}" alt="${promo.title}">

            <div class="promo-info">

                <span>PROMOCIÓN</span>

                <h3>${promo.title}</h3>

                <p>${promo.description}</p>

                <div class="price">${promo.price}</div>

                <button class="promo-button"
                        onclick="sendPromoWhatsapp(${index})">
                        Solicitar promoción
                </button>

            </div>

        </article>`;

    });

}

window.sendPromoWhatsapp = function(index){

    const promo = promotions.filter(p=>p.active)[index];

    const text = `Hola Technical Center 👋

Estoy interesado en la promoción:

📱 ${promo.title}
💲 ${promo.price}`;

    window.open(
      `https://wa.me/524431922958?text=${encodeURIComponent(text)}`,
      "_blank"
    );

}

