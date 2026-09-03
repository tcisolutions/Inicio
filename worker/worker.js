
export default {
 async fetch(request){
   return new Response(JSON.stringify({
     status:"ok",
     message:"Worker listo para conectar con GitHub API."
   }),{
     headers:{"content-type":"application/json"}
   });
 }
}
