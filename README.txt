
ENTREGA 11 - PWA + OFFLINE

Archivos:
- manifest.json
- sw.js
- worker.js
- js/pwa.js
- assets/icon192.png
- assets/icon512.png

Pasos:
1. Copiar estos archivos al proyecto.
2. En index.html agrega:
<link rel="manifest" href="manifest.json">
<script src="js/pwa.js"></script>
<button id="installApp" onclick="installApp()" style="display:none">Instalar App</button>
