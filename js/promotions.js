/* =====================================
   TECHNICAL CENTER PAY PRO
   promotions.js
===================================== */

const promoGrid = document.getElementById("promoGrid");

let promotions=[];

fetch("data/promociones.json")
.then(res=>res.json())
.then(data=>{

    promotions=data.filter(p=>p.activo);

    renderPromotions(promotions);

});

function renderPromotions(list){

    if(!promoGrid) return;

    promoGrid.innerHTML="";

    list.forEach(promo=>{

        promoGrid.innerHTML += `

        <article class="promo-card fade-up">

            <div class="promo-image">
                <img src="${promo.imagen}" alt="${promo.titulo}">

                <span class="promo-discount">
                    -${promo.descuento}%
                </span>
            </div>

            <div class="promo-body">

                <span class="promo-category">${promo.categoria}</span>

                <h3>${promo.titulo}</h3>

                <p>${promo.descripcion}</p>

                <div class="prices">
                    <span class="old-price">
                        $${promo.precioAnterior.toLocaleString("es-MX")}
                    </span>

                    <span class="new-price">
                        $${promo.precio.toLocaleString("es-MX")}
                    </span>
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

window.sendPromo = function(title,price){

    const message = encodeURIComponent(
`Hola Technical Center 👋

Me interesa la promoción:

📱 ${title}
💰 $${price} MXN

¿Sigue disponible?`);

    window.open(`https://wa.me/524431922958?text=${message}`,"_blank");

}

// =========================
// FILTROS DE CATEGORÍA
// =========================
window.filterPromotions=function(category){

    if(category==="Todos"){
        renderPromotions(promotions);
        return;
    }

    renderPromotions(
        promotions.filter(item=>item.categoria===category)
    );

}

// =========================
// OBSERVER ANIMACIONES
// =========================
function activateFadeObserver(){

    const cards=document.querySelectorAll(".promo-card");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){
                entry.target.classList.add("visible");
            }

        })

    },{
        threshold:.15
    });

    cards.forEach(card=>observer.observe(card));

}

// =========================
// CARRUSEL AUTOMÁTICO (MÓVIL)
// =========================
let scrollDirection=1;

setInterval(()=>{

    if(window.innerWidth>768) return;

    if(!promoGrid) return;

    promoGrid.scrollLeft += 320*scrollDirection;

    if(
        promoGrid.scrollLeft + promoGrid.clientWidth >=
        promoGrid.scrollWidth
    ){
        scrollDirection=-1;
    }

    if(promoGrid.scrollLeft<=0){
        scrollDirection=1;
    }

},3500);