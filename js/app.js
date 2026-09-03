/* ======================================================
   TECHNICAL CENTER PAY PRO V6
   app.js - Animaciones y efectos principales
   Autor: ChatGPT + Lic Bryant León
====================================================== */

// =========================
// CONFIGURACIÓN
// =========================
const WHATSAPP = "524431922958";
const LANDING_URL = "https://tcisolutions.github.io/pagos/";

// =========================
// TOAST PREMIUM
// =========================
function showToast(message, color = "#009BFF") {
    const toast = document.createElement("div");
    toast.className = "tc-toast";
    toast.innerHTML = `
        <div class="toast-icon">✓</div>
        <div class="toast-text">${message}</div>
    `;

    toast.style.borderColor = color;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

window.showToast = showToast;

// =========================
// NAVBAR GLASSMORPHISM
// =========================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }
});

// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// =========================
// ANIMACIONES FADE-UP
// =========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: .15
});

document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

// =========================
// EFECTO 3D TARJETAS WALLET
// =========================
document.querySelectorAll(".wallet").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y / rect.height - .5) * -12;
        const rotateY = (x / rect.width - .5) * 12;

        card.style.transform = `perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    });

});

// =========================
// BRILLO BOTONES
// =========================
document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mousemove", e => {

        const rect = btn.getBoundingClientRect();

        btn.style.setProperty("--x", `${e.clientX - rect.left}px`);
        btn.style.setProperty("--y", `${e.clientY - rect.top}px`);

    });

});


// =========================
// BOTÓN VOLVER ARRIBA
// =========================
const topButton = document.createElement("button");

topButton.id = "backTop";
topButton.innerHTML = "↑";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topButton.classList.add("show");
    } else {
        topButton.classList.remove("show");
    }

});

topButton.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// =========================
// BOTÓN WHATSAPP FLOTANTE
// =========================
const waButton = document.createElement("a");

waButton.href = `https://wa.me/${WHATSAPP}`;
waButton.target = "_blank";
waButton.className = "whatsapp-float";
waButton.innerHTML = "💬";

document.body.appendChild(waButton);

// =========================
// COPY LANDING URL
// =========================
window.copyLandingURL = () => {

    navigator.clipboard.writeText(LANDING_URL);

    showToast("Enlace copiado al portapapeles.");

};

// =========================
// EFECTO PARALLAX HERO
// =========================
const hero = document.querySelector(".hero-device img");

window.addEventListener("mousemove", e => {

    if (!hero) return;

    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    hero.style.transform = `translate(${x}px, ${y}px)`;

});

// =========================
// CONTADOR NUMÉRICO
// =========================
function animateValue(el) {

    const target = Number(el.dataset.value);
    let current = 0;

    const timer = setInterval(() => {

        current += Math.ceil(target / 40);

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        el.textContent = current.toLocaleString();

    }, 30);
}

const statsObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            animateValue(entry.target);
            statsObserver.unobserve(entry.target);
        }

    });

});

document.querySelectorAll(".counter").forEach(c => statsObserver.observe(c));

// =========================
// PRECARGA HERO
// =========================
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// =========================
// MENSAJE COMPROBANTE
// =========================
window.sendReceipt = (amount = "") => {

    const msg = encodeURIComponent(
`Hola Technical Center.%0A%0AYa realicé mi pago de $${amount}.%0AAdjunto mi comprobante.`
    );

    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
};