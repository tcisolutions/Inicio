
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

function render(){
 promoList.innerHTML=promos.map((p,i)=>`
 <div class="promo-item">
   <div>
     <strong>${p.title}</strong><br>
     ${p.price}<br>
     <small>${p.description}</small>
   </div>
   <div class="actions">
     <button onclick="toggle(${i})">${p.active?'Ocultar':'Mostrar'}</button>
     <button onclick="removePromo(${i})">Eliminar</button>
   </div>
 </div>`).join("");
}

window.toggle=(i)=>{promos[i].active=!promos[i].active;render();}
window.removePromo=(i)=>{promos.splice(i,1);render();}

document.getElementById("bannerBtn").onclick=()=>{
 alert("Banner actualizado (base lista para conectar al Worker).");
}

document.getElementById("publishBtn").onclick=()=>{
 alert("En la Entrega 11 este botón enviará los cambios a GitHub mediante Cloudflare Worker.");
}
