/* ==========================================
   TECHNICAL CENTER PAY V10.9
   promotions.js
========================================== */

let promociones = [];

/* Cargar promociones desde GitHub Pages */
async function cargarPromociones() {

    try {

        const response = await fetch(
            `data/promociones.json?v=${Date.now()}`
        );

        promociones = await response.json();

        renderPromociones();

    } catch (error) {

        console.error("Error cargando promociones:", error);

        const contenedor = document.getElementById("contenedorPromociones");

        if (contenedor) {
            contenedor.innerHTML = `
                <div class="error-card">
                    No se pudieron cargar las promociones.
                </div>
            `;
        }

    }

}

/* Dibujar promociones */
function renderPromociones() {

    const contenedor = document.getElementById("contenedorPromociones");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (!promociones.length) {

        contenedor.innerHTML = `
            <div class="promo-empty">
                No hay promociones disponibles.
            </div>
        `;

        return;
    }

    promociones
        .filter(p => p.activa !== false)
        .forEach(promo => {

            contenedor.innerHTML += `
                <div class="promo-card">

                    <img src="${promo.imagen}" alt="${promo.titulo}">

                    <div class="promo-info">

                        <span class="promo-cat">
                            ${promo.categoria.toUpperCase()}
                        </span>

                        <h3>${promo.titulo}</h3>

                        <p>${promo.descripcion}</p>

                        <div class="promo-prices">

                            <span class="old">
                                $${promo.precioAnterior}
                            </span>

                            <span class="new">
                                $${promo.precio}
                            </span>

                        </div>

                        <div class="promo-discount">
                            ${promo.descuento}
                        </div>

                    </div>

                </div>
            `;

        });

}

/* Cargar al abrir la página */
window.addEventListener("DOMContentLoaded", cargarPromociones);