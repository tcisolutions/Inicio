export default {
  async fetch(request, env) {

    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method === "GET") {
      return Response.json({
        success: true,
        version: "V10.8.3",
        repository: `${env.GITHUB_OWNER}/${env.GITHUB_REPO}`
      }, { headers: cors });
    }

    if (request.method !== "POST") {
      return new Response("Método no permitido", {
        status: 405,
        headers: cors
      });
    }

    try {

      const promociones = await request.json();

      const githubURL = `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/data/promociones.json`;

      const archivo = await fetch(githubURL, {
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json"
        }
      });

      if (!archivo.ok) {
        const texto = await archivo.text();

        return Response.json({
          success: false,
          paso: "Buscar promociones.json",
          githubStatus: archivo.status,
          githubError: texto
        }, { headers: cors, status: 500 });
      }

      const infoArchivo = await archivo.json();

      const contenido = btoa(unescape(encodeURIComponent(JSON.stringify(promociones, null, 2))));

      const subir = await fetch(githubURL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "Actualización automática desde Technical Center Admin",
          content: contenido,
          sha: infoArchivo.sha,
          branch: env.GITHUB_BRANCH
        })
      });

      const respuestaGithub = await subir.text();

      return new Response(respuestaGithub, {
        status: subir.status,
        headers: {
          ...cors,
          "Content-Type": "application/json"
        }
      });

    } catch (error) {

      return Response.json({
        success: false,
        paso: "Catch principal",
        error: error.message
      }, { headers: cors, status: 500 });

    }
  }
};