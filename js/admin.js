
const promos=[];

const promoList=document.getElementById("promoList");

document.getElementById("saveBtn").onclick=()=>{
 const promo={
   title:title.value,
   price:price.value,
   description:description.value,
   active:true
 };
 promos.unshift(promo);
 render();
 title.value=price.value=description.value="";
};

function renderPromotions(list){

    promoGrid.innerHTML="";

    list.forEach(promo=>{
      // Mostrar inmediatamente las promociones
document.querySelectorAll("#promoGrid .fade-up").forEach(card => {
    card.classList.add("visible");
});

        const image = promo.imagen || "https://placehold.co/600x600/081120/38BDF8?text=Technical+Center";

        promoGrid.innerHTML += `

        <article class="promo-card fade-up">

            <div class="promo-image">
                <img src="${image}" alt="${promo.titulo}">
                <span class="promo-discount">-${promo.descuento}%</span>
            </div>

            <div class="promo-body">

                <span class="promo-category">${promo.categoria}</span>

                <h3>${promo.titulo}</h3>

                <p>${promo.descripcion}</p>

                <div class="prices">
                    <span class="old-price">$${promo.precioAnterior}</span>
                    <span class="new-price">$${promo.precio}</span>
                </div>

                <button class="btn primary"
                    onclick="sendPromo('${promo.titulo}','${promo.precio}')">

                    Solicitar por WhatsApp

                </button>

            </div>

        </article>`;

    });

    activateFadeObserver();
}

window.toggle=(i)=>{promos[i].active=!promos[i].active;render();}
window.removePromo=(i)=>{promos.splice(i,1);render();}

document.getElementById("bannerBtn").onclick=()=>{
 alert("Banner actualizado (base lista para conectar al Worker).");
}

document.getElementById("publishBtn").onclick=()=>{
 alert("En la Entrega 11 este botón enviará los cambios a GitHub mediante Cloudflare Worker.");
}
