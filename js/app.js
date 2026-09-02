{`/* ==========================================================
   TECHNICAL CENTER PAY V10 PRO
   Autor: ChatGPT para Technical Center
   Funciones principales de la Landing
========================================================== */

const WHATSAPP_NUMBER = "524431922958";

const NU_ACCOUNT = "638180010196712539";
const MIFEL_ACCOUNT = "042180010088161897";

const MERCADO_PAGO =
  "https://link.mercadopago.com.mx/technicalcenter";

/* ==========================================================
    SELECTORES
========================================================== */

const amountInput = document.getElementById("paymentAmount");

const toast = document.getElementById("toast");

const floatingWhatsapp = document.getElementById("floatingWhatsapp");

const sendWhatsapp = document.getElementById("sendWhatsapp");

const copyButtons = document.querySelectorAll(".copy-button");

/* ==========================================================
    TOAST ELEGANTE
========================================================== */

function showToast(message, color = "#009BFF") {

  toast.innerHTML = message;

  toast.style.background = color;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);

}

/* ==========================================================
    COPIAR CUENTAS
========================================================== */

copyButtons.forEach(button => {

  button.addEventListener("click", async () => {

    const text = button.dataset.copy;

    try {

      await navigator.clipboard.writeText(text);

      showToast("✅ Cuenta copiada al portapapeles");

      button.innerHTML = "Cuenta copiada ✔";

      setTimeout(() => {
        button.innerHTML = button.dataset.copy === NU_ACCOUNT
          ? "Copiar Cuenta"
          : "Copiar CLABE";
      }, 1800);

    } catch (e) {

      showToast("No fue posible copiar.", "#DC2626");

    }

  });

});

/* ==========================================================
    FORMATO PESOS MXN
========================================================== */

amountInput.addEventListener("input", () => {

  let value = amountInput.value.replace(/[^0-9]/g, "");

  if (!value) return;

  amountInput.value = Number(value);

});

/* ==========================================================
    MENSAJE AUTOMÁTICO WHATSAPP
========================================================== */

function openWhatsapp(method = "Transferencia") {

  const amount = amountInput.value || "0";

  const message =
\`Hola Technical Center 👋

Ya realicé mi pago.

💵 Monto: $\\${amount} MXN

🏦 Método de pago: \\${method}

Adjunto mi comprobante.

Muchas gracias.\`;

  const url =
    \`https://wa.me/\\${WHATSAPP_NUMBER}?text=\\${encodeURIComponent(message)}\`;

  window.open(url, "_blank");

}

sendWhatsapp.addEventListener("click", () => openWhatsapp());

floatingWhatsapp.addEventListener("click", () => openWhatsapp());

/* ==========================================================
    MERCADO PAGO
========================================================== */

const mercadoBtn = document.querySelector(".mercado-button");

mercadoBtn.addEventListener("click", () => {

  localStorage.setItem(
    "tc-last-payment",
    JSON.stringify({
      amount: amountInput.value,
      method: "Mercado Pago",
      date: new Date().toISOString()
    })
  );

});

/* ==========================================================
    ANIMACIÓN SCROLL
========================================================== */

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

    }

  });

}, {
  threshold: .18
});

document.querySelectorAll(
  ".glass,.payment-card,.benefit,.promo-card"
).forEach(el => observer.observe(el));

/* ==========================================================
    BOTÓN IR ARRIBA
========================================================== */

const topButton = document.createElement("button");

topButton.id = "backToTop";

topButton.innerHTML = "↑";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

  if (window.scrollY > 450)
    topButton.classList.add("show");
  else
    topButton.classList.remove("show");

});

topButton.onclick = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

/* ==========================================================
    EFECTO BRILLO HERO
========================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("mousemove", e => {

  const x = e.clientX / window.innerWidth * 100;
  const y = e.clientY / window.innerHeight * 100;

  hero.style.background =
    \`radial-gradient(circle at \\${x}% \\${y}%,
      rgba(0,155,255,.20),
      transparent 45%),
     linear-gradient(#020617,#07101F,#020617)\`;

});

/* ==========================================================
    REGISTRAR SERVICE WORKER
========================================================== */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("sw.js");

}

/* ==========================================================
    INSTALAR COMO APP
========================================================== */

let deferredPrompt;

window.addEventListener("beforeinstallprompt", event => {

  event.preventDefault();

  deferredPrompt = event;

  const install = document.createElement("button");

  install.id = "installButton";

  install.innerHTML = "📲 Instalar App";

  document.body.appendChild(install);

  install.onclick = async () => {

    install.remove();

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;

  };

});

/* ==========================================================
    SALUDO SEGÚN HORARIO
========================================================== */

const greeting = document.createElement("div");

greeting.id = "greeting";

const hour = new Date().getHours();

let text = "Bienvenido a Technical Center";

if (hour < 12)
  text = "☀ Buenos días, bienvenido a Technical Center";
else if (hour < 19)
  text = "👋 Buenas tardes, bienvenido a Technical Center";
else
  text = "🌙 Buenas noches, bienvenido a Technical Center";

greeting.innerHTML = text;

document.body.appendChild(greeting);

setTimeout(() => greeting.remove(), 4500);

/* ==========================================================
    EFECTO PARALLAX
========================================================== */

window.addEventListener("scroll", () => {

  const offset = window.scrollY * 0.25;

  document.getElementById("particles").style.transform =
    \`translateY(\\${offset}px)\`;

});

/* ==========================================================
    EFECTO TARJETAS
========================================================== */

document.querySelectorAll(".payment-card").forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background =
      \`radial-gradient(circle at \\${x}px \\${y}px,
        rgba(56,189,248,.18),
        rgba(17,24,39,.80))\`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.background = "rgba(17,24,39,.70)";

  });

});

/* ==========================================================
    RELOJ EN FOOTER
========================================================== */

const footer = document.querySelector(".footer");

const clock = document.createElement("div");

clock.id = "clock";

footer.appendChild(clock);

setInterval(() => {

  clock.innerHTML =
    new Date().toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

}, 1000);

/* ==========================================================
    PREPARADO PARA PROMOCIONES
========================================================== */

window.tcPromotions = [];`}
