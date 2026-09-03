
export default {
 async fetch(request){
   return new Response(JSON.stringify({
      status:'ok',
      app:'Technical Center Pay PRO'
   }),{headers:{'content-type':'application/json'}});
 }
}
