
export default {
 async fetch(req){
   return new Response(JSON.stringify({
     ok:true,
     project:"Technical Center Pay",
     message:"Worker listo para conectar GitHub API."
   }),{headers:{'content-type':'application/json'}});
 }
}
